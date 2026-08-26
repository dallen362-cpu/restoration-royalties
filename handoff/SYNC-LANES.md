# TELVERGENCE — SESSION LANES & SOURCE OF TRUTH (avoid overlap)

_Last updated: 2026-08-26 by the restoration-royalties build session (session_019GkzLWbj84bpUVsQDfkcWB)._

Multiple Claude sessions work the Telvergence project. To avoid two sessions authoring the
same files, follow these lanes. **When in doubt, this repo (`dallen362-cpu/restoration-royalties`
main) is the SOURCE OF TRUTH for all telvergence.com HTML and the Cloudflare site.**

## Lanes
| Lane | Owner | Scope | Do NOT |
|---|---|---|---|
| **Build shop / source of truth** | THIS repo session (restoration-royalties, cloud) | Authors all telvergence.com HTML (`handoff/telvergence-com-*.html`), the Cloudflare site (`restorationroyalties.com`: `fast/`, `functions/`, `members.html`, `telvergence/**`), the FAST investor demo (`fast/demo/`). | — |
| **telvergence.com deploy** | The "Telvergence site features and deploy" session (owns `dallen362-cpu/telvergence`) | DEPLOYS the payloads below verbatim to telvergence.com. | Re-author the homepage/members HTML — deploy from the raw URLs instead, or we diverge. |
| **Stefano / business** | The "Telvergence business and Stefano funding" session | Investor outreach, funding narrative. | Rebuild the FAST demo (already live) or edit site HTML. |

## Source-of-truth payloads (self-refreshing raw URLs — always latest main)
- Homepage → `index.html`:
  `https://raw.githubusercontent.com/dallen362-cpu/restoration-royalties/main/handoff/telvergence-com-index.html`
- Members → `members.html`:
  `https://raw.githubusercontent.com/dallen362-cpu/restoration-royalties/main/handoff/telvergence-com-members.html`

Deploy = fetch raw → write verbatim → commit → push → verify markers:
`class="hprod"`, `Buy It Today`, `class="pc-go"`, `🔐 Members`, and `members.html` contains `Telvergence Members`.

## Already built & LIVE — do not rebuild
- FAST Adjusting investor demo: **https://restorationroyalties.com/fast/demo/** (callable switchboard for the Stefano meeting).
- Members area: **https://restorationroyalties.com/members** (passcode `TELVERGENCE-2026`).
- Click-to-call proxy: `functions/api/callback.js` (dormant 503 until Cloudflare secrets set).

## Rule
Any telvergence.com HTML change starts HERE (restoration-royalties main), then deploys outward.
Never hand-edit telvergence.com homepage/members directly — it desyncs from source of truth.
