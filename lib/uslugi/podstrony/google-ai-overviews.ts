import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 2 — GOOGLE AI OVERVIEWS
 * (`/uslugi/optymalizacja/google-ai-overviews`).
 * Fraza primary: „jak wyświetlać się w Google AI Overviews"
 * (pakiet `.seo-przeglad/pakiety/geo.md` §P3, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja` i siostry `audyt-widocznosci-w-ai`):
 *  - RODZIC sprzedaje CAŁY proces w czterech silnikach AI naraz: cztery etapy
 *    naprawy, autorytet poza stroną, pomiar co tydzień, cena od zakresu.
 *  - SIOSTRA `audyt-widocznosci-w-ai` sprzedaje pierwszy, płatny krok pomiaru.
 *  - TA STRONA odpowiada WYŁĄCZNIE za ekosystem Google: podsumowania AI
 *    w wyszukiwarce (AI Overviews) plus aplikacja Gemini. Jako jedyna w całym
 *    serwisie łączy pozycję organiczną z cytowaniem w odpowiedzi AI i jako
 *    jedyna prostuje nieporozumienie Google-Extended kontra Googlebot.
 *    Kończy się jedną decyzją: sprawdzamy, czy jesteś w AI Overviews.
 *  - NIE MA TU I BYĆ NIE MOŻE: mechaniki ChatGPT i Perplexity (osobne
 *    podstrony), opisu autorytetu poza stroną i pomiaru w rytmie tygodnia
 *    (rodzic), opisu zawartości raportu z audytu (siostra).
 *  - LINK do `/uslugi/optymalizacja/chatgpt` (§P2, punkt 11 konspektu) wchodzi
 *    od rundy 2026-08-31, bo tamta trasa stoi już w rejestrze podstron.
 *    Sam LINK, nie treść: mechanika ChatGPT zostaje na tamtej stronie.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P3, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami),
 *  - H1 i H2 sekcji problemu: pakiet §P3 nagłówek i punkt 1,
 *  - mechanika AI Overview (odpowiedź nad wynikami, brak kliknięcia,
 *    pozycja organiczna plus treść do wycięcia): pakiet §P3 kapsuła i FAQ,
 *  - rozdział Google-Extended (modele Gemini) kontra Googlebot (podsumowania
 *    AI w wyszukiwarce): pakiet §P3 kapsuła, FAQ pytanie 3 oraz §N4 krok 4,
 *  - co zmieniamy na stronie (odpowiedź w pierwszym akapicie, nagłówki jak
 *    pytania, dane strukturalne, widoczne daty, zamknięte akapity):
 *    pakiet §P3 punkt 6 i FAQ „Co zmieniacie na stronie",
 *  - case Fichtelgebirgshaus.de i Trockenhaus: pakiet §P3 punkt 8 i FAQ
 *    „Czy macie na to dowód", zgodne z `lib/uslugi/optymalizacja.ts`
 *    i z `lib/realizacje` (dwa opublikowane case'y),
 *  - cennik i czasy: pakiet §P3 punkt 9 odsyła WPROST do §N8 („te same
 *    pozycje co w N8"), więc tabela cen jest przepisana z tabeli §N8,
 *  - „kiedy to nie ma sensu": pakiet §N11, cztery sytuacje przełożone
 *    z całej usługi na sam ekosystem Google,
 *  - zdania kontraktowe (uwaga wdrożeniowa §8) użyte bez zmian: „odliczane
 *    od wdrożenia", „dwie rundy poprawek w cenie wdrożenia", „od 5900 zł".
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1490 zł netto i 5 dni roboczych (Sprint Diagnostyczny), 1590 zł netto
 *  i 1 dzień roboczy (landing), 2900 zł netto i 2-4 dni robocze (strona
 *  biznesowa), od 5900 zł netto i 5-10 dni roboczych (strona zaawansowana),
 *  dwie rundy poprawek w cenie wdrożenia, pierwsza dziesiątka Google
 *  (Fichtelgebirgshaus.de), pierwsza trójka Google (Trockenhaus).
 *  Wszystkie kwoty zawsze z dopiskiem netto.
 *  UWAGA: czas „2-4 dni robocze" dla strony biznesowej NIE stoi w §P3, tylko
 *  w §N8, na który §P3 punkt 9 odsyła wprost. Jedyna liczba z tej strony
 *  spoza wycinka P3, świadomie i z podanym źródłem.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ŻADNEJ liczby
 *  o skali AI Overviews (ile zapytań je pokazuje, o ile spada CTR, jaki
 *  procent ruchu znika) ani terminu wejścia do AI Overview. Dlatego spadek
 *  ruchu opisujemy mechanizmem, a nie procentem, a czas do efektu jednym
 *  zdaniem z FAQ: zależy od konkurencji w Twojej branży.
 *
 * ZAKAZANE NA TEJ STRONIE: gwarancja miejsca w AI Overview, procent utraty
 * ruchu, liczba zapytań z podsumowaniem AI, obietnica terminu wejścia do
 * odpowiedzi, kwoty poza sekcją ceny (uwaga wdrożeniowa §6). Wyjątki
 * dopuszczone tak samo jak na siostrzanej podstronie audytu: metaTitle
 * i mikrokopia CTA. W kartach „Powiązane" kwot NIE MA (kontrola 2026-08-31
 * wycięła stamtąd 1490 zł, opis niesie dziś zawartość raportu).
 *
 * ZAKAZANE TEŻ ODNIESIENIA CZASOWE BEZ ŹRÓDŁA: pakiet nie podaje, od kiedy
 * ruch spada, więc sekcja problemu mówi „wcześniej", nigdy „pół roku temu"
 * ani „rok temu" (kontrola 2026-08-31 wycięła oba).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO),
 * a renderuje się TYMI SAMYMI komponentami co strony usług i pozostałe
 * podstrony. Zero nowych typów bloków, zero nowego CSS.
 */
export const googleAiOverviews: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'google-ai-overviews',
  dataAktualizacji: '2026-08-31',

  /* H1 1:1 z pakietu §P3. */
  h1: 'Jak trafić do odpowiedzi AI w Google (AI Overviews)',

  /* KAPSUŁA 1:1 Z PAKIETU §P3 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w takiej formie,
     w jakiej zostało zatwierdzone. Niesie komplet tej strony: czym jest
     AI Overview, jakie dwa warunki trzeba spełnić naraz i gdzie leży
     najczęstsze nieporozumienie o Google-Extended. */
  kapsula:
    'AI Overview to odpowiedź wygenerowana przez AI, którą Google pokazuje nad zwykłymi wynikami. Żeby się w niej pojawić, potrzebujesz dwóch rzeczy naraz: mocnej pozycji organicznej i treści, z której da się wyciąć gotowe zdanie. Dlatego pracujemy jednocześnie nad SEO i nad strukturą odpowiedzi. Uwaga na jedno nieporozumienie: wpis Google-Extended w robots.txt dotyczy modeli Gemini, a nie podsumowań AI w samej wyszukiwarce. Tam decyduje zwykły Googlebot.',

  /* metaTitle: pakiet §P3 dawał 33 znaki, konwencja repo (lib/uslugi/types.ts)
     mówi 50-60. Decyzja właściciela z 2026-08-31: trzymamy konwencję repo.
     Fraza główna zostaje NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakt
     z tej strony (najniższa pozycja cennika, stoi w tabeli cen i w FAQ).
     Długość 51 znaków. Layout dokleja sufiks marki, więc w SERP wychodzi
     „Jak trafić do Google AI Overviews: od 1490 zł netto · SimpleFast.ai". */
  metaTitle: 'Jak trafić do Google AI Overviews: od 1490 zł netto',
  /* 159 znaków (limit 160). Zero hedgingu, wyróżnik to rozdział Google-Extended
     kontra Googlebot, czyli jedyna rzecz, której nie ma na żadnej innej naszej
     stronie. */
  metaDescription:
    'Jak trafić do Google AI Overviews: liczy się mocna pozycja organiczna i treść, z której da się wyciąć zdanie. Google-Extended dotyczy Gemini, nie AI Overviews.',

  problem: {
    /* H2 1:1 z pakietu §P3 punkt 1. */
    h2: 'Ruch z Google spadł, a pozycje stoją w miejscu?',
    tresc:
      'Raport pozycji wygląda tak samo jak wcześniej, a w statystykach ubywa wejść. To nie jest sprzeczność: część odpowiedzi jest teraz udzielana nad wynikami, więc kliknięcie przestało być potrzebne.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Pozycja mówi, gdzie stoisz na liście. Nie mówi, czy ktokolwiek do tej listy zszedł. Jeśli nad nią stoi gotowa odpowiedź, użytkownik dostaje swoje i kończy wyszukiwanie.',
      },
      {
        typ: 'naglowek',
        tekst: 'Czym jest AI Overview i dlaczego zabiera kliknięcia?',
        ikona: 'lupa-wykres',
        chip: 'GOOGLE',
        overline: 'ODPOWIEDŹ NAD WYNIKAMI',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Odpowiedź stoi nad wynikami',
            akapity: [
              'AI Overview to odpowiedź wygenerowana przez AI, którą Google wyświetla nad listą wyników. Zanim użytkownik zobaczy pierwszy link, ma już zdanie na temat.',
            ],
          },
          {
            naglowek: 'Kliknięcie przestaje być potrzebne',
            akapity: [
              'Użytkownik często dostaje to, czego szukał, bez klikania w żaden link. Twoja treść mogła zostać użyta w tej odpowiedzi i tak samo mogła zostać pominięta.',
            ],
          },
          {
            naglowek: 'Pozycja została, ruch nie',
            akapity: [
              'Dlatego te same pozycje potrafią dawać dziś mniej wejść niż wcześniej. Zmieniło się nie miejsce na liście, tylko to, ile osób po tę listę sięga.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego raport pozycji tego nie pokaże?',
        akapity: [
          'Raport pozycji mierzy jedną rzecz: gdzie stoisz na frazę. Nie sprawdza, czy nad wynikami pojawiło się podsumowanie AI ani czy padło w nim Twoje zdanie.',
          'Żeby to zobaczyć, trzeba zadać pytanie tak, jak zadaje je klient, i sprawdzić, co Google pokazuje nad wynikami. To inna miara niż pozycja i jedna nie zastępuje drugiej.',
        ],
        wariant: 'edge',
        chip: 'DIAGNOZA',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Skąd Google bierze zdania do odpowiedzi AI?',
    tresc:
      'Do AI Overview trzeba dwóch rzeczy naraz: mocnej pozycji organicznej i treści, z której da się wyciąć gotowe zdanie. Dlatego pracujemy jednocześnie nad SEO i nad strukturą odpowiedzi, a nie osobno.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Jaki związek ma pozycja organiczna z cytatem w AI Overview?',
        ikona: 'wykres-strzalka',
        chip: 'AI OVERVIEWS',
        overline: 'DWA WARUNKI NARAZ',
      },
      {
        typ: 'akapit',
        tekst:
          'Nie musisz być w pierwszej trójce, żeby trafić do AI Overview, ale mocna pozycja organiczna bardzo pomaga. Dlatego robimy SEO i przygotowanie pod cytowanie w jednym ruchu: samo SEO daje pozycję bez zdania do wycięcia, a samo przepisanie treści daje zdanie, którego Google nie ma skąd wziąć.',
      },
      {
        typ: 'naglowek',
        tekst: 'Gdzie kończy się wyszukiwarka, a zaczyna Gemini?',
        ikona: 'glob-siatka',
        chip: 'EKOSYSTEM GOOGLE',
        overline: 'DWA MIEJSCA · DWA USTAWIENIA',
      },
      {
        typ: 'przelacznik',
        grupa: 'google-ai-overviews-ekosystem',
        opcje: [
          {
            numer: 'MIEJSCE 1',
            tytul: 'AI Overviews',
            podtytul: 'w wyszukiwarce',
            naglowek: 'Podsumowanie AI nad listą wyników Google.',
            akapity: [
              'To ta odpowiedź, którą użytkownik widzi jako pierwszą, jeszcze nad linkami. Za dostęp do niej odpowiada zwykły Googlebot, ten sam, który indeksuje Twoją stronę do wyników organicznych.',
            ],
            punkty: [
              'decyduje Googlebot, nie osobne ustawienie dla modeli',
              'mocna pozycja organiczna bardzo pomaga',
              'liczy się treść, z której da się wyciąć gotowe zdanie',
            ],
          },
          {
            numer: 'MIEJSCE 2',
            tytul: 'Aplikacja Gemini',
            podtytul: 'poza wyszukiwarką',
            naglowek: 'Modele Google używane poza samą wyszukiwarką.',
            akapity: [
              'Tu użytkownik nie wpisuje frazy w wyszukiwarkę, tylko rozmawia z modelem. O to, czy Twoja treść zasila modele Gemini, decyduje osobny wpis w pliku robots.txt.',
            ],
            punkty: [
              'decyduje wpis Google-Extended',
              'to ustawienie nie rządzi podsumowaniami AI w wyszukiwarce',
              'dlatego pilnujemy obu miejsc, a nie jednego',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co naprawdę wyłącza wpis Google-Extended?',
        akapity: [
          'Google-Extended decyduje o jednej rzeczy: czy Twoja treść zasila modele Gemini. Nie wyłącza Cię z podsumowań AI w samej wyszukiwarce, bo tam decyduje zwykły Googlebot.',
          'To najczęstsze nieporozumienie, jakie widzimy w tym temacie. Firma blokuje Google-Extended, myśląc, że wypisuje się z AI Overviews, i nie zmienia w nich nic. Zablokowanie Googlebota faktycznie by je wyłączyło, tylko razem z wynikami organicznymi, bo obu pilnuje ten sam robot.',
        ],
        punkty: [
          'Google-Extended: zasilanie modeli Gemini.',
          'Googlebot: wyniki organiczne i podsumowania AI w wyszukiwarce.',
          'To dwa osobne wpisy w pliku robots.txt i dwie osobne decyzje.',
        ],
        wariant: 'edge',
        chip: 'ROBOTS.TXT',
        stopka: [
          'Sprawdzamy oba wpisy, zanim cokolwiek zmienimy w Twoim pliku robots.txt.',
          'Każdą zmianę w dostępie botów omawiamy z Tobą wcześniej, bo to Twoja decyzja.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy mamy na to wynik w samym Google?',
        akapity: [
          'Fichtelgebirgshaus.de weszło do pierwszej dziesiątki Google na frazy zapisane w umowie, a jego treść jest cytowana także przez GPT. Zakres frazowy był ustalony na piśmie przed startem, więc ten wynik sprawdzisz fraza po frazie.',
          'Trockenhaus przeszedł ze stanu bez widoczności do pierwszej trójki na frazę Trockenhaus. Serwis jest niewielki, co mówimy wprost: zadziałał konkret w treści, a nie rozmiar strony.',
        ],
        wariant: 'top',
        chip: 'DOWÓD',
        meta: 'dwa wdrożenia na rynku niemieckim',
        stopka: [
          'Oba przypadki opisaliśmy osobno w realizacjach, więc możesz je sprawdzić przed zamówieniem.',
          'To pozycja organiczna, czyli dokładnie ta baza, na której Google buduje odpowiedź AI.',
        ],
      },
    ],
  },

  /* Kolumny opisują DWIE MIARY, nie dwie firmy: po lewej to, co mierzy
     klasyczne SEO, po prawej to, co mierzymy dokładając przygotowanie pod
     podsumowania AI. Zero ocen cudzej roboty. Komórki krótkie (konwencja v20
     podstron), żeby wiersze nie łamały się na wąskich ekranach.
     Trzy pierwsze wiersze to cel, miara i czas do efektu z konspektu §P3
     punkt 7; trzy kolejne pokazują, gdzie ta różnica siada w treści. */
  tabelaPorownawcza: {
    h2: 'Pozycja w wynikach a zdanie w AI Overview',
    naglowekBez: 'Klasyczne SEO w Google',
    naglowekZNami: 'Przygotowanie pod AI Overviews',
    wiersze: [
      {
        cecha: 'Cel',
        bez: 'Wysoko na liście wyników',
        zNami: 'Zdanie w odpowiedzi nad wynikami',
      },
      {
        cecha: 'Miara',
        bez: 'Pozycja na frazę',
        zNami: 'Czy Twoja treść pada w AI Overview',
      },
      {
        cecha: 'Czas do efektu',
        bez: 'Zależy od konkurencji w branży',
        zNami: 'Zależy od tej samej konkurencji, bo bazą jest pozycja',
      },
      {
        cecha: 'Format treści',
        bez: 'Tekst pisany pod kliknięcie',
        zNami: 'Zamknięte akapity gotowe do wycięcia',
      },
      {
        cecha: 'Nagłówki',
        bez: 'Nagłówki z frazą',
        zNami: 'Nagłówki w formie pytań klienta',
      },
      {
        cecha: 'Kto decyduje o dostępie',
        bez: 'Googlebot',
        zNami: 'Też Googlebot, nie Google-Extended',
      },
    ],
  },

  /* Konspekt §P3 punkt 6 wymienia cztery zmiany, a kontrakt szablonu wymusza
     trzy kroki. Świeżość i widoczne daty idą razem z danymi strukturalnymi,
     bo to jedna praca po stronie kodu strony. Komplet czterech zmian stoi
     dosłownie w FAQ „Co zmieniacie na stronie", więc żaden fakt nie ginie. */
  kroki: {
    h2: 'Co zmieniamy na stronie, żeby Google miał co zacytować?',
    items: [
      {
        tytul: 'Odpowiedź w pierwszym akapicie',
        opis:
          'Odpowiedź wprost idzie na samą górę, zaraz pod nagłówek. Model ma wyjąć gotowy fragment bez czytania całej strony, więc pierwszy akapit musi być samowystarczalny.',
      },
      {
        tytul: 'Nagłówki jak pytania i zamknięte akapity',
        opis:
          'Nagłówki formułujemy tak, jak pytanie zadaje klient, a każdy akapit zamykamy w jedną myśl. Taki akapit da się zacytować bez kontekstu, a właśnie tego szuka Google.',
      },
      {
        tytul: 'Dane strukturalne, świeżość i daty',
        opis:
          'Dane strukturalne mówią maszynie wprost, co jest firmą, co usługą, a co pytaniem i odpowiedzią. Do tego widoczne daty aktualizacji, bo treść bez śladu świeżości wypada z gry pierwsza.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje i ile trwa przygotowanie pod AI Overviews?',
    tresc:
      'Zaczynamy od Sprintu Diagnostycznego: 1490 zł netto, 5 dni roboczych, kwota odliczana od wdrożenia. Potem strona lub przebudowa treści, wyceniana od zakresu: landing 1590 zł, strona biznesowa 2900 zł, strona zaawansowana od 5900 zł netto.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1490 zł netto',
            opis: 'Sprint Diagnostyczny, kwota odliczana od wdrożenia',
            zrodlo: 'pytanie „Ile to kosztuje" w FAQ',
            ton: 'cyan',
          },
          {
            wartosc: '5 dni roboczych',
            opis: 'tyle trwa Sprint Diagnostyczny',
            zrodlo: 'pytanie „Ile to trwa" w FAQ',
            ton: 'violet',
          },
          {
            wartosc: '1590 zł netto',
            opis: 'landing pisany pod cytowanie, 1 dzień roboczy',
            zrodlo: 'tabela cennika niżej',
            ton: 'green',
          },
          {
            wartosc: 'od 5900 zł netto',
            opis: 'strona zaawansowana, 5-10 dni roboczych',
            zrodlo: 'tabela cennika niżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Cztery pozycje cennika i czas każdej z nich',
        ikona: 'kalkulator',
        chip: 'CENNIK',
        overline: 'WSZYSTKIE KWOTY NETTO',
      },
      {
        typ: 'tabela',
        naglowki: ['Co kupujesz', 'Ile kosztuje netto', 'Ile trwa'],
        wiersze: [
          ['Sprint Diagnostyczny, czyli audyt AI', '1490 zł, odliczane od wdrożenia', '5 dni roboczych'],
          ['Landing pisany pod cytowanie', '1590 zł', '1 dzień roboczy'],
          ['Strona biznesowa pod cytowanie', '2900 zł', '2-4 dni robocze'],
          ['Strona zaawansowana', 'od 5900 zł', '5-10 dni roboczych'],
        ],
        wKarcie: true,
        podpis:
          'Cennik przygotowania strony pod AI Overviews: cztery pozycje, wszystkie kwoty netto',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dostajesz w cenie wdrożenia?',
        akapity: [
          'Kwotę za Sprint Diagnostyczny odliczamy w całości od ceny wdrożenia. Płacisz za nią raz, nie dwa razy.',
        ],
        punkty: [
          'Dwie rundy poprawek w cenie wdrożenia: tydzień Twoich testów, poprawki, drugi tydzień testów, poprawki, odbiór.',
          'Funkcje, o których nie było mowy na pierwszej rozmowie, wyceniamy osobno.',
          'Po odbiorze nie ma abonamentu. Strona i wszystkie pliki zostają u Ciebie.',
        ],
        wariant: 'top',
        chip: 'WARUNKI',
        meta: 'wszystkie kwoty netto',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy to nie ma sensu?',
        akapity: [
          'Wolimy stracić zlecenie niż wziąć pieniądze za pracę, która u Ciebie niczego nie zmieni. Mówimy to przed zamówieniem, nie po.',
        ],
        punkty: [
          'Strona stoi w kreatorze, w którym nie da się ruszyć kodu ani pliku robots.txt: nie ma czego przepisać ani gdzie dołożyć danych strukturalnych.',
          'Sprzedajesz wyłącznie z poleceń i tak chcesz zostać: obecność w odpowiedziach Google nie da Ci nic poza rachunkiem.',
          'Potrzebujesz efektu w tydzień: raport masz po 5 dniach roboczych, ale efekt w wynikach Google zależy od konkurencji w Twojej branży.',
          'Chcesz gwarancji miejsca w AI Overview: nikt uczciwy jej nie da, my też nie. Gwarantujemy wykonanie prac i pomiar przed i po.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz siebie w którymś z tych punktów? Napisz i tak.',
          'Powiemy, co zrobić zamiast, nawet jeśli to nie będzie usługa u nas.',
        ],
      },
    ],
    /* Najniższa pozycja cennika tej strony (Sprint Diagnostyczny). Bez
       `cenaStala`, bo przebudowa treści ma trzy progi i realnie jest to
       widełki „od", inaczej niż na podstronie samego audytu. */
    minPrice: 1490,
    /* Powrót do rodzica jednym zdaniem: ta strona kończy się decyzją o Google,
       a pozostałe silniki AI i pracę w rytmie opisuje `/uslugi/optymalizacja`. */
    linkPoradnik: {
      przed: 'Pozostałe silniki AI, autorytet poza stroną i pomiar w rytmie opisaliśmy na stronie ',
      etykieta: 'pozycjonowanie pod AI',
      po: '.',
      href: '/uslugi/optymalizacja',
    },
  },

  /* KOMPLET 8 PYTAŃ 1:1 Z PAKIETU §P3 („GOTOWE FAQ"). Kolejność, pytania
     i odpowiedzi bez zmian: ten sam tekst idzie na stronę i do FAQPage JSON-LD,
     więc każda edycja tutaj rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Co to jest AI Overview w Google?',
      odpowiedz:
        'To odpowiedź wygenerowana przez AI, którą Google wyświetla nad listą wyników. Użytkownik często dostaje to, czego szukał, bez klikania w żaden link.',
    },
    {
      pytanie: 'Dlaczego mam te same pozycje, a mniej ruchu z Google?',
      odpowiedz:
        'Bo część odpowiedzi jest teraz udzielana nad wynikami. Pozycja się nie zmieniła, ale kliknięcie już nie jest potrzebne, żeby użytkownik dostał odpowiedź.',
    },
    {
      pytanie: 'Czy blokada Google-Extended wyłącza mnie z AI Overviews?',
      odpowiedz:
        'Nie. Google-Extended decyduje o zasilaniu modeli Gemini. Podsumowania AI w wyszukiwarce korzystają ze zwykłego Googlebota, więc to osobne ustawienie.',
    },
    {
      pytanie: 'Czy muszę być w TOP 3, żeby trafić do AI Overview?',
      odpowiedz:
        'Nie musisz, ale mocna pozycja organiczna bardzo pomaga. Dlatego robimy SEO i przygotowanie pod cytowanie w jednym ruchu, a nie osobno.',
    },
    {
      pytanie: 'Co zmieniacie na stronie?',
      odpowiedz:
        'Odpowiedź wprost w pierwszym akapicie, nagłówki w formie pytań klienta, dane strukturalne, widoczne daty aktualizacji i zamknięte akapity, które da się zacytować bez kontekstu.',
    },
    {
      pytanie: 'Ile to trwa?',
      odpowiedz:
        'Sprint Diagnostyczny 5 dni roboczych, przebudowa treści od 1 dnia (landing) do 5-10 dni (strona zaawansowana). Efekt w wynikach Google zależy od konkurencji w Twojej branży.',
    },
    {
      pytanie: 'Czy macie na to dowód?',
      odpowiedz:
        'Fichtelgebirgshaus.de weszło do pierwszej dziesiątki Google na frazy zapisane w umowie, a treść jest cytowana także przez GPT. Trockenhaus przeszedł ze stanu bez widoczności do pierwszej trójki na frazę Trockenhaus.',
    },
    {
      pytanie: 'Ile to kosztuje?',
      odpowiedz:
        'Sprint Diagnostyczny 1490 zł netto, odliczany od wdrożenia. Strona lub przebudowa treści: landing 1590 zł, biznesowa 2900 zł, zaawansowana od 5900 zł netto.',
    },
  ],

  /* Jedna decyzja domykająca stronę (konspekt §P3 punkt 13): sprawdzamy, czy
     jesteś w AI Overviews. Mikrokopia powtarza pierwszy krok i jego warunki,
     bo to ostatnie zdanie przed kliknięciem. */
  cta: {
    label: 'Sprawdź, czy jesteś w AI Overviews',
    href: '#diagnoza',
    mikrokopia:
      'Zaczynamy od Sprintu Diagnostycznego: 1490 zł netto, 5 dni roboczych, kwota odliczana w całości od wdrożenia.',
    dowod:
      'Fichtelgebirgshaus.de: pierwsza dziesiątka Google na frazy zapisane w umowie. Trockenhaus: wejście do pierwszej trójki na frazę Trockenhaus.',
  },

  queries: [
    'jak wyświetlać się w Google AI Overviews',
    'Google AI Overviews',
    'jak trafić do AI Overview',
    'AI Overviews optymalizacja strony',
    'Google-Extended robots.txt',
    'spadek ruchu z Google przez AI Overviews',
    'Gemini a AI Overviews',
  ],

  /* POWIĄZANIA (konspekt §P3 punkt 11 plus uwaga wdrożeniowa §3: każda
     podstrona linkuje z powrotem do rodzica). RUNDA 2026-08-31: komplet trzech
     celów konspektu stoi na miejscu. „Pozycjonowanie w ChatGPT" było odłożone,
     dopóki tamta trasa nie była w rejestrze podstron; dziś jest, więc link
     wchodzi. Do tego siostra `audyt-widocznosci-w-ai` i dwa case'y Google,
     które ta strona cytuje w treści. W opisach kart ZERO kwot (uwaga
     wdrożeniowa §6). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Cały proces poza samym Google: cztery etapy naprawy, autorytet poza stroną i pomiar cytowań co tydzień w czterech silnikach AI.',
      },
      {
        etykieta: 'Jak sprawić, żeby ChatGPT polecał Twoją firmę',
        href: '/uslugi/optymalizacja/chatgpt',
        opis: 'Drugi ekosystem, osobna mechanika: zamknięte odpowiedzi na pytania klienta, spójna encja firmy i dostęp dla GPTBot w robots.txt.',
      },
      {
        etykieta: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',
        href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
        opis: 'Pierwszy krok przed przebudową treści: raport PDF z pomiarem zerowym, listą priorytetów i planem wdrożenia.',
      },
      {
        etykieta: 'Tworzenie stron WWW widocznych w Google i w AI',
        href: '/uslugi/strony-www',
        opis: 'Gdy strona stoi w kreatorze i nie da się ruszyć kodu ani pliku robots.txt, budujemy nową, od razu ułożoną pod cytowanie.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Strona w pierwszej dziesiątce Google i widoczna w GPT',
        href: '/realizacje/top10-google-i-widocznosc-w-gpt',
        opis: 'Fichtelgebirgshaus.de: frazy umówione w umowie w pierwszej dziesiątce Google, plus widoczność w GPT.',
      },
      {
        etykieta: 'Z niewidocznej strony do pierwszej trójki w Google',
        href: '/realizacje/z-niewidocznej-strony-do-top3-google',
        opis: 'Trockenhaus: z braku widoczności do pierwszej trójki na frazę Trockenhaus.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis: 'Dziesięć pytań o Twojej stronie pokazuje, czy ChatGPT i Perplexity mogą ją cytować, i co naprawić najpierw.',
      },
    ],
  },
};
