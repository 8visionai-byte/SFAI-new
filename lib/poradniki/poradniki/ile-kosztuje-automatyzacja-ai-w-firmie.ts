import type { Poradnik } from '../types';

/**
 * PORADNIK 4: Ile kosztuje automatyzacja AI w firmie? Widełki 2026.
 *
 * Money query primary: „ile kosztuje automatyzacja AI". OTWARTA LUKA z researchu
 * konkurencji (.seo-przeglad/KONKURENCJA-2026-08-16.md): w top10 NIKT nie podaje
 * kwot dla automatyzacji. Ten poradnik podaje NASZE realne, zatwierdzone ceny
 * (lista locked Pawła i Marcina, PRZEKAZANIE-SESJA-SFAI.md):
 *  - wdrożenie automatyzacji: 3000 do 10000 zł,
 *  - AI Start (pierwsza automatyzacja na próbę): 1990 zł,
 *  - audyt AI: 1490 zł (odliczany od wdrożenia),
 *  - opieka pakietowa dołączona do wdrożeń: abonament 99 do 599 zł/mies.
 * UWAGA: abonament 99-599 zł to INNA usługa niż ryczałt godzinowy Opieki AI
 * (3000/5500/10000 zł za 10/20/40h na /uslugi/opieka-ai) — tu opisujemy go
 * wyłącznie jako opiekę dołączoną do pakietów wdrożeniowych.
 * Przykłady wdrożeń: TYLKO realne liczby z lib/realizacje (75% maili, 1000
 * rekordów w 40 min, oszczędności „kilka godzin tygodniowo" z dopiskiem szac.).
 * Zero em-dash, zero zmyślonych liczb, głos Pawła, answer-first.
 */
