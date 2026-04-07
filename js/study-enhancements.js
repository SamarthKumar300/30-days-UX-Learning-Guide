import EXTENDED_STUDY_CONTENT from './study-enhancements-data/index.js';

export const READINESS_CONTENT = {
  1: {
    title: 'Interview Readiness Layer - Experience Thinking',
    mindset: 'Interviewers are not testing whether you can define UX. They are testing whether you naturally move from user goal, to friction, to emotion, to business consequence without getting trapped in surface-level UI talk.',
    strongAnswer: [
      'A strong answer sounds like: "The user is not trying to use a feature. They are trying to make progress in their life, and the product either reduces or increases the emotional cost of that progress."',
      'You should be able to explain one everyday product flow as a chain of goals, decisions, emotions, and system responses.',
      'If your explanation stays at "the button should be clearer," you are still thinking like a screen decorator, not a product designer.'
    ],
    proof: [
      'Prepare one 60-second breakdown of Swiggy, Uber, or Razorpay using goal -> journey -> emotion -> business impact.',
      'Write down three moments where negative emotion appears and one business metric each moment can affect.',
      'Practice replacing feature language with human language. Say "reduce payment anxiety," not "improve checkout UI."'
    ]
  },
  2: {
    title: 'Interview Readiness Layer - Ambiguity to Clarity',
    mindset: 'Senior interviewers care less about whether you had complete requirements and more about whether you knew how to create clarity when requirements were incomplete, conflicting, or politically messy.',
    strongAnswer: [
      'A strong answer sounds like: "I separated assumptions from facts, identified the highest-risk unknowns, and used small validation loops before committing to a direction."',
      'Show that ambiguity does not make you passive. It makes you structured.',
      'Weak candidates ask for more clarity. Strong candidates generate the right clarity with questions, framing, and prioritization.'
    ],
    proof: [
      'Prepare one story where the brief was vague and you reduced ambiguity through alignment questions or rapid framing.',
      'List the exact questions you would ask a PM when the ask is "improve onboarding" or "make this flow better."',
      'Write one example of a wrong assumption you could have made and how you would have caught it early.'
    ]
  },
  3: {
    title: 'Interview Readiness Layer - Metrics Fluency',
    mindset: 'At a 25 LPA level, business language is not optional. You do not need to be a PM, but you must show that design decisions move behavior, and behavior moves metrics.',
    strongAnswer: [
      'A strong answer sounds like: "This design matters because it should reduce hesitation at the decision point, which should improve completion rate and reduce support dependency."',
      'Do not say "I improved engagement" unless you can name what behavior changed and how that would show up in a metric.',
      'Interviewers trust designers who can connect user experience to growth, retention, activation, efficiency, or risk reduction.'
    ],
    proof: [
      'For one project, map every major design decision to one primary metric and one secondary metric.',
      'Prepare one sentence for each: activation, conversion, retention, error rate, support load.',
      'Practice answering "How would you know your design worked?" without using vague language like "users liked it."'
    ]
  },
  4: {
    title: 'Interview Readiness Layer - Emotion Mapping',
    mindset: 'Emotion mapping becomes valuable in interviews only when you show it is not soft or decorative. It must help you predict user hesitation, trust, confidence, relief, and frustration at critical points in the journey.',
    strongAnswer: [
      'A strong answer sounds like: "I mapped the emotional state before optimizing the screen because trust and hesitation were shaping behavior more than layout alone."',
      'Link emotion to action. Anxiety delays action. Relief confirms action. Confidence accelerates action.',
      'If you discuss emotion without a behavioral consequence, interviewers may hear it as fluff.'
    ],
    proof: [
      'Prepare one emotional journey for a high-stakes flow such as checkout, signup, or grant approval.',
      'Mark where trust is built, where doubt spikes, and which interface choices should reduce that doubt.',
      'Be ready to explain why AI can generate interfaces but still miss emotional sequencing and situational nuance.'
    ]
  },
  5: {
    title: 'Interview Readiness Layer - Presenting Decisions',
    mindset: 'This topic is directly interview-critical. Most good candidates have decent work. Fewer candidates can defend their decisions without sounding defensive, vague, or overly attached to visuals.',
    strongAnswer: [
      'A strong answer sounds like: "I chose this direction because the user needed X, the business needed Y, and this option reduced Z tradeoff better than the alternatives."',
      'Always mention at least one alternative you did not choose and why.',
      'The quality signal is not certainty. It is reasoned tradeoff thinking.'
    ],
    proof: [
      'Prepare three design rationale statements using user need, business need, chosen action, and expected impact.',
      'For one screen, document two alternatives you rejected and the risk in each.',
      'Practice answering pushback with calm logic: "That is valid; here is why I still prioritized this route."'
    ]
  },
  6: {
    title: 'Interview Readiness Layer - Scale Planning',
    mindset: 'Designers aiming for stronger compensation need to show they can think beyond a single ideal screen. Scale planning proves system thinking, dependency awareness, and prioritization under real constraints.',
    strongAnswer: [
      'A strong answer sounds like: "I scoped the problem by critical path, dependency, and rollout risk instead of trying to solve every edge case in one release."',
      'Show that you know how a design behaves across product states, user segments, and team constraints.',
      'If everything in your project sounds equally important, your prioritization muscle is underdeveloped.'
    ],
    proof: [
      'Pick one project and list MVP, phase-two, and later-stage considerations.',
      'Identify three edge cases that matter and two that can reasonably wait.',
      'Practice answering "Why did you not solve everything?" with a product-minded response.'
    ]
  },
  7: {
    title: 'Interview Readiness Layer - Week 1 Integration',
    mindset: 'Integration days are where the signal becomes visible. By this point you should be able to combine human goals, emotion, metrics, rationale, and scale into one coherent explanation without sounding rehearsed.',
    strongAnswer: [
      'A strong answer sounds like a joined-up story, not five separate frameworks pasted together.',
      'Your explanation should move from context -> user problem -> emotional stakes -> design decision -> business impact -> next validation step.',
      'If you need to mention five frameworks by name, you probably have not internalized them yet.'
    ],
    proof: [
      'Record one 3-minute explanation of a project using the full Week 1 mental model.',
      'Listen back and remove any line that sounds generic, abstract, or portfolio-template-like.',
      'Prepare one sentence on how Week 1 changed the way you now critique products.'
    ]
  },
  8: {
    title: 'Interview Readiness Layer - Audit Quality',
    mindset: 'A UX audit only helps in interviews if it shows prioritization, logic, and consequence. Listing issues is junior-level. Framing issues by severity, evidence, and business impact is stronger.',
    strongAnswer: [
      'A strong answer sounds like: "I do not treat every flaw equally. I rank findings by frequency, severity, and outcome risk."',
      'Use precise language: "unclear primary action increases hesitation" is stronger than "UI is confusing."',
      'Your audit should naturally suggest next steps, not just observations.'
    ],
    proof: [
      'Turn one audit finding into a four-part note: problem, evidence, impact, recommendation.',
      'Prepare one example of a small UI issue that is actually low priority despite being visible.',
      'Practice explaining how you would validate a finding with analytics or sessions if direct data were unavailable.'
    ]
  },
  9: {
    title: 'Interview Readiness Layer - Root Cause Thinking',
    mindset: 'Root cause thinking is one of the clearest seniority signals in product design interviews. It shows whether you chase symptoms or identify the conditions creating those symptoms.',
    strongAnswer: [
      'A strong answer sounds like: "The visible issue was drop-off on step three, but the deeper problem was unclear value and weak confidence before commitment."',
      'Interviewers want to hear how you tested competing explanations before proposing solutions.',
      'If you jump from observation to interface fix too fast, you look solution-biased.'
    ],
    proof: [
      'Prepare one case where the first obvious problem was not the real problem.',
      'Write three possible causes for one product failure and what evidence would distinguish them.',
      'Practice saying "I would not redesign yet until I know whether the issue is trust, comprehension, or motivation."'
    ]
  },
  10: {
    title: 'Interview Readiness Layer - Ideation Quality',
    mindset: 'High-value ideation is not about volume for its own sake. It is about generating meaningfully different routes before converging on the route that best fits the emotional and business reality.',
    strongAnswer: [
      'A strong answer sounds like: "I widened the solution space first so I could compare strategic directions, not just visual variations."',
      'Show the interviewer that you know when to stay broad and when to narrow decisively.',
      'Ideas become valuable when you can explain what assumption each idea is testing.'
    ],
    proof: [
      'Prepare three genuinely different solution directions for one problem, with one-line tradeoffs for each.',
      'Document the assumption behind each concept: speed, trust, control, education, or motivation.',
      'Practice answering "Why this idea over the others?" in under 45 seconds.'
    ]
  },
  11: {
    title: 'Interview Readiness Layer - Diverge Then Converge',
    mindset: 'Interviewers often ask about process maturity. This topic helps you show that you can avoid premature fixation and still make timely decisions.',
    strongAnswer: [
      'A strong answer sounds like: "I created breadth deliberately, then converged using explicit criteria instead of personal preference."',
      'Convergence criteria can include user clarity, engineering feasibility, business leverage, and rollout risk.',
      'Do not present divergence as endless exploration. Present it as controlled option generation.'
    ],
    proof: [
      'For one project, write the exact criteria you used to narrow options.',
      'Prepare one example of an idea you liked personally but rejected for stronger product reasons.',
      'Practice explaining how you prevent workshops or brainstorming from becoming performative noise.'
    ]
  },
  12: {
    title: 'Interview Readiness Layer - Wireframing as Thinking',
    mindset: 'Wireframes matter in interviews only when they reveal reasoning. A wall of grayscale screens does not impress by itself. What matters is what decisions became visible in wireframe form.',
    strongAnswer: [
      'A strong answer sounds like: "I used wireframes to test hierarchy, flow, and decision load before spending time on polish."',
      'Show that wireframes are a decision tool, not a deliverable checkbox.',
      'If every wireframe is a nearly finished UI, you may be skipping the exploration stage.'
    ],
    proof: [
      'Select one wireframe and annotate what question it helped answer.',
      'Be ready to explain what changed between wireframe and final UI and why.',
      'Practice telling the story of one discarded wireframe route and what it taught you.'
    ]
  },
  13: {
    title: 'Interview Readiness Layer - Information Architecture',
    mindset: 'Strong IA discussion shows you can organize complexity before styling it. This is especially valuable for enterprise, SaaS, and workflow-heavy roles.',
    strongAnswer: [
      'A strong answer sounds like: "I organized the system around the users story and decisions, not around internal team structures or feature ownership."',
      'Good IA reduces memory burden and makes next steps predictable.',
      'When explaining IA, use user intent, mental model, and retrieval cost as your anchors.'
    ],
    proof: [
      'Map one project from messy feature list into task-based groups.',
      'Prepare one example where a navigation or content structure decision reduced confusion.',
      'Practice answering "How did you know the structure was right?" using testing, usage patterns, or observed friction.'
    ]
  },
  14: {
    title: 'Interview Readiness Layer - Week 2 Integration',
    mindset: 'This week should make you look sharper in critique settings. You should now be able to inspect a product and talk about symptoms, root causes, priorities, and evidence like a thoughtful operator.',
    strongAnswer: [
      'A strong answer sounds like a structured teardown rather than a stream of opinions.',
      'Start with the users job, identify the key breakdown, explain likely root cause, then prioritize action.',
      'The goal is not sounding harsh. The goal is sounding precise.'
    ],
    proof: [
      'Run a 5-minute spoken teardown of one product and record it.',
      'Force yourself to state one high-priority issue, one lower-priority issue, and why they differ.',
      'Prepare one sentence on how your audit approach avoids superficial "make the UI cleaner" advice.'
    ]
  },
  15: {
    title: 'Interview Readiness Layer - Lean Research',
    mindset: 'The strongest interview signal here is not that you know five methods. It is that you know which low-cost method answers which uncertainty fastest.',
    strongAnswer: [
      'A strong answer sounds like: "I chose quick usability sessions because the main risk was comprehension, not long-term behavior."',
      'Method choice should match decision risk, available time, and product stage.',
      'Avoid sounding religious about research. Sound practical and evidence-seeking.'
    ],
    proof: [
      'Write one matrix: uncertainty type -> fastest useful research method.',
      'Prepare one example where five participants were enough and one where they would not be.',
      'Practice answering "How would you research this with almost no budget?" with a concrete plan.'
    ]
  },
  16: {
    title: 'Interview Readiness Layer - Research Ethics',
    mindset: 'This topic is about judgment. Interviewers want to know whether you can resist confirmation bias and use research to discover truth, not to launder your preferred idea.',
    strongAnswer: [
      'A strong answer sounds like: "I separate what users say, what users do, and what I infer. Those are not the same level of evidence."',
      'Show that you are careful with quotes and cautious with overclaiming.',
      'If you say "users wanted X" too casually, strong interviewers will immediately test your rigor.'
    ],
    proof: [
      'Prepare one example of a misleading user request and the deeper need behind it.',
      'List three interview questions that are open-ended and non-leading.',
      'Practice answering "What if users ask for a bad solution?" with a calm, nuanced response.'
    ]
  },
  17: {
    title: 'Interview Readiness Layer - Stakeholder Language',
    mindset: 'Many interviews are really tests of cross-functional fluency. Companies pay more for designers who can reduce friction with PMs, engineers, and leadership while still protecting product quality.',
    strongAnswer: [
      'A strong answer sounds like: "I translate design choices into tradeoffs stakeholders already care about: speed, risk, revenue, support load, trust, and technical complexity."',
      'Do not speak as if stakeholders are obstacles. Speak as if they are decision partners with different constraints.',
      'The signal is diplomatic clarity, not design evangelism.'
    ],
    proof: [
      'Prepare one design rationale in designer language and rewrite it in PM language and engineering language.',
      'Write a one-minute answer to "Why should we do this now?"',
      'Practice disagreeing without sounding rigid: acknowledge constraint, restate risk, propose path.'
    ]
  },
  18: {
    title: 'Interview Readiness Layer - Deep Rationale Practice',
    mindset: 'At this point, your rationale should start sounding consistent under pressure. The bar is not just having reasons. The bar is having reasons that survive follow-up questions.',
    strongAnswer: [
      'A strong answer sounds like: "I chose this because..., I rejected that because..., and if condition X changes I would revisit the decision."',
      'Mature rationale includes uncertainty and future conditions, not fake certainty.',
      'You should be able to defend a decision at multiple zoom levels: screen, flow, and business impact.'
    ],
    proof: [
      'Take one design decision and prepare answers for "why?", "why not the alternative?", and "how would you validate?"',
      'Identify one point where your rationale is currently weak or mostly intuitive.',
      'Practice answering rapid-fire follow-ups without slipping into generic statements.'
    ]
  },
  19: {
    title: 'Interview Readiness Layer - Scale Planning Deep Dive',
    mindset: 'This day should help you sound credible on complex products. Higher-paying roles often sit in environments where coordination, rollout, and system complexity matter as much as screen craft.',
    strongAnswer: [
      'A strong answer sounds like: "I planned for scale by considering roles, data states, governance, handoff cost, and future extension paths."',
      'Scale thinking is not just more screens. It is more states, more dependencies, and more failure modes.',
      'If you talk about scale only as visual consistency, your answer is too shallow.'
    ],
    proof: [
      'Pick one workflow product and list roles, permissions, states, and exceptions.',
      'Prepare one example of a decision that is fine at small scale but dangerous at larger scale.',
      'Practice answering "What breaks when this grows 10x?"'
    ]
  },
  20: {
    title: 'Interview Readiness Layer - Applied Scale Practice',
    mindset: 'Applied scale is where theory becomes believable. Interviewers trust examples where you made constrained decisions for real contexts more than abstract framework talk.',
    strongAnswer: [
      'A strong answer sounds like: "Given the team size and release window, I scoped for the highest leverage path and protected extensibility where it mattered most."',
      'Show that you can design responsibly under incomplete resources.',
      'The interviewer should leave feeling that you know how to operate inside a roadmap, not outside reality.'
    ],
    proof: [
      'Turn one framework from Day 19 into a specific rollout recommendation.',
      'Document one tradeoff between immediate clarity and long-term flexibility.',
      'Practice explaining your release plan in product terms, not just design terms.'
    ]
  },
  21: {
    title: 'Interview Readiness Layer - Week 3 Integration',
    mindset: 'By the end of Week 3, your strongest signal should be professional judgment: how you research, reason, speak cross-functionally, and handle scale without overcomplicating.',
    strongAnswer: [
      'A strong answer sounds like an operator who can enter a product team and reduce uncertainty quickly.',
      'You should connect research, rationale, stakeholder communication, and scale planning into one decision system.',
      'If these still feel like isolated lessons, you need more synthesis practice.'
    ],
    proof: [
      'Prepare one mock stakeholder review story using a real project.',
      'Explain the problem, what you learned, what you proposed, who you aligned with, and how you would measure success.',
      'Record the explanation and cut any line that sounds like course vocabulary without real application.'
    ]
  },
  22: {
    title: 'Interview Readiness Layer - Case Study System',
    mindset: 'For interview outcomes, this topic is crucial. Strong designers lose opportunities because they rely on one format and fail either the scan phase or the scrutiny phase.',
    strongAnswer: [
      'A strong answer sounds like: "I package the same project differently depending on attention span, decision stage, and audience need."',
      'You should be able to explain why a recruiter needs a scan-friendly artifact while a hiring manager needs decision depth.',
      'Portfolio strategy is product strategy applied to your own candidacy.'
    ],
    proof: [
      'Audit one project across all five formats and note the weakest one.',
      'Prepare one project summary for 30 seconds, one minute, and five minutes.',
      'Decide what proof belongs in scan mode versus scrutiny mode.'
    ]
  },
  23: {
    title: 'Interview Readiness Layer - Decision Stories',
    mindset: 'Decision stories are the difference between process theater and real credibility. Hiring managers remember designers who can explain one pivotal tradeoff clearly and honestly.',
    strongAnswer: [
      'A strong answer sounds like: "The important moment in this project was not the final screen. It was the decision between two competing paths and why I chose one."',
      'Good decision stories include context, tradeoff, reasoning, consequence, and what you learned.',
      'If your case study has no moments of tension, it may sound artificial.'
    ],
    proof: [
      'Write down three decisions from one project that genuinely mattered.',
      'For each, include what could have gone wrong and what you prioritized instead.',
      'Practice telling one decision story without mentioning Figma until the end.'
    ]
  },
  24: {
    title: 'Interview Readiness Layer - Scan-Worthy Portfolio',
    mindset: 'A strong portfolio has to win fast before it gets read deeply. Visual order, project framing, and obvious relevance all matter in the first 30 seconds.',
    strongAnswer: [
      'A strong answer sounds like: "I designed the portfolio for skim behavior first, then added depth for serious review."',
      'Recruiters should immediately understand what kind of problems you solve and whether your work looks credible.',
      'If the portfolio requires patience before it makes sense, you are leaking opportunities early.'
    ],
    proof: [
      'Run a 30-second scan test on your portfolio with another person.',
      'Ask what they understood about your strengths, domain fit, and project quality.',
      'Remove anything that adds clutter without adding trust.'
    ]
  },
  25: {
    title: 'Interview Readiness Layer - Handling Pushback',
    mindset: 'Higher-value roles require designers who can hold a position without becoming combative. Pushback handling is a proxy for maturity, collaboration, and judgment under tension.',
    strongAnswer: [
      'A strong answer sounds like: "I first clarify the concern, then address the risk behind it, then offer the strongest evidence or compromise path."',
      'Defending your work is not about winning. It is about improving the decision quality.',
      'Interviewers listen for whether you can disagree and still remain pragmatic.'
    ],
    proof: [
      'Prepare one example of PM pushback, one engineering pushback, and one leadership pushback.',
      'Write your response in three parts: acknowledge, reframe, recommend.',
      'Practice answering a pushback question without using emotional or defensive language.'
    ]
  },
  26: {
    title: 'Interview Readiness Layer - Verbal Case Study',
    mindset: 'This is one of the highest leverage topics in the whole plan. In interviews, your verbal case study often matters more than the portfolio itself because it reveals how you think in real time.',
    strongAnswer: [
      'A strong answer sounds fluid, selective, and audience-aware. It does not dump every project detail.',
      'Your spoken story should have a clear hook, one main tension, one or two key decisions, and an outcome.',
      'If you sound like you are reading your portfolio out loud, the answer is too heavy.'
    ],
    proof: [
      'Record three versions of one project: 60 seconds, 5 minutes, and 15 minutes.',
      'In each version, keep the central problem and central decision intact.',
      'Practice pausing after key points so the interviewer can ask questions instead of feeling overwhelmed.'
    ]
  },
  27: {
    title: 'Interview Readiness Layer - Inbound Strategy',
    mindset: 'This topic matters because strong candidates do not rely only on cold applications. They create visibility loops that increase the chance of warm interest and recruiter recall.',
    strongAnswer: [
      'A strong answer sounds like: "I treat visibility as a byproduct of consistent proof, not self-promotion for its own sake."',
      'The best inbound strategy demonstrates taste, clarity, and ongoing thinking.',
      'The goal is not content volume. It is trust accumulation.'
    ],
    proof: [
      'Prepare one micro case study, one short video, and one portfolio hook line this week.',
      'Decide what signal you want to be known for: systems thinking, research depth, enterprise clarity, or storytelling.',
      'Practice explaining how public artifacts reinforce your interview credibility.'
    ]
  },
  28: {
    title: 'Interview Readiness Layer - Scan Phase Simulation',
    mindset: 'This day should train your first-impression resilience. Many strong candidates never reach deep rounds because they underperform in the earliest skim-heavy checkpoints.',
    strongAnswer: [
      'A strong answer sounds immediately relevant and easy to trust.',
      'You should know exactly what three signals a recruiter or manager should notice in the first minute.',
      'If you cannot state those three signals, your materials may be too diffuse.'
    ],
    proof: [
      'Create a first-minute checklist for your profile, portfolio home, and top project.',
      'Test whether each one communicates role fit, project credibility, and depth of thinking quickly.',
      'Cut content that slows scanning without increasing trust.'
    ]
  },
  29: {
    title: 'Interview Readiness Layer - Scrutiny Phase Simulation',
    mindset: 'This day is where senior interviewers start pressing on depth, logic, consistency, and self-awareness. You need answers that stay coherent when questioned from multiple angles.',
    strongAnswer: [
      'A strong answer sounds like: "Here is the decision, here is the evidence, here is the tradeoff, and here is what I would revisit today."',
      'Mature candidates can name what they missed, what they learned, and what they would do differently without collapsing their own credibility.',
      'If every past decision sounds perfect in hindsight, your reflection is probably shallow.'
    ],
    proof: [
      'Prepare follow-up answers for each major portfolio decision: why, why not, what changed, what failed, and what next.',
      'Write one honest weakness in a project and how you would correct it now.',
      'Practice staying specific when challenged instead of expanding into abstractions.'
    ]
  },
  30: {
    title: 'Interview Readiness Layer - Final Integration',
    mindset: 'The full 30-day plan can make you much sharper, but by itself it cannot guarantee a 25 LPA outcome. The differentiator is whether you convert these frameworks into repeatable speaking, critique, and artifact-building habits.',
    strongAnswer: [
      'A strong answer sounds like a designer who can enter a team, reduce ambiguity, make grounded decisions, and communicate them with calm confidence.',
      'At this point you should be able to tell a coherent story about how you think, not just what you learned.',
      'Your interview readiness depends on repetition: mock interviews, critique reps, portfolio tightening, and real speaking practice.'
    ],
    proof: [
      'Build a post-30-day loop: weekly case study refinement, two mock interviews, one teardown, and one public artifact.',
      'Choose the two strongest projects you will present and make sure both have scan and scrutiny versions.',
      'Write a one-page personal operating statement: how you approach problems, evidence, tradeoffs, and collaboration.'
    ]
  }
};

