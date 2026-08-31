import { el, $$, icon, pageHead, rich, rx, tabs, clear } from '../ui.js';
import { FUNCTIONS, EDGES, ALTITUDE, DECISION_RIGHTS, ORG_SHAPES } from '../data/org.js';

const KIND_TONE = {
  core:'var(--accent)', build:'var(--teal)', market:'var(--amber)',
  operate:'var(--violet)', govern:'var(--rose)', lead:'var(--ink-2)'
};
const KIND_SOFT = {
  core:'var(--accent-soft)', build:'var(--teal-soft)', market:'var(--amber-soft)',
  operate:'var(--violet-soft)', govern:'var(--rose-soft)', lead:'var(--slate-soft)'
};

export function renderOrgMap(page, { query }) {
  page.appendChild(pageHead({
    eyebrow: 'Understanding the organisation',
    title: 'How product management sits in a company',
    lead: 'Product management has responsibility without authority. Almost everything you need belongs to somebody else. This map shows who those people are, what each of them wants, where the friction reliably appears, and who actually decides what.'
  }));

  page.appendChild(tabs([
    { label: 'The map',        render: () => mapView(query) },
    { label: 'Decision rights',render: () => rightsView() },
    { label: 'Altitude',       render: () => altitudeView() },
    { label: 'Org shapes',     render: () => shapesView() }
  ]));
}

/* ---------------- interactive map ---------------- */
function mapView(query) {
  const W = 1000, H = 620;
  const detail = el('div', { class: 'card', style: { marginTop: '1rem' } });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'A map of the functions a product manager works with, arranged around product management at the centre.');
  svg.style.minWidth = '740px';

  const px = f => (f.x / 100) * W, py = f => (f.y / 100) * H;
  const byId = Object.fromEntries(FUNCTIONS.map(f => [f.id, f]));

  let g = '';
  EDGES.forEach(([a, b]) => {
    const A = byId[a], B = byId[b];
    if (!A || !B) return;
    g += `<line class="orgedge" data-a="${a}" data-b="${b}" x1="${px(A)}" y1="${py(A)}" x2="${px(B)}" y2="${py(B)}"
            stroke="var(--line-2)" stroke-width="${a === 'pm' || b === 'pm' ? 1.5 : 1}"
            ${a !== 'pm' && b !== 'pm' ? 'stroke-dasharray="4 5"' : ''}/>`;
  });
  FUNCTIONS.forEach(f => {
    const isCore = f.kind === 'core';
    const w = isCore ? 168 : 146, h = isCore ? 56 : 46;
    const x = px(f) - w / 2, y = py(f) - h / 2;
    const words = f.name.split(' ');
    let l1 = f.name, l2 = '';
    if (f.name.length > 17) {
      const mid = Math.ceil(words.length / 2);
      l1 = words.slice(0, mid).join(' '); l2 = words.slice(mid).join(' ');
    }
    g += `<g class="orgnode" data-id="${f.id}" tabindex="0" role="button" aria-label="${f.name}">
      <rect class="orgnode__box" x="${x}" y="${y}" width="${w}" height="${h}" rx="${isCore ? 14 : 11}"
        fill="${KIND_SOFT[f.kind]}" stroke="${KIND_TONE[f.kind]}" stroke-width="${isCore ? 2.2 : 1.4}"/>
      <text x="${px(f)}" y="${py(f) + (l2 ? -3 : 4) + (isCore ? 0 : 0)}" text-anchor="middle"
        font-size="${isCore ? 13.5 : 12}" font-weight="${isCore ? 700 : 600}"
        fill="${KIND_TONE[f.kind]}" style="pointer-events:none">${l1}</text>
      ${l2 ? `<text x="${px(f)}" y="${py(f) + 12}" text-anchor="middle" font-size="12" font-weight="600"
        fill="${KIND_TONE[f.kind]}" style="pointer-events:none">${l2}</text>` : ''}
    </g>`;
  });
  svg.innerHTML = g;

  const wrap = el('div', { class: 'orgmap card scroll-x', style: { padding: '.5rem' } }, svg);

  function select(id) {
    const f = byId[id];
    if (!f) return;
    wrap.dataset.dim = 'true';
    $$('.orgnode', svg).forEach(n => {
      n.dataset.active = n.dataset.id === id ? 'true' : 'false';
      const related = EDGES.some(([a, b]) =>
        (a === id && b === n.dataset.id) || (b === id && a === n.dataset.id));
      n.dataset.rel = related ? 'true' : 'false';
    });
    $$('.orgedge', svg).forEach(e => {
      e.dataset.rel = (e.dataset.a === id || e.dataset.b === id) ? 'true' : 'false';
    });
    clear(detail).appendChild(el('div', {},
      el('div', { class: 'row-wrap', style: { marginBottom: '.4rem' } },
        el('span', { class: 'chip chip--dot', style: { background: KIND_SOFT[f.kind], color: KIND_TONE[f.kind] } }, f.kind),
        el('button', { class: 'btn btn--sm btn--ghost', onClick: () => reset() }, 'Clear')),
      el('h3', { class: 't-h2', style: { marginBottom: '.5rem' } }, f.name),
      el('div', { class: 'stack', style: { '--gap': '.65rem' } },
        row('What they own', f.role),
        row('What they want', f.wants),
        row('Built-in tension', f.tension),
        f.withPM ? row('Interface with product', f.withPM) : null,
        f.conflict ? el('div', { class: 'note note--warn' },
          el('div', { class: 'note__title' }, icon('alert', 14), 'The recurring conflict, and how to resolve it'),
          f.conflict) : null)));
  }
  function reset() {
    wrap.dataset.dim = 'false';
    $$('.orgnode', svg).forEach(n => { n.dataset.active = 'false'; n.dataset.rel = 'false'; });
    $$('.orgedge', svg).forEach(e => e.dataset.rel = 'false');
    clear(detail).appendChild(el('div', { class: 'empty' },
      icon('network', 28, 1.4),
      el('p', { class: 't-sm' }, 'Select a function to see what it owns, what it wants from product, and where the friction reliably appears.')));
  }

  svg.addEventListener('click', e => {
    const n = e.target.closest('.orgnode');
    if (n) select(n.dataset.id); else reset();
  });
  svg.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const n = e.target.closest('.orgnode');
      if (n) { e.preventDefault(); select(n.dataset.id); }
    }
  });

  const initial = query && query.get('n');
  setTimeout(() => initial ? select(initial) : reset(), 0);

  return el('div', {},
    el('div', { class: 'row-wrap', style: { marginBottom: '.7rem' } },
      Object.entries({ core:'Product', build:'Build', market:'Market', operate:'Operate', govern:'Govern', lead:'Lead' })
        .map(([k, label]) => el('span', { class: 'chip chip--dot', style: { background: KIND_SOFT[k], color: KIND_TONE[k] } }, label))),
    wrap,
    detail);
}

