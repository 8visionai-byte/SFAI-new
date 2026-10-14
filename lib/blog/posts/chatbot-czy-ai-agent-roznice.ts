import type { Post } from '../types';

/**
 * WPIS 2: Chatbot czy agent AI: czym się różnią i co wybrać dla firmy
 *
 * Treść (faza 4): answer-first, nagłówki jak pytania, tabela różnic,
 * realne przykłady z wdrożeń, wskazówka „od czego zacząć". Głos Pawła:
 * krótkie zdania, zero żargonu, zero zmyślonych liczb/cen.
 *
 * 2026-10-14 (operacja naprawcza SEO, zwiad naprawa-2026-10-13, klaster
 * „agenci-ai"): szyk „agent AI" zamiast „AI Agent" w tytule, treści, tabeli,
 * FAQ, tagach i queries (tak wpisują ludzie; pomiar zwiadu: 12x „AI Agent",
 * 3x „agent AI"). Samodzielne „Agent" w środku zdania pisane małą literą,
 * spójnie z „agent AI". Akapit z widełkami w USD bez źródła zastąpiony
 * naszymi cenami netto w zł z cenników usług (chatboty-cennik.ts,
 * voiceboty-cennik.ts). „80% sprawy" bez źródła zamienione na „większość
 * sprawy", „Połowa takich osób odpada" bez źródła na „Część". Dwa zdania z wzorem „nie tylko X, ale i Y" przepisane.
 * Pierwsza karta usług: /uslugi/agenci-ai, druga: /uslugi/chatboty/cennik.
 * Adres (slug) bez zmian. <title> po sufiksie marki: 41 + 16 = 57 znaków.
 */
