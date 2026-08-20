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
  dataAktualizacji: '2026-08-21',
  h1: 'Agent AI do rekrutacji i pierwszego kontaktu',

  kapsula:
    'Agent AI do rekrutacji to cyfrowy pracownik, który bierze na siebie pierwszą linię: zbiera CV, robi pierwszy odsiew i scoring, odpowiada kandydatom na pytania, umawia rozmowy i przygotowuje rekruterowi gotową notatkę. Działa jak outsourcing HR, tyle że przez całą dobę i zawsze tak samo. Decyzję o zatrudnieniu podejmujesz Ty. Uczymy go na Twoich kryteriach, a dane kandydatów zostają w Unii Europejskiej.',

  metaTitle: 'Agent rekrutacyjny AI: automatyzacja rekrutacji',
  metaDescription:
    'Agent rekrutacyjny AI zbiera CV, robi pierwszy odsiew i scoring, odpowiada kandydatom i umawia rozmowy. Automatyzacja rekrutacji, decyzja zostaje u Ciebie.',

  problem: {
    h2: 'Na czym naprawdę tracisz czas w rekrutacji?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Czas w rekrutacji zjada pierwsza linia: czytanie CV, które nie pasują, odpisywanie na te same pytania i wolna reakcja, przez którą najlepsi kandydaci odchodzą do konkurencji. Zanim usiądziesz do rozmów, godziny już zniknęły.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Gdzie znika godzina rekrutera?',
        ikona: 'lupa-wykres',
        chip: 'PIERWSZA LINIA',
        overline: 'PIERWSZA LINIA REKRUTACJI · CV, PYTANIA, CZAS REAKCJI',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'sto CV',
            opis: 'tyle zgłoszeń potrafi wpaść z jednego ogłoszenia i każde ktoś musi przeczytać',
            zrodlo: 'opis odsiewu w przełączniku niżej',
            ton: 'cyan',
          },
          {
            wartosc: '3 pytania',
            opis: 'widełki, tryb pracy i etapy rekrutacji wracają od prawie każdego kandydata',
            zrodlo: 'lista powtarzalnych pytań w przełączniku niżej',
            ton: 'violet',
          },
          {
            wartosc: 'po godzinach',
            opis: 'kandydaci piszą wieczorem, a odpowiedź rusza dopiero w godzinach pracy rekrutera',
            zrodlo: 'wiersz Czas reakcji w tabeli niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'przelacznik',
        grupa: 'agent-rekrutacyjny-strata-czasu',
        opcje: [
          {
            numer: 'STRATA 1',
            tytul: 'Odsiew CV',
            podtytul: 'sto CV z jednego ogłoszenia',
            naglowek: 'Ile z tych stu CV w ogóle pasuje do oferty?',
            akapity: [
              'Wrzucasz ogłoszenie i wpada sto CV. Większość nie pasuje, ale i tak trzeba je przeczytać po kolei, ręcznie. Odsiew zjada czas, zanim w ogóle dojdziesz do ludzi, z którymi warto rozmawiać.',
            ],
            punkty: [
              'część zgłoszeń wpada przez formularz na stronie',
              'część leży w skrzynce rekrutacyjnej',
              'każde trzeba otworzyć, przeczytać i ocenić z pamięci',
            ],
          },
          {
            numer: 'STRATA 2',
            tytul: 'Powtarzalne pytania',
            podtytul: 'widełki, tryb pracy, etapy',
            naglowek: 'Trzy pytania wracają od prawie każdego kandydata',
            akapity: [
              'Maile od kandydatów przychodzą niezależnie od tego, czy masz czas. Treść jest prawie zawsze ta sama, a każdy kandydat czeka na odpowiedź.',
            ],
            punkty: [
              'pytania o widełki wynagrodzenia',
              'pytania o tryb pracy',
              'pytania o etapy rekrutacji',
            ],
          },
          {
            numer: 'STRATA 3',
            tytul: 'Wolna reakcja',
            podtytul: 'kandydat idzie tam, gdzie odpisali szybciej',
            naglowek: 'Cisza po zgłoszeniu kosztuje najlepszych kandydatów',
            akapity: [
              'Dobry kandydat pisze i czeka. Jak czeka za długo, idzie do konkurencji, bo ktoś odpisał szybciej. Pierwszy kontakt z kandydatem decyduje: najlepszych ludzi gubisz przez wolną reakcję, nie przez brak kandydatów.',
            ],
            punkty: [
              'kandydat pisze wieczorem i przez noc nie wie, czy zgłoszenie w ogóle dotarło',
              'im dłużej trwa cisza, tym większa szansa, że przyjmie inną ofertę',
              'odchodzą nie ci słabi, tylko ci, którzy mieli w czym wybierać',
            ],
          },
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie robi agent rekrutacyjny?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Agent rekrutacyjny AI przejmuje pierwszą linię: zbiera CV, robi wstępny scoring pod Twoje kryteria, odpowiada kandydatom, umawia rozmowy i przygotowuje notatkę dla rekrutera. Decyzja o zatrudnieniu zawsze zostaje u Ciebie.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co dokładnie bierze na siebie agent?',
        ikona: 'osoba-check',
        chip: 'PIERWSZA LINIA',
        overline: 'AGENT PRZYGOTOWUJE · DECYZJĘ O ZATRUDNIENIU PODEJMUJE CZŁOWIEK',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Skąd agent bierze zgłoszenia?',
            akapity: [
              'Z formularza na stronie i ze skrzynki rekrutacyjnej, w jednym miejscu, żeby żadne zgłoszenie nie zostało pominięte.',
            ],
            punkty: [
              'Zbiera CV z formularza i ze skrzynki, więc automatyzacja rekrutacji obejmuje wszystkie zgłoszenia, nie tylko te z jednego kanału.',
              'Czyta CV pod Twoje kryteria i nadaje wstępny scoring, żebyś najpierw widział tych, którzy pasują.',
            ],
          },
          {
            naglowek: 'Kto odpowiada kandydatom, gdy piszą i gdy dzwonią?',
            akapity: [
              'Na wiadomości odpowiada agent, a pierwszą linię telefoniczną może przejąć voicebot AI rekrutacyjny. Oba kanały prowadzisz z jednego miejsca.',
            ],
            punkty: [
              'Odpowiada kandydatom na pytania o ofertę, etapy i widełki, po polsku i w Twoim tonie.',
              'Umawia rozmowy w Twoim kalendarzu i wysyła potwierdzenia, bez maili w tę i z powrotem.',
              'Voicebot odbiera telefony od kandydatów i zapisuje sprawy do oddzwonienia. Sam nie dzwoni, kontakt zwrotny zaczyna człowiek.',
            ],
          },
          {
            naglowek: 'Co masz na biurku przed rozmową?',
            akapity: [
              'Krótka notatka pod każdego kandydata, gotowa przed spotkaniem.',
            ],
            punkty: [
              'Notatkę agent układa sam, przed spotkaniem, więc na rozmowę wchodzisz przygotowany i nie przeglądasz CV w biegu.',
              'Tak pracuje agent AI do rekrutacji: przygotowuje materiał, a decyzję o zatrudnieniu podejmujesz Ty.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy AI może odrzucać kandydatów?',
        wariant: 'top',
        chip: 'ZASADA',
        akapity: [
          'Nie. Agent nie odrzuca nikogo sam. Robi pierwszy odsiew i wstępny scoring, a selekcję i decyzję o zatrudnieniu zawsze podejmuje człowiek.',
          'Agent odciąża pierwszą linię, nie zastępuje rekrutera. Ty widzisz, dlaczego dany kandydat wskoczył wyżej, i możesz zmienić kryteria w każdej chwili.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'AI w rekrutacji a RODO: dane kandydatów zostają w Unii Europejskiej',
        wariant: 'quiet',
        akapity: [
          'Dane kandydatów przetwarzamy zgodnie z RODO i AI Act, który obowiązuje w pełni od 2 sierpnia 2026. Infrastruktura stoi w Unii Europejskiej.',
          'Kandydat wie, że pierwszy kontakt prowadzi agent AI. Ty kontrolujesz, co jest przechowywane i jak długo. Szczegóły ustalamy na diagnozie.',
        ],
      },
    ],
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
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Koszt zależy od zakresu: sam scoring CV to inna półka niż agent, który dodatkowo odpowiada kandydatom, umawia rozmowy i łączy się z kalendarzem oraz systemem rekrutacyjnym. Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '0 zł',
            opis: 'bezpłatna diagnoza, około 30 minut',
            zrodlo: 'pierwszy krok, zanim cokolwiek zamówisz',
            ton: 'cyan',
          },
          {
            wartosc: '1490 zł netto',
            opis: 'Sprint Diagnostyczny, 5 dni roboczych',
            zrodlo: 'kwota odliczana w całości od wdrożenia',
            ton: 'violet',
          },
          {
            wartosc: '2 rundy',
            opis: 'poprawek w cenie wdrożenia',
            zrodlo: 'zasada cennika SimpleFast.ai',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co dokładnie płacisz, zanim ruszymy?',
        ikona: 'wykres-strzalka',
        chip: 'PIERWSZY KROK',
        overline: 'BEZPŁATNA DIAGNOZA · SPRINT DIAGNOSTYCZNY · KWOTA ODLICZANA OD WDROŻENIA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co wpływa na cenę agenta rekrutacyjnego?',
        wariant: 'edge',
        chip: 'CENNIK',
        akapity: [
          'Cenę liczymy od wartości: ile godzin miesięcznie agent zdejmuje z rekrutera i ilu dobrych kandydatów nie gubisz przez wolną reakcję (szac.).',
          'W cenie wdrożenia masz dwie rundy poprawek: tydzień testów, poprawki, drugi tydzień testów, poprawki i odbiór. Nowe funkcje to rozbudowa, którą wyceniamy osobno.',
        ],
        punkty: [
          'zakres pracy agenta: tylko scoring CV czy też odpowiedzi kandydatom i umawianie rozmów',
          'liczba integracji: formularz, skrzynka, kalendarz, system rekrutacyjny',
          'model rozliczenia po wdrożeniu: przekazanie infrastruktury i 0 zł abonamentu albo projekt u nas z opłatą utrzymaniową',
        ],
        stopka: [
          'Poprawki tego, co nie zadziałało po naszej stronie: zawsze, także po odbiorze.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co płacisz po wdrożeniu: dwa modele rozliczenia',
        wariant: 'quiet',
        chip: 'OPIEKA',
        akapity: [
          'Po wdrożeniu wybierasz jeden z dwóch modeli i mówimy o obu wprost, zanim cokolwiek zamówisz.',
          'Który model wybrać, ustalamy na diagnozie. Przy przekazaniu infrastruktury agent zostaje po Twojej stronie i prowadzisz go sam, bez abonamentu u nas.',
        ],
        punkty: [
          'przekazanie infrastruktury: 0 zł abonamentu, agent stoi na Twoich kontach, a zmiany zamawiane później rozliczamy godzinowo po 350 zł netto',
          'projekt u nas: opłata utrzymaniowa 99-599 zł netto miesięcznie, zależnie od zakresu pracy agenta i liczby integracji',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Bezpłatna diagnoza, potem Sprint Diagnostyczny',
        wariant: 'top',
        chip: 'START',
        akapity: [
          'Zaczynamy od bezpłatnej diagnozy: 0 zł, około 30 minut, a na koniec dostajesz konkretną listę rzeczy do automatyzacji w Twojej rekrutacji.',
          'Najczęściej pierwszym płatnym krokiem jest Sprint Diagnostyczny za 1490 zł netto: 5 dni roboczych i raport PDF z mapą procesów. Kwotę odliczamy w całości od wdrożenia, gdy wchodzimy we współpracę. Bez ukrytych kosztów.',
        ],
      },
    ],
    linkPoradnik: {
      przed: 'Jak liczymy koszt i zwrot z wdrożenia agenta, rozpisaliśmy w poradniku: ',
      etykieta: 'ile kosztuje wdrożenie AI agenta dla firmy',
      po: '.',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    },
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

  /* v22 (linki §3, P2 #15): strona miała 1 link wychodzący (kontakt) i 3
     wchodzące. Wdrożenie z rejestru dobrane po TYPIE systemu (agent AI
     odpowiadający pierwszej linii), nie po branży: rekrutacyjnego case'a
     w rejestrze nie ma i nie wymyślamy go. */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Firmowi Agenci AI 24/7',
        href: '/realizacje/agenci-ai-24-7',
        opis:
          'Agent odpowiada pierwszej linii o każdej porze i działa sam, bez czuwania zespołu przy stronie.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis:
          'Policz roczny koszt pierwszej linii rekrutacji i to, po ilu miesiącach zwróci się wdrożenie.',
      },
    ],
  },
};
