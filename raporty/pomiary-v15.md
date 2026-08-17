# Pomiary v15 — wzorzec infinitytechstack.uk: NEON WNĘTRZA (sekcja „Open Source on GitHub") + SWEEP + GLOW POZA RAMKĘ + POWIERZCHNIA + CZYSTOŚĆ WARIANTÓW

Data pomiaru: 2026-08-17. Narzędzie: playwright-core 1.48.2 + realny Chrome headless
(scratchpad/v15a-recon.mjs, v15b-neon.mjs, v15c-hover.mjs, v15d-nasze.mjs), viewport
1440x900, DSF 1. Hover wymuszany przez CDP `CSS.forcePseudoState` + odczekanie 1,4 s
(stan końcowy przejść). Każda liczba z computed style żywej strony (color-mix
rozwiązany do color(srgb ...)) albo z CSSOM. Strony: wzorzec home (sekcja z H2
„Open Source on GitHub": karty The Forge / AgentLens / MCPlex Gateway / Infinity
Service Ops / Vitalis / Infinity Security Stack — DOKŁADNIE te ze zrzutów Pawła)
oraz NASZA produkcja https://www.simplefast.ai/ (sekcja Problem: karta CHATBOT,
chipy, płytka; statusy; warianty kart). Dowody w scratchpad pw/: v15-recon.json,
v15-neon.json (pełna anatomia 6 kart + 54 reguły CSSOM), v15-hover.json
(diff spoczynek->hover 5 rodzin + chip), v15-nasze.json (produkcja + hover).

Akcenty 6 kart sekcji: #ff6b00 (Forge), #22d3ee (AgentLens), #39ff14 (MCPlex),
#00f0ff (Service Ops), #a78bfa (Vitalis), #b026ff (Security Stack) —
`--card-accent-alt` = accent (bez dwukolorowych linii w tej sekcji). Sąsiednie
karty ZAWSZE w innym kolorze (pomarańcz obok cyjanu obok zieleni — spec §7).

---

## 1. NEON ELEMENTÓW WNĘTRZA — sedno („u nas jest blade")

NAJWAŻNIEJSZE ODKRYCIE POMIARU: wzorzec NIE świeci tekstów text-shadowem.
Computed na wszystkich 6 kartach: status `text-shadow: none`, tagline
`text-shadow: none`, chipy `text-shadow: none`, tytuł `text-shadow: none`.
„Neon" wzorca to: (a) PEŁNE, nasycone hue neonowe (#ff6b00, #39ff14, #00f0ff,
#b026ff — nie stonowane odcienie), (b) glow wyłącznie na OBIEKTACH: kropka
statusu, linia neon-top, płytka ikony, strzałka, (c) ciemniejsza powierzchnia
karty (.88/.72), na której pełne hue ma większy kontrast. U nas odwrotnie:
teksty mają glow 45%, ale status bierze PASTEL, płytka jest płaska bez
warstw, a powierzchnia mleczna od czerni 10% — stąd wrażenie „blade".

### 1a. Wzorzec — pomiar 1:1 (karta The Forge; pozostałe 5 identyczne poza hue)

