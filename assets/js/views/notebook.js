import { el, icon, pageHead, rich, tabs, clear, toast, timeAgo, savedTextarea, modal } from '../ui.js';
import { store } from '../store.js';
import { CONCEPT_BY_ID, CONCEPTS } from '../data/concepts.js';
import { QUESTION_BY_ID, QUESTIONS, CATEGORIES } from '../data/questions.js';
import { EVIDENCE_BY_ID } from '../data/profile.js';
import { REQUIREMENTS } from '../data/role.js';

export function renderNotebook(page, { go }) {
  const s = store.get();
  page.appendChild(pageHead({
    eyebrow: 'Your notebook',
    title: 'Everything you have written',
    lead: 'Your drafted answers, your own-words explanations, your notes and your bookmarks — collected in one place so you can read them the morning of the interview. All of it lives in this browser only.',
    actions: [
      el('button', { class: 'btn', onClick: () => window.print() }, icon('download', 15), 'Print / save as PDF')
    ]
  }));

  page.appendChild(tabs([
    { label: 'Answers',      render: () => answersView() },
    { label: 'Explanations', render: () => explanationsView() },
    { label: 'Notes',        render: () => notesView() },
    { label: 'Bookmarks',    render: () => bookmarksView() },
    { label: 'One-pager',    render: () => onePager() }
  ]));
}

function answersView() {
  const items = QUESTIONS.filter(q => (store.entry('questions', q.id, {}).answer || '').trim());
  if (!items.length) return empty('No answers drafted yet.', 'Open the question bank and start with the ones marked very likely.', 'interview');
  return el('div', { class: 'stack' },
    el('p', { class: 't-sm muted' }, `${items.length} drafted.`),
    ...items.map(q => {
      const e = store.entry('questions', q.id, {});
      return el('div', { class: 'card' },
        el('div', { class: 'spread', style: { marginBottom: '.35rem', gap: '.7rem', alignItems: 'flex-start' } },
          el('div', {},
            el('div', { class: 'row-wrap', style: { marginBottom: '.2rem' } },
              el('span', { class: 'chip chip--outline' }, (CATEGORIES.find(c => c.id === q.cat) || {}).label)),
            el('div', { style: { fontWeight: 560 } }, q.q)),
          el('a', { class: 'iconbtn focus-hide', href: '#/question/' + q.id, title: 'Edit' }, icon('arrow', 15))),
        el('p', { class: 't-sm muted', style: { whiteSpace: 'pre-wrap' } }, e.answer));
    }));
}

function explanationsView() {
  const items = CONCEPTS.filter(c => (store.entry('concepts', c.id, {}).ownWords || '').trim() ||
                                     (store.entry('concepts', c.id, {}).teachText || '').trim());
  if (!items.length) return empty('Nothing written yet.', 'Each study session asks you to write the idea in your own words. That is the step that makes it usable.', 'knowledge');
  return el('div', { class: 'stack' },
    ...items.map(c => {
      const e = store.entry('concepts', c.id, {});
      return el('div', { class: 'card' },
        el('div', { class: 'spread', style: { marginBottom: '.4rem' } },
          el('h3', { class: 't-h3' }, c.title),
          el('a', { class: 'iconbtn focus-hide', href: '#/study/' + c.id, title: 'Open session' }, icon('arrow', 15))),
        e.ownWords ? el('div', { style: { marginBottom: e.teachText ? '.7rem' : 0 } },
          el('div', { class: 't-eyebrow', style: { marginBottom: '.2rem' } }, 'In your own words'),
          el('p', { class: 't-sm muted', style: { whiteSpace: 'pre-wrap' } }, e.ownWords)) : null,
        e.teachText ? el('div', {},
          el('div', { class: 't-eyebrow', style: { marginBottom: '.2rem' } }, 'Teach-back' + (e.taught ? ' ✓' : '')),
          el('p', { class: 't-sm muted', style: { whiteSpace: 'pre-wrap' } }, e.teachText)) : null);
    }));
}

function notesView() {
  const box = el('div', { class: 'stack' });
  const ta = el('textarea', { class: 'textarea', rows: 3, placeholder: 'A thought, a question to ask them, something to check…' });
  const list = el('div', { class: 'stack', style: { '--gap': '.5rem' } });

  const paint = () => {
    const notes = store.get().notes;
    clear(list);
    if (!notes.length) { list.appendChild(el('div', { class: 'empty t-sm' }, 'No notes yet.')); return; }
    notes.forEach(n => list.appendChild(el('div', { class: 'card' },
      el('div', { class: 'spread', style: { marginBottom: '.25rem' } },
        el('span', { class: 't-xs muted2' }, timeAgo(n.at) + (n.scopeLabel ? ' · ' + n.scopeLabel : '')),
        el('button', { class: 'iconbtn focus-hide', title: 'Delete', onClick: () => { store.removeNote(n.id); paint(); toast('Deleted'); } }, icon('x', 14))),
      el('p', { class: 't-sm', style: { whiteSpace: 'pre-wrap' } }, n.text))));
  };

  box.append(
    el('div', { class: 'card' }, ta,
      el('div', { style: { marginTop: '.5rem', textAlign: 'right' } },
        el('button', { class: 'btn btn--primary', onClick: () => {
          const v = ta.value.trim(); if (!v) return;
          store.addNote('general', '', v); ta.value = ''; paint(); toast('Saved');
        }}, icon('plus', 14), 'Add note'))),
    list);
  paint();
  return box;
}

