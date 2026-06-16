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
  h1: 'Automatyzacja dokumentów i faktur (OCR, KSeF)',

  kapsula:
    'Automatyzacja faktur to system, który sam odczytuje fakturę (OCR), wyciąga kwoty, NIP i daty, przypisuje koszt do właściwej kategorii i wpisuje wszystko do arkusza lub programu księgowego, a na koniec eksportuje do KSeF. Robi to dla skanu, PDF-u i zdjęcia z telefonu. Ty nie przepisujesz nic ręcznie. Najjaśniejszy zysk widzą biura rachunkowe: faktury klientów lecą do Excela, do księgowości i do KSeF automatem, miesiąc po miesiącu. Dane zostają w Unii Europejskiej.',

  metaTitle: 'Automatyzacja faktur: OCR faktur AI i KSeF',
  metaDescription:
    'Automatyzacja dokumentów i faktur: OCR odczytuje fakturę, klasyfikuje koszt, wpisuje do arkusza i księgowości, eksportuje do KSeF. Bez ręcznego przepisywania. Najszybszy ROI w biurach rachunkowych.',

  problem: {
    h2: 'Ile godzin miesięcznie przepisujesz faktury z ręki?',
    tresc:
      'Faktura przychodzi mailem, w PDF, na zdjęciu albo na papierze. Ktoś otwiera ją, czyta, przepisuje numer, NIP, kwotę netto, VAT i datę do arkusza albo do programu księgowego. Potem zgaduje, do której kategorii kosztu to wrzucić. Przy jednej fakturze to chwila. Przy stu dziennie to cały etat na przepisywaniu. A człowiek się myli: literówka w NIP, zła kwota VAT, faktura wpisana dwa razy. W biurze rachunkowym ten ręczny przepis to najdroższa i najmniej wdzięczna część roboty, a do tego dochodzi obowiązkowy KSeF.',
  },

  rozwiazanie: {
    h2: 'Co dokładnie robi automat z fakturą?',
    tresc:
      'Automat odbiera fakturę z maila, folderu albo zdjęcia, odczytuje ją OCR-em i wyciąga dane: sprzedawcę, NIP, numer, daty, kwoty netto, VAT i brutto. Sam przypisuje koszt do kategorii, którą ustawiamy pod Twój plan kont. Wpisuje fakturę do arkusza i do programu księgowego, a potem przygotowuje ją do wysyłki do KSeF. Faktury z błędem albo nietypowe odkłada na bok i pokazuje człowiekowi do zatwierdzenia, zamiast wpisywać je w ciemno. Ty decydujesz, co automat robi sam, a co tylko podsuwa do akceptacji. Kontrola zostaje po Twojej stronie.',
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
      'Koszt zależy od skali i zakresu. Inaczej wycenia się sam odczyt faktur do arkusza, a inaczej pełny obieg: OCR, klasyfikacja kosztów, wpis do programu księgowego i eksport do KSeF dla wielu klientów biura. Pracę zaczynamy od Sprintu Diagnostycznego za 1490 zł, który odliczamy od wdrożenia, gdy wchodzimy we współpracę. Cenę liczymy od wartości: ile godzin miesięcznie schodzi z ręcznego przepisywania i ile błędów znika. Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.',
    // minPrice: undefined — brak realnej kwoty "od X" za wdrożenie. Bez offers w Service JSON-LD.
  },

  faq: [
    {
      pytanie: 'Ile kosztuje automatyzacja faktur?',
      odpowiedz:
        'Koszt zależy od skali i zakresu. Sam odczyt faktur do arkusza to inna półka niż pełny obieg z księgowością i KSeF dla wielu klientów biura. Pracę zaczynamy od Sprintu Diagnostycznego za 1490 zł, który odliczamy od wdrożenia, gdy wchodzimy we współpracę. Dokładne widełki podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów i bez abonamentu na siłę.',
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
};
