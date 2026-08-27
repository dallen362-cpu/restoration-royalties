#!/usr/bin/env python3
"""
Telvergence brand-site builder.

ONE template, one JSON per brand. This is the standard: every new brand is a
data file, never a hand-forked HTML copy.

    python3 brand-kit/build.py                 # build every brand in brands/
    python3 brand-kit/build.py fast pressure   # build only these slugs

Writes <slug>/index.html at the repo root.
"""
import json, os, sys, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRANDS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'brands')


def e(s):
    return html.escape(str(s), quote=True)


# ---------------------------------------------------------------- components
def did_grid(b):
    out = []
    for i, d in enumerate(b['dids'], 1):
        vn = d.get('vn', '')
        pend = d.get('pending', False)
        pres = d.get('presents', False)
        if pres:
            vncls = 'vn presents'
            vntxt = '<em>presents</em> ' + e(vn)
        else:
            vncls = 'vn pending' if pend else 'vn'
            vntxt = e(vn) + (' <em>· pending assignment</em>' if pend else '')
        out.append(
            f'      <div class="did"><span class="num">{i}</span>'
            f'<h4>{e(d["h"])}</h4>'
            f'<span class="{vncls}">{vntxt}</span>'
            f'<p>{e(d["p"])}</p></div>')
    return '\n'.join(out)


def bullets(items, ):
    return '\n'.join(f'          <li>{i}</li>' for i in items)


def brain_row(chips):
    parts = []
    for i, c in enumerate(chips):
        cls = 'chip hot' if c.get('hot') else 'chip'
        parts.append(f'<span class="{cls}">{e(c["t"])}</span>')
        if i < len(chips) - 1:
            parts.append('<span class="arrow">→</span>')
    return '\n        '.join(parts)


def pillars(items):
    return '\n'.join(
        f'      <div class="p"><div class="n">{e(p["n"])}</div><p>{p["p"]}</p></div>'
        for p in items)


def chips(items):
    return ''.join(f'<span>{e(c)}</span>' for c in items)


def tiers(rows):
    out = []
    for r in rows:
        cls = ' class="rec"' if r.get('rec') else ''
        note = ' <span style="font-size:11px">recommended</span>' if r.get('rec') else ''
        price = f'<b>{e(r["price"])}</b>' if r.get('rec') else e(r['price'])
        out.append(f'      <tr{cls}><td><b>{e(r["name"])}</b>{e(r.get("sub",""))}{note}</td><td>{price}</td></tr>')
    return '\n'.join(out)


def stack(layers):
    return '\n'.join(
        f'      <div class="layer"><span class="ln">{i}</span>'
        f'<h4>{e(l["h"])} <span class="tech">{e(l["tech"])}</span></h4>'
        f'<p>{e(l["p"])}</p></div>'
        for i, l in enumerate(layers, 1))


def kpi_tiles(items):
    return '\n'.join(
        f'        <div class="ec tl"><div class="k {t.get("c","cy")}">{e(t["k"])}</div>'
        f'<div class="l">{e(t["l"])}</div></div>' for t in items)


def ctrl_chips(items):
    return '\n          '.join(f'<span class="ctl">{e(c)}</span>' for c in items)


def winnet(b):
    net = b.get('winnet', [])
    if not net:
        return ''
    cards = []
    for n in net:
        here = ' here' if n['slug'] == b['slug'] else ''
        suffix = ' · You are here' if n['slug'] == b['slug'] else ''
        cards.append(
            f'    <a class="wc{here}" href="/{n["slug"]}/"><div class="t">{e(n["t"])}{suffix}</div>'
            f'<div class="s">{e(n["s"])}</div></a>')
    return f'''
<div class="winnet wrap">
  <div class="wb">🔗 {e(b.get("winnetBadge","TELVERGENCE SUB-NETWORK"))}</div>
  <h3>{e(b.get("winnetH","Brands that share one network."))}</h3>
  <p class="wp">{b.get("winnetP","")}</p>
  <div class="wr">
{chr(10).join(cards)}
  </div>
  <p class="prov"><a href="/hub/">↗ Sub-Network hub</a> · <a href="/plan/">Master plan</a> · Powered by <b>THE WEATHER INTELLIGENCE NETWORK</b>.</p>
</div>'''


