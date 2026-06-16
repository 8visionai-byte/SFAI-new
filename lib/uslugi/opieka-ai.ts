import type { Usluga } from './types';

/**
 * USŁUGA — OPIEKA AI (utrzymanie i rozwój automatyzacji).
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb.
 * Pozycjonowanie: serwis IT, ale od AI. Monitoring, poprawki promptów, rozwój,
 * raport miesięczny. Ryczałt 10/20/40h. Podstawa najszerszego modelu "Architekci Wartości AI".
 *
 * CENNIK REALNY (źródło prawdy do tabeli transparentności i ramaCeny):
 *  - Sprint Diagnostyczny: 1490 zł (odliczany od wdrożenia, gdy wejdzie współpraca).
 *  - AI Start (pierwsza automatyzacja na próbę): 1990 zł.
 *  - Stawka bazowa: 350 zł/h.
 *  - Opieka AI / ryczałt: 10h = 3000 zł (300/h), 20h = 5500 zł (275/h),
 *    40h = 10000 zł/mc (250/h).
 *  - Architekci Wartości AI (najszerszy model): od 10000 zł/mc.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - cta.dowod: realna liczba z opieki (np. ile poprawek/mc, uptime automatyzacji
 *    u klienta) ALBO case z liczbą + zgodą. Do tego czasu uczciwe zdanie o diagnozie.
 *  - minPrice: 3000 ustawione (realny najniższy ryczałt 10h). Spójne z UI.
 */
