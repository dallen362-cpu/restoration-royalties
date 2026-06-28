# TELVERGENCE — Go-to-Market Runbook: Source Security + Payments + Auto Access

This is the turn-key sequence to (A) truly protect the source code while keeping the
demo live, and (B) take real payments that auto-provision access. Everything in the
repo is already staged for it; the steps below are the account-side actions only you can do.

> Order matters. Do PART 1 before flipping the repo private, or the live site goes dark.

---

## PART 1 — Keep the site live AND make the source private (Cloudflare Pages)

Goal: serve `telvergence.com` from this repo via **Cloudflare Pages** so you can flip the
GitHub repo **private** without the public site going offline.

1. **Cloudflare account** → add your domain `telvergence.com` (point its nameservers to
   Cloudflare when prompted).
2. **Workers & Pages → Create → Pages → Connect to Git** → authorize GitHub → pick
   `dallen362-cpu/restoration-royalties`.
   - Framework preset: **None** (static site).
   - Build command: *(blank)*  ·  Build output directory: **/** (repo root).
3. Deploy. You'll get a `*.pages.dev` URL — confirm it serves.
4. **Custom domains** (Pages project → Custom domains): add `telvergence.com` and
   `www`, and for brand sub-sites add `restorationroyalty.telvergence.com`, etc.
5. ✅ **Already staged for you:** `_headers` and `_redirects` are committed at the **repo
   root**, so Cloudflare Pages applies them automatically (security headers + old paths kept
   dead). Nothing to do here — they ship with the build output (root).
6. **Now flip the GitHub repo to Private:** GitHub → repo → Settings → General → Danger
   Zone → Change visibility → Private. Cloudflare keeps serving; GitHub Pages stops, which
   is fine — Cloudflare is now the front.
7. (Optional) Turn on **Bot Fight Mode**, **Hotlink Protection**, and a WAF rule in
   Cloudflare for extra protection.

✅ Result: source private on GitHub, site still live on `telvergence.com` via Cloudflare.

---

## PART 2 — Gate the proprietary vault with Cloudflare Access (email-verified)

Goal: only people you authorize (or who paid) can open the master portal — enforced, not
just obscured.

1. Cloudflare **Zero Trust → Access → Applications → Add an application → Self-hosted**.
2. Application domain: `telvergence.com` , path: `/cowork-campaign/vault-7kq9x2m4/*`
   (and any brand sub-paths you want gated).
3. **Policy:** Allow → Include → *Emails* (list the people you authorize) — or *Emails
   ending in* a domain, or an **Access Group** you maintain. Authentication: one-time PIN
   (email) so no passwords.
4. Save. Now the vault opens only for allow-listed emails, even if someone has the link.

This is the real lock. The in-page email gate becomes a friendly backstop.

---

## PART 3 — Take payments (Stripe Payment Links — no server needed)

1. Stripe Dashboard → create the **recurring price**: **$22.95 / month**, then
   **Payment Links → Create** on that price with:
   - **Free trial: 30 days** (Stripe collects the card but charges $0 today; auto-bills
     after 30 days — this is exactly the "no money down, card on file" offer).
   - **Let customers adjust quantity**, max **10** (= up to $229.50/mo).
   - **Subscription** (recurring monthly, prepaid at each period start).
2. On the link: **After payment → Redirect** to
   `https://telvergence.com/cowork-campaign/welcome.html`
   (email collection is on by default).
3. Paste the **one** link URL into `cowork-campaign/join.html` → `STRIPE_LINK`.
   *(Send me the URL and I'll commit it.)* The page already passes `?quantity=N` (1–10).
4. Done — `join.html` now sends customers to real Stripe checkout; `welcome.html` hands
   them their secure portal link.

That alone is a working paid funnel. PART 4 makes access **automatic**.

---

## PART 4 — Auto-provision access (Stripe webhook → Cloudflare)

Goal: the moment someone pays, their email is added to the Access allow-list and they get
their welcome link — no manual step.

1. Deploy `ops/stripe-provision-worker.js` as a **Cloudflare Worker**.
2. Bind a **KV namespace** `PAID_EMAILS` to it.
3. Set Worker secrets: `STRIPE_WEBHOOK_SECRET`, `CF_API_TOKEN`, `CF_ACCOUNT_ID`,
   `CF_ACCESS_APP_ID`, `CF_ACCESS_POLICY_ID` (from PART 2).
4. Stripe Dashboard → **Developers → Webhooks → Add endpoint** → your Worker URL →
   events `checkout.session.completed` and `customer.subscription.deleted`.
5. Now: pay → email added to Access (instant entry) ; cancel → email removed.

> The worker is a template — read its header comments. Until secrets are set it does
> nothing destructive. For a no-code start, skip PART 4 and add paid emails to the Access
> policy manually (PART 2) — the worker just automates that.

---

## What I (Claude) have already staged for you
- `cowork-campaign/index.html` — locked "Access Controlled" front door (old links dead) with **Subscribe** + Request-access CTAs.
- `cowork-campaign/join.html` — public checkout: **30-day free trial, $0 today**, up to 10 lines, unlimited calls/connects, then auto-bills $22.95/line/mo. Ready for your Stripe Payment Link URL.
- `cowork-campaign/welcome.html` — post-activation page: trial active, card on file, billing starts in 30 days; hands over the secure portal link.
- `cowork-campaign/vault-7kq9x2m4/` — the entire platform behind one secret master path (email-gated, noindex).
- `_headers`, `_redirects` (at repo root) — security headers + old-path redirects, ready for the Cloudflare build.
- `ops/stripe-provision-worker.js` — auto-provision worker template.

## Hand me any of these and I commit them instantly
- Your **Stripe Payment Link** URL (30-day trial, $22.95/mo, qty≤10) → live checkout.
- Your **Cloudflare Pages** URL / confirmation → I move `_headers`/`_redirects` to root.
- Say "move configs to root" and I'll stage them for the Cloudflare build.
