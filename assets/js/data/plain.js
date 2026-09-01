/* ============================================================
   plain.js — every technical term and acronym used on this site,
   with a short plain-English explanation.

   The renderer follows the first appearance of each term in a
   paragraph with its explanation, in a muted color. Verbatim
   quotes from the CV, the portfolio and the job ad are never
   touched — they are rendered as plain text and skip this pass.
   ============================================================ */

/* Longest phrases first — the renderer matches in this order so
   "EU Data Act" wins over "Data Act", and "rate limit" over "limit". */
export const PLAIN = [
  /* ---- compound terms first, so an explanation never splits a phrase
         like "KPI tree" or "data product" down the middle ---- */
  ['KPI tree',           'a diagram breaking one headline number into the smaller numbers behind it'],
  ['data product',       'data packaged so others can rely on it, with an owner and a quality promise'],
  ['data products',      'data packaged so others can rely on it, with an owner and a quality promise'],
  ['API contract',       'the written promise about what the API returns and how it may change'],
  ['API call',           'one request made to the API'],
  ['API calls',          'requests made to the API'],
  ['sprint goal',        'the single outcome a short work cycle is aiming at'],
  ['error semantics',    'what each different error response actually means'],
  ['consent basis',      'the specific permission that makes using the data legal'],
  ['schema variant',     'a one-customer version of the data shape'],
  ['SLA number',         'the specific figure promised in the contract'],
  ['product lifecycle',  'the stages a product moves through, from idea to retirement'],

  /* ---- law and privacy ---- */
  ['EU Data Act',        'the EU law that lets users get the data their connected products create'],
  ['Data Act',           'the EU law on access to connected-product data'],
  ['GDPR',               'the EU privacy law'],
  ['DPIA',               'a formal check on privacy risk'],
  ['FRAND',              'fair, reasonable, and the same terms for everyone'],
  ['purpose limitation', 'data collected for one use cannot simply be reused for another'],
  ['lawful basis',       'the legal reason you are allowed to use personal data'],
  ['data minimization',  'collect only the data you actually need'],
  ['pseudonymized',      'names removed, but still traceable back to a person'],
  ['pseudonymization',   'removing names while the data can still be traced back'],
  ['personal data',      'anything that can identify a person'],
  ['consent',            'the person has agreed, and can take that agreement back'],
  ['data retention',     'how long data is kept before it is deleted'],

  /* ---- interfaces and delivery ---- */
  ['API',                'the connection other software uses to pull your data'],
  ['endpoint',           'one address in the API that returns a specific thing'],
  ['schema',             'the agreed shape and field names of the data'],
  ['payload',            'the data a response actually carries'],
  ['semantic versioning','version numbers that signal how big a change is'],
  ['backward compatibility', 'existing integrations keep working without changes'],
  ['breaking change',    'a change that stops existing integrations from working'],
  ['deprecation policy', 'the published rules for retiring something with notice'],
  ['deprecation',        'retiring something, with notice, so people can move off it'],
  ['rate limit',         'a cap on how often one customer can call the API'],
  ['idempotency',        'safe to retry without the action happening twice'],
  ['webhook',            'we push the update to you instead of you asking for it'],
  ['sandbox',            'a safe test copy with fake data'],
  ['VIN',                'the unique number that identifies one vehicle'],
  ['telematics',         'vehicle data sent over a mobile network'],
  ['parallel run',       'both versions live at once while customers move over'],

  /* ---- reliability and operations ---- */
  ['SLA',                'a service promise written into the contract'],
  ['SLO',                'the stricter internal target the team actually runs to'],
  ['SLI',                'the number you actually measure'],
  ['p95 latency',        '95 out of 100 calls are answered faster than this'],
  ['latency',            'how long the system takes to answer'],
  ['freshness',          'how old the data is at the moment you receive it'],
  ['general availability','released to all customers, not just a pilot group'],
  ['availability',       'the share of time the service answers at all'],
  ['error budget',       'how much unreliability is allowed before features stop'],
  ['routing matrix',     'a table saying who receives which kind of problem'],
  ['runbook',            'step-by-step instructions so support can fix it alone'],
  ['post-mortem',        'a blame-free review after something goes wrong'],
  ['rollback',           'a tested way to put the previous version back'],
  ['plausibility',       'a check that a value is even physically possible'],
  ['lineage',            'where a value came from and what changed it on the way'],
  ['data contract',      'a written, binding promise about what the data means'],
  ['data quality',       'whether the data is accurate, complete, current and valid'],

  /* ---- ways of working ---- */
  ['Scrum',              'working in fixed short cycles with set meetings'],
  ['Kanban',             'managing a steady flow of work with limits on how much runs at once'],
  ['sprint',             'a fixed short work cycle, usually two weeks'],
  ['backlog',            'the single ordered list of work a team will do next'],
  ['refinement',         'the meeting where upcoming work is made ready to start'],
  ['Definition of Ready','the agreed conditions before work may be started'],
  ['Definition of Done', 'the agreed conditions before work counts as finished'],
  ['acceptance criteria','testable conditions that decide whether it is finished'],
  ['user story',         'a short note describing who needs what, and why'],
  ['velocity',           'how much a team finishes in a cycle'],
  ['WIP limit',          'a cap on how many things run at the same time'],
  ['retrospective',      'a short team review that produces one real change'],
  ['spike',              'a short, time-boxed investigation to answer one question'],

  /* ---- planning and decisions ---- */
  ['RICE',               'a scoring method: reach, impact, confidence, divided by effort'],
  ['WSJF',               'a score: what the delay costs you, divided by how big the job is'],
  ['MoSCoW',             'sorting work into must, should, could, and will not have'],
  ['Kano',               'sorting features into basics, performance, and delighters'],
  ['cost of delay',      'what it costs you per week to not have it yet'],
  ['RAID log',           'a running list of risks, assumptions, issues and dependencies'],
  ['DEEP',               'a backlog health check: detailed, estimated, emerging, prioritized'],
  ['RACI',               'who is responsible, accountable, consulted and informed'],
  ['RAPID',              'who recommends, agrees, performs, inputs, and decides'],
  ['ADR',                'a one-page record of a decision and why it was made'],
  ['stage gate',         'a checkpoint with pass-or-fail criteria and one decider'],
  ['pre-mortem',         'imagining it already failed, then working backward'],
  ['pre-wire',           'briefing someone privately before the group meeting'],
  ['decision rights',    'who is allowed to decide what'],
  ['one-way door',       'a decision that is expensive or impossible to reverse'],

  /* ---- measurement ---- */
  ['KPI',                'the few numbers a team agrees to steer by'],
  ['OKR',                'a goal, plus the measurable results that prove you hit it'],
  ['north star metric',  'the single number that best tracks real customer value'],
  ['north star',         'the single number that best tracks real customer value'],
  ['counter-metric',     'a second number that catches the damage a target can cause'],
  ['vanity metric',      'a number that only goes up and changes no decision'],
  ['cohort analysis',    'grouping customers by when they started, then comparing'],
  ['A/B test',           'showing two versions and comparing what people do'],
  ['churn',              'customers who stop paying'],

  /* ---- market and commercial ---- */
  ['go-to-market',       'how the product reaches, convinces and keeps buyers'],
  ['GTM',                'how the product reaches, convinces and keeps buyers'],
  ['B2B',                'one business selling to another business'],
  ['SaaS',               'software sold as an ongoing subscription'],
  ['pricing metric',     'the unit you charge for, such as per vehicle or per call'],
  ['use case',           'one defined purpose the data is allowed to serve'],
  ['permitted use',      'what the contract actually allows the customer to do'],
  ['cost to serve',      'the full cost of a customer, support and setup included'],
  ['willingness to pay', 'what a buyer would actually hand over, not what they say'],
  ['value proposition',  'the specific promise you make to one kind of buyer'],
  ['positioning',        'the place your product holds in a buyer’s mind'],
  ['beachhead',          'the first customer group you commit to winning'],
  ['time to first value','how long from signing to the customer getting something useful'],
  ['win/loss',           'a review of why deals were won or lost'],
  ['TAM',                'the total size of the market, in theory'],
  ['SAM',                'the part of the market you could actually serve'],
  ['SOM',                'the part you can realistically win'],
  ['PESTEL',             'a scan of political, economic, social, technical, environmental and legal forces'],
  ['QBR',                'a quarterly review meeting with a customer'],
  ['Incoterm',           'the shipping rule that says who pays and who carries the risk'],

  /* ---- systems ---- */
  ['PIM',                'the system that stores product information'],
  ['SAP',                'the core business system that runs finance and operations'],
  ['CRM',                'the system that tracks customers and deals'],
  ['Salesforce',         'a widely used customer and sales tracking system'],
  ['Jira',               'the tool teams use to track work items'],
  ['Confluence',         'the tool teams use to write and share documents'],
  ['Power BI',           'a Microsoft tool for building reports and dashboards'],
  ['Tableau',            'a tool for building reports and dashboards'],
  ['SQL',                'the language used to query a database'],

  /* ---- roles and process ---- */
  ['Product Owner',      'the person who owns the backlog order on a Scrum team'],
  ['DUP',                'Volkswagen’s internal Data Usage Process'],
  ['Data Hub',           'Volkswagen’s central point for sharing vehicle data'],
  ['discovery',          'the work of finding out what is true before you build'],
  ['end of life',        'the planned, managed retirement of a product'],
  ['stakeholder',        'anyone with an interest in, or influence over, the product'],
  ['roadmap',            'a plan showing what you intend to achieve, and roughly when'],
  ['risk handover',      'formally passing leftover risks to a named owner, in writing'],
  ['go-live',            'the moment the product starts serving real customers'],
  ['onboarding',         'getting a new customer set up and actually using it']
];

/* Fast lookup for the renderer. */
export const PLAIN_MAP = new Map(PLAIN.map(([t, d]) => [t.toLowerCase(), d]));

/* Terms that must match capitalization exactly (acronyms and product names),
   so "sap" in ordinary prose is never mistaken for the system SAP. */
export const CASE_SENSITIVE = new Set([
  'API','SLA','SLO','SLI','KPI','OKR','GDPR','DPIA','FRAND','VIN','RICE','WSJF','MoSCoW','Kano',
  'RACI','RAPID','ADR','RAID log','B2B','SaaS','GTM','TAM','SAM','SOM','PESTEL','QBR','PIM','SAP',
  'CRM','Salesforce','Jira','Confluence','Power BI','Tableau','SQL','DUP','Data Hub','Scrum','Kanban',
  'EU Data Act','Data Act','Incoterm','Product Owner','Definition of Ready','Definition of Done',
  'A/B test'
]);
