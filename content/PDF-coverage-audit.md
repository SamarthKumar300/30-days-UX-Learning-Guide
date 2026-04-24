# PDF Coverage Audit

Date: 2026-04-07

Scope:
- `docs/source-pdfs/Complete Interview Kit - Product-UX Design/Part 1 - Understand Product Design from Basics to Advanced.pdf`
- `docs/source-pdfs/Complete Interview Kit - Product-UX Design/Part 2 - Interview Round Playbook.pdf`
- `docs/source-pdfs/Complete Interview Kit - Product-UX Design/Part 3 - Interview Simulation & Real-World Practice.pdf`
- `docs/source-pdfs/Complete Interview Kit - Product-UX Design/Part 4 -  Interview Readiness Lab (Practice + Resources).pdf`
- `docs/source-pdfs/Complete Interview Kit - Product-UX Design/Part 5 - Design in the Age of AI.pdf`

Website study surface audited against:
- `content/Day-wise-content.md`
- `js/v2-plan.js`
- `js/v2-renderer.js`

## Method

This audit was done in three layers:

1. Extract PDF text with `pdftotext`
2. Compare chapter / round / section structure against the 56-day website curriculum
3. Probe for distinctive concepts that are easy to miss even when titles look aligned

This is a practical concept-by-concept coverage audit. The goal is not sentence duplication. The goal is to ensure that no meaningful concept, framework, scenario pattern, example lesson, or implementation-relevant nuance from the PDFs is absent from the website content plan.

### Paragraph-Fidelity Standard

Where PDF sections were rewritten more compactly for the website, the review standard used here was:

- preserve the concept itself
- preserve the reason the concept matters
- preserve any example detail that changes the lesson, not just the example name
- preserve any framework step or tradeoff that affects how the content would be implemented or defended in interviews

This means compression is acceptable only when the shorter version still carries the same substantive meaning needed for study and implementation.

## Overall Status

Current website content status:

- Days 1-56 now have on-site study-guide content available through `content/Day-wise-content.md`
- The learner-facing flow no longer depends on opening PDFs to study the curriculum
- The later-week days are no longer migration stubs

Audit verdict after second-pass review:

- No critical structural gaps remain across Parts 1-5
- No open concept-level gaps remain in the current audit watchlist
- Major concepts from all five PDFs are represented in the website study flow
- Previously missed minor concepts were added or explicitly captured during this audit
- Remaining differences are about packaging and maintenance visibility, not missing curriculum substance

## Part-by-Part Audit

### Part 1: Understand Product Design from Basics to Advanced

Status: Strong coverage

Covered strongly in Days 1-21:
- product design Venn and lifecycle
- problem framing and assumptions
- behavioral segments and JTBD
- emotional precision and emotional transitions
- research methods and qual/quant integration
- rationale, stakeholder language, and metrics
- scale, product maturity, and systems thinking
- strategic product case studies and failure analysis

Spot-check concepts confirmed on-site:
- Product Design Venn diagram
- problem framing
- behavioral segments
- JTBD
- emotion mapping
- stakeholder communication
- product thinking
- Google Wave / Quibi failure analysis

Risk level: Low

Paragraph-fidelity notes:
- example-heavy sections were re-checked so they keep the lesson, not just the brand reference
- examples confirmed with substantive detail preserved include Instagram Stories, Duolingo streaks, Slack notifications, Google Maps left-turn research, Airbnb photography research, Amazon one-click ordering, Google Wave, and Quibi

### Part 2: Interview Round Playbook

Status: Good coverage after audit fixes

Covered across Days 22-35 and 43-49:
- portfolio screening and the 60-second scan
- intro / HR / hiring-manager call logic
- framing-round behavior
- whiteboard / live exercise structure
- take-home round expectations
- case study deep-dive
- product thinking round
- culture and leadership round
- six-round interpretation as one system of evaluation

Distinctive Part 2 concepts now represented:
- 60-second scan logic
- `My Role` visibility
- incognito / multi-device portfolio testing
- NDA-safe storytelling guidance
- STAR + Reflection
- whiteboard / take-home scope discipline
- leadership without title
- saying no with reasoning and alternatives

Fine-grained notes:
- the website intentionally merges overlapping round checklists into unified teaching sections instead of duplicating every checklist flavor as a separate artifact
- this is acceptable because the underlying concepts are preserved on-site

Risk level: Medium-Low

Paragraph-fidelity notes:
- the website compresses some round-by-round checklist phrasing, but the evaluative logic behind each round remains preserved
- candidate-behavior nuance that could be flattened by compression was re-checked, including NDA-safe storytelling, explicit role ownership, silent evaluation during intro calls, and scope discipline in live rounds

