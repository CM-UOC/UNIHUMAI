import { el, icon, pageHead, rich, rx, bar, toast, clear } from '../ui.js';
import { store } from '../store.js';
import { PLAN } from '../data/plan.js';
import { GAPS } from '../data/role.js';
import { planStats, conceptLevel, streak } from '../progress.js';
import { CONCEPT_BY_ID } from '../data/concepts.js';

export function renderPlan(page, { go }) {
  const st = planStats();
  const sk = streak();
  page.appendChild(pageHead({
    eyebrow: 'Personalised study plan',
    title: 'Four weeks',
    lead: 'Ordered by what would cost you most in the interview, not by what is easiest. The first week exists because your two critical gaps — the automotive domain and its regulatory frame — are the ones that stop the rest of your profile from being reached.',
    meta: [
      el('span', { class: 'chip chip--accent' }, `${st.done}/${st.total} tasks done`),
      sk.days > 1 ? el('span', { class: 'chip chip--teal' }, `${sk.days}-day streak`) : null,
      el('span', { class: 'chip chip--outline' }, '~11 hours total')
    ]
  }));

  page.appendChild(el('div', { class: 'card card--tint', style: { marginBottom: '1.3rem' } },
    el('div', { class: 'spread', style: { marginBottom: '.5rem' } },
      el('span', { class: 't-eyebrow' }, 'Overall progress'),
      el('span', { class: 't-sm muted2' }, Math.round(st.pct * 100) + '%')),
    bar(st.pct, st.pct > .66 ? 'bar--teal' : '')));

  page.appendChild(el('div', { class: 'note note--info', style: { marginBottom: '1.3rem' } },
    el('div', { class: 'note__title' }, icon('alert', 14), 'If you have less than four weeks'),
    rx('Do week 1 and week 2 tasks 1 and 3, then draft the six near-certain answers from week 3. That is roughly four hours and it covers the two things most likely to end the interview badly: not being able to talk about vehicle data, and having no answer for “what do you actually decide?”')));

  PLAN.forEach(w => {
    const doneIds = store.get().plan.done;
    const done = w.tasks.filter(t => doneIds.includes(t.id)).length;
    const weekBox = el('section', { style: { marginBottom: '1.6rem' } });
    const list = el('div', { class: 'card card--flush' });

    const paintWeek = () => {
      const d = w.tasks.filter(t => store.get().plan.done.includes(t.id)).length;
      const hdr = weekBox.querySelector('.weekmeta');
      if (hdr) hdr.textContent = `${d}/${w.tasks.length} done · ${w.tasks.reduce((a, t) => a + t.minutes, 0)} min`;
      const b = weekBox.querySelector('.bar > i');
      if (b) b.style.width = (d / w.tasks.length * 100) + '%';
    };

    w.tasks.forEach((t, i) => {
      const check = el('button', {
        class: 'iconbtn', 'aria-label': 'Mark done', style: { flex: 'none' },
        onClick: () => {
          const now = store.togglePlanTask(t.id);
          paintTask(); paintWeek();
          toast(now ? 'Marked done' : 'Unmarked');
        }
      });
      const row = el('div', { style: { display: 'flex', gap: '.75rem', padding: '.8rem 1rem', alignItems: 'flex-start',
        borderTop: i ? '1px solid var(--line)' : 'none' } },
        check,
        el('div', { class: 'grow' },
          el('div', { class: 'tasklabel', style: { fontWeight: 550, marginBottom: '.15rem' } }, t.label),
          el('p', { class: 't-sm muted' }, t.detail)),
        el('div', { class: 'row', style: { flex: 'none', gap: '.4rem' } },
          el('span', { class: 't-xs muted2', style: { fontFamily: 'var(--font-mono)' } }, t.minutes + 'm'),
          el('a', { class: 'iconbtn', href: t.link, title: 'Go' }, icon('arrow', 15))));

      const paintTask = () => {
        const on = store.get().plan.done.includes(t.id);
        check.setAttribute('aria-pressed', on ? 'true' : 'false');
        clear(check).appendChild(icon(on ? 'check' : 'plus', 15, on ? 2.4 : 1.8));
        check.style.color = on ? 'var(--teal)' : '';
        const lab = row.querySelector('.tasklabel');
        lab.style.textDecoration = on ? 'line-through' : '';
        lab.style.opacity = on ? '.55' : '';
      };
      paintTask();
      list.appendChild(row);
    });

    weekBox.append(
      el('div', { class: 'spread', style: { marginBottom: '.55rem', alignItems: 'flex-end' } },
        el('div', { style: { maxWidth: '62ch' } },
          el('div', { class: 't-eyebrow' }, 'Week ' + w.week),
          el('h3', { class: 't-h2' }, w.title),
          el('p', { class: 't-sm muted', style: { marginTop: '.2rem' } }, w.aim)),
        el('div', { style: { flex: 'none', textAlign: 'right' } },
          el('div', { class: 'weekmeta t-xs muted2' }, `${done}/${w.tasks.length} done · ${w.tasks.reduce((a, t) => a + t.minutes, 0)} min`),
          el('div', { style: { width: '84px', marginTop: '.3rem' } }, bar(done / w.tasks.length, done === w.tasks.length ? 'bar--teal' : '')))),
      list);
    page.appendChild(weekBox);
  });

  /* gap-driven extras */
  const openGaps = GAPS.filter(g => (g.concepts || []).some(c => conceptLevel(c) < 2));
  if (openGaps.length) {
    page.appendChild(el('section', { style: { marginTop: '.5rem' } },
      el('h2', { class: 't-h2', style: { marginBottom: '.6rem' } }, 'Still open, from your gap analysis'),
      el('div', { class: 'grid grid--2' },
        openGaps.map(g => el('div', { class: 'card' },
          el('div', { class: 'row-wrap', style: { marginBottom: '.3rem' } },
            el('span', { class: 'chip chip--' + ({ critical:'rose', high:'amber', medium:'accent', low:'outline' }[g.severity]) + ' chip--dot' }, g.severity)),
          el('h3', { class: 't-h3', style: { marginBottom: '.3rem' } }, g.title),
          el('div', { class: 'row-wrap', style: { marginTop: '.5rem' } },
            (g.concepts || []).filter(c => conceptLevel(c) < 2).map(c => {
              const cc = CONCEPT_BY_ID[c];
              return cc ? el('a', { class: 'chip chip--accent', href: '#/study/' + c, style: { textDecoration: 'none' } },
                icon('book', 11), cc.title) : null;
            })))))));
  }
}
