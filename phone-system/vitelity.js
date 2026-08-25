// Carrier API layer — Vitelity HTTP API (api.vitelity.net).
// Every function is a thin wrapper over one portal-documented command; credentials
// come from the environment only. The API returns plain/XML-ish text; ok() checks
// the success markers Vitelity uses ("ok"/"success") rather than parsing strictly.

const BASE = process.env.VITELITY_API_URL || 'https://api.vitelity.net/api.php';

function creds() {
  const { VITELITY_LOGIN, VITELITY_PASS } = process.env;
  if (!VITELITY_LOGIN || !VITELITY_PASS) {
    throw new Error('VITELITY_LOGIN / VITELITY_PASS not set — see README SECURITY');
  }
  return { login: VITELITY_LOGIN, pass: VITELITY_PASS };
}

async function call(cmd, params = {}) {
  const qs = new URLSearchParams({ ...creds(), cmd, xml: 'yes', ...params });
  const res = await fetch(`${BASE}?${qs}`);
  const text = await res.text();
  if (!res.ok) throw new Error(`carrier API HTTP ${res.status} for cmd=${cmd}`);
  return text;
}

const ok = (text) => /(<status>\s*ok\s*<\/status>|\bok\b|\bsuccess\b)/i.test(text);

// List DIDs available for purchase in a rate center (or by NPA/NPANXX).
async function searchDids({ state, ratecenter, npa, npanxx }) {
  const params = {};
  if (state) params.state = state;
  if (ratecenter) params.ratecenter = ratecenter;
  if (npa) params.npa = npa;
  if (npanxx) params.npanxx = npanxx;
  const text = await call('listlocal', params);
  const numbers = [...text.matchAll(/\b(\d{10})\b/g)].map((m) => m[1]);
  return { raw: text, numbers };
}

// Order one DID and set its routing (e.g. 'sip:user@gateway' or a forward route).
async function orderDid({ did, route }) {
  const text = await call('getlocaldid', { did, routesip: route });
  if (!ok(text)) throw new Error(`order failed for ${did}: ${text.slice(0, 200)}`);
  return { did, route, raw: text };
}

async function setRoute({ did, route }) {
  const text = await call('reroute', { did, routesip: route });
  if (!ok(text)) throw new Error(`reroute failed for ${did}: ${text.slice(0, 200)}`);
  return { did, route };
}

// Brand the outbound caller-ID name in the CNAM registry.
async function enableCnam({ did, name }) {
  const text = await call('cnamenable', { did, name });
  return { did, name, ok: ok(text), raw: text.slice(0, 200) };
}

async function sendSms({ from, to, message }) {
  const text = await call('sendshort', { src: from, dst: to, msg: message });
  if (!ok(text)) throw new Error(`sms failed ${from}→${to}: ${text.slice(0, 200)}`);
  return { from, to };
}

// One-shot: search a rate center, buy the first clean number, route it, brand it.
async function provisionLine({ state, ratecenter, npa, route, cnamName }) {
  const found = await searchDids({ state, ratecenter, npa });
  if (!found.numbers.length) throw new Error(`no inventory in ${ratecenter || npa}, ${state}`);
  const did = found.numbers[0];
  await orderDid({ did, route });
  const cnam = cnamName ? await enableCnam({ did, name: cnamName }) : null;
  return { did, route, cnam, candidates: found.numbers.length };
}

module.exports = { searchDids, orderDid, setRoute, enableCnam, sendSms, provisionLine };
