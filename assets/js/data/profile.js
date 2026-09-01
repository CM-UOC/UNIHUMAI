/* ============================================================
   profile.js — the Evidence Bank
   Every entry is an atomic, citable fact drawn from Cristian's
   own materials. Nothing here is invented. `src` records where
   it came from so any answer built on it can be traced back.
   ============================================================ */

export const PROFILE = {
  name: 'Cristian Malpica',
  headline: 'Product Manager / Product Owner / B2B & SaaS',
  portfolioHeadline: 'Assistant Product Manager · B2B portfolios & workflow products',
  location: 'Barcelona, Spain',
  email: 'cmalpica25@icloud.com',
  linkedin: 'https://www.linkedin.com/in/cristian-malpica-02551b20a',
  portfolio: 'https://cmmt.me',
  languages: [
    { lang: 'Spanish', level: 'Bilingual' },
    { lang: 'English', level: 'Bilingual' },
    { lang: 'German',  level: 'B2' },
    { lang: 'French',  level: 'A2' }
  ],
  summary: 'Product-focused professional with 5+ years of experience across B2B manufacturing, SaaS, distribution, and analytics-led environments. Currently supporting the end-to-end lifecycle of European product lines, from market discovery and portfolio planning through go-to-market execution and post-launch performance.',
  purpose: 'I strive to turn customer insight, technology and business strategy into products that create lasting value, support sustainable growth and improve outcomes for people and society.'
};

export const ROLES = [
  {
    id: 'sg',
    title: 'Assistant Product Manager',
    org: 'Saint-Gobain IDAPLAC',
    place: 'Barcelona, Spain',
    period: '2023 – Present',
    context: 'Specialist B2B distribution. Multi-category manufacturer, partner and own-brand product families. Primary market scope: Spain and Portugal, within a European portfolio.',
    src: 'cv'
  },
  {
    id: 'gvi',
    title: 'Sales Supervisor',
    org: 'Gestión de Ventas Iberia',
    place: 'Barcelona, Spain',
    period: '2020 – 2023',
    context: 'Led a commercial team selling SaaS solutions; three years connecting customer need to product, pricing and go-to-market decisions.',
    src: 'cv'
  },
  {
    id: 'emae',
    title: 'Accounting Specialist',
    org: 'EMAE',
    place: 'Camagüey, Cuba',
    period: '2015 – 2019',
    context: 'Financial control, supplier operations, inventory reporting and forecast accuracy.',
    src: 'cv'
  }
];

export const EDUCATION = [
  { qual: 'BSc, Marketing and Market Research', school: 'Universitat Oberta de Catalunya (UOC)', when: 'Ongoing', src: 'cv' },
  { qual: 'Advanced Diploma, International Trade', school: 'Universitat Oberta de Catalunya (UOC)', when: '2026', src: 'cv' },
  { qual: 'Associate Degree, Accounting and Finance', school: 'Instituto Politécnico de Economía de Camagüey', when: '2014', src: 'cv' }
];

/* ------------------------------------------------------------
   EVIDENCE BANK
   tags let the answer composer and question bank surface the
   right stones for the right question.
   ------------------------------------------------------------ */
