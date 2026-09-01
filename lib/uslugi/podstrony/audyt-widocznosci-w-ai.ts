import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 1 — AUDYT WIDOCZNOŚCI W AI
 * (`/uslugi/optymalizacja/audyt-widocznosci-w-ai`).
 * Fraza primary: „audyt widoczności w AI" (pakiet `.seo-przeglad/pakiety/geo.md`
 * §P1, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja`):
 *  - RODZIC sprzedaje CAŁY proces: diagnoza plus naprawa plus pomiar w rytmie.
 *  - TA STRONA sprzedaje WYŁĄCZNIE pierwszy, płatny krok i kończy się jedną
 *    decyzją: zamawiam Sprint Diagnostyczny. Jest tu więc: co sprawdzamy, jak
 *    mierzymy, co dostajesz w raporcie, ile to kosztuje i trwa, kiedy audyt
 *    nie ma sensu.
 *  - NIE MA TU I BYĆ NIE MOŻE: opisu wdrożenia i naprawy (rodzic) ani opisu
 *    powtórnego pomiaru w czasie (siostra monitoring-cytowan-w-ai).
 *    Do obu tych tematów prowadzi dziś LINK w sekcji „Powiązane" (runda
 *    2026-08-31: monitoring cytowań i dostęp botów AI są już w rejestrze),
 *    ale treść zostaje na tamtych stronach.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P1, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami),
 *  - siedem sprawdzanych punktów: pakiet §P1 sekcja 3,
 *  - metoda pomiaru (pytania zamiast fraz, czyste okno, trzy rzeczy do
 *    zanotowania, zamrożony zestaw pytań): pakiet §N7,
 *  - nazwy botów: GPTBot pobiera treści dla OpenAI, ClaudeBot dla Anthropic,
 *    PerplexityBot dla Perplexity, Google-Extended decyduje o zasilaniu modeli
 *    Gemini: pakiet §N4,
 *  - Lenart Motors (ok. 3 tygodnie od publikacji strony do wskazania firmy
 *    przez ChatGPT na pytanie o najlepszego blacharza i lakiernika premium,
 *    plus uczciwe zastrzeżenie, że to jeden zmierzony przypadek i pomiar
 *    własny): pakiet §N2 oraz `lib/realizacje`
 *    (/realizacje/strona-cytowana-przez-chatgpt),
 *  - „kiedy to nie ma sensu": pakiet §N11, pięć sytuacji przełożonych z całej
 *    usługi na sam audyt, BEZ cen stron (uwaga wdrożeniowa §6: kwoty tylko
 *    w sekcji o cenie),
 *  - cena i czas (1490 zł netto, 5 dni roboczych, raport PDF, kwota odliczana
 *    od wdrożenia): pakiet §P1 punkt 7, zgodne co do złotówki
 *    z `lib/uslugi/audyt-ai.ts` (ten sam Sprint Diagnostyczny).
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1490 zł netto, 5 dni roboczych, siedem sprawdzanych punktów, około trzy
 *  tygodnie u Lenart Motors. Wszystkie kwoty zawsze z dopiskiem netto.
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje, ilu pytań kontrolnych
 *  jest w zestawie ani ilu modeli sprawdzamy JAKO LICZBY, więc modele
 *  wymieniamy z nazwy (ChatGPT, AI Overviews i Gemini, Perplexity, Claude),
 *  a zestaw pytań opisujemy bez liczby. Zdania są napisane tak, żeby były
 *  prawdziwe bez tych liczb.
 *
 * ZAKAZANE NA TEJ STRONIE: gwarancja miejsca w odpowiedzi modelu, procenty bez
 * metody, ceny stron i wdrożeń, obietnica terminu efektu (mamy jeden zmierzony
 * przypadek, nie termin).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO),
 * a renderuje się TYMI SAMYMI komponentami co 10 stron usług i 3 podstrony
 * voicebotów. Zero nowych typów bloków, zero nowego CSS.
 */
export const audytWidocznosciWAi: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'audyt-widocznosci-w-ai',
  dataAktualizacji: '2026-08-31',

  h1: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',

  /* KAPSUŁA 1:1 Z PAKIETU §P1 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w takiej formie,
     w jakiej zostało zatwierdzone. Niesie komplet wielkości strony: co to
     jest, ile kosztuje, ile trwa, co dostajesz i co sprawdzamy. */
  kapsula:
    'Audyt widoczności w AI to płatna diagnoza, w której zadajemy modelom AI pytania Twoich klientów i sprawdzamy, czy pada w nich nazwa Twojej firmy. Kosztuje 1490 zł netto, trwa 5 dni roboczych i kończy się raportem PDF. Kwotę odliczamy w całości od ceny wdrożenia. Sprawdzamy siedem rzeczy: pytania klienta, wskazania Twojej firmy, kto jest polecany zamiast Ciebie, źródła cytowań, dostęp botów AI, dane strukturalne oraz wizytówkę i opinie.',

  /* metaTitle: pakiet §P1 dawał 22 znaki, konwencja repo (types.ts) mówi 50-60.
     2026-08-31 decyzja właściciela: trzymamy konwencję repo. Fraza główna
     zostaje NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakty z tej strony
     (cena i czas, oba stoją w kapsule i w ramie ceny). Długość 54 znaki.
     Layout dokleja sufiks marki, więc w SERP wychodzi
     „Audyt widoczności w AI: 1490 zł netto, 5 dni roboczych · SimpleFast.ai". */
  metaTitle: 'Audyt widoczności w AI: 1490 zł netto, 5 dni roboczych',
  metaDescription:
    'Audyt widoczności w AI: sprawdzamy, czy ChatGPT wymienia Twoją firmę w odpowiedzi. 1490 zł netto, 5 dni roboczych, raport PDF. Kwotę odliczamy od wdrożenia.',

  problem: {
    /* H2 1:1 z pakietu §P1 sekcja 1. */
    h2: 'Nie wiesz, czy AI w ogóle wie, że istniejesz?',
    tresc:
      'Klient pyta ChatGPT o firmę z Twojej branży i dostaje gotową odpowiedź z konkretnymi nazwami. Ty nie wiesz, czy padasz w tej odpowiedzi, na którym miejscu ani kto jest wymieniany zamiast Ciebie.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'W wynikach Google możesz sprawdzić swoją pozycję. W odpowiedzi modelu nie ma pozycji do sprawdzenia: albo Twoja nazwa pada, albo nie pada. Bez pomiaru zostaje przeczucie.',
      },
      {
        typ: 'naglowek',
        tekst: 'Czego nie wiesz, dopóki nie zapytasz modeli?',
        ikona: 'lupa-wykres',
        chip: 'GEO',
        overline: 'TRZY BIAŁE PLAMY',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Czy Twoja firma w ogóle pada',
            akapity: [
              'To pytanie zero jedynkowe i najważniejsze ze wszystkich. Dopóki nie zadasz go modelom, nie wiesz, od czego zaczynasz.',
            ],
          },
          {
            naglowek: 'Kto jest polecany zamiast Ciebie',
            akapity: [
              'Model wymienia konkretne firmy. Ta lista mówi o Twoim rynku więcej niż pozycja w wynikach wyszukiwania.',
            ],
          },
          {
            naglowek: 'Skąd model bierze odpowiedź',
            akapity: [
              'Zacytowane źródło pokazuje wprost, którą stronę trzeba poprawić najpierw. Bez tego naprawiasz na czuja.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czym audyt widoczności w AI różni się od audytu SEO?',
        akapity: [
          'Audyt SEO sprawdza, czy strona wyświetli się w wynikach wyszukiwania. Audyt widoczności w AI sprawdza, czy model wymieni Twoją firmę w gotowej odpowiedzi. To dwie różne miary i jedna nie zastępuje drugiej.',
          'Dlatego nie mierzymy tu pozycji ani fraz. Mierzymy pytania klientów i to, czy w odpowiedzi pada Twoja nazwa. Punkt po punkcie pokazuje to tabela niżej.',
        ],
        wariant: 'edge',
        chip: 'GEO',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie sprawdzamy w audycie widoczności w AI?',
    tresc:
      'Sprawdzamy siedem rzeczy, zawsze w tej samej kolejności: od pytań, które zadają Twoi klienci, po wizytówkę i opinie. Zakres modeli ustalamy przed startem, bo zależy od tego, gdzie realnie szukają Twoi klienci.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Siedem punktów audytu widoczności w AI',
        ikona: 'radar',
        chip: 'AUDYT',
        overline: 'ZAWSZE TEN SAM ZESTAW',
      },
      {
        typ: 'kroki',
        wariant: 'plytka',
        kroki: [
          {
            tytul: 'Pytania klienta',
            opis: 'Budujemy z Tobą listę pytań, które Twoi klienci naprawdę zadają modelom. Mają brzmieć jak zdanie z rozmowy telefonicznej, nie jak fraza z narzędzia SEO.',
          },
          {
            tytul: 'Wskazania Twojej firmy',
            opis: 'Sprawdzamy, czy w odpowiedzi pada nazwa Twojej firmy, a jeśli model wymienia kilka firm, to na którym miejscu.',
          },
          {
            tytul: 'Kto jest polecany zamiast Ciebie',
            opis: 'Zapisujemy firmy, które model wymienia w Twoim miejscu. Dostajesz gotową listę, z kim realnie konkurujesz w odpowiedziach.',
          },
          {
            tytul: 'Źródła cytowań',
            opis: 'Notujemy, jakie źródło model zacytował. To mówi wprost, którą stronę trzeba poprawić najpierw.',
          },
          {
            tytul: 'Dostęp botów AI',
            opis: 'Czytamy Twój plik robots.txt i sprawdzamy, czy mają wstęp GPTBot (pobiera treści dla OpenAI), ClaudeBot (dla Anthropic), PerplexityBot oraz Google-Extended, który decyduje o zasilaniu modeli Gemini.',
          },
          {
            tytul: 'Dane strukturalne',
            opis: 'Sprawdzamy, czy strona mówi maszynie wprost, co jest firmą, co usługą, a co opinią. Bez tego model zgaduje, a zgadywanie kończy się nieprawdą o Twojej firmie.',
          },
          {
            tytul: 'Wizytówka i opinie',
            opis: 'Porównujemy nazwę, adres i opis firmy w wizytówce z tym, co stoi na stronie. Rozjazd w tych danych osłabia Cię w każdym kanale naraz.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dostajesz po audycie?',
        akapity: [
          'Wynik audytu to jeden dokument: raport PDF. Wszystko, co w nim jest, zostaje u Ciebie.',
        ],
        punkty: [
          'Pomiar zerowy: co modele odpowiadały na Twoje pytania w dniu audytu.',
          'Lista priorytetów: co naprawić najpierw, ułożone od największego wpływu.',
          'Szybkie wygrane: rzeczy do zrobienia od ręki, bez przebudowy strony.',
          'Plan wdrożenia: kolejność prac, gdy zdecydujesz się na naprawę.',
          'Lista pytań kontrolnych: zestaw, który możesz odpalać sam.',
        ],
        wariant: 'top',
        chip: 'RAPORT',
        stopka: [
          'Raport zostaje u Ciebie także wtedy, gdy nie wdrażasz z nami.',
          'Pytania kontrolne powtarzasz sam, w każdej chwili i bez naszego udziału.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co pokazał pomiar u Lenart Motors?',
        akapity: [
          'Przed publikacją nowej strony ChatGPT nie wskazywał tego warsztatu na pytanie o najlepszego blacharza i lakiernika premium. Około trzy tygodnie po publikacji zaczął go wskazywać.',
          'To nie jest gwarantowany termin, tylko jeden zmierzony przypadek: jasna specjalizacja i mała konkurencja o to jedno pytanie. To pomiar własny, a odpowiedzi modeli zmieniają się w czasie, więc liczy się seria pomiarów, a nie jeden zrzut ekranu.',
        ],
        wariant: 'edge',
        chip: 'DOWÓD',
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: cecha ~12 znaków, kolumny ~30),
     żeby wiersze nie łamały się na dwie linie na wąskich ekranach.
     Kolumna „Audyt SEO" opisuje wyłącznie to, co audyt SEO faktycznie mierzy:
     zero ocen cudzej roboty, zero zdań o konkurencji. */
  tabelaPorownawcza: {
    h2: 'Audyt SEO a audyt widoczności w AI',
    naglowekBez: 'Audyt SEO',
    naglowekZNami: 'Audyt widoczności w AI',
    wiersze: [
      {
        cecha: 'Pytanie',
        bez: 'Czy strona wyświetli się w wynikach',
        zNami: 'Czy model wymieni Twoją firmę',
      },
      {
        cecha: 'Jednostka pomiaru',
        bez: 'Fraza i pozycja',
        zNami: 'Pytanie klienta i wskazanie firmy',
      },
      {
        cecha: 'Gdzie mierzymy',
        bez: 'W wyszukiwarce',
        zNami: 'W ChatGPT, AI Overviews, Perplexity i Claude',
      },
      {
        cecha: 'Konkurencja',
        bez: 'Strony nad Tobą w wynikach',
        zNami: 'Firmy wymienione zamiast Ciebie',
      },
      {
        cecha: 'Co blokuje wynik',
        bez: 'Błędy techniczne strony',
        zNami: 'Brak wstępu botów AI i brak zdań do cytatu',
      },
      {
        cecha: 'Wynik na piśmie',
        bez: 'Lista poprawek pod wyszukiwarkę',
        zNami: 'Raport PDF z pomiarem zerowym',
      },
    ],
  },

  /* Skrót metody z pakietu §N7 (pełna metoda zostaje u rodzica). Trzy kroki,
     bo tyle wymusza kontrakt szablonu, i akurat te trzy niosą całą różnicę
     między pomiarem, który da się powtórzyć, a zrzutem ekranu. */
  kroki: {
    h2: 'Jak mierzymy widoczność w AI, krok po kroku?',
    items: [
      {
        tytul: 'Pytania zamiast fraz',
        opis: 'W Google mierzy się frazy, w modelu mierzy się pytania. Układamy z Tobą listę pytań zadanych słowami klienta, a nie hasłami z narzędzia SEO.',
      },
      {
        tytul: 'Czyste okno',
        opis: 'Pytamy w nowym oknie, bez historii rozmów i bez zalogowanego konta. Z Twojego konta model podpowiada to, co już o Tobie wie, i wynik jest nic niewart.',
      },
      {
        tytul: 'Trzy rzeczy do zanotowania',
        opis: 'Czy firma pada, na którym miejscu i jakie źródło zostało zacytowane. Zestaw pytań zamrażamy, żeby dało się powtórzyć ten sam pomiar później.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje audyt widoczności w AI?',
    tresc:
      'Audyt widoczności w AI kosztuje 1490 zł netto, trwa 5 dni roboczych i kończy się raportem PDF. Kwotę odliczamy w całości od ceny wdrożenia, gdy po audycie wchodzimy w naprawę.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1490 zł netto',
            opis: 'cena audytu, płatność jednorazowa',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '5 dni roboczych',
            opis: 'od przekazania adresu strony i listy pytań klientów',
            zrodlo: 'pytanie „Ile trwa audyt" w FAQ',
            ton: 'violet',
          },
          {
            wartosc: '7 punktów',
            opis: 'tyle sprawdzamy w każdym audycie, zawsze w tej samej kolejności',
            zrodlo: 'lista siedmiu punktów w sekcji wyżej',
            ton: 'green',
          },
          {
            wartosc: '1 raport PDF',
            opis: 'pomiar zerowy, priorytety, plan wdrożenia i pytania kontrolne',
            zrodlo: 'sekcja „Co dostajesz po audycie"',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co dzieje się z kwotą 1490 zł netto po audycie?',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'PŁATNOŚĆ JEDNORAZOWA · ODLICZANE OD WDROŻENIA',
      },
      {
        typ: 'przelacznik',
        grupa: 'audyt-widocznosci-po-audycie',
        opcje: [
          {
            numer: 'ŚCIEŻKA 1',
            tytul: 'Naprawiamy razem',
            podtytul: '1490 zł netto odliczone',
            naglowek:
              'Gdy po audycie wchodzimy w naprawę, całe 1490 zł netto schodzi z ceny wdrożenia.',
            akapity: [
              'W praktyce audyt nic Cię wtedy nie kosztuje, bo za tę samą robotę płacisz raz. Plan wdrożenia z raportu staje się kolejnością prac.',
            ],
            punkty: [
              'odliczamy całą kwotę, nie jej część',
              'odliczenie obowiązuje, gdy wdrożenie robimy my',
              'pomiar zerowy z raportu zostaje punktem odniesienia',
            ],
          },
          {
            numer: 'ŚCIEŻKA 2',
            tytul: 'Wdrażasz bez nas',
            podtytul: 'raport zostaje u Ciebie',
            naglowek: 'Nie musisz kupować u nas wdrożenia. Raport jest Twój tak czy inaczej.',
            akapity: [
              'Możesz wdrożyć go samodzielnie albo z inną firmą. Odliczenie 1490 zł netto od ceny wdrożenia obowiązuje tylko wtedy, gdy robimy je my.',
            ],
            punkty: [
              'raport PDF zostaje u Ciebie',
              'lista pytań kontrolnych do samodzielnego odpalania',
              'zero zobowiązania na dalszą współpracę',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy ten audyt nie ma sensu?',
        akapity: [
          'Wolimy stracić zlecenie niż wziąć pieniądze za pomiar, który u Ciebie niczego nie zmieni. Mówimy to przed zamówieniem, nie po.',
        ],
        punkty: [
          'Nie masz strony albo nie masz do niej dostępu: nie ma czego zmierzyć ani czym naprawić wyniku.',
          'Sprzedajesz wyłącznie z poleceń i tak chcesz zostać: widoczność w AI nie da Ci nic poza rachunkiem.',
          'Potrzebujesz efektu w tydzień: raport masz po 5 dniach roboczych, ale zmiana w odpowiedziach modeli to kwestia tygodni.',
          'Chcesz gwarancji pierwszego miejsca w ChatGPT: nikt uczciwy jej nie da, my też nie.',
          'Jesteś bardzo lokalną usługą bez wizytówki i opinii: najpierw wizytówka i opinie, bo to tańsze i szybsze.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz siebie w którymś z tych punktów? Napisz i tak.',
          'Powiemy, co zrobić zamiast, nawet jeśli to nie będzie usługa u nas.',
        ],
      },
    ],
    minPrice: 1490,
    /* 2026-08-31 (ustalenie właściciela): ta sama stała cena co u rodzica
       `audyt-ai`. Flaga wyłącza prefiks „od " na kaflu ceny w hero i podmienia
       mikrokopię pod kartą ceny na zdanie o cenie stałej. */
    cenaStala: true,
    /* Powrót do rodzica jednym zdaniem: podstrona kończy się decyzją o audycie,
       a cały proces po audycie opisuje `/uslugi/optymalizacja`. */
    linkPoradnik: {
      przed: 'Co dzieje się po audycie, czyli naprawę i pomiar w rytmie, opisaliśmy na stronie ',
      etykieta: 'pozycjonowanie pod AI',
      po: '.',
      href: '/uslugi/optymalizacja',
    },
  },

  /* KOMPLET 8 PYTAŃ 1:1 Z PAKIETU §P1 („GOTOWE FAQ"). Kolejność, pytania
     i odpowiedzi bez zmian: ten sam tekst idzie na stronę i do FAQPage JSON-LD,
     więc każda edycja tutaj rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Ile kosztuje audyt widoczności w AI?',
      odpowiedz:
        '1490 zł netto. Kwotę odliczamy w całości od ceny wdrożenia, więc jeśli po audycie wchodzimy w naprawę, płacisz za nią raz.',
    },
    {
      pytanie: 'Ile trwa audyt widoczności w AI?',
      odpowiedz:
        '5 dni roboczych od przekazania nam adresu strony i listy pytań, które zadają Twoi klienci.',
    },
    {
      pytanie: 'Czym to się różni od zwykłego audytu SEO?',
      odpowiedz:
        'Audyt SEO sprawdza, czy strona wyświetli się w wynikach wyszukiwania. Audyt widoczności w AI sprawdza, czy model wymieni Twoją firmę w gotowej odpowiedzi. To dwie różne miary.',
    },
    {
      pytanie: 'Jak sprawdzacie, czy ChatGPT poleca moją firmę?',
      odpowiedz:
        'Zadajemy stały zestaw pytań klienckich w nowym oknie, bez historii i bez zalogowanego konta. Notujemy, czy firma pada, na którym miejscu i jakie źródło zostało zacytowane.',
    },
    {
      pytanie: 'Czy dostanę raport na piśmie?',
      odpowiedz:
        'Tak, raport PDF. W środku pomiar zerowy, lista priorytetów, plan wdrożenia i lista pytań kontrolnych, którą możesz odpalać sam.',
    },
    {
      pytanie: 'Czy muszę potem kupić u was wdrożenie?',
      odpowiedz:
        'Nie. Raport zostaje u Ciebie i możesz wdrożyć go samodzielnie albo z inną firmą. Odliczenie 1490 zł od ceny wdrożenia obowiązuje tylko wtedy, gdy robimy je my.',
    },
    {
      pytanie: 'Które modele sprawdzacie?',
      odpowiedz:
        'ChatGPT, Google AI Overviews i Gemini, Perplexity oraz Claude. Zakres ustalamy przed startem, bo zależy od tego, gdzie realnie szukają Twoi klienci.',
    },
    {
      pytanie: 'Co jeśli okaże się, że wszystko jest w porządku?',
      odpowiedz:
        'Wtedy dostajesz to na piśmie i nie sprzedajemy Ci naprawy, której nie potrzebujesz. Zdarza się, zwłaszcza przy firmach z mocną wizytówką i dużą liczbą opinii.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P1 punkt 12): zamawiam Sprint
     Diagnostyczny. Mikrokopia powtarza komplet warunków, bo to ostatnie zdanie
     przed kliknięciem. */
  cta: {
    label: 'Zamów Sprint Diagnostyczny',
    href: '#diagnoza',
    mikrokopia:
      'Audyt widoczności w AI: 1490 zł netto, 5 dni roboczych, raport PDF. Kwotę odliczamy w całości od ceny wdrożenia, gdy po audycie wchodzimy w naprawę.',
    dowod:
      'Raport zostaje u Ciebie także wtedy, gdy nie wdrażasz z nami. Najpierw pomiar, potem decyzja.',
  },

  queries: [
    'audyt widoczności w AI',
    'czy ChatGPT poleca moją firmę',
    'sprawdzenie widoczności firmy w ChatGPT',
    'audyt widoczności w AI cena',
    'audyt GEO',
    'jak sprawdzić, czy AI poleca moją firmę',
  ],

  /* POWIĄZANIA (pakiet §P1 sekcja 10 plus uwaga wdrożeniowa §3: każda podstrona
     linkuje z powrotem do rodzica). RUNDA 2026-08-31: komplet trzech celów
     z konspektu stoi na miejscu. Powtórny pomiar (monitoring-cytowan-w-ai)
     i dostęp botów AI (dostep-botow-ai) były odłożone, dopóki tamte trasy nie
     istniały; dziś obie są w rejestrze podstron, więc linki są dopisane.
     Etykieta = h1 strony docelowej, opis = fakt, który stoi na tamtej stronie,
     bez kwot (uwaga wdrożeniowa §6: kwoty wyłącznie w sekcji ceny). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Cały proces po audycie: naprawa strony, autorytet poza nią i pomiar cytowań co tydzień w czterech silnikach AI.',
      },
      {
        etykieta: 'Monitoring cytowań w AI: powtarzalny pomiar, czy modele Cię polecają',
        href: '/uslugi/optymalizacja/monitoring-cytowan-w-ai',
        opis: 'Co dalej po pomiarze zerowym: ten sam zamrożony zestaw pytań powtarzany w czasie. Jeden pomiar to zdjęcie, dopiero seria pokazuje trend.',
      },
      {
        etykieta: 'GPTBot, ClaudeBot, PerplexityBot: czy Twoja strona ich wpuszcza?',
        href: '/uslugi/optymalizacja/dostep-botow-ai',
        opis: 'Piąty punkt audytu rozpisany osobno: cztery nazwy do sprawdzenia w robots.txt i co tracisz w każdym wariancie decyzji.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis: 'Lenart Motors: około trzy tygodnie od wrzucenia strony do sieci do wskazania firmy przez ChatGPT.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis: 'Dziesięć pytań o Twojej stronie pokazuje, czy ChatGPT i Perplexity mogą ją cytować, i co naprawić najpierw.',
      },
    ],
  },
};
