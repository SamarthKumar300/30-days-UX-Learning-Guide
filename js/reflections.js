/**
 * reflections.js — Reflection textarea auto-save (debounced)
 */

import Storage from './storage.js';

const DEBOUNCE_MS = 500;

const Reflections = {
  init() {
    document.querySelectorAll('[data-reflection-day]').forEach(textarea => {
      const dayNum = parseInt(textarea.dataset.reflectionDay, 10);

      // Load saved text
      textarea.value = Storage.getReflection(dayNum);

      let debounceTimer = null;
      const indicator = textarea
        .closest('.block-reflection, .reflection-block')
        ?.querySelector('.reflection-saved, .autosave-indicator');

      textarea.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        if (indicator) indicator.classList.remove('visible');

        debounceTimer = setTimeout(() => {
          Storage.setReflection(dayNum, textarea.value);
          if (indicator) {
            indicator.textContent = 'Auto-saved ✓';
            indicator.classList.add('visible');
          }
        }, DEBOUNCE_MS);
      });

      // Also save on blur (catch mobile users navigating away)
      textarea.addEventListener('blur', () => {
        clearTimeout(debounceTimer);
        Storage.setReflection(dayNum, textarea.value);
        if (indicator) {
          indicator.textContent = 'Auto-saved ✓';
          indicator.classList.add('visible');
        }
      });
    });
  },
};

export default Reflections;
