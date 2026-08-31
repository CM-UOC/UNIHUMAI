import { el, icon, pageHead, rich, rx, tabs, bar, confidenceRater, savedTextarea, toast, accordion, CONFIDENCE_LABELS } from '../ui.js';
import { store } from '../store.js';
import { ROLE, REQUIREMENTS, GAPS, STRENGTHS } from '../data/role.js';
import { EVIDENCE_BY_ID, ROLE_LABEL, PROFILE, ROLES, EDUCATION } from '../data/profile.js';
import { CONCEPT_BY_ID } from '../data/concepts.js';
import { roleFitStats } from '../progress.js';

const FIT = {
  strong:  { label:'Strong match',   cls:'chip--teal',    bar:'bar--teal' },
  partial: { label:'Partial match',  cls:'chip--amber',   bar:'bar--amber' },
  gap:     { label:'Gap',            cls:'chip--rose',    bar:'bar--rose' }
};
const KIND = { essential:'Essential', desirable:'Desirable', implied:'Implied expectation' };

export function renderRoleFit(page, { query }) {
  const st = roleFitStats();
  page.appendChild(pageHead({
    eyebrow: 'Personalised role analysis',
    title: 'Role fit',
    lead: `Every line of the **${ROLE.title}** advertisement, decomposed and mapped against your CV and portfolio. Where your materials support a claim, the evidence is quoted. Where they do not, it says so.`,
    meta: [
      el('span', { class: 'chip chip--outline' }, ROLE.employer),
      el('span', { class: 'chip chip--outline' }, ROLE.band),
      el('span', { class: 'chip chip--outline' }, 'Ref: ' + ROLE.ref),
      el('span', { class: 'chip chip--accent' }, `${st.rated}/${st.total} self-rated`)
    ]
  }));

  const counts = ['strong', 'partial', 'gap'].map(f => REQUIREMENTS.filter(r => r.fit === f).length);
  page.appendChild(el('div', { class: 'grid grid--3', style: { marginBottom: '1.3rem' } },
    summaryCard('Strong matches', counts[0], 'Requirements your materials evidence directly.', 'teal'),
    summaryCard('Partial matches', counts[1], 'Real but incomplete — usually a framing or scope issue.', 'amber'),
    summaryCard('Gaps', counts[2], 'Nothing in your materials supports these. Study or ask.', 'rose')));

  page.appendChild(tabs([
    { label: 'Requirement map', render: () => reqMap(query) },
    { label: 'Ranked gaps',     render: () => gapView(query) },
    { label: 'Your strengths',  render: () => strengthView() },
    { label: 'Evidence bank',   render: () => evidenceView() }
  ], { initial: query && query.get('g') ? 1 : 0 }));
}

function summaryCard(label, n, sub, tone) {
  return el('div', { class: 'card', style: { borderColor: `color-mix(in srgb, var(--${tone}) 30%, transparent)` } },
    el('div', { class: 'stat' },
      el('span', { class: 'stat__n', style: { color: `var(--${tone})` } }, String(n)),
      el('span', { class: 'stat__l' }, label)),
    el('p', { class: 't-xs muted2', style: { marginTop: '.3rem' } }, sub));
}

function reqMap(query) {
  const focus = query && query.get('r');
  const wrap = el('div', { class: 'stack', style: { '--gap': '.7rem' } });
  ['essential', 'implied'].forEach(kind => {
    const items = REQUIREMENTS.filter(r => r.kind === kind);
    if (!items.length) return;
    wrap.appendChild(el('div', { class: 't-eyebrow', style: { marginTop: '.6rem' } },
      KIND[kind] + ` · ${items.length}`));
    items.forEach(r => wrap.appendChild(reqCard(r, focus === r.id)));
  });
  return wrap;
}

