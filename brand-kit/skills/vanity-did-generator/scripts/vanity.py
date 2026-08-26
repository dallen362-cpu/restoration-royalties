#!/usr/bin/env python3
"""
Telvergence Gigapress — Vanity Smart-DID generator.

Turns a brand/industry brief into ranked, memorable vanity phone numbers for the
10-line Smart-DID grid: toll-free word lines (1-800-RESERVE) and local rate-center
word lines (NPA-NXX-WORD). Deterministic, offline, no dependencies.

Everything it emits is an EXAMPLE marked "pending assignment" — real DIDs are pulled
from the Telvergence wholesale (Vitelity) portal at launch. This never checks or
claims availability; it proposes the best spellings for a human to reserve.

Usage:
  python vanity.py --brand "Miami Window & Door" --words "impact,storm,quote,ventanas,finance"
  python vanity.py --industry restaurant                # use a built-in word bank
  python vanity.py --industry restaurant --npa 786 --json

Output: a ranked table (or JSON) of candidates with the dialable string, the letters,
and why it scores where it does.
"""
import argparse, json, re, sys

# Standard telephone keypad. 0 and 1 carry no letters.
KEYPAD = {
    **{c: '2' for c in 'ABC'}, **{c: '3' for c in 'DEF'},
    **{c: '4' for c in 'GHI'}, **{c: '5' for c in 'JKL'},
    **{c: '6' for c in 'MNO'}, **{c: '7' for c in 'PQRS'},
    **{c: '8' for c in 'TUV'}, **{c: '9' for c in 'WXYZ'},
}
TOLLFREE = ['800', '833', '844', '855', '866', '877', '888']

# Curated word banks per industry — the memorable, on-benefit words that actually
# make a phone number sell. Extend freely; these seed the generator.
BANKS = {
    'restaurant':  ['RESERVE', 'MIMESA', 'PRIVATE', 'CATER', 'BIGPARTY', 'VIPTABLE',
                    'TAKEOUT', 'CHEF', 'BOOKATABLE', 'DINEIN', 'BUYOUT', 'BRUNCH'],
    'window':      ['IMPACT', 'VENTANAS', 'STORMPROOF', 'FINANCE', 'WINDCODE',
                    'NEWGLASS', 'MYDOORS', 'FREEQUOTE', 'SHOWROOM', 'HURRICANE'],
    'restoration': ['MOLD', 'WATER', 'RESTORE', 'DRYOUT', 'FLOOD', 'ROOF',
                    'STORMFIX', 'CLEANUP', 'DAMAGE', 'RAPIDDRY'],
    'roofing':     ['ROOF', 'NEWROOF', 'STORMROOF', 'LEAKFIX', 'SHINGLE',
                    'FREEROOF', 'ROOFNOW', 'HAILFIX'],
    'law':         ['JUSTICE', 'LAWYER', 'DEFENSE', 'INJURED', 'MYCASE',
                    'FRESHSTART', 'DEBTFREE', 'LAWHELP', 'ATTORNEY'],
    'bankruptcy':  ['FRESHSTART', 'DEBTFREE', 'RELIEF', 'CHAPTER7', 'WIPEDEBT',
                    'STARTOVER', 'NOMOREDEBT'],
    'medspa':      ['GLOWUP', 'BOTOX', 'BEWELL', 'RENEW', 'REFRESH', 'SKINCARE',
                    'MEDSPA', 'FEELNEW'],
    'weightloss':  ['NEWGLOW', 'SLIMDOWN', 'GLP1', 'DROPWEIGHT', 'NEWYOU',
                    'THINNOW', 'RESET'],
    'fitness':     ['SPINNOW', 'GETFIT', 'RIDE', 'SWEAT', 'CLASSPASS', 'STRONG'],
    'realestate':  ['SOLD', 'SELLFAST', 'NEWHOME', 'CASHOFFER', 'LISTIT',
                    'BUYNOW', 'REALTY', 'HOMEHUNT'],
    'hvac':        ['COOLFAST', 'NOHEAT', 'ACNOW', 'FIXAIR', 'COMFORT', 'NOFREEZE'],
    'plumbing':    ['NOLEAK', 'DRAINFIX', 'PIPEPRO', 'FLUSHIT', 'HOTWATER'],
    'electrical':  ['POWERON', 'NOPOWER', 'FIXWATT', 'GENSET', 'EVCHARGE', 'AMPS'],
    'dental':      ['NEWSMILE', 'DENTIST', 'BRIGHTEN', 'NOWDDS', 'FIXTOOTH'],
    'autobody':    ['DENTFIX', 'NEWPAINT', 'CRASHFIX', 'BODYSHOP', 'TOWNOW'],
    'pestcontrol': ['NOBUGS', 'PESTGONE', 'BUGFREE', 'TERMITE', 'ZAPBUGS'],
    'solar':       ['GOSOLAR', 'SUNPOWER', 'ZEROBILL', 'SOLARNOW', 'FREESUN'],
    'moving':      ['MOVEDAY', 'BOXITUP', 'MOVERS', 'RELOCATE', 'HAULIT'],
    'landscaping': ['MOWIT', 'GREENUP', 'LAWNPRO', 'YARDFIX', 'PALMS'],
}

