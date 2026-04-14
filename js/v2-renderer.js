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
    <a href="human-specific-topics.html" class="nav-link${activePage === 'human-specific-topics.html' ? ' active' : ''}">Human Edge</a>
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
          <a href="human-specific-topics.html" class="nav-link${activePage === 'human-specific-topics.html' ? ' active' : ''}">Human Edge</a>
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
            <a href="human-specific-topics.html">Human Edge</a>
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

function renderHumanTopics() {
  const topics = [
    {
      id: 'emotion-naming',
      icon: '◈',
      label: 'Emotion',
      title: 'Naming Emotions with Surgical Precision',
      days: [4, 10],
      summary: 'AI can classify sentiment as positive or negative. It cannot tell you that a user is not "frustrated" but specifically <em>embarrassed</em> — the social exposure of a declined card in front of a partner, or the particular regret that lands exactly 30 seconds after sending an email you shouldn\'t have.',
      why: 'Precision emotion vocabulary is built from lived human experience. You have felt embarrassment, doubt, the specific weight of being stuck while others watch. That felt knowledge is what lets you design the recovery with genuine understanding — not modeled understanding — of what it costs someone to stay in the moment.',
      whyAiCant: 'An AI can match words to emotion categories. It cannot hold the contradiction of a user who is simultaneously relieved and ashamed. The emotional texture of human experience — its layering, its contradictions, its dependence on what happened ten minutes ago — exceeds classification.',
      principle: 'Replace vague emotional language with specific states: not <em>frustrated</em> but <strong>impatient</strong> (blocked speed), <strong>embarrassed</strong> (social exposure), <strong>doubtful</strong> (lack of trust), <strong>betrayed</strong> (violated expectation). Each specific emotion points to a different design response.',
      quote: 'Gmail added "Undo Send" because someone named the emotion precisely as <em>regret</em> — not frustration, not confusion — specifically the regret that arrives post-action. That precision led to the right feature. Naming it generically would have produced a redesigned compose experience instead.',
    },
    {
      id: 'say-do-need',
      icon: '◉',
      label: 'Research',
      title: 'Triangulating Say, Do, and Need',
      days: [9, 15, 16],
      summary: 'Users say "I want a simpler interface." They use advanced filters on every session. They need those filters to be accessible without cognitive overhead. AI can analyse stated preferences and behavioral data — but it cannot bridge the gap between what someone says, what they actually do, and what they truly need.',
      why: 'The Say-Do-Need gap is not a data problem. It is a human interpretation problem. It requires a researcher who can hold contradiction without resolving it prematurely, who can sit with the tension between what someone claims and what they demonstrate, and who can reach a third insight that neither the words nor the data would have surfaced alone.',
      whyAiCant: 'AI can surface discrepancies between survey responses and clickstream data. It cannot decide what those discrepancies mean for a specific user in a specific context, or understand why someone protects their stated preference even when their behavior contradicts it — the social and psychological dynamics behind the gap.',
      principle: 'Design for the <strong>need</strong>, not the <strong>say</strong>. The say is what users report when they want to be helpful or sound reasonable. The do is what they actually do when no one is watching. The need is what they are actually trying to accomplish underneath both.',
      quote: 'Duolingo\'s churned users said they "forgot" to practice. Their behavior showed they stopped after streak breaks. Their actual need was: a recovery path that didn\'t feel like failure. The insight lived in the gap between the stated reason and the real mechanism — invisible to data alone.',
    },
    {
      id: 'unspoken-room',
      icon: '◎',
      label: 'Stakeholders',
      title: 'Reading What Is Not Said in the Room',
      days: [5, 17, 27],
      summary: 'When a PM says "I don\'t like the layout," a human designer hears the unspoken anxiety underneath — the memory of a previous project that failed at this exact step, the fear of how leadership will react, the hesitation that signals an unresolved concern no one has named yet.',
      why: 'Social intelligence in professional settings is accumulated through thousands of human interactions. You have learned to read the forced agreement that means "I\'ll comply but I disagree." You have learned that the person who speaks last and briefly often has the most important perspective. You have learned that the loudest objection is rarely the real one.',
      whyAiCant: 'AI can transcribe and summarize meeting notes. It cannot read the body language, the hesitation before a comment, the moment someone almost says something and decides not to. The subtext of human professional communication requires a human presence to receive.',
      principle: 'The "why behind the why" technique: for every piece of feedback, ask what outcome the stakeholder is actually trying to protect. Then address that outcome — not the surface suggestion. A PM who says "this is too complex" may be protecting new user retention. Address the retention concern, not the complexity.',
      quote: 'The strongest conflict resolution pattern: find the shared goal, then propose options with trade-offs. PMs and designers arguing about a feature are both trying to serve users and hit metrics. Finding that shared foundation converts positional conflict into principled design debate.',
    },
    {
      id: 'shame-recovery',
      icon: '◇',
      label: 'Empathy',
      title: 'Designing Through Shame and Social Exposure',
      days: [4, 10, 3],
      summary: 'Products encounter humans at their most vulnerable — a credit card declined in front of a friend, a public error message, a failed form submission during a job application. The specific texture of social embarrassment — how it makes you want to disappear, how it changes your willingness to return — requires a designer who has felt it.',
      why: 'You have experienced the specific weight of social exposure. You know how embarrassment activates the impulse to leave and never return. You know the difference between an error message that compounds shame and one that holds you with dignity. That knowledge does not come from research synthesis — it comes from being human.',
      whyAiCant: 'AI can model the statistical relationship between error states and abandonment rates. It cannot carry the felt understanding of what it means to fail in public — the visceral pull to close the app, the self-judgment that follows, the emotional cost of returning. Designing recovery requires understanding what you are asking someone to survive.',
      principle: 'Monzo\'s payment decline design addressed three simultaneous emotions: <em>embarrassment</em> (private notification), <em>confusion</em> (specific explanation), and <em>anxiety</em> (clear next action). Three emotions, three design responses, one interaction. Addressing only the technical failure while missing the emotional one produces correct but cold design.',
      quote: 'The best error states do not announce what went wrong. They hold the user with dignity in the moment of failure, reduce the social cost of the mistake, and create a clear recovery path that makes returning feel safe — not like admitting defeat.',
    },
    {
      id: 'ethical-gut',
      icon: '◆',
      label: 'Ethics',
      title: 'The Ethical Gut Check: Would I Want This?',
      days: [20, 39, 40],
      summary: 'The decision about whether to build a feature that makes business sense but doesn\'t genuinely serve users is not a logic problem. It is a moral one. The "Would I Want This?" test requires a human being to take personal responsibility for the experience they are creating at scale.',
      why: 'When you are designing a notification that 15% more users will open but immediately dismiss, you are designing an interruption that will repeat across millions of people\'s days. The weight of that responsibility — the understanding that behind each metric is a real person with a life — is what makes ethical design possible. It is not a framework you apply. It is a moral seriousness you carry.',
      whyAiCant: 'AI can evaluate features against ethical frameworks and flag potential concerns. It cannot feel responsible. It cannot have the experience of knowing — viscerally — that a dark pattern degrades the dignity of the person on the other end. Ethical judgment at scale requires a human being who cares about the answer.',
      principle: 'The User Value vs Business Value 2×2: the Ethical Tension quadrant is where high business value meets low user value. Features that improve a metric while degrading human experience sit here. The question to ask: would I personally want to receive this? If not, you are building something that treats your users as means rather than ends.',
      quote: 'The strongest ethical position in an interview is not moral preaching. It is demonstrating that you have genuinely worked through the tension: "Notifications that users dismiss immediately create long-term churn risk that outweighs the short-term engagement gain. Here\'s the business case for the humane version."',
    },
    {
      id: 'trust-relationships',
      icon: '◍',
      label: 'Relationships',
      title: 'Building Trust Through Human Presence',
      days: [19, 32, 17],
      summary: 'Influence without authority is not a technique. It is the accumulation of years of showing up — investing in engineer and PM relationships before you need them, demonstrating that your work honors the people it claims to serve, earning credibility by being accountable when things fail.',
      why: 'Trust is built through consistency between what you say and what you do, over time, across many situations where it would have been easier to protect yourself. You cannot process-engineer this. It requires human presence — the decision to be the person who names what is actually happening in a difficult meeting, who takes responsibility before explanation, who admits uncertainty rather than performing confidence.',
      whyAiCant: 'AI can generate relationship management frameworks. It cannot build a relationship. Trust is reciprocal — it requires two people who have chosen to be honest with each other through difficult moments. That choosing is a human act. The history of choosing it is what makes influence real rather than positional.',
      principle: '"Influence without authority playbook": document decisions visibly so good thinking spreads; connect your designs to metrics so credibility grows from results; build relationships before you need them so conflict is resolved between people who respect each other, not between strangers fighting over scope.',
      quote: 'When a designer says "I understand the goal here is X, and the challenge is that our research suggests Y — what if instead we tried Z?" — the "what if" only lands if there is a relationship underneath it. Without that, it is just a competing opinion.',
    },
    {
      id: 'contextual-inquiry',
      icon: '◐',
      label: 'Observation',
      title: 'The Human Eye in Contextual Inquiry',
      days: [9, 15, 3],
      summary: 'Contextual inquiry requires a researcher to sit with another human in their natural environment — their home, their commute, their stressed Tuesday afternoon — and notice what they do not say, what they avoid, what they work around. Only a human observer can create the safety for someone to show you their real behavior.',
      why: 'When a user is about to show you how they actually use your product, there is a moment — you can feel it — where they almost reveal something and then pull back. They sense they might be judged for their workaround. They cover the thing that would be most useful to see. Creating the safety for them to show you anyway is a skill that lives entirely in human presence, attunement, and the willingness to be non-judgmental in real time.',
      whyAiCant: 'AI can analyze recorded sessions and identify behavioral patterns. It cannot create psychological safety in a live observation. It cannot sense the moment a person hesitates and choose not to press forward. The relational intelligence of field research — knowing when to be silent, when to probe gently, when to follow an unexpected thread — is irreducibly human.',
      principle: 'The most valuable contextual inquiry insight often comes from what the user does not say. Airbnb\'s founders discovered photo quality was the constraint not from data — from physically going to New York, meeting hosts, and seeing the problem with their own eyes. That $1B insight required human presence, not analysis.',
      quote: 'The gap between what users say, what they do, and what they need is the source of most failed redesigns. Bridging that gap requires a human observer who can hold contradiction, build rapport, and trust the disconfirming signal over the confirming one.',
    },
    {
      id: 'emotional-steadiness',
      icon: '◑',
      label: 'Resilience',
      title: 'Emotional Steadiness as a Professional Capacity',
      days: [27, 32, 45, 56],
      summary: 'The ability to receive hard feedback without collapsing, stay present when challenged, and notice your own defensive impulse in real time — then interrupt it — is not a framework. It is a human capacity built through practice, failure, and genuine reflection. AI can coach you on what to say. Only you can build the stability to mean it.',
      why: 'When an interviewer challenges your design decision and you feel the pull to defend rather than listen, something human is happening: ego protection, the desire to appear competent, the fear of looking uncertain. The skill is not suppressing that pull — it is developing enough self-awareness to notice it, name it internally, and choose a different response. That development is the work of a lifetime, not a prompt.',
      whyAiCant: 'AI can help you prepare answers for difficult questions. It cannot help you build the internal stability that makes you genuinely secure enough to be wrong in public. Emotional steadiness is not information. It is character work — developed through real experiences of receiving hard feedback with integrity.',
      principle: '"When you notice yourself wanting approval from the interviewer rather than trusting your reasoning, pause and return to the principle, evidence, and tradeoff." The ability to recognize that pattern in yourself — in real time, under pressure — and redirect it is one of the most professionally rare skills a designer can build.',
      quote: 'The most useful phrase in a hard design conversation is not a clever argument. It is the willingness to say: "That\'s a fair concern. Here is what would change my mind." That sentence is only credible when you genuinely mean it — when your steadiness is real, not performed.',
    },
    {
      id: 'behavioral-maturity',
      icon: '◒',
      label: 'Accountability',
      title: 'Behavioral Maturity: Accountability Before Explanation',
      days: [32, 29, 30],
      summary: 'When something fails, the first human instinct is self-protection — to explain, to distribute blame, to position yourself as the reasonable party in an unreasonable situation. Behavioral maturity is the choice to take accountability before you explain — and to mean it.',
      why: 'This choice is available only to humans because it requires moral agency. The decision to say "I should have tested this assumption earlier" before saying "we were under a tight deadline" is not strategically calculated — it is a genuine prioritization of honesty over self-image. AI can suggest the words. Only you can decide to be the kind of professional who says them because they are true.',
      whyAiCant: 'AI can generate behaviorally mature-sounding responses. It cannot choose to be accountable. Accountability is not language — it is a decision made in a moment of discomfort by a person who values honesty over comfort. That decision is irreducibly human.',
      principle: 'For behavioral interview answers: resist every instinct to distribute blame. The strongest answers are those where you name your own role in a difficult situation honestly — not as self-flagellation, but as evidence that you have developed the self-awareness to learn from experience rather than just survive it.',
      quote: '"Specific situations create trust. General values do not." A designer who says "I value accountability" produces noise. A designer who describes the exact moment they named their own mistake in a cross-functional review, before anyone else did, and what happened next — that creates signal.',
    },
    {
      id: 'lived-context',
      icon: '◓',
      label: 'Context',
      title: 'Designing for Lives You Have Not Fully Lived',
      days: [3, 4, 16],
      summary: 'Users are checking their bank balance anxious about an overdraft, ordering food exhausted after a twelve-hour shift, navigating healthcare portals under a diagnosis they received yesterday. The contexts of human life that shape product behavior — fear, grief, exhaustion, joy — require a designer with imagination, empathy, and the discipline to research what they cannot directly know.',
      why: 'You cannot fully enter another person\'s experience. But you can choose to take it seriously — to do the research, sit with the discomfort of discovering how different someone\'s context is from your assumptions, and design for their reality rather than your imagined version of it. This requires moral seriousness about the people your product will serve.',
      whyAiCant: 'AI can generate user persona descriptions and context scenarios. It cannot genuinely reckon with the stakes of designing for a person under medical stress, financial precarity, or cultural displacement. That reckoning — the shift from user as abstraction to user as person — is a human ethical act.',
      principle: 'The highest-risk contexts — distracted + mobile + urgent + emotionally compromised — should be the design\'s baseline, not its edge case. A user checking a bank balance while anxious about an overdraft is not an edge case. For millions of users, it is the dominant context. Designing for the comfortable scenario first is a failure of empathy.',
      quote: 'A mobile banking app used by someone on a subway during commute — split attention, noise, possibly anxious about an upcoming stop — is a fundamentally different experience than the same app used by someone at home on a laptop. Same user, two completely different contexts. Good design accounts for where users actually are, not the ideal scenario in your head.',
    },
  ];

  const topicCards = topics.map(topic => `
    <article class="human-topic-card" id="topic-${topic.id}">
      <div class="human-topic-header">
        <div class="human-topic-icon-wrap">
          <span class="human-topic-icon">${topic.icon}</span>
          <span class="human-topic-label">${topic.label}</span>
        </div>
        <div class="human-topic-days">
          ${topic.days.map(d => `<a href="${d <= 7 ? 'week1' : d <= 14 ? 'week2' : d <= 21 ? 'week3' : d <= 28 ? 'week4' : d <= 35 ? 'week5' : d <= 42 ? 'week6' : d <= 49 ? 'week7' : 'week8'}.html#day-${d}" class="human-day-badge">Day ${d}</a>`).join('')}
        </div>
      </div>
      <h3 class="human-topic-title">${topic.title}</h3>
      <p class="human-topic-summary">${topic.summary}</p>
      <div class="human-topic-body">
        <div class="human-topic-block human-topic-block--why">
          <h4 class="human-block-label">Why This Is Yours</h4>
          <p>${topic.why}</p>
        </div>
        <div class="human-topic-block human-topic-block--ai">
          <h4 class="human-block-label">Where AI Falls Short</h4>
          <p>${topic.whyAiCant}</p>
        </div>
        <div class="human-topic-block human-topic-block--principle">
          <h4 class="human-block-label">The Working Principle</h4>
          <p>${topic.principle}</p>
        </div>
        <blockquote class="human-topic-quote">${topic.quote}</blockquote>
      </div>
    </article>
  `).join('');

  const spectrumRows = [
    ['Research synthesis from transcripts', 'high', 'Deciding which theme actually matters to the user\'s real problem', 'yours'],
    ['Generating 10 flow variations quickly', 'high', 'Choosing which one honors the user\'s emotional context', 'yours'],
    ['Flagging heuristic violations systematically', 'high', 'Naming the specific emotion behind a usability failure', 'yours'],
    ['Drafting stakeholder update templates', 'medium', 'Reading what the stakeholder didn\'t say in the meeting', 'yours'],
    ['Prototyping layout options from a prompt', 'high', 'Deciding if the direction serves the right user in the right context', 'yours'],
    ['Classifying user sentiment as positive/negative', 'high', 'Naming the precise emotion — shame, doubt, regret — and its design implication', 'yours'],
    ['A/B test result analysis', 'high', 'Understanding why a result happened given what you know about real users', 'yours'],
    ['Generating behavioral interview question answers', 'medium', 'Being the person who is genuinely accountable rather than performing accountability', 'yours'],
    ['Modeling ethical frameworks and flagging tensions', 'medium', 'Deciding to take moral responsibility for what you build at scale', 'yours'],
    ['Creating onboarding copy variations', 'high', 'Sensing the specific anxiety of the user you are welcoming — and meeting them there', 'yours'],
  ];

  const spectrumHtml = spectrumRows.map(([aiTask, aiLevel, humanTask]) => `
    <tr>
      <td class="spectrum-task spectrum-task--ai">
        <span class="spectrum-badge spectrum-badge--${aiLevel}">${aiLevel === 'high' ? 'AI Strong' : 'AI Partial'}</span>
        ${aiTask}
      </td>
      <td class="spectrum-divider" aria-hidden="true">→</td>
      <td class="spectrum-task spectrum-task--human">
        <span class="spectrum-badge spectrum-badge--human">You</span>
        ${humanTask}
      </td>
    </tr>
  `).join('');

  return `
    ${createHeader('human-specific-topics.html')}
    <main class="human-topics-main">

      <section class="page-hero human-topics-hero">
        <div class="container">
          <div class="page-hero-eyebrow">Human Edge</div>
          <h1 class="page-hero-title">What Only <span class="text-gradient">Humans</span> Can Do</h1>
          <p class="page-hero-subtitle">A curated map of the 10 domains across all 56 days where empathy, moral judgment, and lived experience are irreplaceable — extracted directly from the curriculum and expanded with the depth they deserve.</p>
          <div class="hero-stats-row">
            <div class="hero-stat"><span class="hero-stat-val">10</span><span class="hero-stat-label">irreplaceable domains</span></div>
            <div class="hero-stat"><span class="hero-stat-val">27</span><span class="hero-stat-label">days touched</span></div>
            <div class="hero-stat"><span class="hero-stat-val">∞</span><span class="hero-stat-label">practice required</span></div>
          </div>
        </div>
      </section>

      <section class="section human-topics-intro-section">
        <div class="container">
          <div class="human-intro-grid">
            <article class="human-intro-card">
              <h3>AI raises the floor</h3>
              <p>More people can generate plausible work quickly. Synthesis that took days now takes minutes. Ten layout variations appear in an hour. The floor of acceptable design output has risen dramatically.</p>
            </article>
            <article class="human-intro-card human-intro-card--accent">
              <h3>Human judgment becomes the ceiling</h3>
              <p>When anyone can generate options, the differentiator becomes knowing which option matters and why — for this specific user, in this specific context, under these specific stakes. That judgment is human.</p>
            </article>
            <article class="human-intro-card">
              <h3>The domains that matter most cannot be prompted</h3>
              <p>Empathy, accountability, trust, ethical seriousness, the ability to read a room — these are built through years of real human experience, failure, and reflection. They cannot be outsourced or accelerated.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section section--alt">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">The 10 Irreplaceable Domains</h2>
            <p class="section-subtitle">Each topic is extracted directly from the 56-day curriculum, then expanded to its full depth. Click the Day badges to go directly to the source material.</p>
          </div>
          <div class="human-topics-grid">
            ${topicCards}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">The Spectrum: AI Assists, You Lead</h2>
            <p class="section-subtitle">Every row shows a task where AI creates leverage — and the adjacent judgment call that remains entirely yours.</p>
          </div>
          <div class="table-wrap">
            <table class="markdown-table human-spectrum-table">
              <thead>
                <tr>
                  <th>AI can assist here</th>
                  <th aria-hidden="true"></th>
                  <th>Human judgment required here</th>
                </tr>
              </thead>
              <tbody>${spectrumHtml}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="section section--alt">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Where This Lives in the 56 Days</h2>
            <p class="section-subtitle">Human-specific skills are woven through every week — not as a separate track, but as the thread that gives the technical content meaning.</p>
          </div>
          <div class="human-week-map">
            <div class="human-week-row">
              <div class="human-week-label">Week 1<span>Human-First Foundation</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Emotion mapping precision (Day 4)</span>
                <span class="human-tag">Behavioral context & emotional state (Day 3)</span>
                <span class="human-tag">Decision communication empathy (Day 5)</span>
              </div>
            </div>
            <div class="human-week-row">
              <div class="human-week-label">Week 2<span>Problem Finding & Design Process</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Emotion-first ideation (Day 10)</span>
                <span class="human-tag">Root cause vs symptom — contextual inquiry (Day 9)</span>
                <span class="human-tag">Say-Do-Need triangulation (Day 9)</span>
              </div>
            </div>
            <div class="human-week-row">
              <div class="human-week-label">Week 3<span>Research, Business & Scale</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Research bias — survivorship & confirmation (Day 16)</span>
                <span class="human-tag">Interview rapport & behavioral questions (Day 15)</span>
                <span class="human-tag">Stakeholder language & conflict resolution (Day 17)</span>
              </div>
            </div>
            <div class="human-week-row">
              <div class="human-week-label">Week 4<span>Screening to Whiteboard</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Authentic motivation in HR screens (Day 23)</span>
                <span class="human-tag">Handling live pushback with composure (Day 27)</span>
                <span class="human-tag">Self-aware story coherence (Day 23)</span>
              </div>
            </div>
            <div class="human-week-row">
              <div class="human-week-label">Week 5<span>Case Study to Leadership</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Behavioral maturity: accountability before explanation (Day 32)</span>
                <span class="human-tag">Case study honesty & genuine reflection (Day 30)</span>
                <span class="human-tag">Leadership without title (Day 32)</span>
              </div>
            </div>
            <div class="human-week-row">
              <div class="human-week-label">Week 6<span>Design in the Age of AI</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Human judgment as the ceiling (Day 36)</span>
                <span class="human-tag">Ethical responsibility for AI products (Day 39)</span>
                <span class="human-tag">Knowing when NOT to use AI (Day 40)</span>
              </div>
            </div>
            <div class="human-week-row">
              <div class="human-week-label">Week 7<span>Portfolio, Communication & Defense</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Handling pushback without losing self (Day 45)</span>
                <span class="human-tag">Silence as communication (Day 46)</span>
                <span class="human-tag">Decision story narrative tension (Day 44)</span>
              </div>
            </div>
            <div class="human-week-row">
              <div class="human-week-label">Week 8<span>Practice Lab & Mock Interviews</span></div>
              <div class="human-week-tags">
                <span class="human-tag">Emotional steadiness across fatigue (Day 51)</span>
                <span class="human-tag">Growth reflection — what actually changed (Day 56)</span>
                <span class="human-tag">Confidence from repetition, not optimism (Day 55)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">The Deeper Truth</h2>
            <p class="section-subtitle">Why this page exists, and what to do with it.</p>
          </div>
          <div class="human-closing-grid">
            <div class="human-closing-text">
              <p>Every framework in this curriculum has a human underneath it. The 5 Whys is a technique — but using it well requires the curiosity to keep asking when the obvious answer is available. The emotion precision vocabulary is a list — but applying it requires the empathy to care which word is accurate. The behavioral interview structure is a template — but giving a strong answer requires the self-awareness to have genuinely reflected on what happened and what it meant.</p>
              <p>AI will get better at generating frameworks, synthesizing research, and producing plausible-looking work. What it will not develop is the felt responsibility for the person on the other end of the design — the user who is exhausted, or embarrassed, or uncertain, or in the middle of the worst week of their life and trying to accomplish something on your product.</p>
              <p>That responsibility is yours. The techniques in this curriculum are how you exercise it well. But the commitment to exercise it at all — the decision to take seriously the life of the person your design will touch — is irreducibly human. No tool can make that choice for you.</p>
              <p>This page exists to name what the curriculum teaches implicitly: the best designers are not the ones who have mastered the most frameworks. They are the ones who have built enough self-awareness, empathy, and moral seriousness to know when to apply them, when to question them, and when to simply sit with another human being and pay attention.</p>
            </div>
            <aside class="human-closing-aside">
              <div class="human-aside-card">
                <h4>A reflection prompt</h4>
                <p>Pick one domain from this page. Think of the last time it showed up in your work or life — not as a framework but as a real moment. What happened? What did you do? What would you do differently?</p>
                <p>That reflection is the practice. Not the answer — the act of taking it seriously.</p>
              </div>
              <div class="human-aside-card human-aside-card--links">
                <h4>Deep curriculum dives</h4>
                <ul>
                  <li><a href="week1.html#day-4">Day 4 — Emotion Mapping with Precision</a></li>
                  <li><a href="week2.html#day-9">Day 9 — Root Cause Before Redesign</a></li>
                  <li><a href="week3.html#day-17">Day 17 — Speaking the Language of Stakeholders</a></li>
                  <li><a href="week5.html#day-32">Day 32 — Culture &amp; Leadership Round</a></li>
                  <li><a href="week6.html#day-36">Day 36 — What AI Actually Changes</a></li>
                  <li><a href="week6.html#day-40">Day 40 — The Designer's New Role</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </main>
    ${renderCodexBotShell()}
    ${createFooter()}
    <style>
      /* ── Human Topics Page Styles ─────────────────────────────────────── */
      .human-topics-hero { background: linear-gradient(135deg, var(--color-bg) 0%, color-mix(in srgb, var(--color-accent) 6%, var(--color-bg)) 100%); }

      .human-intro-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
      .human-intro-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; }
      .human-intro-card h3 { font-size: 1rem; font-weight: 700; color: var(--color-text); margin-bottom: .5rem; }
      .human-intro-card p { font-size: .875rem; color: var(--color-muted); line-height: 1.65; margin: 0; }
      .human-intro-card--accent { border-color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 6%, var(--color-surface)); }
      .human-intro-card--accent h3 { color: var(--color-accent); }

      .human-topics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 640px), 1fr)); gap: 2rem; }

      .human-topic-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2rem; display: flex; flex-direction: column; gap: 1rem; transition: box-shadow .2s; }
      .human-topic-card:hover { box-shadow: 0 6px 32px rgba(0,0,0,.12); }

      .human-topic-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .75rem; }
      .human-topic-icon-wrap { display: flex; align-items: center; gap: .5rem; }
      .human-topic-icon { font-size: 1.25rem; color: var(--color-accent); }
      .human-topic-label { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--color-muted); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 4px; padding: 2px 8px; }
      .human-topic-days { display: flex; gap: .375rem; flex-wrap: wrap; }
      .human-day-badge { font-size: .72rem; font-weight: 600; color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent); border-radius: 4px; padding: 2px 8px; text-decoration: none; transition: background .15s; }
      .human-day-badge:hover { background: color-mix(in srgb, var(--color-accent) 20%, transparent); }

      .human-topic-title { font-size: 1.2rem; font-weight: 700; color: var(--color-text); margin: 0; line-height: 1.3; }
      .human-topic-summary { font-size: .9rem; color: var(--color-muted); line-height: 1.7; margin: 0; }
      .human-topic-body { display: flex; flex-direction: column; gap: .875rem; border-top: 1px solid var(--color-border); padding-top: 1rem; }

      .human-topic-block { padding: .875rem 1rem; border-radius: var(--radius-md); border-left: 3px solid transparent; }
      .human-topic-block p { font-size: .85rem; color: var(--color-muted); line-height: 1.7; margin: 0; }
      .human-block-label { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; margin-bottom: .4rem; display: block; }
      .human-topic-block--why { background: color-mix(in srgb, var(--color-accent) 5%, var(--color-surface)); border-left-color: var(--color-accent); }
      .human-topic-block--why .human-block-label { color: var(--color-accent); }
      .human-topic-block--ai { background: color-mix(in srgb, #ef4444 5%, var(--color-surface)); border-left-color: #ef4444; }
      .human-topic-block--ai .human-block-label { color: #ef4444; }
      .human-topic-block--principle { background: color-mix(in srgb, #10b981 5%, var(--color-surface)); border-left-color: #10b981; }
      .human-topic-block--principle .human-block-label { color: #10b981; }

      .human-topic-quote { margin: 0; padding: .875rem 1rem .875rem 1.25rem; border-left: 3px solid var(--color-border); font-size: .85rem; color: var(--color-muted); line-height: 1.7; font-style: italic; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }

      /* Spectrum table */
      .human-spectrum-table { width: 100%; }
      .human-spectrum-table th { font-size: .8rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: .06em; }
      .human-spectrum-table th:first-child { color: #6366f1; }
      .human-spectrum-table th:last-child { color: var(--color-accent); }
      .spectrum-task { font-size: .85rem; color: var(--color-text); line-height: 1.5; vertical-align: middle; padding: .75rem 1rem; }
      .spectrum-divider { text-align: center; color: var(--color-border); font-size: 1.1rem; width: 2rem; }
      .spectrum-badge { display: inline-block; font-size: .65rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; border-radius: 3px; padding: 1px 6px; margin-right: .5rem; vertical-align: middle; }
      .spectrum-badge--high { background: color-mix(in srgb, #6366f1 12%, transparent); color: #6366f1; }
      .spectrum-badge--medium { background: color-mix(in srgb, #f59e0b 12%, transparent); color: #d97706; }
      .spectrum-badge--human { background: color-mix(in srgb, var(--color-accent) 12%, transparent); color: var(--color-accent); }

      /* Week map */
      .human-week-map { display: flex; flex-direction: column; gap: .5rem; }
      .human-week-row { display: grid; grid-template-columns: 200px 1fr; gap: 1.25rem; align-items: start; padding: 1rem 1.25rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
      @media (max-width: 640px) { .human-week-row { grid-template-columns: 1fr; } }
      .human-week-label { font-size: .875rem; font-weight: 700; color: var(--color-text); line-height: 1.3; }
      .human-week-label span { display: block; font-size: .75rem; font-weight: 400; color: var(--color-muted); margin-top: .2rem; }
      .human-week-tags { display: flex; flex-wrap: wrap; gap: .4rem; }
      .human-tag { font-size: .75rem; color: var(--color-muted); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 4px; padding: 3px 10px; }

      /* Closing section */
      .human-closing-grid { display: grid; grid-template-columns: 1fr 320px; gap: 2.5rem; align-items: start; }
      @media (max-width: 900px) { .human-closing-grid { grid-template-columns: 1fr; } }
      .human-closing-text p { font-size: .9rem; color: var(--color-muted); line-height: 1.8; margin-bottom: 1.1rem; }
      .human-closing-text p:last-child { margin-bottom: 0; }
      .human-aside-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1rem; }
      .human-aside-card h4 { font-size: .875rem; font-weight: 700; color: var(--color-text); margin-bottom: .6rem; }
      .human-aside-card p { font-size: .82rem; color: var(--color-muted); line-height: 1.65; margin-bottom: .6rem; }
      .human-aside-card p:last-child { margin-bottom: 0; }
      .human-aside-card--links ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .4rem; }
      .human-aside-card--links a { font-size: .82rem; color: var(--color-accent); text-decoration: none; }
      .human-aside-card--links a:hover { text-decoration: underline; }
    </style>
  `;
}

export async function renderPage(page, root) {
  const plan = await loadPlan();
  if (page === 'index.html' || page === '') root.innerHTML = renderDashboard(plan);
  else if (page === 'assignments.html') root.innerHTML = renderAssignments(plan);
  else if (page === 'references.html') root.innerHTML = renderReferences(plan);
  else if (page === 'human-specific-topics.html') root.innerHTML = renderHumanTopics();
  else {
    const weekMatch = page.match(/^week(\d)\.html$/);
    if (weekMatch) root.innerHTML = renderWeekPage(plan, Number(weekMatch[1]));
  }
}
