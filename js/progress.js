/**
 * progress.js — Checkbox handling, progress bar updates, timeline nodes, day completion
 */

import Storage from './storage.js';
import Navigation from './navigation.js';
import { TOTAL_DAYS, WEEK_DEFINITIONS } from './course-config.js';

const Progress = {
  init() {
    this._initBlockCheckboxes();
    this._initDayCheckboxes();
    this._initAssignmentCheckboxes();
    this._updateAllProgressBars();
    this._updateWeekProgressDots();
    this._updateTimelineNodes();
  },

  // ── Block checkboxes (study / practice / assignment / reflection) ──

  _initBlockCheckboxes() {
    document.querySelectorAll('[data-block-check]').forEach(checkbox => {
      const dayNum = parseInt(checkbox.dataset.day, 10);
      const block  = checkbox.dataset.blockCheck;

      // Load saved state
      const state = Storage.getDayState(dayNum);
      checkbox.checked = state.blocks[block] || false;
      this._syncCheckboxWrapper(checkbox);

      checkbox.addEventListener('change', () => {
        Storage.setBlockCompleted(dayNum, block, checkbox.checked);
        this._syncCheckboxWrapper(checkbox);
        this._autoCompleteDayIfAllDone(dayNum);
        this._updateDayProgressBar(dayNum);
        this._updateWeekProgressDots();
        this._updateAllProgressBars();
        this._updateTimelineNodes();
        Navigation.refresh();
      });
    });
  },

  // ── Day-level "Mark day complete" checkbox ──

  _initDayCheckboxes() {
    document.querySelectorAll('[data-day-check]').forEach(checkbox => {
      const dayNum = parseInt(checkbox.dataset.dayCheck, 10);

      // Load saved state
      const state = Storage.getDayState(dayNum);
      checkbox.checked = state.completed || false;
      this._syncCheckboxWrapper(checkbox);
      this._applyDayCompletedStyle(dayNum, state.completed);

      checkbox.addEventListener('change', () => {
        Storage.setDayCompleted(dayNum, checkbox.checked);
        this._syncCheckboxWrapper(checkbox);
        this._applyDayCompletedStyle(dayNum, checkbox.checked);
        this._updateWeekProgressDots();
        this._updateAllProgressBars();
        this._updateTimelineNodes();
        Navigation.refresh();
      });
    });
  },

  // ── Assignment checkboxes (on week pages, inline) ──

  _initAssignmentCheckboxes() {
    document.querySelectorAll('[data-assignment-id]').forEach(checkbox => {
      const id = checkbox.dataset.assignmentId;

      checkbox.checked = Storage.getAssignment(id);
      this._syncCheckboxWrapper(checkbox);

      checkbox.addEventListener('change', () => {
        Storage.setAssignment(id, checkbox.checked);
        this._syncCheckboxWrapper(checkbox);
        // Toggle card completed style
        const card = checkbox.closest('.assignment-card, .inline-assignment');
        if (card) card.classList.toggle('completed', checkbox.checked);
        this._updateAllProgressBars();
        Navigation.refresh();
      });

      // Apply initial style
      const card = checkbox.closest('.assignment-card, .inline-assignment');
      if (card && checkbox.checked) card.classList.add('completed');
    });
  },

  _syncCheckboxWrapper(checkbox) {
    const label = checkbox.closest('.checkbox-wrapper, .assignment-check-label, .block-check-label, .day-check-label');
    if (label) label.classList.toggle('checked', checkbox.checked);
  },

  // ── Auto-complete day when all 4 blocks checked ──

  _autoCompleteDayIfAllDone(dayNum) {
    const state = Storage.getDayState(dayNum);
    const allDone = Object.values(state.blocks).every(Boolean);
    if (allDone && !state.completed) {
      Storage.setDayCompleted(dayNum, true);
      // Sync the day checkbox in the DOM
      const dayCheckbox = document.querySelector(`[data-day-check="${dayNum}"]`);
      if (dayCheckbox) {
        dayCheckbox.checked = true;
        this._syncCheckboxWrapper(dayCheckbox);
        this._applyDayCompletedStyle(dayNum, true);
      }
    }
  },

  _applyDayCompletedStyle(dayNum, completed) {
    const item = document.querySelector(`[data-day="${dayNum}"]`);
    if (item) item.classList.toggle('day-completed', completed);
  },

  // ── Per-day progress bar (4 blocks → 0-100%) ──

  _updateDayProgressBar(dayNum) {
    const bar = document.querySelector(`[data-day-progress="${dayNum}"]`);
    if (!bar) return;

    const state = Storage.getDayState(dayNum);
    const done = Object.values(state.blocks).filter(Boolean).length;
    const pct = Math.round((done / 4) * 100);

    bar.style.width = `${pct}%`;
    bar.setAttribute('aria-valuenow', pct);
  },

  // ── Week progress dots (7 dots per week page) ──

  _updateWeekProgressDots() {
    document.querySelectorAll('[data-week-dot]').forEach(dot => {
      const dayNum = parseInt(dot.dataset.weekDot, 10);
      const state  = Storage.getDayState(dayNum);
      const blocks = Object.values(state.blocks);
      const done   = blocks.filter(Boolean).length;

      dot.classList.remove('dot--complete', 'dot--partial', 'dot--current');

      if (state.completed || done === 4) {
        dot.classList.add('dot--complete');
      } else if (done > 0) {
        dot.classList.add('dot--partial');
      } else if (dayNum === Storage.getCurrentDay()) {
        dot.classList.add('dot--current');
      }
    });
  },

  // ── Global progress bars (dashboard / header stats) ──

  _updateAllProgressBars() {
    const daysCompleted = Storage.getTotalDaysCompleted();
    const assignmentsCompleted = Storage.getTotalAssignmentsCompleted();
    const reflectionsWritten = Storage.getTotalReflectionsWritten();

    this._setBar('progress-bar-days', daysCompleted, TOTAL_DAYS);
    this._setBar('progress-bar-assignments', assignmentsCompleted, TOTAL_DAYS);
    this._setBar('progress-bar-reflections', reflectionsWritten, TOTAL_DAYS);

    // Stat counters
    this._setCounter('stat-days', daysCompleted);
    this._setCounter('stat-assignments', assignmentsCompleted);
    this._setCounter('stat-reflections', reflectionsWritten);

    // Week progress bars (week cards on dashboard)
    WEEK_DEFINITIONS.forEach(week => {
      const { completed, total } = Storage.getWeekProgress(week.number);
      this._setBar(`week-progress-${week.number}`, completed, total);
      this._setCounter(`week-count-${week.number}`, completed);
    });

    // Update all day progress bars on week pages
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      this._updateDayProgressBar(d);
    }
  },

  _setBar(id, value, max) {
    const el = document.getElementById(id);
    if (!el) return;
    const pct = Math.round((value / max) * 100);
    el.style.width = `${pct}%`;
    el.setAttribute('aria-valuenow', pct);
  },

  _setCounter(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  },

  // ── Timeline nodes (dashboard global timeline) ──

  _updateTimelineNodes() {
    document.querySelectorAll('[data-timeline-day]').forEach(node => {
      const dayNum = parseInt(node.dataset.timelineDay, 10);
      const state  = Storage.getDayState(dayNum);
      const currentDay = Storage.getCurrentDay();

      node.classList.remove('tl-complete', 'tl-current', 'tl-empty');

      if (state.completed) {
        node.classList.add('tl-complete');
      } else if (dayNum === currentDay) {
        node.classList.add('tl-current');
      } else {
        node.classList.add('tl-empty');
      }
    });
  },
};

export default Progress;
