# Telvergence — Network Enhancement Roadmap & Blueprint (durable memory)

## ⭐ TOP OPERATIONAL PRIORITY — DELIVER CALLS NOW (revenue + referral flywheel)
David needs to **begin delivering calls ASAP** to the Restoration Royalties client's remote
call-forward number(s) he is **already paying ~$229/mo** for. Delivering the promised calls keeps him
happy → he **refers more businesses**, which is Telvergence's **#1, most reliable source of new
clients**. This is the flywheel: deliver → referral → deliver. Protect it.

**Fastest path to deliver calls this week (no heavy build):**
1. **Provision a Smart-DID** in the local rate center (Vitelity portal — David). Restoration Royalties'
   config is already perfected as the template.
2. **Forward that DID to the client's number** (straight call-forward in Vitelity is the instant win;
   AI-answer-then-forward is the upgrade). Calls delivered the moment the number goes live.
3. **Put the DID on the client's marketing** — Google Business Profile, ads, and the campaign pages we
   already built (`/case-studies/` smoke-fire, the RR pages). Traffic → the DID → forwarded → delivered.
4. **Activate the click-to-call proxy** (`functions/api/callback.js`) by setting the Cloudflare secrets
   (VITELITY_LOGIN/PASS, CALLBACK_FROM, CALLBACK_ALERT_TO) — David. Site visitors → instant callback → delivered lead.
5. **Proactive outbound (phase 2):** recover **Derek's ContactAM dialing-campaign blueprint** (below) to
   actively generate calls, not just wait for inbound.

**Blockers are David-side credentials, not code:** Vitelity DID provisioning + forwarding, and the
Cloudflare callback secrets. The marketing engine (campaign pages, concept micro-sites, click-to-call
widget) is already built and live. Once the DID forwards and the secrets are set, calls flow.

---


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

