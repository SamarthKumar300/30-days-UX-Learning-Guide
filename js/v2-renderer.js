import { getWeekByNumber, getWeekForDay, TOTAL_DAYS, TOTAL_WEEKS, WEEK_DEFINITIONS } from './course-config.js';
import { loadPlan, markdownToHtml } from './v2-plan.js';

function createWeekNavLinks(activePage) {
  return WEEK_DEFINITIONS.map(week => `
    <a href="${week.slug}" class="nav-link${activePage === week.slug ? ' active' : ''}">${week.navTitle}</a>
  `).join('');
}

function createMobileLinks(activePage) {
  return `
    <a href="index.html" class="nav-link${activePage === 'index.html' ? ' active' : ''}">Dashboard</a>
    ${WEEK_DEFINITIONS.map(week => `<a href="${week.slug}" class="nav-link${activePage === week.slug ? ' active' : ''}">${week.navTitle}</a>`).join('')}
    <a href="assignments.html" class="nav-link${activePage === 'assignments.html' ? ' active' : ''}">Assignment Bank</a>
    <a href="references.html" class="nav-link${activePage === 'references.html' ? ' active' : ''}">Guide Notes</a>
  `;
}

function createHeader(activePage) {
  return `
    <header class="site-header" id="site-header">
      <div class="header-inner">
        <a href="index.html" class="site-logo">UX<span>Mastery</span></a>
        <nav class="site-nav" aria-label="Main navigation">
          <a href="index.html" class="nav-link${activePage === 'index.html' ? ' active' : ''}">Dashboard</a>
          <a href="assignments.html" class="nav-link${activePage === 'assignments.html' ? ' active' : ''}">Assignments</a>
          <a href="references.html" class="nav-link${activePage === 'references.html' ? ' active' : ''}">Guide Notes</a>
        </nav>
        <div class="header-right">
          <span class="progress-pill" id="progress-pill">Day 1 of 56</span>
          <div class="week-dots" aria-hidden="true">
            ${WEEK_DEFINITIONS.map(week => `<span class="week-dot" id="week-dot-${week.number}" title="${week.navTitle}"></span>`).join('')}
          </div>
          <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="drawer-overlay" id="drawer-overlay"></div>
    <nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobile navigation" aria-hidden="true">
      ${createMobileLinks(activePage)}
    </nav>
  `;
}

function createFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="site-logo">UX<span>Mastery</span></span>
            <p class="footer-tagline">8 weeks. 56 days. ~400 focused hours. One complete V2 guidebook.</p>
          </div>
          <nav class="footer-nav" aria-label="Footer navigation">
            <a href="index.html">Dashboard</a>
            ${WEEK_DEFINITIONS.map(week => `<a href="${week.slug}">Week ${week.number}</a>`).join('')}
            <a href="assignments.html">Assignments</a>
            <a href="references.html">Guide Notes</a>
          </nav>
        </div>
      </div>
    </footer>
  `;
}

function renderWeekProgressDots(week) {
  const dots = [];
  for (let day = week.startDay; day <= week.endDay; day += 1) {
    dots.push(`
      <div class="week-dot-item" data-week-dot="${day}">
        <div class="wdot"><span>${day}</span></div>
        <div class="wdot-label">Day ${day}</div>
      </div>
    `);
  }
  return dots.join('');
}

function renderSpecialBlock(block) {
  if (block.type === 'challenge') {
    return `<article class="system-card system-card--challenge"><p class="system-card-kicker">Design Challenge #${block.number}</p><div class="system-card-body">${markdownToHtml(block.text)}</div></article>`;
  }
  if (block.type === 'defense') {
    return `<article class="system-card system-card--defense"><p class="system-card-kicker">${block.title}</p><div class="system-card-body">${markdownToHtml(block.text)}</div></article>`;
  }
  if (block.type === 'behavioral') {
    return `<article class="system-card system-card--behavioral"><p class="system-card-kicker">${block.title}</p><div class="system-card-body">${markdownToHtml(block.text)}</div></article>`;
  }
  return '';
}

