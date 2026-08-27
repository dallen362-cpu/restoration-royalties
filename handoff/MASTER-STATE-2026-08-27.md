# MASTER STATE SNAPSHOT — 2026-08-27 (V4 "Kitchen Sink" go-live day)
> Permanent disaster-recovery record. Any session, any machine, any time: this file + the two git
> repos below reconstruct the ENTIRE platform. Git is the primary store; Drive + external drive are
> redundant copies. NOTHING sensitive in this file — credentials live only in secret managers.

## The two repositories (source of truth — clone these and you have everything)
- restoration-royalties (build shop + all sites): https://github.com/dallen362-cpu/restoration-royalties
  main @ 667574fa16456beaa13c6cd2a1c9c141062540d0  · tag: v4-kitchen-sink-2026-08-27
- telvergence (telvergence.com deploy target): https://github.com/dallen362-cpu/telvergence
  main @ 42036330d78bad0cf0ad67341eefc11f1ae7ce5c  · tag: v4-kitchen-sink-2026-08-27

## Live production (all verified 200 today)
telvergence.com (V4 Kitchen Sink) · /realm.html (Proprietary Inventory, gate TELVERGENCE-2026) ·
/members.html · /v2/ · /original/ · /branson/ · restorationroyalties.com (+ /telvergence/v3/ frozen
master, /telvergence/showroom/, 12 brand pages, 13+ lead engines, /case-studies/, /softphone/,
/choose-number/, /fast/demo/).

## The machine (real-time configuration)
- Gigapress: brand-kit/build.py + brands/<slug>.json → <slug>/index.html. 19 standard modules
  (brand-kit/skills/fast-standard/SKILL.md): flywheel · DID issuance/royalty · BOSS CRM+LMS ·
  Doppler radar · Starbucks courtesy · auto-vanity NPA inventory · WIN partner seal · territory
  analysis/secret sauce · read-aloud 🔊 · two-way concierge 🎙 (KB auto-cloned per brand).
- Enforcement: build.py GBP gate (exit 1 until gbp blocks complete; --listings board). Gate honest-red:
  4 real brands await profiles (rr/fast/pressure/yes, keyword DIDs 786-RESTORE/-CLAIMS/-WASHPRO/-ELECTRIC).
- Governance: CLAUDE.md (David's global execution rule, loads every session) · handoff/SYNC-LANES.md ·
  handoff/CLOUDFLARE-ACCESS-RUNBOOK.md · handoff/ROADMAP-webrtc-softphone-did-issuance.md.
- Homepage source of truth: handoff/telvergence-com-index.html (deploy = copy verbatim to telvergence
  repo index.html; realm/members same pattern).
- Dormant fail-closed slots (arm via secrets, never in repo): VITELITY_LOGIN/PASS, TTS_API_KEY,
  CALLBACK_ALERT_TO/FROM, STRIPE links (data-stripe slots), WEBHOOK_SECRET, live lead/storm feeds.

## Recovery map (the crown jewels, verified locations)
- Azure mirror drives (David's physical possession): the seasoned loaded ViciBox production system.
- Google Drive dallen362@gmail (TELVERGENCE-MASTER-BRAIN + Telvergence folders): full rebuild kit —
  ViciBox ISO, Project Phoenix blueprint, Vitelity provisioning spec + API reference, Vitelity↔Sinch
  playbooks, LOAs, Vici Logons sheet, TELVERGENCE_MASTER_MAX_LATEST.zip, 900KB code exports.
- backend/ in repo: BOSS-CRM-LMS-SCHEMA.md, vicidial-client.js, all 4 Perplexity research exports.

## Published artifacts (claude.ai/code/artifact/…)
one-day-report (Aug 26) · 00297fa0 Listings Runbook (dark) · 760bdbf0 V4 Gap Analysis.

## External-drive backup (David: run on any machine with the drive mounted)
    cd /path/to/external-drive
    git clone https://github.com/dallen362-cpu/restoration-royalties.git
    git clone https://github.com/dallen362-cpu/telvergence.git
    # (re-run later with: git -C restoration-royalties pull && git -C telvergence pull)
Or browser-only: each repo page → Code → Download ZIP.

## Today in one line
PRs #147–#166 · +8,300 lines · Talking Edition → V4 Kitchen Sink · 19-module assembly line ·
mechanical GBP gate · the Realm (90 mechanisms) · security hardened (HSTS, no-store, Access runbook).
