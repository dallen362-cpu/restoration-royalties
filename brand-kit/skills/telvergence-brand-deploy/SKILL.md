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

## THE HANDOFF STANDARD (converging technologies — install in every gigapress build)
When a deliverable must land in a repo/venue the producing session cannot reach, NEVER rely on
attachments or paste. The standard is the **public raw-URL handoff**:
1. Commit the finished artifact(s) to a reachable public repo under `handoff/` (new paths only).
2. Verify each file at its `raw.githubusercontent.com/<owner>/<repo>/main/...` URL (200 + byte count + content marker).
3. Hand the executing session a DETERMINISTIC prompt: "fetch these exact URLs, use bytes verbatim —
   do not edit or improve — one commit, then verify these exact live markers."
4. The producing session independently re-verifies the live result before any outbound comms reference it.
Why it's the offspring of converging technologies: the gigapress builds it, GitHub serves it as a
public artery, any session anywhere applies it byte-perfectly, and the live site is the proof.
Every future cross-repo/cross-session deploy uses this pattern. No lost files, no drift, no trust gaps.

## THE VOICE STANDARD (mandatory on every gigapress output)
Every brand/client page the gigapress produces ships with BOTH voice modules — no exceptions:
1. **Read-aloud** — an audio button/icon on the page so any visitor can have the content read to
   them (speechSynthesis with the quality-ranked best-voice picker: prefer Google US English /
   Natural / Neural / Enhanced voices; en-US first).
2. **Line Concierge** — the two-way voice assistant (mic in via SpeechRecognition, best-voice out),
   loaded with that brand's knowledge file so a visitor can hold an open verbal back-and-forth
   about ANY area of the site. Scoped `lc-*` styles, honest "live demo assistant" labeling,
   `prefers-reduced-motion` safe, zero external dependencies. Reference implementation lives on
   telvergence/branson/ and all four /live/ brand pages.

## THE CLIENT-FILE + SMART-DID LIFECYCLE (the product spec behind the demo)
The concierge demo previews the full product. The production lifecycle, standard for every client:
1. **Converse** — visitor talks to the site (any section, voice or text). Every exchange is
   **documented into their client file** — the same file the case/CRM dashboard tracks.
2. **Onboard → pay → accept** — self-service intake, payment, and acceptance on the page.
3. **Smart-DID issued & activated LIVE** — on acceptance, the system app assigns the client their
   own Smart-DID: a dedicated, encrypted direct line that *knows their file and persona*, rings
   straight to their team, and (legal vertical) is built for secure live video — remote hearings,
   depositions, conferences. The new gold standard: confidentiality by design on a number that is
   theirs alone.
4. **Auto-SMS triggering** — activation fires the welcome SMS from their new line; ongoing
   updates (bookings, documents, milestones) trigger compliant SMS to/from that same DID
   (TCPA prior-express-written-consent captured at intake — the SMS TMCP lineage).
5. Every later conversation — web, voice, SMS — appends to the same client file, attached to
   that DID. One number, one file, one relationship.
HONESTY RULE for demos: until a real LLM/API key and telephony backend are wired, label the
on-page assistant as a demo drawing from the brand's knowledge file, and present the lifecycle
as the platform capability it demonstrates. Never imply live encryption/compliance certifications
that are not yet provisioned. (LLM upgrade path: Anthropic/xAI API key + small proxy — paid tier.)

## THE FRONT-END DOCTRINE (every build, no exceptions)
A gigapress output is never a brochure. Every site ships as a **functioning app**:
- **It talks** — conversational voice concierge (mic in, best-voice out), loaded with the brand's knowledge.
- **It's alive** — real-time UI: live intake floor / stats band / animated automations visibly solving the
  industry's real problem (calls answered, qualified, booked, tracked).
- **Two tools, in their face** — CLIENT side: self-service booking + voice conversation, on the page.
  ADMIN side: the working dashboard demo (case/job file, documents, consent, audit log).
- **The KPI of a build is the reaction**: "How is that possible — and how much do I pay to have that
  customized for MY business right now?" If a build can't provoke that, it isn't done. (Reference:
  the Branson demo — first-adopter reaction achieved across an attorney audience.)

## DRINK OUR OWN CHAMPAGNE (telvergence.com = reference implementation)
telvergence.com runs the very system it sells: talking cover ("Your Business, Answering Itself."),
the onboarding app demo (business → territory → Smart-DID → AI live → booked-to-CRM), scheduling/contact
as the single CTA, and the dash customization demonstrated with TELVERGENCE'S OWN content. Perfect the
system there first; every improvement backports into the press for all brands.

## DISCOVERY DOCTRINE — REGISTRY-FIRST, AI-FIRST (old-school SEO is legacy)
Every Smart-DID ships **registry-complete** on activation:
1. **CNAM registry** — the brand name embedded in caller-ID (CNAM) so every outbound ring is branded.
2. **411 / e-411 + online business directories** — the number and NAP listed in directory assistance
   and the online directories (run the listing-foundation skill: GBP + Tier-1 citations + reviews link).
3. **Live, provable, structured pages** — the gigapress site itself, schema-clean.
WHY: buyers increasingly ask their AI assistant, not a search page. AI answers resolve from structured,
verified sources — telecom registries, directory data, live pages. Registry-clean numbers + live sites are
what a subscriber's AI finds and CALLS. Pitch it as first-adopter positioning: "your customers' AI will
find you and call this number." Optimize for answer engines (AEO); treat classic SEO as the legacy channel.
(Honesty rule: state this as positioning and design intent — no invented traffic/ranking statistics.)

