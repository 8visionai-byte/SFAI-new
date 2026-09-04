import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 4 — CHATBOT DLA SKLEPU INTERNETOWEGO
 * (`/uslugi/chatboty/sklep-internetowy`).
 * Fraza primary: „chatbot dla sklepu internetowego" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P4, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/chatboty` i sióstr z tego samego pakietu):
 *  - RODZIC sprzedaje CAŁĄ usługę chatbota: po co on jest, trzy progi cennika,
 *    kanały, dowody wdrożeń, model utrzymania. Nic z tego nie przepisujemy.
 *  - TA STRONA jest JEDYNĄ o sklepie: koszyk, dostępność produktu, dobór
 *    produktu, status zamówienia, zwroty i reklamacje. Kończy się jedną
 *    decyzją: rozmawiamy o wpięciu bota w mój sklep.
 *  - NIE MA TU I BYĆ NIE MOŻE: rozwiniętego cennika (pakiet §P1: podstrony
 *    zastosowań linkują po cenę do `/uslugi/chatboty/cennik` i nie rozwijają
 *    go u siebie), mechaniki RAG i bazy wiedzy (siostra `/baza-wiedzy`),
 *    ogólnych pytań biura obsługi (siostra `/obsluga-klienta`), zbierania
 *    i kwalifikowania leadów (siostra `/generowanie-leadow`) ani tematu
 *    kanałów (siostra `/whatsapp-messenger`). Do wszystkich prowadzą linki
 *    w sekcji „Powiązane", ale treść zostaje na tamtych stronach.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - zakres bota w sklepie (dostępność, dobór produktu, status zamówienia,
 *    zwroty i reklamacje, przekazanie do człowieka): pakiet §P4 sekcja 2,
 *  - trzy integracje (baza produktów, system zamówień, CRM): pakiet §P4 sekcja 3,
 *  - zestawienie „bot zintegrowany kontra widget FAQ kontra strona pomocy":
 *    pakiet §P4 sekcja 4,
 *  - czas wdrożenia przy integracjach 5-10 dni roboczych: pakiet §P4 sekcja 5,
 *    zgodne z progiem „duży" w `lib/uslugi/chatboty.ts`,
 *  - próg z integracjami 8000-15000 zł netto: pakiet §P4 sekcja 6, zgodne
 *    co do złotówki z progiem „duży" u rodzica,
 *  - rachunek na Twoich liczbach, bez wartości domyślnych, ze wzorem
 *    widocznym na stronie: pakiet §P4 sekcja 7 plus uwaga wdrożeniowa §3.
 *    UWAGA: pakiet zamawiał kalkulator z czterema polami, ale silnik bloków
 *    treści NIE MA typu formularza, więc żadnych pól na tej stronie nie ma
 *    i być nie może. Kontrola 2026-09-04 zastała tu obietnicę interfejsu
 *    („wypełnij cztery pola", punkty „Pole 1" do „Pole 4"), czyli sprzedaż
 *    funkcji, której strona nie ma. Właściciel zaakceptował tabelę ze wzorem:
 *    liczby podajesz Ty, działania stoją widoczne, strona niczego nie udaje,
 *  - próg prosty 1790 zł netto i 1-2 dni robocze: pakiet §P4 sekcja 8 oraz
 *    `lib/uslugi/chatboty.ts` (przełącznik progów i tabela cennika),
 *  - model utrzymania w jednym brzmieniu (u nas 99-599 zł netto miesięcznie,
 *    po przekazaniu infrastruktury 0 zł miesięcznie, poprawki 350 zł netto
 *    za godzinę): uwaga wdrożeniowa §7,
 *  - tokeny jako osobna pozycja płacona u dostawcy modelu według zużycia:
 *    pakiet, sekcja o pozycjach na rachunku,
 *  - dwie rundy poprawek w cenie wdrożenia i liczenie czasu OD PRZEKAZANIA
 *    KOMPLETU MATERIAŁÓW: `lib/uslugi/chatboty.ts` (nasze własne zobowiązania).
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  8000-15000 zł netto, 5-10 dni roboczych, 1790 zł netto, 1-2 dni robocze,
 *  99-599 zł netto miesięcznie, 0 zł miesięcznie, 350 zł netto za godzinę,
 *  dwie rundy poprawek, pięć rzeczy, które bot robi w sklepie, trzy systemy
 *  do wpięcia. Każda NASZA kwota z dopiskiem netto; przy „0 zł" dopisku nie ma,
 *  bo zero netto to zero brutto.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: nie mamy wdrożenia e-commerce z nazwą
 *  klienta (pakiet §P4, uwaga do treści), więc na stronie NIE MA sekcji
 *  z efektem u klienta ani żadnej liczby wynikowej. Nie mamy też ani jednej
 *  cudzej statystyki o porzuconych koszykach, więc pytanie z sekcji problemu
 *  zostaje pytaniem do Ciebie, a nie zdaniem z procentem. Dowodem na tej
 *  stronie jest mechanizm, żywy bot do kliknięcia na `/uslugi/chatboty`
 *  i jawny cennik.
 *
 * ZAKAZANE NA TEJ STRONIE: procenty porzuconych koszyków i inne cudze
 * statystyki, a razem z nimi STATYSTYKA UBRANA W SŁOWA, czyli superlatywy
 * i kwantyfikatory o całym rynku („najwięcej", „najczęściej", „każde takie
 * pytanie to..."). Kontrola 2026-09-01 wycięła trzy takie zdania z sekcji
 * problemu i z kroku o statusie zamówienia: nie mamy na nie źródła,
 * a czytają się jak zmierzony fakt. Dalej zakazane:
 * odniesienia czasowe bez daty w źródle („pół roku temu"),
 * kwoty poza sekcją ceny (uwaga wdrożeniowa: w poprzedniej rundzie kwota
 * wylądowała w karcie „Powiązane"), obietnica pomiaru, testu, audytu ani
 * raportu na bezpłatnej rozmowie (ustalenie właściciela z 2026-08-31:
 * bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb), Slack i Microsoft Teams
 * jako kanały (uwaga wdrożeniowa §8), sugerowanie dostawcy modelu innego
 * niż Anthropic (uwaga wdrożeniowa §9).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług i pozostałe podstrony. Zero nowych typów
 * bloków, zero nowego CSS.
 */
export const sklepInternetowy: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'sklep-internetowy',
  dataAktualizacji: '2026-09-04',

  h1: 'Chatbot AI dla sklepu internetowego',

  /* KAPSUŁA (pakiet §P4 nie podaje gotowej, więc napisana z faktów tej samej
     sekcji: zakres bota, próg z integracjami, czas, próg bez integracji,
     przekazanie do człowieka). Niesie komplet wielkości strony, żeby model
     mógł wyciąć ją jako gotową odpowiedź. */
  kapsula:
    'Chatbot dla sklepu internetowego odpowiada na pytania o dostępność produktu, pomaga wybrać model, sprawdza status zamówienia i prowadzi przez zwrot. Żeby to robił, wpinamy go w bazę produktów i system zamówień: to próg 8000-15000 zł netto i 5-10 dni roboczych. Bez integracji bot zaczyna się od 1790 zł netto. Sprawę spoza swojego zakresu oddaje człowiekowi.',

  /* metaTitle: pakiet §P4 dawał 34 znaki, konwencja repo (types.ts) mówi 50-60
     i decyzja właściciela każe trzymać konwencję repo. Fraza główna „chatbot
     dla sklepu internetowego" zostaje NA POCZĄTKU, wyróżnik to dwa tematy,
     które realnie stoją na tej stronie (status zamówienia i zwroty).
     Długość 58 znaków. Layout dokleja sufiks marki. */
  metaTitle: 'Chatbot dla sklepu internetowego: status zamówień i zwroty',
  /* 156 znaków. Konkret plus dwie liczby ze strony, zero hedgingu. */
  metaDescription:
    'Chatbot dla sklepu internetowego: dostępność, dobór produktu, status zamówienia i zwroty. Wpięcie w sklep od 8000 zł netto, wdrożenie 5-10 dni roboczych.',

  problem: {
    /* H2 1:1 z pakietu §P4 sekcja 1. */
    h2: 'Ile koszyków tracisz na pytaniu, którego nikt nie odebrał?',
    tresc:
      'Klient stoi nad koszykiem i ma jedno pytanie: czy ten rozmiar jest na stanie, kiedy przyjdzie paczka, co będzie, jeśli nie podejdzie. Bez odpowiedzi zamyka kartę.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Odpowiedź na te pytania zwykle istnieje, tylko nie tam, gdzie patrzy klient. Stan magazynowy siedzi w bazie produktów, termin dostawy w systemie zamówień, zasady zwrotu w regulaminie. Klient ma przed sobą kartę produktu i nic z tego.',
      },
      {
        typ: 'naglowek',
        tekst: 'Trzy momenty, w których klient sklepu pyta',
        ikona: 'chat-dymek',
        chip: 'SKLEP',
        overline: 'ŚCIEŻKA ZAKUPU · PRZED, W TRAKCIE, PO',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Przed zakupem',
            akapity: [
              'Pyta o rozmiar, wersję, kompatybilność i o to, czy towar jest na stanie. To pytanie decyduje o zakupie, więc pada dokładnie wtedy, kiedy klient trzyma kartę produktu otwartą.',
            ],
          },
          {
            naglowek: 'W trakcie zamówienia',
            akapity: [
              'Pyta o koszt i termin dostawy, formy płatności, łączenie przesyłek. Takie pytanie bez szybkiej odpowiedzi zatrzymuje klienta krok przed zapłatą.',
            ],
          },
          {
            naglowek: 'Po zakupie',
            akapity: [
              'Pyta, gdzie jest paczka i jak oddać towar, który nie podszedł. Te pytania nic nie sprzedają, a i tak zajmują czas obsługi i ważą na ocenie sklepu.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego strona pomocy tego nie łapie?',
        akapity: [
          'Bo strona pomocy odpowiada na pytania ogólne, a klient sklepu ma pytanie o SWÓJ produkt i SWOJE zamówienie. Regulamin zwrotów nie powie, gdzie jest jego paczka, a zakładka o wysyłce nie sprawdzi, czy ten model został w jego rozmiarze.',
          'Dlatego na tej stronie mówimy o bocie wpiętym w dane sklepu, a nie o kolejnej zakładce z tekstem. Różnicę punkt po punkcie pokazuje tabela niżej.',
        ],
        wariant: 'edge',
        chip: 'SKLEP',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Co chatbot robi w Twoim sklepie internetowym?',
    tresc:
      'Pięć rzeczy, wszystkie po stronie klienta: sprawdza dostępność, pomaga dobrać produkt, podaje status zamówienia, prowadzi przez zwrot i reklamację, a sprawę spoza swojego zakresu oddaje człowiekowi.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Pięć rzeczy, które bot bierze na siebie w sklepie',
        ikona: 'pudelko-3d',
        chip: 'ZAKRES',
        overline: 'OD KARTY PRODUKTU DO ZWROTU',
      },
      {
        typ: 'kroki',
        wariant: 'os',
        kroki: [
          {
            tytul: 'Dostępność produktu',
            opis: 'Klient pyta o rozmiar, kolor albo wersję, a bot czyta stan z Twojej bazy produktów i odpowiada konkretem. Gdy towaru nie ma, mówi to wprost, zamiast odsyłać do przeglądania kategorii.',
            meta: 'przed zakupem',
          },
          {
            tytul: 'Dobór produktu',
            opis: 'Klient opisuje, do czego mu to potrzebne, a bot zawęża wybór na podstawie parametrów z Twojej bazy. Nie wymyśla cech produktu, tylko porównuje te, które sam masz opisane.',
            meta: 'przed zakupem',
          },
          {
            tytul: 'Status zamówienia',
            opis: 'Po podaniu numeru zamówienia bot sprawdza jego stan w Twoim systemie i mówi, na jakim etapie jest przesyłka. To pytanie wraca w kółko, a odpowiedź na nie zawsze stoi w tym samym miejscu, więc łatwo oddać je botowi.',
            meta: 'po zakupie',
          },
          {
            tytul: 'Zwroty i reklamacje',
            opis: 'Bot prowadzi klienta przez Twoją procedurę: co można oddać, w jakim terminie, co przygotować. Zbiera komplet danych zgłoszenia, żeby obsługa nie musiała dopytywać o podstawy.',
            meta: 'po zakupie',
          },
          {
            tytul: 'Przekazanie do człowieka',
            opis: 'Sprawa spoza ustalonego zakresu idzie do Twojej obsługi razem z całą rozmową i tym, o co klient pytał. Bot nie zgaduje i nie ucina tematu, tylko oddaje go dalej.',
            meta: 'zawsze, gdy trzeba',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Z czym bot musi się połączyć, żeby to robił',
        ikona: 'puzzle',
        chip: 'INTEGRACJE',
        overline: 'TRZY SYSTEMY · BAZA PRODUKTÓW, ZAMÓWIENIA, CRM',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Baza produktów',
            akapity: [
              'Stąd bot bierze stan magazynowy, parametry i warianty. Bez tego połączenia potrafi opowiedzieć o ofercie, ale nie powie, czy dana rzecz jest dziś do kupienia.',
            ],
            punkty: [
              'Czyta stan i parametry, nie zmienia ich.',
              'Odpowiada tym, co masz opisane, i niczym więcej.',
            ],
          },
          {
            naglowek: 'System zamówień',
            akapity: [
              'Stąd bot bierze status konkretnego zamówienia. To jedyny sposób, żeby na pytanie „gdzie jest moja paczka" padła odpowiedź, a nie prośba o kontakt z obsługą.',
            ],
            punkty: [
              'Sprawdza po numerze zamówienia.',
              'Zakres danych ustalamy przed startem.',
            ],
          },
          {
            naglowek: 'CRM',
            akapity: [
              'Tutaj ląduje to, co bot ustalił z klientem: kontakt, temat sprawy, przebieg rozmowy. Dzięki temu obsługa nie zaczyna od zera, gdy przejmuje temat.',
            ],
            punkty: [
              'Zapis rozmowy trafia do jednego miejsca.',
              'Człowiek przejmuje sprawę z kontekstem.',
            ],
          },
        ],
      },
      /* Zestawienie trzech wariantów z pakietu §P4 sekcja 4. Stoi TU, a nie
         w `tabelaPorownawcza`, bo kontrakt tamtego pola ma dwie kolumny,
         a pakiet zamówił trzy. Sekcja `tabelaPorownawcza` niżej porównuje
         co innego (bot bez integracji kontra bot wpięty w sklep), więc obie
         tabele niosą inny fakt i żadna nie powtarza drugiej. */
      {
        typ: 'tabela',
        naglowki: [
          'Czego chce klient',
          'Strona pomocy',
          'Widget FAQ',
          'Bot zintegrowany ze sklepem',
        ],
        wiersze: [
          [
            'Wiedzieć, czy towar jest na stanie',
            'nie odpowiada, to nie jej rola',
            'odsyła do karty produktu',
            'podaje stan z bazy produktów',
          ],
          [
            'Wybrać między dwoma modelami',
            'opis kategorii, bez porównania',
            'gotowa odpowiedź, jeśli ktoś ją wpisał',
            'porównuje parametry z Twojej bazy',
          ],
          [
            'Sprawdzić, gdzie jest paczka',
            'instrukcja, gdzie się zalogować',
            'instrukcja, gdzie się zalogować',
            'sprawdza po numerze zamówienia',
          ],
          [
            'Oddać towar, który nie podszedł',
            'regulamin do przeczytania',
            'skrót regulaminu',
            'prowadzi przez zgłoszenie i zbiera dane',
          ],
          [
            'Dogadać sprawę nietypową',
            'formularz kontaktowy',
            'formularz kontaktowy',
            'przekazuje obsłudze razem z rozmową',
          ],
        ],
        wKarcie: true,
        podpis:
          'Trzy sposoby na to samo pytanie klienta sklepu: strona pomocy i widget FAQ oddają treść, którą ktoś wcześniej napisał, a bot zintegrowany sięga do danych Twojego sklepu.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Twoje dane i dane Twoich klientów',
        akapity: [
          'Integracja ze sklepem to jedyne miejsce, w którym bot dotyka danych Twoich klientów: numeru zamówienia, statusu przesyłki, zgłoszenia zwrotu. Dlatego zakres spisujemy przed startem, a nie w trakcie.',
          'Ustalamy trzy rzeczy: do jakich pól bot ma wgląd, czego nie widzi w ogóle i co wolno mu zrobić, a co tylko pokazać. Dostęp bota kończy się tam, gdzie się umówimy: nie dokładamy kolejnych systemów ani pól bez Twojej zgody.',
        ],
        punkty: [
          'Zanim bot zobaczy pierwsze zamówienie, mamy podpisaną umowę powierzenia przetwarzania danych.',
          'Materiały do bazy wiedzy wybierasz Ty i zostają Twoje, razem z konfiguracją.',
          'Klient od pierwszej wiadomości wie, że pisze z botem, a nie z pracownikiem sklepu.',
        ],
        wariant: 'top',
        chip: 'DANE',
        stopka: [
          'Zakres dostępów zapisujemy przed wdrożeniem, więc wiadomo, co bot widzi.',
          'Sprawy wymagające decyzji zostają przy Twoich ludziach.',
        ],
      },
    ],
  },

  /* Oś tej tabeli to PYTANIE TEJ STRONY: czy potrzebuję integracji, czy nie.
     Nie powiela ani tabeli rodzica („Chatbot a ręczna obsługa pytań klientów"),
     ani zestawienia trzech wariantów wyżej. Komórki krótkie (konwencja v20
     podstron), żeby wiersze nie łamały się na wąskich ekranach. */
  tabelaPorownawcza: {
    h2: 'Bot bez integracji a bot wpięty w sklep',
    naglowekBez: 'Bot bez integracji',
    naglowekZNami: 'Bot wpięty w sklep',
    wiersze: [
      {
        cecha: 'Dostępność',
        bez: 'Mówi, gdzie to sprawdzić',
        zNami: 'Podaje stan z bazy produktów',
      },
      {
        cecha: 'Dobór produktu',
        bez: 'Opisuje kategorie z treści',
        zNami: 'Porównuje parametry z bazy',
      },
      {
        cecha: 'Status zamówienia',
        bez: 'Odsyła do panelu klienta',
        zNami: 'Sprawdza po numerze zamówienia',
      },
      {
        cecha: 'Zwrot towaru',
        bez: 'Streszcza zasady zwrotu',
        zNami: 'Prowadzi przez zgłoszenie',
      },
      {
        cecha: 'Trudna sprawa',
        bez: 'Zbiera kontakt do klienta',
        zNami: 'Oddaje obsłudze z rozmową',
      },
      {
        cecha: 'Co od Ciebie bierzemy',
        bez: 'Treści, cennik, procedury',
        zNami: 'To samo plus dostępy do systemów',
      },
      {
        cecha: 'Czas wdrożenia',
        bez: '1-2 dni robocze',
        zNami: '5-10 dni roboczych',
      },
    ],
  },

  kroki: {
    h2: 'Jak wygląda wdrożenie z integracjami?',
    items: [
      {
        tytul: 'Ustalamy zakres na bezpłatnej rozmowie',
        opis:
          'Obejrzymy Twój sklep i powiemy, co zastaliśmy: z jakich systemów bot ma czytać, na które pytania ma odpowiadać sam, a które sprawy zostają dla obsługi. To rozmowa o zakresie, nie pomiar i nie raport.',
      },
      {
        tytul: 'Wpinamy bota w bazę produktów i zamówienia',
        opis:
          'Dostajemy dostępy, podpinamy Twoje treści i uczymy bota czytać dane sklepu. Testujemy na Twoich prawdziwych produktach i zamówieniach, nie na przykładowych, bo tylko wtedy widać, gdzie brakuje danych.',
      },
      {
        tytul: 'Start na sklepie i dwie rundy poprawek',
        opis:
          'Bot rusza, Ty zbierasz uwagi z prawdziwych rozmów, my je wdrażamy. Dwie rundy poprawek są w cenie wdrożenia. Całość to 5-10 dni roboczych, liczonych od przekazania dostępów i materiałów.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje chatbot dla sklepu internetowego?',
    tresc:
      'Bot wpięty w bazę produktów i system zamówień to próg 8000-15000 zł netto i 5-10 dni roboczych. Bot bez integracji zaczyna się od 1790 zł netto. Do wdrożenia dochodzi utrzymanie i zużycie tokenów, czyli dwie osobne pozycje.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '8000-15000 zł netto',
            opis: 'wdrożenie z integracjami ze sklepem',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '5-10 dni roboczych',
            opis: 'od przekazania dostępów i materiałów',
            zrodlo: 'trzeci krok wdrożenia wyżej',
            ton: 'violet',
          },
          {
            wartosc: '1790 zł netto',
            opis: 'bot bez integracji, gdy sklep ich nie potrzebuje',
            zrodlo: 'sekcja o progu prostym niżej',
            ton: 'green',
          },
          {
            wartosc: '2 rundy',
            opis: 'poprawek w cenie wdrożenia',
            zrodlo: 'trzeci krok wdrożenia wyżej',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Trzy pozycje na rachunku za bota w sklepie',
        ikona: 'kalkulator',
        chip: 'CENNIK',
        overline: 'WDROŻENIE · UTRZYMANIE · TOKENY',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Wdrożenie, płacone raz',
            akapity: [
              'Budowa bota, wpięcie w Twoje systemy, testy na Twoich danych i publikacja. Przy integracjach ze sklepem to 8000-15000 zł netto, a o miejscu w tych widełkach decyduje liczba systemów i zakres pracy.',
            ],
            punkty: [
              'Bez integracji: od 1790 zł netto.',
              'Dwie rundy poprawek w cenie.',
            ],
          },
          {
            naglowek: 'Utrzymanie, co miesiąc albo wcale',
            akapity: [
              'Masz dwa warianty i pokazujemy oba. Infrastruktura u nas: 99-599 zł netto miesięcznie. Infrastruktura przekazana Tobie: 0 zł miesięcznie, a późniejsze poprawki rozliczamy po 350 zł netto za godzinę.',
            ],
            punkty: [
              'Wariant wybierasz Ty, nie my.',
              'Z abonamentu można wyjść i zostać z botem.',
            ],
          },
          {
            naglowek: 'Tokeny, czyli praca modelu',
            akapity: [
              'To opłata za samą pracę modelu językowego i rozliczasz ją po swojej stronie, u dostawcy, według faktycznego zużycia. Jako jedyna pozycja nie jest stała: idzie w górę i w dół razem z liczbą rozmów w sklepie.',
            ],
            punkty: [
              'Płacisz za to, co bot faktycznie obsłużył.',
              'Po pierwszej fakturze znasz już swój realny rząd wielkości.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Ile kosztuje Cię miesiąc bez tego?',
        ikona: 'wykres-strzalka',
        chip: 'POLICZ SAM',
        overline: 'TWOJE LICZBY · BEZ NASZYCH PRZYKŁADÓW',
      },
      /* WZÓR, NIE FORMULARZ. Na stronie nie ma i nie będzie pól do wpisania,
         bo silnik bloków treści nie ma typu formularza. Ta sekcja mówi więc
         to, co strona faktycznie robi: podaje wzór do policzenia na kartce,
         na Twoich liczbach. Zero wartości domyślnych i zero naszych przykładów
         (uwaga wdrożeniowa §3), zero obietnicy funkcji, której tu nie ma. */
      {
        typ: 'sekcja',
        naglowek: 'Policz to na swoich liczbach, nie na naszych',
        akapity: [
          'Nie wstawiamy tu przykładowych kwot, bo w każdym sklepie wychodzą inne, a cudza liczba w takim rachunku służy tylko do robienia wrażenia. Zamiast gotowego wyniku dajemy wzór: liczby bierzesz ze swojego sklepu, a działania są dwa i mieszczą się w jednej linijce każde.',
          'Rachunek zajmuje kilka minut na kartce i mówi, o jakiej kwocie w ogóle rozmawiamy, zanim zapytasz nas o wycenę. Wzór stoi w tabeli niżej.',
        ],
        wariant: 'edge',
        chip: 'WZÓR',
        stopka: [
          'Żadna z tych wielkości nie ma u nas wartości domyślnej. Wszystkie podajesz Ty.',
          'Pytania po godzinach to rozmowy, których dziś nikt nie odbiera. Bot zaczyna je od razu.',
        ],
      },
      /* Tabela ze wzorem zamiast czterech pól (decyzja właściciela). Cztery
         pierwsze wiersze to wielkości, które czytasz ze swojego sklepu, dwa
         ostatnie to działania na nich. Trzecia tabela na tej stronie, ale
         niesie inny fakt niż tamte dwie: tamte porównują warianty obsługi,
         ta pokazuje rachunek. ZERO KWOT: same nazwy wielkości i działania. */
      {
        typ: 'tabela',
        naglowki: ['Co liczysz', 'Jak to policzyć'],
        wiersze: [
          [
            'Pytania w miesiącu',
            'Policz pytania o dostępność, dobór produktu, status zamówienia i zwrot z ostatniego miesiąca',
          ],
          [
            'Czas jednej odpowiedzi',
            'Sprawdź, ile minut zajmuje Twojej obsłudze odpisanie na jedno takie pytanie',
          ],
          [
            'Stawka godzinowa',
            'Weź koszt godziny pracy osoby, która dziś na te pytania odpowiada',
          ],
          [
            'Pytania po godzinach',
            'Policz, ile z tych pytań pada wtedy, gdy Twojej obsługi nie ma przy biurku',
          ],
          ['Minuty w miesiącu', 'Pytania w miesiącu razy czas jednej odpowiedzi'],
          [
            'Koszt miesiąca',
            'Minuty w miesiącu podzielone przez 60, razy stawka godzinowa',
          ],
        ],
        wKarcie: true,
        podpis:
          'Wzór na koszt miesiąca bez bota: cztery górne wiersze to liczby z Twojego sklepu, dwa dolne to działania, które na nich wykonujesz.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy wystarczy Ci bot za 1790 zł netto?',
        akapity: [
          'Integracje kosztują, więc mówimy wprost, kiedy nie są Ci potrzebne. Jeśli poznajesz swój sklep w tych punktach, weź próg prosty i wróć do integracji wtedy, gdy urośnie asortyment albo liczba zamówień.',
        ],
        punkty: [
          'Stan magazynowy widać na karcie produktu i klient nie musi o niego pytać.',
          'Statusy wysyłki idą do klientów automatem ze sklepu, razem z numerem przesyłki.',
          'Zwroty przyjmujesz przez jeden formularz i procedura mieści się na jednej stronie.',
          'Asortyment jest wąski, a pytania powtarzają się w kilku wariantach.',
          'Chcesz zacząć od małego kroku i sprawdzić, o co klienci naprawdę pytają.',
        ],
        wariant: 'top',
        chip: 'PRÓG PROSTY',
        stopka: [
          'Bot bez integracji wdrażamy w 1-2 dni robocze.',
          'Powiemy to na rozmowie, zamiast sprzedawać integracje, których nie użyjesz.',
        ],
      },
    ],
    /* `minPrice` = 1790, czyli ta sama liczba co u rodzica i w Service JSON-LD
       całej usługi. To NIE jest cena wdrożenia z integracjami (8000-15000 zł
       netto stoi w `tresc`, w pasie metryk i w FAQ), tylko uczciwy dolny próg:
       ta strona sprzedaje także bota bez integracji i ma na to osobną sekcję.
       Kafel w hero renderuje więc „od 1790 zł", co jest prawdą dla tej strony.
       `cenaStala` ŚWIADOMIE NIE USTAWIONE: ceny chatbotów są widełkami. */
    minPrice: 1790,
    /* Po cenę pozycja po pozycji idzie się na podstronę cennika (rozdział
       intencji pakietu §P1: podstrony zastosowań nie rozwijają cennika
       u siebie, tylko do niego linkują). */
    linkPoradnik: {
      przed: 'Wszystkie progi i pozycje rozliczeniowe rozpisaliśmy osobno: ',
      etykieta: 'cennik chatbotów AI',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  faq: [
    {
      pytanie: 'Ile kosztuje chatbot dla sklepu internetowego?',
      odpowiedz:
        'Bot wpięty w bazę produktów i system zamówień to 8000-15000 zł netto, a wdrożenie trwa 5-10 dni roboczych. Bot bez integracji zaczyna się od 1790 zł netto. Do tego dochodzi utrzymanie: 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie. Tokeny rozliczasz u dostawcy modelu według zużycia.',
    },
    {
      pytanie: 'Ile trwa wdrożenie bota w moim sklepie?',
      odpowiedz:
        'Wpięcie w bazę produktów i system zamówień to 5-10 dni roboczych. Bot bez integracji wdrażamy w 1-2 dni robocze. Czas liczymy od przekazania dostępów i materiałów, a nie od podpisania umowy. Po starcie masz dwie rundy poprawek w cenie wdrożenia.',
    },
    {
      pytanie: 'Czy bot sprawdzi status zamówienia mojego klienta?',
      odpowiedz:
        'Tak, gdy wepniemy go w Twój system zamówień. Bez tego połączenia bot poda zasady wysyłki i przekaże sprawę obsłudze, ale nie powie, gdzie jest konkretna paczka.',
    },
    {
      pytanie: 'Z czym bot łączy się w sklepie?',
      odpowiedz:
        'Z bazą produktów, systemem zamówień i CRM. Zakres ustalamy i spisujemy przed startem: do jakich pól bot ma wgląd, czego nie widzi w ogóle i co wolno mu zrobić, a co tylko pokazać.',
    },
    {
      pytanie: 'Skąd bot wie, czy produkt jest na stanie?',
      odpowiedz:
        'Ze stanu w Twojej bazie produktów, nie z opisu na stronie. Gdy danej brakuje albo pytanie wychodzi poza ustalony zakres, bot mówi to wprost i oddaje sprawę człowiekowi razem z tym, o co klient pytał.',
    },
    {
      pytanie: 'Czy bot obsłuży zwrot i reklamację?',
      odpowiedz:
        'Prowadzi klienta przez Twoją procedurę i zbiera komplet danych zgłoszenia, żeby obsługa nie musiała dopytywać o podstawy. Decyzję o uznaniu reklamacji zostawiamy człowiekowi, bo to nie jest pytanie o informację.',
    },
    {
      pytanie: 'Co z danymi moich klientów, kiedy bot sięga do zamówień?',
      odpowiedz:
        'Zanim bot zobaczy pierwsze zamówienie, mamy podpisaną umowę powierzenia przetwarzania danych. Zakres dostępów spisujemy przed wdrożeniem: do jakich pól bot ma wgląd, czego nie widzi w ogóle i co wolno mu zrobić, a co tylko pokazać. Nie dokładamy kolejnych systemów ani pól bez Twojej zgody. Klient od pierwszej wiadomości wie, że pisze z botem, a nie z pracownikiem sklepu.',
    },
    {
      pytanie: 'Mam mały sklep. Czy na pewno potrzebuję integracji?',
      odpowiedz:
        'Nie zawsze. Jeśli stan magazynowy widać na karcie produktu, statusy wysyłki idą do klientów automatem, a zwroty przyjmujesz przez jeden formularz, wystarczy bot bez integracji za 1790 zł netto, wdrażany w 1-2 dni robocze. Powiemy to na rozmowie, zamiast sprzedawać Ci integracje, których nie użyjesz.',
    },
  ],

  /* Jedna decyzja domykająca stronę: rozmawiamy o wpięciu bota w mój sklep.
     Mikrokopia trzyma się ustalenia właściciela z 2026-08-31 (bezpłatna
     rozmowa to badanie potrzeb): obejrzymy, ustalimy zakres, policzymy na
     Twoich liczbach. Zero obietnicy pomiaru, testu, audytu i raportu.
     Zero kwot, bo kwoty zostają w sekcji ceny. */
  cta: {
    label: 'Umów bezpłatną rozmowę o sklepie',
    href: '#diagnoza',
    mikrokopia:
      'Obejrzymy Twój sklep i jego systemy, ustalimy zakres integracji i policzymy to na Twoich liczbach. Bez zobowiązań.',
    dowod:
      'Zanim cokolwiek zamówisz, możesz przetestować naszego bota na stronie usługi chatbotów. Najpierw sprawdzasz sam, potem decydujesz.',
  },

  queries: [
    'chatbot dla sklepu internetowego',
    'chatbot AI do sklepu internetowego',
    'chatbot e-commerce',
    'chatbot ze statusem zamówienia',
    'chatbot z integracją ze sklepem',
    'bot do obsługi zwrotów w sklepie',
  ],

  /* POWIĄZANIA (pakiet §P4 sekcja 10 plus uwaga wdrożeniowa §4: każda
     podstrona linkuje zwrotnie do `/uslugi/chatboty` i do
     `/uslugi/chatboty/cennik`). Doszedł link do `/baza-wiedzy`, bo rozdział
     intencji §P4 mówi wprost: tej strony nie powielamy tematem RAG, tylko
     tam linkujemy. Etykieta = H1 strony docelowej, opis = fakt, który stoi
     na tamtej stronie. ZERO KWOT w tej sekcji: kwoty zostają w sekcji ceny. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firmy',
        href: '/uslugi/chatboty',
        opis: 'Cała usługa: progi wdrożenia, kanały, model utrzymania i żywy bot, którego możesz kliknąć i sprawdzić sam.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis: 'Wszystkie progi i pozycje rozliczeniowe w jednym miejscu: za co płacisz raz, a co wraca co miesiąc.',
      },
      {
        etykieta: 'Chatbot do obsługi klienta, który odpowiada o 22:00',
        href: '/uslugi/chatboty/obsluga-klienta',
        opis: 'Pytania ogólne i odciążenie biura obsługi, także po godzinach i w weekend, z przekazaniem trudnej sprawy do człowieka.',
      },
      {
        etykieta: 'Chatbot, który zbiera i kwalifikuje leady',
        href: '/uslugi/chatboty/generowanie-leadow',
        opis: 'Druga strona tej samej rozmowy: zamiana anonimowego ruchu w kontakt z kompletem informacji dla handlowca.',
      },
      {
        etykieta: 'Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)',
        href: '/uslugi/chatboty/baza-wiedzy',
        opis: 'Skąd bot bierze odpowiedzi i dlaczego nie zmyśla: mechanizm bazy wiedzy opisany osobno, dla każdego progu wdrożenia.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis: 'Wpisujesz swój koszt obsługi i kwotę wdrożenia, a kalkulator mówi, po ilu miesiącach to się spina. Liczby podajesz Ty.',
      },
    ],
  },
};
