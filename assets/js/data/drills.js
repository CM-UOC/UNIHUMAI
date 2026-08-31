/* drills.js — flashcards, prioritisation exercises, decision simulations, frameworks */

/* ---------------- flashcards ---------------- */
export const CARDS = [
  { id:'c1',  concept:'strategy',      front:'What makes a product strategy different from a set of goals?', back:'Goals say how much; strategy says which way. A strategy is a set of choices — where to play, how to win — including explicit non-goals. If nothing is excluded, it is not a strategy.' },
  { id:'c2',  concept:'strategy',      front:'What is the load-bearing part of a strategy document?', back:'The non-goals. Without them the strategy cannot refuse anything, and prioritisation collapses back to whoever asked most recently.' },
  { id:'c3',  concept:'problem',       front:'What are the five parts of a usable problem statement?', back:'Who is affected, the situation, the outcome they cannot reach, the evidence it is real, and the cost of doing nothing. No solution.' },
  { id:'c4',  concept:'problem',       front:'Why is "customers keep asking for it" weak evidence?', back:'Asking is cheap and measures interest, not cost. You need frequency, who is affected, and what they did when they did not get it.' },
  { id:'c5',  concept:'valueprop',     front:'What is usually your strongest competitor in B2B?', back:'The status quo — "we already cope". A value proposition has to beat doing nothing, not just beat named vendors.' },
  { id:'c6',  concept:'valueprop',     front:'What is wrong with "100+ data points across six brands via one API"?', back:'It describes supply. It names no customer decision and no alternative. Finish the sentence "…so that they can…" and lead with that half.' },
  { id:'c7',  concept:'lifecycle',     front:'What does "role before threshold" mean?', back:'Judge a product by the role it plays in the portfolio — core, growth, specialist, on-demand, substitution, withdrawal — before applying a uniform sales threshold. Low volume is not evidence for withdrawal on its own.' },
  { id:'c8',  concept:'lifecycle',     front:'What does an end-of-life plan need?', back:'Migration mapping, notice schedule per contract, parallel-run window, knowledge transfer, and a named owner for the residual risk. The withdrawal is the product\'s last release.' },
  { id:'c9',  concept:'discovery',     front:'Name the four product risks.', back:'Value (will they use it), usability (can they), feasibility (can we build it), viability (may we — legally, commercially, ethically).' },
  { id:'c10', concept:'discovery',     front:'Which risk usually comes first for a vehicle-data product, and why?', back:'Viability. Whether the data may be used for that purpose, for that customer, under whose consent. It is cheap to test, and it can end the idea in a day.' },
  { id:'c11', concept:'research',      front:'Why is the buyer rarely the user in B2B?', back:'The integrator, the daily user, the procurement lead and the support agent all define success differently. Researching only the buyer produces a product the daily user quietly refuses to adopt.' },
  { id:'c12', concept:'research',      front:'Why not ask "would you use this?"', back:'Hypothetical answers are consistently over-positive. Ask what they did last time the situation arose — behaviour is evidence, preference is a forecast.' },
  { id:'c13', concept:'market',        front:'What does losing deals to "they built it in-house" tell you?', back:'A proposition and total-cost problem, not a feature gap. The counter is making the ongoing cost of maintaining an internal build visible.' },
  { id:'c14', concept:'market',        front:'Why can regulation matter more than a competitor launch?', back:'It changes the structure of the market — the EU Data Act lowers the access barrier for everyone, which moves the defensible position from access towards standardisation, breadth and reliability.' },
  { id:'c15', concept:'experimentation', front:'What separates an experiment from a trial run?', back:'The measure, threshold and resulting decision are agreed before it starts. Otherwise the result gets reinterpreted to fit what the team already wanted.' },
  { id:'c16', concept:'experimentation', front:'How do you validate when A/B testing is impossible?', back:'A bounded pilot: defined participants, scope, duration and pre-agreed exit criteria. Choose participants who could plausibly say no.' },
  { id:'c17', concept:'prioritisation',front:'How should a regulatory obligation enter prioritisation?', back:'As a constraint that consumes capacity before discretionary items are scored — not as a scored candidate, and not by inflating its score.' },
  { id:'c18', concept:'prioritisation',front:'What does RICE stand for, and what does it miss?', back:'Reach × Impact × Confidence ÷ Effort. It misses the compounding maintenance cost of a bespoke one-customer variant — add that explicitly.' },
  { id:'c19', concept:'roadmap',       front:'Why cut a separate roadmap view for customers?', back:'Internal nuance becomes external promise the moment it leaves the building. A medium-confidence item shared with a prospect becomes a commitment you did not make.' },
  { id:'c20', concept:'roadmap',       front:'What should decay across roadmap horizons?', back:'Precision and confidence. A confidently detailed twelve-month item is usually fiction.' },
  { id:'c21', concept:'backlog',       front:'Why must a backlog have exactly one order?', back:'Because exactly one item is next. Several priority lists maintained per stakeholder is several backlogs pretending to be one.' },
  { id:'c22', concept:'backlog',       front:'What is a Definition of Ready for?', back:'It states the conditions under which an item may be started — so sprints do not begin with unanswered questions.' },
  { id:'c23', concept:'requirements',  front:'Which requirement family is most often missed?', back:'Privacy, then operations. The functional requirement is usually the easy part; non-functional and permission requirements decide whether the product can exist.' },
  { id:'c24', concept:'requirements',  front:'Rewrite "the system should be fast" as a requirement.', back:'p95 latency under 400ms at 50 requests per second. If QA cannot pass or fail it without asking you, it is not a requirement.' },
  { id:'c25', concept:'agile',         front:'Why is velocity dangerous when reported upward?', back:'Goodhart\'s law: as soon as it becomes a target it inflates without more value being delivered. It is a team forecasting aid, not a productivity measure.' },
  { id:'c26', concept:'agile',         front:'When is Kanban a better fit than Scrum?', back:'Interrupt-driven work with variable item size — support, data operations, onboarding. Sprint-planning work that arrives unpredictably strangles it in ceremony.' },
  { id:'c27', concept:'delivery',      front:'Name four go-live items that are not about the software working.', back:'Support runbook and walkthrough, routing matrix agreed, residual risks accepted by named owners, Sales enabled on limits as well as capability. Also: contract scope and consent basis confirmed.' },
  { id:'c28', concept:'delivery',      front:'What does risk handover actually require?', back:'The receiving owner accepts each residual risk in writing, with a review date. An email is a notification, not a handover — the risk stays with you invisibly.' },
  { id:'c29', concept:'risk',          front:'What does a dependency need beyond a date?', back:'A named owner and a fallback, plus the date by which you must take the fallback. Tracking a date alone just tells you when you failed.' },
  { id:'c30', concept:'risk',          front:'Difference between change control and change adoption?', back:'Change control is the process for approving an alteration to scope. Change adoption is people actually working differently. Approving a change does not accomplish it.' },
  { id:'c31', concept:'analytics',     front:'What is a counter-metric for?', back:'To reveal the damage caused by pursuing a target. Every target creates an incentive to game it; the pairing is the cheapest protection.' },
  { id:'c32', concept:'analytics',     front:'API call volume doubled. Why might that be bad?', back:'Partners retrying against errors, or one badly configured poller. Volume is an output that rises for good and bad reasons — check error rate and unique active vehicles.' },
  { id:'c33', concept:'serviceops',    front:'Difference between SLA, SLO and SLI?', back:'SLI is the measurement (availability, p95 latency, freshness). SLO is your stricter internal target. SLA is the contractual promise, set with headroom below the SLO.' },
  { id:'c34', concept:'serviceops',    front:'What does a routing matrix row contain?', back:'Issue type → first responder → response time → first diagnostic step → escalation → owner. Without it, everything arrives at the PM.' },
  { id:'c35', concept:'serviceops',    front:'99.95% availability but customers complain. Why?', back:'The service is up and the data is stale or wrong. A 200 response with a three-day-old value satisfies availability and fails the customer. Freshness needs its own indicator.' },
  { id:'c36', concept:'stakeholders',  front:'What is the first thing to learn about a stakeholder?', back:'What they are measured on. Most disagreement is two people optimising correctly for different targets.' },
  { id:'c37', concept:'stakeholders',  front:'Privacy objects two days before launch. Whose failure is that?', back:'A stakeholder-mapping failure — a blocking function engaged after commitment rather than during definition. The remedy is a standing touchpoint, not a complaint.' },
  { id:'c38', concept:'crossfunctional', front:'Why write down the definition of "active customer"?', back:'Because Sales, Engineering, Finance and Support each count it differently, and the monthly meeting gets spent reconciling four numbers instead of deciding anything.' },
  { id:'c39', concept:'leadership',    front:'What is a one-way door?', back:'A decision that is expensive or impossible to reverse — a pricing metric, a schema partners build on. It deserves more evidence and usually a higher decision-maker.' },
  { id:'c40', concept:'leadership',    front:'Which decisions are never a PM\'s to make?', back:'Accepting legal, privacy or financial risk on the company\'s behalf. You frame the question; the owner decides.' },
  { id:'c41', concept:'gtm',           front:'Why does a partner-led motion change the product?', back:'Your interface becomes load-bearing for someone else\'s business — so versioning, notice and deprecation matter; support gains a tier; and pricing must leave partner margin.' },
  { id:'c42', concept:'gtm',           front:'Adoption is flat. Name the four barriers before choosing a fix.', back:'Demand, access, confidence, follow-through. Each needs a different remedy — and training is the default reflex regardless of diagnosis.' },
  { id:'c43', concept:'commercial',    front:'Why is per-API-call a poor pricing metric?', back:'It punishes customers for depending on you and makes their spend unpredictable. Per vehicle or per use case scales with the value they receive.' },
  { id:'c44', concept:'commercial',    front:'Customer wants to reuse existing data for a new purpose. What is that?', back:'A new product definition — different permitted purpose, possibly a different lawful basis, different brand and legal requirements. Not an upsell, even though no engineering is needed.' },
  { id:'c45', concept:'dataproduct',   front:'What makes something a data product rather than a pipeline?', back:'An owner, a documented interface, defined semantics, quality guarantees, a lifecycle and a support model — so the consumer can rely on it without understanding how it was produced.' },
  { id:'c46', concept:'dataproduct',   front:'Why ship the timestamp with every value?', back:'Vehicles report intermittently. Without a prominent age indicator, consumers assume currency — and stale-but-plausible is the most damaging data failure there is.' },
  { id:'c47', concept:'dataproduct',   front:'Name three things that vary across brands and model years.', back:'Which signals exist at all, at what frequency they transmit, and the semantics of a field (e.g. fuel level versus state of charge). "Standardised" is work you do, not a property you inherit.' },
  { id:'c48', concept:'compliance',    front:'What is purpose limitation?', back:'Personal data collected for one purpose may not simply be reused for another. Holding the data does not grant the right to use it that way.' },
  { id:'c49', concept:'compliance',    front:'What does the EU Data Act require of a data holder?', back:'That users can access the data their connected product generates, and can have it shared with third parties on fair, reasonable and non-discriminatory (FRAND) terms. It coexists with GDPR rather than replacing it.' },
  { id:'c50', concept:'compliance',    front:'Is pseudonymised vehicle data outside GDPR?', back:'No. Pseudonymised is not anonymous — vehicle data is often re-identifiable from movement patterns, so it remains personal data.' },
  { id:'c51', concept:'compliance',    front:'What is a PM\'s correct role on a privacy question?', back:'Frame the question precisely, bring it early, name the owner, record the answer. Not to give the opinion — confidence without authority is the dangerous combination.' },
  { id:'c52', concept:'writing',       front:'What goes in the first paragraph of a recommendation memo?', back:'The recommendation. Then context, options with consequences, labelled evidence, and a named decision-maker with a date.' },
  { id:'c53', concept:'writing',       front:'Which section do most PMs omit from a one-pager?', back:'The evidence labelling — what is known, what is inferred, what is still assumed. It is the section that makes the document trustworthy.' },
  { id:'c54', concept:'negotiation',   front:'What are the four moves when declining a large request?', back:'Ask the underlying need; test reach across customers; cost it including the permanent variant tax; name the trade-off and offer a real alternative. Escalate as a written choice if it still stands.' },
  { id:'c55', concept:'negotiation',   front:'What is the worst response to a bespoke request?', back:'Agreeing and then quietly letting it slip. It costs the roadmap anyway and destroys the Sales relationship you need daily.' },
  { id:'c56', concept:'dataquality',   front:'Name the six data quality dimensions.', back:'Accuracy, completeness, consistency, timeliness, validity, uniqueness.' },
  { id:'c57', concept:'dataquality',   front:'Why does schema validation miss the worst errors?', back:'Because damaging values are usually well-formed. An odometer jumping 40,000 km in a day is a valid integer — only a plausibility rule catches it.' },
  { id:'c58', concept:'partners',      front:'What must exist before the first partner integrates?', back:'A published deprecation policy: notice period, versioning rules, parallel-run window, migration support. Agreeing it after the first complaint is too late.' },
  { id:'c59', concept:'partners',      front:'How does a partner differ from a customer?', back:'A customer consumes; a partner resells or embeds and has built a business on your interface. They need stability commitments and margin, and they have escalation power your direct customers do not.' },
  { id:'c60', concept:'strategy',      front:'GIS Data Hub, in one line.', back:'One face, one contract per use case, one system — standardised static and dynamic vehicle data across six Group brands, delivered by API. (Public material; verify current details before quoting.)' }
];

