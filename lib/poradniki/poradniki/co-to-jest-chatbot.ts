/**
 * PORADNIK: Co to jest chatbot AI i jak działa w firmie (2026-11-04).
 *
 * PO CO: analiza konkurencji 03.11 (.seo-przeglad/konkurencja-2026-11-03):
 * na „chatbot dla firmy" miejsca 1 i 2 zajmują strony definicyjne (easycall,
 * streamsoft) ze szkieletem „czym jest / jak działa / rodzaje", którego nie
 * mieliśmy (słowo „regułowy" nie padało w gałęzi chatbotów). Bliźniak poradnika
 * /poradniki/co-to-jest-voicebot. Bierze intencję informacyjną; oferta zostaje
 * na /uslugi/chatboty (CHRONIONA), ceny na /uslugi/chatboty/cennik.
 *
 * ŹRÓDŁA FAKTÓW (zero nowych liczb):
 *  - kanały, „odpowiada tylko z Twoich materiałów, czego nie wie, tego nie
 *    zmyśla, rozmówca wie, że pisze z AI", trudna sprawa oddawana z kompletem
 *    informacji, „chatbot odpowiada, agent działa", „przy kilku zapytaniach
 *    w tygodniu bot się nie zwróci", silnik OpenAI / Anthropic / Google, konto
 *    klienta, bez marży, realizacje (IK, Desant.pl, Przystań Jurgen): uslugi/chatboty.ts
 *  - bot na regułach a bot z bazą wiedzy, cztery ruchy RAG, wskazanie źródła,
 *    kiedy baza wiedzy nie jest odpowiedzią: podstrony/baza-wiedzy.ts
 *  - Desant.pl 30-50 klientów i 200-280 wiadomości: podstrony/obsluga-klienta.ts
 *  - sklep (dostępność, wybór modelu, status zamówienia, zwrot; integracje
 *    8000-15000 zł, 5-10 dni): podstrony/sklep-internetowy.ts
 *  - leady (sprawa, termin, kontakt, arkusz albo CRM): podstrony/generowanie-leadow.ts
 *  - asystent dla pracowników (procedury, role): podstrony/asystent-wewnetrzny.ts
 *  - Przystań Jurgen ok. 100 zapytań w sezonie: podstrony/hotele-pensjonaty.ts
 *  - progi 1790 / 3000-6000 / 8000-15000 zł netto, 1-2 / 3-4 / 5-10 dni,
 *    utrzymanie 99-599 zł netto albo 0 zł: podstrony/chatboty-cennik.ts
 *  - zwykły czat AI nie zna Twojej firmy: uslugi/agenci-ai.ts
 *  - Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych: uslugi/audyt-ai.ts
 * Świadomie POMINIĘTE: zdanie o danych w UE (otwarta decyzja Pawła).
 */
import type { Poradnik } from '../types';

