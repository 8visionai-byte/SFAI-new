import type { Usluga } from './types';

/**
 * USŁUGA 2 — CHATBOTY (chatbot AI dla firmy).
 * Treść fazy 3, 1:1 z 06-copy-hero-uslugi.md §"USŁUGA 2 — CHATBOTY".
 * Pozycjonowanie kategorii: chatbot odpowiada, AI Agent działa.
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - ramaCeny.minPrice: realne "od X zł" za prosty chatbot (number, PLN).
 *    Dopiero wtedy włącza się kwota w UI i `offers` w Service JSON-LD. Dziś undefined.
 *  - osobne "od X zł" za chatbota z integracjami (kalendarz/CRM) — do treści ceny.
 *  - cta.dowod: realna liczba z wdrożenia (np. zapytań/mc obsłużonych przez chatbota
 *    klienta) ALBO case z liczbą + zgodą. Do tego czasu uczciwe zdanie o diagnozie.
 */
export const chatboty: Usluga = {
  slug: 'chatboty',
  h1: 'Chatbot AI dla firmy',

  kapsula:
    'Chatbot AI dla firmy to asystent, który odpowiada klientom na stronie i w komunikatorach przez całą dobę: tłumaczy ofertę, podaje ceny i godziny, zbiera leady, nawet o 22:00. U nas chatbot to pierwszy krok do Agenta, który nie tylko odpowiada, ale i działa: umawia, zapisuje, przekazuje sprawę dalej. Wdrażamy go w dni, uczymy na Twojej wiedzy, a dane zostają w Unii Europejskiej.',

  metaTitle: 'Chatbot AI dla firmy: wdrożenie 24/7',
  metaDescription:
    'Wdrożenie chatbota AI dla firmy: odpowiada klientom 24/7, zbiera leady i uczy się na Twojej wiedzy. W dni, nie miesiące. Pierwszy krok do Agenta, który działa.',

  problem: {
    h2: 'Ile razy dziennie odpowiadasz na to samo pytanie?',
    tresc:
      'Ci sami ludzie pytają o to samo. O godziny, o cennik, o dojazd, o dostępność. Codziennie, od nowa. Klient pisze wieczorem, a Ty odpowiadasz rano, bo spałeś. Konkurencja czasem odpowiada szybciej i to ona dostaje zlecenie. Każde pytanie bez odpowiedzi w porę to potencjalny klient, który poszedł dalej.',
  },

  rozwiazanie: {
    h2: 'Co robi nasz chatbot, czego nie robi zwykły bot?',
    tresc:
      'Uczymy chatbota na Twojej wiedzy: ofercie, cenniku, najczęstszych pytaniach. Odpowiada po polsku, konkretnie, w Twoim tonie, i zbiera kontakt do klienta, zamiast go gubić. Nie wymyśla. Gdy nie zna odpowiedzi, mówi to wprost i przekazuje sprawę do Ciebie. A kiedy będziesz gotowy, ten sam bot urośnie do Agenta, który umawia wizyty i zapisuje je w kalendarzu, a nie tylko gada.',
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
    tresc:
      'Koszt zależy od zakresu. Inaczej wycenia się prosty chatbot odpowiadający na pytania z Twojej wiedzy, inaczej Agent, który dodatkowo umawia i zapisuje wizyty oraz łączy się z kalendarzem czy CRM. Cenę liczymy od wartości: ile pytań miesięcznie zdejmuje z Ciebie bot i ile leadów łapie po godzinach. Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
    // minPrice: undefined — brak realnej kwoty od Pawła. Bez offers w Service JSON-LD.
  },

  faq: [
    {
      pytanie: 'Ile kosztuje chatbot dla firmy?',
      odpowiedz:
        'Koszt zależy od tego, co bot ma robić. Prosty chatbot odpowiadający na pytania to inna półka niż Agent umawiający wizyty z integracją kalendarza i CRM. Cenę liczymy od wartości, jaką daje, i podajemy ją na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów i bez abonamentu na siłę.',
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
      pytanie: 'Ile trwa wdrożenie chatbota?',
      odpowiedz:
        'Prosty chatbot na stronie potrafi działać w kilka dni. Bot z integracjami i umawianiem wizyt zajmuje trochę dłużej, bo dochodzi łączenie z kalendarzem czy CRM. Dokładny termin podajemy na bezpłatnej diagnozie.',
    },
    {
      pytanie: 'Czy chatbot zastąpi moją obsługę klienta?',
      odpowiedz:
        'Nie zastąpi, odciąży. Bierze na siebie powtarzalne pytania i nocne wiadomości, a Twoi ludzie zajmują się trudniejszymi sprawami i relacją z klientem. Zespół ma mniej powtarzalnej roboty, nie mniej pracy do zwolnień.',
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
    'chatbot AI dla firmy',
    'chatbot na stronę www',
  ],
};
