/* practice.js — flashcards, quiz, prioritisation drills, simulations, timed mode */
import { el, $, $$, icon, pageHead, rich, rx, clear, toast, shuffle, bar, tabs, modal } from '../ui.js';
import { store } from '../store.js';
import { CARDS, PRIORITY_DRILLS, SIMULATIONS } from '../data/drills.js';
import { CONCEPTS, CONCEPT_BY_ID } from '../data/concepts.js';
import { QUESTIONS } from '../data/questions.js';
import { cardStats } from '../progress.js';

const MODES = [
  { id:'cards',    label:'Flashcards',   icon:'cards',  blurb:'Spaced repetition over 60 cards. Grade honestly — the schedule only works if you do.' },
  { id:'quiz',     label:'Quiz',         icon:'check',  blurb:'The knowledge checks from every session, mixed and explained.' },
  { id:'priority', label:'Prioritise',   icon:'scale',  blurb:'Drag items into the order you would work them, then compare with a reasoned answer.' },
  { id:'sim',      label:'Situation room', icon:'route', blurb:'Branching decision simulations set inside this role. Choices have consequences.' },
  { id:'timed',    label:'Timed answers', icon:'clock', blurb:'A question, a clock, and no preparation. The closest thing to the real pressure.' }
];

export function renderPractice(page, ctx) {
  const { param, go, query } = ctx;
  const mode = param || 'cards';
  page.appendChild(pageHead({
    eyebrow: 'Drills',
    title: 'Active practice',
    lead: 'Reading is not studying. Everything here makes you retrieve, decide or commit before it shows you an answer.'
  }));
  page.appendChild(el('div', { class: 'row-wrap', style: { marginBottom: '1.2rem' } },
    MODES.map(m => el('a', { class: 'pill', href: '#/practice/' + m.id,
      'aria-pressed': m.id === mode ? 'true' : 'false', style: { textDecoration: 'none' } },
      icon(m.icon, 13), ' ' + m.label))));
  const cur = MODES.find(m => m.id === mode) || MODES[0];
  page.appendChild(el('p', { class: 't-sm muted measure', style: { marginBottom: '1rem' } }, cur.blurb));

  const host = el('div', {});
  page.appendChild(host);
  ({ cards: cardsMode, quiz: quizMode, priority: priorityMode, sim: simMode, timed: timedMode }[mode] || cardsMode)(host, ctx);
}

