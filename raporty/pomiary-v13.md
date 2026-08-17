# Pomiary v13 — wzorzec infinitytechstack.uk: RAMKI SPOCZYNKU + SEPARATOR

Data pomiaru: 2026-08-17. Narzędzie: playwright-core 1.48.2 + realny Chrome
headless (scratchpad/v13a-explore.mjs, v13b-karty.mjs, v13c-detale.mjs),
viewport 1440x900, DSF 1. Każda liczba pochodzi z computed style żywej strony
(var() i color-mix ROZWIĄZANE do rgb) albo z CSSOM (cssRules — arkusz wzorca
jest dostępny bez blokady cross-origin). Dowody w scratchpadzie pw/:
v13-dane.json (computed wszystkich kart + trace separatora + skan 138 sygnatur
ramek), v13-detale.json, v13-css-home.css (pełny zrzut CSSOM 138 kB),
v13-klasy.json, v13-home-full.png, v13-promo-card.png, v13-primary-card.png,
v13-learn-card.png, v13-divider.png.

UWAGA POMIAROWA: karty poniżej foldu mają w headless `opacity: 0` (reveal na
IntersectionObserver nie odpalił bez scrolla) — to stan przed wejściem w kadr,
nie styl spoczynku; po reveal opacity = 1 (karty nad foldem mają 1). Wszystkie
pozostałe wartości (border, gradienty, cienie) są od tego niezależne.

NOWOŚĆ WZGLĘDEM v12: wzorzec dostał klasę `.lp-card-neon-top` — pasek górny
na KAŻDEJ z 24 kart primary (v12 jej nie miał; „bardzo dużo tych ramek"
Pawła to właśnie ona). Reszta anatomii (hover, statusy) bez zmian od v12.

Zmienne wzorca: --neon-cyan #00f0ff, --neon-magenta #ff00e5,
--neon-violet #b026ff, --neon-green #39ff14.

---

## 1. BAZOWA OBWÓDKA KART — biel 6-7%, nigdy kolor

Computed z żywej strony, spoczynek, wszystkie typy kart home:

| Element | border (4 strony identyczne) | box-shadow spoczynku | radius |
|---|---|---|---|
| .lp-primary-card (24 szt.) | 1px solid rgba(255,255,255,**0.07**) | inset 0 1px 0 biel 5% + czerń 55% `0 10px 34px -18px` | 16px |
| .lp-learn-card (11 szt.) | 1px solid rgba(255,255,255,**0.06**) | inset 0 1px 0 biel 4% + czerń 50% `0 8px 28px -16px` | 14px |
| .lp-promo-card (3 szt.) | 1px solid rgba(255,255,255,**0.07**) | **none** | 14px |
| .lp-faq-item (10 szt.) | 1px solid rgba(255,255,255,**0.07**) | none (po [open]: indigo rgba(99,102,241,.4) + glow 22px) | 12px |
| .lp-hero-metrics (panel metryk hero) | 1px solid rgba(255,255,255,**0.07**) | czerń 60% `0 14px 44px -18px` + inset biel 6% | 18px |
| .lp-forge-github (przycisk) | 1px solid rgba(255,255,255,**0.10**) | none | 4px |

