/* org.js — how product management sits inside an organisation */

export const FUNCTIONS = [
  { id:'pm', name:'Product Management', x:50, y:50, kind:'core',
    role:'Owns the problem, the outcome and the sequence. Decides what gets built and in what order; does not decide how it is built, and does not own the legal or privacy position.',
    wants:'A product that solves a real problem, is adopted, and can be operated without heroics.',
    tension:'Everything is a trade-off, and almost nothing reports to you.' },
  { id:'eng', name:'Engineering & Data', x:22, y:24, kind:'build',
    role:'Builds and runs the system. Owns feasibility, architecture, technical quality and the long-run cost of decisions.',
    wants:'Clear requirements, stable priorities, and time to keep the system maintainable.',
    tension:'Optimises for maintainability; the PM often optimises for the next commitment. Both are right.',
    withPM:'Feasibility input, effort estimates, technical dependency and debt. The PM brings the problem and the outcome; engineering brings the solution.',
    conflict:'Speed versus maintainability. Resolve by naming the shared constraint — usually a date or a maintenance cost — rather than arguing about the solution.' },
  { id:'design', name:'Design', x:34, y:14, kind:'build',
    role:'Owns the experience — including developer experience for an API product, which is easy to forget.',
    wants:'Time to test with real users; consistency; problems framed before solutions are proposed.',
    tension:'Under date pressure, design research is the first thing cut and the last thing that should be.',
    withPM:'Joint discovery, prototypes, usability evidence. Design tests the usability risk; the PM owns whether the risk matters.',
    conflict:'Research time versus delivery pressure. Resolve by tying research to a specific decision it would change.' },
  { id:'sales', name:'Sales', x:78, y:24, kind:'market',
    role:'Owns the customer relationship and the pipeline. In this role, your primary day-to-day counterpart.',
    wants:'Something to sell now, credible dates, and no surprises in front of a customer.',
    tension:'Measured on the deal in front of them; the PM is measured on the portfolio behind it.',
    withPM:'Market signals in, roadmap and enablement out. Requests arrive as solutions and must be converted into problems with a reach test.',
    conflict:'A bespoke request for one large deal. Resolve with need, reach, cost, trade-off, alternative — and escalate as an explicit choice if it still stands.' },
  { id:'mkt', name:'Marketing', x:88, y:40, kind:'market',
    role:'Owns positioning at market level, content and demand generation.',
    wants:'A clear proposition, differentiation they can defend, and lead time before a launch.',
    tension:'Needs a stable message; the product keeps learning and changing it.',
    withPM:'Positioning, proof points, launch planning. The PM owns what may be claimed; marketing owns how it is expressed.',
    conflict:'Claims outrunning evidence. Resolve by supplying the boundary of each claim in writing.' },
  { id:'cs', name:'Customer Success & Support', x:80, y:74, kind:'operate',
    role:'Owns adoption, onboarding and the product for most of its life.',
    wants:'A supportable product, a runbook, and warning before anything changes.',
    tension:'Inherits every shortcut taken to hit a date.',
    withPM:'Adoption evidence, ticket patterns, onboarding design, knowledge transfer. The richest and most under-used source of product signal.',
    conflict:'Launching before support is ready. Resolve by making support readiness a release criterion, not a follow-up.' },
  { id:'ops', name:'Operations', x:60, y:86, kind:'operate',
    role:'Runs the service day to day: routing, incident response, service levels.',
    wants:'Predictability, a routing matrix that works, and no undocumented behaviour.',
    tension:'Carries the cost of every product decision made without them in the room.',
    withPM:'SLAs, routing, incident feedback, capacity. The operating model is designed jointly or it is designed badly.',
    conflict:'Feature velocity versus operational load. Resolve with an error budget or an explicit reliability slice of capacity.' },
  { id:'legal', name:'Legal, Privacy & Security', x:20, y:74, kind:'govern',
    role:'Owns what is permissible. Can stop a product outright, and should.',
    wants:'To be asked early, with a precise question rather than a finished plan.',
    tension:'Engaged late they look like blockers; engaged early they are the cheapest constraint you will ever discover.',
    withPM:'Lawful basis, permitted use, contract terms, DPIAs, security requirements. The PM frames the question; they own the answer.',
    conflict:'A late objection before launch. Resolve by moving the touchpoint to definition — a standing slot, not an escalation.' },
  { id:'brand', name:'Brand', x:38, y:88, kind:'govern',
    role:'Owns how each Group brand is represented and what may be done with its data and identity.',
    wants:'Consistency, and control over how their brand appears in someone else\'s product.',
    tension:'A multi-brand data product has multiple brand owners with non-identical rules.',
    withPM:'Brand requirements as a named requirement family — the ad lists it alongside technical, legal, privacy and commercial.',
    conflict:'A partner wanting to present data in a way one brand restricts. Resolve by discovering the constraint at definition.' },
  { id:'fin', name:'Finance & Pricing', x:12, y:48, kind:'govern',
    role:'Owns the business case, margin, pricing approval and revenue recognition.',
    wants:'A defensible model, predictable revenue, and no ad-hoc discounting.',
    tension:'Wants price stability; the market wants flexibility.',
    withPM:'Business case, pricing metric, cost to serve, discount policy.',
    conflict:'Discounting to close deals. Resolve with an approval matrix rather than case-by-case negotiation.' },
  { id:'lead', name:'Portfolio Leadership', x:50, y:8, kind:'lead',
    role:'Sets portfolio goals, allocates investment, arbitrates trade-offs above the PM\'s decision right, and approves gates.',
    wants:'Progress against portfolio goals, early warning, and decisions brought as options rather than problems.',
    tension:'Wants both ambition and predictability.',
    withPM:'Strategy translation, gate decisions, escalations, resource allocation.',
    conflict:'A commitment made above you that the evidence does not support. Resolve by putting the trade-off in writing with options and a recommendation.' },
  { id:'partner', name:'Partners & Ecosystem', x:88, y:58, kind:'market',
    role:'External organisations that embed, resell or supply. In this business, a major route to market.',
    wants:'Interface stability, notice before change, and margin.',
    tension:'They have their own roadmap, their own customers, and escalation power your direct customers do not have.',
    withPM:'Integration specification, deprecation policy, joint support routing, joint reviews.',
    conflict:'A breaking change you need and they cannot absorb. Resolve with versioning, notice and a parallel-run window.' }
];

