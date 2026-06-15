import type { Usluga } from './types';

/**
 * USŁUGA 6 — ROZWIĄZANIA (indywidualne rozwiązania AI: aplikacje, wtyczki).
 * FAZA 3: pełna treść z 06-copy-hero-uslugi.md §"USŁUGA 6", 1:1 answer-first.
 * Każdy string prawdziwy i cytowalny przez LLM. Zero zmyślonych cen, zero em-dash.
 *
 * UWAGA SLUG: tu "rozwiazania"; IA 01 / ROUTES używa "aplikacje-i-wtyczki".
 * Decyzja ujednolicenia = INPUT PAWŁA + SEO (spec 06 §"MAPA USŁUG").
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane jako liczby):
 *  1. Cena: realne widełki „od X zł" dla typowej pierwszej (najmniejszej) wersji
 *     apki/wtyczki + model rozliczenia (etapowe vs stały zakres). Gdy realne i
 *     spójne z UI → ustawić ramaCeny.minPrice (number) → włączy offers w Service JSON-LD.
 *  2. Dowód przy CTA: realny case z liczbą z wdrożenia na zamówienie (np. „wtyczka
 *     X zdjęła Y godzin/mc") albo twarda liczba operacyjna. Do tego czasu cta.dowod
 *     stoi na uczciwym sygnale oferty (bezpłatna diagnoza), bez atrapy liczby.
 */
