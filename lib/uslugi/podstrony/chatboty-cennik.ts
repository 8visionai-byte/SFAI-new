import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 1: CENNIK (`/uslugi/chatboty/cennik`).
 * Fraza primary: „ile kosztuje chatbot ai dla firmy" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P1, treść zatwierdzona przed wdrożeniem).
 *
 * NAZWA PLIKU I STAŁEJ ZAWIERA GAŁĄŹ (`chatboty-cennik`), a pole `slug`
 * zostaje samym `cennik`, bo adres `/uslugi/chatboty/cennik` się nie zmienia.
 * Powód: pakiety voicebotów, automatyzacji i stron WWW planują KAŻDY własną
 * podstronę `/cennik`, a katalog `lib/uslugi/podstrony/` jest płaski, więc
 * trzy pliki chciałyby się nazywać tak samo. Prefiks rodzica rozwiązuje to
 * raz, zanim powstanie kolizja.
 *
 * ROZDZIAŁ INTENCJI (żelazna granica, chroni przed kanibalizacją rodzica
 * `/uslugi/chatboty`):
 *  - RODZIC sprzedaje CAŁĄ usługę: co bot robi, skąd bierze wiedzę, jak
 *    wygląda wdrożenie i utrzymanie.
 *  - TA STRONA odpowiada WYŁĄCZNIE na „ile to kosztuje i za co płacę"
 *    i kończy się jedną decyzją: ustalmy, który próg jest mój.
 *  - NIE MA TU I BYĆ NIE MOŻE: opisu tego, co bot potrafi (rodzic), kroków
 *    wdrożenia (rodzic), zastosowań branżowych (podstrony zastosowań). Do tych
 *    tematów prowadzą linki, treść zostaje na tamtych stronach.
 *  - PODZIAŁ KWOT WEWNĄTRZ STRONY (konwencja podstron przeniesiona z pakietu
 *    GEO §6 „kwoty tylko w sekcji ceny"; pakiet chatbotów takiej uwagi nie ma,
 *    więc to decyzja tej sesji, nie cytat): wszystkie kwoty stoją
 *    w `kapsula` (kapsuła cennika NIESIE kwoty z polecenia §P1), `ramaCeny`, `faq`,
 *    `cta.mikrokopia` i w metadanych. Sekcje `problem`, `rozwiazanie`,
 *    `tabelaPorownawcza`, `kroki` i `powiazane` są CELOWO bez kwot i mówią
 *    o mechanice ceny, nie o liczbach.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P1, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami).
 *    JEDYNY WYJĄTEK: dopisane słowo „netto" przy naszych kwotach, których
 *    pakiet nim nie opatrzył, czyli w odpowiedzi FAQ 6 (1790 zł
 *    i 8000-15000 zł) oraz w pytaniu FAQ 4 (1790 zł). Reguła „nasze kwoty
 *    zawsze netto" jest twardsza niż dosłowność (opis przy bloku `faq`),
 *  - drabina trzech progów z czasami: pakiet §P1 sekcja 2, zgodne co do
 *    złotówki z `lib/uslugi/chatboty.ts` (`ramaCeny` rodzica, `minPrice` 1790),
 *  - trzy osobne pozycje rachunku (stworzenie, utrzymanie, tokeny): §P1 sekcja 4,
 *  - dwa modele utrzymania: §P1 sekcja 5 plus uwaga wdrożeniowa §7 pakietu,
 *    formuła obowiązująca w czterech miejscach serwisu brzmi identycznie:
 *    „infrastruktura u nas: 99-599 zł netto miesięcznie; infrastruktura
 *    przekazana Tobie: 0 zł miesięcznie, poprawki 350 zł netto za godzinę",
 *  - rachunek na 12, 24 i 36 miesięcy: tabela z sekcji 9 pakietu, PRZENIESIONA
 *    tutaj na polecenie §P1 sekcja 9 (razem z wierszem „za co płacisz co
 *    miesiąc"). Kwoty w wierszach to suma arytmetyczna pokazana w podpisie,
 *  - chatbot a voicebot: §P1 sekcja 8 i ostatnie pytanie FAQ,
 *  - Sprint Diagnostyczny: §P1 sekcja 10, zgodne co do złotówki
 *    z `lib/uslugi/audyt-ai.ts` (ta sama usługa, ten sam raport PDF).
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1790 zł netto / 1-2 dni robocze; 3000-6000 zł netto / 3-4 dni robocze;
 *  8000-15000 zł netto / 5-10 dni roboczych; utrzymanie 99-599 zł netto
 *  miesięcznie albo 0 zł; poprawki 350 zł netto za godzinę; dwie rundy
 *  poprawek i dwa tygodnie testów; rachunek 2978 / 8978 / 4166 / 16166 /
 *  5354 / 23354 zł netto po 12, 24 i 36 miesiącach; voicebot 2500 zł netto,
 *  5000-9000 zł netto, utrzymanie 299-1500 zł netto miesięcznie; Sprint
 *  Diagnostyczny 1490 zł netto i 5 dni roboczych.
 *  ZAPIS PRZEDZIAŁÓW (ujednolicony 2026-09-04 na całej gałęzi chatbotów):
 *  łącznik bez spacji i bez spacji w tysiącach, czyli „8000-15000 zł",
 *  „99-599 zł netto miesięcznie", „5-10 dni roboczych". Tak samo w pliku
 *  rodzica `lib/uslugi/chatboty.ts`, więc cały serwis trzyma jeden zapis.
 *  NASZE kwoty zawsze z dopiskiem netto. Przy „0 zł" dopisku NIE MA, bo zero
 *  netto to zero brutto.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ani jednej kwoty
 *  konkurencji („Zero kwot konkurencji"), nie podaje przykładowego rachunku
 *  za tokeny ani żadnego odniesienia czasowego typu „pół roku temu". Zdania
 *  są napisane tak, żeby były prawdziwe bez tych danych: kolumna „Bot
 *  z platformy w abonamencie" w tabeli niesie PYTANIA do zadania, nie liczby.
 *
 * ZAKAZANE NA TEJ STRONIE: kwoty konkurencji, obietnica pomiaru, testu, audytu
 * ani raportu na BEZPŁATNEJ rozmowie (ustalenie właściciela z 2026-08-31:
 * bezpłatna rozmowa to wyłącznie badanie potrzeb, rozplanowanie procesów
 * i konkretna oferta to płatny Sprint Diagnostyczny, odliczany w całości
 * od wdrożenia), zakazana przez właściciela nazwa roli dla voicebota (patrz
 * pakiet), sugerowanie, że voicebot dzwoni sam (wolno wyłącznie
 * w zaprzeczeniu), komunikatory zespołowe jako kanały chatbota (uwaga
 * wdrożeniowa §8 pakietu), nazwa techniczna modelu.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług. Zero nowych typów bloków, zero nowego CSS.
 * `ramaCeny.cenaStala` CELOWO nie jest ustawione: cennik chatbota to widełki
 * od 1790 zł netto, a nie jedna kwota dla każdego klienta.
 */
export const chatbotyCennik: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'cennik',
  /* 2026-09-06: dołożone trzy sytuacje „kiedy się nie opłaci" z rodzica oraz
     zamknięcie „abonament czy własność" (pakiet §9) w stopce sekcji
     o porównywaniu ofert. */
  dataAktualizacji: '2026-09-06',

  h1: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',

  /* KAPSUŁA 1:1 Z PAKIETU §P1 („do wklejenia jako pierwszy akapit i jako
     kapsula w danych"). Nie skracać i nie przepisywać: niesie komplet
     wielkości strony (trzy progi, trzy czasy, utrzymanie, tokeny) i ma być
     cytowana przez modele w tej formie, w jakiej została zatwierdzona. */
  kapsula:
    'Chatbot AI dla firmy kosztuje u nas od 1790 zł netto i działa po 1-2 dniach roboczych. Bot średni to 3000-6000 zł netto i 3-4 dni robocze. Bot z integracjami to 8000-15000 zł netto i 5-10 dni roboczych. Do tego dochodzi utrzymanie 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie. Tokeny modelu płacisz dostawcy wprost, według zużycia.',

  /* metaTitle: pakiet §P1 dawał 36 znaków, konwencja repo (types.ts) mówi 50-60
     i decyzja właściciela każe trzymać konwencję repo. Fraza główna zostaje
     NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakt z tej strony (dolny
     próg cennika, ten sam co w kapsule i w drabinie cen). Długość 51 znaków.
     Layout dokleja sufiks marki, więc w SERP wychodzi
     „Ile kosztuje chatbot AI dla firmy? Od 1790 zł netto · SimpleFast.ai". */
  metaTitle: 'Ile kosztuje chatbot AI dla firmy? Od 1790 zł netto',
  /* 155 znaków (limit 160). Cztery wielkości naraz: dolny próg, czas, górny
     próg i utrzymanie w obu modelach rozliczenia. */
  metaDescription:
    'Cennik chatbota AI dla firmy: od 1790 zł netto i 1-2 dni robocze, z integracjami 8000-15000 zł netto. Utrzymanie 99-599 zł netto albo 0 zł po przekazaniu.',

  problem: {
    /* H2 rodzica brzmi „Ile razy dziennie odpowiadasz na to samo pytanie?"
       (problem obsługowy). Tutaj problem jest CENOWY: nie da się porównać
       dwóch ofert, dopóki nie rozbije się ich na te same trzy pozycje. */
    h2: 'Dlaczego jedna kwota za chatbota nie mówi Ci prawie nic?',
    tresc:
      'Cena chatbota to nie jedna liczba, tylko trzy osobne pozycje: stworzenie bota, utrzymanie po wdrożeniu i zużycie tokenów modelu. Dwie oferty da się zestawić dopiero wtedy, gdy każdą rozbijesz na te same trzy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Trzy pozycje rachunku za chatbota',
        ikona: 'lupa-wykres',
        chip: 'CENNIK',
        overline: 'JEDNORAZOWO · CO MIESIĄC · WEDŁUG ZUŻYCIA',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Stworzenie bota, płatne raz',
            akapity: [
              'Jednorazowa kwota za zbudowanie i uruchomienie bota: bazę wiedzy z Twoich materiałów, ustawienie rozmowy, testy i odbiór. Płacisz ją raz, niezależnie od tego, jak długo bot potem pracuje.',
            ],
            punkty: [
              'Dwie rundy poprawek mieszczą się w tej kwocie.',
              'Funkcje spoza pierwszej rozmowy wyceniamy osobno.',
            ],
          },
          {
            naglowek: 'Utrzymanie, co miesiąc albo wcale',
            akapity: [
              'Ta pozycja zależy od jednej decyzji: czy infrastruktura zostaje u nas, czy przekazujemy ją Tobie. W drugim wariancie nie płacisz nam co miesiąc nic, a poprawki zamawiasz wtedy, kiedy ich potrzebujesz.',
            ],
            punkty: [
              'Infrastruktura u nas: stała opłata miesięczna.',
              'Infrastruktura u Ciebie: poprawki na zlecenie, godzinowo.',
            ],
          },
          {
            naglowek: 'Tokeny modelu, według zużycia',
            akapity: [
              'Tokeny to rozliczenie za pracę modelu językowego. Rozliczasz je na własnym koncie u dostawcy modelu, więc jest to jedyna pozycja, której wysokość ustala liczba rozmów, a nie umowa z nami.',
            ],
            punkty: [
              'Konto u dostawcy jest Twoje, faktura idzie prosto do Ciebie.',
              'Realny rząd wielkości znasz po pierwszej fakturze od dostawcy.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'O co zapytać, zanim porównasz dwie oferty na chatbota?',
        akapity: [
          'Różnica między ofertami rzadko siedzi w kwocie na pierwszej stronie. Siedzi w tym, co dzieje się z botem w trzecim miesiącu i w tym, czego przy podpisywaniu nikt nie powiedział wprost.',
        ],
        punkty: [
          'Kto aktualizuje bazę wiedzy, gdy zmienia się oferta, i czy mieści się to w opłacie miesięcznej.',
          'Ile kosztuje funkcja, o której nie było mowy na pierwszej rozmowie.',
          'Czy da się przenieść bota do siebie i co dokładnie dostajesz przy przekazaniu.',
          'Kto płaci za tokeny modelu i czy ktoś dolicza do nich marżę.',
        ],
        wariant: 'edge',
        chip: 'PORÓWNANIE',
        /* Dwa ostatnie punkty stopki: pakiet §9 rodzica (zamknięcie listy
           kontrolnej „abonament czy własność"), przeniesione 1:1 w 2026-09-06
           po przycięciu `/uslugi/chatboty` (kontrola utraty treści). Zero liczb. */
        stopka: [
          'Nasze odpowiedzi na te cztery pytania stoją niżej na tej stronie, razem z kwotami.',
          'Zadaj je też nam. Odpowiedź ma być w cenniku, nie w rozmowie handlowej.',
          'Abonament ma sens, jeśli chcesz prostego bota na tydzień, sam go skonfigurujesz i nie zależy Ci na tym, czyja jest baza wiedzy.',
          'Własny bot ma sens, jeśli baza wiedzy jest Twoim aktywem, a bot ma pracować na Twoich zasadach dłużej niż rok.',
        ],
      },
    ],
  },

  rozwiazanie: {
    /* H2 rodzica brzmi „Co robi nasz chatbot, czego nie robi zwykły bot?".
       Tutaj mowa wyłącznie o mechanice wyceny, bez ani jednej kwoty. */
    h2: 'Co decyduje o tym, w którym progu wyląduje Twój chatbot?',
    tresc:
      'O progu decyduje jedna rzecz: czy bot ma tylko odpowiadać, czy również sięgać do Twoich systemów. Objętość bazy wiedzy i liczba dodatkowych funkcji przesuwają wycenę już wewnątrz progu.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Trzy rzeczy, które ruszają wycenę',
        ikona: 'wykres-strzalka',
        chip: 'WYCENA',
        overline: 'CO ZMIENIA KWOTĘ · CO JEJ NIE RUSZA',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Czy bot ma sięgać do Twoich systemów?',
            akapity: [
              'To jedyna rzecz, która przenosi wycenę z progu prostego na próg z integracjami. Bot, który tylko odpowiada, zostaje na dole drabiny, choćby odpowiadał na bardzo dużo pytań.',
            ],
            punkty: [
              'Sprawdzenie statusu zamówienia albo dopisanie kontaktu do CRM to już integracja.',
              'Każdy system to osobne dostępy, testy i obsługa błędów.',
            ],
          },
          {
            naglowek: 'W jakim stanie są materiały do bazy wiedzy?',
            akapity: [
              'Nie muszą być poukładane, ale muszą istnieć i ktoś musi mieć do nich dostęp. Gdy wiedza siedzi wyłącznie w głowach, zaczynamy od spisania procesów, a nie od budowy bota.',
            ],
            punkty: [
              'Cennik, oferty, opisy produktów, procedury, transkrypcje szkoleń.',
              'Zegar wdrożenia rusza dopiero wtedy, gdy materiały są u nas.',
            ],
          },
          {
            naglowek: 'Kto po Twojej stronie odbiera bota?',
            akapity: [
              'Jedna osoba, która przetestuje bota i powie, że jest dobrze. Bez niej sama budowa trwa tyle co zwykle, a odbiór rozjeżdża się na tygodnie i to on przeciąga cały projekt.',
            ],
            punkty: [
              'Odbiór ma dwie tury testów i obie mieszczą się w kwocie wdrożenia.',
              'Wystarczy jedna osoba decyzyjna, nie cały zespół.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czego cena wdrożenia u nas nie obejmuje?',
        akapity: [
          'Wolimy powiedzieć to przed podpisaniem niż przy fakturze. Poza kwotą wdrożenia zostają dokładnie dwie rzeczy i obie są w Twoich rękach.',
        ],
        punkty: [
          'Tokeny modelu: rozliczasz je u dostawcy, na swoim koncie, według liczby rozmów.',
          'Rozbudowa: to, czego nie ustaliliśmy na starcie, idzie jako osobne zlecenie z własną kwotą.',
        ],
        wariant: 'top',
        chip: 'GRANICE',
        stopka: [
          'Wszystko, co ustaliliśmy na starcie, mieści się w kwocie wdrożenia.',
          'O rozbudowie mówimy w momencie zgłoszenia, nie po jej zrobieniu.',
        ],
      },
    ],
  },

  /* Komórki krótkie (konwencja podstron: cecha ~14 znaków, kolumny ~35), żeby
     wiersze nie łamały się na wąskich ekranach. Kolumna „bez" NIE ocenia
     cudzych produktów i nie podaje ich cen (pakiet: „Zero kwot konkurencji"),
     tylko nazywa pytanie, które warto tam zadać. */
  tabelaPorownawcza: {
    h2: 'Bot z platformy w abonamencie a chatbot na własność',
    naglowekBez: 'Bot z platformy w abonamencie',
    naglowekZNami: 'Chatbot wdrożony przez SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Płatność',
        bez: 'Opłata co miesiąc, dopóki bot działa',
        zNami: 'Wdrożenie raz, utrzymanie do wyboru',
      },
      {
        cecha: 'Baza wiedzy',
        bez: 'Zapytaj, co zabierasz przy wyjściu',
        zNami: 'Twoja od pierwszego dnia',
      },
      {
        cecha: 'Zmiany w bocie',
        bez: 'Tyle, ile przewidział panel',
        zNami: 'Pod Twój proces, dwie rundy w cenie',
      },
      {
        cecha: 'Integracje',
        bez: 'Zapytaj, czy w ogóle są możliwe',
        zNami: 'Wpinamy bota w Twoje systemy',
      },
      {
        cecha: 'Więcej rozmów',
        bez: 'Sprawdź, czy cena rośnie z ruchem',
        zNami: 'Tokeny rozliczasz u dostawcy modelu',
      },
      {
        cecha: 'Koniec umowy',
        bez: 'Zapytaj, co zostaje po Twojej stronie',
        zNami: 'Przekazujemy Ci całą infrastrukturę',
      },
    ],
  },

  /* Kroki rodzica opisują WDROŻENIE (diagnoza, uczenie, utrzymanie). Te trzy to
     sekcja 11 pakietu §P1 („Jak przygotować się do wyceny"), czyli LISTA
     RZECZY PO TWOJEJ STRONIE, a nie opis naszego procesu: co zebrać i kogo
     wskazać, zanim usiądziemy do liczenia. Typ `Usluga` wymaga dokładnie
     trzech kroków, więc materiały i lista systemów stoją w jednym punkcie.
     Bezpłatna rozmowa służy tu badaniu potrzeb i policzeniu rzeczy na Twoich
     liczbach: żadnego pomiaru, testu, audytu ani raportu. */
  kroki: {
    h2: 'Jak przygotować się do wyceny chatbota?',
    items: [
      {
        tytul: 'Zgrubna liczba pytań i kanały, którymi przychodzą',
        opis: 'Nie musisz nic liczyć co do sztuki. Wystarczy szacunek: mniej więcej tyle mailem, tyle w komunikatorach, tyle telefonem. Ta jedna informacja mówi, czy jesteśmy przy progu prostym, czy wyżej.',
      },
      {
        tytul: 'Materiały do bazy wiedzy i lista systemów',
        opis: 'Zbierz w jednym miejscu cennik, oferty, opisy produktów i procedury, a obok wypisz systemy, z którymi bot ma rozmawiać: CRM, sklep, kalendarz, magazyn. Ta druga lista przesądza o najwyższym progu, więc pytamy o nią wprost.',
      },
      {
        tytul: 'Osoba, która odbierze bota po Twojej stronie',
        opis: 'Wskaż jedną osobę decyzyjną do dwóch tur testów, nie cały zespół. Z tymi trzema rzeczami próg, liczba dni roboczych i granice zakresu mieszczą się w jednej rozmowie, a jeśli bot się u Ciebie nie opłaci, usłyszysz to wtedy.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje chatbot AI na każdym z trzech progów?',
    /* Lead CELOWO bez kwot: komplet liczb stoi w kapsule na górze strony,
       w pasie metryk zaraz pod tym akapitem i w drabinie cenowej. Powtórzenie
       ich tutaj dawało zdanie prawie identyczne z FAQ rodzica (pomiar
       podobieństwa 0,81), więc lead mówi o układzie sekcji, nie o liczbach. */
    tresc:
      'Trzy progi, trzy czasy realizacji i trzy różne powody, dla których wycena rośnie. Rozkładamy je niżej razem z utrzymaniem i rachunkiem na trzy lata, bo cenę bota poznaje się po całym okresie jego pracy, a nie po pierwszym dniu.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1790 zł netto',
            opis: 'chatbot prosty, płatne raz przy wdrożeniu',
            zrodlo: 'próg 1 z drabiny cenowej niżej',
            ton: 'cyan',
          },
          {
            wartosc: '1-2 dni robocze',
            opis: 'wdrożenie progu prostego, od kompletu materiałów',
            zrodlo: 'kolumna czasu w drabinie cenowej',
            ton: 'green',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'utrzymanie miesięcznie, gdy infrastruktura stoi u nas',
            zrodlo: 'przełącznik dwóch modeli utrzymania',
            ton: 'amber',
          },
          {
            wartosc: '0 zł',
            opis: 'utrzymanie miesięcznie, gdy przekazujemy infrastrukturę Tobie',
            zrodlo: 'przełącznik dwóch modeli utrzymania',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Drabina cenowa: trzy progi, trzy czasy',
        ikona: 'kalendarz-check',
        chip: 'CENNIK 2026',
        overline: 'KWOTY NETTO · DNI ROBOCZE',
      },
      {
        typ: 'tabela',
        /* CZWARTA KOLUMNA ODPOWIADA NA „za co dokładnie płacisz na każdym
           progu" (pakiet §P1 sekcja 3), a nie na „co Cię na ten próg
           przesuwa": to drugie stoi w sekcji `rozwiazanie` i w podpisie
           tabeli, więc informacja nie znika, tylko wraca na swoje miejsce.
           Zawartość progów pochodzi z pakietu: próg prosty z §P1 FAQ 1 i 4
           (bot na stronie WWW, baza wiedzy z Twoich materiałów, zbieranie
           leadów, dwie rundy poprawek i odbiór), próg średni z §P6 kapsuły
           (dołożenie kanału mieści się w progu średnim) plus §P1 sekcja 7,
           próg duży z §P1 FAQ 6 (sprawdzanie i zapisywanie w Twoich
           systemach, osobne dostępy, testy i obsługa błędów). */
        naglowki: ['Próg', 'Cena netto', 'Czas wdrożenia', 'Co dostajesz na tym progu'],
        wiersze: [
          [
            'Prosty',
            '1790 zł',
            '1-2 dni robocze',
            'bot na Twojej stronie WWW z bazą wiedzy z Twoich materiałów, zbieranie kontaktów z rozmowy, dwie rundy poprawek i odbiór',
          ],
          [
            'Średni',
            '3000-6000 zł',
            '3-4 dni robocze',
            'wszystko z progu prostego, do tego rozbudowana baza wiedzy, dodatkowe funkcje pod Twój proces i kolejne kanały: WhatsApp, Messenger, Instagram, Telegram',
          ],
          [
            'Duży z integracjami',
            '8000-15000 zł',
            '5-10 dni roboczych',
            'wszystko z progu średniego, a do tego bot sprawdza albo zapisuje coś w Twoich systemach, z osobnymi dostępami, testami i obsługą błędów',
          ],
        ],
        wKarcie: true,
        podpis:
          'Drabina cenowa chatbota AI: kwoty netto, płatne raz przy wdrożeniu. O progu decyduje to, czy bot ma tylko odpowiadać, czy również sięgać do Twoich systemów.',
      },
      {
        typ: 'naglowek',
        tekst: 'Co płacisz co miesiąc po wdrożeniu?',
        ikona: 'dokument-skan',
        chip: 'UTRZYMANIE',
        overline: 'DWA MODELE · WYBIERASZ PRZED WDROŻENIEM',
      },
      {
        typ: 'przelacznik',
        grupa: 'cennik-utrzymanie',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Infrastruktura u nas',
            podtytul: '99-599 zł netto miesięcznie',
            naglowek: 'Serwery i pilnowanie zostają po naszej stronie, Ty płacisz stałą kwotę miesięcznie',
            akapity: [
              'Za 99 zł netto miesięcznie bot ma po prostu działać: hosting i nasza reakcja, gdy coś przestanie działać. Za 599 zł netto miesięcznie dochodzi regularna aktualizacja bazy wiedzy przy większym ruchu.',
              'Wyższa kwota nie daje lepszego bota. Daje bota pilnowanego częściej i bazę wiedzy nadążającą za zmianami w ofercie.',
            ],
            punkty: [
              'Serwery trzymamy my, Ty nie stawiasz i nie pilnujesz niczego.',
              'Ten sam bot i ten sam czas wdrożenia co w drugim modelu.',
              'Kod i baza wiedzy i tak są Twoje.',
            ],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Infrastruktura u Ciebie',
            podtytul: '0 zł miesięcznie',
            naglowek: 'Przekazujemy Ci całą infrastrukturę i po naszej stronie nie płacisz nic co miesiąc',
            akapity: [
              'Bot stoi wtedy u Ciebie, razem z kodem i bazą wiedzy. Utrzymanie po naszej stronie wynosi 0 zł miesięcznie, bo nie trzymamy już nic, za co można by pobierać opłatę.',
              'Późniejsze zmiany rozliczamy po 350 zł netto za godzinę i tylko wtedy, gdy je zamówisz. Możesz też robić je samodzielnie albo z kimś innym.',
            ],
            punkty: [
              'Zero abonamentu po naszej stronie.',
              'Zmiany robisz sam, zlecasz nam albo komuś innemu.',
              'Cała infrastruktura przechodzi do Ciebie.',
            ],
          },
        ],
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Co podnosi cenę Twojego chatbota?',
            akapity: [
              'Nie liczba pytań i nie długość rozmów, tylko to, ilu miejsc bot ma dotknąć poza własną bazą wiedzy.',
            ],
            punkty: [
              'Integracje z Twoimi systemami: to one przenoszą wycenę do przedziału 8000-15000 zł netto.',
              'Rozbudowana baza wiedzy i dodatkowe funkcje pod proces: przedział 3000-6000 zł netto.',
              'Funkcje wymyślone po pierwszej rozmowie: osobna wycena, podana od razu przy zgłoszeniu.',
            ],
          },
          {
            /* DRUGA POŁOWA SEKCJI 7 PAKIETU („co podnosi, a co OBNIŻA cenę").
               Karta nie obiecuje rabatu, bo żaden rabat nie stoi w pakiecie
               ani w decyzjach właściciela. Każdy punkt to mechanika już
               opisana na tej stronie, tylko czytana w drugą stronę: brak
               integracji trzyma wycenę na progu prostym (drabina cenowa),
               objętość bazy i liczba funkcji ruszają kwotę wewnątrz progu
               (lead sekcji `rozwiazanie`), przekazanie infrastruktury zbija
               opłatę miesięczną do zera (przełącznik dwóch modeli), a Sprint
               Diagnostyczny odliczamy od wdrożenia (§P1 sekcja 10). */
            naglowek: 'Co obniża cenę Twojego chatbota?',
            akapity: [
              'To samo, co ją podnosi, tylko czytane w drugą stronę: mniej miejsc do dotknięcia i mniejszy zakres pracy. Kwota bierze się z roboty do wykonania, a nie z negocjacji.',
            ],
            punkty: [
              'Rezygnacja z integracji: bez nich wycena nie wchodzi w przedział 8000-15000 zł netto.',
              'Bot, który tylko odpowiada z bazy wiedzy i zbiera kontakt: próg prosty, czyli 1790 zł netto.',
              'Mniejsza baza wiedzy i mniej dodatkowych funkcji: bliżej dolnej krawędzi widełek Twojego progu.',
              'Przekazanie infrastruktury: utrzymanie 0 zł miesięcznie zamiast 99-599 zł netto miesięcznie.',
              'Sprint Diagnostyczny, jeśli go robimy: jego 1490 zł netto zdejmujemy potem z kwoty wdrożenia.',
            ],
          },
          {
            naglowek: 'Czego w tej cenie nie obetniemy?',
            /* CELOWO INNYMI SŁOWAMI NIŻ FAQ „Czy da się taniej niż 1790 zł netto?":
               kontrola adwersaryjna zmierzyła podobieństwo 0,68 między pierwszą
               wersją tej karty a odpowiedzią z FAQ. FAQ jest zamknięte 1:1
               z pakietem, więc przepisana została karta, bez zmiany sensu. */
            akapity: [
              'Poniżej 1790 zł netto nie zejdziemy i nie tniemy zakresu po to, żeby zmieścić się w mniejszym budżecie. Wolimy powiedzieć wprost, że to nie jest moment na bota, niż oddać wersję okrojoną tak, że nie zdejmuje z Ciebie żadnej roboty.',
            ],
            punkty: [
              'Kwota wdrożenia obejmuje obie tury poprawek, niezależnie od progu.',
              'Cena nie rośnie dlatego, że zgłosiłeś uwagi w dwóch tygodniach testów.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Chatbot czy voicebot, jeśli patrzysz na koszt?',
        akapity: [
          'Chatbot obsługuje tych, którzy piszą. Voicebot odbiera połączenia od tych, którzy dzwonią, i nigdy nie wydzwania do Twoich klientów sam.',
          'Voicebot startuje wyżej i drożej wychodzi co miesiąc, bo poza samym botem w rachunku siedzi jeszcze telefonia i czas połączeń. Przy tym samym zestawie pytań tańszym wejściem jest chatbot.',
        ],
        punkty: [
          'Voicebot prosty: 2500 zł netto.',
          'Voicebot z integracjami, na przykład z kalendarzem: 5000-9000 zł netto.',
          'Utrzymanie voicebota: 299-1500 zł netto miesięcznie.',
          'Chatbot prosty: 1790 zł netto, utrzymanie 99-599 zł netto miesięcznie albo 0 zł po przekazaniu infrastruktury.',
        ],
        wariant: 'top',
        chip: 'CHATBOT A VOICEBOT',
      },
      {
        typ: 'naglowek',
        tekst: 'Ile chatbot kosztuje przez trzy lata?',
        ikona: 'wykres-strzalka',
        chip: 'RACHUNEK',
        overline: 'PRÓG PROSTY · TRZY WARIANTY UTRZYMANIA',
      },
      {
        typ: 'tabela',
        naglowki: [
          'Co porównujemy',
          'Infrastruktura u nas: 99 zł netto',
          'Infrastruktura u nas: 599 zł netto',
          'Infrastruktura u Ciebie',
        ],
        wiersze: [
          ['Koszt wdrożenia', '1790 zł netto', '1790 zł netto', '1790 zł netto'],
          ['Opłata miesięczna', '99 zł netto', '599 zł netto', '0 zł'],
          ['Po 12 miesiącach', '2978 zł netto', '8978 zł netto', '1790 zł netto'],
          ['Po 24 miesiącach', '4166 zł netto', '16166 zł netto', '1790 zł netto'],
          ['Po 36 miesiącach', '5354 zł netto', '23354 zł netto', '1790 zł netto'],
          [
            'Za co płacisz co miesiąc',
            'hosting i reakcja, gdy coś przestanie działać',
            'hosting plus regularna aktualizacja bazy wiedzy przy większym ruchu',
            'nic, poprawki 350 zł netto za godzinę tylko na zamówienie',
          ],
        ],
        wKarcie: true,
        podpis:
          'Rachunek na trzy lata dla progu prostego, wszystkie kwoty netto. Jak liczymy: 1790 zł netto wdrożenia plus opłata miesięczna razy liczba miesięcy, czyli przy 99 zł netto po dwunastu miesiącach wychodzi 2978 zł netto.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy chatbot się u Ciebie nie opłaci?',
        akapity: [
          'Przy kilku zapytaniach tygodniowo bot nie odda 1790 zł netto, bo nie ma czego przejmować. Odpowiadanie osobiście jest wtedy Twoją przewagą, a nie kosztem.',
          'Druga sytuacja to wiedza, która siedzi w głowach zamiast w dokumentach. Bot nie wymyśli procedury, której nikt nie spisał, więc zaczynamy od jej spisania, a nie od budowy bota.',
          /* 2026-09-06: trzy sytuacje przeniesione z rodzica /uslugi/chatboty
             (przycięcie strony, raport SEO 2026-09-05 sekcja 9: wątki
             poboczne idą na podstrony, nie do kosza). Treść napisana od nowa,
             bez kwot stron WWW, które stoją na /uslugi/strony-www. */
          'Trzy kolejne: gdy każda sprawa wymaga decyzji człowieka, bot ma tylko zebrać kontekst i oddać rozmowę z kompletem informacji, a nie udawać, że ją domknie. Gdy chcesz bota, bo ma go konkurencja, najpierw wskaż pytanie, które wraca najczęściej; bez niego bot stoi na stronie i nikt do niego nie pisze. Gdy strona nie ma ruchu, najpierw robi się widoczność, potem bota.',
        ],
        punkty: [
          'Pierwsza rozmowa jest bezpłatna i służy zbadaniu potrzeb: pytamy, o co pytają Twoi klienci i co ma robić bot.',
          'Rozplanowanie procesów i konkretna oferta to już Sprint Diagnostyczny: 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów.',
          'Kwotę 1490 zł netto odliczamy w całości od ceny wdrożenia, więc gdy wchodzisz w projekt, sprint nic Cię nie kosztuje.',
          'Wróć do tematu, gdy zapytania zaczną się powtarzać: wtedy jest co przejmować.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Wolimy stracić zlecenie niż sprzedać bota, który nie ma czego przejąć.',
          'Sprint Diagnostyczny opisaliśmy osobno, razem z tym, co dostajesz w raporcie.',
        ],
      },
    ],
    minPrice: 1790,
    /* `cenaStala` CELOWO nieustawione: 1790 zł netto to dolny próg widełek,
       a nie jedna kwota dla każdego klienta (inaczej niż przy Sprincie
       Diagnostycznym). Render zostawia więc prefiks „od " na kaflu ceny. */
    /* Powrót do rodzica jednym zdaniem (uwaga wdrożeniowa §4: każda podstrona
       linkuje zwrotnie do `/uslugi/chatboty`). Ta strona kończy się decyzją
       o progu, a co bot potrafi, opisuje strona macierzysta. */
    linkPoradnik: {
      przed: 'Co dokładnie robi bot, którego tu wyceniamy, opisaliśmy na stronie ',
      etykieta: 'chatbot AI dla firm',
      po: '.',
      href: '/uslugi/chatboty',
    },
  },

  /* KOMPLET 8 PYTAŃ Z PAKIETU §P1 („FAQ gotowe, 8 pytań"). Kolejność i pytania
     bez zmian: ten sam tekst idzie na stronę i do FAQPage JSON-LD (uwaga
     wdrożeniowa §6), więc każda edycja tutaj rozjeżdża oba naraz.
     JEDYNE ODSTĘPSTWO OD DOSŁOWNOŚCI (kontrola adwersaryjna, 2026-09-01,
     uzupełniona 2026-09-04): pakiet pisał naszą kwotę bez słowa netto
     w dwóch miejscach, mimo że pytanie 1 tego samego bloku pisze „1790 zł
     netto". Chodzi o odpowiedź na „Co dokładnie podnosi cenę chatbota?"
     („1790 zł" i „8000-15000 zł") oraz o samo pytanie „Czy da się taniej
     niż 1790 zł?". Reguła właściciela „nasze kwoty zawsze netto" jest
     twardsza niż dosłowność, więc w obu miejscach dopisane zostało samo
     słowo „netto". Zero innych zmian w treści pakietu. */
  faq: [
    {
      pytanie: 'Ile kosztuje najprostszy chatbot AI?',
      odpowiedz:
        '1790 zł netto. To bot na Twojej stronie WWW z bazą wiedzy z Twoich materiałów i ze zbieraniem leadów z rozmowy. Wdrażamy go w 1-2 dni robocze.',
    },
    {
      pytanie: 'Czy do ceny dochodzi coś jeszcze?',
      odpowiedz:
        'Tak, dwie pozycje. Utrzymanie 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie. Oraz zużycie tokenów modelu, za które płacisz dostawcy wprost.',
    },
    {
      pytanie: 'Kto płaci za tokeny modelu językowego?',
      odpowiedz:
        'Ty, bezpośrednio u dostawcy modelu. Konto jest Twoje, więc nie doliczamy do tego marży. Rachunek rośnie i maleje razem z liczbą rozmów.',
    },
    {
      pytanie: 'Czy da się taniej niż 1790 zł netto?',
      odpowiedz:
        'Nie u nas. Za tę kwotę dostajesz wdrożenie z Twoimi materiałami, dwie rundy poprawek i odbiór. Jeśli budżet jest mniejszy, powiemy Ci to wprost, zamiast ciąć zakres i oddawać bota, który nie działa.',
    },
    {
      pytanie: 'Czy poprawki są dodatkowo płatne?',
      odpowiedz:
        'Dwie rundy poprawek są w cenie wdrożenia. Testujesz bota przez tydzień, wdrażamy uwagi, testujesz drugi tydzień, wdrażamy kolejne i jest odbiór. Nowe funkcje spoza pierwszej rozmowy wyceniamy osobno.',
    },
    {
      pytanie: 'Co dokładnie podnosi cenę chatbota?',
      odpowiedz:
        'Integracje z Twoimi systemami. Bot, który tylko odpowiada, mieści się w 1790 zł netto. Bot, który sprawdza status zamówienia albo dopisuje kontakt do CRM, to przedział 8000-15000 zł netto, bo każdy system to osobne dostępy, testy i obsługa błędów.',
    },
    {
      pytanie: 'Czy mogę nie płacić abonamentu?',
      odpowiedz:
        'Tak. Przekazujemy Ci całą infrastrukturę, wtedy utrzymanie po naszej stronie wynosi 0 zł miesięcznie. Późniejsze poprawki rozliczamy po 350 zł netto za godzinę, tylko gdy je zamówisz.',
    },
    {
      pytanie: 'Ile kosztuje voicebot w porównaniu z chatbotem?',
      odpowiedz:
        'Voicebot prosty to 2500 zł netto, voicebot z integracjami, na przykład z kalendarzem, to 5000-9000 zł netto. Utrzymanie voicebota kosztuje 299-1500 zł netto miesięcznie, bo dochodzi telefonia i minuty rozmów.',
    },
  ],

  /* Jedna decyzja domykająca stronę: ustalmy próg. Mikrokopia powtarza dolny
     i górny próg z czasami, bo to ostatnie zdanie przed kliknięciem. Zgodnie
     z ustaleniem właściciela bezpłatna rozmowa to badanie potrzeb, więc
     obiecujemy tu policzenie na Twoich liczbach, a nie pomiar czy raport. */
  cta: {
    label: 'Sprawdźmy, który próg jest Twój',
    href: '#diagnoza',
    mikrokopia:
      'Wejście to 1790 zł netto i 1-2 dni robocze. Pełne integracje to 8000-15000 zł netto i 5-10 dni roboczych. Na bezpłatnej rozmowie policzymy to na Twoich liczbach i powiemy, w którym progu jesteś.',
    dowod:
      'Jeśli przy Twojej liczbie pytań bot się nie opłaci, usłyszysz to na tej samej rozmowie, zanim wystawimy jakąkolwiek fakturę.',
  },

  queries: [
    'ile kosztuje chatbot ai dla firmy',
    'cennik chatbota ai',
    'ile kosztuje chatbot',
    'chatbot ai dla firmy cena',
    'ile kosztuje wdrożenie chatbota',
    'chatbot dla firmy cennik 2026',
  ],

  /* POWIĄZANIA (pakiet §P1: obsługa klienta, baza wiedzy, sklep internetowy,
     voiceboty, Sprint Diagnostyczny) plus link zwrotny do rodzica z uwagi
     wdrożeniowej §4. Etykieta = H1 strony docelowej, opis = fakt, który stoi
     na tamtej stronie. ZERO KWOT w tej sekcji: kwoty zostają w sekcji ceny.

     DWIE KARTY DOŁOŻONE 2026-09-04 (wyrównanie linków przychodzących
     w gałęzi): `asystent-wewnetrzny` i `hotele-pensjonaty` miały odpowiednio
     jedno i zero wejść od sióstr, a rozdział intencji TEJ strony (nagłówek
     pliku) i tak każe odsyłać zastosowania i branże linkiem, zamiast opisywać
     je w cenniku. Obie karty realizują więc regułę, która stała tu od początku,
     tylko nie miała jeszcze celu w rejestrze. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firm',
        href: '/uslugi/chatboty',
        opis: 'Strona macierzysta: co bot robi, skąd bierze wiedzę i jak wygląda wdrożenie krok po kroku.',
      },
      {
        etykieta: 'Chatbot do obsługi klienta, który odpowiada o 22:00',
        href: '/uslugi/chatboty/obsluga-klienta',
        opis: 'Ten sam bot od strony biura obsługi: powtarzalne pytania, noce i weekendy, przekazanie trudnej sprawy człowiekowi.',
      },
      {
        etykieta: 'Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)',
        href: '/uslugi/chatboty/baza-wiedzy',
        opis: 'Skąd bot bierze odpowiedzi: szuka w Twoich dokumentach zamiast w internecie, więc nie zmyśla.',
      },
      {
        etykieta: 'Chatbot AI dla sklepu internetowego',
        href: '/uslugi/chatboty/sklep-internetowy',
        opis: 'Wariant z integracjami rozpisany na sklep: dostępność produktu, status zamówienia, zwroty i reklamacje.',
      },
      {
        etykieta: 'Asystent AI dla pracowników: procedury bez pytania kolegi',
        href: '/uslugi/chatboty/asystent-wewnetrzny',
        opis: 'Wariant dla zespołu, nie dla klienta: bot odpowiada z procedur, instrukcji i nagrań ze szkoleń, a bazę dzielimy na role.',
      },
      {
        etykieta: 'Chatbot dla hotelu i pensjonatu',
        href: '/uslugi/chatboty/hotele-pensjonaty',
        opis: 'Wersja branżowa dla obiektu noclegowego: sześć tematów pytań gościa, od dostępności i doby hotelowej po zwierzęta i parking.',
      },
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Kanał telefoniczny zamiast czatu: voicebot odbiera połączenia i nie wydzwania do Twoich klientów.',
      },
      {
        etykieta: 'Audyt AI firmy: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis: 'Sprint Diagnostyczny, gdy procesy nie są spisane: rozkładamy je na czynniki i oddajemy raport PDF z mapą procesów.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje chatbot dla firmy w 2026?',
        href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
        opis: 'Dłuższy rozkład kosztów wdrożenia i tego, co realnie wpływa na cenę bota.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis: 'Kalkulator liczy roczny koszt jednego procesu i moment, w którym wdrożenie się zwraca. Kwoty wpisujesz swoje.',
      },
    ],
  },
};
