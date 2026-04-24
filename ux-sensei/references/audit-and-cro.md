# UX Audit & CRO Reference

## What Is a UX Audit, Really?

Forget the textbook definition. Here's what it actually is:

You open a product — could be a competitor's, could be a client's, could be your own — and you systematically look for the places where users are likely getting confused, frustrated, or leaving. Then you explain *why* those problems exist, and what the business cost of those problems probably is.

That last part is the part juniors always miss. You're not just listing problems. You're connecting them to money.

---

## The 3-Layer Audit Framework (Real World)

### Layer 1: The Quick Scan (First 10 Minutes)
Before you open any research data, just use the product as a user.

Ask yourself:
- What is this screen trying to get me to do?
- Is it obvious? How long did it take me to figure that out?
- What's the first thing my eye went to?
- Did I hit any moment of confusion, even small?
- What would make me leave this page right now?

Write these raw reactions down. This is your gut audit. It's more valuable than it sounds because you're simulating a first-time user experience.

### Layer 2: The Heuristic Pass (30-45 Minutes)
Now you go screen by screen, or flow by flow, and check against 5 core heuristics (not all 10 Nielsen heuristics — just the 5 that matter most in real products):

1. **Clarity of purpose** — Does every screen have one clear action? Or is it trying to do three things at once?
2. **Feedback & system status** — When a user does something, does the product confirm it happened? (Loading states, success messages, error states)
3. **Error prevention & recovery** — Are there moments where a user could easily make a mistake? What happens when they do? Is recovery easy?
4. **Consistency** — Do similar things look and behave the same way throughout the product? (Button styles, link styles, form behavior)
5. **Cognitive load** — How much is the user being asked to think, remember, or process at once?

For each issue you find, write:
- **What**: Describe the problem
- **Where**: Screen/flow/component
- **Why it matters**: What does a user feel or do when they hit this?
- **Severity**: High (blocks task), Medium (slows down or confuses), Low (minor friction)

### Layer 3: The Data Pass (If You Have Access)
This is where you layer in numbers:

- **Heatmaps** (Hotjar, Microsoft Clarity) — where are users actually clicking vs. where you expect them to?
- **Session recordings** — watch 5-10 real users navigating the product. You'll see things no audit checklist will catch.
- **Analytics** — where in the funnel are users dropping off? What's the exit rate on each page?
- **Conversion rate** — what % of users complete the intended action?

If you don't have access to these, say so in your audit and note what data you'd want to validate your findings.

---

## CRO (Conversion Rate Optimization) — What It Actually Means

CRO means: making more of the people who visit a page actually do the thing you want them to do.

The "thing" could be:
- Adding to cart and checking out
- Signing up for a free trial
- Submitting a lead form
- Upgrading from free to paid

**The formula:** Conversion Rate = (Number of conversions / Number of visitors) × 100

A 2% conversion rate on an e-commerce page means 98 out of 100 people who landed on your product page left without buying. CRO is figuring out why and fixing it.

### The 5 Most Common CRO Killers (In Real Products)

1. **Unclear value proposition above the fold** — Users can't immediately answer "what is this and why should I care?"
2. **Too many options / choice paralysis** — The paradox of choice is real. More buttons ≠ more conversions.
3. **Trust signals missing or buried** — Reviews, ratings, security badges, social proof. If users don't trust you, they don't buy.
4. **Form friction** — Every field you add to a form reduces completion rate. Ask only what you need.
5. **CTA (Call to Action) clarity** — Is the primary action obvious? Is the button text descriptive or generic? "Get Started" vs. "Start Your Free Trial" — the second converts better because it answers "what happens when I click this?"

---

## How to Do a CRO Audit Step by Step

**Step 1: Define the conversion goal**
What is the ONE action this page/flow is trying to drive? If there's more than one, that's already a problem.

**Step 2: Map the user journey to that conversion**
Write out every step a user takes from landing to converting. This is your funnel.

**Step 3: Identify drop-off points**
Where are users leaving? If you have data, use it. If not, use your Layer 1 and Layer 2 audit to hypothesize.

**Step 4: For each drop-off point, ask "Why?"**
Is it confusion? Mistrust? Too much friction? Competing distractions? Wrong message?

**Step 5: Prioritize fixes by impact vs. effort**
Make a 2x2:
- High impact, low effort → Do immediately
- High impact, high effort → Plan for next sprint
- Low impact, low effort → Do if there's time
- Low impact, high effort → Skip

**Step 6: Write your recommendations with rationale**
Don't just say "fix the CTA." Say: "The CTA button says 'Submit' which gives no information about what happens next. Users are likely hesitating because of uncertainty. Changing it to 'Get My Free Quote' (or equivalent) should increase clicks because it sets clear expectations."

---

## Real Example: Auditing a Product Page (E-commerce)

Let's say you're auditing a product detail page (like the Bow & Square assignment).

**Quick scan questions:**
- Can I tell what this product is in 3 seconds?
- Is the price visible without scrolling?
- Is the Add to Cart / Buy Now button immediately visible?
- Do I trust this site enough to enter my card details?
- Are there reviews? Are they real-looking?

**Common issues found in real product page audits:**
- Hero image doesn't show the product in use (just plain product on white — lower trust)
- Price is hidden or unclear (taxes, shipping not shown upfront → cart abandonment)
- Product description is manufacturer copy, not benefit-led
- Size/variant selector is confusing or has no size guide
- Reviews exist but are buried below the fold
- No urgency signals (stock levels, delivery estimate)
- Mobile: CTA button is below the fold on first load

**How to frame your findings to a PM or client:**
"The product page currently has 3 trust signal gaps that are likely contributing to cart abandonment. The biggest is that shipping cost isn't disclosed until checkout — industry data consistently shows this is a top reason for abandonment. A quick fix would be adding estimated shipping cost near the CTA, which requires no redesign and could be A/B tested in a week."

That's how you talk about audit findings like a senior designer.

---

## Audit Output Formats (What to Actually Deliver)

Depending on context:

- **For a freelance client**: A Notion doc or Figma presentation with annotated screenshots, severity ratings, and prioritized recommendations. Keep it under 10 pages.
- **For a job interview assignment**: Structured PDF or Figma presentation. Show your thinking process, not just conclusions.
- **For your own team**: A Jira epic or Notion table with each issue, severity, owner, and proposed fix.
- **For a design crit**: A 5-minute verbal walkthrough hitting the top 3 issues, with proposed solutions. Don't list everything — pick the 3 that matter most.
