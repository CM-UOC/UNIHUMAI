import { el, icon, pageHead, rich, rx, tabs, evBadge } from '../ui.js';
import { COMPANY_FACTS, PRODUCT_INFERENCES, SOURCES, ASK_THEM } from '../data/company.js';
import { ROLE, REQUIREMENTS } from '../data/role.js';

const SRC_MAP = {
  jd:      { cls:'ev--jd',        label:'From the job ad' },
  company: { cls:'ev--portfolio', label:'Public company info' },
  verify:  { cls:'ev--verify',    label:'Verify — not public' },
  assume:  { cls:'ev--assume',    label:'Assumption' }
};

export function renderCompany(page) {
  page.appendChild(pageHead({
    eyebrow: 'Company dossier',
    title: 'GIS:Hub, Barcelona',
    lead: 'What can actually be established about this employer and this role, separated from what is inferred and what has to be asked. Nothing here is invented — where the truth is not public, it says so.',
    meta: [
      el('span', { class: 'chip chip--outline' }, ROLE.title),
      el('span', { class: 'chip chip--outline' }, ROLE.band),
      el('span', { class: 'chip chip--outline' }, 'Ref: ' + ROLE.ref)
    ]
  }));

  page.appendChild(el('div', { class: 'card', style: { marginBottom: '1.2rem', borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' } },
    el('div', { class: 't-eyebrow', style: { marginBottom: '.3rem' } }, 'The role in one sentence'),
    el('p', { class: 't-lead' }, ROLE.mission)));

  page.appendChild(tabs([
    { label: 'What is known',     render: () => factsView() },
    { label: 'Product inferences',render: () => inferView() },
    { label: 'What to ask them',  render: () => askView() },
    { label: 'Sources',           render: () => sourceView() }
  ]));
}

function factsView() {
  const groups = [
    ['jd', 'From the job advertisement', 'Quoted or closely paraphrased from the ad you supplied.'],
    ['company', 'From public company material', 'Sourced from public websites and press releases. Re-check before quoting a specific figure in an interview.'],
    ['verify', 'Not publicly available', 'Do not guess at these. Ask.'],
    ['assume', 'Assumptions', 'Reasonable, but unconfirmed. Verify with the recruiter.']
  ];
  return el('div', { class: 'stack', style: { '--gap': '1.2rem' } },
    groups.map(([k, title, blurb]) => {
      const items = COMPANY_FACTS.filter(f => f.src === k);
      if (!items.length) return null;
      const m = SRC_MAP[k];
      return el('section', {},
        el('div', { class: 'row-wrap', style: { marginBottom: '.3rem' } },
          el('h3', { class: 't-h3' }, title),
          el('span', { class: 'ev ' + m.cls }, m.label)),
        el('p', { class: 't-sm muted', style: { marginBottom: '.6rem' } }, blurb),
        el('div', { class: 'card card--flush' },
          items.map((f, i) => el('div', { class: 't-sm', style: { padding: '.7rem .9rem', borderTop: i ? '1px solid var(--line)' : 'none' } },
            rx(f.text)))));
    }));
}

function inferView() {
  return el('div', { class: 'stack' },
    el('div', { class: 'note note--info' },
      el('div', { class: 'note__title' }, icon('flask', 14), 'These are readings, not facts'),
      'Each of these takes something publicly stated and draws out what it implies for the product work. They are the kind of observation that makes an interview answer sound like it came from someone who has thought about the business — but present them as your reading, not as inside knowledge.'),
    ...PRODUCT_INFERENCES.map(p => el('div', { class: 'card' },
      el('div', { class: 'row-wrap', style: { marginBottom: '.35rem' } },
        el('span', { class: 'ev ev--interp' }, 'Interpretation')),
      el('h3', { class: 't-h3', style: { marginBottom: '.35rem' } }, p.title),
      el('p', { class: 't-sm', html: rich(p.body) }))));
}

function askView() {
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      'Weak questions at the end undo a strong interview. These are ordered by how much they tell you — and by how much they signal about how you think.'),
    ...ASK_THEM.map((a, i) => el('div', { class: 'card' },
      el('div', { class: 'row', style: { alignItems: 'flex-start', gap: '.7rem' } },
        el('span', { class: 'section__n', style: { flex: 'none', marginTop: '2px' } }, String(i + 1)),
        el('div', {},
          el('p', { style: { fontWeight: 560, marginBottom: '.25rem' } }, '“' + a.q + '”'),
          el('p', { class: 't-sm muted' }, a.why))))),
    el('div', { class: 'note note--warn' },
      el('div', { class: 'note__title' }, icon('alert', 14), 'Do not ask'),
      'Anything answered on the careers page. Anything about holiday or remote days in a first conversation. And “what is the culture like?” — which invites a rehearsed answer and tells you nothing.'));
}

function sourceView() {
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      'Where the public information on this page came from. Company facts change — re-check anything you plan to state in an interview, particularly partner names and figures.'),
    el('div', { class: 'card card--flush' },
      SOURCES.map((s, i) => el('a', {
        href: s.url, target: '_blank', rel: 'noopener noreferrer',
        style: { display: 'flex', gap: '.6rem', alignItems: 'center', padding: '.75rem .9rem',
                 borderTop: i ? '1px solid var(--line)' : 'none', textDecoration: 'none', color: 'inherit' }
      },
        icon('arrow', 14),
        el('span', { class: 'grow' },
          el('span', { style: { display: 'block', fontWeight: 540 } }, s.label),
          el('span', { class: 't-xs muted2', style: { wordBreak: 'break-all' } }, s.url))))),
    el('div', { class: 'note' },
      el('div', { class: 'note__title' }, icon('alert', 14), 'A caution'),
      'This dossier was assembled from public sources at the time of writing. Treat figures — vehicle counts, data-point counts, partner lists — as indicative. If you want to cite one in an interview, check it on the company site the day before.'));
}