function renderReadiness(day) {
  if (!day.readiness) return '';

  const patterns = day.readiness.strongAnswerPatterns.length
    ? `<div class="readiness-group"><h4>Strong answer patterns</h4><ul>${day.readiness.strongAnswerPatterns.map(item => `<li>${item}</li>`).join('')}</ul></div>`
    : '';
  const proof = day.readiness.proofExercise
    ? `<div class="readiness-group"><h4>Proof exercise</h4><p>${day.readiness.proofExercise}</p></div>`
    : '';
  const extras = day.readiness.extraLines.length
    ? `<div class="readiness-group"><h4>Additional notes</h4>${markdownToHtml(day.readiness.extraLines.join('\n'))}</div>`
    : '';

  return `
    <div class="block-reflection">
      <div class="block-header">
        <span class="block-icon">Interview</span>
        <span class="block-label">Interview Readiness Layer</span>
        <span class="badge badge-duration">${day.estimatedHours || 'Daily layer'}</span>
        <label class="checkbox-wrapper" onclick="event.stopPropagation()" style="margin-left:auto">
          <input type="checkbox" data-block-check="reflection" data-day="${day.number}">
          <span class="checkbox-custom"></span>
        </label>
      </div>
      <div class="readiness-content">
        ${day.readiness.mindset ? `<div class="readiness-group"><h4>Mindset</h4><p>${day.readiness.mindset}</p></div>` : ''}
        ${patterns}
        ${proof}
        ${extras}
      </div>
    </div>
  `;
}

function renderStudyContent(day) {
  if (day.studyTabs?.length) {
    return `
      <div class="study-tab-stack">
        ${day.studyTabs.map(tab => `
          <section class="study-tab-section">
            <h3>${tab.label}</h3>
            <div class="markdown-content">${markdownToHtml(tab.markdown)}</div>
          </section>
        `).join('')}
      </div>
    `;
  }

  return `<div class="study-content-wrapper markdown-content">${markdownToHtml(day.studyMarkdown)}</div>`;
}

function renderDayAccordion(day) {
  const systemCards = day.specialBlocks.map(renderSpecialBlock).join('');
  const assignmentHtml = day.assignment ? markdownToHtml(day.assignment) : '';
  const practiceBlock = systemCards ? `
        <div class="block-practice">
          <div class="block-header">
            <span class="block-icon">Systems</span>
            <span class="block-label">Challenges, Drills & Systems</span>
            <label class="checkbox-wrapper" onclick="event.stopPropagation()" style="margin-left:auto">
              <input type="checkbox" data-block-check="practice" data-day="${day.number}">
              <span class="checkbox-custom"></span>
            </label>
          </div>
          <div class="practice-content">${systemCards}</div>
        </div>
  ` : '';
  const assignmentBlock = assignmentHtml ? `
        <div class="block-assignment inline-assignment">
          <div class="block-header">
            <span class="block-icon">Task</span>
            <span class="block-label">Assignment</span>
            <label class="checkbox-wrapper" onclick="event.stopPropagation()" style="margin-left:auto">
              <input type="checkbox" data-block-check="assignment" data-day="${day.number}" data-assignment-id="${day.assignmentId}">
              <span class="checkbox-custom"></span>
            </label>
          </div>
          <div class="assignment-content markdown-content">${assignmentHtml}</div>
        </div>
  ` : '';

  return `
    <div class="accordion-item${day.number % 7 === 0 ? ' integration' : ''}" data-day="${day.number}" id="day-${day.number}">
      <div class="accordion-header" tabindex="0" role="button" aria-expanded="false">
        <div class="accordion-header-left">
          <label class="checkbox-wrapper" onclick="event.stopPropagation()">
            <input type="checkbox" class="day-complete-checkbox" data-day-check="${day.number}">
            <span class="checkbox-custom"></span>
          </label>
          <div class="accordion-title-group">
            <span class="accordion-day-num">Day ${day.number}</span>
            <span class="accordion-title">${day.title}</span>
          </div>
        </div>
        <div class="accordion-header-right">
          <span class="badge badge-duration">${day.estimatedHours || 'Planned day'}</span>
          <span class="accordion-icon" aria-expanded="false">v</span>
        </div>
      </div>
      <div class="accordion-body">
        <div class="block-study">
          <div class="block-header">
            <span class="block-icon">Guide</span>
            <span class="block-label">Guidebook Breakdown</span>
            <label class="checkbox-wrapper" onclick="event.stopPropagation()" style="margin-left:auto">
              <input type="checkbox" data-block-check="study" data-day="${day.number}">
              <span class="checkbox-custom"></span>
            </label>
          </div>
          ${renderStudyContent(day)}
        </div>
        ${practiceBlock}
        ${assignmentBlock}
        ${renderReadiness(day)}
      </div>
    </div>
  `;
}

