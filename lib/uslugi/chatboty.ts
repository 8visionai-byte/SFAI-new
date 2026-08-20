import type { Usluga } from './types';

/**
 * USŁUGA 2 — CHATBOTY (chatbot AI dla firmy).
 * Treść fazy 3, 1:1 z 06-copy-hero-uslugi.md §"USŁUGA 2 — CHATBOTY".
 * Pozycjonowanie kategorii: chatbot odpowiada, AI Agent działa.
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * CENNIK OBOWIĄZUJĄCY (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §1
 * plus decyzje Pawła z 2026-08-19). Każda kwota NETTO:
 *  - prosty  1790 zł        / 1-2 dni robocze,
 *  - średni  3000-6000 zł   / 3-4 dni robocze,
 *  - duży    8000-15000 zł  / 5-10 dni roboczych,
 *  - opieka  99-599 zł/mies. gdy projekt zostaje u nas, 0 zł gdy przekazujemy
 *    klientowi całą infrastrukturę (decyzja Pawła: widełki chatbota ZOSTAJĄ,
 *    bo chatbot jest prostszy w utrzymaniu niż voicebot, który ma 299-1500 zł).
 * Kwota 990 zł ZNIKA z cennika chatbota (audyt §1: leżała poniżej pasma
 * rynkowego, przez co modele AI odrzucały ją jako wartość odstającą).
 * `ramaCeny.minPrice` = 1790 -> kafel ceny w hero, kolumna „Cena" na /uslugi
 * ORAZ `offers.minPrice` w Service JSON-LD (jedna liczba, cztery miejsca).
 *
 * ZASADA CZASU i RUNDY POPRAWEK (audyt §1, nasze własne zobowiązania, czyli
 * materiał do cytowania): czas liczymy OD PRZEKAZANIA KOMPLETU MATERIAŁÓW
 * przez klienta, nie od podpisania umowy; dwie rundy poprawek są w cenie
 * wdrożenia; poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze,
 * także po odbiorze; nowe funkcje to rozbudowa wyceniana osobno.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - cta.dowod: realna liczba z wdrożenia (np. zapytań/mc obsłużonych przez chatbota
 *    klienta) ALBO case z liczbą + zgodą. Do tego czasu uczciwe zdanie o diagnozie.
 */
