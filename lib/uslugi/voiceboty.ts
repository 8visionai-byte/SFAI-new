import type { Usluga } from './types';

/**
 * USŁUGA 3 — VOICEBOTY (voicebot dla firmy).
 * Treść fazy 3 z 06-copy-hero-uslugi.md §"USŁUGA 3".
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * CENNIK OBOWIĄZUJĄCY (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §2
 * plus decyzje Pawła z 2026-08-19). TRZY OSOBNE POZYCJE, nie jeden abonament.
 * To jest nasza największa przewaga komunikacyjna: konkurencja miesza wszystko
 * w jeden ryczałt 499-1700 zł/mies., przez co klient nie wie, za co płaci.
 * Każda kwota NETTO:
 *  1. STWORZENIE (jednorazowo): prosty 2500 zł, z integracjami 5000-9000 zł,
 *  2. UTRZYMANIE: 299-1500 zł/mies. gdy infrastruktura zostaje u nas, ALBO
 *     0 zł/mies. gdy przekazujemy infrastrukturę klientowi (poprawki wtedy
 *     350 zł netto za godzinę),
 *  3. ZUŻYCIE: tokeny i minuty rozmów wg realnego użycia, po stronie klienta.
 * Widełki 99-599 zł/mies. NIE dotyczą już voicebotów (zostają przy chatbotach,
 * które są prostsze w utrzymaniu). `ramaCeny.minPrice` = 2500 bez zmian.
 *
 * ZASADA CZASU i RUNDY POPRAWEK (audyt §1, obowiązują całe wdrożenia): czas
 * liczymy OD PRZEKAZANIA KOMPLETU MATERIAŁÓW przez klienta, nie od podpisania
 * umowy; dwie rundy poprawek są w cenie wdrożenia.
 *
 * CZAS WDROŻENIA (podał Paweł 2026-08-20, zamyka wcześniejszy BRAK DANEJ):
 * prosty 3-5 dni roboczych, z integracjami 5-25 dni roboczych, zależnie od
 * zakresu. Liczone od przekazania kompletu materiałów.
 *
 * INPUT PAWŁA (nie renderowane, do uzupełnienia przed shipem):
 *  - cta.dowod: gdy będzie realna liczba operacyjna (np. połączeń odebranych przez
 *    voicebota klienta w miesiącu) albo case z imieniem i firmą za zgodą, podmienić
 *    uczciwe zdanie o diagnozie na ten dowód. Do tego czasu bez atrapy liczby.
 */
