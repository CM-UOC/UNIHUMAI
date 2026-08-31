/* ============================================================
   concepts.js — the curriculum index
   ============================================================ */
import c1 from './concepts-1.js';
import c2 from './concepts-2.js';
import c3 from './concepts-3.js';
import c4 from './concepts-4.js';
import c5 from './concepts-5.js';

export const MODULES = [
  { id: 'm1', n: 1, title: 'Foundations',            blurb: 'What a product manager is actually deciding: direction, the problem, the promise, and the arc from idea to withdrawal.' },
  { id: 'm2', n: 2, title: 'Discovery and evidence', blurb: 'How to find out what is true before you commit — and how to know when you have found out enough.' },
  { id: 'm3', n: 3, title: 'Deciding and planning',  blurb: 'Turning evidence into a sequence, a plan, and requirements a team can build against.' },
  { id: 'm4', n: 4, title: 'Building and delivering',blurb: 'Cadence, go-live readiness, and the risks and dependencies that decide whether a launch holds.' },
  { id: 'm5', n: 5, title: 'Measuring and operating',blurb: 'What to measure, what a measure cannot prove, and the operating model a live product needs.' },
  { id: 'm6', n: 6, title: 'People and influence',   blurb: 'Getting decisions made and held, in an organisation where almost nothing reports to you.' },
  { id: 'm7', n: 7, title: 'Commercial and domain',  blurb: 'Reaching the market, pricing what you sell, and the specifics of vehicle data and its governance.' },
  { id: 'm8', n: 8, title: 'Chosen for you',         blurb: 'Four areas selected for your particular profile and this particular employer — not part of a standard PM syllabus.' }
];

export const CONCEPTS = [...c1, ...c2, ...c3, ...c4, ...c5].sort((a, b) => a.order - b.order);
export const CONCEPT_BY_ID = Object.fromEntries(CONCEPTS.map(c => [c.id, c]));
export const conceptsIn = mid => CONCEPTS.filter(c => c.module === mid);
export const TOTAL_MINUTES = CONCEPTS.reduce((s, c) => s + (c.minutes || 10), 0);
