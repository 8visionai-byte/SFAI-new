# Pomiary v19: kątowniki, strzałki, TYPOGRAFIA wzorca, wolniejszy rozbłysk

Data: 2026-08-17. Rola: zwiad pomiarowy (zero edycji kodu, zero buildów, zero commitów).
Spec: `spec-v19.md` (scratchpad, cytaty Pawła).
Wzorzec mierzony: `https://infinitytechstack.uk/` (home) + `/forge-seo` (podstrona) + kontrolnie
9 innych podstron. Nasz stan mierzony na PRODUKCJI `https://www.simplefast.ai/`,
`/narzedzia`, `/realizacje`, `/uslugi/voiceboty`.

Metoda: playwright-core + realny Chrome, viewport 1440x900 (mobile 390 tam, gdzie zaznaczono),
stan hover wymuszany przez CDP `CSS.forcePseudoState` (myszy w headless nie ma),
próbki w locie co ~60-80 ms z narzutem sondy ~20-40 ms. Reguły wzorca czytane z CSSOM
(same-origin, bez CORS), nie ze zrzutu ekranu.

Skrypty pomiarowe (scratchpad sesji):
`v19-w1-rozpoznanie.mjs` (DOM wzorca), `v19-w2-css.mjs` (zrzut reguł CSS wzorca),
`v19-w3-skan.mjs` (skan 11 podstron wzorca pod kątowniki), `v19-w4-hover.mjs` (hover wzorca),
`v19-w5-void-h1.mjs` (H1 responsywnie + kątowniki /void), `v19-t-typo.mjs` (typografia per rola,
ten sam kod na obu serwisach), `v19-n1-strzalki.mjs`, `v19-n2-karty.mjs`, `v19-n3-arrowcls.mjs`,
`v19-n4-testpos.mjs` (dowód interpolacji `background-position`), `v19-foto.mjs` (dowód wizualny).

Dowody wizualne: `v19-foto-wzorzec-spoczynek.png` / `-hover.png`,
`v19-foto-nasza-spoczynek.png` / `-hover.png` (scratchpad).

---

## 1. KĄTOWNIKI (narożniki `[ ]`)

### 1.1 Wzorzec: gdzie one w ogóle są

Przeskanowałem 11 stron wzorca pod kątem elementów-kątowników (absolutne, 3-30 px,
dokładnie 2 krawędzie bordera):

| strona wzorca | kątowników | uwaga |
|---|---|---|
| `/` (home) | **104** | 26 kart `.lp-primary-card` x 4 rogi |
| `/void` | **8** | inna rodzina, inny tryb (patrz 1.4) |
| `/forge-seo`, `/infinity-security`, `/consulting`, `/eu-ai-act`, `/claude-academy`, `/zero-to-hero`, `/service-ops`, `/axiom`, `/mcp` | **0** | podstrony wzorca nie mają kątowników w ogóle |

Wniosek porządkujący: na wzorcu kątowniki to dekoracja JEDNEJ rodziny kart na home
(`.lp-primary-card`) plus statyczny wariant na `/void`. Rodziny `.lp-learn-card`,
`.lp-promo-card`, `.lp-secondary-card`, `.lp-trend-card`, `.lp-faq-item` kątowników NIE mają.

### 1.2 Wzorzec, rodzina `.lp-primary-card` - pełne reguły (CSSOM, 1:1)

```css
.lp-card-corner      { position:absolute; width:10px; height:10px; border-color:var(--card-accent);
                       opacity:.22; transition:opacity .3s; border-radius:1px; }
.lp-card-corner--tl  { top:8px;    left:8px;  border-top:1px solid;    border-left:1px solid; }
.lp-card-corner--tr  { top:8px;    right:8px; border-top:1px solid;    border-right:1px solid; }
.lp-card-corner--bl  { bottom:8px; left:8px;  border-bottom:1px solid; border-left:1px solid; }
.lp-card-corner--br  { bottom:8px; right:8px; border-bottom:1px solid; border-right:1px solid; }
.lp-primary-card:hover .lp-card-corner { opacity:.6; }
```

Computed na żywej karcie (26 instancji, każdy akcent inny: `#b026ff`, `#39ff14`, `#00f0ff`,
`#ff6a00`, `#6366f1`, `#22c55e`, `#a855f7`, `#f59e0b`, `#e879f9`, `#10b981`, `#818cf8`,
`#a78bfa`, `#22d3ee`, `#ff6b00`):

| cecha | spoczynek | hover |
|---|---|---|
| opacity | **0.22** | **0.6** |
| kolor kreski | **rgb(228,228,240)** (biel tekstu) | **rgb(228,228,240)** - BEZ ZMIANY |
| transform | `none` | `none` (zero ruchu) |
| rozmiar | 10 x 10 px, kreska **1 px**, `border-radius:1px` | identycznie |
| pozycja | 8 px od obu krawędzi rogu | identycznie |
| transition | `opacity .3s` (easing domyślny `ease`, bez delay) | ta sama reguła w obie strony |

Kolor jest BIAŁY mimo `border-color:var(--card-accent)` w klasie bazowej, bo skrót
`border-top:1px solid` w klasach kierunkowych resetuje kolor do `currentColor`
(dziedziczona biel tekstu). To potwierdza korektę z v13: nasza biel `rgb(228,228,240)`
jest poprawna, kolorowe narożniki v12 były błędnym odczytem CSSOM.

