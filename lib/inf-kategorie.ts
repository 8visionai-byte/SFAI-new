/**
 * INFINITY v3 — rejestr DEKORACJI kart i dropdownów (single source ikon/kolorów).
 *
 * v3 (spec-infinity-v3 §NAWIGACJA): emoji ZASTĄPIONE unikalnymi ikonami SVG
 * z components/ui/InfIcons.tsx — pole `ikona` = nazwa glifu. Pola `emoji`
 * ZOSTAJĄ RÓWNOLEGLE (deprecated) dla konsumentów partii C (karty listingów
 * blog/poradniki/materialy/produkty/realizacje + huby app/*) do czasu ich
 * przejścia na <InfIcon>; partia A (nawigacja) używa już wyłącznie `ikona`.
 *
 * Kolory kategorii 1:1 ze spec-infinity-v2 §Dropdown (zmierzone ze wzorca):
 * chatboty #22d3ee, voiceboty #8b5cf6, automatyzacje #10b981,
 * dokumenty #f59e0b, www #22d3ee, audyt #f59e0b, opieka #10b981,
 * rekrutacja #a78bfa, rozwiazania #8b5cf6, optymalizacja #22d3ee.
 *
 * ŻELAZNA ZASADA: ikona i kolor to WYŁĄCZNIE dekoracja (kafelek .inf-tile ma
 * aria-hidden, kolor wchodzi przez custom property --tile-c/--card-c).
 * Treść i kontrast tekstu niosą tokeny semantyczne — ten rejestr NIE jest
 * treścią i nie wolno go czytać czytnikom ekranu.
 *
 * UNIKALNOŚĆ (spec v3): w obrębie JEDNEGO dropdownu/siatki żadne dwie pozycje
 * nie dzielą glifu — stąd osobne mapy per rejestr (usługi / produkty /
 * narzędzia / realizacje / działy wiedzy).
 */
import type { InfIconName } from '@/components/ui/InfIcons';

export type InfDekor = {
  /** Kolor kategorii (wchodzi w --tile-c/--card-c). */
  c: string;
  /**
   * v4 (spec §PARTIA A pkt 5): JAŚNIEJSZY odcień koloru — fluorescencyjna
   * paleta kart: cyan #67e8f9, violet #a78bfa, magenta #f472b6, green
   * #4ade80, amber #fbbf24, blue #60a5fa. Konsument (partia C) podaje go
   * w --card-c-l (mono podtytuł .inf-card-sub) i różnicuje nim karty
   * w JEDNYM gridzie. Opcjonalny w TYPIE (lokalne mapy partii C w app/
   * jeszcze go nie mają), ale WYPEŁNIONY w każdej mapie tego rejestru.
   */
  odcien?: string;
  /** @deprecated v3: emoji tylko dla starych konsumentów (partia C) — nowa dekoracja to `ikona` + <InfIcon>. */
  emoji: string;
  /** Nazwa glifu z components/ui/InfIcons.tsx (unikalna per pozycja w obrębie dropdownu/siatki). */
  ikona?: InfIconName;
};

/** Dekoracja z ikoną wymaganą — nowe mapy v3 (bez pola emoji); odcień jak w InfDekor. */
export type InfIkonaDekor = { c: string; odcien?: string; ikona: InfIconName };

/** Kategorie usług (klucz = slug usługi; realizacje używają tych samych slugów).
 * Odcienie v4: mapowanie bazowy -> jasny (cyan->#67e8f9, violet->#a78bfa,
 * green->#4ade80, amber->#fbbf24) + rozróżnienie DUBLI w jednym gridzie
 * paletą spec: strony-www dostają blue #60a5fa (trzeci cyjan w mapie),
 * agent-rekrutacyjny (baza to już jasny violet) idzie w magentę #f472b6. */
export const INF_KATEGORIA: Record<string, InfDekor> = {
  chatboty: { c: '#22d3ee', odcien: '#67e8f9', emoji: '💬', ikona: 'chat-dymek' },
  voiceboty: { c: '#8b5cf6', odcien: '#a78bfa', emoji: '🎙️', ikona: 'sluchawka-fala' },
  'agent-rekrutacyjny': { c: '#a78bfa', odcien: '#f472b6', emoji: '🤝', ikona: 'osoba-check' },
  automatyzacje: { c: '#10b981', odcien: '#4ade80', emoji: '⚡', ikona: 'blyskawica' },
  'dokumenty-faktury': { c: '#f59e0b', odcien: '#fbbf24', emoji: '📄', ikona: 'dokument-skan' },
  'opieka-ai': { c: '#10b981', odcien: '#4ade80', emoji: '🛡️', ikona: 'tarcza-serce' },
  'audyt-ai': { c: '#f59e0b', odcien: '#fbbf24', emoji: '🔍', ikona: 'lupa-wykres' },
  rozwiazania: { c: '#8b5cf6', odcien: '#a78bfa', emoji: '🧩', ikona: 'puzzle' },
  'strony-www': { c: '#22d3ee', odcien: '#60a5fa', emoji: '🌐', ikona: 'glob-siatka' },
  optymalizacja: { c: '#22d3ee', odcien: '#67e8f9', emoji: '📈', ikona: 'wykres-strzalka' },
};

