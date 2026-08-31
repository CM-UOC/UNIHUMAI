import { el, $, $$, icon, pageHead, bar, rich, rx, tabs, clear, bookmarkBtn } from '../ui.js';
import { store } from '../store.js';
import { CONCEPTS, MODULES, conceptsIn, CONCEPT_BY_ID, TOTAL_MINUTES } from '../data/concepts.js';
import { conceptLevel, LADDER, conceptStats } from '../progress.js';

const LEVEL_TONE = ['', 'chip--outline', 'chip--accent', 'chip--violet', 'chip--teal'];

export function renderKnowledge(page, { go, query }) {
  const cs = conceptStats();
  page.appendChild(pageHead({
    eyebrow: 'Learning hub',
    title: 'Study path',
    lead: `Twenty-eight sessions across eight modules, sequenced so each builds on the last. Every session ends with a check, a prompt to write the idea in your own words, and a teach-back — because you will be asked to explain these ideas out loud, not to recognise them. Roughly ${Math.round(TOTAL_MINUTES / 60)} hours in total.`,
    actions: [
      el('button', { class: 'btn btn--primary', onClick: () => {
        const next = CONCEPTS.find(c => conceptLevel(c.id) < 2) || CONCEPTS[0];
        go('study/' + next.id);
      }}, icon('arrow', 15), cs.started ? 'Continue' : 'Start the path')
    ],
    meta: [
      el('span', { class: 'chip chip--outline' }, `${cs.started}/${cs.total} opened`),
      el('span', { class: 'chip chip--accent' }, `${cs.explained} explained`),
      el('span', { class: 'chip chip--violet' }, `${cs.applied} applied`),
      el('span', { class: 'chip chip--teal' }, `${cs.taught} taught back`)
    ]
  }));

  page.appendChild(el('div', { class: 'card card--tint', style: { marginBottom: '1.2rem' } },
    el('div', { class: 'spread', style: { marginBottom: '.5rem', alignItems: 'flex-end' } },
      el('div', {},
        el('div', { class: 't-eyebrow' }, 'Mastery ladder'),
        el('p', { class: 't-sm muted', style: { marginTop: '.2rem', maxWidth: '58ch' } },
          'A session is not finished when you have read it. Each rung has to be earned, and the last two are the ones that make an idea usable in an interview.')),
      el('span', { class: 't-xs muted2' }, `${cs.sum} / ${cs.max} points`)),
    bar(cs.pct, cs.pct > .6 ? 'bar--teal' : ''),
    el('div', { class: 'row-wrap', style: { marginTop: '.6rem' } },
      LADDER.slice(1).map(l => el('span', { class: 'chip ' + LEVEL_TONE[l.n], title: l.hint }, `${l.n}. ${l.label}`)))));

  page.appendChild(tabs([
    { label: 'Path',  render: () => pathView() },
    { label: 'Atlas', render: () => atlasView(go) },
    { label: 'Index', render: () => indexView() }
  ], { initial: query && query.get('v') === 'atlas' ? 1 : 0 }));
}

/* ---------------- path ---------------- */
function pathView() {
  const wrap = el('div', { class: 'stack', style: { '--gap': '1.4rem' } });
  MODULES.forEach(m => {
    const items = conceptsIn(m.id);
    const done = items.filter(c => conceptLevel(c.id) >= 2).length;
    const mins = items.reduce((a, c) => a + c.minutes, 0);
    wrap.appendChild(el('section', {},
      el('div', { class: 'spread', style: { marginBottom: '.55rem', alignItems: 'flex-end' } },
        el('div', { style: { maxWidth: '62ch' } },
          el('div', { class: 'row-wrap', style: { marginBottom: '.15rem' } },
            el('span', { class: 't-eyebrow' }, `Module ${m.n}`),
            m.id === 'm8' ? el('span', { class: 'chip chip--violet' }, 'Chosen for your profile') : null),
          el('h3', { class: 't-h2' }, m.title),
          el('p', { class: 't-sm muted', style: { marginTop: '.2rem' } }, m.blurb)),
        el('div', { style: { flex: 'none', textAlign: 'right' } },
          el('div', { class: 't-xs muted2' }, `${done}/${items.length} · ~${mins} min`),
          el('div', { style: { width: '84px', marginTop: '.3rem' } }, bar(done / items.length, done === items.length ? 'bar--teal' : '')))),
      el('div', { class: 'card card--flush' },
        items.map((c, i) => sessionRow(c, i)))));
  });
  return wrap;
}

