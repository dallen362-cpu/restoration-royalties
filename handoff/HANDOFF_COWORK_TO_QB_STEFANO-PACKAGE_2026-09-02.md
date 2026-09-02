# HANDOFF — Cowork (Excaliber) → QB Claude Code — Chef Stefano total package — 2026-09-02 (final pass)

**Project:** Telvergence / Half a Cow — one-link, full-auto Chef Stefano package behind the front gate
**Status:** COMPLETE and live. Synced from build shop `1bb3462`. Both repos pushed; all verifications passed live.
**Open Questions:** (1) Whether Stefano should ever receive the passcode himself — the sibling private deck (`/halfacow/private/`) opens with the personal-ask slide ON by default; the new `/halfacow/private/stefano/` page contains no ask at all. (2) Email: David sends it himself (draft only; nothing was sent). (3) pages.dev `/stefano/inventory/` did not literally contain the string `800-CHEF-STEF` at 7:05 PM ET — QB commit 6e0521a says it should; possibly deploy lag or different formatting. Check.
**Next Actions:** QB — do not modify `halfacow/stefano/show/` or `halfacow/private/` (Cowork output). If the build shop's Stefano tree changes, ping Cowork to re-sync (`robocopy /E /XD private`).
**Evidence Refs:** commits below; verification table below; files in `Downloads\halfacow-cowork-session-2026-09-02\`.

---

## Commits this pass
| Repo | Commit | Change |
|---|---|---|
| restoration-royalties | `7628e54` | Add `halfacow/stefano/show/index.html` — full-auto show v1 (19 scenes) |
| telvergence | `edaa714` | **"Sync Half a Cow from build shop 1bb3462 (Stefano custom tree, 800-CHEF-STEF, five storefronts)"** — robocopy `/E /XD private`; 16 paths, all under `halfacow/`, none under `private/` (David's exact instruction) |
| restoration-royalties | `85227fb` | Show v2: directory of all digital assets (site map + boneyard) after the close; auto-scrolls to it |
| telvergence | `147c3d1` | Add `halfacow/private/stefano/index.html` — front gate (shares `../gate.json`, same passcode) → full-auto show → directory; public `stefano/show` v2 |

## Live verification (7:05–7:12 PM ET)
| URL | Check | Result |
|---|---|---|
| telvergence.com/halfacow/stefano/hub/ | contains "Sports Chef" | PASS |
| telvergence.com/halfacow/pitch/ | contains "Five concept storefronts" | PASS |
| telvergence.com/halfacow/private/stefano/ | gate renders; unlocked in Chrome with the real passcode (clipboard paste, never in chat, cleared after); 19 scenes; 29 directory links; ▶ Start → voice speaking; auto-advanced to scene 2; site map reachable | PASS |
| telvergence.com/halfacow/private/stefano/ (served HTML) | narration/money words absent from plaintext (encrypted payload only) | PASS |
| telvergence.com/halfacow/stefano/show/ · halfacow.pages.dev/stefano/show/ | show v2 with directory ("The boneyard" marker) | PASS |
| telvergence.com/halfacow/private/gate.json | unchanged, 200 | PASS |
| telvergence.com/ | homepage intact ("Kitchen Sink", Talking Edition V5) | PASS |

## How the Stefano gate works
- `halfacow/private/stefano/index.html` holds the show + directory AES-256-GCM-encrypted under the **same content key** as the private deck; it fetches `../gate.json` (cache-busted) so one passcode and one rotation point serve both pages. Fallback copy of gate.json embedded.
- Built on Excaliber by `Downloads\halfacow-stefano-gate\build-stefano-gate.js <PIN_FILE> <GATE_JSON> <OUT_DIR>` — reads the passcode from `Downloads\halfacow-pitch\PRIVATE-PASSCODE.txt`, unwraps the content key, encrypts `payload.html`, self-tests, leak-checks, never prints the passcode. Re-run after any content change; after a passcode rotation nothing needs rebuilding (the content key does not change).
- Unlock once per tab → both private pages open (shared sessionStorage key).

## The package David sends (draft only — David taps Send)
`Downloads\halfacow-email-to-stefano\`: `HALFACOW-EMAIL-DRAFT-TO-STEFANO-2026-09-02.txt` (paste-ready), `.html` (email-style preview), attachments `HalfACow-SportsChef-OnePager.pdf` (1 page) and `HalfACow-SportsChef-Show-offline.html` (the show, works with no signal). Recipient address left as a placeholder. Passcode is NOT in the email — "I will give it to you by phone."

## Brief
`Downloads\HALFACOW-MEETING-BRIEF-2026-09-02.html` — Print button replaced by 🔊 **Speak** (reads the brief aloud; click again to stop; Ctrl+P still prints); lead card now points at the gated URL with the open show as backup; "Option B — let it run" added to the run of show.
