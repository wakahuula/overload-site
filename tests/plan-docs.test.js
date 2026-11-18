import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (path) => readFileSync(fileURLToPath(new URL(`../${path}`, import.meta.url)), 'utf8');

const schema = JSON.parse(read('plan/v1.schema.json'));
const pages = { de: read('plan/index.html'), en: read('plan/en/index.html') };

/** Das Beispiel steht HTML-escaped im einzigen <pre>-Block der Seite. */
function example(html) {
  const match = html.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/);
  assert.ok(match, 'kein Beispiel auf der Seite');
  const text = match[1]
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
  return JSON.parse(text);
}

test('das Schema traegt die Adresse, unter der die Seite es ausliefert', () => {
  assert.equal(schema.$id, 'https://wakahuula.github.io/overload-site/plan/v1.schema.json');
  assert.equal(schema.properties.format.const, 'overload-plan');
  assert.equal(schema.properties.version.const, 1);
});

for (const [lang, html] of Object.entries(pages)) {
  test(`${lang}: Beispiel ist gueltiges JSON mit Format und nur bekannten Feldern`, () => {
    const plan = example(html);
    assert.equal(plan.format, 'overload-plan');
    assert.equal(plan.version, 1);
    for (const key of Object.keys(plan)) {
      assert.ok(key in schema.properties, `unbekanntes Feld im Beispiel: ${key}`);
    }
    const exerciseFields = Object.keys(schema.$defs.exercise.properties);
    for (const workout of Object.values(plan.workouts)) {
      for (const exercise of workout.exercises) {
        for (const key of Object.keys(exercise)) {
          assert.ok(exerciseFields.includes(key), `unbekanntes Uebungsfeld: ${key}`);
        }
      }
    }
  });

  test(`${lang}: verlinkt Schema und andere Sprache, deklariert die Sprache`, () => {
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.match(html, /v1\.schema\.json/);
    assert.match(html, lang === 'de' ? /href="en\/"/ : /href="\.\.\/"/);
  });

  test(`${lang}: nennt jede Progressionsregel des Schemas`, () => {
    for (const rule of schema.$defs.progression.properties.rule.enum) {
      assert.match(html, new RegExp(`<code>${rule}</code>`), `Regel fehlt: ${rule}`);
    }
  });
}
