/* ============================================================
   session.js — the guided study session player
   One concept, seven steps, active recall at every stage.
   ============================================================ */

import { el, $, $$, icon, rich, rx, clear, toast, savedTextarea, bookmarkBtn, confidenceRater, bar, CONFIDENCE_LABELS } from '../ui.js';
import { store } from '../store.js';
import { CONCEPTS, CONCEPT_BY_ID, MODULES } from '../data/concepts.js';
import { EVIDENCE_BY_ID, ROLE_LABEL } from '../data/profile.js';
import { REQUIREMENTS } from '../data/role.js';
import { GLOSSARY_BY_ID } from '../data/glossary.js';
import { conceptLevel, LADDER } from '../progress.js';

export function renderSession(page, { param, go }) {
  const c = CONCEPT_BY_ID[param];
  if (!c) { page.appendChild(el('div', { class: 'note note--bad' }, 'No such session.')); return; }
  const mod = MODULES.find(m => m.id === c.module);
  const idx = CONCEPTS.indexOf(c);
  const prev = CONCEPTS[idx - 1], next = CONCEPTS[idx + 1];

  const steps = [
    { key: 'orient',  label: 'Orientation', build: () => stepOrient(c, mod) },
    { key: 'core',    label: 'Core idea',   build: () => stepCore(c) },
    { key: 'practice',label: 'In practice', build: () => stepPractice(c) },
    { key: 'traps',   label: 'Traps',       build: () => stepTraps(c) },
    { key: 'connect', label: 'Your link',   build: () => stepConnect(c) },
    { key: 'check',   label: 'Check',       build: () => stepCheck(c) },
    { key: 'teach',   label: 'Teach back',  build: () => stepTeach(c) }
  ];

  let cur = 0;
  const entry = store.entry('concepts', c.id, {});
  if (entry.read && !entry.checkPassed) cur = 5;

  /* header */
  const head = el('header', { class: 'pagehead' },
    el('div', { class: 'spread', style: { marginBottom: '.4rem' } },
      el('div', { class: 'row-wrap' },
        el('a', { class: 'chip chip--outline', href: '#/knowledge', style: { textDecoration: 'none' } },
          backChevron(), ` Module ${mod.n} · ${mod.title}`),
        el('span', { class: 'chip chip--outline' }, `Session ${c.order} of ${CONCEPTS.length}`),
        el('span', { class: 'chip chip--outline' }, `~${c.minutes} min`)),
      el('div', { class: 'row focus-hide' },
        bookmarkBtn('concept', c.id, c.title),
        el('a', { class: 'iconbtn', href: '#/concept/' + c.id, title: 'Reference view — everything on one page' }, icon('book', 16)))),
    el('h1', { class: 'pagehead__t t-h1' }, c.title),
    el('p', { class: 't-lead measure' }, c.oneLine),
    c.chosenBecause ? el('div', { class: 'note', style: { marginTop: '.8rem', borderColor: 'color-mix(in srgb, var(--violet) 30%, transparent)', background: 'var(--violet-soft)' } },
      el('div', { class: 'note__title' }, icon('star', 14), 'Why this one is in your curriculum'),
      el('span', { class: 't-sm', style: { color: 'var(--ink)' } }, c.chosenBecause)) : null
  );
  page.appendChild(head);

  /* progress rail */
  const rail = el('div', { class: 'card card--tint', style: { marginBottom: '1.1rem', padding: '.65rem .8rem' } });
  const body = el('div', { class: 'anim-fade' });
  const foot = el('div', { class: 'spread', style: { marginTop: '1.4rem', gap: '.5rem', flexWrap: 'wrap' } });

  function paintRail() {
    clear(rail);
    rail.appendChild(el('div', { class: 'row-wrap', style: { gap: '.3rem' } },
      steps.map((s, i) => el('button', {
        class: 'pill', 'aria-pressed': i === cur ? 'true' : 'false',
        style: i < cur ? { color: 'var(--teal)', borderColor: 'color-mix(in srgb, var(--teal) 40%, transparent)' } : {},
        onClick: () => { cur = i; paint(); }
      }, i < cur ? '✓ ' : '', s.label))));
    rail.appendChild(el('div', { style: { marginTop: '.5rem' } }, bar((cur + 1) / steps.length)));
  }

  function paint() {
    paintRail();
    clear(body).appendChild(steps[cur].build());
    body.classList.remove('anim-fade'); void body.offsetWidth; body.classList.add('anim-fade');
    clear(foot);
    foot.appendChild(cur > 0
      ? el('button', { class: 'btn', onClick: () => { cur--; paint(); window.scrollTo({top:0}); } }, icon('chevron', 13), ' Back')
      : (prev ? el('a', { class: 'btn', href: '#/study/' + prev.id }, backChevron(), ' ' + prev.title) : el('span')));
    if (cur < steps.length - 1) {
      foot.appendChild(el('button', { class: 'btn btn--primary', onClick: () => {
        if (cur === 0) store.patch('concepts', c.id, { read: true }, true);
        cur++; paint(); window.scrollTo({ top: 0 });
      }}, 'Continue', icon('arrow', 14)));
    } else {
      foot.appendChild(next
        ? el('a', { class: 'btn btn--primary', href: '#/study/' + next.id }, 'Next session: ' + next.title, icon('arrow', 14))
        : el('a', { class: 'btn btn--primary', href: '#/knowledge' }, 'Back to the path', icon('arrow', 14)));
    }
  }

  page.appendChild(rail);
  page.appendChild(body);
  page.appendChild(foot);
  store.patch('concepts', c.id, { read: true }, true);
  paint();
}

