# DesignPilot AI Process Workflow

Source: `docs/NoteGPT_TRANSCRIPT_COMPLETE GUIDE TO AI-POWERED DESIGN PROCESS — 4 HOURS.txt`  
Teaching lens used: `ux-sensei/SKILL.md`

This page explains the instructor's AI-powered design workflow in simple, practical language. The important idea is not "AI will design everything." The real idea is: use AI to turn your design process into a repeatable system.

Think of this like setting up a small design factory. Figma holds the design system. Code makes the component interactive and testable. AI connects both sides, follows your rules, creates variations, checks mistakes, and helps your team move faster.

---

## The Big Idea

The instructor is not using AI as a magic prompt box.

He is using AI as an operator that can:

- inspect Figma files,
- clean design tokens,
- read annotations,
- build components in code,
- compare code against Figma,
- generate repeatable Figma instances,
- create full prototype screens,
- publish work to GitHub,
- host prototypes online,
- document components in Figma and on a website,
- turn the entire process into reusable skills.

The senior-level thinking is this:

> Do not ask AI to randomly create designs. First create a clean system, then make AI operate inside that system.

That is the difference between a junior AI workflow and a product-company workflow.

---

## Tools vs Skills

The instructor spends time explaining this because it is the foundation of the whole workflow.

### Simple Analogy

Imagine you hire a cook.

The cook needs:

- ingredients,
- utensils,
- recipe.

These are like AI tools. They are the raw abilities.

But if you say "make Indian food," the cook should already know it should usually be spicy. If you say "make dessert," the cook should know your default preference is chocolate. These repeated preferences are like skills.

### In AI Design Work

Tools are what an MCP gives the AI.

Examples:

- read a Figma selection,
- create a frame,
- rename variables,
- set component properties,
- capture a screenshot,
- write code,
- inspect a file.

Skills are instruction files that tell AI how to use those tools in a specific workflow.

Examples:

- "Create one email row instance in Figma using this component and these rules."
- "Generate documentation for a component."
- "Create an inbox screen from a published template."
- "Run a screenshot review and fix visual issues up to three times."

### Why Skills Matter

Without a skill, you repeat the same long instruction every time.

With a skill, you only say the trigger phrase, and AI already knows the process.

Right direction: turn repeated workflows into skills.  
Wrong direction: keep writing giant prompts manually every time. That makes your workflow slow, inconsistent, and easy to break.

---

## The Instructor's Actual Workflow Map

The entire 4-hour session can be understood as this sequence:

1. Understand MCPs, tools, and skills.
2. Start with one real component: a Notion-style email row.
3. Clean the Figma variables and tokens.
4. Apply spacing, radius, and size tokens to the component and atoms.
5. Build the component in code.
6. Create a browser playground to test component states.
7. Compare the coded component with Figma and fix mismatches.
8. Create a skill that places one configured component instance into Figma.
9. Improve the skill after real test failures.
10. Extend the skill to generate groups of emails and full inbox screens.
11. Build the inbox template in code for real interactive prototyping.
12. Upload the project to GitHub.
13. Host it on Vercel so other people can access prototypes.
14. Create branch-based experiments and PR preview links.
15. Create team prototype folders so designers can share work.
16. Use USPEC-style workflows to document component specs inside Figma.
17. Build web documentation for designers and PMs.
18. Create a documentation skill so every future component can be documented the same way.
19. End with the idea of a "god skill" that can generate this whole workflow for other patterns.

The workflow starts small, proves the loop, then generalizes.

That is the instructor's main strategy.

---

## The Design Philosophy Behind The Workflow

### 1. Start With A Real Component, Not A Fake Demo

He starts with an email row because it has real complexity:

- unread and read states,
- hover state,
- selected state,
- sender grouping,
- message count,
- subject,
- preview text,
- date formatting,
- categories,
- labels,
- trailing icon,
- action bar,
- light and dark mode,
- truncation rules,
- responsive behavior.

This is smart because a simple button would not expose enough workflow problems.

Right direction: choose a component with enough real-world complexity to test the system.  
Wrong direction: test your AI workflow on an easy component, then assume it will work on complex product UI.

### 2. Clean The System Before Asking AI To Build

He does not jump straight into "AI, create UI."

First he cleans:

- raw color variables,
- semantic color variables,
- typography styles,
- spacing tokens,
- radius tokens,
- size tokens,
- atom components,
- component annotations,
- published library components.

This is the same as cleaning your kitchen before cooking. If your Figma file is messy, AI will copy the mess faster.

Right direction: make tokens, components, and annotations clean before automation.  
Wrong direction: use AI on an unorganized Figma file and then blame AI for inconsistent output.

### 3. Code Is Used As A Testing Layer

The instructor builds the component in code because coded UI can be interacted with in a browser.

Figma is strong for structure and visual design. Code is strong for:

- hover behavior,
- responsive behavior,
- interactive filters,
- realistic prototypes,
- sharing URLs,
- documentation pages,
- branch-based experiments.

This is why he says that once the component exists in code, many possibilities open up.

Right direction: use code to create a living prototype and documentation layer.  
Wrong direction: keep everything in static Figma screens when the real question is interaction, behavior, and system usage.

### 4. AI Is Asked To Think In Phases

He breaks the work into phases because the full workflow is too large to do in one prompt.

The phase structure also helps him choose the right model and effort level.

Simple editing can use a cheaper/faster model. Complex planning or skill creation needs a stronger model and higher reasoning.

