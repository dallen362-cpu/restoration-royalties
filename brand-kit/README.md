# Telvergence Brand Kit — the Mashup Studio engine

One template. One data file per brand. A new industry model is a JSON file plus one command.

## What's here
- `build.py` — reads each `brands/*.json` and writes `<slug>/index.html`.
- `brand.css` — the shared design system (Sora / Hanken Grotesk / IBM Plex Mono, per-brand `--accent`, scroll-reveal, cards, command center, DID grid, etc.). Every brand links this one file.
- `brands/_defaults.json` — shared copy applied to every brand (brain flow, compliance chips, platform stack, tiers, refer-&-earn, offer boilerplate, CTA). A brand JSON overrides only what differs.
- `brands/<slug>.json` — the per-brand data (the only thing you touch to make a new brand).

## Make / update a brand
```bash
python3 brand-kit/build.py              # build every brand
python3 brand-kit/build.py pressure     # build just one
```
Then verify and ship:
```bash
python3 tools/linkcheck.py              # expect: broken: 0
git add <slug>/ brand-kit/brands/<slug>.json && git commit && git push
```

## The per-brand JSON — the variables
`brandName, brandShortBold, brandShortRest, accent, lineCount, eyebrow, h1a, h1b, tagline,
demoNote, insight, benchNow[6]/benchNext[6], gridSub, dids[N] ({h, vn, p, pending}),
pillars[3], commandCenter, map, offerLead, alternative, tiers, seo{title,description,canonical},
jsonLd, disclaimer, ctaPhone/ctaEmail`.

Optional: `license {label,value}` (adds a license line / slot), `legalNotice` (regulated-vertical
banner), `_noRefer: true` (suppress refer-&-earn), `complianceChips`, `brainChips`, `didFootnote`.

## Standing rules (do not break)
1. **Never publish a made-up number.** Every unassigned DID is `pending: true` → renders "pending assignment". Real, assigned numbers only get `pending: false`.
2. **Proposals are noindex.** `robots` defaults to `noindex, nofollow`; keep every brand out of `sitemap.xml` and disallowed in `robots.txt` until the numbers are sent to Bright Sound.
3. **No fake 555 numbers, ever.** CTA defaults to the real Telvergence line (689-242-1041).
4. **Regulated verticals** (legal, real estate, medical) carry their required notices — attorney-advertising + §527/528, FREC license, HIPAA-aware handling. Use `legalNotice` / `license`.
5. **Preserve real facts.** Client NAP, assigned number blocks, and emails are copied verbatim into the JSON.
6. **Keep internal pricing off any indexed page.** Engagement tiers and the $25K white-label live only on noindex proposals.
