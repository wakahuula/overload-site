# Overload-Website v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die statische Overload-Marketing-Seite wird zweisprachig (DE/EN), hell/dunkel, inhaltlich an die App angeglichen und mit interaktiven, ehrlichen Demos neu gebaut.

**Architecture:** Kein Build-Schritt. Reines HTML/CSS/JS. Reine Rechenlogik (Scheiben, Progression, Wörterbuch) liegt in eigenständigen ES-Modulen, die in Node per `node --test` geprüft werden; Darstellung und Motion liegen in separaten Modulen und werden per Playwright/Sichtprüfung verifiziert. Alle Farben und Typo-Rollen stammen 1:1 aus `Powerful/src/shared/theme.ts`.

**Tech Stack:** HTML5, CSS Custom Properties, natives ES-Module, `node --test` (Node 24, keine Abhängigkeiten), Python `http.server` lokal, Playwright zur Sichtprüfung. Google Fonts: Barlow Condensed, Barlow, IBM Plex Mono.

**Spec:** `docs/superpowers/specs/2026-10-02-overload-website-redesign-design.md`

## Global Constraints

- **Kein Build-Schritt.** Nur statische Dateien; läuft direkt auf GitHub Pages.
- **`oauth-client-metadata.json` byte-identisch und am Repo-Wurzelverzeichnis.** Pfad ist OAuth-Client-ID der App.
- **`favicon.png` und `LICENSE` bleiben.** Lizenz: MIT, Copyright (c) 2026 wakahuula.
- **Keine erfundenen Zahlen/Bewertungen/Testimonials/Store-Badges.** Aussagen nur aus `README.md`/`STATUS.md` der App.
- **Keine externen JS-Bibliotheken.** Nur die drei Google-Fonts-Familien.
- **Ton:** sachlich, aktiv, kein Passiv, keine Em-Dashes, keine Superlative.
- **Barrierefrei:** Reduced-Motion respektieren, Tastaturbedienung, Fokus sichtbar, Kontrast ≥ AA für Text-Tints.
- **Tokens:** Farben aus `theme.ts` (`dark` und `light`), Ease-Out `cubic-bezier(0.23, 1, 0.32, 1)`.

## Review Focus

- **Ohne JavaScript:** Inhalt bleibt lesbar, Links navigierbar, Demos zeigen einen statischen Endzustand statt Lücken.
- **Ungültige/gespeicherte Sprachwahl:** `?lang=xx`, kaputter `localStorage`-Wert oder fehlender Schlüssel dürfen die Seite nicht halb übersetzt lassen; sauberer Fallback auf Deutsch.
- **Schmaler Viewport (320–360 px):** Nav, Hero-Hantel, Phone-Mockup und Tabellen dürfen nicht überlaufen oder horizontal scrollen.
- **Nicht ladbare Gewichte und Einheitenwechsel:** `21 kg` bei 20-kg-Stange, `kg`↔`lbs`-Umschaltung im Rechner — Restgewicht muss ausgewiesen werden, keine Endlosschleife, keine falsche Zahl.
- **Reduced Motion:** Alle scroll- und zeitgesteuerten Effekte springen auf den Endzustand; kein Element bleibt unsichtbar (`opacity: 0` hängend).

---

### Task 1: Testfundament + reine Scheibenmathematik

**Files:**
- Create: `package.json`
- Create: `scripts/plate-math.js`
- Test: `tests/plate-math.test.js`
- Create: `tools/serve.mjs` (Null-Abhängigkeiten-Static-Server für lokale Prüfung)

**Interfaces:**
- Produces (ESM aus `scripts/plate-math.js`):
  - `RACKS: { kg: number[], lb: number[] }`
  - `BAR: { kg: number, lb: number }`
  - `kgToLb(kg: number): number`, `lbToKg(lb: number): number`
  - `calculatePlates(total: number, opts?: { unit?: 'kg'|'lb', barWeight?: number }): { unit, total, barWeight, perSide: number[], perSideWeight, loadedWeight, remainder }`
  - `formatWeight(value: number, unit: 'kg'|'lb'): string`
  - `plateColorToken(kg: number): string` (liefert `'--plate-25' | '--plate-20' | '--plate-15' | '--plate-10' | '--plate-5' | '--plate-neutral'`)

- [ ] **Step 1: `package.json` anlegen** (nur für Tests, kein Build)

```json
{
  "name": "overload-site",
  "private": true,
  "type": "module",
  "scripts": { "test": "node --test tests/" }
}
```

- [ ] **Step 2: Failing tests schreiben** in `tests/plate-math.test.js`

