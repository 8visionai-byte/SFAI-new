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
import type { Blok, LinkKrzyzowy } from '@/lib/blog/types';

export type { Blok } from '@/lib/blog/types';
/* v22 (PLAN-v22 §1.5): kontrakt linku krzyżowego mieszka w korzeniu grafu
   importów treści (lib/blog/types) i jest wspólny dla poradników, wpisów,
   realizacji i materiałów. Re-eksport, żeby moduły magnetów nie musiały sięgać
   po niego przez dwa różne pakiety. */
export type { LinkKrzyzowy } from '@/lib/blog/types';

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

  /**
   * v22 (PLAN-v22 §1.6 i §3 P2 pkt 12): POWIĄZANIA MATERIAŁU.
   *
   * Pomiar linków przed rundą: materiał -> usługa 0/6. Sześć magnetów zbierało
   * ruch na długi ogon („prompty AI dla firm", „checklista automatyzacji")
   * i nie miało ani jednego wyjścia do oferty ani do poradnika, który tłumaczy
   * temat głębiej. Czytelnik kończył materiał i strona się dla niego kończyła.
   *
   * Pola zasilają ISTNIEJĄCY komponent `LinkiKrzyzowe` (ten sam, co pod
   * poradnikami i realizacjami), więc nie powstaje nowy silnik linkowania.
   * Oba opcjonalne: magnet bez powiązań renderuje się jak dotąd.
   *
   * ŻELAZNE: `href` to realna trasa z rejestru (kryterium odbioru §5.3:
   * zero martwych linków), a `etykieta` i `opis` to tekst nawigacyjny,
   * nie nowy fakt o produkcie ani nowa obietnica.
   */
  powiazaneUslugi?: LinkKrzyzowy[];
  powiazanePoradniki?: LinkKrzyzowy[];
  /**
   * v22: NARZĘDZIA, którymi czytelnik policzy to u siebie.
   *
   * To nie jest ozdoba, tylko naprawa realnej usterki: cztery materiały odsyłają
   * dziś do narzędzi GOŁYM TEKSTEM w zdaniu („w kalkulatorze oszczędności
   * w sekcji /narzedzia"), czyli podają ścieżkę, której nie da się kliknąć.
   * Zdania zostają nietknięte, a link staje się linkiem.
   */
  powiazaneNarzedzia?: LinkKrzyzowy[];
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
