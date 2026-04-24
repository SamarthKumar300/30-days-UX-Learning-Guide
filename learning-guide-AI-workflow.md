# Learning Guide: AI-Powered Design Workflow

## Page Purpose

This guide teaches a practical AI-powered design workflow for product designers.

It is based on a long workshop where a senior product designer explained how to use AI, Figma, code, MCPs, skills, GitHub, hosting, and documentation to speed up product design work without lowering quality.

The main lesson is simple:

> Do not use AI to randomly generate UI. Build a clean design system first, then make AI work inside that system.

AI becomes powerful when it follows your components, tokens, rules, and review process. Without that, it only creates fast mess.

---

## Who This Guide Is For

This guide is for designers who want to move from "I make screens in Figma" to "I build repeatable product design systems with AI."

It is useful if you want to:

- design faster without losing quality,
- clean and scale a design system,
- connect Figma and code,
- create interactive prototypes,
- create reusable AI skills,
- document components properly,
- share prototypes with PMs and engineers,
- understand how senior designers think about AI workflows.

---

## The Core Idea

Most designers use AI like this:

```text
Create a dashboard design.
Create a landing page.
Create a mobile app screen.
```

That is the weak way.

The stronger way is:

1. Clean the design system.
2. Define the rules.
3. Build the component in code.
4. Verify it against Figma.
5. Create a reusable skill.
6. Use AI to generate real component instances.
7. Extend from one component to full screens.
8. Turn screens into interactive prototypes.
9. Share prototypes through GitHub and hosted URLs.
10. Document everything so the system can scale.

This workflow makes AI behave less like a random generator and more like a trained design assistant.

---

## The Big Mental Model

Think of the workflow like a small design factory.

Figma is where your product design system lives.

Code is where your design becomes interactive and testable.

AI is the operator that moves between both worlds.

Skills are the instruction manuals that tell AI exactly how to work.

GitHub is the version history and team collaboration layer.

Vercel or any hosting platform is how you share prototypes with the team.

Documentation is how the whole system becomes understandable for future designers, PMs, and engineers.

The instructor's thinking is:

> First build the system. Then automate the repeated work.

That is the part most juniors miss.

---

## Tools vs Skills

Before you understand the workflow, you need to understand this difference.

### Tools

Tools are the raw abilities AI can use.

Examples:

- read a Figma selection,
- create a frame,
- rename variables,
- set component properties,
- inspect a file,
- capture a screenshot,
- write code,
- push code to GitHub.

Tools are like utensils in a kitchen.

### Skills

Skills are instructions that tell AI how to use those tools for a specific job.

Examples:

- create one email row instance in Figma,
- generate a full inbox screen,
- document a component,
- compare Figma and code,
- build a prototype page,
- run screenshot verification.

Skills are like recipes.

The same tools can be used in many ways. The skill tells AI which way is correct for your workflow.

### Simple Analogy

If you hire a cook, you do not explain every tiny step every day.

You do not say:

```text
Use this pan.
Use this spice.
Make it slightly spicy.
Use this type of rice.
Plate it this way.
```

After a few instructions, you simply say:

```text
Make Indian food.
```

The cook already understands your repeated preferences.

That is what a skill does for AI.

### Key Learning

If you repeat the same prompt again and again, turn it into a skill.

Right direction: create reusable skills for repeated workflows.  
Wrong direction: write a giant prompt from scratch every time. This makes your process slow, inconsistent, and hard to scale.

---

## The Complete Workflow At A Glance

The instructor's full workflow looks like this:

1. Understand MCPs, tools, and skills.
2. Pick one real component as the test case.
3. Clean Figma color and typography variables.
4. Create spacing, radius, and size tokens.
5. Apply tokens to the component and its atoms.
6. Build the component in code.
7. Create a browser playground.
8. Compare Figma and code for design parity.
9. Create a skill that generates one component instance in Figma.
10. Test the skill and improve it after failures.
11. Extend the skill from one row to a full screen.
12. Build the full screen in code for prototyping.
13. Push the project to GitHub.
14. Host the prototype online.
15. Use branches and PR preview links for experiments.
16. Create team prototype folders.
17. Document component specs inside Figma.
18. Build interactive web documentation.
19. Create a documentation skill.
20. Eventually create a higher-level "god skill" to repeat this workflow for other patterns.

The workflow starts with one small but real component. Then it grows into a complete system.

That is the correct order.

---

## The Example Used In The Workshop

The instructor uses a Notion-style email row component.

This is a good example because it is not too simple.

It includes:

- read state,
- unread state,
- selected state,
- hover state,
- sender name,
- multiple sender grouping,
- message count,
- subject,
- preview text,
- date formatting,
- category pill,
- labels,
- trailing icon,
- action bar,
- light mode,
- dark mode,
- truncation rules,
- responsive behavior.

This complexity is useful because it exposes real workflow problems.

If the instructor had used a simple button, the workflow would look easy but would not prove much.

Right direction: test AI workflows on a real component with real states and edge cases.  
Wrong direction: test on a simple component, then assume the workflow is ready for complex product UI.

---

# Module 1: Set Up The AI Design Environment

## What You Are Learning

You are learning how AI connects to Figma and code.

The instructor uses:

- official Figma MCP,
- Figma Console MCP,
- Figma Desktop Bridge plugin,
- Claude Code or a similar coding agent,
- a local project folder,
- a Figma file with components and annotations.

