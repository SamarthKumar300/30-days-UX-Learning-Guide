const STORAGE_KEY = 'ux-mastery-audio-reader-v1';

const RATE_OPTIONS = [0.85, 1, 1.15, 1.3];
const CHUNK_TARGET = 220;
const CHUNK_MIN = 140;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function collapseWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function toNormalizedOffset(text, offset) {
  const safeOffset = clamp(offset, 0, text.length);
  return collapseWhitespace(text.slice(0, safeOffset)).length;
}

function findNearestTextNode(node, fallbackToEnd = false) {
  if (!node) return null;
  if (node.nodeType === Node.TEXT_NODE) return node;

  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode(candidate) {
      return collapseWhitespace(candidate.nodeValue || '').length > 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  if (!fallbackToEnd) return walker.nextNode();

  let current = null;
  while (walker.nextNode()) current = walker.currentNode;
  return current;
}

function pickBoundary(text, from, preferred) {
  const slice = text.slice(from, preferred);
  const punctuation = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('! '),
    slice.lastIndexOf('? '),
    slice.lastIndexOf('; '),
    slice.lastIndexOf(': ')
  );

  if (punctuation >= CHUNK_MIN) {
    return from + punctuation + 1;
  }

  const comma = slice.lastIndexOf(', ');
  if (comma >= CHUNK_MIN) {
    return from + comma + 1;
  }

  const space = slice.lastIndexOf(' ');
  if (space >= CHUNK_MIN) {
    return from + space;
  }

  return preferred;
}

