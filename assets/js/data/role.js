/* ============================================================
   role.js — decomposition of the GIS:Hub Product Manager ad,
   mapped against the Evidence Bank.

   `kind`  essential | desirable | implied
   `fit`   strong | partial | gap
   Every mapping cites evidence ids from profile.js.
   ============================================================ */

export const ROLE = {
  title: 'Product Manager',
  employer: 'Volkswagen Group Services — GIS:Hub, Barcelona',
  band: '€38,000 – €80,000 gross per year, depending on experience',
  ref: 'Level C',
  mission: 'Own data-driven B2B products end to end, through every phase of the Data Usage Process (DUP), for a newly forming hub built jointly by Volkswagen Group Info Services and the Volkswagen Digital:Hub.'
};

export const REQUIREMENTS = [
  /* ---------------- responsibilities ---------------- */
  {
    id: 'r1',
    kind: 'essential',
    area: 'Lifecycle ownership',
    title: 'Lead the product through all DUP lifecycle phases',
    jd: 'Lead the product through all DUP (Data Usage Process) lifecycle phases — from ideation, definition, and validation to delivery, operation, and iteration.',
    fit: 'strong',
    reading: 'This is the spine of the role. It reads as end-to-end ownership of one or more data products, inside a named internal process with defined phases and, almost certainly, gates and approvers at each one.',
    evidence: ['e-lifecycle', 'e-fourgates', 'e-method-outcome'],
    strength: 'You already run a product across ideation → definition → launch → post-launch, and you already think in gates. The four gates on your portfolio (need validation, commercial viability, operational readiness, adoption preparedness) map almost one-for-one onto ideation/definition/validation/delivery.',
    gap: 'DUP is a Volkswagen-internal process. Its exact phases, artefacts, approvers and exit criteria are not public. Do not pretend to know it.',
    action: 'Prepare one sentence that maps your gate model onto their phase names, and one good question asking how DUP phases are gated and who signs each one.',
    concepts: ['lifecycle', 'strategy', 'delivery'],
    weight: 5
  },
  {
    id: 'r2',
    kind: 'essential',
    area: 'Strategy → plan',
    title: 'Translate strategic portfolio goals into visions, backlogs and roadmaps',
    jd: 'Translate strategic portfolio goals into concrete product visions, backlogs, and roadmaps.',
    fit: 'partial',
    reading: 'Portfolio goals are set above you; you convert them into something a team can build against. "Portfolio" here means a set of data products, not a product family of physical goods — but the translation skill is the same.',
    evidence: ['e-evidence-inputs', 'e-rolebeforethreshold', 'e-agile'],
    strength: 'Portfolio planning, roadmapping and backlog prioritisation are all named competencies, and "role before threshold" shows you can reason about a portfolio rather than a single line item.',
    gap: 'Your CV wording is "evidence-based inputs for prioritization" and "roadmap recommendations" — supporting a roadmap, not owning one. An interviewer will probe that seam. You also have no evidenced example of writing a product vision statement.',
    action: 'Write one vision statement for a plausible GIS data product and one three-horizon roadmap, so you have an artefact to talk from. Be precise about where your current decision rights end.',
    concepts: ['strategy', 'roadmap', 'backlog', 'prioritisation'],
    weight: 5
  },
  {
    id: 'r3',
    kind: 'essential',
    area: 'Requirements',
    title: 'Define, document and align end-to-end requirements — technical, legal, privacy, commercial, brand',
    jd: 'Define, document, and align end-to-end product requirements (technical, legal, privacy, commercial, brand).',
    fit: 'partial',
    reading: 'Five requirement families, listed deliberately. In a vehicle-data business, legal and privacy are not a rubber stamp at the end — they decide whether a product can exist at all. "Brand" means each of the six Group brands can restrict what its data is used for.',
    evidence: ['e-requirements', 'e-compliance', 'e-productdata'],
    strength: 'You already gather requirements across technical, commercial and regulatory families simultaneously. Coordinating Declarations of Performance, CE marking and EPDs is a genuine analogue: a product cannot ship until its documentation is right, and you own that.',
    gap: 'Privacy and data-protection requirements (GDPR, EU Data Act, consent, purpose limitation) are not evidenced anywhere in your materials. This is one of your two biggest gaps.',
    action: 'Learn the GDPR/Data Act basics for connected-vehicle data well enough to ask a good question. Then explicitly bridge: "CE marking taught me that compliance evidence is a release blocker, not paperwork — I would expect purpose limitation to work the same way."',
    concepts: ['requirements', 'dataproduct', 'compliance', 'risk'],
    weight: 5
  },
  {
    id: 'r4',
    kind: 'essential',
    area: 'Sales interface',
    title: 'Act as the primary day-to-day interface with Sales',
    jd: 'Act as the primary day-to-day interface with Sales for all product-related customer discussions.',
    fit: 'strong',
    reading: 'Unusual to see this stated so plainly. It tells you the hub sells directly, deal by deal, and that the PM is expected in customer conversations — translating what a customer asks for into what the product can actually do.',
    evidence: ['e-salesteam', 'e-feedbackloop', 'e-gtm', 'e-crossfunctional'],
    strength: 'This is your single strongest differentiator. Three years leading a SaaS sales team means you have sat on the Sales side of exactly this interface, and you already structure client feedback into pricing and feature-investment discussions. Most PM candidates cannot say that.',
    gap: 'None material. The risk is under-selling it by describing it as "a sales job" rather than as product-commercial translation.',
    action: 'Build your strongest story here and lead with it. Name the failure mode you know from the inside: Sales promising a capability that does not exist, and how you prevent it.',
    concepts: ['stakeholders', 'gtm', 'crossfunctional', 'commercial'],
    weight: 5
  },
  {
    id: 'r5',
    kind: 'essential',
    area: 'Sales interface',
    title: 'Align with Sales on market needs, feature prioritisation and go-to-market readiness',
    jd: 'Collaborate closely with Sales to align on market needs, feature prioritization, and go-to-market readiness.',
    fit: 'strong',
    reading: 'The companion to R4. The hard part is not collaboration; it is saying no to the loudest deal while keeping the relationship, and keeping a roadmap from becoming a list of one-customer promises.',
    evidence: ['e-feedbackloop', 'e-adoption', 'e-gtm'],
    strength: 'You have run the feedback loop from both ends, and your adoption framework separates output from outcome — exactly the discipline needed when Sales asks for a feature that will not actually move adoption.',
    gap: 'No evidenced example of formally refusing a large commercial request. Prepare one honestly, or frame the nearest real one.',
    action: 'Prepare a "single-customer feature vs. platform" answer with an explicit decision rule (how many customers, what contract value, what reusability).',
    concepts: ['prioritisation', 'stakeholders', 'gtm', 'roadmap'],
    weight: 4
  },
  {
    id: 'r6',
    kind: 'essential',
    area: 'Go-live',
    title: 'Coordinate go-live readiness — testing, risk handover, onboarding',
    jd: 'Coordinate and ensure product readiness for go-live, including testing, risk handover, and onboarding.',
    fit: 'partial',
    reading: '"Risk handover" is the notable phrase: when a product goes live, its residual risks pass formally from the build team to whoever runs it. That is a governance artefact — a register with named owners — not a conversation.',
    evidence: ['e-fourgates', 'e-launchcoord', 'e-app-decisions', 'e-compliance'],
    strength: 'Launch readiness and onboarding are both evidenced — you coordinated onboarding, adoption and retention for software-module launches at GVI. Treating accessibility as a release criterion on the pricing app shows you already use blocking acceptance criteria.',
    gap: 'Formal risk handover and structured testing of a data product or API are not evidenced. Neither is a signed go/no-go.',
    action: 'Learn what a go-live checklist for a data product contains: contract and consent in place, data quality thresholds, API rate limits, monitoring and alerting, support routing, rollback, named risk owners.',
    concepts: ['delivery', 'risk', 'gtm', 'serviceops'],
    weight: 4
  },
  {
    id: 'r7',
    kind: 'essential',
    area: 'Operations',
    title: 'Establish and maintain KPIs, SLAs, routing matrices and knowledge transfers',
    jd: 'Establish and maintain KPIs, SLAs, routing matrices, and knowledge transfers for operational excellence.',
    fit: 'partial',
    reading: 'This bullet is about life after launch. An SLA is a contractual promise about availability, latency or data freshness. A routing matrix says which team receives which kind of incident. Knowledge transfer is how support can answer without you. Together they are the operating model of a live data product.',
    evidence: ['e-kpis', 'e-dashboards', 'e-app-honesty'],
    strength: 'KPI definition and monitoring are strongly evidenced, including service levels and availability. You build the dashboards yourself, and you are honest about what a metric can and cannot prove.',
    gap: 'SLAs and routing matrices as artefacts are not evidenced. This is a concrete, learnable gap — and one you can close before the interview.',
    action: 'Draft one KPI tree and one SLA/routing table for an imaginary vehicle-data product. Bring it. Almost no candidate will.',
    concepts: ['analytics', 'serviceops', 'risk'],
    weight: 4
  },

  /* ---------------- requirements block ---------------- */
  {
    id: 'r8',
    kind: 'essential',
    area: 'Competency',
    title: 'Project management and product management knowledge',
    jd: 'Project Management and Product Management knowledge',
    fit: 'partial',
    reading: 'Both are named, in that order. In a corporate group hub you will be judged on plan, dependency and status discipline as much as on product judgement.',
    evidence: ['e-tools', 'e-crossfunctional', 'e-lifecycle'],
    strength: 'Jira, Confluence and Planner in daily use; cross-functional workstreams and dependency resolution are explicit in your CV.',
    gap: 'No formal certification is evidenced — no PMP, PRINCE2, CSPO, PSPO or SAFe. Nothing in your materials names a certification.',
    action: 'Do not claim one. If asked, answer with the practice you actually run, and mention any certification you are pursuing only if it is true.',
    concepts: ['delivery', 'risk', 'leadership'],
    weight: 3
  },
  {
    id: 'r9',
    kind: 'essential',
    area: 'Domain',
    title: 'Automotive-data product knowledge',
    jd: 'Automotive-data product knowledge',
    fit: 'gap',
    reading: 'The domain requirement, and your largest gap. It means understanding what a connected vehicle emits, who may use it, how it is delivered (APIs, feeds), and what the buyers — fleets, insurers, workshops, mobility services — do with it.',
    evidence: ['e-productdata', 'e-datapartofproduct', 'e-dashboards'],
    strength: 'Transferable and real: you already own the business quality of product data across SAP, PIM and digital channels, across two markets, and you argue that product data is part of the product. That is data-product thinking applied to a different data type.',
    gap: 'You have no automotive experience, no telematics or connected-vehicle experience, and no evidenced work with APIs as a delivery mechanism. Master data about products is not the same as time-series data from vehicles.',
    action: 'This is your highest-value study area. Learn the Data Hub model, the six brands, the main use cases, and roughly what 100+ data points per vehicle contains. Then rehearse the bridge: same discipline, different data.',
    concepts: ['dataproduct', 'compliance', 'analytics'],
    weight: 5
  },
  {
    id: 'r10',
    kind: 'essential',
    area: 'Competency',
    title: 'Agile and delivery competencies',
    jd: 'Agile and delivery competencies',
    fit: 'partial',
    reading: 'The Digital:Hub half of the joint venture supplies the agile, hands-on culture. Expect Scrum or Kanban, real ceremonies, and a Product Owner-shaped expectation of backlog ownership.',
    evidence: ['e-agile', 'e-app-built', 'e-tools'],
    strength: 'User stories, acceptance criteria, backlog prioritisation, release planning, Scrum and Kanban are all named. Building and shipping the pricing application is your strongest proof that you can carry something through delivery, not just define it.',
    gap: 'Your CV says "sprint support", which suggests contributing to someone else\'s cadence rather than owning a backlog and running refinement. Be ready for "walk me through your refinement session."',
    action: 'Rehearse a concrete delivery week: what you do at refinement, how you write acceptance criteria, how you handle a story the team cannot estimate.',
    concepts: ['agile', 'backlog', 'requirements', 'delivery'],
    weight: 4
  },
  {
    id: 'r11',
    kind: 'essential',
    area: 'Governance',
    title: 'Governance and compliance knowledge',
    jd: 'Governance and compliance knowledge',
    fit: 'partial',
    reading: 'In this business, governance is the product constraint. Who may use which data, for what purpose, under which contract, with which consent — and who approves it.',
    evidence: ['e-compliance', 'e-productdata', 'e-supplierrisk', 'e-datapartofproduct'],
    strength: 'Genuinely strong in the adjacent form: you coordinate regulatory documentation as a condition of market readiness, and you treat supplier and data quality as governed risks rather than admin.',
    gap: 'Data-specific governance — GDPR lawful basis, purpose limitation, data minimisation, EU Data Act FRAND access, consent for location and driving-behaviour data — is not evidenced.',
    action: 'Learn enough to reason, not to advise. The credible position is: "I know where the questions are and who owns the answer", not "I am a privacy expert."',
    concepts: ['compliance', 'dataproduct', 'risk'],
    weight: 4
  },
  {
    id: 'r12',
    kind: 'essential',
    area: 'Leadership',
    title: 'Leadership and personal competencies — an ownership mindset',
    jd: 'Leadership and personal competencies such as an ownership mindset.',
    fit: 'strong',
    reading: 'Read alongside the culture paragraph: "pioneers — people who are excited to build, shape and grow something from the ground up." They are hiring for temperament as much as skill.',
    evidence: ['e-leadership', 'e-salesteam', 'e-app-built', 'e-method-outcome'],
    strength: 'You have led a team, you influence without authority, and you did not wait for someone to build the pricing application — you framed the problem and built it. That is the cleanest ownership evidence in your whole profile.',
    gap: 'None material. Make sure the pricing app story is told as ownership, not as a technical hobby.',
    action: 'Lead the "why you" answer with the pricing application. It is the proof that you take a problem all the way.',
    concepts: ['leadership', 'stakeholders'],
    weight: 4
  },

  /* ---------------- implied ---------------- */
  {
    id: 'i1',
    kind: 'implied',
    area: 'Culture',
    title: 'Comfort building from zero in a brand-new hub',
    jd: 'We are looking for pioneers – people who are excited to build, shape and grow something from the ground up.',
    fit: 'partial',
    reading: 'A new hub means no established playbook, unclear interfaces to Wolfsburg, and processes you will have to write yourself. Some people find that energising; others need structure. They are screening for which you are.',
    evidence: ['e-app-built', 'e-app-problem', 'e-mcy'],
    strength: 'You built an internal application nobody asked you to build, and you design bounded proofs of concept before scaling. Both read as pioneer behaviour.',
    gap: 'Your experience is inside established organisations with existing processes. You have not evidenced standing up a function from nothing.',
    action: 'Have an honest answer about what you would put in place first — and why "first" is a routing and decision-rights question, not a roadmap question.',
    concepts: ['leadership', 'serviceops'],
    weight: 3
  },
  {
    id: 'i2',
    kind: 'implied',
    area: 'Culture',
    title: 'Operating in a matrix and a startup at the same time',
    jd: 'Deep automotive and data expertise from Volkswagen Group Info Services. An agile, digital, hands-on environment from the Volkswagen Digital: Hub.',
    fit: 'strong',
    reading: 'Two parent organisations with different speeds and different decision cultures. The PM sits on the seam. Expect competing definitions of "done" and of "who decides".',
    evidence: ['e-crossfunctional', 'e-leadership', 'e-supplierrisk'],
    strength: 'Saint-Gobain is a large matrixed group; you already reconcile commercial, technical, supply and marketing priorities across two markets. That is the same muscle.',
    gap: 'Nothing evidenced about navigating two parent organisations with different operating tempos.',
    action: 'Prepare a stakeholder-conflict story where the conflict was structural, not personal.',
    concepts: ['stakeholders', 'crossfunctional', 'leadership'],
    weight: 3
  },
  {
    id: 'i3',
    kind: 'implied',
    area: 'Commercial',
    title: 'Commercial literacy for data licensing and use-case-based contracting',
    jd: 'Our focus is on developing data-driven B2B products that create real impact for customers, partners and the Volkswagen ecosystem.',
    fit: 'partial',
    reading: 'GIS publicly describes a "one contract per use case" model. That makes the commercial construct — what a use case is, what it costs, what it permits — part of the product definition, not a separate sales artefact.',
    evidence: ['e-suppliers', 'e-pricingpassthrough', 'e-zenhome', 'e-feedbackloop'],
    strength: 'Pricing, margin and negotiation are strongly evidenced, and you already refuse uniform pricing where roles differ. Your export-pricing work shows you can build a price from cost through channel to end price.',
    gap: 'Data-licensing specifics — per-call, per-vehicle, per-use-case, tiering, minimum commitments — are new. Physical-goods margin logic does not transfer cleanly to a near-zero-marginal-cost product.',
    action: 'Study pricing metrics for data products, and be ready to say why a data product prices on value and permission rather than on cost.',
    concepts: ['commercial', 'dataproduct', 'gtm'],
    weight: 4
  },
  {
    id: 'i4',
    kind: 'implied',
    area: 'Practical',
    title: 'Barcelona presence, English working language, German useful',
    jd: 'Build the Future of Data-Driven Mobility – from Barcelona.',
    fit: 'strong',
    reading: 'The hub is in Barcelona; the parent company is in Wolfsburg. English is near-certainly the working language, with German valuable for the parent-company interface.',
    evidence: ['e-languages'],
    strength: 'You are Barcelona-based, bilingual Spanish and English, and German at B2 — directly useful for the Wolfsburg interface and an easy, honest point of difference.',
    gap: 'None. Confirm the on-site/hybrid expectation.',
    action: 'Mention German B2 once, in the context of working with Wolfsburg colleagues. Do not overstate it.',
    concepts: [],
    weight: 2
  },
  {
    id: 'i5',
    kind: 'implied',
    area: 'Technical',
    title: 'Enough technical literacy to specify an API-delivered product',
    jd: 'Define, document, and align end-to-end product requirements (technical, …).',
    fit: 'partial',
    reading: 'A data product is delivered through interfaces. You do not need to write the service, but you need to specify latency, freshness, schema, error behaviour, versioning and rate limits — and understand what breaks a partner integration.',
    evidence: ['e-app-built', 'e-tools', 'e-productdata'],
    strength: 'You built an application, you work with SQL, AWS and Azure are on your CV, and you have shipped something with a required downstream output structure — which is precisely a schema-contract problem.',
    gap: 'No evidenced work defining or versioning an API contract.',
    action: 'Learn the vocabulary: endpoint, payload, schema, versioning, backward compatibility, rate limit, webhook, latency vs freshness, idempotency. Enough to be precise, not to pretend.',
    concepts: ['dataproduct', 'requirements', 'serviceops'],
    weight: 3
  },
  {
    id: 'i6',
    kind: 'implied',
    area: 'Practical',
    title: 'The "Level C" reference and the wide salary band',
    jd: 'Ref: Level C · Annual gross salary range: Min. 38,000€ - Max. 80,000€ (depending on experience)',
    fit: 'gap',
    reading: 'A €42k spread is unusually wide. It suggests the level is set after interview, on evidenced seniority. "Level C" is an internal grading marker whose meaning is not public.',
    evidence: [],
    strength: '—',
    gap: 'You cannot know where in the band you fall, and guessing low anchors you badly.',
    action: 'Ask what distinguishes the bottom of the band from the top for this role. It is a legitimate question and it makes you sound like someone who thinks in criteria.',
    concepts: [],
    weight: 2,
    verify: true
  }
];