/* ---------------- flashcards ---------------- */
function cardsMode(host, { query }) {
  const st = cardStats();
  const repOnly = query && query.get('rep');
  let deck = st.dueIds.length ? CARDS.filter(c => st.dueIds.includes(c.id)) : CARDS.slice();
  deck = shuffle(deck).slice(0, repOnly ? 4 : store.pref('cardsPerSession') || 12);
  if (!deck.length) deck = shuffle(CARDS).slice(0, 12);

  let i = 0, correct = 0;
  const box = el('div', {});
  host.appendChild(el('div', { class: 'row-wrap', style: { marginBottom: '.8rem' } },
    el('span', { class: 'chip chip--outline' }, `${st.due} due`),
    el('span', { class: 'chip chip--outline' }, `${st.strong}/${st.total} retained`),
    el('span', { class: 'chip chip--accent' }, `${deck.length} in this round`)));
  host.appendChild(box);

  function paint() {
    if (i >= deck.length) {
      clear(box).appendChild(el('div', { class: 'card', style: { textAlign: 'center', padding: '2rem 1rem' } },
        icon('check', 32, 1.6),
        el('h3', { class: 't-h2', style: { margin: '.5rem 0 .3rem' } }, 'Round complete'),
        el('p', { class: 't-sm muted' }, `${correct} of ${deck.length} recalled without difficulty. Cards you found hard will come back sooner.`),
        el('div', { class: 'row-wrap', style: { justifyContent: 'center', marginTop: '.9rem' } },
          el('button', { class: 'btn btn--primary', onClick: () => { i = 0; correct = 0; deck = shuffle(CARDS).slice(0, 12); paint(); } }, 'Another round'),
          el('a', { class: 'btn', href: '#/practice/quiz' }, 'Switch to quiz'))));
      return;
    }
    const c = deck[i];
    const concept = CONCEPT_BY_ID[c.concept];
    const flip = el('div', { class: 'flip', dataset: { flipped: 'false' } },
      el('div', { class: 'flip__inner' },
        el('div', { class: 'flip__face' },
          el('div', { class: 't-eyebrow', style: { marginBottom: '.6rem' } }, concept ? concept.title : ''),
          el('p', { style: { fontSize: '1.15rem', lineHeight: 1.45 } }, c.front),
          el('p', { class: 't-xs muted2', style: { marginTop: '1rem' } }, 'Say the answer out loud, then reveal.')),
        el('div', { class: 'flip__face flip__face--back' },
          el('div', { class: 't-eyebrow', style: { marginBottom: '.6rem' } }, 'Answer'),
          el('p', { html: rich(c.back) }))));

    const reveal = el('button', { class: 'btn btn--primary btn--block', onClick: () => {
      flip.dataset.flipped = 'true'; reveal.hidden = true; grades.hidden = false;
    }}, 'Reveal answer');

    const grades = el('div', { hidden: true, class: 'grid grid--4', style: { marginTop: '.7rem' } },
      [['Again', 0, 'rose'], ['Hard', 1, 'amber'], ['Good', 2, 'accent'], ['Easy', 3, 'teal']].map(([lab, g, tone]) =>
        el('button', { class: 'btn', style: { borderColor: `color-mix(in srgb, var(--${tone}) 45%, transparent)`, color: `var(--${tone})` },
          onClick: () => { store.reviewCard(c.id, g); if (g >= 2) correct++; i++; paint(); } }, lab)));

    clear(box).append(
      el('div', { class: 'spread', style: { marginBottom: '.6rem' } },
        el('span', { class: 't-xs muted2' }, `${i + 1} / ${deck.length}`),
        concept ? el('a', { class: 't-xs', href: '#/study/' + concept.id }, 'Open the session') : null),
      bar((i) / deck.length),
      el('div', { style: { marginTop: '.8rem' } }, flip),
      el('div', { style: { marginTop: '.8rem' } }, reveal, grades));
  }
  paint();
}

