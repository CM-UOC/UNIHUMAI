/* main.js — two destinations, one hub */
import { el, $, $$, clear, icon, toast, watchReveals } from './ui.js';
import { renderHome }      from './views/home.js';
import { renderLearn }     from './views/learn.js';
import { renderLesson }    from './views/lesson.js';
import { renderInterview } from './views/interview.js';

const ROUTES = { '': renderHome, home: renderHome, learn: renderLearn, lesson: renderLesson, interview: renderInterview };

function parse() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, q] = h.split('?');
  const bits = path.split('/').filter(Boolean);
  return { route: bits[0] || '', param: bits[1] ? decodeURIComponent(bits[1]) : null, query: new URLSearchParams(q || '') };
}
export function go(p) { location.hash = '#/' + p.replace(/^\/+/, ''); }

let lastKey = null;
function render() {
  const { route, param, query } = parse();
  const view = ROUTES[route] || renderHome;
  const main = $('#main');
  clear(main);
  try { view(main, { param, query, go }); }
  catch (e) {
    console.error(e);
    main.appendChild(el('div', { class: 'wrapn', style: { paddingTop: '4rem' } },
      el('div', { class: 'cardish cardish--bad' }, el('div', { class: 'cardish__t' }, 'Something went wrong'), String(e && e.message || e))));
  }
  const parent = route === 'lesson' ? 'learn' : route;
  $$('#nav a').forEach(a => a.setAttribute('aria-current', a.dataset.route === parent ? 'page' : 'false'));

  const key = route + '/' + (param || '');
  if (key !== lastKey) window.scrollTo(0, 0);
  lastKey = key;

  const h1 = $('.d-xl, .d-lg', main);
  document.title = (h1 ? h1.textContent.trim() + ' — ' : '') + 'PM Runway';
  watchReveals(main);
}

/* scroll progress bar */
const prog = $('#prog');
addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (h > 40 ? Math.min(100, (scrollY / h) * 100) : 0) + '%';
}, { passive: true });

/* chrome */
$('#themeBtn').addEventListener('click', () => {
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  if (light) { document.documentElement.removeAttribute('data-theme'); try { localStorage.removeItem('pmr.theme'); } catch (e) {} }
  else { document.documentElement.setAttribute('data-theme', 'light'); try { localStorage.setItem('pmr.theme', 'light'); } catch (e) {} }
  toast(light ? 'Dark' : 'Light');
});
addEventListener('hashchange', render);
if (!location.hash) location.replace('#/');
render();
