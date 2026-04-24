import Navigation from './navigation.js';
import AudioReader from './audio-reader.js';
import Accordion from './accordion.js';
import Progress from './progress.js';
import AssignmentsFilter from './assignments-filter.js';
import CodexBot from './codex-bot.js';
import { renderPage } from './v2-renderer.js';

const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

function isWeekPage() {
  return /^week[1-8]\.html$/.test(page);
}

async function init() {
  const root = document.getElementById('app-root');
  if (!root) return;

  await renderPage(page, root);

  Navigation.init();
  Progress.init();
  AudioReader.init();
  CodexBot.init();

  if (isWeekPage()) {
    Accordion.init();
  }

  if (page === 'assignments.html') {
    AssignmentsFilter.init();
  }

  if (page === 'index.html' || page === '') {
    initTimelineNavigation();
    initContinueButton();
  }

  if (page === 'ai-workflow.html') {
    initAiWorkflowScrollSpy();
  }
}

function initTimelineNavigation() {
  document.querySelectorAll('[data-timeline-day]').forEach(node => {
    const dayNum = Number(node.dataset.timelineDay);
    const weekPage = dayNum <= 7 ? 'week1.html'
      : dayNum <= 14 ? 'week2.html'
      : dayNum <= 21 ? 'week3.html'
      : dayNum <= 28 ? 'week4.html'
      : dayNum <= 35 ? 'week5.html'
      : dayNum <= 42 ? 'week6.html'
      : dayNum <= 49 ? 'week7.html'
      : 'week8.html';

    node.style.cursor = 'pointer';
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');

    const navigate = () => {
      window.location.href = `${weekPage}#day-${dayNum}`;
    };

    node.addEventListener('click', navigate);
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigate();
      }
    });
  });
}

function initContinueButton() {
  const btn = document.getElementById('continue-btn');
  if (!btn) return;

  const currentDay = Number(document.getElementById('progress-pill')?.textContent.match(/Day (\d+)/)?.[1] || 1);
  const weekPage = currentDay <= 7 ? 'week1.html'
    : currentDay <= 14 ? 'week2.html'
    : currentDay <= 21 ? 'week3.html'
    : currentDay <= 28 ? 'week4.html'
    : currentDay <= 35 ? 'week5.html'
    : currentDay <= 42 ? 'week6.html'
    : currentDay <= 49 ? 'week7.html'
    : 'week8.html';

  btn.textContent = currentDay <= 1 ? 'Begin Day 1 ->' : `Continue - Day ${currentDay} ->`;
  btn.href = `${weekPage}#day-${currentDay}`;
}

function initAiWorkflowScrollSpy() {
  const tocLinks = Array.from(document.querySelectorAll('.ai-workflow-toc-link'));
  if (!tocLinks.length) return;

  const sectionEntries = tocLinks
    .map(link => {
      const sectionId = link.getAttribute('href')?.slice(1);
      const section = sectionId ? document.getElementById(sectionId) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sectionEntries.length) return;

  const setActive = activeId => {
    sectionEntries.forEach(({ link, section }) => {
      const isActive = section.id === activeId;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const updateActiveSection = () => {
    const offset = 150;
    let activeSection = sectionEntries[0].section;

    sectionEntries.forEach(({ section }) => {
      if (section.getBoundingClientRect().top - offset <= 0) {
        activeSection = section;
      }
    });

    setActive(activeSection.id);
  };

  updateActiveSection();
  window.addEventListener('scroll', updateActiveSection, { passive: true });

  tocLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (targetId) setActive(targetId);
    });
  });
}

init();
