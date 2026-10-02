/**
 * Einstieg der Website: Theme, Navigation, Scroll-Reveals, Kennzahlen und die
 * Verdrahtung der interaktiven Bausteine. Alle Module sind progressiv: ohne
 * JavaScript bleibt die Seite lesbar.
 */

import { initI18n } from './i18n.js';
import { initBarbell } from './barbell.js';
import { initPlateDemo } from './plate-demo.js';
import { initProgressionDemo } from './progression-demo.js';

const THEME_KEY = 'overload-theme';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------- Theme */

function updateThemeButtons() {
  const isLight = document.documentElement.dataset.theme === 'light';
  for (const btn of document.querySelectorAll('[data-theme-toggle]')) {
    btn.setAttribute('aria-pressed', String(isLight));
  }
}

function setTheme(name) {
  document.documentElement.dataset.theme = name;
  try {
    localStorage.setItem(THEME_KEY, name);
  } catch {
    /* Speicher gesperrt: das Theme gilt nur für diese Sitzung. */
  }
  updateThemeButtons();
}

function initTheme() {
  for (const btn of document.querySelectorAll('[data-theme-toggle]')) {
    btn.addEventListener('click', () => {
      setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
    });
  }
  updateThemeButtons();
}

/* --------------------------------------------------------- Navigation */

function initNav() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = nav.querySelector('[data-nav-toggle]');
  const close = () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  for (const link of nav.querySelectorAll('.nav-links a')) {
    link.addEventListener('click', close);
  }
}

/* ------------------------------------------------------ Scroll-Reveals */

function initReveals() {
  const items = document.querySelectorAll('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  items.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------ Balancierbalken */

function fillBalance() {
  for (const bar of document.querySelectorAll('[data-balance]')) {
    const value = Math.max(0, Math.min(100, Number(bar.dataset.balance) || 0));
    bar.style.width = `${value}%`;
  }
}

function initBalance() {
  const first = document.querySelector('[data-balance]');
  if (!first) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    fillBalance();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fillBalance();
        observer.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  observer.observe(first);
}

/* -------------------------------------------------------------- Start */

function initFooter() {
  const year = String(new Date().getFullYear());
  for (const el of document.querySelectorAll('[data-year]')) el.textContent = year;
}

function initClock() {
  const el = document.querySelector('[data-demo-clock]');
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };
  tick();
  setInterval(tick, 10000);
}

initTheme();
initNav();
initReveals();
initBalance();
initFooter();
initClock();
initI18n();

initBarbell();
initPlateDemo();
initProgressionDemo();

// Progressive Enhancement bestätigen: Module sind gelaufen, die .js-Klasse bleibt.
document.documentElement.classList.add('js');
window.__overloadBooted = true;
