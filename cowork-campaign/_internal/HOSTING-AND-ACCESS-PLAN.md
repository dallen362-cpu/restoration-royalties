# Hosting & Access Plan — public demo, protected source, served under telvergence.com

> **Reality check (important):** A public web page **cannot be made uncopyable.**
> Whatever renders in a visitor's browser (HTML/CSS/JS) is downloadable via view-source,
> dev tools, "Save As", or a scraper. Right-click disable / JS obfuscation are trivially
> bypassed and damage SEO + demo UX. So the achievable goal is **(a) protect the source
> code** (repos can't be cloned), **(b) keep a viewable public demo**, **(c) serve it only
> under telvergence.com**, and **(d) deter casual copying/scraping** — not "impossible to copy."

## Goal restated
1. Brand sites remain **publicly viewable** for demos.
2. Reachable **only through telvergence.com** as sub-sites (subdomain or subpath).
3. **Source repos not cloneable/browsable** by the public.
4. Casual copying and scraping **deterred**.

## Option A — Cloudflare Pages + Access (recommended)
- Move hosting from GitHub Pages to **Cloudflare Pages**, deploying from **private** GitHub repos.
- Serve each brand at a subdomain of telvergence.com: `stormcrew.telvergence.com`, `crewcommand.telvergence.com`, etc. (or subpaths `telvergence.com/stormcrew`).
- Add **Cloudflare Access** for an optional email/PIN "demo gate," **bot/scraper rules**, and **hotlink protection**.
- **Pros:** source fully private; public demo preserved; strongest scraping deterrent; free tier covers it; one dashboard for all brands.
- **Cons:** one-time migration + DNS change; sites move off `*.github.io`.

## Option B — GitHub monorepo under telvergence.com
- Consolidate every brand site into the **`telvergence`** repo as subfolders, served at `telvergence.com/<brand>/`.
- Make the other brand repos **private** (their `github.io` URLs go offline).
- **Pros:** stays on GitHub; single canonical domain; other repos no longer browsable.
- **Cons:** the one Pages repo must stay **public** on free plan (its source is still viewable) unless you buy **GitHub Pro/Team** for private-repo Pages; no real anti-scrape layer.

## Option C — GitHub Pages subdomains (URL consolidation only)
- Give each existing repo a `CNAME` so it serves at `brand.telvergence.com`.
- **Pros:** quickest; everything lives under telvergence.com.
- **Cons:** repos stay **public** (no source protection); no anti-copy benefit. Consolidates branding only.

## Recommendation
**Option A.** It's the only path that delivers private source + public demo + telvergence.com-only
sub-sites + real scraping deterrence, and the free tier covers it. Option B is the best
GitHub-only compromise; Option C is cosmetic (URLs only).

## What I can do from here vs. what needs you
- I **can**: prepare the repo structure (monorepo subfolders / per-brand `CNAME` files / Cloudflare build config) and commit it.
- I **cannot** (needs you / out of this session's scope): change repo **visibility** to private, edit **DNS**, or configure Cloudflare/GitHub paid plans. These are outward-facing and irreversible-ish, so they need your explicit go-ahead.

## Note on "uncopyable"
The most we can layer on a public demo: Cloudflare Bot Fight Mode + custom WAF rules,
hotlink protection, `X-Robots-Tag: noindex` (keeps it out of search/cache), Access gating
so only invited demo viewers reach it, and minified/bundled assets. These **deter**, they
do not **prevent**, copying. Recommended to set expectations with stakeholders accordingly.
