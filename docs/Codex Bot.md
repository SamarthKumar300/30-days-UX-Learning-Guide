# Codex Bot Implementation Plan

## Summary

Create a secure Gemini-powered website assistant for this project. The bot will replace the timer completely and appear as a single global FAB across all pages. Clicking the FAB opens a right-side slide-over chat panel. The bot will be privately accessible, strictly grounded in the website curriculum, and served through a private deployed serverless backend.

Locked decisions:

- timer is removed fully
- bot replaces the timer FAB globally
- bot opens as a slide-over chat panel
- private access is handled by a one-time secret prompt inside the FAB flow
- backend is a private deployed serverless API
- provider is Gemini API
- answers are strictly grounded to website content
- retrieval uses bundled local content files, not a vector DB

## Implementation Changes

### 1. Replace Timer With Global Codex FAB

- Remove the timer feature end-to-end:
  - delete global timer widget rendering
  - remove inline `Start Timer` buttons from day blocks
  - remove timer runtime initialization from the main entrypoint
  - remove timer-specific persisted state from local storage defaults and helpers
  - remove timer-specific styles and variables
- Add a single global Codex FAB rendered on every page shell.
- Place the FAB in the same bottom-corner position currently associated with the timer.
- FAB behavior:
  - closed state shows branded Codex help entrypoint
  - first open prompts for private access secret
  - authenticated open state launches a slide-over chat panel
  - panel stays available across dashboard, weeks, assignments, and guide notes pages

### 2. Add Private, Secure Bot Backend

- Add a private serverless chat endpoint such as `POST /api/chat`.
- Keep all Gemini API calls server-side only.
- Store secrets in deployment environment variables only.
- Require private access proof on every chat request.
- Use short-lived session verification after the initial secret prompt.
- Add hard security controls:
  - rate limiting
  - request schema validation
  - input size limits
  - timeout handling
  - origin checks
  - safe error responses
  - minimal/no transcript logging by default
- Do not expose bot internals, prompts, or credentials to the browser.
- Prefer Gemini API free tier limits first; only move to paid billing if usage or deployment needs exceed the free tier.

### 3. Ground Bot Answers In Website Content

- Build a backend retrieval index from:
  - `content/Day-wise-content.md`
  - `content/V2-guidebook-plan.md`
  - `content/PDF-coverage-audit.md`
- Chunk content by meaningful curriculum boundaries:
  - week/day
  - tab section
  - audit section
  - implementation note section
- Retrieval rules:
  - prioritize current page and current day/week context
  - return only the most relevant chunks
  - strictly ground answers to retrieved curriculum content
  - explicitly say when a topic is not covered on the website
- Response format should include:
  - answer text
  - citations/source labels
  - grounded flag
  - fallback reason when coverage is missing

### 4. Build Global Slide-Over Chat UX

- Add a global chat shell attached to the shared page renderer so it appears on every page.
- Slide-over panel should support:
  - message list
  - input composer
  - loading state
  - grounded citations
  - retry state
  - clear session action
- First-open flow:
  - tap FAB
  - prompt for private access secret
  - verify against backend
  - persist only a short-lived client session token or signed access artifact
- Keep chat history client-side by default for privacy.
- Render model output safely:
  - no unsafe HTML injection
  - escaped text or tightly controlled markdown rendering only
- Ensure mobile responsiveness and no UI breakage:
  - FAB placement must work across mobile, tablet, and desktop
  - slide-over panel must adapt cleanly to narrow screens
  - no overlap with navigation, drawers, or existing study content
  - no layout regressions on dashboard, week pages, assignments, or guide notes
  - mobile interactions, scrolling, focus handling, and close behavior must remain reliable

### 5. Public Interfaces / Contract

- New backend endpoint:
  - `POST /api/chat`
  - optional `POST /api/chat/auth` or equivalent secret-verification route
- Chat request should carry:
  - `message`
  - `page`
  - optional `day`
  - optional `week`
  - optional `chat_history`
  - access session artifact
- Chat response should carry:
  - `answer`
  - `citations`
  - `grounded`
  - optional `fallback_reason`

## Test Plan

- Global FAB appears on all pages and replaces the timer position.
- No timer widget, timer buttons, or timer state remain in the UI flow.
- First FAB open prompts for secret and does not allow chat before verification.
- Verified user can open and reuse the slide-over panel across pages.
- Bot answers a day-specific question using only website curriculum content.
- Bot cites the correct day/week/section for grounded responses.
- Bot clearly says when the website does not cover a question.
- Requests without valid access proof fail safely.
- Gemini API credentials are absent from frontend assets and browser-visible config.
- Prompt-injection-style queries do not override grounding behavior.
- Large payloads, malformed payloads, and timeout scenarios fail gracefully.
- Chat remains usable when your personal machine is off because the backend is deployed.
- FAB and chat panel remain usable and visually stable on mobile, tablet, and desktop without breaking existing layouts.

## Assumptions and Defaults

- The site remains a static frontend with added serverless backend endpoints.
- No full login system will be added in v1.
- Private access will rely on a one-time secret prompt plus short-lived session validation.
- Bot responses remain strictly grounded to the indexed website curriculum.
- Retrieval will use bundled local content files unless the corpus later grows enough to justify a vector DB.
- Initial deployment should target Gemini API free tier usage and remain compatible with later migration to paid tier only if needed.