export const chatboty: Usluga = {
  slug: 'chatboty',
  dataAktualizacji: '2026-08-19',
  h1: 'Chatbot AI dla firmy',

  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2): pierwszy akapit po H1
     MUSI nieść cztery wielkości naraz, żeby model mógł wyciąć go jako gotową
     odpowiedź: dolny próg, górny próg, koszt miesięczny, czas wdrożenia.
     Przed tą zmianą kapsuła miała 0 z 4 (raport `raporty/stan-etapu1`). */
  kapsula:
    'Chatbot AI dla firmy kosztuje u nas od 1790 zł netto za wersję prostą do 15000 zł netto za wdrożenie z integracjami, a samo wdrożenie trwa od 1 do 10 dni roboczych, licząc od przekazania kompletu materiałów. Opieka po wdrożeniu to 99 do 599 zł netto miesięcznie, gdy projekt zostaje u nas, albo 0 zł, gdy przekazujemy Ci całą infrastrukturę. Chatbot odpowiada klientom na stronie i w komunikatorach przez całą dobę, zbiera leady i uczy się na Twojej wiedzy, a dane zostają w Unii Europejskiej.',

  metaTitle: 'Chatbot AI dla firm: cena i wdrożenie',
  metaDescription:
    'Chatbot AI dla firm od 1790 zł netto, wdrożenie od 1 do 10 dni roboczych. Odpowiada klientom 24/7 i zbiera leady. Opieka 99 do 599 zł netto miesięcznie.',

  problem: {
    h2: 'Ile razy dziennie odpowiadasz na to samo pytanie?',
    tresc:
      'Te same pytania wracają codziennie: o godziny, o cennik, o dojazd, o dostępność. Każde pytanie bez odpowiedzi w porę to potencjalny klient, który poszedł dalej.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'akapit',
        tekst: 'Klient pisze wieczorem, a Ty odpowiadasz rano, bo spałeś. Konkurencja czasem odpowiada szybciej i to ona dostaje zlecenie. Tak wygląda doba firmy, w której na wiadomości odpowiada tylko człowiek.',
      },
      {
        typ: 'lista',
        punkty: [
          'Te same pytania w kółko: o godziny, cennik, dojazd i dostępność, codziennie od nowa.',
          'Wiadomości po godzinach i w weekend czekają na odpowiedź do rana.',
          'Leady wieczorne często przepadają, bo nikt nie zbiera kontaktu.',
          'Skok zapytań to kolejka i stres zespołu.',
          'Bez chatbota na stronie firmowej odpowiadasz tylko w godzinach pracy.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy chatbot zastąpi moją obsługę klienta?',
        wariant: 'quiet',
        akapity: [
          'Nie. Bot zdejmuje z zespołu dokładnie to, co widzisz na liście wyżej: pytania w kółko o to samo i wiadomości spoza godzin pracy. Wycena nietypowego zlecenia, reklamacja albo rozmowa, która wymaga wyczucia, dalej należą do Twoich ludzi.',
          'Gdy sprawa przerasta bota, ten zapisuje kontakt do klienta i przekazuje temat Tobie. Rano zaczynasz dzień od krótkiej listy spraw dla człowieka, a nie od skrzynki pełnej pytań o godziny otwarcia.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co robi nasz chatbot, czego nie robi zwykły bot?',
    tresc:
      'Chatbot dla firmy uczy się na Twojej wiedzy: ofercie, cenniku, najczęstszych pytaniach. Zwykły bot odtwarza sztywny skrypt, nasz odpowiada po polsku, w Twoim tonie, i zbiera kontakt do klienta, zamiast go gubić.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'lista',
        punkty: [
          'Odpowiada klientom 24/7, także nocą i w weekend.',
          'Działa jako chatbot na stronę www i w komunikatorach: jedna wiedza, ten sam bot, wiele kanałów.',
          'Zbiera leady i kontakt do klienta od razu, nawet po godzinach.',
          'Odsyła klienta do właściwych miejsc na stronie, zamiast kazać mu szukać.',
          'To chatbot na własnych danych firmy: uczy się z Twoich materiałów, a dane zostają w Unii Europejskiej.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy chatbot będzie zmyślał odpowiedzi?',
        wariant: 'top',
        chip: 'ZASADA',
        akapity: [
          'Nie, bo nie odpowiada z głowy. Przy wdrożeniu podpinamy botowi bazę wiedzy: Twoją ofertę, cennik i odpowiedzi na pytania, które klienci zadają najczęściej. Każdą odpowiedź bot buduje z tych materiałów, nie z własnych domysłów.',
          'Pytanie spoza bazy? Bot przyznaje, że tego nie wie, zapisuje kontakt i zostawia sprawę Tobie. Baza rośnie razem z botem: gdy jakieś pytanie wraca, dokładamy odpowiedź i następnym razem bot już je obsługuje.',
          'Rozmówca od pierwszej wiadomości wie, że pisze z AI. Bot nie podszywa się pod pracownika.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czym chatbot różni się od AI Agenta?',
        wariant: 'edge',
        akapity: [
          'Chatbot to warstwa odpowiedzi, AI Agent to warstwa działania: nie tylko udziela informacji, ale doprowadza całe zadanie do końca, na przykład umawia wizytę i zapisuje ją w kalendarzu, pod nadzorem człowieka.',
          'U nas wdrożenie chatbota w firmie to pierwszy, mały krok. Ten sam bot dostaje potem kolejne integracje i uprawnienia, aż urośnie do Agenta, kiedy będziesz gotowy. Nie budujesz od zera i nie musisz wybierać wszystkiego na starcie.',
          'Rozbudowę do Agenta wyceniamy osobno, jak każdą nową funkcję. Zaczynasz od progu, którego potrzebujesz dziś.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Tak działa to u Instytutu Kryptografii, dla którego zbudowaliśmy trzy boty na transkrypcjach kursów. Kursant pyta chatbota i od razu trafia do właściwej lekcji, zamiast przeszukiwać setki materiałów VOD.',
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Chatbot a ręczna obsługa pytań klientów',
    naglowekBez: 'Ręczna obsługa',
    naglowekZNami: 'Chatbot AI od SimpleFast.ai',
    wiersze: [
      { cecha: 'Dostępność', bez: 'W godzinach pracy', zNami: '24/7, też nocą i w weekend' },
      { cecha: 'Czas reakcji', bez: 'Gdy ktoś ma chwilę', zNami: 'Natychmiast' },
      { cecha: 'Te same pytania', bez: 'Odpowiadasz w kółko', zNami: 'Bot bierze je na siebie' },
      { cecha: 'Leady wieczorem', bez: 'Często przepadają', zNami: 'Bot zbiera kontakt od razu' },
      { cecha: 'Skok zapytań', bez: 'Kolejka i stres', zNami: 'Ten sam bot, bez kolejki' },
      { cecha: 'Rozwój', bez: 'Zostaje obsługą czatu', zNami: 'Rośnie do Agenta, który działa' },
      /* 2026-08-19 (audyt §9 etap 1 pkt 1): dwa DOŁOŻONE wiersze wnoszą do
         tabeli dolny próg ceny i czas wdrożenia w dniach roboczych. Zero
         usuniętych wierszy, zero zmian w istniejących. Pełna drabina trzech
         progów nie mieści się w kontrakcie `tabelaPorownawcza` (trzy kolumny:
         cecha / bez / z nami) i stoi w `ramaCeny.tresc` oraz w FAQ.
         Uwaga na bramkę hero: `ServiceHero.kafleStatystyk` szuka PIERWSZEGO
         wiersza z „24/7" w kolumnie zNami (wiersz „Dostępność"), więc
         dokładanie wierszy na końcu jej nie rusza. */
      { cecha: 'Koszt startu', bez: 'Twój czas i czas zespołu', zNami: 'Od 1790 zł netto jednorazowo' },
      { cecha: 'Czas wdrożenia', bez: 'Robota zostaje z Tobą na stałe', zNami: 'Od 1 do 10 dni roboczych' },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy chatbota krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Patrzymy, o co pytają Twoi klienci najczęściej i gdzie tracisz leady. Mówimy, czy chatbot ma sens i co konkretnie ma umieć.',
      },
      {
        tytul: 'Uczenie i wdrożenie',
        opis:
          'Karmimy bota Twoją wiedzą: ofertą, cennikiem, pytaniami. Stawiamy go na stronie i w komunikatorach w dni. Testujemy na żywo, ustawiasz ton i granice.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Patrzymy, o co pytają klienci, i dokładamy odpowiedzi. Kiedy zechcesz, rozwijamy chatbota w Agenta: umawianie, zapisy, integracje.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje wdrożenie chatbota?',
    /* DRABINA TRZECH PROGÓW (audyt §1). Fraza „pakiet startowy" zostaje
       w treści celowo: `ServiceHero.KAFEL_CENY` opisuje kafel ceny chatbotów
       słowami 1:1 z tego akapitu („od 1790 zł / pakiet startowy"). */
    tresc:
      'Chatbot AI dla firmy kosztuje od 1790 zł netto za pakiet startowy do 15000 zł netto za wdrożenie z integracjami. Każdy próg ma swój czas: od 1 do 2 dni roboczych przy prostym bocie do 10 dni roboczych przy pełnych integracjach.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę.
       v23 (2026-08-20): na wejściu sekcji stoi PAS METRYK i PRZEŁĄCZNIK progów,
       czyli chwyty zmierzone u wzorca (/void pas czterech liczb w czterech
       barwach, /praxis rząd klikalnych kart z panelem wybranej). Liczby 1:1
       z drabiny progów, która i tak stoi niżej w tabeli. */
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          { wartosc: '1790 zł', opis: 'chatbot prosty, netto', zrodlo: 'próg 1 z tabeli niżej', ton: 'cyan' },
          { wartosc: '1-2 dni', opis: 'wdrożenie progu prostego', zrodlo: 'od przekazania materiałów', ton: 'green' },
          { wartosc: '99-599 zł', opis: 'opieka miesięcznie, netto', zrodlo: 'albo 0 zł po przekazaniu', ton: 'amber' },
          { wartosc: '2 rundy', opis: 'poprawek w cenie wdrożenia', ton: 'violet' },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Który próg pasuje do Twojej firmy?',
        ikona: 'lupa-wykres',
        chip: 'WYBIERZ PRÓG',
        overline: 'CENNIK · TRZY PROGI',
      },
      {
        typ: 'przelacznik',
        grupa: 'chatbot-progi',
        opcje: [
          {
            numer: 'PRÓG 1',
            tytul: 'Prosty',
            podtytul: '1790 zł netto',
            naglowek: 'Chatbot prosty: 1790 zł netto, 1 do 2 dni roboczych',
            akapity: [
              'Bot na stronę www z bazą wiedzy, którą podpinamy my. Odpowiada na powtarzalne pytania, zbiera leady i odsyła klienta we właściwe miejsce na stronie.',
            ],
            punkty: [
              'Baza wiedzy z Twoich materiałów, podpięta przez nas.',
              'Zbieranie leadów i kontaktu do klienta.',
              'Odsyłanie do właściwych miejsc na stronie.',
            ],
          },
          {
            numer: 'PRÓG 2',
            tytul: 'Średni',
            podtytul: '3000-6000 zł netto',
            naglowek: 'Chatbot średni: 3000 do 6000 zł netto, 3 do 4 dni roboczych',
            akapity: [
              'To, co w progu prostym, plus rozbudowana baza wiedzy i dodatkowe funkcje dopasowane do tego, o co realnie pytają Twoi klienci.',
            ],
            punkty: [
              'Wszystko z progu prostego.',
              'Rozbudowana baza wiedzy.',
              'Dodatkowe funkcje pod Twój proces.',
            ],
          },
          {
            numer: 'PRÓG 3',
            tytul: 'Duży',
            podtytul: '8000-15000 zł netto',
            naglowek: 'Chatbot duży: 8000 do 15000 zł netto, 5 do 10 dni roboczych',
            akapity: [
              'Pełny zakres z integracjami. Cena zależy od liczby elementów do zbudowania i od tego, z iloma systemami bot ma się połączyć.',
            ],
            punkty: [
              'Pełne integracje z Twoimi systemami.',
              'Zakres i termin ustalamy na diagnozie.',
              'Dwie rundy poprawek w cenie, jak w każdym progu.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Próg',
          'Cena netto',
          'Czas wdrożenia',
          'Co dostajesz',
        ],
        wiersze: [
          [
            'Prosty (pakiet startowy)',
            '1790 zł',
            '1-2 dni robocze',
            'bot na stronę WWW, baza wiedzy podpięta przez nas, zbieranie leadów, odsyłanie do miejsc na stronie',
          ],
          [
            'Średni',
            '3000-6000 zł',
            '3-4 dni robocze',
            'to co wyżej plus rozbudowana baza wiedzy i dodatkowe funkcje',
          ],
          [
            'Duży z integracjami',
            '8000-15000 zł',
            '5-10 dni roboczych',
            'pełny zakres, zależnie od liczby elementów do zbudowania',
          ],
        ],
        wKarcie: true,
        podpis: 'Tak wyceniamy chatboty AI dla firm: wszystkie kwoty netto. Czas liczymy od przekazania kompletu materiałów, czyli bazy wiedzy, treści i dostępów, nie od podpisania umowy.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Ile rund poprawek jest w cenie wdrożenia?',
        wariant: 'top',
        chip: 'ZASADA',
        akapity: [
          'Dwie, i obie masz w cenie wdrożenia, nie jako płatny dodatek. Harmonogram wygląda tak: pierwszy tydzień testujesz bota u siebie i spisujesz uwagi, my je wdrażamy. Drugi tydzień testów przynosi drugą porcję poprawek, a na końcu jest odbiór.',
          'Co liczy się jako poprawka? Wszystko, co miało działać i nie działa: zła odpowiedź, zgubiony kontakt, odesłanie w niewłaściwe miejsce na stronie. Takie rzeczy naprawiamy zawsze, także po odbiorze.',
          'Rozbudowa to co innego: nowa funkcja, której nie było w pierwszej rozmowie. Ją wyceniamy osobno.',
        ],
        stopka: [
          'czas liczymy od przekazania kompletu materiałów',
          'dwie rundy poprawek w cenie',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Opieka po wdrożeniu: 99 do 599 zł netto miesięcznie albo 0 zł',
        wariant: 'edge',
        chip: 'CENNIK',
        akapity: [
          'Opiekę rozliczasz na jeden z dwóch sposobów i zawsze pokazujemy oba. Pierwszy: przekazujemy Ci całą infrastrukturę i abonament wynosi 0 zł. Drugi: projekt zostaje u nas za 99 do 599 zł netto miesięcznie, a my pilnujemy bota i dokładamy odpowiedzi na pytania, które klienci faktycznie zadają.',
          'Dla porównania: utrzymanie voicebota kosztuje 299 do 1500 zł netto miesięcznie, bo po stronie głosowej dochodzi telefonia, minuty rozmów i scenariusze głosowe. Opieka chatbota zaczyna się od 99 zł netto, bo pilnowania jest po prostu mniej.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Żeby nie pomylić produktów: chatbot dla firmy za 1790 zł netto odpowiada Twoim klientom na stronie, a AI Start za 1990 zł to pierwsza automatyzacja jednego procesu wewnątrz firmy, na próbę.',
      },
    ],
    minPrice: 1790, // próg „prosty" (audyt §1, 2026-08-19): kwota w UI + offers w Service JSON-LD.
    /* SEO 2026-08-17: linkowanie wewnętrzne do poradnika cenowego (zdanie 1:1
       z brief-seo-2026-08-17; render w RamaCeny.tsx w tym samym akapicie). */
    linkPoradnik: {
      przed: 'Pełny rozkład kosztów chatbota opisaliśmy w poradniku: ',
      etykieta: 'ile kosztuje chatbot dla firmy w 2026',
      po: '.',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
    },
  },

  faq: [
    {
      pytanie: 'Ile kosztuje chatbot AI dla firmy?',
      odpowiedz:
        'Chatbot prosty kosztuje 1790 zł netto i wdrażamy go w 1 do 2 dni roboczych. Chatbot średni, z rozbudowaną bazą wiedzy i dodatkowymi funkcjami, to 3000 do 6000 zł netto i 3 do 4 dni roboczych. Chatbot duży, z pełnymi integracjami, to 8000 do 15000 zł netto i 5 do 10 dni roboczych. Opieka po wdrożeniu kosztuje 99 do 599 zł netto miesięcznie albo 0 zł, gdy przekazujemy Ci całą infrastrukturę.',
    },
    {
      pytanie: 'Czym chatbot różni się od AI Agenta?',
      odpowiedz:
        'Chatbot odpowiada na pytania. AI Agent wykonuje całe zadania. Chatbot poda godziny otwarcia. Agent sprawdzi kalendarz, zaproponuje termin, zapisze wizytę i wyśle potwierdzenie. U nas chatbot to pierwszy krok, który możesz później rozwinąć w Agenta.',
    },
    {
      pytanie: 'Czy chatbot będzie zmyślał odpowiedzi?',
      odpowiedz:
        'Nie. Uczymy go na Twojej wiedzy i tak ustawiamy, żeby trzymał się faktów. Kiedy nie zna odpowiedzi, mówi to wprost i przekazuje sprawę do Ciebie, zamiast wymyślać. Klient zawsze wie, że rozmawia z AI.',
    },
    {
      pytanie: 'Gdzie działa chatbot?',
      odpowiedz:
        'Na Twojej stronie i tam, gdzie piszą Twoi klienci: w popularnych komunikatorach i na profilach firmy. Jedna wiedza, ten sam bot, wiele kanałów. Klient pisze tam, gdzie mu wygodnie, a Ty masz to w jednym miejscu.',
    },
    {
      pytanie: 'Ile trwa wdrożenie chatbota AI dla firmy?',
      odpowiedz:
        'Od 1 do 10 dni roboczych, zależnie od progu. Chatbot prosty na stronę: 1 do 2 dni roboczych. Chatbot średni, z rozbudowaną bazą wiedzy: 3 do 4 dni roboczych. Chatbot duży, z integracjami: 5 do 10 dni roboczych. Czas liczymy od przekazania kompletu materiałów przez Ciebie, czyli bazy wiedzy, treści i dostępów, a nie od podpisania umowy.',
    },
    {
      pytanie: 'Czy chatbot zastąpi moją obsługę klienta?',
      odpowiedz:
        'Nie zastąpi, odciąży. Bierze na siebie powtarzalne pytania i nocne wiadomości, a Twoi ludzie zajmują się trudniejszymi sprawami i relacją z klientem. Zespół ma mniej powtarzalnej roboty, nie mniej pracy do zwolnień.',
    },
    /* 2026-08-19 (audyt §1 i §9 etap 1 pkt 4): DWA DOŁOŻONE pytania. Rundy
       poprawek i zasada liczenia czasu to nasze własne zobowiązania, czyli
       materiał, który model może zacytować jako fakt o dostawcy. Żadne
       istniejące pytanie nie zostało usunięte. */
    {
      pytanie: 'Ile rund poprawek jest w cenie wdrożenia?',
      odpowiedz:
        'Dwie. Testujesz bota przez tydzień i zapisujesz uwagi, my je wdrażamy. Testujesz drugi tydzień i zgłaszasz kolejne, wdrażamy je i wtedy jest odbiór. Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze. Nowe funkcje, których nie było w pierwszej rozmowie, to rozbudowa wyceniana osobno.',
    },
    {
      pytanie: 'Ile kosztuje opieka nad chatbotem i czym różni się od opieki nad voicebotem?',
      odpowiedz:
        'Opieka nad chatbotem kosztuje 99 do 599 zł netto miesięcznie, gdy projekt zostaje u nas. Opieka nad voicebotem to 299 do 1500 zł netto miesięcznie, bo voicebot jest trudniejszy w utrzymaniu: dochodzi telefonia, minuty rozmów i scenariusze głosowe. W obu przypadkach możesz zamiast tego wziąć całą infrastrukturę do siebie i wtedy nie płacisz nam abonamentu.',
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

  queries: [
    'chatbot dla firmy',
    'wdrożenie chatbota',
    'ile kosztuje chatbot',
    'ile kosztuje chatbot dla firmy',
    'chatbot AI dla firmy',
    'chatbot na stronę www',
  ],

  /* v22 (linki §3, P1 #5): 427 wyświetleń w GSC, najwięcej w serwisie, pozycja
     16,6 i CTR 0,7%. Strona miała poradnik, ale ZERO dowodu wdrożenia i ZERO
     narzędzia. Obie realizacje mają kategorię `chatboty`, czyli już dziś
     linkują TUTAJ, tylko zwrotnie nie było nic. */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Chatbot edukacyjny do kursów online',
        href: '/realizacje/chatbot-edukacyjny-kursy',
        opis:
          'Kursant pyta chatbota i od razu trafia do właściwej lekcji, zamiast przeszukiwać setki materiałów VOD.',
      },
      {
        etykieta: 'Firmowi Agenci AI 24/7',
        href: '/realizacje/agenci-ai-24-7',
        opis:
          'Agent odpowiada nowym leadom o każdej porze, także w nocy i w weekend, bez czuwania zespołu.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis:
          'Policz koszt jednego procesu rocznie i to, po ilu miesiącach zwróci się wdrożenie. Koszt podajesz Ty.',
      },
    ],
  },
};
