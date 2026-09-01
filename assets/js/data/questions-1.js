/* Interview bank — part 1: intro & motivation, CV & portfolio, company & role */
export default [
{
  id:'q-tellme', cat:'intro', difficulty:2, likely:'near-certain',
  q:'Tell me about yourself.',
  assess:'Whether you can select. Everyone has the same material; the signal is which three things you choose for this role and how quickly you get to why you are here. Also: do you sound like a product person or a coordinator.',
  structure:{
    name:'Present → Path → Why here',
    steps:[
      'Present (25s): what you do now, framed as product ownership across a lifecycle.',
      'Path (35s): the two moves that made you a product person — sales leadership, then the shift into product.',
      'Why here (25s): the specific reason this role, this hub, now. Name one thing from the ad.'
    ],
    when:'Use for any opening question. Do not use STAR here — it is a narrative, not an example.'
  },
  example:'I am an Assistant Product Manager at Saint-Gobain IDAPLAC in Barcelona, where I run defined workstreams across the end-to-end lifecycle of B2B product lines in European markets — definition, portfolio planning, launch, and post-launch optimization across Spain and Portugal. I came into product from the commercial side: I spent three years leading a SaaS sales team, which is where I learned what Sales actually needs from a product manager and how badly it goes when that loop is informal. The piece of work I am proudest of is an internal pricing application — I framed the problem, specified it and built it, and it is in ongoing internal use, with the controls built into the task rather than reported afterwards. What draws me to this role is that it sits exactly between the two I know best: a data product with real governance constraints, sold through a direct Sales interface, in a hub that is being built rather than inherited.',
  alternatives:[
    'If the interviewer is technical, lead with the pricing application and the data-quality ownership.',
    'If they are commercial, lead with the SaaS sales leadership and the Sales–Product interface.',
    'If asked "walk me through your CV", go chronological but keep the same three anchors.'
  ],
  followups:['Why move from sales into product?','What does "defined workstreams" mean — what do you actually decide?','Tell me more about the pricing application.'],
  weak:[
    'A chronological life story starting with the accounting role in 2015.',
    'Listing responsibilities without naming a single thing you decided.',
    'Not mentioning the employer or the role at all — it makes the answer generic.'
  ],
  rubric:['Under 90 seconds','Names a decision you owned, not just duties','Connects explicitly to this role','Sounds like your voice, not a script'],
  evidence:['e-lifecycle','e-salesteam','e-app-built'],
  reqs:['r12','r4']
},
{
  id:'q-whythisrole', cat:'intro', difficulty:2, likely:'near-certain',
  q:'Why this role, and why Volkswagen Group Services?',
  assess:'Whether you have read past the salary band. They want to hear something specific about a B2B data business and about a hub being stood up — not generic admiration for the brand.',
  structure:{
    name:'Specific pull → Honest fit → What you bring',
    steps:['One specific thing about the role or business that genuinely interests you.','An honest statement of fit including a gap you are actively closing.','The distinct thing you bring that most candidates will not.'],
    when:'Motivation questions. Keep it under a minute; a long answer here reads as rehearsed enthusiasm.'
  },
  example:'Three things. First, the product problem is one I find genuinely interesting: standardizing data across six brands so a partner can consume it under one contract per use case is a definition problem before it is an engineering problem, and definition is the part of product work I like most. Second, the role puts the product manager on the Sales interface deliberately. I have been on the other side of that interface for three years, and I know how much value is lost when it is informal. Third, it is a hub being built rather than joined — the ad says pioneers, and the work I am most proud of is something nobody asked me to build. I should be straightforward that automotive is new to me. What is not new is owning data as a product: I am responsible for the business quality of product data across SAP, PIM and digital channels in two markets, and I have been reading into the vehicle-data side deliberately.',
  alternatives:[
    'If pressed on the Volkswagen brand specifically, talk about the scale of the standardization problem across six brands rather than brand admiration.',
    'You can mention German at B2 as useful for the Wolfsburg interface — once, briefly.'
  ],
  followups:['What do you know about our data business?','What would worry you about joining a hub that is just starting?','Why leave your current role?'],
  weak:['"It is a great company and a great opportunity."','Anything that suggests you want to move into automotive as a career step rather than into this product problem.','Pretending automotive experience you do not have.'],
  rubric:['Names something specific and verifiable about the business','Volunteers the domain gap honestly','Says what you bring that is scarce','Does not flatter'],
  evidence:['e-productdata','e-salesteam','e-app-built'],
  reqs:['r9','r4','i1']
},
{
  id:'q-salesmove', cat:'intro', difficulty:2, likely:'likely',
  q:'You moved from sales leadership into product. Why, and what did you have to unlearn?',
  assess:'Self-awareness, and whether the move was deliberate or incidental. The "unlearn" half is the real question — it tests whether you understand how the two roles differ in decision rights.',
  structure:{name:'Trigger → What drew you → What you had to unlearn',steps:['The concrete moment or pattern that prompted the move.','What product work gives you that sales did not.','One specific habit you had to drop — with evidence you actually dropped it.'],when:'Career-transition questions.'},
  example:'Leading the SaaS team, I kept structuring client feedback for pricing and feature-investment discussions and then watching the decision happen somewhere I could not see. I wanted to be where the trade-off was made rather than where it was reported. What I had to unlearn was closing. In sales, the discipline is to find the path to yes; a good salesperson turns an objection into a route. In product, an objection is frequently information that should change the plan, and the instinct to overcome it rather than absorb it is actively harmful. Concretely, it shows up in prioritization: my instinct was to find a way to serve the request in front of me, and I have had to replace that with asking how many customers share the need and what a bespoke variant costs on every future change.',
  alternatives:['If they probe whether you miss sales, be honest — the answer that you liked the customer contact and now get it in a different form is credible.'],
  followups:['What do you still use from sales?','Do you think you would slip back into selling the roadmap?'],
  weak:['Framing sales as something you escaped.','Claiming nothing had to be unlearned.','A vague "I have always been interested in product".'],
  rubric:['Names a concrete trigger','Identifies a real habit to unlearn','Shows evidence of the change, not just awareness'],
  evidence:['e-feedbackloop','e-salesteam','e-pricingpassthrough'],
  reqs:['r4','r5']
},
{
  id:'q-pricingapp', cat:'cv', difficulty:3, likely:'near-certain',
  q:'Walk me through the pricing workflow application you built.',
  assess:'Product judgment end to end: how you framed a problem, what you decided and why, how you handled constraints, and — critically — whether you overclaim its results.',
  structure:{
    name:'CARL — Context, Action, Result, Learning',
    steps:['Context: the situation and why it mattered.','Action: what you specifically did, including the decisions.','Result: what changed, with the measurement boundary stated.','Learning: what you now do differently.'],
    when:'Use CARL rather than STAR when the learning is the strongest part of the story — which it is here. Explain the framework only if asked.'
  },
  example:'Context: pricing decisions were made in one working format and then manually transformed into the format the downstream system required. That created three costs — checks were not consistently available at the point a decision entered the system workflow, the two formats were not aligned, and context was lost in between. It was a fragmented handoff producing preventable risk. Action: I framed it, specified it, and built an internal workspace application that joins the guided pricing task to preventive checks and system-ready output. Three decisions mattered. I treated the workflow and the system output as one problem instead of optimizing each separately, which removed the repeated re-entry. I made control part of the product rather than a report about it — the checks sit inside the task and block release while unresolved. And I made accessibility a release criterion, because if the application were hard to use people would rebuild the manual process alongside it. Result: it is implemented and in ongoing internal use, with checks operating inside the workflow and output in the required downstream structure. I want to be precise about what I can claim: adoption rates, financial impact and time recovery would need separate verified measurement, and I cannot attribute them to the application alone within its broader commercial context. Learning: user experience and system requirements were never in competition. The recurring manual reconciliation between them was the cost.',
  alternatives:['If they push on the build, be clear about what you built and with what — do not inflate the engineering.','If they ask why you built it rather than requesting it, that is your ownership answer.'],
  followups:['Why did you build it yourself rather than raise a requirement?','How did you get people to use it?','What would you do differently?','How do you know it worked?'],
  weak:['Claiming a percentage improvement you cannot evidence.','Describing the application\'s features rather than the decisions.','Omitting the accessibility decision — it is the one that shows product maturity.'],
  rubric:['Frames a problem, not a tool','Names at least two real decisions with reasoning','States the measurement boundary unprompted','Ends with a transferable learning'],
  evidence:['e-app-problem','e-app-built','e-app-decisions','e-app-honesty','e-app-learning'],
  reqs:['r12','r10','r3','i1']
},
{
  id:'q-scope', cat:'cv', difficulty:4, likely:'likely',
  q:'Your CV says you "drive defined workstreams" and provide "inputs for prioritization". What do you actually decide?',
  assess:'Whether you inflate your scope. This is the gap in your profile and a good interviewer will find it. The winning answer is precise, unapologetic, and ends by naming what you are ready to own.',
  structure:{name:'Own → Influence → Escalate → Ready for',steps:['What you decide outright.','What you shape but do not sign.','What goes above you and to whom.','What you are ready to own that you do not own today.'],when:'Any scope or seniority probe. Precision beats inflation every time.'},
  example:'I will be precise. I decide the evidence base and the recommendation: which market signals, competitor activity and internal performance data count, how a product is classified by strategic role, and what the sequence should be. Within a workstream I decide requirements and launch priorities, and I decide when documentation and compliance evidence are enough for a product to be market-ready — that one is effectively a gate. I influence but do not sign the portfolio roadmap and pricing decisions; those sit with commercial and category leadership, and I bring the recommendation with the evidence and the trade-off. Supplier terms I negotiate but final commercial approval is above me. What I am ready to own, and what attracts me to this role, is the roadmap itself — not just the recommendation. I have been building the reasoning for it for two years; the step I want is being accountable for the sequence, not just for the argument.',
  alternatives:['If they seem to be testing seniority for banding, this is the moment to ask what distinguishes the bottom of the salary band from the top.'],
  followups:['Give me an example of a recommendation that was overruled.','What would you do differently if it were your decision?'],
  weak:['Claiming you own the roadmap when your materials say otherwise — it is checkable and it costs you everything.','Apologizing for the scope.','Vagueness: "I am involved in all of it."'],
  rubric:['Distinguishes decide / influence / escalate cleanly','No inflation','Names the step up you want','Sounds confident about a genuinely partial scope'],
  evidence:['e-lifecycle','e-evidence-inputs','e-compliance','e-suppliers'],
  reqs:['r2','r10','i6']
},
{
  id:'q-notautomotive', cat:'cv', difficulty:4, likely:'near-certain',
  q:'You have no automotive experience. Why should we hire you over someone who does?',
  assess:'How you handle a real deficiency. They are testing composure and whether you can make a transfer argument that is specific rather than hand-waving. Also whether you have done any homework.',
  structure:{name:'Acknowledge → Transfer → Evidence of learning → Counter-strength',steps:['Concede the gap plainly, once, without over-apologizing.','Name the specific discipline that does transfer.','Show you have started closing it.','Name what you bring that the automotive candidate probably does not.'],when:'Any gap question. The order matters — leading with the counter-strength reads as deflection.'},
  example:'You are right, and I would not pretend otherwise. Automotive is new to me. What is not new is owning data as a product. I am responsible for the business quality of product data across SAP, PIM and digital channels — hierarchies, classifications, commercial attributes, supplier references — kept consistent across Spanish and Portuguese markets, and I work from the position that product data is part of the product, not documentation about it. The discipline is the same: an owner, defined semantics, quality thresholds, and consequences when it is wrong. What genuinely differs is the data shape, and I want to be accurate about that — master data is slow and curated, vehicle data is high-frequency, intermittent, varies by brand and model year, and much of it is personal data with purpose limitation attached. I have been reading into that deliberately: the Data Hub model, the six brands, the main use cases, and the interaction between GDPR and the EU Data Act. What I bring that a pure automotive candidate may not is three years leading a SaaS sales team, which is the interface this role puts at its center, and a shipped product I framed and built myself.',
  alternatives:['If they follow with "what have you actually read", have two or three specifics ready — and say where you got them.'],
  followups:['What do you think the hardest thing about vehicle data is?','How long would it take you to be productive?','What have you read?'],
  weak:['"Domain can be learned" as a whole answer — true and dismissive.','Over-claiming familiarity from a few articles.','Excessive apology; concede once and move to the argument.'],
  rubric:['Concedes cleanly, once','Transfer argument is specific, not generic','Shows evidence of self-directed learning','Ends on a genuine differentiator'],
  evidence:['e-productdata','e-datapartofproduct','e-salesteam','e-app-built'],
  reqs:['r9','r4','r11']
},
{
  id:'q-coursework', cat:'cv', difficulty:3, likely:'possible',
  q:'Several items in your portfolio are coursework. How do you present those honestly?',
  assess:'Integrity, and whether you understand the difference between a model and a result. Handled well this is a strength — most candidates blur the line.',
  structure:{name:'Label → What it proves → What it does not',steps:['State plainly that it is coursework.','Say what the work genuinely shows.','State what it does not evidence — before they ask.'],when:'Any question about the strength of your evidence.'},
  example:'They are coursework and I label them that way in the portfolio itself. What they show is method: on the electric-mobility venture I built the concept, the business model and the export simulations, and structured it through staged investment gates with the explicit rule that macro attractiveness is not a release gate. On ZenHome France I built the comparative market evidence across ten criteria and owned the Incoterm strategy and export-pricing method. What they do not evidence is customer validation, funding, or observed demand or profitability — and I say so on the page. I would rather an interviewer discovers that from me than tests it. Honestly, that discipline is the thing I most want to bring: recording what is known, what is inferred and what still needs validation, so a team can challenge the assumption rather than inherit it.',
  alternatives:['If they dismiss coursework, do not defend it — pivot to the pricing application, which is a shipped product.'],
  followups:['What would you have done differently with real customers?','Which of these is closest to real product work?'],
  weak:['Presenting coursework as professional experience.','Being defensive about it.','Failing to name what it does not prove.'],
  rubric:['Labels it without prompting','Names the transferable method','States the boundary explicitly','Redirects to shipped work if pressed'],
  evidence:['e-solarmotion','e-solarboundary','e-zenhome','e-method-assumptions'],
  reqs:['r12']
},
{
  id:'q-knowus', cat:'company', difficulty:3, likely:'near-certain',
  q:'What do you know about our data business?',
  assess:'Preparation and judgment. They will notice both what you know and whether you distinguish what you have read from what you are guessing.',
  structure:{name:'What is public → What you infer → What you would ask',steps:['State the publicly verifiable facts.','Draw a product inference from them.','Ask the question that only someone who has thought about it would ask.'],when:'Any company-knowledge question. The third step is what separates you.'},
  example:'From public material: Volkswagen Group Info Services is the central vehicle-data interface for the Group, founded in 2019 and operating in its current form since 2021, and it runs a Data Hub offering standardized static and dynamic data across six brands — Volkswagen Passenger Cars, Volkswagen Commercial Vehicles, Audi, Škoda, SEAT and Cupra — under a model described as one face, one contract per use case, one system, with API access to over 100 data points per vehicle. The published solution areas are repair and maintenance, retail and importer, insurance, maps and life services, and fleet management, and there have been public partnership announcements with telematics and fleet providers. What I infer as a product manager: one contract per use case means the use-case definition is a product artifact, not a sales one — the same field used for a different purpose is a different product with different permissions. And the partnership route means the API is essential to someone else\'s business, which makes versioning and deprecation policy a commercial matter. What I would ask is how the DUP phases are gated and who the decision-maker is at each one, because that is not public and it is the shape of the job.',
  alternatives:['Verify the current partner list and brand list before the interview — announcements change.'],
  followups:['Which use case would you prioritize?','What do you think our biggest product risk is?'],
  weak:['Reciting the careers page.','Stating internal facts as if you know them.','Knowing nothing beyond "Volkswagen makes cars".'],
  rubric:['Facts are public and correctly attributed','Draws a genuine product inference','Ends with a question that shows thought','Does not invent internal detail'],
  evidence:[],
  reqs:['r9','i3','r1'],
  labels:['company']
},
{
  id:'q-dup', cat:'company', difficulty:4, likely:'likely',
  q:'How would you approach leading a product through the DUP lifecycle?',
  assess:'Whether you bluff. DUP is internal; you cannot know it. The right answer says so, then shows the phase logic you do run and maps it onto their named phases.',
  structure:{name:'Admit → Map → Ask',steps:['State that you do not know their internal process.','Describe your own gate logic against their named phases.','Ask what the exit criteria and decision-makers are.'],when:'Any question about a process you cannot know. Never guess at internal company detail.'},
  example:'I do not know DUP — it is internal and I would rather ask than guess. What I can tell you is the phase logic I run, and it maps closely onto the phases the ad names. At ideation and definition I insist on a problem statement rather than a request, and I gather requirements across every family at once — in my current work that is technical, commercial and regulatory; here it would add privacy and brand. At validation I use four gates before anything is committed: need validation, commercial viability, operational readiness and adoption preparedness — and I set the decision criteria before testing, so the result can change the direction rather than be reinterpreted. At delivery my definition of done includes support readiness and accepted risk ownership, not just working software. Operation and iteration are where I would expect the SLAs and routing to live. What I would want to know on day one is what the exit criteria are for each DUP phase, who signs each gate, and what evidence they expect to see — because a gate is only a control if it can be failed.',
  alternatives:['If they explain DUP in the interview, take notes visibly and ask one follow-up. That is a strong signal.'],
  followups:['What would you do in the first 90 days?','Which phase do you think is most often done badly?'],
  weak:['Inventing DUP phases.','Saying "I would learn your process" and stopping — it shows nothing.','A generic product-lifecycle lecture with no mapping.'],
  rubric:['Explicitly declines to guess','Maps your real gates onto their phase names','Asks about exit criteria and decision rights','Shows the gate has to be failable'],
  evidence:['e-fourgates','e-method-criteria','e-lifecycle'],
  reqs:['r1','r6'],
  labels:['verify']
},
{
  id:'q-firstninety', cat:'company', difficulty:3, likely:'likely',
  q:'What would you do in your first 90 days?',
  assess:'Whether you understand that a new hub needs clarity before it needs a roadmap. Most candidates propose a roadmap in week two, which is the wrong instinct.',
  structure:{name:'Learn → Clarify → Deliver something small',steps:['Weeks 1–4: learn the domain, the process and the people.','Weeks 4–8: clarify decision rights and interfaces — the thing that is genuinely missing in a new hub.','Weeks 8–12: deliver one small, real thing that proves the mechanism.'],when:'Planning and onboarding questions.'},
  example:'First month, learn rather than propose. The domain: what data exists across the six brands, at what frequency, with what gaps by model year. The process: DUP phases, exit criteria, who signs. The people: the Sales team I will interface with daily, and the privacy, legal and brand owners who can stop a product — I would want those relationships to exist before I need something from them. Second month, clarify. In a hub being stood up, the thing most likely to be missing is not a roadmap but agreement on who decides what. I would write down the decision rights as I understand them and share them for correction — that document is usually wrong and always useful. Alongside it, the definitions: what counts as an active vehicle, what counts as launched. Third month, deliver something small end to end — ideally one product through one full DUP phase transition, with the go-live checklist, the routing matrix and the KPI set actually written. Not because those artifacts are impressive, but because building one properly is how you find out where the process really breaks.',
  alternatives:['If the hub already has these artifacts, the answer becomes "learn them and find the first thing that is not working" — ask which is the case.'],
  followups:['What if you found the roadmap was already set?','Who would you want to meet first?'],
  weak:['Proposing a strategy before understanding the constraints.','A pure listening tour with no deliverable.','Ignoring that this is a new hub.'],
  rubric:['Learning before proposing','Identifies decision rights as the real gap','Ends with something concrete and small','Names the blocking stakeholders early'],
  evidence:['e-method-deliverers','e-crossfunctional'],
  reqs:['i1','r7','r1']
}
];
