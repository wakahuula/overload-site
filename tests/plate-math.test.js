import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  BAR,
  RACKS,
  calculatePlates,
  formatWeight,
  kgToLb,
  lbToKg,
  plateColorToken,
} from '../scripts/plate-math.js';

test('Stange ohne Scheiben bleibt bei der Stangengrenze', () => {
  const result = calculatePlates(20);
  assert.deepEqual(result.perSide, []);
  assert.equal(result.loadedWeight, 20);
  assert.equal(result.remainder, 0);
  assert.equal(result.barWeight, 20);
});

test('Last unter dem Stangengewicht wird auf die Stange geklemmt', () => {
  const result = calculatePlates(15);
  assert.equal(result.loadedWeight, 20);
  assert.deepEqual(result.perSide, []);
});

test('100 kg legen 25 + 15 pro Seite auf', () => {
  const result = calculatePlates(100);
  assert.deepEqual(result.perSide, [25, 15]);
  assert.equal(result.loadedWeight, 100);
  assert.equal(result.remainder, 0);
});

test('220 kg sind vier 25er pro Seite', () => {
  const result = calculatePlates(220);
  assert.deepEqual(result.perSide, [25, 25, 25, 25]);
  assert.equal(result.loadedWeight, 220);
});

test('102,5 kg nutzen die 1,25er-Scheibe', () => {
  const result = calculatePlates(102.5);
  assert.deepEqual(result.perSide, [25, 15, 1.25]);
  assert.equal(result.loadedWeight, 102.5);
});

test('nicht ladbare Reste werden ausgewiesen', () => {
  const result = calculatePlates(21);
  assert.deepEqual(result.perSide, []);
  assert.equal(result.loadedWeight, 20);
  assert.equal(result.remainder, 0.5);
});

test('135 lb laden eine 45er pro Seite', () => {
  const result = calculatePlates(135, { unit: 'lb' });
  assert.deepEqual(result.perSide, [45]);
  assert.equal(result.barWeight, 45);
  assert.equal(result.loadedWeight, 135);
});

test('225 lb laden zwei 45er pro Seite', () => {
  const result = calculatePlates(225, { unit: 'lb' });
  assert.deepEqual(result.perSide, [45, 45]);
  assert.equal(result.loadedWeight, 225);
});

test('die Inventare folgen der Einheit', () => {
  assert.deepEqual(BAR, { kg: 20, lb: 45 });
  assert.equal(RACKS.kg[0], 25);
  assert.equal(RACKS.lb[0], 45);
});

test('formatWeight nutzt Dezimalkomma, Tausenderpunkt und geschuetztes Leerzeichen', () => {
  assert.equal(formatWeight(102.5, 'kg'), '102,5\u00A0kg');
  assert.equal(formatWeight(100, 'kg'), '100\u00A0kg');
  assert.equal(formatWeight(1234.5, 'kg'), '1.234,5\u00A0kg');
  assert.equal(formatWeight(135, 'lb'), '135\u00A0lb');
});

test('formatWeight folgt der Sprache', () => {
  assert.equal(formatWeight(1234.5, 'kg', 'en'), '1,234.5\u00A0kg');
});

test('plateColorToken bildet den IPF-Farbcode ab', () => {
  assert.equal(plateColorToken(25), '--plate-25');
  assert.equal(plateColorToken(20), '--plate-20');
  assert.equal(plateColorToken(15), '--plate-15');
  assert.equal(plateColorToken(10), '--plate-10');
  assert.equal(plateColorToken(5), '--plate-5');
  assert.equal(plateColorToken(2.5), '--plate-neutral');
  assert.equal(plateColorToken(1.25), '--plate-neutral');
});

test('Einheiten rechnen verlustfrei hin und zurueck', () => {
  assert.ok(Math.abs(kgToLb(20) - 44.0924524) < 1e-5);
  assert.ok(Math.abs(lbToKg(45) - 20.4116566) < 1e-5);
  assert.ok(Math.abs(lbToKg(kgToLb(82.5)) - 82.5) < 1e-9);
});
