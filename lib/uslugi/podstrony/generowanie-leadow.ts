import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 5 — GENEROWANIE LEADÓW
 * (`/uslugi/chatboty/generowanie-leadow`).
 * Fraza primary: „chatbot do zbierania leadów" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P5, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/chatboty` i siostry `/obsluga-klienta`):
 *  - RODZIC sprzedaje CAŁĄ usługę: co bot robi, skąd bierze wiedzę, trzy progi
 *    cenowe, utrzymanie po wdrożeniu, różnica wobec AI Agenta.
 *  - TA STRONA jest SPRZEDAŻOWA, nie obsługowa, i kończy się jedną decyzją:
 *    chcę bota, który zamienia anonimowy ruch w kontakt z kompletem informacji
 *    dla handlowca. Jest tu więc: o co bot pyta, co ląduje w arkuszu albo
 *    w CRM, czym to się różni od formularza i od czatu z człowiekiem, ile to
 *    kosztuje, jak policzyć to na własnych liczbach i kiedy nie zadziała.
 *  - NIE MA TU I BYĆ NIE MOŻE: obsługi istniejących klientów i nocnych
 *    wiadomości w skrzynce (to rodzic i `/obsluga-klienta`), listy kanałów
 *    (to `/whatsapp-messenger`), bazy produktowej, drabiny trzech progów
 *    cenowych (to `/cennik`, pakiet §P5 sekcja 6 prosi wyłącznie o próg
 *    prosty i link po resztę). Do wszystkich prowadzi LINK, treść
 *    zostaje tam. WYJĄTEK OD 2026-09-04: dwie pozostałe pozycje rachunku
 *    (utrzymanie po wdrożeniu i tokeny) stoją tu w JEDNEJ krótkiej sekcji, bo bez
 *    nich czytelnik nie znał kosztu miesięcznego i musiał go szukać na innej
 *    stronie. Rozpisanie widełek utrzymania, poprawek godzinowych i porównania
 *    z voicebotem zostaje na `/cennik`.
 *  - Rodzic mówi o wiadomościach, które PRZYCHODZĄ i czekają na człowieka.
 *    Ta strona mówi o ludziach, którzy NIE NAPISALI NIC. To dwa różne
 *    problemy i tak są tu rozpisane, żeby żaden akapit nie dublował rodzica.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - układ 13 sekcji, kąt strony i komplet liczb o bazie B2B: pakiet §P5,
 *  - 1790 zł netto za próg prosty, 1-2 dni robocze, czas liczony od
 *    przekazania materiałów przez klienta, utrzymanie po wdrożeniu 99-599 zł
 *    netto miesięcznie albo 0 zł po przekazaniu infrastruktury, dane w Unii
 *    Europejskiej, integracje z systemami klienta na wyższym progu:
 *    `lib/uslugi/chatboty.ts` (plik rodzica, zgodne co do złotówki),
 *  - tokeny modelu płacone dostawcy wprost, bez naszej marży (BEZ KWOTY,
 *    bo żadnej nie ma ani u rodzica, ani w pakiecie): pakiet §P1, FAQ
 *    „Kto płaci za tokeny modelu językowego",
 *  - dostawca modelu (Claude od Anthropic, bez nazwy technicznej): uwaga
 *    wdrożeniowa pakietu §9,
 *  - powrót do rodzica i do `/uslugi/chatboty/cennik`: uwaga wdrożeniowa §4.
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1790 zł netto, 1-2 dni robocze, 99-599 zł netto miesięcznie za utrzymanie
 *  i 0 zł po przekazaniu infrastruktury (wszystkie cztery co do złotówki
 *  z pliku rodzica; brzmienie modelu utrzymania jest wspólne dla całego
 *  pakietu, uwaga wdrożeniowa §7, więc zmiana tutaj wymaga zmiany wszędzie),
 *  oraz komplet z pakietu §P5 dla bazy B2B: 169 zł netto
 *  za 1000 rekordów, 699 zł netto za 5000, 1390 zł netto za 10 000, 20-30
 *  minut automatem na tysiąc, około 3 minuty na rekord ręcznie i pokazane
 *  w treści przeliczenie 1000 razy 3 minuty = 3000 minut = około 50 godzin.
 *  KWOTY WYŁĄCZNIE W SEKCJI CENY, w kapsule, w metadanych, w FAQ i w mikrokopii
 *  CTA. Karty „Powiązane" idą BEZ KWOT: to konwencja repo z kontraktu
 *  `LinkKrzyzowy` w `lib/uslugi/types.ts` („zero nowych liczb, zero cen spoza
 *  listy locked"), a NIE uwaga wdrożeniowa pakietu chatbotów. Pakiet chatbotów
 *  takiej uwagi nie ma, więc nie wolno się na nią powoływać.
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje ANI JEDNEJ liczby
 *  wynikowej dla tego zastosowania (ile leadów łapie bot, jaki procent ruchu
 *  zaczepia, o ile rośnie konwersja) i nie podaje żadnego odniesienia
 *  czasowego typu „pół roku temu". Dlatego kalkulator w sekcji ceny nie ma
 *  ANI JEDNEJ wartości domyślnej: wszystkie cztery liczby podaje klient,
 *  a wzory stoją widoczne w treści. Wzorzec działa już
 *  w `/narzedzia#kalkulator-procesu` („Koszt podajesz Ty").
 *  Realizacja `/realizacje/lead-generator` jest linkowana BEZ LICZB, bo jej
 *  własne tempo (rekordy na czas) jest mierzone inaczej niż tempo z pakietu
 *  i zestawianie obu w jednym zdaniu dałoby pozorną sprzeczność.
 *
 * LICZBA BEZ ŹRÓDŁA, USUNIĘTA 2026-09-04 (kontrola adwersaryjna):
 *  „pięć pytań kwalifikujących" NIE STAŁO ani w pakiecie §P5 (sekcja 2 mówi
 *  tylko „jakie pytania bot zadaje", bez liczby), ani w pliku rodzica. Była to
 *  liczba policzona z długości listy, którą autor tej strony sam napisał, więc
 *  strona zobowiązywała nas do konfiguracji, której nikt nie zamówił. Wisiała
 *  w OŚMIU miejscach: lead sekcji, nagłówek listy pytań, punkt o kolumnach
 *  w arkuszu, wiersz tabeli, krok wdrożenia, kafel pasa metryk, podpis tego
 *  kafla i pierwsze pytanie FAQ. Zeszła ze wszystkich ośmiu naraz, a zdania
 *  są przepisane BEZ liczebnika, nie podmienione na inną cyfrę.
 *  DLACZEGO TAK JEST PRAWDZIWIEJ: liczba pytań kwalifikujących zależy od
 *  sprzedaży klienta i ustalamy ją przed startem, więc każda cyfra tutaj
 *  byłaby obietnicą złożoną przed pierwszą rozmową. Strona nadal opisuje
 *  KOMPLET pytań i to, że bot trzyma ten sam zestaw w każdej rozmowie, bo to
 *  jest realny mechanizm i to on odróżnia bota od człowieka na czacie.
 *  NIE WOLNO dopisać tu liczby pytań, dopóki nie stanie w pakiecie albo
 *  u rodzica.
 *
 * ZAKAZANE NA TEJ STRONIE: obietnica liczby leadów, procent konwersji bez
 * metody, drabina trzech progów cenowych (należy do `/cennik`), lista kanałów
 * (należy do `/whatsapp-messenger`), sugestia, że bezpłatna rozmowa to pomiar,
 * test, audyt albo raport (ustalenie właściciela z 2026-08-31: na bezpłatnej
 * rozmowie badamy potrzeby, tylko to).
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług i pozostałe podstrony. Zero nowych typów
 * bloków, zero nowego CSS.
 */
export const generowanieLeadow: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'generowanie-leadow',
  /* Bump na dzień realnej zmiany treści (kontrakt pola: nigdy data builda).
     2026-09-04: zdjęta liczba pytań kwalifikujących, dołożona trzecia kolumna
     porównania i dwie pozostałe pozycje rachunku. */
  dataAktualizacji: '2026-09-04',

  h1: 'Chatbot, który zbiera i kwalifikuje leady',

  /* KAPSUŁA (pakiet §P5 nie podaje gotowej kapsuły dla tej podstrony, więc
     złożona z faktów tego wycinka plus progu z pliku rodzica). Niesie komplet
     wielkości strony: co bot robi, co dostaje handlowiec, gdzie ląduje lead,
     ile to kosztuje i ile trwa. 54 słowa (kontrakt: 40-60). */
  kapsula:
    'Chatbot do zbierania leadów odzywa się do odwiedzającego, dopytuje o sprawę, termin i kontakt, a handlowcowi oddaje gotowy rekord: kto pyta, o co i kiedy. Lead ląduje w arkuszu albo w CRM, powiadomienie idzie mailem zaraz po rozmowie. Zbieranie leadów jest w progu prostym: od 1790 zł netto i 1-2 dni robocze.',

  /* metaTitle: pakiet §P5 dawał 31 znaków, konwencja repo (lib/uslugi/types.ts)
     mówi 50-60 i decyzja właściciela każe trzymać konwencję repo. Fraza główna
     zostaje NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakty z tej strony
     (próg prosty i czas wdrożenia, oba stoją w kapsule i w ramie ceny).
     Długość 54 znaki. Layout dokleja sufiks marki. */
  metaTitle: 'Chatbot do zbierania leadów: od 1790 zł netto, 1-2 dni',
  /* 153 znaki. */
  metaDescription:
    'Chatbot do zbierania leadów dopytuje o sprawę i termin, a handlowcowi oddaje gotowy kontakt. Lead ląduje w arkuszu albo w CRM. Od 1790 zł netto, 1-2 dni.',

  problem: {
    /* H2 1:1 z pakietu §P5 sekcja 1, przełożony na zdanie pytające. */
    h2: 'Ilu odwiedzających wyszło dziś z Twojej strony, nie zostawiając nic?',
    tresc:
      'Większość ludzi, którzy dziś czytali Twoją ofertę, nie wypełniła formularza i nie zadzwoniła. Wyszli po cichu, a Ty nie wiesz nawet, ilu ich było i czego szukali.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Tu nie chodzi o zaległą skrzynkę ani o zapytanie, na które nie zdążyłeś odpisać. Tu chodzi o ludzi, którzy nie napisali nic. Nie ma czego odpisywać, nie ma do kogo oddzwonić, nie ma czego dopisać do listy handlowca.',
      },
      {
        typ: 'naglowek',
        tekst: 'Czego nie wiesz o ruchu, który wyszedł bez śladu?',
        ikona: 'lupa-wykres',
        chip: 'LEADY',
        overline: 'TRZY RZECZY, KTÓRYCH NIE MA W ŻADNYM RAPORCIE',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Kto tu był',
            akapity: [
              'Statystyka pokaże liczbę wejść. Nie powie, czy to była firma z Twojej branży, czy ktoś, kto pomylił zakładkę.',
            ],
          },
          {
            naglowek: 'Czego szukał',
            akapity: [
              'Bez rozmowy zostaje domysł z podstrony, na której był najdłużej. Handlowiec nie ma z czym zadzwonić.',
            ],
          },
          {
            naglowek: 'Dlaczego wyszedł',
            akapity: [
              'Za drogo, nie ten zakres, brak terminu, a może po prostu nie chciało mu się wypełniać pól. Nie dowiesz się z liczby wejść.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego formularz kontaktowy tego nie łapie?',
        akapity: [
          'Formularz czeka, aż ktoś sam podejdzie i się przedstawi. Wymaga decyzji „napiszę do nich" jeszcze zanim człowiek dostał odpowiedź na pierwsze pytanie. Kto tej decyzji nie podejmie, wychodzi bez śladu.',
          'Dodatkowo formularz zbiera tyle, ile ktoś zechce wpisać. Handlowiec dostaje imię, mail i zdanie „proszę o kontakt", więc pierwszy telefon zaczyna od ustalania rzeczy, które można było zebrać wcześniej.',
        ],
        wariant: 'edge',
        chip: 'FORMULARZ',
      },
    ],
  },

  rozwiazanie: {
    h2: 'O co bot pyta, zanim odda kontakt handlowcowi?',
    tresc:
      'Bot nie czeka na decyzję odwiedzającego, tylko odzywa się pierwszy i prowadzi krótką rozmowę. Domyślnie pyta o to samo i w tej samej kolejności, a cały zestaw pytań dopinamy pod Twoją sprzedaż przed startem.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Pytania, które zamieniają ruch w leada',
        ikona: 'magnes',
        chip: 'KWALIFIKACJA',
        overline: 'ZESTAW DOMYŚLNY · DOPINAMY GO PRZED STARTEM',
      },
      {
        typ: 'kroki',
        wariant: 'plytka',
        kroki: [
          {
            tytul: 'Czego dotyczy sprawa',
            opis: 'Bot pyta o to własnymi słowami klienta, nie kategorią z Twojego cennika. Handlowiec dostaje opis potrzeby, a nie zaznaczony checkbox.',
          },
          {
            tytul: 'Skala i termin',
            opis: 'Jak duże to zlecenie i na kiedy. To te dwie odpowiedzi decydują, czy handlowiec dzwoni dziś, czy odkłada kontakt na spokojnie.',
          },
          {
            tytul: 'Kto pyta',
            opis: 'Firma, branża i rola rozmówcy. Rozmowa z osobą decyzyjną wygląda inaczej niż rozmowa z kimś, kto zbiera oferty do porównania.',
          },
          {
            tytul: 'Budżet, jeśli rozmówca chce go podać',
            opis: 'Bot pyta raz i nie naciska. Brak odpowiedzi też jest informacją i zapisujemy go wprost, zamiast zostawiać puste pole do interpretacji.',
          },
          {
            tytul: 'Kontakt i zgoda',
            opis: 'Na końcu bot prosi o kontakt i o zgodę na odezwanie się. Bez zgody kończy rozmowę bez zapisu kontaktu, bo tak jest ustawiony.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co ląduje w arkuszu albo w CRM i jak wygląda powiadomienie?',
        akapity: [
          'Każda zakończona rozmowa robi jeden wiersz. Handlowiec nie musi go tłumaczyć ani uzupełniać, bo komplet pól jest ustalony przed startem i bot pilnuje tego samego zestawu w każdej rozmowie.',
        ],
        punkty: [
          'Kontakt: imię, firma, mail albo telefon, tak jak rozmówca je podał.',
          'Odpowiedzi na pytania kwalifikujące, każda w osobnej kolumnie.',
          'Zgoda na kontakt: zapisana razem z leadem, nie osobno.',
          'Podstrona, z której przyszedł rozmówca, i godzina rozmowy.',
          'Cała transkrypcja rozmowy, gdyby handlowiec chciał sprawdzić kontekst.',
        ],
        wariant: 'top',
        chip: 'LEAD',
        stopka: [
          'Powiadomienie idzie mailem zaraz po rozmowie, z podsumowaniem w kilku linijkach.',
          'Zapis do arkusza mieści się w progu prostym. Wpięcie leadów wprost do Twojego CRM to integracja i ustalamy ją przed startem.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'A czym to się różni od czatu z pracownikiem?',
        akapity: [
          'Człowiek na czacie zadaje pytania tak, jak mu wyjdzie w rozmowie, i przy dziesiątym zapytaniu tego dnia zadaje ich mniej. Bot zadaje ten sam komplet za każdym razem, więc leady da się porównać między sobą.',
          'Druga różnica to koszt uwagi. Czat z pracownikiem zajmuje kogoś, kto w tym czasie nie sprzedaje. Bot bierze na siebie pierwszą rozmowę, a Twój handlowiec wchodzi dopiero tam, gdzie jest o czym rozmawiać.',
        ],
        punkty: [
          'Bot kwalifikuje, człowiek sprzedaje. Nie odwrotnie.',
          'Sprawę spoza zakresu bot oddaje człowiekowi razem z transkrypcją.',
        ],
        wariant: 'edge',
        chip: 'GRANICA',
      },
      /* TRÓJSTRONNE ZESTAWIENIE z pakietu §P5 sekcja 4 („bot kwalifikujący
         kontra zwykły formularz kontaktowy kontra czat z pracownikiem").
         DLACZEGO TU, A NIE W `tabelaPorownawcza`: tamto pole ma w typie
         (`lib/uslugi/types.ts`, `TabelaWiersz`) dokładnie dwie kolumny,
         `bez` i `zNami`, i trzeciej nie da się w nim wyrazić bez zmiany
         kontraktu wspólnego dla dziesięciu stron usług. Blok `tabela`
         przyjmuje dowolną liczbę kolumn, więc trzecia strona porównania jest
         tu prawdziwą kolumną tabeli, a nie akapitem.
         OŚ DOBRANA TAK, ŻEBY NIE POWTARZAĆ `tabelaPorownawcza`: tam stoi to,
         co dostaje handlowiec (kto zaczyna, zakres danych, powiadomienie,
         pierwszy telefon), tutaj to, czego przy dwóch kolumnach nie widać,
         czyli czyj czas idzie na pierwszą rozmowę i co się dzieje przy
         dziesiątym zapytaniu tego dnia. Zero wierszy o dostępności i porach
         doby: ten wątek należy do rodzica i do `/obsluga-klienta`. */
      {
        typ: 'tabela',
        naglowki: [
          'Co porównujemy',
          'Zwykły formularz kontaktowy',
          'Czat z pracownikiem',
          'Bot, który kwalifikuje',
        ],
        wiersze: [
          [
            'Czyj czas zajmuje',
            'Twój, już po fakcie',
            'Pracownika, w trakcie rozmowy',
            'Bota, handlowiec wchodzi później',
          ],
          [
            'Dziesiąte zapytanie tego dnia',
            'To samo jedno pole opisu',
            'Krótsza rozmowa, mniej pytań',
            'Ten sam komplet co przy pierwszym',
          ],
          [
            'Sprawa spoza zakresu',
            'Zostaje w skrzynce',
            'Pracownik odpowiada sam',
            'Idzie do człowieka z transkrypcją',
          ],
          [
            'Wiersz w arkuszu albo CRM',
            'Trzeba go przepisać ręcznie',
            'Trzeba go przepisać ręcznie',
            'Powstaje sam po rozmowie',
          ],
        ],
        wKarcie: true,
        podpis:
          'Trzy sposoby na pierwszy kontakt z odwiedzającym. Tabela niżej zestawia już tylko formularz i bota, na osi tego, co z rozmowy dostaje handlowiec.',
      },
    ],
  },

  /* Komórki krótkie (konwencja podstron: cecha ok. 15 znaków, kolumny ok. 35),
     żeby wiersze nie łamały się na wąskich ekranach. Oś tabeli to WYŁĄCZNIE
     to, co dostaje handlowiec: zero wierszy o dostępności i porach doby, bo
     ten wątek należy do rodzica i do `/obsluga-klienta`.
     TO JEST DRUGA POŁOWA POROWNANIA z pakietu §P5 sekcja 4. Trzecia strona
     („czat z pracownikiem") stoi w bloku `tabela` na końcu sekcji
     `rozwiazanie`, bo typ `TabelaWiersz` ma dwie kolumny i trzeciej nie
     przyjmie. Wiersze tych dwóch tabel się NIE POWTARZAJĄ i przy edycji
     trzeba pilnować obu naraz. */
  tabelaPorownawcza: {
    h2: 'Formularz kontaktowy a bot, który dopytuje',
    naglowekBez: 'Zwykły formularz kontaktowy',
    naglowekZNami: 'Bot, który kwalifikuje',
    wiersze: [
      {
        cecha: 'Kto zaczyna',
        bez: 'Odwiedzający, jeśli sam zechce',
        zNami: 'Bot odzywa się pierwszy',
      },
      {
        cecha: 'Zakres danych',
        bez: 'Tyle, ile ktoś wpisze',
        zNami: 'Komplet pól w każdej rozmowie',
      },
      {
        cecha: 'Dopytanie',
        bez: 'Brak, jest jedno pole opisu',
        zNami: 'Ustalony zestaw pytań',
      },
      {
        cecha: 'Zgoda na kontakt',
        bez: 'Checkbox pod formularzem',
        zNami: 'Pytanie w rozmowie, zapisane z leadem',
      },
      {
        cecha: 'Powiadomienie',
        bez: 'Mail z treścią pola',
        zNami: 'Mail z podsumowaniem rozmowy',
      },
      {
        cecha: 'Pierwszy telefon',
        bez: 'Handlowiec ustala podstawy',
        zNami: 'Handlowiec zna sprawę i termin',
      },
      {
        cecha: 'Kto nie pasuje',
        bez: 'Widać po rozmowie',
        zNami: 'Widać przed telefonem',
      },
    ],
  },

  kroki: {
    h2: 'Co dzieje się przez te 1-2 dni robocze?',
    items: [
      {
        tytul: 'Rozmowa i zakres (bezpłatna)',
        opis:
          'Obejrzymy Twoją stronę, ustalimy, o co bot ma pytać i komu ma oddawać leada, i policzymy to na Twoich liczbach. To rozmowa o zakresie, nie pomiar, nie audyt i nie raport.',
      },
      {
        tytul: 'Pytania, pola i ton',
        opis:
          'Spisujemy pytania kwalifikujące pod Twoją sprzedaż i pola, które mają wpaść do arkusza. Ustawiasz ton rozmowy i granice: czego bot nie obiecuje i kiedy oddaje sprawę człowiekowi.',
      },
      {
        tytul: 'Start na stronie i pierwsze rozmowy',
        opis:
          'Bot rusza na stronie, a Ty czytasz pierwsze rozmowy i mówisz, które pytanie jest zbędne, a którego brakuje. Pierwsze wiersze w arkuszu od razu pokazują, czy bot pyta Twoim językiem, czy naszym.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje chatbot, który zbiera leady?',
    tresc:
      'Od 1790 zł netto, czyli tyle co próg prosty, bo zbieranie leadów jest w nim standardem, a nie płatnym dodatkiem. Bot rusza po 1-2 dniach roboczych, licząc od chwili, w której dostaniemy od Ciebie materiały.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1790 zł netto',
            opis: 'próg prosty, w nim zbieranie leadów',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '1-2 dni robocze',
            opis: 'od oddania nam materiałów do startu bota',
            zrodlo: 'trzy kroki wdrożenia wyżej',
            ton: 'green',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'utrzymanie miesięcznie, gdy projekt zostaje u nas',
            zrodlo: 'albo 0 zł po przekazaniu infrastruktury',
            ton: 'violet',
          },
          {
            wartosc: '169 zł netto',
            opis: 'baza B2B, tysiąc rekordów, osobna usługa',
            zrodlo: 'tabela paczek rekordów niżej',
            ton: 'amber',
          },
        ],
      },
      /* Trzy pozycje rachunku w jednej sekcji, bez rozwijania drabiny progów
         (ta należy do `/cennik`). Kwoty co do złotówki z pliku rodzica
         `lib/uslugi/chatboty.ts`, brzmienie modelu utrzymania wspólne dla
         całego pakietu (uwaga wdrożeniowa §7). Tokeny BEZ kwoty, bo żadnej
         nie ma ani u rodzica, ani w pakiecie. */
      {
        typ: 'sekcja',
        naglowek: 'Co jeszcze dochodzi do rachunku poza wdrożeniem?',
        akapity: [
          'Wdrożenie płacisz raz. Poza nim są jeszcze dwie pozycje i mówimy o nich przed ofertą, żeby nie wyszły po podpisaniu.',
        ],
        punkty: [
          'Utrzymanie po wdrożeniu: 99-599 zł netto miesięcznie, gdy projekt zostaje u nas, albo 0 zł, gdy przekazujemy Ci całą infrastrukturę.',
          'Zużycie tokenów modelu: płacisz dostawcy wprost, według liczby rozmów. Konto jest Twoje, więc nie doliczamy do tego marży.',
        ],
        wariant: 'top',
        chip: 'RACHUNEK',
        stopka: [
          'Utrzymanie jest do wyboru, nie jest obowiązkowe. Przy przekazanej infrastrukturze nie płacisz nam abonamentu.',
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Ile kosztuje miesiąc bez tego?',
        ikona: 'kalkulator',
        chip: 'KALKULATOR',
        overline: 'CZTERY LICZBY · WSZYSTKIE PODAJESZ TY',
      },
      {
        typ: 'sekcja',
        naglowek: 'Policz to na swoich liczbach, nie na naszych',
        akapity: [
          'Nie podstawimy tu za Ciebie żadnej wartości, bo nie znamy Twojego ruchu ani wartości Twojego klienta, a zmyślona liczba w kalkulatorze jest gorsza niż brak kalkulatora. Wzory są cztery i liczysz je po kolei.',
        ],
        punkty: [
          'Wejścia na stronę w miesiącu minus zapytania, które faktycznie dostajesz, to ruch, który wychodzi bez śladu.',
          'Ruch bez śladu razy część, którą uznajesz za realną do zaczepienia, to leady możliwe do złapania.',
          'Leady możliwe do złapania razy Twoja skuteczność sprzedaży to klienci.',
          'Klienci razy wartość jednego klienta to kwota, o którą chodzi w tej sekcji.',
        ],
        wariant: 'top',
        chip: 'KALKULATOR',
        stopka: [
          'To górna granica, nie obietnica. Bot nie zaczepi całego ruchu i nikt uczciwy tego nie obieca.',
          'Jeśli wynik wychodzi niżej niż koszt wdrożenia, powiemy Ci to na rozmowie.',
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Bot zbiera leady na stronie. Bazę firm możemy dostarczyć osobno.',
        ikona: 'mapa',
        chip: 'BAZA B2B',
        overline: 'GOOGLE MAPS · WYŁĄCZNIE FIRMY',
      },
      {
        typ: 'akapit',
        tekst:
          'To druga strona tego samego problemu. Bot łapie tych, którzy sami weszli na Twoją stronę. Baza B2B daje listę firm, do których to Ty odzywasz się pierwszy. Są to dwie osobne usługi i osobne rachunki.',
      },
      {
        typ: 'tabela',
        naglowki: ['Paczka rekordów', 'Cena netto'],
        wiersze: [
          ['1000 rekordów', '169 zł'],
          ['5000 rekordów', '699 zł'],
          ['10 000 rekordów', '1390 zł'],
        ],
        wKarcie: true,
        podpis:
          'Baza B2B ze scrapowania Google Maps, wyłącznie firmy. Wszystkie kwoty netto. To osobna usługa, nie część wdrożenia chatbota.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Ile trwa zbudowanie takiej bazy ręcznie?',
        akapity: [
          'Automat zbiera tysiąc rekordów w 20 do 30 minut. Ręcznie to około 3 minuty na rekord: znaleźć firmę, przepisać dane, sprawdzić, czy nie ma jej już na liście.',
          'Stąd rachunek, który każdy może powtórzyć: 1000 rekordów razy 3 minuty to 3000 minut, czyli około 50 godzin na tysiąc. Tyle godzin ktoś u Ciebie musiałby przeklikać, zamiast dzwonić.',
        ],
        punkty: [
          'Automat: 20 do 30 minut na tysiąc rekordów.',
          'Ręcznie: około 3 minuty na rekord, czyli około 50 godzin na tysiąc.',
        ],
        wariant: 'edge',
        chip: 'BAZA B2B',
      },
      {
        typ: 'sekcja',
        naglowek: 'Zgody i dane osobowe: co robimy, a czego nie',
        akapity: [
          'Zgodę na kontakt handlowy zbiera sam bot, w rozmowie, i zapisuje ją razem z leadem, a nie w osobnym miejscu. Bez zgody rozmowa kończy się bez zapisu kontaktu, bo tak go ustawiamy.',
          'Bazę B2B budujemy wyłącznie z danych firmowych, które są publicznie widoczne w Google Maps, i wyłącznie dla firm. Nie zbieramy tam kontaktów do osób prywatnych.',
        ],
        punkty: [
          'Treść klauzuli i podstawę kontaktu ustala Twój prawnik. My ustawiamy bota dokładnie tak, jak nam ją podasz.',
          'Bot przedstawia się jako bot, zanim zada pierwsze pytanie.',
          'Rozmowę prowadzi model Claude od Anthropic.',
          'Twoje dane nie wyjeżdżają poza Unię Europejską.',
        ],
        wariant: 'top',
        chip: 'ZGODY',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy taki bot u Ciebie nie zadziała?',
        akapity: [
          'Bot zamienia ruch w kontakty. Nie tworzy ruchu. Jeśli na stronę wchodzi kilka osób dziennie, to nie jest problem, który rozwiąże czat, i wolimy powiedzieć to przed ofertą niż po wdrożeniu.',
        ],
        punkty: [
          'Masz mały ruch na stronie: bot zagaduje tylko tych, którzy już są, więc najpierw ruch, potem bot.',
          'Sprzedajesz wyłącznie z poleceń i tak chcesz zostać: nie ma anonimowego ruchu do zamiany.',
          'Nie ma kto oddzwaniać do zebranych leadów: bot je zbierze, a one się zestarzeją w arkuszu.',
          'Liczysz, że bot domknie sprzedaż: on kwalifikuje i oddaje kontakt, rozmowę handlową prowadzi człowiek.',
          'Nie chcesz zbierać danych osobowych na stronie: bez zgody i klauzuli nie zbudujemy tego procesu.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Rozpoznajesz siebie w którymś punkcie? Powiedz o tym na rozmowie.',
          'Wolimy stracić zlecenie niż wystawić ofertę na coś, co u Ciebie nie ruszy.',
        ],
      },
    ],
    /* Ta sama liczba co u rodzica (`lib/uslugi/chatboty.ts`): próg prosty
       chatbota. Zbieranie leadów mieści się w tym progu, więc kafel ceny w hero
       i `offers` w Service JSON-LD niosą tę samą kwotę co strona macierzysta. */
    minPrice: 1790,
    /* CENY CHATBOTÓW SĄ WIDEŁKAMI („od 1790 zł netto"), więc pole `cenaStala`
       zostaje NIEUSTAWIONE. Render ma zostawić prefiks „od " na kaflu ceny. */
    /* Spec §P5 sekcja 6: link po cenę idzie do podstrony cennikowej, a nie do
       rozpisywania trzech progów tutaj (uwaga wdrożeniowa §4: każda podstrona
       linkuje do `/uslugi/chatboty/cennik`). */
    linkPoradnik: {
      przed: 'Pełną drabinę progów, trzy pozycje rachunku i oba modele utrzymania rozpisaliśmy na podstronie ',
      etykieta: 'ile kosztuje chatbot AI dla firmy',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  /* FAQ: pakiet §P5 nie podaje gotowych pytań dla tej podstrony (w odróżnieniu
     od P1, P2 i P6), więc pytania są złożone z faktów tego wycinka i z pliku
     rodzica. ŻADNE pytanie nie powtarza pytania rodzica: tam stoją „Ile kosztuje
     chatbot AI dla firmy", „Czym chatbot różni się od AI Agenta", „Czy chatbot
     będzie zmyślał", „Gdzie działa chatbot", „Ile trwa wdrożenie", „Czy zastąpi
     obsługę klienta", „Ile rund poprawek", „Ile kosztuje utrzymanie". Tutaj wszystkie
     osiem dotyczy wyłącznie leadów. Ten sam tekst idzie na stronę i do FAQPage
     JSON-LD, więc każda edycja rusza oba naraz. */
  faq: [
    {
      pytanie: 'O co chatbot pyta, zanim zapisze leada?',
      odpowiedz:
        'Czego dotyczy sprawa, jaka jest skala i termin, kto pyta, jaki jest budżet, jeśli rozmówca chce go podać, oraz o kontakt i zgodę na odezwanie się. Zestaw pytań ustalamy przed startem pod Twoją sprzedaż i bot trzyma go w każdej rozmowie.',
    },
    {
      pytanie: 'Czy zbieranie leadów jest w progu prostym?',
      odpowiedz:
        'Tak. Zbieranie leadów mieści się w progu prostym, czyli od 1790 zł netto, i nie jest płatnym dodatkiem. Bot rusza po 1-2 dniach roboczych, licząc od chwili, w której dostaniemy od Ciebie materiały. Poza wdrożeniem zostają dwie pozycje: utrzymanie 99-599 zł netto miesięcznie, gdy projekt zostaje u nas, albo 0 zł, gdy przekazujemy Ci całą infrastrukturę, oraz tokeny modelu, za które płacisz dostawcy wprost.',
    },
    {
      pytanie: 'Gdzie trafiają zebrane leady?',
      odpowiedz:
        'Do arkusza albo do CRM. Każda zakończona rozmowa to jeden wiersz z kontaktem, odpowiedziami na pytania kwalifikujące, zgodą i transkrypcją. Powiadomienie idzie mailem zaraz po rozmowie. Zapis do arkusza jest w progu prostym, a wpięcie leadów wprost do CRM to integracja i ustalamy ją przed startem.',
    },
    {
      pytanie: 'Czy klient pozna, że pisze z botem, a nie z handlowcem?',
      odpowiedz:
        'Tak, i to od razu. Bot przedstawia się jako bot, zanim zada pierwsze pytanie. Zbiera i kwalifikuje, a rozmowę handlową prowadzi Twój człowiek, już z kompletem informacji z czatu.',
    },
    {
      pytanie: 'Ile leadów złapie bot na mojej stronie?',
      odpowiedz:
        'Nie podamy Ci tej liczby, bo jej nie znamy, a zmyślona byłaby nic niewarta. Zamiast tego policzymy to na Twoich liczbach: ile masz wejść, ile zapytań dostajesz dziś i ile jest wart u Ciebie jeden klient. Wzory stoją na tej stronie, w sekcji o cenie.',
    },
    {
      pytanie: 'Czy możecie też dostarczyć bazę firm do kontaktu?',
      odpowiedz:
        'Tak, to osobna usługa. Baza B2B ze scrapowania Google Maps, wyłącznie firmy: 1000 rekordów za 169 zł netto, 5000 rekordów za 699 zł netto, 10 000 rekordów za 1390 zł netto. Automat zbiera tysiąc rekordów w 20 do 30 minut, a ręcznie to około 3 minuty na rekord, czyli około 50 godzin na tysiąc.',
    },
    {
      pytanie: 'Czy bot zadziała przy małym ruchu na stronie?',
      odpowiedz:
        'Nie. Bot zamienia ruch w kontakty, ale go nie tworzy. Przy kilku wejściach dziennie nie ma czego zamieniać i mówimy to przed ofertą, a nie po wdrożeniu.',
    },
    {
      pytanie: 'Kto odpowiada za zgodę na kontakt handlowy?',
      odpowiedz:
        'Bot pyta o zgodę w rozmowie i zapisuje ją razem z leadem, a bez zgody kończy rozmowę bez zapisu kontaktu. Treść klauzuli i podstawę kontaktu ustala Twój prawnik, a my ustawiamy bota dokładnie tak, jak nam ją podasz.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P5 sekcja 13). CTA celowo nie
     obiecuje pomiaru ani raportu na bezpłatnej rozmowie (ustalenie właściciela
     z 2026-08-31): wolno „obejrzymy", „ustalimy zakres", „policzymy na Twoich
     liczbach". Mikrokopia powtarza warunki, bo to ostatnie zdanie przed
     kliknięciem. */
  cta: {
    label: 'Policzmy to na Twoich liczbach',
    href: '#diagnoza',
    mikrokopia:
      'Bezpłatna rozmowa: obejrzymy Twoją stronę, ustalimy, o co bot ma pytać, i policzymy z Tobą, ile jest wart ruch, który dziś wychodzi bez śladu. Bez zobowiązań.',
    dowod:
      'Zbieranie leadów jest w progu prostym, nie jako dodatek. Gdy przy Twoim ruchu to się nie spina, powiemy wprost.',
  },

  queries: [
    'chatbot do zbierania leadów',
    'chatbot generowanie leadów',
    'chatbot kwalifikujący leady',
    'bot zbierający kontakty na stronie',
    'chatbot zamiast formularza kontaktowego',
    'baza leadów B2B',
  ],

  /* POWIĄZANIA (pakiet §P5 sekcja 11: obsługa klienta, WhatsApp i Messenger,
     cennik) plus powrót do rodzica z uwagi wdrożeniowej §4. Etykieta = H1
     strony docelowej, opis = fakt, który stoi na tamtej stronie. BEZ KWOT:
     kwoty wyłącznie w sekcji ceny. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firmy',
        href: '/uslugi/chatboty',
        opis: 'Cała usługa: co bot potrafi, skąd bierze wiedzę o Twojej firmie, jak wygląda wdrożenie i utrzymanie po nim.',
      },
      {
        etykieta: 'Chatbot do obsługi klienta, który odpowiada o 22:00',
        href: '/uslugi/chatboty/obsluga-klienta',
        opis: 'Druga strona tego samego bota: powtarzalne pytania obecnych klientów i moment, w którym trudna sprawa idzie do człowieka.',
      },
      {
        etykieta: 'Chatbot na WhatsApp i Messengerze',
        href: '/uslugi/chatboty/whatsapp-messenger',
        opis: 'Gdzie bot rozmawia: pełna lista kanałów, które wdrażamy. Jedna baza wiedzy, zmienia się tylko okno z odpowiedzią.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis: 'Drabina progów z czasem realizacji, trzy osobne pozycje rachunku i dwa modele utrzymania w jednym miejscu.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Błyskawiczny generator leadów',
        href: '/realizacje/lead-generator',
        opis: 'Wdrożenie własne: automat zbiera bazę potencjalnych klientów sam i oddaje sprzedaży gotową listę do kontaktu.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Czy warto zautomatyzować ten proces?',
        href: '/narzedzia#kalkulator-procesu',
        opis: 'Ten sam sposób liczenia co w sekcji o cenie: liczby podajesz Ty, kalkulator pokazuje, po ilu miesiącach wdrożenie się zwraca.',
      },
    ],
  },
};