Fälle (exakte Erwartungen): `calculatePlates(20)` → `perSide []`, `loadedWeight 20`; `calculatePlates(100)` → `perSide [25,15]`; `calculatePlates(220)` → `perSide [25,25,25,25]`; `calculatePlates(102.5)` → `perSide [25,15,1.25]`; `calculatePlates(21)` → `perSide []`, `remainder 0.5`; `calculatePlates(135,{unit:'lb'})` → `perSide [45]`; `calculatePlates(225,{unit:'lb'})` → `perSide [45,45]`; `formatWeight(102.5,'kg') === '102,5 kg'`; `plateColorToken(25)==='--plate-25'`, `plateColorToken(2.5)==='--plate-neutral'`; `kgToLb(20)`/`lbToKg(45)` Round-Trip.

- [ ] **Step 3: Tests laufen lassen, Fehlschlag bestätigen**

Run: `npm test`
Expected: FAIL, Modul existiert nicht / Exporte fehlen.

- [ ] **Step 4: `scripts/plate-math.js` implementieren**

Greedy-Absteigend vom schwersten ladbaren Gewicht; intern in Hundertstel rechnen (Float-Vermeidung); maximal 12 Scheiben pro Seite; `remainder` als ehrlicher Rest. `calculatePlates` clampt `total` auf `>= barWeight`. Kommentar auf Deutsch, warum in Hundertsteln gerechnet wird.

- [ ] **Step 5: Tests laufen lassen, Erfolg bestätigen**

Run: `npm test`
Expected: PASS (alle Fälle).

- [ ] **Step 6: `tools/serve.mjs` anlegen** — minimaler statischer Server (`node:http`, `node:fs`, korrekte MIME-Typen für `.html/.css/.js/.json/.png`), Port 4173, dient das Repo-Wurzelverzeichnis.

- [ ] **Step 7: Commit**

```bash
git add package.json scripts/plate-math.js tests/plate-math.test.js tools/serve.mjs
git commit -m "feat(site): testbare Scheibenmathematik und Testfundament"
```

---

### Task 2: Reine Progressions-Engine

**Files:**
- Create: `scripts/progression.js`
- Test: `tests/progression.test.js`

**Interfaces:**
- Produces:
  - `SCHEMES: readonly { sets: number, reps: number, percent: number, label: string }[]` (5×3 @ 0.85, 6×2 @ 0.875, 10×1 @ 0.90)
  - `roundToPlate(valueKg: number, step?: number): number` (Default 2.5)
  - `workWeight(tm: number, schemeIndex: number): number`
  - `applyWeek(state: { tm: number, schemeIndex: number, increment: number }, success: boolean): { tm, schemeIndex, event: 'increase'|'step'|'reset' }`
  - `prescription(state: { tm, schemeIndex }): { sets, reps, percent, weight }`

- [ ] **Step 1: Failing tests schreiben** in `tests/progression.test.js`

Fälle: Erfolg erhöht `tm` um `increment`, `schemeIndex` bleibt; Fehlschlag bei Index 0 → Index 1 (`event 'step'`); bei Index 2 (10×1) → `tm` auf 90 % gerundet und Index 0 (`event 'reset'`); `workWeight(100,0)===85`, `workWeight(100,1)===87.5` (gerundet auf 2,5 → `87.5`), `workWeight(100,2)===90`; `roundToPlate(86.2)===85`.

- [ ] **Step 2: Tests laufen lassen, Fehlschlag bestätigen**

Run: `npm test`
Expected: FAIL (Modul fehlt).

- [ ] **Step 3: `scripts/progression.js` implementieren** gemäß Modell aus `STATUS.md` §Progression. Reine Funktionen, keine Zeit-/DOM-Abhängigkeit.

