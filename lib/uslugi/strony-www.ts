import type { Usluga } from './types';

/**
 * USŁUGA 4 — STRONY WWW (tworzenie stron z AI, pod SEO/GEO).
 * Treść pełna (faza 3) wg 06-copy-hero-uslugi.md §"USŁUGA 4".
 * Ta strona = żywy dowód: jest zbudowana dokładnie tak, jak opisuje (SSG + schema
 * + answer-first), więc każdy claim jest weryfikowalny na niej samej.
 *
 * UWAGA SLUG: tu "strony-www"; IA 01 / ROUTES używa "strony-seo-geo".
 * Decyzja ujednolicenia URL = INPUT PAWŁA + SEO (spec 06 §"MAPA USŁUG") PRZED live.
 *
 * INPUT PAWŁA (przed shipem):
 *  - realne widełki "od X zł" za stronę → ustawić ramaCeny.minPrice (włączy offers w Service JSON-LD),
 *    ZAŁATWIONE 2026-08-31: minPrice = 1590 (patrz niżej),
 *  - model opieki/abonamentu (jednorazowo + miesięcznie),
 *  - frazy do scorecardu /dowod (realne pytania, w których cytuje nas AI) → dowód przy CTA.
 *    Do tego czasu dowód = link do żywego scorecardu /dowod (nasza własna strona w 4 silnikach).
 *
 * ── CENY STRON DOPISANE 2026-08-31 (decyzja właściciela z tego samego dnia).
 *    POWÓD: kwoty za te same trzy pozycje stały już w `lib/uslugi/optymalizacja.ts`
 *    (sekcja N8, tabela cennika) i w podstronach GEO, a strona usługi o stronach
 *    WWW podawała WYŁĄCZNIE czasy realizacji. Klient czytający stronę usługi nie
 *    poznawał kwoty, którą sąsiednia strona podaje wprost.
 *    KWOTY (żadnej nie wymyślono, wszystkie 1:1 z optymalizacja.ts §N8):
 *      landing 1590 zł netto / 1 dzień roboczy,
 *      strona biznesowa 2900 zł netto / 2-4 dni robocze,
 *      strona zaawansowana od 5900 zł netto / 5-10 dni roboczych.
 *    GDZIE STANĘŁY: wyłącznie tam, gdzie już stały czasy realizacji, żeby cena
 *    i czas szły w parze: pas metryk sekcji ceny, trzy opcje przełącznika
 *    "strony-www-zakres" (podtytuł i nagłówek) oraz nowa kolumna „Cena"
 *    w tabeli czasów. Struktura sekcji bez zmian, nic nie przepisano.
 *    `minPrice` = 1590, `cenaStala` CELOWO NIEUSTAWIONE: to trzy różne pozycje,
 *    a najwyższa jest „od", więc prefiks „od " w renderze jest poprawny.
 *    DOPRECYZOWANE, NIE USUNIĘTE: `ramaCeny.tresc` i FAQ „Czy zbudujecie stronę
 *    szybko?" mówiły, że kwotę i termin poznasz dopiero na diagnozie. Teraz
 *    mówią, że trzy pozycje o ustalonym zakresie mają ceny wprost, a diagnoza
 *    służy do dobrania zakresu i wyceny tego, co poza nie wychodzi.
 *    metaDescription: dopisana kwota wejściowa (mieści się w limicie 160 znaków).
 */
