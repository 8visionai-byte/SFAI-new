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
  h1: 'Tworzenie stron WWW widocznych w Google i w AI',
  kapsula:
    'Budujemy strony widoczne nie tylko w Google, ale i w ChatGPT, Claude, Gemini oraz Perplexity. Większość stron jest dla AI niewidoczna, bo treść doczytuje się skryptem, a boty tego nie czytają. My oddajemy całą treść od razu w czystym kodzie, układamy ją pod cytowanie i robimy to szybko.',

  metaTitle: 'Tworzenie stron WWW pod Google i AI',
  metaDescription:
    'Budujemy strony z treścią w kodzie od razu, szybkie i ułożone pod cytowanie w ChatGPT, Claude, Gemini i Perplexity. Widoczność w Google i w AI naraz, mierzona na żywo.',

  problem: {
    h2: 'Dlaczego Twojej strony nie widać w AI?',
    tresc:
      'Coraz więcej ludzi nie wpisuje pytań w Google, tylko pyta ChatGPT albo Perplexity „kto zrobi mi X w mojej okolicy”. Jeśli Twoja strona jest dla tych botów pusta, nie istniejesz w ich odpowiedziach. A bywa pusta z prostego powodu: stoi na kreatorze, który całą treść dorysowuje skryptem już w przeglądarce. Bot wchodzi, widzi puste miejsce i idzie dalej. Twoja konkurencja, której stronę widać, dostaje to polecenie.',
  },

  rozwiazanie: {
    h2: 'Jak budujemy stronę, którą cytuje AI?',
    tresc:
      'Stawiamy stronę tak, że cała treść jest w kodzie przy pierwszym wejściu, a nie doczytywana skryptem. Każdą podstronę zaczynamy od krótkiej, bezpośredniej odpowiedzi na pytanie klienta, dokładamy tabele i konkretne liczby, bo to AI cytuje najchętniej. Dbamy o szybkość, bo wolna strona traci i ludzi, i miejsce w wynikach. Wpuszczamy boty AI tam, gdzie inni je blokują. Na koniec sprawdzamy, czy strona realnie pada w odpowiedziach silników.',
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
      'Cenę liczymy od zakresu i od tego, ile pytań ma „obsługiwać” strona. Inaczej wycenia się prostą wizytówkę, inaczej rozbudowany serwis z wieloma podstronami pod różne frazy. Do tego dochodzi opieka, bo widoczność w AI to nie jednorazowy strzał, tylko rytm aktualizacji. Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
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
};
