/**
 * i18n-Laufzeit. Die aktive Sprache kommt aus (in dieser Reihenfolge):
 * gespeicherte Wahl, `?lang=`, Browsersprache, Fallback Deutsch.
 *
 * Jeder Wert fällt auf die deutsche Fassung zurück, fehlt auch die, bleibt der
 * Schlüssel stehen. So bleibt die Seite nie halb übersetzt.
 */

import { LANGS, content } from './content.js';

const STORAGE_KEY = 'overload-lang';
const DEFAULT_LANG = 'de';

let current = DEFAULT_LANG;

/** Bringt `de-DE`, `en_US` usw. auf `de` oder `en`, sonst null. */
function normalize(lang) {
  if (typeof lang !== 'string' || lang.length === 0) return null;
  const base = lang.toLowerCase().replace('_', '-').split('-')[0];
  return LANGS.includes(base) ? base : null;
}

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* Speicher gesperrt: die Wahl gilt dann nur für diese Sitzung. */
  }
}

function resolveInitialLang() {
  return (
    normalize(new URLSearchParams(window.location.search).get('lang')) ??
    normalize(readStored()) ??
    normalize(navigator.language) ??
    normalize(navigator.languages && navigator.languages[0]) ??
    DEFAULT_LANG
  );
}

function lookup(key) {
  const table = content[current];
  if (table && Object.prototype.hasOwnProperty.call(table, key)) return table[key];
  const fallback = content[DEFAULT_LANG][key];
  return fallback !== undefined ? fallback : key;
}

function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

/** Übersetzter Text zu einem Schlüssel, mit `{name}`-Platzhaltern. */
export function t(key, vars) {
  return interpolate(lookup(key), vars);
}

/** Aktive Sprache. */
export function getLang() {
  return current;
}

/** Schreibt die aktive Sprache in das Dokument. Idempotent. */
export function apply() {
  const root = document.documentElement;
  root.lang = current;

  document.title = t('meta.title');
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', t('meta.description'));

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', t('meta.title'));
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', t('meta.description'));

  const structured = document.querySelector('script[type="application/ld+json"]');
  if (structured) {
    try {
      const data = JSON.parse(structured.textContent);
      data.description = t('meta.description');
      structured.textContent = JSON.stringify(data);
    } catch {
      /* Ungültiges JSON-LD bleibt unangetastet. */
    }
  }

  for (const el of document.querySelectorAll('[data-i18n]')) {
    el.textContent = t(el.dataset.i18n);
  }

  for (const el of document.querySelectorAll('[data-i18n-attr]')) {
    for (const pair of el.dataset.i18nAttr.split(',')) {
      const [attr, key] = pair.split(':').map((part) => part.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    }
  }

  for (const btn of document.querySelectorAll('[data-lang-option]')) {
    btn.setAttribute('aria-pressed', String(btn.dataset.langOption === current));
  }
}

/** Wechselt die Sprache, speichert sie und aktualisiert die Seite. */
export function setLang(next) {
  current = normalize(next) ?? DEFAULT_LANG;
  store(current);

  const url = new URL(window.location.href);
  url.searchParams.set('lang', current);
  window.history.replaceState(null, '', url);

  apply();
  document.dispatchEvent(new CustomEvent('overload:lang', { detail: { lang: current } }));
}

/** Startet die i18n-Laufzeit und verdrahtet den Sprachumschalter. */
export function initI18n() {
  current = resolveInitialLang();
  apply();

  for (const btn of document.querySelectorAll('[data-lang-option]')) {
    btn.addEventListener('click', () => setLang(btn.dataset.langOption));
  }
}