function renderCodexBotShell() {
  return `
    <div class="codex-bot-shell" id="codex-bot-shell">
      <button class="codex-bot-fab" id="codex-bot-fab" aria-label="Open Codex bot" aria-expanded="false" aria-controls="codex-bot-panel">
        <span class="codex-bot-fab-label">Codex</span>
      </button>
      <section class="codex-bot-panel" id="codex-bot-panel" aria-label="Codex bot" aria-hidden="true">
        <div class="codex-bot-panel-header">
          <div>
            <p class="codex-bot-kicker">Private assistant</p>
            <h2 class="codex-bot-title">Codex Bot</h2>
          </div>
          <button class="codex-bot-close" id="codex-bot-close" aria-label="Close Codex bot">×</button>
        </div>
        <div class="codex-bot-auth" id="codex-bot-auth">
          <p class="codex-bot-auth-copy">Unlock the bot with your private access secret.</p>
          <form class="codex-bot-auth-form" id="codex-bot-auth-form">
            <input class="codex-bot-input" id="codex-bot-secret" type="password" autocomplete="current-password" placeholder="Enter private access secret" required>
            <button class="btn btn-primary codex-bot-auth-btn" type="submit">Unlock</button>
          </form>
          <p class="codex-bot-status" id="codex-bot-auth-status" aria-live="polite"></p>
        </div>
        <div class="codex-bot-chat hidden" id="codex-bot-chat">
          <div class="codex-bot-messages" id="codex-bot-messages" aria-live="polite"></div>
          <form class="codex-bot-composer" id="codex-bot-form">
            <textarea class="codex-bot-input codex-bot-textarea" id="codex-bot-message" placeholder="Ask about the current lesson, framework, or interview concept..." rows="3" required></textarea>
            <div class="codex-bot-actions">
              <button class="btn btn-secondary" type="button" id="codex-bot-clear">Clear</button>
              <button class="btn btn-primary" type="submit" id="codex-bot-send">Ask</button>
            </div>
          </form>
          <p class="codex-bot-status" id="codex-bot-chat-status" aria-live="polite"></p>
        </div>
      </section>
    </div>
  `;
}

