# AI-Integrated UX Workflows

## The Core Principle

AI doesn't replace UX thinking. It compresses the time it takes to do UX work. Your job is still to think critically — AI just helps you move faster through the parts that used to take hours.

---

## Workflow 1: Freelance Project (Brief to Delivery)

### Phase 1: Scope & Understand (Day 1)
**With AI:**
- Feed the client brief to Claude and ask: "What UX problems is this client actually trying to solve? What are they not saying but probably mean?"
- Ask Claude to generate 5 clarifying questions you should ask the client before starting
- Ask Claude to identify what success metrics this project should be measured against

**Without AI (your job):**
- Have the actual client call
- Decide which clarifying questions are worth asking
- Agree on deliverables and timeline

### Phase 2: Research (Day 1-2)
**With AI:**
- "What are the top 3 competitors for [client's industry]? List their key UX patterns on [specific page/flow]"
- "What are common user pain points in [industry] products?"
- Generate a proto-persona based on the client's target audience description
- Ask AI to find relevant case studies or UX patterns

**Your job:**
- Validate AI-generated personas against real user input if possible (even 3 quick user calls)
- Add client-specific context that AI doesn't have

### Phase 3: UX Audit of Existing Product (If Applicable)
**With AI:**
- "Here are my audit notes from [product]. Help me prioritize these findings by business impact"
- "Write a design rationale for why [finding] is a problem and what fixing it would likely improve"
- "What severity would you give this UX issue and why?"

**Your job:**
- Do the actual audit yourself first (AI can't feel friction — you can)
- Use AI to stress-test your reasoning

### Phase 4: Wireframes & Design (Day 3-5)
**With AI:**
- "What are the standard UX patterns for [type of screen]? List 3 options with their trade-offs"
- "I'm designing a [checkout/onboarding/dashboard]. What edge cases am I probably missing?"
- "Review this user flow: [describe it]. Where are the likely points of confusion?"

**Your job:**
- Actually design in Figma (AI can't do this for you)
- Make the final call on design decisions

### Phase 5: Presentation & Handoff
**With AI:**
- "Write a design rationale for this decision: [describe your choice and why]"
- "Help me write a 3-sentence summary of the key UX improvements and their expected impact"
- "What questions might a client ask about this design? Help me prepare answers"

---

## Workflow 2: EVP (Existing Value Proposition) Exercise

An EVP exercise is when you need to evaluate whether a product's current design matches what the business says it offers (its value proposition). Companies do this when growth has stalled or conversion is low despite traffic.

### Step 1: Extract the Stated Value Proposition
Ask the client or PM: "In one sentence, what does this product promise the user?"
If they can't answer cleanly, that's already a finding.

**With AI:**
- "Here is [company name]'s website/product description. What value proposition are they communicating to users? Is it clear and differentiated?"
- "Compare this VP against [competitor 1] and [competitor 2]. Where is the differentiation strong or weak?"

### Step 2: Audit Whether the Design Delivers on the VP
Go through the product and check: does every screen, every CTA, every piece of copy reinforce the stated value proposition?

**With AI:**
- "The stated VP is [X]. Here are my observations about the product: [list]. Where is the product contradicting or weakening the VP?"
- "What design changes would strengthen the communication of [VP] on the homepage?"

### Step 3: Competitive Benchmarking
**With AI:**
- "What design patterns do companies in [space] use to communicate their value proposition above the fold?"
- "How do the onboarding flows of [competitor A] and [competitor B] reflect their VP?"

### Step 4: Recommendations
Frame recommendations as: "The current design communicates [X], but the VP promises [Y]. The gap is [Z]. Fixing it requires [specific change]."

---

## Workflow 3: Experimental Feature Design

When a PM comes to you with "we want to add [feature idea]" and you need to design it from scratch.

### Step 1: Problem Framing (Don't Jump to Solutions)
**With AI:**
- "A PM wants to add [feature]. What problem does this likely solve for the user? What are alternative ways to solve the same problem?"
- "What are the risks of adding [feature] to an existing product? What could go wrong UX-wise?"

### Step 2: User Story & Acceptance Criteria
**With AI:**
- "Write 3 user stories for [feature] from the perspective of different user types"
- "What edge cases should I design for in [feature]?"

### Step 3: Journey Mapping
**With AI:**
- "Map out the user journey for [feature] from discovery to completion. Include emotional highs and lows"
- "Where in this journey is the user most likely to drop off or get confused?"

### Step 4: Pattern Research
**With AI:**
- "What are established UX patterns for [type of feature]? Give me 3 examples from real products"
- "What are the trade-offs between [pattern A] and [pattern B] for this use case?"

### Step 5: Stress Testing Your Design
After you've designed in Figma:
**With AI:**
- "Here's my proposed design for [feature]: [describe it]. What are the weakest points? What would a senior designer push back on?"
- "What accessibility issues might this design have?"
- "How would this design break on mobile?"

---

## Workflow 4: Touch-Up / Polish Pass

When a design is functionally done but needs visual and UX refinement before handoff.

### Visual Consistency Audit
**With AI:**
- "Here are the inconsistencies I've noted in my design: [list]. Which ones are high priority for a product company vs. which are minor?"
- "What visual consistency checks should I run before handing off any design?"

### Accessibility Quick Check
**With AI:**
- "My button color is [hex]. My background is [hex]. Is this WCAG AA compliant? What should I change if not?"
- "What are the 5 most common accessibility mistakes on [type of screen]?"

### Copy Review
**With AI:**
- "Review this UI copy: [paste copy]. Is it clear, action-oriented, and consistent in tone? Suggest improvements."
- "Is this error message user-friendly: [paste message]? Rewrite it if not."

### Pre-Handoff Checklist
Ask AI to generate a pre-handoff checklist for your specific project type. Then go through it yourself.

---

## Workflow 5: UX Critique

When you need to critique a design — yours or someone else's.

### Before the Critique
**With AI:**
- "I'm about to critique a [type of screen]. What are the 5 most important things to evaluate?"
- "What's the difference between a good UX critique and just listing visual preferences?"

### During (Structuring Your Feedback)
Use this framework:
1. **What is this trying to do?** (State the goal)
2. **Does it succeed?** (Gut check)
3. **What's the biggest single problem?** (One thing, not ten)
4. **Why does that problem exist?** (Root cause)
5. **What's one concrete fix?** (Actionable, not vague)

**With AI:**
- "Here's my critique of [design]: [your notes]. Help me structure this into clear, actionable feedback that won't come across as just personal preference"
- "Is my reasoning for this critique sound? [describe your critique]. What am I missing?"

### After — Presenting the Critique
**With AI:**
- "How do I frame critique of a junior designer's work in a way that's helpful and not demoralizing?"
- "How do I present design feedback to a PM who thinks the design is already good?"
