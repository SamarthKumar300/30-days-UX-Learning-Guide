/**
 * main.js — Entry point. Detects page, initialises relevant modules.
 */

import Storage from './storage.js';
import Navigation from './navigation.js';
import Accordion from './accordion.js';
import Timer from './timer.js';
import Progress from './progress.js';
import Reflections from './reflections.js';
import RadarChart from './radar-chart.js';
import AssignmentsFilter from './assignments-filter.js';

const page = window.location.pathname.split('/').pop() || 'index.html';

function isWeekPage() {
  return /^week[1-4]\.html$/.test(page);
}

// ── Always ──────────────────────────────────────────────────────
Navigation.init();
Progress.init();

// ── Week pages ──────────────────────────────────────────────────
if (isWeekPage()) {
  Accordion.init();
  Timer.init();
  Reflections.init();
  initDirectionPanels();
  initPrincipleContextToggles();
}

// ── Dashboard ──────────────────────────────────────────────────
if (page === 'index.html' || page === '') {
  RadarChart.init();
  initTimelineNavigation();
  initContinueButton();

  // Redraw radar on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => RadarChart.onResize(), 150);
  });
}

// ── Assignments page ─────────────────────────────────────────────
if (page === 'assignments.html') {
  AssignmentsFilter.init();
}

// ── References page ─────────────────────────────────────────────
if (page === 'references.html') {
  initPrincipleContextToggles();
}

// ── Shared: direction panels ─────────────────────────────────────

function initDirectionPanels() {
  document.querySelectorAll('.direction-panel-header').forEach(header => {
    header.addEventListener('click', () => {
      const panel = header.closest('.direction-panel');
      panel.classList.toggle('open');
    });
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

// ── Shared: principle "more context" toggles ──────────────────────

function initPrincipleContextToggles() {
  document.querySelectorAll('.principle-context-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const context = btn.nextElementSibling;
      if (!context) return;
      const open = context.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.querySelector('.toggle-label').textContent = open ? 'Hide context' : 'Show context';
    });
  });
}

// ── Dashboard: timeline day nodes → week page navigation ─────────

function initTimelineNavigation() {
  document.querySelectorAll('[data-timeline-day]').forEach(node => {
    const dayNum = parseInt(node.dataset.timelineDay, 10);
    let weekPage;
    if (dayNum <= 7)  weekPage = 'week1.html';
    else if (dayNum <= 14) weekPage = 'week2.html';
    else if (dayNum <= 21) weekPage = 'week3.html';
    else               weekPage = 'week4.html';

    node.style.cursor = 'pointer';
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', `Go to Day ${dayNum}`);

    const navigate = () => {
      window.location.href = `${weekPage}#day-${dayNum}`;
    };

    node.addEventListener('click', navigate);
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(); }
    });
  });
}

// ── Dashboard: "Continue" CTA button ─────────────────────────────

function initContinueButton() {
  const btn = document.getElementById('continue-btn');
  if (!btn) return;

  if (!Storage.hasStarted()) {
    btn.textContent = 'Day 1 starts tomorrow →';
    btn.href = 'week1.html#day-1';
    return;
  }

  const currentDay = Storage.getCurrentDay();
  let weekPage;
  if (currentDay <= 7)  weekPage = 'week1.html';
  else if (currentDay <= 14) weekPage = 'week2.html';
  else if (currentDay <= 21) weekPage = 'week3.html';
  else               weekPage = 'week4.html';

  const allDone = Storage.getTotalDaysCompleted() === 30;
  if (allDone) {
    btn.textContent = 'All 30 days complete! Review →';
    btn.href = 'week4.html';
  } else if (Storage.getTotalDaysCompleted() === 0) {
    btn.textContent = 'Begin Day 1 →';
    btn.href = 'week1.html#day-1';
  } else {
    btn.textContent = `Continue — Day ${currentDay} →`;
    btn.href = `${weekPage}#day-${currentDay}`;
  }
}
