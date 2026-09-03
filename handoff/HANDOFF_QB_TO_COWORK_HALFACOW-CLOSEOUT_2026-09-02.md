# HANDOFF — QB Claude Code → Cowork / next session — Half a Cow CLOSE-OUT — 2026-09-02 (night)

**Project:** Telvergence / Half a Cow — build closed for now; post-build clean-up + protocol adherence
**Status:** CLOSED (v1 + Chef Stefano custom edition). All work committed and merged; working tree clean; both repos' `main` agree; no background agents, watches, crons or triggers left running in the QB session. Token posture: STANDING DOWN (no polling, no lanes) until David reopens.
**Open Questions (David-side, deferred to a David-present infra session):** (1) make `restoration-royalties` + `telvergence` PRIVATE (runbook filed; FAST + microsite repos stay public because GitHub Pages serves them); (2) history scrub of the two legacy commits (6014dd7, 5272069); (3) Cloudflare Access on `/halfacow/private/`; (4) split the personal-ask deck onto its own passcode before the code is ever shared; (5) Stefano pitch editions (`pitch/stefano/`, `private/stefano/` deck variant); (6) Drive sub-brain markdown copy to F:; (7) telvergence.com re-sync from build shop `f684b4d`+ (Cowork, `robocopy /E /XD private`).
**Next Actions:** none required. On reopening: read CLAUDE.md, this file, and `handoff/COWORK-SESSION-ARCHIVE-POINTER_2026-09-02.md` — nothing else.
**Evidence Refs:** build shop main `74291f6` (this ledger's commit follows); GitHub restore branches `restore/pre-halfacow-2026-09-02` (8f31b6b) + `release/halfacow-nfl-evolution-v1` (ebf1c6f); telvergence restore branch `restore/pre-halfacow-2026-09-02` (7271cca); F: zips of all three (Cowork, 2026-09-02).

## What exists now (inventory, macro → micro)
- SILVER/GOLD generic model: `halfacow/` (master, hub, 30-market inventory, connect, platinum, 5 storefronts, `presentation/` 3-Minute Show, `pitch/` public Talking Pitch 17 slides) — live on telvergence.com/halfacow/ (canonical), halfacow.pages.dev, restorationroyalties.com/halfacow/.
- PLATINUM-style custom-branded edition: `halfacow/stefano/` (own brand JSON `brand-kit/brands/halfacow-stefano.json`, master + all sub-pages + its own show) and `halfacow/presentation/stefano/`; Cowork's `halfacow/stefano/show/` (full-auto 19-scene show) — live on pages.dev; telvergence.com carries the state as of its last sync (1bb3462) + `halfacow/private/` and `halfacow/private/stefano/` (gated, Cowork-only).
- Registered: showroom (2 cards: Half a Cow, Half a Cow × Chef Stefano; pipeline count 6), CLAUDE.md doctrine (tier framework, price model, two-session law, additive versioning, custom-edition exemplar, Cowork archive pointer), skills `model-routing`, `additive-versioning`.
- Backups: tier 1 git (branches above) · tier 2 Drive AI-Master-Brain/Telvergence (Cowork ledgers + this close-out) · tier 3 F: (restore zips done; sub-brain markdown copy pending).

## Clean-up performed (QB)
- Stray test directory removed; scratchpad only holds session-local test files (no repo footprint).
- Private materials kept OUT of the public repo: meeting brief, email draft + attachments, session notes/compaction summary (personal-ask history), gate build kit, passcode file. They live in the Cowork archive folder + Drive.
- No secrets in the repo (scan clean; only `.env.example`). Kenneth: 0 in the current tree outside rule text; history exposure closes when the repo goes private.

## Protocol adherence check
Additive only ✓ · nothing overwritten (generic editions byte-identical) ✓ · honesty rails on every page ✓ · provider-agnostic ✓ · email gate held (drafts only) ✓ · secrets/passcode never stored ✓ · Kenneth excluded ✓ · Cowork output never modified from here ✓ · every lane verified cheaply ✓ · routing: Sonnet lanes for copies/re-wordings, main session for judgment/deploys ✓.
