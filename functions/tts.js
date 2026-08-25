// Neural TTS proxy — Cloudflare Pages Function, served at /tts
// Activate: Cloudflare dashboard → Pages → restoration-royalties → Settings → Environment variables:
//   TTS_API_KEY = <your provider key>   (required)
//   TTS_URL     = https://api.openai.com/v1/audio/speech   (default; any OpenAI-compatible TTS endpoint)
//   TTS_MODEL   = gpt-4o-mini-tts   (default)
//   TTS_VOICE   = nova              (default)
// Until the key is set, this returns 503 and pages fall back to the browser voice automatically.
const CORS = {
  "Access-Control-Allow-Origin": "https://telvergence.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
export async function onRequestPost({ request, env }) {
  if (!env.TTS_API_KEY) return new Response("TTS not configured", { status: 503, headers: CORS });
  let text;
  try { ({ text } = await request.json()); } catch { return new Response("bad request", { status: 400 }); }
  if (!text || typeof text !== "string" || text.length > 4000) return new Response("bad request", { status: 400 });
  const r = await fetch(env.TTS_URL || "https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { "Authorization": "Bearer " + env.TTS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ model: env.TTS_MODEL || "gpt-4o-mini-tts", voice: env.TTS_VOICE || "nova", input: text })
  });
  if (!r.ok) return new Response("tts upstream error", { status: 502, headers: CORS });
  return new Response(r.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store", ...CORS } });
}
