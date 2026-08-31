import { el, $, $$, icon, pageHead, rich, tabs, clear, toast, savedTextarea, bookmarkBtn, confidenceRater, bar, modal, CONFIDENCE_LABELS } from '../ui.js';
import { store } from '../store.js';
import { QUESTIONS, QUESTION_BY_ID, CATEGORIES, questionsIn, LIKELIHOOD } from '../data/questions.js';
import { FRAMEWORKS } from '../data/drills.js';
import { EVIDENCE, EVIDENCE_BY_ID, ROLE_LABEL } from '../data/profile.js';
import { REQUIREMENTS } from '../data/role.js';
import { answerStats } from '../progress.js';

export function renderInterview(page, { go, query }) {
  const st = answerStats();
  page.appendChild(pageHead({
    eyebrow: 'Interview preparation centre',
    title: 'Question bank',
    lead: `${QUESTIONS.length} questions across ${CATEGORIES.length} categories, built from the job ad, your materials, and the concerns a reader of your CV would reasonably have. **These are likely questions, not guaranteed ones.** Use the model answers as a starting point and rewrite them in your own voice — a memorised answer is audible.`,
    actions: [
      el('button', { class: 'btn', onClick: () => frameworksModal() }, icon('layers', 15), 'Answer frameworks'),
      el('button', { class: 'btn btn--primary', onClick: () => {
        const q = QUESTIONS.find(x => !(store.entry('questions', x.id, {}).answer || '').trim()) || QUESTIONS[0];
        go('question/' + q.id);
      }}, icon('arrow', 15), 'Next undrafted')
    ],
    meta: [
      el('span', { class: 'chip chip--accent' }, `${st.drafted}/${st.total} drafted`),
      el('span', { class: 'chip ' + (st.criticalDone === st.critical ? 'chip--teal' : 'chip--rose') },
        `${st.criticalDone}/${st.critical} very likely ones done`)
    ]
  }));

  /* filters */
  const state = { cat: query && query.get('c') || 'all', only: 'all', q: '' };
  const listBox = el('div', { class: 'stack', style: { '--gap': '.7rem' } });

  const catPills = el('div', { class: 'row-wrap', style: { marginBottom: '.6rem' } },
    el('button', { class: 'pill', dataset: { c: 'all' } }, 'All'),
    CATEGORIES.map(c => el('button', { class: 'pill', dataset: { c: c.id } },
      c.label, el('span', { class: 't-xs muted2', style: { marginLeft: '.3rem' } }, String(questionsIn(c.id).length)))));

  const onlyPills = el('div', { class: 'seg' },
    el('button', { dataset: { o: 'all' } }, 'All'),
    el('button', { dataset: { o: 'critical' } }, 'Very likely'),
    el('button', { dataset: { o: 'undrafted' } }, 'Undrafted'),
    el('button', { dataset: { o: 'bookmarked' } }, 'Bookmarked'));

  const search = el('input', { class: 'input', type: 'search', placeholder: 'Search questions…', style: { maxWidth: '280px' } });

  function paint() {
    $$('button', catPills).forEach(b => b.setAttribute('aria-pressed', b.dataset.c === state.cat ? 'true' : 'false'));
    $$('button', onlyPills).forEach(b => b.setAttribute('aria-pressed', b.dataset.o === state.only ? 'true' : 'false'));
    let hits = QUESTIONS.filter(q => state.cat === 'all' || q.cat === state.cat);
    if (state.only === 'critical') hits = hits.filter(q => q.likely === 'near-certain' || q.likely === 'certain');
    if (state.only === 'undrafted') hits = hits.filter(q => !(store.entry('questions', q.id, {}).answer || '').trim());
    if (state.only === 'bookmarked') hits = hits.filter(q => store.isBookmarked('question', q.id));
    if (state.q) hits = hits.filter(q => (q.q + ' ' + q.assess).toLowerCase().includes(state.q));

    clear(listBox);
    if (state.cat !== 'all') {
      const c = CATEGORIES.find(x => x.id === state.cat);
      if (c) listBox.appendChild(el('p', { class: 't-sm muted measure' }, c.blurb));
    }
    if (!hits.length) { listBox.appendChild(el('div', { class: 'empty' }, 'No questions match those filters.')); return; }
    hits.forEach(q => listBox.appendChild(qRow(q)));
  }

  catPills.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { state.cat = b.dataset.c; paint(); } });
  onlyPills.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { state.only = b.dataset.o; paint(); } });
  search.addEventListener('input', () => { state.q = search.value.trim().toLowerCase(); paint(); });

  page.appendChild(el('div', { class: 'card card--tint', style: { marginBottom: '1rem' } },
    catPills,
    el('div', { class: 'row-wrap' }, onlyPills, search)));
  page.appendChild(listBox);
  paint();

  if (query && query.get('f')) frameworksModal(query.get('f'));
}

