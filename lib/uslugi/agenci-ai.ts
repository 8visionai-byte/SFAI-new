import type { Usluga } from './types';

/**
 * USŁUGA: AGENCI AI DLA FIRM (strona zbiorcza, /uslugi/agenci-ai).
 * Powstała 2026-10-14 w operacji naprawczej SEO
 * (`.seo-przeglad/naprawa-2026-10-13/zwiad.json`, klaster `agenci-ai`).
 * Powód: na „agent ai dla firm" i „agenci ai dla firm" mieliśmy 0 wyświetleń
 * w GSC przez 90 dni, a adres /uslugi/agenci-ai zwracał 404. Agenci byli
 * rozproszeni po sześciu stronach bez strony zbiorczej.
 *
 * ROLA STRONY: katalog agentów, których realnie wdrażamy, z jawnym cennikiem
 * netto w jednym miejscu. Strony szczegółowe (chatboty, voiceboty,
 * automatyzacje, agent rekrutacyjny, asystent prezesa, rozwiązania) zostają
 * nietknięte; ta strona do nich linkuje przez `powiazane`, bo bloki treści to
 * czysty tekst bez linków.
 *
 * ŹRÓDŁA KAŻDEJ LICZBY (nic spoza tej listy):
 *  - czat 1790 / 3000-6000 / 8000-15000 zł netto, 1-2 / 3-4 / 5-10 dni
 *    roboczych, utrzymanie 99-599 zł albo 0 zł, zmiany 350 zł netto za
 *    godzinę: lib/uslugi/podstrony/chatboty-cennik.ts (drabina, przełącznik
 *    utrzymania), lib/uslugi/chatboty.ts (ramaCeny),
 *  - telefon 2500 / 5000-9000 zł netto, 3-5 / 5-25 dni roboczych, utrzymanie
 *    299-1500 zł albo 0 zł: lib/uslugi/voiceboty.ts (tabela kosztów, nagłówek),
 *  - asystent prezesa 4999 zł netto, 5-10 dni roboczych, 199 zł netto
 *    miesięcznie: lib/uslugi/asystent-prezesa.ts (kapsuła),
 *  - automatyzacja procesu 3000-10000 zł netto, AI Start 1990 zł netto,
 *    opieka 99-599 zł albo 0 zł: lib/uslugi/automatyzacje.ts (ramaCeny),
 *    lib/uslugi/chatboty.ts (punkt o AI Start),
 *  - Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych, raport PDF, kwota
 *    odliczana od wdrożenia: lib/uslugi/audyt-ai.ts, chatboty-cennik.ts,
 *  - agent rekrutacyjny (start od Sprintu, scoring w kilka dni, opieka
 *    99-599 zł albo 0 zł): lib/uslugi/agent-rekrutacyjny.ts,
 *  LICZBY Z WDROŻEŃ WYŁĄCZNIE Z lib/realizacje (zasada zadania 2026-10-14):
 *  - Instytut Kryptografii około 85% draftów, mail idzie od razu albo po
 *    drobnej poprawce: lib/realizacje/auto-email-bok.ts,
 *  - Instytut Kryptografii, chatbot w kursie (setki nagrań VOD, kursant od
 *    razu trafia do lekcji): lib/realizacje/chatbot-edukacyjny-kursy.ts,
 *  - Trockenhaus oferta w 20 minut zamiast 2 do 4 godzin, narzędzie samo
 *    sprawdza ceny w hurtowniach:
 *    lib/realizacje/z-niewidocznej-strony-do-top3-google.ts,
 *  - Lead Generator 1000 rekordów w 40 minut zamiast 2 tygodni (wdrożenie
 *    własne): lib/realizacje/lead-generator.ts,
 *  - agent na spotkaniach (bez liczby): lib/realizacje/auto-podsumowania-spotkan.ts.
 *  Celowo NIE użyte, bo stoją tylko w lib/uslugi, nie w lib/realizacje:
 *  580 maili tygodniowo (IK), około 8 h tygodniowo (KNF Team),
 *  30-50 klientów miesięcznie (Desant.pl).
 *
 * ŚWIADOME DECYZJE TREŚCI:
 *  - 1790 zł netto to agent czatowy BEZ integracji, czyli w praktyce chatbot.
 *    Strona mówi to wprost (zgodnie z zasadą serwisu „chatbot odpowiada,
 *    agent działa"), a agenta, który działa w systemach, wycenia osobno.
 *  - Brak zdania „dane zostają w UE": przy silniku wybranym przez klienta
 *    region przetwarzania u dostawcy modelu nie jest potwierdzony (uwaga
 *    w zwiad.json, HIPOTEZA ryzyka prawnego). Zostaje to, co pewne: co trafia
 *    do dostawcy, co wycinamy, czyje jest konto, umowa powierzenia.
 *  - Agent do maili: „wycena na diagnozie" (karta i tabela cennika), tak
 *    jak rekrutacja i agent na zamówienie. Widełki 3000-10000 zł netto były
 *    wnioskiem z cennika automatyzacji, bez potwierdzenia Pawła (recenzja
 *    fali 1, 2026-10-14). Kwota wraca dopiero po jego decyzji.
 *  - metaTitle bez „cennik 2026" i FAQ bez pytań poradnika (recenzja fali 1,
 *    kanibalizacja): ta strona bierze „agenci AI dla firm" (katalog i oferta),
 *    poradnik /poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy bierze
 *    pytania kosztowe. Pytanie „Ile kosztuje agent AI miesięcznie?" usunięte
 *    z FAQ (odpowiada na nie sekcja „Co płacisz co miesiąc za agenta AI"),
 *    „Czym agent AI różni się od chatbota?" przeformułowane.
 *  - Nagłówki bloków NIE powtarzają pytań z FAQ (lekcja 2026-09-22:
 *    ta sama para pytanie-odpowiedź dwa razy w FAQPage).
 *  - Voicebot: tylko połączenia przychodzące, nigdy „dzwoni sam".
 *
 * NACZYNIA POŁĄCZONE (robi integrator, nie ten plik): lib/uslugi/index.ts,
 * components/uslugi/ServiceHero.tsx (H1_KOLOR, KAFEL_CENY), lib/inf-kategorie.ts,
 * app/uslugi/page.tsx (klaster huba), components/layout/nav-data.ts,
 * public/llms.txt, public/wiedza-agenta.txt, lib/agent/knowledge.ts.
 */
