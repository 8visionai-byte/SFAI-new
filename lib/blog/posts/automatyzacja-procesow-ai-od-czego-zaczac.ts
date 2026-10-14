import type { Post } from '../types';

/**
 * WPIS 5: Automatyzacja procesów w firmie: co to jest i od czego zacząć
 *
 * 2026-10-14 (operacja naprawcza SEO 13.10, .seo-przeglad/naprawa-2026-10-13/
 * zwiad.json, klaster „automatyzacje"): wpis PRZESTAWIONY z frazy usługi
 * („automatyzacja procesów AI", kanibalizacja z /uslugi/automatyzacje: usługa
 * poz. 12,3, wpis poz. 70,3) na frazy informacyjne („automatyzacja procesów
 * w firmie", „automatyzacja firmy", „na czym polega automatyzacja procesów").
 * SLUG BEZ ZMIAN (zero przekierowań). Akapit z widełkami w dolarach bez źródła
 * ZASTĄPIONY naszym cennikiem w zł netto. Treść rozbudowana według konspektu
 * zwiadu, wyłącznie faktami, które już stoją w repo:
 *  - 1990 zł netto (AI Start), 3000-10000 zł netto, 99-599 zł netto/mies.
 *    albo 0 zł, dwie rundy poprawek, czas od kompletu materiałów, Make.com
 *    i n8n: lib/uslugi/automatyzacje.ts,
 *  - około 85% draftów przy 580 mailach tygodniowo: lib/realizacje/auto-email-bok
 *    i lib/uslugi/automatyzacje.ts,
 *  - około 8 h tygodniowo w KNF Team (szacunek klienta): lib/uslugi/automatyzacje.ts,
 *  - 1000 rekordów w 40 minut zamiast około dwóch tygodni: lib/realizacje/lead-generator,
 *  - spotkania na Meet, Zoom albo Teams: lib/realizacje/auto-podsumowania-spotkan,
 *  - automat treści: lib/realizacje/automat-tresci-social,
 *  - faktury, OCR, KSeF: lib/uslugi/dokumenty-faktury.ts,
 *  - rekrutacja: lib/uslugi/agent-rekrutacyjny.ts,
 *  - „automat bez opieki prędzej czy później się wysypie":
 *    lib/poradniki/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie.ts (FAQ),
 *  - silnik do wyboru (OpenAI, Anthropic, Google): reguła operacji 13.10
 *    i lib/uslugi/chatboty.ts.
 * Zero em-dash, szyk „agent AI".
 *
 * INPUT PAWŁA (NIE renderowane):
 *  - kryteria wyboru Make.com albo n8n (kiedy który). Do tego czasu sekcja
 *    o narzędziach mówi tylko, na czym budujemy, bez porównania.
 */