JEDYNY wyjątek barwiony: `.lp-primary-card--forge` (1 karta „The Forge") ma
border rgba(255,107,0,**0.12**) — i to jest maksimum koloru, jakie wzorzec
kładzie na PEŁNĄ ramkę w spoczynku. Potwierdzenie tezy Pawła: baza ~biel 6-7%,
kolor w spoczynku niesie wyłącznie WYRÓŻNIK (pasek/ring/bok), nigdy cała
obwódka.

Drobne ramki akcentowe (kolor, ale niskie alfy): .lp-tag border kolor 20% /
tło 8%, .lp-tech-badge border 18% / tło 6%, .lp-learn-badge (FREE) border
rgba(57,255,20,0.15) / tło 6%, .lp-secnav-btn--active border cyan 20%.

---

## 2. CZTERY TYPY RAMEK SPOCZYNKU — potwierdzone i zdjęte 1:1

### TYP A — GÓRA GASNĄCA KU ROGOM (`.lp-card-neon-top`, 24/24 kart primary)

```css
.lp-card-neon-top {
  position: absolute; top: 0; left: 0; right: 0;   /* pełna szerokość karty */
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--card-accent),
              var(--card-accent-alt), transparent);
  box-shadow: 0 0 8px var(--card-accent);           /* łuna PEŁNYM kolorem */
}
```

Computed (przykład Infinity ID): `linear-gradient(90deg, rgba(0,0,0,0),
rgb(176,38,255), rgb(176,38,255), rgba(0,0,0,0))`, box-shadow
`rgb(176,38,255) 0 0 8px`, wysokość 1px, opacity 1. Stopy BEZ pozycji, więc
wg spec CSS rozkładają się równo: **transparent 0% → kolor 33.33% → kolor-alt
66.67% → transparent 100%** — środkowa 1/3 paska trzyma pełny kolor, boczne
tercje gasną do rogów. Kolor w gradiencie i łunie jest CZYSTY (100%, zero
rozcieńczenia); „delikatność" robi sama geometria 1px. Reszta ramki karty
= biel 7% z §1 („niemal niewidoczna"). To jest typ a) Pawła co do joty.

19 z 24 kart ma pasek jednokolorowy (accent = accent-alt) — czysty TYP A.

### TYP D — PASEK GÓRNY W ODCIENIACH JEDNEGO KOLORU (5/24 kart primary)

Te same reguły co TYP A, ale --card-accent ≠ --card-accent-alt — pasek
przechodzi między DWOMA sąsiednimi odcieniami (stopy 33.33% / 66.67%):

| Karta | sekcja | stop 33.33% | stop 66.67% | rodzina |
|---|---|---|---|---|
| Void LLM | Research | rgb(245,158,11) #f59e0b amber | rgb(255,107,0) #ff6b00 pomarańcz | „odcienie pomarańczowego" |
| Neuromantix | Research | rgb(167,139,250) #a78bfa fiolet jasny | rgb(255,0,229) #ff00e5 magenta | „tak samo z fioletowym" |
| Vitalis | Research | rgb(34,211,238) #22d3ee cyjan | rgb(57,255,20) #39ff14 zieleń | zimne |
| Freedom OS | Research | rgb(16,185,129) #10b981 szmaragd | rgb(0,240,255) #00f0ff cyjan | zimne |
| Explore full Security page | Security Stack | rgb(57,255,20) #39ff14 | rgb(0,240,255) #00f0ff | zieleń→cyjan |

Łuna (box-shadow 8px) zawsze bierze PIERWSZY odcień (--card-accent).
„Odcienie" grają też MIĘDZY kartami jednej sekcji — każda karta ma własny
akcent (pełna lista w §5): w sekcji tools sąsiadują #6366f1 / #818cf8 /
#a855f7 / #e879f9 (cztery fiolety) i #22c55e / #10b981 (dwie zielenie);
pomarańcze wzorca w różnych kartach: #ff6a00, #ff6b00, #f59e0b, #f97316,
#ff9900.

### TYP B — TYLKO LEWY BOK ŚWIECI, GÓRA CZYSTA (`.lp-learn-card`, 11 szt.)

Computed paska `.lp-learn-accent-bar` (pierwszy element flexa, nie pseudo):

```
width: 3px; height: 100% karty (zmierzone 193.7px);
background: linear-gradient(180deg, rgb(0,240,255), color(srgb 0 0.94 1 / 0.3));
/* = pełny kolor u góry -> 30% koloru u dołu */
opacity: 0.5;            /* hover -> 1 (reguła v12, bez zmian) */
box-shadow: none;        /* bok NIE ma łuny — łunę ma tylko TYP A/D */
```

Karta wokół: biel 6%, zero top-glow, zero narożników. Czyli typ b) Pawła:
bok świeci (pełny kolor stłumiony opacity .5), góra czysta.

### TYP C — BOK + KAWAŁKI KRAWĘDZI PRZY NAROŻU (`.lp-promo-card`, górna sekcja)

Sekcja .lp-promo to PIERWSZA sekcja kart pod hero („górna sekcja" z cytatu).
Ring ::before — ramka 1px liczona maską:

```css
.lp-promo-card::before {
  inset: 0; padding: 1px; border-radius: 14px;
  background: linear-gradient(135deg, var(--pc), transparent 55%);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity: 0.5;          /* hover -> 1 */
}
```

Computed (3 karty): gradient 135deg od PEŁNEGO koloru w lewym górnym narożu
gasnący do zera na 55% przekątnej; kolory: #ff00e5 (violet/magenta), #39ff14
(green), #00f0ff (cyan). Efekt wizualny: kawałek GÓRY (gaśnie w prawo)
+ kawałek LEWEGO BOKU (gaśnie w dół) przy narożu TL; dolna-prawa połowa ringu
niewidoczna. POMIAR MÓWI: dół w tym ringu NIE świeci — „kawałki dołu" z opisu
Pawła robią dopiero narożniki [ ] (niżej), obecne na kartach primary.

NAROŻNIKI [ ] (`.lp-card-corner--tl/tr/bl/br`, 4 szt. na każdej karcie
primary): 10x10px, kreski 1px, wsunięte 8px od krawędzi, radius 1px,
opacity 0.22 (hover 0.6). KOREKTA WZGLĘDEM v12: computed kolor widocznych
kresek to **rgb(228,228,240) — BIEL tekstu, nie kolor karty**. CSSOM ustawia
`border-color: var(--card-accent)`, ale skróty `border-top: 1px solid` /
`border-left: 1px solid` w klasach kierunkowych RESETUJĄ kolor do
currentColor (dziedziczona biel #e4e4f0). Zmierzone na kartach violet
i green: widoczne kreski zawsze rgb(228,228,240), kolor karty zostaje tylko
na bokach o szerokości 0 (niewidocznych). Narożniki wzorca są więc BIAŁE
22% — subtelniejsze niż nasze kolorowe.

---

## 3. SEPARATOR SEKCJI — 2 rozbłyski naraz, przelot widoczny ~2.7 s

### Struktura (6 separatorów na home: 01, 01.5, 02, 03, 04, 05)

```
.lp-divider          flex, gap 1.25rem, max-width 1120px, margin 0 auto
  .lp-divider-line   lewa linia  (417px przy 1440)
  .lp-divider-label  „01 · LEARN · BUILD · SHIP"
  .lp-divider-line   prawa linia (417px)
```

Linia bazowa: height 1px, `linear-gradient(90deg, transparent,
rgba(139,92,246,0.15), transparent)`, overflow hidden.

### Rozbłysk (::after każdej linii)

```
width: 40% linii (computed 166.8px przy linii 417px); height: 1px (100%);
background: linear-gradient(90deg, transparent, rgba(0,240,255,0.4),
            rgba(255,0,229,0.3), transparent);
box-shadow: none;  opacity: 1;      /* zero łuny — świeci sam gradient */
animation: divider-shimmer 4s ease-in-out 0s infinite;
@keyframes divider-shimmer { 0% { left: -40%; } 100% { left: 140%; } }
```

### ILE PUNKTÓW NARAZ (getAnimations + trace na żywo)

document.getAnimations: **12 animacji divider-shimmer** (6 separatorów x 2
linie), WSZYSTKIE delay 0, duration 4000ms, ten sam startTime (854ms) — pełna
synchronizacja. Trace computed `left` co ~100ms przez 4.4s: obie linie
pierwszego separatora idą IDENTYCZNIE (np. t=1260ms: 31.84px | 31.84px),
cykl zawija się dokładnie na 4.0s. Czyli na jednym separatorze jadą
**2 rozbłyski jednocześnie** (lustrzanie: lewa i prawa linia w tej samej
fazie) — to są „dwie… na raz się pokazują" Pawła; „trzy" to zapewne moment,
gdy w kadrze widać częściowo drugi separator (wszystkie są w fazie).

### CZAS PRZELOTU (policzone numerycznie z krzywej beziera + trace)

Trasa left -40% → 140% (180% szerokości linii) w pełnych 4s, ease-in-out
(standardowe cubic-bezier(0.42,0,0.58,1)), BEZ ŻADNEJ PAUZY w keyframes:

| Metryka | wzorzec | NASZ stan (globals.css v7-v12) |
|---|---|---|
| keyframes | 0% → 100% cała trasa (bez pauzy) | przelot w 0-60% cyklu, pauza 60-100% (1.6s) |
| trasa | -40% → 140% linii (180%) | -100% → 160% linii (260%, dłuższa) |
| easing | ease-in-out (0.42,0,0.58,1) | var(--ease-in-out) = (0.65,0,0.35,1), bardziej stromy |
| pas WIDOCZNY nad linią | **~2.70s** z każdych 4s | **~0.54s** z każdych 4s |
| środek pasa nad linią | ~1.47s | proporcjonalnie krócej |

To jest cała skarga „mija za szybko": u wzorca rozbłysk wisi nad linią 5x
dłużej, bo (1) nie ma pauzy — trasa rozciągnięta na pełne 4s, (2) trasa
krótsza, (3) łagodniejszy bezier. Częstotliwość ta sama (co 4s).

Reduced-motion: wzorzec gasi `.lp-divider-line::after` przez
`animation: none !important` w swoim bloku RM (linia 1187 zrzutu CSSOM) —
nasza bramka RM jest zgodna.

---

## 4. POZOSTAŁE UNIKALNE RAMKI HOME (skan 138 sygnatur, top wystąpień)

| Element | ramka / dekoracja spoczynku |
|---|---|
| .lp-hero-btn--primary | border 1px rgba(0,240,255,**0.75**) + 3 cienie (cyan 28% 22px, inset biel 12%, inset cyan 8% 18px) — NAJMOCNIEJSZA obwódka wzorca, tylko CTA hero |
| .lp-hero-btn--ghost | border 1px rgba(167,139,250,0.55) + cień 16px |
| .lp-tool-icon (kafel ikony primary) | border 1px kolor 26%, tło gradient 14%→5%, glow `0 0 16px -6px` kolor 60% |
| .lp-learn-icon | border 1px kolor 24%, tło 13%→4%, glow `0 0 14px -6px` pełny kolor |
| .lp-promo-icon | border 1px kolor 28%, tło 14%, glow `0 0 18px -4px` kolor 55% |
| .lp-section-title-line (kreska pod H2) | 50x2px, gradient 2 PEŁNYCH kolorów + glow 12px 30%; 4 warianty par (cyan→magenta, gold #e4a541→fiolet #a78bfa, indigo #6366f1→#a855f7, green→cyan) |
| .lp-card-divider (wewnątrz kart flagship) | 1px, gradient transparent→PEŁNY kolor→transparent, opacity 0.2 |
| .lp-promo-line (obok nagłówka promo) | 1px, gradient transparent→cyan 28%→transparent |
| .lp-status-dot | 5x5px, pełny #39ff14, glow 6px, pulse-glow 2s (bez zmian od v12) |

---

## 5. MAPA SEKCJA → TYP (home wzorca, kolejność pionowa)

| # | Sekcja (H2) | typ ramek | karty i akcenty |
|---|---|---|---|
| 1 | HERO „Elite AI Academies" | panel biel 7% (hero-metrics) + CTA cyan 75% / fiolet 55% | — |
| 2 | .lp-promo (górna sekcja kart, bez H2) | **TYP C** ring od naroża TL | 3: #ff00e5, #39ff14, #00f0ff |
| 3 | „Master Gemini, OpenAI, Azure & Claude" (learn) | **TYP B** lewy bok | 11: #00f0ff x2, #4285F4, #10a37f, #0078D4, #ff9900, #00D4AA, #e4a541, #a855f7, #f97316, #60a5fa |
| 4 | „Infinity Security Stack" | **TYP A** + 1x TYP D + narożniki [ ] białe | 5: #b026ff, #39ff14, #00f0ff, #ff6a00 + D: #39ff14→#00f0ff |
| 5 | „Free Developer Tools" | **TYP A** (9 kart, 8 RÓŻNYCH akcentów) + narożniki | #6366f1 x2, #22c55e, #a855f7, #f59e0b, #e879f9, #10b981, #818cf8, #a78bfa |
| 6 | „Open Source on GitHub" | **TYP A** + narożniki; forge z barwioną ramką 12% | 6: #b026ff, #39ff14, #00f0ff, #a78bfa, #ff6b00, #22d3ee |
| 7 | „Researching the Future of AI & AGI" | **TYP D** (wszystkie 4 karty dwustopowe) + narożniki | #a78bfa→#ff00e5, #22d3ee→#39ff14, #f59e0b→#ff6b00, #10b981→#00f0ff |
| 8 | „Questions, Answered" (FAQ) | biel 7%, [open] indigo 40% + glow | — |

Separatory (6) stoją między sekcjami 3-8.

---

## 6. WNIOSKI DLA IMPLEMENTACJI (nasze klasy, globals.css ~l.5010-5240)

1. BAZA `.inf-card`: zdjąć `border: 1px solid var(--card-c)` (100% koloru,
   v12) → **rgba(255,255,255,0.07)** (a w wariancie edge 0.06). To jedyna
   duża zmiana bazy; box-shadow spoczynku (inset biel + czerń) już mamy 1:1.
   Kolor w spoczynku przenosi się CAŁY na wyróżnik wariantu. Hover (pełna
   ramka kolorem) NIE do ruszania — zgodny i pochwalony.
2. W2 `.inf-card-top`: linia top = anatomia .lp-card-neon-top: 1px, pełna
   szerokość, gradient 90deg transparent 0% → kolor 33.33% → kolor-alt
   66.67% → transparent 100%, PLUS box-shadow `0 0 8px` pełnym kolorem.
   Nowa zmienna `--card-c-alt` (fallback: var(--card-c)) da TYP D za darmo.
3. TYP D u nas: w jednej sekcji „research-like" nadać kartom pary odcieni
   (pomarańcz mocny→amber, fiolet→magenta itd.); w pozostałych sekcjach
   różnicować akcent per KARTA (wzorzec: 8 różnych akcentów na 9 kart),
   nie jeden kolor na sekcję.
4. Narożniki [ ]: przemalować z koloru karty na **biel rgb(228,228,240)**
   przy opacity .22 (hover .6) — 1:1 z pomiarem (korekta ustalenia v12).
5. W1 `.inf-card-edge`: pasek ma być na **opacity .5** w spoczynku (hover 1),
   bez box-shadow; geometria 3px/gradient 180deg pełny→30% już zgodna.
6. W3 `.inf-card-full-hover`: ring już 1:1 (135deg, transparent 55%,
   opacity .5) — wystarczy, że baza przestanie barwić obwódkę (pkt 1);
   box-shadow spoczynku: none (już jest).
7. W4 `.inf-card-stat`: wrócić do bieli 7% na ramce (wzorzec hero-metrics);
   neon niosą wyłącznie liczby (text-shadow currentcolor — już mamy).
8. SEPARATOR `.inf-divider-line::after` — trzy poprawki w keyframes
   `inf-divider-shimmer` (zostając przy translate3d, nasz budżet perf):
   trasa -100% → 350% szerokości pasa (= -40% → 140% linii, 1:1), keyframes
   0% → 100% BEZ pauzy, easing literalnie `ease-in-out` (nie nasz token
   0.65/0.35). Duration zostaje 4s. Efekt: widoczność iskry 0.54s → ~2.7s
   („wolniej"), 2 iskry na separator w pełnej synchronizacji (mamy 2 linie,
   delay 0 — zostawić). NIE dodawać box-shadow ani „kropek": u wzorca punkt
   to pas 40% szerokości linii, 1px wysokości, gradient cyan .4 → magenta .3
   (nasze kolory accent 40% / ring-2 30% są odpowiednikiem 1:1).
9. Bez zmian: hover v12, statusy, maszyna pisania, SEO, bramka RM
   (wzorzec też gasi iskrę pod reduced-motion), pauza IntersectionObserver
   `is-paused` (nasza optymalizacja ponad wzorzec — zachować).

---

## NIEZMIERZONE

- Opacity kart poniżej foldu po reveal: w headless 0 (IntersectionObserver
  nie strzelił); przyjęte 1 na wzór kart nad foldem — reszta wartości
  computed niezależna od reveal.
- Pozycje stopów gradientu neon-top: computed nie podaje pozycji (stopy bez
  pozycji w źródle) — 33.33/66.67% wynika z reguły równego rozkładu spec
  CSS, nie z odczytu liczbowego.
- Ewentualne różnice mobile (<1024px) wzorca: zwiad robiony tylko na 1440px
  (zakres v13 = desktop home).
- Sekcje warunkowe wzorca (.lp-secondary-card, .lp-trend-card): nieobecne
  w DOM home także w tym renderze — bez zmian od v12 (wartości CSSOM w
  raporcie v12).
