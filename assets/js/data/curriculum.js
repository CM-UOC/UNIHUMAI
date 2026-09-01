/* ============================================================
   curriculum.js — one hub, seven parts, twenty-nine lessons
   ============================================================ */
import c1 from './concepts-1.js';
import c2 from './concepts-2.js';
import c3 from './concepts-3.js';
import c4 from './concepts-4.js';
import c5 from './concepts-5.js';
import c6 from './concepts-6.js';
import { SCENARIOS } from './scenarios.js';

export const PARTS = [
  { id:'p0', n:'0', title:'Orientation',
    blurb:'Start here: the job you are applying for and how your background lines up against it, the business you would be joining, and a full list of everything you can honestly say about yourself.',
    lessons:['ref-role','ref-business','ref-evidence'], kind:'reference' },
  { id:'p1', n:'I',   title:'The ground',
    blurb:'What you are really deciding: the direction, the problem hiding under the request, the promise you make, and the full path from idea to retirement.',
    lessons:['strategy','problem','valueprop','lifecycle'] },
  { id:'p2', n:'II',  title:'Evidence',
    blurb:'How to find out what is true before you commit: in what order, at what cost, and how to know when you have learned enough.',
    lessons:['discovery','research','market','experimentation'] },
  { id:'p3', n:'III', title:'Choice',
    blurb:'Turning evidence into an order of work, a plan you can share without it becoming a promise, and requirements a team can actually build from.',
    lessons:['prioritization','roadmap','backlog','requirements'] },
  { id:'p4', n:'IV',  title:'Delivery',
    blurb:'Work rhythm, the launch nobody wants to delay, the dependencies you do not control, and what it takes to keep a live product running.',
    lessons:['agile','delivery','risk','serviceops'] },
  { id:'p5', n:'V',   title:'Proof',
    blurb:'What to measure, what a number cannot prove, and the specific ways a data product fails while every dashboard still looks fine.',
    lessons:['analytics','dataquality','dataproduct','compliance'] },
  { id:'p6', n:'VI',  title:'People',
    blurb:'Getting decisions made, and keeping them made, in a company where almost no one reports to you and two parent companies disagree.',
    lessons:['orgmap','stakeholders','crossfunctional','leadership','writing'] },
  { id:'p7', n:'VII', title:'Market',
    blurb:'How the product reaches a buyer, what they pay for and why, what changes when a partner is involved, and how to turn down €400,000 without damage.',
    lessons:['gtm','commercial','partners','negotiation'] }
];

/* Three orientation chapters. They carry no scenario — they are the
   reference layer the case lessons draw on. */
const REFERENCE = [
  { id:'ref-role',     kind:'reference', view:'role',
    title:'The role, and where you actually fit',
    oneLine:'Every line of the job posting broken down and matched against what your CV and portfolio actually prove, with your gaps ranked honestly.',
    minutes:18 },
  { id:'ref-business', kind:'reference', view:'business',
    title:'The business, the market and the rules',
    oneLine:'What is publicly known about GIS:Hub and the Volkswagen data business, what that means for a product manager, and what you should ask instead of guessing.',
    minutes:14 },
  { id:'ref-evidence', kind:'reference', view:'evidence',
    title:'Your record, inventoried',
    oneLine:'Everything your CV and portfolio actually say, quoted and labeled. Every answer on this site is built from this and nothing else.',
    minutes:12 }
];

const ALL = [...REFERENCE, ...c1, ...c2, ...c3, ...c4, ...c5, ...c6];
const BY_ID = Object.fromEntries(ALL.map(c => [c.id, c]));

/* A lesson = concept content + its scenario, in curriculum order */
export const LESSONS = PARTS.flatMap((part, pi) =>
  part.lessons.map((id, li) => {
    const c = BY_ID[id];
    if (!c) throw new Error('Missing concept: ' + id);
    return { ...c, part: part.id, partN: part.n, partTitle: part.title, scenario: SCENARIOS[id] || null };
  })
).map((l, i) => ({ ...l, n: i + 1 }));

export const LESSON_BY_ID = Object.fromEntries(LESSONS.map(l => [l.id, l]));
export const lessonsIn = pid => LESSONS.filter(l => l.part === pid);
export const TOTAL_MINUTES = LESSONS.reduce((s, l) => s + (l.minutes || 10), 0);
