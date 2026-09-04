import type { Usluga } from './types';

/**
 * USŁUGA 5 — OPTYMALIZACJA (pozycjonowanie pod AI / GEO / SEO).
 * Treść fazy 3: pełna, 1:1 z 06-copy-hero-uslugi.md §"USŁUGA 5".
 * Każdy string prawdziwy i cytowalny przez LLM. Zero zmyślonych liczb/cen,
 * zero em-dash, zero gwarancji konkretnej pozycji w AI (uczciwość = warunek zaufania LLM).
 *
 * ── UWAGA SLUG (bloker przed live, spec 06 §"MAPA USŁUG" + 05 §2.1):
 *    "optymalizacja" NIE istnieje w ROUTES (lib/site.ts). SEO rekomenduje slug
 *    bliższy money query: "pozycjonowanie-ai" lub "seo-geo". Copy jest slug-agnostyczne.
 *    Decyzja Pawła + SEO PRZED flipem live: true. Treść poniżej działa pod każdy URL.
 *
 * ── INPUT PAWŁA (do uzupełnienia przed shipem, NIE renderowane jako [PLACEHOLDER]):
 *    1. ramaCeny.minPrice — realne "od X zł" za audyt GEO (jednorazowy) ORAZ model
 *       opieki miesięcznej (GEO w rytmie). Dopóki brak → minPrice undefined, render
 *       bez kwoty (tresc mówi prawdę: wycena od zakresu, widełki na diagnozie).
 *    2. cta.dowod — żywy scorecard /dowod: realne frazy, w których cytuje nas AI
 *       (nasza własna strona = najmocniejszy dowód GEO). Gdy frazy gotowe, podmienić
 *       na konkret + link "Zobacz nasz wynik na żywo".
 *
 * ── PARTIA GEO 2026-08-19 (audyt `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md`
 *    §6.1 oraz §9 etap 2 pkt 7): strona sprzedawała pozycjonowanie pod AI, mając
 *    3 liczby i ZERO dowodów. Dołożone WYŁĄCZNIE z audytu §6.1 i §7:
 *      - Lenart Motors: ChatGPT wskazuje firmę na pytanie o najlepszego blacharza
 *        i lakiernika premium, efekt po OKOŁO 3 TYGODNIACH od zbudowania strony
 *        i wrzucenia jej do sieci,
 *      - Fichtelgebirgshaus.de (DE): pierwsza dziesiątka Google na frazy umówione
 *        z klientem w umowie plus widoczność w GPT,
 *      - Trockenhaus (DE): z NIEWIDOCZNEJ w Google do PIERWSZEJ TRÓJKI na frazę
 *        „Trockenhaus".
 *    Trzy nowe case'y stoją w lib/realizacje (kategoria `optymalizacja`), więc
 *    `powiazane.realizacje` poniżej robi z tego dowód o jedno kliknięcie.
 *    Nazwana też nieużywana przewaga z §7: pracujemy na rynku polskim
 *    i niemieckim (dwa z trzech dowodów GEO to klienci niemieccy).
 *
 * ── PARTIA PAKIET GEO 2026-08-31 (`.seo-przeglad/pakiety/geo.md`, sekcje N1-N5,
 *    treść zatwierdzona przed wdrożeniem, przeniesiona DOSŁOWNIE, nie własnymi
 *    słowami). Nic z dotychczasowej treści nie zostało zmienione ani przestawione:
 *    doszły wyłącznie bloki, każdy w miejscu z pola „Gdzie wstawić" w pakiecie.
 *      - N1 (dowód od trzech klientów) -> KONIEC `problem.bloki`,
 *      - N2 (case Lenart Motors), N3 (sześć źródeł AI), N4 (dostęp botów AI)
 *        -> KONIEC `rozwiazanie.bloki`, w tej kolejności,
 *      - N5 (harmonogram tydzień po tygodniu) -> POCZĄTEK `ramaCeny.bloki`,
 *        bo `kroki` w kontrakcie nie mają pola `bloki`, a pakiet każe postawić
 *        tę sekcję po krokach wdrożenia i przed ceną.
 *
 *    SKĄD LICZBY W N1-N5 (innych nie dopisano, żadnej nie zaokrąglono):
 *      - „ok. 3 tygodnie" od publikacji do wskazania firmy przez ChatGPT:
 *        pakiet §N1 karta 1 i §N2, wynik W AI, Lenart Motors. Ta sama liczba
 *        stoi już w kapsule, w pasie metryk sekcji `rozwiazanie` i w FAQ,
 *        więc nic się nie rozjeżdża,
 *      - „TOP 10" na frazy z umowy plus widoczność w GPT: pakiet §N1 karta 2,
 *        wynik W GOOGLE, Fichtelgebirgshaus.de,
 *      - „TOP 3" na frazę Trockenhaus ze stanu bez widoczności: pakiet §N1
 *        karta 3, wynik W GOOGLE, Trockenhaus,
 *      - „5 dni roboczych" Sprintu Diagnostycznego, czasy naprawy (landing
 *        1 dzień, strona biznesowa 2-4 dni, strona zaawansowana 5-10 dni)
 *        oraz „około tygodnia 6" (tydzień publikacji 3 plus zmierzone ok. 3
 *        tygodnie): pakiet §N5, tabela i przypis „Źródło liczb",
 *      - sześć źródeł (N3), pięć kroków i cztery boty (N4): definicje z pakietu,
 *        zero liczb spoza niego.
 *    ROZDZIAŁ KANAŁÓW jest wymogiem pakietu: wynik w AI (Lenart Motors) nazwany
 *    osobno od wyników w Google (Fichtelgebirgshaus.de, Trockenhaus), także
 *    w polu `zrodlo` każdej metryki. Zero procentów, bo pakiet ich nie podaje.
 *    W N1-N5 nie ma ani jednej kwoty (uwaga wdrożeniowa pakietu §6: kwoty
 *    wyłącznie w sekcjach N8, N9 i N11).
 *
 *    DWIE RZECZY DO DOMKNIĘCIA POZA TĄ PARTIĄ (świadomie nietknięte):
 *      1. `dataAktualizacji` zostaje na '2026-08-21'. Treść dziś rośnie, więc
 *         datę trzeba bumpnąć jednym ruchem, gdy cały pakiet N1-N13 wejdzie.
 *         ZAŁATWIONE w kontroli 2026-08-31: cały pakiet N1-N13 stoi w pliku,
 *         więc pole ma dziś '2026-08-31' (komentarz przy samym polu).
 *      2. Pakiet §N4 kończy się linkiem do /uslugi/optymalizacja/dostep-botow-ai.
 *         Bloki treści renderują czysty tekst (components/blog/PostBody), więc
 *         klikalnego linku nie da się w nich postawić: zdanie stoi jako
 *         zapowiedź podstrony, a realny link należy dołożyć w `powiazane`
 *         (uwaga wdrożeniowa pakietu §3) razem z publikacją tej podstrony.
 *
 * ── PARTIA PAKIET GEO 2026-08-31, DRUGI PRZEBIEG (`.seo-przeglad/pakiety/geo.md`,
 *    sekcje N6-N10, linie 228-412 pakietu). Ta sama zasada co wyżej: treść
 *    przeniesiona dosłownie, nic z dotychczasowej treści pliku nie zostało
 *    zmienione ani przestawione, doszły wyłącznie bloki.
 *      - N6 (co dostajesz w pakiecie) i N7 (jak sprawdzić, czy ChatGPT poleca)
 *        -> `ramaCeny.bloki`, ZARAZ ZA BLOKAMI N5, czyli przed pasem metryk
 *        i przełącznikiem modeli (dotychczasowa treść sekcji ceny). Pakiet
 *        stawia obie sekcje „przed istniejącą sekcją 5 (Ile kosztuje)",
 *        a bloki `ramaCeny` renderują się pod kartą ceny, więc to najbliższe
 *        wykonalne miejsce w tej samej sekcji,
 *      - N8 (cennik), N9 (trzy drogi) i N10 (koszt czekania) -> KONIEC
 *        `ramaCeny.bloki`, w tej kolejności. Pakiet stawia je „pod sekcją 5,
 *        przed sekcją 6 (powiązane)", a `powiazane` to osobny komponent
 *        na dole strony.
 *
 *    SKĄD LICZBY W N6-N10 (innej nie dopisano, żadnej nie zaokrąglono; N6 i N7
 *    nie zawierają ani jednej liczby poza numeracją pozycji i kroków):
 *      - 1490 zł netto za Sprint Diagnostyczny, 5 dni roboczych, odliczenie
 *        od wdrożenia: pakiet §N8, przypis „Źródło liczb" (konspekt, Audyt AI),
 *      - landing 1590 zł netto / 1 dzień roboczy, strona biznesowa 2900 zł
 *        netto / 2-4 dni, strona zaawansowana od 5900 zł netto / 5-10 dni:
 *        pakiet §N8, decyzja właściciela z 31.08.2026,
 *      - ceny rynkowe 1900 / 2500 / 4000 zł: pakiet §N8,
 *        projektowaniestroncennik.pl, sprawdzone 31.08.2026 (bez dopisku
 *        „netto", poza trzecią kwotą, bo tak stoi w źródle),
 *      - różnice 310 zł (1900 minus 1590) i 400 zł (2900 minus
 *        2500): odejmowanie pokazane wprost w treści, tak jak w pakiecie,
 *      - abonament utrzymaniowy 99-599 zł netto (chatboty i automatyzacje),
 *        299-1500 zł netto (voiceboty), 0 zł przy przekazaniu infrastruktury
 *        i 350 zł netto za godzinę poprawek: pakiet §N8, decyzja właściciela
 *        z 31.08.2026, przypisane WYŁĄCZNIE do chatbotów, voicebotów
 *        i automatyzacji, nie do stron,
 *      - „około trzy tygodnie" u Lenart Motors w N10: ta sama zmierzona liczba
 *        co w kapsule, N1, N2 i N5.
 *    Do każdej NASZEJ kwoty dopisane „netto" (wstęp pakietu §N8: „Wszystkie
 *    ceny są netto"); ceny konkurencji i „0 zł" bez dopisku, patrz kontrola
 *    sprzeczności 2026-08-31 punkty 1 i 2 niżej.
 *    Kwoty stoją WYŁĄCZNIE w N8, N9 i N10, zgodnie z uwagą wdrożeniową
 *    pakietu §6. Kolumna abonamentu agencji GEO w N9 celowo BEZ kwoty, bo cen
 *    konkurencji nikt nie zweryfikował u źródła.
 *
 *    TRZY ŚWIADOME ODSTĘPSTWA OD LITERY PAKIETU (zgłoszone, nie ukryte):
 *      1. N8 nosi w pakiecie ten sam tytuł co istniejące `ramaCeny.h2`, więc
 *         blok dostał nagłówek nazywający zawartość („Cennik pozycjonowania
 *         pod AI: cztery pozycje z cenami"), żeby na stronie nie stanęły dwa
 *         identyczne H2. Treść sekcji bez zmian.
 *      2. N10 zamówione jako kalkulator z czterema polami. Kontrakt bloków
 *         (lib/blog/types.ts) nie ma typu z polami formularza, a strona jest
 *         w całości serwerowa, więc sekcja stoi jako tabela POLE -> CO
 *         WPISUJESZ -> SKĄD WZIĄĆ LICZBĘ, czyli sam wzór do podstawienia.
 *         Zero wartości domyślnych i zero przykładowych kwot (decyzja
 *         właściciela z 31.08.2026, uwaga wdrożeniowa §5). Z tego powodu dwa
 *         zdania pakietu obiecujące „wynik liczy się sam" mówią teraz o wzorze:
 *         statyczna tabela niczego nie przelicza, więc obietnica byłaby
 *         nieprawdziwa.
 *      3. N7 kończy się w pakiecie linkiem do
 *         /uslugi/optymalizacja/monitoring-cytowan-w-ai. Bloki renderują czysty
 *         tekst, więc zdanie stoi jako zapowiedź podstrony bez adresu; realny
 *         link trzeba dołożyć w `powiazane` razem z publikacją tej podstrony
 *         (uwagi wdrożeniowe pakietu §2 i §3), tak samo jak przy N4.
 *
 *    NIE RUSZONE ŚWIADOMIE, DO DECYZJI WŁAŚCICIELA: `ramaCeny.tresc` i podpis
 *    tabeli modeli pracy nadal mówią „widełki podajemy na bezpłatnej diagnozie",
 *    a N8 podaje twarde kwoty. To treść sprzed tej partii, więc zostaje bez
 *    zmian; rozjazd jest zgłoszony w raporcie z przebiegu.
 *    ZAŁATWIONE w kontroli sprzeczności 2026-08-31, punkt 3 niżej.
 *
 * ── PARTIA PAKIET GEO 2026-08-31, TRZECI PRZEBIEG (`.seo-przeglad/pakiety/geo.md`,
 *    sekcje N11-N13, linie 413-522 pakietu). Ta sama zasada co w dwóch
 *    poprzednich przebiegach: treść przeniesiona dosłownie, nic z dotychczasowej
 *    treści pliku nie zostało zmienione ani przestawione, doszły wyłącznie bloki.
 *      - N11 (kiedy nie warto brać tego od nas) -> KONIEC `ramaCeny.bloki`,
 *        zaraz za N10. Pakiet stawia ją „po N10, przed sekcją 6 (powiązane)",
 *        a sekcja 6 to komponent `PodstronyPowiazane` renderowany zaraz po
 *        `RamaCeny` (app/uslugi/[usluga]/page.tsx), więc miejsce zgadza się
 *        co do sekcji,
 *      - N12 („to chwilowa moda" i pięć innych obiekcji) i N13 (słownik ośmiu
 *        pojęć) -> ZA N11, na samym końcu `ramaCeny.bloki`. Pakiet stawia obie
 *        „po sekcji 7 (FAQ), przed sekcją 8 (CTA)", a między FAQ a CTA kontrakt
 *        `Usluga` nie ma ŻADNEJ tablicy `bloki`: mają je tylko `problem`,
 *        `rozwiazanie` i `ramaCeny`. Wciśnięcie N12 do `faq` zmieniłoby treść
 *        FAQPage JSON-LD (zdania twierdzące klienta jako pytania) i skleiłoby
 *        obiekcje z FAQ, czego pakiet zabrania wprost. Kolejność N11 -> N12
 *        -> N13 zachowana. Odstępstwo opisane też przy samych blokach.
 *
 *    SKĄD LICZBY W N11-N13 (żadnej nie dopisano, żadnej nie zaokrąglono):
 *      - landing 1590 zł netto i 1 dzień roboczy oraz strona biznesowa
 *        2900 zł netto i 2-4 dni w N11 punkt 1: pakiet §N11 „Źródło liczb",
 *        decyzja właściciela z 31.08.2026. Te same kwoty stoją już w tabeli
 *        cennika N8 wyżej, więc nic się nie rozjeżdża,
 *      - „pięć dni roboczych" do raportu z pomiarem zerowym w N11 punkt 3:
 *        pakiet §N11, konspekt (Sprint Diagnostyczny), liczba już na stronie,
 *      - „około trzech tygodni" u Lenart Motors w N11 punkt 3: ta sama
 *        zmierzona liczba co w kapsule, N1, N2, N5 i N10,
 *      - N12 i N13 nie zawierają ANI JEDNEJ liczby. Do każdej kwoty w N11
 *        dopisane „netto" (wstęp pakietu: wszystkie kwoty są netto).
 *    Uwaga wdrożeniowa pakietu §6 mówi, że kwoty stoją wyłącznie w N8, N9
 *    i N11. Tak jest: N12 i N13 są bez kwot.
 *
 *    NIE DOPISANO ŻADNEGO ODNIESIENIA CZASOWEGO spoza pakietu („pół roku temu",
 *    „rok temu" i podobne). Jedyne odniesienia czasowe w N11-N13 to te trzy
 *    liczby wymienione wyżej.
 *
 * ── KONTROLA SPRZECZNOŚCI 2026-08-31 (po wejściu całego pakietu N1-N13 stara
 *    i nowa treść mówiły miejscami dwie rzeczy naraz). Rozstrzygnięte cztery
 *    rzeczy, każda na twardej podstawie, żadna „na wyczucie":
 *      1. NETTO PRZY CUDZYCH CENACH COFNIĘTE. Zapis rynkowy wrócił 1:1 do
 *         pakietu §N8: „landing 1900 zł, strona firmowa 2500 zł, strona
 *         rozbudowana 4000 zł netto" oraz „o 310 zł tańszy" i „o 400 zł
 *         więcej". Podstawa: to ceny projektowaniestroncennik.pl, a źródło
 *         mówi „netto" tylko przy trzeciej kwocie. Zasada „każda kwota
 *         z netto" dotyczy WYŁĄCZNIE naszych cen, bo tylko o nich wiemy.
 *         Nasze kwoty (1490 / 1590 / 2900 / od 5900 / 99-599 / 299-1500 /
 *         350 zł za godzinę) zostają z „netto" bez zmian.
 *      2. NETTO PRZY ZERZE COFNIĘTE. „0 zł miesięcznie" (N8) i „0 zł na
 *         fakturze" (N9) wracają do brzmienia pakietu. Zero netto to zero
 *         brutto, więc dopisek nic nie wnosił.
 *      3. WIDEŁKI KONTRA TWARDY CENNIK. Nie ma sprzeczności, bo to dwie różne
 *         rzeczy: pozycje o ustalonym zakresie (Sprint Diagnostyczny, landing,
 *         strona biznesowa, strona zaawansowana) mają twarde ceny w N8,
 *         a widełki dotyczą ciągłej pracy nad autorytetem, której zakres
 *         zależy od liczby przepisywanych stron i szerokości pracy poza
 *         stroną. Przepisane trzy zdania: `ramaCeny.tresc`, overline nagłówka
 *         „Od czego zależy cena" i podpis tabeli modeli pracy. N8 nietknięte.
 *      4. ABONAMENT KONTRA POMIAR CO TYDZIEŃ. Decyzja właściciela (dwa modele
 *         rozliczenia: przekazanie infrastruktury = bez abonamentu, utrzymanie
 *         po naszej stronie = opłata miesięczna; wzmianek o braku abonamentu
 *         NIE wycinać, tylko doprecyzowywać). Zdania absolutne („nie ma
 *         obowiązkowej opłaty miesięcznej", „Bez abonamentu") zostały
 *         w miejscu i wskazują teraz model jednorazowej naprawy, a każde
 *         zdanie o pomiarze co tydzień mówi, że to element modelu „Stała
 *         opieka GEO"; przy jednorazowej naprawie zamrożony zestaw pytań
 *         zostaje u klienta i to on powtarza pomiar. Nie usunięto żadnego
 *         zdania i nie dopisano żadnej nowej kwoty.
 *
 * ── ROZDZIAŁ BEZPŁATNEJ ROZMOWY OD PŁATNEGO SPRINTU 2026-08-31 (ustalenie
 *    właściciela z tego samego dnia). Cytat, który jest tu specyfikacją:
 *    „Na bezpłatnej diagnozie badamy potrzeby klienta, tylko to. A audyt polega
 *    na tym, że my już rozplanowujemy te procesy i przedstawiamy konkretną
 *    ofertę (...). Ten płatny audyt kosztuje 1490 zł, ale jeżeli klient
 *    zdecyduje się na tę usługę i ją weźmie, to wtedy wchodzi to w część
 *    projektu, czyli dla niego jest darmowe."
 *    PROBLEM: strona obiecywała za 0 zł dokładnie tę pracę, którą sprzedaje
 *    za 1490 zł netto jako Sprint Diagnostyczny (pomiar w czterech silnikach AI
 *    i „konkretna lista rzeczy do zrobienia"). Poprawione SZEŚĆ miejsc, wszystkie
 *    tą samą zasadą: bezpłatna rozmowa = poznanie sytuacji i ustalenie zakresu,
 *    pomiar i raport = Sprint. Nic nie usunięto, żadnej liczby nie dopisano.
 *      1. `problem.bloki` punkt „na diagnozie widać, kto jest wymieniany
 *         zamiast Ciebie" -> „w Sprincie Diagnostycznym widać (...)",
 *      2. `problem.bloki` sekcja „Czy da się to naprawić bez nowej strony?":
 *         punkt wyjścia czarno na białym przeniesiony do Sprintu, ocena
 *         technologii strony zostaje na bezpłatnej rozmowie,
 *      3. `kroki` krok 1 „Diagnoza (bezpłatna)": bez pomiaru w silnikach,
 *      4. `ramaCeny.bloki` pas metryk „0 zł" i „ok. 30 minut" (czas 30 minut
 *         NIETKNIĘTY, to realna liczba),
 *      5. `ramaCeny.bloki` sekcja „Co dostaję na bezpłatnej diagnozie?",
 *      6. `cta.mikrokopia` („Za darmo sprawdzimy w czterech silnikach AI").
 *    ODLICZENIE OD WDROŻENIA: kwota 1490 zł netto pada na stronie trzy razy
 *    (tabela cennika N8, sekcja „Co jest w cenie wdrożenia", tabela trzech dróg
 *    N9) i wszystkie trzy mówiły już „odliczane od wdrożenia". Dopisane zostało
 *    JEDNO zdanie i tylko w sekcji „Co jest w cenie wdrożenia": że dla klienta
 *    wchodzącego w projekt audyt jest w praktyce darmowy. Bez duplikatu.
 *    ŚWIADOMIE NIETKNIĘTE, bo dotyczą wyceny, a nie pracy Sprintu:
 *    `ramaCeny.tresc`, podpis tabeli modeli pracy i FAQ „Czy muszę budować
 *    stronę od nowa?" nadal mówią „na bezpłatnej diagnozie" o widełkach ceny
 *    i o ocenie technologii strony.
 *
 * ── OBIEKCJA ZGŁOSZONA, NIE NAPRAWIONA (poza zakresem partii GEO): `cta.dowod`
 *    obiecuje „Zobacz na żywo, w jakich frazach cytuje nas AI", a trasa /dowod
 *    ma w lib/site.ts `live: false` i nie ma dokąd prowadzić. Do decyzji Pawła:
 *    albo postawić /dowod, albo przepisać `cta.dowod` na obietnicę bez „na żywo".
 *    Pole zostaje nietknięte świadomie (cudza własność w tej rundzie).
 */
