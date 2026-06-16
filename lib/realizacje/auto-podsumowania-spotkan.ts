import type { Realizacja } from './types';

/**
 * CASE 6 — AUTO-PODSUMOWANIA SPOTKAŃ (klient anonimowy).
 * Kategoria: rozwiazania → link wewnętrzny do /uslugi/rozwiazania (aplikacje i wtyczki).
 *
 * Realne dane: klient NIENAZWANY (anonimowo). Agent dołącza do spotkania na
 * Meet, Zoom albo Teams, spisuje je i robi raport plus listę zadań per uczestnik.
 * UWAGA: oszczędność czasu na notatkach oznaczona "(szac.)" — to szacunek, nie
 * twarda zmierzona liczba. Różni się od case'a transkrypcja-rozmow: tam była
 * aplikacja do spisywania rozmów, tu agent sam wchodzi na spotkanie i rozdaje
 * zadania uczestnikom. Głos Pawła, answer-first, zero em-dash.
 */
export const autoPodsumowaniaSpotkan: Realizacja = {
  slug: 'auto-podsumowania-spotkan',
  h1: 'Auto-podsumowania spotkań na Meet, Zoom i Teams',
  kategoria: 'rozwiazania',
  klient: 'Klient (anonimowo)',
  branza: 'Usługi B2B',

  kapsula:
    'Zbudowaliśmy agenta, który sam dołącza do spotkania na Meet, Zoom albo Teams, spisuje rozmowę i po jej zakończeniu wysyła gotowy raport plus listę zadań przypisanych do konkretnych osób. Nikt nie robi notatek w trakcie. Po spotkaniu każdy wie, co ma zrobić. Szacujemy kilka godzin tygodniowo mniej na ręczne notatki (szac.).',

  metaTitle: 'Auto-podsumowania spotkań na Meet, Zoom i Teams',
  metaDescription:
    'Case study: agent AI dołącza do spotkania na Meet, Zoom lub Teams, spisuje je i wysyła raport plus zadania per uczestnik. Mniej godzin na ręczne notatki (szac.).',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Po każdym spotkaniu ktoś musiał usiąść i spisać, co ustalono i kto za co odpowiada. Robiło się to z pamięci albo z urywanych notatek, więc ustalenia bywały niepełne. Część zadań ginęła, bo nikt ich nie zapisał, a po tygodniu trudno było odtworzyć, kto się czego podjął. Sporządzanie notatek zjadało czas, który mógł iść na samą pracę.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Postawiliśmy agenta, który dołącza do spotkania na Meet, Zoom albo Teams jak kolejny uczestnik, słucha i spisuje rozmowę. Po jej zakończeniu sam składa raport: o czym była mowa, co ustalono i jakie zadania z tego wynikają. Zadania przypisuje do konkretnych osób, żeby każdy wiedział, co należy do niego. Gotowe podsumowanie trafia do zespołu od razu, bez czekania, aż ktoś je spisze ręcznie.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: 'Kilka godz./tydz. (szac.)',
        etykieta: 'mniej czasu na ręczne notatki i spisywanie ustaleń',
      },
      {
        wartosc: 'Per uczestnik',
        etykieta: 'zadania przypisane do konkretnych osób po każdym spotkaniu',
      },
    ],
    opis:
      'Nikt już nie robi notatek w trakcie spotkania. Agent spisuje rozmowę i po jej zakończeniu wysyła raport z listą zadań przypisanych do konkretnych osób. Ustalenia przestały ginąć, a zespół odzyskał czas, który wcześniej szedł na spisywanie spotkań ręcznie (szac.).',
  },

  faq: [
    {
      pytanie: 'Na jakich platformach działa agent do podsumowań?',
      odpowiedz:
        'Agent dołącza do spotkań na Google Meet, Zoom i Microsoft Teams. Wchodzi na spotkanie jak kolejny uczestnik, spisuje rozmowę i po jej zakończeniu sam przygotowuje raport oraz listę zadań.',
    },
    {
      pytanie: 'Czy agent sam rozdziela zadania między uczestników?',
      odpowiedz:
        'Tak. Poza spisaniem rozmowy agent wyłapuje ustalenia i wynikające z nich zadania, a potem przypisuje je do konkretnych osób. Dzięki temu po spotkaniu każdy wie, co należy do niego, bez dopytywania.',
    },
  ],

  queries: [
    'automatyczne podsumowania spotkań AI',
    'agent AI do notatek ze spotkań Meet Zoom Teams',
    'transkrypcja spotkań i zadania AI',
    'AI do raportów ze spotkań online',
  ],
};
