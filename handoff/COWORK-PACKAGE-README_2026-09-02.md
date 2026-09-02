# HALF A COW — Cowork → QB Claude Code package — 2026-09-02

Paste this whole folder into the QB Claude Code session. Start with `handoffs/HANDOFF_COWORK_TO_QB_STEFANO-PACKAGE_2026-09-02.md` (final pass), then `handoffs/SESSION-NOTES_COWORK_HALFACOW_2026-09-02.md` (everything), then `handoffs/CLAUDE.md` (charter + rules).

## What is in here
| Folder | Contents |
|---|---|
| `handoffs/` | Three Cowork→QB handoffs (go-live, meeting brief, Stefano package), the full session notes, the verbatim compaction summary, the archive charter (CLAUDE.md) and README |
| `brief/` | David's meeting brief (dark, large type, 🔊 Speak reads it aloud, Ctrl+P prints). Internal — never sent to Stefano |
| `email-to-stefano/` | The email DRAFT (`.txt` paste-ready, `.html` email-style preview) and its two attachments (one-page PDF, offline copy of the show). NOT sent — David taps Send |
| `show-source/` | The full-auto show as deployed: `stefano-show-index.html` (public v2 = what is live at halfacow.pages.dev/stefano/show/ and telvergence.com/halfacow/stefano/show/), plus the gate build kit (`head.html`, `payload.html`, `engine.js`, `build-stefano-gate.js`) used to produce the encrypted private page at telvergence.com/halfacow/private/stefano/ |
| `verification/` | Screenshots from the headless test of the show (site map, close, money model) |

## Live state (verified 2026-09-02, 7:05–7:12 PM ET)
- Chef Stefano's URL (front gate → full-auto show → directory): https://telvergence.com/halfacow/private/stefano/ — same passcode as `/halfacow/private/` (shares `../gate.json`)
- Open show, no code: https://halfacow.pages.dev/stefano/show/ and https://telvergence.com/halfacow/stefano/show/
- Commits: restoration-royalties `7628e54`, `85227fb`; telvergence `edaa714` (sync from build shop 1bb3462, robocopy /E /XD private, 16 paths), `147c3d1`

## Rules that still govern (David)
- Additive only on Cloudflare/GitHub. Only Cowork writes the `telvergence` repo; QB never modifies Cowork output (`halfacow/stefano/show/`, `halfacow/private/`); Cowork's direction wins on conflict.
- No API keys, tokens, or the private passcode anywhere — not in chat, repo, brain, or this package. (The passcode file is deliberately NOT in here.)
- No email or messages sent by any session. Nothing about Kenneth Allen in Telvergence work.

## To rebuild the private Stefano page after a content change (on Excaliber)
`node build-stefano-gate.js <PIN_FILE> <GATE_JSON> <OUT_DIR>` with `head.html`, `payload.html`, `engine.js` beside it — reads the passcode from the file, unwraps the existing content key, encrypts `payload.html`, self-tests and leak-checks, never prints the passcode. A passcode rotation needs no rebuild.
