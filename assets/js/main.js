/* ============================================================
   main.js — routing, chrome, global search
   ============================================================ */

import { store } from './store.js';
import { el, $, $$, clear, icon, toast, modal, rich } from './ui.js';

import { renderDashboard }  from './views/dashboard.js';
import { renderRoleFit }    from './views/rolefit.js';
import { renderKnowledge, renderConcept } from './views/knowledge.js';
import { renderSession }   from './views/session.js';
import { renderOrgMap }     from './views/orgmap.js';
import { renderInterview, renderQuestion } from './views/interview.js';
import { renderMock }       from './views/mock.js';
import { renderPractice }   from './views/practice.js';
import { renderPlan }       from './views/plan.js';
import { renderCompany }    from './views/company.js';
import { renderGlossary }   from './views/glossary.js';
import { renderNotebook }   from './views/notebook.js';
import { buildSearchIndex } from './search.js';

/* ---------------- navigation model ---------------- */
const NAV = [
  { group: 'Prepare', items: [
    { route: 'dashboard', label: 'Dashboard',        icon: 'home' },
    { route: 'plan',      label: 'Study plan',       icon: 'calendar' },
    { route: 'rolefit',   label: 'Role fit',         icon: 'target' }
  ]},
  { group: 'Learn', items: [
    { route: 'knowledge', label: 'Knowledge hub',    icon: 'book' },
    { route: 'orgmap',    label: 'How orgs work',    icon: 'network' },
    { route: 'company',   label: 'Company dossier',  icon: 'building' },
    { route: 'glossary',  label: 'Glossary',         icon: 'glossary' }
  ]},
  { group: 'Practise', items: [
    { route: 'interview', label: 'Question bank',    icon: 'chat' },
    { route: 'mock',      label: 'Mock interview',   icon: 'mic' },
    { route: 'practice',  label: 'Drills',           icon: 'cards' }
  ]},
  { group: 'You', items: [
    { route: 'notebook',  label: 'Notebook',         icon: 'notebook' }
  ]}
];

const ROUTES = {
  dashboard: renderDashboard,
  plan:      renderPlan,
  rolefit:   renderRoleFit,
  knowledge: renderKnowledge,
  concept:   renderConcept,
  study:     renderSession,
  orgmap:    renderOrgMap,
  company:   renderCompany,
  glossary:  renderGlossary,
  interview: renderInterview,
  question:  renderQuestion,
  mock:      renderMock,
  practice:  renderPractice,
  notebook:  renderNotebook
};

/* ---------------- sidebar ---------------- */
function buildSidebar() {
  const nav = $('#sidebar');
  clear(nav);
  NAV.forEach(g => {
    const box = el('div', { class: 'navgroup' }, el('div', { class: 'navgroup__t' }, g.group));
    g.items.forEach(it => {
      box.appendChild(el('a', {
        class: 'navlink', href: '#/' + it.route, dataset: { route: it.route }
      }, icon(it.icon, 16), el('span', {}, it.label)));
    });
    nav.appendChild(box);
  });

  nav.appendChild(el('div', { class: 'sidebar__foot stack', style: { '--gap': '.5rem' } },
    el('button', { class: 'btn btn--sm btn--block', onClick: openDataPanel },
      icon('download', 14), 'Progress & data'),
    el('p', { class: 't-xs muted2' },
      'Everything you write is stored only in this browser. Nothing is uploaded.')
  ));
}

function paintNav(route) {
  $$('.navlink').forEach(a =>
    a.setAttribute('aria-current', a.dataset.route === route ? 'page' : 'false'));
}

