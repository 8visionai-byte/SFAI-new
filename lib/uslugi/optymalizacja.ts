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
  dataAktualizacji: '2026-08-21',
  h1: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',

  kapsula:
    'Pozycjonowanie pod AI (GEO) to ustawienie Twojej strony tak, żeby ChatGPT, Claude, Gemini i Perplexity polecały ją w odpowiedziach, a nie tylko Google w wynikach. Nie musisz budować strony od nowa. Bierzemy to, co masz, i naprawiamy trzy rzeczy: czy boty AI w ogóle widzą Twoją treść, czy jest ułożona tak, by dało się ją zacytować, i czy masz autorytet poza własną stroną. Potem mierzymy, czy realnie zaczynasz padać w odpowiedziach. Że to działa, wiemy z konkretu: strona, którą zbudowaliśmy dla Lenart Motors, była wskazywana przez ChatGPT na pytanie o najlepszego blacharza i lakiernika premium po około trzech tygodniach od wrzucenia jej do sieci.',

  metaTitle: 'Pozycjonowanie pod AI: cytowanie w ChatGPT',
  metaDescription:
    'Pozycjonowanie pod AI (GEO): sprawiamy, że ChatGPT, Claude, Gemini i Perplexity polecają Twoją firmę. Cytowalność mierzymy co tydzień w czterech silnikach.',

  problem: {
    h2: 'Klienci pytają AI, a AI poleca kogoś innego?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Jeśli w odpowiedziach AI pada konkurencja, a nie Ty, tracisz klientów, których nawet nie widzisz, bo nigdy do Ciebie nie trafili. Ludzie coraz częściej pytają ChatGPT albo Perplexity o polecenie firmy, i właśnie w tej odpowiedzi zapada decyzja.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Czym różni się GEO od SEO?',
        ikona: 'lupa-wykres',
        chip: 'GEO',
        overline: 'DIAGNOZA · 4 SILNIKI AI',
      },
      {
        typ: 'akapit',
        tekst: 'Klasyczne pozycjonowanie w Google tego nie załatwia. Pozycjonowanie pod AI to inna gra: nie walczysz o miejsce w wynikach wyszukiwania, tylko o miejsce w odpowiedzi, którą buduje AI.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Boty AI nie widzą Twojej treści',
            akapity: [
              'Jeśli model nie ma dostępu do Twojej treści, nie zacytuje Cię, nawet jeśli Twoja oferta jest najlepsza w okolicy. Dlatego to sprawdzamy jako pierwsze, zanim cokolwiek przepiszemy.',
            ],
            punkty: [
              'strona nie wpuszcza botów AI',
              'technologia, której AI w ogóle nie czyta',
            ],
          },
          {
            naglowek: 'Treść nie jest napisana pod cytat',
            akapity: [
              'Optymalizacja pod ChatGPT to pisanie pod cytat, nie pod kliknięcie: bezpośrednia odpowiedź na początku, potem konkret, który da się zacytować.',
            ],
            punkty: [
              'słowa kluczowe upychane na siłę nie działają, a bywają minusem',
              'AI składa odpowiedź z konkretnych liczb i dobrej struktury',
            ],
          },
          {
            naglowek: 'Poza Twoją stroną nikt o Tobie nie mówi',
            akapity: [
              'W GEO liczy się autorytet z zewnątrz. Jeśli poza Twoją stroną nikt Cię nie wymienia, model nie ma się na co powołać, więc poleci kogoś, o kim mówią inni.',
            ],
            punkty: [
              'w Google autorytet dawały backlinki, w AI dają wzmianki',
              'na diagnozie widać, kto jest wymieniany zamiast Ciebie',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy da się to naprawić bez nowej strony?',
        wariant: 'edge',
        chip: 'GEO',
        akapity: [
          'Najczęściej tak. Nie musisz budować strony od nowa: bierzemy to, co masz, i naprawiamy to, co dziś blokuje cytowanie.',
          'Twój punkt wyjścia pokażemy Ci czarno na białym, zanim cokolwiek zamówisz. Jeśli strona stoi na technologii, której AI nie czyta, powiemy to wprost na diagnozie.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jak sprawiamy, że AI zaczyna Cię cytować?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Naprawiamy trzy rzeczy: czy boty AI w ogóle widzą Twoją stronę, czy treść jest ułożona pod cytat i czy masz autorytet poza własną stroną. Potem co tydzień mierzymy, czy realnie padasz w odpowiedziach.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Jak być cytowanym w ChatGPT?',
        ikona: 'wykres-strzalka',
        chip: 'GEO',
        overline: 'CZTERY ETAPY · POMIAR CO TYDZIEŃ',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'ok. 3 tygodnie',
            opis: 'od publikacji strony Lenart Motors do wskazania firmy przez ChatGPT',
            zrodlo: 'Lenart Motors',
            ton: 'cyan',
          },
          {
            wartosc: 'top10 Google',
            opis: 'frazy z umowy plus widoczność w GPT',
            zrodlo: 'Fichtelgebirgshaus.de',
            ton: 'violet',
          },
          {
            wartosc: 'top3 Google',
            opis: 'z niewidocznej strony na frazę Trockenhaus',
            zrodlo: 'Trockenhaus',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'przelacznik',
        grupa: 'optymalizacja-etapy',
        opcje: [
          {
            numer: 'ETAP 1',
            tytul: 'Widoczność dla botów',
            podtytul: 'start pracy',
            naglowek: 'Najpierw sprawdzamy, czy boty AI w ogóle widzą Twoją treść.',
            akapity: [
              'Dopóki model nie ma dostępu do strony, reszta pracy nic nie zmienia, bo nie ma czego zacytować. Dlatego ten etap idzie na sam początek, a nie na koniec.',
            ],
            punkty: [
              'odblokowujemy boty AI tam, gdzie strona je zatrzymuje',
              'jeśli winna jest technologia, której AI nie czyta, mówimy to wprost na diagnozie',
            ],
          },
          {
            numer: 'ETAP 2',
            tytul: 'Treść pod cytat',
            podtytul: 'kluczowe strony',
            naglowek: 'Przepisujemy kluczowe strony na format, który AI cytuje.',
            akapity: [
              'To jest optymalizacja strony pod ChatGPT w praktyce: piszemy pod cytat, nie pod kliknięcie. Model ma wyjąć z Twojej strony gotowy fragment, więc każdą kluczową stronę układamy tak, żeby dało się to zrobić bez czytania całości.',
            ],
            punkty: [
              'odpowiedź postawiona wysoko, zaraz pod nagłówkiem',
              'konkretne liczby, tabele i nagłówki formułowane jak pytania',
              'nie upychamy słów kluczowych, bo bywają wręcz minusem',
            ],
          },
          {
            numer: 'ETAP 3',
            tytul: 'Świeżość',
            podtytul: 'treść aktualna',
            naglowek: 'Dokładamy świeżość, bo AI woli treść aktualną.',
            akapity: [
              'Strona, na której od dawna nic się nie zmienia, ma mniejszą szansę trafić do odpowiedzi. Dlatego pilnowanie aktualności kluczowych stron jest u nas osobnym etapem, nie dodatkiem.',
            ],
          },
          {
            numer: 'ETAP 4',
            tytul: 'Autorytet poza stroną',
            podtytul: 'rankingi i zestawienia',
            naglowek: 'Budujemy autorytet poza Twoją stroną, bo stamtąd AI bierze rekomendacje.',
            akapity: [
              'To najwolniejszy etap, bo autorytet buduje się z czasem. Dlatego cytowalność rośnie w rytmie, a nie jednym strzałem, i dlatego ta praca ma sens miesiąc po miesiącu.',
            ],
            punkty: [
              'rankingi, Reddit, własne dane i wzmianki',
              'w klasycznym SEO liczyły się backlinki, w GEO liczy się to, kto o Tobie wspomina',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Efekt mierzymy co tydzień, ręcznie. Wpisujemy Twoje kluczowe pytania w cztery silniki AI i zapisujemy, czy padasz w odpowiedziach i kto jest wymieniany zamiast Ciebie. Tak sprawdzamy cytowalność w ChatGPT: trend czarno na białym, a nie obietnice.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Trzy wyniki klientów, każdy z nazwą firmy',
        wariant: 'top',
        chip: 'GEO',
        akapity: [
          'Liczby z pasa powyżej to realne wdrożenia, nie testy. Każde opisaliśmy osobno w realizacjach, więc możesz je sprawdzić, zanim cokolwiek zamówisz.',
        ],
        punkty: [
          'Lenart Motors: model wskazywał firmę na konkretne pytanie klienta, o najlepszego blacharza i lakiernika premium, a nie na samą nazwę firmy.',
          'Fichtelgebirgshaus.de: frazy nie były przypadkowe, tylko umówione z klientem w umowie. Bierzemy odpowiedzialność za konkretny zakres.',
          'Trockenhaus: mała firma, co mówimy wprost. Widoczność zbudowała treść z konkretem, nie wielkość serwisu.',
        ],
        stopka: [
          'Dwa z trzech wdrożeń to klienci z rynku niemieckiego. Pracujemy po polsku i po niemiecku.',
        ],
      },
    ],
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
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Cenę liczymy od zakresu pracy: ile stron przepisujemy pod cytowanie, jak szeroko ruszamy autorytet poza stroną, czyli rankingi i zestawienia, i jak często mierzymy, czy padasz w odpowiedziach czterech silników AI. Dokładne widełki podajemy na bezpłatnej diagnozie, bo autorytet rośnie z czasem, nie jednym strzałem.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '0 zł',
            opis: 'bezpłatna diagnoza: sprawdzamy w czterech silnikach AI, czy polecają Ciebie, czy konkurencję',
            zrodlo: 'diagnoza',
            ton: 'green',
          },
          {
            wartosc: 'ok. 30 minut',
            opis: 'tyle trwa diagnoza; kończy się konkretną listą rzeczy do zrobienia',
            zrodlo: 'diagnoza',
            ton: 'cyan',
          },
          {
            wartosc: '4 silniki AI',
            opis: 'tyle sprawdzamy co tydzień, żebyś widział trend, a nie obietnice',
            zrodlo: 'wiersz Pomiar w tabeli porównawczej',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Od czego zależy cena pozycjonowania pod AI?',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'DWA MODELE PRACY · WIDEŁKI NA DIAGNOZIE',
      },
      {
        typ: 'przelacznik',
        grupa: 'optymalizacja-modele',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Audyt widoczności AI i naprawa',
            podtytul: 'gdy strona wymaga naprawy na start',
            naglowek: 'Bierzemy to, co masz, i naprawiamy to, co dziś blokuje cytowanie.',
            akapity: [
              'Ten model pasuje wtedy, gdy strona wymaga naprawy na start. Nie ma sensu ruszać autorytetu poza stroną, dopóki na samej stronie nie ma czego zacytować.',
            ],
            punkty: [
              'odblokowanie botów AI',
              'przepisanie kluczowych stron pod cytowanie',
              'konkretne liczby i struktura',
            ],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Stała opieka GEO',
            podtytul: 'gdy chcesz rosnąć w cytowaniach',
            naglowek: 'Praca w rytmie miesięcznym, bo autorytet rośnie z czasem.',
            akapity: [
              'Ruszamy źródła spoza Twojej strony i sprawdzamy, czy to realnie przekłada się na odpowiedzi silników AI. Jeśli nie, zmieniamy podejście, zamiast czekać kolejny kwartał.',
            ],
            punkty: [
              'pomiar co tydzień, ręcznie, w czterech silnikach AI',
              'widzisz trend czarno na białym, a nie obietnice',
              'poprawiamy to, co nie zadziałało',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Model pracy',
          'Co obejmuje',
          'Kiedy pasuje',
        ],
        wiersze: [
          [
            'Audyt widoczności AI i naprawa',
            'Odblokowanie botów, przepisanie kluczowych stron pod cytowanie, konkretne liczby i struktura',
            'Gdy strona wymaga naprawy na start',
          ],
          [
            'Stała opieka GEO',
            'Praca w rytmie miesięcznym, autorytet poza stroną, pomiar co tydzień w czterech silnikach AI',
            'Gdy chcesz rosnąć w cytowaniach',
          ],
        ],
        wKarcie: true,
        podpis: 'Dokładne widełki dla obu modeli, czyli Twój cennik GEO, poznasz na bezpłatnej diagnozie',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dostaję na bezpłatnej diagnozie?',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: [
          'Sprawdzamy w czterech silnikach AI, czy polecają Ciebie, czy konkurencję, i pokazujemy Ci wynik czarno na białym. Trwa to około 30 minut i kończy się konkretną listą rzeczy do zrobienia.',
          'Bez ukrytych kosztów. I uczciwie, zanim cokolwiek zamówisz: cytowalność to praca na kwartały, nie na dni. Dlatego mierzymy co tydzień, żebyś widział trend, a nie czekał na obietnice.',
        ],
      },
    ],
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