function qRow(q) {
  const e = store.entry('questions', q.id, {});
  const drafted = (e.answer || '').trim().length > 80;
  const lk = LIKELIHOOD[q.likely] || LIKELIHOOD.possible;
  return el('a', { class: 'card card--hover', href: '#/question/' + q.id,
    style: { textDecoration: 'none', color: 'inherit', display: 'block' } },
    el('div', { class: 'spread', style: { alignItems: 'flex-start', gap: '.8rem' } },
      el('div', { class: 'grow' },
        el('div', { class: 'row-wrap', style: { marginBottom: '.3rem' } },
          el('span', { class: 'chip ' + lk.cls + ' chip--dot' }, lk.label),
          el('span', { class: 'chip chip--outline' }, (CATEGORIES.find(c => c.id === q.cat) || {}).label),
          drafted ? el('span', { class: 'chip chip--teal' }, '✓ drafted') : null,
          store.isBookmarked('question', q.id) ? el('span', { class: 'chip chip--accent' }, '★') : null),
        el('div', { style: { fontWeight: 570, marginBottom: '.2rem' } }, q.q),
        el('p', { class: 't-sm muted', style: { maxWidth: '70ch' } }, q.assess.split('.')[0] + '.')),
      el('div', { style: { flex: 'none' } },
        el('span', { class: 't-xs muted2', style: { fontFamily: 'var(--font-mono)' } }, 'D' + q.difficulty))));
}