Right direction: split large AI work into phases with clear checkpoints.  
Wrong direction: give AI one massive vague instruction and expect a production-grade system.

### 5. Every AI Output Must Be Reviewed

The instructor repeatedly checks:

- Figma output,
- browser output,
- screenshots,
- component behavior,
- missing states,
- token mismatches,
- placement mistakes,
- wrong icons,
- broken labels,
- unnecessary tool calls.

This is the most important lesson: AI speeds up production, but the designer still owns quality.

Right direction: use AI to produce, then use your judgment to critique and correct.  
Wrong direction: accept AI output because it "looks done."

---

## Phase-By-Phase Breakdown

## Phase 0: Understand The Setup

### Goal

Prepare the AI environment so it can work with Figma and code.

### What The Instructor Sets Up

- Official Figma MCP.
- Figma Console MCP.
- Figma Desktop Bridge plugin.
- Claude Code or another coding agent.
- A local project folder.
- A Figma file with the component and annotations.

### How He Thinks

He compares the official Figma MCP and Figma Console MCP before using them.

Official Figma MCP is stronger for general design creation and high-level Figma work, especially when paired with skills like `Figma use`.

Figma Console MCP is stronger for specific operations:

- batch operations,
- variable operations,
- design system linting,
- inspecting files,
- screenshots,
- design-to-code checks,
- reading annotations,
- specific component operations.

The key is not "use the MCP with more tools." The key is "use the MCP that fits the job."

### Practical Rule

Use the official Figma MCP when AI needs to behave more like a designer.  
Use Figma Console MCP when AI needs precise, narrow, repeatable operations.

### Wrong Direction

Do not assume more tools automatically means better work. A tool with 94 actions can still be worse for a task if the agent needs broader design judgment.

---

## Phase 1: Clean Color And Typography Variables

### Goal

Make the Figma design system healthier before automation begins.

### What Happens

The instructor asks AI to inspect Figma variables and clean them up.

He specifically tells AI:

- organize raw colors,
- separate neutrals and accent colors,
- rename semantic variables,
- avoid business logic in raw color names,
- make naming more reusable,
- keep the system flexible for future components.

### Why This Matters

If a token is named `emailUnreadBlue`, it is trapped inside one component's business logic.

A better token name is closer to intent:

- `surface/default`,
- `surface/subtle`,
- `content/primary`,
- `content/secondary`,
- `border/default`,
- `fill/accent`.

This allows the same token to work across many components.

### Instructor Thinking

He is not just cleaning names. He is removing future friction.

A design system becomes powerful when tokens are not tied to one feature.

### Practical Steps

1. Ask AI to inspect all color and typography variables.
2. Ask it to propose a naming system.
3. Ask it clarifying questions before applying.
4. Rename raw colors into primitives.
5. Rename semantic colors by usage intent.
6. Manually reorder or group variables if the tool cannot do it.
7. Check the Figma variable panel yourself.

### Sample Prompt

```text
Inspect the Figma variables for color and typography. Propose a clean naming convention.
For raw color values, avoid business logic and separate neutrals from accent colors.
For semantic colors, use intent-based names like content, surface, border, and fill.
Ask me before applying changes.
```

### Right Direction

Use AI to propose and apply systematic naming, but manually review whether the names make sense.

### Wrong Direction

Do not let AI invent random token names and apply them without review. Bad token names become technical debt for every future component.

---

## Phase 2: Create Spacing, Radius, And Size Tokens

### Goal

Move hardcoded layout values into reusable variables.

### What Happens

AI inspects:

- the main email row component,
- atoms inside the component,
- padding values,
- gap values,
- radius values,
- icon sizes,
- notification dot sizes,
- tag button padding,
- action bar spacing.

Then it creates variables and applies them.

### Why This Matters

Hardcoded values are invisible system debt.

If one component uses `6px`, another uses `7px`, and another uses `8px`, the UI slowly becomes inconsistent.

### Instructor Thinking

He does not only tokenize the main component. He also tokenizes the atoms inside it.

That is senior thinking. A component is only as clean as the atoms it depends on.

### Practical Steps

1. Ask AI to inspect spacing, padding, radius, and sizes.
2. Decide a naming convention: t-shirt sizes, pixel names, or scale numbers.
3. Create spacing variables.
4. Apply them to master components and atoms.
5. Verify in Figma.
6. Manually fix missed values.

### Sample Prompt

```text
Review the selected component and all atoms inside it.
Identify paddings, gaps, corner radius values, and fixed sizes.
Create reusable Figma variables for these values and apply them to the component and atom master components.
Ask questions if the naming convention is unclear.
```

### Right Direction

Tokenize the system underneath the component, not just the visible outer frame.

### Wrong Direction

Do not build automation on top of hardcoded spacing. AI will scale inconsistency, not quality.

---

## Phase 3: Build The Component In Code

### Goal

Create a coded version of the component and a browser playground to test it.

### What Happens

AI builds:

- a Next.js project,
- global token files from Figma,
- atom components,
- the email row component,
- utilities for date formatting and sender grouping,
- light and dark themes,
- a component preview playground,
- controls to test variations.

### Why This Matters

Figma shows what the component looks like. Code shows how it behaves.

The browser playground lets the designer test:

- hover state,
- unread state,
- selected state,
- labels,
- long names,
- long subject lines,
- truncation,
- date formatting,
- responsive width,
- dark mode.

### Instructor Thinking

He asks AI to read annotations before coding because annotations contain behavior rules.

Examples:

