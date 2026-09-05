import type { Usluga } from './types';

/**
 * USŁUGA 2 — CHATBOTY (chatbot AI dla firm).
 * Pozycjonowanie kategorii: chatbot odpowiada, AI Agent działa.
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * ══ PRZYCIĘCIE 2026-09-06 (raport `.seo-przeglad/raporty/2026-09-05.md`,
 * sekcje 4, 7.3, 7.4, 8 krok 2 i 9). Strona spadła na frazie „chatbot ai dla
 * firm" (70 wyświetleń -> 3), Google nie czytał jej od 29 lipca, a wersja
 * z pakietu 4.09 miała 5667 słów w <main> przy medianie top5 równej 1150.
 * Zanim wymusimy ponowne pobranie, strona musi być lepsza niż lipcowa.
 *
 * CO ZOSTAŁO (odpowiada na intencję „chatbot AI dla firm"): hero z kapsułą,
 * co robi i dla kogo, realizacje w trzech zdaniach, silniki i dane (nowa
 * sekcja, raport 7.4), tabela porównawcza, trzy kroki wdrożenia, cennik RAZ
 * (drabina progów + formuła utrzymania w `ramaCeny`), FAQ (8 pytań), linki.
 *
 * CO WYCIĘTO I GDZIE STOI TERAZ (raport 9: „nie usuwać sekcji, które działają,
 * wątki poboczne przenosimy na podstrony"; przed wycięciem sprawdzono, że
 * treść REALNIE stoi na stronie docelowej):
 *  - pas metryk „580 maili / 85% draftów" i opis automatu mailowego Instytutu
 *    Kryptografii (to metryki INNEJ usługi): „około 85% draftów" stoi na
 *    /realizacje/auto-email-bok (lib/realizacje/auto-email-bok.ts, kapsuła
 *    + pas metryk), a „580 maili tygodniowo" na /uslugi/automatyzacje
 *    (lib/uslugi/automatyzacje.ts, pas metryk i karta) oraz w poradnikach
 *    o kosztach automatyzacji i agenta; case auto-email-bok liczby 580 NIE
 *    ma (sprostowanie kontroli 2026-09-06). Tu: jedno zdanie i link
 *    w `powiazane.realizacje`.
 *  - utrzymanie voicebota 299-1500 zł netto (dwa miejsca + FAQ):
 *    /uslugi/voiceboty (lib/uslugi/voiceboty.ts, kapsuła, przełącznik, FAQ).
 *    Tu: jedno zdanie rozróżniające i link w `powiazane.uslugi`.
 *  - rozbudowany blok „chatbot kontra AI Agent" (siatka + FAQ w dwóch
 *    miejscach): /blog/chatbot-czy-ai-agent-roznice
 *    (lib/blog/posts/chatbot-czy-ai-agent-roznice.ts). Tu: dwa zdania w sekcji
 *    „dla kogo", jedno FAQ i link w `powiazane.poradniki`.
 *  - karta „chatbot a AI Start za 1990 zł": /uslugi/automatyzacje
 *    (lib/uslugi/automatyzacje.ts, przełącznik AI Start). Tu: jedno zdanie
 *    i link w `powiazane.uslugi`.
 *  - pakiet 4.09 §1 „Jaki chatbot jest mi potrzebny" (trzy karty z cenami)
 *    i §3 „Z czego składa się chatbot" (trzy warstwy, w tym kwoty): drabina
 *    progów stoi w `ramaCeny` tej strony i na /uslugi/chatboty/cennik;
 *    warstwa bazy wiedzy (RAG) na /uslugi/chatboty/baza-wiedzy; integracje na
 *    /uslugi/chatboty/sklep-internetowy.
 *  - pakiet §2 „Chcę zobaczyć, jak działa, zanim zapłacę" (trzy pytania do
 *    bota na tej stronie): bot dalej stoi na stronie (przycisk „Zapytaj AI"),
 *    ale sekcja o silnikach NIE mówi, na czym działa (patrz blok NASZ WŁASNY
 *    BOT niżej: konsola jedzie na OpenAI, nie na Claude). Trzy pytania testowe
 *    NIE stoją na żadnej podstronie, zgłoszone w raporcie przycięcia.
 *  - pakiet §4 „Gdzie chatbot będzie rozmawiał" (pięć kanałów z opisami):
 *    /uslugi/chatboty/whatsapp-messenger (kapsuła: pełna lista pięciu
 *    kanałów). Tu: lista kanałów w kapsule, karcie i FAQ „Gdzie działa".
 *  - pakiet §5 „Jakie efekty dały nasze chatboty" (cztery karty): Desant.pl
 *    na /uslugi/chatboty/obsluga-klienta, Przystań Jurgen na
 *    /uslugi/chatboty/hotele-pensjonaty, Instytut Kryptografii na
 *    /uslugi/chatboty/baza-wiedzy i /realizacje/chatbot-edukacyjny-kursy,
 *    Trockenhaus na /uslugi/optymalizacja/google-ai-overviews. Tu: trzy
 *    zdania w sekcji „Gdzie taki chatbot już pracuje?".
 *  - pakiet §6 „Co się dzieje z moimi danymi" (jedenaście akapitów): sedno
 *    wchodzi do nowej sekcji o silnikach i danych (H2 z raportu 7.4), reszta
 *    (zakres bazy, powierzenie) na /uslugi/chatboty/baza-wiedzy.
 *  - pakiet §7 „rachunek strat" (cztery wzory): /uslugi/chatboty/obsluga-klienta
 *    (koszt miesiąca) i /uslugi/chatboty/sklep-internetowy (wzór z minutami)
 *    oraz kalkulator procesu w /narzedzia (link w `powiazane.narzedzia`).
 *  - pakiet §8 „Za co dokładnie płacę" (tabela ośmiu pozycji), §9 „abonament
 *    czy własność" (pięć pytań do platformy), §10 „kiedy odradzamy" (pięć
 *    sytuacji), §11 „co przygotować na rozmowę" (cztery karty):
 *    /uslugi/chatboty/cennik (lib/uslugi/podstrony/chatboty-cennik.ts: trzy
 *    pozycje rachunku, tabela „platforma w abonamencie a własność", sekcja
 *    „Kiedy chatbot się u Ciebie nie opłaci?", sekcja „Jak przygotować się do
 *    wyceny chatbota?"). Pięć pytań do platformy abonamentowej niesie tam
 *    tabela porównawcza (wiersze: płatność, baza wiedzy, zmiany, integracje,
 *    więcej rozmów, koniec umowy). Trzy sytuacje „kiedy odradzamy", których
 *    cennik nie miał (decyzja człowieka, bot bo konkurencja, brak ruchu),
 *    DOŁOŻONE 2026-09-06 do sekcji „Kiedy chatbot się u Ciebie nie opłaci?"
 *    na cenniku, dopiero potem wycięte stąd.
 *  - karta „Kto buduje Twojego chatbota?" (Paweł): nie stoi na podstronach,
 *    ale to blok o firmie, nie o usłudze; zgłoszone w raporcie.
 *  - sekcja „problem" z przełącznikiem trzech pór doby: sedno (te same
 *    pytania, wiadomość po godzinach, skok zapytań) zostaje w leadzie sekcji
 *    „Co robi chatbot AI dla firm i komu się opłaca?" i w tabeli porównawczej.
 *
 * SLOTY H2. Szablon (app/uslugi/[usluga]/page.tsx) ma pięć H2 z tego pliku:
 * problem, rozwiazanie, tabela, kroki, ramaCeny; bloki renderują nagłówki jako
 * H3 (ServiceNarrative woła Bloki z naglowki="h3"). Raport 7.4 wymaga H2
 * „Na jakim silniku działa Twój bot i gdzie są dane?", więc slot
 * `rozwiazanie` niesie tę sekcję, a slot `problem` łączy dawny problem z tym,
 * co bot robi i dla kogo (H2 z dokładną frazą główną). Zero zmian w szablonie.
 *
 * JEDNA ODMIANA FRAZY (raport 8, krok 2, pkt 1): dokładne „chatbot AI dla firm"
 * stoi w metaTitle, h1, pierwszym zdaniu kapsuły, H2 sekcji „problem" i w dwóch
 * pytaniach FAQ. Wariant „dla firmy" zostaje w pozostałych zdaniach.
 * H1 ma kolorową końcówkę z mapy H1_KOLOR (components/uslugi/ServiceHero.tsx,
 * wpis `chatboty`): fragment MUSI być dokładną końcówką h1.
 * Synonim „chat AI dla firm" (raport 7.3): trzy wystąpienia w treści + FAQ.
 *
 * CENNIK OBOWIĄZUJĄCY (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §1
 * plus decyzje Pawła z 2026-08-19 i 2026-08-31). Każda kwota NETTO:
 *  - prosty  1790 zł        / 1-2 dni robocze,
 *  - średni  3000-6000 zł   / 3-4 dni robocze,
 *  - duży    8000-15000 zł  / 5-10 dni roboczych,
 *  - utrzymanie 99-599 zł/mies. gdy projekt zostaje u nas, 0 zł gdy przekazujemy
 *    klientowi całą infrastrukturę, poprawki wtedy 350 zł netto za godzinę.
 * Drabina i formuła utrzymania stoją RAZ, w `ramaCeny`; wszędzie indziej skrót
 * z odesłaniem do /uslugi/chatboty/cennik (linkuje ją siatka podstron pod
 * stroną). Kwota 1790 pada na stronie najwyżej 5 razy: kafel hero (minPrice),
 * kapsuła, `ramaCeny.tresc`, tabela progów, FAQ o cenie.
 * `ramaCeny.minPrice` = 1790 -> kafel ceny w hero, kolumna „Cena" na /uslugi
 * ORAZ `offers.minPrice` w Service JSON-LD (jedna liczba, cztery miejsca).
 * Etykieta kafla „próg prosty" (ServiceHero.KAFEL_CENY) = słowa z ramaCeny.tresc.
 *
 * ZASADA CZASU i RUNDY POPRAWEK (audyt §1, nasze własne zobowiązania): czas
 * liczymy OD PRZEKAZANIA KOMPLETU MATERIAŁÓW, nie od podpisania umowy; dwie
 * rundy poprawek w cenie; poprawki tego, co nie zadziałało po naszej stronie,
 * robimy zawsze; nowe funkcje to rozbudowa wyceniana osobno.
 *
 * SILNIKI (fakt od Pawła z 2026-09-05, raport 7.4): trzy silniki do wyboru
 * przez klienta: OpenAI (GPT), Anthropic (Claude), Google (Gemini); konto
 * u dostawcy należy do klienta; klient płaci za zużycie wprost, bez naszej
 * marży; dane w UE; umowa powierzenia. NIE wciskać „GPT" do title ani H1
 * (raport 7.4 i 9).
 * NASZ WŁASNY BOT (kontrola 2026-09-06, sprawdzone w kodzie i na produkcji):
 * raport 7.4 i nagłówek tego pliku twierdziły, że bot na simplefast.ai działa
 * na Claude (app/api/chat/route.ts, MODEL = claude-haiku-4-5). To NIEPRAWDA
 * dla bota, którego widzi odwiedzający: przycisk „Zapytaj AI" to
 * components/agent/AgentConsole (montowany globalnie w app/layout.tsx), jego
 * czat woła /api/agent-chat (components/agent/agent-console-init.ts), a
 * api/agent-chat.mjs uderza w api.openai.com/v1/responses z modelem
 * OPENAI_CHAT_MODEL || 'gpt-5.6-sol'. Route z Claude woła wyłącznie
 * components/demo/ChatAgent, którego nic nie montuje (ChatLauncher nieużywany,
 * AgentDemo to skrypt bez fetch). Produkcja: GET /api/agent-chat = 405, czyli
 * funkcja żyje. Dlatego zdanie „Bot na tej stronie działa na Claude od
 * Anthropic" WYCIĘTE z karty 1 i z FAQ o danych; wraca tylko po decyzji Pawła
 * (przepięcie konsoli na Claude ALBO zdanie o OpenAI). Nie pisać o naszym
 * bocie nic, czego nie potwierdza api/agent-chat.mjs.
 * UWAGA: /uslugi/chatboty/baza-wiedzy („nie korzystamy z modeli OpenAI") i
 * /uslugi/chatboty/asystent-wewnetrzny („Odpowiedzi generuje model Claude od
 * Anthropic") przeczą faktowi o trzech silnikach; poza zakresem tego pliku,
 * zgłoszone.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - cta.dowod: realna liczba z wdrożenia ALBO case z liczbą + zgodą.
 */
