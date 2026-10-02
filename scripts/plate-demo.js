/**
 * Scheibenrechner im Phone-Mockup. Nutzt dieselbe Scheibenmathematik wie die
 * App und rechnet in Kilogramm oder Pfund. Der Rest pro Seite wird ehrlich
 * ausgewiesen.
 */

import { calculatePlates, formatWeight, kgToLb, lbToKg, plateColorToken } from './plate-math.js';
import { getLang, t } from './i18n.js';

const LIMITS = {
  kg: { min: 20, max: 220, step: 2.5 },
  lb: { min: 45, max: 495, step: 5 },
};

function formatter() {
  return new Intl.NumberFormat(getLang() === 'en' ? 'en-US' : 'de-DE', {
    maximumFractionDigits: 1,
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundToStep(value, step) {
  return Math.round(value / step) * step;
}

function plateSize(kg) {
  return {
    width: (4 + kg * 0.6).toFixed(1),
    height: (16 + kg * 2.2).toFixed(1),
  };
}

export function initPlateDemo() {
  const root = document.querySelector('[data-plate-demo]');
  if (!root) return;

  const range = root.querySelector('[data-demo-range]');
  const valueEl = root.querySelector('[data-demo-value]');
  const unitEl = root.querySelector('[data-demo-unit]');
  const noteEl = root.querySelector('[data-demo-note]');
  const left = root.querySelector('[data-demo-stack="left"]');
  const right = root.querySelector('[data-demo-stack="right"]');
  const scale = {
    min: root.querySelector('[data-demo-scale-min]'),
    mid: root.querySelector('[data-demo-scale-mid]'),
    max: root.querySelector('[data-demo-scale-max]'),
  };
  const unitButtons = root.querySelectorAll('[data-unit]');

  let unit = 'kg';
  let value = 100;

  function buildStack(container, plates) {
    container.replaceChildren();
    for (const plate of plates) {
      const kg = unit === 'lb' ? lbToKg(plate) : plate;
      const size = plateSize(kg);
      const el = document.createElement('i');
      el.className = 'plate is-on';
      el.style.background = `var(${plateColorToken(kg)})`;
      el.style.width = `${size.width}px`;
      el.style.height = `${size.height}px`;
      container.appendChild(el);
    }
  }

  function updateScale() {
    const { min, max } = LIMITS[unit];
    const format = (n) => formatter().format(n);
    if (scale.min) scale.min.textContent = format(min);
    if (scale.mid) scale.mid.textContent = format(Math.round((min + max) / 2));
    if (scale.max) scale.max.textContent = format(max);
  }

  function updateUnitButtons() {
    for (const btn of unitButtons) {
      btn.setAttribute('aria-pressed', String(btn.dataset.unit === unit));
    }
  }

  function render() {
    const result = calculatePlates(value, { unit });

    if (valueEl) valueEl.textContent = formatter().format(result.total);
    if (unitEl) unitEl.textContent = unit === 'lb' ? 'lbs' : 'kg';

    buildStack(left, result.perSide);
    buildStack(right, result.perSide);

    const span = LIMITS[unit].max - result.barWeight;
    const percent = clamp(((result.total - result.barWeight) / span) * 100, 0, 100);
    range.style.background = `linear-gradient(90deg, var(--action) 0 ${percent}%, var(--line) ${percent}% 100%)`;

    let note = t('demo.note', {
      perSide: formatWeight(result.perSideWeight, unit, getLang()),
      count: result.perSide.length,
    });
    if (result.remainder > 0) {
      note += ` · ${t('demo.noteRest', { rest: formatWeight(result.remainder, unit, getLang()) })}`;
    }
    if (noteEl) noteEl.textContent = note;
  }

  function applyValue(next) {
    value = clamp(roundToStep(next, LIMITS[unit].step), LIMITS[unit].min, LIMITS[unit].max);
    range.value = String(value);
    render();
  }

  function setUnit(next) {
    if (next === unit || !LIMITS[next]) return;
    const kgValue = unit === 'kg' ? value : lbToKg(value);
    unit = next;
    const limits = LIMITS[unit];
    range.min = String(limits.min);
    range.max = String(limits.max);
    range.step = String(limits.step);
    value = clamp(
      roundToStep(unit === 'kg' ? kgValue : kgToLb(kgValue), limits.step),
      limits.min,
      limits.max,
    );
    range.value = String(value);
    updateScale();
    updateUnitButtons();
    render();
  }

  if (range) {
    range.addEventListener('input', () => {
      value = Number(range.value);
      render();
    });
  }
  root.querySelector('[data-demo-minus]')?.addEventListener('click', () => {
    applyValue(value - LIMITS[unit].step);
  });
  root.querySelector('[data-demo-plus]')?.addEventListener('click', () => {
    applyValue(value + LIMITS[unit].step);
  });
  for (const btn of unitButtons) {
    btn.addEventListener('click', () => setUnit(btn.dataset.unit));
  }
  document.addEventListener('overload:lang', () => {
    updateScale();
    render();
  });

  range.min = String(LIMITS.kg.min);
  range.max = String(LIMITS.kg.max);
  range.step = String(LIMITS.kg.step);
  range.value = String(value);
  updateScale();
  updateUnitButtons();
  render();
}