/* ---------------- steps ---------------- */

function stepOrient(c, mod) {
  const lvl = conceptLevel(c.id);
  return el('div', { class: 'stack' },
    el('div', { class: 'card' },
      el('div', { class: 't-eyebrow' }, 'Before you read'),
      el('p', { class: 't-lead', style: { marginTop: '.3rem' } },
        rx(`What do you already believe **${c.title.toLowerCase()}** means? Write it now, before the definition. You will compare the two at the end — and the gap between them is the part worth remembering.`)),
      el('div', { style: { marginTop: '.7rem' } },
        savedTextarea({
          value: store.entry('concepts', c.id, {}).priorGuess || '',
          rows: 3,
          placeholder: 'A sentence or two. Rough is fine — this is a prediction, not an answer.',
          label: 'Your prior understanding',
          onSave: v => store.patch('concepts', c.id, { priorGuess: v }, true)
        }))),
    el('div', { class: 'grid grid--2' },
      el('div', { class: 'card card--tint' },
        el('div', { class: 't-eyebrow' }, 'You will be able to'),
        el('ul', { class: 't-sm', style: { marginTop: '.4rem' } },
          el('li', {}, 'Define it in one sentence without notes'),
          el('li', {}, 'Name who is involved and what they each want'),
          el('li', {}, 'Give a concrete example from a data business'),
          el('li', {}, 'Say how it applies to the GIS:Hub role'),
          c.youLink ? el('li', {}, 'Connect it to something you have actually done') : null)),
      el('div', { class: 'card card--tint' },
        el('div', { class: 't-eyebrow' }, 'Where you are'),
        el('div', { class: 'row-wrap', style: { marginTop: '.4rem' } },
          LADDER.slice(1).map(l => el('span', {
            class: 'chip ' + (lvl >= l.n ? 'chip--teal' : 'chip--outline'), title: l.hint
          }, lvl >= l.n ? '✓ ' : '', l.label))),
        (c.depends || []).length ? el('p', { class: 't-xs muted2', style: { marginTop: '.6rem' } },
          'Builds on: ' + c.depends.map(d => (CONCEPT_BY_ID[d] || {}).title).filter(Boolean).join(', ')) : null)));
}

