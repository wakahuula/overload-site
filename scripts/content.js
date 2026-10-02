/**
 * Zweisprachiger Inhalt der Website. `de` ist die Referenz, `en` muss dieselbe
 * Schlüsselmenge tragen (tests/content.test.js erzwingt das). Alle Aussagen
 * stammen aus README.md und STATUS.md der App; nichts ist erfunden.
 */

export const LANGS = ['de', 'en'];

export const content = {
  de: {
    'meta.title': 'Overload · Mehr Gewicht. Jede Woche.',
    'meta.description':
      'Overload ist der Workout-Tracker für Kraftsport. Offline-first, ohne Konto, mit echter Progression: linear, Double Progression, AMRAP, RPE und RIR. Alle Daten bleiben auf dem Gerät.',
    skip: 'Zum Inhalt springen',

    'nav.principle': 'Prinzip',
    'nav.features': 'Funktionen',
    'nav.analysis': 'Analyse',
    'nav.privacy': 'Datenschutz',
    'nav.download': 'Download',
    'nav.menuLabel': 'Menü öffnen',
    'nav.themeLabel': 'Erscheinungsbild wechseln',
    'nav.langLabel': 'Sprache wechseln',

    'hero.kicker': 'Offline-first · Kein Konto',
    'hero.title1': 'Mehr Gewicht.',
    'hero.title2': 'Jede Woche.',
    'hero.lead':
      'Overload ist der Tracker für Kraftsport, der die Last nach Regeln steigert. Du loggst den Satz, Overload rechnet die nächste Woche. Kein Konto, keine Cloud, keine Ablenkung zwischen den Sätzen.',
    'hero.ctaPrimary': 'So funktioniert es',
    'hero.ctaSecondary': 'Projekt auf GitHub',
    'hero.trust1': 'Offline',
    'hero.trust2': 'Kein Konto',
    'hero.trust3': 'Alles auf dem Gerät',

    'marquee.1': 'Progressive Overload',
    'marquee.2': 'Offline-first',
    'marquee.3': 'Kraftsport',
    'marquee.4': 'Neue Rekorde',
    'marquee.5': 'Kein Ballast',
    'marquee.6': 'Deine Daten',

    'principle.label': 'Das Prinzip',
    'principle.title': 'Scrollen lädt die Stange.',
    'principle.lead':
      'Progressive Overload heißt: ein bisschen mehr als letzte Woche. Overload macht daraus eine Regel statt eines Gefühls und rechnet das Arbeitsgewicht für jede Einheit aus.',
    'principle.barLabel': 'Hantel, die sich beim Scrollen belädt',
    'principle.unit': 'kg',
    'principle.msg0': 'Leere Stange · 20 kg',
    'principle.msg1': 'Zwei 25er drauf',
    'principle.msg2': 'Noch zwei 25er',
    'principle.msg3': 'Zwei 20er folgen',
    'principle.msg4': 'Zwei 15er drauf',
    'principle.msg5': 'Zwei 10er drauf',
    'principle.msg6': 'Vollbeladen · neue Bestleistung',

    'demo.label': 'Live-Demo',
    'demo.title': 'Rechne deine Stange aus.',
    'demo.lead':
      'Stell das Gewicht ein, Overload verteilt es auf die Scheiben. Die Demo nutzt denselben Farbcode wie die App und rechnet in Kilogramm oder Pfund.',
    'demo.screenLabel': 'Hantel laden',
    'demo.screenOffline': 'Offline',
    'demo.unitKg': 'kg',
    'demo.unitLb': 'lbs',
    'demo.unitLabel': 'Einheit wechseln',
    'demo.minus': 'Gewicht verringern',
    'demo.plus': 'Gewicht erhöhen',
    'demo.weightLabel': 'Gewicht in Kilogramm oder Pfund',
    'demo.note': 'Pro Seite {perSide} · Scheiben: {count}',
    'demo.noteRest': 'Nicht ladbar: {rest} pro Seite',
    'demo.caption': 'Scheibenrechner mit dem IPF-Farbcode der App.',

    'prog.label': 'Progressions-Engine',
    'prog.title': 'Was nächste Woche passiert.',
    'prog.lead':
      'Ein erfülltes Soll hebt den Training Max. Ein Fehlschlag steigt die Schema-Leiter hinauf, und wer auch die letzte Stufe verfehlt, setzt den Training Max zurück. Klick es durch.',
    'prog.week': 'Woche',
    'prog.tm': 'Training Max',
    'prog.scheme': 'Schema',
    'prog.work': 'Arbeitsgewicht',
    'prog.success': 'Ziel erreicht',
    'prog.fail': 'Ziel verfehlt',
    'prog.reset': 'Zurücksetzen',
    'prog.eventIncrease': 'Ziel erfüllt. Training Max plus {inc}.',
    'prog.eventStep': 'Ziel verfehlt. Nächstes Schema: {label}.',
    'prog.eventReset': 'Letzte Stufe verfehlt. Training Max minus 10 %, zurück auf 5×3.',
    'prog.eventStart': 'Start bei Training Max {tm}.',
    'prog.caption': 'Vereinfachte GZCL-Progression, dieselbe Logik wie in der App.',

    'features.label': 'Funktionen',
    'features.title': 'Kein Ballast. Nur Training.',
    'features.lead':
      'Overload verzichtet auf alles, was dich vom Satz unter der Stange abhält. Was bleibt, funktioniert auch ohne Empfang.',

    'feat.programs.tag': 'Programme',
    'feat.programs.title': 'Bewährte Pläne, eigener Builder',
    'feat.programs.text':
      'GZCLP, nSuns und PPL liegen fertig bereit. Oder du baust deinen eigenen Plan: Übungs-Slots, Supersätze, Deload-Wochen und ein Cover für die Bibliothek.',
    'feat.progression.tag': 'Progression',
    'feat.progression.title': 'Die Last steigt nach Regeln',
    'feat.progression.text':
      'Linear, Double Progression, AMRAP, RPE, RIR, Prozent oder Cycle. Du legst die Regel fest, Overload rechnet das nächste Arbeitsgewicht und hält eine Fail-Policy samt Training-Max-Reset bereit.',
    'feat.logger.tag': 'Logger',
    'feat.logger.title': 'Zielwerte stehen schon da',
    'feat.logger.text':
      'Vorausgefüllte Sätze, ein Tap bestätigt. Supersätze bleiben gruppiert, der Rest-Timer zählt die Pause und meldet sich auch, wenn die App im Hintergrund liegt. Der letzte T1-Satz ist AMRAP.',
    'feat.records.tag': 'Rekorde',
    'feat.records.title': 'Der PR-Moment passiert im Satz',
    'feat.records.text':
      'Overload erkennt einen Rekord beim Bestätigen des Satzes, mit Haptik und einem kurzen Flash. Die erste geloggte Leistung ist eine Basislinie und wird nicht gefeiert.',
    'feat.analysis.tag': 'Analyse',
    'feat.analysis.title': 'Volumen, Balance, Verlauf',
    'feat.analysis.text':
      'Volumen pro Muskel, wöchentliche Drücken:Ziehen-Balance und ein Balance-Trend über mehrere Wochen. Dazu ein Wochenreport, der seinen Vorschlag direkt in den Plan einträgt.',
    'feat.portability.tag': 'Import & Export',
    'feat.portability.title': 'Deine Historie bleibt deine',
    'feat.portability.text':
      'Hol deine Workouts aus Strong, Hevy, JEFIT, FitNotes oder Boostcamp. Eigene Programme teilst du als CAR-Datei, jeder Block gegen seine Prüfsumme abgesichert.',
    'feat.bluesky.tag': 'Bluesky',
    'feat.bluesky.title': 'Teilen, wenn du willst',
    'feat.bluesky.text':
      'Verbinde optional dein Bluesky-Profil per App-Passwort. Feed, Likes und Antworten erscheinen im Profil. Die Verbindung ist freiwillig und berührt deine Trainingsdaten nicht.',
    'feat.adapt.tag': 'Anpassung',
    'feat.adapt.title': 'Dein Gerät, deine Einheiten',
    'feat.adapt.text':
      'Kilogramm oder Pfund, Meter oder Fuß: alles ist eine Anzeige-Einstellung. Hell oder dunkel, Deutsch oder Englisch, und die Schriftgröße stellst du selbst ein.',

    'plates.label': 'Das Scheibensystem',
    'plates.title': 'Farbcode wie auf der Plattform.',
    'plates.lead':
      'Jedes Gewicht hat seine Farbe, von der 25er bis zur kleinen 2,5er. In der App markiert der Code Buttons, Balken und Bestleistungen.',
    'plates.p25': '25 kg',
    'plates.p25sub': '55 lb · Rot',
    'plates.p20': '20 kg',
    'plates.p20sub': '45 lb · Blau',
    'plates.p15': '15 kg',
    'plates.p15sub': '35 lb · Gelb',
    'plates.p10': '10 kg',
    'plates.p10sub': '25 lb · Grün',
    'plates.p5': '5 kg',
    'plates.p5sub': '10 lb · Weiß',
    'plates.p2': '2,5 kg',
    'plates.p2sub': '5 lb · Schwarz',

    'analysis.label': 'Analyse',
    'analysis.title': 'Volumen, Balance und Verlauf.',
    'analysis.lead':
      'Overload zählt nach jeder Session Abschluss-Punkte pro Muskel, vergleicht Drücken und Ziehen und führt den Trend über Wochen. Der Wochenreport schreibt seinen Vorschlag direkt in den Plan.',
    'analysis.point1': 'Volumen pro Muskel, aus deinen Logs.',
    'analysis.point2': 'Drücken:Ziehen-Balance jede Woche.',
    'analysis.point3': 'Balance-Trend über mehrere Wochen.',
    'analysis.point4': 'Wochenreport mit übernehmbarem Vorschlag.',
    'analysis.reportLabel': 'Wochenreport',
    'analysis.reportNote': 'Beispiel: Overload zählt die Sätze der Woche und schlägt die nächste Steigerung vor.',

    'privacy.label': 'Warum offline-first',
    'privacy.title': 'Dein Studio hat kein WLAN. Egal.',
    'privacy.lead':
      'Overload läuft vollständig auf dem Gerät. Keine Anmeldung, keine Sync-Warteschleife, kein Server, der mitliest. Auch im Keller ohne Empfang.',
    'privacy.item1': 'Kein Konto, keine E-Mail, kein Passwort.',
    'privacy.item2': 'Trainingsdaten verlassen das Gerät nicht.',
    'privacy.item3': 'Import und Export in beide Richtungen, jederzeit.',
    'privacy.item4': 'Bluesky bleibt optional und getrennt vom Training.',
    'privacy.stat1': 'Konten nötig',
    'privacy.stat2': 'lokal gespeichert',
    'privacy.stat3': 'Richtungen für Import und Export',

    'balance.label': 'Drücken : Ziehen',
    'balance.push': 'Drücken',
    'balance.pull': 'Ziehen',
    'balance.note':
      'Overload rechnet die Balance aus deinen Logs und zeigt den Verlauf über Wochen. Hier mit Beispieldaten.',
    'balance.example': 'Beispieldaten',

    'nogo.label': 'Was Overload bewusst nicht tut',
    'nogo.title': 'Kein Konto. Kein Abo für die Basics.',
    'nogo.lead':
      'Andere Tracker sperren den Kern hinter einem Abo. Overload hält Logging, Programme und Datenexport offen.',
    'nogo.item1': 'Kein Konto, kein Onboarding-Zwang.',
    'nogo.item2': 'Kein Abo für Logging, Programme und Export.',
    'nogo.item3': 'Kein Tracking, keine Werbe-IDs, keine Analytics.',
    'nogo.item4': 'Keine Cloud-Pflicht, kein Sync-Zwang.',

    'faq.label': 'Fragen',
    'faq.title': 'Kurz beantwortet.',
    'faq.q1': 'Ist Overload kostenlos?',
    'faq.a1':
      'Ja. Logging, Programme, Analyse und Export sind kostenlos gedacht. Ein Preis käme erst für Netzfunktionen wie Sync in Frage, nicht für die Basics.',
    'faq.q2': 'Wohin gehen meine Daten?',
    'faq.a2':
      'Nirgendwohin. Overload speichert alles lokal in einer Datenbank auf dem Gerät. Für das Training macht die App keine Netzwerkanfrage.',
    'faq.q3': 'Gibt es Overload für iOS?',
    'faq.a3':
      'Android und Web laufen. Die iOS-Fassung ist gebaut, aber noch nicht auf einem Apple-Gerät geprüft. Deshalb nennen wir keinen Termin.',
    'faq.q4': 'Kann ich meine Daten mitnehmen?',
    'faq.a4':
      'Ja. Du exportierst deine Historie als CSV und deine Programme als CAR-Datei. Der Import liest Strong, Hevy, JEFIT, FitNotes und Boostcamp.',
    'faq.q5': 'Funktioniert es ohne Empfang?',
    'faq.a5':
      'Ja. Keine Funktion braucht eine Verbindung. Training, Analyse und Export laufen offline.',
    'faq.q6': 'Was macht die Bluesky-Verbindung?',
    'faq.a6':
      'Sie ist optional und zeigt deinen Bluesky-Feed im Profil. Du meldest dich mit einem App-Passwort an; deine Trainingsdaten bleiben davon getrennt.',

    'download.title': 'Overload ist in Entwicklung.',
    'download.lead':
      'Android und die Web-Version laufen, die iOS-Fassung ist gebaut und ungeprüft. Store-Releases gibt es noch nicht. Den Entwicklungsstand findest du auf GitHub.',
    'download.cta': 'Auf GitHub ansehen',
    'download.note': 'Diese Seite setzt keine Cookies und lädt kein Tracking. Nur die Schriften kommen von Google Fonts.',

    'footer.tag': 'Kraftsport-Tracker',
    'footer.license': 'MIT-Lizenz',
    'footer.repo': 'Quellcode',
    'footer.oauth': 'Die Bluesky-Anmeldung nutzt einen auf GitHub Pages registrierten OAuth-Client.',
    'footer.visit': 'Repository ansehen',
  },

  en: {
    'meta.title': 'Overload · More weight. Every week.',
    'meta.description':
      'Overload is the workout tracker for strength training. Offline-first, no account, with real progression: linear, double progression, AMRAP, RPE and RIR. All data stays on your device.',
    skip: 'Skip to content',

    'nav.principle': 'Principle',
    'nav.features': 'Features',
    'nav.analysis': 'Analysis',
    'nav.privacy': 'Privacy',
    'nav.download': 'Download',
    'nav.menuLabel': 'Open menu',
    'nav.themeLabel': 'Toggle appearance',
    'nav.langLabel': 'Switch language',

    'hero.kicker': 'Offline-first · No account',
    'hero.title1': 'More weight.',
    'hero.title2': 'Every week.',
    'hero.lead':
      'Overload is the strength tracker that raises the load by rule. You log the set, Overload works out next week. No account, no cloud, nothing between your sets.',
    'hero.ctaPrimary': 'How it works',
    'hero.ctaSecondary': 'Project on GitHub',
    'hero.trust1': 'Offline',
    'hero.trust2': 'No account',
    'hero.trust3': 'Everything on device',

    'marquee.1': 'Progressive Overload',
    'marquee.2': 'Offline-first',
    'marquee.3': 'Strength training',
    'marquee.4': 'New records',
    'marquee.5': 'No bloat',
    'marquee.6': 'Your data',

    'principle.label': 'The principle',
    'principle.title': 'Scrolling loads the bar.',
    'principle.lead':
      'Progressive overload means a little more than last week. Overload turns that into a rule instead of a feeling and works out the load for every session.',
    'principle.barLabel': 'Barbell that loads as you scroll',
    'principle.unit': 'kg',
    'principle.msg0': 'Empty bar · 20 kg',
    'principle.msg1': 'Two 25s go on',
    'principle.msg2': 'Two more 25s',
    'principle.msg3': 'Two 20s follow',
    'principle.msg4': 'Two 15s go on',
    'principle.msg5': 'Two 10s go on',
    'principle.msg6': 'Fully loaded · new best',

    'demo.label': 'Live demo',
    'demo.title': 'Work out your bar.',
    'demo.lead':
      'Set the weight and Overload spreads it across the plates. The demo uses the same colour code as the app and works in kilograms or pounds.',
    'demo.screenLabel': 'Load barbell',
    'demo.screenOffline': 'Offline',
    'demo.unitKg': 'kg',
    'demo.unitLb': 'lbs',
    'demo.unitLabel': 'Switch unit',
    'demo.minus': 'Decrease weight',
    'demo.plus': 'Increase weight',
    'demo.weightLabel': 'Weight in kilograms or pounds',
    'demo.note': 'Per side {perSide} · plates: {count}',
    'demo.noteRest': 'Not loadable: {rest} per side',
    'demo.caption': 'Plate calculator with the app IPF colour code.',

    'prog.label': 'Progression engine',
    'prog.title': 'What happens next week.',
    'prog.lead':
      'A met target raises the training max. A miss climbs the scheme ladder, and miss the last scheme and the training max resets. Click through it.',
    'prog.week': 'Week',
    'prog.tm': 'Training max',
    'prog.scheme': 'Scheme',
    'prog.work': 'Working weight',
    'prog.success': 'Goal met',
    'prog.fail': 'Goal missed',
    'prog.reset': 'Reset',
    'prog.eventIncrease': 'Target met. Training max plus {inc}.',
    'prog.eventStep': 'Target missed. Next scheme: {label}.',
    'prog.eventReset': 'Last scheme missed. Training max down 10%, back to 5×3.',
    'prog.eventStart': 'Starting at a training max of {tm}.',
    'prog.caption': 'Simplified GZCL progression, the same logic the app uses.',

    'features.label': 'Features',
    'features.title': 'No bloat. Just training.',
    'features.lead':
      'Overload drops everything that stands between you and the set under the bar. What stays works without a signal.',

    'feat.programs.tag': 'Programs',
    'feat.programs.title': 'Proven plans, your own builder',
    'feat.programs.text':
      'GZCLP, nSuns and PPL come ready to go. Or build your own: exercise slots, supersets, deload weeks and a cover for your library.',
    'feat.progression.tag': 'Progression',
    'feat.progression.title': 'The load rises by rule',
    'feat.progression.text':
      'Linear, double progression, AMRAP, RPE, RIR, percentage or cycle. You set the rule, Overload works out the next working weight and keeps a fail policy with training-max reset.',
    'feat.logger.tag': 'Logger',
    'feat.logger.title': 'Targets are already there',
    'feat.logger.text':
      'Pre-filled sets, one tap confirms. Supersets stay grouped, the rest timer counts your break and notifies you even when the app is in the background. The last T1 set is AMRAP.',
    'feat.records.tag': 'Records',
    'feat.records.title': 'The PR moment happens in the set',
    'feat.records.text':
      'Overload spots a record the moment you confirm the set, with haptics and a short flash. Your first logged result is a baseline and is not celebrated.',
    'feat.analysis.tag': 'Analysis',
    'feat.analysis.title': 'Volume, balance, trend',
    'feat.analysis.text':
      'Volume per muscle, a weekly push:pull balance and a balance trend across weeks. Plus a weekly report that writes its suggestion straight into your plan.',
    'feat.portability.tag': 'Import & export',
    'feat.portability.title': 'Your history stays yours',
    'feat.portability.text':
      'Bring your workouts over from Strong, Hevy, JEFIT, FitNotes or Boostcamp. Share your own programs as a CAR file, every block checked against its hash.',
    'feat.bluesky.tag': 'Bluesky',
    'feat.bluesky.title': 'Share, if you want to',
    'feat.bluesky.text':
      'Optionally connect your Bluesky profile with an app password. Feed, likes and replies show up in your profile. Connecting is voluntary and never touches your training data.',
    'feat.adapt.tag': 'Adaptation',
    'feat.adapt.title': 'Your device, your units',
    'feat.adapt.text':
      'Kilograms or pounds, metres or feet: all just display settings. Light or dark, German or English, and you set the text size yourself.',

    'plates.label': 'The plate system',
    'plates.title': 'Colour code like on the platform.',
    'plates.lead':
      'Every weight has its colour, from the 25 down to the small 2.5. In the app the code marks buttons, bars and best lifts.',
    'plates.p25': '25 kg',
    'plates.p25sub': '55 lb · Red',
    'plates.p20': '20 kg',
    'plates.p20sub': '45 lb · Blue',
    'plates.p15': '15 kg',
    'plates.p15sub': '35 lb · Yellow',
    'plates.p10': '10 kg',
    'plates.p10sub': '25 lb · Green',
    'plates.p5': '5 kg',
    'plates.p5sub': '10 lb · White',
    'plates.p2': '2.5 kg',
    'plates.p2sub': '5 lb · Black',

    'analysis.label': 'Analysis',
    'analysis.title': 'Volume, balance and trend.',
    'analysis.lead':
      'After every session Overload counts completion points per muscle, compares push and pull and follows the trend across weeks. The weekly report writes its suggestion straight into your plan.',
    'analysis.point1': 'Volume per muscle, from your logs.',
    'analysis.point2': 'Push:pull balance every week.',
    'analysis.point3': 'Balance trend across several weeks.',
    'analysis.point4': 'Weekly report with a suggestion you can apply.',
    'analysis.reportLabel': 'Weekly report',
    'analysis.reportNote': 'Example: Overload counts the week’s sets and suggests the next increase.',

    'privacy.label': 'Why offline-first',
    'privacy.title': 'Your gym has no signal. Fine.',
    'privacy.lead':
      'Overload runs entirely on the device. No sign-in, no sync queue, no server reading along. Even in a basement with no signal.',
    'privacy.item1': 'No account, no email, no password.',
    'privacy.item2': 'Training data never leaves the device.',
    'privacy.item3': 'Import and export in both directions, any time.',
    'privacy.item4': 'Bluesky stays optional and separate from training.',
    'privacy.stat1': 'accounts required',
    'privacy.stat2': 'stored locally',
    'privacy.stat3': 'directions for import and export',

    'balance.label': 'Push : Pull',
    'balance.push': 'Push',
    'balance.pull': 'Pull',
    'balance.note':
      'Overload derives the balance from your logs and shows the trend over weeks. Shown here with sample data.',
    'balance.example': 'Sample data',

    'nogo.label': 'What Overload deliberately does not do',
    'nogo.title': 'No account. No paywall on the basics.',
    'nogo.lead':
      'Other trackers lock the core behind a subscription. Overload keeps logging, programs and export open.',
    'nogo.item1': 'No account, no forced onboarding.',
    'nogo.item2': 'No subscription for logging, programs and export.',
    'nogo.item3': 'No tracking, no ad IDs, no analytics.',
    'nogo.item4': 'No cloud requirement, no forced sync.',

    'faq.label': 'Questions',
    'faq.title': 'Short answers.',
    'faq.q1': 'Is Overload free?',
    'faq.a1':
      'Yes. Logging, programs, analysis and export are meant to be free. A price would only come for network features like sync, not for the basics.',
    'faq.q2': 'Where does my data go?',
    'faq.a2':
      'Nowhere. Overload stores everything locally in a database on your device. For training, the app makes no network request.',
    'faq.q3': 'Is Overload available for iOS?',
    'faq.a3':
      'Android and the web version run. The iOS build exists but has not been checked on an Apple device, so we name no date.',
    'faq.q4': 'Can I take my data with me?',
    'faq.a4':
      'Yes. You export your history as CSV and your programs as a CAR file. The import reads Strong, Hevy, JEFIT, FitNotes and Boostcamp.',
    'faq.q5': 'Does it work without a signal?',
    'faq.a5':
      'Yes. No feature needs a connection. Training, analysis and export all run offline.',
    'faq.q6': 'What does the Bluesky connection do?',
    'faq.a6':
      'It is optional and shows your Bluesky feed in your profile. You sign in with an app password, and your training data stays separate from it.',

    'download.title': 'Overload is in development.',
    'download.lead':
      'Android and the web version run, the iOS build exists and is unchecked. There are no store releases yet. You can follow the state of things on GitHub.',
    'download.cta': 'View on GitHub',
    'download.note': 'This page sets no cookies and loads no tracking. Only the fonts come from Google Fonts.',

    'footer.tag': 'Strength tracker',
    'footer.license': 'MIT License',
    'footer.repo': 'Source code',
    'footer.oauth': 'Bluesky sign-in uses an OAuth client registered on GitHub Pages.',
    'footer.visit': 'View the repository',
  },
};
