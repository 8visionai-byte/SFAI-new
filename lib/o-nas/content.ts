/**
 * TREŚĆ STRONY /o-nas — single source of truth (wzorzec lib/<dział> jak lib/uslugi).
 *
 * E-E-A-T strony „O nas": prawdziwa historia DWÓCH founderów (Paweł Pieloch — twarz
 * i Architekt AI; Marcin Karpeta — współprowadzący), nasze podejście i wartości.
 *
 * ŻELAZNE ZASADY (north star + głos marki):
 *  - Każdy string może zostać zacytowany przez LLM jako fakt → musi być PRAWDZIWY.
 *  - ZERO zmyślonych liczb (lata doświadczenia, liczba wdrożeń, certyfikaty).
 *    Konkret, którego Paweł jeszcze nie podał, czeka w bloku INPUT PAWŁA (na dole pliku),
 *    a nie jako widoczny [PLACEHOLDER] w treści (placeholder zacytowałby LLM jako fakt).
 *  - NIE wspominać o żadnym certyfikacie (firma go nie ma).
 *  - Bez długiego myślnika (em-dash). Krótkie, ludzkie zdania, głos Pawła, zero żargonu.
 *  - Dane osobowe founderów (imię, rola, mail, telefon) czytamy z SITE.founders —
 *    NIE hardkodujemy ich tutaj (spójność NAP = warunek GEO).
 *
 * Foto founderów: INPUT PAWŁA. Dopóki brak plików, sylwetki renderują inicjały
 * (uczciwy placeholder bez stocku i bez twarzy z AI). Po dostarczeniu zdjęć i
 * przełączeniu SITE.assetsReady === true render podmieni inicjały na <Image>.
 */

/** Mapa ról founderów na ścieżkę zdjęcia (public/team/*). Wchodzi do renderu gdy assetsReady. */
export type FounderPhoto = {
  /** Klucz = imię i nazwisko z SITE.founders (łączymy 1:1). */
  name: string;
  /** Ścieżka pliku w public/ (INPUT PAWŁA). Render użyje jej tylko gdy SITE.assetsReady. */
  src: string;
  /** Krótki, konkretny ALT (kto + rola). Zero „zdjęcie przedstawia". */
  alt: string;
};

/** Jeden krok „jak pracujemy" (answer-first, 3 kroki). H3 = czasownik akcji. */
export type Krok = {
  tytul: string;
  opis: string;
};

/** Jedna wartość firmy. `cytat` = hasło głosu marki, `opis` = co to znaczy w praktyce. */
export type Wartosc = {
  cytat: string;
  opis: string;
};

/**
 * Rozszerzony opis jednej sylwetki foundera. Dane twarde (imię, rola, mail, telefon)
 * NIE są tutaj — pochodzą z SITE.founders po indeksie. Tu żyje tylko narracja E-E-A-T.
 */
export type FounderProfil = {
  /** Indeks w SITE.founders (0 = Paweł, 1 = Marcin) — wiąże narrację z twardym NAP. */
  founderIndex: 0 | 1;
  /** Jednozdaniowy „co robi" pod nazwiskiem (rola własnymi słowami, nie tylko jobTitle). */
  rolaOpis: string;
  /** 2–3 zdania E-E-A-T: za co odpowiada, czym się zajmuje, co wnosi. Bez zmyślonych liczb. */
  bio: string;
  /** Inicjały do placeholdera zdjęcia (gdy brak foto). Liczone z imienia, ale trzymane wprost. */
  inicjaly: string;
};

