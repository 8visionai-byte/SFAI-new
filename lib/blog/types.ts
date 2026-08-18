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
 *
 * v22 (PLAN-v22 §1.1-§1.4): cztery istniejące warianty dostają POLA
 * OPCJONALNE. Żadne nie jest wymagane, więc rejestry sprzed v22 renderują się
 * bit w bit tak samo — nowe pola to wyłącznie miejsce na informację, którą
 * dziś strona i tak niesie, ale w formie ściany tekstu.
 */
export type Blok =
  | { typ: 'naglowek'; tekst: string }
  | { typ: 'akapit'; tekst: string }
  | { typ: 'lista'; punkty: string[] }
  | {
      typ: 'tabela';
      naglowki: string[];
      wiersze: string[][];
      wKarcie?: boolean;
      /**
       * v22 (PLAN-v22 §1.4): WIDOCZNY podpis tabeli, renderowany jako
       * <caption> wewnątrz <table>. Chwyt wzorca /vitalis §3.3 (cztery
       * prawdziwe <table> z nazwanymi sekcjami).
       * ZYSK BOTOWY, NIE DEKORACJA: <caption> to natywne, semantyczne
       * powiązanie nazwy z tabelą — czytnik ekranu ogłasza je przy wejściu
       * w tabelę, a bot dostaje zdanie mówiące, CZEGO tabela dotyczy.
       * Gdy podpis jest, staje się też `aria-label` regionu ze scrollem
       * (zamiast dzisiejszego stringa sklejanego z nagłówków kolumn).
       * TREŚĆ: opis tabeli, która już stoi na stronie. Zero nowych faktów.
       */
      podpis?: string;
    }
  | { typ: 'cytat'; tekst: string; zrodlo?: string }
  | {
      /**
       * SEKCJA W KARCIE — nagłówek + akapity + opcjonalna lista w jednej
       * `.inf-card` z tonem strony (v21). Powód: poradniki renderowały się
       * jako ciąg akapitów pod nagłówkami, czyli „ściana tekstu" (skarga
       * Pawła 2026-08-18), gdy home i strony usług podają tę samą treść
       * w kartach z kolorem, kątownikami i hoverem.
       * SEMANTYKA BEZ ZMIAN: nagłówek to nadal <h2>, akapity to <p>, lista
       * to <ul><li> — bot czyta identycznie jak dotąd, zmienia się wyłącznie
       * opakowanie (kontrola v21 mierzy progi czytelności).
       */
      typ: 'sekcja';
      naglowek: string;
      akapity: string[];
      punkty?: string[];
      /** Wariant ramki (v13): domyślnie 'top' (górna linia w kolorze). */
      wariant?: 'top' | 'edge' | 'quiet';
      /**
       * v22 (PLAN-v22 §1.3, chwyt wzorca /void §4.2 `.vd-neon-card`, nazwana
       * w pomiarach „najbogatszą kartą wzorca"): CHIP KATEGORII nad nagłówkiem,
       * mono, w kolorze karty. Zasada wzorca brzmi „kolor niesie chip, nagłówek
       * zostaje biały", więc H2 nie zmienia koloru ani wagi.
       * TREŚĆ: istniejąca kategoria / tag / etykieta z rejestru tej strony.
       * NIGDY nowy termin, nigdy skrót wymyślony pod wygląd.
       */
      chip?: string;
      /**
       * v22: krótka META po prawej stronie chipa (np. „aktualizacja 2026-08",
       * „czas czytania 4 min", jeśli takie dane są w rejestrze). Renderowana
       * jako `.inf-tag`. Fakt musi już istnieć w danych strony.
       */
      meta?: string;
      /**
       * v22: STOPKA KARTY — separator 1px i siatka dwóch kolumn krótkich
       * punktów pod treścią. Chwyt /void: jedna karta niesie cztery warstwy
       * informacji zamiast ściany akapitów.
       * ZYSK BOTOWY: to normalne <li> w <ul>, czyli rośnie licznik pozycji
       * listy i liczba znaków w <main>. Zero treści chowanej za hoverem.
       */
      stopka?: string[];
    }
  | {
      /**
       * KAFLE LICZB — te same pudełka co kafle statystyk w hero usług
       * (`.inf-hero-stat`). Liczby WYŁĄCZNIE takie, które już stoją w treści
       * poradnika; zero nowych danych.
       */
      typ: 'kafle';
      kafle: {
        wartosc: string;
        opis: string;
        /**
         * v22 (PLAN-v22 §1.1, chwyt wzorca /freedom §5.3: trzeci wiersz kafla
         * metryki, 10px, mikro-przypis pod liczbą): SKĄD TA LICZBA.
         * MUSI odsyłać do faktu, który już stoi w treści tej strony albo
         * w rejestrze (np. „z sekcji o kosztach", „arkusz kosztów, wiersz 3").
         * Zero nowych danych, zero instytucji, których nie cytujemy.
         * Renderowany klasą `.inf-stat-chip-zrodlo` (kontrast ok. 7:1, czyli
         * LEPIEJ niż wzorcowe 50% alfy).
         */
        zrodlo?: string;
      }[];
    }
  | {
      /**
       * KROKI NUMEROWANE — lista pozycji z numerem w płytce, wzorzec
       * `KrokiJakToDziala` ze stron usług. Renderowana jako <ol><li>,
       * żeby kolejność była czytelna także dla bota.
       */
      typ: 'kroki';
      /**
       * v22 (PLAN-v22 §1.2): SPOSÓB PREZENTACJI kroków. Semantyka identyczna
       * we wszystkich trzech (dalej <ol><li>), zmienia się wyłącznie forma
       * numeru i układ wiersza.
       *  - 'plytka' (DOMYŚLNY, stan v21): kwadratowa płytka `.inf-tile`
       *    z numerem. Domyślny świadomie: cztery poradniki wyglądają po v22
       *    tak samo jak przed nią, więc zero regresji bez zmiany danych.
       *  - 'kolo': ten sam numer w KÓŁKU (chwyt /freedom §5.3, krok bootu:
       *    ramka i radius 50%). Jedyna różnica w CSS to geometria.
       *  - 'os': OŚ PIONOWA. Kropka statusu `.inf-status-dot` + tytuł + opis
       *    + strzałka w dół jako dekoracja aria-hidden (chwyt /axiom §2.2
       *    i /vitalis sec-pipeline). Linia łącząca jest UDAWANA strzałką,
       *    nie pseudoelementem, czyli zero nowego CSS.
       */
      wariant?: 'plytka' | 'kolo' | 'os';
      kroki: {
        tytul: string;
        opis?: string;
        /**
         * v22: krótka META wiersza (czas etapu, nazwa pliku, etykieta etapu).
         * Chwyt /void: mono meta przy chipie kategorii. Renderowana jako
         * `.inf-tag`. WYŁĄCZNIE dane, które już są w rejestrze albo w treści.
         */
        meta?: string;
      }[];
    };

