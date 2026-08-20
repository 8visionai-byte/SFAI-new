import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 3 — ODBIERANIE TELEFONÓW
 * (`/uslugi/voiceboty/odbieranie-telefonow`).
 *
 * DLACZEGO TA PODSTRONA JEST PRIORYTETEM (dane GSC 28 dni, 2026-08-17):
 * to grupa fraz o NAJLEPSZYCH pozycjach w całym serwisie, czyli najkrótszy
 * dystans do pierwszej strony Google:
 *   bot telefoniczny                  30 wyśw. poz. 16,9
 *   bot do odbierania telefonów        5 wyśw. poz. 12,6
 *   voicebot do odbierania telefonów   4 wyśw. poz. 13,3
 *   bot telefoniczny numer             3 wyśw. poz. 15,0
 *   bot telefon / telefon bot          4 wyśw. poz.  8,0
 *   ai do odbierania telefonów         1 wyśw. poz. 12,0
 *   boty dzwoniące na telefon          1 wyśw. poz. 12,0
 *   usługa odbierania telefonów dla gabinetu  3 wyśw. poz. 43,7
 * Razem ~51 wyświetleń miesięcznie, zero kliknięć. Wszystkie trafiają dziś
 * na `/uslugi/voiceboty`, która odpowiada na kilkanaście intencji naraz.
 *
 * ROZDZIAŁ INTENCJI (żeby nie kanibalizować sąsiadów):
 *  - TA podstrona: „nikt nie odbiera telefonu, tracę zapytania". Punkt ciężkości
 *    to sam ODBIÓR połączenia i to, co się dzieje z nieodebraną sprawą.
 *  - `potwierdzanie-wizyt`: umawianie i potwierdzanie terminów.
 *  - `windykacja`: telefon przychodzący w sprawie płatności.
 *  - `/uslugi/voiceboty`: strona ogólna, frazy „voicebot", „voicebot dla firm".
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (zero nowych obietnic, wszystko już sprzedajemy):
 *  - odbieranie połączeń przychodzących 24/7 po polsku, notatka i podsumowanie
 *    po rozmowie, przekazywanie spraw trudnych, granice ustawia klient,
 *    zapowiedź „jestem asystentem AI" (AI Act), dane w UE + RODO + umowa
 *    powierzenia: lib/uslugi/voiceboty.ts (kapsula, rozwiazanie, faq),
 *  - „bot NIE dzwoni sam, obsługuje wyłącznie połączenia przychodzące,
 *    nigdy nie obiecuj kampanii wychodzących ani obdzwaniania bazy":
 *    api/_knowledge.mjs linia 56 (twarda reguła) + voiceboty.ts faq #2,
 *  - cena: TRZY OSOBNE POZYCJE voicebota (audyt
 *    `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §2, decyzje Pawła
 *    2026-08-19), wszystkie NETTO: stworzenie 2500 zł (prosty) albo
 *    5000-9000 zł (z integracjami), utrzymanie 299-1500 zł/mies. przy
 *    infrastrukturze u nas ALBO 0 zł/mies. przy przekazaniu jej klientowi
 *    (poprawki wtedy 350 zł netto za godzinę), zużycie (tokeny i minuty)
 *    wg realnego użycia po stronie klienta. Widełki 99-599 zł/mies. NIE
 *    dotyczą już voicebotów (zostają przy chatbotach, prostszych
 *    w utrzymaniu). `minPrice` 2500 bez zmian.
 *  - BRAK DANEJ (nie zmyślać): audyt nie podaje czasu wdrożenia voicebota
 *    w dniach roboczych. Strona mówi wyłącznie zasadę liczenia czasu (od
 *    przekazania kompletu materiałów) i kieruje po termin na diagnozę.
 *
 * ŻELAZNA GRANICA: strona mówi wyraźnie, że bot obsługuje telefon PRZYCHODZĄCY
 * i nie wydzwania do nikogo. Fraza „boty dzwoniące na telefon" przyciąga ludzi
 * szukających kampanii wychodzących, a tego nie robimy. Lepiej odfiltrować
 * złe zapytanie na stronie niż na rozmowie.
 *
 * v20 (SPEC v20, skarga Pawła „tekstów jest naprawdę dużo"): objętość ścięta
 * do poziomu strony macierzystej; `kroki[1].opis` był najdłuższym opisem kroku
 * w całym zestawie (36 słów przy 20 u rodzica). Wycięta wata: powtórzone
 * zaprzeczenie o połączeniach wychodzących (zostaje jedno w treści, jedno
 * w kapsule, jedno w FAQ) i zdania, które komponent RamaCeny.tsx sam drukuje
 * pod kartą („Dokładną cenę poznasz na bezpłatnej diagnozie, zanim cokolwiek
 * zamówisz. Bez ukrytych kosztów.").
 */
export const odbieranieTelefonow: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'odbieranie-telefonow',
  dataAktualizacji: '2026-08-21',

  // v20: 58 -> 44 znaków (pomiar §4b: 4 linie -> 3 na 1440, 5 -> 4 na 375/320).
  // Fraza obowiązkowa „bot telefoniczny" zostaje NA POCZĄTKU (poz. 16,9 w GSC),
  // „24/7" jest już w metaTitle, kapsule, tabeli i FAQ tej strony.
  h1: 'Bot telefoniczny, który odbiera telefon 24/7',

  kapsula:
    'Bot telefoniczny odbiera każdy telefon przychodzący, także po godzinach. Rozmawia po polsku, mówi, że jest asystentem AI, odpowiada na powtarzalne pytania z Twojego scenariusza i spisuje sprawę. Po rozmowie dostajesz podsumowanie. Bot nie dzwoni sam, obsługuje wyłącznie połączenia przychodzące.',

  metaTitle: 'Bot telefoniczny: odbiera połączenia 24/7',
  metaDescription:
    'Bot telefoniczny odbiera połączenia 24/7 po polsku, odpowiada na powtarzalne pytania i spisuje sprawę. Po rozmowie masz podsumowanie. Od 2500 zł netto.',

  problem: {
    h2: 'Ile zapytań tracisz, bo nikt nie odebrał telefonu?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Nie policzysz tego dziś, bo nieodebrane połączenie nie zostawia śladu ani w CRM, ani w skrzynce. Dzwoniący rzadko wraca: zwykle wybiera następny numer z listy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Czego nie widzisz, gdy telefon dzwoni bez odbioru?',
        ikona: 'lupa-wykres',
        chip: 'SKALA PROBLEMU',
        overline: 'NIEODEBRANE POŁĄCZENIE · ZERO ŚLADU W CRM',
      },
      {
        typ: 'akapit',
        tekst: 'Nie odbierasz, bo jesteś u klienta, za kierownicą albo w gabinecie z pacjentem. Po godzinach pracy telefonu nie odbiera nikt, a dzwoniący nie czeka do rana. Wieczory i weekendy to zapytania, których nawet nie zobaczysz.',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Poczta głosowa nie ratuje sprawy',
            akapity: [
              'Dzwoniący słyszy sygnał albo pocztę głosową i rozłącza się bez wiadomości. Nagrywanie się na automat to dla niego strata czasu, skoro obok jest firma, która po prostu odbiera.',
            ],
            punkty: [
              'Nawet zostawiona wiadomość czeka, aż ktoś ją odsłucha, więc odpowiedź i tak przychodzi z opóźnieniem.',
            ],
          },
          {
            naglowek: 'Zostaje samo nieodebrane',
            akapity: [
              'Na liście połączeń masz numer i godzinę, nic więcej. Bez tematu i bez kontekstu nie wiesz, czy dzwonił nowy klient z pytaniem o wycenę, czy ktoś pomylił numer.',
            ],
            punkty: [
              'Sprawa znika razem z połączeniem, bo nie ma wpisu, do którego mógłbyś wrócić.',
            ],
          },
          {
            naglowek: 'Oddzwaniasz od zera',
            akapity: [
              'Zaczynasz rozmowę bez wiedzy, o co chodziło, i pytasz o wszystko drugi raz. Dzwoniący opowiada sprawę od początku.',
            ],
            punkty: [
              'Nie wiesz nawet, czy to pilna sprawa, czy pytanie o godziny otwarcia.',
            ],
          },
          {
            naglowek: 'Telefon przerywa spotkanie',
            akapity: [
              'Dzwonek w trakcie rozmowy zabiera uwagę klientowi, który siedzi przed Tobą.',
            ],
            punkty: [
              'Odbierzesz i tracisz wątek, nie odbierzesz i tracisz zapytanie.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Połowa tych rozmów to w kółko te same pytania',
        akapity: [
          'Dzwoniący pytają zwykle o to samo: czy jest wolny termin, ile to kosztuje i do której pracujecie. Odpowiadasz na te pytania po raz kolejny tego samego dnia.',
          'W gabinecie wygląda to tak samo: rejestracja pacjentów, wolne terminy i godziny przyjęć wracają w co drugiej rozmowie. To odpowiedzi, które się nie zmieniają.',
        ],
        wariant: 'quiet',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co się dzieje, gdy telefon odbiera bot?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Bot telefoniczny odbiera każde połączenie przychodzące 24/7, na starcie mówi, że jest asystentem AI, i odpowiada na powtarzalne pytania z Twojego scenariusza. To obsługa klienta 24/7 przez voicebota: bot odbiera, a Ty po każdej rozmowie dostajesz podsumowanie.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Jak wygląda rozmowa od odebrania do podsumowania?',
        ikona: 'sluchawka-fala',
        chip: 'PRZEBIEG ROZMOWY',
        overline: 'ODBIERA · ODPOWIADA · SPISUJE · PRZEKAZUJE',
      },
      {
        typ: 'siatka',
        kolumny: 4,
        karty: [
          {
            naglowek: 'Bot odbiera o każdej porze',
            akapity: [
              'Na starcie rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act i tak ma być.',
            ],
            punkty: [
              'Odbiera także wieczorem i w weekend, gdy u Ciebie nie ma nikogo.',
            ],
          },
          {
            naglowek: 'Odpowiada ze scenariusza',
            akapity: [
              'Mówi to, co do niego wpiszesz: godziny otwarcia, dojazd, zakres usług, orientacyjne ceny.',
            ],
            punkty: [
              'Rozmawia po polsku i tylko w granicach, które zatwierdzisz.',
            ],
          },
          {
            naglowek: 'Sprawę nietypową spisuje',
            akapity: [
              'Pytanie spoza scenariusza przekazuje dalej razem z notatką z rozmowy.',
            ],
            punkty: [
              'Nie zmyśla odpowiedzi, gdy sprawa wykracza poza scenariusz.',
            ],
          },
          {
            naglowek: 'Ty dostajesz podsumowanie',
            akapity: [
              'Po każdej rozmowie widzisz, kto dzwonił, o co pytał i co bot ustalił.',
            ],
            punkty: [
              'Oddzwaniasz przygotowany, bo notatka z rozmowy czeka na Ciebie.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Granice ustawiasz Ty: bot mówi tylko to, co jest w scenariuszu',
        akapity: [
          'Bot nie zmyśla odpowiedzi. Gdy pytanie wykracza poza scenariusz, spisuje sprawę i przekazuje ją człowiekowi. Takie AI do odbierania telefonów mówi tylko to, co zatwierdzisz, i nic ponad to.',
          'Dzięki notatce oddzwaniasz przygotowany, zamiast zaczynać od pytania, w czym mogę pomóc. Bot zdejmuje z Ciebie pytania powtarzalne, a trudne sprawy zostawia Tobie.',
        ],
        wariant: 'top',
      },
      {
        typ: 'sekcja',
        naglowek: 'Bot nie dzwoni sam do nikogo',
        akapity: [
          'Bot obsługuje wyłącznie połączenia przychodzące. Sprawę do oddzwonienia zapisuje i powiadamia Cię, a kontakt zaczyna człowiek. Nie budujemy botów do obdzwaniania bazy.',
        ],
        wariant: 'quiet',
        chip: 'ZASADA',
      },
    ],
  },

  /* v20 — DWIE poprawki, obie zmierzone (raporty/pomiary-v20.md):
     1. `wiersze[0].zNami` MUSI zawierać „24/7". Poprzednie brzmienie („Odebrane
        i zapisane, też w nocy i w weekend") tego ciągu nie miało, więc bramka
        w ServiceHero.kafleStatystyk nie łapała wiersza i hero tej podstrony
        renderowało 3 kafle zamiast 4 (u rodzica i u dwóch sióstr: 4). Zero
        nowego faktu: 24/7 stoi już w H1, metaTitle, kapsule i FAQ tej strony.
     2. `cecha` średnio 25 znaków przy 12 u rodzica: komórki łamały się na dwie
        linie i sekcja tabeli była najwyższa w całym zestawie (860 px vs 728). */
  tabelaPorownawcza: {
    h2: 'Nieodebrany telefon a telefon odebrany przez bota',
    naglowekBez: 'Telefon bez odbioru',
    naglowekZNami: 'Bot telefoniczny od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Godziny',
        bez: 'Sygnał albo poczta głosowa',
        zNami: '24/7, też w nocy i w weekend',
      },
      {
        cecha: 'Dzwoniący',
        bez: 'Wybiera kolejny numer z listy',
        zNami: 'Dostaje odpowiedź od razu',
      },
      {
        cecha: 'Częste pytania',
        bez: 'Za każdym razem Ty',
        zNami: 'Bot odpowiada ze scenariusza',
      },
      {
        cecha: 'Ślad po rozmowie',
        bez: 'Nieodebrane i tyle',
        zNami: 'Podsumowanie: kto dzwonił i po co',
      },
      {
        cecha: 'Sprawa nietypowa',
        bez: 'Oddzwaniasz i zaczynasz od zera',
        zNami: 'Spisana i przekazana z notatką',
      },
      {
        cecha: 'Spotkanie z klientem',
        bez: 'Telefon przerywa rozmowę',
        zNami: 'Bot odbiera, Ty kończysz',
      },
    ],
  },

  kroki: {
    h2: 'Jak uruchamiamy bota na Twoim numerze?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Sprawdzamy, ile połączeń zostaje bez odbioru i o co dzwoniący pytają najczęściej. Mówimy wprost, czy bot się opłaca.',
      },
      {
        tytul: 'Scenariusz i numer',
        opis:
          'Wpisujemy odpowiedzi na najczęstsze pytania i ustawiamy granice: co bot mówi, a czego nie mówi nigdy. Podłączamy numer. Testujemy na żywo.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Słuchamy rozmów, poprawiamy odpowiedzi i dokładamy scenariusze. Widzisz, które sprawy bot załatwił sam, a które przekazał człowiekowi.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje bot do odbierania telefonów?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Stworzenie bota to jednorazowo 2500 zł netto za wersję prostą, czyli pakiet startowy: bot odbiera telefon 24/7 po polsku, ma skonfigurowane scenariusze i podłączony numer. Wersja z integracjami i rozbudowanymi scenariuszami to 5000 do 9000 zł netto. Płacisz trzy osobne pozycje: stworzenie, utrzymanie i zużycie, nie jeden abonament.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '2500 zł netto',
            opis: 'stworzenie bota w wersji prostej, pakiet startowy',
            zrodlo: 'próg 1 przełącznika niżej',
            ton: 'cyan',
          },
          {
            wartosc: '3-5 dni roboczych',
            opis: 'tyle powstaje bot w wersji prostej',
            zrodlo: 'próg 1 przełącznika niżej',
            ton: 'violet',
          },
          {
            wartosc: '0 zł/mies.',
            opis: 'utrzymanie po przekazaniu infrastruktury Tobie',
            zrodlo: 'wiersz Utrzymanie w tabeli niżej',
            ton: 'green',
          },
          {
            wartosc: '350 zł netto/h',
            opis: 'poprawki po przekazaniu infrastruktury',
            zrodlo: 'wiersz Utrzymanie w tabeli niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Za co dokładnie płacisz przy bocie telefonicznym?',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'CENNIK · STWORZENIE · UTRZYMANIE · ZUŻYCIE',
      },
      {
        typ: 'przelacznik',
        grupa: 'odbieranie-telefonow-progi',
        opcje: [
          {
            numer: 'PRÓG 1',
            tytul: 'Wersja prosta',
            podtytul: '2500 zł netto',
            naglowek: 'Wersja prosta to 2500 zł netto jednorazowo i 3 do 5 dni roboczych.',
            akapity: [
              'To pakiet startowy: bot odbiera telefon 24/7 po polsku, ma skonfigurowane scenariusze i podłączony numer. Tyle wystarcza, gdy chcesz przestać tracić połączenia po godzinach.',
            ],
            punkty: [
              'Na starcie rozmowy bot mówi, że jest asystentem AI, i odpowiada na powtarzalne pytania.',
              'Po każdej rozmowie dostajesz podsumowanie: kto dzwonił i o co pytał.',
              'Czas 3 do 5 dni roboczych liczymy od przekazania kompletu materiałów.',
            ],
          },
          {
            numer: 'PRÓG 2',
            tytul: 'Z integracjami',
            podtytul: '5000-9000 zł netto',
            naglowek: 'Wersja z integracjami to 5000 do 9000 zł netto i 5 do 25 dni roboczych.',
            akapity: [
              'Ten próg wybierasz, gdy bot ma pracować z Twoimi systemami i prowadzić rozbudowane scenariusze rozmowy. Zakres ustalamy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
            ],
            punkty: [
              'Rozbudowane scenariusze: więcej pytań i więcej ścieżek rozmowy.',
              'Termin 5 do 25 dni roboczych zależy od tego, ile systemów podłączamy.',
              'Granice zostają te same: bot obsługuje wyłącznie połączenia przychodzące.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Pozycja',
          'Ile płacisz',
          'Charakter',
        ],
        wiersze: [
          [
            'Stworzenie',
            '2500 zł netto za wersję prostą albo 5000-9000 zł netto z integracjami',
            'jednorazowo',
          ],
          [
            'Utrzymanie',
            '299-1500 zł netto/mies. u nas albo 0 zł/mies. po przekazaniu infrastruktury (poprawki 350 zł netto/h)',
            'miesięcznie, dwa modele do wyboru',
          ],
          [
            'Zużycie',
            'tokeny i minuty rozmów według realnego użycia',
            'po Twojej stronie',
          ],
        ],
        wKarcie: true,
        podpis: 'Trzy osobne pozycje kosztu bota telefonicznego, wszystkie kwoty netto.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dwie rundy poprawek w cenie, czas liczony od kompletu materiałów',
        akapity: [
          'Mówimy wprost, co jest w cenie, zanim cokolwiek zamówisz. Te zasady dotyczą każdego bota telefonicznego, którego budujemy.',
        ],
        punkty: [
          'W cenie wdrożenia są dwie rundy poprawek: tydzień testów, poprawki, drugi tydzień testów, poprawki i odbiór.',
          'Czas wdrożenia liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
          'Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze.',
          'Po wdrożeniu wybierasz jeden z dwóch modeli rozliczenia: infrastruktura zostaje u nas za opłatą miesięczną albo przekazujemy ją Tobie i nie płacisz abonamentu.',
          'Termin dla Twojego scenariusza potwierdzamy na bezpłatnej diagnozie: 0 zł, około 30 minut.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
    ],
    minPrice: 2500,
    linkPoradnik: {
      przed: 'Pozostałe zastosowania i pełny zakres opisaliśmy na stronie ',
      etykieta: 'voiceboty dla firm',
      po: '.',
      href: '/uslugi/voiceboty',
    },
  },

  faq: [
    {
      pytanie: 'Czy bot telefoniczny dzwoni sam do klientów?',
      odpowiedz:
        'Nie. Nasz bot obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Jeśli szukasz rozwiązania do obdzwaniania bazy, to nie jest usługa dla Ciebie.',
    },
    {
      pytanie: 'Czy dzwoniący pozna, że rozmawia z botem?',
      odpowiedz:
        'Tak, i tak ma być. Bot na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act. Brzmi naturalnie i po polsku, ale nikogo nie udaje.',
    },
    {
      pytanie: 'Co się dzieje, gdy bot nie zna odpowiedzi?',
      odpowiedz:
        'Nie zmyśla. Spisuje sprawę i przekazuje ją człowiekowi razem z notatką z rozmowy. Ty dostajesz podsumowanie i oddzwaniasz przygotowany, zamiast zaczynać od pytania, w czym mogę pomóc.',
    },
    {
      pytanie: 'Czy bot zadziała na moim obecnym numerze?',
      odpowiedz:
        'Numer i sposób podłączenia ustalamy na diagnozie, bo to zależy od tego, u kogo masz dziś telefon. To część wdrożenia, nie osobny koszt do odkrycia później.',
    },
    {
      pytanie: 'Czy nagrania rozmów są bezpieczne pod kątem RODO?',
      odpowiedz:
        'Tak. Dane z rozmów zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty decydujesz, co bot nagrywa i przechowuje.',
    },
    {
      pytanie: 'Ile kosztuje bot do odbierania telefonów?',
      odpowiedz:
        'Koszt dzieli się na trzy osobne pozycje. Stworzenie bota: 2500 zł netto jednorazowo za wersję prostą albo 5000 do 9000 zł netto za wersję z integracjami. Utrzymanie: 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie. Zużycie: tokeny i minuty rozmów według realnego użycia, po Twojej stronie.',
    },
  ],

  cta: {
    label: 'Policz moje nieodebrane telefony',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy, ile połączeń zostaje dziś bez odbioru i ile z nich odbierze bot. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  queries: [
    'bot telefoniczny',
    'bot do odbierania telefonów',
    'voicebot do odbierania telefonów',
    'ai do odbierania telefonów',
    'bot telefoniczny numer',
    'usługa odbierania telefonów dla gabinetu',
  ],

  /* v22 (linki §3, P1 #4): podstrona miała 3 linki wchodzące i ZERO wyjścia do
     poradnika oraz narzędzia. `linkPoradnik` w ramie ceny trzyma powrót do
     rodzica, więc poradnik i kalkulator wchodzą tędy. */
  powiazane: {
    poradniki: [
      {
        etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis: 'Widełki 2026, od czego zależy cena i jak policzyć zwrot z wdrożenia.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Policz, ile złotych rocznie kosztuje odbieranie tych samych pytań i nieodebrane połączenia.',
      },
    ],
  },
};
