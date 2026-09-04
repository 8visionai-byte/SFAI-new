import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 6 — WHATSAPP I MESSENGER
 * (`/uslugi/chatboty/whatsapp-messenger`).
 * Fraza primary: „chatbot na whatsapp dla firm" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P6, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/chatboty` i sióstr z tego samego pakietu):
 *  - RODZIC sprzedaje CAŁĄ usługę: po co chatbot, czego nie robi zwykły bot,
 *    trzy progi wyceny, rundy poprawek. Odpowiada na pytanie „PO CO".
 *  - TA STRONA jest JEDYNĄ podstroną o KANALE i odpowiada wyłącznie na pytanie
 *    „GDZIE bot rozmawia": pięć okien, co zmienia każde z nich, co trzeba mieć
 *    po swojej stronie, ile kosztuje dołożenie kanału do gotowego bota.
 *  - NIE MA TU I BYĆ NIE MOŻE: rozwijania zastosowań. Obsługa biura obsługi
 *    zostaje na `/uslugi/chatboty/obsluga-klienta`, kontakt z rozmowy na
 *    `/uslugi/chatboty/generowanie-leadow`, rozkład progów na
 *    `/uslugi/chatboty/cennik`. Do każdej z tych stron prowadzi LINK
 *    w sekcji „Powiązane", treść zostaje tam.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - kapsuła i komplet 8 pytań FAQ: pakiet §P6, przeniesione DOSŁOWNIE
 *    (treść zatwierdzona, nie wolno jej przepisywać własnymi słowami),
 *  - pięć kanałów (strona WWW, WhatsApp, Messenger, Instagram, Telegram) jako
 *    PEŁNA LISTA plus zdanie wprost, że kanału spoza niej nie robimy:
 *    pakiet §P6 sekcje 2 i 3 (decyzja właściciela z 2026-08-31, punkt 4).
 *    ZAKRES TEJ DEKLARACJI (doprecyzowane 2026-09-04, nie cofać): „pełna lista"
 *    dotyczy kanałów, w których bot rozmawia z KLIENTEM. Siostra
 *    `asystent-wewnetrzny.ts` (pakiet §P7 sekcja 6) ma własną, krótszą listę
 *    miejsc dla bota dla PRACOWNIKÓW: przeglądarka, wewnętrzna strona firmowa,
 *    Telegram. Bez tego zawężenia zdanie „nie ma szóstego, o którym milczymy"
 *    przeczyłoby tamtej stronie. Te same słowa („z klientami") stoją w opisie
 *    metryki „5 kanałów" w `ramaCeny`,
 *  - warunek startu na WhatsAppie (firmowy numer telefonu, konto firmowe
 *    u dostawcy, warunki i limity WhatsApp Business API sprawdzane na pierwszej
 *    rozmowie): pakiet §P6 sekcja 6 i FAQ,
 *  - archiwizacja rozmów (historia zapisywana dla kontekstu, zakres i czas
 *    przechowywania ustalane przed startem): pakiet §P6 sekcja 9 i FAQ,
 *  - cena i czas dołożenia kanału (próg średni 3000-6000 zł netto,
 *    3-4 dni robocze) oraz utrzymanie (99-599 zł netto miesięcznie przy
 *    infrastrukturze u nas, 0 zł po przekazaniu): pakiet §P6 kapsuła i FAQ,
 *    zgodne co do złotówki z progiem średnim w `lib/uslugi/chatboty.ts`,
 *  - „dane zostają w Unii Europejskiej": `lib/uslugi/chatboty.ts` (kapsuła
 *    i karta o źródle wiedzy bota).
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  3000-6000 zł netto, 3-4 dni robocze, 99-599 zł netto miesięcznie, 0 zł,
 *  pięć kanałów. Każda NASZA kwota z dopiskiem netto; przy „0 zł" dopisku nie
 *  ma, bo zero netto to zero brutto.
 *  BRAK DANEJ, KTÓREJ NIE ZMYŚLAMY: pakiet nie podaje ŻADNEJ liczby rozmów,
 *  procentu ruchu z komunikatorów ani limitów WhatsApp Business API, więc
 *  wszystkie zdania o ruchu i limitach są napisane tak, żeby były prawdziwe
 *  bez liczby, a limity kierujemy na pierwszą rozmowę. Nie ma tu też żadnego
 *  odniesienia czasowego typu „pół roku temu", bo pakiet takich nie podaje.
 *
 * ZAKAZANE NA TEJ STRONIE: jakikolwiek kanał spoza listy pięciu, także ten,
 * który wcześniej stał w konspekcie i został z pakietu wycięty jako BLOKER
 * (uwaga wdrożeniowa §8), kwoty poza sekcją `ramaCeny` (uwaga §6 rodziny
 * pakietów: kwoty tylko przy cenie; kapsuła i FAQ niosą je z zatwierdzonej
 * treści), obietnica pomiaru albo raportu na bezpłatnej rozmowie (ustalenie
 * właściciela z 2026-08-31: bezpłatna rozmowa to WYŁĄCZNIE badanie potrzeb),
 * sugerowanie, że bot dzwoni albo wydzwania do klientów.
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług i pozostałe podstrony. Zero nowych typów bloków,
 * zero nowego CSS.
 */
