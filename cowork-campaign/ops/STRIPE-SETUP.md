# TELVERGENCE — Stripe: ready to take $499, $1,499 and $22.95

Three chargeable items, two payment links. Nothing charges by setting these up.

## The three items
| # | Item | Amount | Type |
|---|------|--------|------|
| 1 | TELVERGENCE Platform — Enterprise | **$499.00** | recurring / month |
| 2 | TELVERGENCE Platform — Setup | **$1,499.00** | one-time |
| 3 | TELVERGENCE Smart DID Line | **$22.95** | recurring / month (qty 1–10) |

## Two payment links
- **BACK-END link** = item 2 (setup, one-time) **+** item 1 ($499/mo) on one checkout.
- **FRONT-END link** = item 3 ($22.95 × up to 10 lines, adjustable), 30-day trial, card collected. This is the funnel's **online/card path** (the phone path stays free / no-card / e-invoice).

## Fastest way (automated)
```bash
STRIPE_KEY=sk_live_XXXX bash cowork-campaign/ops/stripe-setup.sh
```
Use a LIVE secret key, or a **restricted key** (`rk_live_…`) with **write** on Products, Prices, and Payment Links. The script prints both payment-link URLs at the end.

> Prefer not to paste a key here? Send me a restricted `rk_live_` key (Products/Prices/Payment Links: write) and I'll run it and wire the links. Or run it yourself and paste the two URLs back.

## Wire the URLs in (I do this once you have them)
1. **FRONT-END** URL → `telvergence-onboarding-funnel.html`, the `STRIPE_LINK` variable.
2. **BACK-END** URL → `platform.html`, the `#platformCheckout` button `href` (marked with a comment).

## Manual (Stripe Dashboard) alternative
Products → **+ Add product** for each of the three above (set the recurring/one-time and amount). Then **Payment links → + New**:
- Back-end link: add the **Setup** price (qty 1) **and** the **Enterprise $499/mo** price (qty 1).
- Front-end link: add the **$22.95** price, enable **adjustable quantity** 1–10, and set **30-day free trial** under subscription settings.

## Security
- Use a **restricted** key; delete/roll it after setup.
- Never commit a live secret to the repo.
- Test mode first (`sk_test_…`) to preview, then LIVE.
