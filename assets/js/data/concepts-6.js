/* The organization lesson — folded in from the old standalone map */
export default [
{
  id: 'orgmap', module: 'm6', order: 21, minutes: 12,
  title: 'Where product sits, and who decides what',
  oneLine: 'Almost no one reports to you, so the first thing to work out is who is allowed to say yes.',
  definition: 'Product management sits at the center of a set of functions it does not control: engineering and data, design, sales, marketing, partnerships, customer success, operations, legal, privacy, security, brand, finance and portfolio leadership. Each optimizes for something real and different. Decision rights describe which of them is allowed to decide what — and in most organizations that is understood informally, inconsistently, and differently by each function.',
  why: 'A product manager has responsibility without authority. Every input you need belongs to someone else, and every output you produce lands on someone else. Where decision rights are unclear, each decision costs days of review and eventually gets made by whoever is most confident rather than whoever is accountable.',
  when: 'From your first week. Again whenever the organization, the stakeholders, or the product\'s stage changes. Most urgently in a newly formed team, where nobody has written it down.',
  people: [
    { who: 'Product Manager', does: 'Owns the problem, the outcome and the sequence. Decides what gets built and in what order.' },
    { who: 'Engineering and data', does: 'Own how it is built, feasibility, and the long-run cost of today\'s decisions.' },
    { who: 'Design', does: 'Owns the experience — including developer experience for an API product.' },
    { who: 'Sales', does: 'Owns the customer relationship and the pipeline. Measured on the deal in front of them.' },
    { who: 'Legal, privacy, security, brand', does: 'Own what is permissible. Can stop a product outright, and should.' },
    { who: 'Operations and support', does: 'Own the product for most of its life, and inherit every shortcut taken to hit a date.' },
    { who: 'Finance and pricing', does: 'Own margin, pricing approval and the business case.' },
    { who: 'Portfolio leadership', does: 'Sets the goals, allocates investment, and settles above your decision right.' },
    { who: 'Partners', does: 'External, uncontrolled, with their own roadmap and escalation power your direct customers lack.' }
  ],
  inputs: ['The organization chart, and the real one underneath it', 'What each function is measured on', 'The history of past decisions and conflicts', 'Any existing governance or gate process'],
  activities: ['Map who has influence and who can block', 'Write down your understanding of decision rights and invite correction', 'Agree the definitions everyone uses differently', 'Set standing touchpoints with blocking functions', 'Escalate structural ambiguity rather than absorbing it'],
  outputs: ['A decision-rights document', 'A stakeholder map', 'A shared glossary of contested terms', 'An escalation path'],
  outcomes: ['Decisions made once', 'Blocking concerns raised early, when they are cheap', 'Weeks of review time recovered'],
  decisionRights: [
    { d:'Product vision and strategy',       pm:'Recommend',      o:'Portfolio leadership decides', n:'Bring options and non-goals, not a single plan.' },
    { d:'Roadmap sequence',                  pm:'Decide',         o:'Leadership reviews',           n:'The most commonly contested boundary. Establish it in month one.' },
    { d:'Backlog order',                     pm:'Decide',         o:'Team informs cost',            n:'Not shared. A shared order is several backlogs pretending to be one.' },
    { d:'How something is built',            pm:'Input only',     o:'Engineering decides',          n:'State the constraint and the outcome, not the mechanism.' },
    { d:'Whether data may be used for a purpose', pm:'Frame the question', o:'Legal and privacy decide', n:'Never a PM decision. Bring it at ideation.' },
    { d:'Pricing metric and rate card',      pm:'Recommend',      o:'Finance and leadership decide', n:'Close to irreversible once contracted.' },
    { d:'Go / no-go at launch',              pm:'Decide',         o:'Blocked by legal, privacy, security', n:'You can say no alone. You cannot say yes over a blocking function.' },
    { d:'Accepting a residual risk',         pm:'Depends',        o:'Named owner accepts',          n:'Financial and legal risk acceptance is not within a product manager\'s authority.' },
    { d:'SLA committed to a customer',       pm:'Recommend',      o:'Commercial and legal contract it', n:'Never promise what you have not measured.' },
    { d:'Breaking change to a partner interface', pm:'Decide with policy', o:'Partnerships and the partner consulted', n:'Governed by the deprecation policy agreed in advance.' }
  ],
  example: {
    title: 'Strategic, tactical, operational — in the same week',
    body: 'The same product manager works at three levels. Strategic, over quarters: which segment, which non-goals, what the pricing model is — recommended by you, decided by portfolio leadership. Tactical, over weeks: the roadmap sequence, the prioritization, the requirements, the go-to-market plan — decided by you, within the strategy, with the team supplying cost. Operational, over days: refinement, unblocking, incidents, service reviews, answering Sales — mostly decided by the team, with you making scope calls. Confusing them is the common failure: escalating a tactical call wastes leadership time and credibility, while treating a strategic choice as tactical commits the organization to something nobody agreed to. And without a routing matrix, the operational layer expands until it consumes the other two.'
  },
  mistakes: [
    { mistake: 'Assuming decision rights are known because nobody has disputed them.', instead: 'Write down your understanding and share it. The corrections are the finding.' },
    { mistake: 'Treating blocking functions as obstacles.', instead: 'They are the cheapest constraint to discover early and the most expensive to discover late.' },
    { mistake: 'Being the only channel between two teams.', instead: 'That makes you a bottleneck and a distortion. Connect them directly.' },
    { mistake: 'Escalating every disagreement.', instead: 'Escalation has a cost. Resolve at the lowest level that can actually decide.' },
    { mistake: 'Accepting a risk that is not yours to accept.', instead: 'Legal, privacy and financial risk acceptance sits with named owners, never with the PM by default.' }
  ],
  tools: [
    { name: 'Power/interest grid', note: 'Manage closely, keep satisfied, keep informed, monitor. Crude and fast.' },
    { name: 'RAPID', note: 'Recommend, Agree, Perform, Input, Decide. Better than RACI for genuinely contested decisions.' },
    { name: 'Decision-rights document', note: 'Your understanding, shared for correction. The highest-leverage artifact in a new organization.' },
    { name: 'Shared glossary', note: 'The cheapest cross-functional intervention that exists.' },
    { name: 'Pre-wire', note: 'Never let a stakeholder meet a significant decision for the first time in a group meeting.' }
  ],
  roleLink: { reqs: ['i1', 'i2', 'r12'], text: 'The GIS:Hub is a joint venture between two parent organizations with different operating tempos and, almost certainly, different governance. The ad asks for pioneers with an ownership mindset. In a hub being built from the ground up, the highest-value early act is usually clarifying who decides — not producing a roadmap.' },
  youLink: { evidence: ['e-crossfunctional', 'e-leadership', 'e-method-deliverers'], text: 'Saint-Gobain is a large matrixed group and you already reconcile commercial, technical, supply, analytics and marketing priorities across two markets, plus external suppliers. Stakeholder alignment and influencing without authority are named competencies on your CV, and one of your six stated principles is involving the people who will use, sell, support and operate the product early enough to surface dependencies.' },
  depends: [],
  glossary: ['stakeholder-map', 'rapid', 'raci', 'decision-right', 'decision-log', 'pre-wire', 'influence']
}
];
