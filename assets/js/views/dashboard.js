import { el, icon, pageHead, ring, bar, rich, rx, toast, timeAgo } from '../ui.js';
import { store } from '../store.js';
import { readiness, readinessLabel, nextActions, conceptStats, answerStats, cardStats, planStats, mockStats, streak, conceptLevel } from '../progress.js';
import { PROFILE } from '../data/profile.js';
import { ROLE, GAPS } from '../data/role.js';
import { CONCEPTS, TOTAL_MINUTES } from '../data/concepts.js';
import { QUESTIONS } from '../data/questions.js';
import { CARDS } from '../data/drills.js';
import { DAILY_REP_RECIPE } from '../data/plan.js';

export function renderDashboard(page, { go }) {
  const r = readiness();
  const label = readinessLabel(r.score);
  const cs = conceptStats(), as = answerStats(), cds = cardStats(), ps = planStats(), ms = mockStats();
  const st = streak();
  const first = !store.get().seen.knowledge && cs.started === 0;

  page.appendChild(pageHead({
    eyebrow: 'Preparation dashboard',
    title: first ? 'Welcome, Cristian' : 'Where you are',
    lead: first
      ? `This is a preparation platform built from three things: your CV, your portfolio at cmmt.me, and the **${ROLE.title}** advertisement for **${ROLE.employer}**. Everything is labelled by where it came from — your materials, public company information, general product management practice, or an assumption that needs checking.`
      : `**${ROLE.title}** · ${ROLE.employer}. Everything you write stays in this browser.`,
    actions: [
      el('button', { class: 'btn btn--primary', onClick: () => startDailyRep(go) }, icon('flask', 15), 'Daily rep'),
      el('a', { class: 'btn', href: '#/plan' }, icon('calendar', 15), 'Study plan')
    ]
  }));

  /* ---------- readiness ---------- */
  const readinessCard = el('div', { class: 'card' },
    el('div', { class: 'row', style: { gap: '1.1rem', alignItems: 'center', flexWrap: 'wrap' } },
      el('div', { style: { position: 'relative', flex: 'none' } },
        ring(r.score, 92, 9),
        el('div', { style: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' } },
          el('div', { style: { textAlign: 'center', lineHeight: 1 } },
            el('div', { style: { fontFamily: 'var(--font-display)', fontSize: '1.6rem' } }, Math.round(r.score * 100)),
            el('div', { class: 't-xs muted2', style: { fontSize: '.62rem', letterSpacing: '.1em' } }, 'READY')))),
      el('div', { class: 'grow', style: { minWidth: '220px' } },
        el('div', { class: 'row-wrap', style: { marginBottom: '.4rem' } },
          el('span', { class: 'chip ' + label.tone + ' chip--dot' }, label.label),
          st.days > 1 ? el('span', { class: 'chip chip--outline' }, st.days + '-day streak') : null),
        el('p', { class: 't-sm muted', style: { marginBottom: '.7rem' } },
          'A composite of what you have studied, drafted, retained, rated and rehearsed. It is a prompt, not a verdict.'),
        el('div', { class: 'stack', style: { '--gap': '.45rem' } },
          r.parts.map(p => el('a', {
            class: 'meter-row', href: '#/' + p.route, title: p.hint,
            style: { textDecoration: 'none', color: 'inherit' }
          },
            el('div', {},
              el('div', { class: 'spread', style: { marginBottom: '.2rem' } },
                el('span', { class: 't-xs', style: { fontWeight: 560 } }, p.label),
                el('span', { class: 't-xs muted2' }, Math.round(p.value * 100) + '%')),
              bar(p.value, p.value > .66 ? 'bar--teal' : p.value > .33 ? '' : 'bar--amber')),
            el('span', { class: 't-xs muted2', style: { fontFamily: 'var(--font-mono)' } }, '×' + p.weight.toFixed(2))))))));
  page.appendChild(readinessCard);

  /* ---------- next actions ---------- */
  const actions = nextActions(4);
  page.appendChild(el('section', { style: { marginTop: '1.6rem' } },
    el('div', { class: 'spread', style: { marginBottom: '.7rem' } },
      el('h2', { class: 't-h2' }, 'Do this next'),
      el('span', { class: 't-xs muted2' }, 'Recalculated from your progress')),
    actions.length
      ? el('div', { class: 'grid grid--2' }, actions.map(a =>
          el('a', { class: 'card card--hover', href: '#/' + a.route, style: { textDecoration: 'none', color: 'inherit', display: 'block' } },
            el('div', { class: 'row-wrap', style: { marginBottom: '.4rem' } },
              el('span', { class: 'chip chip--' + a.tone + ' chip--dot' }, a.why)),
            el('h3', { class: 't-h3', style: { marginBottom: '.25rem' } }, a.title),
            el('p', { class: 't-sm muted' }, a.detail))))
      : el('div', { class: 'note note--good' }, 'Nothing outstanding. Run a mock interview or review your notebook.')));

  /* ---------- stat strip ---------- */
  page.appendChild(el('section', { style: { marginTop: '1.6rem' } },
    el('div', { class: 'grid grid--4' },
      statCard('Study path', `${cs.started}/${cs.total}`, `sessions opened · ${cs.taught} taught back`, 'knowledge', cs.pct),
      statCard('Answers drafted', `${as.drafted}/${as.total}`, `${as.criticalDone}/${as.critical} of the very likely ones`, 'interview', as.pct),
      statCard('Recall', `${cds.strong}/${cds.total}`, cds.due ? `${cds.due} due now` : 'nothing due', 'practice/cards', cds.pct),
      statCard('Mock sessions', String(ms.sessions), ms.sessions ? 'keep going — six is a target' : 'not started', 'mock', ms.pct))));

  /* ---------- gaps ---------- */
  const critical = GAPS.filter(g => g.severity === 'critical' || g.severity === 'high');
  page.appendChild(el('section', { style: { marginTop: '1.6rem' } },
    el('div', { class: 'spread', style: { marginBottom: '.7rem' } },
      el('h2', { class: 't-h2' }, 'Your ranked gaps'),
      el('a', { class: 'btn btn--sm', href: '#/rolefit' }, 'Full role analysis', icon('arrow', 13))),
    el('div', { class: 'card card--flush' },
      critical.map((g, i) => {
        const done = (g.concepts || []).filter(c => conceptLevel(c) >= 2).length;
        const tot = (g.concepts || []).length || 1;
        return el('a', {
          href: '#/rolefit?g=' + g.id,
          style: { display: 'block', padding: '.85rem 1rem', textDecoration: 'none', color: 'inherit',
                   borderTop: i ? '1px solid var(--line)' : 'none' }
        },
          el('div', { class: 'spread', style: { alignItems: 'flex-start' } },
            el('div', { class: 'grow' },
              el('div', { class: 'row-wrap', style: { marginBottom: '.25rem' } },
                el('span', { class: 'chip ' + (g.severity === 'critical' ? 'chip--rose' : 'chip--amber') + ' chip--dot' }, g.severity),
                g.verify ? el('span', { class: 'ev ev--verify' }, 'Ask them') : null),
              el('div', { style: { fontWeight: 570, marginBottom: '.15rem' } }, g.title),
              el('p', { class: 't-sm muted', style: { maxWidth: '62ch' } }, g.why)),
            (g.concepts || []).length
              ? el('div', { style: { flex: 'none', textAlign: 'right' } },
                  el('div', { class: 't-xs muted2' }, `${done}/${tot} studied`),
                  el('div', { style: { width: '70px', marginTop: '.3rem' } }, bar(done / tot, done === tot ? 'bar--teal' : 'bar--amber')))
              : null));
      }))));

  /* ---------- what this is built from ---------- */
  page.appendChild(el('section', { style: { marginTop: '1.6rem' } },
    el('h2', { class: 't-h2', style: { marginBottom: '.7rem' } }, 'What this is built from'),
    el('div', { class: 'grid grid--3' },
      sourceCard('Your CV', 'Cristian_Malpica_CV.pdf', `${PROFILE.headline}. Every claim traced back to a quoted line.`, 'ev--cv'),
      sourceCard('Your portfolio', 'cmmt.me', 'Case studies, method principles and the seven B2B decision frameworks.', 'ev--portfolio'),
      sourceCard('The job ad', ROLE.employer, `${ROLE.title} · ${ROLE.ref} · ${ROLE.band}`, 'ev--jd')),
    el('div', { class: 'note', style: { marginTop: '.8rem' } },
      el('div', { class: 'note__title' }, icon('alert', 14), 'How to read the labels'),
      rx('Anything on this site marked **From your CV** or **From your portfolio** is quoted from your materials. **Interpretation** is a reasonable reading of them. **Assumption** fills a gap and should be checked. **General PM guidance** is standard practice, not specific to you. **Verify before using** means the fact is uncertain — ask the recruiter or check the source. Nothing here invents experience you do not have, and no interview question is presented as certain.'))));

  /* ---------- time budget ---------- */
  page.appendChild(el('p', { class: 't-xs muted2', style: { marginTop: '1.6rem', textAlign: 'center' } },
    `${CONCEPTS.length} sessions · ~${Math.round(TOTAL_MINUTES / 60)} hours of study material · ${QUESTIONS.length} interview questions · ${CARDS.length} cards · plan ${Math.round(ps.pct * 100)}% complete`));
}

function statCard(label, value, sub, route, pct) {
  return el('a', { class: 'card card--hover', href: '#/' + route, style: { textDecoration: 'none', color: 'inherit', display: 'block' } },
    el('div', { class: 'stat' },
      el('span', { class: 'stat__n' }, value),
      el('span', { class: 'stat__l' }, label)),
    el('div', { style: { marginTop: '.5rem' } }, bar(pct || 0)),
    el('p', { class: 't-xs muted2', style: { marginTop: '.35rem' } }, sub));
}

function sourceCard(title, sub, body, cls) {
  return el('div', { class: 'card card--tint' },
    el('span', { class: 'ev ' + cls }, title),
    el('div', { style: { fontWeight: 560, marginTop: '.4rem' } }, sub),
    el('p', { class: 't-sm muted', style: { marginTop: '.2rem' } }, body));
}

/* ---------- Daily Rep: one interleaved 10-minute session ---------- */
export function startDailyRep(go) {
  const cds = cardStats();
  if (cds.due > 0) { toast('Daily rep: starting with your due cards'); go('practice/cards?rep=1'); return; }
  const nextConcept = CONCEPTS.find(c => conceptLevel(c.id) < 2);
  if (nextConcept) { toast('Daily rep: next study session'); go('study/' + nextConcept.id); return; }
  const q = QUESTIONS.find(x => !(store.entry('questions', x.id, {}).answer || '').trim());
  if (q) { toast('Daily rep: an answer to draft'); go('question/' + q.id); return; }
  toast('Everything is up to date — try a mock interview');
  go('mock');
}
