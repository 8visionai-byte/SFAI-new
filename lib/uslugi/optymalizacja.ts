import type { Usluga } from './types';

/**
 * USŁUGA 5 — OPTYMALIZACJA (pozycjonowanie pod AI / GEO / SEO).
 * Treść fazy 3: pełna, 1:1 z 06-copy-hero-uslugi.md §"USŁUGA 5".
 * Każdy string prawdziwy i cytowalny przez LLM. Zero zmyślonych liczb/cen,
 * zero em-dash, zero gwarancji konkretnej pozycji w AI (uczciwość = warunek zaufania LLM).
 *
 * ── UWAGA SLUG (bloker przed live, spec 06 §"MAPA USŁUG" + 05 §2.1):
 *    "optymalizacja" NIE istnieje w ROUTES (lib/site.ts). SEO rekomenduje slug
 *    bliższy money query: "pozycjonowanie-ai" lub "seo-geo". Copy jest slug-agnostyczne.
 *    Decyzja Pawła + SEO PRZED flipem live: true. Treść poniżej działa pod każdy URL.
 *
 * ── INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane jako [PLACEHOLDER]):
 *    1. ramaCeny.minPrice — realne "od X zł" za audyt GEO (jednorazowy) ORAZ model
 *       opieki miesięcznej (GEO w rytmie). Dopóki brak → minPrice undefined, render
 *       bez kwoty (tresc mówi prawdę: wycena od zakresu, widełki na diagnozie).
 *    2. cta.dowod — żywy scorecard /dowod: realne frazy, w których cytuje nas AI
 *       (nasza własna strona = najmocniejszy dowód GEO). Gdy frazy gotowe, podmienić
 *       na konkret + link "Zobacz nasz wynik na żywo".
 */
