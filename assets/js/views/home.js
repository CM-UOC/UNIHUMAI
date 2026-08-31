import { el, icon, rich, rx, ev } from '../ui.js';
import { PARTS, LESSONS, TOTAL_MINUTES, lessonsIn } from '../data/curriculum.js';
import { QUESTIONS, CATEGORIES } from '../data/questions.js';
import { ROLE } from '../data/role.js';
import { PREMISE, PRODUCT, DISCLAIMER } from '../data/world.js';
import { PROFILE } from '../data/profile.js';
import { store } from '../store.js';

export function renderHome(main) {
  /* ---------- hero ---------- */
  main.appendChild(el('section', { class: 'hero', style: { paddingBottom: '2.5rem' } },
    el('div', { class: 'hero__glow' }),
    el('div', { class: 'wrapx', style: { position: 'relative' } },
      el('div', { class: 'slug anim-fade' }, 'Product management · prepared for one role'),
      el('h1', { class: 'd-xl anim-rise', style: { margin: '1.2rem 0 1.4rem', maxWidth: '15ch' } },
        'Learn it inside ', el('span', { class: 'amber' }, 'the job'), '.'),
      el('p', { class: 'lead anim-rise', style: { maxWidth: '58ch', animationDelay: '.08s' },
        html: rich(`Every idea here is taught through one continuous case, set inside the **${ROLE.title}** role at **${ROLE.employer}** — then connected to what your own CV and portfolio already prove. Two places to go, and nothing to score.`) }),
      el('div', { class: 'wrap anim-rise', style: { marginTop: '2.2rem', gap: '.7rem', animationDelay: '.16s' } },
        el('a', { class: 'btn btn--go', href: '#/learn' }, icon('book', 16), 'Open the learning hub', icon('arrow', 15)),
        el('a', { class: 'btn', href: '#/interview' }, icon('chat', 16), 'Interview answers')))));

  /* ---------- two doors ---------- */
  main.appendChild(el('section', { class: 'wrapx', style: { paddingBottom: '3rem' } },
    el('div', { class: 'g2', style: { gap: '1.2rem' } },
      door({
        tag: 'One', title: 'The learning hub',
        line: 'Thirty-two chapters in eight parts. Three of orientation — the role and your fit, the business, your own record — then twenty-nine craft lessons, each opening on a scene from the job.',
        stats: [`${LESSONS.length} chapters`, `${Math.round(TOTAL_MINUTES / 60)} hours`, `${store.count()} read`],
        href: '#/learn', cta: 'Start at chapter one'
      }),
      door({
        tag: 'Two', title: 'Interview answers',
        line: `${QUESTIONS.length} questions across ${CATEGORIES.length} categories, each already answered in full — grounded only in what your materials actually say, with what the interviewer is testing, the follow-ups, and where a weak answer goes wrong.`,
        stats: [`${QUESTIONS.length} questions`, 'answers written out', 'nothing to fill in'],
        href: '#/interview', cta: 'Read the answers'
      }))));

  /* ---------- the case ---------- */
  main.appendChild(el('section', { class: 'wrapx reveal', style: { paddingBottom: '3.5rem' } },
    el('div', { class: 'scene' },
      el('div', { class: 'scene__slug' },
        el('span', { class: 'dotpulse' }),
        el('span', { class: 'slug' }, 'The case you will be inside for twenty-nine lessons'),
        el('span', { style: { marginLeft: 'auto' } }, ev('fic'))),
      el('h2', { class: 'd-md', style: { marginBottom: '.9rem', maxWidth: '20ch' } }, PREMISE.headline),
      el('p', { class: 'lead', style: { maxWidth: '62ch' } }, PREMISE.body),
      el('div', { class: 'g3', style: { marginTop: '1.8rem' } },
        mini('The product', PRODUCT.name, PRODUCT.what),
        mini('Where it stands', 'Week 11 of 16', PRODUCT.stage),
        mini('Why it matters', 'Nothing is abstract', 'Each lesson opens on a scene, stops at the decision, and only then names the idea you just watched being used.')),
      el('p', { class: 'fine', style: { marginTop: '1.6rem' } }, DISCLAIMER))));

  /* ---------- what it is built from ---------- */
  main.appendChild(el('section', { class: 'wrapx reveal', style: { paddingBottom: '4rem' } },
    el('div', { class: 'mark' }, el('span', { class: 'mark__n' }, 'SOURCES'), el('span', { class: 'mark__r' })),
    el('div', { class: 'g3' },
      src('cv', 'Your CV', PROFILE.headline, 'Roles, responsibilities, competencies and tools — quoted, never paraphrased into something stronger.'),
      src('pf', 'cmmt.me', 'Your professional portfolio', 'The pricing application, the seven B2B decision frameworks, your six stated method principles, the coursework ventures and their evidence boundaries.'),
      src('jd', 'The advertisement', `${ROLE.title} · ${ROLE.ref}`, 'Every responsibility and requirement, decomposed and mapped against the two above.')),
    el('div', { class: 'cardish cardish--note', style: { marginTop: '1.2rem' } },
      el('div', { class: 'cardish__t' }, icon('alert', 13), 'How to read the labels'),
      rx('**From your CV** and **From your portfolio** are quoted from your materials. **From the job ad** is quoted from the advertisement. **Interpretation** is a reasonable reading, not a stated fact. **General PM practice** is standard craft, not specific to you. **Verify before using** is uncertain — ask rather than assume. **Constructed case** is the invented scenario world, which must never be repeated as fact. Nothing here invents experience you do not have, and no interview question is presented as guaranteed.'))));

  /* ---------- the map ---------- */
  main.appendChild(el('section', { class: 'wrapx reveal', style: { paddingBottom: '5rem' } },
    el('div', { class: 'mark' }, el('span', { class: 'mark__n' }, 'THE MAP'), el('span', { class: 'mark__r' })),
    el('div', { class: 'g2' }, PARTS.map(part =>
      el('a', { class: 'panel', href: '#/learn', style: { textDecoration: 'none', display: 'block' } },
        el('div', { class: 'wrap', style: { marginBottom: '.5rem' } },
          el('span', { class: 'tag tag--line mono' }, 'PART ' + part.n),
          el('span', { class: 'xs dim2' }, lessonsIn(part.id).length + ' chapters')),
        el('h3', { class: 'h-lg', style: { marginBottom: '.4rem' } }, part.title),
        el('p', { class: 'sm dim' }, part.blurb))))));
}