- [ ] **Step 4: Tests laufen lassen, Erfolg bestätigen**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/progression.js tests/progression.test.js
git commit -m "feat(site): testbare Progressions-Engine"
```

---

### Task 3: Zweisprachiges Wörterbuch

**Files:**
- Create: `scripts/content.js`
- Test: `tests/content.test.js`

**Interfaces:**
- Produces: `content: { de: Record<string,string>, en: Record<string,string> }`, `LANGS = ['de','en']`.

- [ ] **Step 1: Failing tests schreiben** in `tests/content.test.js`

Prüft: identische Schlüsselmenge DE/EN; kein leerer Wert; kein `—`/`–`; kein `TODO`/`TBD`/`Lorem`; jeder Wert ist ein String; keine Store-/Rating-Behauptungen (`tokenmatch` gegen `/App Store|Google Play|★|4\.\d|Million/i`).

- [ ] **Step 2: Tests laufen lassen, Fehlschlag bestätigen**

Run: `npm test`
Expected: FAIL.

- [ ] **Step 3: `scripts/content.js` schreiben** — vollständiges Wörterbuch in beiden Sprachen für alle `data-i18n`-Schlüssel aus Task 6–10. Inhalte ausschließlich aus `README.md`/`STATUS.md` der App (GZCLP/nSuns/PPL, Progression-Modi, Import-Apps, CAR, Bluesky per App-Passwort, Muskelanalyse, kg/lbs, hell/dunkel, DE/EN, Schriftgröße). FAQ ehrlich, Download als „in Entwicklung".

- [ ] **Step 4: Tests laufen lassen, Erfolg bestätigen**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/content.js tests/content.test.js
git commit -m "feat(site): zweisprachiges Woerterbuch DE/EN"
```

---

### Task 4: Design-Tokens aus der App

**Files:**
- Create: `styles/tokens.css`

**Interfaces:**
- Produces: CSS-Custom-Properties für beide Paletten über `:root[data-theme="dark"]` (Default) und `:root[data-theme="light"]`: `--bg, --surface, --raised, --line, --line-soft, --text, --mut, --faint, --text-dim, --text-dim-soft, --action, --info, --effort, --success, --plate-5, --plate-neutral, --tint-action, --tint-info, --tint-effort, --tint-success, --tint-bg-*, --on-action, --on-plate-5, --success-wash, --effort-wash, --effort-edge, --cover-base, --cover-ink, --scrim, --shadow-ink`, plus `--font-display`, `--font-body`, `--font-mono`, `--radius-*`, `--space-*`, `--ease-out`, `--dur-*`.

- [ ] **Step 1: `styles/tokens.css` schreiben.** Werte exakt aus `Powerful/src/shared/theme.ts` (beide Paletten). Darüber hinaus `color-scheme` je Theme setzen.
- [ ] **Step 2: Sichtprüfung** — Tokens-Testseite entfällt; Farbstichproben werden in Task 12 im echten Layout geprüft.
- [ ] **Step 3: Commit** — `git commit -m "feat(site): Design-Tokens aus der App (hell/dunkel)"`

---

### Task 5: Layout- und Komponenten-Styles

**Files:**
- Create: `styles/site.css`

**Interfaces:**
- Consumes: Tokens aus Task 4.
- Produces: Klassen für Nav, Hero, Marquee, Prinzip/Barbell, Demos, Feature-Karten, Scheiben-Legende, Balance, No-List, FAQ, Download, Footer; Breakpoints bei 900 px und 560 px; Reduced-Motion-Block.

- [ ] **Step 1: `styles/site.css` schreiben** — mobile-first, Grid/Flex, konsistente Abstände aus Tokens, sichtbare `:focus-visible`-Ringe, Hover nur für Zeiger-Geräte.
- [ ] **Step 2: Commit** — `git commit -m "feat(site): Layout und Komponenten-Styles"`

---

### Task 6: HTML-Grundgerüst, Nav, Hero, Marquee

**Files:**
- Create/Replace: `index.html` (Struktur, `<head>` mit Meta und Modul-Skripten)
- Create: `scripts/site.js` (Theme, Nav, Reveals, Jahr; ruft `initI18n` auf)

**Interfaces:**
- Consumes: `content` (Task 3), `initI18n` (Task 7), Tokens/Styles (Task 4/5).
- Produces: DOM-Vertrag `[data-i18n]`, `[data-i18n-attr]`, `[data-theme-toggle]`, `[data-lang-toggle]`, `[data-reveal]`.

- [ ] **Step 1: `index.html` schreiben** — semantische Landmarks (`header/nav/main/section/footer`), Skip-Link, `<html lang="de">`, Sprech- und Meta-Texte mit `data-i18n`. Nav mit Logo (Over/Load + vier Balken), Links, Sprach- und Theme-Schalter. Hero mit Headline, Lead, CTAs, drei Trust-Markern und leerer Hantel-Bühne (`#hero-bar`). Marquee mit Track-Duplikat für Endlosschleife.
- [ ] **Step 2: `scripts/site.js` minimal** — Theme aus `localStorage`/`prefers-color-scheme` setzen, Toggle verdrahten, Nav-Kante ab Scroll, Jahr im Footer, Reveals per IntersectionObserver (Reduced-Motion-Fallback setzt sofort sichtbar).
- [ ] **Step 3: Lokal prüfen** — `node tools/serve.mjs`, Seite lädt, Hero steht, Toggle schaltet.
- [ ] **Step 4: Commit** — `git commit -m "feat(site): Grundgeruest, Nav, Hero, Marquee"`