/* ---------------- single question ---------------- */
export function renderQuestion(page, { param, go }) {
  const q = QUESTION_BY_ID[param];
  if (!q) { page.appendChild(el('div', { class: 'note note--bad' }, 'No such question.')); return; }
  const cat = CATEGORIES.find(c => c.id === q.cat);
  const lk = LIKELIHOOD[q.likely] || LIKELIHOOD.possible;
  const idx = QUESTIONS.indexOf(q);
  const nextQ = QUESTIONS[idx + 1], prevQ = QUESTIONS[idx - 1];
  const e = store.entry('questions', q.id, {});

  page.appendChild(el('header', { class: 'pagehead' },
    el('div', { class: 'spread', style: { marginBottom: '.5rem' } },
      el('div', { class: 'row-wrap' },
        el('a', { class: 'chip chip--outline', href: '#/interview?c=' + q.cat, style: { textDecoration: 'none' } },
          backChevron(), ' ' + (cat ? cat.label : 'Questions')),
        el('span', { class: 'chip ' + lk.cls + ' chip--dot' }, lk.label)),
      el('div', { class: 'row focus-hide' }, bookmarkBtn('question', q.id, q.q))),
    el('h1', { class: 'pagehead__t t-h1', style: { fontSize: 'clamp(1.3rem, 1rem + 1.4vw, 1.75rem)' } }, q.q),
    el('div', { class: 'note note--info', style: { marginTop: '.8rem' } },
      el('div', { class: 'note__title' }, icon('target', 14), 'What the interviewer is assessing'),
      q.assess)));

  /* answer composer first — it is the point of the page */
  page.appendChild(composer(q, e));

  page.appendChild(el('div', { class: 'stack', style: { marginTop: '1.3rem' } },
    /* structure */
    el('div', { class: 'card' },
      el('div', { class: 'spread', style: { marginBottom: '.4rem', flexWrap: 'wrap' } },
        el('h3', { class: 't-h3' }, 'Recommended structure'),
        el('span', { class: 'chip chip--accent' }, q.structure.name)),
      el('ol', { class: 't-sm' }, q.structure.steps.map(s => el('li', { html: rich(s) }))),
      el('p', { class: 't-xs muted2', style: { marginTop: '.5rem' } }, q.structure.when)),

    /* model answer */
    el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--teal) 30%, transparent)' } },
      el('div', { class: 'row-wrap', style: { marginBottom: '.45rem' } },
        el('span', { class: 'ev ev--cv' }, 'Built only from your materials'),
        el('span', { class: 'ev ev--general' }, 'A starting point, not a script')),
      el('h3', { class: 't-h3', style: { marginBottom: '.45rem' } }, 'A strong answer for you'),
      el('div', { class: 't-sm', style: { whiteSpace: 'pre-wrap' }, html: rich(q.example) }),
      el('div', { class: 'row-wrap', style: { marginTop: '.7rem' } },
        el('button', { class: 'btn btn--sm', onClick: () => {
          const ta = $('#answerBox');
          if (ta && (!ta.value.trim() || confirm('Replace what you have written?'))) {
            ta.value = q.example; ta.dispatchEvent(new Event('input'));
            toast('Copied in — now rewrite it in your own voice');
          }
        }}, icon('download', 13), 'Copy into my draft as a starting point'))),

    /* alternatives + followups */
    el('div', { class: 'grid grid--2' },
      q.alternatives && q.alternatives.length ? el('div', { class: 'card' },
        el('h3', { class: 't-h3', style: { marginBottom: '.4rem' } }, 'Alternative talking points'),
        el('ul', { class: 't-sm muted' }, q.alternatives.map(a => el('li', { html: rich(a) })))) : null,
      q.followups && q.followups.length ? el('div', { class: 'card' },
        el('h3', { class: 't-h3', style: { marginBottom: '.4rem' } }, 'Likely follow-ups'),
        el('ul', { class: 't-sm muted' }, q.followups.map(f => el('li', {}, f)))) : null),

    /* weak answers */
    el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--rose) 26%, transparent)' } },
      el('h3', { class: 't-h3', style: { marginBottom: '.4rem' } }, 'What a weak answer looks like'),
      el('ul', { class: 't-sm muted' }, q.weak.map(w => el('li', {}, w)))),

    /* rubric */
    rubricCard(q, e),

    /* evidence available */
    (q.evidence || []).length ? el('div', { class: 'card card--tint' },
      el('div', { class: 't-eyebrow', style: { marginBottom: '.5rem' } }, 'Evidence you can draw on for this question'),
      el('div', { class: 'stack', style: { '--gap': '.4rem' } },
        q.evidence.map(id => EVIDENCE_BY_ID[id]).filter(Boolean).map(x =>
          el('div', { class: 'quote' }, '“' + x.quote + '”',
            el('div', { class: 't-xs muted2', style: { fontStyle: 'normal', marginTop: '.2rem' } },
              (x.src === 'cv' ? 'Your CV' : 'cmmt.me') + ' · ' + (ROLE_LABEL[x.role] || ''))))) ) : null,

    (q.reqs || []).length ? el('div', { class: 'row-wrap' },
      el('span', { class: 't-xs muted2' }, 'Maps to:'),
      q.reqs.map(rid => {
        const r = REQUIREMENTS.find(x => x.id === rid);
        return r ? el('a', { class: 'chip chip--outline', href: '#/rolefit?r=' + rid, style: { textDecoration: 'none' } },
          icon('target', 11), r.title.length > 40 ? r.title.slice(0, 38) + '…' : r.title) : null;
      })) : null
  ));

  page.appendChild(el('div', { class: 'spread', style: { marginTop: '1.5rem', gap: '.5rem', flexWrap: 'wrap' } },
    prevQ ? el('a', { class: 'btn', href: '#/question/' + prevQ.id }, backChevron(), ' Previous') : el('span'),
    nextQ ? el('a', { class: 'btn btn--primary', href: '#/question/' + nextQ.id }, 'Next question', icon('arrow', 14))
          : el('a', { class: 'btn btn--primary', href: '#/interview' }, 'Back to the bank')));
}

