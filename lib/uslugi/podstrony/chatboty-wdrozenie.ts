/**
 * PODSTRONA: Wdrożenie chatbota AI (fala 2 SEO, 2026-11-03).
 *
 * PO CO: fraza „wdrożenie chatbota" ma 99 wyświetleń w 28 dni (GSC
 * 06.10-02.11), dziś obsługuje ją rodzic /uslugi/chatboty na pozycji 14,1,
 * czyli strona 2. Do tego „wdrożenie chatbota w firmie" 17 wyświetleń. W
 * Google.pl (03.11) stronę 1 zajmują małe firmy z osobną stroną „wdrożenie
 * chatbota" (tanganica, boringowl, kodivostudio, mankasoft, momentumsquads).
 * Rodzic jest CHRONIONY (cytowany w Przeglądzie od AI na „chatbot dla firmy"
 * i „kto wdroży chatbota ai dla firmy"), więc nie przebudowujemy go: ta
 * podstrona bierze intencję „jak wygląda i ile trwa wdrożenie". Tytuł celowo
 * BEZ „dla firm", żeby nie podbierać rodzicowi jego fraz.
 * Konspekt: zwiad 13.10 (.seo-przeglad/naprawa-2026-10-13/zwiad.json, klaster
 * chatboty, nowaStrona), z poprawką: BEZ zdania o danych w UE (otwarta decyzja
 * Pawła, STATUS naprawy).
 *
 * ŹRÓDŁA FAKTÓW (zero nowych liczb):
 *  - progi i czasy 1790 zł / 1-2 dni, 3000-6000 zł / 3-4 dni, 8000-15000 zł /
 *    5-10 dni, czas od kompletu materiałów, dwie rundy poprawek w cenie,
 *    utrzymanie 99-599 zł netto albo 0 zł, zmiany 350 zł netto/h, rachunek na
 *    trzy lata: podstrony/chatboty-cennik.ts
 *  - kanały (strona WWW, WhatsApp, Messenger, Instagram, Telegram), silnik
 *    OpenAI / Anthropic / Google, konto klienta, tokeny bez marży, umowa
 *    powierzenia przed startem, „rozmówca wie, że pisze z AI", co wypada z
 *    bazy (dane osobowe klientów, marże, dokumenty kadrowe): uslugi/chatboty.ts
 *  - testujesz tydzień, wdrażamy uwagi, druga runda, odbiór: poradnik
 *    ile-kosztuje-wdrozenie-ai-agenta-dla-firmy (sekcja o czasie)
 *  - „najdłużej trwają integracje", „nie muszą być poukładane", testy pytaniami
 *    spoza bazy: podstrony/baza-wiedzy.ts
 *  - Desant.pl 30-50 klientów i 200-280 wiadomości miesięcznie:
 *    podstrony/obsluga-klienta.ts; Przystań Jurgen ok. 100 zapytań w sezonie:
 *    podstrony/hotele-pensjonaty.ts; Instytut Kryptografii, trzy boty na
 *    transkrypcjach kursów: podstrony/baza-wiedzy.ts
 *  - poprawki tego, co nie zadziałało po naszej stronie, także po odbiorze,
 *    rozbudowa wyceniana osobno: lib/uslugi/agenci-ai.ts (źródła tam podane)
 *  - Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych, odliczany: audyt-ai.ts
 */
import type { PodstronaUslugi } from './types';

