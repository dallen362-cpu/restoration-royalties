# MICROSOFT ACCOUNT ROTATION RUNBOOK — the three accounts Derek holds

**Directive (David 2026-08-27):** rotate the three Microsoft passwords + MFA once the data is safe.

## ✅ DATA-SAFETY GATE: MET — rotate TODAY
Verified 2026-08-27, nothing rotation could jeopardize remains behind these logins:
- ContactAM OneDrive/SharePoint: confirmed DEAD and unrecoverable (empty tenant re-verified by scan
  today) — nothing left to lose there. Rotation deletes no mail; Exchange data survives.
- Personal-OneDrive Telvergence files: duplicated into Google Drive + master brain (fact-checked).
- Platform config: fully archived in git + the two checksum-verified master-brain part-sets.
- Recovery trails NOT behind Microsoft logins: Azure mirror = physical disks in hand; Server Stadium =
  separate portal (secure it the same day, below); SkyKick = separate portal.
- MEANWHILE, WAITING HAS ACTIVE RISK: a held password on dave@contactam.com = live access to the
  mailbox that receives password-reset emails for other services. Rotate first, recover second.

## WHY THIS IS DAVID-ONLY (recorded so no session re-attempts it)
No AI session can or should do this: it requires the CURRENT passwords (never held by sessions),
MFA challenges to David's devices, and NEW secrets — which must never pass through chat/AI per the
standing secrets rule. Sessions prepare; David types.

## THE ROTATION — do all three in one sitting, personal-device browser, order matters
Accounts (per the recovery record): the three Microsoft accounts whose passwords Derek retains —
(1) dave@contactam.com (work/tenant admin), (2) the personal Microsoft account (dalle / personal
OneDrive), (3) the third account per David's list. For EACH account:

1. **Change password** — account.microsoft.com → Security → Change password (work account:
   myaccount.microsoft.com or admin.microsoft.com → Users → Reset password). Generate in a password
   manager; never reuse; never type into any AI/chat.
2. **Sign out everywhere** — Security → "Sign out of all devices" / (admin: revoke sessions for the
   user). A password change alone does NOT kill existing sessions.
3. **MFA sweep** — Security → Advanced security options:
   - REMOVE every sign-in method / MFA device / phone / email you don't personally control
     (this is where a former collaborator persists AFTER a password change).
   - Add YOUR authenticator app; regenerate recovery codes; store them offline.
4. **App passwords & OAuth** — delete all app passwords; review "Apps and services that can access
   your data" and revoke anything unknown (a granted app token survives rotation).
5. **Mailbox persistence sweep (the big one on dave@contactam.com)** — Outlook Settings →
   Mail → Forwarding (must be OFF) and Rules (delete any rule you didn't create, especially
   forward/redirect/delete rules); admin center: check mailbox delegates & "send as" permissions.
6. **Recovery info** — verify the recovery email/phone on each account is YOURS, not Derek's.
7. **Tenant admin (contactam.com)** — admin.microsoft.com → Users: confirm Derek's user/guest
   accounts are disabled or removed; check Azure AD → Enterprise applications for unknown consents.

## SAME SITTING — the adjacent portals in the same exposure
- **Server Stadium portal** (Derek appears in its reset history): change password + enable MFA;
  set billing/tech contact to David. Do this right after paying invoice #5119443 / reactivation —
  do not lock Derek out BEFORE the VPS data is secured if his cooperation might be needed for it.
- **GoDaddy:** already rotated ✅ (recorded earlier). Verify MFA is on.
- **PayPal** (paid the VPS): confirm password/MFA current.

## AFTER ROTATION — 5-minute verification
- Old sessions dead: try any signed-in Microsoft session on another device — it must demand login.
- No forwarding: send a test mail to dave@contactam.com, confirm it arrives and nothing bounces out.
- Record COMPLETION ONLY (date + "rotated, MFA reset, rules clean") in the master brain gap-analysis
  doc — never the secrets themselves.
