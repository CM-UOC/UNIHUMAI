/* ============================================================
   progress.js — mastery ladder, readiness score, due work
   ============================================================ */

import { store } from './store.js';
import { CONCEPTS } from './data/concepts.js';
import { QUESTIONS } from './data/questions.js';
import { CARDS } from './data/drills.js';
import { REQUIREMENTS, GAPS } from './data/role.js';
import { PLAN } from './data/plan.js';

/* Four rungs. Each requires the one below it. */
export const LADDER = [
  { n: 0, key: 'new',       label: 'Not started',  hint: 'You have not opened this yet.' },
  { n: 1, key: 'read',      label: 'Recognise',    hint: 'You have worked through the session.' },
  { n: 2, key: 'checked',   label: 'Explain',      hint: 'You passed the knowledge check.' },
  { n: 3, key: 'ownwords',  label: 'Apply',        hint: 'You wrote it in your own words and connected it to your work.' },
  { n: 4, key: 'taught',    label: 'Teach',        hint: 'You completed the teach-back covering the key ideas.' }
];

export function conceptLevel(id) {
  const e = store.entry('concepts', id, {});
  if (e.taught) return 4;
  if (e.ownWords && e.ownWords.trim().length > 60) return 3;
  if (e.checkPassed) return 2;
  if (e.read) return 1;
  return 0;
}

export function conceptStats() {
  const levels = CONCEPTS.map(c => conceptLevel(c.id));
  const total = CONCEPTS.length;
  return {
    total,
    started:  levels.filter(l => l >= 1).length,
    explained:levels.filter(l => l >= 2).length,
    applied:  levels.filter(l => l >= 3).length,
    taught:   levels.filter(l => l >= 4).length,
    sum: levels.reduce((a, b) => a + b, 0),
    max: total * 4,
    pct: levels.reduce((a, b) => a + b, 0) / (total * 4)
  };
}

export function answerStats() {
  const drafted = QUESTIONS.filter(q => {
    const e = store.entry('questions', q.id, {});
    return e.answer && e.answer.trim().length > 80;
  });
  const critical = QUESTIONS.filter(q => q.likely === 'near-certain' || q.likely === 'certain');
  const criticalDone = critical.filter(q => {
    const e = store.entry('questions', q.id, {});
    return e.answer && e.answer.trim().length > 80;
  });
  return {
    total: QUESTIONS.length,
    drafted: drafted.length,
    critical: critical.length,
    criticalDone: criticalDone.length,
    pct: drafted.length / QUESTIONS.length
  };
}

export function cardStats() {
  const ids = CARDS.map(c => c.id);
  const due = store.dueCards(ids);
  const seen = ids.filter(id => store.entry('cards', id, {}).reps > 0);
  const strong = ids.filter(id => (store.entry('cards', id, {}).interval || 0) >= 5);
  return { total: ids.length, due: due.length, dueIds: due, seen: seen.length, strong: strong.length,
           pct: strong.length / ids.length };
}

export function roleFitStats() {
  const rated = REQUIREMENTS.filter(r => typeof store.entry('roleFit', r.id, {}).confidence === 'number');
  const weighted = REQUIREMENTS.reduce((acc, r) => {
    const c = store.entry('roleFit', r.id, {}).confidence;
    return acc + (typeof c === 'number' ? c * r.weight : 0);
  }, 0);
  const maxW = REQUIREMENTS.reduce((a, r) => a + r.weight * 4, 0);
  return { total: REQUIREMENTS.length, rated: rated.length, pct: weighted / maxW };
}

export function planStats() {
  const all = PLAN.flatMap(w => w.tasks.map(t => t.id));
  const done = store.get().plan.done.filter(id => all.includes(id));
  return { total: all.length, done: done.length, pct: done.length / all.length };
}

export function mockStats() {
  const sessions = store.get().mock || [];
  const answered = sessions.reduce((a, s) => a + (s.items || []).length, 0);
  return { sessions: sessions.length, answered, pct: Math.min(1, sessions.length / 6) };
}

/* Composite readiness — deliberately weighted towards doing, not reading. */
export const READINESS_PARTS = [
  { key:'knowledge', label:'Knowledge',   weight:0.28, get:() => conceptStats().pct,  route:'knowledge', hint:'Progress through the study path, weighted by mastery level.' },
  { key:'answers',   label:'Answers',     weight:0.26, get:() => answerStats().pct,   route:'interview', hint:'Interview answers you have drafted in your own words.' },
  { key:'recall',    label:'Recall',      weight:0.16, get:() => cardStats().pct,     route:'practice/cards', hint:'Flashcards you can retrieve reliably after spacing.' },
  { key:'rolefit',   label:'Role fit',    weight:0.14, get:() => roleFitStats().pct,  route:'rolefit', hint:'Your self-rated confidence against each requirement, weighted by its importance.' },
  { key:'rehearsal', label:'Rehearsal',   weight:0.16, get:() => mockStats().pct,     route:'mock', hint:'Mock interview sessions completed. Six is a reasonable target.' }
];