export const voiceboty: Usluga = {
  slug: 'voiceboty',
  dataAktualizacji: '2026-08-20',
  h1: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
  /* BLOK KRÓTKIEJ ODPOWIEDZI (audyt §9 etap 1 pkt 2 i §2): pierwszy akapit po
     H1 rozbija koszt na TRZY JAWNE POZYCJE, bo to jedyna rzecz, której nie ma
     żaden konkurent z top10 (wszyscy podają jeden abonament). Przed tą zmianą
     kapsuła miała 0 z 4 wielkości i była definicją, nie ofertą. */
  kapsula:
    'Voicebot dla firmy ma trzy osobne koszty, a nie jeden abonament. Stworzenie: 2500 zł netto za bota prostego albo 5000 do 9000 zł netto za bota z integracjami, płatne raz. Utrzymanie: 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie. Zużycie: tokeny i minuty rozmów według realnego użycia, po Twojej stronie. Bot prosty powstaje w 3 do 5 dni roboczych, bot z integracjami w 5 do 25 dni roboczych, licząc od przekazania kompletu materiałów. Bot odbiera telefon 24/7, rozmawia po polsku i sam załatwia sprawę.',

  /* metaTitle 2026-08-19: dopisane „netto" do kwoty (audyt §9 etap 1 pkt 4).
     „24/7" wypadło z tytułu, bo z sufiksem marki („ · SimpleFast.ai", 16 zn.)
     wersja z 24/7 miała 64 znaki, czyli powyżej progu obcięcia w SERP.
     Fraza pieniężna „bot telefoniczny" ZOSTAJE, a 24/7 stoi w opisie, H1,
     kapsule, tabeli i FAQ tej strony. */
  metaTitle: 'Voicebot od 2500 zł netto: bot telefoniczny',
  metaDescription:
    'Voicebot dla firm: stworzenie od 2500 zł netto, utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł przy przekazaniu infrastruktury. Odbiera telefon 24/7.',

  problem: {
    h2: 'Ile telefonów dziennie nie odbierasz?',
    tresc:
      'Telefon dzwoni, kiedy jesteś u klienta albo masz ręce zajęte, i połowy połączeń nie odbierasz. To pieniądze, które uciekają do konkurencji, która odebrała.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'lista',
        punkty: [
          'Jesteś u klienta albo masz ręce zajęte. Telefon dzwoni właśnie wtedy i nikt go nie odbiera, bo w małej firmie nie ma kto.',
          'Wieczory i weekendy. Telefon odbierany ręcznie działa tylko wtedy, gdy ktoś przy nim siedzi, a klienci dzwonią też po godzinach.',
          'Klient, który nie dodzwonił się raz, często nie dzwoni drugi. Wybiera firmę, która odebrała od razu.',
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Nagrywarka nic nie załatwia. Klient zostawia wiadomość albo się rozłącza, a sprawa i tak czeka na Ciebie. Zamiast załatwionego tematu masz kolejną rzecz do odsłuchania i oddzwonienia.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Etat tylko do odbierania telefonu to koszt, na który mała firma nie zawsze ma miejsce',
        akapity: [
          'Alternatywa jest dziś prosta: albo ktoś siedzi przy telefonie na etacie, albo odbierasz sam i płacisz za to własnym czasem. Obie drogi kosztują, tylko w różnej walucie.',
          'Dlatego nieodebrany telefon to nie kwestia wygody, tylko utracony klient. Każde takie połączenie to sprawa, która trafiła gdzie indziej, i pieniądze, które zarobił ktoś inny.',
        ],
        wariant: 'quiet',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co robi bot telefoniczny, gdy nie możesz odebrać?',
    tresc:
      'Voicebot odbiera każde połączenie, rozmawia naturalnie po polsku i sam załatwia sprawę do końca. Działa 24/7, także wieczorem i w weekend.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'lista',
        punkty: [
          'Umawia termin i od razu zapisuje go w Twoim kalendarzu, a klientowi wysyła potwierdzenie.',
          'Przyjmuje zgłoszenie z konkretami: kto dzwonił, w jakiej sprawie i czego potrzebuje.',
          'Odpowiada na częste pytania, więc bot do odbierania telefonów zdejmuje z Ciebie powtarzalne rozmowy.',
          'Po rozmowie wysyła Ci krótkie podsumowanie, więc wiesz, co się działo, nawet gdy nie było Cię przy telefonie.',
          'Nie ma godzin pracy. Obsługa klienta 24/7 przez voicebota znaczy, że klient załatwia sprawę wtedy, kiedy dzwoni, także po godzinach.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy voicebot dzwoni sam do klientów?',
        akapity: [
          'Nie. Voicebot tylko odbiera: obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy.',
          'Gdy sprawa wymaga kontaktu zwrotnego, bot ją zapisuje i wysyła Ci powiadomienie. Rozmowę zaczyna wtedy człowiek albo klient, który oddzwania.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co, jeśli sprawa jest zbyt trudna dla bota?',
        akapity: [
          'Bot nie udaje, że wie. Bierze kontakt, zapisuje, czego dotyczy sprawa, i mówi klientowi, że oddzwonisz. Ty oddzwaniasz z gotową notatką, więc rozmowę zaczynasz przygotowany.',
          'Ty ustawiasz z góry, co bot może, a czego nie. Klient zawsze słyszy na początku, że rozmawia z asystentem AI. Tego wymaga AI Act i my się tego trzymamy.',
        ],
        wariant: 'top',
      },
    ],
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
      /* 2026-08-19 (audyt §2): trzy DOŁOŻONE wiersze wnoszą do tabeli trzy
         jawne pozycje kosztu. Zero usuniętych wierszy, zero zmian
         w istniejących. Bramka „24/7" w `ServiceHero.kafleStatystyk` bierze
         PIERWSZY pasujący wiersz („Godziny"), więc dokładanie na końcu jej
         nie rusza. */
      { cecha: 'Stworzenie bota', bez: 'Rekrutacja i wdrożenie osoby', zNami: 'Od 2500 zł netto, płatne raz' },
      /* Czas podany przez Pawła 2026-08-20 (wcześniej BRAK DANEJ). */
      { cecha: 'Czas wdrożenia', bez: 'Tygodnie na wdrożenie osoby', zNami: 'Od 3 do 25 dni roboczych' },
      { cecha: 'Koszt miesięczny', bez: 'Pensja co miesiąc', zNami: '299 do 1500 zł netto albo 0 zł' },
      { cecha: 'Rozliczenie', bez: 'Jedna wypłata za wszystko', zNami: 'Trzy jawne pozycje, nie ryczałt' },
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
    /* TRZY OSOBNE POZYCJE (audyt §2). Fraza „pakiet startowy" zostaje w treści
       celowo: `ServiceHero.KAFEL_CENY` opisuje kafel ceny voicebotów słowami
       1:1 z tego akapitu („od 2500 zł / pakiet startowy"). */
    tresc:
      'Voicebot ma trzy osobne pozycje kosztu, a nie jeden abonament, w którym wszystko jest schowane: stworzenie od 2500 zł netto za pakiet startowy, płatne raz, utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł, oraz zużycie tokenów i minut rozliczane według realnego użycia. Bot prosty powstaje w 3 do 5 dni roboczych, z integracjami w 5 do 25 dni roboczych.',
    /* Runda struktury 2026-08-19 (raport P8): szczegóły z dawnego akapitu-ściany
       zeszły do bloków silnika treści; fakty 1:1, forma na strukturę. */
    bloki: [
      {
        typ: 'tabela',
        naglowki: [
          'Pozycja',
          'Ile płacisz',
          'Kiedy',
        ],
        wiersze: [
          [
            'Stworzenie: bot prosty (pakiet startowy)',
            '2500 zł netto',
            'raz, przy wdrożeniu',
          ],
          [
            'Stworzenie: bot z integracjami, np. z kalendarzem',
            '5000 do 9000 zł netto',
            'raz, przy wdrożeniu',
          ],
          [
            'Utrzymanie: infrastruktura u nas',
            '299 do 1500 zł netto',
            'co miesiąc',
          ],
          [
            'Utrzymanie: infrastruktura przekazana Tobie',
            '0 zł miesięcznie, poprawki 350 zł netto za godzinę',
            'tylko gdy zamawiasz poprawki',
          ],
          [
            'Zużycie: tokeny i minuty rozmów',
            'według realnego użycia',
            'po Twojej stronie, co miesiąc',
          ],
        ],
        wKarcie: true,
        podpis: 'Trzy osobne pozycje kosztu voicebota. Każda kwota netto.',
      },
      {
        typ: 'akapit',
        tekst: 'Pakiet startowy za 2500 zł netto to prosta baza wiedzy, kierowanie rozmów i odpowiedzi na powtarzalny zestaw pytań. Bot z integracjami, na przykład z kalendarzem, i z rozbudowanymi scenariuszami to 5000 do 9000 zł netto, płatne raz przy wdrożeniu.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy muszę płacić abonament co miesiąc?',
        akapity: [
          'Nie musisz, wybierasz jedną z dwóch dróg. Pierwsza: infrastruktura zostaje u nas, my ją trzymamy i pilnujemy, a Ty płacisz 299 do 1500 zł netto miesięcznie.',
          'Druga: przekazujemy Ci całą infrastrukturę i płacisz nam 0 zł miesięcznie. Poprawki zamawiasz wtedy godzinowo, po 350 zł netto za godzinę, tylko gdy ich potrzebujesz.',
          'Trzecia pozycja, zużycie, w obu drogach zostaje po Twojej stronie: tokeny i minuty rozmów według realnego użycia. Przy ofercie z jednym abonamentem zużycie też płacisz, tylko tego nie widać.',
        ],
        wariant: 'top',
        chip: 'CENNIK',
        stopka: [
          'U większości firm z abonamentu nie da się wyjść, u nas da się.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czas liczymy od przekazania kompletu materiałów, a dwie rundy poprawek są w cenie',
        akapity: [
          'Czas wdrożenia liczymy od momentu, w którym przekazujesz nam komplet materiałów: scenariusze, treści i dostępy. Nie od podpisania umowy. Bot prosty to 3 do 5 dni roboczych, bot z integracjami 5 do 25 dni roboczych, a dokładny termin dla Twojego scenariusza potwierdzamy na bezpłatnej diagnozie.',
          'W cenie wdrożenia są dwie rundy poprawek: tydzień testów i poprawki, drugi tydzień i kolejne poprawki, potem odbiór. To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
    ],
    minPrice: 2500, // pakiet startowy (locked 2026-08-16, audyt §2 potwierdza): UI + offers w JSON-LD.
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
        'Voicebot ma trzy osobne koszty. Stworzenie bota: 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto za wersję z integracjami, płatne raz. Utrzymanie: 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie. Zużycie: tokeny i minuty rozmów według realnego użycia, po Twojej stronie.',
    },
    {
      pytanie: 'Czy moje rozmowy i dane będą bezpieczne?',
      odpowiedz:
        'Tak. Dane z rozmów zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty decydujesz, co bot nagrywa i przechowuje. W każdej chwili masz wgląd i kontrolę.',
    },
    /* 2026-08-19 (audyt §2 i §1): TRZY DOŁOŻONE pytania. Wyjście z abonamentu,
       koszt zużycia i rundy poprawek to fakty, których nie podaje żaden
       konkurent z top10, a my mamy je potwierdzone przez Pawła. Żadne
       istniejące pytanie nie zostało usunięte. */
    {
      pytanie: 'Czy muszę płacić abonament co miesiąc?',
      odpowiedz:
        'Nie musisz. Masz dwie drogi. Infrastruktura zostaje u nas, my ją trzymamy i pilnujemy, a Ty płacisz 299 do 1500 zł netto miesięcznie. Albo przekazujemy Ci całą infrastrukturę, utrzymujesz ją sam i płacisz nam 0 zł miesięcznie, a poprawki zamawiasz wtedy godzinowo po 350 zł netto za godzinę. U większości firm z abonamentu nie da się wyjść, u nas da się.',
    },
    {
      pytanie: 'Za co dokładnie płacę przy voicebocie?',
      odpowiedz:
        'Za trzy osobne rzeczy, każdą widzisz z osobna. Za stworzenie bota, czyli 2500 zł netto albo 5000 do 9000 zł netto z integracjami, płatne raz. Za utrzymanie, czyli 299 do 1500 zł netto miesięcznie albo 0 zł przy przekazaniu infrastruktury. Za zużycie, czyli tokeny i minuty rozmów według realnego użycia. Przy ofercie z jednym abonamentem miesięcznym zużycie też płacisz, tylko tego nie widać.',
    },
    {
      pytanie: 'Ile rund poprawek jest w cenie wdrożenia?',
      odpowiedz:
        'Dwie. Testujesz bota przez tydzień i zapisujesz uwagi, my je wdrażamy. Testujesz drugi tydzień i zgłaszasz kolejne, wdrażamy je i wtedy jest odbiór. Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze. Nowe funkcje, których nie było w pierwszej rozmowie, to rozbudowa wyceniana osobno.',
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

  /* v22 (linki §3, P1 #4): 400 wyświetleń, pozycja 22,6. Poradnik cenowy stoi
     już w ramie ceny, brakowało wyjścia do narzędzia. Realizacji z voicebotem
     w rejestrze NIE MA, więc grupy wdrożeń tu nie ma (zero zmyślonych dowodów). */
  powiazane: {
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Policz, ile złotych rocznie zjada odbieranie tych samych telefonów i przepisywanie zgłoszeń.',
      },
    ],
  },
};