- sender area is based on viewport width,
- action bar appears on hover,
- date changes format depending on time,
- labels have limits,
- sender names collapse when count is high.

This is important because component behavior often lives in designer notes, not just layer structure.

### Practical Steps

1. Ask AI to extract final token values from Figma.
2. Build global CSS/token files.
3. Build atoms first.
4. Build the main component.
5. Add behavior utilities.
6. Add playground controls.
7. Start local preview.
8. Inspect in browser.
9. Compare with Figma.
10. Fix mismatches.

### Sample Prompt

```text
Build this Figma component in code using the global tokens from Figma.
Do not hardcode component-specific values if a global token exists.
Read the component annotations to understand behavior rules.
Create a browser playground where I can test all important states and configurations.
```

### Right Direction

Use the coded component as a living test environment.

### Wrong Direction

Do not treat the coded version as a one-time export. The real value comes from making it interactive, testable, and reusable.

---

## Phase 4: Check Design Parity Between Figma And Code

### Goal

Find mismatches between the Figma component and coded component.

### What Happens

The instructor notices issues like:

- color mismatch in dark mode,
- tag token mismatch,
- unused tokens,
- hover behavior differences,
- wrong text color,
- missing font files,
- filters not working.

He uses AI and screenshots to compare and fix.

### Why This Matters

Design-to-code mismatch is one of the biggest problems in product teams.

If Figma says one thing and code does another, the design system is no longer a source of truth.

### Instructor Thinking

He does not blindly trust either side.

Sometimes Figma is right. Sometimes code is right. Sometimes the token exists but is unused. The job is to identify which source should be corrected.

### Practical Steps

1. Run the browser playground.
2. Compare with Figma screenshots.
3. Use AI to inspect token usage.
4. Ask AI where Figma and code differ.
5. Fix the source of truth.
6. Verify with screenshot again.

### Sample Prompt

```text
Compare the Figma component and the coded component.
Look for token, color, spacing, and behavior mismatches.
Tell me which side appears incorrect and what should be changed.
After fixing, take a screenshot and verify again.
```

### Right Direction

Treat parity as a required quality gate before building automation on top.

### Wrong Direction

Do not move to skill creation while your base component is visually or behaviorally wrong.

---

## Phase 5: Create A Skill That Generates One Figma Instance

### Goal

Create a reusable skill that can place one configured email row into Figma.

### What Happens

The skill:

- reads the component spec,
- uses the published Figma library component,
- generates realistic mock data,
- asks for user overrides,
- summarizes what it will create,
- waits for confirmation,
- places the component in Figma,
- sets variant and instance properties,
- updates text,
- takes a screenshot,
- reviews output,
- fixes mistakes up to a limit,
- reports final results.

### Why This Matters

This is where the workflow becomes reusable.

Instead of manually creating email rows again and again, the designer can ask:

```text
Create an email row about a candidate review discussion between designers.
```

The skill then understands how to use the real component.

### Instructor Thinking

He changes the approach mid-way.

Instead of asking AI to construct the component from scratch in Figma, he decides AI should initiate an instance of the published master component and customize it.

That is the correct call.

A master component already contains spacing, tokens, variants, and component logic. AI should not rebuild what already exists.

### Practical Steps

1. Publish the component and tokens to the Figma library.
2. Create a project-level skill.
3. Define trigger phrases.
4. Tell the skill where the component spec lives.
5. Tell the skill what user inputs to ask for.
6. Require a summary before Figma changes.
7. Require a checklist during execution.
8. Require screenshot verification.
9. Test it with one row.
10. Improve the skill based on real failures.

### Sample Skill Requirements

```text
Create exactly one configured email row instance.
Use the published Figma library component.
Generate realistic mock data unless the user gives specifics.
Before writing to Figma, summarize what will be created and ask for confirmation.
Create and update a checklist while executing.
After placing the instance, take a screenshot and fix visual issues up to three times.
```

### Right Direction

Use published components as the base and let AI configure them.

### Wrong Direction

Do not ask AI to redraw your design system component from scratch. That breaks consistency and defeats the point of having a design system.

---

## Phase 6: Improve The Skill After Test Failures

### Goal

Make the skill reliable after it makes mistakes.

### What Went Wrong

During testing, AI made several mistakes:

- placed the instance on top of existing frames,
- used the wrong trailing icon,
- failed to update labels inside slots,
- struggled with node IDs,
- used too many tool calls,
- looked for components that were not published,
- showed only one sender name even when the count was high.

### Instructor Thinking

This is one of the most important parts of the transcript.

He does not say "AI failed." He asks:

- What exactly failed?
- Was the issue caused by the MCP?
- Was the skill missing instructions?
- Was the component unpublished?
- Can we cache information to avoid repeated search?
- Should another MCP handle this specific task?
- Should the skill document known limitations?

That is how a senior designer/debugger thinks.

### Improvements Added

- Place new instances in empty canvas space.
- Use the official Figma MCP as fallback for slot issues.
- Add icon logic: only paperclip or calendar where appropriate.
- Add sender count logic.
- Cache stable text node IDs where safe.
- Avoid page-wide searches unless necessary.
- Batch boolean/property writes.
- Publish missing icons.
- Reduce repeated tool calls.
- Add screenshot verification.

### Practical Rule

Every failed AI run is training material for the skill.

Do not just fix the output. Fix the instruction system so the same mistake is less likely next time.

### Right Direction

Turn mistakes into new skill rules.

### Wrong Direction

Manually fix every AI output but never update the skill. That keeps you trapped in the same errors forever.

