import type { Usluga } from './types';

/**
 * USŁUGA 1 — AUTOMATYZACJE (automatyzacja procesów AI).
 * Treść fazy 3: pełny tekst PL z 06-copy-hero-uslugi.md §"USŁUGA 1", 1:1 z FAQPage.
 * Głos Pawła, answer-first, zero em-dash, zero zmyślonych liczb i cen.
 *
 * INPUT PAWŁA (do flipu live / dowód):
 *  - ramaCeny.minPrice: realne "od X zł" za pojedynczy proces (number) → włącza offers
 *    w Service JSON-LD. Dziś brak → undefined, render bez kwoty (mechanika + diagnoza).
 *  - typowy zakres oszczędności zł/mc lub godziny/mc zdjęte u klienta — do tekstu ceny
 *    i jako dowód przy CTA, gdy będzie realny case z liczbą (np. "X h/mc zdjęte u klienta").
 *  - cta.dowod: docelowo jeden realny case z liczbą + imię + firma (za zgodą). Do tego
 *    czasu uczciwe zdanie o diagnozie zamiast atrapy liczby.
 */
export const automatyzacje: Usluga = {
  slug: 'automatyzacje',
  dataAktualizacji: '2026-08-21',
  h1: 'Automatyzacja procesów w firmie z AI',

  kapsula:
    'Automatyzacja procesów AI to przejęcie przez system powtarzalnej roboty, którą dziś robi człowiek: przepisywania danych między mailem, arkuszem i fakturą, wysyłania potwierdzeń, pilnowania terminów. Nie sprzedajemy narzędzi. Projektujemy działający proces end-to-end i wdrażamy go w dni, nie w miesiące. Zaczynamy od jednego procesu, który boli najbardziej, a Twoje dane zostają w Unii Europejskiej.',

  metaTitle: 'Automatyzacja procesów AI: od czego zacząć',
  metaDescription:
    'Automatyzacja procesów w firmie z AI: przepisywanie danych, potwierdzenia i przypomnienia przejmuje system. Zobacz, które procesy opłaca się oddać.',

  problem: {
    h2: 'Na czym naprawdę tracisz czas każdego dnia?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Czas ucieka na powtarzalnej robocie, która nie wygląda jak problem, tylko jak „tak się u nas po prostu robi”. To praca, która nie rozwija firmy, tylko utrzymuje ją na powierzchni i zjada godziny, których nikt nie liczy.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '580 maili tygodniowo',
            opis: 'Tyle powtarzalnej poczty wpada w szczycie u Instytutu Kryptografii, zanim ktokolwiek zacznie na nią odpisywać.',
            zrodlo: 'Instytut Kryptografii, case w sekcji rozwiązania',
            ton: 'amber',
          },
          {
            wartosc: 'około 8 h tygodniowo',
            opis: 'Tyle godzin tygodniowo zdjęła automatyzacja zespołowi 12 handlowców i 3 menedżerów (szacunek klienta).',
            zrodlo: 'KNF Team, case niżej w tej sekcji',
            ton: 'cyan',
          },
          {
            wartosc: 'około 30 minut',
            opis: 'Tyle trwa diagnoza, która nazywa procesy do oddania systemowi.',
            zrodlo: 'bezpłatna diagnoza z sekcji o cenie',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Wieczorem przepisujesz dane z maila do systemu, z systemu do faktury. Ręcznie. Każdego dnia od nowa, ta sama robota, którą znasz na pamięć i której nikt nie wpisuje do żadnego kosztorysu.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Automatyzacja AI dla firm: jakie procesy zautomatyzować najpierw?',
        wariant: 'quiet',
        akapity: [
          'Te, które powtarzają się co dzień i nie wymagają ludzkiej oceny. Automatyzacja procesów w firmie zaczyna się od objawów, które łatwo rozpoznasz u siebie:',
        ],
        punkty: [
          'Ktoś co dzień wpisuje te same rzeczy w dwa różne miejsca.',
          'Klient czeka na potwierdzenie, bo nikt nie zdążył go wysłać.',
          'Dane wędrują między systemami przez ręczne przepisywanie.',
          'Potwierdzenia i przypomnienia wychodzą tylko wtedy, gdy ktoś pamięta.',
          'Powtarzalne zgłoszenia obsługuje człowiek, choć odpowiedzi są wciąż takie same.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Około 8 h tygodniowo mniej ręcznej roboty u 12 handlowców i 3 menedżerów',
        wariant: 'edge',
        meta: 'KNF Team',
        akapity: [
          'W KNF Team ta sama robota wracała co tydzień: raporty sprzedażowe składane ręcznie, ustalenia ze spotkań spisywane po fakcie, odpowiedzi szukane w wiedzy rozrzuconej po wielu miejscach.',
          'Zbudowaliśmy dla nich automatyczne raporty sprzedażowe, asystenta spotkań i bazę wiedzy. Efekt to około 8 h tygodniowo mniej pracy w zespole 12 handlowców i 3 menedżerów. To szacunek klienta, nie pomiar co do minuty.',
          'Tyle właśnie potrafi ważyć powtarzalna robota, dopóki ktoś jej nie policzy. Godziny nie stoją w żadnym kosztorysie, ale wychodzą z firmy co tydzień.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'To nie jest praca, która rozwija firmę. Automatyzacja procesów AI zdejmuje z zespołu właśnie te godziny i zostawia ludzi przy tym, co wymaga decyzji. Tak działają automatyzacje dla firm: system przejmuje powtarzalne, ludzie zajmują się resztą.',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie automatyzujemy?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Bierzemy jeden konkretny proces i układamy go tak, żeby szedł sam: dane przepływają między systemami bez przepisywania, potwierdzenia i przypomnienia wychodzą same. Ty dostajesz do rąk tylko to, co wymaga decyzji.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Z jakimi narzędziami się to łączy?',
        ikona: 'folder-kod',
        chip: 'MAKE.COM I N8N',
        overline: 'AUTOMATYZACJA · JEDEN PROCES END-TO-END',
      },
      {
        typ: 'akapit',
        tekst: 'Z tymi, których już używasz. Nie zmuszamy Cię do zmiany oprogramowania, tylko łączymy Twoje narzędzia w jeden ciąg, który działa bez ręcznej roboty. Przepływy budujemy na platformach do automatyzacji Make.com i n8n, a spinamy nimi między innymi:',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Poczta',
            akapity: [
              'Automatyzacja obsługi maili: powtarzalne odpowiedzi i potwierdzenia wychodzą bez Twojego udziału.',
            ],
            punkty: [
              'System czyta zgłoszenie i przygotowuje odpowiedź.',
              'Człowiek tylko zatwierdza gotowy tekst i wysyła.',
            ],
          },
          {
            naglowek: 'Arkusze i CRM',
            akapity: [
              'Dane przepływają między nimi bez ręcznego kopiowania.',
            ],
            punkty: [
              'Nie wpisujesz tego samego w dwa różne miejsca.',
              'Dane przechodzą raz, bez błędów przepisywania.',
            ],
          },
          {
            naglowek: 'Dokumenty i faktury',
            akapity: [
              'Automatyzacja obiegu dokumentów: umowy i załączniki trafiają tam, gdzie mają być, bez ręcznego przenoszenia.',
            ],
            punkty: [
              'To, co przyszło mailem, nie jest już przepisywane ręcznie.',
            ],
          },
          {
            naglowek: 'Kalendarz i komunikatory',
            akapity: [
              'Przypomnienia i powiadomienia wychodzą same.',
            ],
            punkty: [
              'Klient nie czeka na potwierdzenie, bo ktoś nie zdążył go wysłać.',
              'Terminu pilnuje proces, a nie czyjaś pamięć.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: '80% draftów gotowych do wysyłki przy 580 mailach tygodniowo',
        wariant: 'edge',
        meta: 'Instytut Kryptografii',
        akapity: [
          'Dla Instytutu Kryptografii zbudowaliśmy auto-email dla biura obsługi klienta oraz 3 boty oparte na transkrypcjach kursów.',
          'Efekt przy 580 mailach tygodniowo w szczycie: 80% draftów odpowiedzi jest gotowych do wysyłki. Człowiek nie pisze maili od zera, tylko sprawdza gotowy tekst.',
          'Tak działa automatyzacja obsługi maili w praktyce: system czyta zgłoszenie, przygotowuje odpowiedź, a człowiek tylko ją zatwierdza i wysyła.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Kontrola zostaje po Twojej stronie. Ty ustawiasz zasady i granice, w każdej chwili widzisz, co system zrobił, i możesz go zatrzymać. Automat pracuje w tle, ale ostatnie słowo należy do Ciebie.',
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Automatyzacja AI a ręczna obsługa procesu',
    naglowekBez: 'Ręczna robota',
    naglowekZNami: 'Automatyzacja od SimpleFast.ai',
    wiersze: [
      { cecha: 'Kto to robi', bez: 'Człowiek, co dzień od nowa', zNami: 'System, w tle, bez przerwy' },
      { cecha: 'Czas reakcji', bez: 'Gdy ktoś zdąży', zNami: 'Od razu, 24/7' },
      {
        cecha: 'Błędy przepisywania',
        bez: 'Zdarzają się przy każdym wpisie',
        zNami: 'Dane przechodzą raz, bez ręcznego kopiowania',
      },
      { cecha: 'Koszt', bez: 'Godziny pracy zespołu, co miesiąc', zNami: 'Jednorazowe wdrożenie + opieka' },
      { cecha: 'Skalowanie', bez: 'Więcej zleceń = więcej rąk', zNami: 'Więcej zleceń = ten sam proces' },
      { cecha: 'Kontrola', bez: 'W głowach ludzi', zNami: 'Widzisz każdy krok, ustawiasz granice' },
    ],
  },

  kroki: {
    h2: 'Jak wygląda wdrożenie automatyzacji krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Pokazujesz, gdzie ucieka czas. My mówimy wprost, który proces da się zautomatyzować, ile to oszczędza i czego nie opłaca się ruszać. Wychodzisz z konkretną listą.',
      },
      {
        tytul: 'Pierwszy proces',
        opis:
          'Wybieramy jeden, który boli najbardziej. Budujemy i wdrażamy w dni. Testujemy na żywo na Twoich danych, Ty ustawiasz zasady.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Proces działa, my pilnujemy, żeby działał dobrze. Patrzymy na wyniki, poprawiamy, dokładamy kolejne procesy, kiedy poczujesz, że to się spina.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje wdrożenie automatyzacji?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Automatyzacja jednego procesu kosztuje zwykle 3000-10000 zł netto, zależnie od liczby integracji. Cenę liczymy od wartości, nie od godzin: na bezpłatnej diagnozie najpierw liczymy, ile godzin i złotych miesięcznie zjada dany proces.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1990 zł',
            opis: 'AI Start, czyli pierwsza automatyzacja jednego procesu na próbę.',
            zrodlo: 'próg 1 z przełącznika niżej',
            ton: 'cyan',
          },
          {
            wartosc: '3000-10000 zł netto',
            opis: 'Pełne wdrożenie automatyzacji procesu, zależnie od liczby integracji.',
            zrodlo: 'widełki z pierwszego zdania tej sekcji',
            ton: 'violet',
          },
          {
            wartosc: '99-599 zł netto/mies.',
            opis: 'Opieka po wdrożeniu albo 0 zł przy przekazaniu infrastruktury.',
            zrodlo: 'próg 3 z przełącznika niżej',
            ton: 'green',
          },
          {
            wartosc: '2 rundy poprawek',
            opis: 'Tyle rund poprawek jest w cenie wdrożenia, zanim nastąpi odbiór.',
            zrodlo: 'zasady rozliczenia niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Ile kosztuje automatyzacja AI w firmie?',
        ikona: 'wykres-strzalka',
        chip: 'CENNIK',
        overline: 'CENY NETTO · DOKŁADNA WYCENA NA DIAGNOZIE',
      },
      {
        typ: 'przelacznik',
        grupa: 'automatyzacje-progi',
        opcje: [
          {
            numer: 'PRÓG 1',
            tytul: 'AI Start',
            podtytul: '1990 zł',
            naglowek: 'AI Start za 1990 zł automatyzuje jeden proces wewnątrz firmy.',
            akapity: [
              'To mały i odwracalny krok. Bierzemy jedną powtarzalną czynność, stawiamy ją jako działający przepływ i sprawdzasz na własnych danych, czy to się u Ciebie spina.',
              'AI Start to inny produkt niż chatbot na stronę, który kosztuje od 1790 zł netto. Tu automatyzujemy proces wewnątrz firmy, tam bot rozmawia z klientem na stronie.',
            ],
            punkty: [
              'Jeden proces, wybrany wcześniej na bezpłatnej diagnozie.',
              'Wejście przed pełnym wdrożeniem, nie tańsza wersja chatbota.',
            ],
          },
          {
            numer: 'PRÓG 2',
            tytul: 'Automatyzacja procesu',
            podtytul: '3000-10000 zł netto',
            naglowek: 'Pełne wdrożenie automatyzacji procesu kosztuje 3000-10000 zł netto.',
            akapity: [
              'Pojedynczy proces to inna półka niż kilka połączonych, dlatego cena zależy od liczby integracji. Dokładną kwotę w tych widełkach podajemy na diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
            ],
            punkty: [
              'Projektujemy i wdrażamy jeden proces end-to-end.',
              'Czas wdrożenia liczymy od przekazania kompletu materiałów.',
              'Dwie rundy poprawek są w cenie wdrożenia.',
            ],
          },
          {
            numer: 'PRÓG 3',
            tytul: 'Opieka po wdrożeniu',
            podtytul: '99-599 zł netto/mies. albo 0 zł',
            naglowek: 'Opieka po wdrożeniu to 99-599 zł netto miesięcznie albo 0 zł.',
            akapity: [
              'Abonament płacisz tylko wtedy, gdy projekt zostaje u nas. Jeśli wolisz przejąć infrastrukturę do siebie, opieka kosztuje 0 zł i nie masz żadnego abonamentu. Nie zostawiamy klientów po odbiorze.',
            ],
            punkty: [
              'Projekt u nas: 99-599 zł netto/mies.',
              'Przekazanie infrastruktury: 0 zł abonamentu.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Pozycja',
          'Cena',
          'Co to jest',
        ],
        wiersze: [
          [
            'AI Start',
            '1990 zł',
            'Pierwsza automatyzacja jednego procesu na próbę. Mały i odwracalny krok.',
          ],
          [
            'Automatyzacja procesu',
            '3000-10000 zł netto',
            'Pełne wdrożenie. Pojedynczy proces to inna półka niż kilka połączonych, dlatego cena zależy od liczby integracji.',
          ],
          [
            'Opieka po wdrożeniu',
            '99-599 zł netto/mies. albo 0 zł',
            'Abonament, gdy projekt zostaje u nas, albo 0 zł przy przekazaniu infrastruktury. Nie zostawiamy klientów po odbiorze.',
          ],
        ],
        wKarcie: true,
        podpis: 'Cennik automatyzacji: dokładną wycenę w tych widełkach podajemy na diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów. Sama diagnoza kosztuje 0 zł, trwa około 30 minut i kończy się konkretną listą rzeczy do automatyzacji.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dwie rundy poprawek w cenie i dwa modele rozliczenia',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: [
          'Wdrożenie wyceniamy tak, żeby zwracało się tym, co odzyskujesz. Poza tym obowiązują zasady, o których mówimy wprost, jeszcze przed wyceną:',
        ],
        punkty: [
          'Czas wdrożenia liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
          'Dwie rundy poprawek są w cenie wdrożenia: tydzień testów, poprawki, drugi tydzień, poprawki, odbiór.',
          'To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze.',
          'Nowe funkcje to rozbudowa, którą wyceniamy osobno.',
          'Po wdrożeniu wybierasz: przekazanie infrastruktury i 0 zł abonamentu albo projekt u nas i opłata 99-599 zł netto/mies.',
        ],
      },
    ],
    /* SEO 2026-08-17: linkowanie wewnętrzne do poradnika cenowego (zdanie 1:1
       z brief-seo-2026-08-17; render w RamaCeny.tsx w tym samym akapicie).
       Anchor = całe zdanie (opisowy, mówi dokładnie co jest w celu linku). */
    linkPoradnik: {
      przed: '',
      etykieta: 'Widełki cen automatyzacji rozpisaliśmy w osobnym poradniku',
      po: '.',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
    },
  },

  faq: [
    {
      pytanie: 'Czym jest automatyzacja procesów AI?',
      odpowiedz:
        'To przejęcie przez system powtarzalnej roboty, którą dziś wykonuje człowiek: przepisywania danych, wysyłania potwierdzeń, pilnowania terminów. System robi to sam, w tle, a człowiek zajmuje się tym, co wymaga decyzji. Wdrażamy ją na jednym konkretnym procesie, a potem rozwijamy.',
    },
    {
      pytanie: 'Który proces automatyzować najpierw?',
      odpowiedz:
        'Ten, który zabiera najwięcej godzin i najmniej wymaga ludzkiej oceny. Najczęściej to przepisywanie danych między systemami, wysyłka potwierdzeń i przypomnień albo obsługa powtarzalnych zgłoszeń. Na bezpłatnej diagnozie wskazujemy konkretnie, który da największą oszczędność u Ciebie.',
    },
    {
      pytanie: 'Czy automatyzacja zwolni moich ludzi?',
      odpowiedz:
        'Nie. Automatyzacja zdejmuje z zespołu powtarzalną robotę, a nie ludzi. Zespół przestaje przepisywać dane i pilnować terminów, a zajmuje się klientem i trudniejszymi sprawami. W praktyce ma więcej czasu, nie mniej pracy do zwolnień.',
    },
    {
      pytanie: 'Z jakimi narzędziami się to łączy?',
      odpowiedz:
        'Z tymi, których już używasz: pocztą, arkuszami, CRM, systemem do faktur, kalendarzem, komunikatorami. Nie zmuszamy Cię do zmiany całego oprogramowania. Łączymy to, co masz, w jeden proces, który działa sam.',
    },
    {
      pytanie: 'Czy moje dane będą bezpieczne?',
      odpowiedz:
        'Tak. Dane zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act, który w pełni obowiązuje od 2 sierpnia 2026. Podpisujemy umowę powierzenia danych, a Ty widzisz każdy krok procesu i w każdej chwili możesz go zatrzymać.',
    },
    {
      pytanie: 'Ile trwa wdrożenie automatyzacji?',
      odpowiedz:
        'Pierwszy proces stawiamy w dni, nie w miesiące. Prostsze przepływy idą szybciej, te z wieloma integracjami trochę dłużej, bo dochodzi łączenie systemów. Dokładny termin podajemy na bezpłatnej diagnozie, kiedy znamy już zakres.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy razem, ile godzin miesięcznie zjada Twoja powtarzalna robota. Bez zobowiązań, odpowiadam w kilka minut.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  queries: [
    'automatyzacja procesów AI',
    'agencja automatyzacji AI',
    'wdrożenie automatyzacji',
    'automatyzacja procesów w firmie',
  ],

  /* v22 (linki §3, P1 #6 i P2 #13): 85 wyświetleń, pozycja 17,0, w raporcie SEO
     wprost „brakuje treści". Trzy realizacje mają kategorię `automatyzacje`,
     czyli linkują TUTAJ, a zwrotnie nie było ani jednego linku. Link do
     /produkty zamyka jedyną prawdziwą sierotę serwisu (hub produktów nie miał
     ŻADNEGO linku redakcyjnego, żył wyłącznie z menu i stopki). */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Auto-email dla biura obsługi klienta',
        href: '/realizacje/auto-email-bok',
        opis:
          '75% maili wymaga już tylko drobnej korekty przed wysłaniem, bo draft czeka gotowy do jednego kliknięcia.',
      },
      {
        etykieta: 'Automatyczne raporty zamiast ręcznych arkuszy',
        href: '/realizacje/automatyczne-raporty',
        opis:
          'Automat spina dane z wielu źródeł i co rano dostarcza gotowy raport, bez niczyjego udziału.',
      },
      {
        etykieta: 'Automat treści na social media',
        href: '/realizacje/automat-tresci-social',
        opis:
          'Gotowy post oparty na świeżych newsach, a człowiek tylko sprawdza go i publikuje jednym kliknięciem.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Wpisujesz, ile osób ile godzin tygodniowo traci na powtarzalnej robocie, a kalkulator liczy kwotę roczną.',
      },
    ],
    produkty: [
      {
        etykieta: 'Co zbudowaliśmy i co z tego możesz mieć u siebie',
        href: '/produkty',
        opis:
          'Nasze własne produkty AI: co robią, dla kogo są i na jakim etapie dojrzałości stoją.',
      },
    ],
  },
};
