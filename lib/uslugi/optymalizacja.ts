import type { Usluga } from './types';

/**
 * USŁUGA 5 — OPTYMALIZACJA (pozycjonowanie pod AI / GEO / SEO).
 * Treść fazy 3: pełna, 1:1 z 06-copy-hero-uslugi.md §"USŁUGA 5".
 * Każdy string prawdziwy i cytowalny przez LLM. Zero zmyślonych liczb/cen,
 * zero em-dash, zero gwarancji konkretnej pozycji w AI (uczciwość = warunek zaufania LLM).
 *
 * ══ PRZYCIĘCIE 2026-09-22 (raport `.seo-przeglad/raporty/2026-09-05.md`,
 * sekcje 4, 8 i 9). TA SAMA OPERACJA, co 2026-09-06 na `/uslugi/chatboty`
 * (commit b0dd7fc, `lib/uslugi/chatboty.ts`, 5667 -> 1618 słów) i tego samego
 * dnia na `/uslugi/voiceboty` (`lib/uslugi/voiceboty.ts`, 4180 -> 1594).
 * TA STRONA BYŁA NAJGRUBSZA W CAŁYM SERWISIE: pomiar na produkcji dał 6135
 * słów w <main>, a pomiar na wyrenderowanym buildzie 6177, czyli WIĘCEJ, niż
 * miały kiedykolwiek chatboty przed przycięciem. Na chatbotach dokładnie to
 * rozmycie tematu kosztowało frazę główną („chatbot ai dla firm": 70 wyświetleń
 * -> 3), a tutaj regresja stała na produkcji od 2026-09-06 niezmierzona.
 * Cel raportu: 1300-1600 słów, przy medianie top5 polskiej konkurencji równej
 * około 1150 (rozrzut 876-1647).
 *
 * WYNIK ZMIERZONY NA WYRENDEROWANYM BUILDZIE (npm run build, npx next start,
 * Chrome headless przez playwright-core, `main.innerText`, FAQ zwinięte, czyli
 * TA SAMA METODA co przy chatbotach i voicebotach, żeby liczby dało się
 * porównać): 6177 -> 1882 -> 1678 -> 1624 -> 1595 -> 1577 słów. Dla porównania
 * `/uslugi/chatboty` po b0dd7fc: 1618, `/uslugi/voiceboty`: 1589.
 * Z tego 628 słów to siatka „Konkretne zastosowania", którą
 * `components/uslugi/PodstronyPowiazane.tsx` buduje z kapsuł OŚMIU podstron
 * gałęzi; tego z tego pliku nie da się skrócić, więc własna treść strony musi
 * się zmieścić w około 950 słowach i mieści się (949).
 * NAGŁÓWKI H3 w <main>: 74 -> 27 (chatboty i voiceboty po przycięciu: 29).
 *
 * DRUGI NAPRAWIONY BŁĄD: nagłówek H3 „Uczciwe zastrzeżenie" stał na stronie
 * DWA RAZY (74 nagłówki H3 w <main>, jedyny duplikat na 21 zmierzonych stronach
 * serwisu). Pierwszy zamykał case Lenart Motors w `rozwiazanie.bloki`, drugi
 * zamykał sekcję o pomiarze w `ramaCeny.bloki`. Oba bloki zjechały na podstrony
 * (niżej), więc duplikat zniknął razem z nimi, a zdanie o serii pomiarów
 * zamiast jednego zrzutu ekranu stoi dalej: w `problem.bloki` tej strony
 * i w całości na `audyt-widocznosci-w-ai.ts` oraz `monitoring-cytowan-w-ai.ts`.
 *
 * ZASADA (raport 9): NIE KASUJEMY TREŚCI, PRZENOSIMY JĄ NA PODSTRONY. Gałąź ma
 * osiem podstron (`lib/uslugi/podstrony/`: audyt-widocznosci-w-ai, chatgpt,
 * dostep-botow-ai, google-ai-overviews, perplexity, monitoring-cytowan-w-ai,
 * dla-firm-uslugowych, llms-txt) i każda z nich była przed cięciem przeczytana
 * w całości. SZEŚĆ Z OŚMIU JEST ZAINDEKSOWANYCH (`dane/indeksacja-2026-09-22.json`,
 * pobranie 2026-09-06 i 2026-09-07: audyt-widocznosci-w-ai, chatgpt,
 * dostep-botow-ai, google-ai-overviews, monitoring-cytowan-w-ai,
 * dla-firm-uslugowych). Google nie zna jeszcze `perplexity` i `llms-txt`.
 * Dlatego każda przeniesiona sekcja została DOŁOŻONA NA KOŃCU ISTNIEJĄCEJ
 * SEKCJI strony docelowej i ani jedna zaindeksowana podstrona nie została
 * przebudowana ani przestawiona.
 *
 * CO ZOSTAŁO NA STRONIE USŁUGI (priorytet z zadania): co to jest pozycjonowanie
 * pod AI i dla kogo, jak to robimy w krokach, czym różni się od klasycznego SEO
 * (tabela), dowód od trzech klientów z nazwami, cennik RAZ (tabela czterech
 * pozycji plus warunki wdrożenia) i FAQ na sześć pytań.
 *
 * CO WYCIĘTO I GDZIE STOI TERAZ (przed każdym cięciem sprawdzono, czy sedno
 * REALNIE stoi na stronie docelowej; tam, gdzie nie stało, najpierw dopisano je
 * tam, a dopiero potem wycięto stąd):
 *  - N2, case Lenart Motors rozpisany na pięć sekcji (Punkt wyjścia,
 *    Co zrobiliśmy, Czas, Czym to sprawdzamy, Uczciwe zastrzeżenie):
 *    STAŁO JUŻ NA PODSTRONACH, nic nie trzeba było dopisywać.
 *    `audyt-widocznosci-w-ai.ts` sekcja „Co pokazał pomiar u Lenart Motors?"
 *    niesie punkt wyjścia, czas i uczciwe zastrzeżenie; `chatgpt.ts` sekcję
 *    „Ile czekał Lenart Motors na wskazanie w ChatGPT?"; `dla-firm-uslugowych.ts`
 *    sekcję „Warsztat premium, który ChatGPT zaczął wskazywać"; trzy punkty
 *    „Co zrobiliśmy" (strona od nowa, encja firmy, dostęp botów) to karty
 *    „Odpowiedzi wprost", „Spójna encja firmy" i „Dane strukturalne"
 *    w `chatgpt.ts`. Cały case stoi też jako realizacja
 *    /realizacje/strona-cytowana-przez-chatgpt, linkowana z `powiazane`.
 *    Tu zostaje pas metryk z liczbą i jedno zdanie.
 *  - N3, sześć źródeł AI (lista numerowana na sześć pozycji):
 *    STAŁO JUŻ na `dla-firm-uslugowych.ts` (`problem.bloki`, siatka sześciu
 *    kart: Wizytówka Google, Opinie, Katalogi branżowe, Rankingi i zestawienia,
 *    Wątki na forach, Twoja strona, plus tabela „Z czego powstaje wynik").
 *    Tu zostaje jedno zdanie w sekcji `problem`.
 *  - N4, dostęp botów AI (pięć kroków po robots.txt, „Co zrobić z wynikiem",
 *    „Uwaga na jedno nieporozumienie"): STAŁO JUŻ na `dostep-botow-ai.ts`
 *    (`kroki` „Jak sam sprawdzisz swój plik robots.txt?", sekcje „Trzy wiersze,
 *    które trzeba znać" i „Odblokowanie botów a zgoda na trenowanie modeli",
 *    plus osiem pytań FAQ o tych samych botach). Tu zostaje jedno zdanie
 *    w sekcji `problem`.
 *  - N5, harmonogram tydzień po tygodniu (tabela pięciu wierszy plus cytat
 *    o twardych terminach): NIE STAŁO NIGDZIE, więc DOPISANE 2026-09-22 na
 *    końcu `ramaCeny.bloki` w `chatgpt.ts`, czyli na stronie, która i tak pyta
 *    w H2 „Ile trwa i ile kosztuje pozycjonowanie w ChatGPT?". Tu zostaje
 *    zdanie o rytmie pracy w kroku trzecim i w FAQ „Jak szybko zobaczę efekty".
 *  - N6, siedem rzeczy w pakiecie: STAŁO JUŻ rozbite na podstrony.
 *    `audyt-widocznosci-w-ai.ts` sekcja „Co dostajesz po audycie?" niesie pięć
 *    pozycji (raport PDF z pomiarem zerowym, lista priorytetów, szybkie wygrane,
 *    plan wdrożenia, lista pytań kontrolnych); przepisane sekcje, encja firmy
 *    i dane strukturalne to trzy karty `chatgpt.ts`; uporządkowany robots.txt
 *    z czterema botami to `dostep-botow-ai.ts`; powtarzalny pomiar po wdrożeniu
 *    to `monitoring-cytowan-w-ai.ts`. Tu zostaje kolumna „Co dostajesz”
 *    w tabeli cennika.
 *  - N7, pięć kroków pomiaru plus DRUGIE „Uczciwe zastrzeżenie":
 *    STAŁO JUŻ na `monitoring-cytowan-w-ai.ts` (sekcja „Dlaczego dwa pomiary
 *    da się w ogóle porównać?" z krokami Pytania klienta zamiast fraz, Czyste
 *    okno, Ten sam zamrożony zestaw; sekcja „Co zapisujemy przy każdym
 *    pomiarze?"; tabela „Jeden zrzut ekranu a seria pomiarów") oraz na
 *    `audyt-widocznosci-w-ai.ts` (`kroki` „Jak mierzymy widoczność w AI, krok
 *    po kroku?"). To cięcie ZLIKWIDOWAŁO DUPLIKAT H3 opisany wyżej.
 *  - N9, trzy drogi (nic nie robić, abonament agencji, jednorazowa naprawa):
 *    NIE STAŁO NIGDZIE, więc DOPISANE 2026-09-22 na końcu `ramaCeny.bloki`
 *    w `audyt-widocznosci-w-ai.ts`, czyli na pierwszym kroku handlowym gałęzi,
 *    który już wcześniej rozstrzygał, co dzieje się z kwotą 1490 zł netto
 *    po audycie. Kolumna abonamentu agencji dalej BEZ kwoty.
 *  - N10, rachunek kosztu czekania (tabela czterech pól plus „Drugi bok tego
 *    rachunku"), oraz blok „Dla porównania z rynkiem" z N8 (ceny
 *    projektowaniestroncennik.pl): NIE STAŁY NIGDZIE, więc DOPISANE 2026-09-22
 *    na końcu `ramaCeny.bloki` w `dla-firm-uslugowych.ts`, bo ten rachunek
 *    liczy się na zapytaniach i wartości jednego zlecenia, czyli na liczbach
 *    warsztatu, gabinetu i kancelarii. Tu zostaje link do kalkulatora
 *    w `powiazane.narzedzia`.
 *  - N11, pięć sytuacji „kiedy nie warto brać tego od nas": STAŁO JUŻ
 *    co do pozycji na `audyt-widocznosci-w-ai.ts` (sekcja „Kiedy ten audyt nie
 *    ma sensu?": brak strony, sprzedaż wyłącznie z poleceń, efekt w tydzień,
 *    gwarancja pierwszego miejsca, lokalna usługa bez wizytówki i opinii), a
 *    branżowe warianty na `chatgpt.ts` („Kiedy to nie zadziała?"),
 *    `google-ai-overviews.ts`, `perplexity.ts`, `dla-firm-uslugowych.ts`
 *    i `monitoring-cytowan-w-ai.ts`. Tu zostaje FAQ o gwarancji.
 *  - N12, sześć obiekcji („To chwilowa moda" i pozostałe): NIE STAŁO NIGDZIE,
 *    więc DOPISANE 2026-09-22 na końcu `rozwiazanie.bloki`
 *    w `monitoring-cytowan-w-ai.ts`, bo obiekcja „tego się nie da zmierzyć"
 *    jest wprost tematem tamtej podstrony. Ostatnie zdanie karty „Poczekam"
 *    odsyłało do kalkulatora stojącego wyżej na TEJ stronie, więc przy
 *    przenosinach zostało skrócone o to odesłanie (kalkulator jest dziś
 *    na innej podstronie).
 *  - N13, słownik ośmiu pojęć (GEO, AEO, AI Overviews, LLM, encja marki,
 *    cytowanie w odpowiedzi AI, halucynacja o firmie, llms.txt): NIE STAŁO
 *    NIGDZIE w całości, więc DOPISANE 2026-09-22 na końcu `rozwiazanie.bloki`
 *    w `llms-txt.ts`, czyli na jedynej podstronie gałęzi, która od H1 robi
 *    robotę definicyjną, i jednej z dwóch, których Google jeszcze nie pobrał.
 *    Definicja samego GEO zostaje tutaj, w kapsule i w FAQ.
 *  - przełącznik czterech etapów z `rozwiazanie` (widoczność dla botów, treść
 *    pod cytat, świeżość, autorytet poza stroną): sedno zostaje w leadzie
 *    sekcji i w trzech krokach wdrożenia. Pełne rozwinięcie stoi na
 *    `chatgpt.ts` (`kroki`: Najpierw dostęp, Potem treść i encja, Na końcu
 *    obecność poza stroną) i na `google-ai-overviews.ts` (krok „Dane
 *    strukturalne, świeżość i daty"). Tak samo domknięto sekcję `problem`
 *    na chatbotach (b0dd7fc) i na voicebotach.
 *  - przełącznik dwóch modeli pracy (Audyt i naprawa kontra Stała opieka GEO)
 *    plus tabela tych samych dwóch modeli, czyli ta sama treść dwa razy pod
 *    rząd: STAŁO JUŻ na `monitoring-cytowan-w-ai.ts` (sekcja „Czym monitoring
 *    różni się od jednorazowego audytu?") i na `audyt-widocznosci-w-ai.ts`
 *    (przełącznik „Naprawiamy razem" kontra „Wdrażasz bez nas"). Tu zostaje
 *    jedno zdanie w `ramaCeny.tresc` i jedno w kroku trzecim.
 *  - sekcja „Co dostaję na bezpłatnej diagnozie?" plus pas metryk „0 zł /
 *    ok. 30 minut / 4 silniki AI": granica bezpłatnej rozmowy NIE ZNIKNĘŁA,
 *    stoi jako zdanie w kroku pierwszym, w `ramaCeny.tresc`, w wierszu Sprintu
 *    w tabeli cennika i w `cta.mikrokopia`. Rozwinięcie stoi na
 *    `audyt-widocznosci-w-ai.ts`, która sprzedaje sam Sprint Diagnostyczny.
 *  - blok „Jedna rzecz, której konkurencja nie ma" (abonament utrzymaniowy
 *    99-599 zł netto, 299-1500 zł netto, 0 zł przy przekazaniu infrastruktury,
 *    350 zł netto za godzinę poprawek): to kwoty CHATBOTÓW, VOICEBOTÓW
 *    I AUTOMATYZACJI, nie tej usługi. STOJĄ JUŻ w swoich miejscach:
 *    `lib/uslugi/chatboty.ts`, `lib/uslugi/automatyzacje.ts`,
 *    `lib/uslugi/opieka-ai.ts`, `lib/uslugi/podstrony/chatboty-cennik.ts`
 *    i `lib/uslugi/podstrony/voiceboty-cennik.ts`. Tu nie zostaje nic, bo na
 *    stronie o pozycjonowaniu pod AI robiły za tło, nie za cennik tej usługi.
 *  - FAQ z 8 pozycji do 6 (kontrakt `Usluga.faq` w lib/uslugi/types.ts mówi
 *    5-6, a strona miała 8). Gdzie stoją wycięte pytania:
 *      · „Jak sprawdzicie, czy mnie cytuje ChatGPT?" -> `monitoring-cytowan-w-ai.ts`
 *        (FAQ „Co dokładnie zapisujecie w jednym pomiarze?" i „Jak często
 *        powtarzacie pomiar?") oraz `audyt-widocznosci-w-ai.ts` (FAQ „Jak
 *        sprawdzacie, czy ChatGPT poleca moją firmę?"),
 *      · „Robicie to tylko po polsku?" -> fakt o rynku polskim i niemieckim
 *        NIE ZNIKNĄŁ: wszedł jako ostatnie zdanie odpowiedzi „Macie dowód, że
 *        to działa?", przy tych samych dwóch niemieckich klientach.
 *
 * KAPSUŁA: kontrakt `Usluga.kapsula` mówi 40-60 słów, a kapsuła miała 112.
 * Przepisana na 52 słowa; wycięte z niej zdanie o Lenart Motors stoi niżej
 * w pasie metryk sekcji `rozwiazanie`, w FAQ „Macie dowód" i w `powiazane`.
 *
 * H1 NIETKNIĘTE: `components/uslugi/ServiceHero.tsx` (mapa H1_KOLOR, wpis
 * `optymalizacja`) koloruje końcówkę „bądź cytowany w ChatGPT i Perplexity",
 * a fragment MUSI być dokładną końcówką h1.
 *
 * ── NIŻEJ: ZAPIS HISTORYCZNY SPRZED 2026-09-22. Opisuje, jak pakiet GEO
 *    N1-N13 wchodził na tę stronę w sierpniu 2026. Większości tych bloków już
 *    tu nie ma (patrz lista wyżej), ale zapis zostaje, bo tłumaczy, skąd
 *    wzięła się każda liczba, która na stronie została.
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
  /* PRZYCIĘCIE 2026-09-22: data bumpnięta z '2026-08-31' na dzień przycięcia.
     Pole jest źródłem `lastmod` w sitemap.xml (app/sitemap.ts), a treść strony
     zmieniła się co do sekcji (6177 -> 1577 słów), więc stara data mówiłaby
     botom nieprawdę. */
  dataAktualizacji: '2026-09-22',
  /* H1 NIETKNIĘTE: `ServiceHero.H1_KOLOR.optymalizacja` koloruje końcówkę
     „bądź cytowany w ChatGPT i Perplexity", więc musi być dokładną końcówką. */
  h1: 'Pozycjonowanie pod AI: bądź cytowany w ChatGPT i Perplexity',

  /* KONTRAKT `Usluga.kapsula`: 40-60 słów. Tu 52. Przed przycięciem 2026-09-22
     kapsuła miała 112 słów i kończyła się całym case'em Lenart Motors; ta
     liczba stoi teraz w pasie metryk sekcji `rozwiazanie` i w FAQ. */
  kapsula:
    'Pozycjonowanie pod AI (GEO) to ustawienie Twojej strony tak, żeby ChatGPT, Claude, Gemini i Perplexity polecały ją w odpowiedziach, a nie tylko Google w wynikach. Nie musisz budować strony od nowa. Naprawiamy trzy rzeczy: czy boty AI widzą Twoją treść, czy da się ją zacytować i czy masz autorytet poza własną stroną.',

  metaTitle: 'Pozycjonowanie pod AI: cytowanie w ChatGPT',
  metaDescription:
    'Pozycjonowanie pod AI (GEO): sprawiamy, że ChatGPT, Claude, Gemini i Perplexity polecają Twoją firmę. Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych.',

  problem: {
    h2: 'Klienci pytają AI, a AI poleca kogoś innego?',
    tresc:
      'Jeśli w odpowiedziach AI pada konkurencja, a nie Ty, tracisz klientów, których nawet nie widzisz. Ludzie coraz częściej pytają ChatGPT albo Perplexity o polecenie firmy, i właśnie w tej odpowiedzi zapada decyzja.',
    bloki: [
      /* PRZYCIĘCIE 2026-09-22: z tej sekcji zeszły pełny blok N1 (trzy karty
         opisowe case'ów), cała lista sześciu źródeł AI (N3) i cała instrukcja
         po robots.txt (N4). Zostaje głowa sekcji, trzy krótkie karty
         i dwa zdania odsyłające. Adresy docelowe: nagłówek pliku. */
      {
        typ: 'naglowek',
        tekst: 'Dlaczego model wymienia kogoś innego?',
        ikona: 'lupa-wykres',
        chip: 'GEO',
        overline: 'TRZY POWODY',
      },
      {
        typ: 'siatka',
        kolumny: 3,
        karty: [
          {
            naglowek: 'Boty AI nie widzą Twojej treści',
            akapity: [
              'Jeśli model nie ma dostępu do strony, nie zacytuje Cię, choćby Twoja oferta była najlepsza w okolicy. Sprawdzamy to jako pierwsze.',
            ],
          },
          {
            naglowek: 'Treść nie jest napisana pod cytat',
            akapity: [
              'Model ma wyjąć ze strony gotowy fragment. Upychane słowa kluczowe tego nie załatwiają, a bywają minusem.',
            ],
          },
          {
            naglowek: 'Poza Twoją stroną nikt o Tobie nie mówi',
            akapity: [
              'W Google autorytet dawały linki, w AI dają wzmianki. Twoja strona to jedno z sześciu źródeł.',
            ],
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'Pozostałe pięć źródeł rozpisujemy na podstronie dla firm usługowych, a sprawdzenie robots.txt na podstronie o dostępie botów AI.',
      },
    ],
  },

  rozwiazanie: {
    h2: 'Jak sprawiamy, że AI zaczyna Cię cytować?',
    tresc:
      'Naprawiamy trzy rzeczy: czy boty AI widzą Twoją stronę, czy treść jest ułożona pod cytat i czy masz autorytet poza własną stroną. Potem mierzymy, czy realnie padasz w odpowiedziach: w stałej opiece co tydzień my, przy jednorazowej naprawie Ty sam, na zamrożonym zestawie pytań.',
    bloki: [
      /* PRZYCIĘCIE 2026-09-22: z tej sekcji zeszły przełącznik czterech etapów,
         cały case Lenart Motors rozpisany na pięć sekcji (N2, w tym PIERWSZE
         z dwóch „Uczciwe zastrzeżenie"), lista sześciu źródeł (N3) i instrukcja
         robots.txt (N4). Zostaje DOWÓD, czyli to, czego nie ma nigdzie indziej
         w tej formie: trzy nazwy klientów z rozdziałem kanałów. */
      {
        typ: 'naglowek',
        tekst: 'Co dało pozycjonowanie pod AI trzem naszym klientom?',
        ikona: 'gwiazda-kompas',
        chip: 'DOWÓD',
        overline: 'TRZY WDROŻENIA',
      },
      /* ROZDZIAŁ KANAŁÓW jest wymogiem pakietu, nie ozdobą: pole `zrodlo`
         każdej metryki mówi wprost, czy to wynik w AI, czy wynik w Google.
         Zero procentów, bo ich nie zmierzyliśmy. */
      {
        typ: 'pasMetryk',
        metryki: [
          {
            wartosc: 'ok. 3 tygodnie',
            opis: 'od publikacji do wskazania firmy przez ChatGPT',
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
            opis: 'na frazę Trockenhaus, ze stanu bez widoczności',
            zrodlo: 'Trockenhaus, wynik w Google',
            ton: 'violet',
          },
        ],
      },
      {
        typ: 'akapit',
        tekst: 'To realne wdrożenia, każde opisane osobno w realizacjach. Dowód czysto AI mamy dziś jeden, Lenart Motors, i mówimy to wprost. Dwa pozostałe to wyniki w Google, u klientów z rynku niemieckiego. To pomiary własne, więc liczy się seria pomiarów, nie jeden zrzut ekranu.',
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
      { cecha: 'Pomiar', bez: 'Pozycje w Google', zNami: 'Czy padasz w 4 silnikach (co tydzień w stałej opiece)' },
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
          'Pytamy o Twoją sytuację i ustalamy zakres. Pomiar w czterech silnikach AI robimy dopiero w płatnym Sprincie.',
      },
      {
        tytul: 'Naprawa i przepisanie',
        opis:
          'Odblokowujemy boty, przepisujemy kluczowe strony pod cytowanie, dokładamy liczby i świeżość, ruszamy autorytet poza stroną.',
      },
      {
        tytul: 'Pomiar i rozwój',
        opis:
          'W stałej opiece co tydzień sprawdzamy, czy padasz częściej i wyżej. Przy jednorazowej naprawie robisz to sam.',
      },
    ],
  },

  ramaCeny: {
    h2: 'Ile kosztuje pozycjonowanie pod AI?',
    /* PRZYCIĘCIE 2026-09-22: ta sekcja miała 3094 słowa, czyli połowę strony
       (N5 harmonogram, N6 pakiet, N7 pomiar, pas metryk diagnozy, przełącznik
       i tabela dwóch modeli, sekcja o bezpłatnej diagnozie, N8 z porównaniem
       rynkowym i abonamentem innych usług, N9 trzy drogi, N10 koszt czekania,
       N11 kiedy nie warto, N12 obiekcje, N13 słownik). Zostaje CENNIK RAZ:
       jedna tabela czterech pozycji i warunki wdrożenia. Adresy docelowe
       wszystkich wyciętych bloków stoją w nagłówku pliku. */
    tresc:
      'Pozycje o ustalonym zakresie mają twarde ceny i znajdziesz je w cenniku niżej. Widełki dotyczą tylko ciągłej pracy nad autorytetem, bo tam cena zależy od zakresu. Podajemy je na bezpłatnej rozmowie.',
    bloki: [
      /* TO JEDYNE MIEJSCE NA TEJ STRONIE Z KWOTAMI (uwaga wdrożeniowa pakietu
         §6). Zdania kontraktowe bez „ulepszania": „odliczane od wdrożenia",
         „dwie rundy poprawek", „od 5900 zł". Do każdej NASZEJ kwoty „netto". */
      {
        typ: 'naglowek',
        tekst: 'Cennik pozycjonowania pod AI: cztery pozycje z cenami',
        ikona: 'notes-pioro',
        chip: 'KWOTY',
        overline: 'WSZYSTKIE CENY NETTO',
      },
      {
        typ: 'tabela',
        naglowki: ['Co kupujesz', 'Ile kosztuje', 'Ile trwa', 'Co dostajesz'],
        wiersze: [
          [
            'Sprint Diagnostyczny, czyli audyt AI',
            '1490 zł netto, odliczane od wdrożenia',
            '5 dni roboczych',
            'Raport PDF z pomiarem zerowym, priorytety, plan wdrożenia',
          ],
          [
            'Landing pisany pod cytowanie',
            '1590 zł netto',
            '1 dzień roboczy',
            'Jedna strona pod cytowanie, dane strukturalne, robots.txt',
          ],
          [
            'Strona biznesowa pod cytowanie',
            '2900 zł netto',
            '2-4 dni robocze',
            'Kilka podstron, encja firmy, SEO i przygotowanie pod AI',
          ],
          [
            'Strona zaawansowana',
            'od 5900 zł netto',
            '5-10 dni roboczych',
            'Rozbudowana struktura podstron, sklep lub wpięte narzędzia',
          ],
        ],
        wKarcie: true,
        podpis: 'Cennik pozycjonowania pod AI: cena, czas i zakres pozycji',
      },
      {
        typ: 'sekcja',
        naglowek: 'Co jest w cenie wdrożenia',
        wariant: 'top',
        chip: 'WARUNKI',
        akapity: [
          'Kwotę za Sprint Diagnostyczny odliczamy w całości od ceny wdrożenia, więc dla wchodzącego w projekt audyt jest w praktyce darmowy. W cenie wdrożenia masz dwie rundy poprawek.',
          'Po odbiorze nie ma abonamentu: strona i wszystkie pliki zostają u Ciebie. Opłata miesięczna jest tylko w stałej opiece GEO.',
        ],
      },
    ],
  },

  /* KONTRAKT `Usluga.faq`: 5-6 pozycji. Tu 6. Przycięcie 2026-09-22 zdjęło
     dwa pytania (adresy w nagłówku pliku); fakt o rynku polskim i niemieckim
     z wyciętego pytania wszedł do odpowiedzi „Macie dowód, że to działa?". */
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
      pytanie: 'Czy muszę budować stronę od nowa?',
      odpowiedz:
        'Nie zawsze. Często wystarczy naprawić to, co masz: odblokować boty, przepisać kluczowe strony pod cytowanie, dołożyć liczby i autorytet z zewnątrz. Jeśli strona stoi na technologii, której AI w ogóle nie czyta, powiemy to wprost na diagnozie i wtedy rozmawiamy o przebudowie.',
    },
    {
      pytanie: 'Jak szybko zobaczę efekty?',
      odpowiedz:
        'Zmiany techniczne, jak odblokowanie botów i nowa struktura, działają zwykle w kilka tygodni. Sama cytowalność w AI rośnie wolniej, bo zależy od autorytetu, który buduje się miesiącami. Uczciwie: to praca na kwartały, nie na dni. Dlatego w stałej opiece mierzymy co tydzień, żebyś widział trend. Przy jednorazowej naprawie powtarzasz ten pomiar sam, na zamrożonym zestawie pytań.',
    },
    /* PARTIA GEO 2026-08-19: liczby WYŁĄCZNIE z audytu §6.1 i §7, każda
       z kontekstem (zasada audytu §10 pkt 2: nigdy sam procent, nigdy sama
       liczba). Ostatnie zdanie dopisane 2026-09-22 z wyciętego pytania
       „Robicie to tylko po polsku?" (ten sam fakt, to samo miejsce w tekście). */
    {
      pytanie: 'Macie dowód, że to działa?',
      odpowiedz:
        'Mamy trzy, każdy z nazwą klienta. Lenart Motors: ChatGPT wskazywał tę firmę na pytanie o najlepszego blacharza i lakiernika premium, po około trzech tygodniach od zbudowania strony i wrzucenia jej do sieci. Fichtelgebirgshaus.de: pierwsza dziesiątka Google na frazy umówione z klientem w umowie, plus widoczność w GPT. Trockenhaus: z niewidocznej w Google do pierwszej trójki na frazę Trockenhaus. Każdy z tych przypadków opisaliśmy osobno w realizacjach. Dwa z trzech to klienci z Niemiec, bo pracujemy na rynku polskim i niemieckim.',
    },
    {
      pytanie: 'Czy dacie gwarancję, że ChatGPT będzie mnie polecać?',
      odpowiedz:
        'Nikt uczciwy nie da gwarancji konkretnej pozycji w AI, bo nie kontrolujemy silników. Możemy zagwarantować robotę: czytelność dla botów, treść pod cytowanie, autorytet poza stroną i twardy pomiar, a w modelu stałej opieki pomiar co tydzień po naszej stronie. Pokazujemy trend i to, co realnie się zmienia, a nie puste obietnice „będziesz numerem jeden”.',
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
    /* OŚMIU LINKÓW DO PODSTRON TU NIE MA I TO JEST DECYZJA, NIE PRZEOCZENIE.
       Wszystkie osiem podstron gałęzi (audyt-widocznosci-w-ai, chatgpt,
       dostep-botow-ai, google-ai-overviews, perplexity, monitoring-cytowan-w-ai,
       dla-firm-uslugowych, llms-txt) JUŻ SIĘ RENDERUJE na tej stronie, tylko
       nie z tego pola: `app/uslugi/[usluga]/page.tsx` woła
       `<PodstronyPowiazane slug={usluga.slug} />`, a ten komponent bierze je
       automatycznie z rejestru (`getPodstronyRodzica('optymalizacja')`,
       lib/uslugi/podstrony/index.ts) i wystawia jako sekcję „Konkretne
       zastosowania": kafel na podstronę, etykieta = `h1` celu, opis = `kapsula`
       celu, href = /uslugi/optymalizacja/<slug>. Wpisanie tych samych ośmiu
       linków jeszcze raz do `powiazane.uslugi` wyrenderowałoby na jednej
       stronie DWIE identyczne siatki. Gdyby link miał kiedyś zniknąć, naprawia
       się to w rejestrze podstron, a nie duplikatem tutaj.
       PRZYCIĘCIE 2026-09-22: ta siatka to 628 z 1577 słów strony i to ona
       niesie dziś odesłania do rozwinięć wyciętych stąd sekcji. */
    /* PARTIA GEO 2026-08-19 (audyt §9 etap 2 pkt 7): trzy dowody cytowalności
       o jedno kliknięcie od oferty, w kolejności siły z audytu §6.1. Etykiety
       to h1 nowych case'ów (nigdy nowy slogan), opisy to fakty, które stoją
       na stronie celu. Trasy powstają z rejestru lib/realizacje (SSG), więc
       zero martwych linków. */
    realizacje: [
      {
        etykieta: 'Strona cytowana przez ChatGPT po trzech tygodniach',
        href: '/realizacje/strona-cytowana-przez-chatgpt',
        opis: 'Lenart Motors: około trzy tygodnie od publikacji do wskazania firmy przez ChatGPT.',
      },
      {
        etykieta: 'Strona w pierwszej dziesiątce Google i widoczna w GPT',
        href: '/realizacje/top10-google-i-widocznosc-w-gpt',
        opis: 'Fichtelgebirgshaus.de: frazy z umowy w pierwszej dziesiątce Google.',
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
        opis: 'Dziesięć pytań pokazuje, czy ChatGPT i Perplexity mogą cytować Twoją stronę.',
      },
    ],
    uslugi: [
      {
        etykieta: 'Tworzenie stron WWW widocznych w Google i w AI',
        href: '/uslugi/strony-www',
        opis: 'Gdy strony nie da się już naprawić, budujemy nową, ułożoną pod cytowanie.',
      },
    ],
  },
};
