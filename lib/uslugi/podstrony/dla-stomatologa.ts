import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 4 — GABINET STOMATOLOGICZNY
 * (`/uslugi/voiceboty/dla-stomatologa`).
 * Fraza primary: „voicebot dla dentysty" (pakiet
 * `.seo-przeglad/pakiety/voiceboty.md` §„PODSTRONA 3", treść zatwierdzona
 * przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica i trzech sióstr z tej samej gałęzi):
 *  - RODZIC `/uslugi/voiceboty` sprzedaje CAŁĄ usługę: czym jest voicebot,
 *    trzy osobne pozycje kosztu, rundy poprawek, dwa modele utrzymania.
 *  - SIOSTRA `/uslugi/voiceboty/potwierdzanie-wizyt` sprzedaje JEDNĄ FUNKCJĘ
 *    w dowolnej branży: umówienie, potwierdzenie i odwołanie terminu.
 *  - SIOSTRA `/uslugi/voiceboty/odbieranie-telefonow` sprzedaje samo odbieranie
 *    połączeń i podsumowanie po rozmowie, też w dowolnej branży.
 *  - SIOSTRA `/uslugi/voiceboty/dla-przychodni` to placówka: wiele grafików
 *    i system gabinetowy całej przychodni.
 *  - TA STRONA sprzedaje wyłącznie telefon JEDNEGO gabinetu, gdzie jest jeden
 *    albo dwa fotele i nie ma osobnej recepcji. Stąd jej cztery własne tematy:
 *    zabieg przy fotelu, zapis całej serii wizyt, przesuwanie terminów
 *    i zwolniony termin, który bierze pacjent dzwoniący jako następny.
 *    Kończy się jedną decyzją: rozmawiamy o bocie dla mojego gabinetu.
 *  - NIE MA TU I BYĆ NIE MOŻE: rozbicia ceny na trzy pozycje (rodzic
 *    i `/uslugi/voiceboty/cennik`), mechaniki potwierdzania wizyt opisanej
 *    ogólnie (siostra `potwierdzanie-wizyt`) ani wielu grafików placówki
 *    (siostra `dla-przychodni`). Do wszystkich prowadzi LINK, treść zostaje
 *    na tamtych stronach.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - H1, fraza główna, układ dziesięciu sekcji i rozdział intencji: pakiet
 *    §„PODSTRONA 3",
 *  - kapsuła: pakiet §„PODSTRONA 3" blok „KAPSUŁA (gotowa)", przeniesiona
 *    DOSŁOWNIE, bez skracania i bez przepisywania własnymi słowami,
 *  - zapis serii wizyt, przesuwanie terminu, przyjęcie odwołania, zapowiedź
 *    „jestem asystentem AI", brak pytania o powód wizyty poza scenariuszem:
 *    ta sama kapsuła,
 *  - zwolniony termin bierze kolejny pacjent, KTÓRY DZWONI: pakiet
 *    §„PODSTRONA 3" sekcja 4 (sformułowanie wprost wyklucza obdzwanianie),
 *  - „nie dzwoni sam do pacjentów, obsługuje wyłącznie połączenia
 *    przychodzące": kapsuła pakietu plus kontrakt powtórzony w ośmiu miejscach
 *    kodu (`lib/uslugi/voiceboty.ts` faq #2, podstrony `windykacja`,
 *    `potwierdzanie-wizyt`, `odbieranie-telefonow`),
 *  - cena i czas (2500 zł netto wersja prosta, 5000 do 9000 zł netto
 *    z integracją do kalendarza gabinetu, 3 do 5 dni roboczych dla bota
 *    prostego): kapsuła pakietu, zgodne co do złotówki z `lib/uslugi/voiceboty.ts`
 *    (`ramaCeny`, `minPrice` = 2500),
 *  - dwie rundy poprawek w cenie wdrożenia oraz czas liczony od przekazania
 *    kompletu materiałów: `lib/uslugi/voiceboty.ts` (faq „Ile rund poprawek
 *    jest w cenie wdrożenia?" i sekcja o czasie),
 *  - dane z rozmów w Unii Europejskiej, RODO i AI Act oraz „Ty decydujesz, co bot
 *    nagrywa i przechowuje": `lib/uslugi/voiceboty.ts`
 *    (faq „Czy moje rozmowy i dane będą bezpieczne?"),
 *  - „24/7": wiersz „Telefon po godzinach" z tabeli porównawczej TEJ strony.
 *    Ciąg „24/7" musi w tej komórce zostać, bo bierze go bramka
 *    `ServiceHero.kafleStatystyk` i robi z niego kafel w hero.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  2500 zł netto, 5000 do 9000 zł netto, 3 do 5 dni roboczych, dwie rundy
 *  poprawek, 24/7, jeden albo dwa fotele (fakt z rozdziału intencji pakietu).
 *  Każda NASZA kwota z dopiskiem netto.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ani liczby gabinetów,
 *  które obsługujemy, ani ilu pacjentów dzwoni dziennie, ani ile kosztuje
 *  godzina pracy fotela, ani żadnego odniesienia czasowego w stylu „pół roku
 *  temu". Nie podaje też utrzymania ani zużycia dla tej podstrony (to celowo
 *  zostaje na stronie cennika). Wszystkie zdania są napisane tak, żeby były
 *  prawdziwe bez tych danych.
 *
 * ZAKAZANE NA TEJ STRONIE: jakakolwiek sugestia, że bot dzwoni sam, obdzwania
 * pacjentów albo listę oczekujących (kontrakt z ośmiu miejsc kodu; podstrona
 * o oddzwanianiu do leadów została z pakietu wycięta w całości właśnie z tego
 * powodu); fraza „wirtualna recepcjonistka" w każdej odmianie; obietnica
 * pomiaru, audytu, raportu albo listy rzeczy do zrobienia na bezpłatnej
 * rozmowie (ustalenie właściciela z 2026-08-31: bezpłatna rozmowa to WYŁĄCZNIE
 * badanie potrzeb); porady zdrowotne bota; ceny konkurencji.
 *
 * GDZIE WOLNO POSTAWIĆ KWOTĘ: kapsuła, metaTitle, metaDescription, sekcja
 * `ramaCeny` z jej blokami i FAQ. NIGDZIE INDZIEJ, w szczególności nie
 * w kartach „Powiązane" ani w `cta` (uwaga wdrożeniowa pakietu GEO §6,
 * trzymana w całym repo).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „voiceboty" po rodzicu
 * (uwaga wdrożeniowa pakietu §5: żadnego nowego koloru dla podstron
 * branżowych), a renderuje się TYMI SAMYMI komponentami co strony usług
 * i pozostałe podstrony. Zero nowych typów bloków, zero nowego CSS.
 *
 * DLA INTEGRATORA (poza zakresem tego pliku): linki `/uslugi/voiceboty/cennik`
 * i `/uslugi/voiceboty/dla-przychodni` prowadzą do dwóch sióstr z tego samego
 * pakietu. Obie muszą być w rejestrze `lib/uslugi/podstrony/index.ts` razem
 * z tą stroną, inaczej dwa linki wewnętrzne zwrócą 404.
 */
