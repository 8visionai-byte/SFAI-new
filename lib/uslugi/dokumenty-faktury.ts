import type { Usluga } from './types';

/**
 * USŁUGA — DOKUMENTY I FAKTURY (OCR, KSeF).
 * OCR/odczyt faktur, klasyfikacja kosztów, wpis do arkusza/księgowości, eksport do KSeF.
 * Pierwsza nisza: BIURA RACHUNKOWE (najjaśniejszy ROI dokumentowy).
 * Realny case na zapleczu: faktury -> Excel -> księgowość -> KSeF (automat miesięczny).
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane):
 *  - ramaCeny.minPrice: realne "od X zł" za wdrożenie odczytu faktur (number, PLN).
 *    Dopiero wtedy włącza się kwota w UI i `offers` w Service JSON-LD. Dziś undefined.
 *  - cta.dowod: realna liczba z wdrożenia (np. faktur/mc przepuszczonych przez automat
 *    w biurze rachunkowym) ALBO case z liczbą + zgodą klienta. Do tego czasu uczciwe
 *    zdanie o diagnozie.
 *  - oszczędność godzin/mc na obróbce faktur: jeśli realna, oznaczyć "(szac.)" i wstawić
 *    do treści problemu/ceny. Dziś brak twardej liczby -> formułki bez kwoty.
 */