Próbki w locie (potwierdzenie 0.3 s w obie strony):

| t | wejście (0.22 -> 0.6) | wyjście (0.6 -> 0.22) |
|---|---|---|
| ~60 ms | 0.2347 | 0.5855 |
| ~150 ms | 0.5018 | 0.3319 |
| ~300 ms | 0.6000 | 0.2206 |
| ~450 ms | 0.6 (koniec) | 0.22 (koniec) |

### 1.3 Odpowiedź na pytanie „który tryb ma która rodzina"

**Na wzorcu NIE MA trybu ukrytego kątowników. Jest tylko TRYB WYSZARZONY.**
Zero animacji wejścia: `transform:none` w obu stanach, brak `scale`, brak `translate`,
jedyna zmienna to `opacity`. Kolor na hover zostaje bielą, nie przechodzi w kolor karty.

| rodzina wzorca | tryb kątowników |
|---|---|
| `.lp-primary-card` (home, 26 szt.) | **WYSZARZONY**: biel 0.22 -> 0.6, `opacity .3s`, bez ruchu |
| `.lp-learn-card`, `.lp-promo-card`, `.lp-secondary-card`, `.lp-trend-card`, `.lp-faq-item` | **BRAK kątowników** |
| karty na wszystkich podstronach poza `/void` | **BRAK kątowników** |
| `.vd-neon-card` (`/void`) | **ZAWSZE WŁĄCZONY** (patrz 1.4) |

**Co na wzorcu naprawdę „wyskakuje" na hover** (i najpewniej to Paweł widzi jako „tryb ukryty"):

| element | spoczynek | hover | czas |
|---|---|---|---|
| `.lp-primary-arrow` | `opacity:0`, `translateX(-10px)` | `opacity:1`, `translateX(0)` | 0.35 s |
| `.lp-learn-arrow` | `opacity:0`, `translateX(-8px)` | `opacity:1`, `translateX(0)` | 0.3 s |
| `.lp-card-spotlight` | `opacity:0` | `opacity:1` | 0.3 s |
| `.lp-learn-accent-bar` (boczna kreska 3 px) | `opacity:.5` | `opacity:1` | 0.3 s |

Czyli: „wyskakuje" strzałka i poświata, a kątowniki tylko jaśnieją. To rozbieżność między
tym, co Paweł opisał, a tym, co jest w kodzie wzorca. **Tryb ukryty kątowników byłby
NASZYM dodatkiem ponad wzorzec**, nie odtworzeniem 1:1.

### 1.4 Drugi wariant kątowników wzorca (`/void`) - do wiadomości