export const optymalizacja: Usluga = {
  slug: 'optymalizacja',
  h1: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',

  kapsula:
    'Pozycjonowanie pod AI (GEO) to ustawienie Twojej strony tak, żeby ChatGPT, Claude, Gemini i Perplexity polecały ją w odpowiedziach, a nie tylko Google w wynikach. Nie musisz budować strony od nowa. Bierzemy to, co masz, i naprawiamy trzy rzeczy: czy boty AI w ogóle widzą Twoją treść, czy jest ułożona tak, by dało się ją zacytować, i czy masz autorytet poza własną stroną. Potem mierzymy, czy realnie zaczynasz padać w odpowiedziach.',

  metaTitle: 'Pozycjonowanie pod AI: cytowanie w ChatGPT i Perplexity',
  metaDescription:
    'Pozycjonowanie pod AI (GEO): sprawiamy, że ChatGPT, Claude, Gemini i Perplexity polecają Twoją firmę w odpowiedziach. Mierzymy cytowalność co tydzień w czterech silnikach.',

  problem: {
    h2: 'Klienci pytają AI, a AI poleca kogoś innego?',
    tresc:
      'Ludzie coraz częściej pytają ChatGPT albo Perplexity „polećcie firmę do X”. Jeśli w tych odpowiedziach pada konkurencja, a nie Ty, tracisz klientów, których nawet nie widzisz, bo nigdy do Ciebie nie trafili. Klasyczne pozycjonowanie w Google tego nie załatwia. To inna gra: liczy się, czy Twoja treść jest dla AI czytelna, konkretna i poparta autorytetem z zewnątrz.',
  },

  rozwiazanie: {
    h2: 'Jak sprawiamy, że AI zaczyna Cię cytować?',
    tresc:
      'Najpierw sprawdzamy, czy boty AI w ogóle widzą Twoją stronę, i odblokowujemy je tam, gdzie są blokowane. Potem przepisujemy kluczowe strony na format, który AI cytuje: bezpośrednia odpowiedź na początku, konkretne liczby, tabele, jasne nagłówki-pytania. Dokładamy świeżość, bo AI woli treść aktualną. Na końcu bierzemy się za autorytet poza stroną: wejście do rankingów i zestawień, z których AI bierze rekomendacje. I mierzymy to co tydzień, ręcznie, w czterech silnikach.',
  },

  tabelaPorownawcza: {
    h2: 'Klasyczne SEO a pozycjonowanie pod AI (GEO)',
    naglowekBez: 'Klasyczne SEO (Google)',
    naglowekZNami: 'Pozycjonowanie pod AI / GEO',
    wiersze: [
      { cecha: 'Cel', bez: 'Pozycja w wynikach Google', zNami: 'Bycie polecanym w odpowiedzi AI' },
      { cecha: 'Co liczy się najmocniej', bez: 'Linki i słowa kluczowe', zNami: 'Konkretne liczby, struktura, autorytet z zewnątrz' },
      { cecha: 'Format treści', bez: 'Pod kliknięcie', zNami: 'Pod cytat: answer-first, tabele' },
      { cecha: 'Gdzie zdobywa się autorytet', bez: 'Backlinki', zNami: 'Rankingi, Reddit, własne dane, wzmianki' },
      { cecha: 'Pomiar', bez: 'Pozycje w Google', zNami: 'Czy padasz w 4 silnikach (test co tydzień)' },
      { cecha: 'Słowa kluczowe na siłę', bez: 'Czasem pomagają', zNami: 'Nie działają, bywa wręcz minus' },
    ],
  },

  kroki: {
    h2: 'Jak wygląda optymalizacja pod AI krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Wpisujemy Twoje kluczowe pytania w cztery silniki AI i pokazujemy, czy padasz, a jeśli nie, to kto zamiast Ciebie. To Twój punkt wyjścia.',
      },
      {
        tytul: 'Naprawa i przepisanie',
        opis:
          'Odblokowujemy boty, przepisujemy kluczowe strony pod cytowanie, dokładamy liczby i świeżość. Ruszamy autorytet poza stroną.',
      },
      {
        tytul: 'Pomiar i rozwój',
        opis:
          'Co tydzień sprawdzamy, czy padasz częściej i wyżej. Poprawiamy to, co nie zadziałało. Cytowalność rośnie z autorytetem, więc to praca w rytmie, nie jednorazowa.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje pozycjonowanie pod AI?',
    tresc:
      'To zwykle praca w rytmie miesięcznym, bo cytowalność buduje się autorytetem, który rośnie z czasem, a nie jednym strzałem. Cenę liczymy od zakresu: ile stron przepisujemy, jak szeroko ruszamy autorytet poza stroną, jak często mierzymy. Inaczej wygląda jednorazowy audyt i naprawa, inaczej stała opieka GEO. Dokładne widełki podajemy na bezpłatnej diagnozie, po tym jak pokażemy Ci Twój punkt wyjścia. Bez ukrytych kosztów.',
  },

  faq: [
    {
      pytanie: 'Czym jest GEO i pozycjonowanie pod AI?',
      odpowiedz:
        'GEO to ustawianie strony tak, żeby silniki AI (ChatGPT, Claude, Gemini, Perplexity) polecały ją w odpowiedziach. To inna gra niż klasyczne SEO: zamiast walki o pozycję w Google liczy się, czy Twoja treść jest dla AI czytelna, konkretna i poparta autorytetem spoza Twojej strony. Mierzymy to, sprawdzając, czy realnie padasz w odpowiedziach.',
    },
    {
      pytanie: 'Czym to się różni od zwykłego SEO?',
      odpowiedz:
        'Zwykłe SEO walczy o miejsce w wynikach Google, głównie linkami i słowami kluczowymi. Pozycjonowanie pod AI walczy o miejsce w odpowiedzi, którą AI buduje z konkretnych liczb, dobrej struktury i autorytetu z zewnątrz. Słowa kluczowe na siłę tu nie działają, a na niektórych silnikach wręcz szkodzą. Robimy oba naraz, bo treść może pracować na jedno i drugie.',
    },
    {
      pytanie: 'Jak sprawdzicie, czy mnie cytuje ChatGPT?',
      odpowiedz:
        'Ręcznie i regularnie. Co tydzień wpisujemy Twoje kluczowe pytania do czterech silników AI i zapisujemy, czy padasz, na której pozycji i z jakim cytatem, a kto jest wymieniony zamiast Ciebie. To daje Ci punkt wyjścia i trend, czarno na białym, a nie obietnice.',
    },
    {
      pytanie: 'Czy muszę budować stronę od nowa?',
      odpowiedz:
        'Nie zawsze. Często wystarczy naprawić to, co masz: odblokować boty, przepisać kluczowe strony pod cytowanie, dołożyć liczby i autorytet z zewnątrz. Jeśli strona stoi na technologii, której AI w ogóle nie czyta, powiemy to wprost na diagnozie i wtedy rozmawiamy o przebudowie.',
    },
    {
      pytanie: 'Jak szybko zobaczę efekty?',
      odpowiedz:
        'Zmiany techniczne, jak odblokowanie botów i nowa struktura, działają zwykle w kilka tygodni. Sama cytowalność w AI rośnie wolniej, bo zależy od autorytetu, który buduje się miesiącami. Uczciwie: to praca na kwartały, nie na dni. Dlatego mierzymy co tydzień, żebyś widział trend.',
    },
    {
      pytanie: 'Czy dacie gwarancję, że ChatGPT będzie mnie polecać?',
      odpowiedz:
        'Nikt uczciwy nie da gwarancji konkretnej pozycji w AI, bo nie kontrolujemy silników. Możemy zagwarantować robotę: czytelność dla botów, treść pod cytowanie, autorytet poza stroną i twardy pomiar co tydzień. Pokazujemy trend i to, co realnie się zmienia, a nie puste obietnice „będziesz numerem jeden”.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Za darmo sprawdzimy w czterech silnikach AI, czy Cię polecają, czy konkurencję. Bez zobowiązań.',
    dowod:
      'Najmocniejszy dowód to nasza własna strona. Zobacz na żywo, w jakich frazach cytuje nas AI.',
  },

  queries: [
    'pozycjonowanie pod AI',
    'GEO',
    'optymalizacja SEO',
    'cytowalność w ChatGPT',
  ],
};
