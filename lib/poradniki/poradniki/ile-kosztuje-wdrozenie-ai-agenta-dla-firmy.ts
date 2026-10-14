import type { Poradnik } from '../types';

/**
 * PORADNIK 3: Ile kosztuje agent AI dla firmy (cennik wdrożenia) i po czym poznać, że się zwróci.
 *
 * SEO 2026-10-14 (operacja naprawcza, .seo-przeglad/naprawa-2026-10-13/zwiad.json,
 * klaster „agenci-ai"): szyk „AI agent" -> „agent AI" w tytule, leadzie, nagłówkach,
 * podpisach tabel, FAQ, tagach i queries (ludzie wpisują „agent ai", liderzy SERP
 * mają 0-1x „AI agent"). metaTitle z frazą na początku, kwota „Od 2500 zł" ZOSTAJE
 * (decyzja właściciela z 2026-08-17). ŻADNA KWOTA w tym pliku się nie zmieniła.
 * Doszły dwie sekcje: „Ile kosztuje agent AI miesięcznie?" (kwoty opieki 1:1 z plików
 * usług, rozbite na kanały) i „Agent AI, chatbot czy automatyzacja: co wybrać?" (bez
 * liczb). Lead Generator ma jedną wersję liczb (lib/realizacje/lead-generator.ts).
 * Slug BEZ zmian (adres ma historię w GSC).
 *
 * 2026-10-14, RECENZJA FALI 1: ceny agenta ujednolicone z cennikami usług
 * (zwiad.json, klaster agenci-ai, zmiana „Ujednolicić ceny z cennikami
 * usług"). Wcześniej stało tu „agent z integracją od 2500 zł", a 2500 zł to
 * w cenniku voicebota wersja PROSTA, bez integracji. Teraz, 1:1 ze źródeł:
 *   - agent głosowy prosty 2500 zł netto, 3-5 dni roboczych; z integracjami
 *     5000-9000 zł netto, 5-25 dni roboczych: lib/uslugi/voiceboty.ts
 *     (tabela kosztów w ramaCeny, wiersze „Stworzenie: bot prosty / z integracjami"),
 *   - agent czatowy z integracjami 8000-15000 zł netto, 5-10 dni roboczych:
 *     lib/uslugi/podstrony/chatboty-cennik.ts, lib/uslugi/agenci-ai.ts (tabela),
 *   - opieka telefonu 299-1500 zł netto: lib/uslugi/voiceboty.ts.
 * Tytuł „Od 2500 zł" ZOSTAJE (decyzja Pawła z 2026-08-17) i jest prawdziwy:
 * od 2500 zł netto kosztuje agent w telefonie. Do potwierdzenia przez Pawła,
 * czy kwota w tytule zostaje obok progu 1790 zł.
 *
 * Money query primary: „ile kosztuje wdrożenie AI agenta dla firmy". WĘŻSZA fraza
 * niż istniejący wpis bloga (ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026), który
 * mówi o „wdrożeniu AI" ogólnie. Ten poradnik jest KONKRETNIE o AGENCIE: różnica
 * agent vs chatbot, od czego zależy koszt, po czym poznać zwrot. Linkuje wzajemnie
 * z tamtym wpisem (zero kanibalizacji).
 *
 * SEO 2026-08-17 (brief-seo-2026-08-17): dochodzą REALNE widełki 1:1 z cenników
 * usług (zero zmyślonych kwot). Zmiana kwoty w cenniku usługi = zaktualizować
 * też ten poradnik (naczynia połączone).
 *
 * AKTUALIZACJA CENNIKA 2026-08-19 (źródło: .seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md
 * plus decyzje Pawła z 2026-08-19). KAŻDA kwota NETTO:
 *   - agent do jednego zadania: 990 zł -> 1790 zł, czas 1-2 dni robocze.
 *     To ten sam produkt co „chatbot prosty" z audytu §1 (bot na stronę
 *     z bazą wiedzy i zbieraniem leadów), więc dziedziczy jego cenę i czas.
 *     Kwota 990 zł znika z całego serwisu jako cena chatbota: leżała poniżej
 *     pasma rynkowego, przez co modele AI odrzucały ją jako wartość odstającą.
 *   - agent z integracją: 2 500 zł BEZ ZMIAN (lib/uslugi/voiceboty.ts minPrice,
 *     audyt §2 potwierdza próg 2 500 zł za bota prostego).
 *   - audyt 1 490 zł BEZ ZMIAN (audyt §3; dochodzi 5 dni roboczych i raport PDF).
 *   - opieka 99-599 zł/mies BEZ ZMIAN (decyzja Pawła 2026-08-19: zostaje
 *     dla chatbotów i automatyzacji; nowy model 299-1500 zł albo 0 zł dotyczy
 *     WYŁĄCZNIE voicebotów i jest opisany na stronach voicebotowych).
 */
