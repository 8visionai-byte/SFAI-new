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
 *    wdrożenie i konfiguracja) + opieka od 99 do 599 zł miesięcznie:
 *    lib/uslugi/voiceboty.ts ramaCeny (minPrice locked 2026-08-16).
 *
 * ŻELAZNA GRANICA TEJ PODSTRONY (decyzja Pawła):
 *  Rynek pod frazą „potwierdzanie wizyt" rozumie zwykle bota, który OBDZWANIA
 *  klientów dzień przed terminem. My tego nie robimy i strona mówi to wprost.
 *  Nasze potwierdzanie wizyt to: umówienie i zapis terminu w rozmowie
 *  przychodzącej, potwierdzenie wysłane tekstem oraz obsługa odwołań i zmian,
 *  gdy klient dzwoni. Zdanie o braku połączeń wychodzących stoi w kapsule,
 *  w treści i w pierwszym pytaniu FAQ.
 */
export const potwierdzanieWizyt: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'potwierdzanie-wizyt',
  dataAktualizacji: '2026-08-17',

  h1: 'Voicebot do potwierdzania wizyt, który umawia i pilnuje terminów',

  kapsula:
    'Voicebot do potwierdzania wizyt odbiera telefon 24/7, umawia termin i zapisuje go w Twoim kalendarzu, a zaraz po rozmowie wysyła potwierdzenie. Gdy klient dzwoni, żeby przełożyć albo odwołać wizytę, bot załatwia to bez Ciebie i zwalnia godzinę w grafiku. Rozmawia po polsku i mówi wprost, że jest asystentem AI. Nie dzwoni sam: potwierdzenia i przypomnienia idą tekstem.',

  metaTitle: 'Voicebot do potwierdzania wizyt: umawia 24/7',
  metaDescription:
    'Voicebot do potwierdzania wizyt odbiera telefon 24/7, zapisuje termin w kalendarzu i wysyła potwierdzenie. Odwołania załatwia bez Ciebie. Od 2500 zł.',

  problem: {
    h2: 'Ile wizyt przepada, bo nikt nie odebrał telefonu?',
    tresc:
      'Klient dzwoni, żeby się umówić, i trafia na sygnał, bo akurat jesteś przy pracy. Drugi dzwoni wieczorem, żeby odwołać jutrzejszy termin, i zostawia to na poczcie głosowej, której nikt nie odsłucha przed rankiem. Rano stoisz z pustą godziną w grafiku, której już nikomu nie sprzedasz. Do tego ręczne wpisywanie terminów i te same pytania w kółko: kiedy, gdzie, ile to trwa. Dzień zjedzony, a kalendarz i tak się rozjeżdża.',
  },

  rozwiazanie: {
    h2: 'Jak voicebot umawia i potwierdza wizytę?',
    tresc:
      'Voicebot odbiera telefon, także po godzinach. Widzi wolne terminy w Twoim kalendarzu, proponuje je dzwoniącemu i zapisuje wizytę od razu w trakcie rozmowy. Zaraz po niej wychodzi potwierdzenie tekstem, można ustawić SMS z numerem Twojej firmy. Gdy klient dzwoni, żeby przełożyć albo odwołać termin, bot zmienia wpis i zwalnia godzinę, więc możesz ją komuś oddać jeszcze tego samego dnia. Sprawy, których nie ma w scenariuszu, przekazuje Tobie razem z notatką z rozmowy. Voicebot nie dzwoni sam z przypomnieniem o wizycie. Przypomnienie idzie tekstem, a rozmowę zaczyna klient, który oddzwania.',
  },

  tabelaPorownawcza: {
    h2: 'Umawianie i potwierdzanie wizyt ręcznie a z voicebotem',
    naglowekBez: 'Kalendarz prowadzony ręcznie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Telefon od klienta',
        bez: 'Odbierasz, gdy akurat możesz',
        zNami: 'Odbierany 24/7, też wieczorem i w weekend',
      },
      {
        cecha: 'Zapis terminu',
        bez: 'Ręcznie, w przerwie między klientami',
        zNami: 'Bot zapisuje w kalendarzu w trakcie rozmowy',
      },
      {
        cecha: 'Potwierdzenie terminu',
        bez: 'Jeśli ktoś zdąży je wysłać',
        zNami: 'Wychodzi tekstem zaraz po rozmowie',
      },
      {
        cecha: 'Odwołanie wizyty',
        bez: 'Poczta głosowa odsłuchana rano',
        zNami: 'Bot odwołuje i zwalnia termin od razu',
      },
      {
        cecha: 'Zmiana terminu',
        bez: 'Telefon do Ciebie i ustalanie od nowa',
        zNami: 'Bot proponuje wolne godziny z kalendarza',
      },
      {
        cecha: 'Pytania o wizytę',
        bez: 'Za każdym razem odpowiadasz Ty',
        zNami: 'Bot odpowiada z Twojego scenariusza',
      },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy voicebota do umawiania wizyt?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Sprawdzamy, ile telefonów o wizyty odbierasz, ile z nich przepada i jak dziś prowadzisz kalendarz. Mówimy wprost, czy voicebot się u Ciebie opłaca.',
      },
      {
        tytul: 'Kalendarz i scenariusze',
        opis:
          'Podłączamy kalendarz i numer, ustawiamy zasady: jakie terminy bot może proponować, ile trwa wizyta, co robi przy odwołaniu. Testujemy na żywo, aż brzmi tak, jak chcesz.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Słuchamy rozmów, poprawiamy odpowiedzi, dokładamy scenariusze. Ty widzisz, ile wizyt bot umówił i ile terminów zwolnił do ponownej sprzedaży.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot do potwierdzania wizyt?',
    tresc:
      'Cena jest ta sama co przy każdym naszym voicebocie. Pakiet startowy zaczyna się od 2500 zł: bot odbierający telefon 24/7 i rozmawiający po polsku, umawianie wizyt oraz wdrożenie i konfiguracja. Do tego dochodzi koszt działania zależny od liczby rozmów. Każde wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie, bo nie zostawiamy klientów samych z botem. Dokładną wycenę podajemy po bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
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
        'Bot przyjmuje odwołanie w rozmowie, zwalnia termin w kalendarzu, a przy przełożeniu proponuje wolne godziny i zapisuje nowy termin. Zmianę widzisz od razu, bez odsłuchiwania poczty głosowej nad ranem.',
    },
    {
      pytanie: 'Czy dzwoniący pozna, że rozmawia z botem?',
      odpowiedz:
        'Tak, i tak ma być. Voicebot na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act, a my się tego trzymamy. Brzmi naturalnie i po polsku, ale nikogo nie udaje.',
    },
    {
      pytanie: 'Co, jeśli sprawa jest zbyt trudna dla bota?',
      odpowiedz:
        'Wtedy voicebot nie udaje, że wie. Bierze kontakt, zapisuje, czego dotyczy sprawa, i mówi klientowi, że oddzwonisz. Ty dostajesz podsumowanie i oddzwaniasz przygotowany. Ustawiasz z góry, które sprawy bot ma przekazywać dalej.',
    },
    {
      pytanie: 'Ile kosztuje voicebot do potwierdzania wizyt?',
      odpowiedz:
        'Pakiet startowy kosztuje od 2500 zł. W tej cenie jest bot, który odbiera telefon 24/7 i rozmawia po polsku, umawianie wizyt oraz wdrożenie i konfiguracja. Do tego dochodzi koszt działania zależny od liczby rozmów, a każde wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie. Dokładną wycenę podajemy po bezpłatnej diagnozie.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy, ile telefonów o wizyty tracisz w miesiącu i ile z nich umówi za Ciebie voicebot. Bez zobowiązań.',
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
};
