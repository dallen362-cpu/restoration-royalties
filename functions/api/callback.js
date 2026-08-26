// Click-to-call / instant-callback proxy — Cloudflare Pages Function at /api/callback
// The site posts a prospect's phone here; this proxy (holding the carrier creds as
// Cloudflare secrets — never in the public page) texts the prospect a confirmation and
// texts the agent the lead to call back in seconds.
//
// v1 engine = Vitelity SMS (works today). When the VICIdial softswitch is restored, swap
// initiateContact() to true auto-dial+bridge — the front-end never changes.
//
// Cloudflare secrets (Production) — David-only, same place as TTS_API_KEY:
//   VITELITY_LOGIN, VITELITY_PASS   (carrier API creds — required)
//   CALLBACK_ALERT_TO               (agent cell, E.164 e.g. +16892421041 — required)
//   CALLBACK_FROM                   (an SMS-capable Vitelity DID, digits — required)
// Until those are set, this returns 503 and the site shows its phone-number fallback.
// Add a Cloudflare rate-limiting rule on /api/callback as the abuse/billing backstop.

const ALLOWED = new Set([
  "https://telvergence.com",
  "https://www.telvergence.com",
  "https://restorationroyalties.com",
]);
function cors(request) {
  const o = request.headers.get("Origin");
  return ALLOWED.has(o)
    ? { "Access-Control-Allow-Origin": o, "Vary": "Origin",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type" }
    : {};
}
const json = (obj, status, h) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...h } });

// Normalize a user-typed US phone to E.164-ish digits; return null if implausible.
function normPhone(raw) {
  const d = String(raw || "").replace(/[^\d]/g, "");
  if (d.length === 10) return "1" + d;
  if (d.length === 11 && d[0] === "1") return d;
  return null;
}

// Vitelity outbound SMS. Per this account's API docs the send command is `sendsms` on the
// smsout-api host (NOT `sendshort` on api.vitelity.net). Success = <status>ok</status> / x[[ok[[x.
async function sendSms(env, { from, to, message }) {
  const qs = new URLSearchParams({
    login: env.VITELITY_LOGIN, pass: env.VITELITY_PASS,
    cmd: "sendsms", xml: "yes", src: from, dst: to, msg: message,
  });
  const r = await fetch((env.VITELITY_SMS_URL || "https://smsout-api.vitelity.net/api.php") + "?" + qs);
  const text = await r.text();
  const ok = /<status>\s*ok\s*<\/status>/i.test(text) || /x\[\[ok\[\[x/i.test(text) || /^\s*ok\s*$/i.test(text);
  if (!ok) throw new Error("sms send failed: " + String(text).slice(0, 160));
  return true;
}

// The swappable engine. v1: dual SMS. Later: originate + bridge via VICIdial/CPaaS.
async function initiateContact(env, { phone, name, brand }) {
  const from = String(env.CALLBACK_FROM || "").replace(/[^\d]/g, "");
  const who = name ? name : "A prospect";
  const label = brand ? (" · " + brand) : "";
  // 1) confirm to the prospect
  await sendSms(env, {
    from, to: phone,
    message: "Telvergence: a specialist is calling you right now. Talk in about a minute — thanks for reaching out.",
  });
  // 2) alert the agent with the lead
  await sendSms(env, {
    from, to: String(env.CALLBACK_ALERT_TO).replace(/[^\d]/g, ""),
    message: "🔔 CALLBACK NOW" + label + " — call " + phone + " (" + who + "). Source: telvergence.com",
  });
  return { engine: "sms-callback" };
}

export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: cors(request) });
}

export async function onRequestPost({ request, env }) {
  const h = cors(request);
  const origin = request.headers.get("Origin");
  // REQUIRE an allowlisted browser Origin. This closes the no-Origin (curl / server-side) path a
  // scanner would use to pump paid SMS. Origin is still spoofable by a determined non-browser client —
  // Cloudflare Turnstile (verified below when TURNSTILE_SECRET is set) is the real human gate.
  if (!origin || !ALLOWED.has(origin)) return json({ error: "forbidden origin" }, 403, {});

  const configured = env.VITELITY_LOGIN && env.VITELITY_PASS && env.CALLBACK_ALERT_TO && env.CALLBACK_FROM;
  if (!configured) return json({ error: "callback not configured" }, 503, h);

  // Optional human gate: once TURNSTILE_SECRET is set in Cloudflare, require a valid Turnstile token.
  // Stays inert until the secret exists AND the widget sends a token, so it's safe to ship ahead of them.
  if (env.TURNSTILE_SECRET) {
    let peek = {};
    try { peek = await request.clone().json(); } catch {}
    const token = peek && peek.turnstileToken;
    if (!token) return json({ error: "verification required" }, 403, h);
    try {
      const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token,
          remoteip: request.headers.get("CF-Connecting-IP") || "" }),
      });
      const out = await v.json();
      if (!out.success) return json({ error: "verification failed" }, 403, h);
    } catch { return json({ error: "verification error" }, 502, h); }
  }

  let body;
  try { body = await request.json(); } catch { return json({ error: "bad request" }, 400, h); }
  const phone = normPhone(body && body.phone);
  if (!phone) return json({ error: "enter a valid phone number" }, 400, h);
  const name = String((body && body.name) || "").slice(0, 80);
  const brand = String((body && body.brand) || "").slice(0, 40);

  try {
    const r = await initiateContact(env, { phone, name, brand });
    return json({ ok: true, message: "Calling you now.", ...r }, 200, h);
  } catch (e) {
    return json({ error: "could not place the call — try calling us directly" }, 502, h);
  }
}
