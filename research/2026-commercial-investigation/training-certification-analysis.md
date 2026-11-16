# Training, Licensing & Certification Analysis — Workstream K

Mission ECHELON-BUSINESS-RESEARCH-2026-001 · retrieval date 2026-11-16 · Source IDs → `sources.csv`; claim IDs → `claims.csv`.

Labels used: **OBS** = observation (directly seen in a repo file or a fetched page) · **ASM** = assumption · **HYP** = hypothesis · **CONC** = conclusion (inference from several observations).

> Research limit, stated up front: the shared WebSearch budget for this turn ran out after about 12 searches. After that I used direct fetches of known primary URLs. Several of those fetches were blocked (PMI, HHS, AHRQ, Good Judgment, LeSS, ICAgile, Prosci certification page, Shared Assessments SIG, CSA CAIQ, APA, ScienceDirect). I do not report prices for those organisations. Any price below that came only from a search-engine summary is labelled as such and given low confidence.

---

## Part A — Audit of Echelon's training assets

### A1. Inventory (what exists)

| Asset group | Location | What it is | Status signals |
|---|---|---|---|
| Public training website (10 pages + redirect) | `REPO:clarity-framework-training/*.html` [SRC-K-001] | Marketing site for "Clarity Framework Training": a 1–2 day facilitated "working session", cohort or private team, invite-only | Intake "not open yet"; no form, pricing, schedule or testimonials (deliberately deferred per README) |
| Positioning essay | `why-clarity-is-necessary.md` [SRC-K-001] | Long-form argument piece | Uses absolute claims (see A5) |
| Teen D&D lab FAQ | `training-dandd/faq.md` [SRC-K-001] | "Clarity Lab — Teen Stress Test Q&A": objection handling for a teenage audience using Dungeons & Dragons | Only file for this audience; no lesson plan |
| UI conformance tests + CI | `tests/ui-conformance/`, `.github/workflows/` [SRC-K-001] | Playwright tests of site layout and behaviour | Unusually mature engineering for a pre-revenue marketing site |
| Training "binder" (~55 files) | `REPO:clarity-framework/training/` [SRC-K-002] | Facilitator guide, two participant packets, run-of-show, Apollo 11 lab, Day-2 modern counter-case, decision template, admissibility cards, pushback and recovery sheets, sponsor checklist, cohort agreement, adoption path 30/90/180, roadmap, sales pitch, executive briefs, 30-slide HTML deck, Typst print source, April workshop manifest | Marked "Tier 1/2/3" distribution; "© Kevin Miller — Internal use" |
| Short-session run sheet | `training/facilitor-training.md` [SRC-K-002] | 60–90 minute "Decision Quality Pilot" with a before/after self-report measurement | Calls the before/after "your entire pilot story" |
| Marketing one-pager | `training/marketing-document.md` [SRC-K-002] | "Decision Posture Assessment", "Created by HelixNote, an Echelon Foundry initiative" | "We're gauging interest" |
| Talks | `REPO:clarity-framework/talks/` [SRC-K-003] | 9-slide "Decision Posture" core deck; five Stir Trek talk prep sheets; speaker notes | Conference-talk channel planned (roadmap Phase 1) |

### A2. Audience (OBS)

The assets name at least five different audiences, and no single primary buyer is chosen:
- Site: "Technical leaders, founders, product and engineering executives" [SRC-K-001].
- Sales pitch: "Architects and senior engineers; Product and technology leaders; People who own irreversible decisions" [SRC-K-002].
- Facilitator guide: rooms of "20–30 participants in table groups" [SRC-K-002]. The site says "Small by design" and "small cohort" [SRC-K-001].
- Executive briefs: executives and sponsors [SRC-K-002].
- `training-dandd/faq.md`: teenagers [SRC-K-001].

**CONC (CLM-K-001):** The materials are written for a technical-leadership audience, but the buyer (who pays, who signs, and for which budget line) is never stated. The 20–30-person room in the facilitator guide contradicts the "small cohort" promise on the site.

### A3. Format (OBS)

