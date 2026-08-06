/**
 * INFINITY v2 — rejestr DEKORACJI kart listingów (Partia C, podstrony).
 *
 * Kolory i emoji kategorii usług 1:1 ze spec-infinity-v2 §Dropdown (zmierzone
 * ze wzorca): chatboty #22d3ee, voiceboty #8b5cf6, automatyzacje #10b981,
 * dokumenty #f59e0b, www #22d3ee, audyt #f59e0b, opieka #10b981,
 * rekrutacja #a78bfa, rozwiazania #8b5cf6, optymalizacja #22d3ee.
 *
 * ŻELAZNA ZASADA: emoji i kolor to WYŁĄCZNIE dekoracja (kafelek .inf-tile ma
 * aria-hidden, kolor wchodzi przez custom property --tile-c/--card-c).
 * Treść i kontrast tekstu niosą tokeny semantyczne — ten rejestr NIE jest
 * treścią i nie wolno go czytać czytnikom ekranu.
 *
 * Typy treści (wpisy blog / poradniki / materiały) wg zadania Pawła:
 * 📚 poradnik, 📝 wpis (przemyślenie), 🧲 materiał (lead magnet).
 */
export type InfDekor = { c: string; emoji: string };

/** Kategorie usług (klucz = slug usługi; realizacje używają tych samych slugów). */
export const INF_KATEGORIA: Record<string, InfDekor> = {
  chatboty: { c: '#22d3ee', emoji: '💬' },
  voiceboty: { c: '#8b5cf6', emoji: '🎙️' },
  'agent-rekrutacyjny': { c: '#a78bfa', emoji: '🤝' },
  automatyzacje: { c: '#10b981', emoji: '⚡' },
  'dokumenty-faktury': { c: '#f59e0b', emoji: '📄' },
  'opieka-ai': { c: '#10b981', emoji: '🛡️' },
  'audyt-ai': { c: '#f59e0b', emoji: '🔍' },
  rozwiazania: { c: '#8b5cf6', emoji: '🧩' },
  'strony-www': { c: '#22d3ee', emoji: '🌐' },
  optymalizacja: { c: '#22d3ee', emoji: '📈' },
};

/** Fallback dla slugów spoza mapy (nowe wpisy rejestrów). */
export const INF_KATEGORIA_DEFAULT: InfDekor = { c: 'var(--accent)', emoji: '✨' };

/** Typy treści Centrum Wiedzy (karty listingów blog/poradniki/materiały). */
export const INF_TYP: Record<'poradnik' | 'wpis' | 'material', InfDekor> = {
  poradnik: { c: '#22d3ee', emoji: '📚' },
  wpis: { c: '#a78bfa', emoji: '📝' },
  material: { c: '#f59e0b', emoji: '🧲' },
};
