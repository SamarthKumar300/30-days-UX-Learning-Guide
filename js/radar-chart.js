/**
 * radar-chart.js — Canvas spider/radar chart for 6 skill axes
 * Axes: emotionReading, rootCauseThinking, businessMetrics,
 *       stakeholderComm, uxAudit, caseStudy
 */

import Storage from './storage.js';

const AXES = [
  { key: 'emotionReading',    label: 'Emotion Reading' },
  { key: 'rootCauseThinking', label: 'Root Cause Thinking' },
  { key: 'businessMetrics',   label: 'Business Metrics' },
  { key: 'stakeholderComm',   label: 'Stakeholder Comm' },
  { key: 'uxAudit',           label: 'UX Audit' },
  { key: 'caseStudy',         label: 'Case Study' },
];

const MAX_VALUE = 5;

const RadarChart = {
  _canvas: null,
  _ctx: null,

  init() {
    this._canvas = document.getElementById('radar-canvas');
    if (!this._canvas) return;

    this._ctx = this._canvas.getContext('2d');
    this._initSliders();
    this._draw();
  },

  _initSliders() {
    const skills = Storage.getSkills();

    AXES.forEach(axis => {
      const slider = document.getElementById(`skill-${axis.key}`);
      const valueDisplay = document.getElementById(`skill-val-${axis.key}`);

      if (!slider) return;

      slider.value = skills[axis.key] ?? 1;
      if (valueDisplay) valueDisplay.textContent = slider.value;

      slider.addEventListener('input', () => {
        const val = parseInt(slider.value, 10);
        Storage.setSkill(axis.key, val);
        if (valueDisplay) valueDisplay.textContent = val;
        this._draw();
      });
    });
  },

  _draw() {
    const canvas = this._canvas;
    const ctx = this._ctx;
    const skills = Storage.getSkills();

    // HiDPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const cx = W / 2;
    const cy = H / 2;
    const R  = Math.min(W, H) / 2 - 36; // radius minus label margin
    const n  = AXES.length;

    ctx.clearRect(0, 0, W, H);

    const angle = (i) => (Math.PI * 2 * i / n) - Math.PI / 2;

    // ── Grid rings ──
    for (let level = 1; level <= MAX_VALUE; level++) {
      const r = (level / MAX_VALUE) * R;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const a = angle(i);
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // ── Axis lines ──
    AXES.forEach((_, i) => {
      const a = angle(i);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // ── Target polygon (5/5 — faint outline) ──
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = angle(i);
      const x = cx + R * Math.cos(a);
      const y = cy + R * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,107,53,0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // ── User skill polygon ──
    const values = AXES.map(axis => (skills[axis.key] ?? 1) / MAX_VALUE);

    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = angle(i);
      const r = values[i] * R;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    gradient.addColorStop(0, 'rgba(255,107,53,0.45)');
    gradient.addColorStop(1, 'rgba(255,20,147,0.20)');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#FF6B35';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ── Axis dots ──
    for (let i = 0; i < n; i++) {
      const a = angle(i);
      const r = values[i] * R;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FF6B35';
      ctx.fill();
    }

    // ── Labels ──
    ctx.font = `600 12px Inter, system-ui, sans-serif`;
    ctx.fillStyle = '#B8B8CC';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    AXES.forEach((axis, i) => {
      const a = angle(i);
      const labelR = R + 24;
      const x = cx + labelR * Math.cos(a);
      const y = cy + labelR * Math.sin(a);

      // Multi-line for long labels
      const words = axis.label.split(' ');
      if (words.length === 1) {
        ctx.fillText(axis.label, x, y);
      } else {
        ctx.fillText(words[0], x, y - 7);
        ctx.fillText(words.slice(1).join(' '), x, y + 7);
      }
    });
  },

  /** Re-draw on resize */
  onResize() {
    this._draw();
  },
};

export default RadarChart;
