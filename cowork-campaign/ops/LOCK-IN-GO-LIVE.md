# 🚀 TELVERGENCE — Lock-In & Go-Live Runbook (the office session)

**Goal:** one turnkey, airtight, anonymous, secured program you can **demo, sell, or rent to any prospect tomorrow.** Run these parts in order at your desk. Est. total: **~30–45 min.**

Related docs: `PROJECT-URL-POLICY.md` (the rule) · `MIGRATION-RUNBOOK.md` (detail) · `STRIPE-SETUP.md` (payments) · `INGESTION-AND-SYNTHESIS.md` (carrier/dialer back end) · `DOMAINS.md`.

---

## ✅ Already done today (nothing to do — just know it's live)
- **16 platform surfaces** live (deck, platform, dashboard builder, mashup studio, fleet grid, weather window, network, revenue, showroom, funnel).
- **Stripe wiring** — one-file config (`stripe.js`); every Pay button ready, routes to the founder line until a live link is pasted (never dead).
- **Prospect packet** — hosted PDF + interactive brief + Gmail draft.
- **Anonymous pitch link (instant, private)** — claude.ai artifact:
  `https://claude.ai/code/artifact/c3eaeba1-b727-471e-bcd2-9b13cf51ea94`
- **Policy + runbooks** committed.

---

## PART 1 — Anonymous, secured home on `demo.telvergence.com` (~15 min)
*Kills the personal `github.io` link and the free-source-download hole. DNS is already on Cloudflare, so this is fast. Pick ONE path.*

### 🅰️ Dashboard (you click)
1. dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** → authorize GitHub → grant repo **`restoration-royalties`**.
2. Build settings: Project name `telvergence` · Branch `main` · Framework **None** · Build command **blank** · **Build output directory `cowork-campaign`** → **Save and Deploy**.
3. Project → **Custom domains → Set up a domain →** `demo.telvergence.com` → Activate.
4. **Zero Trust → Access → Applications → Add → Self-hosted →** `demo.telvergence.com` → policy **Allow → Emails / One-time PIN** → Save.
5. *(Optional, keep packet public: 2nd app on path `/packet` → Bypass → Everyone.)*

### 🅱️ API token (I do 1–4 for you)
Create a custom token (5 perms: Pages Edit · Access Apps&Policies Edit · Access Orgs/IdP Edit · DNS Edit · Zone Read; zone = telvergence.com; TTL end-of-day) → paste it to me → I build + wire + gate it → you delete the token.

**Verify:** open `https://demo.telvergence.com` → you hit the Cloudflare login → then the site. ✅

---

## PART 2 — Flip the repo private (~1 min) — do AFTER Part 1 verifies
GitHub → repo → **Settings → Danger Zone → Change visibility → Private.**
*Safe now: Cloudflare serves its own copy, so nothing goes dark. This closes the free-source-download hole permanently.*

---

## PART 3 — Turn on real payments (Stripe) (~5 min)
1. Get a Stripe key: dashboard → Developers → API keys (or a **restricted** key with write on Products/Prices/Payment Links).
2. Run: `STRIPE_KEY=sk_live_xxx bash cowork-campaign/ops/stripe-setup.sh` → it prints two Payment-Link URLs.
3. Paste both into **`cowork-campaign/nx8k4q2m9v7r/stripe.js`** (`BACKEND_LINK` + `FRONTEND_LINK`). Commit.
4. **Now the `$499` button and the funnel charge for real.** (Hand me the key and I'll do 2–3.)

---

## PART 4 — Repoint the campaign to the anonymous domain (~3 min, I do it)
Once `demo.telvergence.com` is live, hand me the word and I will:
- Regenerate the **Gmail packet** links + hero image to `demo.telvergence.com`.
- Update the **Showroom** entries to the new `name.telvergence.com` URLs.
- Retire/stop sharing all `dallen362-cpu.github.io/...` links.

---

## PART 5 — "Sellable / rentable tomorrow" smoke test (~5 min)
Walk it exactly as a prospect would:
- [ ] `demo.telvergence.com` → Access login works → deck loads.
- [ ] Founder call button dials **(689) 242-1041**.
- [ ] Onboarding funnel completes → Stripe checkout opens (test card `4242 4242 4242 4242`).
- [ ] `$499` platform button opens Stripe checkout.
- [ ] Packet PDF + brief open.
- [ ] Weather window resolves a ZIP; fleet grid + network animate.

If all six pass → **you can demo and sell tomorrow.**

---

## 🟡 To go from "demo-ready" to "fully provisioned live service" (when you're ready)
These make a *rented* account actually provision numbers & run the dialer — not needed to sell/demo, needed to fulfill:
- **Vitelity** API user/pass → real DIDs provision on activation.
- **ViciDial** server + creds, **BOSS** export → dialer + CRM live (paste Perplexity exports into `INGESTION-AND-SYNTHESIS.md`).
- Confirm domain spellings (`stormdispatch.com`, `dominatefromthe.cloud`).

*Sell/demo/rent = ready after Parts 1–5. Full fulfillment = add the carrier/dialer creds above.*

---

## One-line status for tomorrow's pitch
> "Anonymous, password-gated `demo.telvergence.com`; live Stripe checkout; a private one-page pitch link; 16 working surfaces; free front end + $499 back end — demo it, sell it, rent it today."
