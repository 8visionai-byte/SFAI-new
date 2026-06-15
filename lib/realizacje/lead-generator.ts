import type { Realizacja } from './types';

/**
 * CASE 3 — BŁYSKAWICZNY LEAD GENERATOR (klient anonimowy).
 * Kategoria: automatyzacje → link wewnętrzny do /uslugi/automatyzacje.
 *
 * Realne dane (zero zmyślania): klient NIENAZWANY (anonimowo — nie wymyślamy nazwy),
 * efekt = 1000 rekordów potencjalnych klientów pozyskane w 40 minut zamiast 2 tygodni
 * ręcznej pracy. Głos Pawła, answer-first, zero em-dash.
 */
export const leadGenerator: Realizacja = {
  slug: 'lead-generator',
  h1: 'Błyskawiczny generator leadów',
  kategoria: 'automatyzacje',
  klient: 'Klient (anonimowo)',
  branza: 'Sprzedaż B2B',

  kapsula:
    'Zbudowaliśmy automat, który zbiera bazę potencjalnych klientów sam. Pozyskał 1000 rekordów w 40 minut, robotę, która ręcznie zajmowała dwa tygodnie. Dział sprzedaży dostał gotową listę do kontaktu zamiast tygodni klikania po stronach i przepisywania danych. Zamiast szukać leadów, od razu do nich dzwoni.',

  metaTitle: 'Błyskawiczny generator leadów',
  metaDescription:
    'Case study: automat do pozyskiwania leadów. 1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy. Gotowa lista do kontaktu dla sprzedaży.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Budowanie listy potencjalnych klientów było ręczną harówką. Ktoś klikał po stronach, kopiował dane do arkusza, sprawdzał, czy się nie dublują, i tak rekord po rekordzie. Zebranie sensownej bazy zajmowało około dwóch tygodni. Przez ten czas sprzedaż czekała, zamiast dzwonić. To była praca, która niczego nie sprzedawała, tylko przygotowywała grunt, i zjadała tygodnie.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Postawiliśmy automat, który zbiera rekordy potencjalnych klientów sam, według zadanych kryteriów, i od razu układa je w gotową listę. Bez ręcznego kopiowania, bez przeklikiwania strona po stronie. Ustawiasz, kogo szukasz, a system dostarcza bazę do kontaktu. Dane wpadają w jeden czytelny arkusz, z którego sprzedaż korzysta od ręki.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: '1000',
        etykieta: 'rekordów potencjalnych klientów pozyskanych za jednym razem',
      },
      {
        wartosc: '40 min',
        etykieta: 'zamiast 2 tygodni ręcznej pracy',
      },
    ],
    opis:
      'To, co wcześniej zajmowało dwa tygodnie, dzieje się w 40 minut. Sprzedaż dostaje gotową listę do kontaktu zamiast czekać, aż ktoś ją ręcznie sklei. Zespół zaczyna dzwonić od razu, a nie po tygodniach przygotowań.',
  },

  faq: [
    {
      pytanie: 'Ile rekordów udało się pozyskać i w jakim czasie?',
      odpowiedz:
        'W tym wdrożeniu automat zebrał 1000 rekordów potencjalnych klientów w 40 minut. Ręcznie ta sama praca zajmowała około dwóch tygodni. Skala zależy od kryteriów i źródeł, ale różnica między automatem a ręczną robotą jest ogromna.',
    },
    {
      pytanie: 'Czy taki automat zadziała w mojej branży?',
      odpowiedz:
        'Najczęściej tak, o ile da się jasno opisać, kogo szukasz. Na bezpłatnej diagnozie sprawdzamy dostępne źródła danych i kryteria, a potem mówimy wprost, czego w Twoim przypadku można się spodziewać. Bez obietnic na wyrost.',
    },
  ],

  queries: [
    'automatyczne pozyskiwanie leadów',
    'generator leadów AI',
    'automatyzacja lead generation',
    'baza potencjalnych klientów automat',
  ],
};
