import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(fileURLToPath(new URL('../styles/site.css', import.meta.url)), 'utf8');

function rule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `Regel fehlt: ${selector}`);
  return match[1];
}

test('der Balancierbalken ist block-level, damit Breite und Hoehe wirken', () => {
  assert.match(rule('.balance-fill'), /display:\s*block/);
});

test('das Ausblenden der Scheiben ist an die .js-Klasse gebunden', () => {
  assert.match(rule('.js .bar-stack .plate'), /opacity:\s*0/);
  assert.match(rule('.js .bar-stack .plate.is-on'), /opacity:\s*1/);
});
