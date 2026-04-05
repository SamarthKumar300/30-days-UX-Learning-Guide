/**
 * timer.js — Pomodoro-style countdown timer
 * Floating widget, minimizable, block selector, persist state across navigation
 */

import Storage from './storage.js';

const BLOCK_DURATIONS = {
  study:      2 * 3600,   // 2h
  practice:   3 * 3600,   // 3h
  assignment: 3.5 * 3600, // 3.5h
  reflection: 30 * 60,    // 30m
};

const BLOCK_LABELS = {
  study:      'Study Session',
  practice:   'Practice Session',
  assignment: 'Assignment',
  reflection: 'Reflection',
};

const Timer = {
  _raf: null,
  _lastTick: null,
  _minimized: false,

  init() {
    const widget = document.getElementById('timer-widget');
    if (!widget) return;

    this._widget = widget;
    this._display = widget.querySelector('#timer-display');
    this._header = widget.querySelector('.timer-widget-header, .timer-header');
    this._blockBtns = widget.querySelectorAll('[data-block]');
    this._playBtn = widget.querySelector('#timer-play, #timer-play-btn');
    this._resetBtn = widget.querySelector('#timer-reset, #timer-reset-btn');
    this._minimizeBtn = widget.querySelector('#timer-minimize, #timer-minimize-btn');
    this._svgCircle = widget.querySelector('#timer-ring-progress');
    this._blockLabel = widget.querySelector('#timer-block-label, #timer-block-name');
    this._titleLabel = widget.querySelector('.timer-widget-title, .timer-title');

    this._loadState();
    this._render();
    this._bindEvents();

    // If timer was running when page was left, resume
    const state = Storage.get('timer');
    if (state.isRunning) {
      this._start();
    }

    // Hook: inline "Start X Timer" buttons in content blocks
    document.querySelectorAll('[data-start-block]').forEach(btn => {
      btn.addEventListener('click', () => {
        const block = btn.dataset.startBlock;
        this._setBlock(block);
        Storage.set('timer.isRunning', false);
        this._start();
        this._expand();
        widget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  },

  _loadState() {
    const state = Storage.get('timer');
    this._block = state.activeBlock || 'study';
    this._remaining = state.remaining ?? BLOCK_DURATIONS[this._block];
    this._isRunning = false; // always start paused; resume logic is in init
  },

  _bindEvents() {
    // Block selector buttons
    this._blockBtns.forEach(btn => {
      btn.addEventListener('click', () => this._setBlock(btn.dataset.block));
    });

    if (this._playBtn) {
      this._playBtn.addEventListener('click', () => {
        this._isRunning ? this._pause() : this._start();
      });
    }

    if (this._resetBtn) {
      this._resetBtn.addEventListener('click', () => this._reset());
    }

    if (this._minimizeBtn) {
      this._minimizeBtn.addEventListener('click', () => this._toggleMinimize());
    }

    if (this._header) {
      this._header.addEventListener('click', event => {
        if (!this._minimized) return;
        if (event.target === this._minimizeBtn) return;
        this._toggleMinimize();
      });
    }
  },

  _setBlock(block) {
    if (!BLOCK_DURATIONS[block]) return;
    this._pause();
    this._block = block;
    this._remaining = BLOCK_DURATIONS[block];
    Storage.set('timer.activeBlock', block);
    Storage.set('timer.remaining', this._remaining);
    Storage.set('timer.isRunning', false);

    // Update active button
    this._blockBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.block === block);
    });

    this._render();
  },

  _start() {
    if (this._remaining <= 0) this._reset();
    this._isRunning = true;
    this._lastTick = performance.now();
    Storage.set('timer.isRunning', true);
    this._tick();
    this._updatePlayBtn();
  },

  _pause() {
    this._isRunning = false;
    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
    Storage.set('timer.isRunning', false);
    this._updatePlayBtn();
  },

  _reset() {
    this._pause();
    this._remaining = BLOCK_DURATIONS[this._block];
    Storage.set('timer.remaining', this._remaining);
    this._render();
  },

  _tick() {
    if (!this._isRunning) return;

    const now = performance.now();
    const elapsed = (now - this._lastTick) / 1000;
    this._lastTick = now;

    this._remaining = Math.max(0, this._remaining - elapsed);
    Storage.set('timer.remaining', Math.round(this._remaining));

    this._render();

    if (this._remaining <= 0) {
      this._onComplete();
      return;
    }

    this._raf = requestAnimationFrame(() => this._tick());
  },

  _onComplete() {
    this._isRunning = false;
    Storage.set('timer.isRunning', false);
    this._playChime();
    this._updatePlayBtn();

    // Flash the display
    if (this._display) {
      this._display.classList.add('timer-complete');
      setTimeout(() => this._display.classList.remove('timer-complete'), 2000);
    }

    // Show toast
    this._showToast(`${BLOCK_LABELS[this._block]} complete!`);
  },

  _playChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const tones = [523.25, 659.25, 783.99]; // C5 E5 G5
      tones.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        const t = ctx.currentTime + i * 0.15;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        osc.start(t);
        osc.stop(t + 0.7);
      });
    } catch (_) {
      // Audio not supported — silent fail
    }
  },

  _render() {
    const total = BLOCK_DURATIONS[this._block];
    const remaining = Math.ceil(this._remaining);
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;

    const timeStr = h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    if (this._display) this._display.textContent = timeStr;
    if (this._blockLabel) {
      const labelText = this._minimized && !this._titleLabel ? 'Timer' : BLOCK_LABELS[this._block];
      this._blockLabel.textContent = labelText;
    }
    if (this._titleLabel) {
      this._titleLabel.textContent = this._minimized ? 'Timer' : `${BLOCK_LABELS[this._block]} Timer`;
    }

    // SVG ring progress
    if (this._svgCircle) {
      const progress = 1 - (remaining / total);
      const circumference = 2 * Math.PI * 45; // r=45
      const offset = circumference * (1 - progress);
      this._svgCircle.style.strokeDasharray = `${circumference}`;
      this._svgCircle.style.strokeDashoffset = `${offset}`;
    }

    // Update block buttons
    this._blockBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.block === this._block);
    });
  },

  _updatePlayBtn() {
    if (!this._playBtn) return;
    this._playBtn.setAttribute('aria-label', this._isRunning ? 'Pause timer' : 'Start timer');
    this._playBtn.querySelector('.play-icon')?.classList.toggle('hidden', this._isRunning);
    this._playBtn.querySelector('.pause-icon')?.classList.toggle('hidden', !this._isRunning);
  },

  _toggleMinimize() {
    this._minimized = !this._minimized;
    this._widget.classList.toggle('minimized', this._minimized);
    if (this._minimizeBtn) {
      this._minimizeBtn.setAttribute('aria-label', this._minimized ? 'Expand timer' : 'Minimize timer');
    }
    this._render();
  },

  _expand() {
    if (this._minimized) this._toggleMinimize();
  },

  _showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-visible';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  },

  /** External call: switch to block and start */
  startBlock(block) {
    this._setBlock(block);
    this._start();
    this._expand();
  },
};

export default Timer;