---

## Phase 7: Extend From One Row To A Full Inbox

### Goal

Update the skill so it can generate full grouped email lists inside an inbox template.

### What Happens

The skill now supports two modes:

- single email row,
- full inbox with groups.

The full inbox mode:

- uses a published inbox template,
- places email rows inside a slot,
- adds section headers,
- groups emails by date logic,
- uses realistic context,
- randomizes rows within rules,
- keeps row data coherent.

Example request:

```text
Create an inbox where the user is a senior product designer at a fast-paced fintech company.
```

The AI creates realistic email groups such as design review, payment onboarding feedback, and stakeholder discussions.

### Instructor Thinking

He does not ask AI to code the template yet because Figma already has the template.

For the Figma generation task, AI only needs to instantiate the template and fill the slot.

This is efficient because it uses the existing Figma system.

### Practical Steps

1. Publish the inbox template and section header.
2. Annotate section header rules.
3. Tell the skill how to detect single-row vs full-inbox mode.
4. Define grouping logic.
5. Define row count limits.
6. Confirm plan before writing.
7. Place the template.
8. Fill the slot with headers and rows.
9. Screenshot and fix.

### Right Direction

Use templates and slots so AI fills structure instead of inventing structure.

### Wrong Direction

Do not ask AI to create a full screen from a blank canvas when a solid template already exists.

---

## Phase 8: Build The Full Inbox Template In Code

### Goal

Create a coded version of the inbox screen so it can become an interactive prototype.

### What Happens

AI builds:

- `/inbox` route,
- sidebar,
- top filter bar,
- email list,
- navigation links,
- hover behavior,
- selection behavior,
- responsive layout.

The instructor keeps the component playground separate from the inbox prototype.

This is important.

The playground is for testing the component. The inbox route is for prototyping real product flows.

### Instructor Thinking

He catches a common problem: AI tries to merge the playground and the product screen.

He corrects it:

> The email playground has nothing to do with this. Build a new page for the current task.

That is good product thinking. Different tools have different jobs.

### Practical Steps

1. Create a separate route for the real screen.
2. Keep component playground separate.
3. Build sidebar and filters from the Figma template.
4. Use the already coded email row.
5. Add navigation between tabs.
6. Test in browser.
7. Fix behavior and layout issues.

### Right Direction

Separate playgrounds, docs, and product prototypes.

### Wrong Direction

Do not overload one page with every purpose. It becomes confusing for designers, PMs, and engineers.

---

## Phase 9: Use GitHub For Team Workflow

### Goal

Make the prototype project shareable and editable by the team.

### What Happens

The instructor:

- prepares project instructions,
- adds agent instruction files,
- makes skills available across tools,
- creates a GitHub repository,
- pushes the project,
- creates feature branches,
- opens pull requests,
- reviews file changes,
- merges approved work,
- keeps `main` as the stable source.

### Why This Matters

Figma is not enough for interactive prototype collaboration.

GitHub gives:

- version history,
- branches,
- pull requests,
- review workflow,
- shared source of truth,
- controlled experiments,
- safe merging.

### Instructor Thinking

He explains branches as temporary workspaces.

A branch is for trying something. If it works, merge it. If it fails, close it.

Do not keep permanent personal branches as playgrounds.

### Practical Steps

1. Create a repository.
2. Push the project.
3. Work on feature branches.
4. Create PRs for experiments.
5. Review changed files.
6. Merge only when the experiment should become source of truth.
7. Pull latest changes back to local main.

### Right Direction

Use branches for temporary experiments and PRs for review.

### Wrong Direction

Do not let everyone edit `main` directly. You will lose control of the prototype.

---

## Phase 10: Host Prototypes With Vercel

### Goal

Turn local prototypes into shareable URLs.

### What Happens

The instructor hosts the GitHub project on Vercel.

Now the team can access:

- the main prototype URL,
- PR preview URLs,
- branch-specific experiments.

### Why This Matters

`localhost` only works on your machine.

A hosted URL lets PMs, engineers, designers, and stakeholders open the prototype in their own browser.

### Instructor Thinking

He separates two use cases:

- main URL for stable work,
- preview URL for experiments.

This is exactly how product teams should work.

### Practical Steps

1. Connect GitHub repo to Vercel.
2. Deploy the main branch.
3. Share the production URL for stable prototypes.
4. Push branches and PRs for experiments.
5. Use Vercel preview links to share experiments.
6. Merge only if the experiment should become part of the main prototype.

### Right Direction

Share experimental prototypes through PR preview links.

### Wrong Direction

Do not merge every experiment into the main prototype just because you want to show it to someone.

---

## Phase 11: Create Team Prototype Playgrounds

### Goal

Create a shared internal space where designers can upload and view each other's experiments.

### What Happens

The instructor evaluates options:

- one branch per designer,
- folders inside the main repo,
- separate repositories,
- Storybook.

He chooses folders inside the main repo.

Example structure:

```text
/prototypes/chayan/hover-experiment
/prototypes/sarah
```

### Why This Matters

This becomes an internal design playground, similar in spirit to Shopify's Artifact.

Designers can:

- see each other's experiments,
- reuse patterns,
- share work without sending links manually,
- keep experiments visible,
- build a culture of prototyping.

### Instructor Thinking

Permanent personal branches are not ideal because branches are meant to be temporary.

Dedicated folders in the main project make prototypes visible and stable.

### Right Direction

Use main-branch folders for permanent prototype galleries.

### Wrong Direction

