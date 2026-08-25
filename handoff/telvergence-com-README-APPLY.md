# telvergence.com — 100X UPGRADE BUNDLE (apply in one commit)
Built 2026-08-25 from the LIVE telvergence.com homepage fetched today (so nothing else on the
page changes). Git history preserves the old version — nothing is lost.

## What this bundle contains
1. `index.html`  — the upgraded homepage:
   • Featured brand swapped: Roofing Crew → **Restoration Royalties** (industry card AND the big
     Results case study: "Flagship of the Weather Intelligence Network", 807-MOLD / 24/7 / 5 live
     properties, before→after, button → restorationroyalties.com). All stormcrew links removed.
   • NEW "Live Network" section (+ nav item "Live Network"): six live cards — RR flagship,
     RR Live, FAST Live, Coastal Crown Live, YES Electrical Live, Branson Ainsworth — plus
     "The Opportunity" CTA. Every link verified HTTP 200 today.
2. `branson/index.html`     — makes **telvergence.com/branson/** live (turnkey law-firm demo).
3. `opportunity/index.html` — makes **telvergence.com/opportunity/** live (investor pitch).

## How to apply (repo: dallen362-cpu/telvergence, branch main)
GitHub web: repo → "Add file" → "Upload files" → drag in `index.html`, the `branson` folder,
and the `opportunity` folder → commit to main ("telvergence.com 100X: feature Restoration
Royalties + Live Network + client pages"). GitHub Pages redeploys in ~1 minute.

## Cowork prompt (paste to the Telvergence session with these files attached)
TASK: Apply the attached upgrade bundle to repo dallen362-cpu/telvergence on main:
replace root index.html with the attached index.html; add branson/index.html and
opportunity/index.html as new folders. One commit. Then verify all three load publicly:
https://telvergence.com/ (shows "Live Network" + Restoration Royalties case study),
https://telvergence.com/branson/, https://telvergence.com/opportunity/. Change nothing else.

## Verify after deploy
Tell the restoration-royalties session "check telvergence.com" — it will curl-verify:
homepage contains "Not a Promise. A Running Network." and "Restoration Royalties: Flagship",
no "stormcrew" remains, and /branson/ + /opportunity/ return 200.
