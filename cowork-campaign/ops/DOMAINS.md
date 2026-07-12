# TELVERGENCE — Domains

> 📌 **Standing rule:** every project must have its own **unique, secured, anonymous, protected** URL under `name.telvergence.com` (no personal/GitHub-handle links). See **[PROJECT-URL-POLICY.md](./PROJECT-URL-POLICY.md)**.

## Brand domains to secure (GoDaddy)
| Domain | Purpose | Status |
|--------|---------|--------|
| **restorationroyalties.com** | Restoration Royalties brand (plural — corrected everywhere) | to register at GoDaddy |
| **stormdispatch.com** | Storm Dispatch / WIN live storm-dispatch app | to register — ⚠️ confirm spelling (you wrote "strong dispatch.com") |
| **dominatefromthe.cloud** | Campaign / rallying domain | to register — ⚠️ confirm spelling (you wrote "dominiatefromthe.cloud") |
| telvergence.com | Existing platform (back end + pricing) — preserved, live | owned |

> ⚠️ Please confirm the exact spelling of the two flagged domains before purchase so we register the right ones.

## Subdomain convention (name.telvergence.com)
Every rendition lives at its own subdomain. Current map:
- demo · deck · activate · platform · revenue · mashupstudio · **restorationroyalties** · 3d · map · wintv · smoke · showroom
- archive/off-the-shelf: app · partner · grid · backoffice · dashboard · overview · hub · agreement · wintvlaunch · gate · legacy

## DNS quick-reference (when ready)
For each subdomain on **telvergence.com** (GoDaddy → DNS → Add):
- Type `CNAME` · Name `<sub>` · Value `dallen362-cpu.github.io` · TTL 600

For a **root** brand domain (e.g. restorationroyalties.com) pointing at the site, use GitHub Pages' four A records (185.199.108–111.153) + a `www` CNAME, or (recommended for production) put it behind **Cloudflare** for access control.

## Production security (in progress)
1. ✅ Links rotated behind one secret master path; public front = locked gate.
2. ⬜ Make the GitHub repo **private** (hides source) — **required** by PROJECT-URL-POLICY (a public repo lets anyone download the source for free; a secret path does not stop that).
3. ⬜ **Cloudflare Access** (email login gate) on the production domain — true sole-control.
4. ⬜ Retire all `dallen362-cpu.github.io/...` links once projects are migrated to `name.telvergence.com` on the private-repo → Cloudflare stack.
