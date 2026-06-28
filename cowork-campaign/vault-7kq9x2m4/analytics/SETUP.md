# TELVERGENCE Visit Tracking — One-Time Setup (~5 minutes)

This turns the tracker from "works in my own browser" into "tracks everyone, everywhere," and
feeds the live dashboard + scheduled Gmail summaries + (optional) SMS.

## What you get
- Every visit logged to a **Google Sheet you own**: who (email, if they pass the gate), when, which
  page, time on page, scroll depth, sections viewed, **copy events**, outbound clicks, and the
  per-recipient link token (so forwarding is visible).
- A **live dashboard** (`watch.html`) that reads the Sheet in near-real-time.
- **Scheduled Gmail drafts** — Claude sweeps the Sheet on a loop and drafts running summaries to you.
- **Optional real-time SMS** to your cell on high-signal events (a named viewer, a copy).

---

## Step 1 — Create the Sheet + script
1. Go to **https://sheets.google.com** → **Blank spreadsheet**. Name it `TELVERGENCE Visits`.
2. **Extensions → Apps Script**.
3. Delete the starter code, paste the entire contents of **`Code.gs`** (in this folder), **Save**.

## Step 2 — Deploy as a Web App
1. In Apps Script: **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Set:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*  ← required so the public pages can post to it
4. **Deploy** → authorize when prompted → **copy the Web app URL** (ends in `/exec`).

## Step 3 — Plug the URL in
Send me that `/exec` URL and I'll commit it into:
- `assets/telv-track.js` → `ENDPOINT`
- `watch.html` → `ENDPOINT`

(Or paste it into both files yourself at the `ENDPOINT = ""` line and push.)

That's it — tracking goes live across every page, and the dashboard shows real visitors.

---

## Step 4 (optional) — Real-time SMS
In Apps Script: **Project Settings → Script Properties → Add**:

| Property | Value |
|---|---|
| `TWILIO_SID` | your Twilio Account SID |
| `TWILIO_TOKEN` | your Twilio Auth Token |
| `TWILIO_FROM` | your Twilio number, e.g. `+1...` |
| `ALERT_TO` | your cell, `+16892421041` |

Texts fire on a new **identified** viewer or a **copy** event. (Vitelity can replace Twilio later
via the same `maybeAlert_` function.)

---

## Notes & honest limits
- **Identity gate** is on by default (`GATE=true` in `telv-track.js`). Visitors enter an email before
  viewing. Flip to `false` to make it optional (less friction, fewer names).
- **Forwarding** is *inferred*: a per-recipient link (`funnel.html?v=larry`) opened on more than one
  device is flagged "likely forwarded." You only get the forwardee's name if they enter an email.
- **Screenshots cannot be detected** by any website — not included, because it isn't possible.
- Tracking visitors has privacy obligations; the gate's consent line covers basic disclosure. Keep it.
