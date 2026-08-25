# Restoration Royalty Phone System (Resurrection Build)

The AI phone system for the Restoration Royalty campaign, rebuilt 2026-08-25 from the
recorded architecture (gigapress doctrine item 12) after the original build — authored on
another machine — became unavailable. When the original is recovered, diff it against this
build and merge the better parts; this copy is the durable reference in the master brain.

## What it does

```
caller dials the Smart-DID (e.g. 786-807-MOLD)
        │  carrier routes the DID to the voice gateway (SIP/webhook)
        ▼
server.js  /voice  ──►  agent.js (Claude speech loop: greet → qualify → book → dispatch)
        │                        │
        │                        └── logs word-perfect transcript + outcome → calls.log.jsonl
        ▼
vitelity.js — carrier API layer: search / order / route / CNAM / SMS
        └── /provision endpoint: stand up a new local line programmatically, in minutes
```

- **Inbound intake** — Claude answers in the caller's language, runs the Restoration Royalty
  emergency-intake script (water / mold / storm), qualifies, books, and fires the dispatch SMS.
- **Programmatic provisioning** — search available DIDs by rate center / NPA-NXX, order,
  set routing, enable CNAM, all through the carrier API ("the dial tone itself is software").
- **Welcome text** — every activation ends with an SMS from the new number.
- **Records** — every call appended to `calls.log.jsonl` (transcript, outcome, timestamps).

## Setup

```bash
cd phone-system
cp .env.example .env   # fill in credentials — see SECURITY below (no npm install: Node core only, Node 20.6+)
node server.js         # .env loads automatically (process.loadEnvFile); host secret managers also work
```

Point the DID's route (SIP/forward in the carrier portal, or via `/provision`) at a voice
gateway that POSTs speech turns to `http://<host>/voice`. Any Twilio-compatible voice
webhook gateway works; the endpoint speaks plain JSON in/out so it is gateway-agnostic.

## Endpoints

Every endpoint except `/health` requires the `X-Webhook-Secret` header matching `WEBHOOK_SECRET`
(min 16 chars) — **the server fails closed**: until the secret is set, protected routes return 503.

| Endpoint | Method | Purpose |
|---|---|---|
| `/health` | GET | liveness + config presence check (presence only, not validity; never echoes secrets) |
| `/search` | POST `{state, ratecenter, npa?}` | **read-only** DID inventory search — the safe carrier-credential test; never buys |
| `/provision` | POST `{ratecenter, state, npa?, route}` | search → order (**spends money**) → route → CNAM a new DID |
| `/voice` | POST `{callId, from, to, speech}` | one conversational turn; returns `{say, done}`; intake completion carries structured `{problem, severity, address, name, callback, window}` into the dispatch SMS |
| `/sms` | POST `{to, message}` | send SMS from the campaign line |

## SECURITY (absolute rules)

- **This repository is PUBLIC.** Credentials live ONLY in `.env` (gitignored) or the host's
  secret manager — never in code, never committed, never pasted into chat or email.
- The carrier API key was previously present on a machine outside our control → **rotate it**
  in the carrier portal before first use of this build.
- `calls.log.jsonl` contains caller PII — gitignored, created with owner-only (600) permissions;
  never commit it, and set a retention policy (rotate/purge on a schedule) before real volume.
- `WEBHOOK_SECRET` gates every endpoint except `/health`; generate with `openssl rand -hex 24` and
  configure the same value in the voice gateway's outbound headers.

## Environment

| Var | Purpose |
|---|---|
| `VITELITY_LOGIN` / `VITELITY_PASS` | carrier API credentials (portal → API access) |
| `ANTHROPIC_API_KEY` | the AI layer |
| `CLAUDE_MODEL` | default `claude-sonnet-5` (current Claude Sonnet model id, confirmed valid) |
| `WEBHOOK_SECRET` | min 16 chars; required — all endpoints except `/health` refuse to serve without it |
| `DISPATCH_SMS_TO` | crew phone for dispatch alerts (E.164) |
| `PORT` | default 3000 |
