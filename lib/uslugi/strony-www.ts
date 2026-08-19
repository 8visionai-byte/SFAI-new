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
 *  - model opieki/abonamentu (jednorazowo + miesięcznie),
 *  - frazy do scorecardu /dowod (realne pytania, w których cytuje nas AI) → dowód przy CTA.
 *    Do tego czasu dowód = link do żywego scorecardu /dowod (nasza własna strona w 4 silnikach).
 */
export const stronyWww: Usluga = {
  slug: 'strony-www',
  dataAktualizacji: '2026-08-19',
  h1: 'Tworzenie stron WWW widocznych w Google i w AI',
  kapsula:
    'Budujemy strony widoczne nie tylko w Google, ale i w ChatGPT, Claude, Gemini oraz Perplexity. Większość stron jest dla AI niewidoczna, bo treść doczytuje się skryptem, a boty tego nie czytają. My oddajemy całą treść od razu w czystym kodzie, układamy ją pod cytowanie i robimy to szybko.',

  metaTitle: 'Tworzenie stron WWW pod Google i AI',
  metaDescription:
    'Strony www pod AI: treść w kodzie od razu, szybkie i ułożone pod cytowanie w ChatGPT, Claude, Gemini i Perplexity. Widoczność w Google i AI naraz.',

  problem: {
    h2: 'Dlaczego Twojej strony nie widać w AI?',
    tresc:
      'Twojej strony nie widać w AI najczęściej dlatego, że treść dorysowuje się skryptem dopiero w przeglądarce, a boty ChatGPT czy Perplexity skryptów nie wykonują i widzą pustą stronę. Skoro nie mają czego przeczytać, nie mają czego zacytować.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'akapit',
        tekst: 'Coraz więcej ludzi nie wpisuje pytań w Google, tylko pyta ChatGPT albo Perplexity, kto zrobi im X w okolicy. Jeśli Twoja strona jest dla tych botów pusta, nie istniejesz w ich odpowiedziach.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego mojej obecnej strony nie widać w AI?',
        wariant: 'edge',
        akapity: [
          'Powody są zwykle trzy i wszystkie są techniczne. Strona internetowa AI, czyli strona pozycjonowana pod AI, różni się od typowej strony z kreatora dokładnie w tych trzech miejscach.',
        ],
        punkty: [
          'Strona stoi na kreatorze, który całą treść dorysowuje skryptem dopiero w przeglądarce, więc bot widzi puste miejsce.',
          'Brak struktury pod cytowanie: bez bezpośrednich odpowiedzi na pytania klientów, bez tabel i liczb, które AI cytuje najchętniej.',
          'Boty AI bywają blokowane, więc nawet dobra treść nie ma wstępu.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Kończy się to zawsze tak samo: bot wchodzi, widzi pustkę i idzie dalej, a polecenie dostaje konkurencja, której stronę widać.',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jak budujemy stronę, którą cytuje AI?',
    tresc:
      'Budujemy stronę tak, że cała treść jest w kodzie już przy pierwszym wejściu, a nie doczytywana skryptem. Każdą podstronę zaczynamy od krótkiej, bezpośredniej odpowiedzi na pytanie klienta, bo dokładnie taki format AI cytuje najchętniej.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'lista',
        punkty: [
          'Tworzenie stron z AI zaczynamy od techniki: cała treść stoi w kodzie od razu i jest czytelna dla botów, bez doczytywania skryptem.',
          'Treść układamy jako bezpośrednie odpowiedzi na pytania, z tabelami i konkretnymi liczbami, bo to AI cytuje najchętniej.',
          'Szybka strona internetowa to u nas wymóg, nie dodatek: robimy ją lekką, bo wolna strona traci i ludzi, i miejsce w wynikach.',
          'Wpuszczamy boty AI świadomie tam, gdzie inni je blokują.',
          'Po starcie sprawdzamy, czy strona realnie pada w odpowiedziach silników.',
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
        typ: 'sekcja',
        naglowek: 'Trzy strony, które już widać w Google i w AI',
        wariant: 'top',
        chip: 'STRONY WWW',
        akapity: [
          'To realne wyniki klientów z nazwami, nie obietnica terminu. Strona cytowana przez ChatGPT to u nas mierzony efekt, a dwie z tych realizacji to rynek niemiecki: działamy w Polsce i w Niemczech.',
        ],
        punkty: [
          'Lenart Motors: cytowany przez ChatGPT po około 3 tygodniach od publikacji strony.',
          'Fichtelgebirgshaus.de: top10 Google na frazy z umowy plus widoczność w GPT.',
          'Trockenhaus: z niewidocznej do top3 Google.',
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
    tresc:
      'Cenę liczymy od zakresu i od tego, ile pytań ma obsługiwać strona: inaczej wycenia się prostą wizytówkę, inaczej serwis z wieloma podstronami pod różne frazy. Dokładne widełki podajemy na bezpłatnej diagnozie (0 zł, około 30 minut), zanim cokolwiek zamówisz.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Czy zbudujecie stronę szybko? Czasy budowy w dniach',
      },
      {
        typ: 'tabela',
        naglowki: [
          'Zakres strony',
          'Co obejmuje',
          'Czas budowy',
        ],
        wiersze: [
          [
            'Prosty landing',
            'Jedna strona z ofertą i formularzem',
            '1 dzień',
          ],
          [
            'Strona biznesowa',
            'Kilka podstron pod różne pytania klientów',
            '2-4 dni',
          ],
          [
            'Strona zaawansowana',
            'Sklep, wpięte narzędzia',
            '5-10 dni',
          ],
        ],
        wKarcie: true,
        podpis: 'Czas budowy liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
      },
      {
        typ: 'kafle',
        kafle: [
          {
            wartosc: '1-4 dni robocze',
            opis: 'tyle trwały wszystkie dotychczasowe realizacje stron',
            zrodlo: 'czasy budowy z cennika',
          },
          {
            wartosc: '0 zł',
            opis: 'bezpłatna diagnoza, około 30 minut, z listą rzeczy do poprawy',
            zrodlo: 'pierwszy krok przed wyceną',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dwie rundy poprawek w cenie i zero ukrytych kosztów',
        wariant: 'edge',
        chip: 'ZASADA',
        akapity: [
          'Do ceny budowy dochodzi opieka, bo widoczność w AI to nie jednorazowy strzał, tylko rytm aktualizacji. Zakres opieki ustalamy na tej samej bezpłatnej diagnozie.',
        ],
        punkty: [
          'Dwie rundy poprawek w cenie wdrożenia: tydzień testów, poprawki, drugi tydzień testów, poprawki, odbiór.',
          'Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze.',
          'Nowe funkcje to rozbudowa, którą wyceniamy osobno.',
        ],
      },
    ],
    // INPUT PAWŁA: realne "od X zł" za stronę + model opieki → ustawić minPrice (włączy offers w Service JSON-LD).
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
      odpowiedz:
        'Tak, bo budujemy szybko i nie dłubiemy miesiącami. Prosta strona powstaje znacznie szybciej niż rozbudowany serwis. Dokładny termin podajemy na diagnozie, gdy znamy zakres. Szybkość dotyczy też samej strony: robimy ją lekką, żeby ładowała się szybko i nie traciła ludzi ani miejsca w wynikach.',
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
