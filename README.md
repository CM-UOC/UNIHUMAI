# PM Runway

A personalised product management learning platform and interview preparation
system, built for one person applying for one role.

**Live:** https://cm-uoc.github.io/unihumai/

## What it is

A static single-page application that turns three inputs — a CV, a professional
portfolio, and a job advertisement — into a structured course, an evidence-mapped
role analysis, an interview question bank and a set of practice drills.

The three inputs it was built from:

| Source | What was taken from it |
| --- | --- |
| `Cristian_Malpica_CV.pdf` | Roles, responsibilities, competencies, tools, education — quoted verbatim into an evidence bank |
| [cmmt.me](https://cmmt.me) | Case studies, the seven B2B decision frameworks, six stated method principles |
| GIS:Hub Product Manager advertisement | Every responsibility and requirement, decomposed and mapped against the above |

## Provenance

Every factual claim on the site carries a label:

- **From your CV** / **From your portfolio** — quoted from the supplied materials
- **From the job ad** — quoted from the advertisement
- **Public company info** — sourced, with links on the Sources tab
- **Interpretation** — a reasonable reading, not a stated fact
- **Assumption** — fills a gap; should be checked
- **General PM guidance** — standard practice, not specific to this person
- **Verify before using** — uncertain; ask rather than assume

No experience, achievement, metric or qualification appears anywhere on the site
unless it is present in the supplied materials. Interview questions are presented
as likely, never as guaranteed.

## Sections

- **Dashboard** — a composite readiness score and a recalculated "do this next" list
- **Study plan** — four weeks, ordered by what would cost most in the interview
- **Role fit** — every requirement mapped to evidence, with ranked gaps and strengths
- **Knowledge hub** — 28 guided sessions across 8 modules, with a Path, an Atlas map and an Index
- **How orgs work** — an interactive function map, decision rights, altitude and org shapes
- **Company dossier** — what is known, what is inferred, and what to ask
- **Glossary** — 140+ terms, searchable and filterable
- **Question bank** — 40 questions across 16 categories, each with a grounded model answer
- **Mock interview** — five tracks, adaptive follow-ups, weakness tracking across sessions
- **Drills** — flashcards with spaced repetition, quizzes, drag-and-drop prioritisation, branching simulations, timed answers
- **Notebook** — everything written, plus a printable interview-morning one-pager

## Design decisions worth knowing about

**The mastery ladder.** A session is not complete when read. Each concept has four
rungs — Recognise, Explain, Apply, Teach — and the last two require writing the idea
in your own words and passing a teach-back coverage check. The readiness score is
weighted towards doing rather than reading.

**The evidence bank.** Rather than free-text answers that can drift into invented
experience, the answer composer draws from a bank of atomic, cited facts. An
"Insert evidence" picker pastes real quotations from the CV or portfolio.

**The claim detector.** Drafted answers are scanned for figures absent from the
supplied materials, vague quantifiers, hedging, over-use of "we", structure coverage
and spoken length. It catches mechanical problems, not content quality — the rubric
handles that.

**Local only.** Notes, drafted answers, confidence ratings, review schedules and mock
sessions are stored in `localStorage`. Nothing is transmitted. A backup can be
exported and re-imported from **Progress & data** in the sidebar.

## Technical

No build step, no framework, no runtime dependencies. Vanilla ES modules, served
statically. All asset paths are relative, so it works from any base path.

```
index.html
assets/
  css/    base.css (tokens, themes) · components.css · layout.css
  js/
    main.js        hash router, chrome, global search
    store.js       localStorage persistence, SM-2 spaced repetition
    progress.js    mastery ladder, readiness score, next actions
    ui.js          DOM helpers and shared components
    search.js      flat search index across every content type
    data/          profile, role, concepts (5 parts), questions (3 parts),
                   glossary, org, drills, company, plan
    views/         one module per section
```

Light and dark themes follow the system preference and can be overridden. Focus mode
hides the sidebar and search for distraction-free study. Fully responsive; the only
horizontally scrolling elements are diagrams and wide tables, inside their own
containers.

## Local development

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