function stepCore(c) {
  return el('div', { class: 'stack' },
    card('What it is', c.definition, 'general'),
    card('Why it matters', c.why, 'general'),
    card('When and how it is used', c.when, 'general'),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.55rem' } }, 'Who is involved, and what each of them wants'),
      el('table', { class: 'tbl tbl--zebra' }, el('tbody', {},
        c.people.map(p => el('tr', {},
          el('td', { style: { fontWeight: 550, whiteSpace: 'nowrap' } }, p.who),
          el('td', { class: 'muted' }, p.does)))))),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'The shape of the work'),
      el('div', { class: 'iaoo' },
        iaoo('Inputs', c.inputs), iaoo('Activities', c.activities),
        iaoo('Outputs', c.outputs), iaoo('Outcomes', c.outcomes))),
    (c.glossary || []).length ? el('div', { class: 'card card--tint' },
      el('div', { class: 't-eyebrow', style: { marginBottom: '.4rem' } }, 'Terms introduced here'),
      el('div', { class: 'row-wrap' }, c.glossary.map(g => {
        const t = GLOSSARY_BY_ID[g];
        return t ? el('a', { class: 'chip chip--outline', href: '#/glossary?t=' + g, title: t.def, style: { textDecoration: 'none' } }, t.term) : null;
      }))) : null);
}

function stepPractice(c) {
  return el('div', { class: 'stack' },
    el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.4rem' } },
        el('span', { class: 'chip chip--accent chip--dot' }, 'Worked example'),
        el('span', { class: 'ev ev--general' }, 'Illustrative')),
      el('h3', { class: 't-h3', style: { marginBottom: '.4rem' } }, c.example.title),
      el('p', { html: rich(c.example.body) })),
    el('div', { class: 'card' },
      el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Tools and frameworks worth knowing'),
      el('table', { class: 'tbl' }, el('tbody', {},
        c.tools.map(t => el('tr', {},
          el('td', { style: { fontWeight: 550, whiteSpace: 'nowrap' } }, t.name),
          el('td', { class: 'muted' }, t.note)))))),
    el('div', { class: 'note note--info' },
      el('div', { class: 'note__title' }, icon('alert', 14), 'A caution about frameworks'),
      'Naming a framework in an interview earns nothing on its own. What earns credit is choosing the right one for the question, saying why, and being willing to work outside it when it does not fit.'));
}

function stepTraps(c) {
  return el('div', { class: 'stack' },
    el('p', { class: 't-lead measure' },
      'These are the errors that show up most often — including in interviews, where naming the mistake before the interviewer does is a strong signal.'),
    el('div', { class: 'stack', style: { '--gap': '.6rem' } },
      c.mistakes.map(m => el('div', { class: 'card' },
        el('div', { class: 'row', style: { alignItems: 'flex-start', gap: '.55rem', marginBottom: '.35rem' } },
          el('span', { class: 'chip chip--rose', style: { flex: 'none' } }, '✗'),
          el('span', { style: { fontWeight: 560 } }, m.mistake)),
        el('div', { class: 'row', style: { alignItems: 'flex-start', gap: '.55rem' } },
          el('span', { class: 'chip chip--teal', style: { flex: 'none' } }, '→'),
          el('span', { class: 'muted' }, m.instead))))));
}