Do not use long-lived branches as personal prototype storage.

---

## Phase 12: Document Component Specs In Figma With USPEC-Style Workflows

### Goal

Use AI to create Figma documentation for component specs.

### What Gets Documented

The instructor explains documentation categories like:

- anatomy,
- API,
- properties,
- color tokens,
- structure,
- screen reader behavior,
- motion.

### Simple Explanation

Anatomy means what the component is made of.

For the email row:

- container,
- checkbox area,
- sender text,
- subject,
- preview,
- date,
- labels,
- category,
- icon button,
- hover action bar.

API means what can be configured.

For designers, these are component properties.  
For engineers, these are APIs or props.

### What Happens

The instructor:

- downloads the USPEC template,
- customizes its style,
- publishes it as a Figma library,
- runs a first-run skill to extract template keys,
- runs anatomy documentation generation,
- reviews the output,
- notices missing hover/action bar/labels/icon states,
- gives more context,
- regenerates a better version.

### Instructor Thinking

He does not expect documentation to be perfect on the first run.

When AI misses something, he gives it the missing component states and asks it to regenerate or create a cleaner version.

### Practical Steps

1. Set up the documentation template.
2. Publish it as a Figma library.
3. Run the first setup skill.
4. Select or link the component.
5. Run the specific documentation skill.
6. Review the generated spec.
7. Give missing context.
8. Regenerate or patch.

### Right Direction

Use AI to speed up documentation, then review it like a design system owner.

### Wrong Direction

Do not assume generated documentation is complete. AI may miss states that are hidden behind variants, slots, or hover behavior.

---

## Phase 13: Build Web Documentation For Designers And PMs

### Goal

Create an online documentation page that is more useful for designers and PMs than engineering docs alone.

### What Happens

The instructor uses Shadcn, Polaris, and Uber documentation as references.

He asks AI to create:

- a docs route,
- component categories,
- sidebar navigation,
- email row documentation,
- live preview,
- interactive controls,
- variants showcase,
- behavior explanations,
- API/property section,
- table of contents,
- future categories for atoms, tokens, molecules, and patterns.

### Why This Matters

Designers usually do not have interactive component documentation.

They often only have Figma components and maybe a few notes. This workflow creates a living reference where a designer can change properties and immediately see how the component behaves.

### Instructor Thinking

He removes code snippets because the target audience is designers and PMs, not engineers.

This is an important product decision: documentation should match the audience.

### Practical Steps

1. Create `/docs`.
2. Add sidebar categories.
3. Create `/docs/components/email-row`.
4. Add live preview.
5. Add controls based on actual component properties.
6. Add behavior documentation.
7. Add variants.
8. Add API/property table.
9. Add table of contents.
10. Test and polish.

### Right Direction

Make documentation interactive and audience-specific.

### Wrong Direction

Do not copy engineering documentation directly for designers. Designers need behavior, rules, examples, and usage guidance more than code snippets.

---

## Phase 14: Create A Documentation Skill

### Goal

Make component documentation repeatable for every future component.

### What Happens

The instructor asks AI to create a skill that can generate the same documentation structure for any component.

The skill should:

- accept a component name,
- inspect source code,
- identify properties,
- infer controls,
- create docs pages,
- add navigation entries,
- update coming-soon states,
- generate variants,
- document behavior,
- add API/property sections,
- take screenshots,
- report unmapped properties.

### Instructor Thinking

He wants consistency.

If one component's docs look different from another's, the design system feels messy. A skill forces the same structure every time.

### Practical Steps

1. Use the first component docs as the reference structure.
2. Create a skill for future docs.
3. Keep invocation manual at first.
4. Ask for confirmation before writing files.
5. Add a checklist.
6. Test on a smaller atom like tag button.
7. Improve the skill after the test.

### Right Direction

Use one polished component documentation page as the template for future docs.

### Wrong Direction

Do not manually design every documentation page from scratch. That creates inconsistent docs and wastes time.

---

## Phase 15: The "God Skill" Idea

### Goal

Create a higher-level skill that can generate the entire workflow for other UI patterns.

### What It Would Do

The "god skill" would ask:

- What pattern are we building?
- Is it a drawer, form, menu, kanban board, chat interface, table, or something else?
- Do we need code?
- Do we need Figma generation?
- Do we need documentation?
- What atoms are involved?
- What templates should be used?
- What rules and behaviors matter?

Then it would create the necessary lower-level skills.

### Instructor Thinking

He does not start with the god skill.

He first builds the email row workflow manually, learns the problems, improves the process, and only then thinks about generalizing it.

That is the correct order.

### Right Direction

Build one workflow manually, learn from it, then generalize.

### Wrong Direction

Do not create a "universal AI design system workflow" before you have tested one real workflow deeply.

---

## The Instructor's Thinking Patterns

## 1. He Plans Before Execution

He asks AI to create a plan first, especially for complex phases.

This saves time because it catches missing information before files or Figma layers are changed.

Use this when:

- the work has multiple steps,
- many files are involved,
- Figma and code both need to change,
- the workflow might become reusable.

Prompt:

```text
Create a plan for this workflow before making any changes.
List phases, assumptions, open questions, required inputs, and verification steps.
Ask clarifying questions before implementation.
```

## 2. He Uses Checklists To Control AI

He repeatedly asks AI to create and update a checklist.

This matters because long AI tasks can drift.

Checklist items keep the agent accountable.

Prompt:

```text
Create a checklist for this task and mark each item complete as you finish it.
Do not skip verification steps.
```

