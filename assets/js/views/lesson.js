/* lesson.js — a chapter. Scene first, idea second, your evidence third. */
import { el, $, $$, icon, rich, rx, ev, clear, railSpy, watchReveals } from '../ui.js';
import { LESSONS, LESSON_BY_ID, PARTS } from '../data/curriculum.js';
import { store } from '../store.js';
import { EVIDENCE_BY_ID, ROLE_LABEL } from '../data/profile.js';
import { REQUIREMENTS } from '../data/role.js';
import { QUESTIONS } from '../data/questions.js';
import { termsBlock } from './glossary.js';
import { renderReference, workedBlock } from './reference.js';
import { WORKED_LESSONS } from '../data/worked-lessons.js';

export function renderLesson(main, ctx) {
  const l = LESSON_BY_ID[ctx.param];
  if (!l) { main.appendChild(el('div', { class: 'wrapn', style: { padding: '5rem 0' } }, el('p', {}, 'No such chapter.'))); return; }
  store.markRead(l.id);

  const idx = LESSONS.indexOf(l);
  const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
  const part = PARTS.find(p => p.id === l.part);

  /* ---------- hero ---------- */
  main.appendChild(el('section', { class: 'hero' },
    el('div', { class: 'hero__glow' }),
    el('div', { class: 'wrapx', style: { position: 'relative' } },
      el('div', { class: 'hero__num' }, String(l.n).padStart(2, '0')),
      el('div', { class: 'wrap anim-fade', style: { marginBottom: '1.4rem' } },
        el('a', { class: 'tag tag--line', href: '#/learn', style: { textDecoration: 'none' } },
          icon('back', 12), 'Part ' + part.n + ' · ' + part.title),
        el('span', { class: 'tag tag--line mono' }, 'CHAPTER ' + String(l.n).padStart(2, '0')),
        el('span', { class: 'tag tag--line' }, (l.minutes || 10) + ' min')),
      el('h1', { class: 'd-lg anim-rise', style: { maxWidth: '18ch', marginBottom: '1rem' } }, l.title),
      el('p', { class: 'lead read anim-rise', style: { animationDelay: '.07s' }, html: rich(l.oneLine) }),
      l.chosenBecause ? el('div', { class: 'cardish cardish--warn anim-rise', style: { marginTop: '1.6rem', maxWidth: '68ch', animationDelay: '.12s' } },
        el('div', { class: 'cardish__t' }, icon('star', 13), 'Why this one is in your curriculum'),
        el('p', { class: 'sm', html: rich(l.chosenBecause) })) : null)));

  if (l.kind === 'reference') { renderReference(main, l, { prev, next }); footer(main, prev, next); return; }

  /* ---------- section plan ---------- */
  const sections = [
    { id: 's-scene',   label: 'The scene' },
    { id: 's-beat',    label: 'The decision' },
    { id: 's-idea',    label: 'The idea' },
    { id: 's-work',    label: 'How it works' },
    { id: 's-wrong',   label: 'Where it breaks' },
    { id: 's-tools',   label: 'Tools' },
    { id: 's-you',     label: 'You and this role' },
    { id: 's-carry',   label: 'Carry this' }
  ];

  const body = el('div', {});
  const rail = el('aside', { class: 'lesson__rail' },
    el('div', { class: 'slug', style: { marginBottom: '.7rem' } }, 'This chapter'),
    sections.map(s => el('a', { class: 'rail-item', href: '#' + s.id }, s.label)),
    );

  main.appendChild(el('div', { class: 'wrapx' }, el('div', { class: 'lesson' }, body, rail)));

  const sc = l.scenario;

  /* 1 — the scene */
  body.appendChild(el('section', { class: 'sect reveal', id: 's-scene' },
    chapterMark('01 · The scene'),
    el('div', { class: 'scene' },
      el('div', { class: 'scene__slug' },
        el('span', { class: 'dotpulse' }),
        el('span', { class: 'slug' }, sc.slug),
        el('span', { style: { marginLeft: 'auto' } }, ev('fic'))),
      el('h2', { class: 'd-md', style: { marginBottom: '.8rem' } }, sc.title),
      el('p', { class: 'lead', style: { marginBottom: '1.6rem' }, html: rich(sc.premise) }),
      sc.scene.map(b => {
        if (b.t === 'line') return el('div', { class: 'beatline beatline--say' },
          el('span', { class: 'beatline__k' }, b.who), el('div', { class: 'beatline__b', html: rich(b.x) }));
        if (b.t === 'quote') return el('div', { class: 'beatline beatline--quote' },
          el('span', { class: 'beatline__k' }, 'inbox'), el('div', { class: 'beatline__b', html: rich(b.x) }));
        return el('div', { class: 'beatline beatline--do' },
          el('span', { class: 'beatline__k' }, ''), el('div', { class: 'beatline__b', html: rich(b.x) }));
      }))));

  /* 2 — the beat */
  const reveal = el('div', { hidden: true });
  const btn = el('button', { class: 'btn btn--go', onClick: () => {
    reveal.hidden = false; btn.remove();
    reveal.classList.add('beat__body');
    reveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }}, icon('down', 15), 'Show what a strong product manager does');

  reveal.append(
    el('div', { class: 'cardish cardish--bad', style: { marginBottom: '.9rem' } },
      el('div', { class: 'cardish__t' }, icon('x', 13), 'The easy answer, and why it costs'),
      el('p', { class: 'sm', html: rich(sc.beat.weak) })),
    el('div', { class: 'cardish cardish--good' },
      el('div', { class: 'cardish__t' }, icon('check', 13), 'What a strong answer contains'),
      el('ul', { class: 'sm', style: { paddingLeft: '1.1em' } }, sc.beat.strong.map(s => el('li', { html: rich(s) })))),
    el('div', { class: 'cardish cardish--note', style: { marginTop: '.9rem' } },
      el('div', { class: 'cardish__t' }, icon('film', 13), 'What happens next'),
      el('p', { class: 'sm', html: rich(sc.outcome) })));

  body.appendChild(el('section', { class: 'sect reveal', id: 's-beat' },
    chapterMark('02 · The decision'),
    el('div', { class: 'beat' },
      el('div', { class: 'slug', style: { marginBottom: '.8rem' } }, 'Stop here for a moment'),
      el('h2', { class: 'beat__q', style: { marginBottom: '1.2rem' } }, sc.beat.q),
      btn, reveal)));

  /* 3 — the idea */
  body.appendChild(el('section', { class: 'sect reveal', id: 's-idea' },
    chapterMark('03 · The idea you just watched'),
    el('div', { class: 'wrap', style: { marginBottom: '1rem' } }, ev('gen')),
    el('div', { class: 'pull', style: { marginBottom: '1.8rem' }, html: rich(sc.principle) }),
    el('div', { class: 'stack' },
      block('What it is', l.definition),
      block('Why it matters', l.why),
      block('When it is used', l.when))));

  /* 4 — how it works */
  body.appendChild(el('section', { class: 'sect reveal', id: 's-work' },
    chapterMark('04 · How it works'),
    el('div', { class: 'panel', style: { marginBottom: '1.1rem' } },
      el('h3', { class: 'h-md', style: { marginBottom: '.9rem' } }, 'Who is involved, and what each of them wants'),
      el('ul', { class: 'plist' }, l.people.map(pp =>
        el('li', {}, el('span', { class: 'plist__k' }, pp.who), el('span', { class: 'plist__v', html: rich(pp.does) }))))),
    el('div', { class: 'panel' },
      el('h3', { class: 'h-md', style: { marginBottom: '.9rem' } }, 'The shape of the work'),
      el('div', { class: 'quad' },
        quad('Inputs', l.inputs), quad('Activities', l.activities),
        quad('Outputs', l.outputs), quad('Outcomes', l.outcomes))),
    l.decisionRights ? el('div', { class: 'panel', style: { marginTop: '1.1rem' } },
      el('h3', { class: 'h-md', style: { marginBottom: '.4rem' } }, 'Who decides what'),
      el('p', { class: 'sm dim2', style: { marginBottom: '.9rem' } },
        'A defensible default, not a universal truth. In a newly formed hub this is exactly the table to write down and share for correction.'),
      el('div', { class: 'scroll-x' }, el('table', { class: 'tbl' },
        el('thead', {}, el('tr', {}, el('th', {}, 'Decision'), el('th', {}, 'You'), el('th', {}, 'Who else'), el('th', {}, 'Note'))),
        el('tbody', {}, l.decisionRights.map(d => el('tr', {},
          el('td', { style: { fontWeight: 550 } }, d.d),
          el('td', {}, el('span', { class: 'tag ' + (d.pm === 'Decide' ? 'tag--sage' : d.pm === 'Input only' ? 'tag--line' : 'tag--amber') }, d.pm)),
          el('td', { class: 'dim' }, d.o),
          el('td', { class: 'dim2 xs' }, d.n))))))) : null,
    l.example ? el('div', { class: 'panel panel--sunk', style: { marginTop: '1.1rem' } },
      el('div', { class: 'slug', style: { marginBottom: '.5rem' } }, 'A second angle'),
      el('h3', { class: 'h-md', style: { marginBottom: '.5rem' } }, l.example.title),
      el('p', { class: 'sm dim', html: rich(l.example.body) })) : null));

  /* 5 — where it breaks */
  body.appendChild(el('section', { class: 'sect reveal', id: 's-wrong' },
    chapterMark('05 · Where it breaks'),
    el('div', { class: 'cardish cardish--bad', style: { marginBottom: '1.2rem' } },
      el('div', { class: 'cardish__t' }, icon('alert', 13), 'In the scene, if you had got it wrong'),
      el('p', { class: 'sm', html: rich(sc.wrong) })),
    el('div', { class: 'panel' },
      el('h3', { class: 'h-md', style: { marginBottom: '.9rem' } }, 'The recurring mistakes'),
      el('div', { class: 'wrongright' }, l.mistakes.map(m =>
        el('div', { class: 'wrongright__r' },
          el('span', { class: 'wrongright__i', style: { color: 'var(--rose)' } }, '✗'),
          el('div', {},
            el('div', { style: { fontWeight: 550, fontSize: '.94rem', marginBottom: '.15rem' }, html: rich(m.mistake) }),
            el('div', { class: 'sm dim', html: rich('→ ' + m.instead) })))))) ));

  /* 6 — tools */
  body.appendChild(el('section', { class: 'sect reveal', id: 's-tools' },
    chapterMark('06 · Tools'),
    el('div', { class: 'panel' },
      el('div', { class: 'scroll-x' }, el('table', { class: 'tbl tbl--tools' }, el('tbody', {}, l.tools.map(t =>
        el('tr', {},
          el('td', { class: 'tbl__k' }, t.name),
          el('td', { class: 'dim', html: rich(t.note) }))))))),
    workedBlock(l.id, WORKED_LESSONS, 'Worked examples — the tools, filled in'),
    (l.glossary || []).length
      ? el('div', { style: { marginTop: '1.1rem' } }, termsBlock(l.glossary))
      : null));

  /* 7 — you and this role */
  const reqs = ((l.roleLink && l.roleLink.reqs) || []).map(id => REQUIREMENTS.find(r => r.id === id)).filter(Boolean);
  const evid = (l.youLink ? (l.youLink.evidence || []) : []).map(id => EVIDENCE_BY_ID[id]).filter(Boolean);
  const relatedQs = QUESTIONS.filter(q => (q.reqs || []).some(r => (l.roleLink.reqs || []).includes(r))).slice(0, 4);

  body.appendChild(el('section', { class: 'sect reveal', id: 's-you' },
    chapterMark('07 · You, and this role'),
    el('div', { class: 'g2', style: { gap: '1.1rem' } },
      el('div', { class: 'panel', style: { borderColor: 'color-mix(in srgb, var(--ink-3) 34%, transparent)' } },
        el('div', { class: 'wrap', style: { marginBottom: '.7rem' } }, ev('jd'), ev('int')),
        el('h3', { class: 'h-md', style: { marginBottom: '.6rem' } }, 'What this role does with it'),
        el('p', { class: 'sm', html: rich(l.roleLink.text) }),
        reqs.length ? el('div', { class: 'wrap', style: { marginTop: '.9rem' } },
          reqs.map(r => el('a', { class: 'tag tag--line', href: '#/lesson/ref-role', style: { textDecoration: 'none' } },
            icon('target', 11), r.area))) : null),
      l.youLink
        ? el('div', { class: 'panel', style: { borderColor: 'color-mix(in srgb, var(--sage) 34%, transparent)' } },
            el('div', { class: 'wrap', style: { marginBottom: '.7rem' } }, ev('cv'), ev('pf')),
            el('h3', { class: 'h-md', style: { marginBottom: '.6rem' } }, 'What you can already say'),
            el('p', { class: 'sm', html: rich(l.youLink.text) }),
            evid.length ? el('div', { class: 'stack', style: { '--gap': '.6rem', marginTop: '1rem' } },
              evid.map(x => el('div', { class: 'src' }, '“' + x.quote + '”',
                el('span', { class: 'src__a' }, (x.src === 'cv' ? 'Your CV' : 'cmmt.me') + ' · ' + (ROLE_LABEL[x.role] || ''))))) : null)
        : el('div', { class: 'cardish cardish--warn' },
            el('div', { class: 'cardish__t' }, icon('alert', 13), 'Nothing in your materials evidences this'),
            el('p', { class: 'sm' }, 'That is a flag, not a problem. Prepare a reasoned position rather than a claimed experience, and say plainly that this is something you have studied rather than practiced.'))),
    relatedQs.length ? el('div', { style: { marginTop: '1.2rem' } },
      el('div', { class: 'slug', style: { marginBottom: '.6rem' } }, 'Questions this chapter answers'),
      el('div', { class: 'wrap' }, relatedQs.map(q =>
        el('a', { class: 'tag tag--ice', href: '#/interview?q=' + q.id, style: { textDecoration: 'none' } },
          icon('chat', 11), q.q.length > 52 ? q.q.slice(0, 50) + '…' : q.q)))) : null));

  /* 8 — carry this */
  body.appendChild(el('section', { class: 'sect reveal', id: 's-carry' },
    chapterMark('08 · Carry this'),
    el('div', { class: 'panel panel--tall', style: { background: 'linear-gradient(160deg, var(--surface-2), var(--surface))' } },
      el('div', { class: 'stack', style: { '--gap': '1.1rem' } },
        sc.carry.map((c, i) => el('div', { class: 'row', style: { alignItems: 'flex-start', gap: '.9rem' } },
          el('span', { class: 'mono', style: { color: 'var(--amber)', paddingTop: '.35rem', flex: 'none' } }, '0' + (i + 1)),
          el('span', { style: { fontSize: '1.06rem', lineHeight: 1.5 }, html: rich(c) })))))));

  footer(main, prev, next);
  setTimeout(() => railSpy(rail, sections), 60);
}

