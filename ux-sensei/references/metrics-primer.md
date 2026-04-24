# Metrics Primer for Designers

## Why Designers Need to Know Metrics

Here's the brutal truth: in a product company, if you can't connect your design decisions to numbers, you're always going to be in the "soft skills" bucket. The moment you can say "this change should improve checkout completion by 5-8% based on what we know about form abandonment" — you get taken seriously at the table.

You don't need to be a data analyst. You need to know enough to have the conversation.

---

## The Metrics That Actually Come Up in Product Companies

### Conversion Rate (CR)
**What it is:** % of users who complete a desired action.
**Formula:** (Completions / Total visitors) × 100
**Example:** 1,000 people visit the pricing page. 40 click "Start Free Trial." CR = 4%.
**Design relevance:** Almost every design decision on a key flow should be framed around "will this increase or decrease conversion?"

### Drop-off Rate / Funnel Drop-off
**What it is:** % of users who leave at a specific step in a flow.
**Example:** 1,000 start checkout. 700 reach payment step. 400 complete purchase. Drop-off from checkout to payment = 30%. Drop-off from payment to completion = 43%.
**Design relevance:** High drop-off at a step = that step has a UX problem. Your job is to find and fix it.

### Bounce Rate
**What it is:** % of users who land on a page and leave without doing anything.
**Example:** 60% bounce rate on the homepage = 6 out of 10 people who land there leave immediately.
**Design relevance:** High bounce usually means the page isn't communicating value fast enough, or the user's expectation (from ad/search) doesn't match what they see.

### Exit Rate vs. Bounce Rate (People Always Confuse These)
- **Bounce:** User came to this page first, did nothing, left.
- **Exit:** User visited other pages, then left from this page.
High exit rate on a checkout confirmation page = fine (they completed the task). High exit rate on a product page = problem.

### Task Completion Rate
**What it is:** % of users who successfully complete a specific task.
**How it's measured:** Usability testing (moderated or unmoderated), analytics tracking.
**Design relevance:** This is the most direct measure of whether your UX works.

### Time on Task
**What it is:** How long it takes a user to complete a task.
**Design relevance:** Shorter isn't always better (reading content should take time). But for functional tasks (finding a product, completing a form), longer time = more friction.

### NPS (Net Promoter Score)
**What it is:** Users answer "How likely are you to recommend this to a friend?" on a 0-10 scale.
- 9-10: Promoters
- 7-8: Passives
- 0-6: Detractors
**NPS = % Promoters - % Detractors**
**Design relevance:** Low NPS often indicates systemic UX problems, not just surface-level bugs.

### CSAT (Customer Satisfaction Score)
**What it is:** "How satisfied were you with [this experience]?" Usually 1-5 or 1-10.
**Design relevance:** More specific than NPS. Good for measuring satisfaction with a specific feature or flow.

### Retention Rate
**What it is:** % of users who come back after their first visit/session.
**Day 1, Day 7, Day 30 retention** are common benchmarks.
**Design relevance:** Onboarding UX directly affects Day 1 retention. Core UX of the product affects Day 7 and Day 30.

### DAU/MAU (Daily Active Users / Monthly Active Users)
**What it is:** How many unique users engage with the product each day or month.
**Design relevance:** Features you design can directly impact these numbers. If a feature is hard to use, people stop using it, DAU drops.

---

## How to Use Metrics as a Designer

### In design reviews:
Instead of "I think users will like this better" → say "the current design has a 68% drop-off on this step. This change removes the friction point I believe is causing it. If we A/B test it, I'd expect to see drop-off reduce to 50-55%."

### In audits:
When you identify a problem in an audit, always ask: "What metric does this affect?" If you can't answer that, the finding is weak.

### In presentations:
Frame recommendations with: "This change is expected to impact [metric] because [reason]. The effort to implement is [low/medium/high]."

---

## Metrics Cheat Sheet: What to Track for Each Type of Work

| Work Type | Key Metrics |
|-----------|-------------|
| E-commerce product page | Conversion rate, Add-to-cart rate, Bounce rate |
| Checkout flow | Funnel drop-off per step, Cart abandonment rate |
| Onboarding | Day 1 retention, Task completion rate, Time to first value |
| Feature adoption | Feature usage rate, DAU, Time on task |
| Overall product health | NPS, Retention (D1/D7/D30), DAU/MAU |
| Form / lead gen | Form completion rate, Field-level drop-off |

---

## The "I Don't Have Data" Problem

In many junior roles and freelance projects, you won't have access to real analytics. Here's what you do:

1. **State what you'd want to measure** — Shows you understand metrics even without access
2. **Use industry benchmarks** — E.g., "Average checkout abandonment is 70%. If this product is above that, the UX is underperforming"
3. **Run lightweight qualitative research** — 5 users navigating the product while talking out loud gives you proxy data
4. **Propose A/B testing** — Suggest what should be tested and what metric the test would move
