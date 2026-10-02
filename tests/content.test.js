import { test } from 'node:test';
import assert from 'node:assert/strict';

import { LANGS, content } from '../scripts/content.js';

test('beide Sprachen haben dieselben Schluessel', () => {
  assert.deepEqual(Object.keys(content.en).sort(), Object.keys(content.de).sort());
});

test('jede Sprache ist gefuellt und enthaelt nur Strings', () => {
  for (const lang of LANGS) {
    const entries = Object.entries(content[lang]);
    assert.ok(entries.length > 50, `${lang} hat zu wenige Keys`);
    for (const [key, value] of entries) {
      assert.equal(typeof value, 'string', `${lang}.${key} ist kein String`);
      assert.ok(value.trim().length > 0, `${lang}.${key} ist leer`);
    }
  }
  assert.deepEqual(LANGS, ['de', 'en']);
});

test('keine Gedankenstriche, Platzhalter oder erfundenen Store-Behauptungen', () => {
  const forbidden = [
    /[\u2014\u2013]/,
    /TODO|TBD|Lorem/i,
    /App Store|Google Play|\u2605|4\.\d|Million/i,
  ];
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(content[lang])) {
      for (const pattern of forbidden) {
        assert.ok(!pattern.test(value), `${lang}.${key} verletzt ${pattern}`);
      }
    }
  }
});

test('Schluessel mit Platzhaltern haben sie in beiden Sprachen', () => {
  const placeholders = (value) => (value.match(/\{\w+\}/g) || []).sort();
  for (const key of Object.keys(content.de)) {
    assert.deepEqual(
      placeholders(content.en[key]),
      placeholders(content.de[key]),
      `${key}: Platzhalter weichen ab`,
    );
  }
});