export function readiness() {
  const parts = READINESS_PARTS.map(p => ({ ...p, value: Math.max(0, Math.min(1, p.get() || 0)) }));
  const score = parts.reduce((a, p) => a + p.value * p.weight, 0);
  return { score, parts };
}

export function readinessLabel(score) {
  if (score < 0.15) return { label: 'Just starting', tone: 'chip--outline' };
  if (score < 0.35) return { label: 'Building foundations', tone: 'chip--amber' };
  if (score < 0.55) return { label: 'Getting there', tone: 'chip--amber' };
  if (score < 0.75) return { label: 'Interview-ready in parts', tone: 'chip--accent' };
  if (score < 0.9)  return { label: 'Strong', tone: 'chip--teal' };
  return { label: 'Well prepared', tone: 'chip--teal' };
}

/* What to do next — the dashboard's single most useful element. */
export function nextActions(limit = 4) {
  const out = [];
  const cs = conceptStats(), as = answerStats(), cds = cardStats();

  // 1. critical gaps first
  const critical = GAPS.filter(g => g.severity === 'critical');
  for (const g of critical) {
    const unfinished = (g.concepts || []).filter(cid => conceptLevel(cid) < 2);
    if (unfinished.length) {
      out.push({
        why: 'Critical gap',
        title: 'Study “' + (CONCEPTS.find(c => c.id === unfinished[0]) || {}).title + '”',
        detail: g.title + ' — ' + g.why.split('.')[0] + '.',
        route: 'study/' + unfinished[0],
        tone: 'rose'
      });
      break;
    }
  }

  // 2. due cards
  if (cds.due > 0 && cds.seen > 0) {
    out.push({ why: 'Spaced review', title: cds.due + ' card' + (cds.due === 1 ? '' : 's') + ' due',
      detail: 'Retrieval is where memory is actually built. This takes a few minutes.',
      route: 'practice/cards', tone: 'accent' });
  }

  // 3. undrafted near-certain answers
  const missing = QUESTIONS.filter(q => (q.likely === 'near-certain' || q.likely === 'certain') &&
    !(store.entry('questions', q.id, {}).answer || '').trim());
  if (missing.length) {
    out.push({ why: 'Very likely question', title: 'Draft: “' + missing[0].q + '”',
      detail: missing[0].assess.split('.')[0] + '.', route: 'question/' + missing[0].id, tone: 'amber' });
  }

  // 4. next unstudied concept in path order
  const nextConcept = CONCEPTS.find(c => conceptLevel(c.id) === 0);
  if (nextConcept) {
    out.push({ why: 'Study path', title: 'Session: ' + nextConcept.title,
      detail: nextConcept.oneLine, route: 'study/' + nextConcept.id, tone: 'teal' });
  }

  // 5. concepts read but never checked
  const unchecked = CONCEPTS.find(c => conceptLevel(c.id) === 1);
  if (unchecked) {
    out.push({ why: 'Unfinished', title: 'Finish “' + unchecked.title + '”',
      detail: 'You read it but did not complete the check or the teach-back.',
      route: 'study/' + unchecked.id, tone: 'accent' });
  }

  // 6. rehearsal
  if (as.drafted >= 4 && (store.get().mock || []).length < 3) {
    out.push({ why: 'Rehearsal', title: 'Run a mock interview',
      detail: 'Written answers are not spoken answers. Six sessions is a reasonable target.',
      route: 'mock', tone: 'accent' });
  }

  return out.slice(0, limit);
}

export function streak() {
  const s = store.get();
  const days = new Set();
  const stamp = ts => new Date(ts).toISOString().slice(0, 10);
  Object.values(s.concepts).forEach(c => c.updatedAt && days.add(stamp(c.updatedAt)));
  Object.values(s.questions).forEach(q => q.updatedAt && days.add(stamp(q.updatedAt)));
  Object.values(s.cards).forEach(c => c.lastAt && days.add(stamp(c.lastAt)));
  (s.mock || []).forEach(m => m.at && days.add(stamp(m.at)));
  let n = 0;
  const d = new Date();
  for (;;) {
    if (days.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
    else if (n === 0 && days.size) {
      d.setDate(d.getDate() - 1);
      if (days.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); continue; }
      break;
    } else break;
  }
  return { days: n, active: days.size };
}