function row(title, text) {
  return el('div', {},
    el('div', { class: 't-eyebrow', style: { marginBottom: '.15rem' } }, title),
    el('p', { class: 't-sm', html: rich(text) }));
}

/* ---------------- decision rights ---------------- */
function rightsView() {
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      rx('Decision rights vary between organisations, and in a newly formed hub they are frequently undefined. This is a defensible default, not a universal truth — treat the third column as the conversation to have in your first month.')),
    el('div', { class: 'card card--flush scroll-x' },
      el('table', { class: 'tbl tbl--zebra' },
        el('thead', {}, el('tr', {},
          el('th', {}, 'Decision'), el('th', {}, 'Product manager'), el('th', {}, 'Who else'), el('th', {}, 'Note'))),
        el('tbody', {}, DECISION_RIGHTS.map(d => el('tr', {},
          el('td', { style: { fontWeight: 550 } }, d.decision),
          el('td', {}, el('span', { class: 'chip ' + (d.pm.startsWith('Decide') ? 'chip--teal' : d.pm === 'Input only' ? 'chip--outline' : 'chip--amber') }, d.pm)),
          el('td', { class: 'muted' }, d.other),
          el('td', { class: 'muted2 t-xs' }, d.note)))))),
    el('div', { class: 'note note--info' },
      el('div', { class: 'note__title' }, icon('alert', 14), 'Use this in the interview'),
      rx('Asking *“where does the product manager\'s decision right end today — do I own the roadmap, or recommend it?”* is one of the strongest questions you can ask. It tells you what the job actually is, and it signals that you think in decision rights rather than in job titles.')));
}

/* ---------------- altitude ---------------- */
function altitudeView() {
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      'The same product manager works at three altitudes in the same week. Confusing them is a common failure: escalating a tactical call wastes leadership time, and treating a strategic choice as tactical commits the organisation to something nobody agreed.'),
    el('div', { class: 'grid grid--3' },
      ALTITUDE.map((a, i) => el('div', { class: 'card', style: { borderColor: ['var(--accent)','var(--teal)','var(--violet)'][i].replace(')', ')') } },
        el('div', { class: 'row-wrap', style: { marginBottom: '.35rem' } },
          el('span', { class: 'chip ' + ['chip--accent','chip--teal','chip--violet'][i] + ' chip--dot' }, a.label),
          el('span', { class: 't-xs muted2' }, a.horizon)),
        el('h3', { class: 't-h3', style: { marginBottom: '.45rem', fontStyle: 'italic', fontWeight: 500 } }, '“' + a.q + '”'),
        el('ul', { class: 't-sm', style: { marginBottom: '.6rem' } }, a.work.map(w => el('li', {}, w))),
        el('div', { class: 't-xs', style: { marginBottom: '.3rem' } },
          el('strong', {}, 'Who decides: '), a.decides),
        el('div', { class: 't-xs muted2', style: { marginBottom: '.5rem' } },
          el('strong', {}, 'Trap: '), a.trap),
        el('div', { class: 'note note--good', style: { fontSize: '.8rem' } },
          el('div', { class: 'note__title' }, 'For you'), a.you)))));
}

/* ---------------- org shapes ---------------- */
function shapesView() {
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      'The same job is different work in different organisations. The third card is the one that describes the role you are applying for.'),
    el('div', { class: 'grid grid--2' },
      ORG_SHAPES.map(o => el('div', { class: 'card', style: o.id === 'joint' ? { borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)' } : {} },
        el('div', { class: 'row-wrap', style: { marginBottom: '.35rem' } },
          o.id === 'joint' ? el('span', { class: 'chip chip--accent chip--dot' }, 'This role') : null,
          el('span', { class: 't-xs muted2' }, o.where)),
        el('h3', { class: 't-h3', style: { marginBottom: '.45rem' } }, o.title),
        el('ul', { class: 't-sm muted', style: { marginBottom: '.6rem' } }, o.traits.map(t => el('li', {}, t))),
        el('div', { class: 'note' },
          el('div', { class: 'note__title' }, 'What that means for a PM'), o.pmreality)))));
}
