import type { Usluga } from './types';

/**
 * USŁUGA 1 — AUTOMATYZACJE (automatyzacja procesów AI).
 * Treść fazy 3: pełny tekst PL z 06-copy-hero-uslugi.md §"USŁUGA 1", 1:1 z FAQPage.
 * Głos Pawła, answer-first, zero em-dash, zero zmyślonych liczb i cen.
 *
 * INPUT PAWŁA (do flipu live / dowód):
 *  - ramaCeny.minPrice: od 2026-10-14 ustawione na 1990 (AI Start, najtańsze
 *    jawne wejście), co włącza offers w Service JSON-LD i kafel ceny w hero.
 *    Etykieta kafla wymaga wpisu `automatyzacje` w KAFEL_CENY
 *    (components/uslugi/ServiceHero.tsx), inaczej policzy się z ramaCeny.h2.
 *  - typowy zakres oszczędności zł/mc lub godziny/mc zdjęte u klienta — do tekstu ceny
 *    i jako dowód przy CTA, gdy będzie realny case z liczbą (np. "X h/mc zdjęte u klienta").
 *  - cta.dowod: docelowo jeden realny case z liczbą + imię + firma (za zgodą). Do tego
 *    czasu uczciwe zdanie o diagnozie zamiast atrapy liczby.
 */
