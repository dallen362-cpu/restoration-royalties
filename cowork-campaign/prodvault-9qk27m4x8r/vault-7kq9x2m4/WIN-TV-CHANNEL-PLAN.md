# WIN TV — YouTube Weather Channel: Plan, Scripts & Activation Funnel

**Channel:** WIN TV — *Weather Intelligence Network*
**Owner:** TELVERGENCE
**Companion page (built):** `cowork-campaign/win-tv.html` — episode hub + real-time activation + free Safety Line application.

> Honest framing throughout: weather data is real (NWS); the WIN platform is a real product in
> development; the **free "WIN Safety Line" is NOT an FCC Lifeline product** and any subsidized/free
> tier is contingent on funding not yet secured. Don't publicly claim Lifeline/ETC status or
> government backing until designations/agreements exist.

---

## 1. The concept
Short, cinematic **mini-documentaries** about real categories of weather disaster. Each episode:
1. Tells a gripping human story of a storm event (re-created/archival/B-roll).
2. **Naturally** reveals WIN as the through-line — "what if minutes had been bought back?" — positioning
   WIN's AI as *the case study* in turning live data into life-saving action.
3. Ends with a clear, low-friction **call to action**: *Activate WIN in real time during this episode.*
   The video description + end screen + pinned comment all link to `win-tv.html?ep=N`.

**Tone:** documentary, not infomercial. The product earns the spotlight by solving the problem the
story sets up. ~10–14 min episodes, biweekly Season 1 (6 episodes).

## 2. Real-time activation mechanic (already built)
- Each episode description links to `win-tv.html?ep=N` → the page deep-loads that episode and shows
  **⚡ Activate WIN** (→ `funnel.html?v=wintv-epN`) and **🆓 WIN Safety Line** right beside the player.
- The `?v=wintv-epN` token flows into the visit tracker → you see **which episode drove each activation**
  on `watch.html` (and in the Gmail/SMS alerts once the endpoint is live).
- End screen / pinned comment script: *"Activate WIN for your own area in 30 seconds — link in the
  description. Free Safety Line early-access too."*

## 3. Season 1 — episode slate
| # | Title | Event | WIN beat | Runtime |
|---|---|---|---|---|
| 1 | Hurricane Landfall | Cat-4 Gulf Coast | reroute crews + cone alerts before impact | 11:24 |
| 2 | Tornado Alley, 3 Minutes | EF-4 Midwest outbreak | the 3-minute warning window | 9:48 |
| 3 | The Ice Storm Blackout | Northeast ice storm | a 911-ready line when the grid dies | 12:06 |
| 4 | Flash Flood Canyon | Southwest flash flood | geofenced multi-mile warnings | 10:15 |
| 5 | Wildfire on the Wind | Western wildfire | real-time evacuation routing | 13:32 |
| 6 | After the Storm | Nationwide restoration | the recovery economy WIN powers + activate | 14:01 |

## 4. Documentary script template (per episode)
```
COLD OPEN (0:00–0:45)  — archival/B-roll of the event; a real voice/quote. No branding yet.
ACT I  (0:45–3:30)     — the human story: who was in its path, what the stakes were.
ACT II (3:30–7:00)     — the failure of warning/response: where minutes were lost.
THE TURN (7:00–9:00)   — "What if the system had seen it coming?" Introduce WIN as the case study:
                          live NOAA/NWS ingestion → AI dispatch → crews + household alerts.
                          Show the real dashboard (telvergence-demo.html) on screen.
ACT III (9:00–end)     — WIN applied to THIS event, beat by beat; lives/time saved (clearly framed
                          as illustrative modeling, not a claim of actual rescues).
CTA / END SCREEN       — "Activate WIN during this episode — link below. Free Safety Line early access."
```

### Example — Episode 1 voiceover (excerpt, illustrative)
> "Landfall was projected for dawn. By midnight, the models disagreed by forty miles — and forty miles
> is the difference between a warning and a funeral. … This is where the Weather Intelligence Network
> changes the story. WIN doesn't wait for the morning briefing. It reads the same NOAA feeds the
> meteorologists do — every few minutes — and turns them into action: it moves restoration crews toward
> the corrected cone, and it lights up every WIN-activated number inside it. … You can do exactly what
> you just watched. In about thirty seconds, from the phone in your hand. The link is below."

*(Full per-episode scripts: expand each ACT to 1–2 pages; keep claims modeled/illustrative, never
asserting specific real-world casualties prevented.)*

## 5. YouTube setup — YOUR steps (I can't do these for you)
1. **Create the channel** on your Google account → name **"WIN TV — Weather Intelligence Network."**
2. Brand kit (I can generate): logo lockup, banner, thumbnail template (navy/cyan/lime, the WIN mark).
3. Upload episodes; in each **description** paste: `Activate WIN: <site>/cowork-campaign/win-tv.html?ep=N`
4. Add an **end screen** card linking to the same URL; **pin a comment** with the link.
5. Send me the **channel URL** → I drop it into `win-tv.html` (`CHANNEL_URL`) and the Subscribe button.
6. Send me each episode's **YouTube video ID** → I fill the `yt:` field so the players go live.

## 6. The free "WIN Safety Line" — responsible subsidy paths
Goal: a free-to-activate weather-alert + 911-ready safety number for at-risk/underserved households.
**Reality check first:** the word *"Lifeline"* denotes the **FCC Lifeline program**, which requires an
**Eligible Telecommunications Carrier (ETC)** designation we do not hold. Until/unless designated, market
it as the **"WIN Safety Line," explicitly not an FCC Lifeline product.** Funding options to pursue:

- **501(c)(3) non-profit arm** ("WIN Safety Foundation") — donations + grants fund free activations;
  cleanest path to "free for the household." Requires formation + board + filings (counsel needed).
- **Corporate sponsorship / CSR** — insurers, restoration brands, utilities sponsor lines in their
  service areas (sponsor logo in-episode). Fastest realistic path to subsidized free tiers.
- **Disaster-relief & emergency-comms grants** — FEMA/state EM, foundations (e.g., community-resilience
  grants). Competitive; needs a 501(c)(3) or fiscal sponsor.
- **FCC Lifeline (long game)** — only if you pursue ETC designation; real regulatory lift; don't claim
  until granted.
- **Cross-subsidy** — a slice of paid $22.95/mo activations funds a pool of free Safety Lines (built-in
  "activate one, gift one"). You can start this one yourself, today, without anyone's approval.

**Application capture (built):** `win-tv.html` collects email + ZIP + household type into the early-access
list (logged via the tracker; **no SSN**), clearly labeled as a future subsidized program, not a guarantee.

## 7. What's built vs. what needs you
| Built now | Needs you |
|---|---|
| `win-tv.html` episode hub + players (ready for real IDs) | Create the actual YouTube channel |
| Per-episode real-time activation deep-links (`?ep=N`) | Produce/record the documentaries |
| Free WIN Safety Line application + early-access capture | Decide subsidy path (recommend: cross-subsidy now + 501c3 next) |
| Visit-tracking on the page (who activates from which episode) | Legal review before any "Lifeline"/free-service public claim |
| This plan + script template | Send me channel URL + video IDs to go live |