export const EDGES = [
  ['pm','eng'],['pm','design'],['pm','sales'],['pm','mkt'],['pm','cs'],['pm','ops'],
  ['pm','legal'],['pm','brand'],['pm','fin'],['pm','lead'],['pm','partner'],
  ['sales','mkt'],['sales','partner'],['cs','ops'],['eng','ops'],['legal','brand'],['fin','lead'],['eng','design']
];

export const ALTITUDE = [
  {
    id:'strategic', label:'Strategic', horizon:'Quarters to years',
    q:'Are we solving the right problem for the right customer?',
    work:['Product vision and strategy','Portfolio choices and non-goals','Market and segment selection','Pricing model and commercial construct','Build / buy / partner decisions'],
    decides:'Portfolio leadership decides; the PM recommends with evidence.',
    trap:'Doing only this and losing credibility with the delivery team.',
    you:'Your portfolio work — role classification, range gap analysis, end-of-life recommendations — is strategic product work, even though the sign-off sits above you.'
  },
  {
    id:'tactical', label:'Tactical', horizon:'Weeks to a quarter',
    q:'What do we build next, and in what order?',
    work:['Roadmap and sequence','Prioritisation and trade-offs','Requirements and acceptance criteria','Go-to-market planning','Dependency and risk management'],
    decides:'The PM decides, within the strategy and with the team\'s input on cost.',
    trap:'Treating tactical choices as strategic ones and escalating what you should own.',
    you:'This is where most of your current work sits, and where the ad expects you to step up from recommending to owning.'
  },
  {
    id:'operational', label:'Operational', horizon:'Days to weeks',
    q:'Is it working, and what is in the way today?',
    work:['Refinement and clarification','Unblocking the team','Incident and escalation response','Service reviews and routing','Customer and Sales questions'],
    decides:'The team decides most of it; the PM decides scope calls and unblocks.',
    trap:'Being consumed by it. Without a routing matrix, every operational question becomes yours.',
    you:'The ad\'s KPIs, SLAs and routing bullet is operational product work — the part most PMs neglect and this role names explicitly.'
  }
];