## Why This Matters

AI cannot help properly if it cannot inspect and modify the real design files.

The setup creates a bridge between:

- Figma,
- code,
- AI,
- documentation,
- prototype hosting.

## Official Figma MCP vs Figma Console MCP

The instructor compares both instead of blindly choosing one.

Official Figma MCP is useful when AI needs to behave like a designer:

- create or modify frames,
- use components,
- inspect design context,
- generate design from references,
- work with Figma skills.

Figma Console MCP is useful when AI needs precise operations:

- batch variable edits,
- design system linting,
- screenshots,
- reading annotations,
- inspecting component data,
- design-to-code checks,
- specific Figma operations.

The important lesson:

> Do not choose the tool with the biggest number of features. Choose the tool that fits the job.

## Practical Rule

Use official Figma MCP for broader design creation and editing.

Use Figma Console MCP for precise, repeatable, technical operations.

Right direction: let the task decide the MCP.  
Wrong direction: assume more tools automatically means better results.

---

# Module 2: Clean Figma Color And Typography Variables

## What You Are Learning

Before asking AI to generate anything, clean your design system foundation.

The instructor starts with:

- raw color variables,
- semantic color variables,
- typography styles,
- naming conventions,
- reusable token structure.

## Why This Matters

If your variables are messy, AI will copy the mess faster.

Bad token example:

```text
emailUnreadBlue
```

This name is tied to one component and one business case.

Better token examples:

```text
content/primary
content/secondary
surface/default
surface/subtle
border/default
fill/accent
```

These names describe purpose, not one specific screen.

## Instructor Thinking

He is not only renaming colors.

He is preparing the design system so future components can reuse the same rules.

That is senior design system thinking.

## How To Execute

1. Ask AI to inspect color and typography variables.
2. Ask AI to propose a clean naming convention.
3. Separate raw colors from semantic colors.
4. Keep raw colors generic.
5. Name semantic colors by intent.
6. Avoid business logic in primitive token names.
7. Apply the improved names.
8. Manually check the Figma variable panel.
9. Manually reorder groups if the AI tool cannot do it.

## Website Learning Note

Raw tokens are like paint bottles.

Semantic tokens are like usage instructions.

The paint bottle may be blue, but the usage instruction says whether it is used for a button, link, border, or badge.

## Prompt You Can Use

```text
Inspect the Figma variables for color and typography.
Propose a clean naming convention.
For raw color values, avoid business logic and separate neutrals from accent colors.
For semantic colors, use intent-based names like content, surface, border, and fill.
Ask before applying changes.
```

Right direction: use AI to organize the system, then review names yourself.  
Wrong direction: allow AI to invent token names without checking them. Bad names become long-term design debt.

---

# Module 3: Create Spacing, Radius, And Size Tokens

## What You Are Learning

You are learning how to remove hardcoded layout values from your components.

The instructor asks AI to inspect:

- padding,
- gaps,
- corner radius,
- icon sizes,
- notification dot sizes,
- tag button padding,
- action bar spacing,
- atom-level layout values.

## Why This Matters

Hardcoded layout values slowly break consistency.

One component uses `6px`, another uses `7px`, another uses `8px`, and after a few months the product looks slightly messy everywhere.

Tokens prevent that.

## Instructor Thinking

He does not only tokenize the main email row.

He also tokenizes the atoms inside it.

This matters because a component is only as clean as the smaller components inside it.

## How To Execute

1. Select the main component.
2. Ask AI to inspect the main component and all atoms inside it.
3. Identify repeated spacing, padding, radius, and size values.
4. Choose a naming system.
5. Create variables for those values.
6. Apply the variables to master components.
7. Check the result manually.
8. Fix any missed values.

## Token Naming Options

You can use:

- t-shirt sizes like `spacing/xs`, `spacing/sm`, `spacing/md`,
- pixel names like `spacing/4`, `spacing/8`, `spacing/12`,
- scale names like `spacing/1`, `spacing/2`, `spacing/3`.

Pick one system and stay consistent.

## Prompt You Can Use

```text
Review the selected component and all atoms inside it.
Identify paddings, gaps, corner radius values, and fixed sizes.
Create reusable Figma variables for these values and apply them to the component and atom master components.
Ask questions if the naming convention is unclear.
```

Right direction: tokenize the component and its internal atoms.  
Wrong direction: leave hardcoded values in atoms and only clean the outer component.

---

# Module 4: Use Annotations To Teach AI Component Behavior

## What You Are Learning

You are learning why Figma layers are not enough.

AI can inspect structure, but behavior often lives in designer knowledge.

You need annotations for rules like:

- when the hover action bar appears,
- how many labels can show,
- how sender names collapse,
- how dates should format,
- how truncation works,
- which icon is allowed,
- how section headers are grouped,
- how responsive width works,
- what happens in dark mode.

## Why This Matters

AI cannot infer every behavior from the layer tree.

If a rule is important, write it down.

## Instructor Thinking

The instructor repeatedly asks AI to read annotations before coding or generating components.

That is because annotations act like product logic.

They tell AI why the component behaves a certain way.

## Good Annotation Examples

```text
Action bar appears only on hover.
```

```text
If message count is greater than 3, show up to three sender names, then collapse the rest into count.
```

