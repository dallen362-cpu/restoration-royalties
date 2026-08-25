---
name: telvergence-brand-deploy
description: The universal gigapress deploy standard. Publishes ANY Telvergence brand or client demo site to the single canonical namespace telvergence/<slug>/, registers it in the master brand index, keeps it noindex + public-by-link, never overwrites, and verifies it opens for a stranger. Use every time a new brand/client site is finalized and needs a public link (e.g., to text or email a prospect), or when re-homing an existing brand into the standard.
---

# Telvergence Gigapress — Universal Brand Deploy Standard

## THE LAW (no exceptions)
Every brand is a peer under one parent. There is no "top-level" brand — **Restoration Royalties
included**. All live at:

```
<domain>/telvergence/<slug>/            index.html   ← the brand's public page
<domain>/telvergence/                    index.html   ← the master brand index (catalog of all)
```

- **Universal namespace.** Coastal Crown → `telvergence/coastalcrown/`. FAST Adjusting →
  `telvergence/fastadjusting/`. YES Electrical → `telvergence/yeselectrical/`. Restoration Royalties →
  `telvergence/restorationroyalties/`. Branson → `telvergence/branson/`. The next brand →
  `telvergence/<slug>/`. Same shape forever.
- **Domain today:** `restorationroyalties.com` serves the Cloudflare Pages project, so URLs are
  `restorationroyalties.com/telvergence/<slug>/`. **Endgame:** point `telvergence.com` at the same
  project so Telvergence is the literal front door. Path standard starts now; domain flip is a later switch.
- **Never overwrite.** A new brand goes to a NEW path (`assert not exists`). Updating an existing brand
  is a deliberate republish of that one path — never a silent clobber, and never a delete of prior work.
- **noindex, public-by-link.** The site root `_headers` already sends `X-Robots-Tag: noindex` and no CSP,
  so external embeds work and Google won't list it. The page is reachable by anyone with the link — which
  is the point (a prospect must open it without a login), so treat every deployed link as public.

## SLUG RULES
Lowercase, no spaces, no punctuation, brand name only: `coastalcrown`, `fastadjusting`,
`yeselectrical`, `restorationroyalties`, `branson`. Store it in the gigapress `brands/<slug>.json`
alongside the display name.

## DEPLOY PROCEDURE (per brand)
1. **Take the FINAL brand HTML** — from the gigapress build, or from a published artifact
   (recover it, strip the artifact frame wrapper: keep from `<title>` to before the trailing
   `</body></html>`).
2. **Wrap as a standalone doc + inject head:** `<!doctype html><html lang="en"><head>` with
   `<meta charset>`, `<meta viewport>`, a real `<title>` and `<meta name="description">`, then the
   brand's own `<link>`/`<style>`; `</head><body>` + brand content + `</body></html>`.
   External-embed-free pages (self-contained) render identically hosted or as an artifact.
3. **Write to** `telvergence/<slug>/index.html`. Guard: `assert not os.path.exists(path)` for a NEW
   brand; for an intentional update, republish that exact path only.
4. **Register in the master index** `telvergence/index.html` — add one card linking to the brand
   (name, one-line, `→ telvergence/<slug>/`). The index IS the catalog; every deploy updates it.
5. **Ship via the normal flow:** feature branch → PR → merge to `main` (Cloudflare Pages auto-deploys).
   Do not push straight to main.
6. **VERIFY before handing over the link:**
   - `curl -sI https://<domain>/telvergence/<slug>/` → expect `200` and **no auth redirect** (this is
     the stranger/incognito check — a prospect must reach it logged-out).
   - `X-Robots-Tag: noindex` present.
   - Run `python tools/linkcheck.py` (the existing deploy gate) — no broken links.
   - Only then give the link out.

## MASTER INDEX TEMPLATE (telvergence/index.html)
A dark house-palette catalog listing every brand as a card. Each new deploy appends one card:
```
<a class="brand" href="/telvergence/<slug>/">
  <h3><Display Name></h3><p><one-line positioning></p><span>Open →</span>
</a>
```
Keep it in the same voice/palette as the brand sites (Sora/Hanken/IBM Plex Mono, --void #04070F, cyan,
lime, gold). It is the front door of the whole portfolio.

## RE-HOMING EXISTING BRANDS (migration, non-destructive)
The current live pages (`/pressure/live/`, `/fast/live/`, `/rr/live/`, `/yes/live/`) predate the standard.
Bring them in WITHOUT deleting anything:
- Copy each into `telvergence/<slug>/` (coastalcrown, fastadjusting, restorationroyalties, yeselectrical).
- Leave the old paths in place (never overwrite/delete) — optionally add a one-line redirect stub later.
- Register all four in the master index.

