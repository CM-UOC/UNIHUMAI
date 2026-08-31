/* ============================================================
   mock.js — adaptive mock interviewer
   Asks one question at a time, adapts the follow-up to what you
   wrote, evaluates against the question's own rubric, and tracks
   recurring weaknesses across sessions.
   ============================================================ */

import { el, $, $$, icon, pageHead, rich, rx, clear, toast, timeAgo, shuffle, modal } from '../ui.js';
import { store } from '../store.js';
import { QUESTIONS, QUESTION_BY_ID, CATEGORIES } from '../data/questions.js';
import { EVIDENCE } from '../data/profile.js';

const TRACKS = [
  { id:'screen',   name:'Recruiter screen',    mins:'~10 min',
    blurb:'The first conversation. Motivation, scope, and the domain gap.',
    cats:['intro','cv','company'], n:5 },
  { id:'hiring',   name:'Hiring manager',      mins:'~20 min',
    blurb:'Product judgement, prioritisation, the Sales interface, and how you work.',
    cats:['strategy','prioritisation','execution','stakeholders','metrics'], n:6 },
  { id:'domain',   name:'Domain and governance', mins:'~15 min',
    blurb:'Vehicle data, privacy, service operations. Your two critical gaps.',
    cats:['sense','discovery','metrics','case'], n:5 },
  { id:'behaviour',name:'Behavioural panel',   mins:'~20 min',
    blurb:'Leadership, conflict, failure and ambiguity.',
    cats:['leadership','conflict','failure','behavioural'], n:6 },
  { id:'gauntlet', name:'The gauntlet',        mins:'~30 min',
    blurb:'Mixed, weighted towards the questions you have not drafted and the ones most likely to be asked.',
    cats:null, n:8 }
];

export function renderMock(page, { go }) {
  const sessions = store.get().mock || [];
  page.appendChild(pageHead({
    eyebrow: 'Mock interview',
    title: 'Practise out loud',
    lead: 'One question at a time, with a follow-up chosen from what you actually wrote. Speak each answer aloud before typing it — the typing is only the record. Nothing here is sent anywhere.',
    meta: sessions.length ? [
      el('span', { class: 'chip chip--accent' }, sessions.length + ' session' + (sessions.length === 1 ? '' : 's')),
      el('span', { class: 'chip chip--outline' }, 'Last: ' + timeAgo(sessions[sessions.length - 1].at))
    ] : null
  }));

  if (sessions.length >= 2) page.appendChild(weaknessPanel(sessions));

  page.appendChild(el('h2', { class: 't-h2', style: { margin: '1.3rem 0 .7rem' } }, 'Choose a track'));
  page.appendChild(el('div', { class: 'grid grid--2' },
    TRACKS.map(t => el('button', { class: 'card card--hover', style: { textAlign: 'left', display: 'block', width: '100%' },
      onClick: () => startSession(page, t, go) },
      el('div', { class: 'spread', style: { marginBottom: '.3rem', flexWrap: 'wrap' } },
        el('h3', { class: 't-h3' }, t.name),
        el('span', { class: 'chip chip--outline' }, t.mins)),
      el('p', { class: 't-sm muted' }, t.blurb),
      el('div', { class: 'row-wrap', style: { marginTop: '.5rem' } },
        el('span', { class: 'chip chip--accent' }, t.n + ' questions'),
        (t.cats || ['everything']).slice(0, 3).map(c =>
          el('span', { class: 'chip chip--outline t-xs' }, (CATEGORIES.find(x => x.id === c) || { label: c }).label)))))));

  if (sessions.length) {
    page.appendChild(el('h2', { class: 't-h2', style: { margin: '1.6rem 0 .7rem' } }, 'Past sessions'));
    page.appendChild(el('div', { class: 'card card--flush' },
      sessions.slice().reverse().map((s, i) => el('button', {
        style: { display: 'block', width: '100%', textAlign: 'left', padding: '.75rem 1rem',
                 borderTop: i ? '1px solid var(--line)' : 'none' },
        onClick: () => reviewSession(s)
      },
        el('div', { class: 'spread' },
          el('div', {},
            el('div', { style: { fontWeight: 550 } }, (TRACKS.find(t => t.id === s.track) || {}).name || s.track),
            el('div', { class: 't-xs muted2' }, (s.items || []).length + ' answered · ' + timeAgo(s.at))),
          el('span', { class: 'chip chip--outline' }, avgScore(s) + '/3'))))));
  }
}

