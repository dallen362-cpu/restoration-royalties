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
5. **★ MODEL-ROUTING LAW (David 2026-09-02 — permanent; skill: `.claude/skills/model-routing/`).**
   BEFORE executing anything, run the routing evaluation and assign the task to the **LOWEST-COST Claude
   model that solves it to standard** — an automated, intelligent, pre-execution decision matching task →
   ability → economics precisely, every time. Tiers: **A Mechanical → Haiku 4.5** (greps, moves, formatting,
   verification, deterministic transforms) · **B Specified implementation → Sonnet 5** (code/content to a
   clear spec or template, JSON from a schema, page clones, instructed research) · **C Judgment/design →
   Opus** (ambiguity, architecture, honesty/compliance-sensitive output, audits) · **D Orchestration/
   critical → main session, never delegated** (strategy, user intent, deploys/unpublishes/sends, security
   boundaries, secrets/PHI/legal). Never spend Opus on Sonnet work or Sonnet on Haiku work; escalate only
   when a lane fails verification for a *capability* reason (fix a vague spec first). Verify every lane with
   a CHEAP check (Class A). State the routing in one line before executing. Assign agents and mint new
   skills as you go (additively).
   **The QUARTERBACK = Fable 5.1 (tier D, the main session).** Routing is not a one-time gate — it is a
   continuous quarterback function. Fable 5.1 decides the routing **on the fly**, orchestrates the lanes,
   **cross-synthesizes** their outputs into one coherent result, and **absorbs the macro and the micro in
   real time** — the macro (David's intent, the strategy, the doctrine, the economics) and the micro (each
   lane's detail, each verification, each edge case) held simultaneously. The cheaper tiers execute; the
   quarterback thinks, routes, integrates, and owns the outcome.

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
- **★ ADDITIVE / IMMUTABLE / REDUNDANT LAW (David 2026-09-02 — permanent):** every build is **additive
  and non-destructive**. NEVER overwrite or delete a solidified, saved mechanism, rule, or output —
  instead **create a new copy** (new slug / section / version) and keep **redundant backups** (git history
  + the Google Drive master brain; superseded versions retire to the **boneyard**, never deleted). Each
  completed build **permanently enriches our rules + skills** (record the new pattern in CLAUDE.md / the
  relevant SKILL.md) and flows its evolution into the **inventory · boneyard · showroom**. The set-in-stone
  mechanisms stay untouched; only additions accrue. Prove-then-propagate; harden the magic (sell the value,
  never expose the mechanism).
- **★ CLIENT-ROUTE PROCESS — exemplar = Half a Cow (David 2026-09-02):** a client is routed
  **Silver → (elected) → Gold → (optional) Platinum**: (1) stand up / pick the SILVER concept model in the
  showroom; (2) on election, run the **GOLD** gigapress output — own URL + `contact@` + Smart-DID; (3)
  register in showroom + inventory; (4) build the **research + knowledge-base** working asset; (5) generate
  the **territory / vanity-grid inventory by city** (NPA·NXX rate-center → local + AI SEO domination →
  supply/demand/competition read); (6) record every new pattern back into the rules + skills. Half a Cow
  (`/halfacow/`) is the live reference run of this route.
- **★ PRICING + FIELD-OPS MODULE (David 2026-09-02):** GOLD city-franchise SLA = **$25K down** per
  NFL-city stadium territory (the Half a Cow model); **PLATINUM = the telvergence.com white-label rebrand
  = $250K** product offering. The food-truck-franchise build is really the **FIELD WORK-TRUCK OPERATIONS
  MANAGEMENT module**: in-the-field work-truck / fleet command — call command center, storm & event
  dispatch, WIN weather-intelligence network — delivered via the app + SIP / web / phone + automated
  systems. Reusable for ANY field-service / work-truck industry (restoration, HVAC, pressure washing,
  food trucks, etc.). The food-truck fit (game-day/event demand + mobile fleet ops) is the exemplar.
- **★ HALF A COW v1 LOCKED (2026-09-02):** the complete NFL build (gold master · hub · 30-market inventory ·
  5 city storefronts · Cow Connect · Platinum white-label) is LIVE on 3 hosts — **telvergence.com/halfacow/ (canonical, public URL)**, halfacow.pages.dev, and the
  build shop restorationroyalties.com/halfacow/ — plus `/halfacow/presentation/` (the narrated 12-packet "3-Minute Show"
  for first-time prospects). Pinned on GitHub as branch `release/halfacow-nfl-evolution-v1`; the pre-Half-a-Cow foundation is pinned as
  branch `restore/pre-halfacow-2026-09-02` (main `8f31b6b`). **Restore points = branches, not tags:** the git proxy
  silently drops tag pushes (GitHub holds 0 tags), so never rely on a tag as a remote restore point.
  David's target public URL is `telvergence.com/halfacow/` — a cross-repo infra step, STAGED (not run) in
  `handoff/HALFACOW-TELVERGENCE-COM-DEPLOY.md` — EXECUTED 2026-09-02 by David's Cowork session (telvergence repo: restore
  branch `restore/pre-halfacow-2026-09-02`, `halfacow/` added, showroom card, canonical re-pointed). That session's
  output is David's — never modify it from here without his consent; new Half a Cow pages reach telvergence.com only
  via a Cowork copy of `halfacow/` from this repo (source of truth). Do not disturb the foundation.
- **★ SEQUENCE (David 2026-09-02):** (1) finish TODAY'S Half a Cow **GOLD** demo build (NFL-city model,
  live-noindexed for the 3:30 client meeting); (2) THEN build the Half a Cow **PLATINUM** = the
  telvergence.com white-label rebrand ($250K offering). Platinum comes AFTER the demo.
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