```text
Date shows time for today, month/day for current year, and year for older messages.
```

```text
Trailing icon can only be paperclip or calendar.
```

Right direction: write behavior rules where AI and future designers can find them.  
Wrong direction: assume layer names are enough to communicate interaction logic.

---

# Module 5: Build The Component In Code

## What You Are Learning

You are learning how to turn a Figma component into a coded, interactive component.

The instructor uses code because code can test real behavior.

Figma shows the visual structure. Code shows the interaction.

## What AI Builds

AI builds:

- a Next.js project,
- global token files,
- atom components,
- the email row component,
- date formatting utilities,
- sender grouping logic,
- light and dark theme behavior,
- a browser playground,
- controls for different states.

## Why This Matters

Once the component exists in code, you can:

- test hover behavior,
- test responsive width,
- test long names,
- test labels,
- test dark mode,
- test date formatting,
- build full prototypes,
- host it online,
- create documentation pages.

This is why code opens up more possibilities than static Figma screens.

## Instructor Thinking

He tells AI not to hardcode values if global tokens exist.

That is important.

The coded component should use the same system as Figma.

Otherwise Figma and code become two separate truths.

## How To Execute

1. Ask AI to extract final token values from Figma.
2. Create global token files.
3. Build atoms first.
4. Build the main component.
5. Add utility logic for behavior.
6. Add a browser playground.
7. Add controls for states and variants.
8. Run the preview locally.
9. Inspect and test the component.
10. Fix mismatches.

## Prompt You Can Use

```text
Build this Figma component in code using global tokens from Figma.
Do not hardcode values if a matching token exists.
Read the annotations to understand behavior rules.
Create a browser playground where I can test important states, variants, and edge cases.
```

Right direction: use code as a living test layer.  
Wrong direction: treat code as a simple export from Figma.

---

# Module 6: Create A Browser Playground

## What You Are Learning

You are learning how to test component behavior interactively.

A playground is a page where you can change component properties and immediately see the result.

## What The Playground Should Test

For the email row, the playground tests:

- read vs unread,
- selected vs unselected,
- hover state,
- labels,
- category,
- trailing icon,
- sender count,
- long sender names,
- long subject text,
- date formats,
- light and dark theme,
- responsive resizing.

## Why This Matters

Static screenshots hide problems.

Playgrounds reveal problems.

You can see if:

- text truncates badly,
- hover actions overlap,
- dark mode colors fail,
- responsive width breaks,
- labels behave incorrectly,
- date logic feels wrong.

## Instructor Thinking

He uses the playground to find issues before building bigger workflows.

This is the correct order:

1. test one component,
2. fix it,
3. then automate it.

Right direction: create a playground before using the component in full prototypes.  
Wrong direction: skip testing and build full screens with a broken base component.

---

# Module 7: Check Figma And Code Parity

## What You Are Learning

You are learning how to make sure Figma and code match.

This is called design parity.

## What The Instructor Checks

He checks:

- color mismatches,
- dark mode issues,
- wrong tokens,
- unused tokens,
- missing fonts,
- hover behavior,
- label colors,
- tag colors,
- responsive layout,
- browser output vs Figma output.

## Why This Matters

If Figma and code do not match, your design system has no real source of truth.

Designers will trust Figma.

Engineers will trust code.

The product will ship something in between.

That creates confusion.

## Instructor Thinking

He does not automatically assume Figma is right.

Sometimes Figma is wrong.

Sometimes code is wrong.

Sometimes the token exists but is unused.

The designer's job is to decide which source should change.

## How To Execute

1. Run the coded playground.
2. Take screenshots.
3. Compare with Figma.
4. Ask AI to inspect token usage.
5. Identify the mismatch.
6. Decide whether Figma or code should change.
7. Fix the source.
8. Verify again.

## Prompt You Can Use

```text
Compare the coded component against the Figma component.
Look for mismatches in colors, spacing, typography, states, icons, responsive behavior, and dark mode.
Tell me which source appears incorrect and what should change.
After fixing, verify with a screenshot.
```

Right direction: treat parity as a quality gate.  
Wrong direction: move into automation while the base component is still wrong.

---

# Module 8: Create A Skill For One Component Instance

## What You Are Learning

You are learning how to turn a repeated design task into a reusable AI skill.

In the workshop, the skill creates one configured email row in Figma.

## What The Skill Does

The skill:

- reads the component spec,
- uses the published Figma library component,
- generates realistic mock data,
- asks what the user wants to override,
- summarizes the plan,
- waits for confirmation,
- places the component in Figma,
- sets variants and instance properties,
- updates text,
- takes a screenshot,
- reviews the result,
- fixes issues up to three times,
- reports what it created.

## Why This Matters

This is where AI becomes repeatable.

Instead of rebuilding an email row manually, the designer can say:

```text
Create an email row about a candidate review discussion between designers.
```

The skill uses the real component and configures it.

## Important Instructor Decision

At first, the idea was to let AI build the component from code.

Then the instructor changes the approach.

He decides AI should use the published master component from the Figma library and customize it.

That is a better decision.

Why?

Because the master component already contains:

- spacing,
- tokens,
- variants,
- properties,
- internal structure,
- system rules.

AI should not redraw what already exists.

## How To Execute