/**
 * LINK KRZYŻOWY treść -> oferta / narzędzie / inna treść.
 *
 * v22 (PLAN-v22 §1.5): typ mieszka TU, bo `lib/blog/types.ts` jest korzeniem
 * grafu importów treści (lib/poradniki i lib/materialy już z niego importują
 * `Blok`). `lib/poradniki/types.ts` ma dziś własną, IDENTYCZNĄ STRUKTURALNIE
 * definicję pod tą samą nazwą, więc oba typy są wzajemnie przypisywalne i
 * żaden istniejący import nie pęka. Docelowo poradniki re-eksportują ten typ
 * jednym wierszem (`export type { LinkKrzyzowy } from '@/lib/blog/types'`) —
 * ta jedna linia została dla partii, która jest właścicielem lib/poradniki.
 *
 * `href` MUSI wskazywać realną, istniejącą trasę albo anchor (zero martwych
 * linków — kryterium odbioru §5.3 planu).
 */
export type LinkKrzyzowy = {
  /** Etykieta linku widoczna dla użytkownika (głos marki, konkret). */
  etykieta: string;
  /** Ścieżka wewnętrzna lub anchor. Realna trasa 200 OK. */
  href: string;
  /** Krótki opis (1 zdanie), po co tam klikać. */
  opis: string;
};

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

  /**
   * v22 (PLAN-v22 §1.6, pomiar linków §1.2): POWIĄZANIA WPISU.
   * Diagnoza przed rundą: pięć wpisów bloga to ślepe zaułki, zero linków
   * wychodzących z treści do oferty, narzędzi i realizacji. Te cztery pola
   * zasilają istniejący komponent `LinkiKrzyzowe` (poradniki mają go od
   * dawna), więc nie powstaje żaden nowy silnik linkowania.
   * Wszystkie opcjonalne: wpis bez powiązań renderuje się jak dotąd.
   */
  powiazaneUslugi?: LinkKrzyzowy[];
  powiazaneNarzedzia?: LinkKrzyzowy[];
  powiazanePoradniki?: LinkKrzyzowy[];
  powiazaneRealizacje?: LinkKrzyzowy[];
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
