import type { Usluga } from './types';

/**
 * USŁUGA — PRYWATNY ASYSTENT DLA PREZESA (audyt
 * `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §5, etap 3 pkt 10).
 * Do 2026-08-19 tego produktu NIE BYŁO na stronie.
 *
 * CENNIK (audyt §5, kwoty i terminy podane przez Pawła, potwierdzone
 * 2026-08-19 „start budowy pięć-dziesięć dni, a cena 7999"):
 *  - stworzenie: 7999 zł,
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
 *  - audyt przy §5 nie zapisuje wprost, czy 7999 zł i 199 zł miesięcznie są
 *    netto, ale od 2026-08-18 netto jest standardem CAŁEGO cennika (audyt §9
 *    etap 1 pkt 4), a RamaCeny.tsx dokleja to słowo do kwoty z minPrice, więc
 *    strona jest spójna: netto wszędzie. DO POTWIERDZENIA przez Pawła,
 *  - audyt nie podaje żadnej liczby dowodowej z wdrożenia tego produktu,
 *    więc `cta.dowod` mówi o mechanizmie, nie o wyniku.
 */
export const asystentPrezesa: Usluga = {
  slug: 'asystent-prezesa',
  dataAktualizacji: '2026-08-19',
  h1: 'Prywatny asystent AI dla prezesa',

  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2): cena, czas budowy,
     koszt miesięczny i zasada rozliczenia zużycia w jednym akapicie. */
  kapsula:
    'Prywatny asystent AI dla prezesa to agent z własnym interfejsem, który uczy się zachowań jednej konkretnej osoby. Pisze maile, robi research, przygotowuje do rozmów i tworzy prezentacje, a do tego wchodzi w udostępnione pliki i działa na nich. Stworzenie kosztuje 7999 zł netto, budowa trwa 5 do 10 dni roboczych, utrzymanie serwerów to 199 zł netto miesięcznie, a zużycie modeli rozliczasz według realnego użycia. Bota przekazujemy Tobie.',

  metaTitle: 'Prywatny asystent AI dla prezesa: 7999 zł',
  metaDescription:
    'Asystent AI uczący się jednej osoby: maile, research, przygotowanie do rozmów, praca na plikach. Stworzenie 7999 zł netto, budowa 5 do 10 dni roboczych.',

  problem: {
    h2: 'Na czym schodzi dzień osoby, która prowadzi firmę?',
    tresc:
      'Nie na decyzjach. Na dojściu do nich. Przeczytanie wątku, żeby wiedzieć, o co chodzi. Napisanie maila, który mógłby napisać ktokolwiek, gdyby znał kontekst. Sprawdzenie, kim jest firma przed spotkaniem. Zebranie liczb z trzech plików do jednej tabeli. Poskładanie prezentacji z rzeczy, które i tak już są. Każda z tych rzeczy trwa kwadrans i żadna nie posuwa firmy do przodu, a razem zjadają pół dnia. Asystent-człowiek to rozwiązuje, ale trzeba go znaleźć, wdrożyć i wprowadzić w kontekst, a wrażliwe rzeczy i tak zostają po Twojej stronie. Zwykły czat AI też nie rozwiązuje, bo za każdym razem zaczynasz od tłumaczenia, czym się zajmujesz.',
  },

  rozwiazanie: {
    h2: 'Co dokładnie robi prywatny asystent AI?',
    tresc:
      'Budujemy agenta z własnym interfejsem, przypisanego do jednej osoby. Pisze maile w Twoim tonie, robi research, przygotowuje Cię do rozmów, składa prezentacje i prowadzi badania na materiale, który mu dasz. Ma funkcje wykonawcze, czyli wchodzi w udostępnione pliki i działa na nich, zamiast tylko podpowiadać, co zrobić. Zakres dopasowujemy indywidualnie: co ma umieć, do czego ma mieć dostęp i czego nie ma dotykać. Najważniejsze jest to, jak się uczy. Działa jak nowo przyjęta asystentka albo student. Na początku opowiadasz mu, czym się zajmujesz, i musisz go poprawiać. Z każdym użyciem jego wiedza rośnie, aż po jakimś czasie zna firmę na tyle, że można mu powierzać coraz więcej. To nie jest narzędzie, które działa w pełni od pierwszego dnia. To jest narzędzie, które z każdym tygodniem robi więcej.',
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
      { cecha: 'Koszt startu', bez: 'Niski, ale bez efektu na starcie', zNami: '7999 zł netto jednorazowo' },
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
    tresc:
      'Koszt dzieli się na trzy osobne pozycje, tak samo jak przy voicebotach, i każdą widzisz z osobna. Pierwsza to stworzenie asystenta: 7999 zł netto, płatne raz. Budowa trwa 5 do 10 dni roboczych, liczonych od przekazania kompletu materiałów i dostępów. Druga pozycja to utrzymanie serwerów: 199 zł netto miesięcznie. Trzecia to zużycie, czyli rozliczenie według cennika API modeli, po Twojej stronie, bo płacisz za tyle, ile asystent faktycznie przepracuje. Nie chowamy zużycia w jednym abonamencie, bo wtedy nie widać, za co się płaci. Bota przekazujemy Tobie, więc nie kupujesz dostępu do konta, tylko narzędzie, które zostaje po Twojej stronie. W cenie budowy są dwie rundy poprawek. Nowe funkcje dokładane później to rozbudowa, wyceniana osobno. Zanim cokolwiek zamówisz, na bezpłatnej diagnozie przechodzimy Twój tydzień i mówimy wprost, czy w Twoim przypadku ten asystent zwróci się szybciej niż tańsze wdrożenie z innego obszaru.',
    minPrice: 7999,
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
        'Stworzenie asystenta kosztuje 7999 zł netto i jest to opłata jednorazowa. Do tego dochodzi utrzymanie serwerów za 199 zł netto miesięcznie oraz zużycie rozliczane według cennika API modeli, po Twojej stronie. Trzy pozycje zamiast jednego abonamentu, żeby było widać, za co dokładnie płacisz.',
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
