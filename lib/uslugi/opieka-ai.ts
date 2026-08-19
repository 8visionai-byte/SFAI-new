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
  dataAktualizacji: '2026-08-19',
  h1: 'Opieka AI: utrzymanie i rozwój automatyzacji',

  kapsula:
    'Opieka AI to stała opieka nad Twoimi agentami i automatyzacjami: pilnujemy, żeby działały, poprawiamy je, gdy coś się zmienia, i rozwijamy w miarę potrzeb. To serwis IT, tylko od AI. Co miesiąc monitorujemy, dostrajamy prompty, łatamy zmiany w integracjach i wysyłamy raport, co zrobiliśmy. Pracujemy na ryczałcie godzin: 10, 20 albo 40 godzin miesięcznie, od 3000 zł. Twoje dane zostają w Unii Europejskiej.',

  metaTitle: 'Opieka AI: utrzymanie automatyzacji',
  metaDescription:
    'Opieka AI: stałe utrzymanie i rozwój automatyzacji. Monitoring, poprawki promptów, raport miesięczny. Abonament w ryczałcie 10/20/40h, od 3000 zł.',

  problem: {
    h2: 'Co się dzieje z automatyzacją, gdy nikt jej nie pilnuje?',
    tresc:
      'Bez opieki automatyzacja po cichu przestaje robić to, za co zapłaciłeś. Nie psuje się z hukiem, tylko stopniowo, i pierwszy zauważa to Twój klient, nie Ty.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Automatyzacja psuje się bez niczyjej winy',
      },
      {
        typ: 'lista',
        punkty: [
          'Klient zmienia stronę i bot przestaje czytać formularz.',
          'Dostawca aktualizuje system i integracja się sypie.',
          'Model dostaje nową wersję i odpowiedzi nagle są gorsze.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Sam tego nie zauważysz na czas. Zauważy klient, który nie dostał odpowiedzi, albo lead, który przepadł. Dlatego utrzymanie automatyzacji to praca, która nie kończy się w dniu wdrożenia.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Ile kosztuje awaria, której nikt nie pilnuje?',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: [
          'Tego nie wiesz z góry i w tym jest problem. Bez opieki naprawa to nagła faktura, która przychodzi w najgorszym momencie: wtedy, gdy coś już nie działa. Z opieką płacisz stały ryczałt, który znasz z góry, a awarię łapiemy, zanim zaszkodzi.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie robimy w ramach opieki?',
    tresc:
      'Bierzemy na siebie utrzymanie agentów AI i automatyzacji w Twojej firmie w ramach jednego ryczałtu godzin: monitorujemy, poprawiamy i rozwijamy. To serwis AI dla firmy, czyli serwis IT, tylko od AI.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co obejmuje utrzymanie automatyzacji?',
      },
      {
        typ: 'lista',
        punkty: [
          'Monitoring: o awarii wiemy my, a nie Twój klient.',
          'Poprawki promptów, gdy odpowiedzi schodzą z tonu.',
          'Łatanie integracji, gdy dostawca coś zmieni.',
          'Rozwój o nowe rzeczy, których potrzebujesz.',
          'Audyt kolejnych miejsc, które da się zautomatyzować.',
          'Optymalizacja tego, co już działa.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Za co dokładnie płacę co miesiąc?',
        wariant: 'top',
        chip: 'Opieka AI',
        akapity: [
          'Za ryczałt godzin, dzięki któremu wiesz z góry, ile płacisz. Wybierasz pakiet 10, 20 albo 40 godzin miesięcznie i to jest Twoja stała opłata.',
          'Cały ryczałt pracuje co miesiąc nad Twoim AI. Część godzin idzie na utrzymanie i pilnowanie, część na rozwój, nowe automatyzacje i optymalizacje tego, co już działa.',
          'Pod koniec miesiąca dostajesz raport: co działało, co poprawiliśmy, co rozwinęliśmy i co proponujemy dalej.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Opieka AI to też podstawa naszego najszerszego modelu Architekci Wartości AI. Zasada jest prosta: my dbamy o Twoje AI, Ty robisz swoje.',
      },
    ],
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
          'Pilnujemy, poprawiamy i rozwijamy, a cały ryczałt godzin co miesiąc pracuje nad Twoim AI: utrzymanie, nowe automatyzacje, audyty i optymalizacje. Pod koniec miesiąca dostajesz raport ze zmianami: co zrobiliśmy, co rozwinęliśmy i co proponujemy dalej.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje Opieka AI?',
    tresc:
      'Opieka AI kosztuje od 3000 zł netto miesięcznie za ryczałt 10 godzin, a im większy pakiet, tym niższa stawka za godzinę. Wszystkie kwoty są netto i rozliczamy je miesięcznie.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'tabela',
        naglowki: [
          'Pakiet',
          'Cena miesięczna',
          'Stawka za godzinę',
        ],
        wiersze: [
          [
            '10 godzin',
            '3000 zł netto',
            '300 zł netto',
          ],
          [
            '20 godzin',
            '5500 zł netto',
            '275 zł netto',
          ],
          [
            '40 godzin',
            '10000 zł netto',
            '250 zł netto',
          ],
          [
            'poza ryczałtem',
            'rozliczenie godzinowe',
            '350 zł netto',
          ],
        ],
        wKarcie: true,
        podpis: 'Ryczałt godzin Opieki AI, kwoty netto, rozliczenie miesięczne',
      },
      {
        typ: 'akapit',
        tekst: 'Stawka bazowa poza ryczałtem to 350 zł netto za godzinę, więc każdy pakiet wychodzi taniej. Cały ryczałt pracuje co miesiąc: utrzymanie, rozwój, nowe automatyzacje i optymalizacje, a pod koniec miesiąca dostajesz raport ze zmianami.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy muszę płacić abonament co miesiąc?',
        wariant: 'edge',
        chip: 'CENNIK',
        akapity: [
          'To zależy od usługi. Abonament AI dla firmy ma u nas dwie formy. Opieka AI to osobna usługa: ryczałt 10, 20 albo 40 godzin rozliczany miesięcznie. Przy opiece po wdrożeniu chatbota czy voicebota masz wybór, o którym mówimy wprost, zanim cokolwiek zamówisz: abonament u nas albo 0 zł miesięcznie po przekazaniu infrastruktury.',
          'Ile kosztuje utrzymanie chatbota? To zależy od tego, gdzie stoi infrastruktura. Gdy zostaje u nas, płacisz abonament. Gdy przekażemy ją Tobie, nie płacisz nic miesięcznie.',
        ],
        punkty: [
          'Opieka chatbota po wdrożeniu: 99-599 zł netto miesięcznie albo 0 zł przy przekazaniu infrastruktury.',
          'Utrzymanie voicebota: 299-1500 zł netto miesięcznie u nas albo 0 zł miesięcznie po przekazaniu infrastruktury, poprawki wtedy 350 zł netto za godzinę.',
          'Trzecia pozycja zawsze osobno: zużycie tokenów i minut rozmów wg realnego użycia, po stronie klienta.',
        ],
        stopka: [
          'U nas z abonamentu da się wyjść, u konkurencji zwykle nie.',
          'Ukryte koszty chatbota to zwykle zużycie: w cudzym abonamencie też je płacisz, tylko go nie widać w cenniku.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Ile godzin opieki realnie potrzebujesz, ustalamy na bezpłatnej diagnozie: 0 zł, około 30 minut. Bez ukrytych kosztów i bez zobowiązań.',
      },
    ],
    minPrice: 3000,
    /* v22 (linki §3, P2 #15): poradnik o koszcie automatyzacji jako jedyny
       rozpisuje opiekę w abonamencie 99-599 zł obok kosztu wdrożenia, więc to
       naturalne przedłużenie tej sekcji. Render: RamaCeny.tsx, ten sam akapit. */
    linkPoradnik: {
      przed: 'Jak opieka wpisuje się w całkowity koszt wdrożenia, pokazujemy w poradniku: ',
      etykieta: 'ile kosztuje automatyzacja AI w firmie',
      po: '.',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
    },
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
        'Utrzymanie automatyzacji to ciągła praca nad Twoim AI w ramach jednego ryczałtu godzin. Monitorujemy Twoje automatyzacje, więc o awarii wiemy my, a nie Twój klient. Poprawiamy prompty, gdy odpowiedzi schodzą z tonu, i łatamy integracje, gdy dostawca coś zmieni. Na bieżąco rozwijamy automatyzacje o nowe rzeczy, których potrzebujesz, sprawdzamy, czy nic się nie sypie, i optymalizujemy to, co już działa. Pod koniec miesiąca dostajesz raport: co zrobiliśmy, co rozwinęliśmy i co proponujemy dalej.',
    },
    {
      pytanie: 'Czy mogę kupić opiekę nad automatyzacją zrobioną przez kogoś innego?',
      odpowiedz:
        'Tak, ale najpierw musimy ją obejrzeć. Na bezpłatnej diagnozie sprawdzamy, jak jest zbudowana i czy da się ją sensownie utrzymywać. Czasem trzeba ją najpierw uporządkować, czasem od razu bierzemy pod opiekę. Powiemy uczciwie, co zastaliśmy i ile godzin miesięcznie to wymaga.',
    },
    {
      pytanie: 'Za co dokładnie płacę co miesiąc?',
      odpowiedz:
        'Płacisz za gotowość i za realną, ciągłą pracę nad Twoim AI. Każdy miesiąc planujemy z góry: część godzin idzie na utrzymanie i pilnowanie, część na rozwój nowych automatyzacji, część na audyt i optymalizacje w kolejnych miejscach. Cały ryczałt pracuje przez cały czas, więc Twoje AI stale idzie do przodu, a nie tylko czeka na awarię. Sama gotowość, że ktoś pilnuje i jest gotów reagować w każdej chwili, też ma wartość. Pod koniec miesiąca dostajesz raport ze zmianami, który czarno na białym pokazuje, na co poszły godziny.',
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

  /* v22 (linki §3, P2 #15): strona miała 1 link wychodzący (kontakt). Audyt to
     wejście do opieki (mapa procesów przed ryczałtem), a kalkulator pokazuje
     skalę roboty, którą opieka utrzymuje. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Audyt AI: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis:
          'Sprint Diagnostyczny za 1490 zł kończy się Action Planem, a kwotę odliczamy od wdrożenia.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Zobacz, ile złotych rocznie pilnuje za Ciebie automatyzacja, którą utrzymujemy w ryczałcie.',
      },
    ],
  },
};