### Part 3: Interview Simulation & Real-World Practice

Status: Good coverage, some nuance merged rather than itemized

Covered across Days 29-35, 45-49, and practice-lab sections:
- live simulation mindset
- case study defense structure
- follow-up question handling
- forward-looking defense style
- common interview traps
- behavioral and culture scenario logic
- resilience and accountability framing

Distinctive Part 3 concepts confirmed on-site:
- remove-the-screenshots test
- "what would you do differently" framing
- explicit signposting
- forward-looking close
- over-designing
- chasing validation
- tool narration
- defensiveness
- resist distributing blame

Fine-grained notes:
- "handling silence" is now explicitly surfaced in the verbal communication curriculum
- some behavioral scenario examples are represented as reusable frameworks rather than as a much larger scenario bank, which is acceptable for curriculum delivery so long as the decision patterns remain present

Risk level: Medium

Paragraph-fidelity notes:
- the second pass specifically re-checked the explanation-rich sections on thinking out loud, pause-vs-proceed judgment, case-study defense, reflection, pushback handling, and behavioral accountability
- explicit handling of silence and visible pauses was added because the PDF gave that idea more weight than the earlier website rewrite did

### Part 4: Interview Readiness Lab

Status: Conceptually covered, resource-detail coverage still compressed

Covered across Days 3-53 and Days 50-56:
- all 30 design challenges are represented in the program structure
- practice-lab framing
- challenge usage and repetition logic
- 14-day prep-plan principles
- mock-interview repetition and reset logic
- the core idea that readiness comes from practice, not passive reading

Distinctive Part 4 concepts now represented:
- challenge bank as practice, not checklist
- resources are not the syllabus
- interview skill comes from repetition
- 14-day plan as sharpening, not expansion
- reset/recovery as part of the plan
- visibility / mock-interview resource categories

Fine-grained notes:
- the named resource list from Part 4 is preserved below in this audit as an implementation checklist so it is not lost during rollout
- on the website these resources should remain optional support material, not core study-guide dependencies

Risk level: Medium

Paragraph-fidelity notes:
- the challenge bank is intentionally not mirrored prompt-by-prompt inside the study tabs, but the readiness logic around pressure practice, repetition, and resource usage is preserved
- the named resource list is preserved in this audit to prevent accidental loss during implementation, even though those items remain optional support rather than core lesson content

### Part 5: Design in the Age of AI

Status: Strong coverage with a few remaining detail-level opportunities

Covered across Days 36-42:
- what AI changes and what it does not
- AI impact matrix
- designer AI stack
- research synthesis and exploration leverage
- process shift from linear to loop-based
- AI product design and trust calibration
- the designer's changing role
- AI interview-answer strategy

Distinctive Part 5 concepts confirmed on-site:
- AI Impact Matrix
- Designer's AI Stack
- Figma MCP
- v0 / vibe-coding workflow
- Right Tool, Right Moment framework
- high-quality prompt elements
- trust calibration and failure modes
- AI Interview Answer Stack
- major AI-answer failure modes

Fine-grained notes:
- the "specificity stress test" is now explicitly surfaced in the AI interview curriculum
- some PDF exercises remain merged into broader daily practice framing, which is acceptable when the underlying capability being trained is preserved

Risk level: Medium-Low

Paragraph-fidelity notes:
- the second pass re-checked the language-design sections to ensure the website preserves system-prompt design, response-structure choices, tone calibration, sensitive-request handling, and the specificity-versus-flexibility tradeoff
- this nuance mattered because a shorter AI summary can accidentally reduce "designing AI behavior" into generic tool fluency unless these details stay explicit

## Audit Fixes Made During This Pass

The following notable concepts were added or tightened during the audit:

- portfolio incognito and multi-device testing
- explicit `My Role` and NDA-safe case study guidance
- STAR + Reflection
- saying no with collaborative reasoning
- explicit signposting and forward-looking defense
- distribute-blame warning in behavioral answers
- named visibility and mock-prep resource categories
- practice-not-reading principle from Part 4
- Figma MCP and vibe-coding workflow details
- high-quality prompt elements
- trust calibration failure modes
- explicit handling-silence guidance
- explicit AI specificity stress-test guidance
- explicit AI language-design toolkit guidance

## Second-Pass Minor Concept Checklist

This section records the small-but-important concepts that were easy to miss during the first migration pass and confirms whether they are now preserved.

