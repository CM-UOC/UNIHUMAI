/* ============================================================
   ui.js — tiny DOM helpers + shared components
   ============================================================ */

import { store } from './store.js';

/* ---------- element factory ---------- */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of children.flat(4)) {
    if (c === null || c === undefined || c === false) continue;
    node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  return node;
}

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }

/* Very small markdown-ish inline formatter: **bold**, *italic*, `code` */
export function rich(str = '') {
  const esc = String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
}

/* rich() returns an HTML string; rx() wraps it in a node for use as a child */
export function rx(str = '') {
  const span = document.createElement('span');
  span.innerHTML = rich(str);
  return span;
}

export function p(text, cls) { return el('p', { class: cls, html: rich(text) }); }

export function list(items, cls = '') {
  return el('ul', { class: cls }, items.map(i => el('li', { html: rich(i) })));
}

export function olist(items, cls = '') {
  return el('ol', { class: cls }, items.map(i => el('li', { html: rich(i) })));
}

/* ---------- icons ---------- */
const ICONS = {
  home:      '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.6V21h14V9.6"/>',
  target:    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  book:      '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  network:   '<circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="M12 7.4v4.2M12 11.6 6.6 16M12 11.6 17.4 16"/>',
  mic:       '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  chat:      '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.6A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8Z"/>',
  cards:     '<rect x="3" y="6" width="13" height="14" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v11"/>',
  calendar:  '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  building:  '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
  glossary:  '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v14.5"/><path d="M6.5 17H20v4H6.5A2.5 2.5 0 0 1 4 18.5v-13"/><path d="M9 8h7"/>',
  notebook:  '<path d="M6 3h12a1 1 0 0 1 1 1v17H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M9 7h7M9 11h7M9 15h4"/>',
  check:     '<path d="m4.5 12.5 5 5 10-11"/>',
  bookmark:  '<path d="M6 3h12v18l-6-4.5L6 21Z"/>',
  star:      '<path d="m12 3.5 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8Z"/>',
  chevron:   '<path d="m9 5 7 7-7 7"/>',
  x:         '<path d="M6 6 18 18M18 6 6 18"/>',
  clock:     '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  flask:     '<path d="M9 3h6M10.5 3v6L4.6 18.4A2 2 0 0 0 6.3 21.5h11.4a2 2 0 0 0 1.7-3.1L13.5 9V3"/><path d="M7.6 14h8.8"/>',
  scale:     '<path d="M12 3v18M5 7h14M7.5 7 4 14h7ZM16.5 7 13 14h7Z"/>',
  compass:   '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
  layers:    '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
  gauge:     '<path d="M12 14 16 9"/><path d="M4 18a9 9 0 1 1 16 0"/><circle cx="12" cy="18" r="1.4"/>',
  download:  '<path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 20h16"/>',
  refresh:   '<path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.5"/><path d="M20 20v-4.5h-4.5"/>',
  arrow:     '<path d="M5 12h14M13 6l6 6-6 6"/>',
  alert:     '<path d="M12 4 2.5 20h19Z"/><path d="M12 10v4M12 17.2v.1"/>',
  plus:      '<path d="M12 5v14M5 12h14"/>',
  search:    '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  users:     '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.2M17 20a6 6 0 0 0-2-4.5"/>',
  route:     '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3.5 3.5 0 0 1 0 7H10a3.5 3.5 0 0 0 0 7h5.5"/>'
};

export function icon(name, size = 17, stroke = 1.7) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size); svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', stroke);
  svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = ICONS[name] || ICONS.check;
  return svg;
}

/* ---------- evidence labels ----------
   Every claim on this site carries one of these. */
export const EV = {
  cv:        { cls: 'ev--cv',        label: 'From your CV' },
  portfolio: { cls: 'ev--portfolio', label: 'From your portfolio' },
  jd:        { cls: 'ev--jd',        label: 'From the job ad' },
  interp:    { cls: 'ev--interp',    label: 'Interpretation' },
  assume:    { cls: 'ev--assume',    label: 'Assumption' },
  general:   { cls: 'ev--general',   label: 'General PM guidance' },
  verify:    { cls: 'ev--verify',    label: 'Verify before using' },
  company:   { cls: 'ev--portfolio', label: 'Public company info' }
};

