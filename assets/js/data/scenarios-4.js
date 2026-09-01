/* Scenarios — Part II remainder + Part VI: People */
export default {

orgmap: {
  title: 'Nobody knows who signs',
  slug: 'Carrer de Pallars · Friday 17:40 · Week 5 (flashback)',
  premise: 'Five weeks in. You have a use-case definition ready for approval and no idea who approves it. Everyone you ask names someone else.',
  scene: [
    { t:'action', x:'Hanna says Wolfsburg governance. Wolfsburg governance says the hub is autonomous on definitions. Petra says she approves the privacy position but not the definition. Marta says just ship it.' },
    { t:'action', x:'You have spent nine days on a question that is not a product question at all.' },
    { t:'line', who:'Andrés', x:'It has been like this since the hub opened. Everyone works around it.' },
    { t:'action', x:'Which is exactly the problem. Working around it costs nine days every time, and nobody counts it.' },
    { t:'action', x:'You open a document and write down what you believe the decision rights to be. You know some of it is wrong. You send it anyway.' }
  ],
  beat: {
    q: 'Why is a document that is wrong better than a question that is open?',
    weak: 'Ask your manager and wait. It makes the problem someone else\'s and it will queue. You will still be waiting in week nine.',
    strong: [
      'People correct documents. They do not answer open questions — an open question has no deadline and no owner.',
      'What to write down: who decides the roadmap sequence, who decides backlog order, who decides whether data may be used for a purpose, who decides pricing, who calls go/no-go, who accepts a residual risk, who approves a use-case definition.',
      'Send it as “this is my understanding, please correct” rather than as a proposal. A proposal invites a negotiation; an understanding invites a correction.',
      'When two parents disagree in the replies — and they will — name the disagreement explicitly in the document and take it to whoever owns the hub. A structural ambiguity is not yours to resolve, but making it unavoidable is precisely your job.',
      'Do the same with definitions: what counts as an active vehicle, what counts as launched.'
    ]
  },
  outcome: 'Eleven corrections come back in four days. Two contradict each other, which is the finding. The contradiction goes up and is settled in a fortnight. The document becomes the thing new people are sent in week one, and nobody remembers you wrote it — which is the correct outcome.',
  principle: 'In a new organization the scarcest thing is not direction. It is clarity about who decides. A product manager who supplies that clarity buys back weeks for everybody, including themselves.',
  wrong: 'Work around it like everyone else. You will lose nine days per decision, permanently, and you will discover the real approver during a launch, from someone with the power to stop it.',
  carry: [
    'Write down what you believe and invite correction. It is faster than asking.',
    'Almost nothing reports to you. Influence runs on knowing what each person is measured on.',
    'Making a structural ambiguity visible is a leadership act, not a complaint.'
  ]
},

stakeholders: {
  title: 'The objection that arrived too late',
  slug: 'Two days before a launch that does not happen · Week 9 (flashback)',
  premise: 'Before Fleet Pulse there was a smaller release. It did not ship, and the reason is the most useful thing that has happened to you here.',
  scene: [
    { t:'action', x:'Petra joins a call you invited her to as a courtesy, two days out.' },
    { t:'line', who:'Petra', x:'Which field is being returned for private-lease vehicles?' },
    { t:'action', x:'Twenty minutes later the launch is off. The fix is small — a filter and a documented purpose — and would have taken an afternoon in week two.' },
    { t:'line', who:'Marta', x:'(afterwards) Legal killed it.' },
    { t:'action', x:'They did not. A blocking function raised a blocking concern, which is their job. The failure is the calendar, and it is yours.' }
  ],
  beat: {
    q: 'What actually failed, and what changes?',
    weak: 'Conclude that legal are obstructive and start routing around them. This is the beginning of a career-shaped mistake.',
    strong: [
      'Know, before you start anything, which four or five people can stop it. Here: Petra on privacy, legal on contract, the brand steward on attribution, security on access.',
      'Engage them while it is still a question, not once it is a plan. Early it is a requirement like any other; late it is a veto.',
      'Learn what each of them is measured on. Petra is measured on defensibility, Jonas on maintainability, Marta on this quarter\'s deals, Andrés on tickets he can resolve. None of them is wrong.',
      'Set a standing touchpoint at definition rather than an escalation at launch. A half-hour recurring meeting is cheaper than one canceled release.',
      'Never let a significant decision be met for the first time in a group meeting. Pre-wire it.'
    ]
  },
  outcome: 'You put a fifteen-minute privacy slot into the definition stage of every product. Petra now answers precise questions in a day. In week nineteen, when Aurora arrives, that relationship is nine weeks old and it saves the deal.',
  principle: 'A blocking stakeholder raising a blocking concern is not obstruction. If they raise it late, that is a mapping failure — and the remedy is a calendar change, not a complaint.',
  wrong: 'Route around them. You will get one release out and then a much larger intervention, with your judgment rather than your process under review.',
  carry: [
    'Engage the people who can stop you while it is still a question.',
    'The stakeholder you avoid is the one who escalates.',
    'Undocumented decisions get reopened by whoever missed the meeting.'
  ]
},

crossfunctional: {
  title: 'Four definitions of "active"',
  slug: 'Monthly numbers · Tuesday 11:00 · Week 20',
  premise: 'Four functions bring four numbers for the same month. The meeting is spent reconciling them, as it was last month.',
  scene: [
    { t:'action', x:'Marta: 3,400 active vehicles. Jonas: 2,900. Finance: 3,120. Andrés: 410.' },
    { t:'line', who:'Marta', x:'Someone\'s data is wrong.' },
    { t:'action', x:'Nobody\'s data is wrong. Marta counts vehicles on a signed contract. Jonas counts vehicles that called the API in thirty days. Finance counts vehicles invoiced. Andrés counts vehicles that have ever produced a ticket.' },
    { t:'action', x:'Four correct answers to four different questions, and an hour a month spent discovering that again.' }
  ],
  beat: {
    q: 'The fix is unexciting. What is it worth?',
    weak: 'Ask everyone to use Jonas\'s number. Three functions now have a metric that does not answer their question, so they will quietly keep their own.',
    strong: [
      'Agree one primary definition and write it down: contracted vehicles that returned usable data in the last seven days.',
      'Keep the others as clearly named variants — contracted, billed, ticketed — so each function keeps the number it actually needs.',
      'Name which metric is used in which report, so nobody has to ask.',
      'Do the same for the other offenders: “launched”, “done”, “customer”, “integrated”.',
      'This is a shared glossary. It is the cheapest cross-functional intervention that exists and almost nobody does it.'
    ]
  },
  outcome: 'The reconciliation hour disappears. It comes back for one month when a new report is written against the wrong variant, which is how you find out the glossary needs an owner rather than an author.',
  principle: 'Much of cross-functional conflict is two correct people using one word differently. Checking the definition costs ten minutes and dissolves more disputes than any amount of alignment.',
  wrong: 'Escalate it as a data-quality problem. You will get an investigation into pipelines that are working fine, and the meeting will still take an hour next month.',
  carry: [
    'Write the definitions down. "Active", "done" and "launched" are the usual offenders.',
    'If two teams only talk through you, you are a bottleneck and a distortion.',
    'Support and operations own the product longest. Bring them into definition.'
  ]
},

leadership: {
  title: 'Two doors',
  slug: 'Thursday, sometime after seven · Week 20',
  premise: 'Two decisions on your desk on the same evening. Handled the same way, one of them is a mistake.',
  scene: [
    { t:'action', x:'One: what to name a field in a beta endpoint that three internal consumers use. Iker has an opinion. Jonas has a different one. You have been asked to settle.' },
    { t:'action', x:'Two: the pricing metric for Fleet Pulse. Per call, per vehicle, or per use case. Marta needs it for the Aurora proposal and for the NordFleet reseller terms.' },
    { t:'action', x:'The first has been open for six days. The second, Marta wants tomorrow.' },
    { t:'action', x:'You have been treating both as though they carry the same weight, and they do not.' }
  ],
  beat: {
    q: 'Sort them. What determines how much ceremony each deserves?',
    weak: 'Agonise over the field name because two people you respect disagree, and settle the pricing metric quickly because Marta needs it tomorrow. This is the common and expensive inversion.',
    strong: [
      'Field name: reversible. Three internal consumers, cost of changing later is a rename and a note. Decide it in ten minutes, alone, and tell them you decided rather than asking again.',
      'Pricing metric: close to irreversible. It gets embedded in contracts, in partner business cases, in what you must meter and expose, and in internal reporting. Changing it later is a renegotiation, not a release.',
      'So it deserves evidence, a written recommendation with three options and their consequences, and a decision-maker above you — Hanna and finance, not you at seven in the evening because Marta has a deadline.',
      'Tell Marta the honest thing: “You will have a recommendation Monday and a decision by Wednesday. I am not deciding this tonight, and you would not want me to.”',
      'Some decisions are never yours: accepting legal, privacy or financial risk on the company\'s behalf.'
    ]
  },
  outcome: 'The field name is settled before you leave. The pricing metric becomes a one-pager on Monday: three options, what each does to customer behavior and to your own roadmap, a recommendation of per-vehicle, and the consequence of each. Hanna decides on Wednesday. It holds for two years.',
  principle: 'Ask what it costs to undo this in three months. If the answer is very little, decide now, alone. If the answer is a renegotiation, it needs evidence, a written argument and probably a different decision-maker.',
  wrong: 'Decide the pricing metric at seven in the evening to unblock a proposal. You will be renegotiating eleven contracts in eighteen months, and nobody will remember it was a favor.',
  carry: [
    'Reversibility determines speed and ceremony. Most PM pain is applying the wrong mode.',
    'Push reversible decisions down. Your throughput is not the product\'s speed limit.',
    'Take the credit outward and the blame inward. It is the whole basis of influence without authority.'
  ]
},

writing: {
  title: 'The one-pager that ends the meeting',
  slug: 'Sunday evening · Week 20',
  premise: 'The pricing recommendation is due Monday. You have the analysis. The question is what shape it goes in.',
  scene: [
    { t:'action', x:'The instinct is a deck: background, market context, analysis, options, and the recommendation on slide fourteen, so the reasoning lands before the conclusion.' },
    { t:'action', x:'Hanna will read it on a train between Wolfsburg and Hanover. Finance will read it in six minutes. Petra will read the two paragraphs that concern her.' },
    { t:'action', x:'None of them will reach slide fourteen.' }
  ],
  beat: {
    q: 'Write the shape.',
    weak: 'Build to the conclusion. It works in a room where you control the pace. It fails completely on a train.',
    strong: [
      'Recommendation, first sentence: “Price Fleet Pulse per contracted vehicle per month, not per API call.”',
      'Context: what changed that makes this a question now — NordFleet reseller terms and the Aurora proposal both need it.',
      'Options, three, each with what it costs and what it gives up, including the status quo of deciding per deal.',
      'Evidence, labeled: what is known, what is inferred, what is still assumed. This is the section most people omit and the one that makes the document trustworthy.',
      'Consequences: per-vehicle means we must meter and expose vehicle-level activity, which is engineering work we have not scoped.',
      'Decision needed from Hanna and finance by Wednesday.',
      'Share forty-eight hours ahead. Then the meeting is fifteen minutes about the disagreement rather than an hour of catching up.'
    ]
  },
  outcome: 'The meeting takes eleven minutes. Two comments arrive in the document before it starts. Finance raises the metering cost, which you had flagged in Consequences, and the decision includes it rather than discovering it in April.',
  principle: 'In a distributed organization most decisions are made by people reading, not by people meeting. Writing is how a product manager scales beyond their own calendar — and a decision that is written down stops being reopened by whoever missed the room.',
  wrong: 'Present it live. You get a decision from the people who attended, no record of the reasoning, and the same conversation again in six weeks with someone who was not there.',
  carry: [
    'Recommendation first. Let the reader choose how much reasoning to take.',
    'Label evidence as known, inferred or assumed. It is what makes the rest credible.',
    'A document with no named decision-maker and no date is a newsletter.'
  ]
}
};