/* Ranked preparation gaps, derived from the mapping above. */
export const GAPS = [
  {
    id: 'g-automotive',
    title: 'Automotive and connected-vehicle data domain',
    severity: 'critical',
    reqs: ['r9', 'r3'],
    why: 'Named as a requirement, and nothing in your materials touches automotive or telematics. If you cannot hold a conversation about what a vehicle emits and who buys it, the rest of your profile will not be reached.',
    close: [
      'Learn the Data Hub model: one face, one contract per use case, one system, six brands, standardised format.',
      'Learn the five published solution areas — repair & maintenance, retail & importer, insurance, maps & life services, fleet management — and one buyer question inside each.',
      'Be able to name plausible data points (mileage, fuel or state of charge, battery health, location, diagnostic trouble codes, service indicators) and say which are personal data.',
      'Practise the bridge sentence out loud: product master data → vehicle data, same governance discipline, different data shape.'
    ],
    concepts: ['dataproduct', 'compliance']
  },
  {
    id: 'g-privacy',
    title: 'Data privacy and the regulatory frame for vehicle data',
    severity: 'critical',
    reqs: ['r3', 'r11'],
    why: 'The ad lists privacy and legal as requirement families in their own right. In a vehicle-data business, these determine what a product may be, not just how it is documented.',
    close: [
      'GDPR essentials as they apply here: personal data, lawful basis, consent, purpose limitation, data minimisation, retention.',
      'EU Data Act essentials: user right to access data their connected product generates, sharing with third parties on FRAND terms, and how it coexists with GDPR.',
      'Understand why location and driving-behaviour data need explicit consent, and what that means for a product roadmap.',
      'Rehearse the honest boundary: you reason about the constraint and know who owns the answer; you do not give legal advice.'
    ],
    concepts: ['compliance', 'dataproduct', 'risk']
  },
  {
    id: 'g-serviceops',
    title: 'SLAs, routing matrices and the operating model after go-live',
    severity: 'high',
    reqs: ['r7', 'r6'],
    why: 'An entire responsibility bullet, and the artefacts named — SLAs, routing matrices, knowledge transfers — do not appear anywhere in your materials.',
    close: [
      'Learn what belongs in an SLA for a data product: availability, latency, data freshness, support response time, credits or remedies.',
      'Learn what a routing matrix is: incident type → first responder → escalation → owner, with response times.',
      'Draft a one-page operating model for an imaginary product and bring it to the interview.',
      'Connect it to what you already do: you monitor service levels and availability today.'
    ],
    concepts: ['serviceops', 'analytics', 'risk']
  },
  {
    id: 'g-dup',
    title: 'The Data Usage Process itself',
    severity: 'high',
    reqs: ['r1'],
    why: 'The role is defined around it and it is not publicly documented. Guessing invents company facts; ignoring it looks incurious.',
    close: [
      'Say plainly that you do not know their internal process, then describe the phase logic you do run.',
      'Prepare two questions: what are the exit criteria for each phase, and who is the decision-maker at each gate.',
      'Have your own gate model ready to map onto theirs on the spot.'
    ],
    concepts: ['lifecycle', 'delivery'],
    verify: true
  },
  {
    id: 'g-ownership',
    title: 'Framing your scope: supporting a roadmap vs owning one',
    severity: 'medium',
    reqs: ['r2', 'r10'],
    why: 'Your own wording — "defined workstreams", "inputs for prioritization", "sprint support" — is honest but reads as junior. The gap is in framing, not capability.',
    close: [
      'For each responsibility, know exactly where your decision right ends and whose begins. Say it without apology.',
      'Lead with the one thing you unambiguously owned end to end: the pricing application.',
      'Replace "I supported" with "I owned X within Y" — accurate, and stronger.'
    ],
    concepts: ['roadmap', 'leadership', 'backlog']
  },
  {
    id: 'g-api',
    title: 'Specifying an interface-delivered product',
    severity: 'medium',
    reqs: ['i5', 'r3'],
    why: 'The product is delivered through APIs and feeds. You need enough vocabulary to write requirements a data engineer respects.',
    close: [
      'Learn: schema, contract, versioning, backward compatibility, rate limit, latency vs freshness, error semantics.',
      'Write one acceptance criterion for an API endpoint as a rehearsal.',
      'Use the pricing app honestly: you have already shipped something with a required downstream output structure.'
    ],
    concepts: ['requirements', 'dataproduct', 'serviceops']
  },
  {
    id: 'g-cert',
    title: 'Formal agile or project-management credentials',
    severity: 'low',
    reqs: ['r8', 'r10'],
    why: 'Nothing in your materials names a certification. Some corporate processes screen for one.',
    close: [
      'Do not claim what you do not hold.',
      'Answer with practice: how you run refinement, write acceptance criteria, manage dependencies.',
      'If you are studying for one, say so plainly. If not, say what you would pursue and why.'
    ],
    concepts: ['agile', 'delivery']
  }
];

