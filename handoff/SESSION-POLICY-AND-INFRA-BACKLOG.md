# SESSION-TYPE POLICY + DEFERRED INFRASTRUCTURE BACKLOG
**David + Claude · 2026-09-02 · standing policy (additive; never overrides the set-in-stone mechanism)**

## The policy — two kinds of work, kept strictly separate

### A. OUTPUT sessions (like this one — safe, additive, run freely)
**Allowed:** client/brand builds on the SET-IN-STONE gigapress; gold gigapress outputs; template **token
additions with defaults** (never removing or altering existing behavior); research + knowledge-base assets;
docs; showroom / inventory / boneyard registration; git commits + merges to
`dallen362-cpu/restoration-royalties` (content auto-deploys through the EXISTING Cloudflare Pages project).
Everything here is **additive and git-reversible**. **No configuration changes.**

### B. INFRASTRUCTURE sessions (dedicated, scheduled — only on mutual "go", at Excaliber)
**Required for anything that changes platform CONFIG or crosses a security boundary:**
- **GitHub:** repo visibility, new / private repos, Pages source, branch protection, history rewrite/scrub.
- **Cloudflare:** new Pages projects, custom domains, DNS cutover, environment variables / **secrets**,
  headers / Access policies.
- **Cross-repo deploys:** the telvergence.com repo, the FAST repo (`fast---adjusting---service`).
- **Anything involving credentials** (Vitelity, TTS, API keys) — secrets never pass through a session.
**Safeguards:** restore-point tag first → stage + verify → David present → verify live → mutual sign-off.
**Never interleaved with fast output work.**

## Why (my recommendation, plainly)
Output work is additive and reversible through git, so it is safe to move fast and often. Infra/config work
is the **hard-to-reverse, security-sensitive** kind — it can break a live site, expose data, or misconfigure
headers/secrets. That work should be **deliberate, isolated, restore-pointed, and done with your eyes on it**.
Keeping them apart is what protects the set-in-stone mechanism and the **no-data-leakage** mission. This is
the professional standard and I recommend we hold to it.

## DEFERRED INFRA BACKLOG (do in a dedicated infra session, on mutual go)
1. **telvergence.com** — deploy the staged 14-language standardization (separate repo; cross-repo).
2. **FAST** — deploy the 🔊 read-aloud button (separate repo; needs repo authorization).
3. **Vitelity / Cloudflare** — set `VITELITY_LOGIN`/`PASS` + `CALLBACK_ALERT_TO`/`FROM` (+ TTS key) to light
   up click-to-call / neural voice. (David-side, Cloudflare dashboard; keys never through a session.)
4. **Half a Cow go-live** (if elected a real client) — register `halfacow.com`, its own Cloudflare Pages
   project, `contact@`, and a real Smart-DID block. Until then it stays the concept at `/halfacow/`.
   **4b. telvergence.com/halfacow/ (David's preferred URL, 2026-09-02):** cross-repo additive copy — staged in
   `handoff/HALFACOW-TELVERGENCE-COM-DEPLOY.md`; run only in an infra session. Meanwhile live at
   restorationroyalties.com/halfacow/ (GitHub branches `restore/pre-halfacow-2026-09-02` = foundation, `release/halfacow-nfl-evolution-v1` = build; tags don't survive the proxy).
5. **Private store for proprietary docs** — a PRIVATE repo / Drive index for the BOSS / MyFiPro / Genesis
   license agreements + Genesis Capital material (referenced by name; never in the public repo).
6. **Kenneth data-boundary remediation** — history scrub of the two legacy commits that reference the name,
   and keep all personal/legal material out of the public repo (security/infra; mutual go).
7. **Durable gold-template re-skins** — tokenize the WIN-module / ownership-status labels + add the
   Starbucks-courtesy module (a template session; additive, with defaults so existing brands don't change).
8. **Cloudflare header / security hardening** on any new project created above.

## Right now (this output session)
Continue ONLY: the **Half a Cow** client output to the max on the existing gigapress, plus the specified
augmentations (city-grid vanity inventory, the WIN/dispatch/NPA·NXX mechanisms). **No infra changes.**
