# PM Runway

A product management course and an interview answer set, built for one person
applying for one role — and taught through a single continuous case set inside
that job.

**Live:** https://cm-uoc.github.io/UNIHUMAI/

## Two destinations

**Learn** — 32 chapters in 8 parts. Three orientation chapters open it (the role
and where you actually fit, the business and its market, your own record
inventoried), then 29 craft lessons. Each craft lesson opens on a scene from the
job, stops at the decision, and only then names the idea you just watched being
used. Every lesson carries three strands: the general practice, what your own CV
and portfolio already give you, and what this role does with it.

**Interview** — 45 questions across 16 categories, each already answered in full.
No drafting boxes, no scoring, no self-testing. Each answer comes with what the
interviewer is assessing, the shape it follows, alternative framings, likely
follow-ups, what a weak answer sounds like, and the quoted evidence it was built
from.

There is no third section. The glossary is defined inline, inside the chapters
where the terms are used.

## Advice is always followed by two worked examples

Nowhere on the site does a piece of general product-management advice stand on
its own. Every one is followed by exactly two explicit examples — either the
words to say, verbatim, or an artefact you could print and carry in.

- **50 in the role chapter** — two under each of the 18 requirement actions and
  each of the 7 ranked gaps. "Draft one KPI tree and one SLA/routing table" is
  followed by a filled-in KPI tree with its counter-metrics, and a filled-in
  SLA table with the routing matrix underneath it.
- **58 in the lessons** — two per craft lesson, filling in that lesson's
  instruments against the running case. RICE actually scored, with the two
  columns it is missing. A Definition of Ready you could put on a wall. A data
  contract, a deprecation policy, a runbook page, a RAID log, a one-pager.

Examples are labelled by kind: **Say it like this** (spoken, verbatim) or
**Bring this on paper** (an artefact).

## Built from three inputs

| Source | What was taken |
| --- | --- |
| `Cristian_Malpica_CV.pdf` | Roles, responsibilities, competencies, tools, education — quoted into an evidence bank |
| [cmmt.me](https://cmmt.me) | The pricing application, the seven B2B decision frameworks, six method principles, the coursework ventures and their stated evidence boundaries |
| GIS:Hub Product Manager advertisement | Every responsibility and requirement, decomposed and mapped against the two above |

## The case

Twenty-nine lessons run inside one constructed scenario: eleven weeks into a
product manager role at GIS:Hub Barcelona, owning a vehicle-condition data
product called Fleet Pulse, with a recurring cast — a sales lead measured on this
quarter, a data engineering lead measured on the next three years, a privacy
counsel who can stop the product, a service operations lead who will own it
longer than you will, and a portfolio lead in Wolfsburg who sees eleven products
where you see one.

**The hub, the Data Hub model and the EU regulatory frame are real and sourced.
The people, products, partners, meetings and figures are invented** so that each
idea can be learned inside a situation rather than in the abstract. Every scene
is labelled *Constructed case*, and the site says plainly that none of it should
be repeated as fact.

## Provenance

Every claim carries a label: **From your CV**, **From your portfolio**, **From
the job ad**, **Interpretation**, **General PM practice**, **Verify before
using**, **Constructed case**. No experience, achievement, metric or
qualification appears anywhere unless it is in the supplied materials, and no
interview question is presented as guaranteed.

## Technical

No build step, no framework, no runtime dependencies. Vanilla ES modules served
statically, relative paths throughout, hash routing.

```
index.html
assets/
  css/cinema.css        tokens, both themes, screenplay-style scene rendering
  js/
    main.js             router and chrome
    store.js            the only stored state: which chapters you have read
    ui.js               DOM helpers, reveal-on-scroll, rail scroll-spy
    data/
      world.js          the case world: premise, cast, accounts, timeline
      scenarios-1..5    29 scenes, one per craft lesson
      concepts-1..6     the craft content behind each lesson
      curriculum.js     8 parts, 32 chapters, joins concepts to scenarios
      questions-1..4    45 answered interview questions
      profile.js        the evidence bank, quoted from CV and portfolio
      role.js           the advertisement decomposed and mapped
      company.js        sourced public facts, inferences, what to ask
      glossary.js       terms, surfaced inline in the chapters that use them
    views/              home, learn, lesson, reference, interview
```

Dark by default with a light theme; system fonts fall back cleanly if Google
Fonts is unavailable. Responsive from 390px with no horizontal overflow. The only
thing stored in the browser is which chapters you have opened.

## Local development

```bash
python3 -m http.server 8000
```
