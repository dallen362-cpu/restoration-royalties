# 🧠 TELVERGENCE — Back-End Ingestion & Synthesis (Quarterback File)

**Purpose:** one file Claude Cowork / Claude Code ingests to synthesize the final production back end — Vitelity (carrier/DID), ViciDial (agent dialer front end), and BOSS (CRM/LMS back office). Paste the Perplexity Max exports into the drop-zones below; everything else is already wired.

**Status legend:** ✅ built in repo · 🟡 needs your input/creds · ⬜ produced on synthesis

---

## 0) What already exists in this repo (don't rebuild — extend)
| Asset | Path | Status |
|---|---|---|
| Vitelity provisioning worker | `cowork-campaign/ops/vitelity-provision-worker.js` | ✅ |
| Vitelity setup guide | `cowork-campaign/ops/VITELITY-SETUP.md` | ✅ |
| ViciDial API client | `backend/vicidial-client.js` | ✅ |
| ViciDial setup guide | `backend/VICIDIAL-SETUP.md` | ✅ |
| BOSS CRM/LMS schema | `backend/BOSS-CRM-LMS-SCHEMA.md` | ✅ |
| Prior research syntheses | `backend/research/MASTER-SYNTHESIS.md`, `research/perplexity-exports/` | ✅ |
| Revenue/metrics data chain | Vitelity API → ViciDial overlay → dashboard (see `BONEYARD.md`) | ✅ |

---

## 1) 🔌 VITELITY API INTERFACE — locked contract
**Endpoint:** `https://api.vitelity.net/api.php` (v1 command API) · params `login`, `pass`, `cmd`, `xml=yes`
**Auth/secrets (server-side only — never in repo):** `VITELITY_API_USER`, `VITELITY_API_PASS` (dedicated API sub-user, IP-allowlisted). 🟡 *you provide once prepaid is funded.*

**Command map used by the provisioning worker:**
| Purpose | cmd |
|---|---|
| List available local DIDs by area code | `listlocal` / `getlocaldid` |
| Order/provision a DID | `getlocaldid` |
| Route / call-forward a DID → subscriber cell | `callfw` / `reroute` / `massreroute` |
| Branded caller-ID (CNAM) | `lidb` (set to brand, e.g. "RESTORATION ROYALTIES") |
| E911 registration | `e911send` |
| SMS enable/send | `setsms` |
| Account balance | `getbalance` |
| CDRs (calls) + SMS + voicemail-by-DID | pulled for the dashboard metrics chain |

**Provisioning flow (front-end activation → carrier):**
1. Subscriber activates 10-pack (free-by-phone or online) → app calls the worker.
2. Worker `getlocaldid` × up to 10 in the subscriber's area code(s) (954/754 · 305/786 · …).
3. `callfw`/`reroute` each DID → the "forward-to" cell captured at intake.
4. `lidb` set branded CNAM · `e911send` dispatchable location · `setsms` on.
5. DID numbers returned to the Mashup Studio / dashboard (replace the local-presence samples).
6. CDRs/SMS/voicemail-by-DID stream back → **Revenue-by-DID** + ViciDial overlay → dashboard.

**To go live:** put `VITELITY_API_USER`/`PASS` in the worker's secret store, deploy the worker, point the funnel's activation success at it. (Steps in `VITELITY-SETUP.md`.)

---

## 2) 📥 DROP-ZONE — Perplexity Max exports (paste below, keep the fences)
> Paste the raw markdown you export from Perplexity Max between the markers. Claude Code reads these verbatim for synthesis. Don't summarize — paste full.

### 2A) ViciDial front-end spec  🟡
```vicidial-export
<<< PASTE PERPLEXITY VICIDIAL EXPORT HERE >>>
(campaigns, ingroups, lists, dispositions, agent screens/scripts, IVR/press-1,
carrier/trunk config, API endpoints non_agent_api.php / agc/api.php, dial ratios,
recordings, real-time reports/KPIs to surface on the dashboard)
```

### 2B) BOSS CRM/LMS back-office spec  🟡
```boss-export
<<< PASTE PERPLEXITY BOSS EXPORT HERE >>>
(data model/attributes you love, lead/profile/account objects, welcome letters,
invoicing & collections, fulfillment, QR/onboarding, LMS training/certification,
roles/permissions, workflows, reports)
```

### 2C) Any Vitelity/carrier notes to reconcile  🟡
```vitelity-notes
<<< PASTE ANY EXTRA VITELITY / CARRIER NOTES HERE (optional) >>>
```

---

## 3) ⬜ SYNTHESIS → PRODUCTION OUTPUT (what Claude Code produces once 2A–2C are filled)
1. **Reconcile BOSS export → `backend/BOSS-CRM-LMS-SCHEMA.md`** — merge your loved attributes into the canonical schema; flag conflicts.
2. **Reconcile ViciDial export → `backend/vicidial-client.js` + `VICIDIAL-SETUP.md`** — map campaigns/ingroups/dispositions to the API client; wire real KPIs to the dashboard (`watch.html`) overlay.
3. **Confirm the data chain** — Vitelity CDR/SMS/voicemail-by-DID → ViciDial dispositions/booked → dashboard tiles (Revenue-by-DID, missed→booked, live agents).
4. **Wire activation → provisioning** — funnel success → Vitelity worker → real DIDs into Mashup Studio + dashboard.
5. **Emit the production build plan** — env/secrets checklist, deploy order (Vitelity worker → ViciDial connect → BOSS import → dashboard live), and a go-live runbook.
6. **Keep the familiar front/back end** — ViciDial agent front end + BOSS back office as you operate them today, fused under the current secured presentation surface.

---

## 4) 🟡 Open inputs needed from David
- [ ] Vitelity `VITELITY_API_USER` / `VITELITY_API_PASS` (after prepaid funded)
- [ ] ViciDial server URL + API user/pass (non_agent_api / agc/api)
- [ ] Perplexity ViciDial export → **§2A**
- [ ] Perplexity BOSS export → **§2B**
- [ ] Stripe `rk_live_` key (for $499 / $1,499 / $22.95 — `ops/STRIPE-SETUP.md`)
- [ ] Confirm domain spellings (`ops/DOMAINS.md`)

*Fill §2A–§2C, hand me this file, and I synthesize the final production back end.*