| Element | pomiar wzorca |
|---|---|
| Status `.lp-primary-status` „● OPEN SOURCE" | mono („SF Mono"/Fira Code/JetBrains) 8px/700, ls 1.6px (0.2em), kolor PEŁNY #39ff14 (rgb(57,255,20)) na WSZYSTKICH 6 kartach niezależnie od akcentu karty, `text-shadow: none`, gap 5.6px, margin-bottom 6.4px, NAD tytułem |
| Kropka `.lp-status-dot` | 5x5px, radius 50%, tło PEŁNE #39ff14, `box-shadow: 0 0 6px #39ff14` (pełny kolor, bez alfy), animacja `pulse-glow 2s ease-in-out infinite` = opacity 1 -> 0.4 -> 1 |
| Tytuł `.lp-primary-name` | Inter 21.6px/900, rgb(228,228,240), ls -0.216px, `text-shadow: none` |
| Tagline `.lp-primary-tagline` (mono POD tytułem, np. „Multi-Agent Code Evolution Platform") | mono 11.2px/400, kolor = PEŁNY akcent karty (computed rgb(255,107,0) itd. — 100%, zero rozcieńczenia), `text-shadow: NONE`, bez uppercase. Reguła bazowa ma szary rgb(106,122,154) — sekcja nadpisuje na pełny akcent |
| Chipy `.lp-tag` (PYTHON, RUST JIT, MULTI-AGENT, MIT...) | mono 8.8px/700 UPPERCASE, ls 0.704px, padding 3.52x9.92px, radius 6px, tekst PEŁNY akcent KARTY (wszystkie chipy jednej karty w jej kolorze, żadnych własnych), tło akcent 8%, obwódka 1px akcent 20%, `text-shadow: none`. Hover chipa (zmierzone CDP): tło 14%, obwódka 35%, nic więcej |
| Płytka `.lp-tool-icon` | 42x42px, radius 12px, tło GRADIENT `160deg` akcent 14% -> 5%, obwódka 1px akcent 26%, box-shadow `inset 0 1px 0 rgba(255,255,255,.10)` + `0 0 16px -6px` akcent 60%, DODATKOWO `filter: drop-shadow(0 0 6px akcent 35%)` — TRZY warstwy światła naraz; SVG 18x18 stroke currentColor = pełny akcent |
| Strzałka `.lp-primary-arrow` | „→" 19.2px, pełny akcent, `text-shadow: 0 0 8px akcent` (pełny kolor), spoczynek opacity 0 translateX(-10px), hover karty: 1 / 0, 0.35s |
| Linia `.lp-card-neon-top` | 1px wysokości, całą szerokością górnej krawędzi, `linear-gradient(90deg, transparent, akcent, akcent-alt, transparent)` PEŁNYM kolorem + `box-shadow: 0 0 8px akcent` (pełny, bez alfy) — świeci CIĄGLE, spoczynek i hover tak samo; to ona robi wrażenie „grubszej, jarzącej obwódki" |
| Narożniki `.lp-card-corner` x4 | 10x10px, 1px, BIAŁE rgb(228,228,240) (późniejsza reguła bije `var(--card-accent)` — potwierdzenie v13), opacity 0.22 -> hover 0.6 |
| Pasek CTA `.lp-forge-github` „View on GitHub →" | pełna szerokość wnętrza (472.8px w karcie 526px), mono 12px/700, tekst BIAŁY rgb(228,228,240), tło biel 4%, obwódka 1px biel 10%, radius 4px, padding 6.4x14.4px, gap 8px (ikona GitHub SVG), transition .25s. HOVER KARTY: BEZ ZMIAN (zmierzone CDP — jedyna reguła hoveru CTA siedzi w wariancie `.lp-primary-card--forge`, którego karty tej sekcji NIE mają). Spokojny, szary „footer" karty — kontrast dla neonów wyżej |

### 1b. TABELA RÓŻNIC wzorzec vs MY (produkcja, karta CHATBOT sekcji Problem + statusy)

| Element | WZORZEC | MY (zmierzone na żywo) | werdykt |
|---|---|---|---|
| Status — kolor tekstu | PEŁNY #39ff14, jeden na cały home | `#61edff` = JAŚNIEJSZY PASTEL (--card-c-l), nie pełny akcent; kropka pełna #11e0ff | BLADE U NAS: tekst statusu podbić do PEŁNEGO koloru (jak kropka) |
| Status — kropka | 5px, glow `0 0 6px` pełny, pulse 2s | 5px, glow `0 0 6px` pełny #11e0ff, infStatusPulse 2s | ZGODNE 1:1 |
| Tagline/kicker mono | PEŁNY akcent, 11.2px/400, BEZ text-shadow, bez uppercase, POD tytułem | 11px/700 UPPERCASE ls 1.98px, pełny #11e0ff + glow `0 0 12px` 45%, NAD tytułem | kolor OK (pełny); różnice: wzorzec nie świeci tekstu (nasz glow zostaje wg decyzji v6/v8b — nie on jest problemem), waga 400 vs 700, pozycja pod/nad tytułem (spec §7) |
| Chipy — tekst | pełny akcent, bez glow | pełny akcent + glow 12px 45% | kolor OK |
| Chipy — tło / obwódka | 8% / 20% (hover 14% / 35%) | 12% / 32% | my MOCNIEJSI w ramce — nie tu jest „blado" |
| Chipy — geometria | 8.8px/700 UC, radius 6px, pad 3.52x9.92 | 11px/700, radius 4px, pad 4x8 | inna skala; wzorzec drobniejszy i szerszy |
| Płytka — tło | GRADIENT 160deg 14% -> 5% | FLAT 14% (bez gradientu) | BLADE U NAS |
| Płytka — box-shadow | `inset 0 1px 0 biel 10%` + `0 0 16px -6px` akcent 60% | tylko `0 0 18px -4px` akcent 55% (BEZ inset) | BLADE U NAS (brak połysku szkła) |
| Płytka — filter | `drop-shadow(0 0 6px akcent 35%)` — trzecia warstwa światła | `none` | BLADE U NAS (brak halo wychodzącego za płytkę) |
| Płytka — hover karty | 22%->8%, obwódka 48%, inset 14% + `0 0 22px -4px` 70%, scale(1.06) rotate(-3deg) | 22%->8%, obwódka 48%, inset 14% + 22px -4px **55%**, scale(**1.15**) rotate(**-15deg**) | glow hover za słaby (55 vs 70%), transform za agresywny (1.15/-15 vs 1.06/-3) |
| Tytuł | biały 228,228,240, bez shadow | zgodnie | ZGODNE |
| Linia górna (nasz wariant top) | neon-top: gradient PEŁNYM akcentem + `box-shadow 0 0 8px` pełny akcent | linia gradientem z PASTELU #61edff + łuna radial 45% (bez box-shadow) | BLADE U NAS: pełne hue + glow 8px pełny |
| Powierzchnia karty | gradient .88/.72, bgColor TRANSPARENT, sh `inset biel 5%` + czerń 55% | gradient .74/.55 + **bgColor rgba(0,0,0,.1)** pod spodem, box-shadow **none** (karta full-hover) | mleczna zasłona 10% + zero inset-highlight = matowość |

---

## 2. SWEEP HOVER — geometria i timing (CDP, stan końcowy po 1,4 s)

| Rodzina wzorca | pseudo | pas | gradient | skew | przelot | transition |
|---|---|---|---|---|---|---|
| `.lp-primary-card` (w tym WSZYSTKIE karty Open Source) | ::before, z-index 10 | 60% szer. karty (314.4px przy 524px; 205.2px przy 342px) | `105deg`: transparent 30% -> biel **3%** przy 45% -> biel **6%** przy 50% -> biel 3% przy 55% -> transparent 70% (miękki rdzeń, kąt z gradientu) | BRAK (transform none) | left −100% -> **140%** (zmierzone −524 -> 733.6px = 240% szerokości) | `left 0.6s cubic-bezier(0.16, 1, 0.3, 1)` |
| `.lp-learn-card` | ::after | 60% (315.6px przy 526px) | `105deg`: biel 2.4% / 5% / 2.4% (stopy 30/45/50/55/70) | BRAK | −100% -> 140% (−526 -> 736.4px) | `left 0.5s cubic-bezier(0.16, 1, 0.3, 1)` |
| `.lp-promo-card` | ::after | 38% (361px przy 950px) | `90deg` transparent -> biel 6% -> transparent (twarde trójkątne stopy) | skewX(−18°) (matrix −0.32492) | −40% -> 120% (−380 -> 1140px = 160%) | `left 0.6s` (domyślny ease) |
| **NASZ `.inf-card::after`** (zmierzone na produkcji) | ::after | **38%** (424.8px przy 1120px) | **90deg biel 6% twarde stopy** | **skewX(−18°)** | **−40% -> 120%** (−447 -> 1341.6px = 160%) | **`left 0.6s` (ease)** |

WERDYKT: nasz sweep to przepis PROMO — a Paweł pokazał na zrzutach karty
Open Source, czyli przepis PRIMARY. Różnica „płynności": pas o połowę szerszy
(60 vs 38%), miękki dwustopniowy gradient zamiast twardego trójkąta, dłuższy
przelot (240 vs 160% szerokości) w tym samym 0.6 s + easing expo-out
`cubic-bezier(.16,1,.3,1)` (szybki start, długie wygaszanie) zamiast `ease` —
błysk wisi nad kartą wyraźnie dłużej i gaśnie płynnie, bez skoku.

---

## 3. HOVER GLOW POZA RAMKĘ + OBWÓDKA (CDP, wszystkie warstwy)

| Rodzina | box-shadow HOVER (komplet warstw) | obwódka spocz. -> hover | border-width | outline | lift |
|---|---|---|---|---|---|
| `.lp-primary-card` (Open Source i tools — identycznie) | `0 22px 48px −20px` akcent **35%** + `0 0 28px` (bez spreadu) akcent **14%** + `inset 0 1px 0` biel 9% | biel 7% -> akcent **65%** | 1px -> **1px (NIE rośnie)** | brak (style none) | authored −5px scale(1.008), computed 0 (bug revealu wzorca, jak v14) |
| `.lp-learn-card` | `0 18px 40px −18px` akcent 30% + `0 0 20px` akcent 12% + `inset 0 1px 0` biel 8% | biel 6% -> akcent 60% | 1px | brak | j.w. |
| `.lp-promo-card` | `0 12px 40px −12px` akcent 40% (jedna warstwa) | biel 7% -> akcent 45% | 1px | brak | −3px (działa) |
| **NASZ `.inf-card:hover`** (zmierzone) | `0 22px 48px −20px` 35% + `0 0 28px` 14% + inset biel 9% — **IDENTYCZNE z primary** | biel 7% -> **PEŁNY** #11e0ff (my 100% vs wzorzec 65%) | 1px | brak | −3px |

WERDYKT: łuna hoveru mamy już 1:1 (35% + 14% + inset 9%), obwódkę hoveru mamy
wręcz MOCNIEJSZĄ (pełny kolor vs 65%). Wrażenie „światło wychodzi za ramki,
obwódka szersza" u wzorca robią elementy STAŁE, których nam brakuje/są zbladzone:
(1) linia neon-top 1px PEŁNYM akcentem + `box-shadow 0 0 8px` pełny — świeci
też w spoczynku i na hover sumuje się z łuną; (2) narożniki 0.22 -> 0.6;
(3) plama radialna ::after u dołu karty (akcent, opacity 0.04 -> 0.08);
(4) spotlight za kursorem opacity 0 -> 1 (radial JS, mousemove); (5) mniejsze
karty wzorca (342px) — ta sama łuna 48px wygląda proporcjonalnie szerzej.
Border NIE rośnie do 2px, outline-ringów brak — „szersza obwódka" to optyka
neon-top + narożników, nie grubszy border.

---

## 4. TŁO POWIERZCHNI — która rodzina jest najbardziej „szklana"

| Rodzina | background-image (alfy!) | background-color | backdrop-filter | box-shadow spoczynku |
|---|---|---|---|---|
| `.lp-hero-metrics` — NAJBARDZIEJ SZKLANA | `135deg` rgba(12,13,28,**.62**) -> rgba(8,9,20,**.5**) | transparent | `blur(18px) saturate(1.3)` | czerń 60% `0 14px 44px −18px` + `inset 0 1px 0` biel 6% |
| `.lp-learn-card` — druga | `160deg` rgba(12,13,28,**.74**) -> rgba(9,10,22,**.55**) | transparent | blur(12px) | `inset` biel 4% + czerń 50% `0 8px 28px −16px` |
| `.lp-promo-card` | `135deg` rgba(16,18,32,.72) -> rgba(10,11,22,.72) | transparent | blur(10px) | none |
| `.lp-primary-card` (Open Source) | `160deg` rgba(13,14,30,**.88**) -> rgba(9,10,22,**.72**) | transparent | blur(16px) | `inset` biel 5% + czerń 55% `0 10px 34px −18px` |
| **NASZA karta W2 (CHATBOT)** | `160deg` rgba(12,13,28,.74) -> rgba(9,10,22,.55) (= learn) | **rgba(0,0,0,0.1)** — czerń 10% POD gradientem | blur(12px) | **none** — zero inset-highlight |

WERDYKT: u wzorca KAŻDA rodzina ma bgColor TRANSPARENT — przezroczystość
niesie wyłącznie alfa gradientu — i KAŻDA poza promo ma szklany połysk
`inset 0 1px 0 biel 4-6%` + głęboki czarny cień zewnętrzny. Nasza czerń 10%
to dodatkowa mleczna zasłona (składa się z gradientem do ~.77/.60), a brak
inset-highlight na kartach full-hover zabija „szkło". Najbardziej szklana
rodzina = hero-metrics (.62/.5 + saturate 1.3); dla kart W2 bezpieczny cel
ze spec §3 = learn (.74/.55) BEZ czerni pod spodem + inset biel 4% + czerń
50% `0 8px 28px −16px`.

---

## 5. CZYSTOŚĆ WARIANTÓW — warianty się NIE łączą (pomiar per rodzina)

Wzorzec (zmierzone na 11 kartach: 3 primary github + 3 primary tools + 2 learn
+ 2 promo + 1 hero-metric):

| Rodzina | góra | lewy bok | werdykt |
|---|---|---|---|
| `.lp-primary-card` (6 szt.) | neon-top 1px pełny akcent + glow 8px; narożniki tl/tr | border-left = zwykła biel 7% jak każdy bok; ::before to SWEEP zaparkowany POZA kartą (left −342px, niewidoczny); **ZERO paska/kreski na lewym boku** | CZYSTY wariant „top" |
| `.lp-learn-card` (2 szt.) | **ZERO** — brak neon-top, ::before `content: none`, border-top biel 6% | pasek `.lp-learn-accent-bar` 3x193.7px, gradient pionowy pełny akcent -> 30%, opacity 0.5 -> hover 1 | CZYSTY wariant „edge" |
| `.lp-promo-card` (2 szt.) | ring ::before = gradient 135deg od PEŁNEGO akcentu w lewym-górnym rogu -> transparent 55%, opacity 0.5 -> 1 (JEDNA dekoracja narożna, nie osobne paski) | j.w. — to ta sama jedna warstwa | CZYSTY wariant „ring" |
| `.lp-hero-metric` | nic (0px border, ::before/::after none) | nic | CZYSTY „quiet" |

NASZA produkcja (klasyfikacja wszystkich .inf-card na home, N=53):

| Wariant u nas | kart | z lewą kreską ::before | werdykt |
|---|---|---|---|
| `.inf-card-top` czysty (5) i `.inf-card-top.inf-card-static` (13) | 18 | **18/18 kreska 2px akcentu, opacity .5** | **BŁĄD — u wzorca wariant top NIE MA niczego na lewym boku; zgasić bazowe ::before na top** |
| `.inf-card-edge.inf-card-static` | 18 | 18/18 pasek 3px gradient (własny edge) | POPRAWNE (to jest jego wyróżnik) |
| `.inf-card-static` bez top/edge | 10 | 9/10 kreska 2px | do decyzji: baza = wariant edge-lite; jeśli karta ma dostać inny wyróżnik, kreskę zgasić |
| `.inf-card-quiet` | 3 | 0/3 | CZYSTE |
| baza/full-hover (4) | 4 | 0/4 (::before pełni tam rolę innej warstwy pełnowymiarowej) | — |

---

## 6. WNIOSKI DLA IMPLEMENTACJI (wartości wzorca 1:1, zero „trochę mocniej")

1. NEON TEKSTÓW: status `.inf-status` — kolor tekstu podbić z pastelu
   #61edff do PEŁNEGO `var(--card-c)` (wzorzec: status zawsze pełny neon;
   u wzorca to stała zieleń #39ff14 — u nas status w kolorze karty już jest
   konwencją, zostaje, ale PEŁNYM kolorem). Kropka już zgodna 1:1.
