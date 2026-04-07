const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const markdown = fs.readFileSync(path.join(process.cwd(), 'V2-guidebook-plan.md'), 'utf8');
const dayWise = fs.readFileSync(path.join(process.cwd(), 'Day-wise-content.md'), 'utf8');
const audit = fs.readFileSync(path.join(process.cwd(), 'PDF-coverage-audit.md'), 'utf8');

global.fetch = async (requestPath) => ({
  ok: true,
  text: async () => {
    const request = String(requestPath);
    if (request.includes('Day-wise-content.md')) return dayWise;
    if (request.includes('PDF-coverage-audit.md')) return audit;
    return markdown;
  },
});

(async () => {
  const moduleUrl = pathToFileURL(path.join(process.cwd(), 'js', 'v2-renderer.js')).href;
  const { renderPage } = await import(moduleUrl);
  const pages = ['index.html', 'week1.html', 'week8.html', 'assignments.html', 'references.html'];
  const outputs = {};
  for (const page of pages) {
    const root = { innerHTML: '' };
    await renderPage(page, root);
    outputs[page] = root.innerHTML;
  }

  const assertions = [
    ['dashboard has 8 week cards', (outputs['index.html'].match(/week-card-num/g) || []).length === 8],
    ['dashboard has 56 timeline days', (outputs['index.html'].match(/data-timeline-day=/g) || []).length === 56],
    ['week1 has 7 day accordions', (outputs['week1.html'].match(/class="accordion-item/g) || []).length === 7],
    ['week8 has 7 day accordions', (outputs['week8.html'].match(/class="accordion-item/g) || []).length === 7],
    ['assignments has 56 assignment cards', (outputs['assignments.html'].match(/class="assignment-card"/g) || []).length === 56],
    ['references removes learner-facing pdf cards', (outputs['references.html'].match(/class="resource-card"/g) || []).length === 0],
    ['references includes coverage audit status', outputs['references.html'].includes('Coverage Audit Status')],
    ['references includes optional support resources', outputs['references.html'].includes('Optional Support Resources')],
    ['week8 includes day 56', outputs['week8.html'].includes('id="day-56"')],
    ['dashboard mentions 8-Week UX Mastery', outputs['index.html'].includes('8-Week UX Mastery')],
    ['week1 renders parsed day-wise sections', outputs['week1.html'].includes('study-tab-section')],
    ['global codex bot shell renders', outputs['index.html'].includes('codex-bot-shell') && outputs['week1.html'].includes('codex-bot-shell')],
    ['timer widget removed from week pages', !outputs['week1.html'].includes('timer-widget')],
  ];

  let failed = false;
  for (const [label, pass] of assertions) {
    if (!pass) {
      failed = true;
      console.error(`FAIL: ${label}`);
    } else {
      console.log(`PASS: ${label}`);
    }
  }

  if (failed) process.exit(1);
})();
