# PLAN ANIMACJI (ZESPÓŁ 2, SYSTEM RUCHU)

Data: 2026-08-07. Autor: zespół 2 briefu v8. Faza analityczna, zero edycji kodu.
Wzorzec: infinitytechstack.uk (pomiary z briefu traktowane jak fakty).
Stan wejściowy: PSI mobile 81 do 83, TBT 150 ms, LCP = maszyna pisania H1.

UWAGA: `app/globals.css` jest zmieniany równolegle przez rundę v7, więc wszystko
poniżej opisuję po NAZWACH klas i zachowaniu, nigdy po numerach linii.

---

## 0. Streszczenie w 10 zdaniach

1. Mamy dziś 22 zestawy klatek CSS i 14 wysp JS z ruchem, ale nie mamy systemu:
   te same rzeczy robią dwie różne reguły, a cztery komponenty ruchu są martwe.
2. Największa dziura wobec wzorca: reflektor za kursorem NIE ISTNIEJE na stronie
   głównej, bo żadna sekcja home nie renderuje `<div class="inf-spotlight">`
   (zero wystąpień w `components/sections/*`), a JS w `MotionOrchestrator`
   ustawia `--mx/--my`, których nic nie maluje. To jest dokładnie skarga 1
   Pawła: „zwykłe podświetlenie".
3. Hover karty rozjeżdża się z pomiarem wzorca w czterech wartościach naraz:
   wzorzec NIE zmienia tła, my zmieniamy je na `rgba(24,24,64,.45)`; wzorzec
   podnosi o 5 px ze skalą 1.008, my o 3 px bez skali.
