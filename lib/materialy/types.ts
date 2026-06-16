/**
 * TYPY LEAD MAGNETÓW (Centrum Wiedzy AI — dział /materialy).
 *
 * `Material` = jeden lead magnet. Wzorzec 1:1 z `Post` (lib/blog/types.ts):
 * jeden obiekt = jedna strona, rejestr (index.ts) napędza trasę SSG, sitemap i hub.
 * Różnica wobec `Post`: magnet to MATERIAŁ DO POBRANIA, więc dochodzą pola
 * `typPliku` (etykieta na karcie i przycisku) oraz `ctaPobierz` (label przycisku
 * STUB pobrania). Reszta to ten sam rygor treści co blog.
 *
 * ŻELAZNE ZASADY (north star + brief Pawła):
 *  - KPI #1 = cytowalność LLM: PEŁNA treść magnetu jest w HTML przy 1. żądaniu (SSG),
 *    czytasz ją w całości na stronie. PDF to bonus, nie bramka.
 *  - Answer-first: `opis` to 2–3 zdania samowystarczalnej odpowiedzi (cytat dla AI).
 *  - Nagłówki sekcji jak pytania/problemy; konkretne prompty/listy mile widziane.
 *  - ZERO zmyślania: każdy renderowany string jest PRAWDZIWY i użyteczny. Magnet to
 *    realna treść (prompty, checklisty), nie zajawka.
 *  - Bez długiego myślnika (em-dash). Krótkie, ludzkie zdania, głos marki.
 *
 * Bloki treści (`tresc[]`) reużywają `Blok` z lib/blog/types.ts — ten sam render
 * (PostBody-podobny) zamienia je na semantyczny HTML serwerowo.
 */
import type { Blok } from '@/lib/blog/types';

export type { Blok } from '@/lib/blog/types';

/**
 * Typ pliku materiału — etykieta na karcie huba i na przycisku pobrania.
 * Zamknięty zbiór trzyma spójność (zero literówek-rozjazdów). Wartość mówi
 * użytkownikowi, czego się spodziewać (PDF do druku vs interaktywny arkusz).
 */
export type TypPliku = 'PDF' | 'arkusz' | 'checklista';

/** Pytanie + odpowiedź FAQ magnetu. `odpowiedz` trafia 1:1 na stronę i do FAQPage. */
export type MaterialFaq = {
  /** Pytanie czytelnika. Renderowane jako <summary>. */
  pytanie: string;
  /** Answer-first, bez hedgingu, bez zmyślonej liczby. */
  odpowiedz: string;
};

/**
 * `Material` — pełna treść jednego lead magnetu.
 *
 * Pola wspólne z `Post`: slug, tytul, opis(=lead), meta, daty, tresc[], faq[], queries[].
 * Pola własne magnetu: kategoria-etykieta (`etykieta`), `typPliku`, `ctaPobierz`.
 */
export type Material = {
  /**
   * Segment URL (bez "/materialy/"). Małe litery, myślniki, bez polskich znaków,
   * bez końcowego slasha. MUSI = klucz w rejestrze (index.ts) i 1:1 z trasą.
   */
  slug: string;

  /** Tytuł = H1 = primary money query. Keyword-rich + rozwiązuje problem klienta. */
  tytul: string;

  /**
   * Opis answer-first: 2–3 zdania samowystarczalnej odpowiedzi tuż pod H1.
   * To „kapsuła do cytowania" dla AI. Używany też jako zajawka na karcie huba
   * i jako `description` w Article JSON-LD.
   */
  opis: string;

  /**
   * Zachęta na karcie huba (1 zdanie, problem -> rozwiązanie). Krótsza i bardziej
   * sprzedażowa niż `opis`. Renderowana pod tytułem kafelka.
   */
  zacheta: string;

  /** Mikro-etykieta nad tytułem (np. "Prompty", "Poradnik"). */
  etykieta: string;

  /** Typ pliku (etykieta na karcie i na przycisku pobrania). */
  typPliku: TypPliku;

  /** Label przycisku pobrania (STUB). Np. „Pobierz 50 promptów (PDF)". */
  ctaPobierz: string;

  /** <title> bez sufiksu marki (layout dokłada " · SimpleFast.ai"). 50–60 zn. */
  metaTitle: string;
  /** <meta description> 140–160 zn.: konkret + liczba, zero hedgingu, zero em-dash. */
  metaDescription: string;

  /** ISO data publikacji (YYYY-MM-DD). = Article.datePublished i sitemap lastmod. */
  data: string;
  /**
   * ISO data ostatniej REALNEJ aktualizacji treści (YYYY-MM-DD). = Article.dateModified.
   * Dla nowego materiału = `data`. NIE ustawiać na `new Date()` przy buildzie.
   */
  dataAktualizacji: string;

  /**
   * Pełna treść magnetu jako sekcje (bloki). Renderowana w całości w HTML (KPI #1).
   * To jest „cały materiał na stronie" — realna wartość, nie zajawka.
   */
  tresc: Blok[];

  /** Opcjonalne FAQ magnetu (answer-first). Gdy są, render + mogą zasilić FAQPage. */
  faq?: MaterialFaq[];

  /**
   * Money queries — frazy, pod które materiał ma być cytowany/rankować.
   * Pierwsza = primary (zgodna z `tytul`). Do dokumentacji i pomiaru cytowalności.
   */
  queries?: string[];
};

/**
 * Pozycja „wkrótce" — magnet zaplanowany, ale BEZ trasy (brak pełnego `Material`).
 * Renderowana na hubie /materialy jako zapowiedź (nieklikalna), żeby pokazać plan
 * i złapać long-tail, zanim powstanie pełna treść. Zero martwych linków.
 */
export type MaterialWkrotce = {
  /** Roboczy tytuł materiału (keyword-rich). */
  tytul: string;
  /** Etykieta (dla spójnej etykiety na liście). */
  etykieta: string;
  /** Typ pliku (do etykiety na karcie zapowiedzi). */
  typPliku: TypPliku;
};
