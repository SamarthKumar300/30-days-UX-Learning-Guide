import { PLAN_MARKDOWN_PATH, WEEK_DEFINITIONS } from './course-config.js';
import { READINESS_CONTENT } from './study-enhancements.js';

const DAY_WISE_CONTENT_PATH = 'content/Day-wise-content.md';
const PDF_COVERAGE_AUDIT_PATH = 'content/PDF-coverage-audit.md';

let planPromise;

const DAY_TITLES = {
  1: 'What Product Design Actually Means',
  2: 'Turning Ambiguity into Design Clarity',
  3: 'Users, Context & Behavior - Beyond Fictional Personas',
  4: 'Emotion Mapping with Precision',
  5: 'Presenting Decisions Like a Senior Designer',
  6: 'Scale Planning as a Design Skill',
  7: 'Week 1 Integration - Putting It All Together',
  8: 'What Makes an Audit Useful',
  9: 'Root Cause Before Redesign',
  10: 'Emotion-First Ideation in Practice',
  11: 'Divergence & Convergence with Control',
  12: 'Wireframes as Thinking Tools',
  13: 'Information Architecture from Story',
  14: 'Week 2 Integration - The Full Design Cycle',
  15: 'Research Under Real-World Constraints',
  16: 'Research Ethics & Separating Signal from Noise',
  17: 'Speaking the Language of Stakeholders',
  18: 'Deep Rationale & Metrics-Driven Design',
  19: 'Scaling Design Systems & Processes',
  20: 'Applied Product Thinking',
  21: 'Week 3 Integration - Research, Business & Strategy',
  22: 'Resume & Portfolio Screening - The 60-Second Test',
  23: 'Intro & HR Screening Calls - The Silent Evaluation',
  24: 'Problem Framing Interview Round - Thinking Out Loud',
  25: 'Design Exercise - Real-Time Problem Solving',
  26: 'Design Assignment / Take-Home Round',
  27: 'Handling Live Feedback & Pivoting',
  28: 'Week 4 Integration - Interview Readiness Check',
  29: 'Case Study Deep Dive - The Most Critical Round',
  30: 'Case Study Defense - Handling Follow-Up Questions',
  31: 'Product Thinking & Cross-Functional Round',
  32: 'Culture & Leadership Round',
  33: 'Interview Simulation - Full Round Practice',
  34: 'Common Interview Traps - Deep Study',
  35: 'Week 5 Integration - Full Interview Readiness',
  36: "The Shift - What's Actually Changing (and What Isn't)",
  37: 'The AI-Augmented Design Toolkit',
  38: 'The New Design Process - Parallel, Not Sequential',
  39: 'Designing AI-Powered Products',
  40: "The Designer's New Role on AI-Native Teams",
  41: 'Answering AI Questions in Interviews',
  42: 'Week 6 Integration - The AI-Ready Designer',
  43: 'Portfolio Strategy - 5 Case Study Formats',
  44: 'Decision Story Writing',
  45: 'Handling Pushback & Difficult Questions',
  46: 'Verbal Communication & Presentation Skills',
  47: 'Visibility Strategy & Personal Brand',
  48: 'Interview Simulations & Mock Rounds',
  49: 'Week 7 Integration - Final Portfolio & Communication Check',
  50: 'Practice Lab Launch - Challenges 22-24',
  51: 'Mock Interview + Challenges 25-26',
  52: 'Mock Interview + Challenges 27-28',
  53: 'Mock Interview + Challenges 29-30',
  54: '14-Day Prep Plan Integration - Intensive Practice Day 1',
  55: '14-Day Prep Plan Integration - Intensive Practice Day 2',
  56: 'Final Mock Interview & Graduation',
};

