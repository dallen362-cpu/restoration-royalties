# CLAUDE.md — Telvergence build shop (restoration-royalties)

## ★ GLOBAL EXECUTION RULE (David's standing directive — follow on EVERY implementation)
1. **Plan everything ahead of time.** Before building, write the full plan (context → lanes → steps →
   verification). No improvised multi-step work.
2. **Break tasks down and delegate to cheaper models.** Split the plan into independent lanes; run
   mechanical/parallelizable lanes on **Sonnet** (or **Opus** for design-heavy work) subagents at lower
   effort, keeping the surgical/context-heavy edits in the main session. Maintain quality: every lane
   gets explicit verification steps (syntax checks, marker greps, section balance) before merge.
3. **Optimize tokens.** Don't re-read files already in context; use surgical edits over rewrites; batch
   independent tool calls; verify with cheap greps, not full re-reads.
4. **Don't let the 5-hour limit run out.** Run independent lanes in parallel, ship in deployed stages
   (commit → merge → verify live per stage), and never leave finished work uncommitted.

## Project map (the essentials)
- **This repo = source of truth + build shop.** Cloudflare Pages serves it at restorationroyalties.com
  (auto-deploys on merge to `main`). telvergence.com is a SEPARATE repo (`dallen362-cpu/telvergence`,
  GitHub Pages): deploy = copy `handoff/telvergence-com-index.html` → its `index.html` (+ realm/members)
  verbatim, commit, push.
- **Homepage source of truth:** `handoff/telvergence-com-index.html` (never hand-edit the telvergence
  repo directly). Current build: "The Talking Edition · V4 Kitchen Sink". V3 frozen forever at
  `telvergence/v3/`; /v2/ and /original/ preserved. Nothing is ever overwritten.
- **The gigapress:** `brand-kit/build.py` (ONE template + `brand-kit/brands/<slug>.json` per brand →
  `<slug>/index.html`). ~19 standard modules baked in (see `brand-kit/skills/fast-standard/SKILL.md`):
  flywheel, DID issuance/royalty, BOSS CRM+LMS, Doppler radar, Starbucks courtesy, auto-vanity
  rate-center inventory, WIN partner seal, territory analysis, read-aloud 🔊 + two-way concierge 🎙.
  Build exits 1 until each brand's GBP gate clears (`gbp` block; `--listings` for status) — that exit
  is EXPECTED and the HTML still writes.
- **Key skills:** `brand-kit/skills/fast-standard/` (the kitchen-sink standard), `telvergence-brand-deploy/`
  (deploy law + QA gates), `vanity-did-generator/`, `.claude/skills/listing-foundation/` (GBP, auto-verify),
  `.claude/skills/prospect-turnkey/`. Governance: `handoff/SYNC-LANES.md`.
- **Gated pages:** `realm.html` = "Proprietary Inventory of Mechanisms Showcase" and `members.html`
  (cosmetic gate `TELVERGENCE-2026` — showcase only, "private by convention, not a security boundary").

## Standing constraints (absolute)
- **Email gate:** nothing sends via email without David's explicit approval (git/site deploys are fine).
- **Kenneth/PHI:** all Kenneth Allen legal/medical material is out of scope — never touch or publish.
- **Secrets:** this repo is PUBLIC — credentials only in env/secret managers, referenced by name.
  Dormant integrations (Vitelity, TTS, lead feeds) fail closed until creds exist; never fake live data.
- **Provider-agnostic:** never name the AI vendor or dialer software on any public page.
- **Honesty rails:** demos labeled illustrative; regulated programs (royalties, franchise, GBP) carry
  per-state disclaimers; no invented stats.
- **Git flow:** work on `claude/github-telvergence-consolidate-x00shp` → merge-commit to `main` via git
  (bypasses GitHub REST rate limits) → verify LIVE with curl markers after every deploy stage.