1. Publish the component and tokens to the Figma library.
2. Create a project-level skill.
3. Define trigger phrases.
4. Tell the skill where the component spec lives.
5. Tell the skill what inputs to ask for.
6. Require a summary before Figma changes.
7. Require a checklist while executing.
8. Require screenshot verification.
9. Test with one component instance.
10. Improve the skill after test failures.

## Skill Requirement Template

```text
Create exactly one configured component instance.
Use the published Figma library component.
Generate realistic mock data unless the user gives specifics.
Before writing to Figma, summarize what will be created and ask for confirmation.
Create and update a checklist while executing.
After placing the instance, take a screenshot and fix visual issues up to three times.
```

Right direction: use published components as the source.  
Wrong direction: ask AI to redraw design system components from scratch.

---

# Module 9: Improve The Skill After It Fails

## What You Are Learning

You are learning how to debug AI workflows.

The instructor's first skill run is not perfect.

That is expected.

The value comes from improving the skill after failures.

## What Went Wrong

The AI:

- placed the instance on top of existing frames,
- used the wrong trailing icon,
- struggled with labels inside slots,
- used too many tool calls,
- searched too broadly,
- could not find unpublished components,
- showed only one sender name even when count was high,
- had node ID problems after component changes.

## How The Instructor Thinks

He does not simply say "AI made mistakes."

He asks better questions:

- What exactly failed?
- Was the skill missing a rule?
- Was the MCP the wrong tool for this action?
- Was the component unpublished?
- Can we cache stable IDs?
- Can we reduce tool calls?
- Can another MCP handle slots better?
- Should the skill document this limitation?

This is senior debugging.

## Improvements Added

The skill is improved to:

- place new output in empty canvas space,
- use the official Figma MCP as fallback for slot issues,
- use only allowed icons,
- follow sender count logic,
- cache stable text node IDs where safe,
- avoid page-wide searches,
- batch property writes,
- publish missing icons,
- reduce repeated tool calls,
- verify with screenshots.

## Key Learning

Every failed AI run should improve the skill.

Do not only fix the output.

Fix the system that created the output.

Right direction: convert mistakes into new skill rules.  
Wrong direction: manually fix the same AI mistake every time.

---

# Module 10: Extend From One Component To A Full Screen

## What You Are Learning

You are learning how to scale from one component to a full generated layout.

The instructor extends the email row skill into a full inbox generator.

## What Changes

The skill now supports:

- single email row mode,
- full inbox mode.

The full inbox mode can:

- use a published inbox template,
- place content inside a slot,
- add section headers,
- create multiple email rows,
- group emails by date,
- generate realistic content,
- keep row details coherent.

## Example Request

```text
Create an inbox where the user is a senior product designer at a fast-paced fintech company.
```

AI can then create realistic email groups about:

- design reviews,
- stakeholder feedback,
- product decisions,
- candidate debriefs,
- payment onboarding,
- team updates.

## Instructor Thinking

He does not ask AI to invent the whole screen from scratch.

He uses the published inbox template and asks AI to fill the slot.

This is faster, cleaner, and more consistent.

## How To Execute

1. Publish the screen template.
2. Publish the section header.
3. Add annotations for grouping rules.
4. Tell the skill how to detect single-row vs full-screen mode.
5. Define how many groups to create.
6. Define how many rows per group.
7. Require coherent content.
8. Ask for confirmation before writing.
9. Place the template.
10. Fill the slot with headers and rows.
11. Screenshot and fix.

Right direction: use templates and slots.  
Wrong direction: ask AI to create full screens from a blank canvas when a system template already exists.

---

# Module 11: Build The Full Screen In Code

## What You Are Learning

You are learning how to create a real interactive prototype from the Figma screen.

The instructor builds the inbox template in code after the Figma generation workflow works.

## What Gets Built

AI creates:

- `/inbox` route,
- sidebar navigation,
- top filter bar,
- email list,
- active navigation states,
- hover behavior,
- selected row behavior,
- responsive layout.

## Why This Matters

This turns the design from static UI into something people can actually use.

PMs and engineers can click around.

Designers can test interaction ideas.

Stakeholders can understand flow behavior faster.

## Important Product Decision

The instructor keeps the component playground separate from the inbox prototype.

The playground is for testing the component.

The inbox route is for testing a product experience.

Those are different jobs.

## How To Execute

1. Create a separate route for the product screen.
2. Keep the component playground separate.
3. Build the layout from the Figma template.
4. Reuse the coded email row.
5. Add navigation.
6. Add hover and selected states.
7. Test in browser.
8. Fix layout and behavior issues.

Right direction: separate playgrounds, docs, and product prototypes.  
Wrong direction: put every purpose into one page and make the project confusing.

---

# Module 12: Use GitHub For Team Collaboration

## What You Are Learning

You are learning how design prototypes can use a real engineering-style workflow.

The instructor pushes the project to GitHub.

## Why GitHub Matters

GitHub gives your prototype:

- version history,
- branches,
- pull requests,
- review workflow,
- a stable main branch,
- team collaboration,
- safe experiments.

## The Basic Workflow

1. Create a GitHub repository.
2. Push the project.
3. Keep `main` stable.
4. Create branches for experiments.
5. Open pull requests.
6. Review changes.
7. Merge only approved work.
8. Pull latest changes back to local.

## Branch Mental Model

A branch is a temporary workspace.