export const chatbotCzyAiAgent: Post = {
  slug: 'chatbot-czy-ai-agent-roznice',
  tytul: 'Chatbot czy agent AI: czym się różnią i co wybrać dla firmy',

  lead:
    'Chatbot odpowiada na pytania, agent AI wykonuje całe zadania. Chatbot poda godziny otwarcia i cennik. Agent sprawdzi kalendarz, zaproponuje termin, zapisze wizytę i wyśle potwierdzenie. Dla większości firm dobrym startem jest chatbot, który później rozwijasz w agenta, gdy chcesz, żeby AI zaczęło też załatwiać sprawy.',

  metaTitle: 'Chatbot czy agent AI: różnice i co wybrać',
  metaDescription:
    'Chatbot czy agent AI dla firmy? Czym dokładnie się różnią, co każdy z nich robi i czego nie, oraz jak wybrać i zacząć od mniejszego, odwracalnego kroku.',

  data: '2026-06-15',
  dataAktualizacji: '2026-10-14',
  kategoria: 'Chatboty i Agenci',
  tagi: ['chatbot', 'agent AI', 'różnice chatbot agent', 'co wybrać dla firmy'],

  /* v22 (PLAN-v22 §2.2, skarga Pawła 2026-08-18 o „jednej ścianie tekstu"):
     wpis szedł dotąd jako ciąg <h2> i <p> BEZ ANI JEDNEJ RAMKI (pomiar przed
     rundą: 1 karta na stronie, i to dopiero FAQ na dole). Teraz każda sekcja
     jedzie w karcie `.inf-card` z tonem wpisu, tabela wjeżdża w kartę i dostaje
     widoczny <caption>, a ścieżka „od chatbota do Agenta" jedzie jako <ol>
     z numerami w kółkach.
     ŻELAZNE: ZERO zmian słów. Ani jedno zdanie nie zostało przepisane,
     skrócone ani dopisane; kolejność merytoryczna 1:1, wszystkie H2 zostają
     H2, tabela zostaje prawdziwą <table> ze scope. Jedyny nowy widoczny napis
     to podpis tabeli, skopiowany znak w znak z nagłówka H2 tej strony. */
  tresc: [
    {
      typ: 'akapit',
      tekst:
        'Różnica jest prosta. Chatbot to rozmowa. Agent AI to działanie. Chatbot odpowie na pytanie i na tym kończy. Agent dostaje to samo pytanie, ale dowozi efekt: sprawdza dane, podejmuje decyzję, wykonuje akcję w Twoim systemie i odpisuje, że zrobione. Jeśli pamiętasz tylko jedno zdanie z tego wpisu, niech będzie to: chatbot odpowiada, agent działa.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Czym dokładnie różni się chatbot od agenta AI?',
      akapity: [
        'Chatbot pracuje na tekście. Zna Twoją ofertę, FAQ, regulamin i z tego buduje odpowiedzi. Świetnie radzi sobie z pytaniami „ile kosztuje", „do której otwarte", „czy robicie dostawę". Problem zaczyna się, gdy klient chce coś załatwić, a nie tylko się dowiedzieć. Chatbot poda godziny wolnych terminów. Ale samej wizyty nie zapisze, bo nie ma dostępu do kalendarza i nie umie wykonać akcji.',
        'Agent AI ma to, czego chatbotowi brakuje: dostęp do narzędzi i prawo do działania. Podłączasz go do kalendarza, CRM, skrzynki mailowej, bazy klientów albo systemu rezerwacji. Wtedy agent nie opisuje, co można zrobić. On to robi. Sprawdza, umawia, wystawia, aktualizuje, wysyła. Klient nie dostaje instrukcji „proszę zadzwonić, żeby umówić". Dostaje gotowy termin i potwierdzenie na mailu.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      /* Podpis = nagłówek H2 sekcji nad tabelą, znak w znak. */
      podpis: 'Czym dokładnie różni się chatbot od agenta AI?',
      naglowki: ['Cecha', 'Chatbot', 'Agent AI'],
      wiersze: [
        ['Co robi', 'Odpowiada na pytania', 'Wykonuje całe zadanie'],
        ['Dostęp do systemów', 'Zwykle brak', 'Kalendarz, CRM, mail, baza'],
        ['Przykład akcji', 'Podaje wolne godziny', 'Zapisuje wizytę i potwierdza'],
        ['Efekt rozmowy', 'Klient wie, co zrobić', 'Sprawa jest załatwiona'],
        ['Czas wdrożenia', 'Krótszy', 'Dłuższy, więcej integracji'],
        ['Gdy coś pójdzie nie tak', 'Zła odpowiedź', 'Zła akcja, więc potrzeba zabezpieczeń'],
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Kiedy wystarczy chatbot, a kiedy potrzebujesz agenta AI?',
      wariant: 'edge',
      akapity: [
        'Nie każda firma od razu potrzebuje agenta. Czasem chatbot załatwia większość spraw za ułamek wysiłku. Zacznij od pytania: czy klient ma się czegoś dowiedzieć, czy coś załatwić? Jeśli głównie pytania, chatbot wystarczy. Jeśli klient chce zarezerwować, zamówić, zmienić termin albo zgłosić sprawę, wchodzi agent AI.',
      ],
      punkty: [
        'Chatbot wystarczy: odpowiedzi na FAQ, cennik, godziny, status „czy macie to na stanie", pierwszy filtr zgłoszeń przed kontaktem z człowiekiem.',
        'Agent się opłaca: umawianie i przekładanie wizyt, rezerwacje, składanie zamówień, kwalifikacja leadów, wystawianie dokumentów, aktualizacja danych w CRM.',
        'Sygnał, że czas na agenta: klienci ciągle piszą „to jak w końcu mam to zrobić?", a Twój zespół przepisuje te same dane z maila do systemu ręcznie.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Prosta zasada: jeśli po rozmowie z botem człowiek z Twojej firmy i tak musi coś kliknąć, żeby dokończyć sprawę, to robota dla agenta. To właśnie ta praca „przepisz, sprawdź, wprowadź", która zżera godziny i nikogo nie cieszy.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Przykład: agent AI umawia wizytę, chatbot tylko podaje godziny',
      akapity: [
        'Weźmy gabinet albo serwis. Klient pisze wieczorem: „Chcę się umówić na piątek". Chatbot odpowiada: „W piątek wolne jest 10:00, 13:30 i 16:00. Żeby zarezerwować, proszę zadzwonić rano". I tyle. Klient musi zapamiętać, oddzwonić, ktoś musi odebrać. Część takich osób odpada po drodze.',
        'Agent w tej samej sytuacji robi pełną pętlę. Sprawdza kalendarz na żywo, proponuje 13:30, klient potwierdza, agent zapisuje wizytę, blokuje termin i wysyła potwierdzenie na mail oraz przypomnienie dzień wcześniej. Rano nikt nie oddzwania, bo nie ma do czego. Termin już stoi w kalendarzu. To jest właśnie ta różnica: chatbot kończy na informacji, agent kończy na załatwionej sprawie.',
        'Taką samą logikę widać poza rezerwacjami. W jednym z naszych wdrożeń dla Instytutu Kryptografii agent AI zajął się obsługą maili: czyta wiadomość, rozumie kontekst i przygotowuje gotową odpowiedź. Około 85% tych draftów pisze AI, a mail idzie do klienta od razu albo po drobnej poprawce. Człowiek nie pisze od zera, tylko zatwierdza. W innym projekcie, Lead Generatorze, agent zebrał i uporządkował 1000 rekordów w 40 minut zamiast około dwóch tygodni pracy ręcznej. Chatbot by o tych danych co najwyżej opowiedział. Agent je zdobył i ułożył.',
      ],
    },
    {
      typ: 'cytat',
      tekst:
        'AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Chatbot zdejmuje pytania. Agent zdejmuje robotę.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak zacząć: od mniejszego kroku do agenta AI',
      wariant: 'quiet',
      akapity: [
        'Nie musisz wybierać raz na zawsze. Najrozsądniej zacząć od chatbota na jednym, konkretnym procesie, a potem dołożyć mu działanie i zrobić z niego agenta. Mniejszy krok jest tańszy, szybszy i odwracalny. Uczysz się na realnych rozmowach klientów, zanim podłączysz bota do systemów, w których może coś zmienić.',
      ],
    },
    {
      /* Pięć punktów to droga od chatbota do Agenta („wybierz, postaw, zbierz,
         dołóż, zostaw"), czyli PROCEDURA, więc jadą jako <ol> z numerem
         w kółku (v22 §1.2). Zdania 1:1 z dotychczasowej listy, zmienia się
         wyłącznie znacznik: <ol> zamiast <ul>, numer zamiast kropki. */
      typ: 'kroki',
      wariant: 'kolo',
      kroki: [
        {
          tytul:
            'Wybierz jeden proces, który najbardziej Cię męczy: najczęstsze pytanie albo zadanie, które zespół klika ręcznie po dwadzieścia razy dziennie.',
        },
        {
          tytul:
            'Postaw chatbota tylko na tym jednym procesie. Niech najpierw dobrze odpowiada na realnych pytaniach klientów.',
        },
        {
          tytul:
            'Zbierz dane z pierwszych tygodni: o co naprawdę pytają, gdzie bot się myli, co klienci chcą załatwić, a nie tylko sprawdzić.',
        },
        {
          tytul:
            'Dołóż jedną akcję i zrób z chatbota agenta: niech zacznie zapisywać do kalendarza albo wprowadzać dane do CRM, zamiast tylko o nich mówić.',
        },
        {
          tytul:
            'Zostaw człowieka w pętli na akcjach z konsekwencjami: na starcie agent przygotowuje, człowiek zatwierdza. Pełną automatykę włączasz, gdy ufasz wynikom.',
        },
      ],
    },
    {
      /* 2026-10-14: zamiast widełek w USD bez źródła („500 do 5000 dolarów",
         „200 do 1000 dolarów") nasze kwoty netto w zł, co do złotówki z:
         lib/uslugi/podstrony/chatboty-cennik.ts (kapsuła: 1790 zł netto
         i 1-2 dni, 8000-15000 zł netto i 5-10 dni, 99-599 zł netto albo 0 zł;
         sekcja „Chatbot czy voicebot": 2500 zł netto, 5000-9000 zł netto,
         299-1500 zł netto) oraz lib/uslugi/podstrony/voiceboty-cennik.ts
         (kapsuła: 0 zł u Ciebie). Przykład „kalendarz albo CRM" przy progu
         z integracjami: poradnik ile-kosztuje-chatbot-dla-firmy-2026.ts
         („z integracjami, na przykład z kalendarzem czy CRM"). */
      typ: 'akapit',
      tekst:
        'Ile to kosztuje u nas? Chatbot, który tylko odpowiada, to od 1790 zł netto i 1-2 dni robocze wdrożenia. Chatbot z integracjami, który zapisuje wizytę w kalendarzu albo dane w CRM, to 8000-15000 zł netto i 5-10 dni roboczych. Voicebot, czyli agent, który odbiera telefony, kosztuje 2500 zł netto w wersji prostej albo 5000-9000 zł netto z integracjami. Utrzymanie to 99-599 zł netto miesięcznie przy czacie i 299-1500 zł netto przy telefonie, albo 0 zł, gdy przekazujemy Ci całą infrastrukturę. Dlatego start od jednego procesu ma sens także finansowo: widzisz efekt, zanim zainwestujesz w pełnego agenta podłączonego do wszystkiego.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Co to znaczy dla małej i średniej firmy?',
      wariant: 'edge',
      akapity: [
        'Nie pytaj „chatbot czy agent AI" jak o dwa wykluczające się produkty. Pytaj, jaki efekt ma przynieść rozmowa z klientem. Jeśli ma się dowiedzieć, daj chatbota. Jeśli ma sprawę załatwić, potrzebujesz agenta. A jeśli nie wiesz, zacznij od chatbota na jednym procesie i rozwiń go w agenta, gdy zobaczysz, gdzie naprawdę traci się czas. To najtańsza droga do AI, które w Twojej firmie załatwia sprawy.',
      ],
    },
  ],

  faq: [
    {
      pytanie: 'Czym różni się chatbot od agenta AI w jednym zdaniu?',
      odpowiedz:
        'Chatbot odpowiada na pytania, agent AI wykonuje całe zadanie. Chatbot poda wolne godziny, agent sprawdzi kalendarz, zapisze wizytę i wyśle potwierdzenie. Chatbot kończy na informacji, agent kończy na załatwionej sprawie.',
    },
    {
      pytanie: 'Czy moja firma może zacząć od chatbota, a później przejść na agenta AI?',
      odpowiedz:
        'Tak i zwykle to najrozsądniejsza droga. Zaczynasz od chatbota na jednym procesie, uczysz się na realnych rozmowach klientów, a potem dokładasz mu jedną akcję i robisz z niego agenta. Krok jest tańszy, szybszy i odwracalny niż budowanie pełnego agenta od razu.',
    },
    {
      pytanie: 'Skąd wiem, że potrzebuję agenta AI, a nie samego chatbota?',
      odpowiedz:
        'Sprawdź, co dzieje się po rozmowie z botem. Jeśli ktoś z Twojego zespołu i tak musi coś kliknąć, żeby dokończyć sprawę, czyli zapisać termin, przepisać dane z maila do systemu albo wystawić dokument, to robota dla agenta. Chatbot wystarczy, gdy klient ma się tylko czegoś dowiedzieć.',
    },
  ],

  queries: [
    'chatbot czy agent ai',
    'różnica chatbot agent ai',
    'co wybrać chatbot czy agent',
    'czym jest agent ai',
  ],

  /* v22 (PLAN-v22 §2.2 pkt 4 i §3 P2 #10): przed rundą wszystkie pięć wpisów
     bloga było ŚLEPYMI ZAUŁKAMI (0 linków redakcyjnych wychodzących z treści).
     Tu wchodzą cztery grupy naraz, więc czytelnik ma gdzie pójść, a bot
     dostaje trzy dodatkowe <h3> i sześć linków w <main>.
     ŹRÓDŁA NAPISÓW (wszystko przepisane ZNAK W ZNAK z rejestrów, zero nowych
     zdań): usługi = `h1` + `metaDescription` z lib/uslugi, narzędzia =
     `tytul` + `korzysc` z lib/narzedzia, poradniki = etykieta i opis, które
     stoją już w polach `powiazanePoradniki` rejestru poradników, realizacje =
     `h1` + `metaDescription` z lib/realizacje. */
  powiazaneUslugi: [
    /* 2026-10-14: dwie nowe karty NA POCZĄTKU (zwiad: wpis ma 2 linki
       wchodzące i nie prowadził ani do strony o agentach, ani do cennika).
       1) /uslugi/agenci-ai: NOWA strona fali 1 (F1-1). Etykieta z polecenia
          operacji. Opis z planowanego H1 i konspektu tej strony (czat, telefon,
          procesy, ceny, wdrożenie); integrator: sprawdzić zgodność z gotową
          stroną i to, że trasa zwraca 200.
       2) /uslugi/chatboty/cennik: etykieta = h1, opis = metaDescription
          z lib/uslugi/podstrony/chatboty-cennik.ts, znak w znak. */
    {
      etykieta: 'Agenci AI dla firm',
      href: '/uslugi/agenci-ai',
      opis: 'Agenci AI na czacie, w telefonie i w procesach firmy: co robią, od ilu kosztują i jak je wdrażamy.',
    },
    {
      etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
      href: '/uslugi/chatboty/cennik',
      opis: 'Cennik chatbota AI dla firmy: od 1790 zł netto i 1-2 dni robocze, z integracjami 8000-15000 zł netto. Utrzymanie 99-599 zł netto albo 0 zł po przekazaniu.',
    },
    {
      etykieta: 'Chatbot AI dla firm',
      href: '/uslugi/chatboty',
      /* 2026-10-14: opis zsynchronizowany z aktualnym metaDescription
         lib/uslugi/chatboty.ts (stary opis był kopią wcześniejszej wersji). */
      opis: 'Chatbot AI dla firm od 1790 zł netto, wdrożenie od 1 do 10 dni roboczych. Odpowiada klientom 24/7 na WWW i w komunikatorach, zbiera leady. Dane w UE.',
    },
    {
      etykieta: 'Architekci Wartości AI',
      href: '/uslugi/architekci-wartosci-ai',
      opis: 'Zobacz, jak budujemy i utrzymujemy agentów, którzy wykonują pracę pod nadzorem człowieka.',
    },
  ],

  powiazaneNarzedzia: [
    {
      etykieta: 'Czy warto zautomatyzować ten proces?',
      href: '/narzedzia#kalkulator-procesu',
      opis: 'Sprawdź, czy konkretna automatyzacja się spina.',
    },
  ],

  powiazanePoradniki: [
    /* 2026-10-14: szyk „agent AI" w etykiecie (adres bez zmian) i etykieta
       poradnika chatbotowego skrócona z jego nowego H1. */
    {
      etykieta: 'Ile kosztuje agent AI dla firmy',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
      opis: 'Widełki 2026 dla agenta AI, od czego zależy cena i jak policzyć zwrot.',
    },
    {
      etykieta: 'Ile kosztuje chatbot AI w 2026',
      href: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
      opis: 'Chatbot prosty 1790 zł netto i 1-2 dni robocze, pełne widełki i koszty utrzymania.',
    },
  ],

  /* Oba wdrożenia są w tym wpisie opisane z nazwy (Instytut Kryptografii,
     Lead Generator), a dotąd nie było do czego kliknąć. */
  powiazaneRealizacje: [
    {
      etykieta: 'Auto-email dla biura obsługi klienta',
      href: '/realizacje/auto-email-bok',
      opis: 'System AI dla biura obsługi klienta Instytutu Kryptografii: około 85% draftów idzie od razu albo po drobnej poprawce, gotowe do jednego kliknięcia. Case study.',
    },
    {
      etykieta: 'Błyskawiczny generator leadów',
      href: '/realizacje/lead-generator',
      opis: 'Automat do pozyskiwania leadów: 1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy. Case study, gotowa lista dla sprzedaży.',
    },
  ],
};
