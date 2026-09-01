/* Worked examples — requirements r1 to r7.
   kind: 'say'      words to speak, verbatim
         'artifact' a document, table or checklist you could actually bring
         'do'       a concrete procedure with named steps                    */
export default {

r1: [
  { kind:'say', label:'The mapping sentence, said out loud',
    body:'“I do not know DUP — it is internal, and I would rather ask than guess. What I can tell you is the phase logic I run, and it maps closely onto the phases you name. At ideation and definition I will not move until there is a problem statement rather than a request, and I gather requirements across every family at once — in my current role that is technical, commercial and regulatory; here it would add privacy and brand. At validation I use four gates: need validation, commercial viability, operational readiness and adoption preparedness, with the decision criteria written before the test so a result can actually change direction. At delivery my definition of done includes support readiness and accepted risk ownership, not just working software. Operation and iteration are where I would expect SLAs and routing to live.”' },
  { kind:'say', label:'The question, and the follow-up that shows you meant it',
    body:'“What are the exit criteria for each DUP phase, and who is the decision-maker at each gate?”\n\nThen, whatever they answer, follow with: “Has a product ever actually failed one of those gates?” A gate nobody has ever failed is a meeting, not a control — and their answer tells you in one sentence how much governance really bites here, which is something you cannot find out any other way.' }
],

r2: [
  { kind:'artifact', label:'A vision statement you could bring on paper',
    body:'FLEET CONDITION — PRODUCT VISION\n\nFor: commercial fleet operators running mixed Group vehicles across Europe.\nToday: they either fit third-party hardware to every vehicle, or they discover a problem when a driver calls from the roadside.\nIn three years: every commercial fleet running Group vehicles can see the real condition and availability of every vehicle, with no hardware fitted and one contract across all six brands.\nWe will know it is working when: the share of contracted vehicles returning usable data weekly is the number the business steers by.\n\nNon-goals, stated deliberately:\n· No consumer-facing application.\n· No driver-identifiable behavior data this year.\n· No per-customer schema variants.\n\nWhat would change this: if regulation makes raw access a common, low-value good faster than expected, the defensible position moves from access to standardization, and the vision text stays but the strategy underneath it changes.' },
  { kind:'artifact', label:'A three-horizon roadmap with honest confidence',
    body:'NOW — committed, high confidence\n· Cut partner integration time from four weeks to under two. Measured by time from contract to first successful call.\n· Ship a freshness timestamp on every value. Assumption: none — this is a defect.\n\nNEXT — planned, medium confidence\n· Battery health for electric vehicles. Assumption: the existing consent basis covers the field. If it does not, this moves out and the leasing use case narrows.\n· Self-service partner status page. Assumption: it removes roughly a third of support tickets — unverified.\n\nLATER — exploring, low confidence. These are bets, not plans.\n· Insurance use cases. Requires a consent model we do not have and a different buyer.\n· Workshop-facing predictive service.\n\nCustomer-safe version of the same thing: “We are investing in faster integration and richer electric-vehicle condition data, and exploring insurance use cases.” No dates, nothing resting on an open question.' }
],

r3: [
  { kind:'say', label:'The bridge, said in one breath',
    body:'“In my current role a product cannot reach the market until its Declaration of Performance, CE marking and Environmental Product Declaration are right. That taught me that compliance evidence is a release blocker, not paperwork you attach afterwards — and that the cheapest place to discover a compliance requirement is at definition, not two weeks before launch. I would expect purpose limitation to work the same way here: it is not a review at the end, it decides what the product may be. What is genuinely new to me is the specific frame — GDPR lawful basis and the Data Act — rather than the discipline of treating it as a gate.”' },
  { kind:'artifact', label:'The five-family requirement sheet for one endpoint',
    body:'ENDPOINT: GET /vehicles/{vin}/battery-health\n\nFUNCTIONAL\n· Return current state-of-health for a VIN inside the contracted fleet.\n\nTECHNICAL (non-functional — the part that decides whether it is usable)\n· 99.5% monthly availability; p95 latency under 400ms at 50 req/s.\n· Value returned with its capture timestamp, always.\n· Distinct error codes for “VIN not in contract” and “VIN in contract, no data yet”.\n· Schema versioned; breaking-change policy published.\n· Rate limit per partner, documented.\n\nLEGAL\n· Serve only VINs inside the contract, enforcing the contracted use-case scope.\n\nPRIVACY\n· State of health alone is low risk. Combined with location it is a different assessment. Purpose limited to fleet-condition management; retention bounded and stated.\n\nCOMMERCIAL\n· Metered per contracted vehicle per month, not per call, with a stated allowance.\n\nBRAND\n· Attribution constraints differ per brand and must be expressed in the partner-facing terms.\n\nThe functional line took ten minutes. The other five are the product.' }
],

r4: [
  { kind:'say', label:'Your strongest story, at interview length',
    body:'“Before product I spent three years leading a SaaS sales team, and the thing I took from it is what the Sales–Product interface feels like from the Sales side. I structured client feedback for pricing and feature-investment discussions, so I know what makes a feedback loop something Sales actually uses rather than something they comply with: it has to come back. If they hand you a signal and never hear what happened to it, they stop handing you signals, and then you are making roadmap decisions on the market you can see rather than the market that exists. In my current role I sit on the other side of that same interface, coordinating sales, marketing, supply chain and analytics — so I have now run the loop from both ends, and the discipline I bring is closing it.”' },
  { kind:'say', label:'The failure mode, named from the inside',
    body:'“The failure I know best is Sales promising a capability that does not exist. It is almost never dishonesty — it is a rep under quota pressure, in a room, filling a silence, with an imperfect picture of what the product does. So I do not treat it as a behavior problem. I prevent it by enabling on limits as well as on capability: the enablement pack says explicitly what the product does not do, and the customer-facing roadmap view carries confidence language rather than dates. And when a request does come in, I ask what the customer is trying to achieve before I cost anything, because half the time the promise was a guess at a solution and the real need has a cheaper answer we already have.”' }
],

r5: [
  { kind:'artifact', label:'The decision rule, written down before you need it',
    body:'BESPOKE REQUEST — DECISION RULE\n\nBuild it as a platform capability when any two of these hold:\n· Three or more customers have asked for the same underlying need in the last two quarters.\n· It can be delivered without a customer-specific field, table or schema variant.\n· It sits inside a use case we already contract for, so no new consent or legal basis is needed.\n\nBuild it as a one-customer variant only when all of these hold:\n· Contract value at risk exceeds the threshold leadership has set — and leadership, not the PM, confirms that.\n· Engineering has costed the ongoing maintenance tax, not just the build.\n· The displaced work is named in writing and the person losing it has been told.\n\nNever:\n· Agree and quietly deprioritise. It costs the roadmap anyway and destroys the relationship.\n· Score a legal or consent blocker as “effort”. A blocker is not a big number, it is a different question.' },
  { kind:'say', label:'The four sentences, in order, to a sales director',
    body:'1. “Tell me what they are actually trying to do with it.” — the request arrived as a solution; the need may have three cheaper answers.\n\n2. “How many other customers have asked for something like this?” — reach is what turns a favor into a product decision.\n\n3. “If we do this in Q3, the freshness work moves to Q4. Is that the trade you want to make?” — now the trade-off is visible and it is not personal.\n\n4. “Here is what I can do by that date, and here is what I would need to do the rest.” — never refuse without leaving them something to take back to the customer.\n\nIf it still stands after those four, it goes up in writing with options, costs and a recommendation — not as a complaint, and not over their head before they have heard it from me.' }
],

r6: [
  { kind:'artifact', label:'A go-live checklist for a data product',
    body:'GO-LIVE — FLEET CONDITION v1.0\n\nPermission and contract\n☐ Contract scope covers the use case; permitted purposes recorded per customer.\n☐ Consent basis confirmed for every personal-data field.\n\nThe product itself\n☐ Verified against acceptance criteria, including non-functional.\n☐ Data quality thresholds defined and currently met, freshness included.\n☐ Schema versioned and documented; breaking-change policy published.\n☐ Rate limits set and communicated to every consumer.\n\nOperability — the half that is not about software\n☐ Monitoring live for availability, latency and freshness, alerting to a named team.\n☐ Routing matrix agreed and published.\n☐ Runbook written and walked through with support on real cases, until they resolve five common issues unaided.\n☐ Rollback tested; its trigger agreed now, while nobody is under pressure.\n\nPeople\n☐ Sales enabled on capability AND on limits.\n☐ Residual risks listed, each accepted in writing by a named owner with a review date.\n\n☐ Go / no-go decision taken explicitly, on the evidence above.' },
  { kind:'artifact', label:'One filled-in risk handover row',
    body:'RISK: Service-due semantics differ by brand — two report a date, four report distance remaining. Served under one field name at launch.\n\nLikelihood: high (it is already true)\nImpact: medium — a consumer may compare unlike values across brands.\nResponse: reduce. Ship the brand-specific unit alongside the value and document it in the data contract. Do not unify the field until all six can be normalized.\nAccepted by: Head of Service Operations (named individual, in writing)\nReview date: 90 days after go-live\nTrigger for re-opening: any consumer support ticket that turns on comparing the field across two brands.\n\nThis is what “risk handover” means. An email saying “heads up, brands differ” is a notification. The risk stays with you, invisibly, until someone accepts it with a date against their name.' }
],

r7: [
  { kind:'artifact', label:'A KPI tree you could put on one page',
    body:'NORTH STAR\nContracted vehicles returning usable data in the last 7 days.\n(“Usable” is the essential word: present, fresh, and passing plausibility.)\n\nADOPTION\n· Partners integrated / partners contracted\n· Median days from contract signature to first successful call\n· Share of contracted VINs actually queried in the last 30 days\n\nRELIABILITY\n· Availability %  · p95 latency  · Median data age at time of serving\n· Share of responses failing plausibility rules\n\nCOMMERCIAL\n· Revenue per active vehicle  · Contract expansion rate  · Churn\n\nOPERATIONS\n· Support tickets per 1,000 active vehicles\n· Share resolved at first line without engineering escalation\n\nCOUNTER-METRICS — each paired, deliberately\n· API call volume → always shown beside error rate. Volume rises when partners retry against failures.\n· Time-to-first-call → paired with the spread of partner types onboarded, or you improve it by only onboarding sophisticated partners.\n· Tickets per 1,000 vehicles → paired with unresolved-ticket age, or you close tickets rather than solve them.\n\nWHAT THIS DOES NOT PROVE\nNone of it shows the customer made a better decision. That needs a separate study, and saying so is what makes the rest credible.' },
  { kind:'artifact', label:'An SLA and the routing table underneath it',
    body:'SERVICE LEVELS — set from measurement, never from aspiration\n\n' +
      'Indicator            Measured   SLO (internal)  SLA (contracted)\n' +
      'Availability         99.82%     99.7%           99.5%\n' +
      'p95 latency          310ms      under 400ms     under 600ms\n' +
      'Freshness (<24h)     92%        90%             85%\n' +
      'Support 1st response 3.1h       under 4h        under 8h\n\n' +
      'The headroom is deliberate. Set the SLA equal to what you achieve and every ordinary bad week becomes a contractual breach.\n\n' +
      'ROUTING MATRIX\n\n' +
      '1. “Data missing for a vehicle”\n' +
      '   First line support · 4h · First check: contract scope and VIN eligibility,\n' +
      '   because most of these are scope rather than fault · Escalates to data operations\n\n' +
      '2. “The value looks wrong”\n' +
      '   Data operations · 8h · First check: plausibility against the source before it\n' +
      '   becomes an engineering ticket · Escalates to engineering\n\n' +
      '3. “The endpoint is returning errors”\n' +
      '   Engineering on-call · 30 min, page immediately · First check: error budget\n' +
      '   remaining · Escalates to engineering lead\n\n' +
      '4. “Can we add vehicles, or a new use case?”\n' +
      '   Account manager · next business day · This is commercial, not support.\n' +
      '   Routing it to engineering wastes two days · Escalates to product\n\n' +
      '5. “Schema or integration question”\n' +
      '   Developer support · 1 business day · First check: the published data contract\n' +
      '   · Escalates to product\n\n' +
      'Every row has a first diagnostic step. That is what lets first line resolve most of them without you, and it is the difference between a routing table and a wall chart.' }
]
};
