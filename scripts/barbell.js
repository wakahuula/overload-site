/**
 * Die Hantel: im Hero montiert sie sich einmal, im Prinzip-Abschnitt belädt
 * sie sich beim Scrollen. Reine Darstellung, die Last kommt aus den echten
 * Scheibenschritten.
 */

import { getLang, t } from './i18n.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HERO_PLATES = [25, 20, 15, 10, 5];
const PRINCIPLE_PLATES = [25, 25, 20, 15, 10, 5];
const STEP_MESSAGES = [
  'principle.msg0',
  'principle.msg1',
  'principle.msg2',
  'principle.msg3',
  'principle.msg4',
  'principle.msg5',
  'principle.msg6',
];
const BAR_KG = 20;

function plateClass(kg) {
  if (kg >= 25) return 'p25';
  if (kg >= 20) return 'p20';
  if (kg >= 15) return 'p15';
  if (kg >= 10) return 'p10';
  return 'p5';
}

function formatter() {
  return new Intl.NumberFormat(getLang() === 'en' ? 'en-US' : 'de-DE', {
    maximumFractionDigits: 1,
  });
}

function makePlate(kg) {
  const plate = document.createElement('i');
  plate.className = `plate ${plateClass(kg)}`;
  plate.setAttribute('aria-hidden', 'true');
  return plate;
}

function initHero() {
  const hero = document.querySelector('[data-hero-bar]');
  if (!hero) return;
  for (const stack of hero.querySelectorAll('.bar-stack')) {
    stack.replaceChildren();
    HERO_PLATES.forEach((kg, index) => {
      const plate = makePlate(kg);
      stack.appendChild(plate);
      if (reduceMotion) plate.classList.add('is-on');
      else setTimeout(() => plate.classList.add('is-on'), 220 + index * 90);
    });
  }
}

function initPrinciple() {
  const section = document.querySelector('[data-principle]');
  if (!section) return;

  const stacks = section.querySelectorAll('.bar-stack');
  const weightEl = section.querySelector('[data-load-weight]');
  const captionEl = section.querySelector('[data-load-caption]');

  for (const stack of stacks) {
    stack.replaceChildren();
    for (const kg of PRINCIPLE_PLATES) stack.appendChild(makePlate(kg));
  }
  const plates = section.querySelectorAll('.bar-stack .plate');

  function paint(progress) {
    const p = Math.min(Math.max(progress, 0), 1);
    const full = Math.floor(p * 6);
    const fraction = p * 6 - full;
    const loaded = Math.min(full + (fraction > 0.4 ? 1 : 0), 6);

    plates.forEach((plate, index) => {
      plate.classList.toggle('is-on', index % 6 < loaded);
    });

    if (weightEl) {
      const added = PRINCIPLE_PLATES.slice(0, loaded).reduce((sum, kg) => sum + kg, 0);
      weightEl.textContent = formatter().format(BAR_KG + 2 * added);
    }

    if (captionEl) {
      captionEl.textContent = t(STEP_MESSAGES[loaded]);
    }

    section.classList.toggle('is-maxed', loaded >= 6);
  }

  if (reduceMotion) {
    paint(1);
    return;
  }

  let frame = 0;
  const update = () => {
    frame = 0;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    paint(total > 0 ? -rect.top / total : 0);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('overload:lang', update);
  update();
}

export function initBarbell() {
  initHero();
  initPrinciple();
}