export const chatbotyWdrozenie: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'wdrozenie',
  dataAktualizacji: '2026-11-03',
  h1: 'Wdrożenie chatbota AI krok po kroku: od materiałów do odbioru',

  kapsula:
    'Wdrożenie chatbota AI trwa u nas od 1 do 10 dni roboczych, liczonych od przekazania kompletu materiałów: 1-2 dni bot na stronę WWW, 3-4 dni bot z komunikatorami i większą bazą wiedzy, 5-10 dni bot z integracjami. Potem testy i dwie rundy poprawek w cenie. Silnik wybierasz Ty, a konto u dostawcy modelu jest Twoje.',

  /* 41 znaków + sufiks marki z layoutu = 57. */
  metaTitle: 'Wdrożenie chatbota AI: etapy, czas i cena',
  metaDescription:
    'Wdrożenie chatbota AI w 1-10 dni roboczych od kompletu materiałów: etapy, co robisz Ty, a co my, testy i dwie rundy poprawek. Od 1790 zł netto.',

  problem: {
    h2: 'Ile trwa wdrożenie chatbota i od czego zależy ten czas?',
    tresc:
      'Najdłużej nie trwa technologia, tylko zebranie wiedzy, z której bot ma odpowiadać. Dlatego czas liczymy od przekazania kompletu materiałów, a nie od podpisania umowy.',
    bloki: [
      {
        typ: 'tabela',
        naglowki: ['Próg', 'Co powstaje', 'Czas wdrożenia'],
        wiersze: [
          ['Bot na stronę WWW', 'Baza wiedzy z Twoich materiałów, rozmowa, zbieranie kontaktów', '1-2 dni robocze'],
          ['Bot z komunikatorami', 'Większa baza wiedzy, WhatsApp, Messenger, Instagram, Telegram', '3-4 dni robocze'],
          ['Bot z integracjami', 'Bot sprawdza albo zapisuje coś w CRM, kalendarzu lub sklepie', '5-10 dni roboczych'],
        ],
        wKarcie: true,
        podpis:
          'Trzy progi wdrożenia chatbota AI. Czas liczymy w dniach roboczych od przekazania kompletu materiałów.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co najbardziej wydłuża wdrożenie chatbota?',
        akapity: [
          'Rzadko sam bot. Zwykle czas zjada jedna z trzech rzeczy, o których warto wiedzieć przed startem.',
        ],
        punkty: [
          'Materiały w kilku wersjach: zanim cokolwiek wgramy, trzeba ustalić, który cennik i która procedura obowiązuje dzisiaj.',
          'Integracje z systemami: to najdłuższa część wdrożenia, bo każdy system to osobne dostępy i testy.',
          'Brak osoby, która zatwierdza odpowiedzi bota: wtedy każda runda poprawek czeka na decyzję.',
        ],
        wariant: 'quiet',
        chip: 'CZAS',
      },
      {
        typ: 'sekcja',
        naglowek: 'Gdzie takie wdrożenie już pracuje?',
        akapity: [
          'Te same etapy przeszły wdrożenia, które dziś działają u naszych klientów.',
        ],
        punkty: [
          'Desant.pl: chatbot obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości.',
          'Przystań Jurgen: strona z botem zebrała w sezonie około 100 zapytań.',
          'Instytut Kryptografii: trzy boty na transkrypcjach kursów, które wskazują miejsce w nagraniu, gdzie pada odpowiedź.',
        ],
        wariant: 'edge',
        chip: 'REALIZACJE',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie dzieje się na każdym etapie wdrożenia chatbota?',
    tresc:
      'Każdy etap ma prosty podział: co robisz Ty i co robimy my. Twoja rola jest najważniejsza na początku, bo to Twoja wiedza trafia do bota.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Sześć etapów wdrożenia chatbota AI',
        ikona: 'kalendarz-check',
        chip: 'ETAPY',
        overline: 'CO ROBISZ TY · CO ROBIMY MY',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: '1. Bezpłatna rozmowa',
            akapity: [
              'Badamy potrzeby: o co pytają klienci, którym kanałem piszą i ile z tego mógłby przejąć bot. Mówimy wprost, czy bot ma u Ciebie sens.',
            ],
            punkty: ['Ty: opowiadasz, gdzie ucieka czas.', 'My: proponujemy próg i kanały.'],
          },
          {
            naglowek: '2. Materiały i dostępy',
            akapity: [
              'Zbierasz to, z czego dziś korzysta zespół: cennik, oferty, procedury, regulaminy, opisy produktów, nagrania. Nie muszą być poukładane.',
            ],
            punkty: ['Ty: przekazujesz pliki i dostępy.', 'My: ustalamy, która wersja obowiązuje.'],
          },
          {
            naglowek: '3. Baza wiedzy',
            akapity: [
              'Porządkujemy materiały, dzielimy je na fragmenty i sprawdzamy pytaniami, na które odpowiedzi nie ma, żeby bot przyznawał się do niewiedzy zamiast zgadywać.',
            ],
            punkty: ['Ty: uzupełniasz luki, o które pytamy.', 'My: budujemy i testujemy bazę.'],
          },
          {
            naglowek: '4. Rozmowa i kanały',
            akapity: [
              'Ustawiamy, jak bot się wita, o co dopytuje, kiedy zbiera kontakt i kiedy oddaje sprawę człowiekowi. Podpinamy stronę WWW i wybrane komunikatory.',
            ],
            punkty: ['Ty: zatwierdzasz ton i granice.', 'My: konfigurujemy rozmowę i kanały.'],
          },
          {
            naglowek: '5. Integracje',
            akapity: [
              'Gdy bot ma coś sprawdzić albo zapisać, wpinamy go w Twój CRM, kalendarz albo sklep. Ten etap jest tylko w progu z integracjami i trwa najdłużej.',
            ],
            punkty: ['Ty: dajesz dostęp testowy.', 'My: łączymy i sprawdzamy na danych testowych.'],
          },
          {
            naglowek: '6. Testy i odbiór',
            akapity: [
              'Testujesz bota na prawdziwych pytaniach i zapisujesz uwagi, my je wdrażamy. Potem druga runda i odbiór. Obie rundy poprawek są w cenie.',
            ],
            punkty: ['Ty: testujesz i zgłaszasz uwagi.', 'My: poprawiamy i uruchamiamy.'],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co z danymi i RODO przy wdrożeniu chatbota?',
        akapity: [
          'Umowę powierzenia podpisujemy przed startem. Klient od pierwszej wiadomości wie, że pisze z AI.',
          'Przed wgraniem materiałów mówimy, co ma z nich wypaść: dane osobowe klientów, marże, dokumenty kadrowe. Silnik wybierasz Ty: OpenAI, Anthropic albo Google. Konto u dostawcy modelu należy do Ciebie, a za zużycie płacisz mu wprost, bez naszej marży.',
        ],
        wariant: 'quiet',
        chip: 'DANE',
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Wdrożenie z wykonawcą czy własny chatbot z kreatora?',
    naglowekBez: 'Bot złożony samodzielnie w kreatorze',
    naglowekZNami: 'Wdrożenie z SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Baza wiedzy',
        bez: 'Wgrywasz i sprawdzasz sam',
        zNami: 'Porządkujemy i testujemy pytaniami spoza bazy',
      },
      {
        cecha: 'Testy i poprawki',
        bez: 'W Twoim wolnym czasie',
        zNami: 'Dwie rundy poprawek w cenie',
      },
      {
        cecha: 'Kanały',
        bez: 'Tyle, ile daje panel',
        zNami: 'Strona WWW i cztery komunikatory z jednej bazy',
      },
      {
        cecha: 'Integracje',
        bez: 'Zapytaj, czy w ogóle są możliwe',
        zNami: 'Wpinamy bota w Twoje systemy',
      },
      {
        cecha: 'Konto i baza wiedzy',
        bez: 'Zależy od regulaminu narzędzia',
        zNami: 'Twoje od pierwszego dnia',
      },
      {
        cecha: 'Kiedy ma sens',
        bez: 'Kilka prostych pytań i czas na testy',
        zNami: 'Większa baza wiedzy, kilka kanałów albo integracje',
      },
    ],
  },

  kroki: {
    h2: 'Jak wygląda harmonogram wdrożenia chatbota?',
    items: [
      {
        tytul: 'Przed startem: rozmowa i komplet materiałów',
        opis: 'Bezpłatna rozmowa, wybór progu i kanałów, przekazanie plików i dostępów. Licznik dni rusza dopiero od kompletu materiałów.',
      },
      {
        tytul: 'Budowa: od 1 do 10 dni roboczych',
        opis: '1-2 dni robocze bot na stronę WWW, 3-4 dni bot z komunikatorami, 5-10 dni bot z integracjami.',
      },
      {
        tytul: 'Testy i odbiór: dwie rundy poprawek',
        opis: 'Testujesz i zapisujesz uwagi, wdrażamy je, potem druga runda i odbiór. To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze. Nowe funkcje to rozbudowa wyceniana osobno.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje wdrożenie chatbota i co jest w cenie?',
    tresc:
      'Wdrożenie chatbota kosztuje u nas od 1790 zł netto za bota na stronę WWW, 3000-6000 zł netto za bota z komunikatorami i większą bazą wiedzy oraz 8000-15000 zł netto za bota z integracjami. Płacisz raz, a dwie rundy poprawek są w cenie.',
    bloki: [
      {
        typ: 'tabela',
        naglowki: ['Próg', 'Cena netto', 'Czas wdrożenia'],
        wiersze: [
          ['Bot na stronę WWW', '1790 zł', '1-2 dni robocze'],
          ['Bot z komunikatorami', '3000-6000 zł', '3-4 dni robocze'],
          ['Bot z integracjami', '8000-15000 zł', '5-10 dni roboczych'],
        ],
        wKarcie: true,
        podpis:
          'Cena i czas wdrożenia chatbota AI w trzech progach. Kwoty netto, płatne raz, dwie rundy poprawek w cenie.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dochodzi poza samym wdrożeniem?',
        akapity: [
          'Rachunek ma jeszcze dwie pozycje i obie znasz przed startem.',
        ],
        punkty: [
          'Tokeny modelu płacisz dostawcy wprost, według liczby rozmów, bez naszej marży.',
          'Utrzymanie: 99-599 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie.',
          'Po przekazaniu infrastruktury zmiany zamawiasz po 350 zł netto za godzinę, tylko gdy ich potrzebujesz.',
        ],
        wariant: 'quiet',
        chip: 'RACHUNEK',
      },
      {
        typ: 'akapit',
        tekst:
          'Gdy procesów do rozplanowania jest kilka, zaczynamy od Sprintu Diagnostycznego: 1490 zł netto, 5 dni roboczych i raport PDF. Kwotę odliczamy w całości od ceny wdrożenia.',
      },
    ],
    minPrice: 1790,
    linkPoradnik: {
      przed: 'Wszystkie progi, utrzymanie i rachunek na trzy lata rozpisaliśmy w ',
      etykieta: 'cenniku chatbota AI',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  faq: [
    {
      pytanie: 'Ile trwa wdrożenie chatbota?',
      odpowiedz:
        'Od 1 do 10 dni roboczych, licząc od przekazania kompletu materiałów: 1-2 dni bot na stronę WWW, 3-4 dni bot z komunikatorami, 5-10 dni bot z integracjami. Potem testujesz bota i mamy dwie rundy poprawek przed odbiorem.',
    },
    {
      pytanie: 'Co muszę przygotować do wdrożenia chatbota?',
      odpowiedz:
        'Materiały, z których dziś odpowiada Twój zespół: cennik, oferty, procedury, regulaminy, opisy produktów, nagrania. Nie muszą być poukładane, ich uporządkowanie jest częścią wdrożenia. Do tego dostępy do kanałów i systemów oraz osoba, która zatwierdza odpowiedzi bota.',
    },
    {
      pytanie: 'Kiedy wystarczy chatbot z kreatora, a kiedy wdrożenie?',
      odpowiedz:
        'Kreator wystarczy przy kilku prostych pytaniach, jeśli masz czas na samodzielne testy. Wdrożenie ma sens, gdy bot ma odpowiadać z większej bazy wiedzy, działać w kilku kanałach albo sięgać do CRM, kalendarza czy sklepu.',
    },
    {
      pytanie: 'Czy przy wdrożeniu chatbota podpisujemy umowę powierzenia danych?',
      odpowiedz:
        'Tak, przed startem. Przed wgraniem materiałów mówimy też, co ma z nich wypaść: dane osobowe klientów, marże i dokumenty kadrowe. Klient od pierwszej wiadomości wie, że pisze z AI.',
    },
    {
      pytanie: 'Czy mogę zacząć od prostego bota i dołożyć integracje później?',
      odpowiedz:
        'Tak. Możesz zacząć od bota na stronę WWW za 1790 zł netto, a komunikatory i integracje dołożyć później. Rozbudowę wyceniamy osobno, a baza wiedzy z pierwszego wdrożenia zostaje i pracuje dalej.',
    },
    {
      pytanie: 'Co się dzieje z chatbotem po odbiorze?',
      odpowiedz:
        'Wybierasz: infrastruktura zostaje u nas za 99-599 zł netto miesięcznie albo przekazujemy ją Tobie i abonament wynosi 0 zł. To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze.',
    },
  ],

  cta: {
    label: 'Ustalmy, ile potrwa Twoje wdrożenie',
    href: '#diagnoza',
    mikrokopia:
      'Na bezpłatnej rozmowie ustalimy próg, czas i to, co trzeba przygotować po Twojej stronie. Bez zobowiązań.',
    dowod: 'U Desant.pl chatbot obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości.',
  },

  queries: [
    'wdrożenie chatbota',
    'wdrożenie chatbota w firmie',
    'ile trwa wdrożenie chatbota',
    'jak wdrożyć chatbota',
    'wdrożenie chatbota AI',
  ],

  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firm, który odpowiada klientom 24/7',
        href: '/uslugi/chatboty',
        opis: 'Co chatbot przejmuje w obsłudze klienta, w jakich kanałach działa i od czego zacząć.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis: 'Trzy progi, utrzymanie albo 0 zł i rachunek na trzy lata.',
      },
      {
        etykieta: 'Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)',
        href: '/uslugi/chatboty/baza-wiedzy',
        opis: 'Jak bot odpowiada z Twoich plików i co robi, gdy odpowiedzi w nich nie ma.',
      },
      {
        etykieta: 'Audyt AI firmy: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis: 'Sprint Diagnostyczny za 1490 zł netto, odliczany od wdrożenia.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Chatbot edukacyjny do kursów online',
        href: '/realizacje/chatbot-edukacyjny-kursy',
        opis: 'Trzy boty na transkrypcjach kursów Instytutu Kryptografii.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje chatbot AI w 2026? Abonament, wdrożenie i ukryte koszty',
        href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
        opis: 'Abonament czy wdrożenie, ceny rynkowe i koszty, o które warto zapytać przed decyzją.',
      },
    ],
  },
};
