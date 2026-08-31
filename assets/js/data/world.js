/* ============================================================
   world.js — the case world every lesson is set in.

   IMPORTANT: this is a constructed training scenario. The hub,
   the regulatory frame and the Data Hub model are real and
   sourced. The people, the products, the partners, the meetings
   and the numbers below are invented so that each concept can be
   learned inside a situation rather than in the abstract.
   Nothing here should be repeated in an interview as fact.
   ============================================================ */

export const DISCLAIMER =
  'Constructed case. GIS:Hub, the Data Hub model and the EU regulatory frame are real and sourced in the Brief. The people, products, partners, meetings and figures in these scenes are invented so the ideas can be learned inside a situation. Never repeat them as fact.';

export const PREMISE = {
  headline: 'You are eleven weeks into the job.',
  body: 'GIS:Hub, Barcelona. Nine people in a room on Carrer de Pallars with one whiteboard, two parent companies and no written process. You own one product. It is called Fleet Pulse, and in four months it has to be something a fleet operator will pay for and a support team can run without you.'
};

export const PRODUCT = {
  name: 'Fleet Pulse',
  what: 'A vehicle-condition data product for commercial fleet operators. Mileage, service indicators, diagnostic trouble codes, and for electric vehicles state of charge and battery health — standardised across the six Group brands, delivered by API, sold under one contract per use case.',
  why: 'Fleet operators run mixed fleets. Today they either fit third-party hardware to every vehicle or they find out a van is in trouble when a driver calls from the roadside.',
  stage: 'One signed pilot customer, one partner integration in progress, nothing yet in general availability.'
};

export const CAST = [
  { id:'you',    name:'You',              role:'Product Manager, Fleet Pulse',
    note:'Eleven weeks in. Barcelona. Owns the problem, the sequence and the definition of done.' },
  { id:'marta',  name:'Marta Sanz',       role:'Sales lead, GIS:Hub Barcelona',
    note:'Carries the pipeline. Fast, direct, and measured on deals that close this quarter. Your closest working relationship and your hardest one.' },
  { id:'jonas',  name:'Jonas Weiss',      role:'Data engineering lead',
    note:'Split between Barcelona and Wolfsburg. Cares about what the system will still be able to do in three years. Will tell you the truth about cost.' },
  { id:'petra',  name:'Dr. Petra Lindqvist', role:'Data protection counsel, Wolfsburg',
    note:'Can stop a product outright. Answers precise questions quickly and vague ones slowly.' },
  { id:'andres', name:'Andrés Ferrer',    role:'Service operations lead',
    note:'Will own Fleet Pulse for far longer than you will. Every shortcut you take at launch becomes his ticket queue.' },
  { id:'hanna',  name:'Hanna Bauer',      role:'Portfolio lead, Wolfsburg',
    note:'Sets the portfolio goals you translate. Sees eleven products; you see one. Decides what you only recommend.' },
  { id:'iker',   name:'Iker Otxoa',       role:'Product designer',
    note:'Half his work is the developer experience of an API nobody will ever see a screen for.' },
  { id:'lena',   name:'Lena Køhler',      role:'Brand data steward (rotating, per brand)',
    note:'Represents whichever Group brand owns the vehicles in question. Each brand has its own rules about what may be done with its data.' }
];

export const ACCOUNTS = [
  { id:'nordfleet', name:'NordFleet',        kind:'Partner — fleet-management platform',
    note:'Hamburg. Eleven thousand vehicles under management across Europe. Wants to embed Fleet Pulse so their customers can connect Group vehicles without hardware. If they integrate, your API becomes load-bearing for their business.' },
  { id:'meridian',  name:'Meridian Leasing', kind:'Pilot customer — leasing',
    note:'Barcelona and Lisbon. Four thousand vehicles. Prices remarketing at end of lease and currently guesses condition from mileage bands.' },
  { id:'valles',    name:'Vallès Motors',    kind:'Prospect — independent workshop chain',
    note:'Fourteen sites in Catalonia. Wants to know which customers are due for service before the customer does.' },
  { id:'aurora',    name:'Aurora Assurance', kind:'Prospect — insurer',
    note:'The largest deal in the pipeline and the most dangerous one. Wants driving-behaviour data for risk pricing, which is a different consent world entirely.' }
];

export const TIMELINE = [
  { when:'Week 1',  what:'You arrive. There is no roadmap, no written decision rights and two parents with opinions.' },
  { when:'Week 4',  what:'Meridian Leasing signs a pilot for vehicle condition at end of lease.' },
  { when:'Week 7',  what:'NordFleet asks to embed the API. Marta says yes before you have seen the integration surface.' },
  { when:'Week 11', what:'You are here. Aurora Assurance is in the pipeline and the consent question has not been asked.' },
  { when:'Week 16', what:'Target: general availability, with an operating model Andrés will accept.' }
];
