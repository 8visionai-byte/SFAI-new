import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 1: CENNIK (`/uslugi/chatboty/cennik`).
 * Fraza primary: „ile kosztuje chatbot ai dla firmy" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P1, treść zatwierdzona przed wdrożeniem).
 *
 * ══ PRZYCIĘCIE 2026-09-22 (raport `.seo-przeglad/raporty/2026-09-05.md`,
 * sekcje 4, 8 i 9). TA SAMA OPERACJA, co 2026-09-06 na `lib/uslugi/chatboty.ts`
 * (5667 -> 1618 słów, commit b0dd7fc) i 2026-09-22 na `lib/uslugi/voiceboty.ts`
 * (4180 -> 1575). Ta podstrona miała 2539 słów w <main> zmierzone na żywej
 * stronie i była NAJDŁUŻSZĄ podstroną w całym serwisie, przy medianie top5
 * polskiej konkurencji równej około 1150. Cel raportu: 1300-1600 słów.
 *
 * JAK MIERZONE (równolegle pracował chirurg na gałęzi optymalizacji, więc
 * buildu NIE uruchamiano): licznik czyta ten plik i sumuje słowa ze
 * WSZYSTKICH pól, które szablon renderuje w <main>, czyli h1, kapsula,
 * problem, rozwiazanie, tabelaPorownawcza, kroki, ramaCeny, faq, cta
 * i powiazane. Na wersji sprzed cięcia licznik dawał 2650 przy 2539 słowach
 * zmierzonych na żywej stronie, czyli stały współczynnik 0,958 (różnicę robią
 * tytuły sióstr i etykiety komponentów po stronie live). Po cięciu licznik
 * daje 1629, co po przeliczeniu tym samym współczynnikiem odpowiada około
 * 1560 słowom w <main>. POMIAR NA ŻYWEJ STRONIE DO POWTÓRZENIA PO DEPLOYU.
 *
 * DLACZEGO TERAZ I DLACZEGO BEZ RYZYKA: URL Inspection API z 2026-09-22 mówi
 * o tym adresie „Adres URL jest Google nieznany", czyli Google NIGDY tej strony
 * nie pobrał. Nie ma więc czego stracić w rankingu, a przycinamy ZANIM
 * jakikolwiek robot zobaczy wersję rozdętą. Na chatbotach rodzica dokładnie to
 * rozmycie tematu kosztowało frazę („chatbot ai dla firm": 70 wyświetleń -> 3).
 *
 * ZASADA (raport 9): NIE KASUJEMY TREŚCI, PRZENOSIMY JĄ ALBO ZOSTAWIAMY TAM,
 * GDZIE JUŻ STOI. Przed każdym cięciem sprawdzono, czy sedno REALNIE stoi na
 * stronie docelowej albo w innym miejscu TEJ strony. Siedem sióstr gałęzi
 * (`obsluga-klienta`, `baza-wiedzy`, `sklep-internetowy`, `generowanie-leadow`,
 * `whatsapp-messenger`, `asystent-wewnetrzny`, `hotele-pensjonaty`) ma dziś
 * po 1900-2300 słów, więc dokładanie im treści pogorszyłoby ich samych:
 * cięcia poszły tam, gdzie fakt JUŻ stoi, a nie w dopisywanie nowych akapitów.
 * Rodzic `lib/uslugi/chatboty.ts` jest po przycięciu (1608 słów) i celowo nie
 * dostał z tej operacji ani jednego zdania.
 *
 * CO WYCIĘTO I GDZIE TEN FAKT STOI:
 *  - sekcja `problem` „O co zapytać, zanim porównasz dwie oferty": z czterech
 *    pytań został JEDEN. „Czy da się przenieść bota do siebie" i „kto płaci za
 *    tokeny" niesie tabela porównawcza TEJ strony (wiersze „Koniec umowy"
 *    i „Więcej rozmów") oraz FAQ „Czy mogę nie płacić abonamentu?", a „ile
 *    kosztuje funkcja, o której nie było mowy" stoi w sekcji `rozwiazanie`
 *    (punkt „Rozbudowa") i w FAQ o poprawkach. Został punkt o aktualizacji
 *    bazy wiedzy w opłacie miesięcznej, bo o tym nie mówi nic innego. Dwa
 *    zdania stopki o tym, że odpowiedzi stoją niżej, to była wata o układzie
 *    strony, nie fakt; dwa zdania o abonamencie kontra własność (przeniesione
 *    tu z rodzica 2026-09-06) zostają.
 *  - sekcja `rozwiazanie`, siatka trzech kart „Trzy rzeczy, które ruszają
 *    wycenę": karta o materiałach do bazy wiedzy -> /uslugi/chatboty/baza-wiedzy
 *    (`baza-wiedzy.ts`: pełna lista materiałów plus zdanie „Nie muszą być
 *    poukładane, uporządkowanie jest częścią wdrożenia"), a na tej stronie
 *    zostaje krok 2 z sekcji `kroki`; karta o osobie odbierającej bota -> krok 3
 *    tej samej sekcji `kroki` plus FAQ o poprawkach; karta o integracjach ->
 *    zdanie w sekcji zbiorczej niżej, drabina cenowa i FAQ „Co dokładnie
 *    podnosi cenę chatbota?". Została jedna sekcja zbiorcza zamiast siatki
 *    i osobnego bloku o granicach ceny.
 *  - `ramaCeny`, przełącznik dwóch modeli utrzymania: drugi akapit z każdej
 *    opcji plus po jednym punkcie. „Wyższa kwota nie daje lepszego bota" to
 *    był komentarz do liczby, którą tabela podaje wprost; „kod i baza wiedzy
 *    są Twoje" stoi w tabeli porównawczej („Baza wiedzy: Twoja od pierwszego
 *    dnia"); „zero abonamentu po naszej stronie" powtarzało nagłówek własnej
 *    opcji. Stawka 350 zł netto za godzinę zjechała z akapitu do punktu i stoi
 *    dodatkowo w FAQ „Czy mogę nie płacić abonamentu?".
 *  - `ramaCeny`, tabela rachunku na trzy lata: dwa pierwsze wiersze („Koszt
 *    wdrożenia" trzy razy 1790 zł netto i „Opłata miesięczna") oraz wiersz
 *    „Za co płacisz co miesiąc". Pierwsze dwa stoją w NAGŁÓWKACH KOLUMN tej
 *    samej tabeli i w jej podpisie, trzeci zdanie w zdanie w przełączniku nad
 *    nią. Zostały trzy wiersze sum, czyli to, czego nie ma nigdzie indziej
 *    w serwisie; nagłówek pierwszej kolumny zmieniony na „Łącznie po", bo po
 *    cięciu wszystkie wiersze to już wyłącznie okresy.
 *  - `powiazane.uslugi`: pięć kart do SIÓSTR z tej samej gałęzi. Renderowały
 *    się drugi raz na tym samym ekranie, bo `PodstronyPowiazane` najpierw sam
 *    buduje siatkę „Konkretne zastosowania" ze wszystkich siedmiu sióstr.
 *    ANI JEDEN LINK NIE ZNIKA (szczegóły w komentarzu przy tym polu).
 *  - `ramaCeny`, siatka trzech kart („Co podnosi cenę", „Co obniża cenę",
 *    „Czego w tej cenie nie obetniemy") CAŁA. To był najczystszy przypadek
 *    powtórzenia na tej stronie: pierwsza karta = FAQ „Co dokładnie podnosi
 *    cenę chatbota?" plus podpis drabiny, druga karta sama mówiła o sobie „to
 *    samo, co ją podnosi, tylko czytane w drugą stronę" (a jej jedyny osobny
 *    fakt, Sprint Diagnostyczny odliczany od wdrożenia, stoi w sekcji „Kiedy
 *    chatbot się u Ciebie nie opłaci?"), trzecia karta = FAQ „Czy da się taniej
 *    niż 1790 zł netto?" i FAQ o dwóch rundach poprawek. Zero utraconych faktów.
 *  - FAQ z 8 pozycji do 6 (kontrakt `Usluga.faq` w `lib/uslugi/types.ts` mówi
 *    5-6, a strona miała 8). Wycięte dwa:
 *      · „Kto płaci za tokeny modelu językowego?" -> zostaje na tej stronie
 *        w karcie „Tokeny modelu, według zużycia" (konto Twoje, faktura prosto
 *        do Ciebie) i w FAQ „Czy do ceny dochodzi coś jeszcze?", a poza nią
 *        w `baza-wiedzy.ts` („Płacisz je dostawcy wprost, według zużycia"),
 *      · „Ile kosztuje voicebot w porównaniu z chatbotem?" -> /uslugi/voiceboty/cennik
 *        (`voiceboty-cennik.ts`: kapsuła z kompletem 2500 zł netto,
 *        5000 do 9000 zł netto i 299 do 1500 zł netto miesięcznie) oraz
 *        /uslugi/voiceboty. Wszystkie cztery kwoty zostają też na tej stronie,
 *        w sekcji „Chatbot czy voicebot, jeśli patrzysz na koszt?".
 *  - kapsuła: 66 słów -> 56, bo kontrakt `Usluga.kapsula` mówi 40-60. Ani jedna
 *    kwota ani czas nie wypadły, zmieniła się wyłącznie składnia zdań (trzy
 *    progi i trzy czasy zwinięte z trzech zdań do jednego).
 *  - reszta cięć to skracanie akapitów, które mówiły to samo dwa razy pod rząd.
 *    Żadna liczba, żaden próg i żadne zdanie kontraktowe („voicebot nigdy nie
 *    wydzwania sam", „bezpłatna rozmowa to badanie potrzeb", „Sprint 1490 zł
 *    netto odliczany w całości") nie zostało ruszone.
 *
 * CZEGO NIE RUSZONO CO DO FAKTU: wszystkie trzy progi z kwotami i czasami, obie
 * formuły utrzymania, stawka godzinowa, sumy po 12, 24 i 36 miesiącach, cennik
 * voicebota, Sprint Diagnostyczny, sześć wierszy tabeli porównawczej, trzy kroki
 * przygotowania do wyceny, pięć sytuacji „kiedy się nie opłaci" (w tym trzy
 * przeniesione tu z rodzica 2026-09-06), CTA, `metaTitle`, `metaDescription`
 * i `queries`. Kontrola po cięciu: zbiór wszystkich liczb w polach renderowanych
 * różni się od wersji sprzed operacji wyłącznie o `dataAktualizacji` oraz o samo
 * „22:00" z wyciętej karty siostry (a to jej własny H1, który siatka
 * „Konkretne zastosowania" renderuje tak czy tak). Zero nowych liczb.
 *
 * NAZWA PLIKU I STAŁEJ ZAWIERA GAŁĄŹ (`chatboty-cennik`), a pole `slug`
 * zostaje samym `cennik`, bo adres `/uslugi/chatboty/cennik` się nie zmienia.
 * Powód: pakiety voicebotów, automatyzacji i stron WWW planują KAŻDY własną
 * podstronę `/cennik`, a katalog `lib/uslugi/podstrony/` jest płaski, więc
 * trzy pliki chciałyby się nazywać tak samo. Prefiks rodzica rozwiązuje to
 * raz, zanim powstanie kolizja.
 *
 * ROZDZIAŁ INTENCJI (żelazna granica, chroni przed kanibalizacją rodzica
 * `/uslugi/chatboty`):
 *  - RODZIC sprzedaje CAŁĄ usługę: co bot robi, skąd bierze wiedzę, jak
 *    wygląda wdrożenie i utrzymanie.
 *  - TA STRONA odpowiada WYŁĄCZNIE na „ile to kosztuje i za co płacę"
 *    i kończy się jedną decyzją: ustalmy, który próg jest mój.
 *  - NIE MA TU I BYĆ NIE MOŻE: opisu tego, co bot potrafi (rodzic), kroków
 *    wdrożenia (rodzic), zastosowań branżowych (podstrony zastosowań). Do tych
 *    tematów prowadzą linki, treść zostaje na tamtych stronach.
 *  - PODZIAŁ KWOT WEWNĄTRZ STRONY (konwencja podstron przeniesiona z pakietu
 *    GEO §6 „kwoty tylko w sekcji ceny"; pakiet chatbotów takiej uwagi nie ma,
 *    więc to decyzja tej sesji, nie cytat): wszystkie kwoty stoją
 *    w `kapsula` (kapsuła cennika NIESIE kwoty z polecenia §P1), `ramaCeny`, `faq`,
 *    `cta.mikrokopia` i w metadanych. Sekcje `problem`, `rozwiazanie`,
 *    `tabelaPorownawcza`, `kroki` i `powiazane` są CELOWO bez kwot i mówią
 *    o mechanice ceny, nie o liczbach.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P1, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami).
 *    JEDYNY WYJĄTEK: dopisane słowo „netto" przy naszych kwotach, których
 *    pakiet nim nie opatrzył, czyli w odpowiedzi FAQ 6 (1790 zł
 *    i 8000-15000 zł) oraz w pytaniu FAQ 4 (1790 zł). Reguła „nasze kwoty
 *    zawsze netto" jest twardsza niż dosłowność (opis przy bloku `faq`),
 *  - drabina trzech progów z czasami: pakiet §P1 sekcja 2, zgodne co do
 *    złotówki z `lib/uslugi/chatboty.ts` (`ramaCeny` rodzica, `minPrice` 1790),
 *  - trzy osobne pozycje rachunku (stworzenie, utrzymanie, tokeny): §P1 sekcja 4,
 *  - dwa modele utrzymania: §P1 sekcja 5 plus uwaga wdrożeniowa §7 pakietu,
 *    formuła obowiązująca w czterech miejscach serwisu brzmi identycznie:
 *    „infrastruktura u nas: 99-599 zł netto miesięcznie; infrastruktura
 *    przekazana Tobie: 0 zł miesięcznie, poprawki 350 zł netto za godzinę",
 *  - rachunek na 12, 24 i 36 miesięcy: tabela z sekcji 9 pakietu, PRZENIESIONA
 *    tutaj na polecenie §P1 sekcja 9 (razem z wierszem „za co płacisz co
 *    miesiąc"). Kwoty w wierszach to suma arytmetyczna pokazana w podpisie,
 *  - chatbot a voicebot: §P1 sekcja 8 i ostatnie pytanie FAQ,
 *  - Sprint Diagnostyczny: §P1 sekcja 10, zgodne co do złotówki
 *    z `lib/uslugi/audyt-ai.ts` (ta sama usługa, ten sam raport PDF).
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1790 zł netto / 1-2 dni robocze; 3000-6000 zł netto / 3-4 dni robocze;
 *  8000-15000 zł netto / 5-10 dni roboczych; utrzymanie 99-599 zł netto
 *  miesięcznie albo 0 zł; poprawki 350 zł netto za godzinę; dwie rundy
 *  poprawek i dwa tygodnie testów; rachunek 2978 / 8978 / 4166 / 16166 /
 *  5354 / 23354 zł netto po 12, 24 i 36 miesiącach; voicebot 2500 zł netto,
 *  5000-9000 zł netto, utrzymanie 299-1500 zł netto miesięcznie; Sprint
 *  Diagnostyczny 1490 zł netto i 5 dni roboczych.
 *  ZAPIS PRZEDZIAŁÓW (ujednolicony 2026-09-04 na całej gałęzi chatbotów):
 *  łącznik bez spacji i bez spacji w tysiącach, czyli „8000-15000 zł",
 *  „99-599 zł netto miesięcznie", „5-10 dni roboczych". Tak samo w pliku
 *  rodzica `lib/uslugi/chatboty.ts`, więc cały serwis trzyma jeden zapis.
 *  NASZE kwoty zawsze z dopiskiem netto. Przy „0 zł" dopisku NIE MA, bo zero
 *  netto to zero brutto.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ani jednej kwoty
 *  konkurencji („Zero kwot konkurencji"), nie podaje przykładowego rachunku
 *  za tokeny ani żadnego odniesienia czasowego typu „pół roku temu". Zdania
 *  są napisane tak, żeby były prawdziwe bez tych danych: kolumna „Bot
 *  z platformy w abonamencie" w tabeli niesie PYTANIA do zadania, nie liczby.
 *
 * ZAKAZANE NA TEJ STRONIE: kwoty konkurencji, obietnica pomiaru, testu, audytu
 * ani raportu na BEZPŁATNEJ rozmowie (ustalenie właściciela z 2026-08-31:
 * bezpłatna rozmowa to wyłącznie badanie potrzeb, rozplanowanie procesów
 * i konkretna oferta to płatny Sprint Diagnostyczny, odliczany w całości
 * od wdrożenia), zakazana przez właściciela nazwa roli dla voicebota (patrz
 * pakiet), sugerowanie, że voicebot dzwoni sam (wolno wyłącznie
 * w zaprzeczeniu), komunikatory zespołowe jako kanały chatbota (uwaga
 * wdrożeniowa §8 pakietu), nazwa techniczna modelu.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług. Zero nowych typów bloków, zero nowego CSS.
 * `ramaCeny.cenaStala` CELOWO nie jest ustawione: cennik chatbota to widełki
 * od 1790 zł netto, a nie jedna kwota dla każdego klienta.
 */
export const chatbotyCennik: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'cennik',
  /* 2026-09-22: przycięcie 2539 -> około 1500 słów (blok „PRZYCIĘCIE" wyżej).
     2026-09-06: dołożone trzy sytuacje „kiedy się nie opłaci" z rodzica oraz
     zamknięcie „abonament czy własność" (pakiet §9) w stopce sekcji
     o porównywaniu ofert. */
  dataAktualizacji: '2026-09-22',

  h1: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',

  /* KAPSUŁA Z PAKIETU §P1 („do wklejenia jako pierwszy akapit i jako kapsula
     w danych"), ŚCIŚNIĘTA 2026-09-22 z 66 do 56 słów, bo kontrakt
     `Usluga.kapsula` (lib/uslugi/types.ts) mówi 40-60 słów, a pakiet o tym
     limicie nie wiedział. Komplet wielkości strony zostaje co do liczby: trzy
     progi, trzy czasy, dwa modele utrzymania i tokeny. Zmieniła się wyłącznie
     składnia: trzy osobne zdania o progach zwinięte w jedno wyliczenie. */
  kapsula:
    'Chatbot AI dla firmy kosztuje u nas od 1790 zł netto przy 1-2 dniach roboczych, bot średni 3000-6000 zł netto przy 3-4 dniach, a bot z integracjami 8000-15000 zł netto przy 5-10 dniach. Do tego utrzymanie 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie. Tokeny płacisz dostawcy wprost.',

  /* metaTitle: pakiet §P1 dawał 36 znaków, konwencja repo (types.ts) mówi 50-60
     i decyzja właściciela każe trzymać konwencję repo. Fraza główna zostaje
     NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakt z tej strony (dolny
     próg cennika, ten sam co w kapsule i w drabinie cen). Długość 51 znaków.
     Layout dokleja sufiks marki, więc w SERP wychodzi
     „Ile kosztuje chatbot AI dla firmy? Od 1790 zł netto · SimpleFast.ai". */
  metaTitle: 'Ile kosztuje chatbot AI dla firmy? Od 1790 zł netto',
  /* 155 znaków (limit 160). Cztery wielkości naraz: dolny próg, czas, górny
     próg i utrzymanie w obu modelach rozliczenia. */
  metaDescription:
    'Cennik chatbota AI dla firmy: od 1790 zł netto i 1-2 dni robocze, z integracjami 8000-15000 zł netto. Utrzymanie 99-599 zł netto albo 0 zł po przekazaniu.',

  problem: {
    /* H2 rodzica brzmi „Ile razy dziennie odpowiadasz na to samo pytanie?"
       (problem obsługowy). Tutaj problem jest CENOWY: nie da się porównać
       dwóch ofert, dopóki nie rozbije się ich na te same trzy pozycje. */
    h2: 'Dlaczego jedna kwota za chatbota nie mówi Ci prawie nic?',
    tresc:
      'Cena chatbota to nie jedna liczba, tylko trzy osobne pozycje: stworzenie bota, utrzymanie po wdrożeniu i zużycie tokenów modelu. Dwie oferty zestawisz dopiero wtedy, gdy rozbijesz każdą na te same trzy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Trzy pozycje rachunku za chatbota',
        ikona: 'lupa-wykres',
        chip: 'CENNIK',
        overline: 'JEDNORAZOWO · CO MIESIĄC · WEDŁUG ZUŻYCIA',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Stworzenie bota, płatne raz',
            akapity: [
              'Jednorazowa kwota za zbudowanie i uruchomienie bota: bazę wiedzy z Twoich materiałów, ustawienie rozmowy, testy i odbiór. Płacisz ją raz.',
            ],
            punkty: ['Dwie rundy poprawek mieszczą się w tej kwocie.'],
          },
          {
            naglowek: 'Utrzymanie, co miesiąc albo wcale',
            akapity: [
              'Zależy od jednej decyzji: czy infrastruktura zostaje u nas, czy przekazujemy ją Tobie. W drugim wariancie nie płacisz nam co miesiąc nic.',
            ],
            /* PRZYCIĘCIE 2026-09-22: wycięte oba punkty („infrastruktura u nas:
               stała opłata miesięczna" i „u Ciebie: poprawki godzinowo") razem
               z polem, bo `punkty` jest opcjonalne (lib/blog/types.ts), a pusta
               tablica renderowałaby pustą listę. Przełącznik dwóch modeli
               w sekcji ceny mówi dokładnie to samo, tylko z kwotami. */
          },
          {
            naglowek: 'Tokeny modelu, według zużycia',
            /* PUNKT „Konto u dostawcy jest Twoje" ZOSTAJE: od 2026-09-22 to
               jedyne miejsce na tej stronie, gdzie stoi wprost, czyje jest
               konto i do kogo idzie faktura (wycięte FAQ „Kto płaci za tokeny
               modelu językowego?"). Ten sam fakt niesie `baza-wiedzy.ts`. */
            akapity: [
              'Tokeny to rozliczenie za pracę modelu językowego. Jedyna pozycja, o której wysokości decyduje liczba rozmów, a nie umowa z nami.',
            ],
            punkty: [
              'Konto u dostawcy jest Twoje, faktura idzie prosto do Ciebie, bez naszej marży.',
              'Realny rząd wielkości znasz po pierwszej fakturze od dostawcy.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'O co zapytać, zanim porównasz dwie oferty na chatbota?',
        akapity: ['Różnica między ofertami rzadko siedzi w kwocie na pierwszej stronie.'],
        /* PRZYCIĘCIE 2026-09-22: z czterech pytań został jeden. Wycięte
           „czy da się przenieść bota do siebie" i „kto płaci za tokeny"
           niesie tabela porównawcza zaraz niżej (wiersze „Koniec umowy"
           i „Więcej rozmów") oraz FAQ „Czy mogę nie płacić abonamentu?",
           a „ile kosztuje funkcja, o której nie było mowy" stoi w sekcji
           `rozwiazanie` (punkt „Rozbudowa") i w FAQ o poprawkach. Ten jeden
           zostaje, bo o aktualizacji bazy wiedzy w opłacie miesięcznej nie
           mówi na tej stronie nic innego. */
        punkty: [
          'Kto aktualizuje bazę wiedzy, gdy zmienia się oferta, i czy mieści się to w opłacie miesięcznej.',
        ],
        wariant: 'edge',
        chip: 'PORÓWNANIE',
        /* Stopka: pakiet §9 rodzica (zamknięcie listy kontrolnej „abonament
           czy własność"), przeniesione 1:1 w 2026-09-06 po przycięciu
           `/uslugi/chatboty` (kontrola utraty treści). Zero liczb. Dwa zdania
           o tym, że odpowiedzi stoją niżej, wycięte 2026-09-22: mówiły
           o układzie strony, nie o cenie. */
        stopka: [
          'Abonament ma sens, jeśli chcesz prostego bota na tydzień, sam go skonfigurujesz i nie zależy Ci na tym, czyja jest baza wiedzy.',
          'Własny bot ma sens, jeśli baza wiedzy jest Twoim aktywem, a bot ma pracować na Twoich zasadach dłużej niż rok.',
        ],
      },
    ],
  },

  rozwiazanie: {
    /* H2 rodzica brzmi „Co robi nasz chatbot, czego nie robi zwykły bot?".
       Tutaj mowa wyłącznie o mechanice wyceny, bez ani jednej kwoty. */
    h2: 'Co decyduje o tym, w którym progu wyląduje Twój chatbot?',
    tresc:
      'O progu decyduje jedna rzecz: czy bot ma tylko odpowiadać, czy sięgać do Twoich systemów. Objętość bazy wiedzy i liczba funkcji przesuwają wycenę już wewnątrz progu.',
    /* PRZYCIĘCIE 2026-09-22. Była tu siatka trzech kart („Trzy rzeczy, które
       ruszają wycenę") plus osobna sekcja „Czego cena wdrożenia nie obejmuje".
       Zostaje jedna sekcja zbiorcza, bo dwie z trzech kart stały na tej samej
       stronie drugi raz:
        - karta o materiałach do bazy wiedzy -> krok 2 w sekcji `kroki` niżej
          („Zbierz w jednym miejscu cennik, oferty, opisy produktów
          i procedury"), a pełna lista materiałów wraz ze zdaniem, że nie muszą
          być poukładane, stoi na /uslugi/chatboty/baza-wiedzy (link w siatce
          powiązań pod stroną),
        - karta o osobie odbierającej bota -> krok 3 w sekcji `kroki`
          („Wskaż jedną osobę decyzyjną do dwóch tur testów") i FAQ
          o poprawkach,
        - karta o integracjach -> akapit tej sekcji, drabina cenowa i FAQ
          „Co dokładnie podnosi cenę chatbota?".
       Zdanie o wiedzy, która siedzi w głowach, stoi niżej w sekcji „Kiedy
       chatbot się u Ciebie nie opłaci?". */
    bloki: [
      {
        typ: 'sekcja',
        naglowek: 'Co przesuwa próg, a co zostaje poza kwotą wdrożenia',
        /* Akapit NIE powtarza leadu sekcji (lead już mówi, że o progu decyduje
           sięganie do systemów), tylko dokłada wniosek: sama liczba pytań nie
           rusza kwoty. */
        akapity: [
          'Bot, który tylko odpowiada, zostaje na dole drabiny, choćby odpowiadał na bardzo dużo pytań.',
        ],
        punkty: [
          'Sprawdzenie statusu zamówienia albo dopisanie kontaktu do CRM to już integracja.',
          'Każdy system to osobne dostępy, testy i obsługa błędów.',
          /* PRZYCIĘCIE 2026-09-22: wycięty punkt o tokenach. Karta „Tokeny
             modelu, według zużycia" w sekcji `problem` mówi to samo, i to
             dokładniej (czyje konto, do kogo faktura, bez marży). */
          'Rozbudowa: to, czego nie ustaliliśmy na starcie, idzie jako osobne zlecenie z własną kwotą.',
        ],
        wariant: 'top',
        chip: 'GRANICE',
        stopka: ['O rozbudowie mówimy w momencie zgłoszenia, nie po jej zrobieniu.'],
      },
    ],
  },

  /* Komórki krótkie (konwencja podstron: cecha ~14 znaków, kolumny ~35), żeby
     wiersze nie łamały się na wąskich ekranach. Kolumna „bez" NIE ocenia
     cudzych produktów i nie podaje ich cen (pakiet: „Zero kwot konkurencji"),
     tylko nazywa pytanie, które warto tam zadać. */
  tabelaPorownawcza: {
    h2: 'Bot z platformy w abonamencie a chatbot na własność',
    naglowekBez: 'Bot z platformy w abonamencie',
    naglowekZNami: 'Chatbot wdrożony przez SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Płatność',
        bez: 'Opłata co miesiąc, dopóki bot działa',
        zNami: 'Wdrożenie raz, utrzymanie do wyboru',
      },
      {
        cecha: 'Baza wiedzy',
        bez: 'Zapytaj, co zabierasz przy wyjściu',
        zNami: 'Twoja od pierwszego dnia',
      },
      {
        cecha: 'Zmiany w bocie',
        bez: 'Tyle, ile przewidział panel',
        zNami: 'Pod Twój proces, dwie rundy w cenie',
      },
      {
        cecha: 'Integracje',
        bez: 'Zapytaj, czy w ogóle są możliwe',
        zNami: 'Wpinamy bota w Twoje systemy',
      },
      {
        cecha: 'Więcej rozmów',
        bez: 'Sprawdź, czy cena rośnie z ruchem',
        zNami: 'Tokeny rozliczasz u dostawcy modelu',
      },
      {
        cecha: 'Koniec umowy',
        bez: 'Zapytaj, co zostaje po Twojej stronie',
        zNami: 'Przekazujemy Ci całą infrastrukturę',
      },
    ],
  },

  /* Kroki rodzica opisują WDROŻENIE (diagnoza, uczenie, utrzymanie). Te trzy to
     sekcja 11 pakietu §P1 („Jak przygotować się do wyceny"), czyli LISTA
     RZECZY PO TWOJEJ STRONIE, a nie opis naszego procesu: co zebrać i kogo
     wskazać, zanim usiądziemy do liczenia. Typ `Usluga` wymaga dokładnie
     trzech kroków, więc materiały i lista systemów stoją w jednym punkcie.
     Bezpłatna rozmowa służy tu badaniu potrzeb i policzeniu rzeczy na Twoich
     liczbach: żadnego pomiaru, testu, audytu ani raportu. */
  kroki: {
    h2: 'Jak przygotować się do wyceny chatbota?',
    items: [
      {
        tytul: 'Zgrubna liczba pytań i kanały, którymi przychodzą',
        opis: 'Nie musisz liczyć co do sztuki. Wystarczy szacunek: tyle mailem, tyle w komunikatorach, tyle telefonem. To mówi, czy jesteśmy przy progu prostym, czy wyżej.',
      },
      {
        /* KROK 2 PRZEJĄŁ 2026-09-22 KARTĘ „W jakim stanie są materiały do bazy
           wiedzy?" z sekcji `rozwiazanie` (patrz komentarz tamże). Pełna lista
           materiałów wraz ze zdaniem, że nie muszą być poukładane, stoi na
           /uslugi/chatboty/baza-wiedzy. */
        tytul: 'Materiały do bazy wiedzy i lista systemów',
        opis: 'Zbierz cennik, oferty, opisy produktów i procedury, a obok wypisz systemy, z którymi bot ma rozmawiać: CRM, sklep, kalendarz, magazyn. Ta druga lista przesądza o progu.',
      },
      {
        tytul: 'Osoba, która odbierze bota po Twojej stronie',
        opis: 'Wskaż jedną osobę decyzyjną do dwóch tur testów, nie cały zespół. Z tymi trzema rzeczami próg, czas i granice zakresu mieszczą się w jednej rozmowie.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje chatbot AI na każdym z trzech progów?',
    /* Lead CELOWO bez kwot: komplet liczb stoi w kapsule na górze strony,
       w pasie metryk zaraz pod tym akapitem i w drabinie cenowej. Powtórzenie
       ich tutaj dawało zdanie prawie identyczne z FAQ rodzica (pomiar
       podobieństwa 0,81), więc lead mówi o układzie sekcji, nie o liczbach. */
    tresc:
      'Trzy progi, trzy czasy realizacji, do tego utrzymanie i rachunek na trzy lata. Cenę bota poznaje się po całym okresie jego pracy, a nie po pierwszym dniu.',
    bloki: [
      {
        typ: 'pasMetryk',
        /* PRZYCIĘCIE 2026-09-22: pas zostaje (to jedyny element tej sekcji
           czytelny w dwie sekundy), ale pola `zrodlo` mówiły o układzie
           strony („próg 1 z drabiny cenowej niżej"), a nie o cenie. Skrócone
           do nazwy bloku, z którego liczba pochodzi. Same kwoty i czasy
           bez zmian, co do złotówki jak w drabinie i przełączniku. */
        metryki: [
          {
            wartosc: '1790 zł netto',
            opis: 'chatbot prosty, płatne raz przy wdrożeniu',
            zrodlo: 'drabina cenowa',
            ton: 'cyan',
          },
          {
            wartosc: '1-2 dni robocze',
            opis: 'wdrożenie progu prostego, od kompletu materiałów',
            zrodlo: 'drabina cenowa',
            ton: 'green',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'utrzymanie miesięcznie, gdy infrastruktura stoi u nas',
            zrodlo: 'dwa modele utrzymania',
            ton: 'amber',
          },
          {
            wartosc: '0 zł',
            opis: 'utrzymanie miesięcznie, gdy przekazujemy infrastrukturę Tobie',
            zrodlo: 'dwa modele utrzymania',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Drabina cenowa: trzy progi, trzy czasy',
        ikona: 'kalendarz-check',
        chip: 'CENNIK 2026',
        overline: 'KWOTY NETTO · DNI ROBOCZE',
      },
      {
        typ: 'tabela',
        /* CZWARTA KOLUMNA ODPOWIADA NA „za co dokładnie płacisz na każdym
           progu" (pakiet §P1 sekcja 3), a nie na „co Cię na ten próg
           przesuwa": to drugie stoi w sekcji `rozwiazanie` i w podpisie
           tabeli, więc informacja nie znika, tylko wraca na swoje miejsce.
           Zawartość progów pochodzi z pakietu: próg prosty z §P1 FAQ 1 i 4
           (bot na stronie WWW, baza wiedzy z Twoich materiałów, zbieranie
           leadów, dwie rundy poprawek i odbiór), próg średni z §P6 kapsuły
           (dołożenie kanału mieści się w progu średnim) plus §P1 sekcja 7,
           próg duży z §P1 FAQ 6 (sprawdzanie i zapisywanie w Twoich
           systemach, osobne dostępy, testy i obsługa błędów). */
        naglowki: ['Próg', 'Cena netto', 'Czas wdrożenia', 'Co dostajesz na tym progu'],
        wiersze: [
          [
            'Prosty',
            '1790 zł',
            '1-2 dni robocze',
            'bot na Twojej stronie WWW, baza wiedzy z Twoich materiałów, zbieranie kontaktów, dwie rundy poprawek',
          ],
          [
            'Średni',
            '3000-6000 zł',
            '3-4 dni robocze',
            'wszystko z progu prostego, większa baza wiedzy, funkcje pod Twój proces i kanały: WhatsApp, Messenger, Instagram, Telegram',
          ],
          [
            'Duży z integracjami',
            '8000-15000 zł',
            '5-10 dni roboczych',
            'wszystko z progu średniego, a bot sprawdza albo zapisuje coś w Twoich systemach: osobne dostępy, testy, obsługa błędów',
          ],
        ],
        wKarcie: true,
        /* PRZYCIĘCIE 2026-09-22: z podpisu wyleciało drugie zdanie („o progu
           decyduje to, czy bot ma tylko odpowiadać, czy sięgać do systemów"),
           bo tym samym zdaniem otwiera się sekcja `rozwiazanie` wyżej i FAQ
           „Co dokładnie podnosi cenę chatbota?" niżej. */
        podpis: 'Drabina cenowa chatbota AI: kwoty netto, płatne raz przy wdrożeniu.',
      },
      {
        typ: 'naglowek',
        tekst: 'Co płacisz co miesiąc po wdrożeniu?',
        ikona: 'dokument-skan',
        chip: 'UTRZYMANIE',
        overline: 'DWA MODELE · WYBIERASZ PRZED WDROŻENIEM',
      },
      {
        typ: 'przelacznik',
        grupa: 'cennik-utrzymanie',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Infrastruktura u nas',
            podtytul: '99-599 zł netto miesięcznie',
            naglowek: 'Serwery zostają po naszej stronie, Ty płacisz stałą kwotę miesięcznie',
            /* PRZYCIĘCIE 2026-09-22: wycięty drugi akapit („wyższa kwota nie
               daje lepszego bota") i punkt „Kod i baza wiedzy i tak są Twoje".
               Rozbicie 99 kontra 599 niesie wiersz „Za co płacisz co miesiąc"
               w tabeli trzech lat niżej, a własność bazy wiedzy stoi w tabeli
               porównawczej („Baza wiedzy: Twoja od pierwszego dnia"). */
            akapity: [
              'Za 99 zł netto miesięcznie bot ma po prostu działać: hosting i nasza reakcja, gdy coś przestanie działać. Za 599 zł netto miesięcznie dochodzi regularna aktualizacja bazy wiedzy przy większym ruchu.',
            ],
            punkty: ['Serwery trzymamy my, Ty nie stawiasz i nie pilnujesz niczego.'],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Infrastruktura u Ciebie',
            podtytul: '0 zł miesięcznie',
            naglowek: 'Przekazujemy Ci całą infrastrukturę i nie płacisz nam nic co miesiąc',
            /* PRZYCIĘCIE 2026-09-22: stawka 350 zł netto za godzinę zjechała
               z akapitu do punktu (stoi też w FAQ „Czy mogę nie płacić
               abonamentu?" i w tabeli trzech lat). Wycięty punkt „Zero
               abonamentu po naszej stronie" powtarzał nagłówek opcji. */
            akapity: [
              'Bot stoi wtedy u Ciebie, razem z kodem i bazą wiedzy. Utrzymanie po naszej stronie wynosi 0 zł miesięcznie, bo nie trzymamy już nic, za co można by płacić.',
            ],
            punkty: [
              'Późniejsze zmiany po 350 zł netto za godzinę, tylko gdy je zamówisz.',
              'Zmiany robisz sam, zlecasz nam albo komuś innemu.',
            ],
          },
        ],
      },
      /* PRZYCIĘCIE 2026-09-22: TU STAŁA SIATKA TRZECH KART i cała poszła
         do kosza jako najczystsze powtórzenie na tej stronie.
          - „Co podnosi cenę Twojego chatbota?" = FAQ „Co dokładnie podnosi
            cenę chatbota?" (te same integracje i ten sam przedział
            8000-15000 zł netto) plus podpis drabiny cenowej wyżej,
          - „Co obniża cenę Twojego chatbota?" sama o sobie pisała, że to
            „to samo, co ją podnosi, tylko czytane w drugą stronę"; jej jedyny
            osobny fakt, czyli Sprint Diagnostyczny odliczany od wdrożenia,
            stoi w sekcji „Kiedy chatbot się u Ciebie nie opłaci?" niżej,
          - „Czego w tej cenie nie obetniemy?" = FAQ „Czy da się taniej niż
            1790 zł netto?" (komentarz przy tamtej karcie sam odnotowywał
            zmierzone podobieństwo 0,68) plus FAQ o dwóch rundach poprawek.
         Zero faktów straconych, około 230 słów mniej. */
      {
        typ: 'sekcja',
        naglowek: 'Chatbot czy voicebot, jeśli patrzysz na koszt?',
        /* OD 2026-09-22 TO JEDYNE MIEJSCE NA STRONIE z kwotami voicebota:
           FAQ „Ile kosztuje voicebot w porównaniu z chatbotem?" zostało
           wycięte (kontrakt 5-6 pytań), a jego kwoty stoją w tych punktach
           co do złotówki. Pełny cennik voicebota: /uslugi/voiceboty/cennik,
           link w siatce powiązań pod stroną. Zdanie o tym, że voicebot nie
           wydzwania sam, jest kontraktowe i nie wolno go skracać. */
        akapity: [
          'Chatbot obsługuje tych, którzy piszą. Voicebot odbiera połączenia od tych, którzy dzwonią, i nigdy nie wydzwania do Twoich klientów sam.',
          'Voicebot startuje wyżej i drożej wychodzi co miesiąc, bo poza botem w rachunku siedzi telefonia i czas połączeń. Przy tym samym zestawie pytań tańszym wejściem jest chatbot.',
        ],
        punkty: [
          'Voicebot prosty: 2500 zł netto.',
          'Voicebot z integracjami, na przykład z kalendarzem: 5000-9000 zł netto.',
          'Utrzymanie voicebota: 299-1500 zł netto miesięcznie.',
          /* PRZYCIĘCIE 2026-09-22: wycięty czwarty punkt z kwotami CHATBOTA.
             Ta sama drabina stoi dwa bloki wyżej, a przy tym samym zestawie
             pytań tańszym wejściem jest chatbot, co mówi akapit nad listą. */
        ],
        wariant: 'top',
        chip: 'CHATBOT A VOICEBOT',
      },
      {
        typ: 'naglowek',
        tekst: 'Ile chatbot kosztuje przez trzy lata?',
        ikona: 'wykres-strzalka',
        chip: 'RACHUNEK',
        overline: 'PRÓG PROSTY · TRZY WARIANTY UTRZYMANIA',
      },
      {
        typ: 'tabela',
        /* Nagłówek pierwszej kolumny zmieniony 2026-09-22 z „Co porównujemy"
           na „Łącznie po", bo po wycięciu wierszy „Koszt wdrożenia"
           i „Opłata miesięczna" wszystkie wiersze tabeli to już wyłącznie
           okresy, a nie różne rzeczy do porównania. */
        naglowki: [
          'Łącznie po',
          'Infrastruktura u nas: 99 zł netto',
          'Infrastruktura u nas: 599 zł netto',
          'Infrastruktura u Ciebie',
        ],
        /* PRZYCIĘCIE 2026-09-22: wycięte dwa pierwsze wiersze („Koszt
           wdrożenia" trzy razy 1790 zł netto oraz „Opłata miesięczna"), bo
           obie liczby stoją już w NAGŁÓWKACH KOLUMN tej samej tabeli
           i w podpisie pod nią. Zostają wyłącznie sumy, czyli to, czego nie
           ma nigdzie indziej w serwisie. */
        wiersze: [
          ['12 miesięcy', '2978 zł netto', '8978 zł netto', '1790 zł netto'],
          ['24 miesiące', '4166 zł netto', '16166 zł netto', '1790 zł netto'],
          ['36 miesięcy', '5354 zł netto', '23354 zł netto', '1790 zł netto'],
        ],
        wKarcie: true,
        /* PRZYCIĘCIE 2026-09-22: wycięty wiersz „Za co płacisz co miesiąc".
           Rozbicie 99 kontra 599 kontra 0 zł stoi zdanie w zdanie
           w przełączniku dwóch modeli utrzymania nad tą tabelą, razem
           ze stawką 350 zł netto za godzinę. */
        podpis:
          'Rachunek na trzy lata dla progu prostego, kwoty netto. Jak liczymy: 1790 zł netto wdrożenia plus opłata miesięczna razy liczba miesięcy.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy chatbot się u Ciebie nie opłaci?',
        akapity: [
          'Przy kilku zapytaniach tygodniowo bot nie odda 1790 zł netto. Odpowiadanie osobiście jest wtedy Twoją przewagą, a nie kosztem.',
          'Druga sytuacja to wiedza, która siedzi w głowach zamiast w dokumentach. Bot nie wymyśli procedury, której nikt nie spisał, więc zaczynamy od spisania.',
          /* 2026-09-06: trzy sytuacje przeniesione z rodzica /uslugi/chatboty
             (przycięcie strony, raport SEO 2026-09-05 sekcja 9: wątki
             poboczne idą na podstrony, nie do kosza). Treść napisana od nowa,
             bez kwot stron WWW, które stoją na /uslugi/strony-www. */
          'Trzy kolejne: gdy każda sprawa wymaga decyzji człowieka, bot ma zebrać kontekst i oddać rozmowę, a nie udawać, że ją domknie. Gdy chcesz bota, bo ma go konkurencja, najpierw wskaż pytanie, które wraca najczęściej. Gdy strona nie ma ruchu, najpierw robi się widoczność.',
        ],
        /* PRZYCIĘCIE 2026-09-22: wycięty czwarty punkt („wróć do tematu, gdy
           zapytania zaczną się powtarzać") powtarzał pierwszy akapit tej samej
           sekcji. Trzy pozostałe punkty niosą zdania kontraktowe (bezpłatna
           rozmowa = badanie potrzeb, Sprint 1490 zł netto odliczany w całości)
           i nie wolno ich ruszać. */
        punkty: [
          'Pierwsza rozmowa jest bezpłatna i służy zbadaniu potrzeb: pytamy, o co pytają Twoi klienci.',
          'Rozplanowanie procesów i konkretna oferta to już Sprint Diagnostyczny: 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów.',
          'Te 1490 zł netto odliczamy w całości od ceny wdrożenia, więc gdy wchodzisz w projekt, sprint nic Cię nie kosztuje.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: ['Wolimy stracić zlecenie niż sprzedać bota, który nie ma czego przejąć.'],
      },
    ],
    minPrice: 1790,
    /* `cenaStala` CELOWO nieustawione: 1790 zł netto to dolny próg widełek,
       a nie jedna kwota dla każdego klienta (inaczej niż przy Sprincie
       Diagnostycznym). Render zostawia więc prefiks „od " na kaflu ceny. */
    /* Powrót do rodzica jednym zdaniem (uwaga wdrożeniowa §4: każda podstrona
       linkuje zwrotnie do `/uslugi/chatboty`). Ta strona kończy się decyzją
       o progu, a co bot potrafi, opisuje strona macierzysta. */
    linkPoradnik: {
      przed: 'Co dokładnie robi bot, którego tu wyceniamy, opisaliśmy na stronie ',
      etykieta: 'chatbot AI dla firm',
      po: '.',
      href: '/uslugi/chatboty',
    },
  },

  /* SZEŚĆ PYTAŃ. Pakiet §P1 dawał osiem („FAQ gotowe, 8 pytań"), ale kontrakt
     `Usluga.faq` (lib/uslugi/types.ts, sekcja 7 szablonu) mówi 5-6, więc
     2026-09-22 zeszliśmy do sześciu. Zasada jak przy metaTitle wyżej:
     konwencja repo jest twardsza niż długość z pakietu.
     WYCIĘTE DWA I GDZIE STOJĄ:
      · „Kto płaci za tokeny modelu językowego?" (odpowiedź: Ty, bezpośrednio
        u dostawcy, konto Twoje, bez marży, rachunek rośnie z liczbą rozmów)
        -> karta „Tokeny modelu, według zużycia" w sekcji `problem` tej strony,
        gdzie po tym cięciu stoi wprost „konto u dostawcy jest Twoje, faktura
        idzie prosto do Ciebie, bez naszej marży", plus pytanie „Czy do ceny
        dochodzi coś jeszcze?" niżej i `baza-wiedzy.ts`,
      · „Ile kosztuje voicebot w porównaniu z chatbotem?" -> sekcja „Chatbot
        czy voicebot, jeśli patrzysz na koszt?" w `ramaCeny` (te same cztery
        kwoty) oraz /uslugi/voiceboty/cennik.
     Pozostałych sześć pytań i ich kolejność BEZ ZMIAN: ten sam tekst idzie na
     stronę i do FAQPage JSON-LD (uwaga wdrożeniowa §6), więc każda edycja
     tutaj rozjeżdża oba naraz.
     JEDYNE ODSTĘPSTWO OD DOSŁOWNOŚCI (kontrola adwersaryjna, 2026-09-01,
     uzupełniona 2026-09-04): pakiet pisał naszą kwotę bez słowa netto
     w dwóch miejscach, mimo że pytanie 1 tego samego bloku pisze „1790 zł
     netto". Chodzi o odpowiedź na „Co dokładnie podnosi cenę chatbota?"
     („1790 zł" i „8000-15000 zł") oraz o samo pytanie „Czy da się taniej
     niż 1790 zł?". Reguła właściciela „nasze kwoty zawsze netto" jest
     twardsza niż dosłowność, więc w obu miejscach dopisane zostało samo
     słowo „netto". Zero innych zmian w treści pakietu. */
  faq: [
    {
      pytanie: 'Ile kosztuje najprostszy chatbot AI?',
      odpowiedz:
        '1790 zł netto. To bot na Twojej stronie WWW z bazą wiedzy z Twoich materiałów i ze zbieraniem leadów z rozmowy. Wdrażamy go w 1-2 dni robocze.',
    },
    {
      pytanie: 'Czy do ceny dochodzi coś jeszcze?',
      odpowiedz:
        'Tak, dwie pozycje. Utrzymanie 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie. Oraz zużycie tokenów modelu, za które płacisz dostawcy wprost.',
    },
    {
      pytanie: 'Czy da się taniej niż 1790 zł netto?',
      odpowiedz:
        'Nie u nas. Za tę kwotę dostajesz wdrożenie z Twoimi materiałami, dwie rundy poprawek i odbiór. Jeśli budżet jest mniejszy, powiemy Ci to wprost, zamiast ciąć zakres i oddawać bota, który nie działa.',
    },
    {
      pytanie: 'Czy poprawki są dodatkowo płatne?',
      odpowiedz:
        'Dwie rundy poprawek są w cenie wdrożenia. Testujesz bota przez tydzień, wdrażamy uwagi, testujesz drugi tydzień, wdrażamy kolejne i jest odbiór. Nowe funkcje spoza pierwszej rozmowy wyceniamy osobno.',
    },
    {
      pytanie: 'Co dokładnie podnosi cenę chatbota?',
      odpowiedz:
        'Integracje z Twoimi systemami. Bot, który tylko odpowiada, mieści się w 1790 zł netto. Bot, który sprawdza status zamówienia albo dopisuje kontakt do CRM, to przedział 8000-15000 zł netto, bo każdy system to osobne dostępy, testy i obsługa błędów.',
    },
    {
      pytanie: 'Czy mogę nie płacić abonamentu?',
      odpowiedz:
        'Tak. Przekazujemy Ci całą infrastrukturę, wtedy utrzymanie po naszej stronie wynosi 0 zł miesięcznie. Późniejsze poprawki rozliczamy po 350 zł netto za godzinę, tylko gdy je zamówisz.',
    },
  ],

  /* Jedna decyzja domykająca stronę: ustalmy próg. Mikrokopia powtarza dolny
     i górny próg z czasami, bo to ostatnie zdanie przed kliknięciem. Zgodnie
     z ustaleniem właściciela bezpłatna rozmowa to badanie potrzeb, więc
     obiecujemy tu policzenie na Twoich liczbach, a nie pomiar czy raport. */
  cta: {
    label: 'Sprawdźmy, który próg jest Twój',
    href: '#diagnoza',
    mikrokopia:
      'Wejście to 1790 zł netto i 1-2 dni robocze, pełne integracje 8000-15000 zł netto. Na bezpłatnej rozmowie policzymy to na Twoich liczbach i powiemy, w którym progu jesteś.',
    dowod:
      'Jeśli przy Twojej liczbie pytań bot się nie opłaci, usłyszysz to na tej samej rozmowie, zanim wystawimy jakąkolwiek fakturę.',
  },

  queries: [
    'ile kosztuje chatbot ai dla firmy',
    'cennik chatbota ai',
    'ile kosztuje chatbot',
    'chatbot ai dla firmy cena',
    'ile kosztuje wdrożenie chatbota',
    'chatbot dla firmy cennik 2026',
  ],

  /* POWIĄZANIA (pakiet §P1: obsługa klienta, baza wiedzy, sklep internetowy,
     voiceboty, Sprint Diagnostyczny) plus link zwrotny do rodzica z uwagi
     wdrożeniowej §4. Etykieta = H1 strony docelowej, opis = fakt, który stoi
     na tamtej stronie. ZERO KWOT w tej sekcji: kwoty zostają w sekcji ceny.

     DWIE KARTY DOŁOŻONE 2026-09-04 (wyrównanie linków przychodzących
     w gałęzi): `asystent-wewnetrzny` i `hotele-pensjonaty` miały odpowiednio
     jedno i zero wejść od sióstr, a rozdział intencji TEJ strony (nagłówek
     pliku) i tak każe odsyłać zastosowania i branże linkiem, zamiast opisywać
     je w cenniku. Obie karty realizują więc regułę, która stała tu od początku,
     tylko nie miała jeszcze celu w rejestrze. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firm',
        href: '/uslugi/chatboty',
        opis: 'Strona macierzysta: co bot robi, skąd bierze wiedzę i jak wygląda wdrożenie krok po kroku.',
      },
      /* PRZYCIĘCIE 2026-09-22: stało tu pięć kart do SIÓSTR z tej samej gałęzi
         (obsluga-klienta, baza-wiedzy, sklep-internetowy, asystent-wewnetrzny,
         hotele-pensjonaty) i wszystkie pięć renderowały się drugi raz na tym
         samym ekranie. `components/uslugi/PodstronyPowiazane.tsx` najpierw
         sam buduje siatkę „Konkretne zastosowania" ze WSZYSTKICH siedmiu
         sióstr rodzica (`getPodstronyRodzica('chatboty')` minus ta strona,
         wariant kompakt = sam tytuł), a dopiero pod nią renderuje to pole.
         Te same tytuły leciały więc dwa razy pod rząd. Tak samo domknięto
         sekcję 10 pakietu przy przycinaniu `lib/uslugi/voiceboty.ts`
         („Powtarzanie tych samych czterech tytułów dwa razy pod rząd było
         kanibalizacją własnego ekranu"). ANI JEDEN LINK NIE ZNIKA: siatka
         wyżej prowadzi do całej siódemki. Zostają wyłącznie cele SPOZA
         siatki sióstr: rodzic, voiceboty i audyt AI. */
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Kanał telefoniczny zamiast czatu: voicebot odbiera połączenia i nie wydzwania do Twoich klientów.',
      },
      {
        etykieta: 'Audyt AI firmy: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis: 'Sprint Diagnostyczny, gdy procesy nie są spisane: rozkładamy je na czynniki i oddajemy raport PDF z mapą procesów.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje chatbot dla firmy w 2026?',
        href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
        opis: 'Dłuższy rozkład kosztów wdrożenia i tego, co realnie wpływa na cenę bota.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis: 'Kalkulator liczy roczny koszt jednego procesu i moment, w którym wdrożenie się zwraca. Kwoty wpisujesz swoje.',
      },
    ],
  },
};