/* ---------------- prioritisation drills (drag & drop) ---------------- */
export const PRIORITY_DRILLS = [
  {
    id:'d-rice',
    title:'Sequence a data-product backlog',
    brief:'You have one team and a quarter. Order these six items from first to last. There is a defensible answer; the point is whether your reasoning matches it.',
    items:[
      { id:'p1', label:'EU Data Act access obligation with a fixed compliance date', hint:'Regulatory obligation' },
      { id:'p2', label:'Data-freshness improvement affecting all eleven partners',   hint:'High reach, low visibility' },
      { id:'p3', label:'Bespoke field for one insurer worth €400k, creates a schema variant', hint:'High revenue, reach of one' },
      { id:'p4', label:'Self-service partner status page, would cut ~30% of support tickets', hint:'Recovers team capacity' },
      { id:'p5', label:'Battery-health endpoint, three partners waiting, consent model unconfirmed', hint:'Blocked by an open question' },
      { id:'p6', label:'Redesign of the developer documentation portal', hint:'Improves onboarding, no deadline' }
    ],
    ideal:['p1','p2','p4','p5','p3','p6'],
    rationale:[
      'p1 first — a regulatory obligation with a fixed date is a constraint, not a candidate. It consumes capacity before anything discretionary is scored.',
      'p2 second — highest reach, and freshness is the failure mode that quietly destroys trust in a data product. Low visibility work with high reach is exactly what a PM exists to protect.',
      'p4 third — it recovers capacity. Work that buys back team time compounds, and 30% of support tickets is real capacity, not a nice-to-have.',
      'p5 fourth — genuine demand, but blocked on an unconfirmed consent model. Resolve the permission question first (cheap, days) and it may move up; do not start the build on an unresolved viability risk.',
      'p3 fifth — high revenue but reach of one, and a schema variant taxes every future change. This may well be overruled upward, and that is legitimate — but the trade-off should be made visibly by leadership, not absorbed by you.',
      'p6 last — real value, no deadline, no blocked dependency. The classic "important but never urgent" item that should be scheduled deliberately rather than squeezed.'
    ],
    tolerance:2
  },
  {
    id:'d-golive',
    title:'Order a go-live checklist',
    brief:'A data product is two weeks from launch. Order these readiness activities by when they must be completed — earliest first.',
    items:[
      { id:'g1', label:'Confirm contract scope and consent basis for every personal-data field' },
      { id:'g2', label:'Verify build against acceptance criteria, including non-functional' },
      { id:'g3', label:'Agree routing matrix and walk support through the runbook on real cases' },
      { id:'g4', label:'Complete risk handover — each residual risk accepted in writing by a named owner' },
      { id:'g5', label:'Enable Sales on capability and, explicitly, on limits' },
      { id:'g6', label:'Confirm monitoring and alerting on availability, latency and freshness' },
      { id:'g7', label:'Make the go/no-go decision explicitly' }
    ],
    ideal:['g1','g2','g6','g3','g5','g4','g7'],
    rationale:[
      'g1 first — permission is the one thing that can make everything else worthless. If the consent basis does not hold, nothing after this matters.',
      'g2 next — verification against acceptance criteria, including the non-functional ones, before anyone builds process around a product that may change.',
      'g6 then — monitoring must be live before launch, not after. You cannot retrofit the baseline you needed on day one.',
      'g3 then — support cannot be walked through a runbook for a product still changing. This is where operability is actually established.',
      'g5 then — enable Sales once the product and its limits are settled. Enabling early guarantees they will sell a version that no longer exists.',
      'g4 near the end — residual risks can only be listed and accepted once you know what is actually shipping.',
      'g7 last — the go/no-go is a decision made on the evidence of everything above it. If it happens earlier, it is a formality.'
    ],
    tolerance:2
  },
  {
    id:'d-discovery',
    title:'Order discovery tests by risk',
    brief:'A new predictive-maintenance product for independent workshops. Order these tests so the cheapest idea-killer runs first.',
    items:[
      { id:'v1', label:'Ask privacy and legal whether we may contact a driver based on diagnostic data, and who holds the consent' },
      { id:'v2', label:'Data spike: does the diagnostic signal exist across all six brands at usable frequency?' },
      { id:'v3', label:'Ten interviews with workshop owners about what they do today when a customer is due for service' },
      { id:'v4', label:'Prototype the workshop-facing interface and run usability sessions' }
    ],
    ideal:['v1','v2','v3','v4'],
    rationale:[
      'v1 — viability. One conversation, one day, and it can end the idea outright. In a permission-based data business this is almost always the cheapest killer.',
      'v2 — feasibility. Two days. If the signal does not exist across the brands you would sell into, the product does not exist either.',
      'v3 — value. More expensive in time, and only worth spending once you know the product is permitted and possible.',
      'v4 — usability. Last, because it only matters if the other three pass. Prototyping first is the most common and most expensive discovery mistake.'
    ],
    tolerance:1
  }
];