export const chatboty: Usluga = {
  slug: 'chatboty',
  /* 2026-09-06: przycięcie strony (patrz nagłówek pliku). Pole jest źródłem
     `lastmod` w sitemap.xml (app/sitemap.ts). */
  dataAktualizacji: '2026-09-06',
  h1: 'Chatbot AI dla firm, który odpowiada klientom 24/7',

  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2): pierwsze zdanie niesie
     dokładną frazę główną, a całość cztery wielkości naraz (dolny próg,
     górny próg, koszt miesięczny, czas wdrożenia), żeby model mógł wyciąć
     kapsułę jako gotową odpowiedź. */
  kapsula:
    'Chatbot AI dla firm odpowiada klientom przez całą dobę na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie, zbiera leady i odpowiada na podstawie Twojej wiedzy. Wdrożenie kosztuje u nas od 1790 zł netto za próg prosty do 15000 zł netto za bota z integracjami i trwa od 1 do 10 dni roboczych. Utrzymanie: 99-599 zł netto miesięcznie u nas albo 0 zł po przekazaniu Ci infrastruktury. Dane zostają w Unii Europejskiej.',

  metaTitle: 'Chatbot AI dla firm: wdrożenie i cena 2026',
  metaDescription:
    'Chatbot AI dla firm od 1790 zł netto, wdrożenie od 1 do 10 dni roboczych. Odpowiada klientom 24/7 na WWW i w komunikatorach, zbiera leady. Dane w UE.',

  problem: {
    h2: 'Co robi chatbot AI dla firm i komu się opłaca?',
    tresc:
      'Te same pytania wracają codziennie: o godziny, cennik, dojazd i dostępność, a wieczorna wiadomość czeka do rana. Chatbot AI dla firm odpowiada od razu, o każdej porze, i zbiera kontakt, zanim klient napisze do konkurencji.',
    bloki: [
      {
        typ: 'lista',
        punkty: [
          'Odpowiada 24/7 na stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie: jedna wiedza, wiele kanałów.',
          'Zbiera kontakt od razu, także po godzinach, a sprawę, która go przerasta, oddaje Tobie z kompletem informacji.',
          'Odpowiada tylko z Twoich materiałów: oferty, cennika, najczęstszych pytań. Czego nie wie, tego nie zmyśla, a rozmówca wie, że pisze z AI.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dla kogo to pierwszy krok, a dla kogo za wcześnie?',
        wariant: 'quiet',
        akapity: [
          'Chat AI dla firm opłaca się tam, gdzie te same pytania wracają co tydzień, a wiedza jest spisana w ofercie, cenniku albo procedurach. Przy kilku zapytaniach w tygodniu bot się nie zwróci i powiemy Ci to na pierwszej rozmowie.',
          'Chatbot odpowiada, AI Agent działa: umawia wizytę i zapisuje ją w kalendarzu. U nas chatbot to pierwszy krok do Agenta; różnice we wpisie „Chatbot czy AI Agent", link niżej.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Gdzie taki chatbot już pracuje?',
        wariant: 'quiet',
        chip: 'REALIZACJA',
        akapity: [
          'Instytut Kryptografii: trzy boty na transkrypcjach kursów. Desant.pl: 30-50 klientów miesięcznie. Przystań Jurgen: około 100 zapytań w sezonie. Osobny automat mailowy Instytutu to nie chatbot, link niżej.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Na jakim silniku działa Twój bot i gdzie są dane?',
    tresc:
      'Silnik wybierasz Ty: OpenAI (GPT), Anthropic (Claude) albo Google (Gemini). Konto u dostawcy należy do Ciebie, za zużycie płacisz mu wprost, bez naszej marży. Dane zostają w Unii Europejskiej, a umowę powierzenia podpisujemy przed startem.',
    bloki: [
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Trzy silniki, jeden wybór po Twojej stronie',
            akapity: [
              'Bot działa na każdym z trzech modeli. Doradzamy, który pasuje do Twoich pytań i budżetu na tokeny, ale decyzja i konto są Twoje.',
            ],
          },
          {
            naglowek: 'Co trafia do dostawcy modelu',
            akapity: [
              'Treść rozmowy i fragmenty bazy wiedzy potrzebne do odpowiedzi. Przed wgraniem mówimy, co ma wypaść: dane osobowe klientów, marże, dokumenty kadrowe.',
            ],
          },
          {
            naglowek: 'Czyja jest baza wiedzy i infrastruktura',
            akapity: [
              'Baza wiedzy jest Twoja w obu wariantach utrzymania. Jeśli kończymy współpracę, zabierasz dokumenty i konfigurację ze sobą, a my przekazujemy Ci całą infrastrukturę.',
            ],
          },
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Chatbot a ręczna obsługa pytań klientów',
    naglowekBez: 'Ręczna obsługa',
    naglowekZNami: 'Chatbot AI od SimpleFast.ai',
    wiersze: [
      { cecha: 'Dostępność', bez: 'W godzinach pracy', zNami: '24/7, też nocą i w weekend' },
      { cecha: 'Te same pytania', bez: 'Odpowiadasz w kółko', zNami: 'Bot bierze je na siebie' },
      { cecha: 'Leady wieczorem', bez: 'Często przepadają', zNami: 'Bot zbiera kontakt od razu' },
      /* 2026-09-06: wiersze „Czas reakcji" i „Rozwój" (rośnie do Agenta)
         zdjęte; czas reakcji niesie lead sekcji „problem" („odpowiada od
         razu"), wątek Agenta stoi w sekcji „dla kogo", FAQ i wpisie na blogu.
         Wiersz „Skok zapytań" PRZYWRÓCONY (kontrola 2026-09-06): sedno
         dawnej „pory 3" przełącznika (sezon, kampania, górka zapytań) nie
         stało po przycięciu nigdzie na tej stronie, a na podstronach tylko
         w tabeli hoteli; lead sekcji „problem" go nie niesie.
         Bramka hero: `ServiceHero.kafleStatystyk` szuka PIERWSZEGO wiersza
         z „24/7" w kolumnie zNami (wiersz „Dostępność"). Kwota startu bez
         liczby: 1790 pada na stronie najwyżej 5 razy (nagłówek pliku). */
      { cecha: 'Skok zapytań', bez: 'Kolejka i stres', zNami: 'Ten sam bot, bez kolejki' },
      { cecha: 'Koszt startu', bez: 'Twój czas i czas zespołu', zNami: 'Jednorazowo, od progu prostego' },
      { cecha: 'Czas wdrożenia', bez: 'Robota zostaje z Tobą na stałe', zNami: 'Od 1 do 10 dni roboczych' },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy chatbota krok po kroku?',
    items: [
      {
        tytul: 'Bezpłatna rozmowa',
        opis:
          'Badamy potrzeby: o co pytają klienci, którym kanałem piszą i co bot ma przejąć. Mówimy, czy chatbot ma sens i przy którym progu jesteś.',
      },
      {
        tytul: 'Uczenie i wdrożenie',
        opis:
          'Karmimy bota Twoją wiedzą i stawiamy go na stronie WWW oraz w komunikatorach, na wybranym silniku. Dwa tygodnie testów i dwie rundy poprawek w cenie.',
      },
      {
        tytul: 'Utrzymanie i rozwój',
        opis:
          'Dokładamy odpowiedzi na pytania, które faktycznie padają. Kiedy zechcesz, rozwijamy chatbota w Agenta: umawianie, zapisy, integracje.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje wdrożenie chatbota?',
    tresc:
      'Chatbot AI dla firmy kosztuje od 1790 zł netto za próg prosty do 15000 zł netto za wdrożenie z integracjami. Czas: od 1-2 dni roboczych przy prostym bocie do 10 dni roboczych przy pełnych integracjach.',
    bloki: [
      {
        typ: 'tabela',
        /* Trzy kolumny, jak od 2026-09-04 (antykanibalizacja): czterokolumnowa
           wersja z opisem progów stoi na /uslugi/chatboty/cennik. */
        naglowki: ['Próg', 'Cena netto', 'Czas wdrożenia'],
        wiersze: [
          ['Prosty', '1790 zł', '1-2 dni robocze'],
          ['Średni', '3000-6000 zł', '3-4 dni robocze'],
          ['Duży z integracjami', '8000-15000 zł', '5-10 dni roboczych'],
        ],
        wKarcie: true,
        podpis:
          'Kwoty netto, czas od przekazania kompletu materiałów, dwie rundy poprawek w cenie. Pełny rachunek i porównanie z platformą w abonamencie: podstrona z cennikiem, siatka niżej.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co płacisz co miesiąc?',
        wariant: 'top',
        chip: 'UTRZYMANIE',
        akapity: [
          'Chat AI dla firm ma trzy pozycje kosztu: wdrożenie, utrzymanie i tokeny. Utrzymanie to 99-599 zł netto miesięcznie, gdy projekt zostaje u nas, albo 0 zł po przekazaniu Ci całej infrastruktury; wtedy poprawki rozliczamy po 350 zł netto za godzinę, tylko na zlecenie. Tokeny płacisz dostawcy modelu wprost, według zużycia.',
        ],
        punkty: [
          'Sprint Diagnostyczny za 1490 zł netto robimy, gdy trzeba najpierw rozplanować procesy, i odliczamy go w całości od wdrożenia.',
          'Voicebot to inna usługa z własnym cennikiem: odbiera telefon, chatbot pisze. AI Start za 1990 zł netto automatyzuje jeden proces wewnątrz firmy. Linki niżej.',
        ],
      },
    ],
    minPrice: 1790, // próg „prosty" (audyt §1, 2026-08-19): kwota w UI + offers w Service JSON-LD.
    /* SEO 2026-08-17: linkowanie wewnętrzne do poradnika cenowego (render
       w RamaCeny.tsx w tym samym akapicie co `tresc`). */
    linkPoradnik: {
      przed: 'Pełny rozkład kosztów chatbota opisaliśmy w poradniku: ',
      etykieta: 'ile kosztuje chatbot dla firmy w 2026',
      po: '.',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
    },
  },

  /* FAQ po przycięciu 2026-09-06: osiem pytań, zero duplikatów z sekcjami
     (cztery pary H3 z wersji 4.09 połączone po jednym: obsługa, zmyślanie,
     AI Agent, rundy poprawek wchłonięte przez pytanie o czas wdrożenia).
     Dwa pytania z dokładną frazą „chatbot AI dla firm", jedno o synonim
     „chat AI" (raport 7.3), jedno o silniki i dane (raport 7.4).
     Odpowiedź o cenie celowo bez drabiny trzech progów: ta stoi w FAQPage
     JSON-LD podstrony /uslugi/chatboty/cennik (antykanibalizacja 2026-09-04). */
  faq: [
    {
      pytanie: 'Ile kosztuje chatbot AI dla firm?',
      odpowiedz:
        'Od 1790 zł netto za próg prosty do 15000 zł netto za bota z integracjami, do tego utrzymanie 99-599 zł netto miesięcznie albo 0 zł po przekazaniu infrastruktury. Pełną drabinę trzech progów z czasami i rachunkiem na trzy lata rozpisaliśmy na podstronie z cennikiem chatbota.',
    },
    {
      /* Kontrola 2026-09-06: „chatbota AI dla firm" to odmiana, nie dokładna
         fraza; raport 8/2/1 wymaga jej w DWÓCH pytaniach, więc mianownik. */
      pytanie: 'Ile trwa wdrożenie, zanim chatbot AI dla firm zacznie odpowiadać?',
      odpowiedz:
        'Od 1 do 10 dni roboczych, zależnie od progu: prosty 1-2 dni, średni 3-4 dni, z integracjami 5-10 dni. Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy. Potem testujesz bota przez dwa tygodnie, a dwie rundy poprawek masz w cenie wdrożenia. Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze.',
    },
    {
      pytanie: 'Czy chatbot będzie zmyślał odpowiedzi?',
      odpowiedz:
        'Nie. Odpowiada wyłącznie z Twojej bazy wiedzy: oferty, cennika, procedur. Gdy pytanie wychodzi poza bazę, mówi wprost, że nie wie, zapisuje kontakt i przekazuje sprawę Tobie. Klient od pierwszej wiadomości wie, że pisze z AI.',
    },
    {
      pytanie: 'Czy chatbot zastąpi moją obsługę klienta?',
      odpowiedz:
        'Nie zastąpi, odciąży. Bierze na siebie powtarzalne pytania i wiadomości spoza godzin pracy. Wycena nietypowego zlecenia, reklamacja i rozmowa, która wymaga wyczucia, dalej należą do Twoich ludzi, a bot oddaje im sprawę z kompletem informacji.',
    },
    {
      pytanie: 'Czym chatbot różni się od AI Agenta?',
      odpowiedz:
        'Chatbot odpowiada, AI Agent działa: sprawdzi kalendarz, zapisze wizytę i wyśle potwierdzenie. U nas chatbot to pierwszy krok, który rozbudowujemy do Agenta, gdy będziesz gotowy, a rozbudowę wyceniamy osobno. Szczegóły stoją we wpisie „Chatbot czy AI Agent".',
    },
    {
      pytanie: 'Czym różni się chat AI od chatbota AI?',
      odpowiedz:
        'Niczym istotnym, to dwie nazwy tego samego narzędzia. „Chat AI dla firm" to potoczna nazwa okna rozmowy na stronie, „chatbot AI" to nazwa branżowa. Liczy się to, co stoi za oknem: baza wiedzy z Twoich materiałów, wybrany silnik i zbieranie leadów.',
    },
    {
      pytanie: 'Czy moje dane trafiają do OpenAI albo Anthropic?',
      odpowiedz:
        'Do dostawcy modelu trafia treść rozmowy i fragmenty Twojej bazy wiedzy potrzebne do odpowiedzi. Silnik wybierasz Ty: OpenAI, Anthropic albo Google. Konto u dostawcy jest Twoje, dane zostają w Unii Europejskiej, a umowę powierzenia podpisujemy przed startem.',
    },
    {
      pytanie: 'Gdzie działa chatbot?',
      odpowiedz:
        'Na Twojej stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie. To pełna lista kanałów, które wdrażamy. Jedna baza wiedzy, ten sam bot, kilka okien.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy, ile pytań dziennie zdejmie z Ciebie chatbot i ile leadów łapie po godzinach. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  /* Pierwsza = primary, zgodna z h1 (liczba mnoga od 2026-09-06). Bez
     'ile kosztuje chatbot' (fraza podstrony cennika, antykanibalizacja). */
  queries: [
    'chatbot AI dla firm',
    'chatbot dla firmy',
    'wdrożenie chatbota',
    'chat AI dla firm',
    'chatbot na stronę www',
  ],

  /* Linki wychodzące. ŚWIADOMIE BEZ ośmiu podstron /uslugi/chatboty/<slug>:
     `app/uslugi/[usluga]/page.tsx` woła `<PodstronyPowiazane slug="chatboty" />`,
     który wystawia je siatką „Konkretne zastosowania" prosto z rejestru
     (lib/uslugi/podstrony/index.ts). Wpisanie ich tutaj dałoby dwie siatki
     z tymi samymi linkami. Od 2026-09-06 pole niesie za to cele wątków
     pobocznych wyciętych z treści (nagłówek pliku): automat mailowy, wpis
     o Agencie, voiceboty, AI Start. Etykiety = h1 stron docelowych. */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Chatbot edukacyjny do kursów online',
        href: '/realizacje/chatbot-edukacyjny-kursy',
        opis: 'Kursant pyta i trafia do właściwej lekcji.',
      },
      {
        etykieta: 'Auto-email dla biura obsługi klienta',
        href: '/realizacje/auto-email-bok',
        opis: 'Automat mailowy Instytutu Kryptografii, nie chatbot.',
      },
      /* PRZYWRÓCONE (kontrola 2026-09-06): karta stała tu od v22 i wypadła
         przy przycięciu bez zastępstwa. To jedyna poza kursami realizacja
         z kategorią `chatboty`, więc linkuje TU przez `kategoria`, a szablon
         usługi nie renderuje realizacji po kategorii sam (brak
         `getRealizacjeByKategoria` w components/uslugi). Bez tej karty link
         zwrotny znikał. Pakiet 4.09 „Czego NIE ruszamy" też każe zostawić
         `powiazane` (realizacje i narzędzia) bez zmian. Opis z metryk case'a. */
      {
        etykieta: 'Firmowi Agenci AI 24/7',
        href: '/realizacje/agenci-ai-24-7',
        opis: 'Odpowiada nowym leadom o każdej porze, bez czuwania zespołu.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis: 'Po ilu miesiącach zwróci się wdrożenie. Liczby podajesz Ty.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Chatbot czy AI Agent: czym się różnią i co wybrać dla firmy',
        href: '/blog/chatbot-czy-ai-agent-roznice',
        opis: 'Chatbot odpowiada, Agent działa. Który wybrać.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Bot głosowy, własny cennik utrzymania.',
      },
      {
        etykieta: 'Automatyzacja procesów w firmie z AI',
        href: '/uslugi/automatyzacje',
        opis: 'AI Start: jeden proces wewnątrz firmy.',
      },
    ],
  },
};