export const EVIDENCE = [
  /* ---- Saint-Gobain IDAPLAC: lifecycle & portfolio ---- */
  {
    id: 'e-lifecycle',
    role: 'sg',
    tags: ['lifecycle', 'portfolio', 'strategy', 'delivery'],
    claim: 'Drives defined workstreams across the end-to-end lifecycle of B2B product lines in European markets — product definition, portfolio planning, launch execution and post-launch optimization.',
    quote: 'Drive defined workstreams across the end-to-end lifecycle of B2B product lines in European markets, covering product definition, portfolio planning, launch execution, and post-launch optimization, including range gap analysis, SKU rationalization, and end-of-life recommendations.',
    src: 'cv'
  },
  {
    id: 'e-rolebeforethreshold',
    role: 'sg',
    tags: ['lifecycle', 'prioritization', 'decision', 'strategy'],
    claim: 'Assesses products by strategic role — core, growth, specialist, order-on-demand, substitution, withdrawal — rather than applying a uniform sales threshold. "Low historical sales were not sufficient evidence for withdrawal."',
    quote: 'Role before threshold… Low historical sales were not sufficient evidence for withdrawal.',
    src: 'portfolio'
  },
  {
    id: 'e-evidence-inputs',
    role: 'sg',
    tags: ['discovery', 'research', 'prioritization', 'analytics'],
    claim: 'Turns market trends, customer needs, competitor activity and internal performance data into evidence-based inputs for prioritization, portfolio evolution and product decisions.',
    quote: 'Turn market trends, customer needs, competitor activity, and internal performance data into evidence-based inputs for prioritization, portfolio evolution, and product decisions.',
    src: 'cv'
  },
  {
    id: 'e-crossfunctional',
    role: 'sg',
    tags: ['stakeholders', 'collaboration', 'delivery', 'dependencies'],
    claim: 'Coordinates marketing, sales, supply chain, analytics and external suppliers to resolve cross-functional dependencies and align customer value, commercial priorities, operational feasibility and launch readiness.',
    quote: 'Coordinate marketing, sales, supply chain, analytics, and external suppliers to resolve cross-functional dependencies and align customer value, commercial priorities, operational feasibility, and launch readiness.',
    src: 'cv'
  },
  {
    id: 'e-gtm',
    role: 'sg',
    tags: ['gtm', 'positioning', 'value-prop', 'sales'],
    claim: 'Develops product positioning, value propositions and go-to-market plans for proprietary and partner brands, strengthening market visibility, sales enablement and adoption.',
    quote: 'Develop product positioning, value propositions, and go-to-market plans for proprietary and partner brands, strengthening market visibility, sales enablement, and adoption.',
    src: 'cv'
  },
  {
    id: 'e-requirements',
    role: 'sg',
    tags: ['requirements', 'delivery', 'stories'],
    claim: 'Translates business needs and operational constraints into actionable product requirements, launch priorities and cross-functional workstreams.',
    quote: 'Translate business needs and operational constraints into actionable product requirements, launch priorities, and cross-functional workstreams.',
    src: 'cv'
  },
  {
    id: 'e-productdata',
    role: 'sg',
    tags: ['data', 'governance', 'quality', 'systems'],
    claim: 'Owns the business quality of product data across SAP, PIM and digital channels — hierarchies, classifications, commercial attributes and supplier references — keeping information consistent across Spanish and Portuguese markets.',
    quote: 'Own the business quality of product data across SAP, PIM, and digital channels — hierarchies, classifications, commercial attributes, and supplier references — keeping information consistent across Spanish and Portuguese markets.',
    src: 'cv'
  },
  {
    id: 'e-datapartofproduct',
    role: 'sg',
    tags: ['data', 'governance', 'quality'],
    claim: 'Holds that "product data is part of the product", and sequences data work by customer exposure, business integrity, compliance requirement and strategic value rather than chasing completeness.',
    quote: 'Product data is part of the product… Completeness alone doesn’t prove accuracy or customer usefulness.',
    src: 'portfolio'
  },
  {
    id: 'e-compliance',
    role: 'sg',
    tags: ['compliance', 'governance', 'legal', 'documentation'],
    claim: 'Coordinates technical and regulatory documentation across the portfolio — data sheets, Declarations of Performance, CE marking and Environmental Product Declarations — with technical, quality and sustainability teams to keep products market-ready and compliant.',
    quote: 'Coordinate technical and regulatory documentation across the portfolio — data sheets, Declarations of Performance, CE marking, and Environmental Product Declarations — with technical, quality, and sustainability teams to keep products market-ready and compliant.',
    src: 'cv'
  },
  {
    id: 'e-kpis',
    role: 'sg',
    tags: ['analytics', 'kpi', 'operations', 'lifecycle'],
    claim: 'Monitors product and launch KPIs, commercial feedback, service levels and availability to identify improvements and inform roadmap, portfolio and stock-plan decisions, analyzing rotation and slow-moving stock across the branch network.',
    quote: 'Monitor product and launch KPIs, commercial feedback, service levels, and availability to identify improvements and inform future roadmap, portfolio, and stock-plan decisions, analyzing rotation and slow-moving stock across the branch network.',
    src: 'cv'
  },
  {
    id: 'e-suppliers',
    role: 'sg',
    tags: ['commercial', 'pricing', 'negotiation', 'partners', 'risk'],
    claim: 'Manages supplier and partner relationships, negotiating commercial conditions, and assesses supplier cost changes against net prices, discount structures and target margins to inform pricing and range decisions.',
    quote: 'Manage supplier and partner relationships, negotiating commercial conditions and supporting portfolio competitiveness, margin improvement, and product availability; assess supplier cost changes against net prices, discount structures, and target margins to inform pricing and range decisions.',
    src: 'cv'
  },
  {
    id: 'e-supplierrisk',
    role: 'sg',
    tags: ['risk', 'partners', 'governance'],
    claim: 'Treats supplier performance — service reliability, documentation quality, pricing patterns — as a portfolio and customer-value risk, not only a purchasing relationship.',
    quote: 'Supplier performance is a portfolio risk and customer-value question, not only a purchasing relationship.',
    src: 'portfolio'
  },
  {
    id: 'e-pricingpassthrough',
    role: 'sg',
    tags: ['pricing', 'commercial', 'decision'],
    claim: 'Differentiates the response to a supplier cost change by product role rather than applying a uniform percentage increase: "A uniform increase is operationally simple but commercially weak when products play different roles and customers have different alternatives."',
    quote: 'A uniform increase is operationally simple but commercially weak when products play different roles and customers have different alternatives.',
    src: 'portfolio'
  },
  {
    id: 'e-availabilitybias',
    role: 'sg',
    tags: ['analytics', 'discovery', 'bias', 'operations'],
    claim: 'Corrects for availability bias in demand data: historical sales can understate demand when poor availability previously prevented purchase, so lost-sale evidence and local feedback guide deployment.',
    quote: 'Historical sales can understate demand when poor availability previously prevented purchase.',
    src: 'portfolio'
  },
  {
    id: 'e-adoption',
    role: 'sg',
    tags: ['gtm', 'adoption', 'kpi', 'sales'],
    claim: 'Distinguishes adoption barriers — demand, access, confidence, follow-through — before prescribing a fix, and separates output from outcome: "Training attendance is an output. The product outcome is greater confidence, relevant customer engagement and adoption."',
    quote: 'Availability alone does not create adoption… Training attendance is an output. The product outcome is greater confidence, relevant customer engagement and adoption.',
    src: 'portfolio'
  },
  {
    id: 'e-fourgates',
    role: 'sg',
    tags: ['gtm', 'launch', 'governance', 'delivery'],
    claim: 'Moves a demand signal to launch through four gates: need validation, commercial viability, operational readiness and adoption preparedness.',
    quote: 'The framework requires: need validation, commercial viability, operational readiness, and adoption preparedness.',
    src: 'portfolio'
  },

  /* ---- The pricing workflow application ---- */
  {
    id: 'e-app-problem',
    role: 'sg',
    tags: ['problem', 'discovery', 'workflow', 'risk', 'build'],
    claim: 'Framed a fragmented handoff as a preventable-risk problem: checks were not consistently available at the point a pricing decision entered the system workflow, the decision format and the downstream system format were not aligned, and context was lost in between.',
    quote: 'A fragmented handoff created preventable risk… Checks were not consistently available at the point a pricing decision moved into the system workflow.',
    src: 'portfolio'
  },
  {
    id: 'e-app-built',
    role: 'sg',
    tags: ['build', 'delivery', 'requirements', 'workflow', 'shipped'],
    claim: 'Framed, specified and built an internal workspace application that joins a guided pricing task to preventive checks and system-ready output; releases are blocked while checks are unresolved. Implemented and in ongoing internal use.',
    quote: 'I framed, specified and built an internal application that connects a guided pricing task to preventive controls and system-ready output… Implemented and in ongoing internal use.',
    src: 'portfolio'
  },
  {
    id: 'e-app-decisions',
    role: 'sg',
    tags: ['decision', 'design', 'quality', 'accessibility'],
    claim: 'Three design decisions: treat workflow and system output as one problem rather than optimizing each separately; make control part of the product rather than a report about it; treat accessibility as a release criterion so no workaround recreates the manual process.',
    quote: 'Make control part of the product, not a report about it.',
    src: 'portfolio'
  },
  {
    id: 'e-app-honesty',
    role: 'sg',
    tags: ['analytics', 'kpi', 'integrity', 'measurement'],
    claim: 'States the measurement boundary openly: adoption rates, financial impact and time recovery would need separate verified measurement and cannot be attributed to the application alone within its broader commercial context.',
    quote: 'Adoption rates, financial impact, and time recovery require separate verified measurement and cannot be attributed exclusively to the application within its broader commercial context.',
    src: 'portfolio'
  },
  {
    id: 'e-app-learning',
    role: 'sg',
    tags: ['learning', 'workflow', 'requirements'],
    claim: 'Learning from the build: "User experience and system requirements were never in competition here. The recurring manual reconciliation between them was the cost."',
    quote: 'User experience and system requirements were never in competition here. The recurring manual reconciliation between them was the cost.',
    src: 'portfolio'
  },

  /* ---- Gestión de Ventas Iberia: sales leadership ---- */
  {
    id: 'e-salesteam',
    role: 'gvi',
    tags: ['leadership', 'sales', 'gtm', 'saas'],
    claim: 'Led a commercial team selling SaaS solutions, converting customer needs and market feedback into recommendations for product positioning, go-to-market execution and territory planning.',
    quote: 'Led a commercial team for SaaS solutions, converting customer needs and market feedback into recommendations for product positioning, go-to-market execution, and territory planning.',
    src: 'cv'
  },
  {
    id: 'e-launchcoord',
    role: 'gvi',
    tags: ['gtm', 'launch', 'adoption', 'saas', 'onboarding'],
    claim: 'Coordinated sales, marketing and customer success activities for new software-module launches, supporting onboarding, adoption and retention.',
    quote: 'Coordinated sales, marketing, and customer success activities for new software-module launches, supporting onboarding, adoption, and retention.',
    src: 'cv'
  },
  {
    id: 'e-dashboards',
    role: 'gvi',
    tags: ['analytics', 'kpi', 'tools', 'saas'],
    claim: 'Designed Salesforce dashboards covering pipeline, usage trends and customer sentiment, giving commercial leaders clearer visibility for targeted engagement and data-informed decisions.',
    quote: 'Designed Salesforce dashboards covering pipeline, usage trends, and customer sentiment, giving commercial leaders clearer visibility for targeted engagement and data-informed decisions.',
    src: 'cv'
  },
  {
    id: 'e-feedbackloop',
    role: 'gvi',
    tags: ['sales', 'prioritization', 'pricing', 'discovery'],
    claim: 'Structured client feedback for pricing and feature-investment discussions, and improved team execution through KPI management, coaching and process optimization.',
    quote: 'Structured client feedback for pricing and feature-investment discussions, while improving team execution through KPI management, coaching, and process optimization.',
    src: 'cv'
  },

  /* ---- EMAE ---- */
  {
    id: 'e-finance',
    role: 'emae',
    tags: ['finance', 'operations', 'forecasting', 'control'],
    claim: 'Managed accounts payable, invoice processing, supplier documentation, payment tracking and financial records; produced inventory, forecasting and operational reports that improved planning visibility and decision support.',
    quote: 'Prepared inventory, forecasting, and operational reports that improved planning visibility, product availability, and internal decision support.',
    src: 'cv'
  },

  /* ---- Coursework ventures ---- */
  {
    id: 'e-solarmotion',
    role: 'edu',
    tags: ['strategy', 'validation', 'gates', 'coursework', 'risk'],
    claim: 'Built SOLAR MOTION, an electric-vehicle venture hypothesis, through staged investment gates — opportunity, viability, readiness, local fit — with the explicit rule that "macro attractiveness is not a release gate", modeling a €29,250 cost to roughly €50,593 retail path for Chile.',
    quote: 'The strongest idea is not the one with the most conviction. It is the one whose assumptions are made visible soon enough to change the decision.',
    src: 'portfolio'
  },
  {
    id: 'e-solarboundary',
    role: 'edu',
    tags: ['integrity', 'validation', 'coursework'],
    claim: 'States the evidence boundary explicitly: no incorporation, funding, prototype, customer validation, homologation or observed cost, demand or profitability was claimed — only modeled hypotheses and risk gates.',
    quote: 'Not claimed: company incorporation, external funding, engineering prototype, customer validation, regulatory homologation, sales results, or observed cost, demand or profitability.',
    src: 'portfolio'
  },
  {
    id: 'e-zenhome',
    role: 'edu',
    tags: ['market', 'analysis', 'commercial', 'coursework', 'pricing'],
    claim: 'On ZenHome France, built the comparative market evidence across ten criteria (France 82, United States 71, Germany 71), owned Incoterm strategy (FCA) and the export-pricing method (€57.32 export price → €81.13 destination RRP at 120 units).',
    quote: 'A promising product is only an opportunity when its market, operating model and economics work together.',
    src: 'portfolio'
  },
  {
    id: 'e-mcy',
    role: 'edu',
    tags: ['operations', 'validation', 'b2b', 'coursework'],
    claim: 'On MCY Logistics, was operations lead in a two-person team for a sustainable last-mile B2B model, with deliberately bounded scope (four leased electric vans, ~100 km illustrative radius) and four validation gates before any service agreement.',
    quote: 'These are model hypotheses, not findings from customers or live operations.',
    src: 'portfolio'
  },

  /* ---- Method / principles ---- */
  {
    id: 'e-method-assumptions',
    role: 'method',
    tags: ['method', 'integrity', 'discovery', 'validation'],
    claim: 'Records what is known, what is inferred and what still needs validation, so the team can challenge assumptions rather than inherit them.',
    quote: 'Record what is known, what is inferred and what still needs validation. Making that distinction visible allows the team to challenge assumptions.',
    src: 'portfolio'
  },
  {
    id: 'e-method-criteria',
    role: 'method',
    tags: ['method', 'experimentation', 'decision'],
    claim: 'Sets decision criteria before testing: defines the question, the measure, and the result that would change direction, so validation stays tied to a real decision.',
    quote: 'Define the question, the measure and the result that would change direction. This keeps validation tied to a real decision.',
    src: 'portfolio'
  },
  {
    id: 'e-method-systemview',
    role: 'method',
    tags: ['method', 'strategy', 'problem'],
    claim: 'Frames a problem at two levels at once: the system of goals, constraints, dependencies and incentives, and the customer journey where those forces become real.',
    quote: 'Frame the problem at two levels: the system of goals, constraints, dependencies and incentives, and the customer journey where those forces become real.',
    src: 'portfolio'
  },
  {
    id: 'e-method-deliverers',
    role: 'method',
    tags: ['method', 'stakeholders', 'delivery'],
    claim: 'Involves the people who will use, sell, support and operate the product early enough to surface dependencies.',
    quote: 'Involve the people who will use, sell, support and operate the product early enough to surface dependencies.',
    src: 'portfolio'
  },
  {
    id: 'e-method-outcome',
    role: 'method',
    tags: ['method', 'strategy', 'change'],
    claim: 'Protects the outcome and adapts the route: keeps the intended customer and business outcome fixed while letting new evidence change the plan, sequence or solution.',
    quote: 'Keep the intended customer and business outcome clear while allowing new evidence to change the plan, sequence or solution.',
    src: 'portfolio'
  },
  {
    id: 'e-method-totalcost',
    role: 'method',
    tags: ['method', 'commercial', 'sustainability'],
    claim: 'Evaluates total value and total cost: who benefits, who carries the cost, what resources the solution consumes, and what happens after launch.',
    quote: 'Assess who benefits, who carries the cost, what resources the solution consumes and what happens after launch.',
    src: 'portfolio'
  },

  /* ---- Skills & tools ---- */
  {
    id: 'e-tools',
    role: 'skills',
    tags: ['tools', 'delivery', 'analytics'],
    claim: 'Tools in use: Jira, Confluence, Microsoft Planner, Salesforce CRM, SAP, PIM, Odoo, Excel, SQL, Power BI, Tableau, Power Apps, Power Automate, AWS, Microsoft Azure.',
    quote: 'Jira, Confluence, Microsoft Planner, Salesforce CRM, SAP, PIM, Odoo, Excel, SQL, Power BI, Tableau, Power Apps, Power Automate, AWS, Microsoft Azure.',
    src: 'cv'
  },
  {
    id: 'e-agile',
    role: 'skills',
    tags: ['agile', 'delivery', 'backlog', 'stories'],
    claim: 'Delivery competencies listed: backlog prioritization, requirements, user stories, acceptance criteria, sprint support, release planning, Scrum and Kanban.',
    quote: 'Backlog prioritization, requirements, user stories, acceptance criteria, sprint support, release planning, Scrum/Kanban.',
    src: 'cv'
  },
  {
    id: 'e-leadership',
    role: 'skills',
    tags: ['leadership', 'stakeholders', 'influence'],
    claim: 'Leadership competencies listed: stakeholder alignment, cross-functional collaboration, influencing without authority, negotiation, executive communication.',
    quote: 'Stakeholder alignment, cross-functional collaboration, influencing without authority, negotiation, executive communication.',
    src: 'cv'
  },
  {
    id: 'e-languages',
    role: 'skills',
    tags: ['languages'],
    claim: 'Spanish and English bilingual; German B2; French A2.',
    quote: 'Spanish (Bilingual) | English (Bilingual) | German (B2) | French (A2)',
    src: 'cv'
  }
];

export const EVIDENCE_BY_ID = Object.fromEntries(EVIDENCE.map(e => [e.id, e]));

export function evidenceFor(tags = []) {
  if (!tags.length) return EVIDENCE;
  return EVIDENCE.filter(e => e.tags.some(t => tags.includes(t)));
}

export const ROLE_LABEL = {
  sg: 'Saint-Gobain IDAPLAC',
  gvi: 'Gestión de Ventas Iberia',
  emae: 'EMAE',
  edu: 'Coursework venture',
  method: 'Your stated method',
  skills: 'Skills & tools'
};
