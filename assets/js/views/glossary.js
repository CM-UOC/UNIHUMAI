import { el, $$, icon, pageHead, rich, clear } from '../ui.js';
import { GLOSSARY, GLOSSARY_CATS } from '../data/glossary.js';
import { CONCEPTS } from '../data/concepts.js';

export function renderGlossary(page, { query }) {
  page.appendChild(pageHead({
    eyebrow: 'Reference',
    title: 'Glossary',
    lead: `${GLOSSARY.length} terms, written as they are actually used rather than as dictionary definitions. Where a term is contested or company-specific, that is said.`
  }));

  const state = { cat: 'all', q: query && query.get('q') || '' };
  const focus = query && query.get('t');

  const search = el('input', { class: 'input', type: 'search', placeholder: 'Search terms and definitions…', style: { maxWidth: '360px' } });
  search.value = state.q;
  const cats = el('div', { class: 'row-wrap', style: { marginTop: '.6rem' } },
    el('button', { class: 'pill', dataset: { c: 'all' } }, 'All'),
    GLOSSARY_CATS.map(c => el('button', { class: 'pill', dataset: { c } }, c)));
  const listBox = el('div', { class: 'stack', style: { '--gap': '.55rem', marginTop: '1rem' } });

  function conceptsFor(id) {
    return CONCEPTS.filter(c => (c.glossary || []).includes(id));
  }

  function paint() {
    $$('button', cats).forEach(b => b.setAttribute('aria-pressed', b.dataset.c === state.cat ? 'true' : 'false'));
    const q = state.q.trim().toLowerCase();
    let hits = GLOSSARY.filter(g => state.cat === 'all' || g.cat === state.cat);
    if (q) hits = hits.filter(g => (g.term + ' ' + g.def + ' ' + g.cat).toLowerCase().includes(q));
    hits = hits.slice().sort((a, b) => a.term.localeCompare(b.term));
    clear(listBox);
    if (!hits.length) { listBox.appendChild(el('div', { class: 'empty' }, 'Nothing matched.')); return; }
    hits.forEach(g => {
      const used = conceptsFor(g.id);
      listBox.appendChild(el('div', {
        class: 'card', id: 'term-' + g.id,
        style: focus === g.id ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent)' } : {}
      },
        el('div', { class: 'spread', style: { alignItems: 'flex-start', gap: '.7rem', marginBottom: '.25rem' } },
          el('h3', { class: 't-h3' }, g.term),
          el('div', { class: 'row-wrap', style: { flex: 'none' } },
            g.verify ? el('span', { class: 'ev ev--verify' }, 'Verify') : null,
            el('span', { class: 'chip chip--outline' }, g.cat))),
        el('p', { class: 't-sm', html: rich(g.def) }),
        used.length ? el('div', { class: 'row-wrap', style: { marginTop: '.5rem' } },
          el('span', { class: 't-xs muted2' }, 'Used in:'),
          used.map(c => el('a', { class: 'chip chip--outline t-xs', href: '#/study/' + c.id, style: { textDecoration: 'none' } }, c.title))) : null));
    });
    if (focus) {
      const node = document.getElementById('term-' + focus);
      if (node) setTimeout(() => node.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
    }
  }

  search.addEventListener('input', () => { state.q = search.value; paint(); });
  cats.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { state.cat = b.dataset.c; paint(); } });

  page.appendChild(el('div', { class: 'card card--tint' }, search, cats));
  page.appendChild(listBox);
  paint();
}
