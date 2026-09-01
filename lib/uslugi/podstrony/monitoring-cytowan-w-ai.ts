import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 2 — MONITORING CYTOWAŃ W AI
 * (`/uslugi/optymalizacja/monitoring-cytowan-w-ai`).
 * Fraza primary: „monitoring cytowań w AI" (pakiet `.seo-przeglad/pakiety/geo.md`
 * §P5, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja` i siostry `audyt-widocznosci-w-ai`):
 *  - RODZIC sprzedaje CAŁY proces: diagnoza plus naprawa plus pomiar w rytmie.
 *  - SIOSTRA (audyt widoczności w AI) sprzedaje JEDEN pomiar: punkt zerowy.
 *  - TA STRONA sprzedaje SERIĘ pomiarów w czasie i raport z RÓŻNICĄ między
 *    nimi. Jest tu więc: dlaczego jeden zrzut ekranu nic nie znaczy, co
 *    zapisujemy w każdym pomiarze, jak wygląda wiersz raportu, które modele
 *    obejmujemy, kto czyta raport, od czego zależy cena i kiedy powtarzalny
 *    pomiar nie jest potrzebny.
 *  - NIE MA TU I BYĆ NIE MOŻE: opisu naprawy strony (to rodzic), opisu tego,
 *    co sprawdzamy w jednorazowym audycie (to siostra), ani kwoty za
 *    monitoring (pakiet §P5, uwaga wdrożeniowa: w zatwierdzonym cenniku NIE MA
 *    pozycji za monitoring, więc żadnej kwoty bez decyzji właściciela).
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła: pakiet §P5 („GOTOWA KAPSUŁA"), przeniesiona DOSŁOWNIE,
 *  - H1 i H2 sekcji 1 („Skąd wiesz, czy zmiany na stronie cokolwiek dały?")
 *    oraz nazwa sekcji 2: pakiet §P5 punkty 1 i 2, 1:1,
 *  - pięć rzeczy, które notujemy (wskazanie firmy, miejsce w odpowiedzi,
 *    zacytowane źródło, kto jest polecany zamiast Ciebie, wydźwięk wzmianki):
 *    pakiet §P5 punkt 3,
 *  - metoda w trzech krokach (pytania klienta zamiast fraz, czyste okno, ten
 *    sam zamrożony zestaw): pakiet §P5 punkt 4,
 *  - kolumny tabeli raportu (pytanie, wskazanie tak/nie, pozycja, źródło,
 *    zmiana wobec poprzedniego pomiaru): pakiet §P5 punkt 5. Wiersze są
 *    OPISOWE i tak podpisane, bo pakiet zakazuje wymyślonych procentów,
 *  - lista modeli (ChatGPT, Google AI Overviews i Gemini, Perplexity, Claude):
 *    pakiet §P5 punkt 6,
 *  - wycena po Sprincie Diagnostycznym, bo cena zależy od liczby pytań
 *    i liczby modeli: pakiet §P5 punkt 8 plus uwaga wdrożeniowa pod §P5,
 *  - Sprint Diagnostyczny jako miejsce, w którym powstaje zestaw pytań, i to,
 *    że zestaw zostaje u klienta: kapsuła §P5,
 *  - „mierzymy co tydzień, ręcznie" oraz „poprawiamy to, co nie zadziałało":
 *    plik rodzica `lib/uslugi/optymalizacja.ts` (rozwiazanie i kroki),
 *  - „nikt uczciwy nie da gwarancji konkretnej pozycji w AI": plik rodzica,
 *    faq „Czy dacie gwarancję...".
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  cztery rzeczy z kapsuły, pięć rzeczy notowanych łącznie z wydźwiękiem
 *  (to policzona lista z §P5 punkt 3), jeden zamrożony zestaw pytań, jeden
 *  raport po każdym pomiarze. Częstotliwość „co tydzień" pada wyłącznie jako
 *  fakt o stałej opiece GEO z pliku rodzica, nigdy jako obietnica rytmu
 *  wpisana w tę usługę.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ceny monitoringu, nie
 *  podaje liczby pytań w zestawie, nie podaje liczby pomiarów w abonamencie
 *  ani czasu jednego pomiaru w dniach. Wszystkie zdania są napisane tak, żeby
 *  były prawdziwe bez tych liczb.
 *
 * ZAKAZANE NA TEJ STRONIE: jakakolwiek kwota (patrz uwaga wdrożeniowa §P5),
 * procenty i wykresy wzrostu bez metody, gwarancja miejsca w odpowiedzi
 * modelu, obietnica terminu efektu.
 *
 * KONTROLA 2026-08-31 (co zostało usunięte, żeby nie wróciło):
 *  - „raport, który CO MIESIĄC pokaże to samo" — rytm miesięczny nie stoi ani
 *    w pakiecie, ani u rodzica, a FAQ tej strony mówi „rytm ustalamy przy
 *    wycenie". Zostało: „za każdym razem",
 *  - „zrobisz je sam W KILKA MINUT" — czas spoza listy liczb dozwolonych
 *    wyżej. Zostało zdanie bez czasu.
 *
 * UWAGA O RENDERZE CENY (POPRAWIONE PRZEZ KONTROLĘ 2026-08-31): `minPrice`
 * zostaje undefined, więc `components/uslugi/RamaCeny.tsx` renderuje kartę bez
 * kwoty, ALE doklejone pod nią zdanie idzie bezwarunkowo w wariancie
 * widełkowym: „To widełki startowe, nie ostateczna faktura. Dokładną cenę
 * poznasz na bezpłatnej diagnozie". To GRYZIE SIĘ z tą sekcją na dwa sposoby:
 * (1) mówi o widełkach, których na karcie nie ma, (2) obiecuje dokładną cenę
 * na bezpłatnej rozmowie, a strona mówi, że wycena monitoringu idzie dopiero
 * po Sprincie Diagnostycznym. Tego NIE DA SIĘ naprawić w tym pliku (decyduje
 * komponent, a `cenaStala: true` bez kwoty byłoby nieprawdą), więc sprzeczność
 * jest zgłoszona właścicielowi jako punkt otwarty.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO),
 * a renderuje się TYMI SAMYMI komponentami co strony usług i pozostałe
 * podstrony. Zero nowych typów bloków, zero nowego CSS.
 */
export const monitoringCytowanWAi: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'monitoring-cytowan-w-ai',
  dataAktualizacji: '2026-08-31',

  /* H1 1:1 z pakietu §P5. */
  h1: 'Monitoring cytowań w AI: powtarzalny pomiar, czy modele Cię polecają',

  /* KAPSUŁA 1:1 Z PAKIETU §P5 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w formie, w jakiej
     zostało zatwierdzone. Niesie komplet: co to jest, co notujemy, po co seria
     zamiast jednego pomiaru i czyj jest zestaw pytań. */
  kapsula:
    'Monitoring cytowań w AI to powtarzanie tego samego, zamrożonego zestawu pytań klienckich i zapisywanie, jak zmieniają się odpowiedzi modeli. Za każdym razem notujemy cztery rzeczy: czy Twoja firma pada, na którym miejscu, jakie źródło zostało zacytowane i kto jest polecany zamiast Ciebie. Jeden pomiar to zdjęcie. Dopiero seria pomiarów pokazuje trend. Zestaw pytań powstaje w Sprincie Diagnostycznym i zostaje u Ciebie, więc możesz go odpalać także sam.',

  /* metaTitle: pakiet §P5 dawał 23 znaki, konwencja repo (types.ts) i decyzja
     właściciela z 2026-08-31 mówią 50-60. Fraza główna zostaje NA POCZĄTKU
     i bez zmian, wyróżnik to wyłącznie fakt z tej strony (kapsuła: „Jeden
     pomiar to zdjęcie. Dopiero seria pomiarów pokazuje trend"). Długość
     57 znaków. Layout dokleja sufiks marki. */
  metaTitle: 'Monitoring cytowań w AI: seria pomiarów, nie zrzut ekranu',
  metaDescription:
    'Monitoring cytowań w AI: powtarzamy ten sam zamrożony zestaw pytań i zapisujemy, czy Twoja firma pada, na którym miejscu i co zacytował model.',

  problem: {
    /* H2 1:1 z pakietu §P5 sekcja 1. */
    h2: 'Skąd wiesz, czy zmiany na stronie cokolwiek dały?',
    tresc:
      'Zmiany w treści widzisz od razu, bo sam je wprowadzasz. Skutku tych zmian nie widzisz wcale, dopóki nie zadasz modelom tego samego pytania drugi raz i nie porównasz odpowiedzi z poprzednią.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Bez porównania zostaje przeczucie: wydaje się, że jest lepiej. Przeczucie nie mówi, czy modele zaczęły Cię wymieniać, czy po prostu trafiłeś na inny dzień i inne sformułowanie pytania.',
      },
      {
        typ: 'naglowek',
        tekst: 'Dlaczego jeden zrzut ekranu nic nie znaczy?',
        ikona: 'lupa-wykres',
        chip: 'GEO',
        overline: 'JEDEN POMIAR TO ZDJĘCIE',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Nie masz z czym porównać',
            akapity: [
              'Pojedyncza odpowiedź nie mówi, czy jest lepiej, czy gorzej. Mówi tylko, co model odpowiedział w tej jednej chwili.',
            ],
          },
          {
            naglowek: 'Inne pytanie to inny pomiar',
            akapity: [
              'Wystarczy przestawić słowa w pytaniu i odpowiedź potrafi wskazać inne firmy. Bez zamrożonego zestawu porównujesz dwie różne rzeczy.',
            ],
          },
          {
            naglowek: 'Twoje konto podpowiada',
            akapity: [
              'W oknie z historią rozmów model wie o Tobie za dużo i chętniej wymieni Twoją firmę. Taki zrzut ekranu cieszy, ale niczego nie mierzy.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czym monitoring różni się od jednorazowego audytu?',
        akapity: [
          'Audyt widoczności w AI daje jeden pomiar: punkt zerowy, od którego zaczynasz. Monitoring bierze ten sam zestaw pytań, powtarza go, a raport pokazuje różnicę między pomiarami.',
          'Monitoring niczego na stronie nie naprawia. Mierzy skutek tego, co już zostało zrobione, i mówi, czy praca idzie w dobrą stronę.',
        ],
        wariant: 'edge',
        chip: 'GEO',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co zapisujemy przy każdym pomiarze?',
    tresc:
      'Przy każdym pomiarze notujemy to samo: cztery rzeczy z kapsuły wyżej plus wydźwięk wzmianki, czyli w jakim świetle model mówi o Twojej firmie. Zawsze w tej samej kolejności, żeby dwa raporty dało się położyć obok siebie.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Pięć rzeczy w każdym pomiarze',
        ikona: 'radar',
        chip: 'POMIAR',
        overline: 'ZAWSZE TA SAMA KOLEJNOŚĆ',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '5 rzeczy',
            opis: 'tyle notujemy w jednym pomiarze: cztery z kapsuły plus wydźwięk wzmianki',
            zrodlo: 'lista pod tym pasem',
            ton: 'cyan',
          },
          {
            wartosc: '1 zestaw pytań',
            opis: 'ten sam w każdym kolejnym pomiarze, zamrożony po Sprincie Diagnostycznym',
            zrodlo: 'kapsuła na górze strony',
            ton: 'violet',
          },
          {
            wartosc: '0 zmian w pytaniach',
            opis: 'między pomiarami nie ruszamy ani jednego słowa, inaczej wyników nie da się porównać',
            zrodlo: 'metoda: ten sam zamrożony zestaw',
            ton: 'green',
          },
          {
            wartosc: '1 raport z różnicą',
            opis: 'po każdym pomiarze dostajesz zmianę wobec poprzedniego, nie samo zdjęcie stanu',
            zrodlo: 'sekcja „Co dostajesz po każdym pomiarze"',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'kroki',
        wariant: 'os',
        kroki: [
          {
            tytul: 'Wskazanie firmy',
            opis: 'Czy w odpowiedzi pada nazwa Twojej firmy. To pytanie zero jedynkowe i od niego zaczyna się każdy wiersz raportu.',
          },
          {
            tytul: 'Miejsce w odpowiedzi',
            opis: 'Gdy model wymienia kilka firm, zapisujemy, na którym miejscu jesteś. Wzmianka w pierwszym zdaniu waży inaczej niż jedno słowo na końcu.',
          },
          {
            tytul: 'Zacytowane źródło',
            opis: 'Notujemy, z czego model zbudował odpowiedź. To mówi wprost, którą stronę poprawić najpierw i gdzie w ogóle Cię nie ma.',
          },
          {
            tytul: 'Kto jest polecany zamiast Ciebie',
            opis: 'Zapisujemy firmy wymienione w Twoim miejscu. Po kilku pomiarach widać, kto wchodzi do odpowiedzi, a kto z niej wypada.',
          },
          {
            tytul: 'Wydźwięk wzmianki',
            opis: 'Sama wzmianka to za mało. Zapisujemy, czy model mówi o Tobie dobrze, neutralnie, czy z zastrzeżeniem.',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Jak wygląda wiersz raportu z pomiaru?',
        ikona: 'notes-pioro',
        chip: 'RAPORT',
        overline: 'WPISY OPISOWE · BEZ PROCENTÓW',
      },
      {
        typ: 'tabela',
        naglowki: [
          'Pytanie z zestawu',
          'Wskazanie',
          'Pozycja',
          'Zacytowane źródło',
          'Zmiana wobec poprzedniego pomiaru',
        ],
        wiersze: [
          [
            'Pytanie o firmę z Twojej branży w Twoim mieście',
            'tak',
            'wymieniony jako drugi',
            'strona usługi na Twojej domenie',
            'poprzednio firma nie padała',
          ],
          [
            'Pytanie o cenę usługi',
            'nie',
            'brak',
            'ranking branżowy, w którym Cię nie ma',
            'bez zmian wobec poprzedniego pomiaru',
          ],
          [
            'Pytanie porównujące dwa rozwiązania',
            'tak',
            'wzmianka na końcu odpowiedzi',
            'wątek na forum',
            'spadek: poprzednio byłeś wyżej',
          ],
          [
            'Pytanie, komu zlecić wdrożenie',
            'nie',
            'brak',
            'katalog firm bez Twojego wpisu',
            'nowe źródło wobec poprzedniego pomiaru',
          ],
        ],
        wKarcie: true,
        podpis:
          'Przykładowe wiersze raportu z monitoringu: wpisy są opisowe, bo pozycja w odpowiedzi modelu nie jest procentem',
      },
      {
        typ: 'sekcja',
        naglowek: 'Które modele obejmujemy?',
        akapity: [
          'Zakres ustalamy przed startem, bo zależy od tego, gdzie realnie szukają Twoi klienci. Im więcej modeli w zestawie, tym dłużej trwa jeden pomiar, i dlatego liczba modeli wpływa na cenę.',
        ],
        punkty: [
          'ChatGPT',
          'Google AI Overviews i Gemini',
          'Perplexity',
          'Claude',
        ],
        wariant: 'top',
        chip: 'MODELE',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dostajesz po każdym pomiarze i kto to czyta?',
        akapity: [
          'Po każdym pomiarze dostajesz jeden dokument, zawsze w tym samym układzie. Chodzi o to, żeby dwa raporty dało się porównać wzrokiem, bez tłumaczenia.',
          'Raport piszemy tak, żeby właściciel firmy przeczytał go bez słownika, a osoba odpowiedzialna za treść wyjęła z niego listę rzeczy do poprawy.',
        ],
        punkty: [
          'Tabela pomiaru: pytanie po pytaniu, w tej samej kolejności co poprzednio.',
          'Różnica wobec poprzedniego pomiaru: co weszło, co wypadło, gdzie jest ruch.',
          'Lista firm polecanych zamiast Ciebie, z zaznaczeniem, kto pojawił się nowy.',
          'Lista zacytowanych źródeł, czyli miejsca, które realnie budują odpowiedź.',
        ],
        wariant: 'edge',
        chip: 'RAPORT',
        stopka: [
          'Zestaw pytań zostaje u Ciebie, więc możesz odpalić ten sam pomiar sam.',
          'Raporty zostają u Ciebie także wtedy, gdy przestajemy współpracować.',
        ],
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron), żeby wiersze nie łamały się na
     wąskich ekranach. Kolumna „Jeden zrzut ekranu" opisuje wyłącznie to, czego
     pojedyncze sprawdzenie nie daje: zero ocen cudzej roboty. */
  tabelaPorownawcza: {
    h2: 'Jeden zrzut ekranu a seria pomiarów',
    naglowekBez: 'Jeden zrzut ekranu',
    naglowekZNami: 'Monitoring cytowań w AI',
    wiersze: [
      {
        cecha: 'Pytania',
        bez: 'Przypadkowe, zadane raz',
        zNami: 'Ten sam zamrożony zestaw',
      },
      {
        cecha: 'Warunki',
        bez: 'Twoje konto z historią rozmów',
        zNami: 'Czyste okno, bez historii',
      },
      {
        cecha: 'Co zapisujesz',
        bez: 'Wrażenie z ekranu',
        zNami: 'Wskazanie, miejsce, źródło, wydźwięk',
      },
      {
        cecha: 'Punkt odniesienia',
        bez: 'Brak, nie ma z czym porównać',
        zNami: 'Poprzedni pomiar w tej samej tabeli',
      },
      {
        cecha: 'Konkurencja',
        bez: 'Widzisz jedną odpowiedź',
        zNami: 'Lista firm wymienianych zamiast Ciebie',
      },
      {
        cecha: 'Wniosek',
        bez: 'Zdjęcie jednej chwili',
        zNami: 'Trend widoczny między pomiarami',
      },
    ],
  },

  /* Metoda z pakietu §P5 punkt 4, dokładnie trzy pozycje, bo tyle wymusza
     kontrakt szablonu i tyle podaje pakiet. Te trzy zasady odpowiadają za
     jedną rzecz: żeby dwa pomiary w ogóle dało się porównać. */
  kroki: {
    h2: 'Dlaczego dwa pomiary da się w ogóle porównać?',
    items: [
      {
        tytul: 'Pytania klienta zamiast fraz',
        opis: 'Zestaw budujemy ze zdań, które Twoi klienci mówią na głos, a nie z haseł z narzędzia SEO. Model odpowiada na pytanie, nie na frazę, więc tylko takie pytanie mierzy cokolwiek sensownego.',
      },
      {
        tytul: 'Czyste okno',
        opis: 'Każdy pomiar robimy w nowym oknie, bez historii rozmów i bez zalogowanego konta. Zalogowane konto podsuwa modelowi to, co już o Tobie wie, więc takiego wyniku nie da się zestawić z następnym pomiarem.',
      },
      {
        tytul: 'Ten sam zamrożony zestaw',
        opis: 'Pytania zamrażamy po Sprincie Diagnostycznym i nie ruszamy ich między pomiarami. Zmiana jednego słowa robi z drugiego pomiaru nowy pomiar, a nie porównanie.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje monitoring cytowań w AI?',
    /* PAKIET §P5 punkt 8 plus uwaga wdrożeniowa: ZERO kwoty. W zatwierdzonym
       cenniku nie ma pozycji za monitoring, więc `minPrice` zostaje undefined
       (karta renderuje się bez liczby), a sekcja mówi prawdę o mechanice. */
    tresc:
      'Ceny nie da się podać z góry, bo zależy od dwóch rzeczy: ile pytań ma Twój zamrożony zestaw i ile modeli sprawdzamy w każdym pomiarze. Zestaw powstaje w Sprincie Diagnostycznym, więc dokładną wycenę monitoringu podajemy po nim.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co decyduje o cenie monitoringu?',
        ikona: 'kalendarz-check',
        chip: 'WYCENA',
        overline: 'DWIE ZMIENNE · WYCENA PO SPRINCIE DIAGNOSTYCZNYM',
      },
      {
        typ: 'przelacznik',
        grupa: 'monitoring-cytowan-wycena',
        opcje: [
          {
            numer: 'ZMIENNA 1',
            tytul: 'Liczba pytań',
            podtytul: 'wielkość zamrożonego zestawu',
            naglowek: 'Każde pytanie w zestawie to osobna odpowiedź do zapisania w każdym pomiarze.',
            akapity: [
              'Zestaw ma być tak duży, żeby pokrywał sytuacje, w których klient realnie pyta model o firmę taką jak Twoja. Nie większy, bo za każde pytanie płacisz w każdym kolejnym pomiarze.',
            ],
            punkty: [
              'pytania układamy razem w Sprincie Diagnostycznym',
              'zestaw zamrażamy i dopiero wtedy zaczyna się seria',
              'zestaw zostaje u Ciebie, także gdy nie kupisz monitoringu',
            ],
          },
          {
            numer: 'ZMIENNA 2',
            tytul: 'Liczba modeli',
            podtytul: 'zakres sprawdzania',
            naglowek: 'Ten sam zestaw pytań w kolejnym modelu to kolejny pełny pomiar.',
            akapity: [
              'Nie ma sensu płacić za modele, z których Twoi klienci nie korzystają. Zakres ustalamy przed startem i trzymamy go, bo zmiana zakresu psuje porównanie tak samo jak zmiana pytania.',
            ],
            punkty: [
              'do wyboru: ChatGPT, Google AI Overviews i Gemini, Perplexity, Claude',
              'zakres zamrażamy razem z pytaniami',
              'poszerzenie zakresu zaczyna nowy punkt odniesienia',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy poznasz cenę monitoringu?',
        akapity: [
          'Kolejność jest zawsze ta sama i pierwszy krok nic nie kosztuje.',
        ],
        punkty: [
          'Bezpłatna rozmowa: ustalamy zakres i to, czy pomiar w Twoim przypadku ma sens.',
          'Sprint Diagnostyczny: powstaje zestaw pytań i pierwszy pomiar, czyli punkt zerowy.',
          'Wycena monitoringu: znamy liczbę pytań i liczbę modeli, więc podajemy kwotę.',
        ],
        wariant: 'top',
        chip: 'KOLEJNOŚĆ',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy powtarzalny pomiar nie jest potrzebny?',
        akapity: [
          'Wolimy stracić zlecenie niż brać pieniądze za raport, który za każdym razem pokaże to samo. Mówimy to przed zamówieniem, nie po.',
        ],
        punkty: [
          'Nie zmieniasz nic na stronie ani poza nią: bez zmian nie ma czego mierzyć, a kolejny raport powtórzy poprzedni.',
          'Nie masz jeszcze punktu zerowego: zacznij od jednego pomiaru, bo serię trzeba mieć od czego liczyć.',
          'Potrzebujesz odpowiedzi na jedno pytanie, raz: to jedno sprawdzenie w czystym oknie, zrobisz je sam.',
          'Nie ma u Ciebie nikogo, kto poprawi treść po raporcie: wtedy pomiar tylko dokumentuje stan, zamiast go zmieniać.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz siebie w którymś z tych punktów? Napisz i tak.',
          'Powiemy, co zrobić zamiast, nawet jeśli to nie będzie usługa u nas.',
        ],
      },
    ],
    /* Powrót do rodzica jednym zdaniem: ta podstrona kończy się decyzją
       o pomiarze, a całą naprawę opisuje `/uslugi/optymalizacja`. */
    linkPoradnik: {
      przed: 'Naprawę strony, której skutek mierzy ten monitoring, opisaliśmy na stronie ',
      etykieta: 'pozycjonowanie pod AI',
      po: '.',
      href: '/uslugi/optymalizacja',
    },
  },

  /* OSIEM PYTAŃ (pakiet §P5 punkt 11 mówi „FAQ (8 pytań)", ale nie podaje
     gotowych treści, więc pytania i odpowiedzi napisane WYŁĄCZNIE z faktów
     stojących na tej stronie, u rodzica i w kapsule. Ten sam tekst idzie na
     stronę i do FAQPage JSON-LD, więc każda edycja rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Czym monitoring cytowań w AI różni się od audytu widoczności?',
      odpowiedz:
        'Audyt to jeden pomiar, czyli punkt zerowy. Monitoring to powtarzanie tego samego zamrożonego zestawu pytań i raport z różnicą między pomiarami. Audyt mówi, gdzie jesteś. Monitoring mówi, czy się ruszasz.',
    },
    {
      pytanie: 'Jak często powtarzacie pomiar?',
      odpowiedz:
        'Rytm ustalamy przy wycenie, bo zależy od tego, jak często zmienia się Twoja strona i jej otoczenie. Przy stałej opiece GEO mierzymy co tydzień, ręcznie.',
    },
    {
      pytanie: 'Co dokładnie zapisujecie w jednym pomiarze?',
      odpowiedz:
        'Pięć rzeczy przy każdym pytaniu: czy Twoja firma pada, na którym miejscu, jakie źródło zostało zacytowane, kto jest polecany zamiast Ciebie i jaki jest wydźwięk wzmianki.',
    },
    {
      pytanie: 'Które modele sprawdzacie w każdym pomiarze?',
      odpowiedz:
        'Te, które ustalimy przed startem. Do wyboru masz ChatGPT, Google AI Overviews i Gemini, Perplexity oraz Claude. Zakres zamrażamy razem z pytaniami, bo jego zmiana psuje porównanie tak samo jak zmiana pytania, a liczba modeli wpływa na cenę.',
    },
    {
      pytanie: 'Skąd bierze się zestaw pytań?',
      odpowiedz:
        'Powstaje w Sprincie Diagnostycznym, z pytań, które Twoi klienci naprawdę zadają. Potem go zamrażamy, żeby kolejne pomiary dało się porównać, i zostaje u Ciebie.',
    },
    {
      pytanie: 'Czy mogę odpalać te pytania sam?',
      odpowiedz:
        'Tak. Zestaw jest Twój, więc możesz go zadawać sam w dowolnym momencie. Pilnuj tylko dwóch rzeczy: czyste okno bez historii i zalogowanego konta oraz pytania słowo w słowo takie same jak poprzednio.',
    },
    {
      pytanie: 'Ile kosztuje monitoring cytowań w AI?',
      odpowiedz:
        'Cena zależy od liczby pytań w zestawie i liczby modeli, które sprawdzamy, więc podajemy ją po Sprincie Diagnostycznym, gdy oba te zakresy są już ustalone. Pierwsza rozmowa jest bezpłatna.',
    },
    {
      pytanie: 'Co jeśli kolejne pomiary nic nie pokażą?',
      odpowiedz:
        'Wtedy dostajesz to na piśmie, razem z listą źródeł, z których model dalej buduje odpowiedź. Nikt uczciwy nie da gwarancji miejsca w odpowiedzi modelu, więc poprawiamy to, co nie zadziałało, zamiast czekać kolejny kwartał.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P5 punkt 12): ruszamy pomiar,
     a wycena idzie po Sprincie Diagnostycznym. Mikrokopia powtarza mechanikę,
     bo to ostatnie zdanie przed kliknięciem. Zero kwoty. */
  cta: {
    label: 'Zamów wycenę monitoringu',
    href: '#diagnoza',
    mikrokopia:
      'Zestaw pytań powstaje w Sprincie Diagnostycznym i zostaje u Ciebie. Cena monitoringu zależy od liczby pytań i liczby modeli, więc wycenę podajemy po nim.',
    dowod:
      'Zestaw pytań jest Twój, więc możesz go odpalać sam, także wtedy, gdy nie kupisz monitoringu. Najpierw punkt zerowy, potem seria.',
  },

  queries: [
    'monitoring cytowań w AI',
    /* KONTROLA 2026-08-31: dwie frazy celowały w tę samą intencję co siostra
       `audyt-widocznosci-w-ai` („czy AI poleca moją firmę", „jak sprawdzić,
       czy ChatGPT wymienia moją firmę"), czyli w JEDNORAZOWE sprawdzenie.
       Podmienione na frazy o serii i trendzie, bo to jest intencja tej strony;
       intencja „czy poleca" zostaje przy siostrze. */
    'jak śledzić, czy ChatGPT wymienia moją firmę',
    'pomiar widoczności w AI',
    'raport cytowań w AI',
    'monitoring widoczności w ChatGPT',
    'trend cytowań w AI',
  ],

  /* POWIĄZANIA (pakiet §P5 punkt 10: audyt widoczności i pozycjonowanie pod AI,
     plus uwaga wdrożeniowa §3: każda podstrona linkuje z powrotem do rodzica).
     Obie trasy istnieją: rodzic w `lib/uslugi/index.ts`, siostra w rejestrze
     `lib/uslugi/podstrony/index.ts`. Nic ponad te dwa cele, bo pakiet więcej
     nie przewiduje. Opisy bez kwot, żeby cennik został w jednym miejscu. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',
        href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
        opis: 'Jeden pomiar i raport PDF z punktem zerowym: od tego zaczyna się każda seria.',
      },
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Cała praca, której skutek mierzy monitoring: dostęp botów, treść pod cytat i autorytet poza stroną.',
      },
    ],
  },
};
