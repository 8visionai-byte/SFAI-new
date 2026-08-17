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
 *  - cena: pakiet startowy od 2500 zł jednorazowo za wdrożenie + opieka
 *    od 99 do 599 zł miesięcznie (lib/uslugi/voiceboty.ts ramaCeny,
 *    minPrice locked 2026-08-16).
 *
 * ŻELAZNA GRANICA: strona mówi wyraźnie, że bot obsługuje telefon PRZYCHODZĄCY
 * i nie wydzwania do nikogo. Fraza „boty dzwoniące na telefon" przyciąga ludzi
 * szukających kampanii wychodzących, a tego nie robimy. Lepiej odfiltrować
 * złe zapytanie na stronie niż na rozmowie.
 */
export const odbieranieTelefonow: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'odbieranie-telefonow',
  dataAktualizacji: '2026-08-17',

  h1: 'Bot telefoniczny, który odbiera telefon, gdy Ty nie możesz',

  kapsula:
    'Bot telefoniczny do odbierania połączeń odbiera każdy telefon przychodzący, także po godzinach i w weekend. Rozmawia po polsku, mówi wprost, że jest asystentem AI, odpowiada na powtarzalne pytania z Twojego scenariusza i spisuje sprawę. Po rozmowie dostajesz podsumowanie z numerem i tym, czego dotyczyła. Bot nie dzwoni sam, obsługuje wyłącznie połączenia przychodzące.',

  metaTitle: 'Bot telefoniczny: odbiera połączenia 24/7',
  metaDescription:
    'Bot telefoniczny odbiera połączenia 24/7 po polsku, odpowiada na powtarzalne pytania i spisuje sprawę. Po rozmowie masz podsumowanie. Od 2500 zł za wdrożenie.',

  problem: {
    h2: 'Ile zapytań tracisz, bo nikt nie odebrał telefonu?',
    tresc:
      'Telefon dzwoni, gdy jesteś u klienta, za kierownicą albo w gabinecie z pacjentem. Nie odbierasz, bo nie możesz. Dzwoniący nie zostawia wiadomości, tylko wybiera następny numer z listy, a ten numer należy do kogoś innego. Najgorsze jest to, że tego nie widzisz w żadnym zestawieniu: nieodebrany telefon nie zostawia śladu w CRM ani w skrzynce. Do tego połowa tych rozmów to za każdym razem to samo: czy jest wolny termin, ile to kosztuje, gdzie jesteście, do której pracujecie.',
  },

  rozwiazanie: {
    h2: 'Co się dzieje, gdy telefon odbiera bot?',
    tresc:
      'Bot odbiera od pierwszego sygnału, o każdej porze. Na starcie mówi, że jest asystentem AI. Potem pyta, w czym może pomóc, i odpowiada na to, co sam wpiszesz do scenariusza: godziny otwarcia, dojazd, zakres usług, orientacyjne ceny. Sprawy, których nie ma w scenariuszu, spisuje i przekazuje dalej, więc wraca do Ciebie gotowy temat, a nie sam numer na wyświetlaczu. Po każdej rozmowie dostajesz podsumowanie: kto dzwonił, o co pytał i co bot ustalił. Ty decydujesz, co bot może powiedzieć, a czego nie mówi nigdy. Bot nie dzwoni sam do nikogo. Obsługuje wyłącznie połączenia przychodzące.',
  },

  tabelaPorownawcza: {
    h2: 'Nieodebrany telefon a telefon odebrany przez bota',
    naglowekBez: 'Telefon bez odbioru',
    naglowekZNami: 'Bot telefoniczny od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Połączenie po godzinach',
        bez: 'Sygnał albo poczta głosowa',
        zNami: 'Odebrane i zapisane, też w nocy i w weekend',
      },
      {
        cecha: 'Dzwoniący, który się spieszy',
        bez: 'Wybiera kolejny numer z listy',
        zNami: 'Dostaje odpowiedź od razu',
      },
      {
        cecha: 'Powtarzalne pytania',
        bez: 'Za każdym razem odpowiadasz sam',
        zNami: 'Bot odpowiada z Twojego scenariusza',
      },
      {
        cecha: 'Ślad po rozmowie',
        bez: 'Nieodebrane połączenie i tyle',
        zNami: 'Podsumowanie: kto dzwonił i w jakiej sprawie',
      },
      {
        cecha: 'Sprawa trudna albo nietypowa',
        bez: 'Trzeba oddzwonić i zacząć od zera',
        zNami: 'Spisana i przekazana człowiekowi z notatką',
      },
      {
        cecha: 'Praca w trakcie rozmowy z klientem',
        bez: 'Telefon przerywa spotkanie',
        zNami: 'Bot odbiera, Ty kończysz spokojnie',
      },
    ],
  },

  kroki: {
    h2: 'Jak uruchamiamy bota na Twoim numerze?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Sprawdzamy, ile połączeń zostaje u Ciebie bez odbioru i o co dzwoniący pytają najczęściej. Mówimy wprost, czy bot telefoniczny się tu opłaca, zanim cokolwiek zamówisz.',
      },
      {
        tytul: 'Scenariusz i numer',
        opis:
          'Wpisujemy odpowiedzi na pytania, które padają najczęściej, i ustawiamy granice: co bot mówi, a czego nie mówi nigdy. Podłączamy numer i miejsce, do którego mają trafiać podsumowania rozmów. Testujemy na żywo, aż brzmi tak, jak chcesz.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Słuchamy rozmów, poprawiamy odpowiedzi i dokładamy scenariusze. Ty widzisz, które sprawy bot załatwił sam, a które przekazał człowiekowi.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje bot do odbierania telefonów?',
    tresc:
      'Cena jest ta sama co przy każdym naszym voicebocie. Pakiet startowy zaczyna się od 2500 zł jednorazowo za wdrożenie: bot odbierający telefon 24/7 i rozmawiający po polsku, konfiguracja scenariuszy i podłączenie numeru. Do tego dochodzi koszt działania zależny od liczby rozmów. Każde wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie, bo nie zostawiamy klientów samych z botem. Dokładną wycenę podajemy po bezpłatnej diagnozie. Bez ukrytych kosztów.',
    minPrice: 2500,
    /* Link powrotny do usługi macierzystej (wymóg podstrony: każda wraca do
       rodzica realnym odnośnikiem). Pole `linkPoradnik` to jedyny slot na link
       w kontrakcie `Usluga` i renderuje się w RamaCeny.tsx w tym samym akapicie
       co cena, więc powrót idzie tędy. */
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
        'Nie. Nasz bot obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Jeśli szukasz rozwiązania do obdzwaniania bazy, to nie jest usługa dla Ciebie i wolimy powiedzieć to od razu.',
    },
    {
      pytanie: 'Czy dzwoniący pozna, że rozmawia z botem?',
      odpowiedz:
        'Tak, i tak ma być. Bot na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act, a my się tego trzymamy. Brzmi naturalnie i po polsku, ale nikogo nie udaje.',
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
        'Tak. Dane z rozmów zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty decydujesz, co bot nagrywa i przechowuje. W każdej chwili masz wgląd i kontrolę.',
    },
    {
      pytanie: 'Ile kosztuje bot do odbierania telefonów?',
      odpowiedz:
        'Pakiet startowy kosztuje od 2500 zł jednorazowo za wdrożenie. W tej cenie jest bot, który odbiera telefon 24/7 i rozmawia po polsku, konfiguracja scenariuszy i podłączenie numeru. Do tego dochodzi koszt działania zależny od liczby rozmów, a każde wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie. Dokładną wycenę podajemy po bezpłatnej diagnozie.',
    },
  ],

  cta: {
    label: 'Policz moje nieodebrane telefony',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy, ile połączeń zostaje dziś u Ciebie bez odbioru i ile z nich odbierze za Ciebie bot. Bez zobowiązań.',
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
};