export const dokumentyFaktury: Usluga = {
  slug: 'dokumenty-faktury',
  dataAktualizacji: '2026-08-19',
  h1: 'Automatyzacja dokumentów i faktur (OCR, KSeF)',

  kapsula:
    'Automatyzacja faktur to system, który sam odczytuje fakturę (OCR), wyciąga kwoty, NIP i daty, przypisuje koszt do właściwej kategorii i wpisuje wszystko do arkusza lub programu księgowego, a na koniec eksportuje do KSeF. Robi to dla skanu, PDF-u i zdjęcia z telefonu. Ty nie przepisujesz nic ręcznie. Najjaśniejszy zysk widzą biura rachunkowe: faktury klientów lecą do Excela, do księgowości i do KSeF automatem, miesiąc po miesiącu. Dane zostają w Unii Europejskiej.',

  metaTitle: 'Automatyzacja faktur: OCR faktur AI i KSeF',
  metaDescription:
    'Automatyzacja dokumentów i faktur: OCR odczytuje fakturę, klasyfikuje koszt, wpisuje do arkusza i księgowości, eksportuje do KSeF. Bez przepisywania.',

  problem: {
    h2: 'Ile godzin miesięcznie przepisujesz faktury z ręki?',
    tresc:
      'Ktoś w Twojej firmie otwiera każdą fakturę, czyta ją i przepisuje numer, NIP, kwoty netto, VAT i datę do arkusza albo programu księgowego. Przy jednej fakturze to chwila, przy stu dziennie to cały etat na przepisywaniu.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'akapit',
        tekst: 'Faktura przychodzi mailem, w PDF, na zdjęciu albo na papierze. Bez automatyzacji procesu faktur każdy z tych formatów obrabiasz z ręki, a po przepisaniu ktoś jeszcze zgaduje, do której kategorii kosztu wrzucić dokument.',
      },
      {
        typ: 'lista',
        punkty: [
          'Literówka w NIP, która blokuje rozliczenie i wraca do poprawki.',
          'Zła kwota VAT, przepisana z pola obok na fakturze.',
          'Ta sama faktura wpisana dwa razy, bo przy stu dokumentach łatwo przeoczyć duplikat.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'W biurze rachunkowym ręczny przepis to najdroższa część roboty',
        wariant: 'edge',
        chip: 'KSeF',
        akapity: [
          'W biurze rachunkowym przepisywanie faktur klientów to najdroższa i najmniej wdzięczna część pracy. Dlatego automatyzacja faktur w biurze rachunkowym daje najjaśniejszy zysk: te same dokumenty, miesiąc po miesiącu, u wielu klientów naraz.',
          'Do tego dochodzi obowiązkowy KSeF. Jeśli nic się nie zmieni, to kolejny ręczny krok przy każdej fakturze, doklejony do przepisywania, które już dziś zjada czas.',
        ],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co dokładnie robi automat z fakturą?',
    tresc:
      'Automatyzacja faktur AI działa tak: automat odbiera fakturę z maila, folderu albo zdjęcia, odczytuje ją OCR-em, przypisuje koszt do kategorii i wpisuje do arkusza oraz programu księgowego. Na koniec przygotowuje fakturę do wysyłki do KSeF.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'kroki',
        wariant: 'os',
        kroki: [
          {
            tytul: 'Odczyt OCR',
            opis: 'OCR faktur AI czyta skan, PDF i zdjęcie z telefonu. Z każdego formatu wyciąga sprzedawcę, NIP, numer, daty oraz kwoty netto, VAT i brutto. Automatyczny odczyt faktur zastępuje czytanie i przepisywanie.',
          },
          {
            tytul: 'Kategoria kosztu',
            opis: 'Automat przypisuje koszt według planu kont, który ustawiamy pod Twoją firmę. Nikt nie zgaduje przy każdej fakturze, do której kategorii ją wrzucić.',
          },
          {
            tytul: 'Wpis do arkusza i księgowości',
            opis: 'Faktura ląduje w arkuszu i w programie księgowym bez drugiego przepisywania. Automatyczne księgowanie faktur oznacza, że dane wpisane raz trafiają wszędzie, gdzie mają być.',
          },
          {
            tytul: 'Eksport do KSeF',
            opis: 'Na koniec automat przygotowuje fakturę do wysyłki do KSeF, zgodnie z tym, jak rozliczasz dokumenty.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy automat sam przypisze koszt do właściwej kategorii?',
        wariant: 'top',
        chip: 'ZASADA',
        akapity: [
          'Typowe faktury przypisuje sam, bo zna Twój plan kont i reguły, według których księgujesz koszty.',
          'Faktury z błędem albo nietypowe odkłada na bok i pokazuje człowiekowi do zatwierdzenia, zamiast wpisywać je w ciemno.',
        ],
        punkty: [
          'Ty decydujesz, co automat robi sam, a co tylko podsuwa do akceptacji.',
          'Kontrola zostaje po Twojej stronie.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Dane Twoich faktur przetwarzamy w Unii Europejskiej. Automat łączy się tylko z narzędziami, na które się umówimy: arkuszem, programem księgowym i KSeF, a dostęp ustawiamy minimalny.',
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Ręczne przepisywanie faktur a automat OCR',
    naglowekBez: 'Ręczne przepisywanie',
    naglowekZNami: 'Automat OCR od SimpleFast.ai',
    wiersze: [
      { cecha: 'Odczyt faktury', bez: 'Czytasz i przepisujesz', zNami: 'OCR czyta za Ciebie' },
      { cecha: 'Skan, PDF, zdjęcie', bez: 'Każdy format z ręki', zNami: 'Automat bierze każdy' },
      { cecha: 'Kategoria kosztu', bez: 'Zgadujesz przy każdej', zNami: 'Przypisana wg planu kont' },
      { cecha: 'Wpis do księgowości', bez: 'Drugi raz przepisujesz', zNami: 'Wpisana automatem' },
      { cecha: 'Eksport do KSeF', bez: 'Osobny krok ręcznie', zNami: 'Przygotowany automatem' },
      { cecha: 'Błędy', bez: 'Literówki w NIP i VAT', zNami: 'Wątpliwe odkłada do akceptacji' },
      { cecha: 'Sto faktur dziennie', bez: 'Cały etat na przepisie', zNami: 'Ten sam automat, bez kolejki' },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy automatyzację faktur krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Patrzymy, ile faktur przerabiasz miesięcznie i gdzie idzie najwięcej ręcznej roboty. Sprawdzamy formaty, plan kont i to, jak dziś trafiają do księgowości i do KSeF. Mówimy, ile da się zdjąć z człowieka.',
      },
      {
        tytul: 'Wdrożenie automatu',
        opis:
          'Stawiamy odczyt OCR, uczymy go Twoich kategorii kosztów i łączymy z arkuszem, programem księgowym i KSeF. Puszczamy na Twoich realnych fakturach, ustawiasz, co automat robi sam, a co podsuwa do akceptacji.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Pilnujemy dokładności odczytu i dokładamy reguły dla nowych typów dokumentów. Kiedy zechcesz, rozszerzamy automat na kolejnych klientów biura albo na inne dokumenty: umowy, paragony, potwierdzenia przelewów.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje automatyzacja faktur?',
    tresc:
      'Automatyzacja procesu faktur to zwykle 3000-10000 zł netto, a pracę zaczynamy od Sprintu Diagnostycznego za 1490 zł netto, odliczanego w całości od wdrożenia. Sam odczyt faktur do arkusza to inna półka niż pełny obieg z księgowością i KSeF dla wielu klientów biura. Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'tabela',
        wKarcie: true,
        podpis: 'Ile kosztuje automatyzacja faktur: punkty startu',
        naglowki: [
          'Etap',
          'Cena',
          'Co dostajesz',
        ],
        wiersze: [
          [
            'Sprint Diagnostyczny',
            '1490 zł netto',
            '5 dni roboczych, raport PDF z mapą procesów, kwota odliczana w całości od wdrożenia',
          ],
          [
            'Automatyzacja procesu',
            'zwykle 3000-10000 zł netto',
            'zależnie od liczby integracji: arkusz, program księgowy, KSeF',
          ],
          [
            'Opieka po wdrożeniu',
            '99-599 zł netto/mies. albo 0 zł',
            '0 zł przy przekazaniu infrastruktury Tobie',
          ],
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dwie rundy poprawek w cenie i czas liczony od kompletu materiałów',
        wariant: 'quiet',
        chip: 'CENNIK',
        akapity: [
          'Trzy zasady, które mówimy wprost przy każdym wdrożeniu automatyzacji faktur.',
        ],
        punkty: [
          'Czas wdrożenia liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
          'Dwie rundy poprawek są w cenie wdrożenia: tydzień testów, poprawki, drugi tydzień, poprawki, odbiór.',
          'Po wdrożeniu wybierasz jeden z dwóch modeli: przekazanie infrastruktury Tobie bez abonamentu albo projekt u nas z opłatą utrzymaniową.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Cenę liczymy od wartości: od tego, ile godzin miesięcznie schodzi z ręcznego przepisywania i ile błędów znika. Sprint Diagnostyczny odliczamy od wdrożenia, gdy wchodzimy we współpracę. Bez ukrytych kosztów.',
      },
    ],
    // minPrice: undefined — brak realnej kwoty "od X" za wdrożenie. Bez offers w Service JSON-LD.
    /* v22 (linki §3, P1 #7): 74 wyświetlenia, pozycja 25,5, w raporcie SEO
       „temat się nagrzewa". Poradnik o biurze rachunkowym linkuje TUTAJ od
       sierpnia, brakowało kierunku powrotnego, a sam poradnik miał 1 link
       wchodzący. Render: RamaCeny.tsx, ten sam akapit co `tresc`. */
    linkPoradnik: {
      przed: 'Które procesy w biurze rachunkowym zdejmuje AI najpierw, rozpisaliśmy w poradniku: ',
      etykieta: 'AI w biurze rachunkowym',
      po: '.',
      href: '/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac',
    },
  },

  faq: [
    {
      pytanie: 'Ile kosztuje automatyzacja faktur?',
      odpowiedz:
        'Koszt zależy od skali i zakresu. Sam odczyt faktur do arkusza to inna półka niż pełny obieg z księgowością i KSeF dla wielu klientów biura. Pracę zaczynamy od Sprintu Diagnostycznego za 1490 zł, który odliczamy od wdrożenia, gdy wchodzimy we współpracę. Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów. Po wdrożeniu dostajesz opiekę w abonamencie od 99 zł miesięcznie, nie zostawiamy klientów.',
    },
    {
      pytanie: 'Czy OCR poradzi sobie ze zdjęciem faktury z telefonu?',
      odpowiedz:
        'Tak. Automat czyta skan, PDF i zdjęcie zrobione telefonem. Wyciąga sprzedawcę, NIP, numer, daty oraz kwoty netto, VAT i brutto. Jeśli zdjęcie jest słabej jakości albo faktura jest nietypowa, automat nie wpisuje danych w ciemno. Odkłada ją do akceptacji człowieka, żeby nic błędnego nie weszło do księgowości.',
    },
    {
      pytanie: 'Czy to działa z KSeF?',
      odpowiedz:
        'Tak. Po odczycie i klasyfikacji automat przygotowuje fakturę do eksportu do KSeF, zgodnie z tym, jak rozliczasz dokumenty. KSeF jest obowiązkowy, więc układamy obieg tak, żeby faktura przeszła od odczytu, przez księgowość, aż po KSeF bez ręcznego przepisywania na każdym etapie.',
    },
    {
      pytanie: 'Czy automat sam przypisze koszt do właściwej kategorii?',
      odpowiedz:
        'Tak. Uczymy go Twojego planu kont i reguł, według których przypisujesz koszty. Typowe faktury przypisuje sam. Te, których nie jest pewny, podsuwa człowiekowi do zatwierdzenia, zamiast zgadywać. Z czasem reguł przybywa i automat radzi sobie z coraz większą częścią dokumentów.',
    },
    {
      pytanie: 'Czy to jest bezpieczne i gdzie trafiają moje faktury?',
      odpowiedz:
        'Dane Twoich faktur przetwarzamy w Unii Europejskiej i łączymy się tylko z tymi narzędziami, na które się umówimy: Twoim arkuszem, programem księgowym i KSeF. Nie wysyłamy faktur tam, gdzie nie trzeba. Dostęp ustawiamy minimalny, a Ty decydujesz, które kroki automat wykonuje sam, a które dopiero po akceptacji człowieka.',
    },
    {
      pytanie: 'Czy to się opłaca przy mojej liczbie faktur?',
      odpowiedz:
        'To zależy od tego, ile faktur przerabiasz i ile czasu idzie dziś na ręczne przepisywanie. Im więcej dokumentów i im bardziej powtarzalna robota, tym szybciej automat się zwraca. Dlatego najszybszy zysk widzą biura rachunkowe. Ile godzin miesięcznie realnie zejdzie z Twojego zespołu, policzymy na bezpłatnej diagnozie, na Twoich liczbach.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy na Twoich fakturach, ile godzin miesięcznie schodzi z ręcznego przepisywania i ile błędów znika. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby na Twoich fakturach, potem decyzja.',
  },

  queries: [
    'automatyzacja faktur',
    'OCR faktur AI',
    'automatyzacja dokumentów',
    'KSeF',
    'automatyczne księgowanie faktur',
  ],

  /* v22 (linki §3, P2 #13 i #15): produkt `skaner-faktur-ksef` robi dokładnie
     to, co ta usługa, i stał na hubie bez ani jednego linku z treści serwisu.
     Kotwica '/produkty#<slug>' jest realna: ProduktCard renderuje id={slug}. */
  powiazane: {
    realizacje: [
      {
        etykieta: 'Automatyczne raporty zamiast ręcznych arkuszy',
        href: '/realizacje/automatyczne-raporty',
        opis:
          'Ten sam schemat na innym dokumencie: dane spinają się same, zamiast być przepisywane do arkuszy.',
      },
    ],
    produkty: [
      {
        etykieta: 'Skaner faktur, który przepisuje je za Ciebie i przygotowuje eksport do KSeF',
        href: '/produkty#skaner-faktur-ksef',
        opis:
          'Wrzucasz zdjęcie albo skan, system wyciąga dane do arkusza, a raz w miesiącu składa eksport do KSeF.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Policz, ile złotych rocznie kosztuje Cię ręczne przepisywanie faktur do arkusza i księgowości.',
      },
    ],
  },
};
