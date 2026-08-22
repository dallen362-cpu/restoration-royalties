# Restoration Royalty / Royalties — South Florida Calling Campaign (ops records)

Saved 2026-08-22. Source data pulled from the client Google Drive
(`dallen362@gmail.com`) and the Perplexity campaign research
(`backend/research/`). These are **internal operations records** for the
Restoration Royalty / Restoration Royalties outbound program — not served on
the public site. They pair with the dialer runbooks in `../VICIDIAL-SETUP.md`
and `../VICIDIAL-EXTRACTION-PROMPT.md`.

## Files

| File | What it is |
|---|---|
| `RR_MASTER_VICIDIAL_LOAD.csv` | **The master load file.** Both lead lists merged and tagged so they import as separate ViciDial lists inside one campaign (`RRSOFLA`). 376 rows, 9 lists. |
| `RR_SoFla_CallList_VICIDIAL_LOAD.csv` | Source list 1 — 39 verified South-Florida B2B targets (property managers / HOA / condo mgmt / restoration partners). |
| `RR_Roofing_Contractors_VICIDIAL_LOAD.csv` | Source list 2 — 337 FL roofing contractors (contractor-to-contractor partner / storm-response). Original Drive export, decoded verbatim. |
| `RR-South-Florida-Calling-Campaign-GO-PACKET.html` | The campaign GO PACKET — offer, targeting tiers, the 10 assigned DIDs, compliance guardrails, and the full script set (outbound opener, inbound handler, text intake, closer, voicemail), plus the ViciDial load checklist and KPIs. |

## Master file schema (`RR_MASTER_VICIDIAL_LOAD.csv`)

```
list_id, list_name, campaign, tier,
phone_number, company_name, title,
address1, city, state, postal_code,
email, caller_id_pool, priority,
vendor_lead_code, source, comments
```

`list_id` is the ViciDial list each row loads into. Filter the master by
`list_id` on import, or split it, so each list keeps its own local-presence
caller-ID pool.

### Campaign `RRSOFLA` — list map

| list_id | list_name | tier | caller-ID pool | rows |
|---|---|---|---|---|
| 1001 | SoFla-Broward | Broward | 954 / 754 | 16 |
| 1002 | SoFla-Doral-Hialeah | Doral–Hialeah | 305 / 786 | 10 |
| 1003 | SoFla-Restoration-Partners | Restoration Partners | 954/754 · 305/786 | 13 |
| 2001 | Roofing-Miami-Dade | Miami-Dade | 305 / 786 | 31 |
| 2002 | Roofing-Broward | Broward | 954 / 754 | 37 |
| 2003 | Roofing-Palm-Beach | Palm Beach | 561 | 37 |
| 2004 | Roofing-Orlando-Central | Orlando / Central | 407 / 321 / 689 | 201 |
| 2005 | Roofing-Clermont-Lake | Clermont / Lake | 352 | 17 |
| 2009 | Roofing-Other | Other / toll-free | manual | 14 |

`1xxx` = South-Florida disaster-response B2B (immediate-revenue).
`2xxx` = roofing-contractor partner / storm-response cross-sell.

## Compliance guardrails (carry these into ViciDial config)

- **B2B only on outbound.** Published business lines, manual/agent dialing.
  Homeowners are **inbound-only** — never autodialed or texted.
- **DNC-scrub every list** before load, and keep a running suppression list;
  honor opt-outs immediately.
- **No SMS/autodialer blast** to these lists.
- **VERIFY-flagged rows** (a handful in each list — see `comments`/`market`)
  should have their number/name confirmed before an agent dials.
- TCPA / FTSA and **FL telemarketer registration** + counsel review apply
  before scaling. B2B lowers the risk profile; it does not remove the rules.
- Caller ID must be truthful and branded; record with disclosure where
  applicable.