export const automatyzacjaProcesowAi: Post = {
  slug: 'automatyzacja-procesow-ai-od-czego-zaczac',
  tytul: 'Automatyzacja procesów w firmie: co to jest i od czego zacząć',

  lead:
    'Automatyzacja procesów w firmie to oddanie systemowi powtarzalnej pracy, którą dziś robi człowiek: system czyta, przenosi dane i przygotowuje wynik, a człowiek zatwierdza. Zaczynaj od jednego procesu, który robisz codziennie i który zabiera najwięcej czasu. Mały, odwracalny krok daje szybki efekt i pokazuje, czy warto iść dalej.',

  /* Z sufiksem marki z layoutu (" · SimpleFast.ai", 16 zn.) całość ma 59
     znaków. Wersja z „co to jest i jak zacząć" miałaby 72, więc „co to jest"
     zostaje w H1, opisie i pierwszym nagłówku. */
  metaTitle: 'Automatyzacja procesów w firmie: jak zacząć',
  metaDescription:
    'Automatyzacja procesów w firmie krok po kroku: co to jest, które procesy oddać najpierw, Make, n8n czy agent AI, ile to kosztuje i jak policzyć zwrot.',

  data: '2026-06-15',
  dataAktualizacji: '2026-10-14',
  kategoria: 'Automatyzacja',
  tagi: ['automatyzacja procesów w firmie', 'automatyzacja w MŚP', 'od czego zacząć', 'AI w firmie'],

  /* Opakowanie bez zmian względem v22: sekcje w kartach `.inf-card`, tabele
     w kartach z widocznym <caption>, kroki wdrożenia na osi pionowej
     (wariant 'os', bo pozycje mają własne numery „Krok 1, 2, 3"). Nowe bloki
     używają wyłącznie istniejących typów (sekcja, tabela, siatka, naglowek). */
  tresc: [
    {
      typ: 'sekcja',
      naglowek: 'Co to jest automatyzacja procesów w firmie?',
      akapity: [
        'Automatyzacja procesów w firmie to oddanie systemowi powtarzalnej pracy, którą dziś robi człowiek. Proces to ciąg kroków od wyzwalacza do wyniku. Przykład: przychodzi mail od klienta, ktoś przepisuje dane do arkusza albo CRM, a na koniec wysyła klientowi potwierdzenie. Po automatyzacji te kroki idą same, a człowiek zostaje przy tym, co wymaga decyzji.',
        'Automatyzacja procesów AI idzie krok dalej, bo system rozumie treść. Nie chodzi o sztywny skrypt typu „jak przyjdzie X, zrób Y". Chodzi o coś, co przeczyta maila z niejasną prośbą, wyłapie, o co klientowi chodzi, przygotuje sensowną odpowiedź i poczeka na Twoje zatwierdzenie.',
        'AI nie zastępuje Twoich ludzi. AI zastępuje to, co ich zatrzymuje: przepisywanie tych samych maili, klepanie ofert, ręczne układanie raportów w piątek po południu.',
      ],
    },
    {
      typ: 'cytat',
      tekst:
        'Chatbot odpowiada. Agent działa. Zwykła automatyzacja przenosi dane. Automatyzacja AI rozumie, co w tych danych jest.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Na czym polega automatyzacja procesów biznesowych?',
      akapity: [
        'Każdy zautomatyzowany proces składa się z tych samych czterech części. Jak nazwiesz je u siebie, łatwiej zobaczysz, co da się oddać systemowi.',
      ],
      punkty: [
        'Wyzwalacz: zdarzenie, które uruchamia proces, na przykład nowy mail, faktura wrzucona do folderu albo nowy wiersz w arkuszu.',
        'Dane: to, co system bierze na wejściu, czyli treść maila, pola z faktury albo dane klienta.',
        'Reguła albo AI: zwykła automatyzacja wykonuje stały krok, a AI czyta treść i przygotowuje wynik.',
        'Wynik i akceptacja człowieka: system zapisuje dane albo przygotowuje odpowiedź, a człowiek zatwierdza to, co idzie do klienta.',
      ],
      stopka: [
        'Auto-email w Instytucie Kryptografii: wyzwalaczem jest mail od klienta, AI pisze projekt odpowiedzi, człowiek go sprawdza i wysyła.',
        'Przy 580 mailach tygodniowo w szczycie około 85% draftów pisze AI.',
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Trzy poziomy: zwykła automatyzacja, automatyzacja AI i agent AI',
    },
    {
      typ: 'tabela',
      wKarcie: true,
      /* Podpis = nagłówek nad tabelą, znak w znak (konwencja tego wpisu). */
      podpis: 'Trzy poziomy: zwykła automatyzacja, automatyzacja AI i agent AI',
      naglowki: ['', 'Zwykła automatyzacja', 'Automatyzacja AI', 'Agent AI'],
      wiersze: [
        [
          'Co robi',
          'Przenosi dane według stałej reguły: jak przyjdzie X, zrób Y',
          'Rozumie treść: czyta maila, wyłapuje, o co chodzi, przygotowuje odpowiedź',
          'Sam podejmuje drobne decyzje po drodze i wykonuje kilka kroków',
        ],
        [
          'Przykład z naszych wdrożeń',
          'Przypomnienia, potwierdzenia, przepływ danych między arkuszem a CRM',
          'Auto-email w Instytucie Kryptografii: około 85% draftów pisze AI',
          'Agent dołącza do spotkania na Meet, Zoom albo Teams i wysyła raport z zadaniami',
        ],
        [
          'Rola człowieka',
          'Ustawia regułę raz',
          'Zatwierdza gotowy tekst',
          'Ustawia granice i w każdej chwili może go zatrzymać',
        ],
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Chatbot to jeszcze inna rzecz: odpowiada na pytania, a agent AI wykonuje całe zadania. Tę różnicę rozpisaliśmy w osobnym wpisie, link jest na dole strony.',
    },
    {
      typ: 'naglowek',
      tekst: 'Jakie procesy w firmie można zautomatyzować?',
    },
    {
      /* Przykłady według działów (tak szukają ludzie i tak grupują liderzy
         SERP). Wyłącznie nasze wdrożenia i usługi, źródła w nagłówku pliku. */
      typ: 'siatka',
      kolumny: 3,
      karty: [
        {
          naglowek: 'Obsługa klienta',
          akapity: [
            'Odpowiedzi na powtarzalne maile i wstępna obsługa zgłoszeń: posortowanie, priorytet, projekt odpowiedzi.',
          ],
          punkty: ['W Instytucie Kryptografii około 85% draftów pisze AI.'],
        },
        {
          naglowek: 'Sprzedaż',
          akapity: [
            'Raporty sprzedażowe składane automatem zamiast ręcznie, oferty i wyceny z gotowych elementów.',
          ],
          punkty: ['Generator leadów: 1000 rekordów w 40 minut zamiast około dwóch tygodni.'],
        },
        {
          naglowek: 'Księgowość i dokumenty',
          akapity: [
            'Odczyt faktur OCR ze skanu, PDF-u albo zdjęcia, kategoria kosztu, wpis do arkusza i księgowości.',
          ],
          punkty: ['Na koniec automat przygotowuje eksport do KSeF.'],
        },
        {
          naglowek: 'Zarząd i spotkania',
          akapity: [
            'Agent dołącza do spotkania na Meet, Zoom albo Teams, spisuje rozmowę i wyłapuje ustalenia.',
          ],
          punkty: ['Po spotkaniu wysyła raport z zadaniami dla konkretnych osób.'],
        },
        {
          naglowek: 'Marketing',
          akapity: [
            'Automat śledzi newsy z branży i przygotowuje gotowy post z grafiką.',
          ],
          punkty: ['Człowiek sprawdza post i publikuje go jednym kliknięciem.'],
        },
        {
          naglowek: 'Rekrutacja',
          akapity: [
            'Agent AI zbiera CV, robi pierwszy odsiew, odpowiada kandydatom i umawia rozmowy.',
          ],
          punkty: ['Decyzja o zatrudnieniu zostaje u człowieka.'],
        },
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Które procesy w MŚP warto automatyzować najpierw?',
      wariant: 'edge',
      akapity: [
        'W małej firmie najwięcej czasu zjada kilka tych samych rzeczy. Robisz je codziennie, są schematyczne i rzadko wymagają realnej decyzji człowieka. To są pierwsi kandydaci.',
      ],
      punkty: [
        'Odpowiadanie na powtarzalne maile: zapytania o ofertę, status zamówienia, te same pytania w kółko.',
        'Przygotowywanie ofert i wycen z gotowych elementów, zamiast składania ich ręcznie za każdym razem.',
        'Umawianie i potwierdzanie terminów: spotkań, wizyt, rozmów handlowych.',
        'Układanie raportów i podsumowań z danych, które i tak masz w arkuszu czy systemie.',
        'Budowanie list kontaktów i kwalifikacja leadów: zebranie danych, uporządkowanie, oznaczenie kto wart kontaktu.',
        'Wstępna obsługa zgłoszeń: posortowanie, nadanie priorytetu, przygotowanie projektu odpowiedzi.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak wybrać pierwszy proces do automatyzacji?',
      akapity: [
        'Dobry pierwszy proces ma trzy cechy. Jest częsty, jest schematyczny i nie wymaga decyzji człowieka na każdym kroku. Jak proces spełnia całą trójkę, to jest Twój start.',
      ],
    },
    {
      typ: 'tabela',
      wKarcie: true,
      /* Podpis = nagłówek H2 sekcji nad tabelą, znak w znak. */
      podpis: 'Jak wybrać pierwszy proces do automatyzacji?',
      naglowki: ['Cecha', 'Co to znaczy', 'Dlaczego to ważne'],
      wiersze: [
        [
          'Częsty',
          'Robisz to codziennie albo wiele razy w tygodniu.',
          'Mały zysk na sztuce razy duża liczba sztuk daje realny czas w miesiącu.',
        ],
        [
          'Schematyczny',
          'Za każdym razem przebiega podobnie, według tego samego wzorca.',
          'System uczy się jednego schematu zamiast walczyć z setką wyjątków.',
        ],
        [
          'Bez decyzji człowieka',
          'Nie trzeba za każdym razem oceniać ryzyka ani negocjować.',
          'AI przygotowuje, a Ty tylko zatwierdzasz. Kontrola zostaje przy Tobie.',
        ],
        [
          'Odwracalny',
          'Człowiek widzi wynik przed wysłaniem i może go poprawić lub cofnąć.',
          'Zero ryzyka, że coś poleci do klienta bez Twojej zgody.',
        ],
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Jeśli nie wiesz, który proces wybrać, zrób test gotowości do automatyzacji w sekcji /narzedzia. Kilka pytań i wychodzi, co u Ciebie najbardziej się opłaca ruszyć najpierw. Kalkulator oszczędności obok policzy, ile czasu i pieniędzy zjada dany proces dzisiaj.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Na czym budujemy automatyzacje: Make.com, n8n i modele AI',
      wariant: 'quiet',
      akapity: [
        'Przepływy budujemy na platformach do automatyzacji Make.com i n8n. Łączą narzędzia, których już używasz: pocztę, arkusze, CRM, system do faktur, kalendarz i komunikatory. Nie musisz zmieniać oprogramowania.',
        'Tam, gdzie trzeba zrozumieć treść, do przepływu dochodzi model AI. Silnik wybierasz Ty: OpenAI, Anthropic albo Google.',
      ],
    },
    {
      typ: 'naglowek',
      tekst: 'Jak wdrożyć automatyzację AI w 3 krokach?',
    },
    {
      /* Trzy punkty to PRZEBIEG wdrożenia, więc jadą jako <ol> na osi pionowej
         (v22 §1.2, wariant 'os': kropka statusu i strzałka w dół zamiast
         numeru). Numeru w płytce świadomie NIE dokładamy, bo każda pozycja ma
         już własny numer w treści („Krok 1", „Krok 2", „Krok 3"). */
      typ: 'kroki',
      wariant: 'os',
      kroki: [
        {
          tytul:
            'Krok 1. Wybierz JEDEN proces. Najlepiej ten, na który najczęściej narzekasz, że zżera czas. Częsty, schematyczny, bez decyzji człowieka.',
        },
        {
          tytul:
            'Krok 2. Wdróż go z człowiekiem w pętli. AI przygotowuje wynik, Ty zatwierdzasz przed wysłaniem. Tak budujesz zaufanie i nic nie leci do klienta bez Twojej zgody.',
        },
        {
          tytul:
            'Krok 3. Zmierz efekt i zdejmij ręce z kierownicy. Jak po kilku tygodniach widać, że draft jest dobry w większości przypadków, zostawiasz tylko wyrywkową kontrolę i bierzesz następny proces.',
        },
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'O dwóch zasadach mówimy przed startem. Czas wdrożenia liczymy od przekazania kompletu materiałów, nie od podpisania umowy. Dwie rundy poprawek są w cenie wdrożenia.',
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak to wygląda na realnym przykładzie?',
      akapity: [
        'Konkret z naszego wdrożenia. W Instytucie Kryptografii odpowiadanie na powtarzalne maile zabierało ludziom mnóstwo czasu. Postawiliśmy agenta, który czyta przychodzącą wiadomość, rozumie o co chodzi i przygotowuje gotowy projekt odpowiedzi. Człowiek go tylko przegląda i wysyła.',
      ],
    },
    {
      typ: 'cytat',
      tekst:
        'W około 85% przypadków draft odpowiedzi pisze agent, a mail idzie do klienta od razu albo po drobnej poprawce.',
      zrodlo: 'Wdrożenie SimpleFast.ai, Instytut Kryptografii',
    },
    {
      typ: 'akapit',
      tekst:
        'To jest właśnie sedno. Człowiek nie znika. Człowiek przestaje pisać od zera i zaczyna zatwierdzać. Drugi przykład tej samej zasady: nasz Lead Generator zebrał i uporządkował 1000 rekordów kontaktowych w 40 minut. Ręcznie ta sama robota to były około dwa tygodnie. Nie dlatego, że ktoś był wolny. Dlatego, że to praca, której człowiek nie powinien robić ręcznie.',
    },
    {
      /* 2026-10-14: akapit z widełkami „od kilkuset do kilku tysięcy dolarów"
         i „kilkaset dolarów miesięcznie" (bez źródła, sprzeczny z cennikiem
         w zł) ZASTĄPIONY naszym cennikiem netto z lib/uslugi/automatyzacje.ts.
         Nagłówek celowo inny niż FAQ usługi („Ile kosztuje automatyzacja
         procesów w firmie?") i H1 poradnika cenowego. */
      typ: 'sekcja',
      naglowek: 'Koszt automatyzacji w 2026 roku: nasze widełki',
      wariant: 'quiet',
      akapity: [
        'Każdy proces jest inny, więc wycena idzie od wartości: ile czasu i pieniędzy realnie odzyskasz.',
        'U nas pierwsza automatyzacja na próbę w pakiecie AI Start kosztuje 1990 zł netto, a pełne wdrożenie jednego procesu zwykle 3000-10000 zł netto, zależnie od liczby integracji. Opieka po wdrożeniu to 99-599 zł netto miesięcznie albo 0 zł, gdy przejmujesz infrastrukturę.',
        'Pełne widełki i to, od czego zależy cena, rozpisaliśmy w poradniku o kosztach automatyzacji AI. Link jest na dole strony.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Jak sprawdzić, czy automatyzacja się opłaci?',
      wariant: 'edge',
      akapity: [
        'Policz godziny, które co tydzień idą na powtarzalną robotę. Pomnóż je przez koszt godziny pracy w Twojej firmie i porównaj z ceną wdrożenia oraz opieki. Pierwszy, dobrze dobrany proces zwykle zwraca się szybko, bo działa codziennie.',
        'Przykład skali: w KNF Team automatyczne raporty sprzedażowe, asystent spotkań i baza wiedzy zdjęły z zespołu 12 handlowców i 3 menedżerów około 8 h pracy tygodniowo. To szacunek klienta, nie pomiar co do minuty.',
        'Kalkulator oszczędności w sekcji /narzedzia policzy to na Twoich liczbach.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Najczęstsze błędy przy automatyzacji procesów',
      akapity: ['Czterech błędów łatwo uniknąć, jeśli znasz je przed startem.'],
      punkty: [
        'Automatyzowanie wszystkiego naraz. To najczęstszy błąd. Wybierasz jeden proces, robisz go dobrze, zbierasz efekt. Potem następny.',
        'Wysyłka do klienta bez sprawdzenia przez człowieka. Na starcie AI przygotowuje, a Ty zatwierdzasz. Kontrolę zdejmujesz dopiero wtedy, gdy sam uznasz, że jakość jest pewna.',
        'Brak opieki po wdrożeniu. Narzędzia, z którymi łączy się automatyzacja, zmieniają się z czasem, więc automat bez opieki prędzej czy później się wysypie.',
        'Start od narzędzia zamiast od procesu. Najpierw policz, gdzie ucieka czas, dopiero potem dobieraj narzędzie.',
      ],
    },
    {
      typ: 'sekcja',
      naglowek: 'Co to znaczy dla Twojej firmy?',
      wariant: 'edge',
      akapity: [
        'Nie potrzebujesz strategii AI na trzy lata ani dużego projektu. Potrzebujesz jednego procesu, który zżera Ci czas, i odwracalnego pierwszego kroku. Wybierasz, wdrażasz z człowiekiem w pętli, mierzysz, idziesz dalej. Tyle. Jak chcesz sprawdzić, od czego zacząć u siebie, zacznij od testu gotowości i kalkulatora oszczędności w sekcji /narzedzia.',
      ],
    },
  ],

  faq: [
    {
      pytanie: 'Od czego zacząć automatyzację AI w małej firmie?',
      odpowiedz:
        'Od jednego procesu, który robisz codziennie, jest schematyczny i nie wymaga decyzji człowieka na każdym kroku. Wdróż go z człowiekiem w pętli, czyli AI przygotowuje wynik, a Ty zatwierdzasz przed wysłaniem. Zmierz efekt i dopiero potem bierz kolejny proces. Test gotowości i kalkulator oszczędności w sekcji /narzedzia pomogą wybrać start.',
    },
    {
      pytanie: 'Czym automatyzacja AI różni się od zwykłej automatyzacji?',
      odpowiedz:
        'Zwykła automatyzacja przenosi dane według sztywnego schematu: jak przyjdzie X, zrób Y. Automatyzacja AI rozumie treść. Potrafi przeczytać niejasnego maila, wyłapać o co chodzi i przygotować sensowną odpowiedź. Chatbot odpowiada, agent działa: czyta, rozumie kontekst i przygotowuje gotowy wynik do zatwierdzenia.',
    },
    {
      pytanie: 'Czy AI wyśle coś do klienta bez mojej kontroli?',
      odpowiedz:
        'Nie, jeśli wdrożysz proces z człowiekiem w pętli. AI przygotowuje projekt odpowiedzi, a Ty go przeglądasz i wysyłasz. W naszym wdrożeniu w Instytucie Kryptografii około 85% draftów pisze AI, a mail idzie do klienta od razu albo po drobnej poprawce, ale decyzja o wysłaniu zawsze zostaje przy człowieku. Kontrolę zdejmujesz dopiero wtedy, gdy sam uznasz, że jakość jest pewna.',
    },
    {
      /* 2026-10-14: nowe pytanie z konspektu zwiadu. Odpowiedź z FAQ usługi
         („Czy automatyzacja zwolni moich ludzi?") i z akapitu „Człowiek nie
         znika" wyżej, innymi słowami, żeby nie dublować FAQPage usługi. */
      pytanie: 'Czy automatyzacja procesów zastąpi pracowników?',
      odpowiedz:
        'Nie. Zastępuje powtarzalną robotę, a nie ludzi. Chodzi o przepisywanie danych, pilnowanie terminów i pisanie tych samych maili od zera. Człowiek nie znika: zamiast pisać od zera, zatwierdza gotowy wynik, a odzyskany czas idzie na klientów i trudniejsze sprawy.',
    },
  ],

  /* 2026-10-14: frazy informacyjne zamiast frazy usługi („automatyzacja
     procesów ai" bierze /uslugi/automatyzacje). */
  queries: [
    'automatyzacja procesów w firmie',
    'na czym polega automatyzacja procesów',
    'automatyzacja firmy',
    'od czego zacząć automatyzację',
  ],

  /* v22 (PLAN-v22 §2.2 pkt 4 i §3 P2 #10): koniec ślepego zaułka.
     ŹRÓDŁA NAPISÓW (znak w znak z rejestrów): usługi = `h1` +
     `metaDescription` z lib/uslugi, narzędzia = `tytul` + `korzysc`
     z lib/narzedzia, poradniki = etykieta i opis z pól `powiazanePoradniki`
     rejestru poradników albo `tytul` wpisu, realizacje = `h1` +
     `metaDescription` z lib/realizacje.
     2026-10-14: na początku usługa automatyzacji (opis = jej nowy
     metaDescription) i nowa usługa wdrożenia AI (F1-2 operacji 13.10;
     etykieta = jej h1, opis = jej metaDescription w stanie z 14.10; jeśli
     strona nie wejdzie albo h1 się zmieni, wpis poprawić albo usunąć), dalej
     usługa faktur. */
  powiazaneUslugi: [
    {
      etykieta: 'Automatyzacja procesów w firmie z AI',
      href: '/uslugi/automatyzacje',
      opis: 'Automatyzacja procesów AI dla firm na Make.com i n8n. Pierwszy proces w dni: AI Start 1990 zł netto, pełne wdrożenie 3000-10000 zł netto. Bezpłatna diagnoza.',
    },
    {
      etykieta: 'Wdrożenie AI w firmie: etapy, ceny i terminy',
      href: '/uslugi/wdrozenie-ai',
      opis: 'Wdrożenie AI w firmie krok po kroku: bezpłatna diagnoza, audyt AI 1490 zł netto w 5 dni, jeden proces na próbę 1990 zł netto. Cena i czas każdego etapu.',
    },
    {
      etykieta: 'Automatyzacja dokumentów i faktur (OCR, KSeF)',
      href: '/uslugi/dokumenty-faktury',
      opis: 'Automatyczny odczyt faktur OCR z AI: skan, PDF i zdjęcie trafiają do arkusza i księgowości, eksport do KSeF robi automat. Wdrożenie zwykle 3000-10000 zł netto.',
    },
    /* 2026-10-14: karta „Rekrutacja" w siatce działów (konspekt zwiadu:
       link do usługi). Etykieta = h1, opis = metaDescription celu. */
    {
      etykieta: 'Agent AI do rekrutacji i pierwszego kontaktu',
      href: '/uslugi/agent-rekrutacyjny',
      opis: 'Agent rekrutacyjny AI zbiera CV, robi pierwszy odsiew i scoring, odpowiada kandydatom i umawia rozmowy. Automatyzacja rekrutacji, decyzja zostaje u Ciebie.',
    },
  ],

  powiazaneNarzedzia: [
    {
      etykieta: 'Test gotowości firmy na AI',
      href: '/narzedzia#test-gotowosci-ai',
      opis: 'Sprawdź gotowość, nawet gdy nie znasz swoich liczb.',
    },
    {
      etykieta: 'Kalkulator oszczędności z automatyzacji',
      href: '/narzedzia#kalkulator-oszczednosci',
      opis: 'Zobacz kwotę, której dziś nie liczy nikt.',
    },
  ],

  powiazanePoradniki: [
    {
      etykieta: 'Ile kosztuje automatyzacja AI w firmie',
      href: '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
      opis: 'Realne widełki wdrożeń automatyzacji i to, od czego zależy cena.',
    },
    /* 2026-10-14: wpis, do którego odsyła akapit pod tabelą trzech poziomów.
       Etykieta = jego `tytul` po zmianie szyku w tej samej operacji. */
    {
      etykieta: 'Chatbot czy agent AI: czym się różnią i co wybrać dla firmy',
      href: '/blog/chatbot-czy-ai-agent-roznice',
      opis: 'Chatbot odpowiada na pytania, agent AI wykonuje całe zadania. Jak wybrać i od czego zacząć.',
    },
  ],

  powiazaneRealizacje: [
    {
      etykieta: 'Auto-email dla biura obsługi klienta',
      href: '/realizacje/auto-email-bok',
      opis: 'System AI dla biura obsługi klienta Instytutu Kryptografii: około 85% draftów idzie od razu albo po drobnej poprawce, gotowe do jednego kliknięcia. Case study.',
    },
    {
      etykieta: 'Błyskawiczny generator leadów',
      href: '/realizacje/lead-generator',
      opis: 'Automat do pozyskiwania leadów: 1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy. Case study, gotowa lista dla sprzedaży.',
    },
    {
      etykieta: 'Automatyczne raporty zamiast ręcznych arkuszy',
      href: '/realizacje/automatyczne-raporty',
      opis: 'Automatyczne raporty: automat spina dane z kilku źródeł i co rano dostarcza gotowy raport. Koniec ręcznego sklejania arkuszy. Case study wdrożenia.',
    },
    {
      etykieta: 'Auto-podsumowania spotkań na Meet, Zoom i Teams',
      href: '/realizacje/auto-podsumowania-spotkan',
      opis: 'Agent AI dołącza do spotkań na Meet, Zoom lub Teams, spisuje je i wysyła raport z zadaniami per uczestnik. Case study: mniej godzin na ręczne notatki.',
    },
  ],
};
