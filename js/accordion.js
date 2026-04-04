/**
 * accordion.js — Day accordion open/close with smooth animation
 * Supports: single-open per page, auto-open current day, deep-link via hash
 */

import Storage from './storage.js';

const Accordion = {
  _items: [],
  _isTabMode: false,
  _activeDay: null,

  init() {
    this._items = Array.from(document.querySelectorAll('.accordion-item'));
    if (this._items.length === 0) return;

    this._isTabMode = this._initTabMode();
    this._buildDesktopSidebars();

    this._items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', e => {
        // Don't toggle when clicking checkboxes inside the header
        if (e.target.closest('.day-complete-checkbox')) return;
        this._toggle(item);
      });

      // Keyboard support
      header.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!e.target.closest('.day-complete-checkbox')) {
            this._toggle(item);
          }
        }
      });
    });

    this._openFromHash();
    this._openCurrentDay();
    this._bindWeekProgressButtons();

    // Listen for hash changes (e.g. timeline node clicked)
    window.addEventListener('hashchange', () => this._openFromHash());
  },

  _buildDesktopSidebars() {
    this._items.forEach(item => {
      const body = item.querySelector('.accordion-body');
      if (!body || body.querySelector('.accordion-sidebar')) return;

      const sidebar = document.createElement('div');
      sidebar.className = 'accordion-sidebar';

      const sidebarSelectors = [
        '.block-practice, .practice-block',
        '.block-assignment, .assignment-block',
        '.block-reflection, .reflection-block',
        '.direction-panels',
      ];

      sidebarSelectors.forEach(selector => {
        const node = body.querySelector(`:scope > ${selector}`);
        if (node) sidebar.appendChild(node);
      });

      if (sidebar.children.length > 0) {
        body.appendChild(sidebar);
      }
    });
  },

  _toggle(item) {
    if (this._isTabMode) {
      const dayNum = parseInt(item.dataset.day, 10);
      if (dayNum !== this._activeDay) this.openDay(dayNum);
      return;
    }

    const isOpen = item.classList.contains('open');
    if (isOpen) {
      this._close(item);
    } else {
      this._open(item);
    }
  },

  _open(item) {
    // Close any other open item (single-open behaviour)
    this._items.forEach(other => {
      if (other !== item && other.classList.contains('open')) {
        this._close(other);
      }
    });

    const body = item.querySelector('.accordion-body');
    const icon = item.querySelector('.accordion-icon');
    if (!body) return;

    item.classList.add('open');
    if (icon) icon.setAttribute('aria-expanded', 'true');

    // Animate max-height from 0 to scrollHeight
    body.style.maxHeight = body.scrollHeight + 'px';

    // After transition, remove fixed max-height so content can grow dynamically
    body.addEventListener('transitionend', function onEnd() {
      if (item.classList.contains('open')) {
        body.style.maxHeight = 'none';
      }
      body.removeEventListener('transitionend', onEnd);
    });
  },

  _close(item) {
    const body = item.querySelector('.accordion-body');
    const icon = item.querySelector('.accordion-icon');
    if (!body) return;

    // Lock height first (needed to animate from 'none')
    body.style.maxHeight = body.scrollHeight + 'px';
    // Force reflow
    body.offsetHeight; // eslint-disable-line no-unused-expressions
    body.style.maxHeight = '0';

    item.classList.remove('open');
    if (icon) icon.setAttribute('aria-expanded', 'false');
  },

  /** Open accordion by day number */
  openDay(dayNum) {
    const target = document.querySelector(`[data-day="${dayNum}"]`);
    if (target) {
      if (this._isTabMode) {
        this._activateTab(dayNum);
      }
      this._open(target);
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  },

  /** Open item matching URL hash (#day-3) */
  _openFromHash() {
    const hash = window.location.hash; // e.g. "#day-3"
    if (!hash) return;

    const dayNum = hash.replace('#day-', '');
    if (!dayNum || isNaN(dayNum)) return;

    const target = document.querySelector(`[data-day="${dayNum}"]`);
    if (target) {
      if (this._isTabMode) {
        this._activateTab(parseInt(dayNum, 10));
      }
      this._open(target);
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  },

  /** Auto-open the first incomplete day on the current week page */
  _openCurrentDay() {
    // Only auto-open if no hash is present
    if (window.location.hash) return;

    const currentDay = Storage.getCurrentDay();

    // Find the accordion item for currentDay
    const target = document.querySelector(`[data-day="${currentDay}"]`);
    if (target && this._items.includes(target)) {
      if (this._isTabMode) {
        this._activateTab(currentDay);
      }
      this._open(target);
    } else if (this._items.length > 0) {
      // Fallback: open first item
      const firstIncomplete = this._items.find(item => {
        const dayNum = parseInt(item.dataset.day, 10);
        const state = Storage.getDayState(dayNum);
        return !state.completed;
      });
      const fallback = firstIncomplete || this._items[0];
      if (fallback) {
        const fallbackDay = parseInt(fallback.dataset.day, 10);
        if (this._isTabMode) {
          this._activateTab(fallbackDay);
        }
        this._open(fallback);
      }
    }
  },

  /** Wire week progress bar day buttons → open that accordion */
  _bindWeekProgressButtons() {
    document.querySelectorAll('.wpb-day[data-day]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dayNum = parseInt(btn.dataset.day, 10);
        this.openDay(dayNum);
      });
    });

    document.querySelectorAll('.week-dot-item[data-week-dot]').forEach(dot => {
      const dayNum = parseInt(dot.dataset.weekDot, 10);
      dot.addEventListener('click', () => this.openDay(dayNum));
      dot.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openDay(dayNum);
        }
      });
    });
  },

  _initTabMode() {
    const dotTabs = document.querySelectorAll('.week-dot-item[data-week-dot]');
    const buttonTabs = document.querySelectorAll('.wpb-day[data-day]');
    const hasTabs = dotTabs.length > 0 || buttonTabs.length > 0;
    if (!hasTabs) return false;

    dotTabs.forEach(dot => {
      const dayNum = parseInt(dot.dataset.weekDot, 10);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-selected', 'false');
      dot.setAttribute('aria-controls', `day-${dayNum}`);
    });

    buttonTabs.forEach(btn => {
      const dayNum = parseInt(btn.dataset.day, 10);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('aria-controls', `day-${dayNum}`);
    });

    this._items.forEach(item => {
      item.setAttribute('role', 'tabpanel');
      item.classList.add('tab-panel');
    });

    return true;
  },

  _activateTab(dayNum) {
    this._activeDay = dayNum;

    this._items.forEach(item => {
      const itemDay = parseInt(item.dataset.day, 10);
      const isActive = itemDay === dayNum;
      item.classList.toggle('tab-hidden', !isActive);
      item.classList.toggle('tab-active', isActive);
      if (!isActive) {
        this._close(item);
      }
    });

    document.querySelectorAll('.week-dot-item[data-week-dot]').forEach(dot => {
      const dotDay = parseInt(dot.dataset.weekDot, 10);
      const isActive = dotDay === dayNum;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
      dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    document.querySelectorAll('.wpb-day[data-day]').forEach(btn => {
      const btnDay = parseInt(btn.dataset.day, 10);
      const isActive = btnDay === dayNum;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  },
};

export default Accordion;
