---
name: vitelity-backoffice
description: The Gigapress standard Vitelity (Inteliquent/Sinch) back-office programming for every GOLD brand's 10-line Smart-Number pack — order by rate center, CNAM branding, E911, E411 listing, routing/RCF, the brand/DNI/local-presence role map, and the port-out contact. Baked in as boilerplate so every elected client provisions the same proven way. Portal execution runs in the Cowork/Vitelity session; this skill is the repeatable spec + the per-brand `vitelity` JSON block.
---

# Vitelity Back-Office Programming — Gigapress boilerplate

Every GOLD brand ships a **10-line Smart-Number pack**. This is the set-in-stone back-office
programming that turns those ten raw DIDs into a branded, tracked, emergency-registered grid — the
same way we did restorationroyalties.com and fastadjustingservice.com. The website *displays* the
numbers; this skill is how the *carrier account* behind them is programmed.

## Source of truth (in-repo, do not reconstruct from anywhere else)
- Runbook: `cowork-campaign/ops/VITELITY-SETUP.md`
- API wrapper (exact command names): `phone-system/vitelity.js` — `searchDids`→`listlocal`,
  `orderDid`→`getlocaldid` (`routesip`), `setRoute`→`reroute`, `enableCnam`→`cnamenable`,
  `sendSms`→`sendshort`, `provisionLine` (search→order→CNAM). Plus runbook: `balance`, `listdids`,
  `callfw` (Remote Call Forwarding), E911 register — **command/params vary by product; confirm at
  apihelp.vitelity.net before go-live.**

## Absolutes (honesty + security)
- **Secrets never in the repo or a session.** `VITELITY_LOGIN` / `VITELITY_PASS` live only in the
  Cloudflare Worker / host env. This repo is PUBLIC. Referenced by name only.
- **Numbers are EXAMPLES until actually provisioned.** Pages say "pending / concept line, not yet live"
  until the portal confirms the line is active. Never render a number as live before it is.
- **Provider-agnostic on every public page.** Never name Vitelity/Inteliquent/Sinch (or any dialer) in
  rendered brand HTML — it is back-office only. The public value is the Smart Number; the mechanism is hidden.
- **Execution belongs to the Cowork/Vitelity portal session**, gated on a signed LOA + card on file.
  This skill produces the SPEC; it does not place carrier orders.

## The standard 10-line role map (the boilerplate)
Ordered in one rate center (or NPA·NXX) so caller-ID is local to the market the phones answer to:
| Lines | Role | Programming |
|---|---|---|
| 1 (BTN) | **Flagship / brand** | CNAM = brand name; E911 registered to the business address; RCF → owner's answer point; the number on the card/site |
| 2–3 | **Brand / department** (e.g. español, catering) | CNAM = brand; routed to the same answer point or dept |
| 4–7 | **DNI (dynamic number insertion)** | source-tracked lines the site swaps by channel (SEO, ads, GBP, referral) so every lead is attributed |
| 8–9 | **Local-presence** | rate-center-local numbers for outbound so consent-based callbacks show a local caller-ID |
| 10 | **Capture / catch-all** | the always-answered line behind the whole grid; RCF fallback |

## Standard order recipe (David 2026-09-04 — the set-in-stone pattern; Coastal Crown is the exemplar)
- **10 sequential DIDs from ONE rate center** (Miami-Dade **786** in the exemplar; Coastal Crown = 786-484-7053 → 7062).
  Sequential + same rate center = a clean, local, memorable block.
- **+1 overlapping 786** line = the **owner's forward-to**: set to **Remote Call Forwarding (RCF)**, forwarded by
  **Brightsound Communications** to the owner's cell (Coastal Crown = (786) 340-5777).
- **RCF through Brightsound routes every inbound to the ANIs so we CAPTURE the caller's inbound data + statistics** —
  ANI (caller number), rate center, time, source line — the tracked-lead moat. Each of the 10 lines is source-tagged.
- Same recipe re-skins to any market: swap the rate center / NPA; keep 10 sequential + 1 owner-forward + ANI capture.
- Record the forward-to in `vitelity.roles.capture` context and the 10 lines by role; numbers stay **"pending"** on the
  page until `status:"active"`.

## Per-brand JSON contract (metadata — NOT rendered)
Every brand inherits a `vitelity` block from `brand-kit/brands/_defaults.json` (like `gbp`, it is
provisioning metadata, never emitted into HTML). A GOLD brand fills it in as its lines are ordered:
```
"vitelity": {
  "status": "concept",           // concept | ordered | active   (drives honesty: numbers stay "pending" until active)
  "account": "",                 // Vitelity sub-account/label (never a credential)
  "ratecenter": "", "npa": "", "state": "",
  "e911_address": "",            // registered business address for E911
  "port_out_contact": "",        // the email/contact that holds port-out authority (e.g. telvergence@gmail.com)
  "roles": {"brand": [], "dni": [], "local_presence": [], "capture": ""},  // arrays of the 10 numbers by role
  "cnam_name": "",               // caller-ID name registered in CNAM
  "e411_listed": false,          // directory-assistance listing done
  "loa_on_file": false, "provisioned_on": ""
}
```
`build.py --listings` may summarize `vitelity.status` alongside GBP later; today the block is pure record.

## Procedure (Cowork/Vitelity session runs this, per brand, from the filled block)
1. `balance` sanity → fund if low.
2. `listlocal` in the brand's rate center/NPA → pick 10 memorable/vanity numbers (see `vanity-did-generator`).
3. `getlocaldid` ×10 (order), routing each via `routesip`/`callfw` per the role map.
4. `cnamenable` on the brand lines (CNAM = `cnam_name`).
5. E911 register the flagship (and any line that could dial 911) to `e911_address`.
6. E411 directory listing for the brand line; set `e411_listed`.
7. Assign DNI + local-presence + capture roles; record every number in `roles`.
8. Confirm all ten active; set `status:"active"`, `provisioned_on`; hand back the ledger.
9. Only then does the site "infuse" the nine WTNs (DNI swap + directory) — a separate Gigapress site step.

## Definition of done
The brand's `vitelity` block is filled and `status:"active"`; CNAM + E911 + E411 done; the 10 numbers
recorded by role; LOA on file; and only now are the numbers shown as live on the page. Additive law:
never overwrite a provisioned brand's block — new copy + boneyard for any re-issue.
