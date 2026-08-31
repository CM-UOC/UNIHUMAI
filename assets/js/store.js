/* ============================================================
   store.js — everything the learner produces, kept in this browser
   ============================================================ */

const KEY = 'pmrunway.state.v1';

const BLANK = {
  version: 1,
  createdAt: null,
  concepts: {},    // id -> { read, confidence, ownWords, quiz:{correct,total}, updatedAt }
  questions: {},   // id -> { answer, confidence, practised, lastAt }
  roleFit: {},     // reqId -> { confidence, note }
  cards: {},       // id -> { ease, interval, due, reps, lapses, lastAt }
  quizRuns: [],    // { at, set, score, total }
  mock: [],        // { at, track, items:[{qid, answer, scores:{}, notes}] }
  drills: {},      // drillId -> { bestScore, attempts, lastAt }
  scenarios: {},   // scenarioId -> { choices:{}, completedAt }
  bookmarks: [],   // { type, id, label, at }
  notes: [],       // { id, at, scope, scopeLabel, text }
  plan: { startedAt: null, done: [] },
  seen: {},        // route -> lastVisitedAt
  prefs: { cardsPerSession: 12, timerSeconds: 120 }
};

function clone(o) { return JSON.parse(JSON.stringify(o)); }

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...clone(BLANK), createdAt: Date.now() };
    const parsed = JSON.parse(raw);
    return { ...clone(BLANK), ...parsed, prefs: { ...BLANK.prefs, ...(parsed.prefs || {}) } };
  } catch (e) {
    console.warn('PM Runway: could not read saved progress, starting fresh.', e);
    return { ...clone(BLANK), createdAt: Date.now() };
  }
}

let state = load();
let writeTimer = null;
const listeners = new Set();

function flush() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('PM Runway: progress could not be saved (storage unavailable or full).', e);
  }
}

function commit(silent) {
  clearTimeout(writeTimer);
  writeTimer = setTimeout(flush, 250);
  if (!silent) listeners.forEach(fn => { try { fn(state); } catch (e) { console.error(e); } });
}

export const store = {
  get() { return state; },

  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  /** Mutate a slice: store.patch('concepts', id, {...}) */
  patch(bucket, id, changes, silent) {
    if (!state[bucket]) state[bucket] = {};
    state[bucket][id] = { ...(state[bucket][id] || {}), ...changes, updatedAt: Date.now() };
    commit(silent);
    return state[bucket][id];
  },

  entry(bucket, id, fallback = {}) {
    return (state[bucket] && state[bucket][id]) || fallback;
  },

  push(bucket, item) {
    if (!Array.isArray(state[bucket])) state[bucket] = [];
    state[bucket].push(item);
    commit();
    return item;
  },

  set(path, value) {
    state[path] = value;
    commit();
  },

  pref(key, value) {
    if (value === undefined) return state.prefs[key];
    state.prefs[key] = value;
    commit(true);
    return value;
  },

  markSeen(route) {
    state.seen[route] = Date.now();
    commit(true);
  },

  /* ---------- bookmarks ---------- */
  isBookmarked(type, id) {
    return state.bookmarks.some(b => b.type === type && b.id === id);
  },
  toggleBookmark(type, id, label) {
    const i = state.bookmarks.findIndex(b => b.type === type && b.id === id);
    if (i >= 0) state.bookmarks.splice(i, 1);
    else state.bookmarks.push({ type, id, label, at: Date.now() });
    commit();
    return i < 0;
  },

  /* ---------- notes ---------- */
  addNote(scope, scopeLabel, text) {
    const note = { id: 'n' + Date.now().toString(36), at: Date.now(), scope, scopeLabel, text };
    state.notes.unshift(note);
    commit();
    return note;
  },
  updateNote(id, text) {
    const n = state.notes.find(x => x.id === id);
    if (n) { n.text = text; n.at = Date.now(); commit(); }
  },
  removeNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    commit();
  },

  /* ---------- plan ---------- */
  togglePlanTask(taskId) {
    if (!state.plan.startedAt) state.plan.startedAt = Date.now();
    const i = state.plan.done.indexOf(taskId);
    if (i >= 0) state.plan.done.splice(i, 1); else state.plan.done.push(taskId);
    commit();
    return i < 0;
  },

  /* ---------- spaced repetition (SM-2, simplified) ----------
     grade: 0 = again, 1 = hard, 2 = good, 3 = easy                */
  reviewCard(id, grade) {
    const c = { ease: 2.5, interval: 0, reps: 0, lapses: 0, ...(state.cards[id] || {}) };
    if (grade === 0) {
      c.lapses += 1; c.reps = 0; c.interval = 0;
      c.ease = Math.max(1.3, c.ease - 0.2);
    } else {
      c.reps += 1;
      c.ease = Math.min(2.8, Math.max(1.3, c.ease + (grade === 1 ? -0.15 : grade === 3 ? 0.1 : 0)));
      if (c.reps === 1) c.interval = grade === 1 ? 1 : 2;
      else if (c.reps === 2) c.interval = grade === 1 ? 3 : 5;
      else c.interval = Math.round(c.interval * c.ease * (grade === 1 ? 0.7 : grade === 3 ? 1.2 : 1));
      c.interval = Math.max(1, Math.min(180, c.interval));
    }
    c.lastAt = Date.now();
    c.due = Date.now() + (grade === 0 ? 6 * 60 * 1000 : c.interval * 86400000);
    c.lastGrade = grade;
    state.cards[id] = c;
    commit();
    return c;
  },
  dueCards(allIds) {
    const now = Date.now();
    const isDue = id => { const c = state.cards[id]; return !c || !c.due || c.due <= now; };
    return allIds.filter(isDue);
  },

  /* ---------- import / export / reset ---------- */
  export() { return JSON.stringify(state, null, 2); },
  import(json) {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object') throw new Error('Not a PM Runway backup file.');
    state = { ...clone(BLANK), ...parsed, prefs: { ...BLANK.prefs, ...(parsed.prefs || {}) } };
    commit();
  },
  reset() {
    state = { ...clone(BLANK), createdAt: Date.now() };
    commit();
  }
};

/* keep multiple tabs roughly in step */
window.addEventListener('storage', e => {
  if (e.key === KEY && e.newValue) {
    try { state = { ...clone(BLANK), ...JSON.parse(e.newValue) }; listeners.forEach(fn => fn(state)); } catch (err) {}
  }
});
