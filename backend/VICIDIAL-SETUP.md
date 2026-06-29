# ViciDial API — Setup Runbook (BOSS ↔ Dialer bridge)

Connects the BOSS CRM to the ViciDial front-end dialer using `backend/vicidial-client.js`.

## Step 1 — Create a ViciDial API user
1. ViciDial admin → **Users → Add New User** (or edit an existing service user).
2. Set: **User Level 8–9**, **Agent API Access = 1**, **Non-Agent API Access = 1**.
3. Under **API**, set **Allowed API functions** (e.g. `add_lead, update_lead, external_dial, external_status, pause, version`).
4. Note the **user** and **pass**.

## Step 2 — Network / security
- Allow-list your server's IP in ViciDial (Admin → Settings → API / or firewall) so the API accepts calls.
- Always call over **HTTPS**. Never expose the API user/pass client-side.

## Step 3 — Configure env vars (server / Worker)
```
VICIDIAL_URL=https://your-vicidial-server
VICIDIAL_API_USER=...
VICIDIAL_API_PASS=...
```

## Step 4 — Wire it
- **CRM → dialer:** when a BOSS lead is created/assigned, call `Vici.addLead({phone,list_id,...})`.
- **Dialer → CRM:** poll/receive ViciDial dispositions and write them back to `call_log` + `lead.status`.
- **Live agent actions:** `Vici.agentExternalDial`, `agentDispo`, `agentPause` drive the agent panel
  (the same flow the demo back office simulates).

## Step 5 — Confirm before go-live
- Exact `function` names/params for your **ViciDial version** (the non_agent_api / agc/api function lists).
- The **list_id / campaign_id** to load BOSS leads into.
- Whether agents use the ViciDial native UI or the TELVERGENCE back-office front end (then we proxy the Agent API).

## Captured in this repo
- `backend/BOSS-CRM-LMS-SCHEMA.md` — the data model (augment with the Perplexity BOSS specs).
- `backend/vicidial-client.js` — the API client.
- `backend/VICIDIAL-SETUP.md` — this runbook.
- (Telecom provisioning lives in `cowork-campaign/ops/vitelity-provision-worker.js`.)
