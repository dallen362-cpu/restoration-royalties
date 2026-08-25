// The webhook server — ties the carrier layer and the AI layer together.
// Plain Node http (no dependencies beyond the runtime's fetch); gateway-agnostic JSON.

const http = require('http');
const fs = require('fs');
const path = require('path');
const carrier = require('./vitelity.js');
const agent = require('./agent.js');
const campaign = require('./campaign-restoration-royalty.json');

const PORT = Number(process.env.PORT || 3000);
const LOG = path.join(__dirname, 'calls.log.jsonl');
const calls = new Map(); // callId -> { history, from, startedAt }

function logLine(obj) {
  fs.appendFileSync(LOG, JSON.stringify({ at: new Date().toISOString(), ...obj }) + '\n');
}

function fill(template, fields) {
  return template.replace(/\{(\w+)\}/g, (_, k) => fields[k] ?? '');
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

function send(res, code, obj) {
  res.writeHead(code, { 'content-type': 'application/json' });
  res.end(JSON.stringify(obj));
}

const routes = {
  'GET /health': async (_req, res) => {
    send(res, 200, {
      up: true,
      campaign: campaign.brand,
      carrierConfigured: Boolean(process.env.VITELITY_LOGIN && process.env.VITELITY_PASS),
      aiConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
    });
  },

  'POST /provision': async (req, res) => {
    const { ratecenter, state, npa, route, cnamName } = await readJson(req);
    if (!route) return send(res, 400, { error: 'route required (sip:... or forward target)' });
    const result = await carrier.provisionLine({
      state, ratecenter, npa, route,
      cnamName: cnamName || campaign.brand.toUpperCase().slice(0, 15),
    });
    logLine({ event: 'provision', ...result });
    send(res, 200, result);
  },

  'POST /voice': async (req, res) => {
    const { callId, from, to, speech } = await readJson(req);
    if (!callId) return send(res, 400, { error: 'callId required' });
    let call = calls.get(callId);
    if (!call) {
      call = { history: [], from, to, startedAt: new Date().toISOString() };
      calls.set(callId, call);
      logLine({ event: 'call-start', callId, from, to });
      if (!speech) return send(res, 200, { say: agent.greeting(), done: false });
    }
    const result = await agent.turn({ history: call.history, speech: speech || '(caller silent)' });
    call.history = result.history;
    logLine({ event: 'turn', callId, caller: speech, agent: result.say });
    if (result.done) {
      logLine({ event: 'call-complete', callId, turns: call.history.length / 2, transcript: call.history });
      calls.delete(callId);
      const dispatchTo = process.env.DISPATCH_SMS_TO;
      if (dispatchTo) {
        const line = campaign.line_display.replace(/\D/g, '');
        carrier.sendSms({
          from: line, to: dispatchTo,
          message: fill(campaign.dispatch_sms, { severity: 'INTAKE', problem: 'see log', address: '', name: '', callback: from || '', window: campaign.booking_window }),
        }).catch((e) => logLine({ event: 'sms-error', callId, error: String(e) }));
        if (from) {
          carrier.sendSms({ from: line, to: from.replace(/\D/g, ''), message: campaign.welcome_sms })
            .catch((e) => logLine({ event: 'sms-error', callId, error: String(e) }));
        }
      }
    }
    send(res, 200, { say: result.say, done: result.done });
  },

  'POST /sms': async (req, res) => {
    const { to, message } = await readJson(req);
    if (!to || !message) return send(res, 400, { error: 'to and message required' });
    const out = await carrier.sendSms({ from: campaign.line_display.replace(/\D/g, ''), to, message });
    logLine({ event: 'sms', ...out });
    send(res, 200, out);
  },
};

http.createServer(async (req, res) => {
  const key = `${req.method} ${req.url.split('?')[0]}`;
  const handler = routes[key];
  if (!handler) return send(res, 404, { error: 'not found' });
  try {
    await handler(req, res);
  } catch (e) {
    logLine({ event: 'error', route: key, error: String(e) });
    send(res, 500, { error: String(e.message || e) });
  }
}).listen(PORT, () => {
  console.log(`${campaign.brand} phone system listening on :${PORT}`);
});