export const opiekaAi: Usluga = {
  slug: 'opieka-ai',
  h1: 'Opieka AI: utrzymanie i rozwój automatyzacji',

  kapsula:
    'Opieka AI to stała opieka nad Twoimi agentami i automatyzacjami: pilnujemy, żeby działały, poprawiamy je, gdy coś się zmienia, i rozwijamy w miarę potrzeb. To serwis IT, tylko od AI. Co miesiąc monitorujemy, dostrajamy prompty, łatamy zmiany w integracjach i wysyłamy raport, co zrobiliśmy. Pracujemy na ryczałcie godzin: 10, 20 albo 40 godzin miesięcznie, od 3000 zł. Twoje dane zostają w Unii Europejskiej.',

  metaTitle: 'Opieka AI: utrzymanie automatyzacji',
  metaDescription:
    'Opieka AI: stałe utrzymanie i rozwój automatyzacji. Monitoring, poprawki promptów, raport miesięczny. Abonament AI dla firmy w ryczałcie 10/20/40h, od 3000 zł.',

  problem: {
    h2: 'Co się dzieje z automatyzacją, gdy nikt jej nie pilnuje?',
    tresc:
      'Automatyzacja nie jest meblem, który raz postawisz i działa wiecznie. Klient zmienia stronę i bot przestaje czytać formularz. Dostawca aktualizuje system i integracja się sypie. Model dostaje nową wersję i odpowiedzi nagle są gorsze. Sam tego nie zauważysz na czas. Zauważy klient, który nie dostał odpowiedzi, albo lead, który przepadł. Bez opieki automatyzacja po cichu przestaje robić to, za co zapłaciłeś.',
  },

  rozwiazanie: {
    h2: 'Co dokładnie robimy w ramach opieki?',
    tresc:
      'Bierzemy Twoje automatyzacje pod stałą opiekę i pilnujemy, żeby działały. Monitorujemy je, więc o awarii wiemy my, a nie Twój klient. Poprawiamy prompty, gdy odpowiedzi schodzą z tonu. Łatamy integracje, gdy dostawca coś zmieni. Rozwijamy automatyzacje o nowe rzeczy, których potrzebujesz. Co miesiąc dostajesz raport: co działało, co poprawiliśmy, co proponujemy dalej. Pracujemy na ryczałcie godzin, więc wiesz z góry, ile płacisz. Niewykorzystany czas nie znika w próżni, idzie na rozwój. To podstawa naszego najszerszego modelu, Architekci Wartości AI: my dbamy o AI, Ty robisz swoje.',
  },

  tabelaPorownawcza: {
    h2: 'Automatyzacja bez opieki a Opieka AI',
    naglowekBez: 'Bez opieki',
    naglowekZNami: 'Opieka AI od SimpleFast.ai',
    wiersze: [
      { cecha: 'Awaria', bez: 'Zauważa ją klient', zNami: 'Zauważamy my, zanim zaszkodzi' },
      { cecha: 'Jakość odpowiedzi', bez: 'Po cichu spada', zNami: 'Dostrajamy prompty na bieżąco' },
      { cecha: 'Zmiana u dostawcy', bez: 'Integracja się sypie', zNami: 'Łatamy ją, zanim zauważysz' },
      { cecha: 'Rozwój', bez: 'Stoi, bo nie ma czasu', zNami: 'Dokładamy nowe rzeczy co miesiąc' },
      { cecha: 'Koszt', bez: 'Nagła faktura przy awarii', zNami: 'Stały ryczałt, wiesz z góry' },
      { cecha: 'Raport', bez: 'Nie wiesz, czy działa', zNami: 'Raport miesięczny, co zrobiliśmy' },
    ],
  },

  kroki: {
    h2: 'Jak zaczynamy opiekę nad Twoją automatyzacją?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Patrzymy, co masz wdrożone i co realnie wymaga pilnowania. Mówimy, ile godzin miesięcznie ma sens i co dokładnie obejmie opieka. Bez zobowiązań.',
      },
      {
        tytul: 'Przejęcie i ustawienie',
        opis:
          'Bierzemy automatyzacje pod opiekę, podpinamy monitoring i ustalamy granice. Wybierasz ryczałt: 10, 20 albo 40 godzin miesięcznie. Wiesz z góry, ile płacisz.',
      },
      {
        tytul: 'Opieka i rozwój co miesiąc',
        opis:
          'Pilnujemy, poprawiamy i rozwijamy. Co miesiąc dostajesz raport, co zrobiliśmy i co proponujemy dalej. Niewykorzystane godziny idą na nowe usprawnienia.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje Opieka AI?',
    tresc:
      'Opieka AI działa na ryczałcie godzin miesięcznie i im większy pakiet, tym niższa stawka za godzinę. 10 godzin to 3000 zł miesięcznie, czyli 300 zł za godzinę. 20 godzin to 5500 zł, czyli 275 zł za godzinę. 40 godzin to 10000 zł miesięcznie, czyli 250 zł za godzinę. Stawka bazowa poza ryczałtem to 350 zł za godzinę, więc ryczałt zawsze wychodzi taniej. Niewykorzystane godziny nie przepadają, idą na rozwój. Ile godzin realnie potrzebujesz, ustalamy na bezpłatnej diagnozie. Bez ukrytych kosztów.',
    minPrice: 3000,
  },

  faq: [
    {
      pytanie: 'Ile kosztuje Opieka AI?',
      odpowiedz:
        'Opieka AI to ryczałt godzin miesięcznie. 10 godzin kosztuje 3000 zł (300 zł za godzinę), 20 godzin 5500 zł (275 zł za godzinę), a 40 godzin 10000 zł (250 zł za godzinę). Stawka bazowa poza ryczałtem to 350 zł za godzinę, więc pakiet zawsze wychodzi taniej. Ile godzin potrzebujesz, ustalamy na bezpłatnej diagnozie.',
    },
    {
      pytanie: 'Co obejmuje utrzymanie automatyzacji?',
      odpowiedz:
        'Monitoring, żeby o awarii wiedzieliśmy my, a nie Twój klient. Poprawki promptów, gdy odpowiedzi schodzą z tonu. Łatanie integracji, gdy dostawca coś zmieni. Rozwój o nowe rzeczy, których potrzebujesz. Oraz raport miesięczny, co zrobiliśmy i co proponujemy dalej. Wszystko w ramach jednego ryczałtu godzin.',
    },
    {
      pytanie: 'Czy mogę kupić opiekę nad automatyzacją zrobioną przez kogoś innego?',
      odpowiedz:
        'Tak, ale najpierw musimy ją obejrzeć. Na bezpłatnej diagnozie sprawdzamy, jak jest zbudowana i czy da się ją sensownie utrzymywać. Czasem trzeba ją najpierw uporządkować, czasem od razu bierzemy pod opiekę. Powiemy uczciwie, co zastaliśmy i ile godzin miesięcznie to wymaga.',
    },
    {
      pytanie: 'Co się dzieje z niewykorzystanymi godzinami?',
      odpowiedz:
        'Nie przepadają w sensie zmarnowanej kasy. Jeśli w danym miesiącu utrzymanie zajęło mniej, zostały czas idzie na rozwój: nowe usprawnienia, dodatkowe automatyzacje, optymalizacje. Płacisz za stałą gotowość i za to, że ktoś realnie dba o Twoje AI, a nie tylko czeka na awarię.',
    },
    {
      pytanie: 'Czym Opieka AI różni się od modelu Architekci Wartości AI?',
      odpowiedz:
        'Opieka AI to utrzymanie i rozwój tego, co już masz wdrożone, w ramach ryczałtu godzin. Architekci Wartości AI to nasz najszerszy model: jesteśmy wtedy Twoim działem od AI, który nie tylko utrzymuje, ale i sam proponuje, co automatyzować dalej, i to wdraża. Ten model startuje od 10000 zł miesięcznie. Opieka AI jest jego podstawą i naturalnym pierwszym krokiem.',
    },
    {
      pytanie: 'Czy muszę podpisywać długą umowę?',
      odpowiedz:
        'Nie zmuszamy Cię do długich zobowiązań na siłę. Opieka AI to abonament miesięczny w ryczałcie godzin. Ustalamy zakres na bezpłatnej diagnozie i zaczynamy od pakietu, który ma sens dla tego, co masz wdrożone. Pakiet możesz zmienić, gdy zmienią się potrzeby.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy, co realnie wymaga pilnowania i ile godzin miesięcznie ma sens. Bez zobowiązań.',
    dowod:
      'Każdą opiekę zaczynamy od bezpłatnej diagnozy. Najpierw oglądamy, co masz, potem ustalamy zakres.',
  },

  queries: [
    'opieka AI',
    'utrzymanie automatyzacji',
    'abonament AI dla firmy',
    'serwis AI dla firmy',
    'utrzymanie agentów AI',
  ],
};