function reqCard(r, open) {
  const f = FIT[r.fit];
  const saved = store.entry('roleFit', r.id, {});
  const body = () => {
    const ev = (r.evidence || []).map(id => EVIDENCE_BY_ID[id]).filter(Boolean);
    return el('div', { class: 'stack', style: { '--gap': '.8rem' } },
      el('div', { class: 'quote quote--jd' },
        '“' + r.jd + '”',
        el('div', { class: 't-xs muted2', style: { fontStyle: 'normal', marginTop: '.25rem' } }, 'From the job advertisement')),
      sub('What this actually asks for', r.reading, 'interp'),
      r.strength !== '—' ? sub('Where you are strong', r.strength, 'cv') : null,
      sub('What is missing', r.gap, r.fit === 'gap' ? 'verify' : 'interp'),
      sub('What to do about it', r.action, 'general'),
      ev.length ? el('div', {},
        el('div', { class: 't-eyebrow', style: { marginBottom: '.4rem' } }, 'Supporting evidence from your materials'),
        el('div', { class: 'stack', style: { '--gap': '.4rem' } },
          ev.map(x => el('div', { class: 'quote' },
            '“' + x.quote + '”',
            el('div', { class: 't-xs muted2', style: { fontStyle: 'normal', marginTop: '.2rem' } },
              (x.src === 'cv' ? 'Your CV' : 'cmmt.me') + ' · ' + (ROLE_LABEL[x.role] || '')))))) : null,
      (r.concepts || []).length ? el('div', {},
        el('div', { class: 't-eyebrow', style: { marginBottom: '.35rem' } }, 'Study these'),
        el('div', { class: 'row-wrap' }, r.concepts.map(c => {
          const cc = CONCEPT_BY_ID[c];
          return cc ? el('a', { class: 'chip chip--accent', href: '#/study/' + c, style: { textDecoration: 'none' } },
            icon('book', 11), cc.title) : null;
        }))) : null,
      el('div', { class: 'card card--tint' },
        el('div', { class: 'spread', style: { flexWrap: 'wrap', gap: '.6rem', marginBottom: '.6rem' } },
          el('div', {},
            el('div', { class: 't-eyebrow' }, 'How ready do you feel on this?'),
            el('p', { class: 't-xs muted2', style: { marginTop: '.15rem' } }, 'Weight in your readiness score: ×' + r.weight)),
          confidenceRater(saved.confidence, v => {
            store.patch('roleFit', r.id, { confidence: v });
            toast('Rated: ' + CONFIDENCE_LABELS[v]);
          }, true)),
        savedTextarea({
          value: saved.note || '', rows: 3,
          placeholder: 'Your note: the example you would use, or the thing you still need to prepare.',
          label: 'Note on ' + r.title,
          onSave: v => store.patch('roleFit', r.id, { note: v })
        })));
  };

  return accordion(
    `<span style="font-weight:570">${r.title}</span>`,
    body,
    { open,
      badge: el('span', { class: 'row', style: { gap: '.4rem', flex: 'none' } },
        el('span', { class: 'chip ' + f.cls + ' chip--dot' }, f.label),
        r.verify ? el('span', { class: 'ev ev--verify' }, 'Verify') : null) });
}

function sub(title, text, evKind) {
  const map = { interp:['ev--interp','Interpretation'], cv:['ev--cv','Grounded in your materials'],
                verify:['ev--verify','Not evidenced'], general:['ev--general','Preparation advice'] };
  const m = map[evKind] || map.general;
  return el('div', {},
    el('div', { class: 'row-wrap', style: { marginBottom: '.25rem' } },
      el('span', { style: { fontWeight: 570, fontSize: '.92rem' } }, title),
      el('span', { class: 'ev ' + m[0] }, m[1])),
    el('p', { class: 't-sm', html: rich(text) }));
}

