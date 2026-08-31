/* Module 1 — Foundations, and Module 2 — Discovery & evidence */
export default [
{
  id: 'strategy', module: 'm1', order: 1, minutes: 12,
  title: 'Product strategy and vision',
  oneLine: 'The choice of which customers you will serve, which problem you will solve for them, and what you will deliberately not do.',
  definition: 'A product vision is the future state you are trying to create — usually a horizon of two to five years, deliberately stable. A product strategy is the sequence of choices that gets you there from where you are today: which segment first, which problem first, which capability you build before the others, and what you refuse. Strategy is not a list of features and it is not a set of goals. Goals say how much; strategy says which way.',
  why: 'Without a stated strategy, prioritisation collapses into whoever asked most recently or most loudly. With one, you can say no in a way that survives the meeting, because the no follows from a choice everyone already agreed to. In a B2B data business this matters more than usual: every large customer will ask for something bespoke, and without strategy each request looks individually reasonable.',
  when: 'Written or revisited when a portfolio direction is set, when a market shifts, when a funding cycle opens, or when the team keeps re-litigating the same decision. Reviewed quarterly; rewritten rarely. Referenced constantly.',
  people: [
    { who: 'Product Manager', does: 'Drafts it, tests it against evidence, keeps it honest and legible.' },
    { who: 'Portfolio or product leadership', does: 'Sets the goals the strategy must serve; approves the trade-offs.' },
    { who: 'Sales and commercial', does: 'Supplies the market reality that either supports or breaks the strategy.' },
    { who: 'Engineering and data', does: 'Says what is buildable in what order, and what a choice costs later.' },
    { who: 'Legal, privacy, brand', does: 'Bound the space of strategies that are permissible at all.' }
  ],
  inputs: ['Portfolio goals', 'Market and competitor evidence', 'Customer problems ranked by pain and value', 'Technical and data constraints', 'Regulatory boundaries'],
  activities: ['Segment and choose a beachhead', 'Name the problem worth solving first', 'State the winning aspiration and the explicit non-goals', 'Test the strategy against the hardest counter-example', 'Socialise until people can repeat it without the slide'],
  outputs: ['Vision statement', 'Strategy one-pager: choices, non-goals, sequence', 'Positioning statement', 'Strategic bets with review dates'],
  outcomes: ['Prioritisation arguments end faster', 'Fewer bespoke commitments', 'Teams can make local decisions that still add up'],
  example: {
    title: 'A vehicle-data strategy that says no',
    body: 'A hub selling standardised multi-brand vehicle data can serve fleets, insurers, workshops and mobility apps. All four are real. A strategy picks one to win first — say fleet operators, because they buy on measurable operating cost, integrate through existing telematics platforms, and need no consumer-facing consent flow. The vision might be: every commercial fleet running Group vehicles can see the health and use of every vehicle without installing hardware. The explicit non-goals then follow: no consumer-facing app, no insurance risk-scoring product this year, no per-customer schema variations. When an insurer arrives with a large deal that needs driving-behaviour data and a new consent flow, the strategy does not forbid the conversation — it makes the cost of saying yes visible and the decision a leadership one rather than a PM one.'
  },
  mistakes: [
    { mistake: 'Calling a roadmap a strategy.', instead: 'A roadmap is what strategy produces. If your strategy document lists dates and features, you have not written one yet.' },
    { mistake: 'A vision so broad it excludes nothing ("be the leading platform for mobility data").', instead: 'Write a vision whose opposite a reasonable competitor might actually choose. If nobody could disagree, it is not a choice.' },
    { mistake: 'Omitting non-goals to keep everyone comfortable.', instead: 'The non-goals are the load-bearing part. Without them the strategy cannot refuse anything.' },
    { mistake: 'Treating strategy as a one-off document.', instead: 'Attach review triggers: what evidence would change this? Strategy without a falsifier is a wish.' }
  ],
  tools: [
    { name: 'Playing to Win cascade', note: 'Winning aspiration → where to play → how to win → capabilities → management systems. Five questions, in order.' },
    { name: 'Product vision board', note: 'Target group, needs, product, business goals on one page.' },
    { name: 'Strategy one-pager', note: 'Diagnosis, guiding policy, coherent actions — Rumelt\'s kernel. Shortest useful format.' },
    { name: 'Positioning statement', note: 'For [segment] who [need], our product is [category] that [benefit], unlike [alternative].' }
  ],
  check: {
    q: 'A leadership team asks you to add "expand into insurance" to a strategy that currently names fleet operators as the beachhead. What is the most product-strategic response?',
    options: [
      'Add it to the roadmap for next quarter to show responsiveness.',
      'Refuse, because the strategy has already been agreed.',
      'Show what winning in insurance would require — consent flows, risk-scoring capability, a different buyer — and ask leadership to decide whether that replaces or delays the fleet beachhead.',
      'Run a discovery sprint on insurance before responding.'
    ],
    answer: 2,
    why: 'Strategy work is making the cost of a choice visible so the right person can decide. Option A hides the trade-off, B mistakes strategy for a contract, and D defers a decision that is about resource allocation, not evidence.'
  },
  ownWords: 'In your own words: what is the difference between your product vision and your product strategy? Then write the single non-goal you would most want a team to remember.',
  teachBack: {
    prompt: 'Explain to a sales colleague, in under 90 seconds, why the strategy stops you from building what their biggest prospect asked for — without sounding like you are protecting a document.',
    mustMention: ['non-goal', 'trade-off', 'segment', 'cost']
  },
  roleLink: { reqs: ['r2', 'r1'], text: 'The ad asks you to "translate strategic portfolio goals into concrete product visions, backlogs, and roadmaps." That sentence is exactly this concept: goals arrive from above, and you turn them into a stated direction a team can build against.' },
  youLink: { evidence: ['e-rolebeforethreshold', 'e-method-outcome'], text: '"Role before threshold" is a strategy statement in miniature — it says which evidence is allowed to drive a portfolio decision and which is not. And "protect the outcome; adapt the route" is the discipline that keeps a strategy stable while the plan moves.' },
  depends: [],
  glossary: ['vision', 'strategy', 'beachhead', 'non-goal', 'positioning']
},

{
  id: 'problem', module: 'm1', order: 2, minutes: 10,
  title: 'Problem definition',
  oneLine: 'Stating what is wrong, for whom, how often, and what it costs — before anyone proposes a solution.',
  definition: 'A problem statement names an affected group, the situation they are in, the outcome they cannot reach, the evidence that it is real, and the cost of leaving it alone. It contains no solution. Its purpose is to make the problem arguable: a well-framed problem can be challenged on its facts, whereas a solution disguised as a problem ("we need a dashboard") can only be argued about on taste.',
  why: 'Most wasted product effort is not bad building — it is competent building against a problem nobody checked. A shared problem statement also widens the solution space: three teams given "reduce the time a pricing decision takes to reach the system" will produce better options than three teams given "build a pricing tool".',
  when: 'At the front of discovery, before any solution work. Again whenever a request arrives as a solution. Again when a team is stuck, because being stuck usually means the problem drifted.',
  people: [
    { who: 'Product Manager', does: 'Writes it, and refuses to move on until it is falsifiable.' },
    { who: 'Users and internal operators', does: 'Supply the situation and its real frequency and cost.' },
    { who: 'Sales / customer-facing teams', does: 'Bring the version of the problem the customer articulates, which is usually a solution.' },
    { who: 'Data and analytics', does: 'Turn "it happens a lot" into how often, to whom, at what cost.' }
  ],
  inputs: ['Requests and complaints', 'Observation of real work', 'Usage and performance data', 'Support and incident records', 'Lost-deal reasons'],
  activities: ['Separate symptom from cause', 'Quantify frequency and cost', 'Identify who actually suffers and who merely notices', 'Ask why until the answer stops changing', 'Write the statement and get it challenged'],
  outputs: ['Problem statement', 'Evidence summary with confidence levels', 'Explicit list of what is still assumed', 'Success criteria that would mean it is solved'],
  outcomes: ['Solutions compete on merit rather than seniority', 'Discovery has a stopping condition', 'Teams stop building requested features that do not move anything'],
  example: {
    title: 'The request was a solution',
    body: 'A partner integration team asks for "an alert when data stops flowing." Framed as a problem instead: fleet operators integrating our API discover a broken vehicle feed only when a customer reports missing mileage, on average several days later; this happened eleven times last quarter across four partners and produced two contractual escalations. The cost is trust and support time. Now the solution space opens: alerting is one option, but so is a freshness field in the payload, a status endpoint partners can poll, or a health page. Three of those are cheaper than the request. None of them would have been considered if the ticket had stayed as "build an alert".'
  },
  mistakes: [
    { mistake: 'Writing the solution into the problem ("users need a filter").', instead: 'Ask what the filter would let them accomplish, then state that.' },
    { mistake: 'Accepting "customers keep asking" as evidence.', instead: 'How many, in what context, and what did they do when they did not get it? Asking is cheap.' },
    { mistake: 'Framing the problem at whatever level the requester chose.', instead: 'Move one level up and one level down, and see which framing produces the better options.' },
    { mistake: 'Omitting the cost of doing nothing.', instead: 'Without it you cannot prioritise this against anything else.' }
  ],
  tools: [
    { name: 'Five whys', note: 'Blunt but effective for separating symptom from cause. Stop when the answer stops changing.' },
    { name: 'Jobs to be Done', note: 'When [situation], I want to [motivation], so I can [expected outcome].' },
    { name: 'Problem framing canvas', note: 'Who, situation, current behaviour, cost, evidence, assumption, success signal.' },
    { name: 'Opportunity solution tree', note: 'Keeps the outcome at the root so problems and solutions stay separate.' }
  ],
  check: {
    q: 'Which of these is a usable problem statement?',
    options: [
      'Fleet customers need a battery-health dashboard.',
      'Fleet managers cannot tell which vehicles are degrading until a driver reports reduced range; this affected 14% of the electric fleet last quarter and produced unplanned downtime we currently do not measure.',
      'We are behind competitors on electric-vehicle features.',
      'Battery health is the most requested feature in our last three quarterly business reviews.'
    ],
    answer: 1,
    why: 'B names who, the situation, the failure, a measured frequency, and it admits what is not yet measured. A is a solution; C is a comparison; D is a request count, which measures asking, not cost.'
  },
  ownWords: 'Take a request you have received recently that arrived as a solution. Rewrite it as a problem statement: who, situation, unreachable outcome, evidence, cost of inaction.',
  teachBack: {
    prompt: 'Explain why "customers keep asking for it" is weak evidence — to someone who finds that dismissive.',
    mustMention: ['cost', 'frequency', 'evidence', 'assumption']
  },
  roleLink: { reqs: ['r3', 'r1'], text: 'Ideation and definition are the first two DUP phases named in the ad. Definition is where a request becomes a problem statement with technical, legal, privacy, commercial and brand requirements hanging off it.' },
  youLink: { evidence: ['e-app-problem', 'e-method-systemview'], text: 'Your pricing-app case study is a textbook reframe: the request could have been "a better spreadsheet", and you framed it as a fragmented handoff creating preventable risk, with three named cost areas. That reframing is what made the eventual solution obvious.' },
  depends: ['strategy'],
  glossary: ['problem-statement', 'jtbd', 'root-cause', 'opportunity']
},

{
  id: 'valueprop', module: 'm1', order: 3, minutes: 9,
  title: 'Value propositions',
  oneLine: 'A specific promise: for this customer, this gain or this pain relief, better than their current alternative.',
  definition: 'A value proposition connects a customer segment\'s jobs, pains and gains to what your product actually does about them. It is only meaningful relative to an alternative — including the alternative of doing nothing, which is the most common competitor in B2B. In a data business the proposition is rarely the data itself; it is the decision the data makes possible and the cost it removes.',
  why: 'It is the bridge between discovery and go-to-market. Sales cannot sell what is not articulated, and a proposition that cannot be stated in one sentence usually means the product is solving several problems weakly. It is also a prioritisation tool: features that do not strengthen the proposition are decoration.',
  when: 'Drafted during definition, tested during validation, sharpened at launch, and revisited whenever win/loss reasons shift.',
  people: [
    { who: 'Product Manager', does: 'Owns the proposition and keeps it evidence-based.' },
    { who: 'Sales', does: 'Tests it in live conversations and reports where it fails.' },
    { who: 'Marketing', does: 'Turns it into positioning and messaging for a market, not one deal.' },
    { who: 'Customers', does: 'Confirm or reject it — the only real test.' }
  ],
  inputs: ['Segment definition', 'Jobs, pains and gains from research', 'Competitive and status-quo alternatives', 'Proof points and evidence', 'Pricing constraints'],
  activities: ['Map pains and gains to product capabilities', 'Identify the one differentiator that matters most', 'Quantify the value where honest', 'Test the wording with real buyers', 'Cut everything that does not survive'],
  outputs: ['Value proposition statement', 'Proof points', 'Objection handling notes', 'Sales-facing one-pager'],
  outcomes: ['Shorter sales cycles', 'Fewer bespoke promises', 'Clear reason a buyer chooses you over doing nothing'],
  example: {
    title: 'From data points to a decision',
    body: 'A weak proposition: "access to over 100 data points per vehicle across six brands via one API." True, but it describes supply. A stronger one for a leasing company: "know the real condition of every vehicle before it comes off lease, without fitting hardware, so you price remarketing on evidence rather than on mileage bands." Same product. The second names the decision (remarketing pricing), the alternative (mileage-band guesswork and hardware retrofits), and the gain. The proof points — no hardware, multi-brand under one contract, standardised format — now support a claim instead of being the claim.'
  },
  mistakes: [
    { mistake: 'Describing capability instead of outcome.', instead: 'Finish the sentence "…so that they can…" and lead with that half.' },
    { mistake: 'Ignoring the status quo as a competitor.', instead: 'In B2B, "we already cope" wins most deals. Beat it explicitly.' },
    { mistake: 'One proposition for every segment.', instead: 'Same product, different promise. A workshop and an insurer buy different things from the same feed.' },
    { mistake: 'Quantified claims you cannot evidence.', instead: 'State the boundary of the claim. An unverified number that gets challenged costs more than no number.' }
  ],
  tools: [
    { name: 'Value Proposition Canvas', note: 'Customer profile (jobs, pains, gains) against value map (products, pain relievers, gain creators).' },
    { name: 'Positioning statement', note: 'For… who… our… is a… that… unlike…' },
    { name: 'Value stick', note: 'Willingness to pay, price, cost — shows where value is captured versus created.' },
    { name: 'Win/loss analysis', note: 'The cheapest continuous test of whether the proposition holds.' }
  ],
  check: {
    q: 'A proposition says: "Standardised, multi-brand vehicle data, one contract, one API." What is its main weakness?',
    options: [
      'It is too long for a sales conversation.',
      'It describes the supply side and never names the customer\'s decision or their current alternative.',
      'It does not mention price.',
      'It is not differentiated from competitors.'
    ],
    answer: 1,
    why: 'It may well be differentiated and correctly priced. The weakness is structural: nothing in it tells a buyer what they will be able to do, or what they are doing today instead.'
  },
  ownWords: 'Write a one-sentence value proposition for a product you have worked on, in the form: for [segment] who [situation], [product] [outcome], unlike [alternative].',
  teachBack: {
    prompt: 'Explain why "doing nothing" is usually your strongest competitor in B2B, and how a value proposition beats it.',
    mustMention: ['alternative', 'status quo', 'outcome', 'segment']
  },
  roleLink: { reqs: ['r4', 'r5'], text: 'You are the day-to-day interface with Sales. The value proposition is the artefact that interface runs on — when it is weak, Sales fills the gap by inventing promises, and those come back to you as requirements.' },
  youLink: { evidence: ['e-gtm', 'e-adoption'], text: 'Developing positioning and value propositions for proprietary and partner brands is on your CV. Your adoption framework adds the sharper point: availability alone does not create adoption — a proposition has to reach the person who chooses.' },
  depends: ['problem'],
  glossary: ['value-proposition', 'positioning', 'status-quo-bias', 'proof-point']
},

{
  id: 'lifecycle', module: 'm1', order: 4, minutes: 11,
  title: 'Product lifecycle management',
  oneLine: 'Running a product deliberately through every stage from idea to withdrawal, with different questions at each stage.',
  definition: 'Lifecycle management is the practice of knowing which stage a product is in — ideation, definition, validation, delivery, operation, iteration, and eventually decline and withdrawal — and applying the right question to that stage. A product in validation should be asked "is this real?"; the same question at operation is a distraction, where the question is "is this healthy and worth continuing?" Lifecycle management also includes the least glamorous and most neglected part: deciding when to stop.',
  why: 'Portfolios rot when nothing is ever retired. Every live product consumes support, compliance attention, contractual obligation and cognitive load, whether or not anyone is buying it. Explicit lifecycle stages also make governance possible: gates only work if everyone agrees which gate a thing is approaching.',
  when: 'Continuously. Formally at stage gates and at portfolio reviews.',
  people: [
    { who: 'Product Manager', does: 'Owns the product across every stage, including the end.' },
    { who: 'Portfolio leadership', does: 'Approves stage transitions and withdrawal.' },
    { who: 'Operations and support', does: 'Carry the product through its longest stage.' },
    { who: 'Legal and commercial', does: 'Hold the contractual obligations that outlive the roadmap.' },
    { who: 'Customers and partners', does: 'Must be migrated, notified, or contractually released.' }
  ],
  inputs: ['Portfolio strategy', 'Stage criteria and gates', 'Performance, adoption and cost data', 'Contractual commitments', 'Support and incident load'],
  activities: ['Classify each product by stage and strategic role', 'Apply the right gate question', 'Review performance against the reason the product exists', 'Plan sunset, migration and communication', 'Feed learning back into the next definition'],
  outputs: ['Stage classification', 'Gate decisions with rationale', 'Roadmap and portfolio adjustments', 'End-of-life plan with migration path'],
  outcomes: ['A portfolio that reflects current strategy', 'Freed capacity', 'Fewer zombie products consuming support and compliance effort'],
  example: {
    title: 'Retiring a data product is a contract problem',
    body: 'A legacy fuel-level endpoint has three remaining partners and low call volume. Retiring it looks obvious until you check what lifecycle management actually requires: the contracts specify twelve months notice, one partner has built their own customer-facing product on it, the replacement endpoint returns state of charge for electric vehicles but not the legacy fuel field, and support has an undocumented workaround that two people know. The end-of-life plan therefore contains a migration mapping, a notice schedule, a parallel-run window, a knowledge transfer, and an owner for the residual risk. The decision to retire took a day. The plan took a quarter.'
  },
  mistakes: [
    { mistake: 'Only managing the exciting stages.', instead: 'Operation is the longest stage and where most cost lives. Give it the same attention as launch.' },
    { mistake: 'Using one threshold — usually revenue — to judge every product.', instead: 'Judge by strategic role. A low-volume product may be holding a key account, or completing a system.' },
    { mistake: 'Sunsetting without a migration path.', instead: 'The withdrawal plan is the product\'s last release. Treat it as one.' },
    { mistake: 'Letting the gate become a formality.', instead: 'A gate nobody ever fails is a meeting, not a control.' }
  ],
  tools: [
    { name: 'Stage-gate', note: 'Named phases with explicit entry and exit criteria and a decision-maker at each.' },
    { name: 'Portfolio role classification', note: 'Core, growth, specialist, on-demand, substitution, withdrawal.' },
    { name: 'Product health scorecard', note: 'Adoption, margin, support load, compliance exposure, strategic fit.' },
    { name: 'End-of-life checklist', note: 'Notice, migration, contract, data retention, knowledge transfer, residual risk owner.' }
  ],
  check: {
    q: 'A data product has low revenue and low call volume, but its only two customers are strategic accounts using it inside a larger integration. What does good lifecycle management do?',
    options: [
      'Withdraw it — the numbers do not support continuation.',
      'Keep it indefinitely because the accounts are strategic.',
      'Assess its role rather than its volume: if it completes a system those accounts depend on, classify it accordingly and manage its cost, and only then decide.',
      'Raise its price until it becomes profitable.'
    ],
    answer: 2,
    why: 'This is "role before threshold". Volume is one input, not the decision. The right move is to name the product\'s role, then choose deliberately — which might still end in withdrawal, but with a migration plan.'
  },
  ownWords: 'Describe the lifecycle stages you actually use in your current work, in your own words, and name the question you ask at each gate.',
  teachBack: {
    prompt: 'Explain to a finance stakeholder why you are not withdrawing a low-revenue product, without sounding sentimental about it.',
    mustMention: ['role', 'threshold', 'cost', 'dependence']
  },
  roleLink: { reqs: ['r1'], text: 'The first responsibility in the ad is to "lead the product through all DUP lifecycle phases — from ideation, definition, and validation to delivery, operation, and iteration." That is this concept, with their phase names. Notice that operation and iteration are named explicitly: this is not a launch-and-move-on role.' },
  youLink: { evidence: ['e-lifecycle', 'e-rolebeforethreshold'], text: 'End-to-end lifecycle work including range gap analysis, SKU rationalisation and end-of-life recommendations is directly on your CV, and "role before threshold" is your own stated rule for the hardest lifecycle decision there is.' },
  depends: ['strategy'],
  glossary: ['lifecycle', 'stage-gate', 'end-of-life', 'portfolio-role', 'sunset']
},

{
  id: 'discovery', module: 'm2', order: 5, minutes: 11,
  title: 'Product discovery',
  oneLine: 'Reducing the risk that you build the wrong thing, by learning before you commit.',
  definition: 'Discovery is continuous work to answer four risks before delivery: will they use it (value), can they use it (usability), can we build it (feasibility), and may we build it — legally, commercially, ethically (viability). It is not a phase that ends; in healthy teams discovery and delivery run in parallel, with discovery staying a step ahead.',
  why: 'Delivery is expensive and discovery is cheap. A week spent learning that a proposed data product cannot get consent for the field it depends on saves a quarter of engineering. The four risks also explain most product failures: the thing worked, and nobody wanted it; or people wanted it and it could not be permitted.',
  when: 'Continuously, weighted towards the front of a product\'s life and towards any moment of large commitment.',
  people: [
    { who: 'Product Manager', does: 'Frames the risk, chooses the cheapest test, decides what the result means.' },
    { who: 'Designer', does: 'Probes usability and desirability with prototypes.' },
    { who: 'Engineer or data engineer', does: 'Probes feasibility — often the fastest test is a spike, not a conversation.' },
    { who: 'Legal, privacy, compliance', does: 'Answer the viability question that can kill an idea outright.' },
    { who: 'Sales and customers', does: 'Provide access to the reality being tested.' }
  ],
  inputs: ['Outcome or problem to pursue', 'Existing evidence and assumptions', 'Access to users and buyers', 'Constraints: technical, legal, commercial'],
  activities: ['List assumptions and rank by risk', 'Choose the cheapest test per assumption', 'Run interviews, prototypes, spikes, data analysis', 'Decide: proceed, pivot, or stop', 'Record what is now known versus still inferred'],
  outputs: ['Validated or invalidated assumptions', 'Prototypes and research findings', 'A decision with its rationale', 'An updated assumption register'],
  outcomes: ['Fewer expensive wrong builds', 'Faster kill decisions', 'Delivery starts with fewer unknowns'],
  example: {
    title: 'The cheapest test kills the idea first',
    body: 'An idea: a predictive maintenance product for independent workshops, alerting them when a customer\'s vehicle is likely to need service. Four risks, cheapest test first. Viability: may we contact a driver based on their vehicle\'s diagnostic data, and who holds the consent? One conversation with privacy answers this in a day, and it may end the idea. Feasibility: does the diagnostic signal exist across all six brands at usable frequency? A data spike, two days. Value: will a workshop pay, and how much? Ten interviews with workshop owners plus a fake-door offer. Usability: last, because it only matters if the other three pass. Running them in that order costs a fortnight. Running them in reverse costs a quarter and a prototype nobody may legally use.'
  },
  mistakes: [
    { mistake: 'Treating discovery as a phase that ends when delivery starts.', instead: 'Run them in parallel. The team building today should be learning about next quarter.' },
    { mistake: 'Testing the easy assumption instead of the risky one.', instead: 'Rank by "what would hurt most if wrong", then test the top of the list.' },
    { mistake: 'Asking customers what they want.', instead: 'Ask what they did, when, and what it cost them. Behaviour is evidence; preference is a forecast.' },
    { mistake: 'Discovery with no decision attached.', instead: 'Before testing, write down which result would change what you do. If none would, do not run the test.' }
  ],
  tools: [
    { name: 'The four risks', note: 'Value, usability, feasibility, viability. Cassagne/Cagan framing; use it as a checklist.' },
    { name: 'Assumption mapping', note: 'Plot assumptions by importance and evidence. Test the top-right.' },
    { name: 'Opportunity solution tree', note: 'Outcome → opportunities → solutions → tests. Keeps discovery tied to an outcome.' },
    { name: 'Continuous interviewing', note: 'A standing weekly slot beats an occasional research sprint.' }
  ],
  check: {
    q: 'You have four assumptions behind a new data product. Which should you test first?',
    options: [
      'The one the team disagrees about most.',
      'The one that is cheapest to test.',
      'The one that, if false, most changes whether the product should exist at all.',
      'The one your biggest customer raised.'
    ],
    answer: 2,
    why: 'Rank by consequence, then by cost. Cheapness is a tie-breaker, not the criterion — and in regulated data products the killer assumption is often the permission one.'
  },
  ownWords: 'Pick something you are working on. Write your three riskiest assumptions and the cheapest honest test for each.',
  teachBack: {
    prompt: 'Explain the difference between discovery and requirements gathering to someone who thinks they are the same thing.',
    mustMention: ['risk', 'assumption', 'evidence', 'decision']
  },
  roleLink: { reqs: ['r1', 'r3'], text: 'Ideation and validation are named DUP phases. In a vehicle-data business the viability risk — may we use this data, for this purpose, for this customer — is frequently the one that kills an idea, and it is cheap to test early.' },
  youLink: { evidence: ['e-method-assumptions', 'e-method-criteria', 'e-evidence-inputs'], text: 'Two of your six stated principles are discovery discipline: recording what is known versus inferred versus still to validate, and setting the decision criteria before testing. That second one is the thing most PMs skip.' },
  depends: ['problem'],
  glossary: ['discovery', 'four-risks', 'assumption', 'spike', 'fake-door']
},

{
  id: 'research', module: 'm2', order: 6, minutes: 10,
  title: 'User research',
  oneLine: 'Structured learning about the people who use, buy and operate the product — done well enough to be trusted.',
  definition: 'User research covers generative work (what problems exist, how work really happens) and evaluative work (does this solution work). In B2B the "user" is rarely the buyer: the fleet manager who logs in, the developer who integrates the API, the finance director who signs, and the support agent who fields the complaint are four different people with different definitions of success. Research means talking to all of them, not the most available one.',
  why: 'Product decisions are made on someone\'s mental model of the user. Research replaces the loudest person\'s model with a shared, evidenced one. It also protects against the most expensive B2B error: designing for the buyer and shipping something the daily user quietly refuses to adopt.',
  when: 'Generative research before and during definition; evaluative research on prototypes and after release. Continuously in small doses rather than occasionally in large ones.',
  people: [
    { who: 'Product Manager', does: 'Frames the questions, attends the sessions, owns what is done with findings.' },
    { who: 'Researcher or designer', does: 'Designs the study and protects it from leading questions.' },
    { who: 'Sales and customer success', does: 'Open doors and provide account context — but must not sit in and steer.' },
    { who: 'Engineers', does: 'Observe. One session watched beats ten summarised.' }
  ],
  inputs: ['Research question tied to a decision', 'Participant criteria and recruitment', 'Discussion guide or prototype', 'Prior findings'],
  activities: ['Recruit the right people, not the willing ones', 'Interview about past behaviour, not future intent', 'Observe real work where possible', 'Synthesise into patterns with counts', 'Distinguish finding from interpretation'],
  outputs: ['Findings with supporting quotes', 'Personas or role profiles', 'Journey maps and pain points', 'A stated confidence level per finding'],
  outcomes: ['Shared, evidenced understanding', 'Fewer assumptions carried silently into delivery', 'Design decisions that survive contact with real work'],
  example: {
    title: 'Four users, one product',
    body: 'For an API-delivered fleet data product, the integrating developer cares about schema stability, error semantics and documentation; the fleet manager cares about whether the numbers match what the driver reports; the procurement lead cares about contract scope and whether adding vehicles is a renegotiation; the support agent cares about being able to answer "why is this vehicle missing?" without escalating. Research with only the fleet manager produces a product that is pleasant to look at, painful to integrate, contractually awkward and unsupportable. Six interviews spread across the four roles will change the requirements more than sixty with one role.'
  },
  mistakes: [
    { mistake: 'Interviewing whoever Sales can get you.', instead: 'Recruit against criteria. A convenient participant from the wrong segment is worse than none.' },
    { mistake: 'Asking "would you use this?"', instead: 'Ask what they did last time the situation arose. Hypothetical answers are consistently over-positive.' },
    { mistake: 'Treating one vivid quote as a finding.', instead: 'Count. "Four of seven" is a finding; "one customer said" is an anecdote — say which you have.' },
    { mistake: 'Letting an account manager sit in on the interview.', instead: 'Customers will not describe their frustrations honestly in front of the person who sold to them.' }
  ],
  tools: [
    { name: 'Semi-structured interview', note: 'A guide, not a script. Follow the interesting answer.' },
    { name: 'Contextual inquiry', note: 'Watch the work happen. Reveals workarounds people forget to mention.' },
    { name: 'Usability testing', note: 'Five participants surfaces most severe issues; more adds diminishing value.' },
    { name: 'Survey', note: 'Good for sizing something you already understand. Poor for discovering it.' },
    { name: 'Journey map / service blueprint', note: 'Shows the back-stage steps that make or break the front-stage experience.' }
  ],
  check: {
    q: 'You have budget for six interviews on a new B2B data product. What is the strongest allocation?',
    options: [
      'Six fleet managers, since they are the primary user.',
      'Six people across the four roles that touch the product — integrator, daily user, buyer, support — accepting fewer per role.',
      'Six existing customers, since they know the product.',
      'Six prospects who have not bought, to understand objections.'
    ],
    answer: 1,
    why: 'Breadth across roles surfaces the requirements that kill B2B products — integration, contract scope, supportability — which depth in one role will never reveal. Depth comes next, once you know which role holds the risk.'
  },
  ownWords: 'Name the four distinct people who touch a product you know, and write what "this works" means to each of them.',
  teachBack: {
    prompt: 'Explain why the buyer and the user are usually different people in B2B, and what goes wrong when a team forgets that.',
    mustMention: ['buyer', 'user', 'adoption', 'evidence']
  },
  roleLink: { reqs: ['r4', 'r5'], text: 'Because you are the day-to-day Sales interface, most of your research access will arrive through Sales. That is an advantage and a bias: the accounts you hear from will be the ones with an account manager motivated to introduce you.' },
  youLink: { evidence: ['e-feedbackloop', 'e-availabilitybias', 'e-method-deliverers'], text: 'You already structure client feedback into product discussions, you correct for availability bias in demand data, and one of your stated principles is involving the people who will use, sell, support and operate the product. That last one is precisely the four-roles point.' },
  depends: ['discovery'],
  glossary: ['generative-research', 'evaluative-research', 'persona', 'journey-map', 'contextual-inquiry']
}
];
