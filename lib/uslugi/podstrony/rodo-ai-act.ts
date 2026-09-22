import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 4 — VOICEBOT A RODO I AI ACT
 * (`/uslugi/voiceboty/rodo-ai-act`).
 * Fraza primary: „voicebot RODO AI Act" (pakiet `.seo-przeglad/pakiety/voiceboty.md`
 * §PODSTRONA 6, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/voiceboty` i trzech istniejących sióstr):
 *  - RODZIC sprzedaje całą usługę: co bot załatwia sam, jak wygląda wdrożenie
 *    i z czego składa się rachunek. Bezpieczeństwo ma tam JEDNO zdanie w FAQ.
 *  - TA STRONA nie sprzedaje wdrożenia. Domyka zaufanie i kończy się jedną
 *    decyzją: umawiam bezpłatną rozmowę. Jest tu więc: dwa warunki legalności,
 *    brzmienie zapowiedzi na starcie rozmowy, nagrywanie i zgoda, zakres
 *    zapisu, miejsce danych w dwóch wariantach infrastruktury, umowa
 *    powierzenia, retencja i dokumenty zostające po stronie klienta.
 *  - NIE MA TU I BYĆ NIE MOŻE: opisu odbierania połączeń (siostra
 *    `odbieranie-telefonow`), umawiania terminów (`potwierdzanie-wizyt`),
 *    rozmów o płatnościach (`windykacja`) ani kwot cennika (rodzic).
 *    Do wszystkich czterech prowadzą linki w sekcji „Powiązane".
 *
 * TWARDA REGUŁA REDAKCYJNA TEJ PODSTRONY (pakiet §PODSTRONA 6):
 *  NIE WOLNO postawić tu ani jednej daty wejścia przepisu, numeru artykułu
 *  aktu o AI ani kwoty kary. Pakiet został z nich wyczyszczony, bo nikt u nas
 *  nie sprawdził ich u źródła w EUR-Lex i nie zapisał daty sprawdzenia.
 *  Strona prawna z niesprawdzoną datą jest gorsza niż brak strony prawnej.
 *  Dlatego każdy obowiązek jest tu opisany PRZEZ TO, CO REALNIE ROBIMY
 *  W NASZYCH WDROŻENIACH, a nie przez powołanie na przepis. Kolejny agent,
 *  który zechce „uzupełnić" tę stronę o datę, artykuł albo widełki kary,
 *  łamie ustalenie właściciela.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła: pakiet §PODSTRONA 6 („KAPSUŁA (gotowa)"), przeniesiona
 *    DOSŁOWNIE, co do znaku. To zdanie ma być cytowane przez modele w formie,
 *    w jakiej zostało zatwierdzone,
 *  - dziewięć punktów konfiguracji (zapowiedź w pierwszym zdaniu, nagrywanie
 *    jako osobna decyzja, administrator kontra podmiot przetwarzający, dane
 *    w Unii Europejskiej, konta dostawców po stronie klienta przy przekazanej
 *    infrastrukturze, czas przechowywania ustawiany przez klienta, ustalanie
 *    powodu rozmowy, prawo do człowieka, rejestr czynności i klauzula
 *    informacyjna jako dokumenty klienta): pakiet §5 „Czy voicebot jest
 *    legalny i gdzie trafiają dane rozmówcy?" (blok zatwierdzony),
 *  - dostawca modelu językowego (Anthropic): pakiet §5 punkt 9 i §PODSTRONA 6,
 *    sprawdzone w kodzie 2026-08-31,
 *  - dane w UE, umowa powierzenia, decyzja klienta o zakresie nagrywania:
 *    zatwierdzone FAQ rodzica `lib/uslugi/voiceboty.ts` („Czy moje rozmowy
 *    i dane będą bezpieczne?", „Czy klient pozna, że rozmawia z botem?"),
 *  - dwa warianty infrastruktury (u nas albo przekazana klientowi) i trzy
 *    pozycje rachunku (stworzenie, utrzymanie, zużycie): `lib/uslugi/voiceboty.ts`
 *    (`ramaCeny`, FAQ „Czy muszę płacić abonament co miesiąc?"). Nazwy pozycji
 *    BEZ KWOT, bo kwoty trzymamy w jednym miejscu (uwaga wdrożeniowa §6),
 *  - bot nie dzwoni sam: kontrakt powtórzony w ośmiu miejscach kodu
 *    (`lib/uslugi/voiceboty.ts` FAQ #2 plus trzy podstrony). Na tej stronie
 *    pada RAZ i wyłącznie w zaprzeczeniu, przy pytaniu o kontakt zwrotny.
 *
 * LICZBY W TYM REJESTRZE: ZERO. Pakiet podaje wprost „Źródło liczb: zero
 * liczb", więc nie ma tu ceny, terminu, procentu ani daty. Jedyny wyjątek to
 * cytat cudzego tytułu: rok w TYTULE cytowanego wpisu bloga (etykieta = realny
 * tytuł strony docelowej, konwencja pola `powiazane`). Każde zdanie napisane tak,
 * żeby było prawdziwe bez liczby. Kwoty voicebota stoją u rodzica i tam
 * kieruje `linkPoradnik`.
 *
 * UWAGA (kontrola 2026-09-22): „zero liczb" dotyczy TEGO PLIKU, nie
 * wyrenderowanej strony. `components/uslugi/ServiceHero.tsx` (funkcja
 * `kafleStatystyk`) dokłada kafle z danych rejestru, więc w hero i tak staną:
 *  - „0 zł / bezpłatna diagnoza" — bramka to brak `ramaCeny.minPrice` PLUS
 *    słowo „bezpłatn" w `ramaCeny.tresc` albo w `cta.mikrokopia`. Oba warunki
 *    są tu spełnione, więc kafla nie da się wyłączyć bez skłamania w treści,
 *  - „3 / kroki wdrożenia" i „6 / najczęstszych pytań" — liczone z `kroki`
 *    i `faq` tej strony (FAQ ścięte 2026-09-22 z dziewięciu pozycji do sześciu,
 *    zgodnie z kontraktem `Usluga.faq`, więc kafel pokazuje teraz 6, nie 9).
 * Kafla ceny nie ma (brak `minPrice`), kafla „24/7" też nie (żaden wiersz
 * `tabelaPorownawcza.zNami` nie niesie tego ciągu). Etykieta kafla mówi
 * „bezpłatna diagnoza", a cała ta strona mówi „bezpłatna rozmowa": tego NIE
 * DA SIĘ naprawić w tym pliku (string siedzi w komponencie), więc rozjazd
 * idzie do właściciela jako punkt otwarty.
 *
 * ZAKAZANE NA TEJ STRONIE: data wejścia przepisu, numer artykułu, kwota kary,
 * słowo „gwarantujemy" przy zgodności, obietnica oceny prawnej, synonim
 * voicebota zakazany w całym serwisie (patrz zakaz w pakiecie), jakakolwiek
 * obietnica połączenia wychodzącego, obietnica pomiaru albo raportu na
 * bezpłatnej rozmowie (bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb,
 * ustalenie właściciela z 2026-08-31).
 *
 * KOLOR I FORMA: podstrona dziedziczy ton kategorii „voiceboty" po rodzicu
 * (uwaga wdrożeniowa §5: żadnego nowego koloru dla gałęzi) i renderuje się
 * TYMI SAMYMI komponentami co reszta usług. Zero nowych typów bloków,
 * zero nowego CSS.
 */
export const rodoAiAct: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'rodo-ai-act',
  dataAktualizacji: '2026-09-22',

  /* H1 1:1 z pakietu §PODSTRONA 6. */
  h1: 'Voicebot a RODO i AI Act: co musi być spełnione',

  /* KAPSUŁA. Treść z pakietu §PODSTRONA 6 („KAPSUŁA (gotowa)"), ŚCIŚNIĘTA 2026-09-22
     z 86 słów do przedziału z kontraktu `Usluga.kapsula` (lib/uslugi/types.ts: 40-60
     słów). Kapsuła jest blokiem, który modele cytują jako całą odpowiedź.
     KOMPLET ODPOWIEDZI TEJ STRONY ZOSTAJE: dwa warunki legalności, zapowiedź
     w pierwszym zdaniu, podział ról administrator - podmiot przetwarzający, umowa
     powierzenia, miejsce danych w obu wariantach, decyzja o zakresie i czasie,
     dostawca modelu i zastrzeżenie, że to nie jest porada prawna. Wypadło „nigdy nie
     udają człowieka": ten sam fakt stoi w sekcji „Jak brzmi pierwsze zdanie..."
     („Naturalne brzmienie nie jest przebraniem") i w FAQ o momencie zapowiedzi. */
  kapsula:
    'Voicebot jest legalny, jeśli rozmówca wie, że to system AI, i wiadomo, kto odpowiada za nagranie. Nasze boty mówią to w pierwszym zdaniu. Administratorem jesteś Ty, my podmiotem przetwarzającym na umowie powierzenia. Dane zostają w Unii Europejskiej, przy Twojej infrastrukturze na Twoich kontach. Zakres nagrywania i czas przechowywania ustawiasz Ty. Model językowy pochodzi od Anthropic. To nie jest porada prawna.',

  /* metaTitle: pakiet dawał 24 znaki, konwencja repo (lib/uslugi/types.ts)
     i decyzja właściciela mówią 50-60. Fraza główna „Voicebot a RODO i AI Act"
     zostaje NA POCZĄTKU, wyróżnik to fakt obecny na tej stronie (miejsce
     danych, stoi w kapsule, w przełączniku i w FAQ). Długość 50 znaków.
     Layout dokleja sufiks marki, więc w SERP wychodzi
     „Voicebot a RODO i AI Act: dane w Unii Europejskiej · SimpleFast.ai". */
  metaTitle: 'Voicebot a RODO i AI Act: dane w Unii Europejskiej',
  metaDescription:
    'Voicebot a RODO i AI Act: bot mówi w pierwszym zdaniu, że jest systemem AI. Administratorem danych jesteś Ty, my podmiotem przetwarzającym. Dane zostają w UE.',

  problem: {
    h2: 'Skąd masz wiedzieć, czy voicebot u Ciebie jest ustawiony poprawnie?',
    tresc:
      'Cała odpowiedź stoi na dwóch rzeczach: rozmówca ma wiedzieć, że mówi z systemem AI, a Ty masz wiedzieć, kto odpowiada za nagranie tej rozmowy. Reszta to ustawienia, które podejmujesz przy wdrożeniu.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Pytanie o legalność wraca najczęściej w medycynie, w prawie i w finansach, bo tam przez telefon idą dane, których nie wolno zgubić. Ale zadaje je dziś każdy, kto pierwszy raz stawia bota na firmowym numerze.',
      },
      {
        typ: 'naglowek',
        tekst: 'Na czym stoi odpowiedź o legalności voicebota?',
        ikona: 'tarcza-serce',
        chip: 'DWA WARUNKI',
        overline: 'ZAPOWIEDŹ NA STARCIE · ODPOWIEDZIALNOŚĆ ZA NAGRANIE',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            /* KONTROLA 2026-09-22: akapit powtarzał zdanie w zdanie odpowiedź FAQ
               o momencie zapowiedzi (0,80 i 0,81 podobieństwa) i listę punktów
               z sekcji „Jak brzmi pierwsze zdanie...". Karta ma teraz mówić, CZYM
               jest ten warunek, a mechanikę zapowiedzi niesie sekcja niżej i FAQ. */
            naglowek: 'Rozmówca wie, że mówi z systemem AI',
            akapity: [
              'To pierwszy z dwóch warunków i jedyny, który słychać w rozmowie. Dzwoniący ma wiedzieć, z czym rozmawia, zanim opowie swoją sprawę.',
            ],
            punkty: ['Zapowiedź jest częścią scenariusza, a nie dobrą wolą bota.'],
          },
          {
            naglowek: 'Wiadomo, kto odpowiada za nagranie',
            akapity: [
              'Za dane z rozmowy odpowiada firma, która ten telefon odbiera, czyli Ty. My jesteśmy po stronie narzędzia i pracujemy na Twoje polecenie.',
            ],
            punkty: ['Ten podział jest spisany, a nie domyślny. Rozpisuje go tabela niżej.'],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Jak brzmi pierwsze zdanie, którym bot się przedstawia?',
        akapity: [
          'Treść zapowiedzi zatwierdzasz Ty, bo to Twoja firma mówi tym głosem. My pilnujemy jednego: ma paść na starcie i ma być zrozumiała dla kogoś, kto dzwoni pierwszy raz.',
          'Naturalne brzmienie nie jest przebraniem. Bot nie przedstawia się jako pracownik i nie odpowiada wymijająco, gdy rozmówca dopytuje, czy po drugiej stronie jest człowiek.',
        ],
        /* KONTROLA 2026-09-22: trzy punkty tej sekcji („zapowiedź w pierwszym zdaniu",
           „bez ludzkiego imienia", „na pytanie wprost odpowiada wprost") stały słowo
           w słowo w odpowiedzi FAQ o momencie zapowiedzi. Ta sama trójka trzeci raz
           w karcie wyżej. Punkty zdjęte, komplet faktów zostaje w FAQ (idzie do FAQPage)
           i w akapitach tej sekcji. */
        wariant: 'top',
        chip: 'ZAPOWIEDŹ',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co, jeśli rozmówca chce rozmawiać z człowiekiem?',
        akapity: [
          'Prośba o człowieka działa zawsze i nie jest wyjątkiem, który trzeba wywalczyć. W godzinach pracy bot przełącza od razu, bez pętli pytań kontrolnych.',
          'Poza godzinami spisuje sprawę i kontakt, a Twój zespół oddzwania rano jako pierwszy. Kontakt zwrotny zaczyna człowiek, bo bot nie dzwoni sam do nikogo.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co ustawiamy w nagrywaniu, zakresie zapisu i miejscu danych?',
    tresc:
      'Trzy decyzje podejmujesz Ty, a my je wykonujemy: czy rozmowa jest nagrywana, co z niej zostaje zapisane i jak długo to leży. Czwarta rzecz, czyli miejsce danych, zależy od tego, u kogo stoi infrastruktura.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Nagrywanie ustawiasz Ty, my je tylko wykonujemy',
        ikona: 'dokument-skan',
        chip: 'ZGODA',
        overline: 'NAGRANIE · ZAKRES ZAPISU · CZAS PRZECHOWYWANIA',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            /* KONTROLA 2026-09-22: oba zdania tego akapitu stały ZNAK W ZNAK
               w odpowiedzi FAQ o nagrywaniu. FAQ zostaje bez zmian (idzie do
               FAQPage JSON-LD), karta mówi to samo od strony ustawienia domyślnego. */
            naglowek: 'Nagranie dźwięku',
            akapity: [
              'Domyślnie zapisu dźwięku nie ma. Uruchamiamy go dopiero na Twoją decyzję i tak samo wyłączamy, gdy zmienisz zdanie.',
            ],
            punkty: ['Bez nagrania z rozmowy zostaje sama notatka z ustaleń.'],
          },
          {
            naglowek: 'Zakres zapisu',
            akapity: [
              'Bot ustala powód rozmowy, żeby skierować ją do właściwej osoby i zapisać właściwy termin. Co dokładnie z tego zostaje w notatce, ustalasz przy wdrożeniu.',
            ],
            punkty: ['Czego nie ma w scenariuszu, o to bot nie dopytuje.'],
          },
          {
            naglowek: 'Czas przechowywania',
            akapity: [
              'Jak długo nagranie i notatka mają leżeć, decydujesz Ty. My ustawiamy ten czas w konfiguracji i go pilnujemy.',
            ],
            punkty: ['Zmiana czasu to zmiana ustawienia, nie nowe wdrożenie.'],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dane wrażliwe: czego bot nie dotyka',
        akapity: [
          'Najprostszy sposób na dane, których nie chcesz mieć w systemie, to nie pytać o nie w rozmowie. Bot pyta o to, co mu wpiszesz, i nic ponad to.',
          'Gdy sprawa wchodzi na temat, którego bot ma nie dotykać, przekazuje ją człowiekowi i kończy własny wątek. Granicę wyznacza scenariusz, a scenariusz zatwierdzasz Ty.',
        ],
        /* KONTROLA 2026-09-22: pierwszy punkt brzmiał „Bot nie dopytuje o szczegóły,
           których nie ma w scenariuszu", czyli to samo zdanie odwrócone, co punkt karty
           „Zakres zapisu" wyżej (podobieństwo 0,80). Zdjęty, krótsza wersja zostaje
           w karcie. */
        punkty: [
          'Tematy wyłączone ze scenariusza bot oddaje człowiekowi, zanim zdąży o nie dopytać.',
          'W branży regulowanej zakres zapisu ustalamy najpierw, a scenariusz dopiero po nim.',
        ],
        wariant: 'top',
        chip: 'ZAKRES',
      },
      {
        /* KONTROLA 2026-09-22: nagłówek brzmiał „Gdzie leżą nagrania i transkrypcje
           z rozmów?", czyli zadawał dokładnie to samo pytanie co pozycja FAQ „Gdzie
           trafiają nagrania i transkrypcje?". Ta sama sprawa dwa razy na jednej stronie,
           a tylko FAQ idzie do FAQPage JSON-LD. Pytanie zostaje w FAQ, nagłówek pyta
           o to, co ten przełącznik naprawdę rozstrzyga: czyje są konta u dostawców. */
        typ: 'naglowek',
        tekst: 'Na czyich kontach u dostawców stoi Twój bot?',
        ikona: 'glob-siatka',
        chip: 'UNIA EUROPEJSKA',
        overline: 'DWA WARIANTY INFRASTRUKTURY · TA SAMA ZASADA',
      },
      {
        typ: 'przelacznik',
        grupa: 'rodo-ai-act-gdzie-dane',
        opcje: [
          {
            numer: 'WARIANT 1',
            tytul: 'Infrastruktura u nas',
            podtytul: 'nasze konta u dostawców',
            naglowek: 'Bot stoi u nas, a zapis z rozmów nie wychodzi poza Unię Europejską.',
            akapity: [
              'Ty zostajesz administratorem, my przetwarzamy dane na Twoje polecenie, na umowie powierzenia. Wgląd w rozmowy masz przez cały czas, a nie na żądanie.',
            ],
            /* KONTROLA 2026-09-22: wszystkie trzy punkty tego wariantu dublowały treść
               spoza przełącznika. „Nagrania i transkrypcje zostają w Unii Europejskiej"
               stało ZNAK W ZNAK w FAQ, „Zakres zapisu i czas przechowywania ustawiasz Ty"
               różniło się od kapsuły jednym słowem (0,86), a „Umowę powierzenia
               podpisujemy przy wdrożeniu" od akapitu o dokumentach jednym (0,91).
               Punkty mówią teraz to, co odróżnia WARIANT 1 od WARIANTU 2, czyli czyje
               są konta i klucze. Wspólne zasady zostają tam, gdzie stały. */
            punkty: [
              'Nagrania i transkrypcje stoją na naszych kontach u dostawców, w Unii Europejskiej.',
              'Dostępy i klucze do tych kont trzymamy po naszej stronie.',
              'Ten wariant idzie w parze z rozliczeniem miesięcznym za utrzymanie.',
            ],
          },
          {
            numer: 'WARIANT 2',
            tytul: 'Infrastruktura u Ciebie',
            podtytul: 'Twoje konta u dostawców',
            naglowek:
              'Przekazujemy Ci całą infrastrukturę, więc nagrania i transkrypcje trafiają na Twoje konta.',
            akapity: [
              'To najdalej idąca wersja kontroli: zapis nie przechodzi przez nasze konta u dostawców, tylko od razu ląduje na Twoich. My zostajemy przy poprawkach, wtedy gdy je zamówisz.',
            ],
            punkty: [
              'Nagrania i transkrypcje trafiają na Twoje konta u dostawców, nie na nasze.',
              'Dostępy i klucze zostają po Twojej stronie.',
              'Ten wariant idzie w parze z rozliczeniem bez opłaty miesięcznej.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        /* KONTROLA 2026-09-22: nagłówek brzmiał „Model językowy prowadzący rozmowę
           pochodzi od Anthropic" i był ZNAK W ZNAK zdaniem z kapsuły. Drugi akapit
           powtarzał drugą połowę odpowiedzi FAQ o dostawcy modelu. Nagłówek przepisany,
           zdanie o inspektorze zostaje w FAQ. */
        naglowek: 'Za rozmowę odpowiada model od Anthropic',
        akapity: [
          'Mówimy to wprost, bo klient z branży regulowanej i tak zapyta, czyj to model. Nie zasłaniamy się ogólnikiem o sztucznej inteligencji.',
        ],
        wariant: 'quiet',
        chip: 'DOSTAWCA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Umowa powierzenia i dokumenty, które zostają po Twojej stronie',
        akapity: [
          'Umowę powierzenia danych podpisujemy przy wdrożeniu. Opisuje, co wolno nam robić z danymi z rozmów i na czyje polecenie to robimy.',
          'Rejestr czynności przetwarzania i klauzula informacyjna to Twoje dokumenty i zostają Twoje. My dajemy do nich materiał, czyli opis gotowej konfiguracji Twojego bota.',
        ],
        /* KONTROLA 2026-09-22: te trzy punkty były streszczeniem całej strony w trzeciej
           kopii. „Umowa powierzenia: podpisywana przy wdrożeniu" dublowało akapit tuż
           nad sobą (0,91 wobec wariantu 1 przełącznika), „Opis konfiguracji: co bot
           zbiera, gdzie to trafia" dublowało drugi akapit tej samej sekcji, a „Retencja:
           czas ustawiasz Ty" kartę o czasie przechowywania i kapsułę. Identyczna lista
           czterech pozycji stoi w sekcji „Co nie jest osobną pozycją na rachunku"
           w ramie ceny i tam zostaje, bo tam odpowiada na inne pytanie. */
        wariant: 'edge',
        chip: 'DOKUMENTY',
        stopka: [
          'Konfigurację opisujemy zwykłym językiem, żeby dało się ją pokazać inspektorowi ochrony danych.',
          'Ocenę zgodności zostawiamy Twojemu prawnikowi.',
        ],
      },
    ],
  },

  /* Tabela odpowiedzialności zamiast klasycznego „bez nas kontra z nami":
     ta strona niczego nie porównuje z ręczną robotą, tylko rozdziela role.
     Komórki krótkie (konwencja v20 podstron: `cecha` ok. 12-18 znaków,
     kolumny ok. 30), żeby wiersze nie łamały się na wąskich ekranach.
     ŻADNA komórka nie niesie kwoty ani terminu (uwaga wdrożeniowa §6). */
  tabelaPorownawcza: {
    h2: 'Kto za co odpowiada przy voicebocie',
    naglowekBez: 'Po Twojej stronie',
    naglowekZNami: 'Po stronie SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Rola',
        bez: 'Administrator danych',
        zNami: 'Podmiot przetwarzający',
      },
      {
        cecha: 'Umowa powierzenia',
        bez: 'Podpisujesz jako administrator',
        zNami: 'Podpisujemy przy wdrożeniu',
      },
      {
        cecha: 'Zapowiedź AI',
        bez: 'Zatwierdzasz jej brzmienie',
        zNami: 'Wpisujemy ją jako pierwsze zdanie',
      },
      {
        cecha: 'Zakres zapisu',
        bez: 'Decydujesz, co zostaje z rozmowy',
        zNami: 'Ustawiamy to w scenariuszu',
      },
      {
        cecha: 'Czas przechowywania',
        bez: 'Ustalasz, jak długo to leży',
        zNami: 'Wykonujemy Twoje ustawienie',
      },
      {
        cecha: 'Miejsce danych',
        bez: 'Twoje konta przy przekazanej infrastrukturze',
        zNami: 'Nasze konta, gdy trzymamy ją u siebie',
      },
      {
        cecha: 'Dokumenty',
        bez: 'Rejestr i klauzula informacyjna',
        zNami: 'Opis konfiguracji do tych dokumentów',
      },
      {
        cecha: 'Ocena prawna',
        bez: 'Twój prawnik albo inspektor',
        zNami: 'Nie wydajemy jej i nie udajemy, że możemy',
      },
    ],
  },

  /* Sekcja 7 pakietu („jak my to ustawiamy, punkt po punkcie") ścieśniona do
     trzech kroków, bo tyle wymusza kontrakt szablonu. Akurat te trzy niosą
     całą różnicę między konfiguracją, którą da się pokazać inspektorowi,
     a botem postawionym na czuja. Zero terminów w dniach: pakiet ich dla tej
     podstrony nie podaje. */
  kroki: {
    h2: 'Co ustalamy z Tobą, zanim bot odbierze pierwszy telefon?',
    items: [
      {
        tytul: 'Zapowiedź i granice rozmowy',
        /* KONTROLA 2026-09-22: drugie zdanie brzmiało „Brzmienie zatwierdzasz Ty, bo to
           Twoja firma mówi tym głosem" i różniło się od zdania z sekcji o pierwszym
           zdaniu jednym słowem (0,86). Ten sam fakt, inne miejsce w procesie. */
        opis:
          'Ustalamy, jak bot przedstawia się w pierwszym zdaniu, o co pyta i czego nie mówi nigdy. Gotowy tekst zapowiedzi dostajesz do akceptacji przed startem.',
      },
      {
        tytul: 'Nagrywanie, zakres zapisu i czas',
        opis:
          'Decydujesz, czy rozmowa jest nagrywana, co z niej zostaje w notatce i jak długo to leży. My ustawiamy to w konfiguracji i pilnujemy ustawionego czasu.',
      },
      {
        tytul: 'Umowa powierzenia i opis konfiguracji',
        opis:
          'Podpisujemy umowę powierzenia i przekazujemy Ci opis: co bot zbiera, gdzie to trafia i jak długo tam zostaje. Masz z czego uzupełnić własne dokumenty.',
      },
    ],
  },

  /* Bez `minPrice` i bez `cenaStala`: ta strona niczego nie wycenia, a ceny
     voicebota są widełkami, nie kwotą stałą (lib/uslugi/voiceboty.ts). Kwoty
     stoją w jednym miejscu, u rodzica, i tam kieruje `linkPoradnik`.

     RENDER CENY, PUNKT OTWARTY (kontrola 2026-09-22, ta sama usterka stoi
     opisana w `lib/uslugi/podstrony/monitoring-cytowan-w-ai.ts`):
     `components/uslugi/RamaCeny.tsx` dokleja pod kartą zdanie BEZWARUNKOWO,
     a przy braku `cenaStala` leci wariant widełkowy: „To widełki startowe,
     nie ostateczna faktura. Dokładną cenę poznasz na bezpłatnej diagnozie".
     Na tej karcie nie ma ŻADNEJ kwoty, więc zdanie mówi o widełkach, których
     nie widać, i obiecuje dokładną cenę na bezpłatnej rozmowie, chociaż ta
     strona mówi tylko o ustaleniu zakresu. `cenaStala: true` bez kwoty byłoby
     drugim kłamstwem, więc w tym pliku nie da się tego naprawić. */
  ramaCeny: {
    h2: 'Czy zgodność z RODO i AI Act podnosi cenę voicebota?',
    tresc:
      'Nie ma osobnej pozycji za zgodność. Zapowiedź na starcie rozmowy, ustawienie zakresu zapisu, czas przechowywania i umowa powierzenia są częścią każdego wdrożenia. Rachunek za voicebota ma trzy pozycje: stworzenie, utrzymanie i zużycie. Kwoty stoją na stronie usługi, a zakres dla Twojego przypadku ustalamy na bezpłatnej rozmowie.',
    bloki: [
      {
        typ: 'sekcja',
        naglowek: 'Co nie jest osobną pozycją na rachunku',
        akapity: [
          'Te cztery rzeczy robimy przy każdym wdrożeniu, niezależnie od branży i od tego, który wariant infrastruktury wybierzesz. To normalna część budowy bota, a nie dodatek do dokupienia.',
        ],
        punkty: [
          'Zapowiedź, że rozmówca mówi z systemem AI, w pierwszym zdaniu.',
          'Ustawienie zakresu zapisu i czasu przechowywania na Twoją decyzję.',
          'Umowa powierzenia danych, podpisywana przy wdrożeniu.',
          'Opis konfiguracji do Twojego rejestru i klauzuli informacyjnej.',
        ],
        wariant: 'top',
        chip: 'ZASADA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Czego ta strona nie załatwia',
        akapity: [
          'Opisujemy tu wyłącznie to, jak ustawiamy nasze wdrożenia. To nie jest porada prawna i nie zastępuje oceny Twojego prawnika ani inspektora ochrony danych.',
          'W medycynie, prawie i finansach pokaż im konfigurację, zanim bot odbierze pierwszy telefon. Damy Ci do tego opis napisany zwykłym językiem, a nie ogólnik o bezpieczeństwie.',
        ],
        wariant: 'edge',
        chip: 'UCZCIWIE',
      },
    ],
    linkPoradnik: {
      przed: 'Trzy pozycje rachunku i kwoty rozpisaliśmy na stronie ',
      etykieta: 'voiceboty dla firm',
      po: '.',
      href: '/uslugi/voiceboty',
    },
  },

  /* FAQ prawne (sekcja 8 pakietu). Ten sam tekst idzie na stronę i do FAQPage
     JSON-LD, więc każda edycja tutaj rozjeżdża oba naraz. ŻADNE pytanie nie
     powtarza stringa użytego wyżej w nagłówkach sekcji (repo pilnuje
     zdublowanych h3 od 2026-09-22).

     KONTROLA 2026-09-22, DZIEWIĘĆ POZYCJI -> SZEŚĆ: kontrakt `Usluga.faq`
     (lib/uslugi/types.ts) mówi 5-6 pozycji, a cała gałąź voicebotów trzyma
     dokładnie 6. Zdjęte i scalone:
      - „Gdzie trafiają nagrania i transkrypcje?" oraz „Jak długo leżą nagrania
        i notatki z rozmów?" to jedna sprawa (miejsce i czas tego samego zapisu),
        więc są teraz jednym pytaniem. Zdanie „Jego zmiana to zmiana ustawienia,
        nie nowe wdrożenie" wypadło stąd, bo różniło się jednym słowem od punktu
        karty „Czas przechowywania" (0,88) i tam zostaje,
      - „Czy rozmówca może zażądać rozmowy z człowiekiem?": obie jego odpowiedzi
        stały ZNAK W ZNAK w sekcji „Co, jeśli rozmówca chce rozmawiać z człowiekiem?"
        w `problem.bloki`. Ze strony nie znika ani jedno słowo,
      - „Czy to, co tu piszecie, jest poradą prawną?": jego treść stoi w sekcji
        „Czego ta strona nie załatwia" w ramie ceny, razem ze zdaniem o medycynie,
        prawie i finansach (podobieństwo było 0,83). Zastrzeżenie zostaje w kapsule
        i w pierwszej odpowiedzi niżej. */
  faq: [
    {
      pytanie: 'Czy voicebot jest legalny?',
      /* KONTROLA 2026-09-22: odpowiedź kończyła się zdaniem „To nie jest porada
         prawna", które stało na tej stronie pięć razy znak w znak. Zostaje w kapsule
         i w sekcji „Czego ta strona nie załatwia"; tutaj to samo zastrzeżenie idzie
         własnymi słowami. */
      odpowiedz:
        'Tak, pod dwoma warunkami: rozmówca wie, że mówi z systemem AI, i wiadomo, kto odpowiada za nagranie rozmowy. Oba spełniamy w każdym wdrożeniu, bo bot przedstawia się w pierwszym zdaniu, a podział ról spisujemy w umowie powierzenia. Zgodność w Twoim przypadku ocenia Twój prawnik, nie my.',
    },
    {
      pytanie: 'W którym momencie rozmowy bot mówi, że jest systemem AI?',
      odpowiedz:
        'W pierwszym zdaniu, zanim padnie pytanie o sprawę. Nie czeka, aż ktoś zapyta, nie podaje ludzkiego imienia bez zaznaczenia, że jest asystentem głosowym, a na pytanie wprost odpowiada wprost.',
    },
    {
      pytanie: 'Czy musimy nagrywać rozmowy z voicebotem?',
      odpowiedz:
        'Nie. Zapis dźwięku włączamy tylko wtedy, gdy tego chcesz. Rozmówca, który nie zgadza się na nagranie, może dalej załatwić sprawę, a z rozmowy zostaje wtedy notatka z ustaleń.',
    },
    {
      pytanie: 'Kto jest administratorem danych z rozmów?',
      odpowiedz:
        'Ty. My działamy jako podmiot przetwarzający, na umowie powierzenia, którą podpisujemy przy wdrożeniu. Przetwarzamy dane na Twoje polecenie i w zakresie, który sam ustawiłeś.',
    },
    {
      /* SCALONE 2026-09-22 z dwóch pozycji: „Gdzie trafiają nagrania i transkrypcje?"
         i „Jak długo leżą nagrania i notatki z rozmów?". Miejsce i czas dotyczą tego
         samego zapisu, więc model cytuje teraz jedną pełną odpowiedź zamiast dwóch
         połówek. Oba fakty w całości. */
      pytanie: 'Gdzie trafiają nagrania i transkrypcje i jak długo tam leżą?',
      odpowiedz:
        'Nagrania i transkrypcje zostają w Unii Europejskiej. Przy wariancie z infrastrukturą po Twojej stronie lądują od razu na Twoich kontach u dostawców, nie na naszych. Leżą tyle, ile ustawisz: czas przechowywania jest ustawieniem konfiguracji, a nie naszą decyzją.',
    },
    {
      pytanie: 'Czyj model językowy prowadzi rozmowę?',
      odpowiedz:
        'Rozmowę prowadzi model Anthropic. Nazwę dostawcy podajemy wprost, bo Twój inspektor ochrony danych potrzebuje jej do dokumentacji.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §PODSTRONA 6 punkt 9): bezpłatna
     rozmowa. Mikrokopia mówi, co na niej ROBIMY, i ani słowa o pomiarze,
     audycie czy raporcie: bezpłatna rozmowa to wyłącznie badanie potrzeb
     (ustalenie właściciela z 2026-08-31). */
  cta: {
    label: 'Umów bezpłatną rozmowę',
    href: '#diagnoza',
    mikrokopia:
      'Obejrzymy, jak dziś odbierasz telefony, i ustalimy zakres: co bot ma mówić, co ma zapisywać i jak długo to ma zostawać. Bez zobowiązań.',
    /* KONTROLA 2026-09-22: `dowod` powtarzał dwie rzeczy naraz. Wyliczenie „co bot
       zbiera, gdzie to trafia i jak długo tam zostaje" stało na tej stronie cztery
       razy (krok 3, akapit o dokumentach, punkt w tej samej sekcji i tutaj), a zdanie
       „To nie jest porada prawna" pięć razy. Zastrzeżenie zostaje w kapsule i w sekcji
       „Czego ta strona nie załatwia", wyliczenie w kroku 3 i w akapicie o dokumentach. */
    dowod:
      'Granice rozmowy i zakres zapisu ustalamy przed uruchomieniem numeru, a nie po pierwszych telefonach.',
  },

  queries: [
    'voicebot RODO AI Act',
    'czy voicebot jest legalny',
    'voicebot RODO',
    'voicebot AI Act',
    'nagrywanie rozmów przez voicebota a zgoda',
    'kto jest administratorem danych przy voicebocie',
    'umowa powierzenia przy voicebocie',
  ],

  /* POWIĄZANIA (uwaga wdrożeniowa §7: każda podstrona linkuje w górę do
     rodzica). Etykieta = h1 albo tytuł strony docelowej, opis = fakt, który
     na niej stoi. ŻADNEGO opisu z kwotą (uwaga wdrożeniowa §6: kwoty wyłącznie
     w sekcji ceny, w kapsule i w meta).

     TRZECH SIÓSTR TU NIE MA I BYĆ NIE MOŻE (poprawione przez kontrolę
     2026-09-22). Trasa `app/uslugi/voiceboty/[podstrona]/page.tsx` renderuje
     `<PodstronyPowiazane slug={rodzic} pomin={slug} />`, a ten komponent sam
     buduje sekcję „Konkretne zastosowania" z `getPodstronyRodzica('voiceboty')`
     minus ta strona, biorąc `h1` każdej siostry jako tytuł kafla. Pierwsza
     wersja tego pliku powtarzała te same trzy linki z tymi samymi etykietami
     w `powiazane.uslugi`, czyli DRUGI raz, w kaflach stojących bezpośrednio
     pod tamtymi. Trzy istniejące siostry (`windykacja`, `potwierdzanie-wizyt`,
     `odbieranie-telefonow`) trzymają w `powiazane` wyłącznie poradnik
     i narzędzie, dokładnie z tego powodu.

     POWRÓT DO RODZICA zostaje, bo komponent go NIE renderuje: na podstronie
     listuje tylko siostry. Trzecia droga w górę to okruszki w hero (poziom
     „Voiceboty", `lib/uslugi/podstrony/okruszki.ts`) i `linkPoradnik`
     w sekcji ceny.

     LINKU DO `/uslugi/voiceboty/cennik` TU NIE MA celowo: ta trasa nie istnieje
     jeszcze w rejestrze `lib/uslugi/podstrony/index.ts`, a martwy link wewnętrzny
     łamie kryterium odbioru. Integrator dopisze go, gdy cennik pójdzie live. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Cała usługa: co bot załatwia sam, jak wygląda wdrożenie i z czego składa się rachunek za voicebota.',
      },
    ],
    poradniki: [
      {
        etykieta: 'AI Act a Twoja firma: co musisz wiedzieć przed wdrożeniem (2026)',
        href: '/blog/ai-act-a-twoja-firma-2026',
        opis: 'Wpis informacyjny o kategoriach ryzyka i o tym, co dotyczy małej firmy. Też nie jest poradą prawną.',
      },
    ],
  },
};