def command_center(b):
    cc = b.get('commandCenter')
    if not cc:
        return ''
    return f'''
  <section>
    <h2>{e(cc["h2"])}</h2>
    <div class="cc">
      <div class="cchead">
        <span class="ccname">◉ {e(b["brandName"])} · Demo</span>
        <span class="cclive"><span class="dot"></span>ILLUSTRATIVE</span>
      </div>
      <div class="cchero">
        <div class="cclabel">{e(cc["heroLabel"])}</div>
        <div class="ccbig">{e(cc["heroValue"])}</div>
      </div>
      <div class="ccgrid">
{kpi_tiles(cc["tiles"])}
      </div>
      <div class="ccctrls">
        <div class="cclabel">Live controls — change anything instantly</div>
        <div class="ctlrow">
          {ctrl_chips(cc["controls"])}
        </div>
      </div>
    </div>
    <p class="ccnote">{cc["note"]}</p>
    <p class="fineprint">Illustrative demo figures for a {e(cc.get("vertical","campaign"))} campaign — not actual client results. Your dashboard shows your real numbers.</p>
  </section>'''


def refer_earn(b):
    if b.get('_noRefer'):
        return ''
    r = b.get('referEarn')
    if not r:
        return ''
    return f'''
  <section>
    <h2>Grow beyond your own {e(r["unit"])} — refer &amp; earn</h2>
    <p class="lead">Every card the app gives you can be handed to another {e(r["peer"])}. They text to get their own {b["lineCount"]}-line grid — and you earn. A network that pays you to grow it.</p>
    <div class="pillars">
      <div class="p"><div class="n">Refer in a text</div><p>Hand your digital card to a peer; they text Telvergence and a few SMS later their own Smart-DID grid is live — and you collect a <b>referral bonus + overrides</b>.</p></div>
      <div class="p"><div class="n">Overflow to you</div><p>When our operator bank hits capacity, overflow {e(r["unit"])} calls route to <b>your</b> mobile — extra business you'd never have gotten.</p></div>
      <div class="p"><div class="n">Own your brand</div><p>Work your way up to your <b>own white-labeled brand</b> for a one-time <b>$25K</b> — a turnkey brand on a network that's already running.</p></div>
    </div>
    <div class="ladder">
      <span class="rung">Free agent</span><span class="sep">→</span>
      <span class="rung">Distributor · overrides</span><span class="sep">→</span>
      <span class="rung gold">Own white-label · $25K</span>
    </div>
    <p class="fineprint">Referral/override earnings vary and are not guaranteed; program subject to its terms and applicable FTC/marketing rules.</p>
  </section>'''


def service_map(b):
    m = b.get('map')
    if not m:
        return ''
    return f'''
  <section>
    <h2>{e(m["h2"])}</h2>
    <div class="mapwrap">
      <div class="mapfallback">🗺️ {e(m["fallback"]).replace("&lt;br&gt;","<br>")}</div>
      <iframe title="{e(m["title"])}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q={e(m["q"])}&amp;z={m.get("z",8)}&amp;output=embed"></iframe>
    </div>
    <p class="mapnote">{m["note"]}</p>
  </section>'''


