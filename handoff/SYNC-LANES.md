# TELVERGENCE — SESSION LANES & SOURCE OF TRUTH (avoid overlap)

_Last updated: 2026-08-26 (evening) by the restoration-royalties build session (session_019GkzLWbj84bpUVsQDfkcWB)._

Multiple Claude sessions work the Telvergence project. To avoid two sessions authoring the
same files, follow these lanes. **When in doubt, this repo (`dallen362-cpu/restoration-royalties`
main) is the SOURCE OF TRUTH for all telvergence.com HTML and the Cloudflare site.**

## Lanes
| Lane | Owner | Scope | Do NOT |
|---|---|---|---|
| **Build shop / source of truth / deploy** | THIS repo session (restoration-royalties, cloud) | Authors AND deploys everything: all restorationroyalties.com content (`functions/`, all micro-sites, `showroom/`, `case-studies/`, `softphone/`, `choose-number/`, `fast/demo/`), all telvergence.com HTML (this session now has direct push access to `dallen362-cpu/telvergence` — the raw-URL relay is retired). **Exclusive write lane on both repos.** | — |
| **Recovery & archive (cowork, David's machine)** | David's local cowork session | READ-ONLY on both repos. Mines David's local disk / Drive / archives for: Derek's ContactAM dialer blueprint, the 2022 Sinch+Acrobits+Vitelity integration code, the EZ VoIP / Reliant docs, the Vitelity wholesale agreement, `telvergence-master-max` archives. Reports findings to David → relayed here. | Push, merge, or use David's browser for any GitHub write. (2026-08-26: it nearly merged stale PR #49 — closed here as superseded; all its content was already live in main under `cowork-campaign/nx8k4q2m9v7r/`.) |
| **Stefano / business** | The "Telvergence business and Stefano funding" session | Investor outreach, funding narrative. | Rebuild the FAST demo (already live) or edit site HTML. |

## Registration rule (gigapress)
Every new page/brand/demo gets registered in the master catalog at `showroom/index.html`
(and, when public-facing, in the homepage's Industry Lead Engines directory). A page that
isn't in the showroom doesn't exist.

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
