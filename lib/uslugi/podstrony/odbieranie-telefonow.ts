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
  dataAktualizacji: '2026-08-20',

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
    tresc:
      'Nieodebrany telefon rzadko wraca: dzwoniący nie zostawia wiadomości, tylko wybiera następny numer z listy. Nie widzisz nawet skali strat, bo nieodebrane połączenie nie zostawia śladu w CRM ani w skrzynce.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'akapit',
        tekst: 'Nie odbierasz, bo jesteś u klienta, za kierownicą albo w gabinecie z pacjentem. Po godzinach pracy telefonu nie odbiera nikt, a dzwoniący nie czeka do rana. Wieczory i weekendy to zapytania, których nawet nie zobaczysz.',
      },
      {
        typ: 'lista',
        punkty: [
          'Dzwoniący wybiera kolejny numer z listy, zamiast czekać, aż oddzwonisz.',
          'W CRM i w skrzynce nie zostaje żaden ślad, więc nie policzysz, ile spraw przepadło.',
          'Jeśli oddzwaniasz, zaczynasz rozmowę od zera, bez wiedzy, o co chodziło.',
          'Telefon w trakcie spotkania przerywa rozmowę z klientem, który siedzi przed Tobą.',
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
    tresc:
      'Bot telefoniczny odbiera każde połączenie przychodzące 24/7, na starcie mówi, że jest asystentem AI, i odpowiada na powtarzalne pytania z Twojego scenariusza. To obsługa klienta 24/7 przez voicebota: bot odbiera, a Ty po każdej rozmowie dostajesz podsumowanie.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'kroki',
        wariant: 'os',
        kroki: [
          {
            tytul: 'Bot odbiera o każdej porze',
            opis: 'Na starcie rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act i tak ma być.',
          },
          {
            tytul: 'Odpowiada ze scenariusza',
            opis: 'Mówi to, co do niego wpiszesz: godziny otwarcia, dojazd, zakres usług, orientacyjne ceny.',
          },
          {
            tytul: 'Sprawę nietypową spisuje',
            opis: 'Pytanie spoza scenariusza przekazuje dalej razem z notatką z rozmowy.',
          },
          {
            tytul: 'Ty dostajesz podsumowanie',
            opis: 'Po każdej rozmowie widzisz, kto dzwonił, o co pytał i co bot ustalił.',
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
    /* v20: kwota NA POCZĄTEK (H2 pyta „ile kosztuje"). Wycięte: „Cena jest ta
       sama co przy każdym naszym voicebocie" oraz „Dokładną wycenę podajemy po
       bezpłatnej diagnozie. Bez ukrytych kosztów." — to zdanie RamaCeny.tsx
       drukuje pod kartą na sztywno.
       2026-08-19 (audyt §2): rozliczenie rozbite na TRZY JAWNE POZYCJE,
       utrzymanie przestawione z 99-599 na model voicebotowy, każda kwota
       oznaczona jako netto. */
    tresc:
      'Stworzenie bota to jednorazowo 2500 zł netto za wersję prostą, czyli pakiet startowy: bot odbiera telefon 24/7 po polsku, ma skonfigurowane scenariusze i podłączony numer. Wersja z integracjami i rozbudowanymi scenariuszami to 5000 do 9000 zł netto. Płacisz trzy osobne pozycje: stworzenie, utrzymanie i zużycie, nie jeden abonament.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'kafle',
        kafle: [
          {
            wartosc: '2500 zł netto',
            opis: 'stworzenie bota, pakiet startowy',
          },
          {
            wartosc: '0 zł/mies.',
            opis: 'utrzymanie po przekazaniu infrastruktury Tobie',
          },
          {
            wartosc: '350 zł netto/h',
            opis: 'poprawki po przekazaniu infrastruktury',
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
          'Bot prosty powstaje w 3 do 5 dni roboczych, z integracjami w 5 do 25 dni roboczych. Termin dla Twojego scenariusza potwierdzamy na bezpłatnej diagnozie: 0 zł, około 30 minut.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
    ],
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
