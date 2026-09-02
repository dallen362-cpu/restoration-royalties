# AI-Master-Brain — MASTER INDEX (pointer copy, 2026-09-02)
*(Verbatim copy of the Drive `MASTER.md` David pasted into the QB session on 2026-09-02. The canonical file lives in Drive; this copy exists so the build shop knows the umbrella brain's layout and IDs. Scope rule for THIS repo/session: only the `Telvergence/` sub-brain is ever read from or written to; the umbrella's legal/medical/people domains (Kenneth Allen etc.) are out of scope and never touched.)*

**Owner:** David Drew Allen (dallen362@gmail.com)
**Created:** 2026-07-15
**Root (Drive):** https://drive.google.com/drive/folders/1RVTUgARdGTwpUY1dlanQHaHI-V6DeaJg
**Local mirror:** `~/AI-Master-Brain/` (Drive for Desktop or `rclone`)
**Purpose:** One brain. All AI data + docs for Claude first, then Perplexity, Gemini, ChatGPT. Telvergence lives as a mirrored subfolder.

---

## Top-level layout
| Folder | Purpose | Drive ID |
| --- | --- | --- |
| `Claude/` | All things Claude — projects, exports, prompts, skills, handoffs, ingests, installers | `13eAXK82Nq5_1Ca63DHxj41QlE7ZT7fwW` |
| `Perplexity/` | Perplexity threads, page exports, session summaries | `1h8WbMdBQ_UtNXFPm9EFX8H18iPmtoM07` |
| `Gemini/` | Gemini conversations, prompts, artifacts | `1yrVOj6uAUmFIY2voI0WEjpZeV1BHKZAX` |
| `ChatGPT/` | ChatGPT conversations, project instructions, exports | `1kCWiwW6LlTl3qJhphjkAEhWRcr2F5Uq_` |
| `Telvergence/` | Telvergence sub-brain (same 4-AI layout + Business-Ops) | `1-y-YRo29hgS8H9i39LjtWR4Dp7kdoph4` |
| `Skills/` | Reusable skill/instruction markdown across all AIs | `17149XPIVEH3KbkKQoKsI9FqJ0qoaKAO9` |
| `Sources/` | Raw evidence: PDFs, transcripts, filings, statutes | `1AbgfsJRS9h1JFjZDfLxvcXql-MXRpB3h` |
| `_Archive-Original-Locations/` | Snapshot of where files lived pre-consolidation | `1g9fb0pGVaaDJE55L4lMFhODQCLxRtloh` |

## Claude sublayout (`Claude/`)
| Sub | Purpose |
| --- | --- |
| `01_Projects/` | One folder per Claude Project (Kenneth Allen, HOA, Restoration Royalties, Telvergence, …) |
| `02_Conversations-Export/` | Raw `conversations.json` + parsed per-thread markdown from Claude.ai data exports |
| `03_Prompts-and-Templates/` | Reusable prompt packages (COWORK, INGEST, MASTER_SYNC, briefing packages) |
| `04_Skills-and-Instructions/` | `CLAUDE_PROJECT_INSTRUCTIONS.md` variants + skill definitions |
| `05_Handoffs-and-Ingests/` | Cross-model handoff docs (Perplexity↔Claude↔ChatGPT↔Gemini) |
| `06_Reference-Docs/` | Research reports, synthesis docs, deliverables |
| `07_Installers-and-Setup/` | Claude Desktop installers, MCP config, environment setup |

## Repository conventions
1. **One canonical file per topic.** Duplicates go into `_Archive-Original-Locations/` with a suffix like `_dupe-<origParent>`.
2. **Naming:** `<PROJECT>_<TOPIC>_<YYYY-MM-DD>.md`. Dates are ISO. Underscores only.
3. **Every folder gets a `_README.md`** describing what belongs there.
4. **`MASTER.md` (this file)** is the single source of truth for structure and cross-links. Any AI opening this brain should read it first.

## Bootstrapping Claude Code
The local repo `~/AI-Master-Brain/` mirrors this Drive folder. Open Claude Code with:
```bash
cd ~/AI-Master-Brain
claude
```
Claude Code auto-loads `CLAUDE.md` at the repo root, which points at this `MASTER.md`.

## Cross-model handoff protocol
- Handoff docs go in `05_Handoffs-and-Ingests/` and are named `HANDOFF_<FROM>_TO_<TO>_<TOPIC>_<DATE>.md`.
- Every handoff starts with a summary block: **Project / Status / Open Questions / Next Actions / Evidence Refs**.
- Sensitive matter (Kenneth Allen, legal) stays out of Telvergence subfolders.

## Change log
- **2026-07-15** — Structure created; 50 existing Claude-tagged files inventoried; migration pending user confirmation.
- **2026-07-15 (expansion)** — Added BRAIN.md world map + life-domains: 00_PEOPLE, 01_LEGAL, 02_MEDICAL, 03_BUSINESS, 04_FINANCIAL, 05_PROPERTY, 06_DIGITAL-IDENTITY, 07_PERSONAL. Indexed all 1,631 local files by matter; folded in Gmail+M365 email export under Sources/. CLAUDE.md now boots from BRAIN.md.
- **2026-09-02** - Half a Cow go-live (Cowork + QB Claude Code): Cloudflare Pages project `halfacow` (halfacow.pages.dev); `halfacow/` synced to telvergence.com (canonical) with public Talking Pitch + 3-Minute Show; passcode-gated private pitch at telvergence.com/halfacow/private/; showroom card + brand-kit hosts point at telvergence.com/halfacow/. Ledger: `Claude/05_Handoffs-and-Ingests/HANDOFF_COWORK_TO_QB_HALFACOW-GOLIVE_2026-09-02.md`.
