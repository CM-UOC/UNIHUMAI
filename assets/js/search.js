/* search.js — a flat index across every content type */
import { CONCEPTS } from './data/concepts.js';
import { QUESTIONS, CATEGORIES } from './data/questions.js';
import { GLOSSARY } from './data/glossary.js';
import { REQUIREMENTS, GAPS } from './data/role.js';
import { FUNCTIONS } from './data/org.js';
import { SIMULATIONS, PRIORITY_DRILLS, FRAMEWORKS } from './data/drills.js';
import { EVIDENCE, ROLE_LABEL } from './data/profile.js';

export function buildSearchIndex() {
  const idx = [];

  CONCEPTS.forEach(c => idx.push({
    kind: 'Concept', title: c.title, hint: c.oneLine, route: 'study/' + c.id,
    body: [c.oneLine, c.definition, c.why, c.when, c.example.body,
           (c.tools || []).map(t => t.name).join(' '),
           (c.glossary || []).join(' ')].join(' ').toLowerCase()
  }));

  QUESTIONS.forEach(q => {
    const cat = CATEGORIES.find(c => c.id === q.cat);
    idx.push({
      kind: 'Question', title: q.q, hint: cat ? cat.label : '', route: 'question/' + q.id,
      body: [q.q, q.assess, q.example, (q.followups || []).join(' ')].join(' ').toLowerCase()
    });
  });

  GLOSSARY.forEach(g => idx.push({
    kind: 'Term', title: g.term, hint: g.cat, route: 'glossary?t=' + g.id,
    body: (g.term + ' ' + g.def + ' ' + g.cat).toLowerCase()
  }));

  REQUIREMENTS.forEach(r => idx.push({
    kind: 'Requirement', title: r.title, hint: r.area, route: 'rolefit?r=' + r.id,
    body: [r.title, r.jd, r.reading, r.strength, r.gap, r.action].join(' ').toLowerCase()
  }));

  GAPS.forEach(g => idx.push({
    kind: 'Gap', title: g.title, hint: g.severity + ' priority', route: 'rolefit?g=' + g.id,
    body: [g.title, g.why, (g.close || []).join(' ')].join(' ').toLowerCase()
  }));

  FUNCTIONS.forEach(f => idx.push({
    kind: 'Function', title: f.name, hint: 'How product works with them', route: 'orgmap?n=' + f.id,
    body: [f.name, f.role, f.wants, f.tension, f.withPM || '', f.conflict || ''].join(' ').toLowerCase()
  }));

  SIMULATIONS.forEach(s => idx.push({
    kind: 'Simulation', title: s.title, hint: s.setting.slice(0, 70) + '…', route: 'practice/sim?s=' + s.id,
    body: [s.title, s.setting, s.debrief].join(' ').toLowerCase()
  }));

  PRIORITY_DRILLS.forEach(d => idx.push({
    kind: 'Drill', title: d.title, hint: d.brief.slice(0, 70) + '…', route: 'practice/priority?d=' + d.id,
    body: [d.title, d.brief, d.items.map(i => i.label).join(' ')].join(' ').toLowerCase()
  }));

  FRAMEWORKS.forEach(f => idx.push({
    kind: 'Framework', title: f.name, hint: f.use, route: 'interview?f=' + f.id,
    body: [f.name, f.use, f.steps.join(' '), f.caution].join(' ').toLowerCase()
  }));

  EVIDENCE.forEach(e => idx.push({
    kind: 'Your evidence', title: e.claim.slice(0, 80) + (e.claim.length > 80 ? '…' : ''),
    hint: ROLE_LABEL[e.role] || '', route: 'notebook?e=' + e.id,
    body: [e.claim, e.quote, e.tags.join(' ')].join(' ').toLowerCase()
  }));

  return idx;
}
