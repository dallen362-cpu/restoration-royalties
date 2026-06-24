# Migration Runbook — Cloudflare Pages + Access (demos under telvergence.com)

Goal: every brand site served as a **public demo** at a `*.telvergence.com` subdomain,
sources in **private** repos, with **bot/scraper deterrence** and an optional **demo gate**.

> What I prepared in-repo (this branch): `templates/_headers` and `templates/robots.txt`
> (drop one copy into each site's root). Everything below is done in **your** Cloudflare +
> GitHub + DNS accounts — it can't be done from this session.

## Proposed subdomain map

| Subdomain | Source repo | Notes |
|---|---|---|
| `telvergence.com` (apex) | `telvergence` | Main marketing site — **keep indexable**, NO robots/noindex. |
| `stormcrew.telvergence.com` | `stormcrew` | Storm dispatch demo. |
| `crewcommand.telvergence.com` | `crewcommand1` | Canonical CrewCommand. Retire `crewcommand` (stub) + `crewcommand2` (dupe). |
| `restoration.telvergence.com` | `restoration-royalties` | Restoration Royalty demo. |
| `wellness.telvergence.com` | `bweverly-wicks` | Canonical wellness. Retire `Body-Wellness-Connection` (minimal dupe). |
| `weather.telvergence.com` | `Predictive-Weather-Intelligence` | Predictive Weather demo. |

## Order of operations (avoids downtime)

1. **Cloudflare account + domain.** Add `telvergence.com` to Cloudflare; switch its
   nameservers at your registrar to the ones Cloudflare assigns. (Currently telvergence.com
   serves from GitHub Pages — leave that DNS in place until step 5.)
2. **Connect repos to Cloudflare Pages.** For each repo above, create a Pages project
   (Workers & Pages → Create → Pages → Connect to Git). Build settings for these static
   sites: **Framework preset = None**, **Build command = (blank)**, **Output dir = /**.
3. **Add the protection files.** Copy `templates/_headers` and `templates/robots.txt` into
   the **root of each brand repo** (NOT the main telvergence marketing site). Commit.
4. **Make brand repos private.** GitHub → each repo → Settings → General → Change visibility
   → Private. Cloudflare Pages keeps deploying from private repos. This removes the public
   `*.github.io` URLs (intended).
5. **Custom subdomains.** In each Pages project → Custom domains → add its
   `*.telvergence.com` subdomain. Cloudflare auto-creates the CNAME + TLS cert. Repeat the
   apex (`telvergence.com`) for the main site's Pages project, then remove the old GitHub
   Pages A/CNAME records.
6. **Bot/scrape deterrence (per zone, applies to all subdomains).**
   - Security → Bots → enable **Bot Fight Mode**.
   - Security → WAF → custom rule: challenge/block known scraper user-agents and high-rate
     IPs (e.g. `(http.user_agent contains "python-requests") or (http.user_agent contains "scrapy")` → Managed Challenge).
   - Scrape Shield → enable **Email Obfuscation** + **Hotlink Protection**.
7. **Optional demo gate (Cloudflare Access).** Zero Trust → Access → Applications → add a
   self-hosted app per demo subdomain → policy = allow specific emails or one-time PIN.
   Gives you "public for invited demo viewers" without exposing to the open web.
8. **Verify** each subdomain loads, `_headers`/robots are served (check response headers),
   and the old `*.github.io` URLs are gone. Update `../SITES.md` with the new URLs.

## Reminders
- Cloudflare free tier covers Pages, Bot Fight Mode, WAF custom rules, and Access (up to 50 users).
- A rendered public demo is still copyable from the browser — these steps **deter**, not prevent.
- If you'd rather keep the `*.github.io` URLs alive too, skip step 4 (repos stay public).