export const rozwiazania: Usluga = {
  slug: 'rozwiazania',
  h1: 'Indywidualne rozwiązania AI: aplikacje i wtyczki na zamówienie',
  kapsula:
    'Czasem gotowy chatbot czy automatyzacja nie wystarczą, bo Twój problem jest tylko Twój. Wtedy budujemy rozwiązanie na miarę: aplikację webową, wtyczkę do narzędzia, którego używasz, albo Agenta spiętego z kilkoma systemami naraz. Nie sprzedajemy pudełka z funkcjami. Projektujemy dokładnie to, czego potrzebuje Twój proces, i wdrażamy szybko. Zaczynamy od bezpłatnej diagnozy, na której mówimy wprost, czy warto budować od zera, czy taniej złożyć z gotowych klocków.',

  metaTitle: 'Indywidualne rozwiązania AI: aplikacje i wtyczki dla firm',
  metaDescription:
    'Budujemy aplikacje AI dla firm, wtyczki i Agentów na zamówienie, gdy gotowe narzędzia nie pasują. Zaczynamy od najmniejszej działającej wersji. Dane i kod po Twojej stronie, w UE.',

  problem: {
    h2: 'Gotowe narzędzia nie pasują do Twojego procesu?',
    tresc:
      'Twoja firma robi coś po swojemu, a gotowe narzędzia wymuszają, żebyś to po swojemu zmienił. Płacisz za abonamenty za funkcje, których nie używasz, i ręcznie sklejasz to, co powinno działać samo. Albo masz pomysł na apkę czy wtyczkę, która zdjęłaby konkretną robotę, ale nie wiesz, czy to się opłaca i od czego zacząć. Standardowe rozwiązanie nie istnieje, bo Twój przypadek jest niestandardowy.',
  },

  rozwiazanie: {
    h2: 'Co budujemy na zamówienie?',
    tresc:
      'Budujemy to, czego nie ma na półce: aplikację webową pod Twój konkretny proces, wtyczkę, która dokłada AI do narzędzia, w którym już pracujesz, albo Agenta spinającego kilka systemów w jeden ciąg. Najpierw projektujemy, jak to ma działać, potem stawiamy najmniejszą wersję, która rozwiązuje problem, i rozwijamy ją z Tobą. Bez przepłacania za funkcje, których nigdy nie użyjesz. Twoje dane i kod zostają pod Twoją kontrolą, w Unii Europejskiej.',
  },

  tabelaPorownawcza: {
    h2: 'Gotowe narzędzie a rozwiązanie na miarę',
    naglowekBez: 'Gotowe narzędzie z półki',
    naglowekZNami: 'Rozwiązanie na miarę od SimpleFast.ai',
    wiersze: [
      { cecha: 'Dopasowanie', bez: 'Ty dopasowujesz się do niego', zNami: 'Ono dopasowane do Twojego procesu' },
      { cecha: 'Funkcje', bez: 'Płacisz też za te zbędne', zNami: 'Tylko to, czego naprawdę używasz' },
      { cecha: 'Integracje', bez: 'Co się da, resztę ręcznie', zNami: 'Spięte z Twoimi systemami' },
      { cecha: 'Koszt w czasie', bez: 'Abonament bez końca', zNami: 'Wdrożenie + opieka pod Twój zakres' },
      { cecha: 'Własność', bez: 'Zależysz od dostawcy', zNami: 'Rozwiązanie i dane po Twojej stronie' },
      { cecha: 'Zmiany', bez: 'Czekasz, aż dostawca doda', zNami: 'Rozwijamy pod Twoje potrzeby' },
    ],
  },

  kroki: {
    h2: 'Jak powstaje rozwiązanie na zamówienie krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Rozkładamy Twój problem na części. Mówimy wprost, czy warto budować od zera, czy taniej złożyć z gotowych klocków, i ile to mniej więcej zajmie.',
      },
      {
        tytul: 'Najmniejsza działająca wersja',
        opis:
          'Stawiamy pierwszą wersję, która realnie rozwiązuje problem, a nie wszystko naraz. Testujesz na żywo, my poprawiamy. Szybko widzisz, czy to działa.',
      },
      {
        tytul: 'Rozwój i opieka',
        opis:
          'Dokładamy funkcje, których faktycznie potrzebujesz, w kolejności od najważniejszych. Pilnujemy, żeby działało. Ty decydujesz o tempie.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje indywidualne rozwiązanie AI?',
    tresc:
      'Rozwiązanie na miarę wyceniamy indywidualnie, bo każde jest inne, ale nie zostawiamy Cię z „to zależy”. Na bezpłatnej diagnozie rozkładamy projekt na etapy i podajemy widełki dla pierwszej, najmniejszej działającej wersji, zanim cokolwiek zamówisz. Zaczynamy od małego zakresu, żeby koszt i ryzyko były policzalne, a nie z sufitu. Bez ukrytych kosztów i bez płacenia za funkcje na zapas.',
    // minPrice: undefined — brak realnych widełek od Pawła. Po ustaleniu wpisać
    // number → kwota „od X zł" pojawi się w UI i w offers Service JSON-LD spójnie.
  },

  faq: [
    {
      pytanie: 'Czym jest indywidualne rozwiązanie AI?',
      odpowiedz:
        'To aplikacja, wtyczka albo Agent budowane pod Twój konkretny proces, a nie kupowane z półki. Powstaje wtedy, gdy gotowe narzędzia nie pasują albo zmuszają do płacenia za zbędne funkcje. Projektujemy dokładnie to, czego potrzebujesz, i zaczynamy od najmniejszej wersji, która rozwiązuje problem.',
    },
    {
      pytanie: 'Kiedy opłaca się budować na zamówienie, a kiedy lepiej wziąć gotowe?',
      odpowiedz:
        'Gotowe wygrywa, gdy Twój proces jest typowy i narzędzie z półki go obsłuży. Na miarę opłaca się, gdy robisz coś po swojemu, sklejasz kilka systemów ręcznie albo płacisz abonamenty za funkcje, których nie używasz. Na bezpłatnej diagnozie mówimy wprost, która droga jest dla Ciebie tańsza.',
    },
    {
      pytanie: 'Czy będę właścicielem tego, co zbudujecie?',
      odpowiedz:
        'Tak. Rozwiązanie i dane zostają po Twojej stronie, w Unii Europejskiej. Nie chcemy Cię uwiązać do siebie. Ustalamy to na piśmie na początku, żeby nie było niejasności, kto jest właścicielem kodu i danych.',
    },
    {
      pytanie: 'Co, jeśli nie wiem, czego dokładnie potrzebuję?',
      odpowiedz:
        'To normalne i właśnie po to jest diagnoza. Przychodzisz z problemem, nie z gotową specyfikacją. My rozkładamy go na części i proponujemy najprostsze rozwiązanie, które działa. Nie musisz znać się na technologii, żeby zacząć rozmowę.',
    },
    {
      pytanie: 'Ile trwa zbudowanie apki albo wtyczki?',
      odpowiedz:
        'Zależy od zakresu, ale celowo zaczynamy od najmniejszej działającej wersji, żeby szybko zobaczyć efekt, a nie budować miesiącami w ciemno. Prostsza wtyczka powstaje znacznie szybciej niż rozbudowana aplikacja. Realny termin podajemy na diagnozie, gdy znamy zakres.',
    },
    {
      pytanie: 'Czy moje dane będą bezpieczne?',
      odpowiedz:
        'Tak. Dane zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Rozwiązanie budujemy z zabezpieczeniami od początku, klucze i dostępy trzymamy po stronie serwera, nie w przeglądarce. Bezpieczeństwo to część projektu, nie późniejsza łatka.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Opowiedz mi swój problem. Powiem wprost, czy warto budować na miarę, czy taniej inaczej. Bez zobowiązań.',
    dowod:
      'Każdy projekt zaczynamy od bezpłatnej diagnozy. Najpierw rozkładamy problem na części, potem decyzja.',
  },

  queries: [
    'indywidualne rozwiązania AI',
    'wtyczki AI',
    'aplikacje AI dla firm',
    'aplikacja webowa na zamówienie',
    'wtyczka AI do CRM',
  ],
};