export const ileKosztujeAutomatyzacjaAiWFirmie: Poradnik = {
  slug: 'ile-kosztuje-automatyzacja-ai-w-firmie',
  tytul:
    'Ile kosztuje automatyzacja AI w firmie? Widełki 2026: od 3000 do 10000 zł',

  lead:
    'Automatyzacja AI w firmie kosztuje u nas od 3000 do 10000 zł za wdrożenie, zależnie od liczby integracji i złożoności procesu. Pierwszą automatyzację na próbę robimy w pakiecie AI Start za 1990 zł, a mapę opłacalnych procesów daje audyt AI za 1490 zł, odliczany od wdrożenia. Po wdrożeniu wybierasz: opieka u nas w abonamencie od 99 do 599 zł netto miesięcznie albo przekazanie Ci całej infrastruktury i wtedy 0 zł abonamentu. Poniżej masz pełne widełki, to, od czego zależy cena, i przykłady z naszych realnych wdrożeń.',

  metaTitle: 'Ile kosztuje automatyzacja AI? Widełki 2026: 3000-10000 zł',
  metaDescription:
    'Ile kosztuje automatyzacja AI w firmie? Wdrożenie to 3000 do 10000 zł, pierwsza automatyzacja na próbę 1990 zł, audyt 1490 zł. Realne widełki i przykłady.',

  data: '2026-08-16',
  dataAktualizacji: '2026-08-19',
  kategoria: 'Koszty i wycena',
  tagi: [
    'ile kosztuje automatyzacja AI',
    'koszt automatyzacji AI',
    'cena automatyzacji procesów',
    'automatyzacja AI dla firm',
  ],

  /* v22 (PLAN-v22 §2.1, skarga Pawła 2026-08-18 o „jednej ścianie tekstu"):
     ta sama treść, inne OPAKOWANIE. Sekcje jadą w kartach `.inf-card` z tonem
     poradnika, obie tabele wjeżdżają w karty i dostają widoczny <caption>,
     a nad cennikiem stoi pas czterech kafli z cenami.
     ŻELAZNE: ZERO zmian słów. Ani jedno zdanie nie zostało przepisane,
     skrócone ani dopisane; kolejność merytoryczna 1:1, wszystkie H2 zostają H2,
     tabele zostają prawdziwymi <table> ze scope.
     NOWE WIDOCZNE NAPISY I ICH ŹRÓDŁA (wszystkie kopiowane znak w znak
     z TEJ SAMEJ strony, zero nowych faktów):
       - kafle: `wartosc` = kolumna „Cena", `opis` = kolumna „Pakiet"
         z tabeli cennika niżej,
       - `podpis` obu tabel = nagłówek H2 sekcji stojącej nad tabelą,
       - `chip` trzech kart = nazwa pakietu z kolumny „Pakiet" tej samej tabeli. */
  tresc: [
    /* Runda struktury 2026-08-19 (raport P8: mediana akapitu ~150 zn, strona miała
       do 61% tekstu w akapitach >400 zn): treść przełożona na bloki, fakty 1:1,
       istniejące tabele/kafle/kroki zachowane. Poprzednia wersja: git blame. */
    {
      typ: 'akapit',
      tekst: 'Jeśli pytasz, ile kosztuje automatyzacja AI, odpowiadamy liczbami, bo sami nie lubimy cenników w stylu „to zależy": wdrożenie automatyzacji AI kosztuje u nas od 3000 do 10000 zł netto. Cena zależy od liczby integracji i złożoności procesu.',
    },
    {
      typ: 'akapit',
      tekst: 'Dolna granica to pojedynczy, prosty proces z jedną lub dwiema integracjami. Górna to kilka połączonych procesów albo automatyzacja, w której koszt błędu jest wysoki, więc dochodzą testy i zabezpieczenia. Pojedynczy proces wdrażamy w dni, nie w miesiące.',
    },
    {
      typ: 'akapit',
      tekst: 'Jeśli chcesz zacząć taniej, pierwsza automatyzacja na próbę w pakiecie AI Start kosztuje 1990 zł i automatyzuje jeden wąski proces wewnątrz firmy, zanim wydasz od 3000 do 10000 zł netto. AI Start to inny produkt niż chatbot na stronę od 1790 zł netto.',
    },
    {
      typ: 'akapit',
      tekst: 'A jeśli nie wiesz, od czego zacząć, audyt AI za 1490 zł netto daje mapę procesów z największym zwrotem i jest odliczany od wdrożenia.',
    },
    {
      typ: 'kafle',
      kafle: [
        {
          wartosc: '1990 zł',
          opis: 'AI Start',
        },
        {
          wartosc: '1490 zł netto',
          opis: 'Audyt AI',
        },
        {
          wartosc: 'od 3000 do 10000 zł netto',
          opis: 'Wdrożenie automatyzacji',
        },
        {
          wartosc: 'od 99 do 599 zł netto/mies.',
          opis: 'Opieka po wdrożeniu',
        },
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Ile kosztuje automatyzacja AI w firmie? Cennik 2026',
      chip: 'CENNIK',
      akapity: [
        'Poniższa tabela to nasz realny cennik, nie widełki wzięte z sufitu. Dokładną kwotę w tych ramach podajemy na bezpłatnej diagnozie, kiedy zobaczymy proces i policzymy, ile pracy zdejmie automatyzacja.',
        'Cennik czytaj razem z czasem: pojedynczy proces wdrażamy w dni, nie w miesiące. Obok kwoty od razu wiesz więc, jak szybko automatyzacja zacznie pracować.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      podpis: 'Ile kosztuje automatyzacja AI w firmie? Cennik 2026',
      naglowki: [
        'Pakiet',
        'Co dostajesz',
        'Cena',
      ],
      wiersze: [
        [
          'AI Start',
          'Pierwsza automatyzacja na próbę: jeden wąski proces, żeby zobaczyć efekt na swoich danych',
          '1990 zł',
        ],
        [
          'Audyt AI',
          'Mapa procesów z największym zwrotem plus Action Plan. Cena odliczana od wdrożenia',
          '1490 zł netto',
        ],
        [
          'Wdrożenie automatyzacji',
          'Działający proces end-to-end: od projektu po testy i uruchomienie',
          'od 3000 do 10000 zł netto',
        ],
        [
          'Opieka po wdrożeniu',
          'Abonament dołączony do wdrożenia: monitoring i poprawki, nie zostawiamy klientów',
          'od 99 do 599 zł netto/mies.',
        ],
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Od czego zależy cena automatyzacji AI?',
      wariant: 'edge',
      akapity: [
        'Cena nie bierze się z liczby ekranów ani z tego, jak „mądrze" brzmi nazwa narzędzia. Bierze się z tego, ile pracy trzeba włożyć, żeby proces działał sam i bezpiecznie.',
        'Koszt automatyzacji procesów AI w górę przesuwa głównie liczba systemów do połączenia. Oto co realnie decyduje o tym, czy wylądujesz bliżej 3000 czy 10000 zł netto.',
      ],
      punkty: [
        'Liczba integracji: każdy system (poczta, arkusz, CRM, kalendarz, baza) to osobne połączenie i osobna robota.',
        'Złożoność procesu: jeden wąski krok kontra ciąg zadań od zapytania klienta po gotowy raport.',
        'Ryzyko i koszt błędu: tam, gdzie pomyłka kosztuje realne pieniądze, dochodzą testy, zabezpieczenia i kontrola człowieka.',
        'Jakość danych: uporządkowane treści i procesy skracają wdrożenie, bałagan je wydłuża i podnosi cenę.',
        'Liczba procesów: pojedynczy proces to dolna półka widełek, kilka połączonych procesów to górna.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Jakie procesy zautomatyzować w firmie?',
      akapity: [
        'Najszybciej zwracają się automatyzacje odpowiedzi na maile, zbierania leadów, raportów i notatek ze spotkań. Pokazujemy je na czterech realnych wdrożeniach dla klientów. Tak w praktyce wygląda automatyzacja AI dla firm.',
        'Efekty poniżej pochodzą z realnych wdrożeń, a oszczędności czasu oznaczone „szac." to nasze szacunki, nie pomiar co do minuty.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      podpis: 'Jakie procesy zautomatyzować w firmie?',
      naglowki: [
        'Automatyzacja',
        'Co robi',
        'Efekt',
      ],
      wiersze: [
        [
          'Auto-email dla biura obsługi klienta',
          'Czyta przychodzącego maila, sięga do historii korespondencji i przygotowuje gotowy draft odpowiedzi do akceptacji pracownika',
          '75% maili wymaga już tylko drobnej korekty przed wysłaniem',
        ],
        [
          'Generator leadów',
          'Sam zbiera bazę potencjalnych klientów według zadanych kryteriów i układa ją w gotową listę dla sprzedaży',
          '1000 rekordów w 40 minut zamiast 2 tygodni ręcznej pracy',
        ],
        [
          'Automatyczne raporty',
          'Zbiera dane z kilku źródeł i co rano dostarcza gotowy, aktualny raport bez niczyjego udziału',
          'kilka godzin tygodniowo mniej na ręczne składanie raportów (szac.)',
        ],
        [
          'Podsumowania spotkań',
          'Agent dołącza do spotkania na Meet, Zoom albo Teams, spisuje rozmowę i wysyła raport z zadaniami przypisanymi do osób',
          'kilka godzin tygodniowo mniej na ręczne notatki (szac.)',
        ],
      ],
    },
    {
      typ: 'akapit',
      tekst: 'Każde z tych wdrożeń zaczynało się od jednego procesu, który bolał najbardziej. Takie automatyzacje wyceniamy w widełkach od 3000 do 10000 zł netto, a dokładna kwota zależy od liczby integracji i zakresu. Pełne opisy tych projektów znajdziesz w naszych realizacjach.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Ile kosztuje automatyzacja faktur?',
      wariant: 'top',
      akapity: [
        'Automatyzacja faktur to ten sam mechanizm wyceny: mieści się w widełkach od 3000 do 10000 zł netto, a o kwocie decyduje liczba integracji, na przykład odczyt dokumentów, program księgowy i bank.',
        'Dokładną kwotę w tych widełkach podajemy na bezpłatnej diagnozie, kiedy zobaczymy, jak wygląda obieg dokumentów w Twojej firmie i które systemy trzeba połączyć.',
        'Pełny opis tej usługi, razem z tym, jak działa odczyt dokumentów i jakie liczby dało realne wdrożenie, znajdziesz na naszej stronie automatyzacji faktur i dokumentów.',
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Który proces automatyzować najpierw?',
    },
    {
      typ: 'akapit',
      tekst: 'Zaczynaj od procesu, który boli najbardziej i powtarza się co tydzień. Tak zaczynało się każde z czterech wdrożeń opisanych wyżej. Do wyboru wystarczą trzy kroki.',
    },
    {
      typ: 'kroki',
      wariant: 'plytka',
      kroki: [
        {
          tytul: 'Policz godziny',
          opis: 'Wypisz czynności powtarzane co tydzień: przepisywanie danych, składanie raportów, odpowiadanie na te same maile.',
        },
        {
          tytul: 'Wybierz jeden wąski proces',
          opis: 'Ten najczęstszy i najbardziej bolesny, nie największy. Pojedynczy proces to dolna półka widełek.',
        },
        {
          tytul: 'Zrób mały, odwracalny krok',
          opis: 'AI Start za 1990 zł sprawdza automatyzację na próbę. Gdy procesów jest kilka i nie wiesz, od którego zacząć, wybierz audyt AI za 1490 zł netto.',
        },
      ],
    },
    {
      typ: 'sekcja',
      chip: 'AI Start',
      naglowek: 'Jak sprawdzić automatyzację za 1990 zł, zanim wydasz więcej?',
      akapity: [
        'AI Start to pierwsza automatyzacja na próbę za 1990 zł. Wybieramy jeden wąski, powtarzalny proces, automatyzujemy go i pokazujemy efekt na Twoich danych, nie na naszych slajdach.',
        'To celowo mały, odwracalny krok: najpierw widzisz, jak automatyzacja działa u Ciebie, dopiero potem decydujesz o pełnym wdrożeniu za 3000 do 10000 zł netto. Jeśli po próbie uznasz, że to nie dla Ciebie, kończymy współpracę bez wchodzenia w większy budżet.',
      ],
    },
    {
      typ: 'sekcja',
      chip: 'Audyt AI',
      wariant: 'quiet',
      naglowek: 'Po co audyt AI za 1490 zł netto przed wdrożeniem?',
      akapity: [
        'Audyt AI za 1490 zł netto to mapa przed podróżą. W 5 dni roboczych rozkładamy Twoje procesy na czynniki i pokazujemy, gdzie automatyzacja da realny zysk, a gdzie to przepalanie pieniędzy. Dostajesz raport PDF z Action Planem ułożonym od największego zwrotu.',
        'Cenę audytu odliczamy w całości od wdrożenia, więc jeśli ruszamy z robotą, audyt w praktyce nic Cię nie kosztuje. Ma sens szczególnie wtedy, kiedy procesów do automatyzacji jest kilka i nie wiesz, od którego zacząć.',
      ],
    },
    {
      typ: 'sekcja',
      chip: 'Opieka po wdrożeniu',
      naglowek: 'Czy automatyzacja wymaga opieki po wdrożeniu?',
      akapity: [
        'Tak, i mówimy to wprost, bo to część realnego kosztu. Automatyzacja łączy się z narzędziami, które żyją: dostawca zmienia coś po swojej stronie, w firmie pojawia się nowy krok procesu, zmienia się arkusz albo skrzynka.',
        'Dlatego do każdego wdrożenia proponujemy opiekę w abonamencie od 99 do 599 zł netto miesięcznie, zależnie od pakietu, a gdy wolisz wziąć infrastrukturę do siebie, nie płacisz nam abonamentu. Zawsze pokazujemy oba modele rozliczenia.',
        'Nie zostawiamy klientów z automatem, którego nikt nie pilnuje: monitorujemy działanie i poprawiamy to, co się zmieniło po stronie narzędzi.',
      ],
      stopka: [
        'Firmy, które chcą co miesiąc rozwijać automatyzacje o kolejne procesy, mogą przejść na osobną usługę Opieki AI rozliczaną ryczałtem godzin.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      podpis: 'Dwa modele rozliczenia po wdrożeniu',
      naglowki: [
        'Model',
        'Co to znaczy',
        'Koszt miesięczny',
      ],
      wiersze: [
        [
          'Projekt u nas',
          'Monitoring i poprawki tego, co zmieniło się po stronie narzędzi',
          'od 99 do 599 zł netto/mies.',
        ],
        [
          'Przekazanie infrastruktury',
          'Bierzesz całość do siebie, my jej nie utrzymujemy',
          '0 zł abonamentu',
        ],
      ],
    },
    {
      typ: 'cytat',
      tekst: 'Automatyzacja kosztuje raz. Ręczna robota kosztuje co miesiąc, bez końca.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak policzyć, czy automatyzacja się zwróci?',
      wariant: 'edge',
      akapity: [
        'Rachunek jest prosty. Policz godziny, które co tydzień znikają na przepisywaniu danych, składaniu raportów i odpowiadaniu na te same maile. Pomnóż przez koszt godziny pracy w Twojej firmie i porównaj z ceną wdrożenia oraz abonamentu opieki. Skalę pokazują nasze realizacje:',
        'Jeśli rozważasz coś więcej niż automatyzację, czyli agenta AI, który sam prowadzi cały proces i podejmuje akcje w wielu systemach, zajrzyj też do naszego poradnika o koszcie wdrożenia AI agenta dla firmy.',
      ],
      punkty: [
        'Auto-email w Instytucie Kryptografii: 80% draftów odpowiedzi jest gotowych do wysyłki przy 580 mailach tygodniowo, a 75% maili wymaga już tylko drobnej korekty przed wysłaniem.',
        'Generator leadów: 1000 rekordów w 40 minut zamiast 2 tygodni ręcznej pracy.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Ile trwa wdrożenie automatyzacji?',
      chip: 'ZASADA',
      wariant: 'quiet',
      akapity: [
        'Pojedynczy proces wdrażamy w dni, nie w miesiące. Dokładny termin zależy od liczby integracji i od tego, jak uporządkowane są materiały po Twojej stronie.',
        'Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy. W cenie wdrożenia są dwie rundy poprawek.',
      ],
      punkty: [
        'Tydzień testów po uruchomieniu, potem pierwsza runda poprawek.',
        'Drugi tydzień testów, druga runda poprawek i odbiór.',
        'Konkretny termin dla Twojego procesu ustalamy na bezpłatnej diagnozie.',
      ],
    },
    {
      typ: 'akapit',
      tekst: 'Chcesz znać dokładną kwotę w tych widełkach dla swojego procesu? Policz najpierw oszczędności w naszym darmowym kalkulatorze, a potem umów bezpłatną diagnozę. Pokażemy wycenę na Twoich danych, zanim cokolwiek zamówisz.',
    },
  ],

  faq: [
    {
      pytanie: 'Ile kosztuje automatyzacja AI w firmie?',
      odpowiedz:
        'Wdrożenie automatyzacji AI kosztuje u nas od 3000 do 10000 zł, zależnie od liczby integracji i złożoności procesu. Pierwsza automatyzacja na próbę w pakiecie AI Start to 1990 zł, a audyt AI, który daje mapę opłacalnych procesów, kosztuje 1490 zł netto i jest odliczany od wdrożenia. Po wdrożeniu opieka kosztuje od 99 do 599 zł netto miesięcznie, gdy projekt zostaje u nas, albo 0 zł, gdy przekazujemy Ci infrastrukturę.',
    },
    {
      pytanie: 'Od czego zależy cena automatyzacji AI?',
      odpowiedz:
        'Od liczby integracji, złożoności procesu, ryzyka błędu, jakości danych i liczby procesów. Pojedynczy proces z jedną lub dwiema integracjami to dolna półka widełek, bliżej 3000 zł. Kilka połączonych procesów albo automatyzacja, w której pomyłka kosztuje realne pieniądze, to górna półka, bliżej 10000 zł, bo dochodzą testy i zabezpieczenia.',
    },
    {
      pytanie: 'Ile trwa wdrożenie automatyzacji AI?',
      odpowiedz:
        'Pojedynczy proces wdrażamy w dni, nie w miesiące. Dokładny czas zależy od liczby integracji i od tego, jak uporządkowane są materiały po Twojej stronie: przy jasno opisanym procesie i dostępach do narzędzi idzie szybko, przy bałaganie w danych wdrożenie się wydłuża. Konkretny termin ustalamy na bezpłatnej diagnozie.',
    },
    {
      pytanie: 'Czy automatyzacja AI wymaga opieki po wdrożeniu?',
      odpowiedz:
        'Tak. Narzędzia, z którymi łączy się automatyzacja, zmieniają się z czasem, więc automat bez opieki prędzej czy później się wysypie. Dlatego do każdego wdrożenia proponujemy opiekę w abonamencie od 99 do 599 zł netto miesięcznie: monitorujemy działanie i poprawiamy to, co się zmieniło po stronie narzędzi. Możesz też wziąć całą infrastrukturę do siebie i wtedy nie płacisz nam abonamentu. Nie zostawiamy klientów z automatem bez opiekuna.',
    },
  ],

  queries: [
    'ile kosztuje automatyzacja AI',
    'ile kosztuje automatyzacja AI w firmie',
    'koszt automatyzacji procesów AI',
    'cena automatyzacji AI 2026',
  ],

  powiazaneUslugi: [
    {
      etykieta: 'Automatyzacje procesów AI',
      href: '/uslugi/automatyzacje',
      opis: 'Zobacz, jak przejmujemy powtarzalną robotę i wdrażamy działający proces end-to-end.',
    },
    {
      etykieta: 'Audyt AI: mapa oszczędności czasu',
      href: '/uslugi/audyt-ai',
      opis: 'Za 1490 zł dostajesz mapę procesów z największym zwrotem. Cena odliczana od wdrożenia.',
    },
    {
      etykieta: 'Opieka AI: rozwój w ryczałcie godzin',
      href: '/uslugi/opieka-ai',
      opis: 'Gdy chcesz co miesiąc rozwijać automatyzacje, a nie tylko je utrzymywać.',
    },
  ],

  powiazaneNarzedzia: [
    {
      etykieta: 'Kalkulator oszczędności',
      href: '/narzedzia#kalkulator-oszczednosci',
      opis: 'Policz, ile godzin i pieniędzy odzyska automatyzacja na Twoim procesie.',
    },
  ],

  /* SEO 2026-08-17: blok „Zobacz też" — dwa pozostałe poradniki cenowe. */
  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
      opis: 'Widełki 2026 dla agenta AI, od czego zależy cena i jak policzyć zwrot.',
    },
    {
      etykieta: 'Ile kosztuje chatbot dla firmy w 2026',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
      opis: 'Chatbot prosty 1790 zł netto i 1-2 dni robocze, pełne widełki i koszty utrzymania.',
    },
  ],

  /* v22 (PLAN-v22 §1.5): grupa „Zobacz to na wdrożeniu". To DOKŁADNIE te
     cztery automatyzacje, które opisuje tabela „Co można zautomatyzować?
     Cztery realne wdrożenia" wyżej, a zdanie pod tabelą mówi wprost „Pełne
     opisy tych projektów znajdziesz w naszych realizacjach" i dotąd nie było
     do czego kliknąć.
     ETYKIETA I OPIS PRZEPISANE ZNAK W ZNAK z rejestru lib/realizacje:
     etykieta = `h1`, opis = `metaDescription` tej realizacji. */
  powiazaneRealizacje: [
    {
      etykieta: 'Auto-email dla biura obsługi klienta',
      href: '/realizacje/auto-email-bok',
      opis: 'System AI dla biura obsługi klienta Instytutu Kryptografii: 75% maili wymaga tylko drobnej korekty, drafty gotowe do jednego kliknięcia. Case study.',
    },
    {
      etykieta: 'Błyskawiczny generator leadów',
      href: '/realizacje/lead-generator',
      opis: 'Automat do pozyskiwania leadów: 1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy. Case study, gotowa lista dla sprzedaży.',
    },
    {
      etykieta: 'Automatyczne raporty zamiast ręcznych arkuszy',
      href: '/realizacje/automatyczne-raporty',
      opis: 'Automatyczne raporty: automat spina dane z kilku źródeł i co rano dostarcza gotowy raport. Koniec ręcznego sklejania arkuszy. Case study wdrożenia.',
    },
    {
      etykieta: 'Auto-podsumowania spotkań na Meet, Zoom i Teams',
      href: '/realizacje/auto-podsumowania-spotkan',
      opis: 'Agent AI dołącza do spotkań na Meet, Zoom lub Teams, spisuje je i wysyła raport z zadaniami per uczestnik. Case study: mniej godzin na ręczne notatki.',
    },
  ],
};
