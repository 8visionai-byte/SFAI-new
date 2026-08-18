import type { Realizacja } from './types';

/**
 * CASE 7 — AUTOMAT TREŚCI NA SOCIAL MEDIA (klient anonimowy).
 * Kategoria: automatyzacje → link wewnętrzny do /uslugi/automatyzacje.
 *
 * Realne dane: klient NIENAZWANY (anonimowo). Automat agreguje newsy z branży,
 * przygotowuje grafikę i gotowy post do publikacji jednym kliknięciem.
 * UWAGA: oszczędność czasu oznaczona "(szac.)" — szacunek, nie zmierzona twarda
 * liczba. Człowiek zatwierdza publikację, automat nie publikuje sam bez akceptacji.
 * Głos Pawła, answer-first, zero em-dash.
 */
export const automatTresciSocial: Realizacja = {
  slug: 'automat-tresci-social',
  h1: 'Automat treści na social media',
  kategoria: 'automatyzacje',
  klient: 'Klient (anonimowo)',
  branza: 'Marketing i komunikacja',

  kapsula:
    'Zbudowaliśmy automat, który sam zbiera najświeższe newsy z branży, dobiera do nich grafikę i przygotowuje gotowy post. Człowiek rzuca okiem i publikuje jednym kliknięciem. Zamiast codziennie szukać tematu i składać grafikę od zera, zespół ma propozycję na talerzu. Szacujemy kilka godzin tygodniowo mniej na przygotowanie treści (szac.).',

  metaTitle: 'Automat treści na social media',
  metaDescription:
    'Automat treści do social media: agreguje newsy z branży, dobiera grafikę i przygotowuje gotowy post do publikacji jednym kliknięciem. Case study.',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Regularne publikowanie na social mediach pożerało czas. Najpierw trzeba było wymyślić temat, przejrzeć branżowe newsy, wybrać ten właściwy, potem złożyć grafikę i napisać treść. Każdego dnia od nowa. Przy natłoku innych zadań posty wypadały z grafiku, a profil milczał całymi tygodniami. Problemem nie był brak pomysłów, tylko czas na ich przygotowanie.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Postawiliśmy automat, który sam śledzi branżowe newsy i wybiera te, które warto skomentować. Do wybranego tematu dobiera grafikę i przygotowuje gotowy post: treść plus obraz, spójne ze stylem firmy. Człowiek dostaje propozycję do akceptacji, w razie potrzeby poprawia jedno zdanie i publikuje jednym kliknięciem. Nic nie wychodzi automatycznie bez zatwierdzenia, ostatnie słowo ma zawsze człowiek.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: 'Kilka godz./tydz. (szac.)',
        etykieta: 'mniej czasu na szukanie tematów i składanie grafik',
      },
      {
        wartosc: '1 klik',
        etykieta: 'tyle dzieli zespół od publikacji gotowego posta',
      },
    ],
    opis:
      'Zespół przestał codziennie szukać tematu i składać grafikę od zera. Automat podsuwa gotowy post oparty na świeżych newsach, a człowiek tylko sprawdza i publikuje jednym kliknięciem. Profil przestał milczeć, a czas na przygotowanie treści wyraźnie spadł (szac.).',
  },

  faq: [
    {
      pytanie: 'Czy posty publikują się same, bez kontroli człowieka?',
      odpowiedz:
        'Nie. Automat przygotowuje gotowy post z grafiką, ale publikację zawsze zatwierdza człowiek. Można poprawić treść przed wysłaniem. Dzięki temu profil ma stały rytm, a kontrolę nad tym, co wychodzi, ma zespół, nie automat.',
    },
    {
      pytanie: 'Skąd automat bierze tematy na posty?',
      odpowiedz:
        'Automat na bieżąco śledzi branżowe newsy i wybiera te, które warto skomentować. Do wybranego tematu dobiera grafikę i przygotowuje treść spójną ze stylem firmy, więc zespół dostaje gotową propozycję zamiast pustej kartki.',
    },
  ],

  queries: [
    'automatyzacja treści na social media',
    'automat do postów na social media AI',
    'generowanie postów z newsów AI',
    'AI do tworzenia grafik i postów',
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
        etykieta: 'Ile kosztuje automatyzacja AI w firmie',
        href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
        opis:
          'Widełki cenowe i to, co realnie podnosi koszt takiego wdrożenia.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Generator leadów',
        href: '/realizacje/lead-generator',
        opis:
          'Dane o potencjalnych klientach zbierane i porządkowane bez ręcznej pracy.',
      },
      {
        etykieta: 'Automatyczne raporty',
        href: '/realizacje/automatyczne-raporty',
        opis:
          'Raport składa się sam z danych, które i tak już macie.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Generator promptów',
        href: '/narzedzia#generator-promptow',
        opis:
          'Ułoży polecenie do AI, które daje powtarzalny wynik.',
      },
    ],
  },
};
