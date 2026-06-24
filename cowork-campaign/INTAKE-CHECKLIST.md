# Co-Work Campaign — Intake Checklist (material I can't reach)

To finish consolidating, I need the items below. I **cannot** read Claude.ai chats,
Claude projects, or Perplexity workspaces from this environment — so anything that lives
only there must be exported and placed into this repo (or pushed to a repo I can access).

## How to hand off each item

For code/config: drop files under `cowork-campaign/<area>/` (e.g.
`cowork-campaign/vicidial/`, `cowork-campaign/boss-crm/`, `cowork-campaign/lms/`,
`cowork-campaign/skills/`, `cowork-campaign/perplexity-output/`) and I'll wire them
into the consolidation. For chat/Perplexity transcripts: paste them here or save as
`.md` files in `cowork-campaign/perplexity-output/`.

## Checklist

- [ ] **ViciDial / vici dialer wiring** — dialplan, campaign config, carrier/SIP trunk
      settings, agent setup, any scripts/API glue. Where does it currently live?
- [ ] **BOSS back-end CRM** — schema, API integration code, auth, field mappings to
      TELVERGENCE / the brand sites.
- [ ] **LMS** — platform used, course/content structure, integration points.
- [ ] **Skills** — the Claude/agent skills already built for any of the above (names +
      definitions or files).
- [ ] **Previously generated code** — anything from prior Claude chats/projects not yet
      committed to a repo.
- [ ] **Perplexity Max (Computer mode) output** — the transcripts/output used to set up
      the dialer wiring and the TELVERGENCE sub-branded functionality.

## Open questions for you

1. **Campaign target:** Is "the Co-Work Campaign" (a) this `cowork-campaign/` folder in
   `restoration-royalties`, (b) a brand-new dedicated repo, or (c) something inside the
   `telvergence` repo? Default assumption used here: **(a)** this folder.
2. **Repo scope:** This session can only touch `restoration-royalties` via the GitHub
   tools. To consolidate directly into `telvergence` (or another repo) I'd need that
   repo added to the session scope. Want me to work there instead?
3. **Sites verification:** Should I verify live/deploy status of all 9 Pages sites and
   note which custom domains (if any) you want set?