# ---------------------------------------------------------------- page
def compare(b):
    rows = b.get('compareRows')
    if not rows:
        return ''
    body = ''.join(
        '<div class="cmpr">'
        f'<div class="cmpd">{e(r["d"])}</div>'
        f'<div class="cmpo"><span class="cmpt bad">✕ Old way</span><p>{e(r["old"])}</p></div>'
        f'<div class="cmpn"><span class="cmpt good">✓ Telvergence</span><p>{e(r["new"])}</p></div>'
        '</div>'
        for r in rows)
    style = (
        "<style>"
        ".cmphead,.cmpr{display:grid;grid-template-columns:150px 1fr 1fr;gap:12px;align-items:stretch}"
        ".cmphead>div{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--faint);padding:6px 2px;font-weight:700}"
        ".cmpr{border-top:1px solid var(--line);padding:12px 0}"
        ".cmpd{font-size:13.5px;color:var(--ink);font-weight:600;align-self:center}"
        ".cmpo,.cmpn{border-radius:11px;padding:11px 13px}"
        ".cmpo{background:rgba(255,90,80,.06);border:1px solid rgba(255,90,80,.22)}"
        ".cmpn{background:rgba(62,240,160,.06);border:1px solid rgba(62,240,160,.3)}"
        ".cmpt{font-size:10.5px;font-weight:800;letter-spacing:.04em}"
        ".cmpt.bad{color:#ff8a7a}.cmpt.good{color:var(--lime)}"
        ".cmpo p{color:var(--muted);font-size:13px;margin-top:5px}"
        ".cmpn p{color:var(--ink);font-size:13px;margin-top:5px}"
        ".cmppunch{margin-top:16px;border-left:3px solid var(--accent);background:rgba(42,212,240,.06);border-radius:10px;padding:14px 16px;font-size:15px;color:var(--ink)}"
        "@media(max-width:720px){.cmphead{display:none}.cmpr{grid-template-columns:1fr}.cmpd{font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--faint)}}"
        "</style>")
    head = ('<div class="cmphead"><div>&nbsp;</div>'
            "<div>Angie's List · Slack + Twilio · generic SaaS</div>"
            "<div>Telvergence</div></div>")
    badge = e(b.get("compareBadge", "Old way vs Telvergence"))
    h = e(b.get("compareH", "The old way vs the Telvergence way."))
    punch = b.get("comparePunch", "")
    return (
        '\n  <section>\n'
        f'    <div class="wb" style="color:var(--gold);border:1px solid rgba(255,194,75,.4);display:inline-block;border-radius:999px;padding:6px 13px;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px">⚔️ {badge}</div>\n'
        f'    <h2>{h}</h2>\n'
        f'    {style}\n    {head}\n    {body}\n'
        f'    <div class="cmppunch">{punch}</div>\n'
        '  </section>')



def render(b):
    ln = b['lineCount']
    acc = b.get('accent', '#2AD4F0')
    jsonld = json.dumps(b['jsonLd'], separators=(',', ':'))
    lic = b.get('license')
    lic_html = (f'<p class="licline">{e(lic["label"])}: <b>{e(lic["value"])}</b></p>'
                if lic and lic.get('value')
                else (f'<p class="licline">{e(lic["label"])}: <b class="tbd">to be displayed at launch</b></p>'
                      if lic else ''))
    legal = (f'<div class="legalnotice"><b>Attorney advertising &amp; required disclosures.</b> '
             f'{b["legalNotice"]}</div>' if b.get('legalNotice') else '')

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#04070F">
<title>{e(b["seo"]["title"])}</title>
<meta name="robots" content="{e(b.get("robots","noindex, nofollow"))}">
<meta name="description" content="{e(b["seo"]["description"])}">
<link rel="canonical" href="{e(b["seo"]["canonical"])}">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(b["seo"]["title"])}">
<meta property="og:url" content="{e(b["seo"]["canonical"])}">
<meta property="og:description" content="{e(b["seo"]["description"])}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2304070F'/%3E%3Ccircle cx='16' cy='16' r='4' fill='none' stroke='%2300FF88' stroke-width='2'/%3E%3Ccircle cx='16' cy='16' r='9' fill='none' stroke='%232AD4F0' stroke-width='1.5' opacity='.6'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
<script type="application/ld+json">{jsonld}</script>
<link rel="stylesheet" href="../brand-kit/brand.css">
<style>:root{{--accent:{acc};}}</style>
</head>
<body>
<div class="bar">
  <div class="logo"><b>{e(b["brandShortBold"])}</b>{e(b["brandShortRest"])} <span class="sr">· Showroom</span></div>
  <a href="../showroom/">← Showroom</a>
