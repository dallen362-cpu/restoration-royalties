# Telvergence — Network Enhancement Roadmap & Blueprint (durable memory)

_Captured 2026-08-26 from David Drew Allen's direction. This is the FUTURE build-out spec —
store-in-memory per David ("the rest store in memory for future info for later build outs when
time permits"). The front-end concept demo of this lives at `/softphone/` (the "easiest, fastest
solution for now"); this doc is the real backend blueprint to light up when time permits._

## The vision in one line
Every Smart-DID we issue answers itself with an AI voice agent, and every app on the network carries
an embeddable softphone tied to that DID — inbound intelligence in, a live number in the customer's
hand out. This is THE instant-sale hook: "watch your number go live and hear it answer" is why a
business pays **$5K down without blinking."

## The full lifecycle (target architecture)
1. **Inbound call → AI voice agent answers.** A call hits one of our Smart-DIDs. Because we own the
   dial tone (carrier API → our network), we get the raw call data at minute zero.
2. **Instant caller context** from **CNAM + caller-ID** — name, company, city, prior-call history —
   handed to the agent the moment it rings ("real-time access to live call data").
3. **The brand's own website is the agent's knowledge base.** The agent answers real questions
   correctly (services, the 10-line offer, hours, pricing, promos) in the caller's language —
   retrieval-augmented from the site content that already exists per brand.
4. **Live CRM extraction over WebRTC.** As the call happens, structured fields (name, address, intent,
   urgency, appointment, lead score) stream into the CRM; speaker-separated transcript stored.
5. **Post-call compliant SMS double opt-in** (TCPA):
   - Agent auto-texts the prospect FROM the same DID with recorded-authorization language.
   - Prospect replies **YES** to authorize contact by call/text until they reply **STOP**.
   - Consent captured with timestamp; "STOP to unsubscribe" honored. (This compliance is part of what
     makes it sellable — don't cut it.)
6. **App provisioning with an embedded, live DID.** On opt-in, the system auto-sends the app link with
   **their DID embedded**. The app's softphone is **API-keyed to our Vitelity** carrier, so the number
   is **"hot-flashed" live** into their hand — a working business line in minutes.

## The proven stack — blueprinted & run in 2022 (NOT vaporware)
- **Acrobits** — embeddable white-label softphone client/SDK (drops into any app).
- **Sinch** — CPaaS platform for real-time DID issuance & activation + voice.
- **Vitelity** — our carrier / DID layer (numbers we own and control).
- **EZ VoIP · Reliant Communications** — the live marketing contract that demonstrated real-time DID
  issuance on this exact Acrobits + Sinch stack. Still referenced as active by David.
- **Telvergence blueprints (2022)** — internal design docs for this unification.

## Recoverable assets to pull in when building this (do NOT rebuild from scratch)
- **The 2022 Sinch API integration code** that unified **Sinch + Acrobits with Vitelity** — David has
  this "API code line." Likely lives in the private repos **`dallen362-cpu/telvergence-master-max`**
  ("canonical source of truth: operations, Project Phoenix, VICIdial, Vitelity, integrations") and/or
  **`dallen362-cpu/telvergence-portals`**, or David's local archives / Google Drive
  (`TELVERGENCE_MASTER_MAX_LATEST.zip`). These private repos are OUT of the current session's scope —
  add them to scope (add_repo) to recover the actual integration code.
- **EZ VoIP / Reliant Communications** campaign + product docs — describe the real-time DID issuance
  process in detail; use as the functional spec.
- **AI call-intake pipeline** already specced in this repo:
  `backend/research/perplexity-exports/04-smoke-exposure-restoration-royalty-campaign.md` (V4 section:
  DID answer → transcribe → LLM field extraction → CRM/LMS backfill → appointment → SMS; event router,
  CRM field map, worker-queue schema, DB tables; split into 3 idempotent services).
- **Cloudflare Functions already in repo**: `functions/api/callback.js` (SMS callback via Vitelity),
  `functions/tts.js` (neural voice) — the seams to extend.

## Related recoverable Perplexity work (separate, noted for the same "recover, don't rebuild" reason)
- **Drone video-to-quote** — landing/demo exists (`win.html`); the AI estimation engine was only
  spec'd (`backend/research/perplexity-exports/03-drone-video-to-quote-package.md`), never built.
- **Serotonin full body of work** — complete site (`serotonin.html`, `/serotonin/`, brand-kit config)
  already in this repo, runnable.

## Build phases (when time permits)
1. **Now (done):** `/softphone/` front-end concept demo — inbound AI agent + CNAM + site-KB + live CRM
   + post-call opt-in + app/DID provisioning + proven-stack heritage. The sales showcase.
2. **Phase 1:** Real-time DID issuance service (Sinch or Vitelity provisioning API) → "hot-flash" a DID
   on payment; recover the 2022 integration code first.
3. **Phase 2:** Acrobits softphone embedded in the app, keyed to the issued DID over Vitelity.
4. **Phase 3:** Inbound AI voice agent (media path → STT → LLM with per-brand site KB → TTS), CRM
   field extraction, speaker-separated transcripts. Extend `functions/` + a media/worker tier.
5. **Phase 4:** Compliant SMS double-opt-in automation + app-link delivery with embedded DID.

## Guardrails
- TCPA/consent is not optional — recorded double opt-in, STOP honored, timestamped.
- Secrets (Sinch/Vitelity/Acrobits keys) live ONLY in Cloudflare secrets / env — never in the public repo.
- The `/softphone/` page is a labeled illustrative concept demo — no live telephony runs on it.