/* ---------------- data panel ---------------- */
function openDataPanel() {
  const s = store.get();
  const stats = [
    ['Concepts touched', Object.keys(s.concepts).length],
    ['Answers drafted', Object.values(s.questions).filter(q => q.answer && q.answer.trim()).length],
    ['Cards in review', Object.keys(s.cards).length],
    ['Mock sessions', s.mock.length],
    ['Notes', s.notes.length],
    ['Bookmarks', s.bookmarks.length]
  ];
  const fileIn = el('input', { type: 'file', accept: 'application/json', style: { display: 'none' } });
  fileIn.addEventListener('change', () => {
    const f = fileIn.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try { store.import(r.result); toast('Progress restored'); location.reload(); }
      catch (e) { toast('That file could not be read'); }
    };
    r.readAsText(f);
  });

  modal({
    title: 'Your progress and data',
    body: el('div', { class: 'stack' },
      el('div', { class: 'grid grid--3' }, stats.map(([l, n]) =>
        el('div', { class: 'card card--tint stat' },
          el('span', { class: 'stat__n' }, String(n)),
          el('span', { class: 'stat__l' }, l)))),
      el('div', { class: 'note note--info' },
        el('div', { class: 'note__title' }, 'Where this lives'),
        'PM Runway keeps your notes, answers, confidence ratings and review schedule in this browser’s local storage. It never leaves your device. Clearing site data, using a private window, or switching browser will lose it — export a backup before an interview.'),
      fileIn
    ),
    foot: [
      el('button', { class: 'btn btn--danger', onClick: () => {
        if (confirm('Erase every note, answer and rating stored in this browser?')) { store.reset(); location.reload(); }
      }}, 'Erase everything'),
      el('button', { class: 'btn', onClick: () => fileIn.click() }, 'Restore backup'),
      el('button', { class: 'btn btn--primary', onClick: () => {
        const blob = new Blob([store.export()], { type: 'application/json' });
        const a = el('a', { href: URL.createObjectURL(blob), download: `pm-runway-backup-${new Date().toISOString().slice(0,10)}.json` });
        document.body.appendChild(a); a.click(); a.remove();
        toast('Backup downloaded');
      }}, icon('download', 15), 'Download backup')
    ]
  });
}

/* ---------------- router ---------------- */
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, query] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  return {
    route: parts[0] || 'dashboard',
    param: parts[1] ? decodeURIComponent(parts[1]) : null,
    sub:   parts[2] ? decodeURIComponent(parts[2]) : null,
    query: new URLSearchParams(query || '')
  };
}

export function go(path) { location.hash = '#/' + path.replace(/^\/+/, ''); }

let currentRoute = null;

function render() {
  const { route, param, sub, query } = parseHash();
  const view = ROUTES[route] || ROUTES.dashboard;
  const main = $('#main');

  clear(main);
  const page = el('div', { class: 'page anim-rise' });
  main.appendChild(page);

  try {
    view(page, { param, sub, query, go });
  } catch (e) {
    console.error(e);
    page.appendChild(el('div', { class: 'note note--bad' },
      el('div', { class: 'note__title' }, 'Something went wrong rendering this page'),
      String(e && e.message || e)));
  }

  // primary nav highlight maps sub-pages back to their parent
  const parent = { concept: 'knowledge', study: 'knowledge', question: 'interview' }[route] || route;
  paintNav(parent);
  store.markSeen(route);

  if (currentRoute !== route + '/' + (param || '')) {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }
  currentRoute = route + '/' + (param || '');
  closeMobileNav();

  const title = $('.pagehead__t', page);
  document.title = (title ? title.textContent + ' — ' : '') + 'PM Runway';
}

/* ---------------- mobile nav ---------------- */
let scrim = null;
function openMobileNav() {
  const sb = $('#sidebar');
  sb.dataset.open = 'true';
  $('#navToggle').setAttribute('aria-expanded', 'true');
  scrim = el('div', { class: 'navscrim', onClick: closeMobileNav });
  document.body.appendChild(scrim);
}
function closeMobileNav() {
  const sb = $('#sidebar');
  if (sb.dataset.open === 'true') { sb.dataset.open = 'false'; $('#navToggle').setAttribute('aria-expanded', 'false'); }
  if (scrim) { scrim.remove(); scrim = null; }
}

