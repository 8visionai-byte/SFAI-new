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
 *
 * ── PARTIA GEO 2026-08-19 (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md`
 *    §6.1 oraz §9 etap 2 pkt 7): strona sprzedawała pozycjonowanie pod AI, mając
 *    3 liczby i ZERO dowodów. Dołożone WYŁĄCZNIE z audytu §6.1 i §7:
 *      - Lenart Motors: ChatGPT wskazuje firmę na pytanie o najlepszego blacharza
 *        i lakiernika premium, efekt po OKOŁO 3 TYGODNIACH od zbudowania strony
 *        i wrzucenia jej do sieci,
 *      - Fichtelgebirgshaus.de (DE): pierwsza dziesiątka Google na frazy umówione
 *        z klientem w umowie plus widoczność w GPT,
 *      - Trockenhaus (DE): z NIEWIDOCZNEJ w Google do PIERWSZEJ TRÓJKI na frazę
 *        „Trockenhaus".
 *    Trzy nowe case'y stoją w lib/realizacje (kategoria `optymalizacja`), więc
 *    `powiazane.realizacje` poniżej robi z tego dowód o jedno kliknięcie.
 *    Nazwana też nieużywana przewaga z §7: pracujemy na rynku polskim
 *    i niemieckim (dwa z trzech dowodów GEO to klienci niemieccy).
 *
 * ── OBIEKCJA ZGŁOSZONA, NIE NAPRAWIONA (poza zakresem partii GEO): `cta.dowod`
 *    obiecuje „Zobacz na żywo, w jakich frazach cytuje nas AI", a trasa /dowod
 *    ma w lib/site.ts `live: false` i nie ma dokąd prowadzić. Do decyzji Pawła:
 *    albo postawić /dowod, albo przepisać `cta.dowod` na obietnicę bez „na żywo".
 *    Pole zostaje nietknięte świadomie (cudza własność w tej rundzie).
 */
export const optymalizacja: Usluga = {
  slug: 'optymalizacja',
  dataAktualizacji: '2026-08-19',
  h1: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',

  kapsula:
    'Pozycjonowanie pod AI (GEO) to ustawienie Twojej strony tak, żeby ChatGPT, Claude, Gemini i Perplexity polecały ją w odpowiedziach, a nie tylko Google w wynikach. Nie musisz budować strony od nowa. Bierzemy to, co masz, i naprawiamy trzy rzeczy: czy boty AI w ogóle widzą Twoją treść, czy jest ułożona tak, by dało się ją zacytować, i czy masz autorytet poza własną stroną. Potem mierzymy, czy realnie zaczynasz padać w odpowiedziach. Że to działa, wiemy z konkretu: strona, którą zbudowaliśmy dla Lenart Motors, była wskazywana przez ChatGPT na pytanie o najlepszego blacharza i lakiernika premium po około trzech tygodniach od wrzucenia jej do sieci.',

  metaTitle: 'Pozycjonowanie pod AI: cytowanie w ChatGPT',
  metaDescription:
    'Pozycjonowanie pod AI (GEO): sprawiamy, że ChatGPT, Claude, Gemini i Perplexity polecają Twoją firmę. Cytowalność mierzymy co tydzień w czterech silnikach.',

  problem: {
    h2: 'Klienci pytają AI, a AI poleca kogoś innego?',
    tresc:
      'Ludzie coraz częściej pytają ChatGPT albo Perplexity „polećcie firmę do X”. Jeśli w tych odpowiedziach pada konkurencja, a nie Ty, tracisz klientów, których nawet nie widzisz, bo nigdy do Ciebie nie trafili. Klasyczne pozycjonowanie w Google tego nie załatwia. To inna gra: liczy się, czy Twoja treść jest dla AI czytelna, konkretna i poparta autorytetem z zewnątrz.',
  },

  rozwiazanie: {
    h2: 'Jak sprawiamy, że AI zaczyna Cię cytować?',
    tresc:
      'Najpierw sprawdzamy, czy boty AI w ogóle widzą Twoją stronę, i odblokowujemy je tam, gdzie są blokowane. Potem przepisujemy kluczowe strony na format, który AI cytuje: bezpośrednia odpowiedź na początku, konkretne liczby, tabele, jasne nagłówki-pytania. Dokładamy świeżość, bo AI woli treść aktualną. Na końcu bierzemy się za autorytet poza stroną: wejście do rankingów i zestawień, z których AI bierze rekomendacje. I mierzymy to co tydzień, ręcznie, w czterech silnikach. Mamy z tego trzy wyniki u klientów, każdy z nazwiskiem firmy: Lenart Motors wskazywany przez ChatGPT po około trzech tygodniach, Fichtelgebirgshaus.de w pierwszej dziesiątce Google na frazy z umowy i widoczny w GPT, Trockenhaus z niewidocznej strony w pierwszej trójce na frazę Trockenhaus. Dwa z tych trzech wdrożeń to klienci z rynku niemieckiego, bo pracujemy po polsku i po niemiecku.',
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
    /* PARTIA GEO 2026-08-19: dwa nowe pytania. Nic nie zostało usunięte ani
       przestawione. Liczby WYŁĄCZNIE z audytu §6.1 i §7, każda z kontekstem
       (zasada audytu §10 pkt 2: nigdy sam procent, nigdy sama liczba). */
    {
      pytanie: 'Macie dowód, że to działa?',
      odpowiedz:
        'Mamy trzy, każdy z nazwą klienta. Lenart Motors: ChatGPT wskazywał tę firmę na pytanie o najlepszego blacharza i lakiernika premium, po około trzech tygodniach od zbudowania strony i wrzucenia jej do sieci. Fichtelgebirgshaus.de: pierwsza dziesiątka Google na frazy umówione z klientem w umowie, plus widoczność w GPT. Trockenhaus: z niewidocznej w Google do pierwszej trójki na frazę Trockenhaus. Każdy z tych przypadków opisaliśmy osobno w realizacjach.',
    },
    {
      pytanie: 'Robicie to tylko po polsku?',
      odpowiedz:
        'Nie. Pracujemy na rynku polskim i niemieckim. Dwa z trzech naszych dowodów widoczności w AI to klienci z Niemiec: Fichtelgebirgshaus.de i Trockenhaus. Sposób pracy nad treścią jest ten sam w obu językach, bo silniki AI czytają jedno i drugie i w obu szukają tego samego: konkretu, jasnej struktury i odpowiedzi postawionej wysoko.',
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
    /* PARTIA GEO 2026-08-19: fraza, pod którą pracuje nowy case Lenart Motors.
       Tagi karty biorą pierwsze 3 pozycje (tagiUslugi limit=3), więc dopisek
       na końcu niczego nie zmienia w renderze. */
    'strona cytowana przez ChatGPT',
  ],

  /* v22 (linki §3, P2 #15): strona miała 1 link wychodzący (kontakt) i 2
     wchodzące. `linkPoradnik` zostaje PUSTY świadomie: w rejestrze poradników
     są dziś wyłącznie poradniki cenowe, żaden nie dotyczy widoczności w AI,
     a doklejanie poradnika o cenie chatbota do strony GEO byłoby linkiem
     na siłę. Wchodzi, gdy powstanie poradnik o GEO. */
  powiazane: {
    /* PARTIA GEO 2026-08-19 (audyt §9 etap 2 pkt 7): trzy dowody cytowalności
       o jedno kliknięcie od oferty, w kolejności siły z audytu §6.1. Etykiety
       to h1 nowych case'ów (nigdy nowy slogan), opisy to fakty, które stoją
       na stronie celu. Trasy powstają z rejestru lib/realizacje (SSG), więc
       zero martwych linków. */
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis:
          'Lenart Motors: około trzy tygodnie od wrzucenia strony do sieci do wskazania firmy przez ChatGPT.',
      },
      {
        etykieta: 'Strona w pierwszej dziesiątce Google i widoczna w GPT',
        href: '/realizacje/top10-google-i-widocznosc-w-gpt',
        opis:
          'Fichtelgebirgshaus.de: frazy umówione w umowie w pierwszej dziesiątce Google, plus widoczność w GPT.',
      },
      {
        etykieta: 'Z niewidocznej strony do pierwszej trójki w Google',
        href: '/realizacje/z-niewidocznej-strony-do-top3-google',
        opis:
          'Trockenhaus: z braku widoczności do pierwszej trójki na frazę Trockenhaus.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis:
          'Dziesięć pytań o Twojej stronie pokazuje, czy ChatGPT i Perplexity mogą ją cytować, i co naprawić najpierw.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Tworzenie stron WWW widocznych w Google i w AI',
        href: '/uslugi/strony-www',
        opis:
          'Gdy strony nie da się już naprawić, budujemy nową: cała treść w kodzie od razu, ułożona pod cytowanie.',
      },
    ],
  },
};