export const STRENGTHS = [
  {
    id: 's-sales',
    title: 'You have been the Sales side of the Sales–Product interface',
    reqs: ['r4', 'r5'],
    evidence: ['e-salesteam', 'e-feedbackloop'],
    line: 'The ad makes the Sales interface a headline responsibility. Three years leading a SaaS commercial team means you know what Sales needs from a PM, what they over-promise under pressure, and what a structured feedback loop has to look like for them to actually use it.'
  },
  {
    id: 's-shipped',
    title: 'You framed, specified and shipped a product yourself',
    reqs: ['r12', 'r10', 'i1'],
    evidence: ['e-app-built', 'e-app-decisions', 'e-app-problem'],
    line: 'A pricing workflow application in ongoing internal use, where control is built into the task instead of reported afterwards. For a hub hiring pioneers, this is the proof that ownership is a habit rather than a claim.'
  },
  {
    id: 's-data',
    title: 'You already treat data as a product with an owner',
    reqs: ['r9', 'r11'],
    evidence: ['e-productdata', 'e-datapartofproduct'],
    line: 'Owning hierarchies, classifications, commercial attributes and supplier references across SAP, PIM and digital channels, in two markets, and arguing that product data is part of the product — that is the closest transferable thing to a data-product role that a non-automotive candidate can bring.'
  },
  {
    id: 's-compliance',
    title: 'Compliance is already a release blocker in your world',
    reqs: ['r3', 'r11', 'r6'],
    evidence: ['e-compliance'],
    line: 'Declarations of Performance, CE marking and EPDs are not paperwork in your role — without them a product cannot reach the market. That is the same relationship legal and privacy have to a vehicle-data product.'
  },
  {
    id: 's-honesty',
    title: 'You state evidence boundaries without being asked',
    reqs: ['r7', 'r12'],
    evidence: ['e-app-honesty', 'e-solarboundary', 'e-method-assumptions'],
    line: 'Your portfolio says outright what your work does not prove. In an interview this reads as senior: it is the difference between a metric quoted and a metric understood.'
  },
  {
    id: 's-commercial',
    title: 'You reason about price, margin and role together',
    reqs: ['i3', 'r5'],
    evidence: ['e-pricingpassthrough', 'e-suppliers', 'e-zenhome'],
    line: 'Refusing a uniform price increase because products play different roles, and building an export price from cost through channel to RRP, both show commercial reasoning a data business needs when it prices per use case.'
  }
];
