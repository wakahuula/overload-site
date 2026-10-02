import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  SCHEMES,
  applyWeek,
  prescription,
  roundToPlate,
  workWeight,
} from '../scripts/progression.js';

test('die Schema-Leiter ist 5x3, 6x2, 10x1', () => {
  assert.deepEqual(
    SCHEMES.map((s) => [s.sets, s.reps, s.percent]),
    [
      [5, 3, 0.85],
      [6, 2, 0.875],
      [10, 1, 0.9],
    ],
  );
});

test('roundToPlate rundet auf die kleinste Scheibe', () => {
  assert.equal(roundToPlate(86.2), 85);
  assert.equal(roundToPlate(87.5), 87.5);
  assert.equal(roundToPlate(88.8), 90);
});

test('workWeight leitet das Arbeitsgewicht aus Training Max und Schema ab', () => {
  assert.equal(workWeight(100, 0), 85);
  assert.equal(workWeight(100, 1), 87.5);
  assert.equal(workWeight(100, 2), 90);
});

test('ein erfuelltes Ziel hebt den Training Max', () => {
  const next = applyWeek({ tm: 100, schemeIndex: 0, increment: 2.5 }, true);
  assert.equal(next.tm, 102.5);
  assert.equal(next.schemeIndex, 0);
  assert.equal(next.event, 'increase');
});

test('ein Fehlschlag steigt eine Schema-Stufe', () => {
  const next = applyWeek({ tm: 100, schemeIndex: 0, increment: 2.5 }, false);
  assert.equal(next.tm, 100);
  assert.equal(next.schemeIndex, 1);
  assert.equal(next.event, 'step');
});

test('Fehlschlag auf der letzten Stufe setzt den Training Max zurueck', () => {
  const next = applyWeek({ tm: 100, schemeIndex: 2, increment: 2.5 }, false);
  assert.equal(next.tm, 90);
  assert.equal(next.schemeIndex, 0);
  assert.equal(next.event, 'reset');
});

test('der Reset rundet auf die kleinste Scheibe', () => {
  const next = applyWeek({ tm: 105, schemeIndex: 2, increment: 2.5 }, false);
  assert.equal(next.tm, 95);
});

test('prescription liefert Schema und Arbeitsgewicht zusammen', () => {
  assert.deepEqual(prescription({ tm: 100, schemeIndex: 1 }), {
    sets: 6,
    reps: 2,
    percent: 0.875,
    weight: 87.5,
  });
});