```
klasy: absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff]
computed: 16 x 16 px, kreska 2 px, kolor #00f0ff, opacity 1 w spoczynku, hover BEZ ZMIANY
```
Rodzina `.vd-neon-card` (42 karty): kątowniki świecą pełnym neonem cały czas, hover ich nie rusza.
To trzeci tryb („zawsze włączony"), którego u nas nie ma i którego nie polecam: kasuje
różnicę spoczynek/hover, o którą Pawłowi chodzi.

### 1.5 NASZ STAN (produkcja, pomiar CDP na wszystkich rodzinach)

U nas kątowniki to 8 warstw `background-image` w `.inf-card` (2 kreski x 4 rogi),
alfa niesiona zmienną `--inf-corner-a` zarejestrowaną przez `@property` jako `<percentage>`
(globals.css: warstwy 3379-3436, pozycje/rozmiary 3445-3468, `@property` 4114-4118,
`@supports` z transition 4128-4140, hover `--inf-corner-a:60%` w linii 4216).

| rodzina | szt. (4 strony) | spoczynek | hover | kolor |
|---|---|---|---|---|
| `.inf-card` (baza) | 13 | 22% | 60% | rgb(228,228,240) |
| `.inf-card-top` | 23 | 22% | 60% | j.w. |
| `.inf-card-edge` | 22 | 22% | 60% | j.w. |
| `.inf-card-full-hover` | 16 | 22% | 60% | j.w. |
| `.inf-card-quiet` | 7 | 22% | 60% | j.w. |
| `.inf-card-lg.inf-card-top` | 2 | 22% | 60% | j.w. |
| `.inf-card-stat` | 2 | **0%** | **0%** | brak kątowników (świadomie, wzorzec też nie ma) |

Próbki w locie u nas (np. `.inf-card-top` home): 80 ms 28.19%, 160 ms 55.51%, 300 ms 59.99%,
500 ms 60%, czyli **0.3 s, dokładnie jak wzorzec**; tylko krzywa nasza to `--ease-out`
(`cubic-bezier(.16,1,.3,1)`), a wzorca domyślne `ease`. Różnica niewidoczna gołym okiem.

**Werdykt: nasze kątowniki są DZIŚ 1:1 ze wzorcem** (biel, 10 px, 1 px kreska, 8 px odsadzenia,
22% -> 60%, 0.3 s). Prośba Pawła („mają wyskakiwać") to wyjście PONAD wzorzec.
Jedyne realne odchylenia od wzorca u nas: (a) hover kątowników działa tylko `>=1024px`
(u wzorca bez media query), (b) brak `border-radius:1px` na kreskach (warstwy tła nie mają
zaokrągleń; różnica podpikselowa).

### 1.6 Dowód, że „wyskok" da się zrobić bez nowych elementów i bez JS

`background-position` jest własnością interpolowalną, także dla listy 11 warstw. Test na
ŻYWEJ produkcji (`v19-n4-testpos.mjs`, wstrzyknięty `<style>` tylko w sesji przeglądarki,
zero zapisu do repo), przejście odsadzenia 14 px -> 8 px razem z alfą 0% -> 60%:

| t | background-position rogu | `--inf-corner-a` |
|---|---|---|
| spoczynek | 14 px 14 px | 0% |
| ~60 ms | 9.268 px | 47.32% |
| ~120 ms | 8.210 px | 57.90% |
| ~200 ms | 8.028 px | 59.72% |
| koniec | 8 px | 60% |
| powrót ~120 ms | 13.680 px | 3.20% |

Płynnie, w obie strony, bez skoku. Tryb ukryty i tryb wyszarzony są więc wykonalne
na naszej architekturze warstw (propozycje wartości w sekcji 5).

---

## 2. STRZAŁKI

### 2.1 Wzorzec: cztery rodziny, dwa zachowania

| klasa | spoczynek | hover | transition | rozmiar / kolor |
|---|---|---|---|---|
| `.lp-primary-arrow` | `opacity:0`, `translateX(-10px)` | `opacity:1`, `translateX(0)` | `0.35s` (skrót = wszystkie własności, `ease`) | 1.2 rem = 19.2 px, `var(--card-accent)` PEŁNY kolor, `text-shadow:0 0 8px accent` już w spoczynku |
| `.lp-learn-arrow` | `opacity:0`, `translateX(-8px)` | `opacity:1`, `translateX(0)` | `0.3s` | 1.1 rem = 17.6 px, `var(--learn-accent)` |
| `.lp-trend-arrow` | `opacity:0`, `translateX(-4px)` | `opacity:0.8`, `translateX(0)` | `0.3s` | 0.7 rem, `--neon-cyan` |
| `.lp-promo-arrow` | **`opacity:1`**, `transform:none` | `translateX(4px)` | `transform 0.3s` | 1.1 rem, waga 800, `var(--pc)` |

Wzorzec ma OBA schematy: strzałka ukryta (primary/learn/trend) i strzałka stale widoczna,
która na hover tylko podjeżdża (promo). Dojazd ukrytej: **10 px** dla primary, 8 px dla learn.

### 2.2 NASZ STAN na produkcji (pomiar CDP, 1440 px)

Łącznie 34 strzałki `.inf-arrow` na czterech mierzonych stronach; 24 wewnątrz kart.

| strona | wariant karty | szt. | spoczynek | hover |
|---|---|---|---|---|
| `/` | `.inf-card-top` | 5 | `opacity:0`, `translateX(-4px)` OK | `1`, `translateX(0)`, `text-shadow 0 0 12px card45%` |
| `/` | `.inf-card-full-hover` | 4 | **`opacity:1`, `transform:none`** NIEZGODNE | `1`, `translateX(+4px)` |
| `/` | poza kartami (wiersze listy Oferty) | 10 | `opacity:1` (klasy `hidden ... md:inline-block`, `text-accent` cyan) | `translateX(+4px)` |
| `/narzedzia` | `.inf-card-top` | 5 | `opacity:0`, `-4px` OK | `1`, `0` |
| `/realizacje` | `.inf-card-full-hover` | 8 | **`opacity:1`** NIEZGODNE | `1`, `translateX(+4px)` |
| `/uslugi/voiceboty` | `.inf-card-edge` | 2 | `opacity:0`, `-4px` OK | `1`, `0` |

Podsumowanie zgodności z prośbą Pawła („jak uśpienie, to strzałki nie widać"):
- **12 z 24 strzałek w kartach jest OK** (ukryte w spoczynku),
- **12 z 24 łamie regułę**, wszystkie w `.inf-card-full-hover`, bo reguła
  `globals.css:5515` (`.inf-card-full-hover .inf-arrow { opacity:1; transform:none }`)
  świadomie nadpisuje chowanie z bazy (komentarz v12: „wzorzec promo: pełny kolor, opacity 1"),
- 10 strzałek poza kartami (lista Oferty) zostaje widocznych; to inny kontekst
  (wiersz listy, nie karta) i spec o nim nie mówi, więc pytanie do Pawła.

Nasze parametry vs wzorzec:

| cecha | wzorzec (primary) | my | różnica |
|---|---|---|---|
| dystans dojazdu | 10 px | **4 px** | 2,5x krótszy, ruch prawie niewidoczny |
| czas | 0.35 s | **0.22 s** (`--dur-base`) | 1,6x szybszy |
| easing | `ease` | `cubic-bezier(.16,1,.3,1)` | nasz bardziej „strzelający" |
| rozmiar | 19.2 px | 18 px | blisko |
| poświata w spoczynku | `0 0 8px accent` | brak (tylko na hover `0 0 12px 45%`) | wzorzec świeci od razu |
| bramka szerokości | brak (ukryte zawsze, też na dotyku) | tylko `>=1024px` | u nas na dotyku strzałka widoczna, i słusznie |

---

## 3. TYPOGRAFIA (część najważniejsza)

### 3.1 Rodziny fontów: co naprawdę jest na wzorcu

| stos zadeklarowany | ile elementów | rola |
|---|---|---|
| `Inter, system-ui, sans-serif` | 541 | H1, H2, tytuły kart, opisy, CTA, FAQ, treść |
| `"SF Mono","Fira Code","JetBrains Mono", monospace` | 361 | KAŻDA mała etykieta: kicker, tag, status, tagline karty, nawigacja, stopka, liczniki |

Uwaga praktyczna: `SF Mono` jest tylko na macOS, `Fira Code` prawie nikt nie ma zainstalowanego,
więc na Windows i Androidzie stos wzorca ląduje na **JetBrains Mono**, czyli dokładnie
na naszym `--font-mono`. **Mono mamy już 1:1.**
Globalnie: `html { line-height: 1.5 }`, `body { font-family: Inter; font-size: 16px; color: #e4e4f0 }`.

### 3.2 TABELA: rola -> wzorzec -> my -> różnica -> rekomendacja

Pomiar 1440 px, oba serwisy tą samą sondą (`v19-t-typo.mjs`).
Skróty: `ls` = letter-spacing, `lh` = line-height (mnożnik), `w` = waga.

| rola | WZORZEC (rodzina, px, waga, ls, lh) | MY | RÓŻNICA | REKOMENDACJA dla nas |
|---|---|---|---|---|
| **H1 hero** | Inter, 40 -> 72 px (clamp ~5vw), w900, ls `normal`, lh 1.10 | Plus Jakarta Sans, 48 -> 88 px, w700, ls `-0.035em`, lh 1.06 | inna rodzina, waga -200, +16 px, tracking mocno ujemny | `--fs-display` 88 -> **76 px**, waga **800/900**, `ls -0.01em` (dziś -0.035em), lh **1.10** |
| **H2 sekcji** | Inter, 22.4 -> 35.2 px (`clamp(1.4rem,3.5vw,2.2rem)`), w800, ls `normal`, lh 1.50 | Jakarta, 32 -> 46 px, w800, ls `-0.025em`, lh 1.09 | +10.8 px, tracking -0.025 vs 0, interlinia 1.09 vs 1.5 | `--fs-h2` 46 -> **38 px**, `ls -0.008em`, lh **1.22** (pełne 1.5 przy 38 px rozerwie nasz rytm sekcji) |
| **H3 / tytuł karty** | Inter, 21.6 px (1.35 rem), **w900**, ls `-0.01em`, lh 1.50 | Jakarta, 20 px, w800, ls `-0.005em`, lh 1.30 | -1.6 px, waga -100, lżejszy tytuł | `--fs-h3` **21 px**, waga **900** (lub 800, jeśli zostaje Jakarta), `ls -0.01em`, lh **1.40** |
| **podtytuł karty (mono)** | mono, 11.2 px (0.75 rem), w400, ls `normal`, lh 1.5, kolor `#6a7a9a` | `.inf-card-sub`: JetBrains, 12 px, w400, ls `0.06em`, lh 1.40 | +0.8 px, tracking dodany | zejść do **11 px**, `ls 0`, lh 1.5 |
| **opis karty (p)** | Inter, 13.12 px (0.82 rem), w400, ls `normal`, lh **1.70** | Inter, 16 px, w400, lh 1.60 | +2.9 px | w kartach zejść do **15 px**, lh **1.65** (13 px po polsku jest za małe, to kompromis) |
| **kicker / overline** | mono, 9.6 px (0.6 rem), **w700**, ls **`0.30em`**, lh 1.5, `opacity .7`, `text-shadow 0 0 10px` | `.inf-overline`: JetBrains, 11 px, **w400**, ls `0.18em`, lh 1.65 | waga 400 vs 700, tracking 0.18 vs 0.30 | waga **700**, `ls 0.28em`, rozmiar **10 px**, lh 1.5 |
| **etykieta separatora** | mono, 8.8 px (0.55 rem), w700, ls `0.35em` | `.inf-divider-label`: JetBrains, 11 px, w700, ls `0.35em` | +2.2 px, reszta 1:1 | zejść do **9 px**, reszta bez zmian |
| **status karty** | mono, 8 px (0.5 rem), w700, ls `0.20em` | `.inf-status`: JetBrains, 8 px, w700, ls `0.20em` | **1:1, zero różnicy** | zostawić |
| **chip / tag** | mono, 8.8 px (0.55 rem), w700, ls `0.08em`, UPPERCASE, padding `.22rem .62rem`, radius 6 px | `.inf-tag`: JetBrains, 11 px, w700, ls `0.08em`, UPPERCASE | +2.2 px, reszta 1:1 | zejść do **10 px** (nie do 8.8: polskie ogonki i próg AA), radius 6 px |
| **CTA / przycisk** | **Inter**, 16.32 px (1.02 rem), w700, ls **`-0.01em`**, lh 1.5, radius 100 px | **JetBrains Mono**, 15 px, w700, ls **`+0.04em`**, lh 1.65 | **inna rodzina** (mono vs sans) i przeciwny znak trackingu | przejść na **sans (Inter) 16 px w700, `ls -0.01em`**; to największa pojedyncza różnica charakteru |
| **link nawigacji** | **mono**, 11.2 px (0.7 rem), w600, ls `0.04em` | `.inf-nav-link`: **Inter**, 13 px, w600, ls `normal` | odwrotnie niż wzorzec (my sans, oni mono) | **mono 12 px w700, `ls 0.04em`** (u nas mono ma tylko 400/700) |
| **stopka (link)** | mono, 12.8 px (0.8 rem), w500 | Inter, 18 px, w400, lh 1.65 | +5.2 px, inna rodzina | **13 px**; mono w700 dla etykiet, sans dla zdań |
| **licznik / stat** | mono, 20.8-21.6 px, **w900**, `text-shadow currentcolor 0 0 12-14px` | `.inf-counter-value`: JetBrains, 21.6 px, w700, lh 1.1 | waga 700 vs 900 (my nie mamy 900 w mono) | zostawić 700 i naszą poświatę; rozmiar 1:1 |
| **etykieta licznika** | mono, 8.8 px, **w700**, ls `0.12em`, UPPERCASE | `.inf-counter-label`: JetBrains, 10 px, **w400**, ls `0.14em` | waga 400 vs 700 | waga **700**, `ls 0.12em`, 9-10 px |
| **lead / podtytuł hero** | Inter, 20 px, w400, lh 1.60 | `.text-lead`: Inter, 24 px, w400, lh 1.45 | -4 px, luźniejsza interlinia u wzorca | **21 px**, lh **1.60** |
| **treść (body)** | Inter, 16 px, w400, lh 1.5 (`html`) | `.text-body`: Inter, 18 px, w400, lh 1.65 | +2 px | **zostawić 18 px**: treść SEO po polsku, czytelność ważniejsza niż zgodność |
| **caption** | Inter, 13.76 px, w400, lh 1.75 (FAQ) | `.text-caption`: Inter, 13 px, ls `0.01em`, lh 1.4 | podobnie | lh **1.6** |
| **`.text-ui`** | (u wzorca ta rola to CTA/sans) | JetBrains, 15 px, w600, ls `0.04em` | mono w roli UI plus **waga 600, której nie ładujemy** (mamy 400/700) | **sans 15-16 px w600** albo mono w700; dziś przeglądarka syntezuje wagę |
| **`.text-overline`** | (rola pokryta przez mono kicker) | **Inter** 11 px, w400, ls `0.14em`, UPPERCASE | u wzorca ta rola jest ZAWSZE mono | ujednolicić z `.inf-overline` (mono w700) |

### 3.3 Podstrona wzorca `/forge-seo` (kontrola drugiego szablonu)

| rola | wartość |
|---|---|
| H1 | Inter 64 px, w900, ls `-0.0156em`, lh 1.5 |
| H2 | Inter 24 px, w800, ls `normal`, lh 1.5 |
| p | Inter 17 px, w400, lh 1.60 |
| przycisk | Inter 12.48-14 px, w600-800 |
| etykieta formularza | Inter 10-12 px, w700-800, ls `1-2px`, UPPERCASE |
| logo w nawigacji | mono 11.52 px, w800, ls `0.35em` |

Wniosek: na podstronach narzędziowych wzorzec schodzi z mono prawie całkowicie i jedzie
samym Interem w wagach 600-900, a etykiety UPPERCASE z dużym trackingiem robi SANSEM.
Mono jest u nich językiem HOME, nie całego serwisu.

### 3.4 Zachowanie responsywne wzorca (1440 vs 390)

| rola | 1440 px | 390 px | mechanizm |
|---|---|---|---|
| H1 | 72 px | 40 px | clamp na `vw` |
| H2 | 35.2 px | 22.4 px | `clamp(1.4rem,3.5vw,2.2rem)` |
| kicker | 9.6 px | 9.6 px | STAŁY |
| tytuł karty | 21.6 px | 21.6 px | STAŁY |
| tagline karty | 11.2 px | 11.2 px | STAŁY |
| tag | 8.8 px | 8.8 px | STAŁY |
| CTA | 16.32 px | 16.32 px | STAŁY |

Skalują się TYLKO dwa stopnie (H1, H2). Reszta jest sztywna. U nas skalują się cztery
(`--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-metric`), więc kierunkowo zgodnie.

### 3.5 SPRAWA FONTU: DO DECYZJI PAWŁA (nie wdrażać bez zgody)

Fakty:
1. Wzorzec używa do nagłówków **Inter**, nie Plus Jakarta Sans.
2. **Inter już mamy załadowany** (`app/layout.tsx`, `next/font/google`, wagi 400/500/600/700).
3. Wzorzec ciągnie nagłówki na wagach **800 i 900**, których w naszym Interze NIE MA.
4. Plus Jakarta Sans ładujemy w **pięciu wagach** (400/500/600/700/800) wyłącznie dla nagłówków.
5. Mono wzorca ląduje na Windows/Androidzie na JetBrains Mono, czyli **naszym**: zero zmian.
   Ale wzorzec używa mono w wagach 500/600/900, a my ładujemy tylko 400/700
   (dlatego `.text-ui` w wadze 600 jest dziś syntezowana przez przeglądarkę).

Trzy warianty do wyboru (bez wdrażania):

| wariant | co robimy | koszt wagi strony | ryzyko |
|---|---|---|---|
| **A: zostajemy przy Jakarcie** | tylko poprawiamy rozmiary/wagi/tracking wg tabeli 3.2 | **0 KB** | zero; nagłówki dalej mają inny charakter niż wzorzec |
| **B: nagłówki na Inter (rekomendowany)** | dodać do Intera wagi 800+900, **usunąć Plus Jakarta Sans w całości** | **netto MNIEJ** (2 pliki dochodzą, 5 znika) | trzeba przejść wszystkie `font-display` / `--font-jakarta` w CSS i JSX; H1 to sygnatura Pawła (maszyna pisania), więc wymaga jego oględzin |
| **C: mono w pełnej skali** | dodać JetBrains Mono 500+600 | +2 pliki | mały; likwiduje syntezę wagi w `.text-ui` |

Nowego, nieposiadanego fontu **nie trzeba ściągać w żadnym wariancie**: wzorzec nie używa
niczego, czego nie mamy albo czego nie umiemy pokryć.

---

## 4. SWEEP (rozbłysk): wejście i WYJŚCIE

### 4.1 Wzorzec

```css
.lp-primary-card::before { top:0; left:-100%; width:60%; height:100%;
  background:linear-gradient(105deg, transparent 30%, rgba(255,255,255,.03) 45%,
             rgba(255,255,255,.06) 50%, rgba(255,255,255,.03) 55%, transparent 70%);
  transition: left .6s cubic-bezier(.16,1,.3,1); z-index:10; }
.lp-primary-card:hover::before { left:140%; }

.lp-learn-card::after   { /* ta sama geometria, biel .024/.05/.024 */
  transition: left .5s cubic-bezier(.16,1,.3,1); z-index:5; }
.lp-learn-card:hover::after { left:140%; }
```

**Wzorzec NIE ma różnych czasów wejścia i wyjścia.** `transition` stoi na regule bazowej,
więc powrót jedzie tą samą krzywą i tym samym czasem: 0.6 s (primary), 0.5 s (learn).
Zero `transition` w regule `:hover`, zero delay.

Próbki w locie (karta primary 342 px, pas 205 px, droga `-342 px -> +478.8 px`):

| t | wejście | postęp | wyjście | postęp |
|---|---|---|---|---|
| ~60 ms | -206.7 px | 16.5% | +344.6 px | 16.3% |
| ~150 ms | +305.0 px | 78.8% | -150.1 px | 76.6% |
| ~300 ms | +455.6 px | 97.2% | -313.2 px | 96.6% |
| ~450 ms | +477.8 px | 99.9% | -340.1 px | 99.8% |

Symetria potwierdzona liczbowo. Charakter krzywej expo-out: **78% drogi w pierwszych 150 ms**,
ostatnie 20% ciągnie się przez kolejne 450 ms. Stąd wrażenie „strzału" na starcie.

### 4.2 Nasz stan

`globals.css:3501-3517`: geometria 1:1 z primary wzorca (pas 60%, 105deg, biel .03/.06/.03,
`-100% -> 140%`), `transition: left 0.6s cubic-bezier(.16,1,.3,1)` (linia 3516),
hover `left:140%` (linia 4234). Zmierzone na produkcji (karta 520 px):

| t | wejście | postęp |
|---|---|---|
| 80 ms | -222.3 px | 23.9% |
| 160 ms | +488.7 px | 80.8% |
| 300 ms | +689.2 px | 96.9% |
| 500 ms | +727.7 px | 99.9% |

**Jesteśmy 1:1 ze wzorcem, łącznie z symetrią powrotu.** Prośba Pawła („wolniej w obie
strony") to więc świadome odejście od wzorca, nie naprawa błędu. Warto mu to powiedzieć
wprost, bo do tej pory zasadą było „1:1 z Infinity".

Dlaczego powrót „też rozbłyskuje": pas w spoczynku stoi na `-100%`, na hover dojeżdża do `140%`.
Karta jest widoczna dla pasa w zakresie `left` od `-60%` do `100%`, więc **przy zjeżdżaniu
kursora pas przelatuje przez kartę drugi raz, w lewo**. Przy expo-out 78% tej drogi robi się
w 150 ms, stąd „mignięcie" zamiast płynnego zejścia.

### 4.3 Propozycja wartości (wolniej w obie strony, wyjście wolniejsze niż wejście)

| kierunek | dziś | propozycja | uzasadnienie |
|---|---|---|---|
| wejście (hover-in) | `left .6s cubic-bezier(.16,1,.3,1)` | **`left .85s cubic-bezier(.16,1,.3,1)`** | zostaje charakter „strzał i zawis" wzorca, tylko rozciągnięty; +42% czasu |
| wyjście (hover-out) | ta sama reguła, `.6s` expo-out | **`left 1.05s cubic-bezier(.33,0,.67,1)`** | krzywa symetryczna (ease-in-out) zamiast expo-out: pas nie „ucieka" na starcie, wychodzi równo |

Technicznie: `transition` wyjścia zostaje na regule bazowej `.inf-card::after`, a `transition`
wejścia dopisujemy do reguły `:hover`. Zero nowych pętli JS, zero nowych elementów.
Wariant ostrożniejszy, gdyby 1.05 s ciągnęło się za długo: wejście 0.8 s, wyjście 0.95 s.

Legacy: `.inf-shine::after` ma własny sweep `left .6s ease` (globals.css:3784, hover 4282).
Na czterech mierzonych stronach produkcji plus `/poradniki` `.inf-shine` **nie renderuje się
ani razu** (0 instancji), więc nie wymaga zmiany teraz; gdyby wrócił w karcie bloga albo
poradnika, trzeba mu dać te same czasy, inaczej na jednej karcie polecą dwa błyski w innym tempie.

---

## 5. WNIOSKI DLA IMPLEMENTACJI (konkretne wartości do `app/globals.css`)

Kolejność wykonania: 5.1 (sweep, najmniejsze ryzyko) -> 5.2 (strzałki) -> 5.3 (kątowniki)
-> 5.4 (typografia, największy zasięg). Wszystko CSS, zero JS, zero zmian treści.

### 5.1 Sweep: rozdzielenie wejścia i wyjścia

`globals.css:3516` (reguła bazowa `.inf-card::after`) - podmienić czas i krzywą na WYJŚCIOWE:
```css
transition: left 1.05s cubic-bezier(0.33, 0, 0.67, 1);
```
`globals.css:4232-4235` (`@media (min-width:1024px) { .inf-card:hover::after { left:140% } }`)
- dopisać transition WEJŚCIOWE do tej samej reguły:
```css
.inf-card:hover::after {
  left: 140%;
  transition: left 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
```
Blok `prefers-reduced-motion` (4413-4470) już zeruje transition dla `.inf-card::after`
i parkuje pas w `-100%`, więc tam nic nie ruszać.

### 5.2 Strzałki: jedna reguła spoczynku dla wszystkich kart

1. `globals.css:5515-5521` - **usunąć** nadpisanie `.inf-card-full-hover .inf-arrow { opacity:1; transform:none }`
   oraz `.inf-card-full-hover:hover .inf-arrow { transform:translateX(4px) }`. To odblokowuje
   12 strzałek (4 na home, 8 na `/realizacje`) do wspólnej reguły bazy.
2. `globals.css:4238-4241` - wydłużyć dojazd do wartości wzorca:
```css
.inf-card .inf-arrow { opacity: 0; transform: translateX(-10px); }
```
3. `globals.css:3752-3757` (baza `.inf-arrow`) - czas na wartość wzorca (0.22 s -> 0.35 s):
```css
transition:
  transform 0.35s var(--ease-out),
  opacity   0.35s var(--ease-out),
  color     0.35s var(--ease-out);
```
   Jeśli nie chcemy ruszać `--dur-base` globalnie, wpisać `0.35s` literałem tylko tutaj.
4. Opcjonalnie 1:1 ze wzorcem: poświata strzałki JUŻ W SPOCZYNKU
   (`text-shadow: 0 0 8px color-mix(in srgb, var(--card-c) 55%, transparent)`, z fallbackiem
   `rgba` literałem przed `color-mix`, konwencja pliku). Dziś świeci dopiero na hover.
5. Strzałki poza kartami (10 szt. w liście Oferty, klasy Tailwind `hidden ... md:inline-block`)
   - zostawić widoczne albo schować; **to pytanie do Pawła**, spec mówi tylko o kartach.
6. Bramka `>=1024px` zostaje: na dotyku strzałka ma być widoczna, bo hovera nie ma.

### 5.3 Kątowniki: dwa tryby na warstwach `background-image`

Sprawdzone, że działa (sekcja 1.6). Wartości bazowe 1:1 z pomiaru wzorca:
biel `rgb(228,228,240)`, kreska 10 x 1 px, docelowe odsadzenie 8 px, czas **0.3 s**.

**a) TRYB WYSZARZONY** (domyślny, dla rodzin „bohaterów": baza `.inf-card`, `.inf-card-top`,
`.inf-card-lg`, `.inf-card-full-hover`) - jak dziś 22% -> 60%, plus opcjonalnie (prośba Pawła:
„rozświetlają się mocniejszym kolorem") kolor karty na hover. Wymagałoby to zamiany
8 warstw z literału `rgb(228,228,240)` na `var(--inf-corner-c, rgb(228,228,240))` i ustawienia
w hoverze `--inf-corner-c: var(--card-c)`. **UWAGA:** kolor w `linear-gradient` nie interpoluje
przez `@property` (nie jest zarejestrowany), więc przeskoczy skokowo w momencie hovera przy
płynącej alfie. Bezpieczniej: zostawić biel (1:1 wzorzec) i całą „mocniejszość" zrobić alfą
22% -> 75%. **To do decyzji Pawła**, bo jego cytat mówi wprost o kolorze.

**b) TRYB UKRYTY** (dla rodzin cichych: `.inf-card-quiet`, `.inf-card-edge`) - kątowników
w spoczynku nie ma, na hover wyskakują z zewnątrz do rogu:
```css
/* spoczynek wariantu cichego */
.inf-card-quiet, .inf-card-edge { --inf-corner-a: 0%; }
/* + w tych wariantach background-position rogów na 14px zamiast 8px */

/* hover (blok @media (min-width:1024px), obok istniejącego --inf-corner-a:60%) */
.inf-card-quiet:hover, .inf-card-edge:hover {
  --inf-corner-a: 60%;
  /* background-position rogów wraca na 8px -> efekt „wyskoku" 6 px do rogu */
}
```
Do listy `transition` w bloku `@supports` (globals.css:4128-4140) dopisać:
```css
background-position 0.3s var(--ease-out),
```
Zmierzony przebieg tej animacji: 60 ms 9.27 px / 47%, 120 ms 8.21 px / 58%, koniec 8 px / 60%.
Dystans wyskoku 6 px (14 -> 8) jest czytelny i nie wychodzi poza `border-radius` karty.

**c) `.inf-card-stat` zostaje bez kątowników** (`--inf-corner-a: 0%` w obu stanach,
globals.css:5454 i 5529): wzorzec też ich w rodzinie statystyk nie ma.

**d) `prefers-reduced-motion`**: w bloku 4413-4470 dopisać, że przy RM kątowniki
NIE jadą pozycją (`background-position` od razu 8 px), zmienia się sama alfa. Stan docelowy
identyczny, zero ruchu. Wzorzec ma własny blok RM, więc to zgodne z jego gramatyką.

### 5.4 Typografia: tokeny i klasy

Tokeny w `app/globals.css:114-124` (`:root`), wartości z tabeli 3.2:
```css
--fs-display: clamp(3rem, 6vw, 4.75rem);        /* 48 -> 76 px (dziś 88) */
--fs-h2:      clamp(2rem, 3vw, 2.375rem);       /* 32 -> 38 px (dziś 46) */
--fs-h3:      1.3125rem;                        /* 21 px (dziś 20) */
--fs-lead:    clamp(1.25rem, 1.6vw, 1.3125rem); /* 20 -> 21 px (dziś 24) */
--fs-overline: 0.625rem;                        /* 10 px (dziś 11) */
```
Metryki w `tailwind.config.ts:79-94` (tam siedzą `lineHeight` i `letterSpacing` stopni):
```
display: lh 1.10 (dziś 1.02), ls -0.01em  (dziś -0.035em)
h2:      lh 1.22 (dziś 1.09), ls -0.008em (dziś -0.025em)
h3:      lh 1.40 (dziś 1.30), ls -0.01em  (dziś -0.005em)
overline: lh 1.5,             ls 0.28em   (dziś 0.08em w configu, 0.18em w klasie)
```
Klasy w `globals.css`:
- `.inf-overline` (2937-2946): `font-weight: 700` (dziś 400), `letter-spacing: 0.28em`, `font-size: var(--fs-overline)`.
- `.inf-divider-label`: `font-size: 9px`.
- `.inf-tag`: `font-size: 10px` (dziś 11), `border-radius: 6px`.
- `.inf-card-sub`: `font-size: 11px`, `letter-spacing: 0`.
- `.inf-counter-label`: `font-weight: 700` (dziś 400), `letter-spacing: 0.12em`.
- `.inf-nav-link`: `font-family: var(--font-mono)`, `font-size: 12px`, `font-weight: 700`, `ls 0.04em`.
- `.inf-glow-cta` / `.inf-glow-cta-ghost` (CTA): **`font-family: var(--font-inter)`**,
  `font-size: 16px`, `font-weight: 700`, `letter-spacing: -0.01em` (dziś mono + `ls +0.04em`).
  To największa zmiana charakteru i najbardziej „czuć" ją na wzorcu.
- `.text-ui` (2507 i okolice): waga 600 na mono nie jest ładowana, więc albo sans, albo waga 700.
- `.text-overline`: ujednolicić z `.inf-overline` (mono w700); dziś jedzie Interem.
- `.text-body` zostaje 18 px (czytelność treści SEO); `.inf-card .text-body-sm` -> 15 px, lh 1.65.

Żelazne przy tej partii: **treści SEO zero zmian** (ruszamy wyłącznie style), kontrast
tekstu `>=4,5:1` przeliczyć po zejściu w dół z rozmiarami (10 px chip, 9 px separator, 15 px opis
karty). Im mniejszy tekst, tym mniej wolno oszczędzać na alfie; próg dużego tekstu 3:1
NIE działa poniżej 18.66 px w wadze 700.

### 5.5 Czego NIE ruszać (potwierdzone pomiarem, że jest 1:1 albo lepiej)

- kątowniki: kolor `rgb(228,228,240)`, 10 x 1 px, odsadzenie 8 px, alfa 22% -> 60%, czas 0.3 s,
- `.inf-card-stat` bez kątowników,
- `.inf-status` (mono 8 px, w700, ls 0.20em): identyczne z `.lp-primary-status`,
- `.inf-divider-label` tracking 0.35em: identyczny,
- `.inf-tag` tracking 0.08em plus UPPERCASE: identyczne,
- `.inf-counter-value` rozmiar 21.6 px: identyczny,
- geometria sweepa (pas 60%, 105deg, biel .03/.06/.03, `-100% -> 140%`): zmieniamy wyłącznie CZAS,
- hover pełnej ramki i sweep na każdej karcie (v15), czyste warianty (v13), głębia szklana,
  tło `#05050C`, paleta v18.

---

## 6. ROZBIEŻNOŚCI MIĘDZY OPISEM PAWŁA A POMIAREM (do potwierdzenia przed wdrożeniem)

1. **„Kątowniki mają wyskakiwać"** - na wzorcu żadne nie wyskakują. `transform:none` w obu
   stanach, jedyna animacja to `opacity .3s`. Wyskakuje strzałka (10 px) i poświata karty.
   Tryb ukryty będzie naszym dodatkiem ponad wzorzec.
2. **„W niektórych ramkach kątowniki są wyszarzone"** - tak, ale to jedyny tryb, jaki wzorzec
   ma na home; „inne ramki" to te, które kątowników nie mają wcale (learn, promo, secondary, FAQ).
3. **„Rozświetlają się na mocniejszy kolor"** - na wzorcu kolor się NIE zmienia (biel -> biel),
   zmienia się tylko alfa. Kolor karty na hover to byłaby nasza zmiana; przy warstwach
   `background-image` kolor przeskoczy skokowo (nie interpoluje), alfa popłynie.
4. **„Rozbłysk niech będzie wolniejszy"** - dziś jesteśmy dokładnie na wartościach wzorca
   (0.6 s expo-out w obie strony). Spowolnienie oddala nas od wzorca; to świadoma decyzja Pawła.
5. **Font nagłówków** - wzorzec ma Inter, my Plus Jakarta Sans. Zamiana jest tania
   (Inter już ładujemy) i lżejsza, ale dotyka H1 z maszyną pisania, czyli sygnatury Pawła.
