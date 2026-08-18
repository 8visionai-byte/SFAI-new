import type { Realizacja } from './types';

/**
 * CASE 4 — PRZECHWYTYWANIE I ANALIZA ROZMÓW (klient anonimowy).
 * Kategoria: rozwiazania → link wewnętrzny do /uslugi/rozwiazania (aplikacje i wtyczki).
 *
 * Realne dane (zero zmyślania): klient NIENAZWANY (anonimowo), efekt = aplikacja do
 * automatycznej transkrypcji i kategoryzacji rozmów; wyłapuje kluczowe ustalenia
 * biznesowe w lot. UWAGA: brak realnej liczby w danych — NIE wymyślamy metryki
 * liczbowej. Metryki ujmują realny, jakościowy efekt. Głos Pawła, answer-first, zero em-dash.
 */
export const transkrypcjaRozmow: Realizacja = {
  slug: 'transkrypcja-rozmow',
  h1: 'Przechwytywanie i analiza rozmów',
  kategoria: 'rozwiazania',
  klient: 'Klient (anonimowo)',
  branza: 'Usługi B2B',

  kapsula:
    'Zbudowaliśmy aplikację, która sama spisuje rozmowy i porządkuje je tematycznie. Z każdej rozmowy wyłapuje kluczowe ustalenia biznesowe w lot, więc nic ważnego nie ginie w notatkach. Zamiast odsłuchiwać nagrania i przepisywać je ręcznie, zespół dostaje gotowy, pokategoryzowany zapis. Ustalenia są czarno na białym.',

  metaTitle: 'Aplikacja do transkrypcji i analizy rozmów',
  metaDescription:
    'Transkrypcja rozmów AI: aplikacja spisuje i kategoryzuje rozmowy oraz wyłapuje kluczowe ustalenia bez ręcznego odsłuchiwania. Case study wdrożenia.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Ważne ustalenia zapadały podczas rozmów, a potem ginęły. Ktoś coś zanotował, ktoś inny zapamiętał inaczej, a po tygodniu nie było jak odtworzyć, co dokładnie ustalono. Odsłuchiwanie nagrań i ręczne przepisywanie zajmowało zbyt dużo czasu, więc najczęściej nikt tego nie robił. Wiedza z rozmów rozpływała się, zamiast zostawać w firmie.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Zbudowaliśmy aplikację, która automatycznie spisuje rozmowę i od razu porządkuje ją tematycznie. Sama wyłapuje kluczowe ustalenia i wyciąga je na wierzch, więc nie trzeba czytać całego zapisu, żeby dojść do sedna. Zespół dostaje gotowy, pokategoryzowany tekst zamiast surowego nagrania. Ustalenia są w jednym miejscu, do odszukania w kilka sekund.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: 'W lot',
        etykieta: 'aplikacja wyłapuje kluczowe ustalenia biznesowe z rozmowy',
      },
      {
        wartosc: '0',
        etykieta: 'ręcznego odsłuchiwania i przepisywania nagrań',
      },
    ],
    opis:
      'Ustalenia z rozmów przestały ginąć. Aplikacja sama je spisuje, kategoryzuje i wyciąga to, co najważniejsze. Zespół nie odsłuchuje nagrań ani nie przepisuje ich ręcznie, tylko sięga po gotowy zapis i widzi, co zostało ustalone.',
  },

  faq: [
    {
      pytanie: 'Czy aplikacja sama wyłapuje najważniejsze ustalenia?',
      odpowiedz:
        'Tak. Poza spisaniem całej rozmowy aplikacja porządkuje ją tematycznie i wyciąga kluczowe ustalenia biznesowe na wierzch. Dzięki temu nie trzeba czytać całego zapisu, żeby dojść do tego, co zostało uzgodnione.',
    },
    {
      pytanie: 'Co zyskuje zespół zamiast ręcznego przepisywania?',
      odpowiedz:
        'Zamiast odsłuchiwać nagranie i przepisywać je ręcznie, zespół dostaje gotowy, pokategoryzowany zapis. Ustalenia są w jednym miejscu i da się je odszukać w kilka sekund, więc nic ważnego nie ginie po rozmowie.',
    },
  ],

  queries: [
    'aplikacja do transkrypcji rozmów',
    'automatyczna transkrypcja i analiza rozmów',
    'AI do analizy rozmów biznesowych',
    'transkrypcja spotkań AI',
  ],

  /**
   * v22 (PLAN-v22 §3 P2 pkt 11): POWIĄZANIA CASE'A. Przed rundą ten case był
   * ślepym zaułkiem: zero linków do poradnika, który tłumaczy teorię, i zero
   * linków do siostrzanych wdrożeń. Usługę wyznacza `kategoria` i renderuje ją
   * `PowiazanaUsluga`, więc tu jej nie dublujemy. Wszystkie href to realne trasy
   * z rejestrów albo kotwice o potwierdzonym id= na /narzedzia.
   */
  powiazane: {
    poradniki: [
      {
        etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis:
          'Cena agenta i to, po czym poznać, że się zwróci.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Automatyczne podsumowania spotkań',
        href: '/realizacje/auto-podsumowania-spotkan',
        opis:
          'Z nagrania powstaje streszczenie z ustaleniami i listą zadań.',
      },
      {
        etykieta: 'Automatyczne raporty',
        href: '/realizacje/automatyczne-raporty',
        opis:
          'Raport składa się sam z danych, które i tak już macie.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator procesu',
        href: '/narzedzia#kalkulator-procesu',
        opis:
          'Sprawdź, ile trwa jeden Twój proces i ile z niego da się zdjąć.',
      },
    ],
  },
};
