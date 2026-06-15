import type { Realizacja } from './types';

/**
 * CASE 2 — CHATBOT EDUKACYJNY DO KURSÓW (Instytut Kryptografii).
 * Kategoria: chatboty → link wewnętrzny do /uslugi/chatboty.
 *
 * Realne dane (zero zmyślania): klient nazwany za zgodą (Instytut Kryptografii),
 * efekt = kursanci natychmiast znajdują właściwą lekcję, bez przeszukiwania setek
 * materiałów VOD. UWAGA: brak realnej liczby procentowej w danych — NIE wymyślamy
 * metryki liczbowej. Metryki ujmują realny, jakościowy efekt ("natychmiast",
 * "setki materiałów VOD"). Głos Pawła, answer-first, zero em-dash.
 */
export const chatbotEdukacyjnyKursy: Realizacja = {
  slug: 'chatbot-edukacyjny-kursy',
  h1: 'Chatbot edukacyjny do kursów online',
  kategoria: 'chatboty',
  klient: 'Instytut Kryptografii',
  branza: 'Edukacja i kursy online',

  kapsula:
    'Dla Instytutu Kryptografii zbudowaliśmy chatbota, który prowadzi kursanta prosto do właściwej lekcji. Zamiast przewijać setki materiałów VOD, kursant pyta normalnym językiem i od razu dostaje wskazanie konkretnego nagrania. Bot zna strukturę kursu, więc odpowiada precyzyjnie. Kursant uczy się, zamiast tracić czas na szukanie.',

  metaTitle: 'Chatbot edukacyjny do kursów online',
  metaDescription:
    'Case study: chatbot edukacyjny dla Instytutu Kryptografii. Kursanci natychmiast znajdują właściwą lekcję w setkach materiałów VOD, bez ręcznego przeszukiwania.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Kurs urósł do setek nagrań VOD. To bogactwo materiału, ale dla kursanta także problem: gdy chciał wrócić do konkretnego tematu, musiał przewijać listę lekcji i zgadywać, w którym nagraniu to było. Część osób się zniechęcała, zanim w ogóle trafiła do właściwej lekcji. Wiedza była na miejscu, tylko trudno było do niej dotrzeć w odpowiednim momencie.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Osadziliśmy w kursie chatbota, który zna jego strukturę i całą bibliotekę nagrań. Kursant pyta zwykłym językiem, na przykład o konkretne zagadnienie, a bot wskazuje mu właściwą lekcję i miejsce, od którego warto zacząć. Nie trzeba znać nazw modułów ani przewijać listy. Pytasz tak, jak myślisz, i dostajesz konkretne nagranie. Bot odpowiada w obrębie kursu, więc nie zmyśla treści spoza materiału.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: 'Natychmiast',
        etykieta: 'kursant trafia do właściwej lekcji zamiast jej szukać',
      },
      {
        wartosc: 'Setki',
        etykieta: 'materiałów VOD przeszukiwanych jednym pytaniem',
      },
    ],
    opis:
      'Kursanci przestali przeszukiwać setki materiałów VOD ręcznie. Pytają chatbota i od razu trafiają do właściwego nagrania. Mniej zniechęcenia na starcie, więcej realnej nauki, bo czas idzie na oglądanie lekcji, a nie na ich szukanie.',
  },

  faq: [
    {
      pytanie: 'Czy chatbot wymyśla odpowiedzi spoza kursu?',
      odpowiedz:
        'Nie. Bot odpowiada w obrębie materiałów kursu i kieruje do konkretnych lekcji. Nie generuje treści spoza biblioteki nagrań, więc kursant dostaje wskazanie oparte na tym, co realnie jest w kursie.',
    },
    {
      pytanie: 'Czy kursant musi znać nazwy modułów albo lekcji?',
      odpowiedz:
        'Nie. Pyta zwykłym językiem, tak jak myśli o problemie. Bot sam dopasowuje pytanie do struktury kursu i wskazuje właściwe nagranie oraz miejsce, od którego warto zacząć.',
    },
  ],

  queries: [
    'chatbot do kursów online',
    'chatbot edukacyjny AI',
    'asystent AI do platformy e-learning',
    'chatbot do nawigacji po materiałach VOD',
  ],
};
