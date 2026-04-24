# Stakeholder Communication & Design Rationale

## The Skill Nobody Teaches You

Design school and bootcamps teach you to make things. Product companies need you to also *explain* things. A brilliant design that you can't defend is worth less than a decent design you can articulate clearly.

---

## The Design Rationale Formula

Every design decision should be explainable in this structure:

**"I chose [X] because [user need/pain point], which is supported by [evidence/principle]. The alternative was [Y], but it has [trade-off]. The expected outcome is [Z]."**

**Example:**
"I moved the CTA above the fold because user testing showed 40% of users weren't scrolling to find it, which directly explains our low conversion rate. The alternative was keeping the long product description first, but that prioritizes information over action — and for return visitors who already know the product, that's unnecessary friction. Moving the CTA should reduce the steps to conversion and we can validate it with a simple A/B test."

That's a senior designer talking. No jargon. Clear problem, clear reasoning, clear trade-off, clear next step.

---

## How to Present Designs in a Review

### The wrong way (junior pattern):
"So here's the homepage. The hero image is here, and below that I put the features section, and then there's a CTA at the bottom..."

This is describing what they can already see.

### The right way:
1. **Start with the user problem** you're solving (30 seconds)
2. **State the business goal** this design serves (15 seconds)
3. **Walk through key decisions** — not every element, just the 2-3 choices that were deliberate and non-obvious
4. **Anticipate questions** — address the obvious "why not X?" before they ask
5. **Tell them what you want from them** — "I need feedback on whether the hierarchy works, not visual preferences today"

---

## Handling "Just Make It Pop"

This is the most common piece of vague stakeholder feedback. Here's how to handle it:

**Step 1:** Don't get defensive. Don't agree either.

**Step 2:** Ask a clarifying question that redirects to a real problem:
- "When you say 'pop' — what specifically feels flat to you right now? Is it the color, the hierarchy, the imagery?"
- "Is there a reference — a competitor, or something else — that has the energy you're thinking of?"
- "What's the main thing you want users to notice first on this screen?"

**Step 3:** Reframe their feedback as a design problem you can solve:
"It sounds like the hierarchy isn't directing attention to the value proposition clearly enough. Let me try increasing the contrast on the headline and the CTA, and see if that gives you what you're looking for."

You've now turned vague feedback into a specific problem with a specific solution you control.

---

## Writing Design Rationale in Docs (Notion, Confluence, Figma Annotations)

In product companies, design decisions often need to be documented so PMs and engineers understand *why* something was designed a certain way, especially after you've moved on.

**Good annotation example:**
> "Inline validation on this field: We added real-time error feedback because form research shows users are 22% more likely to complete a form when they can fix errors in context rather than on submit. This adds dev effort but reduces support tickets about failed submissions."

**Bad annotation:**
> "Error state for the field."

---

## Handling Pushback in Real Meetings

**Scenario:** PM says "Can we just put another CTA in the sidebar too? More options = more chances to convert."

**Wrong response:** "Okay sure." (You just let a bad UX decision through.)

**Also wrong response:** "No, that's bad UX." (Dismissive, no rationale.)

**Right response:**
"That's worth exploring — the intention makes sense. The risk with multiple CTAs on the same page is choice paralysis — when users see two competing actions, they often take neither. There's a good amount of research on this, including studies on the jam experiment. I'd suggest we run a quick test: version A with one CTA, version B with two, and let conversion data decide. Does that work?"

You've respected their idea, explained the risk, proposed a test. That's senior-level stakeholder management.

---

## The Emails & Slack Messages Designers Forget Matter

How you write in Slack and email shapes how people perceive your thinking. Quick tips:

- **Don't just share a Figma link.** Add 2 sentences of context: "Here's the updated checkout flow. Key change: moved shipping cost disclosure to step 1 based on our drop-off data. Feedback welcome on the layout."
- **When asking for feedback, be specific.** "Does this work?" is unanswerable. "Does the hierarchy make the primary action clear enough?" is answerable.
- **When you're blocked, say so and say why.** "I'm blocked on this until I know whether we're supporting guest checkout — can we align by EOD?" Shows ownership, not helplessness.