export const whatsappMessenger: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'whatsapp-messenger',
  dataAktualizacji: '2026-09-01',

  h1: 'Chatbot na WhatsApp i Messengerze',

  /* KAPSUŁA 1:1 Z PAKIETU §P6. Nie skracać i nie przepisywać: niesie komplet
     wielkości strony (pełna lista kanałów, jedna baza wiedzy, próg cenowy
     i czas dołożenia kanału) w formie, w jakiej została zatwierdzona. */
  kapsula:
    'Ten sam chatbot może odpowiadać na Twojej stronie WWW, na WhatsAppie, Messengerze, Instagramie i Telegramie. To jest pełna lista kanałów, które wdrażamy. Baza wiedzy jest jedna, zmienia się tylko okno, w którym pojawia się odpowiedź. Dołożenie kanału do gotowego bota mieści się w progu średnim, czyli 3000-6000 zł netto i 3-4 dni robocze.',

  /* metaTitle: pakiet §P6 dawał 32 znaki, konwencja repo (lib/uslugi/types.ts)
     mówi 50-60 i ta konwencja wygrywa (decyzja właściciela). Fraza główna
     zostaje NA POCZĄTKU i bez zmian, wyróżnik to wyłącznie fakty z tej strony
     (pięć kanałów i jeden bot, oba stoją w kapsule i w tabeli kanałów).
     Długość 57 znaków. Layout dokleja sufiks marki. */
  metaTitle: 'Chatbot na WhatsApp i Messengera: pięć kanałów, jeden bot',
  /* 158 znaków. Wymienia kanały z nazwy, bo tego szuka użytkownik w SERP,
     i domyka progiem cenowym z kapsuły. */
  metaDescription:
    'Chatbot na WhatsApp, Messengerze, Instagramie, Telegramie i stronie WWW. Jedna baza wiedzy, pięć okien. Dołożenie kanału: 3000-6000 zł netto, 3-4 dni robocze.',

  problem: {
    /* H2 z pakietu §P6 sekcja 1. Rodzic pyta „ile razy dziennie odpowiadasz na
       to samo pytanie", czyli o POWTARZALNOŚĆ. Ta strona pyta o MIEJSCE. */
    h2: 'Gdzie naprawdę piszą do Ciebie klienci?',
    tresc:
      'Formularz na stronie to jedno okno. Twoi klienci piszą tam, gdzie akurat mają otwartą aplikację: na WhatsAppie, w Messengerze, pod postem na Instagramie. Bot stoi tylko tam, gdzie go postawisz.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Sprawdzisz to bez żadnego narzędzia. Otwórz skrzynkę firmową, Messengera i telefon, a potem policz, z którego okna przyszła Twoja ostatnia dziesiątka zapytań. To jest Twoja lista kanałów i tylko ona się liczy.',
      },
      {
        typ: 'naglowek',
        tekst: 'Co gubi się między oknami rozmowy?',
        ikona: 'lupa-wykres',
        chip: 'KANAŁY',
        overline: 'TRZY RZECZY, KTÓRE ZNIKAJĄ MIĘDZY APLIKACJAMI',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Okno, do którego nikt nie zagląda',
            akapity: [
              'Skrzynkę firmową ktoś otwiera codziennie. Do wiadomości na profilu zagląda ta osoba, która akurat prowadzi profil, i niekoniecznie tego samego dnia.',
            ],
          },
          {
            naglowek: 'Ta sama sprawa w dwóch miejscach',
            akapity: [
              'Klient zaczyna rozmowę w jednym komunikatorze, a kończy ją w drugim. U Ciebie widzą to dwie różne osoby i każda pyta go o to samo od nowa.',
            ],
          },
          {
            naglowek: 'Odpowiedź zależy od okna',
            akapity: [
              'W jednym oknie odpisujesz Ty, w drugim ktoś od profilu firmowego. Klient dostaje dwie wersje tej samej informacji o cenniku albo terminie.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy to znaczy, że potrzebujesz bota w każdym oknie?',
        akapity: [
          'Nie. Kanał, na którym nikt do Ciebie nie pisze, to kolejne okno do pilnowania i żadnej rozmowy więcej.',
          'Dlatego pierwsze pytanie, które zadajemy, nie brzmi „ile kanałów", tylko „skąd przyszła Twoja ostatnia dziesiątka zapytań". Kanały z ruchem dokładamy najpierw, resztę wtedy, gdy ruch się tam pojawi.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
      },
    ],
  },

  rozwiazanie: {
    /* Sekcje 2, 3, 4, 5 i 6 pakietu §P6 w jednym bloku odpowiedzi: pięć okien,
       zdanie o pełnej liście, jedna baza wiedzy, tabela kanałów, warunek startu
       na WhatsAppie. */
    h2: 'Co zmienia się w każdym z pięciu kanałów?',
    tresc:
      'Mechanizm jest wszędzie ten sam: pytanie, odpowiedź z Twojej bazy wiedzy, przekazanie sprawy człowiekowi, gdy trzeba. Zmienia się okno, w którym pojawia się odpowiedź, i to, co musisz mieć po swojej stronie, żeby to okno otworzyć.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Pięć kanałów, które wdrażamy',
        ikona: 'glob-siatka',
        chip: 'PEŁNA LISTA',
        overline: 'STRONA WWW · WHATSAPP · MESSENGER · INSTAGRAM · TELEGRAM',
      },
      {
        typ: 'kroki',
        wariant: 'plytka',
        kroki: [
          {
            tytul: 'Strona WWW',
            opis: 'Okno czatu na Twojej stronie. Bot odpowiada dokładnie tam, gdzie klient właśnie czyta ofertę, i odsyła go do właściwej podstrony zamiast kazać mu szukać.',
          },
          {
            tytul: 'WhatsApp',
            opis: 'Rozmowa idzie na firmowy numer, a nie na prywatny telefon pracownika. To jedyny z pięciu kanałów, który wymaga firmowego numeru telefonu i konta firmowego u dostawcy.',
          },
          {
            tytul: 'Messenger',
            opis: 'Bot odpowiada w oknie wiadomości Twojej strony na Facebooku, także na to, co klienci piszą z reklam i spod postów.',
          },
          {
            tytul: 'Instagram',
            opis: 'Mechanizm ten sam co w Messengerze, inne jest miejsce: profil i wiadomości spod postów. Ma sens wtedy, gdy ruch przychodzi Ci z reklam i z publikacji.',
          },
          {
            tytul: 'Telegram',
            opis: 'Okno rozmowy dla klientów, którzy tego komunikatora używają na co dzień. Dokładamy je tam, gdzie realnie ktoś w nim pisze.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'A jeśli Twoi klienci piszą gdzie indziej?',
        akapity: [
          'Pięć okien wyżej to pełna lista kanałów, w których bot rozmawia z Twoimi klientami. Nie ma szóstego, o którym milczymy.',
          'Jeśli pytasz o kanał spoza tej listy, powiemy wprost, że go nie robimy. Wolimy stracić zlecenie niż obiecać okno, którego nie postawimy.',
        ],
        wariant: 'edge',
        chip: 'PEŁNA LISTA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Dlaczego to jeden bot, a nie pięć osobnych?',
        akapity: [
          'Baza wiedzy jest jedna i obsługuje wszystkie okna naraz. Poprawiasz zdanie o cenniku raz, a bot podaje nową wersję w każdym oknie.',
          'Dołożenie kanału to podpięcie kolejnego okna do gotowego bota, a nie budowanie go drugi raz. Ton i granice bota zostają te same, więc klient dostaje tę samą odpowiedź niezależnie od tego, gdzie napisał.',
        ],
        wariant: 'top',
        chip: 'JEDNA BAZA',
        stopka: [
          'Zmiana w wiedzy bota nie wymaga pięciu osobnych poprawek.',
          'Nowy kanał nie kasuje historii i ustawień, które już masz.',
        ],
      },
      {
        typ: 'tabela',
        naglowki: ['Kanał', 'Co daje', 'Czego nie da', 'Co trzeba mieć po Twojej stronie'],
        wiersze: [
          [
            'Strona WWW',
            'rozmowę w miejscu, w którym klient czyta ofertę',
            'nie dogoni klienta, który zamknął już stronę',
            'dostęp do strony albo do panelu, w którym ją edytujesz',
          ],
          [
            'WhatsApp',
            'rozmowę w aplikacji, którą klient ma otwartą cały dzień',
            'nie zadzwoni i nie odbierze telefonu',
            'firmowy numer telefonu i konto firmowe u dostawcy',
          ],
          [
            'Messenger',
            'odpowiedź na wiadomości z reklam i spod postów',
            'nie obsłuży klienta, który nie ma konta na Facebooku',
            'stronę firmową na Facebooku i dostęp administratora',
          ],
          [
            'Instagram',
            'rozmowę z ruchem, który przychodzi z profilu',
            'nie zastąpi prowadzenia profilu i publikowania',
            'konto firmowe na Instagramie i dostęp administratora',
          ],
          [
            'Telegram',
            'okno dla klientów, którzy używają tego komunikatora',
            'nie zrobi ruchu tam, gdzie nikt do Ciebie nie pisze',
            'decyzję, pod jaką nazwą ma stać firmowy bot',
          ],
        ],
        wKarcie: true,
        podpis:
          'Pięć kanałów chatbota: co zmienia każde okno, czego w nim nie da się zrobić i co musisz mieć u siebie, żeby je uruchomić.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co trzeba mieć, żeby ruszyć na WhatsAppie?',
        akapity: [
          'Po Twojej stronie potrzebne są dwie rzeczy: firmowy numer telefonu i konto firmowe u dostawcy. Trzecia pozycja na liście niżej nie jest wymogiem po Twojej stronie, tylko tym, co sprawdzamy razem na pierwszej rozmowie. Reszta jest po naszej.',
          'Warunki i limity WhatsApp Business API sprawdzamy razem z Tobą na pierwszej rozmowie, bo zmieniają się częściej niż nasza strona. Nie przepisujemy ich tutaj, żeby nie wprowadzić Cię w błąd zdaniem, które zdążyło się zdezaktualizować.',
        ],
        punkty: [
          'Firmowy numer telefonu, a nie prywatny telefon pracownika.',
          'Konto firmowe u dostawcy.',
          'Warunki i limity WhatsApp Business API sprawdzane na pierwszej rozmowie.',
        ],
        wariant: 'top',
        chip: 'WHATSAPP',
        stopka: [
          'Dostępy zbieramy raz, na starcie, a nie po kawałku w trakcie prac.',
          'Czego nie wiemy na pewno, tego nie obiecujemy przed sprawdzeniem.',
        ],
      },
    ],
  },

  /* Tabela z pakietu §P6 sekcja 5 ma cztery kolumny i stoi wyżej jako blok
     `tabela` (kontrakt `tabelaPorownawcza` ma trzy). Tutaj idzie porównanie,
     które jest sednem tej podstrony: pięć okien pilnowanych osobno kontra jeden
     bot podpięty do wszystkich. Rodzic porównuje się z RĘCZNĄ OBSŁUGĄ, więc
     żaden wiersz się nie powtarza. Komórki krótkie (konwencja v20 podstron). */
  tabelaPorownawcza: {
    h2: 'Pięć okien pilnowanych osobno a jeden bot podpięty do wszystkich',
    naglowekBez: 'Każde okno osobno',
    naglowekZNami: 'Bot podpięty do pięciu okien',
    wiersze: [
      {
        cecha: 'Wiedza',
        bez: 'Osobna w każdym oknie',
        zNami: 'Jedna baza dla wszystkich kanałów',
      },
      {
        cecha: 'Zmiana ceny',
        bez: 'Poprawiasz w każdym miejscu z osobna',
        zNami: 'Poprawiasz raz, wychodzi wszędzie',
      },
      {
        cecha: 'Ton rozmowy',
        bez: 'Zależy, kto akurat odpisuje',
        zNami: 'Ten sam w każdym oknie',
      },
      {
        cecha: 'Nowy kanał',
        bez: 'Zaczynasz od początku',
        zNami: 'Podpinamy do gotowego bota',
      },
      {
        cecha: 'Historia',
        bez: 'Rozsypana po aplikacjach',
        zNami: 'Zapisywana, żeby bot znał kontekst',
      },
      {
        cecha: 'Pilnowanie',
        bez: 'Każde okno pilnuje ktoś inny',
        zNami: 'Jedno miejsce do pilnowania',
      },
    ],
  },

  /* Pakiet §P6 sekcja 7. Rodzic opisuje wdrożenie bota OD ZERA (diagnoza,
     uczenie, utrzymanie). Tu są trzy kroki DOKŁADANIA KANAŁU do bota, który już
     działa, więc treść kroków nie powtarza rodzica. */
  kroki: {
    h2: 'Jak dokładamy kanał do gotowego bota?',
    items: [
      {
        tytul: 'Wybór okien',
        opis: 'Patrzymy, z których okien realnie przychodzą Twoje zapytania, i wybieramy kanały, które mają ruch. Kanał bez ruchu odradzamy od razu, zanim za niego zapłacisz.',
      },
      {
        tytul: 'Dostępy i podpięcie',
        opis: 'Zbieramy dostępy do wybranych okien: firmowy numer, konto u dostawcy, administrację strony na Facebooku albo profilu na Instagramie. Każde okno podpinamy do tej samej bazy wiedzy.',
      },
      {
        tytul: 'Test w każdym oknie osobno',
        opis: 'Piszemy do bota z każdego kanału z osobna i sprawdzamy, czy odpowiada tak samo. Dołożenie kanału do gotowego bota zajmuje 3-4 dni robocze.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje dołożenie WhatsAppa albo Messengera?',
    tresc:
      'Dołożenie kanału do gotowego bota mieści się w progu średnim, czyli 3000-6000 zł netto, i zajmuje 3-4 dni robocze. Dokładna kwota zależy od liczby kanałów i zakresu, a ustalamy ją przed startem, nie po odbiorze.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '3000-6000 zł netto',
            opis: 'próg średni, w którym mieści się dołożenie kanału',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '3-4 dni robocze',
            opis: 'tyle trwa podpięcie kanału do gotowego bota',
            zrodlo: 'krok „Test w każdym oknie osobno" wyżej',
            ton: 'violet',
          },
          {
            wartosc: '5 kanałów',
            opis: 'pełna lista okien, w których bot rozmawia z klientami',
            zrodlo: 'tabela kanałów w sekcji wyżej',
            ton: 'green',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'utrzymanie miesięcznie, gdy infrastruktura stoi u nas',
            zrodlo: 'albo 0 zł, gdy przekazujemy ją Tobie',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Co kolejne okno zmienia w utrzymaniu?',
        ikona: 'kalendarz-check',
        chip: 'UTRZYMANIE',
        overline: 'DWA MODELE ROZLICZEŃ · WYBIERASZ JEDEN',
      },
      /* Model utrzymania brzmi identycznie jak u rodzica i w FAQ tej strony
         (uwaga wdrożeniowa §7: jedna formuła w każdym miejscu). Kwota 0 zł bez
         dopisku netto, bo zero netto to zero brutto. */
      {
        typ: 'przelacznik',
        grupa: 'whatsapp-messenger-utrzymanie',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Infrastruktura u nas',
            podtytul: '99-599 zł netto miesięcznie',
            naglowek: 'Pilnujemy każdego podpiętego okna i dokładamy odpowiedzi na nowe pytania',
            akapity: [
              'Każdy kanał to osobne podpięcie, które ktoś musi obserwować. W tym modelu robimy to my, a utrzymanie mieści się w przedziale 99-599 zł netto miesięcznie.',
            ],
            punkty: [
              'pilnujemy podpięć we wszystkich uruchomionych oknach',
              'dokładamy odpowiedzi na pytania, które zaczynają wracać',
              'zgłoszenie robisz w jednym miejscu, nie w pięciu',
            ],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Infrastruktura u Ciebie',
            podtytul: '0 zł miesięcznie',
            naglowek: 'Cała infrastruktura przechodzi na Twoją stronę, a abonament wynosi 0 zł',
            akapity: [
              'Bot i wszystkie podpięcia stoją po Twojej stronie. Abonament wynosi 0 zł, a pilnowanie okien przechodzi na Twój zespół.',
            ],
            punkty: [
              'abonament 0 zł',
              'konta i podpięcia zostają u Ciebie',
              'zakres późniejszych poprawek ustalamy osobno',
            ],
          },
        ],
      },
      /* TOKENY (ujednolicenie 2026-09-04): trzecia pozycja rachunku stała
         dotąd tylko u rodzica `lib/uslugi/chatboty.ts` i na `/cennik`, przez co
         ta strona pokazywała koszt miesięczny niepełny. Zero nowej kwoty:
         przy tokenach żadnej nie ma ani u rodzica, ani w pakiecie. */
      {
        typ: 'akapit',
        tekst:
          'Do tego dochodzi trzecia pozycja: zużycie tokenów modelu. To opłata za pracę modelu językowego, którą płacisz dostawcy wprost, według zużycia.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dzieje się z rozmowami z WhatsAppa i Messengera?',
        akapity: [
          'Historia rozmów jest zapisywana. Bez tego bot nie pamiętałby, o czym była mowa dwie wiadomości wcześniej, a Ty nie miałbyś do czego wrócić po tygodniu.',
          'Zakres i czas przechowywania ustalamy przed startem, razem z Tobą, a nie domyślnie. W każdym z pięciu okien bot mówi wprost, że jest botem, i mówi to tymi samymi słowami.',
        ],
        punkty: [
          'Historia rozmów zapisywana, żeby bot znał kontekst.',
          'Zakres i czas przechowywania ustalany przed startem.',
          'Dane zostają w Unii Europejskiej.',
        ],
        wariant: 'edge',
        chip: 'DANE',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy dokładanie kolejnego kanału nie ma sensu?',
        akapity: [
          'Kanał bez ruchu to kolejne okno do pilnowania i żadnej rozmowy więcej. Mówimy to przed wyceną, a nie po odbiorze.',
        ],
        punkty: [
          'Klienci na tym kanale do Ciebie nie piszą: dokładasz sobie okno do pilnowania i nic poza tym.',
          'Nie masz jeszcze bota na stronie: najpierw jedno okno, które działa, potem kolejne.',
          'Nie masz firmowego numeru ani konta firmowego u dostawcy: bez tego WhatsApp nie ruszy.',
          'Profil prowadzi u Ciebie ktoś, kto odpisuje w kilka minut: bot niczego tam nie przyspieszy.',
          'Pytasz o kanał spoza naszej listy pięciu: powiemy wprost, że go nie robimy.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Nie wiesz, z którego okna przychodzi Twój ruch? Obejrzymy to razem na bezpłatnej rozmowie.',
          'Jeśli wyjdzie, że wystarczy Ci jedno okno, powiemy to wprost.',
        ],
      },
    ],
    /* Próg średni z pakietu §P6, ten sam co próg 2 w `lib/uslugi/chatboty.ts`.
       CENY SĄ WIDEŁKAMI, więc pola `cenaStala` NIE ustawiamy: kafel ceny ma
       renderować się z prefiksem „od ".

       DLACZEGO 3000, A NIE 1790 JAK RESZTA GAŁĘZI (rozstrzygnięte przy
       podłączaniu rejestru, 2026-09-04): kafel ceny w hero bierze liczbę
       stąd, więc ta podstrona ogłasza „od 3000 zł", podczas gdy rodzic
       i siedem pozostałych podstron mówi „od 1790 zł". To NIE jest rozjazd,
       tylko inny przedmiot wyceny. Pakiet `.seo-przeglad/pakiety/chatboty.md`
       §P6 przypisuje temu zastosowaniu próg średni w trzech miejscach:
        - kapsuła: „Dołożenie kanału do gotowego bota mieści się w progu
          średnim, czyli 3000-6000 zł netto i 3-4 dni robocze.",
        - sekcja 8: „Cena: próg średni 3000-6000 zł netto (link do
          `/cennik`)",
        - źródło liczb: „Próg średni 3000-6000 zł i 3-4 dni robocze".
       Pozostałe podstrony wyceniają WDROŻENIE bota (próg wejściowy 1790 zł),
       ta wycenia DOŁOŻENIE kanału do bota, który już działa. Zmiana na 1790
       wprowadziłaby na stronę kwotę, której pakiet tu nie podaje, i rozjechała
       kafel z kapsułą, pasem metryk i FAQ tej samej strony. Zostaje 3000. */
    minPrice: 3000,
    /* Uwaga wdrożeniowa §4: każda podstrona linkuje do `/uslugi/chatboty/cennik`.
       Rozkład trzech progów zostaje tam, tutaj stoi tylko próg średni. */
    linkPoradnik: {
      przed: 'Wszystkie progi wdrożenia z czasami rozpisaliśmy w jednym miejscu: ',
      etykieta: 'cennik chatbotów AI',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  /* KOMPLET 8 PYTAŃ 1:1 Z PAKIETU §P6 („FAQ gotowe, 8 pytań"). Kolejność,
     pytania i odpowiedzi bez zmian: ten sam tekst idzie na stronę i do FAQPage
     JSON-LD, więc każda edycja tutaj rozjeżdża oba naraz. */
  faq: [
    {
      pytanie: 'Na jakich kanałach uruchamiacie chatbota?',
      odpowiedz:
        'Na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie. To jest pełna lista. Jeśli pytasz o kanał spoza niej, powiemy wprost, że go nie robimy.',
    },
    {
      pytanie: 'Czy to musi być osobny bot na każdy kanał?',
      odpowiedz:
        'Nie. Baza wiedzy jest jedna i obsługuje wszystkie kanały naraz. Dokładamy kanał do gotowego bota, nie budujemy go drugi raz.',
    },
    {
      pytanie: 'Ile kosztuje dołożenie WhatsAppa do istniejącego bota?',
      odpowiedz:
        'Mieści się w progu średnim, czyli 3000-6000 zł netto, i zajmuje 3-4 dni robocze. Dokładna kwota zależy od liczby kanałów i zakresu.',
    },
    {
      pytanie: 'Co muszę mieć po swojej stronie, żeby ruszyć na WhatsAppie?',
      odpowiedz:
        'Firmowy numer telefonu i konto firmowe u dostawcy. Warunki i limity WhatsApp Business API sprawdzamy z Tobą na pierwszej rozmowie, bo zmieniają się częściej niż nasza strona.',
    },
    {
      pytanie: 'Czy bot na Messengerze i Instagramie to to samo?',
      odpowiedz:
        'Mechanizm jest ten sam, różni się miejsce, w którym pojawia się okno rozmowy. Oba mają sens, jeśli ruch przychodzi Ci z reklam i postów.',
    },
    {
      pytanie: 'Czy rozmowy z WhatsAppa gdzieś się zapisują?',
      odpowiedz:
        'Tak, historia rozmów jest zapisywana, żeby bot pamiętał kontekst i żebyś mógł do niej wrócić. Zakres i czas przechowywania ustalamy przed startem.',
    },
    {
      pytanie: 'Czy dodanie kanału zmienia utrzymanie?',
      odpowiedz:
        'Może zmienić, bo każde okno to osobne podpięcie do pilnowania. Utrzymanie mieści się w przedziale 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie.',
    },
    {
      pytanie: 'Kiedy nie warto dokładać kolejnego kanału?',
      odpowiedz:
        'Gdy klienci na nim do Ciebie nie piszą. Kanał bez ruchu to kolejne miejsce do pilnowania i żadnej rozmowy więcej.',
    },
  ],

  /* Jedna decyzja domykająca stronę (pakiet §P6 punkt 13): wybór kanałów.
     Mikrokopia mówi WPROST, co się dzieje na bezpłatnej rozmowie, i trzyma się
     ustalenia właściciela z 2026-08-31: bezpłatna rozmowa to badanie potrzeb,
     więc zero obietnicy pomiaru, testu, audytu i raportu. */
  cta: {
    label: 'Porozmawiajmy o kanałach',
    href: '#diagnoza',
    mikrokopia:
      'Na bezpłatnej rozmowie ustalamy jedno: z których okien realnie przychodzą Twoje zapytania i które z pięciu kanałów warto dołożyć. Dołożenie kanału do gotowego bota mieści się w progu średnim, czyli 3000-6000 zł netto i 3-4 dni robocze.',
    dowod:
      'Jeśli wyjdzie, że wystarczy Ci jedno okno, powiemy to wprost i nie sprzedamy Ci czterech pozostałych.',
  },

  queries: [
    'chatbot na whatsapp dla firm',
    'chatbot na whatsapp',
    'chatbot messenger dla firmy',
    'chatbot na instagramie',
    'bot na telegramie dla firmy',
    'chatbot w komunikatorach',
  ],

  /* POWIĄZANIA (pakiet §P6 sekcja 11: obsługa klienta, generowanie leadów,
     voiceboty; plus uwaga wdrożeniowa §4: każda podstrona linkuje zwrotnie do
     `/uslugi/chatboty` i do `/uslugi/chatboty/cennik`).
     Etykieta = H1 strony docelowej, opis = fakt, który stoi na tamtej stronie.
     ZERO KWOT w tej sekcji (uwaga §6: kwoty wyłącznie przy cenie).

     KARTA DOŁOŻONA 2026-09-04 (wyrównanie linków przychodzących w gałęzi):
     `hotele-pensjonaty` nie miało ani jednego wejścia od sióstr. Powód
     treściowy jest wzajemny: tamta strona ma własny wybór kanału z kartą
     „Bot na WhatsAppie łapie gościa, który pisze z telefonu w trasie" i wprost
     odsyła po listę kanałów tutaj, a stąd nie prowadziło z powrotem nic. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firmy',
        href: '/uslugi/chatboty',
        opis: 'Strona macierzysta: co robi nasz chatbot, jak go wdrażamy i jak wyceniamy progi wdrożenia.',
      },
      {
        etykieta: 'Chatbot do obsługi klienta, który odpowiada o 22:00',
        href: '/uslugi/chatboty/obsluga-klienta',
        opis: 'Co bot przejmuje z biura obsługi i w którym momencie oddaje sprawę człowiekowi.',
      },
      {
        etykieta: 'Chatbot, który zbiera i kwalifikuje leady',
        href: '/uslugi/chatboty/generowanie-leadow',
        opis: 'Co bot robi z kontaktem zebranym w rozmowie i gdzie ten kontakt ląduje po jej zakończeniu.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis: 'Wszystkie progi wdrożenia z czasami i model utrzymania rozpisane w jednym miejscu.',
      },
      {
        etykieta: 'Chatbot dla hotelu i pensjonatu',
        href: '/uslugi/chatboty/hotele-pensjonaty',
        opis: 'Ten kanał w obiekcie noclegowym: gość pyta o nocleg z komórki, w drodze, i nie wraca w tym celu na stronę.',
      },
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Gdy klient woli zadzwonić niż napisać: voicebot odbiera telefon, którego nikt nie odebrał. Sam nie dzwoni do nikogo.',
      },
    ],
  },
};