### Part 2 and Part 3 interview nuance checklist

- `My Role` is explicit in portfolio and case-study teaching: confirmed
- NDA-safe storytelling is explicit rather than implied: confirmed
- incognito and multi-device portfolio checks are explicit: confirmed
- STAR + Reflection is preserved for behavioral answers: confirmed
- saying no with reasoning and alternatives is preserved: confirmed
- explicit signposting is preserved: confirmed
- forward-looking close after defense questions is preserved: confirmed
- remove-the-screenshots test is preserved: confirmed
- distribute-blame warning is preserved: confirmed
- handling silence and visible pauses are explicit: confirmed
- calm communication under pressure remains present across whiteboard / presentation content: confirmed

### Part 4 readiness nuance checklist

- problem statements are for pressure practice, not passive reading: confirmed
- resources are not the syllabus: confirmed
- practice beats collection of frameworks: confirmed
- 14-day plan is sharpening, not expansion: confirmed
- reset / recovery is part of prep, not failure: confirmed
- visibility resources are preserved as optional support: confirmed
- mock interview tools are preserved as optional support: confirmed
- portfolio / critique resources are preserved as optional support: confirmed
- AI prep tools from Part 4 are preserved as optional support: confirmed

### Part 5 AI nuance checklist

- Figma MCP is called out explicitly: confirmed
- vibe-coding tools are called out explicitly: confirmed
- five-element prompt framework is preserved: confirmed
- trust calibration is explicit: confirmed
- trust calibration failure modes are explicit: confirmed
- system-prompt / language-design tradeoff between specificity and flexibility is preserved conceptually: confirmed
- language-design toolkit items are explicit: system prompt, response structure, tone calibration, ambiguous-request handling: confirmed
- AI interview answer stack is explicit: confirmed
- specificity stress test is explicit: confirmed
- judgment over tool fluency is preserved: confirmed

## Paragraph-Fidelity Review Summary

The second-pass review also checked whether compressed website sections had dropped important explanatory value from the PDFs.

Result:

- no known major example lesson was found to be reduced to a meaningless label
- no known framework was found to have lost a step that changes how a learner would apply it
- several explanation-heavy nuances were strengthened during this pass because the PDF treatment carried more meaning than the shorter website wording

Strengthened during paragraph-fidelity review:

- visible-pause / handling-silence explanation
- AI specificity stress-test explanation
- AI language-design toolkit explanation

Remaining caution:

- the website is still intentionally more concise than the PDFs
- if future implementation trims sections further, this audit should be used to prevent loss of example detail or tradeoff logic

## Part 4 Named Resource Preservation List

These named resources appeared in Part 4 and were re-checked so they are not forgotten during implementation. They should remain optional support resources, not required study steps.

Websites / reading:
- CareerFoundry Blog
- Laws of UX

Newsletters:
- Weekly Product Design Challenges
- UX Design Weekly
- NN/g Newsletter
- UX Collective Newsletter
- Lenny's Newsletter
- DESK by Tobias van Schneider

Podcasts:
- Lenny's Podcast
- Design Better
- High Resolution Podcast
- UX Podcast

Practice / community:
- Dribbble
- Figma Community
- Reddit `r/userexperience`
- Reddit `r/design_critiques`
- Toptal Product Design Interview Questions

Mock interview / practice tools:
- UX Design Mock Interviews by I Got an Offer
- Exponent Product & UX Design Interviews
- Pramp
- Adaface UX Mock Interview
- Practice Brief Sites: FakeClients, GoodBrief, UX Challenge Generator

Case study / portfolio review:
- User Interviews portfolio guides
- UX Planet portfolio case study template

AI prep partner tools:
- Mockin
- Final Round AI
- MockTrail

## Runtime Verification

Checks completed:

- all 56 days resolve to on-site study content
- no later-week days are empty
- render check passes

Verification notes:
- `node scripts/_render-check.js` passes
- parser check confirms no days are missing study content

## Recommendation Before Final Website Push

Recommended next step:

1. Use this audit as the implementation checklist while migrating final website copy
2. Keep optional resources clearly separated from the core study-guide surface
3. If desired, add a compact audit-to-website mapping table for future maintenance

## Bottom Line

The website is now structurally aligned with all five PDFs, and the major and minor concepts specifically tracked in this second-pass audit are represented on-site or preserved in this audit as optional-support implementation references.

This audit justifies saying:

- the website no longer depends on PDF study
- the curriculum substance from Parts 1-5 is on-site
- the remaining work is implementation rollout quality, not missing concept discovery
