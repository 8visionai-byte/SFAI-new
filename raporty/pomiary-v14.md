# Pomiary v14 — wzorzec infinitytechstack.uk: ANATOMIA WNĘTRZA KART + SWEEP + FOCUS + POWIERZCHNIA

Data pomiaru: 2026-08-17. Narzędzie: playwright-core 1.48.2 + realny Chrome headless
(scratchpad/v14a-anatomia.mjs, v14b-podstrony.mjs, v14c-detale.mjs), viewport
1440x900, DSF 1. Każda liczba z computed style żywej strony (color-mix rozwiązany
do color(srgb ...)) albo z CSSOM (arkusz wzorca dostępny bez blokady). Strony:
home + /forge-seo + /claude-academy. Dowody w scratchpad pw/: v14-anatomia.json
(pełny walk DOM + computed 6 rodzin), v14-hover.json (diff spoczynek->hover),
v14-focus.json (Tab klawiaturą), v14-detale.json (opisy, statusy, liczniki
pokrycia), v14-podstrony.json, v14-css-home.css / v14-css-forge-seo.css /
v14-css-claude-academy.css (świeże zrzuty CSSOM), v14-home.png.

Hover v12 i spoczynek ramek v13 NIETYKALNE — ten raport ich nie podważa; tam gdzie
pomiar je potwierdza, jest to zaznaczone.

Zmienne wzorca: --neon-cyan #00f0ff, --neon-magenta #ff00e5, --neon-violet
#b026ff, --neon-green #39ff14.

---

## 1. ANATOMIA WNĘTRZA KART — per rodzina (computed 1:1)

Liczniki pokrycia na home (v14-detale.json): 24 kart .lp-primary-card (24 <a>,
24 status, 24 strzałka, 23 chipy, 19 płytka ikony — 5 kart research bez płytki),
11 .lp-learn-card (11 <a>), 3 .lp-promo-card (3 <a>).

### 1a. PROMO / FLAGOWA (.lp-promo-card, 3 szt., wszystkie <a>)

KOLEJNOŚĆ wnętrza (walk DOM): [ring ::before + sweep ::after] → PŁYTKA IKONY →
body (KICKER → TYTUŁ → OPIS) → STRZAŁKA. Bez statusu, bez chipów, bez neon-top,
bez narożników. Układ poziomy (flex, align-items center, gap 15.2px).

