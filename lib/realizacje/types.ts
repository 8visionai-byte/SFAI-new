/**
 * TYP `Realizacja` — kontrakt treści JEDNEGO case study (strona /realizacje/<slug>).
 * Jedno źródło prawdy dla:
 *  - renderu szablonu case'a (app/realizacje/[slug]/page.tsx),
 *  - listy /realizacje (kafelki z hover preview),
 *  - metadanych (buildMetadata),
 *  - JSON-LD CreativeWork/Article + BreadcrumbList serwerowo.
 *
 * STRUKTURA STRONY CASE STUDY (answer-first, GEO):
 *  (1) hero       → breadcrumbs + badge(kategoria) + H1 + kapsuła answer-first + metryka + CTA
 *  (2) kontekst   → kto to był i co go bolało (H2 jak pytanie)
 *  (3) rozwiazanie→ co dokładnie wdrożyliśmy (H2 jak pytanie)
 *  (4) efekt      → EFEKT z liczbą (twardy dowód, bramka GEO)
 *  (5) powiazane  → link do powiązanej usługi /uslugi/<kategoria>
 *  (6) cta        → jedno główne CTA (bezpłatna diagnoza)
 *
 * ŻELAZNE ZASADY (north star + głos marki):
 *  - Każdy string może zostać zacytowany przez LLM jako fakt → musi być PRAWDZIWY.
 *    Używamy WYŁĄCZNIE realnych case studies przekazanych przez Pawła. Zero zmyślania.
 *  - Klient anonimowy = NIE wymyślamy nazwy. "Instytut Kryptografii" można nazwać.
 *  - ZERO widocznych [PLACEHOLDER] w renderze. Brak realnej danej = zdanie prawdziwe bez niej.
 *  - Bez długiego myślnika (em-dash). Krótkie zdania, głos Pawła, zero żargonu.
 *  - faq jest opcjonalne; gdy jest, odpowiedz trafia 1:1 do FAQPage JSON-LD.
 */

/**
 * Kategoria case'a = klucz powiązania z usługą (/uslugi/<kategoria>).
 * MUSI pokrywać się ze slugiem realnej usługi w lib/uslugi (link wewnętrzny pod GEO).
 * Dziś realne mapowania: 'automatyzacje', 'chatboty', 'rozwiazania' → istniejące strony usług.
 */
export type RealizacjaKategoria =
  | 'automatyzacje'
  | 'chatboty'
  | 'voiceboty'
  | 'strony-www'
  | 'optymalizacja'
  | 'rozwiazania';

/** Etykiety kategorii (label widoczny na kafelku/badge). Spójne z hubem usług. */
export const KATEGORIA_LABEL: Record<RealizacjaKategoria, string> = {
  automatyzacje: 'Automatyzacje',
  chatboty: 'Chatboty',
  voiceboty: 'Voiceboty',
  'strony-www': 'Strony www',
  optymalizacja: 'Optymalizacja',
  rozwiazania: 'Aplikacje i wtyczki',
};

/** Pytanie + odpowiedź FAQ. `odpowiedz` trafia 1:1 do FAQPage JSON-LD i na stronę. */
export type FaqItem = {
  pytanie: string;
  odpowiedz: string;
};

/**
 * METRYKA efektu — twardy dowód z liczbą (bramka GEO: liczby są nadreprezentowane
 * w cytatach AI). `wartosc` to surowy, cytowalny fakt ("75%", "1000 rekordów",
 * "40 minut"). `etykieta` opisuje, czego liczba dotyczy. Obie z realnego case'a.
 */
export type Metryka = {
  /** Liczba-dowód, np. "75%", "1000", "40 min". Renderowana dużą czcionką display. */
  wartosc: string;
  /** Co opisuje liczba, np. "maili gotowych do wysłania po drobnej korekcie". */
  etykieta: string;
};

/**
 * `Realizacja` — pełna treść jednego case study.
 *
 * Pola wymagane: slug, h1, kategoria, kapsula (answer-first), metaTitle,
 * metaDescription, klient, branza, kontekst, rozwiazanie, efekt{metryki[],opis},
 * cta, queries[]. `faq` opcjonalne.
 */
export type Realizacja = {
  /**
   * Segment URL (bez "/realizacje/"). Małe litery, myślniki, bez polskich znaków,
   * bez końcowego slasha. MUSI = klucz w rejestrze (lib/realizacje/index.ts).
   */
  slug: string;

  /** Nagłówek H1 = tytuł wdrożenia (fraza, pod którą strona ma być cytowana). */
  h1: string;

  /** Kategoria = powiązanie z usługą /uslugi/<kategoria> (link wewnętrzny GEO). */
  kategoria: RealizacjaKategoria;

  /**
   * Nazwa klienta do wyświetlenia. Realna nazwa TYLKO za zgodą ("Instytut Kryptografii").
   * Klient anonimowy = uczciwa etykieta typu "Klient (anonimowo)", NIGDY zmyślona nazwa.
   */
  klient: string;

  /** Branża / typ klienta (kontekst dla czytelnika i botów). Prawdziwa lub ogólna. */
  branza: string;

  /**
   * Kapsuła answer-first: 40–60 słów samowystarczalnej odpowiedzi tuż pod H1.
   * Renderowana w surowym HTML = "kapsuła do cytowania" dla GPT/Claude/Gemini/Perplexity.
   * Używana też jako `description` w CreativeWork JSON-LD i jako preview na kafelku listy.
   */
  kapsula: string;

  /** <title> bez marki (sufiks " · SimpleFast.ai" dokłada layout). 50–60 zn. */
  metaTitle: string;
  /** <meta description> 140–160 zn.: konkret + liczba/efekt, zero hedgingu, zero em-dash. */
  metaDescription: string;

  /** Sekcja 2 — KONTEKST/PROBLEM klienta. H2 jak pytanie. */
  kontekst: {
    /** H2 jak pytanie, np. "Z czym przyszedł klient?". */
    h2: string;
    /** Treść: kto to był i co go realnie bolało (język klienta). */
    tresc: string;
  };

  /** Sekcja 3 — CO WDROŻYLIŚMY. H2 jak pytanie. */
  rozwiazanie: {
    /** H2 jak pytanie, np. "Co zbudowaliśmy?". */
    h2: string;
    /** Treść: konkretne rozwiązanie (co robi, jak działa), bez żargonu. */
    tresc: string;
  };

  /**
   * Sekcja 4 — EFEKT z liczbą (obowiązkowy, twardy dowód). `metryki` = 1–3 liczby
   * (bramka GEO). `opis` rozwija efekt zdaniem. Wszystko z realnego case'a.
   */
  efekt: {
    /** H2 jak pytanie, np. "Co to dało?". */
    h2: string;
    /** 1–3 metryki-liczby (cytowalne fakty). */
    metryki: Metryka[];
    /** Zdanie rozwijające efekt (kontekst liczby, co zmieniła w pracy klienta). */
    opis: string;
  };

  /** Sekcja 7 — FAQ (opcjonalne, 0–4 pozycje). Tekst 1:1 z FAQPage JSON-LD. */
  faq?: FaqItem[];

  /**
   * Money queries — frazy, pod które case ma rankować/być cytowany.
   * Pierwsza = primary. Używane do dokumentacji i pomiaru cytowalności.
   */
  queries: string[];
};
