/* worked.js — two explicit examples under every piece of advice */
import w1 from './worked-1.js';
import w2 from './worked-2.js';
import w3 from './worked-3.js';

export const WORKED = { ...w1, ...w2, ...w3 };

export const KIND_LABEL = {
  say:      'Say it like this',
  artifact: 'Bring this on paper',
  do:       'Do it like this'
};