---

### Task 7: i18n-Laufzeit

**Files:**
- Create: `scripts/i18n.js`

**Interfaces:**
- Consumes: `content`, `LANGS` (Task 3).
- Produces: `initI18n(): void`, `getLang(): 'de'|'en'`, `setLang(lang: string): void`.
- Verhalten: aktive Sprache aus `localStorage('overload-lang')` → `?lang=` → `navigator.language` → `'de'`; setzt `<html lang>`, `document.title`, `meta[description]`, alle `[data-i18n]` (`textContent`) und `[data-i18n-attr]` (`data-i18n-attr="aria-label:key"`); unbekannte Sprache fällt auf `de`; fehlender Schlüssel fällt auf `de`-Wert, sonst auf den Schlüssel.

- [ ] **Step 1: `scripts/i18n.js` schreiben.**
- [ ] **Step 2: `scripts/site.js` verdrahten** — `initI18n()` beim Start, Sprachschalter ruft `setLang`.
- [ ] **Step 3: Failing→passing Prüfung** — lokal mit `?lang=en` und `?lang=xx` laden: EN vollständig, XX fällt auf Deutsch zurück.
- [ ] **Step 4: Commit** — `git commit -m "feat(site): i18n-Laufzeit mit Fallback"`

---

### Task 8: Hero-Hantel und Prinzips-Sektion (Scroll-Beladung)

**Files:**
- Create: `scripts/barbell.js`
- Modify: `index.html` (Prinzip-Sektion), `styles/site.css` (Barbell-Styles)
- Consumes: `plateColorToken`, `formatWeight` (Task 1), `RACKS`/`BAR`.

- [ ] **Step 1:** Markup für Hero-Hantel und Sticky-Prinzips-Bühne mit Scheiben-Slots (links/rechts), Gewichtsanzeige `#load-kg`, Statuszeile `#load-msg`.
- [ ] **Step 2:** `scripts/barbell.js` — Hero-Hantel montiert sich beim Laden sequenziell; Scroll-Beladung berechnet Fortschritt und legt Scheibenpaare nacheinander an; zeigt kg und Stufen-Text; setzt `data-maxed` bei Volllast (PR-Flash via CSS). Roundet auf echte Scheibenschritte.
- [ ] **Step 3:** Reduced-Motion-Pfad zeigt sofort 220 kg und PR-Endzustand.
- [ ] **Step 4: Prüfen** — scrollen, Zwischenwerte kontrollieren; `prefers-reduced-motion` emulieren.
- [ ] **Step 5: Commit** — `git commit -m "feat(site): interaktive Hantel und Prinzips-Scroll"`

---

### Task 9: Scheibenrechner-Demo (Phone)

**Files:**
- Create: `scripts/plate-demo.js`
- Modify: `index.html` (Phone-Mockup), `styles/site.css`
- Consumes: `calculatePlates`, `formatWeight`, `plateColorToken`, `BAR`.

- [ ] **Step 1:** Markup: Phone-Rahmen, Kopf, Gewichtskarte mit `−`/`+`, Slider, Einheiten-Umschalter kg/lbs, Scheibenbühne, Statuszeile.
- [ ] **Step 2:** `scripts/plate-demo.js` — Slider/Buttons steuern Gewicht in der aktiven Einheit; baut beide Scheibenstapel aus `calculatePlates`; Einheitenwechsel setzt Slider-Grenzen und Stange neu (kg 20 / lbs 45) und rechnet um; Statuszeile nennt kg pro Seite, Scheibenzahl und ausgewiesenen Rest.
- [ ] **Step 3: Failing→passing Prüfung** — `21 kg`, `20 kg`, `220 kg`, `135 lbs`, `225 lbs` durchspielen; Tastaturbedienung des Sliders.
- [ ] **Step 4: Commit** — `git commit -m "feat(site): Scheibenrechner-Demo mit kg/lbs"`

---

### Task 10: Progressions-Simulator

**Files:**
- Create: `scripts/progression-demo.js`
- Modify: `index.html`, `styles/site.css`
- Consumes: `SCHEMES`, `applyWeek`, `prescription`, `roundToPlate` (Task 2).

