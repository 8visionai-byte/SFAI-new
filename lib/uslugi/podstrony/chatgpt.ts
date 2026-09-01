import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 2 — POZYCJONOWANIE W CHATGPT
 * (`/uslugi/optymalizacja/chatgpt`).
 * Fraza primary: „pozycjonowanie w ChatGPT" (pakiet `.seo-przeglad/pakiety/geo.md`
 * §P2, linie 582-631, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja` i sióstr z gałęzi GEO):
 *  - RODZIC opisuje METODĘ NIEZALEŻNĄ OD MODELU: cztery silniki AI, cztery etapy
 *    pracy, autorytet poza stroną, pomiar co tydzień, trzy case'y (PL i DE).
 *  - TA STRONA bierze WYŁĄCZNIE ChatGPT i kończy się jedną decyzją: chcę być
 *    wskazywany w ChatGPT. Jest tu więc: skąd ChatGPT bierze wiedzę o firmach,
 *    jak sprawdzić to samemu, co zmieniamy na stronie, dostęp dla robotów
 *    OpenAI, werdykty „działa / nic nie zmienia / sprzedawane bez potwierdzenia",
 *    jeden zmierzony przypadek, cena i czas, kiedy to nie zadziała.
 *  - NIE MA TU I BYĆ NIE MOŻE: Google i AI Overviews (podstrona P3), Perplexity
 *    (P4), pomiaru cytowań w czasie (P5), pełnej listy botów i tabeli decyzyjnej
 *    robots.txt (P6), a także opisu samego audytu jako produktu (siostra
 *    `audyt-widocznosci-w-ai`, która sprzedaje Sprint Diagnostyczny).
 *  - H2 rodzica są sprawdzone jeden po drugim i żaden nie powtarza się tutaj
 *    w brzmieniu (rodzic: „Klienci pytają AI, a AI poleca kogoś innego?",
 *    „Jak sprawiamy, że AI zaczyna Cię cytować?", „Klasyczne SEO a pozycjonowanie
 *    pod AI (GEO)", „Jak wygląda optymalizacja pod AI krok po kroku?",
 *    „Ile kosztuje pozycjonowanie pod AI?").
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P2, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami),
 *  - H1 i H2 sekcji 1: pakiet §P2 („H1" oraz „Sekcje" punkt 1), 1:1,
 *  - pamięć modelu kontra wyszukiwanie w sieci: pakiet §P2 sekcja 2, opisane
 *    wyłącznie tym, co stoi w FAQ tej samej sekcji pakietu (GPTBot pobiera
 *    treści dla OpenAI; przy sprawdzaniu notuje się zacytowane źródło),
 *  - gotowe pytania do wklejenia i zasada „nowe okno, bez historii i bez
 *    zalogowanego konta, notujesz trzy rzeczy": pakiet §P2 sekcja 3 + FAQ 1,
 *  - cztery rzeczy, które zmieniamy na stronie (odpowiedzi wprost, encja firmy,
 *    dane strukturalne, obecność poza własną stroną): pakiet §P2 sekcja 4,
 *  - dostęp dla GPTBot i OAI-SearchBot: pakiet §P2 sekcja 5 + FAQ „Co to jest
 *    GPTBot"; GPTBot opisany poprawnie jako robot OpenAI (uwaga wdrożeniowa §7),
 *  - werdykty w tabeli (działa / nic nie zmienia / sprzedawane bez
 *    potwierdzenia): pakiet §P2 sekcja 6, każdy wiersz oparty o zdanie z kapsuły
 *    albo z FAQ tej samej sekcji pakietu,
 *  - Lenart Motors (ok. 3 tygodnie od publikacji nowej strony do wskazania firmy
 *    przez ChatGPT na pytanie o najlepszego blacharza i lakiernika premium,
 *    plus uczciwe zastrzeżenie: jeden zmierzony przypadek, prosta branża z małą
 *    konkurencją o to jedno pytanie): pakiet §P2 sekcja 7, kapsuła i FAQ 3,
 *  - cena i czas: pakiet §P2 sekcja 8 oraz FAQ „Ile to kosztuje".
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1490 zł netto i 5 dni roboczych (Sprint Diagnostyczny), 1590 zł netto
 *  i 1 dzień (landing), 2900 zł netto i 2-4 dni (strona biznesowa),
 *  od 5900 zł netto i 5-10 dni (strona zaawansowana), trzy rzeczy z kapsuły,
 *  cztery rzeczy zmieniane na stronie, około trzy tygodnie u Lenart Motors.
 *  Wszystkie kwoty zawsze z dopiskiem netto. Zdania kontraktowe z uwagi
 *  wdrożeniowej §8 zachowane co do słowa: „odliczany od wdrożenia" (nigdy
 *  „zwracamy") i „od 5900 zł" przy stronie zaawansowanej (nigdy „5900 zł").
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje, ile pytań kontrolnych
 *  wchodzi w zestaw, ilu klientów tak wdrożyliśmy ani ile trwa efekt poza
 *  jedynym zmierzonym przypadkiem. Zdania są napisane tak, żeby były prawdziwe
 *  bez tych liczb.
 *
 * ZAKAZANE NA TEJ STRONIE: gwarancja miejsca w odpowiedzi ChatGPT, obiecany
 * termin efektu, procenty bez metody, cudze case'y bez nazwy, twierdzenie że za
 * naszym botem stoi OpenAI (uwaga wdrożeniowa §7: bot na simplefast.ai działa
 * na modelu Anthropic), a także słownictwo zakazane w całym repo (lista zakazów
 * w `lib/uslugi/podstrony/windykacja.ts`: bot nigdy nie dzwoni sam).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO),
 * a renderuje się TYMI SAMYMI komponentami co strony usług i pozostałe
 * podstrony. Zero nowych typów bloków, zero nowego CSS.
 *
 * RENDER CENY (kontrola 2026-08-31, punkt ZAMKNIĘTY ustaleniem właściciela):
 * `minPrice: 1490` stoi bez `cenaStala` świadomie, bo dalsze pozycje cennika są
 * wyższe i kafel ma pokazać „od 1490 zł". Przy tym ustawieniu
 * `components/uslugi/RamaCeny.tsx` dokleja pod kartą zdanie „To widełki
 * startowe... Dokładną cenę poznasz na bezpłatnej diagnozie". Kontrola zgłosiła
 * to jako sprzeczność z płatnym Sprintem Diagnostycznym.
 * USTALENIE WŁAŚCICIELA 2026-08-31: bezpłatna rozmowa ZAWSZE jest pierwsza,
 * także przed płatnym audytem. Zdanie „Dokładną cenę poznasz na bezpłatnej
 * diagnozie" jest więc PRAWDZIWE i nie jest błędem. Nic tu nie zmieniamy.
 * `cenaStala: true` nadal NIE jest opcją: kwota 1490 nie jest ceną całości
 * (przebudowa treści od 1590 zł netto).
 */
export const chatgpt: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'chatgpt',
  dataAktualizacji: '2026-08-31',

  /* H1 1:1 z pakietu §P2. */
  h1: 'Jak sprawić, żeby ChatGPT polecał Twoją firmę',

  /* KAPSUŁA 1:1 Z PAKIETU §P2 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w takiej formie,
     w jakiej zostało zatwierdzone. */
  kapsula:
    'Pozycjonowanie w ChatGPT polega na tym, żeby model miał z Twojej strony co zacytować, i żeby w ogóle mógł ją przeczytać. Robimy trzy rzeczy: przepisujemy treść na zamknięte odpowiedzi na pytania klienta, układamy spójną encję firmy i sprawdzamy, czy GPTBot nie jest zablokowany w robots.txt. U Lenart Motors ChatGPT zaczął wskazywać firmę na pytanie o najlepszego blacharza i lakiernika premium około trzy tygodnie po publikacji nowej strony.',

  /* metaTitle: decyzja właściciela z 2026-08-31 (50-60 znaków) jest ważniejsza
     niż 24-znakowa propozycja z pakietu. Fraza główna „pozycjonowanie
     w ChatGPT" zostaje NA POCZĄTKU, a wyróżnik to trzy rzeczy, które ta strona
     opisuje w kapsule, w krokach i w tabeli. Layout dokleja sufiks marki. */
  metaTitle: 'Pozycjonowanie w ChatGPT: treść, encja firmy i GPTBot',
  metaDescription:
    'Pozycjonowanie w ChatGPT: przepisujemy treść na zamknięte odpowiedzi, układamy encję firmy i sprawdzamy dostęp GPTBot. Sprint Diagnostyczny 1490 zł netto.',

  problem: {
    /* H2 1:1 z pakietu §P2 sekcja 1. */
    h2: 'Zapytałeś ChatGPT o swoją branżę i wypadła konkurencja?',
    tresc:
      'Otwierasz ChatGPT, pytasz o firmę z własnej branży i słyszysz nazwy konkurentów. Miejsca w tej odpowiedzi nie kupisz: model wymienia to, o czym przeczytał i co da się zacytować.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Skąd ChatGPT bierze wiedzę o firmach?',
        ikona: 'lupa-wykres',
        chip: 'CHATGPT',
        overline: 'PAMIĘĆ MODELU KONTRA WYSZUKIWANIE W SIECI',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Pamięć modelu',
            akapity: [
              'To, co model przeczytał wcześniej. Treści pobiera dla OpenAI robot GPTBot, więc jeśli nie ma wstępu na Twoją stronę, nie ma czego zapamiętać.',
            ],
            punkty: [
              'o wstępie decyduje plik robots.txt',
              'blokada wycina Cię, zanim zacznie się jakakolwiek walka o odpowiedź',
            ],
          },
          {
            naglowek: 'Wyszukiwanie w sieci',
            akapity: [
              'Model sięga po treść w trakcie rozmowy i pokazuje źródło, z którego wziął odpowiedź. Dlatego przy sprawdzaniu notuje się nie tylko nazwę firmy, ale i zacytowane źródło.',
            ],
            punkty: [
              'liczy się zdanie, które da się zacytować',
              'zacytowane źródło mówi, skąd model wziął tę odpowiedź',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst:
          'Obie drogi prowadzą przez to samo: musi istnieć zdanie o Twojej firmie, które da się zacytować, i musi być do niego wstęp. Brakuje jednego z dwóch i ChatGPT wymienia kogoś innego.',
      },
      {
        typ: 'naglowek',
        tekst: 'Jakie pytania wkleić do ChatGPT, żeby sprawdzić to samemu?',
        ikona: 'radar',
        chip: 'TEST',
        overline: 'GOTOWE DO WKLEJENIA · ZRÓB TO PRZED ZAMÓWIENIEM',
      },
      {
        typ: 'akapit',
        tekst:
          'Podstaw swoją usługę, swoje miasto i swoją nazwę w miejsce nawiasów. To są pytania klienta, a nie hasła, którymi opisujesz się w ofercie.',
      },
      {
        typ: 'lista',
        punkty: [
          'Kogo polecasz na [Twoja usługa] w [Twoje miasto]?',
          'Do kogo pójść z [konkretna sprawa Twojego klienta] w [Twoje miasto]?',
          'Wymień trzy firmy od [Twoja usługa] w [Twoje miasto] i powiedz, czym się różnią.',
          'Szukam kogoś, kto [problem klienta jego własnymi słowami]. Kogo polecasz?',
          'Czy znasz firmę [Twoja nazwa]? Czym się zajmuje?',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Jak pytać, żeby wynik był miarodajny?',
        akapity: [
          'Odpowiedź z Twojego zalogowanego konta nie mówi nic o tym, co słyszy klient. Dlatego pytanie zadaje się tak samo za każdym razem.',
        ],
        punkty: [
          'Nowe okno, bez historii rozmów i bez zalogowanego konta.',
          'Pytanie zadane tak, jak zadałby je klient, a nie tak, jak opisujesz się w ofercie.',
          'Zanotuj trzy rzeczy: czy Twoja nazwa pada, na którym miejscu i jakie źródło zostało zacytowane.',
          'Powtórz ten sam zestaw pytań później, bo odpowiedzi modeli zmieniają się w czasie.',
        ],
        wariant: 'edge',
        chip: 'METODA',
        stopka: [
          'Ten test robisz sam, bez naszego udziału i bez płacenia komukolwiek.',
          'Bez czystego okna nie wiesz, czy to odpowiedź o Tobie, czy o Twojej historii rozmów.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co zmieniamy na stronie, żeby ChatGPT miał co zacytować?',
    tresc:
      'Zmieniamy cztery rzeczy: odpowiedzi wprost na pytania klienta, spójną encję firmy, dane strukturalne i obecność poza własną stroną. Dopiero to razem daje modelowi zdanie, które może wyjąć i podać jako odpowiedź.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Cztery rzeczy, które musi mieć strona cytowana przez ChatGPT',
        ikona: 'wykres-strzalka',
        chip: 'GEO',
        overline: 'TREŚĆ · ENCJA · DANE STRUKTURALNE · POZA STRONĄ',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Odpowiedzi wprost',
            akapity: [
              'Przepisujemy treść na zamknięte odpowiedzi na pytania klienta. Zdanie ma być prawdziwe i kompletne samo z siebie, bo tylko takie da się zacytować bez czytania całej strony.',
            ],
          },
          {
            naglowek: 'Spójna encja firmy',
            akapity: [
              'Jedna wersja nazwy, zakresu usług i opisu firmy wszędzie tam, gdzie o Tobie napisano. Rozjazd w tych danych sprawia, że nie ma jednej, pewnej odpowiedzi na pytanie, czym jesteś.',
            ],
          },
          {
            naglowek: 'Dane strukturalne',
            akapity: [
              'Opis firmy i usług wpisany wprost w kod strony, w formie, którą maszyna czyta bez zgadywania. To ta sama praca, która liczy się w wyszukiwarce.',
            ],
          },
          {
            naglowek: 'Obecność poza własną stroną',
            akapity: [
              'Model sięga też poza Twoją stronę. Jeśli nie ma Cię w miejscach, po które sięga, nie ma skąd o Tobie przeczytać, choćby Twoja strona była napisana wzorowo.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Dlaczego blokada w robots.txt wycina Cię z gry?',
        ikona: 'tarcza-serce',
        chip: 'DOSTĘP',
        overline: 'GPTBOT I OAI-SEARCHBOT',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dwa wpisy OpenAI, które sprawdzamy w Twoim robots.txt',
        akapity: [
          'GPTBot to robot, który pobiera treści dla OpenAI, czyli dla ChatGPT. Jeśli zablokujesz go w pliku robots.txt, model nie ma jak przeczytać Twojej strony. Obok niego szukamy drugiego robota OpenAI, OAI-SearchBot.',
          'To jest praca, którą robimy najpierw, bo przy zamkniętych drzwiach każda inna zmiana na stronie jest bez znaczenia. Decyzja i tak zostaje po Twojej stronie: mówimy, co plik dziś zawiera, i co z tego wynika.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
      {
        typ: 'naglowek',
        tekst: 'Co działa w ChatGPT, a co jest tylko sprzedawane?',
        ikona: 'gwiazda-kompas',
        chip: 'UCZCIWIE',
        overline: 'DZIAŁA · NIC NIE ZMIENIA · BEZ POTWIERDZENIA',
      },
      {
        typ: 'tabela',
        naglowki: ['Zabieg', 'Co realnie zmienia', 'Nasza ocena'],
        wiersze: [
          [
            'Zamknięte odpowiedzi na pytania klienta',
            'Model ma z czego wyjąć gotowe zdanie',
            'Działa',
          ],
          ['Spójna encja firmy', 'Wszędzie ta sama nazwa, zakres i opis', 'Działa'],
          ['Dane strukturalne', 'Maszyna czyta, co jest firmą, a co usługą', 'Działa'],
          ['Obecność poza własną stroną', 'Jesteś w miejscach, po które model sięga', 'Działa'],
          [
            'Wpuszczenie GPTBot w robots.txt',
            'Bez tego model nie ma jak przeczytać strony',
            'Warunek wstępny',
          ],
          [
            'Przepisana treść przy zablokowanym bocie',
            'Model i tak nie wchodzi na stronę',
            'Nic nie zmienia',
          ],
          [
            'Sprawdzanie wyniku na swoim koncie, z historią',
            'Nie wiesz, czy odpowiedź jest o Tobie, czy o Twojej historii',
            'Nic nie zmienia',
          ],
          [
            'Kupienie miejsca w odpowiedzi',
            'Nie ma tam płatnych pozycji, jakie znasz z reklam',
            'Nie istnieje',
          ],
          [
            'Gwarancja pierwszego miejsca w ChatGPT',
            'Odpowiedzi modeli zmieniają się w czasie',
            'Sprzedawane bez potwierdzenia',
          ],
          [
            'Termin, po którym ChatGPT ma Cię wskazać',
            'Mamy jeden zmierzony przypadek, a nie termin',
            'Sprzedawane bez potwierdzenia',
          ],
        ],
        wKarcie: true,
        podpis:
          'Co działa w pozycjonowaniu w ChatGPT, co niczego nie zmienia, a co jest sprzedawane bez potwierdzenia.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Ile czekał Lenart Motors na wskazanie w ChatGPT?',
        akapity: [
          'Około trzy tygodnie od publikacji nowej strony. Tyle minęło, zanim ChatGPT zaczął wskazywać ten warsztat na pytanie o najlepszego blacharza i lakiernika premium.',
          'To jeden zmierzony przypadek, nie gwarantowany termin. Była to prosta branża z małą konkurencją o to jedno pytanie, więc nie obiecujemy tego samego każdemu.',
        ],
        wariant: 'top',
        chip: 'DOWÓD',
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: cecha ~12 znaków, kolumny ~30),
     żeby wiersze nie łamały się na dwie linie na wąskich ekranach.
     Tabela pokazuje STAN STRONY przed pracą i po niej, więc nie powiela
     tabeli rodzica („Klasyczne SEO a pozycjonowanie pod AI"), która porównuje
     dwa kanały, ani tabeli werdyktów wyżej, która ocenia zabiegi. */
  tabelaPorownawcza: {
    h2: 'Strona, której ChatGPT nie cytuje, a strona, którą cytuje',
    naglowekBez: 'Strona jak dziś',
    naglowekZNami: 'Strona pod cytowanie w ChatGPT',
    wiersze: [
      {
        cecha: 'Odpowiedź',
        bez: 'Brak zdania do zacytowania',
        zNami: 'Zamknięta odpowiedź na pytanie klienta',
      },
      {
        cecha: 'Nazwa i opis',
        bez: 'Każde miejsce mówi trochę inaczej',
        zNami: 'Jedna spójna encja firmy',
      },
      {
        cecha: 'Dane strukturalne',
        bez: 'Nie ma albo są szczątkowe',
        zNami: 'Firma i usługi opisane w kodzie',
      },
      {
        cecha: 'Dostęp bota',
        bez: 'GPTBot bywa zablokowany',
        zNami: 'Wpisy OpenAI sprawdzone w robots.txt',
      },
      {
        cecha: 'Poza stroną',
        bez: 'Model nie ma gdzie o Tobie przeczytać',
        zNami: 'Jesteś tam, gdzie model sięga',
      },
      {
        cecha: 'Twoje SEO',
        bez: 'Nic z tej pracy nie wynika',
        zNami: 'Ta sama praca liczy się w obu kanałach',
      },
    ],
  },

  /* Kolejność prac, a nie etapy usługi (te opisuje rodzic). Dostęp idzie
     pierwszy, bo przy zablokowanym bocie reszta pracy nic nie zmienia:
     to wprost wynika z FAQ „Co to jest GPTBot" w pakiecie §P2. */
  kroki: {
    h2: 'Od czego zaczynamy pracę pod ChatGPT?',
    items: [
      {
        tytul: 'Najpierw dostęp',
        opis: 'Czytamy Twój plik robots.txt i sprawdzamy wpisy OpenAI: GPTBot oraz OAI-SearchBot. Przy blokadzie model nie ma jak przeczytać strony, więc żadna zmiana treści nic nie da.',
      },
      {
        tytul: 'Potem treść i encja',
        opis: 'Przepisujemy kluczowe strony na zamknięte odpowiedzi na pytania klienta, porządkujemy encję firmy i dokładamy dane strukturalne. To ta część, którą model cytuje.',
      },
      {
        tytul: 'Na końcu obecność poza stroną',
        opis: 'Dokładamy miejsca poza Twoją stroną, po które model sięga. Ten krok idzie ostatni, bo ma sens dopiero wtedy, gdy jest już co cytować.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile trwa i ile kosztuje pozycjonowanie w ChatGPT?',
    tresc:
      'Sprint Diagnostyczny kosztuje 1490 zł netto i trwa 5 dni roboczych, a kwota jest odliczana od wdrożenia. Przebudowa treści zależy od zakresu: landing 1590 zł netto, strona biznesowa 2900 zł netto, strona zaawansowana od 5900 zł netto.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1490 zł netto',
            opis: 'Sprint Diagnostyczny, odliczany od wdrożenia',
            zrodlo: 'pytanie „Ile to kosztuje" w FAQ',
            ton: 'cyan',
          },
          {
            wartosc: '5 dni roboczych',
            opis: 'tyle trwa Sprint Diagnostyczny',
            zrodlo: 'pytanie „Ile to kosztuje" w FAQ',
            ton: 'violet',
          },
          {
            wartosc: '1590 zł netto',
            opis: 'przebudowa treści landingu, 1 dzień',
            zrodlo: 'zakresy przebudowy w przełączniku niżej',
            ton: 'green',
          },
          {
            wartosc: 'od 5900 zł netto',
            opis: 'strona zaawansowana, 5-10 dni',
            zrodlo: 'zakresy przebudowy w przełączniku niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Za co płacisz przy pozycjonowaniu w ChatGPT?',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'DIAGNOZA · PRZEBUDOWA TREŚCI',
      },
      {
        typ: 'przelacznik',
        grupa: 'chatgpt-cena',
        opcje: [
          {
            numer: 'KROK 1',
            tytul: 'Sprint Diagnostyczny',
            podtytul: '1490 zł netto, 5 dni roboczych',
            naglowek:
              'Zaczynamy od diagnozy: 1490 zł netto, 5 dni roboczych, kwota odliczana od wdrożenia.',
            akapity: [
              'Najpierw sprawdzamy, czy ChatGPT wskazuje Twoją firmę i czy w ogóle ma jak przeczytać Twoją stronę. Bez tego przebudowa treści byłaby zgadywaniem.',
            ],
            punkty: [
              '1490 zł netto, płatne raz',
              '5 dni roboczych',
              'kwota odliczana od wdrożenia, gdy robimy je my',
            ],
          },
          {
            numer: 'KROK 2',
            tytul: 'Przebudowa treści',
            podtytul: 'od 1590 zł netto',
            naglowek: 'Cena przebudowy treści zależy od zakresu strony.',
            akapity: [
              'Przepisujemy treść na zamknięte odpowiedzi, porządkujemy encję firmy i dane strukturalne. Zakres ustalamy przed startem, więc kwotę znasz, zanim zaczniemy.',
            ],
            punkty: [
              'landing: 1590 zł netto, 1 dzień',
              'strona biznesowa: 2900 zł netto, 2-4 dni',
              'strona zaawansowana: od 5900 zł netto, 5-10 dni',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy to nie zadziała?',
        akapity: [
          'Wolimy stracić zlecenie niż wziąć pieniądze za pracę, która u Ciebie niczego nie zmieni. Mówimy to przed zamówieniem, nie po.',
        ],
        punkty: [
          'Blokujesz roboty AI i nie chcesz tego zmieniać: model nie ma jak przeczytać Twojej strony, więc reszta pracy nic nie da.',
          'Chcesz kupić miejsce w odpowiedzi: nie ma tam płatnych pozycji, jakie znasz z reklam w wyszukiwarce.',
          'Potrzebujesz gwarancji pierwszego miejsca w ChatGPT: nie damy jej, bo nikt uczciwy jej nie da.',
          'Masz termin, w którym efekt ma być pewny: nie ma gwarantowanego terminu, mamy jeden zmierzony przypadek.',
          'Twoje jedno pytanie jest oblegane przez dużą konkurencję: nasz zmierzony przypadek to prosta branża z małą konkurencją o to pytanie.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz siebie w którymś z tych punktów? Napisz i tak.',
          'Powiemy, co zrobić zamiast, nawet jeśli to nie będzie usługa u nas.',
        ],
      },
    ],
    minPrice: 1490,
    /* Powrót do rodzica jednym zdaniem (uwaga wdrożeniowa §3: każda podstrona
       linkuje w powiązaniach z powrotem do rodzica; tu dodatkowo w treści,
       bo ta strona kończy się jednym modelem, a rodzic opisuje wszystkie). */
    linkPoradnik: {
      przed: 'Pozostałe silniki AI i pomiar cytowań w rytmie opisaliśmy na stronie ',
      etykieta: 'pozycjonowanie pod AI',
      po: '.',
      href: '/uslugi/optymalizacja',
    },
  },

  /* KOMPLET 8 PYTAŃ 1:1 Z PAKIETU §P2 („GOTOWE FAQ"). Kolejność, pytania
     i odpowiedzi bez zmian: ten sam tekst idzie na stronę i do FAQPage JSON-LD,
     więc każda edycja tutaj rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Jak sprawdzić, czy ChatGPT poleca moją firmę?',
      odpowiedz:
        'Otwórz nowe okno, bez historii i bez zalogowanego konta, i zadaj pytanie tak, jak zadałby je klient. Zanotuj, czy Twoja nazwa pada, na którym miejscu i jakie źródło zostało zacytowane.',
    },
    {
      pytanie: 'Dlaczego ChatGPT nie zna mojej firmy?',
      odpowiedz:
        'Bo nie ma źródła, z którego mógłby o Tobie opowiedzieć. Albo Twoja strona nie zawiera zdań nadających się do zacytowania, albo boty AI nie mają na nią wstępu, albo nie ma Cię w miejscach, po które model sięga.',
    },
    {
      pytanie: 'Ile trwa, zanim ChatGPT zacznie wskazywać moją firmę?',
      odpowiedz:
        'Nie ma gwarantowanego terminu. Mamy jeden zmierzony przypadek: Lenart Motors, około trzy tygodnie od publikacji nowej strony. To była prosta branża z małą konkurencją o to jedno pytanie.',
    },
    {
      pytanie: 'Czy da się kupić miejsce w odpowiedzi ChatGPT?',
      odpowiedz:
        'Nie. Nie ma tam płatnych pozycji, jakie znasz z reklam w wyszukiwarce. Model wymienia to, o czym przeczytał i co da się zacytować.',
    },
    {
      pytanie: 'Co to jest GPTBot?',
      odpowiedz:
        'To robot, który pobiera treści dla OpenAI, czyli dla ChatGPT. Jeśli zablokujesz go w pliku robots.txt, model nie ma jak przeczytać Twojej strony.',
    },
    {
      pytanie: 'Ile to kosztuje?',
      odpowiedz:
        'Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych, odliczany od wdrożenia. Przebudowa treści zależy od zakresu: landing 1590 zł netto, strona biznesowa 2900 zł netto, zaawansowana od 5900 zł netto.',
    },
    {
      pytanie: 'Czy to nie zaszkodzi mojemu SEO?',
      odpowiedz:
        'Nie. Zamknięte akapity, jasne odpowiedzi i dane strukturalne to dokładnie to, co lubi też wyszukiwarka. Ta sama praca liczy się w obu kanałach.',
    },
    {
      pytanie: 'Czy dacie gwarancję pierwszego miejsca w ChatGPT?',
      odpowiedz:
        'Nie i nikt uczciwy nie da. Odpowiedzi modeli zmieniają się w czasie. Gwarantujemy wykonanie prac i pokazujemy pomiar przed i po, na tych samych pytaniach.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P2 punkt 12). Mikrokopia powtarza
     komplet warunków, bo to ostatnie zdanie przed kliknięciem, a dowód mówi
     wprost, czego NIE gwarantujemy. */
  cta: {
    label: 'Chcę być wskazywany w ChatGPT',
    href: '#diagnoza',
    mikrokopia:
      'Zaczynamy od Sprintu Diagnostycznego: 1490 zł netto, 5 dni roboczych, kwota odliczana od wdrożenia. Przebudowa treści dopiero po diagnozie i według zakresu.',
    dowod:
      'Gwarantujemy wykonanie prac i pomiar przed i po, na tych samych pytaniach. Miejsca w odpowiedzi ChatGPT nie gwarantuje nikt uczciwy.',
  },

  queries: [
    'pozycjonowanie w ChatGPT',
    'jak sprawić, żeby ChatGPT polecał moją firmę',
    'dlaczego ChatGPT nie zna mojej firmy',
    'optymalizacja strony pod ChatGPT',
    'GPTBot robots.txt',
    'czy da się kupić miejsce w odpowiedzi ChatGPT',
  ],

  /* POWIĄZANIA (pakiet §P2 sekcja 10 plus uwaga wdrożeniowa §3: każda podstrona
     linkuje z powrotem do rodzica). RUNDA 2026-08-31: cztery zaplanowane cele
     stoją komplet. AI Overviews (P3), Perplexity (P4) i dostęp botów AI (P6)
     były odłożone, bo ich trasy nie były w rejestrze podstron; dziś wszystkie
     osiem podstron gałęzi zwraca 200, więc linki są dopisane.
     Etykieta = h1 strony docelowej, opis = fakt, który stoi na tamtej stronie.
     ZERO KWOT w tych opisach (uwaga wdrożeniowa §6: kwoty wyłącznie w sekcji
     ceny); kontrola wycięła stąd „1490 zł netto" przy audycie. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Strona macierzysta: pozostałe silniki AI, autorytet poza stroną i pomiar cytowań w rytmie.',
      },
      {
        etykieta: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',
        href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
        opis: 'Sprint Diagnostyczny: płatna diagnoza siedmiu punktów, która kończy się raportem PDF z pomiarem zerowym.',
      },
      {
        etykieta: 'Jak trafić do odpowiedzi AI w Google (AI Overviews)',
        href: '/uslugi/optymalizacja/google-ai-overviews',
        opis: 'Drugi ekosystem: żeby wejść do podsumowania AI nad wynikami, potrzebujesz mocnej pozycji organicznej i treści, z której da się wyciąć gotowe zdanie.',
      },
      {
        etykieta: 'Widoczność w Perplexity: jak być źródłem, a nie tłem',
        href: '/uslugi/optymalizacja/perplexity',
        opis: 'Jedyny popularny asystent, który pokazuje listę źródeł przy każdej odpowiedzi, więc efekt pracy widzisz od razu.',
      },
      {
        etykieta: 'GPTBot, ClaudeBot, PerplexityBot: czy Twoja strona ich wpuszcza?',
        href: '/uslugi/optymalizacja/dostep-botow-ai',
        opis: 'Cała instrukcja do robots.txt: cztery nazwy do sprawdzenia i co tracisz w każdym wariancie decyzji.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis: 'Lenart Motors: około trzy tygodnie od wrzucenia strony do sieci do wskazania firmy przez ChatGPT.',
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