4. Każda karta reaguje tak samo, także karta, w którą nie da się kliknąć, co
   łamie zasadę zapisaną w naszym własnym CSS („karta NIEklikalna NIE MOŻE się
   unosić") i daje wrażenie braku struktury (skarga 1).
5. Separatorów wzorca (linia fiolet 15 %, iskra 4 s, etykieta mono) nie mamy
   wcale: mamy biały włos `.sf-rule` bez etykiety i bez iskry, użyty na 3 z 16
   sekcji home.
6. Przejścia między sekcjami są binarne (element wchodzi albo nie), a pasy tonu
   `.inf-sec-subtle` mają twardą krawędź, stąd „podział za wyraźny".
7. Liczniki liczą raz i milkną: `LicznikValue` (hero) tylko na desktopie,
   `AnimatedMetric` wszędzie, oba z osobnym `requestAnimationFrame`.
8. Na mobile płacimy dziś za ruch, którego wzorzec nie ma: pierścień
   `.card-aura` (conic + `@property`, udokumentowany w repo jako zabójca LCP),
   5 pulsujących kropek `.inf-sub-dot` bez bramki szerokości i walec cytatów,
   który tyka co 4 s także wtedy, gdy jest poza ekranem.
9. Plan porządkuje ruch w 4 poziomy (tło, wejście sekcji, kursor, mikroruch),
   przypisuje każdemu twarde czasy, jedną krzywą i twarde bramki, a nowe pętle
   dopuszcza wyłącznie na `transform`, `opacity` i `text-shadow`.
10. Cały pakiet P0 i P1 to zmiany CSS bez ani jednego nowego kilobajta JS na
    mobile, a P0 dodatkowo ZDEJMUJE z mobile trzy pętle, które dziś biegną.

---

## 1. INWENTARYZACJA: co mamy dziś

Legenda bramek: `RM` = `prefers-reduced-motion: reduce`, `HC` = forced-colors,
`D` = tylko desktop od 1024 px, `M` = działa też na mobile, `H` = tylko
`hover: hover` i `pointer: fine`, `SD` = Save-Data.

### 1.1 Pętle ciągłe (animation: infinite)

| Klatki | Klasa / miejsce | Plik konsumenta | Czas, krzywa | Bramki | Mobile | Uwaga |
|---|---|---|---|---|---|---|
| `infStarsDrift` | `.inf-stars` | `app/layout.tsx` | 120 s linear alternate | D + no-preference | nie | transform, tanie |
| `infNebulaDrift` | `.inf-nebula` | `app/layout.tsx` | 60 s `--ease-in-out` alternate | D + no-preference | nie | transform, blur 90 px rastrowany raz |
| `infRingFlow` | `.inf-pill-nav::before` | `components/layout/*` (nav) | 3 s linear | D + no-preference | nie | animuje `background-position`, jedyny taki wyjątek, mały element |
| `infAskPulse` | `.inf-ask-dot` | `demo/ChatAgent`, `ChatDemo`, `ChatLauncher` | 2,4 s `--ease-in-out` | D + no-preference | nie | `box-shadow` na kropce 8 px |
| `infAskPulse` | `.inf-sub-dot` | `sections/NarzedziaTeaser.tsx` (5 kart) | 2,4 s | **tylko H, BEZ bramki 1024 px** | tak na hover-capable | BŁĄD BUDŻETU, patrz P0-6 |
| `sfAuraSpin` | `.card-aura::before` | `sections/AgentDemo.tsx` (1 karta) | 10 s linear (zmienne `--aura-spin-dur`) | globalna RM, pauza IO | **tak** | conic + `@property`, w repo opisany jako przyczyna LCP 7 s |
| `sfAuraBreathe` | `.card-aura` | jw. | 8 s `--ease-in-out` | jw. | **tak** | animuje `box-shadow` |
| `sfCaretBlink` | `.sf-write-letter.sf-caret::after` | H1 hero | 0,85 s `steps(1,end)` | RM, HC | tak, ~2,9 s | sygnatura, NIE RUSZAĆ |
| `sfCaretBlink` | `.sf-demo-caret` | `sections/AgentDemo.tsx` | 0,85 s | RM | tak | biegnie bez końca |
| `sfTyping` | `.sf-typing i` (3 kropki, delay 0 / 160 / 320 ms) | `sections/AgentDemo.tsx` | 1 s ease-in-out | RM | tak | 3 pętle naraz |
| `sfFloat` | `.sf-float` | `components/o-nas/OnasSymbolika.tsx` | 6 s `--ease-in-out` | globalna RM | tak | tylko /o-nas |
| `sfMetalSheen` | `.bg-metal-sheen` | `components/ui/VideoBackground.tsx` | 20 s | globalna RM | n/d | **MARTWE**, `VideoBackground` nie jest nigdzie montowany |
| `sfTickSpin` | `.sf-tickring` | `components/motion/HeroContours.tsx` | 120 s linear | RM, `display:none` poniżej 640 px | n/d | **MARTWE**, `HeroContours` nie jest renderowany |
| `voice-*` (5 zestawów) | konsola i blob agenta | `components/agent/flow-core.css`, `agent-console.css` | 2 do 12 s | RM w plikach agenta | tak, gdy konsola otwarta | poza zakresem tego planu (własność: agent) |

### 1.2 Wejścia jednorazowe

| Klatki / przejście | Klasa | Konsument | Parametry | Bramki |
|---|---|---|---|---|
| `sfRevealIn` | `[data-reveal-eager]` | `motion/Reveal.tsx` (`eager`) | 560 ms `--ease-out`, y 20 px | RM |
| przejście | `[data-reveal]` | `motion/Reveal.tsx` | opacity 420 ms + transform 560 ms, y 20 px | RM, IO `rootMargin 0 0 -10% 0` |
| przejście | `[data-reveal-variant="header"]` | jw. | 480 / 720 ms, y 30 px | jw. |
| przejście | `.sf-stagger > *` | 24 miejsca | opóźnienia 0 / 70 / 140 / 210 / 280 / 320 ms | RM |
| `sfPageIn` | `.sf-page-enter` | `app/template.tsx` | 280 ms | RM |
| `sfRouteDraw` | `.sf-route-enter` | `sections/Hero.tsx` | 900 ms, delay 420 ms | RM |
| `sfPersonaIn` | `.sf-persona-swap` | `sections/HeroPersonaCycler.tsx` | 620 ms | RM |
| `sfMenuIn` | `.sf-menu-pop` | brak konsumenta | 140 ms | **MARTWE** |
| `sfBaselineDraw` | `.sf-hero-rule` | brak konsumenta | 900 ms | **MARTWE** |
| `sfFaqOpen` | `details[open] > p/div` | fallback bez `interpolate-size` | 260 ms | RM |
| `sfBarGrow` | wykres słupkowy | `components/narzedzia/WykresSlupkowy.tsx` | skala Y | RM |
| przejście | `.sf-plate-media` clip-path | `ui/SectionImage.tsx` | 760 ms, delay 60 ms | RM |
| `sfRuleDraw` | `.sf-rule` | `ui/Section.tsx` `seam` (3 sekcje home) | scroll-driven `view()`, entry 10 do 90 % | RM, `@supports` |
| `sfImgDrift` | `.sf-img-parallax` | `ui/SectionImage.tsx` | scroll-driven `view()`, entry 0 do exit 100 % | RM, `@supports` |

### 1.3 Reakcja na kursor (transition)

| Element | Co robi dziś | Czas | Bramka |
|---|---|---|---|
| `.inf-card:hover` | y -3 px, **tło na `rgba(24,24,64,.45)`**, obwódka 70 % koloru, glow 26 px 30 % + 40 px -12 px 40 % | 220 ms `--ease-out` | H |
| `.inf-card::after` (sweep) | pas 38 % skew -18°, biel 6 %, left -40 % do 120 % | 600 ms | H |
| `.inf-card::before` (pasek akcentu) | opacity .5 do 1 | 220 ms | H |
| `.inf-card .inf-arrow` | opacity 0 do 1, x -4 px do 0, glow 12 px 45 % | 220 ms | H |
| `.inf-tile` w karcie | **DWIE sprzeczne reguły**: `scale(1.12)` i `rotate(-15deg) scale(1.15)`; wygrywa późniejsza (rotate) | **DWA czasy**: 220 ms w `@layer`, 300 ms poza | H + no-preference |
| `.inf-spotlight` | radial 320 px, kolor karty 12 %, opacity 0 do 1 | 300 ms | H, **na home ZERO konsumentów** |
| `.inf-shine::after` | duplikat sweepa karty | 600 ms | H, 4 konsumenci poza home |
| `.card-lift:hover` | y -4 px, `--shadow-md` | 220 ms | H |
| `.card-live:hover` | obwódka + kreska górna `scaleX 0 do 1` | 220 / 320 ms | H |
| `.sf-glass.card-live/.card-lift:hover` | obwódka 55 % koloru, glow 20 px 22 % | 220 ms | H |
| `.sf-plate-hover img` | scale 1.04, brightness 1.08 | 700 ms | H + no-preference |
| `.sf-cta:hover` | przesuw połysku, cień akcentu | 520 / 350 / 140 ms | RM |
| `.sf-arrow` | x +4 px | 220 ms | RM |
| `.nav-link::after`, `.u-slide` | podkreślenie od lewej | 220 ms | RM |
| `.sf-faq` | wysokość `block-size` 300 ms + opacity 200 ms, kreska `scaleY` 220 ms | 200 do 300 ms | RM |
| `.inf-ask`, `.inf-range-pill` | obwódka, glow, y -1 px | 140 do 220 ms | RM |

### 1.4 Wyspy JS z ruchem

| Komponent | Co robi | Pętla | Bramki | Mobile |
|---|---|---|---|---|
| `motion/MotionGate.tsx` | bramka warstwy ruchu | brak | D, po `window.load`, bez RM i SD | nie |
| `motion/MotionOrchestrator.tsx` | Lenis (lerp .1) + GSAP ScrollTrigger, pin „Jak to działa" (+=140 %, scrub .6), scrub tekstu (opacity .18 do 1, stagger .25), delegowany `pointermove` dla `--mx/--my` | 1 rAF (ticker GSAP niesie Lenis) | jw., zdublowane | nie |
| `motion/ParticlesField.tsx` | 140 kropek, glow kursora 260 px, rozświetlanie 180 px | 1 rAF, 24 fps w bezruchu, DPR 1.5, pauza `hidden` | D | nie |
| `motion/VoiceAura.tsx` | shader WebGL bloba agenta | 1 rAF, pauza IO i `hidden`, DPR 1.15 mobile | tylko RM i SD | **tak** |
| `motion/HeroRibbon.tsx` | lemniskata 2×96 kropek | 1 rAF | D | nie |
| `motion/HeroLoopLite.tsx` | lemniskata mobilna 2×48, 30 fps | 1 rAF | poniżej 1024 px | brak konsumenta |
| `motion/InfinityLoopStatic.tsx` | statyczne SVG lemniskaty | brak | brak | brak konsumenta |
| `motion/HeroContours.tsx` | warstwice hero + pierścień | CSS | brak | brak konsumenta |
| `motion/WritingTrigger.tsx` | maszyna pisania, 48 ms na literę, ogon kursora 1350 ms, start 700 ms po hydracji | `setTimeout` | RM | tak, sygnatura |
| `motion/ScrambleText.tsx` | dekodowanie glifami, krok 56 ms, całość 500 ms | `rAF` na czas przebiegu | bez RM, bez `max-width:760px`, bez `pointer:coarse` | nie |
| `motion/AnimatedMetric.tsx` | count-up 1200 ms easeOutExpo, RAZ | rAF na instancję | RM, IO `-15 %` | **tak** |
| `sections/HeroLicznikiCountUp.tsx` | count-up 1200 ms ease-out cubic, RAZ | rAF na instancję | D, RM, SD, IO threshold .5 | nie |
| `motion/ScrollMetalProgress.tsx` | `scaleX` paska postępu | scroll + 1 rAF (coalesced) | RM | tak |
| `sections/CytatyWalec.tsx` | walec 3D, obrót co 4 s, tryb lite poniżej 760 px | `setTimeout` w pętli | RM i szerokość dla trybu | **tak, także poza ekranem** |
| `effects/AuraDesync.tsx` | rozstraja i pauzuje `.card-aura` | IO + MutationObserver | brak | tak, dla 1 karty |

### 1.5 Martwy ruch (kod żyje, nikt go nie renderuje)

| Element | Dowód |
|---|---|
| `HeroContours.tsx` + `.sf-contour` + `.sf-tickring` + `sfContourDraw` + `sfTickSpin` | brak `<HeroContours` w `app/` i `components/` |
| `HeroRibbon.tsx` | `MotionOrchestrator` renderuje go zawsze na desktopie, ale slot `[data-hero-loop]` zniknął z `Hero.tsx` w v5, więc chunk się ściąga i nic nie robi |
| `HeroLoopLite.tsx`, `InfinityLoopStatic.tsx` | brak konsumenta w `Hero.tsx` |
| `VideoBackground.tsx` + `.bg-metal-sheen` + `sfMetalSheen` | brak konsumenta |
| `.sf-hero-rule` + `sfBaselineDraw` | brak konsumenta |
| `.sf-menu-pop` + `sfMenuIn` | brak konsumenta |
| `.sf-window` | brak konsumenta |
| `initHeroDepth` w `MotionOrchestrator` | brak `[data-hero-field]` w markupie |
| `.inf-shine` (7 wystąpień) | duplikuje sweep `.inf-card::after` od v4, ten sam pas, ten sam czas |

---

## 2. BRAKI WOBEC WZORCA

| # | Wzorzec (pomiar z briefu) | Nasz stan | Różnica do wykonania |
|---|---|---|---|
| B1 | Reflektor `radial-gradient(180px at MYSZ, kolor 8%, transparent 70%)` | na home ZERO, na listingach 320 px i 12 % | dodać reflektor do WSZYSTKICH kart, zmienić 320 na 180 px i 12 na 8 % |
| B2 | Hover: tło się NIE zmienia | zmieniamy na `rgba(24,24,64,.45)` | usunąć zmianę `background-color` z `.inf-card:hover` |
| B3 | Hover: `translateY(-5px) scale(1.008)` | `translateY(-3px)`, brak skali | podnieść do -5 px, dodać skalę 1.008 |
| B4 | Hover: obwódka 60 do 65 % koloru | 70 % | zejść do 62 % |
| B5 | Hover: `0 22px 48px -20px kolor 35%, 0 0 28px kolor 14%, inset 0 1px 0 biel 9%` | `0 0 26px kolor 30%, 0 12px 40px -12px kolor 40%, inset biel 8%` | przepisać 1:1 na wartości wzorca |
| B6 | Narożniki `[ ]` .22 w spoczynku, .6 na hover | stałe 55 %, bez reakcji | rozdzielić na dwa stany i animować |
| B7 | Dolna łuna karty .04 do .08 | nie mamy | dodać jako warstwę tła karty z przejściem |
| B8 | Separator: linia fiolet 15 % + iskra 4 s (cyjan 40 % do magenta 30 %) + etykieta mono .55 rem, tracking .35 em | biały włos bez iskry i bez etykiety, na 3 sekcjach | nowy zestaw `.inf-seam` |
| B9 | „Wszystko mocno zachodzi na siebie" | pasy tonu z twardą krawędzią, wejścia binarne | maska pionowa pasów + wcześniejszy próg wejścia |
| B10 | Liczby duże, mono, w PEŁNYM kolorze karty, żyją | kolor jest OK, ruch tylko raz i tylko desktop | dyrygent liczników, patrz sekcja 4 |
| B11 | Różny ruch dla różnych typów kart | jeden hover dla wszystkich, także dla kart bez linku | 4 typy kart, patrz sekcja 3, L3 |

---

## 3. SYSTEM RUCHU: 4 POZIOMY

### 3.0 Tokeny ruchu (do bloku tokenów w `app/globals.css`)

Istnieją: `--dur-fast 140ms`, `--dur-base 220ms`, `--dur-slow 420ms`,
`--dur-reveal 560ms`, `--dur-reveal-fast 420ms`, `--stagger 70ms`,
`--ease-out cubic-bezier(.16,1,.3,1)`, `--ease-in-out cubic-bezier(.65,0,.35,1)`.

Do dopisania (dziś te liczby są wklejone w regułach jako `0.6s`, `0.3s`, `760ms`):

```
--dur-micro:  120ms;   /* strzałka, kropka, karetka */
--dur-tile:   300ms;   /* kafelek ikony */
--dur-spot:   300ms;   /* wejście i zejście reflektora */
--dur-sweep:  600ms;   /* pas błysku przez kartę */
--dur-plate:  760ms;   /* odsłona zdjęcia w płycie */
--lift-y:     -5px;    /* podniesienie karty klikalnej (wzorzec) */
--lift-s:     1.008;   /* skala karty klikalnej (wzorzec) */
```

ZASADA KRZYWEJ: `--ease-out` obsługuje KAŻDĄ reakcję na gest i każde wejście.
`--ease-in-out` wyłącznie pętle ambient (oddech, dryf). Trzeciej krzywej nie ma.
Wyjątek zapisany w kodzie: `linear` dla ruchu jednostajnego (dryf gwiazd, iskra).

### 3.1 L1: ruch ciągły tła i separatorów

Cel: strona ma „żyć", gdy użytkownik nic nie robi, ale nie może kosztować
klatek na mobile.

| Ruch | Plik | Parametry | Bramka | Budżet |
|---|---|---|---|---|
| dryf gwiazd | globals `.inf-stars` | 120 s linear alternate, translate3d(-140px,-100px,0) | D + no-preference | 1 |
| dryf mgławic | globals `.inf-nebula` | 60 s `--ease-in-out` alternate, translate3d(60px,-40px,0) | D + no-preference | 1 |
| pierścień pigułki nav | globals `.inf-pill-nav::before` | 3 s linear | D + no-preference | 1 |
| **NOWE** iskra separatora | globals `.inf-seam-spark` | 4 s linear infinite, WYŁĄCZNIE `transform: translateX(-20% do 120%)`, pas 120 px, `linear-gradient(90deg, transparent, #22d3ee 40%, #ff00e5 30%, transparent)` | D + no-preference | maks. 1 widoczny naraz |
| particles canvas | `motion/ParticlesField.tsx` | bez zmian: 140 kropek, DPR 1.5, 24 fps w bezruchu | D, po `load` | 1 |

Twarda reguła L1: pętla ambient wolno animować TYLKO `transform` albo `opacity`.
`infRingFlow` (background-position) zostaje jako dziedzictwo, bo dotyczy elementu
o powierzchni poniżej 260 × 44 px, i jest ostatnim takim wyjątkiem.

Na mobile L1 nie działa wcale. Wrażenie życia na telefonie dają: maszyna pisania
(sygnatura), blob agenta (WebGL, już jest) i ruch wywołany scrollem z L2.

### 3.2 L2: wejście sekcji przy scrollu

| Ruch | Plik | Parametry | Bramka |
|---|---|---|---|
| wejście bloku | `motion/Reveal.tsx` + globals `[data-reveal]` | opacity 420 ms, transform 560 ms, y 20 px, `--ease-out` | RM |
| wejście nagłówka | globals `[data-reveal-variant=header]` | 480 / 720 ms, y 30 px | RM |
| kaskada siatki | globals `.sf-stagger > *` | krok 70 ms, sufit 320 ms (od 6. elementu) | RM |
| **ZMIANA** próg wyzwolenia | `motion/Reveal.tsx` | `rootMargin` z `0px 0px -10% 0px` na `0px 0px -4% 0px` | RM |
| odsłona zdjęcia | globals `.sf-plate-media` | clip-path 760 ms, delay 60 ms | RM |
| paralaksa zdjęcia | globals `.sf-img-parallax` | `animation-timeline: view()`, entry 0 do exit 100 % | RM + `@supports` |
| rysowanie separatora | globals `.sf-rule` do zastąpienia przez `.inf-seam` | `animation-timeline: view()`, entry 10 do 90 % | RM + `@supports` |
| **NOWE** zachodzenie sekcji | globals `.inf-sec-subtle` | maska pionowa `linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)`, BEZ animacji | brak, statyczne |

Budżet L2: maksymalnie 6 elementów animowanych jednocześnie w jednej siatce
(sufit staggera 320 ms już to wymusza). Cała kaskada sekcji kończy się poniżej
900 ms. Nowych obserwatorów nie dokładamy: `Reveal` ma JEDEN obserwator na
kontener, a `.sf-stagger` kaskaduje dziećmi w CSS.

Uzasadnienie zmiany progu: przy `-10 %` blok musi wjechać 10 % wysokości okna w
kadr, żeby ruszyć, przez co poprzednia sekcja zdąży się zatrzymać. `-4 %` skraca
tę przerwę i daje wrażenie „zachodzenia", nic nie kosztując.

### 3.3 L3: reakcja na kursor

CZTERY TYPY KART. Dziś wszystkie dostają ten sam hover, co jest źródłem skargi
„nie ma jednej struktury".

| Typ | Rozpoznanie | Co robi na hover | Czego NIE robi |
|---|---|---|---|
| A. karta odnośnik | `.inf-card` zawiera `a[href]` lub `button` | podniesienie -5 px, skala 1.008, obwódka 62 %, potrójny cień wzorca, narożniki .22 do .6, dolna łuna .04 do .08, sweep, strzałka, kafelek | nie zmienia tła |
| B. karta fakt | `.inf-card` bez linku (Problem, Dowod, GwarancjaEfektu, JakToDziala, ZyweDemo, CytatyWalec) | obwódka 40 %, reflektor 5 %, narożniki .22 do .4 | bez podniesienia, bez sweepa, bez strzałki |
| C. karta metryka | `.inf-card` z `.inf-counter` lub `.inf-counter-value` | jak B, plus oddech światła liczby (L4) | jak B |
| D. panel | `.sf-glass` bez `.card-live` i `.card-lift` (okno demo, konsola, formularz) | nic | nic |

Rozdzielenie A od B robimy selektorem `:has()`, z zabezpieczeniem:
stan bazowy `.inf-card:hover` = wariant B, a wariant A dokładamy w
`@supports selector(:has(a))`. Firefox poniżej 121 dostanie wtedy wariant B
wszędzie, czyli wersję spokojniejszą, nigdy zepsutą.

| Ruch | Plik | Parametry | Bramka |
|---|---|---|---|
| **NOWE** reflektor | globals `.inf-card` | dodatkowa, OSTATNIA warstwa `background-image`: `radial-gradient(180px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--card-c) calc(var(--spot-a) * 8%), transparent), transparent 70%)`; `@property --spot-a { syntax:'<number>'; initial-value:0; inherits:false }`; hover ustawia `--spot-a: 1` z przejściem `--dur-spot` | H + D |
| pozycja reflektora | `motion/MotionOrchestrator.tsx` | bez zmian, delegowany `pointermove` z throttlingiem rAF ustawia `--mx/--my` | D |
| hover karty A | globals `.inf-card:has(a[href]):hover` | `transform: translateY(var(--lift-y)) scale(var(--lift-s))`, `border-color: color-mix(in srgb, var(--card-c) 62%, transparent)`, `box-shadow: 0 22px 48px -20px color-mix(var(--card-c) 35%), 0 0 28px color-mix(var(--card-c) 14%), inset 0 1px 0 rgba(255,255,255,.09)`, czas `--dur-base` | H |
| narożniki | globals `.inf-card` | spoczynek `--corner-a: .22`, hover `.6` (A) lub `.4` (B), przejście `--dur-base`; wymaga `@property --corner-a` | H |
| dolna łuna | globals `.inf-card` | warstwa `radial-gradient(120% 60% at 50% 118%, color-mix(var(--card-c) calc(var(--glow-a)*8%)), transparent 70%)`, `--glow-a` .5 w spoczynku, 1 na hover | H |
| sweep | globals `.inf-card::after` | bez zmian, `left -40%` do `120%`, `--dur-sweep` | H, tylko typ A |
| strzałka | globals `.inf-arrow` | bez zmian, opacity 0 do 1, x -4 px do 0, `--dur-base` | H, tylko typ A |
| kafelek ikony | globals `.inf-tile` | JEDNA reguła: `rotate(-15deg) scale(1.15) brightness(1.35)`, czas `--dur-tile`; skasować sprzeczną `scale(1.12)` i drugi czas 220 ms | H + no-preference |
| magnetyzm CTA | `ui/MagneticButton.tsx` + `.sf-magnetic` | bez zmian, 180 ms | H |
| scramble | `motion/ScrambleText.tsx` | bez zmian, 56 ms na krok, 500 ms całość | H, bez coarse |

Budżet L3: jednocześnie animuje się maksymalnie JEDNA karta (kursor jest jeden).
Jeden delegowany `pointermove` na cały dokument, przeliczenie raz na klatkę.
Zakaz `will-change` na kartach: 138 kart z `will-change` to 138 warstw
kompozytora, czyli natychmiastowa regresja pamięci.

### 3.4 L4: mikroruch w kartach

| Ruch | Plik | Parametry | Bramka |
|---|---|---|---|
| strzałka linku | globals `.sf-arrow` | x +4 px, `--dur-base` | RM |
| podkreślenie nav i stopki | globals `.nav-link::after`, `.u-slide` | `--dur-base` | RM |
| kreska FAQ | globals `.sf-faq > summary::before` | `scaleY 0 do 1`, 220 ms | RM |
| rozwijanie FAQ | globals `details.sf-faq::details-content` | 300 ms wysokość, 200 ms opacity | RM |
| **NOWE** oddech liczby | globals `.inf-counter-value` | `text-shadow` 0 do `0 0 14px color-mix(var(--counter-c) 40%)`, 3,2 s `--ease-in-out`, opóźnienia 0 / 400 / 800 / 1200 / 1600 ms po `:nth-child` | D + no-preference |
| count-up | sekcja 4 poniżej | 1200 ms | D dla hero, M dla narzędzi |
| pulsująca kropka | globals `.inf-sub-dot` | 2,4 s, **dodać bramkę D** | D + H + no-preference |

---

## 4. LICZNIKI: wersja żyjąca

### 4.1 Rozstrzygnięcie, którego nie wolno mi podjąć

Skarga 3 Pawła brzmi: „Liczby się animują, lecą cały czas". To zdanie da się
przeczytać dwojako i obie lektury dają przeciwne wdrożenia:

- lektura A: to OPIS WZORCA, który mu się podoba, i chce tego u siebie,
- lektura B: to SKARGA na nasze liczby, które skaczą i mają się uspokoić.

**DECYZJA PAWŁA (blokująca partię liczników).** Poniżej projektuję lekturę A,
zgodnie z zadaniem 4 briefu, i dokładam wyłącznik dla lektury B.

### 4.2 Żelazne ograniczenie

Zasada „zero zmyślonych liczb" oznacza, że nie wolno w pętli pokazywać wartości
innej niż prawdziwa. Dlatego „życie" licznika NIE jest losowaniem cyfr. Żyje
ŚWIATŁO i moment ponownego wejścia, nie wartość.

### 4.3 Projekt

Trzy mechanizmy, żaden nie dodaje pętli rAF na element:

1. **Oddech światła (CSS, zero JS).** `.inf-counter-value` dostaje pętlę
   `text-shadow` 3,2 s z opóźnieniem po pozycji w rzędzie. 5 liczników hero
   oddycha falą, nie równo. Bramka: 1024 px i `no-preference`. Koszt: 5 razy
   przemalowanie tekstu o wysokości 28 px, bez layoutu.
2. **Ponowne przeliczenie przy powrocie w kadr.** Dziś `LicznikValue` robi
   `io.disconnect()` po pierwszym strzale, więc powrót do hero nic nie daje.
   Zmiana: obserwator zostaje, licznik przelicza się ponownie, gdy element
   wyjdzie z kadru i wróci (histereza: wyjście przy `threshold 0`, wejście przy
   `threshold .5`). To daje odczucie „lecą", a każda klatka pokazuje wartość
   z drogi od 0 do prawdy, czyli tak jak dziś.
3. **Dyrygent.** Nowy plik `components/motion/LicznikDyrygent.tsx`:
   - jeden moduł, jedna pętla `requestAnimationFrame` na CAŁĄ stronę,
   - rejestr elementów przez `data-licznik="<wartość>"`,
   - pętla startuje dopiero, gdy w kolejce jest co najmniej jedna praca, i sama
     się zatrzymuje (`cancelAnimationFrame`), gdy kolejka pusta,
   - twardy limit: maksymalnie 3 liczniki liczą jednocześnie, reszta czeka
     w kolejce (wejście co 120 ms),
   - jedno źródło czasu: 1200 ms, ease-out cubic (ta sama krzywa co dziś),
   - `AnimatedMetric` i `LicznikValue` przestają mieć własne rAF i rejestrują
     się w dyrygencie; publiczne API komponentów bez zmian, więc żaden
     konsument (`narzedzia/*`, `sections/Hero.tsx`) nie wymaga edycji.

Bramki dyrygenta: `prefers-reduced-motion` i Save-Data wyłączają go całkowicie,
a element zostaje z pełną wartością z SSR. Na mobile dyrygent działa (kalkulatory
w `components/narzedzia/*` liczą dziś na telefonie i mają liczyć dalej), ale
oddech światła i liczniki hero pozostają desktopowe.

Wyłącznik dla lektury B: jedna stała `ZYWE = false` w dyrygencie zdejmuje punkt 1
i 2, zostawiając dzisiejsze „policz raz".

Koszt netto na mobile: **minus 1 rAF na każdy dodatkowy licznik w kadrze**
(dziś każda instancja `AnimatedMetric` ma własny), plus 0 KB, bo dyrygent
zastępuje kod, który już jest w tych dwóch plikach.

---

## 5. BUDŻET WYDAJNOŚCI

Punkt odniesienia: PSI mobile 81 do 83, TBT 150 ms, LCP to maszyna pisania H1
(zapisane w pamięci projektu jako sufit, nie regresja).

### 5.1 Co wolno na mobile (poniżej 1024 px)

| Kategoria | Limit | Uzasadnienie |
|---|---|---|
| WebGL | 1 (blob agenta) | już jest, pauzuje poza kadrem i przy `hidden` |
| canvas 2D | 0 | `ParticlesField` i lemniskaty są desktopowe |
| pętle CSS `infinite` w kadrze | **0**, jedyny wyjątek karetka H1 przez ~2,9 s | patrz 5.3, dziś limit jest przekroczony |
| pętle `setTimeout` | 1 (walec cytatów), tylko gdy sekcja jest w kadrze | wymaga dołożenia pauzy IO |
| rAF poza WebGL | 1 współdzielony (dyrygent liczników) + 1 coalesced na scroll | zero rAF per element |
| ruch na gest | bez limitu, ale wyłącznie `transform` i `opacity` | kompozytor |
| `backdrop-filter` | 0 | zasada repo, bez zmian |
| nowy JS animacyjny | **0 KB** | cały pakiet P0 i P1 to CSS |

### 5.2 Co wolno na desktopie (od 1024 px)

| Kategoria | Limit |
|---|---|
| pętle ambient CSS w kadrze | 3 (gwiazdy, mgławice, pierścień nav) plus 1 iskra separatora |
| oddech liczb | 5 elementów, wyłącznie `text-shadow` |
| canvas 2D | 1 (`ParticlesField`) |
| WebGL | 1 (blob agenta) |
| pętle rAF łącznie | **3** (ticker GSAP z Lenisem, particles, WebGL) plus dyrygent liczników uruchamiany tylko na czas przeliczeń |
| GSAP ScrollTrigger | 1 pin plus 1 scrub tekstu na stronę |
| hover karty | 1 naraz (kursor jest jeden) |

Zakaz: czwarta stała pętla rAF. Każda nowa potrzeba idzie przez dyrygenta.

### 5.3 Dług do spłacenia (dziś przekraczamy budżet mobile)

| Co | Ile kosztuje | Działanie |
|---|---|---|
| `.card-aura` na `AgentDemo` | 2 pętle infinite na mobile, w tym conic `@property`, w komentarzu repo opisany jako przyczyna Style & Layout powyżej 1 s i LCP 7 s | dodać bramkę `min-width: 1024px` do `.card-aura` i `.card-aura::before` |
| `.inf-sub-dot` | 5 pętli `box-shadow` na każdym urządzeniu z `hover: hover`, bez bramki szerokości | dodać `min-width: 1024px` |
| `CytatyWalec` | timer 4 s plus przerenderowanie 5 cytatów i 5 kropek, także gdy sekcja jest poza ekranem | pauza przez `IntersectionObserver` (ten sam wzorzec co `VoiceAura`) |
| `.sf-demo-caret` i `.sf-typing` | 4 pętle infinite w `AgentDemo` bez limitu czasu | ograniczyć do stanu, gdy demo jest w kadrze, przez `animation-play-state` sterowany klasą |
| `HeroRibbon` w `MotionOrchestrator` | osobny chunk pobierany na KAŻDEJ stronie desktopowej, szuka slotu przez 60 klatek i kończy niczym | zdjąć import (patrz P3, wymaga zgody Pawła) |
| `AuraDesync` | IO plus MutationObserver na całym dokumencie dla 1 karty | po bramce desktopowej `.card-aura` można ograniczyć montaż do desktopu |

Suma po spłacie: mobile schodzi z 7 do 11 równoległych pętli w kadrze na
maksymalnie 1 (WebGL) plus karetka H1 w oknie startowym.

---

## 6. KOLEJNOŚĆ WDROŻENIA I KRYTERIA ODBIORU

Własność plików rozpisana tak, żeby partie dało się robić równolegle.

### P0: to, co Paweł widzi jako zepsute (tylko `app/globals.css`)

| # | Zmiana | Kryterium odbioru |
|---|---|---|
| P0-1 | Reflektor jako warstwa tła `.inf-card` (180 px, 8 %, `@property --spot-a`, przejście `--dur-spot`) | najazd myszą na dowolną kartę home pokazuje plamę światła podążającą za kursorem, zrzut z prawdziwego Chrome, nie z panelu Browser |
| P0-2 | `.inf-card:hover` bez zmiany `background-color` | pomiar `getComputedStyle` przed i po hover zwraca ten sam `background-color` |
| P0-3 | Podniesienie -5 px, skala 1.008, obwódka 62 %, potrójny cień wzorca | `getComputedStyle` na hover zwraca `matrix` z `translateY(-5px)` i skalą 1.008 |
| P0-4 | Narożniki `--corner-a` .22 do .6 oraz dolna łuna `--glow-a` | w spoczynku narożniki wyraźnie słabsze niż dziś, na hover mocniejsze |
| P0-5 | Typy kart A i B przez `:has()` w `@supports` | karta bez linku (Problem, Dowod) NIE unosi się na hover, karta z linkiem unosi się |
| P0-6 | Bramki desktop dla `.card-aura`, `.card-aura::before`, `.inf-sub-dot` | na emulacji 375 px w kadrze zero animacji poza karetką H1 |
| P0-7 | Jedna reguła `.inf-tile` (rotate -15°, scale 1.15, `--dur-tile`), usunięcie sprzecznej | w arkuszu jedno wystąpienie transformacji kafelka |
| P0-8 | Zastąpienie `.inf-shine` sweepem karty u 7 konsumentów, usunięcie klasy | brak `.inf-shine` w `components/` i w arkuszu |

### P1: separatory i zachodzenie sekcji (`globals.css` + `ui/Section.tsx`)

| # | Zmiana | Kryterium odbioru |
|---|---|---|
| P1-1 | `.inf-seam` (linia fiolet 15 %), `.inf-seam-label` (mono, tracking .35 em), `.inf-seam-spark` (4 s, translateX, cyjan do magenty) | na desktopie iskra przebiega separator raz na 4 s, na 375 px linia stoi |
| P1-2 | `Section` dostaje prop `seamLabel?: string`, `seam` renderuje `.inf-seam` zamiast `.sf-rule` | 3 dzisiejsze użycia `seam` działają bez zmian, etykieta opcjonalna |
| P1-3 | Maska pionowa `.inf-sec-subtle` | krawędź pasa tonu przechodzi w tło, brak widocznej linii cięcia |
| P1-4 | `Reveal` `rootMargin` na `0px 0px -4% 0px` | sekcje zaczynają wchodzić, zanim poprzednia się zatrzyma |

Treść etykiet separatorów należy do zespołu 4 (copy). Rozmiar `.55rem` = 8,8 px
jest poniżej progu czytelności dla wersalików mono. Rekomendacja: `0.6875rem`
(11 px, istniejący token `--fs-overline`) z trackingiem .35 em.
**DECYZJA PAWŁA: 1:1 ze wzorcem (8,8 px) czy czytelność (11 px).**

### P2: liczniki (`motion/LicznikDyrygent.tsx`, `motion/AnimatedMetric.tsx`, `sections/HeroLicznikiCountUp.tsx`, `globals.css`)

| # | Zmiana | Kryterium odbioru |
|---|---|---|
| P2-1 | Dyrygent z jedną pętlą i limitem 3 równoległych liczników | w Performance jeden wpis rAF w czasie przeliczania, zero po zakończeniu |
| P2-2 | `AnimatedMetric` i `LicznikValue` na dyrygencie, API bez zmian | `npm run build` przechodzi bez edycji konsumentów |
| P2-3 | Powrót w kadr przelicza ponownie | scroll w dół i w górę uruchamia licznik hero po raz drugi |
| P2-4 | Oddech światła `.inf-counter-value` | 5 liczników pulsuje falą, nie równo |
| P2-5 | Wyłącznik `ZYWE` | zmiana jednej stałej wraca do zachowania „policz raz" |

Blokada: P2 czeka na rozstrzygnięcie z 4.1.

### P3: sprzątanie martwego ruchu (wymaga zgody Pawła)

Pamięć projektu mówi wprost, żeby nie usuwać elementów zamówionych przez Pawła
bez jego zgody, a lemniskata była jego zamówieniem w v3 i v4. Dlatego cała
partia jest oznaczona jako **DECYZJA PAWŁA**, mimo że kod jest dziś nieżywy.

| Element | Co proponuję | Zysk |
|---|---|---|
| import `HeroRibbon` w `MotionOrchestrator` | zdjąć | jeden chunk mniej na każdej stronie desktopowej |
| `HeroRibbon.tsx`, `HeroLoopLite.tsx`, `InfinityLoopStatic.tsx`, `lib/lemniskata.ts` | zostawić w repo, ale nie importować, albo usunąć razem | czytelność |
| `HeroContours.tsx` + `.sf-contour`, `.sf-tickring`, `sfContourDraw`, `sfTickSpin` | usunąć | mniej martwego CSS |
| `VideoBackground.tsx` + `.bg-metal-sheen` + `sfMetalSheen` | usunąć | jw. |
| `.sf-hero-rule` + `sfBaselineDraw`, `.sf-menu-pop` + `sfMenuIn`, `.sf-window` | usunąć | jw. |
| `initHeroDepth` w `MotionOrchestrator` | usunąć | jw. |

---

## 7. GRANICE WŁASNOŚCI (żeby partie nie kolidowały)

| Obszar | Właściciel |
|---|---|
| stan SPOCZYNKU karty (tło, obwódka, wash, kolory narożników) | zespół 3 (kolor) |
| DELTA hover i wszystko, co ma czas trwania | zespół 2 (ten plan) |
| teksty etykiet separatorów, treść kart | zespoły 1 i 4 |
| kolejność sekcji i to, gdzie stoi separator | zespół 1 |
| tokeny `--dur-*`, `--ease-*`, `--lift-*` | zespół 2 |
| tokeny kolorów `--accent`, `--card-c`, `--counter-c` | zespół 3 |

Ryzyko kolizji: `.inf-card` dotykają obie partie (2 i 3). Rozwiązanie: zespół 3
zmienia WYŁĄCZNIE deklaracje bez `transition`, zespół 2 wyłącznie reguły `:hover`,
`@property`, `transition` i `animation`. Reguła bazowa `.inf-card` powinna
w jednej partii dostać komentarz z granicą.

---

## 8. DECYZJE PAWŁA (nie rozstrzygam sam)

1. **Liczniki: lektura A czy B** skargi „liczby się animują, lecą cały czas"
   (sekcja 4.1). Blokuje partię P2.
2. **Rozmiar etykiety separatora**: 1:1 ze wzorcem 8,8 px czy czytelne 11 px.
3. **Sprzątanie lemniskaty i warstwic hero** (P3): kod jest martwy od v5, ale
   był zamówiony. Usuwamy czy zostawiamy w repo na później.
4. **Iskra separatora na mobile**: proponuję nie włączać (budżet), można ją
   dopuścić kosztem jednej pętli w kadrze, jeśli Paweł uzna, że telefon też ma
   „żyć" na separatorach.
5. **Maszyna pisania H1**: NIE dotykam. Zapisane w pamięci projektu jako
   sygnatura i sufit LCP. Gdyby ktoś chciał ją skrócić, to osobna decyzja.

---

## 9. Czego nie zweryfikowałem

- Nie uruchamiałem builda ani dev servera (zakaz w tej fazie).
- Nie mierzyłem niczego w przeglądarce (zajęta): wszystkie wartości wzorca
  pochodzą z POMIARÓW podanych w briefie, a nasze z odczytu `app/globals.css`
  i komponentów.
- Liczby pętli „w kadrze" policzyłem z reguł CSS i markupu, nie z profilera.
  Przed odbiorem P0 warto zrobić jeden przebieg Performance na 375 px.
- Nie sprawdzałem, czy runda v7 nie zmieniła w międzyczasie wartości hover
  `.inf-card`: przy wdrożeniu P0 trzeba najpierw przeczytać aktualny stan pliku.

NIEZWERYFIKOWANE: wszystkie liczby wydajnościowe w sekcji 5 są policzone z kodu,
nie zmierzone profilerem w tej rundzie.

---

Plik: `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\raporty\plan-animacje.md`
