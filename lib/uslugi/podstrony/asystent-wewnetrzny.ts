import type { PodstronaUslugi } from './types';

/**
 * PODSTRONA CHATBOTÓW 7 — ASYSTENT AI DLA PRACOWNIKÓW
 * (`/uslugi/chatboty/asystent-wewnetrzny`).
 * Fraza primary: „chatbot wewnętrzny dla firmy" (pakiet
 * `.seo-przeglad/pakiety/chatboty.md` §P7, treść zatwierdzona przed wdrożeniem).
 *
 * ROZDZIAŁ INTENCJI (żelazna granica tej podstrony, chroni przed kanibalizacją
 * rodzica `/uslugi/chatboty`):
 *  - RODZIC sprzedaje CAŁĄ usługę chatbotów: bot rozmawia z KLIENTEM, zbiera
 *    leady, stoi na stronie i w komunikatorach, ma trzy progi cenowe i rośnie
 *    do Agenta.
 *  - TA STRONA ma innego odbiorcę: PRACOWNIKA. Inna jest treść bazy (procedury,
 *    instrukcje, regulaminy, nagrania ze szkoleń), dochodzi temat uprawnień do
 *    dokumentów, a lista miejsc uruchomienia jest krótsza i inna niż u rodzica.
 *    Strona kończy się jedną decyzją: rozmawiamy o asystencie wewnętrznym.
 *  - NIE MA TU I BYĆ NIE MOŻE: mechanizmu RAG rozłożonego na czynniki (to
 *    zadanie siostry `/uslugi/chatboty/baza-wiedzy`, tam linkujemy), obsługi
 *    klienta zewnętrznego (siostra `/uslugi/chatboty/obsluga-klienta`), ani
 *    pełnej drabiny progów cenowych (siostra `/uslugi/chatboty/cennik`).
 *  - ŚWIADOMIE PRZEPISANE OD ZERA, ŻEBY NIE POWTÓRZYĆ RODZICA: nagłówki H2,
 *    lead kapsuły, `ramaCeny.tresc` i wszystkie trzy kroki są napisane od nowa.
 *    Kontrola poprzedniego pakietu mierzyła podobieństwo zdań wobec rodzica
 *    i wyłapała pary 0,89 i 0,83, więc żadne zdanie nie zostało tu przeniesione
 *    z `lib/uslugi/chatboty.ts` ani sparafrazowane blisko oryginału.
 *    JEDEN ŚWIADOMY WYJĄTEK: formuła modelu utrzymania („infrastruktura u nas:
 *    99-599 zł netto miesięcznie; infrastruktura przekazana Tobie: 0 zł
 *    miesięcznie, poprawki 350 zł netto za godzinę") MA brzmieć identycznie
 *    wszędzie, bo tak każe uwaga wdrożeniowa §7. Podobieństwo tych zdań do
 *    rodzica jest wymagane, a nie przeoczone.
 *
 * ŹRÓDŁA KAŻDEGO FAKTU (nic spoza tej listy):
 *  - odbiorca, cztery źródła bazy (procedury, instrukcje, regulaminy, nagrania
 *    szkoleń), temat uprawnień i podziału bazy: pakiet §P7 sekcje 2 i 3,
 *  - Instytut Kryptografii, trzy boty na transkrypcjach kursów, wskazanie
 *    dokładnego miejsca w nagraniu: pakiet §P7 sekcja 4 oraz §P3 (kapsuła),
 *    zgodne z `lib/realizacje/chatbot-edukacyjny-kursy.ts`,
 *  - PEŁNA lista miejsc uruchomienia (przeglądarka, wewnętrzna strona firmowa,
 *    Telegram) oraz jawne zdanie, czego NIE robimy: pakiet §P7 sekcja 6
 *    plus uwaga wdrożeniowa §8. UWAGA: §8 zabrania WYMIENIANIA Slacka i
 *    Microsoft Teams w treści pakietu, więc zdanie o wykluczeniu nie nazywa
 *    ich po imieniu, tak samo jak §9 nie pozwala nazwać innego dostawcy
 *    modelu nawet w zaprzeczeniu. Wzorzec 1:1 z wdrożonej siostry
 *    `whatsapp-messenger.ts` („pełna lista ... kanału spoza niej nie robimy"),
 *  - dostawca modelu: trzy silniki do wyboru przez klienta (OpenAI, Anthropic,
 *    Google), konto u dostawcy klienta, płatność za zużycie wprost bez naszej
 *    marży. Fakt od właściciela z 2026-09-05 (raport 7.4), ten sam zapis co
 *    sekcja „Na jakim silniku działa Twój bot" rodzica `lib/uslugi/chatboty.ts`;
 *    bije starszą uwagę wdrożeniową §9 pakietu („tylko Claude", stan
 *    z 2026-08-31). Dane w UE: pakiet §P7 sekcja 9,
 *  - „kiedy to nie zadziała" (rozproszona i nieaktualna dokumentacja) plus
 *    wyjście przez Sprint Diagnostyczny: pakiet §P7 sekcja 10,
 *  - rozdzielenie od automatyzacji procesu (AI Start): pakiet §P7 sekcja 11,
 *  - model utrzymania w brzmieniu obowiązkowym: uwaga wdrożeniowa §7,
 *  - agent głosowy z wiedzą o całej firmie w portfolio: pakiet §P7 „Uwaga do
 *    treści" plus `lib/produkty/drugi-mozg-glosowy.ts`. Opisany BEZOSOBOWO
 *    („mamy w portfolio zbudowanego"), nigdy „zbudowaliśmy dla siebie".
 *
 * LICZBY DOZWOLONE NA TEJ STRONIE (innych dopisywać NIE WOLNO):
 *  1790 zł netto (próg prosty, `lib/uslugi/chatboty.ts` ramaCeny.minPrice),
 *  1 do 10 dni roboczych (kapsuła rodzica), 99-599 zł netto miesięcznie i
 *  0 zł miesięcznie oraz 350 zł netto za godzinę (uwaga wdrożeniowa §7),
 *  1490 zł netto i 5 dni roboczych za Sprint Diagnostyczny (pakiet §P7 sekcja 10,
 *  zgodne co do złotówki z `lib/uslugi/audyt-ai.ts`), 1990 zł netto za AI Start
 *  (pakiet §P7 sekcja 11, zgodne z `lib/uslugi/automatyzacje.ts`), trzy boty
 *  u Instytutu Kryptografii, dwie rundy poprawek w cenie wdrożenia.
 *  KAŻDA NASZA KWOTA Z DOPISKIEM NETTO. Wyjątek świadomy: „0 zł miesięcznie"
 *  idzie bez netto, bo zero netto to zero brutto.
 *  BRAK DANYCH, KTÓRYCH NIE ZMYŚLAMY: pakiet nie podaje ani ilu pytań dziennie
 *  pada w firmie, ani ile minut zajmuje szukanie w intranecie, ani od kiedy
 *  robimy takie wdrożenia, ani ilu dokumentów potrzeba na start. Żadnej z tych
 *  liczb ani żadnego odniesienia czasowego („pół roku temu", „od dwóch lat")
 *  na stronie nie ma i być nie może. Wszystkie zdania są napisane tak, żeby
 *  były prawdziwe bez nich.
 *
 * GDZIE STOJĄ KWOTY: wyłącznie w kapsule, w metadanych, w sekcji `ramaCeny`
 * (razem z jej blokami), w FAQ i w CTA. Sekcje `problem`, `rozwiazanie`,
 * `tabelaPorownawcza`, `kroki` oraz karty `powiazane` są bez kwot, bo uwaga
 * wdrożeniowa pakietu trzyma kwoty w bloku cenowym.
 *
 * ZAKAZANE NA TEJ STRONIE: fraza „wirtualna recepcjonistka" w każdej odmianie,
 * nazwy Slack i Microsoft Teams w treści widocznej, także w zaprzeczeniu
 * (uwaga §8: „nie wolno ich wymieniać nigdzie w tym pakiecie"), sugestia, że voicebot sam
 * dzwoni do kogokolwiek, obietnica pomiaru, testu, audytu albo raportu na
 * bezpłatnej rozmowie (ustalenie właściciela z 2026-08-31: bezpłatna rozmowa
 * to WYŁĄCZNIE badanie potrzeb; audyt jest płatny i nazywa się Sprint
 * Diagnostyczny), procenty i oszczędności bez metody, nazwa techniczna modelu.
 *
 * UŁOŻENIE 14 SEKCJI KONSPEKTU W 8-SEKCYJNYM KONTRAKCIE `Usluga`: sekcja 1 to
 * `problem`, sekcje 2, 3, 4 i 6 to `rozwiazanie.bloki`, sekcja 5 to
 * `tabelaPorownawcza`, sekcja 7 to `kroki`, sekcje 8, 9, 10 i 11 to
 * `ramaCeny` z blokami (dzięki temu WSZYSTKIE kwoty zostają w bloku cenowym),
 * sekcja 12 to `powiazane`, 13 to `faq`, 14 to `cta`. Konspektowa sekcja 6
 * („gdzie go uruchamiamy") stoi wewnątrz `rozwiazanie`, bo kontrakt nie ma
 * slotu między tabelą a krokami. Konspektowa tabela jest trójstronna, a
 * `tabelaPorownawcza` ma trzy kolumny (etykieta plus dwa stany), więc dwa
 * dzisiejsze sposoby szukania odpowiedzi stoją w jednej kolumnie „bez".
 *
 * KOLOR I FORMA: podstrona dziedziczy kolor kategorii „chatboty" po rodzicu
 * (uwaga wdrożeniowa §5: bez własnych akcentów), a renderuje się TYMI SAMYMI
 * komponentami co strony usług i pozostałe podstrony. Zero nowych typów bloków,
 * zero nowego CSS.
 *
 * LINKI DO SIÓSTR: `linkPoradnik` i dwa linki w `powiazane` prowadzą do
 * siostrzanych podstron tego samego pakietu (`/uslugi/chatboty/cennik`
 * i `/uslugi/chatboty/baza-wiedzy`). Uwaga wdrożeniowa §4 wymaga tych linków
 * wprost.
 */
