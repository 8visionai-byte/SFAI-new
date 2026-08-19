import type { Post } from '../types';

/**
 * WPIS 2 — Chatbot czy AI Agent: czym się różnią i co wybrać dla firmy
 *
 * Treść (faza 4): answer-first, nagłówki jak pytania, tabela różnic,
 * realne przykłady z wdrożeń, wskazówka „od czego zacząć". Głos Pawła:
 * krótkie zdania, zero żargonu, zero zmyślonych liczb/cen.
 */
export const chatbotCzyAiAgent: Post = {
  slug: 'chatbot-czy-ai-agent-roznice',
  tytul: 'Chatbot czy AI Agent: czym się różnią i co wybrać dla firmy',

  lead:
    'Chatbot odpowiada na pytania, AI Agent wykonuje całe zadania. Chatbot poda godziny otwarcia i cennik. Agent sprawdzi kalendarz, zaproponuje termin, zapisze wizytę i wyśle potwierdzenie. Dla większości firm dobrym startem jest chatbot, który później rozwijasz w Agenta, gdy chcesz, żeby AI nie tylko gadało, ale i działało.',

  metaTitle: 'Chatbot czy AI Agent: różnice i co wybrać',
  metaDescription:
    'Chatbot czy AI Agent dla firmy? Czym dokładnie się różnią, co każdy z nich robi i czego nie, oraz jak wybrać i zacząć od mniejszego, odwracalnego kroku.',

  data: '2026-06-15',
  dataAktualizacji: '2026-08-19',
  kategoria: 'Chatboty i Agenci',
  tagi: ['chatbot', 'AI Agent', 'różnice chatbot agent', 'co wybrać dla firmy'],

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
        'Różnica jest prosta. Chatbot to rozmowa. Agent to działanie. Chatbot odpowie na pytanie i na tym kończy. Agent dostaje to samo pytanie, ale dowozi efekt: sprawdza dane, podejmuje decyzję, wykonuje akcję w Twoim systemie i odpisuje, że zrobione. Jeśli pamiętasz tylko jedno zdanie z tego wpisu, niech będzie to: chatbot odpowiada, Agent działa.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Czym dokładnie różni się chatbot od AI Agenta?',
      akapity: [
        'Chatbot pracuje na tekście. Zna Twoją ofertę, FAQ, regulamin i z tego buduje odpowiedzi. Świetnie radzi sobie z pytaniami „ile kosztuje", „do której otwarte", „czy robicie dostawę". Problem zaczyna się, gdy klient chce coś załatwić, a nie tylko się dowiedzieć. Chatbot poda godziny wolnych terminów. Ale samej wizyty nie zapisze, bo nie ma dostępu do kalendarza i nie umie wykonać akcji.',
        'Agent ma to, czego chatbotowi brakuje: dostęp do narzędzi i prawo do działania. Podłączasz go do kalendarza, CRM, skrzynki mailowej, bazy klientów albo systemu rezerwacji. Wtedy Agent nie opisuje, co można zrobić. On to robi. Sprawdza, umawia, wystawia, aktualizuje, wysyła. Klient nie dostaje instrukcji „proszę zadzwonić, żeby umówić". Dostaje gotowy termin i potwierdzenie na mailu.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      /* Podpis = nagłówek H2 sekcji nad tabelą, znak w znak. */
      podpis: 'Czym dokładnie różni się chatbot od AI Agenta?',
      naglowki: ['Cecha', 'Chatbot', 'AI Agent'],
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
      naglowek: 'Kiedy wystarczy chatbot, a kiedy potrzebujesz Agenta?',
      wariant: 'edge',
      akapity: [
        'Nie każda firma od razu potrzebuje Agenta. Czasem chatbot załatwia 80% sprawy za ułamek wysiłku. Zacznij od pytania: czy klient ma się czegoś dowiedzieć, czy coś załatwić? Jeśli głównie pytania, chatbot wystarczy. Jeśli klient chce zarezerwować, zamówić, zmienić termin albo zgłosić sprawę, wchodzi Agent.',
      ],
      punkty: [
        'Chatbot wystarczy: odpowiedzi na FAQ, cennik, godziny, status „czy macie to na stanie", pierwszy filtr zgłoszeń przed kontaktem z człowiekiem.',
        'Agent się opłaca: umawianie i przekładanie wizyt, rezerwacje, składanie zamówień, kwalifikacja leadów, wystawianie dokumentów, aktualizacja danych w CRM.',
        'Sygnał, że czas na Agenta: klienci ciągle piszą „to jak w końcu mam to zrobić?", a Twój zespół przepisuje te same dane z maila do systemu ręcznie.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Prosta zasada: jeśli po rozmowie z botem człowiek z Twojej firmy i tak musi coś kliknąć, żeby dokończyć sprawę, to robota dla Agenta. To właśnie ta praca „przepisz, sprawdź, wprowadź", która zżera godziny i nikogo nie cieszy.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Przykład: Agent umawia wizytę, chatbot tylko podaje godziny',
      akapity: [
        'Weźmy gabinet albo serwis. Klient pisze wieczorem: „Chcę się umówić na piątek". Chatbot odpowiada: „W piątek wolne jest 10:00, 13:30 i 16:00. Żeby zarezerwować, proszę zadzwonić rano". I tyle. Klient musi zapamiętać, oddzwonić, ktoś musi odebrać. Połowa takich osób odpada po drodze.',
        'Agent w tej samej sytuacji robi pełną pętlę. Sprawdza kalendarz na żywo, proponuje 13:30, klient potwierdza, Agent zapisuje wizytę, blokuje termin i wysyła potwierdzenie na mail oraz przypomnienie dzień wcześniej. Rano nikt nie oddzwania, bo nie ma do czego. Termin już stoi w kalendarzu. To jest właśnie ta różnica: chatbot kończy na informacji, Agent kończy na załatwionej sprawie.',
        'Taką samą logikę widać poza rezerwacjami. W jednym z naszych wdrożeń dla Instytutu Kryptografii Agent zajął się obsługą maili: czyta wiadomość, rozumie kontekst i przygotowuje gotową odpowiedź. 75% tych maili wymaga już tylko drobnej korekty przed wysłaniem. Człowiek nie pisze od zera, tylko zatwierdza. W innym projekcie, Lead Generatorze, Agent zebrał i uporządkował 1000 rekordów w 40 minut zamiast około dwóch tygodni pracy ręcznej. Chatbot by o tych danych co najwyżej opowiedział. Agent je zdobył i ułożył.',
      ],
    },
    {
      typ: 'cytat',
      tekst:
        'AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Chatbot zdejmuje pytania. Agent zdejmuje robotę.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak zacząć: od mniejszego kroku do Agenta',
      wariant: 'quiet',
      akapity: [
        'Nie musisz wybierać raz na zawsze. Najrozsądniej zacząć od chatbota na jednym, konkretnym procesie, a potem dołożyć mu działanie i zrobić z niego Agenta. Mniejszy krok jest tańszy, szybszy i odwracalny. Uczysz się na realnych rozmowach klientów, zanim podłączysz bota do systemów, w których może coś zmienić.',
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
            'Dołóż jedną akcję i zrób z chatbota Agenta: niech zacznie zapisywać do kalendarza albo wprowadzać dane do CRM, zamiast tylko o nich mówić.',
        },
        {
          tytul:
            'Zostaw człowieka w pętli na akcjach z konsekwencjami: na starcie Agent przygotowuje, człowiek zatwierdza. Pełną automatykę włączasz, gdy ufasz wynikom.',
        },
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Dla porównania, ramy rynkowe na 2026 wyglądają mniej więcej tak: jednorazowy setup Agenta to z grubsza 500 do 5000 dolarów, a późniejsza opieka 200 do 1000 dolarów miesięcznie, zależnie od liczby integracji i skali. To kontekst, nie nasz cennik. Wycenę robimy pod konkretny proces i jego wartość, a nie z tabelki. Dlatego start od jednego procesu ma sens także finansowo: widzisz efekt, zanim zainwestujesz w pełnego Agenta podłączonego do wszystkiego.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Co to znaczy dla małej i średniej firmy?',
      wariant: 'edge',
      akapity: [
        'Nie pytaj „chatbot czy Agent" jak o dwa wykluczające się produkty. Pytaj, jaki efekt ma przynieść rozmowa z klientem. Jeśli ma się dowiedzieć, daj chatbota. Jeśli ma sprawę załatwić, potrzebujesz Agenta. A jeśli nie wiesz, zacznij od chatbota na jednym procesie i rozwiń go w Agenta, gdy zobaczysz, gdzie naprawdę traci się czas. To najtańsza droga, żeby AI w Twojej firmie nie tylko gadało, ale i działało.',
      ],
    },
  ],

  faq: [
    {
      pytanie: 'Czym różni się chatbot od AI Agenta w jednym zdaniu?',
      odpowiedz:
        'Chatbot odpowiada na pytania, AI Agent wykonuje całe zadanie. Chatbot poda wolne godziny, Agent sprawdzi kalendarz, zapisze wizytę i wyśle potwierdzenie. Chatbot kończy na informacji, Agent kończy na załatwionej sprawie.',
    },
    {
      pytanie: 'Czy moja firma może zacząć od chatbota, a później przejść na Agenta?',
      odpowiedz:
        'Tak i zwykle to najrozsądniejsza droga. Zaczynasz od chatbota na jednym procesie, uczysz się na realnych rozmowach klientów, a potem dokładasz mu jedną akcję i robisz z niego Agenta. Krok jest tańszy, szybszy i odwracalny niż budowanie pełnego Agenta od razu.',
    },
    {
      pytanie: 'Skąd wiem, że potrzebuję Agenta, a nie samego chatbota?',
      odpowiedz:
        'Sprawdź, co dzieje się po rozmowie z botem. Jeśli ktoś z Twojego zespołu i tak musi coś kliknąć, żeby dokończyć sprawę, czyli zapisać termin, przepisać dane z maila do systemu albo wystawić dokument, to robota dla Agenta. Chatbot wystarczy, gdy klient ma się tylko czegoś dowiedzieć.',
    },
  ],

  queries: [
    'chatbot czy ai agent',
    'różnica chatbot agent ai',
    'co wybrać chatbot czy agent',
    'czym jest ai agent',
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
    {
      etykieta: 'Chatbot AI dla firmy',
      href: '/uslugi/chatboty',
      opis: 'Chatbot AI dla firm, który odpowiada klientom 24/7 i zbiera leady. Ile kosztuje, ile trwa wdrożenie i czym różni się od Agenta. Sprawdź przykłady.',
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
    {
      etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
      opis: 'Widełki 2026 dla agenta AI, od czego zależy cena i jak policzyć zwrot.',
    },
    {
      etykieta: 'Ile kosztuje chatbot dla firmy w 2026',
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
      opis: 'System AI dla biura obsługi klienta Instytutu Kryptografii: 75% maili wymaga tylko drobnej korekty, drafty gotowe do jednego kliknięcia. Case study.',
    },
    {
      etykieta: 'Błyskawiczny generator leadów',
      href: '/realizacje/lead-generator',
      opis: 'Automat do pozyskiwania leadów: 1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy. Case study, gotowa lista dla sprzedaży.',
    },
  ],
};
