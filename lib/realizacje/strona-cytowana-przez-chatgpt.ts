import type { Realizacja } from './types';

/**
 * CASE 9 — STRONA CYTOWANA PRZEZ CHATGPT (Lenart Motors).
 * Kategoria: optymalizacja → link wewnętrzny do /uslugi/optymalizacja.
 *
 * ŹRÓDŁO DANYCH: `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md`
 *   §6.1 (dowody GEO) + §7 (tabela 11 nazwanych klientów, zgody są).
 *   Fakty użyte tutaj i NIGDZIE poza nimi:
 *     - ChatGPT wskazuje Lenart Motors na pytanie o najlepszego blacharza
 *       i lakiernika premium,
 *     - efekt po OKOŁO 3 TYGODNIACH od zbudowania strony i wrzucenia do sieci,
 *     - zakres wdrożenia: strona WWW pod pozycjonowanie w ChatGPT (§7).
 *
 * CZEGO AUDYT NIE DAJE (i czego dlatego NIE MA w treści): liczby zapytań,
 * ruchu, konwersji ani przychodu z tej ścieżki. Wzorzec uczciwości z §6.6:
 * brak liczby zapisujemy wprost, zamiast dorabiać procent.
 * Zero em-dash, zero zmyślonych liczb, głos Pawła, answer-first.
 */
export const stronaCytowanaPrzezChatgpt: Realizacja = {
  slug: 'strona-cytowana-przez-chatgpt',
  h1: 'Strona cytowana przez ChatGPT po trzech tygodniach',
  kategoria: 'optymalizacja',
  klient: 'Lenart Motors',
  branza: 'Blacharstwo i lakiernictwo',

  kapsula:
    'Zbudowaliśmy dla Lenart Motors stronę pod pozycjonowanie w ChatGPT i wrzuciliśmy ją do sieci. Po około trzech tygodniach ChatGPT wskazywał tę firmę w odpowiedzi na pytanie o najlepszego blacharza i lakiernika premium. To nasz najkonkretniejszy dowód na to, że stronę da się ułożyć tak, żeby model AI ją przeczytał i podał dalej.',

  metaTitle: 'Strona cytowana przez ChatGPT po 3 tygodniach',
  metaDescription:
    'Strona zbudowana pod pozycjonowanie w ChatGPT: po około trzech tygodniach od publikacji AI wskazywała Lenart Motors na pytanie o blacharza premium.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Lenart Motors pracuje w segmencie premium. To rynek, na którym klient nie porównuje najniższej ceny, tylko szuka kogoś, komu zaufa przy drogim aucie. Takie pytanie coraz częściej nie idzie już do wyszukiwarki, tylko do ChatGPT: kto zrobi to najlepiej. Zadanie brzmiało więc wprost: zbudować stronę tak, żeby w takiej odpowiedzi padała ta firma.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Zbudowaliśmy stronę od razu pod czytanie przez AI, a nie tylko pod wyniki Google. Treść siedzi w kodzie strony, więc bot widzi ją bez uruchamiania skryptów. Zakres usług jest opisany konkretem, a nie hasłami, bo model cytuje to, co da się zacytować. Potem wypuściliśmy stronę do sieci i sprawdzaliśmy, kiedy zacznie padać w odpowiedziach.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: '3 tygodnie',
        etykieta:
          'około tyle minęło od wrzucenia strony do sieci do wskazania firmy przez ChatGPT',
      },
      {
        wartosc: 'ChatGPT',
        etykieta:
          'wskazuje firmę na pytanie o najlepszego blacharza i lakiernika premium',
      },
    ],
    opis:
      'Po około trzech tygodniach od wrzucenia strony do sieci ChatGPT wskazywał Lenart Motors na pytanie o najlepszego blacharza i lakiernika premium. Nie mamy liczby zapytań, które przyszły tą drogą, i jej nie dorabiamy. Mamy natomiast twardy fakt: firma pada w odpowiedzi AI na pytanie zakupowe, czyli w miejscu, do którego klient trafia, zanim w ogóle otworzy wyszukiwarkę.',
  },

  faq: [
    {
      pytanie: 'Po jakim czasie ChatGPT zaczął wskazywać tę firmę?',
      odpowiedz:
        'Po około trzech tygodniach od zbudowania strony i wrzucenia jej do sieci. To jeden konkretny przypadek, a nie obietnica terminu. Czas zależy od tego, jak wygląda strona na starcie, jak zatłoczona jest fraza i jak szybko silniki zaciągną nową treść.',
    },
    {
      pytanie: 'Czy gwarantujecie, że ChatGPT będzie polecał moją firmę?',
      odpowiedz:
        'Nie. Nikt uczciwy nie da takiej gwarancji, bo nie kontrolujemy silników AI. Gwarantujemy robotę: stronę czytelną dla botów, treść ułożoną pod cytowanie i pomiar, który czarno na białym pokazuje, czy realnie zaczynasz padać w odpowiedziach.',
    },
  ],

  queries: [
    'strona cytowana przez ChatGPT',
    'pozycjonowanie strony pod ChatGPT',
    'jak trafić do odpowiedzi ChatGPT',
    'pozycjonowanie pod AI case study',
  ],

  /**
   * POWIĄZANIA CASE'A. Usługę wyznacza `kategoria` (optymalizacja) i renderuje
   * ją `PowiazanaUsluga`, więc tu jej nie dublujemy. Linkujemy dwa siostrzane
   * dowody GEO (audyt §6.1) i narzędzie, którym czytelnik sprawdzi to u siebie.
   * Wszystkie href to realne trasy z rejestrów albo kotwica o potwierdzonym id=.
   */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Strona w pierwszej dziesiątce Google i widoczna w GPT',
        href: '/realizacje/top10-google-i-widocznosc-w-gpt',
        opis: 'Klient z rynku niemieckiego: frazy z umowy plus widoczność w GPT.',
      },
      {
        etykieta: 'Z niewidocznej strony do pierwszej trójki w Google',
        href: '/realizacje/z-niewidocznej-strony-do-top3-google',
        opis: 'Jednoosobowa firma, która wcześniej w Google nie istniała.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis: 'Dziesięć pytań pokazuje, czy ChatGPT może zacytować Twoją stronę.',
      },
    ],
  },
};
