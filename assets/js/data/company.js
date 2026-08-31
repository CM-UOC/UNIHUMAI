/* company.js — GIS:Hub dossier.
   Every item carries provenance. Nothing internal is invented. */

export const COMPANY_FACTS = [
  { src:'jd', text:'Volkswagen Group Info Services AG and the Volkswagen Digital:Hub are creating a dedicated “GIS:Hub” in Barcelona with a focus on commercial B2B data business.' },
  { src:'jd', text:'The hub is described as bringing together “deep automotive and data expertise” from Group Info Services with “an agile, digital, hands-on environment” from the Digital:Hub.' },
  { src:'jd', text:'Stated aim: “advance the digital value creation across the entire vehicle life cycle”, developing data-driven B2B products for customers, partners and the Volkswagen ecosystem.' },
  { src:'jd', text:'The culture paragraph asks for “pioneers – people who are excited to build, shape and grow something from the ground up”, taking ownership and turning concepts into products with measurable business value.' },
  { src:'company', text:'Volkswagen Group Info Services AG is described publicly as the central vehicle-data interface of the Volkswagen Group, founded in 2019 as a subsidiary of CARIAD SE and operating in its current form since 2021, based in Wolfsburg.' },
  { src:'company', text:'Its Data Hub is presented as “one face” (a single interface for third parties), “one contract” (per use case) and “one system” (multibrand data access).' },
  { src:'company', text:'Static and dynamic vehicle data is consolidated across six Group brands — Volkswagen Passenger Cars, Volkswagen Commercial Vehicles, Audi, Škoda, SEAT and Cupra — and provided in a standardised format.' },
  { src:'company', text:'Public material references API access to more than 100 data points per vehicle, and a database in the region of 168 million vehicles.' },
  { src:'company', text:'Published solution areas: repair & maintenance, retail & importer (sales and remarketing), insurance, maps & life services, and fleet management.' },
  { src:'company', text:'Example use cases cited publicly include fuel-level monitoring, electric-vehicle battery tracking, performance reporting and proactive vehicle-health notifications.' },
  { src:'company', text:'A series of B2B partnerships with telematics, fleet-management and analytics providers have been announced publicly for fleet-data integration — several enabling fleet operators to connect vehicles without installing additional hardware.' },
  { src:'company', text:'Public-facing material references GDPR purposes of use and carries a dedicated EU Data Act section.' },
  { src:'verify', text:'“DUP (Data Usage Process)” is named in the job ad as the product lifecycle framework. Its phases, artefacts, exit criteria and approvers are not publicly documented. Ask about them — do not assume them.' },
  { src:'verify', text:'“Ref: Level C” appears at the foot of the ad. This is an internal grading marker whose meaning is not public. The €38,000–€80,000 band is unusually wide, which suggests the level is set after interview on evidenced seniority.' },
  { src:'assume', text:'English is very likely the working language, with German valuable for the Wolfsburg interface. Not stated in the ad — confirm it.' },
  { src:'assume', text:'The role is Barcelona-based. On-site versus hybrid expectations are not stated. Confirm before the final stage.' }
];

