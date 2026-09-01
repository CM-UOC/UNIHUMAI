/* interview.js — every question, already answered. Nothing to fill in. */
import { el, $, $$, icon, rich, rx, ev, clear, toast } from '../ui.js';
import { QUESTIONS, CATEGORIES, questionsIn, LIKELIHOOD } from '../data/questions.js';
import { FRAMEWORKS } from '../data/frameworks.js';
import { EVIDENCE_BY_ID, ROLE_LABEL } from '../data/profile.js';
import { REQUIREMENTS } from '../data/role.js';
import { LESSON_BY_ID } from '../data/curriculum.js';

export function renderInterview(main, { query }) {
  const focus = query && query.get('q');
  const critical = QUESTIONS.filter(q => q.likely === 'certain' || q.likely === 'near-certain').length;

  main.appendChild(el('section', { class: 'hero', style: { paddingBottom: '1.6rem' } },
    el('div', { class: 'hero__glow' }),
    el('div', { class: 'wrapx', style: { position: 'relative' } },
      el('div', { class: 'slug' }, QUESTIONS.length + ' questions · ' + CATEGORIES.length + ' categories · every one answered'),
      el('h1', { class: 'd-lg anim-rise', style: { margin: '1rem 0 1.2rem', maxWidth: '16ch' } },
        'What they will ask, and what to say.'),
      el('p', { class: 'lead read anim-rise', style: { animationDelay: '.07s' },
        html: rich('Every answer is written out in full and built **only** from what your CV and portfolio actually say. Read them, then say them your own way — a memorized answer is audible, and the follow-up will find the gap. These are likely questions, not guaranteed ones.') }),
      el('div', { class: 'wrap anim-rise', style: { marginTop: '1.6rem', animationDelay: '.13s' } },
        el('span', { class: 'tag tag--rose tag--dot' }, critical + ' very likely'),
        el('span', { class: 'tag tag--line' }, 'Answers grounded in your materials'),
        el('button', { class: 'btn btn--sm', onClick: () => window.print() }, icon('down', 13), 'Print all')))));

  /* filters */
  const state = { cat: 'all', q: '' };
  const list = el('div', { style: { paddingBottom: '5rem' } });

  const pills = el('div', { class: 'wrap', style: { marginBottom: '.8rem' } },
    el('button', { class: 'tag', dataset: { c: 'all' } }, 'All ', el('span', { class: 'dim2' }, String(QUESTIONS.length))),
    CATEGORIES.map(c => el('button', { class: 'tag', dataset: { c: c.id } },
      c.label, ' ', el('span', { class: 'dim2' }, String(questionsIn(c.id).length)))));

  const search = el('input', { class: 'input', type: 'search', placeholder: 'Search questions and answers…', style: { maxWidth: '340px' } });

  function paint() {
    $$('button', pills).forEach(b => {
      const on = b.dataset.c === state.cat;
      b.className = 'tag ' + (on ? 'tag--amber' : 'tag--line');
    });
    let hits = QUESTIONS.filter(q => state.cat === 'all' || q.cat === state.cat);
    if (state.q) hits = hits.filter(q => (q.q + ' ' + q.example + ' ' + q.assess).toLowerCase().includes(state.q));
    clear(list);
    if (state.cat !== 'all') {
      const c = CATEGORIES.find(x => x.id === state.cat);
      if (c) list.appendChild(el('p', { class: 'dim read', style: { margin: '.4rem 0 1.4rem' } }, c.blurb));
    }
    if (!hits.length) { list.appendChild(el('div', { class: 'empty' }, 'Nothing matched.')); return; }
    hits.forEach(q => list.appendChild(qRow(q, focus === q.id)));
  }
  pills.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { state.cat = b.dataset.c; paint(); } });
  search.addEventListener('input', () => { state.q = search.value.trim().toLowerCase(); paint(); });

  main.appendChild(el('div', { class: 'wrapx' },
    el('div', { class: 'panel panel--sunk', style: { marginBottom: '2rem' } }, pills, search),
    list,
    el('div', { class: 'wrapn', style: { padding: '0 0 4rem' } }, frameworksPanel())));

  paint();
  if (focus) setTimeout(() => {
    const n = document.getElementById('q-' + focus);
    if (n) n.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
}

function qRow(q, open) {
  const cat = CATEGORIES.find(c => c.id === q.cat);
  const lk = LIKELIHOOD[q.likely] || LIKELIHOOD.possible;
  const tone = { 'certain':'tag--rose', 'near-certain':'tag--rose', 'likely':'tag--amber', 'possible':'tag--line' }[q.likely] || 'tag--line';

  const body = el('div', { class: 'qrow__body', hidden: !open });
  let built = false;
  const build = () => {
    if (built) return; built = true;
    body.append(
      /* the answer, first and largest */
      el('div', { class: 'panel', style: { borderColor: 'color-mix(in srgb, var(--amber) 30%, transparent)', marginBottom: '1.1rem' } },
        el('div', { class: 'wrap', style: { marginBottom: '.9rem' } },
          el('span', { class: 'slug' }, 'Your answer'), ev('cv'), ev('pf')),
        el('div', { class: 'answer', html: rich(q.example) }),
        el('div', { class: 'wrap', style: { marginTop: '1.1rem' } },
          el('button', { class: 'btn btn--sm btn--ghost', onClick: e => {
            navigator.clipboard?.writeText(q.example).then(() => toast('Answer copied')).catch(() => toast('Select and copy'));
          }}, 'Copy'),
          el('span', { class: 'xs dim2' }, '≈' + Math.round(q.example.split(/\s+/).length / 2.4) + 's spoken'))),

      el('div', { class: 'g2', style: { marginBottom: '1.1rem' } },
        el('div', { class: 'cardish cardish--ice' },
          el('div', { class: 'cardish__t' }, icon('target', 13), 'What they are testing'),
          el('p', { class: 'sm', html: rich(q.assess) })),
        el('div', { class: 'cardish cardish--note' },
          el('div', { class: 'cardish__t' }, icon('film', 13), 'The shape · ' + q.structure.name),
          el('ol', { class: 'sm', style: { paddingLeft: '1.1em' } }, q.structure.steps.map(s => el('li', { html: rich(s) }))),
          el('p', { class: 'xs dim2', style: { marginTop: '.6rem' }, html: rich(q.structure.when) }))),

      el('div', { class: 'g2', style: { marginBottom: '1.1rem' } },
        (q.alternatives || []).length ? el('div', { class: 'cardish cardish--note' },
          el('div', { class: 'cardish__t' }, 'If the room is different'),
          el('ul', { class: 'sm', style: { paddingLeft: '1.1em' } }, q.alternatives.map(a => el('li', { html: rich(a) })))) : null,
        (q.followups || []).length ? el('div', { class: 'cardish cardish--note' },
          el('div', { class: 'cardish__t' }, 'What comes next'),
          el('ul', { class: 'sm', style: { paddingLeft: '1.1em' } }, q.followups.map(f => el('li', { html: rich(f) })))) : null),

      el('div', { class: 'cardish cardish--bad', style: { marginBottom: '1.1rem' } },
        el('div', { class: 'cardish__t' }, icon('x', 13), 'What a weak answer sounds like'),
        el('ul', { class: 'sm', style: { paddingLeft: '1.1em' } }, q.weak.map(w => el('li', { html: rich(w) })))),

      el('div', { class: 'cardish cardish--good', style: { marginBottom: '1.1rem' } },
        el('div', { class: 'cardish__t' }, icon('check', 13), 'A strong answer does all of this'),
        el('ul', { class: 'sm', style: { paddingLeft: '1.1em' } }, q.rubric.map(r => el('li', { html: rich(r) })))),

      (q.evidence || []).length ? el('div', { class: 'panel panel--sunk', style: { marginBottom: '1.1rem' } },
        el('div', { class: 'slug', style: { marginBottom: '.7rem' } }, 'Where this answer comes from'),
        el('div', { class: 'stack', style: { '--gap': '.6rem' } },
          q.evidence.map(id => EVIDENCE_BY_ID[id]).filter(Boolean).map(x =>
            el('div', { class: 'src' }, '“' + x.quote + '”',
              el('span', { class: 'src__a' }, (x.src === 'cv' ? 'Your CV' : 'cmmt.me') + ' · ' + (ROLE_LABEL[x.role] || '')))))) : null,

      el('div', { class: 'wrap' },
        (q.lessons || []).map(lid => { const L = LESSON_BY_ID[lid];
          return L ? el('a', { class: 'tag tag--amber', href: '#/lesson/' + lid, style: { textDecoration: 'none' } },
            icon('book', 11), 'Chapter ' + L.n + ' · ' + L.title) : null; }),
        (q.reqs || []).map(rid => { const r = REQUIREMENTS.find(x => x.id === rid);
          return r ? el('span', { class: 'tag tag--line' }, icon('target', 11), r.area) : null; }))
    );
  };
  if (open) build();

  const plus = el('span', { class: 'qrow__x' }, icon('plus', 18));
  if (open) plus.style.transform = 'rotate(45deg)';

  const row = el('article', { class: 'qrow', id: 'q-' + q.id },
    el('button', { class: 'qrow__head', onClick: () => {
      build();
      body.hidden = !body.hidden;
      plus.style.transform = body.hidden ? '' : 'rotate(45deg)';
    }},
      el('div', {},
        el('div', { class: 'wrap', style: { marginBottom: '.45rem' } },
          el('span', { class: 'tag ' + tone + ' tag--dot' }, lk.label),
          el('span', { class: 'tag tag--line' }, cat ? cat.label : '')),
        el('div', { class: 'qrow__q' }, q.q)),
      plus),
    body);
  return row;
}

function frameworksPanel() {
  const box = el('div', { hidden: true, class: 'stack', style: { marginTop: '1.2rem' } },
    el('div', { class: 'cardish cardish--warn' },
      el('div', { class: 'cardish__t' }, icon('alert', 13), 'Use these sparingly'),
      'A framework is scaffolding for thinking, not a template to recite. Forcing every answer into the same shape is itself a weak signal — and the last entry here is a real option.'),
    FRAMEWORKS.map(f => el('div', { class: 'panel' },
      el('div', { class: 'spread', style: { marginBottom: '.4rem', flexWrap: 'wrap', gap: '.5rem' } },
        el('h3', { class: 'h-md' }, f.name),
        el('span', { class: 'tag tag--line' }, f.use)),
      el('ol', { class: 'sm dim', style: { paddingLeft: '1.1em' } }, f.steps.map(x => el('li', { html: rich(x) }))),
      el('p', { class: 'xs dim2', style: { marginTop: '.5rem' } }, el('strong', {}, 'Watch out: '), rx(f.caution)))));

  const btn = el('button', { class: 'btn', onClick: () => {
    box.hidden = !box.hidden;
    btn.lastChild.textContent = box.hidden ? 'Show answer frameworks' : 'Hide answer frameworks';
  }}, icon('film', 15), el('span', {}, 'Show answer frameworks'));

  return el('div', { style: { marginTop: '2.5rem' } },
    el('hr', { class: 'hr' }), btn, box);
}
