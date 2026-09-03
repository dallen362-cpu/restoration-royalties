# Cloudflare protection runbook — post-build lockdown (QB, 2026-09-02 night)
Class B infra: every dashboard step below is David-side (Cloudflare account, David present). Code-side parts are DONE.

## State verified live (2026-09-02 night)
| Host | Behind Cloudflare | Hardened headers (HSTS · X-Frame · nosniff · Referrer · Permissions) | noindex | Notes |
|---|---|---|---|---|
| restorationroyalties.com (project restoration-royalties) | ✅ | ✅ | ✅ (build host) | root `_headers` |
| halfacow.pages.dev (project halfacow, output dir `halfacow/`) | ✅ | ✅ **added tonight** (`halfacow/_headers`) | ✅ + `/stefano/*` noarchive + `/private/*` no-store | previously had NO hardened headers |
| coastalcrownpressurewashing.pages.dev (output dir `coastalcrown/`) | ✅ | ✅ **added tonight** (`coastalcrown/_headers`) | indexable (real client site) | previously had NO hardened headers |
| telvergence.com (repo telvergence) | ✅ | ✅ | homepage indexable; realm/members noindex+no-store | its own `_headers` — Cowork-owned |
| fastadjustingservice.com | ❌ GitHub Pages | ❌ none | — | migrate to Cloudflare Pages (infra session) |

## David-side steps (in order, ~30 min total)
1. **Cloudflare account security:** Profile → Authentication → 2FA ON (authenticator app); revoke any API token you do not recognize; create tokens scoped per project only when needed. Never paste a token into any session.
2. **Cloudflare Access (Zero Trust) — the real locks** (free plan, ≤50 users): Zero Trust → Access → Applications → Self-hosted:
   - `telvergence.com/halfacow/private/*` → policy Allow: emails = dallen362@gmail.com (+ Stefano's when you decide) via one-time PIN.
   - `telvergence.com/realm*` and `telvergence.com/members*` → same policy (runbook already in repo: `handoff/CLOUDFLARE-ACCESS-RUNBOOK.md`).
   - Do NOT put Access on the public brand pages, halfacow.pages.dev, or restorationroyalties.com/halfacow/ (they are demo assets).
3. **WAF / abuse:** Security → Settings → **Bot Fight Mode ON** for restorationroyalties.com and telvergence.com; Security → WAF → Managed rules (free managed ruleset ON); **Rate limiting rule** on `restorationroyalties.com/api/callback` and `/tts` (e.g. 10 requests / minute / IP → block 10 min) — the callback proxy is fail-closed today but the rule is the billing/abuse backstop once keys exist.
4. **Pages project hygiene:** each project → Settings → confirm production branch `main`, no env vars except the ones you set deliberately (TTS/Vitelity keys only on restoration-royalties, only when you decide), Preview deployments = "none" or restricted (previews of a private repo should not be public).
5. **telvergence repo `_headers` (Cowork-owned) — add this block** (Cowork applies it; QB never edits that repo):
```
/halfacow/private/*
  X-Robots-Tag: noindex, nofollow, noarchive
  Cache-Control: no-store
/halfacow/stefano/*
  X-Robots-Tag: noindex, nofollow, noarchive
```
6. **Later (infra session):** custom domain `halfacow.com` → the halfacow Pages project; move FAST to a Cloudflare Pages project (then the FAST repo can go private); GitHub → private for restoration-royalties + telvergence (see `GITHUB-PRIVACY-LOCKDOWN-RUNBOOK_2026-09-02.md`).

## Verify (QB can run after each step)
- `curl -s -o /dev/null -D - https://telvergence.com/halfacow/private/` → after Access: HTTP 302 to the Cloudflare login (content no longer served anonymously).
- `curl -s -o /dev/null -D - https://halfacow.pages.dev/private/x | grep -i cache-control` → `no-store` (already true).
- Rate limit: 12 rapid POSTs to /api/callback → the 11th+ returns 429.
