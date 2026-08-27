---
name: listing-foundation
description: Run the Telvergence "listing foundation" every time a new brand, client, or catch page launches. Establishes the canonical NAP (name/address/phone), stands up the Google Business Profile and Tier-1 directory citations, wires the review link, and registers the brand in the master catalog. Use when onboarding a new brand/client, publishing a new catch page, or refreshing citations on a schedule.
---

# Listing Foundation — the Telvergence brand-launch routine

**Principle:** No brand is "launched" until its listing foundation exists. Listings come FIRST, before ads. Free citations are the ground floor of every campaign; paid amplifies only what already converts.

## When to run
- A new brand / client / catch page goes live.
- A monthly refresh loop (citations decay; keep NAP consistent and profiles fresh).
- Before spending any paid ad dollars for a brand.

## The canonical NAP (single source of truth)
Keep these **identical** across every listing — inconsistency destroys local ranking.
- Business name (exact, per brand)
- Phone: the brand's branded local number (default umbrella: 689-242-1041)
- Email: contact@telvergence.com
- Website: the brand's live catch-page URL
- Type: Service-Area Business (hide address; set service areas)
- Category: brand-appropriate (see brand table in the Directory & GBP Kit)

Reference kit (paste-ready copy + submit links + progress tracker):
`https://dallen362-cpu.github.io/restoration-royalties/cowork-campaign/bba98f6f4636afd2ba261f85460f7f90/telvergence/directory-kit.html`

## The routine (run in order)
1. **Lock the NAP** for the brand (name, branded number, catch-page URL, category, service areas).
2. **Google Business Profile** — create/claim, service-area, paste long description + services, add number + website, **turn auto-verification ON** (see below), record method + go-live date.
3. **Tier-1 citations** — Bing Places, Apple Business Connect, Yelp, Facebook Page, Nextdoor. Identical NAP.
4. **Review link** — generate and store the Google review link; attach to the brand's follow-up flow.
5. **Google Posts** — schedule one weekly post using the brand's ad copy from Campaign Command.
6. **Register** the brand + its links in the Master Review catalog.
7. **Tier-2/Tier-3 + niche** citations — hand to a VA using the Directory & GBP Kit; track progress.

### Google auto-verification — ON by default (standing rule)
There is no single "auto-verify" toggle at Google; "auto-verification ON" for us means **always take the
fastest self-verifying path** and never default to the slow postcard:
- **Search Console instant verification (primary).** Verify the brand's DOMAIN in Google Search Console
  first, signed into the **agency Google account**. Because every gigapress brand has a domain we own,
  creating the GBP under the same account with the matching website URL then offers **instant verification —
  no postcard**. Make GSC domain verification a build step for every brand.
- **Bulk / chain verification (at scale).** Once 10+ locations run under one **Business Profile Manager
  (agency)** account, request Google **bulk verification** so new brands auto-verify without per-location
  postcards. Pursue this the moment the network crosses the threshold.
- **Fallback:** if instant isn't offered, trigger the fastest available (email/phone), never leave it
  unverified. Record `verify_method` + `go_live` in the brand's `gbp` block.

## Loop cadence
- **Launch:** steps 1–6 same-day; Tier-1 within 48h.
- **Monthly:** verify NAP still identical everywhere; post fresh Google Posts; request new reviews.

## Keep listings from being suspended (compliance — protects the whole network)
Google aggressively suspends lead-gen and multi-brand listings that misrepresent. Every brand's GBP must be
a truthful, distinct, reachable business or it endangers all the others:
- **Truthful NAP only** — real business name (no keyword stuffing like "Best Miami Mold Removal"), a real
  reachable phone, real service areas. The name on the GBP matches the real-world brand signage/name.
- **Service-area model** — hide address; set genuine service areas. Never a fake storefront.
- **One listing per real business per location** — no duplicate/near-duplicate listings; duplicates get
  the whole account flagged.
- **The number rings a real, answered line** (the brand's Smart-DID → our answering) — Google may test-call.

## Guardrails (non-negotiable)
- NAP identical everywhere; never expose a private/home address (service-area only).
- Medical/health brands (DRX9000, Serotonin): access + outcomes only — no cure claims, no guaranteed results.
- No fabricated reviews, credentials, or statistics.
- GBP **creation** still needs a real Google account + real identity — but **verification is auto/instant
  by default** (GSC-linked instant verify; bulk/chain verify at scale). Turn it ON; never settle for the
  slow postcard path.

## Machine contract — the automaton enforces this
The record of "done" is the brand's `gbp` block in `brand-kit/brands/<slug>.json`. `brand-kit/build.py`
**refuses to publish** a brand (non-zero exit; blocks the merge) until that block shows a GBP with
auto-verification ON:
```json
"gbp": { "auto_verify": true, "status": "verified", "verify_method": "search-console-instant",
         "profile_url": "https://g.page/…", "review_link": "https://g.page/…/review", "go_live": "2026-08-27" }
```
- `status`: `verified` or `pending` (GBP created, auto-verify in flight) → publishable · `required` (not
  started) → **blocked** · `concept` (internal mock, not a real client yet) → deferred/allowed.
- `auto_verify` MUST be `true` for every brand. Check the gate any time with
  `python3 brand-kit/build.py --listings`.

## Definition of done
Every new brand has: a **GBP with auto-verification ON** (verified or auto-verifying), 5 Tier-1 citations
with identical NAP, a live review link, a scheduled post, a row in the master catalog, **and a completed
`gbp` block in its brand JSON so `build.py --listings` shows it green.**
