# TELVERGENCE — Master Research Synthesis (Perplexity exports → buildable specs)

Consolidates the Perplexity Max exports in `./perplexity-exports/` into one organized,
actionable source-of-truth for the master GitHub project. Raw exports are preserved verbatim;
this file extracts the strategy + the concrete things to build. **More exports incoming — append as they arrive.**

---

## A. The core engineering thesis (export 01)
TELVERGENCE + Bright Sound = one telecom-and-marketing engine where a business's **number + website + outreach** act as a single customer-acquisition layer.

- **NPA/NXX DID-matching engine:** dialer requests a DID → checks the NPA/NXX file → if match, dial; if not, pull/buy a matching **ANI/DID** from Vitelity inventory, insert as caller ID, dial — in real time, at scale, low cost. ("Local presence" / saturation, first-come-first-serve grid inventory.)
- **Proximity marketing:** geo-fencing + push + early subscriber presence = a **signal beacon** in an NPA/NXX; first adoption in a territory = dominance "from the cloud." (Feeds the WIN National Grid saturation model already built.)
- **Smart Talk Website / AI agent:** convert any URL → talking website with embedded **Smart DID** + outbound voice agent + missed-call text-back + SMS/RCS, in <2 min. Familiar telecom logic: hunt group, rotary, virtual PBX, IVR, if-then.
  - **Pricing captured:** **$199 MRC** (full Smart Talk site) or **$99 per ANI/DID MRC**.

## B. Product / package ladder (exports 01 + 03)
| Tier | What | Price (captured) |
|---|---|---|
| 10-Line Smart DID Pack *(built — live funnel)* | 10 branded E911 DIDs + Remote Call Forwarding | $22.95/line → $229.50/mo (30-day free trial) |
| Smart Talk Website + AI agent | URL→talking site, Smart DID, voice agent, missed-call text-back | $199 MRC, or $99 per DID MRC |
| **Drone Video-to-Quote** *(NEW — to build)* | Upload raw drone footage → AI roof-damage estimate + invoice | **$495** one-time, **or** $399/mo SaaS, **or** $49/estimate |
| Photo-to-Quote (Starter) | Picture → invoice | (existing method) |
| Premium | Drone video + human review + priority turnaround | — |

**Drone Video-to-Quote — build spec (export 03):** dedicated landing page mirroring high-converting roofing pages. Headline "Turn Drone Footage Into an Instant Roof Repair Quote"; primary CTA "Upload Drone Video"; fields name/phone/email/address/roof type + footage upload; flow: hero → upload/demo → 3-step how-it-works → sample output (damage summary + estimate + invoice) → trust → FAQ → repeat CTA. **TODO: build `dron-video-quote` landing page + link from TELVERGENCE.com.**

## C. Brand architecture (export 02)
All plug into TELVERGENCE (cloud comms engine) under the flagship promise **"Office off the Roof."**
- **Storm Dispatch Network** — storm-event dispatch/routing layer (geo-targeted calling, live lead routing when weather hits). *(Dashboard built.)*
- **Restoration Royalty** — premium homeowner restoration brand / case-study vertical.
- **The Roofing Crew** — contractor-facing brand (act like a full back office with two trucks + a ladder).
- **Weather Intelligence Network (WIN)** — the data/insight layer that tells Storm Dispatch where to focus. *(WIN TV + live NWS built.)*
- **"Office off the Roof"** — the pitch to roofers: run phones + leads from the cloud, white-label TELVERGENCE to their industry, scale beyond physical labor.

## D. Proof of concept — Press-1 / TPV case study (export 02)
"Project Phoenix / Street Savings" flagship: **3,500 leads → 34 press-1 (~0.97%) → 1 fully automated TPV enrollment** end-to-end with no live agent. Frame as "automation works in the wild" proof. **TODO: one-page case study `case-studies/press1-tpv-3500.md`.**

## E. Campaigns & leads (exports 02 + 04)
- **South Florida smoke-exposure campaign (Restoration Royalty):**
  - 🔴 High (downwind plume): Miramar, Pembroke Pines, Weston, Doral, Hialeah
  - 🟠 Moderate: Miami Lakes, Miami Gardens, N. Miami/N. Miami Beach, Sunrise, Plantation
  - 🟡 Lower: W. Fort Lauderdale suburbs, Coral Springs, SW Palm Beach fringe
  - Structure: 3 ad groups by exposure level; angle = fast smoke/soot remediation + indoor-air recovery; offer = free smoke-damage inspection; 1 search + 1 retargeting + 1 emergency landing page.
- **Orlando roofing seed leads** (near 8832 Southern Breeze Dr, 32836) captured from export 02:
  Schick Roofing (407) 749-0808 · Bela Roofing (407) 250-4904 (Matt@belaroofing.com) · DRS Roofing (407) 240-1225 · Roof Top Services (407) 476-0260 · Summit Roofing Solutions (321) 332-3392 · Baker Roofing (407) 930-6079.
  → seed into BOSS CRM / ViciDial list. *(The original Vici roofing-leads CSV is in the user's backup — upload it and I'll normalize + load.)*
- **"Office off the Roof" owner-recruitment play:** book 5 roofing owners for in-home estimates → pitch the white-label cloud system. Script captured in export 02.

## F. Build queue derived from this research
- [ ] **Drone Video-to-Quote** landing page + package + suggested pricing (above) on TELVERGENCE.
- [ ] **Smart Talk Website / AI agent** tier ($199 / $99-per-DID) as a product.
- [ ] **Press-1/TPV case study** one-pager.
- [ ] **Storm/smoke geo campaign** page for Restoration Royalty (exposure-zone ad groups).
- [ ] Seed **roofing leads** into BOSS/ViciDial (await the backup CSV for the full set).
- [ ] NPA/NXX **DID-matching + proximity** logic → fold into the Vitelity provisioning worker + grid model.

> Sources: `./perplexity-exports/01..04`. Public TELVERGENCE/Televergence positioning: cloud telephony, STIR/SHAKEN, remote-worker cost savings — consistent with "Office off the Roof."
