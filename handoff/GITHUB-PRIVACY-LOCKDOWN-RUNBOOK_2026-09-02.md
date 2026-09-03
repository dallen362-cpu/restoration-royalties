# GitHub privacy lockdown — audit + runbook (QB, 2026-09-02, end of the Half a Cow build)
Class B infra (repo visibility) — David-side in the GitHub UI; no session can flip visibility (no tool, by design).

## Audit (read-only, 2026-09-02 night)
| Repo | Visibility now | Serves GitHub Pages? | Real domain served by | Recommendation |
|---|---|---|---|---|
| restoration-royalties (build shop) | public | yes (github.io copy, stale CNAME file) | Cloudflare Pages (restorationroyalties.com, halfacow.pages.dev, coastalcrownpressurewashing.pages.dev) | **→ PRIVATE now.** Closes the public view of the two legacy commits that reference the Kenneth matter (6014dd7, 5272069). Cloudflare keeps deploying (GitHub App works on private repos). |
| telvergence (master site) | public | yes (github.io copy still 200) | Cloudflare Pages (telvergence.com) | **→ PRIVATE now.** Also ends the dual-serving github.io copy. |
| fast---adjusting---service | public | yes — fastadjustingservice.com is served BY GitHub Pages | GitHub Pages | **KEEP PUBLIC** until the site moves to Cloudflare Pages (GitHub Pages on a free account requires a public repo). |
| stormcrew, crewcommand, crewcommand1/2, bweverly-wicks, Body-Wellness-Connection, Predictive-Weather-Intelligence | public | yes (github.io microsites, all 200) | GitHub Pages | **KEEP PUBLIC** unless David wants those microsites offline; going private takes them down on a free plan. Not audited for content tonight. |
| telvergence-master-max, telvergence-portals | private | — | — | already private ✓ |

Secrets scan of the build shop: clean (only `.env.example` and research/example text). Kenneth: 0 hits in the current tree outside rule/pointer text; history still contains the two legacy commits → privacy now, history scrub later (infra session).

## Steps for David (GitHub in Chrome, ~2 minutes each)
1. https://github.com/dallen362-cpu/restoration-royalties/settings → scroll to **Danger Zone** → **Change repository visibility** → **Make private** → type the repo name → confirm.
2. Same for https://github.com/dallen362-cpu/telvergence/settings.
3. Do NOT change fast---adjusting---service or the microsite repos tonight.
4. Account hygiene (Settings → Password and authentication): confirm **2FA is ON**. Settings → Code security: enable **Dependabot alerts**; on the repos that stay public, enable **secret scanning + push protection** (free for public repos).

## What changes / what does not
- Unchanged: restorationroyalties.com, telvergence.com, halfacow.pages.dev, coastalcrown pages.dev (all Cloudflare Pages; auto-deploy keeps working). This QB session's git access (authorized app credentials). Cowork's clones on Excaliber (stored credentials).
- Goes dark (intended): dallen362-cpu.github.io/restoration-royalties and /telvergence copies; public `raw.githubusercontent.com` links to these repos (the handoff prompts that used them now need a clone instead); the "full source" link on the members page returns 404 to outsiders.
- Not available on a free plan for private repos: branch protection rules / rulesets and secret scanning. Restore points remain the branches `restore/pre-halfacow-2026-09-02` and `release/halfacow-nfl-evolution-v1` (tags are dropped by the proxy).

## Verify after the flip (QB runs these; David can too)
- `list_repos` shows restoration-royalties + telvergence = private.
- Logged-out browser: https://github.com/dallen362-cpu/restoration-royalties → 404.
- `curl -sI https://restorationroyalties.com/ | grep -i server` → cloudflare, 200; same for telvergence.com; https://halfacow.pages.dev/stefano/ → 200.
- Push a trivial doc commit → Cloudflare deploys (proves the Git integration survived the flip).
