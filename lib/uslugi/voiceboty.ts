import type { Usluga } from './types';

/**
 * USŁUGA 3 — VOICEBOTY (voicebot dla firmy).
 * Answer-first, głos Pawła, zero em-dash, zero zmyślonych liczb i cen.
 *
 * ══ PRZYCIĘCIE 2026-09-22 (raport `.seo-przeglad/raporty/2026-09-05.md`,
 * sekcje 4, 8 i 9). TA SAMA OPERACJA, co 2026-09-06 na /uslugi/chatboty
 * (commit b0dd7fc, `lib/uslugi/chatboty.ts`): strona urosła po pakiecie
 * `.seo-przeglad/pakiety/voiceboty.md` z 1656 do 4180 słów w <main>, przy
 * medianie top5 polskiej konkurencji równej około 1150 słów (rozrzut 876-1647).
 * Na chatbotach dokładnie to rozmycie tematu kosztowało frazę „chatbot ai dla
 * firm" (70 wyświetleń -> 3), więc nie czekamy, aż powtórzy się na voicebotach.
 * Cel raportu: 1300-1600 słów w <main>.
 *
 * WYNIK ZMIERZONY NA WYRENDEROWANYM BUILDZIE (npx next start, Chrome headless,
 * `main.innerText`, FAQ zwinięte): 4180 -> 2215 -> 1905 -> 1778 -> 1724 ->
 * 1682 -> 1656 -> 1594 słowa. Dla porównania /uslugi/chatboty po b0dd7fc: 1618.
 * Z tego 549 słów to siatka „Konkretne zastosowania", którą
 * `components/uslugi/PodstronyPowiazane.tsx` buduje z kapsuł DZIEWIĘCIU
 * podstron gałęzi; tego z tego pliku nie da się skrócić, więc własna treść
 * strony musi się zmieścić w około 950 słowach i mieści się.
 *
 * ZASADA (raport 9): NIE KASUJEMY TREŚCI, PRZENOSIMY JĄ NA PODSTRONY. Przed
 * każdym cięciem sprawdzono, czy sedno REALNIE stoi na stronie docelowej;
 * tam, gdzie nie stało, najpierw dopisano je tam, a dopiero potem wycięto stąd.
 * Gałąź ma dziewięć podstron (`lib/uslugi/podstrony/`: voiceboty-cennik,
 * dla-przychodni, dla-stomatologa, dla-salonu-samochodowego, dla-kancelarii,
 * rodo-ai-act, windykacja, potwierdzanie-wizyt, odbieranie-telefonow) i każda
 * z nich była przed cięciem przeczytana w całości.
 *
 * CO ZOSTAŁO NA STRONIE USŁUGI (priorytet z raportu: intencja „voicebot dla
 * firmy"): co robi voicebot i dla kogo, zdanie kontraktowe „bot nie dzwoni
 * sam", granica bot kontra człowiek, różnica wobec chatbota i tonowego IVR,
 * tabela porównawcza, trzy kroki wdrożenia, cennik RAZ (tabela trzech pozycji
 * w `ramaCeny`, reszta odsyła do /uslugi/voiceboty/cennik), FAQ na sześć pytań.
 *
 * CO WYCIĘTO I GDZIE STOI TERAZ:
 *  - sekcja 1 pakietu „Ile miesięcznie kosztuje Cię nieodebrany telefon?"
 *    (trzy liczby A, B, C, trzy kroki rachunku, uwaga o 21 dniach roboczych):
 *    /uslugi/voiceboty/odbieranie-telefonow (`odbieranie-telefonow.ts`, koniec
 *    `problem.bloki`) — tamta podstrona pyta w H2 dokładnie o to samo („Ile
 *    zapytań tracisz, bo nikt nie odebrał telefonu?"). Tu: dwa zdania
 *    i odesłanie, plus link do kalkulatora w `powiazane.narzedzia`.
 *  - sekcja 2 pakietu „Jak brzmi rozmowa z voicebotem?" (zapis rozmowy jako
 *    tabela, siedem wierszy, plus trzy wnioski): /uslugi/voiceboty/dla-przychodni
 *    (`dla-przychodni.ts`, `rozwiazanie.bloki`, nad sekcją o grafiku) — ten zapis
 *    JEST rozmową z rejestracją przychodni, więc trafił na stronę, która ten
 *    scenariusz sprzedaje. Tu: dwa zdania z odesłaniem.
 *  - przełącznik trzech sytuacji z sekcji `problem` (u klienta, wieczór
 *    i weekend, drugi raz nie zadzwoni): sedno zostaje w leadzie sekcji i jako
 *    trzypunktowa lista. Pełne rozwinięcie stoi na
 *    /uslugi/voiceboty/odbieranie-telefonow (`problem.bloki`, siatka czterech
 *    kart). Tak samo domknięto sekcję `problem` na chatbotach (b0dd7fc).
 *  - przełącznik „voiceboty-progi" z sekcji ceny (trzy pozycje rozpisane na
 *    sześciu akapitach i dziewięciu punktach): /uslugi/voiceboty/cennik
 *    (`voiceboty-cennik.ts`, siatka „Trzy pozycje rachunku i trzy różne rytmy
 *    płatności" plus pełna tabela progów i koszt pierwszego roku). Tu zostaje
 *    tabela pięciu wierszy, czyli cennik RAZ.
 *  - sekcja 4 pakietu „Voicebot czy dodatkowa osoba do odbierania telefonu?":
 *    /uslugi/voiceboty/cennik (`tabelaPorownawcza` „Dodatkowa osoba przy
 *    telefonie a voicebot" plus koszt pierwszego roku). Tu zostaje jedno
 *    zdanie o tym, że pensji nie wpisujemy za czytelnika, i jedno, że to nie
 *    jest wybór albo, albo; oba w sekcji zbiorczej „Voicebot czy dodatkowa
 *    osoba, i na co patrzeć w ofercie?".
 *  - sekcja 5 pakietu „Czy voicebot jest legalny i gdzie trafiają dane
 *    rozmówcy?": /uslugi/voiceboty/rodo-ai-act (`rodo-ai-act.ts`, dziewięć
 *    punktów konfiguracji, tabela ról, dokumenty). Tu: dwa zdania i odesłanie.
 *  - sekcje 6 i 7 pakietu (minuta rozmowy, na co uważać w ofercie), zmierzone
 *    przez kontrolę jako podobne do cennika powyżej 0,9: /uslugi/voiceboty/cennik
 *    (lista pięciu pytań o licznik minut, karta „Dlaczego nie podajemy tu
 *    własnej stawki za minutę?", lista ośmiu pytań do oferty). Tu: jedno
 *    zdanie o tym, że minuty i tokeny idą poza naszą fakturą, i jedno
 *    ostrzeżenie o liczeniu minuty, w tej samej sekcji zbiorczej co sekcja 4.
 *  - sekcja 8 pakietu „Kiedy voicebota lepiej nie kupować?": /uslugi/voiceboty/cennik
 *    (pięć sytuacji), a branżowe warianty na `dla-przychodni.ts` („Dla jakich
 *    placówek to nie ma sensu?") i `dla-salonu-samochodowego.ts` („Kiedy
 *    voicebot w serwisie się nie opłaci?"). Tu: dwie sytuacje, których nie ma
 *    nigdzie indziej (dane wrażliwe bez nagrywania, bot zamiast ludzi), jako
 *    punkty tej samej sekcji zbiorczej, plus odesłanie w jej stopce.
 *  - sekcja 9 pakietu (dwa bloki dowodów, Desant.pl i automatyzacje z liczbami):
 *    liczby stoją w swoich źródłach — Desant.pl 30 do 50 klientów i 200 do 280
 *    wiadomości w `lib/uslugi/chatboty.ts` i `podstrony/obsluga-klienta.ts`,
 *    Instytut Kryptografii 580 maili tygodniowo i około 85% draftów oraz KNF Team
 *    (12 handlowców, 3 menedżerów, około 8 h tygodniowo) w
 *    `lib/uslugi/automatyzacje.ts`. Tu zostaje JEDNO zdanie, i to takie,
 *    którego nie ma nigdzie indziej: że wdrożeń telefonicznych z nazwą
 *    klienta jeszcze nie publikujemy. Ani jedna z tych liczb nie jest
 *    dowodem GŁOSOWYM, więc na stronie o voicebotach robiła za tło, nie za
 *    dowód. Gdy będą zgody na nazwy z wdrożeń telefonicznych, wracają tutaj.
 *  - sekcja 10 pakietu „W jakiej branży to się sprawdza?" (siatka pięciu kart):
 *    cztery strony branżowe gałęzi, a linki do nich i tak zbiera siatka
 *    „Konkretne zastosowania" renderowana bezpośrednio pod sekcją ceny przez
 *    `components/uslugi/PodstronyPowiazane.tsx`. Powtarzanie tych samych czterech
 *    tytułów dwa razy pod rząd było kanibalizacją własnego ekranu. Tu: jeden
 *    akapit o tym, że zakres scenariusza wyznacza próg z tabeli.
 *  - FAQ z 16 pozycji do 6 (kontrakt `Usluga.faq` w lib/uslugi/types.ts mówi
 *    5-6, a strona miała 16). Gdzie stoją wycięte pytania:
 *      · „Czy klient pozna, że rozmawia z botem?" -> `rodo-ai-act.ts` (FAQ
 *        „W którym momencie rozmowy bot mówi, że jest systemem AI?") oraz FAQ
 *        trzech starszych podstron; fakt zostaje też w treści tej strony,
 *      · „Czy muszę płacić abonament co miesiąc?" -> `voiceboty-cennik.ts` (FAQ,
 *        pełna odpowiedź; tamten plik jest od 2026-09-22 jej jedynym miejscem),
 *      · „Za co dokładnie płacę przy voicebocie?" -> `voiceboty-cennik.ts`
 *        (siatka trzech pozycji rachunku i FAQ o zużyciu) plus tabela kosztów tutaj,
 *      · „Ile rund poprawek jest w cenie wdrożenia?" -> `voiceboty-cennik.ts`
 *        („Co jest w cenie wdrożenia, a co wyceniamy osobno?") i
 *        `odbieranie-telefonow.ts` („Dwie rundy poprawek w cenie"),
 *      · „Co, jeśli bot poda złą informację?" i „Co się dzieje, gdy padnie
 *        internet albo dostawca?" -> DOPISANE 2026-09-22 do
 *        `odbieranie-telefonow.ts` (sekcja „Granice ustawiasz Ty"), bo stamtąd
 *        brakowało bazy wiedzy zatwierdzanej przez klienta, transkrypcji
 *        i monitoringu; wersja branżowa awarii stała już w `dla-przychodni.ts`,
 *      · „A jeśli mój klient nie znosi botów?" -> `rodo-ai-act.ts` („Co, jeśli
 *        rozmówca chce rozmawiać z człowiekiem?"); argument o sygnale zajętości
 *        zostaje w sekcji `problem` tej strony,
 *      · „Czy bot zrozumie trudne nazwisko, gwarę albo obcy akcent?" -> część
 *        o obcym języku stała już w `dla-przychodni.ts` (FAQ), część
 *        o literowaniu nazwisk DOPISANA tam 2026-09-22 pod zapisem rozmowy,
 *      · „Czyj jest numer, scenariusz i nagrania po zakończeniu współpracy?"
 *        i „Co, jeśli po miesiącu stwierdzę, że to nie dla mnie?" -> DOPISANE
 *        2026-09-22 do `voiceboty-cennik.ts` (sekcja „Czyj jest numer,
 *        scenariusz i nagrania, gdy się rozstajemy?"), bo nasza odpowiedź na te
 *        pytania nie stała nigdzie w gałęzi.
 *
 * CO JESZCZE ZNIKNĘŁO W TYM PRZYCIĘCIU (bez odpowiednika na podstronie, bo
 * i bez niego nic nie ubywa):
 *  - PAS METRYK z sekcji ceny: cztery kafle powtarzały liczba w liczbę
 *    pierwsze wiersze tabeli kosztów stojącej pod nimi, a ich pole `zrodlo`
 *    samo odsyłało „do tabeli kosztów niżej".
 *  - sześć wierszy `tabelaPorownawcza` (z dziesięciu zostały cztery) i trzy
 *    wiersze tabeli IVR kontra chatbot kontra voicebot: wszystkie powtarzały
 *    treść siatki w sekcji rozwiązania albo tabeli kosztów.
 *  - sekcja „Dlaczego nasz voicebot nie wydzwania do ludzi?" jako osobna
 *    karta. Zdanie kontraktowe NIE ZNIKNĘŁO: stoi jako pierwsze zdanie sekcji
 *    „Gdzie kończy się bot, a zaczyna człowiek?" (chip ZASADA) i w FAQ.
 *  - karta „Komu odradzamy voicebota?" jako osobny blok: dwie sytuacje
 *    weszły jako punkty sekcji „Voicebot czy dodatkowa osoba, i na co patrzeć
 *    w ofercie?", a odesłanie po resztę stoi w jej stopce. Powód: cztery
 *    osobne karty pod jednym H2 o cenie to cztery nagłówki H3 na jeden temat.
 *  - karta „Przetestuj naszego bota teraz, na tej stronie" z opisem konsoli:
 *    konsola „Zapytaj AI" stoi na KAŻDEJ podstronie serwisu (montuje ją
 *    `app/layout.tsx`), więc opis jej zakładek nie musi zajmować karty na
 *    stronie ciętej do 1300-1600 słów.
 *
 * UWAGA DLA KOLEJNEJ SESJI (nie zmieniane tutaj, bo to decyzja właściciela,
 * nie zakres przycięcia): po wycięciu karty „Wolisz usłyszeć rozmowę na
 * swoich pytaniach" nazwa „Sprint Diagnostyczny" nie pada już na tej stronie
 * ani razu, a `kroki[0]` i `cta.mikrokopia` dalej obiecują na BEZPŁATNEJ
 * diagnozie policzenie utraconych połączeń. Ustalenie właściciela z 2026-08-31
 * mówi, że bezpłatna rozmowa to wyłącznie badanie potrzeb. Ten sam tekst stoi
 * dziś na dziewięciu podstronach gałęzi, więc poprawka jest do zrobienia
 * wszędzie naraz albo wcale.
 *
 * KONTRAKT TYPU, oba pola sprawdzone i poprawione: `kapsula` ma 49 słów
 * (wymagane 40-60; przed cięciem 91), `faq` ma 6 pozycji (wymagane 5-6; przed
 * cięciem 16). Liczba pytań FAQ steruje też czwartym kaflem w hero
 * (`ServiceHero.kafleStatystyk`), więc kafel pokazuje teraz 6.
 *
 * CZEGO NIE WOLNO RUSZAĆ PRZY KOLEJNYM CIĘCIU:
 *  - końcówka `h1` „który odbiera telefon za Ciebie" = wpis `voiceboty`
 *    w mapie H1_KOLOR (`components/uslugi/ServiceHero.tsx`); musi być dokładną
 *    końcówką h1, inaczej kolorowy człon nagłówka znika,
 *  - słowa „pakiet startowy" w `ramaCeny.tresc` = etykieta kafla ceny
 *    (KAFEL_CENY.voiceboty),
 *  - wiersz tabeli porównawczej z „24/7" w kolumnie `zNami` = bramka kafla
 *    dostępności w hero (dziś wiersz „Godziny"),
 *  - `ramaCeny.minPrice` = 2500 zasila kafel ceny, kolumnę „Cena" na /uslugi
 *    i `offers.minPrice` w Service JSON-LD.
 *
 * CENNIK OBOWIĄZUJĄCY (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` §2
 * plus decyzje Pawła z 2026-08-19). TRZY OSOBNE POZYCJE, nie jeden abonament.
 * To nasza największa przewaga komunikacyjna: konkurencja miesza wszystko
 * w jeden ryczałt 499-1700 zł/mies., przez co klient nie wie, za co płaci.
 * Każda kwota NETTO:
 *  1. STWORZENIE (jednorazowo): prosty 2500 zł, z integracjami 5000-9000 zł,
 *  2. UTRZYMANIE: 299-1500 zł/mies. gdy infrastruktura zostaje u nas, ALBO
 *     0 zł/mies. gdy przekazujemy infrastrukturę klientowi (poprawki wtedy
 *     350 zł netto za godzinę),
 *  3. ZUŻYCIE: tokeny i minuty rozmów wg realnego użycia, po stronie klienta.
 * Widełki 99-599 zł/mies. NIE dotyczą już voicebotów (zostają przy chatbotach,
 * które są prostsze w utrzymaniu).
 *
 * ZASADA CZASU i RUNDY POPRAWEK (audyt §1): czas liczymy OD PRZEKAZANIA
 * KOMPLETU MATERIAŁÓW przez klienta, nie od podpisania umowy; dwie rundy
 * poprawek są w cenie wdrożenia. CZAS WDROŻENIA (podał Paweł 2026-08-20):
 * prosty 3-5 dni roboczych, z integracjami 5-25 dni roboczych.
 *
 * INPUT PAWŁA (nie renderowane, do uzupełnienia przed shipem):
 *  - cta.dowod: gdy będzie realna liczba operacyjna (np. połączeń odebranych przez
 *    voicebota klienta w miesiącu) albo case z imieniem i firmą za zgodą, podmienić
 *    uczciwe zdanie o diagnozie na ten dowód. Do tego czasu bez atrapy liczby.
 */
