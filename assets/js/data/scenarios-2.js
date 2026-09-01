/* Scenarios — Part III: Choice, Part IV: Delivery */
export default {

prioritization: {
  title: 'Six things, one team, one quarter',
  slug: 'Planning · Monday 09:30 · Week 13',
  premise: 'Six candidates on the board and capacity for perhaps three. Marta is in the room, which is unusual, because one of the six is hers.',
  scene: [
    { t:'action', x:'On the board: (1) Aurora\'s bespoke driving-behavior field, worth €400k. (2) Freshness timestamp for all eleven partners. (3) EU Data Act access obligation with a fixed date. (4) Self-service partner status page. (5) Error semantics — “out of scope” vs “no data”. (6) Developer documentation rebuild.' },
    { t:'line', who:'Marta', x:'One is four hundred thousand euros. I do not understand why we are discussing the others.' },
    { t:'action', x:'You take number three off the board entirely and put it on a separate line above everything else.' },
    { t:'line', who:'Marta', x:'You are just moving things around.' },
    { t:'line', who:'You', x:'No. Three is not a candidate. It is a date we have to meet. Scoring it against the others pretends we could choose not to do it, and inflating its score to make it win corrupts the whole exercise. It comes out of capacity first. What is left is what we are actually choosing between.' }
  ],
  beat: {
    q: 'Score the remaining five. Where does the €400k land, and how do you say it?',
    weak: 'Rank by revenue. Or rank by framework and hide behind the number when Marta pushes.',
    strong: [
      'Reach: (2) affects eleven partners, (5) affects every integrator, (4) recovers your own capacity, (6) affects onboarding, (1) affects one customer.',
      'Add the input RICE does not have: a one-customer schema variant taxes every future change to that schema. Get the cost from Jonas, not from your own guess.',
      'Add the input that is not in any framework: (1) needs a consent basis that does not exist. That is not effort, it is a blocker.',
      'Say the trade-off in Marta\'s currency: “If Aurora goes in this quarter, freshness and error semantics move to next. That is the trade. Is that the one you want?”',
      'Then hand it up. If leadership decides €400k beats eleven partners, that is legitimate — but it is Hanna\'s call, made knowing the cost, not yours made under pressure at 09:30 on a Monday.'
    ]
  },
  outcome: 'The sequence goes: Data Act obligation, freshness, error semantics, status page. Aurora becomes a written business case for Hanna rather than a line in your sprint. Marta is annoyed for a day and then uses the trade-off language herself in the next Aurora call, because it gives her something concrete to say.',
  principle: 'A framework is not a calculator that produces the answer. It is a tool that forces the inputs into the open so the argument is about evidence rather than about who asked most recently.',
  wrong: 'Score the compliance item alongside the features and you have told the room that the regulator is negotiable. Say yes to Aurora quietly and you will spend the quarter on one customer while eleven partners lose trust in the data.',
  carry: [
    'Obligations are constraints, not candidates. Take them out first.',
    'Publish the reasoning and the "not now" list, not just the order.',
    'Never decline without naming what the alternative displaces.'
  ]
},

roadmap: {
  title: 'The slide that must not leave the building',
  slug: 'Before the Meridian QBR · Thursday 08:20 · Week 13',
  premise: 'Marta asks for the roadmap to take into a quarterly business review. She is asking in good faith and she is asking for something dangerous.',
  scene: [
    { t:'line', who:'Marta', x:'Send me the roadmap. Meridian will ask what is coming and I would rather show them than be vague.' },
    { t:'action', x:'The internal roadmap has three columns. The middle one contains: “Battery-health endpoint — subject to consent model confirmation. Confidence: medium. Assumption: existing consent covers the field.”' },
    { t:'action', x:'You know exactly what happens if that slide goes into a customer meeting. The caveat is read once and the promise is remembered forever.' },
    { t:'line', who:'You', x:'I will give you a version you can show, and I will come to the QBR.' },
    { t:'line', who:'Marta', x:'Why not just this one? They are grown-ups.' },
    { t:'line', who:'You', x:'Because if the consent question goes the wrong way, they will not remember the word “subject to”. They will remember that we said battery health was coming, and they will have told their board.' }
  ],
  beat: {
    q: 'What are the two versions, and what makes them both honest?',
    weak: 'Refuse — you damage the relationship you need every day. Or send it — you have converted a medium-confidence item into a commitment you never made.',
    strong: [
      'Internal: outcomes, sequence, explicit confidence, and the assumption each item rests on. “Now — reduce partner integration time from four weeks to under two, high confidence. Next — battery health, medium, assumption: consent covers the field. Later — insurance exploration, low, this is a bet.”',
      'Customer-safe: directional themes, no dates, nothing resting on an unresolved question. “We are investing in faster integration and in richer electric-vehicle condition data.”',
      'Both are true. The difference is what a reader can reasonably conclude from each.',
      'Go to the QBR yourself. Then Meridian gets substance and you control what becomes a promise.'
    ]
  },
  outcome: 'Meridian ask about battery health in the QBR. You answer honestly in the room: we want it, there is an open question about the consent basis, and we will know in three weeks. They are entirely fine with that. Marta is surprised that honesty landed better than the slide would have.',
  principle: 'A roadmap communicates intent with confidence attached. Its failure mode is being read as a commitment schedule — and confidence language is what stops that.',
  wrong: 'Hand over the internal view and the medium-confidence item becomes a promise. When the consent question goes the wrong way you have not slipped a date; you have broken your word to a customer who repeated it to their board.',
  carry: [
    'Cut a view per audience. Same truth, different conclusions available.',
    'Precision should decay with distance. A confident twelve-month item is fiction.',
    'Attend the meeting rather than sending the artifact.'
  ]
},

backlog: {
  title: 'Three hundred and forty items',
  slug: 'Refinement · Tuesday 14:00 · Week 13',
  premise: 'Refinement has overrun for the fourth week. Jonas has stopped coming. The backlog you inherited has 340 items in it.',
  scene: [
    { t:'action', x:'You scroll. There are tickets from before the hub existed. There are three tickets that are the same idea written by three people. There is one from a customer who is no longer a customer.' },
    { t:'line', who:'Iker', x:'Should we book a second refinement session each week?' },
    { t:'action', x:'Which would be more time spent on items that will never be built in a recognizable form.' },
    { t:'line', who:'You', x:'No. We are going to delete about two hundred of these.' },
    { t:'line', who:'Marta', x:'Some of those were promised.' },
    { t:'line', who:'You', x:'Then they belong at the top, and we should talk about that now. That is exactly the point — right now the backlog is hiding both options.' }
  ],
  beat: {
    q: 'What is the rule, and what do you do with Marta\'s objection?',
    weak: 'Archive everything below the fold quietly, or split the backlog by stakeholder so everyone has their own list. The second one destroys the single order that makes a backlog useful.',
    strong: [
      'Anything below roughly two or three iterations of capacity will not be worked in a recognizable form. By the time it surfaces the context has changed and it needs rewriting anyway.',
      'Delete it, with a one-line record of where each idea came from so nothing is lost that mattered.',
      'Take Marta\'s objection seriously and literally: go through the promised ones, one at a time. Either it moves to the top, or someone has an honest conversation with the customer. There is no third option, and the backlog was providing one.',
      'Then set a Definition of Ready so the next session does not become an audit: problem stated, acceptance criteria written, dependencies known, sized.'
    ]
  },
  outcome: 'The backlog drops to 41 items. Refinement finishes early for the first time in eleven weeks. Four of the promised items turn out to have been promised by someone who left. Two are real and go to the top. Jonas comes back to refinement.',
  principle: 'A backlog is work you intend to do, in one order. It is not an archive of good intentions, and its length is not a measure of ambition.',
  wrong: 'Keep all 340 and you get a permanent audit disguised as a planning meeting, a team that stops attending, and the illusion that four promises are being kept.',
  carry: [
    'Deleting is backlog management, not an admission of failure.',
    'Exactly one item is next. Several priority lists is several backlogs.',
    'Detail decays with distance from the top. Refining item 200 is waste.'
  ]
},

requirements: {
  title: 'One endpoint, six kinds of requirement',
  slug: 'Definition workshop · Wednesday 10:00 · Week 14',
  premise: 'Battery health for electric vehicles. One field, one endpoint. Jonas has scoped it at four days. You have scoped the workshop at a full morning, which he thinks is absurd.',
  scene: [
    { t:'line', who:'Jonas', x:'It is a number from the vehicle. Four days.' },
    { t:'line', who:'You', x:'Walk me through what happens when a partner calls it for a vehicle that has not reported in three weeks.' },
    { t:'action', x:'Pause.' },
    { t:'line', who:'Jonas', x:'…It returns the last value.' },
    { t:'line', who:'You', x:'With what indication of age? And what does it return for a vehicle in their contract that has never reported at all, versus one that is not in their contract?' },
    { t:'action', x:'Petra joins for ten minutes by video and asks the question that adds a day: “Is battery health being combined with location anywhere in the response, or by the consumer?”' },
    { t:'action', x:'Lena, on behalf of one of the brands, adds a constraint nobody had heard: her brand restricts how its vehicle data may be attributed inside a third party\'s interface.' }
  ],
  beat: {
    q: 'Write the requirement families out. Which one would have shipped broken?',
    weak: '“As a fleet manager I want battery health so I can plan replacements.” The story is a placeholder. Everything that matters is missing.',
    strong: [
      'Functional: return current state-of-health for a given VIN within the contracted fleet.',
      'Technical: 99.5% availability, p95 under 400ms, value returned with its capture timestamp, versioned schema, documented and distinct error codes for out-of-scope versus no-data, rate limit per partner.',
      'Legal: only for VINs inside the contract, enforcing the contracted use-case scope.',
      'Privacy: state of health alone is low risk; combined with location it is a different question. Purpose limitation applies, retention bounded.',
      'Commercial: metered per vehicle, not per call, with an agreed monthly allowance.',
      'Brand: attribution constraints differ per brand and must be expressed in the partner-facing terms.',
      'The functional requirement was the four days. The other five are the product.'
    ]
  },
  outcome: 'Four days becomes nine. Nobody is happy about that on Wednesday. In week nineteen, when a partner asks how to distinguish a stale reading from a missing one, the answer is in the contract and takes four minutes instead of nine days.',
  principle: 'The functional requirement is the easy part. Non-functional, privacy and brand requirements are what decide whether a data product can exist, be supported, and be sold.',
  wrong: 'Ship the four-day version and you have an endpoint that is correct, unsupportable, silently stale, and restricted by a brand rule you find out about from a partner\'s legal team.',
  carry: [
    'Walk all the requirement families deliberately. The missing one is usually privacy or operations.',
    'If QA cannot pass or fail it without asking you, it is not a requirement.',
    'Ask what happens in the empty case. It is where most of the design actually lives.'
  ]
},

agile: {
  title: 'Two rhythms in one room',
  slug: 'Retro · Friday 16:00 · Week 14',
  premise: 'The team runs two-week sprints. It is not working, and everyone thinks the problem is the sprint.',
  scene: [
    { t:'line', who:'Iker', x:'We have not finished a sprint goal in three sprints.' },
    { t:'line', who:'Jonas', x:'Because on Tuesday a brand feed broke, on Wednesday NordFleet reported stale timestamps, and on Thursday we onboarded a partner. None of that was in the sprint.' },
    { t:'action', x:'Someone suggests longer sprints. Someone suggests a buffer. Someone suggests estimating better.' },
    { t:'action', x:'You draw a line down the middle of the whiteboard.' },
    { t:'line', who:'You', x:'These are two different kinds of work and we have been pretending they are one.' }
  ],
  beat: {
    q: 'What is on each side of the line, and what does each side need?',
    weak: 'Longer sprints, or a “buffer” of story points for interrupts. Both preserve the fiction that unplanned work can be planned.',
    strong: [
      'Left: product work. Battery health, error semantics, the status page. Batchable, has a goal, benefits from a review with a real partner in the room. Scrum shape.',
      'Right: data operations. A brand feed goes quiet, a partner reports stale values, an onboarding request arrives. Arrives when it arrives, variable size, cannot be sprint-planned. Kanban shape — visualize it, limit work in progress, measure cycle time.',
      'Decide who is on the right side each week, explicitly, and take that capacity out of the sprint before planning rather than apologizing for it afterwards.',
      'The sprint goal becomes one sentence about an outcome, so the team can trade scope to reach it.',
      'Choosing the rhythm per stream is a product decision, not a process detail.'
    ]
  },
  outcome: 'The next sprint finishes its goal. Not because the team got faster, but because the sprint stopped containing work that was never going to fit in it. Andrés starts attending the Kanban side, which turns out to matter more than the sprint.',
  principle: 'The framework matters far less than the two behaviors it exists to produce: ship something real regularly, and change the plan when what shipped teaches you something.',
  wrong: 'Add a buffer. You have now institutionalized the fiction, and the team learns that the sprint goal is decorative.',
  carry: [
    'Interrupt-driven work is Kanban-shaped. Forcing it into a sprint strangles both.',
    'A sprint goal is an outcome, not a list of tickets.',
    'Velocity reported upward as productivity stops being a measure.'
  ]
},

delivery: {
  title: 'The checklist Andrés will not sign',
  slug: 'Go/no-go · Thursday 09:00 · Week 15',
  premise: 'One week from general availability. The build is done, the tests pass, and Marta has three customers waiting. Andrés has not agreed to take the product.',
  scene: [
    { t:'line', who:'Marta', x:'It works. Three customers are ready. What are we waiting for?' },
    { t:'line', who:'Andrés', x:'Me. I have not been walked through anything, I do not have a runbook, and when a fleet manager calls on Saturday about a missing vehicle I do not know whether that is a contract question or a fault.' },
    { t:'line', who:'Marta', x:'He can learn on the job. Everybody does.' },
    { t:'action', x:'This is the moment. You are the one who calls go or no-go, and you can say no alone.' },
    { t:'line', who:'You', x:'No. It is not launched until Andrés can support it and until you can describe accurately what it does not do.' }
  ],
  beat: {
    q: 'What is actually on the checklist? Half of it is not about the software.',
    weak: 'Tests pass, deployed, announce it. That is a deployment. Nothing has been launched.',
    strong: [
      'Contract scope covers the use case, and the permitted purposes are recorded per customer.',
      'Consent basis confirmed for every personal-data field.',
      'Data quality thresholds defined and currently met, including freshness.',
      'Schema versioned and documented, with a published breaking-change policy — NordFleet will build on this.',
      'Monitoring live for availability, latency and freshness, with alerts routed to a named team, before launch rather than after.',
      'Routing matrix agreed: who takes “missing vehicle”, who takes “value looks wrong”, who takes “can we add vehicles”.',
      'Runbook written and walked through with Andrés on real cases, until he can resolve the five most likely issues without you.',
      'Rollback tested and its trigger agreed now, while nobody is under pressure.',
      'Residual risks listed, each accepted in writing by a named owner with a review date.',
      'Marta enabled on limits as well as capability. Most post-launch damage is something Sales sincerely believed the product did.'
    ]
  },
  outcome: 'Launch slips by nine days. In the first month there are two incidents instead of the eleven Andrés predicted, and neither reaches a customer. Marta, who lost nine days, gets three renewals she would otherwise have spent defending.',
  principle: '"Done" for a product manager is not deployed. It is operable, supportable, measurable and contractually safe — with the residual risk accepted by someone whose name is on it.',
  wrong: 'Launch on Thursday and every early customer question becomes an escalation to you. You will spend the quarter as a support queue, and the goodwill spent in month one is rarely recovered.',
  carry: [
    'You can say no to a launch alone. You cannot say yes over a blocking function.',
    'Risk handover means someone accepts, in writing, with a date. An email is a notification.',
    'Enable Sales on the limits. That is where the damage comes from.'
  ]
},

risk: {
  title: 'The field that is late and is not yours',
  slug: 'Wednesday 11:30 · Week 15',
  premise: 'Battery health depends on a field one brand-side team must expose, and on a contract template Petra\'s team is drafting. Neither reports to you. Both are quiet.',
  scene: [
    { t:'action', x:'The date was three weeks away. It is now nine days away and you have had no update from either.' },
    { t:'action', x:'The comfortable option is to assume it is progressing. Everybody is busy and nobody has said no.' },
    { t:'line', who:'You', x:'(on a call, to the brand-side lead) I need to confirm two things in writing. Is the field on track for the twenty-eighth, and if it is not, when do you know?' },
    { t:'line', who:'Brand lead', x:'It will be close. Possibly the first week of next month.' },
    { t:'line', who:'You', x:'Then I need to take a fallback decision on the twenty-fourth. I am going to write that down and send it to you, so neither of us discovers it late.' }
  ],
  beat: {
    q: 'What does a dependency need beyond a date?',
    weak: 'A RAG status in a tracker. Green until it is red, and red is the day you needed it.',
    strong: [
      'A named person, not a team.',
      'A realistic date confirmed in writing by that person, not inferred from silence.',
      'A fallback decided now: ship general availability without battery health, as a fast-follow.',
      'The date by which you must take the fallback — which is earlier than the date you need the field.',
      'A weekly check with the named person, not a status field.',
      'Communication before people find out: Marta first, because Meridian asked about battery health in the QBR.',
      'And the change-management half nobody plans: when the field does arrive and the schema changes, the eleven partners need versioning and notice. The change is not finished when the code ships.'
    ]
  },
  outcome: 'The field arrives eight days late. Because the fallback was decided on the twenty-fourth rather than invented on the twenty-eighth, general availability holds and battery health ships as a versioned addition three weeks later, with notice. Nobody outside the team notices anything happened.',
  principle: 'Most product failures were foreseeable and unowned. A risk register earns its place not by predicting, but by putting a name and a review date against a thing that would otherwise belong to nobody.',
  wrong: 'Wait politely. On the twenty-eighth you invent a fallback under pressure, tell Marta after she has told the customer, and ship a schema change to eleven partners with no notice.',
  carry: [
    'Escalate early and factually. Late escalation damages the relationship far more.',
    'Every dependency needs a fallback and a decision deadline for taking it.',
    'Approving a change is not the same as people working differently.'
  ]
},

serviceops: {
  title: 'Everything arrives at you',
  slug: 'Saturday 10:14 · Week 17',
  premise: 'Two weeks after general availability. Your phone rings on a Saturday. It is the fourth time this week.',
  scene: [
    { t:'action', x:'A fleet manager at Meridian cannot see three vehicles. Andrés does not know whether that is a contract question or a fault, so he called you.' },
    { t:'action', x:'It takes you six minutes. Two of the three are not in the contracted fleet. The third has not reported since a workshop visit.' },
    { t:'action', x:'It is the same six minutes as Tuesday, and as the Thursday before. You are not the product manager on Saturdays. You are the routing layer.' },
    { t:'line', who:'Andrés', x:'(Monday) I am not trying to bounce these to you. I genuinely do not know which ones are mine.' }
  ],
  beat: {
    q: 'Write the table. Five rows, two hours of work.',
    weak: 'Tell Andrés to escalate less. Or answer faster. Both scale with your availability, which is the problem.',
    strong: [
      '“Data missing for a vehicle” → first-line support, 4h. First step: check contract scope and VIN eligibility, because most of these are scope, not fault. Escalate to data operations only if the VIN is in scope.',
      '“Value looks wrong” → data operations, 8h. Requires a plausibility check against the source before it becomes an engineering ticket.',
      '“Endpoint returning errors” → engineering on-call, 30 minutes, page immediately.',
      '“Can we add vehicles or a new use case?” → account manager, next business day. This is commercial, not support. Routing it to engineering wastes two days.',
      '“Schema or integration question” → developer support, one business day.',
      'Then the promise itself: SLOs stricter than the SLA, with headroom, set from what you have actually measured. And freshness as its own indicator, because a green availability number over a three-day-old value is the failure mode nobody catches.'
    ]
  },
  outcome: 'The table takes an afternoon. Saturday calls stop within three weeks. Andrés resolves eighty percent at first line because the first diagnostic step is written down. You get your product-manager job back, which is the actual return on the afternoon.',
  principle: 'Once a product is live it becomes a service. Without a routing matrix, the product manager is the routing matrix — and the bottleneck is not a capacity problem, it is a design one.',
  wrong: 'Absorb it. You will be available, competent, and unable to do the job you were hired for. And the moment you take leave, the knowledge leaves with you.',
  carry: [
    'A routing row needs a first diagnostic step, not just an owner.',
    'Never promise an SLA you have not measured. Set the SLO stricter, with headroom.',
    'For a data product, freshness needs its own indicator. Availability will not catch it.'
  ]
}
};
