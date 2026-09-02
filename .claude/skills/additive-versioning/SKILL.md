---
name: additive-versioning
description: Permanent law (David Allen, 2026-09-02) — never overwrite or replace a delivered edition; every change is a NEW edition at a new path, and every prior edition is preserved for the boneyard, inventory and showroom. Use before editing any delivered page, deck, brand output, rule or skill.
---

# Additive Versioning — build upon, never over

## The law (David, 2026-09-02 — permanent, reinforces the Additive / Immutable / Redundant law in CLAUDE.md)
"Never overwrite or replace; continue to build upon." Every delivered edition of anything (page, deck, brand output,
document, rule, skill) stays exactly as delivered. A change produces a **new edition at a new path**; the old one is
kept, linked or listed as a prior version, and flows into the boneyard / inventory / showroom as history.

## How to apply (checklist before any edit to a delivered thing)
1. **Is it delivered?** (live on any host, shown to a person, or referenced in a ledger) → it is frozen. Do not edit in place.
2. **Create the new edition beside it**, never on top of it:
   - personalization → `<path>/<audience>/` (e.g. `halfacow/presentation/stefano/`)
   - revision → `<path>/v<N>/` or `<path>-v<N>/` (e.g. `telvergence/v3/`, `/v4/`)
   - rule / skill change → append a dated block, or mint a new skill; never delete or rewrite prior text.
3. **Fix relative links** for the new depth (`../` → `../../`) and keep the new edition root-agnostic.
4. **Byte-check the original**: `git diff --quiet <last-delivered-commit> -- <original path>` must be clean.
5. **Register the edition** where it belongs (hub / showroom / inventory / boneyard note) and in the brain (CLAUDE.md
   or the relevant SKILL.md) so every rendition is findable.
6. **Redundant backups**: git (branch/restore-point BRANCHES — tags do not survive the proxy) + the Drive brain.

## Exceptions (only these)
- Honesty / legal corrections to a live page (false claim, leaked personal data, missing disclaimer) may be fixed in place,
  with the prior state preserved in git and noted in the commit message.
- Work-in-progress that was never delivered may be edited freely until it is delivered.

## Worked example (2026-09-02)
The generic 3-Minute Show at `halfacow/presentation/` had been delivered. Personalizing it for Chef Stefano was first
done in place (wrong); corrected by restoring the generic edition byte-for-byte and creating
`halfacow/presentation/stefano/` as a new edition with re-rooted links. Both editions now exist; both are live.