function stepConnect(c) {
  const reqs = (c.roleLink.reqs || []).map(id => REQUIREMENTS.find(r => r.id === id)).filter(Boolean);
  const ev = c.youLink ? (c.youLink.evidence || []).map(id => EVIDENCE_BY_ID[id]).filter(Boolean) : [];
  const e = store.entry('concepts', c.id, {});

  return el('div', { class: 'stack' },
    el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--ink-3) 35%, transparent)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.45rem' } },
        el('span', { class: 'ev ev--jd' }, 'From the job ad'),
        el('span', { class: 'ev ev--interp' }, 'Interpretation')),
      el('h3', { class: 't-h3', style: { marginBottom: '.35rem' } }, 'Why this matters for the GIS:Hub role'),
      el('p', { html: rich(c.roleLink.text) }),
      reqs.length ? el('div', { class: 'row-wrap', style: { marginTop: '.6rem' } },
        reqs.map(r => el('a', { class: 'chip chip--outline', href: '#/rolefit?r=' + r.id, style: { textDecoration: 'none' } },
          icon('target', 11), r.title.length > 44 ? r.title.slice(0, 42) + '…' : r.title))) : null),

    c.youLink ? el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--teal) 32%, transparent)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.45rem' } },
        el('span', { class: 'ev ev--cv' }, 'Grounded in your materials')),
      el('h3', { class: 't-h3', style: { marginBottom: '.35rem' } }, 'What you can already say about this'),
      el('p', { html: rich(c.youLink.text) }),
      ev.length ? el('div', { class: 'stack', style: { '--gap': '.4rem', marginTop: '.7rem' } },
        ev.map(x => el('div', { class: 'quote' },
          '“' + x.quote + '”',
          el('div', { class: 't-xs muted2', style: { fontStyle: 'normal', marginTop: '.2rem' } },
            (x.src === 'cv' ? 'Your CV' : 'cmmt.me') + ' · ' + (ROLE_LABEL[x.role] || ''))))) : null)
      : el('div', { class: 'note note--warn' },
          el('div', { class: 'note__title' }, icon('alert', 14), 'No evidence in your materials for this one'),
          'Nothing in your CV or portfolio evidences this directly. That is not a problem — it is a flag. Prepare a reasoned position rather than a claimed experience, and be ready to say plainly that it is something you have studied rather than practised.'),

    el('div', { class: 'card' },
      el('div', { class: 't-eyebrow' }, 'Write it in your own words'),
      el('p', { class: 't-sm muted', style: { margin: '.3rem 0 .6rem' } }, c.ownWords),
      savedTextarea({
        value: e.ownWords || '', rows: 6, minHeight: '140px',
        placeholder: 'Write it as if explaining to a colleague. Aim for specifics from your own work rather than general statements.',
        label: 'Your explanation',
        onSave: v => store.patch('concepts', c.id, { ownWords: v })
      }),
      e.priorGuess ? el('details', { style: { marginTop: '.7rem' } },
        el('summary', { class: 't-sm muted', style: { cursor: 'pointer' } }, 'Compare with what you wrote before reading'),
        el('div', { class: 'quote quote--acc', style: { marginTop: '.4rem' } }, e.priorGuess)) : null),

    el('div', { class: 'card card--tint' },
      el('div', { class: 'spread', style: { flexWrap: 'wrap', gap: '.6rem' } },
        el('div', {},
          el('div', { class: 't-eyebrow' }, 'Confidence'),
          el('p', { class: 't-sm muted', style: { marginTop: '.2rem' } }, 'Honest ratings drive your study plan and your readiness score.')),
        confidenceRater(e.confidence, v => {
          store.patch('concepts', c.id, { confidence: v });
          toast('Rated: ' + CONFIDENCE_LABELS[v]);
        }))));
}

function stepCheck(c) {
  const wrap = el('div', { class: 'stack' });
  const e = store.entry('concepts', c.id, {});
  wrap.appendChild(el('p', { class: 't-lead measure' },
    'One question. Answer it before scrolling back — retrieval is what builds the memory, not re-reading.'));

  const box = el('div', { class: 'card' },
    el('h3', { class: 't-h3', style: { marginBottom: '.7rem' } }, c.check.q));
  const opts = el('div', { class: 'stack', style: { '--gap': '.45rem' } });
  const explain = el('div', { hidden: true, style: { marginTop: '.8rem' } });

  c.check.options.forEach((text, i) => {
    const b = el('button', { class: 'opt' },
      el('span', { class: 'opt__key' }, 'ABCD'[i]),
      el('span', {}, text));
    b.addEventListener('click', () => {
      const correct = i === c.check.answer;
      $$('.opt', opts).forEach((x, j) => {
        x.disabled = true;
        if (j === c.check.answer) x.dataset.state = 'correct';
        else if (j === i) x.dataset.state = 'wrong';
      });
      explain.hidden = false;
      clear(explain).appendChild(el('div', { class: 'note ' + (correct ? 'note--good' : 'note--warn') },
        el('div', { class: 'note__title' }, icon(correct ? 'check' : 'alert', 14), correct ? 'Correct' : 'Not quite'),
        rx(c.check.why)));
      store.patch('concepts', c.id, { checkPassed: true, checkCorrect: correct });
      toast(correct ? 'Correct — level up' : 'Recorded — read the explanation');
    });
    opts.appendChild(b);
  });
  box.appendChild(opts); box.appendChild(explain);
  wrap.appendChild(box);

  if (e.checkPassed) {
    wrap.appendChild(el('div', { class: 'note' },
      'You have answered this before' + (e.checkCorrect ? ' correctly' : '') + '. Answering again still counts as retrieval practice.'));
  }
  return wrap;
}

