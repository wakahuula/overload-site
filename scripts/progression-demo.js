/**
 * Progressions-Simulator. Zeigt Woche für Woche, wie die echte Engine aus
 * `progression.js` den Training Max und das Arbeitsgewicht fortschreibt.
 */

import { SCHEMES, applyWeek, prescription } from './progression.js';
import { formatWeight } from './plate-math.js';
import { getLang, t } from './i18n.js';

const START = { week: 1, tm: 100, schemeIndex: 0, increment: 2.5 };

export function initProgressionDemo() {
  const root = document.querySelector('[data-prog-demo]');
  if (!root) return;

  const weekEl = root.querySelector('[data-prog-week]');
  const tmEl = root.querySelector('[data-prog-tm]');
  const schemeEl = root.querySelector('[data-prog-scheme]');
  const workEl = root.querySelector('[data-prog-work]');
  const eventEl = root.querySelector('[data-prog-event]');
  const ladder = root.querySelectorAll('[data-prog-ladder] span');

  let state = { ...START };
  let eventKind = 'start';

  function render() {
    const rx = prescription(state);

    if (weekEl) weekEl.textContent = String(state.week);
    if (tmEl) tmEl.textContent = formatWeight(state.tm, 'kg', getLang());
    if (schemeEl) schemeEl.textContent = SCHEMES[state.schemeIndex].label;
    if (workEl) workEl.textContent = formatWeight(rx.weight, 'kg', getLang());

    ladder.forEach((node, index) => {
      node.classList.toggle('is-active', index === state.schemeIndex);
    });

    if (eventEl) {
      let text;
      if (eventKind === 'increase') {
        text = t('prog.eventIncrease', { inc: formatWeight(state.increment, 'kg', getLang()) });
      } else if (eventKind === 'step') {
        text = t('prog.eventStep', { label: SCHEMES[state.schemeIndex].label });
      } else if (eventKind === 'reset') {
        text = t('prog.eventReset');
      } else {
        text = t('prog.eventStart', { tm: formatWeight(state.tm, 'kg', getLang()) });
      }
      eventEl.textContent = text;
      eventEl.dataset.event = eventKind;
    }
  }

  function advance(success) {
    const next = applyWeek(state, success);
    state = { ...state, week: state.week + 1, ...next };
    eventKind = next.event;
    render();
    root.classList.remove('is-bump');
    void root.offsetWidth;
    root.classList.add('is-bump');
  }

  root.querySelector('[data-prog="success"]')?.addEventListener('click', () => advance(true));
  root.querySelector('[data-prog="fail"]')?.addEventListener('click', () => advance(false));
  root.querySelector('[data-prog="reset"]')?.addEventListener('click', () => {
    state = { ...START };
    eventKind = 'start';
    render();
  });

  document.addEventListener('overload:lang', render);
  render();
}
