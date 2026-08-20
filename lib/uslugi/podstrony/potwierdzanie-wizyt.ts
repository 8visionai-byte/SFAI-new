import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 2 — POTWIERDZANIE WIZYT
 * (`/uslugi/voiceboty/potwierdzanie-wizyt`).
 * Fraza primary z GSC: „voicebot do potwierdzania wizyt" (strona macierzysta
 * rankuje na nią z pozycji ~31 razem z dziewięcioma innymi intencjami).
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (zero nowych obietnic):
 *  - odbieranie połączeń 24/7 po polsku, umawianie wizyt i zapis w kalendarzu,
 *    wysyłka potwierdzenia, przekazywanie spraw trudnych z notatką, zapowiedź
 *    „jestem asystentem AI" (AI Act): lib/uslugi/voiceboty.ts (kapsula,
 *    rozwiazanie, faq „Czy voicebot umówi wizytę w moim kalendarzu?"),
 *  - „bot NIE dzwoni sam, obsługuje wyłącznie połączenia przychodzące,
 *    można ustawić SMS z numerem firmy": api/_knowledge.mjs linia 56 +
 *    voiceboty.ts faq #2,
 *  - potwierdzenia i przypomnienia wychodzą same, tekstem, z automatu:
 *    lib/uslugi/automatyzacje.ts (rozwiazanie.tresc, faq),
 *  - cena: TRZY OSOBNE POZYCJE voicebota (audyt
 *    `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §2, decyzje Pawła
 *    2026-08-19), wszystkie NETTO: stworzenie 2500 zł (prosty) albo
 *    5000-9000 zł (z integracjami; TA podstrona sprzedaje wprost integrację
 *    z kalendarzem, więc próg wyższy jest tu realną opcją, nie ozdobą),
 *    utrzymanie 299-1500 zł/mies. przy infrastrukturze u nas ALBO 0 zł/mies.
 *    przy przekazaniu jej klientowi (poprawki wtedy 350 zł netto za godzinę),
 *    zużycie (tokeny i minuty) wg realnego użycia po stronie klienta.
 *    Widełki 99-599 zł/mies. NIE dotyczą już voicebotów (zostają przy
 *    chatbotach). `minPrice` 2500 bez zmian.
 *  - BRAK DANEJ (nie zmyślać): audyt nie podaje czasu wdrożenia voicebota
 *    w dniach roboczych. Zostaje sama zasada liczenia czasu.
 *
 * ŻELAZNA GRANICA TEJ PODSTRONY (decyzja Pawła):
 *  Rynek pod frazą „potwierdzanie wizyt" rozumie zwykle bota, który OBDZWANIA
 *  klientów dzień przed terminem. My tego nie robimy i strona mówi to wprost.
 *  Nasze potwierdzanie wizyt to: umówienie i zapis terminu w rozmowie
 *  przychodzącej, potwierdzenie wysłane tekstem oraz obsługa odwołań i zmian,
 *  gdy klient dzwoni. Zdanie o braku połączeń wychodzących stoi w kapsule,
 *  w treści i w pierwszym pytaniu FAQ.
 *
 * v20 (SPEC v20, skarga Pawła „tekstów jest naprawdę dużo"): objętość ścięta
 * do poziomu strony macierzystej. Wycięta wata: scenki wprowadzające w
 * `problem`, drugie zaprzeczenie o połączeniach wychodzących w `rozwiazanie`
 * (zostaje jedno) i zdania, które komponent RamaCeny.tsx sam drukuje pod kartą
 * („Dokładną cenę poznasz na bezpłatnej diagnozie... Bez ukrytych kosztów.").
 */
export const potwierdzanieWizyt: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'potwierdzanie-wizyt',
  dataAktualizacji: '2026-08-21',

  // v20: 64 -> 36 znaków. Jedyny kandydat z pomiaru (§4b), który łamie się na
  // 3 linie na WSZYSTKICH trzech szerokościach (1440/375/320) i nie zostawia
  // sieroty. Fraza główna „voicebot do potwierdzania wizyt" w całości na
  // początku; „24/7" jest już w metaTitle, kapsule, tabeli i FAQ tej strony.
  h1: 'Voicebot do potwierdzania wizyt 24/7',

  kapsula:
    'Voicebot do potwierdzania wizyt odbiera telefon 24/7, umawia termin, zapisuje go w Twoim kalendarzu i wysyła potwierdzenie. Odwołania i zmiany terminu załatwia bez Ciebie. Rozmawia po polsku i mówi, że jest asystentem AI. Nie dzwoni sam: potwierdzenia i przypomnienia idą tekstem.',

  metaTitle: 'Voicebot do potwierdzania wizyt: umawia 24/7',
  metaDescription:
    'Voicebot do potwierdzania wizyt odbiera telefon 24/7, zapisuje termin w kalendarzu i wysyła potwierdzenie. Odwołania załatwia bez Ciebie. Od 2500 zł netto.',

  problem: {
    h2: 'Ile wizyt przepada, bo nikt nie odebrał telefonu?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Wizyta przepada w trzech momentach: gdy nikt nie odbiera telefonu, gdy odwołanie ląduje wieczorem na poczcie głosowej i gdy rano zostaje pusta godzina w grafiku. Każdy z nich kosztuje Cię realny termin, którego już nikomu nie sprzedasz.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '24/7',
            opis: 'godziny, w których telefon o wizytę może zadzwonić, a przy kalendarzu prowadzonym ręcznie odbierasz tylko wtedy, gdy możesz',
            zrodlo: 'wiersz Telefon od klienta, kolumna Kalendarz prowadzony ręcznie w tabeli porównawczej niżej',
            ton: 'amber',
          },
          {
            wartosc: '3 momenty',
            opis: 'kiedy wizyta przepada: brak odbioru, odwołanie na poczcie głosowej, pusta godzina rano',
            zrodlo: 'lead tej sekcji',
            ton: 'violet',
          },
          {
            wartosc: '0 zł',
            opis: 'diagnoza, na której policzymy Twoje przepadające telefony',
            zrodlo: 'krok 1 wdrożenia: Diagnoza (bezpłatna)',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Klient dzwoni, żeby się umówić, i trafia na sygnał. Drugi odwołuje jutrzejszy termin wieczorem, na poczcie głosowej, której nikt nie odsłucha przed rankiem. Rano w grafiku stoi dziura.',
      },
      {
        typ: 'lista',
        punkty: [
          'Telefon dzwoni, gdy recepcja jest zajęta albo gabinet już zamknięty. Klient nie czeka na sygnał, tylko umawia się tam, gdzie ktoś odebrał.',
          'Odwołanie nagrane wieczorem na pocztę głosową odsłuchasz dopiero rano. W grafiku zostaje pusta godzina, której nie zdążysz nikomu oddać.',
          'Rejestracja odpowiada w kółko na te same pytania: kiedy, gdzie, ile trwa wizyta. Każda taka rozmowa blokuje telefon dla klienta, który chce się umówić.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Ten problem ma każde miejsce, które żyje z kalendarza',
        wariant: 'edge',
        akapity: [
          'Gabinet, salon, serwis, przychodnia i klinika: wszędzie tam telefon o wizytę przychodzi wtedy, kiedy przychodzi. Klient nie sprawdza, czy akurat masz wolne ręce, tylko dzwoni w przerwie w swojej pracy.',
          'Przy rejestracji pacjentów te same pytania wracają przez cały dzień. Kto pyta o godzinę, kto o adres, kto o to, ile wizyta trwa. Każda taka rozmowa blokuje linię komuś, kto chce się zapisać.',
          'Potwierdzanie wizyt bez recepcji to alternatywa dla dokładania etatu. Stawka jest prosta: pełny grafik zamiast pustych godzin i spokojna głowa, gdy telefon dzwoni po zamknięciu.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jak voicebot umawia i potwierdza wizytę?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Voicebot do umawiania wizyt odbiera telefon 24/7, widzi wolne terminy w Twoim kalendarzu i zapisuje wizytę w trakcie rozmowy. Potwierdzenie wychodzi tekstem od razu po rozmowie.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Voicebot do umawiania wizyt: co robi w trakcie rozmowy',
        ikona: 'kalendarz-check',
        chip: 'VOICEBOTY',
        overline: 'JAK TO DZIAŁA · ODBIERA, ZAPISUJE, POTWIERDZA',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Czy voicebot umówi wizytę w moim kalendarzu?',
            akapity: [
              'Tak. Bot telefoniczny umawia wizyty prosto w Twoim kalendarzu. Łączymy voicebota z Twoim grafikiem, więc bot nie zgaduje terminów, tylko naprawdę je widzi. Wizyta trafia do grafiku bez ręcznego wpisywania.',
            ],
            punkty: [
              'Automatyczne umawianie wizyt przez telefon działa także po godzinach i w weekend, gdy gabinet jest już zamknięty.',
              'Widzi wolne terminy i proponuje je dzwoniącemu.',
              'Zapisuje wizytę w trakcie rozmowy, nie po niej.',
              'Potwierdzenie idzie tekstem, można ustawić SMS z numerem Twojej firmy.',
            ],
          },
          {
            naglowek: 'Co się dzieje, gdy klient chce odwołać albo przełożyć wizytę?',
            akapity: [
              'Gdy klient dzwoni odwołać wizytę, bot przyjmuje odwołanie w rozmowie i od razu zwalnia termin w kalendarzu. Przy przełożeniu proponuje wolne godziny i zapisuje nowy termin, a Ty widzisz zmianę w grafiku.',
            ],
            punkty: [
              'Zwolniony termin wraca do puli od razu, nie rano po odsłuchaniu poczty głosowej.',
              'Tak wygląda rejestracja bez recepcji: działa też wtedy, gdy wszyscy są zajęci albo w gabinecie nie ma już nikogo.',
              'Zmianę widzisz w tym samym kalendarzu, w którym pracujesz na co dzień.',
            ],
          },
          {
            naglowek: 'Co bot robi ze sprawą, której nie zna?',
            akapity: [
              'Nie zgaduje i nie wpisuje niczego do grafiku na wyczucie. Spisuje temat rozmowy i numer telefonu, oznacza połączenie jako do oddzwonienia i uprzedza dzwoniącego, że wróci do niego człowiek z Twojej firmy.',
              'Dzięki temu w kalendarzu nie ląduje termin ustalony po omacku, a Ty wracasz do klienta, wiedząc już, o co chodziło w rozmowie.',
            ],
            punkty: [
              'Listę tematów kierowanych do człowieka układasz przed startem, przy scenariuszach rozmowy.',
              'Na powtarzalne pytania o wizytę bot odpowiada ze scenariusza, bez angażowania rejestracji.',
              'Notatka z rozmowy trafia tam, gdzie prowadzisz kontakt z klientem, razem z numerem i godziną telefonu.',
              'Dzwoniący słyszy, kiedy odezwie się człowiek, więc nie odkłada słuchawki z niczym.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Voicebot nie dzwoni sam i nie udaje człowieka',
        wariant: 'edge',
        chip: 'ZASADA',
        akapity: [
          'Rynek często rozumie potwierdzanie wizyt jako bota, który obdzwania klientów dzień przed terminem. My takich botów nie robimy i mówimy to wprost.',
          'Nasze potwierdzanie wizyt zaczyna się od telefonu klienta. Bot odbiera, umawia, zapisuje termin i wysyła potwierdzenie tekstem. Kontakt w drugą stronę zawsze zaczyna człowiek.',
        ],
        punkty: [
          'Voicebot obsługuje wyłącznie połączenia przychodzące. Przypomnienie o wizycie idzie tekstem.',
          'Na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act.',
          'Sprawy spoza scenariusza przekazuje Tobie z notatką z rozmowy.',
          'Rozmawia po polsku i brzmi naturalnie, ale nikogo nie udaje.',
        ],
      },
    ],
  },

  /* v20: komórki skrócone do długości rodzica (cecha ~12 zn, zNami ~30 zn),
     żeby wiersze nie łamały się na dwie linie (pomiar §2d: +79 px na sekcji).
     Wiersz 1 MUSI zawierać „24/7" w kolumnie zNami: to bramka czwartego kafla
     statystyk w hero (ServiceHero.kafleStatystyk), a etykietą kafla jest
     `cecha` tego wiersza. */
  tabelaPorownawcza: {
    h2: 'Umawianie i potwierdzanie wizyt ręcznie a z voicebotem',
    naglowekBez: 'Kalendarz prowadzony ręcznie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Telefon od klienta',
        bez: 'Odbierasz, gdy możesz',
        zNami: '24/7, też wieczorem i w weekend',
      },
      {
        cecha: 'Zapis terminu',
        bez: 'Ręcznie, w przerwie',
        zNami: 'Zapis w kalendarzu od razu',
      },
      {
        cecha: 'Potwierdzenie',
        bez: 'Jeśli ktoś zdąży',
        zNami: 'Wychodzi tekstem po rozmowie',
      },
      {
        cecha: 'Odwołanie wizyty',
        bez: 'Poczta głosowa odsłuchana rano',
        zNami: 'Bot zwalnia termin od razu',
      },
      {
        cecha: 'Zmiana terminu',
        bez: 'Telefon i ustalanie od nowa',
        zNami: 'Bot proponuje wolne godziny',
      },
      {
        cecha: 'Pytania o wizytę',
        bez: 'Za każdym razem Ty',
        zNami: 'Bot odpowiada ze scenariusza',
      },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy voicebota do umawiania wizyt?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Sprawdzamy, ile telefonów o wizyty przepada i jak dziś prowadzisz kalendarz. Mówimy wprost, czy voicebot się opłaca.',
      },
      {
        tytul: 'Kalendarz i scenariusze',
        opis:
          'Podłączamy kalendarz i numer, ustawiamy zasady: jakie terminy bot proponuje, ile trwa wizyta, co robi przy odwołaniu. Testujemy na żywo.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Słuchamy rozmów, poprawiamy odpowiedzi, dokładamy scenariusze. Widzisz, ile wizyt bot umówił i ile terminów zwolnił.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot do potwierdzania wizyt?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Stworzenie voicebota do potwierdzania wizyt to 2500 zł netto jednorazowo za pakiet startowy z wdrożeniem i konfiguracją albo 5000 do 9000 zł netto za wersję z integracją z Twoim kalendarzem. Do tego dochodzą dwie osobne pozycje: utrzymanie i zużycie, obie policzone niżej.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '2500 zł netto',
            opis: 'pakiet startowy: bot odbiera telefon 24/7 po polsku, z wdrożeniem i konfiguracją',
            zrodlo: 'próg 1 z przełącznika niżej',
            ton: 'cyan',
          },
          {
            wartosc: '5000-9000 zł netto',
            opis: 'wersja z integracją z kalendarzem i rozbudowanymi scenariuszami',
            zrodlo: 'próg 2 z przełącznika niżej',
            ton: 'violet',
          },
          {
            wartosc: '0 zł/mies.',
            opis: 'utrzymanie po przekazaniu Ci infrastruktury',
            zrodlo: 'wiersz Utrzymanie w tabeli niżej',
            ton: 'green',
          },
          {
            wartosc: '350 zł netto/h',
            opis: 'poprawki, gdy infrastruktura jest po Twojej stronie',
            zrodlo: 'sekcja Czy muszę płacić abonament co miesiąc niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Za co dokładnie płacę przy voicebocie?',
        ikona: 'sluchawka-fala',
        chip: 'CENNIK',
        overline: 'RAMA CENY · TRZY OSOBNE POZYCJE, KAŻDA NETTO',
      },
      {
        typ: 'przelacznik',
        grupa: 'potwierdzanie-wizyt-progi',
        opcje: [
          {
            numer: 'PRÓG 1',
            tytul: 'Pakiet startowy',
            podtytul: '2500 zł netto',
            naglowek: 'Pakiet startowy kosztuje 2500 zł netto i powstaje w 3 do 5 dni roboczych.',
            akapity: [
              'Bot odbiera telefon 24/7 po polsku, prowadzi rozmowę o wizycie i przekazuje Ci sprawy spoza scenariusza. W cenie jest wdrożenie i konfiguracja.',
            ],
            punkty: [
              'Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
              'Dobry wybór, gdy chcesz najpierw sprawdzić, ile telefonów o wizyty bot faktycznie obsłuży.',
              'Kalendarz można podłączyć później, jako rozbudowę wycenianą osobno.',
            ],
          },
          {
            numer: 'PRÓG 2',
            tytul: 'Z integracją z kalendarzem',
            podtytul: '5000-9000 zł netto',
            naglowek: 'Wersja z integracją z kalendarzem kosztuje 5000 do 9000 zł netto i powstaje w 5 do 25 dni roboczych.',
            akapity: [
              'Tu bot widzi wolne terminy w Twoim grafiku, zapisuje wizytę w trakcie rozmowy i zwalnia termin przy odwołaniu. To wersja, którą opisuje cała ta strona.',
            ],
            punkty: [
              'Widełki zależą od liczby integracji i od tego, ile scenariuszy bot ma obsłużyć.',
              'Dokładny termin dla Twojego kalendarza potwierdzamy po bezpłatnej diagnozie.',
              'W obu progach masz dwie rundy poprawek w cenie wdrożenia.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Pozycja',
          'Ile',
          'Kiedy płacisz',
        ],
        wiersze: [
          [
            'Stworzenie bota',
            '2500 zł netto (pakiet startowy) albo 5000-9000 zł netto z integracją z kalendarzem',
            'jednorazowo',
          ],
          [
            'Utrzymanie',
            '299-1500 zł netto/mies. przy infrastrukturze u nas albo 0 zł/mies. po jej przekazaniu Tobie',
            'co miesiąc albo wcale',
          ],
          [
            'Zużycie',
            'tokeny i minuty rozmów według realnego użycia',
            'po Twojej stronie, wg użycia',
          ],
        ],
        wKarcie: true,
        podpis: 'Trzy osobne pozycje kosztu voicebota, każda kwota netto',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy muszę płacić abonament co miesiąc?',
        wariant: 'top',
        chip: 'CENNIK',
        akapity: [
          'Nie musisz. Masz dwa modele rozliczenia i wybierasz przed startem. Gdy infrastruktura zostaje u nas, utrzymanie to 299 do 1500 zł netto miesięcznie. Gdy przekazujemy ją Tobie, płacisz 0 zł miesięcznie, a poprawki kosztują 350 zł netto za godzinę.',
          'Trzecia pozycja to zużycie: tokeny i minuty rozmów według realnego użycia, po Twojej stronie. Rozbijamy koszt na trzy jawne pozycje, żeby jeden abonament nie zasłaniał tego, za co naprawdę płacisz.',
          'Czas wdrożenia liczymy od przekazania kompletu materiałów, nie od podpisania umowy. W cenie wdrożenia są dwie rundy poprawek: tydzień testów, poprawki, drugi tydzień testów, poprawki i odbiór.',
          'To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze. Nowe funkcje to już rozbudowa wyceniana osobno, i mówimy o tym, zanim cokolwiek zamówisz.',
        ],
      },
    ],
    minPrice: 2500,
    linkPoradnik: {
      przed: 'Pełny zakres i pozostałe zastosowania opisaliśmy na stronie ',
      etykieta: 'voiceboty dla firm',
      po: '.',
      href: '/uslugi/voiceboty',
    },
  },

  faq: [
    {
      pytanie: 'Czy voicebot dzwoni z przypomnieniem o wizycie?',
      odpowiedz:
        'Nie. Nasz voicebot obsługuje wyłącznie połączenia przychodzące. Przypomnienie o wizycie wychodzi tekstem, a gdy klient oddzwania, telefon odbiera bot i załatwia sprawę. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy.',
    },
    {
      pytanie: 'Czy voicebot umówi wizytę w moim kalendarzu?',
      odpowiedz:
        'Tak. Łączymy go z Twoim kalendarzem, więc bot widzi wolne terminy, proponuje je klientowi i zapisuje wizytę od razu. Wysyła też potwierdzenie. Ty masz aktualny kalendarz bez ręcznego wpisywania.',
    },
    {
      pytanie: 'Co się dzieje, gdy klient chce odwołać albo przełożyć wizytę?',
      odpowiedz:
        'Bot przyjmuje odwołanie w rozmowie i zwalnia termin w kalendarzu, a przy przełożeniu proponuje wolne godziny i zapisuje nowy termin. Zmianę widzisz od razu.',
    },
    {
      pytanie: 'Czy dzwoniący pozna, że rozmawia z botem?',
      odpowiedz:
        'Tak, i tak ma być. Voicebot na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act. Brzmi naturalnie i po polsku, ale nikogo nie udaje.',
    },
    {
      pytanie: 'Co, jeśli sprawa jest zbyt trudna dla bota?',
      odpowiedz:
        'Wtedy voicebot nie udaje, że wie. Bierze kontakt, zapisuje, czego dotyczy sprawa, i mówi klientowi, że oddzwonisz. Ty dostajesz podsumowanie i oddzwaniasz przygotowany. Z góry ustawiasz, które sprawy bot ma przekazywać dalej.',
    },
    {
      pytanie: 'Ile kosztuje voicebot do potwierdzania wizyt?',
      odpowiedz:
        'Koszt dzieli się na trzy osobne pozycje. Stworzenie bota: 2500 zł netto jednorazowo za wersję prostą albo 5000 do 9000 zł netto za wersję z integracją z kalendarzem. Utrzymanie: 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie. Zużycie: tokeny i minuty rozmów według realnego użycia, po Twojej stronie.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy, ile telefonów o wizyty tracisz i ile z nich umówi voicebot. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  queries: [
    'voicebot do potwierdzania wizyt',
    'voicebot do umawiania wizyt',
    'bot telefoniczny umawia wizyty',
    'automatyczne umawianie wizyt przez telefon',
    'voicebot a odwoływanie wizyt',
    'potwierdzanie wizyt bez recepcji',
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
          'Policz, ile złotych rocznie zjada ręczne umawianie, potwierdzanie i przekładanie wizyt.',
      },
    ],
  },
};