export const automatyzacje: Usluga = {
  slug: 'automatyzacje',
  /* 2026-08-31: data bumpnięta z '2026-08-21', bo zmieniła się treść widoczna
     dla klienta (nagłówek i akapit case'u Instytutu Kryptografii oraz opis
     realizacji: 80% / 75% draftów -> około 85% pisze AI). Pole jest źródłem
     `lastmod` w sitemap.xml (app/sitemap.ts).
     2026-10-12 (audyt SEO): z FAQ o danych usunięta data wejścia AI Act
     (reguła projektu: zero dat, numerów artykułów i kar z AI Act).
     2026-10-14 (operacja naprawcza SEO 13.10, zwiad.json klaster
     „automatyzacje"): tytuł z intencją usługi zamiast poradnikowej (dublował
     wpis blogowy, kanibalizacja), kapsuła z ceną i narzędziami, FAQ o koszcie,
     własności i agencie AI, tabela trzech poziomów, przykłady według działów,
     sekcja o zespole i o sposobie pracy, minPrice 1990 (offers w JSON-LD),
     powiązane usługi i wpis. H1 BEZ ZMIAN (etykieta linków w innych plikach). */
  dataAktualizacji: '2026-10-14',
  h1: 'Automatyzacja procesów w firmie z AI',

  /* 2026-10-14: kapsuła zaczyna się frazą „automatyzacja procesów AI dla firm"
     i niesie cenę oraz narzędzia (idzie też do description w Service JSON-LD).
     Źródła: Make.com i n8n = blok akapitu w `rozwiazanie` niżej; 1990 zł netto
     = AI Start (próg 1 niżej, „1990 zł netto" jak w chatboty.ts i
     podstrony/asystent-wewnetrzny.ts); 3000-10000 zł netto = próg 2 niżej. */
  kapsula:
    'Automatyzacja procesów AI dla firm to przejęcie przez system powtarzalnej roboty, którą dziś robi człowiek: przepisywania danych między mailem, arkuszem i fakturą, wysyłania potwierdzeń, pilnowania terminów. Budujemy jeden proces od początku do końca na Make.com albo n8n i wdrażamy go w dni, nie w miesiące. Pierwszy proces na próbę kosztuje 1990 zł netto, pełne wdrożenie 3000-10000 zł netto. Dane zostają w Unii Europejskiej.',

  /* 2026-10-14: z sufiksem marki z layoutu (" · SimpleFast.ai", 16 zn.) całość
     ma 58 znaków. Wersja z „dla firm" i ceną miałaby 61, więc „dla firm" idzie
     do opisu i kapsuły, a w tytule zostaje fraza główna i cena netto. */
  metaTitle: 'Automatyzacja procesów AI od 1990 zł netto',
  metaDescription:
    'Automatyzacja procesów AI dla firm na Make.com i n8n. Pierwszy proces w dni: AI Start 1990 zł netto, pełne wdrożenie 3000-10000 zł netto. Bezpłatna diagnoza.',

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
      /* 2026-09-22: naglowek byl slowo w slowo pytaniem z FAQ nizej, wiec ten jeden URL
         zglaszal do FAQPage te sama pare pytanie-odpowiedz dwa razy. Pytanie zostaje
         TYLKO w FAQ, tu zdanie twierdzace. Akapit stracil otwierajace "Z tymi, ktorych
         juz uzywasz", bo to byla odpowiedz na skasowane pytanie; ten fakt przeszedl
         do naglowka. */
      {
        typ: 'naglowek',
        tekst: 'Automatyzacja łączy narzędzia, których już używasz',
        ikona: 'folder-kod',
        chip: 'MAKE.COM I N8N',
        overline: 'AUTOMATYZACJA · JEDEN PROCES END-TO-END',
      },
      {
        typ: 'akapit',
        tekst: 'Nie zmuszamy Cię do zmiany oprogramowania, tylko łączymy Twoje narzędzia w jeden ciąg, który działa bez ręcznej roboty. Przepływy budujemy na platformach do automatyzacji Make.com i n8n, a spinamy nimi między innymi:',
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
      /* 2026-10-14 (zwiad „automatyzacje", PAA „Czym się różni automatyzacja od
         agenta AI?"): tabela trzech poziomów. Nagłówek celowo twierdzący, inny
         niż pytanie w FAQ niżej (zasada z 2026-09-22 o dublach na jednym URL).
         Fakty: reguła „jak przyjdzie X, zrób Y" i „drobne decyzje po drodze" =
         wpis blogowy automatyzacja-procesow-ai-od-czego-zaczac; około 85%
         draftów = case Instytutu Kryptografii niżej; agent na Meet, Zoom albo
         Teams z raportem i zadaniami = lib/realizacje/auto-podsumowania-spotkan;
         przypomnienia, potwierdzenia, arkusz i CRM = siatka wyżej; granice
         i zatrzymanie = akapit „Kontrola zostaje po Twojej stronie". */
      {
        typ: 'naglowek',
        tekst: 'Zwykła automatyzacja, automatyzacja AI i agent AI to trzy różne poziomy',
        ikona: 'puzzle',
      },
      {
        typ: 'tabela',
        wKarcie: true,
        podpis: 'Trzy poziomy automatyzacji na przykładach z naszych wdrożeń',
        naglowki: ['', 'Zwykła automatyzacja', 'Automatyzacja AI', 'Agent AI'],
        wiersze: [
          [
            'Co robi',
            'Przenosi dane według stałej reguły: jak przyjdzie X, zrób Y',
            'Rozumie treść: czyta maila, wyłapuje, o co chodzi, przygotowuje odpowiedź',
            'Sam podejmuje drobne decyzje po drodze i wykonuje kilka kroków',
          ],
          [
            'Przykład z naszych wdrożeń',
            'Przypomnienia, potwierdzenia, przepływ danych między arkuszem a CRM',
            'Auto-email w Instytucie Kryptografii: około 85% draftów pisze AI',
            'Agent dołącza do spotkania na Meet, Zoom albo Teams i wysyła raport z zadaniami',
          ],
          [
            'Rola człowieka',
            'Ustawia regułę raz',
            'Zatwierdza gotowy tekst',
            'Ustawia granice i w każdej chwili może go zatrzymać',
          ],
          [
            'Kiedy wybrać',
            'Kroki zawsze takie same, dane uporządkowane',
            'W danych jest tekst do zrozumienia: maile, zgłoszenia, dokumenty',
            'Proces ma kilka kroków i drobne decyzje po drodze',
          ],
        ],
      },
      {
        /* Wzmianka o stronie agentów AI (F1-1 operacji 13.10). Link stoi
           w `powiazane.uslugi` na dole, bo komórki tabeli to czysty tekst. */
        typ: 'akapit',
        tekst: 'Który poziom pasuje do Twojego procesu, mówimy wprost na bezpłatnej diagnozie. Agentom AI, którzy sami prowadzą kilka kroków procesu, poświęciliśmy osobną stronę. Link znajdziesz niżej, w powiązanych usługach.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Około 85% draftów pisze AI przy 580 mailach tygodniowo',
        wariant: 'edge',
        meta: 'Instytut Kryptografii',
        akapity: [
          'Dla Instytutu Kryptografii zbudowaliśmy auto-email dla biura obsługi klienta oraz 3 boty oparte na transkrypcjach kursów.',
          'Efekt przy 580 mailach tygodniowo w szczycie: około 85% draftów odpowiedzi pisze AI, a mail idzie do klienta od razu albo po drobnej poprawce. Człowiek nie pisze maili od zera, tylko sprawdza gotowy tekst.',
          'Tak działa automatyzacja obsługi maili w praktyce: system czyta zgłoszenie, przygotowuje odpowiedź, a człowiek tylko ją zatwierdza i wysyła.',
        ],
      },
      /* 2026-10-14 (zwiad „automatyzacje": ludzie szukają działami, np.
         „automatyzacja dokumentów", „automatyzacja procesów raportowych").
         TYLKO fakty już opublikowane:
          - Obsługa klienta: case Instytutu Kryptografii wyżej (około 85%),
          - Sprzedaż: KNF Team „automatyczne raporty sprzedażowe" (sekcja
            problemu wyżej) + lib/realizacje/lead-generator (1000 rekordów
            w 40 minut zamiast około dwóch tygodni),
          - Księgowość: lib/uslugi/dokumenty-faktury (OCR, kategoria kosztu,
            księgowość, KSeF; skan, PDF, zdjęcie),
          - Zarząd: lib/realizacje/auto-podsumowania-spotkan,
          - Marketing: lib/realizacje/automat-tresci-social,
          - Rekrutacja: lib/uslugi/agent-rekrutacyjny (metaDescription).
         Linki do tych usług stoją w `powiazane.uslugi` na dole strony. */
      {
        typ: 'naglowek',
        tekst: 'Przykłady automatyzacji według działu firmy',
        ikona: 'mapa',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Obsługa klienta',
            akapity: [
              'Auto-email: system czyta zgłoszenie i przygotowuje odpowiedź, a człowiek ją zatwierdza.',
            ],
            punkty: [
              'U Instytutu Kryptografii około 85% draftów pisze AI.',
            ],
          },
          {
            naglowek: 'Sprzedaż',
            akapity: [
              'Automatyczne raporty sprzedażowe zamiast ręcznie sklejanych arkuszy.',
            ],
            punkty: [
              'Generator leadów: 1000 rekordów w 40 minut zamiast około dwóch tygodni ręcznej pracy.',
            ],
          },
          {
            naglowek: 'Księgowość i dokumenty',
            akapity: [
              'Odczyt faktur OCR ze skanu, PDF-u i zdjęcia, przypisanie kategorii kosztu, wpis do księgowości.',
            ],
            punkty: [
              'Na koniec automat przygotowuje eksport do KSeF.',
            ],
          },
          {
            naglowek: 'Zarząd i spotkania',
            akapity: [
              'Agent dołącza do spotkania na Meet, Zoom albo Teams i spisuje rozmowę.',
            ],
            punkty: [
              'Po spotkaniu wysyła raport z zadaniami dla konkretnych osób.',
            ],
          },
          {
            naglowek: 'Marketing',
            akapity: [
              'Automat treści: gotowy post oparty na świeżych newsach z branży.',
            ],
            punkty: [
              'Człowiek sprawdza post i publikuje go jednym kliknięciem.',
            ],
          },
          {
            naglowek: 'Rekrutacja',
            akapity: [
              'Agent AI do rekrutacji zbiera CV, robi pierwszy odsiew i odpowiada kandydatom.',
            ],
            punkty: [
              'Umawia rozmowy, a decyzja zostaje u Ciebie.',
            ],
          },
        ],
      },
      /* 2026-10-14 (zwiad: 4 z 6 liderów pokazuje ludzi z imienia, u nas 0 osób
         w treści). Zdania 1:1 z lib/o-nas/content.ts (kapsuła, bio founderów)
         i lib/site.ts (jobTitle „Architekt AI full-stack"). Zero nowych
         twierdzeń, zero liczb. */
      {
        typ: 'sekcja',
        naglowek: 'Kto zbuduje Twoją automatyzację',
        wariant: 'edge',
        akapity: [
          'Automatyzację projektuje i stawia Paweł Pieloch, Architekt AI full-stack. Prowadzi całą budowę: automatyzacje, chatboty, voiceboty i aplikacje. To z nim rozmawiasz na diagnozie.',
          'Marcin Karpeta prowadzi firmę razem z Pawłem i pilnuje, żeby wszystko się spinało: relacja z klientem, dowiezienie projektu i opieka po wdrożeniu.',
        ],
      },
      /* 2026-10-14 (zwiad: fraza „agencja automatyzacji AI" jest w queries, ale
         słowo „agencja" nie padało w treści). Same fakty z tej strony: 1990 zł
         netto (próg 1), 3000-10000 zł netto (próg 2), „w dni, nie w miesiące"
         (kroki i FAQ), dwie rundy poprawek i dwa modele rozliczenia (sekcja
         zasad w ramaCeny). Silnik do wyboru: reguła operacji 13.10 i
         chatboty.ts. Bez porównań z innymi agencjami. */
      {
        typ: 'sekcja',
        naglowek: 'Jak pracuje nasza agencja automatyzacji AI',
        wariant: 'quiet',
        akapity: [
          'Zasady współpracy podajemy wprost, zanim cokolwiek zamówisz:',
        ],
        punkty: [
          'AI Start za 1990 zł netto: jeden proces na próbę, zanim wydasz więcej.',
          'Pełne wdrożenie 3000-10000 zł netto, dokładna kwota na bezpłatnej diagnozie.',
          'Pierwszy proces stawiamy w dni, nie w miesiące.',
          'Dwie rundy poprawek są w cenie wdrożenia.',
          'Po wdrożeniu przekazanie infrastruktury i 0 zł abonamentu albo opieka 99-599 zł netto miesięcznie.',
          'Silnik AI wybierasz Ty: OpenAI, Anthropic albo Google.',
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
       Fakty 1:1 z konspektu; forma na strukture.
       2026-10-14: `minPrice` 1990 = AI Start (próg 1 niżej), najtańsze jawne
       wejście. Włącza kwotę „od 1990 zł netto" na karcie ceny, kafel w hero
       i offers z PriceSpecification w Service JSON-LD. `tresc` zaczyna się od
       tej samej kwoty, żeby karta nie pokazywała 1990 nad zdaniem o 3000. */
    tresc:
      'Pierwszy proces na próbę w pakiecie AI Start kosztuje 1990 zł netto. Pełne wdrożenie automatyzacji jednego procesu to zwykle 3000-10000 zł netto, zależnie od liczby integracji. Cenę liczymy od wartości, nie od godzin. Na bezpłatnej rozmowie badamy potrzeby i mówimy, od którego procesu zacząć, a dokładny pomiar godzin i złotych robimy w Sprincie Diagnostycznym za 1490 zł netto, odliczanym od wdrożenia.',
    minPrice: 1990,
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1990 zł netto',
            opis: 'AI Start, czyli pierwsza automatyzacja jednego procesu na próbę.',
            zrodlo: 'próg 1 z przełącznika niżej',
            ton: 'cyan',
          },
          {
            wartosc: '3000-10000 zł netto',
            opis: 'Pełne wdrożenie automatyzacji procesu, zależnie od liczby integracji.',
            zrodlo: 'widełki z drugiego zdania tej sekcji',
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
            podtytul: '1990 zł netto',
            naglowek: 'AI Start za 1990 zł netto automatyzuje jeden proces wewnątrz firmy.',
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
              'Projektujemy i wdrażamy jeden proces od początku do końca.',
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
            '1990 zł netto',
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
    /* 2026-10-14 (zwiad: pytanie o koszt jest w „Ludzie też pytają" na 6 z 7
       SERP, a FAQPage tej strony go nie miał). Pytanie celowo inne niż FAQ
       poradnika cenowego („Ile kosztuje automatyzacja AI w firmie?"). Kwoty
       1:1 z ramaCeny tej strony (1990 zł netto, 3000-10000 zł netto,
       99-599 zł netto/mies. albo 0 zł). */
    {
      pytanie: 'Ile kosztuje automatyzacja procesów w firmie?',
      odpowiedz:
        'Pierwszy proces na próbę w pakiecie AI Start kosztuje 1990 zł netto. Pełne wdrożenie automatyzacji jednego procesu to zwykle 3000-10000 zł netto, zależnie od liczby integracji. Opieka po wdrożeniu kosztuje 99-599 zł netto miesięcznie albo 0 zł, gdy przekazujemy Ci infrastrukturę. Dokładną kwotę w tych widełkach podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
    },
    /* 2026-10-14: własność rozwiązania (FAQ liderów: „czy rozwiązania zostają
       u mnie"). Źródła: przełącznik progu 3 i zasady rozliczenia na tej
       stronie (0 zł po przekazaniu infrastruktury albo 99-599 zł netto/mies.),
       „automat pracuje na Twoich kontach" i „model wybierasz po wdrożeniu,
       nie na starcie" = lib/uslugi/dokumenty-faktury.ts (modele rozliczenia). */
    {
      pytanie: 'Czy automatyzacja zostaje moja po wdrożeniu?',
      odpowiedz:
        'Tak, jeśli tak wybierzesz. Po wdrożeniu możesz przejąć całą infrastrukturę: automat pracuje wtedy na Twoich kontach, a abonament wynosi 0 zł. Możesz też zostawić projekt u nas i płacić za opiekę 99-599 zł netto miesięcznie. Model wybierasz po wdrożeniu, nie na starcie.',
    },
    /* 2026-10-14: PAA „Czym się różni automatyzacja od agenta AI?". Pytanie
       stoi TYLKO tu; nagłówek tabeli trzech poziomów wyżej jest twierdzący. */
    {
      pytanie: 'Czym się różni automatyzacja od agenta AI?',
      odpowiedz:
        'Zwykła automatyzacja wykonuje z góry ustalone kroki: jak przyjdzie X, zrób Y. Agent AI rozumie treść i sam podejmuje drobne decyzje po drodze: czyta, przygotowuje wynik i przekazuje go dalej. Ty ustawiasz mu granice i w każdej chwili możesz go zatrzymać. Na bezpłatnej diagnozie mówimy wprost, czy Twój proces potrzebuje agenta, czy wystarczy zwykła automatyzacja.',
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
        'Tak. Dane zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty widzisz każdy krok procesu i w każdej chwili możesz go zatrzymać.',
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

  /* 2026-10-14 (recenzja fali 1): „automatyzacja procesów w firmie" oddana
     wpisowi blogowemu automatyzacja-procesow-ai-od-czego-zaczac (fraza
     informacyjna, w top 3 SERP same poradniki wg zwiadu). Usługa trzyma
     frazę ze swojego tytułu. H1 bez zmian (etykieta linków w innych plikach). */
  queries: [
    'automatyzacja procesów AI',
    'agencja automatyzacji AI',
    'wdrożenie automatyzacji',
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
          'Około 85% draftów odpowiedzi pisze AI, a mail idzie do klienta od razu albo po drobnej poprawce.',
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
    /* 2026-10-14 (zwiad „automatyzacje", crawl 13.10: z tej usługi zero linków
       do innych usług; /uslugi/dokumenty-faktury miała 3 linki przychodzące
       i żadnego od rodzica). Etykieta = h1 celu (kontrakt types.ts), opis =
       jedno zdanie faktu ze strony celu.
       UWAGA INTEGRATORA: '/uslugi/wdrozenie-ai' i '/uslugi/agenci-ai' to nowe
       strony z F1-1 i F1-2 operacji 13.10. Etykiety = ich h1 w stanie z 14.10
       (wdrozenie-ai.ts linia z h1, agenci-ai.ts linia z h1), opisy = kapsuła
       wdrozenie-ai.ts i akapit definicji z agenci-ai.ts (problem.tresc).
       Jeśli któraś strona nie wejdzie albo dostanie inny h1, popraw etykietę
       albo usuń wpis (zero linków 404) i zdanie o stronie agentów pod tabelą
       trzech poziomów w `rozwiazanie.bloki`. */
    uslugi: [
      {
        etykieta: 'Automatyzacja dokumentów i faktur (OCR, KSeF)',
        href: '/uslugi/dokumenty-faktury',
        opis:
          'Automat czyta fakturę ze skanu, PDF-u albo zdjęcia, wpisuje ją do arkusza i księgowości i przygotowuje eksport do KSeF.',
      },
      {
        etykieta: 'Audyt AI firmy: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis:
          'Audyt AI za 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów. Cena odlicza się od wdrożenia.',
      },
      {
        etykieta: 'Opieka AI: utrzymanie i rozwój automatyzacji',
        href: '/uslugi/opieka-ai',
        opis:
          'Stałe utrzymanie i rozwój automatyzacji w ryczałcie 10, 20 albo 40 godzin miesięcznie, z raportem co miesiąc.',
      },
      {
        etykieta: 'Wdrożenie AI w firmie: etapy, ceny i terminy',
        href: '/uslugi/wdrozenie-ai',
        opis:
          'Zaczynasz od bezpłatnej diagnozy, potem audyt AI za 1490 zł netto albo jeden proces na próbę za 1990 zł netto.',
      },
      {
        etykieta: 'Agenci AI dla firm na czacie, w telefonie i w procesach',
        href: '/uslugi/agenci-ai',
        opis:
          'Agent AI dostaje zadanie i sam je wykonuje w Twoich systemach, a to, co wymaga decyzji, oddaje człowiekowi.',
      },
      {
        etykieta: 'Agent AI do rekrutacji i pierwszego kontaktu',
        href: '/uslugi/agent-rekrutacyjny',
        opis:
          'Zbiera CV, robi pierwszy odsiew, odpowiada kandydatom i umawia rozmowy. Decyzja zostaje u Ciebie.',
      },
      {
        etykieta: 'Leady branżowe B2B: gotowa baza firm',
        href: '/uslugi/leady-b2b',
        opis:
          'Gotowa baza firm B2B: 1000 rekordów za 169 zł netto, opłata jednorazowa.',
      },
    ],
    /* 2026-10-14: wpis blogowy po zmianie tytułu celuje we frazy informacyjne
       („automatyzacja procesów w firmie"), więc link z usługi wzmacnia podział
       usługa = oferta, wpis = poradnik. Etykieta = nowy `tytul` wpisu.
       Dwa kolejne cele (wpis o chatbocie i agencie, poradnik o koszcie agenta)
       mają w tej samej operacji nowe tytuły z szykiem „agent AI"; etykiety
       przepisane z ich `tytul` w stanie z 14.10. Jeśli tytuł celu się zmieni,
       etykieta idzie za nim. */
    poradniki: [
      {
        etykieta: 'Automatyzacja procesów w firmie: co to jest i od czego zacząć',
        href: '/blog/automatyzacja-procesow-ai-od-czego-zaczac',
        opis:
          'Co to jest automatyzacja procesów, które procesy oddać najpierw i jak policzyć, czy się opłaci.',
      },
      {
        etykieta: 'Chatbot czy agent AI: czym się różnią i co wybrać dla firmy',
        href: '/blog/chatbot-czy-ai-agent-roznice',
        opis:
          'Chatbot odpowiada na pytania, agent AI wykonuje całe zadania. Jak wybrać i od czego zacząć.',
      },
      {
        etykieta: 'Ile kosztuje agent AI dla firmy? Cennik wdrożenia 2026',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis:
          'Od czego zależy koszt agenta AI, jak policzyć zwrot i po czym poznać, że wdrożenie się spina.',
      },
    ],
  },
};