const AudioReader = {
  supported: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
  synth: window.speechSynthesis || null,
  state: null,
  ui: {},
  contentMap: [],
  contentText: '',
  pendingSelectionOffset: null,
  selectionRange: null,
  selectionCleanupTimer: null,
  voiceLoadPromise: null,

  init() {
    if (!this.supported) return;

    const settings = this._loadSettings();
    this.state = {
      rate: settings.rate,
      voiceURI: settings.voiceURI,
      status: 'idle',
      queueIndex: 0,
      currentOffset: 0,
      requestedOffset: 0,
      chunkStart: 0,
      activeUtterance: null,
    };

    this._injectUI();
    this._bindUI();
    this._bindSelectionTracking();
    this._render();
    this._ensureVoices().then(() => this._renderVoiceOptions());
    window.addEventListener('beforeunload', () => this.stop());
  },

  _loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const rate = RATE_OPTIONS.includes(parsed.rate) ? parsed.rate : 1;
      const voiceURI = typeof parsed.voiceURI === 'string' ? parsed.voiceURI : '';
      return { rate, voiceURI };
    } catch {
      return { rate: 1, voiceURI: '' };
    }
  },

  _saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      rate: this.state.rate,
      voiceURI: this.state.voiceURI,
    }));
  },

  _injectUI() {
    document.body.classList.add('has-audio-reader');

    const headerRight = document.querySelector('.header-right');
    if (headerRight) {
      const headerButton = document.createElement('button');
      headerButton.type = 'button';
      headerButton.className = 'audio-reader-launch';
      headerButton.setAttribute('aria-haspopup', 'dialog');
      headerButton.setAttribute('aria-controls', 'audio-reader-panel');
      headerButton.innerHTML = `
        <span class="audio-reader-launch-icon" aria-hidden="true">♪</span>
        <span class="audio-reader-launch-label">Listen</span>
      `;
      const hamburger = document.getElementById('hamburger');
      headerRight.insertBefore(headerButton, hamburger || headerRight.firstChild);
      this.ui.launchButton = headerButton;
    }

    const panel = document.createElement('section');
    panel.className = 'audio-reader';
    panel.id = 'audio-reader-panel';
    panel.setAttribute('aria-label', 'Audio reader');
    panel.innerHTML = `
      <div class="audio-reader-top">
        <div>
          <p class="audio-reader-kicker">Page audio</p>
          <h2 class="audio-reader-title">Read aloud</h2>
        </div>
        <button type="button" class="audio-reader-close" aria-label="Close audio reader">×</button>
      </div>
      <p class="audio-reader-status" aria-live="polite">Ready to read this page.</p>
      <div class="audio-reader-actions">
        <button type="button" class="audio-reader-play btn btn-primary">Play</button>
        <button type="button" class="audio-reader-stop btn btn-secondary">Stop</button>
      </div>
      <div class="audio-reader-secondary">
        <button type="button" class="audio-reader-from-top btn btn-ghost">From top</button>
        <button type="button" class="audio-reader-from-selection btn btn-ghost" disabled>From selection</button>
      </div>
      <div class="audio-reader-controls">
        <label class="audio-reader-field">
          <span>Speed</span>
          <select class="audio-reader-rate"></select>
        </label>
        <label class="audio-reader-field">
          <span>Voice</span>
          <select class="audio-reader-voice">
            <option value="">Loading voices…</option>
          </select>
        </label>
      </div>
    `;
    document.body.appendChild(panel);

    const selectionAction = document.createElement('button');
    selectionAction.type = 'button';
    selectionAction.className = 'audio-selection-action';
    selectionAction.textContent = 'Listen from here';
    selectionAction.hidden = true;
    document.body.appendChild(selectionAction);

    Object.assign(this.ui, {
      panel,
      closeButton: panel.querySelector('.audio-reader-close'),
      status: panel.querySelector('.audio-reader-status'),
      playButton: panel.querySelector('.audio-reader-play'),
      stopButton: panel.querySelector('.audio-reader-stop'),
      fromTopButton: panel.querySelector('.audio-reader-from-top'),
      fromSelectionButton: panel.querySelector('.audio-reader-from-selection'),
      rateSelect: panel.querySelector('.audio-reader-rate'),
      voiceSelect: panel.querySelector('.audio-reader-voice'),
      selectionAction,
    });

    RATE_OPTIONS.forEach(rate => {
      const option = document.createElement('option');
      option.value = String(rate);
      option.textContent = `${rate}×`;
      if (rate === this.state.rate) option.selected = true;
      this.ui.rateSelect.appendChild(option);
    });

    if (document.getElementById('timer-widget')) {
      document.body.classList.add('has-audio-reader-timer');
    }
  },

  _bindUI() {
    this.ui.launchButton?.addEventListener('click', () => {
      this.ui.panel.classList.toggle('open');
      this._render();
    });

    this.ui.closeButton.addEventListener('click', () => {
      this.ui.panel.classList.remove('open');
      this._render();
    });

    this.ui.playButton.addEventListener('click', () => {
      if (this.state.status === 'playing') {
        this.pause();
        return;
      }
      if (this.state.status === 'paused') {
        this.resume();
        return;
      }

      if (Number.isInteger(this.pendingSelectionOffset)) {
        this.startFrom(this.pendingSelectionOffset);
        return;
      }

      this.startFrom(this.state.currentOffset || 0);
    });

    this.ui.stopButton.addEventListener('click', () => this.stop(true));
    this.ui.fromTopButton.addEventListener('click', () => this.startFrom(0));
    this.ui.fromSelectionButton.addEventListener('click', () => {
      if (!Number.isInteger(this.pendingSelectionOffset)) return;
      this.startFrom(this.pendingSelectionOffset);
    });

    this.ui.rateSelect.addEventListener('change', () => {
      this.state.rate = Number(this.ui.rateSelect.value) || 1;
      this._saveSettings();
      if (this.state.status === 'playing' || this.state.status === 'paused') {
        const restartOffset = this.state.currentOffset;
        this.stop(false);
        this.startFrom(restartOffset);
      } else {
        this._render();
      }
    });

    this.ui.voiceSelect.addEventListener('change', () => {
      this.state.voiceURI = this.ui.voiceSelect.value;
      this._saveSettings();
      if (this.state.status === 'playing' || this.state.status === 'paused') {
        const restartOffset = this.state.currentOffset;
        this.stop(false);
        this.startFrom(restartOffset);
      } else {
        this._render();
      }
    });

    this.ui.selectionAction.addEventListener('mousedown', event => event.preventDefault());
    this.ui.selectionAction.addEventListener('click', () => {
      if (!Number.isInteger(this.pendingSelectionOffset)) return;
      this.ui.panel.classList.add('open');
      this.startFrom(this.pendingSelectionOffset);
    });

    window.addEventListener('scroll', () => this._hideSelectionAction(), { passive: true });
    window.addEventListener('resize', () => this._hideSelectionAction());
  },

  _bindSelectionTracking() {
    const refreshSelection = () => {
      window.clearTimeout(this.selectionCleanupTimer);
      this.selectionCleanupTimer = window.setTimeout(() => this._updateSelectionState(), 0);
    };

    document.addEventListener('mouseup', refreshSelection);
    document.addEventListener('keyup', refreshSelection);
    document.addEventListener('selectionchange', () => {
      if (this.state.status === 'playing') return;
      refreshSelection();
    });
  },

  async _ensureVoices() {
    if (!this.supported) return [];
    const existing = this.synth.getVoices();
    if (existing.length) return existing;
    if (this.voiceLoadPromise) return this.voiceLoadPromise;

    this.voiceLoadPromise = new Promise(resolve => {
      const onChange = () => {
        const voices = this.synth.getVoices();
        if (!voices.length) return;
        window.speechSynthesis.removeEventListener('voiceschanged', onChange);
        resolve(voices);
      };
      window.speechSynthesis.addEventListener('voiceschanged', onChange);
      window.setTimeout(() => resolve(this.synth.getVoices()), 1200);
    });

    return this.voiceLoadPromise;
  },

  async _renderVoiceOptions() {
    const voices = await this._ensureVoices();
    const preferredVoice = this._getVoice(voices);
    this.ui.voiceSelect.innerHTML = '';

    voices
      .filter(voice => /^en(-|$)/i.test(voice.lang))
      .sort((a, b) => {
        if (a.default) return -1;
        if (b.default) return 1;
        return a.name.localeCompare(b.name);
      })
      .forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.voiceURI;
        option.textContent = `${voice.name} (${voice.lang})`;
        if (voice.voiceURI === preferredVoice?.voiceURI) option.selected = true;
        this.ui.voiceSelect.appendChild(option);
      });

    if (!this.ui.voiceSelect.options.length) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'Default browser voice';
      option.selected = true;
      this.ui.voiceSelect.appendChild(option);
    }
  },

  _getVoice(voices = this.synth.getVoices()) {
    if (!voices.length) return null;
    if (this.state.voiceURI) {
      const storedVoice = voices.find(voice => voice.voiceURI === this.state.voiceURI);
      if (storedVoice) return storedVoice;
    }

    return voices.find(voice => voice.default && /^en(-|$)/i.test(voice.lang))
      || voices.find(voice => voice.localService && /^en(-|$)/i.test(voice.lang))
      || voices.find(voice => /^en(-|$)/i.test(voice.lang))
      || voices[0];
  },

  _collectReadableText() {
    const roots = Array.from(document.querySelectorAll('main, footer'));
    const map = [];
    let cursor = 0;

    roots.forEach(root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: node => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (!this._isReadableNode(parent, node)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      while (walker.nextNode()) {
        const raw = walker.currentNode.nodeValue || '';
        const text = collapseWhitespace(raw);
        if (!text) continue;
        map.push({
          node: walker.currentNode,
          raw,
          text,
          start: cursor,
          end: cursor + text.length,
        });
        cursor += text.length + 1;
      }
    });

    this.contentMap = map;
    this.contentText = map.map(entry => entry.text).join(' ');
    return this.contentText;
  },

  _isReadableNode(element, textNode) {
    const ignoredTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'BUTTON'];
    if (ignoredTags.includes(element.tagName)) return false;
    if (element.closest('.audio-reader, .audio-selection-action, .mobile-drawer, .timer-widget')) return false;
    if (element.closest('[aria-hidden="true"], [hidden], .visually-hidden')) return false;
    if (element.closest('.accordion-body') && !element.closest('.accordion-item.open')) return false;

    let current = element;
    while (current && current !== document.body) {
      const styles = window.getComputedStyle(current);
      if (styles.display === 'none' || styles.visibility === 'hidden') return false;
      current = current.parentElement;
    }

    if (!textNode.parentElement?.getClientRects().length) return false;
    return true;
  },

  _getSelectionOffset() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;

    const range = selection.getRangeAt(0);
    const startContainer = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer
      : findNearestTextNode(range.startContainer);

    if (!startContainer) return null;

    this._collectReadableText();
    const entry = this.contentMap.find(item => item.node === startContainer);
    if (!entry) return null;

    const localOffset = toNormalizedOffset(entry.raw, range.startOffset);
    return clamp(entry.start + localOffset, 0, this.contentText.length);
  },

  _updateSelectionState() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      this.pendingSelectionOffset = null;
      this.selectionRange = null;
      this._hideSelectionAction();
      this._render();
      return;
    }

    const text = collapseWhitespace(selection.toString());
    if (!text) {
      this.pendingSelectionOffset = null;
      this.selectionRange = null;
      this._hideSelectionAction();
      this._render();
      return;
    }

    const offset = this._getSelectionOffset();
    if (!Number.isInteger(offset)) {
      this.pendingSelectionOffset = null;
      this.selectionRange = null;
      this._hideSelectionAction();
      this._render();
      return;
    }

    this.pendingSelectionOffset = offset;
    this.selectionRange = selection.getRangeAt(0).cloneRange();
    this._showSelectionAction();
    this._render();
  },

  _showSelectionAction() {
    if (!this.selectionRange) return;
    const rect = this.selectionRange.getBoundingClientRect();
    if (!rect.width && !rect.height) return;

    this.ui.selectionAction.hidden = false;
    const actionRect = this.ui.selectionAction.getBoundingClientRect();
    const left = clamp(
      rect.left + (rect.width / 2) - (actionRect.width / 2),
      12,
      window.innerWidth - actionRect.width - 12
    );
    const top = clamp(rect.top + window.scrollY - actionRect.height - 12, window.scrollY + 8, window.scrollY + window.innerHeight - actionRect.height - 8);
    this.ui.selectionAction.style.left = `${left}px`;
    this.ui.selectionAction.style.top = `${top}px`;
  },

  _hideSelectionAction() {
    this.ui.selectionAction.hidden = true;
  },

  startFrom(offset = 0) {
    const text = this._collectReadableText();
    if (!text) {
      this.state.status = 'idle';
      this.state.currentOffset = 0;
      this._render('No readable content found on this page.');
      return;
    }

    const boundedOffset = clamp(offset, 0, Math.max(text.length - 1, 0));
    this.stop(false);
    this.state.requestedOffset = boundedOffset;
    this.state.currentOffset = boundedOffset;
    this.state.queueIndex = boundedOffset;
    this.state.status = 'playing';
    this.ui.panel.classList.add('open');
    this._speakNextChunk();
    this._render();
  },

  pause() {
    if (this.state.status !== 'playing') return;
    this.synth.pause();
    this.state.status = 'paused';
    this._render();
  },

  resume() {
    if (this.state.status !== 'paused') return;
    this.synth.resume();
    this.state.status = 'playing';
    this._render();
  },

  stop(resetOffset = false) {
    if (this.synth.speaking || this.synth.pending || this.synth.paused) {
      this.synth.cancel();
    }

    this.state.activeUtterance = null;
    this.state.queueIndex = 0;
    this.state.status = 'idle';
    if (resetOffset) {
      this.state.currentOffset = 0;
      this.state.requestedOffset = 0;
    }
    this._render();
  },

  _speakNextChunk() {
    if (this.state.status !== 'playing') return;
    if (this.state.queueIndex >= this.contentText.length) {
      this.state.status = 'idle';
      this.state.currentOffset = 0;
      this.state.requestedOffset = 0;
      this.state.activeUtterance = null;
      this._render('Finished reading this page.');
      return;
    }

    let start = this.state.queueIndex;
    while (start < this.contentText.length && /\s/.test(this.contentText[start])) {
      start += 1;
    }
    this.state.queueIndex = start;

    const preferredEnd = Math.min(start + CHUNK_TARGET, this.contentText.length);
    const end = preferredEnd === this.contentText.length
      ? preferredEnd
      : pickBoundary(this.contentText, start, preferredEnd);
    const chunk = this.contentText.slice(start, end).trim();

    if (!chunk) {
      this.state.queueIndex = end;
      this._speakNextChunk();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = this.state.rate;
    const voice = this._getVoice();
    if (voice) utterance.voice = voice;

    this.state.chunkStart = start;
    this.state.activeUtterance = utterance;

    utterance.onboundary = event => {
      if (typeof event.charIndex !== 'number') return;
      this.state.currentOffset = this.state.chunkStart + event.charIndex;
      this._render();
    };

    utterance.onend = () => {
      if (this.state.status !== 'playing') return;
      this.state.currentOffset = end;
      this.state.queueIndex = end;
      this._speakNextChunk();
    };

    utterance.onerror = () => {
      this.state.status = 'idle';
      this.state.activeUtterance = null;
      this._render('Audio playback was interrupted.');
    };

    this.synth.speak(utterance);
  },

  _render(message) {
    const selectionReady = Number.isInteger(this.pendingSelectionOffset);
    this.ui.fromSelectionButton.disabled = !selectionReady;

    let statusText = message;
    if (!statusText) {
      if (this.state.status === 'playing') {
        statusText = selectionReady && this.state.requestedOffset === this.pendingSelectionOffset
          ? 'Reading from your selected text.'
          : 'Reading the page aloud.';
      } else if (this.state.status === 'paused') {
        statusText = 'Playback paused.';
      } else if (selectionReady) {
        statusText = 'Selection ready. Start from the chosen word.';
      } else {
        statusText = 'Ready to read this page.';
      }
    }

    this.ui.status.textContent = statusText;
    this.ui.playButton.textContent = this.state.status === 'playing'
      ? 'Pause'
      : this.state.status === 'paused'
        ? 'Resume'
        : 'Play';
    this.ui.stopButton.disabled = this.state.status === 'idle' && this.state.currentOffset === 0;
    this.ui.launchButton?.setAttribute('aria-expanded', String(this.ui.panel.classList.contains('open')));
  },
};

export default AudioReader;
