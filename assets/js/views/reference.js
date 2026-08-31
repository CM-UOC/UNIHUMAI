/* reference.js — the three orientation chapters */
import { el, icon, rich, rx, ev } from '../ui.js';
import { ROLE, REQUIREMENTS, GAPS, STRENGTHS } from '../data/role.js';
import { EVIDENCE, EVIDENCE_BY_ID, ROLE_LABEL, PROFILE, ROLES, EDUCATION } from '../data/profile.js';
import { COMPANY_FACTS, PRODUCT_INFERENCES, SOURCES, ASK_THEM } from '../data/company.js';
import { CAST, ACCOUNTS, TIMELINE, PRODUCT, DISCLAIMER } from '../data/world.js';
import { LESSON_BY_ID } from '../data/curriculum.js';

const FIT = { strong:['tag--sage','Strong match'], partial:['tag--amber','Partial'], gap:['tag--rose','Gap'] };

export function renderReference(main, l) {
  const body = el('div', { class: 'wrapx', style: { paddingBottom: '2rem' } });
  main.appendChild(body);
  ({ role: roleChapter, business: businessChapter, evidence: evidenceChapter }[l.view] || roleChapter)(body);
}

/* ---------------- 1. the role and your fit ---------------- */
function roleChapter(b) {
  const counts = ['strong','partial','gap'].map(f => REQUIREMENTS.filter(r => r.fit === f).length);

  b.append(
    el('div', { class: 'g3 reveal', style: { marginBottom: '2.5rem' } },
      stat(counts[0], 'Strong matches', 'Requirements your materials evidence directly.', 'sage'),
      stat(counts[1], 'Partial', 'Real but incomplete — usually framing, not capability.', 'amber'),
      stat(counts[2], 'Gaps', 'Nothing in your materials supports these.', 'rose')),

    section('Lead with these', 'What you should say first, and why it is defensible.',
      el('div', { class: 'stack' }, STRENGTHS.map(s =>
        el('div', { class: 'panel reveal', style: { borderColor: 'color-mix(in srgb, var(--sage) 30%, transparent)' } },
          el('h3', { class: 'h-md', style: { marginBottom: '.5rem' } }, s.title),
          el('p', { class: 'dim sm', style: { marginBottom: '.9rem' } }, s.line),
          el('div', { class: 'stack', style: { '--gap': '.55rem' } },
            (s.evidence || []).map(id => EVIDENCE_BY_ID[id]).filter(Boolean).map(x =>
              el('div', { class: 'src' }, '“' + x.quote + '”',
                el('span', { class: 'src__a' }, x.src === 'cv' ? 'Your CV' : 'cmmt.me')))))))),

    section('Every requirement, mapped', 'The advertisement decomposed. Where your materials support a claim, the evidence is quoted. Where they do not, it says so.',
      el('div', { class: 'stack', style: { '--gap': '.8rem' } },
        ['essential','implied'].map(kind => {
          const items = REQUIREMENTS.filter(r => r.kind === kind);
          return el('div', {},
            el('div', { class: 'slug', style: { margin: '1.4rem 0 .8rem' } },
              kind === 'essential' ? 'Stated requirements' : 'Implied expectations'),
            el('div', { class: 'stack', style: { '--gap': '.8rem' } }, items.map(r => reqPanel(r))));
        }))),

    section('Your gaps, ranked', 'Ordered by what each could cost you in the room. The first two are the ones to close before anything else.',
      el('div', { class: 'stack' }, GAPS.slice().sort((a, b2) =>
        ({critical:0,high:1,medium:2,low:3})[a.severity] - ({critical:0,high:1,medium:2,low:3})[b2.severity]
      ).map((g, i) => {
        const tone = { critical:'rose', high:'amber', medium:'ice', low:'line' }[g.severity];
        return el('div', { class: 'panel reveal', style: { borderColor: tone === 'line' ? 'var(--line)' : `color-mix(in srgb, var(--${tone}) 30%, transparent)` } },
          el('div', { class: 'wrap', style: { marginBottom: '.5rem' } },
            el('span', { class: 'tag tag--' + tone + ' tag--dot' }, g.severity),
            el('span', { class: 'mono dim2' }, '#' + (i + 1)),
            g.verify ? ev('check', 'Ask them, do not guess') : null),
          el('h3', { class: 'h-lg', style: { marginBottom: '.4rem' } }, g.title),
          el('p', { class: 'dim sm', style: { marginBottom: '.9rem' } }, g.why),
          el('div', { class: 'slug', style: { marginBottom: '.4rem' } }, 'How to close it'),
          el('ul', { class: 'sm dim' }, g.close.map(c => el('li', { html: rich(c) }))),
          (g.concepts || []).length ? el('div', { class: 'wrap', style: { marginTop: '.9rem' } },
            g.concepts.map(c => { const L = LESSON_BY_ID[c];
              return L ? el('a', { class: 'tag tag--amber', href: '#/lesson/' + c, style: { textDecoration: 'none' } },
                icon('book', 11), L.title) : null; })) : null);
      })))
  );
}

