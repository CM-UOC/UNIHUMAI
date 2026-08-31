/* glossary.js — terms defined inline, where they are used.
   There is no separate glossary section by design. */
import { el, rich, icon } from '../ui.js';
import { GLOSSARY_BY_ID } from '../data/glossary.js';

/** A block of full definitions for the terms a chapter actually uses. */
export function termsBlock(ids = [], title = 'Terms used in this chapter') {
  const terms = ids.map(id => GLOSSARY_BY_ID[id]).filter(Boolean);
  if (!terms.length) return null;
  return el('div', { class: 'panel panel--sunk' },
    el('div', { class: 'slug', style: { marginBottom: '.9rem' } }, title),
    el('dl', { class: 'defs' }, terms.map(t =>
      el('div', { class: 'def' },
        el('dt', {}, t.term, t.verify ? el('span', { class: 'ev ev--check', style: { marginLeft: '.5rem' } }, 'Verify') : null),
        el('dd', { html: rich(t.def) })))));
}

/** Inline definition chips for a short list — used in the interview answers. */
export function termsInline(ids = []) {
  const terms = ids.map(id => GLOSSARY_BY_ID[id]).filter(Boolean);
  if (!terms.length) return null;
  return el('div', { class: 'defs defs--tight' }, terms.map(t =>
    el('div', { class: 'def' },
      el('dt', {}, t.term),
      el('dd', { html: rich(t.def) }))));
}
