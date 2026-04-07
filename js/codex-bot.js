const BOT_STORAGE_KEY = 'ux-mastery-codex-bot-v1';

function getCurrentContext() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const hashMatch = window.location.hash.match(/day-(\d+)/);
  const day = hashMatch ? Number(hashMatch[1]) : null;
  const weekMatch = page.match(/^week(\d)\.html$/);

  return {
    page,
    day,
    week: weekMatch ? Number(weekMatch[1]) : null,
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BOT_STORAGE_KEY) || '{}');
    return {
      token: typeof parsed.token === 'string' ? parsed.token : '',
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return { token: '', history: [] };
  }
}

function saveState(state) {
  localStorage.setItem(BOT_STORAGE_KEY, JSON.stringify({
    token: state.token,
    history: state.history,
  }));
}

const CodexBot = {
  state: null,

  init() {
    const shell = document.getElementById('codex-bot-shell');
    if (!shell) return;

    this.state = loadState();
    this.ui = {
      shell,
      fab: document.getElementById('codex-bot-fab'),
      panel: document.getElementById('codex-bot-panel'),
      close: document.getElementById('codex-bot-close'),
      authWrap: document.getElementById('codex-bot-auth'),
      authForm: document.getElementById('codex-bot-auth-form'),
      secret: document.getElementById('codex-bot-secret'),
      authStatus: document.getElementById('codex-bot-auth-status'),
      chatWrap: document.getElementById('codex-bot-chat'),
      messages: document.getElementById('codex-bot-messages'),
      form: document.getElementById('codex-bot-form'),
      message: document.getElementById('codex-bot-message'),
      chatStatus: document.getElementById('codex-bot-chat-status'),
      clear: document.getElementById('codex-bot-clear'),
      send: document.getElementById('codex-bot-send'),
    };

    this._bind();
    this._renderAuthState();
    this._renderHistory();
  },

  _bind() {
    this.ui.fab.addEventListener('click', () => this._open());
    this.ui.close.addEventListener('click', () => this._close());

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && this.ui.panel.classList.contains('open')) {
        this._close();
      }
    });

    this.ui.authForm.addEventListener('submit', event => {
      event.preventDefault();
      this._unlock();
    });

    this.ui.form.addEventListener('submit', event => {
      event.preventDefault();
      this._send();
    });

    this.ui.clear.addEventListener('click', () => {
      this.state.history = [];
      saveState(this.state);
      this._renderHistory();
      this._setChatStatus('Chat cleared.');
    });
  },

  _open() {
    this.ui.panel.classList.add('open');
    this.ui.panel.setAttribute('aria-hidden', 'false');
    this.ui.fab.setAttribute('aria-expanded', 'true');
    if (this.state.token) this.ui.message.focus();
    else this.ui.secret.focus();
  },

  _close() {
    this.ui.panel.classList.remove('open');
    this.ui.panel.setAttribute('aria-hidden', 'true');
    this.ui.fab.setAttribute('aria-expanded', 'false');
  },

  _renderAuthState() {
    const unlocked = Boolean(this.state.token);
    this.ui.authWrap.classList.toggle('hidden', unlocked);
    this.ui.chatWrap.classList.toggle('hidden', !unlocked);
  },

  _renderHistory() {
    if (!this.ui.messages) return;
    this.ui.messages.innerHTML = this.state.history.length
      ? this.state.history.map(item => `
          <article class="codex-bot-message codex-bot-message--${item.role}">
            <div class="codex-bot-message-body">${escapeHtml(item.text)}</div>
            ${item.citations?.length ? `<div class="codex-bot-citations">${item.citations.map(citation => `<span class="codex-bot-citation">${escapeHtml(citation)}</span>`).join('')}</div>` : ''}
          </article>
        `).join('')
      : '<p class="codex-bot-empty">Ask about the current lesson, interview concept, or framework. Answers stay grounded in the website content.</p>';
    this.ui.messages.scrollTop = this.ui.messages.scrollHeight;
  },

  _setAuthStatus(message, isError = false) {
    this.ui.authStatus.textContent = message;
    this.ui.authStatus.classList.toggle('is-error', isError);
  },

  _setChatStatus(message, isError = false) {
    this.ui.chatStatus.textContent = message;
    this.ui.chatStatus.classList.toggle('is-error', isError);
  },

  async _unlock() {
    const secret = this.ui.secret.value.trim();
    if (!secret) return;

    this._setAuthStatus('Verifying access...');
    try {
      const response = await fetch('/api/chat/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.token) {
        throw new Error(data.error || 'Unable to verify access.');
      }
      this.state.token = data.token;
      saveState(this.state);
      this.ui.secret.value = '';
      this._setAuthStatus('Access granted.');
      this._renderAuthState();
      this.ui.message.focus();
    } catch (error) {
      this.state.token = '';
      saveState(this.state);
      this._renderAuthState();
      this._setAuthStatus(error.message || 'Unable to verify access.', true);
    }
  },

  async _send() {
    const message = this.ui.message.value.trim();
    if (!message) return;

    const context = getCurrentContext();
    const history = this.state.history.slice(-8).map(item => ({
      role: item.role,
      text: item.text,
    }));

    this.state.history.push({ role: 'user', text: message });
    this.ui.message.value = '';
    this._renderHistory();
    this._setChatStatus('Thinking...');
    this.ui.send.disabled = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.token}`,
        },
        body: JSON.stringify({
          message,
          page: context.page,
          day: context.day,
          week: context.week,
          chat_history: history,
        }),
      });
      const data = await response.json();
      if (response.status === 401) {
        this.state.token = '';
        saveState(this.state);
        this._renderAuthState();
        throw new Error('Session expired. Unlock again to continue.');
      }
      if (!response.ok || !data.answer) {
        throw new Error(data.error || 'Unable to get an answer right now.');
      }

      this.state.history.push({
        role: 'assistant',
        text: data.answer,
        citations: Array.isArray(data.citations) ? data.citations : [],
      });
      saveState(this.state);
      this._renderHistory();
      this._setChatStatus(data.grounded ? 'Grounded to website content.' : (data.fallback_reason || 'Answer generated.'));
    } catch (error) {
      this.state.history.push({
        role: 'assistant',
        text: error.message || 'Unable to get an answer right now.',
        citations: [],
      });
      saveState(this.state);
      this._renderHistory();
      this._setChatStatus(error.message || 'Unable to get an answer right now.', true);
    } finally {
      this.ui.send.disabled = false;
    }
  },
};

export default CodexBot;
