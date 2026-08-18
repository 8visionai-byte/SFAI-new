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
 *  - cena: pakiet startowy od 2500 zł (bot 24/7 po polsku, umawianie wizyt,
 *    wdrożenie i konfiguracja): lib/uslugi/voiceboty.ts ramaCeny
 *    (minPrice locked 2026-08-16),
 *  - DWA MODELE ROZLICZENIA (v20): „przekazujemy całą infrastrukturę i wtedy
 *    nie płacisz abonamentu ALBO projekt zostaje u nas z opłatą utrzymaniową
 *    od 99 do 599 zł miesięcznie" — lib/agent/knowledge.ts linia 104 (wpis
 *    voicebotów), api/_knowledge.mjs linia 336 (reguła cenowa agenta) oraz
 *    lib/uslugi/audyt-ai.ts (ramaCeny). Zero nowej kwoty: to przeredagowanie
 *    dotychczasowego „każde wdrożenie ma abonament", sprzecznego z tą regułą.
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
  dataAktualizacji: '2026-08-18',

  // v20: 64 -> 36 znaków. Jedyny kandydat z pomiaru (§4b), który łamie się na
  // 3 linie na WSZYSTKICH trzech szerokościach (1440/375/320) i nie zostawia
  // sieroty. Fraza główna „voicebot do potwierdzania wizyt" w całości na
  // początku; „24/7" jest już w metaTitle, kapsule, tabeli i FAQ tej strony.
  h1: 'Voicebot do potwierdzania wizyt 24/7',

  kapsula:
    'Voicebot do potwierdzania wizyt odbiera telefon 24/7, umawia termin, zapisuje go w Twoim kalendarzu i wysyła potwierdzenie. Odwołania i zmiany terminu załatwia bez Ciebie. Rozmawia po polsku i mówi, że jest asystentem AI. Nie dzwoni sam: potwierdzenia i przypomnienia idą tekstem.',

  metaTitle: 'Voicebot do potwierdzania wizyt: umawia 24/7',
  metaDescription:
    'Voicebot do potwierdzania wizyt odbiera telefon 24/7, zapisuje termin w kalendarzu i wysyła potwierdzenie. Odwołania załatwia bez Ciebie. Od 2500 zł.',

  problem: {
    h2: 'Ile wizyt przepada, bo nikt nie odebrał telefonu?',
    tresc:
      'Klient dzwoni, żeby się umówić, i trafia na sygnał. Drugi odwołuje jutrzejszy termin wieczorem, na poczcie głosowej, której nikt nie odsłucha przed rankiem. Rano stoisz z pustą godziną w grafiku, której już nikomu nie sprzedasz. Do tego te same pytania w kółko: kiedy, gdzie, ile to trwa.',
  },

  rozwiazanie: {
    h2: 'Jak voicebot umawia i potwierdza wizytę?',
    tresc:
      'Voicebot odbiera telefon, także po godzinach. Widzi wolne terminy w Twoim kalendarzu, proponuje je dzwoniącemu i zapisuje wizytę w trakcie rozmowy. Potwierdzenie wychodzi tekstem, można ustawić SMS z numerem Twojej firmy. Gdy klient dzwoni, żeby przełożyć albo odwołać termin, bot zmienia wpis i zwalnia godzinę. Sprawy spoza scenariusza przekazuje Tobie z notatką z rozmowy. Voicebot nie dzwoni sam: przypomnienie o wizycie idzie tekstem.',
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
    /* v20: kwota NA POCZĄTEK (H2 pyta „ile kosztuje"). Wycięte: „Cena jest ta
       sama co przy każdym naszym voicebocie" oraz „Dokładną wycenę podajemy po
       bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów." —
       to zdanie RamaCeny.tsx drukuje pod kartą na sztywno (dublowało się).
       Kwoty 2500 i 99-599 bez zmian. */
    tresc:
      'Pakiet startowy zaczyna się od 2500 zł: bot odbierający telefon 24/7 i rozmawiający po polsku, umawianie wizyt oraz wdrożenie i konfiguracja. Do tego koszt działania zależny od liczby rozmów. Opiekę rozliczasz na dwa sposoby: bez abonamentu, gdy przekazujemy Ci całą infrastrukturę, albo za 99 do 599 zł miesięcznie, gdy projekt zostaje u nas.',
    minPrice: 2500,
    /* Link powrotny do usługi macierzystej (wymóg podstrony). `linkPoradnik`
       to jedyny slot na link w kontrakcie `Usluga`, renderowany w RamaCeny.tsx
       w tym samym akapicie co cena. */
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
        'Pakiet startowy kosztuje od 2500 zł: bot odbierający telefon 24/7 po polsku, umawianie wizyt oraz wdrożenie i konfiguracja. Do tego koszt działania zależny od liczby rozmów. Opiekę rozliczasz bez abonamentu, gdy przekazujemy Ci infrastrukturę, albo za 99 do 599 zł miesięcznie, gdy projekt zostaje u nas. Dokładną wycenę podajemy po bezpłatnej diagnozie.',
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