export const agenciAi: Usluga = {
  slug: 'agenci-ai',
  dataAktualizacji: '2026-10-14',
  h1: 'Agenci AI dla firm na czacie, w telefonie i w procesach',

  /* Kapsuła: definicja w dwóch pierwszych zdaniach, potem gdzie pracują
     nasi agenci, najniższa cena i zasada kontroli. Fraza w pierwszym zdaniu. */
  kapsula:
    'Agent AI dla firm to program, który dostaje zadanie i sam je wykonuje w Twoich narzędziach: odpowiada klientowi, sprawdza kalendarz, zapisuje dane w CRM, przygotowuje odpowiedź na maila. Chatbot odpowiada, agent działa. Wdrażamy agentów na czacie, w telefonie i w procesach za kulisami. Najprostszy agent czatowy kosztuje 1790 zł netto. Decyzje o wysokiej stawce zostają u człowieka.',

  /* 43 znaki + sufiks marki z layoutu („ · SimpleFast.ai", 16) = 59.
     2026-10-14 (recenzja fali 1): bez „cennik 2026", bo to fraza poradnika
     kosztowego; zostaje fraza główna i trzy miejsca pracy agentów z H1. */
  metaTitle: 'Agenci AI dla firm: czat, telefon i procesy',
  metaDescription:
    'Agenci AI dla firm z jawnym cennikiem: czat od 1790 zł netto, telefon od 2500 zł netto, asystent prezesa 4999 zł netto. Wdrożenie od 1-2 dni roboczych.',

  problem: {
    h2: 'Czym jest agent AI dla firm i kiedy wystarczy chatbot?',
    tresc:
      'Chatbot odpowiada na pytania. Automatyzacja powtarza stałą regułę. Agent AI dostaje zadanie i sam je wykonuje w Twoich systemach, a to, co wymaga decyzji, oddaje człowiekowi.',
    bloki: [
      {
        typ: 'tabela',
        naglowki: ['Co porównujemy', 'Chatbot', 'Automatyzacja', 'Agent AI'],
        wiersze: [
          [
            'Co robi',
            'Odpowiada na pytania z Twojej wiedzy i zbiera kontakt',
            'Przenosi dane i wysyła potwierdzenia według stałej reguły',
            'Sam wykonuje zadanie w Twoich systemach: sprawdza, zapisuje, przygotowuje odpowiedź',
          ],
          [
            'Kiedy wystarczy',
            'Klienci pytają w kółko o to samo',
            'Proces za każdym razem idzie tak samo',
            'Każda sprawa jest trochę inna i trzeba coś sprawdzić albo zapisać',
          ],
          [
            'Przykład u nas',
            'Instytut Kryptografii: kursant od razu trafia do właściwej lekcji spośród setek nagrań kursu',
            'Lead Generator: 1000 rekordów w 40 minut zamiast 2 tygodni',
            'Instytut Kryptografii: około 85% draftów maili pisze AI',
          ],
          [
            'Cena startowa netto',
            '1790 zł',
            'AI Start 1990 zł, pełny proces 3000-10000 zł',
            'czat z integracjami 8000-15000 zł, telefon z integracjami 5000-9000 zł',
          ],
        ],
        wKarcie: true,
        podpis:
          'Chatbot, automatyzacja i agent AI: co robi każde z nich, kiedy wystarczy i ile kosztuje na start. Kwoty netto.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy agenta AI nie potrzebujesz?',
        wariant: 'top',
        chip: 'DECYZJA',
        akapity: [
          'Agent kosztuje więcej niż chatbot, bo pracuje w Twoich systemach, a każdy system to osobne dostępy, testy i obsługa błędów. Dlatego nie wciskamy go tam, gdzie wystarczy coś prostszego:',
        ],
        punkty: [
          'Klienci tylko pytają o godziny, cennik i dojazd. Wystarczy chatbot.',
          'Proces idzie zawsze tak samo, krok po kroku. Wystarczy automatyzacja.',
          'Przychodzi kilka zapytań tygodniowo. Odpowiadanie osobiście jest wtedy Twoją przewagą, a nie kosztem.',
          'Wiedza siedzi w głowach, a nie w dokumentach. Agent nie wymyśli procedury, której nikt nie spisał, więc zaczynamy od spisania.',
          'Zadanie jest jednorazowe. Wtedy nic nie wdrażaj, zrób je ręcznie.',
        ],
        stopka: ['Powiemy to wprost, także wtedy, gdy oznacza to brak zlecenia dla nas.'],
      },
      {
        typ: 'sekcja',
        naglowek: 'Agent AI a zwykły czat AI w przeglądarce',
        wariant: 'quiet',
        akapity: [
          'Zwykły czat AI nie zna Twojej firmy i nie ma dostępu do Twoich plików ani systemów. Za każdym razem zaczynasz od tłumaczenia, czym się zajmujesz, a gotową odpowiedź i tak sam przenosisz tam, gdzie ma trafić.',
          'Agent pracuje na Twojej wiedzy i w Twoich narzędziach. Wchodzi w udostępnione pliki i systemy i działa na nich, zamiast tylko podpowiadać, co zrobić.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jakich agentów AI dla firm wdrażamy?',
    tresc:
      'Agenci AI w firmie pracują u nas w trzech miejscach: na czacie, w telefonie i w procesach za kulisami. Poniżej sześć rodzajów, które realnie wdrażamy, z cenami netto i czasem wdrożenia. Każdy ma osobną stronę z opisem, linki są pod cennikiem.',
    bloki: [
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Agent obsługi klienta na czacie',
            akapity: [
              'Odpowiada klientom na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie, z Twojej oferty, cennika i procedur. Zbiera kontakt, a sprawę, która go przerasta, oddaje człowiekowi. Ta sama technologia działa jako asystent dla pracowników, z procedur i instrukcji firmy.',
            ],
            punkty: [
              'Bot na stronie WWW: 1790 zł netto, 1-2 dni robocze.',
              'Z komunikatorami i większą bazą wiedzy: 3000-6000 zł netto, 3-4 dni robocze.',
              'Z integracjami (CRM, kalendarz, sklep): 8000-15000 zł netto, 5-10 dni roboczych.',
            ],
          },
          {
            naglowek: 'Agent głosowy, który odbiera telefony',
            akapity: [
              'Odbiera połączenia przychodzące, rozmawia po polsku, umawia wizytę w Twoim kalendarzu i zostawia notatkę z rozmowy. Nie wydzwania do ludzi. Sprawę, która go przerasta, spisuje i oddaje Tobie, a klient od początku słyszy, że rozmawia z asystentem AI.',
            ],
            punkty: [
              'Prosty: 2500 zł netto, 3-5 dni roboczych.',
              'Z integracjami, na przykład z kalendarzem: 5000-9000 zł netto, 5-25 dni roboczych.',
              'Utrzymanie: 299-1500 zł netto miesięcznie albo 0 zł.',
            ],
          },
          {
            naglowek: 'Agent do maili i procesów za kulisami',
            akapity: [
              'Czyta przychodzącego maila, sięga do historii korespondencji z klientem i przygotowuje gotowy draft odpowiedzi. Pracownik czyta, w razie potrzeby poprawia i wysyła. Z tej samej rodziny jest agent, który dołącza do spotkania na Meet, Zoom albo Teams i po rozmowie wysyła raport z zadaniami dla konkretnych osób.',
            ],
            punkty: [
              'Instytut Kryptografii: około 85% draftów odpowiedzi pisze AI, a mail idzie do klienta od razu albo po drobnej poprawce.',
              'Wycenę podajemy na bezpłatnej diagnozie, zależnie od liczby integracji.',
            ],
          },
          {
            naglowek: 'Agent rekrutacyjny',
            akapity: [
              'Zbiera CV z formularza i ze skrzynki, robi pierwszy odsiew i wstępną ocenę pod Twoje kryteria, odpowiada kandydatom i umawia rozmowy w kalendarzu. Decyzję o zatrudnieniu zawsze podejmuje człowiek.',
            ],
            punkty: [
              'Wersja, która czyta CV i robi wstępną ocenę, potrafi ruszyć w kilka dni.',
              'Najczęściej zaczynamy od Sprintu Diagnostycznego za 1490 zł netto, odliczanego od wdrożenia.',
            ],
          },
          {
            naglowek: 'Prywatny asystent AI dla prezesa',
            akapity: [
              'Agent z własnym interfejsem, który uczy się jednej osoby. Pisze maile w jej tonie, robi research, przygotowuje do rozmów, składa prezentacje i pracuje na plikach, które mu udostępnisz. Czego nie udostępnisz, tego nie dotknie.',
            ],
            punkty: [
              'Stworzenie: 4999 zł netto, płatne raz.',
              'Budowa: 5-10 dni roboczych.',
              'Serwery: 199 zł netto miesięcznie, zużycie modeli po Twojej stronie.',
            ],
          },
          {
            naglowek: 'Agent na zamówienie, który spina kilka systemów',
            akapity: [
              'Przydaje się, gdy praca nie mieści się w jednym narzędziu i dziś człowiek ręcznie przenosi dane między systemami. Agent prowadzi całą ścieżkę od początku do końca, pokazuje wynik i czeka na akceptację tam, gdzie stawka jest wysoka.',
            ],
            punkty: [
              'Przykład: dla Trockenhaus narzędzie do kosztorysowania samo sprawdza aktualne ceny w hurtowniach.',
              'Zaczynamy od najmniejszej działającej wersji, bez płacenia za funkcje na zapas.',
              'Na bezpłatnej diagnozie mówimy, czy warto budować od zera, czy taniej złożyć z gotowych klocków.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co agenci i automaty dali we wdrożeniach',
        ikona: 'wykres-strzalka',
        chip: 'REALIZACJA',
        overline: 'INSTYTUT KRYPTOGRAFII · TROCKENHAUS · LEAD GENERATOR',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'około 85%',
            opis: 'draftów odpowiedzi w biurze obsługi klienta pisze AI. Mail idzie do klienta od razu albo po drobnej poprawce, a wysyłkę zatwierdza pracownik.',
            zrodlo: 'Instytut Kryptografii, agent do maili',
            ton: 'cyan',
          },
          {
            wartosc: '20 minut',
            opis: 'na przygotowanie oferty zamiast 2 do 4 godzin ze sprawdzaniem cen. Narzędzie samo sprawdza aktualne ceny w hurtowniach.',
            zrodlo: 'Trockenhaus, narzędzie na zamówienie',
            ton: 'green',
          },
          {
            wartosc: '40 minut',
            opis: 'na 1000 rekordów potencjalnych klientów zamiast 2 tygodni ręcznej pracy.',
            zrodlo: 'Lead Generator, wdrożenie własne, automat',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co agent AI robi sam, a co zatwierdza człowiek',
        wariant: 'edge',
        chip: 'ZASADA',
        akapity: [
          'Granice ustalamy na starcie: co agent robi sam, do czego ma dostęp i czego nie dotyka. Tam, gdzie stawka jest wysoka, agent wykonuje pracę, pokazuje wynik i czeka na akceptację.',
          'W każdej chwili widzisz, co agent zrobił, możesz to poprawić albo go zatrzymać. Czego nie wie, tego nie zmyśla, tylko przekazuje sprawę człowiekowi.',
        ],
        punkty: [
          'Agent do maili: nic nie wychodzi do klienta bez kliknięcia pracownika.',
          'Agent rekrutacyjny: robi odsiew, a decyzję o zatrudnieniu podejmuje człowiek.',
          'Agent głosowy: sprawę, która go przerasta, spisuje i oddaje Tobie.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Na jakim silniku działa agent i czyje jest konto',
        wariant: 'quiet',
        akapity: [
          'Silnik wybierasz Ty: OpenAI, Anthropic albo Google. Doradzamy, który pasuje do Twoich zadań i budżetu, ale konto u dostawcy modelu należy do Ciebie, a za zużycie płacisz mu bezpośrednio, bez naszej marży.',
          'Baza wiedzy jest Twoja od pierwszego dnia. Jeśli kończymy współpracę, zabierasz dokumenty i konfigurację ze sobą, a my przekazujemy Ci całą infrastrukturę.',
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Ręczna obsługa procesu a agent AI',
    naglowekBez: 'Ręcznie',
    naglowekZNami: 'Agent AI od SimpleFast.ai',
    wiersze: [
      { cecha: 'Dostępność', bez: 'W godzinach pracy', zNami: '24/7, też wieczorem i w weekend' },
      {
        cecha: 'Reakcja na zapytanie',
        bez: 'Gdy ktoś zdąży',
        zNami: 'Od razu, a trudną sprawę dostaje człowiek',
      },
      {
        cecha: 'Dane między systemami',
        bez: 'Człowiek przepisuje ręcznie',
        zNami: 'Przenosi agent, człowiek pilnuje wyjątków',
      },
      {
        cecha: 'Decyzje o wysokiej stawce',
        bez: 'Człowiek',
        zNami: 'Nadal człowiek, agent przygotowuje materiał',
      },
      {
        cecha: 'Koszt po wdrożeniu',
        bez: 'Godziny pracy zespołu, co miesiąc',
        zNami: 'Opieka albo 0 zł po przekazaniu infrastruktury',
      },
      {
        cecha: 'Konto i baza wiedzy',
        bez: 'Wiedza w głowach ludzi',
        zNami: 'Twoje: konto u dostawcy i baza wiedzy',
      },
    ],
  },

  kroki: {
    h2: 'Jak wygląda wdrożenie agenta AI krok po kroku?',
    items: [
      {
        tytul: 'Bezpłatna rozmowa',
        opis:
          'Około 30 minut. Pytamy, gdzie ucieka czas i co agent miałby przejąć. Mówimy, czy potrzebny jest agent, czy wystarczy chatbot albo automatyzacja. Gdy procesów do rozplanowania jest kilka, proponujemy płatny Sprint Diagnostyczny.',
      },
      {
        tytul: 'Najmniejsza działająca wersja',
        opis:
          'Budujemy agenta do jednego zadania i testujemy go na Twoich danych. Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy: od 1-2 dni roboczych przy prostym agencie czatowym do 25 dni roboczych przy agencie głosowym z integracjami. Dwie rundy poprawek są w cenie.',
      },
      {
        tytul: 'Odbiór i wybór utrzymania',
        opis:
          'Po odbiorze wybierasz: przekazujemy Ci infrastrukturę i nie płacisz nam abonamentu albo agent zostaje u nas pod opieką za stałą opłatę miesięczną. To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje wdrożenie agenta AI?',
    tresc:
      'Agent AI dla firmy kosztuje u nas od 1790 zł netto za agenta czatowego bez integracji. Agent, który działa w Twoich systemach, to 8000-15000 zł netto na czacie albo 5000-9000 zł netto w telefonie. Prywatny asystent prezesa kosztuje 4999 zł netto.',
    /* 1790 = najniższa cena agenta w naszych cennikach (chatboty.ts minPrice,
       chatboty-cennik.ts, asystent-wewnetrzny.ts). Kafel ceny w hero, karta
       ceny i offers.minPrice w Service JSON-LD. Widełki, więc bez cenaStala. */
    minPrice: 1790,
    bloki: [
      {
        typ: 'tabela',
        naglowki: ['Agent', 'Wdrożenie netto', 'Czas wdrożenia', 'Co miesiąc netto'],
        wiersze: [
          ['Czat: bot na stronie WWW', '1790 zł', '1-2 dni robocze', '99-599 zł albo 0 zł'],
          ['Czat: z komunikatorami', '3000-6000 zł', '3-4 dni robocze', '99-599 zł albo 0 zł'],
          ['Czat: z integracjami', '8000-15000 zł', '5-10 dni roboczych', '99-599 zł albo 0 zł'],
          ['Telefon: prosty', '2500 zł', '3-5 dni roboczych', '299-1500 zł albo 0 zł'],
          ['Telefon: z integracjami', '5000-9000 zł', '5-25 dni roboczych', '299-1500 zł albo 0 zł'],
          ['Maile i procesy', 'wycena na diagnozie', 'pierwszy proces w dni', '99-599 zł albo 0 zł'],
          ['Rekrutacja', 'wycena na diagnozie', 'ocena CV w kilka dni', '99-599 zł albo 0 zł'],
          ['Asystent prezesa', '4999 zł', '5-10 dni roboczych', '199 zł za serwery'],
          ['Na zamówienie', 'wycena na diagnozie', 'najpierw najmniejsza wersja', 'opieka pod Twój zakres'],
        ],
        wKarcie: true,
        podpis:
          'Cennik agentów AI: kwoty netto, czas liczony od przekazania kompletu materiałów, dwie rundy poprawek w cenie. Zużycie modelu i minut rozmów płacisz dostawcy bezpośrednio.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co płacisz co miesiąc za agenta AI',
        wariant: 'top',
        chip: 'UTRZYMANIE',
        akapity: [
          'Agent ma trzy pozycje kosztu: wdrożenie płatne raz, utrzymanie i zużycie modelu. Utrzymanie zależy od jednej decyzji: infrastruktura zostaje u nas i płacisz stałą kwotę albo przekazujemy ją Tobie i co miesiąc nie płacisz nam nic.',
        ],
        punkty: [
          'Agent czatowy: 99-599 zł netto miesięcznie albo 0 zł.',
          'Agent głosowy: 299-1500 zł netto miesięcznie albo 0 zł. Drożej niż czat, bo dochodzi telefonia, minuty rozmów i synteza głosu do pilnowania.',
          'Asystent prezesa: 199 zł netto miesięcznie za serwery.',
          'Po przekazaniu infrastruktury zmiany zamawiasz po 350 zł netto za godzinę, tylko gdy ich potrzebujesz.',
          'Tokeny i minuty rozmów płacisz dostawcom na swoim koncie, według realnego zużycia.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Od czego zacząć, gdy nie wiesz, którego agenta potrzebujesz',
        wariant: 'quiet',
        chip: 'START',
        akapity: [
          'Pierwsza rozmowa jest bezpłatna i służy zbadaniu potrzeb: pytamy, co dziś zjada czas Tobie i zespołowi. Jeśli trzeba rozplanować kilka procesów naraz, robimy Sprint Diagnostyczny: 1490 zł netto, 5 dni roboczych i raport PDF z mapą procesów.',
          'Te 1490 zł netto odliczamy w całości od ceny wdrożenia, więc gdy wchodzisz w projekt, sprint nic Cię nie kosztuje. Bez ukrytych kosztów.',
        ],
      },
    ],
    linkPoradnik: {
      przed: 'Jak policzyć, czy agent się zwróci, rozpisaliśmy w poradniku: ',
      etykieta: 'ile kosztuje agent AI dla firmy',
      po: '.',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    },
  },

  /* Siedem pytań z „Ludzie też pytają" (zwiad.json, pytaniaLudzieTezPytaja).
     Tekst idzie 1:1 na stronę i do FAQPage JSON-LD. Żadne pytanie nie stoi
     drugi raz jako nagłówek bloku na tej stronie ani słowo w słowo
     w poradniku o koszcie agenta (recenzja fali 1, 2026-10-14). */
  faq: [
    {
      pytanie: 'Co agent AI zrobi w firmie, czego nie zrobi chatbot?',
      odpowiedz:
        'Chatbot odpowiada, agent AI działa. Chatbot odpowie na pytanie o ofertę z Twojej bazy wiedzy. Agent sprawdzi wolny termin w kalendarzu, zapisze wizytę, dopisze klienta do CRM i wyśle potwierdzenie. Dlatego agent kosztuje więcej: każdy system, do którego sięga, to osobne dostępy, testy i obsługa błędów.',
    },
    {
      pytanie: 'Ile kosztują agenci AI na czacie i w telefonie?',
      odpowiedz:
        'Od 1790 zł netto za agenta czatowego bez integracji, gotowego w 1-2 dni robocze. Agent czatowy z integracjami to 8000-15000 zł netto, agent głosowy 2500 zł netto w wersji prostej albo 5000-9000 zł netto z integracjami, a prywatny asystent prezesa 4999 zł netto. Do tego utrzymanie albo 0 zł po przekazaniu infrastruktury oraz zużycie modelu płacone dostawcy.',
    },
    {
      pytanie: 'Jak długo trwa wdrożenie agenta AI?',
      odpowiedz:
        'Od 1-2 dni roboczych przy prostym agencie czatowym do 25 dni roboczych przy agencie głosowym z integracjami. Agent czatowy z integracjami to 5-10 dni roboczych, asystent prezesa także 5-10 dni roboczych. Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy, a dwie rundy poprawek są w cenie.',
    },
    {
      pytanie: 'Czy agent AI zastąpi moich pracowników?',
      odpowiedz:
        'Nie. Agent zdejmuje z zespołu powtarzalną robotę, a nie ludzi. W Instytucie Kryptografii biuro obsługi klienta nie pisze maili od zera, tylko sprawdza gotowy draft i wysyła. Wycena nietypowego zlecenia, reklamacja i rozmowa, która wymaga wyczucia, zostają przy Twoich ludziach.',
    },
    {
      pytanie: 'Co, jeśli agent AI popełni błąd?',
      odpowiedz:
        'Granice ustawiasz przed startem, więc agent nie robi sam niczego, czego mu nie powierzysz. Przy ważnych decyzjach czeka na akceptację człowieka, a czego nie wie, tego nie zmyśla, tylko oddaje sprawę Tobie. To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze.',
    },
    {
      pytanie: 'Gdzie trafiają dane, na których pracuje agent AI?',
      odpowiedz:
        'Do dostawcy modelu, którego wybierasz Ty: OpenAI, Anthropic albo Google. Trafia tam treść rozmowy i fragmenty bazy wiedzy potrzebne do odpowiedzi. Przed wgraniem mówimy, co ma z bazy wypaść: dane osobowe klientów, marże, dokumenty kadrowe. Konto u dostawcy jest Twoje, a umowę powierzenia danych podpisujemy przed startem.',
    },
    {
      pytanie: 'Czy mogę zacząć od chatbota i rozbudować go do agenta?',
      odpowiedz:
        'Tak. U nas chatbot to pierwszy krok do agenta: najpierw odpowiada na pytania, a gdy będziesz gotowy, dokładamy umawianie, zapisy i integracje. Rozbudowę wyceniamy osobno i mówimy o niej w momencie zgłoszenia, nie po jej zrobieniu.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy, które zadanie w Twojej firmie nadaje się dla agenta AI, a gdzie wystarczy coś prostszego. Bez zobowiązań.',
    dowod:
      'Jeśli agent nie jest Ci potrzebny, usłyszysz to na pierwszej rozmowie, zanim wystawimy jakąkolwiek fakturę.',
  },

  queries: [
    'agenci AI dla firm',
    'agent AI dla firm',
    'wdrożenie agenta AI',
    'agent AI dla biznesu',
    'agenci AI w firmie',
  ],

  /* Linki wychodzące. Etykiety = h1/tytuł strony docelowej, opisy = fakt,
     który stoi na stronie docelowej, bez kwot (kwoty zostają w sekcji ceny).
     Uwaga: `/uslugi/wdrozenie-ai` buduje równolegle inny agent (klaster
     wdrozenie-ai); etykieta = h1 z lib/uslugi/wdrozenie-ai.ts (stan
     2026-10-14), opis = fakt z jego kapsuły. Zmiana h1 tam = zmiana tutaj. */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Auto-email dla biura obsługi klienta',
        href: '/realizacje/auto-email-bok',
        opis:
          'Około 85% draftów odpowiedzi pisze AI, a mail idzie do klienta od razu albo po drobnej poprawce.',
      },
      {
        etykieta: 'Auto-podsumowania spotkań na Meet, Zoom i Teams',
        href: '/realizacje/auto-podsumowania-spotkan',
        opis:
          'Agent dołącza do spotkania, spisuje rozmowę i wysyła raport z zadaniami przypisanymi do konkretnych osób.',
      },
      {
        etykieta: 'Firmowi Agenci AI 24/7',
        href: '/realizacje/agenci-ai-24-7',
        opis:
          'Nasze własne wdrożenie: agenci na firmowej stronie odpowiadają nowym leadom całą dobę, bez nadzoru.',
      },
      {
        etykieta: 'Z niewidocznej strony do pierwszej trójki w Google',
        href: '/realizacje/z-niewidocznej-strony-do-top3-google',
        opis: 'Trockenhaus dostał też narzędzie do kosztorysowania: oferta w 20 minut zamiast 2 do 4 godzin.',
      },
      {
        etykieta: 'Błyskawiczny generator leadów',
        href: '/realizacje/lead-generator',
        opis:
          'Automat, nie agent: 1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis: 'Policz roczny koszt procesu, który ma przejąć agent, i po ilu miesiącach zwróci się wdrożenie.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje agent AI dla firmy? Cennik wdrożenia 2026',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis: 'Od czego zależy koszt agenta, jak policzyć zwrot i po czym poznać, że wdrożenie się spina.',
      },
      {
        etykieta: 'Chatbot czy agent AI: czym się różnią i co wybrać dla firmy',
        href: '/blog/chatbot-czy-ai-agent-roznice',
        opis: 'Chatbot odpowiada, agent działa. Który wybrać.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firm, który odpowiada klientom 24/7',
        href: '/uslugi/chatboty',
        opis: 'Odpowiada klientom na stronie i w komunikatorach, z Twojej wiedzy, i zbiera leady.',
      },
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Odbiera połączenia przychodzące, rozmawia po polsku i umawia wizyty w Twoim kalendarzu.',
      },
      {
        etykieta: 'Automatyzacja procesów w firmie z AI',
        href: '/uslugi/automatyzacje',
        opis: 'Jeden proces od początku do końca: poczta, arkusze, CRM i dokumenty bez ręcznego przepisywania.',
      },
      {
        etykieta: 'Agent AI do rekrutacji i pierwszego kontaktu',
        href: '/uslugi/agent-rekrutacyjny',
        opis: 'Zbiera CV, robi pierwszy odsiew i umawia rozmowy. Decyzję o zatrudnieniu podejmuje człowiek.',
      },
      {
        etykieta: 'Prywatny asystent AI dla prezesa',
        href: '/uslugi/asystent-prezesa',
        opis: 'Agent z własnym interfejsem, który uczy się jednej osoby i pracuje na udostępnionych plikach.',
      },
      {
        etykieta: 'Asystent AI dla pracowników: procedury bez pytania kolegi',
        href: '/uslugi/chatboty/asystent-wewnetrzny',
        opis: 'Odpowiada pracownikom z procedur, instrukcji i regulaminów, a bazę dzieli na role.',
      },
      {
        etykieta: 'Indywidualne rozwiązania AI: aplikacje i wtyczki na zamówienie',
        href: '/uslugi/rozwiazania',
        opis: 'Agent spinający kilka systemów naraz, gdy robota nie mieści się w jednym narzędziu.',
      },
      {
        etykieta: 'Audyt AI firmy: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis: 'Sprint Diagnostyczny z raportem PDF i mapą procesów, gdy nie wiesz, od czego zacząć.',
      },
      {
        etykieta: 'Wdrożenie AI w firmie: etapy, ceny i terminy',
        href: '/uslugi/wdrozenie-ai',
        opis: 'Jak podpiąć AI pod jeden konkretny proces, od bezpłatnej diagnozy do pierwszego procesu na próbę.',
      },
    ],
  },
};
