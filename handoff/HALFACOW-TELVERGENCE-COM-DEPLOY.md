# HALF A COW → telvergence.com/halfacow/ — STAGED deploy procedure (NOT executed)
**Status (2026-09-02):** Half a Cow lives, verified, at `restorationroyalties.com/halfacow/` (main `ebf1c6f`,
branch `release/halfacow-nfl-evolution-v1`). David's preferred public URL is `telvergence.com/halfacow/…`. That is a
CROSS-REPO deploy (repo `dallen362-cpu/telvergence`, Cloudflare Pages) — Class B infra per
`handoff/SESSION-POLICY-AND-INFRA-BACKLOG.md`, so it is staged here and run only in a dedicated infra session
with David present. Restore point for the build shop: branch `restore/pre-halfacow-2026-09-02` (main `8f31b6b`; NOTE: the git proxy drops tag pushes — GitHub holds 0 tags — so restore points are pushed as protected-by-convention branches).

## Why it is safe when run (additive only)
- The `halfacow/` tree is root-agnostic (all links relative `./` / `../`), so it serves unchanged under any prefix.
- It adds a NEW directory to the telvergence repo; `index.html`, `realm`, `members`, `/v3/`, `/v4/`, `/showroom/`
  are untouched. `telvergence.com/halfacow/` today only returns the homepage SPA fallback — nothing to overwrite.
- `halfacow/sw.js` registers with scope `/` and will simply fail (caught) under a sub-path — harmless; the
  page works without the service worker. (Optional later: set manifest `start_url`/`scope` to `./`.)

## Procedure (infra session, ~10 min)
1. `git tag` the telvergence repo first (restore point), push the tag.
2. `git -C <telvergence clone> checkout main && cp -r <restoration-royalties>/halfacow ./halfacow` (verbatim copy,
   whole tree: index.html, manifest.webmanifest, sw.js, hub/, inventory/, connect/, platinum/, dallas/,
   philadelphia/, miami/, nashville/, kansascity/).
3. Optional: sed canonical/og `https://halfacow.pages.dev/` → `https://telvergence.com/halfacow/` in
   `halfacow/index.html` + `halfacow/platinum/index.html` only.
4. Commit "Add Half a Cow (NFL franchise concept) at /halfacow/ — additive", push main. Cloudflare redeploys.
5. VERIFY live: `curl -s https://telvergence.com/halfacow/hub/ | grep -c 'Half a Cow'` > 0;
   `/halfacow/platinum/` shows "TALKING EDITION · PLATINUM"; homepage `curl -s https://telvergence.com/ | grep -c 'Kitchen Sink'`
   unchanged (proves no disturbance). Then update the showroom card + `brand-kit/brands/halfacow.json` hosts.