/* ---------------- answer composer with claim detector ---------------- */
function composer(q, e) {
  const status = el('span', { class: 't-xs muted2' }, e.answer ? 'Saved' : '');
  const meta = el('div', { class: 'row-wrap' });
  const audit = el('div', { style: { marginTop: '.7rem' } });

  const ta = el('textarea', {
    id: 'answerBox', class: 'textarea', rows: 10, style: { minHeight: '230px' },
    placeholder: 'Draft your answer here. Speak it aloud first — the way you say it is the version you will use.',
    'aria-label': 'Your answer'
  });
  ta.value = e.answer || '';

  let timer = null;
  const update = () => {
    const words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
    const secs = Math.round(words / 2.4);
    clear(meta).append(
      el('span', { class: 't-xs muted2' }, words + ' words'),
      el('span', { class: 't-xs muted2' }, '≈ ' + (secs < 60 ? secs + 's' : Math.floor(secs / 60) + 'm ' + (secs % 60) + 's') + ' spoken'),
      words > 0 && secs > 150 ? el('span', { class: 'chip chip--amber' }, 'Long — most answers should land under two minutes') : null
    );
  };
  ta.addEventListener('input', () => {
    update();
    status.textContent = 'Saving…';
    clearTimeout(timer);
    timer = setTimeout(() => { store.patch('questions', q.id, { answer: ta.value }); status.textContent = 'Saved to this browser'; }, 500);
  });
  update();

  return el('div', { class: 'card', style: { borderColor: 'color-mix(in srgb, var(--accent) 32%, transparent)' } },
    el('div', { class: 'spread', style: { marginBottom: '.5rem', flexWrap: 'wrap', gap: '.5rem' } },
      el('h3', { class: 't-h3' }, 'Your answer'),
      el('div', { class: 'row-wrap' },
        el('button', { class: 'btn btn--sm', onClick: () => evidencePicker(ta) }, icon('layers', 13), 'Insert evidence'),
        el('button', { class: 'btn btn--sm btn--primary', onClick: () => clear(audit).appendChild(runAudit(ta.value, q)) },
          icon('search', 13), 'Check my answer'))),
    ta,
    el('div', { class: 'spread', style: { marginTop: '.45rem', flexWrap: 'wrap', gap: '.5rem' } }, meta, status),
    audit);
}

/* pick a real, cited fact and paste it in — prevents drift into invented experience */
function evidencePicker(ta) {
  const listBox = el('div', { class: 'stack', style: { '--gap': '.4rem' } });
  const search = el('input', { class: 'input', type: 'search', placeholder: 'Filter your evidence…' });
  const paint = () => {
    const s = search.value.trim().toLowerCase();
    const hits = EVIDENCE.filter(x => !s || (x.claim + ' ' + x.quote + ' ' + x.tags.join(' ')).toLowerCase().includes(s));
    clear(listBox);
    hits.forEach(x => listBox.appendChild(el('button', {
      class: 'opt', style: { textAlign: 'left' },
      onClick: () => {
        const insert = '“' + x.quote + '”';
        const pos = ta.selectionStart || ta.value.length;
        ta.value = ta.value.slice(0, pos) + (pos && ta.value[pos - 1] !== ' ' ? ' ' : '') + insert + ' ' + ta.value.slice(pos);
        ta.dispatchEvent(new Event('input'));
        m.close();
        toast('Inserted — now rewrite it as speech, not a quotation');
      }
    },
      el('span', { class: 'opt__key' }, x.src === 'cv' ? 'CV' : 'P'),
      el('span', {},
        el('span', { style: { display: 'block', fontWeight: 550 } }, x.claim),
        el('span', { class: 't-xs muted2' }, ROLE_LABEL[x.role] || '')))));
    if (!hits.length) listBox.appendChild(el('div', { class: 'empty t-sm' }, 'Nothing matched.'));
  };
  search.addEventListener('input', paint);
  const m = modal({
    title: 'Insert a fact from your materials',
    body: el('div', { class: 'stack' },
      el('p', { class: 't-sm muted' }, 'Everything here is quoted from your CV or your portfolio. Building an answer from these is how you keep it true — and how you avoid the one thing an interviewer will actually check.'),
      search, listBox),
    wide: true
  });
  paint();
}

