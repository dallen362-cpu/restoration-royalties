# COWORK CLOSING PROMPT — Half a Cow finalize (QB → Cowork, 2026-09-02)
Paste everything below the line into the Cowork session on Excaliber (hostname `fbi-cybercrimeunit`). Same ground rules as this morning: additive only, no keys, no Vitelity, no email, nothing Kenneth. Only `halfacow/` changes in the telvergence repo; `halfacow/private/` is yours and is never overwritten.

---

QB Claude Code has recorded your handoff ledger and the AI-Master-Brain index in the build shop, and David ruled on the one discrepancy: **your price model is canonical, refined by David**: $250,000 = the exclusive city brand (Platinum private-label network for the whole territory, every NPA·NXX vanity number in it, royalty rights across the owner's network); $25,000 = each sub food-truck distribution license the city owner resells to local biz-op seekers (each a flywheel member); 10 Smart Number lines per truck at $24.95/mo; all illustrative, royalties in the FDD. Key theme everywhere: the flywheel + vanity-number examples. The QB has re-worded every "$25K down per city" line across `halfacow/` (master, hub, inventory, Platinum, the five storefronts, the 3-Minute Show) to match your deck. Do the four steps below IN ORDER, verify exactly as written, and paste outputs back.

## STEP 0 — Agreement check. Reply "AGREED" to each line, or state the exact difference.
1. Hosts: telvergence.com/halfacow/ is canonical; halfacow.pages.dev and restorationroyalties.com/halfacow/ are mirrors; canonical / og:url / JSON-LD / brand-kit hosts all point at telvergence.com/halfacow/.
2. Division of labor: only you write the telvergence repo; the QB never modifies your output; build-shop `halfacow/` is authoritative except `halfacow/private/`; when the sessions differ, your direction takes priority.
3. Price model (David, refined today, canonical everywhere): $250,000 = the exclusive city brand (Platinum private-label brand + network for the whole territory, configured from showroom + inventory, every NPA·NXX vanity combination, royalty rights across the owner's network); $25,000 = each sub food-truck distribution license the city owner resells to local biz-op seekers (each a flywheel member); 10 Smart Number lines/truck at $24.95/mo; royalties in the FDD; all illustrative / not an offer / no FPR; key theme = flywheel + vanity-number examples; no AI vendor named on any page.
4. Business brain going forward: AI-Master-Brain/Telvergence/ (Drive `1-y-YRo29hgS8H9i39LjtWR4Dp7kdoph4`); TELVERGENCE-MASTER-BRAIN is legacy, read-only.
5. Open for a David-present infra session only: Cloudflare Access on `/halfacow/private/`; whether to gate all of `/halfacow/`.
Paste the five answers back to David before doing anything else.

## STEP 1 — Pull the build shop and confirm the marker
```
cd %USERPROFILE%\rr-src
git checkout main
git pull origin main
git log -1 --oneline
findstr /C:"250,000" halfacow\index.html | find /c /v ""
findstr /C:"$25,000 down" halfacow\index.html halfacow\hub\index.html halfacow\inventory\index.html halfacow\platinum\index.html | find /c /v ""
```
Expected: the first count > 0 and the second count = 0. If the first count is 0, the QB commit has not landed yet — STOP and tell David; do not sync.

## STEP 2 — Re-sync `halfacow/` into the telvergence clone WITHOUT touching `private/`
```
cd %USERPROFILE%\telvergence
git checkout main
git pull origin main
robocopy %USERPROFILE%\rr-src\halfacow halfacow /E /XD private /R:2 /W:2
git status --short
```
`git status` must list ONLY paths under `halfacow/` and NOTHING under `halfacow/private/`. If anything else appears, STOP and tell David.
```
git add halfacow
git commit -m "Sync Half a Cow from build shop (price model aligned: $250K city + $25K per truck) — additive, private/ untouched"
git push origin main
```

## STEP 3 — Verify by CONTENT on telvergence.com (wait ~2 min for the redeploy)
```
curl -s https://telvergence.com/halfacow/ | findstr /C:"250,000" | find /c /v ""
curl -s https://telvergence.com/halfacow/presentation/ | findstr /C:"250,000" | find /c /v ""
curl -s https://telvergence.com/halfacow/hub/ | findstr /C:"$25,000 down" | find /c /v ""
curl -s https://telvergence.com/halfacow/private/ | findstr /C:"gate" | find /c /v ""
curl -s https://telvergence.com/ | findstr /C:"Kitchen Sink" | find /c /v ""
curl -s https://telvergence.com/showroom/ | findstr /C:"halfacow/hub" | find /c /v ""
```
Expected: >0, >0, 0, >0 (private deck still gated and intact), >0 (homepage undisturbed), >0 (showroom card intact).

## STEP 4 — Stage 3 cold backup (David names the drive letter; if he has not, ask him — F: iXpand has the most room)
Target: `<DRIVE>:\AI-Master-Brain\Telvergence\2026-09-02\` (the new umbrella brain layout; the old TELVERGENCE-MASTER-BRAIN folder is legacy).
1. If Google Drive for desktop is not running, download the Drive folder **AI-Master-Brain → Telvergence** as a zip from drive.google.com and use that.
2. `robocopy "<path to Telvergence sub-brain>" "<DRIVE>:\AI-Master-Brain\Telvergence\2026-09-02" /E /R:2 /W:2`
3. Save the GitHub restore-point zips (Code → Download ZIP) into `<DRIVE>:\AI-Master-Brain\Telvergence\2026-09-02\github-restore-points\` from:
   - https://github.com/dallen362-cpu/restoration-royalties/tree/release/halfacow-nfl-evolution-v1
   - https://github.com/dallen362-cpu/restoration-royalties/tree/restore/pre-halfacow-2026-09-02
   - https://github.com/dallen362-cpu/telvergence/tree/restore/pre-halfacow-2026-09-02
4. Paste back: the robocopy summary line (Failed = 0) and `dir` of the dated folder. Copy ONLY the Telvergence sub-brain — never the umbrella's people/legal/medical folders, never OneDrive/SharePoint.

## STEP 5 — Close
Write your closing ledger in the same format as this morning (Project / Status / Open Questions / Next Actions / Evidence Refs) and save it to Drive as `Claude/05_Handoffs-and-Ingests/HANDOFF_COWORK_TO_QB_HALFACOW-FINALIZE_2026-09-02.md`. Then STOP. Cloudflare Access on `/halfacow/private/` and any decision to gate all of `/halfacow/` remain open for a David-present infra session — do not start them.