function avgScore(s) {
  const all = (s.items || []).flatMap(i => Object.values(i.scores || {}));
  if (!all.length) return '—';
  return (all.reduce((a, b) => a + b, 0) / all.length).toFixed(1);
}

/* ---------------- weakness tracking ---------------- */
const DIMENSIONS = [
  { key:'relevance', label:'Answered the actual question' },
  { key:'structure', label:'Clear structure a listener could follow' },
  { key:'evidence',  label:'Grounded in something specific you did' },
  { key:'judgement', label:'Showed product judgement, not just process' },
  { key:'fit',       label:'Connected to this role' },
  { key:'concision', label:'Right length, no padding' }
];

function weaknessPanel(sessions) {
  const totals = {}, counts = {};
  sessions.forEach(s => (s.items || []).forEach(i => {
    Object.entries(i.scores || {}).forEach(([k, v]) => {
      totals[k] = (totals[k] || 0) + v; counts[k] = (counts[k] || 0) + 1;
    });
  }));
  const rows = DIMENSIONS.map(d => ({ ...d, avg: counts[d.key] ? totals[d.key] / counts[d.key] : null }))
    .filter(r => r.avg !== null).sort((a, b) => a.avg - b.avg);
  if (!rows.length) return el('div');
  const worst = rows.slice(0, 2);

  return el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--amber) 32%, transparent)' } },
    el('h3', { class: 't-h3', style: { marginBottom: '.5rem' } }, 'Patterns across your sessions'),
    el('p', { class: 't-sm muted', style: { marginBottom: '.7rem' } },
      'From your own scoring. Where the same dimension keeps scoring low, the problem is a habit rather than a question.'),
    el('div', { class: 'stack', style: { '--gap': '.4rem' } },
      rows.map(r => el('div', { class: 'spread', style: { gap: '.8rem' } },
        el('span', { class: 't-sm grow' }, r.label),
        el('div', { style: { width: '90px' } },
          el('div', { class: 'bar ' + (r.avg < 1.6 ? 'bar--rose' : r.avg < 2.3 ? 'bar--amber' : 'bar--teal') },
            el('i', { style: { width: (r.avg / 3 * 100) + '%' } }))),
        el('span', { class: 't-xs muted2', style: { fontFamily: 'var(--font-mono)', width: '28px', textAlign: 'right' } }, r.avg.toFixed(1))))),
    worst.length ? el('div', { class: 'note note--warn', style: { marginTop: '.8rem' } },
      el('div', { class: 'note__title' }, icon('alert', 14), 'Your recurring weakness'),
      rx(coachFor(worst[0].key))) : null);
}

function coachFor(key) {
  return ({
    relevance: 'You are drifting off the question. Before answering, say the question back to yourself in one clause — "they are asking how I decide, not what I decided" — and answer that clause first.',
    structure: 'Your answers are hard to follow. Say the shape out loud before you start: "three things" or "context, what I did, what I learned". Signposting costs three seconds and changes how the whole answer lands.',
    evidence: 'You are answering from principle rather than from experience. Every answer should attach to something you actually did — open the **Insert evidence** picker on a question and build from a real quote.',
    judgement: 'You are describing process rather than judgement. Interviewers want to hear the trade-off you weighed and why you chose as you did — the reasoning, not the method.',
    fit: 'You are not connecting back to this role. Close each substantive answer with one clause that lands it on the GIS:Hub context — the Sales interface, the data governance, the new hub.',
    concision: 'Length is working against you. Cut the setup by half. Start closer to the decision and let them ask for the context if they want it.'
  })[key] || '';
}

/* ---------------- session runner ---------------- */
function pickQuestions(track) {
  let pool = track.cats ? QUESTIONS.filter(q => track.cats.includes(q.cat)) : QUESTIONS.slice();
  const undrafted = pool.filter(q => !(store.entry('questions', q.id, {}).answer || '').trim());
  const critical = pool.filter(q => q.likely === 'near-certain' || q.likely === 'certain');
  const weighted = shuffle([...undrafted, ...critical, ...pool]);
  const seen = new Set(); const out = [];
  for (const q of weighted) { if (!seen.has(q.id)) { seen.add(q.id); out.push(q); } if (out.length >= track.n) break; }
  return out;
}