Use it to try something.

If the experiment works, merge it.

If it does not work, close it.

## Instructor Thinking

He treats prototypes like real product work.

That means experiments should not directly damage the stable version.

Right direction: use branches and PRs for prototype experiments.  
Wrong direction: let everyone edit the main prototype directly.

---

# Module 13: Host Prototypes Online

## What You Are Learning

You are learning how to make prototypes accessible to the team.

Local prototypes only work on your computer.

Hosted prototypes work for everyone.

## What The Instructor Uses

He uses Vercel to host the project.

You could use another hosting platform, depending on your company.

## Why Hosting Matters

With hosting, you can share:

- stable prototype URLs,
- PR preview links,
- branch-specific experiments,
- internal prototype galleries.

## Stable URL vs Preview URL

Stable URL:

- connected to the main branch,
- used for approved work,
- safe to share broadly.

Preview URL:

- connected to a pull request,
- used for experiments,
- useful for feedback before merging.

## How To Execute

1. Connect GitHub repo to Vercel.
2. Deploy the main branch.
3. Share the production URL for stable work.
4. Push experiment branches.
5. Use PR preview links for feedback.
6. Merge only if the experiment should become part of the stable prototype.

Right direction: use preview links for experiments.  
Wrong direction: merge every experiment into main just because you want to show it to someone.

---

# Module 14: Create Team Prototype Playgrounds

## What You Are Learning

You are learning how to build an internal prototype space for a design team.

The instructor compares several options:

- one branch per designer,
- folders inside the main repo,
- separate repositories,
- Storybook.

He chooses folders inside the main repo.

## Recommended Structure

```text
/prototypes/chayan/hover-experiment
/prototypes/sarah
/prototypes/designer-name/project-name
```

## Why This Works

This creates a shared prototype gallery.

Designers can:

- upload experiments,
- view each other's work,
- reuse ideas,
- avoid losing prototypes,
- share work without manual links,
- build a culture of prototyping.

## Why Not One Permanent Branch Per Designer?

Branches are temporary.

They are meant for work in progress, not permanent storage.

If every designer keeps a permanent branch, the repo becomes messy.

## Instructor Thinking

He wants a system similar in spirit to Shopify's internal Artifact tool.

The goal is not only to make prototypes.

The goal is to make prototypes visible to the team.

Right direction: use main-branch prototype folders for stable prototype galleries.  
Wrong direction: use long-lived personal branches as permanent storage.

---

# Module 15: Document Component Specs In Figma

## What You Are Learning

You are learning how AI can help document design system components inside Figma.

The instructor uses a USPEC-style workflow.

## What Gets Documented

Component documentation can include:

- anatomy,
- API,
- properties,
- color tokens,
- structure,
- screen reader behavior,
- motion.

## Simple Definitions

Anatomy means the parts inside the component.

For the email row, anatomy includes:

- main container,
- checkbox area,
- sender name,
- subject,
- preview,
- date,
- labels,
- category,
- icon button,
- hover action bar.

API means the configurable properties.

For designers, these are Figma component properties.

For engineers, these are props or APIs.

## What The Instructor Does

1. Downloads a documentation template.
2. Customizes the template style.
3. Publishes it as a Figma library.
4. Runs a first setup skill.
5. Extracts template keys.
6. Runs an anatomy documentation skill.
7. Reviews the output.
8. Finds missing parts.
9. Gives AI more context.
10. Regenerates a better version.

## Important Learning

Generated documentation is not automatically complete.

AI may miss:

- hover states,
- slots,
- hidden labels,
- icon buttons,
- variant-specific anatomy,
- action bars.

You still need to review.

Right direction: use AI to speed up documentation, then review like a design system owner.  
Wrong direction: assume generated documentation is correct because it looks polished.

---

# Module 16: Build Web Documentation For Designers And PMs

## What You Are Learning

You are learning how to create interactive documentation for your design system.

This is different from engineering documentation.

## Why Web Documentation Matters

Figma specs are useful, but web docs can be more interactive.

Designers and PMs can:

- preview the component,
- change controls,
- see variants,
- understand behavior,
- read usage rules,
- learn what properties are required,
- understand how the component should be used.

## References Used

The instructor looks at systems like:

- Shadcn,
- Shopify Polaris,
- Uber documentation.

But he adapts the idea for designers and PMs.

## What The Docs Page Includes

The email row docs page includes:

- overview,
- live preview,
- interactive controls,
- variants,
- behavior rules,
- date formatting rules,
- sender grouping rules,
- API/component properties,
- table of contents,
- category navigation.

## Important Decision

He removes code snippets because the audience is designers and PMs.

That is good content strategy.

Documentation should fit the reader.

## How To Execute

1. Create `/docs`.
2. Add categories like tokens, atoms, components, patterns.
3. Create `/docs/components/email-row`.
4. Add live preview.
5. Add controls from real component properties.
6. Add variants.
7. Add behavior rules.
8. Add API/property section.
9. Add table of contents.
10. Test and polish.

Right direction: make docs interactive and audience-specific.  
Wrong direction: copy engineering docs directly and expect designers to use them.

---

# Module 17: Create A Documentation Skill

## What You Are Learning

You are learning how to make documentation repeatable.

After creating one good documentation page, the instructor creates a skill to generate future docs.

## What The Documentation Skill Should Do

