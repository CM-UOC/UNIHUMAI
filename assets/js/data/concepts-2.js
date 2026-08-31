/* Module 2 (cont.) and Module 3 — Deciding & planning */
export default [
{
  id: 'market', module: 'm2', order: 7, minutes: 10,
  title: 'Market and competitor analysis',
  oneLine: 'Understanding the field you compete in well enough to choose where to play — and where not to.',
  definition: 'Market analysis sizes and segments the demand: who has the problem, how many, what they spend today, what forces are changing. Competitor analysis maps the alternatives a buyer can actually choose, including in-house builds and doing nothing. Together they answer whether an opportunity is worth pursuing and what a credible position inside it looks like.',
  why: 'It stops two failure modes. The first is entering a market that is real but unwinnable for you. The second is dismissing a competitor because they are technically inferior, when buyers are choosing them for distribution, contract simplicity or switching cost. In data businesses the decisive competitor is often the customer\'s own data team.',
  when: 'Before a strategic commitment, when entering a segment, at annual or quarterly portfolio review, and whenever win/loss reasons change shape.',
  people: [
    { who: 'Product Manager', does: 'Owns the synthesis and the "so what".' },
    { who: 'Sales', does: 'Supplies live competitive intelligence and real loss reasons.' },
    { who: 'Marketing', does: 'Tracks positioning and category narrative.' },
    { who: 'Leadership', does: 'Uses it to allocate investment across the portfolio.' }
  ],
  inputs: ['Market reports and public data', 'Win/loss records', 'Customer interviews', 'Pricing observed in deals', 'Regulatory direction'],
  activities: ['Segment the market meaningfully, not demographically', 'Size the reachable part, not the total', 'Map alternatives including status quo and in-house', 'Identify structural forces and where they push', 'Convert into a where-to-play recommendation'],
  outputs: ['Segmentation with attractiveness criteria', 'Competitor and alternatives map', 'Sizing with stated assumptions', 'Where-to-play recommendation'],
  outcomes: ['Investment aimed at winnable ground', 'Positioning that reflects real alternatives', 'Earlier warning of structural change'],
  example: {
    title: 'Regulation as a market force',
    body: 'For a vehicle-data business the largest force is not a competitor but a regulation. The EU Data Act obliges data holders to make connected-product data available to users and, at the user\'s request, to third parties on fair, reasonable and non-discriminatory terms. That reshapes the market twice over: it lowers the barrier for competitors who could not previously get data, and it makes access itself less of a moat — so the defensible position moves towards standardisation, breadth across brands, contractual simplicity and reliability. A competitor analysis that only lists telematics vendors misses the thing that actually changes the game.'
  },
  mistakes: [
    { mistake: 'Sizing the total addressable market and stopping there.', instead: 'TAM is a slide. The number that matters is the segment you can reach with the channel you have.' },
    { mistake: 'Comparing feature checklists.', instead: 'Compare on the buyer\'s decision criteria — which are often contract, integration effort and trust, not features.' },
    { mistake: 'Excluding "build it ourselves" and "carry on as we are".', instead: 'In B2B these win more deals than any named vendor.' },
    { mistake: 'One-off analysis filed and forgotten.', instead: 'Keep a living view fed by win/loss; a static market map ages in months.' }
  ],
  tools: [
    { name: 'Porter\'s five forces', note: 'Useful for structural attractiveness; add regulation as a sixth in regulated markets.' },
    { name: 'PESTEL', note: 'Political, economic, social, technological, environmental, legal. Catches regulatory shifts.' },
    { name: 'Segmentation and screening matrix', note: 'Weighted criteria across candidate segments or countries.' },
    { name: 'Win/loss analysis', note: 'The most under-used and most reliable competitive input you have.' }
  ],
  check: {
    q: 'Your win/loss data shows you lose most often to "customer built it in-house". What does that most likely indicate?',
    options: [
      'Your product is technically weaker than competitors.',
      'Your price is too high relative to competitors.',
      'Your value proposition has not beaten the status quo — the buyer believes the problem is small enough or the build cheap enough to keep internally.',
      'You are targeting the wrong industry.'
    ],
    answer: 2,
    why: 'Losing to in-house is a proposition and total-cost problem, not a feature comparison. The counter is usually making the ongoing cost of maintaining an internal build visible, not adding capability.'
  },
  ownWords: 'For a market you know: name the three real alternatives a buyer chooses between, including doing nothing, and what tips them.',
  teachBack: {
    prompt: 'Explain why a regulatory change can matter more than a competitor launch, using a concrete example.',
    mustMention: ['regulation', 'barrier', 'alternative', 'position']
  },
  roleLink: { reqs: ['r5', 'i3'], text: 'You are asked to align with Sales on market needs. In this market the forces that move fastest are regulatory and partnership-driven — GIS has publicly announced fleet-data partnerships with telematics providers, which is a market strategy as much as a technical one.' },
  youLink: { evidence: ['e-zenhome', 'e-evidence-inputs'], text: 'The ZenHome France screening — ten criteria across three countries, France scoring 82 against 71 each for the United States and Germany — is a clean, defensible example of structured market screening that you personally built the evidence for.' },
  depends: ['strategy'],
  glossary: ['tam-sam-som', 'segmentation', 'pestel', 'win-loss', 'status-quo-bias']
},

{
  id: 'experimentation', module: 'm2', order: 8, minutes: 10,
  title: 'Experimentation and validation',
  oneLine: 'Designing a test whose result you have agreed, in advance, will change what you do.',
  definition: 'Validation is the deliberate reduction of uncertainty about a specific belief. An experiment states the belief, the measure, the threshold and the decision attached to each outcome, before it runs. Methods range from a conversation and a fake door to a bounded pilot or a controlled A/B test — the method follows the risk and the cost of being wrong, not fashion.',
  why: 'Untested beliefs become requirements, and requirements become commitments. Pre-committing to a decision rule is what stops a result being reinterpreted to justify what the team already wanted. In B2B, where sample sizes are small and A/B tests are often impossible, the discipline matters more, not less.',
  when: 'Whenever a belief is both uncertain and consequential. Before committing engineering capacity, before a launch, and after launch to check the outcome actually moved.',
  people: [
    { who: 'Product Manager', does: 'Writes the hypothesis and the decision rule; resists moving the threshold afterwards.' },
    { who: 'Data analyst', does: 'Designs the measure and warns where the data cannot support the claim.' },
    { who: 'Engineering', does: 'Builds the smallest thing that can produce a real signal.' },
    { who: 'Legal / privacy', does: 'Confirms the experiment itself is permissible — with real customer data this is not a formality.' }
  ],
  inputs: ['A specific belief', 'Baseline measure', 'Access to participants or traffic', 'Agreed threshold and decision rule'],
  activities: ['Write the hypothesis and success criterion', 'Choose the cheapest method that produces a real signal', 'Run it without changing the rules mid-flight', 'Interpret honestly, including "inconclusive"', 'Record the decision and the evidence behind it'],
  outputs: ['Hypothesis and decision rule', 'Result with confidence and caveats', 'Decision: proceed, adjust, stop', 'Updated assumption register'],
  outcomes: ['Fewer expensive commitments to untested beliefs', 'A team that can change its mind without losing face', 'A traceable record of why decisions were made'],
  example: {
    title: 'A bounded pilot when A/B is impossible',
    body: 'You cannot randomise fleet customers into two versions of a contract. So the validation is a bounded pilot: three fleet operators, one quarter, a defined data scope, agreed in advance that the product proceeds only if at least two of the three integrate within six weeks and use the endpoint weekly by week ten. Integration speed is the real risk — B2B products die in integration far more often than in interest. Note what makes it an experiment rather than a trial: the threshold and the consequence were written down before the first customer said yes.'
  },
  mistakes: [
    { mistake: 'Deciding what the result means after seeing it.', instead: 'Write the decision rule first. This single habit separates validation from theatre.' },
    { mistake: 'Calling a pilot with your friendliest customer "validation".', instead: 'A friendly customer validates goodwill. Choose participants who could plausibly say no.' },
    { mistake: 'Running an A/B test with a sample that cannot reach significance.', instead: 'In small-N B2B, prefer qualitative depth and pre-committed qualitative criteria over underpowered statistics.' },
    { mistake: 'Treating "inconclusive" as failure.', instead: 'It is a legitimate and common result. It should trigger a better test, not a decision.' }
  ],
  tools: [
    { name: 'Hypothesis statement', note: 'We believe [X]. We will know we are right when [measure] passes [threshold]. If it does not, we will [action].' },
    { name: 'Fake door / smoke test', note: 'Measures intent cheaply; be careful about doing it to enterprise buyers you need to trust you.' },
    { name: 'Bounded pilot', note: 'The main B2B validation instrument. Bound scope, participants, duration and exit.' },
    { name: 'A/B test', note: 'Powerful where traffic allows. Rarely available at enterprise-contract level.' },
    { name: 'Wizard of Oz', note: 'Deliver the outcome manually before building the automation.' }
  ],
  check: {
    q: 'What most reliably distinguishes an experiment from a trial run?',
    options: [
      'It uses statistical significance testing.',
      'The measure, threshold and resulting decision are agreed before it starts.',
      'It involves real customers rather than internal users.',
      'It has a fixed time box.'
    ],
    answer: 1,
    why: 'Statistics, real customers and time boxes are all useful, but only the pre-committed decision rule prevents the result being reinterpreted to fit what the team already wanted.'
  },
  ownWords: 'Write a hypothesis for something you currently believe about a product, in the form: we believe X; we will know when Y passes Z; if it does not, we will do W.',
  teachBack: {
    prompt: 'Explain to a stakeholder who wants to "just build it and see" why setting the decision rule in advance is not bureaucracy.',
    mustMention: ['threshold', 'decision', 'bias', 'evidence']
  },
  roleLink: { reqs: ['r1', 'r6'], text: 'Validation is a named DUP phase. In a data business the first thing to validate is usually permission, then integration effort — both are cheap to test and both routinely kill products late when they are not.' },
  youLink: { evidence: ['e-method-criteria', 'e-mcy', 'e-solarmotion'], text: 'This is one of your genuine strengths and you should say so. "Define the question, the measure and the result that would change direction" is your own stated principle, and your MCY Logistics work put four validation gates in front of any service agreement.' },
  depends: ['discovery'],
  glossary: ['hypothesis', 'ab-test', 'fake-door', 'pilot', 'decision-rule']
},

{
  id: 'prioritisation', module: 'm3', order: 9, minutes: 12,
  title: 'Prioritisation frameworks',
  oneLine: 'Making the trade-off explicit, so the decision is about criteria rather than about who asked.',
  definition: 'Prioritisation is choosing sequence under constraint. Frameworks — RICE, WSJF, MoSCoW, Kano, cost of delay, opportunity scoring — are not calculators that produce the answer. They are instruments that force the inputs into the open and make a decision reviewable. The number a framework produces is far less valuable than the argument it provokes about the inputs.',
  why: 'Everything cannot be first. Without an explicit method, sequence is decided by proximity to power, recency, or whoever escalates. With one, you can defend a decision months later and change it when an input changes rather than when a mood changes.',
  when: 'Every planning cycle, at every intake of new requests, and whenever a large commercial request threatens the sequence.',
  people: [
    { who: 'Product Manager', does: 'Owns the method, the inputs and the resulting sequence.' },
    { who: 'Engineering', does: 'Supplies effort and reveals dependency and technical risk.' },
    { who: 'Sales and commercial', does: 'Supply reach, revenue exposure and deal timing.' },
    { who: 'Leadership', does: 'Arbitrates when the trade-off is above the PM\'s decision right.' },
    { who: 'Legal and compliance', does: 'Impose non-negotiables that sit outside the scoring entirely.' }
  ],
  inputs: ['Candidate items with a stated problem each', 'Reach, impact, effort estimates', 'Strategic fit', 'Dependencies and deadlines', 'Regulatory obligations'],
  activities: ['Normalise items to comparable size', 'Score against agreed criteria', 'Separate must-do compliance work from discretionary work', 'Sequence with dependencies applied', 'Publish the rationale, not only the order'],
  outputs: ['Ranked backlog or roadmap sequence', 'Decision log', 'Explicit "not now" list with reasons'],
  outcomes: ['Faster, calmer planning', 'Requests declined without damage to the relationship', 'A sequence that can be re-derived if inputs change'],
  example: {
    title: 'When the biggest deal is not the top priority',
    body: 'Four candidates: (1) a bespoke field for one large insurer, (2) a data-freshness improvement affecting all partners, (3) an EU Data Act access obligation, (4) a self-service status page. Item 3 is not scored at all — regulatory obligations are a constraint, not a candidate; scoring them invites the wrong conversation. Item 1 has high revenue but reach of one and creates a schema variant that raises the cost of every future change; RICE handles the reach but not the compounding maintenance cost, so you add it explicitly. Item 2 has low visibility and high reach. Item 4 reduces support load, which is real capacity. The framework will probably rank 2 above 1 — and the value of the exercise is that the insurer conversation now happens with a visible trade-off rather than as a refusal.'
  },
  mistakes: [
    { mistake: 'Scoring compliance and legal obligations alongside features.', instead: 'Take them out of the scoring as constraints. They consume capacity before prioritisation starts.' },
    { mistake: 'Hiding a judgement inside a number.', instead: 'The framework should expose the judgement, not disguise it. Publish the inputs.' },
    { mistake: 'Comparing items of wildly different sizes.', instead: 'Normalise first, or you are comparing a quarter to an afternoon.' },
    { mistake: 'Ignoring the compounding cost of bespoke work.', instead: 'A one-customer variant taxes every future change. Price that in explicitly.' },
    { mistake: 'Changing the framework whenever the answer is unwelcome.', instead: 'Change the inputs if they are wrong. Changing the method to get a desired answer destroys the instrument.' }
  ],
  tools: [
    { name: 'RICE', note: 'Reach × Impact × Confidence ÷ Effort. Best when reach is genuinely knowable.' },
    { name: 'WSJF', note: 'Cost of delay ÷ job size. Strong when timing matters — regulatory deadlines, deal windows.' },
    { name: 'MoSCoW', note: 'Must, Should, Could, Won\'t. Good for a fixed-date scope negotiation; weak as a backlog method.' },
    { name: 'Kano', note: 'Separates basic expectations from performance and delight. Useful for feature-set design.' },
    { name: 'Opportunity scoring', note: 'Importance minus satisfaction. Finds under-served needs.' },
    { name: 'Cost of delay', note: 'The most persuasive language for a commercial audience.' }
  ],
  check: {
    q: 'An EU regulatory obligation with a fixed compliance date arrives in your intake. How should it enter prioritisation?',
    options: [
      'Score it with RICE like everything else and let the number decide.',
      'Treat it as a constraint that consumes capacity before discretionary items are scored, then prioritise what remains.',
      'Give it maximum impact and confidence so it ranks first.',
      'Handle it in a separate compliance workstream that does not affect the roadmap.'
    ],
    answer: 1,
    why: 'Obligations are not options. Scoring them pretends there is a choice; inflating scores corrupts the instrument; a separate workstream that does not reduce roadmap capacity is a fiction, because the same people do the work.'
  },
  ownWords: 'Describe how you actually sequence work today, and name the input you most often find people leave out of the conversation.',
  teachBack: {
    prompt: 'Explain to a sales director why their largest prospect\'s request is third in the sequence — using criteria, not apology.',
    mustMention: ['reach', 'cost of delay', 'trade-off', 'criteria']
  },
  roleLink: { reqs: ['r5', 'r2'], text: '"Collaborate closely with Sales to align on market needs, feature prioritization" — the word "align" is doing heavy lifting there. Aligning means Sales understands and can defend the sequence, not that they approve each item.' },
  youLink: { evidence: ['e-rolebeforethreshold', 'e-pricingpassthrough', 'e-evidence-inputs'], text: 'Both of your named portfolio rules are prioritisation discipline: judge by role rather than a uniform threshold, and differentiate a cost response by role rather than applying one percentage to everything. Both are arguments against the lazy uniform rule — which is exactly the instinct a prioritisation framework has to defeat.' },
  depends: ['strategy', 'problem'],
  glossary: ['rice', 'wsjf', 'moscow', 'kano', 'cost-of-delay', 'capacity']
},

{
  id: 'roadmap', module: 'm3', order: 10, minutes: 11,
  title: 'Product roadmaps',
  oneLine: 'A communication instrument showing what you intend to achieve, in what order, and how sure you are.',
  definition: 'A roadmap expresses intent over time. A good one is organised around outcomes or problems rather than features, carries explicit confidence that decreases with distance, and states its assumptions. Different audiences need different views of the same roadmap: an executive needs outcomes and bets, a delivery team needs the next increment, a customer needs directional themes without dates you cannot honour.',
  why: 'The roadmap is where strategy becomes visible to everyone else. Its failure mode is being read as a commitment schedule. Managed well it aligns; managed badly it converts every change into a broken promise, which teaches teams to pad and hide.',
  when: 'Maintained continuously, reviewed at each planning cycle, re-cut per audience, and revised whenever a bet resolves.',
  people: [
    { who: 'Product Manager', does: 'Owns the roadmap and the honesty of its confidence levels.' },
    { who: 'Leadership', does: 'Confirms it serves portfolio goals.' },
    { who: 'Delivery team', does: 'Grounds the near horizon in real capacity.' },
    { who: 'Sales', does: 'Uses the customer-safe view; must not be handed the internal one.' },
    { who: 'Operations and support', does: 'Need lead time for what is coming into their world.' }
  ],
  inputs: ['Strategy and portfolio goals', 'Prioritised opportunities', 'Capacity and dependency reality', 'Fixed external dates: regulatory, contractual, seasonal'],
  activities: ['Group work by outcome or theme', 'Set horizons with declining precision', 'Attach confidence and assumptions', 'Cut audience-appropriate views', 'Review and re-communicate on change'],
  outputs: ['Now / next / later or three-horizon roadmap', 'Outcome statements per item', 'Confidence and assumption notes', 'Customer-safe external view'],
  outcomes: ['Aligned expectations across functions', 'Change absorbed as learning rather than failure', 'Sales able to set expectations without over-promising'],
  example: {
    title: 'Two views of the same quarter',
    body: 'Internal view: "Now — reduce partner integration time from four weeks to under two (confidence high). Next — battery-health endpoint for leasing remarketing, subject to consent model confirmation (confidence medium; assumption: existing consent covers the field). Later — insurance risk-scoring exploration (confidence low, a bet)." External view for a customer QBR: "We are investing in faster integration, expanding electric-vehicle condition data, and exploring insurance use cases." No dates, no dependency on an unresolved consent question, nothing a customer could hold you to. Both are honest; the difference is what a reader can reasonably conclude.'
  },
  mistakes: [
    { mistake: 'A feature list with quarters attached.', instead: 'Lead with the outcome. Features are how, and how changes.' },
    { mistake: 'Uniform confidence across all horizons.', instead: 'Precision should decay with distance. A confident twelve-month item is usually a fiction.' },
    { mistake: 'Handing the internal roadmap to Sales or customers.', instead: 'Cut a view per audience. Internal nuance becomes external promise the moment it leaves the building.' },
    { mistake: 'Never revising it, to avoid looking indecisive.', instead: 'An unrevised roadmap means either nothing was learned or the learning is being hidden.' }
  ],
  tools: [
    { name: 'Now / Next / Later', note: 'The simplest honest format. Removes false date precision.' },
    { name: 'Outcome-based roadmap', note: 'Rows are outcomes with measures; features sit underneath.' },
    { name: 'Three horizons', note: 'Core, adjacent, transformational. Useful for portfolio balance.' },
    { name: 'Confidence bands', note: 'Committed / planned / exploring. One word that prevents most roadmap arguments.' }
  ],
  check: {
    q: 'Sales asks for the internal roadmap to share with a prospect who is deciding this month. Best response?',
    options: [
      'Share it — transparency builds trust with the prospect.',
      'Refuse; roadmaps are internal.',
      'Provide a customer-safe view with directional themes and confidence language, and offer to join the call to answer specifics under an agreed boundary.',
      'Share only the "Now" column, since that is already committed.'
    ],
    answer: 2,
    why: 'Refusing damages a relationship you need daily; sharing the internal view converts medium-confidence items into promises. A cut view plus your presence gives the prospect substance without creating commitments you did not make.'
  },
  ownWords: 'Sketch a Now / Next / Later roadmap for a product you know, and write the assumption that most threatens the "Next" column.',
  teachBack: {
    prompt: 'Explain the difference between a roadmap and a delivery plan to someone who wants dates for everything.',
    mustMention: ['confidence', 'outcome', 'commitment', 'horizon']
  },
  roleLink: { reqs: ['r2', 'r5'], text: 'The ad pairs roadmaps with backlogs and visions in one sentence, then separately asks you to align with Sales on go-to-market readiness. Those two demands meet in the roadmap — and the customer-safe view is the artefact that keeps them from colliding.' },
  youLink: { evidence: ['e-evidence-inputs', 'e-lifecycle'], text: 'Your CV describes producing evidence-based inputs for prioritisation and portfolio evolution, and your portfolio speaks of roadmap recommendations. Be precise in interview about the boundary: you produce and argue the sequence; name who signs it today, and say plainly that you are ready to own it.' },
  depends: ['prioritisation', 'strategy'],
  glossary: ['roadmap', 'now-next-later', 'horizon', 'confidence-band', 'outcome']
},

{
  id: 'backlog', module: 'm3', order: 11, minutes: 9,
  title: 'Backlog management',
  oneLine: 'Keeping an ordered, understood, appropriately-detailed list of what the team will do next.',
  definition: 'A product backlog is the single ordered source of work for a team. It is ordered, not categorised: exactly one item is next. Detail is graded — items near the top are refined enough to start, items far down are one line. Refinement is the continuous activity that moves items up that gradient. A backlog is a live artefact, and a healthy one shrinks as often as it grows.',
  why: 'It is where strategy becomes executable. It is also where strategy quietly dies: a backlog that accumulates every request, never deletes, and orders by date received will produce a team that is busy and a product that goes nowhere.',
  when: 'Continuously. Formally at refinement sessions and sprint or iteration planning.',
  people: [
    { who: 'Product Owner / Product Manager', does: 'Owns content and order. This decision right is not shared.' },
    { who: 'Development team', does: 'Owns estimates, breaks items down, raises technical dependencies.' },
    { who: 'Stakeholders', does: 'Propose items and argue for them; they do not reorder the backlog.' },
    { who: 'Scrum Master / delivery lead', does: 'Protects the process and the refinement rhythm.' }
  ],
  inputs: ['Prioritised opportunities and problems', 'Defects and technical debt', 'Compliance and operational obligations', 'Team capacity and velocity'],
  activities: ['Refine top items to ready state', 'Split items too large to start', 'Order by value, risk, dependency and cost of delay', 'Delete items that will never be done', 'Keep acceptance criteria current'],
  outputs: ['Ordered backlog', 'Ready items for the next iteration', 'Definition of Ready and Definition of Done', 'A visible "won\'t do" record'],
  outcomes: ['Teams start work without ambiguity', 'Less rework from unclear items', 'Fewer stale commitments haunting planning'],
  example: {
    title: 'Deleting is backlog management',
    body: 'A backlog with 340 items is not a plan; it is a filing cabinet of good intentions. Anything below roughly two or three iterations of capacity will not be worked in a recognisable form — by the time it surfaces, the context has changed and it needs rewriting anyway. Deleting the bottom 200, with a note of where the ideas came from, costs nothing real and removes the illusion of commitment. The valuable objection — "but we promised that customer" — is the point: if it was promised, it belongs near the top or it needs an honest conversation, and the backlog was hiding both options.'
  },
  mistakes: [
    { mistake: 'Using the backlog as an idea graveyard.', instead: 'Keep ideas somewhere else. A backlog is work you intend to do.' },
    { mistake: 'Refining everything to the same depth.', instead: 'Detail decays with distance from the top. Refining item 200 is waste.' },
    { mistake: 'Letting stakeholders reorder directly.', instead: 'They argue; you order. Blur this and you have several backlogs pretending to be one.' },
    { mistake: 'No Definition of Ready, so sprints start with unanswered questions.', instead: 'Agree what "startable" means and enforce it.' }
  ],
  tools: [
    { name: 'DEEP', note: 'Detailed appropriately, Estimated, Emergent, Prioritised. A quick health check.' },
    { name: 'Definition of Ready / Done', note: 'Two short agreements that prevent most delivery arguments.' },
    { name: 'Story splitting patterns', note: 'By workflow step, by data variation, by rule, by interface, by effort.' },
    { name: 'Refinement session', note: 'A standing slot, not an emergency. Roughly 10% of team capacity.' }
  ],
  check: {
    q: 'Your backlog has 340 items and refinement keeps overrunning. What is the highest-value first move?',
    options: [
      'Add a second weekly refinement session.',
      'Estimate everything so the size of the problem is visible.',
      'Delete or archive everything below a realistic capacity horizon, then refine only the top band to ready.',
      'Split the backlog by stakeholder so each has their own.'
    ],
    answer: 2,
    why: 'More refinement on items that will never be built is more waste. Splitting by stakeholder destroys the single order that makes a backlog useful. Cutting to a real horizon restores both.'
  },
  ownWords: 'Write your own Definition of Ready in five bullet points for a team building a data product.',
  teachBack: {
    prompt: 'Explain why a backlog must have exactly one order, to a stakeholder who wants their own priority list maintained.',
    mustMention: ['order', 'single', 'capacity', 'trade-off']
  },
  roleLink: { reqs: ['r2', 'r10'], text: 'Backlogs are named directly in the ad, and "Agile and delivery competencies" is a listed requirement. Expect a question about how you run refinement and how you handle an item the team cannot estimate.' },
  youLink: { evidence: ['e-agile', 'e-app-built'], text: 'Backlog prioritisation, user stories and acceptance criteria are named competencies on your CV. Your CV says "sprint support" — prepare for that being probed, and answer with what you concretely do in refinement rather than with the job title.' },
  depends: ['prioritisation'],
  glossary: ['backlog', 'refinement', 'definition-of-ready', 'definition-of-done', 'deep']
},

{
  id: 'requirements', module: 'm3', order: 12, minutes: 12,
  title: 'Requirements and user stories',
  oneLine: 'Writing down what must be true for the product to be right — precisely enough to build, test and dispute.',
  definition: 'A requirement states a needed capability or constraint. A user story is one common format — as a [role], I want [capability], so that [outcome] — whose real content is its acceptance criteria: the conditions under which the story is done. Requirements come in families: functional, technical, legal, privacy, commercial, brand, operational. Non-functional requirements — latency, availability, freshness, security — are usually the ones that decide whether a B2B product succeeds.',
  why: 'Ambiguous requirements are paid for twice: once in building the wrong thing and once in rebuilding it. Written acceptance criteria also convert taste arguments into testable statements, which is how a PM ends a debate without pulling rank.',
  when: 'During definition, refined continuously through refinement, and revisited whenever a constraint changes.',
  people: [
    { who: 'Product Manager', does: 'Owns the what and the why, and gathers requirements across every family.' },
    { who: 'Engineering / data engineering', does: 'Owns the how; challenges feasibility and cost.' },
    { who: 'QA', does: 'Turns acceptance criteria into tests and finds the ambiguity first.' },
    { who: 'Legal and privacy', does: 'Supply binding requirements that are not negotiable by the team.' },
    { who: 'Brand and marketing', does: 'Constrain naming, presentation and permitted use of brand data.' },
    { who: 'Operations', does: 'Supply the supportability requirements everyone forgets.' }
  ],
  inputs: ['Problem statement and desired outcome', 'Research findings', 'Technical and data constraints', 'Regulatory and contractual obligations', 'Existing system behaviour'],
  activities: ['Gather across all requirement families deliberately', 'Write stories with testable acceptance criteria', 'Specify non-functional requirements explicitly', 'Resolve conflicts between families', 'Get sign-off from the owners of binding constraints'],
  outputs: ['User stories with acceptance criteria', 'Non-functional requirement set', 'Interface or data contract', 'Traceability from requirement to obligation'],
  outcomes: ['Less rework', 'Testable definitions of done', 'Compliance evidence that exists before it is demanded'],
  example: {
    title: 'The five families on one endpoint',
    body: 'A single endpoint returning vehicle state of charge carries: a functional requirement (return current state of charge for a given VIN); technical ones (99.5% availability, p95 under 400ms, data no older than 15 minutes, versioned schema, documented error codes, rate limit per partner); a legal one (only for VINs inside the contracted fleet, with the contract\'s use-case scope enforced); a privacy one (state of charge combined with location may constitute personal data — purpose limitation applies and retention is bounded); a commercial one (metered per call with an agreed monthly allowance); and a brand one (some brands restrict how their vehicle data may be attributed in a partner\'s interface). Miss the privacy one and the product is illegal. Miss the operational ones and it is unsupportable. The functional requirement was the easy part.'
  },
  mistakes: [
    { mistake: 'Acceptance criteria that restate the story.', instead: 'Write conditions a tester could pass or fail without asking you.' },
    { mistake: 'Leaving non-functional requirements implicit.', instead: 'Latency, freshness, availability and error behaviour are the product in a data business. Write them down.' },
    { mistake: 'Specifying the solution instead of the need.', instead: 'State the constraint and the outcome; let engineering choose the mechanism.' },
    { mistake: 'Gathering only from the loudest requirement family.', instead: 'Walk all five or six deliberately. The missing family is usually privacy or operations.' },
    { mistake: '"The system should be fast."', instead: 'p95 latency under 400ms at 50 requests per second. Testable, or it is not a requirement.' }
  ],
  tools: [
    { name: 'User story + acceptance criteria', note: 'The story is the placeholder; the criteria are the requirement.' },
    { name: 'Given / When / Then', note: 'Forces preconditions and observable outcomes into the open.' },
    { name: 'INVEST', note: 'Independent, Negotiable, Valuable, Estimable, Small, Testable.' },
    { name: 'Job story', note: 'When [situation], I want [motivation], so I can [outcome]. Better when the persona is not the point.' },
    { name: 'Data contract', note: 'Schema, semantics, freshness, quality thresholds, versioning policy, breaking-change process.' }
  ],
  check: {
    q: 'Which acceptance criterion is actually testable?',
    options: [
      'The endpoint should respond quickly under normal load.',
      'Given a VIN within the contracted fleet, when the partner calls /battery with a valid token, then the response returns state of charge with a timestamp no older than 15 minutes, at p95 latency under 400ms at 50 requests per second.',
      'The API must be reliable and easy to integrate.',
      'Partners should be able to retrieve battery data without difficulty.'
    ],
    answer: 1,
    why: 'Only B states preconditions, action, observable output and measurable thresholds. The others are intentions — QA cannot pass or fail them without asking someone.'
  },
  ownWords: 'Write one user story with three acceptance criteria for a data product, including at least one non-functional and one privacy criterion.',
  teachBack: {
    prompt: 'Explain to an engineer why you are specifying data freshness and error semantics rather than leaving them to implementation.',
    mustMention: ['non-functional', 'testable', 'contract', 'expectation']
  },
  roleLink: { reqs: ['r3', 'i5'], text: 'The ad names the families explicitly: "technical, legal, privacy, commercial, brand." That list is unusual and deliberate — read it as a description of who has to sign before anything ships, and treat it as your requirements checklist.' },
  youLink: { evidence: ['e-requirements', 'e-compliance', 'e-app-decisions'], text: 'You translate business needs and operational constraints into product requirements today, and you coordinate the documentation families that gate market access. On the pricing app you made accessibility a release criterion — that is a non-functional requirement enforced as a gate, which is exactly the habit this role needs.' },
  depends: ['problem', 'backlog'],
  glossary: ['user-story', 'acceptance-criteria', 'nfr', 'given-when-then', 'invest', 'data-contract']
}
];