export const coToJestChatbot: Poradnik = {
  slug: 'co-to-jest-chatbot',
  tytul: 'Co to jest chatbot AI i jak działa w firmie',

  lead:
    'Chatbot AI to program, który odpowiada klientom na piśmie: na stronie WWW, WhatsAppie, Messengerze, Instagramie albo Telegramie. Rozumie pytanie zadane własnymi słowami i odpowiada z materiałów firmy, czyli oferty, cennika i procedur. Zbiera kontakt, także po godzinach, a sprawę, która go przerasta, oddaje człowiekowi.',

  /* 44 znaki + sufiks marki z layoutu (" · SimpleFast.ai") = 60. */
  metaTitle: 'Co to jest chatbot AI i jak działa w firmie?',
  metaDescription:
    'Co to jest chatbot AI, jak działa krok po kroku, czym różni się chatbot regułowy od chatbota AI i od ChatGPT, do czego firmy go używają i kiedy się nie opłaca.',

  data: '2026-11-04',
  dataAktualizacji: '2026-11-04',
  kategoria: 'Automatyzacja',
  tagi: ['chatbot', 'co to jest chatbot', 'chatbot AI', 'chatbot regułowy'],

  tresc: [
    {
      typ: 'naglowek',
      tekst: 'Co to jest chatbot?',
    },
    {
      typ: 'akapit',
      tekst:
        'Chatbot to program, który prowadzi rozmowę na piśmie zamiast człowieka. Klient wpisuje pytanie w okienku na stronie albo w komunikatorze, a chatbot odpowiada od razu, o każdej porze. Chatbot AI dla firmy robi to na podstawie wiedzy tej konkretnej firmy, a nie wiedzy ogólnej z internetu.',
    },
    {
      typ: 'akapit',
      tekst:
        'Uczciwie ustawiony chatbot ma trzy granice: odpowiada tylko z Twoich materiałów, czego nie wie, tego nie zmyśla, a rozmówca od pierwszej wiadomości wie, że pisze z AI.',
    },

    {
      typ: 'naglowek',
      tekst: 'Rodzaje chatbotów: regułowy, AI z bazą wiedzy i AI z integracjami',
    },
    {
      typ: 'tabela',
      naglowki: ['', 'Chatbot regułowy', 'Chatbot AI z bazą wiedzy', 'Chatbot AI z integracjami'],
      wiersze: [
        ['Skąd bierze odpowiedź', 'Z ręcznie wpisanych formułek', 'Z Twoich dokumentów', 'Z dokumentów i z Twoich systemów'],
        ['Pytanie zadane inaczej', 'Nie trafia w regułę, wraca menu wyboru', 'Trafia w ten sam fragment dokumentu', 'Trafia w ten sam fragment dokumentu'],
        ['Zmiana w ofercie', 'Ktoś przepisuje reguły', 'Podmieniasz dokument', 'Podmieniasz dokument'],
        ['Co jeszcze potrafi', 'Prowadzi po przyciskach', 'Wskazuje źródło odpowiedzi', 'Sprawdza status zamówienia, zapisuje lead w CRM, korzysta z kalendarza'],
      ],
      wKarcie: true,
      podpis: 'Rodzaje chatbotów: regułowy, AI z bazą wiedzy i AI z integracjami',
    },
    {
      typ: 'akapit',
      tekst:
        'Chatbot z integracjami jest już blisko agenta AI. Różnicę najkrócej opisuje zasada: chatbot odpowiada, agent działa, czyli sam umawia wizytę i zapisuje ją w kalendarzu.',
    },

    {
      typ: 'naglowek',
      tekst: 'Jak działa chatbot AI krok po kroku?',
    },
    {
      typ: 'kroki',
      wariant: 'os',
      kroki: [
        {
          tytul: 'Pytanie klienta',
          opis: 'Klient pisze zwykłym zdaniem, bez słów kluczowych i bez nazw plików.',
        },
        {
          tytul: 'Wyszukanie w dokumentach',
          opis: 'Chatbot przeszukuje wgrane materiały firmy i wybiera fragmenty, które dotyczą pytania.',
        },
        {
          tytul: 'Złożenie odpowiedzi',
          opis: 'Dopiero z tych fragmentów powstaje odpowiedź po polsku. Chatbot czyta dokument przy każdym pytaniu, a nie odpowiada z pamięci.',
        },
        {
          tytul: 'Źródło albo przekazanie',
          opis: 'Może wskazać plik, z którego wziął odpowiedź. Gdy odpowiedzi nie ma w dokumentach, mówi wprost, że nie wie, i przekazuje sprawę człowiekowi.',
        },
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Chatbot a ChatGPT: czym się różnią?',
      akapity: [
        'ChatGPT to ogólny czat, który nie zna Twojej firmy i nie ma dostępu do Twoich plików. Za każdym razem trzeba mu tłumaczyć, czym się zajmujesz, a gotową odpowiedź i tak przenosisz sam tam, gdzie ma trafić.',
        'Chatbot dla firmy może działać na tym samym typie modelu, od OpenAI, Anthropic albo Google, ale odpowiada wyłącznie z Twojej bazy wiedzy, stoi na Twojej stronie i w komunikatorach i zbiera kontakty. Konto u dostawcy modelu należy do Ciebie.',
      ],
      wariant: 'quiet',
      chip: 'RÓŻNICA',
    },

    {
      typ: 'naglowek',
      tekst: 'Do czego firmy używają chatbota?',
    },
    {
      typ: 'lista',
      punkty: [
        'Obsługa klienta po godzinach: u Desant.pl chatbot obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości.',
        'Sklep internetowy: odpowiada o dostępność produktu, pomaga wybrać model, sprawdza status zamówienia i prowadzi przez zwrot.',
        'Zbieranie leadów: dopytuje o sprawę, termin i kontakt, a handlowcowi oddaje gotowy rekord w arkuszu albo w CRM.',
        'Hotel i pensjonat: w Przystani Jurgen strona z botem zebrała w sezonie około 100 zapytań.',
        'Kursy i szkolenia: boty Instytutu Kryptografii wskazują miejsce w nagraniu, w którym pada odpowiedź.',
        'Asystent dla pracowników: odpowiada z procedur i instrukcji firmy zamiast doświadczonego kolegi, a każdy widzi tylko swoją część bazy.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Kiedy chatbot się nie opłaca?',
      akapity: [
        'Chatbot opłaca się tam, gdzie te same pytania wracają co tydzień, a wiedza jest spisana w ofercie, cenniku albo procedurach. Są sytuacje, w których lepiej go nie kupować:',
      ],
      punkty: [
        'dostajesz kilka zapytań w tygodniu: bot się nie zwróci,',
        'wiedza istnieje tylko w głowach zespołu: najpierw trzeba ją spisać, dopiero potem wgrać,',
        'dokumenty są sprzeczne i nikt nie wie, która wersja obowiązuje: bot powieli ten bałagan,',
        'odpowiedź za każdym razem zależy od decyzji człowieka: żaden dokument tego nie zastąpi.',
      ],
      wariant: 'quiet',
      chip: 'UCZCIWIE',
    },

    {
      typ: 'naglowek',
      tekst: 'Ile kosztuje chatbot AI dla firmy?',
    },
    {
      typ: 'akapit',
      tekst:
        'U nas są trzy progi. Bot na stronę WWW kosztuje 1790 zł netto i jest gotowy w 1-2 dni robocze. Bot z komunikatorami i większą bazą wiedzy to 3000-6000 zł netto i 3-4 dni robocze. Bot z integracjami, na przykład z CRM albo sklepem, to 8000-15000 zł netto i 5-10 dni roboczych. Utrzymanie kosztuje 99-599 zł netto miesięcznie albo 0 zł, gdy przekazujemy Ci infrastrukturę. Tokeny płacisz dostawcy modelu wprost, bez naszej marży. Pełne zestawienie jest w cenniku chatbota.',
    },

    {
      typ: 'naglowek',
      tekst: 'Jak zacząć z chatbotem?',
    },
    {
      typ: 'akapit',
      tekst:
        'Pierwsza rozmowa jest bezpłatna i służy zbadaniu potrzeb: o co pytają klienci i którym kanałem piszą. Czas wdrożenia liczymy od przekazania kompletu materiałów, a dwie rundy poprawek są w cenie. Gdy procesów do rozplanowania jest kilka, zaczynamy od Sprintu Diagnostycznego: 1490 zł netto, 5 dni roboczych i raport PDF.',
    },
  ],

  faq: [
    {
      pytanie: 'Czy chatbot i ChatGPT to to samo?',
      odpowiedz:
        'Nie. ChatGPT to ogólny czat, który nie zna Twojej firmy. Chatbot dla firmy może działać na modelu od OpenAI, Anthropic albo Google, ale odpowiada wyłącznie z Twojej bazy wiedzy, stoi na Twojej stronie i w komunikatorach, zbiera kontakty i trudną sprawę oddaje człowiekowi.',
    },
    {
      pytanie: 'Jakie są przykłady chatbotów w firmie?',
      odpowiedz:
        'Chatbot do obsługi klienta na stronie, chatbot w sklepie internetowym, który sprawdza status zamówienia, chatbot zbierający leady do CRM, chatbot hotelu odpowiadający gościom i wewnętrzny asystent, który odpowiada pracownikom z procedur firmy.',
    },
    {
      pytanie: 'Jak chatbot AI rozumie pytania klientów?',
      odpowiedz:
        'Najpierw wyszukuje w dokumentach firmy fragmenty, które dotyczą pytania, a dopiero potem układa z nich odpowiedź. Dlatego rozumie pytanie zadane własnymi słowami i nie potrzebuje słów kluczowych, a zmianę w ofercie robi się podmianą dokumentu.',
    },
    {
      pytanie: 'Czy klient wie, że rozmawia z chatbotem?',
      odpowiedz:
        'Powinien i w naszych wdrożeniach wie od pierwszej wiadomości. Chatbot nie udaje człowieka: odpowiada z materiałów firmy, a gdy sprawa go przerasta, oddaje ją człowiekowi z kompletem informacji.',
    },
    {
      pytanie: 'Czym chatbot różni się od voicebota?',
      odpowiedz:
        'Chatbot rozmawia na piśmie: na stronie i w komunikatorach. Voicebot rozmawia głosem przez telefon, odbiera połączenia i umawia wizyty. Oba mogą korzystać z tej samej bazy wiedzy firmy.',
    },
    {
      pytanie: 'Kiedy chatbot to za mało i potrzebny jest agent AI?',
      odpowiedz:
        'Gdy bot ma nie tylko odpowiadać, ale też wykonywać pracę w Twoich systemach: zapisać wizytę w kalendarzu, dopisać klienta do CRM, przygotować odpowiedź na maila. Chatbot jest pierwszym krokiem: najpierw odpowiada, a integracje dokłada się później.',
    },
  ],

  queries: [
    'co to jest chatbot',
    'chatbot co to',
    'jak działa chatbot',
    'chatbot regułowy',
    'rodzaje chatbotów',
    'chatbot a ChatGPT',
  ],

  powiazaneUslugi: [
    {
      etykieta: 'Chatbot AI dla firm, który odpowiada klientom 24/7',
      href: '/uslugi/chatboty',
      opis: 'Chatbot dla firm: co przejmuje w obsłudze klienta, w jakich kanałach działa i od czego zacząć.',
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
      etykieta: 'Wdrożenie chatbota AI krok po kroku: od materiałów do odbioru',
      href: '/uslugi/chatboty/wdrozenie',
      opis: 'Sześć etapów i czas każdego progu: od 1 do 10 dni roboczych.',
    },
  ],

  powiazanePoradniki: [
    {
      etykieta: 'Co to jest voicebot i jak działa w firmie',
      href: '/poradniki/co-to-jest-voicebot',
      opis: 'Bot, który rozmawia głosem przez telefon: jak działa i czym różni się od chatbota.',
    },
    {
      etykieta: 'Ile kosztuje chatbot AI w 2026? Abonament, wdrożenie i ukryte koszty',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
      opis: 'Abonament czy wdrożenie, ceny rynkowe i koszty, o które warto zapytać przed decyzją.',
    },
  ],
};
