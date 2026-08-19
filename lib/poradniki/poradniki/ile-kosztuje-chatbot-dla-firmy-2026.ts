import type { Poradnik } from '../types';

/**
 * PORADNIK 1: Ile kosztuje chatbot dla firmy w 2026? (od 1790 zł netto)
 *
 * Money query primary: „ile kosztuje chatbot dla firmy". Evergreen, answer-first.
 *
 * CENNIK 2026-08-19 (jedyne źródło: .seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md
 * §1 i §3 plus decyzje Pawła z 2026-08-19). KAŻDA kwota NETTO:
 *   - chatbot prosty  1790 zł        / 1-2 dni robocze
 *   - chatbot średni  3000-6000 zł   / 3-4 dni robocze
 *   - chatbot duży    8000-15000 zł  / 5-10 dni roboczych
 *   - opieka chatbota 99-599 zł/mies (zostaje: chatbot jest prostszy w utrzymaniu
 *     niż voicebot, gdzie utrzymanie to 299-1500 zł/mies albo 0 zł po przekazaniu
 *     infrastruktury; ta różnica jest wyjaśniona w treści)
 *   - audyt AI 1490 zł / 5 dni roboczych / raport PDF z mapą procesów,
 *     odliczany od wdrożenia
 * ZASADA CZASU: liczymy od przekazania kompletu materiałów przez klienta
 * (baza wiedzy, treści, dostępy), NIE od podpisania umowy (audyt §1).
 * RUNDY POPRAWEK: dwie w cenie wdrożenia (tydzień testów, poprawki, drugi
 * tydzień testów, poprawki, odbiór). Poprawki tego, co nie zadziałało po
 * naszej stronie: zawsze, także po odbiorze. Nowe funkcjonalności = rozbudowa
 * wyceniana osobno (audyt §1).
 *
 * KWOTA 990 ZŁ ZNIKA z całego serwisu jako cena chatbota (audyt: leżała poniżej
 * pasma rynkowego 2000-3500 zł, więc modele AI odrzucały ją jako wartość
 * odstającą, co kosztowało nas cytowania).
 *
 * Tło rynkowe 1990-45000 zł z researchu .seo-przeglad/KONKURENCJA-2026-08-16.md,
 * przypisane opisowo „agencje w Polsce" (bez nazywania i linkowania konkurencji).
 * To CUDZE kwoty: nie oznaczamy ich jako netto, bo nie znamy ich podstawy.
 * Linkuje do /uslugi/chatboty, /uslugi/audyt-ai i kalkulatora procesu.
 */