## 3. He Uses Confirmation Gates

Before writing to Figma or files, AI should summarize what it understood and ask for approval.

This is especially important when:

- Figma will be edited,
- files will be created,
- a component will be published,
- a documentation page will be generated.

Prompt:

```text
Before implementing, summarize what you understood, list what you will change, and wait for my confirmation.
```

## 4. He Chooses Model Strength Based On Task Difficulty

He does not use the strongest model for everything.

Examples:

- simple Figma variable edits: lower model or lower effort,
- planning a multi-phase system: stronger model,
- creating skills: stronger model,
- debugging tricky MCP behavior: stronger model,
- small code fixes: lower effort.

Senior lesson: model cost and context are part of workflow design.

## 5. He Creates Fresh Context When Needed

For new phases, he often starts a new conversation or uses sub-agents.

Why?

Because long conversations carry unnecessary baggage. Fresh context helps AI focus.

Use fresh context when:

- moving to a new phase,
- the previous conversation is too long,
- AI starts confusing old goals with new goals,
- you only need a small focused task.

## 6. He Uses Sub-Agents For Exploration

He lets sub-agents inspect:

- variables,
- components,
- annotations,
- templates,
- documentation structure.

Then the main agent uses their findings to create the plan.

This is useful because each sub-agent has its own context window and a narrow job.

## 7. He Optimizes Token Usage

He notices when AI uses too many tool calls.

Then he asks how to reduce:

- repeated searches,
- repeated node inspection,
- page-wide scans,
- unnecessary screenshots,
- redundant file reads.

Practical improvements:

- cache stable node IDs,
- store component rules in the skill,
- batch property writes,
- publish missing components,
- use the correct MCP,
- avoid repeated retries when screenshot verification is enough.

## 8. He Documents Limitations

When AI struggles with slots or unpublished icons, he does not hide it.

He updates the skill and documentation so future runs know:

- what is possible,
- what needs fallback,
- what must be published,
- what requires screenshot verification.

That is how a workflow becomes reliable.

---

## The Repeatable Workflow You Can Use

Use this for any component or pattern: drawer, form, menu, table, kanban board, chat UI, inbox, settings page, checkout flow.

### Step 1: Pick A Real Component

Choose a component with real complexity.

Good choices:

- form field,
- table row,
- card with states,
- navigation item,
- chat message,
- notification item,
- modal,
- drawer,
- checkout step.

Avoid starting with something too simple unless you are only testing setup.

### Step 2: Audit The Figma Component

Check:

- Are variants named properly?
- Are properties clear?
- Are states complete?
- Are tokens applied?
- Are atoms clean?
- Are annotations present?
- Are dark mode and edge cases included?
- Are components published?

### Step 3: Clean Tokens

Clean:

- raw colors,
- semantic colors,
- typography,
- spacing,
- radius,
- size,
- shadows if needed.

### Step 4: Add Behavior Annotations

Document things AI cannot infer from layers:

- hover behavior,
- truncation rules,
- max label count,
- date formatting,
- empty states,
- error states,
- grouping rules,
- responsive behavior,
- accessibility notes.

### Step 5: Build In Code

Ask AI to create:

- tokens,
- atoms,
- component,
- behavior utilities,
- playground,
- test examples.

### Step 6: Verify Parity

Compare:

- Figma vs code,
- light vs dark,
- desktop vs responsive,
- normal vs edge cases,
- interaction vs static state.

### Step 7: Create A Skill

The skill should:

- read the component spec,
- use the published component,
- ask for missing input,
- generate realistic data,
- confirm before writing,
- create the Figma instance,
- screenshot verify,
- retry up to three times,
- report output.

### Step 8: Extend To Templates

Once one component works, use templates:

- table template,
- inbox template,
- dashboard template,
- drawer template,
- settings page template.

AI should fill slots, not invent the whole screen.

### Step 9: Build Prototype Routes

Create actual pages in code:

- `/inbox`,
- `/settings`,
- `/checkout`,
- `/dashboard`,
- `/prototypes/name/experiment`.

### Step 10: Publish And Share

Use:

- GitHub for version control,
- PRs for experiments,
- Vercel for hosted URLs,
- preview links for stakeholder review.

### Step 11: Document

Document in two places:

- Figma specs for design system detail,
- web docs for interactive learning and usage.

### Step 12: Generalize

Only after one pattern works, create a higher-level skill that can repeat the process for new patterns.

---

## Practical Prompt Library

## Planning Prompt

```text
I want to create an AI-assisted workflow for this component/pattern.
First inspect the Figma structure, variables, annotations, and related atoms.
Create a phase-by-phase plan before implementation.
Include open questions, assumptions, risks, and verification steps.
Do not make changes until I approve the plan.
```

## Token Cleanup Prompt

```text
Inspect the selected Figma component and variables.
Clean the raw color, semantic color, typography, spacing, radius, and size tokens.
Avoid component-specific business logic in token names.
Apply tokens to the main component and all atoms used inside it.
Ask me before applying changes if naming decisions are unclear.
```

## Code Build Prompt

```text
Build this Figma component in code.
Use global tokens derived from Figma.
Do not hardcode values if matching tokens exist.
Read annotations to understand behavior.
Create an interactive browser playground with controls for the component's important states.
After building, run it locally and compare against Figma.
```

## Parity Check Prompt

```text
Compare the coded component against the Figma component.
Look for mismatches in colors, spacing, typography, states, icons, responsive behavior, and dark mode.
Tell me what is wrong, which source should change, and why.
Fix the issues and verify with a screenshot.
```