function sessionRow(c, i) {
  const lvl = conceptLevel(c.id);
  return el('a', {
    href: '#/study/' + c.id,
    style: { display: 'block', padding: '.8rem 1rem', textDecoration: 'none', color: 'inherit',
             borderTop: i ? '1px solid var(--line)' : 'none' }
  },
    el('div', { class: 'spread', style: { alignItems: 'flex-start', gap: '.9rem' } },
      el('div', { class: 'section__n', style: { flex: 'none', marginTop: '2px',
        background: lvl >= 2 ? 'var(--teal-soft)' : 'var(--surface-3)',
        color: lvl >= 2 ? 'var(--teal)' : 'var(--ink-3)' } },
        lvl >= 2 ? icon('check', 12, 2.6) : String(c.order)),
      el('div', { class: 'grow' },
        el('div', { style: { fontWeight: 570 } }, c.title),
        el('p', { class: 't-sm muted', style: { marginTop: '.1rem', maxWidth: '68ch' } }, c.oneLine),
        c.chosenBecause ? el('p', { class: 't-xs', style: { marginTop: '.35rem', color: 'var(--violet)' } },
          'Chosen for you: ' + c.chosenBecause.split('.')[0] + '.') : null),
      el('div', { class: 'row', style: { flex: 'none', gap: '.4rem' } },
        lvl > 0 ? el('span', { class: 'chip ' + LEVEL_TONE[lvl], title: LADDER[lvl].hint }, LADDER[lvl].label) : null,
        el('span', { class: 't-xs muted2', style: { fontFamily: 'var(--font-mono)' } }, c.minutes + 'm'))));
}

/* ---------------- atlas ---------------- */
function atlasView(go) {
  const W = 1000, H = 640;
  const cols = 7, pad = 70;
  const pos = {};
  CONCEPTS.forEach((c, i) => {
    const modIndex = MODULES.findIndex(m => m.id === c.module);
    const within = conceptsIn(c.module).indexOf(c);
    const n = conceptsIn(c.module).length;
    const angle = (modIndex / MODULES.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 150 + within * 62 + (n > 3 ? 0 : 20);
    pos[c.id] = {
      x: W / 2 + Math.cos(angle) * radius + (within % 2 ? 26 : -26),
      y: H / 2 + Math.sin(angle) * radius * 0.72 + (within % 2 ? -14 : 14)
    };
  });

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'A map of the twenty-eight concepts, grouped by module, with lines showing which build on which.');
  svg.style.width = '100%'; svg.style.height = 'auto'; svg.style.minWidth = '760px';

  let g = '';
  // dependency edges
  CONCEPTS.forEach(c => (c.depends || []).forEach(d => {
    if (!pos[d]) return;
    g += `<line x1="${pos[d].x}" y1="${pos[d].y}" x2="${pos[c.id].x}" y2="${pos[c.id].y}"
            stroke="var(--line-2)" stroke-width="1.2" stroke-dasharray="3 4"/>`;
  }));
  // nodes
  CONCEPTS.forEach(c => {
    const lvl = conceptLevel(c.id);
    const p = pos[c.id];
    const r = 13 + lvl * 3.2;
    const fill = ['var(--surface-3)', 'var(--slate-soft)', 'var(--accent-soft)', 'var(--violet-soft)', 'var(--teal-soft)'][lvl];
    const stroke = ['var(--line-2)', 'var(--line-strong)', 'var(--accent)', 'var(--violet)', 'var(--teal)'][lvl];
    const short = c.title.length > 26 ? c.title.slice(0, 24) + '…' : c.title;
    g += `<g class="atlas-node" data-id="${c.id}" style="cursor:pointer">
            <title>${c.title} — ${LADDER[lvl].label}</title>
            <circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
            <text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="11" font-weight="700"
                  fill="${stroke}" style="pointer-events:none">${c.order}</text>
            <text x="${p.x}" y="${p.y + r + 14}" text-anchor="middle" font-size="10.5"
                  fill="var(--ink-3)" style="pointer-events:none">${short}</text>
          </g>`;
  });
  svg.innerHTML = g;
  svg.addEventListener('click', e => {
    const node = e.target.closest('.atlas-node');
    if (node) go('study/' + node.dataset.id);
  });

  return el('div', {},
    el('p', { class: 't-sm muted measure', style: { marginBottom: '.8rem' } },
      rx('Each circle is one session, grouped by module and sized by how far up the mastery ladder you have taken it. Dotted lines show which ideas build on which — following them is another valid route through the material. Click any node to open its session.')),
    el('div', { class: 'card scroll-x', style: { padding: '.5rem' } }, svg),
    el('div', { class: 'row-wrap', style: { marginTop: '.7rem' } },
      LADDER.map(l => el('span', { class: 'chip ' + (LEVEL_TONE[l.n] || 'chip--outline'), title: l.hint }, l.label))));
}