export const dlaStomatologa: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'dla-stomatologa',
  dataAktualizacji: '2026-09-22',

  h1: 'Voicebot dla gabinetu stomatologicznego',

  /* KAPSUŁA. Treść z pakietu §„PODSTRONA 3", ŚCIŚNIĘTA 2026-09-22 z 82 słów do
     przedziału z kontraktu `Usluga.kapsula` (lib/uslugi/types.ts: 40-60 słów).
     Kapsuła jest blokiem, który modele cytują jako całą odpowiedź, więc ma być gęsta.
     ANI JEDNA LICZBA NIE WYPADŁA: oba progi stworzenia i czas 3 do 5 dni roboczych
     stoją dalej, tak samo zapowiedź AI, granica pytań ze scenariusza i zakaz dzwonienia.
     Czas jest teraz przypisany wprost do progu, którego dotyczy. */
  kapsula:
    'Voicebot dla gabinetu stomatologicznego odbiera telefon, gdy rejestracja stoi przy fotelu. Zapisuje pacjenta, przesuwa termin, przyjmuje odwołanie, a przy leczeniu etapami spisuje całą serię wizyt. Mówi, że jest asystentem AI, i nie pyta o nic spoza scenariusza. Nie dzwoni sam. Stworzenie: 2500 zł netto (3 do 5 dni roboczych) albo 5000 do 9000 zł netto z integracją do kalendarza gabinetu.',

  /* metaTitle: pakiet dawał 32 znaki, konwencja repo (lib/uslugi/types.ts)
     mówi 50-60 i to ona wygrywa (decyzja właściciela z 2026-08-31, ta sama co
     przy `audyt-widocznosci-w-ai`). Fraza główna „voicebot dla dentysty"
     stoi NA POCZĄTKU, a wyróżnik to zakres tej strony (telefon jednego
     gabinetu) plus kwota wejściowa z kapsuły. Długość 56 znaków; layout
     dokleja sufiks marki.
     KONTROLA 2026-09-22: poprzednia wersja brzmiała „seria wizyt, od 2500 zł
     netto" i sklejała w jednym oddechu funkcję z progiem, który jej NIE
     zawiera. Zapis serii wizyt wymaga integracji do kalendarza, czyli progu
     5000 do 9000 zł netto (mówi to wprost sekcja `ramaCeny` niżej), więc
     tytuł obiecywał w SERP funkcję za cenę, za którą jej nie ma. „Telefon
     gabinetu" jest prawdziwe w obu progach. */
  metaTitle: 'Voicebot dla dentysty: telefon gabinetu od 2500 zł netto',
  /* KONTROLA KANIBALIZACJI 2026-09-22: było „gdy rejestracja stoi przy fotelu".
     Słowo „rejestracja" (cały front desk) należy do siostrzanej
     `dla-przychodni`; tutaj obowiązuje „rejestratorka", czyli JEDNA osoba przy
     jednym fotelu, dokładnie jak w zatwierdzonej kapsule wyżej. Podział
     słownictwa jest teraz trzymany w całym pliku. Długość 155 znaków
     (przeliczone na łańcuchu z tego pliku, kontrakt `Usluga`: 140-160). */
  metaDescription:
    'Voicebot dla dentysty odbiera telefon, gdy rejestratorka stoi przy fotelu. Zapisuje pacjenta, przesuwa termin i spisuje całą serię wizyt. Od 2500 zł netto.',

  problem: {
    /* H2 nie jest podany w pakiecie (pakiet daje tylko tytuł sekcji, który
       stoi niżej jako blok `naglowek`), więc to decyzja redakcyjna.
       KONTROLA 2026-09-22: poprzednie brzmienie „Ile kosztuje pusty fotel,
       gdy nikt nie odebrał telefonu?" miało dwie wady naraz. Po pierwsze
       stawiało na stronie DRUGIE pytanie „Ile kosztuje...", obok
       `ramaCeny.h2`, i modele wyciągały nie ten fragment co trzeba. Po drugie
       strona nie odpowiada na nie ANI JEDNĄ LICZBĄ i odpowiedzieć nie może:
       pakiet nie podaje kosztu godziny pracy fotela. To pytanie odpowiedzi
       nie ma i mieć nie będzie. Nowe brzmienie odpowiada `tresc` pod spodem
       i pokrywa zapytanie z `queries`. */
    /* KONTROLA KANIBALIZACJI 2026-09-22: brzmiało „Kto odbiera telefon, gdy
       rejestracja stoi przy fotelu?", czyli ten sam szkielet pytania co H2
       problemu na siostrzanej `dla-salonu-samochodowego` („Kto odbiera telefon,
       gdy mechanik ma ręce w silniku?") z podmienioną końcówką. Tamto pytanie
       pochodzi z pakietu (§PODSTRONA 4 sekcja 1), więc zostaje tam, a TA strona
       dostaje własne pytanie: wybór, który realnie robi gabinet z jednym
       fotelem. Fraza „kto odbiera telefon" nie znika ze strony, stoi w `tresc`
       pod spodem i w `queries`. */
    h2: 'Zabieg przy fotelu czy pacjent w słuchawce: co wybiera gabinet?',
    tresc:
      'Telefon odbiera ten, kto akurat nie stoi przy fotelu, a przy jednej rejestratorce takiej osoby zwykle nie ma. Dzwoniący nie czeka, tylko wybiera numer gabinetu obok, a po odwołanej wizycie zostaje godzina, której nie ma komu sprzedać.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Pusty fotel kosztuje więcej niż nieodebrany telefon',
        ikona: 'lupa-wykres',
        chip: 'GABINET',
        overline: 'JEDEN ALBO DWA FOTELE · ZERO ZAPASU W GRAFIKU',
      },
      {
        typ: 'akapit',
        tekst:
          'Nieodebrany telefon to jeden pacjent, który nie wszedł. Pusta godzina w fotelu to ten sam pacjent plus cały zespół, który tego dnia i tak jest w gabinecie. Dlatego odwołanie boli tu bardziej niż sygnał w słuchawce.',
      },
      {
        typ: 'lista',
        punkty: [
          'Rejestratorka stoi przy fotelu i podaje narzędzia. Telefon dzwoni w trakcie zabiegu, a wolnych rąk nie ma.',
          /* KONTROLA KANIBALIZACJI 2026-09-22: punkt zaczynał się od „Pacjent
             odwołuje jutrzejszą wizytę wieczorem", czyli siedmioma słowami
             identycznymi jak karta „Odwołanie po zamknięciu" na siostrzanej
             `dla-przychodni`. Fakt ten sam, przykład własny: konkretny zabieg
             i fotel zamiast godziny w grafiku placówki. */
          'Wieczorem dzwoni ktoś, kto nie dojedzie jutro na leczenie kanałowe. Zanim ktokolwiek odsłucha tę wiadomość, w grafiku fotela stoi już zabieg, którego nie będzie.',
          'Leczenie idzie etapami, więc jeden pacjent to kilka terminów. Umawianie ich po jednym oznacza kolejny telefon po każdym etapie, zawsze w przerwie między zabiegami.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Gabinet z jednym fotelem nie ma z czego nadrobić',
        wariant: 'edge',
        chip: 'GABINET',
        akapity: [
          'W placówce z wieloma grafikami pacjenta da się przesunąć do innego lekarza. Przy jednym albo dwóch fotelach takiego zapasu nie ma: wolna godzina zostaje wolna do końca dnia.',
          'Do tego telefon i fotel obsługuje często ta sama osoba. Każde połączenie odbierane w trakcie zabiegu jest wyborem między pacjentem w fotelu a pacjentem w słuchawce.',
        ],
      },
    ],
  },

  rozwiazanie: {
    /* KONTROLA KANIBALIZACJI 2026-09-22: brzmiało „Co voicebot załatwia za
       rejestrację gabinetu?" wobec „Co voicebot załatwia w rejestracji
       przychodni?" na siostrzanej `dla-przychodni`. Ten sam czasownik, ten sam
       rzeczownik, zmieniona jedna końcówka. Tamto H2 zostaje (placówka to
       naprawdę rejestracja), a tutaj nagłówek nazywa trzy funkcje, które są
       osią TEJ strony i których siostra nie sprzedaje. */
    h2: 'Seria wizyt, przesunięcie i odwołanie: jak bot to zapisuje?',
    tresc:
      'Odbiera telefon, gdy przy fotelu trwa zabieg. Zapisuje pacjenta, przesuwa termin i przyjmuje odwołanie, a gdy leczenie idzie etapami, spisuje całą serię wizyt w jednej rozmowie.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Zapis całej serii wizyt i przesuwanie terminów',
        ikona: 'kalendarz-check',
        chip: 'VOICEBOTY',
        overline: 'SERIA WIZYT · PRZESUNIĘCIE · ODWOŁANIE',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Cała seria wizyt w jednej rozmowie',
            akapity: [
              'Gdy leczenie idzie etapami, pacjent nie musi dzwonić po każdy kolejny termin. Bot spisuje całą serię od razu, w tej samej rozmowie, w której zapisał pierwszą wizytę.',
            ],
            punkty: [
              'Odstępy między wizytami w serii ustawiasz wcześniej, w scenariuszu rozmowy.',
              'Pacjent kończy rozmowę z kompletem terminów, nie z jednym.',
              'Rejestratorka przestaje umawiać kolejne etapy między zabiegami.',
            ],
          },
          {
            naglowek: 'Przesunięcie i odwołanie w tej samej rozmowie',
            akapity: [
              'Pacjent, który chce przełożyć wizytę, dostaje wolne godziny od razu. Bot zapisuje nowy termin i zwalnia stary, więc w grafiku gabinetu nie zostaje zablokowana godzina bez pacjenta.',
            ],
            punkty: [
              'Odwołanie przyjęte po zamknięciu gabinetu nie czeka na poranek.',
              'Nowy termin stoi w grafiku, zanim pacjent odłoży słuchawkę.',
              'Nikt nie przepisuje terminów ręcznie z kartki przy telefonie.',
            ],
          },
          {
            naglowek: 'Zwolniony termin bierze pacjent, który dzwoni',
            akapity: [
              'Bot nie obdzwania listy oczekujących i nie dzwoni z propozycją wolnej godziny. Zwolniony termin po prostu stoi otwarty i bierze go pierwszy pacjent, który zadzwoni, także po zamknięciu gabinetu.',
            ],
            punkty: [
              'Godzina wraca do puli w chwili przyjęcia odwołania.',
              'Pacjent dzwoniący wieczorem dostaje ten sam wolny termin, co rejestratorka rano.',
              'Zgłoszenie na wolny termin bot zapisuje tak samo jak każdy inny zapis.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Prywatność pacjenta: co bot zapisuje, a o co nie pyta',
        wariant: 'edge',
        chip: 'ZASADA',
        akapity: [
          'Bot mówi w pierwszym zdaniu, że jest asystentem AI, i nie pyta o powód wizyty poza tym, co ustalisz w scenariuszu. Rozmowa o bólu, objawach i leczeniu nie jest jego rolą.',
          /* KONTROLA KANIBALIZACJI 2026-09-22: akapit zaczynał się zdaniem
             „Zakres tego, co z rozmowy zostaje zapisane, ustalasz przy
             wdrożeniu", które stoi też na `dla-przychodni` (tam 1:1 z pakietu)
             i na `dla-kancelarii` (tam 1:1 z kapsuły). Tamte dwa są treścią
             zatwierdzoną i zostają nietknięte, więc ustępuje ta strona: ten sam
             fakt, zdanie napisane od nowa i zakończone grafikiem gabinetu. */
          'Co ma zostać z rozmowy, decydujesz przy wdrożeniu: bot notuje tyle, ile trzeba, żeby wizyta weszła do grafiku gabinetu, i nic ponadto.',
        ],
        punkty: [
          'Voicebot nie dzwoni sam do pacjentów, obsługuje wyłącznie połączenia przychodzące.',
          'To, czego nie ma w scenariuszu, ląduje u rejestratorki jako spisane zgłoszenie z godziną telefonu.',
          'Nagrywanie i zakres notatki włączasz albo wyłączasz Ty, jeszcze przed startem bota.',
        ],
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: `cecha` ok. 12 znaków, kolumny
     ok. 30), żeby wiersze nie łamały się na dwie linie na wąskich ekranach.
     WIERSZ 1 MUSI zawierać „24/7" w kolumnie `zNami`: to bramka kafla
     statystyk w hero (`ServiceHero.kafleStatystyk`), a etykietą kafla jest
     `cecha` tego wiersza. */
  tabelaPorownawcza: {
    h2: 'Telefon w gabinecie ręcznie a z voicebotem',
    naglowekBez: 'Rejestratorka przy fotelu',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Telefon po godzinach',
        bez: 'Poczta głosowa do rana',
        zNami: 'Odbiera 24/7, też w weekend',
      },
      {
        cecha: 'W trakcie zabiegu',
        bez: 'Dzwoni i rozprasza zespół',
        zNami: 'Bot odbiera, zespół pracuje',
      },
      {
        cecha: 'Seria wizyt',
        bez: 'Umawiana po jednym terminie',
        zNami: 'Spisana w jednej rozmowie',
      },
      {
        cecha: 'Przesunięcie',
        bez: 'Ustalane przy kolejnym telefonie',
        zNami: 'Nowy termin od razu w rozmowie',
      },
      /* KONTROLA 2026-09-22: ten wiersz brzmiał `bez: 'Odsłuchane dopiero
         rano'` i `zNami: 'Termin zwolniony od razu'`, czyli kolumna „bez" była
         ZNAK W ZNAK taka sama jak wiersz „Odwołanie" na siostrzanej
         `dla-przychodni`, a kolumna „z nami" różniła się jednym słowem
         („Godzina zwolniona od razu"). Dwie podstrony tego samego rodzica,
         ta sama pozycja w tabeli, ten sam string: to kanibalizacja, nie
         konwencja. Przepisane na język tej strony (fotel), fakt bez zmian. */
      {
        cecha: 'Odwołanie',
        bez: 'Fotel stoi pusty do rana',
        zNami: 'Godzina wraca do grafiku od razu',
      },
      {
        cecha: 'Zakres pytań',
        bez: 'Zależy, kto akurat odbierze',
        zNami: 'Tylko to, co w scenariuszu',
      },
    ],
  },

  kroki: {
    h2: 'Jak wdrażamy voicebota w gabinecie?',
    items: [
      /* KONTROLA KANIBALIZACJI 2026-09-22: krok otwierał się zdaniem
         „Obejrzymy, jak dziś działa telefon w gabinecie...", czyli szkieletem
         „Obejrzymy, jak dziś działa telefon w [rzeczownik], i ustalimy zakres"
         wziętym z `dla-przychodni` (tam „w rejestracji"). Ten sam szkielet
         chodził na tej stronie dwa razy, w kroku 1 i w `cta.mikrokopia`. Obietnica
         bez zmian (badanie potrzeb: pytamy i ustalamy, zero pomiaru i raportu),
         czasowniki i przedmiot rozmowy własne dla gabinetu. */
      {
        tytul: 'Bezpłatna rozmowa',
        opis:
          'Pytamy, kiedy telefon dzwoni w trakcie zabiegu i z czym najczęściej dzwonią pacjenci. Ustalamy, co bot ma załatwiać sam, a co zostaje przy rejestratorce.',
      },
      /* KONTROLA 2026-09-22: krok brzmiał „Podłączamy numer i kalendarz",
         czyli obiecywał integrację z kalendarzem w KAŻDYM wdrożeniu. Sekcja
         `ramaCeny` na tej samej stronie mówi coś innego: kalendarz widzi
         dopiero wersja z integracją (5000 do 9000 zł netto), a wersja prosta
         za 2500 zł netto spisuje zgłoszenie dla rejestracji. Dopisany warunek
         zdejmuje sprzeczność wewnątrz jednej strony, nie dokładając faktu. */
      /* DRUGA KONTROLA 2026-09-22 (kanibalizacja): zdanie „Podłączamy numer,
         a przy wersji z integracją także kalendarz gabinetu" było kopią kroku 2
         z `dla-salonu-samochodowego` („...także grafik warsztatu") z jednym
         podmienionym rzeczownikiem, a „Testujemy na żywo, zanim bot odbierze
         pierwszego pacjenta" kopią zdania z `dla-przychodni` („...pierwsze
         połączenie do rejestracji"). Warunek cenowy z poprzedniej kontroli
         ZOSTAJE (kalendarz dopiero w wersji z integracją, bo wersja prosta za
         2500 zł netto grafiku nie dotyka), zmienia się tylko brzmienie. */
      {
        tytul: 'Scenariusz gabinetu i długości zabiegów',
        opis:
          'Ustawiamy długości zabiegów, odstępy między wizytami w serii i granice rozmowy, a numer gabinetu przepinamy na bota. Kalendarz bot widzi dopiero w wersji z integracją. Zanim odbierze pierwszego pacjenta, przechodzimy z Tobą rozmowę próbną.',
      },
      {
        tytul: 'Pierwsze dni przy telefonie',
        opis:
          'Słuchamy pierwszych rozmów z pacjentami i poprawiamy to, co brzmi nie tak. Dwie rundy poprawek są w cenie wdrożenia.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot dla gabinetu stomatologicznego?',
    /* Widełki i czas 1:1 z kapsuły pakietu. Cennika tu NIE rozwijamy
       (rozdział intencji: utrzymanie, zużycie i stawka godzinowa należą do
       `/uslugi/voiceboty/cennik` i do rodzica), stąd zamiast tabeli kosztów
       jest jedno zdanie i link niżej. */
    tresc:
      'Stworzenie voicebota dla gabinetu to 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto za wersję z integracją do kalendarza gabinetu. Bot prosty powstaje w 3 do 5 dni roboczych, licząc od przekazania kompletu materiałów.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '2500 zł netto',
            opis: 'wersja prosta, płatne raz przy wdrożeniu',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '5000 do 9000 zł netto',
            opis: 'wersja z integracją do kalendarza gabinetu',
            zrodlo: 'kapsuła na górze strony',
            ton: 'violet',
          },
          {
            wartosc: '3 do 5 dni roboczych',
            opis: 'tyle powstaje bot prosty, od przekazania kompletu materiałów',
            zrodlo: 'zdanie nad tym pasem',
            ton: 'green',
          },
        ],
      },
      /* KONTROLA 2026-09-22: nagłówek brzmiał „Od czego zależy, w którym progu
         wyląduje Twój gabinet?", czyli był kopią nagłówka z siostrzanej
         `dla-przychodni` („...wyląduje Twoja placówka?") z podmienionym jednym
         rzeczownikiem. Ten sam blok, ta sama sekcja, ten sam rodzic. Nowy
         nagłówek pyta o to, co ta sekcja naprawdę rozstrzyga na TEJ stronie.
         Pierwszy punkt listy był z kolei bliski zdaniu o wersji prostej
         z tamtej podstrony, więc też jest przepisany na fotel i grafik. */
      {
        typ: 'sekcja',
        naglowek: 'Kiedy gabinet potrzebuje wersji z integracją do kalendarza?',
        wariant: 'top',
        chip: 'CENNIK',
        akapity: [
          'O progu decyduje jedno pytanie: czy bot ma tylko rozmawiać, czy także widzieć Twój kalendarz i zapisywać w nim wizyty. Zapis serii wizyt i zwalnianie terminów wymaga tego drugiego.',
        ],
        punkty: [
          /* KONTROLA KANIBALIZACJI 2026-09-22: punkt kończył się na „w grafiku
             gabinetu nic nie zapisuje", czyli powtarzał „Grafiku nie dotyka"
             z progu 1 siostrzanej `dla-przychodni`. Ta sama granica progu,
             powiedziana od strony gabinetu: kto wtedy dopisuje termin. */
          'Wersja prosta: bot rozmawia według scenariusza, a termin dopisuje do grafiku rejestratorka.',
          'Wersja z integracją: bot widzi wolne godziny, zapisuje wizytę i zwalnia odwołany termin.',
          'Zakres scenariuszy i liczba integracji przesuwają wycenę w obrębie widełek.',
        ],
      },
    ],
    minPrice: 2500,
    /* Ceny voicebotów są WIDEŁKAMI (2500 zł netto wersja prosta, 5000 do
       9000 zł netto z integracjami), więc `cenaStala` celowo NIE jest
       ustawione: kafel ceny w hero ma pokazać „od 2500 zł", a mikrokopia pod
       kartą ceny ma mówić o wycenie, nie o cenie stałej. */
    linkPoradnik: {
      przed: 'Utrzymanie, zużycie i pełne widełki wszystkich wersji rozpisaliśmy w ',
      etykieta: 'cenniku voicebotów',
      po: '.',
      href: '/uslugi/voiceboty/cennik',
    },
  },

  faq: [
    {
      pytanie: 'Czy voicebot dzwoni sam do pacjentów przed wizytą?',
      odpowiedz:
        'Nie. Nasz voicebot obsługuje wyłącznie połączenia przychodzące. Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy. Jeśli chcesz przypominać pacjentom o terminie, robi to wiadomość tekstowa, a nie bot dzwoniący z numeru gabinetu.',
    },
    {
      pytanie: 'Czy bot zapisze całą serię wizyt, gdy leczenie idzie etapami?',
      odpowiedz:
        'Tak. Bot spisuje całą serię w jednej rozmowie, a odstępy między wizytami ustawiasz wcześniej w scenariuszu. Pacjent kończy rozmowę z kompletem terminów, więc nie dzwoni po każdy kolejny etap osobno.',
    },
    /* KONTROLA 2026-09-22: odpowiedź brzmiała „...niczego nie ocenia. Ustala,
       że sprawa jest pilna...". Te dwa zdania stały obok siebie i przeczyły
       sobie: uznanie sprawy za pilną TO JEST ocena, i to ocena zdrowotna,
       czyli dokładnie to, czego bot na tej stronie robić nie może. Siostrzana
       `dla-przychodni` ma tu bezpieczną wersję („Ustala, że sprawa dotyczy
       wyników" — temat, nie waga). Tu pilność deklaruje pacjent, a bot tylko
       wykonuje scenariusz. Fakt ten sam, ocena zdjęta z bota. */
    {
      pytanie: 'Co bot robi, gdy pacjent dzwoni z bólem?',
      /* DOMKNIĘCIE 2026-09-22: poprzednia poprawka zdjęła z bota ocenę pilności,
         ale zostawiła „przekazuje rozmowę rejestracji", czyli przełączenie
         połączenia, którego reszta tej strony nie obiecuje (sekcja „Prywatność
         pacjenta" mówi o SPISANYM zgłoszeniu). Teraz wprost: pilność deklaruje
         pacjent, bot powtarza jego słowa dalej i nie dokłada od siebie żadnej
         oceny. Żadnej nowej obietnicy, o jedną mniej. */
      odpowiedz:
        'Nie rozmawia o objawach i niczego nie ocenia. Gdy pacjent sam mówi, że sprawa jest pilna, bot robi to, co wpiszesz w scenariuszu: proponuje godzinę, którą trzymasz wolną na takie zgłoszenia, albo spisuje zgłoszenie dla rejestratorki, słowami pacjenta.',
    },
    {
      pytanie: 'Co zostaje zapisane z rozmowy z pacjentem?',
      odpowiedz:
        'Tyle, ile trzeba, żeby wizyta trafiła do kalendarza, i nic ponadto. Zakres ustalasz przy wdrożeniu, a bot nie pyta o powód wizyty poza tym, co stoi w scenariuszu. Dane z rozmów zostają w Unii Europejskiej, zgodnie z RODO oraz AI Act.',
    },
    {
      pytanie: 'Co się dzieje z terminem, który pacjent odwołał wieczorem?',
      odpowiedz:
        'Godzina jest znowu wolna jeszcze w trakcie tej rozmowy, bez czekania na poranny przegląd zgłoszeń. Bot nikogo z tym terminem nie obdzwania: bierze go pacjent, który zadzwoni jako następny, także po zamknięciu gabinetu.',
    },
    {
      pytanie: 'Ile kosztuje voicebot dla gabinetu stomatologicznego?',
      odpowiedz:
        'Stworzenie bota to 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto za wersję z integracją do kalendarza gabinetu. Bot prosty powstaje w 3 do 5 dni roboczych. Utrzymanie i zużycie rozpisaliśmy osobno, w cenniku voicebotów.',
    },
  ],

  /* Jedna decyzja domykająca stronę. Mikrokopia mówi DOKŁADNIE, czym jest
     bezpłatna rozmowa (ustalenie właściciela z 2026-08-31: badanie potrzeb,
     bez obietnicy pomiaru, audytu ani raportu). Zero kwot w tej sekcji. */
  cta: {
    label: 'Porozmawiajmy o moim gabinecie',
    href: '#diagnoza',
    mikrokopia:
      'Pytamy, kiedy telefon w gabinecie zostaje bez odbioru, i ustalamy, co bot ma załatwiać sam. Bez zobowiązań.',
    dowod:
      'Bezpłatna rozmowa to badanie potrzeb, nie prezentacja sprzedażowa. Jeśli voicebot nie ma u Ciebie sensu, powiemy to wprost.',
  },

  queries: [
    'voicebot dla dentysty',
    'voicebot dla gabinetu stomatologicznego',
    'bot telefoniczny dla stomatologa',
    'zapisywanie pacjentów przez telefon w gabinecie',
    'odwoływanie wizyt u dentysty przez telefon',
    'kto odbiera telefon w gabinecie stomatologicznym',
  ],

  /* POWIĄZANE (pakiet §„PODSTRONA 3" sekcja 8 plus uwaga wdrożeniowa §7:
     każda nowa podstrona linkuje w górę do `/uslugi/voiceboty` i w bok do
     `/uslugi/voiceboty/cennik`; link do cennika trzyma `ramaCeny.linkPoradnik`
     wyżej). Etykieta = H1 strony docelowej, opis = fakt, który stoi na tamtej
     stronie. Ani jednej kwoty w tej sekcji. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Cała usługa: co voicebot załatwia sam, gdzie kończy się bot i zaczyna człowiek oraz z czego składa się rachunek.',
      },
      {
        etykieta: 'Voicebot dla przychodni, który zawsze odbiera telefon',
        href: '/uslugi/voiceboty/dla-przychodni',
        opis: 'Wersja dla placówki z wieloma lekarzami i grafikami: poranna kolejka na linii, integracja z systemem gabinetowym i przekazywanie spraw rejestracji.',
      },
      {
        etykieta: 'Voicebot do potwierdzania wizyt 24/7',
        href: '/uslugi/voiceboty/potwierdzanie-wizyt',
        opis: 'Ta sama funkcja opisana dla dowolnej branży: umówienie terminu, potwierdzenie tekstem i obsługa odwołań.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis: 'Policz, ile kosztuje Cię rocznie telefon obsługiwany w przerwach między zabiegami.',
      },
    ],
  },
};
