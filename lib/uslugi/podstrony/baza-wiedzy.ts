import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 3 — BAZA WIEDZY (RAG)
 * (`/uslugi/chatboty/baza-wiedzy`).
 * Fraza primary: „chatbot z bazą wiedzy firmy" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P3, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/chatboty` i sióstr z tego samego pakietu):
 *  - RODZIC sprzedaje CAŁĄ usługę: co bot daje firmie, gdzie stoi, ile
 *    kosztuje wdrożenie i jak je prowadzimy.
 *  - TA STRONA odpowiada na JEDNO pytanie: skąd bot bierze odpowiedź i
 *    dlaczego nie zmyśla. Czyli mechanizm: wyszukanie we fragmentach, złożenie
 *    zdania, wskazanie źródła, uczciwe „nie wiem", utrzymanie bazy.
 *    Kończy się jedną decyzją: pokazuję materiały, które mam.
 *  - NIE MA TU I BYĆ NIE MOŻE: „kto pyta" i odciążenia biura obsługi
 *    (siostra `/obsluga-klienta`), uprawnień do dokumentów i odbiorcy
 *    wewnętrznego (siostra `/asystent-wewnetrzny`), rozpisanych progów
 *    cennika (siostra `/cennik`). Do wszystkich trzech prowadzą linki.
 *  - NIE POWIELAMY nagłówków rodzica ani jego akapitu „Skąd chatbot bierze
 *    wiedzę o Twojej firmie?": rodzic mówi, ŻE bot uczy się na materiałach
 *    klienta, ta strona pokazuje, JAK to działa krok po kroku.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P3, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami),
 *  - mechanizm RAG (najpierw wyszukanie w dokumentach, potem ułożenie zdania):
 *    pakiet §P3, FAQ „Co to jest RAG w chatbocie?",
 *  - lista materiałów do wgrania (cenniki, oferty, opisy produktów, procedury,
 *    regulaminy, instrukcje, transkrypcje nagrań i szkoleń) plus zasada, że
 *    nie muszą być poukładane: pakiet §P3 sekcja 3 i FAQ,
 *  - Instytut Kryptografii (trzy boty na transkrypcjach kursów, wskazywanie
 *    dokładnego miejsca w nagraniu): pakiet §P3 sekcja 4 i FAQ, zgodne
 *    z `lib/realizacje/chatbot-edukacyjny-kursy.ts`,
 *  - dostawca modelu (Claude od Anthropic, nie OpenAI) i umowa powierzenia
 *    przed startem: pakiet §P3 FAQ oraz uwaga wdrożeniowa §9,
 *  - dwa modele utrzymania (99-599 zł netto miesięcznie u nas albo 0 zł po
 *    przekazaniu infrastruktury): pakiet §P3 sekcja 7, zgodne co do złotówki
 *    z `lib/uslugi/chatboty.ts`,
 *  - próg wejścia 1790 zł netto: pakiet §P3 kapsuła i FAQ, zgodne
 *    z `ramaCeny.minPrice` rodzica,
 *  - Sprint Diagnostyczny (1490 zł netto, pięć dni roboczych, raport PDF
 *    z mapą procesów, kwota odliczana od wdrożenia): pakiet §P3 sekcja 11
 *    i FAQ „Co, jeśli nie mamy spisanej wiedzy?",
 *  - czas wdrożenia (1-2 dni robocze dla bota na stronę z bazą wiedzy,
 *    1 do 10 dni roboczych dla całego wdrożenia, liczone od przekazania
 *    materiałów, a nie od podpisania umowy): pakiet §P3 sekcja 9 „Cena
 *    i czas", pakiet §P1 sekcja 2 i §P2 FAQ „Ile trwa wdrożenie?", zgodne
 *    co do liczby z rodzicem `lib/uslugi/chatboty.ts` (kapsuła, drabina
 *    progów i FAQ „Ile trwa wdrożenie chatbota?").
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1790 zł netto, 99-599 zł netto miesięcznie, 0 zł miesięcznie, 1490 zł netto,
 *  pięć dni roboczych (Sprint), 1-2 dni robocze (bot na stronę z bazą
 *  wiedzy), 1 do 10 dni roboczych (całe wdrożenie chatbota),
 *  trzy boty u Instytutu Kryptografii.
 *  Każda NASZA kwota z dopiskiem netto; przy „0 zł" netto NIE dopisujemy,
 *  bo zero netto to zero brutto.
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje liczby wgrywanych
 *  plików, liczby stron dokumentów ani żadnej metryki skuteczności
 *  odpowiedzi. Nie podaje też osobnego czasu budowy samej bazy wiedzy
 *  (podaje wyłącznie czas CAŁEGO wdrożenia bota) ani tego, po jakim czasie
 *  od podmiany dokumentu bot odpowiada już z nowej wersji, więc żadnego
 *  z tych dwóch terminów na stronie NIE MA. Nie podaje też, jak dawno powstały boty
 *  Instytutu Kryptografii, więc na stronie NIE MA żadnego odniesienia
 *  czasowego typu „pół roku temu". Zdania są napisane tak, żeby były
 *  prawdziwe bez tych liczb.
 *
 * ZAKAZANE NA TEJ STRONIE: kwoty poza sekcją `ramaCeny`, `kapsula`,
 * `metaDescription` i FAQ (czyli poza miejscami, w których kwotę dyktuje
 * zatwierdzony tekst pakietu §P3). UWAGA: `chatboty.md` NIE MA reguły
 * „cennik w jednym miejscu"; to konwencja przeniesiona z pakietu GEO
 * (`.seo-przeglad/pakiety/geo.md`, uwaga wdrożeniowa §6) i trzymamy ją
 * na tej stronie świadomie. Dalej zakazane: procenty skuteczności bez
 * metody, nazwa techniczna modelu
 * (claude-haiku-4-5), sugerowanie OpenAI, Slack i Microsoft Teams jako
 * kanałów bota (uwaga wdrożeniowa §8), obietnica, że bot nigdy się nie pomyli.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług i pozostałe podstrony. Zero nowych typów
 * bloków, zero nowego CSS.
 *
 * TABELA TRÓJDZIELNA Z PAKIETU (sekcja 5: bot z bazą wiedzy kontra bot na
 * regułach kontra czysty model bez Twoich danych) NIE MIEŚCI SIĘ w kontrakcie
 * `tabelaPorownawcza` (trzy kolumny: cecha / bez / z nami), więc rozkłada się
 * na dwie sąsiadujące tabele o ROZŁĄCZNYCH wierszach: blok `tabela`
 * w `rozwiazanie.bloki` zestawia czysty model z botem na bazie wiedzy na
 * przykładach pytań, a `tabelaPorownawcza` zestawia bota na regułach z botem
 * na bazie wiedzy na mechanizmie. Zero powtórzonych wierszy.
 */
export const bazaWiedzy: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'baza-wiedzy',
  dataAktualizacji: '2026-09-01',

  h1: 'Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)',

  /* KAPSUŁA 1:1 Z PAKIETU §P3. Nie skracać i nie przepisywać: to zdanie ma być
     cytowane przez modele w formie, w jakiej zostało zatwierdzone. Niesie
     komplet wielkości strony: czym to jest, co wgrywamy, jaki mamy dowód
     i od jakiego progu baza wiedzy w ogóle jest w bocie. */
  kapsula:
    'Chatbot z bazą wiedzy szuka odpowiedzi w Twoich dokumentach, a nie w internecie. Fachowo to RAG. Wgrywamy cenniki, oferty, procedury, opisy produktów i transkrypcje nagrań, a bot odpowiada tylko na ich podstawie. Dla Instytutu Kryptografii zbudowaliśmy trzy takie boty na transkrypcjach kursów: bot wskazuje dokładne miejsce w nagraniu, w którym pada odpowiedź. Baza wiedzy jest w każdym naszym bocie, także w tym za 1790 zł netto.',

  /* metaTitle: pakiet §P3 dawał 33 znaki, konwencja repo (types.ts) i decyzja
     właściciela mówią 50-60. Fraza główna „chatbot z bazą wiedzy firmy" zostaje
     NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakt z tej strony (bot
     odpowiada z wgranych plików, kapsuła i sekcja o materiałach). Długość
     60 znaków. Layout dokleja sufiks marki, więc w SERP wychodzi
     „Chatbot z bazą wiedzy firmy (RAG): odpowiada z Twoich plików · SimpleFast.ai".
     metaDescription: 159 znaków. */
  metaTitle: 'Chatbot z bazą wiedzy firmy (RAG): odpowiada z Twoich plików',
  metaDescription:
    'Chatbot z bazą wiedzy firmy (RAG) odpowiada z Twoich dokumentów, nie z internetu. Wskazuje źródło odpowiedzi. Baza wiedzy jest w każdym bocie od 1790 zł netto.',

  problem: {
    /* H2 1:1 z pakietu §P3 sekcja 1. */
    h2: 'Czy Twój bot potrafi pokazać, skąd wziął odpowiedź?',
    tresc:
      'Odpowiedź bota brzmi tak samo pewnie wtedy, gdy jest prawdziwa, i wtedy, gdy została ułożona z niczego. Różnicę widać dopiero wtedy, gdy pod odpowiedzią stoi konkretny dokument.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Model językowy bez Twoich materiałów zna język, ale nie zna Twojej firmy. Zapytany o warunki gwarancji ułoży zdanie, które brzmi dokładnie jak warunki gwarancji, bo tego się po nim spodziewasz. Sprawdzić to możesz tylko wtedy, gdy bot wskaże plik, z którego wziął odpowiedź.',
      },
      {
        typ: 'naglowek',
        tekst: 'Jak działa baza wiedzy w bocie, prostym językiem?',
        ikona: 'folder-kod',
        chip: 'RAG',
        overline: 'MECHANIZM · CZTERY RUCHY OD PYTANIA DO ODPOWIEDZI',
      },
      {
        typ: 'kroki',
        wariant: 'os',
        kroki: [
          {
            tytul: 'Pytanie klienta',
            meta: 'wejście',
            opis: 'Klient pisze zwykłym zdaniem, bez nazw plików i bez słów kluczowych. Nie musi wiedzieć, jak nazywa się dokument, w którym leży odpowiedź.',
          },
          {
            tytul: 'Wyszukanie we fragmentach',
            meta: 'Twoje dokumenty',
            opis: 'Bot przeszukuje wgrane materiały i wybiera te fragmenty, które faktycznie dotyczą pytania. To jest ten moment, w którym Twoja wiedza wchodzi do gry.',
          },
          {
            tytul: 'Złożenie odpowiedzi',
            meta: 'z fragmentów, nie z pamięci',
            opis: 'Dopiero z wybranych fragmentów powstaje zdanie po polsku. Bot nie zna Twojej oferty na pamięć, on ją odczytuje przy każdym pytaniu od nowa.',
          },
          {
            tytul: 'Wskazanie źródła',
            meta: 'gdy tego chcesz',
            opis: 'Do odpowiedzi bot może dołożyć miejsce, z którego ją wziął: nazwę dokumentu albo moment w nagraniu.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego kolejność tych ruchów jest najważniejsza?',
        akapity: [
          'Najpierw wyszukanie, potem układanie zdania. Gdyby było odwrotnie, bot najpierw wymyślałby odpowiedź, a dopiero potem szukał dla niej potwierdzenia, i znajdowałby je zawsze.',
          'Ta kolejność ma jeszcze jeden skutek, który poczujesz w codziennej pracy: bazę wiedzy aktualizuje się podmianą dokumentu, a nie przeuczaniem bota. Bot czyta plik, a nie własną pamięć.',
        ],
        wariant: 'edge',
        chip: 'RAG',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co możemy wgrać do bazy wiedzy Twojego bota?',
    tresc:
      'Wszystko, z czego dziś korzysta Twój zespół, gdy odpowiada klientowi: od cennika po nagranie szkolenia. Materiały nie muszą być wcześniej uporządkowane, bo ich poskładanie jest częścią wdrożenia.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Cztery rodzaje materiałów, które trafiają do bazy',
        ikona: 'dokument-skan',
        chip: 'MATERIAŁY',
        overline: 'CO WGRYWAMY · I CO Z TEGO WYNIKA',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Cenniki i oferty',
            akapity: [
              'Dokument, o który klient pyta najczęściej, i jednocześnie ten, który zmienia się najczęściej. Dlatego przy wdrożeniu ustalamy nie tylko treść, ale też to, kto go potem podmienia.',
            ],
            punkty: ['cenniki i widełki', 'oferty, pakiety i warianty'],
          },
          {
            naglowek: 'Procedury, regulaminy, instrukcje',
            akapity: [
              'Zdania, które muszą paść dokładnie tak, jak zostały zapisane: warunki zwrotu, zasady gwarancji, kolejność kroków w reklamacji. Tu parafraza jest błędem, a nie stylem.',
            ],
            punkty: ['regulaminy i warunki', 'instrukcje krok po kroku'],
          },
          {
            naglowek: 'Opisy produktów i usług',
            akapity: [
              'Parametry, warianty i różnice między nimi, czyli to, o co klient dopytuje tuż przed decyzją. Bot ma czym porównać, zamiast zgadywać z samej nazwy.',
            ],
            punkty: ['parametry i warianty', 'różnice między pakietami'],
          },
          {
            naglowek: 'Transkrypcje nagrań i kursów',
            akapity: [
              'Nagranie da się przeszukać dopiero wtedy, gdy istnieje jego zapis tekstowy. Z transkrypcji bot wyciąga nie tylko odpowiedź, ale i moment, w którym ona pada.',
            ],
            punkty: ['szkolenia i webinary', 'kursy wideo i lekcje'],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst:
          'Nie oczekujemy gotowej, uporządkowanej biblioteki. Częściej dostajemy folder z plikami w kilku wersjach i pierwszą robotą jest ustalenie, która wersja obowiązuje dzisiaj.',
      },
      {
        typ: 'naglowek',
        tekst: 'Co bot mówi, gdy odpowiedzi nie ma w Twoich dokumentach?',
        ikona: 'tarcza-serce',
        chip: 'GRANICE',
        overline: 'CYTOWANIE ŹRÓDŁA · UCZCIWE NIE WIEM',
      },
      {
        typ: 'sekcja',
        naglowek: 'Źródło pod odpowiedzią i granica, za którą bot nie idzie',
        akapity: [
          'Cytowanie źródła włączamy wtedy, gdy chcesz je widzieć. Przy dokumencie bot pokazuje, z którego pliku pochodzi odpowiedź. Przy nagraniu pokazuje moment, od którego warto go odsłuchać.',
          'Granicę ustawiamy odwrotnie, niż podpowiada domyślne zachowanie modelu: brak odpowiedzi w bazie kończy się przyznaniem do niewiedzy i przekazaniem sprawy człowiekowi, a nie zgrabnym zdaniem napisanym z niczego.',
        ],
        wariant: 'top',
        chip: 'ŹRÓDŁO',
        stopka: [
          'Cytowanie źródła włączamy albo wyłączamy, to Twoja decyzja przy wdrożeniu.',
          'Pytania bez odpowiedzi trafiają na listę braków i od nich zaczynamy aktualizację bazy.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co ten mechanizm dał Instytutowi Kryptografii?',
        akapity: [
          'W tych trzech botach najważniejsze nie jest to, że odpowiadają. Najważniejsze jest to, że wskazują dokładne miejsce w nagraniu, w którym pada odpowiedź.',
          'Kursant nie musi wierzyć botowi na słowo: odsłuchuje wskazany fragment i sprawdza. Ten sam mechanizm działa na cenniku i na procedurze, z tą różnicą, że źródłem jest wtedy plik, a nie minuta nagrania.',
        ],
        wariant: 'edge',
        chip: 'REALIZACJA',
      },
      {
        /* Trzecia kolumna porównania z pakietu §P3 sekcja 5: sam model językowy
           bez wgranych dokumentów. Wiersze są ROZŁĄCZNE z `tabelaPorownawcza`
           (tam mechanizm, tu przykłady pytań), żeby dwie tabele na stronie nie
           powtarzały tej samej treści. */
        typ: 'tabela',
        naglowki: ['Pytanie klienta', 'Czysty model bez Twoich danych', 'Bot z Twoją bazą wiedzy'],
        wiersze: [
          [
            'Ile kosztuje wariant premium?',
            'Ułoży odpowiedź z wiedzy ogólnej',
            'Poda kwotę z Twojego cennika',
          ],
          [
            'Jakie są warunki zwrotu?',
            'Opisze typowe warunki z rynku',
            'Zacytuje Twój regulamin',
          ],
          [
            'Który wariant pasuje do mojego przypadku?',
            'Zgadnie z samej nazwy wariantu',
            'Porówna parametry z Twoich opisów',
          ],
          [
            'W której lekcji to było?',
            'Nie ma dostępu do Twoich nagrań',
            'Wskaże moment w nagraniu',
          ],
        ],
        wKarcie: true,
        podpis:
          'Ta sama czwórka pytań zadana botowi bez wgranych dokumentów firmy i botowi z bazą wiedzy. Różnica nie polega na tym, że jeden odpowiada lepiej, tylko na tym, że jeden odpowiada Twoją wiedzą.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dzieje się z Twoimi dokumentami po stronie modelu?',
        akapity: [
          'Do modelu trafia treść rozmowy, żeby powstała odpowiedź: pytanie klienta i te fragmenty dokumentów, które bot do niego znalazł. Korzystamy z modelu Claude firmy Anthropic i nie korzystamy z modeli OpenAI.',
          'Umowę powierzenia przetwarzania danych podpisujemy przed startem.',
        ],
        punkty: [
          'Model: Claude od Anthropic.',
          'Umowa powierzenia przetwarzania danych podpisana przed startem.',
          'Zakres bazy ustalasz Ty: bot szuka odpowiedzi w tym, co wgramy, a nie w internecie.',
        ],
        wariant: 'quiet',
        chip: 'DANE',
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: cecha ~12 znaków, kolumny ~30),
     żeby wiersze nie łamały się na wąskich ekranach. Kolumna „Bot na regułach"
     opisuje wyłącznie to, jak taki bot działa: zero ocen cudzej roboty. */
  tabelaPorownawcza: {
    h2: 'Bot na regułach a bot z bazą wiedzy',
    naglowekBez: 'Bot na regułach',
    naglowekZNami: 'Bot z bazą wiedzy (RAG)',
    wiersze: [
      {
        cecha: 'Źródło odpowiedzi',
        bez: 'Ręcznie wpisane formułki',
        zNami: 'Twoje dokumenty',
      },
      {
        cecha: 'Pytanie inaczej zadane',
        bez: 'Nie trafia w regułę',
        zNami: 'Trafia w ten sam fragment',
      },
      {
        cecha: 'Zmiana w ofercie',
        bez: 'Ktoś przepisuje reguły',
        zNami: 'Podmieniasz dokument',
      },
      {
        cecha: 'Wskazanie źródła',
        bez: 'Nie ma czego wskazać',
        zNami: 'Plik albo moment w nagraniu',
      },
      {
        cecha: 'Pytanie spoza zakresu',
        bez: 'Wraca menu wyboru',
        zNami: 'Mówi wprost, że nie wie',
      },
      {
        cecha: 'Rozwój w czasie',
        bez: 'Rośnie drzewo reguł',
        zNami: 'Rośnie zbiór dokumentów',
      },
    ],
  },

  /* Trzy kroki wymusza kontrakt szablonu i akurat te trzy niosą całą różnicę
     między bazą, która odpowiada, a folderem plików. Kroki rodzica (diagnoza,
     uczenie i wdrożenie, utrzymanie) dotyczą CAŁEGO wdrożenia i zostają u rodzica. */
  kroki: {
    h2: 'Jak budujemy bazę wiedzy krok po kroku?',
    items: [
      {
        tytul: 'Zbieramy materiały i ustalamy wersje',
        opis: 'Bierzemy to, co masz: pliki, treści ze strony, nagrania. Najważniejsze pytanie na tym etapie brzmi, która wersja dokumentu obowiązuje, bo bot sam nie odróżni starego cennika od nowego.',
      },
      {
        tytul: 'Porządkujemy i dzielimy na fragmenty',
        opis: 'Dokumenty trzeba pociąć tak, żeby wyszukiwanie trafiało w konkretny akapit, a nie w cały plik. Przy nagraniach robimy transkrypcje, bo dopiero tekst da się przeszukać.',
      },
      {
        tytul: 'Testujemy pytaniami, na które nie ma odpowiedzi',
        opis: 'Łatwe pytania sprawdza każdy. My sprawdzamy też te, których w bazie nie ma, bo dopiero wtedy widać, czy bot przyzna się do niewiedzy, zamiast coś dopowiedzieć.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje chatbot z bazą wiedzy i ile trwa wdrożenie?',
    tresc:
      'Baza wiedzy nie jest dodatkiem, za który dopłacasz osobno. Wchodzi w każdy próg wdrożenia, łącznie z tym za 1790 zł netto, który wdrażamy w 1-2 dni robocze. Wyżej rośnie objętość materiałów i liczba ścieżek rozmowy, a sam mechanizm zostaje ten sam.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1790 zł netto',
            opis: 'najniższy próg wdrożenia, baza wiedzy już w środku',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'miesięcznie, gdy infrastruktura zostaje u nas',
            zrodlo: 'tabela utrzymania niżej',
            ton: 'violet',
          },
          {
            wartosc: '0 zł',
            opis: 'miesięcznie, gdy przekazujemy infrastrukturę Tobie',
            zrodlo: 'tabela utrzymania niżej',
            ton: 'green',
          },
          {
            wartosc: '1490 zł netto',
            opis: 'Sprint Diagnostyczny, gdy spisanej wiedzy jeszcze nie ma',
            zrodlo: 'sekcja o braku bazy niżej',
            ton: 'amber',
          },
        ],
      },
      {
        /* CZAS WDROŻENIA (pakiet §P3 sekcja 9 „Cena i czas"). Liczby przeniesione
           z rodzica `lib/uslugi/chatboty.ts`: bot prosty na stronę 1-2 dni
           roboczych, całe wdrożenie od 1 do 10 dni roboczych, liczone od
           przekazania materiałów. Zero nowych progów kwotowych: te rozpisuje
           siostrzana `/uslugi/chatboty/cennik`. */
        typ: 'akapit',
        tekst:
          'Czas liczymy od przekazania materiałów przez Ciebie, a nie od podpisania umowy, bo to Twoje pliki są tu robotą wejściową. Całe wdrożenie chatbota mieści się w przedziale od 1 do 10 dni roboczych i najdłużej trwają w nim integracje z Twoimi systemami, a nie sama baza wiedzy.',
      },
      {
        typ: 'naglowek',
        tekst: 'Kto aktualizuje bazę wiedzy i ile to kosztuje miesięcznie?',
        ikona: 'kalendarz-check',
        chip: 'UTRZYMANIE',
        overline: 'DWA MODELE · WYBIERASZ SAM',
      },
      {
        typ: 'akapit',
        tekst:
          'Baza wiedzy starzeje się dokładnie tak samo jak Twój cennik. Aktualizujesz ją tyle razy, ile razy zmienia się oferta albo procedura, i to jest jedyna stała praca, jakiej ten bot wymaga.',
      },
      {
        typ: 'tabela',
        naglowki: ['Gdzie stoi infrastruktura', 'Kto podmienia dokumenty', 'Koszt miesięczny'],
        wiersze: [
          ['Infrastruktura u nas', 'My, w ramach utrzymania', '99-599 zł netto'],
          ['Infrastruktura u Ciebie', 'Ty albo Twój zespół', '0 zł'],
        ],
        wKarcie: true,
        podpis:
          'Dwa modele utrzymania chatbota z bazą wiedzy. Różnią się tym, gdzie stoi infrastruktura i kto podmienia dokumenty, gdy zmienia się oferta.',
      },
      /* TOKENY (ujednolicenie 2026-09-04): trzecia pozycja rachunku stała
         dotąd tylko u rodzica `lib/uslugi/chatboty.ts` i na `/cennik`, przez co
         ta strona pokazywała koszt miesięczny niepełny. Zero nowej kwoty:
         przy tokenach żadnej nie ma ani u rodzica, ani w pakiecie. */
      {
        typ: 'akapit',
        tekst:
          'Poza utrzymaniem zostaje trzecia pozycja rachunku: zużycie tokenów modelu. Płacisz je dostawcy wprost, według zużycia, a kwota rośnie i maleje razem z liczbą rozmów.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy baza wiedzy nie jest odpowiedzią?',
        akapity: [
          'Bot z bazą wiedzy potrzebuje bazy. Jeśli wiedza siedzi wyłącznie w głowach ludzi i w rozmowach, nie ma czego wgrać, i mówimy to przed podpisaniem czegokolwiek.',
          'Wtedy zaczynamy od Sprintu Diagnostycznego za 1490 zł netto: pięć dni roboczych i raport PDF z mapą procesów. Kwotę odliczamy w całości od ceny wdrożenia, więc gdy wchodzisz w projekt, sprint jest dla Ciebie darmowy.',
        ],
        punkty: [
          'Wiedza istnieje tylko w głowach zespołu: najpierw trzeba ją spisać, dopiero potem wgrać.',
          'Dokumenty są sprzeczne i nikt nie wie, która wersja obowiązuje: bot powieli ten bałagan.',
          'Odpowiedź za każdym razem zależy od decyzji człowieka: żaden dokument tego nie zastąpi.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Sprint kończy się raportem PDF z mapą procesów.',
          'Powiemy wprost, gdy uznamy, że bota nie ma dziś na czym postawić.',
        ],
      },
    ],
    /* Ten sam próg wejścia co u rodzica (`lib/uslugi/chatboty.ts`): baza wiedzy
       jest już w bocie za 1790 zł netto, więc kwota jest prawdziwa także tutaj.
       `cenaStala` CELOWO nieustawione: ceny chatbotów to widełki od 1790 zł
       netto, a nie jedna kwota dla każdego klienta. */
    minPrice: 1790,
    linkPoradnik: {
      przed: 'Wszystkie progi i czasy wdrożenia rozpisaliśmy osobno: ',
      etykieta: 'ile kosztuje chatbot AI dla firmy',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  /* KOMPLET 8 PYTAŃ 1:1 Z PAKIETU §P3 („FAQ gotowe, 8 pytań"). Kolejność,
     pytania i odpowiedzi bez zmian: ten sam tekst idzie na stronę i do FAQPage
     JSON-LD, więc każda edycja tutaj rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Co to jest RAG w chatbocie?',
      odpowiedz:
        'To sposób pracy bota, w którym najpierw wyszukuje odpowiedź w Twoich dokumentach, a dopiero potem układa z niej zdanie. Dzięki temu odpowiada Twoją wiedzą, a nie wiedzą z internetu.',
    },
    {
      pytanie: 'Czy bot z bazą wiedzy może zmyślić odpowiedź?',
      odpowiedz:
        'Ustawiamy go tak, żeby trzymał się dokumentów, a gdy nie znajdzie odpowiedzi, mówił wprost, że nie wie. To jest ważniejsze niż to, żeby zawsze coś odpowiedział.',
    },
    {
      pytanie: 'Jakie pliki mogę wgrać do bazy wiedzy?',
      odpowiedz:
        'Cenniki, oferty, opisy produktów, procedury, regulaminy, instrukcje, transkrypcje nagrań i szkoleń. Nie muszą być poukładane, uporządkowanie jest częścią wdrożenia.',
    },
    {
      pytanie: 'Czy bot poda źródło swojej odpowiedzi?',
      odpowiedz:
        'Tak, jeśli tego chcesz. Dla Instytutu Kryptografii boty wskazują dokładne miejsce w nagraniu kursu, w którym pada odpowiedź.',
    },
    {
      pytanie: 'Czy baza wiedzy jest tylko w droższych botach?',
      odpowiedz:
        'Nie. Jest w każdym naszym bocie, także w tym za 1790 zł netto. W droższych progach różni się jej objętość i liczba ścieżek rozmowy, a nie sama technologia.',
    },
    {
      pytanie: 'Jak często trzeba aktualizować bazę wiedzy?',
      odpowiedz:
        'Tyle razy, ile razy zmienia się Twoja oferta albo procedura. Przy infrastrukturze u nas aktualizacje mieszczą się w utrzymaniu 99-599 zł netto miesięcznie.',
    },
    {
      pytanie: 'Czy moje dokumenty uczą model językowy?',
      odpowiedz:
        'Do modelu trafia treść rozmowy, żeby powstała odpowiedź. Korzystamy z modelu Claude firmy Anthropic i nie korzystamy z modeli OpenAI. Umowę powierzenia przetwarzania danych podpisujemy przed startem.',
    },
    {
      pytanie: 'Co, jeśli nie mamy spisanej wiedzy?',
      odpowiedz:
        'Wtedy bot nie ma z czego korzystać i mówimy to wprost. Zaczynamy od Sprintu Diagnostycznego za 1490 zł netto: pięć dni roboczych, raport PDF z mapą procesów, kwota odliczana od późniejszego wdrożenia.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P3 sekcja 14): pokazuję materiały,
     które mam. Mikrokopia trzyma się ustalenia właściciela z 2026-08-31:
     bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb, więc obiecujemy tu tylko
     obejrzenie materiałów i ustalenie zakresu. Zero obietnicy pomiaru, testu,
     audytu, raportu i listy rzeczy do zrobienia. */
  cta: {
    label: 'Pokaż nam swoje dokumenty',
    href: '#diagnoza',
    mikrokopia:
      'Na bezpłatnej rozmowie obejrzymy materiały, które masz dzisiaj, i ustalimy zakres bazy wiedzy. Bez zobowiązań.',
    dowod:
      'Gdy okaże się, że nie ma czego wgrać, powiemy to wprost, zamiast sprzedawać Ci bota bez wiedzy.',
  },

  queries: [
    'chatbot z bazą wiedzy firmy',
    'chatbot RAG',
    'co to jest RAG w chatbocie',
    'chatbot na własnych dokumentach',
    'chatbot na dokumentach firmy',
    'chatbot, który podaje źródło odpowiedzi',
  ],

  /* POWIĄZANIA (pakiet §P3 sekcja 12 plus uwaga wdrożeniowa §4: każda podstrona
     linkuje zwrotnie do `/uslugi/chatboty` i do `/uslugi/chatboty/cennik`).
     Etykieta = h1 strony docelowej, opis = fakt, który stoi na tamtej stronie.
     ZERO KWOT w opisach: `opis` niesie fakt ze strony docelowej, nie jej
     cennik (kontrakt pola `powiazane` w `lib/uslugi/types.ts`: „zero nowych
     liczb"). Reguła „cennik w jednym miejscu" pochodzi z pakietu GEO
     (`geo.md` §6), w `chatboty.md` jej nie ma, ale trzymamy ją tutaj.

     KARTA DOŁOŻONA 2026-09-04 (wyrównanie linków przychodzących w gałęzi):
     `sklep-internetowy` miał jedno wejście od sióstr. Powód treściowy stoi
     w sekcji o czasie wdrożenia na TEJ stronie: najdłużej trwają integracje
     z systemami, a nie sama baza wiedzy. Sklep jest dokładnie tym wariantem,
     w którym integracja dochodzi do bazy, więc czytelnik ma gdzie pójść. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firmy',
        href: '/uslugi/chatboty',
        opis: 'Strona macierzysta: co chatbot robi w firmie, gdzie stoi i jak prowadzimy całe wdrożenie.',
      },
      {
        etykieta: 'Chatbot do obsługi klienta, który odpowiada o 22:00',
        href: '/uslugi/chatboty/obsluga-klienta',
        opis: 'Ta sama baza wiedzy od strony klienta zewnętrznego: powtarzalne pytania, noce i weekendy, przekazanie trudnej sprawy człowiekowi.',
      },
      {
        etykieta: 'Asystent AI dla pracowników: procedury bez pytania kolegi',
        href: '/uslugi/chatboty/asystent-wewnetrzny',
        opis: 'Ten sam mechanizm, ale odbiorcą jest pracownik: procedury, instrukcje i regulaminy oraz uprawnienia do dokumentów.',
      },
      {
        etykieta: 'Chatbot AI dla sklepu internetowego',
        href: '/uslugi/chatboty/sklep-internetowy',
        opis: 'Wariant, w którym do bazy wiedzy dochodzi integracja: dostępność produktu i status zamówienia bot sprawdza w systemie sklepu, a nie w dokumencie.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis: 'Wszystkie progi wdrożenia, czasy w dniach roboczych i zasady utrzymania w jednym miejscu.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Chatbot edukacyjny do kursów online',
        href: '/realizacje/chatbot-edukacyjny-kursy',
        opis: 'Instytut Kryptografii: bot zna strukturę kursu i prowadzi kursanta prosto do właściwej lekcji.',
      },
    ],
  },
};
