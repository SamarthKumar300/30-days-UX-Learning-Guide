import Navigation from './navigation.js';
import AudioReader from './audio-reader.js';
import Accordion from './accordion.js';
import Progress from './progress.js';
import AssignmentsFilter from './assignments-filter.js';
import CodexBot from './codex-bot.js';
import { renderPage } from './v2-renderer.js';

const page = window.location.pathname.split('/').pop() || 'index.html';

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

init();
