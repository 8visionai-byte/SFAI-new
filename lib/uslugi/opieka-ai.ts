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
  dataAktualizacji: '2026-08-21',
  h1: 'Opieka AI: utrzymanie i rozwój automatyzacji',

  kapsula:
    'Opieka AI to stała opieka nad Twoimi agentami i automatyzacjami: pilnujemy, żeby działały, poprawiamy je, gdy coś się zmienia, i rozwijamy w miarę potrzeb. To serwis IT, tylko od AI. Co miesiąc monitorujemy, dostrajamy prompty, łatamy zmiany w integracjach i wysyłamy raport, co zrobiliśmy. Pracujemy na ryczałcie godzin: 10, 20 albo 40 godzin miesięcznie, od 3000 zł. Twoje dane zostają w Unii Europejskiej.',

  metaTitle: 'Opieka AI: utrzymanie automatyzacji',
  metaDescription:
    'Opieka AI: stałe utrzymanie i rozwój automatyzacji. Monitoring, poprawki promptów, raport miesięczny. Abonament w ryczałcie 10/20/40h, od 3000 zł.',

  problem: {
    h2: 'Co się dzieje z automatyzacją, gdy nikt jej nie pilnuje?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Bez opieki automatyzacja po cichu przestaje robić to, za co zapłaciłeś. Nie psuje się z hukiem, tylko stopniowo, i pierwszy zauważa to Twój klient, nie Ty.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Automatyzacja psuje się bez niczyjej winy',
        ikona: 'lupa-wykres',
        chip: 'BEZ OPIEKI',
        overline: 'TRZY TYPOWE AWARIE · PIERWSZY ZAUWAŻA KLIENT, NIE TY',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '350 zł netto',
            opis: 'godzina naprawy poza ryczałtem',
            zrodlo: 'wiersz poza ryczałtem w tabeli cen niżej',
            ton: 'amber',
          },
          {
            wartosc: '0 zł',
            opis: 'diagnoza, zanim cokolwiek zamówisz',
            zrodlo: 'bezpłatna diagnoza z sekcji o cenie',
            ton: 'green',
          },
          {
            wartosc: 'około 30 minut',
            opis: 'tyle trwa ustalenie zakresu opieki',
            zrodlo: 'bezpłatna diagnoza z sekcji o cenie',
            ton: 'cyan',
          },
        ],
      },
      {
        typ: 'przelacznik',
        grupa: 'opieka-ai-awarie',
        opcje: [
          {
            numer: 'AWARIA 1',
            tytul: 'Zmiana na stronie',
            podtytul: 'Bot przestaje czytać formularz',
            naglowek: 'Klient zmienia stronę i bot przestaje czytać formularz.',
            akapity: [
              'Sam tego nie zauważysz na czas. Zauważy klient, który nie dostał odpowiedzi, albo lead, który przepadł.',
            ],
            punkty: [
              'Bot dalej odpowiada na stronie, ale danych z formularza już nie widzi.',
              'Poznasz to po zgłoszeniach, które przestały do Ciebie docierać.',
            ],
          },
          {
            numer: 'AWARIA 2',
            tytul: 'Zmiana u dostawcy',
            podtytul: 'Integracja się sypie',
            naglowek: 'Dostawca aktualizuje system i integracja się sypie.',
            akapity: [
              'Nic nie zgłasza błędu na Twoim ekranie. Dane po prostu przestają dochodzić tam, gdzie miały dochodzić.',
            ],
            punkty: [
              'Połączenie zrywa się w miejscu, którego nie masz na żadnym ekranie.',
              'Poznasz to po rekordach, których brakuje w docelowym systemie.',
            ],
          },
          {
            numer: 'AWARIA 3',
            tytul: 'Nowa wersja modelu',
            podtytul: 'Odpowiedzi schodzą z tonu',
            naglowek: 'Model dostaje nową wersję i odpowiedzi nagle są gorsze.',
            akapity: [
              'To najcichsza z awarii, bo wszystko formalnie działa. Zmienia się tylko jakość, a tego nie widać w żadnym alercie.',
            ],
            punkty: [
              'Bot odpowiada dalej, tylko mija się z tym, o co pytał człowiek.',
              'Poznasz to dopiero po rozmowach, które nie kończą się kontaktem.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Dlatego utrzymanie automatyzacji to praca, która nie kończy się w dniu wdrożenia. Ktoś musi patrzeć na to, co działa, także wtedy, gdy nikt się nie skarży.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Ile kosztuje awaria, której nikt nie pilnuje?',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: [
          'Tego nie wiesz z góry i w tym jest problem. Bez opieki naprawa to nagła faktura, która przychodzi w najgorszym momencie: wtedy, gdy coś już nie działa.',
          'Z opieką płacisz stały ryczałt, który znasz z góry, a awarię łapiemy, zanim zaszkodzi.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie robimy w ramach opieki?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Bierzemy na siebie utrzymanie agentów AI i automatyzacji w Twojej firmie w ramach jednego ryczałtu godzin: monitorujemy, poprawiamy i rozwijamy. Działa to jak outsourcing działu AI: tak jak księgowość oddajesz biuru rachunkowemu, tak utrzymanie i rozwój AI oddajesz nam. To serwis AI dla firmy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co obejmuje utrzymanie automatyzacji?',
        ikona: 'tarcza-serce',
        chip: 'OPIEKA AI',
        overline: 'OUTSOURCING DZIAŁU AI · JAK KSIĘGOWOŚĆ W BIURZE RACHUNKOWYM',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Pilnujemy',
            akapity: [
              'Monitoring działa po naszej stronie, więc awaria nie czeka na zgłoszenie od klienta.',
            ],
            punkty: [
              'Monitoring: o awarii wiemy my, a nie Twój klient.',
              'Łatanie integracji, gdy dostawca coś zmieni.',
            ],
          },
          {
            naglowek: 'Poprawiamy',
            akapity: [
              'Jakość odpowiedzi trzeba dostrajać, bo modele i Twoja oferta się zmieniają.',
            ],
            punkty: [
              'Poprawki promptów, gdy odpowiedzi schodzą z tonu.',
              'Optymalizacja tego, co już działa.',
            ],
          },
          {
            naglowek: 'Rozwijamy',
            akapity: [
              'Automatyzacja, której nikt nie rozwija, po roku obsługuje firmę sprzed roku, a nie tę, którą prowadzisz dzisiaj.',
            ],
            punkty: [
              'Rozwój o nowe rzeczy, których potrzebujesz.',
              'Audyt kolejnych miejsc, które da się zautomatyzować.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Za co dokładnie płacę co miesiąc?',
        ikona: 'kalendarz-check',
        chip: 'Opieka AI',
        overline: '10, 20 ALBO 40 GODZIN · CAŁY RYCZAŁT PRACUJE CO MIESIĄC',
      },
      {
        typ: 'przelacznik',
        grupa: 'opieka-ai-godziny',
        opcje: [
          {
            numer: 'GODZINY 1',
            tytul: 'Wybór ryczałtu',
            podtytul: 'Stała opłata',
            naglowek: 'Wybierasz ryczałt 10, 20 albo 40 godzin miesięcznie i to jest Twoja stała opłata.',
            akapity: [
              'Kwota jest ta sama co miesiąc, niezależnie od tego, czy miesiąc był spokojny, czy coś się posypało. Nie dostajesz osobnej faktury za każdą naprawę.',
            ],
            punkty: [
              'Wiesz z góry, ile zapłacisz w danym miesiącu.',
              'Pakiet zmieniasz, gdy zmienią się potrzeby.',
            ],
          },
          {
            numer: 'GODZINY 2',
            tytul: 'Plan miesiąca',
            podtytul: 'Podział godzin',
            naglowek: 'Każdy miesiąc planujemy z góry, więc wiesz, na co pójdą godziny z ryczałtu.',
            akapity: [
              'Cały ryczałt pracuje co miesiąc nad Twoim AI, więc godziny nie czekają bezczynnie na awarię. Sama gotowość, że ktoś pilnuje i jest gotów reagować, też ma wartość.',
            ],
            punkty: [
              'Część godzin planujemy na utrzymanie i pilnowanie.',
              'Część na rozwój, audyt i optymalizacje.',
            ],
          },
          {
            numer: 'GODZINY 3',
            tytul: 'Raport',
            podtytul: 'Koniec miesiąca',
            naglowek: 'Pod koniec miesiąca dostajesz raport ze zmianami.',
            akapity: [
              'Raport pokazuje czarno na białym, na co poszły godziny z ryczałtu, i co proponujemy zrobić w kolejnym miesiącu.',
            ],
            punkty: [
              'Co działało i co poprawiliśmy.',
              'Co rozwinęliśmy i co proponujemy dalej.',
            ],
          },
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
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Opieka AI kosztuje od 3000 zł netto miesięcznie za ryczałt 10 godzin, a im większy pakiet, tym niższa stawka za godzinę. Wszystkie kwoty są netto i rozliczamy je miesięcznie.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'od 3000 zł netto',
            opis: 'wejście w opiekę: ryczałt 10 godzin miesięcznie',
            zrodlo: 'pakiet 1 z tabeli niżej',
            ton: 'cyan',
          },
          {
            wartosc: '350 zł netto',
            opis: 'godzina pracy poza ryczałtem, rozliczana osobno',
            zrodlo: 'wiersz poza ryczałtem w tabeli niżej',
            ton: 'amber',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'opieka po wdrożeniu chatbota, gdy projekt zostaje u nas',
            zrodlo: 'punkty w sekcji o abonamencie niżej',
            ton: 'violet',
          },
          {
            wartosc: '0 zł',
            opis: 'abonament po przekazaniu Ci infrastruktury',
            zrodlo: 'punkty w sekcji o abonamencie niżej',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Który ryczałt godzin pasuje do Twojej firmy?',
        ikona: 'wykres-strzalka',
        chip: 'CENNIK',
        overline: 'TRZY PAKIETY GODZIN · IM WIĘKSZY PAKIET, TYM NIŻSZA STAWKA',
      },
      {
        typ: 'przelacznik',
        grupa: 'opieka-ai-pakiety',
        opcje: [
          {
            numer: 'PAKIET 1',
            tytul: '10 godzin',
            podtytul: '3000 zł netto',
            naglowek: 'Ryczałt 10 godzin miesięcznie kosztuje 3000 zł netto, czyli 300 zł netto za godzinę.',
            akapity: [
              'To najniższy ryczałt w naszym cenniku opieki. Ile godzin miesięcznie realnie potrzebujesz, ustalamy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
            ],
            punkty: [
              '300 zł netto za godzinę.',
              'Taniej niż stawka bazowa 350 zł netto za godzinę.',
            ],
          },
          {
            numer: 'PAKIET 2',
            tytul: '20 godzin',
            podtytul: '5500 zł netto',
            naglowek: 'Ryczałt 20 godzin miesięcznie kosztuje 5500 zł netto, czyli 275 zł netto za godzinę.',
            akapity: [
              'Więcej godzin to więcej miejsca na rozwój obok samego utrzymania, więc obok pilnowania dokładamy nowe rzeczy.',
            ],
            punkty: [
              '275 zł netto za godzinę.',
              'Część godzin zostaje na nowe automatyzacje.',
            ],
          },
          {
            numer: 'PAKIET 3',
            tytul: '40 godzin',
            podtytul: '10000 zł netto',
            naglowek: 'Ryczałt 40 godzin miesięcznie kosztuje 10000 zł netto, czyli 250 zł netto za godzinę.',
            akapity: [
              'To najniższa stawka za godzinę w naszym cenniku opieki. Godziny poza ryczałtem rozliczamy osobno, po stawce bazowej.',
            ],
            punkty: [
              '250 zł netto za godzinę.',
              'Poza ryczałtem: 350 zł netto za godzinę.',
            ],
          },
        ],
      },
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
        typ: 'sekcja',
        naglowek: 'Czy muszę płacić abonament co miesiąc?',
        wariant: 'edge',
        chip: 'CENNIK',
        akapity: [
          'To zależy od usługi. Abonament AI dla firmy ma u nas dwie formy. Opieka AI to osobna usługa: ryczałt 10, 20 albo 40 godzin rozliczany miesięcznie.',
          'Przy opiece po wdrożeniu chatbota czy voicebota masz wybór, o którym mówimy wprost, zanim cokolwiek zamówisz: abonament u nas albo 0 zł miesięcznie po przekazaniu infrastruktury.',
          'Ile kosztuje utrzymanie chatbota? To zależy od tego, gdzie stoi infrastruktura. Gdy zostaje u nas, płacisz abonament. Gdy przekażemy ją Tobie, nie płacisz nic miesięcznie.',
          'Ile godzin opieki realnie potrzebujesz, ustalamy na bezpłatnej diagnozie: 0 zł, około 30 minut. Bez ukrytych kosztów i bez zobowiązań.',
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
    ],
    minPrice: 3000,
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