/* ---------------- decision simulations ---------------- */
export const SIMULATIONS = [
  {
    id:'sim-deal',
    title:'The deal that needs one field',
    setting:'Tuesday, 16:40. A sales director messages you: a €400k renewal is contingent on a bespoke data field for one insurer. The customer wants a commitment by Friday.',
    concepts:['negotiation','prioritisation','commercial'],
    steps:[
      {
        prompt:'It is your first response. What do you do?',
        options:[
          { id:'a', label:'Ask what the customer is actually trying to achieve with the field.', score:3,
            feedback:'Right. The request arrived as a solution. The underlying need often has cheaper routes, and you cannot cost or generalise anything until you know it.' },
          { id:'b', label:'Ask engineering to estimate the build.', score:1,
            feedback:'Premature. Estimating a solution you have not validated wastes engineering time and anchors the conversation on delivery rather than on need.' },
          { id:'c', label:'Tell them it is not on the roadmap and cannot be committed by Friday.', score:0,
            feedback:'A refusal without understanding the need. You have spent relationship capital and learned nothing — and the request will now escalate over your head.' },
          { id:'d', label:'Commit provisionally to keep the renewal alive.', score:0,
            feedback:'The worst option. You have made a promise you cannot cost, and if it slips you lose both the roadmap and the trust.' }
        ]
      },
      {
        prompt:'The need turns out to be: they want to identify vehicles with unusual usage patterns for risk pricing. Two other customers have asked for something adjacent. What now?',
        options:[
          { id:'a', label:'Reframe it as a generalisable capability and check what a shared version would cost.', score:3,
            feedback:'Exactly. Reach of three changes it from a favour into a product decision, and a generalised version avoids the permanent variant tax.' },
          { id:'b', label:'Build the bespoke field for this customer now and generalise later.', score:1,
            feedback:'Understandable under time pressure, and it is how schema variants accumulate. "Generalise later" almost never happens once a customer depends on the specific version.' },
          { id:'c', label:'Escalate immediately since three customers want it.', score:1,
            feedback:'Premature. You have not yet costed it or identified the governance question, so you would be escalating a problem rather than a choice.' },
          { id:'d', label:'Note that usage patterns for risk pricing may need a different lawful basis, and check that before anything else.', score:3,
            feedback:'Also right, and arguably first. Driving-behaviour data for risk scoring is among the most sensitive uses; if the purpose is not permitted, the cost question is irrelevant.' }
        ]
      },
      {
        prompt:'Privacy confirms the purpose needs a separate consent basis that does not currently exist. The sales director escalates to your head of product. What do you do?',
        options:[
          { id:'a', label:'Send a one-pager first: recommendation, three options with costs, the consent constraint, and the decision needed by Friday.', score:3,
            feedback:'The right move. Your head of product now walks into the escalation informed and with options, rather than arbitrating between two accounts of the same event.' },
          { id:'b', label:'Wait to be asked, then explain your reasoning in the meeting.', score:1,
            feedback:'You lose the framing. Whoever describes the situation first sets the terms of the discussion.' },
          { id:'c', label:'Message the sales director asking them not to escalate.', score:0,
            feedback:'Escalation is a legitimate tool and they are entitled to use it. Trying to suppress it damages the relationship and makes you look defensive.' },
          { id:'d', label:'Concede the point to protect the relationship.', score:0,
            feedback:'You cannot concede this one — the constraint is a consent basis that does not exist. Conceding here would commit the company to something it cannot lawfully deliver.' }
        ]
      }
    ],
    debrief:'The pattern: convert the request into a need, test reach, surface the governance question early, and escalate as a written choice rather than as a dispute. The consent constraint is what makes this a product-definition question rather than a prioritisation one — and spotting that quickly is the difference between a PM in a data business and a PM in general.'
  },
  {
    id:'sim-quality',
    title:'The number that was wrong',
    setting:'A leasing customer calls: they priced remarketing on odometer readings from your API, and three vehicles were materially off. Their pricing team has already used the numbers.',
    concepts:['dataquality','serviceops','crossfunctional'],
    steps:[
      {
        prompt:'First move?',
        options:[
          { id:'a', label:'Establish the blast radius: which vehicles, which period, and whether other customers consumed the same values.', score:3,
            feedback:'Right. Scope before cause. If other customers are affected you have a communication obligation before you have a fix.' },
          { id:'b', label:'Ask engineering to find the bug.', score:2,
            feedback:'Necessary, but not first. Without scope you cannot tell the customer anything useful, and you may miss that others are affected.' },
          { id:'c', label:'Apologise and offer a credit.', score:0,
            feedback:'Too early. You do not yet know whether the values were wrong, stale, or correctly reported and misinterpreted — and the remedy differs in each case.' },
          { id:'d', label:'Check whether the values were stale rather than wrong.', score:3,
            feedback:'A strong instinct. In vehicle data, "wrong" is far more often "old" — and the fix for staleness is a freshness indicator, not a correction.' }
        ]
      },
      {
        prompt:'It turns out the values were valid but transmitted eleven days earlier, and the API returned them with no prominent age indicator. What is the product problem?',
        options:[
          { id:'a', label:'A data quality problem — the source data is unreliable.', score:1,
            feedback:'Not quite. The data was accurate for the moment it was captured. The problem is that its age was invisible to the consumer.' },
          { id:'b', label:'A product design problem — freshness was not shipped alongside the value, so the consumer could not calibrate trust.', score:3,
            feedback:'Correct. This is the defining data-product failure: a technically correct response that the consumer cannot interpret. The fix is a design decision, not a pipeline fix.' },
          { id:'c', label:'A customer problem — they should have checked the timestamp.', score:0,
            feedback:'If the timestamp was available but not prominent, the design failed. Pushing interpretation onto the consumer defeats the purpose of a data product.' },
          { id:'d', label:'A contract problem — the SLA did not cover freshness.', score:2,
            feedback:'True and worth fixing, but downstream. The contract gap is a symptom of not having treated freshness as a first-class property.' }
        ]
      },
      {
        prompt:'What do you put in place so this does not recur?',
        options:[
          { id:'a', label:'Return freshness with every value, add a staleness threshold with alerting, and define freshness in the SLA.', score:3,
            feedback:'The complete answer: product change, operational monitoring, and contractual commitment. Any one alone leaves a gap.' },
          { id:'b', label:'Add a note to the documentation explaining that values may be delayed.', score:0,
            feedback:'Documentation does not change behaviour at the point of use. The consumer reads the value, not the docs.' },
          { id:'c', label:'Add freshness monitoring internally so you catch it before customers do.', score:2,
            feedback:'Valuable but incomplete. You will know sooner; the consumer still cannot calibrate trust at the point of use.' },
          { id:'d', label:'Suppress values older than the threshold rather than returning them.', score:2,
            feedback:'Defensible for some consumers and wrong for others — a diagnostics customer may want the stale value flagged. This is why quality thresholds belong per-consumer in the data contract.' }
        ]
      }
    ],
    debrief:'The recurring lesson in data products: correct is not the same as usable. A value that is accurate for a moment three weeks ago, returned without its age, is a wrong answer in every way that matters to the customer. Freshness is a product property, a monitored SLI, and a contractual term — all three, or the gap reopens.'
  },
  {
    id:'sim-hub',
    title:'Week one in a hub with no process',
    setting:'You have joined the GIS:Hub. There is a team, two engineers, a designer, a sales lead, and an ambition. There is no roadmap, no written decision rights, and two parent organisations with opinions.',
    concepts:['leadership','stakeholders','writing'],
    steps:[
      {
        prompt:'Your first week. What do you prioritise?',
        options:[
          { id:'a', label:'Draft a roadmap so the team has direction.', score:1,
            feedback:'The instinct is understandable and premature. A roadmap built before you understand the constraints will be wrong in ways that cost credibility to correct.' },
          { id:'b', label:'Meet the people who can stop a product — privacy, legal, brand — before you need anything from them.', score:3,
            feedback:'High value and rarely done. These relationships are cheap to build before you have an ask and expensive to build during an escalation.' },
          { id:'c', label:'Learn the domain: what data exists, at what frequency, with what gaps by brand and model year.', score:3,
            feedback:'Essential. Without this you cannot tell a good idea from an impossible one, and you will be led by whoever is most confident.' },
          { id:'d', label:'Interview customers to build a problem inventory.', score:2,
            feedback:'Valuable, but you will interpret what you hear badly until you know what is technically and legally possible.' }
        ]
      },
      {
        prompt:'By week five it is clear nobody knows who signs a gate decision. What do you do?',
        options:[
          { id:'a', label:'Write down the decision rights as you understand them and circulate it to be corrected.', score:3,
            feedback:'The right move. A document that is wrong gets corrected; an open question gets ignored. This is the highest-leverage act available to a PM in a new organisation.' },
          { id:'b', label:'Ask your manager to clarify and wait for an answer.', score:1,
            feedback:'Reasonable, but it makes the problem someone else\'s and it will queue. You will be waiting in week nine.' },
          { id:'c', label:'Proceed and find out by discovering who objects.', score:0,
            feedback:'You will find out — during a launch, from someone who can stop it. This is how the two-days-before-go-live privacy objection happens.' },
          { id:'d', label:'Propose adopting the parent organisation\'s existing process wholesale.', score:1,
            feedback:'It may be too heavy for a hub set up to be agile, and importing a process you do not understand will not answer the question of who decides here.' }
        ]
      },
      {
        prompt:'Your document comes back with two parents disagreeing about who approves a use-case definition. What now?',
        options:[
          { id:'a', label:'Name the disagreement explicitly in the document and take it to whoever owns the hub.', score:3,
            feedback:'Correct. A structural ambiguity between two parents is not yours to resolve — but making it visible and unavoidable is exactly your job.' },
          { id:'b', label:'Pick the interpretation that lets you move fastest.', score:0,
            feedback:'You will be overruled at the worst moment, and you will have spent the credibility of the document to get there.' },
          { id:'c', label:'Ask both to approve everything until it is settled.', score:1,
            feedback:'Safe and slow. It works for a few weeks and then becomes the process, which is worse than the ambiguity.' },
          { id:'d', label:'Leave it ambiguous and handle each case individually.', score:0,
            feedback:'Every case becomes a negotiation. This is the specific failure a new hub is most vulnerable to.' }
        ]
      }
    ],
    debrief:'In a new organisation the scarcest thing is not direction, it is clarity about who decides. Writing down your understanding and inviting correction is faster than asking, more durable than a conversation, and it makes structural ambiguity visible to the person who can resolve it. It is also, conveniently, the thing the ad means by an ownership mindset.'
  }
];