/** Fallback dla slugów spoza map (nowe wpisy rejestrów). */
export const INF_KATEGORIA_DEFAULT: Required<InfDekor> = {
  c: 'var(--accent)',
  odcien: 'var(--accent-hover)', // #67e8f9 — jasny cyjan spójny z paletą odcieni
  emoji: '✨',
  ikona: 'iskry',
};

/** Typy treści Centrum Wiedzy (karty listingów blog/poradniki/materiały). */
export const INF_TYP: Record<'poradnik' | 'wpis' | 'material', InfDekor> = {
  poradnik: { c: '#22d3ee', odcien: '#67e8f9', emoji: '📚', ikona: 'ksiazka' },
  wpis: { c: '#a78bfa', odcien: '#f472b6', emoji: '📝', ikona: 'notes-pioro' },
  material: { c: '#f59e0b', odcien: '#fbbf24', emoji: '🧲', ikona: 'magnes' },
};

/**
 * Produkty (klucz = slug z lib/produkty) — dropdown "Produkty" + karty.
 * Glify unikalne w obrębie mapy; kolory z palety kategorii.
 */
export const INF_PRODUKT: Record<string, InfIkonaDekor> = {
  'skaner-faktur-ksef': { c: '#f59e0b', odcien: '#fbbf24', ikona: 'dokument-skan' },
  'app-coachingowa-z-agentami': { c: '#a78bfa', odcien: '#f472b6', ikona: 'gwiazda-kompas' },
  'apka-obecnosci-skladek': { c: '#10b981', odcien: '#4ade80', ikona: 'kalendarz-check' },
  'centrum-dowodzenia': { c: '#22d3ee', odcien: '#67e8f9', ikona: 'radar' },
};

/**
 * Narzędzia (klucz = slug z lib/narzedzia) — dropdown "Narzędzia" + hub.
 */
export const INF_NARZEDZIE: Record<string, InfIkonaDekor> = {
  // Odcienie v4: 5 narzędzi = 5 RÓŻNYCH tonów (grid teasera na home,
  // partia C) — pełne pokrycie palety bez dubli.
  'kalkulator-oszczednosci': { c: '#22d3ee', odcien: '#67e8f9', ikona: 'kalkulator' },
  'kalkulator-procesu': { c: '#10b981', odcien: '#4ade80', ikona: 'wykres-strzalka' },
  'test-gotowosci-ai': { c: '#8b5cf6', odcien: '#a78bfa', ikona: 'gwiazda-kompas' },
  'audyt-strony-ai': { c: '#f59e0b', odcien: '#fbbf24', ikona: 'lupa-wykres' },
  'generator-promptow': { c: '#a78bfa', odcien: '#f472b6', ikona: 'iskry' },
};

/**
 * Realizacje (klucz = slug z lib/realizacje) — TYLKO glif (unikalny per case
 * w dropdownie "Realizacje"); kolor bierze się z kategorii case'a
 * (INF_KATEGORIA[r.kategoria].c), żeby nie dublować palety.
 */
export const INF_REALIZACJA_IKONA: Record<string, InfIconName> = {
  'auto-email-bok': 'chat-dymek',
  'lead-generator': 'magnes',
  'auto-podsumowania-spotkan': 'kalendarz-check',
  'automat-tresci-social': 'notes-pioro',
  'automatyczne-raporty': 'wykres-strzalka',
  'chatbot-edukacyjny-kursy': 'ksiazka',
  'agenci-ai-24-7': 'robot',
  'transkrypcja-rozmow': 'mikrofon-fale',
};

/**
 * Działy Centrum Wiedzy (dropdown "Wiedza": Blog / Poradniki / Materiały /
 * AI Radar). Kolory spójne z dekorem huba /wiedza (poradniki cyjan,
 * ai-radar violet, blog/przemyślenia #a78bfa, materiały amber jak INF_TYP).
 */
export const INF_WIEDZA: Record<'blog' | 'poradniki' | 'materialy' | 'ai-radar', InfIkonaDekor> = {
  blog: { c: '#a78bfa', odcien: '#f472b6', ikona: 'notes-pioro' },
  poradniki: { c: '#22d3ee', odcien: '#67e8f9', ikona: 'ksiazka' },
  materialy: { c: '#f59e0b', odcien: '#fbbf24', ikona: 'magnes' },
  'ai-radar': { c: '#8b5cf6', odcien: '#a78bfa', ikona: 'radar' },
};