function stepTeach(c) {
  const e = store.entry('concepts', c.id, {});
  const feedback = el('div', { style: { marginTop: '.7rem' } });
  const ta = el('textarea', { class: 'textarea', rows: 7, style: { minHeight: '170px' },
    placeholder: 'Explain it out loud first, then type what you said. Speaking it is the practice; typing it is the record.' });
  ta.value = e.teachText || '';

  const evaluate = () => {
    const text = ta.value.toLowerCase();
    const words = ta.value.trim().split(/\s+/).filter(Boolean).length;
    const must = c.teachBack.mustMention || [];
    const hit = must.filter(m => text.includes(m.toLowerCase()));
    const missing = must.filter(m => !text.includes(m.toLowerCase()));
    const enough = words >= 60;
    const passed = enough && hit.length >= Math.ceil(must.length * 0.75);

    store.patch('concepts', c.id, { teachText: ta.value, taught: passed });

    clear(feedback);
    feedback.appendChild(el('div', { class: 'note ' + (passed ? 'note--good' : 'note--warn') },
      el('div', { class: 'note__title' }, icon(passed ? 'check' : 'alert', 14),
        passed ? 'That covers it — mastery level reached' : 'Close, but something is missing'),
      el('div', { class: 't-sm' },
        el('p', {}, `${words} words. You touched ${hit.length} of ${must.length} key ideas.`),
        missing.length ? el('p', {}, rx('Not yet mentioned: ' + missing.map(m => '`' + m + '`').join(', ') + '. These are the load-bearing parts of the explanation — a listener who does not hear them will not be able to act on what you said.')) : null,
        !enough ? el('p', {}, 'Under 60 words is usually too compressed to be a real explanation. Add the example.') : null)));
    if (passed) toast('Teach-back complete');
  };

  return el('div', { class: 'stack' },
    el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--violet) 32%, transparent)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.4rem' } },
        el('span', { class: 'chip chip--violet chip--dot' }, 'Highest rung'),
        el('span', { class: 't-xs muted2' }, 'The one that transfers to an interview')),
      el('h3', { class: 't-h3', style: { marginBottom: '.4rem' } }, 'Teach it back'),
      el('p', { class: 't-sm muted', style: { marginBottom: '.7rem' } }, c.teachBack.prompt),
      ta,
      el('div', { class: 'spread', style: { marginTop: '.6rem', flexWrap: 'wrap', gap: '.5rem' } },
        el('span', { class: 't-xs muted2' }, 'Checked for coverage of the key ideas, not for wording.'),
        el('button', { class: 'btn btn--primary', onClick: evaluate }, icon('check', 15), 'Check my explanation')),
      feedback),
    el('div', { class: 'note' },
      el('div', { class: 'note__title' }, icon('flask', 14), 'Why this step exists'),
      'Explaining something to another person is the point at which you find out whether you understand it. Recognition feels like knowledge and is not — which is exactly the gap an interview exposes.'));
}

/* helpers */
function card(title, text, evKind) {
  return el('div', { class: 'card' },
    el('div', { class: 'spread', style: { marginBottom: '.35rem', alignItems: 'flex-start' } },
      el('h3', { class: 't-h3' }, title),
      evKind ? el('span', { class: 'ev ev--general' }, 'General PM guidance') : null),
    el('p', { html: rich(text) }));
}
function iaoo(title, items) {
  return el('div', { class: 'iaoo__cell' }, el('h4', {}, title), el('ul', {}, items.map(i => el('li', {}, i))));
}


function backChevron() { const i = icon('chevron', 11, 2); i.style.transform = 'rotate(180deg)'; return i; }
