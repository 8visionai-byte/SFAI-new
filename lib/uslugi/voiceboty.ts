import type { Usluga } from './types';

/**
 * USŁUGA 3 — VOICEBOTY (voicebot dla firmy).
 * Treść fazy 3 z 06-copy-hero-uslugi.md §"USŁUGA 3".
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * INPUT PAWŁA (nie renderowane, do uzupełnienia przed shipem):
 *  - ramaCeny.minPrice: 2500 USTAWIONE (pakiet startowy, decyzja Pawła
 *    z 2026-08-16, locked). Kwota w UI i `offers` w Service JSON-LD włączone.
 *  - Model kosztu działania: abonament czy stawka za minutę/rozmowę (do rozmowy na diagnozie).
 *  - cta.dowod: gdy będzie realna liczba operacyjna (np. połączeń odebranych przez
 *    voicebota klienta w miesiącu) albo case z imieniem i firmą za zgodą, podmienić
 *    uczciwe zdanie o diagnozie na ten dowód. Do tego czasu bez atrapy liczby.
 */
export const voiceboty: Usluga = {
  slug: 'voiceboty',
  dataAktualizacji: '2026-08-17',
  h1: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
  kapsula:
    'Voicebot, nazywany też botem telefonicznym, to bot głosowy, który odbiera telefon, rozmawia po polsku i załatwia sprawę: umawia wizytę, przyjmuje zgłoszenie, odpowiada na pytanie. Gdy sprawa wymaga człowieka, zapisuje ją i wysyła Ci powiadomienie, żebyś oddzwonił przygotowany. Działa 24/7, nawet gdy jesteś u klienta. To nie nagranie ani „wciśnij jeden”. To Agent, który rozmawia i wykonuje zadanie, a potem przekazuje Ci tylko to, co ważne.',

  metaTitle: 'Voicebot od 2500 zł: bot telefoniczny 24/7',
  metaDescription:
    'Voicebot dla firm od 2500 zł jednorazowo za wdrożenie, opieka od 99 zł/mies. Bot telefoniczny odbiera po polsku 24/7 i umawia wizyty. Bezpłatna diagnoza.',

  problem: {
    h2: 'Ile telefonów dziennie nie odbierasz?',
    tresc:
      'Telefon dzwoni, kiedy jesteś u klienta albo masz ręce zajęte. Połowy połączeń nie odbierasz, a to są pieniądze, które uciekają do konkurencji, która odebrała. Klient, który nie dodzwonił się raz, często nie dzwoni drugi. Nagrywarka nic nie załatwia, a etat tylko po to, żeby odbierać telefon, to koszt, na który mała firma nie zawsze ma miejsce.',
  },

  rozwiazanie: {
    h2: 'Co robi bot telefoniczny, gdy nie możesz odebrać?',
    tresc:
      'Voicebot odbiera każde połączenie, rozmawia naturalnie po polsku i robi to, co trzeba: umawia termin i zapisuje go w kalendarzu, przyjmuje zgłoszenie z konkretami, odpowiada na częste pytania. Jeśli sprawa jest trudna, bierze kontakt i mówi, że oddzwonisz. Po rozmowie dostajesz krótkie podsumowanie, więc wiesz, co się działo. Klient zawsze słyszy, że rozmawia z asystentem AI, a Ty ustawiasz, co bot może, a czego nie.',
  },

  tabelaPorownawcza: {
    // H2 z synonimem "agent głosowy" (decyzja Pawła 2026-08-16; "bot telefoniczny"
    // siedzi w rozwiazanie.h2, "wirtualna recepcjonistka" celowo NIE występuje).
    h2: 'Agent głosowy a odbieranie telefonu ręcznie',
    naglowekBez: 'Telefon odbierany ręcznie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      { cecha: 'Nieodebrane połączenia', bez: 'Połowa, gdy jesteś zajęty', zNami: 'Odbiera, gdy Ty nie możesz' },
      { cecha: 'Godziny', bez: 'Tylko gdy ktoś jest przy telefonie', zNami: '24/7, też wieczorem i w weekend' },
      { cecha: 'Umawianie wizyt', bez: 'Ręcznie, w przerwie', zNami: 'Sam zapisuje w kalendarzu' },
      { cecha: 'Oddzwanianie', bez: 'Na ślepo, jeśli ktoś zdąży', zNami: 'Oddzwaniasz z gotową notatką ze sprawy' },
      { cecha: 'Koszt', bez: 'Etat albo Twój czas', zNami: 'Bot, bez etatu na odbieranie' },
      { cecha: 'Po rozmowie', bez: 'Pamiętasz albo nie', zNami: 'Krótkie podsumowanie do Ciebie' },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy voicebota krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Sprawdzamy, ile połączeń tracisz i co bot ma załatwiać: umawianie, zgłoszenia, częste pytania. Mówimy wprost, czy to się u Ciebie opłaca.',
      },
      {
        tytul: 'Nagranie i wdrożenie',
        opis:
          'Ustawiamy scenariusze rozmowy, ton i granice. Podłączamy numer i kalendarz. Testujemy na żywo, aż brzmi i działa tak, jak chcesz.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis:
          'Słuchamy rozmów, poprawiamy odpowiedzi, dokładamy scenariusze. Voicebot robi się coraz lepszy, a Ty widzisz, co załatwił.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot dla firmy?',
    tresc:
      'Pakiet startowy zaczyna się od 2500 zł. W tej cenie dostajesz bota, który odbiera telefon 24/7 i rozmawia po polsku, umawianie wizyt oraz wdrożenie i konfigurację. Do tego dochodzi koszt działania zależny od liczby rozmów. Bot rozbudowany o zgłoszenia i powiadomienia to wyższa półka, wyceniana od zakresu. Dokładną wycenę podajemy po bezpłatnej diagnozie, zanim cokolwiek zamówisz. Każde nasze wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie, bo nie zostawiamy klientów samych z botem. Bez ukrytych kosztów.',
    minPrice: 2500, // pakiet startowy (locked 2026-08-16): kwota w UI + offers w Service JSON-LD.
    /* SEO 2026-08-17: linkowanie wewnętrzne do poradnika cenowego (zdanie 1:1
       z brief-seo-2026-08-17; render w RamaCeny.tsx w tym samym akapicie). */
    linkPoradnik: {
      przed: 'Koszty wdrożeń AI rozpisaliśmy w ',
      etykieta: 'poradniku o cenie agenta AI',
      po: '.',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    },
  },

  faq: [
    {
      pytanie: 'Czym jest voicebot?',
      odpowiedz:
        'Voicebot, nazywany też botem telefonicznym albo agentem głosowym, to bot głosowy, który odbiera telefon i rozmawia po polsku jak asystent: umawia wizyty, przyjmuje zgłoszenia i odpowiada na pytania. Działa 24/7. To nie nagranie ani menu „wciśnij jeden”, tylko rozmowa, która kończy się załatwioną sprawą.',
    },
    {
      pytanie: 'Czy voicebot dzwoni sam do klientów?',
      odpowiedz:
        'Nie. Nasz voicebot obsługuje połączenia przychodzące: odbiera telefon i prowadzi rozmowę. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Gdy sprawa wymaga kontaktu zwrotnego, bot ją zapisuje i wysyła powiadomienie, można też ustawić SMS z numerem firmy. Rozmowę zaczyna człowiek albo klient, który oddzwania.',
    },
    {
      pytanie: 'Czy klient pozna, że rozmawia z botem?',
      odpowiedz:
        'Tak, i tak ma być. Voicebot na początku mówi, że jest asystentem AI. Tego wymaga AI Act, a my się tego trzymamy. Brzmi naturalnie i po polsku, ale nikogo nie udaje. Klient wie, z kim rozmawia.',
    },
    {
      pytanie: 'Co, jeśli sprawa jest zbyt trudna dla bota?',
      odpowiedz:
        'Wtedy voicebot nie udaje, że wie. Bierze kontakt, zapisuje, czego dotyczy sprawa, i mówi klientowi, że oddzwonisz. Ty dostajesz podsumowanie i oddzwaniasz przygotowany. Ustawiasz z góry, które sprawy bot ma przekazywać dalej.',
    },
    {
      pytanie: 'Czy voicebot umówi wizytę w moim kalendarzu?',
      odpowiedz:
        'Tak. Łączymy go z Twoim kalendarzem, więc bot widzi wolne terminy, proponuje je klientowi i zapisuje wizytę od razu. Wysyła też potwierdzenie. Ty masz aktualny kalendarz bez ręcznego wpisywania.',
    },
    {
      pytanie: 'Ile kosztuje voicebot?',
      odpowiedz:
        'Pakiet startowy kosztuje od 2500 zł. W tej cenie jest bot, który odbiera telefon 24/7 i rozmawia po polsku, umawianie wizyt oraz wdrożenie i konfiguracja. Do tego dochodzi koszt działania zależny od liczby rozmów. Dokładną wycenę podajemy po bezpłatnej diagnozie, zanim cokolwiek zamówisz. Każde wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie, bo nie zostawiamy klientów samych z botem. Bez ukrytych kosztów.',
    },
    {
      pytanie: 'Czy moje rozmowy i dane będą bezpieczne?',
      odpowiedz:
        'Tak. Dane z rozmów zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty decydujesz, co bot nagrywa i przechowuje. W każdej chwili masz wgląd i kontrolę.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Policzymy, ile połączeń miesięcznie tracisz i ile wizyt umówi za Ciebie voicebot. Bez zobowiązań.',
    dowod:
      'Każde wdrożenie zaczynamy od bezpłatnej diagnozy. Najpierw liczby, potem decyzja.',
  },

  queries: [
    'voicebot dla firmy',
    'bot telefoniczny',
    'bot głosowy',
    'agent głosowy',
    'czym jest voicebot',
    'ile kosztuje voicebot',
    'AI odbiera telefon',
    'czy voicebot dzwoni sam do klientów',
  ],
};