function reqPanel(r) {
  const [cls, label] = FIT[r.fit];
  const evid = (r.evidence || []).map(id => EVIDENCE_BY_ID[id]).filter(Boolean);
  const open = el('div', { hidden: true, style: { marginTop: '1.1rem' } },
    sub('What this actually asks for', r.reading, 'int'),
    r.strength !== '—' ? sub('Where you are strong', r.strength, 'cv') : null,
    sub('What is missing', r.gap, r.fit === 'gap' ? 'check' : 'int'),
    sub('What to do about it', r.action, 'gen'),
    evid.length ? el('div', { style: { marginTop: '1rem' } },
      el('div', { class: 'slug', style: { marginBottom: '.45rem' } }, 'Supporting evidence'),
      el('div', { class: 'stack', style: { '--gap': '.5rem' } },
        evid.map(x => el('div', { class: 'src' }, '“' + x.quote + '”',
          el('span', { class: 'src__a' }, (x.src === 'cv' ? 'Your CV' : 'cmmt.me') + ' · ' + (ROLE_LABEL[x.role] || '')))))) : null,
    (r.concepts || []).length ? el('div', { class: 'wrap', style: { marginTop: '1rem' } },
      el('span', { class: 'xs dim2' }, 'Study:'),
      r.concepts.map(c => { const L = LESSON_BY_ID[c];
        return L ? el('a', { class: 'tag tag--amber', href: '#/lesson/' + c, style: { textDecoration: 'none' } }, L.title) : null; })) : null);

  const plus = el('span', { class: 'qrow__x' }, icon('plus', 17));
  return el('div', { class: 'panel reveal' },
    el('button', { class: 'qrow__head', style: { background: 'none' }, onClick: () => {
      open.hidden = !open.hidden;
      plus.style.transform = open.hidden ? '' : 'rotate(45deg)';
    }},
      el('div', {},
        el('div', { class: 'wrap', style: { marginBottom: '.4rem' } },
          el('span', { class: 'tag ' + cls + ' tag--dot' }, label),
          el('span', { class: 'tag tag--line' }, r.area),
          r.verify ? ev('check') : null),
        el('div', { class: 'qrow__q' }, r.title),
        el('div', { class: 'src src--jd', style: { marginTop: '.6rem' } }, '“' + r.jd + '”',
          el('span', { class: 'src__a' }, 'From the job advertisement'))),
      plus),
    open);
}

function sub(t, text, kind) {
  return el('div', { style: { marginBottom: '1rem' } },
    el('div', { class: 'wrap', style: { marginBottom: '.3rem' } },
      el('span', { style: { fontWeight: 570, fontSize: '.94rem' } }, t), ev(kind)),
    el('p', { class: 'sm dim', html: rich(text) }));
}