/* ---------------- quiz ---------------- */
function quizMode(host) {
  let pool = shuffle(CONCEPTS.filter(c => c.check)).slice(0, 10);
  let i = 0, score = 0;
  const box = el('div', {});
  host.appendChild(box);

  function paint() {
    if (i >= pool.length) {
      const pct = Math.round(score / pool.length * 100);
      store.push('quizRuns', { at: Date.now(), set: 'mixed', score, total: pool.length });
      clear(box).appendChild(el('div', { class: 'card', style: { textAlign: 'center', padding: '2rem 1rem' } },
        el('div', { class: 'stat__n', style: { fontSize: '2.6rem' } }, pct + '%'),
        el('p', { class: 't-sm muted', style: { marginTop: '.3rem' } }, `${score} of ${pool.length} correct.`),
        el('p', { class: 't-sm muted', style: { marginTop: '.5rem', maxWidth: '48ch', margin: '.5rem auto 0' } },
          pct >= 80 ? 'Strong. Move to the drills and the mock interview — recognition is not your bottleneck.'
                    : 'Go back to the sessions you missed. The explanation matters more than the score.'),
        el('button', { class: 'btn btn--primary', style: { marginTop: '1rem' },
          onClick: () => { pool = shuffle(CONCEPTS.filter(c => c.check)).slice(0, 10); i = 0; score = 0; paint(); } }, 'Again')));
      return;
    }
    const c = pool[i];
    const opts = el('div', { class: 'stack', style: { '--gap': '.45rem' } });
    const after = el('div', { hidden: true, style: { marginTop: '.8rem' } });
    c.check.options.forEach((text, n) => {
      const b = el('button', { class: 'opt' }, el('span', { class: 'opt__key' }, 'ABCD'[n]), el('span', {}, text));
      b.addEventListener('click', () => {
        const right = n === c.check.answer;
        if (right) score++;
        $$('.opt', opts).forEach((x, j) => { x.disabled = true;
          if (j === c.check.answer) x.dataset.state = 'correct'; else if (j === n) x.dataset.state = 'wrong'; });
        after.hidden = false;
        clear(after).append(
          el('div', { class: 'note ' + (right ? 'note--good' : 'note--warn') },
            el('div', { class: 'note__title' }, icon(right ? 'check' : 'alert', 14), right ? 'Correct' : 'Not quite'),
            rx(c.check.why)),
          el('div', { class: 'spread', style: { marginTop: '.7rem' } },
            el('a', { class: 'btn btn--sm', href: '#/study/' + c.id }, 'Open the session'),
            el('button', { class: 'btn btn--primary', onClick: () => { i++; paint(); } },
              i + 1 >= pool.length ? 'See result' : 'Next', icon('arrow', 14))));
      });
      opts.appendChild(b);
    });
    clear(box).append(
      el('div', { class: 'spread', style: { marginBottom: '.5rem' } },
        el('span', { class: 't-xs muted2' }, `${i + 1} / ${pool.length}`),
        el('span', { class: 'chip chip--outline' }, c.title)),
      bar(i / pool.length),
      el('div', { class: 'card', style: { marginTop: '.8rem' } },
        el('h3', { class: 't-h3', style: { marginBottom: '.7rem' } }, c.check.q), opts, after));
  }
  paint();
}

