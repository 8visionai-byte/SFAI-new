/**
 * TYP `Post` — kontrakt treści JEDNEGO wpisu bloga. Jedno źródło prawdy dla:
 *  - renderu artykułu (app/blog/[slug]/page.tsx),
 *  - metadanych (buildMetadata),
 *  - JSON-LD Article + BreadcrumbList,
 *  - karty na liście /blog.
 *
 * WZORZEC = jak `Usluga` (lib/uslugi/types.ts): jeden obiekt = jedna strona,
 * rejestr (index.ts) napędza trasę SSG, sitemap i nawigację. Trzymamy ten sam
 * rygor treści.
 *
 * ŻELAZNE ZASADY (north star + CLAUDE.md):
 *  - KPI #1 = cytowalność LLM: lead + sekcje są w HTML przy 1. żądaniu (SSG).
 *  - Answer-first: `lead` to 2–3 zdania samowystarczalnej odpowiedzi (cytat).
 *  - Nagłówki sekcji jak pytania; tabele i konkretne liczby mile widziane.
 *  - ZERO zmyślania: każdy renderowany string musi być PRAWDZIWY. Brak realnej
 *    danej = zdanie napisane tak, by było prawdziwe bez niej. Zero widocznych
 *    [PLACEHOLDER], zero zmyślonych liczb/cen/opinii.
 *  - Bez długiego myślnika (em-dash). Krótkie, ludzkie zdania, głos marki.
 *
 * FAZA 4 (treść): wypełnia `tresc[]` (sekcje) i ewentualnie `faq[]`. Pola
 * meta/daty/queries są już ustawione w stubie. Silnik (ten typ + trasa +
 * komponenty) jest gotowy i się kompiluje bez treści.
 */

/**
 * Kategoria wpisu — etykieta renderowana jako Badge na karcie i w hero artykułu.
 * Zamknięty zbiór trzyma spójność filtrów/etykiet (zero literówek-rozjazdów).
 * Rozszerzać świadomie (każda nowa kategoria = etykieta widoczna dla użytkownika).
 */
export type Kategoria =
  | 'Koszty i wycena'
  | 'Chatboty i Agenci'
  | 'Voiceboty'
  | 'Prawo i AI Act'
  | 'Automatyzacja'
  | 'Ludzie i praca'
  | 'SEO i GEO'
  | 'Bezpieczeństwo danych';

/**
 * Blok treści artykułu. Faza 4 składa `tresc` z tych bloków w kolejności.
 * Każdy wariant renderuje się serwerowo (w HTML od razu = cytowalny przez LLM).
 *
 *  - 'akapit'   : zwykły akapit (`tekst`).
 *  - 'naglowek' : H2 sekcji, najlepiej sformułowany JAK PYTANIE (answer-first/GEO).
 *  - 'lista'    : lista wypunktowana (`punkty[]`).
 *  - 'tabela'   : tabela faktów (nadreprezentowana w cytatach AI). `naglowki` =
 *                 wiersz nagłówkowy, `wiersze[]` = komórki. Renderowana jako
 *                 prawdziwa <table> (scope), scroll poziomy na mobile.
 *  - 'cytat'    : wyróżniony cytat/teza (`tekst`, opcjonalnie `zrodlo`).
 */
export type Blok =
  | { typ: 'naglowek'; tekst: string }
  | { typ: 'akapit'; tekst: string }
  | { typ: 'lista'; punkty: string[] }
  | { typ: 'tabela'; naglowki: string[]; wiersze: string[][] }
  | { typ: 'cytat'; tekst: string; zrodlo?: string };

/** Pytanie + odpowiedź FAQ wpisu. `odpowiedz` trafia 1:1 na stronę (i może wejść do FAQPage). */
export type PostFaq = {
  /** Pytanie czytelnika. Renderowane jako <summary>. */
  pytanie: string;
  /** Answer-first, bez hedgingu, bez zmyślonej liczby. */
  odpowiedz: string;
};

/**
 * `Post` — pełna treść jednego wpisu bloga.
 *
 * Pola z zadania: slug, tytul, lead, data, kategoria, tagi, tresc(sekcje).
 * Dodane dla SEO/GEO i spójności z `Usluga`: metaTitle, metaDescription,
 * dataAktualizacji, opcjonalne faq[] i queries[].
 */
export type Post = {
  /**
   * Segment URL (bez "/blog/"). Małe litery, myślniki, bez polskich znaków,
   * bez końcowego slasha. MUSI = klucz w rejestrze (index.ts) i 1:1 z trasą.
   */
  slug: string;

  /** Tytuł wpisu = H1 = primary long-tail query. Pełne, ludzkie pytanie. */
  tytul: string;

  /**
   * Lead answer-first: 2–3 zdania samowystarczalnej odpowiedzi tuż pod H1.
   * To „kapsuła do cytowania" dla GPT/Claude/Gemini/Perplexity. Używany też
   * jako zajawka na karcie listy i jako `description` w Article JSON-LD.
   */
  lead: string;

  /** <title> bez sufiksu marki (layout dokłada " · SimpleFast.ai"). 50–60 zn. */
  metaTitle: string;
  /** <meta description> 140–160 zn.: konkret + liczba/czas, zero hedgingu, zero em-dash. */
  metaDescription: string;

  /** ISO data publikacji (YYYY-MM-DD). = Article.datePublished i sitemap lastmod. */
  data: string;
  /**
   * ISO data ostatniej REALNEJ aktualizacji treści (YYYY-MM-DD). Renderowana jako
   * „Ostatnia aktualizacja" i = Article.dateModified. Dla nowego wpisu = `data`.
   * NIE ustawiać na `new Date()` przy buildzie (fałszywa świeżość traci wartość GEO).
   */
  dataAktualizacji: string;

  /** Kategoria (Badge na karcie i w hero). */
  kategoria: Kategoria;

  /** Tagi long-tail (do powiązań/treści). Pierwszy bywa = motyw przewodni. */
  tagi: string[];

  /**
   * Treść artykułu jako sekcje (bloki). Faza 4 wypełnia. W stubie zwykle 1
   * blok-zapowiedź, by strona była prawdziwa i się renderowała przed treścią.
   */
  tresc: Blok[];

  /** Opcjonalne FAQ wpisu (answer-first). Gdy są, render + mogą zasilić FAQPage. */
  faq?: PostFaq[];

  /**
   * Money queries — frazy, pod które wpis ma być cytowany/rankować.
   * Pierwsza = primary (zgodna z `tytul`). Do dokumentacji i pomiaru cytowalności.
   */
  queries?: string[];
};

/**
 * Pozycja „wkrótce" — temat zaplanowany, ale BEZ trasy (brak pełnego `Post`).
 * Renderowana na liście /blog jako zapowiedź (nieklikalna), żeby pokazać plan
 * redakcyjny i złapać long-tail, zanim powstanie pełny wpis. Zero martwych linków.
 */
export type PostWkrotce = {
  /** Roboczy tytuł tematu (pełne, ludzkie pytanie/fraza long-tail). */
  tytul: string;
  /** Kategoria (dla spójnej etykiety na liście). */
  kategoria: Kategoria;
};
