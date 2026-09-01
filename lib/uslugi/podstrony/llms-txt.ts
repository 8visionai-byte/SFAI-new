import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 7 — LLMS.TXT
 * (`/uslugi/optymalizacja/llms-txt`).
 * Fraza primary: „llms.txt" (pakiet `.seo-przeglad/pakiety/geo.md` §P7,
 * treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja`):
 *  - RODZIC sprzedaje CAŁY proces: naprawa strony, autorytet poza nią i pomiar
 *    cytowań w rytmie. Kończy się bezpłatną diagnozą całej widoczności.
 *  - TA STRONA jest JEDYNĄ podstroną, która czegoś ODRADZA (pakiet §P7,
 *    „Rozdział intencji"). Nie sprzedaje pliku. Odpowiada na jedno pytanie
 *    zakupowe: „ktoś chce mi sprzedać llms.txt, brać czy nie", i kończy się
 *    jedną decyzją: nie kupuję pliku jako skrótu, tylko sprawdzam, co realnie
 *    blokuje cytowanie.
 *  - NIE MA TU I BYĆ NIE MOŻE: opisu naszego procesu naprawy etap po etapie
 *    (rodzic, sekcja „Jak sprawiamy, że AI zaczyna Cię cytować"), opisu audytu
 *    i jego ceny (podstrona `audyt-widocznosci-w-ai`), instrukcji odblokowania
 *    botów (podstrona `dostep-botow-ai`). Cztery rzeczy z potwierdzonym
 *    wpływem opisujemy WYŁĄCZNIE od strony mechanizmu, czyli „dlaczego to
 *    działa, a plik nie", i to jest inna treść niż oferta rodzica.
 *  - Definicja ze słowniczka na stronie rodzica (§N13) NIE jest tu powtarzana
 *    dosłownie, tylko rozwinięta: skąd wziął się pomysł, co o nim wiadomo,
 *    co branża powtarza bez dowodu i co zrobić zamiast.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła: pakiet §P7 („GOTOWA KAPSUŁA"), przeniesiona DOSŁOWNIE,
 *  - H1 i H2 sekcji 1: pakiet §P7, przeniesione dosłownie,
 *  - „to pomysł na standard, a nie potwierdzona metoda", „nie znamy dowodu,
 *    że sam z siebie zwiększa widoczność", „nie kupuj go jako skrótu do
 *    cytowania": pakiet §P7 (kapsuła) oraz słowniczek §N13,
 *  - cztery rzeczy z potwierdzonym wpływem (dostęp botów, odpowiedź wprost
 *    w treści, dane strukturalne, wzmianki poza własną stroną): pakiet §P7
 *    kapsuła i punkt 4 konspektu (tabela),
 *  - „koszt bliski zeru, porządek w dokumentacji": pakiet §P7 punkt 5,
 *  - bezpłatna diagnoza (0 zł, ok. 30 minut, cztery silniki AI, pomiar co
 *    tydzień, wynik czarno na białym): `lib/uslugi/optymalizacja.ts`
 *    (ramaCeny, kroki, tabelaPorownawcza) — strona rodzic,
 *  - plik robots.txt jako punkt odniesienia dla analogii „plik dla robotów":
 *    `lib/uslugi/podstrony/audyt-widocznosci-w-ai.ts` (punkt „Dostęp botów AI").
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  cztery rzeczy z potwierdzonym wpływem (pakiet §P7), około 30 minut
 *  bezpłatnej diagnozy oraz cztery silniki AI i pomiar co tydzień (plik
 *  rodzica). Kwoty zawsze z dopiskiem netto, ale na tej stronie NIE PADA
 *  ani jedna kwota: bezpłatność diagnozy zapisana jest słowami („nic nie
 *  kosztuje"), a strona niczego nie wycenia, więc nie ma czego oznaczać
 *  jako netto ani czego wpisać w `minPrice`.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY:
 *   1. pakiet nie podaje autora ani roku propozycji llms.txt, więc sekcja
 *      „skąd się wziął" opisuje POMYSŁ i jego analogię, a nie historię
 *      z nazwiskiem i datą,
 *   2. uwaga wdrożeniowa §P7 kazała USUNĄĆ sekcję o tym, kto z polskich
 *      agencji sprzedaje llms.txt i za ile (ceny niezweryfikowane u źródła),
 *      więc na tej stronie NIE MA ani jednej cudzej ceny, ani jednej nazwy
 *      agencji. Zdania o kupowaniu pliku są napisane tak, żeby były prawdziwe
 *      bez kwoty,
 *   3. pakiet nie podaje, ile stron ma dziś llms.txt ani ilu dostawców modeli
 *      deklaruje jego obsługę, więc nie pada tu żaden procent ani udział.
 *
 * ZAKAZANE NA TEJ STRONIE: obietnica, że llms.txt cokolwiek podnosi, cudze
 * ceny i nazwy agencji, procenty bez metody, dane o wsparciu pliku przez
 * dostawców modeli, gwarancja miejsca w odpowiedzi modelu.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO),
 * a renderuje się TYMI SAMYMI komponentami co strony usług i pozostałe
 * podstrony. Zero nowych typów bloków, zero nowego CSS.
 */
export const llmsTxt: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'llms-txt',
  dataAktualizacji: '2026-08-31',

  /* H1 1:1 z pakietu §P7. */
  h1: 'llms.txt: co to jest i czy naprawdę coś daje',

  /* KAPSUŁA 1:1 Z PAKIETU §P7 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w takiej formie,
     w jakiej zostało zatwierdzone. Niesie całą tezę strony: czym plik jest,
     czego o nim nie wiemy, kiedy wolno go dodać i co ma potwierdzony wpływ. */
  kapsula:
    'llms.txt to proponowany plik na stronie, który miałby wskazywać modelom AI najważniejsze treści. Mówimy uczciwie: to pomysł na standard, a nie potwierdzona metoda. Nie znamy dowodu, że sam z siebie zwiększa widoczność w odpowiedziach modeli. Kosztuje niewiele, więc możesz go dodać dla porządku, ale nie kupuj go jako skrótu do cytowania. Potwierdzony wpływ mają cztery inne rzeczy: dostęp botów, odpowiedź wprost w treści, dane strukturalne i wzmianki poza własną stroną.',

  /* metaTitle: pakiet §P7 podaje „llms.txt: czy to w ogóle działa" (31 znaków),
     ale decyzja właściciela z 2026-08-31 mówi 50-60 znaków. Fraza główna
     „llms.txt" zostaje NA POCZĄTKU, a wyróżnik „co robić zamiast niego"
     to sekcja, która na tej stronie realnie stoi (konspekt §P7 punkt 7).
     Długość: 56 znaków. Layout dokleja sufiks marki. */
  metaTitle: 'llms.txt: czy to w ogóle działa i co robić zamiast niego',
  /* 151 znaków (policzone znak po znaku w kontroli 2026-08-31). */
  metaDescription:
    'llms.txt to pomysł na standard, nie potwierdzona metoda. Nie znamy dowodu, że sam zwiększa widoczność w AI. Pokazujemy cztery rzeczy z realnym wpływem.',

  problem: {
    /* H2 1:1 z pakietu §P7 sekcja 1. */
    h2: 'Ktoś chce Ci sprzedać llms.txt, czy to ma sens?',
    tresc:
      'Dostajesz ofertę na plik, który ma sprawić, że modele AI zaczną polecać Twoją firmę. Zanim zapłacisz, sprawdź jedno: czy ktokolwiek pokazał Ci dowód, że ten plik komukolwiek to zrobił.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Mówimy to wprost, choć sami zajmujemy się widocznością w AI: llms.txt to pomysł na standard, a nie potwierdzona metoda. Wolimy powiedzieć to na wejściu, niż sprzedać Ci plik jako skrót do cytowania.',
      },
      {
        typ: 'naglowek',
        tekst: 'Czym jest llms.txt i skąd wziął się ten pomysł?',
        ikona: 'folder-kod',
        chip: 'llms.txt',
        overline: 'PROPOZYCJA, NIE STANDARD',
      },
      {
        typ: 'sekcja',
        naglowek: 'Plik, który miałby wskazać modelom najważniejsze treści',
        akapity: [
          'llms.txt to zwykły plik tekstowy na Twojej stronie. W założeniu ma mówić modelom AI, które treści są u Ciebie najważniejsze i gdzie ich szukać, żeby model nie musiał zgadywać po całym serwisie.',
          'Pomysł wziął się z prostej analogii: skoro strona ma od lat plik dla robotów wyszukiwarek, czyli robots.txt, to niech ma też plik dla modeli. Brzmi logicznie i właśnie dlatego rozszedł się po branży szybciej, niż pojawiły się dowody, że działa.',
        ],
        wariant: 'edge',
        chip: 'DEFINICJA',
      },
      {
        typ: 'naglowek',
        tekst: 'Co o llms.txt wiadomo, a co jest tylko powtarzane?',
        ikona: 'lupa-wykres',
        chip: 'DOWÓD',
        overline: 'ROZDZIELAMY FAKT OD OBIETNICY',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'To wiadomo',
            punkty: [
              'Plik można postawić na każdej stronie i nikt Ci tego nie zabroni.',
              'Kosztuje niewiele, bo to zwykły tekst, który sam napiszesz.',
              'Porządkuje dokumentację: masz w jednym miejscu spis swoich najważniejszych stron.',
            ],
          },
          {
            naglowek: 'To jest tylko powtarzane',
            punkty: [
              'Że sam plik zwiększa szansę na cytowanie. Nie znamy dowodu, że tak jest.',
              'Że modele go czytają i traktują jak instrukcję. Tego nikt nam nie pokazał na wyniku.',
              'Że to nowy standard. Na razie to propozycja, którą część branży sprzedaje jak pewnik.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst:
          'Różnica jest prosta. Rzeczy z lewej kolumny da się sprawdzić w minutę, bo dotyczą samego pliku. Rzeczy z prawej dotyczą skutku, a skutku nikt nam nie zmierzył ani nie pokazał.',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co robić zamiast liczyć na llms.txt?',
    tresc:
      'Potwierdzony wpływ mają cztery rzeczy: dostęp botów, odpowiedź wprost w treści, dane strukturalne i wzmianki poza własną stroną. Każda z nich zmienia coś, na co model realnie patrzy, a plik z listą linków nie zmienia żadnej z nich.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Cztery rzeczy, które faktycznie ruszają widoczność w AI',
        ikona: 'gwiazda-kompas',
        chip: 'GEO',
        overline: 'MECHANIZM, NIE OBIETNICA',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '4 rzeczy',
            opis: 'tyle ma potwierdzony wpływ: dostęp botów, odpowiedź wprost, dane strukturalne i wzmianki poza stroną',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: 'zero dowodów',
            opis: 'tyle znamy na to, że sam llms.txt zwiększa widoczność w odpowiedziach modeli',
            zrodlo: 'kapsuła na górze strony',
            ton: 'amber',
          },
          {
            wartosc: 'koszt bliski zeru',
            opis: 'tyle kosztuje sam plik, więc możesz go dodać dla porządku w dokumentacji',
            zrodlo: 'sekcja o koszcie niżej',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Dostęp botów AI',
            akapity: [
              'Jeśli strona nie wpuszcza robotów modeli, nie ma znaczenia, jak dobrze opiszesz swoje treści w osobnym pliku. Model ich nie pobierze, więc nie zacytuje.',
              'To jedyna rzecz z tej czwórki, która działa zero jedynkowo: albo bot ma wstęp, albo nie ma.',
            ],
          },
          {
            naglowek: 'Odpowiedź wprost w treści',
            akapity: [
              'Model składa odpowiedź z fragmentów, które znajdzie w treści. Jeśli odpowiedź na pytanie klienta stoi wysoko i da się ją zacytować bez czytania całości, masz czym trafić do odpowiedzi.',
              'Plik z listą linków nie zmienia ani jednego zdania na Twoich stronach.',
            ],
          },
          {
            naglowek: 'Dane strukturalne',
            akapity: [
              'Znaczniki nazywają wprost, gdzie na stronie stoi firma, gdzie usługa, a gdzie opinia. Bez nich model musi wnioskować z tekstu, a wnioskowanie bywa nietrafione.',
              'Tego też nie zastąpi lista adresów: adres strony to nie jest opis tego, co na niej stoi.',
            ],
          },
          {
            naglowek: 'Wzmianki poza własną stroną',
            akapity: [
              'Model powołuje się na to, co przeczytał w wielu miejscach, nie tylko u Ciebie. Zestawienia, katalogi i wątki, w których pada Twoja nazwa, ważą tu najwięcej.',
              'To jedyna z czterech rzeczy, na którą nie masz wpływu jednym wgraniem pliku na serwer.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego akurat te cztery, a nie plik?',
        akapity: [
          'Bo każda z nich zmienia warunki po stronie modelu: czy w ogóle pobierze Twoją treść, czy znajdzie w niej gotowy cytat, czy zrozumie, czym jest Twoja firma, i czy ma się na co powołać poza Tobą.',
          'llms.txt nie rusza żadnego z tych czterech warunków. Dlatego nawet dobrze napisany plik może nic nie zmienić, a te cztery rzeczy zmieniają coś zawsze, niezależnie od tego, czy plik istnieje.',
        ],
        wariant: 'top',
        chip: 'ZASADA',
        stopka: [
          'Kolejność ma znaczenie: najpierw dostęp botów, bo bez niego reszta pracy nie ma czego dotyczyć.',
          'Plik możesz dodać kiedykolwiek, bo nie blokuje ani nie przyspiesza żadnego z tych czterech kroków.',
        ],
      },
    ],
  },

  /* Tabela z pakietu §P7 punkt 4: llms.txt kontra rzeczy z potwierdzonym
     wpływem. Komórki krótkie (konwencja v20 podstron), żeby wiersze nie
     łamały się na dwie linie na wąskich ekranach. Kolumna „llms.txt" nie
     ocenia intencji autorów pomysłu, tylko mówi, czego plik NIE robi. */
  tabelaPorownawcza: {
    h2: 'llms.txt a rzeczy z potwierdzonym wpływem',
    naglowekBez: 'llms.txt',
    naglowekZNami: 'Cztery rzeczy z potwierdzonym wpływem',
    wiersze: [
      {
        cecha: 'Status',
        bez: 'Propozycja standardu',
        zNami: 'Potwierdzony wpływ na cytowanie',
      },
      {
        cecha: 'Dostęp botów',
        bez: 'Nie zmienia go',
        zNami: 'Decyduje, czy model pobierze treść',
      },
      {
        cecha: 'Treść stron',
        bez: 'Zostaje bez zmian',
        zNami: 'Odpowiedź wprost, gotowa do cytatu',
      },
      {
        cecha: 'Zrozumienie firmy',
        bez: 'Podaje same adresy',
        zNami: 'Dane strukturalne nazywają firmę i usługę',
      },
      {
        cecha: 'Poza Twoją stroną',
        bez: 'Nie sięga dalej niż Twój serwer',
        zNami: 'Wzmianki, na które model może się powołać',
      },
      {
        cecha: 'Koszt',
        bez: 'Bliski zeru, plik piszesz sam',
        zNami: 'Zależy od zakresu pracy',
      },
      {
        cecha: 'Czy to sprzedajemy',
        bez: 'Nie, i nie polecamy kupować',
        zNami: 'Tak, bo za to bierzemy odpowiedzialność',
      },
    ],
  },

  kroki: {
    h2: 'Jak dodać llms.txt, jeśli i tak chcesz go mieć?',
    items: [
      {
        tytul: 'Napisz plik',
        opis: 'Nazwa firmy, jedno zdanie o tym, czym się zajmujesz, i lista najważniejszych stron z krótkim opisem każdej. Gotowy wzór, linia po linii, masz niżej na tej stronie.',
      },
      {
        tytul: 'Wrzuć go do katalogu głównego',
        opis: 'Plik ma się otwierać pod adresem twojadomena.pl/llms.txt. To wszystko: nie ma tu żadnego wdrożenia, za które ktoś powinien wystawić Ci osobną fakturę.',
      },
      {
        tytul: 'Nie licz na niego, tylko zmierz',
        opis: 'Potraktuj plik jak porządek w dokumentacji i wróć do czterech rzeczy z potwierdzonym wpływem. Czy coś realnie się zmieniło, sprawdzisz, wpisując pytania swoich klientów w cztery silniki AI.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje llms.txt i kiedy warto go dodać?',
    /* Bez `minPrice`: ta strona niczego nie wycenia. Komponent RamaCeny
       dokleja pod kartą zdanie o widełkach i bezpłatnej diagnozie, więc
       `tresc` kończy się na tym, za co realnie się płaci. */
    tresc:
      'Sam plik to zwykły tekst, który napiszesz i wrzucisz na stronę, więc jego koszt jest bliski zeru. Płaci się natomiast za rzeczy z potwierdzonym wpływem: dostęp botów, odpowiedź wprost w treści, dane strukturalne i wzmianki poza własną stroną. To ich zakres decyduje o cenie, nie plik.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Kiedy mimo wszystko warto dodać llms.txt?',
        ikona: 'notes-pioro',
        chip: 'ZASADA',
        overline: 'KOSZT BLISKI ZERU · PORZĄDEK W DOKUMENTACJI',
      },
      {
        typ: 'przelacznik',
        grupa: 'llms-txt-decyzja',
        opcje: [
          {
            numer: 'ŚCIEŻKA 1',
            tytul: 'Dodaj sam',
            podtytul: 'koszt bliski zeru',
            naglowek: 'Dodaj plik dla porządku, jeśli lubisz mieć dokumentację poukładaną.',
            akapity: [
              'Przy okazji pisania go musisz nazwać swoje najważniejsze strony i opisać każdą jednym zdaniem. To ćwiczenie bywa wartościowsze niż sam plik, bo pokazuje, czego na stronie brakuje.',
            ],
            punkty: [
              'plik piszesz raz, to krótki tekst bez ani jednej linijki kodu',
              'zyskujesz spis najważniejszych stron w jednym miejscu',
              'nie oczekuj po nim wzrostu cytowań, bo nie znamy dowodu, że go daje',
            ],
          },
          {
            numer: 'ŚCIEŻKA 2',
            tytul: 'Ktoś Ci go sprzedaje',
            podtytul: 'poproś o dowód',
            naglowek: 'Zanim zapłacisz za llms.txt jako osobną usługę, zadaj trzy pytania.',
            akapity: [
              'Nie chodzi o to, żeby się targować. Chodzi o to, żeby sprzedający pokazał skutek, a nie sam fakt, że plik pojawi się na serwerze.',
            ],
            punkty: [
              'u kogo ten plik zadziałał i skąd to wiadomo',
              'co jeszcze wchodzi w cenę poza wgraniem pliku',
              'jak zmierzycie, że po wdrożeniu padam w odpowiedziach częściej',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Gotowy wzór pliku llms.txt',
        ikona: 'folder-kod',
        chip: 'WZÓR',
        overline: 'KRÓTKI PLIK, KTÓRY NAPISZESZ SAM',
      },
      {
        typ: 'tabela',
        naglowki: ['Linia w pliku', 'Co w niej wpisujesz'],
        wiersze: [
          [
            '# Nazwa Twojej firmy',
            'Dokładnie ta nazwa, której używasz na stronie i w wizytówce. Rozjazd w nazwie osłabia Cię wszędzie naraz.',
          ],
          [
            '> Jedno zdanie, czym się zajmujesz',
            'Kim jesteś, dla kogo pracujesz i gdzie. To samo zdanie, które powiedziałbyś klientowi przez telefon.',
          ],
          [
            '## Najważniejsze strony',
            'Nagłówek otwierający listę. Dalej idą pozycje listy, po jednej na stronę.',
          ],
          [
            '- [Oferta](pełny adres): co tam jest',
            'Pełny adres strony i krótki opis, po co ktoś ma tam wejść. Powtarzasz to dla każdej ważnej strony.',
          ],
          [
            '## Kontakt',
            'Adres strony kontaktowej, żeby nie trzeba było go szukać po serwisie.',
          ],
        ],
        wKarcie: true,
        podpis: 'Wzór pliku llms.txt: co wpisać w każdej linii',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czego w tym pliku nie warto robić',
        akapity: [
          'Plik ma być krótki i prawdziwy. Wrzucanie do niego wszystkiego, co masz w serwisie, zamienia go w drugą mapę strony i odbiera mu jedyny sens, czyli wskazanie tego, co naprawdę ważne.',
        ],
        punkty: [
          'Nie wpisuj tam obietnic, których nie ma na samych stronach.',
          'Nie kopiuj do niego całych tekstów, bo model i tak czyta strony, nie ten plik.',
          'Nie wpisuj do niego liczb, których nie da się sprawdzić: plik nie jest miejscem na wyniki.',
        ],
        wariant: 'quiet',
        chip: 'ZASADA',
      },
    ],
    /* Powrót do rodzica jednym zdaniem (uwaga wdrożeniowa §3): ta strona
       kończy decyzją o pliku, a cały proces widoczności opisuje rodzic. */
    linkPoradnik: {
      przed: 'Co realnie robimy, żeby modele zaczęły Cię cytować, opisaliśmy na stronie ',
      etykieta: 'pozycjonowanie pod AI',
      po: '.',
      href: '/uslugi/optymalizacja',
    },
  },

  /* OSIEM PYTAŃ (pakiet §P7 punkt 9). Pakiet NIE podaje ich treści dosłownie,
     więc napisane tutaj, wyłącznie na faktach z §P7 i z pliku rodzica.
     Ten sam tekst idzie na stronę i do FAQPage JSON-LD, więc każda edycja
     tutaj rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Czy llms.txt działa?',
      odpowiedz:
        'Nie znamy dowodu, że sam z siebie zwiększa widoczność w odpowiedziach modeli. To pomysł na standard, a nie potwierdzona metoda. Dlatego mówimy wprost: nie kupuj go jako skrótu do cytowania.',
    },
    {
      pytanie: 'Czym jest plik llms.txt?',
      odpowiedz:
        'To proponowany plik tekstowy na Twojej stronie, który miałby wskazywać modelom AI najważniejsze treści i miejsca, gdzie ich szukać. Pomysł jest wzorowany na pliku dla robotów wyszukiwarek, czyli robots.txt.',
    },
    {
      pytanie: 'Czy mam go dodać, skoro kosztuje niewiele?',
      odpowiedz:
        'Możesz, i to jest uczciwa odpowiedź. Traktuj to jak porządek w dokumentacji strony, a nie jak inwestycję w widoczność. Koszt jest bliski zeru, więc ryzykujesz wyłącznie czasem potrzebnym na napisanie krótkiego tekstu.',
    },
    {
      pytanie: 'Co ma potwierdzony wpływ zamiast llms.txt?',
      odpowiedz:
        'Cztery rzeczy: dostęp botów, odpowiedź wprost w treści, dane strukturalne oraz wzmianki poza własną stroną. Każda z nich zmienia coś, na co model realnie patrzy, a plik z listą adresów nie zmienia żadnej z nich.',
    },
    {
      pytanie: 'Ktoś sprzedaje mi llms.txt jako usługę, kupować?',
      odpowiedz:
        'Najpierw poproś o dowód: u kogo ten plik zadziałał i skąd to wiadomo. Zapytaj też, co poza wgraniem pliku wchodzi w cenę i jak zostanie zmierzone, czy po wdrożeniu padasz w odpowiedziach częściej. Bez tych trzech odpowiedzi płacisz za samo wgranie pliku na serwer.',
    },
    {
      pytanie: 'Czy llms.txt zastąpi odblokowanie botów AI?',
      odpowiedz:
        'Nie. Jeśli Twoja strona nie wpuszcza robotów modeli, żaden plik tego nie naprawi, bo model nie pobierze ani jego, ani Twoich treści. Dostęp botów sprawdza się i ustawia osobno, i to jest pierwszy krok, nie ostatni.',
    },
    {
      pytanie: 'Jak sprawdzić, czy llms.txt cokolwiek u mnie zmienił?',
      odpowiedz:
        'Zmierz przed i po. Zapisz, co modele odpowiadają dziś na pytania Twoich klientów, potem powtórz ten sam zestaw pytań w czterech silnikach AI i porównaj, czy Twoja nazwa pada częściej. Jeden zrzut ekranu niczego nie dowodzi, liczy się seria pomiarów.',
    },
    {
      pytanie: 'Co powinno być w pliku llms.txt?',
      odpowiedz:
        'Nazwa firmy, jedno zdanie o tym, czym się zajmujesz, lista najważniejszych stron z pełnymi adresami i krótkim opisem każdej oraz adres strony kontaktowej. Plik kładziesz w katalogu głównym, tak żeby otwierał się pod adresem twojadomena.pl/llms.txt.',
    },
  ],

  /* Jedna decyzja domykająca stronę: nie kupuję pliku jako skrótu, tylko
     sprawdzam, co realnie blokuje cytowanie. Liczby w mikrokopii pochodzą
     z pliku rodzica (bezpłatna diagnoza, ok. 30 minut, cztery silniki AI).
     Kwota nie pada świadomie: diagnoza jest bezpłatna, a ta strona niczego
     nie wycenia, więc nie ma tu żadnej ceny do oznaczenia jako netto. */
  cta: {
    label: 'Sprawdź, co realnie blokuje cytowanie',
    href: '#diagnoza',
    mikrokopia:
      'Bezpłatna diagnoza trwa około 30 minut i nic nie kosztuje. Zadajemy pytania Twoich klientów w czterech silnikach AI i mówimy, od czego zacząć.',
    dowod:
      'Jeśli u Ciebie wystarczy odblokować boty i poprawić treść, powiemy to wprost, zamiast dopisywać do oferty plik, którego działania nie umiemy udowodnić.',
  },

  queries: [
    'llms.txt',
    'llms.txt czy działa',
    'co to jest llms.txt',
    'czy llms.txt zwiększa widoczność w AI',
    'llms.txt wzór pliku',
    'llms.txt a robots.txt',
  ],

  /* POWIĄZANIA (pakiet §P7 punkt 8: dostęp botów AI, pozycjonowanie pod AI,
     audyt widoczności) plus uwaga wdrożeniowa §3: każda podstrona linkuje
     z powrotem do rodzica.
     RUNDA 2026-08-31: komplet trzech celów stoi na miejscu i wszystkie trasy
     zwracają 200, łącznie z `/uslugi/optymalizacja/dostep-botow-ai` (P6 poszła
     live przed tą stroną, zgodnie z kolejnością publikacji 1, 2, 6, 3, 4, 5,
     8, 7). Opisy bez kwot: uwaga wdrożeniowa §6 trzyma cennik w jednym
     miejscu, a ta strona i tak niczego nie wycenia. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'GPTBot, ClaudeBot, PerplexityBot: czy Twoja strona ich wpuszcza?',
        href: '/uslugi/optymalizacja/dostep-botow-ai',
        opis: 'Pierwsza z czterech rzeczy z potwierdzonym wpływem. W robots.txt szukasz czterech nazw: GPTBot, ClaudeBot, PerplexityBot i Google-Extended.',
      },
      {
        etykieta: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',
        href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
        opis: 'Płatna diagnoza, która kończy się raportem PDF z pomiarem zerowym i listą priorytetów, zamiast domysłów o pliku.',
      },
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Cały proces: naprawa strony, autorytet poza nią i pomiar cytowań co tydzień w czterech silnikach AI.',
      },
    ],
  },
};