/* ---------------- prioritisation drag & drop ---------------- */
function priorityMode(host, { query }) {
  const focus = query && query.get('d');
  const drill = PRIORITY_DRILLS.find(d => d.id === focus) || PRIORITY_DRILLS[0];

  host.appendChild(el('div', { class: 'row-wrap', style: { marginBottom: '.9rem' } },
    PRIORITY_DRILLS.map(d => el('a', { class: 'pill', href: '#/practice/priority?d=' + d.id,
      'aria-pressed': d.id === drill.id ? 'true' : 'false', style: { textDecoration: 'none' } }, d.title))));

  const order = shuffle(drill.items.map(i => i.id));
  const listEl = el('ul', { class: 'dnd-list' });
  const result = el('div', { style: { marginTop: '1rem' } });

  function paint() {
    clear(listEl);
    order.forEach((id, idx) => {
      const item = drill.items.find(x => x.id === id);
      const li = el('li', { class: 'dnd-item', draggable: 'true', dataset: { id } },
        el('span', { class: 'dnd-rank' }, String(idx + 1)),
        el('span', { class: 'grow' },
          el('span', { style: { display: 'block', fontSize: '.9rem' } }, item.label),
          item.hint ? el('span', { class: 't-xs muted2' }, item.hint) : null),
        el('span', { class: 'dnd-move' },
          el('button', { 'aria-label': 'Move up', onClick: () => { if (idx > 0) { [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]]; paint(); } } }, '▲'),
          el('button', { 'aria-label': 'Move down', onClick: () => { if (idx < order.length - 1) { [order[idx + 1], order[idx]] = [order[idx], order[idx + 1]]; paint(); } } }, '▼')));
      li.addEventListener('dragstart', e => { li.classList.add('dragging'); e.dataTransfer.setData('text/plain', id); });
      li.addEventListener('dragend', () => li.classList.remove('dragging'));
      li.addEventListener('dragover', e => { e.preventDefault(); li.classList.add('over'); });
      li.addEventListener('dragleave', () => li.classList.remove('over'));
      li.addEventListener('drop', e => {
        e.preventDefault(); li.classList.remove('over');
        const from = order.indexOf(e.dataTransfer.getData('text/plain'));
        const to = order.indexOf(id);
        if (from < 0 || from === to) return;
        order.splice(to, 0, order.splice(from, 1)[0]);
        paint();
      });
      listEl.appendChild(li);
    });
  }
  paint();

  function check() {
    let dist = 0;
    order.forEach((id, i) => { dist += Math.abs(i - drill.ideal.indexOf(id)); });
    const perfect = dist === 0;
    const close = dist <= drill.tolerance * 2;
    const prev = store.entry('drills', drill.id, {});
    store.patch('drills', drill.id, { attempts: (prev.attempts || 0) + 1, bestScore: Math.min(prev.bestScore ?? 999, dist) });
    clear(result).appendChild(el('div', { class: 'card', style: { borderColor: perfect ? 'var(--teal)' : close ? 'var(--amber)' : 'var(--rose)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.5rem' } },
        el('span', { class: 'chip ' + (perfect ? 'chip--teal' : close ? 'chip--amber' : 'chip--rose') + ' chip--dot' },
          perfect ? 'Exactly the reasoned order' : close ? 'Close' : 'Some way off'),
        el('span', { class: 't-xs muted2' }, 'Displacement: ' + dist)),
      el('p', { class: 't-sm muted', style: { marginBottom: '.7rem' } },
        'There is no single correct sequence in real work — but there is a defensible one, and the reasoning is what matters.'),
      el('div', { class: 'card card--flush', style: { marginBottom: '.8rem' } },
        drill.ideal.map((id, i) => {
          const item = drill.items.find(x => x.id === id);
          const yours = order.indexOf(id);
          return el('div', { style: { display: 'flex', gap: '.7rem', padding: '.55rem .8rem', borderTop: i ? '1px solid var(--line)' : 'none' } },
            el('span', { class: 'dnd-rank', style: { flex: 'none' } }, String(i + 1)),
            el('span', { class: 'grow t-sm' }, item.label),
            el('span', { class: 'chip ' + (yours === i ? 'chip--teal' : Math.abs(yours - i) <= 1 ? 'chip--amber' : 'chip--rose'), style: { flex: 'none' } },
              yours === i ? '✓' : 'you: ' + (yours + 1)));
        })),
      el('div', { class: 't-eyebrow', style: { marginBottom: '.35rem' } }, 'Why that order'),
      el('ul', { class: 't-sm muted' }, drill.rationale.map(r => el('li', { html: rich(r) })))));
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  host.append(
    el('div', { class: 'card', style: { marginBottom: '.9rem' } },
      el('h3', { class: 't-h3', style: { marginBottom: '.3rem' } }, drill.title),
      el('p', { class: 't-sm muted' }, drill.brief)),
    listEl,
    el('div', { class: 'row-wrap', style: { marginTop: '.9rem' } },
      el('button', { class: 'btn btn--primary', onClick: check }, icon('check', 15), 'Check my order'),
      el('button', { class: 'btn', onClick: () => { order.sort(() => Math.random() - .5); paint(); clear(result); } }, icon('refresh', 14), 'Shuffle')),
    result);
}

