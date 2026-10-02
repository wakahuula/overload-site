import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { content } from '../scripts/content.js';

const html = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');

function collectKeys() {
  const keys = new Set();
  for (const match of html.matchAll(/data-i18n="([^"]+)"/g)) keys.add(match[1]);
  for (const match of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
    for (const pair of match[1].split(',')) {
      const key = pair.split(':')[1]?.trim();
      if (key) keys.add(key);
    }
  }
  return keys;
}

test('jeder im HTML verwendete Schluessel existiert in beiden Sprachen', () => {
  const keys = collectKeys();
  assert.ok(keys.size > 40, `zu wenige Schluessel gefunden: ${keys.size}`);
  for (const key of keys) {
    assert.ok(content.de[key] !== undefined, `de fehlt: ${key}`);
    assert.ok(content.en[key] !== undefined, `en fehlt: ${key}`);
  }
});

test('das Dokument ist auf Deutsch deklariert und bindet die Module ein', () => {
  assert.match(html, /<html lang="de">/);
  assert.match(html, /scripts\/site\.js/);
  assert.match(html, /styles\/tokens\.css/);
});
