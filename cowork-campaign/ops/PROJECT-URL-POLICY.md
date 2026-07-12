# 🔒 TELVERGENCE — Project URL & Hosting Policy (STANDING RULE)

**Effective going forward, this rule is mandatory for _every_ project — no exceptions.**

Every project (rendition, app, demo, brand, campaign) MUST ship with its **own unique, secured, anonymous, protected, fully-functioning URL** — and MUST also appear in the **Showroom** under its site name, `name.telvergence.com`.

No project may be published under a personal or repository-revealing URL again.

---

## 1) The four requirements every project URL must meet
| # | Requirement | What it means |
|---|---|---|
| 1 | **Unique** | Its own dedicated address — one project, one URL. Not a sub-folder buried under another project's link. |
| 2 | **Secured** | Access-controlled: a login/gate/portal in front. Not open to the public web by default. |
| 3 | **Anonymous** | The URL reveals **nothing** about the owner or the tooling — no personal name, no GitHub handle, no `github.io`, no repo path. |
| 4 | **Protected** | The **source code is not downloadable**. Visitors get the running site, never the files behind it. |

Plus: it must be **fully functioning** (a real live site, not a placeholder) and **listed in the Showroom** as `name.telvergence.com`.

---

## 2) ❌ BANNED — what we are moving away from and why
The current public path is **prohibited for anything customer- or investor-facing going forward:**

```
https://dallen362-cpu.github.io/restoration-royalties/...   ← DO NOT SHARE
```

It violates every requirement above:
- **Not anonymous** — `dallen362-cpu` exposes the personal account (David Allen / d-allen-362); `github.io` announces it's hosted on GitHub.
- **Not protected** — it sits on a **public GitHub repository**, so anyone who sees the URL can open the repo and **download the entire source code for free**. A secret path or a client-side password does NOT stop this; the files are still public.
- **Not truly secured** — client-side gates (password in JavaScript) are obscurity, not security. The protected content is one "View Source" away.

> Bottom line: a private folder path on a public repo is **not** private. The repo itself is the leak.

---

## 3) ✅ THE STANDARD STACK (how we actually deliver all four)
Every new project is published on this stack:

```
  PRIVATE repo  →  Cloudflare Pages  →  name.telvergence.com  →  Cloudflare Access (login gate)
     │                  │                      │                        │
  source hidden    no github.io          anonymous, branded        real per-person auth
  (Requirement 4)  (Requirement 3)       (Requirement 1 + Showroom) (Requirement 2)
```

**Why this stack:**
- **Private repository** → source code is no longer public. Requirement 4 (Protected) is satisfied at the root — the only real way to stop free source downloads.
- **Cloudflare Pages** (builds from the private repo) → serves the site with **no `*.github.io` address** and no exposed repo. Requirement 3 (Anonymous).
- **`name.telvergence.com`** custom subdomain → unique, branded, owner-neutral address; this exact string is the Showroom label. Requirement 1 + Showroom.
- **Cloudflare Access** → email/OTP or password login enforced **at the edge, before the page loads** — real authentication, not client-side. Requirement 2 (Secured). Ties into BOSS / ViciDial SSO later.

> Interim acceptable step (until Cloudflare is wired): keep the repo **private** and put a custom `name.telvergence.com` domain in front. That removes the personal handle and the free-source-download exposure even before Access is live. A public repo is never acceptable for a shared project.

---

## 4) 📋 Per-project checklist (run for EVERY new project)
- [ ] Project built and **fully functioning**.
- [ ] Lives in a **private** repo (or private project space) — source not public.
- [ ] Assigned its **own** `name.telvergence.com` subdomain (unique, no collision).
- [ ] Served via Cloudflare Pages (or equivalent) — **no `github.io`, no personal handle, no repo path** anywhere in the URL.
- [ ] **Access gate** in front (Cloudflare Access / real login), not just a client-side password.
- [ ] DNS: `CNAME  name → <cloudflare-pages-target>` on telvergence.com.
- [ ] **Added to the Showroom** as `name.telvergence.com` (the site-name label).
- [ ] Old public/personal URL for this project **retired / 404'd**.

---

## 5) Naming
- Format: `name.telvergence.com`, where `name` = the project's site name (e.g. `restorationroyalties`, `stormdispatch`, `wintv`, `mashupstudio`).
- The subdomain string **is** the Showroom entry label. One canonical name per project.
- See `DOMAINS.md` for the running subdomain map and DNS quick-reference.

---

## 6) Migration of what already exists
Everything currently under `dallen362-cpu.github.io/restoration-royalties/...` is **legacy** and must be migrated to the standard stack before further external sharing:
1. Move the repo to **private** (single biggest fix — kills the free-source-download problem immediately).
2. Stand up **Cloudflare Pages** from the private repo.
3. Point each project's **`name.telvergence.com`** at it and add **Cloudflare Access**.
4. Update the Showroom + any shared links to the new anonymous URLs.
5. Retire the old public links.

*This document is the rule. If a project can't meet all four requirements, it doesn't get shared yet.*
