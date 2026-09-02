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

## ★ BRAND HIERARCHY (David's standing correction — do not misread)
- **telvergence.com is the MASTER / flagship brand** — the gigapress AI-mashup studio itself, the parent
  of the whole universe. **restorationroyalties.com is a SUB-BRAND OUTPUT** of the studio, not the master.
- Do NOT let the build topology confuse the hierarchy: this `restoration-royalties` repo happens to be the
  **build shop** (where code lives, and what Cloudflare Pages serves) — that is a deployment fact, NOT a
  ranking. The master site is telvergence.com; restorationroyalties.com and every `<slug>` brand are its children.

## Project map (the essentials)
- **Build topology (not hierarchy):** this repo is the source-of-truth build shop; Cloudflare Pages serves
  it at restorationroyalties.com (auto-deploys on merge to `main`). The MASTER site telvergence.com is a
  SEPARATE repo (`dallen362-cpu/telvergence`, GitHub Pages): deploy = copy `handoff/telvergence-com-index.html`
  → its `index.html` (+ realm/members/robots.txt) verbatim, commit, push. (Session has direct push access.)
- **Homepage source of truth:** `handoff/telvergence-com-index.html` (never hand-edit the telvergence
  repo directly). Current build: "The Talking Edition · V4 Kitchen Sink". V3 frozen forever at
  `telvergence/v3/`; /v2/ and /original/ preserved. Nothing is ever overwritten.
- **The gigapress:** `brand-kit/build.py` (ONE template + `brand-kit/brands/<slug>.json` per brand →
  `<slug>/index.html`). ~19 standard modules baked in (see `brand-kit/skills/fast-standard/SKILL.md`):
  flywheel, DID issuance/royalty, BOSS CRM+LMS, Doppler radar, Starbucks courtesy, auto-vanity
  rate-center inventory, WIN partner seal, territory analysis, read-aloud 🔊 + two-way concierge 🎙.
  Build exits 1 until each brand's GBP gate clears (`gbp` block; `--listings` for status) — that exit
  is EXPECTED and the HTML still writes.
- **GOLD TIER (David 2026-08-28):** the gold-standard shell (modeled on the finished
  **fastadjustingservice.com** — the 12-part FAST conversion anatomy + the 14-language whole-site
  **translator** + installable **PWA** + voice concierge, everything re-skinned per industry) is baked
  into the press as an ADDITIVE tier. A brand JSON with `"tier":"gold"` renders via `render_gold(b)` from
  `brand-kit/gold-template.html` (tokenized with `@@key@@`; six repeating blocks are data-driven) and also
  emits `<slug>/manifest.webmanifest` + `sw.js`; brands WITHOUT `tier` use the untouched legacy `render()`
  and stay byte-identical. **First gold output = Coastal Crown Pressure Washing** (`brands/coastalcrown.json`
  → `coastalcrown/index.html`, live at coastalcrownpressurewashing.pages.dev). Set `tier:"gold"` on any new
  brand to auto-stamp it at the gold standard; migrate legacy brands one at a time (prove-then-propagate).
- **★ TIER FRAMEWORK (David 2026-09-02) — SILVER → GOLD → PLATINUM:**
  - **SILVER** = the standardized CONCEPT MODELS in the showroom inventory — every industry built to one
    methodology, the **three T's (Tools · Techniques · Technologies)** — served at
    `restorationroyalties.com/<slug>/`. The ready-to-elect general models.
  - **GOLD** = when a prospect ELECTS a model, run the gigapress AI-mashup "gold" output: go to press,
    published with its **own URL + `contact@<domain>` email + Smart-DID (telephone-number) assignment &
    programming** (the Coastal Crown level — real client, own domain, own numbers).
  - **PLATINUM** = when a client wants the **telvergence.com rebrand / white-label** (the full master
    rebrand; the solar-industry template in the showroom is an example).
- **★ MASTER-SLA-HOLDER EMPIRE (David 2026-09-02):** the empire sits under a **master SLA holder** (Jimmy
  is the example — restorationroyalties.com is his master), and every sub-brand/module lives under HIS url:
  `restorationroyalties.com/hvac/`, `/<industry>/`, etc. A full flagship build = an **exact infrastructure
  replica** of restorationroyalties.com (master home + sub-brand network + showroom + franchise/territory +
  industry research + knowledge base), re-skinned to the industry. **HALF A COW** (`/halfacow/`, gold, live)
  is being built as exactly this — a complete restorationroyalties.com infra emulation with food-truck-
  franchise content, collateral, research, and KB — an ongoing working asset + case study.
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
- **Master brain = GOOGLE DRIVE only (David 2026-08-27):** the unified, indexed memory + backup target
  for ALL LLM sessions is the Google Drive folder `TELVERGENCE-MASTER-BRAIN`
  (id `1-hKkLBbjFVk_WeOXO9l2pNcqGNNKOsOT`, account dallen362@gmail.com). NEVER back up to Microsoft
  OneDrive/SharePoint. The Zapier connection is RETIRED — do not retry or reconnect it; use the Drive
  MCP directly (binaries go up via the proven single-line ~1,900-char base64 part pipeline, each part
  fileSize-gated on arrival; reassembly READMEs accompany every part-set).
- **★ MAIN BRAIN topology (David 2026-09-01, standing directive):** THIS Claude Code session is the
  designated **MASTER MAIN BRAIN** for ALL Telvergence data consolidation and for every money-making /
  business project — the working source of truth for all things business. Master data flows in ONE
  direction through three tiers:
  **(1) Claude Code master-main-brain** (this session + this repo) → **(2) the Google Drive
  `TELVERGENCE-MASTER-BRAIN` folder** (dallen362@gmail.com — the unified, indexed backup defined in the
  rule above) → **(3) the external removable hard drive attached to the Lenovo "Excaliber" computer**
  (David's local cold copy). Tier 3 is PHYSICAL and David-side: a cloud session CANNOT reach the external
  drive, so the Drive→external-HDD copy is always David's step at the home studio (Claude provides the
  exact procedure, never the copy itself).
  **HARD EXCLUSION (reinforces the Kenneth/PHI rule):** ALL Kenneth Allen legal/medical/PHI matters are
  OUT of this money/business brain entirely — never ingested, consolidated, copied to any tier, or
  published. They live only in their own separate master space, never here.