</div>

<header class="wrap">
  <div class="eyebrow">{e(b["eyebrow"])}</div>
  <h1>{e(b["h1a"])}<br><span>{e(b["h1b"])}</span></h1>
  <div class="tagline">{b["tagline"]}</div>
  <div class="demo-note">{e(b["demoNote"])}</div>
</header>

<div class="wrap">
  <section>
    <div class="big"><b>The insight:</b> {b["insight"]}</div>
  </section>

  <section>
    <h2>Live benchmark — today vs. the {e(b["brandName"])} offspring</h2>
    <div class="bm">
      <div class="bc now"><h3>{e(b["benchNowTitle"])}</h3>
        <ul>
{bullets(b["benchNow"])}
        </ul></div>
      <div class="bc next"><h3>{e(b["benchNextTitle"])}</h3>
        <ul>
{bullets(b["benchNext"])}
        </ul></div>
    </div>
  </section>

  <section>
    <h2>The {ln}-line Smart-DID grid — {e(b["gridSub"])}</h2>
    <div class="grid10">
{did_grid(b)}
    </div>
    <p class="fineprint left">{b["didFootnote"]}</p>
  </section>

  <section>
    <h2>Why "smart" — the brain behind the {ln} numbers</h2>
    <div class="brain">
      <div class="row">
        {brain_row(b["brainChips"])}
      </div>
      <p class="brainnote">{b["brainNote"]}</p>
    </div>
  </section>

  <section>
    <h2>The critical core — a telemarketing-centric sales system</h2>
    <div class="pillars">
{pillars(b["pillars"])}
    </div>
    <div class="comp">Built to compliance: {chips(b["complianceChips"])} — lead data governed &amp; separated.</div>
    {lic_html}
  </section>
{command_center(b)}
{service_map(b)}
  <section>
    <h2>The {e(b["platformName"])} Platform — our UCCPXaaS + automation core</h2>
    <div class="plat"><b>UCCPXaaS</b> = Unified Communications + Contact-Center + Communications-Platform + Everything-as-a-Service — the proprietary infrastructure that turns {ln} phone numbers into an autonomous revenue engine, owned end-to-end, not rented from a third party.</div>
    <div class="stack">
{stack(b["stack"])}
    </div>
    <p class="fineprint left">Proprietary platform architecture. Carrier &amp; infrastructure layer powered by Telvergence.</p>
  </section>

  <section>
    <h2>The 90-second walkthrough</h2>
    <div class="video">
      <span class="tag">Video · walkthrough</span>
      <div class="play">▶</div>
      <div class="vt">{e(b["brandName"])}, bred with Telvergence — {ln} numbers, one brain</div>
      <div class="vs">{e(b["videoSub"])}</div>
    </div>
  </section>

  <section>
    <h2>The {ln}-line pack — risk reversed onto us</h2>
    <div class="offer">
      Start with the <b>{ln}-Line Smart-DID Pack + 30-Day Pilot.</b> {b["offerLead"]} <b>You see the booked business first.</b> No contract, no SSN/credit info; Telvergence <b>advances the $22.95/line before you're ever charged</b>; 100% satisfaction / full refund. <b>You simply post a card on file that is charged only if and when your lines are successfully provisioned and you're satisfied with the call clarity and hand-off — first billed 17 days after enrollment, yet your phones ring day one, so your first jobs should cover it, or Telvergence pays your first month. You own your numbers and can port them to any carrier, anytime.</b>
    </div>
    <div class="econ">
      <div class="ec"><div class="k">{ln}</div><div class="l">Smart DIDs, each a sensor + router</div></div>
      <div class="ec"><div class="k">$0</div><div class="l">out of pocket first — we advance the lines</div></div>
      <div class="ec"><div class="k">30 days</div><div class="l">{e(b["econUnit"])}</div></div>
    </div>
    <div class="start">
      <div class="cclabel gold">All it takes to start</div>
      <div class="startrow">
        <span class="startchip"><span class="i">①</span> A signed LOA <span class="sm">(Letter of Agency)</span></span>
        <span class="startchip"><span class="i">②</span> A card on file</span>
      </div>
      <p>That's it. The system builds itself and generates cash on autopilot — eliminating the majority of your costs, risks, and labor. You focus on {e(b["focusVerb"])}.</p>
    </div>
  </section>

  <section>
    <h2>Engagement tiers <span class="soft">(proposed &amp; adjustable)</span></h2>
    <table>
{tiers(b["tiers"])}
    </table>
  </section>
{refer_earn(b)}
  <section class="last">
    <h2>The ask</h2>
    <p class="lead">Let's stand up your {ln}-line Smart-DID grid and the 30-day pilot — a 20-minute call is all we need to begin. <b>I can have your phones ringing within 24 hours.</b></p>
    <p class="trust">Give me <span>1% of your trust</span> — I'll earn the other 99.</p>
    <div class="alt"><b>The alternative:</b> {b["alternative"]}</div>
    <div class="cta">
      <a class="call" href="tel:{e(b["ctaPhoneHref"])}">📞 Call to begin — {e(b["ctaPhone"])}</a>
      <a class="book" href="mailto:{e(b["ctaEmail"])}?subject={e(b["brandName"]).replace(" ", "%20")}%20—%20{ln}-Line%20Pilot">✉️ {e(b["ctaEmail"])}</a>
    </div>
    <p class="nothing">You have nothing to lose and everything to gain.</p>
    <p class="decide">You decide. <span>What's it going to be?</span></p>
    <p class="hand">And I'll be holding your hand the entire way — fully committed to your success, without a dollar out of pocket from you — until you see all this in action and the money coming in first. OK?</p>
    <div class="sig">Looking forward to building this with you,<br><b>David Drew Allen</b> · President, Telvergence, Inc. · 689-242-1041 · contact@telvergence.com</div>
  </section>
