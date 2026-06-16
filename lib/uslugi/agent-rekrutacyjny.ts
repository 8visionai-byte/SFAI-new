import type { Usluga } from './types';

/**
 * USŁUGA — AGENT REKRUTACYJNY (agent AI do rekrutacji i pierwszego kontaktu).
 * Pozycjonowanie: jak outsourcing pierwszej linii rekrutacji. Agent zbiera CV,
 * robi pierwszy odsiew i scoring, odpowiada kandydatom, umawia rozmowy i przygotowuje
 * notatkę dla rekrutera. Decyzję o zatrudnieniu zawsze podejmuje człowiek.
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - ramaCeny.minPrice: realne "od X zł" za agenta rekrutacyjnego (number, PLN).
 *    Dopiero wtedy włącza się kwota w UI i `offers` w Service JSON-LD. Dziś undefined.
 *  - cta.dowod: realna liczba z wdrożenia (np. ilu kandydatów/mc przeszło przez
 *    pierwszy odsiew agenta) ALBO case z liczbą + zgodą. Do tego czasu uczciwe
 *    zdanie o diagnozie.
 *  - twarde liczby oszczędności czasu rekrutera oznaczać "(szac.)" dopóki brak
 *    realnego pomiaru z wdrożenia.
 */
export const agentRekrutacyjny: Usluga = {
  slug: 'agent-rekrutacyjny',
  h1: 'Agent AI do rekrutacji i pierwszego kontaktu',

  kapsula:
    'Agent AI do rekrutacji to cyfrowy pracownik, który bierze na siebie pierwszą linię: zbiera CV, robi pierwszy odsiew i scoring, odpowiada kandydatom na pytania, umawia rozmowy i przygotowuje rekruterowi gotową notatkę. Działa jak outsourcing HR, tyle że przez całą dobę i zawsze tak samo. Decyzję o zatrudnieniu podejmujesz Ty. Uczymy go na Twoich kryteriach, a dane kandydatów zostają w Unii Europejskiej.',

  metaTitle: 'Agent rekrutacyjny AI: automatyzacja rekrutacji',
  metaDescription:
    'Agent rekrutacyjny AI zbiera CV, robi pierwszy odsiew i scoring, odpowiada kandydatom i umawia rozmowy. Automatyzacja rekrutacji, która odciąża pierwszą linię. Decyzja zostaje u Ciebie.',

  problem: {
    h2: 'Na czym naprawdę tracisz czas w rekrutacji?',
    tresc:
      'Wrzucasz ogłoszenie i wpada sto CV. Większość nie pasuje, ale i tak trzeba je przeczytać. Do tego maile od kandydatów: o widełki, o tryb pracy, o etapy. Te same pytania w kółko. Dobry kandydat pisze i czeka. Jak czeka za długo, idzie do konkurencji, bo ktoś odpisał szybciej. Pierwsza linia rekrutacji zjada godziny, a najlepszych ludzi i tak gubisz przez wolną reakcję.',
  },

  rozwiazanie: {
    h2: 'Co dokładnie robi agent rekrutacyjny?',
    tresc:
      'Agent przejmuje pierwszą linię. Zbiera CV z formularza i ze skrzynki, czyta je pod Twoje kryteria i robi wstępny scoring, żebyś najpierw widział tych, którzy pasują. Odpowiada kandydatom na pytania o ofertę, etapy i widełki, po polsku i w Twoim tonie. Umawia rozmowy w Twoim kalendarzu i wysyła potwierdzenia. Pod każdego kandydata przygotowuje krótką notatkę, więc na rozmowę wchodzisz przygotowany. Agent nie odrzuca nikogo sam. Selekcję i decyzję o zatrudnieniu zostawia człowiekowi.',
  },

  tabelaPorownawcza: {
    h2: 'Pierwsza linia rekrutacji: ręcznie a z agentem AI',
    naglowekBez: 'Ręczna rekrutacja',
    naglowekZNami: 'Agent rekrutacyjny od SimpleFast.ai',
    wiersze: [
      { cecha: 'Czytanie CV', bez: 'Wszystkie po kolei, ręcznie', zNami: 'Wstępny scoring pod Twoje kryteria' },
      { cecha: 'Odpowiedzi kandydatom', bez: 'Te same pytania w kółko', zNami: 'Agent odpowiada od razu, 24/7' },
      { cecha: 'Czas reakcji', bez: 'Gdy rekruter ma chwilę', zNami: 'Natychmiast, też wieczorem' },
      { cecha: 'Umawianie rozmów', bez: 'Maile w tę i z powrotem', zNami: 'Termin w kalendarzu i potwierdzenie' },
      { cecha: 'Notatka na rozmowę', bez: 'Robisz ją sam przed spotkaniem', zNami: 'Gotowa pod każdego kandydata' },
      { cecha: 'Decyzja o zatrudnieniu', bez: 'Człowiek', zNami: 'Zawsze człowiek, agent tylko przygotowuje' },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy agenta rekrutacyjnego krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Patrzymy, ile czasu zjada Ci pierwsza linia rekrutacji i gdzie gubisz dobrych kandydatów. Ustalamy Twoje kryteria odsiewu i mówimy wprost, czy agent ma sens.',
      },
      {
        tytul: 'Uczenie i wdrożenie',
        opis:
          'Uczymy agenta na Twoich kryteriach, ofercie i pytaniach kandydatów. Łączymy go z formularzem, skrzynką i kalendarzem. Testujemy na żywo, Ty ustawiasz ton i granice scoringu.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Patrzymy, kogo agent przepuszcza i o co pytają kandydaci, i dostrajamy kryteria. Dokładamy kroki, kiedy zechcesz: ankiety wstępne, zadania, integrację z systemem rekrutacyjnym.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje agent rekrutacyjny?',
    tresc:
      'Koszt zależy od zakresu. Inaczej wycenia się agent, który tylko czyta CV i robi wstępny scoring, inaczej taki, który dodatkowo odpowiada kandydatom, umawia rozmowy i łączy się z Twoim kalendarzem oraz systemem rekrutacyjnym. Najczęściej zaczynamy od Sprintu Diagnostycznego za 1490 zł, który odliczamy od wdrożenia, gdy wchodzimy we współpracę. Cenę liczymy od wartości: ile godzin miesięcznie zdejmuje z rekrutera i ilu dobrych kandydatów nie gubisz przez wolną reakcję (szac.). Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
    // minPrice: undefined — brak realnej kwoty "od X" za samego agenta. Bez offers w Service JSON-LD.
  },

  faq: [
    {
      pytanie: 'Ile kosztuje agent rekrutacyjny AI?',
      odpowiedz:
        'Koszt zależy od tego, co agent ma robić. Sam scoring CV to inna półka niż agent, który dodatkowo odpowiada kandydatom, umawia rozmowy i łączy się z kalendarzem oraz systemem rekrutacyjnym. Najczęściej startujemy od Sprintu Diagnostycznego za 1490 zł, który odliczamy od wdrożenia, gdy ruszamy ze współpracą. Pełną wycenę podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
    },
    {
      pytanie: 'Czy agent sam decyduje, kogo zatrudnić?',
      odpowiedz:
        'Nie. Agent robi pierwszy odsiew i wstępny scoring, żebyś najpierw widział kandydatów, którzy pasują pod Twoje kryteria. Selekcję i decyzję o zatrudnieniu zawsze podejmuje człowiek. Agent odciąża pierwszą linię, nie zastępuje rekrutera.',
    },
    {
      pytanie: 'Po czym agent ocenia kandydatów?',
      odpowiedz:
        'Po kryteriach, które ustalamy z Tobą na starcie: wymagane doświadczenie, umiejętności, dyspozycyjność, lokalizacja. Agent czyta CV pod te kryteria i nadaje wstępny scoring, a Ty widzisz, dlaczego dany kandydat wskoczył wyżej. Kryteria możesz zmieniać w każdej chwili.',
    },
    {
      pytanie: 'Czy agent jest zgodny z RODO?',
      odpowiedz:
        'Tak. Dane kandydatów przetwarzamy zgodnie z RODO, a infrastrukturę trzymamy w Unii Europejskiej. Kandydat wie, że pierwszy kontakt prowadzi agent AI, a Ty zachowujesz pełną kontrolę nad tym, co i jak długo jest przechowywane. Szczegóły ustalamy na diagnozie.',
    },
    {
      pytanie: 'Czy agent odpowie na pytania kandydatów?',
      odpowiedz:
        'Tak. Agent odpowiada na pytania o ofertę, etapy rekrutacji, tryb pracy i widełki, po polsku i w Twoim tonie. Kiedy czegoś nie wie, nie zmyśla, tylko przekazuje sprawę do Ciebie. Kandydat dostaje szybką odpowiedź, a Ty masz mniej powtarzalnych maili.',
    },
    {
      pytanie: 'Ile trwa wdrożenie agenta rekrutacyjnego?',
      odpowiedz:
        'Agent, który czyta CV i robi wstępny scoring, potrafi ruszyć w kilka dni. Wersja z umawianiem rozmów i integracją z kalendarzem czy systemem rekrutacyjnym zajmuje trochę dłużej, bo dochodzi łączenie systemów. Dokładny termin podajemy na bezpłatnej diagnozie.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Sprawdzimy, ile godzin miesięcznie zjada Ci pierwsza linia rekrutacji i ilu dobrych kandydatów gubisz przez wolną reakcję. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  queries: [
    'agent rekrutacyjny AI',
    'automatyzacja rekrutacji',
    'AI do rekrutacji',
    'agent AI do rekrutacji',
    'pierwszy kontakt z kandydatem AI',
  ],
};
