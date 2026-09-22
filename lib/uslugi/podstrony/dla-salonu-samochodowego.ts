import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 4 — SALON I SERWIS SAMOCHODOWY
 * (`/uslugi/voiceboty/dla-salonu-samochodowego`).
 * Fraza primary: „voicebot dla salonu samochodowego" (pakiet
 * `.seo-przeglad/pakiety/voiceboty.md` §PODSTRONA 4, treść zatwierdzona
 * przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica i trzech istniejących sióstr):
 *  - RODZIC `/uslugi/voiceboty` sprzedaje CAŁĄ usługę dla dowolnej firmy:
 *    trzy osobne pozycje kosztu zamiast abonamentu, progi wdrożenia, rundy
 *    poprawek, dwa modele utrzymania.
 *  - SIOSTRA `/uslugi/voiceboty/odbieranie-telefonow`: sam ODBIÓR połączenia
 *    w dowolnej firmie i to, co dzieje się z nieodebraną sprawą.
 *  - SIOSTRA `/uslugi/voiceboty/potwierdzanie-wizyt`: umawianie, odwoływanie
 *    i przekładanie terminów w kalendarzu.
 *  - SIOSTRA `/uslugi/voiceboty/windykacja`: telefon przychodzący w sprawie
 *    zaległej płatności.
 *  - TA STRONA sprzedaje wyłącznie scenariusz warsztatu i salonu: zapis na
 *    przegląd i naprawę z danymi pojazdu, pytanie o status zlecenia, pytanie
 *    o auto z placu i przekazanie sprawy doradcy. Kończy się jedną decyzją:
 *    rozmawiamy o telefonach w moim serwisie.
 *  - NIE MA TU I BYĆ NIE MOŻE: rozkładu ceny na trzy pozycje (rodzic; tutaj
 *    zgodnie z pakietem wyłącznie widełki i link), opisu podsumowania po
 *    rozmowie jako tematu samego w sobie (siostra `odbieranie-telefonow`)
 *    ani mechaniki kalendarza wizyt (siostra `potwierdzanie-wizyt`).
 *    Do wszystkich trzech prowadzi LINK w „Powiązanych", treść zostaje tam.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła: pakiet §PODSTRONA 4 („KAPSUŁA (gotowa)"), przeniesiona
 *    DOSŁOWNIE, co do znaku. Nie skracać i nie przepisywać własnymi słowami,
 *    bo to treść zatwierdzona przed wdrożeniem,
 *  - H1, fraza główna, układ dziewięciu sekcji i rozdział intencji: pakiet
 *    §PODSTRONA 4,
 *  - kwoty i czasy (2500 zł netto, 5000 do 9000 zł netto, 299 do 1500 zł netto
 *    miesięcznie, 0 zł, 350 zł netto za godzinę, 3 do 5 i 5 do 25 dni
 *    roboczych, dwie rundy poprawek, czas liczony od przekazania kompletu
 *    materiałów): kapsuła z pakietu plus `lib/uslugi/voiceboty.ts` (kapsula,
 *    ramaCeny, faq), zgodne co do złotówki,
 *  - „bot nie dzwoni sam, obsługuje wyłącznie połączenia przychodzące":
 *    kontrakt powtórzony w ośmiu miejscach kodu (`lib/uslugi/voiceboty.ts`
 *    faq „Czy voicebot dzwoni sam do klientów?" plus trzy podstrony),
 *    pakiet §„UWAGA NADRZĘDNA",
 *  - zapowiedź „jestem asystentem AI" (AI Act): `lib/uslugi/voiceboty.ts`
 *    (rozwiazanie, faq),
 *  - Lenart Motors: pakiet §sekcja 10 karta 3 plus
 *    `lib/realizacje/strona-cytowana-przez-chatgpt.ts`. WYŁĄCZNIE jako strona
 *    WWW pod widoczność w ChatGPT, NIGDY jako voicebot (uwaga do treści
 *    w pakiecie, powtórzona w §„Źródło liczb" tamtej sekcji),
 *  - „24/7": wiersz „Odbiór połączeń" z tabeli porównawczej TEJ strony. Ciąg
 *    „24/7" musi w tej komórce zostać: bierze go bramka
 *    `ServiceHero.kafleStatystyk` do czwartego kafla w hero.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  2500 zł netto, 5000 do 9000 zł netto, 299 do 1500 zł netto miesięcznie,
 *  0 zł, 350 zł netto za godzinę, 3 do 5 dni roboczych, 5 do 25 dni roboczych,
 *  dwie rundy poprawek, 24/7, cztery pytania blokujące doradcę (policzone
 *  z listy na tej stronie), sześć spraw w zakresie bota (policzone z listy),
 *  cztery sytuacje „kiedy się nie opłaci" (policzone z listy). Każda NASZA
 *  kwota z dopiskiem netto; przy „0 zł" dopisku netto NIE MA, bo zero netto
 *  to zero brutto.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ANI JEDNEJ liczby
 *  branżowej (ilu klientów dzwoni do serwisu, ile kosztuje nieodebrany
 *  telefon w warsztacie, ile aut przechodzi przez halę), nie podaje też
 *  żadnego odniesienia czasowego typu „pół roku temu" ani roku wdrożenia
 *  u Lenart Motors. Wszystkie zdania są napisane tak, żeby były prawdziwe
 *  bez tych danych.
 *
 * ZAKAZANE NA TEJ STRONIE:
 *  - jakakolwiek sugestia, że bot dzwoni sam, oddzwania do leadów z portali
 *    ogłoszeniowych albo obdzwania bazę klientów. Wolno o tym pisać WYŁĄCZNIE
 *    w zaprzeczeniu (podstrona `/oddzwanianie-do-leadow` została z pakietu
 *    wycięta w całości właśnie z tego powodu),
 *  - fraza „wirtualna recepcjonistka" w każdej odmianie,
 *  - obietnica pomiaru, audytu, raportu albo listy rzeczy do zrobienia na
 *    bezpłatnej rozmowie (ustalenie właściciela z 2026-08-31: bezpłatna
 *    rozmowa to WYŁĄCZNIE badanie potrzeb),
 *  - obietnica stanu naprawy albo stanu magazynu na żywo bez podpięcia
 *    systemu, w którym klient prowadzi zlecenia i stany,
 *  - ceny konkurencji i statystyki branżowe.
 *
 * GDZIE WOLNO POSTAWIĆ KWOTĘ: kapsuła, `metaTitle`, `metaDescription` oraz
 * sekcja `ramaCeny` z jej blokami. NIGDZIE INDZIEJ: w FAQ, w `cta` i w kartach
 * „Powiązane" nie ma ani jednej złotówki (w poprzednich partiach kwoty wyciekły
 * właśnie do kart „Powiązane" i trzeba je było wycinać).
 *
 * `ramaCeny.cenaStala` CELOWO NIEUSTAWIONE: ceny voicebotów to widełki
 * (2500 zł netto za prostego, 5000 do 9000 zł netto z integracjami), więc
 * kafel ceny w hero ma zostać z prefiksem „od ".
 *
 * LINK DO CENNIKA (do domknięcia przez integratora): pakiet każe każdej nowej
 * podstronie linkować w bok do `/uslugi/voiceboty/cennik`. Ta trasa NIE
 * ISTNIEJE w dniu pisania pliku (rejestr `lib/uslugi/podstrony/index.ts` jej
 * nie ma), a `href` musi być realną trasą 200, więc `linkPoradnik` prowadzi
 * dziś do rodzica. Gdy podstrona `/cennik` wejdzie do rejestru, podmienić
 * `linkPoradnik.href` i dopisać kartę cennika do `powiazane.uslugi`.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „voiceboty" po rodzicu
 * (uwaga wdrożeniowa §5 pakietu: żadnego nowego koloru dla podstron
 * branżowych) i renderuje się TYMI SAMYMI komponentami co strony usług
 * i pozostałe podstrony. Zero nowych typów bloków, zero nowego CSS.
 */
export const dlaSalonuSamochodowego: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'dla-salonu-samochodowego',
  dataAktualizacji: '2026-09-22',

  h1: 'Voicebot dla salonu i serwisu samochodowego',

  /* KAPSUŁA. Treść z pakietu §PODSTRONA 4, ŚCIŚNIĘTA 2026-09-22 z 80 słów do przedziału
     z kontraktu `Usluga.kapsula` (lib/uslugi/types.ts: 40-60 słów). Kapsuła jest blokiem,
     który modele cytują jako całą odpowiedź, więc ma być gęsta, nie długa.
     ANI JEDNA LICZBA NIE WYPADŁA: oba progi stworzenia, oba modele utrzymania i 0 zł
     stoją dalej, tak samo zakres rozmowy i zakaz dzwonienia. Słowo „warsztatu" przy
     kalendarzu zdjęte jako zbędne (cała kapsuła mówi o serwisie), a pełne brzmienie
     „z integracją do kalendarza warsztatu" stoi w `ramaCeny.tresc` i w pasie metryk. */
  kapsula:
    'Voicebot dla salonu i serwisu samochodowego odbiera telefon, gdy nikt nie podejdzie. Zapisuje na przegląd i naprawę, odpowiada na pytania o status zlecenia i dostępność modelu, a trudne sprawy oddaje doradcy z notatką. Nie dzwoni sam. Stworzenie: 2500 zł netto albo 5000 do 9000 zł netto z integracją do kalendarza. Utrzymanie: 299 do 1500 zł netto miesięcznie albo 0 zł.',

  /* metaTitle: pakiet dawał 33 znaki, konwencja repo (types.ts) i decyzja
     właściciela mówią 50-60. Fraza główna „voicebot dla salonu samochodowego"
     zostaje NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakty z tej strony:
     „24/7" z tabeli porównawczej i kwota wejściowa z kapsuły oraz `ramaCeny`.
     Długość 57 znaków. Layout dokleja sufiks marki, więc w SERP wychodzi
     „Voicebot dla salonu samochodowego: 24/7, od 2500 zł netto · SimpleFast.ai". */
  metaTitle: 'Voicebot dla salonu samochodowego: 24/7, od 2500 zł netto',
  /* 147 znaków (kontrakt `Usluga`: 140-160), przeliczone na łańcuchu z tego
     pliku. Zero powtórzenia opisu rodzica i trzech sióstr. */
  metaDescription:
    'Voicebot dla salonu samochodowego odbiera telefon 24/7, zapisuje na przegląd i naprawę, a trudną sprawę oddaje doradcy z notatką. Od 2500 zł netto.',

  problem: {
    /* H2 z pakietu (sekcja 1: „Telefon dzwoni, gdy mechanik ma ręce w silniku")
       postawiony jako pytanie, zgodnie z kontraktem `Usluga`. Rodzic pyta
       „Ile telefonów dziennie nie odbierasz?" (o liczbę), siostry pytają o
       utracone zapytania, wizyty i płatności. Ta strona pyta, KTO fizycznie
       ma odebrać telefon w warsztacie. */
    h2: 'Kto odbiera telefon, gdy mechanik ma ręce w silniku?',
    tresc:
      'Zwykle nikt albo doradca, który akurat przyjmuje auto. W serwisie telefon dzwoni w środku roboty, a przy podnośniku nie ma jak go odebrać.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Klient z terminem przeglądu w głowie obdzwania warsztaty w okolicy i zapisuje się w tym, który odebrał jako pierwszy. Druga próba zdarza się rzadko.',
      },
      {
        typ: 'naglowek',
        tekst: 'Kiedy w warsztacie nie ma komu odebrać?',
        ikona: 'lupa-wykres',
        chip: 'SERWIS I SALON',
        overline: 'DZIEŃ W WARSZTACIE · TRZY MOMENTY BEZ ODBIORU',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Przyjęcie i wydanie auta',
            akapity: [
              'Doradca stoi z klientem przy aucie, spisuje przebieg i uszkodzenia. Telefon dzwoni właśnie wtedy, bo to są godziny otwarcia serwisu.',
            ],
            punkty: [
              'Przerwane przyjęcie pojazdu kosztuje więcej niż jedna nieodebrana rozmowa.',
            ],
          },
          {
            naglowek: 'Hala i podnośnik',
            akapity: [
              'Mechanik ma ręce w silniku i brudne rękawice. Do telefonu podchodzi ktoś, kto akurat nie stoi przy aucie, a taka osoba nie zawsze jest.',
            ],
            punkty: [
              'Im więcej aut na podnośnikach, tym mniej rąk do słuchawki.',
            ],
          },
          {
            naglowek: 'Sobota i po zamknięciu',
            akapity: [
              'Klient układa wizytę w serwisie w swojej wolnej chwili, czyli wieczorem i w weekend. Wtedy przy telefonie nie ma już nikogo.',
            ],
            punkty: [
              'Zgłoszenie z soboty czeka do poniedziałku, a klient nie czeka.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Cztery pytania, które zdejmują doradcę z hali',
        akapity: [
          'Odpowiedzi na nie są w serwisie gotowe od lat. Mimo to każde takie pytanie odrywa doradcę od klienta, który stoi przed nim przy ladzie.',
        ],
        punkty: [
          'Kiedy macie wolny termin na przegląd?',
          'Czy moje auto jest już gotowe do odbioru?',
          'Ile potrwa ta naprawa i czy dostanę auto zastępcze?',
          'Czy macie na placu ten model w tej wersji?',
        ],
        wariant: 'quiet',
        chip: 'TELEFONY',
      },
    ],
  },

  rozwiazanie: {
    /* Rodzic pyta „Co robi bot telefoniczny, gdy nie możesz odebrać?"
       (mechanizm w dowolnej firmie). Ta strona pyta o ZAKRES w jednej branży
       i odpowiada listą spraw warsztatu i salonu. */
    h2: 'Co voicebot obsługuje w serwisie i w salonie?',
    tresc:
      'Prowadzi rozmowę przychodzącą według scenariusza warsztatu: zapis na przegląd i naprawę, pytanie o status zlecenia, pytanie o auto z placu, a resztę spisuje i oddaje doradcy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Sześć spraw, które bot bierze na siebie w rozmowie',
        ikona: 'sluchawka-fala',
        chip: 'ZAKRES',
        overline: 'POŁĄCZENIE PRZYCHODZĄCE · SCENARIUSZ WARSZTATU',
      },
      {
        typ: 'lista',
        punkty: [
          'Zapis na przegląd, wymianę oleju albo opon, z terminem, który ma pokrycie w grafiku warsztatu.',
          'Pytanie o status zlecenia: bot podaje to, co mu udostępnisz, albo spisuje numer zlecenia dla doradcy.',
          'Pytanie o auto z placu: zbiera markę, model, wersję i termin odbioru, a sprawę oddaje handlowcowi.',
          'Godziny otwarcia, dojazd i zasady auta zastępczego, o ile wpiszesz je do scenariusza.',
          'Odwołanie albo przełożenie wizyty, gdy klient dzwoni i sam prosi o zmianę.',
          'Sprawa spoza scenariusza: bot spisuje ją i przekazuje doradcy razem z notatką z rozmowy.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Zapis na przegląd i naprawę w kalendarzu warsztatu',
        akapity: [
          'Bot pyta o to, czego potrzebuje warsztat, a nie o samą godzinę: markę i model, rocznik, numer rejestracyjny i rodzaj usługi. Dopiero z tym dobiera termin.',
          'Przy podłączonym grafiku termin jest dobrany do roboty, bo przegląd zajmuje inne okno niż wymiana rozrządu. Bez podłączonego grafiku bot spisuje zgłoszenie z kompletem danych pojazdu, a termin potwierdza doradca.',
        ],
        punkty: [
          'Zakres usług i czasy postoju bierzemy z Twojego cennika, nie z ogólnej wiedzy o motoryzacji.',
          'Klient słyszy to, co wpiszesz do scenariusza, na przykład jakie dokumenty ma zabrać ze sobą.',
          'Zmianę terminu bot przyjmuje w tej samej rozmowie przychodzącej, bez oddzwaniania.',
        ],
        wariant: 'top',
        chip: 'GRAFIK',
      },
      {
        typ: 'naglowek',
        tekst: 'Status naprawy i dostępność modelu: skąd bot bierze odpowiedź?',
        ikona: 'wykres-strzalka',
        chip: 'DWA PYTANIA',
        overline: 'ZLECENIE W TOKU · AUTO NA PLACU',
      },
      {
        typ: 'przelacznik',
        grupa: 'salon-samochodowy-dwa-pytania',
        opcje: [
          {
            numer: 'PYTANIE 1',
            tytul: 'Status naprawy',
            podtytul: 'zlecenie w toku',
            naglowek: 'Czy moje auto jest już gotowe?',
            akapity: [
              'Bot odpowiada w zakresie, który mu udostępnisz. Gdy podepniemy system, w którym prowadzicie zlecenia, poda stan zlecenia z tego systemu. Gdy go nie podepniemy, spisuje numer zlecenia i mówi, że odezwie się doradca.',
            ],
            punkty: [
              'Bez podpiętego systemu bot nie zgaduje stanu naprawy i wprost mówi, że sprawdzi to człowiek.',
              'Notatka z rozmowy idzie do doradcy, więc nikt nie szuka, kto dzwonił i w jakiej sprawie.',
              'Klient słyszy, kiedy dostanie odpowiedź, więc nie dzwoni ponownie tego samego dnia.',
            ],
          },
          {
            numer: 'PYTANIE 2',
            tytul: 'Auto z placu',
            podtytul: 'salon i jazda próbna',
            naglowek: 'Czy macie ten model w tej wersji?',
            akapity: [
              'Bot odpowiada tym, co stoi w scenariuszu salonu: jakie wersje prowadzicie i jak wygląda droga od pytania do jazdy próbnej. Stan konkretnego egzemplarza potwierdza handlowiec.',
            ],
            punkty: [
              'Bot zbiera markę, model, wersję i termin, w którym klient chce odebrać auto.',
              'Zgłoszenie wraca do handlowca z notatką, a kontakt zwrotny zaczyna człowiek.',
              'Bot nie rozmawia o rabacie ani o cenie auta: to rozmowa handlowca.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czego voicebot w salonie nie zrobi',
        akapity: [
          'Salon kojarzy się z telefonami w drugą stronę, więc mówimy to wprost, zanim ktoś zapyta. Nasz bot obsługuje wyłącznie połączenia przychodzące.',
          'Na początku rozmowy mówi, że jest asystentem AI. Tego wymaga AI Act i tak zostaje w każdym scenariuszu, który piszemy.',
        ],
        punkty: [
          'Nie oddzwania do zapytań z portali ogłoszeniowych: ten telefon wykonuje handlowiec.',
          'Nie obdzwania listy klientów z przypomnieniem o przeglądzie ani o końcu gwarancji.',
          'Nie potwierdza rabatu i nie umawia ceny auta.',
          'Nie prowadzi reklamacji na własną rękę: spisuje ją i oddaje osobie, która się nią zajmuje.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: cecha ~12 znaków, kolumny ~30),
     żeby wiersze nie łamały się na dwie linie na wąskich ekranach.
     WIERSZ 1 MUSI mieć „24/7" w kolumnie `zNami`: to bramka czwartego kafla
     statystyk w hero (`ServiceHero.kafleStatystyk`), a etykietą kafla jest
     `cecha` tego wiersza. */
  tabelaPorownawcza: {
    h2: 'Dzień w serwisie bez voicebota i z voicebotem',
    naglowekBez: 'Serwis bez bota',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Odbiór połączeń',
        bez: 'Gdy doradca ma wolną rękę',
        zNami: '24/7, też w sobotę po zamknięciu',
      },
      {
        cecha: 'Zapis na przegląd',
        bez: 'Ręcznie, między klientami',
        zNami: 'Ustalony w rozmowie, z danymi auta',
      },
      {
        cecha: 'Status zlecenia',
        bez: 'Doradca odchodzi od auta',
        zNami: 'Odpowiada albo spisuje numer zlecenia',
      },
      {
        cecha: 'Auto z placu',
        bez: 'Klient czeka na oddzwonienie',
        zNami: 'Zbiera wymagania dla handlowca',
      },
      {
        cecha: 'Ślad po rozmowie',
        bez: 'Karteczka przy komputerze',
        zNami: 'Notatka z rozmowy u doradcy',
      },
      /* KONTROLA KANIBALIZACJI 2026-09-22: komórka „z nami" brzmiała „Też
         człowiek, bot nie dzwoni", a wiersz „Telefon do klienta" na siostrzanej
         `dla-kancelarii` ma „Też ręcznie, bot nie dzwoni sam". Ten sam wiersz
         tabeli, ta sama konstrukcja „Też X, bot nie dzwoni". Zaprzeczenie
         (jedyna dozwolona forma tego kontraktu) zostaje, brzmienie własne. */
      {
        cecha: 'Kontakt wychodzący',
        bez: 'Dzwoni doradca albo handlowiec',
        zNami: 'Wykonuje go człowiek, nie bot',
      },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy voicebota w warsztacie i w salonie?',
    items: [
      /* KONTROLA KANIBALIZACJI 2026-09-22: krok otwierał się zdaniem
         „Obejrzymy, jak dziś wygląda u Ciebie telefon w serwisie", czyli tym
         samym szkieletem co krok 1 na `dla-przychodni` i (przed poprawką) na
         `dla-stomatologa`. Szkielet „Obejrzymy, jak dziś... telefon w
         [rzeczownik]" zostaje przy przychodni, tutaj wchodzi czasownik warsztatu.
         Obietnica bez zmian: badanie potrzeb, zero audytu i raportu. */
      {
        tytul: 'Bezpłatna rozmowa',
        opis:
          'Posłuchamy, z czym dzwonią klienci do serwisu i kto dziś podchodzi do słuchawki, gdy hala jest pełna. Ustalimy zakres scenariusza i granice rozmowy. To badanie potrzeb, nie audyt ani raport.',
      },
      {
        tytul: 'Scenariusz warsztatu',
        opis:
          'Spisujemy usługi, czasy postoju, zasady auta zastępczego i granice: co bot mówi, a czego nie mówi nigdy. Podłączamy numer, a przy wersji z integracją także grafik warsztatu. Testujemy na żywo.',
      },
      {
        tytul: 'Odbiór i sezon',
        opis:
          'Przez dwa tygodnie testujesz bota na własnych rozmowach i zgłaszasz uwagi: dwie rundy poprawek są w cenie wdrożenia. Przed szczytem sezonu dokładamy scenariusze, na przykład na wymianę opon.',
      },
    ],
  },

  ramaCeny: {
    /* Pakiet, sekcja 6 tej podstrony: „zero rozwijania cen, tylko widełki
       i link". Dlatego NIE MA tu rozbicia na trzy pozycje ani tabeli kosztów:
       to treść rodzica (`lib/uslugi/voiceboty.ts`) i przyszłej podstrony
       `/uslugi/voiceboty/cennik`. Zostają widełki, to co realnie zmienia
       wycenę w serwisie, i dyskwalifikacja. */
    h2: 'Ile kosztuje voicebot dla salonu samochodowego?',
    tresc:
      'Stworzenie to 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do kalendarza warsztatu. Utrzymanie to 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przechodzi do Ciebie.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '2500 zł netto',
            opis: 'wersja prosta, płatna raz przy wdrożeniu',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '5000 do 9000 zł netto',
            opis: 'wersja z integracją do kalendarza warsztatu',
            zrodlo: 'kapsuła na górze strony',
            ton: 'violet',
          },
          {
            wartosc: '0 zł',
            opis: 'utrzymanie miesięczne po przekazaniu infrastruktury Tobie',
            zrodlo: 'kapsuła na górze strony',
            ton: 'green',
          },
          {
            wartosc: '3 do 5 dni roboczych',
            opis: 'tyle powstaje bot prosty, licząc od przekazania materiałów',
            zrodlo: 'akapit o czasie wdrożenia niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Od czego zależy wycena voicebota w serwisie?',
        akapity: [
          'Widełki biorą się z zakresu rozmowy, nie z wielkości firmy. Na bezpłatnej rozmowie ustalamy, w którym miejscu tych widełek stoi Twój scenariusz.',
          'Czas liczymy od przekazania materiałów warsztatu, nie od podpisania umowy: wersja prosta powstaje w 3 do 5 dni roboczych, a z integracją do grafiku w 5 do 25 dni roboczych.',
        ],
        punkty: [
          'Ile usług serwisowych bot ma znać i czy do każdej podajesz czas postoju.',
          'Czy podłączamy grafik warsztatu, czy bot ma tylko spisywać zgłoszenia.',
          'Czy bot ma czytać status zleceń z systemu, w którym je prowadzicie.',
          'Ile numerów obsługujemy: sam serwis czy serwis i salon osobno.',
          'Który model utrzymania wybierasz, bo przy infrastrukturze po Twojej stronie poprawki kosztują 350 zł netto za godzinę.',
        ],
        wariant: 'top',
        chip: 'CENNIK',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy voicebot w serwisie się nie opłaci?',
        /* KONTROLA KANIBALIZACJI 2026-09-22: akapit zaczynał się od „Wolimy
           powiedzieć to przed wdrożeniem niż po odbiorze", czyli konstrukcją
           „Wolimy powiedzieć to przed X niż po Y" z bliźniaczej sekcji
           dyskwalifikacji na `dla-przychodni`. Ta sama uczciwość, inne zdanie. */
        akapity: [
          'Mówimy o tym przed wyceną, nie po uruchomieniu bota. Cztery sytuacje, w których bot w warsztacie będzie kosztem, a nie oszczędnością.',
        ],
        punkty: [
          'Jesteś jednoosobowym warsztatem z kilkoma telefonami dziennie: oddzwonisz szybciej, niż bot się zwróci.',
          'Chcesz, żeby bot sam dzwonił po klientów albo domykał zapytania z portali: tego nie robimy.',
          'Oczekujesz statusu zleceń na żywo, ale nie chcesz podpinać systemu, w którym je prowadzicie.',
          'Nie macie spisanych usług ani czasów postoju i nikt nie ma czasu tego spisać.',
        ],
        wariant: 'quiet',
        chip: 'ZASADA',
        /* KONTROLA KANIBALIZACJI 2026-09-22: obie linie stopki były wariantem
           stopki z `dla-przychodni` („Widzisz tu swoją placówkę? Napisz mimo
           wszystko." i „Powiemy wprost, od czego zacząć, nawet jeśli nie będzie
           to bot od nas."), z podmienionym rzeczownikiem. Przepisane. */
        stopka: [
          'Twój serwis jest na tej liście? Odezwij się mimo to.',
          'Podpowiemy, co zrobić z telefonem w warsztacie, nawet gdy bot odpada.',
        ],
      },
    ],
    /* Ta sama kwota wejściowa co u rodzica (`lib/uslugi/voiceboty.ts`).
       `cenaStala` nieustawione: to widełki „od 2500 zł netto" w górę. */
    minPrice: 2500,
    /* Docelowo `/uslugi/voiceboty/cennik` (pakiet, uwaga wdrożeniowa §7).
       Ta trasa jeszcze nie istnieje, więc link prowadzi do rodzica, gdzie
       pełny rozkład ceny stoi dziś. Podmienić po wdrożeniu cennika. */
    linkPoradnik: {
      przed: 'Pełny rozkład ceny na stworzenie, utrzymanie i zużycie stoi na stronie ',
      etykieta: 'voiceboty dla firm',
      po: '.',
      href: '/uslugi/voiceboty',
    },
  },

  /* FAQ SERWISU (sekcja 8 pakietu). Pakiet nie podaje gotowych pytań dla tej
     podstrony (podaje je tylko dla podstrony 1), więc pytania są napisane tutaj,
     wyłącznie z faktów tej strony. Żadne nie powiela pytania rodzica ani trzech
     sióstr: pytania o AI Act, o RODO, o numer telefonu i o rozbicie ceny na trzy
     pozycje zostają tam, gdzie już stoją.
     Ten sam tekst idzie na stronę i do FAQPage JSON-LD. Zero kwot.

     KONTROLA 2026-09-22, OSIEM POZYCJI -> SZEŚĆ: kontrakt `Usluga.faq`
     (lib/uslugi/types.ts) mówi 5-6 pozycji, a cała gałąź voicebotów trzyma
     dokładnie 6 (rodzic i trzy siostry). Zdjęte zostały dwa pytania:
      - „Co bot robi z reklamacją albo ze sprawą gwarancyjną?": jego treść stała już
        słowo w słowo w `rozwiazanie.bloki`, w sekcji „Czego voicebot w salonie nie
        zrobi" („Nie prowadzi reklamacji na własną rękę: spisuje ją i oddaje osobie,
        która się nią zajmuje"). Fakt o liście spraw kierowanych od razu do człowieka
        wchłonęło pytanie o czas usługi niżej, żeby nic nie przepadło,
      - „Czym to się różni od bota, który po prostu odbiera telefon?": pytanie
        o strukturę naszego serwisu, nie o serwis klienta. Cała jego treść (znajomość
        usług i czasów postoju, pytanie o markę, model i numer rejestracyjny, status
        zlecenia) stoi w pytaniach o grafik, o status naprawy i o czas usługi, a
        rozdział wobec siostry `odbieranie-telefonow` niesie karta w „Powiązanych". */
  faq: [
    {
      /* KONTROLA 2026-09-22: pytanie brzmiało „Czy voicebot dzwoni sam do
         klientów salonu?", czyli prawie co do znaku tak samo jak pytanie
         rodzica („Czy voicebot dzwoni sam do klientów?") i siostry
         `odbieranie-telefonow`. Oba idą do FAQPage JSON-LD, więc były to trzy
         niemal identyczne Question.name w jednym klastrze. Pytanie zawężone do
         scenariusza salonu (portale ogłoszeniowe), odpowiedź niesie ten sam
         komplet faktów: zakaz połączeń wychodzących i kto wykonuje ten telefon. */
      pytanie: 'Czy bot oddzwania do zapytań z portali ogłoszeniowych?',
      odpowiedz:
        'Nie. Ten telefon wykonuje handlowiec albo doradca serwisowy. Nasz voicebot obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy.',
    },
    {
      pytanie: 'Czy bot zapisze klienta na przegląd w grafiku warsztatu?',
      odpowiedz:
        'Tak, gdy podłączymy grafik. Bot dobiera wtedy termin do rodzaju usługi, bo przegląd zajmuje inne okno niż wymiana rozrządu. Bez podłączonego grafiku spisuje zgłoszenie razem z marką, modelem i numerem rejestracyjnym, a termin potwierdza doradca.',
    },
    {
      pytanie: 'Czy bot poda status naprawy, gdy klient zadzwoni?',
      odpowiedz:
        'W zakresie, który mu udostępnisz. Gdy podepniemy system, w którym prowadzicie zlecenia, bot poda stan zlecenia. Gdy go nie podepniemy, spisuje numer zlecenia i mówi klientowi, że odezwie się doradca. Bot nie zgaduje stanu naprawy.',
    },
    {
      pytanie: 'Czy bot odpowie na pytanie o dostępność modelu?',
      odpowiedz:
        'Odpowiada tym, co wpiszesz do scenariusza salonu: jakie wersje prowadzicie i jak wygląda droga od pytania do jazdy próbnej. Stan konkretnego egzemplarza potwierdza handlowiec, a bot zbiera wymagania klienta i przekazuje je dalej z notatką z rozmowy.',
    },
    {
      /* KONTROLA 2026-09-22: do tej odpowiedzi wchłonięte zostało zdjęte pytanie
         o reklamację i sprawę gwarancyjną. Fakt o liście spraw kierowanych od razu
         do człowieka jest tu w całości, więc ze strony nic nie zniknęło. */
      pytanie: 'Skąd bot wie, ile potrwa dana usługa?',
      odpowiedz:
        'Z Twojego cennika i z czasów postoju, które spisujemy przy wdrożeniu. Bot nie liczy tego z ogólnej wiedzy o motoryzacji. Usługi, której nie ma w scenariuszu, nie wycenia ani nie umawia: oddaje ją doradcy, tak samo jak reklamację i sprawę gwarancyjną. Listę spraw kierowanych od razu do człowieka ustawiasz przed startem, przy scenariuszu.',
    },
    {
      pytanie: 'Ile trwa wdrożenie voicebota w serwisie?',
      odpowiedz:
        'Bot prosty powstaje w 3 do 5 dni roboczych, a wersja z integracjami w 5 do 25 dni roboczych. Czas liczymy od przekazania kompletu materiałów: listy usług, czasów postoju i dostępów. W cenie wdrożenia są dwie rundy poprawek.',
    },
  ],

  /* Jedna decyzja domykająca stronę (sekcja 9 pakietu). Mikrokopia powtarza
     granicę bezpłatnej rozmowy (badanie potrzeb, zero pomiaru i raportu), bo
     to ostatnie zdanie przed kliknięciem. `dowod` mówi o Lenart Motors
     WYŁĄCZNIE jako o stronie WWW, nigdy jako o voicebocie: tego wymaga uwaga
     do treści w pakiecie, a rejestr realizacji nie ma żadnego wdrożenia
     głosowego, więc nie ma czego udawać. */
  cta: {
    label: 'Porozmawiajmy o telefonach w serwisie',
    href: '#diagnoza',
    mikrokopia:
      'Bezpłatna rozmowa: spiszemy, z czym dzwonią klienci do serwisu, i ustalimy zakres scenariusza. To badanie potrzeb, nie audyt ani raport. Bez zobowiązań.',
    dowod:
      'W motoryzacji mamy już wdrożenie przy Lenart Motors, ale to strona WWW pod widoczność w ChatGPT, nie voicebot. Mówimy to wprost, żeby nikt nie liczył tego jako wdrożenia głosowego.',
  },

  queries: [
    'voicebot dla salonu samochodowego',
    'voicebot dla serwisu samochodowego',
    'bot telefoniczny dla warsztatu samochodowego',
    'zapis na przegląd przez telefon',
    'voicebot dla salonu samochodowego cena',
    'AI odbiera telefon w warsztacie',
  ],

  /* POWIĄZANIA (pakiet, sekcja 7 tej podstrony: odbieranie telefonów i cennik;
     plus uwaga wdrożeniowa §7: każda podstrona linkuje w górę do rodzica).
     Karta cennika wejdzie tu, gdy `/uslugi/voiceboty/cennik` trafi do rejestru.
     Etykieta = h1 strony docelowej, opis = fakt, który stoi na tamtej stronie.
     ZERO KWOT w tych opisach (uwaga wdrożeniowa §6 trzyma złotówki wyłącznie
     w sekcji ceny, w kapsule i w meta). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Cała usługa poza jedną branżą: trzy osobne pozycje kosztu zamiast jednego abonamentu, dwa modele utrzymania i rundy poprawek w cenie wdrożenia.',
      },
      {
        etykieta: 'Bot telefoniczny, który odbiera telefon 24/7',
        href: '/uslugi/voiceboty/odbieranie-telefonow',
        opis: 'Sam odbiór połączenia w dowolnej firmie: co dzieje się z nieodebraną sprawą i jakie podsumowanie dostajesz po każdej rozmowie.',
      },
      {
        etykieta: 'Voicebot do potwierdzania wizyt 24/7',
        href: '/uslugi/voiceboty/potwierdzanie-wizyt',
        opis: 'Mechanika terminów w kalendarzu: bot zwalnia termin przy odwołaniu i wysyła potwierdzenie tekstem, bez połączeń wychodzących.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis: 'Nasza robota w motoryzacji: dla Lenart Motors zbudowaliśmy stronę WWW pod widoczność w ChatGPT, a nie voicebota.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
        href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
        opis: 'Od czego zależy cena wdrożenia i jak policzyć zwrot, zanim cokolwiek zamówisz.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis: 'Wpisujesz, ile czasu schodzi na telefony w serwisie, a kalkulator pokazuje, ile złotych rocznie kosztuje ta robota.',
      },
    ],
  },
};