## Skill Creation Prompt

```text
Create a project-level skill for this component.
The skill should use the published Figma library component, configure it with realistic data, and place it in Figma.
It must ask clarifying questions if needed, summarize its plan, wait for confirmation, execute with a checklist, take a screenshot, and fix issues up to three times.
```

## Skill Improvement Prompt

```text
Review the previous skill run.
Identify every mistake, unnecessary tool call, missing rule, or fragile assumption.
Update the skill so the same issue is less likely next time.
Prioritize reliability, token efficiency, and clear fallback rules.
```

## Full Template Generation Prompt

```text
Extend the skill so it can create a full screen using the published template.
The template has a slot for generated content.
Use section headers and component instances inside the slot.
Use annotation rules for grouping and realistic content.
Summarize the generated screen before writing to Figma.
```

## Documentation Prompt

```text
Create interactive documentation for this component.
The audience is designers and PMs, not engineers.
Include live preview, controls, variants, behavior rules, API/component properties, and usage notes.
Do not include code snippets unless necessary.
Create a scalable route structure so atoms, components, patterns, and tokens can be added later.
```

---

## What To Document In A Component

A strong component documentation page should include:

| Section | What It Explains |
|---|---|
| Overview | What the component is and when to use it |
| Anatomy | The parts inside the component |
| Live preview | A working version users can interact with |
| Controls | Editable properties like text, state, labels, icons, theme |
| Variants | Visual examples of each supported variant |
| Behavior | Hover, selected, disabled, truncation, grouping, date rules |
| API / Properties | What can be configured and what is required |
| Tokens | Colors, spacing, radius, typography used |
| Accessibility | Keyboard, screen reader, contrast, focus behavior |
| Usage rules | Do and don't examples |
| Related components | Atoms or components this depends on |

For atoms, also document where the atom is used.

Example:

> Tag Button is used inside Email Row labels.

This helps designers understand system relationships.

---

## The Most Important Mistakes To Avoid

## Mistake 1: Prompting Before System Cleanup

Wrong:

```text
AI, generate a design like this.
```

Why it fails:

AI will create something that looks okay but does not follow your tokens, components, or states.

Better:

```text
First inspect and clean the variables, atoms, and component rules. Then use the published component to generate instances.
```

## Mistake 2: Letting AI Rebuild Existing Components

Wrong:

Ask AI to draw your email row from scratch.

Why it fails:

It breaks spacing, variants, tokens, and component consistency.

Better:

Ask AI to initiate the published master component and configure its properties.

## Mistake 3: Not Writing Annotations

Wrong:

Assume AI will understand behavior from layer names.

Why it fails:

AI may not know date rules, hover rules, truncation, or grouping logic.

Better:

Add clear annotations in Figma and code comments/spec files where needed.

## Mistake 4: No Screenshot Review

Wrong:

Stop after AI says it created the design.

Why it fails:

The output may be placed incorrectly, missing states, or visually broken.

Better:

Require screenshot review and a maximum of three fix iterations.

## Mistake 5: No Confirmation Step

Wrong:

Let AI immediately edit Figma or files.

Why it fails:

If AI misunderstood the request, it will damage the file or create wrong output.

Better:

Require a summary and confirmation before write actions.

## Mistake 6: No Token Optimization

Wrong:

Let AI repeatedly scan the whole Figma page to find one node.

Why it fails:

It wastes time, tokens, and increases error risk.

Better:

Cache stable IDs, batch writes, and keep known component rules inside the skill.

## Mistake 7: Over-Generalizing Too Early

Wrong:

Create a universal workflow before testing one real component.

Why it fails:

You generalize assumptions that have never been stress-tested.

Better:

Build one complete workflow, improve it, then generalize.

---

## How This Applies To Product Design Work

This workflow is not only about technical automation.

It changes how a designer works.

### Old Way

1. Design static screens in Figma.
2. Create many manual variants.
3. Hand off to engineers.
4. Hope implementation matches.
5. Make separate documentation later.
6. Struggle to share interactive prototypes.

### New Way

1. Clean the design system.
2. Build coded component parity.
3. Create reusable AI skills.
4. Generate realistic component instances.
5. Build real interactive prototypes.
6. Share with hosted URLs.
7. Document the system as you go.
8. Turn repeated work into repeatable skills.

The designer becomes less of a screen maker and more of a system builder.

That is the career-level insight.

---

## What AI Can Do vs What You Still Own

| AI Can Help With | You Still Own |
|---|---|
| Inspecting variables | Deciding naming quality |
| Generating code | Judging product behavior |
| Creating component instances | Knowing if content feels realistic |
| Creating mock data | Understanding user context |
| Making docs | Checking if docs are actually useful |
| Finding mismatches | Deciding the correct source of truth |
| Creating prototypes | Choosing what should be tested |
| Suggesting fixes | Making final design calls |

AI is fast, but it does not know your product's real users, business goals, cultural context, or stakeholder politics.

Use AI for speed. Use your judgment for direction.

---

## AI Tool Spotlight

### Claude Code / Codex / Cursor

What it is: AI coding agents that can read files, write code, run commands, and create project workflows.

What it does here:

- builds the component in code,
- creates playgrounds,
- writes skills,
- updates docs,
- manages GitHub workflow.

Free or paid: usually paid for serious usage.

Best use:

Use for code, project structure, reusable skills, and documentation automation.

### Figma MCP

What it is: A bridge between AI and Figma.

