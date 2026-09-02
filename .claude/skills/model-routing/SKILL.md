---
name: model-routing
description: Pre-execution model-routing evaluation. BEFORE executing any non-trivial task or spawning any agent, classify the task's required capability + cost-of-error and assign the CHEAPEST Claude model that meets the quality bar (Haiku → Sonnet → Opus → main/top). Use it every time work is delegated or a multi-step build starts. Its purpose is economics — never overspend tokens on work a cheaper, equally-capable model solves to standard.
---

# Model Routing — match every task to a model by ABILITY *and* ECONOMICS

## The law (David Allen, 2026-09-02 — permanent)
Before executing anything, run this routing evaluation. Assign every task to the **LOWEST-COST model that
solves it to standard.** Escalate only when the task *demonstrably* needs more. Never spend Opus on Sonnet
work; never Sonnet on Haiku work. The main session is reserved for orchestration and critical/irreversible
judgment. This is an automated, intelligent decision made **before** execution — precise task-to-ability-
to-cost matching, every time. Assign agents and mint new skills as you go.

## Step 1 — classify the task (30 seconds, before any tool call)
| Class | What it looks like | Cost of error |
|---|---|---|
| **A. Mechanical** | greps, counts, file moves/copies, formatting, bulk find/replace, deterministic transforms, verification checks, boilerplate, data extraction with explicit rules | low, reversible |
| **B. Specified implementation** | code/content to a CLEAR spec or template; JSON from a reference schema; page clones from an exact template; research WITH explicit instructions + sources; standard refactors; tests; docs from an outline | medium, reversible |
| **C. Judgment / design** | ambiguous or novel work; architecture; multi-constraint synthesis; honesty/compliance-sensitive content; security/data-boundary audits; design-quality output the user will judge; anything where a wrong call is costly | high |
| **D. Orchestration / critical** | strategy; reading user intent; plan design; integration + final verification; irreversible or outward-facing actions (deploys, unpublishes, sends); security boundaries; anything touching secrets / PHI / legal | highest / irreversible |

**Rule of thumb:** if you can write a spec precise enough that a careful junior engineer would nail it, it's
**B (Sonnet)**. If it needs taste, judgment, or handling of real ambiguity, it's **C (Opus)**. If it's
mechanical, it's **A (Haiku)**. If it's irreversible, security-adjacent, or about what the user *means*,
it's **D — do it yourself in the main session.**

## Step 2 — assign the model
| Class | Model (Agent `model` param) | Effort |
|---|---|---|
| A | **Haiku 4.5** — `"haiku"` | low |
| B | **Sonnet 5** — `"sonnet"` | low–medium |
| C | **Opus** — `"opus"` | medium–high |
| D | **Main session (top model)** — do NOT delegate | — |

## The Quarterback — tier D is Fable 5.1, calling plays in real time
Tier D is not a static gate you pass through once. It is **Fable 5.1 as the quarterback** of the whole
operation (David Allen, 2026-09-02):
- **Decides routing on the fly.** Every incoming task is read and routed in real time — no batch, no wait.
  As lanes report back, the quarterback re-routes: escalate a lane that failed on capability, downgrade a
  lane that turned out mechanical, spin up a new lane the results revealed.
- **Orchestrates the lanes.** Spawns the Haiku / Sonnet / Opus agents, sets their specs and rails, runs
  independent lanes in parallel, and sequences the dependent ones.
- **Cross-synthesizes.** Takes the outputs of separate lanes and integrates them into one coherent result —
  reconciling inconsistencies, enforcing the doctrine and honesty rails across all of them, and making the
  whole read as a single intelligence.
- **Absorbs the macro AND the micro simultaneously.** The macro: David's intent, the strategy, the tier
  framework, the security boundaries, the economics. The micro: each lane's detail, each verification
  count, each edge case, each label. The quarterback holds both at once and never lets one drop for the
  other.
- **Owns the outcome.** The cheaper tiers execute; the quarterback thinks, routes, integrates, verifies,
  and is accountable for the final result and for every irreversible action.

## Step 3 — delegate + verify cheaply
- Spawn via `Agent` with the assigned `model`. Give a COMPLETE spec: inputs, outputs, constraints, honesty
  rails, and explicit "do not touch X". A precise spec is what lets a cheaper model hit the bar.
- Run independent lanes **in parallel** (one message, multiple Agent calls).
- **Verify every lane's output with a CHEAP check** (greps, counts, render, `node --check`, `py_compile`).
  Verification is Class A — do it in-session or on Haiku, never on Opus.
- Escalate a lane **only** if it fails verification for a *capability* reason. If it failed because the spec
  was vague, fix the spec and re-run on the same tier first.

## Step 4 — record the decision (one line, before executing)
State the routing so the economics are auditable and the next session learns from it, e.g.
`Lane B → Sonnet: clone 3 city storefronts from the Dallas template (data supplied).`

## Worked examples (from the Half a Cow build, 2026-09-02 — includes our own overspends)
| Task | Right class → model | What actually happened |
|---|---|---|
| Grep leftover terms, count numbers, verify rails | A → Haiku / in-session | done in-session ✓ (cheap) |
| Clone 3 city storefronts from an exact template + supplied data | **B → Sonnet** | ran on Opus — **overspent** |
| Reframe inventory to 30 NFL markets from a precise list + existing design | **B → Sonnet** | ran on Opus — **overspent** |
| Author a gold brand JSON from a reference schema + honesty rails | B/C border → **Sonnet first**, escalate only if honesty nuance fails verification | ran on Opus — could have started cheaper |
| Web-researched industry doc: sourcing, no-invented-stats, compliance | **C → Opus** | Opus ✓ correct |
| Security / data-boundary audit (Kenneth) | **D → main** | main ✓ correct — never delegate |
| Deploy / unpublish / anything outward-facing | **D → main** | main ✓ correct |
| Recording doctrine / policy in the brain | D → main (user intent) | main ✓ |

## Anti-patterns (don't)
- Defaulting every subagent to Opus "to be safe" — that is precisely the overspend this law exists to stop.
- Delegating Class D (irreversible, security, secrets, user intent) to save tokens — never.
- Skipping the cheap verification and re-running an expensive lane instead.
- Writing a vague spec and then blaming the model tier.

## Mint skills as you go
When a routed task reveals a repeatable pattern (a template clone, a reframe, a verification sweep), write
it down as a skill so the next run is cheaper still. Additive only — never overwrite an existing skill;
create a new one or a new version (per the Additive / Immutable / Redundant law).