There are three different formats, each with its own internal logic:
1. **Two-day workshop** ("Decision Posture"/"Clarity Framework Workshop"). It has a 30-slide deck, Day 1 on naming the decision, the decision spine, admissibility and escalation simulation, and Day 2 on Apollo 11, the modern outage counter-case and transfer. The sales pitch describes it as "Free · Invitation-Only Pilot" [SRC-K-002].
2. **1–2 day private team or cohort "working session"** on the client's real decision (the website) [SRC-K-001].
3. **60–90 minute "Decision Quality Pilot"** with before/after measurement (`facilitor-training.md`) [SRC-K-002].

### A4. Learning objectives (OBS → CONC)

- Explicit, numbered objectives appear in **one** file: `apollo-11-lab.md`, which lists six. Three of them use non-measurable verbs: "Understand why clarity ≠ certainty", "See how posture determines outcomes", "See how trigger interpretation depends on prior trigger calibration" [SRC-K-002].
- Elsewhere, objectives are implicit: "What you practice" and "What you leave with" on the site; "End State … participants should understand" in the Day 2 module [SRC-K-001, SRC-K-002].
- **The core content model differs between documents.** This is the most consequential teaching inconsistency:
  - Deck and participant packet: *Belief → Confidence → Commitment → Trigger → Reversibility*.
  - Talks core deck: *Irreversibility → Constraints → Triggers → Owner*, "always in this order".
  - Website session: *Reality inventory → Distortion scan → Next-step constraints*.
  - Decision check card: five questions (decision / question now / what changes it / owner / cost of waiting).
  - Admissibility is "Admit / Downgrade / Exclude" in the packet but "A — Deciding / B — Posture only / C — Not admissible" on the cards [SRC-K-001, SRC-K-002, SRC-K-003].
- **The positioning differs too.** Talks slide 6: "Not a decision-making framework" [SRC-K-003]. Participant packet: "a practical decision-method training". Facilitator guide: "this is a decision discipline" [SRC-K-002]. Site README: "Decision — the object of diagnosis" [SRC-K-001]. The Clarity README itself says it is not primarily a decision framework (shared brief).
- **The product names differ.** Clarity Framework; Decision Posture ("an applied module of the Clarity Framework"); "Certainty Governance Framework" (executive brief title); HelixNote; Decision Quality Pilot; Decision Posture Assessment.

**CONC (CLM-K-002):** The site README warns that "Frameworks lose authority when language drifts". The training corpus has exactly that drift, across product names, core sequences, and what the thing is. A buyer, or a licensee, could not tell which model is canonical.

### A5. Assessment & evaluation (OBS)