What it does here:

- inspects Figma selections,
- creates or modifies design layers,
- uses Figma skills to behave more like a designer.

Free or paid: depends on Figma and MCP setup.

Best use:

Use when AI needs to create or modify design work directly in Figma.

### Figma Console MCP

What it is: A more operation-heavy Figma automation bridge.

What it does here:

- batch operations,
- variable operations,
- screenshots,
- design system checks,
- exact Figma actions.

Best use:

Use when you need precision and repeatable Figma operations.

### GitHub

What it is: Version control for code and prototype projects.

What it does here:

- stores the prototype project,
- supports branches,
- supports pull requests,
- keeps main stable.

Free or paid: free tier exists.

Best use:

Use for team collaboration and prototype history.

### Vercel

What it is: Hosting for web projects.

What it does here:

- turns local prototypes into shareable URLs,
- creates preview links for PRs.

Free or paid: free tier exists for personal use.

Best use:

Use when you need PMs, engineers, or stakeholders to open a prototype without running code locally.

---

## Senior Designer Lessons From The Instructor

## Lesson 1: The Design System Is The Foundation

AI works best when the rules are already clean.

If tokens, components, variants, and annotations are messy, AI output will be messy too.

## Lesson 2: A Good Workflow Has Feedback Loops

Every phase includes checking:

- plan,
- output,
- screenshot,
- browser,
- Figma,
- code,
- documentation.

No serious product workflow is one-shot.

## Lesson 3: Reusable Skills Are More Valuable Than One-Off Prompts

A prompt solves today's task.

A skill solves the same kind of task repeatedly.

## Lesson 4: Start Specific, Then Generalize

The instructor starts with one email row.

Then:

- one row becomes many rows,
- many rows become inbox,
- inbox becomes prototype,
- prototype becomes team system,
- component docs become documentation skill,
- workflow becomes god skill.

That is the correct maturity path.

## Lesson 5: AI Needs Product Constraints

The best AI outputs came when the instructor gave constraints:

- use existing component,
- use published library,
- use slots,
- use annotations,
- use date grouping rules,
- ask before writing,
- screenshot verify,
- limit retries,
- avoid unnecessary files.

Vague AI gets vague results. Constrained AI gets useful results.

---

## One Complete Example Workflow For You

Let's say you want to apply this to a form field component.

### 1. Prepare Figma

Create or clean:

- text input component,
- label,
- helper text,
- error state,
- success state,
- disabled state,
- filled state,
- focus state,
- icons,
- tokens,
- annotations.

### 2. Add Rules

Write annotations:

- error text appears only after validation,
- helper text changes when error appears,
- focus border uses accent token,
- disabled text uses muted token,
- character counter appears after certain length,
- mobile width is fill container.

### 3. Build In Code

Ask AI to build:

- input component,
- validation behavior,
- playground controls,
- sample form.

### 4. Verify Parity

Compare:

- Figma states,
- code states,
- token usage,
- keyboard focus,
- error behavior.

### 5. Create Skill

Create a skill:

```text
Create a form field in Figma using the published form field component.
Ask for label, placeholder, helper text, validation state, and optional icon.
Generate realistic examples if missing.
Confirm before writing.
Screenshot and fix.
```

### 6. Extend To Full Form

Use a form template with slots.

Ask AI:

```text
Create a signup form for a B2B SaaS onboarding flow.
Use the published form template and fill it with appropriate field components.
```

### 7. Build Prototype

Create `/signup` route in code.

Add:

- input behavior,
- validation,
- button loading,
- success state,
- error state.

### 8. Publish And Test

Use GitHub + Vercel preview link.

Show it to PM/engineer.

Ask for feedback on flow behavior, not visual preference.

---

## Final Practical Checklist

Use this before starting any AI design workflow.

### Figma Readiness

- Component has complete states.
- Variants are named clearly.
- Component properties are meaningful.
- Tokens are applied.
- Atoms are clean.
- Important rules are annotated.
- Component is published.
- Related templates are published.

### Code Readiness

- Global tokens exist.
- Atom components exist.
- Main component exists.
- Playground exists.
- Important states are testable.
- Figma parity has been checked.
- Responsive behavior works.

### Skill Readiness

- Skill has clear trigger phrases.
- Skill reads correct files.
- Skill uses published components.
- Skill asks clarifying questions.
- Skill summarizes before writing.
- Skill uses a checklist.
- Skill screenshots output.
- Skill retries with a cap.
- Skill documents known limitations.

### Team Readiness

- Project is on GitHub.
- Main branch is stable.
- Experiments use branches.
- PR preview links are available.
- Main prototype is hosted.
- Prototype folders are organized.
- README explains how to use the project.
- Skills are available for the tools your team uses.

### Documentation Readiness

- Figma specs exist.
- Web docs exist.
- Component API/properties are clear.
- Behavior rules are documented.
- Variants are visible.
- Usage rules are written.
- Related atoms/components are linked.

---

## The Simplest Summary

The instructor's workflow is:

1. Clean the design system.
2. Build one real component in code.
3. Verify it against Figma.
4. Create a skill to generate that component in Figma.
5. Test the skill and improve it.
6. Extend from component to full screen.
7. Build the screen in code for prototyping.
8. Put it on GitHub.
9. Host it online.
10. Document it in Figma and on the web.
11. Convert repeated work into reusable skills.

The deeper lesson:

> AI should not replace your design judgment. AI should remove repeated manual work so you can spend more energy on product thinking, edge cases, user behavior, and design quality.
