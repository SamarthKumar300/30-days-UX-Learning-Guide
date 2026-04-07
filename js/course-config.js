export const TOTAL_DAYS = 56;
export const TOTAL_WEEKS = 8;
export const PLAN_MARKDOWN_PATH = 'V2-guidebook-plan.md';

export const WEEK_DEFINITIONS = [
  { number: 1, startDay: 1, endDay: 7, slug: 'week1.html', shortTitle: 'Human-First Foundation', navTitle: 'Week 1: Human-First Foundation', accentVar: '--week1-color' },
  { number: 2, startDay: 8, endDay: 14, slug: 'week2.html', shortTitle: 'Problem Finding & Design Process', navTitle: 'Week 2: Problem Finding & Design Process', accentVar: '--week2-color' },
  { number: 3, startDay: 15, endDay: 21, slug: 'week3.html', shortTitle: 'Research, Business & Scale', navTitle: 'Week 3: Research, Business & Scale', accentVar: '--week3-color' },
  { number: 4, startDay: 22, endDay: 28, slug: 'week4.html', shortTitle: 'Screening to Whiteboard', navTitle: 'Week 4: Screening to Whiteboard', accentVar: '--week4-color' },
  { number: 5, startDay: 29, endDay: 35, slug: 'week5.html', shortTitle: 'Case Study to Leadership', navTitle: 'Week 5: Case Study to Leadership', accentVar: '--week5-color' },
  { number: 6, startDay: 36, endDay: 42, slug: 'week6.html', shortTitle: 'Design in the Age of AI', navTitle: 'Week 6: Design in the Age of AI', accentVar: '--week6-color' },
  { number: 7, startDay: 43, endDay: 49, slug: 'week7.html', shortTitle: 'Portfolio, Communication & Defense', navTitle: 'Week 7: Portfolio, Communication & Defense', accentVar: '--week7-color' },
  { number: 8, startDay: 50, endDay: 56, slug: 'week8.html', shortTitle: 'Practice Lab & Mock Interviews', navTitle: 'Week 8: Practice Lab & Mock Interviews', accentVar: '--week8-color' },
];

export function getWeekForDay(dayNum) {
  return WEEK_DEFINITIONS.find(week => dayNum >= week.startDay && dayNum <= week.endDay) || WEEK_DEFINITIONS[0];
}

export function getWeekByNumber(weekNum) {
  return WEEK_DEFINITIONS.find(week => week.number === weekNum) || WEEK_DEFINITIONS[0];
}