/* ---------------- situation room ---------------- */
function simMode(host, { query }) {
  const focus = query && query.get('s');
  const sim = SIMULATIONS.find(s => s.id === focus) || SIMULATIONS[0];
  host.appendChild(el('div', { class: 'row-wrap', style: { marginBottom: '.9rem' } },
    SIMULATIONS.map(s => el('a', { class: 'pill', href: '#/practice/sim?s=' + s.id,
      'aria-pressed': s.id === sim.id ? 'true' : 'false', style: { textDecoration: 'none' } }, s.title))));

  let step = 0, total = 0;
  const chosen = [];
  const box = el('div', {});
  host.append(
    el('div', { class: 'card', style: { marginBottom: '1rem', borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.4rem' } },
        el('span', { class: 'chip chip--accent chip--dot' }, 'Situation'),
        (sim.concepts || []).map(c => {
          const cc = CONCEPT_BY_ID[c];
          return cc ? el('a', { class: 'chip chip--outline', href: '#/study/' + c, style: { textDecoration: 'none' } }, cc.title) : null;
        })),
      el('h3', { class: 't-h3', style: { marginBottom: '.3rem' } }, sim.title),
      el('p', { class: 't-sm' }, sim.setting)),
    box);

  function paint() {
    if (step >= sim.steps.length) {
      const max = sim.steps.length * 3;
      store.patch('scenarios', sim.id, { score: total, completedAt: Date.now() });
      clear(box).appendChild(el('div', { class: 'card' },
        el('div', { class: 'spread', style: { marginBottom: '.6rem', flexWrap: 'wrap' } },
          el('h3', { class: 't-h2' }, 'Debrief'),
          el('span', { class: 'chip ' + (total >= max * .8 ? 'chip--teal' : total >= max * .55 ? 'chip--amber' : 'chip--rose') },
            total + ' / ' + max)),
        el('p', { style: { marginBottom: '.9rem' }, html: rich(sim.debrief) }),
        el('div', { class: 't-eyebrow', style: { marginBottom: '.4rem' } }, 'Your choices'),
        el('div', { class: 'stack', style: { '--gap': '.4rem' } },
          chosen.map((c, i) => el('div', { class: 'quote' + (c.score >= 3 ? '' : ' quote--jd') },
            el('div', { class: 't-xs muted2', style: { fontStyle: 'normal' } }, 'Step ' + (i + 1) + ' · ' + c.score + '/3'),
            c.label))),
        el('div', { class: 'row-wrap', style: { marginTop: '1rem' } },
          el('button', { class: 'btn btn--primary', onClick: () => { step = 0; total = 0; chosen.length = 0; paint(); } }, 'Run it again'),
          el('a', { class: 'btn', href: '#/practice/sim' }, 'Other situations'))));
      return;
    }
    const s = sim.steps[step];
    const opts = el('div', { class: 'stack', style: { '--gap': '.45rem' } });
    const fb = el('div', { hidden: true, style: { marginTop: '.8rem' } });
    s.options.forEach((o, n) => {
      const b = el('button', { class: 'opt' }, el('span', { class: 'opt__key' }, 'ABCD'[n]), el('span', {}, o.label));
      b.addEventListener('click', () => {
        total += o.score; chosen.push(o);
        const best = Math.max(...s.options.map(x => x.score));
        $$('.opt', opts).forEach((x, j) => { x.disabled = true;
          if (s.options[j].score === best) x.dataset.state = 'correct';
          else if (j === n && o.score < best) x.dataset.state = 'wrong'; });
        fb.hidden = false;
        clear(fb).append(
          el('div', { class: 'note ' + (o.score >= 3 ? 'note--good' : o.score >= 2 ? 'note--info' : o.score >= 1 ? 'note--warn' : 'note--bad') },
            el('div', { class: 'note__title' }, icon(o.score >= 2 ? 'check' : 'alert', 14), o.score + ' of 3'),
            o.feedback),
          el('div', { style: { marginTop: '.7rem', textAlign: 'right' } },
            el('button', { class: 'btn btn--primary', onClick: () => { step++; paint(); } },
              step + 1 >= sim.steps.length ? 'See debrief' : 'Continue', icon('arrow', 14))));
      });
      opts.appendChild(b);
    });
    clear(box).append(
      el('div', { class: 'spread', style: { marginBottom: '.5rem' } },
        el('span', { class: 't-xs muted2' }, `Step ${step + 1} of ${sim.steps.length}`),
        el('span', { class: 't-xs muted2' }, total + ' points so far')),
      bar(step / sim.steps.length),
      el('div', { class: 'card', style: { marginTop: '.8rem' } },
        el('h3', { class: 't-h3', style: { marginBottom: '.7rem' } }, s.prompt), opts, fb));
  }
  paint();
}

/* ---------------- timed answers ---------------- */
function timedMode(host) {
  const secs = store.pref('timerSeconds') || 120;
  let q = null, timer = null, left = secs;
  const box = el('div', {});
  host.append(
    el('div', { class: 'row-wrap', style: { marginBottom: '.9rem' } },
      el('span', { class: 't-sm muted' }, 'Time per answer:'),
      el('div', { class: 'seg' }, [60, 90, 120, 180].map(v => el('button', {
        'aria-pressed': v === (store.pref('timerSeconds') || 120) ? 'true' : 'false',
        onClick: ev => { store.pref('timerSeconds', v);
          [...ev.target.parentElement.children].forEach(b => b.setAttribute('aria-pressed', b === ev.target ? 'true' : 'false')); }
      }, v + 's')))),
    box);

  function start() {
    q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    left = store.pref('timerSeconds') || 120;
    const clock = el('span', { class: 't-mono', style: { fontSize: '1.6rem', fontFamily: 'var(--font-display)' } });
    const ta = el('textarea', { class: 'textarea', rows: 7, placeholder: 'Speak it aloud. Type the key points as you go.' });
    const done = el('div', { hidden: true });
    const paintClock = () => {
      clock.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
      clock.style.color = left <= 15 ? 'var(--rose)' : left <= 30 ? 'var(--amber)' : '';
    };
    paintClock();
    clearInterval(timer);
    timer = setInterval(() => { left--; paintClock(); if (left <= 0) { clearInterval(timer); finish(); } }, 1000);

    function finish() {
      clearInterval(timer);
      ta.disabled = true;
      done.hidden = false;
      clear(done).appendChild(el('div', { class: 'stack', style: { marginTop: '.8rem' } },
        el('div', { class: 'note note--info' },
          el('div', { class: 'note__title' }, icon('clock', 14), 'Time'),
          `You wrote ${ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0} words. Under pressure most people either freeze or over-explain — notice which you did.`),
        el('div', { class: 'card card--tint' },
          el('div', { class: 't-eyebrow', style: { marginBottom: '.35rem' } }, 'Rubric for this question'),
          el('ul', { class: 't-sm muted' }, q.rubric.map(r => el('li', {}, r)))),
        el('div', { class: 'row-wrap' },
          el('a', { class: 'btn', href: '#/question/' + q.id }, 'Open the full guidance'),
          el('button', { class: 'btn btn--primary', onClick: start }, icon('refresh', 14), 'Another'))));
    }

    clear(box).appendChild(el('div', { class: 'card' },
      el('div', { class: 'spread', style: { marginBottom: '.7rem', flexWrap: 'wrap', gap: '.5rem' } },
        el('h3', { class: 't-h3', style: { maxWidth: '60ch' } }, q.q),
        clock),
      ta,
      el('div', { class: 'spread', style: { marginTop: '.6rem' } },
        el('span', { class: 't-xs muted2' }, 'No guidance visible until the timer stops. That is the point.'),
        el('button', { class: 'btn', onClick: finish }, 'Stop')),
      done));
  }

  clear(box).appendChild(el('div', { class: 'card', style: { textAlign: 'center', padding: '2rem 1rem' } },
    icon('clock', 30, 1.5),
    el('h3', { class: 't-h2', style: { margin: '.5rem 0 .3rem' } }, 'Timed practice'),
    el('p', { class: 't-sm muted', style: { maxWidth: '46ch', margin: '0 auto .9rem' } },
      'A random question, a running clock, and no model answer until it stops. This is the only drill that reproduces the actual pressure.'),
    el('button', { class: 'btn btn--primary', onClick: start }, 'Start')));
}
