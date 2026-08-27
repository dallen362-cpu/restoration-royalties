# Cloudflare Access Runbook — real auth in front of the gated pages

**Goal (David 2026-08-27): "Ensure all GitHub is secure behind Cloudflare."**
Reality check, verified by audit: GitHub repos are public by design and hold **zero real secrets**
(scanned both repos; only `.env.example` placeholders). "Secure behind Cloudflare" therefore means:
edge auth (Cloudflare Access) in front of the gated pages, hardened headers (done), and moving
telvergence.com onto the Cloudflare edge (it is currently RAW GitHub Pages — `server: GitHub.com` —
so Cloudflare protects nothing there today).

## Current state (audited)
- ✅ restorationroyalties.com — served by Cloudflare Pages; headers hardened (HSTS, noindex, nosniff,
  SAMEORIGIN, no-store on /realm.html, /members.html, the vault).
- ✅ Both public repos scanned — no keys, tokens, or passwords; `phone-system/.env.example` is empty
  placeholders; the `TELVERGENCE-2026` passcode is a cosmetic showcase gate BY DESIGN.
- ⚠️ telvergence.com — raw GitHub Pages, NOT behind Cloudflare. Its /realm.html + /members.html gates
  are cosmetic only until the domain moves onto the Cloudflare edge.

## DAVID-SIDE STEP 1 — Access application on restorationroyalties.com (~10 min, dashboard)
Cloudflare dashboard → Zero Trust → Access → Applications → **Add an application** → Self-hosted:
1. App 1 "Telvergence Realm": domain `restorationroyalties.com`, path `/realm.html`.
2. App 2 "Telvergence Members": path `/members.html`.
3. App 3 "Proprietary Vault": path `/cowork-campaign/vault-7kq9x2m4/*` (and `/cowork-campaign/nx8k4q2m9v7r/vault-7kq9x2m4/*`).
4. Policy for each: **Allow · Emails** → your allowlist (dallen362@gmail.com + any member emails).
   Login method: **One-time PIN** (email OTP — no passwords to manage). Session: 24h.
5. Test in an incognito window: the page must demand the email OTP BEFORE it loads.
The cosmetic passcode can stay as a second curtain; Access is the real lock at the edge.

## DAVID-SIDE STEP 2 — the endgame: telvergence.com onto Cloudflare (~20 min)
Option A (RECOMMENDED — the documented endgame): point telvergence.com at the SAME Cloudflare Pages
project (restoration-royalties). One edge, one header policy, Access covers everything, GitHub Pages
retires. Dashboard → Pages → restoration-royalties → Custom domains → add telvergence.com → follow the
DNS instructions (move the domain's DNS to Cloudflare if not already). Then the homepage payload +
realm/members deploy automatically on merge — the cross-repo relay dies for good.
Option B (lighter): move only DNS to Cloudflare and proxy (orange-cloud) the GitHub Pages CNAME —
enables Access/WAF in front of GitHub Pages without re-homing the site.

## Standing security posture (unchanged, re-affirmed)
- Repos stay PUBLIC by convention — therefore **nothing sensitive ever enters them**: credentials only
  in Cloudflare/host secret managers, referenced by name (VITELITY_LOGIN/PASS, TTS_API_KEY,
  CALLBACK_*, STRIPE_WEBHOOK_SECRET, WEBHOOK_SECRET).
- Client-side gates are labeled "private by convention, not a security boundary" on-page — honest until
  Access is live.
- If any credential is ever exposed: rotate immediately at the provider, then scrub.
