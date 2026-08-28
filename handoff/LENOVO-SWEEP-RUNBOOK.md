# LENOVO SWEEP RUNBOOK — pull the home machine's Microsoft files + Claude folders into the master brain

**Directive (David 2026-08-27):** all backed-up Microsoft files on the Lenovo main computer and all Claude
folders go to the consolidated Google Drive master brain (TELVERGENCE-MASTER-BRAIN, folder id
`1-hKkLBbjFVk_WeOXO9l2pNcqGNNKOsOT`, account dallen362@gmail.com) so every intelligence session ingests
the most recent, time-critical data. Google Drive ONLY — never OneDrive; Zapier retired.

**Why this runbook exists:** cloud sessions cannot read a local hard drive. The sweep must run ON the
Lenovo — either by a local Claude Code session (paste the prompt below) or by David directly. Everything
else (indexing, gap analysis, git/Drive archives) is already done cloud-side.

## Already in Google Drive (verified 2026-08-27 — do NOT re-upload, saves hours)
- The 2026-08-11 PC sweep folder (`1i1-FPUXUz2tuGoz1XOobu_3TnASCEe9r`): CLAUDE_MASTER_2026-07-15,
  TELVERGENCE_HANDOFF_2026-07-31, PORTALS_2026-08-09, `.claude`, ceo-vault, fast-adjusting folders,
  restorationroyalties.com folder, MASTER_MAX zips, Vitelity spec.
- The shared drive (`0AE8goLCgXBgDUk9PVA`): Phoenix docs, ViciBox ISO, lockdown playbooks, LOAs, Vici Logons.
- TELVERGENCE-MASTER-BRAIN: both platform archives (20 + 76 part sets, checksum-verified), all doctrine
  docs, the MASTER_MAX zip + its unpacked crown-jewel docs, the Vitelity spec.

## PASTE PROMPT — run in a Claude Code session ON the Lenovo (or follow by hand)
```
SWEEP the Lenovo to the Google Drive master brain (dallen362@gmail.com). Google Drive ONLY, never OneDrive.
1. Create C:\Users\dalle\LENOVO-SWEEP-<today's date>\ as the staging folder.
2. Copy into it anything NEWER than 2026-08-11 (the last swept date) from:
   - C:\Users\dalle\AI-Master-Brain\  (all Telvergence + recovery staging)
   - C:\Users\dalle\OneDrive\Documents\Claude\Projects\  (personal-OneDrive Claude folder)
   - C:\Users\dalle\OneDrive - contactam.com\  (ONLY files that are actually on disk — skip 0-byte
     online-only stubs; ~290 real files were materialized)
   - C:\Users\dalle\Downloads\  (TELVERGENCE*, *MASTER*, *vitelity*, *phoenix*, *.zip code exports)
   - %USERPROFILE%\.claude\  (settings, skills, session memory)
   - Any E:\ external-drive Claude/Telvergence backup folders
3. Zip the staging folder to LENOVO-SWEEP-<date>.zip, note the size and md5.
4. Upload the zip to Google Drive folder TELVERGENCE-MASTER-BRAIN
   (drive.google.com → the folder → New → File upload; or drag into Google Drive for desktop).
5. Reply with the file list, zip size, and md5 so the cloud session can index it.
HARD RULES: nothing emails out; skip anything named Kenneth/KEN.ALLEN (out of scope); credentials
files stay put — never re-copied; never upload to OneDrive/SharePoint.
```

## After the upload lands (any cloud session)
1. Verify the zip's size/md5 in Drive matches the local report.
2. Add one line to 000-CONTINUITY-GAP-ANALYSIS in the master brain: sweep date, zip id, contents count.
3. Copy any newly-current crown-jewel docs out of the zip's staging into the master brain as
   individual files (server-side `copy_file`), superseding stale copies.

## SYNTHESIZED SOLUTION QUEUE (priority order, from the full gap analysis)
1. **Server Stadium VPS #55065** — pay invoice #5119443 + reactivate before reformat (recent leads DB). David-only. ⏰
2. **Fresh `telvergence-master-max` ZIP** — GitHub → Code → Download ZIP → drop in master brain
   (closes the July-17 → August currency gap). 2 minutes.
3. **This Lenovo sweep** — paste prompt above into a local session. Catches everything since Aug 11.
4. **SkyKick portal check** — may hold the dead ContactAM OneDrive's 43k files independently.
5. **Azure mirror drives** — mount and pull agi-DID_route.agi, /etc/asterisk, MySQL campaign DB
   (the seasoned production dialer; no clock, highest long-term value).
6. **Rotate the 3 Microsoft account passwords + MFA** (Derek still holds them) once data is safe.