function renderDashboard(plan) {
  const heroStats = [
    { value: '8', label: 'weeks' },
    { value: '56', label: 'days' },
    { value: '~400', label: 'hours' },
    { value: '30', label: 'design challenges' },
  ];

  return `
    ${createHeader('index.html')}
    <main class="site-main">
      <section class="page-hero">
        <div class="container">
          <div class="page-hero-eyebrow">V2 Guidebook Plan</div>
          <h1 class="page-hero-title">8-Week UX Mastery <span class="text-gradient">Study Guide</span></h1>
          <p class="page-hero-subtitle">${plan.meta.target || ''}</p>
          <div class="hero-stats-row">${heroStats.map(stat => `<div class="hero-stat"><span class="hero-stat-val">${stat.value}</span><span class="hero-stat-label">${stat.label}</span></div>`).join('')}</div>
          <a href="week1.html#day-1" class="btn btn-primary" id="continue-btn">Begin Day 1 -></a>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Program Overview</h2>
            <p class="section-subtitle">${plan.meta.approach || ''}</p>
          </div>
          <div class="overview-grid">
            <article class="overview-card"><h3>Target</h3><p>${plan.meta.target || ''}</p></article>
            <article class="overview-card"><h3>Duration</h3><p>${plan.meta.duration || ''}</p></article>
            <article class="overview-card"><h3>Approach</h3><p>${plan.meta.approach || ''}</p></article>
            <article class="overview-card"><h3>Content</h3><p>${plan.meta.content || ''}</p></article>
          </div>
        </div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Your 56-Day Journey</h2>
            <p class="section-subtitle">Click any day to jump directly into that day's guidebook breakdown.</p>
          </div>
          <div class="global-timeline">
            ${plan.weeks.map(week => `
              <div class="tl-week">
                <div class="tl-week-label" style="color:var(${getWeekByNumber(week.number).accentVar})">Week ${week.number} - ${week.title}</div>
                <div class="tl-days">
                  ${week.days.map(day => `<div class="tl-day tl-empty${day.number % 7 === 0 ? ' tl-integration' : ''}" data-timeline-day="${day.number}" title="Day ${day.number}: ${day.title}"><span>${day.number}</span></div>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="timeline-stats">
            <div class="tl-stat">
              <div class="tl-stat-row"><span class="tl-stat-label">Days completed</span><span class="tl-stat-val"><span id="stat-days">0</span> / ${TOTAL_DAYS}</span></div>
              <div class="progress-bar-track"><div class="progress-bar-fill" id="progress-bar-days" style="width:0%" aria-valuenow="0"></div></div>
            </div>
            <div class="tl-stat">
              <div class="tl-stat-row"><span class="tl-stat-label">Assignments completed</span><span class="tl-stat-val"><span id="stat-assignments">0</span> / ${TOTAL_DAYS}</span></div>
              <div class="progress-bar-track"><div class="progress-bar-fill progress-bar-fill--green" id="progress-bar-assignments" style="width:0%" aria-valuenow="0"></div></div>
            </div>
            <div class="tl-stat">
              <div class="tl-stat-row"><span class="tl-stat-label">Readiness notes written</span><span class="tl-stat-val"><span id="stat-reflections">0</span> / ${TOTAL_DAYS}</span></div>
              <div class="progress-bar-track"><div class="progress-bar-fill progress-bar-fill--purple" id="progress-bar-reflections" style="width:0%" aria-valuenow="0"></div></div>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Architecture Overview</h2>
            <p class="section-subtitle">How the curriculum is structured across the full 56-day website experience.</p>
          </div>
          <div class="table-wrap">
            <table class="markdown-table">
              <thead><tr>${(plan.architectureRows[0] || []).map(cell => `<th>${cell}</th>`).join('')}</tr></thead>
              <tbody>${plan.architectureRows.slice(1).map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Weeks & Themes</h2>
            <p class="section-subtitle">The site now follows the V2 week structure end-to-end.</p>
          </div>
          <div class="week-cards-grid">
            ${plan.weeks.map(week => {
              const config = getWeekByNumber(week.number);
              return `
                <a href="${config.slug}" class="week-card" style="--week-color:var(${config.accentVar})">
                  <div class="week-card-num">Week ${week.number}</div>
                  <h3 class="week-card-title">${week.title}</h3>
                  <p class="week-card-days">Days ${week.startDay}-${week.endDay}</p>
                  <p class="week-card-desc">${week.theme}</p>
                  <div class="week-card-progress">
                    <div class="week-card-progress-row"><span><span id="week-count-${week.number}">0</span>/${week.endDay - week.startDay + 1} days</span></div>
                    <div class="progress-bar-track"><div class="progress-bar-fill" id="week-progress-${week.number}" style="width:0%"></div></div>
                  </div>
                  <div class="week-card-cta">Open Week ${week.number} -></div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Systems & Features</h2>
            <p class="section-subtitle">Everything the V2 plan introduces or extends.</p>
          </div>
          <div class="markdown-panel markdown-content">${markdownToHtml(plan.systemsMarkdown)}</div>
        </div>
      </section>
      <section class="section section--alt">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Verification Checklist</h2>
            <p class="section-subtitle">Coverage tracked against the source material.</p>
          </div>
          <div class="verification-grid">
            ${plan.verificationGroups.map(group => `
              <article class="verification-card">
                <h3>${group.title}</h3>
                <ul>${group.items.map(item => `<li><span>${item.checked ? 'OK' : '-'}</span><span>${item.text}</span></li>`).join('')}</ul>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
    ${renderCodexBotShell()}
    ${createFooter()}
  `;
}

function renderWeekPage(plan, weekNumber) {
  const week = plan.weekLookup[weekNumber];
  const config = getWeekByNumber(weekNumber);
  return `
    ${createHeader(config.slug)}
    <main class="week-main">
      <section class="week-hero" style="--week-accent:var(${config.accentVar})">
        <div class="container">
          <div class="week-hero-eyebrow">Days ${week.startDay}-${week.endDay}</div>
          <h1 class="week-hero-title">Week ${week.number}: <span class="text-gradient">${week.title}</span></h1>
          <p class="week-hero-goal">${week.theme}</p>
          ${week.interviewReadiness || week.newSystem ? `
            <div class="week-meta-grid">
              ${week.interviewReadiness ? `<article class="week-meta-card"><h3>Week-Level Interview Readiness</h3><p>${week.interviewReadiness}</p></article>` : ''}
              ${week.newSystem ? `<article class="week-meta-card"><h3>New System Introduced</h3><p>${week.newSystem}</p></article>` : ''}
            </div>
          ` : ''}
          <div class="week-progress-dots">${renderWeekProgressDots(week)}</div>
        </div>
      </section>
      <section class="week-layout container">${week.days.map(renderDayAccordion).join('')}</section>
    </main>
    ${renderCodexBotShell()}
    ${createFooter()}
  `;
}

function renderAssignments(plan) {
  const cards = plan.weeks.flatMap(week => week.days.map(day => {
    const specialTags = day.specialBlocks.map(block => {
      if (block.type === 'challenge') return 'Design challenge';
      if (block.type === 'defense') return 'Defense drill';
      if (block.type === 'behavioral') return 'Behavioral scenario';
      return null;
    }).filter(Boolean);

    return `
      <div class="assignment-card" data-difficulty="all" data-week="${week.number}">
        <div class="assignment-card-header">
          <label class="assignment-check-label">
            <input type="checkbox" class="assignment-checkbox" data-assignment-id="${day.assignmentId}" aria-label="Mark Day ${day.number} assignment complete">
            <span class="assignment-check-box"></span>
          </label>
          <div class="assignment-card-title">Day ${day.number}: ${day.title}</div>
          <span class="badge badge-week">Week ${week.number}</span>
        </div>
        <p class="assignment-card-desc">${day.assignment}</p>
        <div class="assignment-card-footer">
          <a href="${getWeekForDay(day.number).slug}#day-${day.number}" class="assignment-day-link">Open day</a>
          <span class="assignment-week-tag week${week.number}-tag">${specialTags.join(' - ') || week.title}</span>
        </div>
      </div>
    `;
  })).join('');

  return `
    ${createHeader('assignments.html')}
    <main class="assignments-main">
      <section class="page-hero assignments-hero">
        <div class="container">
          <div class="page-hero-eyebrow">Assignment Bank</div>
          <h1 class="page-hero-title">56 Daily Assignments</h1>
          <p class="page-hero-subtitle">Every assignment from the V2 guidebook is tracked here, week by week.</p>
          <div class="assignments-summary-bar">
            <div class="summary-stat"><span class="summary-num" id="stat-assign-completed">0</span><span class="summary-label">of ${TOTAL_DAYS} completed</span></div>
            <div class="summary-stat"><span class="summary-num summary-short" id="stat-short-completed">0</span><span class="summary-label">weeks with progress</span></div>
            <div class="summary-stat"><span class="summary-num summary-medium" id="stat-medium-completed">${TOTAL_DAYS}</span><span class="summary-label">assignments in bank</span></div>
            <div class="summary-stat"><span class="summary-num summary-high" id="stat-high-completed">0</span><span class="summary-label">best week streak</span></div>
          </div>
        </div>
      </section>
      <div class="filter-bar-wrapper">
        <div class="container">
          <div class="filter-bar">
            <div class="filter-group" role="group" aria-label="Filter by week">
              <span class="filter-group-label">Week</span>
              <button class="filter-btn active" data-filter-group="week" data-filter-value="all">All</button>
              ${WEEK_DEFINITIONS.map(week => `<button class="filter-btn" data-filter-group="week" data-filter-value="${week.number}">Week ${week.number}</button>`).join('')}
            </div>
            <div class="filter-divider" aria-hidden="true"></div>
            <div class="filter-group" role="group" aria-label="Filter by status">
              <span class="filter-group-label">Status</span>
              <button class="filter-btn active" data-filter-group="status" data-filter-value="all">All</button>
              <button class="filter-btn" data-filter-group="status" data-filter-value="completed">Done</button>
              <button class="filter-btn" data-filter-group="status" data-filter-value="pending">Pending</button>
            </div>
          </div>
        </div>
      </div>
      <section class="container assignment-section">
        <h2 class="section-heading"><span class="section-heading-badge badge-week">V2</span>Daily Assignment Index<span class="section-heading-sub">Mapped directly from the markdown plan</span></h2>
        <div class="assignment-grid" id="assignment-grid">${cards}</div>
        <div class="assignments-empty" id="assignments-empty" hidden>
          <div class="empty-icon">[ ]</div>
          <p>No assignments match your current filters.</p>
          <button class="btn-secondary" id="reset-filters-btn">Reset filters</button>
        </div>
      </section>
    </main>
    ${renderCodexBotShell()}
    ${createFooter()}
  `;
}

function renderReferences(plan) {
  return `
    ${createHeader('references.html')}
    <main class="references-main">
      <section class="page-hero references-hero">
        <div class="container">
          <div class="page-hero-eyebrow">Guide Notes</div>
          <h1 class="page-hero-title">V2 Curriculum Notes</h1>
          <p class="page-hero-subtitle">Coverage rules, implementation notes, and verification checkpoints for the website-first guidebook.</p>
        </div>
      </section>
      <section class="container references-layout">
        <div class="references-content">
          <section class="ref-section">
            <h2 class="ref-section-title">Coverage Audit Status</h2>
            <div class="markdown-content">${markdownToHtml(plan.auditSummaryMarkdown)}</div>
          </section>
          <section class="ref-section">
            <h2 class="ref-section-title">Coverage Requirements</h2>
            <div class="markdown-content">${markdownToHtml(plan.challengeMapMarkdown)}</div>
          </section>
          <section class="ref-section">
            <h2 class="ref-section-title">Part-by-Part PDF Coverage</h2>
            <div class="markdown-content">${markdownToHtml(plan.auditPartByPartMarkdown)}</div>
          </section>
          <section class="ref-section">
            <h2 class="ref-section-title">Minor Concept Checklist</h2>
            <div class="markdown-content">${markdownToHtml(plan.auditChecklistMarkdown)}</div>
          </section>
          <section class="ref-section">
            <h2 class="ref-section-title">Paragraph Fidelity Review</h2>
            <div class="markdown-content">${markdownToHtml(plan.auditFidelityMarkdown)}</div>
          </section>
          <section class="ref-section">
            <h2 class="ref-section-title">Technical Implementation Notes</h2>
            <div class="markdown-content">${markdownToHtml(plan.technicalMarkdown)}</div>
          </section>
          <section class="ref-section">
            <h2 class="ref-section-title">Optional Support Resources</h2>
            <div class="markdown-content">${markdownToHtml(plan.auditResourcesMarkdown)}</div>
          </section>
          <section class="ref-section">
            <h2 class="ref-section-title">Website-First Rule</h2>
            <div class="markdown-content">
              <p>The website is the study surface. Source PDFs are intentionally not presented here as required reading.</p>
              <p>Implementation work should keep moving concepts from the PDFs into the day pages until the website contains the full curriculum.</p>
            </div>
          </section>
        </div>
        <aside class="references-sidebar">
          <div class="ref-sidebar-sticky">
            <h3 class="ref-sidebar-title">Coverage Check</h3>
            <div class="verification-mini">${plan.verificationGroups.map(group => `<article class="verification-mini-card"><h4>${group.title}</h4><p>${group.items.filter(item => item.checked).length}/${group.items.length} mapped</p></article>`).join('')}</div>
            <div class="ref-sidebar-divider"></div>
            <h3 class="ref-sidebar-title">Week Quick Links</h3>
            <nav class="ref-sidebar-nav">${WEEK_DEFINITIONS.map(week => `<a href="${week.slug}" class="ref-sidebar-link">${week.navTitle}</a>`).join('')}</nav>
          </div>
        </aside>
      </section>
    </main>
    ${renderCodexBotShell()}
    ${createFooter()}
  `;
}

export async function renderPage(page, root) {
  const plan = await loadPlan();
  if (page === 'index.html' || page === '') root.innerHTML = renderDashboard(plan);
  else if (page === 'assignments.html') root.innerHTML = renderAssignments(plan);
  else if (page === 'references.html') root.innerHTML = renderReferences(plan);
  else {
    const weekMatch = page.match(/^week(\d)\.html$/);
    if (weekMatch) root.innerHTML = renderWeekPage(plan, Number(weekMatch[1]));
  }
}