## THE SHELF (industry models → the assembly line)
Build each industry model ONCE, prove it, shelve it:
legal = Branson · restoration = Restoration Royalties · adjusting = FAST · pressure = Coastal Crown ·
electrical = YES · (next industries join the shelf the same way).
A new client is a SWAP of the three C's — minutes, not weeks:
- **Content** — industry copy, offers, FAQ/knowledge file for the concierge.
- **Collateral** — name, palette, logo, vanity scheme, packet (dark, battle-cry splash, two-tools strip).
- **Communications credentials** — Smart-DIDs (rate-center scored), CNAM, e-411/directories, email,
  booking calendar, CRM hookup, SMS consent capture.
SALES MOTION: show the shelf model live → provoke the reaction → onboard in the app → provision + registry-embed
→ activated Smart-DID sends the welcome text. That is the gigapress AI Mashup Telvergence system.

## VOICE CAPABILITY STANDARD — MAXIMUM-TIER PARITY (claims doctrine)
Every capability claim about the Telvergence voice agent quotes what the frontier speech-to-speech
stack delivers AT ITS MAXIMUM SUBSCRIPTION TIER — presented as native Telvergence capability, and the
underlying provider is NEVER named on any page, packet, or email (provider-agnostic rule is absolute).
The canonical claim set (each item traceable to the provider's primary documentation — re-verify against
the provider docs whenever the frontier moves, and update every surface together):
1. **True speech-to-speech** — no transcribe-then-reply pipeline; sub-second turn-taking.
2. **Natural interruption** — speak over it and it stops, listens, and adjusts (live barge-in).
3. **25 languages** — understands 25 languages; answers in the caller's own.
4. **Expressive delivery** — laughter, whispers, pauses on cue; tone that matches the moment.
5. **Brand-cloned voice** — a custom voice cloned for the brand from a short reference recording.
6. **Telephony-native** — carrier-grade codecs (μ-law-class); built for real phone lines, not just web widgets.
7. **Acts while it talks** — mid-call tool execution: lookups, availability, booking before the hangup.
8. **Word-perfect records** — word-level timestamps, speaker-separated transcripts, filed to the CRM.
RULES: quote the capability, never the provider · never claim past the max tier's documented feature set ·
no invented figures (latency/language counts come from provider docs, nothing else) · when the provider's
max tier gains a capability, all brand pages inherit the upgraded claim set in the next press run.

## PRICING DOCTRINE — UCaaS, PER ANSWERED LINE (never per seat)
Value metric: the answered line, priced PER BRAND — never per seat (per-seat is the legacy-UCaaS
frame; our AI front office replaces the seats). All plans month-to-month, 30-day guarantee. The entry
tier equals the price the live network actually pays ($229.50) — the ladder is PROVABLE, not aspirational.
THE LADDER (good-better-best + custom, "Most Popular" on the tier we want sold):
- **Smart Line — $229.50/mo per brand**: 1 rate-center Smart-DID (vanity search incl.) · 24/7
  speech-to-speech answering (caller's language) · booking + SMS confirms + welcome text · CNAM +
  411/e-411 registries · speaker-separated transcripts + live dashboard · E911 + STIR/SHAKEN.
- **Front Office — $499/mo per brand** (MOST POPULAR): + up to 3 Smart-DIDs · brand-cloned voice ·
  mid-call actions (booked before hangup) · CRM backfill · follow-up sequences + attribution ·
  app onboarding + admin command dashboard.
- **Market Command — $999/mo per market**: + up to 10 Smart-DIDs on AI-scored rate centers · premium
  vanity acquisition · storm/event dispatch · cross-brand referral routing · quarterly rescore ·
  priority provisioning.
- **Network / Empire — from $2,499/mo, custom**: multi-market networks · white-label (client becomes
  the provider) · private encrypted client lines (legal) · API · dedicated manager.
FEES: activation $499/brand (number engineering + registry embed + voice clone + onboarding) — WAIVED
on annual (annual = pay 10 months, get 12). Legacy-system white-glove migration $1,499.
RULES: every brand page shows the same ladder · the concierge KB answers pricing out loud with the
same numbers · price changes update page + KB + packet together · discounts are structural (annual,
founding-client) never ad-hoc · the entry tier must always equal a price a real client actually pays.

## GLOBAL + OWN-NUMBER ADDENDA (to the Voice Capability Standard)
9. **Your number, not theirs** — the voice engine answers on the business's OWN Smart-DIDs
   (bring-your-own-number telephony). The number stays the client's digital asset; the intelligence
   rides on it. Never pitch a vendor-rented line.
10. **Global dial tone** — wholesale carrier-grade agreements stand up instant local numbers in
   markets ACROSS THE GLOBE (in-country presence in minutes). Paired with 25-languages-on-the-fly,
   one platform serves any market: "every numbering plan on Earth has its 305."
HONESTY: say "markets across the globe / worldwide" — never the absolute "every country" (some
countries restrict DID issuance; the softened phrasing is unfalsifiable and loses no thunder).
11. **Our own dialer core (outbound muscle)** — aside from the AI voice engine, the platform runs
   OUR OWN predictive-dialer / contact-center core (Vici-class, operated and hardened since 2019 —
   the BOSS lineage). Public wording: "our own predictive-dialer core" — NEVER name the dialer
   software on pages (same discipline as the AI provider). ALL outbound claims are CONSENT-BASED
   wording (TCPA discipline): follow-ups, reactivation, review requests, storm alerts to existing
   customers/consented lists — never cold-blast language. The flywheel sentence: the Smart-DID
   answers everything inbound; the dialer works everything outbound; ONE owned number does both.
