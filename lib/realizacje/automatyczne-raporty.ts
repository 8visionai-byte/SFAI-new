import type { Realizacja } from './types';

/**
 * CASE 8 — AUTOMATYCZNE RAPORTY Z DANYCH (klient anonimowy).
 * Kategoria: automatyzacje → link wewnętrzny do /uslugi/automatyzacje.
 *
 * Realne dane: klient NIENAZWANY (anonimowo). Automat spina dane z kilku źródeł,
 * sam je zestawia i co rano dostarcza gotowy raport zamiast ręcznego sklejania
 * arkuszy. UWAGA: oszczędność czasu oznaczona "(szac.)" — szacunek, nie zmierzona
 * twarda liczba. Nie duplikuje "centrum dowodzenia" (to produkt): tu chodzi o
 * cykliczny raport, nie o pulpit na żywo. Głos Pawła, answer-first, zero em-dash.
 */
export const automatyczneRaporty: Realizacja = {
  slug: 'automatyczne-raporty',
  h1: 'Automatyczne raporty zamiast ręcznych arkuszy',
  kategoria: 'automatyzacje',
  klient: 'Klient (anonimowo)',
  branza: 'Handel i usługi',

  kapsula:
    'Zbudowaliśmy automat, który sam zbiera dane z kilku źródeł, zestawia je i co rano dostarcza gotowy raport. Zamiast kopiować liczby między arkuszami i sklejać zestawienie ręcznie, zespół dostaje czytelny raport na start dnia. Liczby są w jednym miejscu, aktualne i bez literówek. Szacujemy kilka godzin tygodniowo mniej na raportowanie (szac.).',

  metaTitle: 'Automatyczne raporty zamiast ręcznych arkuszy',
  metaDescription:
    'Case study: automat spina dane z kilku źródeł i co rano dostarcza gotowy raport. Koniec ręcznego sklejania arkuszy. Mniej godzin na raportowanie tygodniowo (szac.).',

  kontekst: {
    h2: 'Z czym przyszedł klient?',
    tresc:
      'Raporty powstawały ręcznie. Ktoś logował się do kilku narzędzi, kopiował liczby do arkusza, dbał się o literówkę i składał zestawienie kawałek po kawałku. Trwało to długo, a dane bywały nieaktualne, zanim raport w ogóle trafił do zespołu. Część decyzji zapadała na wyczucie, bo na świeże liczby trzeba było czekać. To była powtarzalna robota, która nie wnosiła nic poza samym przepisywaniem.',
  },

  rozwiazanie: {
    h2: 'Co zbudowaliśmy?',
    tresc:
      'Postawiliśmy automat, który sam sięga do wszystkich źródeł danych, pobiera liczby i zestawia je w jeden czytelny raport. Robi to cyklicznie, więc co rano gotowe zestawienie czeka na zespół bez niczyjego udziału. Bez ręcznego kopiowania, bez ryzyka literówki, bez logowania się do pięciu narzędzi po kolei. Dane są aktualne i w jednym miejscu, gotowe do podjęcia decyzji.',
  },

  efekt: {
    h2: 'Co to dało?',
    metryki: [
      {
        wartosc: 'Kilka godz./tydz. (szac.)',
        etykieta: 'mniej czasu na ręczne składanie raportów z wielu źródeł',
      },
      {
        wartosc: 'Co rano',
        etykieta: 'gotowy, aktualny raport czeka na zespół bez niczyjego udziału',
      },
    ],
    opis:
      'Zespół przestał kopiować liczby między arkuszami. Automat sam spina dane z różnych źródeł i co rano dostarcza gotowy raport. Liczby są aktualne i w jednym miejscu, więc decyzje zapadają na świeżych danych, a nie na wyczucie (szac.).',
  },

  faq: [
    {
      pytanie: 'Czy automat łączy dane z kilku różnych narzędzi?',
      odpowiedz:
        'Tak. Automat sam sięga do wszystkich wskazanych źródeł, pobiera z nich dane i zestawia je w jeden raport. Zespół nie loguje się do kolejnych narzędzi ani nie kopiuje liczb ręcznie, dostaje gotowe zestawienie w jednym miejscu.',
    },
    {
      pytanie: 'Jak często powstaje raport?',
      odpowiedz:
        'Raport powstaje cyklicznie, w tym wdrożeniu codziennie rano, ale rytm ustawiamy pod potrzeby firmy. Gotowe zestawienie czeka na zespół bez niczyjego udziału, więc dzień zaczyna się od aktualnych liczb.',
    },
  ],

  queries: [
    'automatyzacja raportów AI',
    'automatyczne raporty z danych',
    'automat do zestawień zamiast Excela',
    'spinanie danych z wielu źródeł automat',
  ],
};