2. PŁYTKA IKONY `.inf-tile` — przenieść przepis primary 1:1: tło
   `linear-gradient(160deg, akcent 14%, akcent 5%)` zamiast flat 14%;
   box-shadow `inset 0 1px 0 rgba(255,255,255,.10), 0 0 16px -6px akcent 60%`;
   `filter: drop-shadow(0 0 6px akcent 35%)` (desktop; blur/filtry nigdy
   mobile — filter drop-shadow zostawić za media ≥1024px, jeśli budżet LCP
   tego wymaga). Hover: glow 70% (nie 55%), transform ściszyć do
   `scale(1.06) rotate(-3deg)` (nasze 1.15/-15° jest 5x mocniejsze od wzorca).
3. WARIANT TOP: linia górna PEŁNYM `var(--card-c)` (nie #61edff/pastel)
   + glow `0 0 8px var(--card-c)` pełnym kolorem (u nas w tle-warstwach:
   radial 45% podbić/zamienić wg tej wartości). Fallback rgba literałem
   przed color-mix jak zawsze.
4. CZYSTOŚĆ: zgasić `.inf-card::before` (kreska 2px) na `.inf-card-top`
   (18 kart) — wariant top ma świecić TYLKO górą. Edge zostaje z paskiem,
   quiet zostaje pusty. Statiki bez top/edge — jeden wyróżnik na kartę.
5. SWEEP: przepis primary na `.inf-card::after`: pas 60% szerokości,
   `linear-gradient(105deg, transparent 30%, rgba(255,255,255,.03) 45%,
   rgba(255,255,255,.06) 50%, rgba(255,255,255,.03) 55%, transparent 70%)`,
   BEZ skewX, start `left: -100%`, hover `left: 140%`, transition
   `left 0.6s cubic-bezier(0.16, 1, 0.3, 1)`. To daje „wolniejszy, płynniejszy"
   błysk bez zmiany duration (dłuższa droga + expo-out).
6. HOVER WSZĘDZIE (spec §1): łunę 35%/14%/inset9% mamy 1:1 — nie ruszać;
   `.inf-card-static` przestaje gasić sweep/lift. Border hover zostaje pełnym
   kolorem (mocniejszy niż wzorzec 65% — decyzja v12, na korzyść neonu).
   Bordera NIE pogrubiać (wzorzec: 1px także na hover, zero outline).
7. POWIERZCHNIA: zdjąć `background-color: rgba(0,0,0,0.1)` spod gradientu
   (wzorzec: transparent na każdej rodzinie); gradient zostaje .74/.55 (learn);
   dodać na kartach W2 brakujący szklany połysk spoczynku:
   `box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 8px 28px -16px
   rgba(0,0,0,.5)` (wartości learn 1:1). Blur tylko desktop, jak dziś.
8. CTA-pasek (jeśli karta ma link „zobacz"): wzorzec View on GitHub =
   spokojny szary pasek mono 12px/700, biel 4% tła, obwódka biel 10%,
   radius 4px, pełna szerokość, BEZ reakcji na hover karty — nie neonować
   wszystkiego; kontrast ciszy dla neonów wyżej. Etykiety tylko z
   istniejących danych.
9. KOLEJNOŚĆ WNĘTRZA (spec §7): wzorzec = status z kropką NAD tytułem,
   tagline mono PEŁNYM kolorem POD tytułem, opis, chipy, CTA. Nasz kicker
   stoi nad tytułem — tam gdzie karta ma istniejący podtytuł/etykietę,
   ustawić w porządku wzorca (bez nowych treści).
10. CHIPY: procenty ramki mamy mocniejsze (12/32 vs 8/20) — NIE osłabiać
    (Paweł chce mocniej, nie słabiej); do rozważenia w rundzie jedynie
    radius 6px i drobniejszy krój 8.8px UC dla zgodności z wzorcem.
    Chip zawsze w kolorze KARTY (potwierdzone: wzorzec nie daje chipom
    własnych kolorów).

---

## NIEZMIERZONE

- Spotlight wzorca: bg `none` przy wymuszonym hover — radial dokleja JS na
  mousemove (CDP nie rusza myszy); zmierzono tylko opacity 0 -> 1.
- Lift primary/learn wzorca: computed 0 przy wymuszonym hover (ten sam bug
  specificity revealu co v14) — intencja CSS: −5px scale(1.008) / −4px.
- CTA `.lp-forge-github`: własnego `:hover` brak w CSSOM (jedyna reguła
  hoveru = wariant `--forge` nieobecny w sekcji Open Source) — pasek uznany
  za statyczny.
- Mobile (<1024px) wzorca: pomiar tylko 1440px (media query zmienia padding
  primary na 1rem 0.9rem 0.9rem — zanotowane z CSSOM, bez pomiaru).
- Nasze 4 karty „baza" (::before pełnowymiarowe): nie rozstrzygano, która
  warstwa pełni tam rolę reflektora — poza zakresem zwiadu.