## GIGAPRESS INTEGRATION
- Add a `deploy_brand(slug, html, display, oneliner)` step to the brand-kit `build.py`: wraps the HTML,
  writes `telvergence/<slug>/index.html`, and appends the card to `telvergence/index.html`.
- `brands/<slug>.json` gains `slug`, `display`, `oneliner`, `deployed_url`.
- The linkcheck deploy gate (`tools/linkcheck.py`) already guards broken links — keep it in the flow.

## QA GATES (all must pass before the link is shared)
- [ ] Path is `telvergence/<slug>/` and did not exist before (or is a deliberate update of that path).
- [ ] Standalone doc: doctype/head/body, real title + description, self-contained (no broken embeds).
- [ ] Registered in `telvergence/index.html`.
- [ ] `curl -I` → 200, no login redirect (public-by-link), `X-Robots-Tag: noindex` present.
- [ ] `tools/linkcheck.py` clean.
- [ ] No card numbers, no personal cell, disclaimers intact (for client-demo sites).

## ONE-LINE MENTAL MODEL
> One parent, many peer brands, one address shape: `telvergence/<slug>/`. Build with the gigapress,
> deploy with this skill, verify it opens for a stranger, register it in the index, never overwrite.

## THE SHOWROOM MODEL (telvergence.com)
`telvergence.com` is the **master showroom**; each `telvergence/<slug>/` is a piece of **inventory
embedded within it**. This is the whole point of the universal namespace — consistent, reliable
addresses mean the showroom can present every brand the same way, and new inventory drops in without
changing the pattern.

- **`telvergence/index.html` = the embedded showroom.** Not just a link list — a presentation of the
  inventory. Each card is a live preview of a brand (screenshot or an inline `<iframe>` thumbnail of
  `telvergence/<slug>/`) that opens the full brand site. Because the pages are self-contained and
  `noindex`, they iframe cleanly.
- **Every deploy = one new inventory item in the showroom.** The deploy procedure's step 4 (register
  in the index) is what stocks the shelf. No brand exists in the portfolio until it is in the showroom.
- **telvergence.com is the front door** to that showroom (point it at the same Cloudflare project).
  Restoration Royalties, Coastal Crown, FAST, YES, Branson, and every future client are peers on the
  same shelf — `telvergence.com` › showroom › `telvergence/<slug>/`.
- **Reliability is the feature.** A prospect link, an investor demo, or a sales showroom walk-through
  all resolve to the same predictable shape, every time. Consistency is what makes it look like a
  platform instead of a pile of one-off pages.

## THE DIFFERENTIATOR — consistency IS the competitive advantage
Anyone can build a page. What makes Telvergence a **platform** and not a pile of one-off sites is that
every brand is built, formatted, indexed, and deployed the **same way, every time**. That reliability
is the product. It is the answer to "what makes you different, and why choose your brand over a
competitor": you are not buying a page — you are buying a **guaranteed, repeatable method**.

- **Consistent formatting = trust.** One house system (type scale, palette tokens, section rhythm,
  disclosures, contact block) across every brand. A viewer never has to relearn the interface; the
  hundredth site behaves like the first.
- **Reliable indexing = findability + scale.** One address shape (`telvergence/<slug>/`), one showroom,
  one registration step. Nothing is lost; everything is reachable; new inventory drops in without
  changing the pattern.
- **The infrastructure IS the pitch.** When a competitor ships a website, Telvergence ships a *system*
  that turns any business into a client-generating phone-and-intake machine — repeatably.

This is the **teach-a-man-to-fish** model. Telvergence.com solutions **educate, empower, and equip**:
we hand over the tools, techniques, and technologies so the client owns the capability **for life**,
rather than renting a one-off deliverable that feeds them for a day.

## THE TELVERGENCE MOTTO — 3 T's · 3 E's · 3 C's
Encode these in every brand's collateral and in the showroom copy. Every deploy is a demonstration
of the motto in action:
- **3 T's — Tools · Techniques · Technologies** — what Telvergence provides.
- **3 E's — Educate · Empower · Equip** — what it does for the client (ownership, not dependence).
- **3 C's — Collateral · Content · Communications** — what it produces, backed by **Credentials**,
  the proof/trust layer that makes it credible.

> The site is the **Collateral**; its live intake is the **Communication**; the dashboard is the
> **Content**; and the consistent, reliable system behind all of it is the **Credential**.

## HARD RULE (add to the QA gates)
- [ ] **Formatting consistency:** the brand matches the house system exactly — type scale, palette
  tokens, section rhythm, disclosure/contact blocks. Consistency is not cosmetic; it is the moat.
- [ ] **Indexing consistency:** lives at `telvergence/<slug>/`, registered in the showroom, one
  predictable shape. If it breaks the pattern, it does not ship.
