/**
 * Reine Progressions-Engine für den Website-Simulator.
 *
 * Modell nach GZCL Linear Progression, wie in der App (`utils/progression.ts`,
 * `STATUS.md` §Progression): erfülltes Soll hebt den Training Max, ein
 * Fehlschlag steigt die Schema-Leiter hinauf, und ein Fehlschlag auf der
 * letzten Stufe setzt den Training Max um 10 Prozent zurück. Keine Zeit-,
 * Speicher- oder DOM-Abhängigkeit.
 */

// T1 bleibt bei 85 % des Training Max. Die Leiter senkt nur die
// Wiederholungen, das Gewicht steht (wie in der App, programs.ts und
// progression.ts §prescriptionFor).
export const SCHEMES = Object.freeze([
  Object.freeze({ sets: 5, reps: 3, percent: 0.85, label: '5×3' }),
  Object.freeze({ sets: 6, reps: 2, percent: 0.85, label: '6×2' }),
  Object.freeze({ sets: 10, reps: 1, percent: 0.85, label: '10×1' }),
]);

const DEFAULT_STEP = 2.5;

/** Rundet auf die kleinste ladbare Stufe, damit das Gewicht aufgeht. */
export function roundToPlate(value, step = DEFAULT_STEP) {
  return Math.round(value / step) * step;
}

/** Arbeitsgewicht eines Schemas, aus Training Max und Prozentanteil. */
export function workWeight(tm, schemeIndex) {
  const scheme = SCHEMES[schemeIndex] ?? SCHEMES[0];
  return roundToPlate(tm * scheme.percent);
}

/**
 * Wendet eine Trainingswoche an.
 *
 * @param {{ tm: number, schemeIndex: number, increment: number }} state
 * @param {boolean} success Soll erfüllt?
 * @returns {{ tm: number, schemeIndex: number, event: 'increase' | 'step' | 'reset' }}
 */
export function applyWeek({ tm, schemeIndex, increment = DEFAULT_STEP }, success) {
  if (success) {
    return { tm: roundToPlate(tm + increment), schemeIndex, event: 'increase' };
  }
  if (schemeIndex < SCHEMES.length - 1) {
    return { tm, schemeIndex: schemeIndex + 1, event: 'step' };
  }
  return { tm: roundToPlate(tm * 0.9), schemeIndex: 0, event: 'reset' };
}

/** Schema und Arbeitsgewicht der aktuellen Woche, in einem Aufruf. */
export function prescription({ tm, schemeIndex }) {
  const scheme = SCHEMES[schemeIndex] ?? SCHEMES[0];
  return {
    sets: scheme.sets,
    reps: scheme.reps,
    percent: scheme.percent,
    weight: workWeight(tm, schemeIndex),
  };
}
