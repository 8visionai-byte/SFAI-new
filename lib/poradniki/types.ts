/**
 * TYP `Poradnik` — kontrakt treści JEDNEGO poradnika evergreen. Klon `Post`
 * (lib/blog/types.ts), ale z własnym, węższym enumem kategorii tematycznych.
 *
 * DLACZEGO OSOBNY REJESTR (a nie reużycie `lib/blog`):
 *  - Poradniki są evergreen i pod money queries (ile kosztuje, co automatyzować).
 *    Blog to opinie i eseje. Inny ton, inna lista, inny breadcrumb
 *    (Centrum Wiedzy -> Poradniki vs Blog). Osobny rejestr = zero rozjazdu.
 *  - Treść (`tresc[]`, `faq[]`) reużywa tych samych BLOKÓW co blog, więc render
 *    składamy z gotowych komponentów components/blog (PostBody, PostFAQ) — bez
 *    duplikacji silnika treści. Importujemy typy `Blok`/`PostFaq` z lib/blog.
 *
 * ŻELAZNE ZASADY (north star + CLAUDE.md), identyczne jak w blogu:
 *  - KPI #1 = cytowalność LLM: lead + sekcje są w HTML przy 1. żądaniu (SSG).
 *  - Answer-first: `lead` to 2–4 zdania samowystarczalnej odpowiedzi (cytat).
 *  - Nagłówki sekcji jak pytania; tabele i konkretne liczby mile widziane.
 *  - ZERO zmyślania: każdy renderowany string musi być PRAWDZIWY. Brak realnej
 *    danej (np. konkretnych widełek kwotowych) = zdanie napisane tak, by było
 *    prawdziwe bez niej. Zero widocznych [PLACEHOLDER], zero zmyślonych liczb.
 *  - Bez długiego myślnika (em-dash). Krótkie, ludzkie zdania, głos marki.
 *
 * Każdy poradnik linkuje krzyżowo: do powiązanej USŁUGI i NARZĘDZIA (pola
 * `powiazaneUslugi`, `powiazaneNarzedzia`), żeby zamknąć ścieżkę do konwersji.
 */

import type { Blok, PostFaq } from '@/lib/blog/types';

/** Reeksport bloków treści — jedno źródło prawdy (lib/blog/types). */
export type { Blok, PostFaq } from '@/lib/blog/types';

/**
 * Kategoria tematyczna poradnika — Badge na karcie i w hero. Zamknięty, węższy
 * zbiór niż blogowa `Kategoria`: poradniki grupujemy po INTENCJI money query.
 * Rozszerzać świadomie (każda wartość = widoczna etykieta i potencjalny filtr).
 */
export type KategoriaPoradnika =
  | 'Koszty i wycena'
  | 'Automatyzacja'
  | 'Branże';

/**
 * Link krzyżowy poradnika -> usługa/narzędzie. `href` to ścieżka wewnętrzna
 * (np. '/uslugi/chatboty' albo '/narzedzia#kalkulator-oszczednosci'). MUSI
 * wskazywać realną, istniejącą trasę/anchor (zero martwych linków).
 */
export type LinkKrzyzowy = {
  /** Etykieta linku widoczna dla użytkownika (głos Pawła, konkret). */
  etykieta: string;
  /** Ścieżka wewnętrzna lub anchor. Realna trasa 200 OK. */
  href: string;
  /** Krótki opis (1 zdanie), po co tam klikać. */
  opis: string;
};

/**
 * `Poradnik` — pełna treść jednego poradnika. Pola 1:1 z `Post` plus pola
 * krzyżowych linków do oferty (to różnicuje poradnik od wpisu bloga).
 */
export type Poradnik = {
  /**
   * Segment URL (bez "/poradniki/"). Małe litery, myślniki, bez polskich znaków,
   * bez końcowego slasha. MUSI = klucz w rejestrze (index.ts) i 1:1 z trasą.
   */
  slug: string;

  /** Tytuł = H1 = primary money query. Pełne, ludzkie pytanie/fraza. */
  tytul: string;

  /**
   * Lead answer-first: 2–4 zdania samowystarczalnej odpowiedzi tuż pod H1.
   * „Kapsuła do cytowania" dla GPT/Claude/Gemini/Perplexity. Używana też jako
   * zajawka na karcie listy i jako `description` w Article JSON-LD.
   */
  lead: string;

  /** <title> bez sufiksu marki (layout dokłada " · SimpleFast.ai"). 50–60 zn. */
  metaTitle: string;
  /** <meta description> 140–160 zn.: konkret + liczba/czas, zero hedgingu. */
  metaDescription: string;

  /** ISO data publikacji (YYYY-MM-DD). = Article.datePublished i sitemap lastmod. */
  data: string;
  /**
   * ISO data ostatniej REALNEJ aktualizacji treści (YYYY-MM-DD). = Article.dateModified.
   * Dla nowego poradnika = `data`. NIE `new Date()` przy buildzie (fałszywa świeżość).
   */
  dataAktualizacji: string;

  /** Kategoria tematyczna (Badge na karcie i w hero). */
  kategoria: KategoriaPoradnika;

  /** Tagi long-tail (do powiązań/treści). Pierwszy bywa = motyw przewodni. */
  tagi: string[];

  /** Treść poradnika jako sekcje (bloki) — render serwerowy (cytowalny od razu). */
  tresc: Blok[];

  /** FAQ poradnika (answer-first). Gdy są: render + zasila FAQPage JSON-LD. */
  faq?: PostFaq[];

  /**
   * Money queries — frazy, pod które poradnik ma rankować/być cytowany.
   * Pierwsza = primary (zgodna z `tytul`). Do dokumentacji i pomiaru cytowalności.
   */
  queries?: string[];

  /** Linki do powiązanych USŁUG (krzyżowe linkowanie do oferty). Realne trasy. */
  powiazaneUslugi?: LinkKrzyzowy[];

  /** Linki do powiązanych NARZĘDZI (kalkulatory, testy). Realne anchory. */
  powiazaneNarzedzia?: LinkKrzyzowy[];
};
