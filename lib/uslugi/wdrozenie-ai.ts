import type { Usluga } from './types';

/**
 * USŁUGA: WDROŻENIE AI W FIRMIE (/uslugi/wdrozenie-ai).
 *
 * Operacja SEO 2026-10-13/14 (zwiad `.seo-przeglad/naprawa-2026-10-13/zwiad.json`,
 * klaster `wdrozenie-ai`): fraza „wdrożenie ai w firmie" nie występowała na żadnej
 * naszej stronie, a słowa „sztuczna inteligencja" 0 razy w całym serwisie.
 * Ta strona to NOWA strona usługi w szablonie 8-sekcyjnym. Strona-parasol
 * /uslugi/architekci-wartosci-ai ZOSTAJE pod swoim adresem bez zmian; tutaj
 * linkujemy do niej jako do opcji rozliczenia ryczałtowego „za efekt".
 *
 * ŹRÓDŁA FAKTÓW (każda liczba z pliku, żadna nowa):
 *  - 0 zł diagnoza, około 30 minut: lib/uslugi/automatyzacje.ts (pas metryk, podpis tabeli),
 *    components/oferta/TabelaCen.tsx (Mapa Oszczędności Czasu 0 zł).
 *  - Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych, raport PDF, odliczany od
 *    wdrożenia: lib/uslugi/audyt-ai.ts (kapsuła, ramaCeny).
 *  - AI Start 1990 zł, stawka 350 zł/h, ryczałty 3000/5500/10000 zł (10/20/40 h),
 *    Architekci od 10000 zł/mc, „Ceny netto.": components/oferta/TabelaCen.tsx,
 *    components/oferta/DrabinaOfert.tsx, lib/uslugi/opieka-ai.ts (nagłówek).
 *  - Chatbot od 1790 zł netto, 1-10 dni roboczych, utrzymanie 99-599 zł:
 *    lib/uslugi/chatboty.ts (kapsuła, ramaCeny).
 *  - Voicebot 2500 zł / 5000-9000 zł netto, 3-5 / 5-25 dni, utrzymanie 299-1500 zł,
 *    poprawki 350 zł/h: lib/uslugi/voiceboty.ts (tabela w ramaCeny).
 *  - Automatyzacja 3000-10000 zł netto, „w dni, nie w miesiące", 99-599 zł opieka,
 *    dwie rundy poprawek, zasady rozliczenia: lib/uslugi/automatyzacje.ts.
 *  - Faktury zwykle 3000-10000 zł netto: lib/uslugi/dokumenty-faktury.ts (ramaCeny).
 *  - Asystent dla prezesa 4999 zł netto, 5-10 dni roboczych: lib/uslugi/asystent-prezesa.ts.
 *  - Agent rekrutacyjny, widełki na diagnozie: lib/uslugi/agent-rekrutacyjny.ts (ramaCeny).
 *  - Silnik OpenAI / Anthropic / Google, konto klienta, bez marży, umowa
 *    powierzenia, co wypada z bazy wiedzy: lib/uslugi/chatboty.ts (rozwiązanie,
 *    FAQ o danych, linia z „dane osobowe klientów, marże, dokumenty kadrowe").
 *  - 2026-10-14, poprawki po recenzji fali 1: BEZ zdania „dane zostają w UE".
 *    Ta sama zasada co lib/uslugi/agenci-ai.ts: przy silniku wybranym przez
 *    klienta region przetwarzania u dostawcy modelu nie jest potwierdzony
 *    (zwiad.json, HIPOTEZA ryzyka prawnego, decyzja Pawła). Zostaje to, co
 *    pewne: umowa powierzenia, konto klienta, co trafia do dostawcy.
 *    Ten sam powód: query „ile kosztuje wdrożenie AI w firmie" i H2 ceny
 *    w tym brzmieniu oddane wpisowi blogowemu (kanibalizacja).
 *  - Logi, granice, „klient wie, że to AI", RODO i AI Act (bez dat):
 *    components/sections/Bezpieczenstwo.tsx (strona główna).
 *  - Dotacje: 1:1 ze zdaniem z components/sections/Oferta.tsx (strona główna).
 *  - Zespół: lib/o-nas/content.ts (founderzy) + lib/site.ts (jobTitle).
 *  - Case'y: lib/realizacje/auto-email-bok.ts (około 85%), lib/realizacje/lead-generator.ts
 *    (1000 rekordów w 40 minut zamiast 2 tygodni), lib/uslugi/automatyzacje.ts (KNF Team).
 *
 * DO INTEGRATORA (nie renderowane): rejestr lib/uslugi/index.ts, ServiceHero
 * H1_KOLOR i KAFEL_CENY, lib/inf-kategorie (kolor i badge), ROUTES w lib/site.ts,
 * llms.txt, wiedza bota. Szczegóły w raporcie agenta.
 */