| Element | pomiar |
|---|---|
| Płytka ikony `.lp-promo-icon` | 42x42px, radius 11px, tło color-mix(--pc 12%, biel 2%) = np. color(srgb 1 .126 .911 / .137), obwódka 1px --pc 28%, glow `0 0 18px -4px` --pc 55%, w środku SVG 20x20 stroke currentColor (PEŁNY --pc). HOVER KARTY: płytka BEZ ZMIAN (zero reguły — promo-ikona statyczna) |
| Kicker `.lp-promo-tag` | Inter (NIE mono!), 9.6px/700, letter-spacing 1.344px (0.14em), UPPERCASE, kolor = color-mix(--pc 78%, #fff) — np. computed color(srgb 1 .22 .92), czyli akcent PODBITY bielą, nie pełny |
| Tytuł `.lp-promo-title` | Inter 16px/700, rgb(242,244,251), ls -0.16px |
| Opis `.lp-promo-desc` | Inter 12.48px/400, rgb(147,161,189), lh 18.1px (1.45) |
| Strzałka `.lp-promo-arrow` | ZNAK tekstowy „→", 17.6px/800, PEŁNY --pc, bez text-shadow. SPOCZYNEK: WIDOCZNA (opacity 1, margin-left auto). Hover: translateX(4px), 0.3s |

### 1b. STANDARDOWA (security) / NARZĘDZIOWA (tools) / PROJEKTU (github) — .lp-primary-card, jedna klasa, trzy sekcje

KOLEJNOŚĆ wnętrza: [spotlight] → [neon-top] → [4 narożniki] → HEADER
(.lp-primary-card-header, flex space-between: [PŁYTKA IKONY + kolumna: STATUS
Z KROPKĄ → TYTUŁ H3 → KICKER MONO] | STRZAŁKA) → OPIS (P bez klasy) → CHIPY
(.lp-primary-tags, margin-top auto) → (tylko forge: przycisk GitHub).
UWAGA KOLEJNOŚĆ: status NAD tytułem, kicker mono POD tytułem.

| Element | pomiar |
|---|---|
| Płytka ikony `.lp-tool-icon` | 42x42px, radius 12px, tło GRADIENT `160deg` akcent 14% → 5% (nie flat), obwódka 1px akcent 26%, box-shadow `inset 0 1px 0` biel 10% + glow `0 0 16px -6px` akcent 60%, DODATKOWO filter `drop-shadow(0 0 6px akcent 35%)`; w środku SVG 18x18 stroke currentColor (pełny akcent). HOVER KARTY: tło 22%→8%, obwódka 48%, glow `0 0 22px -4px` 70%, inset biel 14%, transform `scale(1.06) rotate(-3deg)` — zmierzone matrix(1.05855, -0.05548, ...) |
| Status `.lp-primary-status` | mono 8px/700, ls 1.6px (0.2em), kolor PEŁNY #39ff14 (jedyny kolor statusów na całym home — zmierzone: 1 unikalny), gap 5.6px do kropki, margin-bottom 6.4px; kropka 5x5px pełna zieleń, glow 6px, pulse-glow 2s (zgodne z v12). Teksty: OPEN SOURCE (10), FREE (9), ACTIVE (4), STACK OVERVIEW (1) — FAKTY rejestrowe, nie marketing |
| Tytuł `.lp-primary-name` (H3) | Inter 21.6px/900, rgb(228,228,240), ls -0.216px (-0.01em) |
| Kicker `.lp-primary-tagline` | mono („SF Mono"/Fira Code/JetBrains) 11.2px/400, kolor PEŁNY akcent karty (100%, bez rozcieńczenia), bez uppercase. WYJĄTEK research: 12px, SZARY rgb(106,122,154) — karty research nie barwią kickera |
| Opis (P bez klasy) | Inter 13.12px/400, rgb(138,154,181), lh 22.3px (1.7) — mniejszy i bardziej szary niż tytuł, zwykła czcionka (nie mono) |
| Chipy `.lp-tag` | mono 8.8px/700 UPPERCASE, ls 0.704px (0.08em), padding 3.52px 9.92px (0.22/0.62rem), radius 6px (NIE pigułka), tekst PEŁNY akcent, obwódka 1px akcent 20%, tło akcent 8%. Hover chipa: tło 14%, obwódka 35% |
| Strzałka `.lp-primary-arrow` | ZNAK „→", 19.2px, PEŁNY akcent + text-shadow `0 0 8px` akcent. SPOCZYNEK: UKRYTA (opacity 0, translateX(-10px)). Hover karty: opacity 1, translateX(0), 0.35s |

Flagship research (4 karty) dodatkowo: .lp-primary-stats (wartość mono 20.8px/900
pełny akcent + text-shadow 12px currentcolor; label mono 8.8px/700 uppercase
rgb(94,94,126)) → .lp-card-divider (1px, gradient transparent→akcent→transparent,
opacity .2) → .lp-primary-highlights (li 12.48px rgb(154,170,191); marker
.lp-check „▸" 8px pełny akcent + glow 6px) → chipy. Te 4 karty NIE mają płytki
ikony (19/24 ma).

### 1c. AKADEMII (.lp-learn-card, 11 szt., wszystkie <a>)

KOLEJNOŚĆ: [spotlight] → PASEK BOCZNY 3px (v13, nietykalny) → inner (padding
20x24px): HEADER ([PŁYTKA IKONY 38px + kolumna: BADGE „FREE" → TYTUŁ H3 →
META MONO] | STRZAŁKA) → OPIS → CHIPY.

| Element | pomiar |
|---|---|
| Płytka ikony `.lp-learn-icon` | 38x38px, radius 11px, tło gradient 160deg currentColor 13% → 4%, obwódka currentColor 24%, box-shadow inset biel 8% + glow `0 0 14px -6px` PEŁNY kolor; SVG 17x17. Hover karty: 20%→7%, obwódka 42%, glow `18px -4px`, `scale(1.06) rotate(-3deg)` (zmierzone) |
| Badge `.lp-learn-badge` („FREE") | mono 8px/700, ls 1.6px (0.2em), PEŁNA zieleń #39ff14, tło zieleń 6%, obwódka zieleń 15%, radius 2px, padding 2.4x8px |
| Tytuł `.lp-learn-name` (H3) | Inter 17.6px/800, rgb(228,228,240) |
| Kicker `.lp-learn-meta` | mono 9.6px/600, PEŁNY akcent (--learn-accent), pod tytułem |
| Opis `.lp-learn-desc` | Inter 12.8px/400, rgb(154,170,191), lh 20.5px (1.6) |
| Chipy `.lp-tag` w learn | LUKA WZORCA (zmierzone!): learn-card definiuje --learn-accent, NIE --card-accent, więc color-mix w .lp-tag pada — computed: tekst BIAŁY rgb(228,228,240), obwódka 0, tło transparent. Chipy akademii renderują się jako gołe białe mono-napisy. U nas fallback --chip-c/--card-c istnieje — luki nie kopiować |
| Strzałka `.lp-learn-arrow` | „→" 17.6px, pełny akcent, BEZ text-shadow; spoczynek opacity 0 translateX(-8px), hover opacity 1 translateX(0), 0.3s |

---

## 2. SWEEP: KLIKALNE vs NIEKLIKALNE (computed + hover-diff na żywo)

| Rodzina | klikalna | sweep na hover | pozostałe hover-efekty (zmierzone) |
|---|---|---|---|
| .lp-promo-card (3) | TAK (a) | TAK — ::after: pas 38% szer. karty, biel 6% w szczycie, `skewX(-18deg)`, left -40%→120% (zmierzone -380px→1140px), 0.6s | obwódka biel 7% → --pc 45%; translateY(-3px); ring ::before opacity .5→1; strzałka +4px; płytka BEZ zmian |
| .lp-primary-card (24: security/tools/github/research) | TAK (a) | TAK — ::before (z-index 10): pas 60%, gradient 105deg biel 3%→6%→3%, left -100%→140% (zmierzone -342→479 i -524→734), 0.6s cubic-bezier(.16,1,.3,1) | obwódka biel 7% → akcent 65%; glow 48px 35% + 28px 14%; ::after (plama radialna dołu) opacity .04→.08; narożniki .22→.6; płytka scale(1.06) rotate(-3deg); strzałka 0→1 |
| .lp-learn-card (11) | TAK (a) | TAK — ::after: pas 60%, biel 2.4%→5%→2.4%, left -100%→140% (zmierzone -526→736), 0.5s | obwódka biel 6% → akcent 60%; pasek boczny opacity .5→1; płytka scale+rotate; strzałka 0→1 |
| .lp-hero-metrics / .lp-hero-metric (kafle statystyk hero) | NIE (div) | NIE — ::before i ::after `content: none` (computed), ZERO reguł :hover w CSSOM (0 trafień w 137.9 kB), hover-diff na żywo: obwódka/transform/cień BEZ ZMIANY | żadnych |
| .lp-faq-item (details) | NIE (karta) | NIE — ::before/::after none | hover tylko na pytaniu .lp-faq-q (kolor tekstu); [open] obwódka indigo 40% + glow 22px (v13) |
| .lp-bench-row (wiersze benchmarku) | NIE | NIE | jedyny „informacyjny" hover wzorca: samo tło rgba(139,92,246,.04) — szept, nie sweep |

POTWIERDZENIE TEZY SPEC §2: sweep i mocny glow WYŁĄCZNIE na kartach-linkach;
elementy czysto informacyjne są martwe na hover (statystyki) albo dostają
mikroskopijną zmianę tła (bench 4%).

CIEKAWOSTKA POMIAROWA (nie do kopiowania): CSS wzorca deklaruje lift
translateY(-5px) scale(1.008) na primary i -4px na learn, ale computed na żywo
pokazał lift TYLKO na promo (-3px). Powód: reguła revealu
`.lp-reveal-stagger.lp-revealed > * { transform: translateY(0) }` stoi w arkuszu
PÓŹNIEJ niż `:hover` przy równej specificity i wygrywa — karty primary/learn
u wzorca faktycznie NIE unoszą się na hover (bug wzorca). Promo nie siedzi
w reveal-stagger, więc lift działa. NASZ hover v12 (lift działa) — nietykalny,
zgodny z INTENCJĄ wzorca.

---

## 3. FOCUS-VISIBLE — wzorzec NIE MA własnego stylu

Zmierzone trzykrotnie, świeże zrzuty CSSOM z 2026-08-17:

- home: 137 884 B CSS, wystąpień `:focus-visible` = **0**
- /forge-seo: 79 903 B, `:focus-visible` = **0**
- /claude-academy: 79 348 B, `:focus-visible` = **0**

Tab klawiaturą na żywo (v14-focus.json): fokus trafia w karty (są <a>),
`matches(':focus-visible')` = true, computed `outline-style: auto` — czyli
DOMYŚLNY ring przeglądarki (Chrome: outline auto 1-3px, offset 0-1px, box-shadow
karty bez zmian). Wzorzec ma tylko `:focus` na inputach (border cyan 40% + glow).

WERDYKT dla spec §3: **brak wzorca — projektujemy własny zgodny z bazą**:
obrys 2px w kolorze karty (--card-c) + offset, spójny z globalnym :focus-visible
globals ~l.617, zgodnie ze spec.

---

## 4. GRADIENT POWIERZCHNI KART (TYLKO POMIAR — wdrożenie poza rundą, tło nasze zostaje płaskie 10%)

Computed z żywej strony (background-color wszędzie transparent — całe tło niesie
background-image; kierunek i stopy 1:1):

| Rodzina | background-image | backdrop-filter | box-shadow spoczynku | radius |
|---|---|---|---|---|
| .lp-primary-card | `linear-gradient(160deg, rgba(13,14,30,.88), rgba(9,10,22,.72))` | blur(16px) | inset 0 1px 0 biel 5% + czerń 55% `0 10px 34px -18px` | 16px |
| .lp-learn-card | `linear-gradient(160deg, rgba(12,13,28,.74), rgba(9,10,22,.55))` | blur(12px) | inset 0 1px 0 biel 4% + czerń 50% `0 8px 28px -16px` | 14px |
| .lp-promo-card | `linear-gradient(135deg, rgba(16,18,32,.72), rgba(10,11,22,.72))` | blur(10px) | none | 14px |
| .lp-hero-metrics | `linear-gradient(135deg, rgba(12,13,28,.62), rgba(8,9,20,.5))` | blur(18px) saturate(1.3) | czerń 60% `0 14px 44px -18px` + inset biel 6% | 18px |
| podstrona .glowing-card (/forge-seo, 7 szt.) | none — FLAT rgba(18,18,30,.85) | blur(16px) | none | 20px |

Do tego na primary stała plama barwna: ::after `radial-gradient(ellipse 80% 50%
at 50% 120%, akcent, transparent 70%)` opacity .04 (hover .08) — jedyne miejsce,
gdzie kolor karty dotyka POWIERZCHNI, i to w 4%. Inset highlight (biel 4-6% na
górnej krawędzi) to część tożsamości „szkła". Te wartości są kompletem do próbki
A/B po rundzie (decyzja Pawła; blur ewentualnie tylko desktop — LCP mobile
święte). Podstrony narzędzi NIE mają gradientu (flat) — gradient to język home.

---

## 5. WNIOSKI DLA IMPLEMENTACJI — mapa nasze-sekcje-home → brakujące klocki

Inwentarz (grep po components/sections/*.tsx; card=.inf-card, tile=.inf-tile,
kicker=KartaEtykieta/.inf-overline, tagi=KartaTagi, arrow=.inf-arrow,
status=.inf-status/KartaStatus):

| Sekcja | ma | BRAKUJE względem anatomii wzorca (adekwatnie do typu) |
|---|---|---|
| Problem.tsx (3 zjadacze, W2, NIEklikalne li) | kicker, tytuł, opis, tagi, spotlight | PŁYTKA IKONY — rejestr ZJADACZE ma pole `ikona` (chat-dymek/dokument-skan/sluchawka-fala), nierenderowane; ubrać w .inf-tile jak wzorzec primary. Strzałki NIE dodawać (karta nieklikalna — cisza §2). Karty domknięcia i mostka płytkę już mają |
| PromoUslugi.tsx (klikalne) | KOMPLET: tile, kicker, tytuł, opis, tagi, arrow | nic krytycznego; jedyna różnica: wzorzec primary kładzie status NAD tytułem i mono-kicker POD tytułem — u nas kicker nad. Statusów-faktów brak (dozwolone tylko fakty rejestrowe) |
| Oferta.tsx (cennik W2 + wiersze) | tile+kicker w wierszach, arrow x2 | karty cennika bez chipów przy istniejących danych pakietu; wiersze „jak w dropdownie" są zgodne z anatomią |
| Rozwiazanie.tsx | kicker x4 | płytka ikony, tagi z istniejących danych; karty nieklikalne → bez strzałki/sweepa |
| Bezpieczenstwo.tsx / BranzeDemo.tsx / Dowod.tsx / DowodSpoleczny.tsx / GwarancjaEfektu.tsx | pojedyncze tile, ZERO kickerów, ZERO tagów | mono-kicker z istniejących etykiet (INF_USLUGA_BADGE / kategorie), płytka ikony tam, gdzie karta ma emoji/symbol luzem; tagi tylko z istniejących rejestrów |
| JakToDziala.tsx (4 kroki) | card x4, nic więcej | kicker (numer kroku jako etykieta mono — istniejąca dana), ewentualnie płytka; nieklikalne → bez strzałek |
| NarzedziaTeaser.tsx (klikalne) | tile, arrow, STATUSY x4 (jedyna sekcja!) | mono-kicker; chipy z istniejących tagów narzędzi; najbliżej kompletu wzorca |
| CytatyWalec.tsx (cytaty) | card | NIC nie dodawać — informacyjna, wg wzorca cisza |
| FAQ.tsx | bez .inf-card | wzorzec FAQ: biel 7% + [open] ring — poza anatomią kart |
| HeroDaneRynku (chipy statystyk) | .inf-stat-chip x4 | NIEklikalne — potwierdzić brak sweepa/hovera (wzorzec hero-metrics: zero) |

Konkrety pomiarowe do wdrożenia (klucz → wartość wzorca):

1. PŁYTKA IKONY na kartach W2: nasz .inf-tile ma wartości promo-ikony (flat tło
   14%, glow 18px -4px 55%) — wzorzec PRIMARY ma tło GRADIENT 160deg 14%→5%,
   glow 16px -6px 60%, inset biel 10% i filter drop-shadow 6px 35%; hover karty:
   scale(1.06) rotate(-3deg) + obwódka 26%→48%. Rozstrzygnąć w rundzie: jeden
   .inf-tile (obecny, promo-owy) czy wariant .inf-tile w kartach W2 z gradientem
   — pomiar daje obie receptury 1:1. Glif SVG zawsze pełny kolor (currentColor),
   17-20px w płytce 38-42px.
2. KICKER: wzorzec ma DWA gatunki — promo (Inter 9.6px/700 uppercase ls .14em,
   kolor 78% akcentu + 22% bieli) i primary/learn (MONO 9.6-11.2px, PEŁNY
   akcent, bez uppercase, pod tytułem). Nasz .inf-overline = gatunek mono.
3. HIERARCHIA TYPO wnętrza: tytuł Inter 900 21.6px biały vs opis Inter 400
   13.12px rgb(138,154,181) lh 1.7 vs kicker mono. Kontrast rozmiaru tytuł/opis
   u wzorca to az 1.65x — u nas text-ui/text-body-sm łagodniejszy.
4. CHIPY kart: wzorzec .lp-tag = radius 6px (nie pigułka), mono 8.8px uppercase,
   tekst PEŁNY akcent, obwódka 20%, tło 8%. Nasz .inf-tag w kartach — te same
   procenty co v11; NIE mylić z .inf-chip (pigułka 999px, 12px — inny gatunek,
   hero/podstrony). Luki learn-tagów wzorca (białe, bez ramki po padłym var)
   nie kopiować.
5. STRZAŁKA: znak „→" tekstowy; klikalna karta W2: spoczynek opacity 0
   translateX(-10px), hover opacity 1 + text-shadow 8px pełnym akcentem;
   promo-nawigacyjna: widoczna zawsze, hover +4px. Nieklikalne karty: BEZ
   strzałki w ogóle.
6. STATUSY: tylko fakty (u wzorca OPEN SOURCE/FREE/ACTIVE), zawsze jeden kolor
   zielony #39ff14 na całym home, mono 8px ls .2em, kropka 5px pulse — nasze
   .inf-status v12 zgodne, nietykalne.
7. CISZA §2: sweep zostaje wyłącznie na klikalnych (nasze W3/W2-linki);
   z nieklikalnych kart zdjąć sweep/mocny glow, zostawić delikatną zmianę
   obrysu (wzorzec-bench: tło 4% max). Kafle statystyk: zero efektów hover.
8. FOCUS §3: własny styl — outline 2px var(--card-c) + offset 2-3px na
   .inf-card-linkach; wzorzec nie daje wartości (§3), baza globals ~l.617.

---

## NIEZMIERZONE

- Lift hover primary/learn wzorca: computed pokazał brak (bug specificity
  revealu, §2) — intencja CSS (translateY(-5px/-4px)) przyjęta za wzorzec,
  bo nasz działający hover v12 jest nietykalny.
- Akademia /claude-academy nie używa kart lp-* (własny layout .landing-visual-*,
  bez sweepów, focus też goły) — anatomia kart to język home; podstrony
  narzędzi mają .glowing-card DIV nieklikalny flat (§4), bez sweepa.
- Pozycje stopów gradientów powierzchni: stopy bez pozycji w źródle (rozkład
  równomierny wg spec CSS), jak w v13.
- Mobile (<1024px) wzorca: pomiar tylko 1440px (zakres v14 = desktop home).
- Opacity revealowanych kart poniżej foldu: wymuszone scrollem przed pomiarem;
  wartości borderów/gradientów od revealu niezależne (uwaga v13 aktualna).