VOWELS = set('AEIOU')

def to_digits(word):
    return ''.join(KEYPAD.get(c, '') for c in word.upper() if c.isalpha())

def clean(word):
    return re.sub(r'[^A-Za-z0-9]', '', word).upper()

def score(word):
    """Higher = more memorable/sellable. Heuristics only, tuned for phone words."""
    w = clean(word)
    letters = ''.join(c for c in w if c.isalpha())
    n = len(letters)
    s, why = 0.0, []
    # 7 letters fills a full local NXX-line perfectly; toll-free reads any length.
    if n == 7:      s += 4; why.append('7 letters = perfect local line')
    elif n in (6, 8): s += 2.5; why.append(f'{n} letters, clean')
    elif n in (4, 5): s += 2; why.append('short & punchy')
    elif n <= 3:    s += 0.5; why.append('very short')
    else:           s += max(0, 3 - (n - 8) * 0.6); why.append(f'{n} letters (long)')
    # A real, pronounceable word beats a digit-salad. Reward vowel presence & flow.
    vr = sum(c in VOWELS for c in letters) / max(1, n)
    if 0.25 <= vr <= 0.6: s += 2; why.append('pronounceable')
    elif vr == 0:         s -= 2; why.append('no vowels — hard to say')
    # Benefit words (verbs/promises) sell harder than nouns.
    if re.search(r'(NOW|FAST|FREE|NEW|GO|FIX|BOOK|SOLD|MY|WELL|GLOW)', letters):
        s += 1.5; why.append('action/benefit word')
    # Penalize letters that people fumble on a keypad (Q, Z) unless intentional.
    if set('QZ') & set(letters): s -= 0.5; why.append('has Q/Z')
    return round(s, 2), why

def fmt_tollfree(word, prefix='800'):
    letters = ''.join(c for c in clean(word) if c.isalpha())
    return f"1-{prefix}-{letters}"

def fmt_local(word, npa, nxx=None):
    letters = ''.join(c for c in clean(word) if c.isalpha())
    digits = to_digits(letters)
    line = (digits + '0000000')[:7] if len(digits) < 7 else digits[:7]
    exch = nxx or line[:3]
    return f"{npa}-{exch}-{line[3:7]}", letters

def generate(words, npa=None, top=10):
    seen, cand = set(), []
    for raw in words:
        w = clean(raw)
        if not w or not any(c.isalpha() for c in w) or w in seen:
            continue
        seen.add(w)
        sc, why = score(w)
        row = {
            'word': w,
            'score': sc,
            'tollfree': fmt_tollfree(w, '800'),
            'digits': to_digits(w),
            'why': '; '.join(why),
            'status': 'pending assignment',
        }
        if npa:
            local, letters = fmt_local(w, npa)
            row['local'] = f"{local} ({letters})"
        cand.append(row)
    cand.sort(key=lambda r: r['score'], reverse=True)
    return cand[:top]

def main():
    ap = argparse.ArgumentParser(description='Telvergence vanity Smart-DID generator')
    ap.add_argument('--brand', default='')
    ap.add_argument('--industry', help='built-in word bank: ' + ', '.join(sorted(BANKS)))
    ap.add_argument('--words', help='comma-separated seed words (adds to / replaces bank)')
    ap.add_argument('--npa', help='local area code, e.g. 786 — also emit local rate-center lines')
    ap.add_argument('--top', type=int, default=10)
    ap.add_argument('--json', action='store_true')
    a = ap.parse_args()

    words = []
    if a.industry:
        if a.industry not in BANKS:
            print(f"Unknown industry '{a.industry}'. Known: {', '.join(sorted(BANKS))}", file=sys.stderr)
            sys.exit(2)
        words += BANKS[a.industry]
    if a.words:
        words += [w for w in a.words.split(',') if w.strip()]
    if not words:
        print("Give --industry and/or --words. Try: --industry restaurant --npa 786", file=sys.stderr)
        sys.exit(2)

    rows = generate(words, npa=a.npa, top=a.top)
    if a.json:
        print(json.dumps({'brand': a.brand, 'industry': a.industry, 'npa': a.npa,
                          'candidates': rows}, indent=2))
        return
    hdr = f"\n  Vanity Smart-DID candidates" + (f" — {a.brand}" if a.brand else "") + \
          (f" [{a.industry}]" if a.industry else "") + "\n"
    print(hdr + "  " + "-" * 66)
    for i, r in enumerate(rows, 1):
        print(f"  {i:>2}. {r['tollfree']:<22} score {r['score']:<5}  {r['why']}")
        if 'local' in r:
            print(f"      local: {r['local']}")
    print(f"\n  All EXAMPLES · pending assignment — reserve real DIDs via the Vitelity portal.\n")

if __name__ == '__main__':
    main()