/* ---------------- answer frameworks ---------------- */
export const FRAMEWORKS = [
  { id:'star', name:'STAR', use:'Behavioural questions asking for a specific past event.',
    steps:['Situation — the context, briefly','Task — what you were responsible for','Action — what you specifically did','Result — what happened, quantified where honest'],
    caution:'Weakest on Result, because people describe activity rather than change. Not suitable for "how would you" questions, which want a process, not a story.' },
  { id:'carl', name:'CARL', use:'Behavioural questions where the reflection is the strongest part — failures, difficult decisions.',
    steps:['Context','Action','Result','Learning — the specific change you made, with evidence you made it'],
    caution:'Only better than STAR if the Learning is genuine and applied. A generic lesson is worse than none.' },
  { id:'circles', name:'CIRCLES', use:'Open product-design questions.',
    steps:['Comprehend the situation','Identify the customer','Report their needs','Cut through prioritisation','List solutions','Evaluate trade-offs','Summarise the recommendation'],
    caution:'Too long to walk aloud in full. Name it, then abbreviate — comprehend, pick a customer, prioritise one need, two or three solutions, trade-off, recommendation.' },
  { id:'aarm', name:'AARM', use:'Metric design for a product with a user funnel.',
    steps:['Acquisition','Activation','Retention','Monetisation'],
    caution:'In B2B, activation usually means integration completed — not signup. Adapt it or it misleads.' },
  { id:'hypothesis', name:'Hypothesis statement', use:'Any validation or experiment question.',
    steps:['We believe [X]','We will know we are right when [measure] passes [threshold]','If it does not, we will [action]'],
    caution:'The third clause is the one that matters and the one most people omit.' },
  { id:'onepager', name:'Recommendation one-pager', use:'Escalating a decision, or any written product argument.',
    steps:['Recommendation, first sentence','Context — what changed','Options with costs, including doing nothing','Evidence, labelled known / inferred / assumed','Consequences','Decision needed from [name] by [date]'],
    caution:'If there is no named decision-maker and no date, it is a newsletter.' },
  { id:'fourrisks', name:'The four risks', use:'Discovery and validation questions.',
    steps:['Value — will they use it','Usability — can they use it','Feasibility — can we build it','Viability — may we, legally and commercially'],
    caution:'Order by consequence for the specific idea. In vehicle data, viability usually comes first and is cheapest to test.' },
  { id:'noframework', name:'No framework', use:'Short factual questions, questions about your own experience, and any moment where a framework would sound rehearsed.',
    steps:['Answer the question','Give one concrete example','Stop'],
    caution:'Forcing every answer into a structure is itself a weak signal. The frameworks are scaffolding, not a script.' }
];
