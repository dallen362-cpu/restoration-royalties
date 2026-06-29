# Vitelity API Provisioning — Setup Runbook

Goal: when a subscriber activates the 10-Line Smart DID Pack (incl. the $0 / 30-day trial start),
automatically provision 10 DIDs, set **Remote Call Forwarding** to their phone, and register E911 —
by calling the **Vitelity API** from a Cloudflare Worker on a Stripe webhook.

> Honest note: Vitelity is now an **Inteliquent / Sinch** company. API access is enabled per account.
> Confirm exact command names/params at **https://apihelp.vitelity.net/** — `getlocaldid`, `listlocal`,
> `balance`, `listdids` are confirmed; `callfw` and E911 commands vary by account/product.

## Step 1 — Get Vitelity API access
1. Log in to the Vitelity/Inteliquent portal → **API** (or contact Vitelity support to **enable API access**).
2. Note your **API username** and **API password** (some accounts use a separate API password from the portal login).
3. **Fund** the account (DIDs + per-minute/E911 carry cost) and request **E911** provisioning if not enabled.

## Step 2 — Deploy the Worker
1. Cloudflare → **Workers & Pages → Create → Worker**. Paste `ops/vitelity-provision-worker.js`.
2. Bind a **KV namespace** named `PROVISIONED`.
3. Add **Secrets** (Settings → Variables):
   - `STRIPE_WEBHOOK_SECRET`
   - `VITELITY_USER`, `VITELITY_PASS`
4. Deploy → copy the Worker URL.

## Step 3 — Point Stripe at it
1. Stripe (LIVE) → **Developers → Webhooks → Add endpoint** → your Worker URL.
2. Events: **`checkout.session.completed`** and **`customer.subscription.created`**.
3. Copy the endpoint's **Signing secret** → set it as `STRIPE_WEBHOOK_SECRET` in the Worker.

## Step 4 — Capture the "forward-to" number at checkout
So the Worker knows where to forward, add it on the **Payment Link**:
- Payment Link → **Custom fields → Add field** → label "Phone your lines should ring", **key = `forward_to`**.
- (The funnel already collects it; this makes it available to the Worker via `session.custom_fields`.)
- Keep **quantity = 10** (or adjustable 1–10) and **collect email** on.

## Step 5 — Test, then go live
1. In Stripe **test mode**, complete a checkout with the test card → confirm the Worker logs the order in KV.
2. Verify in Vitelity that DIDs were ordered + forwarding set (use a small qty while testing).
3. Flip to **LIVE** keys/secret and a live Payment Link.

## What the Worker does (per activation)
`balance` (sanity) → `listlocal` (find DIDs in market) → `getlocaldid` ×10 (order) →
`callfw` (forward each to subscriber's phone) → E911 register → record DIDs in KV (idempotent).

## Still to confirm before go-live
- Exact `callfw` + E911 command/params for your Vitelity product (apihelp.vitelity.net).
- NPA → state/ratecenter mapping for `listlocal` (or order by ratecenter).
- Whether to provision at **trial start** (day 0) or **first paid invoice** (day 31) — provisioning real
  DIDs at day 0 incurs cost before first payment. Change the handled event accordingly.
