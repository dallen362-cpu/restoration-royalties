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
npm install          # express + @anthropic-ai/sdk (or run: node server.js with Node 22+, fetch is built in)
cp .env.example .env # fill in credentials — see SECURITY below
node server.js
```

Point the DID's route (SIP/forward in the carrier portal, or via `/provision`) at a voice
gateway that POSTs speech turns to `http://<host>/voice`. Any Twilio-compatible voice
webhook gateway works; the endpoint speaks plain JSON in/out so it is gateway-agnostic.

## Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/provision` | POST `{ratecenter, state, npa?, route}` | search → order → route → CNAM a new DID |
| `/voice` | POST `{callId, from, to, speech}` | one conversational turn; returns `{say, done, outcome}` |
| `/sms` | POST `{to, message}` | send SMS from the campaign line |
| `/health` | GET | liveness + config presence check (never echoes secrets) |

## SECURITY (absolute rules)

- **This repository is PUBLIC.** Credentials live ONLY in `.env` (gitignored) or the host's
  secret manager — never in code, never committed, never pasted into chat or email.
- The carrier API key was previously present on a machine outside our control → **rotate it**
  in the carrier portal before first use of this build.
- `calls.log.jsonl` contains caller PII — it is gitignored; never commit it.

## Environment

| Var | Purpose |
|---|---|
| `VITELITY_LOGIN` / `VITELITY_PASS` | carrier API credentials (portal → API access) |
| `ANTHROPIC_API_KEY` | the AI layer |
| `CLAUDE_MODEL` | default `claude-sonnet-5` |
| `DISPATCH_SMS_TO` | crew phone for dispatch alerts (E.164) |
| `PORT` | default 3000 |
