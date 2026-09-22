import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA VOICEBOTÓW 4 — DLA PRZYCHODNI
 * (`/uslugi/voiceboty/dla-przychodni`).
 * Fraza primary: „voicebot dla przychodni" (pakiet
 * `.seo-przeglad/pakiety/voiceboty.md`, PODSTRONA 2, treść zatwierdzona
 * przed wdrożeniem).
 *
 * DLACZEGO TA PODSTRONA (dane GSC): fraza „usługa odbierania telefonów dla
 * gabinetu" ma 15 wyświetleń na pozycji 7,7, czyli realny ruch tuż pod
 * pierwszą trójką. To dowód, że placówki medyczne szukają u nas odbierania
 * telefonu, a nie że szukają akurat przychodni: dziś całe to zapytanie trafia
 * na `/uslugi/voiceboty`, czyli na stronę odpowiadającą na kilkanaście
 * intencji naraz.
 *
 * ROZSTRZYGNIĘCIE WŁAŚCICIELA FRAZY (2026-09-22): fraza „usługa odbierania
 * telefonów dla gabinetu" ZOSTAJE u siostry `odbieranie-telefonow.ts`
 * i z tej listy ZNIKA. Powód jest w treści obu stron, nie w rankingu:
 *  - gabinet to jeden podmiot, jeden numer i rejestracja przy fotelu, a TA
 *    strona sama się od takiego podmiotu odcina: sekcja „Czym to się różni
 *    od pojedynczego gabinetu?" w `problem.bloki` mówi wprost, że jeden
 *    gabinet ma jeden fotel i jeden grafik, a przychodnia rejestrację, kilku
 *    lekarzy i kilka poradni. Strona, która dwoma akapitami tłumaczy, czym
 *    NIE jest gabinet, nie może być najlepszą odpowiedzią na „dla gabinetu",
 *  - `odbieranie-telefonow.ts` niesie cały człon główny zapytania („usługa
 *    odbierania telefonów") w H1, w H2 problemu i w H2 ceny, a w sekcji
 *    „Połowa tych rozmów to w kółko te same pytania" mówi wprost o gabinecie
 *    i o rejestracji pacjentów, bez grafiku i bez wielu lekarzy.
 * W zamian ta strona dostaje frazę węższą, którą wygrywa sama:
 * „odbieranie telefonów w rejestracji przychodni". Człon „przychodni" nie
 * pada u siostry ani razu, więc dwa adresy przestają celować w jedno zapytanie.
 *
 * ROZDZIAŁ INTENCJI (żelazna granica, chroni przed kanibalizacją):
 *  - RODZIC `/uslugi/voiceboty` sprzedaje CAŁĄ usługę: czym jest voicebot,
 *    trzy pozycje kosztu, wdrożenie, RODO. Tam nie ma ani jednej branży.
 *  - TA STRONA: cała rejestracja JEDNEJ branży, czyli placówki z wieloma
 *    lekarzami i wieloma grafikami (POZ, specjalistyka). Punkt ciężkości to
 *    szczyt poranny, wybór właściwego grafiku i granica przy sprawie medycznej.
 *  - `/uslugi/voiceboty/potwierdzanie-wizyt`: JEDNA funkcja (umawianie
 *    i potwierdzanie terminu) w dowolnej branży. Tu funkcji jest więcej,
 *    a branża jedna.
 *  - `/uslugi/voiceboty/odbieranie-telefonow`: sam odbiór połączenia i to, co
 *    dzieje się z nieodebraną sprawą, bez grafiku i bez branży.
 *  - `/uslugi/voiceboty/dla-stomatologa` (pakiet, jeszcze nie w rejestrze):
 *    jeden gabinet, jeden fotel, jeden grafik. Różnicę nazywa wprost sekcja
 *    „Czym to się różni od pojedynczego gabinetu?" w `problem.bloki`.
 *
 * PRZYCIĘCIE 2026-09-22 (objętość): strona była najdłuższa z dziewięciu podstron
 * voicebotów. Pomiar na żywej stronie dał 1977 słów w <main> przy celu 1300-1600
 * z raportu SEO `.seo-przeglad/raporty/2026-09-05.md`, czyli 377 słów ponad.
 * Zeszło 17 fragmentów, każdy opisany komentarzem w miejscu, w którym stał.
 * ŻADNA LICZBA NIE ZNIKNĘŁA ZE STRONY. Wycinane było wyłącznie DRUGIE (trzecie,
 * czwarte) wystąpienie faktu, który na tej samej stronie stoi dalej w kapsule,
 * FAQ, przełączniku progów, tabeli kosztów albo tabeli porównawczej. Gdy dwa
 * bliźniacze zdania stały obok siebie, ZAWSZE ustępowało to SPOZA pakietu:
 * treść zatwierdzona i pola idące do JSON-LD (kapsuła, cztery pierwsze pytania
 * FAQ) zostały nietknięte.
 * DWA CIĘCIA SĄ JEDNOCZEŚNIE ROZDZIAŁEM INTENCJI, nie samą objętością:
 *  - karta „Okienko kontra słuchawka" i karta „Odwołanie po zamknięciu"
 *    w `problem.bloki` mówiły językiem JEDNEGO gabinetu (wybór „pacjent przy
 *    ladzie czy pacjent w słuchawce" to oś siostrzanej `dla-stomatologa`),
 *  - wiersz „Ślad po rozmowie" w tabeli porównawczej sprzedawał podsumowanie
 *    po rozmowie, czyli towar siostrzanej `odbieranie-telefonow`.
 * NIE RUSZAMY SIOSTRY `odbieranie-telefonow.ts`, choć ona też jest nad celem:
 * to najlepsza strona serwisu w GSC i przycinanie zwycięzcy byłoby błędem.
 *
 * ŹRÓDŁA KAŻDEJ LICZBY (nic spoza tej listy):
 *  - 24/7, odbiór kilku połączeń naraz („tyle ile linii masz u dostawcy
 *    telefonii"), kolejka o 8:00, zapowiedź „jestem asystentem AI",
 *    2500 zł netto, 5000 do 9000 zł netto, 299 do 1500 zł netto miesięcznie,
 *    0 zł przy przekazaniu infrastruktury: KAPSUŁA z pakietu, przeniesiona
 *    DOSŁOWNIE (treść zatwierdzona, nie wolno jej przepisywać),
 *  - komplet 4 pytań FAQ (system gabinetowy, wyniki i objawy, pacjent
 *    obcojęzyczny, awaria internetu): pakiet, przeniesione DOSŁOWNIE,
 *  - 3 do 5 dni roboczych (bot prosty) i 5 do 25 dni roboczych (bot
 *    z integracjami), 350 zł netto za godzinę po przekazaniu infrastruktury,
 *    dwie rundy poprawek w cenie, dane w Unii Europejskiej plus RODO, AI Act
 *    i umowa powierzenia: `lib/uslugi/voiceboty.ts` (strona rodzica),
 *  - zużycie rozbite na minuty rozmów u dostawcy telefonii i tokeny modelu:
 *    pakiet, sekcja cennika voicebotów.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  24/7, 8:00, 2500 zł netto, 5000 do 9000 zł netto, 299 do 1500 zł netto,
 *  0 zł, 350 zł netto za godzinę, 3 do 5 dni roboczych, 5 do 25 dni roboczych,
 *  dwie rundy poprawek. Każda nasza kwota zawsze z dopiskiem netto;
 *  przy „0 zł" netto NIE dopisujemy.
 *  Po przycięciu z 2026-09-22 zlepek „3 do 25 dni roboczych" NIE stoi już nigdzie:
 *  zniknął razem z `pasMetryk`, a każdy próg podaje własny czas i tylko swój.
 *
 * BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje ANI JEDNEJ liczby
 * o przychodniach (ile połączeń dziennie, ilu lekarzy, jaki procent
 * nieodebranych, ile wizyt przepada, ile trwa rozmowa o zapis). Dlatego cała
 * sekcja `problem` jest napisana bez liczby: opisuje mechanizm, nie statystykę.
 * Pakiet nie podaje też nazw systemów gabinetowych, więc strona mówi o nich
 * rodzajowo („system gabinetowy") i nigdy z nazwy.
 *
 * ZAKAZANE NA TEJ STRONIE: fraza „wirtualna recepcjonistka" w każdej odmianie;
 * jakakolwiek obietnica połączenia wychodzącego (kontrakt powtórzony w ośmiu
 * miejscach kodu: bot NIGDY nie dzwoni sam, wolno o tym pisać wyłącznie
 * w zaprzeczeniu). Na tej stronie zaprzeczenie stoi w TRZECH miejscach: kapsuła,
 * sekcja „Bot nie dzwoni do pacjentów" i punkt w dyskwalifikacji. Czwarte
 * (punkt w progu 2) zeszło przy przycięciu z 2026-09-22 dokładnie tam, gdzie ten
 * komentarz je wskazywał; strona trzyma teraz tyle zaprzeczeń, co siostry po v20,
 * i ani jednego mniej. Dalej: obietnica pomiaru,
 * audytu ani raportu na bezpłatnej rozmowie (ustalenie właściciela
 * z 2026-08-31: bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb); porady
 * medyczne i jakiekolwiek zdanie o zdrowiu pacjenta.
 *
 * KOLOR I FORMA: podstrona dziedziczy ton kategorii „voiceboty" po rodzicu
 * (uwaga wdrożeniowa pakietu §5: żadnego nowego koloru dla podstron
 * branżowych) i renderuje się tymi samymi komponentami co pozostałe strony
 * usług. Zero nowych typów bloków, zero nowego CSS.
 *
 * LINKI: w górę do `/uslugi/voiceboty` (przez `ramaCeny.linkPoradnik`), w bok
 * do dwóch istniejących sióstr. Pakiet każe linkować też do
 * `/uslugi/voiceboty/cennik` i `/uslugi/voiceboty/rodo-ai-act`, ale ŻADNA
 * z tych tras nie istnieje jeszcze w rejestrze, a martwy link wewnętrzny łamie
 * kryterium odbioru. Integrator dokłada oba linki w rundzie, w której te
 * podstrony wejdą do `lib/uslugi/podstrony/index.ts`.
 *
 * NACZYNIA POŁĄCZONE (kontrola 2026-09-22, do zrobienia poza tym plikiem,
 * dlatego tylko zgłoszone): `components/uslugi/ServiceHero.tsx` trzyma mapę
 * `H1_KOLOR` z kolorowym członem H1 per slug. Wpisy mają WSZYSTKIE wdrożone
 * podstrony (trzy voicebotów, osiem optymalizacji, osiem chatbotów), a ta
 * podstrona nie ma, więc jej H1 wyświetli się w całości szary i strona
 * przeczyta się jak inna rodzina stron (to samo zgłoszenie co MINOR-2 z v20).
 * Wpis do dołożenia razem z rejestrem: `'dla-przychodni': 'który zawsze
 * odbiera telefon'` — sprawdzone, że to dokładna końcówka `h1` poniżej
 * i że nie jest równe całemu `h1`, czyli `dzielH1` je przyjmie.
 */
export const dlaPrzychodni: PodstronaUslugi = {
  rodzic: 'voiceboty',
  slug: 'dla-przychodni',
  dataAktualizacji: '2026-09-22',

  /* H1 1:1 z pakietu (PODSTRONA 2). Fraza główna „voicebot dla przychodni"
     w całości na początku. */
  h1: 'Voicebot dla przychodni, który zawsze odbiera telefon',

  /* KAPSUŁA. Treść z pakietu („KAPSUŁA (gotowa)"), ŚCIŚNIĘTA 2026-09-22 z 95 słów
     do przedziału z kontraktu `Usluga.kapsula` (lib/uslugi/types.ts: 40-60 słów).
     Kapsuła jest blokiem, który modele cytują jako całą odpowiedź, więc ma być gęsta.
     ANI JEDNA LICZBA NIE WYPADŁA: 24/7, szczyt o 8:00, oba progi stworzenia, oba modele
     utrzymania i 0 zł stoją dalej, tak samo zapowiedź AI i zakaz dzwonienia. Skrócone
     zostały opisy („tyle ile linii masz u dostawcy telefonii" -> „ile masz linii",
     „przestaje odsyłać pacjentów do placówki obok" schodzi do `problem.tresc`,
     gdzie stoi w pełnym brzmieniu). KAPSUŁA MA DOKŁADNIE 60 SŁÓW, czyli górną
     granicę kontraktu: przy przycinaniu strony NIE WOLNO dopisać tu ani jednego
     słowa, a wolno tylko zabrać. Przycięcie z 2026-09-22 jej nie tknęło. */
  kapsula:
    'Voicebot dla przychodni odbiera telefon 24/7, zapisuje, przekłada i odwołuje wizyty, a trudne sprawy oddaje rejestracji z notatką. Uprzedza, że jest asystentem AI. Nie dzwoni sam. O 8:00 bierze tyle rozmów naraz, ile masz linii. Stworzenie: 2500 zł netto albo 5000 do 9000 zł netto z integracją do systemu gabinetowego. Utrzymanie: 299 do 1500 zł netto miesięcznie albo 0 zł.',

  /* metaTitle: pakiet dawał 35 znaków, konwencja repo (lib/uslugi/types.ts)
     i decyzja właściciela mówią 50-60 znaków SAMEGO POLA. Trzymamy konwencję
     repo: 54 znaki, tak jak reszta tej fali podstron (dla-kancelarii 55,
     dla-salonu-samochodowego 57, audyt-widocznosci-w-ai 54).
     Fraza główna „voicebot dla przychodni" stoi NA POCZĄTKU. Wyróżnik:
     „24/7" stoi w kapsule, tabeli i FAQ tej strony, a „rejestracja" w H2
     sekcji problemu i w H2 tabeli. Dokładna fraza „rejestracja telefoniczna"
     stoi w `queries` (intencja), nie w treści, i to jedyny człon tytułu, który
     nie jest cytatem ze strony.
     UWAGA DLA WŁAŚCICIELA (nie zmieniam sam, bo rozjechałoby to całą falę):
     layout dokleja sufiks marki („ · SimpleFast.ai", 16 znaków), więc w SERP
     wychodzi 70 znaków, czyli powyżej progu obcięcia. Strony sprzed
     2026-08-31 (rodzic 42, potwierdzanie-wizyt 43, odbieranie-telefonow 40)
     liczyły długość Z sufiksem. To jest rozjazd systemowy całej fali, nie tej
     jednej strony, i decyzja o nim należy do właściciela. */
  metaTitle: 'Voicebot dla przychodni: rejestracja telefoniczna 24/7',
  /* 156 znaków. Kwota wolna w meta (uwaga o kwotach dotyczy kart „Powiązane"). */
  metaDescription:
    'Voicebot dla przychodni odbiera telefon 24/7, zapisuje pacjenta na wolny termin i oddaje trudne sprawy rejestracji z notatką. Od 2500 zł netto za wdrożenie.',

  problem: {
    h2: 'Dlaczego telefon w rejestracji zatyka się o 8:00?',
    tresc:
      'Pacjenci dzwonią zaraz po otwarciu, jeden po drugim. Rejestracja ma tyle rąk, ile ma, więc część dzwoniących słyszy sygnał zajętości i zapisuje się w placówce obok.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Czym rejestracja przychodni różni się od telefonu w małej firmie?',
        ikona: 'lupa-wykres',
        chip: 'REJESTRACJA',
        overline: 'WIELU LEKARZY · JEDEN NUMER · SZCZYT PORANNY',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Szczyt wypada zawsze o tej samej porze',
            akapity: [
              'Poranna fala telefonów jest przewidywalna co do godziny, a i tak nie da się jej obsłużyć naraz. Rozmowa o zapisie trwa tyle, ile trwa, i nie skróci jej pośpiech.',
            ],
            punkty: [
              'Pacjent, który nie dodzwoni się rano, rzadko próbuje po raz drugi po południu.',
            ],
          },
          {
            naglowek: 'Jeden numer, wiele grafików',
            akapity: [
              'W przychodni nie ma jednego kalendarza. Każdy lekarz i każda poradnia mają własny grafik i własne zasady zapisu, a pacjent dzwoni pod jeden numer i tego podziału nie widzi.',
            ],
            punkty: [
              'Zanim padnie propozycja terminu, ktoś musi sprawdzić kilka grafików naraz.',
            ],
          },
          /* PRZYCIĘCIE 2026-09-22 (ROZDZIAŁ INTENCJI, patrz blok „PRZYCIĘCIE" w nagłówku
             pliku): stały tu jeszcze dwie karty i obie mówiły językiem JEDNEGO gabinetu,
             nie przychodni.
              - „Okienko kontra słuchawka" („Przy ladzie stoi pacjent, a jednocześnie dzwoni
                telefon... kogo obsłużyć pierwszego") to co do myśli H2 problemu siostrzanej
                `dla-stomatologa` („Zabieg przy fotelu czy pacjent w słuchawce: co wybiera
                gabinet?") i jej zdanie o wyborze „między pacjentem w fotelu a pacjentem
                w słuchawce". Wybór jeden-na-jeden robi gabinet z jedną rejestratorką;
                przychodnia ma rejestrację, więc temat ZOSTAJE u siostry.
              - „Odwołanie po zamknięciu" niosło fakt, który na TEJ stronie stoi jeszcze
                w dwóch miejscach: wiersz „Odwołanie" w tabeli porównawczej i krok
                „Zapisuje, przekłada, odwołuje" w sekcji rozwiązania („zwalnia godzinę
                w grafiku od razu, także wtedy, gdy rejestracja jest już zamknięta").
                Fakt zostaje, znika trzecie powtórzenie.
             ZOSTAJĄ dwie karty, które są wyłącznie o placówce: poranny szczyt i wiele
             grafików pod jednym numerem. `kolumny: 2` pasuje do dwóch kart bez zmian. */
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czym to się różni od pojedynczego gabinetu?',
        /* PRZYCIĘCIE 2026-09-22: został akapit, który NAZYWA granicę (to on jest
           powodem, dla którego ta strona oddaje siostrze frazę „dla gabinetu",
           patrz „ROZSTRZYGNIĘCIE WŁAŚCICIELA FRAZY" w nagłówku pliku). Zszedł
           akapit drugi, czyli wniosek z tej granicy („bot musi najpierw ustalić,
           czyj grafik otworzyć"): ten sam fakt mówi krok „Ustala poradnię i lekarza"
           w sekcji rozwiązania („Pyta, czego dotyczy wizyta, i dopiero na tej
           podstawie otwiera właściwy grafik"). */
        akapity: [
          'Jeden gabinet ma jeden fotel i jeden grafik, więc rozmowa o zapis jest prosta: jest termin albo go nie ma. Przychodnia ma rejestrację, kilku lekarzy, kilka poradni i pacjenta, który często sam nie wie, do kogo ma się zapisać.',
        ],
        wariant: 'quiet',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co voicebot załatwia w rejestracji przychodni?',
    tresc:
      'Bot przyjmuje zgłoszenie pacjenta, ustala poradnię i lekarza, proponuje wolny termin i zapisuje wizytę. Sprawy, które wymagają człowieka, oddaje rejestracji razem z notatką z rozmowy.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Rozmowa z pacjentem od odebrania do zapisu',
        ikona: 'sluchawka-fala',
        chip: 'PRZEBIEG ROZMOWY',
        overline: 'ODBIERA · USTALA GRAFIK · ZAPISUJE · ODDAJE TRUDNE',
      },
      {
        typ: 'kroki',
        wariant: 'plytka',
        kroki: [
          {
            tytul: 'Bierze całą kolejkę naraz',
            opis: 'Bot prowadzi tyle rozmów jednocześnie, ile linii masz u dostawcy telefonii. Dzwoniący nie słyszy sygnału zajętości ani muzyki na oczekiwaniu.',
          },
          /* PRZYCIĘCIE 2026-09-22: stał tu krok „Mówi, z kim pacjent rozmawia"
             (zapowiedź „jestem asystentem AI"). Fakt nie znika ze strony, stoi
             w trzech miejscach i wszystkie są mocniejsze od kroku na liście:
             w kapsule („Uprzedza, że jest asystentem AI"), w pierwszej kwestii
             przykładowej rozmowy niżej („Rozmawia Pan z systemem AI") i w punkcie
             sekcji „Co z danymi pacjenta...". Nazwa AI Act zostaje w tamtej sekcji
             („zgodnie z RODO i AI Act"). Lista ma teraz cztery kroki. */
          {
            tytul: 'Ustala poradnię i lekarza',
            opis: 'Pyta, czego dotyczy wizyta, i dopiero na tej podstawie otwiera właściwy grafik. Pacjent nie dostaje więc godziny u niewłaściwego specjalisty.',
          },
          {
            tytul: 'Zapisuje, przekłada, odwołuje',
            opis: 'Zapis idzie jeszcze w trakcie rozmowy. Przy odwołaniu bot zwalnia godzinę w grafiku od razu, także wtedy, gdy rejestracja jest już zamknięta.',
          },
          {
            tytul: 'Trudną sprawę oddaje rejestracji',
            opis: 'Spisuje, o co chodziło, i przekazuje zgłoszenie człowiekowi. Sprawa spoza scenariusza nie ląduje w grafiku, tylko u rejestracji.',
          },
        ],
      },
      /* PRZENIESIONE Z RODZICA 2026-09-22 (`lib/uslugi/voiceboty.ts`,
         `rozwiazanie.bloki`, sekcja 2 pakietu „Jak brzmi rozmowa
         z voicebotem?"). Powód: przycięcie rodzica z 4180 do przedziału
         1300-1600 słów z raportu SEO `.seo-przeglad/raporty/2026-09-05.md`,
         tą samą metodą co na /uslugi/chatboty (commit b0dd7fc): wątki poboczne
         schodzą na podstrony, na stronie usługi zostają dwa zdania z odesłaniem.
         DLACZEGO WŁAŚNIE TUTAJ: ten zapis JEST rozmową z rejestracją przychodni
         („tu asystent głosowy przychodni", zapis do internisty, grafik), więc na
         rodzicu stał w oderwaniu od strony, która ten scenariusz sprzedaje.
         TREŚĆ 1:1 Z RODZICA, zero nowych faktów. Zapis zostaje TABELĄ, bo to
         jedyny typ bloku, który renderuje prawdziwą <table> z <caption>: kto
         mówi i co pada zostaje powiązane semantycznie, a nie samym wcięciem.
         DOŁOŻONY AKAPIT o literowaniu nazwisk niesie fakt z wyciętego FAQ
         rodzica „Czy bot zrozumie trudne nazwisko, gwarę albo obcy akcent?";
         część o obcym języku stoi już w FAQ tej strony („Czy pacjent
         obcojęzyczny się dogada?") i NIE jest tu powtórzona.
         STAN PO PRZYCIĘCIU 2026-09-22: sama tabela rozmowy jest nietknięta, co do
         kwestii i co do kolejności. Zeszły dwa akapity, które ją oprawiały (wstęp
         nad tabelą i streszczenie „trzy rzeczy" pod nią) — powód przy każdym z nich
         osobno. Akapit o literowaniu nazwisk ZOSTAJE, bo tylko on niesie fakt
         z wyciętego FAQ rodzica. */
      {
        typ: 'naglowek',
        tekst: 'Jak brzmi rozmowa z voicebotem w rejestracji?',
        ikona: 'mikrofon-fale',
        chip: 'PRZYKŁAD',
        overline: 'ROZMOWA PRZYCHODZĄCA · SCENARIUSZ NAPISANY PRZEZ NAS',
      },
      /* PRZYCIĘCIE 2026-09-22: zszedł akapit wprowadzający („Voicebota nie da się
         sprzedać samym opisem..."). Całe zastrzeżenie, które niósł, stoi w `podpis`
         tabeli niżej, a `podpis` renderuje się jako widoczny <caption>
         (components/blog/PostBody.tsx, gałąź `case 'tabela'`), więc zdanie „To nie
         jest zapis rozmowy pacjenta" nie znika ze strony ani na chwilę. */
      {
        typ: 'tabela',
        naglowki: ['Kto mówi', 'Co pada w rozmowie'],
        wiersze: [
          [
            'Bot',
            'Dzień dobry, tu asystent głosowy przychodni. Rozmawia Pan z systemem AI. W czym mogę pomóc?',
          ],
          ['Dzwoniący', 'Chciałem się zapisać do internisty, najlepiej w tym tygodniu.'],
          [
            'Bot',
            'Sprawdzam grafik. Mam wolny czwartek o 9:20 i piątek o 14:00. Który termin pasuje?',
          ],
          ['Dzwoniący', 'Czwartek. Chociaż nie, w czwartek pracuję. Niech będzie piątek.'],
          [
            'Bot',
            'Rezerwuję piątek, godzina 14:00. Poproszę o imię i nazwisko, przeliteruję je i potwierdzę.',
          ],
          ['Dzwoniący', 'A ile to kosztuje?'],
          [
            'Bot',
            'Tego akurat nie mam potwierdzonego w mojej bazie, więc nie będę zgadywał. Przekazuję pytanie rejestracji, oddzwonią rano.',
          ],
        ],
        wKarcie: true,
        podpis: 'Przykładowy scenariusz rozmowy przychodzącej, napisany przez nas. To nie jest zapis rozmowy pacjenta.',
      },
      /* PRZYCIĘCIE 2026-09-22: zszedł akapit „Trzy rzeczy z tego zapisu robią całą
         robotę...". Był streszczeniem tabeli stojącej bezpośrednio nad nim: wszystkie
         trzy rzeczy widać w samych kwestiach (zapowiedź AI w pierwszej, zmiana decyzji
         w czwartej, „nie będę zgadywał" w siódmej). Zero faktu w dół, jedno powtórzenie
         mniej. */
      {
        typ: 'akapit',
        tekst: 'Z nazwiskami bot radzi sobie gorzej niż z terminami i mówimy to wprost. Dlatego przy zapisie prosi o przeliterowanie i powtarza to, co usłyszał, do potwierdzenia, zamiast wpisać do grafiku zgadywaną wersję.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Skąd bot wie, które terminy są naprawdę wolne?',
        /* PRZYCIĘCIE 2026-09-22: zszedł akapit drugi („Zakres integracji ustalamy
           przed wyceną... Gdy system udostępnia grafik... Gdy nie udostępnia, bot
           spisuje zgłoszenie"). Zdanie w zdanie to FAQ „Czy bot połączy się z naszym
           systemem gabinetowym?" („Jeśli system ma API albo eksport grafiku, bot widzi
           wolne terminy i zapisuje wizytę od razu. Jeśli nie ma, bot spisuje
           zgłoszenie, a rejestracja wpisuje je ręcznie"), a FAQ jest treścią
           zatwierdzoną z pakietu i idzie 1:1 do FAQPage JSON-LD. Ten sam podział na
           dwa warianty mówi jeszcze krok wdrożenia „Numer rejestracji i zasady zapisu"
           oraz PRÓG 1 w przełączniku cen. */
        akapity: [
          'Bot nie ma własnego kalendarza. Czyta ten grafik, który już prowadzicie, i zapisuje wizytę tam, gdzie pracuje rejestracja. Nic nie przenosi się do osobnego systemu obok.',
        ],
        /* PRZYCIĘCIE 2026-09-22: zszedł trzeci punkt i cała `stopka`, każde jako
           powtórzenie zdania stojącego obok.
            - punkt „Nawet bez podłączonego grafiku zgłoszenie zostaje spisane" mówił
              to samo co koniec drugiego akapitu tej sekcji („bot spisuje zgłoszenie,
              a rejestracja przenosi je do grafiku ręcznie"),
            - stopka 1 („sprawdzamy na bezpłatnej rozmowie, zanim podamy cenę") to
              FAQ „Czy bot połączy się z naszym systemem gabinetowym?" („Sprawdzamy to
              na diagnozie, przed wyceną"),
            - stopka 2 („wariant bez integracji można rozbudować później") to trzeci
              punkt PROGU 1 w przełączniku cen („Grafik da się podłączyć w kolejnym
              kroku, a taka rozbudowa jest wyceniana osobno"). */
        punkty: [
          'Bot rozróżnia grafiki poszczególnych lekarzy i poradni, a nie jeden wspólny kalendarz placówki.',
          'Reguły zapisu ustala placówka i bot ich nie zmienia ani nie obchodzi.',
        ],
        wariant: 'top',
        chip: 'INTEGRACJA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co z danymi pacjenta i ze zgodą na nagrywanie?',
        /* PRZYCIĘCIE 2026-09-22: zszedł pierwszy akapit („Bot nie rozmawia o zdrowiu.
           Rozpoznaje, że sprawa dotyczy wyników albo objawów..."). To było zdanie
           w zdanie FAQ „Co z pacjentem, który dzwoni w sprawie wyników albo objawów?",
           a FAQ jest treścią zatwierdzoną z pakietu i idzie 1:1 do FAQPage JSON-LD,
           więc ustąpił akapit, nie pytanie. Został akapit o RODO, AI Act, danych
           w Unii Europejskiej i umowie powierzenia: na tej stronie nie stoi on
           nigdzie indziej. */
        akapity: [
          'Zakres tego, co z rozmowy zostaje zapisane, ustala placówka przy wdrożeniu. Rozmowy przetwarzamy zgodnie z RODO i AI Act, dane z rozmów zostają w Unii Europejskiej, a umowę powierzenia podpisujemy przed uruchomieniem bota.',
        ],
        punkty: [
          'Pacjent słyszy w pierwszym zdaniu, że rozmawia z asystentem AI.',
          'Decyzja, co bot nagrywa i co przechowuje, należy do placówki, nie do nas.',
        ],
        wariant: 'edge',
        chip: 'DANE',
      },
      {
        typ: 'sekcja',
        naglowek: 'Bot nie dzwoni do pacjentów',
        /* PRZYCIĘCIE 2026-09-22: został sam zakaz, zszedł akapit drugi („Gdy sprawa
           wymaga kontaktu zwrotnego, bot zapisuje ją i powiadamia rejestrację").
           Ten mechanizm opisuje krok „Trudną sprawę oddaje rejestracji" w sekcji
           wyżej. Zaprzeczenie „bot nie dzwoni sam" zostaje w całości, bo to kontrakt
           powtórzony w ośmiu miejscach repo. */
        akapity: [
          'Voicebot obsługuje wyłącznie połączenia przychodzące. Nie obdzwania pacjentów z przypomnieniem o wizycie ani z zaproszeniem na badania, bo nie robimy botów, które same wydzwaniają do ludzi.',
        ],
        wariant: 'quiet',
        chip: 'ZASADA',
      },
    ],
  },

  /* Komórki krótkie (konwencja v20 podstron: `cecha` ok. 12 znaków, kolumny
     ok. 30), żeby wiersze nie łamały się na wąskich ekranach.
     PIERWSZY wiersz MUSI mieć „24/7" w kolumnie `zNami`: to bramka czwartego
     kafla statystyk w hero (ServiceHero.kafleStatystyk), a etykietą kafla jest
     `cecha` tego wiersza. Zero nowego faktu, 24/7 stoi już w H1 i kapsule. */
  tabelaPorownawcza: {
    h2: 'Rejestracja przy telefonie a voicebot w przychodni',
    naglowekBez: 'Sama rejestracja przy telefonie',
    naglowekZNami: 'Voicebot od SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Godziny',
        bez: 'Tylko gdy placówka otwarta',
        zNami: 'Odbiera 24/7, także po zamknięciu',
      },
      {
        cecha: 'Szczyt o 8:00',
        bez: 'Sygnał zajętości',
        zNami: 'Tyle rozmów, ile linii',
      },
      {
        cecha: 'Wybór lekarza',
        bez: 'Ktoś sprawdza kilka grafików',
        zNami: 'Bot otwiera właściwy grafik',
      },
      {
        cecha: 'Zapis wizyty',
        bez: 'Po odłożeniu słuchawki',
        zNami: 'Jeszcze w trakcie rozmowy',
      },
      {
        cecha: 'Odwołanie',
        bez: 'Odsłuchane dopiero rano',
        zNami: 'Godzina zwolniona od razu',
      },
      {
        cecha: 'Wyniki i objawy',
        bez: 'Rozmowa blokuje linię',
        zNami: 'Przekazane z notatką',
      },
      /* PRZYCIĘCIE 2026-09-22 (ROZDZIAŁ INTENCJI): zszedł wiersz „Ślad po rozmowie"
         („Podsumowanie po każdej rozmowie"). Podsumowanie po rozmowie to towar
         siostrzanej `odbieranie-telefonow` i tak ją opisuje karta w sekcji
         „Powiązane" na dole tej strony („jak wygląda podsumowanie rozmowy, którą bot
         odebrał zamiast Ciebie"). Notatka z rozmowy zostaje tam, gdzie jest tematem
         przychodni: wiersz „Wyniki i objawy" wyżej i krok „Trudną sprawę oddaje
         rejestracji". Tabela ma teraz sześć wierszy, tyle co siostry, a pierwszy
         wiersz z ciągiem „24/7" stoi nietknięty (bramka kafla w hero). */
    ],
  },

  kroki: {
    h2: 'Jak wygląda wdrożenie w placówce, etap po etapie?',
    items: [
      {
        tytul: 'Rozmowa o potrzebach (bezpłatna)',
        opis:
          'Obejrzymy, jak dziś działa telefon w rejestracji, i ustalimy zakres: które sprawy przejmuje bot, a które zostają przy ludziach. Policzymy to na Twoich liczbach.',
      },
      /* KONTROLA 2026-09-22 (ta sama wada, którą zdjęto z `dla-stomatologa`):
         krok brzmiał „Podłączamy numer rejestracji i grafik", czyli obiecywał
         grafik w KAŻDYM wdrożeniu. Przełącznik progów na tej samej stronie mówi
         co innego: PRÓG 1 za 2500 zł netto „Grafiku nie dotyka", a grafiki
         lekarzy widzi dopiero PRÓG 2. Dopisany warunek zdejmuje sprzeczność
         wewnątrz jednej strony, nie dokładając żadnego faktu. */
      {
        tytul: 'Numer rejestracji i zasady zapisu',
        opis:
          'Podłączamy numer rejestracji, spisujemy zasady zapisu dla każdej poradni i ustawiamy granice rozmowy. Grafiki lekarzy bot dostaje w progu z integracją, a bez niej spisuje zgłoszenie dla rejestracji. Testujemy na żywo, zanim bot odbierze pierwsze połączenie do rejestracji.',
      },
      {
        tytul: 'Odbiór i opieka',
        opis:
          'Po uruchomieniu przeglądamy nagrane rozmowy razem z rejestracją i domykamy scenariusze, które pacjenci wywołali najczęściej. Widzisz, co bot zapisał sam, a co oddał człowiekowi.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje voicebot dla przychodni?',
    /* PRZYCIĘCIE 2026-09-22: zdanie trzecie („O tym, w którym progu wyląduje
       placówka, decyduje przede wszystkim dostęp do grafiku") zeszło, bo dwie linijki
       niżej stoi ten sam komunikat dwa razy: w nagłówku bloku („Od czego zależy,
       w którym progu wyląduje Twoja placówka?") i w jego overline („DWA PROGI ·
       DECYDUJE DOSTĘP DO GRAFIKU"). */
    tresc:
      'Stworzenie bota to 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do systemu gabinetowego. Osobno płacisz utrzymanie i zużycie.',
    bloki: [
      /* PRZYCIĘCIE 2026-09-22: zszedł cały `pasMetryk` z czterema kaflami (2500 zł
         netto, 5000 do 9000 zł netto, 0 zł, 3 do 25 dni roboczych). To był blok
         czysto powtarzający: każdy z czterech kafli wskazywał WŁASNYM polem `zrodlo`
         miejsce kilka linijek niżej, z którego brał liczbę („próg 1 przełącznika
         niżej", „wiersz Utrzymanie w tabeli niżej"). ANI JEDNA LICZBA NIE WYPADŁA ZE
         STRONY: 2500 zł netto i 5000 do 9000 zł netto stoją w `tresc` nad tym
         miejscem, w obu progach przełącznika, w wierszu „Stworzenie bota" tabeli,
         w kapsule i w FAQ o cenie; 0 zł w wierszu „Utrzymanie", w kapsule i w FAQ;
         czasy 3 do 5 oraz 5 do 25 dni roboczych w nagłówkach obu progów.
         Skrót „3 do 25 dni roboczych" (jedyne miejsce, w którym oba czasy stały
         zlepione w jedne widełki) świadomie NIE wraca nigdzie indziej: każdy próg
         podaje teraz swój własny czas, i tylko swój. */
      {
        typ: 'naglowek',
        tekst: 'Od czego zależy, w którym progu wyląduje Twoja placówka?',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'DWA PROGI · DECYDUJE DOSTĘP DO GRAFIKU',
      },
      {
        typ: 'przelacznik',
        grupa: 'dla-przychodni-progi',
        opcje: [
          {
            numer: 'PRÓG 1',
            tytul: 'Bez integracji',
            podtytul: '2500 zł netto',
            naglowek: 'Próg bez integracji to 2500 zł netto jednorazowo, a uruchomienie zajmuje 3 do 5 dni roboczych.',
            akapity: [
              'Bot odbiera telefon, odpowiada na powtarzalne pytania o godziny przyjęć, adres i zasady zapisu, spisuje zgłoszenie i przekazuje je rejestracji. Grafiku nie dotyka.',
            ],
            punkty: [
              'Ten próg wybierasz, gdy system gabinetowy nie udostępnia grafiku albo gdy chcesz zacząć od samego zdjęcia szczytu porannego.',
              'Te 3 do 5 dni roboczych biegną od chwili, gdy przekażesz komplet materiałów, a nie od umowy.',
              'Grafik da się podłączyć w kolejnym kroku, a taka rozbudowa jest wyceniana osobno.',
            ],
          },
          {
            numer: 'PRÓG 2',
            tytul: 'Z systemem gabinetowym',
            podtytul: '5000 do 9000 zł netto',
            naglowek:
              'Próg z systemem gabinetowym to 5000 do 9000 zł netto, a wdrożenie zajmuje 5 do 25 dni roboczych.',
            akapity: [
              'Tu bot sięga do grafików poszczególnych lekarzy, zapisuje wizytę jeszcze w rozmowie i zwalnia godzinę, gdy pacjent ją odwołuje. To ten wariant, o którym mówi cała ta strona.',
            ],
            /* PRZYCIĘCIE 2026-09-22: zszedł punkt „Także w tym progu bot obsługuje
               wyłącznie połączenia przychodzące". Nagłówek pliku wskazywał go wprost
               jako pierwszego kandydata przy ścinaniu objętości: zaprzeczenie „bot nie
               dzwoni sam" stało na tej stronie w CZTERECH miejscach, a siostry po v20
               trzymają trzy. Zostają trzy: kapsuła, sekcja „Bot nie dzwoni do
               pacjentów" i punkt w dyskwalifikacji niżej. */
            punkty: [
              'O miejscu w widełkach decyduje liczba podłączanych systemów i to, jak dany system udostępnia grafik.',
              'Dwie rundy testów z poprawkami mieszczą się w cenie wdrożenia, tak samo w obu progach.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: ['Co płacisz', 'Kwota', 'Jak często'],
        wiersze: [
          [
            'Stworzenie bota',
            '2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do systemu gabinetowego',
            'raz, przy wdrożeniu',
          ],
          [
            'Utrzymanie',
            '299 do 1500 zł netto miesięcznie przy infrastrukturze u nas albo 0 zł po przekazaniu jej placówce, poprawki wtedy 350 zł netto za godzinę',
            'co miesiąc albo wcale',
          ],
          [
            'Zużycie',
            'minuty rozmów u dostawcy telefonii i tokeny modelu językowego według realnego użycia',
            'po stronie placówki',
          ],
        ],
        wKarcie: true,
        podpis: 'Trzy pozycje kosztu voicebota w przychodni, każda nasza kwota netto.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dla jakich placówek to nie ma sensu?',
        /* PRZYCIĘCIE 2026-09-22: zszedł rozwlekły akapit wprowadzający („Wolimy
           powiedzieć to przed wyceną niż po wdrożeniu..."), bo zapowiadał dokładnie
           to, co robi nagłówek sekcji i pięć punktów pod nim, a obietnicę mówienia
           wprost niesie `stopka` na dole tej samej sekcji.
           POPRAWKA TEGO SAMEGO DNIA: przycięcie usunęło CAŁE pole `akapity`, a typ
           `Blok` wymaga go przy `typ: 'sekcja'` (lib/blog/types.ts). Skutek był
           twardy: `npx tsc --noEmit` padał na TS2322, `npm run build` wychodził
           z kodem 1, a components/blog/PostBody.tsx robi `blok.akapity.map(...)`,
           więc strona zwracała HTTP 500 i nie renderowała się w ogóle.
           Zamiast pustej tablicy (która przeszłaby typ, ale zostawiła sekcję bez
           wprowadzenia) wraca JEDNO zdanie, które NIE powtarza nagłówka: nazywa
           moment, w którym ta lista jest przydatna. */
        akapity: [
          'Sprawdź to przed rozmową o wycenie, bo w tych pięciu sytuacjach bot nie zwróci się ani na telefonie, ani w grafiku.',
        ],
        punkty: [
          'Telefon dzwoni kilka razy dziennie, a rejestracja odbiera wszystko na bieżąco: nie ma czego odciążać.',
          'Pacjenci zapisują się głównie przez internetową rejestrację, a telefon jest kanałem pobocznym.',
          'Rozmowy to niemal wyłącznie wyniki i objawy: takich spraw bot nie prowadzi i prowadzić nie będzie.',
          'Grafik nie jest prowadzony w żadnym systemie, tylko w zeszycie: najpierw grafik, potem bot.',
          'Szukasz bota, który sam obdzwoni pacjentów: takich nie budujemy.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Widzisz tu swoją placówkę? Napisz mimo wszystko.',
          'Powiemy wprost, od czego zacząć, nawet jeśli nie będzie to bot od nas.',
        ],
      },
    ],
    minPrice: 2500,
    /* `cenaStala` ŚWIADOMIE nieustawione: ceny voicebotów są widełkami
       (2500 zł netto za prostego, 5000 do 9000 zł netto z integracjami), więc
       kafel ceny w hero ma zostać z prefiksem „od ". */
    linkPoradnik: {
      przed: 'Trzy pozycje kosztu i pełny zakres usługi rozpisaliśmy na stronie ',
      etykieta: 'voiceboty dla firm',
      po: '.',
      href: '/uslugi/voiceboty',
    },
  },

  /* PIERWSZE CZTERY PYTANIA 1:1 Z PAKIETU („FAQ (gotowe, cztery pytania)").
     Kolejność, pytania i odpowiedzi bez zmian: ten sam tekst idzie na stronę
     i do FAQPage JSON-LD, więc każda edycja rozjeżdża oba naraz.
     OSTATNIE pytanie dołożone, bo kontrakt szablonu chce 5 do 6 pozycji: jedno
     o cenie (kwoty 1:1 z sekcji ceny wyżej), zero nowego faktu. Dołożone było też
     drugie, o szczycie porannym, i to ono zeszło przy przycięciu z 2026-09-22
     (uzasadnienie w komentarzu na jego miejscu niżej). Lista ma teraz PIĘĆ pozycji,
     czyli dolną granicę kontraktu: przy kolejnym cięciu nie wolno zdjąć już żadnej,
     a cztery pierwsze są treścią zatwierdzoną z pakietu i nie wolno ich ruszać
     w ogóle. */
  faq: [
    {
      pytanie: 'Czy bot połączy się z naszym systemem gabinetowym?',
      odpowiedz:
        'Sprawdzamy to na diagnozie, przed wyceną. Jeśli system ma API albo eksport grafiku, bot widzi wolne terminy i zapisuje wizytę od razu. Jeśli nie ma, bot spisuje zgłoszenie, a rejestracja wpisuje je ręcznie. Tak czy inaczej nie tracicie pacjenta.',
    },
    {
      pytanie: 'Co z pacjentem, który dzwoni w sprawie wyników albo objawów?',
      odpowiedz:
        'Bot nie rozmawia o zdrowiu. Ustala, że sprawa dotyczy wyników, i przekazuje ją rejestracji albo umawia termin. Zakres tego, co z rozmowy zostaje zapisane, ustala placówka przy wdrożeniu.',
    },
    {
      pytanie: 'Czy pacjent obcojęzyczny się dogada?',
      odpowiedz:
        'Bot przechodzi na inny język albo przekazuje rozmowę człowiekowi, w zależności od tego, co ustalimy przy wdrożeniu. Decyzja należy do placówki, bo to Wy wiecie, kto do Was dzwoni.',
    },
    {
      pytanie: 'Co, gdy padnie internet w przychodni?',
      odpowiedz:
        'Ruch wraca na dotychczasowy numer rejestracji, czyli do stanu sprzed wdrożenia. Telefon dzwoni jak dawniej, nikt nie zostaje z martwą linią.',
    },
    /* PRZYCIĘCIE 2026-09-22: zeszło piąte pytanie („Czy bot odbierze kilka telefonów
       naraz w szczycie o 8:00?"). To jedno z DWÓCH pytań dołożonych poza pakietem
       (cztery pierwsze są treścią zatwierdzoną i zostają nietknięte), a jego odpowiedź
       powtarzała to, co na tej stronie stoi już cztery razy: w H2 problemu („Dlaczego
       telefon w rejestracji zatyka się o 8:00?"), w kapsule („O 8:00 bierze tyle rozmów
       naraz, ile masz linii"), w wierszu „Szczyt o 8:00" tabeli porównawczej i w kroku
       „Bierze całą kolejkę naraz". Zdanie o odsyłaniu pacjenta do placówki obok zostaje
       w `problem.tresc`. FAQ ma teraz PIĘĆ pozycji, czyli dolną granicę kontraktu
       `Usluga` (lib/uslugi/types.ts: faq[5-6]); kafel hero „najczęstszych pytań"
       policzy 5 sam, bo bierze `faq.length`. */
    {
      pytanie: 'Ile kosztuje voicebot dla przychodni?',
      odpowiedz:
        'Stworzenie bota to 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do systemu gabinetowego. Utrzymanie to 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przechodzi do placówki. Zużycie, czyli minuty u dostawcy telefonii i tokeny modelu, rozliczasz według realnego użycia.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet, sekcja 10: CTA bezpłatna
     diagnoza). Mikrokopia trzyma się ustalenia z 2026-08-31: bezpłatna rozmowa
     to badanie potrzeb, więc obiecujemy „obejrzymy", „ustalimy zakres"
     i „policzymy na Twoich liczbach", a nie pomiar, audyt ani raport.
     OTWARTE (kontrola 2026-09-22, do rozstrzygnięcia przez właściciela):
     zdanie „Policzymy to na Twoich liczbach" stoi także w `kroki.items[0]`
     tej strony i w `voiceboty-cennik.ts`. Da się je czytać jako obietnicę
     policzenia, czyli pomiaru, a pomiar i raport należą do płatnego Sprintu
     Diagnostycznego. Nie zmieniam sam, bo to zmiana obietnicy handlowej na
     kilku stronach naraz, nie literówka. */
  cta: {
    label: 'Sprawdźmy telefon w Twojej rejestracji',
    href: '#diagnoza',
    mikrokopia:
      'Obejrzymy, jak dziś wygląda telefon w rejestracji, ustalimy zakres i policzymy to na Twoich liczbach. Bez zobowiązań.',
    dowod:
      'Rozmowa jest bezpłatna i służy ustaleniu potrzeb. Najpierw zakres, potem decyzja.',
  },

  /* 2026-09-22: „usługa odbierania telefonów dla gabinetu" ZDJĘTA z tej listy
     (uzasadnienie w nagłówku pliku). Właścicielem tej frazy jest
     `odbieranie-telefonow.ts`. Na jej miejsce wchodzi fraza węższa, w której
     obie strony się już nie spotykają, bo członu „przychodni" nie ma u siostry
     ani razu. */
  queries: [
    'voicebot dla przychodni',
    'odbieranie telefonów w rejestracji przychodni',
    'bot telefoniczny dla przychodni',
    'voicebot do rejestracji pacjentów',
    'automatyczna rejestracja telefoniczna w przychodni',
    'AI odbiera telefon w przychodni',
  ],

  /* POWIĄZANIA: w bok do dwóch istniejących sióstr z tej samej gałęzi
     i do kalkulatora. Etykieta = H1 strony docelowej, opis = fakt, który już
     na niej stoi. ZERO kwot w tych kartach (kwoty wyłącznie w kapsule, meta
     i sekcji ceny). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Voicebot do potwierdzania wizyt 24/7',
        href: '/uslugi/voiceboty/potwierdzanie-wizyt',
        opis:
          'Sama funkcja umawiania i potwierdzania terminu, opisana dla dowolnej branży: bot zapisuje wizytę w kalendarzu i wysyła potwierdzenie tekstem.',
      },
      {
        etykieta: 'Bot telefoniczny, który odbiera telefon 24/7',
        href: '/uslugi/voiceboty/odbieranie-telefonow',
        opis:
          'Co dzieje się z nieodebranym połączeniem i jak wygląda podsumowanie rozmowy, którą bot odebrał zamiast Ciebie.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis:
          'Policz, ile rocznie zjadają powtarzalne rozmowy o terminach, godzinach przyjęć i dojeździe.',
      },
    ],
  },
};