</div>
{compare(b)}
{winnet(b)}
<div class="wrap">
  {legal}<div class="disclaimer">{b["disclaimer"]} Confidential — TELVERGENCE.</div>
</div>
<script>
(function(){{
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){{
    document.querySelectorAll('section,.did,.p').forEach(function(x){{x.classList.add('in');}});return;}}
  var io=new IntersectionObserver(function(es){{es.forEach(function(en){{
    if(en.isIntersecting){{en.target.classList.add('in');io.unobserve(en.target);}}}});}},
    {{rootMargin:'0px 0px -6% 0px',threshold:.06}});
  document.querySelectorAll('section,.did,.p').forEach(function(x){{io.observe(x);}});
}})();
</script>
</body>
</html>
'''


# ------------------------------------------------- listing-foundation gate
# Every brand must have a Google Business Profile recorded — with auto-verification
# ON — BEFORE it publishes. This is the mechanical enforcement of the
# listing-foundation skill; the brand's `gbp` block in brands/<slug>.json is the
# record of done. See .claude/skills/listing-foundation/SKILL.md.
def listing_status(b):
    """Return (ok, level, message) for the brand's Google Business Profile gate.

    ok=False means NOT publish-ready (the deploy must be blocked).
    Levels: VERIFIED / PENDING (ok) · CONCEPT (ok, deferred) · REQUIRED / ERROR (blocked).
    """
    slug = b.get('slug', '?')
    g = b.get('gbp') or {}
    status = str(g.get('status', 'required')).lower()

    # Google auto-verification must be ON for every brand (standing rule).
    if g.get('auto_verify') is not True:
        return (False, 'ERROR',
                f'{slug}: gbp.auto_verify must be true — Google auto-verification stays ON for every brand')

    # Internal concept mock (not a real client yet): GBP deferred, not blocked.
    if status == 'concept':
        return (True, 'CONCEPT', f'{slug}: concept mock — GBP deferred until it becomes a real client')

    # Real brand: GBP created/claimed (verification may still be auto-processing) → publishable.
    if status in ('verified', 'pending'):
        tail = f' → {g["profile_url"]}' if g.get('profile_url') else ''
        return (True, status.upper(), f'{slug}: GBP {status} (auto-verify on){tail}')

    # required / missing / unknown → not publish-ready.
    return (False, 'REQUIRED',
            f'{slug}: NO Google Business Profile on file — run the listing-foundation skill '
            f'(create/claim GBP, auto-verification ON, record profile_url) before publishing')


def load_brand(f, defaults):
    slug = f[:-5]
    with open(os.path.join(BRANDS, f), encoding='utf-8') as fh:
        b = json.load(fh)
    merged = json.loads(json.dumps(defaults))
    merged.update(b)
    merged.setdefault('slug', slug)
    return merged


def main():
    args = sys.argv[1:]
    report_only = '--listings' in args
    want = [a for a in args if not a.startswith('--')]

    dpath = os.path.join(BRANDS, '_defaults.json')
    defaults = {}
    if os.path.exists(dpath):
        with open(dpath, encoding='utf-8') as fh:
            defaults = json.load(fh)
    files = sorted(f for f in os.listdir(BRANDS)
                   if f.endswith('.json') and not f.startswith('_'))

    # ---- listings report mode: print the GBP status table and exit ----
    if report_only:
        print('Google Business Profile — listing-foundation gate (auto-verify ON is required):')
        blocked = []
        for f in files:
            b = load_brand(f, defaults)
            if want and b['slug'] not in want:
                continue
            ok, level, msg = listing_status(b)
            print(f'  [{"OK " if ok else "!! "}{level:<8}] {msg}')
            if not ok:
                blocked.append(b['slug'])
        if blocked:
            print(f'\n{len(blocked)} brand(s) NOT publish-ready — run listing-foundation for: {", ".join(blocked)}')
            sys.exit(1)
        print('\nAll brands are listing-complete. ✅')
        return

    # ---- normal build: render HTML, then enforce the listing gate ----
    built = 0
    blocked = []
    for f in files:
        b = load_brand(f, defaults)
        if want and b['slug'] not in want:
            continue
        outdir = os.path.join(ROOT, b['slug'])
        os.makedirs(outdir, exist_ok=True)
        out = os.path.join(outdir, 'index.html')
        with open(out, 'w', encoding='utf-8') as fh:
            fh.write(render(b))
        ok, level, msg = listing_status(b)
        flag = '' if ok else '   ⛔ NOT PUBLISH-READY (GBP)'
        print(f'  built {b["slug"]:<12} {b["lineCount"]:>3} lines  → {b["slug"]}/index.html{flag}')
        if not ok:
            blocked.append((b['slug'], msg))
        built += 1
    print(f'done — {built} brand site(s) built')

    # The listing-foundation gate: no brand publishes without its GBP (auto-verify ON).
    if blocked:
        print('\n⛔ LISTING-FOUNDATION GATE — these brands are built but must NOT be published/merged until')
        print('   their Google Business Profile is recorded (auto-verification ON) in brands/<slug>.json:')
        for slug, msg in blocked:
            print(f'   - {msg}')
        print('\n   Fix: run the listing-foundation skill per brand, then set its "gbp" block')
        print('   ({"status":"verified"|"pending","auto_verify":true,"profile_url":"…","review_link":"…"}).')
        print('   Re-run `python3 brand-kit/build.py --listings` to confirm the gate is green.')
        sys.exit(1)


if __name__ == '__main__':
    main()
