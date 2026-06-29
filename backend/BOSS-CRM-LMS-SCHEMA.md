# BOSS CRM + LMS — Backend Data Schema (DRAFT to capture in master repo)

> Starting schema drafted from the functional back office (`cowork-campaign/.../backoffice.html`)
> and the verified BOSS history (BOSS = Back Office Sales Support, 2013→present; ViciDial-integrated 2019).
> **Augment / override this with the BOSS attribute specs from the Perplexity Max portal** — paste them
> in and I'll reconcile field-by-field. This file is the single source of truth for the data model.

## Core entities

### account  (the subscriber)
- `account_id` (PK)  · `smart_did` (account key — **no SSN**)  · `pin_hash` (8-digit DOB, hashed)
- `legal_name` · `email` · `forward_to` (default ring-to phone)
- `plan` (10-line pack) · `lines` (1–10) · `status` (trial/active/canceled)
- `stripe_customer_id` · `stripe_subscription_id` · `trial_ends_at` · `current_period_end`
- `created_at` · `address` (E911) · `is_partner` (bool) · `is_provider` (bool)

### line  (each Smart DID)
- `line_id` (PK) · `account_id` (FK) · `did` · `cnam` (branded caller ID)
- `forward_to` · `e911_address` · `vitelity_id` · `status` · `provisioned_at`

### lead / contact  (CRM)
- `lead_id` (PK) · `name` · `phone` · `email` · `city` · `source`
- `status` (New/Contacted/Sale/Callback/No Answer/Not Interested/DNC)
- `owner_agent_id` · `campaign_id` · `last_contact_at` · `notes`

### opportunity / pipeline
- `opp_id` · `lead_id` · `stage` · `value` · `expected_close` · `owner_agent_id`

### call_log
- `call_id` · `lead_id` · `agent_id` · `disposition` · `duration_s` · `recording_url`
- `vicidial_call_id` · `campaign_id` · `started_at`

### agent
- `agent_id` · `name` · `smart_did` · `persona` (founder second-brain clone) · `certified` (bool)

### campaign
- `campaign_id` · `name` · `vicidial_campaign_id` · `list_id` · `script_id` · `caller_id_did`

### LMS
- `module` (`module_id`, `title`, `description`, `duration`, `order`)
- `lms_progress` (`agent_id`, `module_id`, `complete`, `completed_at`)
- `certification` (`agent_id`, `cert_name`, `issued_at`)

### partner / commissions  (WIN Agent Partner — 10% of gross)
- `partner_id` (= account) · `connected_provider_id` · `job_value` · `commission` (10%) · `status` · `paid_at`

### provider  (WIN network)
- `provider_id` · `name` · `category` · `geo`/`zip` · `distance_mi` · `avg_job` · `status` · `perf_score` · `grid_id`

### grid_territory  (national saturation)
- `grid_id` · `status` (open/held/authorized/at-risk) · `provider_id` · `perf_score`

### billing
- `subscription` (`stripe_subscription_id`, `account_id`, `qty`, `unit_price`=22.95, `trial_period_days`=30, `status`)
- `invoice` (`stripe_invoice_id`, `account_id`, `amount`, `paid`, `period_start`, `period_end`)

## Integration keys (how the systems link)
- **Stripe** `customer`/`subscription` ↔ `account`
- **Vitelity** `did` ↔ `line`
- **ViciDial** `lead_id`/`list_id`/`campaign_id` ↔ `lead`/`campaign`/`call_log`
- Smart DID is the universal account key across all systems. **No SSN anywhere.**

## TODO once Perplexity BOSS specs are pasted
- [ ] Map each "attribute you love" from BOSS → a field above (add/rename/extend).
- [ ] Confirm pipeline stages, disposition list, and LMS module list from BOSS.
- [ ] Choose datastore (Postgres / Cloudflare D1 / Airtable) and generate the DDL.
