import type { Usluga } from './types';

/**
 * USŁUGA 2 — CHATBOTY (chatbot AI dla firmy).
 * Treść fazy 3, 1:1 z 06-copy-hero-uslugi.md §"USŁUGA 2 — CHATBOTY".
 * Pozycjonowanie kategorii: chatbot odpowiada, AI Agent działa.
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * CENNIK OBOWIĄZUJĄCY (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §1
 * plus decyzje Pawła z 2026-08-19). Każda kwota NETTO:
 *  - prosty  1790 zł        / 1-2 dni robocze,
 *  - średni  3000-6000 zł   / 3-4 dni robocze,
 *  - duży    8000-15000 zł  / 5-10 dni roboczych,
 *  - utrzymanie 99-599 zł/mies. gdy projekt zostaje u nas, 0 zł gdy przekazujemy
 *    klientowi całą infrastrukturę (decyzja Pawła: widełki chatbota ZOSTAJĄ,
 *    bo chatbot jest prostszy w utrzymaniu niż voicebot, który ma 299-1500 zł).
 * Kwota 990 zł ZNIKA z cennika chatbota (audyt §1: leżała poniżej pasma
 * rynkowego, przez co modele AI odrzucały ją jako wartość odstającą).
 * `ramaCeny.minPrice` = 1790 -> kafel ceny w hero, kolumna „Cena" na /uslugi
 * ORAZ `offers.minPrice` w Service JSON-LD (jedna liczba, cztery miejsca).
 *
 * ZASADA CZASU i RUNDY POPRAWEK (audyt §1, nasze własne zobowiązania, czyli
 * materiał do cytowania): czas liczymy OD PRZEKAZANIA KOMPLETU MATERIAŁÓW
 * przez klienta, nie od podpisania umowy; dwie rundy poprawek są w cenie
 * wdrożenia; poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze,
 * także po odbiorze; nowe funkcje to rozbudowa wyceniana osobno.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - cta.dowod: realna liczba z wdrożenia (np. zapytań/mc obsłużonych przez chatbota
 *    klienta) ALBO case z liczbą + zgodą. Do tego czasu uczciwe zdanie o diagnozie.
 */
