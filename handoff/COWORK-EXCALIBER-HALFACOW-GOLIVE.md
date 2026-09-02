# COWORK SESSION PROMPT — Excaliber · Half a Cow go-live steps (2026-09-02)
Paste everything below the line into a Cowork session on the Lenovo "Excaliber" (Chrome logged in to Cloudflare + GitHub as dallen362-cpu). Business-only session. Nothing here touches secrets, email, or Kenneth Allen matters.

---

You are running on David Allen's Lenovo "Excaliber" with Chrome logged in to Cloudflare and GitHub (account dallen362-cpu). Do the three stages below IN ORDER, verify each one exactly as written, and paste the verification output back to David after each stage. Stop and ask before anything not listed.

## HARD RULES (do not break)
- ADDITIVE ONLY. Create new things; never edit, rename, delete, or reconfigure any EXISTING Cloudflare Pages project, custom domain, DNS record, environment variable, or GitHub repo setting.
- NEVER handle, paste, read aloud, or store any API key, password, or token (Vitelity, TTS, Cloudflare, GitHub). If a screen asks for one, stop and tell David.
- Do NOT touch the Vitelity portal at all.
- Do NOT send any email or message to anyone.
- Nothing about Kenneth Allen (legal/medical/PHI) exists in this session. If you see it anywhere, do not open, copy, or mention its contents.
- Do NOT edit `index.html`, `realm.html`, `members.html`, `_headers`, `/v3/`, `/v4/`, `/showroom/` or anything else already in the telvergence repo. Stage 2 only ADDS a new `halfacow/` folder.

## STAGE 1 — Create the free branded URL `halfacow.pages.dev` (required, ~5 min)
1. Open https://dash.cloudflare.com → Workers & Pages → **Create** → **Pages** → **Connect to Git**.
2. Select repository **dallen362-cpu/restoration-royalties** (the same repo the existing `coastalcrownpressurewashing` project uses).
3. Project name: **halfacow** (exactly — it becomes the URL). Production branch: **main**.
4. Framework preset: **None**. Build command: **leave blank**. Build output directory: **halfacow** (no slashes).
5. Click **Save and Deploy**. Wait until the deployment shows Success.
6. Do NOT add a custom domain and do NOT add environment variables.

**Verify (paste the output back):** open a terminal (PowerShell is fine) and run:
```
curl -s -o NUL -w "%{http_code}`n" https://halfacow.pages.dev/
curl -s -o NUL -w "%{http_code}`n" https://halfacow.pages.dev/hub/
curl -s -o NUL -w "%{http_code}`n" https://halfacow.pages.dev/platinum/
curl -s -o NUL -w "%{http_code}`n" https://halfacow.pages.dev/dallas/
curl -s https://halfacow.pages.dev/platinum/ | findstr /C:"TALKING EDITION"
```
Expected: four `200`s and one line containing `TALKING EDITION · PLATINUM`. Then open https://halfacow.pages.dev/hub/ in Chrome and confirm the 30 NFL market cards render and the Dallas card opens the Dallas storefront. Report: "Stage 1 done" + the outputs.

## STAGE 2 — `telvergence.com/halfacow/` (additive cross-repo copy) — ONLY if David says "go stage 2" in this session
This adds a NEW folder to the telvergence.com site. It changes nothing that exists today (`telvergence.com/halfacow/` currently just falls back to the homepage).
1. Restore point first. In a terminal:
```
cd %USERPROFILE%
git clone https://github.com/dallen362-cpu/telvergence.git tv-live
cd tv-live
git checkout main
git branch restore/pre-halfacow-2026-09-02
git push origin restore/pre-halfacow-2026-09-02
```
   Confirm on GitHub that branch `restore/pre-halfacow-2026-09-02` now exists in `dallen362-cpu/telvergence` before continuing.
2. Copy the Half a Cow tree verbatim from the build shop (never hand-edit it):
```
cd %USERPROFILE%
git clone https://github.com/dallen362-cpu/restoration-royalties.git rr-src
xcopy /E /I /Y rr-src\halfacow tv-live\halfacow
cd tv-live
git add halfacow
git status
```
   `git status` must show ONLY new files under `halfacow/`. If anything else is modified, STOP and tell David.
3. Commit and push:
```
git commit -m "Add Half a Cow (NFL franchise concept) at /halfacow/ — additive, nothing else touched"
git push origin main
```
4. Wait ~2 minutes for Cloudflare to redeploy telvergence.com, then **verify (paste back)**:
```
curl -s https://telvergence.com/halfacow/hub/ | findstr /C:"Half a Cow" | find /c /v ""
curl -s https://telvergence.com/halfacow/platinum/ | findstr /C:"TALKING EDITION"
curl -s https://telvergence.com/ | findstr /C:"Kitchen Sink" | find /c /v ""
curl -s -o NUL -w "%{http_code}`n" https://telvergence.com/realm.html
```
Expected: first count > 0, the PLATINUM line present, the homepage "Kitchen Sink" count unchanged from before (>0 — proves the homepage was not disturbed), realm 200. Report: "Stage 2 done" + outputs. (Claude Code will then update the showroom card and brand JSON to the telvergence.com URL — you do not edit those.)

## STAGE 3 — Tier-3 cold copy to the external drive (David-side backup rule)
1. Confirm the external removable drive is attached to Excaliber and note its drive letter (e.g. `E:`).
2. If Google Drive for desktop is installed, locate the folder **TELVERGENCE-MASTER-BRAIN** (Google Drive → My Drive). If it is not synced locally, open https://drive.google.com, right-click **TELVERGENCE-MASTER-BRAIN** → Download (a zip), and use that zip.
3. Copy it to the external drive into a dated folder, e.g. `E:\TELVERGENCE-MASTER-BRAIN\2026-09-02\`, using File Explorer or:
```
robocopy "<path to TELVERGENCE-MASTER-BRAIN>" "E:\TELVERGENCE-MASTER-BRAIN\2026-09-02" /E /R:2 /W:2
```
4. Also save a copy of the two GitHub restore points as zips (Code → Download ZIP) from
   https://github.com/dallen362-cpu/restoration-royalties/tree/release/halfacow-nfl-evolution-v1 and
   https://github.com/dallen362-cpu/restoration-royalties/tree/restore/pre-halfacow-2026-09-02
   into `E:\TELVERGENCE-MASTER-BRAIN\2026-09-02\github-restore-points\`.
5. **Verify (paste back):** the robocopy summary line (Files copied / Failed = 0) and a `dir` of the dated folder showing the two zips. Do NOT copy anything from OneDrive/SharePoint, and do NOT copy any Kenneth Allen folder — if the Drive folder contains one, skip it and say so.

## Report format (after each stage)
`Stage N done` · the exact verification outputs · anything you skipped and why. Then wait for David.
