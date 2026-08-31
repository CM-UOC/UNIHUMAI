/* Scenarios — Part V: Proof */
export default {

analytics: {
  title: 'The number that doubled',
  slug: 'Monthly review · Tuesday 10:00 · Week 18',
  premise: 'API call volume has doubled month on month. Marta has put it on the first slide. Hanna is on the call.',
  scene: [
    { t:'line', who:'Marta', x:'Calls doubled. Adoption is working.' },
    { t:'action', x:'You spent forty minutes on this on Sunday because the shape of the curve was wrong — it went up on a Wednesday and stayed flat.' },
    { t:'line', who:'You', x:'Before we report that upward, three things. Unique vehicles queried went up eleven per cent, not a hundred. Error rate went from two per cent to nine. And sixty per cent of the increase is one partner.' },
    { t:'line', who:'Hanna', x:'So what is it?' },
    { t:'line', who:'You', x:'One partner has a poller retrying against a failure. We are being paid for our own errors.' }
  ],
  beat: {
    q: 'Build the tree that would have caught this on the Wednesday.',
    weak: 'A dashboard of everything, or one headline number with no counter-metric.',
    strong: [
      'North star: contracted vehicles actively delivering usable data weekly. Usable is the load-bearing word.',
      'Adoption: partners integrated, time from contract to first successful call, share of contracted VINs actually queried.',
      'Reliability: availability, p95 latency, data freshness, share of responses failing plausibility checks.',
      'Commercial: revenue per active vehicle, expansion rate, churn.',
      'Operations: tickets per thousand active vehicles, share resolved without engineering escalation.',
      'Counter-metrics, always paired: call volume paired with error rate. Time-to-first-call paired with the range of partner types onboarded, or you improve it by onboarding only the sophisticated ones.',
      'And the honesty: none of this proves Meridian priced remarketing better. That needs a separate, harder study, and saying so out loud is what makes the rest of the numbers trustworthy.'
    ]
  },
  outcome: 'The slide changes to active vehicles with error rate beside it. Hanna asks for that pairing across the whole portfolio. The partner\'s poller is fixed within a week — a conversation that only happened because the metric was decomposed.',
  principle: 'Volume is an output that rises for good and bad reasons. Every target creates an incentive to game it, and a counter-metric is the cheapest protection you will ever buy.',
  wrong: 'Report the doubling. It goes into a portfolio pack, becomes a comparison against other products, and in three months someone asks why revenue did not follow — and the honest answer is that you were billing for retries.',
  carry: [
    'Pair every headline metric with the thing it might be damaging.',
    'State what the data cannot attribute. It makes what it can attribute credible.',
    'Sessions, calls and training attendance are outputs. Ask what changed.'
  ]
},

dataquality: {
  title: 'Forty thousand kilometres in a day',
  slug: 'Incident channel · Thursday 07:50 · Week 18',
  premise: 'Meridian priced three vehicles for remarketing off your odometer values. Their pricing team has already sent the quotes.',
  scene: [
    { t:'action', x:'Jonas has the record open. The value is a valid integer, in range, correctly typed. It passed every schema check on the way through.' },
    { t:'line', who:'Jonas', x:'The reading is forty thousand kilometres higher than the same vehicle the previous day.' },
    { t:'line', who:'You', x:'Is it wrong, or is it old?' },
    { t:'line', who:'Jonas', x:'Neither. It is a genuine transmission. The vehicle reported after a workshop visit and something reset.' },
    { t:'action', x:'So the data is accurate, valid, complete and physically impossible. And it reached a customer\'s customer.' }
  ],
  beat: {
    q: 'Structural validation passed. What was missing, and what do you ship?',
    weak: 'Tighten the schema. The value was already legal. Or tell Meridian to sanity-check their inputs, which defeats the purpose of buying a data product.',
    strong: [
      'Add plausibility rules, not just structural ones: rate of change against a physical maximum, and cross-field consistency.',
      'Decide the behaviour per consumer, in the data contract: suppress and return the previous value with an older timestamp, return it flagged low-confidence, or return nothing. A leasing customer wants it suppressed or flagged. A diagnostics customer might want the anomaly itself, because it may indicate a fault cluster.',
      'Expose quality to the consumer. They can handle imperfection; they cannot handle invisible imperfection.',
      'Trace upstream. Fixing it in the serving layer creates permanent divergence between what the vehicle said and what you serve.',
      'Set thresholds per dimension and monitor them like availability, because this is not a cleanup project.'
    ]
  },
  outcome: 'Plausibility checks ship in nine days. Two weeks later they catch a cluster of eleven vehicles from one brand after a firmware update — before any of it reaches a customer. That is the first time the product prevents a problem instead of reporting one.',
  principle: 'A data product\'s reputation dies from silent wrongness far faster than from outage. Customers forgive an endpoint that is down. They do not forgive one that confidently returns a wrong number that reaches their own customers.',
  wrong: 'Fix the three records and move on. The rule that would have caught them does not exist, so the next firmware update does it again — and the second time, the customer stops believing any of your numbers.',
  carry: [
    'Schema validation misses the damaging errors, because they are usually well-formed.',
    'Completeness is not accuracy and neither is usefulness.',
    'Fix upstream. Downstream patches multiply.'
  ]
},

dataproduct: {
  title: 'What "mileage" means',
  slug: 'Data contract workshop · Monday 09:00 · Week 19',
  premise: 'NordFleet\'s architect asks a question in a review that stops the room. It sounds trivial.',
  scene: [
    { t:'line', who:'NordFleet', x:'Your mileage field. Is that the odometer at the last transmission, or a computed estimate between transmissions?' },
    { t:'action', x:'Three people give three different answers.' },
    { t:'line', who:'NordFleet', x:'Right. And what is the transmission interval? Does it differ by brand? By model year? What happens after a battery disconnect?' },
    { t:'line', who:'Jonas', x:'It differs by brand. Two of the six are event-driven, the rest are periodic. Model year matters on one.' },
    { t:'line', who:'NordFleet', x:'Then I cannot build a business on this until it is written down. My customers will ask me, and “it depends on the brand” is not an answer I can give them.' }
  ],
  beat: {
    q: 'What turns a pipeline into a data product?',
    weak: 'Documentation. A wiki page is read once and diverges within a month, and it is not something a partner can hold you to.',
    strong: [
      'Semantics, written and binding: what the field means, its units, how it is measured, its frequency by brand, and what it returns when there is no value.',
      'A freshness indicator returned with every value, always. Stale-but-plausible is the most damaging failure in this domain.',
      'Quality thresholds per dimension, monitored, with a breach treated as an incident rather than a backlog item.',
      'A versioning and breaking-change policy published before the first partner integrates, not after the first complaint.',
      'Lineage — where the value came from and what transformed it — for debugging and for audit.',
      'An owner. Not a team, a person.',
      '“Standardised across six brands” is work you do, not a property you inherit.'
    ]
  },
  outcome: 'The data contract takes two weeks and is the single most reused artefact of the quarter. Aurora\'s technical due diligence, three months later, is answered almost entirely from it. NordFleet integrates.',
  principle: 'A data product is data packaged so a consumer can rely on it without understanding how it was produced. The pipeline is not the product; the promise about the pipeline is.',
  wrong: 'Ship the field with ambiguous semantics and every consumer invents their own interpretation. The misuse is silent, and you discover it through a customer complaint about a number that was technically correct.',
  carry: [
    'Always ship the value with its age.',
    'Define what the field returns when it has nothing. That is where the design lives.',
    'A partner needs a contract, not documentation.'
  ]
},

compliance: {
  title: 'The same field, two answers',
  slug: 'Call with Wolfsburg · Tuesday 16:00 · Week 19',
  premise: 'Aurora Assurance want driving-behaviour data for risk pricing. Marta has told them it is “a data question, not a legal one”. It is entirely a legal one.',
  scene: [
    { t:'line', who:'Marta', x:'We already hold the data. They just want to use it differently.' },
    { t:'action', x:'This is the sentence that sinks data products. You get Petra on the call before you answer it.' },
    { t:'line', who:'Petra', x:'Whose vehicles?' },
    { t:'line', who:'You', x:'Mixed. Some corporate fleet, some private lease.' },
    { t:'line', who:'Petra', x:'Then they are two products. For a company-owned vehicle where drivers are informed under an employment framework, that is one conversation. For a private lease, driving behaviour is personal data revealing a great deal about an individual. Consent must be explicit, specific and revocable.' },
    { t:'line', who:'You', x:'Revocable means we need a mechanism, not a policy. If someone withdraws consent the flow has to actually stop.' },
    { t:'line', who:'Petra', x:'Yes. And that is a product requirement, which is why I would rather have this call now than in week thirty.' }
  ],
  beat: {
    q: 'Marta asks what she can tell Aurora. What is the honest answer?',
    weak: 'Give a legal opinion. Or say “legal are looking at it” and leave her with nothing, which guarantees she improvises.',
    strong: [
      'Holding the data does not grant the right to use it this way. Purpose limitation means a new purpose usually needs a new basis.',
      'The corporate-fleet subset may be reachable sooner than the private-lease subset. That is a real, sellable answer.',
      'Revocation needs a mechanism in the product, which is engineering work nobody has scoped.',
      'Anonymisation is not an escape route: movement and behaviour patterns are frequently re-identifiable, so pseudonymised is still personal data.',
      'Your job is to frame the question precisely, name the owner and record the answer — not to give the opinion. Confidence without authority is the dangerous combination here.'
    ]
  },
  outcome: 'Aurora becomes a scoped proposal for the corporate-fleet subset, with the private-lease consent flow as a separate, funded piece of work. Marta gets a real answer in nine days instead of a maybe in nine weeks. It is smaller than she wanted and it is closeable.',
  principle: 'In a data business, governance is not a stage at the end. It determines what the product may be, for whom, and for what purpose — and the question is cheapest to ask at ideation.',
  wrong: 'Answer it yourself, or let it ride. Discover it two days before launch, or worse, after. A privacy stakeholder raising a blocking concern late is a mapping failure on your side, not obstruction on theirs.',
  carry: [
    'Purpose limitation: holding the data is not permission to use it that way.',
    'Consent must be revocable, and revocation is a product mechanism.',
    'Frame the question, name the owner, record the answer. Do not give the opinion.'
  ]
}
};
