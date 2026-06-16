/**
 * TYP `RadarNews` — kontrakt JEDNEGO wpisu AI Radar. Jedno źródło prawdy dla:
 *  - renderu wpisu (app/ai-radar/[slug]/page.tsx),
 *  - metadanych (buildMetadata),
 *  - JSON-LD Article + BreadcrumbList,
 *  - karty na liście /ai-radar.
 *
 * WZORZEC = jak `Post` (lib/blog/types.ts): jeden obiekt = jedna strona, rejestr
 * (index.ts) napędza trasę SSG, sitemap i nawigację. Różnica: AI Radar ma STAŁY
 * FORMAT newsa (6 sekcji w ustalonej kolejności), więc treść nie jest dowolną
 * tablicą bloków, tylko nazwanymi polami. To wymusza spójny układ każdego wpisu:
 * HOOK -> co się stało -> czemu ważne -> nasz filtr -> co zrobić -> CTA.
 *
 * ŻELAZNE ZASADY (north star + brief Pawła):
 *  - KPI #1 = cytowalność LLM: cała treść jest w HTML przy 1. żądaniu (SSG).
 *  - Answer-first: każda sekcja odpowiada od razu, bez rozgrzewki.
 *  - Nagłówki sekcji jak pytania (renderuje je komponent, nie autor).
 *  - ZERO ZMYŚLANIA: nie wymyślamy realnych newsów, dat, nazw modeli ani firm.
 *    Wpisy startowe to SZABLONY formatu (`szablon: true`) z widocznym disclaimerem.
 *    Realne newsy doda redakcja (Paweł / Make) później.
 *  - Bez długiego myślnika (em-dash). Krótkie, ludzkie zdania, głos marki.
 *  - Każdy wpis MUSI linkować do poradnika (`powiazanyPoradnik`) — krzyżowe
 *    linkowanie wewnętrzne to wymóg z briefu (news -> poradnik obowiązkowo).
 */

/**
 * Źródło newsa — link do oryginału (komunikat dostawcy, dokument UE, artykuł).
 * Dla wpisów-szablonów `zrodla` jest puste (nie podpinamy fałszywych źródeł).
 * Realne wpisy dodają tu prawdziwe, działające URL-e.
 */
export type RadarZrodlo = {
  /** Etykieta źródła widoczna dla czytelnika (np. nazwa wydawcy / dokumentu). */
  etykieta: string;
  /** Pełny, działający URL źródła. Tylko realne linki (zero fikcyjnych domen). */
  url: string;
};

/**
 * `RadarNews` — pełna treść jednego wpisu AI Radar wg stałego formatu.
 *
 * Pola treści (hook, coSieStalo, czemuWazne, naszFiltr, coMozeFirma) odwzorowują
 * 5 merytorycznych sekcji formatu. Szósta sekcja (CTA -> #diagnoza + link do
 * poradnika) jest STAŁA i składa ją komponent z `powiazanyPoradnik`, więc autor
 * wpisu jej nie przepisuje (spójność CTA w całym serwisie).
 */
export type RadarNews = {
  /**
   * Segment URL (bez "/ai-radar/"). Małe litery, myślniki, bez polskich znaków,
   * bez końcowego slasha. MUSI = klucz w rejestrze (index.ts) i 1:1 z trasą.
   */
  slug: string;

  /** Tytuł wpisu = H1 = primary long-tail query. Pełne, ludzkie pytanie/teza. */
  tytul: string;

  /** <title> bez sufiksu marki (layout dokłada " · SimpleFast.ai"). 50–60 zn. */
  metaTitle: string;
  /** <meta description> 140–160 zn.: konkret, zero hedgingu, zero em-dash. */
  metaDescription: string;

  /** ISO data publikacji (YYYY-MM-DD). = Article.datePublished i sitemap lastmod. */
  data: string;
  /**
   * ISO data ostatniej REALNEJ aktualizacji treści (YYYY-MM-DD). = Article.dateModified.
   * Dla nowego wpisu = `data`. NIE `new Date()` przy buildzie (fałszywa świeżość).
   */
  dataAktualizacji: string;

  /**
   * SEKCJA 1 — HOOK. Jedno zdanie: konflikt albo liczba. Łapie uwagę.
   * Renderowany jako wyróżniony cytat na górze wpisu. Max ~90 znaków.
   */
  hook: string;

  /**
   * SEKCJA 2 — „Co się stało?". Suche fakty, answer-first. 2–3 zdania.
   * W wpisach-szablonach zawiera jawną notkę, że nazwy/kwoty/daty wpisuje redakcja.
   */
  coSieStalo: string;

  /**
   * SEKCJA 3 — „Czemu to ważne dla Twojej firmy?". Tłumaczenie na język MŚP.
   * 2–3 zdania albo lista (gdy podana). Min. `tekst`, opcjonalnie `punkty`.
   */
  czemuWazne: { tekst: string; punkty?: string[] };

  /**
   * SEKCJA 4 — „Nasz filtr: hype czy realna zmiana?". Tu jest głos Pawła.
   * 2–4 zdania. Opinia, nie suchy fakt. Bez em-dash, krótkie zdania.
   */
  naszFiltr: string;

  /**
   * SEKCJA 5 — „Co możesz zrobić już teraz?". Lista 2–4 konkretnych kroków.
   * Każdy krok = jedno działanie, które właściciel firmy może zrobić sam.
   */
  coMozeFirma: string[];

  /**
   * Slug powiązanego PORADNIKA (lib/poradniki) albo wpisu bloga (lib/blog).
   * OBOWIĄZKOWY (brief: news -> poradnik). Renderowany w stałym bloku CTA jako
   * „Powiązany poradnik". `link` poniżej buduje pełną ścieżkę.
   */
  powiazanyPoradnik: string;

  /**
   * Pełna ścieżka do powiązanego poradnika/wpisu (np. '/blog/ai-act-a-twoja-firma-2026'
   * albo '/poradniki/...'). Trzymamy jawnie, bo poradnik może żyć w /blog (istniejący)
   * lub w /poradniki (nowy) — jeden punkt prawdy, zero zgadywania bazowej ścieżki.
   */
  link: string;

  /**
   * Czytelny tytuł powiązanego poradnika do etykiety linku „Powiązany poradnik".
   * Podajemy jawnie, gdy znamy realny tytuł docelowej strony (np. istniejący wpis
   * bloga), żeby nie pokazywać surowego slug. Gdy brak, render wylicza etykietę ze slug.
   */
  linkTytul?: string;

  /**
   * Źródła newsa (linki do oryginału). Dla wpisów-szablonów = [] (zero fałszywych
   * źródeł). Realne wpisy podają tu prawdziwe URL-e dostawcy / dokumentu.
   */
  zrodla: RadarZrodlo[];

  /**
   * Money queries — frazy, pod które wpis ma rankować/być cytowany. Pierwsza =
   * primary. Dla szablonów opisują WZORZEC pod „news AI dla firm + [temat]".
   */
  queries?: string[];

  /**
   * FLAGA SZABLONU. `true` = to nie jest realny news, tylko przykład formatu.
   * Render dokłada widoczny badge i disclaimer, a metadane dostają noindex
   * (nie chcemy, by szablon rankował jako twierdzenie o realnym wydarzeniu).
   * ZERO ZMYŚLANIA: dopóki wpis nie ma realnej treści, zostaje `true`.
   */
  szablon?: boolean;
};
