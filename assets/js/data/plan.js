/* plan.js — a personalised four-week preparation plan, derived from the gap analysis */

export const PLAN = [
  {
    id:'w1', week:1, title:'Close the domain gap first',
    aim:'The two critical gaps — automotive data and its regulatory frame — are the ones that stop the rest of your profile from being reached. Do these before anything else.',
    tasks:[
      { id:'t1-1', label:'Study the two domain modules end to end', detail:'Knowledge hub → “Data products and the connected-vehicle domain” and “Governance, privacy and compliance”. Write the own-words answer for both; do not skip the teach-back.', link:'#/study/dataproduct', minutes:45 },
      { id:'t1-2', label:'Read the company dossier and separate fact from inference', detail:'Note which items are public fact, which are your inference, and which need verification. Take the “what I would ask” list seriously.', link:'#/company', minutes:20 },
      { id:'t1-3', label:'Rehearse the bridge answer aloud, three times', detail:'“You have no automotive experience.” Concede once, transfer specifically via SAP/PIM data ownership, show self-directed learning, end on the Sales differentiator.', link:'#/question/q-notautomotive', minutes:20 },
      { id:'t1-4', label:'Study the data quality module', detail:'This is where your existing strength and their domain meet. It is your best bridge and the one you should be able to give without hesitation.', link:'#/study/dataquality', minutes:25 },
      { id:'t1-5', label:'Run the “number that was wrong” simulation', detail:'Freshness versus correctness is the defining data-product failure. Understanding it will make you sound like an insider.', link:'#/practice/sim', minutes:15 }
    ]
  },
  {
    id:'w2', week:2, title:'Build the artefacts nobody else brings',
    aim:'The SLA / routing / knowledge-transfer bullet is a whole responsibility with no evidence in your materials — and it is the most concretely closable gap you have. Close it by producing something.',
    tasks:[
      { id:'t2-1', label:'Study the service operations module', detail:'SLAs, SLOs, routing matrices, runbooks, error budgets. Learn the vocabulary precisely enough to use it without hedging.', link:'#/study/serviceops', minutes:30 },
      { id:'t2-2', label:'Draft a real KPI tree for a hypothetical vehicle-data product', detail:'North star, three or four drivers, a counter-metric for each. Write it in your notebook and refine it until it fits on one page.', link:'#/study/analytics', minutes:35 },
      { id:'t2-3', label:'Draft a five-row routing matrix', detail:'Issue type, first responder, response time, first diagnostic step, escalation. This is the artefact to offer at the end of the interview.', link:'#/study/serviceops', minutes:30 },
      { id:'t2-4', label:'Draft a go-live checklist with at least four non-software items', detail:'Contract scope, consent basis, support walkthrough, accepted risk owners, Sales enabled on limits.', link:'#/study/delivery', minutes:25 },
      { id:'t2-5', label:'Complete the go-live ordering drill until you are inside tolerance', detail:'The order matters more than the list — permission first, monitoring before support walkthrough, go/no-go last.', link:'#/practice/priority', minutes:15 }
    ]
  },
  {
    id:'w3', week:3, title:'Work the core PM curriculum and your evidence',
    aim:'You know most of this already. The purpose of this week is to be able to explain it in your own words at speed, and to attach a real piece of your experience to each idea.',
    tasks:[
      { id:'t3-1', label:'Complete modules 1 to 3 of the study path', detail:'Foundations, discovery and evidence, deciding and planning. Twelve sessions. Aim for two a day rather than a marathon.', link:'#/knowledge', minutes:120 },
      { id:'t3-2', label:'Complete modules 4 to 6', detail:'Building and delivering, measuring and operating, people and influence. Nine sessions.', link:'#/knowledge', minutes:105 },
      { id:'t3-3', label:'Run the flashcard deck twice, honestly graded', detail:'Grade yourself down when you hesitate. The spacing algorithm only works if the grades are true.', link:'#/practice/cards', minutes:30 },
      { id:'t3-4', label:'Review the role-fit map and rate your confidence on every requirement', detail:'Anything you rate below 2 is a question you cannot yet answer. Send yourself back to the concept it links to.', link:'#/rolefit', minutes:25 },
      { id:'t3-5', label:'Draft answers to the six near-certain questions', detail:'Tell me about yourself; why this role; the pricing application; what do you actually decide; no automotive experience; what do you know about our data business.', link:'#/interview', minutes:90 }
    ]
  },
  {
    id:'w4', week:4, title:'Rehearse out loud and stress-test',
    aim:'Written answers are not spoken answers. This week is about fluency, timing, and being interrupted.',
    tasks:[
      { id:'t4-1', label:'Run three full mock interview sessions on different tracks', detail:'Speak the answers aloud before typing them. The typing is for the record; the speaking is the practice.', link:'#/mock', minutes:90 },
      { id:'t4-2', label:'Complete the two remaining simulations', detail:'The deal that needs one field, and week one in a hub with no process. Both map directly onto this role.', link:'#/practice/sim', minutes:30 },
      { id:'t4-3', label:'Study module 8 — the four chosen for you', detail:'Product writing, saying no under commercial pressure, data quality, partner management. These are the differentiators.', link:'#/knowledge', minutes:45 },
      { id:'t4-4', label:'Prepare and rehearse your four questions for them', detail:'Decision rights, DUP gates, the partner motion, and what the hub does not yet have. Know why each one matters to you.', link:'#/question/q-ask-1', minutes:20 },
      { id:'t4-5', label:'Review every weakness the mock interviewer flagged', detail:'The mock mode tracks recurring patterns across sessions. Read that list before your last rehearsal.', link:'#/mock', minutes:25 },
      { id:'t4-6', label:'Export a backup of everything you have written', detail:'Your notes and drafted answers live only in this browser. Download the backup before interview week.', link:'#/notebook', minutes:5 }
    ]
  }
];

export const DAILY_REP_RECIPE = [
  { kind:'card',     n:4, label:'Four flashcards due for review' },
  { kind:'check',    n:1, label:'One concept knowledge check' },
  { kind:'question', n:1, label:'One interview question to draft or refine' },
  { kind:'sim',      n:1, label:'One simulation step or prioritisation drill' }
];
