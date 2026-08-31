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
    blurb:'Before the craft: the role you are applying for and how your own record maps onto it, the business you would be joining, and an inventory of everything you can truthfully say about yourself.',
    lessons:['ref-role','ref-business','ref-evidence'], kind:'reference' },
  { id:'p1', n:'I',   title:'The ground',
    blurb:'What you are actually deciding: the direction, the problem underneath the request, the promise you make, and the whole arc from idea to withdrawal.',
    lessons:['strategy','problem','valueprop','lifecycle'] },
  { id:'p2', n:'II',  title:'Evidence',
    blurb:'How to find out what is true before you commit — in what order, at what cost, and how to know when you have found out enough.',
    lessons:['discovery','research','market','experimentation'] },
  { id:'p3', n:'III', title:'Choice',
    blurb:'Turning evidence into a sequence, a plan communicated without becoming a promise, and requirements a team can build against.',
    lessons:['prioritisation','roadmap','backlog','requirements'] },
  { id:'p4', n:'IV',  title:'Delivery',
    blurb:'Cadence, the go-live nobody wants to hold, the dependencies you do not control, and the operating model that keeps a live product alive.',
    lessons:['agile','delivery','risk','serviceops'] },
  { id:'p5', n:'V',   title:'Proof',
    blurb:'What to measure, what a measure cannot prove, and the specific ways a data product fails while every dashboard stays green.',
    lessons:['analytics','dataquality','dataproduct','compliance'] },
  { id:'p6', n:'VI',  title:'People',
    blurb:'Getting decisions made and held in an organisation where almost nothing reports to you — and where two parent companies disagree.',
    lessons:['orgmap','stakeholders','crossfunctional','leadership','writing'] },
  { id:'p7', n:'VII', title:'Market',
    blurb:'How it reaches a buyer, what they pay for and why that unit, what a partner changes, and how to decline four hundred thousand euros well.',
    lessons:['gtm','commercial','partners','negotiation'] }
];

/* Three orientation chapters. They carry no scenario — they are the
   reference layer the case lessons draw on. */
const REFERENCE = [
  { id:'ref-role',     kind:'reference', view:'role',
    title:'The role, and where you actually fit',
    oneLine:'Every line of the advertisement decomposed, mapped to what your CV and portfolio genuinely evidence, with the gaps ranked honestly.',
    minutes:18 },
  { id:'ref-business', kind:'reference', view:'business',
    title:'The business, the market and the rules',
    oneLine:'What is publicly known about GIS:Hub and the Group data business, what follows from it for a product manager, and what you must ask rather than assume.',
    minutes:14 },
  { id:'ref-evidence', kind:'reference', view:'evidence',
    title:'Your record, inventoried',
    oneLine:'Everything your CV and portfolio actually say, quoted and tagged — the only material any answer on this site is built from.',
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
