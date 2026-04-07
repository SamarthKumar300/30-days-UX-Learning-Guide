/**
 * storage.js — localStorage manager
 * Single source of truth for all persisted data
 */

import { TOTAL_DAYS, TOTAL_WEEKS, WEEK_DEFINITIONS } from './course-config.js';

const STORAGE_KEY = 'ux-mastery-v2';

function getLocalISODate(offsetDays = 0) {
  const now = new Date();
  const local = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offsetDays);
  const year = local.getFullYear();
  const month = String(local.getMonth() + 1).padStart(2, '0');
  const day = String(local.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const DEFAULT_STATE = {
  days: Object.fromEntries(
    Array.from({ length: TOTAL_DAYS }, (_, i) => [
      `day-${i + 1}`,
      { completed: false, blocks: { study: false, practice: false, assignment: false, reflection: false } }
    ])
  ),
  reflections: Object.fromEntries(
    Array.from({ length: TOTAL_DAYS }, (_, i) => [`day-${i + 1}`, ''])
  ),
  assignments: Object.fromEntries(
    Array.from({ length: TOTAL_DAYS }, (_, i) => [`assignment-day-${i + 1}`, false])
  ),
  skills: {
    emotionReading: 1,
    rootCauseThinking: 1,
    businessMetrics: 1,
    stakeholderComm: 1,
    uxAudit: 1,
    caseStudy: 1,
  },
  timer: {
    activeBlock: 'study',
    remaining: 7200, // seconds (2h)
    isRunning: false,
  },
  startDate: getLocalISODate(1),
  currentDay: 1,
  lastVisited: 'index.html',
};

const Storage = {
  _state: null,

  /** Load state from localStorage, merging with defaults */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Deep merge with defaults so new fields are added
        this._state = this._deepMerge(DEFAULT_STATE, parsed);
      } else {
        this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      }
    } catch (e) {
      console.warn('[Storage] Failed to load, using defaults', e);
      this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return this._state;
  },

  /** Save current state to localStorage */
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (e) {
      console.warn('[Storage] Failed to save', e);
    }
  },

  /** Get a nested value using dot-notation key */
  get(path) {
    if (!this._state) this.load();
    return path.split('.').reduce((obj, key) => obj?.[key], this._state);
  },

  /** Set a nested value using dot-notation key */
  set(path, value) {
    if (!this._state) this.load();
    const keys = path.split('.');
    let obj = this._state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.save();
  },

  /** Toggle a boolean field */
  toggle(path) {
    const current = this.get(path);
    this.set(path, !current);
    return !current;
  },

  // ── Convenience helpers ──

  getDayState(dayNum) {
    return this.get(`days.day-${dayNum}`) || { completed: false, blocks: { study: false, practice: false, assignment: false, reflection: false } };
  },

  setDayCompleted(dayNum, value) {
    this.set(`days.day-${dayNum}.completed`, value);
  },

  setBlockCompleted(dayNum, block, value) {
    this.set(`days.day-${dayNum}.blocks.${block}`, value);
  },

  getReflection(dayNum) {
    return this.get(`reflections.day-${dayNum}`) || '';
  },

  setReflection(dayNum, text) {
    this.set(`reflections.day-${dayNum}`, text);
  },

  getAssignment(id) {
    return this.get(`assignments.${id}`) || false;
  },

  setAssignment(id, value) {
    this.set(`assignments.${id}`, value);
  },

  getSkills() {
    return this.get('skills') || DEFAULT_STATE.skills;
  },

  setSkill(key, value) {
    this.set(`skills.${key}`, parseInt(value, 10));
  },

  // ── Statistics ──

  getTotalDaysCompleted() {
    if (!this._state) this.load();
    return Object.values(this._state.days).filter(d => d.completed).length;
  },

  getTotalAssignmentsCompleted() {
    if (!this._state) this.load();
    return Object.values(this._state.assignments).filter(Boolean).length;
  },

  getTotalReflectionsWritten() {
    if (!this._state) this.load();
    return Object.values(this._state.reflections).filter(r => r && r.trim().length > 0).length;
  },

  getWeekProgress(week) {
    const definition = WEEK_DEFINITIONS.find(item => item.number === week);
    if (!definition) return { completed: 0, total: 0 };
    const [start, end] = [definition.startDay, definition.endDay];
    let completed = 0;
    for (let d = start; d <= end; d++) {
      if (this.get(`days.day-${d}.completed`)) completed++;
    }
    return { completed, total: end - start + 1 };
  },

  getCurrentDay() {
    if (!this._state) this.load();
    if (!this.hasStarted()) return 0;
    // Find the first incomplete day
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      if (!this.get(`days.day-${d}.completed`)) return d;
    }
    return TOTAL_DAYS;
  },

  hasStarted() {
    if (!this._state) this.load();
    const anyCompleted = this.getTotalDaysCompleted() > 0;
    if (anyCompleted) return true;
    const startDate = this.get('startDate') || getLocalISODate(1);
    return getLocalISODate(0) >= startDate;
  },

  getStartDate() {
    if (!this._state) this.load();
    return this.get('startDate') || getLocalISODate(1);
  },

  // ── Reset ──

  reset() {
    this._state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  },

  // ── Internal ──

  _deepMerge(defaults, override) {
    const result = { ...defaults };
    for (const key in override) {
      if (override[key] !== null && typeof override[key] === 'object' && !Array.isArray(override[key])) {
        result[key] = this._deepMerge(defaults[key] || {}, override[key]);
      } else {
        result[key] = override[key];
      }
    }
    return result;
  },
};

// Initialize on load
Storage.load();

export default Storage;
