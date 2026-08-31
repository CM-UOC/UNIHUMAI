/* questions.js — interview bank index */
import q1 from './questions-1.js';
import q2 from './questions-2.js';
import q3 from './questions-3.js';
import q4 from './questions-4.js';

export const CATEGORIES = [
  { id:'intro',          label:'Introduction & motivation', blurb:'The opening minutes, where the interviewer decides what kind of candidate you are.' },
  { id:'cv',             label:'Your CV & portfolio',       blurb:'Questions aimed at the specific claims in your materials — including the uncomfortable ones.' },
  { id:'company',        label:'Company & role',            blurb:'What you know about GIS:Hub, and what you would do in it.' },
  { id:'sense',          label:'Product sense',             blurb:'Open design questions. Judged on narrowing, reasoning and what you leave out.' },
  { id:'strategy',       label:'Product strategy',          blurb:'Direction, trade-offs and saying no.' },
  { id:'discovery',      label:'Discovery & validation',    blurb:'How you find out what is true before committing.' },
  { id:'execution',      label:'Execution & delivery',      blurb:'Go-live, dependencies and things going wrong close to a date.' },
  { id:'prioritisation', label:'Prioritisation',            blurb:'Method, and what you do when the method produces an unwelcome answer.' },
  { id:'metrics',        label:'Metrics & analytics',       blurb:'KPIs, SLAs, diagnosis and measurement honesty.' },
  { id:'stakeholders',   label:'Stakeholder management',    blurb:'Alignment, difficult relationships and decision rights.' },
  { id:'leadership',     label:'Leadership & influence',    blurb:'Influence without authority, and decisions under uncertainty.' },
  { id:'conflict',       label:'Conflict resolution',       blurb:'Disagreement handled well — including being persuaded.' },
  { id:'failure',        label:'Failure & learning',        blurb:'Real mistakes, real corrections.' },
  { id:'behavioural',    label:'Behavioural',               blurb:'Ambiguity, learning velocity and working style.' },
  { id:'case',           label:'Case & situational',        blurb:'Longer scenarios with constraints and no clean answer.' },
  { id:'ask',            label:'Questions you ask',         blurb:'What you ask them, and what it says about you.' }
];

/* Which chapters each question draws on. Filled in for the questions
   written before the curriculum existed. */
const LESSON_MAP = {
  'q-tellme':['strategy','leadership'], 'q-whythisrole':['dataproduct','orgmap'],
  'q-salesmove':['negotiation','stakeholders'], 'q-pricingapp':['problem','requirements','leadership'],
  'q-scope':['orgmap','roadmap'], 'q-notautomotive':['dataproduct','dataquality'],
  'q-coursework':['experimentation','writing'], 'q-knowus':['commercial','dataproduct'],
  'q-dup':['lifecycle','delivery'], 'q-firstninety':['orgmap','serviceops'],
  'q-sense-design':['discovery','valueprop','compliance'], 'q-sense-improve':['problem','backlog'],
  'q-strategy-say-no':['negotiation','prioritisation'], 'q-strategy-portfolio':['strategy','roadmap'],
  'q-strategy-sunset':['lifecycle'], 'q-disc-newproduct':['discovery','compliance'],
  'q-disc-conflict':['research','analytics'], 'q-exec-latelaunch':['stakeholders','delivery','compliance'],
  'q-exec-slip':['risk'], 'q-prior-framework':['prioritisation'],
  'q-metrics-define':['analytics','serviceops'], 'q-metrics-flat':['gtm','analytics'],
  'q-metrics-honest':['analytics','writing'], 'q-stake-align':['stakeholders','crossfunctional'],
  'q-stake-nonsupport':['stakeholders'], 'q-lead-influence':['leadership'],
  'q-lead-decision':['leadership','writing'], 'q-conflict-eng':['crossfunctional','requirements'],
  'q-fail-worst':['experimentation','leadership'], 'q-fail-feedback':['orgmap'],
  'q-behav-ambiguity':['orgmap','writing'], 'q-behav-learn':['dataproduct'],
  'q-case-launch':['delivery','dataquality'], 'q-case-pricing':['commercial'],
  'q-case-sla':['serviceops','analytics'], 'q-ask-1':['orgmap','commercial'], 'q-ask-2':['dataproduct','serviceops']
};

export const QUESTIONS = [...q1, ...q2, ...q3, ...q4].map(q => ({
  ...q, lessons: q.lessons || LESSON_MAP[q.id] || []
}));
export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
export const questionsIn = cat => QUESTIONS.filter(q => q.cat === cat);

export const LIKELIHOOD = {
  'certain':     { label:'Will be asked',  cls:'chip--rose' },
  'near-certain':{ label:'Very likely',    cls:'chip--rose' },
  'likely':      { label:'Likely',         cls:'chip--amber' },
  'possible':    { label:'Possible',       cls:'chip--outline' }
};
