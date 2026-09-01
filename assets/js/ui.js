/* ui.js — DOM helpers */
import { PLAIN, CASE_SENSITIVE } from './data/plain.js';

export function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k === 'text') n.textContent = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v);
    else if (k === 'dataset') Object.assign(n.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2).toLowerCase(), v);
    else n.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of kids.flat(5)) {
    if (c === null || c === undefined || c === false) continue;
    n.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
  return n;
}

export const $  = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
export function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); return n; }

/* ---------- inline plain-English definitions ----------
   The first time a technical term or acronym appears in a passage, it is
   followed by a short explanation in a muted color. Matching runs longest
   phrase first, skips anything already inside a tag, inside <code>, or
   already followed by a parenthesis, and never runs on verbatim quotes —
   those are rendered as plain text and never pass through here. */

const ESC = t => t.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

const GLOSS_RULES = PLAIN.map(([term, def]) => {
  const cased = CASE_SENSITIVE.has(term);
  const alnum = /[A-Za-z0-9]/;
  const left  = alnum.test(term[0])            ? '(^|[^A-Za-z0-9_-])' : '()';
  const right = alnum.test(term[term.length-1]) ? '(?![A-Za-z0-9_-])'  : '';
  return {
    def,
    re: new RegExp(left + '(' + ESC(term) + (term.endsWith('s') ? '' : 's?') + ')' + right,
                   cased ? '' : 'i')
  };
});

export function glossHTML(html) {
  if (!html) return html;
  /* Split on tags so only visible text is ever touched. A term is explained
     once per paragraph — so a reader who lands anywhere in a long answer still
     gets the explanation next to the term. */
  const parts = html.split(/(<[^>]+>)/);
  const BLOCK = /^<\/?(p|br|li|div|h[1-6]|tr|td|section|figure|dt|dd|ol|ul)[\s/>]/i;
  let inCode = 0;
  let used = new Set();
  for (let i = 0; i < parts.length; i++) {
    const seg = parts[i];
    if (seg.startsWith('<')) {
      if (/^<code[\s>]/i.test(seg)) inCode++;
      else if (/^<\/code>/i.test(seg)) inCode = Math.max(0, inCode - 1);
      else if (BLOCK.test(seg)) used = new Set();   // new paragraph, explain again
      continue;
    }
    if (inCode || !seg.trim()) continue;

    /* A blank line inside a text run is also a paragraph break. */
    const chunks = seg.split(/(\n[ \t]*\n)/);
    for (let c = 0; c < chunks.length; c++) {
      const chunk = chunks[c];
      if (/^\n[ \t]*\n$/.test(chunk)) { used = new Set(); continue; }
      if (!chunk.trim()) continue;

      /* Match against the pristine chunk, so a definition is never inserted
         inside another definition and overlapping terms cannot double up. */
      const hits = [];
      for (let r = 0; r < GLOSS_RULES.length; r++) {
        if (used.has(r)) continue;
        const { re, def } = GLOSS_RULES[r];
        const m = re.exec(chunk);
        if (!m) continue;
        const from = m.index + m[1].length;
        const to = m.index + m[0].length;
        if (hits.some(h => from < h.to && to > h.from)) continue;
        if (/^\s*[([]/.test(chunk.slice(to))) { used.add(r); continue; }
        used.add(r);
        hits.push({ from, to, def });
      }
      if (!hits.length) continue;
      hits.sort((a, b) => b.to - a.to);
      let text = chunk;
      for (const h of hits) {
        text = text.slice(0, h.to) + ' <span class="gloss">(' + h.def + ')</span>' + text.slice(h.to);
      }
      chunks[c] = text;
    }
    parts[i] = chunks.join('');
  }
  return parts.join('');
}

export function rich(s = '', opts) {
  const html = String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(—])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return (opts && opts.plain) ? html : glossHTML(html);
}

/* For verbatim source quotes and monospace artifacts: format, never gloss. */
export function verbatim(s = '') { return rich(s, { plain: true }); }
export function rx(s = '') { const n = document.createElement('span'); n.innerHTML = rich(s); return n; }
export function p(s, cls) { return el('p', { class: cls, html: rich(s) }); }
export function ul(items, cls) { return el('ul', { class: cls }, items.map(i => el('li', { html: rich(i) }))); }
export function ol(items, cls) { return el('ol', { class: cls }, items.map(i => el('li', { html: rich(i) }))); }

const ICONS = {
  arrow:'<path d="M5 12h13M12 5.5 18.5 12 12 18.5"/>',
  back:'<path d="M19 12H6M13 5.5 6.5 12 13 18.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  check:'<path d="m4.5 12.5 5 5 10-11"/>',
  x:'<path d="M6 6 18 18M18 6 6 18"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  chat:'<path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.6A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  alert:'<path d="M12 4 2.5 20h19Z"/><path d="M12 10v4M12 17.2v.1"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  star:'<path d="m12 3.5 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8Z"/>',
  film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.2M17 20a6 6 0 0 0-2-4.5"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  down:'<path d="M12 5v13M5.5 12 12 18.5 18.5 12"/>'
};
export function icon(name, size = 18, w = 1.7) {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('width', size); s.setAttribute('height', size);
  s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none');
  s.setAttribute('stroke', 'currentColor'); s.setAttribute('stroke-width', w);
  s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
  s.setAttribute('aria-hidden', 'true');
  s.innerHTML = ICONS[name] || ICONS.check;
  return s;
}

export const EV = {
  cv:    ['ev--cv',    'From your CV'],
  pf:    ['ev--pf',    'From your portfolio'],
  jd:    ['ev--jd',    'From the job ad'],
  int:   ['ev--int',   'Interpretation'],
  gen:   ['ev--gen',   'General PM practice'],
  check: ['ev--check', 'Verify before using'],
  fic:   ['ev--fic',   'Constructed case']
};
export function ev(kind, override) {
  const [cls, label] = EV[kind] || EV.gen;
  return el('span', { class: 'ev ' + cls }, override || label);
}

export function toast(msg) {
  const host = $('#toasts');
  const t = el('div', { class: 'toast' }, msg);
  host.appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity .3s'; t.style.opacity = '0'; }, 1800);
  setTimeout(() => t.remove(), 2200);
}

/* reveal-on-scroll */
let io = null;
export function watchReveals(root = document) {
  if (!('IntersectionObserver' in window)) { $$('.reveal', root).forEach(n => n.classList.add('in')); return; }
  if (io) io.disconnect();
  io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
  $$('.reveal', root).forEach(n => io.observe(n));
}

/* section rail with scroll spy */
export function railSpy(rail, sections) {
  const items = $$('.rail-item', rail);
  const onScroll = () => {
    const y = window.scrollY + 140;
    let cur = 0;
    sections.forEach((s, i) => { const n = document.getElementById(s.id); if (n && n.offsetTop <= y) cur = i; });
    items.forEach((it, i) => it.classList.toggle('on', i === cur));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}
