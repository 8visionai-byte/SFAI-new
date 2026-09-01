import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 4 — WIDOCZNOŚĆ W PERPLEXITY
 * (`/uslugi/optymalizacja/perplexity`).
 * Fraza primary: „widoczność w Perplexity" (pakiet `.seo-przeglad/pakiety/geo.md`
 * §P4, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja` i sąsiednich podstron):
 *  - RODZIC sprzedaje CAŁĄ metodę, niezależną od modelu: cztery etapy naprawy
 *    plus pomiar w rytmie w czterech silnikach AI.
 *  - TA STRONA bierze WYŁĄCZNIE Perplexity i stoi na jednej rzeczy, której nie
 *    ma nigdzie indziej: to jedyny popularny asystent, który pokazuje listę
 *    źródeł przy każdej odpowiedzi, więc wynik pracy widać gołym okiem. Cała
 *    narracja idzie wokół „bądź źródłem, nie tłem" i kończy się jedną decyzją:
 *    sprawdźcie, czy jestem na liście źródeł na moich pytaniach.
 *  - NIE MA TU I BYĆ NIE MOŻE: mechaniki ChatGPT (podstrona `chatgpt`),
 *    mechaniki Google i AI Overviews (podstrona `google-ai-overviews`), opisu
 *    powtórnego pomiaru prowadzonego przez nas w rytmie (podstrona
 *    `monitoring-cytowan-w-ai`) ani ogólnego poradnika po robots.txt
 *    (podstrona `dostep-botow-ai`). Tu jest wyłącznie to, co dotyczy dwóch
 *    identyfikatorów Perplexity.
 *  - LINKI DO TAMTYCH PODSTRON WCHODZĄ od rundy 2026-08-31: P2 (chatgpt),
 *    P3 (google-ai-overviews) i P5 (monitoring-cytowan-w-ai) stoją już
 *    w rejestrze `lib/uslugi/podstrony/index.ts`, więc trzy linki odłożone
 *    w poprzedniej rundzie są dopisane w `powiazane`. Wchodzi SAM LINK:
 *    mechanika ChatGPT i Google oraz opis pomiaru w rytmie zostają na tamtych
 *    stronach, tutaj nie ma po nich ani zdania.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła: pakiet §P4 („GOTOWA KAPSUŁA"), przeniesiona DOSŁOWNIE, bez
 *    skracania i bez przepisywania własnymi słowami,
 *  - h1 i komplet nagłówków sekcji 1 do 12: pakiet §P4 (konspekt sekcji),
 *  - jedyny asystent z listą źródeł, efekt widać od razu, akapit z jedną
 *    myślą plus konkret plus data, praca w dwóch częściach (strona i miejsca,
 *    z których Perplexity ciągnie): pakiet §P4 kapsuła,
 *  - „źródło" jako czwarty warunek cytowalnego fragmentu: pakiet §P4 sekcja 4,
 *  - PerplexityBot pobiera treści dla wyszukiwarki Perplexity oraz zasada, że
 *    `Disallow: /` pod `User-agent: *` blokuje także boty niewymienione
 *    z nazwy, plus uwaga, że odblokowanie botów to NIE to samo co zgoda na
 *    trenowanie modelu: pakiet §N4,
 *  - dwa identyfikatory Perplexity i dwa różne skutki blokady: pakiet §P4
 *    sekcja 3 (patrz „CZEGO PAKIET NIE PODAJE" niżej),
 *  - czyste okno, zamrożony zestaw pytań, notowanie wskazania i pozycji
 *    źródła, seria pomiarów zamiast jednego zrzutu ekranu: pakiet §P4
 *    sekcje 5 i 7 oraz §N7,
 *  - cztery pozycje cennika z czasami realizacji, odliczenie Sprintu
 *    Diagnostycznego, dwie rundy poprawek, brak abonamentu po odbiorze:
 *    pakiet §N8, przywołany WPROST przez §P4 punkt 8 („te same pozycje co
 *    w N8"),
 *  - pięć sytuacji „kiedy to nie ma sensu": pakiet §N11, przełożone z całej
 *    usługi na samo Perplexity, BEZ kwot (uwaga wdrożeniowa §6: kwoty na
 *    podstronie wyłącznie w punkcie 8).
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1490 zł netto i 5 dni roboczych (Sprint Diagnostyczny), 1590 zł netto
 *  i 1 dzień roboczy (landing), 2900 zł netto i 2-4 dni robocze (strona
 *  biznesowa), od 5900 zł netto i 5-10 dni roboczych (strona zaawansowana),
 *  dwie rundy poprawek, dwie części pracy, dwa identyfikatory botów.
 *  Wszystkie kwoty zawsze z dopiskiem netto.
 *  ZDANIA KONTRAKTOWE (uwaga wdrożeniowa §8, nie wolno ich „ulepszać"):
 *  „odliczane od wdrożenia" (nigdy „zwracamy"), „dwie rundy poprawek w cenie
 *  wdrożenia", „od 5900 zł" przy stronie zaawansowanej (nigdy „5900 zł").
 *
 * CZEGO PAKIET NIE PODAJE, WIĘC NIE ZOSTAŁO NAPISANE:
 *  - żadnej liczby dla Perplexity: ile domen mieści lista źródeł, ile pytań
 *    jest w zamrożonym zestawie, po ilu dniach domena wchodzi na listę. Zdania
 *    są napisane tak, żeby były prawdziwe bez tych liczb,
 *  - żadnego zmierzonego przypadku klienta W PERPLEXITY. Trzy realizacje
 *    rodzica dotyczą ChatGPT i Google, więc NIE są tu podpięte jako dowód:
 *    doklejenie ich sugerowałoby wynik, którego nie zmierzyliśmy,
 *  - opisu, co dokładnie robi drugi identyfikator PerplexityUser. Pakiet daje
 *    wyłącznie nagłówek „dwa boty, dwa różne skutki blokady", więc sekcja
 *    mówi tylko tyle: to dwa osobne wpisy, jedno ustawienie nie załatwia obu
 *    spraw, sprawdzamy oba. Zero twierdzeń technicznych bez pokrycia.
 *
 * ZAKAZANE NA TEJ STRONIE: gwarancja miejsca na liście źródeł, termin efektu,
 * procenty bez metody, kwoty poza sekcją ceny, powtórka mechaniki ChatGPT
 * i Google.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO),
 * a renderuje się TYMI SAMYMI komponentami co strony usług i pozostałe
 * podstrony. Zero nowych typów bloków, zero nowego CSS.
 */
export const perplexity: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'perplexity',
  dataAktualizacji: '2026-08-31',

  h1: 'Widoczność w Perplexity: jak być źródłem, a nie tłem',

  /* KAPSUŁA 1:1 Z PAKIETU §P4 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w takiej formie,
     w jakiej zostało zatwierdzone. Niesie całą tezę strony: źródła widać,
     więc efekt widać, a droga na listę prowadzi przez dwie części pracy. */
  kapsula:
    'Perplexity jako jedyny popularny asystent pokazuje listę źródeł przy każdej odpowiedzi. To znaczy, że efekt pracy widzisz od razu: albo Twoja domena jest na tej liście, albo nie ma jej tam. Żeby się na niej znaleźć, potrzebujesz akapitów, które niosą jedną myśl, konkret i datę. Praca dzieli się na dwie części: struktura treści na Twojej stronie oraz obecność w miejscach, z których Perplexity ciągnie.',

  /* metaTitle: pakiet §P4 dawał 23 znaki, konwencja repo (types.ts) mówi 50-60.
     2026-08-31 decyzja właściciela: trzymamy konwencję repo. Fraza główna
     „widoczność w Perplexity" zostaje NA POCZĄTKU i bez zmian, a wyróżnik to
     druga połowa zatwierdzonego H1, czyli fakt stojący na tej stronie.
     Długość 52 znaki. Layout dokleja sufiks marki. */
  metaTitle: 'Widoczność w Perplexity: jak być źródłem, a nie tłem',
  metaDescription:
    'Widoczność w Perplexity: pokazujemy, jak wejść na listę źródeł pod odpowiedzią. Akapit z jedną myślą, konkretem i datą, plus obecność poza Twoją stroną.',

  problem: {
    /* H2 1:1 z pakietu §P4 sekcja 1. */
    h2: 'Perplexity pokazuje źródła przy odpowiedzi, dlaczego nigdy nie ma tam Ciebie?',
    tresc:
      'Zadajesz Perplexity pytanie ze swojej branży i dostajesz gotową odpowiedź, a obok listę stron, z których została złożona. Przeglądasz ją i Twojej domeny na niej nie ma.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'To jedyne miejsce, w którym nie musisz nikomu wierzyć na słowo. W innych asystentach zostaje pytanie, czy nazwa firmy padła w odpowiedzi. Tutaj lista źródeł leży pod odpowiedzią i albo jest na niej Twoja domena, albo nie ma jej tam.',
      },
      {
        typ: 'naglowek',
        tekst: 'Jak Perplexity buduje odpowiedź i dlaczego cytuje konkretne akapity?',
        ikona: 'lupa-wykres',
        chip: 'GEO',
        overline: 'ŹRÓDŁA WIDAĆ GOŁYM OKIEM',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Odpowiedź powstaje z cudzych zdań',
            akapity: [
              'Perplexity nie streszcza całego internetu. Składa odpowiedź z fragmentów konkretnych stron i pokazuje je obok jako listę źródeł.',
            ],
          },
          {
            naglowek: 'Cytowalny jest fragment, nie strona',
            akapity: [
              'Na listę wchodzi strona, z której dało się wyjąć gotowy kawałek. Jeśli Twoja myśl jest rozsypana na trzy akapity, nie ma czego wyjąć.',
            ],
          },
          {
            naglowek: 'Efekt widać od razu',
            akapity: [
              'Nie czekasz na raport, żeby poznać punkt wyjścia. Otwierasz odpowiedź, patrzysz na listę pod nią i wiesz, gdzie jesteś.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'PerplexityBot i PerplexityUser: dwa boty, dwa różne skutki blokady',
        akapity: [
          'Perplexity ma w plikach robots.txt dwa osobne identyfikatory, a nie jeden. Blokada każdego z nich daje inny skutek, więc jedno ustawienie nie załatwia obu spraw. Dlatego czytamy oba wpisy, a nie tylko ten, który akurat wpadnie w oko.',
          'PerplexityBot pobiera treści dla wyszukiwarki Perplexity. Jeśli stoi przy nim Disallow, model nie ma z czego zbudować wpisu o Tobie i lista źródeł jest dla Ciebie zamknięta, choćbyś napisał najlepsze akapity w branży.',
        ],
        punkty: [
          'Jeden wpis Disallow ustawiony dla wszystkich botów naraz blokuje także te, których nie ma w pliku z nazwy. To najczęstsza przyczyna nieobecności, o której nikt w firmie nie wie.',
          'Odblokowanie botów AI to nie to samo co zgoda na trenowanie modelu na Twoich tekstach. To dwie osobne decyzje i obie omawiamy z Tobą, zanim cokolwiek zmienimy.',
          'Ustawiamy oba wpisy świadomie, zamiast zamykać wszystko jednym Disallow albo otwierać wszystko na oślep.',
        ],
        wariant: 'edge',
        chip: 'ROBOTS.TXT',
      },
    ],
  },

  rozwiazanie: {
    /* Sekcje 4 i 6 pakietu §P4 w jednym miejscu: najpierw JAK pisać fragment,
       potem podział pracy na stronę i to, co poza nią. */
    h2: 'Co zmieniamy na stronie i poza nią, żeby Perplexity Cię cytowało?',
    tresc:
      'Praca dzieli się na dwie części. Na stronie przepisujemy akapity tak, żeby dało się z nich wyjąć gotowy cytat. Poza stroną pracujemy nad obecnością w miejscach, z których Perplexity ciągnie w Twojej sprawie.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Jak pisać fragmenty, które da się zacytować?',
        ikona: 'notes-pioro',
        chip: 'TREŚĆ',
        overline: 'JEDNA MYŚL · KONKRET · DATA · ŹRÓDŁO',
      },
      {
        typ: 'kroki',
        wariant: 'kolo',
        kroki: [
          {
            tytul: 'Jedna myśl na akapit',
            opis: 'Akapitu, który niesie trzy sprawy naraz, nie da się wyjąć w całości ani skrócić bez straty sensu. Rozbijamy go na tyle akapitów, ile jest myśli.',
            meta: 'warunek 1',
          },
          {
            tytul: 'Konkret zamiast ogólnika',
            opis: 'Liczba, nazwa własna, zakres, warunek. Zdanie bez konkretu nadaje się do przeczytania, ale nie nadaje się do zacytowania jako źródło.',
            meta: 'warunek 2',
          },
          {
            tytul: 'Data przy konkrecie',
            opis: 'Konkret bez daty starzeje się po cichu. Data mówi wprost, na kiedy to jest prawda, i to ona odróżnia fragment aktualny od archiwalnego.',
            meta: 'warunek 3',
          },
          {
            tytul: 'Źródło podane wprost',
            opis: 'Skąd to wiadomo: własny pomiar, cennik, dokument, publiczna strona dostawcy. Fragment, który sam mówi o swoim źródle, jest bezpieczniejszy do zacytowania.',
            meta: 'warunek 4',
          },
        ],
      },
      {
        typ: 'przelacznik',
        grupa: 'perplexity-dwie-czesci',
        opcje: [
          {
            numer: 'CZĘŚĆ 1',
            tytul: 'Na Twojej stronie',
            podtytul: 'struktura treści',
            naglowek: 'Przepisujemy kluczowe strony tak, żeby dało się z nich wyjąć gotowy fragment.',
            akapity: [
              'To jest cała robota redakcyjna z czterech warunków powyżej, wykonana na Twoich tekstach, a nie opisana w poradniku. Zaczynamy od stron, które odpowiadają na pytania Twoich klientów, bo to one mają szansę trafić do odpowiedzi.',
            ],
            punkty: [
              'jedna myśl na akapit, na każdej kluczowej stronie',
              'konkret i data w miejscu, w którym dziś stoi ogólnik',
              'źródło konkretu widoczne w tekście, nie w domyśle',
              'wpisy PerplexityBot i PerplexityUser ustawione świadomie',
            ],
          },
          {
            numer: 'CZĘŚĆ 2',
            tytul: 'Poza Twoją stroną',
            podtytul: 'miejsca, z których Perplexity ciągnie',
            naglowek: 'Lista źródeł mówi wprost, skąd Perplexity bierze odpowiedź w Twojej sprawie.',
            akapity: [
              'Tu nie ma zgadywania, które miejsca się liczą. Wypisujemy domeny, które model zacytował na Twoich pytaniach, i pracujemy nad obecnością dokładnie tam, zamiast rozsypywać wysiłek po całym internecie.',
            ],
            punkty: [
              'lista źródeł z odpowiedzi jest gotową listą celów',
              'pracujemy nad miejscami, które model już cytuje',
              'to część wolniejsza, bo nie stoi na Twoim serwerze',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Jak mierzymy postęp?',
        akapity: [
          'Na jednym zestawie pytań, zamrożonym raz i powtarzanym bez zmian. Zmiana jednego słowa psuje porównanie, więc zestaw zostaje taki sam za każdym razem.',
          'Przy każdym pomiarze notujemy dwie rzeczy: czy Twoja domena jest wskazana i na którym miejscu listy źródeł stoi. Pierwsza pozycja waży inaczej niż czwarta.',
        ],
        punkty: [
          'ten sam zestaw pytań, ta sama kolejność, czyste okno',
          'wskazanie: czy Twoja domena w ogóle jest na liście',
          'pozycja źródła: gdzie stoi względem innych domen',
          'porównanie dwóch stanów, a nie jeden zrzut ekranu',
        ],
        wariant: 'top',
        chip: 'POMIAR',
        stopka: [
          'Modele zmieniają odpowiedzi, więc liczy się seria pomiarów, a nie jeden dzień.',
          'Metodę pokazujemy w całości, więc możesz powtórzyć ten sam pomiar sam.',
        ],
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: cecha ~12 znaków, kolumny ~30),
     żeby wiersze nie łamały się na wąskich ekranach. Tabela świadomie NIE
     porównuje SEO z GEO (to tabela rodzica), tylko dwa akapity o tej samej
     treści: jeden nie do wyjęcia, drugi gotowy na listę źródeł. */
  tabelaPorownawcza: {
    h2: 'Akapit nie do cytowania a akapit gotowy na listę źródeł',
    naglowekBez: 'Akapit nie do cytowania',
    naglowekZNami: 'Akapit gotowy do cytatu',
    wiersze: [
      {
        cecha: 'Myśli w akapicie',
        bez: 'Kilka naraz, jedna po drugiej',
        zNami: 'Jedna myśl, jeden akapit',
      },
      {
        cecha: 'Konkret',
        bez: 'Ogólnik bez liczby i nazwy',
        zNami: 'Liczba, nazwa własna, zakres',
      },
      {
        cecha: 'Data',
        bez: 'Brak, więc wiek treści nieznany',
        zNami: 'Data przy konkrecie',
      },
      {
        cecha: 'Źródło',
        bez: 'Nie wiadomo, skąd to wiadomo',
        zNami: 'Podane wprost w tekście',
      },
      {
        cecha: 'Co robi model',
        bez: 'Musi streszczać całą stronę',
        zNami: 'Wycina gotowy fragment',
      },
      {
        cecha: 'Lista źródeł',
        bez: 'Bez Twojej domeny',
        zNami: 'Twoja domena wśród źródeł',
      },
    ],
  },

  /* Sekcje 5 i 7 pakietu §P4 ściśnięte do trzech kroków, które klient robi SAM.
     Świadomie nie powtarzają trzech kroków rodzica (diagnoza, naprawa, pomiar),
     bo tu chodzi o jedną czynność: odczytanie listy źródeł pod odpowiedzią. */
  kroki: {
    h2: 'Jak sprawdzić samemu, czy Perplexity Cię cytuje?',
    items: [
      {
        tytul: 'Zapytaj w czystym oknie',
        opis: 'Nowe okno, bez historii rozmów i bez zalogowanego konta. Pytanie ma brzmieć jak zdanie z rozmowy telefonicznej, a nie jak hasło z narzędzia SEO.',
      },
      {
        tytul: 'Przeczytaj listę źródeł pod odpowiedzią',
        opis: 'Sprawdź dwie rzeczy: czy jest tam Twoja domena i na którym miejscu stoi. Przy okazji masz gotową listę stron, które są cytowane zamiast Ciebie.',
      },
      {
        tytul: 'Powtórz ten sam zestaw',
        opis: 'Te same pytania, ta sama kolejność, czyste okno. Zamrożony zestaw to jedyny sposób, żeby porównać stan sprzed zmian ze stanem po nich.',
      },
    ],
  },

  ramaCeny: {
    /* PUNKT 8 pakietu §P4: „te same pozycje co w N8". Kwoty stoją WYŁĄCZNIE
       w tej sekcji (uwaga wdrożeniowa §6) i są przepisane z §N8 co do złotówki,
       razem ze zdaniami kontraktowymi (§8). Wszystkie kwoty netto. */
    h2: 'Ile trwa i ile kosztuje wejście na listę źródeł Perplexity?',
    tresc:
      'Zaczynamy od Sprintu Diagnostycznego, czyli audytu AI: 1490 zł netto, 5 dni roboczych, raport PDF. Kwotę odliczamy w całości od ceny wdrożenia. Jeśli treść trzeba napisać od nowa, wchodzi jedna z trzech pozycji stron. Wszystkie ceny są netto.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1490 zł netto',
            opis: 'Sprint Diagnostyczny, czyli audyt AI, odliczany od wdrożenia',
            zrodlo: 'tabela cen niżej',
            ton: 'cyan',
          },
          {
            wartosc: '5 dni roboczych',
            opis: 'tyle trwa Sprint Diagnostyczny, kończy się raportem PDF',
            zrodlo: 'tabela cen niżej',
            ton: 'violet',
          },
          {
            wartosc: '1590 zł netto',
            opis: 'landing pisany pod cytowanie, jeden dzień roboczy',
            zrodlo: 'tabela cen niżej',
            ton: 'green',
          },
          {
            wartosc: '2900 zł netto',
            opis: 'strona biznesowa pod cytowanie, 2-4 dni robocze',
            zrodlo: 'tabela cen niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Cztery pozycje, każda z ceną i czasem',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'WSZYSTKIE KWOTY NETTO',
      },
      {
        typ: 'tabela',
        naglowki: ['Co kupujesz', 'Ile kosztuje', 'Ile trwa', 'Co dostajesz'],
        wiersze: [
          [
            'Sprint Diagnostyczny, czyli audyt AI',
            '1490 zł, odliczane od wdrożenia',
            '5 dni roboczych',
            'Raport PDF z pomiarem zerowym, lista priorytetów, plan wdrożenia, lista pytań kontrolnych',
          ],
          [
            'Landing pisany pod cytowanie',
            '1590 zł',
            '1 dzień roboczy',
            'Jedna strona napisana pod cytowanie, dane strukturalne, uporządkowany robots.txt',
          ],
          [
            'Strona biznesowa pod cytowanie',
            '2900 zł',
            '2-4 dni robocze',
            'Kilka podstron, encja firmy, sekcje odpowiadające wprost na pytania klienta, SEO i przygotowanie pod AI',
          ],
          [
            'Strona zaawansowana',
            'od 5900 zł',
            '5-10 dni roboczych',
            'Rozbudowana struktura podstron pod pytania klientów, sklep lub wpięte narzędzia, pełne wdrożenie techniczne',
          ],
        ],
        wKarcie: true,
        podpis: 'Cennik pracy nad widocznością w Perplexity: cztery pozycje, wszystkie kwoty netto',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co jest w cenie wdrożenia?',
        akapity: [
          'Kwotę za Sprint Diagnostyczny odliczamy w całości od ceny wdrożenia. Płacisz za nią raz, nie dwa razy.',
        ],
        punkty: [
          'Dwie rundy poprawek w cenie wdrożenia: tydzień Twoich testów, poprawki, drugi tydzień testów, poprawki, odbiór.',
          'Funkcje, o których nie było mowy na pierwszej rozmowie, wyceniamy osobno.',
          'Po odbiorze nie ma abonamentu. Strona i wszystkie pliki zostają u Ciebie.',
        ],
        wariant: 'quiet',
        chip: 'CENNIK',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy praca nad Perplexity nie ma sensu?',
        akapity: [
          'Wolimy stracić zlecenie niż wziąć pieniądze za coś, co u Ciebie nie zadziała. Mówimy to przed zamówieniem, nie po.',
        ],
        punkty: [
          'Strona powstała w kreatorze, w którym nie da się ruszyć kodu ani pliku robots.txt: nie mamy czym pracować, więc najpierw strona, potem widoczność.',
          'Sprzedajesz wyłącznie z poleceń i tak chcesz zostać: lista źródeł w Perplexity nie da Ci nic poza rachunkiem.',
          'Potrzebujesz zapytań na już: kampania płatna zrobi to szybciej, a wejście na listę źródeł to kwestia tygodni, nie dni.',
          'Chcesz gwarancji miejsca na liście źródeł: nikt uczciwy jej nie da, my też nie, bo modele zmieniają odpowiedzi.',
          'Jesteś bardzo lokalną usługą bez wizytówki i opinii: najpierw wizytówka i opinie, bo to tańsze i szybsze.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz siebie w którymś z tych punktów? Napisz i tak.',
          'Powiemy, co zrobić zamiast, nawet jeśli to nie będzie usługa u nas.',
        ],
      },
    ],
    /* Najtańsza pozycja z tabeli powyżej, czyli realny próg wejścia: Sprint
       Diagnostyczny 1490 zł netto. Bez `cenaStala`, bo dalsze pozycje są
       wyższe, więc kafel ceny ma pokazać „od 1490 zł", a nie cenę jedyną. */
    minPrice: 1490,
    linkPoradnik: {
      przed: 'Cała metoda, wspólna dla czterech silników AI, stoi na stronie ',
      etykieta: 'pozycjonowanie pod AI',
      po: '.',
      href: '/uslugi/optymalizacja',
    },
  },

  /* Osiem pytań (pakiet §P4 punkt 11). Pakiet nie podaje ich treści wprost,
     więc napisane z faktów tej strony: kapsuła §P4, sekcje 3, 4, 5, 7 i 8.
     Ten sam tekst idzie na stronę i do FAQPage JSON-LD. */
  faq: [
    {
      pytanie: 'Czym widoczność w Perplexity różni się od widoczności w ChatGPT?',
      odpowiedz:
        'Perplexity jako jedyny popularny asystent pokazuje listę źródeł przy każdej odpowiedzi, więc od razu widzisz, czy Twoja domena tam jest. W pozostałych asystentach zostaje sam pomiar: czy nazwa firmy padła w odpowiedzi. Sposób pisania treści jest ten sam, różni się sposób sprawdzania wyniku.',
    },
    {
      pytanie: 'Jak sprawdzić, czy Perplexity cytuje moją stronę?',
      odpowiedz:
        'Zadaj swoje pytanie w nowym oknie, bez historii rozmów i bez zalogowanego konta, a potem przeczytaj listę źródeł pod odpowiedzią. Notujesz dwie rzeczy: czy jest tam Twoja domena i na którym miejscu stoi.',
    },
    {
      pytanie: 'Co to jest PerplexityBot?',
      odpowiedz:
        'PerplexityBot pobiera treści dla wyszukiwarki Perplexity. Jeśli w Twoim pliku robots.txt stoi przy nim Disallow, model nie ma z czego zbudować wpisu o Tobie, więc lista źródeł jest dla Ciebie zamknięta niezależnie od jakości treści.',
    },
    {
      pytanie: 'Czym PerplexityUser różni się od PerplexityBot?',
      odpowiedz:
        'To dwa osobne identyfikatory w pliku robots.txt i blokada każdego z nich daje inny skutek, więc jedno ustawienie nie załatwia obu spraw. Dlatego sprawdzamy oba wpisy i ustawiamy je świadomie, zamiast zamykać wszystko jednym Disallow.',
    },
    {
      pytanie: 'Czy wpuszczenie botów Perplexity oznacza zgodę na trenowanie modelu na moich tekstach?',
      odpowiedz:
        'Nie. Odblokowanie botów AI to nie to samo co zgoda na trenowanie modelu na Twoich tekstach. To dwie osobne decyzje i obie omawiamy z Tobą, zanim cokolwiek zmienimy.',
    },
    {
      pytanie: 'Jak napisać akapit, który Perplexity może zacytować?',
      odpowiedz:
        'Jedna myśl na akapit, konkret w postaci liczby albo nazwy własnej, data przy tym konkrecie i źródło podane wprost. Akapitu, który niesie trzy sprawy naraz, nie da się wyjąć w całości, więc model sięgnie po czyjś prostszy.',
    },
    {
      pytanie: 'Po jakim czasie moja domena pojawi się na liście źródeł?',
      odpowiedz:
        'Nie podajemy terminu, bo go nie kontrolujemy. Modele zmieniają odpowiedzi i ta sama strona bywa cytowana jednego dnia, a pominięta drugiego, bez żadnej zmiany po Twojej stronie. Dlatego liczy się seria pomiarów na zamrożonym zestawie pytań, a nie jeden zrzut ekranu.',
    },
    {
      pytanie: 'Ile kosztuje praca nad widocznością w Perplexity?',
      odpowiedz:
        'Zaczynamy od Sprintu Diagnostycznego, czyli audytu AI: 1490 zł netto, 5 dni roboczych, raport PDF, kwota odliczana od wdrożenia. Jeśli treść trzeba napisać od nowa: landing 1590 zł, strona biznesowa 2900 zł, strona zaawansowana od 5900 zł. Wszystkie kwoty są netto.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P4 punkt 12): pokażcie mi moją
     listę źródeł. Mikrokopia BEZ kwot, bo na podstronie kwoty stoją wyłącznie
     w sekcji ceny (uwaga wdrożeniowa §6). */
  cta: {
    label: 'Sprawdź, czy Perplexity Cię cytuje',
    href: '#diagnoza',
    mikrokopia:
      'Zadajemy Twoje pytania w czystym oknie i pokazujemy listę źródeł pod odpowiedzią: czy jest tam Twoja domena, na którym miejscu i kto stoi zamiast Ciebie.',
    dowod:
      'Metodę pokazujemy w całości, więc ten sam pomiar powtórzysz sam, w każdej chwili i bez naszego udziału.',
  },

  queries: [
    'widoczność w Perplexity',
    'jak być cytowanym w Perplexity',
    'lista źródeł w Perplexity',
    'PerplexityBot robots.txt',
    'pozycjonowanie w Perplexity',
    'jak trafić na listę źródeł Perplexity',
  ],

  /* POWIĄZANIA (pakiet §P4 sekcja 10 plus uwaga wdrożeniowa §3: każda podstrona
     linkuje z powrotem do rodzica). RUNDA 2026-08-31: komplet trzech celów
     z konspektu (ChatGPT, AI Overviews, powtórny pomiar) jest dopisany, bo te
     trasy stoją już w rejestrze podstron. Zostaje rodzic i siostra audytu.
     REALIZACJE ŚWIADOMIE PUSTE: trzy realizacje rodzica dotyczą ChatGPT
     i Google, więc podpięcie ich tutaj sugerowałoby zmierzony wynik
     w Perplexity, którego nie mamy. W opisach kart ZERO kwot (uwaga
     wdrożeniowa §6: kwoty wyłącznie w sekcji ceny). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Cała metoda wspólna dla czterech silników AI: naprawa strony, autorytet poza nią i pomiar cytowań co tydzień.',
      },
      {
        etykieta: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',
        href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
        opis: 'Pierwszy, płatny krok: pomiar zerowy na Twoich pytaniach i raport PDF z listą priorytetów.',
      },
      {
        etykieta: 'Jak sprawić, żeby ChatGPT polecał Twoją firmę',
        href: '/uslugi/optymalizacja/chatgpt',
        opis: 'Model bez listy źródeł: zamknięte odpowiedzi na pytania klienta, spójna encja firmy i dostęp dla GPTBot w robots.txt.',
      },
      {
        etykieta: 'Jak trafić do odpowiedzi AI w Google (AI Overviews)',
        href: '/uslugi/optymalizacja/google-ai-overviews',
        opis: 'Ekosystem Google: do podsumowania AI nad wynikami potrzebujesz mocnej pozycji organicznej i treści, z której da się wyciąć gotowe zdanie.',
      },
      {
        etykieta: 'Monitoring cytowań w AI: powtarzalny pomiar, czy modele Cię polecają',
        href: '/uslugi/optymalizacja/monitoring-cytowan-w-ai',
        opis: 'Ten sam zamrożony zestaw pytań powtarzany w czasie. Jeden pomiar to zdjęcie, dopiero seria pokazuje trend.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis: 'Dziesięć pytań o Twojej stronie pokazuje, czy ChatGPT i Perplexity mogą ją cytować, i co naprawić najpierw.',
      },
    ],
  },
};