- **Pre-measures:** the "Opening Diagnostic" consists of five multiple-choice self-reports, explicitly "not graded" [SRC-K-002].
- **Before/after:** the short-pilot run sheet collects "Section A" (baseline) and "Section E" (post) self-ratings in the same session and calls them "your entire pilot story" [SRC-K-002]. Same-session, same-source self-report invites demand effects. The transfer meta-analysis literature notes that same-source, same-context measurement inflates relationships [SRC-K-030] (secondary summary).
- **Follow-up:** a 30-day personal commitment, a "2-week check-in (15–30 minutes)" in the cohort agreement, a four-week check-in, and a Low/Medium/High scorecard ("ceremonial compliance risk", "trigger activation") in the adoption follow-up pack [SRC-K-002].
- **Missing (the manifest's own gap list):** "participant_feedback_and_evaluation_form" (high priority, missing) [SRC-K-002].
- **No knowledge or skill test, no observed-behaviour measure, no comparison group, and no delivered-session data** anywhere in the three repos (I found no feedback records, participant results or session logs).

**CONC (CLM-K-003):** The design of the evaluation is thoughtful, especially the explicit "ceremonial adoption" red flags. But no outcome evidence exists. The only measurement the short pilot plans to collect is the weakest kind: same-day self-report.

### A6. Certification (OBS)

"No certification" is a deliberate and repeated stance:
- Site hero: "No certification or badges". FAQ: "Certification incentivizes performance theater" [SRC-K-001].
- Sales pitch: "No certification theater" [SRC-K-002].
- Roadmap: "No certification" in Phase 0, and governing rule "No certification without use" [SRC-K-002].
- Site README lists "Certifications" among items "intentionally absent … may be introduced later" [SRC-K-001].

Tension: the April manifest lists as a gap a "Participant completion artifact (certificate/badge or explicit completion card)" and recommends creating "badge/certificate JSON or template" [SRC-K-002]. This conflicts with the public "no badges" promise. (A completion record is not a certification, but a "badge" is exactly what the site rules out.)

### A7. Maturity (OBS → CONC)

- The intake is not open. The site says it "does not collect or send requests" [SRC-K-001].
- The pilot is described as "Free · Invitation-Only" [SRC-K-002]. No delivery evidence exists.
- The manifest is **stale**. It reports `training/clarity-workshop-deck.html` as missing, but the file exists (12 KB, 30 slides). It also references `training/meeting-clarity-cheatsheet.md`, which does not exist at that path; the file is at the repo root [SRC-K-002; checked locally].
- Module status in the manifest: D1-03 and D2-03 are "partial" [SRC-K-002].
- **CONC (CLM-K-004):** The maturity is "facilitation kit drafted, never evidenced in the market". There is enough material to run a pilot. There is nothing yet to license or certify.

### A8. Hygiene defects (OBS)

| Defect | Detail | Severity |
|---|---|---|
| `boundries.html` | A misspelled legacy page. It now has `noindex`, a canonical link and a 0-second meta-refresh to `boundaries.html`, and is covered by test ULI-A01. It is a deliberate redirect, not an accidental duplicate. It shows an earlier typo was published and is now kept for link compatibility. | Low |
| `README.md` and `readme.md` | Byte-identical duplicates (2,298 bytes each). On case-insensitive filesystems (macOS and Windows defaults) the two names collide, which can cause a checkout conflict or silent overwrite. | Low–medium |
| README begins mid-document | The first line is "All pages share:". The title and intro are missing. | Low |
| "All pages share the same navigation" (README) is false | Navigation differs: `index.html` uses in-page anchors (4 items); `about`, `boundaries`, `engage` and `training` have 4 items; `faq`, `teams`, `privacy`, `404` and `nav.html` have 6; `case-patterns.html` has 7 and is the only page linking to itself. `case-patterns.html` is unreachable from the primary nav of most pages. | Medium (credibility for a "discipline" brand) |
| Privacy page vs site | The privacy page describes "If you submit an intake or contact form…", but no form exists. | Low |
| `facilitor-training.md` | The filename is misspelled. | Low |
| `training/partiif` | An empty file (0 bytes). | Low |
| `training/give-to-gpt-convert.html` | An LLM conversion prompt stored among training materials. | Low (reveals AI-assisted production; check provenance and IP if licensing) |
| Two participant packets | `participant-packet.md` and `participant-packet-2-day.md` use different core models. | Medium |

### A9. Content-accuracy and claim-discipline risks (OBS)

- The site rules forbid "outcome guarantees" and "authority-by-assertion" [SRC-K-001]. Yet `why-clarity-is-necessary.md` asserts "A system without clarity cannot succeed — even temporarily", "Everything else is theater", and "Most system failures trace back to one root cause" [SRC-K-001]. These claims are unsupported and break the site's own tone rules.
- The executive 1-pager claims "Decisions are made faster under pressure, not slower" [SRC-K-002]. The site FAQ answers "Will this help us move faster? Sometimes." [SRC-K-001]. This is an internal contradiction and an outcome claim with no evidence.
- The Apollo 11 lab tells facilitators to reveal that "The decision was made with **less information than the group had**" [SRC-K-002]. The lab itself then concedes the 1201/1202 call "only worked … because the team had already built a usable claim about what that signal meant". In other words, Mission Control had prior knowledge that participants lack. The reveal line overstates the point. I did not retrieve a historical source this session, so this is flagged as RQ-K-006, not asserted as an error.

### A10. IP and licensing state (OBS → CONC)

- `clarity-framework-training` is **MIT-licensed**, "Copyright (c) 2026 Kevin Miller" [SRC-K-001]. MIT lets anyone copy, modify and sell that site content, including the case patterns, boundaries copy and the teen FAQ.
- `clarity-framework` has **no LICENSE file** [SRC-K-002]. By default that means all rights reserved, but the terms of use are unclear.
- Binder pages carry "© Kevin Miller — Internal use". The cohort agreement says participants "may not repackage or resell the training materials" [SRC-K-002].
- `echelon-diagnostic-framework` is MIT-licensed, Kevin Miller [SRC-K-005].
- Ownership is personal (Kevin Miller), while branding cites "HelixNote, an Echelon Foundry initiative". The business-plan sections on licensing (05.08) and training (05.05) are generic template text. They are identical paragraphs with only the title changed and contain no licensing terms, prices or IP-assignment decision [SRC-K-004].
- **CONC (CLM-K-005):** A licensable methodology business currently has no legal basis. There is no IP assignment to an entity, no trademark evidence (no ® or ™ on Clarity, Decision Posture or HelixNote in the files I read), and the licensing is inconsistent (MIT, none, and "internal use"). Some framework expression is already MIT-licensed and cannot be "un-given" for existing copies. This is fixable but must happen before any licensing offer.

### A11. Strengths (OBS, balanced)

- The facilitation scaffolding is unusually complete for a pre-revenue effort: verbatim scripts, timeboxes, "watch for" cues, pushback handling, recovery sheets and a pre-flight checklist [SRC-K-002].
- Several design features match what the transfer literature identifies as transfer levers [SRC-K-027, SRC-K-030]:
  - work on a *real* decision (training design and relevance);
  - a Sponsor Readiness Checklist and "upward enforcement" (work-environment and supervisor support);
  - 30/90/180-day adoption expectations with explicit red flags ("Ceremonial adoption", "Triggers exist but never fire", "Downward-only enforcement");
  - follow-up check-ins.
- There is honest boundary-setting about failure modes ("How This Framework Fails"), and the distribution tiering limits misuse.

---

## Part B — Market research: methodology training & certification businesses

### B1. Market size (OBS, survey-based)

- U.S. training expenditures were **$102.8B in 2025**, up 4.9%. Spending on outside products and services rose 29% to **$16B**. Spending was $874 per learner, and employees received 40 training hours a year, down from 47 [SRC-K-010].
- Method: an email survey of the *Training* magazine database, covering U.S. organisations with 100+ employees, weighted by Dun & Bradstreet size and industry [SRC-K-010].
- Limits: the sample is self-selected and the figure covers all training categories. No number was retrieved for "decision-making / critical-thinking" training specifically (RQ-K-001).
- **CONC:** The pool is large, but $16B of outside spend is spread over every training category. Market size says nothing about Clarity's addressable share.

### B2. Price and economics anchors (retrieved)

| Offering | Price / fee | Source & confidence |
|---|---|---|
| Kepner-Tregoe Problem Solving & Decision Making, virtual public | **$2,295**, three days, MS Teams, 2.1 CEUs | KT store, fetched [SRC-K-011] high |
| KT PSDM in-person public (discounted offer) | $1,895–$2,295 | Search summary of KT store [SRC-K-011] medium |
| KT Root Cause Analysis virtual | $1,835; KT eLearning intros $99–$149 | Search summary [SRC-K-011] medium |
| Scrum.org PSM I assessment | **$200 per attempt** | Search summary of store.scrum.org [SRC-K-015] medium |
| Scrum Alliance Certified Scrum Trainer | **$5,000/yr** annual fee (prorated) with licence agreement | Search snippet from scrumalliance.org; direct fetch 404 [SRC-K-016] medium-low |
| Scrum Alliance CSM renewal | $100 per 2 years + SEUs | Search summary of official renewal page [SRC-K-017] medium |
| SAFe SPC/SPCT renewal | $995/yr | Search summary of Scaled Agile support FAQ [SRC-K-013] low-medium |
| SAFe partner courseware | Per-learner licence required before each course; partners must follow SAI pricing guidelines; licences expire when the partner agreement ends; rosters uploaded within 10 days; audit rights; only active SPCs may teach. No dollar amounts in the agreement. | Scaled Agile Courseware Licence Agreement, fetched [SRC-K-012] high |
| EOS Worldwide implementer (franchise) | Initial franchise fee **$5,000** (2025 FDD Item 7, fn. 1). Monthly membership ~$1,395 and boot camp ~$45,000 are reported only by search summaries (official site, franchisepayback) and are unverified. | fdd.ninja FDD extract, fetched [SRC-K-020] medium; [SRC-K-021] low |
| EOS client cost | ~$20k–$45k/yr, typically two years | Strety (software-vendor blog), search summary [SRC-K-022] low |
| Cynefin Co | No prices on the training page. "All faculty are accredited … by Dave Snowden and the Cynefin Co"; operates "under license from Dave Snowden". | Fetched [SRC-K-023] high (for model; no prices) |
| Decision Education Foundation | Nonprofit 501(c)(3), youth-focused. Free materials with attribution; may not be sold without permission. No prices. | Fetched [SRC-K-024] high (for model) |
| Prosci | Licence offering exists ("A Prosci license was critical…" testimonial); no price retrieved | Fetched homepage [SRC-K-025]; certification page 404 |
| IASSC Six Sigma | Exam question counts (60/100/150); no prices on page | Fetched [SRC-K-026] |
| PMI/PMP, ASQ, ICAgile, LeSS, Good Judgment | **Not retrieved** (403/404 or search budget exhausted) | — |

Scale claims (vendor self-reports): Scrum Alliance community "nearly 1.5 million professionals" [SRC-K-018]. SAFe "1,000,000+ SAFe-trained professionals", "20,000 enterprises", "500+ partners" [SRC-K-014].

### B3. Business-model archetypes observed

1. **Open standard + certifying body** (Scrum). The Scrum Guide is CC BY-SA 4.0 [SRC-K-019]. Revenue comes from assessments ($200 PSM I) [SRC-K-015], trainer licences ($5,000/yr CST) [SRC-K-016] and renewals [SRC-K-017]. Openness drives adoption, and the certifying body monetises *credentialing*, not the content.
2. **Proprietary courseware + partner licensing** (SAFe). Per-learner licences, pricing guidelines, audits, trademark control, and licences that expire with the partnership [SRC-K-012]. Revenue scales with every learner a partner trains. Partners carry the commercial risk and accept heavy control.
3. **Franchise** (EOS). The implementer network operates under a Franchise Disclosure Document, with an initial fee, monthly membership and conference requirements [SRC-K-020, SRC-K-021]. **OBS:** EOS treats its methodology-licensing programme as a franchise. **HYP (CLM-K-010):** a licence that bundles a trademark, required fees and significant operating control or assistance can fall under U.S. franchise regulation. The FTC Franchise Rule text was not retrieved (RQ-K-004), so this is a hypothesis requiring counsel.
4. **Founder-accredited faculty** (Cynefin Co): delivery under licence from the originator, with accreditation of faculty [SRC-K-023].
5. **Public-workshop company** (Kepner-Tregoe): sells seats ($1,835–$2,295) and eLearning; CEUs, not a heavy credential [SRC-K-011].
6. **Nonprofit open materials with non-commercial restriction** (Decision Education Foundation) [SRC-K-024].

### B4. Certification commoditization risk (CONC/HYP)

- **OBS:** Entry credentials are cheap and mass-scale: $200 exam [SRC-K-015], $100 per 2-year renewal [SRC-K-017], communities of 1–1.5M [SRC-K-014, SRC-K-018].
- **HYP (CLM-K-011):** When a credential is held by about a million people, it stops differentiating the holder. Its value shifts to (a) HR screening and RFP compliance and (b) the certifier's fee stream. Echelon could capture neither without brand pull. The site's stance that "certification incentivizes performance theater" [SRC-K-001] is consistent with this risk. It also forgoes the main recurring revenue engine of the archetypes above.
- **CONC (CLM-K-012):** For Clarity in 2026, certification has three problems:
  - it is premature, because there is no delivery evidence (A7) and no demand pull;
  - it conflicts with the brand, because "no badges" is a public promise;
  - it is risky, because certifying people in an unvalidated method invites the credibility collapse the boundaries pages warn about.
  
  The roadmap rule "No certification without use" [SRC-K-002] is the defensible position.

### B5. Open vs proprietary tradeoffs (CONC)

| Dimension | Open (Scrum Guide, CC BY-SA) | Proprietary (SAFe licence) |
|---|---|---|
| Adoption friction | Low: anyone can teach and adapt | High: per-learner licences, SPC-only delivery [SRC-K-012] |
| Revenue capture | Certification, trainer fees, renewals [SRC-K-015..017] | Courseware licences, partner programme, pricing control [SRC-K-012] |
| Quality and brand control | Weak over content; strong over credential names | Strong (audit, trademark, pricing guidelines) |
| Partner appeal | Partners keep margin but face commoditized competitors | Partners get a sellable branded product but accept controls, audits and licence expiry |

**CONC (CLM-K-013):** Echelon's actual state is MIT site content, an unlicensed core repo and "internal use" binder pages. That is the worst of both worlds: no clear permission for adopters, and no enforceable control. The decision should be made explicitly. Given no brand pull, open core (e.g., CC BY-SA for the core concepts, as with the Scrum Guide) plus paid facilitation is more consistent with Clarity's "trust from restraint" positioning than a SAFe-style regime (HYP).

### B6. What would make consultants adopt vs avoid a licensable methodology

Mostly **HYP**, derived from the licence terms observed. No consultant interviews were conducted, and none are claimed.

Adopt when:
- clients ask for the method by name (RFP pull). Market-scale methods show this: SAFe claims 20,000 enterprises [SRC-K-014] (vendor claim);
- the licence supplies ready courseware that saves design cost;
- the brand adds credibility the consultant lacks;
- fees are small relative to day rates (e.g., a $5,000/yr CST fee [SRC-K-016] vs multi-thousand-dollar seat prices [SRC-K-011]).

Avoid when:
- the licence imposes pricing guidelines, rosters, audits and expiry of purchased licences on termination [SRC-K-012]: loss of commercial autonomy;
- the credential is commoditized, so it no longer differentiates (B4);
- the method owner could compete for the same clients;
- the method lacks evidence, so the consultant's reputation carries the risk;
- the method overlaps with what they already sell (KT, Cynefin, pre-mortems etc.).

**CONC (CLM-K-014):** Clarity has no client pull, no evidence and no brand. Under these hypotheses, consultants would have little reason to license it now. The plausible near-term path is the founder delivering training and facilitation, possibly with free or open materials as a lead source, not licensing.

---

## Part C — Evidence on training transfer and debiasing

### C1. The "10% (or 10–20%) transfer" claim — provenance

- **OBS (verified quote):** Baldwin & Ford (1988), *Personnel Psychology* 41: "It is estimated that while American industries annually spend up to $100 billion on training and development, not more than 10% of these expenditures actually result in transfer to the job (Georgenson, 1982)." [SRC-K-027]
- The cited source is Georgenson, D.L. (1982), "The problem of transfer calls for partnership", *Training and Development Journal* 36(10), 75–78 (reference list of [SRC-K-027]).
- A training-industry blog (LSA Global) states Georgenson "cited no studies and conducted no research" and that his words "caught on as if they were factual, not rhetorical" [SRC-K-029] (secondary; not independently verified against Georgenson's text).
- Ford, Yelon & Billington (2011), "How much is transferred from training to the job? The 10% delusion as a catalyst for thinking about transfer", *Performance Improvement Quarterly* 24, 7–24 [SRC-K-028]. I retrieved the citation only, not the text.
- Saks & Belcourt (2006, *Human Resource Management*): training professionals from 150 organisations *estimated* that 62%, 44% and 34% of trainees apply training immediately, at 6 months and at 1 year [SRC-K-031]. These are estimates by trainers, not measured behaviour.
- Blume, Ford, Baldwin & Huang (2010, *Journal of Management* 36(4)): a meta-analysis of 89 studies of transfer predictors. Secondary summaries say cognitive ability, conscientiousness, motivation and transfer climate are positive predictors, and that same-source, same-context measurement inflated relationships [SRC-K-030]. The original was not read.
- **CONC (CLM-K-020):** There is no credible universal transfer rate. The famous 10% figure originated as an unsupported estimate. The better-supported points are that transfer decays over time and depends on trainee, design and work-environment factors. Echelon should not cite a "10–20%" figure in any direction.

### C2. Does debiasing training work?

- **Morewedge et al. (2015)**, *Policy Insights from the Behavioral and Brain Sciences* (author manuscript fetched and read) [SRC-K-032]:
  - Design: two lab experiments with a convenience sample recruited in Pittsburgh, paid $30 + $30. Exp. 1: 243 completed the lab (Game 160, Video 83) and 196 the follow-up. Exp. 2: 238 completed the lab and 192 the follow-up.
  - Results: one-shot training produced "medium to large debiasing effects immediately (games ≥ −31.94% and videos ≥ −18.60%) that persisted at least 2 months later". Exp. 2 had a 12-week follow-up. For confirmation bias the game gave d(pre-post) = 1.68 and d(pre-follow-up) = 1.11. Effects extended to untrained facets and formats.
  - Limitations: there was **no untrained control group** (pre-post comparison, game vs video); the tests were lab bias measures; IARPA funded the work; the authors themselves call for field RCTs.
- **Sellier, Scopelliti & Morewedge (2019)**, *Psychological Science* 30(9), 1371–1379, "Debiasing training transfers to improve decision making in the field" [SRC-K-033] (search summary of the City repository record and BU and APS coverage, medium-high confidence):
  - Design: 290 graduate students in three professional programmes; a one-shot confirmation-bias training. Participants then solved a case modelled on the **Space Shuttle Challenger launch decision** without knowing it measured bias.
  - Result: trained participants were 29% less likely to choose the inferior, hypothesis-confirming solution.
  - Limits: a single field experiment; trained participants also reported lower confidence.
- **CONC (CLM-K-021):** There is credible evidence that *specific, well-designed* debiasing interventions can reduce *specific* biases and transfer to a disguised realistic case. That does **not** validate Clarity's workshop, which was never tested. It does provide a ready template: Sellier et al.'s design (a disguised historical case, a randomised trained vs untrained group, a scored choice). It would fit Clarity's own Apollo and Challenger-style labs and is cheap to run.
- **Contradictory or limiting evidence:** see report.md CON-K-002. I did not retrieve meta-analytic evidence that debiasing *fails* in this session (search budget exhausted, RQ-K-002). The absence of retrieved negative evidence is not evidence of efficacy.

---

## Part D — Recommendations (CONC, for the decision-makers)

1. **Do not build certification or licensing now.** First collect delivery evidence: 6–10 real sessions, as the roadmap itself requires [SRC-K-002].
2. **Fix the canon before any third party sees it.** Pick one name, one core sequence and one admissibility vocabulary. Reconcile the "not a decision framework" positioning. Update the stale manifest.
3. **Resolve IP:** assign IP to the operating entity; choose a coherent licence (open core vs proprietary); check trademark availability for "Clarity Framework" and "Decision Posture" (RQ-K-003).
4. **Replace same-day self-report with a minimal controlled test.** Randomise or wait-list a comparison group on a disguised case scored blind, modelled on Sellier et al. [SRC-K-033]. Add a 30–60 day behavioural follow-up, such as checking whether decision records with triggers exist and whether triggers fired.
5. **Remove claims that break the house rules** (absolutes in `why-clarity-is-necessary.md`, "faster" in the executive 1-pager) and fix the hygiene items in A8.