export const wdrozenieAi: Usluga = {
  slug: 'wdrozenie-ai',
  dataAktualizacji: '2026-10-14',
  h1: 'Wdrożenie AI w firmie: etapy, ceny i terminy',

  kapsula:
    'Wdrożenie AI w firmie to podpięcie sztucznej inteligencji pod jeden konkretny proces: obsługę klienta, telefony, maile albo dokumenty. Zaczynasz od bezpłatnej diagnozy. Potem Sprint Diagnostyczny za 1490 zł netto (5 dni roboczych, odliczany od wdrożenia) albo jeden proces na próbę za 1990 zł netto. Silnik AI wybierasz Ty: OpenAI, Anthropic albo Google, a konto u dostawcy należy do Ciebie.',

  metaTitle: 'Wdrożenie AI w firmie: etapy, ceny, terminy',
  metaDescription:
    'Wdrożenie AI w firmie krok po kroku: bezpłatna diagnoza, audyt AI 1490 zł netto w 5 dni, jeden proces na próbę 1990 zł netto. Cena i czas każdego etapu.',

  problem: {
    h2: 'Na czym polega wdrożenie AI w firmie?',
    tresc:
      'Na tym, że sztuczna inteligencja przejmuje konkretną, powtarzalną robotę, którą dziś robi człowiek, i robi ją na Twoich danych, w Twoich narzędziach. Kupno licencji czatu to jeszcze nie wdrożenie.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Cztery elementy, z których składa się każde wdrożenie',
        ikona: 'puzzle',
        chip: 'WDROŻENIE AI',
        overline: 'PROCES · WIEDZA · INTEGRACJE · CZŁOWIEK',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Proces',
            akapity: [
              'Jeden konkretny, powtarzalny proces, a nie „AI w całej firmie”. Na przykład odpowiedzi na te same pytania, przepisywanie danych z maila do systemu, potwierdzenia i przypomnienia, raporty.',
            ],
          },
          {
            naglowek: 'Wiedza firmy',
            akapity: [
              'AI odpowiada na podstawie tego, co już masz: cennika, ofert, opisów produktów i procedur. Materiały nie muszą być poukładane, ich uporządkowanie jest częścią wdrożenia.',
            ],
          },
          {
            naglowek: 'Integracje',
            akapity: [
              'Łączymy narzędzia, których już używasz: pocztę, arkusze, CRM, kalendarz, komunikatory. Przepływy budujemy między innymi na Make.com i n8n. Oprogramowania nie zmieniasz.',
            ],
          },
          {
            naglowek: 'Człowiek z ostatnim słowem',
            akapity: [
              'Ty ustawiasz zasady i granice, widzisz każdy krok i w każdej chwili możesz system zatrzymać. Gdy sprawa wymaga decyzji, AI zbiera kontekst i oddaje ją człowiekowi.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst:
          'Dlatego wdrożenie sztucznej inteligencji w firmie mierzymy godzinami zdjętymi z zespołu, a nie liczbą kupionych narzędzi. Narzędzie wzięte, bo było modne, potrafi po miesiącu leżeć nieużywane, a abonament dalej leci.',
      },
      {
        typ: 'naglowek',
        tekst: 'Co możemy wdrożyć w Twojej firmie',
        ikona: 'robot',
        chip: 'AI DLA FIRM',
        overline: 'CENY NETTO · CZAS OD PRZEKAZANIA MATERIAŁÓW',
      },
      {
        typ: 'akapit',
        tekst:
          'AI dla firm to u nas kilka rodzajów wdrożeń. Tam, gdzie zakres jest powtarzalny, cenę i czas podajemy od razu. Tam, gdzie zależy od liczby integracji, widełki dostajesz na bezpłatnej diagnozie, zanim cokolwiek zamówisz.',
      },
      {
        typ: 'tabela',
        naglowki: ['Co wdrażamy', 'Co robi', 'Wdrożenie netto', 'Czas'],
        wiersze: [
          [
            'Chatbot AI',
            'Odpowiada klientom na stronie i w komunikatorach, zbiera leady',
            'od 1790 zł',
            '1-10 dni roboczych',
          ],
          [
            'Voicebot',
            'Odbiera połączenia przychodzące 24/7 i rozmawia po polsku',
            '2500 zł prosty, 5000-9000 zł z integracjami',
            '3-5 dni roboczych, z integracjami 5-25',
          ],
          [
            'Automatyzacja procesu',
            'Przenosi dane między mailem, arkuszem, CRM i fakturą bez przepisywania',
            '3000-10000 zł',
            'w dni, dokładny termin na diagnozie',
          ],
          [
            'Automatyzacja faktur (OCR, KSeF)',
            'Odczytuje fakturę i wpisuje ją do arkusza oraz programu księgowego',
            'zwykle 3000-10000 zł',
            'termin na diagnozie',
          ],
          [
            'Asystent AI dla prezesa',
            'Pisze maile, robi research, przygotowuje do rozmów',
            '4999 zł',
            '5-10 dni roboczych',
          ],
          [
            'Agent AI do rekrutacji',
            'Zbiera CV, robi wstępną ocenę, umawia rozmowy',
            'widełki na diagnozie',
            'termin na diagnozie',
          ],
        ],
        wKarcie: true,
        podpis:
          'Co możemy wdrożyć: kwoty netto, czas liczony od przekazania kompletu materiałów. Opiekę po wdrożeniu rozpisujemy w sekcji o kosztach.',
      },
      {
        typ: 'akapit',
        tekst:
          'Chatbot odpowiada, a agent AI wykonuje pracę: czyta maila, wystawia ofertę, robi raport. Jeśli nie wiesz, czego potrzebujesz, nie musisz tego rozstrzygać sam. To jest zadanie diagnozy.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Kiedy AI się nie opłaca',
        wariant: 'edge',
        chip: 'ZASADA',
        akapity: [
          'Mówimy to, zanim cokolwiek zamówisz. AI wpięte nie tam, gdzie trzeba, to wydane pieniądze, stracony czas i zespół, który przestaje wierzyć w sens zmian.',
        ],
        punkty: [
          'Proces zdarza się raz na kwartał. Automat nie zdąży na siebie zarobić.',
          'Pytań jest kilka w tygodniu. Przy takiej skali odpisanie samemu wychodzi taniej niż wdrożenie.',
          'Procesu nikt nie spisał, wszystko jest w głowach ludzi. Wtedy pierwszym krokiem jest spisanie procesu, a dopiero potem AI.',
          'Każda sprawa wymaga decyzji człowieka. AI zbierze kontekst i odda rozmowę, ale jej nie domknie.',
          'Coś taniej wychodzi zrobić samemu. W raporcie z audytu taki punkt trafia na listę rzeczy, których nie ruszamy.',
        ],
        stopka: ['Wolimy stracić zlecenie niż zaufanie.'],
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jak wdrażamy AI w małej firmie?',
    tresc:
      'Zaczynamy od jednego procesu, który boli najbardziej, i stawiamy go na Twoich danych w dni, nie w miesiące. Kolejny dokładamy dopiero wtedy, gdy pierwszy się spina. Każdy krok jest mały i odwracalny.',
    bloki: [
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'około 85%',
            opis: 'draftów odpowiedzi pisze AI w biurze obsługi klienta Instytutu Kryptografii. Człowiek sprawdza i wysyła.',
            zrodlo: 'realizacja: auto-email dla biura obsługi klienta',
            ton: 'cyan',
          },
          {
            wartosc: '1000 rekordów',
            opis: 'potencjalnych klientów automat zebrał w 40 minut. Ręcznie ta robota zajmowała dwa tygodnie.',
            zrodlo: 'realizacja: błyskawiczny generator leadów',
            ton: 'violet',
          },
          {
            wartosc: 'około 8 h tygodniowo',
            opis: 'mniej ręcznej roboty w zespole 12 handlowców i 3 menedżerów KNF Team (szacunek klienta).',
            zrodlo: 'case KNF Team na stronie automatyzacji',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Wdrażanie AI w małej firmie zaczyna się od jednego procesu',
        ikona: 'rakieta',
        chip: 'AI START',
        overline: 'CZTERY RUCHY · PIERWSZE TRZY ZA 0 ZŁ',
      },
      {
        typ: 'kroki',
        wariant: 'kolo',
        kroki: [
          {
            tytul: 'Wybierz jeden powtarzalny proces',
            opis: 'Taki, który wraca codziennie i nie wymaga ludzkiej oceny: odpowiedzi na te same pytania, przepisywanie danych, potwierdzenia i przypomnienia.',
            meta: '0 zł',
          },
          {
            tytul: 'Policz, ile godzin zjada',
            opis: 'Kalkulator oszczędności na naszej stronie z narzędziami zamienia stracone godziny na kwotę roczną. Bez maila, w 10 sekund.',
            meta: '0 zł',
          },
          {
            tytul: 'Umów bezpłatną diagnozę',
            opis: 'Około 30 minut rozmowy. Wychodzisz z listą procesów do oddania AI i z listą rzeczy, których nie warto ruszać.',
            meta: '0 zł',
          },
          {
            tytul: 'Sprawdź AI na jednym procesie',
            opis: 'AI Start to pierwsza automatyzacja na próbę. Widzisz efekt na swoich danych, zanim podejmiesz większą decyzję.',
            meta: '1990 zł netto',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co przygotowujesz po swojej stronie',
        wariant: 'quiet',
        chip: 'MATERIAŁY',
        akapity: [
          'Na diagnozę i Sprint Diagnostyczny nie musisz nic przygotowywać, prowadzimy Cię pytaniami. Do samego wdrożenia potrzebujemy kompletu materiałów i od dnia, w którym go dostaniemy, liczymy czas realizacji:',
        ],
        punkty: [
          'Opis procesu, który oddajesz AI, i dostępy do narzędzi, w których ma pracować.',
          'Materiały do bazy wiedzy: cennik, oferty, opisy produktów, procedury. Nie muszą być poukładane.',
          'Listę systemów, z którymi AI ma rozmawiać, na przykład CRM, sklep, kalendarz.',
          'Jedną osobę decyzyjną do testów i odbioru, a nie cały zespół.',
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Kto u nas prowadzi Twoje wdrożenie',
        ikona: 'osoba-check',
        chip: 'ZESPÓŁ',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'Paweł Pieloch, Architekt AI full-stack',
            akapity: [
              'Prowadzi całą budowę. Projektuje i buduje całe rozwiązania od początku do końca: automatyzacje, chatboty, voiceboty, agentów AI, aplikacje i wtyczki. To z nim rozmawiasz na diagnozie i on odpowiada za to, żeby rozwiązanie realnie zdejmowało robotę z Twojego zespołu.',
            ],
          },
          {
            naglowek: 'Marcin Karpeta, współzałożyciel',
            akapity: [
              'Prowadzi firmę razem z Pawłem i pilnuje, żeby wszystko się spinało: relacja z klientem, dowiezienie projektu i opieka po wdrożeniu. Dba o to, żeby każdy klient czuł się zaopiekowany od pierwszej rozmowy.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst:
          'SimpleFast.ai to firma wdrażająca AI w polskich firmach, prowadzona przez dwóch founderów. Rozmawiasz bezpośrednio z nimi, nie z działem handlowym, a po odbiorze nie zostawiamy klientów samych.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Twoje dane i umowa powierzenia przed startem',
        wariant: 'top',
        chip: 'RODO',
        akapity: [
          'Bezpieczeństwo danych ustalamy na początku, a nie po wdrożeniu. Przetwarzamy dane zgodnie z RODO i AI Act, a w umowie powierzenia stoi, kto, po co i jak długo przetwarza dane Twoich klientów.',
        ],
        punkty: [
          'Do dostawcy modelu trafia treść potrzebna do odpowiedzi: rozmowa i fragmenty bazy wiedzy.',
          'Przed wgraniem mówimy, co ma z bazy wiedzy wypaść: dane osobowe klientów, marże, dokumenty kadrowe.',
          'Logujemy, co agent AI zrobił. Ustawiasz granice i w każdej chwili możesz go zatrzymać.',
          'Rozmówca od początku wie, że rozmawia z AI. Agent nie udaje człowieka.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Silnik AI wybierasz Ty: OpenAI, Anthropic albo Google',
        wariant: 'quiet',
        chip: 'SILNIK',
        akapity: [
          'Model językowy to silnik, na którym pracuje chatbot, voicebot albo agent AI. Do wyboru masz trzy: OpenAI (GPT), Anthropic (Claude) albo Google (Gemini).',
          'Konto u dostawcy należy do Ciebie. Za zużycie płacisz mu bezpośrednio, bez naszej marży, więc faktura za pracę modelu przychodzi prosto do Ciebie.',
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Wdrażanie AI na własną rękę a wdrożenie z nami',
    naglowekBez: 'Wdrażanie AI na własną rękę',
    naglowekZNami: 'Wdrożenie AI z SimpleFast.ai',
    wiersze: [
      {
        cecha: 'Punkt startu',
        bez: 'Narzędzie z reklamy albo to, które jest modne',
        zNami: 'Proces, który zjada Ci najwięcej godzin',
      },
      {
        cecha: 'Pierwszy wydatek',
        bez: 'Licencje i godziny prób, zanim wiesz, czy to działa',
        zNami: '0 zł za diagnozę, potem 1490 zł netto odliczane od wdrożenia',
      },
      {
        cecha: 'Wybór procesu',
        bez: 'Zgadywanie, co oddać AI',
        zNami: 'Mapa procesów od największego zwrotu',
      },
      {
        cecha: 'Termin',
        bez: 'Nie wiadomo, kiedy koniec',
        zNami: 'Dni robocze liczone od przekazania materiałów',
      },
      {
        cecha: 'Silnik AI',
        bez: 'Ten, który przyszedł razem z narzędziem',
        zNami: 'Wybierasz Ty: OpenAI, Anthropic albo Google, konto Twoje',
      },
      {
        cecha: 'Dane',
        bez: 'Nie wiesz, gdzie trafiają',
        zNami: 'Wiesz, co trafia do dostawcy modelu, umowa powierzenia przed startem',
      },
      {
        cecha: 'Gdy coś nie działa',
        bez: 'Szukasz przyczyny sam',
        zNami: 'Poprawiamy to, co nie zadziałało po naszej stronie, także po odbiorze',
      },
      {
        cecha: 'Po wdrożeniu',
        bez: 'Zostajesz sam z narzędziem',
        zNami: 'Przejmujesz infrastrukturę i płacisz 0 zł abonamentu albo zostawiasz ją u nas pod opieką',
      },
    ],
  },

  kroki: {
    h2: 'Jak wygląda wdrożenie AI krok po kroku?',
    items: [
      {
        tytul: 'Bezpłatna diagnoza',
        opis: 'Około 30 minut rozmowy. Pokazujesz, gdzie ucieka czas, a my mówimy, co da się oddać AI, ile to oszczędza i czego nie ruszać. Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz.',
      },
      {
        tytul: 'Sprint Diagnostyczny albo AI Start',
        opis: 'Gdy chcesz planu na papierze, robimy Sprint Diagnostyczny: 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów. Gdy wiesz, od czego zacząć, bierzemy jeden proces na próbę w AI Start za 1990 zł netto.',
      },
      {
        tytul: 'Wdrożenie, testy i opieka',
        opis: 'Budujemy na Twoich danych, a dwie rundy testów i poprawek są w cenie. Po odbiorze przejmujesz infrastrukturę i płacisz 0 zł abonamentu albo zostawiasz projekt u nas pod opieką.',
      },
    ],
  },

  ramaCeny: {
    /* 2026-10-14 (recenzja fali 1): pytanie „Ile kosztuje wdrożenie AI
       w firmie?" należy do wpisu blogowego (jego metaTitle), więc H2 ceny
       jest twierdzący i nie powtarza go. */
    h2: 'Cennik etapów wdrożenia AI',
    tresc:
      'Wdrożenie AI rozliczamy etapami i każdy etap ma jawną cenę netto. Diagnoza kosztuje 0 zł, Sprint Diagnostyczny 1490 zł netto i odliczamy go od wdrożenia, a jeden proces na próbę 1990 zł netto. Dalej cena zależy od narzędzia: chatbot od 1790 zł netto, voicebot 2500 zł albo 5000-9000 zł netto, automatyzacja procesu 3000-10000 zł netto.',
    /* minPrice = 1490: pierwszy PŁATNY krok wdrożenia (Sprint Diagnostyczny), ta
       sama konwencja co podstrony optymalizacji (chatgpt, perplexity, AI Overviews)
       w components/uslugi/ServiceHero.tsx KAFEL_CENY: „1490 zł to próg, nie cena
       całości". `cenaStala` CELOWO nieustawione: kafel i karta mówią „od 1490 zł",
       a pod kartą render dokłada zdanie o widełkach i bezpłatnej diagnozie.
       Włącza `offers` w Service JSON-LD. */
    minPrice: 1490,
    linkPoradnik: {
      przed: '',
      etykieta: 'Koszt wdrożenia AI w małej firmie rozpisaliśmy w osobnym wpisie',
      po: '.',
      href: '/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026',
    },
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Cena i czas każdego etapu wdrożenia',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'CENY NETTO · CZAS OD PRZEKAZANIA MATERIAŁÓW',
      },
      {
        typ: 'tabela',
        naglowki: ['Etap', 'Cena netto', 'Czas', 'Co dostajesz'],
        wiersze: [
          [
            '1. Bezpłatna diagnoza',
            '0 zł',
            'około 30 minut',
            'Listę procesów do oddania AI i rzeczy, których nie ruszać',
          ],
          [
            '2. Sprint Diagnostyczny (audyt AI)',
            '1490 zł, odliczane od wdrożenia',
            '5 dni roboczych',
            'Raport PDF z mapą procesów, czyli Action Plan',
          ],
          [
            '3. AI Start, jeden proces na próbę',
            '1990 zł',
            'w dni, termin podajemy na diagnozie',
            'Działającą automatyzację jednego procesu na Twoich danych',
          ],
          [
            '4. Wdrożenie narzędzia',
            'chatbot od 1790 zł, voicebot od 2500 zł, automatyzacja 3000-10000 zł',
            'chatbot 1-10, voicebot 3-25 dni roboczych',
            'Gotowe narzędzie po dwóch rundach poprawek i odbiorze',
          ],
          [
            '5. Opieka po wdrożeniu',
            '0 zł po przekazaniu infrastruktury albo abonament',
            'co miesiąc',
            'Abonament: chatbot i automatyzacje 99-599 zł, voicebot 299-1500 zł miesięcznie',
          ],
          [
            '6. Opieka AI w ryczałcie',
            '3000, 5500 albo 10000 zł miesięcznie',
            '10, 20 albo 40 godzin w miesiącu',
            'Stałą pulę godzin na budowę, integracje i utrzymanie',
          ],
        ],
        wKarcie: true,
        podpis:
          'Etapy wdrożenia AI z ceną i czasem. Każda kwota netto, dni robocze liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
      },
      {
        typ: 'przelacznik',
        grupa: 'wdrozenie-ai-rozliczenie',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Za wdrożenie',
            podtytul: 'płacisz raz za projekt',
            naglowek: 'Płacisz raz za wdrożenie, a potem wybierasz, kto trzyma infrastrukturę.',
            akapity: ['Cenę wdrożenia znasz przed startem, a po odbiorze wybierasz jedną z dwóch dróg.'],
            punkty: [
              'Przekazanie infrastruktury: 0 zł abonamentu, poprawki 350 zł netto za godzinę.',
              'Projekt u nas: chatbot i automatyzacje 99-599 zł netto miesięcznie, voicebot 299-1500 zł netto.',
            ],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Ryczałt godzin',
            podtytul: '3000-10000 zł netto/mies.',
            naglowek: 'Opieka AI to stała pula godzin w miesiącu na budowę, integracje i utrzymanie.',
            akapity: [
              'Dla firm, które mają już pierwsze automatyzacje i chcą je rozwijać bez zatrudniania działu. Kolejne procesy schodzą z ludzi po kolei, a godzina w ryczałcie jest tańsza niż poza nim.',
            ],
            punkty: [
              '10 godzin: 3000 zł netto miesięcznie, czyli 300 zł za godzinę.',
              '20 godzin: 5500 zł netto miesięcznie, czyli 275 zł za godzinę.',
              '40 godzin: 10000 zł netto miesięcznie, czyli 250 zł za godzinę.',
              'Praca poza ryczałtem: 350 zł netto za godzinę.',
            ],
          },
          {
            numer: 'MODEL 3',
            tytul: 'Za efekt',
            podtytul: 'od 10000 zł netto/mies.',
            naglowek: 'Architekci Wartości AI: rozliczamy się za przyniesioną wartość, nie za godziny.',
            akapity: [
              'Najpierw liczymy, ile dany proces kosztuje Cię miesięcznie. Potem dobieramy pakiet tak, żeby zwracał się oszczędnością, którą realnie odzyskasz.',
              'To model dla firm, które chcą, żeby ktoś prowadził u nich AI na stałe: strategia, budowa, wdrożenia i utrzymanie pod jednym dachem. Pełną drabinę tego modelu opisujemy na stronie Architekci Wartości AI.',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dwie rundy poprawek w cenie wdrożenia',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: ['O tych zasadach mówimy przed wyceną, a nie po niej:'],
        punkty: [
          'Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
          'Dwie rundy poprawek są w cenie: tydzień testów, poprawki, drugi tydzień, poprawki, odbiór.',
          'To, co nie zadziałało po naszej stronie, poprawiamy zawsze, także po odbiorze.',
          'Nowe funkcje to rozbudowa, którą wyceniamy osobno.',
        ],
      },
    ],
  },

  faq: [
    {
      pytanie: 'Ile trwa wdrożenie AI w firmie?',
      odpowiedz:
        'Zależy od narzędzia. Diagnoza trwa około 30 minut, Sprint Diagnostyczny 5 dni roboczych. Prosty chatbot powstaje w 1-2 dni robocze, a z integracjami w 5-10 dni roboczych. Prosty voicebot to 3-5 dni roboczych, z integracjami 5-25. Pierwszy proces automatyzacji stawiamy w dni, nie w miesiące. Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy.',
    },
    {
      pytanie: 'Ile wydam na start, zanim zobaczę efekt?',
      odpowiedz:
        'Diagnoza kosztuje 0 zł. Pierwszy płatny krok to Sprint Diagnostyczny za 1490 zł netto, który odliczamy w całości od wdrożenia, gdy ruszamy z robotą. Jeśli wolisz od razu sprawdzić AI na jednym procesie, AI Start kosztuje 1990 zł netto. Chatbot na stronę startuje od 1790 zł netto.',
    },
    {
      pytanie: 'Czy da się wdrożyć AI bez działu IT?',
      odpowiedz:
        'Tak. Od strony technicznej robimy wszystko my: dobieramy narzędzie, wpinamy je w to, czego już używasz, a po wdrożeniu możemy je dla Ciebie utrzymywać. Ty mówisz, co Cię uwiera w codziennej robocie, i wskazujesz jedną osobę do testów. Nie musisz uczyć się nowych aplikacji ani zmieniać poczty, arkuszy czy CRM.',
    },
    {
      pytanie: 'Od czego zacząć, jeśli nie wiem, co oddać AI?',
      odpowiedz:
        'Od jednego procesu, który powtarza się codziennie i zjada najwięcej godzin. Jeśli nie wiesz który, to jest zadanie bezpłatnej diagnozy: pokazujemy, gdzie uciekają godziny, i proponujemy, od czego zacząć. Możesz też najpierw zrobić test gotowości firmy na AI: osiem pytań o procesy, dane i ludzi, a na koniec trzy rekomendacje.',
    },
    {
      pytanie: 'Czy wdrożenie AI jest zgodne z RODO?',
      odpowiedz:
        'Tak. Przetwarzamy dane zgodnie z RODO oraz AI Act, a umowę powierzenia danych podpisujemy przed startem. Do dostawcy modelu trafia treść potrzebna do odpowiedzi, a konto u dostawcy jest Twoje. Przed wgraniem bazy wiedzy mówimy, co ma z niej wypaść: dane osobowe klientów, marże, dokumenty kadrowe. Rozmówca od początku wie, że rozmawia ze sztuczną inteligencją, a nie z człowiekiem.',
    },
    {
      pytanie: 'Czy na wdrożenie AI są dotacje?',
      odpowiedz:
        'W 2026 roku część wdrożeń AI dla MŚP da się pokryć z dofinansowań. Na diagnozie sprawdzimy, czy Twój projekt łapie się na dostępne programy, i pomożemy ułożyć wniosek.',
    },
    {
      pytanie: 'Czy AI zastąpi moich pracowników?',
      odpowiedz:
        'Nie. AI nie zastępuje ludzi, AI zastępuje to, co ich zatrzymuje. Zespół przestaje przepisywać maile, faktury i raporty, a zajmuje się klientem i sprawami, które wymagają decyzji. Ostatnie słowo zostaje po stronie człowieka.',
    },
    {
      pytanie: 'Czy wdrożenie AI można rozliczać za efekt?',
      odpowiedz:
        'Tak, w modelu Architekci Wartości AI. Najpierw liczymy, ile proces kosztuje Cię miesięcznie, i dobieramy pakiet tak, żeby zwracał się oszczędnością. To model od 10000 zł netto miesięcznie dla firm, które chcą, żeby ktoś prowadził u nich AI na stałe.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    mikrokopia:
      'Zacznij od bezpłatnej rozmowy. Zbadamy, co zjada czas Tobie i zespołowi, i powiemy, od którego procesu zacząć. Bez zobowiązań.',
    dowod:
      'W Instytucie Kryptografii około 85% draftów odpowiedzi pisze AI, a człowiek tylko sprawdza i wysyła.',
  },

  queries: [
    'wdrożenie AI w firmie',
    'wdrażanie AI w firmie',
    'wdrożenie sztucznej inteligencji w firmie',
    'AI dla firm',
    'sztuczna inteligencja dla firm',
    'firma wdrażająca AI',
    'AI w firmie od czego zacząć',
  ],

  powiazane: {
    realizacje: [
      {
        etykieta: 'Auto-email dla biura obsługi klienta',
        href: '/realizacje/auto-email-bok',
        opis: 'Około 85% draftów odpowiedzi pisze AI, a mail idzie do klienta od razu albo po drobnej poprawce.',
      },
      {
        etykieta: 'Błyskawiczny generator leadów',
        href: '/realizacje/lead-generator',
        opis: '1000 rekordów potencjalnych klientów w 40 minut zamiast 2 tygodni ręcznej pracy.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Test gotowości firmy na AI',
        href: '/narzedzia#test-gotowosci-ai',
        opis: 'Osiem pytań o procesy, dane i ludzi. Na koniec poziom gotowości i trzy rekomendacje, od czego zacząć.',
      },
      {
        etykieta: 'Kalkulator oszczędności z automatyzacji',
        href: '/narzedzia#kalkulator-oszczednosci',
        opis: 'Wpisujesz godziny tracone na powtarzalnej robocie, a kalkulator pokazuje kwotę roczną do odzyskania.',
      },
    ],
    poradniki: [
      {
        etykieta: 'Ile kosztuje wdrożenie AI w małej firmie w 2026?',
        href: '/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026',
        opis: 'Od czego zależy koszt wdrożenia AI w małej firmie i jak liczymy cenę od wartości.',
      },
      {
        etykieta: '10 błędów przy wdrażaniu AI w firmie, i jak ich uniknąć',
        href: '/materialy/10-bledow-przy-wdrazaniu-ai-w-firmie',
        opis: 'Od zaczynania od narzędzia zamiast od problemu po brak opieki po starcie.',
      },
      {
        etykieta: 'Chatbot czy agent AI: czym się różnią i co wybrać dla firmy',
        href: '/blog/chatbot-czy-ai-agent-roznice',
        opis: 'Chatbot odpowiada, agent AI działa. Który wybrać.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Audyt AI firmy: mapa oszczędności czasu',
        href: '/uslugi/audyt-ai',
        opis: 'Sprint Diagnostyczny za 1490 zł netto: 5 dni roboczych i raport PDF z mapą procesów.',
      },
      {
        etykieta: 'Automatyzacja procesów w firmie z AI',
        href: '/uslugi/automatyzacje',
        opis: 'Jeden proces od początku do końca, pełne wdrożenie 3000-10000 zł netto.',
      },
      {
        etykieta: 'Chatbot AI dla firm, który odpowiada klientom 24/7',
        href: '/uslugi/chatboty',
        opis: 'Odpowiada na stronie i w komunikatorach, wdrożenie od 1790 zł netto.',
      },
      {
        etykieta: 'Voicebot dla firmy, który odbiera telefon za Ciebie',
        href: '/uslugi/voiceboty',
        opis: 'Odbiera połączenia 24/7 i rozmawia po polsku, stworzenie od 2500 zł netto.',
      },
      {
        etykieta: 'Agenci AI dla firm',
        href: '/uslugi/agenci-ai',
        opis: 'Chatbot odpowiada, agent działa: sprawdza kalendarz, zapisuje dane w CRM, przygotowuje odpowiedź na maila.',
      },
      {
        etykieta: 'Architekci Wartości AI: płacisz za efekt',
        href: '/uslugi/architekci-wartosci-ai',
        opis: 'Rozliczamy się za przyniesioną wartość, nie za godziny. Zaczynasz za 0 zł.',
      },
      {
        etykieta: 'Opieka AI: utrzymanie i rozwój automatyzacji',
        href: '/uslugi/opieka-ai',
        opis: 'Ryczałt 10, 20 albo 40 godzin miesięcznie, od 3000 zł netto.',
      },
      {
        etykieta: 'Voicebot a RODO i AI Act: co musi być spełnione',
        href: '/uslugi/voiceboty/rodo-ai-act',
        opis: 'Rozmówca wie, że rozmawia z AI, a administratorem danych jesteś Ty.',
      },
    ],
  },
};
