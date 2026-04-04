# UX Mastery Plan

A polished multi-page learning website for a 30-day UX and Product Design mastery roadmap. The site organizes the curriculum into week-based study experiences, assignments, references, progress tracking, reflections, and a built-in study timer.

This project is a static frontend built with HTML, CSS, and vanilla JavaScript.

## Overview

The website is designed as a self-guided 30-day learning system for UX and product design preparation. It helps learners move through a structured curriculum with:

- Weekly study pages
- Daily learning modules
- Practice sessions
- Assignments
- Reflection prompts
- Progress tracking
- Timer support
- Reference library
- Assignment bank

The UI was redesigned to follow a cleaner, lighter editorial SaaS-style layout inspired by a modern product website reference. The design system uses a soft light theme, rounded surfaces, Product Sans-style typography fallback, and a more focused day-by-day learning experience.

## Features

### Dashboard

The homepage gives an overview of the complete 30-day plan.

It includes:

- Program hero section
- 30-day roadmap
- Week-level progress
- Timeline navigation
- Weekly entry points
- Learning structure overview

### Weekly Learning Pages

Each week has its own dedicated page:

- `week1.html`
- `week2.html`
- `week3.html`
- `week4.html`

Each week page includes:

- A weekly hero section
- Day tabs for quick switching between days
- A single active day view instead of showing all day content at once
- Big Idea, Study, Practice, Assignment, and Reflection sections
- Sticky right-hand sidebar behavior on desktop for supporting blocks
- Day completion and block completion tracking

### Assignment Bank

The assignments page aggregates all assignments from the 30-day program.

It includes:

- Difficulty grouping
- Filtering
- Progress tracking
- Assignment navigation back to source days

### Reference Page

The reference page acts as a compact knowledge library.

It includes:

- Core principles
- Key formulas
- Quick links
- Condensed learning references

### Progress Tracking

The app uses local browser storage to persist:

- Day completion
- Block completion
- Assignment completion
- Reflection content
- Timer state

This allows the user to leave and return without losing progress.

### Reflection Autosave

Each reflection area is automatically saved in local storage as the user types.

### Built-in Timer

A floating timer widget supports focused work sessions for:

- Study
- Practice
- Assignment
- Reflection

### Start Date Logic

The app supports a delayed start state, where Day 1 can begin from the next day instead of immediately.

## Project Structure

```text
plan/
├── index.html
├── week1.html
├── week2.html
├── week3.html
├── week4.html
├── assignments.html
├── references.html
├── README.md
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── dashboard.css
│   ├── week.css
│   ├── assignments.css
│   └── references.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── accordion.js
│   ├── progress.js
│   ├── reflections.js
│   ├── timer.js
│   ├── storage.js
│   ├── radar-chart.js
│   └── assignments-filter.js
└── assets/
    └── image.png
```

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Local Storage for persistence

No framework or build tool is required.

## Design System Notes

The current visual direction is based on:

- Light neutral background
- Soft elevated cards
- Rounded containers
- Product Sans style typography fallback
- Modern SaaS-inspired editorial layout
- Strong spacing hierarchy
- Reduced visual clutter
- Single-day focused learning flow

## How the Site Works

### Daily Learning Model

Each day is broken into structured parts:

- Big Idea
- Study Session
- Practice Session
- Daily Assignment
- Reflection

### Day Navigation

Week pages behave like a tabbed experience:

- The top day strip is tappable and clickable
- Only one day is visible at a time
- The active day updates the visible content panel

### Sticky Sidebar

On desktop, the supporting actions and applied work are grouped on the right side:

- Practice Session
- Daily Assignment
- Reflection
- Right Direction / Wrong Direction guidance

This keeps the core study content readable while important action items stay visible.

## Local Development

Because this is a static site, you can open it directly in the browser or serve it locally.

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use a local server

If you have Python installed:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Git Setup

To initialize and push this project to GitHub:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Notes

- Progress is stored locally in the browser, not in a backend.
- Clearing browser storage will reset saved progress unless exported manually.
- Product Sans is referenced via local system fallback, so exact typography may vary by machine.
- The project currently prioritizes static usability and visual polish over backend integration.

## Possible Future Improvements

- Add true server-side user accounts
- Sync progress across devices
- Add export and import for progress data
- Add search across daily content
- Add keyboard navigation for day tabs
- Add theme variants
- Improve accessibility states and ARIA coverage further
- Add responsive fine-tuning for all week pages

## License

This project is currently for personal or internal use unless a separate license is added.