export const optymalizacja: Usluga = {
  slug: 'optymalizacja',
  /* KONTROLA PAKIETU GEO 2026-08-31: data bumpnięta z '2026-08-21' na dzień
     wejścia całego pakietu N1-N13. Pole jest źródłem `lastmod` w sitemap.xml
     (app/sitemap.ts), a treść strony urosła o 13 sekcji, więc stara data
     mówiłaby botom nieprawdę o świeżości. Zapowiedziane w nagłówku pliku
     („datę trzeba bumpnąć jednym ruchem, gdy cały pakiet N1-N13 wejdzie"). */
  dataAktualizacji: '2026-08-31',
  h1: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',

  kapsula:
    'Pozycjonowanie pod AI (GEO) to ustawienie Twojej strony tak, żeby ChatGPT, Claude, Gemini i Perplexity polecały ją w odpowiedziach, a nie tylko Google w wynikach. Nie musisz budować strony od nowa. Bierzemy to, co masz, i naprawiamy trzy rzeczy: czy boty AI w ogóle widzą Twoją treść, czy jest ułożona tak, by dało się ją zacytować, i czy masz autorytet poza własną stroną. Potem mierzymy, czy realnie zaczynasz padać w odpowiedziach. Że to działa, wiemy z konkretu: strona, którą zbudowaliśmy dla Lenart Motors, była wskazywana przez ChatGPT na pytanie o najlepszego blacharza i lakiernika premium po około trzech tygodniach od wrzucenia jej do sieci.',

  metaTitle: 'Pozycjonowanie pod AI: cytowanie w ChatGPT',
  metaDescription:
    'Pozycjonowanie pod AI (GEO): sprawiamy, że ChatGPT, Claude, Gemini i Perplexity polecają Twoją firmę. W stałej opiece mierzymy cytowalność co tydzień.',

  problem: {
    h2: 'Klienci pytają AI, a AI poleca kogoś innego?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Jeśli w odpowiedziach AI pada konkurencja, a nie Ty, tracisz klientów, których nawet nie widzisz, bo nigdy do Ciebie nie trafili. Ludzie coraz częściej pytają ChatGPT albo Perplexity o polecenie firmy, i właśnie w tej odpowiedzi zapada decyzja.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Czym różni się GEO od SEO?',
        ikona: 'lupa-wykres',
        chip: 'GEO',
        overline: 'DIAGNOZA · 4 SILNIKI AI',
      },
      {
        typ: 'akapit',
        tekst: 'Klasyczne pozycjonowanie w Google tego nie załatwia. Pozycjonowanie pod AI to inna gra: nie walczysz o miejsce w wynikach wyszukiwania, tylko o miejsce w odpowiedzi, którą buduje AI.',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Boty AI nie widzą Twojej treści',
            akapity: [
              'Jeśli model nie ma dostępu do Twojej treści, nie zacytuje Cię, nawet jeśli Twoja oferta jest najlepsza w okolicy. Dlatego to sprawdzamy jako pierwsze, zanim cokolwiek przepiszemy.',
            ],
            punkty: [
              'strona nie wpuszcza botów AI',
              'technologia, której AI w ogóle nie czyta',
            ],
          },
          {
            naglowek: 'Treść nie jest napisana pod cytat',
            akapity: [
              'Optymalizacja pod ChatGPT to pisanie pod cytat, nie pod kliknięcie: bezpośrednia odpowiedź na początku, potem konkret, który da się zacytować.',
            ],
            punkty: [
              'słowa kluczowe upychane na siłę nie działają, a bywają minusem',
              'AI składa odpowiedź z konkretnych liczb i dobrej struktury',
            ],
          },
          {
            naglowek: 'Poza Twoją stroną nikt o Tobie nie mówi',
            akapity: [
              'W GEO liczy się autorytet z zewnątrz. Jeśli poza Twoją stroną nikt Cię nie wymienia, model nie ma się na co powołać, więc poleci kogoś, o kim mówią inni.',
            ],
            /* ROZDZIAŁ ROZMOWY OD SPRINTU 2026-08-31: „na diagnozie widać, kto
               jest wymieniany zamiast Ciebie" obiecywało wynik pomiaru na
               bezpłatnej rozmowie. Ten pomiar jest w Sprincie Diagnostycznym. */
            punkty: [
              'w Google autorytet dawały backlinki, w AI dają wzmianki',
              'w Sprincie Diagnostycznym widać, kto jest wymieniany zamiast Ciebie',
            ],
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czy da się to naprawić bez nowej strony?',
        wariant: 'edge',
        chip: 'GEO',
        /* ROZDZIAŁ ROZMOWY OD SPRINTU 2026-08-31: „punkt wyjścia czarno na
           białym, zanim cokolwiek zamówisz" czytało się jako obietnica raportu
           z pomiarem zerowym za 0 zł. Ten raport jest w Sprincie. Ocena samej
           technologii strony zostaje na bezpłatnej rozmowie, bo to badanie
           potrzeb, a nie pomiar. */
        akapity: [
          'Najczęściej tak. Nie musisz budować strony od nowa: bierzemy to, co masz, i naprawiamy to, co dziś blokuje cytowanie.',
          'Twój punkt wyjścia pokażemy Ci czarno na białym w Sprincie Diagnostycznym, zanim ruszymy z naprawą. Jeśli strona stoi na technologii, której AI nie czyta, powiemy to wprost już na bezpłatnej rozmowie.',
        ],
      },

      /* ── PAKIET GEO §N1 (2026-08-31): „Co dało pozycjonowanie pod AI trzem
         naszym klientom?". Pole „Gdzie wstawić": PO istniejącej sekcji 1
         (problem), PRZED sekcją 2 (rozwiązanie) -> koniec `problem.bloki`.
         Trzy karty pakietu rozłożone na dwa bloki, bo kontrakt nie ma bloku
         „karta z liczbą": `pasMetryk` niesie liczbę i podpis liczby (kolejność
         metryk = kolejność kart), `siatka` niesie nadtytuł i treść karty.
         ROZDZIAŁ KANAŁÓW jest wymogiem pakietu, nie ozdobą: pole `zrodlo`
         każdej metryki mówi wprost, czy to wynik w AI, czy wynik w Google. */
      {
        typ: 'naglowek',
        tekst: 'Co dało pozycjonowanie pod AI trzem naszym klientom?',
        ikona: 'gwiazda-kompas',
        chip: 'DOWÓD',
        overline: 'TRZY WDROŻENIA · NAZWY FIRM',
      },
      {
        typ: 'akapit',
        tekst: 'Zapytaj ChatGPT o swoją branżę i posłuchaj, czyja nazwa pada. Jeśli nie Twoja, to nie pech.',
      },
      {
        typ: 'akapit',
        tekst: 'To znaczy, że model nie ma z Twojej strony czego zacytować. Poniżej trzy firmy, które to odwróciły. Z nazwami, terminami i efektem, który da się sprawdzić.',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'ok. 3 tygodnie',
            opis: 'od publikacji strony do wskazania firmy przez ChatGPT',
            zrodlo: 'Lenart Motors, wynik w AI',
            ton: 'amber',
          },
          {
            wartosc: 'TOP 10',
            opis: 'w Google na frazy z umowy, plus widoczność w GPT',
            zrodlo: 'Fichtelgebirgshaus.de, wynik w Google',
            ton: 'cyan',
          },
          {
            wartosc: 'TOP 3',
            opis: 'wynik w Google na frazę Trockenhaus, ze stanu bez widoczności',
            zrodlo: 'Trockenhaus, wynik w Google',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Lenart Motors, blacharstwo i lakiernictwo premium',
            akapity: [
              'Zbudowaliśmy stronę pisaną pod cytowanie przez modele, nie pod slogany. Po około trzech tygodniach ChatGPT zaczął wskazywać firmę na pytanie o najlepszego blacharza i lakiernika premium. To nasz jedyny zmierzony efekt w samym AI i mówimy o tym wprost.',
            ],
          },
          {
            naglowek: 'Fichtelgebirgshaus.de, budowa domów, rynek niemiecki',
            akapity: [
              'Jedna strona, dwa kanały. Frazy zapisane w umowie weszły do pierwszej dziesiątki w Google. Dodatkowo treść jest na tyle konkretna, że sięga po nią też GPT. Ten sam materiał pracuje dwa razy.',
            ],
          },
          {
            naglowek: 'Trockenhaus, osuszanie piwnic i remonty, Niemcy',
            akapity: [
              'Firma startowała z pozycji, na której nikt jej nie znajdował. Dziś jest w pierwszej trójce wyników na swoją główną frazę. To wynik w Google, nie w AI, i tak go nazywamy.',
            ],
          },
        ],
      },
      {
        typ: 'cytat',
        tekst: 'Nie podajemy wzrostów w procentach, bo ich nie zmierzyliśmy. Dowód czysto AI mamy dziś jeden: Lenart Motors. Dwa pozostałe to wyniki w Google i piszemy to wprost, zamiast wrzucać wszystko do jednego worka.',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jak sprawiamy, że AI zaczyna Cię cytować?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Naprawiamy trzy rzeczy: czy boty AI w ogóle widzą Twoją stronę, czy treść jest ułożona pod cytat i czy masz autorytet poza własną stroną. Potem mierzymy, czy realnie padasz w odpowiedziach: przy jednorazowej naprawie zamrożony zestaw pytań zostaje u Ciebie i powtarzasz pomiar sam, a w stałej opiece robimy go co tydzień my.',
    bloki: [
      {
        typ: 'naglowek',
        tekst: 'Jak być cytowanym w ChatGPT?',
        ikona: 'wykres-strzalka',
        chip: 'GEO',
        overline: 'CZTERY ETAPY · CO TYDZIEŃ W STAŁEJ OPIECE',
      },
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'ok. 3 tygodnie',
            opis: 'od publikacji strony Lenart Motors do wskazania firmy przez ChatGPT',
            zrodlo: 'Lenart Motors',
            ton: 'cyan',
          },
          {
            wartosc: 'top10 Google',
            opis: 'frazy z umowy plus widoczność w GPT',
            zrodlo: 'Fichtelgebirgshaus.de',
            ton: 'violet',
          },
          {
            wartosc: 'top3 Google',
            opis: 'z niewidocznej strony na frazę Trockenhaus',
            zrodlo: 'Trockenhaus',
            ton: 'green',
          },
        ],
      },
      {
        typ: 'przelacznik',
        grupa: 'optymalizacja-etapy',
        opcje: [
          {
            numer: 'ETAP 1',
            tytul: 'Widoczność dla botów',
            podtytul: 'start pracy',
            naglowek: 'Najpierw sprawdzamy, czy boty AI w ogóle widzą Twoją treść.',
            akapity: [
              'Dopóki model nie ma dostępu do strony, reszta pracy nic nie zmienia, bo nie ma czego zacytować. Dlatego ten etap idzie na sam początek, a nie na koniec.',
            ],
            punkty: [
              'odblokowujemy boty AI tam, gdzie strona je zatrzymuje',
              'jeśli winna jest technologia, której AI nie czyta, mówimy to wprost na diagnozie',
            ],
          },
          {
            numer: 'ETAP 2',
            tytul: 'Treść pod cytat',
            podtytul: 'kluczowe strony',
            naglowek: 'Przepisujemy kluczowe strony na format, który AI cytuje.',
            akapity: [
              'To jest optymalizacja strony pod ChatGPT w praktyce: piszemy pod cytat, nie pod kliknięcie. Model ma wyjąć z Twojej strony gotowy fragment, więc każdą kluczową stronę układamy tak, żeby dało się to zrobić bez czytania całości.',
            ],
            punkty: [
              'odpowiedź postawiona wysoko, zaraz pod nagłówkiem',
              'konkretne liczby, tabele i nagłówki formułowane jak pytania',
              'nie upychamy słów kluczowych, bo bywają wręcz minusem',
            ],
          },
          {
            numer: 'ETAP 3',
            tytul: 'Świeżość',
            podtytul: 'treść aktualna',
            naglowek: 'Dokładamy świeżość, bo AI woli treść aktualną.',
            akapity: [
              'Strona, na której od dawna nic się nie zmienia, ma mniejszą szansę trafić do odpowiedzi. Dlatego pilnowanie aktualności kluczowych stron jest u nas osobnym etapem, nie dodatkiem.',
            ],
          },
          {
            numer: 'ETAP 4',
            tytul: 'Autorytet poza stroną',
            podtytul: 'rankingi i zestawienia',
            naglowek: 'Budujemy autorytet poza Twoją stroną, bo stamtąd AI bierze rekomendacje.',
            akapity: [
              'To najwolniejszy etap, bo autorytet buduje się z czasem. Dlatego cytowalność rośnie w rytmie, a nie jednym strzałem, i dlatego ta praca ma sens miesiąc po miesiącu.',
            ],
            punkty: [
              'rankingi, Reddit, własne dane i wzmianki',
              'w klasycznym SEO liczyły się backlinki, w GEO liczy się to, kto o Tobie wspomina',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'W modelu stałej opieki efekt mierzymy co tydzień, ręcznie. Wpisujemy Twoje kluczowe pytania w cztery silniki AI i zapisujemy, czy padasz w odpowiedziach i kto jest wymieniany zamiast Ciebie. Tak sprawdzamy cytowalność w ChatGPT: trend czarno na białym, a nie obietnice. Przy jednorazowej naprawie ten sam zamrożony zestaw pytań zostaje u Ciebie i powtarzasz pomiar sam, kiedy chcesz.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Trzy wyniki klientów, każdy z nazwą firmy',
        wariant: 'top',
        chip: 'GEO',
        akapity: [
          'Liczby z pasa powyżej to realne wdrożenia, nie testy. Każde opisaliśmy osobno w realizacjach, więc możesz je sprawdzić, zanim cokolwiek zamówisz.',
        ],
        punkty: [
          'Lenart Motors: model wskazywał firmę na konkretne pytanie klienta, o najlepszego blacharza i lakiernika premium, a nie na samą nazwę firmy.',
          'Fichtelgebirgshaus.de: frazy nie były przypadkowe, tylko umówione z klientem w umowie. Bierzemy odpowiedzialność za konkretny zakres.',
          'Trockenhaus: mała firma, co mówimy wprost. Widoczność zbudowała treść z konkretem, nie wielkość serwisu.',
        ],
        stopka: [
          'Dwa z trzech wdrożeń to klienci z rynku niemieckiego. Pracujemy po polsku i po niemiecku.',
        ],
      },

      /* ── PAKIET GEO §N2 (2026-08-31): „Jak ChatGPT zaczął wskazywać Lenart
         Motors?". Pole „Gdzie wstawić": PO istniejącej sekcji 2 (rozwiązanie),
         PRZED sekcją 3 (tabela porównawcza) -> koniec `rozwiazanie.bloki`.
         Nadtytuły case'a (PUNKT WYJŚCIA, CO ZROBILIŚMY, CZAS, CZYM TO
         SPRAWDZAMY, UCZCIWE ZASTRZEŻENIE) idą jako nagłówki bloków `sekcja`,
         akapity 1:1 z pakietu. Liczba „około trzech tygodni" stoi już w pasie
         metryk tej sekcji, więc NIE dublujemy jej drugim pasem. */
      {
        typ: 'naglowek',
        tekst: 'Jak ChatGPT zaczął wskazywać Lenart Motors?',
        ikona: 'radar',
        chip: 'CASE STUDY',
        overline: 'LENART MOTORS · JEDEN ZMIERZONY PRZYPADEK',
      },
      {
        typ: 'akapit',
        tekst: 'Warsztat blacharsko lakierniczy z segmentu premium. Dobra robota, zadowoleni klienci, a w ChatGPT cisza.',
      },
      {
        typ: 'sekcja',
        naglowek: 'Punkt wyjścia',
        wariant: 'edge',
        akapity: [
          'Przed publikacją nowej strony ChatGPT nie wskazywał firmy na pytanie o najlepszego blacharza i lakiernika premium. Tyle wiemy i tyle mówimy.',
          'Model nie karze Cię za nic. On po prostu nie ma zdania, bo nie ma źródła, z którego mógłby je zbudować.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co zrobiliśmy',
        wariant: 'top',
        akapity: [
          'Napisaliśmy stronę od nowa, pod jedno kryterium: żeby dało się z niej wyciąć gotową odpowiedź. Krótkie akapity, konkretne zakresy usług, jasne odpowiedzi na pytania klienta.',
          'Ułożyliśmy encję firmy. Czyli spójny opis tego, kim ta firma jest, co robi i gdzie działa, powtórzony tak samo wszędzie, gdzie się pojawia.',
          'Sprawdziliśmy dostęp dla botów AI. Mają wejść na stronę i przeczytać treść bez zgadywania, co jest ofertą, a co ozdobnikiem.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czas',
        wariant: 'edge',
        chip: 'DOWÓD',
        akapity: [
          'Około trzech tygodni od publikacji. Tyle minęło, zanim ChatGPT zaczął wskazywać firmę na pytanie o najlepszego blacharza i lakiernika premium.',
          'To nie jest gwarantowany termin, tylko jeden zmierzony przypadek. Jasna specjalizacja, mała konkurencja o to jedno pytanie. W trudniejszym rynku potrwa dłużej.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czym to sprawdzamy',
        wariant: 'top',
        akapity: [
          'Pytanie kontrolne brzmi tak, jak zapytałby klient, a nie jak fraza z narzędzia SEO. Całą metodę rozpisujemy niżej, w sekcji o pomiarze.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Uczciwe zastrzeżenie',
        wariant: 'quiet',
        chip: 'UCZCIWIE',
        akapity: [
          'To pomiar własny, wykonany przez nas. Odpowiedzi modeli zmieniają się w czasie, więc liczy się seria takich pomiarów, a nie jeden zrzut ekranu.',
        ],
      },

      /* ── PAKIET GEO §N3 (2026-08-31): „Skąd ChatGPT w ogóle wie, że
         istniejesz?". Pole „Gdzie wstawić": PO nowej sekcji N2, PRZED sekcją 3
         (tabela porównawcza) -> zaraz za blokami N2. Pakiet zamawia LISTĘ
         NUMEROWANĄ na 6 pozycji, więc idzie to blokiem `kroki` (render <ol>,
         numer czytelny też dla bota). W każdej pozycji: opis źródła plus zdanie
         „Co z tym robimy", tak jak w pakiecie. Punkty 3, 4 i 5 mówią wyłącznie
         o diagnozie i przekazaniu listy, bo prace PR i wprowadzanie do katalogów
         nie są pozycją w cenniku. */
      {
        typ: 'naglowek',
        tekst: 'Skąd ChatGPT w ogóle wie, że istniejesz?',
        ikona: 'glob-siatka',
        chip: 'ŹRÓDŁA AI',
        overline: 'SZEŚĆ ŹRÓDEŁ · NIE TYLKO TWOJA STRONA',
      },
      {
        typ: 'akapit',
        tekst: 'Model nie ma listy firm. Kiedy pytasz go o dobrego fachowca w mieście, składa odpowiedź z tego, co przeczytał w sieci.',
      },
      {
        typ: 'akapit',
        tekst: 'Źródeł jest sześć. To dlatego pozycjonowanie pod AI nie kończy się na Twojej stronie.',
      },
      {
        typ: 'kroki',
        wariant: 'kolo',
        kroki: [
          {
            tytul: 'Twoja własna strona',
            opis: 'Jedyne źródło, które kontrolujesz w stu procentach. Model szuka na niej gotowych zdań do zacytowania, a nie sloganów o pasji i najwyższej jakości. Co z tym robimy: przepisujemy sekcje tak, żeby odpowiadały wprost na pytania klienta, krótkimi akapitami, które da się wyciąć bez kontekstu.',
          },
          {
            tytul: 'Wizytówka Google i opinie',
            opis: 'Przy usługach lokalnych to często najmocniejsze źródło ze wszystkich. Nazwa, adres, kategoria i treść opinii mówią modelowi, kim jesteś. Co z tym robimy: sprawdzamy, czy dane w wizytówce zgadzają się ze stroną, i pokazujemy Ci rozjazdy. Rozjazd w nazwie albo adresie osłabia Cię w każdym kanale naraz.',
          },
          {
            tytul: 'Katalogi i rankingi branżowe',
            opis: 'Modele chętnie sięgają po zestawienia typu „najlepsi w mieście”, bo to gotowa lista. Jeśli nie ma Cię na takiej liście, nie ma Cię w odpowiedzi. Co z tym robimy: sprawdzamy, w których katalogach i rankingach Twojej branży Cię brakuje, i oddajemy Ci listę miejsc do uzupełnienia wraz z gotowym opisem firmy.',
          },
          {
            tytul: 'Publikacje i wzmianki na cudzych domenach',
            opis: 'To, co inni piszą o Tobie, waży więcej niż to, co piszesz o sobie. Artykuł branżowy, wywiad czy wpis partnera to dla modelu potwierdzenie z zewnątrz. Co z tym robimy: sprawdzamy, gdzie Twoja firma jest dziś wspominana i w jakim tonie, i pokazujemy, których miejsc brakuje. Samą publikację załatwiasz Ty albo Twój PR.',
          },
          {
            tytul: 'Fora i społeczności',
            opis: 'Wątki z pytaniem „kogo polecacie” to surowe rekomendacje. Modele czytają je, bo brzmią jak prawdziwa opinia, a nie reklama. Co z tym robimy: sprawdzamy, czy w takich wątkach ktoś już o Tobie pisze, i pokazujemy wynik. Nie piszemy tam za Ciebie i nie udajemy klienta.',
          },
          {
            tytul: 'Dane strukturalne',
            opis: 'Niewidoczny dla człowieka opis strony, który mówi maszynie wprost: to jest firma, to jest usługa, to jest opinia. Zmniejsza ryzyko, że model zgadnie źle. Co z tym robimy: wstawiamy dane strukturalne dla firmy, usług i pytań, i sprawdzamy je narzędziem, zamiast zakładać, że działają.',
          },
        ],
      },
      {
        typ: 'cytat',
        tekst: 'Sama strona to jedno z sześciu źródeł i zwykle nie najmocniejsze. Firmy, które w AI wygrywają, mają spójny obraz we wszystkich sześciu miejscach naraz.',
      },

      /* ── PAKIET GEO §N4 (2026-08-31): „Czy Twoja strona wpuszcza boty AI?".
         Pole „Gdzie wstawić": PO nowej sekcji N3, PRZED sekcją 3 (tabela
         porównawcza) -> zaraz za blokami N3. Pakiet zamawia LISTĘ KROKÓW,
         więc blok `kroki` w wariancie osi. Tytuły kroków to etykiety wierszy
         (kontrakt wymaga `tytul`), całe zdania kroków 1:1 z pakietu.
         Cztery nazwy botów zostają W KROKU 4, tak jak w pakiecie, bez
         wyprowadzania ich do osobnego bloku, żeby nie rozjechać numeracji.
         GPTBot opisany poprawnie jako robot OpenAI (uwaga wdrożeniowa §7).
         LINK: pakiet kończy sekcję zdaniem z linkiem do
         /uslugi/optymalizacja/dostep-botow-ai. Bloki treści renderują CZYSTY
         TEKST (components/blog/PostBody: <p>{tekst}</p>), więc klikalny link
         nie ma tu jak powstać. Zdanie zostaje jako zapowiedź podstrony bez
         adresu w treści; realny link należy dołożyć w `powiazane` rodzica
         (uwaga wdrożeniowa §3) razem z publikacją tej podstrony. */
      {
        typ: 'naglowek',
        tekst: 'Czy Twoja strona wpuszcza boty AI?',
        ikona: 'folder-kod',
        chip: 'ROBOTS.TXT',
        overline: 'PIĘĆ KROKÓW · SPRAWDZASZ SAM',
      },
      {
        typ: 'akapit',
        tekst: 'Zanim wydasz złotówkę na treści, sprawdź jedną rzecz. Zdarza się, że firma płaci za widoczność w AI, mając na stronie wpis, który tę AI wyprasza za drzwi.',
      },
      {
        typ: 'akapit',
        tekst: 'Sprawdzenie zrobisz sam, bez żadnego narzędzia.',
      },
      {
        typ: 'kroki',
        wariant: 'os',
        kroki: [
          {
            tytul: 'Otwórz plik robots.txt swojej strony',
            opis: 'Wpisz w przeglądarce adres swojej strony i dopisz na końcu /robots.txt. Czyli na przykład twojafirma.pl/robots.txt. Otworzy się zwykły plik tekstowy.',
          },
          {
            tytul: 'Sprawdź, czy plik cokolwiek blokuje',
            opis: 'Jeśli plik się nie otwiera albo jest pusty, to zwykle dobra wiadomość. Nikt niczego nie blokuje. Problem zaczyna się tam, gdzie widzisz słowo Disallow.',
          },
          {
            tytul: 'Blokada ogólna na samym początku',
            opis: 'Najpierw poszukaj wpisu User-agent: *. Jeśli pod nim stoi Disallow: /, blokada dotyczy wszystkich botów, także tych czterech niżej, nawet gdy nie ma ich w pliku z nazwy.',
          },
          {
            tytul: 'Poszukaj czterech nazw botów',
            opis: 'Teraz poszukaj czterech nazw. To boty, które karmią wiedzą największe modele. GPTBot pobiera treści dla OpenAI, czyli dla ChatGPT. ClaudeBot pobiera treści dla Claude od Anthropic. PerplexityBot pobiera treści dla wyszukiwarki Perplexity. Google-Extended decyduje, czy Twoja treść zasila modele Gemini. Uwaga, to osobna sprawa niż podsumowania AI w samej wyszukiwarce. Tam decyduje zwykły Googlebot.',
          },
          {
            tytul: 'Sprawdź, co stoi przy każdej nazwie',
            opis: 'Przy każdej z tych nazw sprawdź, co jest niżej. Wpis Disallow: / oznacza pełną blokadę tego bota. Wpis Allow albo brak nazwy przy braku blokady ogólnej z kroku 3 oznacza, że bot ma wstęp.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Co zrobić z wynikiem',
        wariant: 'top',
        akapity: [],
        punkty: [
          'Znalazłeś blokadę: masz odpowiedź, dlaczego AI Cię nie zna, i pierwszą rzecz do naprawy. To zmiana na kilka minut, jeśli masz dostęp do plików strony.',
          'Nie znalazłeś blokady: przeszkoda techniczna odpada. Wtedy problemem jest treść, której model nie ma jak zacytować.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Uwaga na jedno nieporozumienie',
        wariant: 'quiet',
        akapity: [
          'Odblokowanie botów AI to nie to samo co zgoda na trenowanie modelu na Twoich tekstach. To dwie osobne decyzje i obie omawiamy z Tobą, zanim cokolwiek zmienimy.',
          'Który bot za co odpowiada i jak ustawić to bez szkody dla pozycji w Google, rozpisujemy na osobnej podstronie o dostępie botów AI.',
        ],
      },
    ],
  },

  tabelaPorownawcza: {
    h2: 'Klasyczne SEO a pozycjonowanie pod AI (GEO)',
    naglowekBez: 'Klasyczne SEO (Google)',
    naglowekZNami: 'Pozycjonowanie pod AI / GEO',
    wiersze: [
      { cecha: 'Cel', bez: 'Pozycja w wynikach Google', zNami: 'Bycie polecanym w odpowiedzi AI' },
      { cecha: 'Co liczy się najmocniej', bez: 'Linki i słowa kluczowe', zNami: 'Konkretne liczby, struktura, autorytet z zewnątrz' },
      { cecha: 'Format treści', bez: 'Pod kliknięcie', zNami: 'Pod cytat: answer-first, tabele' },
      { cecha: 'Gdzie zdobywa się autorytet', bez: 'Backlinki', zNami: 'Rankingi, Reddit, własne dane, wzmianki' },
      { cecha: 'Pomiar', bez: 'Pozycje w Google', zNami: 'Czy padasz w 4 silnikach (co tydzień w stałej opiece)' },
      { cecha: 'Słowa kluczowe na siłę', bez: 'Czasem pomagają', zNami: 'Nie działają, bywa wręcz minus' },
    ],
  },

  kroki: {
    h2: 'Jak wygląda optymalizacja pod AI krok po kroku?',
    items: [
      /* ROZDZIAŁ ROZMOWY OD SPRINTU 2026-08-31 (ustalenie właściciela): krok
         pierwszy opisywał pomiar w czterech silnikach AI, czyli pracę płatnego
         Sprintu Diagnostycznego. Bezpłatna rozmowa bada potrzeby i zakres. */
      {
        tytul: 'Diagnoza (bezpłatna)',
        opis:
          'Rozmawiamy o Twojej sytuacji: o co pytają Cię klienci, co masz dziś na stronie i czego oczekujesz. Na koniec znasz zakres i widełki ceny. Pomiar w czterech silnikach AI robimy dopiero w Sprincie Diagnostycznym.',
      },
      {
        tytul: 'Naprawa i przepisanie',
        opis:
          'Odblokowujemy boty, przepisujemy kluczowe strony pod cytowanie, dokładamy liczby i świeżość. Ruszamy autorytet poza stroną.',
      },
      {
        tytul: 'Pomiar i rozwój',
        opis:
          'W stałej opiece co tydzień sprawdzamy, czy padasz częściej i wyżej, i poprawiamy to, co nie zadziałało. Przy jednorazowej naprawie ten krok robisz sam na zamrożonym zestawie pytań. Cytowalność rośnie z autorytetem, więc to praca w rytmie, nie jednorazowa.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje pozycjonowanie pod AI?',
    /* v23 (2026-08-20): sekcja przelozona na jezyk podstron wzorca
       (glowa sekcji z glifem, pas metryk, przelacznik, siatka).
       Fakty 1:1 z konspektu; forma na strukture. */
    tresc:
      'Pozycje o ustalonym zakresie mają twarde ceny i znajdziesz je w cenniku niżej: Sprint Diagnostyczny, landing, strona biznesowa i strona zaawansowana. Widełki dotyczą tylko ciągłej pracy nad autorytetem, bo tu cena zależy od zakresu: ile stron przepisujemy pod cytowanie, jak szeroko ruszamy autorytet poza stroną, czyli rankingi i zestawienia, i jak często mierzymy, czy padasz w odpowiedziach czterech silników AI. Dokładne widełki tej ciągłej pracy podajemy na bezpłatnej diagnozie, bo autorytet rośnie z czasem, nie jednym strzałem.',
    bloki: [
      /* ── PAKIET GEO §N5 (2026-08-31): „Ile trwa pozycjonowanie pod AI,
         tydzień po tygodniu?". Pole „Gdzie wstawić": PO istniejącej sekcji 4
         (kroki wdrożenia), PRZED sekcją 5 (Ile kosztuje).
         DLACZEGO TUTAJ, A NIE W `kroki`: kontrakt `Usluga.kroki` (lib/uslugi/types.ts)
         to krotka trzech kroków BEZ pola `bloki`, więc pierwsze miejsce w pliku,
         które fizycznie stoi po krokach, to POCZĄTEK `ramaCeny.bloki`. Stąd N5
         idzie na sam przód tej tablicy, przed pasem metryk ceny.
         W sekcji nie ma żadnej kwoty (uwaga wdrożeniowa §6: kwoty wyłącznie
         w N8, N9 i N11), są wyłącznie czasy pracy. */
      {
        typ: 'naglowek',
        tekst: 'Ile trwa pozycjonowanie pod AI, tydzień po tygodniu?',
        ikona: 'mapa',
        chip: 'HARMONOGRAM',
        overline: 'TYDZIEŃ PO TYGODNIU · TERMINY PO NASZEJ STRONIE',
      },
      {
        typ: 'akapit',
        tekst: 'Najczęstsze pytanie brzmi: na jak długo się w to wpisuję. Więc rozpisujemy to na tygodnie.',
      },
      {
        typ: 'tabela',
        naglowki: ['Kiedy', 'Co się dzieje', 'Co masz na koniec'],
        wiersze: [
          [
            'Tydzień 1',
            'Sprint Diagnostyczny, 5 dni roboczych. Zadajemy modelom Twoje pytania klienckie, sprawdzamy kto jest polecany zamiast Ciebie, przeglądamy stronę, robots.txt, dane strukturalne i wizytówkę',
            'Raport PDF z pomiarem zerowym i listą priorytetów. Wiesz, ile z zadanych pytań w ogóle wskazuje Twoją firmę',
          ],
          [
            'Tydzień 2',
            'Naprawa i przepisanie treści. Zakres zależy od tego, co masz: landing to 1 dzień pracy, strona biznesowa 2-4 dni, strona zaawansowana 5-10 dni',
            'Sekcje odpowiadające wprost na pytania klienta, uporządkowany robots.txt, dane strukturalne, opis encji firmy',
          ],
          [
            'Tydzień 3',
            'Publikacja i pierwszy pomiar po zmianach. Powtarzamy dokładnie ten sam zestaw pytań, którym mierzyliśmy stan zerowy',
            'Porównanie przed i po na tych samych pytaniach. Zwykle za wcześnie na zmianę w odpowiedziach modeli, ale widać, czy treść jest już czytelna dla botów',
          ],
          [
            'Około tygodnia 6',
            'Drugi pomiar, czyli około 3 tygodnie po publikacji. Tyle zajęło u Lenart Motors, zanim ChatGPT zaczął wskazywać firmę',
            'Pierwsze realne wskazania w odpowiedziach modeli, jeśli branża jest prosta i konkurencja o to pytanie mała',
          ],
          [
            'Potem, kiedy zechcesz',
            'Powtarzasz ten sam zamrożony zestaw pytań. Zestaw zostaje u Ciebie razem z instrukcją',
            'Seria pomiarów zamiast jednego zrzutu ekranu. Widać trend, a nie przypadek',
          ],
        ],
        wKarcie: true,
        podpis: 'Harmonogram pozycjonowania pod AI, tydzień po tygodniu',
      },
      {
        typ: 'cytat',
        tekst: 'Terminy pracy po naszej stronie są twarde, bo to nasza robota. Termin pojawienia się w odpowiedziach modeli twardy nie jest i nikt uczciwy Ci go nie zagwarantuje. Punkt odniesienia mamy jeden zmierzony: około trzy tygodnie od publikacji u Lenart Motors.',
      },

      /* ── PAKIET GEO §N6 (2026-08-31): „Co dostajesz w pakiecie pozycjonowania
         pod AI?". Pole „Gdzie wstawić": PO nowej sekcji N5, PRZED istniejącą
         sekcją 5 (Ile kosztuje) -> zaraz za blokami N5, czyli przed pasem
         metryk i przełącznikiem modeli, które są dotychczasową treścią sekcji
         ceny. Pakiet zamawia LISTĘ NUMEROWANĄ na 7 pozycji, więc blok `kroki`
         (renderuje się jako <ol>, numer w płytce). Wersaliki nagłówków pozycji
         zapisane zdaniowo, treść pozycji 1:1 z pakietu.
         ZERO KWOT: uwaga wdrożeniowa pakietu §6 mówi wprost, że warunki
         handlowe i ceny stoją wyłącznie w N8, N9 i N11, a z N6 zostały
         świadomie usunięte. */
      {
        typ: 'naglowek',
        tekst: 'Co dostajesz w pakiecie pozycjonowania pod AI?',
        ikona: 'pudelko-3d',
        chip: 'PAKIET',
        overline: 'SIEDEM RZECZY · ZOSTAJĄ U CIEBIE',
      },
      {
        typ: 'akapit',
        tekst: 'Usługi opisane czasownikami trudno porównać. Optymalizujemy, analizujemy, wdrażamy: brzmi podobnie u wszystkich. Więc mówimy, co zostaje u Ciebie.',
      },
      {
        typ: 'kroki',
        wariant: 'plytka',
        kroki: [
          {
            tytul: 'Raport PDF z pomiarem zerowym',
            opis: 'Czarno na białym: ile z zadanych pytań wskazuje Twoją firmę, a przy ilu model poleca kogoś innego. Z nazwami konkurentów, którzy pojawiają się zamiast Ciebie.',
          },
          {
            tytul: 'Lista pytań kontrolnych',
            opis: 'Gotowy zestaw pytań klienckich, ten sam, którym mierzyliśmy stan zerowy. Zestaw zostaje u Ciebie razem z instrukcją i możesz go odpalać sam, kiedy chcesz. Jeśli wolisz mieć to zrobione i opisane, zamawiasz u nas powtórny pomiar.',
          },
          {
            tytul: 'Przepisane sekcje odpowiadające wprost',
            opis: 'Teksty na Twojej stronie napisane tak, żeby model mógł wyciąć z nich gotową odpowiedź. Zamknięte akapity, konkretne liczby, zero waty słownej.',
          },
          {
            tytul: 'Dane strukturalne',
            opis: 'Opis firmy, usług i pytań w formacie, który czyta maszyna. Wstawione na stronę i sprawdzone narzędziem, nie tylko wgrane.',
          },
          {
            tytul: 'Uporządkowany plik robots.txt',
            opis: 'Z wypisanymi z nazwy botami: GPTBot, ClaudeBot, PerplexityBot, Google-Extended. Wiesz, kto ma wstęp na Twoją stronę, i decyzja należy do Ciebie.',
          },
          {
            tytul: 'Opis encji firmy',
            opis: 'Jedna kartka: kim jest Twoja firma, co robi, gdzie działa i czym się różni. Używasz jej wszędzie: na stronie, w katalogach, w wizytówce, w materiałach dla partnerów.',
          },
          {
            tytul: 'Powtarzalny pomiar po wdrożeniu',
            opis: 'Ten sam zestaw pytań zadany po publikacji, zestawiony z pomiarem zerowym. Nie opinia, że jest lepiej, tylko dwie kolumny obok siebie.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Czego w tym nie ma',
        wariant: 'quiet',
        chip: 'ZASADA',
        akapity: [
          'Nie ma gwarancji pierwszego miejsca w ChatGPT, bo nikt nie może jej dać.',
          'Nie ma też obowiązkowej opłaty miesięcznej. To jest model jednorazowej naprawy: po odbiorze strona i wszystkie pliki zostają u Ciebie, a zamrożony zestaw pytań powtarzasz sam. Opłata miesięczna pojawia się tylko wtedy, gdy sam wybierzesz stałą opiekę GEO z pomiarem co tydzień po naszej stronie.',
        ],
      },

      /* ── PAKIET GEO §N7 (2026-08-31): „Jak sprawdzić, czy ChatGPT poleca
         Twoją firmę?". Pole „Gdzie wstawić": PO nowej sekcji N6, PRZED
         istniejącą sekcją 5 (Ile kosztuje) -> zaraz za blokami N6.
         Pakiet zamawia LISTĘ KROKÓW, więc blok `kroki` w wariancie osi
         (wariant płytki poszedł do N6, żeby dwie listy jedna pod drugą nie
         wyglądały identycznie). Sekcja nie niesie żadnej liczby poza numeracją
         kroków, zgodnie z przypisem „Źródło liczb" pakietu.
         LINK: pakiet kończy sekcję adresem
         /uslugi/optymalizacja/monitoring-cytowan-w-ai. Bloki treści renderują
         CZYSTY TEKST (components/blog/PostBody: <p>{tekst}</p>), więc klikalny
         link nie ma tu jak powstać. Zdanie stoi jako zapowiedź podstrony bez
         adresu, a realny link trzeba dołożyć w `powiazane` razem z publikacją
         tej podstrony (uwagi wdrożeniowe pakietu §2 i §3). */
      {
        typ: 'naglowek',
        tekst: 'Jak sprawdzić, czy ChatGPT poleca Twoją firmę?',
        ikona: 'dokument-skan',
        chip: 'POMIAR',
        overline: 'PIĘĆ KROKÓW · POWTÓRZYSZ SAM',
      },
      {
        typ: 'akapit',
        tekst: 'Większość ofert na rynku pokazuje efekt w procentach i nie mówi, skąd te procenty są. To wygodne, bo trudno sprawdzić. My pokazujemy metodę, żebyś mógł ją powtórzyć sam.',
      },
      {
        typ: 'kroki',
        wariant: 'os',
        kroki: [
          {
            tytul: 'Pytania zamiast fraz',
            opis: 'W Google mierzy się frazy. W modelu mierzy się pytania, bo klient nie wpisuje „blacharz premium Wrocław”, tylko pyta, komu oddać samochód po stłuczce. Budujemy listę takich pytań razem z Tobą. Mają brzmieć jak zdanie z rozmowy telefonicznej, nie jak hasło z narzędzia SEO.',
          },
          {
            tytul: 'Czyste okno',
            opis: 'Pytamy w nowym oknie, bez historii rozmów i bez zalogowanego konta. Jeśli mierzysz z własnego konta, model podpowiada to, co już o Tobie wie, i wynik jest nic niewart.',
          },
          {
            tytul: 'Trzy rzeczy do zanotowania',
            opis: 'Czy Twoja firma w ogóle pada w odpowiedzi. To pytanie zero jedynkowe i najważniejsze ze wszystkich. Na którym miejscu pada, jeśli model wymienia kilka firm. Pierwsza pozycja waży inaczej niż czwarta. Jakie źródło model zacytował. To mówi wprost, którą stronę trzeba poprawić.',
          },
          {
            tytul: 'Ten sam zestaw za każdym razem',
            opis: 'Powtarzamy dokładnie te same pytania, w tej samej kolejności, w czystym oknie. Zmiana jednego słowa psuje porównanie, więc zestaw jest zamrożony.',
          },
          {
            tytul: 'Różnica, nie zrzut ekranu',
            opis: 'Pokazujemy dwie kolumny: stan zerowy i stan po wdrożeniu, na tych samych pytaniach. To jest cały pomiar. Reszta to interpretacja.',
          },
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Uczciwe zastrzeżenie',
        wariant: 'edge',
        chip: 'ZASADA',
        akapity: [
          'Modele zmieniają odpowiedzi. Ta sama firma może zostać wymieniona w poniedziałek i pominięta w środę, bez żadnej zmiany po Twojej stronie.',
          'Dlatego liczy się seria pomiarów. Kto pokazuje Ci jeden zrzut jako dowód skuteczności, pokazuje Ci pogodę z jednego dnia.',
          'Jak wygląda powtórny pomiar prowadzony przez nas, opisujemy na osobnej podstronie o monitoringu cytowań w AI.',
        ],
      },

      {
        typ: 'pasMetryk',
        metryki: [
          /* ROZDZIAŁ ROZMOWY OD SPRINTU 2026-08-31 (ustalenie właściciela):
             oba kafle obiecywały za 0 zł dokładnie tę pracę, która jest
             produktem płatnym (Sprint Diagnostyczny 1490 zł netto, tabela
             cennika niżej): pomiar w czterech silnikach AI i „konkretną listę
             rzeczy do zrobienia". Na bezpłatnej rozmowie badamy potrzeby
             i ustalamy zakres, tylko to. Rozplanowanie procesów, pomiar
             i konkretna oferta to drugi krok, czyli Sprint. */
          {
            wartosc: '0 zł',
            opis: 'bezpłatna rozmowa: poznajemy Twoją sytuację i ustalamy zakres, zanim cokolwiek zamówisz',
            zrodlo: 'diagnoza',
            ton: 'green',
          },
          {
            wartosc: 'ok. 30 minut',
            opis: 'tyle trwa rozmowa; kończy się ustalonym zakresem i widełkami ceny, bez zobowiązania',
            zrodlo: 'diagnoza',
            ton: 'cyan',
          },
          {
            wartosc: '4 silniki AI',
            opis: 'tyle silników sprawdzamy w każdym pomiarze; w stałej opiece robimy go co tydzień',
            zrodlo: 'wiersz Pomiar w tabeli porównawczej',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'naglowek',
        tekst: 'Od czego zależy cena pozycjonowania pod AI?',
        ikona: 'kalendarz-check',
        chip: 'CENNIK',
        overline: 'DWA MODELE PRACY · WIDEŁKI TYLKO NA PRACĘ CIĄGŁĄ',
      },
      {
        typ: 'przelacznik',
        grupa: 'optymalizacja-modele',
        opcje: [
          {
            numer: 'MODEL 1',
            tytul: 'Audyt widoczności AI i naprawa',
            podtytul: 'gdy strona wymaga naprawy na start',
            naglowek: 'Bierzemy to, co masz, i naprawiamy to, co dziś blokuje cytowanie.',
            akapity: [
              'Ten model pasuje wtedy, gdy strona wymaga naprawy na start. Nie ma sensu ruszać autorytetu poza stroną, dopóki na samej stronie nie ma czego zacytować.',
              'Płacisz raz, bez opłaty miesięcznej. Zamrożony zestaw pytań zostaje u Ciebie i to Ty powtarzasz pomiar, kiedy chcesz. Pomiar co tydzień po naszej stronie jest w modelu drugim.',
            ],
            punkty: [
              'odblokowanie botów AI',
              'przepisanie kluczowych stron pod cytowanie',
              'konkretne liczby i struktura',
            ],
          },
          {
            numer: 'MODEL 2',
            tytul: 'Stała opieka GEO',
            podtytul: 'gdy chcesz rosnąć w cytowaniach',
            naglowek: 'Praca w rytmie miesięcznym, bo autorytet rośnie z czasem.',
            akapity: [
              'Ruszamy źródła spoza Twojej strony i sprawdzamy, czy to realnie przekłada się na odpowiedzi silników AI. Jeśli nie, zmieniamy podejście, zamiast czekać kolejny kwartał.',
              'To jedyny model na tej stronie z opłatą miesięczną, bo praca trwa dalej. Pomiar co tydzień jest w niej zawarty i robimy go my. Z tego modelu można wyjść.',
            ],
            punkty: [
              'pomiar co tydzień, ręcznie, w czterech silnikach AI',
              'widzisz trend czarno na białym, a nie obietnice',
              'poprawiamy to, co nie zadziałało',
            ],
          },
        ],
      },
      {
        typ: 'tabela',
        naglowki: [
          'Model pracy',
          'Co obejmuje',
          'Kiedy pasuje',
        ],
        wiersze: [
          [
            'Audyt widoczności AI i naprawa',
            'Odblokowanie botów, przepisanie kluczowych stron pod cytowanie, konkretne liczby i struktura. Płatność jednorazowa, bez opłaty miesięcznej, pomiar powtarzasz sam',
            'Gdy strona wymaga naprawy na start',
          ],
          [
            'Stała opieka GEO',
            'Praca w rytmie miesięcznym, autorytet poza stroną, pomiar co tydzień w czterech silnikach AI po naszej stronie, w opłacie miesięcznej',
            'Gdy chcesz rosnąć w cytowaniach',
          ],
        ],
        wKarcie: true,
        podpis: 'Twarde ceny pozycji o ustalonym zakresie stoją w cenniku niżej; widełki na ciągłą pracę nad autorytetem poznasz na bezpłatnej diagnozie',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co dostaję na bezpłatnej diagnozie?',
        wariant: 'quiet',
        chip: 'ZASADA',
        /* ROZDZIAŁ ROZMOWY OD SPRINTU 2026-08-31: sekcja obiecywała za 0 zł
           pomiar w czterech silnikach i „konkretną listę rzeczy do zrobienia",
           czyli zawartość płatnego Sprintu Diagnostycznego. Teraz mówi o tym,
           co realnie dzieje się na rozmowie, i wprost odsyła pomiar do Sprintu. */
        akapity: [
          'Pytamy o Twoją sytuację: czym się zajmujesz, o co pytają Cię klienci, co masz dziś na stronie i czego oczekujesz. Trwa to około 30 minut i kończy się ustalonym zakresem oraz widełkami ceny.',
          'Pomiaru w czterech silnikach AI ani raportu na tej rozmowie nie robimy. To jest praca Sprintu Diagnostycznego z cennika niżej, w którym rozplanowujemy prace i przedstawiamy konkretną ofertę.',
          'Bez ukrytych kosztów. I uczciwie, zanim cokolwiek zamówisz: cytowalność to praca na kwartały, nie na dni. Dlatego w stałej opiece mierzymy co tydzień, żebyś widział trend, a nie czekał na obietnice.',
        ],
      },

      /* ── PAKIET GEO §N8 (2026-08-31): „Ile kosztuje pozycjonowanie pod AI?".
         Pole „Gdzie wstawić": BEZPOŚREDNIO POD istniejącą sekcją 5 (Ile
         kosztuje), PRZED sekcją 6 (powiązane) -> koniec `ramaCeny.bloki`,
         bo cała ta tablica renderuje się pod kartą ceny, a `powiazane` to
         osobny komponent na dole strony.
         TO JEDYNE MIEJSCE NA TEJ STRONIE Z KWOTAMI (razem z N9 i N10 niżej),
         zgodnie z uwagą wdrożeniową pakietu §6.
         NAGŁÓWEK: pakiet nazywa sekcję tak samo jak istniejące `ramaCeny.h2`,
         więc blok dostaje nagłówek nazywający jego zawartość (cennik, cztery
         pozycje), żeby na jednej stronie nie stanęły dwa identyczne H2.
         ZDANIA KONTRAKTOWE z uwagi §8 przeniesione bez „ulepszania":
         „odliczane od wdrożenia", „dwie rundy poprawek" w cenie wdrożenia,
         „od 5900 zł" przy stronie zaawansowanej. Do każdej NASZEJ kwoty
         dopisane „netto" (wstęp pakietu: „Wszystkie ceny są netto"); ceny
         konkurencji w bloku „Dla porównania z rynkiem" i kwota „0 zł" stoją
         1:1 z pakietem, bez dopisywanego netto (kontrola 2026-08-31). */
      {
        typ: 'naglowek',
        tekst: 'Cennik pozycjonowania pod AI: cztery pozycje z cenami',
        ikona: 'notes-pioro',
        chip: 'KWOTY',
        overline: 'WSZYSTKIE CENY NETTO',
      },
      {
        typ: 'cytat',
        tekst: 'Podajemy kwoty, bo bez nich nie da się nas z nikim porównać. Wszystkie ceny są netto.',
      },
      {
        typ: 'tabela',
        naglowki: ['Co kupujesz', 'Ile kosztuje', 'Ile trwa', 'Co dostajesz'],
        wiersze: [
          [
            'Sprint Diagnostyczny, czyli audyt AI',
            '1490 zł netto, odliczane od wdrożenia',
            '5 dni roboczych',
            'Raport PDF z pomiarem zerowym, lista priorytetów, plan wdrożenia, lista pytań kontrolnych',
          ],
          [
            'Landing pisany pod cytowanie',
            '1590 zł netto',
            '1 dzień roboczy',
            'Jedna strona napisana pod cytowanie, dane strukturalne, uporządkowany robots.txt',
          ],
          [
            'Strona biznesowa pod cytowanie',
            '2900 zł netto',
            '2-4 dni robocze',
            'Kilka podstron, encja firmy, sekcje odpowiadające wprost na pytania klienta, SEO i przygotowanie pod AI',
          ],
          [
            'Strona zaawansowana',
            'od 5900 zł netto',
            '5-10 dni roboczych',
            'Rozbudowana struktura podstron pod pytania klientów, sklep lub wpięte narzędzia, pełne wdrożenie techniczne',
          ],
        ],
        wKarcie: true,
        podpis: 'Cennik pozycjonowania pod AI: cena, czas realizacji i zakres każdej pozycji',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co jest w cenie wdrożenia',
        wariant: 'top',
        chip: 'WARUNKI',
        akapity: [
          /* 2026-08-31 (ustalenie właściciela): drugie zdanie dopisane, bo samo
             „odliczamy od wdrożenia" nie mówiło jeszcze, co z tego wynika dla
             klienta. Jedyne miejsce na stronie z tym zdaniem, żeby go nie
             dublować przy pozostałych wystąpieniach kwoty 1490 zł netto
             (tabela cennika N8 i tabela trzech dróg N9). */
          'Kwotę za Sprint Diagnostyczny odliczamy w całości od ceny wdrożenia. Płacisz za nią raz, nie dwa razy. Jeśli wchodzisz w projekt, audyt jest dla Ciebie w praktyce darmowy; płaci za niego tylko firma, która chce sam audyt i nie idzie z nami dalej.',
          'W cenie wdrożenia masz dwie rundy poprawek: tydzień Twoich testów, poprawki, drugi tydzień testów, poprawki, odbiór. Funkcje, o których nie było mowy na pierwszej rozmowie, wyceniamy osobno.',
          'Po odbiorze nie ma abonamentu. Strona i wszystkie pliki zostają u Ciebie.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Dla porównania z rynkiem',
        wariant: 'quiet',
        chip: 'RYNEK',
        akapity: [
          'Publiczny cennik rynkowy z projektowaniestroncennik.pl, sprawdzony 31.08.2026: landing 1900 zł, strona firmowa 2500 zł, strona rozbudowana 4000 zł netto.',
          'Nasz landing jest o 310 zł tańszy. Strona biznesowa kosztuje u nas 400 zł więcej, bo w tej cenie dowozimy SEO i przygotowanie treści pod cytowanie w AI. Zaawansowana startuje wyżej, bo to 5-10 dni pracy.',
        ],
      },
      {
        typ: 'sekcja',
        naglowek: 'Jedna rzecz, której konkurencja nie ma',
        wariant: 'edge',
        chip: 'WYBÓR',
        akapity: [
          'Przy usługach, w których trzymamy infrastrukturę u siebie, czyli przy chatbotach, voicebotach i automatyzacjach, zawsze masz wybór.',
          'Możesz zostać u nas na abonamencie utrzymaniowym: chatboty i automatyzacje 99-599 zł netto miesięcznie, voiceboty 299-1500 zł netto miesięcznie.',
          'Albo przekazujemy infrastrukturę do Ciebie i płacisz 0 zł miesięcznie, a późniejsze poprawki rozliczamy po 350 zł netto za godzinę. Z naszego abonamentu można wyjść.',
        ],
      },

      /* ── PAKIET GEO §N9 (2026-08-31): „Nic nie robić, abonament agencji, czy
         jednorazowa naprawa?". Pole „Gdzie wstawić": PO nowej sekcji N8, PRZED
         sekcją 6 (powiązane) -> zaraz za blokami N8.
         KOLUMNA ABONAMENTU AGENCJI CELOWO BEZ KWOTY: pakiet („Źródło liczb")
         mówi wprost, że nie mamy zweryfikowanych u źródła cen konkurencji GEO,
         więc wiersz każe klientowi policzyć na OFERCIE, KTÓRĄ DOSTAŁ. Żadnych
         widełek rynkowych nie dopisano. Wiersz o etacie specjalisty SEO/GEO
         nie istnieje w pakiecie i nie został wymyślony. */
      {
        typ: 'naglowek',
        tekst: 'Nic nie robić, abonament agencji, czy jednorazowa naprawa?',
        ikona: 'osoba-check',
        chip: 'WYBÓR',
        overline: 'TRZY DROGI · KAŻDA MA CENĘ',
      },
      {
        typ: 'cytat',
        tekst: 'Masz trzy wyjścia i każde ma cenę. Nawet to pierwsze, choć nie widać go na fakturze.',
      },
      {
        typ: 'tabela',
        naglowki: ['Droga', 'Co płacisz', 'Co dostajesz', 'Kiedy to ma sens'],
        wiersze: [
          [
            'Nic nie robić',
            '0 zł na fakturze. Koszt widać dopiero w zapytaniach, które trafiają do kogoś innego',
            'Nic się nie zmienia. Konkurent, który zrobił to wcześniej, zbiera Twoje zapytania',
            'Gdy nie chcesz nowych klientów z sieci albo cała sprzedaż idzie z poleceń',
          ],
          [
            'Abonament agencji GEO',
            'Weź stawkę miesięczną z oferty, którą dostałeś, i pomnóż ją przez 12. Widełki na rynku są szerokie, więc licz na własnej ofercie, nie na naszych szacunkach',
            'Stała obsługa, raporty, ciągła praca zewnętrznego zespołu',
            'Gdy masz dużą konkurencję, duży rynek i chcesz walczyć o widoczność bez przerwy',
          ],
          [
            'Jednorazowa naprawa u nas',
            'Sprint Diagnostyczny 1490 zł netto, odliczany od wdrożenia, plus strona: landing 1590 zł netto, biznesowa 2900 zł netto albo zaawansowana od 5900 zł netto. Bez abonamentu, bo strona i wszystkie pliki przechodzą na Ciebie. Opłata miesięczna jest tylko w stałej opiece GEO, jeśli sam ją wybierzesz',
            'Naprawiona strona, dane strukturalne, encja firmy, pomiar przed i po. Wszystko zostaje u Ciebie',
            'Gdy chcesz mieć problem rozwiązany, a nie wynajmować go w abonamencie',
          ],
        ],
        wKarcie: true,
        podpis: 'Trzy drogi przy pozycjonowaniu pod AI: co płacisz, co dostajesz i kiedy to ma sens',
      },
      {
        typ: 'cytat',
        tekst: 'Różnica między drugą a trzecią drogą nie polega na jakości, tylko na tym, kto trzyma efekt. W abonamencie płacisz za to, żeby ktoś dalej pracował. U nas płacisz za to, żeby praca była zrobiona i została u Ciebie.',
      },

      /* ── PAKIET GEO §N10 (2026-08-31): „Ile kosztuje Cię każdy miesiąc,
         w którym AI poleca kogoś innego?". Pole „Gdzie wstawić": PO nowej
         sekcji N9, PRZED sekcją 6 (powiązane) -> koniec `ramaCeny.bloki`.

         DLACZEGO TABELA, A NIE KALKULATOR: pakiet zamawia kalkulator z czterema
         polami, a kontrakt bloków (lib/blog/types.ts) nie ma typu z polami
         formularza i te strony renderują się w całości serwerowo. Sekcja stoi
         więc jako TABELA POLA -> CO WPISUJESZ -> SKĄD WZIĄĆ LICZBĘ, czyli sam
         wzór do podstawienia własnymi liczbami. Zgodne z decyzją właściciela
         z 31.08.2026 i uwagą wdrożeniową §5: ZERO wartości domyślnych, zero
         przykładowych stawek, zero przykładowych kwot oszczędności.
         DWA ZDANIA ZMIENIONE ŚWIADOMIE (obietnica, której render nie dowozi):
         pakietowe „wynik liczy się sam" w akapicie wstępnym i „Liczy się sam:"
         w wierszu Wynik. Statyczna tabela niczego nie przelicza, więc oba
         miejsca mówią o wzorze do podstawienia. Reszta treści 1:1.
         JEDYNA LICZBA SEKCJI to zmierzone ok. trzy tygodnie u Lenart Motors,
         ta sama, która stoi już w kapsule, w N1, N2 i w harmonogramie N5. */
      {
        typ: 'naglowek',
        tekst: 'Ile kosztuje Cię każdy miesiąc, w którym AI poleca kogoś innego?',
        ikona: 'kalkulator',
        chip: 'RACHUNEK',
        overline: 'CZTERY POLA · TWOJE WŁASNE LICZBY',
      },
      {
        typ: 'cytat',
        tekst: '„Poczekam, aż to się ustabilizuje” to zrozumiała reakcja. Tylko że czekanie też ma cenę, po prostu nie przychodzi na nią faktura.',
      },
      {
        typ: 'akapit',
        tekst: 'Nie podamy Ci tu procentów wzrostu rynku, bo ich nie zmierzyliśmy. Policz to na własnych liczbach. Cztery pola i wzór, który podstawiasz swoimi danymi.',
      },
      {
        typ: 'tabela',
        naglowki: ['Pole', 'Co wpisujesz', 'Skąd wziąć liczbę'],
        wiersze: [
          [
            'Zapytania miesięcznie',
            'Ile zapytań o Twoją usługę dostajesz w miesiącu',
            'Zacznij od liczby zapytań ze wszystkich kanałów. To ostrożne przybliżenie',
          ],
          [
            'Udział przegranych',
            'Ile z nich mogłoby trafić do Ciebie z polecenia AI, a trafia do kogoś innego',
            'Jeśli nie ma Cię w odpowiedziach na pytania kontrolne, wpisz swoją ostrożną ocenę',
          ],
          [
            'Wartość klienta',
            'Ile jest wart u Ciebie jeden pozyskany klient',
            'Średnia wartość pierwszego zlecenia, nie kontrakt życia',
          ],
          [
            'Wynik',
            'Wzór: zapytania razy udział przegranych razy wartość klienta razy 12 miesięcy',
            'To Twój koszt czekania w skali roku',
          ],
        ],
        wKarcie: true,
        podpis: 'Rachunek kosztu czekania: cztery pola, które podstawiasz własnymi liczbami',
      },
      {
        typ: 'sekcja',
        naglowek: 'Drugi bok tego rachunku',
        wariant: 'quiet',
        chip: 'CZAS',
        akapity: [
          'Drugi bok tego rachunku to czas potrzebny na odwrócenie sytuacji. Mamy tu jedną zmierzoną liczbę: około trzy tygodnie od publikacji strony Lenart Motors do momentu, w którym ChatGPT zaczął wskazywać firmę.',
          'To był prosty przypadek: jasna specjalizacja, mała konkurencja o to jedno pytanie. W trudniejszej branży licz raczej w miesiącach niż w tygodniach.',
          'Czekanie ma jeszcze jeden skutek. Modele budują obraz Twojej branży z tego, co już przeczytały. Im dłużej nie ma tam Twoich treści, tym mocniej utrwala się wersja, w której Twoja firma nie istnieje.',
        ],
      },

      /* ── PAKIET GEO §N11 (2026-08-31): „Kiedy nie warto brać od nas
         pozycjonowania pod AI?". Pole „Gdzie wstawić": PO nowej sekcji N10,
         PRZED sekcją 6 (powiązane) -> koniec `ramaCeny.bloki`, zaraz za N10.
         Sekcja 6 renderuje się jako `PodstronyPowiazane` zaraz po `RamaCeny`
         (app/uslugi/[usluga]/page.tsx), więc koniec tej tablicy to dokładnie
         miejsce z pakietu.
         DLACZEGO `kroki`, A NIE KARTY: pakiet zamawia listę pięciu pozycji
         i sam je numeruje 1-5, a `kroki` renderuje prawdziwe <ol><li>, więc
         kolejność czyta też bot. Wersaliki nagłówków pozycji zapisane
         zdaniowo, treść 1:1.
         KWOTY: landing 1590 zł netto i 1 dzień roboczy, strona biznesowa
         2900 zł netto i 2-4 dni to decyzja właściciela z 31.08.2026 (te same
         liczby stoją już w tabeli cennika N8 wyżej). „5 dni roboczych"
         Sprintu Diagnostycznego i „ok. trzy tygodnie" u Lenart Motors:
         konspekt, obie liczby już na tej stronie. */
      {
        typ: 'naglowek',
        tekst: 'Kiedy nie warto brać od nas pozycjonowania pod AI?',
        ikona: 'tarcza-serce',
        chip: 'UCZCIWIE',
        overline: 'PIĘĆ SYTUACJI · MÓWIMY NIE TERAZ',
      },
      {
        typ: 'akapit',
        tekst:
          'Wolimy stracić zlecenie niż wziąć pieniądze za coś, co u Ciebie nie zadziała. Jest pięć sytuacji, w których mówimy wprost: nie teraz.',
      },
      {
        typ: 'kroki',
        wariant: 'plytka',
        kroki: [
          {
            tytul: 'Nie masz strony albo nie masz do niej dostępu',
            opis: 'Jeśli strona powstała w kreatorze, w którym nie da się ruszyć kodu ani pliku robots.txt, nie mamy czym pracować. Co wtedy: najpierw strona, potem pozycjonowanie pod AI. U nas landing to 1590 zł netto i jeden dzień roboczy, strona biznesowa 2900 zł netto i 2-4 dni. Możesz też zrobić ją gdzie indziej i wrócić.',
          },
          {
            tytul: 'Sprzedajesz wyłącznie z poleceń i tak chcesz zostać',
            opis: 'Są firmy, które mają komplet zleceń od stałych klientów i nie chcą nowych z sieci. Widoczność w AI nie da im nic poza rachunkiem. Co wtedy: nic. Naprawdę. Wróć do tematu, gdy zaczniesz szukać nowych klientów.',
          },
          {
            tytul: 'Potrzebujesz efektu w tydzień',
            opis: 'Raport z pomiarem zerowym masz po pięciu dniach roboczych. Ale zmiana w odpowiedziach modeli to kwestia tygodni, nie dni. U Lenart Motors było to około trzech tygodni od publikacji i to był prosty przypadek. Co wtedy: jeśli musisz mieć zapytania na już, kampania płatna zrobi to szybciej. Pozycjonowanie pod AI buduje pozycję, nie gasi pożaru.',
          },
          {
            tytul: 'Chcesz gwarancji pierwszego miejsca w ChatGPT',
            opis: 'Nikt nie może Ci tego zagwarantować, my też nie. Modele zmieniają odpowiedzi, a firma wymieniona w poniedziałek bywa pominięta w środę. Co wtedy: jeśli ktoś obiecuje Ci taką gwarancję na piśmie, przeczytaj dokładnie, co gwarantuje. Zwykle okazuje się, że wykonanie prac, a nie wynik.',
          },
          {
            tytul: 'Jesteś bardzo lokalną usługą bez wizytówki i opinii',
            opis: 'Przy fachowcu pracującym w promieniu kilkunastu kilometrów najszybszą drogą jest wizytówka Google i opinie klientów. Modele i tak sięgają po nie w pierwszej kolejności. Co wtedy: najpierw wizytówka i opinie, to tańsze i szybsze. Pozycjonowanie pod AI ma sens, gdy ten fundament stoi.',
          },
        ],
      },
      {
        typ: 'cytat',
        tekst:
          'Jeśli rozpoznajesz siebie w którymś z tych pięciu punktów, napisz i tak. Powiemy, co zrobić zamiast, nawet jeśli to nie będzie usługa u nas.',
      },

      /* ── PAKIET GEO §N12 (2026-08-31): „To chwilowa moda", i pięć innych
         zdań, które słyszymy. Pole „Gdzie wstawić": PO istniejącej sekcji 7
         (FAQ), PRZED sekcją 8 (CTA).
         ODSTĘPSTWO OD POLA „GDZIE WSTAWIĆ", ŚWIADOME I JEDYNE MOŻLIWE:
         między sekcją 7 a 8 kontrakt `Usluga` (lib/uslugi/types.ts) nie ma
         ŻADNEJ tablicy `bloki`. Bloki mają wyłącznie `problem`, `rozwiazanie`
         i `ramaCeny`, a `faq` to płaska lista par pytanie/odpowiedź, więc
         wciśnięcie tu sześciu zdań twierdzących klienta zmieniłoby treść
         FAQPage JSON-LD (pytania stałyby się zdaniami) i skleiło N12 z FAQ,
         czego pakiet zabrania wprost („nie kanibalizuje FAQ").
         Dlatego N12 i N13 idą na SAM KONIEC `ramaCeny.bloki`, czyli w ostatnie
         miejsce na stronie, w którym kontrakt w ogóle przyjmuje bloki, i w
         kolejności z pakietu: N11 -> N12 -> N13. Do przesunięcia ich za FAQ
         trzeba by dołożyć pole do kontraktu i do szablonu, a to jest poza
         zakresem tej partii.
         LICZBY: sekcja bez kwot. Lenart Motors jako przykład małej branży
         i rozdzielenie Google-Extended (modele Gemini) od pozycji w wynikach
         wyszukiwania: pakiet §N12 „Źródło liczb". */
      {
        typ: 'naglowek',
        tekst: '„To chwilowa moda”, i pięć innych zdań, które słyszymy',
        ikona: 'chat-dymek',
        chip: 'OBIEKCJE',
        overline: 'SZEŚĆ ZDAŃ Z ROZMÓW',
      },
      {
        typ: 'cytat',
        tekst:
          'Sześć zdań, które padają na rozmowach najczęściej. Odpowiadamy tak samo jak przy stole, bez owijania.',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: '„To chwilowa moda, za rok nikt o tym nie będzie mówił.”',
            akapity: [
              'Moda jest na nazwę, nie na zjawisko. Klienci już dziś pytają model o polecenie zamiast przeglądać dziesięć linków. Strona, którą da się zacytować, przyda Ci się tak czy inaczej.',
            ],
          },
          {
            naglowek: '„Mam agencję SEO, to załatwia sprawę.”',
            akapity: [
              'Częściowo tak, bo dobra treść pracuje w obu kanałach. Ale SEO optymalizuje pod kliknięcie w link, a model nie daje kliknięcia, tylko odpowiedź. Zapytaj swoją agencję, jak mierzy, czy jesteś wymieniany w ChatGPT.',
            ],
          },
          {
            naglowek: '„Tego się nie da zmierzyć.”',
            akapity: [
              'Da się, tylko trzeba mierzyć pytania, nie frazy. Zadajemy stały zestaw pytań w oknie bez historii i notujemy trzy rzeczy: czy padasz, na którym miejscu i jakie źródło zostało zacytowane.',
              "Dodamy uczciwie: część rynkowych „wskaźników GEO” i „score'ów widoczności” to ładnie opakowane zgadywanie. Ładna liczba bez podanej metody nie jest pomiarem.",
            ],
          },
          {
            naglowek: '„Moja branża jest za mała, nikt o nią nie pyta AI.”',
            akapity: [
              'Mała branża to najlepszy moment, a nie argument przeciw. Im mniej firm walczy o to jedno pytanie, tym łatwiej być tą jedną wymienioną. Lenart Motors to warsztat blacharsko lakierniczy, nie globalna marka.',
            ],
          },
          {
            naglowek: '„Boję się, że wpuszczenie botów AI zaszkodzi mi w Google.”',
            akapity: [
              'To dwie różne sprawy i ustawia się je osobno. Google-Extended decyduje o treściach dla modeli Gemini, a nie o Twoich pozycjach w wynikach wyszukiwania. Każdą taką decyzję pokazujemy Ci przed wdrożeniem.',
            ],
          },
          {
            naglowek: '„Poczekam, aż rynek się ustabilizuje.”',
            akapity: [
              'Modele budują obraz Twojej branży z tego, co już przeczytały. Każdy miesiąc bez Twoich treści to miesiąc utrwalania wersji, w której Twojej firmy nie ma. Koszt czekania policzysz sobie wyżej, na własnych liczbach.',
            ],
          },
        ],
      },

      /* ── PAKIET GEO §N13 (2026-08-31): „GEO, LLM, AI Overviews, encja: co to
         znaczy po ludzku?". Pole „Gdzie wstawić": PO nowej sekcji N12, PRZED
         sekcją 8 (CTA) -> zaraz za blokami N12, na końcu `ramaCeny.bloki`
         (powód przesunięcia opisany przy N12).
         Każde hasło stoi jako osobna karta, czyli zamknięty akapit, który
         model może wyciąć w całości. To jest cel tej sekcji z pakietu.
         WERSALIKI Z PAKIETU zapisane zdaniowo, skróty zostają skrótami
         (GEO, AEO, LLM, llms.txt). Sekcja bez liczb. */
      {
        typ: 'naglowek',
        tekst: 'GEO, LLM, AI Overviews, encja: co to znaczy po ludzku?',
        ikona: 'ksiazka',
        chip: 'SŁOWNIK',
        overline: 'OSIEM POJĘĆ · JĘZYKIEM KLIENTA',
      },
      {
        typ: 'akapit',
        tekst:
          'Ta branża lubi skróty. Osiem pojęć wytłumaczonych tak, żeby dało się je powtórzyć wspólnikowi.',
      },
      {
        typ: 'siatka',
        kolumny: 2,
        karty: [
          {
            naglowek: 'GEO',
            akapity: [
              'Optymalizacja pod silniki generatywne, czyli praca nad tym, żeby model AI wymieniał Twoją firmę w odpowiedzi. W SEO walczysz o miejsce na liście linków. W GEO walczysz o zdanie w gotowej odpowiedzi.',
            ],
          },
          {
            naglowek: 'AEO',
            akapity: [
              'Optymalizacja pod odpowiedź. Chodzi o to, żeby na stronie stało gotowe, zamknięte zdanie odpowiadające na pytanie klienta. Model może je wyciąć i użyć bez przerabiania. W praktyce AEO i GEO robi się jednym ruchem.',
            ],
          },
          {
            naglowek: 'AI Overviews',
            akapity: [
              'Odpowiedź wygenerowana przez AI, którą Google pokazuje nad zwykłymi wynikami. Zabiera uwagę pierwszym linkom, więc bycie w niej zaczyna ważyć więcej niż sama pozycja w wynikach.',
            ],
          },
          {
            naglowek: 'LLM',
            akapity: [
              'Duży model językowy, czyli silnik napędzający ChatGPT, Claude czy Gemini. Nie ma bazy firm ani rankingu. Składa odpowiedź z tego, co przeczytał, więc jeśli nie przeczytał o Tobie, nie wymieni Cię.',
            ],
          },
          {
            naglowek: 'Encja marki',
            akapity: [
              'To, co model rozumie pod nazwą Twojej firmy: czym się zajmuje, gdzie działa, z czym się kojarzy. Kiedy nazwa, adres i opis rozjeżdżają się między stroną a wizytówką, encja się rozmywa.',
            ],
          },
          {
            naglowek: 'Cytowanie w odpowiedzi AI',
            akapity: [
              'Moment, w którym model podaje Twoją nazwę albo link jako źródło. To jest realna waluta w tej grze. Nie liczba wyświetleń, tylko to, czy padasz w odpowiedzi i na którym miejscu.',
            ],
          },
          {
            naglowek: 'Halucynacja o firmie',
            akapity: [
              'Sytuacja, w której model podaje o Tobie nieprawdę: zły adres, nieaktualną ofertę, usługę, której nie świadczysz. Zwykle nie ze złej woli, tylko z braku wyraźnego źródła. Model zgaduje, bo nie ma czego zacytować.',
            ],
          },
          {
            naglowek: 'llms.txt',
            akapity: [
              'Proponowany plik na stronie, który miałby mówić modelom, gdzie szukać najważniejszych treści. Mówimy uczciwie: to pomysł na standard, a nie potwierdzona metoda. Nie znamy dowodu, że sam z siebie zwiększa widoczność, więc nie sprzedajemy go jako skrótu.',
            ],
          },
        ],
      },
    ],
  },

  faq: [
    {
      pytanie: 'Czym jest GEO i pozycjonowanie pod AI?',
      odpowiedz:
        'GEO to ustawianie strony tak, żeby silniki AI (ChatGPT, Claude, Gemini, Perplexity) polecały ją w odpowiedziach. To inna gra niż klasyczne SEO: zamiast walki o pozycję w Google liczy się, czy Twoja treść jest dla AI czytelna, konkretna i poparta autorytetem spoza Twojej strony. Mierzymy to, sprawdzając, czy realnie padasz w odpowiedziach.',
    },
    {
      pytanie: 'Czym to się różni od zwykłego SEO?',
      odpowiedz:
        'Zwykłe SEO walczy o miejsce w wynikach Google, głównie linkami i słowami kluczowymi. Pozycjonowanie pod AI walczy o miejsce w odpowiedzi, którą AI buduje z konkretnych liczb, dobrej struktury i autorytetu z zewnątrz. Słowa kluczowe na siłę tu nie działają, a na niektórych silnikach wręcz szkodzą. Robimy oba naraz, bo treść może pracować na jedno i drugie.',
    },
    {
      pytanie: 'Jak sprawdzicie, czy mnie cytuje ChatGPT?',
      odpowiedz:
        'Ręcznie i regularnie. Co tydzień wpisujemy Twoje kluczowe pytania do czterech silników AI i zapisujemy, czy padasz, na której pozycji i z jakim cytatem, a kto jest wymieniony zamiast Ciebie. To daje Ci punkt wyjścia i trend, czarno na białym, a nie obietnice.',
    },
    {
      pytanie: 'Czy muszę budować stronę od nowa?',
      odpowiedz:
        'Nie zawsze. Często wystarczy naprawić to, co masz: odblokować boty, przepisać kluczowe strony pod cytowanie, dołożyć liczby i autorytet z zewnątrz. Jeśli strona stoi na technologii, której AI w ogóle nie czyta, powiemy to wprost na diagnozie i wtedy rozmawiamy o przebudowie.',
    },
    {
      pytanie: 'Jak szybko zobaczę efekty?',
      odpowiedz:
        'Zmiany techniczne, jak odblokowanie botów i nowa struktura, działają zwykle w kilka tygodni. Sama cytowalność w AI rośnie wolniej, bo zależy od autorytetu, który buduje się miesiącami. Uczciwie: to praca na kwartały, nie na dni. Dlatego w stałej opiece mierzymy co tydzień, żebyś widział trend. Przy jednorazowej naprawie powtarzasz ten pomiar sam, na zamrożonym zestawie pytań.',
    },
    {
      pytanie: 'Czy dacie gwarancję, że ChatGPT będzie mnie polecać?',
      odpowiedz:
        'Nikt uczciwy nie da gwarancji konkretnej pozycji w AI, bo nie kontrolujemy silników. Możemy zagwarantować robotę: czytelność dla botów, treść pod cytowanie, autorytet poza stroną i twardy pomiar, a w modelu stałej opieki pomiar co tydzień po naszej stronie. Pokazujemy trend i to, co realnie się zmienia, a nie puste obietnice „będziesz numerem jeden”.',
    },
    /* PARTIA GEO 2026-08-19: dwa nowe pytania. Nic nie zostało usunięte ani
       przestawione. Liczby WYŁĄCZNIE z audytu §6.1 i §7, każda z kontekstem
       (zasada audytu §10 pkt 2: nigdy sam procent, nigdy sama liczba). */
    {
      pytanie: 'Macie dowód, że to działa?',
      odpowiedz:
        'Mamy trzy, każdy z nazwą klienta. Lenart Motors: ChatGPT wskazywał tę firmę na pytanie o najlepszego blacharza i lakiernika premium, po około trzech tygodniach od zbudowania strony i wrzucenia jej do sieci. Fichtelgebirgshaus.de: pierwsza dziesiątka Google na frazy umówione z klientem w umowie, plus widoczność w GPT. Trockenhaus: z niewidocznej w Google do pierwszej trójki na frazę Trockenhaus. Każdy z tych przypadków opisaliśmy osobno w realizacjach.',
    },
    {
      pytanie: 'Robicie to tylko po polsku?',
      odpowiedz:
        'Nie. Pracujemy na rynku polskim i niemieckim. Dwa z trzech naszych dowodów widoczności w AI to klienci z Niemiec: Fichtelgebirgshaus.de i Trockenhaus. Sposób pracy nad treścią jest ten sam w obu językach, bo silniki AI czytają jedno i drugie i w obu szukają tego samego: konkretu, jasnej struktury i odpowiedzi postawionej wysoko.',
    },
  ],

  cta: {
    label: 'Pokaż mi, gdzie tracę czas',
    href: '#diagnoza',
    /* ROZDZIAŁ ROZMOWY OD SPRINTU 2026-08-31: mikrokopia obiecywała za darmo
       pomiar w czterech silnikach, czyli zawartość płatnego Sprintu. */
    mikrokopia:
      'Bezpłatnie porozmawiamy o Twojej sytuacji i ustalimy zakres. Bez zobowiązań.',
    dowod:
      'Najmocniejszy dowód to nasza własna strona. Zobacz na żywo, w jakich frazach cytuje nas AI.',
  },

  queries: [
    'pozycjonowanie pod AI',
    'GEO',
    'optymalizacja SEO',
    'cytowalność w ChatGPT',
    /* PARTIA GEO 2026-08-19: fraza, pod którą pracuje nowy case Lenart Motors.
       Tagi karty biorą pierwsze 3 pozycje (tagiUslugi limit=3), więc dopisek
       na końcu niczego nie zmienia w renderze. */
    'strona cytowana przez ChatGPT',
  ],

  /* v22 (linki §3, P2 #15): strona miała 1 link wychodzący (kontakt) i 2
     wchodzące. `linkPoradnik` zostaje PUSTY świadomie: w rejestrze poradników
     są dziś wyłącznie poradniki cenowe, żaden nie dotyczy widoczności w AI,
     a doklejanie poradnika o cenie chatbota do strony GEO byłoby linkiem
     na siłę. Wchodzi, gdy powstanie poradnik o GEO. */
  powiazane: {
    /* PAKIET GEO 2026-08-31, TRZECI PRZEBIEG, uwaga wdrożeniowa pakietu §3
       („osiem nowych adresów dopisać do sekcji powiązane na stronie rodzica").
       OŚMIU LINKÓW DO PODSTRON TU NIE MA I TO JEST DECYZJA, NIE PRZEOCZENIE.
       Wszystkie osiem podstron gałęzi (audyt-widocznosci-w-ai, chatgpt,
       dostep-botow-ai, google-ai-overviews, perplexity, monitoring-cytowan-w-ai,
       dla-firm-uslugowych, llms-txt) JUŻ SIĘ RENDERUJE na tej stronie, tylko
       nie z tego pola: `app/uslugi/[usluga]/page.tsx` woła
       `<PodstronyPowiazane slug={usluga.slug} />`, a ten komponent bierze je
       automatycznie z rejestru (`getPodstronyRodzica('optymalizacja')`,
       lib/uslugi/podstrony/index.ts) i wystawia jako sekcję „Konkretne
       zastosowania": kafel na podstronę, etykieta = `h1` celu, opis = `kapsula`
       celu, href = /uslugi/optymalizacja/<slug>. Dokładnie to, czego chce §3.
       Wpisanie tych samych ośmiu linków jeszcze raz do `powiazane.uslugi`
       wyrenderowałoby na jednej stronie DWIE identyczne siatki: te same
       etykiety (h1) i te same adresy, raz w „Konkretnych zastosowaniach",
       raz w „Powiązanych usługach". Zero zysku dla bota (liczy się pierwsza
       kotwica), strata dla czytelnika. Gdyby link miał kiedyś zniknąć,
       naprawia się to w rejestrze podstron, a nie duplikatem tutaj. */
    /* PARTIA GEO 2026-08-19 (audyt §9 etap 2 pkt 7): trzy dowody cytowalności
       o jedno kliknięcie od oferty, w kolejności siły z audytu §6.1. Etykiety
       to h1 nowych case'ów (nigdy nowy slogan), opisy to fakty, które stoją
       na stronie celu. Trasy powstają z rejestru lib/realizacje (SSG), więc
       zero martwych linków. */
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis:
          'Lenart Motors: około trzy tygodnie od wrzucenia strony do sieci do wskazania firmy przez ChatGPT.',
      },
      {
        etykieta: 'Strona w pierwszej dziesiątce Google i widoczna w GPT',
        href: '/realizacje/top10-google-i-widocznosc-w-gpt',
        opis:
          'Fichtelgebirgshaus.de: frazy umówione w umowie w pierwszej dziesiątce Google, plus widoczność w GPT.',
      },
      {
        etykieta: 'Z niewidocznej strony do pierwszej trójki w Google',
        href: '/realizacje/z-niewidocznej-strony-do-top3-google',
        opis:
          'Trockenhaus: z braku widoczności do pierwszej trójki na frazę Trockenhaus.',
      },
    ],
    narzedzia: [
      {
        etykieta: 'Audyt strony pod AI (GEO)',
        href: '/narzedzia#audyt-strony-ai',
        opis:
          'Dziesięć pytań o Twojej stronie pokazuje, czy ChatGPT i Perplexity mogą ją cytować, i co naprawić najpierw.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Tworzenie stron WWW widocznych w Google i w AI',
        href: '/uslugi/strony-www',
        opis:
          'Gdy strony nie da się już naprawić, budujemy nową: cała treść w kodzie od razu, ułożona pod cytowanie.',
      },
    ],
  },
};