The skill should:

- accept a component name,
- inspect source code,
- identify component properties,
- infer interactive controls,
- generate the docs route,
- add navigation entries,
- update "coming soon" states,
- create variants,
- document behavior,
- create API/property sections,
- take screenshots,
- report unmapped properties.

## Why This Matters

If every component doc page is made manually, the documentation will become inconsistent.

A skill keeps the structure repeatable.

## Instructor Thinking

He tests the documentation skill on a smaller atom: tag button.

That is smart because smaller components expose whether the system works without too much complexity.

He also adds a rule for atoms:

> Show which larger components use this atom.

Example:

```text
Tag Button is used inside Email Row labels.
```

This helps designers understand system relationships.

Right direction: use one polished documentation page as the template for future docs.  
Wrong direction: manually create every docs page in a different style.

---

# Module 18: Create A Getting Started Guide

## What You Are Learning

You are learning that a project is not complete until another person can use it.

The instructor asks AI to create a README or getting started guide for designers and PMs.

## What The Guide Should Explain

It should explain:

- what the project is,
- who it is for,
- how to install it,
- how to run it,
- what URLs exist,
- what skills exist,
- when to run each skill,
- how to create prototypes,
- how to use docs,
- common workflows,
- troubleshooting,
- folder structure.

## Why This Matters

If only you understand the system, it is not really a team workflow.

Documentation makes the workflow transferable.

Right direction: write setup docs for the next designer.  
Wrong direction: build a powerful workflow that only you know how to run.

---

# Module 19: The "God Skill" Idea

## What You Are Learning

You are learning the final evolution of the workflow.

The instructor ends with the idea of a higher-level skill that can create lower-level skills.

## What A God Skill Could Ask

It could ask:

- What pattern are we building?
- Is it a drawer, form, menu, kanban board, table, chat interface, or something else?
- Do we need code?
- Do we need Figma generation?
- Do we need documentation?
- What atoms are involved?
- What templates should be used?
- What behavior rules matter?
- Should the workflow generate one component, a full screen, or both?

## What It Could Create

Depending on the need, it could create:

- component code,
- a playground,
- a Figma generation skill,
- a full screen template skill,
- documentation pages,
- documentation skills,
- README instructions.

## Important Warning

The instructor does not start with the god skill.

He first builds one complete workflow manually.

Then he learns from mistakes.

Then he generalizes.

That is the correct order.

Right direction: build one workflow deeply before generalizing.  
Wrong direction: create a universal AI workflow before testing one real pattern.

---

# The Instructor's Thinking Patterns

These are the deeper lessons behind the workflow.

## 1. Plan Before Execution

For complex work, he asks AI to create a plan before making changes.

This helps catch:

- missing information,
- unclear assumptions,
- risky steps,
- wrong tool choices,
- incomplete workflows.

Prompt:

```text
Create a plan for this workflow before making any changes.
List phases, assumptions, open questions, required inputs, and verification steps.
Ask clarifying questions before implementation.
```

## 2. Use Checklists To Control AI

He repeatedly asks AI to create a checklist and update it while working.

This prevents drift.

Prompt:

```text
Create a checklist for this task and mark each item complete as you finish it.
Do not skip verification steps.
```

## 3. Use Confirmation Gates

Before AI edits Figma or files, it should summarize and wait.

Prompt:

```text
Before implementing, summarize what you understood, list what you will change, and wait for my confirmation.
```

Use this when:

- Figma will be edited,
- files will be created,
- components will be published,
- documentation will be generated,
- the task could affect a design system.

## 4. Choose Model Strength Based On Task

He does not use the strongest model for everything.

Use stronger models for:

- planning,
- skill creation,
- complex debugging,
- documentation strategy,
- multi-phase workflows.

Use lighter models for:

- small edits,
- simple file changes,
- basic token renaming,
- minor UI fixes.

The lesson:

> Model choice is part of workflow design.

## 5. Start Fresh Context When Needed

Long conversations can confuse AI.

Start a new context when:

- moving to a new phase,
- the task is focused,
- old context is no longer useful,
- AI starts mixing old and new goals.

## 6. Use Sub-Agents For Focused Exploration

The instructor lets sub-agents inspect:

- variables,
- components,
- annotations,
- templates,
- documentation structure.

Each sub-agent has one job.

The main agent then uses the findings to plan.

## 7. Optimize Token Usage

He notices when AI wastes too many tool calls.

He improves this by:

- caching stable IDs,
- storing component rules in the skill,
- batching property writes,
- publishing missing components,
- avoiding page-wide searches,
- using screenshots instead of repeated retries,
- choosing the right MCP for the task.

## 8. Document Limitations

When something is hard, like slots or unpublished icons, he documents it.

This helps future runs avoid the same problem.

Good skills should know:

- what is possible,
- what requires fallback,
- what must be published,
- what should be verified by screenshot.

---

# The Repeatable Workflow For Any Component

Use this workflow for:

- forms,
- drawers,
- menus,
- tables,
- kanban boards,
- chat interfaces,
- notification rows,
- dashboards,
- checkout flows,
- settings pages.

## Step 1: Pick A Real Component

Choose a component with real states and behavior.

Good examples:

- form field,
- table row,
- card,
- navigation item,
- chat message,
- notification item,
- modal,
- drawer,
- checkout step.

