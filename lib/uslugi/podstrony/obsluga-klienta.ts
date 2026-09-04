import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 2 — CHATBOT DO OBSŁUGI KLIENTA
 * (`/uslugi/chatboty/obsluga-klienta`).
 * Fraza primary: „chatbot do obsługi klienta" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P2, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/chatboty`):
 *  - RODZIC sprzedaje CAŁĄ usługę: trzy progi cenowe, różnicę wobec AI Agenta,
 *    dobę firmy, rundy poprawek, realizację Instytutu Kryptografii.
 *  - TA STRONA sprzedaje WYŁĄCZNIE odciążenie biura obsługi i kończy się jedną
 *    decyzją: bierzemy bota, który odpisuje na powtarzalne pytania. Jest tu
 *    więc: podział wątków na powtarzalne i trudne, jawna granica bota, moment
 *    przekazania sprawy człowiekowi, trzy warstwy bota, wdrożenie, cena
 *    i model utrzymania, bezpieczeństwo danych, kiedy bot nie ma sensu.
 *  - NIE MA TU I BYĆ NIE MOŻE: tematu leadów (`/generowanie-leadow`),
 *    dokumentów wewnętrznych i uprawnień (`/asystent-wewnetrzny`), rozkładu
 *    cennika na trzy progi (`/cennik`) ani mechaniki RAG (`/baza-wiedzy`).
 *    Treść tych tematów zostaje na tamtych stronach. Ostatnie pytanie FAQ
 *    („Czy bot może zbierać kontakty w trakcie rozmowy?") to JEDYNE miejsce,
 *    w którym temat leadów tu w ogóle pada. Odpowiedź jest skrócona do jednego
 *    zdania i odsyła do `/uslugi/chatboty/generowanie-leadow`, więc wątek
 *    leadów kończy się tutaj, a rozwija się na swojej stronie.
 *  - CELOWO INNE UJĘCIE NIŻ RODZIC: rodzic pyta „ile razy dziennie
 *    odpowiadasz na to samo pytanie" i opisuje trzy pory doby. Ta strona każe
 *    podzielić tydzień skrzynki na dwa stosy i pilnuje granicy między nimi.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P2, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami; pytanie
 *    „Czy chatbot zastąpi mój dział obsługi klienta?" brzmi z tego powodu
 *    podobnie do pytania rodzica i tak ma zostać). JEDYNY WYJĄTEK: odpowiedź
 *    na ostatnie pytanie, skrócona z powodu rozdziału intencji, uzasadnienie
 *    stoi w komentarzu przy niej,
 *  - Desant.pl (30-50 klientów miesięcznie, 200-280 wiadomości): pakiet §P2
 *    sekcja 4, źródło pierwotne REALIZACJE. Desant.pl NIE MA strony
 *    w `lib/realizacje`, więc nazwa pada w treści bez linku (pakiet
 *    `wdrozenia.md` §7: nie podstawiamy kotwicy zastępczej),
 *  - cena 1790 zł netto i czas 1-2 dni robocze: pakiet §P2 sekcja 7 oraz FAQ,
 *    zgodne co do złotówki z `lib/uslugi/chatboty.ts` (próg „prosty"),
 *  - model utrzymania (99-599 zł netto miesięcznie u nas, 0 zł po przekazaniu
 *    infrastruktury, poprawki 350 zł netto za godzinę): pakiet §P2 sekcja 7
 *    plus uwaga wdrożeniowa §7, która każe temu brzmieć IDENTYCZNIE wszędzie,
 *  - zasada liczenia czasu od przekazania materiałów, dane w Unii Europejskiej,
 *    model Claude od Anthropic: `lib/uslugi/chatboty.ts` i uwaga wdrożeniowa §9.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1790 zł netto, 1-2 dni robocze, 99-599 zł netto miesięcznie, 0 zł,
 *  350 zł netto za godzinę, 30-50 klientów miesięcznie, 200-280 wiadomości,
 *  trzy warstwy bota, godzina 22:00 z H1 pakietu.
 *  NASZE kwoty zawsze z dopiskiem netto; przy „0 zł" dopisku nie ma, bo zero
 *  netto to zero brutto. Kwoty stoją WYŁĄCZNIE w kapsule, meta, sekcji ceny,
 *  FAQ i mikrokopii CTA (uwaga wdrożeniowa: zero kwot w kartach „Powiązane").
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje, ile powtarzalnych
 *  wiadomości ma przeciętna firma, ile godzin schodzi na odpisywanie ani po
 *  ilu miesiącach bot się zwraca. Rachunek jest więc opisany WZOREM bez ani
 *  jednej wartości domyślnej (uwaga wdrożeniowa §3: „Koszt podajesz Ty").
 *  Nie ma tu też żadnego odniesienia czasowego w stylu „pół roku temu",
 *  bo pakiet nie podaje dat wdrożenia u Desant.pl.
 *
 * ZAKAZANE NA TEJ STRONIE: dwa komunikatory firmowe wykluczone przez uwagę
 * wdrożeniową §8 (lista kanałów bota jest zamknięta i stoi na podstronie
 * o kanałach), sugerowanie innego dostawcy modelu niż Anthropic (§9), ceny
 * konkurencji (§12: w tym pakiecie ich nie ma), obietnica pomiaru, testu,
 * audytu ani raportu na bezpłatnej rozmowie (ustalenie właściciela
 * z 2026-08-31), nazwa handlowa zakazana w całym repo dla bota udającego
 * osobę przy firmowym telefonie oraz jakiekolwiek zdanie, że voicebot dzwoni
 * sam (wolno wyłącznie w zaprzeczeniu).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług i pozostałe podstrony. Zero nowych typów
 * bloków, zero nowego CSS.
 */
export const obslugaKlienta: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'obsluga-klienta',
  dataAktualizacji: '2026-09-01',

  h1: 'Chatbot do obsługi klienta, który odpowiada o 22:00',

  /* KAPSUŁA 1:1 Z PAKIETU §P2. Nie skracać i nie przepisywać: to zdanie ma być
     cytowane przez modele w formie, w jakiej zostało zatwierdzone. Niesie
     komplet wielkości strony: co robi, na jakiej skali, ile kosztuje, ile
     trwa i gdzie przebiega granica bota. */
  kapsula:
    'Chatbot do obsługi klienta przejmuje powtarzalne pytania i odpowiada wtedy, gdy nikogo nie ma przy biurku. U Desant.pl obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości. Kosztuje od 1790 zł netto i działa po 1-2 dniach roboczych. Trudną sprawę przekazuje człowiekowi, zamiast udawać, że umie ją domknąć.',

  /* metaTitle: pakiet §P2 dawał 35 znaków, konwencja repo (types.ts) mówi
     50-60 i decyzja właściciela każe trzymać konwencję repo. Fraza główna
     „chatbot do obsługi klienta" zostaje NA POCZĄTKU i bez zmian, wyróżnik to
     wyłącznie fakty z tej strony (cena i czas, oba stoją w kapsule i w ramie
     ceny). Długość 53 znaki. Layout dokleja sufiks marki, więc w SERP wychodzi
     „Chatbot do obsługi klienta: od 1790 zł netto, 1-2 dni · SimpleFast.ai". */
  metaTitle: 'Chatbot do obsługi klienta: od 1790 zł netto, 1-2 dni',
  /* 159 znaków (policzone na stringu, mieści się w konwencji 140-160). */
  metaDescription:
    'Chatbot do obsługi klienta przejmuje powtarzalne pytania i odpisuje po godzinach. Od 1790 zł netto, gotowy w 1-2 dni robocze. Trudną sprawę oddaje człowiekowi.',

  problem: {
    /* H2 z pakietu §P2 sekcja 1 („ile pytań zadano Ci po raz setny"),
       przeformułowany tak, żeby nie powtarzał brzmienia H2 rodzica („Ile razy
       dziennie odpowiadasz na to samo pytanie?") i żeby podmiotem było biuro
       obsługi, czyli temat tej podstrony. */
    h2: 'Na które pytania Twoje biuro obsługi odpisuje po raz setny?',
    tresc:
      'Powtarzalne pytania nie są trudne, tylko liczne. To samo pytanie, ta sama odpowiedź, inny nadawca i inna godzina. Biuro obsługi pracuje w swoich godzinach, a pytania przychodzą przez całą dobę.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Podziel tydzień skrzynki na dwa stosy',
        ikona: 'chat-dymek',
        chip: 'OBSŁUGA KLIENTA',
        overline: 'JEDEN TYDZIEŃ · DWA RODZAJE WĄTKÓW',
      },
      {
        typ: 'akapit',
        tekst:
          'Otwórz skrzynkę biura obsługi z ostatniego tygodnia i rozłóż wątki na dwa stosy. Na pierwszym leżą pytania, na które odpowiedź jest jedna i stoi w Twoich materiałach. Na drugim sprawy, przy których ktoś musiał usiąść i pomyśleć. Pierwszy stos jest zwykle grubszy, a zjada tyle samo uwagi co drugi.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Pytanie, które zna cały zespół',
            akapity: [
              'Ile trwa realizacja, co trzeba przygotować, jak wygląda reklamacja. Odpowiedź nie zmieniła się od dawna, a mimo to ktoś pisze ją od nowa.',
            ],
          },
          {
            naglowek: 'Odpowiedź, której trzeba poszukać',
            akapity: [
              'Jest w cenniku, ofercie albo procedurze. Odnalezienie właściwego akapitu zajmuje więcej czasu niż napisanie samej wiadomości.',
            ],
          },
          {
            naglowek: 'Sprawa, przy której trzeba pomyśleć',
            akapity: [
              'Nietypowy przypadek albo klient, który stracił cierpliwość. Tu potrzeba osoby, nie gotowego wzoru odpowiedzi, i tak ma zostać.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Po czym poznasz pytanie, które nadaje się dla bota?',
        ikona: 'osoba-check',
        chip: 'KWALIFIKACJA',
        overline: 'CZTERY WARUNKI NARAZ',
      },
      {
        typ: 'lista',
        punkty: [
          'Odpowiedź jest zawsze taka sama i stoi w Twoich materiałach.',
          'Nie trzeba znać historii tego klienta, żeby na nie odpisać.',
          'Nikt u Ciebie nie musi niczego zatwierdzać przed wysłaniem.',
          'Pytanie wraca co tydzień, a nie raz na kwartał.',
        ],
      },
      {
        typ: 'akapit',
        tekst:
          'Cztery warunki naraz to pytanie dla bota. Brak choćby jednego z nich to sprawa dla człowieka i tak ustawiamy bota przy wdrożeniu.',
      },
    ],
  },

  rozwiazanie: {
    /* Sekcja 2 pakietu: jawna granica plus moment przekazania. H2 celowo
       inny niż u rodzica („Co robi nasz chatbot, czego nie robi zwykły bot?"):
       tam porównanie z tanim botem, tu podział pracy z człowiekiem. */
    h2: 'Co bot przejmuje, a czego nie tyka?',
    tresc:
      'Bot odpowiada na pytania z pierwszego stosu i robi to natychmiast, także o 22:00. Wszystko, co wymaga decyzji, zgody albo znajomości historii klienta, oddaje człowiekowi razem z całym kontekstem rozmowy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Jawna granica, ustalona przed wdrożeniem',
        ikona: 'tarcza-serce',
        chip: 'GRANICA',
        overline: 'PO JEDNEJ STRONIE BOT · PO DRUGIEJ TWÓJ CZŁOWIEK',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'To bierze na siebie bot',
            akapity: [
              'Wszystko, co da się odpisać z Twoich materiałów bez zaglądania w historię klienta i bez niczyjej zgody.',
            ],
            punkty: [
              'Powtarzalne pytania o zakres, warunki i przebieg współpracy.',
              'Wiadomości, które przychodzą, gdy nikogo nie ma przy biurku.',
              'Odesłanie rozmówcy do właściwego miejsca w Twoich materiałach.',
              'Spisanie sprawy i kontaktu, gdy temat wychodzi poza jego zakres.',
            ],
          },
          {
            naglowek: 'Tego bot nie tyka',
            akapity: [
              'Granicę stawiamy jawnie, bo bot, który próbuje domknąć trudną sprawę, kosztuje więcej, niż daje.',
            ],
            punkty: [
              'Reklamacji i spraw spornych.',
              'Ustaleń, które wiążą Cię wobec klienta.',
              'Odstępstw od warunków, na które musi zgodzić się człowiek.',
              'Pytań spoza bazy wiedzy: wtedy mówi wprost, że nie wie.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Jak wygląda moment przekazania sprawy człowiekowi?',
        akapity: [
          'To jest najważniejsze miejsce całego wdrożenia. Bot nie kończy rozmowy zdaniem, że nie potrafi pomóc, tylko przekazuje sprawę dalej i mówi rozmówcy wprost, co się teraz stanie.',
          'Twój człowiek dostaje wątek z całym kontekstem, więc nie musi prosić klienta, żeby opowiedział to samo drugi raz. Adres, pod który trafia takie zgłoszenie, ustalamy z Tobą przed startem.',
        ],
        punkty: [
          'Bot zapisuje pytanie klienta w jego własnych słowach.',
          'Do zgłoszenia dołącza przebieg rozmowy, a nie samo ostatnie zdanie.',
          'Klient wie, że sprawa poszła do człowieka, i nie pisze jej trzeci raz.',
        ],
        wariant: 'top',
        chip: 'PRZEKAZANIE',
        stopka: [
          'Bot nigdy nie udaje, że domyka sprawę, której nie umie domknąć.',
          'Pytanie, które wróciło od człowieka, dokładamy potem do bazy wiedzy.',
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Z czego składa się bot do obsługi klienta?',
        ikona: 'ksiazka',
        chip: 'BUDOWA',
        overline: 'TRZY WARSTWY · BAZA WIEDZY, MODEL, PRZEKAZANIE',
      },
      {
        typ: 'kroki',
        wariant: 'plytka',
        kroki: [
          {
            tytul: 'Baza wiedzy',
            opis: 'Twoje materiały: cennik, oferty, procedury, opisy produktów. Bot odpowiada wyłącznie z nich i nie szuka w internecie. To ta warstwa decyduje, czy odpowiedź jest prawdziwa.',
          },
          {
            tytul: 'Model',
            opis: 'Warstwa, która rozumie pytanie zadane ludzkim językiem i składa z bazy wiedzy odpowiedź po polsku. Pracujemy na modelu Claude od Anthropic.',
          },
          {
            tytul: 'Przekazanie rozmowy',
            opis: 'Reguła, która pilnuje granicy: kiedy bot odpowiada sam, kiedy oddaje sprawę człowiekowi i pod jaki adres trafia zgłoszenie. Bez tej warstwy zostaje sama gadka.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Ile rozmów bierze na siebie bot u Desant.pl?',
        akapity: [
          'U Desant.pl chatbot obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości. To ruch, który wcześniej w całości szedł na człowieka.',
          'Skala jest tu ważniejsza od wrażenia: to nie jest wielka infolinia, tylko normalna firma, w której powtarzalne pytania bierze na siebie bot.',
        ],
        wariant: 'edge',
        chip: 'REALIZACJA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy dane Twoich klientów są bezpieczne?',
        akapity: [
          'Bot odpowiada tylko z materiałów, które od Ciebie dostał, i nie przeszukuje internetu. Nie ma więc jak wkleić do rozmowy czegoś, czego nie ma w Twojej bazie wiedzy.',
          'Bot przedstawia się w pierwszej wiadomości i nie udaje pracownika. Prośba o kontakt z człowiekiem jest jednym z momentów przekazania, które ustawiamy przy wdrożeniu.',
        ],
        punkty: [
          'Dane zostają w Unii Europejskiej.',
          'Co zapisujemy z rozmów i na jak długo, ustalamy przed startem.',
          'Bot nie prosi o dane, które nie są potrzebne do załatwienia sprawy.',
        ],
        wariant: 'edge',
        chip: 'DANE',
      },
    ],
  },

  /* Sekcja 3 pakietu: bot na stronie kontra skrzynka BOK kontra dyżur
     telefoniczny. Kontrakt `tabelaPorownawcza` ma trzy kolumny (cecha, bez,
     z nami), więc dwa warianty ręczne stoją w jednej kolumnie: obu dotyczy
     dokładnie ten sam mechanizm, czyli rozmowa czeka na wolnego człowieka.
     Komórki krótkie (cecha do 19 znaków, kolumny do 36), żeby wiersze nie
     łamały się na dwie linie na wąskich ekranach.
     RODZIC MA OSIEM WIERSZY: Dostępność, Czas reakcji, Te same pytania, Leady
     wieczorem, Skok zapytań, Rozwój, Koszt startu, Czas wdrożenia. Żaden
     z nich nie jest tu przepisany. Najbliżej siebie stoją rodzicielskie
     „Te same pytania" i tutejsze „Powtarzalne pytanie", ale kolumny mówią
     co innego: u rodzica o tym, że bot bierze pytania na siebie, tutaj o tym,
     skąd bierze się treść odpowiedzi (Twoje materiały). Nie da się tego
     wiersza usunąć bez wycięcia tematu całej podstrony. */
  tabelaPorownawcza: {
    h2: 'Skrzynka BOK, dyżur telefoniczny i bot na stronie',
    naglowekBez: 'Skrzynka BOK i dyżur telefoniczny',
    naglowekZNami: 'Bot na stronie',
    wiersze: [
      {
        cecha: 'Start rozmowy',
        bez: 'Kolejka wątków i telefonów',
        zNami: 'Rozmowa rusza od razu',
      },
      {
        cecha: 'Powtarzalne pytanie',
        bez: 'Ktoś pisze odpowiedź od nowa',
        zNami: 'Odpowiedź prosto z Twoich materiałów',
      },
      {
        cecha: 'Sprawa trudna',
        bez: 'Ta sama osoba, ten sam czas',
        zNami: 'Przekazana z kontekstem rozmowy',
      },
      {
        cecha: 'Wieczór i weekend',
        bez: 'Czeka na najbliższy dyżur',
        zNami: 'Klient dostaje odpowiedź na miejscu',
      },
      {
        cecha: 'Urlop w zespole',
        bez: 'Zastępstwo albo dłuższe czekanie',
        zNami: 'Bot odpowiada bez zastępstwa',
      },
      {
        cecha: 'Ślad rozmowy',
        bez: 'Rozsypany po skrzynkach i notatkach',
        zNami: 'Cały wątek w jednym miejscu',
      },
      {
        cecha: 'Nowa odpowiedź',
        bez: 'Trzeba obejść z nią cały zespół',
        zNami: 'Dokładamy ją do bazy wiedzy',
      },
    ],
  },

  /* Sekcja 6 pakietu. Kroki celowo inne niż u rodzica (Diagnoza, Uczenie
     i wdrożenie, Utrzymanie i rozwój): tam cykl całej usługi, tu wyłącznie te
     1-2 dni robocze, w których powstaje bot do obsługi klienta. */
  kroki: {
    h2: 'Jak uruchamiamy bota do obsługi klienta w 1-2 dni robocze?',
    items: [
      {
        tytul: 'Materiały i lista pytań',
        opis: 'Bierzemy Twój cennik, oferty, procedury i opisy produktów oraz listę pytań, które wracają najczęściej. Zegar 1-2 dni roboczych rusza w chwili, w której te materiały do nas trafią.',
      },
      {
        tytul: 'Granica i adres zgłoszenia',
        opis: 'Ustalamy, na co bot odpowiada sam, przy czym oddaje sprawę człowiekowi i pod jaki adres trafia takie zgłoszenie. Ten jeden punkt decyduje o tym, czy bot pomaga, czy przeszkadza.',
      },
      {
        tytul: 'Bot na stronie i pierwsze rozmowy',
        opis: 'Stawiamy bota na Twojej stronie i czytamy pierwsze rozmowy. Pytania, które padły, a nie miały jeszcze odpowiedzi, dokładamy do bazy wiedzy.',
      },
    ],
  },

  ramaCeny: {
    /* Sekcja 7 pakietu. H2 zawęża pytanie do tej podstrony, żeby nie powtarzać
       H2 rodzica („Ile kosztuje wdrożenie chatbota?"). Rozkład na trzy progi
       zostaje na `/uslugi/chatboty/cennik`, tutaj jest wyłącznie próg,
       o którym mówi ta strona. */
    h2: 'Ile kosztuje chatbot do obsługi klienta?',
    tresc:
      'Chatbot do obsługi klienta kosztuje od 1790 zł netto i działa po 1-2 dniach roboczych. Utrzymanie to 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie. Tokeny modelu płacisz dostawcy wprost, według zużycia.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'od 1790 zł netto',
            opis: 'wdrożenie bota na stronę z bazą wiedzy',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '1-2 dni robocze',
            opis: 'od przekazania materiałów i listy pytań',
            zrodlo: 'sekcja o uruchomieniu bota wyżej',
            ton: 'green',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'utrzymanie miesięcznie, gdy infrastruktura stoi u nas',
            zrodlo: 'pytanie „Ile to kosztuje" w FAQ',
            ton: 'amber',
          },
          {
            wartosc: '0 zł',
            opis: 'utrzymanie miesięcznie po przekazaniu infrastruktury Tobie',
            zrodlo: 'pytanie „Ile to kosztuje" w FAQ',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Gdzie ma stać infrastruktura Twojego bota?',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'DWA MODELE UTRZYMANIA · WYBIERASZ TY',
      },
      {
        /* Formuła utrzymania musi brzmieć identycznie w całym pakiecie
           (uwaga wdrożeniowa §7): u nas 99-599 zł netto miesięcznie,
           u klienta 0 zł miesięcznie plus poprawki 350 zł netto za godzinę. */
        typ: 'przelacznik',
        grupa: 'obsluga-klienta-utrzymanie',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Infrastruktura u nas',
            podtytul: '99-599 zł netto miesięcznie',
            naglowek: 'Projekt zostaje u nas, a my pilnujemy bota i dokładamy odpowiedzi.',
            akapity: [
              'Ten model wybierasz, gdy nie chcesz mieć u siebie nikogo do pilnowania bota. Czytamy, o co pytają klienci, i uzupełniamy bazę wiedzy o pytania, które zaczęły wracać.',
            ],
            punkty: [
              'utrzymanie 99-599 zł netto miesięcznie',
              'dokładanie odpowiedzi po naszej stronie',
              'zmiana modelu w drugą stronę jest możliwa później',
            ],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Infrastruktura u Ciebie',
            podtytul: '0 zł miesięcznie',
            naglowek: 'Przekazujemy Ci całą infrastrukturę i nie płacisz nam abonamentu.',
            akapity: [
              'Bot zostaje Twój razem z bazą wiedzy i dostępami. Późniejsze poprawki rozliczamy po 350 zł netto za godzinę i tylko wtedy, gdy je zamówisz.',
            ],
            punkty: [
              'utrzymanie po naszej stronie: 0 zł miesięcznie',
              'poprawki 350 zł netto za godzinę, wyłącznie na zamówienie',
              'tokeny modelu płacisz dostawcy wprost, w obu modelach',
            ],
          },
        ],
      },
      {
        /* Sekcja 8 pakietu, wzorzec `/narzedzia#kalkulator-procesu` („Koszt
           podajesz Ty"): wzory są WIDOCZNE na stronie, a żadne pole nie ma
           wartości domyślnej. Pakiet nie podaje ani jednej liczby o skali
           przeciętnej firmy, więc nie stoi tu żadna. */
        typ: 'sekcja',
        naglowek: 'Ile kosztuje Cię miesiąc bez tego bota?',
        akapity: [
          'Nie znamy Twoich liczb, więc nie wstawiamy tu żadnej. Rachunek robisz na swoich, a wzory są trzy i mieszczą się w jednej linijce każdy.',
        ],
        punkty: [
          'Czas: liczba powtarzalnych wiadomości w miesiącu razy średni czas jednej odpowiedzi.',
          'Koszt miesiąca: ten czas razy stawka godzinowa osoby, która dziś odpisuje.',
          'Zwrot: cena wdrożenia podzielona przez koszt miesiąca daje liczbę miesięcy.',
        ],
        wariant: 'top',
        chip: 'RACHUNEK',
        stopka: [
          'Żadna z tych wielkości nie ma u nas wartości domyślnej. Podajesz je Ty.',
          'Wynik jest wart tyle, ile Twoje liczby, dlatego nie podstawiamy własnych.',
        ],
      },
      {
        /* Sekcja 10 pakietu. Bez kwot: cena stoi wyżej w tej samej sekcji. */
        typ: 'sekcja',
        naglowek: 'Kiedy taki bot nie ma sensu?',
        akapity: [
          'Wolimy stracić zlecenie, niż wziąć pieniądze za bota, który u Ciebie niczego nie zdejmie. Mówimy to przed wdrożeniem, nie po.',
        ],
        punkty: [
          'Twoi klienci nie piszą, tylko dzwonią: bot na stronie odpowie nielicznym, a telefon dalej będzie dzwonił.',
          'Nie masz spisanych odpowiedzi i nie chcesz ich spisywać: bot nie szuka w internecie, więc nie ma z czego odpowiadać.',
          'Każda sprawa u Ciebie jest inna: przy zerowej powtarzalności nie ma czego przejąć.',
          'Nie masz komu przekazać trudnej sprawy: bot ją spisze, a i tak będzie czekała na człowieka.',
          'Chcesz, żeby bot udawał pracownika: tego nie robimy, rozmówca zawsze wie, że pisze z AI.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Nie masz pewności, czy to Twój przypadek? Napisz i tak.',
          'Powiemy wprost, co o tym myślimy, także wtedy, gdy bot nie jest Ci potrzebny.',
        ],
      },
    ],
    /* Próg „prosty" z `lib/uslugi/chatboty.ts`, ta sama kwota co u rodzica.
       CELOWO BEZ `cenaStala`: 1790 zł netto to dolny próg widełek, a nie
       kwota identyczna dla każdego klienta, więc kafel ceny ma zostać
       z prefiksem „od ". */
    minPrice: 1790,
    /* Rozkład cennika na trzy progi należy do podstrony cenowej z tego samego
       pakietu (uwaga wdrożeniowa §4: każda podstrona linkuje do rodzica
       i do `/uslugi/chatboty/cennik`). */
    linkPoradnik: {
      przed: 'Pozostałe progi, tokeny i to, za co dokładnie płacisz, rozpisaliśmy w cenniku: ',
      etykieta: 'cennik chatbota AI dla firmy',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  /* KOMPLET 8 PYTAŃ Z PAKIETU §P2 („GOTOWE FAQ"). Kolejność i pytania bez
     zmian, odpowiedzi 1:1 poza ostatnią: ten sam tekst idzie na stronę i do
     FAQPage JSON-LD, więc każda edycja tutaj rozjeżdża oba naraz. Pierwsza
     odpowiedź brzmi blisko FAQ rodzica, bo tak została zatwierdzona
     w pakiecie. Powód skrócenia ostatniej stoi w komentarzu przy niej. */
  faq: [
    {
      pytanie: 'Czy chatbot zastąpi mój dział obsługi klienta?',
      odpowiedz:
        'Nie zastąpi, odciąży. Bierze powtarzalne pytania i wiadomości po godzinach. Twoi ludzie zostają przy sprawach, które wymagają decyzji i relacji.',
    },
    {
      pytanie: 'Co bot robi, gdy nie zna odpowiedzi?',
      odpowiedz:
        'Mówi wprost, że nie wie, i przekazuje sprawę Twojemu człowiekowi razem z całym kontekstem rozmowy. Nie zgaduje i nie wymyśla.',
    },
    {
      pytanie: 'Skąd bot bierze odpowiedzi?',
      odpowiedz:
        'Z Twoich materiałów: cennika, ofert, procedur, opisów produktów. Nie szuka w internecie. Jak to działa, opisujemy na stronie o bazie wiedzy.',
    },
    {
      pytanie: 'Ile trwa wdrożenie?',
      odpowiedz:
        '1-2 dni robocze dla bota na stronę z bazą wiedzy. Czas liczymy od przekazania materiałów przez Ciebie, a nie od podpisania umowy.',
    },
    {
      pytanie: 'Ile to kosztuje?',
      odpowiedz:
        'Od 1790 zł netto za wdrożenie. Utrzymanie to 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie. Tokeny modelu płacisz dostawcy wprost.',
    },
    {
      pytanie: 'Czy klient wie, że rozmawia z botem?',
      odpowiedz:
        'Tak, mówimy o tym wprost w pierwszej wiadomości. Ukrywanie tego kończy się utratą zaufania w momencie, w którym klient i tak się zorientuje.',
    },
    {
      pytanie: 'Czy bot odpisze w nocy i w weekend?',
      odpowiedz:
        'Tak, działa bez przerwy. To jest jego główna przewaga nad skrzynką, która czeka do poniedziałku.',
    },
    {
      /* JEDYNE ODSTĘPSTWO OD DOSŁOWNOŚCI PAKIETU, ŚWIADOME: pakietowa odpowiedź
         była w całości o leadach (co bot pyta, gdzie ląduje kontakt, za ile),
         czyli o temacie siostrzanej podstrony `/uslugi/chatboty/generowanie-leadow`.
         Zostawienie jej tutaj kanibalizowałoby tamtą stronę i rozmywało intencję
         tej. Zostaje jedno zdanie: potwierdzenie faktu plus odesłanie do siostry.
         Kwota znika, bo cena należy do sekcji ceny, a ta odpowiedź nie jest o cenie. */
      pytanie: 'Czy bot może zbierać kontakty w trakcie rozmowy?',
      odpowiedz:
        'Tak, zbieranie kontaktów jest w progu prostym, a to, o co bot pyta i gdzie trafia kontakt, opisujemy na stronie o chatbocie, który zbiera i kwalifikuje leady.',
    },
  ],

  /* Jedna decyzja domykająca stronę (sekcja 13 pakietu). Bezpłatna rozmowa to
     WYŁĄCZNIE badanie potrzeb (ustalenie właściciela z 2026-08-31), więc
     mikrokopia obiecuje obejrzenie pytań i ustalenie zakresu, a nie pomiar,
     test, audyt ani raport. */
  cta: {
    label: 'Sprawdźmy, co bot zdejmie ze skrzynki',
    href: '#diagnoza',
    mikrokopia:
      'Na bezpłatnej rozmowie obejrzymy, o co pytają Twoi klienci, i ustalimy zakres bota. Chatbot do obsługi klienta kosztuje od 1790 zł netto i działa po 1-2 dniach roboczych.',
    dowod:
      'U Desant.pl taki bot obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości.',
  },

  queries: [
    'chatbot do obsługi klienta',
    'chatbot obsługa klienta',
    'bot do obsługi klienta na stronę',
    'chatbot do obsługi klienta cena',
    'chatbot dla biura obsługi klienta',
    'chatbot odpowiadający klientom po godzinach',
  ],

  /* POWIĄZANIA (sekcja 11 pakietu plus uwaga wdrożeniowa §4: każda podstrona
     linkuje zwrotnie do `/uslugi/chatboty` i do `/uslugi/chatboty/cennik`).
     Etykieta = H1 strony docelowej, opis = fakt, który stoi na tamtej stronie.
     ZERO KWOT w tych kartach: cena należy wyłącznie do sekcji ceny.
     Desant.pl nie ma strony w `lib/realizacje`, więc grupa `realizacje`
     zostaje pusta zamiast linku zastępczego.

     KARTA DOŁOŻONA 2026-09-04 (wyrównanie linków przychodzących w gałęzi):
     `sklep-internetowy` miał jedno wejście od sióstr. Powód treściowy stoi
     w tej stronie od początku: w stosie powtarzalnych wątków siedzą tu
     „ile trwa realizacja" i reklamacja, a odpowiedź na nie w sklepie wymaga
     zajrzenia do systemu zamówień, czego ta strona świadomie nie opisuje. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firmy',
        href: '/uslugi/chatboty',
        opis: 'Cała usługa: po co firmie chatbot, czym różni się od AI Agenta i jak rośnie razem z Twoim procesem.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis: 'Wszystkie progi wdrożenia, model utrzymania i to, za co dokładnie płacisz. Cały cennik stoi tam, nie tutaj.',
      },
      {
        etykieta: 'Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)',
        href: '/uslugi/chatboty/baza-wiedzy',
        opis: 'Pierwsza warstwa tego bota rozpisana osobno: skąd bierze odpowiedzi i dlaczego nie szuka ich w internecie.',
      },
      {
        etykieta: 'Chatbot na WhatsApp i Messengerze',
        href: '/uslugi/chatboty/whatsapp-messenger',
        opis: 'Ten sam bot i ta sama baza wiedzy w oknie, w którym piszą Twoi klienci. Zmienia się kanał, nie wiedza.',
      },
      {
        etykieta: 'Chatbot AI dla sklepu internetowego',
        href: '/uslugi/chatboty/sklep-internetowy',
        opis: 'To samo odciążenie w sklepie: dostępność produktu, status zamówienia oraz zwroty i reklamacje, po wpięciu bota w bazę produktów i system zamówień.',
      },
      {
        etykieta: 'Bot telefoniczny, który odbiera telefon 24/7',
        href: '/uslugi/voiceboty/odbieranie-telefonow',
        opis: 'Gdy klienci wolą dzwonić, niż pisać: voicebot odbiera rozmowy przychodzące i nigdy nie dzwoni sam.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis: 'Wpisujesz swoje liczby: ile razy w tygodniu, ile minut za jednym razem, jaka stawka godzinowa. Koszt podajesz Ty.',
      },
    ],
  },
};
