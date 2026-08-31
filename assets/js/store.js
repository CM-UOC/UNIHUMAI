/* store.js — the only thing kept: which chapters you have read.
   No scoring, no testing, no schedules. */
const KEY = 'pmr.read.v2';

function load() {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); }
  catch (e) { return new Set(); }
}
let read = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify([...read])); } catch (e) {} }

export const store = {
  isRead: id => read.has(id),
  markRead(id) { if (!read.has(id)) { read.add(id); save(); } },
  toggle(id) { read.has(id) ? read.delete(id) : read.add(id); save(); return read.has(id); },
  count: () => read.size,
  reset() { read = new Set(); save(); }
};
