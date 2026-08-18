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
 *  - cena: pakiet startowy od 2500 zł jednorazowo za wdrożenie
 *    (lib/uslugi/voiceboty.ts ramaCeny, minPrice locked 2026-08-16),
 *  - DWA MODELE ROZLICZENIA (v20): „przekazujemy całą infrastrukturę i wtedy
 *    nie płacisz abonamentu ALBO projekt zostaje u nas z opłatą utrzymaniową
 *    od 99 do 599 zł miesięcznie" — lib/agent/knowledge.ts linia 104 (wpis
 *    voicebotów), api/_knowledge.mjs linia 336 (reguła cenowa agenta) oraz
 *    lib/uslugi/audyt-ai.ts (ramaCeny). Zero nowej kwoty: to przeredagowanie
 *    dotychczasowego „każde wdrożenie ma abonament", sprzecznego z tą regułą.
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
  dataAktualizacji: '2026-08-18',

  // v20: 58 -> 44 znaków (pomiar §4b: 4 linie -> 3 na 1440, 5 -> 4 na 375/320).
  // Fraza obowiązkowa „bot telefoniczny" zostaje NA POCZĄTKU (poz. 16,9 w GSC),
  // „24/7" jest już w metaTitle, kapsule, tabeli i FAQ tej strony.
  h1: 'Bot telefoniczny, który odbiera telefon 24/7',

  kapsula:
    'Bot telefoniczny odbiera każdy telefon przychodzący, także po godzinach. Rozmawia po polsku, mówi, że jest asystentem AI, odpowiada na powtarzalne pytania z Twojego scenariusza i spisuje sprawę. Po rozmowie dostajesz podsumowanie. Bot nie dzwoni sam, obsługuje wyłącznie połączenia przychodzące.',

  metaTitle: 'Bot telefoniczny: odbiera połączenia 24/7',
  metaDescription:
    'Bot telefoniczny odbiera połączenia 24/7 po polsku, odpowiada na powtarzalne pytania i spisuje sprawę. Po rozmowie masz podsumowanie. Od 2500 zł za wdrożenie.',

  problem: {
    h2: 'Ile zapytań tracisz, bo nikt nie odebrał telefonu?',
    tresc:
      'Nie odbierasz, bo jesteś u klienta, za kierownicą albo w gabinecie z pacjentem. Dzwoniący nie zostawia wiadomości, tylko wybiera następny numer z listy. Nieodebrany telefon nie zostawia śladu w CRM ani w skrzynce, więc nawet tego nie widzisz. Połowa tych rozmów to w kółko to samo: czy jest wolny termin, ile to kosztuje, do której pracujecie.',
  },

  rozwiazanie: {
    h2: 'Co się dzieje, gdy telefon odbiera bot?',
    tresc:
      'Bot odbiera o każdej porze i na starcie mówi, że jest asystentem AI. Pyta, w czym może pomóc, i odpowiada na to, co wpiszesz do scenariusza: godziny otwarcia, dojazd, zakres usług, orientacyjne ceny. Sprawy spoza scenariusza spisuje i przekazuje dalej. Po każdej rozmowie dostajesz podsumowanie: kto dzwonił, o co pytał i co bot ustalił. Bot nie dzwoni sam do nikogo: obsługuje wyłącznie połączenia przychodzące.',
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
    /* v20: kwota NA POCZĄTEK (H2 pyta „ile kosztuje"). Wycięte: „Cena jest ta
       sama co przy każdym naszym voicebocie" oraz „Dokładną wycenę podajemy po
       bezpłatnej diagnozie. Bez ukrytych kosztów." — to zdanie RamaCeny.tsx
       drukuje pod kartą na sztywno. Sformułowanie „2500 zł jednorazowo za
       wdrożenie" ZOSTAJE (należy do modelu dwóch rozliczeń). */
    tresc:
      'Pakiet startowy zaczyna się od 2500 zł jednorazowo za wdrożenie: bot odbierający telefon 24/7 i rozmawiający po polsku, konfiguracja scenariuszy i podłączenie numeru. Do tego koszt działania zależny od liczby rozmów. Opiekę rozliczasz na dwa sposoby: bez abonamentu, gdy przekazujemy Ci całą infrastrukturę, albo za 99 do 599 zł miesięcznie, gdy projekt zostaje u nas.',
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
        'Pakiet startowy kosztuje od 2500 zł jednorazowo za wdrożenie: bot odbierający telefon 24/7 po polsku, konfiguracja scenariuszy i podłączenie numeru. Do tego koszt działania zależny od liczby rozmów. Opiekę rozliczasz bez abonamentu, gdy przekazujemy Ci infrastrukturę, albo za 99 do 599 zł miesięcznie, gdy projekt zostaje u nas. Dokładną wycenę podajemy po bezpłatnej diagnozie.',
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
};
