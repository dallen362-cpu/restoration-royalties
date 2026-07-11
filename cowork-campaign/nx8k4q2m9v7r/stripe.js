/* =====================================================================
   TELVERGENCE — Stripe wiring (SINGLE SOURCE OF TRUTH)
   ---------------------------------------------------------------------
   TO GO LIVE: run  cowork-campaign/ops/stripe-setup.sh  (needs a Stripe
   key), then paste the two Payment-Link URLs it prints into the two
   variables below. That's the ONLY edit needed — every "Pay" button on
   every page reads from here.

     BACKEND_LINK  = $1,499 setup + $499/mo   (platform.html)
     FRONTEND_LINK = $22.95 × up to 10 lines  (onboarding funnel)

   Until a link is set, buttons gracefully route to the founder line so a
   prospect is NEVER shown a dead button.
   ===================================================================== */
window.TELV_STRIPE = {
  // ↓↓↓ PASTE LIVE PAYMENT-LINK URLs HERE (leave "" to fall back to the call line) ↓↓↓
  BACKEND_LINK:  "",   // e.g. "https://buy.stripe.com/live_xxx"  ($499/mo + $1,499 setup)
  FRONTEND_LINK: "",   // e.g. "https://buy.stripe.com/live_yyy"  ($22.95 × 1–10 lines)
  // ↑↑↑ ----------------------------------------------------------------------------- ↑↑↑
  CALL: "tel:+16892421041"      // founder line — the no-card activation path
};

/* Build a checkout URL with optional prefill (email + reference). */
window.telvStripeUrl = function(kind, opts){
  var S = window.TELV_STRIPE || {};
  var base = (kind === "frontend") ? S.FRONTEND_LINK : S.BACKEND_LINK;
  if(!base) return null;                          // not live yet
  opts = opts || {};
  var q = [];
  if(opts.email) q.push("prefilled_email=" + encodeURIComponent(opts.email));
  if(opts.ref)   q.push("client_reference_id=" + encodeURIComponent(opts.ref));
  return q.length ? base + (base.indexOf("?")>-1?"&":"?") + q.join("&") : base;
};

/* Auto-wire any <a data-stripe="backend|frontend">. If the live link is
   present the button opens Stripe; otherwise it routes to the call line and
   is tagged so we can style it as "call to activate". */
document.addEventListener("DOMContentLoaded", function(){
  var S = window.TELV_STRIPE || {};
  document.querySelectorAll("[data-stripe]").forEach(function(el){
    var kind = el.getAttribute("data-stripe");
    var live = (kind === "frontend") ? S.FRONTEND_LINK : S.BACKEND_LINK;
    if(live){
      el.setAttribute("href", window.telvStripeUrl(kind) || live);
      el.setAttribute("data-stripe-state","live");
    } else {
      el.setAttribute("href", S.CALL || "tel:+16892421041");
      el.setAttribute("data-stripe-state","call");
    }
  });
});