/* ---------------- 2. the business ---------------- */
function businessChapter(b) {
  const groups = [
    ['jd', 'From the advertisement', 'Quoted or closely paraphrased from the ad you supplied.'],
    ['company', 'From public company material', 'Sourced below. Re-check any figure before quoting it in an interview.'],
    ['verify', 'Not publicly available', 'Do not guess at these. Ask.'],
    ['assume', 'Assumptions', 'Reasonable, unconfirmed. Verify with the recruiter.']
  ];
  const MAP = { jd:'jd', company:'pf', verify:'check', assume:'int' };

  b.append(
    el('div', { class: 'panel panel--tall reveal', style: { marginBottom: '2.5rem', borderColor: 'color-mix(in srgb, var(--amber) 32%, transparent)' } },
      el('div', { class: 'slug', style: { marginBottom: '.6rem' } }, 'The role in one sentence'),
      el('p', { class: 'lead', style: { color: 'var(--ink)' } }, ROLE.mission),
      el('div', { class: 'wrap', style: { marginTop: '1.2rem' } },
        el('span', { class: 'tag tag--line' }, ROLE.band),
        el('span', { class: 'tag tag--line' }, 'Ref: ' + ROLE.ref),
        el('span', { class: 'tag tag--line' }, 'Barcelona'))),

    section('What is actually known', 'Separated by how much weight each item can bear.',
      el('div', { class: 'stack', style: { '--gap': '1.6rem' } }, groups.map(([k, title, blurb]) => {
        const items = COMPANY_FACTS.filter(f => f.src === k);
        if (!items.length) return null;
        return el('div', { class: 'reveal' },
          el('div', { class: 'wrap', style: { marginBottom: '.3rem' } },
            el('h3', { class: 'h-md' }, title), ev(MAP[k])),
          el('p', { class: 'sm dim2', style: { marginBottom: '.8rem' } }, blurb),
          el('div', { class: 'panel' }, el('div', { class: 'stack', style: { '--gap': '.8rem' } },
            items.map(f => el('p', { class: 'sm', html: rich(f.text) })))));
      }))),

    section('What follows from it', 'Readings, not facts. This is the kind of observation that makes an answer sound like it came from someone who has thought about the business — present it as your reading.',
      el('div', { class: 'stack' }, PRODUCT_INFERENCES.map(pi =>
        el('div', { class: 'panel reveal' },
          ev('int'),
          el('h3', { class: 'h-md', style: { margin: '.6rem 0 .4rem' } }, pi.title),
          el('p', { class: 'sm dim', html: rich(pi.body) }))))),

    section('The case world', 'The constructed scenario the twenty-nine lessons run inside. Invented, so that each idea can be learned in a situation.',
      el('div', {},
        el('div', { class: 'cardish cardish--warn reveal', style: { marginBottom: '1.4rem' } },
          el('div', { class: 'cardish__t' }, icon('alert', 13), 'Constructed case'),
          el('p', { class: 'sm' }, DISCLAIMER)),
        el('div', { class: 'panel reveal', style: { marginBottom: '1.1rem' } },
          el('div', { class: 'slug', style: { marginBottom: '.4rem' } }, 'The product'),
          el('h3', { class: 'h-lg', style: { marginBottom: '.4rem' } }, PRODUCT.name),
          el('p', { class: 'sm dim', style: { marginBottom: '.6rem' } }, PRODUCT.what),
          el('p', { class: 'sm dim2' }, PRODUCT.why)),
        el('div', { class: 'g2', style: { marginBottom: '1.1rem' } },
          el('div', { class: 'panel reveal' },
            el('div', { class: 'slug', style: { marginBottom: '.7rem' } }, 'Who is in the room'),
            el('ul', { class: 'plist' }, CAST.map(c =>
              el('li', {}, el('span', { class: 'plist__k' }, c.name),
                el('span', { class: 'plist__v' }, el('strong', {}, c.role), el('br'), c.note))))),
          el('div', { class: 'panel reveal' },
            el('div', { class: 'slug', style: { marginBottom: '.7rem' } }, 'Who is on the other side'),
            el('ul', { class: 'plist' }, ACCOUNTS.map(a =>
              el('li', {}, el('span', { class: 'plist__k' }, a.name),
                el('span', { class: 'plist__v' }, el('strong', {}, a.kind), el('br'), a.note)))))),
        el('div', { class: 'panel reveal' },
          el('div', { class: 'slug', style: { marginBottom: '.7rem' } }, 'Where you are'),
          el('ul', { class: 'plist' }, TIMELINE.map(t =>
            el('li', {}, el('span', { class: 'plist__k mono' }, t.when), el('span', { class: 'plist__v' }, t.what))))))),

    section('What to ask them', 'Weak questions at the end undo a strong interview. Ordered by how much each one tells you.',
      el('div', { class: 'stack', style: { '--gap': '.7rem' } }, ASK_THEM.map((a, i) =>
        el('div', { class: 'panel reveal' },
          el('div', { class: 'row', style: { alignItems: 'flex-start', gap: '.9rem' } },
            el('span', { class: 'mono', style: { color: 'var(--amber)', paddingTop: '.3rem', flex: 'none' } }, String(i + 1).padStart(2, '0')),
            el('div', {},
              el('p', { style: { fontWeight: 550, marginBottom: '.3rem' } }, '“' + a.q + '”'),
              el('p', { class: 'sm dim' }, a.why))))))),

    section('Sources', 'Where the public information came from.',
      el('div', { class: 'panel' }, el('div', { class: 'stack', style: { '--gap': '.7rem' } },
        SOURCES.map(s => el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer',
          class: 'row', style: { textDecoration: 'none', alignItems: 'flex-start' } },
          icon('arrow', 14),
          el('span', {}, el('span', { style: { display: 'block', fontWeight: 530 } }, s.label),
            el('span', { class: 'xs dim2', style: { wordBreak: 'break-all' } }, s.url)))))))
  );
}