function startSession(page, track, go) {
  const qs = pickQuestions(track);
  const session = { at: Date.now(), track: track.id, items: [] };
  let i = 0;

  clear(page);
  const head = el('header', { class: 'pagehead' },
    el('div', { class: 'spread' },
      el('div', {},
        el('div', { class: 't-eyebrow' }, 'Mock interview · ' + track.name),
        el('h1', { class: 'pagehead__t t-h1' }, 'In session')),
      el('button', { class: 'btn', onClick: () => finish(true) }, 'End session')),
    el('div', { class: 'bar', style: { marginTop: '.8rem' } }, el('i', { id: 'mockBar', style: { width: '0%' } })));
  page.appendChild(head);

  const chat = el('div', { class: 'chat', style: { marginTop: '1rem' } });
  page.appendChild(chat);
  const stage = el('div', { style: { marginTop: '1rem' } });
  page.appendChild(stage);

  function bubble(who, name, body) {
    const m = el('div', { class: 'msg msg--' + who },
      el('div', { class: 'msg__av' }, who === 'ai' ? 'INT' : 'YOU'),
      el('div', { class: 'msg__body' },
        el('div', { class: 'msg__name' }, name),
        el('div', { class: 'bubble' }, body)));
    chat.appendChild(m);
    m.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return m;
  }

  function ask() {
    if (i >= qs.length) return finish(false);
    const q = qs[i];
    $('#mockBar').style.width = (i / qs.length * 100) + '%';
    bubble('ai', 'Interviewer', el('div', {},
      el('p', { style: { fontWeight: 550, marginBottom: '.2rem' } }, q.q),
      el('p', { class: 't-xs muted2' }, 'Speak your answer aloud first, then type what you said.')));

    const ta = el('textarea', { class: 'textarea', rows: 6, placeholder: 'Your answer…' });
    const timerEl = el('span', { class: 't-xs muted2' });
    const t0 = Date.now();
    const tick = setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      timerEl.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      timerEl.style.color = s > 150 ? 'var(--rose)' : '';
    }, 1000);

    clear(stage).appendChild(el('div', { class: 'card' },
      ta,
      el('div', { class: 'spread', style: { marginTop: '.6rem', flexWrap: 'wrap', gap: '.5rem' } },
        el('div', { class: 'row-wrap' },
          el('span', { class: 'chip chip--outline' }, icon('clock', 12), timerEl),
          el('button', { class: 'btn btn--sm btn--ghost', onClick: () => {
            modal({ title: 'Hint — recommended structure',
              body: el('div', {}, el('p', { class: 't-sm muted', style: { marginBottom: '.5rem' } }, q.structure.name),
                el('ol', { class: 't-sm' }, q.structure.steps.map(s => el('li', {}, s)))) });
          }}, 'Structure hint')),
        el('button', { class: 'btn btn--primary', onClick: () => {
          clearInterval(tick);
          const ans = ta.value.trim();
          if (!ans) { toast('Write something first — even a rough answer'); return; }
          bubble('me', 'You', el('div', { class: 't-sm', style: { whiteSpace: 'pre-wrap' } }, ans));
          evaluate(q, ans, Math.floor((Date.now() - t0) / 1000));
        }}, 'Submit answer', icon('arrow', 14)))));
    ta.focus();
  }

  function evaluate(q, ans, secs) {
    const analysis = analyse(ans, q, secs);
    bubble('ai', 'Interviewer', el('div', { class: 'stack', style: { '--gap': '.6rem' } },
      el('p', { class: 't-sm' }, analysis.opening),
      analysis.flags.length ? el('div', {},
        el('div', { class: 't-eyebrow', style: { marginBottom: '.25rem' } }, 'What I noticed'),
        el('ul', { class: 't-sm muted' }, analysis.flags.map(f => el('li', { html: rich(f) })))) : null,
      el('div', { class: 'note note--info' },
        el('div', { class: 'note__title' }, icon('chat', 14), 'Follow-up'),
        analysis.followup)));

    const scores = {};
    const scoreBox = el('div', { class: 'stack', style: { '--gap': '.45rem' } });
    DIMENSIONS.forEach(d => {
      scoreBox.appendChild(el('div', { class: 'spread', style: { gap: '.7rem' } },
        el('span', { class: 't-sm grow' }, d.label),
        el('div', { class: 'seg', style: { flex: 'none' } },
          ['0', '1', '2', '3'].map(v => el('button', {
            onClick: ev => { scores[d.key] = Number(v);
              [...ev.target.parentElement.children].forEach(b => b.setAttribute('aria-pressed', b === ev.target ? 'true' : 'false')); }
          }, v)))));
    });

    clear(stage).appendChild(el('div', { class: 'card' },
      el('div', { class: 'spread', style: { marginBottom: '.6rem', flexWrap: 'wrap', gap: '.5rem' } },
        el('h3', { class: 't-h3' }, 'Score yourself honestly'),
        el('button', { class: 'btn btn--sm', onClick: () => modal({
          title: 'A stronger version of your answer',
          wide: true,
          body: el('div', { class: 'stack' },
            el('div', { class: 'note note--info' },
              el('div', { class: 'note__title' }, icon('alert', 14), 'Read this as a shape, not a script'),
              'This is built only from what your CV and portfolio actually contain. Use the structure and the specificity; keep your own words.'),
            el('div', { class: 't-sm', style: { whiteSpace: 'pre-wrap' }, html: rich(q.example) }),
            el('div', {},
              el('div', { class: 't-eyebrow', style: { marginBottom: '.3rem' } }, 'Rubric for this question'),
              el('ul', { class: 't-sm muted' }, q.rubric.map(r => el('li', {}, r)))))
        })}, icon('star', 13), 'Show a stronger answer')),
      el('p', { class: 't-sm muted', style: { marginBottom: '.7rem' } },
        '0 = not present, 3 = strong. Scoring yourself generously here defeats the point — the pattern panel is only useful if the numbers are true.'),
      scoreBox,
      el('div', { class: 'spread', style: { marginTop: '.9rem' } },
        el('button', { class: 'btn btn--ghost', onClick: () => {
          const cur = store.entry('questions', q.id, {});
          if (!cur.answer || confirm('Replace your saved draft for this question with what you just wrote?')) {
            store.patch('questions', q.id, { answer: ans });
            toast('Saved to the question bank');
          }
        }}, icon('download', 13), 'Save this to my drafts'),
        el('button', { class: 'btn btn--primary', onClick: () => {
          session.items.push({ qid: q.id, answer: ans, secs, scores, flags: analysis.flags.length });
          i++; ask();
        }}, i + 1 >= qs.length ? 'Finish session' : 'Next question', icon('arrow', 14)))));
  }

  function finish(early) {
    $('#mockBar').style.width = '100%';
    if (session.items.length) store.push('mock', session);
    clear(stage);
    const scored = session.items.flatMap(x => Object.values(x.scores || {}));
    const avg = scored.length ? (scored.reduce((a, b) => a + b, 0) / scored.length) : null;
    const byDim = {};
    session.items.forEach(x => Object.entries(x.scores || {}).forEach(([k, v]) => (byDim[k] = byDim[k] || []).push(v)));
    const weakest = Object.entries(byDim).map(([k, arr]) => ({ k, avg: arr.reduce((a, b) => a + b, 0) / arr.length }))
      .sort((a, b) => a.avg - b.avg)[0];

    stage.appendChild(el('div', { class: 'card' },
      el('h2', { class: 't-h2', style: { marginBottom: '.4rem' } }, early ? 'Session ended' : 'Session complete'),
      el('p', { class: 't-sm muted', style: { marginBottom: '.8rem' } },
        `${session.items.length} question${session.items.length === 1 ? '' : 's'} answered${avg !== null ? `, averaging ${avg.toFixed(1)} out of 3 on your own scoring` : ''}.`),
      weakest ? el('div', { class: 'note note--warn' },
        el('div', { class: 'note__title' }, icon('target', 14), 'Weakest dimension this session: ' +
          (DIMENSIONS.find(d => d.key === weakest.k) || {}).label),
        rx(coachFor(weakest.k))) : null,
      el('div', { class: 'row-wrap', style: { marginTop: '.9rem' } },
        el('a', { class: 'btn btn--primary', href: '#/mock' }, 'Back to tracks'),
        el('a', { class: 'btn', href: '#/interview' }, 'Refine drafts in the question bank'))));
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  ask();
}

