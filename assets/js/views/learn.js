import { el, icon, rich, ev } from '../ui.js';
import { PARTS, LESSONS, lessonsIn, TOTAL_MINUTES } from '../data/curriculum.js';
import { store } from '../store.js';

export function renderLearn(main) {
  const readCount = LESSONS.filter(l => store.isRead(l.id)).length;
  const next = LESSONS.find(l => !store.isRead(l.id)) || LESSONS[0];

  main.appendChild(el('section', { class: 'hero', style: { paddingBottom: '2rem' } },
    el('div', { class: 'hero__glow' }),
    el('div', { class: 'wrapx', style: { position: 'relative' } },
      el('div', { class: 'slug' }, 'One hub · eight parts · ' + LESSONS.length + ' chapters'),
      el('h1', { class: 'd-lg anim-rise', style: { margin: '1rem 0 1.2rem', maxWidth: '17ch' } },
        'The whole field, taught inside one job.'),
      el('p', { class: 'lead read anim-rise', style: { animationDelay: '.07s' },
        html: rich('Three orientation chapters first — the role and where you genuinely fit, the business you would be joining, and an inventory of everything your own record proves. Then twenty-nine craft lessons. Each one opens on a scene from the job, stops at the decision, and only then names the idea. Every lesson carries three strands: the **general practice**, **what your own experience already gives you**, and **what this role does with it**.') }),
      el('div', { class: 'wrap anim-rise', style: { marginTop: '1.8rem', animationDelay: '.14s' } },
        el('a', { class: 'btn btn--go', href: '#/lesson/' + next.id },
          icon('arrow', 15), readCount ? 'Continue — ' + next.title : 'Begin'),
        el('span', { class: 'tag tag--line' }, readCount + ' of ' + LESSONS.length + ' read'),
        el('span', { class: 'tag tag--line' }, '≈' + Math.round(TOTAL_MINUTES / 60) + ' hours'),
        el('button', { class: 'btn btn--sm btn--ghost', onClick: () => {
          if (confirm('Clear the read markers? Nothing else is stored.')) { store.reset(); location.reload(); }
        }}, 'Reset markers')))));

  main.appendChild(el('div', { class: 'wrapx', style: { paddingBottom: '5rem' } },
    PARTS.map((part, i) => {
      const items = lessonsIn(part.id);
      const done = items.filter(l => store.isRead(l.id)).length;
      return el('section', { class: 'partcard reveal', style: { marginTop: i ? '3rem' : '1rem' } },
        el('div', { class: 'spread', style: { alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' } },
          el('div', { style: { maxWidth: '62ch' } },
            el('div', { class: 'wrap', style: { marginBottom: '.45rem' } },
              el('span', { class: 'tag tag--amber mono' }, 'PART ' + part.n),
              part.kind === 'reference' ? el('span', { class: 'tag tag--ice' }, 'Reference') : null,
              el('span', { class: 'xs dim2' }, done + '/' + items.length)),
            el('h2', { class: 'd-md', style: { marginBottom: '.5rem' } }, part.title),
            el('p', { class: 'dim' }, part.blurb))),
        el('div', {}, items.map(l => row(l))));
    })));
}

function row(l) {
  const done = store.isRead(l.id);
  return el('a', { class: 'lessonrow' + (done ? ' done' : ''), href: '#/lesson/' + l.id },
    el('span', { class: 'lessonrow__n' }, done ? '✓' : String(l.n).padStart(2, '0')),
    el('span', {},
      el('span', { class: 'lessonrow__t' }, l.title),
      el('span', { class: 'lessonrow__s' }, l.oneLine)),
    el('span', { class: 'lessonrow__x' }, (l.minutes || 10) + 'm'));
}