function bookmarksView() {
  const bm = store.get().bookmarks.slice().reverse();
  if (!bm.length) return empty('Nothing bookmarked.', 'Use the bookmark icon on any session or question to collect the ones you want to come back to.', 'knowledge');
  return el('div', { class: 'card card--flush' },
    bm.map((b, i) => el('a', {
      href: '#/' + (b.type === 'concept' ? 'study/' : 'question/') + b.id,
      style: { display: 'flex', gap: '.6rem', alignItems: 'center', padding: '.75rem .9rem',
               borderTop: i ? '1px solid var(--line)' : 'none', textDecoration: 'none', color: 'inherit' }
    },
      el('span', { class: 'chip chip--outline', style: { flex: 'none' } }, b.type === 'concept' ? 'Session' : 'Question'),
      el('span', { class: 'grow t-sm' }, b.label),
      icon('arrow', 14))));
}

/* the interview-morning one-pager */
function onePager() {
  const strong = REQUIREMENTS.filter(r => r.fit === 'strong').slice(0, 4);
  const gaps = REQUIREMENTS.filter(r => r.fit === 'gap');
  const criticalQs = QUESTIONS.filter(q => q.likely === 'near-certain' || q.likely === 'certain');
  const drafted = criticalQs.filter(q => (store.entry('questions', q.id, {}).answer || '').trim());

  return el('div', { class: 'stack' },
    el('div', { class: 'note note--info' },
      el('div', { class: 'note__title' }, icon('clock', 14), 'For the morning of'),
      'One page to read twenty minutes before. Not to revise from — to settle with. Use Print above to save it.'),

    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Lead with these'),
      el('ol', { class: 't-sm' },
        el('li', {}, el('strong', {}, 'Three years leading a SaaS sales team.'), ' You have been on the other side of the Sales–Product interface this role puts at its centre.'),
        el('li', {}, el('strong', {}, 'You framed, specified and built the pricing application.'), ' Nobody asked you to. It is in ongoing internal use, with control built into the task rather than reported afterwards.'),
        el('li', {}, el('strong', {}, 'You own data quality as a product attribute.'), ' Hierarchies, classifications, commercial attributes and supplier references across SAP, PIM and digital channels, in two markets.'),
        el('li', {}, el('strong', {}, 'You state what your evidence does not prove.'), ' That reads as senior. Keep doing it.'))),

    el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--rose) 28%, transparent)' } },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Where you will be pressed'),
      el('ul', { class: 't-sm' },
        gaps.map(g => el('li', {}, el('strong', {}, g.title + '. '), g.action)))),

    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Your questions for them'),
      el('ul', { class: 't-sm' },
        el('li', {}, 'What are the exit criteria for each DUP phase, and who decides at each gate?'),
        el('li', {}, 'Where does the product manager\'s decision right end today — do I own the roadmap, or recommend it?'),
        el('li', {}, 'How much of go-to-market runs through partners versus direct, and how does that change what the product team optimises for?'),
        el('li', {}, 'What does the hub not yet have that it will need in six months?'))),

    el('div', { class: 'card card--tint' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Preparation status'),
      el('ul', { class: 't-sm muted' },
        el('li', {}, `${drafted.length} of ${criticalQs.length} very likely questions drafted.`),
        el('li', {}, `${store.get().mock.length} mock session${store.get().mock.length === 1 ? '' : 's'} completed.`),
        el('li', {}, `${CONCEPTS.filter(c => (store.entry('concepts', c.id, {}).ownWords || '').trim()).length} concepts written in your own words.`)),
      drafted.length < criticalQs.length ? el('div', { class: 'row-wrap', style: { marginTop: '.6rem' } },
        el('a', { class: 'btn btn--sm btn--primary', href: '#/interview?c=all' }, 'Draft the rest')) : null),

    el('div', { class: 'note note--warn' },
      el('div', { class: 'note__title' }, icon('alert', 14), 'Two things not to do'),
      el('ul', { class: 't-sm', style: { marginBottom: 0 } },
        el('li', {}, 'Do not claim automotive familiarity you do not have, and do not guess at DUP. Both are checkable and both cost more than the gap itself.'),
        el('li', {}, 'Do not recite an answer from this site word for word. A memorised answer is audible, and the follow-up question will find the seam.'))));
}

function empty(title, body, route) {
  return el('div', { class: 'empty' },
    icon('notebook', 30, 1.4),
    el('h3', { class: 't-h3', style: { margin: '.4rem 0 .2rem' } }, title),
    el('p', { class: 't-sm', style: { maxWidth: '44ch', margin: '0 auto .9rem' } }, body),
    el('a', { class: 'btn btn--primary', href: '#/' + route }, 'Go there'));
}