export const DECISION_RIGHTS = [
  { decision:'Product vision and strategy',       pm:'Recommend', other:'Portfolio leadership decides', note:'Bring options and non-goals, not a single plan.' },
  { decision:'Roadmap sequence',                  pm:'Decide (usually)', other:'Leadership reviews', note:'The most commonly contested boundary. Establish it in your first month.' },
  { decision:'Backlog order',                     pm:'Decide', other:'Team informs cost', note:'Not shared. A shared backlog order is several backlogs pretending to be one.' },
  { decision:'How something is built',            pm:'Input only', other:'Engineering decides', note:'State the constraint and the outcome, not the mechanism.' },
  { decision:'Whether data may be used for a purpose', pm:'Frame the question', other:'Legal and privacy decide', note:'Never a PM decision. Bring the question at ideation.' },
  { decision:'Pricing metric and rate card',      pm:'Recommend', other:'Finance and leadership decide', note:'Close to irreversible once contracted.' },
  { decision:'Go / no-go at launch',              pm:'Decide (usually)', other:'Blocked by legal, privacy, security', note:'You can say no alone; you cannot say yes over a blocking function.' },
  { decision:'Accepting a residual risk',         pm:'Depends on the risk', other:'Named owner accepts', note:'Financial and legal risk acceptance is not within a PM\'s remit.' },
  { decision:'SLA committed to a customer',       pm:'Recommend from measurement', other:'Commercial and legal contract it', note:'Never promise what you have not measured.' },
  { decision:'Breaking change to a partner interface', pm:'Decide with policy', other:'Partnerships and the partner are consulted', note:'Governed by the published deprecation policy, agreed in advance.' }
];

export const ORG_SHAPES = [
  { id:'matrix', title:'Large matrixed group', where:'Saint-Gobain, Volkswagen Group Info Services',
    traits:['Decision rights are formal and often shared','Compliance and brand functions have real veto power','Long approval chains; escalation is a defined route','Portfolio goals cascade down from above'],
    pmreality:'Influence runs on evidence, documentation and relationships built before you need them. Written artefacts do more work than meetings.' },
  { id:'startup', title:'Startup or new hub', where:'The GIS:Hub as described in the ad',
    traits:['Decision rights are unclear because nobody has written them down','Process is created by whoever creates it first','Speed is high; institutional memory is thin','Everyone does several jobs'],
    pmreality:'The highest-value early act is usually clarifying who decides what — not producing a roadmap. Write it down and let people correct it.' },
  { id:'joint', title:'Joint venture between two parents', where:'GIS + Digital:Hub — this role specifically',
    traits:['Two operating tempos and two definitions of done','Duplicate or conflicting governance requirements','Loyalties and reporting lines that are not obvious','Interfaces to both parents to maintain'],
    pmreality:'You sit on the seam. Expect structural conflict rather than personal conflict, and treat translation between the two cultures as part of the job description.' },
  { id:'productled', title:'Product-led software company', where:'Typical SaaS',
    traits:['PM owns roadmap outright','Metrics instrumented and trusted','Experimentation infrastructure available','Design and research embedded in the team'],
    pmreality:'Higher autonomy, higher accountability. Data settles more arguments; opinion settles fewer.' }
];