/* the unsupported-claim / weak-answer detector */
function runAudit(text, q) {
  const t = (text || '').trim();
  if (!t) return el('div', { class: 'note note--warn' }, 'Nothing to check yet — write a draft first.');
  const lower = t.toLowerCase();
  const words = t.split(/\s+/).length;
  const findings = [];

  /* 1. numbers not present in the evidence bank */
  const evidenceText = EVIDENCE.map(e => e.quote + ' ' + e.claim).join(' ').toLowerCase();
  const nums = [...new Set((t.match(/\b\d[\d.,]*\s?(%|percent|k\b|m\b|€|years?|months?|weeks?|days?|x\b)?/gi) || [])
    .map(s => s.trim()).filter(s => s.length > 1))];
  const unsupported = nums.filter(n => {
    const bare = n.replace(/[^\d.,]/g, '');
    return bare.length > 0 && !evidenceText.includes(bare);
  });
  if (unsupported.length) findings.push({
    tone: 'bad', title: 'Figures not found in your materials',
    body: rich('You used ' + unsupported.map(n => '`' + n + '`').join(', ') + '. Nothing in your CV or portfolio contains those figures. Either remove them, or say explicitly what the number is and is not — your own portfolio does exactly this on the pricing application, and it reads as confidence rather than hedging.')
  });

  /* 2. vague intensifiers */
  const vague = ['significantly', 'dramatically', 'a lot', 'massively', 'huge', 'many customers',
    'lots of', 'various', 'several stakeholders', 'quite a few', 'a number of'];
  const found = vague.filter(v => lower.includes(v));
  if (found.length) findings.push({
    tone: 'warn', title: 'Vague quantifiers',
    body: rich('“' + found.join('”, “') + '”. An interviewer hears these as a substitute for a number. Either give the number, or describe the thing concretely — “across Spanish and Portuguese markets” beats “several markets”.')
  });

  /* 3. no first-person action */
  const iCount = (lower.match(/\bi\s/g) || []).length;
  const weCount = (lower.match(/\bwe\s/g) || []).length;
  if (weCount > iCount * 2 && weCount > 3) findings.push({
    tone: 'warn', title: 'Mostly “we”, rarely “I”',
    body: 'You used “we” ' + weCount + ' times and “I” ' + iCount + '. Interviewers cannot tell what you personally did. Keep “we” for the context and switch to “I” for your actions and decisions.'
  });

  /* 4. structure coverage */
  const structureWords = q.structure.steps.map(s => s.split(/[—:(]/)[0].trim().toLowerCase().split(' ')[0]).filter(w => w.length > 3);
  const covered = structureWords.filter(w => lower.includes(w));
  if (q.structure.name !== 'No framework' && structureWords.length > 2 && covered.length < 2 && words > 60) {
    findings.push({ tone: 'info', title: 'Structure is hard to hear',
      body: 'The recommended shape is ' + q.structure.name + '. You do not need to name it aloud, but a listener should be able to feel the sections. Check that each step above is present in some form.' });
  }

  /* 5. length */
  const secs = Math.round(words / 2.4);
  if (words < 60) findings.push({ tone: 'warn', title: 'Very short',
    body: 'Under 60 words is roughly 25 seconds. Most of these questions expect 60–120 seconds — add the concrete example.' });
  else if (secs > 170) findings.push({ tone: 'warn', title: 'Long for a spoken answer',
    body: `About ${Math.round(secs / 60 * 10) / 10} minutes spoken. Interviewers stop listening past roughly two minutes. Cut the setup, keep the decision.` });

  /* 6. no evidence used */
  const usedEvidence = EVIDENCE.filter(e => {
    const key = e.claim.toLowerCase().split(' ').filter(w => w.length > 6).slice(0, 4);
    return key.length && key.filter(k => lower.includes(k)).length >= 2;
  });
  if (!usedEvidence.length && (q.evidence || []).length && words > 60) findings.push({
    tone: 'info', title: 'No traceable evidence from your materials',
    body: 'This question has evidence available below that you have not drawn on. An answer anchored in something specific you did is far harder to dismiss than one built from general principle.'
  });

  /* 7. hedging */
  const hedges = ['i think maybe', 'sort of', 'kind of', 'i guess', 'probably would', 'i would try to'];
  const h = hedges.filter(x => lower.includes(x));
  if (h.length) findings.push({ tone: 'warn', title: 'Hedging language',
    body: rich('“' + h.join('”, “') + '”. Stating uncertainty precisely is a strength; hedging your own actions is not. “I decided X because Y” is stronger than “I would probably try to X”.') });

  const good = [];
  if (usedEvidence.length) good.push(`Draws on ${usedEvidence.length} thing${usedEvidence.length === 1 ? '' : 's'} from your materials.`);
  if (secs >= 40 && secs <= 150) good.push(`About ${secs} seconds spoken — a good length.`);
  if (iCount >= 3) good.push('Uses “I” enough that your own contribution is clear.');
  if (!unsupported.length && nums.length) good.push('Every figure you used is traceable to your materials.');

  return el('div', { class: 'stack', style: { '--gap': '.5rem' } },
    el('div', { class: 't-eyebrow' }, 'Answer check'),
    good.length ? el('div', { class: 'note note--good' },
      el('div', { class: 'note__title' }, icon('check', 14), 'Working well'),
      el('ul', { class: 't-sm', style: { marginBottom: 0 } }, good.map(g => el('li', {}, g)))) : null,
    ...findings.map(f => el('div', { class: 'note note--' + ({ bad:'bad', warn:'warn', info:'info' }[f.tone]) },
      el('div', { class: 'note__title' }, icon(f.tone === 'bad' ? 'alert' : f.tone === 'warn' ? 'alert' : 'flask', 14), f.title),
      el('div', { class: 't-sm', html: typeof f.body === 'string' ? f.body : '' }, typeof f.body === 'string' ? null : f.body))),
    !findings.length ? el('div', { class: 'note note--good' },
      el('div', { class: 'note__title' }, icon('check', 14), 'Nothing flagged'),
      'The automated checks found no problems. They only catch mechanical issues — read it aloud and check it still sounds like you.') : null,
    el('p', { class: 't-xs muted2' },
      'This check looks for unsupported figures, vagueness, hedging, structure and length. It cannot judge whether the content is good — that is what the rubric below is for.'));
}

/* ---------------- rubric ---------------- */
function rubricCard(q, e) {
  const saved = e.rubric || {};
  const box = el('div', { class: 'stack', style: { '--gap': '.5rem' } });
  q.rubric.forEach((r, i) => {
    const key = 'r' + i;
    const row = el('div', { class: 'spread', style: { gap: '.7rem', alignItems: 'flex-start' } },
      el('span', { class: 't-sm grow' }, r),
      el('div', { class: 'seg', style: { flex: 'none' } },
        ['No', 'Partly', 'Yes'].map((lab, v) => el('button', {
          dataset: { v: String(v) }, 'aria-pressed': saved[key] === v ? 'true' : 'false',
          onClick: ev => {
            const patch = { ...(store.entry('questions', q.id, {}).rubric || {}), [key]: v };
            store.patch('questions', q.id, { rubric: patch });
            [...ev.target.parentElement.children].forEach(b => b.setAttribute('aria-pressed', b === ev.target ? 'true' : 'false'));
          }
        }, lab))));
    box.appendChild(row);
  });
  return el('div', { class: 'card' },
    el('div', { class: 'spread', style: { marginBottom: '.6rem', flexWrap: 'wrap', gap: '.5rem' } },
      el('h3', { class: 't-h3' }, 'Score your own answer'),
      confidenceRater(e.confidence, v => {
        store.patch('questions', q.id, { confidence: v });
        toast('Rated: ' + CONFIDENCE_LABELS[v]);
      }, true)),
    box);
}

/* ---------------- frameworks ---------------- */
function frameworksModal(focus) {
  modal({
    title: 'Answer frameworks',
    wide: true,
    body: el('div', { class: 'stack' },
      el('div', { class: 'note note--info' },
        el('div', { class: 'note__title' }, icon('alert', 14), 'Use these sparingly'),
        'A framework is scaffolding for thinking, not a template to recite. Forcing every answer into the same shape is itself a weak signal — and the last entry here is a real option.'),
      ...FRAMEWORKS.map(f => el('div', {
        class: 'card', style: focus === f.id ? { borderColor: 'var(--accent)' } : {} },
        el('div', { class: 'spread', style: { marginBottom: '.3rem', flexWrap: 'wrap' } },
          el('h3', { class: 't-h3' }, f.name),
          el('span', { class: 'chip chip--outline' }, f.use)),
        el('ol', { class: 't-sm' }, f.steps.map(s => el('li', {}, s))),
        el('p', { class: 't-xs muted2', style: { marginTop: '.4rem' } }, el('strong', {}, 'Watch out: '), f.caution))))
  });
}


function backChevron() { const i = icon('chevron', 11, 2); i.style.transform = 'rotate(180deg)'; return i; }
