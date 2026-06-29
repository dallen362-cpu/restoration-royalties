/**
 * TELVERGENCE — ViciDial API client (TEMPLATE)
 *
 * Bridges the BOSS CRM ↔ the ViciDial front-end dialer.
 * Two ViciDial APIs:
 *   - Non-Agent API:  {VICIDIAL_URL}/vicidial/non_agent_api.php   (add/update leads, list/campaign ops)
 *   - Agent API:      {VICIDIAL_URL}/agc/api.php                   (live agent actions: dial, pause, dispo)
 *
 * Auth: a ViciDial user flagged as an API user (user_level high, "Agent API Access"/"Non-Agent API"=1,
 * with allowed function list + your server IP allow-listed). Never hardcode — use env vars:
 *   VICIDIAL_URL, VICIDIAL_API_USER, VICIDIAL_API_PASS
 *
 * Confirm exact function names/params against your ViciDial version's API docs (AST_VDauto / docs).
 */

const cfg = {
  base: process.env.VICIDIAL_URL || 'https://your-vicidial-server',
  user: process.env.VICIDIAL_API_USER || '',
  pass: process.env.VICIDIAL_API_PASS || '',
};

async function callNonAgent(fn, params = {}) {
  const u = new URL('/vicidial/non_agent_api.php', cfg.base);
  u.searchParams.set('source', 'telvergence');
  u.searchParams.set('user', cfg.user);
  u.searchParams.set('pass', cfg.pass);
  u.searchParams.set('function', fn);
  for (const k in params) if (params[k] != null) u.searchParams.set(k, params[k]);
  const r = await fetch(u.toString());
  return await r.text(); // ViciDial returns text/pipe-delimited; parse per function
}

async function callAgent(fn, params = {}) {
  const u = new URL('/agc/api.php', cfg.base);
  u.searchParams.set('source', 'telvergence');
  u.searchParams.set('user', cfg.user);
  u.searchParams.set('pass', cfg.pass);
  u.searchParams.set('function', fn);
  for (const k in params) if (params[k] != null) u.searchParams.set(k, params[k]);
  const r = await fetch(u.toString());
  return await r.text();
}

// ---- CRM → ViciDial ----
const Vici = {
  version: () => callNonAgent('version'),

  // Push a BOSS lead into a ViciDial list/campaign
  addLead: (lead) => callNonAgent('add_lead', {
    phone_number: digits(lead.phone),
    list_id: lead.list_id,
    first_name: lead.first_name || '',
    last_name: lead.last_name || '',
    email: lead.email || '',
    address1: lead.address || '',
    city: lead.city || '',
    source: 'boss',
    duplicate_check: 'DUPLIST',
    custom_fields: 'Y',
  }),

  updateLead: (lead) => callNonAgent('update_lead', {
    lead_id: lead.lead_id, status: lead.status, phone_number: digits(lead.phone),
  }),

  // Pull current status of a lead (sync disposition back to BOSS)
  leadStatus: (lead_id) => callNonAgent('update_lead', { lead_id, search_method: 'LEAD_ID' }),

  // ---- Agent API (live agent actions) ----
  agentExternalDial: (agent_user, phone, lead_id) => callAgent('external_dial', {
    agent_user, value: digits(phone), phone_code: '1', search: 'YES', preview: 'NO',
    focus: 'YES', lead_id: lead_id || '',
  }),
  agentDispo: (agent_user, value) => callAgent('external_status', { agent_user, value }),
  agentPause: (agent_user, value /* PAUSE|RESUME */) => callAgent('pause', { agent_user, value }),
};

function digits(s){ return String(s || '').replace(/\D/g, ''); }

// Export for Node or Workers
if (typeof module !== 'undefined') module.exports = { Vici, callNonAgent, callAgent };
