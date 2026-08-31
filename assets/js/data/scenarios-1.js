/* Scenarios — Part I: The ground, and Part II: Evidence (first half) */
export default {

strategy: {
  title: 'Four doors, one team',
  slug: 'Carrer de Pallars · Monday 09:12 · Week 11',
  premise: 'Hanna is down from Wolfsburg for two days. She has asked for twenty minutes on where Fleet Pulse is going. Marta has invited herself.',
  scene: [
    { t:'action', x:'The whiteboard still has last week\'s schema on it. Hanna does not sit down.' },
    { t:'line', who:'Hanna', x:'The portfolio goal for next year is growth in commercial B2B data revenue. That is what I have been given. What I need from you is what that means for Fleet Pulse.' },
    { t:'line', who:'Marta', x:'It means insurance. Aurora is the biggest number in my pipeline by a factor of four. Everything else is rounding.' },
    { t:'action', x:'Jonas, from the corner, without looking up: “Insurance needs driving behaviour. Different data, different consent, different everything.”' },
    { t:'line', who:'Marta', x:'So we build it. That is the job, isn\'t it?' },
    { t:'action', x:'Hanna turns to you. She has eleven products and forty minutes in Barcelona.' },
    { t:'line', who:'Hanna', x:'You have one product and you have been here eleven weeks. Tell me where it plays.' }
  ],
  beat: {
    q: 'You have about ninety seconds. What do you actually say?',
    weak: 'Agreeing that insurance is the priority because the number is biggest, or defending fleet because it is what you have already started.',
    strong: [
      'Name the four doors out loud so the choice is visible: leasing, corporate fleets, workshops, insurance. All four are real; they are not all winnable this year.',
      'Say which one you would take first and why, in terms of what it costs to win: fleet operators buy on measurable operating cost, integrate through platforms they already run, and need no consumer-facing consent flow.',
      'State the non-goals in the same breath. No driver-identifiable data this year. No per-customer schema variants. No consumer app.',
      'Do not refuse insurance. Price it: “Aurora is winnable, and winning it means a consent model we do not have, a risk-scoring capability we have not built, and a different buyer. That is a portfolio decision, not a Fleet Pulse decision. If you want it, tell me what it replaces.”'
    ]
  },
  outcome: 'Hanna does not decide in the room. She writes “beachhead: fleet + leasing. Aurora = separate business case, Q3” on the whiteboard and photographs it. Marta is not happy, but she now knows exactly what she is arguing against, and she can take a real answer back to Aurora instead of a maybe.',
  principle: 'Strategy is not the ambition. It is the four doors named out loud, one of them chosen, and the cost of the others made visible to whoever is allowed to overrule you.',
  wrong: 'Say yes to Aurora in the room and you have committed a nine-person hub to a consent model, a new capability and a new buyer — by nodding. Six weeks later, when nothing is shipped, nobody will remember that you were being agreeable.',
  carry: [
    'The non-goals are the load-bearing part. Without them nothing can be refused.',
    'Never refuse a big opportunity. Price it, and hand the trade-off up.',
    'A strategy you cannot state in ninety seconds is not one your team can use.'
  ]
},

problem: {
  title: 'The alert that was not the problem',
  slug: 'Slack · Tuesday 08:41 · Week 11',
  premise: 'NordFleet\'s integration engineer files a request through Marta. It arrives at your desk as a one-line ticket.',
  scene: [
    { t:'quote', x:'“Can you add an alert when a vehicle stops sending data? — NordFleet”' },
    { t:'action', x:'Marta has already replied to them: “Raising it with product now.” Which means they think it is coming.' },
    { t:'action', x:'You call the NordFleet engineer instead of estimating it.' },
    { t:'line', who:'NordFleet', x:'It is not really about alerts. Last month a customer rang us about a van showing forty thousand kilometres less than the driver said. Took us two days to work out the feed had gone quiet in March and we were serving the last value we had.' },
    { t:'line', who:'You', x:'How often has that happened?' },
    { t:'line', who:'NordFleet', x:'Four times since we started. Twice it reached the end customer. One of those was a leasing valuation.' }
  ],
  beat: {
    q: 'Rewrite the ticket as a problem statement, and notice what it opens up.',
    weak: '“NordFleet need an alert when data stops.” That is the solution they arrived with, and it closes the door on three cheaper answers.',
    strong: [
      'Who: partners integrating Fleet Pulse, and their end customers.',
      'Situation: a vehicle stops transmitting and the API keeps returning the last known value with no prominent indication of its age.',
      'Failure: consumers cannot tell a current reading from a three-month-old one, and act on it.',
      'Evidence: four occurrences since integration began, two reaching the end customer, one affecting a leasing valuation. Cost is trust, and in one case a mispriced asset.',
      'Cost of inaction: it will recur, and it will eventually recur on a contract with a service level attached.'
    ]
  },
  outcome: 'The solution space opens. An alert is one option. So is returning a freshness timestamp with every value — cheaper, fixes it for every partner rather than one, and prevents the misuse rather than reporting it afterwards. So is a status endpoint. You ship the timestamp first. NordFleet stop asking for the alert.',
  principle: 'A request arrives as a solution. The problem is underneath it, and it is almost always bigger and cheaper to solve than the thing that was asked for.',
  wrong: 'Build the alert. It solves the symptom for one partner, leaves every other consumer exposed, and adds a notification system you now maintain forever. The stale value still goes out — you just email about it afterwards.',
  carry: [
    'Never estimate a request before you have heard the situation that produced it.',
    'Frequency and cost are the two things a request never comes with, and the two you need.',
    'The best solution is often not the one that was requested, and is often cheaper.'
  ]
},

valueprop: {
  title: 'What Meridian is actually buying',
  slug: 'Meridian Leasing, Poblenou · Wednesday 15:00 · Week 11',
  premise: 'Pilot review with your first signed customer. Marta has built the deck. You read it on the taxi over.',
  scene: [
    { t:'action', x:'Slide four says: “Over 100 data points per vehicle. Six brands. One API. One contract.”' },
    { t:'action', x:'Across the table, Meridian\'s remarketing manager is polite and unmoved. Twenty minutes in, she asks the only question that matters.' },
    { t:'line', who:'Meridian', x:'What do I stop doing?' },
    { t:'action', x:'Marta starts on integration effort. You put your hand flat on the table, which you will apologise for later.' },
    { t:'line', who:'You', x:'Today, when a car comes off lease, how do you price it?' },
    { t:'line', who:'Meridian', x:'Mileage band and an inspection at the depot. The inspection is two weeks after the vehicle is back and by then we have already quoted.' },
    { t:'line', who:'You', x:'So you quote on a band, and then you find out.' },
    { t:'line', who:'Meridian', x:'Yes. And when we are wrong we are wrong by four figures.' }
  ],
  beat: {
    q: 'Rewrite the proposition on the taxi home.',
    weak: '“Over 100 data points across six brands via one API.” Every word true. It describes what you have, not what she gets.',
    strong: [
      'For a leasing company pricing vehicles at end of term,',
      'who today quotes from a mileage band and learns the real condition two weeks after committing,',
      'Fleet Pulse gives the actual condition of each vehicle before the quote goes out,',
      'without fitting hardware and under one contract across all six Group brands,',
      'unlike the depot inspection, which arrives after the decision has been made.'
    ]
  },
  outcome: 'The proof points do not change. What changes is what they are proof of. “No hardware, six brands, one contract” stops being the claim and becomes the reason the claim is credible. Marta rewrites slide four herself.',
  principle: 'A value proposition is not what your product contains. It is the decision the customer can now make differently, measured against what they do today.',
  wrong: 'Lead with the data points and you compete on quantity with anyone who also has data. Lead with the decision and the comparison becomes the depot inspection, which you beat by two weeks.',
  carry: [
    'Finish the sentence “…so that they can…” and lead with the second half.',
    'In B2B the competitor is usually the current workaround, not a vendor.',
    'Ask what they stop doing. If nothing stops, they will not buy.'
  ]
},

lifecycle: {
  title: 'The endpoint with three customers',
  slug: 'Portfolio review · Thursday 11:20 · Week 11',
  premise: 'Not everything at GIS:Hub is new. There is a legacy fuel-level endpoint from before the hub existed, and Hanna wants it gone.',
  scene: [
    { t:'line', who:'Hanna', x:'Three partners, low call volume, it predates the standardisation work. It is noise on the portfolio. Retire it.' },
    { t:'action', x:'You have spent an afternoon on this because Andrés asked you to before you agreed to anything.' },
    { t:'line', who:'You', x:'Two things first. One of the three has built a customer-facing product on it — their end users see our numbers. And the replacement returns state of charge for electric vehicles but has no equivalent field for combustion fuel level. It is not a rename. It is a different measurement.' },
    { t:'line', who:'Hanna', x:'So the migration is not one-to-one.' },
    { t:'line', who:'You', x:'No. And the contracts specify twelve months notice. There is also a workaround in support that two people know and nobody wrote down.' },
    { t:'action', x:'Hanna does not change her mind about retiring it. She changes her mind about when.' }
  ],
  beat: {
    q: 'The decision to retire took one meeting. What does the plan need?',
    weak: 'A deprecation notice and a date. That is a communication, not a plan, and it pushes your problem onto three partners.',
    strong: [
      'Role before threshold: establish what the endpoint does for each of the three, not just what it costs you. One of them is exposing it to end users, which makes it their product too.',
      'A field-level migration mapping, including the honest gap where no equivalent exists.',
      'A notice schedule driven by each contract, not by your roadmap.',
      'A parallel-run window long enough for the slowest partner, agreed with them rather than announced.',
      'Knowledge transfer: the undocumented support workaround written down before the two people who know it move on.',
      'A named owner for the residual risk, and a review date.'
    ]
  },
  outcome: 'The retirement moves from “next sprint” to a two-quarter plan with a named owner. It costs more than Hanna wanted. It costs far less than discovering the missing field after the notice has gone out.',
  principle: 'A product\'s withdrawal is its last release. It has requirements, a plan, dependencies and an owner, exactly like its first.',
  wrong: 'Announce the date, then discover the missing field. Now you are renegotiating a migration in public with a partner whose own customers are affected, and every future deprecation you announce will be met with suspicion.',
  carry: [
    'Low volume is a question, not an answer. Ask what role it plays.',
    'Operation is the longest stage of a product\'s life and the one nobody staffs.',
    'The decision takes a day. The plan takes a quarter. Budget for the second one.'
  ]
},

discovery: {
  title: 'The order you test in',
  slug: 'Whiteboard · Friday 10:00 · Week 11',
  premise: 'Vallès Motors, a fourteen-site workshop chain, wants to know which of their customers is due for service before the customer does. Marta is keen. It would be a new segment.',
  scene: [
    { t:'action', x:'Iker has already sketched three screens. Jonas has already estimated the pipeline. Nobody has asked the question that ends this in a day.' },
    { t:'line', who:'Marta', x:'Vallès will pilot it. That is a signed pilot in a new segment inside a month.' },
    { t:'line', who:'Iker', x:'I can have a prototype for Tuesday.' },
    { t:'action', x:'You write four words on the board: value, usability, feasibility, viability. Then you renumber them.' },
    { t:'line', who:'You', x:'Iker, hold the prototype. If we may not contact a driver on the basis of their vehicle\'s diagnostic data, nothing else on this board matters.' }
  ],
  beat: {
    q: 'What do you test, in what order, and what does each one cost?',
    weak: 'Prototype first, because it is the thing you can start on Monday and the thing that feels like progress.',
    strong: [
      'Viability first — one call to Petra. May we use diagnostic data to prompt a service contact, who holds the consent, and does it differ between a company vehicle and a private lease? One day. It can end the idea, which is a good outcome cheaply bought.',
      'Feasibility second — a data spike with Jonas. Does the service indicator exist across all six brands, at what frequency, and on which model years? Two days. If it only exists on vehicles from 2021 onward, Vallès\'s customer base may not be reachable.',
      'Value third — six conversations with workshop owners about what they do today when a customer is due. More expensive in calendar time, and only worth spending once you know it is permitted and possible.',
      'Usability last — Iker\'s prototype. It only matters if the first three pass.',
      'Before any of them: write down which result changes the decision. Otherwise it is reassurance, not validation.'
    ]
  },
  outcome: 'Petra comes back in a day: permitted for fleet-owned vehicles under the existing contractual basis, not for private leases without a separate consent flow. Jonas comes back in two: the indicator exists on four brands reliably and two intermittently. The idea survives, but smaller and differently shaped than the prototype would have been. Iker has lost nothing.',
  principle: 'Discovery is ordered by consequence, not by comfort. In a data business the permission question is usually the cheapest to ask and the most expensive to discover late.',
  wrong: 'Build the prototype. It tests the least dangerous risk, it costs a fortnight, and it creates a demo Marta will show to Vallès before you know whether the product may legally exist.',
  carry: [
    'Rank assumptions by what it costs to be wrong, then by what it costs to check.',
    'A day that kills an idea is a day well spent.',
    'Agree the decision rule before the test, or the result will be reinterpreted.'
  ]
},

research: {
  title: 'Four people, one product',
  slug: 'Meridian Leasing · Monday 14:00 · Week 12',
  premise: 'You have budget and access for six conversations at Meridian. Marta has offered to set up six meetings with the remarketing manager\'s team.',
  scene: [
    { t:'line', who:'Marta', x:'Six with remarketing. They are the users. They are also the people who like us.' },
    { t:'action', x:'You spend the six differently, and Marta thinks you are wasting four of them.' },
    { t:'action', x:'Conversation two is with the developer who integrated the API. He has never been asked anything by anyone at GIS:Hub.' },
    { t:'line', who:'Developer', x:'Your error responses are fine. What kills me is that I cannot tell the difference between “this vehicle is not in your contract” and “this vehicle has not reported”. Both come back empty. So I opened a ticket, and the ticket went to engineering, and it took nine days.' },
    { t:'action', x:'Conversation four is with the procurement lead.' },
    { t:'line', who:'Procurement', x:'If we add the Lisbon fleet, is that an amendment or a new contract? Nobody can tell me, so we have not added it.' },
    { t:'action', x:'Conversation five is with the support agent who fields their internal queries. She keeps a spreadsheet of vehicles she knows are wrong.' }
  ],
  beat: {
    q: 'Six conversations. What did the four non-obvious ones change?',
    weak: 'Six with remarketing gives you depth on a feature set and no idea why adoption is stalling.',
    strong: [
      'The developer surfaced a requirement worth more than any feature: distinguish “out of scope” from “no data”. Two different error semantics. Cheap. Nobody would ever have asked for it in a user interview.',
      'Procurement surfaced revenue that is sitting still because a contract question has no owner. That is not a product problem and it is your problem.',
      'The support agent\'s spreadsheet is a free data-quality dataset that nobody at GIS:Hub knew existed.',
      'The two remarketing conversations confirmed the proposition and taught you the least.'
    ]
  },
  outcome: 'The Lisbon fleet is added three weeks later once someone owns the answer. The error-semantics change ships in the same release as the freshness timestamp. Marta now asks who else she should get you in front of.',
  principle: 'In B2B the buyer, the integrator, the daily user and the support agent are four different people with four different definitions of “this works”. Research only one of them and you will build something pleasant that nobody can adopt.',
  wrong: 'Six interviews with the friendliest role gives you a validated feature list and a product that dies in integration, contracting and support — which is where B2B products actually die.',
  carry: [
    'Recruit against criteria, not against availability.',
    'Ask what they did last time, not what they would want.',
    'The person who never gets interviewed usually holds the cheapest, largest finding.'
  ]
},

market: {
  title: 'The competitor is a regulation',
  slug: 'Wolfsburg, by video · Tuesday 09:00 · Week 12',
  premise: 'Hanna wants a competitive view for the portfolio pack. Marta has sent a slide comparing Fleet Pulse to three telematics vendors on features.',
  scene: [
    { t:'action', x:'The slide has fourteen rows of ticks. Fleet Pulse wins eleven of them.' },
    { t:'line', who:'Hanna', x:'And how many deals have we lost to those three?' },
    { t:'line', who:'Marta', x:'…One. We lost two to customers deciding to keep doing it manually, and one to a customer whose own IT team said they would build it.' },
    { t:'action', x:'Which means three of your four losses are not on the slide at all.' },
    { t:'line', who:'You', x:'There is something else that should be on it. The Data Act obliges data holders to make connected-product data available to users and, at the user\'s request, to third parties on fair and non-discriminatory terms. That does two things to this market at once.' },
    { t:'line', who:'Hanna', x:'Go on.' }
  ],
  beat: {
    q: 'Say the two things.',
    weak: 'Treating regulation as a compliance cost line and leaving the feature comparison as the competitive story.',
    strong: [
      'It lowers the barrier for everyone. Competitors who could not previously get Group vehicle data will be able to ask for it on the user\'s behalf. Access stops being a moat.',
      'Which means the defensible position moves to the things access does not give you: standardisation across six brands and many model years, one contract instead of six, reliability, and semantics a partner can build a business on.',
      'And the real competitor list is: the manual process, the customer\'s own IT team, and only then the vendors. Three of the four losses were to the first two.'
    ]
  },
  outcome: 'The pack goes up with a different slide: four alternatives, three of them not vendors, and a note that the moat is standardisation rather than access. Hanna uses that framing in Wolfsburg. It is the first time your reading of the market has travelled further than the room you said it in.',
  principle: 'Competitor analysis is about the alternatives a buyer can actually choose. In a regulated market, the largest force is often not a company at all.',
  wrong: 'Win the feature comparison and lose the market. A tick-box slide cannot explain why three quarters of your losses were to people who chose to do nothing.',
  carry: [
    'Doing nothing and building it in-house are competitors. Put them on the slide.',
    'Win/loss data is the cheapest competitive intelligence you have and the least used.',
    'When a regulation changes what is scarce, it changes what is defensible.'
  ]
},

experimentation: {
  title: 'Three customers, one threshold, agreed on Monday',
  slug: 'Team room · Wednesday 16:30 · Week 12',
  premise: 'Fleet Pulse cannot be A/B tested. You cannot randomise leasing companies into two versions of a contract. Marta wants to “just get it out there and see”.',
  scene: [
    { t:'line', who:'Marta', x:'We have Meridian. Let us get two more on a pilot and see what happens.' },
    { t:'line', who:'You', x:'See what happens according to what?' },
    { t:'line', who:'Marta', x:'Whether they like it.' },
    { t:'action', x:'You have watched this go wrong before. Three months later everyone remembers the pilot differently, and the person who wanted it to succeed remembers it succeeding.' },
    { t:'line', who:'You', x:'Then let us write down now what we would need to see, and what we do if we do not see it. Before anyone signs.' }
  ],
  beat: {
    q: 'Design it. What is the real risk, and what is the rule?',
    weak: '“Three pilots for a quarter, then review.” No measure, no threshold, no consequence. It will produce a meeting, not a decision.',
    strong: [
      'Name the real risk: B2B data products rarely die from lack of interest. They die in integration. So the measure is not enthusiasm, it is time from contract to first successful call, and weekly use by week ten.',
      'Threshold, written first: at least two of three integrate within six weeks and are querying weekly by week ten.',
      'Consequence, written first: if fewer than two, we do not go to general availability in week sixteen — we spend the quarter on integration effort instead of on features.',
      'Choose participants who could plausibly say no. A friendly customer validates goodwill.',
      'Accept “inconclusive” as a legitimate result that triggers a better test, not a decision.'
    ]
  },
  outcome: 'Two of three integrate inside six weeks. The third takes eleven, and the reason is the error semantics the Meridian developer described. That single finding reshapes the week-sixteen plan more than any feature request in the backlog.',
  principle: 'An experiment is not defined by its method. It is defined by the fact that the measure, the threshold and the consequence were agreed before anyone looked at the result.',
  wrong: 'Run the pilot without a rule and you get a quarter of ambiguity that everyone reads in their own favour, and a general-availability date defended on feeling.',
  carry: [
    'Write the decision rule before the test. It is the whole discipline.',
    'In B2B, integration time is usually the risk worth measuring.',
    'Pick participants who could say no.'
  ]
}
};