/* ---------------- 3. your record ---------------- */
function evidenceChapter(b) {
  const byRole = {};
  EVIDENCE.forEach(e => { (byRole[e.role] = byRole[e.role] || []).push(e); });

  b.append(
    el('div', { class: 'cardish cardish--ice reveal', style: { marginBottom: '2.5rem' } },
      el('div', { class: 'cardish__t' }, icon('alert', 13), 'Why this chapter exists'),
      rx('Every factual claim this site makes about you comes from one of the entries below, quoted from your CV or from cmmt.me. If something is not here, it does not appear anywhere on this site — which is the mechanism that stops any answer drifting into experience you do not have.')),

    section('Who you are, on paper', null,
      el('div', { class: 'panel reveal' },
        el('div', { class: 'g3', style: { marginBottom: '1.2rem' } },
          kv('Name', PROFILE.name), kv('Headline', PROFILE.headline), kv('Based', PROFILE.location),
          kv('Languages', PROFILE.languages.map(l => l.lang + ' (' + l.level + ')').join(' · ')),
          kv('Portfolio', PROFILE.portfolio), kv('Email', PROFILE.email)),
        el('div', { class: 'src' }, PROFILE.summary, el('span', { class: 'src__a' }, 'Professional summary · your CV')))),

    section('Your record', 'Quoted, tagged, and grouped by where it happened.',
      el('div', { class: 'stack', style: { '--gap': '1.3rem' } },
        Object.entries(byRole).map(([role, items]) => {
          const r = ROLES.find(x => x.id === role);
          return el('div', { class: 'panel reveal' },
            el('div', { class: 'spread', style: { marginBottom: '.9rem', flexWrap: 'wrap', gap: '.5rem' } },
              el('h3', { class: 'h-lg' }, ROLE_LABEL[role] || role),
              r ? el('span', { class: 'tag tag--line' }, r.title + ' · ' + r.period) : null),
            r ? el('p', { class: 'sm dim2', style: { marginBottom: '1rem' } }, r.context) : null,
            el('div', { class: 'stack', style: { '--gap': '1rem' } }, items.map(e =>
              el('div', {},
                el('div', { class: 'wrap', style: { marginBottom: '.3rem' } },
                  ev(e.src === 'cv' ? 'cv' : 'pf', e.src === 'cv' ? 'CV' : 'Portfolio'),
                  e.tags.slice(0, 5).map(t => el('span', { class: 'tag tag--line xs' }, t))),
                el('p', { class: 'sm' }, e.claim),
                el('div', { class: 'src', style: { marginTop: '.5rem' } }, '“' + e.quote + '”')))));
        }))),

    section('Education', null,
      el('div', { class: 'panel reveal' },
        el('table', { class: 'tbl' }, el('tbody', {}, EDUCATION.map(e =>
          el('tr', {}, el('td', { style: { fontWeight: 550 } }, e.qual),
            el('td', { class: 'dim' }, e.school),
            el('td', { class: 'dim2 mono', style: { whiteSpace: 'nowrap' } }, e.when)))))))
  );
}

/* ---------------- helpers ---------------- */
function section(title, blurb, body) {
  return el('section', { class: 'sect', style: { marginTop: '3rem' } },
    el('div', { class: 'mark' }, el('span', { class: 'mark__n' }, title.toUpperCase()), el('span', { class: 'mark__r' })),
    blurb ? el('p', { class: 'dim read', style: { marginBottom: '1.4rem' } }, blurb) : null,
    body);
}
function stat(n, label, sub2, tone) {
  return el('div', { class: 'panel', style: { borderColor: `color-mix(in srgb, var(--${tone}) 30%, transparent)` } },
    el('div', { class: 'd-md', style: { color: `var(--${tone})`, marginBottom: '.2rem' } }, String(n)),
    el('div', { style: { fontWeight: 570, marginBottom: '.3rem' } }, label),
    el('p', { class: 'xs dim2' }, sub2));
}
function kv(k, v) {
  return el('div', {}, el('div', { class: 'slug', style: { marginBottom: '.2rem' } }, k), el('div', { class: 'sm' }, v));
}
