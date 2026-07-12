# 🚚 TELVERGENCE — Go-Private + Cloudflare Migration Runbook

Executes `PROJECT-URL-POLICY.md`: move off the public `dallen362-cpu.github.io/...` path to a **private repo → Cloudflare Pages → `name.telvergence.com` → Cloudflare Access** stack.

---

## ⚠️ Read first — what breaks the instant the repo goes private
On the **GitHub Free** plan, making the repo private **turns off GitHub Pages completely.** Every live link goes dark at once:
- `login.html` + the entire `nx8k4q2m9v7r/` deck and all 16 surfaces
- `stripe.js` (the onboarding funnel's card-path config)
- `packet/TELVERGENCE-Prospect-Brief.pdf` + `packet/brief.html` → **the two links in the Gmail draft 404**
- The fire-photo hero URL → **the image in the Gmail draft breaks**
- Public gate + root redirect

**➡️ If you go private before Cloudflare is up, do NOT send the Gmail draft** — its links/image are dead until the new URL is live.

> **GitHub Pro/Team plan:** Pages keeps serving from a private repo, so the site stays up and source is hidden — but the URL is still `dallen362-cpu.github.io` (not anonymous). Cloudflare is still required for the anonymous `name.telvergence.com`.

---

## Two sequences — pick one
### 🟢 Sequence A — Cloudflare first (ZERO downtime, recommended)
Site never goes dark; you flip private only after the new URL is proven live.
1. Part 2 (Cloudflare Pages) → 2. Part 3 (DNS) → 3. Part 4 (Access) → 4. **verify `name.telvergence.com` serves** → 5. Part 1 (make private) → 6. Part 5 (retire old links, resend packet).

### 🟡 Sequence B — Private now (stops source exposure today, accepts an outage)
Source-download risk ends immediately; live demo is dark until Cloudflare is configured.
1. Part 1 (make private — site goes dark) → 2. Part 2–4 (Cloudflare) → 3. Part 5 (resend packet with new URLs).

---

## PART 1 — Make the GitHub repo private
1. Go to **https://github.com/dallen362-cpu/restoration-royalties**
2. **Settings** (top tab) → scroll to the bottom → **Danger Zone**
3. **Change repository visibility** → **Change to private** → type the repo name to confirm.
4. Done. (Free plan: Pages is now off and all `github.io` links 404. Pro plan: Pages keeps serving.)

**Rollback:** same path → Change visibility → Public (Pages returns within a minute or two).

---

## PART 2 — Cloudflare Pages from the private repo
*Prereq: a free Cloudflare account (https://dash.cloudflare.com/sign-up).*
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. **Connect GitHub** → authorize the Cloudflare app → grant access to **`dallen362-cpu/restoration-royalties`** (private is fine — Cloudflare reads it through the authorized app).
3. Select the repo → **Begin setup**:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leave empty — it's a static site)*
   - **Build output directory:** `/` (repo root)
4. **Save and Deploy.** You get a `https://<project>.pages.dev` URL. Verify a page loads, e.g. `…pages.dev/cowork-campaign/login.html`.

> Note: on Cloudflare the repo-name disappears from the path — pages live at `/cowork-campaign/…` (no `/restoration-royalties/`). We can flatten paths later if you want `name.telvergence.com/login.html` directly.

---

## PART 3 — DNS: point `name.telvergence.com` at it
**Recommended:** move `telvergence.com` DNS to Cloudflare so Access (Part 4) works.
1. Cloudflare → **Add a site** → `telvergence.com` → Free plan → Cloudflare shows two **nameservers**.
2. **GoDaddy** → your domain → **DNS → Nameservers → Change → I'll use my own** → paste the two Cloudflare nameservers → save. (Propagates in minutes–hours; existing records are imported first so mail/site keep working.)
3. Back in Cloudflare Pages → your project → **Custom domains** → **Set up a domain** → enter e.g. `demo.telvergence.com` (or the project's chosen `name`) → Cloudflare auto-creates the CNAME. Wait for **Active**.

**Alternative (keep DNS at GoDaddy):** GoDaddy → DNS → Add **CNAME**, Name `demo`, Value `<project>.pages.dev`, TTL 600. (Works for hosting, but Cloudflare **Access** needs the domain on Cloudflare — so the nameserver move above is preferred.)

---

## PART 4 — Cloudflare Access (the real login gate)
*Requires the domain on Cloudflare from Part 3.*
1. Cloudflare → **Zero Trust** → (one-time: pick a team name, Free plan covers up to 50 users).
2. **Access → Applications → Add an application → Self-hosted.**
3. **Application domain:** `demo.telvergence.com` (the subdomain from Part 3).
4. **Add policy:** Name "Members", Action **Allow**, Include → **Emails** (list the addresses allowed) *or* **Email OTP** (anyone enters an email, gets a one-time code). Save.
5. Now visiting the subdomain forces a real login **before the page loads** — true edge auth, replacing the client-side password. (Later: swap to BOSS/ViciDial SSO as the identity provider.)

---

## PART 5 — After the new URL is live
- [ ] Update the **Showroom** entries to the new `name.telvergence.com` URLs.
- [ ] Update the **Gmail draft** packet links + hero image to the new domain (I'll regenerate it).
- [ ] Retire / stop sharing every `dallen362-cpu.github.io/...` link.
- [ ] (If you kept the repo public for Sequence A) **now flip it private** — Part 1.
- [ ] Confirm the founder call button + Stripe still resolve on the new host.

---

## Quick reference
| Item | Value |
|---|---|
| Repo | `dallen362-cpu/restoration-royalties` (→ make private) |
| New host | Cloudflare Pages (`<project>.pages.dev`) |
| Public URL | `name.telvergence.com` (per project; = Showroom label) |
| Auth | Cloudflare Access (email OTP / allowlist) |
| DNS | telvergence.com nameservers → Cloudflare (recommended) |

*Recommended: Sequence A (zero downtime). If stopping source exposure today matters more than keeping the demo live, Sequence B is valid — just don't send the packet until the new URL is up.*
