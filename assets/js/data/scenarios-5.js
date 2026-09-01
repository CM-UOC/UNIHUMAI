/* Scenarios — Part VII: Market, and the remaining Part II/III lessons */
export default {

gtm: {
  title: 'Two ways to reach eleven thousand vehicles',
  slug: 'Strategy session · Wednesday 14:00 · Week 21',
  premise: 'Fleet Pulse can go direct to fleet operators, or through the platforms those operators already run. NordFleet is the second option, and Marta has already said yes to them.',
  scene: [
    { t:'line', who:'Marta', x:'NordFleet have eleven thousand vehicles under management. Direct sales would take us two years to reach that.' },
    { t:'line', who:'You', x:'Agreed. And it makes them a different kind of customer, which changes what we have to build.' },
    { t:'line', who:'Marta', x:'It is the same API.' },
    { t:'line', who:'Jonas', x:'It is not. If their product depends on our schema, we cannot change it the way we change it now.' },
    { t:'action', x:'Andrés, who has been quiet: “And when a fleet manager sees a wrong value, they call NordFleet, who call me. That is a tier that does not exist in the routing matrix.”' }
  ],
  beat: {
    q: 'The motion is not just how it is sold. What does it change about the product?',
    weak: 'Treat NordFleet as a large customer. They are not — they are a channel with their own roadmap, their own customers, and escalation power your direct customers do not have.',
    strong: [
      'Schema stability becomes a commercial commitment. A breaking change is not a release note, it is an event requiring versioning, notice and a parallel run.',
      'The support model gains a tier. The routing matrix needs a row for issues arriving through a partner, and NordFleet need to know which tier is theirs.',
      'Pricing must leave partner margin. A channel that cannot make money will not sell.',
      'Their release calendar constrains yours. A field you plan for Q4 may block a launch they have already announced to their customers.',
      'And the direct motion does not disappear — Meridian is direct. You are now running two motions with different requirements, and saying that out loud is the point of the session.'
    ]
  },
  outcome: 'A deprecation policy is published before NordFleet go live: ninety days notice, semantic versioning, a parallel-run window. It has never actually had to be used. It is the single reason NordFleet\'s architect agreed to build on the API at all.',
  principle: 'Go-to-market is not marketing\'s job and it is not a phase after the build. The motion determines the requirements — which is why it cannot be decided after the product exists.',
  wrong: 'Ship to a partner with no deprecation policy. The first breaking change is a commercial incident, and the trust you spend is not recoverable with a well-written apology.',
  carry: [
    'Enable Sales on limits as well as capability.',
    'Time to first value predicts renewal better than any feature.',
    'Availability alone does not create adoption. Diagnose the barrier before adding enablement.'
  ]
},

commercial: {
  title: 'Per call, per vehicle, per use case',
  slug: 'The one-pager, Monday · Week 21',
  premise: 'Three options. The choice will be embedded in every contract Fleet Pulse ever signs.',
  scene: [
    { t:'action', x:'Per API call is the obvious one. It is easy to meter and it feels fair.' },
    { t:'line', who:'Jonas', x:'It also means the moment a partner integrates properly and polls efficiently, our revenue falls. And a partner with a bad implementation pays us more.' },
    { t:'action', x:'Marta, from the commercial side, adds the thing you had not considered: “Meridian cannot forecast a per-call bill. Procurement will not sign a number they cannot predict.”' },
    { t:'action', x:'Per use case is the model GIS describes publicly — one contract per use case. Which sounds like a sales convenience and is not.' },
    { t:'line', who:'Petra', x:'If the contract is scoped to a use case, then the use case has to be defined precisely enough to enforce. That is your job, not legal\'s.' }
  ],
  beat: {
    q: 'Which one, and what does choosing it commit you to?',
    weak: 'Cost-plus. Marginal cost is close to zero, so it tells you nothing. Or per-call because it is easiest to meter.',
    strong: [
      'Start from the value: what does the customer stop doing. Meridian stops guessing condition from a mileage band. That value scales with vehicles, not with calls.',
      'Per vehicle scales with the customer\'s own growth, is predictable for procurement, and does not punish good integration.',
      'Per use case sits on top of it: the same VIN and the same field used for maintenance versus insurance risk scoring are two products with different permissions and possibly a different consent basis.',
      'Which means: when a customer asks to reuse data for a new purpose, that is a new product definition, not an upsell. Recognizing that quickly is a large part of this job.',
      'Commitments: you must now meter and expose vehicle-level activity, and you must be able to define a use case tightly enough for legal to enforce it.',
      'And say the honest thing out loud — building a price from cost through channel to a retail figure, which is how physical goods work, does not transfer here.'
    ]
  },
  outcome: 'Per contracted vehicle per month, packaged by use case, tiered on data breadth and freshness rather than on volume bands. Finance flags the metering work, which lands in the next quarter. Nobody has to renegotiate anything two years later.',
  principle: 'The pricing metric is a product decision wearing commercial clothes. It shapes customer behavior, your revenue predictability, and what you are obliged to build.',
  wrong: 'Per call. Customers ration the thing you want them to depend on, procurement cannot forecast, and you are financially rewarded for your own unreliability.',
  carry: [
    'Near-zero marginal cost makes cost-plus meaningless. Price on value and permission.',
    'If a use case cannot be defined tightly enough to enforce, it cannot be priced.',
    'A new purpose for existing data is a new product, even when no engineering is needed.'
  ]
},

partners: {
  title: 'The change that is now a commercial event',
  slug: 'Wednesday 09:15 · Week 22',
  premise: 'NordFleet went live six weeks ago. You need to change the semantics of one field, and it is no longer a decision you can make alone.',
  scene: [
    { t:'action', x:'The field is service-due. Two brands report it as a date; four report it as a distance remaining. Serving both under one name was a compromise that has stopped being defensible.' },
    { t:'line', who:'Jonas', x:'It is a two-day change.' },
    { t:'line', who:'You', x:'It is a two-day change and a ninety-day event.' },
    { t:'action', x:'NordFleet have eleven thousand vehicles and their own customers looking at screens built on that field.' },
    { t:'line', who:'NordFleet architect', x:'(on the call) We can absorb it. We need the notice period, and we need both versions live while we migrate. That is why we asked for the policy before we integrated.' }
  ],
  beat: {
    q: 'What made this survivable, and what would have made it a crisis?',
    weak: 'Ship it with a release note. The field changes meaning under a partner\'s product and their customers see wrong information first.',
    strong: [
      'The deprecation policy existed before the first integration: ninety days notice, semantic versioning, a parallel-run window, migration support.',
      'Version it — the change is additive alongside the existing field, not a mutation of it.',
      'Give the agreed notice, in writing, to every consumer and not just the loudest one.',
      'Run both in parallel for the full window, even though only one partner needs it.',
      'Their roadmap constrains yours: ask what they have already announced before you set the date.',
      'And say the quiet part: a partner is not a large customer. They have built a business on your interface and they have escalation power your direct customers do not.'
    ]
  },
  outcome: 'The migration completes in seventy-one days with no customer-visible incident. NordFleet\'s architect uses the phrase “this is why we chose you” in a review, which reaches Hanna, which does more for the portfolio than any feature shipped that quarter.',
  principle: 'When a partner embeds your product, your interface becomes essential to someone else\'s business. Everything you would want if the roles were reversed — notice, versioning, a parallel run — becomes a requirement rather than a courtesy.',
  wrong: 'Change it in two days. You save eighty-eight days and lose the channel, and every future partner will ask their reference customer about you before they integrate.',
  carry: [
    'Publish the deprecation policy before the first partner integrates.',
    'A partner needs stability commitments and margin, not just access.',
    'Agree tier ownership for shared customer issues in writing, before go-live.'
  ]
},

negotiation: {
  title: 'Four hundred thousand euros and four sentences',
  slug: 'Marta\'s desk · Tuesday 16:40 · Week 22',
  premise: 'Aurora will sign for €400k if Fleet Pulse carries one bespoke field for them. Marta needs an answer by Friday. This is the conversation you will be asked about in the interview.',
  scene: [
    { t:'line', who:'Marta', x:'Four hundred thousand. One field. Tell me why not.' },
    { t:'action', x:'There are four wrong answers available and you can feel all of them. Say yes. Say no and cite the framework. Say yes and let it slip quietly. Escalate it over her head before speaking to her.' },
    { t:'action', x:'You ask a question instead.' },
    { t:'line', who:'You', x:'What are they actually trying to do with it?' },
    { t:'line', who:'Marta', x:'Identify vehicles with unusual usage patterns. For risk pricing.' },
    { t:'action', x:'Which is not a field. It is a purpose, and it is the one Petra has already said needs a consent basis that does not exist.' }
  ],
  beat: {
    q: 'The four sentences. What are they, and in what order?',
    weak: 'Refuse on principle, and principle sounds like preference. Or agree, and then let it slip — the worst outcome available, because it costs the roadmap anyway and destroys the relationship you need every day.',
    strong: [
      '“Tell me what they are trying to do with it.” The request arrived as a solution. The need might have three cheaper answers, or it might be something you cannot legally sell.',
      '“How many other customers have asked for something like this?” Reach turns a favor into a product decision. Three customers and it is a roadmap item; one and it is a variant that taxes every future change.',
      '“If we do this in Q3, freshness moves to Q4. Is that the trade you want?” The trade-off is now visible and it is not personal.',
      '“Here is what I can do by then, and what I would need to do the rest.” Never refuse without leaving them something to take back to the customer.',
      'Then, if it still stands, escalate as a written choice with options, costs and a recommendation — not as a complaint, and not over her head before she has heard it from you.'
    ]
  },
  outcome: 'The corporate-fleet subset is sellable now and the private-lease consent flow becomes funded work. Aurora signs a smaller number in the same quarter and a larger one two quarters later. Marta starts asking “what are they trying to do with it?” before she brings you requests, which is worth more than the deal.',
  principle: 'A no that protects both the product and the relationship is made of criteria, a visible trade-off and a real alternative. Saying no on principle sounds like preference; saying yes to protect the relationship destroys it more slowly.',
  wrong: 'Agree and deprioritise. You lose the quarter and the trust, and the next time Marta wants something she will go around you rather than through you.',
  carry: [
    'Ask what they are trying to achieve before you cost anything.',
    'Reach is what turns a favor into a product decision.',
    'Escalate as a written choice, and only after the person in front of you has heard it.'
  ]
}
};
