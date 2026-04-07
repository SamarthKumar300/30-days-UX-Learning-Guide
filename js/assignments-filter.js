/**
 * assignments-filter.js — Filter pill interactions for assignments.html
 */

import Storage from './storage.js';

const AssignmentsFilter = {
  _filters: { difficulty: 'all', week: 'all', status: 'all' },

  init() {
    this._loadCheckboxStates();
    this._bindFilterPills();
    this._bindResetButton();
    this._applyFilters();
    this._updateSummary();
  },

  /** Restore saved checkbox state for every assignment card */
  _loadCheckboxStates() {
    document.querySelectorAll('[data-assignment-id]').forEach(checkbox => {
      const id = checkbox.dataset.assignmentId;
      checkbox.checked = Storage.getAssignment(id);

      const card = checkbox.closest('.assignment-card');
      if (card && checkbox.checked) card.classList.add('completed');

      checkbox.addEventListener('change', () => {
        Storage.setAssignment(id, checkbox.checked);
        const c = checkbox.closest('.assignment-card');
        if (c) c.classList.toggle('completed', checkbox.checked);
        this._applyFilters();
        this._updateSummary();
      });
    });
  },

  /** Wire up all filter pill buttons */
  _bindFilterPills() {
    document.querySelectorAll('[data-filter-group]').forEach(pill => {
      pill.addEventListener('click', () => {
        const group = pill.dataset.filterGroup;
        const value = pill.dataset.filterValue;

        // Deactivate sibling pills in same group
        document.querySelectorAll(`[data-filter-group="${group}"]`).forEach(p => {
          p.classList.remove('active');
        });
        pill.classList.add('active');

        this._filters[group] = value;
        this._applyFilters();
      });
    });
  },

  _applyFilters() {
    const { difficulty, week, status } = this._filters;
    let visible = 0;

    document.querySelectorAll('.assignment-card').forEach(card => {
      const cardDiff   = card.dataset.difficulty || 'all';
      const cardWeek   = card.dataset.week || 'all';
      const isComplete = card.classList.contains('completed');

      const matchDiff   = difficulty === 'all' || difficulty === cardDiff;
      const matchWeek   = week === 'all' || week === cardWeek;
      const matchStatus = status === 'all'
        || (status === 'completed' && isComplete)
        || (status === 'pending' && !isComplete);

      const show = matchDiff && matchWeek && matchStatus;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    // Show/hide empty state (uses hidden attribute)
    const emptyEl = document.getElementById('assignments-empty');
    if (emptyEl) {
      if (visible === 0) emptyEl.removeAttribute('hidden');
      else emptyEl.setAttribute('hidden', '');
    }

    // Show/hide section headings when all cards in that section are hidden
    document.querySelectorAll('.assignment-section').forEach(section => {
      const anyVisible = Array.from(section.querySelectorAll('.assignment-card'))
        .some(c => !c.classList.contains('hidden'));
      section.classList.toggle('hidden', !anyVisible);
    });
  },

  _updateSummary() {
    const all   = document.querySelectorAll('.assignment-card');
    let completed = 0;
    const completedByWeek = {};

    all.forEach(card => {
      const checkbox = card.querySelector('[data-assignment-id]');
      if (!checkbox) return;
      const done = Storage.getAssignment(checkbox.dataset.assignmentId);
      if (done) {
        completed++;
        const week = card.dataset.week || '0';
        completedByWeek[week] = (completedByWeek[week] || 0) + 1;
      }
    });

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('stat-assign-completed', completed);
    setEl('stat-short-completed', Object.keys(completedByWeek).length);
    setEl('stat-medium-completed', document.querySelectorAll('.assignment-card').length);
    setEl('stat-high-completed', Object.values(completedByWeek).reduce((max, value) => Math.max(max, value), 0));
  },

  _bindResetButton() {
    const btn = document.getElementById('reset-filters-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      this._filters = { difficulty: 'all', week: 'all', status: 'all' };
      document.querySelectorAll('[data-filter-group]').forEach(b => {
        b.classList.toggle('active', b.dataset.filterValue === 'all');
      });
      this._applyFilters();
    });
  },
};

export default AssignmentsFilter;