export const PRODUCT_INFERENCES = [
  { title:'“One contract per use case” makes the use case a product artefact',
    body:'If the contract is scoped to a use case, then defining a use case precisely enough to be enforced is product work, not sales paperwork. It also means the same field consumed for a different purpose is a different product, with potentially a different lawful basis and different brand constraints — so a customer asking to reuse data they already receive is a definition question before it is a commercial one.' },
  { title:'Standardisation across six brands is the hard part, and it is a definition problem',
    body:'“Standardised format” across six brands and many model years is work, not a property. Signal availability, transmission frequency and field semantics vary. A large share of the product manager\'s effort will go into deciding what a field means when the underlying reality differs by brand — and into what the API returns when it does not exist for a given vehicle.' },
  { title:'A partner-led motion makes your interface load-bearing for other businesses',
    body:'The public partnership announcements imply a substantial partner channel. That changes product requirements: schema stability, a published deprecation policy, versioning with notice, a support tier that handles issues arriving through a partner, and pricing that leaves partner margin. It also gives partners escalation power that direct customers do not have.' },
  { title:'The Sales interface being a headline responsibility tells you the deal shape',
    body:'A product manager named as the primary day-to-day Sales interface implies deals that are individually negotiated and product-shaped, rather than a self-serve catalogue. Expect frequent bespoke requests, and expect the ability to decline one well to be a core daily skill.' },
  { title:'KPIs, SLAs, routing and knowledge transfer in one bullet describes an operating model',
    body:'That combination is the operating model of a live service. It suggests products already in operation with real customers, real incidents, and a support function that needs to answer without escalating to the PM. Preparing on this is disproportionately valuable because the artefacts are concrete and few candidates will have thought about them.' },
  { title:'The regulatory frame is a market force, not just a constraint',
    body:'The EU Data Act obliges data holders to make connected-product data available to users and, at their request, to third parties on FRAND terms. That lowers the access barrier across the market — which pushes the defensible position away from exclusive access and towards standardisation, breadth across brands, contractual simplicity and reliability. Exactly the things the Data Hub positioning already claims.' }
];

export const SOURCES = [
  { label:'Volkswagen Group Info Services — public site', url:'https://drivesomethinggreater.com/' },
  { label:'Volkswagen Group FleetHub — fleet interface data', url:'https://www.groupfleet.com/en/fleet-interface-data/' },
  { label:'Targa Telematics × VW Group Info Services partnership', url:'https://targatelematics.com/media/press-release/targa-telematics-partnership-signed-with-volkswagen-group-info-services-ag-for-fleet-data-integration-from-volkswagen-passenger-cars-volkswagen-commercial-vehicles-audi-skoda-seat-cupra-vehicles/' },
  { label:'OCTO × VW Group Info Services partnership (Businesswire)', url:'https://www.businesswire.com/news/home/20260324113379/en/OCTO-and-Volkswagen-Group-Info-Services-AG-Form-Partnership-for-Fleet-Data-Integration' },
  { label:'Cofinity-X × VW Group Info Services milestone', url:'https://www.cofinity-x.com/blog/cofinity-x-and-volkswagen-group-info-services-ag-achieve-a-milestone' },
  { label:'Volkswagen Group Services careers portal', url:'https://jobs.volkswagen-group.com/' },
  { label:'European Commission — guidance on vehicle data (Reg. EU)', url:'https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A52025XC05026' },
  { label:'Taylor Wessing — FAQ on access to vehicle data and data governance', url:'https://www.taylorwessing.com/en/insights-and-events/insights/2026/01/faq-access-to-vehicle-data-and-data-governance' }
];

export const ASK_THEM = [
  { q:'What are the exit criteria for each DUP phase, and who is the decision-maker at each gate?', why:'Only someone who has thought about the role asks this. It also tells you whether the gates are real controls or formalities.' },
  { q:'Where does the product manager\'s decision right end today — do I own the roadmap, or recommend it?', why:'The single most useful thing to know before accepting. It also signals that you think in decision rights.' },
  { q:'How much of the go-to-market runs through partners versus direct sales, and how does that change what the product team optimises for?', why:'Shows you have read the public partnership material and understood its product consequences.' },
  { q:'When a customer asks to use data they already receive for a new purpose, what does that process look like today?', why:'Tests whether you understand purpose limitation — and reveals how mature their governance process actually is.' },
  { q:'What does the hub not yet have that it will need in six months?', why:'Invites an honest answer about the gaps you would be walking into, and tells you where you could contribute fastest.' },
  { q:'The band for this role is wide. What distinguishes someone at the bottom of it from someone at the top?', why:'A legitimate question, asked in criteria rather than in money. Best kept for a later stage.' },
  { q:'What would make you say, a year from now, that this hire went well?', why:'Gives you the actual success criteria, which are rarely the same as the job ad.' },
  { q:'How do the two parent organisations divide governance — who approves what?', why:'Directly relevant to the structural ambiguity of a joint hub, and it shows you have thought about how the venture is put together.' }
];
