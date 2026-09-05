import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 8 — HOTELE I PENSJONATY
 * (`/uslugi/chatboty/hotele-pensjonaty`).
 * Fraza primary: „chatbot dla hotelu" (pakiet `.seo-przeglad/pakiety/chatboty.md`
 * §P8, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/chatboty`):
 *  - RODZIC sprzedaje CAŁĄ usługę chatbota dla dowolnej firmy: czym bot różni
 *    się od AI Agenta, trzy progi cenowe z drabiną 1790 / 3000-6000 /
 *    8000-15000 zł netto, rundy poprawek, dwa modele utrzymania.
 *  - TA STRONA to JEDYNA podstrona branżowa w pakiecie i sprzedaje wyłącznie
 *    jedno: bota w obiekcie noclegowym. Jest tu więc sezonowość, pytania
 *    o dostępność i cenę pobytu, doba hotelowa, zwierzęta, parking, dojazd
 *    oraz zapytania wieczorne i weekendowe. Kończy się jedną decyzją:
 *    rozmawiamy o bocie dla mojego obiektu.
 *  - NIE MA TU I BYĆ NIE MOŻE: drabiny trzech progów (rodzic i `/cennik`),
 *    rozwoju bota w AI Agenta (rodzic), opisu kanałów komunikatorowych
 *    (siostra `whatsapp-messenger`) ani ogólnego odciążenia biura obsługi
 *    (siostra `obsluga-klienta`). Do wszystkich prowadzi LINK w „Powiązanych",
 *    treść zostaje na tamtych stronach.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - układ 14 sekcji, H1, fraza główna i rozdział intencji: pakiet §P8,
 *  - sześć tematów pytań w obiekcie (dostępność, cena pobytu, doba hotelowa,
 *    zwierzęta, parking, dojazd): pakiet §P8 sekcja 2,
 *  - Przystań Jurgen (strona WWW plus chatbot, obiekt sezonowy, w sezonie
 *    około 100 zapytań od 20-50 klientów): pakiet §P8 sekcja 3 i sekcja
 *    REALIZACJE konspektu (`AUDYT-WDROZENIOWY-2026-08-18.md` §7),
 *  - cena wdrożenia i czas (od 1790 zł netto, 1-2 dni robocze): pakiet §P8
 *    sekcje 6 i 7, zgodne co do złotówki z `lib/uslugi/chatboty.ts` (próg
 *    prosty, `ramaCeny.minPrice` = 1790),
 *  - model utrzymania (99-599 zł netto miesięcznie u nas albo 0 zł miesięcznie
 *    po przekazaniu infrastruktury, poprawki 350 zł netto za godzinę):
 *    pakiet §P8 sekcja 7 plus uwaga wdrożeniowa §7, która narzuca DOKŁADNIE
 *    to brzmienie w całym pakiecie,
 *  - voicebot prosty 2500 zł netto oraz „nie dzwoni sam": pakiet §P8 sekcja 9
 *    i `lib/uslugi/podstrony/odbieranie-telefonow.ts` (kapsuła),
 *  - ceny stron WWW (landing 1590 zł netto / 1 dzień roboczy, strona biznesowa
 *    2900 zł netto / 2-4 dni robocze): pakiet §P8 sekcja 10, zgodne
 *    z `lib/uslugi/strony-www.ts`,
 *  - „24/7": wiersz „Godziny odpowiedzi" z tabeli porównawczej TEJ strony
 *    (odpowiednik wiersza „Dostępność" u rodzica). Ciąg „24/7" musi w tej
 *    komórce zostać: bierze go bramka `ServiceHero.kafleStatystyk`.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1790 zł netto, 1-2 dni robocze, 99-599 zł netto miesięcznie, 0 zł
 *  miesięcznie, 350 zł netto za godzinę, 2500 zł netto, 1590 zł netto,
 *  1 dzień roboczy, 2900 zł netto, 2-4 dni robocze, około 100 zapytań,
 *  20-50 klientów, 24/7, sześć tematów pytań (policzone z listy na tej
 *  stronie), pięć sytuacji „kiedy się nie opłaci" (policzone z listy).
 *  Każda NASZA kwota z dopiskiem netto. Przy „0 zł" dopisku netto NIE MA,
 *  bo zero netto to zero brutto.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ani roku wdrożenia
 *  w Przystani Jurgen, ani liczby obiektów noclegowych, które obsługujemy,
 *  ani żadnego odniesienia czasowego typu „pół roku temu". Nie podaje też,
 *  czy Przystań Jurgen jest hotelem czy pensjonatem, więc na stronie stoi
 *  wyłącznie to, co potwierdzone: obiekt sezonowy, strona WWW plus chatbot.
 *  Wszystkie zdania są napisane tak, żeby były prawdziwe bez tych danych.
 *
 * ZAKAZANE NA TEJ STRONIE: nazywanie bota cyfrową obsadą recepcji (zakaz
 * z briefu, w każdej odmianie: bot to bot, a nie osoba na etacie recepcji);
 * obietnica, że bot pokaże wolne terminy bez integracji z systemem rezerwacji;
 * obietnica pomiaru, testu, audytu ani raportu na bezpłatnej rozmowie (ustalenie
 * właściciela z 2026-08-31: bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb);
 * jakakolwiek sugestia, że voicebot dzwoni sam; ceny konkurencji.
 *
 * GDZIE WOLNO POSTAWIĆ KWOTĘ (doprecyzowanie kontroli 2026-09-04, bo poprzednie
 * brzmienie tej reguły przeczyło własnej treści pliku): kapsuła, metaTitle,
 * metaDescription, sekcja `ramaCeny` z jej blokami i FAQ. Kapsuła MUSI nieść
 * kwotę wejściową, bo to kontrakt bloku krótkiej odpowiedzi (tak samo robi
 * próbka wzorcowa `podstrony/audyt-widocznosci-w-ai.ts`). NIGDZIE INDZIEJ:
 * uwaga wdrożeniowa §6 pakietu GEO trzymana też tutaj, więc w kartach
 * „Powiązane", w opisach linków i w `cta` nie ma ani jednej złotówki.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5 pakietu: wszystkie osiem podstron bez własnych
 * akcentów), a renderuje się TYMI SAMYMI komponentami co strony usług
 * i pozostałe podstrony. Zero nowych typów bloków, zero nowego CSS.
 *
 * LINKI DO SIÓSTR: `/uslugi/chatboty/cennik`, `/uslugi/chatboty/obsluga-klienta`
 * i `/uslugi/chatboty/whatsapp-messenger` stoją w „Powiązanych" (uwaga
 * wdrożeniowa §4: każda podstrona linkuje zwrotnie do `/uslugi/chatboty`
 * i do `/uslugi/chatboty/cennik`).
 */
export const hotelePensjonaty: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'hotele-pensjonaty',
  dataAktualizacji: '2026-09-01',

  h1: 'Chatbot dla hotelu i pensjonatu',

  /* KAPSUŁA: pakiet §P8 nie podaje gotowej kapsuły (podaje ją tylko dla P1, P2
     i P6), więc jest napisana tutaj i niesie komplet wielkości strony: co bot
     obsługuje, kiedy odpowiada, ile kosztuje, po ilu dniach działa i ile
     kosztuje utrzymanie. Zero faktów spoza listy źródeł z nagłówka pliku. */
  kapsula:
    'Chatbot dla hotelu i pensjonatu odpowiada gościom wtedy, kiedy pytają: wieczorem, w weekend i w szczycie sezonu. Obsługuje sześć tematów obiektu noclegowego: dostępność, cenę pobytu, dobę hotelową, zwierzęta, parking i dojazd. Kosztuje od 1790 zł netto i działa po 1-2 dniach roboczych. Utrzymanie to 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie.',

  /* metaTitle: pakiet §P8 dawał 31 znaków, konwencja repo (types.ts) mówi 50-60
     i taka jest decyzja właściciela. Fraza główna „chatbot dla hotelu" zostaje
     NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakty z tej strony: kwota
     wejściowa z `ramaCeny` i „24/7" z tabeli porównawczej. Długość 55 znaków.
     Layout dokleja sufiks marki, więc w SERP wychodzi
     „Chatbot dla hotelu i pensjonatu: od 1790 zł netto, 24/7 · SimpleFast.ai". */
  metaTitle: 'Chatbot dla hotelu i pensjonatu: od 1790 zł netto, 24/7',
  /* 153 znaki (kontrakt `Usluga`: 140-160). Przeliczone na łańcuchu z tego
     pliku 2026-09-04, dwa razy: pierwsza wersja komentarza mówiła błędnie
     o 158 znakach. */
  metaDescription:
    'Chatbot dla hotelu i pensjonatu odpowiada na pytania o termin, cenę pobytu, zwierzęta i parking, też w piątek o 21:00. Od 1790 zł netto, 1-2 dni robocze.',

  problem: {
    /* H2 1:1 z pakietu §P8 sekcja 1 (problem postawiony jako pytanie). Rodzic
       pyta „Ile razy dziennie odpowiadasz na to samo pytanie?", czyli o liczbę
       powtórzeń. Ta strona pyta o JEDEN moment, w którym pytanie przepada. */
    h2: 'Kto odpowiada na pytanie o wolny termin w piątek o 21:00?',
    tresc:
      'Gość pyta o nocleg wtedy, kiedy układa wyjazd: wieczorem, w weekend, w szczycie sezonu. Recepcja odpowiada wtedy, kiedy ktoś przy niej stoi.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Pytanie o nocleg ma krótki termin ważności. Gość, który nie dostał odpowiedzi, w kilka minut wysyła to samo do dwóch kolejnych obiektów w tej samej okolicy i rezerwuje tam, gdzie odpisano pierwsze.',
      },
      {
        typ: 'naglowek',
        tekst: 'Które pytania gościa nie mogą czekać do rana?',
        ikona: 'chat-dymek',
        chip: 'OBIEKT NOCLEGOWY',
        overline: 'TRZY PYTANIA, KTÓRE PRZESĄDZAJĄ O REZERWACJI',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Wolny termin',
            akapity: [
              'Gość pyta o konkretne daty, bo właśnie układa wyjazd. Odpowiedź w poniedziałek trafia w plan, który zapadł w sobotę wieczorem.',
            ],
          },
          {
            naglowek: 'Warunek, który przesądza',
            akapity: [
              'Pies, miejsce dla busa, wjazd po północy. Bez tej jednej odpowiedzi gość nie rezerwuje, tylko otwiera kolejną stronę z noclegami.',
            ],
          },
          {
            naglowek: 'Cena pobytu, nie cena doby',
            akapity: [
              'Gość liczy całość: tyle nocy, tyle osób, dopłaty. Pyta, bo cennik na stronie odpowiada zwykle tylko na część tego rachunku.',
            ],
          },
        ],
      },
      {
        /* SEKCJA 5 PAKIETU, świadomie PODNIESIONA WYSOKO (uwaga wdrożeniowa §2:
           materiał najmocniejszy do cytowania idzie do góry, o ile nie rozbija
           bloku cenowego). Sezonowość to oś tej podstrony, więc stoi już
           w sekcji problemu, a nie dopiero przy cenie. Zero kwot: uwaga §6
           trzyma złotówki wyłącznie w `ramaCeny` i FAQ. */
        typ: 'sekcja',
        naglowek: 'Dlaczego szczyt sezonu boli najbardziej?',
        akapity: [
          'W szczycie pytania przychodzą dokładnie wtedy, kiedy obiekt jest najbardziej zajęty. Ta sama osoba melduje gości, wydaje klucze i odbiera telefon, a wiadomości czekają na wolną chwilę, której w szczycie po prostu nie ma.',
          'Poza sezonem jest odwrotnie: zapytań mało, a telefon i tak musi ktoś odbierać. Bot nie zna tej różnicy. W szczycie odpowiada wszystkim naraz, poza sezonem czeka, a jego koszt nie chodzi za liczbą zapytań.',
        ],
        wariant: 'edge',
        chip: 'SEZON',
        stopka: [
          'Na lipiec i sierpień nie trzeba dokładać osoby do odpisywania.',
          'Poza sezonem nie płacisz za dyżur przy telefonie, którego nikt nie wykonuje.',
        ],
      },
    ],
  },

  rozwiazanie: {
    /* Rodzic pyta „Co robi nasz chatbot, czego nie robi zwykły bot?" (różnica
       wobec bota z półki). Ta strona pyta o ZAKRES w jednej branży. */
    h2: 'Na co odpowiada bot w obiekcie noclegowym?',
    tresc:
      'Na sześć tematów, które w obiekcie noclegowym wracają w każdym sezonie: dostępność, cenę pobytu, dobę hotelową, zwierzęta, parking i dojazd. Odpowiedzi składa z regulaminu i cennika Twojego obiektu.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '24/7',
            opis: 'bot odpowiada o każdej porze, także po zamknięciu recepcji',
            zrodlo: 'wiersz „Godziny odpowiedzi" z tabeli porównawczej',
            ton: 'cyan',
          },
          {
            wartosc: 'ok. 100 zapytań',
            /* KONTROLA 2026-09-04: było „tyle obsłużył bot"; źródło mówi
               o zapytaniach zebranych przez stronę WWW razem z botem. */
            opis: 'tyle zebrała strona z botem w Przystani Jurgen w sezonie',
            zrodlo: 'wdrożenie opisane na końcu tej sekcji',
            ton: 'violet',
          },
          {
            wartosc: '20-50 klientów',
            opis: 'tylu gości stało za tymi zapytaniami',
            zrodlo: 'to samo wdrożenie, dane z jednego sezonu',
            ton: 'green',
          },
          {
            wartosc: '6 tematów',
            opis: 'tyle pytań obiektu bot bierze na siebie',
            zrodlo: 'lista sześciu kart w tej sekcji',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Sześć pytań, które bot bierze na siebie',
        ikona: 'glob-siatka',
        chip: 'ZAKRES',
        overline: 'JEDNA BAZA WIEDZY · REGULAMIN I CENNIK OBIEKTU',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Dostępność',
            akapity: [
              'Bot prowadzi gościa przez zasady rezerwacji, które sam ustalasz: jak zarezerwować, na jak długo i co dzieje się po zgłoszeniu. Wolne daty na żywo pokaże dopiero po podpięciu do Twojego systemu rezerwacji.',
            ],
          },
          {
            naglowek: 'Cena pobytu',
            akapity: [
              'Nie sama cena doby, tylko rachunek za pobyt: liczba nocy, liczba osób, dopłaty i to, co jest w cenie. Gość dostaje odpowiedź w rozmowie, zamiast czekać na wycenę mailem.',
            ],
          },
          {
            naglowek: 'Doba hotelowa',
            akapity: [
              'Od której można się zameldować, do której trzeba zwolnić pokój i co zrobić przy późnym przyjeździe. Krótkie zasady, które łatwiej dostać w rozmowie niż wyszukać w regulaminie.',
            ],
          },
          {
            naglowek: 'Zwierzęta',
            akapity: [
              'Czy pies może wejść, na jakich warunkach i za jaką dopłatą. Bez tej odpowiedzi część gości rezygnuje po cichu i nie pisze drugi raz.',
            ],
          },
          {
            naglowek: 'Parking',
            akapity: [
              'Czy jest miejsce, czy trzeba je rezerwować i co z przyczepą albo busem. Odpowiedź stoi w bazie wiedzy, więc nie zależy od tego, kto akurat odbiera.',
            ],
          },
          {
            naglowek: 'Dojazd',
            akapity: [
              'Jak dojechać, gdzie skręcić na końcu i co zrobić po przyjeździe poza godzinami recepcji. Bot odsyła też do właściwej podstrony z mapą, jeśli ją masz.',
            ],
          },
        ],
      },
      {
        /* SEKCJA 4 PAKIETU: bot kontra telefon w recepcji kontra formularz
           kontaktowy. Kontrakt `tabelaPorownawcza` ma tylko dwie kolumny
           (bez / z nami), więc porównanie TRZECH kanałów idzie blokiem
           `tabela`, a `tabelaPorownawcza` niżej porównuje co innego:
           nie pojedyncze pytanie, tylko sposób pracy obiektu. Zero zdań
           wspólnych między tymi dwiema tabelami. */
        typ: 'tabela',
        naglowki: ['Pytanie gościa', 'Telefon w recepcji', 'Formularz kontaktowy', 'Chatbot na stronie'],
        wiersze: [
          /* KONTROLA 2026-09-04: ostatnia komórka brzmiała „odpowiedź w rozmowie",
             co przy nagłówku wiersza „Wolny termin" czytało się jako obietnica,
             że bot poda wolne daty bez integracji z systemem rezerwacji (zakaz
             z nagłówka tego pliku, sprzeczne też z wierszem „Wolne daty na żywo
             -> Dopiero po integracji" w tabeli porównawczej niżej). */
          ['Wolny termin w piątek o 21:00', 'nikt nie odbiera', 'odpowiedź w poniedziałek', 'zasady rezerwacji od razu'],
          ['Czy można z psem', 'trzeba trafić w grafik', 'gość czeka na maila', 'wprost z regulaminu'],
          ['Ile wyjdzie za trzy noce', 'ktoś musi policzyć', 'wycena mailem', 'z cennika pobytu'],
          ['Dziesiąte takie pytanie tego dnia', 'ta sama rozmowa od nowa', 'ten sam mail od nowa', 'ten sam koszt co pierwsze'],
          ['Kontakt do gościa', 'zostaje w pamięci', 'jest w formularzu', 'bot zapisuje go z czatu'],
          ['Skok zapytań w szczycie', 'kolejka do telefonu', 'skrzynka rośnie', 'wszyscy naraz, bez kolejki'],
        ],
        wKarcie: true,
        podpis:
          'Co dzieje się z jednym pytaniem gościa w trzech kanałach obiektu noclegowego: przy telefonie w recepcji, w formularzu kontaktowym i w chatbocie na stronie.',
      },
      {
        /* SEKCJA 3 PAKIETU: jedyny dowód z nazwą pasujący do tej branży.
           Świadomie BEZ przypisania obiektu do kategorii „hotel" lub
           „pensjonat": źródło (AUDYT §7) mówi wyłącznie o działaniu sezonowym
           i o zestawie „strona WWW plus chatbot". */
        typ: 'sekcja',
        naglowek: 'Co pokazało wdrożenie w Przystani Jurgen?',
        akapity: [
          /* KONTROLA 2026-09-04: było „bot obsłużył około 100 zapytań". Źródło
             (`AUDYT-WDROZENIOWY-2026-08-18.md` §7 i `pakiety/strony.md`) mówi
             o zestawie „strona WWW plus chatbot" i o zapytaniach „zebranych
             przez stronę i bota", a walidacja pakietu wycięła już raz dopisek
             „obsłużonych bez angażowania człowieka", bo nikt tego nie mierzył.
             Przypisanie całej setki samemu botowi wracało tą samą ścieżką. */
          'Przystań Jurgen dostała od nas stronę WWW razem z chatbotem. Obiekt pracuje sezonowo, więc ruch nie rozkłada się równo przez rok: w sezonie strona z botem zebrała około 100 zapytań od 20 do 50 klientów.',
          'To liczby z jednego wdrożenia i z jednego sezonu, nie średnia rynkowa. Podajemy je, bo pokazują skalę, o której tu mówimy: nie tysiące rozmów dziennie, tylko tyle pytań, ile realnie ma niewielki obiekt.',
        ],
        wariant: 'edge',
        chip: 'REALIZACJA',
      },
    ],
  },

  /* Komórki krótkie, żeby wiersze nie łamały się na wąskich ekranach. Policzone
     2026-09-04 na TEJ tabeli, a nie zaokrąglone z sąsiedniej podstrony: `cecha`
     do 19 znaków, `bez` do 31, `zNami` do 29. Poprzedni komentarz podawał
     „cecha ~18 znaków, kolumny ~32", czyli obie liczby mijały się z plikiem.
     Kolumna „bez" opisuje wyłącznie to, jak wygląda ręczna obsługa: zero ocen
     czyjejkolwiek roboty. */
  tabelaPorownawcza: {
    h2: 'Obiekt bez bota i obiekt z botem, punkt po punkcie',
    naglowekBez: 'Recepcja i skrzynka',
    naglowekZNami: 'Chatbot na stronie obiektu',
    wiersze: [
      {
        /* KONTROLA 2026-09-04: `zNami` MUSI zawierać ciąg „24/7". Poprzednie
           brzmienie („Cała doba, siedem dni w tygodniu") tego ciągu nie miało,
           więc bramka w `ServiceHero.kafleStatystyk` nie łapała wiersza i hero
           tej podstrony renderowało 3 kafle zamiast 4 (dokładnie regresja v20
           opisana w `podstrony/odbieranie-telefonow.ts`). Zero nowego faktu:
           „24/7" stoi już w metaTitle i w pasie metryk, a „21:00" w H2 sekcji
           problemu, w metaDescription i w tabeli trzech kanałów. */
        cecha: 'Godziny odpowiedzi',
        bez: 'Gdy ktoś jest przy telefonie',
        zNami: '24/7, także w piątek o 21:00',
      },
      {
        /* KONTROLA 2026-09-04: było „Wszyscy naraz, bez kolejki", czyli komórka
           IDENTYCZNA z komórką tabeli trzech kanałów wyżej (dice 1,00), co
           przeczyło deklaracji „zero zdań wspólnych między tymi dwiema
           tabelami". Sens bez zmian. */
        cecha: 'Szczyt sezonu',
        bez: 'Kolejka przy meldowaniu',
        zNami: 'Tyle rozmów naraz, ile trzeba',
      },
      {
        cecha: 'Martwy sezon',
        bez: 'Dyżur przy telefonie mimo ciszy',
        zNami: 'Koszt nie chodzi za ruchem',
      },
      {
        cecha: 'Źródło odpowiedzi',
        bez: 'Pamięć osoby, która odbiera',
        zNami: 'Regulamin i cennik obiektu',
      },
      {
        cecha: 'Nowa osoba na sezon',
        bez: 'Trzeba ją wdrożyć od zera',
        zNami: 'Baza wiedzy jest już gotowa',
      },
      {
        cecha: 'Wieczorne zapytanie',
        bez: 'Rano, jeśli ktoś je odkopie',
        zNami: 'Kontakt zapisany od razu',
      },
      {
        cecha: 'Wolne daty na żywo',
        bez: 'Recepcja patrzy w kalendarz',
        zNami: 'Dopiero po integracji',
      },
    ],
  },

  /* SEKCJA 6 PAKIETU. Krok 1 pilnuje ustalenia właściciela z 2026-08-31:
     bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb, więc nie ma tu obietnicy
     pomiaru, testu, audytu ani raportu. Wolno: obejrzymy, posłuchamy,
     ustalimy zakres. */
  kroki: {
    h2: 'Jak wdrażamy bota w obiekcie noclegowym w 1-2 dni robocze?',
    items: [
      {
        tytul: 'Bezpłatna rozmowa',
        opis:
          'Obejrzymy stronę Twojego obiektu i posłuchamy, o co pytają goście przed rezerwacją. Ustalimy zakres bota i powiemy wprost, czego on nie obsłuży. To badanie potrzeb, nie audyt: nic tu nie mierzymy i nie oddajemy raportu.',
      },
      {
        tytul: 'Baza wiedzy obiektu',
        opis:
          'Zbieramy w jedno miejsce cennik pobytu, dobę hotelową, zasady dla zwierząt, parking i dojazd. Jeśli części z tego nie ma nigdzie na piśmie, spisujemy to razem z Tobą, zanim bot ruszy.',
      },
      {
        tytul: 'Start przed sezonem',
        opis:
          'Stawiamy bota na stronie obiektu, testujesz go u siebie i ustawiasz ton wypowiedzi. Kiedy w rozmowach pojawi się pytanie spoza bazy, dokładamy na nie odpowiedź.',
      },
    ],
  },

  ramaCeny: {
    /* SEKCJA 7 PAKIETU. Rodzic pyta „Ile kosztuje wdrożenie chatbota?"
       i rozkłada trzy progi. Ta strona podaje wyłącznie próg wejściowy dla
       obiektu noclegowego i odsyła po drabinę do `/uslugi/chatboty/cennik`. */
    h2: 'Ile kosztuje chatbot dla hotelu i pensjonatu?',
    tresc:
      'Chatbot dla obiektu noclegowego zaczyna się od 1790 zł netto i działa po 1-2 dniach roboczych. Utrzymanie kosztuje 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie i płacisz wtedy tylko za zamówione poprawki, po 350 zł netto za godzinę.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1790 zł netto',
            opis: 'bot na stronie obiektu, płatność jednorazowa',
            zrodlo: 'kwota wejściowa z kapsuły na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '1-2 dni robocze',
            opis: 'od przekazania cennika, regulaminu i zasad obiektu',
            zrodlo: 'krok „Baza wiedzy obiektu" wyżej',
            ton: 'green',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'utrzymanie miesięcznie, gdy infrastruktura stoi u nas',
            zrodlo: 'zdanie o dwóch modelach utrzymania nad pasem',
            ton: 'amber',
          },
          {
            wartosc: '0 zł',
            opis: 'utrzymanie miesięcznie, gdy przekazujemy infrastrukturę Tobie',
            zrodlo: 'to samo zdanie, druga ścieżka',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co jeszcze bywa potrzebne obok bota w obiekcie?',
        ikona: 'lupa-wykres',
        chip: 'CENNIK',
        overline: 'TRZY DECYZJE, KTÓRE STOJĄ OBOK WDROŻENIA',
      },
      {
        /* SEKCJA 8 PAKIETU: bot na stronie i bot na WhatsAppie, co wybrać.
           Świadomie KRÓTKO i bez listy kanałów: pełny opis kanałów to siostra
           `/uslugi/chatboty/whatsapp-messenger`, link stoi w „Powiązanych".
           Zero kwoty za kanał: wycena kanału należy do `/cennik`. */
        typ: 'przelacznik',
        grupa: 'hotele-pensjonaty-kanal',
        opcje: [
          {
            numer: 'KANAŁ 1',
            tytul: 'Strona obiektu',
            podtytul: 'wejście domyślne',
            naglowek: 'Bot na stronie łapie gościa, który już Cię znalazł.',
            akapity: [
              'Gość jest na Twojej stronie, ogląda pokoje i ma jedno pytanie do rozstrzygnięcia. To najkrótsza droga od pytania do rezerwacji, więc od tego kanału zaczynamy w każdym obiekcie.',
            ],
            punkty: [
              'Bot stoi tam, gdzie gość porównuje obiekty.',
              'Rozmowa zostaje na Twojej stronie, a nie w cudzej aplikacji.',
              'To ten sam zakres, który wchodzi w kwotę wejściową wyżej.',
            ],
          },
          {
            numer: 'KANAŁ 2',
            tytul: 'WhatsApp',
            podtytul: 'kanał dokładany',
            naglowek: 'Bot na WhatsAppie łapie gościa, który pisze z telefonu w trasie.',
            akapity: [
              'Część gości pyta o nocleg z komórki, w drodze, i nie wraca w tym celu na stronę. Ten sam bot i ta sama baza wiedzy odpowiadają wtedy w oknie WhatsAppa.',
            ],
            punkty: [
              'Jedna baza wiedzy, zmienia się tylko okno rozmowy.',
              'Kanał dokładamy do gotowego bota, nie budujemy drugiego.',
              'Zakres i wycenę kanału ustalamy osobno, przy Twojej liście kanałów.',
            ],
          },
        ],
      },
      {
        /* SEKCJA 9 PAKIETU. Voicebot NIGDY nie dzwoni sam: zdanie zaprzeczające
           jest obowiązkowe i stoi tu wprost (kapsuła
           `podstrony/odbieranie-telefonow.ts` mówi to samo). */
        typ: 'sekcja',
        naglowek: 'Kiedy zamiast chatbota lepszy będzie voicebot?',
        akapity: [
          'Kiedy Twoi goście dzwonią, zamiast pisać. Chatbot tego nie rozwiąże, bo działa w oknie czatu. Wtedy potrzebny jest voicebot: bot, który odbiera telefon i odpowiada głosem na te same pytania o termin, zwierzęta i parking.',
          'Voicebot prosty kosztuje 2500 zł netto. Nie dzwoni do gości sam i nie prowadzi żadnej akcji telefonicznej: obsługuje wyłącznie połączenia przychodzące, czyli te, które ktoś do Ciebie wykonał.',
        ],
        punkty: [
          'Goście piszą, zamiast dzwonić: zaczynasz od chatbota na stronie obiektu.',
          'Goście dzwonią, a telefon zostaje bez odbioru: zaczynasz od voicebota.',
          'Jedno nie wyklucza drugiego, ale nie trzeba wdrażać obu naraz.',
        ],
        wariant: 'top',
        chip: 'VOICEBOT',
      },
      {
        /* SEKCJA 10 PAKIETU: ceny stron WWW. Kwoty stoją tutaj, czyli w sekcji
           ceny, i nigdzie indziej poza FAQ. */
        typ: 'sekcja',
        naglowek: 'Nie masz jeszcze strony obiektu?',
        akapity: [
          'Bot rozmawia z tym, kto już wszedł na stronę. Jeśli strony nie ma albo jest to sama wizytówka bez treści, najpierw robi się miejsce dla bota, a dopiero potem bota.',
          'Prosty landing z ofertą i formularzem robimy za 1590 zł netto w jeden dzień roboczy. Stronę biznesową z podstronami dla pokoi, cennika i dojazdu robimy za 2900 zł netto w 2-4 dni robocze. Chatbota dokładamy do jednej i do drugiej.',
        ],
        wariant: 'edge',
        chip: 'STRONA WWW',
        stopka: [
          'Stronę i bota da się zrobić w jednym podejściu.',
          'Tak powstało wdrożenie w Przystani Jurgen: strona WWW plus chatbot.',
        ],
      },
      {
        /* SEKCJA 11 PAKIETU („kiedy to się nie opłaci"). Uwaga wdrożeniowa §1
           chce jej między `faq` a `cta`, ale kontrakt `Usluga` nie ma tam
           miejsca na blok, więc stoi jako ostatni blok sekcji ceny: czyta się
           ją zaraz po kwotach, czyli dokładnie tam, gdzie ma odradzać zakup. */
        typ: 'sekcja',
        naglowek: 'Kiedy chatbot w obiekcie noclegowym się nie opłaci?',
        akapity: [
          'Wolimy powiedzieć to przed wdrożeniem niż po odbiorze. Pięć sytuacji, w których bot w obiekcie noclegowym będzie kosztem, a nie oszczędnością.',
        ],
        punkty: [
          'Masz kilka pokoi i dwa pytania w tygodniu: odpiszesz na nie szybciej, niż bot się zwróci.',
          'Rezerwacje idą wyłącznie przez portal, a na Twoją stronę nikt nie wchodzi: najpierw strona i widoczność, potem bot.',
          'Zasady obiektu zmieniają się z tygodnia na tydzień i nikt ich nie spisuje: bot nie ma wtedy z czego odpowiadać.',
          'Chcesz, żeby bot sam dzwonił do gości i domykał rezerwacje: tego nie robimy ani chatbotem, ani voicebotem.',
          'Oczekujesz wolnych dat na żywo bez podpięcia do systemu rezerwacji: bez integracji nie ma ich skąd wziąć.',
        ],
        wariant: 'quiet',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz swój obiekt w którymś punkcie? Napisz mimo to.',
          'Powiemy wprost, co zrobić zamiast, nawet jeśli nic u nas nie kupisz.',
        ],
      },
    ],
    /* Próg prosty, ta sama kwota co u rodzica (`lib/uslugi/chatboty.ts`).
       `cenaStala` CELOWO NIEUSTAWIONE: cena chatbota to widełki „od 1790 zł
       netto" w górę, więc kafel ceny w hero ma zostać z prefiksem „od ". */
    minPrice: 1790,
    /* Powrót po pełną drabinę progów: uwaga wdrożeniowa §4 pakietu każe każdej
       podstronie linkować do `/uslugi/chatboty/cennik`. */
    linkPoradnik: {
      przed: 'Pełny rozkład ceny na stworzenie bota, utrzymanie i zużycie tokenów stoi w cenniku chatbotów: ',
      etykieta: 'cennik chatbotów AI',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  /* SEKCJA 13 PAKIETU. Pakiet §P8 nie podaje gotowych pytań (podaje je tylko
     dla P1), więc osiem pytań jest napisanych tutaj, wyłącznie z faktów tej
     strony. Każde pytanie jest branżowe: żadne nie powiela pytania rodzica
     („Ile kosztuje chatbot AI dla firmy?", „Gdzie działa chatbot?", „Czy
     chatbot będzie zmyślał odpowiedzi?"). Ten sam tekst idzie na stronę
     i do FAQPage JSON-LD. */
  faq: [
    {
      pytanie: 'Czy chatbot poda gościowi wolny termin?',
      odpowiedz:
        'Z bazy wiedzy bot odpowie na wszystko, co da się opisać raz: jak zarezerwować pobyt, na jak długo i co dzieje się po zgłoszeniu. Wolne daty na żywo wymagają podpięcia bota do Twojego systemu rezerwacji i to osobny zakres, który wyceniamy indywidualnie.',
    },
    {
      pytanie: 'Czy bot odpowie na pytanie o zwierzęta, parking i dobę hotelową?',
      odpowiedz:
        'Tak, to trzy z sześciu tematów, które wdrażamy w obiekcie noclegowym. Pozostałe trzy to dostępność, cena pobytu i dojazd. Bot odpowiada tak, jak brzmi regulamin i cennik Twojego obiektu, bo stamtąd bierze treść.',
    },
    {
      pytanie: 'Co bot robi z pytaniem, którego nie ma w bazie?',
      odpowiedz:
        'Nie zgaduje. Prosi gościa o kontakt, żeby odpowiedź poszła od Ciebie, a samo pytanie dopisujemy potem do bazy razem z treścią odpowiedzi. Za drugim razem bot obsługuje je już sam, więc lista luk kurczy się z sezonu na sezon.',
    },
    {
      pytanie: 'Ile kosztuje chatbot dla pensjonatu albo małego hotelu?',
      odpowiedz:
        'Od 1790 zł netto za bota na stronie obiektu, gotowego w 1-2 dni robocze. Do tego utrzymanie: 99-599 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie i płacisz wtedy tylko za zamówione poprawki, po 350 zł netto za godzinę.',
    },
    {
      pytanie: 'Czy bot ma sens w obiekcie, który pracuje tylko w sezonie?',
      odpowiedz:
        'Tak, bo koszt bota nie chodzi za liczbą zapytań. W szczycie odpowiada wszystkim naraz, poza sezonem po prostu czeka. W Przystani Jurgen sezonowy ruch to około 100 zapytań od 20 do 50 klientów.',
    },
    {
      pytanie: 'Ile trwa wdrożenie w niewielkim obiekcie?',
      odpowiedz:
        '1-2 dni robocze, licząc od chwili, w której przekażesz nam komplet: cennik pobytu, regulamin, zasady dla zwierząt, parking i dojazd. Jeśli części z tego nie ma na piśmie, spisujemy to razem na starcie.',
    },
    {
      pytanie: 'Czym to się różni od voicebota, który odbiera telefon?',
      odpowiedz:
        'Chatbot rozmawia pisemnie na stronie obiektu, voicebot odbiera telefon i odpowiada głosem. Voicebot prosty kosztuje 2500 zł netto, obsługuje wyłącznie połączenia przychodzące i nigdy nie dzwoni do gości sam.',
    },
    {
      pytanie: 'Nie mam strony obiektu. Czy chatbot ma sens?',
      odpowiedz:
        'Sam bot nie, bo nie ma go gdzie postawić i nikt na niego nie trafi. Prosty landing robimy za 1590 zł netto w jeden dzień roboczy, stronę biznesową za 2900 zł netto w 2-4 dni robocze, a bota dokładamy do gotowej strony.',
    },
  ],

  /* SEKCJA 14 PAKIETU: jedna decyzja domykająca stronę. Mikrokopia powtarza
     granicę bezpłatnej rozmowy (badanie potrzeb, zero pomiaru i raportu),
     bo to ostatnie zdanie przed kliknięciem. */
  cta: {
    label: 'Porozmawiajmy o Twoim obiekcie',
    href: '#diagnoza',
    mikrokopia:
      'Bezpłatna rozmowa: obejrzymy stronę Twojego obiektu, posłuchamy, o co pytają goście przed rezerwacją, i ustalimy zakres bota. To badanie potrzeb, nie audyt ani raport. Bez zobowiązań.',
    /* KONTROLA 2026-09-04: było „pracuje u nas w Przystani Jurgen". „U nas"
       znaczy „w naszej firmie", więc zdanie sugerowało, że obiekt jest nasz.
       Przystań Jurgen to klient. */
    dowod:
      'Chatbot w obiekcie noclegowym pracuje w Przystani Jurgen, razem ze stroną WWW, którą dla niej zrobiliśmy.',
  },

  queries: [
    'chatbot dla hotelu',
    'chatbot dla pensjonatu',
    'chatbot dla obiektu noclegowego',
    'chatbot na stronę hotelu',
    'chatbot dla hotelu cena',
    'bot odpowiadający na pytania gości',
  ],

  /* POWIĄZANIA (pakiet §P8 sekcja 12: obsługa klienta, WhatsApp i Messenger,
     strony WWW; plus uwaga wdrożeniowa §4: powrót do rodzica i do cennika).
     Etykieta = h1 strony docelowej, opis = fakt, który stoi na tamtej stronie.
     ZERO KWOT w tych opisach, także w opisie cennika: uwaga wdrożeniowa §6
     trzyma złotówki wyłącznie w sekcji ceny (w poprzedniej partii dwóch agentów
     wsadziło tu kwotę i trzeba było ją wycinać).

     KIERUNEK WYCHODZĄCY (kontrola 2026-09-04). Minimum z pakietu jest
     spełnione: pięć wymaganych adresów stoi niżej. Poza minimum stoją dwa
     linki i oba mają powód w treści TEJ strony:
      - `/uslugi/voiceboty/odbieranie-telefonow`, bo sekcja „Kiedy zamiast
        chatbota lepszy będzie voicebot?" odsyła czytelnika do wariantu
        głosowego i nie może kończyć się ślepo,
      - `/uslugi/chatboty/baza-wiedzy` (dopisany 2026-09-04), bo cała obietnica
        tej strony brzmi „bot odpowiada z regulaminu i cennika obiektu", a
        mechanizm stojący za tym zdaniem opisuje osobna siostra. Bez tego linku
        strona osiem razy powoływała się na bazę wiedzy (policzone w treści
        widocznej 2026-09-04) i ani razu nie mówiła, gdzie o niej przeczytać.

     KIERUNEK PRZYCHODZĄCY (domknięty 2026-09-04, runda wyrównania linków):
     wejścia od sióstr dokładają `chatboty-cennik.ts` (karta branżowa) oraz
     `whatsapp-messenger.ts` (karta kanału, wzajemna wobec sekcji o WhatsAppie
     na tej stronie). Tej sprawy nie dało się załatwić z tego pliku, bo link
     przychodzący pisze się zawsze u nadawcy. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firm',
        href: '/uslugi/chatboty',
        opis: 'Cała usługa poza jedną branżą: trzy progi wdrożenia, dwie rundy poprawek w cenie i rozbudowa bota do AI Agenta, który wykonuje zadania, a nie tylko odpowiada.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis: 'Rozkład ceny na trzy osobne pozycje: stworzenie bota, utrzymanie i zużycie tokenów modelu, za które płacisz dostawcy wprost.',
      },
      {
        etykieta: 'Chatbot do obsługi klienta, który odpowiada o 22:00',
        href: '/uslugi/chatboty/obsluga-klienta',
        opis: 'To samo odciążenie poza branżą noclegową: powtarzalne pytania, noce i weekendy oraz przekazanie trudnej sprawy człowiekowi.',
      },
      {
        etykieta: 'Chatbot na WhatsApp i Messengerze',
        href: '/uslugi/chatboty/whatsapp-messenger',
        opis: 'Pełna lista kanałów, w których wdrażamy bota: strona WWW, WhatsApp, Messenger, Instagram i Telegram, wszystkie na jednej bazie wiedzy.',
      },
      {
        etykieta: 'Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)',
        href: '/uslugi/chatboty/baza-wiedzy',
        opis: 'Mechanizm, z którego bot bierze odpowiedzi o regulaminie i cenniku obiektu: szuka w Twoich dokumentach, a nie w internecie.',
      },
      {
        etykieta: 'Tworzenie stron WWW widocznych w Google i w AI',
        href: '/uslugi/strony-www',
        opis: 'Strona, na której bot ma stanąć: cała treść oddana od razu w czystym kodzie i ułożona pod cytowanie w ChatGPT, Claude, Gemini i Perplexity.',
      },
      {
        etykieta: 'Bot telefoniczny, który odbiera telefon 24/7',
        href: '/uslugi/voiceboty/odbieranie-telefonow',
        opis: 'Wariant głosowy dla obiektów, do których goście dzwonią: bot odbiera połączenie przychodzące, mówi, że jest asystentem AI, i spisuje sprawę.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis: 'Wpisujesz, ile godzin tygodniowo schodzi na odpisywanie gościom, a kalkulator pokazuje, ile złotych rocznie kosztuje Cię ta robota.',
      },
    ],
  },
};