export const stronyWww: Usluga = {
  slug: 'strony-www',
  /* 2026-08-31: data bumpnięta z '2026-08-21', bo zmieniła się treść widoczna
     dla klienta (ceny trzech pozycji, tekst sekcji ceny, FAQ, opis meta).
     Pole jest źródłem `lastmod` w sitemap.xml (app/sitemap.ts). */
  dataAktualizacji: '2026-08-31',
  h1: 'Tworzenie stron WWW widocznych w Google i w AI',
  kapsula:
    'Budujemy strony widoczne nie tylko w Google, ale i w ChatGPT, Claude, Gemini oraz Perplexity. Większość stron jest dla AI niewidoczna, bo treść doczytuje się skryptem, a boty tego nie czytają. My oddajemy całą treść od razu w czystym kodzie, układamy ją pod cytowanie i robimy to szybko.',

  metaTitle: 'Tworzenie stron WWW pod Google i AI',
  /* 2026-08-31: dopisana kwota wejściowa (landing 1590 zł netto), bo opis
     bez liczby nie dawał powodu do kliknięcia, a kwota stoi teraz wprost
     w sekcji ceny. Skrócone „szybkie i ułożone" do „ułożona", żeby zmieścić
     się w limicie: 146 znaków przed, 153 po (limit kontraktu: 160). */
  metaDescription:
    'Strony www pod AI od 1590 zł netto: treść w kodzie od razu, ułożona pod cytowanie w ChatGPT, Claude, Gemini i Perplexity. Widoczność w Google i AI naraz.',

  problem: {
    h2: 'Dlaczego Twojej strony nie widać w AI?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Twojej strony nie widać w AI najczęściej dlatego, że treść dorysowuje się skryptem dopiero w przeglądarce, a boty ChatGPT czy Perplexity skryptów nie wykonują i widzą pustą stronę. Skoro nie mają czego przeczytać, nie mają czego zacytować.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '4 silniki AI',
            opis: 'ChatGPT, Claude, Gemini i Perplexity szukają odpowiedzi u kogoś, kogo widzą',
            zrodlo: 'z kapsuły tej strony',
            ton: 'cyan',
          },
          {
            wartosc: '0 zł',
            opis: 'tyle kosztuje sprawdzenie, czy Twoją stronę widać w AI, około 30 minut i konkretna lista rzeczy do poprawy',
            zrodlo: 'bezpłatna diagnoza opisana w sekcji o cenie',
            ton: 'amber',
          },
          {
            wartosc: 'około 3 tygodnie',
            opis: 'tyle minęło, zanim ChatGPT zaczął cytować Lenart Motors; to wynik jednego klienta, nie obiecywany termin',
            zrodlo: 'realizacja Lenart Motors w sekcji niżej',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Dlaczego mojej obecnej strony nie widać w AI?',
        ikona: 'lupa-wykres',
        chip: 'DIAGNOZA',
        overline: 'TRZY POWODY · WSZYSTKIE TECHNICZNE',
      },
      {
        typ: 'akapit',
        tekst: 'Powody są zwykle trzy i wszystkie są techniczne. Strona internetowa AI, czyli strona pozycjonowana pod AI, różni się od typowej strony z kreatora dokładnie w tych trzech miejscach.',
      },
      {
        typ: 'lista',
        punkty: [
          'Strona stoi na kreatorze, który całą treść dorysowuje skryptem dopiero w przeglądarce, więc bot widzi puste miejsce.',
          'Brak struktury pod cytowanie: bez bezpośrednich odpowiedzi na pytania klientów, bez tabel i liczb, które AI cytuje najchętniej.',
          'Boty AI bywają blokowane, więc nawet dobra treść nie ma wstępu.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co się dzieje, gdy bot wchodzi na pustą stronę?',
        wariant: 'edge',
        chip: 'STRONY WWW',
        akapity: [
          'Coraz więcej ludzi nie wpisuje pytań w Google, tylko pyta ChatGPT albo Perplexity, kto zrobi im X w okolicy. Jeśli Twoja strona jest dla tych botów pusta, nie istniejesz w ich odpowiedziach.',
          'Kończy się to zawsze tak samo: bot wchodzi, widzi pustkę i idzie dalej, a polecenie dostaje konkurencja, której stronę widać.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jak budujemy stronę, którą cytuje AI?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Budujemy stronę tak, że cała treść jest w kodzie już przy pierwszym wejściu, a nie doczytywana skryptem. Każdą podstronę zaczynamy od krótkiej, bezpośredniej odpowiedzi na pytanie klienta, bo dokładnie taki format AI cytuje najchętniej.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co robimy inaczej niż kreator stron?',
        ikona: 'glob-siatka',
        chip: 'SEO + GEO',
        overline: 'TREŚĆ W KODZIE · ANSWER-FIRST',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Treść w kodzie od razu',
            akapity: [
              'Tworzenie stron z AI zaczynamy od techniki: cała treść stoi w kodzie od razu i jest czytelna dla botów, bez doczytywania skryptem.',
            ],
          },
          {
            naglowek: 'Answer-first, tabele i liczby',
            akapity: [
              'Treść układamy jako bezpośrednie odpowiedzi na pytania, z tabelami i konkretnymi liczbami, bo to AI cytuje najchętniej.',
            ],
          },
          {
            naglowek: 'Szybka strona internetowa',
            akapity: [
              'Szybka strona internetowa to u nas wymóg, nie dodatek: robimy ją lekką, bo wolna strona traci i ludzi, i miejsce w wynikach.',
            ],
          },
          {
            naglowek: 'Boty wpuszczone świadomie',
            akapity: [
              'Wpuszczamy boty AI świadomie tam, gdzie inni je blokują.',
            ],
          },
          {
            naglowek: 'Pomiar po starcie',
            akapity: [
              'Po starcie sprawdzamy, czy strona realnie pada w odpowiedziach silników.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy strona będzie widoczna też w zwykłym Google?',
        wariant: 'quiet',
        akapity: [
          'Tak. Robimy jedno i drugie naraz: klasyczne pozycjonowanie w Google i widoczność w odpowiedziach AI. Strona pod SEO/GEO to jeden projekt, nie dwa osobne.',
          'Ta sama, dobrze ułożona treść pracuje na oba kanały. Nie wybierasz między Google a ChatGPT, masz oba.',
        ],
      },
      {
        typ: 'przelacznik',
        grupa: 'strony-www-realizacje',
        opcje: [
          {
            numer: 'REALIZACJA 1',
            tytul: 'Lenart Motors',
            podtytul: 'cytowany przez ChatGPT',
            naglowek: 'ChatGPT zaczął cytować Lenart Motors po około 3 tygodniach od publikacji strony.',
            akapity: [
              'To zmierzony wynik jednego klienta, a nie termin, który obiecujemy przy kolejnych wdrożeniach. Pokazujemy go, bo widoczność w AI da się sprawdzić, a nie tylko zadeklarować.',
              'Dokładnie tak wygląda strona cytowana przez ChatGPT: model ma co przeczytać i ma co podać dalej. Nie było w tym żadnej sztuczki, tylko treść dostępna w kodzie od pierwszego wejścia bota i ułożona jako bezpośrednie odpowiedzi na pytania klientów.',
            ],
            punkty: [
              'Zakres: strona WWW z treścią w kodzie od pierwszego wejścia.',
            ],
          },
          {
            numer: 'REALIZACJA 2',
            tytul: 'Fichtelgebirgshaus.de',
            podtytul: 'top10 Google plus GPT',
            naglowek: 'Fichtelgebirgshaus.de jest w top10 Google na frazy z umowy i widoczny w GPT.',
            akapity: [
              'To ten sam projekt na dwa kanały: uzgodnione w umowie frazy w Google i obecność w odpowiedziach modelu. Nie budowaliśmy dwóch osobnych stron.',
              'Działamy na rynku polskim i niemieckim, a dwie z naszych realizacji stron to firmy niemieckie. Jeśli sprzedajesz też za granicą, robimy to samo dla tamtego rynku.',
            ],
          },
          {
            numer: 'REALIZACJA 3',
            tytul: 'Trockenhaus',
            podtytul: 'z niewidocznej do top3',
            naglowek: 'Trockenhaus przeszedł z niewidocznej strony do top3 w Google.',
            akapity: [
              'Poza stroną zbudowaliśmy tam narzędzie do kosztorysowania i chatbota. Oferta powstaje w około 20 minut zamiast 2 do 4 godzin, a rachunek w około 5 minut zamiast godziny.',
              'Mówimy wprost, jaka to skala: mała firma, od 1 do 8 ofert i od 1 do 5 rachunków miesięcznie. Liczby mają być prawdziwe, a nie duże.',
            ],
          },
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Strona z kreatora a strona pod SEO i AI',
    naglowekBez: 'Typowa strona z kreatora',
    naglowekZNami: 'Strona od SimpleFast.ai',
    wiersze: [
      { cecha: 'Treść dla botów', bez: 'Doczytywana skryptem, często pusta', zNami: 'W kodzie od razu, czytelna dla AI' },
      { cecha: 'Widoczność w ChatGPT/Perplexity', bez: 'Przypadkowa albo żadna', zNami: 'Budowana celowo, mierzona' },
      { cecha: 'Szybkość', bez: 'Zwykle ciężka', zNami: 'Lekka, szybka' },
      { cecha: 'Struktura pod cytowanie', bez: 'Brak', zNami: 'Answer-first, tabele, liczby' },
      { cecha: 'Boty AI', bez: 'Często blokowane', zNami: 'Wpuszczone świadomie' },
      { cecha: 'Dowód efektu', bez: '„Wygląda ładnie”', zNami: 'Sprawdzamy, czy AI Cię poleca' },
    ],
  },

  kroki: {
    h2: 'Jak powstaje strona krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Patrzymy na Twoją obecną stronę i na pytania, pod które chcesz być widoczny. Mówimy wprost, co jest do naprawy i co da największy efekt.',
      },
      {
        tytul: 'Budowa',
        opis:
          'Stawiamy stronę z treścią w kodzie, szybką, ułożoną pod cytowanie w AI. Piszemy ją ludzkim językiem, bez żargonu, w Twoim tonie.',
      },
      {
        tytul: 'Pomiar i rozwój',
        opis:
          'Po starcie sprawdzamy, czy strona pada w odpowiedziach Google i silników AI, i poprawiamy to, co nie zaskoczyło. Strona żyje, nie stoi.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje strona pod SEO i AI?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    /* 2026-08-31: zdanie mówiło, że widełki poznasz dopiero na diagnozie,
       a trzy pozycje o ustalonym zakresie mają dziś twarde kwoty w tej samej
       sekcji. DOPRECYZOWANE, NIE USUNIĘTE: diagnoza dalej jest pierwszym
       krokiem, tylko służy do dobrania zakresu, a nie do poznania ceny
       landingu czy strony biznesowej. */
    tresc:
      'Trzy zakresy o ustalonej zawartości mają ceny wprost: landing 1590 zł netto, strona biznesowa 2900 zł netto, strona zaawansowana od 5900 zł netto. Powyżej tych zakresów cena zależy od tego, ile pytań klientów ma obsłużyć strona i co dochodzi poza nią. Zakres dobieramy na bezpłatnej diagnozie (0 zł, około 30 minut), zanim cokolwiek zamówisz.',
    minPrice: 1590,
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '0 zł',
            opis: 'bezpłatna diagnoza, około 30 minut, z listą rzeczy do poprawy',
            zrodlo: 'pierwszy krok przed wyceną',
            ton: 'cyan',
          },
          /* 2026-08-31: do kafla czasu landingu dopisana jego cena, bo to
             jedyny kafel z konkretnym zakresem, a czas bez kwoty nie mówił
             klientowi, ile to kosztuje. Kafel „1-4 dni robocze" zostaje bez
             kwoty: mówi o dwóch różnych zakresach naraz, więc jedna kwota
             byłaby tam nieprawdą. */
          {
            wartosc: '1 dzień',
            opis: 'tyle trwa budowa prostego landingu z ofertą i formularzem, za 1590 zł netto',
            zrodlo: 'pierwszy wiersz tabeli cen i czasów niżej',
            ton: 'green',
          },
          {
            wartosc: '1-4 dni robocze',
            opis: 'tyle realnie trwały nasze dotychczasowe wdrożenia stron, przy zakresie do strony biznesowej',
            zrodlo: 'nasze dotychczasowe realizacje, tabela cen i czasów niżej',
            ton: 'amber',
          },
          {
            wartosc: '2 rundy poprawek',
            opis: 'tyle jest w cenie wdrożenia, zanim odbierzesz stronę',
            zrodlo: 'zasada opisana na dole sekcji',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Czy zbudujecie stronę szybko?',
        ikona: 'kalendarz-check',
        chip: 'CZASY BUDOWY',
        overline: 'TRZY ZAKRESY · CENA I CZAS W DNIACH ROBOCZYCH',
      },
      /* 2026-08-31: do każdej z trzech opcji dopisana jej cena, dokładnie tam,
         gdzie stał już czas budowy (podtytuł i zdanie nagłówka). Kwoty 1:1
         z tabelą cennika w lib/uslugi/optymalizacja.ts §N8. */
      {
        typ: 'przelacznik',
        grupa: 'strony-www-zakres',
        opcje: [
          {
            numer: 'ZAKRES 1',
            tytul: 'Prosty landing',
            podtytul: '1590 zł netto, 1 dzień',
            naglowek: 'Prosty landing z ofertą i formularzem budujemy w 1 dzień, za 1590 zł netto.',
            akapity: [
              'Jedna strona, jedna odpowiedź na jedno pytanie klienta i formularz. Treść stoi w kodzie od razu, więc bot ma co przeczytać już pierwszego dnia.',
            ],
            punkty: [
              'Jedna strona z ofertą i formularzem.',
              'Pierwszy akapit to od razu bezpośrednia odpowiedź na pytanie klienta, bo taki format cytuje AI.',
            ],
          },
          {
            numer: 'ZAKRES 2',
            tytul: 'Strona biznesowa',
            podtytul: '2900 zł netto, 2-4 dni',
            naglowek: 'Stronę biznesową z kilkoma podstronami budujemy w 2-4 dni, za 2900 zł netto.',
            akapity: [
              'Każda podstrona odpowiada na inne pytanie klienta i zaczyna się od krótkiej, bezpośredniej odpowiedzi. Tak układa się treść, którą AI cytuje najchętniej.',
            ],
            punkty: [
              'Kilka podstron pod różne pytania klientów.',
              'Tabele i liczby tam, gdzie ułatwiają cytowanie.',
            ],
          },
          {
            numer: 'ZAKRES 3',
            tytul: 'Strona zaawansowana',
            podtytul: 'od 5900 zł netto, 5-10 dni',
            naglowek: 'Stronę zaawansowaną ze sklepem i wpiętymi narzędziami budujemy w 5-10 dni, od 5900 zł netto.',
            akapity: [
              'Tu dochodzi sklep albo narzędzia wpięte w stronę, więc pracy jest więcej niż przy wizytówce. Dlatego ta pozycja startuje od 5900 zł netto, a dokładną kwotę i termin podajemy, gdy znamy zakres. Zakres ustalamy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
            ],
            punkty: [
              'Sklep, wpięte narzędzia.',
              'Dokładną kwotę i termin podajemy, gdy znamy zakres.',
            ],
          },
        ],
      },
      /* 2026-08-31: tabela miała trzy kolumny i podawała wyłącznie czas budowy.
         Dołożona kolumna „Cena", tuż przed czasem, żeby jedno i drugie stało
         w tym samym wierszu. Kwoty 1:1 z tabelą cennika
         w lib/uslugi/optymalizacja.ts §N8, wiersze i podpis bez zmian poza
         dopiskiem o cenach netto. */
      {
        typ: 'tabela',
        naglowki: [
          'Zakres strony',
          'Dla kogo to jest',
          'Cena',
          'Czas budowy',
        ],
        wiersze: [
          [
            'Prosty landing',
            'jedna oferta, jeden formularz',
            '1590 zł netto',
            '1 dzień',
          ],
          [
            'Strona biznesowa',
            'kilka pytań klientów, kilka podstron',
            '2900 zł netto',
            '2-4 dni',
          ],
          [
            'Strona zaawansowana',
            'sprzedaż online albo narzędzie wpięte w stronę',
            'od 5900 zł netto',
            '5-10 dni',
          ],
        ],
        wKarcie: true,
        podpis: 'Wszystkie ceny są netto. Czas budowy liczymy od przekazania kompletu materiałów, nie od podpisania umowy. Dotychczasowe realizacje mieściły się w 1-4 dniach roboczych; 5-10 dni dotyczy zakresu ze sklepem i wpiętymi narzędziami.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dwie rundy poprawek w cenie i zero ukrytych kosztów',
        wariant: 'edge',
        chip: 'ZASADA',
        akapity: [
          'Do ceny budowy dochodzi opieka, bo widoczność w AI to nie jednorazowy strzał, tylko rytm aktualizacji. Zakres opieki ustalamy na tej samej bezpłatnej diagnozie.',
          'Po odbiorze masz dwie drogi i obie są uczciwe. Przekazujemy Ci stronę i wtedy nie płacisz nam abonamentu, albo zostaje pod naszą opieką i wtedy jest stała opłata miesięczna. Kwotę podajemy przy wycenie, zanim zdecydujesz.',
        ],
        punkty: [
          'Dwie rundy poprawek w cenie wdrożenia: tydzień testów, poprawki, drugi tydzień testów, poprawki, odbiór.',
          'Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze.',
          'Nowe funkcje to rozbudowa, którą wyceniamy osobno.',
        ],
      },
    ],
  },

  faq: [
    {
      pytanie: 'Co to znaczy, że strona jest „pod AI”?',
      odpowiedz:
        'To znaczy, że jest zbudowana tak, żeby ChatGPT, Claude, Gemini i Perplexity mogły ją przeczytać i zacytować w odpowiedzi. Treść jest w kodzie od razu, ułożona jako bezpośrednie odpowiedzi na pytania, z tabelami i liczbami. Boty AI mają wstęp, a my sprawdzamy, czy strona realnie pada w ich odpowiedziach.',
    },
    {
      pytanie: 'Dlaczego mojej obecnej strony nie widać w AI?',
      odpowiedz:
        'Najczęściej dlatego, że stoi na kreatorze, który doczytuje treść skryptem dopiero w przeglądarce. Bot AI tego nie wykonuje i widzi pustą stronę. Drugi powód to brak struktury pod cytowanie i blokada botów. Sprawdzamy to na bezpłatnej diagnozie.',
    },
    {
      pytanie: 'Czy zbudujecie stronę szybko?',
      /* 2026-08-31: odpowiedź mówiła „dokładny termin podajemy na diagnozie",
         a strona podaje dziś czasy i kwoty trzech zakresów wprost.
         DOPRECYZOWANE, NIE USUNIĘTE: konkrety stoją w odpowiedzi, diagnoza
         zostaje dla zakresu, który poza te trzy pozycje wychodzi. */
      odpowiedz:
        'Tak, bo budujemy szybko i nie dłubiemy miesiącami. Prosty landing to 1 dzień roboczy i 1590 zł netto, strona biznesowa 2-4 dni i 2900 zł netto, strona zaawansowana ze sklepem lub wpiętymi narzędziami 5-10 dni i od 5900 zł netto. Przy zakresie spoza tych trzech pozycji dokładny termin podajemy na diagnozie. Szybkość dotyczy też samej strony: robimy ją lekką, żeby ładowała się szybko i nie traciła ludzi ani miejsca w wynikach.',
    },
    {
      pytanie: 'Czy strona będzie widoczna też w zwykłym Google?',
      odpowiedz:
        'Tak. Robimy jedno i drugie naraz: klasyczne pozycjonowanie w Google i widoczność w odpowiedziach AI. Ta sama treść, dobrze ułożona, pracuje na oba kanały. Nie wybierasz między Google a ChatGPT, masz oba.',
    },
    {
      pytanie: 'Czy mogę później sam edytować treść?',
      odpowiedz:
        'Tak. Oddajemy stronę z prostym sposobem na zmiany, żebyś nie był od nas zależny przy każdej literówce. Większe zmiany pod widoczność w AI lepiej robić z nami, ale bieżące treści ogarniesz sam. Pokazujemy, jak.',
    },
    {
      pytanie: 'Czy dane z formularzy na stronie są bezpieczne?',
      odpowiedz:
        'Tak. Dane z formularzy przetwarzamy zgodnie z RODO, zostają w Unii Europejskiej, a stronę stawiamy z zabezpieczeniami i zgodami od początku. Klient od razu wie, na co się zgadza. Bezpieczeństwo to część jakości, nie dodatek.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy za darmo, czy Twoją stronę widać w AI i co da się poprawić. Bez zobowiązań.',
    dowod:
      'Najmocniejszy dowód to nasza własna strona, widoczna w czterech silnikach AI. Zobacz nasz wynik na żywo.',
  },

  queries: [
    'tworzenie stron z AI',
    'strona internetowa AI',
    'strona pod SEO/GEO',
    'strona pozycjonowana pod AI',
  ],

  /* v22 (linki §3, P2 #15): strona miała 1 link wychodzący (kontakt) i 2
     wchodzące, najsłabszy wynik wśród usług. `linkPoradnik` zostaje PUSTY
     świadomie (patrz komentarz w optymalizacja.ts): nie ma poradnika o stronach
     ani o GEO, a poradnik cenowy o chatbocie byłby linkiem na siłę. */
  powiazane: {
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis:
          'Sprawdź na swojej obecnej stronie, czy AI ma co cytować, zanim zdecydujesz o budowie nowej.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis:
          'Gdy stronę da się uratować, nie budujemy nowej, tylko naprawiamy widoczność na tym, co masz.',
      },
    ],
  },
};
