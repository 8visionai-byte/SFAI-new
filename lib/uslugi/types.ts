/**
 * TYP `Usluga` — kontrakt treści JEDNEJ strony usługi (spec 06 §"Schema treści
 * jednej strony usługi" + §"Mapowanie na JSON-LD"). Jedno źródło prawdy dla:
 *  - renderu szablonu 8-sekcyjnego (app/uslugi/[usluga]/page.tsx),
 *  - metadanych (buildMetadata),
 *  - JSON-LD Service + FAQPage + BreadcrumbList.
 *
 * SZABLON 8-SEKCYJNY (spec 06 §"CZĘŚĆ 2"):
 *  (1) kapsula  → (2) problem → (3) rozwiazanie → (4) tabelaPorownawcza
 *  → (5) kroki[3] → (6) ramaCeny → (7) faq[5–6] → (8) cta
 *
 * ŻELAZNE ZASADY (north star + spec 06 §"ZASADY WIĄŻĄCE"):
 *  - Każdy string może zostać zacytowany przez LLM jako fakt → musi być PRAWDZIWY.
 *  - ZERO widocznych [PLACEHOLDER] i ZERO zmyślonych liczb/cen w polach renderowanych.
 *    Brak realnej danej = zdanie napisane tak, by było prawdziwe bez niej (kieruje
 *    na bezpłatną diagnozę). Konkret czeka w bloku INPUT PAWŁA (komentarz w pliku usługi).
 *  - Bez długiego myślnika (em-dash). Krótkie zdania, głos Pawła, zero żargonu.
 *  - faq[].odpowiedz jest renderowane 1:1 jako tekst odpowiedzi w FAQPage JSON-LD.
 */

/** Pytanie + odpowiedź FAQ. `odpowiedz` trafia 1:1 do FAQPage JSON-LD i na stronę. */
export type FaqItem = {
  /** Pytanie klienta MŚP. Renderowane jako H3 / <summary> i jako Question.name. */
  pytanie: string;
  /** Answer-first, bez hedgingu, bez zmyślonej liczby. = Answer.text w JSON-LD. */
  odpowiedz: string;
};

/**
 * Jeden wiersz tabeli porównawczej (sekcja 4). Surowy HTML w renderze (cytowalne
 * przez LLM). Konwencja kolumn jak w spec 06: etykieta wiersza + stan "u nich"
 * (ręcznie/gotowe) vs "u nas" (SimpleFast.ai).
 */
export type TabelaWiersz = {
  /** Etykieta wiersza (pierwsza kolumna), np. "Dostępność", "Czas reakcji". */
  cecha: string;
  /** Kolumna porównawcza: stan bez usługi (ręcznie / narzędzie z półki). */
  bez: string;
  /** Kolumna docelowa: stan z usługą SimpleFast.ai. */
  zNami: string;
};

/** Krok procesu wdrożenia (sekcja 5). Dokładnie 3 (typ wymusza krotkę). */
export type Krok = {
  /** Tytuł kroku, np. "Diagnoza (bezpłatna)". */
  tytul: string;
  /** Opis kroku, głos Pawła, bez żargonu. */
  opis: string;
};

/**
 * CTA strony usługi. Domyślnie współdzielone z HOME_CTA (jedno główne CTA,
 * north star #3/#4): label "Pokaż mi, gdzie tracę czas", href "#diagnoza".
 * `dowod` = uczciwy sygnał oferty zamiast zmyślonej liczby (do czasu realnego
 * case'a od Pawła). NIGDY widoczny [PLACEHOLDER].
 */
export type Cta = {
  /** Tekst przycisku. Domyślnie "Pokaż mi, gdzie tracę czas". */
  label: string;
  /** Cel CTA — flow diagnozy. Domyślnie "#diagnoza". */
  href: string;
  /** Mikrokopia pod CTA (konkret + brak zobowiązań). */
  mikrokopia: string;
  /** Dowód przy CTA — uczciwy sygnał, bez atrapy liczby. */
  dowod: string;
};