function chapterMark(label) {
  return el('div', { class: 'mark' }, el('span', { class: 'mark__n' }, label), el('span', { class: 'mark__r' }));
}
function block(t, body) {
  return el('div', {},
    el('h3', { class: 'h-md', style: { marginBottom: '.4rem' } }, t),
    el('p', { class: 'dim', html: rich(body) }));
}
function quad(t, items) {
  return el('div', { class: 'quad__c' }, el('h4', {}, t), el('ul', {}, (items || []).map(i => el('li', { html: rich(i) }))));
}

export function footer(main, prev, next) {
  main.appendChild(el('div', { class: 'wrapx', style: { padding: '3.5rem 0 5rem' } },
    el('hr', { class: 'hr', style: { marginTop: 0 } }),
    el('div', { class: 'spread', style: { flexWrap: 'wrap', gap: '1rem' } },
      prev ? el('a', { class: 'btn', href: '#/lesson/' + prev.id }, icon('back', 14), prev.title) : el('a', { class: 'btn', href: '#/learn' }, icon('back', 14), 'The hub'),
      next ? el('a', { class: 'btn btn--go', href: '#/lesson/' + next.id }, next.title, icon('arrow', 14))
           : el('a', { class: 'btn btn--go', href: '#/interview' }, 'On to the interview answers', icon('arrow', 14)))));
}
