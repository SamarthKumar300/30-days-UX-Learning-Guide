/**
 * navigation.js — Header, nav active states, mobile drawer
 */

import Storage from './storage.js';
import { TOTAL_DAYS, WEEK_DEFINITIONS } from './course-config.js';

const Navigation = {
  _mobileOpen: false,

  init() {
    this._markActivePage();
    this._initMobileMenu();
    this._updateProgressPill();
    this._initScrollHeader();
  },

  /** Highlight current page link in nav */
  _markActivePage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  },

  /** Hamburger menu + mobile drawer */
  _initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const closeBtn = document.getElementById('drawer-close');

    if (!hamburger || !drawer) return;

    hamburger.addEventListener('click', () => this._toggleDrawer());
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this._closeDrawer());
    }

    if (overlay) {
      overlay.addEventListener('click', () => this._closeDrawer());
    }

    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this._mobileOpen) this._closeDrawer();
    });

    // Close drawer when a nav link inside is clicked
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => this._closeDrawer());
    });
  },

  _toggleDrawer() {
    this._mobileOpen ? this._closeDrawer() : this._openDrawer();
  },

  _openDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const hamburger = document.getElementById('hamburger');
    if (!drawer) return;

    this._mobileOpen = true;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('visible');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.classList.add('open');
    }
    document.body.classList.add('mobile-menu-open');
    document.body.style.overflow = 'hidden';
  },

  _closeDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const hamburger = document.getElementById('hamburger');
    if (!drawer) return;

    this._mobileOpen = false;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('visible');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('open');
    }
    document.body.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';
  },

  /** Update "Day X of 56" pill in header */
  _updateProgressPill() {
    const pill = document.getElementById('progress-pill');
    if (!pill) return;

    if (!Storage.hasStarted()) {
      pill.textContent = 'Day 1 starts tomorrow';
      pill.title = `Program starts on ${Storage.getStartDate()}`;
      return;
    }

    const currentDay = Storage.getCurrentDay();
    const totalCompleted = Storage.getTotalDaysCompleted();

    pill.textContent = `Day ${currentDay} of ${TOTAL_DAYS}`;
    pill.title = `${totalCompleted} days completed`;

    // Update week dots
    for (const week of WEEK_DEFINITIONS) {
      const w = week.number;
      const dot = document.getElementById(`week-dot-${w}`);
      if (!dot) continue;
      const { completed, total } = Storage.getWeekProgress(w);
      dot.classList.remove('week-dot--done', 'week-dot--partial');
      if (completed === total) dot.classList.add('week-dot--done');
      else if (completed > 0) dot.classList.add('week-dot--partial');
    }
  },

  /** Add scrolled class to header when page scrolls */
  _initScrollHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 16) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  },

  /** Call after progress changes to refresh pill */
  refresh() {
    this._updateProgressPill();
  },
};

export default Navigation;
