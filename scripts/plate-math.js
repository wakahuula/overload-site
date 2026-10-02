/**
 * Reine Scheibenmathematik für den Website-Scheibenrechner.
 *
 * Die App speichert Gewichte in Kilogramm und rechnet nur für die Anzeige um.
 * Der Scheibenrechner hier speichert nichts, also rechnet er durchgehend in
 * der aktiven Einheit. Alle Beträge laufen intern in Hundertsteln, damit
 * 1,25-kg-Scheiben ohne Gleitkomma-Drift aufgehen.
 *
 * Der Farbcode folgt dem IPF-Scheibencode der App: eine Scheibe trägt die
 * Farbe ihres Gewichts, unabhängig davon, ob sie in kg oder lb geladen wird.
 */

export const RACKS = Object.freeze({
  kg: Object.freeze([25, 20, 15, 10, 5, 2.5, 1.25]),
  lb: Object.freeze([45, 35, 25, 10, 5, 2.5]),
});

export const BAR = Object.freeze({ kg: 20, lb: 45 });

const KG_PER_LB = 2.2046226218;

export function kgToLb(kg) {
  return kg * KG_PER_LB;
}

export function lbToKg(lb) {
  return lb / KG_PER_LB;
}

const toHundredths = (value) => Math.round(value * 100);
const fromHundredths = (value) => value / 100;

/**
 * Verteilt eine Gesamtlast auf die beiden Stangenseiten.
 *
 * @param {number} total Zielgewicht in der aktiven Einheit
 * @param {{ unit?: 'kg' | 'lb', barWeight?: number }} [options]
 * @returns {{
 *   unit: 'kg' | 'lb',
 *   total: number,
 *   barWeight: number,
 *   perSide: number[],
 *   perSideWeight: number,
 *   loadedWeight: number,
 *   remainder: number,
 * }}
 *   `remainder` ist das Restgewicht **pro Seite**, das sich mit dem Inventar
 *   nicht mehr laden lässt.
 */
export function calculatePlates(total, { unit = 'kg', barWeight } = {}) {
  const bar = barWeight ?? BAR[unit];
  const inventory = [...RACKS[unit]].sort((a, b) => b - a);

  const barH = toHundredths(bar);
  const totalH = Math.max(toHundredths(total), barH);
  let remainingH = Math.round((totalH - barH) / 2);

  const perSide = [];
  for (const plate of inventory) {
    const plateH = toHundredths(plate);
    while (remainingH >= plateH && perSide.length < 12) {
      perSide.push(plate);
      remainingH -= plateH;
    }
  }

  const loadedH = barH + 2 * (Math.round((totalH - barH) / 2) - remainingH);

  return {
    unit,
    total: fromHundredths(totalH),
    barWeight: bar,
    perSide,
    perSideWeight: fromHundredths(Math.round((totalH - barH) / 2) - remainingH),
    loadedWeight: fromHundredths(loadedH),
    remainder: fromHundredths(remainingH),
  };
}

/**
 * Formatiert ein Gewicht mit geschütztem Leerzeichen vor der Einheit.
 * Deutsch: Dezimalkomma und Tausenderpunkt, Englisch umgekehrt.
 */
export function formatWeight(value, unit, locale = 'de') {
  const [intPart, decPart] = (Math.round(value * 100) / 100).toFixed(2).split('.');
  const decimals = decPart.replace(/0+$/, '');
  const groupSep = locale === 'en' ? ',' : '.';
  const decimalSep = locale === 'en' ? '.' : ',';
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep);
  const number = decimals ? `${grouped}${decimalSep}${decimals}` : grouped;
  return `${number}\u00A0${unit}`;
}

/** CSS-Variablenname der Scheibenfarbe nach Gewicht in Kilogramm. */
export function plateColorToken(kg) {
  if (kg >= 25) return '--plate-25';
  if (kg >= 20) return '--plate-20';
  if (kg >= 15) return '--plate-15';
  if (kg >= 10) return '--plate-10';
  if (kg >= 5) return '--plate-5';
  return '--plate-neutral';
}