/* ---------------- index ---------------- */
function indexView() {
  const box = el('div', {});
  const input = el('input', { class: 'input', type: 'search', placeholder: 'Filter sessions…', style: { maxWidth: '340px' } });
  const listBox = el('div', { class: 'card card--flush', style: { marginTop: '.8rem' } });
  const paint = () => {
    const q = input.value.trim().toLowerCase();
    const hits = CONCEPTS.filter(c => !q ||
      (c.title + ' ' + c.oneLine + ' ' + (c.glossary || []).join(' ')).toLowerCase().includes(q));
    clear(listBox);
    if (!hits.length) listBox.appendChild(el('div', { class: 'empty t-sm' }, 'Nothing matched.'));
    hits.forEach((c, i) => listBox.appendChild(sessionRow(c, i)));
  };
  input.addEventListener('input', paint);
  box.appendChild(input); box.appendChild(listBox); paint();
  return box;
}

/* ---------------- reference page (all sections at once) ---------------- */
export function renderConcept(page, { param, go }) {
  const c = CONCEPT_BY_ID[param];
  if (!c) { page.appendChild(el('div', { class: 'note note--bad' }, 'No such concept.')); return; }
  page.appendChild(pageHead({
    eyebrow: 'Reference',
    title: c.title,
    lead: c.oneLine,
    actions: [
      el('a', { class: 'btn btn--primary', href: '#/study/' + c.id }, icon('arrow', 15), 'Guided session'),
      bookmarkBtn('concept', c.id, c.title)
    ]
  }));
  page.appendChild(el('div', { class: 'stack' },
    block('Definition', c.definition),
    block('Why it matters', c.why),
    block('When and how it is used', c.when),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Inputs, activities, outputs, outcomes'),
      el('div', { class: 'iaoo' },
        cell('Inputs', c.inputs), cell('Activities', c.activities),
        cell('Outputs', c.outputs), cell('Outcomes', c.outcomes))),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.4rem' } }, c.example.title),
      el('p', { class: 't-sm', html: rich(c.example.body) })),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Common mistakes'),
      el('div', { class: 'stack', style: { '--gap': '.55rem' } },
        c.mistakes.map(m => el('div', {},
          el('div', { class: 't-sm', style: { fontWeight: 560 } }, '✗ ' + m.mistake),
          el('div', { class: 't-sm muted' }, '→ ' + m.instead))))),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Tools and frameworks'),
      el('table', { class: 'tbl' }, el('tbody', {},
        c.tools.map(t => el('tr', {}, el('td', { style: { fontWeight: 550, whiteSpace: 'nowrap' } }, t.name), el('td', { class: 'muted' }, t.note))))))
  ));
}

function block(title, body) {
  return el('div', { class: 'card' },
    el('h3', { class: 't-h3', style: { marginBottom: '.35rem' } }, title),
    el('p', { class: 't-sm', html: rich(body) }));
}
function cell(title, items) {
  return el('div', { class: 'iaoo__cell' }, el('h4', {}, title), el('ul', {}, items.map(i => el('li', {}, i))));
}
