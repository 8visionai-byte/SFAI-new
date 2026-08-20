import type { Usluga } from './types';

/**
 * USŁUGA — PRYWATNY ASYSTENT DLA PREZESA (audyt
 * `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §5, etap 3 pkt 10).
 * Do 2026-08-19 tego produktu NIE BYŁO na stronie.
 *
 * CENNIK (audyt §5, kwoty i terminy podane przez Pawła, potwierdzone
 * 2026-08-19 „start budowy pięć-dziesięć dni, a cena 4999"):
 *  - stworzenie: 4999 zł (2026-08-20 Paweł obniżył z 7999: „niech to nie
 *    będzie taka duża kwota"; ostatnia zadeklarowana kwota to 4999),
 *  - czas budowy: 5-10 dni roboczych,
 *  - utrzymanie serwerów: 199 zł miesięcznie,
 *  - zużycie: według cennika API modeli, po stronie klienta.
 * Model rozliczenia jest IDENTYCZNY jak przy voicebotach (stworzenie /
 * utrzymanie / zużycie), a bota przekazujemy prezesowi.
 *
 * CO TO JEST (audyt §5): agent z własnym interfejsem, który uczy się zachowań
 * KONKRETNEJ OSOBY. Pisze maile, robi research, przygotowuje do rozmów, tworzy
 * prezentacje, prowadzi badania. Ma funkcje wykonawcze: wchodzi w udostępnione
 * pliki i działa na nich. Zakres dopasowywany indywidualnie.
 * MECHANIZM DO COPY (audyt §5, cytat Pawła): działa jak nowo przyjęta
 * asystentka albo student. Na początku opowiadasz mu, czym się zajmujesz,
 * a jego wiedza rośnie z każdym użyciem.
 *
 * CZEGO TU NIE MA I NIE WOLNO DOPISAĆ:
 *  - to NIE jest „Drugi mózg" z portfolio narzędzi (§8) ani voicebot; nie
 *    mieszać opisów ani cen,
 *  - audyt przy §5 nie zapisuje wprost, czy 4999 zł i 199 zł miesięcznie są
 *    netto, ale od 2026-08-18 netto jest standardem CAŁEGO cennika (audyt §9
 *    etap 1 pkt 4), a RamaCeny.tsx dokleja to słowo do kwoty z minPrice, więc
 *    strona jest spójna: netto wszędzie. DO POTWIERDZENIA przez Pawła,
 *  - audyt nie podaje żadnej liczby dowodowej z wdrożenia tego produktu,
 *    więc `cta.dowod` mówi o mechanizmie, nie o wyniku.
 */
