# STATUS — INFINITY v15 — NA PRODUKCJI (commit 6fe5b07, 19 plików, +430/-178)

Runda po wściekłym feedbacku Pawła (zrzuty sekcji Open Source wzorca).
TRZY BŁĘDY WYCOFANE: (1) „cisza" v14 w kosz — hover PEŁNY (sweep +
rozświetlenie + lift) na KAŻDEJ karcie, także statystyki/FAQ/cytaty
(zmierzone CDP 17 kart / 6 wariantów, 53/53 z żywym sweepem); (2) czyste
warianty spoczynku — lewa kreska bazy zgaszona na kartach z górną linią
(::before none na top/stat), każda karta DOKŁADNIE 1 wyróżnik, zero łączeń;
(3) głębia przezroczysta — czerń 10% spod gradientu zdjęta (bgColor
transparent), karta szklana, kontrasty wzrosły (fiolet 4,57, mierzone
na pikselach). NEON 1:1 z pomiaru Open Source (pomiary-v15.md): płytka
3 warstwy (gradient+inset+glow 16px+drop-shadow), chipy tło 12% obwódka
32% tekst pełny, statusy glow. SWEEP płynniejszy: pas 60% (było 38%),
gradient 105deg miękki, bez skew, 0.6s spring cubic-bezier(.16,1,.3,1).
HOVER GLOW POZA RAMKĘ: łuna 22/48px 35% + 28px 14% + inset. Tagline pod
tytułem (NarzedziaTeaser), różnorodność kolorów sąsiadów OK. Minor audytu
naprawiony przed commitem: forced-colors gasi drop-shadow płytki.
Kontrola: SHIP WITH MINORS, zero blokerów; zero nowych tekstów w diffie.
Produkcja: computed zmierzony na żywo (pas 59,8%, spring, transparent,
20 kart bez ::before), zrzuty w scratchpadzie.
Czeka na Pawła: ocena „czy świeci jak wzorzec" na żywo; pastelowe
--card-c kilku sekcji (Bezpieczeństwo, Gwarancja, Oferta, ZyweDemo) poza
zakresem pomiaru — jeśli dalej „blade", osobny pomiar tych rodzin (v16).
Margines AA fioletu #b638ff ~0,1 — nie rozjaśniać tła kart.
W drzewie (nie commitowane w rundach designu): .seo-przeglad/* +
tools/diagnoza-produkcji.js, gsc-pelny.js, migawka.js, porownaj-migawki.js
(artefakty osobnej sesji SEO).

---

# STATUS — INFINITY v14 + v14b — NA PRODUKCJI (commity 0539767 + 0f82b7a)

v14 (17 plików, +425/-47) — po audycie Manusa i uwadze Pawła o wnętrzu kart:
KOMPLET ANATOMII wnętrza kart home (płytka ikony .inf-tile 40px z gradientem
i glow — 33 szt.; kickery mono w kolorze karty — 15, WYŁĄCZNIE etykiety
z istniejących danych, zero nowych węzłów tekstowych w diffie; chipy;
strzałki tylko na linkach), CISZA NA NIEKLIKALNYCH (.inf-card-static:
44 karty informacyjne bez sweepa/liftu, 9 kart-linków z pełnym językiem),
FOCUS-VISIBLE kart-linków (ring 2px w kolorze karty + offset, 9/9 Tab-em).
v14b (1 plik: globals.css, OSOBNY commit dla łatwego revertu — decyzja
Pawła „chcę ten efekt premium; jak się nie spodoba, cofniesz"): GŁĘBIA
powierzchni kart 1:1 .lp-learn-card wzorca — gradient 160deg
rgba(12,13,28,.74)->rgba(9,10,22,.55) jako 11. warstwa background-image
(53/53 kart; warianty edge/full-hover/quiet dostały osobną nadpiskę,
bo gasiły całą listę) + backdrop-blur(12px) TYLKO desktop; czerń 10%
zostaje pod spodem jako bezpiecznik AA. REVERT GŁĘBI = git revert 0f82b7a.
Kontrole: v14 SHIP WITH MINORS (minor: kickery pominięte w sekcjach bez
etykiet rejestrowych — zero-nowych-treści górą; INFO: statusy 5 kolorów
vs 1 zielony wzorca; sweep nieklikalnych na PODSTRONACH poza zakresem),
v14b SHIP WITH MINORS (margines AA fioletu 4,67 — nie rozjaśniać
powierzchni bez przeliczenia; przygaszone cytaty opacity .25 sprzed rundy;
GPU blura niezmierzone tracingiem). Produkcja: markery HTML/CSS + zrzuty.
Czeka na Pawła: ocena głębi na żywo (rewert = 1 commit); decyzja
o kickerach-numerach w JakToDziala (dubel numeru); ew. ujednolicenie
statusów do 1 koloru; ew. cisza nieklikalnych na podstronach (v15?).
W drzewie: artefakty .seo-przeglad/ (2 przebiegi 2026-08-17) — osobna
sesja, nie commitowane w rundach designu.

---

# STATUS — INFINITY v13 — NA PRODUKCJI (commit ce88871, 3 pliki, +447/-91)

Naprawa przesycenia v12 (Pawel: cztery rodzaje ramek wzorca, „u nas tego
nie ma w ogole"): baza obwodek WYCISZONA do wartosci wzorca (biel 4-7%,
zero kolorowych obwodek dookola — 53/53 kart home zmierzone), swieci tylko
WYROZNIK wariantu: TYP A gora gasnaca ku rogom + luna (18 kart), TYP B sam
lewy bok, gora czysta (18), TYP C delikatny ring (5), TYP D pasek gorny
w odcieniach jednego koloru (4 kafle POTRAFI, --card-c-alt, zielen->cyjan
/ amber->pomarancz / fiolet->magenta). Wszystko 1:1 z zywego wzorca
(raporty/pomiary-v13.md). Separator: DWA rozblyski naraz, przelot 4s
ease-in-out (bylo 2,4s) = 2,4x wolniej, czysty CSS, RM gasi.
HOVER WSPOLNY i HERO USLUG (v12) NIETKNIETE — zmierzone 8 przypadkow
hovera + git diff uslug = 0. SEO: diff tresci = 0.
Proces: workflow zwiad->implementacja->kontrola (SHIP WITH MINORS; oba
minory SPRZED rundy: scroll 27px na 320px od slowa „automatyzacje" w H1
maszyny — nietykalne bez decyzji Pawla; luna typu A/D emulowana radialem
bo box-shadow architektonicznie niemozliwy na warstwie background).
Produkcja zweryfikowana: CSS na produkcji = ten sam hash co audytowany
lokalnie (0b028417aa79e44e), markery --card-c-alt i shimmer 4s obecne.
Czeka na Pawla: ocena wizualna na zywo (luna A/D + odcienie D).
W drzewie wisi niezacommitowany przebieg .seo-przeglad/ z 2026-08-17
(werdykt STABILNIE) — artefakt osobnej sesji skillu, nie ruszany.

---

# STATUS — INFINITY v12 — NA PRODUKCJI (commit ac62ef0, 10 plików, +1002/-124)

Naprawa błędu v11 (pełny hover miał tylko wariant W3): REGUŁA WSPÓLNA —
spoczynek RÓŻNY per wariant (pasek/linia górna/kolor obwódki/quiet), hover
na KAŻDEJ karcie rozświetla WSZYSTKIE 4 strony ramki pełnym kolorem + sweep
(zwolniony do 0.6s ease, 1:1 wzorzec) + lift; zmierzone 10 kart / 6 wariantów,
background-color bez zmiany 10/10. Nasycenie spoczynku 100% koloru karty
(decyzja „MAKSYMALNE nasycenie" — POWYŻEJ tabeli wzorca 6-7%; czeka na
akcept wizualny Pawła na żywej stronie). Pulsujące statusy 1:1 anatomia
wzorca (kropka osobnym spanem, czysty CSS, RM-bramka): „ZA DARMO" 5x
/narzedzia + teaser home, „WDROŻONE" 8x /realizacje — zero zmyślonych.
Hero podstron usług jak akademie wzorca: kolor przewodni z inf-kategorie
(= karta na home), badge-pigułka z shimmerem, drugi człon H1 w kolorze
(span; H1 byte-for-byte z rejestrem), tagi, kafle statystyk WYŁĄCZNIE
z rejestru (990/2500/1490/24-7/kroki/FAQ ze źródłami), CTA pełnym kolorem.
SEO NIETKNIĘTE: diff treści = 0 (audyt czytał linia po linii).
Proces: workflow 5 agentów (zwiad pomiarowy -> partie A/B/C równoległe ->
kontrola adwersaryjna; kontrola padła na limicie sesji, dokończona po
resecie z cache — werdykt SHIP WITH MINORS). Minory naprawione przed
commitem: hero przepięte z inline na klasy .inf-hero-* (zysk: shimmer,
forced-colors, blur desktop-only), selektor tagu .inf-chip.inf-hero-tag
(specyficzność), martwe .inf-hero-cta/-stat-value/-label/.inf-status-badge
wycięte, alfa() bez fallbacku usunięta. Weryfikacja po minorach: build/tsc/
lint 0, sonda realny Chrome (3 usługi: kolory pełne 1:1, shimmer żyje,
RM gasi, mobile 375 bez scrolla) + produkcja (markery HTML/CSS, zrzuty).
IndexNow pominięty ŚWIADOMIE: diff treści = 0, czysty design.
Czeka na Pawła: ocena wizualna nasycenia 100% na żywej stronie.
Znane na później: .sf-glass.card-live:hover bez żywej instancji (zmiana
spójna, ryzyko niskie); sondy-testy z audytu (4 pomysły w raporcie
kontroli); 320px najdłuższe słowo H1; 3 stare em-dash na home.

---

# STATUS — INFINITY v11 — NA PRODUKCJI (commit 5a632d9, 52 pliki, +1268/-149)

Naprawa błędu uniformizacji z v10: zamiast jednego stylu ramki — SZEŚĆ
wariantów zmierzonych na wzorcu (edge/top/full-hover/stat/quiet + baza),
mapowanych per sekcja NA HOME I NA PODSTRONACH (naczynia połączone; kontrola
policzyła w DOM: /uslugi full-hover 10/10, /wiedza edge 6/6 itd.).
Nasycenie w spoczynku (obwódki w kolorze kategorii, esencja 100% na paskach
i ringach), tytuły biel #f2f4fb/800, kreska pod H2 (statyczna = wzorzec),
pasek zaufania w ramkach, karty-zjadacze z kickerem+opisem+tagami (każde
zdanie ze źródłem), dropdown krótki tytuł + szary podpis (pokrycie pozycji
bez strat), odstępy 1,00-1,05x wzorca, CTA na osi 0,0px.
VOICEBOT OD 2500 zł: title + JSON-LD minPrice + spójność w 5 plikach wiedzy;
synonimy bot telefoniczny/agent głosowy; agent ElevenLabs skasowany przez
Pawła — odtworzy się z cennikiem 990+2500 przy pierwszej rozmowie.
Hook designu: wyjątki value-scoped dla globals.css (gradient-text celowy,
broken-image to fałszywy alarm na komentarzach CSS) — reguły aktywne wszędzie
indziej. IndexNow 47 adresów po zmianie treści (200).
Znane na później: 320px najdłuższe słowo H1 wystaje (bez scrolla); 3 stare
em-dash na home; sondy: klasa-TSX-istnieje-w-CSS, mapa wariantów per strona.

---

# STATUS — INFINITY v10 — NA PRODUKCJI (commit 19728b2, 24 pliki, +686/-112)

Rundy v7-v10 wdrożone kolejno (commity cffb92a, 17c5a35, c5c3266, 19728b2),
każda po audycie adwersaryjnym z pomiarami w realnym Chrome. Stan po v10:
- karty NASYCONE OD RAZU: obwódka w kolorze kategorii 45% w spoczynku
  (hover 60-65%) + TOP-GLOW 1:1 ze zmierzonego wzorca (gradientowa górna
  krawędź, jaśniejsza na środku); koniec bladości — 12 sekcji zmigrowane
  z lokalnych bladych hexów na podbitą paletę wg mapowania w inf-kategorie
  (#67e8f9->#61edff itd.), grep starych hexów = 0 także na produkcji;
- 19 kolorowych fragmentów H2 (.inf-grad-text, gradient wzorca
  #00f0ff->#ff00e5->#b026ff), tekst 1:1, shimmer tylko desktop;
- dropdown 0.92 (produkcja potwierdzona), gap siatek 32->20/16px,
  persona hero w karcie, liczniki (chip 8,7% + 5 rejestrów) restartują
  przy każdym wejściu w kadr przez JEDNĄ pętlę licznikTicker;
- nietknięte inwarianty: hover karty bez zmiany tła, tło jednolite,
  H1 nad foldem (1440x900 zapas 72px, 1366x768 zapas 39px), maszyna
  pisania, zero 404 w menu, mobile bez poziomego scrolla.
Agent głosowy: DZIAŁA (200 + token). Wnioski audytu domknięte przed
wdrożeniem (paleta sekcji + 2 nieaktualne komentarze).

---

# STATUS — INFINITY v6 — NA PRODUKCJI (commit a5f35c1, 18 plików, +1238/-269)

DOWODY Z PRODUKCJI (www.simplefast.ai, po deployu):
- maszyna pisania ZŁAPANA W TRAKCIE na zrzucie: „Buduj|em" z kursorem,
  wcześniej zmierzona na localhost co 160 ms: 3 litery @169 ms → 30 @1927 ms;
- karty w języku wzorca: rgba(6,6,12,.5) + biel 7%, gwiazdy prześwitują,
  kafle z poświatą w kolorze kategorii (cyjan/fiolet/bursztyn), mono etykiety
  i strzałki w pełnym nasyceniu, narożniki [ ] zostały;
- podstrona /uslugi/chatboty: te same karty (zrzut kroku „Diagnoza") —
  „naczynia połączone" domknięte;
- /wiedza-agenta.txt: HTTP 200, 15 938 znaków, text/plain UTF-8;
- /api/elevenlabs-session: 503 elevenlabs_not_configured = funkcja żyje,
  czeka na klucz (zgodnie z oczekiwaniem, ENV po stronie Pawła).

# STATUS — INFINITY v6 — etapy rundy

Runda v6 = feedback Pawła po v5. Etapy:
- [DONE] A rozświetlenie kart wg POMIARÓW wzorca infinitytechstack.uk
  (zmierzone getComputedStyle, nie na oko): .inf-card tło rgba(6,6,12,.5)
  zamiast solidnego, obwódka bieli 7%, wash 135° w kolorze karty; .inf-tile
  tło 14% / obwódka 28% / glow 0 0 18px -4px 55%, glif w pełnym kolorze;
  mono napisy i badge z text-shadow glow; strzałki w kolorze karty.
- [DONE] B maszyna pisania H1 — NAPRAWIONY START (mechanizm liter nietknięty).
  Przyczyna zniknięcia efektu: po v5 blob agenta zepchnął H1 tak, że był
  częściowo widoczny przy załadowaniu, więc stary IntersectionObserver
  (threshold .25, rootMargin -10%) odpalał pisanie natychmiast po hydration
  i animacja kończyła się, zanim użytkownik spojrzał. Teraz: widoczny przy
  starcie → pisanie po 700 ms (z ponownym sprawdzeniem widoczności), poza
  widokiem → obserwator + zapasowy nasłuch scrolla. Scramble dołożony na 5
  przyciskach dropdownów. DOWÓD (localhost, próbkowanie co 160 ms):
  3 litery @169 ms → 6 @326 → 9 @483 → … → 30 @1927 ms, kursor przy ostatniej.
- [DONE] C wiedza agenta przepisana pod TĘ stronę + ZABEZPIECZENIA.
  Stara była kopią 1:1 z 10K: opisywała tamte usługi i trasy (404 u nas).
  Teraz 11 naszych usług, ceny publiczne (1490 / 1990 / 350 zł-h / ryczałty
  3000-5500-10000), founderzy, miasta — każdy fakt zgrepowany w rejestrach.
  NAV_MAP i NAV_CLIENT: 24 pozycje, te same id w tej samej kolejności.
  public/wiedza-agenta.txt = dokument do KNOWLEDGE_DOC_URL.
- [DONE] D podstrony: przyczyną „starego stylu" był komponent Card
  renderujący .sf-glass (biel 4% + blur), pominięty przez rozświetlenie.
  .sf-glass przeszedł na rgba(6,6,12,.62) + biel 7% + wash; .sf-rim-gradient
  (karta wyróżniona) też — solidny granat #101a30 dawał 4,21:1, czyli
  PONIŻEJ AA. Tabele cennika, obiekcji i 23 tabele treści na styl katalogowy.
- [DONE] Audyt adwersaryjny (qa-auditor) — werdykt NO-SHIP, naprawione:
  * KOLIZJA DWÓCH STRON (najgroźniejsze, znalezione przy weryfikacji audytu):
    plik przyszedł z 10K razem z nazwą agenta „SFAI Voice Agent", nazwą
    narzędzia „navigate_to" i prefiksem dokumentów „SFAI Wiedza ". Przy
    wspólnym ELEVENLABS_API_KEY (jeden workspace) nasz kod (a) adoptowałby
    agenta 10K bez zmiany promptu, więc nasza wiedza i ZABEZPIECZENIA nigdy
    by nie zadziałały, (b) PATCH-owałby wspólne narzędzie na nasze sekcje,
    psując nawigację tamtej stronie, (c) sprzątanie KB SKASOWAŁOBY dokumenty
    wiedzy tamtej strony. Teraz wszystko zawężone: agent „SimpleFast.ai WWW
    Agent", narzędzie navigate_to_www (nazwa jedzie do klienta w payloadzie
    sesji, alias navigate_to zostaje), prefiks „SFAI WWW Wiedza ".
  * .sf-rim-gradient poniżej AA → migracja tonalna (wyżej).
  * brak fallbacku rgba przy glow badge; martwa gałąź startu maszyny bez
    zapasowego wyzwalacza; nieaktualne komentarze o PATCH promptu i #diagnoza.
- [TODO] deploy + weryfikacja produkcji + PSI + zrzuty dla Pawła.

KOLEJNOŚĆ URUCHOMIENIA GŁOSU (ważna, agent tworzy się RAZ):
1) deploy (żeby /wiedza-agenta.txt było pod adresem),
2) w Vercelu projektu sfai-new dodać ELEVENLABS_API_KEY (konieczna)
   + KNOWLEDGE_DOC_URL=https://www.simplefast.ai/wiedza-agenta.txt
   (+ opcjonalnie ELEVENLABS_VOICE_ID, ELEVENLABS_LLM),
3) Redeploy, dopiero potem pierwsza rozmowa głosowa — przy niej kod tworzy
   agenta z pełną konfiguracją z repo. Późniejsza zmiana wiedzy w repo
   wymaga skasowania agenta w dashboardzie (kod odtworzy) albo ręcznej
   edycji promptu, bo dashboard jest źródłem prawdy dla istniejącego agenta.

Raport SEO z danych GSC/Bing: raporty/raport-seo-2026-08-07.md.

---

# STATUS — INFINITY v5 — NA PRODUKCJI (commit b6d8e0c, 64 pliki, +5552)

Zweryfikowane: voice agent 1:1 z 10K w hero (blob „Zapytaj AI" → konsola
„Agent wiedzy firmy" czat/głos, FAB globalny; /api/elevenlabs-session na
produkcji odpowiada 503 = funkcja działa, CZEKA NA ENV), dropdowny
przezroczyste (widać stronę pod spodem) z emoji + badge mono po prawej,
liczniki, walec cytatów, karty AEO, spójne podstrony. Mobile 375: overflow
0, blur 0. PSI live mobile: **83** / A11y 100 / BP 100 / SEO 100
(FCP 1,4 s, LCP 4,1 s, TBT 20 ms — najniższy w historii, CLS 0).
CZEKA NA PAWŁA: w Vercelu projektu sfai-new dodać env z projektu
website-10k: ELEVENLABS_API_KEY (konieczna; głos nie ruszy bez niej)
+ opcjonalne: ELEVENLABS_VOICE_ID, ELEVENLABS_AGENT_NAME, ELEVENLABS_LLM,
KNOWLEDGE_DOC_URL → Redeploy. Prompty agenta dopracujemy po uruchomieniu.

---

# STATUS — INFINITY v5 plan (wykonany, wf_30a5e36f)

Feedback Pawła po v4 (dyktando: JAKOŚĆ > TEMPO, sprawdzać przed wdrożeniem):
1) VOICE AGENT z 10K przenieść 1:1 DO HERO zamiast lemniskaty (pełna
   struktura: api/elevenlabs-session.mjs + _knowledge + agent-console.js
   947 linii + AgentConsole/FlowCore; /api/*.mjs = vercelowe functions obok
   Nexta; dep @elevenlabs/client 1.15.2; ENV do skopiowania w Vercelu
   z projektu 10K: ELEVENLABS_API_KEY [+ opcjonalne VOICE_ID/AGENT_NAME/
   LLM/KNOWLEDGE_DOC_URL]; „prompty dopracujemy później").
2) Dropdowny PRZEZROCZYSTE (rgba .72 + blur), wiersze emoji NATYWNE +
   opis + BADGE mono po prawej (istniejące pola), CTA: zielona obwódka +
   niebieskie litery → hover białe świecące (nav i ghost).
3) Home: symetria Problem, cytaty jako WALEC 3D (obracający się bęben,
   ~260px, RM crossfade), sekcje AEO w dwóch kartach obok siebie,
   tile hover rotate -15°+scale, pulsujące kropki statusów, kolejność
   sekcji przemyślana (opowieść).
4) PODSTRONY — pełna spójność z home (naczynia połączone): wszystkie
   huby/wpisy/o-nas/kontakt na karty inf + mechanizmy + tabele.
Spec: scratchpad/spec-infinity-v5.md. Partie: A voice (effort max) /
B nav (właściciel globals w tej rundzie) / C home / D podstrony.
Po merge: build, PEŁNA weryfikacja przeglądarką (desktop+mobile, dropdowny,
walec, konsola agenta — lokalnie /api/*.mjs nie działa, test na Vercelu),
deploy, PSI, instrukcja env dla Pawła.

---

# STATUS — INFINITY v4 — zastąpiony przez v5 (commit 800a209)

Zweryfikowane live + lokalnie: lemniskata 3D „pływające DNA" (wspólny moduł
lib/lemniskata.ts: z-oplot, tilt 18°, projekcja; desktop glow, MOBILE
HeroLoopLite 2×48 kropek 30fps — nowy budżet Pawła), tło wróciło (Section
base=transparent — solidne bg kryło fixed-warstwy), dropdown JEDEN naraz,
karty: sweep ::after wszędzie + narożniki [ ] + fluorescencyjny hover +
odcienie per karta, PromoUslugi po hero (chatboty FULL + voiceboty/audyt +
architekci; treść 1:1 z USLUGI), NarzedziaTeaser, ciemna karta cytatów
(jasna wyspa OUT z home), voice-blob FlowCore (zielona aura „Zapytaj AI" →
link na żywego voicebota), scramble na nav/tytułach (zasady site.js 1:1),
CTA nav outline→hover wypełnienie. Mobile 375: overflow 0, 2 canvasy-lite,
blur 0. PSI live mobile: **84** / A11y 100 / BP 100 / SEO 100 (FCP 1,2 s,
LCP 4,1 s, TBT 50 ms, CLS 0) — LEPIEJ niż v3 (82) mimo animacji na mobile.

---

# STATUS — INFINITY v4 plan (wykonany, wf_07983546)

Feedback Pawła po v3 (decyzje WPROST): lemniskata do przebudowy na 3D
„pływające DNA" (płaska = „odrażająca"), ŚCIŚNIĘTA (~300px, nie pół ekranu),
fluorescencyjna, ANIMOWANA TEŻ NA MOBILE (ZMIANA BUDŻETU: mobile dostaje
2 lekkie canvasy — lemniskata-lite + voice-aura-lite; DPR 1, bez shadowBlur,
30fps, pauza IO/hidden; po deployu pomiar PSI, degradacja jeśli <75);
BUG dropdownów (nachodzą — jeden otwarty naraz); TŁO znikło (diagnoza:
sekcje home mają solidne bg-bg kryjące fixed-warstwy → tone base=transparent);
karty: rozbłysk ::after na KAŻDEJ (overflow:hidden), fluorescencja, RÓŻNE
odcienie per karta, mono podtytuł, narożniki [ ]; STRUKTURA: po hero
promo-kafelki usług wg SEO (chatboty full + voiceboty/audyt + architekci),
narzędzia-teaser na home, biała karta cytatów → ciemna, sekcje
„H2+opis+grid"; voice-blob „Zapytaj AI" (port FlowCore.astro z folderu
SF AI WWW 10K) zamiast znaku w „Wolisz posłuchać" → link na drugą stronę;
scramble-text z site.js 10K (nav + tytuły); CTA nav = Hire-Me-style
(outline→hover wypełnienie). Spec: scratchpad/spec-infinity-v4.md.
4 partie: A fundament / B lemniskata 3D / C struktura home / D blob+scramble.
Po nich: scalenie, build, weryfikacja (NOWA karta Chrome przy injection-
timeout!), deploy, PSI mobile.

---

# STATUS — INFINITY v3 „kopia" — zastąpiony przez v4 (commit 924803c)

Zweryfikowane live: lemniskata ∞ przeplata się (fix mojego autorstwa: nitka
przesunięta o π pokrywała TEN SAM zbiór punktów środkowosymetrycznego toru —
dodany oplot ±9px·sin(3t) w przeciwfazie, SVG i canvas), dropdowny hover
z ikonami SVG dla 5 pozycji nav, liczniki 10/4/8/5/14 (prawdziwe .length),
zdjęcia OUT (zero <img> w main poza logo), voicebot → druga strona Pawła
(target=_blank), kratka OUT. Mobile 375: overflow 0, canvas 0, blur 0
(lemniskata = statyczny SVG z buildu).
SEO wdrożone i wysłane: FAQ chatboty (frazy „ile kosztuje chatbot AI dla
firmy"), „bot telefoniczny" w voicebotach, meta descriptions ≤155, linki
wewnętrzne blog→usługi, IndexNow PING wykonany: HTTP 202, 46 adresów.
PSI live po v3: mobile 82 / SEO 100 / A11y 100 / Best Practices 100
(FCP 1,3 s, LCP 4,0 s, TBT 160 ms, CLS 0). Względem warunku (baza 73) +9;
względem v2 (90) −8 (LCP +0,4 s przez większy hero — kandydat na szlif:
content-visibility/rozmiar SVG lemniskaty; NIE blokuje).
UWAGA weryfikacyjna: karta Chrome potrafi zawiesić mostek rozszerzenia
(injection timeout mimo żywej strony) — test w NOWEJ karcie przed diagnozą.

--- (plan rundy niżej, wykonany)
# STATUS — INFINITY v3 „kopia" (2026-08-06 noc) — plan (wf_7931ba3c)

Decyzje Pawła po v2 (WPROST): ZDJĘCIA WYLATUJĄ z całej strony („nie są nam
potrzebne"); KRATKA .inf-grid WYLATUJE („background spierdolony, jakaś
kratka") — to zamyka finding impeccable codex-grid-background (usunięcie =
fix); hero WYŚRODKOWANE z wielką animacją POD paskiem (lemniskata ∞ z kropek
cyan/magenta + linie łączące, mobile = statyczny SVG); emoji → UNIKALNE SVG
ikony w kaflach (InfIcons ~24 szt.); dropdowny z kaflami dla WSZYSTKICH
pozycji nav; karty w stylu /produkty wszędzie (pełne podświetlenie + błysk +
ikona scale/brightness + strzałka pojawia się na hover); CTA hover = BIAŁE
podświetlenie; pasek PRAWDZIWYCH liczników z rejestrów (.length — zero
zmyślonych liczb); voicebot → link na drugą stronę Pawła
https://sfai-webseite-10k-look.vercel.app/ (żywy voicebot); SEO: Paweł
ZATWIERDZIŁ wdrożenie WSZYSTKICH rekomendacji raportu (FAQ chatboty, fraza
„bot telefoniczny", meta descriptions ≤155, linkowanie wewnętrzne, IndexNow).
Spec: scratchpad/spec-infinity-v3.md. 4 partie: A fundament+nav (ikony,
dropdowny, karty v3, grid-out, mgławice), B hero (centered + lemniskata +
liczniki), C sekcje (zdjęcia-out + voicebot link), D SEO-treści (lib/**,
IndexNow). Po nich: scalenie, build, weryfikacja przeglądarką (KARTA NA
WIERZCHU!), deploy, PSI, ping IndexNow + sitemapa w Bing.

---

# STATUS — INFINITY v2 (2026-08-06 wieczór) — zastąpiony przez v3

Punch list Pawła po v1 wdrożony (commit a574555 + fix logo):
płynąca obwódka paska (magenta→violet→cyjan, 3 s pętla), linki wyszarzone
z cyjanowym hover, dropdown na HOVER jednym przyciskiem (chevron 180°,
"Wszystkie usługi" w DOM, "Architekci" usunięci, NATYWNE EMOJI w kaflach),
paleta Infinity 1:1 (bg #06060c, surface #111127, accent #22d3ee/+#8b5cf6),
błysk + spotlight na kartach, glow kursora w tle (kropki rozświetlają się),
stare warstwice hero usunięte, logo 36 px (UWAGA: h-9 w tym repo = 96 px,
spacing ma własne tokeny!), podstrony w języku INFINITY (Section
tone="transparent", karty z lib/inf-kategorie.ts). Mobile: 0 canvas/blur/
overflow, animacja obwódki wyłączona. Równolegle: fix SEO kanonicznej domeny
www (e5a8b39) + raport raporty/raport-seo-2026-08-06.md (GSC/Bing/Ahrefs/
Umami; 7 rekomendacji czeka na zgodę Pawła).
LEKCJA WERYFIKACJI: uśpiona karta Chrome mrozi IO/transitions — listingi
wyglądają na "puste" na zrzutach z ukrytej karty; sprawdzać na wysuniętej.

---

# STATUS — REDESIGN "INFINITY" v1 (2026-08-06) — zastąpiony przez v2

WYNIK: commit 16c25bd (29 plików, +2007/-265) wypchnięty, Vercel LIVE
(potwierdzone markerami inf-pill-nav/mark/inf-ask w produkcyjnym HTML
+ zrzut hero z produkcji). Weryfikacja przeglądarką: desktop sekcja po
sekcji (pigułka nav + ring gradientu po moim fixie przebicia poświaty,
dropdown kafelkowy, particles+wstęga działają, terminal, tabela równa,
zdjęcia w kadrach bez upscale, cennik, cytaty, formularz, czat mono),
mobile 375: overflow 0, canvasy 0, blur 0. Konsola 0 błędów.
PSI live po wdrożeniu: MOBILE 90 (było 73! LCP 7,5→3,6 s, TBT 40 ms,
CLS 0), desktop 82 (TBT 240 ms od canvasów po load — świadomy koszt),
A11y 100/97, SEO 100. Warunek "bez pogorszenia" przebity o +17 pkt.

Paweł ocenił ŚWIAT B na 0/10. Nowy wzorzec: infinitytechstack.uk ("chcę dokładnie
tak jak ta"). Spec ekstrakcji: scratchpad/spec-infinity.md (zmierzone wartości:
tło #06060c, Inter 900, mono-akcenty, pigułka nav blur+glow, 2 canvasy:
interaktywne kropki tła + wstęga hero). Adaptacja: NASZE kolory marki (trasa
blue→violet→green), NASZE treści 1:1, logo graficzne WRACA do headera.
Bugfixy zgłoszone: rozmazane zdjęcia (upscale >1400px), rozjechana tabela,
brak logo. Perf: canvasy tylko desktop-lazy przez MotionGate; mobile czysty CSS.

Workflow wf_24843045-b98: FUNDAMENT (globals/layout/tailwind) → równolegle
HERO+NAV / SEKCJE / MOTION / CHAT+TOOLS. Po ich raportach: scalenie kontraktów
CSS, build, weryfikacja przeglądarką sekcja po sekcji, mobile 375, commit, push,
live + Lighthouse.

---

# STATUS — ŚWIAT B "Ciemna pracownia": pełny redesign (2026-08-05)

Zlecenie Pawła: wdrożyć koncept B (ciemna pracownia) z zaakceptowanych makiet
(zrodla/makiety-b/1-5), kolory + przejścia + animacje, strona "wow", SEO/AI-SEO
i teksty NIETKNIĘTE, szybkość w Google Speed Insights bez pogorszenia.
Maszyna do pisania H1 = NIETYKALNA (sygnatura Pawła).

## Etapy
1. [DONE] Makiety: 3 koncepty → Paweł wybrał B; 5 makiet sekcji (hero, problem,
   proces, oferta, finał) w zrodla/makiety-b/.
2. [DONE] Implementacja równoległa 2 agentów (25 plików, +1069/-410):
   partia A fundament (globals.css :root ciemny navy-950, [data-theme='light']
   wyspy, .sf-glass, .sf-rim-gradient, .sf-route, .sf-header, wordmark tekstowy,
   hero dolny-lewy, typewriter z zielenią #63F000), partia B sekcje wg makiet
   (Problem BLEED + biała karta cytatów, JakToDziala trasa + węzły kompasu,
   Oferta 1/3+2/3 szkło + rim, FinalneCTA pełna trasa z kropką).
3. [DONE] Weryfikacja przeglądarką sekcja po sekcji (desktop): hero z pełnym
   gradientowym H1, biała wyspa, terminal AgentDemo pisze, pin procesu scrubuje
   karty 1→2→3, badge cennika NIEprzycięty, FAQ otwiera się, formularz na ciemnym,
   stopka, 404, /uslugi/chatboty — wszystko w świecie B. Konsola: zero błędów.
4. [DONE] FIX mobile: 14px poziomego scrolla na 375px — poświata
   .sf-rim-gradient::before (inset -34px) rozpychała dokument; overflow-x-clip
   na sekcji Oferty. Po fixie 375/375, overflow 0 (dowód: scrollWidth).
5. [DONE] Commit 15014db wypchnięty; live potwierdzone (theme #0b1220,
   sf-header, sf-rim-gradient w HTML produkcyjnym).
6. [DONE] Wydajność po wdrożeniu — POMIAR (dowody):
   - PSI live mobile: PERF 73, FCP 1,3s, LCP 7,5s, TBT 60ms, CLS 0; desktop
     FCP 0,3s / LCP 0,8s. A11y 97, Best Practices 92, SEO 100.
   - Lokalny A/B (ta sama maszyna, build prod): baseline 803f7a3 PERF 59 /
     LCP 4,7s / TBT 780ms vs świat B PERF 52-53 / LCP 4,7-5,0s / TBT ~1200ms.
     TBT-delta NIE materializuje się u Google (60ms live) — artefakt 4x throttlingu.
   - LCP identyczne przed/po → redesign NIE pogorszył LCP.
   - USTALENIE: elementem LCP jest H1 maszyny pisania (h1.sf-write) — litery
     niewidoczne do dopisania, LCP czeka na koniec animacji (elementRenderDelay
     1,7s lokalnie, ~6s na throttlingu PSI). To stan sprzed redesignu; to ON
     ogranicza PSI mobile do ~73. Możliwy fix bez zmiany mechanizmu (SSR-widoczne
     litery przy pierwszym paintcie, typing po hydracji — LCP spada do ~1,5s,
     kosztem mignięcia pełnego H1 na wolnych telefonach) — DECYZJA PAWŁA.

7. [DONE 2026-08-05] GSC przez konto usługi DZIAŁA (API włączone przez Pawła):
   pierwszy raport oddany — 28 dni: 18 klik / 1139 wyśw / CTR 1,6% / śr. poz. 22,7.
8. [DONE 2026-08-05] Umami live i ZBIERA (dowód: gateway.umami.is/api/send → 200).
   Po drodze złapany bug: beacony szły na gateway.umami.is, a CSP przepuszczał
   tylko api-gateway.umami.dev (nieaktualne) → fix connect-src *.umami.is
   (commit 8be66f5). Website ID jest z założenia publiczne (i tak siedzi w HTML).
9. [DONE 2026-08-05] Kreska FAQ na scaleY zamiast height (hook impeccable),
   commit 1883e0d; zweryfikowane w realnym Chrome (uwaga: ukryta karta mrozi
   DocumentTimeline — transition wisi na 0; weryfikować na wysunietej karcie).

## Czeka na Pawła
- Decyzja: fix LCP maszyny pisania (opcja B powyżej) — tak/nie.
- Ahrefs Webmaster Tools: wybrać "Import from GSC" (instrukcja podana).
- "Pandy → robociki pixel-art z uściskiem dłoni": NIE ZNALEZIONE w żadnym repo
  (SF WWW, KNF, Fizjoplan, Papi) — czekam na wskazanie, gdzie ta animacja jest.

## Otwarte drobiazgi (nie blokują)
- PNG logo 1.4-1.8MB w public/brand (kandydat do kompresji)
- martwy kod: VideoBackground, bg-metal-sheen, bg-scrim-* (po ŚWIECIE B sprawdzić
  też nieużywane klasy jasnego świata)
- --ease-spring (bounce) w tokenach — do decyzji Pawła
- audyt impeccable nowego globals.css (obiecany post-merge)

## Kontekst techniczny (dla wznowienia)
- Ostatni commit: 15014db (ŚWIAT B + fix overflow + tools/)
- tools/: gsc-raport.js, gsc-sites.js, bing-raport.js (klucze TYLKO ze ścieżki,
  zero sekretów w repo); klucz GSC: C:\Users\Paweł Pieloch\.sekrety\
  simplefastai-seo-e271ff1f5e28.json; Bing: .sekrety\bing-api-key.txt
- Makiety świata B: zrodla/makiety-b/1-hero.png … 5-final.png (gitignore)
- Raporty Lighthouse A/B w scratchpadzie sesji (lh-baseline/lh-swiatb*/lh-full.json)