/**
 * `Usluga` — pełna treść jednej strony usługi.
 *
 * Pola wymagane przez zadanie (faza 3 wypełnia treścią z 06-copy-hero-uslugi.md):
 *  slug, h1, kapsula (answer-first), metaTitle, metaDescription, problem,
 *  rozwiazanie, tabelaPorownawcza[], kroki[3], ramaCeny, faq[]{pytanie,odpowiedz},
 *  cta, queries[].
 */
export type Usluga = {
  /**
   * Segment URL (bez "/uslugi/"), np. "automatyzacje". Małe litery, myślniki,
   * bez polskich znaków, bez końcowego slasha (konwencja IA / lib/site.ts).
   * MUSI = klucz w rejestrze (lib/uslugi/index.ts) i 1:1 z trasą w ROUTES.
   */
  slug: string;

  /** Nagłówek H1 = primary money query (fraza, pod którą strona ma być cytowana). */
  h1: string;

  /**
   * Kapsuła answer-first: 40–60 słów samowystarczalnej odpowiedzi tuż pod H1.
   * Renderowana w surowym HTML = "kapsuła do cytowania" dla GPT/Claude/Gemini/Perplexity.
   * Używana też jako `description` w Service JSON-LD.
   */
  kapsula: string;

  /** <title> z marką, 50–60 zn., z primary query (sufiks " · SimpleFast.ai" dokłada layout). */
  metaTitle: string;
  /** <meta description> 140–160 zn.: konkret + liczba/czas, zero hedgingu, zero em-dash. */
  metaDescription: string;

  /** Sekcja 2 — PROBLEM językiem klienta. H2 sformułowany jak pytanie. */
  problem: {
    /** H2 jak pytanie klienta, np. "Na czym naprawdę tracisz czas każdego dnia?". */
    h2: string;
    /** Treść problemu (loss aversion, język klienta). */
    tresc: string;
  };

  /** Sekcja 3 — ROZWIĄZANIE. H2 jak pytanie. */
  rozwiazanie: {
    /** H2 jak pytanie, np. "Co dokładnie automatyzujemy?". */
    h2: string;
    /** Treść rozwiązania (co robimy, kontrola po stronie klienta). */
    tresc: string;
  };

  /**
   * Sekcja 4 — TABELA PORÓWNAWCZA (obowiązkowa, min. 1 tabela faktów).
   * `h2` = nagłówek tabeli; `naglowekBez`/`naglowekZNami` = etykiety kolumn.
   */
  tabelaPorownawcza: {
    h2: string;
    /** Nagłówek kolumny "bez usługi", np. "Ręczna robota". */
    naglowekBez: string;
    /** Nagłówek kolumny "z nami", np. "Automatyzacja od SimpleFast.ai". */
    naglowekZNami: string;
    wiersze: TabelaWiersz[];
  };

  /** Sekcja 5 — JAK TO DZIAŁA. Dokładnie 3 kroki (krotka). H2 jak pytanie. */
  kroki: {
    h2: string;
    items: [Krok, Krok, Krok];
  };

  /**
   * Sekcja 6 — RAMA CENY (value-based). H2 jak pytanie ("Ile kosztuje ...?").
   * `tresc` mówi PRAWDĘ bez kwoty (mechanika wyceny + diagnoza), dopóki Paweł
   * nie poda realnych widełek. ZERO zmyślonej liczby w `tresc`.
   * `minPrice` (opcjonalne) = realna cena "od X" → włącza `offers` w Service JSON-LD.
   * Ustawiać TYLKO gdy spójne z UI; dziś brak → undefined (bez offers).
   */
  ramaCeny: {
    h2: string;
    tresc: string;
    /** Realna cena "od X" w PLN. Tylko gdy prawdziwa i spójna z UI. Inaczej undefined. */
    minPrice?: number;
  };

  /** Sekcja 7 — FAQ (5–6 pozycji). Tekst 1:1 z FAQPage JSON-LD. */
  faq: FaqItem[];

  /** Sekcja 8 — CTA (jedno główne, personalizowane). */
  cta: Cta;

  /**
   * Money queries — frazy, pod które strona ma rankować/być cytowana.
   * Pierwsza = primary (zgodna z h1). Używane do dokumentacji i pomiaru cytowalności.
   */
  queries: string[];
};
