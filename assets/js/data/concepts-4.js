/* Module 6 — People & influence, Module 7 — Commercial & domain */
export default [
{
  id: 'stakeholders', module: 'm6', order: 18, minutes: 11,
  title: 'Stakeholder management',
  oneLine: 'Knowing who cares, what they need, what they can block — and keeping them informed before they have to ask.',
  definition: 'Stakeholder management is the deliberate practice of identifying everyone with an interest in or influence over the product, understanding what success means to each, and maintaining the right level of involvement for each. It is not diplomacy for its own sake: the purpose is that decisions hold, and that people who could block late are engaged early enough to shape rather than veto.',
  why: 'A product manager typically has responsibility without authority. Almost everything you need — engineering time, legal approval, a brand sign-off, a sales team\'s attention — belongs to someone who does not report to you. Stakeholder management is how that works. Its absence shows up as late vetoes, surprise escalations, and decisions that get reopened.',
  when: 'From the first day on a product; refreshed whenever the organization, the stakeholders or the product\'s stage changes.',
  people: [
    { who: 'Product Manager', does: 'Maps, engages, communicates, and decides what is escalated versus absorbed.' },
    { who: 'Sponsor', does: 'Provides air cover and settles above your decision right.' },
    { who: 'Blocking stakeholders', does: 'Legal, privacy, security, brand — can stop the product. Engage early, always.' },
    { who: 'Delivery stakeholders', does: 'Engineering, data, operations — deliver it.' },
    { who: 'Commercial stakeholders', does: 'Sales, pricing, partnerships — carry it to market.' }
  ],
  inputs: ['Organization and decision-rights map', 'Each stakeholder\'s goals and measures', 'History of past decisions and conflicts', 'Communication preferences'],
  activities: ['Map by influence and interest', 'Learn what each is measured on', 'Agree a communication rhythm for each group', 'Engage blockers before commitment, not after', 'Log decisions so they are not re-litigated'],
  outputs: ['Stakeholder map', 'Communication plan', 'Decision log', 'Escalation path'],
  outcomes: ['Fewer late surprises', 'Decisions that survive', 'A PM who is trusted with more decision right over time'],
  example: {
    title: 'Engage the blocker before the commitment',
    body: 'A brand-side stakeholder can restrict how their vehicle data is presented in a partner\'s product. If you discover this at go-live, the launch slips and the relationship sours. If you discover it in definition, it is a requirement like any other, and often a smaller one than feared. The pattern generalizes: the stakeholders who can stop you should hear about a product while it is still a question, not once it is a plan. It costs a half-hour meeting and it converts a veto into a constraint — which is the whole trick. The corollary is that you should know, before you start, which four or five people in the organization can stop the thing.'
  },
  mistakes: [
    { mistake: 'Treating stakeholder management as sending updates.', instead: 'It is understanding what each person is measured on. The update is downstream of that.' },
    { mistake: 'Engaging legal and privacy at the end.', instead: 'They are the cheapest constraint to discover early and the most expensive to discover late.' },
    { mistake: 'Communicating the same content to everyone.', instead: 'An executive wants the decision and the risk; a delivery team wants the detail. Same truth, different cut.' },
    { mistake: 'Avoiding a difficult stakeholder.', instead: 'The one you avoid is the one who escalates. Go earlier, not later.' },
    { mistake: 'Never writing decisions down.', instead: 'Undocumented decisions get reopened by whoever missed the meeting.' }
  ],
  tools: [
    { name: 'Power/interest grid', note: 'Manage closely, keep satisfied, keep informed, monitor. Crude but fast.' },
    { name: 'RACI / RAPID', note: 'RAPID names who Recommends, Agrees, Performs, Inputs, Decides. Better than RACI for genuinely contested decisions.' },
    { name: 'Decision log / ADR', note: 'Decision, options considered, rationale, date, decider. Ends most re-litigation.' },
    { name: 'Communication plan', note: 'Who hears what, how often, in what format.' },
    { name: 'Pre-wire', note: 'Never let a stakeholder meet a significant decision for the first time in a group meeting.' }
  ],
  check: {
    q: 'A privacy stakeholder raises an objection two days before launch that would have been trivial to handle in definition. What does this most indicate?',
    options: [
      'The privacy team is being obstructive.',
      'A stakeholder-mapping failure: someone who could block the product was engaged after commitment rather than before.',
      'The requirement was genuinely unforeseeable.',
      'The launch timeline was too aggressive.'
    ],
    answer: 1,
    why: 'Blocking stakeholders raising blocking concerns is them doing their job. The failure is in when they were consulted. The fix is a mapping and rhythm change, not a complaint.'
  },
  ownWords: 'Map five stakeholders on something you work on: what each is measured on, and which of them could stop it.',
  teachBack: {
    prompt: 'Explain "influencing without authority" to someone who thinks it just means being persuasive.',
    mustMention: ['measured', 'decision right', 'early', 'blocker']
  },
  roleLink: { reqs: ['r4', 'i2', 'r3'], text: 'The requirement families in the ad — technical, legal, privacy, commercial, brand — are also a stakeholder list. Each family has an owner who can stop you, and in a two-parent hub some of them sit in a different company and country.' },
  youLink: { evidence: ['e-crossfunctional', 'e-leadership', 'e-method-deliverers'], text: 'Stakeholder alignment and influencing without authority are named competencies, you coordinate five functions plus external suppliers, and one of your six principles is involving the people who will use, sell, support and operate the product early enough to surface dependencies. That principle is this concept, stated well.' },
  depends: [],
  glossary: ['stakeholder-map', 'raci', 'rapid', 'decision-log', 'pre-wire', 'influence']
},

{
  id: 'crossfunctional', module: 'm6', order: 19, minutes: 10,
  title: 'Cross-functional collaboration',
  oneLine: 'Getting people with different goals, different vocabulary and different ideas of finished to build one thing.',
  definition: 'Cross-functional collaboration is the day-to-day mechanics of working across functions: shared goals rather than handoffs, a common vocabulary, explicit interfaces between teams, and a way to resolve disagreement that does not depend on escalation every time. It differs from stakeholder management, which is about influence and information; this is about doing the work together.',
  why: 'A data product touches engineering, data, legal, privacy, sales, support, finance and brand. Each function optimizes for something real and different: engineering for maintainability, legal for defensibility, sales for the deal in front of them, support for resolvable tickets. Collaboration is not making them agree; it is making the trade-offs visible so the right person can choose.',
  when: 'Continuously — most intensively at definition, at go-live, and whenever an incident crosses boundaries.',
  people: [
    { who: 'Product Manager', does: 'Holds the shared outcome and translates between vocabularies.' },
    { who: 'Engineering and data', does: 'Build; own feasibility and long-run cost.' },
    { who: 'Design', does: 'Owns the experience, including the developer experience for an API product.' },
    { who: 'Sales and marketing', does: 'Own the market conversation and the promise made to customers.' },
    { who: 'Legal, privacy, security, brand', does: 'Own the boundaries.' },
    { who: 'Support and operations', does: 'Own the product for most of its life.' },
    { who: 'Finance', does: 'Owns the business case and the cost of serving.' }
  ],
  inputs: ['Shared outcome and success measures', 'Each function\'s constraints and incentives', 'Working agreements', 'Shared artifacts and single source of truth'],
  activities: ['Agree one outcome everyone is serving', 'Establish shared vocabulary — write the definitions down', 'Make interfaces explicit: who needs what from whom, when', 'Resolve conflicts at the lowest level that can decide', 'Close the loop back to whoever raised the issue'],
  outputs: ['Working agreements', 'Shared definitions and glossary', 'Joint plans and interface commitments', 'Retrospectives that cross function boundaries'],
  outcomes: ['Fewer handoff failures', 'Decisions made lower down and faster', 'Trust that survives disagreement'],
  example: {
    title: '"Active vehicle" means four different things',
    body: 'Sales counts a vehicle as active when it is on a signed contract. Engineering counts it when it has called the API in the last 30 days. Finance counts it when it has been invoiced. Support counts it when it has ever produced a ticket. Four dashboards, four numbers, and a monthly meeting spent reconciling them rather than deciding anything. The fix is unexciting and enormously valuable: agree one definition, write it in a shared glossary, name which metric uses which, and let the others exist as clearly-named variants. A PM who does this in their first month buys back a meeting a month for a year.'
  },
  mistakes: [
    { mistake: 'Assuming shared words mean shared definitions.', instead: 'Write the definitions down. "Active", "launched", "done" and "customer" are the usual offenders.' },
    { mistake: 'Escalating every disagreement.', instead: 'Escalation is a tool with a cost. Resolve at the lowest level that can actually decide.' },
    { mistake: 'Being the only channel between two teams.', instead: 'If engineering and support only talk through you, you are a bottleneck and a distortion. Connect them directly.' },
    { mistake: 'Treating support and operations as downstream recipients.', instead: 'They own the product longest. Bring them into definition.' },
    { mistake: 'Winning the argument.', instead: 'The goal is the best decision with everyone still willing to work with you next week.' }
  ],
  tools: [
    { name: 'Working agreements', note: 'How this group makes decisions, communicates, and handles disagreement. Written, short.' },
    { name: 'Shared glossary', note: 'The cheapest cross-functional intervention that exists.' },
    { name: 'Team API / interface doc', note: 'What this team provides, needs, and how to reach it.' },
    { name: 'Joint definition of done', note: 'Includes support readiness and compliance, not only code.' },
    { name: 'Disagree and commit', note: 'A norm that lets a decision proceed without pretending consensus.' }
  ],
  check: {
    q: 'Engineering and Sales disagree about whether a partner integration is "done". What is the most useful first move?',
    options: [
      'Escalate to the head of product for a ruling.',
      'Side with Sales, since the customer is waiting.',
      'Establish whether they are using the same definition of done — most such disagreements are definitional, not substantive — and write the agreed one down.',
      'Ask engineering for an estimate to close the remaining work.'
    ],
    answer: 2,
    why: 'Much of cross-functional conflict is two correct people using one word differently. Checking the definition costs ten minutes and often dissolves the dispute; escalating first spends credibility on something that was never a real disagreement.'
  },
  ownWords: 'Name one term in your organization that different functions define differently, and what it costs.',
  teachBack: {
    prompt: 'Explain to a new PM why being the only communication channel between two teams is a problem, not a sign of importance.',
    mustMention: ['bottleneck', 'distortion', 'direct', 'trust']
  },
  roleLink: { reqs: ['r4', 'r3', 'i2'], text: 'The role sits between two parent organizations with different tempos, and interfaces daily with Sales. Expect vocabulary and definition-of-done mismatches to be a real, recurring part of the job rather than an occasional annoyance.' },
  youLink: { evidence: ['e-crossfunctional', 'e-app-learning', 'e-productdata'], text: 'You coordinate marketing, sales, supply chain, analytics and external suppliers today. And your pricing-app learning — that UX and system requirements were never in competition, the repeated manual reconciliation between them was the cost — is a cross-functional insight, not a technical one.' },
  depends: ['stakeholders'],
  glossary: ['working-agreement', 'definition-of-done', 'handoff', 'disagree-and-commit']
},

{
  id: 'leadership', module: 'm6', order: 20, minutes: 11,
  title: 'Product leadership and decision-making',
  oneLine: 'Making good calls with incomplete information, and taking responsibility for them afterwards.',
  definition: 'Product leadership is influence exercised without formal authority: setting direction people choose to follow, making decisions at the right speed and the right level, and creating the conditions in which a team can decide well without you. Decision-making is its core craft — knowing which decisions are reversible and can be made fast, which are not and deserve deliberation, and which are not yours to make at all.',
  why: 'Speed and quality of decisions compound. A team that waits on the PM for every call moves at the PM\'s throughput. A PM who makes irreversible decisions quickly, or reversible ones slowly, damages the product in opposite ways. And a PM who cannot say "I got that wrong" trains a team to hide problems.',
  when: 'Continuously. Most visibly under time pressure, in conflict, and after a mistake.',
  people: [
    { who: 'Product Manager', does: 'Decides within their remit, escalates outside it, and owns the outcome either way.' },
    { who: 'Team', does: 'Should be able to make most day-to-day decisions without asking.' },
    { who: 'Leadership', does: 'Owns irreversible, high-stakes and cross-portfolio decisions.' },
    { who: 'Specialist owners', does: 'Legal, privacy, security decisions belong to them, not to you.' }
  ],
  inputs: ['Strategy and decision rights', 'Available evidence and its confidence', 'Reversibility and cost of delay', 'The team\'s context and capability'],
  activities: ['Classify the decision: reversible or not, yours or not', 'Gather evidence proportionate to the stakes', 'Decide and state the rationale', 'Record it', 'Revisit when evidence changes, and say so plainly'],
  outputs: ['Decisions with rationale', 'Decision records', 'Clear delegation boundaries', 'Post-decision reviews'],
  outcomes: ['A team that decides well without you', 'Faster progress', 'Trust that survives a wrong call'],
  example: {
    title: 'Two doors',
    body: 'Reversible decision: which field name to use in a beta endpoint that three internal partners consume. Cost of changing later is a rename and a note. Decide in an hour, alone, and move. Irreversible decision: the pricing metric for a data product — per call, per vehicle, or per use case. Once partners have contracted and built business cases on it, changing it means renegotiating every contract. That one deserves evidence, a written recommendation, several stakeholders, and a decision-maker above you. Most PM decision pain comes from applying the wrong mode: agonising over the field name and deciding the pricing metric in a corridor.'
  },
  mistakes: [
    { mistake: 'Deciding everything yourself.', instead: 'Push decisions down with clear boundaries. Your throughput is not the product\'s speed limit.' },
    { mistake: 'Treating every decision as high-stakes.', instead: 'Ask what it costs to reverse. Most cost very little.' },
    { mistake: 'Waiting for certainty.', instead: 'Decide at the point where more information costs more than the risk it removes.' },
    { mistake: 'Deciding something that belongs to legal, privacy or security.', instead: 'Bring them the question. Accepting a legal risk is not within a product manager\'s authority.' },
    { mistake: 'Defending a decision after the evidence turned.', instead: 'Change it and say why. Consistency is not a product value.' },
    { mistake: 'Taking credit and distributing blame.', instead: 'The reverse. It is the whole basis of influence without authority.' }
  ],
  tools: [
    { name: 'One-way vs two-way doors', note: 'Reversibility determines the speed and the ceremony a decision deserves.' },
    { name: 'RAPID', note: 'Recommend, Agree, Perform, Input, Decide. Names who does what in a contested decision.' },
    { name: 'Decision record (ADR)', note: 'Context, options, decision, consequences. One page.' },
    { name: 'Disagree and commit', note: 'Lets a decision proceed without false consensus, and without silent sabotage.' },
    { name: 'Pre-mortem', note: 'Surfaces the objection people will not voice before the decision is made.' }
  ],
  check: {
    q: 'You must choose a pricing metric for a new data product — per call, per vehicle, or per use case. How should this decision be handled?',
    options: [
      'Decide quickly to unblock the team; it can be changed later if wrong.',
      'Treat it as largely irreversible once partners contract on it: gather evidence, write a recommendation with options and consequences, and take it to the decision-maker who owns commercial model.',
      'Let Sales decide, since they know what customers will pay.',
      'Copy the metric a competitor uses.'
    ],
    answer: 1,
    why: 'Pricing metrics get embedded in contracts, partner business cases and internal reporting. Changing one later is a renegotiation, not a release. That reversibility profile determines both the effort and the decision-maker.'
  },
  ownWords: 'Describe a decision you made with incomplete information: what you decided, why, and what you would do differently.',
  teachBack: {
    prompt: 'Explain how you decide whether a decision is yours to make.',
    mustMention: ['reversible', 'decision right', 'escalate', 'stakes']
  },
  roleLink: { reqs: ['r12', 'i1'], text: '"Leadership and personal competencies such as an ownership mindset", and a culture paragraph asking for pioneers who take ownership. In a hub being built from the ground up, decision rights will be genuinely unclear for a while — the leadership act is often clarifying who decides, not deciding.' },
  youLink: { evidence: ['e-app-built', 'e-leadership', 'e-salesteam', 'e-method-outcome'], text: 'You led a commercial team, you influence without authority, and you framed, specified and built the pricing application rather than waiting for it. Tell that story as ownership: you saw a preventable risk in a handoff and you closed it end to end.' },
  depends: ['stakeholders'],
  glossary: ['one-way-door', 'rapid', 'adr', 'decision-right', 'disagree-and-commit']
},

{
  id: 'gtm', module: 'm7', order: 21, minutes: 12,
  title: 'Go-to-market strategy',
  oneLine: 'The plan for how a product reaches, convinces, onboards and keeps its buyers.',
  definition: 'Go-to-market covers segment and targeting, positioning and messaging, pricing and packaging, channel and motion (self-serve, sales-led, partner-led), enablement, launch execution, and the post-launch loop that tells you whether any of it worked. It is not launch communications; launch is one event inside it. In B2B the largest determinant of success is usually the sales motion and the onboarding path, not the messaging.',
  why: 'A product nobody can find, understand, buy or integrate does not exist commercially. In a data business go-to-market is unusually product-shaped: the contract structure, the use-case definition and the integration effort are all part of what the customer buys, and all sit within the PM\'s remit.',
  when: 'Planned from definition, tightened through validation, executed at launch, and iterated continuously after.',
  people: [
    { who: 'Product Manager', does: 'Owns readiness, the proposition, and the boundaries of what may be claimed.' },
    { who: 'Sales', does: 'Owns the customer conversation and the pipeline.' },
    { who: 'Marketing', does: 'Owns positioning at market level, content and demand generation.' },
    { who: 'Partnerships', does: 'Owns channel routes — often the fastest path in a data business.' },
    { who: 'Customer success / onboarding', does: 'Owns time-to-first-value.' },
    { who: 'Legal and finance', does: 'Own contract templates and pricing approval.' }
  ],
  inputs: ['Segment and value proposition', 'Pricing and packaging', 'Channel and partner options', 'Competitive alternatives', 'Onboarding and support readiness'],
  activities: ['Choose the target segment and the motion', 'Build messaging and enablement, including limits', 'Set pricing and packaging', 'Prepare onboarding and time-to-first-value', 'Run the launch', 'Measure adoption and iterate'],
  outputs: ['GTM plan', 'Sales enablement pack and objection handling', 'Pricing and packaging', 'Onboarding path', 'Launch metrics and review'],
  outcomes: ['Buyers who understand what they are buying', 'Faster time to first value', 'Adoption rather than merely availability'],
  example: {
    title: 'Partner-led is a different product',
    body: 'A vehicle-data business can go direct to fleet operators, or through the telematics and fleet-management platforms those operators already use. GIS has publicly announced exactly this kind of partnership route. The second motion reaches far more vehicles far faster — but it changes the product: your customer is now a platform with its own roadmap, your integration surface must be stable enough for someone else to build a business on, your support routing gains a tier, and your pricing has to leave margin for the partner. That is why go-to-market cannot be decided after the product is built. The motion determines the requirements.'
  },
  mistakes: [
    { mistake: 'Treating go-to-market as marketing\'s job.', instead: 'Pricing, packaging, use-case scope and integration effort are product decisions with commercial consequences.' },
    { mistake: 'Enabling Sales on capability but not on limits.', instead: 'Most post-launch damage comes from something Sales sincerely believed the product did.' },
    { mistake: 'Launching without an onboarding path.', instead: 'In B2B, time-to-first-value is the number that predicts renewal. Design it before launch.' },
    { mistake: 'Assuming availability creates adoption.', instead: 'Diagnose the actual barrier — demand, access, confidence or follow-through — before adding enablement nobody needed.' },
    { mistake: 'One launch, then attention moves on.', instead: 'Adoption is a curve, not an event. Plan a second and third push.' }
  ],
  tools: [
    { name: 'GTM canvas', note: 'Segment, proposition, pricing, channel, motion, enablement, metrics on one page.' },
    { name: 'Launch tiers', note: 'Not every release needs a full launch. Tier by customer impact.' },
    { name: 'Sales enablement kit', note: 'Proposition, proof points, objection handling, and an explicit "what it does not do".' },
    { name: 'Time-to-first-value', note: 'The single most predictive B2B onboarding metric.' },
    { name: 'Win/loss review', note: 'Closes the loop from market back into product.' }
  ],
  check: {
    q: 'A product is available, Sales has been trained, and adoption is still low after a quarter. What should you do first?',
    options: [
      'Run more training sessions with the sales team.',
      'Reduce the price to remove the barrier.',
      'Diagnose which barrier is actually binding — demand, access, confidence, or follow-through — before choosing an intervention.',
      'Add the features customers mentioned during the launch.'
    ],
    answer: 2,
    why: 'Each barrier needs a different remedy, and training is the default reflex regardless of diagnosis. Training attendance is an output; if the barrier is access or confidence, more of it changes nothing.'
  },
  ownWords: 'Sketch a go-to-market plan for a product you know: segment, motion, proposition, one pricing question, and how you would measure the first 90 days.',
  teachBack: {
    prompt: 'Explain why a partner-led motion changes the product itself, not just how it is sold.',
    mustMention: ['integration', 'margin', 'support', 'roadmap']
  },
  roleLink: { reqs: ['r5', 'r6', 'i3'], text: '"Collaborate closely with Sales to align on market needs, feature prioritization, and go-to-market readiness", plus onboarding in the go-live bullet. Given the public partnership announcements, expect the partner motion to be central rather than an afterthought.' },
  youLink: { evidence: ['e-gtm', 'e-launchcoord', 'e-adoption', 'e-fourgates'], text: 'Strong ground for you. You develop positioning, value propositions and go-to-market plans today, you coordinated onboarding and adoption for software-module launches, and your adoption framework already makes the point that availability does not create adoption.' },
  depends: ['valueprop', 'delivery'],
  glossary: ['gtm', 'motion', 'enablement', 'time-to-first-value', 'packaging', 'channel']
},

{
  id: 'commercial', module: 'm7', order: 22, minutes: 12,
  title: 'Commercial models and pricing for B2B data',
  oneLine: 'Choosing what the customer pays for, and why that unit is the right one.',
  definition: 'A commercial model has three parts: the pricing metric (the unit you charge for), the packaging (what is bundled into which tier), and the terms (commitment, duration, scope of permitted use). For data products the metric is unusually consequential because marginal cost is near zero — so price expresses value and permission, not cost. The scope of permitted use is often the real product boundary: the same data at a different purpose is a different product.',
  why: 'The pricing metric shapes customer behavior, revenue predictability and your own roadmap. Charge per API call and customers optimize calls, which punishes them for using you well. Charge per vehicle and revenue tracks the customer\'s growth. Charge per use case and you must define use cases precisely — which is a product-definition task, not a commercial one.',
  when: 'Decided during definition, tested in validation, and revisited rarely — because changing it means renegotiating.',
  people: [
    { who: 'Product Manager', does: 'Owns packaging and the definition of a use case; recommends the metric.' },
    { who: 'Pricing / finance', does: 'Owns margin, approval and revenue modeling.' },
    { who: 'Sales', does: 'Tests willingness to pay in real negotiations and reports where the model breaks.' },
    { who: 'Legal', does: 'Turns permitted use into contractual language that is enforceable.' },
    { who: 'Leadership', does: 'Approves the model, because it is close to irreversible.' }
  ],
  inputs: ['Value delivered per customer segment', 'Competitive and alternative pricing', 'Cost to serve, including support', 'Contract and regulatory constraints', 'Willingness-to-pay evidence'],
  activities: ['Choose a metric that scales with customer value', 'Define tiers and what separates them', 'Define permitted use precisely', 'Model revenue and margin across scenarios', 'Test in real negotiations', 'Set a review trigger'],
  outputs: ['Pricing metric and rate card', 'Packaging and tier definitions', 'Use-case definitions', 'Discount and approval policy', 'Revenue model'],
  outcomes: ['Revenue that grows with delivered value', 'Fewer bespoke deals', 'A sales team that can quote without escalating'],
  example: {
    title: 'One contract per use case',
    body: 'GIS describes its Data Hub publicly as "one face, one contract per use case, one system". Read that as a product decision, not a sales convenience. It means a use case must be definable, boundable and enforceable: the same VIN and the same field, used for predictive maintenance versus insurance risk scoring, are two products with different permissions, different pricing and possibly different consent bases. The PM consequence is significant — when a customer asks to use existing data for a new purpose, that is not an upsell conversation, it is a new product definition with legal, privacy and brand requirements attached. Recognizing that distinction quickly is a large part of the job.'
  },
  mistakes: [
    { mistake: 'Pricing from cost.', instead: 'Near-zero marginal cost makes cost-plus meaningless. Price on value delivered and permission granted.' },
    { mistake: 'A metric that punishes good usage.', instead: 'Per-call pricing makes customers ration the thing you want them to depend on.' },
    { mistake: 'Vague use-case definitions.', instead: 'If a use case cannot be described precisely enough to enforce, it cannot be priced or contracted.' },
    { mistake: 'Discounting to close, with no policy.', instead: 'An approval policy protects the price list. Ad-hoc discounts become the price list within two quarters.' },
    { mistake: 'Treating pricing as commercial-only.', instead: 'The metric determines what you must measure, meter, expose and support. It is a product requirement.' }
  ],
  tools: [
    { name: 'Pricing metric analysis', note: 'Does it scale with value, is it predictable, is it meterable, does it survive customer growth?' },
    { name: 'Good-better-best packaging', note: 'Three tiers, each with a clear reason to move up.' },
    { name: 'Van Westendorp / willingness-to-pay research', note: 'Rough but better than guessing.' },
    { name: 'Value stick', note: 'Willingness to pay, price, cost — where value is created versus captured.' },
    { name: 'Deal desk / approval matrix', note: 'Who may discount how much, and what is escalated.' }
  ],
  check: {
    q: 'An existing customer wants to use data they already receive for a new purpose — insurance risk scoring instead of maintenance. Under a per-use-case model, what is this?',
    options: [
      'A simple contract amendment handled by Sales.',
      'An upsell with no product implications, since the data is unchanged.',
      'A new product definition: different permitted purpose, possibly a different consent basis, different legal, privacy and brand requirements — and therefore a PM decision, not just a commercial one.',
      'A pricing question only.'
    ],
    answer: 2,
    why: 'In a permission-based data business the purpose is part of the product. The same field used for a different purpose can require a different lawful basis and can be restricted by brand agreements, regardless of the fact that no new engineering is needed.'
  },
  ownWords: 'For a product you know, name the pricing metric and argue whether it scales with the value the customer receives.',
  teachBack: {
    prompt: 'Explain why "one contract per use case" is a product design decision as much as a commercial one.',
    mustMention: ['permitted use', 'purpose', 'definition', 'enforce']
  },
  roleLink: { reqs: ['i3', 'r3', 'r4'], text: 'The ad lists commercial requirements as one of the five families you must define and align. Combined with the Sales interface responsibility, expect commercial-model questions to come up in the form of customer requests you must handle.' },
  youLink: { evidence: ['e-suppliers', 'e-pricingpassthrough', 'e-zenhome', 'e-feedbackloop'], text: 'You assess supplier cost changes against net prices, discount structures and target margins; you refuse uniform pass-through because products play different roles; and on ZenHome you built an export price from €57.32 through to an €81.13 destination RRP. Say plainly that the near-zero marginal cost of data changes the logic — that shows you understand the transfer rather than assuming it.' },
  depends: ['valueprop', 'gtm'],
  glossary: ['pricing-metric', 'packaging', 'permitted-use', 'cost-to-serve', 'willingness-to-pay', 'use-case']
}
];
