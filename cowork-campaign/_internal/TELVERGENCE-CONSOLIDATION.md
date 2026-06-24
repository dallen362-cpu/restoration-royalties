# TELVERGENCE.com — Consolidated Material Inventory

This document consolidates all TELVERGENCE-related material **that is reachable from
this environment** (the public GitHub account `dallen362-cpu` and the live
telvergence.com site). It is the anchor for the Co-Work Campaign.

> **Scope note / what is and isn't here.** This environment can read this repo's files,
> the GitHub repos via the GitHub API, and public web content. It **cannot** read your
> Claude.ai chats, Claude projects, or Perplexity workspaces. Material that lives only
> in those places (notably the **ViciDial wiring**, **BOSS back-end CRM**, **LMS**, the
> **skills**, and the raw **Perplexity Max / Computer-mode** setup output) is **not
> reproduced here** — see `INTAKE-CHECKLIST.md` for how to bring it in.

---

## 1. What TELVERGENCE is

**Telvergence — "Integrated Communication Technologies."** A unified business
communications platform branded as *"Unified Collaborative Communication Platform
Experience as a Service,"* consolidating phone, messaging, CRM, call tracking, and AI
into one white-label platform. Positioning: *"They sell you phones. We build you a
platform."* Claims 35+ years in telecom, 99.997% uptime, military-grade security.

- **Live site:** https://telvergence.com (served from the `telvergence` repo via CNAME)
- **Source repo:** https://github.com/dallen362-cpu/telvergence
- **Provenance:** Site meta tags + footer credit **Perplexity Computer**
  (perplexity.ai/computer) as the build tool — this is the "Perplexity Max output via
  Computer mode" referenced in the campaign brief.
- **Stack:** Pure HTML/CSS/JS, no external deps. Fonts: Cabinet Grotesk + Satoshi
  (Fontshare). Brand palette: midnight navy `#0A0E1A`, cyan `#00D4FF`,
  lime `#00FF88`, violet `#7B61FF`.

## 2. Assets in the `telvergence` repo

| File | Role | Summary |
|---|---|---|
| `index.html` | Public marketing site | Hero w/ particle canvas, Why/Solutions/How-It-Works/Industries/Results/Pricing/Contact sections. Compares to RingCentral, Grasshopper, Vonage. |
| `app.html` | Operator dashboard ("See It In Action") | Multi-tenant control panel — see §4. |
| `README.md` | Overview | Platform description + stack notes. |
| `CNAME` | Custom domain | `telvergence.com` |

## 3. Marketing site (`index.html`)

- **Nav:** Why Telvergence · Solutions · How It Works · Industries · Results · Pricing · Contact · See It In Action · Get Started
- **Capabilities:** AI call answering + transcription, branded caller ID with
  STIR/SHAKEN, SMS/messaging, real-time call analytics & campaign attribution, CRM
  connectivity, multi-location mgmt, white-label, blockchain-verified call records.
- **Compliance:** E911, number porting, HIPAA-ready, SOC 2, ISO 20022 financial messaging.
- **Integrations named:** Salesforce, HubSpot, custom API (Enterprise).
- **Industries:** Contractors & Home Services · Healthcare & Wellness · Financial
  Services · Real Estate · Professional Services · Franchise / Multi-Location.
- **Pricing:** Starter $499/mo · Growth $999/mo (most popular) · Enterprise $2,499/mo · $1,499 one-time setup.
- **Results claims:** 30%+ savings · 340% lead-capture lift (case study: The Roofing
  Crew) · 60% faster response · zero breaches.

## 4. Operator dashboard (`app.html`)

A white-label, multi-tenant operations console. Screens:

1. **Dashboard** — KPIs: Active Phone Lines 12,847 · Live Calls 2,341 · Messages Today 89,412 · AI-Handled 47,891 · MRR $487,350 · 99.997% uptime.
2. **Phone Numbers** — local/toll-free/international, E911 registration, caller-ID verification.
3. **Calls & Quality** — connection stability, audio clarity, concurrent-call utilization.
4. **Text & Messages** — SMS/MMS delivery, campaign status, compliance.
5. **Emergency Services (E911)** — coverage map, 8,412 protected locations, hurricane protocols.
6. **AI Assistant** — transcription, sentiment, smart routing, data-to-insights.
7. **Verification & Records** — 148,291 verified call records, financial messaging, credits.
8. **Weather Alerts** — NOAA / GOES-18 / NWS feeds, automated rerouting.
9. **Your Brands** — white-label: The Roofing Crew, Body Wellness Connection, Restoration Royalty, Predictive Weather Intelligence, Beverly Wicks.
10. **Customers** — 1,247 customers, 0.8% churn.
11. **Revenue & Billing** · 12. **Settings**

## 5. Relationship to the rest of the account

The dashboard's "Your Brands" panel is the white-label layer over the sub-branded sites
in `SITES.md`. TELVERGENCE is the parent communications platform; each other repo is a
branded front-end/tenant. See the brand→repo mapping in `SITES.md`.

## 6. Known gaps (NOT in any reachable repo)

The following were named in the campaign brief but appear **nowhere** in the GitHub
account or its git history, and are not on disk:

- **ViciDial / "vici dialer" wiring** — outbound/predictive dialer setup.
- **BOSS back-end CRM** integration.
- **LMS** (learning management) component.
- The **skills** and **previously generated code** for the above.
- The raw **Perplexity Max (Computer mode)** transcripts/output used to wire the dialer
  and stand up the TELVERGENCE sub-branded functionality.

These must be supplied by you — see `INTAKE-CHECKLIST.md`.
