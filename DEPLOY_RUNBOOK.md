# 🚀 Deploy Runbook — Telvergence portals → telvergence.com

**Everything in this `deploy/` folder is push-ready** (6 gated pages + hub `index.html` + `CNAME` + `.nojekyll`).
Your rule holds: **you do the logins, I drive the clicks. No credentials handled by me.**
Note: `gh` CLI isn't installed here and git has no identity — so the **browser** path below is the smoothest.

Your stack (from memory): GitHub Pages under **dallen362-cpu** · **Cloudflare** DNS for telvergence.com · GitHub Pages IPs `185.199.108–111.153`.

---

## OPTION A — one subdomain, fastest (recommended) → `portal.telvergence.com`
Serves the hub at the subdomain and every demo as a page (`/win.html`, `/serotonin.html`, …). **One repo, one DNS record.**

**1) GitHub (create + upload)**
- New repo (public) under dallen362-cpu, e.g. **`telvergence-portals`**.
- Upload **the contents of this `deploy/` folder** (all `.html` + `CNAME` + `.nojekyll`). Drag-drop upload in the browser works.
- **Settings → Pages:** Source = Deploy from a branch, Branch = `main` / `/root` → Save.
- **Settings → Pages → Custom domain:** type `portal.telvergence.com` → Save. *(This step is the cert gotcha — it must be typed here.)*

**2) Cloudflare (one record)**
- DNS → Add record: **CNAME**, Name = `portal`, Target = `dallen362-cpu.github.io`, **Proxy = DNS only (grey cloud)**.

**3) Back in GitHub Pages:** wait for the Let's Encrypt cert (mins–1hr), then tick **Enforce HTTPS**.

**Live:** `https://portal.telvergence.com` · `…/win.html` · `…/serotonin.html` · `…/bodywellness.html` · `…/spin.html` · `…/onboarding.html`. Passcode `Telvergence-8832`.

---

## OPTION B — a subdomain per brand (win.telvergence.com, serotonin.telvergence.com, …)
Truer to "subdomains," but heavier: **one repo per brand + one DNS record per brand.**
For each brand X (win / serotonin / bodywellness / spin / showroom / onboarding):
- New repo `telvergence-X`; upload that one `X.html` renamed to `index.html` + a `CNAME` file containing `X.telvergence.com` + `.nojekyll`.
- Pages → set Custom domain `X.telvergence.com` → Save.
- Cloudflare → CNAME `X` → `dallen362-cpu.github.io` (grey cloud).
- Enforce HTTPS once the cert issues.

*(Start with Option A today; split into Option B later if you want per-brand vanity URLs.)*

---

## Held back on purpose
- **Command Center is NOT in this bundle** — it holds legal strategy. Keep it private (the Claude artifact) or, if you want it on a domain, put it on an obscure subdomain behind **Cloudflare Access** (real login), not this light passcode.
- **Before sharing externally:** get sign-off on the representative **pricing** and the **guarantee / telecom claims** (uptime, HIPAA-ready, etc.) — they came from your own templates and were flagged as needing counsel/carrier confirmation.
- The in-page "View demo" buttons point to per-brand subdomains; on Option A they resolve only after Option B, or update them to `./X.html`. The hub (`index.html`) is the working nav for Option A.

---

## Fastest of all (no DNS, still non-Claude URL)
Skip Cloudflare entirely and it's live at **`https://dallen362-cpu.github.io/telvergence-portals/`** the moment you push. Add the subdomain later.
