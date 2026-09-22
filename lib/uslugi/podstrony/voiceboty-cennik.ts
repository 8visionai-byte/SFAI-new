import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 4: CENNIK (`/uslugi/voiceboty/cennik`).
 * Fraza primary: „ile kosztuje voicebot" (pakiet `.seo-przeglad/pakiety/voiceboty.md`
 * §PODSTRONA 1, priorytet najwyższy, treść zatwierdzona przed wdrożeniem).
 *
 * DLACZEGO TA PODSTRONA (dane GSC z pakietu): „voicebot cena" 17 wyświetleń
 * na pozycji 26,7 oraz „ile kosztuje voicebot" 12 wyświetleń na pozycji 14,7.
 * Obie frazy trafiają dziś na `/uslugi/voiceboty`, która odpowiada na kilkanaście
 * intencji naraz, więc żadna z nich nie ma własnej strony docelowej.
 *
 * ══ PRZYCIĘCIE 2026-09-22 (ta sama operacja, co na rodzicu `lib/uslugi/voiceboty.ts`
 * i wcześniej na `lib/uslugi/chatboty.ts`, commit b0dd7fc; raport SEO
 * `.seo-przeglad/raporty/2026-09-05.md`, cel 1300-1600 słów w <main>).
 * Zmierzone na żywej stronie przed cięciem: 2036 słów, przy 1184-1761 na pozostałych
 * podstronach tej gałęzi. Policzone na tym pliku (same stringi renderowane, bez
 * komentarzy i metadanych): 2132 -> 1676 słów, czyli 456 słów mniej.
 * WYCIĘTO WYŁĄCZNIE POWTÓRZENIA I WATĘ, ANI JEDNEJ KWOTY I ANI JEDNEGO TERMINU:
 *  - akapit „Nie chodzi o oszustwo" i sekcję „Dostawca, który odpowiada... gra
 *    uczciwie" (sekcja PROBLEM): zero liczb, zero zobowiązań,
 *  - doklejone odpowiedzi o nas z dwóch z ośmiu pytań do oferty (stoją pełnym
 *    zdaniem w FAQ o abonamencie i w sekcji „Co jest w cenie wdrożenia"),
 *  - akapit „My na minutach nie zarabiamy" i sekcję „Dlaczego nie podajemy tu
 *    własnej stawki za minutę?": ten sam fakt szedł na stronie cztery razy, został
 *    w jednym akapicie i w FAQ o minucie (to drugie zasila FAQPage),
 *  - nagłówek „Trzy pozycje rachunku...", bo powtarzał lead stojący nad nim,
 *  - wiersz „Robi lepiej" z tabeli porównawczej (duplikat wiersza „Czego nie zrobi"),
 *  - trzy punkty powtarzające stawkę 350 zł netto, wycenę na piśmie i Sprint.
 * ZOSTAŁO BEZ ZMIAN: wszystkie kwoty i terminy, sześć pytań FAQ, osiem pytań do
 * oferty, pięć pytań o licznik minut, tabela progów, trzy kroki, wiersz „24/7".
 *
 * NAZWA PLIKU I STAŁEJ ZAWIERA GAŁĄŹ (`voiceboty-cennik`), a pole `slug` zostaje
 * samym `cennik`, bo adres `/uslugi/voiceboty/cennik` się nie zmienia. Powód
 * dokładnie ten sam co przy `chatboty-cennik.ts`: katalog `lib/uslugi/podstrony/`
 * jest płaski, a pakiety automatyzacji i stron WWW planują KAŻDY własną
 * podstronę `/cennik`.
 *
 * ZDERZENIE SLUGÓW DO NAPRAWY POZA TYM PLIKIEM (znalezione przy kontroli
 * 2026-09-22, NIE do naprawy w pliku treści): `components/uslugi/ServiceHero.tsx`
 * trzyma DWIE mapy kluczowane samym `slug`, bez `rodzic`, a slug `cennik`
 * ma już `chatboty-cennik.ts`:
 *  - `KAFEL_CENY['cennik'] = { opis: 'próg prosty' }`: kafel ceny w hero tej
 *    strony pokaże „od 2500 zł" z etykietą „próg prosty", czyli nazwą progu
 *    z gałęzi CHATBOTÓW (1790 zł). Gałąź voicebotów nazywa go „pakiet startowy"
 *    i tak właśnie brzmi wpis `voiceboty` w tej samej mapie, razem z komentarzem
 *    „Nie zrównywać z chatbotami".
 *  - `H1_KOLOR['cennik'] = 'Cennik 2026'`: to końcówka H1 chatbotów, a nie
 *    tutejszego („...w Polsce w 2026 roku"), więc `dzielH1` nie dopasuje nic
 *    i H1 tej podstrony jako jedyna w gałęzi wyjdzie bez kolorowej końcówki.
 * Naprawa należy do ServiceHero (klucz `rodzic/slug` albo lookup świadomy
 * gałęzi), nie do treści. Do czasu naprawy hero tej strony mówi o cenie
 * voicebota słowami z cennika chatbotów.
 *
 * ROZDZIAŁ INTENCJI (żelazna granica, chroni przed kanibalizacją rodzica
 * `/uslugi/voiceboty` i trzech sióstr z tej gałęzi):
 *  - RODZIC sprzedaje CAŁĄ usługę: co bot robi w rozmowie, jak wygląda wdrożenie
 *    i opieka, dlaczego nie wydzwania do ludzi.
 *  - SIOSTRY sprzedają po jednym zastosowaniu: `odbieranie-telefonow` (sam odbiór
 *    połączenia), `potwierdzanie-wizyt` (kalendarz), `windykacja` (telefon w sprawie
 *    płatności). Wszystkie trzy podają tylko widełki i linkują tutaj po pełną cenę.
 *  - TA STRONA odpowiada WYŁĄCZNIE na „ile to kosztuje i za co dokładnie płacę"
 *    i kończy się jedną decyzją: policzmy to na moich liczbach.
 *  - NIE MA TU I BYĆ NIE MOŻE: opisu przebiegu rozmowy i zakresu bota (rodzic
 *    i siostry), kroków wdrożenia technicznego (rodzic), bloku o RODO i AI Act
 *    (osobna podstrona z pakietu). Do tych tematów prowadzą linki, treść zostaje
 *    na tamtych stronach.
 *  - JEDYNE MIEJSCE W SERWISIE, gdzie rozwijamy temat minuty rozmowy i kosztu
 *    pierwszego roku (tak stanowi pakiet: „Żadna inna strona nie rozwija tematu
 *    minut ani kosztu pierwszego roku").
 *  - PODZIAŁ KWOT WEWNĄTRZ STRONY (uwaga wdrożeniowa pakietu: kwoty tylko
 *    w sekcji ceny, w kapsule i w metadanych): wszystkie kwoty stoją w `kapsula`,
 *    `ramaCeny`, `faq`, `cta.mikrokopia` i w metadanych. Sekcje `problem`,
 *    `rozwiazanie`, `tabelaPorownawcza`, `kroki` i `powiazane` są CELOWO bez kwot
 *    i mówią o mechanice rachunku, nie o liczbach.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła oraz pięć pytań FAQ oznaczonych niżej jako pakietowe: pakiet
 *    §PODSTRONA 1, przeniesione DOSŁOWNIE (treść zatwierdzona, nie wolno jej
 *    przepisywać własnymi słowami),
 *  - tabela progów z czasem realizacji i kosztem pierwszego roku oraz dwa akapity
 *    pod nią (arytmetyka pierwszego roku, minuty i tokeny poza naszą fakturą,
 *    dwie rundy poprawek, nowe funkcje wyceniane osobno): pakiet §PODSTRONA 1,
 *    sekcja „TABELA PROGÓW",
 *  - cennik co do złotówki zgodny z `lib/uslugi/voiceboty.ts` (`ramaCeny`,
 *    `minPrice` 2500, tabela trzech pozycji) oraz z trzema siostrami z tej gałęzi,
 *  - czasy 3 do 5 i 5 do 25 dni roboczych, liczone od przekazania kompletu
 *    materiałów: `lib/uslugi/voiceboty.ts`, decyzja właściciela z 2026-08-20,
 *  - Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych, raport PDF, kwota
 *    odliczana w całości od wdrożenia: pakiet §PODSTRONA 1, zgodne co do złotówki
 *    z `lib/uslugi/audyt-ai.ts` i z podstroną `audyt-widocznosci-w-ai`,
 *  - pytania kontrolne o minutę rozmowy i o ofertę (licznik, cisza, przekierowanie,
 *    zaokrąglanie, przepadający pakiet, czyj numer, czyj scenariusz, czyje nagrania,
 *    wyjście z abonamentu, kto płaci za poprawki): mechanika rozliczeń opisana
 *    w pakiecie, przepisana TUTAJ WŁASNYMI ZDANIAMI, żeby nie zdublować sekcji,
 *    które pakiet przewiduje dla strony rodzica.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  2500 zł netto; 5000 do 9000 zł netto; 299 do 1500 zł netto miesięcznie; 0 zł;
 *  350 zł netto za godzinę; 1490 zł netto; 3 do 5, 5 do 25 i 5 dni roboczych;
 *  dwie rundy poprawek; 6088 / 20 500 / 8588 / 27 000 zł netto (arytmetyka
 *  pokazana w treści: budowa plus dwanaście miesięcy utrzymania).
 *  NASZE kwoty zawsze z dopiskiem netto. Przy „0 zł" dopisku NIE MA, bo zero netto
 *  to zero brutto. Zapis przedziałów słowem „do", jak w pliku rodzica.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: nie mamy ani jednej stawki za minutę
 *  rozmowy (ani własnej, ani konkurencji), nie mamy przykładowego rachunku za
 *  zużycie, nie mamy kosztu pracodawcy przy etacie i nie mamy żadnego odniesienia
 *  czasowego typu „pół roku temu". Zdania są napisane tak, żeby były prawdziwe bez
 *  tych danych: sekcja o minucie niesie PYTANIA do zadania dostawcy, a nie liczby,
 *  a tabela porównawcza z dodatkową osobą opisuje różnice jakościowe, nie kwoty.
 *
 * ZAKAZANE NA TEJ STRONIE: stawki konkurencji, sugerowanie, że voicebot dzwoni
 * sam (wolno wyłącznie w zaprzeczeniu, i tak jest użyte raz, przy dyskwalifikacji),
 * zakazana przez właściciela nazwa roli dla voicebota, obietnica pomiaru, audytu,
 * testu ani raportu na BEZPŁATNEJ rozmowie (ustalenie właściciela z 2026-08-31:
 * bezpłatna rozmowa to wyłącznie badanie potrzeb; rozplanowanie i raport to płatny
 * Sprint Diagnostyczny, odliczany w całości od wdrożenia), gwarancja zwrotu
 * pieniędzy i bezpłatny okres próbny (nie ma ich w zatwierdzonym cenniku).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „voiceboty" po rodzicu
 * (uwaga wdrożeniowa pakietu §5: żadnego nowego koloru dla nowych podstron),
 * a renderuje się TYMI SAMYMI komponentami co strony usług. Zero nowych typów
 * bloków, zero nowego CSS. Kalkulator „voicebot a dodatkowa osoba" z sekcji 5
 * planu podstrony NIE wchodzi tutaj: to wyspa `'use client'`, czyli nowy komponent,
 * a ta sesja pisze wyłącznie treść. Jego miejsce trzyma tabela jakościowa niżej.
 * `ramaCeny.cenaStala` CELOWO nie jest ustawione: cennik voicebota to widełki,
 * a nie jedna kwota dla każdego klienta.
 */
export const voicebotyCennik: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'cennik',
  dataAktualizacji: '2026-09-22',

  h1: 'Ile kosztuje voicebot w Polsce w 2026 roku',

  /* KAPSUŁA. Treść z pakietu („gotowa do wklejenia, blok krótkiej odpowiedzi pod H1"),
     ŚCIŚNIĘTA 2026-09-22 ze 103 słów do przedziału z kontraktu `Usluga.kapsula`
     (lib/uslugi/types.ts: 40-60 słów). Kapsuła jest blokiem, który modele cytują jako
     całą odpowiedź, więc ma być gęsta, nie długa.
     ANI JEDNA LICZBA NIE WYPADŁA: trzy pozycje rachunku, oba progi budowy razem z czasami,
     oba modele utrzymania, stawka godzinowa i zużycie stoją dalej. Wypadło jedno zdanie,
     „Dwie rundy poprawek są w cenie wdrożenia", i to zobowiązanie stoi na tej stronie
     w trzech innych miejscach: w liście pytań do oferty (`problem.bloki`), w sekcji
     „Co jest w cenie wdrożenia, a co wyceniamy osobno?" i w `cta.dowod`.
     DRUGIE ŚCIŚNIĘCIE 2026-09-22 (przycięcie całej podstrony): 60 -> 55 słów, czyli
     z górnej krawędzi kontraktu do środka przedziału. Wypadło „licząc od kompletu
     materiałów" i etykieta „Zużycie:". Termin liczony od kompletu materiałów stoi
     dalej w kroku „Wycena i próg" oraz w punkcie sekcji „Co jest w cenie wdrożenia".
     ŻADNA KWOTA NIE WYPADŁA. Kapsuła idzie do `description` w Service JSON-LD, więc
     nie może być przepisaną kapsułą rodzica (`lib/uslugi/voiceboty.ts`): tam zdanie
     otwierające mówi, CO bot robi, tutaj od pierwszego słowa mówimy o rachunku. */
  kapsula:
    'Voicebot ma trzy koszty, nie abonament. Stworzenie płacisz raz: 2500 zł netto (prosty, 3 do 5 dni roboczych) albo 5000 do 9000 zł netto (z integracjami, 5 do 25 dni). Utrzymanie: 299 do 1500 zł netto miesięcznie u nas albo 0 zł u Ciebie, poprawki 350 zł netto za godzinę. Minuty i tokeny płacisz dostawcom.',

  /* metaTitle: pakiet dawał 33 znaki, konwencja repo (types.ts) mówi 50-60
     i decyzja właściciela każe trzymać konwencję repo. Fraza główna zostaje
     NA POCZĄTKU, wyróżnik to wyłącznie fakt z tej strony (dolny próg cennika,
     ten sam co w kapsule i w tabeli progów). Długość 52 znaki.
     Layout dokleja sufiks marki, więc w SERP wychodzi
     „Ile kosztuje voicebot? Cennik 2026, od 2500 zł netto · SimpleFast.ai". */
  metaTitle: 'Ile kosztuje voicebot? Cennik 2026, od 2500 zł netto',
  /* 150 znaków (limit 160). Cztery wielkości naraz: oba progi budowy i oba modele
     utrzymania, plus zdanie o zużyciu, które jest tu największą luką rynkową. */
  metaDescription:
    'Cennik voicebota 2026: budowa 2500 zł netto albo 5000 do 9000 zł netto, utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł. Minuty i tokeny osobno.',

  problem: {
    /* H2 rodzica brzmi „Ile telefonów dziennie nie odbierasz?" (problem
       operacyjny), siostry pytają o stracone zapytania, wizyty i należności.
       Tutaj problem jest CENOWY i dotyczy wyłącznie porównywania ofert. */
    h2: 'Dlaczego dwie oferty na voicebota tak trudno porównać?',
    tresc:
      'Bo każda pakuje co innego w jedną kwotę. Jeden dostawca ma w niej minuty rozmów, drugi dolicza je osobno, a trzeci trzyma numer i scenariusz u siebie.',
    /* PRZYCIĘCIE 2026-09-22. Wypadły dwa bloki, oba bez ani jednego faktu własnego:
       - akapit „Nie chodzi o oszustwo...": opisywał model, w którym rachunek rośnie
         razem z liczbą odebranych telefonów, a to samo mówi pierwszy punkt listy
         („co siedzi w kwocie miesięcznej") i karta „Zużycie" w sekcji niżej,
       - sekcja „Dostawca, który odpowiada na te pytania na piśmie, gra uczciwie":
         dwa akapity moralizatorskie bez liczby, bez terminu i bez zobowiązania.
       Z ośmiu pytań wycięto DOKLEJONE ODPOWIEDZI O NAS („U nas są dwie drogi...",
       „U nas dwie rundy..."): pytania mają być pytaniami do KAŻDEGO dostawcy, a nasza
       odpowiedź na jedno i drugie stoi pełnym zdaniem w FAQ „Czy muszę płacić abonament
       co miesiąc?" i w sekcji „Co jest w cenie wdrożenia, a co wyceniamy osobno?".
       Zero pytań ubyło: dalej jest ich osiem, zgodnie z overline. */
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co sprawdzić w ofercie, zanim podpiszesz?',
        ikona: 'lupa-wykres',
        chip: 'OFERTY',
        overline: 'OSIEM PYTAŃ · ODPOWIEDZI NA PIŚMIE',
      },
      {
        typ: 'lista',
        punkty: [
          'Co siedzi w kwocie miesięcznej: serwery i monitoring to jedno, minuty i tokeny to co innego.',
          'Czy każda kolejna integracja jest płatna. Kalendarz w cenie, a system gabinetowy na osobnej fakturze.',
          'Netto czy brutto. Nagłówek bywa netto, a kalkulator brutto, więc porównuj tylko netto z netto.',
          'Czyj jest numer telefonu. Jeśli należy do dostawcy, przy zmianie firmy zostawiasz go razem z całym ruchem.',
          'Czyj jest scenariusz rozmowy. To Twoja wiedza o firmie spisana jako instrukcja i powinna zostać u Ciebie.',
          'Czyje są nagrania i transkrypcje po umowie i w jakim formacie je dostaniesz.',
          'Czy w ogóle da się wyjść z abonamentu i na jakich warunkach.',
          'Kto płaci za poprawki po odbiorze i ile ich jest w cenie wdrożenia.',
        ],
      },
    ],
  },

  rozwiazanie: {
    /* Rodzic ma w ramie ceny głowę sekcji „Z czego składa się rachunek za
       voicebota?", a siostry pytają „Za co dokładnie płacisz przy...". Ten H2
       jest celowo ustawiony na RYTM płatności, bo to jedyna rzecz, której nie
       rozstrzyga żadna z tamtych stron, a decyduje o kosztach pierwszego roku. */
    h2: 'Co płacisz raz, co co miesiąc, a co według zużycia?',
    tresc:
      'Rachunek ma trzy pozycje i każdą płacisz w innym rytmie: budowa raz, utrzymanie co miesiąc albo wcale, zużycie wprost u dostawców.',
    bloki: [
      /* 2026-09-22: nagłówek „Trzy pozycje rachunku i trzy różne rytmy płatności"
         wypadł, bo powtarzał zdanie leadu stojące bezpośrednio nad nim. Siatka
         trzech kart mówi to samo swoimi nagłówkami. */
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Budowa bota, płatna raz',
            akapity: [
              'Scenariusze rozmowy, baza wiedzy o firmie, podłączenie numeru i testy na żywo.',
            ],
            /* 2026-09-22: „Wycenę widzisz przed rozpoczęciem pracy" wypadło stąd,
               bo to samo zdanie stoi w kroku „Wycena i próg" i w `cta.dowod`. */
            punkty: ['Dwa tygodnie testów i poprawek masz w tej kwocie.'],
          },
          {
            naglowek: 'Utrzymanie, co miesiąc albo wcale',
            akapity: [
              'Serwery, monitoring i drobne poprawki, gdy infrastruktura zostaje u nas. Przy Twojej ta pozycja znika.',
            ],
            /* 2026-09-22: „Przy Twojej infrastrukturze poprawki zamawiasz godzinowo"
               wypadło stąd: stawka godzinowa stoi w kapsule, w tabeli progów, w FAQ
               o abonamencie i w punkcie sekcji „Co jest w cenie wdrożenia". */
            punkty: ['Model wybierasz przy odbiorze, nie na starcie.'],
          },
          {
            naglowek: 'Zużycie, według realnego użycia',
            /* 2026-09-22: akapit był słowo w słowo odpowiedzią FAQ „Co dokładnie
               kosztuje przy zużyciu?", a punkt o marży powtarzał się w akapicie pod
               tabelą progów i w FAQ o minucie. Pełne zdania zostają tam. */
            akapity: [
              'Minuty rozmów u dostawcy telefonii i tokeny modelu językowego, płacone bezpośrednio dostawcom.',
            ],
            punkty: ['Rachunek rośnie tylko wtedy, gdy telefon naprawdę dzwoni.'],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co to znaczy minuta rozmowy i kto ją liczy?',
        ikona: 'sluchawka-fala',
        chip: 'ZUŻYCIE',
        overline: 'PIĘĆ PYTAŃ O LICZNIK MINUT',
      },
      /* PRZYCIĘCIE 2026-09-22. Blok o minucie rozmowy miał tu DWA akapity i sekcję
         „Dlaczego nie podajemy tu własnej stawki za minutę?", a mówiły to samo trzy
         razy: nie zarabiamy na minutach, bo to stawka dostawcy. Zostaje JEDEN akapit
         z tym faktem plus pięć pytań. Zdanie o liczeniu zużycia na liczbach klienta
         stoi w kroku „Bezpłatna rozmowa" i w mikrokopii CTA, a pełna odpowiedź
         rynkowa w FAQ „Ile kosztuje minuta rozmowy z voicebotem?" (to jedyne z tych
         miejsc, które zasila FAQPage, więc tam nie ruszamy ani słowa). */
      {
        typ: 'akapit',
        tekst:
          'Słowo minuta znaczy u każdego dostawcy telefonii co innego. Nie podajemy tu własnej stawki, bo to nie jest nasza stawka: minuty kupujesz u swojego dostawcy, a tokeny u dostawcy modelu. Dopóki nie wiesz, od której sekundy leci licznik, nie porównujesz cen, tylko nagłówki ofert.',
      },
      {
        typ: 'lista',
        punkty: [
          'Od której sekundy leci licznik: od zestawienia połączenia czy od pierwszego zdania rozmówcy.',
          'Czy cisza kosztuje. Rozmówca szuka numeru albo terminarza, a licznik biegnie dalej.',
          'Kto płaci za przekierowanie do człowieka. W wielu cennikach minuta biegnie dalej aż do rozłączenia.',
          'Jak dostawca zaokrągla: do sekundy, do pełnej minuty czy do minuty zaczętej. Przy krótkich rozmowach to widać na fakturze.',
          'Czy niewykorzystany pakiet przepada. Jeśli tak, płacisz za sezonowość, której nie kontrolujesz.',
        ],
      },
    ],
  },

  /* Tabela celowo BEZ KWOT (kwoty trzyma rama ceny niżej). Rodzic porównuje
     voicebota z odbieraniem telefonu WŁASNYMI rękami, a ta strona z DODATKOWĄ
     OSOBĄ przy telefonie, bo to jedyne porównanie, które realnie pada przy
     rozmowie o pieniądzach. Komórki krótkie (konwencja v20 podstron:
     cecha ~12 znaków, kolumny ~30), żeby wiersze nie łamały się na wąskich
     ekranach. Kwoty po stronie etatu podaje Twoja księgowa, nie my, więc
     w tabeli ich nie ma i nie będzie. */
  tabelaPorownawcza: {
    h2: 'Dodatkowa osoba przy telefonie a voicebot',
    naglowekBez: 'Dodatkowa osoba przy telefonie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Koszt startu',
        bez: 'Rekrutacja i wdrożenie w firmę',
        zNami: 'Jedna opłata za budowę bota',
      },
      {
        cecha: 'Rytm płatności',
        bez: 'Co miesiąc, przez cały rok',
        zNami: 'Raz za budowę, potem wybrany model',
      },
      {
        cecha: 'Czas do startu',
        bez: 'Rekrutacja i okres wypowiedzenia',
        zNami: 'Od 3 do 25 dni roboczych',
      },
      /* `zNami` MUSI zawierać ciąg „24/7". Bramka w `ServiceHero.kafleStatystyk`
         (components/uslugi/ServiceHero.tsx) szuka PIERWSZEGO wiersza, którego
         `zNami` niesie „24/7", i dopiero z niego robi kafel dostępności w hero.
         Bez tego ciągu hero tej podstrony renderowało 3 kafle zamiast 4 (cena,
         kroki, FAQ), czyli inaczej niż rodzic i trzy siostry. Dokładnie ten sam
         błąd naprawiała siostra `odbieranie-telefonow.ts` w v20. Zero nowego
         faktu: 24/7 stoi już na tej stronie w trzech etykietach sekcji
         „Powiązane", a w całej gałęzi w H1, kapsułach i FAQ. */
      {
        cecha: 'Dostępność',
        bez: 'Osiem godzin, urlop, zwolnienie',
        zNami: '24/7, także w niedzielę',
      },
      {
        cecha: 'Pięć telefonów naraz',
        bez: 'Czterech czeka albo się rozłącza',
        zNami: 'Tyle linii, ile masz u dostawcy',
      },
      /* 2026-09-22: wiersz „Robi lepiej" wypadł. Mówił to samo, co wiersz „Czego
         nie zrobi" tuż pod nim i punkt o negocjacjach w sekcji „Kiedy voicebota
         lepiej nie kupować?". Wiersz „Dostępność" z ciągiem „24/7" ZOSTAJE:
         bez niego hero traci kafel dostępności (patrz komentarz wyżej). */
      {
        cecha: 'Czego nie zrobi',
        bez: 'Nie odbierze o dwudziestej drugiej',
        zNami: 'Nie poprowadzi trudnej rozmowy',
      },
    ],
  },

  /* Trzy kroki to nie jest tu wdrożenie (to ma rodzic), tylko droga DO KWOTY.
     Krok 1 jest świadomie opisany przez to, co na bezpłatnej rozmowie robimy
     (obejrzymy, ustalimy zakres, policzymy na Twoich liczbach), a nie przez
     pomiar, audyt ani raport: te są dopiero w płatnym kroku 2 (ustalenie
     właściciela z 2026-08-31). Kwot tu nie ma, bo wszystkie trzyma rama ceny. */
  kroki: {
    h2: 'Jak dochodzimy do kwoty dla Twojej firmy?',
    items: [
      {
        tytul: 'Bezpłatna rozmowa',
        opis:
          'Obejrzymy, jak dziś działa Twój telefon, i ustalimy zakres: co bot ma załatwiać sam, a co przekazywać dalej. Policzymy to na Twoich liczbach.',
      },
      {
        tytul: 'Sprint Diagnostyczny',
        opis:
          'Płatny drugi krok, gdy chcesz mieć to rozpisane przed decyzją: pięć dni analizy i raport PDF z rekomendacją, czy voicebot ma tu sens. Kwotę odliczamy od faktury za wdrożenie.',
      },
      {
        tytul: 'Wycena i próg',
        opis:
          'Dopiero teraz wiadomo, czy Twój bot jest prosty, czy z integracjami. Dostajesz wycenę na piśmie i termin liczony od przekazania kompletu materiałów.',
      },
    ],
  },

  ramaCeny: {
    /* Rodzic pyta „Ile kosztuje voicebot dla firmy?", siostry pytają o cenę
       swojego zastosowania. Ten H2 celuje w PIERWSZY ROK, bo tylko ta strona
       pokazuje sumę budowy i dwunastu miesięcy utrzymania. */
    h2: 'Ile kosztuje voicebot w pierwszym roku?',
    tresc:
      'Budowa to 2500 zł netto w wersji prostej albo 5000 do 9000 zł netto z integracjami, płatna raz. Utrzymanie to 299 do 1500 zł netto miesięcznie przy infrastrukturze u nas albo 0 zł przy Twojej. Zużycie płacisz bezpośrednio dostawcom.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '2500 zł netto',
            opis: 'budowa bota prostego, raz',
            zrodlo: 'tabela progów, wiersz prosty',
            ton: 'cyan',
          },
          {
            wartosc: '5000 do 9000 zł netto',
            opis: 'budowa z integracjami, raz',
            zrodlo: 'tabela progów, wiersz z integracjami',
            ton: 'violet',
          },
          {
            wartosc: '299 do 1500 zł netto',
            opis: 'utrzymanie u nas, przy Twojej infrastrukturze 0 zł',
            zrodlo: 'tabela progów, wiersz Utrzymanie',
            ton: 'green',
          },
          {
            /* Opis NIE MOŻE brzmieć „najtańszy pierwszy rok": w tej samej
               kolumnie tabeli progów stoi 2500 zł przy infrastrukturze
               u Ciebie, czyli kwota niższa. Metryka nazywa więc dokładnie
               ten wariant, z którego wyszła arytmetyka. */
            wartosc: '6088 zł netto',
            opis: 'pierwszy rok bota prostego: budowa plus dwanaście miesięcy po 299 zł netto',
            zrodlo: 'tabela progów, koszt pierwszego roku',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Pełna tabela progów: cena, czas i koszt pierwszego roku',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'PIĘĆ POZYCJI · KAŻDA KWOTA NETTO',
      },
      /* TABELA 1:1 Z PAKIETU („TABELA PROGÓW, gotowa do wklejenia"). Kolumna
         nazywa się „Cena netto", więc w komórkach nie powtarzamy słowa netto. */
      {
        typ: 'tabela',
        naglowki: [
          'Co kupujesz',
          'Co dostajesz',
          'Cena netto',
          'Czas realizacji',
          'Koszt pierwszego roku',
        ],
        wiersze: [
          [
            'Sprint Diagnostyczny',
            'Pięć dni analizy i raport PDF z rekomendacją, czy voicebot ma tu sens',
            '1490 zł',
            '5 dni roboczych',
            'Odliczamy te 1490 zł od faktury za wdrożenie',
          ],
          [
            'Voicebot prosty',
            'Baza wiedzy o firmie, odpowiedzi na pytania, kierowanie rozmowy do właściwej osoby',
            '2500 zł',
            '3 do 5 dni roboczych',
            '6088 zł przy utrzymaniu 299 zł, 20 500 zł przy utrzymaniu 1500 zł, 2500 zł przy infrastrukturze u Ciebie',
          ],
          [
            'Voicebot z integracjami',
            'To samo plus kalendarz i zapis terminu w Twoim systemie',
            '5000 do 9000 zł',
            '5 do 25 dni roboczych',
            '8588 zł przy dolnym progu i utrzymaniu 299 zł, 27 000 zł przy górnym progu i utrzymaniu 1500 zł, 5000 do 9000 zł przy infrastrukturze u Ciebie',
          ],
          [
            'Utrzymanie',
            'Serwery, monitoring, drobne poprawki',
            '299 do 1500 zł miesięcznie przy infrastrukturze u nas, 0 zł przy infrastrukturze u Ciebie',
            'Od dnia odbioru',
            'Zawarte w kwotach obok',
          ],
          [
            'Poprawki po odbiorze',
            'Zmiany spoza pierwszej rozmowy, przy infrastrukturze u Ciebie',
            '350 zł za godzinę',
            'Wycena przed rozpoczęciem pracy',
            'Zależny od Twojego zużycia',
          ],
        ],
        wKarcie: true,
        podpis: 'Cennik voicebota: cena, czas realizacji i koszt pierwszego roku.',
      },
      /* NETTO DOPISANE 2026-09-22 przy czterech wynikach arytmetyki. Powód: kwoty
         stoją tu SAMOTNIE w zdaniu, poza tabelą, której kolumna nazywa się „Cena
         netto", a FAQ 1 zapewnia, że każda kwota na tej stronie jest netto. Bez
         dopisku ten akapit był jedynym miejscem, w którym nasza kwota szła bez
         słowa netto. Same liczby i działania BEZ ZMIAN. */
      {
        typ: 'akapit',
        tekst:
          'Kolumna kosztu pierwszego roku to cena budowy plus dwanaście miesięcy utrzymania: 2500 plus 12 razy 299 to 6088 zł netto, 2500 plus 12 razy 1500 to 20 500 zł netto, 5000 plus 12 razy 299 to 8588 zł netto, 9000 plus 12 razy 1500 to 27 000 zł netto.',
      },
      {
        typ: 'akapit',
        tekst:
          'Do każdej z tych kwot dochodzą minuty i tokeny, płacone bezpośrednio dostawcom. Nie doliczamy do nich marży.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co jest w cenie wdrożenia, a co wyceniamy osobno?',
        akapity: [
          'W cenie wdrożenia są dwie rundy poprawek. Tydzień testujesz i zgłaszasz uwagi, my poprawiamy, drugi tydzień testujesz ponownie, poprawiamy i dopiero wtedy odbierasz.',
          'Nowe funkcje, o których nie było mowy w pierwszej rozmowie, wyceniamy osobno i nie chowamy ich w utrzymaniu.',
        ],
        /* 2026-09-22: trzeci punkt („zmiany po 350 zł netto za godzinę") wypadł.
           Ta stawka stoi na stronie trzy razy: w kapsule, w wierszu „Poprawki po
           odbiorze" tabeli progów i w FAQ o abonamencie. */
        punkty: [
          'Termin biegnie od dnia, w którym przekazujesz komplet materiałów, a nie od podpisu pod umową.',
          'Błędy po naszej stronie poprawiamy zawsze, również po odbiorze i poza dwiema rundami.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
      /* PRZENIESIONE Z RODZICA 2026-09-22 (`lib/uslugi/voiceboty.ts`, FAQ
         „Czyj jest numer, scenariusz i nagrania po zakończeniu współpracy?"
         oraz „Co, jeśli po miesiącu stwierdzę, że to nie dla mnie?"). Rodzic
         schodzi z 16 pytań FAQ do sześciu z kontraktu (lib/uslugi/types.ts:
         5-6) w ramach przycięcia strony usługi do 1300-1600 słów (raport SEO
         `.seo-przeglad/raporty/2026-09-05.md`, ta sama operacja co na
         /uslugi/chatboty, commit b0dd7fc).
         DLACZEGO TUTAJ: `problem.bloki` tej strony każe zapytać każdego
         dostawcę, czyj jest numer, scenariusz i nagrania, ale NASZEJ odpowiedzi
         na te trzy pytania nie było nigdzie w gałęzi. Teraz stoi w jednym
         miejscu, obok decyzji o kwocie. Wyjście z wdrożenia to też rozmowa
         o pieniądzach, więc idzie razem.
         ZERO NOWYCH FAKTÓW: numer, scenariusz i nagrania jako własność klienta
         stały dotąd tylko w FAQ rodzica; wariant z infrastrukturą po stronie
         klienta rozwija `rodo-ai-act.ts` (przełącznik, WARIANT 2).
         ZERO NOWYCH KWOT: 350 zł netto za godzinę stoi wyżej na tej stronie. */
      {
        typ: 'sekcja',
        naglowek: 'Czyj jest numer, scenariusz i nagrania, gdy się rozstajemy?',
        akapity: [
          'Twoje. Numer zostaje u Ciebie, scenariusz rozmowy dostajesz w całości, nagrania i transkrypcje też, bo to Ty jesteś administratorem tych danych.',
          'Przy infrastrukturze po Twojej stronie nie ma nawet czego przenosić: wszystko od początku stoi na Twoich kontach.',
        ],
        /* 2026-09-22: punkt o zaczynaniu od Sprintu Diagnostycznego wypadł, bo to
           samo zdanie niesie krok 2, FAQ „Czy Sprint Diagnostyczny naprawdę
           odliczacie od wdrożenia?" i mikrokopia pod CTA. */
        punkty: [
          'Kończysz utrzymanie i przejmujesz infrastrukturę do siebie, a poprawki zamawiasz godzinowo, tylko gdy ich potrzebujesz.',
          'Albo bot zostaje wyłączony i telefon wraca do ustawienia sprzed wdrożenia.',
        ],
        wariant: 'top',
        chip: 'WYJŚCIE',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy voicebota lepiej nie kupować?',
        akapity: [
          'Wolimy stracić zlecenie niż wziąć pieniądze za bota, którego wyłączysz po trzech miesiącach.',
        ],
        punkty: [
          'Dostajesz kilka telefonów dziennie: przekierowanie na komórkę i chatbot na stronie załatwią to taniej.',
          'Twoje rozmowy to głównie negocjacje i emocje: bot przekaże sprawę człowiekowi, ale jej nie poprowadzi.',
          'Nie masz kalendarza ani systemu, do którego bot miałby cokolwiek zapisać.',
          'Twoje procesy zmieniają się co tydzień: bot to spisana instrukcja, więc płaciłbyś głównie za jej przepisywanie.',
          'Szukasz bota, który sam wydzwania do klientów: takich nie budujemy, nasze boty obsługują wyłącznie połączenia przychodzące.',
        ],
        wariant: 'quiet',
        chip: 'ZASADA',
        stopka: ['Widzisz tu swoją sytuację? Napisz mimo wszystko: powiemy, co zrobić zamiast.'],
      },
    ],
    minPrice: 2500,
    /* Powrót do rodzica jednym zdaniem: ta strona kończy się decyzją o kwocie,
       a co bot robi w rozmowie, opisuje `/uslugi/voiceboty`. */
    linkPoradnik: {
      przed: 'Co dokładnie voicebot załatwia w rozmowie, opisaliśmy na stronie ',
      etykieta: 'voiceboty dla firm',
      po: '.',
      href: '/uslugi/voiceboty',
    },
  },

  /* PIĘĆ PYTAŃ 1:1 Z PAKIETU („FAQ, sekcja 8, gotowe, pięć pytań"): pozycje
     1, 2, 3, 4 i 6 tej tablicy. Ich wzajemna kolejność, treść pytań i treść
     odpowiedzi są bez zmian: ten sam tekst idzie na stronę i do FAQPage
     JSON-LD, więc każda edycja tutaj rozjeżdża oba naraz.
     PYTANIE PIĄTE („Ile kosztuje minuta rozmowy z voicebotem?") JEST NASZE,
     nie pakietowe: pakiet nazywa minutę rozmowy największą luką wobec rynku
     („voicebot cena za minutę", „ile kosztuje minuta voicebota"), a FAQ to
     jedyne miejsce na tej stronie, które zasila FAQPage. Odpowiedź nie podaje
     żadnej stawki, bo żadnej nie mamy. Jeśli właściciel chce trzymać dokładnie
     pięć pytań z pakietu, kasuje PIĄTY obiekt tej tablicy (ten o minucie)
     i nic więcej się nie rozjeżdża.
     KANIBALIZACJA ROZSTRZYGNIĘTA (2026-09-22): pytanie „Czy muszę płacić
     abonament co miesiąc?" stało słowo w słowo w FAQ rodzica
     (`lib/uslugi/voiceboty.ts`) i jako nagłówek sekcji
     w `potwierdzanie-wizyt.ts`, więc trzy adresy jednej gałęzi zgłaszały tę
     samą parę pytanie-odpowiedź. PEŁNA ODPOWIEDŹ ZOSTAJE TUTAJ, bo cennik jest
     jej miejscem. Rodzic ma od tej daty jedno zdanie plus odesłanie tutaj,
     a `potwierdzanie-wizyt.ts` ma zamiast tego nagłówka sekcję „Utrzymanie:
     co miesiąc u nas albo 0 zł u Ciebie" z jednym zdaniem i odesłaniem.
     TEJ ODPOWIEDZI NIE SKRACAĆ: po tamtych dwóch cięciach jest jedynym pełnym
     wyjaśnieniem obu modeli rozliczenia w całej gałęzi. */
  faq: [
    {
      pytanie: 'Czy podane ceny są netto czy brutto?',
      odpowiedz:
        'Netto. Każda kwota na tej stronie jest netto, do faktury dochodzi VAT. Podajemy netto, bo z takich kwot korzystają firmy przy porównywaniu ofert.',
    },
    {
      pytanie: 'Czy muszę płacić abonament co miesiąc?',
      odpowiedz:
        'Nie musisz. Masz dwie drogi. Infrastruktura zostaje u nas, my ją trzymamy i pilnujemy, a Ty płacisz 299 do 1500 zł netto miesięcznie. Albo przekazujemy Ci całą infrastrukturę, utrzymujesz ją sam i płacisz nam 0 zł miesięcznie, a poprawki zamawiasz po 350 zł netto za godzinę.',
    },
    {
      /* NETTO DOPISANE 2026-09-22 w treści PYTANIA (idzie 1:1 do Question.name
         w FAQPage): obie kwoty stały tu samotnie, a to jedyne pytanie FAQ z kwotą
         bez tego słowa. Odpowiedź bez zmian, nie ma w niej kwoty. */
      pytanie: 'Od czego zależy, czy zapłacę 5000 czy 9000 zł netto za bota z integracjami?',
      odpowiedz:
        'Od liczby systemów, które trzeba połączyć, i od tego, jak trudno się do nich dostać. Jeden kalendarz to dolny próg. Kalendarz plus system gabinetowy plus CRM z własnym API to górny.',
    },
    {
      pytanie: 'Co dokładnie kosztuje przy zużyciu?',
      odpowiedz:
        'Minuty rozmów u dostawcy telefonii i tokeny modelu językowego. Płacisz je bezpośrednio dostawcom, według swojego realnego użycia, poza naszą fakturą.',
    },
    {
      pytanie: 'Ile kosztuje minuta rozmowy z voicebotem?',
      odpowiedz:
        'Tyle, ile kosztuje u Twojego dostawcy telefonii, bo to jego stawka, nie nasza. Nie doliczamy do minut marży i nie sprzedajemy ich w pakietach. Zanim porównasz oferty, sprawdź, od której sekundy leci licznik, czy cisza kosztuje, kto płaci za przekierowanie do człowieka, jak dostawca zaokrągla i czy niewykorzystany pakiet przepada.',
    },
    {
      pytanie: 'Czy Sprint Diagnostyczny naprawdę odliczacie od wdrożenia?',
      odpowiedz:
        'Tak. Jeśli po Sprincie decydujesz się na wdrożenie, odejmujemy te 1490 zł netto od faktury za budowę bota. Jeśli się nie decydujesz, zostaje Ci raport PDF z mapą procesów i to jest całe rozliczenie.',
    },
  ],

  /* Jedna decyzja domykająca stronę: policzmy to na Twoich liczbach.
     Mikrokopia rozdziela bezpłatną rozmowę (badanie potrzeb) od płatnego
     Sprintu Diagnostycznego, bo to ostatnie zdanie przed kliknięciem. */
  cta: {
    label: 'Policzmy to na moich liczbach',
    href: '#diagnoza',
    mikrokopia:
      'Na bezpłatnej rozmowie obejrzymy Twój telefon i ustalimy zakres. Pełna analiza z raportem to Sprint Diagnostyczny za 1490 zł netto, odliczany w całości od faktury za wdrożenie.',
    dowod:
      'Wycenę dostajesz na piśmie przed startem, a dwie rundy poprawek są w cenie wdrożenia.',
  },

  queries: [
    'ile kosztuje voicebot',
    'voicebot cena',
    'voicebot cennik',
    'ile kosztuje minuta voicebota',
    'voicebot cena za minutę',
    'ukryte koszty voicebota',
    'voicebot czy dodatkowa osoba',
  ],

  /* POWIĄZANIA (uwaga wdrożeniowa pakietu §7: każda nowa podstrona linkuje
     w górę do `/uslugi/voiceboty`). Etykieta = h1 strony docelowej, opis = fakt,
     który już stoi na tamtej stronie, BEZ kwot: kwoty zostają w sekcji ceny. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Cała usługa: co bot załatwia sam w rozmowie i jak wygląda wdrożenie.',
      },
      {
        etykieta: 'Bot telefoniczny, który odbiera telefon 24/7',
        href: '/uslugi/voiceboty/odbieranie-telefonow',
        opis: 'Sam odbiór połączenia: bot odpowiada ze scenariusza i zostawia Ci podsumowanie rozmowy.',
      },
      {
        etykieta: 'Voicebot do potwierdzania wizyt 24/7',
        href: '/uslugi/voiceboty/potwierdzanie-wizyt',
        opis: 'Kalendarz: bot widzi wolne terminy i zapisuje wizytę w trakcie rozmowy.',
      },
      {
        etykieta: 'Voicebot do windykacji, który odbiera telefon 24/7',
        href: '/uslugi/voiceboty/windykacja',
        opis: 'Telefon w sprawie płatności: bot spisuje deklarowany termin zapłaty.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis: 'Szersze spojrzenie na koszt wdrożeń AI: co podbija wycenę.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis: 'Wpisz swoje liczby i zobacz, ile kosztuje Cię ręczna obsługa.',
      },
    ],
  },
};