function door({ tag, title, line, stats, href, cta }) {
  return el('a', { class: 'panel panel--tall reveal', href, style: { textDecoration: 'none', display: 'block' } },
    el('span', { class: 'tag tag--amber mono' }, tag),
    el('h2', { class: 'd-md', style: { margin: '.9rem 0 .7rem' } }, title),
    el('p', { class: 'dim', style: { marginBottom: '1.3rem' } }, line),
    el('div', { class: 'wrap', style: { marginBottom: '1.4rem' } },
      stats.map(s => el('span', { class: 'tag tag--line' }, s))),
    el('span', { class: 'btn btn--sm' }, cta, icon('arrow', 14)));
}

function mini(k, t, b) {
  return el('div', {},
    el('div', { class: 'slug', style: { marginBottom: '.4rem' } }, k),
    el('div', { style: { fontWeight: 600, marginBottom: '.25rem' } }, t),
    el('p', { class: 'sm dim' }, b));
}

function src(kind, title, sub, body) {
  return el('div', { class: 'panel panel--sunk' },
    ev(kind),
    el('div', { style: { fontWeight: 600, margin: '.7rem 0 .1rem' } }, title),
    el('div', { class: 'xs dim2', style: { marginBottom: '.6rem' } }, sub),
    el('p', { class: 'sm dim' }, body));
}
