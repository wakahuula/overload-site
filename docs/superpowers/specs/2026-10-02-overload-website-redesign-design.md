# Overload-Website v2 — Design-Spec

**Datum:** 2026-10-02
**Status:** vom Auftraggeber freigegeben (Chat-Entwurf), bereit für die Umsetzung
**Betroffenes Repo:** `overload-site` (GitHub Pages, Projektseite)
**Nicht betroffen:** das App-Repo `Powerful` (nur Inhalts-/Design-Referenz)

## 1. Ziel

Die bestehende Marketing-Seite von Overload wird vollständig überarbeitet. Sie
soll die tatsächlichen Fähigkeiten der App abbilden, Vertrauen über Ehrlichkeit
aufbauen und sich sichtbar von Cloud-getriebenen Trackern abheben.

Erfolg heißt:

- Die Seite verkauft die Gegenposition: **offline, kein Konto, Daten bleiben
  auf dem Gerät** — belegt durch echte Funktionen, nicht durch Werbesprache.
- Jede inhaltliche Aussage ist durch `README.md` / `STATUS.md` der App gedeckt.
- UX, Codequalität, Inhalt und Motion haben ein sichtbar hohes Niveau.
- Die Seite funktioniert zweisprachig (DE/EN), in Hell und Dunkel, auf Desktop
  und Mobile, ohne externe JS-Abhängigkeiten.

## 2. Constraints (hart)

- **Kein Build-Schritt.** Reines HTML/CSS/JS, direkt auf GitHub Pages lauffähig.
- **`oauth-client-metadata.json` bleibt unverändert im Repo-Wurzelverzeichnis.**
  Die Datei ist als OAuth-Client-ID (`client_id` =
  `https://wakahuula.github.io/overload-site/oauth-client-metadata.json`) der
  Overload-App registriert. Pfad und Inhalt dürfen sich nicht ändern.
- **`favicon.png` und `LICENSE`** bleiben erhalten.
- **Keine erfundenen Zahlen, Bewertungen, Testimonials oder Store-Badges.**
  Es gibt keine Store-Releases, keine Nutzerzahlen, keine Ratings.
- **Keine schweren Bibliotheken.** Nur die drei Google-Fonts-Familien
  (Barlow Condensed, Barlow, IBM Plex Mono).

## 3. Positionierung & Ton

- Kernaussage: `Mehr Gewicht. Jede Woche.` (bleibt).
- Haltung: **„Dein Training. Dein Gerät. Kein Konto."**
- Ton: sachlich, direkt, selbstbewusst, ohne Growth-Sprache. Keine Em-Dashes,
  kein Passiv, keine Werbe-Superlative. (Die laufende Seite wurde bereits
  einmal von KI-Tells befreit; dieser Standard gilt weiter.)

## 4. Informationsarchitektur (eine Seite)

1. **Nav** — Wortmarke, Sprungmarken (`Prinzip · Features · Analyse ·
   Datenschutz · Download`), DE/EN-Umschalter, Hell/Dunkel-Umschalter.
   Mobile: die Links wandern in ein kompaktes Menü oder werden reduziert;
   Sprach- und Theme-Schalter bleiben immer erreichbar.
2. **Hero** — Headline, Lead, zwei CTAs, Trust-Marker (`Offline · Kein Konto ·
   Alles auf dem Gerät`). Rechts/darunter die lebendige Hantel-Bühne.
3. **Marquee** — Scheibencode-Streifen mit Leitbegriffen.
4. **Das Prinzip** — scroll-gesteuerte Hantel-Beladung mit echter
   Scheibenmathematik, kg-Anzeige und PR-Moment bei Volllast.
5. **Interaktive Demos**
   - **Scheibenrechner** im Phone-Mockup, inkl. **kg/lbs-Umschaltung**.
   - **Progressions-Simulator**: Woche für Woche weiterklicken, Training Max
     und Arbeitsgewicht folgen den echten Regeln (lineare Progression,
     Schema-Leiter/Fail, Reset).
6. **Features in Gruppen** (Karten mit Mono-Tag, Titel, Text):
   - *Programme* — GZCLP, nSuns, PPL; eigener Builder mit Supersätzen,
     Deload-Wochen, Cover.
   - *Progression* — linear, double, AMRAP, RPE, RIR, Prozent, Cycle;
     Fail-Policy und TM-Reset.
   - *Logger* — Zielwerte vorausgefüllt, ein Tap bestätigt, Supersätze
     gruppiert, Rest-Timer mit Benachrichtigung, AMRAP.
   - *Rekorde* — PR-Erkennung beim Satz-Commit, Haptik und Flash, eine
     Rekordquelle.
   - *Analyse* — Muskelvolumen, Wochenreport, Drücken:Ziehen-Balance und
     Balance-Trend.
   - *Import/Export* — Strong, Hevy, JEFIT, FitNotes, Boostcamp; CAR-Datei
     für Programm-Austausch.
   - *Bluesky* — optional per App-Passwort; Profil, Feed, Likes, Antworten.
   - *Anpassung* — kg/lbs, Meter/Fuß, Hell/Dunkel, Deutsch/Englisch,
     Schriftgröße.