function createList(items) {
  return items.map(item => `<li>${item}</li>`).join('');
}

function renderStudyEnhancementSection(section) {
  const paragraphs = (section.paragraphs || [])
    .map(text => `<p>${text}</p>`)
    .join('');

  const bullets = section.bullets?.length
    ? `<ul>${createList(section.bullets)}</ul>`
    : '';

  return `
    <div class="study-enhancement-section">
      <h4>${section.heading}</h4>
      ${paragraphs}
      ${bullets}
    </div>
  `;
}

const StudyEnhancements = {
  init() {
    if (!/^week[1-4]\.html$/.test(window.location.pathname.split('/').pop() || '')) return;

    document.querySelectorAll('.accordion-item[data-day], article[data-day]').forEach(section => {
      const day = Number(section.dataset.day);
      const content = EXTENDED_STUDY_CONTENT[day];
      if (!content) return;

      const target = section.querySelector('.block-study .study-content-wrapper, .study-block .study-content');
      if (!target || target.querySelector('.study-enhancement')) return;

      const node = document.createElement('section');
      node.className = 'study-enhancement';
      node.innerHTML = `
        <hr>
        <div class="study-enhancement-card">
          <p class="study-enhancement-kicker">Extended study guide</p>
          <h3>${content.title}</h3>
          ${content.sections.map(renderStudyEnhancementSection).join('')}
        </div>
      `;
      target.appendChild(node);
    });
  },
};

export default StudyEnhancements;
