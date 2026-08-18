import type { Poradnik } from '../types';

/**
 * PORADNIK 2: AI w biurze rachunkowym — które procesy zautomatyzować najpierw.
 *
 * Money query primary: „AI w biurze rachunkowym". Branżowy, answer-first.
 * Lista 12 procesów uszeregowanych od najłatwiejszego zwrotu (tabela). ZERO
 * zmyślonych liczb dokładności/oszczędności konkretnego narzędzia: mówimy o
 * RODZAJU zysku (godziny, mniej przepisywania), nie o fałszywych procentach.
 * Linkuje do usług automatyzacje + dokumenty-faktury i testu gotowości AI.
 */
export const aiWBiurzeRachunkowym: Poradnik = {
  slug: 'ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac',
  tytul: 'AI w biurze rachunkowym: które procesy zautomatyzować najpierw (lista 12)',

  lead:
    'W biurze rachunkowym najszybciej zwracają się trzy automatyzacje: odczyt i wpinanie faktur, segregacja maili od klientów i przypomnienia o brakujących dokumentach. To zadania nudne, powtarzalne i pełne ręcznego przepisywania, czyli dokładnie to, co AI robi dobrze. Poniżej masz listę 12 procesów uszeregowanych od najłatwiejszego zwrotu, z czasem wdrożenia i tym, co przygotować.',

  metaTitle: 'AI w biurze rachunkowym: 12 procesów do automatyzacji',
  metaDescription:
    'AI w biurze rachunkowym: 12 procesów do automatyzacji od najszybszego zwrotu. Odczyt faktur, segregacja maili, przypomnienia. Konkret, bez żargonu.',

  data: '2026-06-15',
  dataAktualizacji: '2026-06-15',
  kategoria: 'Branże',
  tagi: [
    'AI w biurze rachunkowym',
    'automatyzacja biura rachunkowego',
    'AI dla księgowych',
    'procesy do automatyzacji w księgowości',
  ],

  /* v22 (PLAN-v22 §2.1, skarga Pawła 2026-08-18 o „jednej ścianie tekstu"):
     ta sama treść, inne OPAKOWANIE. Każda sekcja (nagłówek plus akapit plus
     ewentualna lista) jedzie w jednej karcie `.inf-card` z tonem poradnika,
     tabela 12 procesów wjeżdża w kartę i dostaje widoczny <caption>, a lista
     przygotowań jedzie jako <ol> z numerami w kółkach.
     ŻELAZNE: ZERO zmian słów, kolejność merytoryczna 1:1, wszystkie H2 zostają
     H2, tabela zostaje prawdziwą <table> ze scope. Jedyny nowy widoczny napis
     to podpis tabeli, skopiowany znak w znak z nagłówka H2 tej strony. */
  tresc: [
    {
      typ: 'akapit',
      tekst:
        'Twoje księgowe nie są wolne. Są zajęte przepisywaniem. Odczyt faktur, segregowanie maili, dopytywanie klientów o brakujące dokumenty. To godziny tygodniowo, które nie budują biura, tylko gaszą bieżączkę. Dokładnie to zdejmuje AI. Nie po to, żeby zwolnić księgową, tylko po to, żeby oddać jej czas na realną pracę z klientem. Zacznij od trzech rzeczy, które zwracają się najszybciej: odczyt faktur, segregacja maili i przypomnienia o brakujących dokumentach.',
    },

    {
      typ: 'sekcja',
      naglowek: 'Od czego zacząć automatyzację w biurze rachunkowym?',
      akapity: [
        'Zacznij od procesu, który jest jednocześnie powtarzalny i pochłania najwięcej czasu. W większości biur to odczyt faktur i segregacja poczty od klientów. Oba są przewidywalne, dzieją się codziennie i nie wymagają eksperckiej oceny przy każdej sztuce. To znaczy, że AI zdejmie z zespołu najnudniejszą część dnia, a człowiek zostaje tam, gdzie naprawdę jest potrzebny: przy kontroli i decyzji.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Lista 12 procesów do automatyzacji od najszybszego zwrotu',
      akapity: [
        'Poniższa lista jest uszeregowana od najłatwiejszego zwrotu na górze. Czas wdrożenia to rząd wielkości, nie obietnica, bo zależy od tego, jak uporządkowane masz dane i ile systemów trzeba połączyć. Zaczynaj od góry, schodź w dół dopiero po pierwszym efekcie.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      /* Podpis = nagłówek H2 sekcji nad tabelą, znak w znak. Ta tabela ma 12
         wierszy i cztery kolumny, więc widoczny <caption> jest tu najbardziej
         potrzebny: nazywa też region ze scrollem poziomym na mobile. */
      podpis: 'Lista 12 procesów do automatyzacji od najszybszego zwrotu',
      naglowki: ['#', 'Proces', 'Dlaczego szybki zwrot', 'Czas wdrożenia'],
      wiersze: [
        ['1', 'Odczyt i wpinanie faktur', 'Codzienne, powtarzalne, dużo ręcznego przepisywania', 'krótki'],
        ['2', 'Segregacja maili od klientów', 'Duży wolumen, prosta klasyfikacja po temacie', 'krótki'],
        ['3', 'Przypomnienia o brakujących dokumentach', 'Powtarzalne, dziś robione ręcznie i nieregularnie', 'krótki'],
        ['4', 'Odpowiedzi na powtarzalne pytania klientów', 'Te same pytania co miesiąc, gotowe wzory odpowiedzi', 'krótki'],
        ['5', 'Wstępne rozpoznanie kategorii kosztów', 'Człowiek tylko zatwierdza propozycję, nie wpisuje od zera', 'średni'],
        ['6', 'Generowanie wstępnych raportów dla klienta', 'Szablon plus dane, mniej ręcznego składania', 'średni'],
        ['7', 'Przypomnienia o terminach i deklaracjach', 'Kalendarz powtarzalny, dziś pilnowany ręcznie', 'krótki'],
        ['8', 'Podsumowania rozmów i ustaleń z klientem', 'Notatki po spotkaniu składają się same', 'średni'],
        ['9', 'Sprawdzanie kompletności dokumentów', 'Lista kontrolna, którą AI odhacza zamiast człowieka', 'średni'],
        ['10', 'Onboarding nowego klienta (checklista i maile)', 'Powtarzalny ciąg kroków przy każdym nowym kliencie', 'średni'],
        ['11', 'Wyciąganie danych z umów i pism', 'Mniej ręcznego czytania długich dokumentów', 'dłuższy'],
        ['12', 'Wstępne odpowiedzi na pisma urzędowe', 'Szkic do sprawdzenia przez człowieka, nie gotowiec', 'dłuższy'],
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Czego NIE automatyzować w biurze rachunkowym?',
      wariant: 'edge',
      akapity: [
        'Nie wszystko warto oddawać automatowi. Zostaw człowiekowi to, co wymaga oceny, odpowiedzialności i kontaktu. AI dobrze przygotuje fakturę do zaksięgowania, ale ostateczna decyzja i podpis zostają po stronie księgowej. Dobrze wdrożone AI nie zwalnia tu nikogo. Zdejmuje najnudniejszą część dnia i oddaje czas na pracę, której nie da się zautomatyzować.',
      ],
      punkty: [
        'Ostateczna kontrola i zatwierdzenie zaksięgowanych dokumentów. Człowiek decyduje, AI przygotowuje.',
        'Doradztwo i interpretacja przepisów dla konkretnego klienta. To wymaga odpowiedzialności, nie szablonu.',
        'Trudne, nietypowe sprawy i wyjątki. AI radzi sobie z powtarzalnym, nie z jednorazowym.',
        'Relacja z klientem przy wrażliwych tematach. Tu wartością jest człowiek, nie szybkość.',
      ],
    },

    {
      typ: 'sekcja',
      naglowek: 'Co przygotować przed wdrożeniem AI w biurze?',
      wariant: 'quiet',
      akapity: [
        'Im lepiej uporządkowane dane, tym tańsze i szybsze wdrożenie. Zanim ruszysz, zbierz to, czego automat będzie potrzebował, i wybierz jeden proces na pilotaż. Pilotaż na wąskim wycinku pokazuje efekt bez ryzyka, że zatrzymasz całe biuro.',
      ],
    },
    {
      /* Cztery punkty przygotowania to PROCEDURA („wybierz, zbierz, ustal,
         sprawdź"), więc jadą jako <ol> z numerem w kółku (v22 §1.2, wariant
         'kolo'). Zdania 1:1 z dotychczasowej listy, zmienia się wyłącznie
         znacznik: <ol> zamiast <ul>, numer zamiast kropki. */
      typ: 'kroki',
      wariant: 'kolo',
      kroki: [
        { tytul: 'Wybierz jeden proces na start, najlepiej odczyt faktur albo segregację maili.' },
        { tytul: 'Zbierz przykłady: jak dziś wyglądają dokumenty i maile, które ma obsłużyć AI.' },
        { tytul: 'Ustal, gdzie kończy się automat, a zaczyna kontrola człowieka.' },
        {
          tytul:
            'Sprawdź efekt na próbie, zanim wpuścisz automat na całość. Najpierw pilotaż, potem skala.',
        },
      ],
    },
    {
      typ: 'cytat',
      tekst:
        'AI nie zastępuje księgowej. Zdejmuje z niej przepisywanie i oddaje czas na pracę z klientem.',
    },
    {
      typ: 'akapit',
      tekst:
        'Nie wiesz, czy Twoje biuro jest gotowe na pierwszą automatyzację? Zrób krótki test gotowości AI, a potem umów bezpłatną diagnozę. Wskażemy jeden proces, który zwróci się najszybciej w Twoim przypadku.',
    },
  ],

  faq: [
    {
      pytanie: 'Które procesy w biurze rachunkowym zautomatyzować najpierw?',
      odpowiedz:
        'Najszybciej zwracają się trzy: odczyt i wpinanie faktur, segregacja maili od klientów i przypomnienia o brakujących dokumentach. Są powtarzalne, dzieją się codziennie i pełne ręcznego przepisywania, więc AI zdejmuje z zespołu najnudniejszą część dnia. Zaczynaj od nich, resztę dokładaj po pierwszym efekcie.',
    },
    {
      pytanie: 'Czy AI zastąpi księgowe w biurze rachunkowym?',
      odpowiedz:
        'Nie. Dobrze wdrożone AI nie zwalnia księgowej, tylko zdejmuje z niej przepisywanie i powtarzalną robotę. Ostateczna kontrola, zatwierdzenie i doradztwo zostają po stronie człowieka. AI przygotowuje, księgowa decyduje. Czas zaoszczędzony na nudnych zadaniach wraca do realnej pracy z klientem.',
    },
    {
      pytanie: 'Co przygotować przed wdrożeniem AI w biurze rachunkowym?',
      odpowiedz:
        'Wybierz jeden proces na pilotaż, najlepiej odczyt faktur albo segregację maili. Zbierz przykłady dokumentów i maili, które ma obsłużyć automat, i ustal, gdzie kończy się AI, a zaczyna kontrola człowieka. Im lepiej uporządkowane dane, tym szybsze i tańsze wdrożenie.',
    },
    {
      pytanie: 'Czego nie warto automatyzować w księgowości?',
      odpowiedz:
        'Zostaw człowiekowi ostateczną kontrolę i zatwierdzanie dokumentów, doradztwo i interpretację przepisów, trudne nietypowe sprawy oraz relację z klientem przy wrażliwych tematach. AI radzi sobie z powtarzalnym, nie z jednorazowym i nie z tym, co wymaga odpowiedzialności.',
    },
  ],

  queries: [
    'AI w biurze rachunkowym',
    'automatyzacja biura rachunkowego',
    'AI dla księgowych',
    'jakie procesy zautomatyzować w księgowości',
  ],

  powiazaneUslugi: [
    {
      etykieta: 'Automatyzacje procesów',
      href: '/uslugi/automatyzacje',
      opis: 'Zobacz, jak automatyzujemy powtarzalne procesy, które zżerają czas zespołu.',
    },
    {
      etykieta: 'Dokumenty i faktury',
      href: '/uslugi/dokumenty-faktury',
      opis: 'Odczyt i wpinanie faktur bez ręcznego przepisywania.',
    },
    {
      etykieta: 'Chatboty dla firm',
      href: '/uslugi/chatboty',
      opis: 'Chatbot bierze na siebie powtarzalne pytania klientów biura, też po godzinach.',
    },
    {
      etykieta: 'Audyt AI: mapa oszczędności czasu',
      href: '/uslugi/audyt-ai',
      opis: 'Mapa procesów Twojego biura z zaznaczonym miejscem, gdzie automatyzacja zwróci się najszybciej.',
    },
  ],

  powiazaneNarzedzia: [
    {
      etykieta: 'Test gotowości AI',
      href: '/narzedzia#test-gotowosci-ai',
      opis: 'Sprawdź w kilka minut, czy Twoje biuro jest gotowe na pierwszą automatyzację.',
    },
  ],

  /* SEO 2026-08-17: blok „Zobacz też" — dwa poradniki cenowe najbliższe tematom
     biura (koszt automatyzacji procesów i koszt agenta prowadzącego proces). */
  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje automatyzacja AI w firmie',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
      opis: 'Realne widełki wdrożeń automatyzacji i to, od czego zależy cena.',
    },
    {
      etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
      opis: 'Widełki 2026 dla agenta AI, od czego zależy cena i jak policzyć zwrot.',
    },
  ],

  /* v22 (PLAN-v22 §1.5): grupa „Zobacz to na wdrożeniu". Dwa wdrożenia, które
     robią dokładnie to, co stoi wysoko na liście 12 procesów: segregację
     i odpowiedzi na maile (pozycje 2 i 4) oraz raporty dla klienta (pozycja 6).
     ETYKIETA I OPIS PRZEPISANE ZNAK W ZNAK z rejestru lib/realizacje:
     etykieta = `h1`, opis = `metaDescription`. */
  powiazaneRealizacje: [
    {
      etykieta: 'Auto-email dla biura obsługi klienta',
      href: '/realizacje/auto-email-bok',
      opis: 'System AI dla biura obsługi klienta Instytutu Kryptografii: 75% maili wymaga tylko drobnej korekty, drafty gotowe do jednego kliknięcia. Case study.',
    },
    {
      etykieta: 'Automatyczne raporty zamiast ręcznych arkuszy',
      href: '/realizacje/automatyczne-raporty',
      opis: 'Automatyczne raporty: automat spina dane z kilku źródeł i co rano dostarcza gotowy raport. Koniec ręcznego sklejania arkuszy. Case study wdrożenia.',
    },
  ],
};