export const chatboty: Usluga = {
  slug: 'chatboty',
  /* 2026-08-31: data bumpnięta z '2026-08-21', bo zmieniła się treść widoczna
     dla klienta (metryka draftów automatu mailowego 80% -> około 85% i opis
     tej metryki w sekcji o Instytucie Kryptografii). Pole jest źródłem
     `lastmod` w sitemap.xml (app/sitemap.ts). */
  dataAktualizacji: '2026-09-04',
  h1: 'Chatbot AI dla firmy',

  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2): pierwszy akapit po H1
     MUSI nieść cztery wielkości naraz, żeby model mógł wyciąć go jako gotową
     odpowiedź: dolny próg, górny próg, koszt miesięczny, czas wdrożenia.
     Przed tą zmianą kapsuła miała 0 z 4 (raport `raporty/stan-etapu1`). */
  kapsula:
    'Chatbot AI dla firmy kosztuje u nas od 1790 zł netto za próg prosty do 15000 zł netto za wdrożenie z integracjami, a samo wdrożenie trwa od 1 do 10 dni roboczych, licząc od przekazania kompletu materiałów. Utrzymanie po wdrożeniu to 99-599 zł netto miesięcznie, gdy projekt zostaje u nas, albo 0 zł, gdy przekazujemy Ci całą infrastrukturę. Chatbot odpowiada klientom przez całą dobę na Twojej stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie, zbiera leady i uczy się na Twojej wiedzy, a dane zostają w Unii Europejskiej.',

  metaTitle: 'Chatbot AI dla firm: cena i wdrożenie',
  metaDescription:
    'Chatbot AI dla firm od 1790 zł netto, wdrożenie od 1 do 10 dni roboczych. Odpowiada klientom 24/7 i zbiera leady. Utrzymanie 99-599 zł netto miesięcznie.',

  problem: {
    h2: 'Ile razy dziennie odpowiadasz na to samo pytanie?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Te same pytania wracają codziennie: o godziny, o cennik, o dojazd, o dostępność. Każde pytanie bez odpowiedzi w porę to potencjalny klient, który poszedł dalej.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'O której godzinie tracisz klienta?',
        ikona: 'chat-dymek',
        chip: 'DOBA FIRMY',
        overline: 'OBSŁUGA · TE SAME PYTANIA CODZIENNIE',
      },
      {
        typ: 'akapit',
        tekst: 'Klient pisze wieczorem, a Ty odpowiadasz rano, bo spałeś. Konkurencja czasem odpowiada szybciej i to ona dostaje zlecenie. Tak wygląda doba firmy, w której na wiadomości odpowiada tylko człowiek.',
      },
      {
        typ: 'lista',
        punkty: [
          'Pytanie o cennik: klient chce widełek, zanim w ogóle opisze swoją sprawę.',
          'Pytanie o godziny i dojazd: odpowiedź stoi na stronie, ale łatwiej zapytać niż szukać.',
          'Pytanie o dostępność terminu: ktoś musi sprawdzić kalendarz, więc odpowiedź czeka na wolną chwilę.',
          'Wiadomość spoza godzin pracy: leży w skrzynce do rana razem z kontaktem do klienta.',
        ],
      },
      {
        typ: 'przelacznik',
        grupa: 'chatboty-doba',
        opcje: [
          {
            numer: 'PORA 1',
            tytul: 'Godziny pracy',
            podtytul: 'Ty i zespół przy telefonie',
            naglowek: 'W godzinach pracy wracają te same cztery pytania: o godziny, cennik, dojazd i dostępność',
            akapity: [
              'Zwykle odpowiada ta sama osoba, która odbiera telefon i prowadzi bieżące sprawy. Wiadomość czeka więc na jej wolną chwilę, a nie na moment, w którym klient jej potrzebuje.',
            ],
            punkty: [
              'Bez chatbota na stronie firmowej odpowiadasz tylko w godzinach pracy.',
              'Ten sam czas zespołu mógłby iść na wyceny, realizację i kontakt z klientami z listy.',
            ],
          },
          {
            numer: 'PORA 2',
            tytul: 'Po godzinach i w weekend',
            podtytul: 'Skrzynka pracuje, Ty śpisz',
            naglowek: 'Wieczorne wiadomości czekają w skrzynce do rana, a lead nie czeka',
            akapity: [
              'Wiadomość z piątkowego wieczoru czeka na człowieka do poniedziałku rana. Zanim ktoś ją otworzy, klient zdąży napisać do następnej firmy z listy i najczęściej rozmawia już z kimś innym.',
            ],
            punkty: [
              'Poniedziałek zaczynasz od zaległej skrzynki, zamiast od nowych spraw.',
              'Leady wieczorne często przepadają, bo nikt nie zbiera kontaktu.',
            ],
          },
          {
            numer: 'PORA 3',
            tytul: 'Skok zapytań',
            podtytul: 'Kolejka rośnie, zespół ten sam',
            naglowek: 'Przy skoku zapytań kolejka rośnie, a zespół zostaje ten sam',
            akapity: [
              'Sezon, kampania albo jeden dobry post robią górkę zapytań. Tej górki nie da się obsłużyć szybciej bez dokładania ludzi, a górka zwykle mija, zanim nowa osoba zdąży się wdrożyć.',
            ],
            punkty: [
              'Ten sam bot obsługuje górkę zapytań bez kolejki.',
              'Po sezonie zostaje lista spraw, do których nikt już nie wrócił.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy chatbot zastąpi moją obsługę klienta?',
        wariant: 'quiet',
        akapity: [
          'Nie. Bot zdejmuje z zespołu dokładnie to, co widzisz w trzech porach doby wyżej: pytania w kółko o to samo i wiadomości spoza godzin pracy. Wycena nietypowego zlecenia, reklamacja albo rozmowa, która wymaga wyczucia, dalej należą do Twoich ludzi.',
          'Gdy sprawa przerasta bota, ten zapisuje kontakt do klienta i przekazuje temat Tobie. Rano zaczynasz dzień od krótkiej listy spraw dla człowieka, a nie od skrzynki pełnej pytań o godziny otwarcia.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co robi nasz chatbot, czego nie robi zwykły bot?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Chatbot dla firmy uczy się na Twojej wiedzy: ofercie, cenniku, najczęstszych pytaniach. Zwykły bot odtwarza sztywny skrypt, nasz odpowiada po polsku, w Twoim tonie, i zbiera kontakt do klienta, zamiast go gubić.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '24/7',
            opis: 'chatbot odpowiada, też nocą i w weekend',
            zrodlo: 'wiersz Dostępność z tabeli niżej',
            ton: 'cyan',
          },
          {
            wartosc: '3 boty',
            opis: 'chatboty na transkrypcjach kursów, Instytut Kryptografii',
            zrodlo: 'realizacja opisana niżej w tej sekcji',
            ton: 'violet',
          },
          {
            wartosc: '580 maili',
            opis: 'tygodniowo w biurze obsługi, obsługuje je automat mailowy',
            zrodlo: 'Instytut Kryptografii, to nie chatbot, opis niżej',
            ton: 'green',
          },
          {
            wartosc: '85%',
            opis: 'około tylu draftów tego automatu mailowego pisze AI',
            zrodlo: 'Instytut Kryptografii, to nie chatbot, opis niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co dokładnie robi chatbot dla firmy?',
        ikona: 'glob-siatka',
        chip: 'CHATBOT',
        overline: 'ROZWIĄZANIE · JEDNA WIEDZA, WIELE KANAŁÓW',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Kiedy i gdzie odpowiada chatbot dla firmy?',
            akapity: [
              'Wtedy, kiedy klient pisze, a nie wtedy, kiedy ktoś od Ciebie ma chwilę. Bot stoi na stronie i tam, gdzie piszą Twoi klienci, więc nikt nie musi trafić w godziny pracy.',
            ],
            punkty: [
              'Odpowiada klientom 24/7, także nocą i w weekend.',
              'Działa na Twojej stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie: jedna wiedza, ten sam bot, wiele kanałów.',
            ],
          },
          {
            naglowek: 'Co bot robi z klientem, który pyta po godzinach?',
            akapity: [
              'Nie zostawia go bez śladu. Zapisuje kontakt od razu i prowadzi rozmówcę dalej po stronie, zamiast kazać mu szukać właściwej zakładki samemu.',
            ],
            punkty: [
              'Zbiera leady i kontakt do klienta od razu, nawet po godzinach.',
              'Odsyła klienta do właściwych miejsc na stronie, zamiast kazać mu szukać.',
            ],
          },
          {
            naglowek: 'Skąd chatbot bierze wiedzę o Twojej firmie?',
            akapity: [
              'Z Twoich materiałów, nie z internetu. Ofertę, cennik i najczęstsze pytania wgrywamy do bazy wiedzy przy wdrożeniu, więc bot mówi to, co Ty mówisz klientom.',
            ],
            punkty: [
              'To chatbot na własnych danych firmy: uczy się z Twoich materiałów.',
              'Dane zostają w Unii Europejskiej.',
            ],
          },
        ],
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Czy chatbot będzie zmyślał odpowiedzi?',
            akapity: [
              'Nie, bo nie odpowiada z głowy. Przy wdrożeniu podpinamy botowi bazę wiedzy: Twoją ofertę, cennik i odpowiedzi na pytania, które klienci zadają najczęściej. Każdą odpowiedź bot buduje z tych materiałów, nie z własnych domysłów.',
              'Pytanie spoza bazy? Bot przyznaje, że tego nie wie, zapisuje kontakt i zostawia sprawę Tobie. Baza rośnie razem z botem: gdy jakieś pytanie wraca, dokładamy odpowiedź i następnym razem bot już je obsługuje.',
            ],
            punkty: [
              'Rozmówca od pierwszej wiadomości wie, że pisze z AI.',
              'Bot nie podszywa się pod pracownika.',
            ],
          },
          {
            naglowek: 'Czym chatbot różni się od AI Agenta?',
            akapity: [
              'Chatbot to warstwa odpowiedzi, AI Agent to warstwa działania: nie tylko udziela informacji, ale doprowadza całe zadanie do końca, na przykład umawia wizytę i zapisuje ją w kalendarzu, pod nadzorem człowieka.',
              'U nas wdrożenie chatbota w firmie to pierwszy, mały krok. Ten sam bot dostaje potem kolejne integracje i uprawnienia, aż urośnie do Agenta, kiedy będziesz gotowy. Nie budujesz od zera i nie musisz wybierać wszystkiego na starcie.',
            ],
            punkty: [
              'Rozbudowę do Agenta wyceniamy osobno, jak każdą nową funkcję.',
              'Zaczynasz od progu, którego potrzebujesz dziś.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Gdzie taki chatbot już pracuje?',
        wariant: 'quiet',
        chip: 'REALIZACJA',
        akapity: [
          'Tak działa to u Instytutu Kryptografii, dla którego zbudowaliśmy trzy boty na transkrypcjach kursów. Kursant pyta chatbota i od razu trafia do właściwej lekcji, zamiast przeszukiwać setki materiałów VOD.',
          'U tego samego klienta pracuje też osobna automatyzacja poczty, która nie jest chatbotem: przygotowuje odpowiedzi dla biura obsługi. Przy 580 mailach tygodniowo w szczycie około 85% draftów pisze AI, a odpowiedź idzie do klienta od razu albo po drobnej poprawce.',
          'Dwa różne narzędzia, jedna zasada: obie rzeczy stoją na wiedzy klienta, a człowiek zostaje przy sprawach, które wymagają decyzji.',
        ],
      },

      /* ══ PAKIET CHATBOTY 2026-09-04, SEKCJE 1-4 (`.seo-przeglad/pakiety/
         chatboty.md`, linie 34-193). Treść przeniesiona z pakietu, nie pisana
         własnymi słowami. Nic z dotychczasowej treści pliku nie zostało
         zmienione ani przestawione: doszły wyłącznie bloki.

         GDZIE STOJĄ I DLACZEGO TU:
          - §1 („Jaki chatbot AI jest mi w ogóle potrzebny?") i §2 („Chcę
            zobaczyć, jak działa chatbot AI, zanim zapłacę") -> KONIEC
            `rozwiazanie.bloki`, w tej kolejności. Pakiet stawia obie „po sekcji
            rozwiazanie, przed tabelaPorownawcza", czyli dokładnie tutaj.
          - §3 („Z czego właściwie składa się chatbot AI?") i §4 („Gdzie chatbot
            będzie rozmawiał z moimi klientami?") -> ZA §2, dalej w
            `rozwiazanie.bloki`. ODSTĘPSTWO ŚWIADOME: pakiet chce ich „po
            tabelaPorownawcza, przed kroki", a w kontrakcie `Usluga`
            (lib/uslugi/types.ts) ani `tabelaPorownawcza`, ani `kroki` NIE MAJĄ
            pola `bloki`. Wykonalne miejsca są dwa: koniec `rozwiazanie.bloki`
            (przed tabelą) albo początek `ramaCeny.bloki` (za krokami). Wybrany
            pierwszy, bo drugi jest slotem sekcji 5-7 tego samego pakietu
            („między kroki a ramaCeny") i wejście tam rozsypałoby kolejność
            1 -> 2 -> 3 -> 4 -> 5. Ten sam ruch co przy pakiecie GEO
            (lib/uslugi/optymalizacja.ts, N5).

         RENDER: `ServiceNarrative` woła `Bloki` z `naglowki="h3"`, więc cztery
         tytuły sekcji pakietu renderują się jako H3 pod H2 tej sekcji. Tak samo
         zachowały się sekcje pakietu GEO. Zero nowych typów bloków, zero CSS.

         LINKI: bloki treści renderują CZYSTY TEKST (components/blog/PostBody:
         <p>{tekst}</p>), więc klikalny link w akapicie nie ma jak powstać.
         Adresy z pakietu (`/uslugi/chatboty/obsluga-klienta`, `/baza-wiedzy`,
         `/sklep-internetowy`, `/whatsapp-messenger`) stoją jako zapowiedź
         podstrony BEZ adresu w treści, a realny link i tak jest na stronie:
         `app/uslugi/[usluga]/page.tsx` woła `<PodstronyPowiazane slug="chatboty" />`,
         który bierze wszystkie osiem podstron z rejestru
         (lib/uslugi/podstrony/index.ts) i wystawia je jako kafle z h1 celu.

         SKĄD LICZBY (innych nie dopisano, żadnej nie zaokrąglono):
          - 1790 zł netto / 1-2 dni robocze, 3000-6000 zł netto / 3-4 dni,
            8000-15000 zł netto / 5-10 dni: pakiet §1 karty 1-3 i §3 warstwa 3,
            zgodne co do złotówki z `ramaCeny` niżej i z `minPrice`,
          - 99-599 zł netto miesięcznie oraz 0 zł po przekazaniu infrastruktury:
            pakiet §1 akapit domykający, uwaga wdrożeniowa §7 („model utrzymania
            musi brzmieć identycznie"). Przy „0 zł" nie ma dopisku netto, bo zero
            netto to zero brutto,
          - §2 i §4 nie mają ANI JEDNEJ liczby i tak zostały napisane (pakiet:
            „zero liczb w tej sekcji, celowo").

         KWOTY POZA SEKCJĄ CENY (świadome, do decyzji przy scalaniu pakietu):
         konwencja „kwoty tylko w sekcji ceny" pochodzi z pakietu GEO
         (`.seo-przeglad/pakiety/geo.md`, uwaga wdrożeniowa §6). `chatboty.md`
         jej NIE MA, a §1 jest sekcją kwalifikacyjną, której cała wartość to
         „każda karta ma jawną cenę i jawny czas", i którą uwaga wdrożeniowa §7
         wymienia jako jedno z czterech miejsc z modelem utrzymania. Kwoty
         zostają więc w §1 i §3. Gdyby miały zejść do `ramaCeny.bloki`,
         przenosi się blok `siatka` §1 i punkty warstwy 3 w §3.

         CZTERY ŚWIADOME ODSTĘPSTWA OD LITERY PAKIETU (zgłoszone, nie ukryte):
          1. §2 zamówione jako „3 karty". Dowiezione blokiem `kroki` w wariancie
             `kolo`, bo to trzy pytania zadawane po kolei, a trzecia `siatka`
             pod rząd (§1, §2, §3) robiła ścianę identycznych kafli. Treść kart
             1:1, zero zmian w faktach.
          2. §3 warstwa 2: pakiet pisze „Nie korzystamy z modeli OpenAI". Zdanie
             zawężone do tego, co budujemy („Nie budujemy botów na modelach
             OpenAI"), bo konsola głosowa na tej stronie ma awaryjne zejście na
             OpenAI Realtime (components/agent/agent-console-init.ts). Sens
             i zakaz z uwagi wdrożeniowej §9 zachowane: wszędzie Anthropic
             i Claude, żadne zdanie nie sugeruje OpenAI za naszym chatbotem.
          3. §2 karta 3: „najważniejszą rzecz w całym botowaniu" zamienione na
             „w całej rozmowie z botem". Ukuty rzeczownik wypada z głosu marki.
          4. Zapis kwot bez spacji („15000 zł netto", nie „15 000 zł"), bo tak
             stoją w kapsule, w `ramaCeny` i w FAQ tej strony. Jedna strona,
             jeden zapis liczby.

         DATA: `dataAktualizacji` NIE jest tu bumpnięta świadomie. Pakiet wchodzi
         partiami i datę bumpuje się JEDNYM ruchem, gdy stoją wszystkie sekcje
         1-11 (tak samo zrobił pakiet GEO). ══ */

      {
        typ: 'naglowek',
        tekst: 'Jaki chatbot AI jest mi w ogóle potrzebny?',
        ikona: 'osoba-check',
        chip: 'DOBÓR BOTA',
        overline: 'TRZY SYTUACJE · JAWNA CENA I JAWNY CZAS',
      },
      {
        typ: 'akapit',
        tekst: 'Większość firm nie potrzebuje „chatbota". Potrzebuje konkretnej rzeczy: żeby ktoś odpisał o 22:00, żeby bot znał cennik na pamięć albo żeby sam sprawdził status zamówienia.',
      },
      {
        typ: 'akapit',
        tekst: 'Różnica między botem za 1790 zł netto a botem za 15000 zł netto nie polega na tym, że jeden jest lepszy. Polega na tym, ile Twoich systemów musi ze sobą rozmawiać.',
      },
      {
        typ: 'akapit',
        tekst: 'Wybierz kartę, która brzmi jak Twoja sytuacja. Każda ma jawną cenę i jawny czas.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Bot na stronę, który zna Twoją firmę',
            akapity: [
              'To dla Ciebie, jeśli klienci pytają w kółko o to samo, a Ty odpisujesz z telefonu wieczorem.',
            ],
            punkty: [
              'Co dostajesz: bot na Twojej stronie WWW, baza wiedzy z Twoich materiałów, zbieranie leadów z rozmowy.',
              'Czego nie ma: wpięcia w Twój CRM, sklep czy kalendarz.',
              'Cena: 1790 zł netto. Czas: 1-2 dni robocze.',
              'Osobna podstrona: chatbot do obsługi klienta, który odpowiada o 22:00.',
            ],
          },
          {
            naglowek: 'Bot średni, gdy pytania są trudniejsze',
            akapity: [
              'To dla Ciebie, jeśli masz kilka linii produktowych, długie procedury albo obsługujesz dwa języki.',
            ],
            punkty: [
              'Co dostajesz: większą bazę wiedzy, więcej ścieżek rozmowy, przekazanie sprawy do człowieka w ustalonym momencie.',
              'Czego nie ma: pełnych integracji dwustronnych z Twoimi systemami.',
              'Cena: 3000-6000 zł netto. Czas: 3-4 dni robocze.',
              'Osobna podstrona: chatbot na Twoich dokumentach, czyli firmowa baza wiedzy.',
            ],
          },
          {
            naglowek: 'Bot z integracjami, czyli taki, który coś robi',
            akapity: [
              'To dla Ciebie, jeśli bot ma sprawdzić stan magazynu, status zamówienia albo dopisać kontakt do CRM, a nie tylko opowiedzieć.',
            ],
            punkty: [
              'Co dostajesz: połączenie z Twoimi systemami, działanie w obie strony, obsługę spraw, które dziś ktoś klika ręcznie.',
              'Czego nie ma: taniej wersji. Tu płacisz za pracę na Twoich systemach, nie za rozmowę.',
              'Cena: 8000-15000 zł netto. Czas: 5-10 dni roboczych.',
              'Osobna podstrona: chatbot z integracjami na przykładzie sklepu internetowego.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Baza wiedzy jest w każdym z tych trzech botów. Różni się jej objętość i liczba ścieżek rozmowy, a nie sama technologia.',
      },
      {
        typ: 'akapit',
        tekst: 'Do wdrożenia dochodzi zużycie tokenów po Twojej stronie. Utrzymanie zależy od tego, gdzie stoi infrastruktura: u nas 99-599 zł netto miesięcznie, u Ciebie 0 zł. Rozpisujemy to niżej.',
      },

      {
        typ: 'naglowek',
        tekst: 'Chcę zobaczyć, jak działa chatbot AI, zanim zapłacę',
        ikona: 'dokument-skan',
        chip: 'TEST NA ŻYWO',
        overline: 'TRZY PYTANIA · SPRAWDZASZ SAM',
      },
      {
        typ: 'akapit',
        tekst: 'Możesz przeczytać dziesięć stron o chatbotach i dalej nie wiedzieć, jak to brzmi w rozmowie.',
      },
      {
        typ: 'akapit',
        tekst: 'Dlatego nasz bot stoi na tej stronie. Kliknij „Zapytaj AI" i sprawdź go sam, zanim porozmawiasz z kimkolwiek od nas.',
      },
      {
        typ: 'akapit',
        tekst: 'To nie jest demo z gotowymi odpowiedziami. To ten sam typ bota, którego stawiamy klientom, tyle że z bazą wiedzy o naszej firmie.',
      },
      {
        typ: 'akapit',
        tekst: 'Zadaj mu pytanie, na które u większości firm dostaniesz tylko formularz kontaktowy. Zobacz, czy nasz bot odpowie konkretem.',
      },
      {
        typ: 'kroki',
        wariant: 'kolo',
        kroki: [
          {
            tytul: 'Zapytaj o cenę wprost',
            opis: 'Przykład: „Ile kosztuje chatbot, który ma czytać moje PDF-y i cennik?". Sprawdzasz, czy bot potrafi podać kwotę, czy ucieka w „skontaktuj się z nami".',
          },
          {
            tytul: 'Zapytaj o termin',
            opis: 'Przykład: „Zaczynamy w poniedziałek. Kiedy bot będzie działał u mnie na stronie?". Sprawdzasz, czy zna nasze realne czasy wdrożenia, czy zgaduje.',
          },
          {
            tytul: 'Zapytaj o coś, czego nie robimy',
            opis: 'Przykład: „Zbudujecie mi aplikację mobilną na iOS?". Sprawdzasz najważniejszą rzecz w całej rozmowie z botem: co się dzieje, kiedy bot nie wie.',
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli po tych trzech pytaniach uznasz, że taki bot przydałby się u Ciebie, to właśnie zobaczyłeś demo swojego przyszłego wdrożenia.',
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli uznasz, że nie, też dobrze. Zaoszczędziłeś rozmowę.',
      },

      {
        typ: 'naglowek',
        tekst: 'Z czego właściwie składa się chatbot AI?',
        ikona: 'folder-kod',
        chip: 'TRZY WARSTWY',
        overline: 'BUDOWA BOTA · SKĄD BIERZE SIĘ CENA',
      },
      {
        typ: 'akapit',
        tekst: 'Kiedy dostajesz dwie wyceny, jedną na 1790 zł netto i drugą na 15000 zł netto, wygląda to jak naciąganie. Nie jest.',
      },
      {
        typ: 'akapit',
        tekst: 'Każdy chatbot ma trzy warstwy. Pierwsza jest w każdym bocie. Druga też. Trzecia jest tym, za co realnie rosną wyceny.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Warstwa 1: baza wiedzy, czyli skąd bot wie',
            akapity: [
              'Tu wgrywamy Twoje materiały: cennik, oferty, procedury, opisy produktów, transkrypcje nagrań. Bot szuka odpowiedzi w Twoich dokumentach, a nie w internecie.',
              'Fachowo nazywa się to RAG. Praktycznie znaczy to jedno: bot cytuje Ciebie, zamiast zmyślać.',
            ],
            punkty: [
              'Co idzie nie tak bez tej warstwy: bot brzmi mądrze i podaje cenę, której nie masz w cenniku.',
            ],
          },
          {
            naglowek: 'Warstwa 2: model językowy, czyli czym bot mówi',
            akapity: [
              'Model odpowiada za rozumienie pytania i za ton odpowiedzi. To jedyny element, którego nie budujemy sami. Korzystamy z gotowego modelu u zewnętrznego dostawcy.',
              'Konto u dostawcy jest Twoje, więc za zużycie płacisz mu wprost, bez naszej marży. Używamy modelu Claude od Anthropic. Nie budujemy botów na modelach OpenAI.',
            ],
            punkty: [
              'Model bez Twojej bazy wiedzy to miły rozmówca, który nie zna Twojej firmy.',
              'Baza bez modelu to wyszukiwarka. Dopiero razem robią bota.',
            ],
          },
          {
            naglowek: 'Warstwa 3: integracje, czyli co bot potrafi zrobić',
            akapity: [
              'Tu bot przestaje mówić i zaczyna działać: sprawdza status zamówienia, dopisuje kontakt do CRM, zerka na dostępność terminu.',
              'Każdy podpięty system to osobna praca po naszej stronie: dostępy, testy, obsługa błędów.',
            ],
            punkty: [
              'Dlatego bot z integracjami kosztuje 8000-15000 zł netto, a bot na stronę z bazą wiedzy 1790 zł netto.',
              'Jeśli słyszysz cenę bota z integracjami bez rozmowy o Twoich systemach, ktoś Ci zgaduje wycenę.',
            ],
          },
        ],
      },

      {
        typ: 'naglowek',
        tekst: 'Gdzie chatbot będzie rozmawiał z moimi klientami?',
        ikona: 'pudelko-3d',
        chip: 'KANAŁY',
        overline: 'JEDNA BAZA WIEDZY · KILKA OKIEN',
      },
      {
        typ: 'akapit',
        tekst: 'Bot nie musi siedzieć na stronie. Ma siedzieć tam, gdzie Twój klient już pisze, bo nikt nie zmieni przyzwyczajeń dla Twojego widgetu.',
      },
      {
        typ: 'akapit',
        tekst: 'Jedna baza wiedzy obsługuje kilka kanałów naraz. Odpowiedzi są te same, zmienia się tylko okno, w którym się pojawiają.',
      },
      {
        typ: 'lista',
        punkty: [
          'Strona WWW. Okno czatu na Twojej stronie, widoczne od razu po wejściu. Najczęstszy wybór, bo łapie ruch, który już masz, i zbiera leada w trakcie rozmowy.',
          'WhatsApp. Dla firm, do których klienci piszą z telefonu. Historia rozmowy zostaje u klienta w telefonie, więc wraca do niej po tygodniu.',
          'Messenger. Sensowny, jeśli ruch przychodzi Ci z Facebooka, a skrzynka puchnie po godzinach.',
          'Instagram. To samo co Messenger, tylko dla firm, które sprzedają przez zdjęcia i rolki.',
          'Telegram. Wybierany tam, gdzie zespół albo klienci już go używają na co dzień.',
          'Kilka kanałów naraz. Jedna baza wiedzy, kilka okien. Dokładamy kanał do gotowego bota, nie budujemy go drugi raz od zera.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'To jest pełna lista kanałów, które wdrażamy. Jeśli pytasz o inny, powiemy wprost, że go nie robimy, zamiast obiecywać na wyrost.',
      },
      {
        typ: 'akapit',
        tekst: 'Wybór kanału zmienia wycenę, bo każde dodatkowe okno to osobne podpięcie i osobne testy. Pytamy o to na pierwszej rozmowie, a nie po niej.',
      },
      {
        typ: 'akapit',
        tekst: 'Szczegóły kanałów mobilnych rozpisujemy osobno na podstronie o chatbocie na WhatsApp i Messengerze.',
      },

      /* ══ PAKIET CHATBOTY 2026-09-04, SEKCJE 5 i 6 (`.seo-przeglad/pakiety/
         chatboty.md`, linie 194-263). Ciąg dalszy partii 1-4 stojącej wyżej.
         Nic z dotychczasowej treści pliku nie zostało zmienione ani
         przestawione: doszły wyłącznie bloki, na KOŃCU `rozwiazanie.bloki`.

         GDZIE STOJĄ I DLACZEGO TU:
          - §5 („Jakie efekty dały nasze chatboty AI u klientów?") i §6 („Co
            się dzieje z moimi danymi w chatbocie AI?") -> KONIEC
            `rozwiazanie.bloki`, w tej kolejności, zaraz za §4.
          - ODSTĘPSTWO ŚWIADOME: pakiet chce ich „między `kroki` a `ramaCeny`"
            (uwaga wdrożeniowa §1). W kontrakcie `Usluga` (lib/uslugi/types.ts)
            `kroki` NIE MA pola `bloki`, więc wykonalne miejsca są dwa: koniec
            `rozwiazanie.bloki` (przed tabelą i krokami) albo `ramaCeny.bloki`.
            Wejście na POCZĄTEK `ramaCeny.bloki` rozerwałoby kartę ceny od jej
            pasa metryk i przełącznika progów, czyli złamałoby uwagę
            wdrożeniową §2 („blok cenowy musi stać razem"). Wybrany koniec
            `rozwiazanie.bloki`, tak samo jak dla §1-§4 wyżej: dzięki temu
            kolejność czytania to nadal 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8.
          - Uwaga wdrożeniowa §2 chciała §5 „wysoko". Case'y stoją teraz przed
            tabelą porównawczą i przed cennikiem, czyli wyżej niż w literze
            pakietu (który stawiał je za `kroki`).

         SKĄD LICZBY (innych nie dopisano, żadnej nie zaokrąglono):
          - 3 boty na transkrypcjach kursów (Instytut Kryptografii): sekcja
            REALIZACJE konspektu, ta sama liczba stoi już w pasie metryk wyżej,
          - 30-50 klientów miesięcznie i 200-280 wiadomości (Desant.pl):
            REALIZACJE konspektu; te same liczby na
            `/uslugi/chatboty/obsluga-klienta`,
          - około 100 zapytań od 20-50 klientów w sezonie (Przystań Jurgen):
            REALIZACJE konspektu; te same liczby na
            `/uslugi/chatboty/hotele-pensjonaty`,
          - pierwsza trójka wyników na frazę Trockenhaus: REALIZACJE konspektu;
            ten sam fakt na `/uslugi/optymalizacja/google-ai-overviews`,
          - 99-599 zł netto miesięcznie, 0 zł po przekazaniu infrastruktury,
            poprawki 350 zł netto za godzinę: decyzja właściciela 2026-08-31
            punkt 2, uwaga wdrożeniowa §7 („model utrzymania musi brzmieć
            identycznie" w sekcjach 1, 6, 8 i 9). Stawka 350 zł netto za
            godzinę wchodzi na stronę rodzica PIERWSZY RAZ; do tej pory stała
            tylko na podstronach (cennik, obsluga-klienta, sklep-internetowy,
            hotele-pensjonaty, asystent-wewnetrzny). Przy „0 zł" nie ma
            dopisku netto, bo zero netto to zero brutto.

         PIĘĆ ŚWIADOMYCH ODSTĘPSTW OD LITERY PAKIETU (zgłoszone, nie ukryte):
          1. §5, karta Instytutu Kryptografii: pakiet powtarza tam „580 maili
             tygodniowo" i metrykę draftów automatu mailowego. Te dwie liczby
             stoją na TEJ SAMEJ stronie już dwa razy (pas metryk i sekcja
             „Gdzie taki chatbot już pracuje?"), więc trzeci raz ich nie
             piszemy. Karta odsyła do opisu wyżej i zatrzymuje z pakietu to,
             czego na stronie nie było: człowieka w pętli („automat pisze,
             człowiek akceptuje").
          2. §5, ta sama karta: pakiet zapisuje metrykę draftów jako „osiem na
             dziesięć" (80%). To wartość SPRZED decyzji właściciela z
             2026-08-31, która ustala „około 85%" i zastępuje stare 75% i 80%.
             Strona mówi 85% (sekcja wyżej), więc liczby z pakietu nie
             wprowadzamy w ogóle, zamiast stawiać obok siebie dwóch wartości
             tej samej metryki.
          3. §6: pakiet pisze „Nie korzystamy z modeli OpenAI". Zdanie zawężone
             do tego, co budujemy („rozmowy z nim nie przechodzą przez systemy
             OpenAI"), dokładnie jak w partii §3 wyżej, bo konsola głosowa na
             tej stronie ma awaryjne zejście na OpenAI Realtime
             (components/agent/agent-console-init.ts). Zakaz z uwagi
             wdrożeniowej §9 zachowany: wszędzie Anthropic i Claude.
          4. §6 zamówione jako „akapity". Cztery ostatnie akapity (wybór trybu
             pracy, dwa warianty utrzymania, własność bazy wiedzy, umowa
             powierzenia) zeszły do bloku `sekcja`, bo jedenaście akapitów pod
             rząd to ściana tekstu, z którą ten plik walczy od rundy struktury
             2026-08-19. Treść 1:1, zero zmian w faktach, semantyka bez zmian
             (nagłówek to H3, akapity to <p>, punkty to <ul><li>).
          5. Kwoty w §6 stoją poza sekcją ceny. Konwencja „kwoty tylko w sekcji
             ceny" pochodzi z pakietu GEO, `chatboty.md` jej nie ma, a uwaga
             wdrożeniowa §7 wprost wymienia §6 jako jedno z czterech miejsc,
             w których model utrzymania MUSI stać z kwotami. Ten sam ruch co
             przy §1 i §3 wyżej. ══ */

      {
        typ: 'naglowek',
        tekst: 'Jakie efekty dały nasze chatboty AI u klientów?',
        ikona: 'gwiazda-kompas',
        chip: 'REALIZACJE',
        overline: 'CZTERY FIRMY · Z NAZWY I Z LICZBAMI',
      },
      {
        typ: 'akapit',
        tekst: 'Nie mamy tysięcy wdrożeń i nie będziemy udawać, że mamy. Mamy konkretne firmy, które zgodziły się wystąpić z nazwy i z liczbami.',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Instytut Kryptografii: bot, który mówi, w której minucie nagrania to było',
            akapity: [
              'Zbudowaliśmy trzy boty z bazą wiedzy zrobioną z transkrypcji kursów. Kiedy kursant pyta o zagadnienie, bot nie streszcza z pamięci. Wskazuje dokładne miejsce w nagraniu, w którym pada odpowiedź.',
              'To jest test, którego nie przechodzi zwykły bot: potrafi pokazać źródło, zamiast brzmieć wiarygodnie.',
            ],
            punkty: [
              'Osobno pracuje tam automat do skrzynki biura obsługi, opisany wyżej na tej stronie.',
              'Decyzję o wysłaniu podejmuje człowiek. Automat pisze, człowiek akceptuje.',
            ],
          },
          {
            naglowek: 'Desant.pl: rozmowy, których nikt nie musi już zaczynać ręcznie',
            akapity: [
              'Chatbot obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości. To ruch, który wcześniej lądował w skrzynce i czekał na wolną chwilę człowieka.',
              'Taki wolumen wygląda niepozornie, dopóki nie policzysz, ile z tych wiadomości to było to samo pytanie.',
            ],
          },
          {
            naglowek: 'Przystań Jurgen: sezon, w którym pytania nie czekają do poniedziałku',
            akapity: [
              'Zrobiliśmy stronę WWW i chatbota. W sezonie bot obsługuje około 100 zapytań od 20-50 klientów, czyli dokładnie wtedy, gdy właściciel nie ma czasu odpisywać.',
              'Ruch przychodzi falą, a stracone zapytanie z lipca nie wraca we wrześniu.',
            ],
          },
          {
            naglowek: 'Trockenhaus: strona z botem, którą w końcu widać w Google',
            akapity: [
              'Dla niemieckiej firmy od osuszania piwnic zrobiliśmy stronę WWW i chatbota. Na frazę Trockenhaus firma przesunęła się z pozycji, której nikt nie widział, do pierwszej trójki wyników.',
              'Bot ma sens wtedy, gdy ktoś wchodzi na stronę. Dlatego ruszyliśmy obie rzeczy naraz.',
            ],
          },
        ],
      },

      {
        typ: 'naglowek',
        tekst: 'Co się dzieje z moimi danymi w chatbocie AI?',
        ikona: 'tarcza-serce',
        chip: 'DANE',
        overline: 'BAZA WIEDZY · DOSTAWCA MODELU · WŁASNOŚĆ',
      },
      {
        typ: 'akapit',
        tekst: 'W bazie wiedzy bota ląduje wyłącznie to, co sam nam dasz. Nie zaciągamy Twojej poczty, dysku ani systemów bez Twojej zgody i bez ustalonego zakresu.',
      },
      {
        typ: 'akapit',
        tekst: 'To pytanie pada na prawie każdej pierwszej rozmowie i jest ważniejsze od ceny. Odpowiadamy na nie wprost, bo wymijająca odpowiedź kosztuje tu więcej niż drogi cennik.',
      },
      {
        typ: 'akapit',
        tekst: 'Przed wgraniem materiałów mówimy, co powinno z nich wypaść. Dane osobowe klientów, wewnętrzne marże i dokumenty kadrowe nie mają czego szukać w bocie, który rozmawia z rynkiem.',
      },
      {
        typ: 'akapit',
        tekst: 'Model językowy jest usługą zewnętrzną i tego nie da się obejść. Treść rozmowy trafia do dostawcy modelu po to, żeby powstała odpowiedź. Nie trafia tam nic poza tym, co sam nam dasz.',
      },
      {
        typ: 'akapit',
        tekst: 'Twojego bota budujemy na modelu Claude od Anthropic, więc rozmowy z nim nie przechodzą przez systemy OpenAI.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Gdzie stoi infrastruktura Twojego bota?',
        wariant: 'top',
        chip: 'TRYB PRACY',
        akapity: [
          'Po Twojej stronie zostaje wybór trybu pracy i to jest realna decyzja, nie formalność.',
          'Możemy trzymać infrastrukturę u nas. Wtedy płacisz utrzymanie 99-599 zł netto miesięcznie i nie zajmujesz się niczym.',
          'Możemy też przekazać całą infrastrukturę Tobie. Wtedy utrzymanie po naszej stronie wynosi 0 zł miesięcznie, a późniejsze poprawki rozliczamy po 350 zł netto za godzinę.',
          'Ten drugi wariant jest naszą świadomą decyzją. Z abonamentu u nas można wyjść i nie stracić przy tym bota.',
        ],
        punkty: [
          'Właścicielem bazy wiedzy jesteś Ty w obu wariantach. Jeśli kończymy współpracę, zabierasz swoje dokumenty i konfigurację ze sobą.',
          'Umowę powierzenia przetwarzania danych podpisujemy przed startem, a nie po nim.',
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Chatbot a ręczna obsługa pytań klientów',
    naglowekBez: 'Ręczna obsługa',
    naglowekZNami: 'Chatbot AI od SimpleFast.ai',
    wiersze: [
      { cecha: 'Dostępność', bez: 'W godzinach pracy', zNami: '24/7, też nocą i w weekend' },
      { cecha: 'Czas reakcji', bez: 'Gdy ktoś ma chwilę', zNami: 'Natychmiast' },
      { cecha: 'Te same pytania', bez: 'Odpowiadasz w kółko', zNami: 'Bot bierze je na siebie' },
      { cecha: 'Leady wieczorem', bez: 'Często przepadają', zNami: 'Bot zbiera kontakt od razu' },
      { cecha: 'Skok zapytań', bez: 'Kolejka i stres', zNami: 'Ten sam bot, bez kolejki' },
      { cecha: 'Rozwój', bez: 'Zostaje obsługą czatu', zNami: 'Rośnie do Agenta, który działa' },
      /* 2026-08-19 (audyt §9 etap 1 pkt 1): dwa DOŁOŻONE wiersze wnoszą do
         tabeli dolny próg ceny i czas wdrożenia w dniach roboczych. Zero
         usuniętych wierszy, zero zmian w istniejących. Pełna drabina trzech
         progów nie mieści się w kontrakcie `tabelaPorownawcza` (trzy kolumny:
         cecha / bez / z nami) i stoi w `ramaCeny.tresc` oraz w FAQ.
         Uwaga na bramkę hero: `ServiceHero.kafleStatystyk` szuka PIERWSZEGO
         wiersza z „24/7" w kolumnie zNami (wiersz „Dostępność"), więc
         dokładanie wierszy na końcu jej nie rusza. */
      { cecha: 'Koszt startu', bez: 'Twój czas i czas zespołu', zNami: 'Od 1790 zł netto jednorazowo' },
      { cecha: 'Czas wdrożenia', bez: 'Robota zostaje z Tobą na stałe', zNami: 'Od 1 do 10 dni roboczych' },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy chatbota krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Patrzymy, o co pytają Twoi klienci najczęściej i gdzie tracisz leady. Mówimy, czy chatbot ma sens i co konkretnie ma umieć.',
      },
      {
        tytul: 'Uczenie i wdrożenie',
        opis:
          'Karmimy bota Twoją wiedzą: ofertą, cennikiem, pytaniami. Stawiamy go na Twojej stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie. Testujemy na żywo, ustawiasz ton i granice.',
      },
      {
        tytul: 'Utrzymanie i rozwój',
        opis:
          'Patrzymy, o co pytają klienci, i dokładamy odpowiedzi. Kiedy zechcesz, rozwijamy chatbota w Agenta: umawianie, zapisy, integracje.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje wdrożenie chatbota?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Chatbot AI dla firmy kosztuje od 1790 zł netto za próg prosty do 15000 zł netto za wdrożenie z integracjami. Każdy próg ma swój czas: od 1 do 2 dni roboczych przy prostym bocie do 10 dni roboczych przy pełnych integracjach.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1790 zł',
            opis: 'chatbot prosty, netto',
            zrodlo: 'próg 1 z tabeli niżej',
            ton: 'cyan',
          },
          {
            wartosc: '1-2 dni',
            opis: 'wdrożenie progu prostego',
            zrodlo: 'od przekazania materiałów',
            ton: 'green',
          },
          {
            wartosc: '99-599 zł',
            opis: 'utrzymanie miesięcznie, netto',
            zrodlo: 'albo 0 zł po przekazaniu',
            ton: 'amber',
          },
          {
            wartosc: '2 rundy',
            opis: 'poprawek w cenie wdrożenia',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Który próg pasuje do Twojej firmy?',
        ikona: 'lupa-wykres',
        chip: 'WYBIERZ PRÓG',
        overline: 'CENNIK · TRZY PROGI',
      },
      {
        typ: 'przelacznik',
        grupa: 'chatboty-progi',
        opcje: [
          {
            numer: 'PRÓG 1',
            tytul: 'Prosty',
            podtytul: '1790 zł netto',
            naglowek: 'Chatbot prosty: 1790 zł netto, 1-2 dni robocze',
            akapity: [
              'Bot na stronę www z bazą wiedzy, którą podpinamy my. Odpowiada na powtarzalne pytania, zbiera leady i odsyła klienta we właściwe miejsce na stronie.',
            ],
            punkty: [
              'Baza wiedzy z Twoich materiałów, podpięta przez nas.',
              'Zbieranie leadów i kontaktu do klienta.',
              'Odsyłanie do właściwych miejsc na stronie.',
            ],
          },
          {
            numer: 'PRÓG 2',
            tytul: 'Średni',
            podtytul: '3000-6000 zł netto',
            naglowek: 'Chatbot średni: 3000-6000 zł netto, 3-4 dni robocze',
            akapity: [
              'To, co w progu prostym, plus rozbudowana baza wiedzy i dodatkowe funkcje dopasowane do tego, o co realnie pytają Twoi klienci.',
            ],
            punkty: [
              'Wszystko z progu prostego.',
              'Rozbudowana baza wiedzy.',
              'Dodatkowe funkcje pod Twój proces.',
            ],
          },
          {
            numer: 'PRÓG 3',
            tytul: 'Duży',
            podtytul: '8000-15000 zł netto',
            naglowek: 'Chatbot duży: 8000-15000 zł netto, 5-10 dni roboczych',
            akapity: [
              'Pełny zakres z integracjami. Cena zależy od liczby elementów do zbudowania i od tego, z iloma systemami bot ma się połączyć.',
            ],
            punkty: [
              'Pełne integracje z Twoimi systemami.',
              'Zakres i termin ustalamy na diagnozie.',
              'Dwie rundy poprawek w cenie, jak w każdym progu.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        /* 2026-09-04 (antykanibalizacja): zdjęta czwarta kolumna „Co dostajesz".
           Stała tu w wersji prawie identycznej z czterokolumnową tabelą progów
           na /uslugi/chatboty/cennik (kontrola: 9 z 12 wspólnych komórek).
           Informacja nie znika: to samo niosą `punkty` przełącznika progów
           bezpośrednio nad tabelą, a pełna wersja czterokolumnowa zostaje na
           podstronie cennika. Kwoty i czasy zostają, bo to fakty, które muszą
           brzmieć tak samo w każdym miejscu serwisu. */
        naglowki: ['Próg', 'Cena netto', 'Czas wdrożenia'],
        wiersze: [
          ['Prosty', '1790 zł', '1-2 dni robocze'],
          ['Średni', '3000-6000 zł', '3-4 dni robocze'],
          ['Duży z integracjami', '8000-15000 zł', '5-10 dni roboczych'],
        ],
        wKarcie: true,
        podpis: 'Tak wyceniamy chatboty AI dla firm: wszystkie kwoty netto. Czas liczymy od przekazania kompletu materiałów, czyli bazy wiedzy, treści i dostępów, nie od podpisania umowy. Co dokładnie dostajesz na każdym progu, pokazuje przełącznik nad tabelą i podstrona z cennikiem chatbota.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Ile rund poprawek jest w cenie wdrożenia?',
            akapity: [
              'Dwie, i obie masz w cenie wdrożenia, nie jako płatny dodatek. Harmonogram wygląda tak: pierwszy tydzień testujesz bota u siebie i spisujesz uwagi, my je wdrażamy. Drugi tydzień testów przynosi drugą porcję poprawek, a na końcu jest odbiór.',
              'Co liczy się jako poprawka? Wszystko, co miało działać i nie działa: zła odpowiedź, zgubiony kontakt, odesłanie w niewłaściwe miejsce na stronie. Takie rzeczy naprawiamy zawsze, także po odbiorze.',
              'Rozbudowa to co innego: nowa funkcja, której nie było w pierwszej rozmowie. Ją wyceniamy osobno.',
            ],
            punkty: [
              'Czas liczymy od przekazania kompletu materiałów.',
              'Dwie rundy poprawek w cenie wdrożenia.',
            ],
          },
          {
            naglowek: 'Ile kosztuje utrzymanie chatbota po wdrożeniu?',
            akapity: [
              'Utrzymanie rozliczasz na jeden z dwóch sposobów i zawsze pokazujemy oba. Pierwszy: przekazujemy Ci całą infrastrukturę, abonament wynosi wtedy 0 zł miesięcznie, a późniejsze poprawki rozliczamy po 350 zł netto za godzinę i tylko wtedy, gdy je zamówisz. Drugi: projekt zostaje u nas za 99-599 zł netto miesięcznie, a my pilnujemy bota i dokładamy odpowiedzi na pytania, które klienci faktycznie zadają.',
              'Dla porównania: utrzymanie voicebota kosztuje 299-1500 zł netto miesięcznie, bo po stronie głosowej dochodzi telefonia, minuty rozmów i scenariusze głosowe. Utrzymanie chatbota zaczyna się od 99 zł netto, bo pilnowania jest po prostu mniej.',
            ],
            punkty: [
              'Przekazujemy infrastrukturę: 0 zł miesięcznie, poprawki 350 zł netto za godzinę.',
              'Projekt zostaje u nas: 99-599 zł netto miesięcznie.',
            ],
          },
          {
            naglowek: 'Czym chatbot za 1790 zł netto różni się od AI Start za 1990 zł?',
            akapity: [
              'Żeby nie pomylić produktów: chatbot dla firmy za 1790 zł netto odpowiada Twoim klientom na stronie, a AI Start za 1990 zł to pierwsza automatyzacja jednego procesu wewnątrz firmy, na próbę.',
              'To dwa różne wejścia w AI i wybierasz jedno z nich zależnie od tego, gdzie dziś tracisz najwięcej czasu: na zewnątrz, przy kliencie, czy wewnątrz, przy powtarzalnej robocie zespołu.',
            ],
            punkty: [
              'Chatbot: rozmowa z klientem na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie.',
              'AI Start: jeden proces wewnątrz firmy, mały i odwracalny krok.',
            ],
          },
        ],
      },

      /* ══ PAKIET CHATBOTY 2026-09-04, SEKCJE 7 i 8 (`.seo-przeglad/pakiety/
         chatboty.md`, linie 266-342). Nic z dotychczasowej treści `ramaCeny`
         nie zostało zmienione ani przestawione: doszły wyłącznie bloki, na
         KOŃCU `ramaCeny.bloki`, za istniejącą siatką trzech kart.

         GDZIE STOJĄ I DLACZEGO TU:
          - §8 („Za co dokładnie płacę i co zapłacę co miesiąc?") pakiet stawia
            „po `ramaCeny`, przed `powiazane`". `ramaCeny.bloki` renderują się
            POD kartą ceny w tej samej sekcji (components/uslugi/RamaCeny.tsx),
            a `powiazane` idzie osobnym komponentem niżej, więc koniec
            `ramaCeny.bloki` to dokładnie ten slot.
          - §7 („Ile kosztuje mnie każdy miesiąc bez chatbota AI?") pakiet
            stawia „bezpośrednio przed `ramaCeny`". ODSTĘPSTWO ŚWIADOME: żeby
            rachunek strat stanął przed kwotą, musiałby wejść na POCZĄTEK
            `ramaCeny.bloki`, czyli między kartę ceny a pas metryk i przełącznik
            progów. To rozrywa blok cenowy, przed czym ostrzega uwaga
            wdrożeniowa §2. Sekcja stoi więc tuż przed §8, co zachowuje
            kolejność czytania 5 -> 6 -> 7 -> 8 i trzyma cały rachunek (progi,
            koszt braku bota, pozycje faktury) w jednym miejscu.

         SKĄD LICZBY (innych nie dopisano, żadnej nie zaokrąglono):
          - §7: jedyne liczby od nas to 1790 zł netto wdrożenia i 99 zł netto
            najniższego utrzymania, obie zgodne co do złotówki z `tresc`,
            `minPrice` i tabelą progów wyżej. Cztery liczby wejściowe podaje
            czytelnik, a wszystkie cztery wzory są WIDOCZNE na stronie (uwaga
            wdrożeniowa §3),
          - §8: 1790 zł, 3000-6000 zł, 8000-15000 zł, 99-599 zł miesięcznie,
            0 zł po przekazaniu infrastruktury, poprawki 350 zł netto za
            godzinę, dwie rundy poprawek w cenie, nowe funkcje spoza pierwszej
            rozmowy jako osobna wycena: konspekt plus decyzja właściciela
            2026-08-31 punkt 2. Wszystkie stoją już na tej stronie, tabela je
            tylko zbiera w jeden rachunek z kolumną „Kiedy płacisz".

         TRZY ŚWIADOME ODSTĘPSTWA OD LITERY PAKIETU (zgłoszone, nie ukryte):
          1. §7 zamówione jako KALKULATOR interaktywny z czterema pustymi
             polami. Kontrakt bloków (lib/blog/types.ts) nie ma typu z polami
             formularza, a zakres tej partii to dokładanie bloków, nie nowe
             komponenty. Sekcja jest więc statyczna: cztery pytania jako lista,
             cztery wzory jako tabela (i tak miały być widoczne, uwaga
             wdrożeniowa §3), dwa warianty wyniku jako dwa zdania warunkowe.
             Zdanie pakietu „Wpisz cztery swoje liczby. Wynik policzy się sam."
             NIE zostało przepisane, bo bez pól byłoby obietnicą bez pokrycia.
             Sekcja odsyła zamiast tego do realnego kalkulatora procesu w
             Narzędziach. DO ZBUDOWANIA W OSOBNEJ PARTII: komponent kalkulatora
             (cztery pola, zero `defaultValue`, zero przykładowej kwoty w
             `placeholder`) plus wariant bloku, który go osadza.
          2. §7, dwa warianty wyniku: pakiet zapisuje je jako teksty
             wyświetlane warunkowo pod wynikiem. Bez kalkulatora stoją jako
             dwa zdania z warunkiem wypowiedzianym wprost („Jeśli koszt pracy
             wychodzi wyższy niż 99 zł..."). Fakty 1:1, w tym uczciwe zdanie
             o tym, że przy małym ruchu bot się nie zwróci.
          3. Zapis kwot bez spacji („8000-15000 zł", nie „8000-15 000 zł"), jak
             w kapsule, w `tresc`, w tabeli progów i w FAQ tej strony. Jedna
             strona, jeden zapis liczby. ══ */

      {
        typ: 'naglowek',
        tekst: 'Ile kosztuje mnie każdy miesiąc bez chatbota AI?',
        ikona: 'wykres-strzalka',
        chip: 'RACHUNEK STRAT',
        overline: 'CZTERY TWOJE LICZBY · WZORY NA WIERZCHU',
      },
      {
        typ: 'akapit',
        tekst: 'Brak chatbota nie ma ceny na fakturze i dlatego wygląda na darmowy. Kosztuje jednak dwa razy: godzinami Twoich ludzi i zapytaniami, które nie doczekały odpowiedzi.',
      },
      {
        typ: 'akapit',
        tekst: 'Nie podamy Ci tu statystyk z rynku ani przykładowej stawki godzinowej, bo nie znamy Twojej firmy. Zgadnięta liczba w takim rachunku to nie dowód, tylko dekoracja.',
      },
      {
        typ: 'akapit',
        tekst: 'Wypisz cztery swoje liczby i policz to sam. Wzory podajemy niżej, żebyś widział, skąd bierze się wynik, a nie tylko sam wynik.',
      },
      {
        typ: 'lista',
        punkty: [
          'Ile powtarzalnych pytań dostajesz dziennie?',
          'Ile minut zajmuje jedna odpowiedź?',
          'Ile dni w miesiącu odpowiadacie na te pytania?',
          'Ile kosztuje Cię godzina pracy osoby, która odpisuje, w złotych netto?',
        ],
      },
      {
        typ: 'tabela',
        naglowki: ['Co liczysz', 'Jak to policzyć'],
        wiersze: [
          [
            'Godziny miesięcznie',
            'pytania dziennie razy minuty na odpowiedź razy dni w miesiącu, podzielone przez 60',
          ],
          ['Koszt pracy miesięcznie', 'godziny miesięcznie razy Twoja stawka godzinowa'],
          [
            'Oszczędność miesięczna po wdrożeniu',
            'koszt pracy miesięcznie minus 99 zł netto, czyli minus utrzymanie w najniższym wariancie',
          ],
          [
            'Po ilu miesiącach zwraca się wdrożenie',
            '1790 zł netto podzielone przez oszczędność miesięczną, zaokrąglone w górę',
          ],
        ],
        wKarcie: true,
        podpis: 'Wzory rachunku strat, wszystkie cztery jawne. Liczby wejściowe podajesz Ty. Od nas są tylko dwie: 1790 zł netto wdrożenia i 99 zł netto najniższego utrzymania miesięcznie.',
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli koszt pracy wychodzi wyższy niż 99 zł netto, tyle właśnie kosztuje Cię miesiąc bez bota, licząc sam czas pracy. Wdrożenie to 1790 zł netto, utrzymanie od 99 zł netto miesięcznie, a tokeny modelu dochodzą osobno po Twojej stronie.',
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli koszt pracy wychodzi 99 zł netto albo mniej, bot się u Ciebie nie zwróci i powiemy Ci to samo na rozmowie. Wróć do tematu, gdy pytań będzie więcej.',
      },
      {
        typ: 'akapit',
        tekst: 'Ten rachunek pokazuje tylko czas pracy. Nie liczy klienta, który napisał w sobotę o 21:00, nie dostał odpowiedzi i w poniedziałek pisał już do kogoś innego.',
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli wolisz policzyć cały proces, a nie same pytania, mamy do tego osobny kalkulator w Narzędziach: „Czy warto zautomatyzować ten proces?". Koszt godziny podajesz tam Ty.',
      },

      {
        typ: 'naglowek',
        tekst: 'Za co dokładnie płacę i co zapłacę co miesiąc?',
        ikona: 'notes-pioro',
        chip: 'RACHUNEK',
        overline: 'OSIEM POZYCJI · PRZY KTÓREJ KIEDY PŁACISZ',
      },
      {
        typ: 'akapit',
        tekst: 'Przy chatbotach zawsze są trzy osobne pozycje, nie jedna. Kto pokazuje tylko pierwszą, ten dwie kolejne wyśle Ci później.',
      },
      {
        typ: 'tabela',
        naglowki: ['Pozycja', 'Co to konkretnie jest', 'Kwota netto', 'Kiedy płacisz'],
        wiersze: [
          [
            'Stworzenie: bot na stronę z bazą wiedzy i zbieraniem leadów',
            'Budowa, wgranie Twoich materiałów, testy, publikacja',
            '1790 zł',
            'Jednorazowo, przy wdrożeniu',
          ],
          [
            'Stworzenie: bot średni',
            'Większa baza wiedzy, więcej ścieżek rozmowy, przekazanie do człowieka',
            '3000-6000 zł',
            'Jednorazowo, przy wdrożeniu',
          ],
          [
            'Stworzenie: bot z integracjami',
            'Połączenie z Twoimi systemami, praca w obie strony',
            '8000-15000 zł',
            'Jednorazowo, przy wdrożeniu',
          ],
          [
            'Utrzymanie, gdy infrastruktura stoi u nas',
            'Hosting, aktualizacje bazy wiedzy, reagowanie, gdy coś przestaje działać',
            '99-599 zł miesięcznie',
            'Co miesiąc, od startu',
          ],
          [
            'Utrzymanie, gdy przekazujemy infrastrukturę Tobie',
            'Bot stoi u Ciebie, my wchodzimy tylko na Twoje zlecenie',
            '0 zł miesięcznie, poprawki 350 zł netto za godzinę',
            'Tylko wtedy, gdy zamówisz poprawkę',
          ],
          [
            'Zużycie tokenów',
            'Opłata za pracę modelu językowego, rośnie i maleje razem z liczbą rozmów',
            'Po Twojej stronie, płacisz dostawcy wprost',
            'Co miesiąc, według faktycznego zużycia',
          ],
          [
            'Dwie rundy poprawek',
            'Tydzień testów u Ciebie, poprawki, drugi tydzień, poprawki, odbiór',
            '0 zł, w cenie wdrożenia',
            'Nie płacisz',
          ],
          [
            'Nowe funkcje spoza pierwszej rozmowy',
            'Rzeczy, których nie było w ustaleniach, na przykład kolejny kanał albo kolejna integracja',
            'Osobna wycena',
            'Tylko jeśli je zamówisz',
          ],
        ],
        wKarcie: true,
        podpis: 'Pełny rachunek za chatbota AI: co płacisz raz, co co miesiąc i co według zużycia. Wszystkie nasze kwoty są netto, a przy 0 zł nie ma dopisku, bo zero netto to zero brutto.',
      },
      {
        typ: 'akapit',
        tekst: 'Widełki w kwotach nie są zasłoną dymną. Bot średni za 3000 zł netto i bot średni za 6000 zł netto różnią się objętością bazy wiedzy i liczbą ścieżek rozmowy, a to widać już na pierwszej rozmowie.',
      },
      {
        typ: 'akapit',
        tekst: 'Utrzymanie za 99 zł netto to bot, który po prostu ma działać. Utrzymanie za 599 zł netto to bot z regularnie aktualizowaną bazą wiedzy i większym ruchem.',
      },
      {
        typ: 'akapit',
        tekst: 'Tokeny są jedyną pozycją, której nie kontrolujemy, bo płacisz za nie u dostawcy modelu według zużycia. Po pierwszej fakturze znasz już swój realny rząd wielkości.',
      },

      /* ══ PAKIET CHATBOTY 2026-09-04, SEKCJE 9, 10 i 11 (`.seo-przeglad/
         pakiety/chatboty.md`, linie 345-465). Bloki dołożone na KOŃCU
         `ramaCeny.bloki`, za sekcjami 7 i 8. Nic z dotychczasowej treści nie
         zostało przestawione ani usunięte poza zleconą naprawą kanibalizacji,
         opisaną osobno przy każdym poprawionym miejscu.

         GDZIE STOJĄ I DLACZEGO TU:
          - §9 („Taniej wyjdzie abonament czy chatbot na własność?") i §10
            („Kiedy chatbot się u Ciebie nie opłaci?") pakiet stawia po sekcji
            8, „nadal przed `powiazane`". `ramaCeny.bloki` renderują się pod
            kartą ceny (components/uslugi/RamaCeny.tsx), a `PodstronyPowiazane`
            idzie osobnym komponentem niżej (app/uslugi/[usluga]/page.tsx),
            więc koniec `ramaCeny.bloki` to dokładnie ten slot. Cały blok
            cenowy zostaje w jednym kawałku, o co prosi uwaga wdrożeniowa §2.
          - §11 pakiet stawia „po `faq`, bezpośrednio przed `cta`".
            ODSTĘPSTWO WYMUSZONE KONTRAKTEM, nie wyborem: `Usluga.faq` i
            `Usluga.cta` (lib/uslugi/types.ts) nie mają pola `bloki`, a
            szablon renderuje między nimi wyłącznie `ServiceFAQ` i
            `ServiceCTA`. Jedyny istniejący slot na bloki przed CTA to koniec
            `ramaCeny.bloki` i tam sekcja stoi. DO ZBUDOWANIA W OSOBNEJ
            PARTII, jeśli miejsce ma być dosłowne: pole `blokiPrzedCta?: Blok[]`
            w kontrakcie usługi plus jeden render w szablonie.

         ANTYKANIBALIZACJA WZGLĘDEM /uslugi/chatboty/cennik (kontrola zmierzyła
         podobieństwo 1,0, więc nowe sekcje NIE mogły dołożyć kolejnych kopii):
          - §9 pakietu niesie tabelę „po 12 / 24 / 36 miesiącach" dla wariantów
            99 zł, 599 zł i 0 zł. Ta sama tabela, co do złotówki i co do
            układu kolumn, stoi już na podstronie cennika
            (lib/uslugi/podstrony/chatboty-cennik.ts, blok `tabela` z podpisem
            „Rachunek na trzy lata"). Rodzic NIE dostaje jej kopii: dostaje sam
            wniosek, odesłanie do cennika i treść własną, której na podstronie
            nie ma, czyli pięć pytań do platformy abonamentowej.
          - §10 pakietu ma nagłówek „Kiedy chatbot się u Ciebie nie opłaci?",
            czyli 1:1 nagłówek bloku `sekcja` na podstronie cennika. Rodzic
            dostaje nagłówek własny i pięć sytuacji rozpisanych szerzej;
            podstrona ma dwie i ogląda je od strony ceny. Dwa punkty wspólne
            (mały ruch, wiedza w głowach) są tu napisane od nowa, nie przeklejone.

         SKĄD LICZBY (innych nie dopisano, żadnej nie zaokrąglono):
          - 1790 zł netto, 8000-15000 zł netto, 99-599 zł netto miesięcznie,
            0 zł miesięcznie po przekazaniu infrastruktury, poprawki 350 zł
            netto za godzinę, 1-2 dni robocze: konspekt plus decyzja
            właściciela z 2026-08-31 punkt 2. Wszystkie stoją już wyżej na tej
            stronie, sekcje tylko je składają w rachunek.
          - Sprint Diagnostyczny 1490 zł netto, odliczany od ceny wdrożenia:
            pakiet §10, ta sama kwota co na /uslugi/chatboty/cennik.
          - Landing 1590 zł netto / 1 dzień roboczy i strona biznesowa 2900 zł
            netto / 2-4 dni robocze: lib/uslugi/strony-www.ts (`minPrice` 1590
            i `ramaCeny.tresc`), czyli kwoty już opublikowane na stronie usługi.
          - AI Start 1990 zł netto: lib/uslugi/automatyzacje.ts; na tej stronie
            stoi już wyżej, w siatce trzech kart sekcji ceny.
          - Instytut Kryptografii, Desant.pl i Trockenhaus: REALIZACJE oraz
            treść tej strony. Rynek niemiecki: Trockenhaus
            (lib/uslugi/optymalizacja.ts, „osuszanie piwnic i remonty, Niemcy").

         DWA ŚWIADOME ODSTĘPSTWA OD LITERY PAKIETU (zgłoszone, nie ukryte):
          1. §11 pakiet zapowiada, że po przygotowaniu czterech rzeczy
             „podamy kwotę i termin od razu" na pierwszej rozmowie. Tego nie
             wolno obiecać: ustalenie właściciela z 2026-08-31 mówi, że
             bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb, a rozplanowanie i
             oferta to Sprint Diagnostyczny. Sekcja obiecuje więc dokładnie
             tyle, ile wolno: ustalenie zakresu i wskazanie progu.
          2. §11 pakietu domyka się opisem odbioru („tydzień testów, poprawki,
             drugi tydzień"). Ten sam opis stoi już na tej stronie dwa razy: w
             karcie „Ile rund poprawek jest w cenie wdrożenia?" i w FAQ o tej
             samej nazwie. Trzeciej kopii nie ma, została jedna informacja,
             której tam nie było: kto po stronie klienta odbiera wdrożenie. ══ */

      {
        typ: 'naglowek',
        tekst: 'Taniej wyjdzie abonament czy chatbot na własność?',
        ikona: 'pudelko-3d',
        chip: 'DWIE DROGI',
        overline: 'ABONAMENT · WŁASNOŚĆ · RACHUNEK NA TRZY LATA',
      },
      {
        typ: 'akapit',
        tekst: 'Gotowa platforma w abonamencie wygląda taniej pierwszego dnia i to jest jej cała przewaga. Rachunek trzeba zrobić na trzy lata, bo tyle zwykle żyje bot, który działa.',
      },
      {
        typ: 'akapit',
        tekst: 'U nas nie musisz wybierać między abonamentem a własnością, bo obie drogi masz u jednego dostawcy. Infrastruktura zostaje u nas za 99-599 zł netto miesięcznie albo przekazujemy Ci ją w całości i wtedy płacisz 0 zł miesięcznie, a późniejsze poprawki rozliczamy po 350 zł netto za godzinę.',
      },
      {
        typ: 'akapit',
        tekst: 'Wdrożenie kosztuje tyle samo w każdym wariancie, więc całą różnicę robi opłata miesięczna. Pełny rachunek po 12, 24 i 36 miesiącach dla wszystkich trzech wariantów rozpisaliśmy na podstronie z cennikiem chatbota, razem ze wzorem, według którego go liczymy.',
      },
      {
        typ: 'akapit',
        tekst: 'Każdy wariant startuje z tego samego bota i z tego samego czasu wdrożenia. Różni je to, kto trzyma serwery i kto reaguje, gdy coś przestanie działać. Utrzymanie za 599 zł netto nie daje lepszego bota, tylko bota pilnowanego przy większym ruchu i przy bazie wiedzy, która zmienia się co tydzień.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Zanim porównasz nas z platformą w abonamencie, sprawdź u niej pięć rzeczy',
        wariant: 'top',
        chip: 'LISTA KONTROLNA',
        akapity: [
          'Nie podamy Ci tu cen cudzych platform, bo zmieniają się szybciej niż nasza strona. Wolimy dać Ci pięć pytań, które zadasz im sam i sprawdzisz odpowiedzi na własnych liczbach.',
        ],
        punkty: [
          'Ile kosztuje miesiąc przy Twojej liczbie rozmów, a nie w pakiecie startowym.',
          'Czy cena rośnie razem z ruchem i o ile.',
          'Co zabierasz ze sobą, gdy odchodzisz: bazę wiedzy, konfigurację, historię rozmów.',
          'Czy możesz zmienić zachowanie bota poza tym, co przewidział producent w panelu.',
          'Ile zapłacisz za wpięcie bota w Twój system, jeśli w ogóle się da.',
        ],
        stopka: [
          'Abonament ma sens, jeśli chcesz prostego bota na tydzień, skonfigurujesz go sam i nie zależy Ci na tym, czyja jest baza wiedzy.',
          'Własny bot ma sens, jeśli baza wiedzy jest Twoim aktywem, a bot ma pracować na Twoich zasadach dłużej niż rok.',
        ],
      },

      {
        typ: 'naglowek',
        tekst: 'Kiedy odradzamy chatbota i co proponujemy zamiast?',
        ikona: 'tarcza-serce',
        chip: 'GRANICE USŁUGI',
        overline: 'PIĘĆ SYTUACJI · MÓWIMY TO PRZED FAKTURĄ',
      },
      {
        typ: 'akapit',
        tekst: 'Sprzedajemy chatboty, więc powinniśmy teraz napisać, że każda firma ich potrzebuje. Nie potrzebuje.',
      },
      {
        typ: 'akapit',
        tekst: 'Poniżej pięć sytuacji, w których odradzamy zakup, i to, co proponujemy zamiast niego.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Dostajesz kilka zapytań w tygodniu',
            akapity: [
              'Bot zdejmuje z Ciebie powtarzalność. Jeśli tej powtarzalności jeszcze nie ma, to nie ma czego zdejmować, a osobista odpowiedź działa na Twoją korzyść i nic Cię nie kosztuje.',
              'Wróć do tematu wtedy, gdy te same pytania zaczną wracać co tydzień.',
            ],
          },
          {
            naglowek: 'Wiedza siedzi w głowach, nie w dokumentach',
            akapity: [
              'Bot odpowiada wyłącznie z materiałów, które od Ciebie dostanie, i nie wymyśli procedury, której nikt nigdy nie spisał.',
              'Wtedy nie zaczynamy od budowy bota, tylko od Sprintu Diagnostycznego za 1490 zł netto, a tę kwotę odliczamy w całości od ceny późniejszego wdrożenia.',
            ],
          },
          {
            naglowek: 'Każda sprawa wymaga decyzji człowieka',
            akapity: [
              'Bot ma wtedy jedno zadanie: zebrać kontekst i oddać rozmowę Twojemu człowiekowi z kompletem informacji, zamiast udawać, że umie ją domknąć.',
              'Jeśli ktoś obiecuje Ci, że bot poprowadzi taką sprawę do końca sam, sprzedaje Ci kłopot na później.',
            ],
          },
          {
            naglowek: 'Chcesz bota dlatego, że konkurencja go ma',
            akapity: [
              'To najdroższy powód zakupu, jaki znamy. Bot bez konkretnego pytania, które ma przejmować, po miesiącu stoi na stronie i nikt do niego nie pisze.',
              'Zacznij od wskazania pytania, które wraca najczęściej. Jeśli takiego nie ma, nie ma też zadania dla bota.',
            ],
          },
          {
            naglowek: 'Twoja strona nie ma ruchu',
            akapity: [
              'Bot rozmawia z tymi, którzy weszli. Jeśli nikt nie wchodzi, najpierw robi się widoczność, potem bota.',
              'U Trockenhaus zrobiliśmy jedno i drugie naraz i dopiero to zadziałało. Stronę biznesową robimy za 2900 zł netto w 2-4 dni robocze, prosty landing za 1590 zł netto w jeden dzień roboczy.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli chcesz odciążyć proces wewnątrz firmy, a nie rozmowę z klientem, to nie jest zadanie dla chatbota. Różnicę między chatbotem a AI Start rozpisaliśmy wyżej, w tej samej sekcji.',
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli rozpoznajesz tu swoją firmę, usłyszysz to od nas na pierwszej rozmowie, zanim wystawimy jakąkolwiek fakturę. Wolimy stracić jedno zlecenie niż zostawić po sobie wdrożenie, którego klient po pół roku żałuje.',
      },

      {
        typ: 'naglowek',
        tekst: 'Co przygotować na bezpłatną rozmowę o chatbocie?',
        ikona: 'kalendarz-check',
        chip: 'PRZED ROZMOWĄ',
        overline: 'CZTERY RZECZY · ZAKRES USTALAMY NA MIEJSCU',
      },
      {
        typ: 'akapit',
        tekst: 'Bezpłatna rozmowa to badanie potrzeb. Sprawdzamy, z czym najczęściej przychodzą do Ciebie ludzie, którym kanałem piszą i co bot ma po Tobie przejąć. Nie robimy na niej audytu ani raportu, bo to osobna praca.',
      },
      {
        typ: 'akapit',
        tekst: 'Najczęstszy powód, dla którego ustalanie zakresu przeciąga się na kolejny tydzień, jest prozaiczny: nie wiadomo jeszcze, ile pytań przychodzi i skąd. Cztery rzeczy poniżej wystarczą, żebyśmy ustalili zakres i powiedzieli, przy którym progu jesteś.',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Skąd dziś przychodzą pytania i ile ich jest',
            akapity: [
              'Wystarczy zgrubnie: mniej więcej tyle mailem, tyle Messengerem, tyle telefonem. Ta jedna informacja decyduje, czy jesteśmy przy progu 1790 zł netto, czy wyżej.',
            ],
          },
          {
            naglowek: 'Gdzie leżą materiały do bazy wiedzy',
            akapity: [
              'Cenniki, oferty handlowe, karty produktów, instrukcje wewnętrzne, nagrania ze szkoleń. Nie muszą być poukładane. Musimy wiedzieć, że istnieją i kto ma do nich dostęp.',
            ],
          },
          {
            naglowek: 'Z jakimi systemami bot ma rozmawiać',
            akapity: [
              'CRM, sklep, kalendarz, magazyn. To jedyna rzecz, która przesuwa wycenę z 1790 zł netto do przedziału 8000-15000 zł netto, więc pytamy o nią wprost.',
            ],
          },
          {
            naglowek: 'Kto po Twojej stronie odbiera wdrożenie',
            akapity: [
              'Jedna osoba, która testuje bota i mówi, że jest dobrze. Bez niej odbiór rozjeżdża się na tygodnie, choć sama budowa prostego bota trwa 1-2 dni robocze.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Jeśli po drodze wymyślisz funkcję, której nie było w pierwszej rozmowie, wycenimy ją osobno i powiemy o tym od razu, a nie dopiero na fakturze.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kto buduje Twojego chatbota?',
        wariant: 'edge',
        chip: 'ZAŁOŻYCIEL',
        akapity: [
          'Paweł Pieloch, założyciel SimpleFast.ai.',
          'Prowadzę wdrożenia chatbotów i automatyzacji dla firm w Polsce i w Niemczech, między innymi dla Instytutu Kryptografii, Desant.pl i Trockenhaus.',
          'Na pierwszej rozmowie rozmawiasz ze mną, nie z działem handlowym. Jeśli uznam, że bot Ci się nie opłaci, powiem to na tej samej rozmowie.',
        ],
      },
    ],
    minPrice: 1790, // próg „prosty" (audyt §1, 2026-08-19): kwota w UI + offers w Service JSON-LD.
    /* SEO 2026-08-17: linkowanie wewnętrzne do poradnika cenowego (zdanie 1:1
       z brief-seo-2026-08-17; render w RamaCeny.tsx w tym samym akapicie). */
    linkPoradnik: {
      przed: 'Pełny rozkład kosztów chatbota opisaliśmy w poradniku: ',
      etykieta: 'ile kosztuje chatbot dla firmy w 2026',
      po: '.',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
    },
  },

  faq: [
    /* 2026-09-04 (antykanibalizacja, kontrola zmierzyła podobieństwo 1,0 z
       /uslugi/chatboty/cennik): odpowiedź skrócona z całej drabiny trzech
       progów do jednego zdania z odesłaniem. Powód: pytanie brzmi dosłownie
       jak fraza główna i H1 podstrony cennika, a oba teksty szły do FAQPage
       JSON-LD na DWÓCH adresach naraz. Pełna drabina zostaje w jednym
       miejscu, na podstronie. Ta sama drabina stoi zresztą wyżej na tej
       stronie, w sekcji ceny (przełącznik progów i tabela), więc czytelnik
       rodzica nic nie traci. */
    {
      pytanie: 'Ile kosztuje chatbot AI dla firmy?',
      odpowiedz:
        'Chatbot AI dla firmy zaczyna się u nas od 1790 zł netto, a pełną drabinę trzech progów, czasy wdrożenia i koszty miesięczne rozpisaliśmy na osobnej podstronie z cennikiem chatbota.',
    },
    {
      pytanie: 'Czym chatbot różni się od AI Agenta?',
      odpowiedz:
        'Chatbot odpowiada na pytania. AI Agent wykonuje całe zadania. Chatbot poda godziny otwarcia. Agent sprawdzi kalendarz, zaproponuje termin, zapisze wizytę i wyśle potwierdzenie. U nas chatbot to pierwszy krok, który możesz później rozwinąć w Agenta.',
    },
    {
      pytanie: 'Czy chatbot będzie zmyślał odpowiedzi?',
      odpowiedz:
        'Nie. Uczymy go na Twojej wiedzy i tak ustawiamy, żeby trzymał się faktów. Kiedy nie zna odpowiedzi, mówi to wprost i przekazuje sprawę do Ciebie, zamiast wymyślać. Klient zawsze wie, że rozmawia z AI.',
    },
    {
      pytanie: 'Gdzie działa chatbot?',
      odpowiedz:
        'Na Twojej stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie. To jest pełna lista kanałów, które wdrażamy. Jedna baza wiedzy, ten sam bot, wiele kanałów. Klient pisze tam, gdzie mu wygodnie, a Ty masz to w jednym miejscu.',
    },
    {
      pytanie: 'Ile trwa wdrożenie chatbota AI dla firmy?',
      odpowiedz:
        'Od 1 do 10 dni roboczych, zależnie od progu. Chatbot prosty na stronę: 1-2 dni robocze. Chatbot średni, z rozbudowaną bazą wiedzy: 3-4 dni robocze. Chatbot duży, z integracjami: 5-10 dni roboczych. Czas liczymy od przekazania kompletu materiałów przez Ciebie, czyli bazy wiedzy, treści i dostępów, a nie od podpisania umowy.',
    },
    {
      pytanie: 'Czy chatbot zastąpi moją obsługę klienta?',
      odpowiedz:
        'Nie zastąpi, odciąży. Bierze na siebie powtarzalne pytania i nocne wiadomości, a Twoi ludzie zajmują się trudniejszymi sprawami i relacją z klientem. Zespół ma mniej powtarzalnej roboty, nie mniej pracy do zwolnień.',
    },
    /* 2026-08-19 (audyt §1 i §9 etap 1 pkt 4): DWA DOŁOŻONE pytania. Rundy
       poprawek i zasada liczenia czasu to nasze własne zobowiązania, czyli
       materiał, który model może zacytować jako fakt o dostawcy. Żadne
       istniejące pytanie nie zostało usunięte. */
    {
      pytanie: 'Ile rund poprawek jest w cenie wdrożenia?',
      odpowiedz:
        'Dwie. Testujesz bota przez tydzień i zapisujesz uwagi, my je wdrażamy. Testujesz drugi tydzień i zgłaszasz kolejne, wdrażamy je i wtedy jest odbiór. Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze. Nowe funkcje, których nie było w pierwszej rozmowie, to rozbudowa wyceniana osobno.',
    },
    {
      pytanie: 'Ile kosztuje utrzymanie chatbota i czym różni się od utrzymania voicebota?',
      odpowiedz:
        'Utrzymanie chatbota kosztuje 99-599 zł netto miesięcznie, gdy projekt zostaje u nas. Utrzymanie voicebota to 299-1500 zł netto miesięcznie, bo voicebot jest trudniejszy w utrzymaniu: dochodzi telefonia, minuty rozmów i scenariusze głosowe. W obu przypadkach możesz zamiast tego wziąć całą infrastrukturę do siebie i wtedy płacisz 0 zł miesięcznie, a późniejsze poprawki rozliczamy po 350 zł netto za godzinę.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy, ile pytań dziennie zdejmie z Ciebie chatbot i ile leadów łapie po godzinach. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  /* 2026-09-04 (antykanibalizacja): wycięte 'ile kosztuje chatbot' oraz
     'ile kosztuje chatbot dla firmy'. Obie frazy stoją 1:1 w `queries`
     podstrony /uslugi/chatboty/cennik (lib/uslugi/podstrony/chatboty-cennik.ts),
     której H1 brzmi „Ile kosztuje chatbot AI dla firmy? Cennik 2026". Rodzic
     celuje we frazę o usłudze, dziecko we frazę cenową. */
  queries: [
    'chatbot dla firmy',
    'wdrożenie chatbota',
    'chatbot AI dla firmy',
    'chatbot na stronę www',
  ],

  /* v22 (linki §3, P1 #5): 427 wyświetleń w GSC, najwięcej w serwisie, pozycja
     16,6 i CTR 0,7%. Strona miała poradnik, ale ZERO dowodu wdrożenia i ZERO
     narzędzia. Obie realizacje mają kategorię `chatboty`, czyli już dziś
     linkują TUTAJ, tylko zwrotnie nie było nic.

     ŚWIADOMIE BEZ `uslugi: [/uslugi/chatboty/<slug>]` (rozstrzygnięte
     2026-09-04, nie cofać bez sprawdzenia komponentu). Kontrola zgłosiła, że
     w tym pliku nie ma ani jednego adresu podstrony. To prawda co do litery
     i NIE jest brakiem: `app/uslugi/[usluga]/page.tsx` woła
     `<PodstronyPowiazane slug="chatboty" />`, a ten komponent renderuje DWIE
     sekcje z jednego wywołania — najpierw siatkę „Konkretne zastosowania"
     z WSZYSTKIMI ośmioma podstronami rodzica prosto z rejestru
     (`getPodstronyRodzica`), a dopiero potem to pole przez `LinkiKrzyzowe`.
     Wpisanie tych samych ośmiu adresów tutaj dałoby na jednej stronie dwie
     siatki z tymi samymi ośmioma linkami i tymi samymi etykietami (h1 celu).
     Rodzic linkuje więc do każdej podstrony, tylko robi to rejestrem, a nie
     tym polem. */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Chatbot edukacyjny do kursów online',
        href: '/realizacje/chatbot-edukacyjny-kursy',
        opis:
          'Kursant pyta chatbota i od razu trafia do właściwej lekcji, zamiast przeszukiwać setki materiałów VOD.',
      },
      {
        etykieta: 'Firmowi Agenci AI 24/7',
        href: '/realizacje/agenci-ai-24-7',
        opis:
          'Agent odpowiada nowym leadom o każdej porze, także w nocy i w weekend, bez czuwania zespołu.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis:
          'Policz koszt jednego procesu rocznie i to, po ilu miesiącach zwróci się wdrożenie. Koszt podajesz Ty.',
      },
    ],
  },
};
