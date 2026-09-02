# HANDOFF — Cowork (Excaliber) → QB Claude Code — Half a Cow go-live — 2026-09-02
*(Verbatim ledger delivered by David's Cowork session; recorded in the build shop for cross-session sync. QB cross-check 2026-09-02: all commits/URLs verified live; one discrepancy — the price model — resolved by David in favor of the Cowork deck: $250K city franchise fee + $25K per truck. See CLAUDE.md PRICING.)*

**Project:** Telvergence / Half a Cow (NFL food-truck franchise concept) — go-live, presentation, gate
**Status:** COMPLETE. Live on three hosts; private gated pitch live; public pitch + 3-Minute Show synced to telvergence.com. Both sessions in agreement.
**Open Questions:** (1) Stage 3 cold backup — which external drive letter (no `E:`; attached: D: VICIBOX 22.9 GB free · F: iXpand 77.6 GB free · G: USB321FD 14.9 GB free · H: Lexar 20.4 GB free). (2) Cloudflare Access in front of `/halfacow/private/` as a true lock (Class B infra; needs David present). (3) Gate the whole `/halfacow/` or keep the brand site public (current: public).
**Next Actions:** none required for the demo. On David's word: Stage 3 backup; Cloudflare Access; passcode rotation whenever wanted (one-file commit, see §5).
**Evidence Refs:** commits and URLs in §2–§3; verification in §4.

---

## 1. Ground rules that governed this session (David, 2026-09-02)
- ADDITIVE ONLY on Cloudflare/GitHub: no edits to existing Pages projects, custom domains, DNS, env vars, or repo settings. Existing telvergence files were never modified except where David explicitly authorized (canonical strings in files added the same day; one showroom card insert; two strings in the brand kit).
- Never handle API keys/tokens; git pushes used the machine's stored credentials silently. Vitelity untouched. No emails sent.
- Kenneth Allen matter kept entirely out of Telvergence work.
- Verify every stage exactly as specified; paste outputs; stop and ask before anything not listed.
- Machine: "Excaliber" (Windows hostname currently `fbi-cybercrimeunit` — same PC, renamed). Clone at `C:\Users\dalle\telvergence`. Pre-existing untracked folder `fast-adjusting/` in that clone was left untouched throughout.
- Division of labor: **only the Cowork session writes to the `telvergence` repo; the QB session never modifies Cowork output.** The build shop (`restoration-royalties`) is the QB's; the `halfacow/` tree there is authoritative for everything except `halfacow/private/` (Cowork-only).

## 2. What shipped — commit ledger

### Cloudflare
- New Pages project **`halfacow`** → https://halfacow.pages.dev — repo `dallen362-cpu/restoration-royalties`, branch `main`, preset None, no build command, output dir `halfacow`, no custom domain, no env vars. First deploy `6a206c8` = Success.

### `dallen362-cpu/telvergence` (Cloudflare Pages → telvergence.com)
| Commit | Change |
|---|---|
| branch `restore/pre-halfacow-2026-09-02` → `7271cca` | restore point (pre-halfacow `main`) |
| `621816b` | add `halfacow/` verbatim from restoration-royalties `6a206c8` — 12 files, 9,783+ / 0− |
| `c208372` | `halfacow/index.html` + `platinum/index.html`: canonical, og:url, JSON-LD url → `https://telvergence.com/halfacow/` (4 lines) |
| `8cd05c1` | `showroom/index.html`: Half a Cow card added under "New builds — in the pipeline" (4→5), href `/halfacow/hub/` (6+ / 1−) |
| `4ab03cf` | add passcode-gated Talking Pitch at `halfacow/pitch/` (later moved) |
| `8bd94eb` | move gated deck `halfacow/pitch/` → **`halfacow/private/`**; sync `halfacow/` from restoration-royalties `5c6efb4` (adds public `pitch/`, `presentation/`, hub topnav links). Changes confined to `halfacow/`. |

### `dallen362-cpu/restoration-royalties` (build shop)
| Commit | Change |
|---|---|
| `3f8e362` (Cowork) | `brand-kit/brands/halfacow.json`: `hosts.canonical` → `telvergence.com/halfacow`, `jsonLd.url` → `https://telvergence.com/halfacow/` (2 lines, UTF-8 byte-exact) |
| `…` → `5c6efb4` (QB) | public ask-free Talking Pitch at `halfacow/pitch/` (17 slides), 3-Minute Show at `halfacow/presentation/`, hub links, master/Platinum/showroom card pointing at telvergence.com/halfacow/, CLAUDE.md records three-host state |

## 3. Three-host map (as of 2026-09-02 evening)
| Path | telvergence.com (canonical) | halfacow.pages.dev | restorationroyalties.com/halfacow |
|---|---|---|---|
| `/halfacow/` master, hub, inventory, connect, platinum, 5 storefronts, manifest, sw.js | ✅ | ✅ | ✅ |
| `/halfacow/pitch/` — public Talking Pitch, 17 slides, no personal ask | ✅ | ✅ | ✅ |
| `/halfacow/presentation/` — 3-Minute Show (QB, 12 packets) | ✅ | ✅ | ✅ |
| `/halfacow/private/` — **gated** 18-slide Talking Pitch (Simple/Plain/Pro × EN/ES; personal-ask slide switchable) | ✅ **telvergence only** | — | — |
| showroom card → `/halfacow/hub/` | ✅ | n/a | n/a |
| canonical / og:url / JSON-LD / brand-kit hosts | all → `https://telvergence.com/halfacow/` | | |

Note: telvergence.com serves the homepage as a 200 fallback for unknown paths — always verify by content, never by status code.

## 4. Verification (all passed, live)
- 36/36 Half a Cow files = 200 across the three hosts; hub shows exactly 30 NFL market cards; Dallas card opens `/dallas/`.
- No-disturbance on every push: homepage "Kitchen Sink" = 2, `/realm` 200 (The Realm), `/members` 200, showroom intact.
- Public pitch: 17 sections, 17/17 narrations EN+ES, zero matches for the personal ask or attorney name anywhere in the build-shop repo (the "Branson" hits are the unrelated Branson Ainsworth brand). Start button and navigation verified working.
- Private deck: gate UI + AES-GCM payload present; the served HTML contains none of the deck text (verified by search); `noindex, nofollow, noarchive`; unlinked from hub/showroom/master.

## 5. The private deck's gate — how it works, how to rotate
- Content encrypted AES-256-GCM inside `halfacow/private/index.html`. `halfacow/private/gate.json` holds only a PBKDF2-SHA256 (400,000 iter) wrap of the content key under the 4-digit passcode.
- **The passcode is not recorded in this brain** (key material). It lives with David; the page's "Change passcode" panel generates a replacement `gate.json`.
- Rotate: commit a new `gate.json` to `telvergence/halfacow/private/` (one file; the deck never changes). The page fetches `gate.json` with a cache-busting query, so rotation is immediate despite the cache-first service worker.
- Honest strength: stops crawlers, link-sharers and casual visitors; a 4-digit code can be ground offline by a determined party holding the file. True lock = Cloudflare Access (runbook already in repo for `/realm`, `/members`).
- Ungated 18-slide copy for offline use: `C:\Users\dalle\Downloads\HalfACow-Talking-Pitch.html`; gated build also in `Downloads\halfacow-pitch\`.

## 6. Deck facts David supplied (for consistency across sessions)
- Money model inputs: $250k franchise fee per city; $25k up-front per truck; 10 Smart Number lines per truck at $24.95/line/mo (Telvergence's existing per-line price point); royalties under the SLA not modeled (belong in the FDD). Every figure labeled illustrative / not a forecast / not an FPR.
- Replacement-cost reference points: earlier AI-generated estimates David received — ~$38k (one roofing customization), ~$78k (one blueprint); deck total shown $195k–$560k at agency rates, 2–3× at enterprise rates, labeled estimate-only.
- Flywheel: digital business card → Smart DID on join → agents add agents → per-person attribution; proven first on FAST Adjusting Service. Stack: carrier backbone → Telvergence programmable telecom → AI automation → brand/listing layer → licensed under the Telvergence SLA (monthly recurring + ongoing royalties, life of the agreement).

## 7. Agreement between sessions
- Cowork and QB reports were cross-verified against live sites and the repo on 2026-09-02; no discrepancies remained after the `pitch/` naming collision was resolved by moving the gated deck to `/halfacow/private/`.
- David's standing instruction: when the two sessions differ, the Cowork session's direction takes priority.
