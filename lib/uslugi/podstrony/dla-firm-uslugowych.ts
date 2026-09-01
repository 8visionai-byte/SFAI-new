import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA OPTYMALIZACJI 8 — WIDOCZNOŚĆ W AI DLA FIRM USŁUGOWYCH
 * (`/uslugi/optymalizacja/dla-firm-uslugowych`).
 * Fraza primary: „pozycjonowanie w AI dla firm usługowych" (pakiet
 * `.seo-przeglad/pakiety/geo.md` §P8, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/optymalizacja` i siostry `audyt-widocznosci-w-ai`):
 *  - RODZIC opisuje METODĘ: cztery etapy pracy (dostęp botów, treść pod cytat,
 *    świeżość, autorytet poza stroną) plus pomiar co tydzień w czterech
 *    silnikach AI. Jego H2 brzmią „Klienci pytają AI, a AI poleca kogoś
 *    innego?", „Jak sprawiamy, że AI zaczyna Cię cytować?", „Jak wygląda
 *    optymalizacja pod AI krok po kroku?", „Ile kosztuje pozycjonowanie
 *    pod AI?". ŻADNEGO z nich tu nie powtarzamy.
 *  - TA STRONA opisuje SYTUACJĘ jednej grupy klientów: usługa lokalna, klient
 *    pyta model „kogo polecasz w moim mieście", a odpowiedź stoi w dużej
 *    mierze poza stroną (wizytówka, opinie, katalogi, rankingi, fora). Cała
 *    warstwa lokalna jest TYLKO tutaj, nigdzie indziej w serwisie jej nie ma.
 *  - SIOSTRA `audyt-widocznosci-w-ai` sprzedaje sam pomiar i jego siedem
 *    punktów. Tu pomiaru nie opisujemy punkt po punkcie: linkujemy do niej.
 *  - Strona kończy się JEDNĄ decyzją: sprawdzamy, kogo model poleca dziś
 *    w Twoim mieście (start = Sprint Diagnostyczny).
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła: pakiet §P8 „GOTOWA KAPSUŁA", przeniesiona DOSŁOWNIE (treść
 *    zatwierdzona, nie wolno jej przepisywać własnymi słowami),
 *  - H1 i H2 sekcji problemu: pakiet §P8 (H1 oraz sekcja 1), 1:1,
 *  - sześć źródeł odpowiedzi lokalnej (wizytówka Google, opinie, katalogi
 *    branżowe, rankingi, wątki na forach oraz sama strona): pakiet §P8
 *    sekcja 2 plus zdanie kapsuły „to jedno z sześciu źródeł",
 *  - różnica wobec pozycjonowania lokalnego w Google: pakiet §P8 sekcja 3,
 *  - co zmieniamy (opis usług językiem pytań klienta, zakres i warunki wprost
 *    na stronie, spójne dane firmy we wszystkich miejscach, opinie, dane
 *    strukturalne): pakiet §P8 sekcja 4,
 *  - kolejność pracy (najpierw spójność danych, dopiero potem treść na
 *    stronie): zdanie kapsuły §P8,
 *  - Lenart Motors (warsztat blacharsko lakierniczy premium, ChatGPT wskazuje
 *    firmę około trzy tygodnie po publikacji nowej strony): pakiet §P8
 *    sekcja 5 i kapsuła, zgodne z `lib/uslugi/optymalizacja.ts`
 *    i `lib/realizacje` (/realizacje/strona-cytowana-przez-chatgpt),
 *  - branże, w których działa najszybciej (wysoka wartość jednego klienta,
 *    wybór po rekomendacji; warsztat, klinika, gabinet, kancelaria): pakiet
 *    §P8 sekcja 6 oraz H1,
 *  - podział „co robisz sam za 0 zł, a co robimy my": pakiet §P8 sekcja 7,
 *  - ceny i czasy: pakiet §P8 sekcja 8, wszystkie NETTO,
 *  - „kiedy to nie ma sensu" (brak wizytówki i opinii, usługa czysto lokalna
 *    i tania): pakiet §P8 sekcja 9,
 *  - powiązania: pakiet §P8 sekcja 10 plus uwaga wdrożeniowa §3 (każda
 *    podstrona linkuje z powrotem do rodzica).
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1490 zł netto i 5 dni roboczych (Sprint Diagnostyczny), 1590 zł netto
 *  i 1 dzień (landing), 2900 zł netto i 2-4 dni (strona biznesowa), sześć
 *  źródeł odpowiedzi, około trzy tygodnie u Lenart Motors, 0 zł w kolumnie
 *  „robisz sam" tabeli porównawczej. Wszystkie kwoty zawsze z dopiskiem netto.
 *
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY:
 *   - pakiet §P8 nie podaje, ILE katalogów, forów ani opinii bierzemy pod
 *     uwagę, więc wszędzie mówimy o nich z nazwy, bez liczby,
 *   - nie podaje liczby modeli sprawdzanych przy usłudze lokalnej, więc
 *     wymieniamy je z nazwy (ChatGPT) albo mówimy „model", bez liczby,
 *   - nie podaje, ile trwa dojście do wskazania firmy przez model, więc
 *     „około trzy tygodnie" pada WYŁĄCZNIE jako jeden zmierzony przypadek
 *     Lenart Motors, nigdy jako obietnica terminu,
 *   - nie mówi, co dokładnie zawiera landing, a co strona biznesowa, więc
 *     poza ceną i czasem pracy z pakietu opisujemy je WYŁĄCZNIE zakresem,
 *     który stoi już na `/uslugi/strony-www` (landing to jedna strona,
 *     strona biznesowa to kilka podstron pod różne pytania klientów),
 *     a każdą opcję domyka zdanie „Dokładny zakres ustalamy przed startem".
 *
 * ZAKAZANE NA TEJ STRONIE: gwarancja miejsca w odpowiedzi modelu, procenty bez
 * metody, obietnica terminu efektu, ceny inne niż trzy wymienione wyżej,
 * a także dwa zakazy globalne repo (patrz zasady projektu): zakazana nazwa
 * asystenta telefonicznego oraz jakakolwiek sugestia, że bot telefoniczny
 * inicjuje połączenia do klientów.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „optymalizacja"
 * po rodzicu (uwaga wdrożeniowa §4: żadnego nowego koloru dla gałęzi GEO),
 * a renderuje się TYMI SAMYMI komponentami co strony usług i pozostałe
 * podstrony. Zero nowych typów bloków, zero nowego CSS.
 */
export const dlaFirmUslugowych: PodstronaUslugi = {
  rodzic: 'optymalizacja',
  slug: 'dla-firm-uslugowych',
  dataAktualizacji: '2026-08-31',

  /* H1 1:1 z pakietu §P8. Cztery nazwy branż w nagłówku to nie ozdoba:
     to jedyne miejsce w serwisie, gdzie klient usługowy rozpoznaje siebie. */
  h1: 'Widoczność w AI dla firm usługowych: warsztat, klinika, gabinet, kancelaria',

  /* KAPSUŁA 1:1 Z PAKIETU §P8 („GOTOWA KAPSUŁA"). Nie skracać i nie
     przepisywać: to zdanie ma być cytowane przez modele w takiej formie,
     w jakiej zostało zatwierdzone. Niesie komplet: skąd bierze się odpowiedź
     lokalna, jaka jest kolejność pracy i jaki mamy na to zmierzony przypadek. */
  kapsula:
    'Przy firmie usługowej model AI odpowiada na pytanie „kogo polecasz w moim mieście” głównie na podstawie wizytówki Google, opinii, katalogów branżowych i wątków na forach. Sama strona jest ważna, ale to jedno z sześciu źródeł i zwykle nie najmocniejsze. Dlatego przy usługach lokalnych zaczynamy od spójności danych firmy we wszystkich tych miejscach, a dopiero potem przepisujemy treść na stronie. U Lenart Motors, warsztatu blacharsko lakierniczego premium, ChatGPT zaczął wskazywać firmę około trzy tygodnie po publikacji nowej strony.',

  /* metaTitle: fraza z pakietu §P8 („Widoczność w AI dla firm usługowych",
     35 znaków) zostaje NA POCZĄTKU, a wyróżnik to dwie branże z H1 tej samej
     strony. Decyzja właściciela z 2026-08-31: metaTitle ma mieć 50-60 znaków,
     więc krótszy wariant z pakietu nie wchodzi sam. Layout dokleja sufiks
     marki, więc w SERP wychodzi „... · SimpleFast.ai". */
  metaTitle: 'Widoczność w AI dla firm usługowych: warsztat, klinika',
  metaDescription:
    'Klient pyta AI o fachowca w Twoim mieście. Ustawiamy wizytówkę, opinie, katalogi i stronę tak, żeby padała Twoja nazwa. Sprint Diagnostyczny 1490 zł netto.',

  problem: {
    /* H2 1:1 z pakietu §P8 sekcja 1. */
    h2: 'Klient pyta AI o dobrego fachowca w Twoim mieście, kogo dostaje?',
    tresc:
      'Dostaje gotową listę firm z nazwami. Ta lista powstaje w dużej mierze poza Twoją stroną: z wizytówki Google, z opinii, z katalogów branżowych i z wątków na forach.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Przy pytaniu lokalnym model nie szuka najlepszej strony, tylko firmy, o której to samo mówi kilka miejsc naraz. Jeśli te miejsca mówią o Tobie różne rzeczy, model wskaże kogoś, kto brzmi spójnie.',
      },
      {
        typ: 'naglowek',
        tekst: 'Skąd model bierze nazwę firmy z Twojego miasta?',
        ikona: 'mapa',
        chip: 'GEO',
        overline: 'SZEŚĆ ŹRÓDEŁ ODPOWIEDZI',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Wizytówka Google',
            akapity: [
              'Nazwa, adres, zakres usług i godziny. To najczęściej pierwsze miejsce, z którego model bierze podstawowe dane o firmie lokalnej.',
            ],
          },
          {
            naglowek: 'Opinie',
            akapity: [
              'Opinie mówią nie tylko, jak Cię oceniają, ale też za co konkretnie. Model buduje z tego obraz specjalizacji.',
            ],
          },
          {
            naglowek: 'Katalogi branżowe',
            akapity: [
              'Wpisy w katalogach powtarzają dane Twojej firmy. Jeśli powtarzają je błędnie, powielają błąd w każdym źródle naraz.',
            ],
          },
          {
            naglowek: 'Rankingi i zestawienia',
            akapity: [
              'Listy typu „najlepsi w mieście” są dla modelu gotową odpowiedzią. Twoja obecność w nich waży więcej niż kolejny akapit na stronie.',
            ],
          },
          {
            naglowek: 'Wątki na forach',
            akapity: [
              'Pytanie „kogo polecacie” i odpowiedzi pod nim to dokładnie ten sam materiał, z którego model składa rekomendację.',
            ],
          },
          {
            naglowek: 'Twoja strona',
            akapity: [
              'Strona jest ważna, ale to jedno z sześciu źródeł i zwykle nie najmocniejsze. Dlatego samo przepisanie strony rzadko wystarcza.',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: ['Co porównujemy', 'Lokalne wyniki w Google', 'Odpowiedź modelu AI'],
        wiersze: [
          ['Pytanie klienta', 'Fraza z nazwą miasta', 'Pełne zdanie: kogo polecasz w moim mieście'],
          [
            'Wynik, który widzisz',
            'Pozycja firmy na liście',
            'To, czy w odpowiedzi pada Twoja nazwa',
          ],
          [
            'Z czego powstaje wynik',
            'Wizytówka firmy i jej opinie',
            'Wizytówka, opinie, katalogi, rankingi, fora i strona',
          ],
          [
            'Rola Twojej strony',
            'Adres, do którego prowadzi wynik',
            'Jedno z sześciu źródeł, zwykle nie najmocniejsze',
          ],
        ],
        wKarcie: true,
        podpis:
          'Pozycjonowanie lokalne w Google a widoczność w AI: to samo miasto, inny mechanizm odpowiedzi',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co zmieniamy przy warsztacie, klinice albo kancelarii?',
    tresc:
      'Zaczynamy od spójności danych firmy we wszystkich miejscach, z których model bierze odpowiedź, a treść na stronie przepisujemy dopiero potem. Ta kolejność nie jest kosmetyką: przy usłudze lokalnej decyduje, czy praca nad stroną ma na czym stanąć.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co ustawiamy poza stroną, a co na stronie?',
        ikona: 'radar',
        chip: 'GEO',
        overline: 'NAJPIERW DANE FIRMY, POTEM TREŚĆ',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Spójne dane firmy we wszystkich miejscach',
            akapity: [
              'Ta sama nazwa, ten sam adres i ten sam zakres usług w wizytówce, w katalogach i na stronie. Rozjazd w tych danych osłabia Cię w każdym źródle naraz, więc tym zaczynamy.',
            ],
          },
          {
            naglowek: 'Opis usług językiem pytań klienta',
            akapity: [
              'Klient nie pyta o nazwę procedury, tylko o swój problem. Opis usług piszemy tak, jak to pytanie brzmi w rozmowie telefonicznej.',
            ],
          },
          {
            naglowek: 'Zakres i warunki wprost na stronie',
            akapity: [
              'Co robicie, czego nie robicie, na jakim terenie i na jakich warunkach. Model nie zgaduje tego, co stoi napisane wprost.',
            ],
          },
          {
            naglowek: 'Opinie',
            akapity: [
              'Opinie są jednym ze źródeł, z których model buduje polecenie. Dlatego traktujemy je jako część pracy, a nie jako dodatek po wdrożeniu.',
            ],
          },
          {
            naglowek: 'Dane strukturalne',
            akapity: [
              'Strona ma powiedzieć maszynie wprost, co jest firmą, co usługą, a co opinią. Bez tego model zgaduje, a zgadywanie kończy się nieprawdą o Twojej firmie.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Warsztat premium, który ChatGPT zaczął wskazywać',
        akapity: [
          'Lenart Motors to warsztat blacharsko lakierniczy premium. ChatGPT zaczął wskazywać tę firmę około trzy tygodnie po publikacji nowej strony.',
          'To jeden zmierzony przypadek, a nie obiecany termin. Odpowiedzi modeli zmieniają się w czasie, więc liczy się seria pomiarów, a nie jeden zrzut ekranu.',
        ],
        wariant: 'edge',
        chip: 'DOWÓD',
      },
      {
        typ: 'sekcja',
        naglowek: 'W jakich branżach działa to najszybciej?',
        akapity: [
          'Najszybciej tam, gdzie jeden klient jest dużo wart, a wybór zapada po rekomendacji, nie po cenie. W takich branżach jedno pytanie zadane modelowi potrafi zdecydować o całym zleceniu.',
        ],
        punkty: [
          'Warsztat, zwłaszcza z jasną specjalizacją, bo klient pyta o konkretną robotę, a nie o warsztat w ogóle.',
          'Klinika i gabinet, bo pacjent pyta o problem i szuka kogoś polecanego, nie najtańszego.',
          'Kancelaria, bo sprawa trafia do tego, kogo ktoś wymienił z nazwy.',
        ],
        wariant: 'top',
        chip: 'BRANŻE',
        stopka: [
          'Nie rozpoznajesz swojej branży na tej liście? Napisz, sprawdzimy Twoje pytanie klienckie.',
          'Jeśli u Ciebie to nie zadziała, powiemy wprost, zanim cokolwiek zamówisz.',
        ],
      },
    ],
  },

  /* Tabela z pakietu §P8 sekcja 7: podział roboty, nie porównanie z konkurencją.
     Kolumna „robisz sam" opisuje WYŁĄCZNIE to, co klient realnie może zrobić
     bez nas i bez kosztu. Komórki krótkie (konwencja podstron: cecha ~16
     znaków, kolumny ~35), żeby wiersze nie łamały się na wąskich ekranach. */
  tabelaPorownawcza: {
    h2: 'Co robisz sam, a co robimy my',
    naglowekBez: 'Robisz sam, za 0 zł',
    naglowekZNami: 'Robimy my',
    wiersze: [
      {
        cecha: 'Wizytówka',
        bez: 'Zakładasz ją i uzupełniasz sam',
        zNami: 'Sprawdzamy, czy zgadza się ze stroną',
      },
      {
        cecha: 'Opinie',
        bez: 'Prosisz o nie po skończonym zleceniu',
        zNami: 'Mówimy, o co prosić, żeby opinia niosła konkret',
      },
      {
        cecha: 'Katalogi',
        bez: 'Wpisujesz firmę tam, gdzie znasz',
        zNami: 'Pilnujemy tej samej nazwy i adresu wszędzie',
      },
      {
        cecha: 'Opis usług',
        bez: 'Piszesz własnymi słowami',
        zNami: 'Przepisujemy go językiem pytań klienta',
      },
      {
        cecha: 'Zakres i warunki',
        bez: 'Znasz je, ale nie stoją na stronie',
        zNami: 'Stawiamy je wprost na stronie',
      },
      {
        cecha: 'Dane strukturalne',
        bez: 'Wymagają wejścia w kod strony',
        zNami: 'Dokładamy je i sprawdzamy poprawność',
      },
      {
        cecha: 'Pomiar w modelach',
        bez: 'Zapytasz raz i zapamiętasz wynik',
        zNami: 'Pytamy i zapisujemy, czy padasz i kto zamiast Ciebie',
      },
    ],
  },

  /* Kolejność pracy przy usłudze lokalnej, wprost z kapsuły §P8: najpierw
     spójność danych, dopiero potem treść na stronie. To NIE są cztery etapy
     metody z rodzica (dostęp botów, treść pod cytat, świeżość, autorytet):
     tam jest metoda, tu jest kolejność wymuszona przez lokalność. */
  kroki: {
    h2: 'Od czego zaczynamy przy firmie usługowej?',
    items: [
      {
        tytul: 'Spójne dane firmy',
        opis: 'Zestawiamy obok siebie zapisy z wizytówki, z katalogów i ze strony, a potem wypisujemy każdy rozjazd. Dopóki te miejsca mówią różne rzeczy, przepisywanie strony niewiele zmieni.',
      },
      {
        tytul: 'Treść językiem pytań klienta',
        opis: 'Przepisujemy opis usług i stawiamy zakres oraz warunki wprost na stronie. Model ma znaleźć odpowiedź na pytanie klienta, a nie folder reklamowy.',
      },
      {
        tytul: 'Opinie i dane strukturalne',
        opis: 'Na koniec to, co potwierdza firmę z zewnątrz i opisuje ją maszynie: opinie oraz dane strukturalne. Ta warstwa ma sens dopiero wtedy, gdy dane firmy zgadzają się wszędzie.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje widoczność w AI dla firmy usługowej?',
    tresc:
      'Zaczynamy od Sprintu Diagnostycznego: 1490 zł netto i 5 dni roboczych. Kwotę odliczamy w całości od ceny wdrożenia. Jeśli strona ma powstać od nowa, landing kosztuje 1590 zł netto i zajmuje 1 dzień, a strona biznesowa 2900 zł netto i 2-4 dni. Wszystkie kwoty netto.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1490 zł netto',
            opis: 'Sprint Diagnostyczny, odliczany w całości od wdrożenia',
            zrodlo: 'sekcja o cenie na tej stronie',
            ton: 'cyan',
          },
          {
            wartosc: '1590 zł netto',
            opis: 'landing, 1 dzień pracy',
            zrodlo: 'sekcja o cenie na tej stronie',
            ton: 'violet',
          },
          {
            wartosc: '2900 zł netto',
            opis: 'strona biznesowa, 2-4 dni pracy',
            zrodlo: 'sekcja o cenie na tej stronie',
            ton: 'green',
          },
          {
            wartosc: 'ok. 3 tygodnie',
            opis: 'od publikacji nowej strony do wskazania firmy przez ChatGPT',
            zrodlo: 'Lenart Motors, jeden zmierzony przypadek',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co dostajesz w każdej z tych pozycji?',
        ikona: 'kalkulator',
        chip: 'CENNIK',
        overline: 'NAJPIERW POMIAR, POTEM STRONA',
      },
      {
        typ: 'przelacznik',
        grupa: 'dla-firm-uslugowych-cennik',
        opcje: [
          {
            numer: 'START',
            tytul: 'Sprint Diagnostyczny',
            podtytul: '1490 zł netto, 5 dni roboczych',
            naglowek: 'Najpierw sprawdzamy, kogo model poleca dziś na pytanie Twojego klienta.',
            akapity: [
              'To punkt wyjścia dla każdej firmy usługowej. Bez niego nie wiadomo, czy problemem jest strona, czy rozjazd danych w wizytówce i katalogach.',
            ],
            punkty: [
              'wiesz, czy Twoja nazwa w ogóle pada',
              'wiesz, kto jest wymieniany zamiast Ciebie',
              'wiesz, którą rzecz naprawić najpierw',
            ],
          },
          {
            numer: 'STRONA 1',
            tytul: 'Landing',
            podtytul: '1590 zł netto, 1 dzień',
            naglowek: 'Jedno miejsce w sieci z ofertą, zakresem i warunkami.',
            akapity: [
              'Wybór na tyle, na ile pozwala jedna strona: usługa opisana językiem pytań klienta, zakres i warunki wprost. Dokładny zakres ustalamy przed startem.',
            ],
            punkty: [
              'opis usługi językiem pytań klienta',
              'zakres i warunki wprost na stronie',
              'dane firmy spójne z wizytówką',
            ],
          },
          {
            numer: 'STRONA 2',
            tytul: 'Strona biznesowa',
            podtytul: '2900 zł netto, 2-4 dni',
            naglowek: 'Gdy usług jest kilka i każda potrzebuje własnego opisu.',
            akapity: [
              'Przy warsztacie, klinice czy kancelarii klient pyta o konkretną usługę, nie o firmę w ogóle. Wtedy jedna strona przestaje wystarczać. Dokładny zakres ustalamy przed startem.',
            ],
            punkty: [
              'osobny opis dla każdej usługi',
              'zakres i warunki wprost przy każdej z nich',
              'dane strukturalne dla firmy i usług',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy to nie ma sensu?',
        akapity: [
          'Wolimy stracić zlecenie niż wziąć pieniądze za pracę, która u Ciebie niczego nie zmieni. Mówimy to przed zamówieniem, nie po.',
        ],
        punkty: [
          'Nie masz wizytówki Google ani opinii: zacznij od nich, bo to tańsze i szybsze niż cokolwiek, co zrobimy na stronie.',
          'Twoja usługa jest czysto lokalna i tania: przy niskiej wartości jednego zlecenia ta praca się nie zwróci.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz siebie w którymś z tych punktów? Napisz i tak.',
          'Powiemy, co zrobić zamiast, nawet jeśli to nie będzie usługa u nas.',
        ],
      },
    ],
    /* Najtańsze realne wejście z pakietu §P8 punkt 8. Render dokleja „od",
       co jest prawdą: strona wymienia trzy różne pozycje cennika. */
    minPrice: 1490,
    /* Powrót do rodzica jednym zdaniem (uwaga wdrożeniowa §3). Ta podstrona
       kończy się decyzją o starcie, całą metodę opisuje `/uslugi/optymalizacja`. */
    linkPoradnik: {
      przed:
        'Samą metodę, czyli dostęp botów, treść pod cytat i autorytet poza stroną, opisaliśmy na stronie ',
      etykieta: 'pozycjonowanie pod AI',
      po: '.',
      href: '/uslugi/optymalizacja',
    },
  },

  /* Osiem pytań (pakiet §P8 punkt 11 zamawia FAQ na 8 pytań, ale nie podaje
     ich treści, w odróżnieniu od kapsuły). Napisane wyłącznie na faktach
     z §P8: sześć źródeł, różnica wobec Google, kolejność pracy, trzy pozycje
     cennika z czasami, Lenart Motors, branże, granice sensu. Ten sam tekst
     idzie na stronę i do FAQPage JSON-LD, więc każda edycja rusza oba naraz. */
  faq: [
    {
      pytanie: 'Skąd ChatGPT wie, kogo polecić w moim mieście?',
      odpowiedz:
        'Głównie z wizytówki Google, z opinii, z katalogów branżowych, z rankingów i z wątków na forach. Twoja strona też się liczy, ale to jedno z sześciu źródeł i zwykle nie najmocniejsze.',
    },
    {
      pytanie: 'Czym to się różni od pozycjonowania lokalnego w Google?',
      odpowiedz:
        'W Google walczysz o pozycję firmy na liście wyników. W odpowiedzi modelu nie ma pozycji: albo Twoja nazwa pada, albo nie pada. Dlatego zamiast fraz z nazwą miasta pracujemy na pytaniach zadanych pełnym zdaniem.',
    },
    {
      pytanie: 'Od czego zaczynacie przy warsztacie albo gabinecie?',
      odpowiedz:
        'Od spójności danych firmy we wszystkich miejscach, z których model bierze odpowiedź: wizytówka, katalogi, strona. Dopiero potem przepisujemy treść na stronie.',
    },
    {
      pytanie: 'Ile to kosztuje?',
      odpowiedz:
        'Sprint Diagnostyczny kosztuje 1490 zł netto. Kwotę odliczamy w całości od ceny wdrożenia. Jeśli strona ma powstać od nowa, landing to 1590 zł netto, a strona biznesowa 2900 zł netto.',
    },
    {
      pytanie: 'Ile to trwa?',
      odpowiedz:
        'Sprint Diagnostyczny 5 dni roboczych, landing 1 dzień, strona biznesowa 2-4 dni. To czas naszej pracy, a nie termin, w którym model zacznie Cię wskazywać.',
    },
    {
      pytanie: 'Macie dowód, że to działa przy usłudze lokalnej?',
      odpowiedz:
        'Lenart Motors, warsztat blacharsko lakierniczy premium: ChatGPT zaczął wskazywać tę firmę około trzy tygodnie po publikacji nowej strony. To jeden zmierzony przypadek, nie obiecany termin.',
    },
    {
      pytanie: 'W jakich branżach działa to najszybciej?',
      odpowiedz:
        'Tam, gdzie jeden klient jest dużo wart, a wybór zapada po rekomendacji, a nie po cenie: warsztat, klinika, gabinet, kancelaria.',
    },
    {
      pytanie: 'Kiedy nie warto się za to brać?',
      odpowiedz:
        'Gdy nie masz wizytówki Google ani opinii, bo najpierw trzeba je mieć. I gdy usługa jest czysto lokalna i tania, bo przy niskiej wartości jednego zlecenia ta praca się nie zwróci.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P8 punkt 12): sprawdzamy, kogo
     model poleca dziś w Twoim mieście. Mikrokopia powtarza warunki startu,
     bo to ostatnie zdanie przed kliknięciem. */
  cta: {
    label: 'Sprawdź, kogo AI poleca w Twoim mieście',
    href: '#diagnoza',
    mikrokopia:
      'Zaczynamy od Sprintu Diagnostycznego: 1490 zł netto i 5 dni roboczych. Kwotę odliczamy w całości od ceny wdrożenia. Sprawdzamy, kogo model poleca dziś na pytanie Twojego klienta.',
    dowod:
      'U Lenart Motors ChatGPT zaczął wskazywać firmę około trzy tygodnie po publikacji nowej strony. To jeden zmierzony przypadek, nie obiecany termin.',
  },

  queries: [
    'pozycjonowanie w AI dla firm usługowych',
    'widoczność w AI dla firm usługowych',
    'jak sprawić, żeby ChatGPT polecał moją firmę',
    'pozycjonowanie w ChatGPT dla warsztatu',
    'widoczność w AI dla kliniki i gabinetu',
    'kogo poleca AI w moim mieście',
  ],

  /* POWIĄZANIA (pakiet §P8 sekcja 10: pozycjonowanie w ChatGPT, audyt
     widoczności, strony WWW; plus uwaga wdrożeniowa §3: powrót do rodzica).
     RUNDA 2026-08-31: dopisany brakujący cel z konspektu, czyli podstrona
     `chatgpt` (jej trasa weszła do rejestru). Wszystkie cele są dziś realnymi
     trasami: rodzic i /uslugi/strony-www stoją w rejestrze USLUGI, obie
     siostry w `lib/uslugi/podstrony/index.ts`, a realizacja i kotwica
     narzędzia są linkowane tak samo ze strony rodzica. Zero linków z 404,
     zero kwot w opisach (uwaga wdrożeniowa §6). */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',
        href: '/uslugi/optymalizacja',
        opis: 'Cała metoda: dostęp botów AI, treść pod cytat, autorytet poza stroną i pomiar cytowań co tydzień w czterech silnikach AI.',
      },
      {
        etykieta: 'Jak sprawić, żeby ChatGPT polecał Twoją firmę',
        href: '/uslugi/optymalizacja/chatgpt',
        opis: 'Sam ChatGPT, bez warstwy lokalnej: zamknięte odpowiedzi na pytania klienta, spójna encja firmy i dostęp dla GPTBot w robots.txt.',
      },
      {
        etykieta: 'Audyt widoczności w AI: sprawdzamy, czy ChatGPT poleca Twoją firmę',
        href: '/uslugi/optymalizacja/audyt-widocznosci-w-ai',
        opis: 'Sam pomiar, punkt po punkcie: co sprawdzamy, jak pytamy modele i co dostajesz w raporcie.',
      },
      {
        etykieta: 'Tworzenie stron WWW widocznych w Google i w AI',
        href: '/uslugi/strony-www',
        opis: 'Gdy strony nie da się już naprawić, budujemy nową: cała treść w kodzie od razu, ułożona pod cytowanie.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis: 'Lenart Motors: około trzy tygodnie od wrzucenia strony do sieci do wskazania firmy przez ChatGPT.',
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