7. **Das Scheibensystem** — IPF-Farbcode als Marke (25/20/15/10/5/2,5 kg).
8. **Warum offline-first** — Datenschutz als Haltung; keine erfundenen Zahlen,
   stattdessen belegbare Eigenschaften (kein Konto, kein Cloud-Zugriff auf
   Trainingsdaten, Datenexport in beide Richtungen).
9. **Was Overload bewusst nicht tut** — kein Konto, kein Abo-Zwang für die
   Basics, kein Tracking, keine Cloud-Pflicht. Ruhige, ehrliche Abgrenzung
   ohne Wettbewerber namentlich herabzusetzen.
10. **FAQ** — Ist es kostenlos? Wohin gehen meine Daten? Gibt es iOS? Kann ich
    meine Daten mitnehmen? Funktioniert es ohne Empfang? Was ist mit Bluesky?
11. **Download** — ehrlich: „In Entwicklung", Primär-CTA GitHub, Hinweis auf
    fehlendes Tracking.
12. **Footer** — Repo, MIT-Lizenz, Bluesky-OAuth-Hinweis.

## 5. Design-System

Die App ist die Quelle. Die Website übernimmt die Tokens aus
`Powerful/src/shared/theme.ts` exakt:

- **Farben:** beide Paletten (`dark`, `light`) in `styles/tokens.css` als
  CSS-Custom-Properties; Umschaltung über `:root[data-theme]`.
- **Typografie:** Barlow Condensed (Display, versal, Tracking), Barlow (Text),
  IBM Plex Mono (Daten, tabellarische Ziffern).
- **Radien/Abstände/Motion:** `radius`, `space`, `motion` aus `theme.ts`
  (Ease-Out `cubic-bezier(0.23, 1, 0.32, 1)`).
- **Scheibencode** als einzige Akzentquelle; Text-Akzente immer als Tint,
  nie als Flächenfarbe.

## 6. Motion (taktvoll, reduced-motion-fest)

- Hero: Type-Reveal, Lichtkegel, Hantel montiert sich.
- Scroll: Hantel-Beladung mit Feder-Einrasten, PR-Flash bei Volllast.
- Progressions-Simulator: animierte Zahlen und Balken.
- Muskel-Balance: animiertes Balkenpaar, das beim Scrollen einläuft.
- Sprach-/Theme-Wechsel: weicher Übergang.
- Section-Reveals per IntersectionObserver.
- **`prefers-reduced-motion: reduce`** schaltet alle Bewegungen auf statische
  Endzustände; `scroll-behavior` wird `auto`.

## 7. Technische Struktur

```
overload-site/
├── index.html
├── styles/
│   ├── tokens.css      # Paletten + Typo/Motion-Tokens
│   └── site.css        # Layout, Komponenten, Responsive
├── scripts/
│   ├── i18n.js         # Wörterbuch, Sprachwahl, Anwendung
│   ├── plate-math.js   # reine Scheibenberechnung (kg/lbs)
│   ├── motion.js       # Reveals, Theme-/Sprach-Glue, nav
│   ├── barbell.js      # Scroll-Beladung
│   └── progression.js  # Progressions-Simulator
├── favicon.png         # unverändert
├── oauth-client-metadata.json  # unverändert
└── LICENSE             # unverändert
```

- ES-Module (`<script type="module">`), progressiv: Kerninhalte sind auch
  ohne JS lesbar und navigierbar.
- i18n über `data-i18n` / `data-i18n-attr`; aktive Sprache aus
  `localStorage` → `?lang=` → `navigator.language`; Fallback Deutsch.
- `<html lang>` und `<title>`/`<meta description>` folgen der Sprache.

## 8. Barrierefreiheit & SEO

- Semantische Landmarks, Skip-Link, sichtbare Fokus-Ringe, ausreichende
  Kontraste (Tints), `aria-*` für Umschalter und Demos.
- Interaktive Demos per Tastatur bedienbar; dekorative Grafik `aria-hidden`.
- Meta: Title/Description je Sprache, Canonical, `hreflang`-Alternates,
  OpenGraph/Twitter, JSON-LD `SoftwareApplication`, `theme-color`,
  `prefers-color-scheme` als Startwert.

## 9. Verifikation

- Lokaler Server, dann **Playwright**: Screenshots in
  DE/EN × hell/dunkel × Desktop/Mobile; Sprach- und Theme-Wechsel,
  Scheibenrechner und Progressions-Simulator durchklicken.
- HTML-Struktur prüfen; Kontrast-Stichprobe; Reduced-Motion-Test.
- Manuelle Sichtprüfung aller Sektionen.
- `oauth-client-metadata.json` bleibt byte-identisch und am selben Pfad.

## 10. Nicht-Ziele

- Kein Blog, keine Mehrseiten-Struktur, kein Analytics, keine Cookies,
  keine Formular-Backends, keine Store-Deep-Links (existieren nicht).
- Keine Änderung am App-Repo.
