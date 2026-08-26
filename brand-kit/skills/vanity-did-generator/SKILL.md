---
name: vanity-did-generator
description: The Gigapress vanity Smart-DID routine. Turns any brand/industry brief into ranked, memorable vanity phone numbers for the 10-line Smart-DID grid — toll-free word lines (1-800-RESERVE) and local rate-center word lines (786-807-MOLD). Use whenever a new concept/micro-site or brand page needs its number pack, or when refreshing example lines on an existing page. Emits EXAMPLES marked "pending assignment"; never claims availability.
---

# Gigapress Vanity Smart-DID Generator

Every Telvergence brand page and industry micro-site opens with a **10-line Smart-DID grid**, and
each line is only as good as its number. `786-807-MOLD` sells; `786-807-6653` doesn't. This skill is
the repeatable routine that produces the best spellings for any brief — so every page in the concept
pipe ships with a memorable, on-benefit number pack instead of placeholders.

## The rule (read first)
- **Everything this emits is an EXAMPLE, marked `pending assignment`.** It proposes the best word
  spellings; it does **not** check or claim availability. Real DIDs are pulled from the Telvergence
  wholesale (Vitelity) portal at launch. Never publish a number as active until it's actually provisioned.
- **Own the number, own the answer.** The whole point of a vanity Smart-DID is that it's ours to route,
  brand, and keep. The word is the marketing; the ownership is the moat.

## Run it
```bash
# built-in word bank for a vertical, plus local rate-center lines for area code 786
python brand-kit/skills/vanity-did-generator/scripts/vanity.py --industry restaurant --npa 786

# your own seed words for a specific brand
python .../vanity.py --brand "Miami Window & Door" --words "impact,ventanas,storm,finance,windcode"

# machine-readable for the gigapress studio / page generator
python .../vanity.py --industry law --npa 407 --json
```
No dependencies — pure Python 3, offline. `--industry` values are listed by the script on a bad name.

## What it does
1. **Word→keypad mapping** — standard telephone keypad (ABC=2 … WXYZ=9; 0/1 carry no letters).
2. **Scoring** — ranks each candidate for memorability/sellability:
   - **Length fit** — 7 letters fills a local `NXX-XXXX` line perfectly; 4–6 reads punchy on toll-free.
   - **Pronounceability** — rewards a healthy vowel ratio; penalizes consonant salad and Q/Z fumbles.
   - **Benefit words** — verbs and promises (`NOW`, `FREE`, `NEW`, `FIX`, `BOOK`, `SOLD`, `WELL`) score
     higher than flat nouns, because they sell on the caller ID itself.
3. **Two formats per word** — a toll-free line (`1-800-RESERVE`) and, with `--npa`, a local
   rate-center line (`786-…`) so the grid mixes national reach with local-answer trust.
4. **Ranked output** — top candidates with the dialable string, the digits, and *why* each scored.

## Where it plugs into the pipe
- **New industry micro-site** (`/<slug>/`): run `--industry <vertical> --npa <local area code>`, take the
  top ~10, and drop them into the 10-line grid as `<span class="vn pending">…<em>· pending assignment</em></span>`.
- **Brand page refresh**: re-run with the brand's own seed words to upgrade weak lines.
- **Gigapress studio**: use `--json` and feed the candidates straight into the page generator.

## Grid convention (matches the concept pages)
The 10 lines are almost always: (1) flagship 24/7, (2) Spanish/bilingual, (3–7) the highest-value
intent lines for that vertical, (8) a press/partner line, (9) a paid-ads attribution DID, (10) the
outbound branded caller-ID that *presents* the flagship number. Generate words for each slot's intent.

## Extending the word banks
Add a vertical (or better words) in `scripts/vanity.py` under `BANKS`. Keep words ALL-CAPS, on-benefit,
and ideally 4–8 letters. The generator handles spaces/punctuation and de-dupes automatically.

## Provenance / honesty
Vanity numbers are marketing spellings of real DIDs. On any public page, only show a number as active
once it's provisioned and owned; otherwise carry the `pending assignment` tag. This keeps every claim true.