export const ileKosztujeWdrozenieAiAgenta: Poradnik = {
  slug: 'ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
  /* SEO 2026-10-14: fraza „ile kosztuje agent AI" na początku H1, słowo
     „wdrożenia" zostaje (trzyma zapytanie „ile kosztuje wdrożenie agenta ai
     w firmie", poz. ok. 9,7 w GSC). */
  tytul: 'Ile kosztuje agent AI dla firmy? Cennik wdrożenia 2026',

  lead:
    'Agent AI kosztuje więcej niż chatbot, bo nie tylko odpowiada. Łączy się z kalendarzem, CRM i systemami i sam wykonuje zadania. Cenę liczymy od wartości, czyli ile godzin i leadów odzyskasz. Poniżej masz, od czego zależy koszt agenta, jak policzyć zwrot i po czym poznać, że wdrożenie się spina, zanim wydasz pierwszą złotówkę.',

  /* SEO 2026-08-17d (Z7), KOREKTA po decyzji Pawła: kwota w tytule to 2500 zł,
     nie kwota progu najniższego. Powody, oba nadal aktualne po zmianie
     cennika 2026-08-19:
       1. MERYTORYCZNIE: próg najniższy to cennik CHATBOTA (dziś 1790 zł).
          W tabeli widełek tego poradnika stoi przy „agent do JEDNEGO zadania",
          a 2500 zł przy „agent z integracją (kalendarz, CRM, poczta)". To
          drugie jest tym, co ludzie rozumieją przez „AI agenta", więc tytuł
          ma pokazywać ten próg.
       2. KOLIZJA W SERP: kwota progu najniższego stoi już w metaTitle
          poradnika /poradniki/ile-kosztuje-chatbot-dla-firmy-2026 (od
          2026-08-19: „Od 1790 zł"). Dwa nasze poradniki z identyczną kwotą
          w tytule konkurują ze sobą i mylą w wynikach.
     Długość: 44 zn. + 16 zn. sufiksu marki = 60, mieści się w budżecie
     (odrzucony wariant „? Cena i zwrot" ma 62 i faktycznie NIE mieści się —
     ta część poprzedniej analizy była słuszna i zostaje w mocy).
     Kwota jest prawdziwa: 2500 zł stoi w renderowanej tabeli widełek tego
     poradnika oraz w lib/uslugi/voiceboty.ts (minPrice) i w audycie §2.
     SEO 2026-10-14: ta sama kwota, nowy szyk i fraza na początku. Tytuł
     „Ile kosztuje agent AI dla firmy? Od 2500 zł" ma 43 zn. + 16 zn. sufiksu
     marki = 59 (limit 60). */
  metaTitle: 'Ile kosztuje agent AI dla firmy? Od 2500 zł',
  /* Kwoty 1:1 z kafli i tabeli widełek tego poradnika (stan po recenzji
     fali 1: 2500 zł to agent w telefonie, nie agent z integracjami). */
  metaDescription:
    'Ile kosztuje agent AI dla firmy? Od 1790 zł netto za jedno zadanie, w telefonie od 2500 zł netto, opieka miesięczna albo 0 zł. Jak policzyć zwrot.',

  data: '2026-06-15',
  /* SEO 2026-08-17: realna aktualizacja treści (widełki + sekcja ceny), więc
     bump TYLKO dataAktualizacji (= Article.dateModified i sitemap lastmod);
     `data` = prawdziwa data publikacji, nie ruszamy (zakaz fałszywej świeżości).
     2026-10-14: nowe sekcje i zmiana szyku, czyli realna zmiana treści. */
  dataAktualizacji: '2026-10-14',
  kategoria: 'Koszty i wycena',
  tagi: [
    'ile kosztuje agent AI',
    'koszt agenta AI',
    'cena agenta AI dla firmy',
    'wdrożenie agenta AI',
  ],

  /* v22 (PLAN-v22 §2.1, skarga Pawła 2026-08-18 o „jednej ścianie tekstu"):
     ta sama treść, inne OPAKOWANIE. Nagłówek plus akapity plus lista jednej
     sekcji jadą teraz w jednej karcie `.inf-card` z tonem poradnika (wzorzec
     v21 z poradnika o chatbocie), tabele wjeżdżają w karty i dostają widoczny
     <caption>, a lista, która jest sekwencją działań, jedzie jako <ol> z
     numerami w kółkach.
     ŻELAZNE (stan v22): ZERO zmian słów. Ani jedno zdanie nie zostało
     przepisane, skrócone ani dopisane. Kolejność merytoryczna 1:1 z poprzednią
     wersją, wszystkie H2 zostają H2, tabele zostają prawdziwymi <table> ze scope.
     JEDYNE nowe widoczne napisy to dwa podpisy tabel, oba skopiowane ZNAK
     W ZNAK z nagłówków H2 tej samej strony (patrz komentarze przy `podpis`).
     RUNDA CEN 2026-08-19 zmienia w tym pliku WYŁĄCZNIE kwoty, czasy i dopiski
     „netto" (oraz dokłada jeden akapit z zasadą liczenia czasu). Akapity bez
     kwot zostają słowo w słowo, żaden blok nie został usunięty. */
  tresc: [
    /* Runda struktury 2026-08-19 (raport P8: mediana akapitu ~150 zn, strona miała
       do 61% tekstu w akapitach >400 zn): treść przełożona na bloki, fakty 1:1,
       istniejące tabele/kafle/kroki zachowane. Poprzednia wersja: git blame. */
    {
      typ: 'akapit',
      tekst: 'Wdrożenie agenta AI dla firmy zaczyna się od 1790 zł netto za agenta do jednego zadania na czacie, gotowego w 1-2 dni robocze. Agent głosowy, który odbiera telefony, kosztuje 2500 zł netto w wersji prostej. Agent z integracjami to 5000-9000 zł netto w telefonie albo 8000-15000 zł netto na czacie. Opieka to 99-599 zł netto miesięcznie przy czacie i 299-1500 zł netto przy telefonie, gdy infrastruktura zostaje u nas, albo 0 zł, jeśli przekażemy Ci infrastrukturę.',
    },
    {
      typ: 'kafle',
      kafle: [
        {
          wartosc: 'od 1790 zł netto',
          opis: 'agent do jednego zadania, gotowy w 1-2 dni robocze',
          zrodlo: 'widełki 2026 niżej na tej stronie',
        },
        {
          wartosc: 'od 2500 zł netto',
          opis: 'agent głosowy, który odbiera telefony, wersja prosta',
          zrodlo: 'widełki 2026 niżej na tej stronie',
        },
        {
          wartosc: '1490 zł netto',
          opis: 'audyt przed wdrożeniem, odliczany od ceny wdrożenia',
          zrodlo: 'widełki 2026 niżej na tej stronie',
        },
        {
          wartosc: '99-599 zł netto/mies.',
          opis: 'opieka agenta na czacie, gdy projekt zostaje u nas; 0 zł po przekazaniu infrastruktury',
          zrodlo: 'widełki 2026 niżej na tej stronie',
        },
      ],
    },
    {
      typ: 'akapit',
      tekst: 'Agent AI to nie chatbot. Chatbot odpowiada, agent działa. Agent łączy się z kalendarzem, CRM i systemami i sam wykonuje zadania: umawia, pisze do bazy, prowadzi proces od początku do końca. Dlatego nie kosztuje tyle co chatbot.',
    },
    {
      typ: 'akapit',
      tekst: 'Cena bierze się z tego, ile pracy agent realnie wykonuje i do ilu systemów się podłącza. My liczymy ją od wartości: ile godzin i leadów to odzyska dla firmy. Konkretne widełki dla Twojego przypadku podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Ile kosztuje agent AI: widełki 2026',
      chip: 'CENNIK',
      wariant: 'top',
      akapity: [
        'To nasze realne widełki startowe, te same co w cennikach naszych usług. Dolna granica to agent do jednego wąskiego zadania, a cena wdrożenia agenta AI rośnie z liczbą integracji i scenariuszy.',
        'Audyt przed wdrożeniem odliczamy od ceny wdrożenia, więc przy współpracy w praktyce nic nie kosztuje.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      podpis: 'Ile kosztuje agent AI: widełki 2026',
      naglowki: [
        'Zakres',
        'Cena netto',
        'Czas',
      ],
      wiersze: [
        [
          'Agent do jednego zadania (np. odpowiadanie na powtarzalne pytania)',
          'od 1790 zł',
          '1-2 dni robocze',
        ],
        [
          'Agent głosowy, wersja prosta (odbiera telefony)',
          '2500 zł',
          '3-5 dni roboczych',
        ],
        [
          'Agent głosowy z integracjami (np. kalendarz)',
          '5000-9000 zł',
          '5-25 dni roboczych',
        ],
        [
          'Agent czatowy z integracjami (CRM, kalendarz, sklep)',
          '8000-15000 zł',
          '5-10 dni roboczych',
        ],
        [
          'Audyt przed wdrożeniem (odliczany od wdrożenia)',
          '1490 zł',
          '5 dni roboczych',
        ],
        [
          'Opieka miesięczna',
          'czat 99-599 zł, telefon 299-1500 zł',
          'od startu, albo 0 zł po przekazaniu infrastruktury',
        ],
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Ile trwa wdrożenie agenta AI?',
      chip: 'ZASADA',
      wariant: 'quiet',
      akapity: [
        'Agent do jednego zadania jest gotowy w 1-2 dni robocze. Czas z tabeli liczymy od przekazania kompletu materiałów, czyli bazy wiedzy, treści i dostępów, a nie od podpisania umowy.',
        'Dwie rundy poprawek są w cenie wdrożenia: testujesz tydzień i zapisujesz uwagi, wdrażamy je, testujesz drugi tydzień, wdrażamy kolejne, potem odbiór.',
        'Po starcie wybierasz jedną z dwóch dróg: infrastruktura zostaje u nas i płacisz opiekę 99-599 zł netto miesięcznie (przy agencie głosowym 299-1500 zł netto), albo przekazujemy Ci infrastrukturę i abonament wynosi 0 zł.',
      ],
    },
    /* SEO 2026-10-14 (zwiad, klaster agenci-ai): sekcja, którą mają liderzy
       frazy cenowej (syntalith: „Ile kosztuje agent AI miesięcznie"). ZERO
       nowych kwot, każda 1:1 ze źródła, rozbita na kanały tak jak w źródle:
         - 99-599 zł netto/mies. czat i automatyzacja: lib/uslugi/podstrony/
           chatboty-cennik.ts (kapsula), lib/uslugi/automatyzacje.ts (ramaCeny),
           komentarz nagłówkowy tego pliku (decyzja Pawła 2026-08-19),
         - 299-1500 zł netto/mies. voicebot, 350 zł netto za godzinę po
           przekazaniu: lib/uslugi/voiceboty.ts (tabela kosztów w ramaCeny)
           i chatboty-cennik.ts (poprawki 350 zł netto za godzinę),
         - 199 zł netto/mies. serwery asystenta: lib/uslugi/asystent-prezesa.ts
           (kapsula) i sekcja asystenta niżej na tej stronie,
         - powód droższej opieki przy telefonie: lib/agent/knowledge.ts (wpis
           uslugi-chatboty, zdanie o telefonii, minutach i syntezie głosu),
         - tokeny u dostawcy: chatboty-cennik.ts (kapsula), voiceboty.ts (kapsula).
       Nagłówek NIE powtarza żadnego pytania z FAQ (zakaz dubla FAQPage). */
    {
      typ: 'sekcja',
      naglowek: 'Ile kosztuje agent AI miesięcznie?',
      chip: 'CENNIK',
      wariant: 'top',
      akapity: [
        'Miesięczny koszt agenta AI zależy od kanału i od tego, kto trzyma infrastrukturę. Gdy zostaje u nas, opieka agenta na czacie albo w procesach to 99-599 zł netto miesięcznie, a agenta głosowego 299-1500 zł netto. Gdy przekazujemy Ci infrastrukturę, abonament wynosi 0 zł.',
        'Opieka przy telefonie kosztuje więcej, bo dochodzą telefonia, minuty rozmów i synteza głosu do pilnowania. Zużycie modelu płacisz osobno, bezpośrednio dostawcy, według realnego użycia.',
      ],
      punkty: [
        'Agent na czacie albo w procesach (chatbot, automatyzacja): 99-599 zł netto miesięcznie, gdy projekt zostaje u nas.',
        'Agent głosowy, który odbiera telefony (voicebot): 299-1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas.',
        'Asystent prezesa: 199 zł netto miesięcznie za serwery, bo samego bota przekazujemy Tobie.',
        'Agent na czacie albo w telefonie po przekazaniu infrastruktury: 0 zł abonamentu, a poprawki zamawiasz, gdy ich potrzebujesz, po 350 zł netto za godzinę.',
        'Zużycie: tokeny, a przy telefonie także minuty rozmów, rozliczasz bezpośrednio z dostawcą.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Czym agent AI różni się od chatbota i czemu kosztuje więcej?',
      wariant: 'edge',
      akapity: [
        'Najprościej: chatbot mówi, agent robi. Chatbot odpowie na pytanie o ofertę.',
        'Agent odbierze zapytanie, sprawdzi dostępność w kalendarzu, umówi spotkanie, zapisze klienta do CRM i wyśle potwierdzenie, bez udziału człowieka przy każdym kroku.',
        'Im więcej akcji i im więcej systemów w grze, tym więcej pracy przy wdrożeniu, więc wyższy koszt. To nie cena za rozmowę. To cena za pracę, którą agent wykonuje zamiast Twojego zespołu.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      /* Podpis = H2 sekcji wyżej, znak w znak (szyk zmieniony razem z H2). */
      podpis: 'Czym agent AI różni się od chatbota i czemu kosztuje więcej?',
      naglowki: [
        'Cecha',
        'Chatbot',
        'Agent AI',
      ],
      wiersze: [
        [
          'Co robi',
          'Odpowiada na pytania',
          'Wykonuje zadania od początku do końca',
        ],
        [
          'Integracje',
          'Zwykle sama strona lub czat',
          'Kalendarz, CRM, systemy, poczta',
        ],
        [
          'Decyzje',
          'Podaje informację',
          'Podejmuje akcje w ustalonych granicach',
        ],
        [
          'Koszt',
          'Niższy próg',
          'Wyższy, bo robi pracę człowieka',
        ],
      ],
    },
    /* SEO 2026-10-14 (zwiad, klaster agenci-ai): krótka sekcja wyboru, BEZ
       liczb. Fakty: zakres automatyzacji z kapsuły lib/uslugi/automatyzacje.ts,
       granice agenta i akceptacja człowieka z lib/uslugi/rozwiazania.ts
       (FORMA 3 przełącznika), „powiemy to wprost" z rozwiazania.ts (sekcja
       sygnałów w problem.bloki). */
    {
      typ: 'sekcja',
      naglowek: 'Agent AI, chatbot czy automatyzacja: co wybrać?',
      wariant: 'quiet',
      akapity: [
        'Każde z tych rozwiązań zdejmuje inny rodzaj pracy. Wybór zależy od tego, co dziś robi człowiek.',
        'Jeśli nie wiesz, co pasuje do Twojego procesu, rozstrzygamy to na bezpłatnej diagnozie. Gdy agent nie jest potrzebny, powiemy to wprost.',
      ],
      punkty: [
        'Chatbot wystarczy, gdy klienci głównie pytają o ofertę, ceny i godziny. Odpowiada i zbiera kontakt.',
        'Automatyzacja wystarczy, gdy proces za każdym razem wygląda tak samo i nie wymaga rozmowy, na przykład przepisywanie danych z maila do arkusza i faktury albo wysyłka potwierdzeń.',
        'Agent AI ma sens, gdy robota nie mieści się w jednym narzędziu: trzeba odebrać zapytanie, sprawdzić kalendarz, zapisać klienta w CRM i odpisać.',
        'Przy agencie decyzje o wysokiej stawce zostają u człowieka. Agent wykonuje pracę, pokazuje wynik i czeka na akceptację.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Od czego zależy cena agenta AI',
      wariant: 'top',
      akapity: [
        'Koszt agenta AI nie bierze się z liczby ekranów. Bierze się z zakresu pracy i głębokości integracji.',
        'Prosty agent do jednego zadania to inny budżet niż agent, który prowadzi cały proces obsługi klienta. Oto co realnie decyduje o cenie.',
      ],
      punkty: [
        'Liczba integracji: każdy system (CRM, kalendarz, poczta, baza) to osobne połączenie i osobna robota.',
        'Liczba scenariuszy: jedno wąskie zadanie kontra kilka procesów prowadzonych od zapytania do zamknięcia.',
        'Wolumen rozmów i zadań: im więcej zapytań agent obsługuje, tym więcej testów przed startem i pracy przy utrzymaniu.',
        'Wymagania RODO: praca na danych osobowych oznacza dodatkowe zabezpieczenia i zapisy w umowie powierzenia.',
        'Decyzyjność agenta: ile może zrobić sam, a co musi potwierdzić człowiek. Więcej autonomii to więcej pracy przy wdrożeniu.',
        'Jakość danych i procesów: uporządkowane skracają wdrożenie, bałagan je wydłuża i podnosi cenę.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Ile kosztuje stworzenie asystenta AI dla firmy i kto to robi w Polsce?',
      chip: 'Asystent prezesa',
      wariant: 'edge',
      akapity: [
        'Osobisty asystent AI dla jednej osoby, na przykład prezesa, to odmiana agenta. Stworzenie kosztuje 4999 zł netto, a budowa zajmuje 5-10 dni roboczych.',
        'Po wdrożeniu bota przekazujemy klientowi. Zostają serwery za 199 zł netto miesięcznie i zużycie rozliczane według cennika API modeli, po stronie klienta. Asystent uczy się jednej osoby.',
        'Robimy to my, SimpleFast.ai: wdrożenia AI dla polskich małych i średnich firm. Działamy na rynku polskim i niemieckim.',
      ],
    },
    {
      typ: 'kafle',
      kafle: [
        {
          wartosc: '4999 zł netto',
          opis: 'stworzenie asystenta prezesa',
          zrodlo: 'cennik usługi Asystent prezesa',
        },
        {
          wartosc: '5-10 dni roboczych',
          opis: 'budowa asystenta',
          zrodlo: 'cennik usługi Asystent prezesa',
        },
        {
          wartosc: '199 zł netto/mies.',
          opis: 'serwery po przekazaniu bota',
          zrodlo: 'cennik usługi Asystent prezesa',
        },
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak policzyć zwrot z agenta AI?',
      wariant: 'quiet',
      akapity: [
        'Zwrot z agenta liczy się tak samo jak z każdej automatyzacji, tylko skala bywa większa, bo agent wykonuje cały ciąg pracy, nie pojedynczą odpowiedź.',
        'Bierzesz godziny, które dziś znikają na powtarzalnym procesie, mnożysz przez koszt godziny i dodajesz leady, które dziś przepadają, bo nikt nie zareagował na czas. To porównujesz z kosztem setupu i opieki.',
        /* SEO 2026-10-14: jedna wersja liczb Lead Generatora na stronie, 1:1
           z lib/realizacje/lead-generator.ts (FAQ realizacji). Wcześniej stało
           tu „20-30 minut ... około 50 godzin" z usługi Leady B2B, a w FAQ
           niżej „40 minut zamiast dwóch tygodni", czyli dwie liczby o tych
           samych 1000 rekordach. */
        'Nasze realne przykłady pokazują skalę: w projekcie Lead Generator automat zebrał 1000 rekordów potencjalnych klientów w 40 minut, a ręcznie ta sama praca zajmowała około dwóch tygodni.',
        'Drugi przykład: w Instytucie Kryptografii około 85% draftów e-maili pisze AI, przy 580 mailach tygodniowo w szczycie, a odpowiedź idzie do klienta od razu albo po drobnej poprawce.',
      ],
    },
    {
      typ: 'kroki',
      wariant: 'kolo',
      kroki: [
        {
          tytul: 'Policz godziny: ile czasu tygodniowo zżera dziś proces, który ma przejąć agent.',
        },
        {
          tytul: 'Przelicz na pieniądze: godziny razy koszt godziny pracy w Twojej firmie.',
        },
        {
          tytul: 'Dodaj utracone leady: ile zapytań przepada, bo reakcja przychodzi za późno albo wcale.',
        },
        {
          tytul: 'Porównaj z kosztem: setup plus opieka miesięczna kontra to, co odzyskujesz co miesiąc.',
        },
        {
          tytul: 'Sprawdź to liczbowo w kalkulatorze oszczędności, zanim zamówisz wdrożenie.',
        },
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Po czym poznać, że agent AI się zwróci?',
      wariant: 'top',
      akapity: [
        'Wdrożenie agenta spina się wtedy, kiedy proces jest powtarzalny, kosztuje realne godziny i da się go opisać krok po kroku.',
        'Jeśli zadanie jest jednorazowe albo za każdym razem wygląda inaczej, agent nie ma czego się nauczyć i zwrot będzie wątpliwy. Poniżej proste sygnały, że to dobry moment.',
      ],
      punkty: [
        'Proces jest powtarzalny i dzieje się regularnie, nie raz na kwartał.',
        'Da się go opisać krok po kroku, bo agent działa według reguł, nie domysłów.',
        'Pochłania realne godziny, które dziś znikają na ręcznej robocie.',
        'Gubicie leady albo zapytania poza godzinami pracy, bo nikt nie zdąży zareagować.',
        'Człowiek może zostać przy kontroli i wyjątkach, a powtarzalność oddać agentowi.',
      ],
    },
    {
      typ: 'cytat',
      tekst: 'Agent AI nie kosztuje za rozmowę. Kosztuje za pracę, którą wykonuje zamiast Twojego zespołu.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Od czego zacząć bez ryzyka?',
      wariant: 'edge',
      akapity: [
        'Nie zaczynaj od pytania, ile kosztuje agent. Zacznij od pytania, który proces najbardziej Cię zatrzymuje. Wybierz jeden powtarzalny ciąg pracy, policz go i wdróż wąsko. Jeśli liczby się zgadzają, rozszerzasz zakres agenta o kolejne kroki.',
        'Pierwszy krok nic nie kosztuje: bezpłatna diagnoza to 0 zł, około 30 minut i kończy się konkretną listą rzeczy do automatyzacji.',
        'Jeśli szukasz szerszego kontekstu kosztów wdrożenia AI w firmie, nie tylko agenta, zajrzyj też do naszego wpisu o tym, ile kosztuje wdrożenie AI w małej firmie. Ten poradnik dotyczy konkretnie agenta, tamten wpis całego wdrożenia.',
      ],
    },
  ],

  faq: [
    {
      pytanie: 'Czym agent AI różni się od chatbota?',
      odpowiedz:
        'Chatbot odpowiada na pytania, agent wykonuje zadania. Agent łączy się z kalendarzem, CRM i systemami i sam prowadzi proces: umawia, zapisuje dane, wysyła potwierdzenia. Dlatego kosztuje więcej niż chatbot. To nie cena za rozmowę, tylko za pracę, którą agent robi zamiast człowieka.',
    },
    {
      pytanie: 'Od czego zależy koszt wdrożenia agenta AI?',
      odpowiedz:
        'Od zakresu zadań, liczby integracji, wymaganego poziomu pewności, decyzyjności agenta i jakości Twoich danych. Prosty agent do jednego zadania to inny budżet niż agent prowadzący cały proces obsługi klienta. Każda integracja z systemem to osobna robota, a wyższa stawka błędu oznacza więcej testów, więc wyższy koszt.',
    },
    {
      pytanie: 'Jak policzyć, czy agent AI się zwróci?',
      odpowiedz:
        'Policz godziny, które dziś znikają na powtarzalnym procesie, pomnóż przez koszt godziny i dodaj leady tracone poza godzinami pracy. Porównaj to z kosztem setupu i opieki. W naszym projekcie Lead Generator zebranie 1000 rekordów zajęło 40 minut zamiast dwóch tygodni, co pokazuje, o jakiej skali zwrotu mówimy przy dobrze dobranym procesie.',
    },
    {
      pytanie: 'Po czym poznać, że wdrożenie agenta się spina?',
      odpowiedz:
        'Gdy proces jest powtarzalny, regularny i da się opisać krok po kroku, a do tego pochłania realne godziny lub gubi leady poza godzinami pracy. Jeśli zadanie jest jednorazowe albo za każdym razem inne, agent nie ma czego się nauczyć i zwrot będzie wątpliwy.',
    },
    {
      pytanie: 'Czym ten poradnik różni się od wpisu o koszcie wdrożenia AI?',
      odpowiedz:
        'Ten poradnik dotyczy konkretnie agenta AI, czyli systemu, który sam wykonuje zadania. Wpis o koszcie wdrożenia AI w małej firmie mówi o całym wdrożeniu szerzej, łącznie z prostszymi chatbotami i automatyzacjami. Jeśli wybierasz między rozwiązaniami, zacznij od szerszego wpisu, a po szczegóły o agencie wróć tutaj.',
    },
  ],

  /* SEO 2026-10-14: pierwsza = primary zgodna z H1; szyk „agent AI"
     (wszystkie zapytania z GSC w tej gałęzi mają ten szyk). */
  queries: [
    'ile kosztuje agent AI dla firmy',
    'ile kosztuje wdrożenie agenta AI w firmie',
    'ile kosztuje agent AI miesięcznie',
    'koszt agenta AI',
    'cena agenta AI dla firmy',
    'wdrożenie agenta AI cena',
  ],

  /* SEO 2026-10-14 (zwiad, klaster agenci-ai, linkiWewnetrzne): na PIERWSZYM
     miejscu strona usługi /uslugi/agenci-ai (etykieta = jej H1 wg konspektu
     zwiadu), dochodzi cennik voicebota (etykieta wg zlecenia, opis = fakty
     z metaDescription lib/uslugi/podstrony/voiceboty-cennik.ts).
     Opis karty agentów: 1790 zł netto = chatboty.ts minPrice, 2500 zł netto
     = voiceboty.ts minPrice; obie kwoty stoją też w tabeli widełek wyżej. */
  powiazaneUslugi: [
    {
      etykieta: 'Agenci AI dla firm',
      href: '/uslugi/agenci-ai',
      opis: 'Agenci AI na czacie, w telefonie i w procesach firmy: na czacie od 1790 zł netto, w telefonie od 2500 zł netto.',
    },
    {
      etykieta: 'Architekci Wartości AI',
      href: '/uslugi/architekci-wartosci-ai',
      opis: 'Zobacz, jak budujemy i utrzymujemy agentów, którzy wykonują pracę pod nadzorem człowieka.',
    },
    {
      etykieta: 'Agent rekrutacyjny',
      href: '/uslugi/agent-rekrutacyjny',
      opis: 'Przykład agenta w akcji: odsiewa CV i umawia rozmowy bez Twojego udziału.',
    },
    {
      etykieta: 'Chatboty dla firm',
      href: '/uslugi/chatboty',
      opis: 'Tańszy pierwszy krok: chatbot, który odpowiada klientom i rośnie do agenta.',
    },
    {
      etykieta: 'Voiceboty: bot telefoniczny',
      href: '/uslugi/voiceboty',
      opis: 'Agent w akcji na telefonie: odbiera połączenia 24/7 i umawia wizyty w kalendarzu.',
    },
    {
      etykieta: 'Cennik voicebota 2026',
      href: '/uslugi/voiceboty/cennik',
      opis: 'Budowa 2500 zł netto albo 5000-9000 zł netto, utrzymanie 299-1500 zł netto miesięcznie albo 0 zł. Minuty i tokeny osobno.',
    },
    {
      etykieta: 'Audyt AI: mapa oszczędności czasu',
      href: '/uslugi/audyt-ai',
      opis: 'Zanim wydasz na agenta, zobacz mapę procesów z największym zwrotem.',
    },
  ],

  powiazaneNarzedzia: [
    {
      etykieta: 'Kalkulator oszczędności',
      href: '/narzedzia#kalkulator-oszczednosci',
      opis: 'Policz, ile godzin i pieniędzy odzyska agent na Twoim procesie.',
    },
  ],

  /* SEO 2026-08-17: blok „Zobacz też" — dwa pozostałe poradniki cenowe. */
  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje chatbot dla firmy w 2026',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
      opis: 'Chatbot prosty 1790 zł netto i 1-2 dni robocze, pełne widełki i koszty utrzymania.',
    },
    {
      etykieta: 'Ile kosztuje automatyzacja AI w firmie',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
      opis: 'Realne widełki wdrożeń automatyzacji i to, od czego zależy cena.',
    },
  ],

  /* v22 (PLAN-v22 §3 P1 #5): dowód pod treścią, grupa „Zobacz to na wdrożeniu".
     ETYKIETA I OPIS SĄ PRZEPISANE ZNAK W ZNAK z rejestru lib/realizacje:
     etykieta = `h1` tamtej realizacji, opis = jej `metaDescription`. Zero
     nowych zdań i zero drugiego opisu tego samego wdrożenia. */
  powiazaneRealizacje: [
    {
      etykieta: 'Firmowi Agenci AI 24/7',
      href: '/realizacje/agenci-ai-24-7',
      opis: 'Agenci AI na firmowej stronie: znają strukturę firmy i odpowiadają nowym leadom całą dobę, bez nadzoru. Case study: żaden lead nie zostaje bez odpowiedzi.',
    },
    {
      etykieta: 'Auto-email dla biura obsługi klienta',
      href: '/realizacje/auto-email-bok',
      opis: 'System AI dla biura obsługi klienta Instytutu Kryptografii: około 85% draftów idzie od razu albo po drobnej poprawce, gotowe do jednego kliknięcia. Case study.',
    },
  ],
};
