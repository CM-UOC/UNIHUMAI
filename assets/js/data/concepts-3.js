/* Module 4 — Building & delivering, Module 5 — Measuring & operating */
export default [
{
  id: 'agile', module: 'm4', order: 13, minutes: 11,
  title: 'Agile and Scrum',
  oneLine: 'Working in short cycles so that reality can correct the plan before the plan becomes expensive.',
  definition: 'Agile is a set of values: working software over documentation, responding to change over following a plan, customer collaboration over contract negotiation, individuals and interactions over process. Scrum is one framework implementing them — fixed-length sprints, three accountabilities (Product Owner, Scrum Master, Developers), and five events (sprint, planning, daily, review, retrospective). Kanban is another — continuous flow, work-in-progress limits, and optimization for cycle time rather than for a rhythm.',
  why: 'Long plans in uncertain environments are expensive fiction. Short cycles convert uncertainty into learning at a survivable price. The framework matters far less than the two behaviors it is meant to produce: shipping something real regularly, and changing the plan when what shipped teaches you something.',
  when: 'Scrum suits work that can be batched into a rhythm with a review point. Kanban suits interrupt-driven work with variable item size — much support and data-operations work is Kanban-shaped. Many teams need both.',
  people: [
    { who: 'Product Owner', does: 'Owns and orders the backlog; the single voice on what is next.' },
    { who: 'Developers', does: 'Own how the work is done and the sprint plan.' },
    { who: 'Scrum Master / delivery lead', does: 'Owns the effectiveness of the process; removes impediments.' },
    { who: 'Stakeholders', does: 'Attend the review, see real increments, give feedback early.' }
  ],
  inputs: ['Ordered, refined backlog', 'Team capacity', 'Sprint goal or flow policy', 'Definition of Done'],
  activities: ['Planning: agree a goal and select work', 'Daily coordination against that goal', 'Refinement throughout the sprint', 'Review with real stakeholders and a real increment', 'Retrospective that changes something'],
  outputs: ['A working increment', 'Updated backlog and forecast', 'Retrospective actions with owners'],
  outcomes: ['Faster feedback', 'Lower cost of being wrong', 'Predictability that comes from evidence rather than promises'],
  example: {
    title: 'Two rhythms in one hub',
    body: 'A new data-product team building an endpoint runs Scrum: two-week sprints, a sprint goal tied to an outcome, a review where a partner integration engineer actually attends. The same hub\'s data-operations work — a broken feed from one brand, a partner reporting stale timestamps, an onboarding request — cannot be sprint-planned, because it arrives when it arrives. That is Kanban: WIP limits, classes of service, and a cycle-time target. A PM who insists on one framework for both will either strangle the operations work in ceremony or destroy the product team\'s focus. Choosing the right work rhythm for each kind of work is a product-management decision, not a process detail.'
  },
  mistakes: [
    { mistake: 'Doing the events without the values ("dark Scrum").', instead: 'Ask whether the plan actually changes as a result of what you learn. If not, the ceremonies are theatre.' },
    { mistake: 'A sprint goal that is a list of tickets.', instead: 'One sentence naming the outcome, so the team can trade scope to reach it.' },
    { mistake: 'Treating velocity as a performance metric.', instead: 'It is a forecasting aid for the team. The moment it is reported upward as productivity, it inflates.' },
    { mistake: 'Retrospectives without change.', instead: 'One action, one owner, one date. Three items nobody does is worse than one that happens.' },
    { mistake: 'The PM acting as a ticket-writing service.', instead: 'The Product Owner brings the problem and the outcome; the team brings solutions.' }
  ],
  tools: [
    { name: 'Scrum', note: 'Sprints, three accountabilities, five events, three artifacts. Best with a stable team and batched work.' },
    { name: 'Kanban', note: 'Visualize flow, limit WIP, manage cycle time. Best for interrupt-driven work.' },
    { name: 'Definition of Done', note: 'The team\'s shared quality bar. Not negotiable per-story.' },
    { name: 'Story points / cycle time', note: 'Relative sizing or empirical flow measurement. Cycle time needs less trust and less arguing.' },
    { name: 'Sprint review vs demo', note: 'A review gathers feedback that changes the backlog. A demo is a presentation.' }
  ],
  check: {
    q: 'A stakeholder asks why the team\'s velocity dropped and requests a plan to raise it. Best product response?',
    options: [
      'Commit to increasing velocity next sprint by planning more points.',
      'Explain that velocity is a team forecasting aid, redirect to the outcome the sprint was serving, and show what was delivered against it.',
      'Change the estimation scale so the numbers look consistent.',
      'Remove estimation entirely and move to Kanban.'
    ],
    answer: 1,
    why: 'Velocity reported upward as a target is Goodhart\'s law in action — it will rise without more value being delivered. Redirecting to the outcome keeps the conversation on what the sprint was for.'
  },
  ownWords: 'Describe your actual delivery rhythm in your own words: what happens in refinement, what you decide, and what the team decides.',
  teachBack: {
    prompt: 'Explain the difference between a Product Owner and a Product Manager, and say honestly where the line sits in your own experience.',
    mustMention: ['backlog', 'outcome', 'decision', 'team']
  },
  roleLink: { reqs: ['r10', 'r2'], text: '"Agile and delivery competencies" is a named requirement, and the Digital:Hub half of this joint venture is described as the agile, hands-on environment. Expect a practical question, not a definitional one.' },
  youLink: { evidence: ['e-agile', 'e-app-built', 'e-tools'], text: 'Scrum and Kanban, backlog prioritization, user stories, acceptance criteria and release planning are on your CV, and you have shipped a real internal application. If asked about a formal certification, say what you actually hold — the shipped product is stronger evidence than a badge.' },
  depends: ['backlog'],
  glossary: ['scrum', 'kanban', 'sprint', 'velocity', 'wip-limit', 'retrospective']
},

{
  id: 'delivery', module: 'm4', order: 14, minutes: 11,
  title: 'Product delivery and go-live readiness',
  oneLine: 'Getting something built, tested, supportable and formally handed over. Not just released.',
  definition: 'Delivery is everything between "we have decided" and "it is running reliably in someone else\'s hands". It includes build, testing, release mechanics, documentation, support enablement, monitoring, and the formal handover of residual risk to whoever will operate it. "Done" for a PM is not deployed; it is operable, supportable, measurable and contractually safe.',
  why: 'Products fail after launch more often than during it. The activities that prevent that — a real go-live checklist, a support runbook, monitoring that alerts before a customer does, a named owner for each residual risk — are unexciting, easy to defer, and are the difference between a launch and an incident.',
  when: 'From the moment build starts. Go-live readiness is assessed at a defined checkpoint, not discovered on launch day.',
  people: [
    { who: 'Product Manager', does: 'Owns readiness end to end and calls the go/no-go.' },
    { who: 'Engineering', does: 'Owns build, test coverage, deployment and rollback.' },
    { who: 'QA', does: 'Owns verification against acceptance criteria.' },
    { who: 'Operations and support', does: 'Receive the product; must accept the handover, not merely be told.' },
    { who: 'Legal, privacy, security', does: 'Confirm the release is permitted before it happens.' },
    { who: 'Sales and enablement', does: 'Must be able to sell it accurately on day one.' }
  ],
  inputs: ['Accepted requirements and acceptance criteria', 'Test results', 'Contract and consent status', 'Support model and routing', 'Monitoring and alerting plan'],
  activities: ['Verify against acceptance criteria', 'Run the go-live checklist', 'Complete risk handover with named owners', 'Enable support and Sales', 'Confirm rollback and communication plans', 'Make the go/no-go decision explicitly'],
  outputs: ['Release with rollback plan', 'Go-live checklist signed', 'Risk register with owners', 'Runbook and support routing', 'Enablement material'],
  outcomes: ['Launches that do not generate avoidable incidents', 'Support able to answer without escalation', 'Risks owned by someone specific rather than by nobody'],
  example: {
    title: 'A go-live checklist for a data product',
    body: 'Contract scope covers the use case, and the customer\'s permitted purposes are recorded. Consent basis confirmed for every personal-data field. Data quality thresholds defined and currently met. Schema versioned and documented, with a breaking-change policy published. Rate limits set and communicated. Monitoring live for availability, latency and freshness, with alerts routed to a named team. Support routing matrix agreed — who takes a "missing vehicle" ticket, who takes a "wrong value" ticket, and the escalation path. Runbook written and walked through with support. Rollback tested. Residual risks listed, each with an accepting owner and a review date. Sales enablement delivered, including what the product does not do. Only then, go.'
  },
  mistakes: [
    { mistake: 'Treating deployment as launch.', instead: 'Nothing is launched until support can support it and Sales can describe it accurately.' },
    { mistake: 'Risk handover as an email.', instead: 'Handover means the receiving owner accepts, in writing, with a review date. Otherwise the risk stays with you, invisibly.' },
    { mistake: 'No rollback plan because "it should be fine".', instead: 'Decide the rollback trigger before launch, when nobody is under pressure.' },
    { mistake: 'Monitoring the system but not the data.', instead: 'A green API returning stale values is the classic data-product failure. Monitor freshness and plausibility, not just uptime.' },
    { mistake: 'Enabling Sales on capability only.', instead: 'Enable them on limits too. Most post-launch escalation traces to something Sales believed the product did.' }
  ],
  tools: [
    { name: 'Go-live checklist', note: 'Explicit, signed, and the same every time so it improves.' },
    { name: 'Risk register with owners', note: 'A risk with no name attached is unowned.' },
    { name: 'Runbook', note: 'How support diagnoses the five most likely problems without you.' },
    { name: 'Feature flag / canary release', note: 'Reduces blast radius; makes rollback cheap.' },
    { name: 'RACI for launch', note: 'Who is Responsible, Accountable, Consulted, Informed — for launch specifically.' }
  ],
  check: {
    q: 'The build is complete and tests pass, but support has not been walked through the runbook and no one has accepted the residual risks. What should a PM do?',
    options: [
      'Launch — the product works and support can learn on the job.',
      'Launch to a small number of friendly customers only.',
      'Hold the go-live. Operability and accepted risk handover are release criteria, not follow-ups.',
      'Launch and schedule the support walkthrough for the following week.'
    ],
    answer: 2,
    why: 'The ad names testing, risk handover and onboarding together as go-live readiness, which is the right instinct: an unsupportable launch converts every early customer question into an escalation, and the goodwill spent is rarely recovered.'
  },
  ownWords: 'Write your own go-live checklist for a product you know. Aim for ten items, at least three of which are not about the software working.',
  teachBack: {
    prompt: 'Explain what "risk handover" means and why an email does not accomplish it.',
    mustMention: ['owner', 'accept', 'residual', 'review']
  },
  roleLink: { reqs: ['r6', 'r7'], text: 'Directly quoted: "Coordinate and ensure product readiness for go-live, including testing, risk handover, and onboarding." This is one of the two most learnable gaps in your profile, and drafting an actual checklist before the interview would put you ahead of most candidates.' },
  youLink: { evidence: ['e-fourgates', 'e-launchcoord', 'e-app-decisions'], text: 'You coordinated onboarding, adoption and retention through software-module launches, and your four launch gates already include operational readiness. Making accessibility a release criterion on the pricing app shows you will hold a gate rather than wave something through.' },
  depends: ['requirements', 'agile'],
  glossary: ['go-live', 'risk-handover', 'runbook', 'rollback', 'raci', 'canary']
},

{
  id: 'risk', module: 'm4', order: 15, minutes: 10,
  title: 'Risk, dependency and change management',
  oneLine: 'Naming what could go wrong, what you are waiting on, and how changes get approved, before any of it hurts you.',
  definition: 'Risk management identifies what could prevent an outcome, estimates likelihood and impact, and assigns an owner and a response: avoid, reduce, transfer, or accept. Dependency management tracks what you need from others, when, and what happens if it slips. Change management is the agreed process for altering scope, and — separately — the human work of getting people to actually adopt a change.',
  why: 'Most product failures were foreseeable and unowned. The value of a risk register is not prediction; it is that someone specific is now responsible and a review date exists. Dependencies are where cross-functional products actually die, and in a group structure your critical dependency often sits in a different country and legal entity.',
  when: 'From definition onward. Reviewed at every planning cycle and at each gate. Change control tightens as commitment increases.',
  people: [
    { who: 'Product Manager', does: 'Maintains the register; escalates what cannot be resolved at their level.' },
    { who: 'Risk owners', does: 'Named individuals who accept a specific risk and its review date.' },
    { who: 'Delivery lead / project manager', does: 'Tracks dependency dates and critical path.' },
    { who: 'Governance forum or steering group', does: 'Approves changes above an agreed threshold.' },
    { who: 'Affected teams', does: 'Adopt the change — the part most often skipped.' }
  ],
  inputs: ['Assumptions and known unknowns', 'Dependency map', 'Contractual and regulatory obligations', 'Historical incidents'],
  activities: ['Identify risks per requirement family', 'Score likelihood × impact', 'Choose a response and name an owner', 'Track dependencies with dates and fallbacks', 'Run change requests through an agreed route', 'Communicate change to the people it lands on'],
  outputs: ['Risk register with owners and review dates', 'Dependency map with critical path', 'Change log with rationale', 'Escalation path'],
  outcomes: ['Fewer surprises', 'Faster escalation when it is warranted', 'Changes that stick because people were brought along'],
  example: {
    title: 'A dependency in another legal entity',
    body: 'A product depends on a data field that a brand-side team must expose, and on a contract template legal is drafting. Neither reports to you. Good practice: name the dependency, name the person, agree the date in writing, and define the fallback now — ship without that field for the first release, or delay. Then review it weekly, not at the gate. The failure mode is polite silence: everyone assumes it is progressing, the date arrives, and the fallback has to be invented under pressure. Note also the change-management half: when the field finally arrives and the schema changes, partners who have already integrated need a versioning policy and notice — the change is not done when the code ships.'
  },
  mistakes: [
    { mistake: 'A risk register nobody reviews.', instead: 'Review dates and owners, or it is a document rather than a control.' },
    { mistake: 'Owning a risk that is not yours to accept.', instead: 'Escalate. Accepting a legal or financial risk on behalf of the company is not a PM decision.' },
    { mistake: 'Tracking dependencies without fallbacks.', instead: 'For each, decide now what you do if it slips two weeks.' },
    { mistake: 'Confusing change control with change adoption.', instead: 'Approving a change is not the same as people working differently. Both need planning.' },
    { mistake: 'Escalating too late to preserve the relationship.', instead: 'Escalate early and factually; late escalation damages the relationship far more.' }
  ],
  tools: [
    { name: 'Risk register', note: 'Description, likelihood, impact, response, owner, review date. Six columns, no more.' },
    { name: 'RAID log', note: 'Risks, Assumptions, Issues, Dependencies. The standard project-management tool.' },
    { name: 'Pre-mortem', note: 'Imagine it failed; work backwards. Surfaces risks people will not raise directly.' },
    { name: 'Dependency map / critical path', note: 'Shows which slip actually moves the date.' },
    { name: 'ADKAR', note: 'Awareness, Desire, Knowledge, Ability, Reinforcement — for the adoption half of change.' }
  ],
  check: {
    q: 'A dependency owned by another team is two weeks late and they are unresponsive. What is the strongest first action?',
    options: [
      'Escalate immediately to their director.',
      'Re-plan your work around the delay and say nothing.',
      'Confirm the impact and the new realistic date in writing, state the fallback you will take and by when you must take it, and copy the agreed escalation contact.',
      'Build the dependency yourself to avoid the delay.'
    ],
    answer: 2,
    why: 'This makes the impact and the deadline for deciding explicit without escalating over someone\'s head as a first move. Silence hides the risk; immediate escalation burns a relationship you need repeatedly; building it yourself duplicates work and creates ownership confusion.'
  },
  ownWords: 'List the three biggest risks on something you are working on, and for each name who would actually accept it.',
  teachBack: {
    prompt: 'Explain the difference between change control and change adoption, with an example where one succeeded and the other failed.',
    mustMention: ['owner', 'fallback', 'adoption', 'escalation']
  },
  roleLink: { reqs: ['r6', 'r7', 'r8'], text: '"Risk handover" appears in the go-live bullet and "Project Management" is a named requirement. In a two-parent joint hub, dependency management across organizational boundaries will be a large part of the actual job.' },
  youLink: { evidence: ['e-crossfunctional', 'e-supplierrisk', 'e-app-decisions'], text: 'You resolve cross-functional dependencies today, and you treat supplier performance as a portfolio and customer-value risk rather than a purchasing matter. That reframing — risk located where its consequence lands, not where its cause sits — is exactly the instinct a risk register needs.' },
  depends: ['delivery'],
  glossary: ['risk-register', 'raid', 'dependency', 'pre-mortem', 'escalation', 'change-control']
},

{
  id: 'analytics', module: 'm5', order: 16, minutes: 13,
  title: 'Product analytics, KPIs and OKRs',
  oneLine: 'Picking the few numbers that tell you whether the product is working, and knowing what each one cannot prove.',
  definition: 'A metric is any measurement. A KPI is a metric a team has agreed to steer by. An OKR is a goal-setting structure: a qualitative Objective with three-ish measurable Key Results, usually quarterly, expressing intended change rather than business-as-usual health. Metrics divide into inputs (what you do), outputs (what gets produced) and outcomes (what changes for the customer or business). Most dashboards over-report outputs.',
  why: 'Metrics decide what a team pays attention to, so choosing them is a leadership act. Bad ones cause real damage: a target set on a proxy will be met without the underlying outcome improving. In a B2B data product, the useful measures are often adoption depth and reliability, not volume — a partner making a million calls that they cannot rely on is a churn risk, not a success.',
  when: 'Defined at definition, measured from before launch, reviewed continuously, and renegotiated when the product\'s stage changes.',
  people: [
    { who: 'Product Manager', does: 'Chooses the KPI set, defends it, and states its limits.' },
    { who: 'Data analyst', does: 'Builds measurement and challenges what the data can support.' },
    { who: 'Engineering', does: 'Adds the measurement code. Without it, nothing else on this list is possible.' },
    { who: 'Leadership', does: 'Sets portfolio-level objectives the product KPIs must ladder into.' },
    { who: 'Sales and operations', does: 'Live with the consequences of whatever gets measured.' }
  ],
  inputs: ['Product outcome and value proposition', 'Toolation', 'Baselines', 'Contractual SLA commitments'],
  activities: ['Build a KPI tree from outcome down to input', 'Choose a small primary set with a counter-metric each', 'Tool before launch', 'Review with honest interpretation', 'Retire metrics that no longer drive decisions'],
  outputs: ['KPI tree and definitions', 'Dashboards per audience', 'OKRs for the cycle', 'Stated measurement limitations'],
  outcomes: ['Decisions grounded in evidence', 'Early detection of degradation', 'Fewer arguments settled by seniority'],
  example: {
    title: 'A KPI tree for a fleet data product',
    body: 'North star: contracted vehicles actively delivering usable data weekly. Under it, four branches. Adoption: partners integrated, time from contract to first successful call, share of contracted VINs actually queried. Reliability: availability, p95 latency, data freshness, share of responses failing plausibility checks. Commercial: revenue per active vehicle, contract expansion rate, churn. Operations: tickets per thousand active vehicles, share resolved without engineering escalation. Now the counter-metrics: raw API call volume goes up when partners retry because responses are unreliable, so pair it with error rate; time-to-first-call goes down if you onboard only sophisticated partners, so pair it with the range of partner types. Finally the honesty: none of this proves the customer made better decisions — that needs a separate, harder study.'
  },
  mistakes: [
    { mistake: 'Reporting outputs as outcomes.', instead: 'Sessions, calls and training attendance are outputs. Ask what changed for the customer.' },
    { mistake: 'A vanity metric that only goes up.', instead: 'If it cannot fall, it cannot inform a decision.' },
    { mistake: 'No counter-metric.', instead: 'Every target creates an incentive to game it. Pair each with the thing it might damage.' },
    { mistake: 'OKRs used as a task list.', instead: 'Key Results are results, not deliverables. "Ship X" is a task; "reduce integration time to under two weeks" is a result.' },
    { mistake: 'Claiming attribution the data cannot support.', instead: 'Say what the number shows and what it does not. This reads as senior, not as weak.' }
  ],
  tools: [
    { name: 'KPI tree', note: 'North star at the root, broken down into drivers you can actually influence.' },
    { name: 'OKR', note: 'Objective plus 3 Key Results. Quarterly, ambitious, few.' },
    { name: 'AARRR (pirate metrics)', note: 'Acquisition, Activation, Retention, Referral, Revenue. Adapt for B2B: activation is integration.' },
    { name: 'HEART', note: 'Happiness, Engagement, Adoption, Retention, Task success. Good for experience measurement.' },
    { name: 'Counter-metric pairing', note: 'The cheapest protection against Goodhart\'s law.' },
    { name: 'Cohort analysis', note: 'Separates a genuine improvement from a change in customer mix.' }
  ],
  check: {
    q: 'API call volume for your data product doubled last month. What is the most responsible first interpretation?',
    options: [
      'Adoption is growing; report it as a success.',
      'It may reflect growth, or partners retrying against errors, or one partner polling inefficiently — check error rate, unique active vehicles and per-partner distribution before concluding anything.',
      'It indicates the product is under-priced for volume.',
      'It shows the integration work reduced friction.'
    ],
    answer: 1,
    why: 'Volume is an output that rises for both good and bad reasons. Retries against failures, and one badly-configured poller, both look identical to growth on a call-volume chart.'
  },
  ownWords: 'Draft a KPI tree for a product you know: one north star, three or four drivers, and one counter-metric.',
  teachBack: {
    prompt: 'Explain to a leader who wants a single number why you are proposing a north star with counter-metrics instead.',
    mustMention: ['outcome', 'counter-metric', 'gaming', 'attribution']
  },
  roleLink: { reqs: ['r7', 'r1'], text: '"Establish and maintain KPIs, SLAs, routing matrices, and knowledge transfers for operational excellence." Note the pairing of KPIs with SLAs: in this role the measure is often also a contractual promise, which raises the stakes on defining it precisely.' },
  youLink: { evidence: ['e-kpis', 'e-dashboards', 'e-app-honesty', 'e-adoption'], text: 'This is a strong area for you. You monitor launch KPIs, service levels and availability, you build the dashboards yourself, you separate output from outcome on adoption, and on the pricing app you stated openly what the data could not attribute. That last point is a genuinely senior habit — use it.' },
  depends: ['valueprop'],
  glossary: ['kpi', 'okr', 'north-star', 'counter-metric', 'goodhart', 'cohort', 'vanity-metric']
},

{
  id: 'serviceops', module: 'm5', order: 17, minutes: 12,
  title: 'Service operations: SLAs, routing and knowledge transfer',
  oneLine: 'The setup that keeps a live product reliable once the person who built it has moved on to the next one.',
  definition: 'Once a product is live it becomes a service. Its operating model has four parts: service levels (what you promise — availability, latency, data freshness, response times), routing (which team receives which type of issue and how it escalates), knowledge (what support needs to answer without escalating), and review (how performance against the promise is inspected and improved). An SLA is the contractual form of the promise; an SLO is the internal target you actually run to, usually stricter.',
  why: 'For a B2B data product the service is the product. A partner does not experience your roadmap; they experience whether the endpoint answered, whether the value was right, and how long it took to get an answer when it was not. Without a routing matrix, every issue arrives at the PM, and the PM becomes the bottleneck instead of the product owner.',
  when: 'Designed before go-live, agreed as part of the contract, reviewed in regular service reviews, and revisited whenever the promise and the reality diverge.',
  people: [
    { who: 'Product Manager', does: 'Defines the service levels the product can actually honor and owns the operating model.' },
    { who: 'Operations / support', does: 'Runs the routing, holds the knowledge, escalates by the matrix.' },
    { who: 'Engineering / SRE', does: 'Owns monitoring, alerting and incident response.' },
    { who: 'Commercial and legal', does: 'Turn service levels into contractual commitments and remedies.' },
    { who: 'Customer / partner', does: 'The counterparty to the promise; part of the review.' }
  ],
  inputs: ['Product capability and real measured performance', 'Contractual commitments', 'Support volumes and issue types', 'Monitoring and alerting'],
  activities: ['Set SLOs from measured reality, then agree SLAs with headroom', 'Build the routing matrix by issue type', 'Write the runbook and run knowledge transfer', 'Tool alerting on the promise, not just the system', 'Hold service reviews and act on trends'],
  outputs: ['SLA and internal SLOs', 'Routing and escalation matrix', 'Runbook and FAQ', 'Service review pack', 'Incident post-mortems'],
  outcomes: ['Predictable service the commercial team can sell honestly', 'Support resolving most issues at first line', 'Degradation caught before a customer reports it'],
  example: {
    title: 'A routing matrix, in one table',
    body: '"Data missing for a vehicle" → first line support, 4h response; check contract scope and VIN eligibility first, because most cases are scope, not fault; escalate to data operations if the VIN is in scope. "Value looks wrong" → data operations, 8h; requires a plausibility check against the source before it becomes an engineering ticket. "Endpoint returning errors" → engineering on-call, 30 minutes, page immediately. "Can we add vehicles / new use case?" → account manager, next business day; this is commercial, not support, and routing it to engineering wastes two days. "Schema or integration question" → developer support, 1 business day. Each row names a first responder, a response time, a diagnostic first step, and an escalation. Writing this table is a two-hour job that removes most of the PM\'s interrupt load for a year.'
  },
  mistakes: [
    { mistake: 'Promising an SLA you have never measured.', instead: 'Measure for a period, set the SLO at what you achieve, then contract an SLA with headroom below it.' },
    { mistake: 'One availability number as the whole promise.', instead: 'For data products, freshness and correctness matter more than uptime. A green endpoint serving yesterday\'s values is failing.' },
    { mistake: 'No routing matrix, so everything reaches the PM.', instead: 'Route by issue type with a named first responder. You are an escalation, not a queue.' },
    { mistake: 'Knowledge transfer as a slide deck.', instead: 'Support should walk through real cases and be able to resolve them unaided before you call it transferred.' },
    { mistake: 'Service reviews that only report green.', instead: 'Review near-misses and trends. A metric inside SLA but drifting is the warning you get for free.' }
  ],
  tools: [
    { name: 'SLA / SLO / SLI', note: 'Indicator is what you measure, Objective is your internal target, Agreement is what you contract.' },
    { name: 'Routing / escalation matrix', note: 'Issue type → first responder → response time → escalation → owner.' },
    { name: 'Runbook', note: 'Diagnostic steps for the most common issues, written for a first-line agent.' },
    { name: 'Error budget', note: 'The permitted unreliability. When it is spent, reliability work outranks features.' },
    { name: 'Post-mortem', note: 'Blameless, with actions and owners. The incident is only paid for once you learn from it.' }
  ],
  check: {
    q: 'Your endpoint has 99.95% availability but partners are complaining. What is the most likely explanation for a data product?',
    options: [
      'They are exceeding their rate limits.',
      'The availability target is too low for their needs.',
      'The service is up but the data is stale or wrong — availability measures the response, not its usefulness.',
      'Their integrations are poorly built.'
    ],
    answer: 2,
    why: 'This is the defining failure mode of data products. A 200 response containing a value from three days ago satisfies an availability SLA and fails the customer completely. Freshness and plausibility need their own indicators.'
  },
  ownWords: 'Draft a five-row routing matrix for a product you know: issue type, first responder, response time, escalation.',
  teachBack: {
    prompt: 'Explain the difference between an SLA and an SLO, and why you would never set them equal.',
    mustMention: ['headroom', 'contract', 'internal target', 'measure']
  },
  roleLink: { reqs: ['r7', 'r6'], text: 'This concept exists because the ad names SLAs, routing matrices and knowledge transfers explicitly — and none of those artifacts appear anywhere in your materials. It is the most concretely closable gap you have. Draft one of each and bring them.' },
  youLink: { evidence: ['e-kpis', 'e-app-decisions'], text: 'The nearest evidence you have is monitoring service levels and availability, and analyzing rotation and stock across a branch network — operational discipline applied to physical availability. Say that honestly: the discipline transfers, the artifacts are new to you.' },
  depends: ['analytics', 'delivery'],
  glossary: ['sla', 'slo', 'sli', 'routing-matrix', 'runbook', 'error-budget', 'post-mortem']
}
];
