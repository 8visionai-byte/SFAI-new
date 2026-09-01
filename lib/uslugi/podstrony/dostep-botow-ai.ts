import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 2 — DOSTĘP BOTÓW AI
 * (`/uslugi/optymalizacja/dostep-botow-ai`).
 * Fraza primary: „czy blokować boty AI w robots.txt" (pakiet
 * `.seo-przeglad/pakiety/geo.md` §P6, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja` i siostry `audyt-widocznosci-w-ai`):
 *  - RODZIC sprzedaje CAŁY proces: naprawa treści, encja firmy, autorytet poza
 *    stroną i pomiar w rytmie. Dostęp botów jest tam jednym zdaniem etapu 1.
 *  - SIOSTRA (audyt widoczności w AI) sprzedaje PŁATNY POMIAR: co sprawdzamy,
 *    ile kosztuje, co dostajesz w raporcie.
 *  - TA STRONA jest jedyną czysto techniczną w gałęzi i ma JEDNĄ czynność:
 *    otworzyć własny robots.txt, zrozumieć, co w nim stoi, i podjąć jedną
 *    decyzję (wpuszczam, wpuszczam częściowo, blokuję). Nic więcej.
 *  - NIE MA TU I BYĆ NIE MOŻE: przepisywania treści pod cytat, encji firmy,
 *    autorytetu poza stroną (rodzic), metody pomiaru cytowań ani zawartości
 *    raportu (siostra). Żaden akapit tej strony nie mógłby stanąć u rodzica.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła oraz komplet 8 pytań FAQ: pakiet §P6, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami),
 *  - H1 i H2 sekcji problemu: pakiet §P6 (podane wprost),
 *  - lista botów z nazwy: pakiet §P6 sekcja 2 (GPTBot, OAI-SearchBot,
 *    ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot),
 *  - co robi GPTBot, ClaudeBot, PerplexityBot i Google-Extended: pakiet §N4
 *    plus kapsuła §P6; rozdzielenie Google-Extended (modele Gemini) od pozycji
 *    w wynikach wyszukiwania (Googlebot): pakiet §P6 FAQ,
 *  - różnica GPTBot a ChatGPT-User: pakiet §P6 FAQ (dosłownie),
 *  - trzy kroki sprawdzenia pliku: pakiet §P6 sekcja 3 plus FAQ „Jak sprawdzić,
 *    czy blokuję GPTBot",
 *  - trzy warianty decyzji i skutek każdego: pakiet §P6 sekcja 4 plus FAQ 1,
 *  - blokady poza plikiem (Cloudflare, ochrona przed botami, strona
 *    renderowana wyłącznie JavaScriptem): pakiet §P6 sekcja 6 plus FAQ,
 *  - kiedy blokada jest uzasadniona (treści płatne, dane klientów, materiały
 *    licencjonowane): pakiet §P6 sekcja 8,
 *  - „wpuszczenie botów AI nie obniża pozycji w Google": kapsuła §P6 i FAQ,
 *  - GPTBot jako robot OpenAI: uwaga wdrożeniowa §7 pakietu (nazywamy go
 *    poprawnie, bo to jego rola).
 *
 * OPISY BEZ ŹRÓDŁA W PAKIECIE (dlatego są maksymalnie wąskie):
 *  - OAI-SearchBot: pakiet wymienia tę nazwę (sekcja 2 i nagłówek §P4 „Dostęp
 *    dla GPTBot i OAI-SearchBot"), ale NIE opisuje jej roli. Strona mówi więc
 *    tylko tyle, ile wolno: to druga nazwa OpenAI w tym samym pliku, ustawiana
 *    osobno. Zero wymyślonej funkcji.
 *  - Bingbot: pakiet podaje samą nazwę. Strona mówi, że to robot wyszukiwarki
 *    Bing (to znaczenie samej nazwy) i że ginie razem z resztą przy blokadzie
 *    ogólnej (skutek opisany w kapsule). Zero wymyślonej funkcji.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  cztery nazwy botów AI (kapsuła §P6), siedem robotów wymienionych z nazwy
 *  (policzona lista z sekcji 2, stoi w całości na tej stronie), trzy warianty
 *  decyzji (sekcja 4), trzy kroki sprawdzenia (sekcja 3), trzy sytuacje
 *  uzasadniające blokadę (sekcja 8).
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje ANI JEDNEJ kwoty dla tej
 *  podstrony (uwaga wdrożeniowa §6: kwoty tylko w punkcie 8 podstron, a punkt 8
 *  §P6 to „kiedy blokada jest uzasadniona", nie cennik). Dlatego `minPrice`
 *  zostaje pusty, a cena i czas Sprintu Diagnostycznego stoją WYŁĄCZNIE na
 *  stronie siostry, dokąd prowadzi link w ramie ceny. Zero czasu sprawdzenia
 *  w minutach, zero liczby stron, zero procentów.
 *
 * ZAKAZANE NA TEJ STRONIE: jakakolwiek kwota, obietnica pozycji w odpowiedzi
 * modelu po odblokowaniu bota, mylenie Google-Extended z podsumowaniami AI
 * w wyszukiwarce, sugerowanie, że wstęp bota to zgoda na trenowanie modeli
 * (pakiet §P6 FAQ 8 mówi wprost, że to dwie osobne decyzje).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO)
 * i renderuje się TYMI SAMYMI komponentami co reszta usług. Zero nowych typów
 * bloków, zero nowego CSS.
 *
 * KONTROLA 2026-08-31 (przegląd adwersaryjny, trzy poprawki w treści):
 *  1. lead sekcji problemu mówił, że model „wymieni firmę, która go wpuściła".
 *     To obietnica cytowania po odblokowaniu bota, czyli dokładnie to, czego
 *     zakazuje akapit ZAKAZANE wyżej. Zdanie zostało sprowadzone do faktu
 *     z FAQ 1: bez wstępu model nie ma z czego zbudować odpowiedzi o Twojej
 *     firmie, więc jej nie wymieni. Zero obietnicy w drugą stronę.
 *  2. głowa sekcji brzmiała „trzy różne zachowania", a karta OAI-SearchBot
 *     świadomie NIE opisuje żadnego zachowania (pakiet nie podaje jego roli).
 *     Nagłówek mówi teraz to, co karty faktycznie niosą: każdą z trzech nazw
 *     ustawia się osobno (FAQ 4 plus obie karty).
 *  3. karta Bingbota klasyfikowała go zdaniem „nie jest botem AI". Pakiet
 *     podaje samą nazwę, więc klasyfikacja była nasza. Zostaje fakt ze
 *     strony: nie ma go wśród czterech nazw z kapsuły, a przy blokadzie
 *     ogólnej ginie razem z resztą.
 *
 * LINKI: wchodzą wyłącznie trasy, które dziś istnieją w rejestrach, czyli
 * rodzic `/uslugi/optymalizacja`, siostry `/uslugi/optymalizacja/audyt-widocznosci-w-ai`
 * oraz `/uslugi/optymalizacja/llms-txt` i kotwica narzędzia
 * `/narzedzia#audyt-strony-ai`. Link do podstrony llms.txt (pakiet §P6
 * sekcja 9) był odłożony, dopóki tamta trasa nie istniała; od rundy
 * 2026-08-31 stoi ona w rejestrze, więc link jest dopisany.
 */