export const voiceboty: Usluga = {
  slug: 'voiceboty',
  dataAktualizacji: '2026-09-22',
  h1: 'Voicebot dla firmy, który odbiera telefon za Ciebie',

  /* KAPSUŁA, 49 słów (kontrakt `Usluga.kapsula`: 40-60). Wersja sprzed
     2026-09-22 miała 91 słów, bo rozpisywała cały cennik zdanie po zdaniu.
     Trzy pozycje kosztu i oba modele utrzymania zostają, ale bez powtarzania
     tabeli: kapsuła jest blokiem, który modele cytują jako całą odpowiedź,
     więc ma być gęsta, nie długa. Progi 5000-9000 zł netto i rozbicie czasu
     na dwa warianty stoją w tabeli kosztów w sekcji ceny. */
  kapsula:
    'Voicebot dla firmy odbiera telefon 24/7, rozmawia po polsku i sam załatwia sprawę. Ma trzy osobne koszty, a nie jeden abonament: stworzenie od 2500 zł netto płatne raz, utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł po przekazaniu infrastruktury, oraz zużycie minut i tokenów po Twojej stronie.',

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
      'Telefon dzwoni, kiedy masz ręce zajęte, i połowy połączeń nie odbierasz. To pieniądze, które uciekają do konkurencji, która odebrała.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Kiedy telefon dzwoni, a Ty nie możesz odebrać?',
        ikona: 'lupa-wykres',
        chip: 'TRZY SYTUACJE',
        overline: 'MAŁA FIRMA · TELEFON DZWONI W NAJGORSZYM MOMENCIE',
      },
      {
        typ: 'lista',
        punkty: [
          'Jesteś u klienta i nie przerwiesz spotkania. Oddzwaniasz po godzinach, gdy sprawa jest już u kogoś innego.',
          'Wieczór i weekend. Telefon odbierany ręcznie działa tylko wtedy, gdy ktoś przy nim siedzi.',
          'Klient, który nie dodzwonił się raz, często nie dzwoni drugi.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Nagrywarka nic nie załatwia, a etat przy telefonie kosztuje',
        akapity: [
          'Klient zostawia wiadomość albo się rozłącza, a sprawa i tak czeka na Ciebie. Zostaje wybór: etat przy telefonie albo Twój własny czas.',
        ],
        wariant: 'quiet',
        stopka: ['Rachunek tej straty rozpisaliśmy na stronie o bocie telefonicznym.'],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co robi bot telefoniczny, gdy nie możesz odebrać?',
    tresc:
      'Voicebot odbiera każde połączenie, rozmawia po polsku i sam załatwia sprawę do końca. Działa 24/7, także wieczorem i w weekend.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co dokładnie voicebot załatwia sam, bez Ciebie?',
        ikona: 'sluchawka-fala',
        chip: '24/7',
        overline: 'AI ODBIERA TELEFON · WYŁĄCZNIE POŁĄCZENIA PRZYCHODZĄCE',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Umawia wizytę w Twoim kalendarzu',
            akapity: ['Widzi wolne terminy i zapisuje wizytę jeszcze w trakcie rozmowy.'],
          },
          {
            naglowek: 'Zostawia notatkę z rozmowy',
            akapity: ['Spisuje, kto dzwonił i w jakiej sprawie, i wysyła Ci podsumowanie.'],
          },
          {
            naglowek: 'Odbiera wieczorem i w weekend',
            akapity: ['Nie ma godzin pracy. To nie nagranie ani menu „wciśnij jeden”.'],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Gdzie kończy się bot, a zaczyna człowiek?',
        akapity: [
          'Voicebot tylko odbiera: obsługuje wyłącznie połączenia przychodzące i nie wydzwania do ludzi, bo to psuje zaufanie do firmy. Sprawę, która go przerasta, spisuje i oddaje Tobie. Granice ustawiasz Ty, a klient słyszy na początku, że rozmawia z asystentem AI.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: ['Zapis przykładowej rozmowy stoi na stronie o voicebocie dla przychodni.'],
      },
      {
        typ: 'naglowek',
        tekst: 'Czym voicebot różni się od chatbota i tonowego IVR?',
        ikona: 'chat-dymek',
        chip: 'TRZY NARZĘDZIA',
        overline: 'JEDEN WOREK · TRZY RÓŻNE RZECZY W ŚRODKU',
      },
      {
        typ: 'akapit',
        tekst: 'Tonowy IVR rozumie cyfry, nie zdania. Chatbot rozumie zdania, ale tylko pisane. Voicebot rozumie mowę i sam mówi.',
      },
      {
        typ: 'tabela',
        naglowki: ['Co porównujemy', 'Tonowy IVR', 'Chatbot', 'Voicebot'],
        wiersze: [
          ['Jak rozmówca pyta', 'Wciska klawisze', 'Pisze tekst', 'Mówi zdaniem'],
          ['Pytanie spoza scenariusza', 'Nie rozumie', 'Rozumie z bazą wiedzy', 'Rozumie z bazą wiedzy'],
          ['Przy trudnej sprawie', 'Kolejka do konsultanta', 'Formularz i cisza', 'Notatka dla człowieka'],
        ],
        wKarcie: true,
        podpis: 'Co rozmówca musi zrobić, żeby dostać odpowiedź.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy voicebot jest legalny i gdzie trafiają dane rozmówcy?',
        akapity: [
          'Tak, tylko nie jest to odpowiedź na jedno zdanie. Administratorem danych zostajesz Ty, my przetwarzamy je na Twoje polecenie, a zgodność u siebie ocenia Twój prawnik.',
        ],
        wariant: 'quiet',
        chip: 'RODO I AI ACT',
        stopka: [
          'Pełną konfigurację, od zapowiedzi po czas przechowywania nagrań, trzyma strona o voicebocie a RODO i AI Act.',
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    /* H2 z synonimem „agent głosowy" (decyzja Pawła 2026-08-16; „bot telefoniczny"
       siedzi w rozwiazanie.h2, „wirtualna recepcjonistka" celowo NIE występuje).
       WIERSZ „Godziny" MUSI mieć „24/7" w kolumnie `zNami`: to bramka kafla
       dostępności w hero (ServiceHero.kafleStatystyk bierze pierwszy pasujący
       wiersz, a etykietą kafla jest jego `cecha`).
       2026-09-22: z dziesięciu wierszy zostały cztery. Wycięte („Koszt",
       „Po rozmowie", „Czas wdrożenia", „Umawianie wizyt", „Oddzwanianie",
       „Rozliczenie") nie wnosiły nic ponad to, co niosą siatka w sekcji
       rozwiązania, kapsuła i tabela kosztów w sekcji ceny. */
    h2: 'Agent głosowy a odbieranie telefonu ręcznie',
    naglowekBez: 'Telefon odbierany ręcznie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      { cecha: 'Nieodebrane połączenia', bez: 'Połowa, gdy jesteś zajęty', zNami: 'Odbiera, gdy Ty nie możesz' },
      { cecha: 'Godziny', bez: 'Tylko gdy ktoś jest przy telefonie', zNami: '24/7, też wieczorem i w weekend' },
      { cecha: 'Stworzenie bota', bez: 'Rekrutacja i wdrożenie osoby', zNami: 'Od 2500 zł netto, płatne raz' },
      { cecha: 'Koszt miesięczny', bez: 'Pensja co miesiąc', zNami: '299 do 1500 zł netto albo 0 zł' },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy voicebota krok po kroku?',
    items: [
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis: 'Sprawdzamy, ile połączeń tracisz i co bot ma załatwiać. Mówimy wprost, czy to się opłaca.',
      },
      {
        tytul: 'Nagranie i wdrożenie',
        opis: 'Ustawiamy scenariusze, ton i granice, podłączamy numer i kalendarz. Testujemy na żywo.',
      },
      {
        tytul: 'Opieka i rozwój',
        opis: 'Słuchamy rozmów, poprawiamy odpowiedzi, dokładamy scenariusze. Ty widzisz, co bot załatwił.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot dla firmy?',
    /* SŁOWA „pakiet startowy" SĄ KONTRAKTEM: to etykieta kafla ceny w hero
       (ServiceHero.KAFEL_CENY, wpis `voiceboty`). Nie przepisywać. */
    tresc:
      'Voicebot ma trzy osobne pozycje kosztu, a nie jeden abonament: stworzenie od 2500 zł netto za pakiet startowy, utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł, oraz zużycie według realnego użycia.',
    bloki: [
      /* 2026-09-22: PAS METRYK WYCIĘTY. Cztery kafle powtarzały liczba w liczbę
         pierwsze trzy wiersze tabeli kosztów stojącej bezpośrednio pod nimi
         (2500 zł netto, 5000-9000 zł netto, 299-1500 zł netto albo 0 zł, czas
         wdrożenia), a pole `zrodlo` każdego kafla samo odsyłało „do tabeli
         kosztów niżej". Na stronie ciętej do 1300-1600 słów ta sama kwota dwa
         razy w jednym ekranie to szum, nie dowód. Cennik stoi RAZ, w tabeli. */
      {
        typ: 'tabela',
        naglowki: ['Pozycja', 'Ile płacisz', 'Kiedy'],
        wiersze: [
          ['Stworzenie: bot prosty', '2500 zł netto', '3 do 5 dni, raz'],
          ['Stworzenie: bot z integracjami', '5000 do 9000 zł netto', '5 do 25 dni, raz'],
          ['Utrzymanie: infrastruktura u nas', '299 do 1500 zł netto', 'co miesiąc'],
          [
            'Utrzymanie: infrastruktura u Ciebie',
            '0 zł, poprawki 350 zł netto za godzinę',
            'gdy zamawiasz poprawki',
          ],
          ['Zużycie: tokeny i minuty rozmów', 'według realnego użycia', 'po Twojej stronie'],
        ],
        wKarcie: true,
        /* PODPIS NIESIE ZASADĘ CZASU (audyt §1): dni robocze z kolumny „Kiedy"
           liczymy OD PRZEKAZANIA KOMPLETU MATERIAŁÓW, nie od podpisania umowy.
           To zobowiązanie musi stać przy liczbie dni, a nie osobnym akapitem,
           bo osobny akapit wypadł przy przycięciu; pełna wersja razem z dwiema
           rundami poprawek stoi na /uslugi/voiceboty/cennik. */
        podpis:
          'Każda kwota netto, dni robocze liczone od przekazania kompletu materiałów.',
      },
      /* TRZY SEKCJE PAKIETU ZWINIĘTE W JEDNĄ (2026-09-22): „Voicebot czy
         dodatkowa osoba" (sekcja 4), „Co to znaczy minuta rozmowy" (sekcja 6)
         i „Na co uważać w ofercie" (sekcja 7). Kontrola zmierzyła każdą z nich
         jako podobną powyżej 0,9 do /uslugi/voiceboty/cennik, a tamta strona
         niesie komplet: tabelę „Dodatkowa osoba przy telefonie a voicebot",
         pięć pytań o licznik minut, osiem pytań do oferty i koszt pierwszego
         roku. Rodzic stawia sprawę i odsyła w dół, tak jak chatboty po b0dd7fc. */
      {
        typ: 'sekcja',
        naglowek: 'Voicebot czy dodatkowa osoba, i na co patrzeć w ofercie?',
        akapity: [
          'Pensji ani narzutu składek nie wpiszemy tu za Ciebie, bo Twoja księgowa zna tę liczbę, a my nie. To zresztą nie jest wybór albo, albo: bot bierze początek rozmowy, a recepcja dostaje czas dla klienta, który stoi przed nią.',
          'Minuty i tokeny kupujesz u dostawców na swoim koncie, poza naszą fakturą, więc nie ma tam miejsca na marżę.',
        ],
        punkty: [
          'Wolimy sprzedać coś tańszego, co zadziała, niż coś droższego, co potem wyłączysz.',
          'Odradzamy, gdy pracujesz na danych wrażliwych i nagrywać nie wolno.',
          'Odradzamy też, gdy botem chcesz zasłonić brak ludzi. Voicebot odbiera telefon i na tym koniec.',
        ],
        wariant: 'edge',
        chip: 'DECYZJA',
        stopka: [
          'Zestawienie z dodatkową osobą, koszt pierwszego roku, pytania o licznik minut i pozostałe sytuacje, w których odradzamy wdrożenie: strona z cennikiem voicebotów.',
        ],
      },
      {
        typ: 'akapit',
        tekst:
          'Uczciwie: wdrożeń telefonicznych z nazwą klienta jeszcze nie publikujemy. Scenariusz piszemy pod branżę i to jego zakres decyduje o progu.',
      },
    ],
    minPrice: 2500, // pakiet startowy (locked 2026-08-16, audyt §2): UI + offers w JSON-LD.
    /* SEO 2026-08-17: linkowanie wewnętrzne do poradnika cenowego (zdanie 1:1
       z brief-seo-2026-08-17; render w RamaCeny.tsx w tym samym akapicie). */
    linkPoradnik: {
      przed: 'Koszty wdrożeń AI rozpisaliśmy w ',
      etykieta: 'poradniku o cenie agenta AI',
      po: '.',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    },
  },

  /* SZEŚĆ PYTAŃ (kontrakt `Usluga.faq`: 5-6). Przed 2026-09-22 stało ich 16,
     czyli strona zgłaszała do FAQPage JSON-LD trzy razy więcej, niż przewiduje
     szablon. Gdzie trafiło pozostałe dziesięć, wypisuje komentarz nagłówkowy
     tego pliku („CO WYCIĘTO I GDZIE STOI TERAZ", punkt o FAQ). Kolejność:
     definicja, zasada kontraktowa, granica bot kontra człowiek, kalendarz,
     cena, dane. Tekst idzie 1:1 na stronę i do FAQPage JSON-LD, więc każda
     edycja tutaj rozjeżdża oba naraz. */
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
      pytanie: 'Co, jeśli sprawa jest zbyt trudna dla bota?',
      odpowiedz:
        'Wtedy voicebot nie udaje, że wie. Bierze kontakt, zapisuje, czego dotyczy sprawa, i mówi klientowi, że oddzwonisz. Ty dostajesz podsumowanie i oddzwaniasz przygotowany. Ustawiasz z góry, które sprawy bot ma przekazywać dalej, a na wyraźne żądanie rozmówcy bot przełącza do człowieka.',
    },
    {
      pytanie: 'Czy voicebot umówi wizytę w moim kalendarzu?',
      odpowiedz:
        'Tak. Łączymy go z Twoim kalendarzem, więc bot widzi wolne terminy, proponuje je klientowi i zapisuje wizytę jeszcze w trakcie rozmowy. Klientowi wysyła potwierdzenie, bez Twojego udziału. Ty masz aktualny kalendarz bez ręcznego wpisywania.',
    },
    {
      pytanie: 'Ile kosztuje voicebot?',
      odpowiedz:
        'Voicebot ma trzy osobne koszty. Stworzenie bota: 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto za wersję z integracjami, płatne raz. Utrzymanie: 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie. Zużycie: tokeny i minuty rozmów według realnego użycia, po Twojej stronie. Całe rozliczenie, razem z kosztem pierwszego roku, rozpisaliśmy na stronie z cennikiem voicebotów.',
    },
    {
      pytanie: 'Czy moje rozmowy i dane będą bezpieczne?',
      odpowiedz:
        'Tak. Dane z rozmów zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act. Podpisujemy umowę powierzenia danych, a Ty decydujesz, co bot nagrywa i przechowuje. Numer, scenariusz rozmowy, nagrania i transkrypcje zostają Twoje także wtedy, gdy kończymy współpracę.',
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
     w rejestrze NIE MA, więc grupy wdrożeń tu nie ma (zero zmyślonych dowodów).

     LINKÓW DO DZIEWIĘCIU PODSTRON GAŁĘZI TU NIE MA I BYĆ NIE MA POTRZEBY:
     `components/uslugi/PodstronyPowiazane.tsx` buduje sekcję „Konkretne
     zastosowania" z `getPodstronyRodzica('voiceboty')`, czyli listuje wszystkie
     podstrony z rejestru `lib/uslugi/podstrony/index.ts`, bez limitu i bez
     ręcznej listy. Dopisanie tych samych adresów do `powiazane.uslugi` dałoby
     na jednym ekranie dwie prawie identyczne siatki linków, jedną nad drugą. */
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
