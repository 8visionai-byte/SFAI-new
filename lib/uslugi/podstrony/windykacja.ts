import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 1 — WINDYKACJA (`/uslugi/voiceboty/windykacja`).
 * Fraza primary z GSC: „voicebot windykacja" (strona macierzysta rankuje na nią
 * z pozycji ~32, bo odpowiada na 10 intencji naraz i na żadną wprost).
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (zero nowych obietnic, wszystko już sprzedajemy):
 *  - odbieranie połączeń przychodzących 24/7 po polsku, notatka i podsumowanie
 *    po rozmowie, przekazywanie spraw trudnych, granice ustawia klient,
 *    zapowiedź „jestem asystentem AI" (AI Act), dane w UE + RODO + umowa
 *    powierzenia: lib/uslugi/voiceboty.ts (kapsula, rozwiazanie, faq),
 *  - „bot NIE dzwoni sam, obsługuje wyłącznie połączenia przychodzące,
 *    nigdy nie obiecuj kampanii wychodzących ani obdzwaniania bazy":
 *    api/_knowledge.mjs linia 56 (twarda reguła) + voiceboty.ts faq #2,
 *  - przypomnienia i potwierdzenia wychodzą tekstem (SMS/mail) z automatu:
 *    lib/uslugi/automatyzacje.ts (rozwiazanie.tresc, faq),
 *  - cena: pakiet startowy od 2500 zł (lib/uslugi/voiceboty.ts ramaCeny,
 *    minPrice locked 2026-08-16),
 *  - DWA MODELE ROZLICZENIA (v20): „przekazujemy całą infrastrukturę i wtedy
 *    nie płacisz abonamentu ALBO projekt zostaje u nas z opłatą utrzymaniową
 *    od 99 do 599 zł miesięcznie" — lib/agent/knowledge.ts linia 104 (wpis
 *    voicebotów), api/_knowledge.mjs linia 336 (reguła cenowa agenta) oraz
 *    lib/uslugi/audyt-ai.ts (ramaCeny, to samo zdanie już w rejestrze usług).
 *    Zero nowej kwoty: to przeredagowanie dotychczasowego „każde wdrożenie ma
 *    abonament", które było sprzeczne z regułą dwóch modeli.
 *
 * ŻELAZNA GRANICA TEJ PODSTRONY (decyzja Pawła + prawo):
 *  Strona NIE sprzedaje obdzwaniania dłużników. Voicebot obsługuje telefon
 *  PRZYCHODZĄCY w sprawie płatności. Zdanie „nie wydzwaniamy do dłużników"
 *  stoi w kapsule, w tabeli, w treści i w FAQ celowo: to jednocześnie granica
 *  produktu, ochrona marki i filtr złych zapytań.
 *
 * v20 (SPEC v20, skarga Pawła „tekstów jest naprawdę dużo"): objętość ścięta
 * do poziomu strony macierzystej. Zasada cięcia: zdanie odpowiadające WPROST
 * zostaje na początku, liczby zostają, wylatuje wata (scenki wprowadzające,
 * zdania powtarzające FAQ, zdania powtarzane przez komponent RamaCeny.tsx,
 * który sam dokleja „Dokładną cenę poznasz na bezpłatnej diagnozie, zanim
 * cokolwiek zamówisz. Bez ukrytych kosztów."). Zero usuniętych faktów.
 */
export const windykacja: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'windykacja',
  dataAktualizacji: '2026-08-18',

  // v20: 65 -> 50 znaków (pomiar raporty/pomiary-v20.md §4b: 4 linie -> 3 na
  // 1440, 6 -> 4 na 320). Fraza główna „voicebot do windykacji" zostaje NA
  // POCZĄTKU, „24/7" to fakt obecny już w metaTitle, tabeli i FAQ tej strony.
  h1: 'Voicebot do windykacji, który odbiera telefon 24/7',

  kapsula:
    'Voicebot do windykacji odbiera telefony w sprawie zaległych płatności. Rozmawia po polsku 24/7, mówi wprost, że jest asystentem AI, spisuje ustalenia i termin zapłaty, a sprawy sporne przekazuje osobie, która je prowadzi. Nie wydzwaniamy do dłużników: bot obsługuje wyłącznie połączenia przychodzące.',

  metaTitle: 'Voicebot do windykacji: odbiera telefon 24/7',
  metaDescription:
    'Voicebot do windykacji odbiera telefony w sprawie płatności 24/7, spisuje ustalenia i przekazuje sprawy sporne. Nie wydzwania do dłużników. Od 2500 zł.',

  problem: {
    h2: 'Ile telefonów w sprawie płatności zostaje bez odbioru?',
    tresc:
      'Klient oddzwania po przypomnieniu o zapłacie wieczorem albo w środku Twojego spotkania. Nikt nie odbiera, więc sprawa stoi kolejny tydzień, a pieniądze dalej są u kogoś innego. Część tych telefonów to w kółko to samo: za co jest faktura, na jaki numer konta zapłacić, czy da się rozłożyć na raty.',
  },

  rozwiazanie: {
    h2: 'Co robi voicebot, gdy klient oddzwania w sprawie faktury?',
    tresc:
      'Voicebot odbiera każde połączenie, także po godzinach, i na starcie mówi, że jest asystentem AI. Pyta, czego dotyczy sprawa, i spisuje to, co usłyszy: deklarowany termin zapłaty, prośbę o raty, potwierdzenie przelewu. Odpowiada z Twojego scenariusza, a sprawy sporne przekazuje osobie prowadzącej z notatką. Voicebot nie dzwoni sam do dłużników: obsługuje wyłącznie połączenia przychodzące, a przypomnienia o płatności wychodzą tak jak dziś, tekstem.',
  },

  /* v20: komórki skrócone do długości rodzica (cecha ~12 zn, zNami ~30 zn),
     żeby wiersze nie łamały się na dwie linie (pomiar §2d: sekcja tabeli
     rosła przez to o 79 px). Treść i kolejność wierszy bez zmian.
     Wiersz 1 MUSI zawierać „24/7" w kolumnie zNami: to bramka czwartego
     kafla statystyk w hero (ServiceHero.kafleStatystyk). */
  tabelaPorownawcza: {
    h2: 'Telefon w sprawie należności ręcznie a z voicebotem',
    naglowekBez: 'Telefon odbierany ręcznie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Godziny',
        bez: 'Tylko w godzinach pracy',
        zNami: '24/7, też wieczorem i w weekend',
      },
      {
        cecha: 'Oddzwaniający',
        bez: 'Sygnał albo poczta głosowa',
        zNami: 'Rozmawia od razu, sprawa zapisana',
      },
      {
        cecha: 'Ustalenia',
        bez: 'W głowie albo na kartce',
        zNami: 'Notatka i podsumowanie z rozmowy',
      },
      {
        cecha: 'Częste pytania',
        bez: 'Za każdym razem człowiek',
        zNami: 'Bot odpowiada ze scenariusza',
      },
      {
        cecha: 'Sprawy sporne',
        bez: 'Czekają na oddzwonienie',
        zNami: 'Do osoby prowadzącej, z notatką',
      },
      {
        cecha: 'Telefon do dłużnika',
        bez: 'Ręcznie, przez pracownika',
        zNami: 'Też ręcznie, bot nie dzwoni sam',
      },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy voicebota w dziale należności?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Liczymy, ile telefonów w sprawie płatności zostaje bez odbioru i o co pytają dzwoniący. Mówimy wprost, czy voicebot się opłaca.',
      },
      {
        tytul: 'Scenariusze i granice',
        opis:
          'Ustawiamy, co bot mówi, a czego nie mówi nigdy. Podłączamy numer i miejsce na notatki ze spraw. Testujemy na żywo.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Słuchamy rozmów, poprawiamy odpowiedzi, dokładamy scenariusze. Widzisz, co bot załatwił sam, a co poszło do człowieka.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot do windykacji?',
    /* v20: kwota NA POCZĄTEK (H2 pyta „ile kosztuje", więc odpowiedź nie może
       stać w drugim zdaniu). Wycięte: „Cena jest ta sama co przy każdym naszym
       voicebocie" (nie odpowiada na pytanie) oraz „Dokładną wycenę podajemy po
       bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów." —
       to zdanie komponent RamaCeny.tsx drukuje pod kartą na sztywno, więc
       stało na stronie dwa razy. Kwoty 2500 i 99-599 bez zmian. */
    tresc:
      'Pakiet startowy zaczyna się od 2500 zł: bot odbierający telefon 24/7 i rozmawiający po polsku, wdrożenie i konfiguracja scenariuszy. Do tego koszt działania zależny od liczby rozmów. Opiekę rozliczasz na dwa sposoby: bez abonamentu, gdy przekazujemy Ci całą infrastrukturę, albo za 99 do 599 zł miesięcznie, gdy projekt zostaje u nas.',
    minPrice: 2500,
    /* Link powrotny do usługi macierzystej (wymóg podstrony: każda wraca do
       rodzica realnym odnośnikiem). Pole `linkPoradnik` to jedyny slot na
       link w kontrakcie `Usluga` i renderuje się w RamaCeny.tsx w tym samym
       akapicie co cena, więc powrót idzie tędy zamiast do poradnika. */
    linkPoradnik: {
      przed: 'Pełny zakres i pozostałe zastosowania opisaliśmy na stronie ',
      etykieta: 'voiceboty dla firm',
      po: '.',
      href: '/uslugi/voiceboty',
    },
  },

  faq: [
    {
      pytanie: 'Czy voicebot dzwoni do dłużników?',
      odpowiedz:
        'Nie. Nasz voicebot obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Przypomnienia o płatności wysyłasz tak jak dziś, tekstem, a gdy klient oddzwania, telefon odbiera bot i spisuje sprawę.',
    },
    {
      pytanie: 'Co voicebot może powiedzieć o zadłużeniu?',
      odpowiedz:
        'Tylko to, na co mu pozwolisz. Zakres ustalamy przy wdrożeniu i zapisujemy w scenariuszu: co bot potwierdza, o co dopytuje i czego nie mówi nigdy. Sprawy drażliwe i sporne przekazuje człowiekowi z notatką z rozmowy.',
    },
    {
      pytanie: 'Czy dzwoniący pozna, że rozmawia z botem?',
      odpowiedz:
        'Tak, i tak ma być. Voicebot na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act. Brzmi naturalnie i po polsku, ale nikogo nie udaje.',
    },
    {
      pytanie: 'Co, jeśli klient chce rozłożyć płatność na raty?',
      odpowiedz:
        'Bot tego nie ustala. Spisuje prośbę i to, co klient deklaruje, i przekazuje sprawę osobie, która ją prowadzi. Ty dostajesz podsumowanie i oddzwaniasz przygotowany.',
    },
    {
      pytanie: 'Czy rozmowy o płatnościach są bezpieczne pod kątem RODO?',
      odpowiedz:
        'Tak. Dane z rozmów zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty decydujesz, co bot nagrywa i przechowuje.',
    },
    {
      pytanie: 'Ile kosztuje voicebot do windykacji?',
      odpowiedz:
        'Pakiet startowy kosztuje od 2500 zł: bot odbierający telefon 24/7 po polsku, wdrożenie i konfiguracja scenariuszy. Do tego koszt działania zależny od liczby rozmów. Opiekę rozliczasz bez abonamentu, gdy przekazujemy Ci infrastrukturę, albo za 99 do 599 zł miesięcznie, gdy projekt zostaje u nas. Dokładną wycenę podajemy po bezpłatnej diagnozie.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy, ile telefonów w sprawie płatności tracisz i ile z nich odbierze voicebot. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  queries: [
    'voicebot windykacja',
    'voicebot do windykacji',
    'bot telefoniczny w windykacji',
    'infolinia windykacyjna 24/7',
    'voicebot odbiera telefon w sprawie płatności',
    'czy voicebot dzwoni do dłużników',
  ],

  /* v22 (linki §3, P1 #4): podstrona miała 3 linki wchodzące (rodzic + dwie
     siostry) i ZERO wyjścia do poradnika oraz narzędzia. `linkPoradnik` w ramie
     ceny trzyma powrót do rodzica, więc poradnik i kalkulator wchodzą tędy. */
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
          'Policz, ile złotych rocznie zjada odbieranie telefonów w sprawie płatności i spisywanie ustaleń.',
      },
    ],
  },
};