/* ---------------- answer analysis (rule-based, adaptive follow-up) ---------------- */
function analyse(ans, q, secs) {
  const lower = ans.toLowerCase();
  const words = ans.trim().split(/\s+/).length;
  const flags = [];

  const evidenceText = EVIDENCE.map(e => e.quote + ' ' + e.claim).join(' ').toLowerCase();
  const nums = [...new Set((ans.match(/\b\d[\d.,]*%?/g) || []))];
  const unsupported = nums.filter(n => { const b = n.replace(/[^\d.,]/g, ''); return b.length > 1 && !evidenceText.includes(b); });
  if (unsupported.length) flags.push('You used the figure ' + unsupported.map(n => '`' + n + '`').join(', ') + ', which is not in your CV or portfolio. If it is real, say where it comes from. If it is an estimate, say so — an unverifiable number is worse than none.');

  const vague = ['significantly','a lot','many customers','various','several stakeholders','huge','lots of'];
  const v = vague.filter(x => lower.includes(x));
  if (v.length) flags.push('“' + v.join('”, “') + '” — an interviewer hears that as a substitute for specifics.');

  const iCount = (lower.match(/\bi\s/g) || []).length;
  const weCount = (lower.match(/\bwe\s/g) || []).length;
  if (weCount > iCount * 2 && weCount > 3) flags.push('Heavily “we”. I cannot tell what you personally decided.');

  if (words < 50) flags.push('Short — around ' + Math.round(words / 2.4) + ' seconds. Most of these want a concrete example as well as the principle.');
  if (secs > 0 && words / 2.4 > 170) flags.push('Long for a spoken answer. Start closer to the decision.');

  const usedEvidence = EVIDENCE.filter(e => {
    const key = e.claim.toLowerCase().split(' ').filter(w => w.length > 6).slice(0, 4);
    return key.length && key.filter(k => lower.includes(k)).length >= 2;
  });
  if (!usedEvidence.length && words > 60) flags.push('Nothing in this traces back to something you actually did. Anchor it in a real piece of your experience.');

  const hedges = ['i guess','sort of','kind of','probably would','i would try to','i think maybe'];
  const h = hedges.filter(x => lower.includes(x));
  if (h.length) flags.push('Hedging: “' + h.join('”, “') + '”. Say what you decided, not what you might try.');

  /* adaptive follow-up */
  let followup;
  if (unsupported.length) followup = 'Where does that number come from, and what exactly does it measure?';
  else if (!usedEvidence.length && words > 60) followup = 'Give me a specific instance. What did you actually do, and what happened?';
  else if (weCount > iCount * 2 && weCount > 3) followup = 'What was your personal contribution to that, as distinct from the team\'s?';
  else if (words < 50) followup = 'Can you take me through that in more detail — what was the situation, and what did you decide?';
  else if (q.followups && q.followups.length) followup = q.followups[Math.floor(Math.random() * q.followups.length)];
  else followup = 'What would you do differently if you had that situation again?';

  const openings = flags.length >= 3
    ? ['Thank you. There are a few things I would want to push on there.', 'Understood. Let me probe that a little.']
    : flags.length
      ? ['Thank you. Mostly clear — one thing I want to test.', 'Good. Let me follow that up.']
      : ['Thank you, that was clear.', 'Good — that answers it. Let me build on it.'];

  return { opening: openings[Math.floor(Math.random() * openings.length)], flags, followup };
}

function reviewSession(s) {
  modal({
    title: 'Session review',
    wide: true,
    body: el('div', { class: 'stack' },
      el('p', { class: 't-sm muted' }, timeAgo(s.at) + ' · ' + (s.items || []).length + ' answered'),
      ...(s.items || []).map(it => {
        const q = QUESTION_BY_ID[it.qid];
        return el('div', { class: 'card card--tint' },
          el('div', { style: { fontWeight: 550, marginBottom: '.3rem' } }, q ? q.q : it.qid),
          el('p', { class: 't-sm', style: { whiteSpace: 'pre-wrap', marginBottom: '.5rem' } }, it.answer),
          el('div', { class: 'row-wrap' },
            Object.entries(it.scores || {}).map(([k, v]) =>
              el('span', { class: 'chip ' + (v >= 2 ? 'chip--teal' : v >= 1 ? 'chip--amber' : 'chip--rose') },
                (DIMENSIONS.find(d => d.key === k) || {}).label + ': ' + v))));
      }))
  });
}