export function evBadge(kind, override) {
  const d = EV[kind] || EV.general;
  return el('span', { class: 'ev ' + d.cls, title: EV_TIP[kind] || '' }, override || d.label);
}

const EV_TIP = {
  cv: 'Taken directly from the CV PDF you supplied.',
  portfolio: 'Taken directly from cmmt.me, your professional portfolio.',
  jd: 'Quoted or paraphrased from the GIS:Hub job description you supplied.',
  interp: 'A reasonable reading of your materials — not something they state outright.',
  assume: 'An assumption made to fill a gap. Check it before you rely on it.',
  general: 'Standard product management practice, not specific to you or this employer.',
  verify: 'Uncertain. Confirm with the recruiter, the company, or your own records.',
  company: 'Sourced from public company or press material. Re-check before quoting it.'
};

/* ---------- toast ---------- */
export function toast(message) {
  const host = $('#toasts');
  const t = el('div', { class: 'toast' }, message);
  host.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; }, 1900);
  setTimeout(() => t.remove(), 2300);
}

/* ---------- modal ---------- */
export function modal({ title, body, foot, wide }) {
  const root = $('#modalRoot');
  const close = () => { back.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };

  const dialog = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title,
    style: wide ? { width: 'min(900px, 100%)' } : {} },
    el('div', { class: 'modal__head' },
      el('h2', { class: 't-h2' }, title),
      el('button', { class: 'iconbtn', 'aria-label': 'Close', onClick: close }, icon('x', 18))
    ),
    el('div', { class: 'modal__body' }, body),
    foot ? el('div', { class: 'modal__foot' }, foot) : null
  );
  const back = el('div', { class: 'modal-backdrop', onClick: e => { if (e.target === back) close(); } }, dialog);
  root.appendChild(back);
  document.addEventListener('keydown', onKey);
  setTimeout(() => { const f = dialog.querySelector('button, input, textarea, a'); if (f) f.focus(); }, 40);
  return { close, dialog };
}

/* ---------- bookmark button ---------- */
export function bookmarkBtn(type, id, label) {
  const b = el('button', { class: 'iconbtn', 'aria-label': 'Bookmark', title: 'Bookmark' });
  const paint = () => {
    const on = store.isBookmarked(type, id);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    clear(b).appendChild(icon('bookmark', 16, on ? 2.2 : 1.7));
    b.style.color = on ? 'var(--accent)' : '';
    b.querySelector('svg').setAttribute('fill', on ? 'currentColor' : 'none');
  };
  b.addEventListener('click', () => {
    const now = store.toggleBookmark(type, id, label);
    paint();
    toast(now ? 'Bookmarked' : 'Bookmark removed');
  });
  paint();
  return b;
}

/* ---------- confidence rater (0–4) ---------- */
export const CONFIDENCE_LABELS = [
  'Not yet',
  'I recognise it',
  'I can explain it',
  'I can apply it',
  'I can teach it'
];

export function confidenceRater(value, onChange, compact) {
  const wrap = el('div', { class: 'rate', role: 'group', 'aria-label': 'Confidence' });
  const paint = v => $$('button', wrap).forEach((b, i) => b.setAttribute('aria-pressed', i === v ? 'true' : 'false'));
  CONFIDENCE_LABELS.forEach((lab, i) => {
    wrap.appendChild(el('button', {
      title: `${i} — ${lab}`, 'aria-label': `${i} — ${lab}`,
      onClick: () => { onChange(i); paint(i); }
    }, String(i)));
  });
  paint(typeof value === 'number' ? value : -1);
  if (compact) return wrap;
  return el('div', { class: 'row-wrap' }, wrap,
    el('span', { class: 't-xs muted2' }, typeof value === 'number' ? CONFIDENCE_LABELS[value] : 'Rate your confidence'));
}

