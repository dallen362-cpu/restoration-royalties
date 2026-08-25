---
name: telvergence-com-handoff
description: The cross-repo handoff procedure for updating telvergence.com (repo dallen362-cpu/telvergence, GitHub Pages) from a session that only has access to dallen362-cpu/restoration-royalties. Publish the upgrade files at fetchable paths on restoration-royalties@main, then any session scoped to the telvergence repo applies them with a deterministic 3-raw-URL prompt. Use whenever telvergence.com needs content this session produced, and re-run the refresh ritual whenever a bundled page changes.
---

# telvergence.com Cross-Repo Handoff

## The problem this solves
telvergence.com is served by GitHub Pages from `dallen362-cpu/telvergence`. A session scoped only to
`restoration-royalties` cannot push there (the git proxy injects credentials only for authorized
repos). Attaching files to another session is unreliable. The fix: **make the payload publicly
fetchable and the apply-prompt deterministic.**

## The mechanism (3 parts)
1. **Publish the payload on restoration-royalties@main** at stable paths:
   - `handoff/telvergence-com-index.html` — the upgraded telvergence.com homepage (built by fetching
     the LIVE homepage, verifying it is byte-identical to the telvergence repo's index.html, then
     applying edits — so nothing unseen is clobbered).
   - `telvergence/branson/index.html`, `telvergence/opportunity/index.html` — pages that deploy on
     BOTH domains (they already serve on restorationroyalties.com; the handoff reuses the same files).
   The repo is public → `https://raw.githubusercontent.com/dallen362-cpu/restoration-royalties/main/<path>`
   serves every file with no auth. **Raw URLs always serve latest main — the prompt never goes stale.**
2. **The apply prompt** — pasted into any session scoped to `dallen362-cpu/telvergence`:
   fetch each raw URL, use bytes verbatim (no edits/reformat), one commit to main, push, wait ~2 min
   for Pages, verify live markers. The canonical prompt text lives in
   `handoff/telvergence-com-README-APPLY.md`.
3. **Independent verification** — after the other session reports done, this session curls
   telvergence.com and confirms: the marker strings render, no stale strings remain
   (e.g. "stormcrew"), and each new path returns 200 publicly.

## The refresh ritual (run whenever any bundled page changes on main)
1. `git show origin/main:<each bundled path>` → confirm content is current and clean
   (grep for the newest marker, e.g. "Built, not promised"; grep-verify removed content stays removed).
2. Verify each raw URL returns 200 and contains the newest marker (proves the prompt serves latest).
3. Rebuild the convenience tar (`index.html` + `README-APPLY.md` + folders) and hand it to the user —
   the tar is a snapshot for manual GitHub-web upload only; the raw-URL prompt is the primary path.
4. If the homepage itself needs new edits: re-fetch live telvergence.com, diff against the telvergence
   repo's index.html (must be identical before editing), apply edits, republish to `handoff/`.

## Rules
- Payload paths on main are the source of truth; never hand out a file that isn't committed to main.
- The apply prompt must say "bytes verbatim" — the applying session must not "improve" anything.
- Every handoff ends with this session's own curl verification of the live domain; the other
  session's "done" is not proof.
- Same safety gates as all deploys: no card numbers, no personal cell, disclaimers intact, noindex
  preserved where set.