export const asystentPrezesa: Usluga = {
  slug: 'asystent-prezesa',
  dataAktualizacji: '2026-08-21',
  h1: 'Prywatny asystent AI dla prezesa',

  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2): cena, czas budowy,
     koszt miesięczny i zasada rozliczenia zużycia w jednym akapicie. */
  kapsula:
    'Prywatny asystent AI dla prezesa to agent z własnym interfejsem, który uczy się zachowań jednej konkretnej osoby. Pisze maile, robi research, przygotowuje do rozmów i tworzy prezentacje, a do tego wchodzi w udostępnione pliki i działa na nich. Stworzenie kosztuje 4999 zł netto, budowa trwa 5 do 10 dni roboczych, utrzymanie serwerów to 199 zł netto miesięcznie, a zużycie modeli rozliczasz według realnego użycia. Bota przekazujemy Tobie.',

  metaTitle: 'Prywatny asystent AI dla prezesa: 4999 zł',
  metaDescription:
    'Asystent AI uczący się jednej osoby: maile, research, przygotowanie do rozmów, praca na plikach. Stworzenie 4999 zł netto, budowa 5 do 10 dni roboczych.',

  problem: {
    h2: 'Na czym schodzi dzień osoby, która prowadzi firmę?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Nie na decyzjach, tylko na dojściu do nich. Drobne zadania, które wymagają znajomości kontekstu firmy, zjadają razem pół dnia.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'pół dnia',
            opis: 'Tyle zjadają razem drobne zadania wokół decyzji, każde wymagające znajomości kontekstu firmy.',
            zrodlo: 'akapit pod listą zadań na tej stronie',
            ton: 'amber',
          },
          {
            wartosc: 'kwadrans',
            opis: 'Tyle trwa jedno takie zadanie i żadne z nich nie posuwa firmy do przodu.',
            zrodlo: 'akapit pod listą zadań na tej stronie',
            ton: 'cyan',
          },
        ],
      },
      {
        typ: 'lista',
        punkty: [
          'Przeczytanie całego wątku tylko po to, żeby wiedzieć, o co w ogóle chodzi.',
          'Napisanie maila, który mógłby napisać ktokolwiek, gdyby znał kontekst.',
          'Sprawdzenie, kim jest firma, z którą masz spotkanie.',
          'Zebranie liczb z trzech plików do jednej tabeli.',
          'Poskładanie prezentacji z rzeczy, które i tak już są.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Każda z tych rzeczy trwa kwadrans i żadna nie posuwa firmy do przodu. Osobno wyglądają niewinnie, ale razem zjadają pół dnia. Wspólny mianownik jest jeden: każde z tych zadań wymaga znajomości kontekstu firmy. Nie da się ich zlecić dalej, bo osoba, która je przejmie, i tak musi najpierw ten kontekst poznać.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego asystent-człowiek i zwykły czat AI tego nie rozwiązują?',
        wariant: 'quiet',
        akapity: [
          'Asystent-człowiek to rozwiązuje, ale najpierw trzeba go znaleźć, wdrożyć i wprowadzić w kontekst firmy. A wrażliwe rzeczy i tak zostają po Twojej stronie.',
          'Zwykły czat AI też tego nie rozwiązuje, bo nie zna Twojej firmy. Za każdym razem zaczynasz od tłumaczenia, czym się zajmujesz, a to tłumaczenie samo w sobie jest kolejnym drobnym zadaniem.',
          'Dlatego te zadania wracają do Ciebie. Nie dlatego, że są trudne, tylko dlatego, że nikt poza Tobą nie ma dość kontekstu, żeby zrobić je dobrze za pierwszym razem.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie robi prywatny asystent AI?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Budujemy agenta z własnym interfejsem, przypisanego do jednej konkretnej osoby. To osobisty agent AI dla firmy: pisze maile w Twoim tonie, robi research i pracuje na plikach, które mu udostępnisz.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co asystent robi za Ciebie',
        ikona: 'osoba-check',
        chip: 'ZAKRES',
        overline: 'ZAKRES DOPASOWYWANY INDYWIDUALNIE',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Pisanie',
            akapity: [
              'Bierze na siebie teksty, które i tak powstają z materiału, który już masz.',
            ],
            punkty: [
              'Pisze maile w Twoim tonie.',
              'Składa prezentacje z materiałów, które już masz.',
            ],
          },
          {
            naglowek: 'Przygotowanie',
            akapity: [
              'Wchodzisz na spotkanie z gotowym kontekstem, zamiast zbierać go w biegu.',
            ],
            punkty: [
              'Robi research i prowadzi badania na materiale, który mu dasz.',
              'Przygotowuje Cię do rozmów i spotkań.',
            ],
          },
          {
            naglowek: 'Wykonanie',
            akapity: [
              'Nie kończy na podpowiedzi. Pracuje na tym, co mu udostępnisz, i tylko na tym.',
            ],
            punkty: [
              'Ma funkcje wykonawcze: wchodzi w udostępnione pliki i działa na nich, zamiast tylko podpowiadać, co zrobić.',
              'Czego mu nie udostępnisz, tego nie dotknie.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Zakres dopasowujemy indywidualnie. Na starcie ustalamy, co asystent ma umieć, do czego ma mieć dostęp i czego nie ma dotykać. To jest decyzja z rozmowy o zakresie, nie ustawienie, które trzeba potem odkrywać.',
      },
      {
        typ: 'naglowek',
        tekst: 'Czy asystent działa od razu w pełni?',
        ikona: 'kalendarz-check',
        chip: 'ZASADA',
        overline: 'DOJRZEWA JAK NOWA OSOBA W ZESPOLE',
      },
      {
        typ: 'przelacznik',
        grupa: 'asystent-prezesa-dojrzewanie',
        opcje: [
          {
            numer: 'ETAP 1',
            tytul: 'Pierwsze dni',
            podtytul: 'Opowiadasz mu o firmie',
            naglowek: 'Nie, i mówimy to wprost: asystent nie działa w pełni od pierwszego dnia.',
            akapity: [
              'Asystent działa jak nowo przyjęta asystentka albo student. Na początku opowiadasz mu, czym się zajmujesz, i musisz go poprawiać, tak jak poprawia się nową osobę w zespole.',
            ],
            punkty: [
              'Opowiadasz mu, czym się zajmujesz.',
              'Poprawiasz to, co wyszło nie tak.',
              'Kto oczekuje gotowego pracownika pierwszego dnia, będzie rozczarowany.',
            ],
          },
          {
            numer: 'ETAP 2',
            tytul: 'Pierwsze tygodnie',
            podtytul: 'Z każdym tygodniem robi więcej',
            naglowek: 'To narzędzie, które z każdym tygodniem robi więcej.',
            akapity: [
              'Jego wiedza rośnie z każdym użyciem, więc to, co raz poprawisz, zostaje w nim na stałe. Poprawiasz coraz rzadziej, bo asystent coraz mniej zgaduje.',
            ],
            punkty: [
              'Wiedza o firmie rośnie z każdym użyciem.',
              'W zwykłym czacie takie poprawki znikają, tutaj zostają w asystencie.',
            ],
          },
          {
            numer: 'ETAP 3',
            tytul: 'Później',
            podtytul: 'Powierzasz coraz więcej',
            naglowek: 'Zna firmę na tyle, że można mu powierzać coraz więcej.',
            akapity: [
              'Wtedy przestajesz tłumaczyć kontekst i zaczynasz po prostu zlecać. To ten sam moment, w którym nowa osoba w zespole przestaje pytać o każdy szczegół.',
            ],
            punkty: [
              'Przestajesz tłumaczyć kontekst i zaczynasz zlecać.',
              'Zlecasz zadania z tej samej listy, która na starcie zjadała pół dnia.',
            ],
          },
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Zwykły czat AI, nowy asystent i asystent szyty na miarę',
    naglowekBez: 'Zwykły czat AI z półki',
    naglowekZNami: 'Asystent od SimpleFast.ai',
    wiersze: [
      { cecha: 'Kontekst firmy', bez: 'Tłumaczysz od nowa przy każdej rozmowie', zNami: 'Rośnie z każdym użyciem' },
      { cecha: 'Praca na plikach', bez: 'Wklejasz treść ręcznie', zNami: 'Wchodzi w udostępnione pliki i działa na nich' },
      { cecha: 'Zakres', bez: 'Taki sam dla wszystkich', zNami: 'Dopasowany do jednej osoby' },
      { cecha: 'Interfejs', bez: 'Wspólne okno czatu', zNami: 'Własny interfejs asystenta' },
      { cecha: 'Koszt startu', bez: 'Niski, ale bez efektu na starcie', zNami: '4999 zł netto jednorazowo' },
      { cecha: 'Czas budowy', bez: 'Brak budowy, brak dopasowania', zNami: '5 do 10 dni roboczych' },
      { cecha: 'Koszt miesięczny', bez: 'Abonament za dostęp', zNami: '199 zł netto za serwery plus realne zużycie' },
      { cecha: 'Własność', bez: 'Konto u dostawcy', zNami: 'Bota przekazujemy Tobie' },
    ],
  },

  kroki: {
    h2: 'Jak powstaje asystent krok po kroku?',
    items: [
      {
        tytul: 'Rozmowa o zakresie',
        opis:
          'Ustalamy, co asystent ma robić na co dzień, do jakich plików i narzędzi ma mieć dostęp i czego nie ma dotykać. To jest rozmowa o Twoim dniu, nie o technologii.',
      },
      {
        tytul: 'Budowa i pierwsze uczenie',
        opis:
          'W 5 do 10 dni roboczych stawiamy agenta z własnym interfejsem i wgrywamy pierwszą wiedzę o firmie. Czas liczymy od przekazania kompletu materiałów i dostępów, a nie od podpisania umowy.',
      },
      {
        tytul: 'Przekazanie i docieranie',
        opis:
          'Bota przekazujemy Tobie. Przez pierwsze tygodnie poprawiasz go tak, jak poprawia się nową osobę w zespole, a jego wiedza rośnie z każdym użyciem. Dwie rundy poprawek są w cenie.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje prywatny asystent AI dla prezesa?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Stworzenie asystenta kosztuje 4999 zł netto i płacisz to raz, a budowa trwa 5 do 10 dni roboczych. Do tego dochodzi utrzymanie serwerów za 199 zł netto miesięcznie oraz zużycie modeli, rozliczane według realnego użycia po Twojej stronie.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '4999 zł netto',
            opis: 'Stworzenie asystenta, płatne raz.',
            zrodlo: 'pozycja Stworzenie asystenta niżej',
            ton: 'cyan',
          },
          {
            wartosc: '5 do 10 dni',
            opis: 'Dni robocze budowy, liczone od przekazania kompletu materiałów.',
            zrodlo: 'pozycja Stworzenie asystenta niżej',
            ton: 'violet',
          },
          {
            wartosc: '199 zł netto',
            opis: 'Miesięcznie za serwery, na których działa Twój asystent.',
            zrodlo: 'pozycja Utrzymanie serwerów niżej',
            ton: 'amber',
          },
          {
            wartosc: '2 rundy',
            opis: 'Tyle rund poprawek jest w cenie budowy.',
            zrodlo: 'pozycja Stworzenie asystenta niżej',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Z czego składa się koszt asystenta?',
        ikona: 'wykres-strzalka',
        chip: 'CENNIK',
        overline: 'TEN SAM MODEL ROZLICZENIA CO PRZY VOICEBOTACH',
      },
      {
        typ: 'przelacznik',
        grupa: 'asystent-prezesa-koszty',
        opcje: [
          {
            numer: 'POZYCJA 1',
            tytul: 'Stworzenie asystenta',
            podtytul: '4999 zł netto, płatne raz',
            naglowek: 'Stworzenie asystenta kosztuje 4999 zł netto i płacisz to raz.',
            akapity: [
              'Budowa trwa 5 do 10 dni roboczych, liczonych od przekazania kompletu materiałów i dostępów, a nie od podpisania umowy. Kompletem nazywamy to, co asystent ma znać i gdzie ma móc wejść.',
              'W tej kwocie jest agent z własnym interfejsem, przypisany do jednej konkretnej osoby, i pierwsza wiedza o Twojej firmie.',
            ],
            punkty: [
              'Budowa w 5 do 10 dni roboczych.',
              'Dwie rundy poprawek w cenie budowy.',
              'Nowe funkcje dokładane później to rozbudowa, wyceniana osobno.',
            ],
          },
          {
            numer: 'POZYCJA 2',
            tytul: 'Utrzymanie serwerów',
            podtytul: '199 zł netto miesięcznie',
            naglowek: 'Utrzymanie serwerów to 199 zł netto miesięcznie.',
            akapity: [
              'To infrastruktura, na której działa Twój asystent. Nic więcej nie jest w tej pozycji schowane.',
              'Dane klientów zostają w Unii Europejskiej, a przetwarzanie prowadzimy zgodnie z RODO i AI Act.',
            ],
            punkty: [
              'Jedna stała pozycja miesięczna, bez ukrytych dodatków.',
              'Bez abonamentu za dostęp do cudzego konta.',
            ],
          },
          {
            numer: 'POZYCJA 3',
            tytul: 'Zużycie',
            podtytul: 'Według cennika API modeli',
            naglowek: 'Zużycie rozliczasz według realnego użycia, po swojej stronie.',
            akapity: [
              'Płacisz za tyle, ile asystent faktycznie przepracuje. Jeden spokojny tydzień kosztuje mniej niż tydzień, w którym asystent pisze i szuka bez przerwy.',
              'Dlaczego trzy pozycje zamiast jednego abonamentu? Bo w abonamencie zużycie jest schowane i nie widać, za co się płaci. Tutaj każdą pozycję widzisz z osobna.',
            ],
            punkty: [
              'Rozliczenie według cennika API modeli, po Twojej stronie.',
              'Płacisz za realne użycie, nie za ryczałt ustalony z góry.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Pozycja',
          'Ile',
          'Co obejmuje',
        ],
        wiersze: [
          [
            'Stworzenie asystenta',
            '4999 zł netto, płatne raz',
            'Budowa w 5 do 10 dni roboczych, liczonych od przekazania kompletu materiałów i dostępów',
          ],
          [
            'Utrzymanie serwerów',
            '199 zł netto miesięcznie',
            'Infrastruktura, na której działa Twój asystent',
          ],
          [
            'Zużycie',
            'Według cennika API modeli, po Twojej stronie',
            'Płacisz za tyle, ile asystent faktycznie przepracuje',
          ],
        ],
        wKarcie: true,
        podpis: 'Trzy osobne pozycje kosztu asystenta, ten sam model rozliczenia co przy voicebotach',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kto jest właścicielem asystenta po wdrożeniu?',
        wariant: 'edge',
        chip: 'WŁASNOŚĆ',
        akapity: [
          'Ty. Bota przekazujemy Tobie, więc nie kupujesz dostępu do cudzego konta, tylko narzędzie, które zostaje po Twojej stronie. Jeśli kiedyś zdecydujesz inaczej, możesz po prostu przestać płacić za utrzymanie.',
        ],
        punkty: [
          'Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze.',
          'Zakres i dostępy ustalasz na starcie, w rozmowie o Twoim dniu, nie o technologii.',
        ],
        stopka: [
          'Zanim cokolwiek zamówisz, na bezpłatnej diagnozie przechodzimy Twój tydzień i mówimy wprost, czy w Twoim przypadku asystent zwróci się szybciej niż tańsze wdrożenie z innego obszaru.',
          'Diagnoza trwa około 30 minut, kosztuje 0 zł i kończy się konkretną listą rzeczy do automatyzacji. Pierwszy krok jest mały i odwracalny.',
        ],
      },
    ],
    minPrice: 4999,
    linkPoradnik: {
      przed: 'Jak liczyć zwrot z wdrożenia agenta AI, rozpisaliśmy w ',
      etykieta: 'poradniku o kosztach agenta AI',
      po: '.',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    },
  },

  faq: [
    {
      pytanie: 'Ile kosztuje prywatny asystent AI dla prezesa?',
      odpowiedz:
        'Stworzenie asystenta kosztuje 4999 zł netto i jest to opłata jednorazowa. Do tego dochodzi utrzymanie serwerów za 199 zł netto miesięcznie oraz zużycie rozliczane według cennika API modeli, po Twojej stronie. Trzy pozycje zamiast jednego abonamentu, żeby było widać, za co dokładnie płacisz.',
    },
    {
      pytanie: 'Ile trwa budowa asystenta?',
      odpowiedz:
        'Od 5 do 10 dni roboczych. Czas liczymy od przekazania kompletu materiałów i dostępów, czyli tego, co asystent ma znać i gdzie ma móc wejść, a nie od podpisania umowy. Dwie rundy poprawek są w cenie budowy.',
    },
    {
      pytanie: 'Czym to się różni od zwykłego czatu AI?',
      odpowiedz:
        'Zwykły czat nie zna Twojej firmy, więc przy każdej rozmowie zaczynasz od tłumaczenia kontekstu, i nie ma dostępu do Twoich plików. Asystent ma własny interfejs, uczy się zachowań jednej konkretnej osoby i ma funkcje wykonawcze: wchodzi w udostępnione pliki i działa na nich. Jego wiedza o firmie rośnie z każdym użyciem.',
    },
    {
      pytanie: 'Czy asystent działa od razu w pełni?',
      odpowiedz:
        'Nie i mówimy to wprost. Działa jak nowo przyjęta asystentka albo student. Na początku opowiadasz mu, czym się zajmujesz, i musisz go poprawiać. Z każdym użyciem wie więcej, aż po jakimś czasie zna firmę na tyle, że można mu powierzać coraz więcej. Kto oczekuje gotowego pracownika pierwszego dnia, będzie rozczarowany.',
    },
    {
      pytanie: 'Kto jest właścicielem asystenta po wdrożeniu?',
      odpowiedz:
        'Ty. Bota przekazujemy prezesowi, więc nie kupujesz dostępu do naszego konta. Rozliczenie jest takie samo jak przy voicebotach: stworzenie, utrzymanie serwerów i zużycie modeli. Za utrzymanie serwerów płacisz 199 zł netto miesięcznie, a zużycie idzie według realnego użycia po Twojej stronie.',
    },
    {
      pytanie: 'Co asystent może, a czego nie ruszy?',
      odpowiedz:
        'Zakres ustalamy indywidualnie na starcie. Domyślnie pisze maile, robi research, przygotowuje do rozmów, tworzy prezentacje i prowadzi badania na materiale, który mu dasz, oraz pracuje na plikach, które mu udostępnisz. Czego nie udostępnisz, tego nie dotknie. To jest decyzja z rozmowy o zakresie, nie ustawienie, które trzeba potem odkrywać.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Umów bezpłatną diagnozę. Przechodzimy Twój tydzień i mówimy, co asystent realnie zdejmie, zanim cokolwiek zamówisz.',
    dowod:
      'Asystent uczy się jednej osoby i z każdym użyciem wie więcej. Bota przekazujemy Tobie, nie zostajesz z dostępem do cudzego konta.',
  },

  queries: [
    'prywatny asystent AI dla prezesa',
    'asystent AI dla zarządu',
    'osobisty agent AI dla firmy',
    'ile kosztuje asystent AI',
    'asystent AI piszący maile i prezentacje',
  ],

  powiazane: {
    uslugi: [
      {
        etykieta: 'Rozwiązania AI na zamówienie',
        href: '/uslugi/rozwiazania',
        opis:
          'Aplikacje i wtyczki budowane pod jeden proces, gdy na półce nie ma niczego, co pasuje.',
      },
      {
        etykieta: 'Audyt AI firmy',
        href: '/uslugi/audyt-ai',
        opis:
          'Sprint Diagnostyczny za 1490 zł netto w 5 dni roboczych. Mapa procesów ułożona od największego zwrotu, kwota odliczana od wdrożenia.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Wpisujesz godziny tracone na powtarzalnej robocie, a kalkulator pokazuje kwotę roczną do odzyskania.',
      },
    ],
  },
};