## David's favorite reference model — the ORIGINAL fastadjustingservice.com site
David's favorite site layout & offerings is the **original fastadjustingservice.com** — because it had
the **agent-building network intrinsically baked in**: every subscriber is *also* naturally a
**reseller, referral agent, and/or business franchisee**, made possible by the **digital business card
+ new DID combo**. Hand your card → the next business texts to activate their own line + app,
source-tagged to you. Use this original FAST site as the template for how the DID-issuance + recruitment
offer should look and read. (Reflected now in `/softphone/`'s "Grow the Network" band and the concept
pages' refer-&-earn ladder: Free agent → Distributor · overrides → Own white-label · $25K.)

## Self-serve "Choose Your Own Number" + the Vitelity white-label economics
Prospects pick their own number through a **white-label overlay of Vitelity's number-ordering portal
via API** — Telvergence privately labels the carrier's ordering rails as our own. Key economics:
- **We set the markup** on carrier cost (e.g., cost → $22.95/mo flagship line). The margin is ours.
- **Vitelity provides free billing & collections** under our private-label permission — nothing for the
  end customer (or us) to run.
- **Backed by an EXECUTED, long-standing wholesale agreement** with the carrier (Vitelity) — this is the
  real commercial/legal basis for private-label + markup + real-time DID issuance. NOT aspirational.
- Front-end concept demo: `/choose-number/` (search → pick → markup pricing → reserve & hot-flash live → app).

## One private network — the community moat (once the softphone rides every DID)
When the embedded softphone is on every issued DID, all subscribers are on the SAME telephone network,
private-labeled as Telvergence. Marketable capabilities (all live Vitelity features we augment/re-brand):
- **On-net calls are free to us** — subscriber-to-subscriber app-to-app rides our own network, no
  per-minute cost. A structural margin advantage baked into the product.
- **3-digit extension dialing** across the whole network — a Nextel-style private directory spanning
  every brand and agent we've issued a DID to.
- **Find-me / follow-me** — each DID rings the subscriber's cell (overlaps their existing phone) so they
  take calls anytime, anywhere; nothing new to carry.
- **Self-service ring-to change on the fly** — subscribers repoint their number (cell / office / AI)
  themselves, instantly, via our self-service overlay on the Vitelity API. (Vitelity already functions
  this way for us as the underlying provider.)
Reflected now on `/softphone/` ("One Private Network" band).

## The proven stack — blueprinted & run in 2022 (NOT vaporware)
- **Acrobits** — embeddable white-label softphone client/SDK (drops into any app).
- **Sinch** — CPaaS platform for real-time DID issuance & activation + voice.
- **Vitelity** — our carrier / DID layer (numbers we own and control).
- **EZ VoIP · Reliant Communications** — the live marketing contract that demonstrated real-time DID
  issuance on this exact Acrobits + Sinch stack. Still referenced as active by David.
- **Telvergence blueprints (2022)** — internal design docs for this unification.

## RECOVERY LANE FINDINGS (cowork session, 2026-08-26 evening — update as reports arrive)
- **`telvergence-portals` is EMPTY** (bare "create your first file" repo). Confirmed dead end — stop
  hunting it; the master export's note that it was created empty is accurate.
- **`TELVERGENCE_MASTER_MAX_LATEST.zip` found locally** in `C:\Users\dalle\Downloads` (several copies,
  plus 2026-08-09 master code exports). Unzipped to
  `C:\Users\dalle\AI-Master-Brain\Telvergence\RECOVERY\master-max\extracted\` — 20 files:
  **Project_Phoenix, Carriers_and_APIs, white-label agreements, sales scripts, call lists.**
  Mining in progress for the Sinch/Vitelity integration + Derek/ContactAM material.
- **Currency gap:** the local zip is the **2026-07-17 snapshot**; the live private repo
  `telvergence-master-max` has a couple of August 2026 commits on top. Neither session can pull the
  live repo right now (private, out of both sessions' scope; browser downloads don't land in
  Downloads from the automation profile). If mining surfaces references to newer material, David
  downloads a fresh ZIP manually (github.com → Code → Download ZIP) or adds the repo to this
  session's sources — otherwise the July snapshot stands.

## RECOVERY INVENTORY (cowork session, 2026-08-26 — structured findings)
Staged under `C:\Users\dalle\AI-Master-Brain\Telvergence\RECOVERY\master-max\extracted\TELVERGENCE_MASTER_MAX\`.
The July snapshot is **13 markdown docs + 4 spreadsheets — NO source code of any kind.**

- **P1 · Derek's ContactAM / VICIdial dialer blueprint — FOUND (docs):**
  `07_Tech_and_Product/Project_Phoenix/Project-Phoenix-Infrastructure-Backup-2026-04-21.md`
  (rebuild blueprint: mission, ViciBox 11 clean-install sequence, asset inventory; names Derek +
  ContactAM + VICIdial) + `Project_Phoenix/BACKUP_RECOVERY_MAP.md` +
  `00_Command_Center/{MANUAL_DIAL_FALLBACK.md, CURRENT_STATUS_2026-07-10.md, GO_LIVE_CHECKLIST_2026-07-11.md}`.
  → This is the rebuild RECIPE; the running system's images/scripts are in the "still missing" list below.
- **P2 · Sinch/Acrobits/Vitelity integration — docs only, NO code:**
  `08_Carriers_and_APIs/API_INTEGRATION_STATUS.md` (status of Vitelity/Inteliquent/Sinch + Vultr +
  VICIdial + Stripe; auth values deliberately not stored in the file). The actual integration code is
  NOT in the repo.
- **P3 · Executed Vitelity WHOLESALE agreement — NOT present anywhere reachable.** The repo has
  Telvergence's OWN white-label MSA *template* (`01_Core_Offer/telvergence-pricing-and-white-label-agreements.md`)
  and draft Bright Sound billing clauses — not a signed Vitelity wholesale contract. Google Drive has only
  **two Letters of Authorization (LOAs) to Vitelity** + an account-lockdown playbook. HONEST STATUS: the
  Vitelity relationship is evidenced by LOAs + the account, not a located signed "wholesale agreement."
  If a signed wholesale contract exists it's in David's email or the deprovisioned ContactAM OneDrive.

### STILL MISSING → all point to the ContactAM OneDrive (dave@contactam.com) / synced Windows box
Per the repo's own "Still missing" list — the running-system artifacts, none in any reachable location:
custom-patched Aug-2025 ISO, current ViciBox/VICIdial production image, April-2026 Phoenix server
snapshot, **`agi-DID_route.agi`** (the DID routing script), live trunk config, current Vitelity
peering/IP-auth values, current campaign DB export. The recovery map points ALL of these to the
**Contact America OneDrive (dave@contactam.com)**, which `06_DIGITAL-IDENTITY` notes flag as
**DEPROVISIONED**. ⭐ DAVID-ONLY TRAIL: regaining that OneDrive (or the synced Windows machine) is the
single unlock for the actual running dialer + real integration code. This session cannot reach it.

### Google Drive — adjacent material NOT in the repo (stage into RECOVERY)
Located by the cowork session, higher-value than the markdown docs:
- **2026-08-09 master CODE export** — newer than the July zip; may contain the actual code the July
  docs-only snapshot lacks. HIGHEST PRIORITY to stage & inspect.
- Vitelity Provisioning Spec · Vitelity API reference · **Vitelity↔Sinch Lockdown Playbook** · the two
  Vitelity LOAs · **Acrobits private-label softphone PDF** · **EZ VoIP (2020) doc + "EZ VOIP" folder** ·
  Reliant welcome-letter samples · **"Vici Logons" ContactAM config**.
These cover the EZ VoIP / Acrobits / Sinch / Vitelity heritage concretely — the functional spec for the
Phase-1/2/3 build even if the live production code stays locked in the OneDrive.

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
- **Derek's ContactAM dialing-campaign blueprint folder** — Derek built an "awesome" outbound dialing
  campaign solution for ContactAM (dave@contactam.com) using Claude. David has the full blueprint folder
  and all files → use as a **quick, easy rebuild reference** for the dialer/phone-system, NOT a rebuild
  from scratch. In-repo partial reference already present: `backend/VICIDIAL-SETUP.md`,
  `backend/VICIDIAL-EXTRACTION-PROMPT.md`, `backend/vicidial-client.js`, `backend/BOSS-CRM-LMS-SCHEMA.md`,
  `backend/INGESTION-AND-SYNTHESIS.md`. The full Derek/ContactAM folder likely lives in David's local
  archives / Google Drive or the private `telvergence-master-max` repo — gather it before rebuilding.
  (This is the "Derek phone system" resurrection lane noted in the master plan.)

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