/* ---------------- chrome wiring ---------------- */
function wireChrome() {
  $('#navToggle').addEventListener('click', () =>
    $('#sidebar').dataset.open === 'true' ? closeMobileNav() : openMobileNav());

  const themeBtn = $('#themeToggle');
  themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const now = root.getAttribute('data-theme');
    const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const next = now === 'dark' ? 'light' : now === 'light' ? 'dark' : (sysDark ? 'light' : 'dark');
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('pmrunway.theme', next); } catch (e) {}
    toast(next === 'dark' ? 'Dark theme' : 'Light theme');
  });

  const focusBtn = $('#focusToggle');
  const syncFocus = () => {
    const on = document.documentElement.getAttribute('data-focus') === 'true';
    focusBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  };
  focusBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const on = root.getAttribute('data-focus') === 'true';
    if (on) { root.removeAttribute('data-focus'); try { localStorage.removeItem('pmrunway.focus'); } catch (e) {} }
    else { root.setAttribute('data-focus', 'true'); try { localStorage.setItem('pmrunway.focus', '1'); } catch (e) {} }
    syncFocus();
    toast(on ? 'Full interface' : 'Focus mode — sidebar and search hidden');
  });
  syncFocus();

  /* keyboard: "/" focuses search, Esc clears */
  document.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if (e.key === '/' && !typing) { e.preventDefault(); $('#globalSearch').focus(); }
    if (e.key === 'Escape' && tag === 'input') { $('#globalSearch').blur(); hideResults(); }
  });

  wireSearch();
}

/* ---------------- global search ---------------- */
let searchIndex = null;
let resultsBox = null;

function hideResults() { if (resultsBox) { resultsBox.remove(); resultsBox = null; } }

function wireSearch() {
  const input = $('#globalSearch');
  const run = () => {
    const q = input.value.trim().toLowerCase();
    hideResults();
    if (q.length < 2) return;
    if (!searchIndex) searchIndex = buildSearchIndex();

    const terms = q.split(/\s+/);
    const hits = searchIndex
      .map(item => {
        let score = 0;
        for (const t of terms) {
          if (item.title.toLowerCase().includes(t)) score += 6;
          if (item.kind.toLowerCase().includes(t)) score += 2;
          if (item.body.includes(t)) score += 1;
        }
        return { item, score };
      })
      .filter(h => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);

    resultsBox = el('div', {
      class: 'card', role: 'listbox',
      style: {
        position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 80,
        maxHeight: '62vh', overflowY: 'auto', padding: '.35rem', boxShadow: 'var(--sh-3)'
      }
    });
    if (!hits.length) {
      resultsBox.appendChild(el('div', { class: 'empty t-sm' }, 'Nothing matched “' + input.value + '”'));
    } else {
      hits.forEach(h => resultsBox.appendChild(el('a', {
        href: '#/' + h.item.route, class: 'navlink',
        style: { alignItems: 'flex-start' },
        onClick: () => { hideResults(); input.value = ''; }
      },
        el('span', { class: 'chip chip--outline t-xs', style: { flex: 'none', marginTop: '2px' } }, h.item.kind),
        el('span', { class: 'grow' },
          el('span', { style: { display: 'block', fontWeight: '560' } }, h.item.title),
          h.item.hint ? el('span', { class: 't-xs muted2', style: { display: 'block' } }, h.item.hint) : null)
      )));
    }
    input.closest('.searchbox').appendChild(resultsBox);
  };
  input.addEventListener('input', run);
  input.addEventListener('focus', run);
  document.addEventListener('click', e => {
    if (resultsBox && !e.target.closest('.searchbox')) hideResults();
  });
}

/* ---------------- boot ---------------- */
buildSidebar();
wireChrome();
window.addEventListener('hashchange', render);
if (!location.hash) location.replace('#/dashboard');
render();
