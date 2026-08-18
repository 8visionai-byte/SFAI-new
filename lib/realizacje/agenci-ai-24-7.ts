import type { Realizacja } from './types';

/**
 * CASE 5 — FIRMOWI AGENCI AI 24/7 (klient anonimowy).
 * Kategoria: chatboty → link wewnętrzny do /uslugi/chatboty.
 *
 * Realne dane (zero zmyślania): klient NIENAZWANY (anonimowo), efekt = chatboty
 * osadzone na witrynie, znają strukturę firmy i odpowiadają nowym leadom całą dobę
 * bez nadzoru. UWAGA: brak realnej liczby w danych — NIE wymyślamy metryki liczbowej.
 * Metryki ujmują realny, jakościowy efekt (24/7, bez nadzoru). Głos Pawła, zero em-dash.
 */
export const agenciAi247: Realizacja = {
  slug: 'agenci-ai-24-7',
  h1: 'Firmowi Agenci AI 24/7',
  kategoria: 'chatboty',
  klient: 'Klient (anonimowo)',
  branza: 'Firma usługowa',

  kapsula:
    'Osadziliśmy na firmowej stronie Agentów AI, którzy znają strukturę firmy i odpowiadają nowym leadom całą dobę, bez nadzoru. Klient pisze o północy i dostaje odpowiedź od razu, zamiast czekać do rana. Agent zna ofertę i procesy firmy, więc nie zbywa pytań ogólnikami. Żaden lead nie zostaje bez odpowiedzi.',

  metaTitle: 'Firmowi Agenci AI 24/7 na stronie',
  metaDescription:
    'Agenci AI na firmowej stronie: znają strukturę firmy i odpowiadają nowym leadom całą dobę, bez nadzoru. Case study: żaden lead nie zostaje bez odpowiedzi.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Nowi klienci pisali o różnych porach, także wieczorami i w weekendy, kiedy nikt nie odpowiadał. Lead, który nie dostał odpowiedzi od razu, często szedł dalej do konkurencji. Zespół nie był w stanie czuwać przy stronie całą dobę, a najprostsze pytania o ofertę i tak musiał obsługiwać ręcznie. Część zainteresowania przepadała, zanim ktokolwiek zdążył odpisać.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Osadziliśmy na stronie Agentów AI, którzy znają strukturę firmy, ofertę i procesy. Odpowiadają nowym leadom natychmiast, o każdej porze, bez nadzoru. Agent nie zbywa pytań ogólnikami, tylko odpowiada konkretnie na podstawie tego, co wie o firmie, a sprawy wymagające człowieka przekazuje dalej z kompletem informacji. Zespół rano widzi gotowe rozmowy, zamiast zaczynać od zera.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: '24/7',
        etykieta: 'Agent odpowiada nowym leadom o każdej porze',
      },
      {
        wartosc: 'Bez nadzoru',
        etykieta: 'działa sam, zespół nie musi czuwać przy stronie',
      },
    ],
    opis:
      'Nowy lead dostaje odpowiedź od razu, nawet w nocy i w weekend. Agent zna firmę, więc odpowiada konkretnie, a nie ogólnikami. Zespół przestał tracić zainteresowanych przez czas reakcji i rano przejmuje gotowe rozmowy zamiast zaczynać od pustej skrzynki.',
  },

  faq: [
    {
      pytanie: 'Czy Agent odpowiada poza godzinami pracy?',
      odpowiedz:
        'Tak. Agent działa całą dobę, także wieczorami i w weekendy, i odpowiada nowym leadom natychmiast, bez nadzoru. Dzięki temu osoba, która pisze po godzinach, dostaje odpowiedź od razu, a nie dopiero następnego dnia.',
    },
    {
      pytanie: 'Skąd Agent wie, co odpowiedzieć o firmie?',
      odpowiedz:
        'Agent zna strukturę firmy, ofertę i procesy, więc odpowiada konkretnie, a nie ogólnikami. Sprawy, które wymagają człowieka, przekazuje dalej z kompletem informacji, żeby zespół nie musiał dopytywać od początku.',
    },
  ],

  queries: [
    'agent AI na stronie 24/7',
    'chatbot dla firmy całą dobę',
    'AI do obsługi leadów na stronie',
    'firmowy chatbot AI bez nadzoru',
  ],

  /**
   * v22 (PLAN-v22 §3 P2 pkt 11): POWIĄZANIA CASE'A. Przed rundą ten case był
   * ślepym zaułkiem: zero linków do poradnika, który tłumaczy teorię, i zero
   * linków do siostrzanych wdrożeń. Usługę wyznacza `kategoria` i renderuje ją
   * `PowiazanaUsluga`, więc tu jej nie dublujemy. Wszystkie href to realne trasy
   * z rejestrów albo kotwice o potwierdzonym id= na /narzedzia.
   */
  powiazane: {
    poradniki: [
      {
        etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis:
          'Cena agenta i to, po czym poznać, że się zwróci.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Chatbot edukacyjny dla kursów',
        href: '/realizacje/chatbot-edukacyjny-kursy',
        opis:
          'Odpowiada kursantom na pytania o kursy o każdej porze.',
      },
      {
        etykieta: 'Auto-email dla biura obsługi klienta',
        href: '/realizacje/auto-email-bok',
        opis:
          'System pisze draft odpowiedzi, człowiek sprawdza i wysyła.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Policz, ile godzin i pieniędzy zjada u Ciebie ta sama ręczna robota.',
      },
    ],
  },
};