export const ileKosztujeChatbotDlaFirmy: Poradnik = {
  slug: 'ile-kosztuje-chatbot-dla-firmy-2026',
  tytul: 'Ile kosztuje chatbot dla firmy w 2026? Od 1790 zł i co wpływa na cenę',

  lead:
    'Chatbot dla firmy kosztuje u nas 1790 zł netto za prostego bota na stronę, 3000 do 6000 zł netto za wdrożenie średnie i 8000 do 15000 zł netto za duże wdrożenie z integracjami. Czas wdrożenia to kolejno 1-2, 3-4 i 5-10 dni roboczych, liczonych od przekazania kompletu materiałów, nie od podpisania umowy. Dwie rundy poprawek są w cenie wdrożenia. Publiczne cenniki agencji AI w Polsce zaczynają się od 1990 zł i dochodzą do 45000 zł. Do tego dochodzi utrzymanie i tu wybierasz: abonament opieki od 99 do 599 zł netto miesięcznie, gdy projekt zostaje u nas, albo 0 zł, gdy przekazujemy Ci całą infrastrukturę. Poniżej masz pełne widełki, ukryte koszty i prosty sposób, żeby policzyć zwrot, zanim zamówisz.',

  metaTitle: 'Ile kosztuje chatbot AI dla firmy? Od 1790 zł',
  metaDescription:
    'Chatbot dla firmy kosztuje u nas od 1790 zł netto, wdrożenie w 1-2 dni robocze. Sprawdź pełne widełki, czas wdrożenia, koszt utrzymania i ukryte koszty.',

  data: '2026-06-15',
  dataAktualizacji: '2026-08-19',
  kategoria: 'Koszty i wycena',
  tagi: ['ile kosztuje chatbot', 'cena chatbota 2026', 'chatbot dla firmy koszt', 'chatbot na stronę'],

  tresc: [
    /* Runda struktury 2026-08-19 (raport P8: mediana akapitu ~150 zn, strona miała
       do 61% tekstu w akapitach >400 zn): treść przełożona na bloki, fakty 1:1,
       istniejące tabele/kafle/kroki zachowane. Poprzednia wersja: git blame. */
    {
      typ: 'akapit',
      tekst: 'Pytasz o cenę, bo nie chcesz przepłacić. Dobrze. Krótka odpowiedź na pytanie, ile kosztuje chatbot dla firmy: u nas prosty chatbot na stronę to 1790 zł netto i 1-2 dni robocze na wdrożenie.',
    },
    {
      typ: 'kafle',
      kafle: [
        {
          wartosc: '1790 zł netto',
          opis: 'chatbot prosty, wdrożenie 1-2 dni robocze',
          zrodlo: 'cennik 2026',
        },
        {
          wartosc: '3000-6000 zł netto',
          opis: 'chatbot średni, 3-4 dni robocze',
          zrodlo: 'cennik 2026',
        },
        {
          wartosc: '8000-15000 zł netto',
          opis: 'chatbot duży z integracjami, 5-10 dni roboczych',
          zrodlo: 'cennik 2026',
        },
        {
          wartosc: 'od 99 zł netto/mies.',
          opis: 'opieka po wdrożeniu albo 0 zł przy przekazaniu infrastruktury',
          zrodlo: 'cennik 2026',
        },
      ],
    },
    {
      typ: 'akapit',
      tekst: 'To nasza pełna drabina i tyle kosztuje chatbot AI dla firmy u nas. Na rynku rozstrzał jest dużo większy: publiczne cenniki agencji AI w Polsce zaczynają się od 1990 zł i dochodzą do 45000 zł. Skąd taka różnica i za co właściwie płacisz, rozkładamy poniżej.',
    },
    {
      typ: 'akapit',
      tekst: 'Uwaga na zbieg kwot: nasz AI Start za 1990 zł to inna usługa, pierwsza automatyzacja procesu na próbę, nie chatbot. Kwota 1990 zł w tym poradniku opisuje dolny próg publicznych cenników innych agencji, nie nasz produkt.',
    },
    {
      typ: 'naglowek',
      tekst: 'Jakie są widełki cenowe chatbota w Polsce w 2026?',
    },
    {
      typ: 'akapit',
      tekst: 'Ile kosztuje chatbot AI dla firmy w Polsce? Agencje, które publikują cenniki chatbotów, podają bardzo różne kwoty: jedna zaczyna od 1990 zł, inna pokazuje widełki od 3500 do 45000 zł za rozbudowane wdrożenia.',
    },
    {
      typ: 'akapit',
      tekst: 'Do tego dochodzą abonamenty narzędzi i utrzymania, na rynku zwykle od około 100 do 2500 zł miesięcznie. Ten rozstrzał nie bierze się z powietrza: górne kwoty to boty z wieloma integracjami, wieloma kanałami i dużym ruchem. Na tym tle nasz cennik wygląda tak.',
    },
    {
      typ: 'tabela',
      wKarcie: true,
      podpis: 'Ile kosztuje chatbot dla firmy: nasz cennik 2026 i tło rynkowe',
      naglowki: [
        'Zakres',
        'Co obejmuje',
        'Cena',
        'Czas wdrożenia',
      ],
      wiersze: [
        [
          'Rynek: agencje AI w Polsce',
          'Publiczne cenniki wdrożeń chatbotów, od prostych botów po duże projekty',
          'od 1990 do 45000 zł',
          'zwykle nie podawany',
        ],
        [
          'U nas: chatbot prosty',
          'Bot na Twojej stronie, Twoja baza wiedzy podpięta przez nas, zbieranie leadów 24/7, odsyłanie do właściwych miejsc na stronie',
          '1790 zł netto',
          '1-2 dni robocze',
        ],
        [
          'U nas: chatbot średni',
          'To, co wyżej, plus rozbudowana baza wiedzy i dodatkowe funkcje',
          '3000 do 6000 zł netto',
          '3-4 dni robocze',
        ],
        [
          'U nas: chatbot duży',
          'Pełny zakres z integracjami, zależnie od liczby elementów do zbudowania',
          '8000 do 15000 zł netto',
          '5-10 dni roboczych',
        ],
        [
          'U nas: opieka po wdrożeniu',
          'Poprawki odpowiedzi, aktualizacja wiedzy bota, reakcja na zmiany',
          'od 99 do 599 zł netto miesięcznie albo 0 zł przy przekazaniu infrastruktury',
          'stała, od dnia startu',
        ],
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Ile trwa wdrożenie chatbota?',
      wariant: 'top',
      chip: 'ZASADA',
      akapity: [
        'Prosty chatbot powstaje w 1-2 dni robocze, średni w 3-4 dni robocze, duży z integracjami w 5-10 dni roboczych. Czas wdrożenia liczymy od przekazania kompletu materiałów: bazy wiedzy, treści i dostępów. Nie od podpisania umowy, bo to Ty decydujesz, kiedy materiały do nas trafią.',
        'W cenie każdego wdrożenia są dwie rundy poprawek. Testujesz bota przez tydzień i zapisujesz uwagi, my je wdrażamy. Testujesz drugi tydzień i zgłaszasz kolejne, my je wdrażamy, potem finalny odbiór.',
      ],
      stopka: [
        'Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze.',
        'Nowe funkcjonalności, których nie było w pierwszej rozmowie, to rozbudowa projektu i wyceniamy ją osobno.',
      ],
    },
    {
      typ: 'akapit',
      tekst: 'Traktuj te liczby jako ramy, nie automatyczną wycenę. Dwie firmy z tym samym typem bota mogą mieć inny koszt, bo jedna ma uporządkowane treści i prosty proces, a druga pięć systemów, które trzeba ze sobą pogodzić.',
    },
    {
      typ: 'akapit',
      tekst: 'Konkretną wycenę dla Twojego przypadku podajemy na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Co wpływa na cenę chatbota? Pięć rzeczy',
      akapity: [
        'Cena nie bierze się z liczby okienek na ekranie. Bierze się z tego, jak głęboko bot wchodzi w Twoją firmę i ile decyzji ma podejmować. Oto pięć rzeczy, które realnie podnoszą koszt.',
      ],
      punkty: [
        'Integracje: sam czat na stronie jest najtańszy. Każde połączenie z kalendarzem, CRM czy systemem rezerwacji to dodatkowa robota.',
        'Akcje zamiast odpowiedzi: bot, który tylko odpowiada, jest tani. Bot, który umawia, wysyła i aktualizuje dane, kosztuje więcej.',
        'Liczba kanałów: czat na stronie to jedno. Czat plus Messenger plus WhatsApp to trzy razy więcej miejsc do pilnowania.',
        'Jakość danych: uporządkowane treści i procesy skracają wdrożenie. Bałagan w danych je wydłuża i podnosi cenę.',
        'Branża i zgodność: tam, gdzie dane są wrażliwe, dochodzą testy i zabezpieczenia. To więcej pracy, więc wyższy koszt.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Jednorazowo czy w abonamencie: za co się płaci?',
      wariant: 'edge',
      akapity: [
        'Koszt chatbota ma dwie części. Jednorazowy setup to zbudowanie bota: nauczenie go Twoich treści, podłączenie kanałów i systemów, testy.',
        'Opieka miesięczna to utrzymanie: poprawki odpowiedzi, aktualizacje, reakcja kiedy coś po stronie Twoich narzędzi się zmieni. Chatbot to nie mebel, który stawiasz raz i zapominasz. Im lepiej dostrojony, tym lepiej pracuje.',
        'Dlatego przy porównywaniu ofert zawsze pytaj o obie kwoty: za wdrożenie i za miesiąc opieki. Dopiero razem mówią, ile bot naprawdę kosztuje.',
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Jakie są ukryte koszty chatbota?',
    },
    {
      typ: 'akapit',
      tekst: 'Ukryte koszty chatbota rzadko siedzą w cenie wdrożenia. Najwięcej nieporozumień dotyczy tego, co dzieje się po starcie: oferta na tanie wdrożenie często nie mówi, kto będzie bota utrzymywał i za ile.',
    },
    {
      typ: 'akapit',
      tekst: 'A bot zostawiony sam sobie szybko się starzeje: zmieniasz cennik, a on podaje stary. Zmieniasz ofertę, a on o niej nie wie. Oto koszty, o które warto zapytać, zanim podpiszesz.',
    },
    {
      typ: 'lista',
      punkty: [
        'Utrzymanie i poprawki: ktoś musi na bieżąco poprawiać odpowiedzi, które schodzą z tonu albo mijają się z prawdą.',
        'Aktualizacja wiedzy: każda zmiana cennika, oferty czy godzin pracy musi trafić do bota, inaczej wprowadza klientów w błąd.',
        'Abonamenty narzędzi: część rozwiązań liczy opłatę od liczby rozmów, więc rachunek rośnie razem z ruchem na stronie.',
        'Dokładane integracje: połączenie z kalendarzem czy CRM zamawiane po wdrożeniu bywa droższe, niż gdyby zaplanować je od początku.',
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Ile kosztuje utrzymanie chatbota?',
    },
    {
      typ: 'kafle',
      kafle: [
        {
          wartosc: '99-599 zł netto/mies.',
          opis: 'opieka chatbota, gdy projekt zostaje u nas',
        },
        {
          wartosc: '0 zł/mies.',
          opis: 'gdy przekazujemy Ci całą infrastrukturę',
        },
        {
          wartosc: '299-1500 zł netto/mies.',
          opis: 'utrzymanie voicebota, dla porównania',
        },
      ],
    },
    {
      typ: 'akapit',
      tekst: 'U nas utrzymanie chatbota jest policzone z góry: abonament opieki to od 99 do 599 zł netto miesięcznie, zależnie od pakietu. Każde wdrożenie ma opiekę w pakiecie, bo nie zostawiamy klientów z botem bez opieki.',
    },
    {
      typ: 'akapit',
      tekst: 'W ramach opieki poprawiamy odpowiedzi, aktualizujemy wiedzę bota i reagujemy, gdy coś się zmienia po stronie Twoich narzędzi. Wiesz z góry, ile płacisz i za co.',
    },
    {
      typ: 'akapit',
      tekst: 'Opieka nad chatbotem kosztuje mniej niż nad voicebotem, bo chatbot jest prostszy w utrzymaniu: nie ma po jego stronie telefonii, minut rozmów ani rozpoznawania mowy. Przy voicebocie utrzymanie to 299 do 1500 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją do Ciebie.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Nasz chatbot prosty za 1790 zł netto. Co dostajesz?',
      wariant: 'top',
      chip: 'CENNIK',
      akapity: [
        'Ile kosztuje chatbot na stronę w najprostszym wariancie? U nas 1790 zł netto. Najniższy próg wejścia zbudowaliśmy tak, żeby był realny, a efekt widoczny od razu.',
        'Za tę kwotę dostajesz działającego chatbota na swojej stronie, nie prezentację o chatbotach.',
      ],
      punkty: [
        'Chatbot na Twojej stronie www, gotowy do rozmowy z klientami.',
        'Nauczony Twojej wiedzy: oferty, cennika i najczęstszych pytań klientów.',
        'Odpowiada po polsku przez całą dobę i zbiera kontakty do leadów, też wieczorem i w weekend.',
        'Odsyła do właściwych miejsc na Twojej stronie, zamiast zostawiać klienta z ogólnikiem.',
        'Wdrożenie w 1-2 dni robocze od przekazania materiałów i testy na żywo: ustawiasz ton i granice bota.',
        'Dwie rundy poprawek w cenie: tydzień testów, poprawki, drugi tydzień testów, poprawki, odbiór.',
        'Opieka od startu w abonamencie od 99 do 599 zł netto miesięcznie albo 0 zł, gdy przekazujemy Ci infrastrukturę.',
      ],
    },
    {
      typ: 'akapit',
      tekst: 'Potrzebujesz więcej? Chatbot średni z rozbudowaną bazą wiedzy i dodatkowymi funkcjami to 3000 do 6000 zł netto i 3-4 dni robocze. Pełne wdrożenie z integracjami, na przykład z kalendarzem czy CRM, to 8000 do 15000 zł netto i 5-10 dni roboczych, zależnie od liczby elementów do zbudowania.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Nie wiesz, od czego zacząć? Audyt AI za 1490 zł netto',
      wariant: 'quiet',
      chip: 'Audyt AI',
      akapity: [
        'Audyt AI za 1490 zł netto pokaże, gdzie bot da w Twojej firmie największy zwrot. Dostajesz raport PDF z mapą procesów w 5 dni roboczych, a kwotę audytu odliczamy w całości od wdrożenia, gdy ruszamy ze współpracą.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Kiedy chatbot się zwraca?',
      wariant: 'quiet',
      akapity: [
        'Chatbot zwraca się wtedy, kiedy zdejmuje powtarzalną robotę albo łapie leady, które dziś przepadają. Zwrot liczysz prosto: bierzesz czas, który dziś znika na odpowiadaniu na te same pytania, mnożysz przez koszt godziny i porównujesz z kosztem bota.',
        'Do tego dochodzą leady, które dziś giną, bo nikt nie odpisał na czas. Bot odpowiada od razu, też wieczorem i w weekend, więc te zapytania nie wyparowują.',
      ],
    },
    {
      typ: 'cytat',
      tekst: 'Nie płacisz za bota. Płacisz za godziny i leady, które dzięki niemu wracają do firmy.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak nie przepłacić za chatbota?',
      akapity: [
        'Najczęstszy błąd to zamawianie funkcji, których nie użyjesz. Nie zaczynaj od pytania, co bot potrafi. Zacznij od pytania, co Cię najbardziej zatrzymuje.',
        'Jeśli tracisz czas na te same pytania klientów, wystarczy chatbot prosty za 1790 zł netto, gotowy w 1-2 dni robocze. Jeśli gubisz leady wieczorami i chcesz, żeby bot umawiał wizyty, potrzebujesz wdrożenia z integracjami. Wdrażaj wąsko, sprawdź efekt na swoich liczbach i rozszerzaj dopiero wtedy, kiedy pierwszy krok się spina.',
      ],
    },
    {
      typ: 'kroki',
      wariant: 'plytka',
      kroki: [
        {
          tytul: 'Zacznij od jednego problemu, który realnie boli, nie od listy funkcji.',
        },
        {
          tytul: 'Policz zwrot zanim zamówisz: ile godzin i leadów bot odzyska co miesiąc.',
        },
        {
          tytul: 'Wybierz wąski zakres na start, rozszerzaj po pierwszym efekcie.',
        },
        {
          tytul: 'Pytaj o koszt opieki, nie tylko o setup. To opieka decyduje o tym, czy bot działa po roku.',
        },
      ],
    },
    {
      typ: 'akapit',
      tekst: 'Chcesz wiedzieć, ile chatbot kosztowałby w Twoim przypadku i kiedy by się zwrócił? Policz to najpierw w naszym kalkulatorze procesu, a potem umów bezpłatną diagnozę. Pokażemy wycenę na Twoich danych, zanim cokolwiek zamówisz.',
    },
  ],

  faq: [
    {
      pytanie: 'Ile kosztuje chatbot AI dla firmy?',
      odpowiedz:
        'U nas prosty chatbot na stronę kosztuje 1790 zł netto, wdrożenie średnie z rozbudowaną bazą wiedzy i dodatkowymi funkcjami to 3000 do 6000 zł netto, a duże wdrożenie z integracjami, na przykład z kalendarzem czy CRM, to 8000 do 15000 zł netto. Czas wdrożenia to kolejno 1-2, 3-4 i 5-10 dni roboczych, liczonych od przekazania kompletu materiałów. Publiczne cenniki agencji AI w Polsce zaczynają się od 1990 zł i dochodzą do 45000 zł przy dużych wdrożeniach. Do tego trzeba doliczyć utrzymanie: u nas to abonament opieki od 99 do 599 zł netto miesięcznie.',
    },
    /* 2026-08-19 (audyt §1): dwie NOWE pozycje FAQ o czasie wdrożenia i rundach
       poprawek. Powód z audytu: 6 z 7 konkurentów cytowanych przez wyszukiwarki
       AI podaje czas w liczbach, my nie podawaliśmy go nigdzie. FAQ idzie 1:1
       do FAQPage JSON-LD, więc to najkrótsza droga tej informacji do modeli.
       Istniejące pozycje FAQ zostają co do jednej (zakaz usuwania). */
    {
      pytanie: 'Ile trwa wdrożenie chatbota?',
      odpowiedz:
        'Prosty chatbot na stronę robimy w 1-2 dni robocze, wdrożenie średnie w 3-4 dni robocze, a duże z integracjami w 5-10 dni roboczych. Czas liczymy od przekazania kompletu materiałów, czyli bazy wiedzy, treści i dostępów, a nie od podpisania umowy. Dzięki temu wiesz, że termin zależy od jednej rzeczy, na którą oboje mamy wpływ.',
    },
    {
      pytanie: 'Ile poprawek jest w cenie wdrożenia chatbota?',
      odpowiedz:
        'Dwie rundy poprawek są w cenie wdrożenia. Testujesz bota przez tydzień i zapisujesz uwagi, my je wdrażamy. Testujesz drugi tydzień i zgłaszasz kolejne, my je wdrażamy, potem jest finalny odbiór. Poprawki tego, co nie zadziałało po naszej stronie, robimy zawsze, także po odbiorze. Nowe funkcjonalności, których nie było w pierwszej rozmowie, to rozbudowa projektu i wyceniamy ją osobno.',
    },
    {
      pytanie: 'Co wpływa na cenę chatbota?',
      odpowiedz:
        'Pięć rzeczy: liczba integracji z Twoimi systemami, to, czy bot tylko odpowiada, czy też działa, na przykład umawia wizyty, liczba kanałów, jakość Twoich treści i danych oraz branża, w której działasz. Sam czat na stronie jest najtańszy. Każde połączenie z kalendarzem, CRM czy systemem rezerwacji to dodatkowa robota, więc wyższa cena.',
    },
    {
      pytanie: 'Ile kosztuje utrzymanie chatbota?',
      odpowiedz:
        'U nas opieka nad chatbotem to abonament od 99 do 599 zł netto miesięcznie, zależnie od pakietu, gdy projekt zostaje u nas pod opieką, bo nie zostawiamy klientów z botem bez opiekuna. Gdy wolisz wziąć całą infrastrukturę do siebie, nie płacisz nam abonamentu w ogóle. W ramach opieki poprawiamy odpowiedzi, aktualizujemy wiedzę bota i reagujemy na zmiany w Twoich narzędziach. Chatbot jest prostszy w utrzymaniu niż voicebot, dlatego kosztuje mniej: przy voicebocie utrzymanie to 299 do 1500 zł netto miesięcznie albo 0 zł, gdy przekazujemy infrastrukturę klientowi. Na rynku abonamenty narzędzi i utrzymania to zwykle od około 100 do 2500 zł miesięcznie.',
    },
    {
      pytanie: 'Czy przy chatbocie są ukryte koszty?',
      odpowiedz:
        'Bywają, dlatego pytaj o nie przed zamówieniem. Najczęstsze to utrzymanie i poprawki po starcie, aktualizacja wiedzy bota po każdej zmianie oferty czy cennika oraz abonamenty narzędzi, które rosną z liczbą rozmów. U nas cena wdrożenia i abonament opieki od 99 do 599 zł netto miesięcznie, gdy projekt zostaje u nas, są podane z góry, a dwie rundy poprawek są w cenie wdrożenia, więc nie doliczamy ich osobno. Wiesz, ile płacisz i za co.',
    },
    {
      pytanie: 'Kiedy chatbot zwraca się firmie?',
      odpowiedz:
        'Wtedy, kiedy zdejmuje powtarzalną robotę albo łapie leady, które dziś przepadają. Policz godziny, które dziś znikają na tych samych pytaniach, pomnóż przez koszt godziny i dodaj leady tracone poza godzinami pracy. Bot odpowiada od razu, też wieczorem i w weekend, więc te zapytania nie wyparowują.',
    },
    {
      pytanie: 'Jak nie przepłacić za chatbota?',
      odpowiedz:
        'Nie zamawiaj funkcji, których nie użyjesz. Zacznij od jednego problemu, który realnie boli, wybierz wąski zakres, policz zwrot i rozszerzaj dopiero po pierwszym efekcie. Pytaj o koszt opieki, nie tylko o setup, bo to opieka decyduje, czy bot działa po roku.',
    },
  ],

  queries: [
    'ile kosztuje chatbot dla firmy',
    'ile kosztuje chatbot ai dla firmy',
    'cena chatbota 2026',
    'ile kosztuje chatbot na stronę',
    'chatbot dla firmy koszt',
    'ile kosztuje utrzymanie chatbota',
    'ukryte koszty chatbota',
    /* 2026-08-19: nowe money query pod czas wdrożenia (audyt §1, luka „czas
       w liczbach"). Odpowiedź stoi w tabeli, w akapicie o zasadach liczenia
       czasu i w FAQ „Ile trwa wdrożenie chatbota?". */
    'ile trwa wdrożenie chatbota',
  ],

  powiazaneUslugi: [
    {
      etykieta: 'Chatboty dla firm',
      href: '/uslugi/chatboty',
      opis: 'Zobacz, jak budujemy chatboty od 1790 zł netto, które odpowiadają 24/7 i zbierają leady.',
    },
    {
      etykieta: 'Audyt AI: mapa oszczędności czasu',
      href: '/uslugi/audyt-ai',
      opis: 'Za 1490 zł netto w 5 dni roboczych zobaczysz, gdzie AI da największy zwrot, a kwotę odliczamy od wdrożenia.',
    },
  ],

  powiazaneNarzedzia: [
    {
      etykieta: 'Kalkulator procesu',
      href: '/narzedzia#kalkulator-procesu',
      opis: 'Policz, ile czasu zżera Cię ręczna obsługa pytań i ile odzyska bot.',
    },
  ],

  /* SEO 2026-08-17: blok „Zobacz też" — dwa pozostałe poradniki cenowe. */
  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje wdrożenie AI agenta dla firmy',
      href: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
      opis: 'Widełki 2026 dla agenta AI, od czego zależy cena i jak policzyć zwrot.',
    },
    {
      etykieta: 'Ile kosztuje automatyzacja AI w firmie',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
      opis: 'Realne widełki wdrożeń automatyzacji i to, od czego zależy cena.',
    },
  ],

  /* v22 (PLAN-v22 §1.5): grupa „Zobacz to na wdrożeniu". Dwa wdrożenia
     chatbotowe z rejestru realizacji, czyli dowód pod poradnikiem o cenie
     chatbota (relacja poradnik -> realizacja była przed rundą 0/4).
     ETYKIETA I OPIS PRZEPISANE ZNAK W ZNAK z rejestru lib/realizacje:
     etykieta = `h1`, opis = `metaDescription`. Treść poradnika bez zmian. */
  powiazaneRealizacje: [
    {
      etykieta: 'Chatbot edukacyjny do kursów online',
      href: '/realizacje/chatbot-edukacyjny-kursy',
      opis: 'Chatbot edukacyjny dla Instytutu Kryptografii: kursanci natychmiast znajdują właściwą lekcję w setkach materiałów VOD, bez przeszukiwania. Case study.',
    },
    {
      etykieta: 'Firmowi Agenci AI 24/7',
      href: '/realizacje/agenci-ai-24-7',
      opis: 'Agenci AI na firmowej stronie: znają strukturę firmy i odpowiadają nowym leadom całą dobę, bez nadzoru. Case study: żaden lead nie zostaje bez odpowiedzi.',
    },
  ],
};
