import type { Realizacja } from './types';

/**
 * CASE 1 — AUTO-EMAIL DLA BIURA OBSŁUGI KLIENTA (Instytut Kryptografii).
 * Kategoria: automatyzacje → link wewnętrzny do /uslugi/automatyzacje.
 *
 * Realne dane (zero zmyślania): klient nazwany za zgodą (Instytut Kryptografii),
 * efekt = 75% maili wymaga już tylko drobnej korekty przed wysłaniem; system
 * analizuje historię i serwuje gotowe drafty wsparcia do jednego kliknięcia.
 * Głos Pawła, answer-first, zero em-dash.
 */
export const autoEmailBok: Realizacja = {
  slug: 'auto-email-bok',
  h1: 'Auto-email dla biura obsługi klienta',
  kategoria: 'automatyzacje',
  klient: 'Instytut Kryptografii',
  branza: 'Edukacja i szkolenia',

  kapsula:
    'Zbudowaliśmy dla Instytutu Kryptografii system, który sam pisze odpowiedzi biura obsługi klienta. Analizuje historię korespondencji i serwuje gotowy draft wsparcia do jednego kliknięcia. Efekt: 75% maili wymaga już tylko drobnej korekty przed wysłaniem. Zespół nie pisze od zera, tylko sprawdza i wysyła. Ostatnie słowo zawsze ma człowiek.',

  metaTitle: 'Auto-email dla biura obsługi klienta',
  metaDescription:
    'Case study: system AI dla biura obsługi klienta Instytutu Kryptografii. 75% maili wymaga już tylko drobnej korekty przed wysłaniem, drafty gotowe do jednego kliknięcia.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Biuro obsługi klienta odpisywało na te same pytania w kółko, każdą odpowiedź pisząc od nowa. Część maili była powtarzalna, ale i tak ktoś musiał usiąść, przypomnieć sobie ustalenia z wcześniejszej korespondencji i sklecić odpowiedź. To zjadało godziny, a klient czekał dłużej, niż powinien. Nie chodziło o to, żeby zwolnić ludzi. Chodziło o to, żeby przestali zaczynać każdy mail od pustej kartki.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Postawiliśmy system, który czyta przychodzącego maila, sięga do historii korespondencji z tym klientem i przygotowuje gotowy draft odpowiedzi. Człowiek dostaje go do jednego kliknięcia: czyta, w razie potrzeby poprawia jedno zdanie i wysyła. Nic nie wychodzi automatycznie bez akceptacji. System podpowiada, ale decyzję i wysyłkę zawsze zatwierdza pracownik. Drafty są na tyle dobre, że najczęściej nie ma czego poprawiać.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: '75%',
        etykieta: 'maili wymaga już tylko drobnej korekty przed wysłaniem',
      },
      {
        wartosc: '1 klik',
        etykieta: 'tyle dzieli pracownika od gotowego draftu odpowiedzi',
      },
    ],
    opis:
      'Trzy na cztery maile są gotowe niemal od razu. Zespół nie pisze odpowiedzi od zera, tylko sprawdza propozycję i wysyła. Klient dostaje odpowiedź szybciej, a pracownicy odzyskali czas, który wcześniej szedł na przepisywanie tego samego w kółko.',
  },

  faq: [
    {
      pytanie: 'Czy maile wychodzą do klientów automatycznie, bez kontroli człowieka?',
      odpowiedz:
        'Nie. System przygotowuje gotowy draft, ale wysyłkę zawsze zatwierdza pracownik. Człowiek czyta propozycję, w razie potrzeby poprawia i dopiero wtedy wysyła. Ostatnie słowo ma zawsze biuro obsługi, nie automat.',
    },
    {
      pytanie: 'Skąd system wie, co odpisać?',
      odpowiedz:
        'Analizuje treść przychodzącego maila i historię wcześniejszej korespondencji z tym klientem. Na tej podstawie składa odpowiedź spójną z tym, co już zostało ustalone, więc pracownik nie musi przypominać sobie całego wątku.',
    },
  ],

  queries: [
    'automatyzacja biura obsługi klienta AI',
    'AI do odpowiadania na maile',
    'generowanie odpowiedzi mailowych AI',
    'automatyzacja obsługi klienta case study',
  ],
};