/* ---------- autosaving textarea ---------- */
export function savedTextarea({ value = '', placeholder, rows = 5, onSave, label, minHeight }) {
  const status = el('span', { class: 't-xs muted2' }, value ? 'Saved' : '');
  const ta = el('textarea', {
    class: 'textarea', rows, placeholder,
    'aria-label': label || placeholder || 'Your answer',
    style: minHeight ? { minHeight } : {}
  });
  ta.value = value;
  let timer = null;
  ta.addEventListener('input', () => {
    status.textContent = 'Saving…';
    clearTimeout(timer);
    timer = setTimeout(() => { onSave(ta.value); status.textContent = 'Saved to this browser'; }, 500);
  });
  const wc = el('span', { class: 't-xs muted2' });
  const count = () => { const w = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; wc.textContent = w ? `${w} words` : ''; };
  ta.addEventListener('input', count); count();
  return el('div', { class: 'stack', style: { '--gap': '.35rem' } },
    ta,
    el('div', { class: 'spread' }, wc, status)
  );
}

/* ---------- accordion ---------- */
export function accordion(title, bodyFn, opts = {}) {
  const body = el('div', { class: 'acc__body', hidden: !opts.open });
  let built = !!opts.open;
  if (opts.open) body.appendChild(bodyFn());
  const chev = el('span', { class: 'acc__chev' }, icon('chevron', 14));
  const btn = el('button', {
    class: 'acc__btn', 'aria-expanded': opts.open ? 'true' : 'false',
    onClick: () => {
      const open = body.hidden;
      if (open && !built) { body.appendChild(bodyFn()); built = true; }
      body.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      chev.style.transform = open ? 'rotate(90deg)' : '';
    }
  }, opts.badge || null, el('span', { html: rich(title) }), chev);
  if (opts.open) chev.style.transform = 'rotate(90deg)';
  return el('div', { class: 'acc' }, btn, body);
}

/* ---------- tabs ---------- */
export function tabs(items, opts = {}) {
  const panel = el('div', { style: { marginTop: opts.gap || '1rem' } });
  const bar = el('div', { class: 'tabs', role: 'tablist' });
  let current = opts.initial || 0;
  const paint = () => {
    $$('button', bar).forEach((b, i) => b.setAttribute('aria-selected', i === current ? 'true' : 'false'));
    clear(panel).appendChild(items[current].render());
    panel.classList.remove('anim-fade'); void panel.offsetWidth; panel.classList.add('anim-fade');
    if (opts.onChange) opts.onChange(current, items[current]);
  };
  items.forEach((it, i) => bar.appendChild(el('button', {
    class: 'tab', role: 'tab', 'aria-selected': 'false',
    onClick: () => { current = i; paint(); }
  }, it.label)));
  paint();
  return el('div', {}, bar, panel);
}

/* ---------- section heading ---------- */
export function section(id, n, title, ...body) {
  return el('section', { class: 'section', id },
    el('div', { class: 'section__t' },
      n ? el('span', { class: 'section__n' }, String(n)) : null,
      el('h3', { class: 't-h3' }, title)),
    ...body);
}

/* ---------- progress ring ---------- */
export function ring(pct, size = 56, stroke = 6, colour) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size); svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('class', 'ring'); svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML =
    `<circle class="ring__track" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}"/>` +
    `<circle class="ring__fill" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}"
       stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.max(0, Math.min(1, pct)))}"
       ${colour ? `style="stroke:${colour}"` : ''}/>`;
  return svg;
}

export function bar(pct, cls = '') {
  return el('div', { class: 'bar ' + cls, role: 'progressbar', 'aria-valuenow': Math.round(pct * 100), 'aria-valuemin': 0, 'aria-valuemax': 100 },
    el('i', { style: { width: Math.max(0, Math.min(1, pct)) * 100 + '%' } }));
}

/* ---------- misc ---------- */
export function timeAgo(ts) {
  if (!ts) return '—';
  const s = (Date.now() - ts) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + ' min ago';
  if (s < 86400) return Math.floor(s / 3600) + ' h ago';
  const d = Math.floor(s / 86400);
  return d === 1 ? 'yesterday' : d + ' days ago';
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function pageHead({ eyebrow, title, lead, actions, meta }) {
  return el('header', { class: 'pagehead anim-rise' },
    eyebrow ? el('div', { class: 't-eyebrow' }, eyebrow) : null,
    el('div', { class: 'spread' },
      el('h1', { class: 'pagehead__t t-h1' }, title),
      actions ? el('div', { class: 'row-wrap focus-hide' }, actions) : null),
    lead ? el('p', { class: 't-lead measure', html: rich(lead) }) : null,
    meta ? el('div', { class: 'row-wrap', style: { marginTop: '.6rem' } }, meta) : null
  );
}