## Step 2: Audit The Figma Component

Check:

- Are variants named properly?
- Are component properties clear?
- Are all states included?
- Are tokens applied?
- Are atoms clean?
- Are annotations present?
- Are edge cases included?
- Is dark mode included?
- Is the component published?

## Step 3: Clean Tokens

Clean:

- raw colors,
- semantic colors,
- typography,
- spacing,
- radius,
- size,
- shadows if needed.

## Step 4: Add Behavior Rules

Document:

- hover behavior,
- truncation,
- max label count,
- date formatting,
- empty states,
- error states,
- grouping rules,
- responsive behavior,
- accessibility notes.

## Step 5: Build In Code

Ask AI to create:

- token files,
- atoms,
- main component,
- behavior utilities,
- playground,
- test examples.

## Step 6: Verify Parity

Compare:

- Figma vs code,
- light vs dark,
- desktop vs responsive,
- normal vs edge cases,
- interaction vs static state.

## Step 7: Create A Skill

The skill should:

- use the published component,
- ask for missing input,
- generate realistic data,
- confirm before writing,
- create the Figma instance,
- screenshot verify,
- retry up to three times,
- report output.

## Step 8: Extend To Templates

Use templates for:

- tables,
- inboxes,
- dashboards,
- drawers,
- settings pages,
- forms.

AI should fill slots instead of inventing layout from scratch.

## Step 9: Build Prototype Routes

Create routes like:

- `/inbox`,
- `/settings`,
- `/checkout`,
- `/dashboard`,
- `/prototypes/name/experiment`.

## Step 10: Publish And Share

Use:

- GitHub for version control,
- PRs for experiments,
- hosted URLs for team sharing,
- preview links for stakeholder review.

## Step 11: Document

Document in:

- Figma specs,
- interactive web docs,
- README or getting started guide.

## Step 12: Generalize

Only after one workflow works, create higher-level skills for other patterns.

---

# Prompt Library

## Planning Prompt

```text
I want to create an AI-assisted workflow for this component or pattern.
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
Ask before applying changes if naming decisions are unclear.
```

## Code Build Prompt

