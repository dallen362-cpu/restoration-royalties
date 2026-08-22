# ViciDial Full Extraction & Migration Prompt

> **Saved to our records:** 2026-08-19 · source: David. Pairs with `backend/VICIDIAL-SETUP.md`.
> This is a paste-ready runbook for a session that has **SSH root** to the Server Stadium box.
> It cannot be run from the website repo session (no SSH). Open a Cowork / Claude Code / terminal
> session with SSH access, fill in `SERVER_HOST` and `SSH_USER`, and paste the block below.

**Purpose:** Pull a complete, restorable copy of a ViciDial installation off a Server Stadium–hosted
box (via SSH/root) and stage it for re-hosting on local hardware — capturing every campaign, list,
user, carrier, dialplan, config file, script, and recording before the subscription lapses.

## ⚠️ Read before you run

- Do this **while you still have access**. Once the subscription ends the box may be wiped with no
  recovery. Prioritize getting the **database dump + `/etc/asterisk` + `astguiclient.conf`** off the
  server first; everything else is secondary.
- **The database is the crown jewels.** The `asterisk` MySQL database holds all campaigns, lists,
  leads, agents/users, ingroups, carriers/trunks, DID routing, dialplan entries, filters, scripts,
  and settings. Configs on disk are meaningless without it.
- **Live-traffic caution.** If agents are actively dialing, a full DB lock can briefly interrupt
  calls. Run the dump during off-hours or a short maintenance window if you can. The prompt uses a
  consistent-snapshot method and notes where a brief lock matters.
- **Check for a cluster.** ViciDial is often multi-server (one DB/web server + separate dialers).
  The prompt checks the `servers` table — if there's more than one server, repeat the file-collection
  steps on each box (the database only needs to be dumped once, from the DB server).
- **Don't delete anything on the source.** Extraction is read-only. Nothing here removes or modifies
  data on the Server Stadium box.

---

## 📋 PASTE THIS PROMPT INTO YOUR SSH-CAPABLE SESSION

