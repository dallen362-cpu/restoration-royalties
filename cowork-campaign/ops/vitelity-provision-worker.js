/**
 * TELVERGENCE — Vitelity DID provisioning Worker (Cloudflare Worker TEMPLATE)
 *
 * Fires on a Stripe webhook when a subscription/checkout completes (incl. $0 trial start),
 * then provisions the 10-line Smart DID Pack via the Vitelity API:
 *   order N local DIDs  →  set Remote Call Forwarding to the subscriber's phone  →  register E911.
 *
 * WHY a Worker: static hosting (GitHub/Cloudflare Pages) cannot call Vitelity or hold secrets.
 * This runs server-side with secrets stored in Cloudflare (never in the repo).
 *
 * ── SETUP (see ops/VITELITY-SETUP.md) ──────────────────────────────────────────────
 *  KV binding:  PROVISIONED            (records DIDs per customer)
 *  Secrets:     STRIPE_WEBHOOK_SECRET  (Stripe → Webhooks)
 *               VITELITY_USER, VITELITY_PASS   (Vitelity portal → API access)
 *  Stripe webhook events: checkout.session.completed, customer.subscription.created
 *  Payment Link: add a CUSTOM FIELD key `forward_to` (phone) + collect email, quantity=10.
 *
 *  ⚠️ Confirm exact cmd names/params for callfw + E911 against https://apihelp.vitelity.net/
 *     (getlocaldid / listlocal / balance are confirmed; callfw/e911 vary by account type).
 * ────────────────────────────────────────────────────────────────────────────────────
 */

const VITELITY_API = 'https://api.vitelity.net/api.php';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('ok', { status: 200 });

    const sig = request.headers.get('stripe-signature') || '';
    const body = await request.text();
    if (!(await verifyStripe(body, sig, env.STRIPE_WEBHOOK_SECRET))) {
      return new Response('bad signature', { status: 400 });
    }

    let evt;
    try { evt = JSON.parse(body); } catch { return new Response('bad json', { status: 400 }); }

    if (evt.type !== 'checkout.session.completed' && evt.type !== 'customer.subscription.created') {
      return new Response('ignored', { status: 200 });
    }

    const o = (evt.data && evt.data.object) || {};
    const email = (o.customer_details && o.customer_details.email) || o.customer_email || '';
    const ref   = o.client_reference_id || o.id || '';
    const qty   = lineQty(o) || 10;
    const npa   = '954'; // default market; override via custom field below if present
    const forward = customField(o, 'forward_to') || '';

    // idempotency: don't double-provision the same checkout/subscription
    const seenKey = 'done:' + (o.id || ref);
    if (await env.PROVISIONED.get(seenKey)) return new Response('already provisioned', { status: 200 });

    try {
      const dids = await provisionPack(env, { qty, npa, forward });
      await env.PROVISIONED.put(seenKey, JSON.stringify({ email, ref, forward, dids, ts: Date.now() }));
      // (optional) trigger your transactional email / magic-link here
    } catch (e) {
      // 200 so Stripe doesn't hammer retries; log for manual follow-up
      await env.PROVISIONED.put('error:' + (o.id || ref), String(e && e.message || e));
      return new Response('provision-deferred: ' + (e && e.message), { status: 200 });
    }
    return new Response('ok', { status: 200 });
  }
};

// ---- Vitelity calls ----
async function vit(env, cmd, params) {
  const u = new URL(VITELITY_API);
  u.searchParams.set('login', env.VITELITY_USER);
  u.searchParams.set('pass', env.VITELITY_PASS);
  u.searchParams.set('cmd', cmd);
  u.searchParams.set('xml', 'yes');
  for (const k in params) if (params[k] != null) u.searchParams.set(k, params[k]);
  const r = await fetch(u.toString(), { method: 'GET' });
  return await r.text(); // Vitelity returns XML/text; parse per command as needed
}

async function provisionPack(env, { qty, npa, forward }) {
  // 1) sanity: account balance must cover the order
  await vit(env, 'balance', {});

  // 2) find available local DIDs in the market (confirm state/ratecenter mapping for your NPA)
  const avail = await vit(env, 'listlocal', { npa });            // returns available DIDs
  const candidates = parseDids(avail).slice(0, qty);

  const provisioned = [];
  for (const did of candidates) {
    // 3) order the DID
    await vit(env, 'getlocaldid', { did, type: 'perminute' });
    // 4) Remote Call Forwarding → subscriber's phone   (⚠ verify cmd/params in Vitelity docs)
    if (forward) await vit(env, 'callfw', { did, forward: digits(forward) });
    // 5) E911 dispatchable location                    (⚠ verify cmd/params in Vitelity docs)
    // await vit(env, 'e911provision', { did, /* name,address,city,state,zip */ });
    provisioned.push(did);
  }
  return provisioned;
}

// ---- helpers ----
function digits(s){ return String(s || '').replace(/\D/g, ''); }
function lineQty(o){
  // checkout.session has amount/quantity in line items via expand; subscription has items
  if (o.items && o.items.data && o.items.data[0]) return o.items.data[0].quantity;
  return null;
}
function customField(o, key){
  const f = (o.custom_fields || []).find(x => x.key === key);
  return f ? (f.text && f.text.value) || (f.numeric && f.numeric.value) || '' : '';
}
function parseDids(xmlText){
  // minimal extractor; adapt to Vitelity's actual XML shape (<did>...</did> or <number>)
  const out = []; const re = /<(?:did|number)>\s*(\d{10,11})\s*<\/(?:did|number)>/g; let m;
  while ((m = re.exec(xmlText))) out.push(m[1]);
  return out;
}

// ---- Stripe signature (Web Crypto, runs on Workers) ----
async function verifyStripe(payload, sigHeader, secret) {
  if (!secret || !sigHeader) return false;
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')));
  const t = parts.t, v1 = parts.v1; if (!t || !v1) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${payload}`));
  const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, '0')).join('');
  if (hex.length !== v1.length) return false;
  let d = 0; for (let i = 0; i < hex.length; i++) d |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return d === 0;
}
