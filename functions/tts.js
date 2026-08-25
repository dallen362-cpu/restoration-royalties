// Neural TTS proxy — Cloudflare Pages Function, served at /tts
// Activate: Cloudflare dashboard → Pages → restoration-royalties → Settings → Environment variables:
//   TTS_API_KEY = <your provider key>   (required, add as a Secret)
//   TTS_URL     = https://api.openai.com/v1/audio/speech   (default; any OpenAI-compatible TTS endpoint)
//   TTS_MODEL   = gpt-4o-mini-tts   (default)
//   TTS_VOICE   = nova              (default)
// Until the key is set, this returns 503 and pages fall back to the browser voice automatically.
// Abuse posture: browser calls are limited to the allowlisted origins below (foreign-site fetches
// get 403); requests with no Origin header (curl, server-side) pass so the activation test works.
// The real billing backstop is a Cloudflare rate-limiting rule on /tts — add one after activation.
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
export async function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: cors(request) });
}
export async function onRequestPost({ request, env }) {
  const h = cors(request);
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED.has(origin)) return new Response("forbidden origin", { status: 403 });
  if (!env.TTS_API_KEY) return new Response("TTS not configured", { status: 503, headers: h });
  let text;
  try { ({ text } = await request.json()); } catch { return new Response("bad request", { status: 400, headers: h }); }
  if (!text || typeof text !== "string" || text.length > 4000) return new Response("bad request", { status: 400, headers: h });
  const r = await fetch(env.TTS_URL || "https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { "Authorization": "Bearer " + env.TTS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ model: env.TTS_MODEL || "gpt-4o-mini-tts", voice: env.TTS_VOICE || "nova", input: text })
  });
  if (!r.ok) return new Response("tts upstream error", { status: 502, headers: h });
  return new Response(r.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store", ...h } });
}