```
You are helping me make a COMPLETE, RESTORABLE backup of my ViciDial server that is
hosted by Server Stadium, so I can re-host it myself on local hardware before my
subscription expires. I have SSH root (or sudo) access.

CONNECTION:
  SERVER_HOST = <fill in: IP or hostname>
  SSH_USER    = <fill in: e.g. root>

GROUND RULES:
- Everything is READ-ONLY on the source server. Do not delete, move, or modify any
  file or database row on the Server Stadium box.
- Work step by step. After each step, show me the output/summary before moving on.
- If a path doesn't exist, note it and continue — ViciDial layouts vary by installer
  (ViciBox/Scratch/Goautodial), so discover paths, don't assume them.
- Bundle everything under a single working dir on the server: /root/vicidial_backup/
  (or ~/vicidial_backup/ if not root). Create it first.

=== STEP 1 — DISCOVER THE ENVIRONMENT ===
Run and report:
  1. OS + version:            cat /etc/os-release ; uname -a
  2. Uptime & disk free:      df -h ; free -m
  3. ViciDial version/build:  grep -i "version\|build" /etc/astguiclient.conf | head
                              and: /usr/share/astguiclient/ADMIN_keepalive_ALL.pl --version 2>/dev/null
                              also check the DB later for build.
  4. Asterisk version:        asterisk -rx "core show version" 2>/dev/null
  5. MySQL/MariaDB version:   mysql --version
  6. Confirm the master config exists: ls -la /etc/astguiclient.conf
Report a short summary of what this box is (single-server vs. likely cluster, versions,
free disk — we need enough free space to build the archive, roughly the size of the DB
plus recordings).

=== STEP 2 — READ THE MASTER CONFIG (credentials live here) ===
  cat /etc/astguiclient.conf
This file contains the DB name, DB user, DB password, and server IP that everything
else uses. Extract and remember (do NOT print the password back to me in plaintext in
later steps — just use it): VARDB_server, VARDB_database, VARDB_user, VARDB_port, and
the DB password (VARDB_pass). Default DB name is usually "asterisk".
Copy the file itself into the backup:  cp -a /etc/astguiclient.conf /root/vicidial_backup/

=== STEP 3 — CHECK FOR A MULTI-SERVER CLUSTER ===
Using the creds from Step 2:
  mysql -u<user> -p<pass> asterisk -e "SELECT server_id, server_ip, server_description, \
     active, active_asterisk_server, is_webserver FROM servers;"
If more than one server is listed, TELL ME — the database dump (Step 4) is done once from
the DB server, but the file/config/recording collection (Steps 5–9) must be repeated on
each dialer box separately. List each server_ip so I can SSH to them next.

=== STEP 4 — DUMP THE DATABASE (most important step) ===
Create the dump into the backup dir. ViciDial tables are historically MyISAM, so a plain
--single-transaction alone won't give a consistent snapshot. Use a full dump that locks
appropriately:

  mysqldump -u<user> -p<pass> \
    --routines --triggers --events \
    --add-drop-table --complete-insert --hex-blob \
    --lock-all-tables \
    asterisk > /root/vicidial_backup/asterisk_db_$(date +%F).sql

  (If --lock-all-tables would disrupt live dialing and you accept a slightly less-consistent
   snapshot of active call tables, substitute --single-transaction --quick instead, and note
   that in the report.)

Then verify the dump is real, not truncated:
  ls -lh /root/vicidial_backup/asterisk_db_*.sql
  tail -n 5 /root/vicidial_backup/asterisk_db_*.sql   (should end with "Dump completed")
  grep -c "CREATE TABLE" /root/vicidial_backup/asterisk_db_*.sql  (report table count)

Also capture the exact DB build ViciDial reports:
  mysql -u<user> -p<pass> asterisk -e "SELECT * FROM system_settings\G" | head -60

=== STEP 5 — ASTERISK CONFIGURATION ===
Archive the entire Asterisk config tree (dialplan, SIP/IAX/PJSIP trunks, extensions, etc.):
  tar czf /root/vicidial_backup/etc_asterisk.tgz -C / etc/asterisk
Report the file list inside so we can eyeform the trunks/carriers:
  tar tzf /root/vicidial_backup/etc_asterisk.tgz | head -80

=== STEP 6 — VICIDIAL SCRIPTS, WEB FILES, AND PERL/CGI ===
Collect the ViciDial application itself. Check each path; archive the ones that exist:
  - Perl backend scripts:   /usr/share/astguiclient/
  - Web agent + admin UI:   /srv/www/html/   (ViciBox)  OR  /var/www/html/  (Scratch/others)
    (look specifically for the agc/ and vicidial/ subfolders)
  - Any custom cgi-bin:     /srv/www/cgi-bin/  or  /var/www/cgi-bin/
Example (adjust to whatever exists):
  tar czf /root/vicidial_backup/usr_share_astguiclient.tgz -C / usr/share/astguiclient
  tar czf /root/vicidial_backup/web_root.tgz -C / srv/www/html   # or var/www/html
Report which paths existed and the archive sizes.

=== STEP 7 — CRON JOBS & SCHEDULED TASKS ===
ViciDial relies heavily on cron (keepalive, lead recycling, listmix, AST_* scripts):
  crontab -l > /root/vicidial_backup/root_crontab.txt 2>/dev/null
  cp -a /etc/crontab /root/vicidial_backup/etc_crontab.txt 2>/dev/null
  ls -la /etc/cron.d/ && tar czf /root/vicidial_backup/etc_cron.d.tgz -C / etc/cron.d 2>/dev/null
Report the crontab contents so we can replicate the schedule on the new box.

=== STEP 8 — RECORDINGS, SOUNDS, MUSIC-ON-HOLD, VOICEMAIL ===
These can be large — report sizes FIRST, then archive:
  du -sh /var/spool/asterisk/monitorDONE 2>/dev/null
  du -sh /var/spool/asterisk/monitor 2>/dev/null
  du -sh /var/lib/asterisk/sounds 2>/dev/null
  du -sh /var/lib/asterisk/moh 2>/dev/null
  du -sh /var/spool/asterisk/voicemail 2>/dev/null
Then archive each that exists (these are the ones that matter for a faithful clone):
  tar czf /root/vicidial_backup/recordings_monitorDONE.tgz -C / var/spool/asterisk/monitorDONE
  tar czf /root/vicidial_backup/custom_sounds.tgz -C / var/lib/asterisk/sounds
  tar czf /root/vicidial_backup/moh.tgz -C / var/lib/asterisk/moh
  tar czf /root/vicidial_backup/voicemail.tgz -C / var/spool/asterisk/voicemail
If recordings are huge (many GB) and you only need config-fidelity, tell me the size and
let me decide whether to pull them now or as a separate transfer. Prompts, IVR audio, and
music-on-hold are small and should always be included.

=== STEP 9 — SYSTEM CONTEXT (for rebuilding the box) ===
Capture what's needed to reproduce the environment:
  - Installed packages:   rpm -qa | sort > /root/vicidial_backup/packages_rpm.txt   (openSUSE/RHEL)
                          OR dpkg -l > /root/vicidial_backup/packages_deb.txt         (Debian/Ubuntu)
  - Network/DID mapping:  ip a ; cat /etc/hosts
  - Asterisk modules:     asterisk -rx "module show" > /root/vicidial_backup/asterisk_modules.txt 2>/dev/null
  - Timezone/locale:      timedatectl ; locale
  - PHP / Perl versions:  php -v ; perl -v | head -3
  - Any custom files in /etc you know you changed (my.cnf, php.ini, limits.conf):
      cp -a /etc/my.cnf* /root/vicidial_backup/ 2>/dev/null

=== STEP 10 — BUNDLE, CHECKSUM, AND VERIFY ===
  cd /root && tar czf vicidial_FULL_backup_$(date +%F).tar.gz vicidial_backup/
  sha256sum vicidial_FULL_backup_*.tar.gz > vicidial_FULL_backup_$(date +%F).sha256
  ls -lh vicidial_FULL_backup_*.tar.gz
Report the final archive size and checksum. Confirm the DB .sql, etc_asterisk.tgz, and
astguiclient.conf are all inside:
  tar tzf vicidial_FULL_backup_*.tar.gz | grep -E "asterisk_db_|etc_asterisk|astguiclient.conf"

=== STEP 11 — TRANSFER DOWN TO LOCAL HARDWARE ===
From MY local machine (not the server), pull the archive down over SSH:
  scp <SSH_USER>@<SERVER_HOST>:/root/vicidial_FULL_backup_*.tar.gz  ./
  scp <SSH_USER>@<SERVER_HOST>:/root/vicidial_FULL_backup_*.sha256  ./
Then verify the download is intact locally:
  sha256sum -c vicidial_FULL_backup_*.sha256
Do NOT consider the migration "safe" until this checksum passes on the local copy.
Keep a second copy on separate media (external drive / another machine).

=== STEP 12 — WRITE THE RESTORE / INVENTORY NOTES ===
Produce a short migration document I can keep, listing:
  - OS, Asterisk, ViciDial build, MySQL versions found in Step 1/4
  - Whether this was single-server or a cluster (and the server_ips if clustered)
  - Every archive captured and its size
  - The DB name/user (NOT the password) and table count
  - A high-level restore checklist for the new local box:
      1. Install matching OS + ViciDial (same major build via ViciBox ISO or Scratch install)
      2. Create the `asterisk` DB and import asterisk_db_*.sql
      3. Restore /etc/astguiclient.conf (edit server IPs to the new box)
      4. Restore /etc/asterisk configs (edit trunk/registration IPs for the new network)
      5. Restore /usr/share/astguiclient and web root
      6. Restore recordings/sounds/moh/voicemail
      7. Reinstall crontab entries
      8. Update the `servers` and `phones`/`conferences` tables for the new IP
      9. Re-point carriers/DIDs to the new public IP with the carrier
     10. Test one campaign end-to-end before going live
```

---

## 🧭 Notes for the restore side (local hardware)

A faithful ViciDial clone means **matching the major build**. Installing a newer ViciDial and
importing an old `asterisk` DB can break because the schema drifts between builds. Best path:
rebuild the new box with a ViciDial version as close as possible to what Step 1/4 reports, import
the DB, then run ViciDial's own `upgrade` SQL scripts (in `/usr/src/astguiclient/.../docs/upgrade_*.sql`)
only if you deliberately move to a newer build.

The two things that **always** need editing after restore are:
1. **IP addresses** — the `servers` table, Asterisk trunk/registration configs, and `astguiclient.conf`
   all hardcode the old Server Stadium IP.
2. **Carrier / DID routing** — your SIP trunk provider must point your DIDs and allow registration from
   the new box's public IP.

Everything else — campaigns, lists, users, scripts — comes back verbatim with the database.

If Step 3 shows a **cluster**: dump the DB once from the DB/web server, but run Steps 5–9 on every
dialer box, since each has its own Asterisk configs and its own local recordings.