- [ ] **Step 1:** Markup: aktuelle Woche, Training Max, Schema (Sätze×Wdh + Prozent), Arbeitsgewicht, Buttons „Ziel erreicht" / „Ziel verfehlt" / „Zurücksetzen", Ereignis-Zeile.
- [ ] **Step 2:** `scripts/progression-demo.js` — hält Zustand `{ week, tm, schemeIndex, increment }`; Buttons rufen `applyWeek` und aktualisieren Zahlen animiert; Ereignistext erklärt den Schritt („TM +2,5 kg", „Nächstes Schema", „Reset −10 %").
- [ ] **Step 3: Prüfen** — Erfolgsserie, Fehlschlag bis 10×1, Reset.
- [ ] **Step 4: Commit** — `git commit -m "feat(site): Progressions-Simulator"`

---

### Task 11: Feature-, Analyse-, Scheiben-, Datenschutz-, FAQ- und Download-Sektionen

**Files:**
- Modify: `index.html`, `styles/site.css`
- Modify: `scripts/site.js` (Balance-Balken animieren), `scripts/content.js` (fehlende Keys ergänzen)

- [ ] **Step 1:** Feature-Gruppen als Karten (Programme, Progression, Logger, Rekorde, Analyse, Import/Export, Bluesky, Anpassung) mit Mono-Tags.
- [ ] **Step 2:** Scheibensystem-Legende (25/20/15/10/5/2,5 kg inkl. lb-Angabe).
- [ ] **Step 3:** „Warum offline-first" mit animiertem Balance-Balkenpaar und belegbaren Aussagen (kein Konto, kein Cloud-Zugriff, Export in beide Richtungen).
- [ ] **Step 4:** „Was Overload bewusst nicht tut" (kein Konto, kein Abo-Zwang für Basics, kein Tracking, keine Cloud-Pflicht).
- [ ] **Step 5:** FAQ als `<details>` (ohne JS bedienbar) mit ehrlichen Antworten.
- [ ] **Step 6:** Download-Sektion ehrlich („in Entwicklung", CTA GitHub) und Footer (Repo, MIT, Bluesky-OAuth-Hinweis).
- [ ] **Step 7:** `npm test` (Wörterbuch-Parität), Sichtprüfung, Commit — `git commit -m "feat(site): Inhalts-Sektionen und FAQ"`

---

### Task 12: Motion-Feinschliff, SEO/Meta und Verifikation

**Files:**
- Modify: `index.html` (`<head>`), `scripts/site.js`, `styles/site.css`
- Create: `scripts/motion.js` (falls Auslagerung nötig)

- [ ] **Step 1:** Meta ergänzen: Title/Description je Sprache, Canonical, `hreflang`-Alternates (`?lang=de`, `?lang=en`), OpenGraph/Twitter, `theme-color` je Theme, JSON-LD `SoftwareApplication`.
- [ ] **Step 2:** Motion prüfen und glätten (Reveal-Stagger, Hover, Theme-/Sprachübergang), reduced-motion-Endzustände sicherstellen.
- [ ] **Step 3: Playwright-Durchgang** — Screenshots DE/EN × hell/dunkel × Desktop (1440)/Mobile (360); Sprach- und Theme-Wechsel; beide Demos durchklicken; `?lang=xx`-Fallback; keine Konsolenfehler.
- [ ] **Step 4:** Kontrast-Stichprobe der Text-Tints; `oauth-client-metadata.json` per `git diff` als unverändert bestätigen.
- [ ] **Step 5: Commit** — `git commit -m "feat(site): Meta, Motion-Feinschliff und Verifikation"`

---

## Self-Review

**Spec-Abdeckung:** IA-Punkte 1–12 → Tasks 6–11; Design-System → Task 4/5; Motion → Task 8/10/12; i18n → Task 3/7; A11y/SEO → Task 5/12; Verifikation → Task 12; Constraints → Global Constraints (oauth unberührt in Task 12 Step 4 geprüft).

**Typkonsistenz:** `calculatePlates`/`formatWeight`/`plateColorToken` (Task 1) werden in Task 8/9 unverändert verwendet; `SCHEMES`/`applyWeek`/`prescription` (Task 2) in Task 10; `content`/`LANGS` (Task 3) in Task 7.

**Review Focus:** jeder Punkt hat einen Besitzer — ohne JS (Task 6/7, progressive Markup), Sprach-Fallback (Task 7 Step 3), schmaler Viewport (Task 12 Step 3), Restgewicht/Einheiten (Task 1 Tests, Task 9 Step 3), Reduced Motion (Task 8 Step 3, Task 12 Step 2).

**Offen bewusst:** kein Build, keine Analytics, keine Store-Links.
