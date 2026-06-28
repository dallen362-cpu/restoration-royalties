/**
 * TELVERGENCE — Stripe → Cloudflare Access auto-provisioning Worker (TEMPLATE)
 *
 * On a successful Stripe subscription, add the customer's email to your Cloudflare
 * Access policy (instant entry to the vault) and record it in KV. On cancellation,
 * remove it. Until you set the secrets/bindings below, this does nothing destructive.
 *
 * SETUP (see ops/SECURITY-AND-PAYMENTS-RUNBOOK.md PART 4):
 *   KV binding:  PAID_EMAILS
 *   Secrets:     STRIPE_WEBHOOK_SECRET, CF_API_TOKEN, CF_ACCOUNT_ID,
 *                CF_ACCESS_APP_ID, CF_ACCESS_POLICY_ID
 *   Stripe webhook events: checkout.session.completed, customer.subscription.deleted
 *
 * NOTE: Stripe signature verification uses Web Crypto (HMAC-SHA256) so it runs on Workers.
 */

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

    const obj = evt.data && evt.data.object ? evt.data.object : {};
    const email = (obj.customer_details && obj.customer_details.email) || obj.customer_email || obj.email || '';

    try {
      if (evt.type === 'checkout.session.completed' && email) {
        await env.PAID_EMAILS.put(email.toLowerCase(), JSON.stringify({ ts: Date.now(), status: 'active' }));
        await updateAccessEmails(env);
      } else if (evt.type === 'customer.subscription.deleted' && email) {
        await env.PAID_EMAILS.delete(email.toLowerCase());
        await updateAccessEmails(env);
      }
    } catch (e) {
      // log-and-200 so Stripe doesn't hammer retries on a transient CF error
      return new Response('handled-with-warning: ' + e.message, { status: 200 });
    }
    return new Response('ok', { status: 200 });
  }
};

// Rebuild the Cloudflare Access policy "include emails" from the current KV allow-list.
async function updateAccessEmails(env) {
  if (!env.CF_API_TOKEN || !env.CF_ACCESS_APP_ID || !env.CF_ACCESS_POLICY_ID) return; // not configured yet
  const list = await env.PAID_EMAILS.list();
  const emails = list.keys.map(k => ({ email: k.name }));
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/access/apps/${env.CF_ACCESS_APP_ID}/policies/${env.CF_ACCESS_POLICY_ID}`;
  await fetch(url, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${env.CF_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ decision: 'allow', name: 'Paid subscribers', include: emails.length ? emails : [{ email: 'no-one@telvergence.com' }] })
  });
}

// Minimal Stripe webhook signature verification (t=...,v1=...) using Web Crypto.
async function verifyStripe(payload, sigHeader, secret) {
  if (!secret || !sigHeader) return false;
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')));
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${payload}`));
  const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, '0')).join('');
  // constant-time-ish compare
  if (hex.length !== v1.length) return false;
  let diff = 0; for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}
