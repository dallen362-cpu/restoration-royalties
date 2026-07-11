#!/usr/bin/env bash
# TELVERGENCE — Stripe setup: creates the 3 chargeable items + payment links.
# Creates: (1) Enterprise platform $499/mo recurring, (2) $1,499 one-time setup,
#          (3) Smart DID line $22.95/mo (qty up to 10, adjustable).
# Then builds two Payment Links:
#   • BACK-END link  = $1,499 setup (one-time)  +  $499/mo (recurring)
#   • FRONT-END link = $22.95/mo × up to 10 lines (30-day trial, adjustable qty)
#
# USAGE:
#   STRIPE_KEY=sk_live_xxx  bash stripe-setup.sh          # LIVE
#   STRIPE_KEY=sk_test_xxx  bash stripe-setup.sh          # TEST
# A RESTRICTED key (rk_live_…) with WRITE on Products, Prices, Payment Links works too.
# Nothing is charged by running this — it only creates catalog + links.
set -euo pipefail
: "${STRIPE_KEY:?Set STRIPE_KEY=sk_live_… (or sk_test_…/rk_live_…) before running}"
API="https://api.stripe.com/v1"
s(){ curl -s -u "$STRIPE_KEY:" "$@"; }
id_of(){ python3 -c 'import sys,json;print(json.load(sys.stdin)["id"])'; }
url_of(){ python3 -c 'import sys,json;print(json.load(sys.stdin)["url"])'; }

echo "== 1) Enterprise platform — \$499/mo recurring =="
PLAT_PRICE=$(s "$API/prices" \
  -d "unit_amount=49900" -d "currency=usd" \
  -d "recurring[interval]=month" \
  -d "product_data[name]=TELVERGENCE Platform — Enterprise" | id_of)
echo "   price: $PLAT_PRICE"

echo "== 2) One-time setup — \$1,499 =="
SETUP_PRICE=$(s "$API/prices" \
  -d "unit_amount=149900" -d "currency=usd" \
  -d "product_data[name]=TELVERGENCE Platform — Setup (one-time)" | id_of)
echo "   price: $SETUP_PRICE"

echo "== 3) Smart DID line — \$22.95/mo =="
DID_PRICE=$(s "$API/prices" \
  -d "unit_amount=2295" -d "currency=usd" \
  -d "recurring[interval]=month" \
  -d "product_data[name]=TELVERGENCE Smart DID Line" | id_of)
echo "   price: $DID_PRICE"

echo "== BACK-END payment link (setup once + \$499/mo) =="
BACKEND_LINK=$(s "$API/payment_links" \
  -d "line_items[0][price]=$SETUP_PRICE" -d "line_items[0][quantity]=1" \
  -d "line_items[1][price]=$PLAT_PRICE"  -d "line_items[1][quantity]=1" | url_of)
echo "   URL: $BACKEND_LINK"

echo "== FRONT-END payment link (\$22.95/line × up to 10, 30-day trial) =="
FRONTEND_LINK=$(s "$API/payment_links" \
  -d "line_items[0][price]=$DID_PRICE" -d "line_items[0][quantity]=10" \
  -d "line_items[0][adjustable_quantity][enabled]=true" \
  -d "line_items[0][adjustable_quantity][minimum]=1" \
  -d "line_items[0][adjustable_quantity][maximum]=10" \
  -d "subscription_data[trial_period_days]=30" \
  -d "payment_method_collection=always" | url_of)
echo "   URL: $FRONTEND_LINK"

echo
echo "==================== DONE — one file to wire ===================="
echo "Paste BOTH URLs into  cowork-campaign/nx8k4q2m9v7r/stripe.js :"
echo "   FRONTEND_LINK = $FRONTEND_LINK   (\$22.95 × up to 10 lines)"
echo "   BACKEND_LINK  = $BACKEND_LINK    (\$499/mo + \$1,499 setup)"
echo "That single edit flips every Pay button on every page to LIVE."
echo "================================================================"
