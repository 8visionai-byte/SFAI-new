import type { Poradnik } from '../types';

/**
 * PORADNIK 3: Ile kosztuje wdrożenie AI agenta dla firmy i po czym poznać, że się zwróci.
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
 *   - opieka 99 do 599 zł/mies BEZ ZMIAN (decyzja Pawła 2026-08-19: zostaje
 *     dla chatbotów i automatyzacji; nowy model 299-1500 zł albo 0 zł dotyczy
 *     WYŁĄCZNIE voicebotów i jest opisany na stronach voicebotowych).
 */
export const ileKosztujeWdrozenieAiAgenta: Poradnik = {
  slug: 'ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
  tytul: 'Ile kosztuje wdrożenie AI agenta dla firmy i po czym poznać, że się zwróci',

  lead:
    'AI agent kosztuje więcej niż chatbot, bo nie tylko odpowiada. Łączy się z kalendarzem, CRM i systemami i sam wykonuje zadania. Cenę liczymy od wartości, czyli ile godzin i leadów odzyskasz. Poniżej masz, od czego zależy koszt agenta, jak policzyć zwrot i po czym poznać, że wdrożenie się spina, zanim wydasz pierwszą złotówkę.',

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
     poradnika oraz w lib/uslugi/voiceboty.ts (minPrice) i w audycie §2. */
  metaTitle: 'Ile kosztuje wdrożenie AI agenta? Od 2500 zł',
  metaDescription:
    'Ile kosztuje wdrożenie AI agenta dla firmy? Czym agent różni się od chatbota, od czego zależy koszt i jak policzyć zwrot, zanim zamówisz wdrożenie.',

  data: '2026-06-15',
  /* SEO 2026-08-17: realna aktualizacja treści (widełki + sekcja ceny), więc
     bump TYLKO dataAktualizacji (= Article.dateModified i sitemap lastmod);
     `data` = prawdziwa data publikacji, nie ruszamy (zakaz fałszywej świeżości). */
  dataAktualizacji: '2026-08-20',
  kategoria: 'Koszty i wycena',
  tagi: [
    'ile kosztuje AI agent',
    'koszt AI agenta',
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
      tekst: 'Wdrożenie AI agenta dla firmy zaczyna się od 1790 zł netto za agenta do jednego zadania, gotowego w 1-2 dni robocze. Agent z integracjami to koszt od 2500 zł netto. Opieka to 99-599 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, jeśli przekażemy Ci infrastrukturę.',
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
          opis: 'agent z integracją (kalendarz, CRM, poczta)',
          zrodlo: 'widełki 2026 niżej na tej stronie',
        },
        {
          wartosc: '1490 zł netto',
          opis: 'audyt przed wdrożeniem, odliczany od ceny wdrożenia',
          zrodlo: 'widełki 2026 niżej na tej stronie',
        },
        {
          wartosc: '99-599 zł netto/mies.',
          opis: 'opieka, gdy projekt zostaje u nas; 0 zł po przekazaniu infrastruktury',
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
          'Agent z integracją (kalendarz, CRM, poczta)',
          'od 2500 zł',
          'ustalany przy wycenie',
        ],
        [
          'Audyt przed wdrożeniem (odliczany od wdrożenia)',
          '1490 zł',
          '5 dni roboczych',
        ],
        [
          'Opieka miesięczna',
          '99 do 599 zł',
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
        'Po starcie wybierasz jedną z dwóch dróg: infrastruktura zostaje u nas i płacisz opiekę 99-599 zł netto miesięcznie, albo przekazujemy Ci infrastrukturę i abonament wynosi 0 zł.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Czym AI agent różni się od chatbota i czemu kosztuje więcej?',
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
      podpis: 'Czym AI agent różni się od chatbota i czemu kosztuje więcej?',
      naglowki: [
        'Cecha',
        'Chatbot',
        'AI agent',
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
    {
      typ: 'sekcja',
      naglowek: 'Od czego zależy cena agenta AI',
      wariant: 'top',
      akapity: [
        'Koszt AI agenta nie bierze się z liczby ekranów. Bierze się z zakresu pracy i głębokości integracji.',
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
      naglowek: 'Jak policzyć zwrot z AI agenta?',
      wariant: 'quiet',
      akapity: [
        'Zwrot z agenta liczy się tak samo jak z każdej automatyzacji, tylko skala bywa większa, bo agent wykonuje cały ciąg pracy, nie pojedynczą odpowiedź.',
        'Bierzesz godziny, które dziś znikają na powtarzalnym procesie, mnożysz przez koszt godziny i dodajesz leady, które dziś przepadają, bo nikt nie zareagował na czas. To porównujesz z kosztem setupu i opieki.',
        'Nasze realne przykłady pokazują skalę: zebranie 1000 rekordów firm z publicznych wizytówek Google Maps zajmuje u nas 20-30 minut, ręcznie to około 3 minuty na rekord, czyli około 50 godzin.',
        'Drugi przykład: w Instytucie Kryptografii 80% draftów e-maili jest gotowych do wysyłki przy 580 mailach tygodniowo w szczycie.',
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
      pytanie: 'Czym AI agent różni się od chatbota?',
      odpowiedz:
        'Chatbot odpowiada na pytania, agent wykonuje zadania. Agent łączy się z kalendarzem, CRM i systemami i sam prowadzi proces: umawia, zapisuje dane, wysyła potwierdzenia. Dlatego kosztuje więcej niż chatbot. To nie cena za rozmowę, tylko za pracę, którą agent robi zamiast człowieka.',
    },
    {
      pytanie: 'Od czego zależy koszt wdrożenia AI agenta?',
      odpowiedz:
        'Od zakresu zadań, liczby integracji, wymaganego poziomu pewności, decyzyjności agenta i jakości Twoich danych. Prosty agent do jednego zadania to inny budżet niż agent prowadzący cały proces obsługi klienta. Każda integracja z systemem to osobna robota, a wyższa stawka błędu oznacza więcej testów, więc wyższy koszt.',
    },
    {
      pytanie: 'Jak policzyć, czy AI agent się zwróci?',
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
        'Ten poradnik dotyczy konkretnie AI agenta, czyli systemu, który sam wykonuje zadania. Wpis o koszcie wdrożenia AI w małej firmie mówi o całym wdrożeniu szerzej, łącznie z prostszymi chatbotami i automatyzacjami. Jeśli wybierasz między rozwiązaniami, zacznij od szerszego wpisu, a po szczegóły o agencie wróć tutaj.',
    },
  ],

  queries: [
    'ile kosztuje wdrożenie AI agenta dla firmy',
    'koszt AI agenta',
    'cena agenta AI dla firmy',
    'wdrożenie agenta AI cena',
  ],

  powiazaneUslugi: [
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
      opis: 'Tańszy pierwszy krok: chatbot, który odpowiada klientom i rośnie do Agenta.',
    },
    {
      etykieta: 'Voiceboty: bot telefoniczny',
      href: '/uslugi/voiceboty',
      opis: 'Agent w akcji na telefonie: odbiera połączenia 24/7 i umawia wizyty w kalendarzu.',
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
      opis: 'System AI dla biura obsługi klienta Instytutu Kryptografii: 75% maili wymaga tylko drobnej korekty, drafty gotowe do jednego kliknięcia. Case study.',
    },
  ],
};