```text
Build this Figma component in code.
Use global tokens derived from Figma.
Do not hardcode values if matching tokens exist.
Read annotations to understand behavior.
Create an interactive browser playground with controls for important states.
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

# What To Include In Component Documentation

| Section | What It Should Explain |
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

For atoms, also document where they are used.

Example:

```text
Tag Button is used inside Email Row labels.
```

This helps designers understand how the system connects.

---

# Mistakes To Avoid

## Mistake 1: Prompting Before Cleanup

Wrong:

```text
AI, generate a design like this.
```

Why it fails:

AI will create something that looks okay but does not follow your system.

Better:

```text
First inspect and clean the variables, atoms, and component rules. Then use the published component to generate instances.
```

## Mistake 2: Letting AI Rebuild Existing Components

Wrong:

Ask AI to redraw the component from scratch.

Why it fails:

It breaks spacing, variants, tokens, and consistency.

Better:

Ask AI to use the published master component and configure it.

## Mistake 3: No Annotations

Wrong:

Assume AI understands behavior from layer names.

Why it fails:

AI may miss date rules, hover behavior, grouping logic, truncation, or slots.

Better:

Write clear annotations in Figma or code specs.

## Mistake 4: No Screenshot Review

Wrong:

Stop when AI says the task is done.

Why it fails:

The output may be visually broken.

Better:

Require screenshot review and a maximum of three fix attempts.

## Mistake 5: No Confirmation Step

Wrong:

Let AI immediately edit Figma or files.

Why it fails:

If AI misunderstood the task, it can create wrong work quickly.

Better:

Require a summary and confirmation before writing.

## Mistake 6: Wasting Tool Calls

Wrong:

Let AI scan the whole Figma file repeatedly.

Why it fails:

It wastes time, tokens, and increases mistakes.

Better:

Cache known IDs, batch writes, and document component rules inside the skill.

## Mistake 7: Generalizing Too Early

Wrong:

Create a universal workflow before one real workflow works.

Why it fails:

You generalize untested assumptions.

Better:

Build one complete workflow, improve it, then generalize.

---

# What AI Can Do vs What You Still Own

| AI Can Help With | You Still Own |
|---|---|
| Inspecting variables | Deciding whether names make sense |
| Generating code | Judging product behavior |
| Creating component instances | Knowing if content feels realistic |
| Creating mock data | Understanding user context |
| Making docs | Checking if docs are useful |
| Finding mismatches | Deciding the correct source of truth |
| Creating prototypes | Choosing what should be tested |
| Suggesting fixes | Making final design decisions |

AI is fast, but it does not know your users, business goals, stakeholder context, or cultural nuance.

Use AI for speed.

Use your judgment for direction.

---

# Tool Guide

## Claude Code / Codex / Cursor

Use for:

- reading files,
- writing code,
- building components,
- creating skills,
- updating documentation,
- managing project structure,
- working with GitHub.

Best for:

Code, project workflows, reusable skills, and documentation automation.

## Figma MCP

Use for:

- inspecting Figma,
- creating or modifying design layers,
- using Figma skills,
- behaving more like a designer inside Figma.

Best for:

General Figma design creation and editing.

## Figma Console MCP

Use for:

- batch operations,
- variable operations,
- screenshots,
- design system checks,
- exact Figma actions.

Best for:

Precise and repeatable Figma operations.

## GitHub

Use for:

- version control,
- branches,
- pull requests,
- team collaboration,
- prototype history.

Best for:

Keeping design prototype projects stable and reviewable.

## Vercel

Use for:

- hosting prototypes,
- generating preview links,
- sharing work with PMs, engineers, and stakeholders.

Best for:

Turning local prototypes into accessible URLs.

---

# Old Way vs New Way

## Old Way

1. Design static screens in Figma.
2. Manually create many variants.
3. Hand off to engineers.
4. Hope implementation matches.
5. Make documentation later.
6. Struggle to share interactive prototypes.

## New Way

1. Clean the design system.
2. Build coded component parity.
3. Create reusable AI skills.
4. Generate realistic component instances.
5. Build interactive prototypes.
6. Share hosted URLs.
7. Document the system as you go.
8. Turn repeated work into reusable skills.

The designer becomes less of a screen maker and more of a system builder.

That is the career-level shift.

---

# Senior Designer Lessons

## Lesson 1: The System Comes First

AI works best when components, tokens, variants, and rules are already clean.

## Lesson 2: Every Workflow Needs Feedback Loops

Check:

- plan,
- output,
- screenshot,
- browser,
- Figma,
- code,
- documentation.

## Lesson 3: Skills Beat One-Off Prompts

A prompt solves one task.

A skill solves a category of tasks.

## Lesson 4: Start Specific, Then Generalize

The instructor starts with one email row.

Then:

- one row becomes many rows,
- many rows become inbox,
- inbox becomes prototype,
- prototype becomes team system,
- component docs become documentation skill,
- workflow becomes god skill.

## Lesson 5: AI Needs Constraints

The best outputs happen when AI is told:

- use existing components,
- use the published library,
- use slots,
- follow annotations,
- follow grouping rules,
- ask before writing,
- verify with screenshots,
- limit retries,
- avoid unnecessary files.

Vague AI gets vague results.

Constrained AI gets useful results.

---

# Example: Applying This To A Form Field

Use this section as a practice model.

## 1. Prepare Figma

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

## 2. Add Rules

Write annotations:

- error text appears only after validation,
- helper text changes when error appears,
- focus border uses accent token,
- disabled text uses muted token,
- character counter appears after a certain length,
- mobile width is fill container.

## 3. Build In Code

Ask AI to build:

- input component,
- validation behavior,
- playground controls,
- sample form.

## 4. Verify Parity

Compare:

- Figma states,
- code states,
- token usage,
- keyboard focus,
- error behavior.

## 5. Create Skill

Prompt:

```text
Create a form field in Figma using the published form field component.
Ask for label, placeholder, helper text, validation state, and optional icon.
Generate realistic examples if missing.
Confirm before writing.
Screenshot and fix.
```

## 6. Extend To Full Form

Prompt:

```text
Create a signup form for a B2B SaaS onboarding flow.
Use the published form template and fill it with appropriate field components.
```

## 7. Build Prototype

Create `/signup` in code.

Add:

- input behavior,
- validation,
- button loading,
- success state,
- error state.

## 8. Publish And Test

Use GitHub and a hosted preview link.

Show it to PMs and engineers.

Ask for feedback on flow behavior, not only visual style.

---

# Final Readiness Checklist

Use this before starting an AI-powered design workflow.

## Figma Readiness

- Component has complete states.
- Variants are named clearly.
- Component properties are meaningful.
- Tokens are applied.
- Atoms are clean.
- Important rules are annotated.
- Component is published.
- Related templates are published.

## Code Readiness

- Global tokens exist.
- Atom components exist.
- Main component exists.
- Playground exists.
- Important states are testable.
- Figma parity has been checked.
- Responsive behavior works.

## Skill Readiness

- Skill has clear trigger phrases.
- Skill reads correct files.
- Skill uses published components.
- Skill asks clarifying questions.
- Skill summarizes before writing.
- Skill uses a checklist.
- Skill screenshots output.
- Skill retries with a cap.
- Skill documents known limitations.

## Team Readiness

- Project is on GitHub.
- Main branch is stable.
- Experiments use branches.
- PR preview links are available.
- Main prototype is hosted.
- Prototype folders are organized.
- README explains how to use the project.
- Skills are available for the tools your team uses.

## Documentation Readiness

- Figma specs exist.
- Web docs exist.
- Component API/properties are clear.
- Behavior rules are documented.
- Variants are visible.
- Usage rules are written.
- Related atoms/components are linked.

---

# Final Summary

The full AI-powered design workflow is:

1. Clean the design system.
2. Build one real component in code.
3. Verify it against Figma.
4. Create a skill to generate that component in Figma.
5. Test the skill and improve it.
6. Extend from one component to a full screen.
7. Build the screen in code for prototyping.
8. Put the project on GitHub.
9. Host it online.
10. Use branches and preview links for experiments.
11. Create team prototype folders.
12. Document specs in Figma.
13. Build interactive web docs.
14. Create reusable documentation skills.
15. Generalize into a higher-level workflow only after the first workflow works.

The deepest lesson:

> AI should not replace your design judgment. AI should remove repeated manual work so you can spend more energy on product thinking, edge cases, user behavior, and design quality.