export const dostepBotowAi: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'dostep-botow-ai',
  dataAktualizacji: '2026-08-31',

  /* H1 1:1 z pakietu §P6. */
  h1: 'GPTBot, ClaudeBot, PerplexityBot: czy Twoja strona ich wpuszcza?',

  /* KAPSUŁA 1:1 Z PAKIETU §P6 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w takiej formie,
     w jakiej zostało zatwierdzone. Niesie komplet strony: co robi plik,
     które cztery nazwy sprawdzić, gdzie jest pułapka z gwiazdką i że
     wpuszczenie botów nie rusza pozycji w Google. */
  kapsula:
    'Plik robots.txt decyduje, które roboty mogą przeczytać Twoją stronę. Cztery nazwy, które warto w nim znaleźć, to GPTBot (ChatGPT), ClaudeBot (Claude), PerplexityBot (Perplexity) i Google-Extended (modele Gemini). Najpierw sprawdź wpis User-agent z gwiazdką: jeśli stoi pod nim Disallow ze znakiem ukośnika, blokada obejmuje wszystkie roboty, także te cztery, nawet gdy nie ma ich w pliku z nazwy. Wpuszczenie botów AI nie obniża Twoich pozycji w wynikach wyszukiwania Google.',

  /* metaTitle: pakiet §P6 dawał 31 znaków, konwencja repo (types.ts) i decyzja
     właściciela z 2026-08-31 mówią 50-60. Fraza z pakietu zostaje NA POCZĄTKU
     bez zmian, wyróżnik to wyłącznie decyzja, którą ta strona domyka
     (warianty „wpuścić" i „zablokować" z tabeli decyzyjnej §P6 sekcja 4).
     Długość 55 znaków. Layout dokleja sufiks marki. */
  metaTitle: 'GPTBot i ClaudeBot w robots.txt: wpuszczać czy blokować',
  metaDescription:
    'GPTBot, ClaudeBot, PerplexityBot i Google-Extended: sprawdź, czy Twój robots.txt je wpuszcza. Wpuszczenie botów AI nie obniża Twoich pozycji w Google.',

  problem: {
    /* H2 1:1 z pakietu §P6 sekcja 1. */
    h2: 'Sprzedajesz, a robots.txt kasuje Cię z odpowiedzi AI?',
    tresc:
      'Jeden plik tekstowy decyduje, czy model w ogóle może przeczytać Twoją ofertę. Jeśli robot nie ma wstępu, model nie ma z czego zbudować odpowiedzi o Twojej firmie, więc jej nie wymieni.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Plik leży pod adresem swojastrona.pl/robots.txt i najczęściej nikt do niego nie zaglądał od dnia, w którym powstała strona. Bywa, że blokada została z czasu budowy i nikt jej potem nie zdjął.',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '4 nazwy',
            opis: 'tyle nazw botów AI warto znaleźć w pliku: GPTBot, ClaudeBot, PerplexityBot i Google-Extended',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: 'Disallow: /',
            opis: 'ten wpis pod User-agent z gwiazdką blokuje wszystkie roboty naraz, także te cztery',
            zrodlo: 'kapsuła na górze strony',
            ton: 'violet',
          },
          {
            wartosc: 'Google bez zmian',
            opis: 'wpuszczenie botów AI nie obniża Twoich pozycji w wynikach wyszukiwania Google',
            zrodlo: 'kapsuła na górze strony',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Trzy nazwy od OpenAI, każdą ustawiasz osobno',
        ikona: 'robot',
        chip: 'BOTY AI',
        overline: 'LISTA Z NAZWY · CZĘŚĆ 1',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'GPTBot',
            akapity: [
              'Robot OpenAI. Pobiera treści na potrzeby modelu, czyli dla ChatGPT. To pierwsza nazwa, której warto poszukać w swoim pliku.',
            ],
          },
          {
            naglowek: 'OAI-SearchBot',
            akapity: [
              'Druga nazwa OpenAI w tym samym pliku. Ustawia się ją osobno, więc wpis dla GPTBot nie przesądza o niej.',
            ],
          },
          {
            naglowek: 'ChatGPT-User',
            akapity: [
              'Wchodzi na stronę wtedy, gdy użytkownik w rozmowie poprosi o sprawdzenie konkretnego adresu. To inne zachowanie niż GPTBot i też ustawia się je osobno.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Cztery kolejne roboty w tym samym pliku',
        ikona: 'glob-siatka',
        chip: 'BOTY AI',
        overline: 'LISTA Z NAZWY · CZĘŚĆ 2',
      },
      {
        typ: 'siatka',
        kolumny: 4,
        karty: [
          {
            naglowek: 'ClaudeBot',
            akapity: ['Robot Anthropic. Pobiera treści dla Claude.'],
          },
          {
            naglowek: 'PerplexityBot',
            akapity: ['Pobiera treści dla wyszukiwarki Perplexity.'],
          },
          {
            naglowek: 'Google-Extended',
            akapity: [
              'Decyduje o zasilaniu modeli Gemini. Nie decyduje o Twoich pozycjach w wynikach wyszukiwania, bo tam liczy się Googlebot.',
            ],
          },
          {
            naglowek: 'Bingbot',
            akapity: [
              'Robot wyszukiwarki Bing. Nie ma go wśród czterech nazw z kapsuły, ale stoi w tym samym pliku i ginie razem z resztą, gdy pod wpisem z gwiazdką stoi pełna blokada.',
            ],
          },
        ],
      },
    ],
  },

  rozwiazanie: {
    /* H2 = fraza główna postawiona jako pytanie, odpowiedź w pierwszym zdaniu
       leadu (answer-first). Treść leadu 1:1 z FAQ 1 pakietu §P6. */
    h2: 'Czy blokować boty AI w robots.txt?',
    tresc:
      'W większości przypadków nie. Blokada oznacza, że modele nie mają jak przeczytać Twojej oferty, więc nie wymienią Cię w odpowiedzi. Blokadę ma sens rozważyć przy treściach płatnych i materiałach licencjonowanych.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Wpuścić, wpuścić częściowo czy zablokować?',
        ikona: 'puzzle',
        chip: 'DECYZJA',
        overline: 'TRZY WARIANTY · SKUTEK KAŻDEGO',
      },
      {
        typ: 'tabela',
        naglowki: ['Wariant', 'Co stoi w robots.txt', 'Co tracisz'],
        wiersze: [
          [
            'Wpuszczasz',
            'Brak blokady dla czterech nazw botów AI',
            'Nic w wynikach Google. Zgoda na trenowanie modeli to osobna decyzja i osobny wpis',
          ],
          [
            'Wpuszczasz częściowo',
            'Blokada wybranych ścieżek, reszta strony otwarta',
            'Model nie zacytuje tego, co zamkniesz, więc zamykaj wyłącznie to, co ma być zamknięte',
          ],
          [
            'Blokujesz',
            'Disallow ze znakiem ukośnika przy nazwach botów AI',
            'Modele nie mają jak przeczytać Twojej oferty, więc nie wymienią Cię w odpowiedzi',
          ],
        ],
        wKarcie: true,
        podpis: 'Trzy warianty dostępu botów AI i skutek każdego z nich',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy wpuszczenie botów AI zaszkodzi mojej pozycji w Google?',
        akapity: [
          'Nie. To osobne ustawienia. Google-Extended dotyczy modeli Gemini, a Twoje pozycje w wynikach wyszukiwania zależą od Googlebota.',
          'Wpuszczenie botów AI nie obniża Twoich pozycji w wynikach wyszukiwania Google. Jeśli ktoś twierdzi inaczej, poproś go o wskazanie wpisu, który miałby to robić.',
        ],
        wariant: 'edge',
        chip: 'GEO',
      },
      {
        typ: 'naglowek',
        tekst: 'Co blokuje boty AI poza plikiem robots.txt?',
        ikona: 'tarcza-serce',
        chip: 'BLOKADY',
        overline: 'TRZY MIEJSCA POZA PLIKIEM',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Cloudflare',
            akapity: [
              'Cloudflare potrafi blokować roboty AI zanim w ogóle dotrą do robots.txt. Wtedy poprawa samego pliku nic nie da i trzeba sprawdzić ustawienia po stronie Cloudflare.',
            ],
          },
          {
            naglowek: 'Ochrona przed botami',
            akapity: [
              'Zabezpieczenia przed botami działają przed plikiem, nie po nim. Jeśli takie ustawienie odrzuca robota, wpis Allow w robots.txt niczego nie zmieni.',
            ],
          },
          {
            naglowek: 'Strona w JavaScripcie',
            akapity: [
              'Jeśli treść pojawia się dopiero po uruchomieniu skryptów, część robotów zobaczy pustą stronę. Plik może być wtedy w porządku, a i tak nie ma czego zacytować.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Gotowe wpisy do wklejenia',
        ikona: 'folder-kod',
        chip: 'WZÓR',
        overline: 'NAZWA W JEDNYM WIERSZU · DECYZJA W DRUGIM',
      },
      {
        typ: 'tabela',
        naglowki: ['Nazwa bota', 'Wpuszczasz', 'Blokujesz'],
        wiersze: [
          [
            'GPTBot',
            'User-agent: GPTBot, w wierszu niżej Allow: /',
            'User-agent: GPTBot, w wierszu niżej Disallow: /',
          ],
          [
            'ClaudeBot',
            'User-agent: ClaudeBot, w wierszu niżej Allow: /',
            'User-agent: ClaudeBot, w wierszu niżej Disallow: /',
          ],
          [
            'PerplexityBot',
            'User-agent: PerplexityBot, w wierszu niżej Allow: /',
            'User-agent: PerplexityBot, w wierszu niżej Disallow: /',
          ],
          [
            'Google-Extended',
            'User-agent: Google-Extended, w wierszu niżej Allow: /',
            'User-agent: Google-Extended, w wierszu niżej Disallow: /',
          ],
        ],
        wKarcie: true,
        podpis: 'Wzór wpisów do pliku robots.txt: nazwa bota w wierszu User-agent, decyzja w wierszu pod nią',
      },
      {
        typ: 'sekcja',
        naglowek: 'Trzy wiersze, które trzeba znać, zanim cokolwiek wkleisz',
        akapity: [
          'Nazwy botów to jedno, ale o wyniku decydują trzy wiersze, które w tym pliku znaczą najwięcej.',
        ],
        punkty: [
          'User-agent z gwiazdką: wiersze pod spodem dotyczą wszystkich robotów naraz.',
          'Disallow ze znakiem ukośnika: pełna blokada. Pod wpisem z gwiazdką wycina także te cztery boty AI, nawet gdy nie ma ich w pliku z nazwy.',
          'Allow ze znakiem ukośnika: wstęp na całą stronę dla bota z wiersza wyżej.',
        ],
        wariant: 'top',
        chip: 'WZÓR',
        stopka: [
          'Plik jest publiczny, więc nie wpisuj do niego ścieżek, które mają zostać tajne.',
          'Jeden blok na jednego bota: nazwa, a pod nią decyzja.',
        ],
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: cecha ~12 znaków, kolumny ~30).
     Dwa wiersze mają identyczną treść w obu kolumnach CELOWO: to jest właśnie
     odpowiedź na najczęstszą obawę, czyli że wpuszczenie botów AI rusza Google
     albo oznacza zgodę na trenowanie modeli. Nie „poprawiać" ich na różne. */
  tabelaPorownawcza: {
    h2: 'Blokujesz boty AI a wpuszczasz boty AI',
    naglowekBez: 'Blokujesz boty AI',
    naglowekZNami: 'Wpuszczasz boty AI',
    wiersze: [
      {
        cecha: 'Twoja oferta',
        bez: 'Model nie ma jej jak przeczytać',
        zNami: 'Model może ją przeczytać',
      },
      {
        cecha: 'Odpowiedź AI',
        bez: 'Nie wymieni Cię w odpowiedzi',
        zNami: 'Może wymienić Twoją firmę',
      },
      {
        cecha: 'Pozycje w Google',
        bez: 'Bez zmian',
        zNami: 'Bez zmian',
      },
      {
        cecha: 'Trenowanie modeli',
        bez: 'Osobna decyzja i osobny wpis',
        zNami: 'Osobna decyzja i osobny wpis',
      },
      {
        cecha: 'Co ustawiasz',
        bez: 'Disallow przy nazwie bota',
        zNami: 'Allow przy nazwie bota',
      },
      {
        cecha: 'Kiedy to sensowne',
        bez: 'Treści płatne i licencjonowane',
        zNami: 'Oferta i treści publiczne',
      },
    ],
  },

  /* Trzy kroki 1:1 z pakietu §P6 sekcja 3 i FAQ „Jak sprawdzić, czy blokuję
     GPTBot". KOLEJNOŚĆ JEST TU FAKTEM, NIE STYLEM: najpierw wpis z gwiazdką,
     dopiero potem nazwy. Odwrócenie tych dwóch kroków daje fałszywy wynik,
     bo brak nazwy w pliku nie znaczy nic, dopóki nie wiesz, czy nie ma
     blokady ogólnej. */
  kroki: {
    h2: 'Jak sam sprawdzisz swój plik robots.txt?',
    items: [
      {
        tytul: 'Otwórz plik',
        opis: 'Wejdź na adres swojastrona.pl/robots.txt. To zwykły plik tekstowy, otwiera się w przeglądarce jak strona i każdy może go zobaczyć.',
      },
      {
        tytul: 'Najpierw wpis z gwiazdką',
        opis: 'Poszukaj wpisu User-agent z gwiazdką i sprawdź, czy nie ma pod nim pełnej blokady. Disallow ze znakiem ukośnika obejmuje wszystkie roboty naraz, także te, których nazw w pliku nie ma.',
      },
      {
        tytul: 'Dopiero potem cztery nazwy',
        opis: 'Szukaj kolejno: GPTBot, ClaudeBot, PerplexityBot i Google-Extended. Przy każdej sprawdzasz, czy w wierszu pod nią stoi Allow, czy Disallow.',
      },
    ],
  },

  /* RAMA CENY BEZ KWOTY (świadomie): pakiet §P6 nie ma ceny za tę czynność,
     a uwaga wdrożeniowa §6 zabrania powielania kwot poza wyznaczonymi
     miejscami. `minPrice` zostaje pusty, więc karta renderuje się bez liczby,
     a cena i czas Sprintu Diagnostycznego stoją na stronie siostry, dokąd
     prowadzi `linkPoradnik`. Sekcja niesie za to punkt 8 z pakietu: kiedy
     blokada JEST uzasadniona. */
  ramaCeny: {
    h2: 'Ile kosztuje sprawdzenie, czy wpuszczasz boty AI?',
    tresc:
      'Sam plik robots.txt sprawdzisz bez nas i bez opłaty: instrukcja i wzory wpisów stoją wyżej na tej stronie. Płatny jest dopiero Sprint Diagnostyczny, w którym sprawdzamy też to, czego w pliku nie widać, czyli blokady po stronie Cloudflare i to, czy Twoja strona pokazuje treść bez uruchamiania skryptów.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Kiedy blokada botów AI jest uzasadniona?',
        ikona: 'tarcza-serce',
        chip: 'ZASADA',
        overline: 'TRZY SYTUACJE, W KTÓRYCH BLOKUJEMY ŚWIADOMIE',
      },
      {
        typ: 'sekcja',
        naglowek: 'Trzy sytuacje, w których blokada ma sens',
        akapity: [
          'Blokada nie jest błędem sama w sobie. Błędem jest blokada przypadkowa, obejmująca całą stronę razem z ofertą.',
        ],
        punkty: [
          'Treści płatne: jeśli klient płaci za dostęp do materiału, nie ma powodu oddawać go robotowi za darmo.',
          'Dane klientów: panele, dokumenty i adresy nie należą do publicznej części strony.',
          'Materiały licencjonowane: teksty i zdjęcia, na które masz licencję o określonym zakresie.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'W każdej z tych trzech sytuacji blokujesz konkretne ścieżki, a nie całą stronę.',
          'Ofertę, cennik i opisy usług zostawiamy otwarte, bo z nich model buduje odpowiedź.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Odblokowanie botów a zgoda na trenowanie modeli',
        akapity: [
          'To dwie osobne decyzje i ustawia się je osobnymi wpisami. Wstęp bota na stronę nie jest zgodą na trenowanie modelu na Twoich tekstach.',
          'Dlatego przy każdej zmianie w pliku pokazujemy obie decyzje osobno, zanim cokolwiek wdrożymy.',
        ],
        wariant: 'quiet',
        chip: 'GEO',
      },
    ],
    /* Powrót do siostry jednym zdaniem: ta strona kończy się decyzją o pliku,
       a cena i zakres płatnej diagnozy stoją na stronie audytu. */
    linkPoradnik: {
      przed: 'Cenę, czas i pełny zakres Sprintu Diagnostycznego opisaliśmy na stronie ',
      etykieta: 'audyt widoczności w AI',
      po: '.',
      href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
    },
  },

  /* KOMPLET 8 PYTAŃ 1:1 Z PAKIETU §P6 („GOTOWE FAQ"). Kolejność, pytania
     i odpowiedzi bez zmian: ten sam tekst idzie na stronę i do FAQPage JSON-LD,
     więc każda edycja tutaj rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Czy blokować boty AI w robots.txt?',
      odpowiedz:
        'W większości przypadków nie. Blokada oznacza, że modele nie mają jak przeczytać Twojej oferty, więc nie wymienią Cię w odpowiedzi. Blokadę ma sens rozważyć przy treściach płatnych i materiałach licencjonowanych.',
    },
    {
      pytanie: 'Jak sprawdzić, czy blokuję GPTBot?',
      odpowiedz:
        'Wejdź na adres swojastrona.pl/robots.txt. Najpierw poszukaj wpisu User-agent z gwiazdką i sprawdź, czy nie ma pod nim pełnej blokady. Potem poszukaj samej nazwy GPTBot.',
    },
    {
      pytanie: 'Czy brak nazwy bota w pliku oznacza, że ma wstęp?',
      odpowiedz:
        'Tylko wtedy, gdy nie ma ogólnej blokady. Wpis User-agent z gwiazdką i Disallow ze znakiem ukośnika blokuje wszystkie roboty, także te, których nazw w pliku nie ma.',
    },
    {
      pytanie: 'Czym różni się GPTBot od ChatGPT-User?',
      odpowiedz:
        'GPTBot pobiera treści na potrzeby modelu. ChatGPT-User wchodzi na stronę wtedy, gdy użytkownik w rozmowie poprosi o sprawdzenie konkretnego adresu. To dwa różne zachowania i można je ustawić osobno.',
    },
    {
      pytanie: 'Czy wpuszczenie botów AI zaszkodzi mi w Google?',
      odpowiedz:
        'Nie. To osobne ustawienia. Google-Extended dotyczy modeli Gemini, a Twoje pozycje w wynikach wyszukiwania zależą od Googlebota.',
    },
    {
      pytanie: 'Co jeśli mam Cloudflare?',
      odpowiedz:
        'Cloudflare potrafi blokować roboty AI zanim w ogóle dotrą do robots.txt. Wtedy poprawa samego pliku nic nie da i trzeba sprawdzić ustawienia po stronie Cloudflare.',
    },
    {
      pytanie: 'Czy strona w JavaScripcie jest widoczna dla botów AI?',
      odpowiedz:
        'Bywa problematyczna. Jeśli treść pojawia się dopiero po uruchomieniu skryptów, część robotów zobaczy pustą stronę. Sprawdzamy to w Sprincie Diagnostycznym.',
    },
    {
      pytanie: 'Czy odblokowanie botów to zgoda na trenowanie modeli na moich tekstach?',
      odpowiedz:
        'Nie. To dwie osobne decyzje i ustawia się je osobnymi wpisami. Pokazujemy Ci obie przed wdrożeniem.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P6 punkt 11): sprawdzimy to za
     Ciebie w Sprincie Diagnostycznym. Mikrokopia mówi, co dokłada sprint ponad
     to, co czytelnik zrobi sam, i NIE podaje kwoty (kwota stoi na stronie
     siostry, link w ramie ceny wyżej). */
  cta: {
    label: 'Zamów Sprint Diagnostyczny',
    href: '#diagnoza',
    mikrokopia:
      'Dostęp botów AI to jeden z punktów Sprintu Diagnostycznego. Sprawdzamy w nim także blokady poza plikiem i to, czy Twoja strona pokazuje treść bez uruchamiania skryptów.',
    dowod:
      'Sam plik robots.txt sprawdzisz bez nas, instrukcja stoi wyżej na tej stronie. Płacisz dopiero za to, czego w pliku nie widać.',
  },

  queries: [
    'czy blokować boty AI w robots.txt',
    'GPTBot robots.txt',
    'ClaudeBot robots.txt',
    'jak sprawdzić, czy blokuję GPTBot',
    'Google-Extended robots.txt',
    'dostęp botów AI do strony',
  ],

  /* POWIĄZANIA (pakiet §P6 sekcja 9 plus uwaga wdrożeniowa §3: każda podstrona
     linkuje z powrotem do rodzica). RUNDA 2026-08-31: komplet trzech celów
     stoi na miejscu, bo trasa llms.txt weszła do rejestru podstron. Etykiety
     to h1 stron docelowych, nigdy nowy slogan, a opisy idą bez kwot (uwaga
     wdrożeniowa §6, na tej stronie i tak nie pada ani jedna). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Co dzieje się po odblokowaniu botów: treść pod cytat, autorytet poza stroną i pomiar cytowań w rytmie.',
      },
      {
        etykieta: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',
        href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
        opis: 'Płatna diagnoza, w której dostęp botów AI jest jednym z siedmiu sprawdzanych punktów.',
      },
      {
        etykieta: 'llms.txt: co to jest i czy naprawdę coś daje',
        href: '/uslugi/optymalizacja/llms-txt',
        opis: 'Drugi plik, o który pytają klienci. Uczciwa odpowiedź: to pomysł na standard, a nie potwierdzona metoda, więc nie kupuj go jako skrótu.',
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