/* ---------------- gaps ---------------- */
function gapView(query) {
  const focus = query && query.get('g');
  const order = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = GAPS.slice().sort((a, b) => order[a.severity] - order[b.severity]);
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      'Ranked by how much each one could cost you in the interview. The first two are the ones to close before anything else.'),
    ...sorted.map((g, i) => {
      const tone = { critical:'rose', high:'amber', medium:'accent', low:'outline' }[g.severity];
      return el('div', { class: 'card', style: {
        borderColor: tone === 'outline' ? 'var(--line)' : `color-mix(in srgb, var(--${tone}) 32%, transparent)`,
        ...(focus === g.id ? { boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)' } : {}) } },
        el('div', { class: 'row-wrap', style: { marginBottom: '.4rem' } },
          el('span', { class: 'chip chip--' + (tone === 'outline' ? 'outline' : tone) + ' chip--dot' }, g.severity + ' priority'),
          el('span', { class: 't-xs muted2', style: { fontFamily: 'var(--font-mono)' } }, '#' + (i + 1)),
          g.verify ? el('span', { class: 'ev ev--verify' }, 'Ask them, do not guess') : null),
        el('h3', { class: 't-h3', style: { marginBottom: '.3rem' } }, g.title),
        el('p', { class: 't-sm muted', style: { marginBottom: '.65rem' } }, g.why),
        el('div', { class: 't-eyebrow', style: { marginBottom: '.3rem' } }, 'How to close it'),
        el('ul', { class: 't-sm' }, g.close.map(c => el('li', { html: rich(c) }))),
        (g.concepts || []).length ? el('div', { class: 'row-wrap', style: { marginTop: '.7rem' } },
          g.concepts.map(c => {
            const cc = CONCEPT_BY_ID[c];
            return cc ? el('a', { class: 'chip chip--accent', href: '#/study/' + c, style: { textDecoration: 'none' } },
              icon('book', 11), cc.title) : null;
          })) : null);
    }));
}

/* ---------------- strengths ---------------- */
function strengthView() {
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      'What to lead with. Each of these is supported by a direct quotation from your materials — none is inferred.'),
    ...STRENGTHS.map(s => el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--teal) 28%, transparent)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.35rem' } },
        el('span', { class: 'chip chip--teal chip--dot' }, 'Lead with this')),
      el('h3', { class: 't-h3', style: { marginBottom: '.3rem' } }, s.title),
      el('p', { class: 't-sm muted', style: { marginBottom: '.6rem' } }, s.line),
      el('div', { class: 'stack', style: { '--gap': '.35rem' } },
        (s.evidence || []).map(id => EVIDENCE_BY_ID[id]).filter(Boolean).map(x =>
          el('div', { class: 'quote' }, '“' + x.quote + '”',
            el('div', { class: 't-xs muted2', style: { fontStyle: 'normal', marginTop: '.2rem' } },
              (x.src === 'cv' ? 'Your CV' : 'cmmt.me'))))),
      el('div', { class: 'row-wrap', style: { marginTop: '.6rem' } },
        (s.reqs || []).map(rid => {
          const r = REQUIREMENTS.find(x => x.id === rid);
          return r ? el('a', { class: 'chip chip--outline', href: '#/rolefit?r=' + rid, style: { textDecoration: 'none' } },
            icon('target', 11), r.area) : null;
        })))));
}

/* ---------------- evidence bank ---------------- */
function evidenceView() {
  const byRole = {};
  Object.values(EVIDENCE_BY_ID).forEach(e => { (byRole[e.role] = byRole[e.role] || []).push(e); });
  return el('div', { class: 'stack' },
    el('div', { class: 'note note--info' },
      el('div', { class: 'note__title' }, icon('layers', 14), 'What this is'),
      rx('Every factual claim this site makes about you comes from one of these, quoted from your CV or from cmmt.me. When you draft an interview answer, the composer draws from this list — which is the mechanism that stops an answer drifting into experience you do not have. If something is missing here, it does not appear anywhere on this site.')),
    el('div', { class: 'card card--tint' },
      el('div', { class: 'grid grid--3' },
        el('div', {}, el('div', { class: 't-eyebrow' }, 'Name'), el('div', {}, PROFILE.name)),
        el('div', {}, el('div', { class: 't-eyebrow' }, 'Headline'), el('div', { class: 't-sm' }, PROFILE.headline)),
        el('div', {}, el('div', { class: 't-eyebrow' }, 'Languages'), el('div', { class: 't-sm' },
          PROFILE.languages.map(l => l.lang + ' (' + l.level + ')').join(' · '))))),
    ...Object.entries(byRole).map(([role, items]) => {
      const r = ROLES.find(x => x.id === role);
      return el('div', { class: 'card' },
        el('div', { class: 'spread', style: { marginBottom: '.5rem', flexWrap: 'wrap' } },
          el('h3', { class: 't-h3' }, ROLE_LABEL[role] || role),
          r ? el('span', { class: 't-xs muted2' }, r.title + ' · ' + r.period) : null),
        el('div', { class: 'stack', style: { '--gap': '.6rem' } },
          items.map(e => el('div', {},
            el('div', { class: 'row-wrap', style: { marginBottom: '.2rem' } },
              el('span', { class: 'ev ' + (e.src === 'cv' ? 'ev--cv' : 'ev--portfolio') }, e.src === 'cv' ? 'CV' : 'Portfolio'),
              ...e.tags.slice(0, 4).map(t => el('span', { class: 'chip chip--outline t-xs' }, t))),
            el('p', { class: 't-sm' }, e.claim)))));
    }),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Education'),
      el('table', { class: 'tbl' }, el('tbody', {},
        EDUCATION.map(e => el('tr', {},
          el('td', { style: { fontWeight: 550 } }, e.qual),
          el('td', { class: 'muted' }, e.school),
          el('td', { class: 'muted2', style: { whiteSpace: 'nowrap' } }, e.when)))))));
}