function normalizeText(text) {
  return text
    .replace(/\r/g, '')
    .replace(/â†’/g, '->')
    .replace(/â€”/g, '-')
    .replace(/â€“/g, '-')
    .replace(/âœ…/g, '[done]')
    .replace(/âœ”/g, '[ok]')
    .replace(/âœ–/g, '[x]')
    .replace(/ðŸ”µ/g, '')
    .replace(/ðŸŸ¡/g, '')
    .replace(/ðŸŸ¢/g, '');
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

export function markdownToHtml(markdown) {
  if (!markdown) return '';

  const lines = normalizeText(markdown).split('\n');
  const html = [];
  let paragraph = [];
  let listType = null;
  let inCode = false;
  let table = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  const flushTable = () => {
    if (!table.length) return;
    const rows = table
      .filter(row => row.trim().startsWith('|'))
      .map(row => row.split('|').slice(1, -1).map(cell => cell.trim()));
    if (rows.length >= 2) {
      const [header, ...body] = rows;
      const bodyRows = body.filter(row => !row.every(cell => /^-+$/.test(cell.replace(/:/g, ''))));
      html.push('<div class="table-wrap"><table class="markdown-table"><thead><tr>');
      header.forEach(cell => html.push(`<th>${renderInlineMarkdown(cell)}</th>`));
      html.push('</tr></thead><tbody>');
      bodyRows.forEach(row => {
        html.push('<tr>');
        row.forEach(cell => html.push(`<td>${renderInlineMarkdown(cell)}</td>`));
        html.push('</tr>');
      });
      html.push('</tbody></table></div>');
    }
    table = [];
  };

  lines.forEach(line => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      flushParagraph();
      flushList();
      flushTable();
      html.push(inCode ? '</code></pre>' : '<pre class="markdown-code"><code>');
      inCode = !inCode;
      return;
    }

    if (inCode) {
      html.push(`${escapeHtml(line)}\n`);
      return;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushTable();
      return;
    }

    if (trimmed.startsWith('|')) {
      flushParagraph();
      flushList();
      table.push(trimmed);
      return;
    }

    flushTable();

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = Math.min(headingMatch[1].length + 1, 6);
      html.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`);
      return;
    }

    if (trimmed.startsWith('>')) {
      flushParagraph();
      flushList();
      html.push(`<blockquote>${renderInlineMarkdown(trimmed.replace(/^>\s?/, ''))}</blockquote>`);
      return;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType !== 'ol') {
        flushList();
        html.push('<ol>');
        listType = 'ol';
      }
      html.push(`<li>${renderInlineMarkdown(orderedMatch[1])}</li>`);
      return;
    }

    const bulletMatch = trimmed.match(/^-\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      if (listType !== 'ul') {
        flushList();
        html.push('<ul>');
        listType = 'ul';
      }
      html.push(`<li>${renderInlineMarkdown(bulletMatch[1])}</li>`);
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushTable();

  return html.join('');
}

function createSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseFrontmatter(text) {
  const meta = {};
  text
    .split('\n')
    .filter(line => line.trim().startsWith('>'))
    .map(line => line.replace(/^>\s?/, '').trim())
    .forEach(line => {
      const match = line.match(/^\*\*(.+?):\*\*\s*(.+)$/);
      if (match) meta[createSlug(match[1])] = match[2];
    });
  return meta;
}

function collectTopLevelSections(text) {
  const lines = normalizeText(text).split('\n');
  const sections = [];
  let current = null;

  lines.forEach(line => {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      if (current) {
        current.rawMarkdown = current.lines.join('\n').trim();
        delete current.lines;
        sections.push(current);
      }
      current = { title: match[1].trim(), id: createSlug(match[1]), lines: [] };
      return;
    }
    if (current) current.lines.push(line);
  });

  if (current) {
    current.rawMarkdown = current.lines.join('\n').trim();
    delete current.lines;
    sections.push(current);
  }

  return sections;
}

function parseTableRows(markdown) {
  return markdown
    .split('\n')
    .filter(line => line.trim().startsWith('|'))
    .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()))
    .filter(cells => cells.length > 1 && !cells.every(cell => /^-+$/.test(cell.replace(/:/g, ''))));
}

function parseChecklist(markdown) {
  const groups = [];
  let current = null;
  markdown.split('\n').forEach(line => {
    const headingMatch = line.match(/^###\s+(.+)$/);
    if (headingMatch) {
      current = { title: headingMatch[1], items: [] };
      groups.push(current);
      return;
    }
    const itemMatch = line.match(/^- \[(x| )\]\s+(.+)$/i);
    if (itemMatch && current) current.items.push({ checked: itemMatch[1].toLowerCase() === 'x', text: itemMatch[2] });
  });
  return groups;
}

function parseDayWiseContent(text) {
  const normalized = normalizeText(text || '');
  const lines = normalized.split('\n');
  const days = {};
  let currentDay = null;
  let currentTab = null;

  lines.forEach(line => {
    const dayMatch = line.match(/^##\s+Day\s+(\d+):\s+(.+)$/);
    if (dayMatch) {
      currentDay = { number: Number(dayMatch[1]), title: dayMatch[2].trim(), tabs: [] };
      days[currentDay.number] = currentDay;
      currentTab = null;
      return;
    }

    if (!currentDay) return;

    const tabMatch = line.match(/^###\s+\[tab:\s*(.+?)\]$/i);
    if (tabMatch) {
      currentTab = { label: tabMatch[1].trim(), markdown: '' };
      currentDay.tabs.push(currentTab);
      return;
    }

    if (currentTab) currentTab.markdown += `${line}\n`;
  });

  return days;
}

function getWeekTheme(rows, weekNumber) {
  const row = rows.find(cells => Number(cells[0]) === weekNumber);
  return row?.[3] || row?.[2] || '';
}

function createFallbackStudy(dayTitle, weekTitle) {
  return [
    '### Website Study Content Migration',
    `This day belongs to **${weekTitle}**.`,
    '',
    `The curriculum topic is **${dayTitle}**.`,
    '',
    'This day is being migrated into the website-first study surface. The final standard remains unchanged: the learner should study the concept directly on the site without opening the source PDFs.',
    '',
    'Implementation priority: extract the PDF concepts, merge them with any high-value existing website insights, and render the merged teaching content inside the main study block for this day.',
  ].join('\n');
}

function buildReadiness(dayNumber) {
  const entry = READINESS_CONTENT[dayNumber];
  if (!entry) return null;

  return {
    mindset: entry.mindset || '',
    strongAnswerPatterns: entry.strongAnswer || [],
    proofExercise: Array.isArray(entry.proof) ? entry.proof[0] || '' : '',
    extraLines: Array.isArray(entry.proof) ? entry.proof.slice(1) : [],
  };
}

function buildWeeks(sectionMap, dayWiseDays) {
  const architectureRows = parseTableRows(sectionMap['6. Curriculum Architecture']?.rawMarkdown || '');

  return WEEK_DEFINITIONS.map(weekDef => {
    const week = {
      number: weekDef.number,
      title: weekDef.shortTitle,
      startDay: weekDef.startDay,
      endDay: weekDef.endDay,
      theme: getWeekTheme(architectureRows, weekDef.number),
      interviewReadiness: '',
      newSystem: '',
      days: [],
    };

    for (let dayNumber = weekDef.startDay; dayNumber <= weekDef.endDay; dayNumber += 1) {
      const dayWise = dayWiseDays[dayNumber];
      const title = dayWise?.title || DAY_TITLES[dayNumber] || `Day ${dayNumber}`;
      week.days.push({
        number: dayNumber,
        title,
        weekNumber: weekDef.number,
        studyMarkdown: dayWise?.tabs?.length ? '' : createFallbackStudy(title, week.title),
        studyTabs: dayWise?.tabs?.map(tab => ({
          label: tab.label,
          markdown: tab.markdown.trim(),
        })) || [],
        assignment: `Work through the on-site study guide for Day ${dayNumber}, capture your strongest insight, and write one interview-ready takeaway you can explain without checking external resources.`,
        assignmentId: `assignment-day-${dayNumber}`,
        estimatedHours: 'Planned day',
        readiness: buildReadiness(dayNumber),
        specialBlocks: [],
      });
    }

    return week;
  });
}

function parsePlan(planText, dayWiseText, auditText) {
  const normalized = normalizeText(planText);
  const sections = collectTopLevelSections(normalized);
  const sectionMap = Object.fromEntries(sections.map(section => [section.title, section]));
  const auditSections = collectTopLevelSections(auditText || '');
  const auditSectionMap = Object.fromEntries(auditSections.map(section => [section.title, section]));
  const weeks = buildWeeks(sectionMap, parseDayWiseContent(dayWiseText));

  return {
    meta: parseFrontmatter(normalized),
    sections,
    weeks,
    architectureRows: parseTableRows(sectionMap['6. Curriculum Architecture']?.rawMarkdown || ''),
    challengeRows: [],
    systemsMarkdown: sectionMap['9. Practice Systems to Preserve and Expand']?.rawMarkdown || '',
    challengeMapMarkdown: sectionMap['8. Coverage Requirements by Source']?.rawMarkdown || '',
    technicalMarkdown: sectionMap['11. Technical Content Delivery Directives']?.rawMarkdown || '',
    verificationGroups: parseChecklist(sectionMap['12. Acceptance Checklist']?.rawMarkdown || ''),
    auditMarkdown: normalizeText(auditText || ''),
    auditSummaryMarkdown: auditSectionMap['Overall Status']?.rawMarkdown || '',
    auditPartByPartMarkdown: auditSectionMap['Part-by-Part Audit']?.rawMarkdown || '',
    auditChecklistMarkdown: auditSectionMap['Second-Pass Minor Concept Checklist']?.rawMarkdown || '',
    auditFidelityMarkdown: auditSectionMap['Paragraph-Fidelity Review Summary']?.rawMarkdown || '',
    auditResourcesMarkdown: auditSectionMap['Part 4 Named Resource Preservation List']?.rawMarkdown || '',
    weekLookup: Object.fromEntries(weeks.map(week => [week.number, week])),
    dayLookup: Object.fromEntries(weeks.flatMap(week => week.days.map(day => [day.number, day]))),
    resourceLibrary: [],
    navWeeks: WEEK_DEFINITIONS,
  };
}

export async function loadPlan() {
  if (!planPromise) {
    planPromise = Promise.all([
      fetch(PLAN_MARKDOWN_PATH).then(response => {
        if (!response.ok) throw new Error(`Failed to load ${PLAN_MARKDOWN_PATH}`);
        return response.text();
      }),
      fetch(DAY_WISE_CONTENT_PATH).then(response => {
        if (!response.ok) return '';
        return response.text();
      }),
      fetch(PDF_COVERAGE_AUDIT_PATH).then(response => {
        if (!response.ok) return '';
        return response.text();
      }),
    ]).then(([planText, dayWiseText, auditText]) => parsePlan(planText, dayWiseText, auditText));
  }
  return planPromise;
}
