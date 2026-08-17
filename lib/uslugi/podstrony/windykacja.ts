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
 *  - cena: pakiet startowy od 2500 zł + opieka od 99 do 599 zł miesięcznie
 *    (lib/uslugi/voiceboty.ts ramaCeny, minPrice locked 2026-08-16).
 *
 * ŻELAZNA GRANICA TEJ PODSTRONY (decyzja Pawła + prawo):
 *  Strona NIE sprzedaje obdzwaniania dłużników. Voicebot obsługuje telefon
 *  PRZYCHODZĄCY w sprawie płatności. Zdanie „nie wydzwaniamy do dłużników"
 *  stoi w kapsule, w tabeli, w treści i w FAQ celowo: to jednocześnie granica
 *  produktu, ochrona marki i filtr złych zapytań.
 */
export const windykacja: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'windykacja',
  dataAktualizacji: '2026-08-17',

  h1: 'Voicebot do windykacji, który odbiera telefon w sprawie płatności',

  kapsula:
    'Voicebot do windykacji odbiera telefony przychodzące w sprawie zaległych płatności. Rozmawia po polsku 24/7, mówi wprost, że jest asystentem AI, spisuje ustalenia i deklarowany termin zapłaty, a sprawy sporne przekazuje osobie, która je prowadzi. Po każdej rozmowie dostajesz podsumowanie. Nie wydzwaniamy do dłużników: bot obsługuje wyłącznie połączenia przychodzące.',

  metaTitle: 'Voicebot do windykacji: odbiera telefon 24/7',
  metaDescription:
    'Voicebot do windykacji odbiera telefony w sprawie płatności 24/7, spisuje ustalenia i przekazuje sprawy sporne. Nie wydzwania do dłużników. Od 2500 zł.',

  problem: {
    h2: 'Ile telefonów w sprawie płatności zostaje bez odbioru?',
    tresc:
      'Wysyłasz przypomnienie o zapłacie i zaczyna się ruch. Klient oddzwania wieczorem, w sobotę albo w środku Twojego spotkania. Nikt nie odbiera, więc sprawa stoi kolejny tydzień, a pieniądze dalej są u kogoś innego. Część tych telefonów to w kółko to samo: za co jest ta faktura, na jaki numer konta zapłacić, czy da się rozłożyć na raty. Twój człowiek odpowiada na to po raz setny zamiast zająć się sprawami, które naprawdę wymagają rozmowy.',
  },

  rozwiazanie: {
    h2: 'Co robi voicebot, gdy klient oddzwania w sprawie faktury?',
    tresc:
      'Voicebot odbiera każde połączenie, także po godzinach pracy działu. Na starcie mówi, że jest asystentem AI. Pyta, czego dotyczy sprawa, i spisuje to, co usłyszy: deklarowany termin zapłaty, prośbę o rozłożenie na raty, informację o przelewie, który już poszedł. Odpowiada na pytania, które sam wpiszesz do scenariusza. Tego, co drażliwe, nie mówi z siebie, bo to Ty ustawiasz, co bot może powiedzieć, a czego nie. Sprawy sporne trafiają do osoby prowadzącej sprawę razem z notatką z rozmowy, więc wraca do niej gotowy temat, a nie karteczka z numerem. Voicebot nie dzwoni sam do dłużników. Obsługuje wyłącznie połączenia przychodzące, a przypomnienia o płatności wychodzą tak jak dziś, tekstem.',
  },

  tabelaPorownawcza: {
    h2: 'Telefon w sprawie należności ręcznie a z voicebotem',
    naglowekBez: 'Telefon odbierany ręcznie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Odbieranie połączeń',
        bez: 'Tylko w godzinach pracy działu',
        zNami: '24/7, też wieczorem i w weekend',
      },
      {
        cecha: 'Klient, który oddzwania',
        bez: 'Trafia na sygnał albo pocztę głosową',
        zNami: 'Rozmawia od razu, sprawa zapisana',
      },
      {
        cecha: 'Ustalenia z rozmowy',
        bez: 'W głowie albo na kartce',
        zNami: 'Notatka i podsumowanie po każdej rozmowie',
      },
      {
        cecha: 'Powtarzalne pytania',
        bez: 'Za każdym razem odpowiada człowiek',
        zNami: 'Bot odpowiada z Twojego scenariusza',
      },
      {
        cecha: 'Sprawy sporne',
        bez: 'Czekają, aż ktoś zdąży oddzwonić',
        zNami: 'Idą do osoby prowadzącej sprawę z notatką',
      },
      {
        cecha: 'Dzwonienie do dłużników',
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
          'Liczymy, ile telefonów w sprawie płatności zostaje u Ciebie bez odbioru i o co dzwoniący pytają najczęściej. Mówimy wprost, czy voicebot się tu opłaca.',
      },
      {
        tytul: 'Scenariusze i granice',
        opis:
          'Ustawiamy, co bot mówi, a czego nie mówi nigdy. Podłączamy numer i miejsce, w którym mają lądować notatki ze spraw. Testujemy na żywo, aż rozmowa brzmi tak, jak chcesz.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Słuchamy rozmów, poprawiamy odpowiedzi, dokładamy scenariusze. Ty widzisz, co bot załatwił sam i które sprawy poszły do człowieka.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot do windykacji?',
    tresc:
      'Cena jest ta sama co przy każdym naszym voicebocie. Pakiet startowy zaczyna się od 2500 zł: bot odbierający telefon 24/7 i rozmawiający po polsku, wdrożenie i konfiguracja scenariuszy. Do tego dochodzi koszt działania zależny od liczby rozmów. Każde wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie, bo nie zostawiamy klientów samych z botem. Dokładną wycenę podajemy po bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
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
        'Nie. Nasz voicebot obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Przypomnienia o płatności wysyłasz tak jak dziś, tekstem, a gdy klient oddzwania, telefon odbiera bot, spisuje sprawę i przekazuje ją dalej.',
    },
    {
      pytanie: 'Co voicebot może powiedzieć o zadłużeniu?',
      odpowiedz:
        'Tylko to, na co mu pozwolisz. Zakres ustalamy przy wdrożeniu i zapisujemy w scenariuszu: co bot potwierdza, o co dopytuje i czego nie mówi nigdy. Sprawy drażliwe oraz sporne przekazuje człowiekowi razem z notatką z rozmowy.',
    },
    {
      pytanie: 'Czy dzwoniący pozna, że rozmawia z botem?',
      odpowiedz:
        'Tak, i tak ma być. Voicebot na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act, a my się tego trzymamy. Brzmi naturalnie i po polsku, ale nikogo nie udaje.',
    },
    {
      pytanie: 'Co, jeśli klient chce rozłożyć płatność na raty?',
      odpowiedz:
        'Bot tego nie ustala. Spisuje prośbę i to, co klient deklaruje, a potem przekazuje sprawę osobie, która ją prowadzi. Ty dostajesz podsumowanie i oddzwaniasz przygotowany, zamiast zaczynać rozmowę od zera.',
    },
    {
      pytanie: 'Czy rozmowy o płatnościach są bezpieczne pod kątem RODO?',
      odpowiedz:
        'Tak. Dane z rozmów zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty decydujesz, co bot nagrywa i przechowuje. W każdej chwili masz wgląd i kontrolę.',
    },
    {
      pytanie: 'Ile kosztuje voicebot do windykacji?',
      odpowiedz:
        'Pakiet startowy kosztuje od 2500 zł. W tej cenie jest bot, który odbiera telefon 24/7 i rozmawia po polsku, oraz wdrożenie i konfiguracja scenariuszy. Do tego dochodzi koszt działania zależny od liczby rozmów, a każde wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie. Dokładną wycenę podajemy po bezpłatnej diagnozie.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy, ile telefonów w sprawie płatności zostaje dziś bez odbioru i ile z nich odbierze za Ciebie voicebot. Bez zobowiązań.',
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
};
