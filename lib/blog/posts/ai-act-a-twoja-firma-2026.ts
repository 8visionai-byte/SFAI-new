import type { Post } from '../types';

/**
 * WPIS 4: AI Act a Twoja firma: co musisz wiedzieć przed wdrożeniem (2026)
 *
 * Lead answer-first PRAWDZIWY i ostrożny (zero porady prawnej podanej jak pewnik).
 * Treść: kategorie ryzyka w języku właściciela MŚP, obowiązek jawności AI, RODO vs
 * AI Act, praktyczna checklista przed wdrożeniem chatbota/automatyzacji.
 */
export const aiActATwojaFirma: Post = {
  slug: 'ai-act-a-twoja-firma-2026',
  tytul: 'AI Act a Twoja firma: co musisz wiedzieć przed wdrożeniem (2026)',

  lead:
    'AI Act to unijne przepisy, które dzielą systemy AI według ryzyka i nakładają obowiązki głównie na te bardziej ryzykowne. Dla typowej małej firmy korzystającej z chatbota czy automatyzacji najważniejsze jest dziś, by jasno informować, że klient rozmawia z AI, i wiedzieć, gdzie trafiają dane. To wpis informacyjny, a nie porada prawna, więc przy wątpliwościach skonsultuj swój przypadek z prawnikiem.',

  metaTitle: 'AI Act a Twoja firma: co wiedzieć (2026)',
  metaDescription:
    'AI Act a Twoja firma w 2026: co realnie oznaczają kategorie ryzyka, jakie obowiązki dotyczą wdrożeń w MŚP i o co zadbać, zanim wdrożysz chatbota lub automatyzację.',

  data: '2026-06-15',
  dataAktualizacji: '2026-06-15',
  kategoria: 'Prawo i AI Act',
  tagi: ['AI Act', 'zgodność AI', 'prawo AI 2026', 'wdrożenie AI a przepisy'],

  tresc: [
    {
      typ: 'akapit',
      tekst:
        'Najpierw krótka odpowiedź. AI Act nie zakazuje małym firmom używania AI. Dzieli systemy AI na cztery koszyki ryzyka i mówi: im większe ryzyko dla ludzi, tym więcej obowiązków. Większość wdrożeń w MŚP, czyli chatbot na stronie, voicebot na infolinii czy automatyzacja maili, to najniższe ryzyko. Twój główny obowiązek przy takim wdrożeniu jest prosty: człowiek musi wiedzieć, że rozmawia z AI, a nie z pracownikiem.',
    },
    {
      typ: 'cytat',
      tekst:
        'Chatbot tylko odpowiada. Agent działa. Im więcej Agent robi za człowieka, tym ważniejsze, żeby człowiek wiedział, że to maszyna i kto za nią odpowiada.',
    },
    {
      typ: 'naglowek',
      tekst: 'Co to jest AI Act i od kiedy obowiązuje?',
    },
    {
      typ: 'akapit',
      tekst:
        'AI Act to rozporządzenie Unii Europejskiej o sztucznej inteligencji. Pierwsze w takiej skali na świecie. Działa wprost w każdym kraju UE, w tym w Polsce, bez potrzeby osobnej ustawy krajowej. Wszedł w życie w 2024 roku, ale nie od razu w całości. Przepisy włączają się etapami.',
    },
    {
      typ: 'lista',
      punkty: [
        'Najpierw, na początku 2025 roku, ruszyły zakazy praktyk uznanych za niedopuszczalne oraz obowiązek podstawowej wiedzy o AI w zespole.',
        'W połowie 2025 roku weszły zasady dla modeli ogólnego przeznaczenia, czyli dla dostawców dużych modeli, na których stoi wiele narzędzi.',
        'Pełne stosowanie pozostałych obowiązków przypada na sierpień 2026 roku. To data, którą warto mieć z tyłu głowy przy planach wdrożeń.',
        'Część obowiązków dla systemów wysokiego ryzyka wbudowanych w produkty ma jeszcze dłuższe okresy przejściowe.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Dla właściciela firmy znaczy to jedno. Sierpień 2026 to nie moment, w którym nagle wszystko trzeba zmienić. To raczej linia, do której dobrze poukładać porządek wokół tego, jak i gdzie używasz AI.',
    },
    {
      typ: 'naglowek',
      tekst: 'Jakie są kategorie ryzyka w AI Act?',
    },
    {
      typ: 'akapit',
      tekst:
        'AI Act patrzy nie na technologię, tylko na to, do czego jej używasz. Ten sam model może być nieszkodliwy w jednym zastosowaniu i ryzykowny w innym. Stąd cztery koszyki.',
    },
    {
      typ: 'tabela',
      naglowki: ['Kategoria ryzyka', 'Co to znaczy', 'Przykład', 'Co z tego dla MŚP'],
      wiersze: [
        [
          'Niedopuszczalne',
          'Zakazane wprost',
          'Scoring społeczny obywateli, manipulacja podatnościami ludzi',
          'Nie dotyczy normalnej firmy. Po prostu tego nie robisz',
        ],
        [
          'Wysokie',
          'Dozwolone, ale z twardymi wymogami',
          'AI do selekcji CV, oceny zdolności kredytowej, w medycynie',
          'Dotyczy, jeśli AI decyduje o ludziach. Wtedy potrzeba dokumentacji i nadzoru człowieka',
        ],
        [
          'Ograniczone',
          'Dozwolone z obowiązkiem jawności',
          'Chatbot, voicebot, treści generowane przez AI',
          'Tu jest większość wdrożeń w MŚP. Kluczowy obowiązek to informowanie, że to AI',
        ],
        [
          'Minimalne',
          'Bez dodatkowych obowiązków z AI Act',
          'Filtr spamu, podpowiedzi w edytorze, prosta automatyzacja',
          'Działasz normalnie. Zdrowy rozsądek i RODO i tak obowiązują',
        ],
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Najważniejszy wniosek. Jeśli AI u Ciebie rozmawia z klientem albo generuje treści, jesteś najczęściej w koszyku ograniczonego ryzyka. Jeśli AI sama podejmuje decyzje o ludziach, na przykład kto dostanie pracę albo kredyt, wchodzisz w wysokie ryzyko i tu trzeba być ostrożnym.',
    },
    {
      typ: 'naglowek',
      tekst: 'Co AI Act oznacza dla firmy wdrażającej chatbota lub automatyzację?',
    },
    {
      typ: 'akapit',
      tekst:
        'Weźmy konkret. Wdrażasz chatbota na stronę albo automatyzację, która sama odpisuje na maile i kwalifikuje leady. W praktyce sprowadza się to do kilku rzeczy, które i tak są zwykłą uczciwością wobec klienta.',
    },
    {
      typ: 'lista',
      punkty: [
        'Jawność. Klient ma wiedzieć, że pisze do AI, a nie do człowieka. Wystarczy krótka, czytelna informacja w oknie bota lub w stopce wiadomości.',
        'Oznaczanie treści AI. Jeśli AI generuje teksty czy obrazy, które idą do odbiorcy, dobrze to oznaczać. Przepisy idą w stronę przejrzystości takich treści.',
        'Człowiek w pętli przy ważnych sprawach. Reklamacja, sprawa trudna, decyzja o pieniądzach. AI może przygotować, ale finalnie zatwierdza człowiek.',
        'Świadomy zespół. Osoby, które obsługują narzędzie AI, mają rozumieć, co ono robi i gdzie są jego granice. To też wymóg z AI Act.',
        'Porządek w danych. Wiesz, jakie dane trafiają do systemu i gdzie są przetwarzane. O tym więcej za chwilę przy RODO.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'To nasza filozofia od początku. Budujemy Agentów, którzy działają, ale nie udają ludzi. W naszych wdrożeniach klient jest informowany, że rozmawia z AI, a przy trudniejszych sprawach Agent przekazuje sprawę człowiekowi. Manifest brzmi prosto: AI nie zastępuje ludzi, AI zastępuje to, co ich zatrzymuje. Zgodność z tym duchem idzie w parze.',
    },
    {
      typ: 'naglowek',
      tekst: 'RODO a AI Act, to nie to samo. Czym się różnią?',
    },
    {
      typ: 'akapit',
      tekst:
        'To częste nieporozumienie. RODO i AI Act to dwa różne przepisy, które działają obok siebie. Zgodność z jednym nie zwalnia z drugiego. Najprościej tak: RODO pilnuje danych osobowych, AI Act pilnuje samych systemów AI.',
    },
    {
      typ: 'tabela',
      naglowki: ['Pytanie', 'RODO', 'AI Act'],
      wiersze: [
        [
          'Czego pilnuje?',
          'Danych osobowych: zbierania, przetwarzania, ochrony',
          'Systemów AI: jak są budowane i używane wg ryzyka',
        ],
        [
          'Kiedy dotyczy?',
          'Zawsze, gdy przetwarzasz dane osób',
          'Gdy używasz systemu AI, zakres zależy od kategorii ryzyka',
        ],
        [
          'Główny obowiązek dla MŚP',
          'Podstawa prawna, zgody, bezpieczeństwo danych',
          'Jawność, że to AI, i nadzór człowieka przy ryzyku',
        ],
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Przykład z życia. Chatbot zbiera od klienta imię i mail, żeby umówić spotkanie. RODO pyta: na jakiej podstawie i czy dane są bezpieczne. AI Act pyta: czy klient wie, że rozmawia z AI. Oba pytania trzeba odhaczyć. Dlatego u nas standardem jest, że dane klientów przetwarzamy w ramach Unii Europejskiej, a nie wozimy ich w nieznane.',
    },
    {
      typ: 'naglowek',
      tekst: 'Od czego zacząć? Praktyczne kroki przed wdrożeniem',
    },
    {
      typ: 'akapit',
      tekst:
        'Nie potrzebujesz działu prawnego, żeby ruszyć z głową. Potrzebujesz krótkiej listy pytań, na które znasz odpowiedź zanim AI pójdzie do klientów.',
    },
    {
      typ: 'lista',
      punkty: [
        'Nazwij zastosowanie. Do czego dokładnie używasz AI i czy podejmuje decyzje o ludziach. To ustawia Twój koszyk ryzyka.',
        'Dodaj jawność. Upewnij się, że klient widzi, że to AI. Jedno zdanie w bocie lub w mailu wystarczy.',
        'Sprawdź dane. Jakie dane osobowe wchodzą do systemu, na jakiej podstawie i gdzie są przetwarzane. Najlepiej w UE.',
        'Zostaw człowieka w pętli. Ustal, które sprawy AI załatwia sama, a które przekazuje pracownikowi.',
        'Przeszkol zespół. Osoby przy narzędziu mają wiedzieć, co ono potrafi, a czego nie.',
        'Trzymaj prosty ślad. Notatka, jak działa system i jak informujesz klientów. To ułatwia życie, gdyby ktoś zapytał.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Dobra wiadomość dla MŚP. Większość tych punktów to nie biurokracja, tylko porządna robota, która i tak buduje zaufanie klienta. Wdrożenie zgodne z AI Act i wdrożenie, które ludzie lubią, to najczęściej to samo wdrożenie.',
    },
    {
      typ: 'akapit',
      tekst:
        'I na koniec szczerze. To wpis informacyjny, nie porada prawna. Prawo się doprecyzowuje, a każdy przypadek jest inny. Jeśli planujesz wdrożenie, które dotyka wysokiego ryzyka albo wrażliwych danych, skonsultuj swój konkretny przypadek z prawnikiem. My pomożemy zbudować Agenta, który działa i jest jawny wobec klientów od pierwszego dnia.',
    },
  ],

  faq: [
    {
      pytanie: 'Czy AI Act zakazuje małym firmom używania chatbotów?',
      odpowiedz:
        'Nie. Chatbot i voicebot to najczęściej kategoria ograniczonego ryzyka, która jest dozwolona. Główny obowiązek to jawność, czyli poinformowanie klienta, że rozmawia z AI, a nie z człowiekiem. Zakazy w AI Act dotyczą praktyk niedopuszczalnych, jak scoring społeczny, a nie zwykłej obsługi klienta.',
    },
    {
      pytanie: 'Czy jak spełniam RODO, to spełniam też AI Act?',
      odpowiedz:
        'Nie, to dwa osobne przepisy działające obok siebie. RODO pilnuje danych osobowych, AI Act pilnuje systemów AI według ich ryzyka. Spełnienie jednego nie zwalnia z drugiego. Przy wdrożeniu chatbota trzeba zadbać i o podstawę przetwarzania danych z RODO, i o jawność AI z AI Act.',
    },
    {
      pytanie: 'Od kiedy AI Act obowiązuje w pełni?',
      odpowiedz:
        'AI Act wszedł w życie w 2024 roku, ale działa etapami. Zakazy ruszyły na początku 2025 roku, zasady dla dużych modeli w połowie 2025 roku, a pełne stosowanie pozostałych obowiązków przypada na sierpień 2026 roku. Niektóre wymogi dla systemów wysokiego ryzyka mają jeszcze dłuższe okresy przejściowe.',
    },
  ],

  queries: [
    'ai act a firma',
    'ai act 2026 obowiązki',
    'ai act dla małych firm',
    'co to jest ai act',
  ],
};