export const asystentWewnetrzny: PodstronaUslugi = {
  rodzic: 'chatboty',
  slug: 'asystent-wewnetrzny',
  /* 2026-09-06: trzy silniki do wyboru zamiast „tylko Claude" (fakt od
     właściciela z 2026-09-05). */
  dataAktualizacji: '2026-09-06',

  h1: 'Asystent AI dla pracowników: procedury bez pytania kolegi',

  /* Kapsuła pisana pod tę stronę (pakiet §P7 nie podaje gotowej, w odróżnieniu
     od §P1 i §P3). Niesie komplet wielkości strony: kto pyta, z czego bot
     odpowiada, kto co widzi, gdzie stoi, ile kosztuje i ile trwa wdrożenie.
     Świadomie inna konstrukcja niż kapsuła rodzica: tam pierwsze zdanie jest
     o cenie, tu o odbiorcy i o treści bazy, bo to jest różnica tej podstrony.
     DŁUGOŚĆ: 59 słów, czyli w kontrakcie `types.ts` (40-60). Pierwsza wersja
     miała 79 słów; skrócenie nie wycięło żadnego faktu, tylko zdublowane
     określenia („odpowiada" dwa razy, „dokumenty" obok wyliczenia czterech
     źródeł, „w bazie" przy rolach). Forma TY w całej kapsule, jak reszta
     serwisu. */
  kapsula:
    'Asystent AI dla pracowników to chatbot wewnętrzny dla firmy: odpowiada pracownikowi zamiast doświadczonego kolegi, wyłącznie z Twoich procedur, instrukcji, regulaminów i nagrań ze szkoleń. Bazę dzielimy na role: każdy widzi tylko swoją część. Stoi w przeglądarce, na wewnętrznej stronie firmowej albo na Telegramie. Kosztuje od 1790 zł netto, wdrożenie trwa 1-10 dni roboczych, zależnie od liczby dokumentów i ról.',

  /* metaTitle: pakiet §P7 dawał 33 znaki, konwencja repo (types.ts) i decyzja
     właściciela mówią 50-60. Fraza z pakietu zostaje NA POCZĄTKU bez zmian,
     a wyróżnik to fraza główna tej strony („chatbot wewnętrzny"), która stoi
     w kapsule i w H2 sekcji rozwiązania. Długość 53 znaki. Layout dokleja
     sufiks marki, więc w SERP wychodzi
     „Asystent AI dla pracowników firmy: chatbot wewnętrzny · SimpleFast.ai". */
  metaTitle: 'Asystent AI dla pracowników firmy: chatbot wewnętrzny',
  /* 150 znaków (kontrakt types.ts: 140-160). Konkret plus jedna kwota,
     zero hedgingu, zero em-dash. */
  metaDescription:
    'Chatbot wewnętrzny dla firmy odpowiada pracownikom z procedur, instrukcji, regulaminów i nagrań ze szkoleń. Dostęp dzielimy na role. Od 1790 zł netto.',

  problem: {
    /* Pakiet §P7 sekcja 1 formułuje problem jako pytanie „ile razy dziennie ktoś
       pyta kolegę". Nie kopiujemy tego brzmienia do H2 z dwóch powodów: rodzic
       ma H2 „Ile razy dziennie odpowiadasz na to samo pytanie?" (za blisko),
       a pakiet nie podaje żadnej liczby pytań dziennie, więc zdanie musi
       działać bez liczby. Sens sekcji zostaje ten sam. */
    h2: 'Kogo pyta Twój pracownik, gdy nie pamięta procedury?',
    tresc:
      'Pyta kolegę. Zwykle tego samego, najbardziej doświadczonego, bo on ma to w głowie. Odpowiedź stoi w procedurze, tylko szybciej ją usłyszeć, niż znaleźć.',
    bloki: [
      {
        typ: 'akapit',
        tekst:
          'Czas ucieka wtedy dwóm osobom naraz: pytającemu i pytanemu, wyrwanemu ze swojej roboty. Najbardziej obrywa ten, kto zna firmę najlepiej, bo do niego trafia najwięcej pytań.',
      },
      {
        typ: 'naglowek',
        tekst: 'Skąd biorą się pytania, na które odpowiedź już istnieje?',
        ikona: 'dokument-skan',
        chip: 'ASYSTENT WEWNĘTRZNY',
        overline: 'PROCEDURY · TE SAME PYTANIA WRACAJĄ',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Nowa osoba w zespole',
            akapity: [
              'Wdrożenie polega dziś na tym, że ktoś siedzi obok i tłumaczy. Ten sam zestaw pytań wraca przy każdym kolejnym pracowniku, od początku.',
            ],
          },
          {
            naglowek: 'Sytuacja spoza codzienności',
            akapity: [
              'Procedura na wyjątek jest spisana, ale wchodzi w grę rzadko, więc nikt jej nie pamięta. Zapytać kogoś jest po prostu szybciej niż jej szukać.',
            ],
          },
          {
            naglowek: 'Odpowiedź z nagrania',
            akapity: [
              'Temat był omówiony na szkoleniu, tylko nikt nie wie, w którym nagraniu i w której minucie. Materiał jest, dotarcia do niego nie ma.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy nie wystarczy wyszukiwarka w intranecie?',
        akapity: [
          'Wyszukiwarka znajduje dokumenty, nie odpowiedzi. Pracownik dostaje listę plików i dalej musi je otworzyć i przeczytać, żeby wyłowić jedno zdanie.',
          'Dlatego woli zapytać kolegę: kolega odpowiada zdaniem, a nie listą wyników. Asystent wewnętrzny robi dokładnie to samo, tylko nie ma własnej roboty do przerwania.',
        ],
        wariant: 'quiet',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Skąd asystent wewnętrzny bierze odpowiedzi dla pracownika?',
    tresc:
      'Z Twoich dokumentów: procedur, instrukcji, regulaminów i transkrypcji nagrań ze szkoleń. Trafiają do bazy wiedzy na starcie wdrożenia, a poza tę bazę bot nie wychodzi.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Co asystent wie i skąd to wie?',
        ikona: 'folder-kod',
        chip: 'BAZA WIEDZY',
        overline: 'CZTERY ŹRÓDŁA · TYLKO TWOJE DOKUMENTY',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Procedury',
            akapity: [
              'Jak coś ma pójść krok po kroku: zgłoszenie, akceptacja, wyjątek. To po nie pracownik sięga najczęściej i o nie najczęściej pyta kogoś obok.',
            ],
          },
          {
            naglowek: 'Instrukcje',
            akapity: [
              'Jak obsłużyć konkretne narzędzie, system albo maszynę. Bot podaje ten krok, o który pytasz, zamiast odsyłać do całego pliku.',
            ],
          },
          {
            naglowek: 'Regulaminy',
            akapity: [
              'Urlopy, delegacje, sprzęt, zasady wewnętrzne. Pytania o nie wracają cyklicznie i zwykle trafiają do jednej osoby w firmie.',
            ],
          },
          {
            naglowek: 'Nagrania ze szkoleń',
            akapity: [
              'Transkrypcja nagrania też jest dokumentem. Bot potrafi wskazać miejsce w materiale, w którym pada odpowiedź, zamiast odsyłać do całego szkolenia.',
            ],
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Kto ma dostęp do czego?',
        ikona: 'tarcza-serce',
        chip: 'UPRAWNIENIA',
        overline: 'PODZIAŁ BAZY · ZAKRES PRZYPISANY DO ROLI',
      },
      {
        typ: 'sekcja',
        naglowek: 'Jak dzielimy bazę wiedzy na role?',
        akapity: [
          'Nie każdy dokument jest dla każdego. Regulamin urlopowy może widzieć cały zespół, siatka wynagrodzeń albo umowa z dostawcą już nie.',
          'Przy wdrożeniu dzielimy bazę na części i przypisujemy je do ról, które ustalasz Ty. Pracownik dostaje odpowiedzi wyłącznie z tej części, do której jego rola ma dostęp.',
        ],
        punkty: [
          'Dokumenty przypisane do ról, nie wrzucone do jednego wspólnego worka.',
          'Pytanie spoza zakresu: bot mówi, że nie ma takiej wiedzy dla tej osoby, i nie cytuje treści dokumentu.',
          'Zmiana roli pracownika to zmiana zakresu, a nie budowa bota od nowa.',
        ],
        wariant: 'top',
        chip: 'UPRAWNIENIA',
        stopka: [
          'Podział ról ustalasz Ty, my odwzorowujemy go w bazie.',
          'Zakres spisujemy przed wgraniem pierwszego dokumentu.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Gdzie taki bot pracuje już na nagraniach?',
        akapity: [
          'Instytut Kryptografii ma u siebie trzy boty postawione na transkrypcjach kursów. Taki bot nie kończy na odpowiedzi: wskazuje dokładne miejsce w nagraniu, w którym ta odpowiedź pada.',
          'To ten sam mechanizm, który u Ciebie zadziała na szkoleniach wewnętrznych. Nagranie, którego nikt nie przewija, zaczyna odpowiadać na pytania zespołu.',
          'Mamy w portfolio zbudowanego także agenta głosowego z wiedzą o całej firmie. Rozmawiasz z nim głosem, a każda rozmowa powiększa jego bazę wiedzy.',
        ],
        wariant: 'edge',
        chip: 'REALIZACJA',
      },
      {
        typ: 'naglowek',
        tekst: 'Gdzie stawiamy asystenta wewnętrznego?',
        ikona: 'glob-siatka',
        chip: 'KANAŁY',
        overline: 'TRZY MIEJSCA · TO JEST PEŁNA LISTA',
      },
      {
        typ: 'sekcja',
        naglowek: 'Gdzie pracownik go otwiera?',
        akapity: [
          'Są trzy miejsca i to jest pełna lista tego, w czym go stawiamy. Wybierasz jedno albo kilka, wiedza pod spodem jest ta sama.',
        ],
        punkty: [
          'W przeglądarce: osobny adres, pod który pracownik się loguje.',
          'Na wewnętrznej stronie firmowej: okno rozmowy wpięte tam, gdzie zespół i tak zagląda.',
          'Na Telegramie: rozmowa z telefonu, przydatna, gdy praca jest w terenie, a nie przy biurku.',
        ],
        wariant: 'quiet',
        stopka: [
          'Trzy miejsca wyżej to pełna lista. Nie ma czwartego, o którym milczymy.',
          'Pytasz o miejsce spoza niej? Powiemy wprost, że go nie stawiamy, żebyś nie planował wdrożenia wokół kanału, którego nie obsługujemy.',
        ],
      },
    ],
  },

  /* Konspekt (§P7 sekcja 5) chce porównania trójstronnego: asystent kontra
     intranet z wyszukiwarką kontra pytanie doświadczonego pracownika. Kontrakt
     `tabelaPorownawcza` ma trzy kolumny (etykieta wiersza plus dwa stany), więc
     oba dzisiejsze sposoby szukania odpowiedzi stoją razem w kolumnie „bez".
     Komórki krótkie (konwencja podstron: cecha ~14 znaków, kolumny ~32), żeby
     wiersze nie łamały się na wąskich ekranach. Zero kwot w tabeli. */
  tabelaPorownawcza: {
    h2: 'Asystent wewnętrzny, intranet i pytanie kolegi',
    naglowekBez: 'Intranet albo pytanie kolegi',
    naglowekZNami: 'Asystent wewnętrzny',
    wiersze: [
      {
        cecha: 'Co dostajesz',
        bez: 'Listę plików albo cudzą pamięć',
        zNami: 'Odpowiedź na zadane pytanie',
      },
      {
        cecha: 'Czyj to czas',
        bez: 'Dwóch osób naraz',
        zNami: 'Niczyj z zespołu',
      },
      {
        cecha: 'Po godzinach',
        bez: 'Czekasz, aż ktoś wróci',
        zNami: 'Odpowiada, kiedy pytasz',
      },
      {
        cecha: 'Nowy pracownik',
        bez: 'Uczy się, pytając kogoś obok',
        zNami: 'Pyta bota i pracuje dalej',
      },
      {
        cecha: 'Nagrania szkoleń',
        bez: 'Trzeba je przewinąć',
        zNami: 'Wskazuje miejsce w nagraniu',
      },
      {
        cecha: 'Uprawnienia',
        bez: 'Zależą od tego, kogo zapytasz',
        zNami: 'Zakres przypisany do roli',
      },
      {
        cecha: 'Zgodność z wersją',
        bez: 'Tyle, ile ktoś zapamiętał',
        zNami: 'Tyle, ile wgrany dokument',
      },
    ],
  },

  /* Trzy kroki napisane od zera pod tę podstronę. Rodzic ma kroki „Diagnoza
     (bezpłatna)", „Uczenie i wdrożenie", „Utrzymanie i rozwój" i żaden z nich nie
     został tu przeniesiony ani sparafrazowany. Krok 1 pilnuje ustalenia
     właściciela z 2026-08-31: na bezpłatnej rozmowie WYŁĄCZNIE badanie potrzeb,
     czyli „obejrzymy" i „ustalimy zakres", zero pomiaru, testu i raportu. */
  kroki: {
    h2: 'Co dzieje się od przekazania dokumentów do pierwszego pytania?',
    items: [
      {
        tytul: 'Spis dokumentów i ról',
        opis:
          'Zaczynamy od bezpłatnej rozmowy: obejrzymy, co masz spisane i kto ma to widzieć, i ustalimy zakres wdrożenia. Nic jeszcze nie wgrywamy i niczego nie mierzymy.',
      },
      {
        tytul: 'Baza wiedzy i podział na role',
        opis:
          'Wgrywamy procedury, instrukcje, regulaminy i transkrypcje nagrań, a potem dzielimy je na role, które podałeś. Termin biegnie od dnia, w którym dostajemy komplet materiałów, a nie od podpisu na umowie.',
      },
      {
        tytul: 'Testy z zespołem i dokładanie odpowiedzi',
        opis:
          'Pracownicy pytają bota o to, o co normalnie pytaliby kogoś obok. Czego bot nie wie, dopisujemy do bazy razem z dokumentem, z którego ma to brać.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje asystent AI dla pracowników?',
    /* Świadomie inna treść niż `ramaCeny.tresc` rodzica: rodzic wylicza trzy
       progi z czasami, ta strona mówi, CO w asystencie wewnętrznym rusza cenę,
       i odsyła po drabinę na podstronę cennika. Zero powtórzenia tabeli progów. */
    tresc:
      'Cenę rusza to, ile dokumentów wchodzi do bazy i na ile ról ją dzielimy. Widełki są te same co przy pozostałych naszych chatbotach, czyli od 1790 zł netto w górę, a na całe wdrożenie schodzi od 1 do 10 dni roboczych.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: '1790 zł netto',
            opis: 'próg prosty, od tyle zaczyna się wdrożenie',
            zrodlo: 'kapsuła na górze strony',
            ton: 'cyan',
          },
          {
            wartosc: '1-10 dni',
            opis: 'robocze, od dnia z kompletem materiałów do odbioru',
            zrodlo: 'kapsuła oraz zdanie nad tym pasem',
            ton: 'violet',
          },
          {
            wartosc: '99-599 zł netto',
            opis: 'utrzymanie miesięcznie, gdy infrastruktura stoi u nas',
            zrodlo: 'model utrzymania niżej, ścieżka pierwsza',
            ton: 'green',
          },
          {
            wartosc: '0 zł',
            opis: 'utrzymanie miesięcznie, gdy przekazujemy infrastrukturę Tobie',
            zrodlo: 'model utrzymania niżej, ścieżka druga',
            ton: 'amber',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Kto trzyma infrastrukturę Twojego asystenta?',
        ikona: 'kalendarz-check',
        chip: 'UTRZYMANIE',
        overline: 'DWA MODELE · WYBIERASZ TY',
      },
      /* Brzmienie obu ścieżek 1:1 z formułą z uwagi wdrożeniowej §7: musi być
         identyczne w każdym miejscu serwisu, w którym stoi model utrzymania. */
      {
        typ: 'przelacznik',
        grupa: 'asystent-wewnetrzny-utrzymanie',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Infrastruktura u nas',
            podtytul: '99-599 zł netto miesięcznie',
            naglowek: 'Utrzymanie po naszej stronie: 99-599 zł netto miesięcznie.',
            akapity: [
              'Pilnujemy działania asystenta i dokładamy odpowiedzi na pytania, które wracają. Gdy zmienia się procedura, wgrywamy nową wersję do bazy.',
            ],
            punkty: [
              'Zgłaszasz zmianę procedury, my podmieniamy dokument w bazie.',
              'Bez własnych kont i serwerów po Twojej stronie.',
              'Dokładanie ról, gdy zmienia się struktura zespołu.',
            ],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Infrastruktura u Ciebie',
            podtytul: '0 zł miesięcznie',
            naglowek: 'Utrzymanie po naszej stronie: 0 zł miesięcznie.',
            akapity: [
              'Całość przechodzi na Twoją stronę i nie płacisz nam abonamentu. Późniejsze poprawki rozliczamy po 350 zł netto za godzinę, tylko wtedy, gdy je zamówisz.',
            ],
            punkty: [
              'Zero abonamentu po naszej stronie.',
              'Poprawki na zamówienie: 350 zł netto za godzinę.',
              'Baza wiedzy i dokumenty zostają u Ciebie.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czyje są dokumenty i na czym stoi asystent?',
        akapity: [
          'Silnik wybierasz Ty: OpenAI (GPT), Anthropic (Claude) albo Google (Gemini). Mówimy to wprost, bo przy dokumentach wewnętrznych pytanie o dostawcę modelu pada zwykle jako pierwsze. Konto u dostawcy należy do Ciebie, a za zużycie płacisz mu wprost, bez naszej marży.',
          'Procedury i regulaminy trafiają do bazy wiedzy zbudowanej dla Twojej firmy, a nie do publicznego czatu. Dane zostają w Unii Europejskiej.',
        ],
        punkty: [
          'Silnik do wyboru: OpenAI, Anthropic albo Google. Konto u dostawcy jest Twoje.',
          'Baza wiedzy osobna dla Twojego wdrożenia.',
          'Dane zostają w Unii Europejskiej.',
        ],
        wariant: 'top',
        chip: 'DANE',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy asystent wewnętrzny nie zadziała?',
        akapity: [
          'Bot odpowiada z dokumentów. Jeśli dokumentów nie ma albo nie wiadomo, która wersja obowiązuje, nie ma z czego odpowiadać i żadne wdrożenie tego nie naprawi.',
          'W takiej sytuacji proponujemy Sprint Diagnostyczny: 1490 zł netto, 5 dni roboczych i raport PDF z mapą procesów. Kwotę odliczamy w całości od ceny wdrożenia, gdy po nim ruszamy z robotą.',
        ],
        punkty: [
          'Wiedza siedzi w głowach, a nie na papierze: najpierw trzeba ją spisać.',
          'Procedury są porozrzucane po dyskach, mailach i czyichś prywatnych folderach.',
          'Dokumenty są nieaktualne i nikt nie potrafi wskazać wersji obowiązującej.',
          'Nikt w firmie nie jest właścicielem tych dokumentów, więc nikt ich nie odświeża.',
        ],
        wariant: 'edge',
        chip: 'ZASADA',
        stopka: [
          'Wolimy powiedzieć to przed wdrożeniem, a nie po odbiorze.',
          'Rozpoznajesz swoją firmę w którymś punkcie? Napisz i tak, powiemy, czy zaczynamy od wdrożenia, czy od Sprintu Diagnostycznego.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Chatbot na zewnątrz czy automatyzacja do wewnątrz?',
        akapity: [
          'Asystent wewnętrzny odpowiada pracownikowi na pytanie. Jeśli chodzi Ci o proces, czyli o robotę, którą zespół wykonuje w kółko ręcznie, to inne zadanie i inny produkt.',
          'Wtedy zacznij od AI Start za 1990 zł netto: jedna automatyzacja jednego procesu wewnątrz firmy, na próbę.',
        ],
        punkty: [
          'Asystent wewnętrzny: pracownik pyta, bot odpowiada z dokumentów.',
          'AI Start: system przejmuje powtarzalny krok, którego dziś nikt nie lubi robić.',
        ],
        wariant: 'quiet',
        chip: 'WYBÓR',
      },
    ],
    /* Widełki, nie cena stała: chatboty wyceniamy od 1790 zł netto w górę,
       więc pole `cenaStala` zostaje niewypełnione (kafel ceny w hero ma
       prefiks „od", tak jak u rodzica). */
    minPrice: 1790,
    linkPoradnik: {
      przed: 'Pełną drabinę progów, czasów wdrożenia i kosztów utrzymania rozpisaliśmy na stronie ',
      etykieta: 'pełny cennik chatbotów AI dla firm',
      po: '.',
      href: '/uslugi/chatboty/cennik',
    },
  },

  /* FAQ pisane pod tę podstronę (pakiet §P7 nie podaje gotowych pytań, inaczej
     niż §P1). Żadne pytanie nie powtarza FAQ rodzica: rodzic odpowiada na
     „ile kosztuje chatbot", „czy zmyśla", „gdzie działa", „ile trwa wdrożenie",
     „czy zastąpi obsługę klienta", „ile rund poprawek". Tutaj wszystkie
     pytania dotyczą pracownika, uprawnień, nagrań i dokumentów wewnętrznych.
     Ten sam tekst idzie na stronę i do FAQPage JSON-LD. */
  faq: [
    {
      pytanie: 'Czym asystent wewnętrzny różni się od chatbota dla klientów?',
      odpowiedz:
        'Odbiorcą i treścią bazy. Chatbot dla klientów odpowiada na pytania o ofertę i zbiera kontakt. Asystent wewnętrzny odpowiada Twoim pracownikom z procedur, instrukcji, regulaminów i nagrań ze szkoleń, a dostęp do dokumentów dzielimy na role.',
    },
    {
      pytanie: 'Czy każdy pracownik zobaczy wszystkie dokumenty?',
      odpowiedz:
        'Nie. Bazę dzielimy na części i przypisujemy je do ról, które ustalasz Ty. Pracownik dostaje odpowiedzi wyłącznie z tej części, do której jego rola ma dostęp, a na pytanie spoza zakresu bot nie cytuje treści dokumentu.',
    },
    {
      pytanie: 'Gdzie pracownik rozmawia z asystentem?',
      odpowiedz:
        'W przeglądarce pod osobnym adresem, na wewnętrznej stronie firmowej albo na Telegramie. To jest pełna lista miejsc, w których go stawiamy. Jeśli pytasz o miejsce spoza tej listy, powiemy wprost, że go nie uruchamiamy.',
    },
    {
      pytanie: 'Czy asystent poradzi sobie z nagraniami ze szkoleń?',
      odpowiedz:
        'Tak, pracujemy na transkrypcjach nagrań. Instytut Kryptografii ma u siebie trzy takie boty postawione na transkrypcjach kursów, a bot wskazuje dokładne miejsce w nagraniu, w którym pada odpowiedź.',
    },
    {
      pytanie: 'Ile kosztuje asystent AI dla pracowników?',
      odpowiedz:
        'Od 1790 zł netto w górę, a cenę rusza liczba dokumentów w bazie i liczba ról, na które ją dzielimy. Utrzymanie to 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie.',
    },
    {
      pytanie: 'Co, jeśli nasze procedury są nieaktualne albo porozrzucane?',
      odpowiedz:
        'Wtedy najpierw trzeba je zebrać, bo bot odpowiada wyłącznie z tego, co dostanie. Proponujemy w takiej sytuacji Sprint Diagnostyczny za 1490 zł netto: 5 dni roboczych i raport PDF z mapą procesów, a kwotę odliczamy w całości od ceny wdrożenia.',
    },
    {
      pytanie: 'Na czym stoi asystent i gdzie zostają nasze dokumenty?',
      odpowiedz:
        'Silnik wybierasz Ty: OpenAI, Anthropic albo Google, a konto u dostawcy jest Twoje. Dokumenty trafiają do bazy wiedzy zbudowanej dla Twojej firmy, a nie do publicznego czatu, i dane zostają w Unii Europejskiej.',
    },
  ],

  /* Jedna decyzja domykająca stronę: rozmowa o asystencie wewnętrznym.
     Mikrokopia trzyma się ustalenia właściciela z 2026-08-31 co do słowa:
     bezpłatna rozmowa to badanie potrzeb, więc obiecujemy „obejrzymy"
     i „ustalimy zakres", a wprost mówimy, czego na niej NIE ma. */
  cta: {
    label: 'Porozmawiajmy o asystencie wewnętrznym',
    href: '#diagnoza',
    mikrokopia:
      'Na bezpłatnej rozmowie obejrzymy, jakie dokumenty masz spisane i kto ma je widzieć, i ustalimy zakres wdrożenia. Bez raportu, bez pomiaru i bez zobowiązań.',
    dowod:
      'Jeśli okaże się, że dokumentów jeszcze nie ma, powiemy to wprost i zaproponujemy Sprint Diagnostyczny zamiast wdrożenia.',
  },

  queries: [
    'chatbot wewnętrzny dla firmy',
    'asystent AI dla pracowników',
    'chatbot dla pracowników',
    'asystent AI do procedur firmowych',
    'chatbot na dokumentach wewnętrznych firmy',
    'wewnętrzny asystent AI w firmie',
  ],

  /* POWIĄZANIA (pakiet §P7 sekcja 12: baza wiedzy, automatyzacje, Sprint
     Diagnostyczny) plus uwaga wdrożeniowa §4, która wymaga linku zwrotnego do
     `/uslugi/chatboty` ORAZ do `/uslugi/chatboty/cennik` z każdej podstrony.
     Etykieta = H1 strony docelowej, opis = fakt, który już tam stoi.
     ZERO KWOT w tych kartach (uwaga wdrożeniowa: kwoty wyłącznie w bloku
     cenowym). W poprzednim pakiecie właśnie tutaj wpadło „1490 zł netto"
     i trzeba to było wycinać.
     Świadomie BEZ karty narzędzia: konspekt §P7 sekcja 12 wymienia trzy cele
     (baza wiedzy, automatyzacje, Sprint Diagnostyczny), a jedyny pasujący
     kalkulator ma opis, który stoi już 1:1 u rodzica. Zamiast powielać to samo
     zdanie na dwóch stronach, karta nie powstaje. */
  powiazane: {
    uslugi: [
      {
        etykieta: 'Chatbot AI dla firm',
        href: '/uslugi/chatboty',
        opis:
          'Strona główna usługi: co bot robi po stronie klienta, jak go wdrażamy i jak rośnie do Agenta.',
      },
      {
        etykieta: 'Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)',
        href: '/uslugi/chatboty/baza-wiedzy',
        opis:
          'Jak działa baza wiedzy, z której bot bierze odpowiedzi, i dlaczego szuka w Twoich dokumentach, a nie w internecie.',
      },
      {
        etykieta: 'Ile kosztuje chatbot AI dla firmy? Cennik 2026',
        href: '/uslugi/chatboty/cennik',
        opis:
          'Pełna drabina progów z czasami wdrożenia, dwa modele utrzymania i to, kto płaci za tokeny modelu.',
      },
      {
        etykieta: 'Automatyzacja procesów w firmie z AI',
        href: '/uslugi/automatyzacje',
        opis:
          'Kiedy problemem jest powtarzalny proces zespołu, a nie pytania pracowników o procedury.',
      },
      {
        etykieta: 'Audyt AI firmy: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis:
          'Sprint Diagnostyczny: rozkładamy procesy na czynniki i pokazujemy, gdzie AI da realny zysk, a gdzie nie.',
      },
    ],
    realizacje: [
      {
        etykieta: 'Chatbot edukacyjny do kursów online',
        href: '/realizacje/chatbot-edukacyjny-kursy',
        /* Opis = fakt, który STOI na stronie docelowej (`lib/realizacje/
           chatbot-edukacyjny-kursy.ts`: „bot zna strukturę kursu i wskazuje
           właściwą lekcję oraz miejsce, od którego warto zacząć"). Liczba
           „trzy boty" celowo TU nie wchodzi: stoi u rodzica i w siostrze
           `baza-wiedzy.ts`, ale na samej stronie realizacji jej nie ma,
           więc karta nie zapowiada czegoś, czego czytelnik tam nie znajdzie. */
        opis:
          'Instytut Kryptografii: pytanie zwykłym językiem, a w odpowiedzi nagranie i moment, od którego warto je odsłuchać.',
      },
    ],
    produkty: [
      {
        etykieta: 'SF AI Team',
        href: '/produkty#drugi-mozg-glosowy',
        opis:
          'Mamy w portfolio zbudowanego agenta głosowego z wiedzą o całej firmie: każda rozmowa powiększa jego bazę wiedzy.',
      },
    ],
  },
};