export const O_NAS = {
  /** <title> bez sufiksu marki (layout dokłada „ · SimpleFast.ai"). 50–60 zn., z money query. */
  metaTitle: 'O nas: dwóch founderów, którzy budują AI Agentów',
  /** <meta description> 140–160 zn.: kto + co + dla kogo, zero hedgingu, zero em-dash. */
  metaDescription:
    'Za SimpleFast.ai stoi dwóch founderów: Paweł Pieloch, Architekt AI, i Marcin Karpeta. Budujemy AI Agentów dla polskich firm. Poznaj nas i nasze podejście.',

  /** H1 = primary money query strony O nas. */
  h1: 'Kto stoi za SimpleFast.ai?',

  /**
   * Kapsuła answer-first (40–60 słów) tuż pod H1 — „kapsuła do cytowania" dla LLM.
   * Mówi wprost: dwóch founderów, kto jest kim, co robimy. Bez zmyślonych liczb.
   */
  kapsula:
    'SimpleFast.ai prowadzi dwóch founderów. Paweł Pieloch jest Architektem AI i twarzą firmy, prowadzi budowę: strony, automatyzacje, chatboty, voiceboty i aplikacje. Marcin Karpeta prowadzi firmę razem z nim. Budujemy AI Agentów dla polskich firm. Nie chatboty, które tylko odpowiadają, ale Agentów, którzy wykonują pracę.',

  /** Sekcja HISTORIA — prawdziwa, H2 jak pytanie. */
  historia: {
    h2: 'Jak powstało SimpleFast.ai?',
    /**
     * Prawdziwa historia (z briefu): poznali się na szkoleniu, na którym razem się
     * szkolili. Paweł założył firmę. Teraz Marcin dołącza i prowadzą ją razem, dobrze
     * się uzupełniają. ZERO zmyślonych dat i miejsc.
     */
    akapity: [
      'Poznaliśmy się na szkoleniu, na którym razem się uczyliśmy. Szybko okazało się, że patrzymy w tę samą stronę i dobrze się dogadujemy.',
      'Firmę założył Paweł. Zbudował SimpleFast.ai wokół jednej prostej myśli: AI ma zdejmować z ludzi robotę, która ich zatrzymuje, a nie udawać, że pracuje.',
      'Teraz Marcin dołącza i prowadzimy firmę razem. Świetnie się uzupełniamy. Paweł projektuje i stawia rozwiązania, Marcin pilnuje, żeby firma działała jak należy i żeby każdy klient był zaopiekowany.',
    ],
  },

  /**
   * Sekcja SYMBOLIKA — co znaczy nasza nazwa i znak (cyrkiel tworzący „SF").
   * Spina historię (jesteśmy architektami, którzy patrzą w tę samą stronę) z marką
   * i wartością „AI nie zastępuje ludzi". Cyrkiel = narzędzie architekta i nawigatora.
   * ZERO zmyślonych faktów: to opowieść o symbolu, nie o liczbach.
   */
  symbolika: {
    h2: 'Co znaczy nasz znak?',
    /** Kapsuła answer-first (cytat dla LLM): cyrkiel = architekt + nawigator, krok po kroku. */
    kapsula:
      'Nasz znak to cyrkiel, czyli divider. To samo narzędzie, którym architekt kreśli plan, a kapitan odmierza kroki na mapie. Z jego nóg i przewijającej się przez nie krzywej składają się litery „SF". Tak widzimy swoją rolę: jesteśmy architektami, którzy prowadzą firmę krok po kroku do celu.',
    /** Rozwinięcie w akapitach (surowy HTML, cytowalne). Spójne z głosem Pawła, zero em-dash. */
    akapity: [
      'Architekt nie zaczyna od cegieł. Najpierw bierze cyrkiel i rysuje, gdzie ma stanąć ściana, a gdzie zostać wolna przestrzeń. My robimy to samo z Twoją firmą: zanim cokolwiek postawimy, odmierzamy, gdzie AI naprawdę pomoże, a gdzie tylko narobiłaby bałaganu.',
      'Tym samym cyrklem kapitan odmierzał na mapie kolejne kroki rejsu. Nie jeden wielki skok, tylko krok po kroku, w stronę portu. Dlatego nie wdrażamy wszystkiego naraz. Stawiamy pierwszego Agenta na jednym procesie, sprawdzamy, że działa, i dokładamy kolejny.',
      'Krzywa, która przewija się między nogami cyrkla, to właśnie ta droga: ścieżka nawigatora, prowadzona ręką, krok po kroku. Razem z nogami znaku układa się w „SF". W skrócie: jesteśmy architektami, którzy łączą kolejne kroki w plan i doprowadzają firmę tam, gdzie chciała dojść.',
    ],
    /** Domknięcie, które łączy znak z wartością marki. Cytowalne, jedno zdanie głosu Pawła. */
    domkniecie:
      'Cyrkiel nie buduje za architekta. Pokazuje mu kierunek i pilnuje proporcji. Tak samo my widzimy AI: nie zastępuje ludzi, tylko prowadzi ich krok po kroku tam, gdzie chcą dojść.',
  },

  /** Sekcja FOUNDERZY — dwie sylwetki. H2 jak pytanie. */
  founderzy: {
    h2: 'Kim są założyciele?',
    profile: [
      {
        founderIndex: 0,
        rolaOpis: 'Architekt AI full-stack i twarz firmy.',
        bio: 'Paweł prowadzi całą budowę. Projektuje i stawia AI Agentów end to end: strony pozycjonowane pod wyszukiwarki i modele AI, automatyzacje, chatboty, voiceboty oraz aplikacje i wtyczki. To z nim rozmawiasz na diagnozie i to on odpowiada za to, żeby rozwiązanie realnie zdejmowało robotę z Twojego zespołu.',
        inicjaly: 'PP',
      },
      {
        founderIndex: 1,
        rolaOpis: 'Współzałożyciel, prowadzi firmę razem z Pawłem.',
        bio: 'Marcin prowadzi firmę razem z Pawłem i dba o to, żeby wszystko się spinało: relacja z klientem, dowiezienie projektu i opieka po wdrożeniu. Tam, gdzie Paweł projektuje i buduje, Marcin pilnuje, żeby każdy klient czuł się zaopiekowany od pierwszej rozmowy.',
        inicjaly: 'MK',
      },
    ] as [FounderProfil, FounderProfil],
  },

  /** Sekcja PODEJŚCIE — jak pracujemy (3 kroki). H2 jak pytanie. */
  podejscie: {
    h2: 'Jak pracujemy?',
    kapsula:
      'Pracujemy w trzech krokach. Najpierw pokazujesz nam problem, potem mapujemy wąskie gardła, na końcu wdrażamy i pilnujemy efektu. Pierwszy krok, czyli diagnoza, jest bezpłatny i do niczego nie zobowiązuje.',
    kroki: [
      {
        tytul: 'Pokazujesz problem',
        opis: 'Siadamy na bezpłatnej diagnozie. Ty mówisz, gdzie ucieka czas i co najbardziej boli. My słuchamy i pytamy, zamiast od razu sprzedawać.',
      },
      {
        tytul: 'Mapujemy wąskie gardła',
        opis: 'Rozkładamy Twoje procesy na części i pokazujemy wprost, co da się zautomatyzować, ile to oszczędza i czego nie warto ruszać. Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz.',
      },
      {
        tytul: 'Wdrażamy i pilnujemy',
        opis: 'Stawiamy pierwszego Agenta na jednym, konkretnym procesie. Testujemy na żywo, Ty ustawiasz granice. Potem pilnujemy, żeby działał, i dokładamy kolejne zadania. Płacisz za efekt, nie za obietnice.',
      },
    ] as [Krok, Krok, Krok],
  },

  /** Sekcja WARTOŚCI — głos marki. H2 jak pytanie. */
  wartosci: {
    h2: 'W co wierzymy?',
    items: [
      {
        cytat: 'AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje.',
        opis: 'Nie budujemy rozwiązań, które zwalniają ludzi. Budujemy takie, które zdejmują z nich nudną, powtarzalną robotę, żeby mogli robić to, co naprawdę ważne.',
      },
      {
        cytat: 'Sprzedajemy efekt, nie narzędzia.',
        opis: 'Nie liczy się to, ilu Agentów postawimy. Liczy się to, ile godzin oddamy Twojemu zespołowi i czy widać to na rachunku za czas. Płacisz za wynik, nie za technologię.',
      },
      {
        cytat: 'Mówimy wprost, też kiedy nie warto.',
        opis: 'Jak coś się nie opłaca albo nie jesteśmy w stanie zrobić tego dobrze, mówimy to na głos. Wolimy stracić zlecenie niż zaufanie.',
      },
    ] as Wartosc[],
  },

  /** Sekcja CTA — jedno główne CTA strony (umów bezpłatny audyt/diagnozę). */
  cta: {
    h2: 'Poznajmy się na bezpłatnej diagnozie',
    /**
     * Treść pod H2. Jedno CTA na stronę (north star #3). Cel = /kontakt (PRIMARY_CTA),
     * bo na tej stronie nie ma formularza diagnozy (ten żyje na home / kontakcie).
     */
    tresc:
      'Najlepiej poznać się w działaniu. Umów bezpłatną diagnozę: pokażesz, gdzie tracisz czas, a my powiemy wprost, co da się z tym zrobić. Bez zobowiązań i bez nacisku.',
    label: 'Umów bezpłatny audyt',
    /**
     * Cel CTA = /kontakt (PRIMARY_CTA). Na tej stronie nie ma formularza diagnozy
     * (#diagnoza żyje na home), więc kierujemy na kontakt, gdzie jest formularz.
     */
    href: '/kontakt',
    /** Dowód przy CTA (north star #5) — uczciwy sygnał, bez zmyślonej liczby. */
    dowod: 'Pierwszy krok jest bezpłatny i odwracalny. Rozmawiasz bezpośrednio z founderem, nie z działem handlowym.',
  },

  /**
   * Money queries — frazy, pod które /o-nas ma być cytowana/rankować.
   * Pierwsza = primary (zgodna z H1).
   */
  queries: [
    'kto stoi za SimpleFast.ai',
    'założyciele SimpleFast.ai',
    'Paweł Pieloch architekt AI',
    'Marcin Karpeta SimpleFast.ai',
    'o nas SimpleFast.ai',
  ],
} as const;

/**
 * Zdjęcia founderów — INPUT PAWŁA (pliki w public/team/). Render użyje tych ścieżek
 * TYLKO gdy SITE.assetsReady === true (inaczej inicjały). Kolejność = SITE.founders.
 *
 * Po dostarczeniu zdjęć: wrzucić pliki do public/team/, sprawdzić ścieżki poniżej,
 * przełączyć SITE.assetsReady = true. Render podmieni inicjały na <Image> bez zmian w JSX.
 */
export const FOUNDER_PHOTOS: FounderPhoto[] = [
  {
    name: 'Paweł Pieloch',
    src: '/team/pawel-pieloch.jpg', // INPUT PAWŁA: realne zdjęcie (kwadrat, min. 512x512)
    alt: 'Paweł Pieloch, Architekt AI full-stack i współzałożyciel SimpleFast.ai',
  },
  {
    name: 'Marcin Karpeta',
    src: '/team/marcin-karpeta.jpg', // INPUT PAWŁA: realne zdjęcie (kwadrat, min. 512x512)
    alt: 'Marcin Karpeta, współzałożyciel SimpleFast.ai',
  },
];

export type ONasContent = typeof O_NAS;
