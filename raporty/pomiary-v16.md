# Pomiary v16 — zwiad (2026-08-17)

Narzędzia: playwright-core 1.48.2 + realny Chrome (headless), viewport 1440x900,
deviceScaleFactor 2. Metody: computed/CSSOM na żywych stronach + analiza
pikselowa pasa górnego kart (zrzut klipu, luma uśredniona na wiersz;
1 wiersz = 0,5 px CSS). Wzorzec: https://infinitytechstack.uk/. My:
https://www.simplefast.ai/ (produkcja; potwierdzone v15 na prodzie —
`.inf-card-static` nieobecna w CSSOM).

Dowody (scratchpad sesji `...\scratchpad\`): sondy `v16a-wzorzec.mjs`,
`v16a2-security.mjs`, `v16b-neon.mjs`, `v16c-topy.mjs`, `v16c2-piksele.mjs`,
`v16d-sasiedztwo.mjs`, `v16d2-surowe.mjs`; wyniki `pw/v16a*.json`,
`pw/v16b-neon.json`, `pw/v16c*.json`, `pw/v16d*.json`; zrzuty
`pw/v16a2-secID-*.png`, `pw/v16c2-*-{rest,hover}.png`.

---

## 1. WZORZEC — górne krawędzie (sekcja "Infinity Security Stack" + inne rodziny)

Karty Infinity ID / Observe / Data / Stream to rodzina `.lp-primary-card`
(26 wystąpień na stronie, 5 w sekcji security; wartości identyczne jak karty
Open Source — jedna implementacja).

### 1.1 Anatomia górnego rozświetlenia (computed, karta "Infinity ID")

| Warstwa | Wartość zmierzona |
|---|---|
| Linia (element `.lp-card-neon-top`) | wysokość **1px**, `position:absolute; top:0; left:0; right:0` (szer. 342px = 99,4% karty, wewnątrz obwódki) |
| Gradient linii | `linear-gradient(90deg, transparent, rgb(176,38,255), rgb(176,38,255), transparent)` — stopy bez pozycji, czyli **transparent 0% -> pełny kolor 33,33% -> pełny kolor 66,67% -> transparent 100%**; kolor CZYSTY, bez alfy |
| Halo/łuna | **wyłącznie** `box-shadow: 0 0 8px rgb(176,38,255)` na tej 1px linii (blur 8px, spread 0, pełny kolor). Żadnej warstwy radialnej |
| Ścięcie | karta ma `overflow:hidden` -> halo świeci TYLKO do wewnątrz karty; nad krawędzią zero poświaty (zmierzone pikselowo) |
| Karta pod spodem | border `1px solid rgba(255,255,255,.07)`, radius 16px, tło `linear-gradient(160deg, rgba(13,14,30,.88), rgba(9,10,22,.72))`, cień `inset 0 1px 0 white 5% + 0 10px 34px -18px black 55%` |

### 1.2 Pomiar pikselowy (luma; tło wnętrza karty ~13,5)

| Stan | Linia (peak luma) | Halo: delta nad tłem tuż pod linią | Zasięg halo do tła | Poświata NAD krawędzią | Łączna wizualna grubość |
|---|---|---|---|---|---|
| Spoczynek | ~66 (uśr. po całej szer. z wygaszonymi końcami; środek ~90-100) | **+7** | **~4 px CSS** | 0 | ~5px, z czego wyraźne ~2px |
| Hover | ~71 (linia BEZ zmian w computed) | +10 | ~4-5px | +6 (zewn. cień hoveru karty) | jw. |

Hover wzorca NIE dotyka linii ani halo (computed neon-topa identyczne przed i
po). Zapala się karta: border -> kolor 65% alfy, box-shadow ->
`kolor 35% 0 22px 48px -20px + kolor 14% 0 0 28px + inset biel 9%`, wnętrze
jaśnieje o ~5 lumy. "Subtelność" wzorca w spoczynku = mała ENERGIA halo:
box-shadow z 1px źródła daje deltę zaledwie +7.

### 1.3 Inne rodziny wzorca z górną linią (pomiar pikselowy)

| Rodzina | Spoczynek | Hover |
|---|---|---|
| `.lp-learn-card` | BEZ linii (tylko border biel; delta 0) | linia zapala się: peak ~119, halo ~1px (delta +19 przez 1 wiersz), praktycznie sama kreska |
| `.lp-promo-card` | linia przygaszona: peak ~31 (delta +17), bez zauważalnego halo | peak ~51, dalej bez halo |
| `.lp-divider-line::after` i linie dekoracyjne | 1px gradienty bez halo | — |

Wniosek: w CAŁYM wzorcu żadna górna krawędź nie ma halo szerszego niż ~4px
CSS ani delty jaśniejszej niż ~+7..+19 lumy.

---

## 2. KALIBRACJA NEONU — przycisk "Umów diagnozę" (`.inf-glow-cta`, nav)

### 2.1 Wzorcowy poziom jarzenia (computed + źródło globals.css:3755)

| Właściwość | Spoczynek | Hover |
|---|---|---|
| color | `#ff00e5` PEŁNY | `#ffffff` |
| text-shadow | **none** | `0 0 8px #fff, 0 0 15px #ff00e5` |
| border | `1px solid rgba(255,0,229,.5)` (puls do 1.0) | `1px solid #ff00e5` |
| background | `rgba(255,0,229,.08)` | `rgba(255,0,229,.2)` |
| box-shadow | `0 0 12px rgba(255,0,229,.2) + inset 0 0 8px rgba(255,0,229,.1)`; puls `infCtaPulse` 2s do `0 0 25px .5 + inset 0 0 12px .3` | `0 0 35px .8 + inset 0 0 15px .4` |
| typografia | mono 700, 15px, pudełko 175x51px | jw. |

KLUCZ KALIBRACJI: w spoczynku neon "Umów diagnozę" NIE świeci text-shadowem.
Jarzenie robi PUDEŁKO: tint tła 8% koloru + obwódka 50% + halo box-shadow
12px/20% + inset 8px/10% (i delikatny puls). Tekst = czysty pełny kolor.
Dla elementów tekstowych bez pudełka odpowiednikiem jarzenia jest text-shadow
w currentColor (nasz chwalony wewnętrzny wzorzec: `.inf-counter-value`).

### 2.2 Obecne kolorowe elementy kart vs kalibracja (computed z home)

| Element (rozmiar) | TERAZ (zmierzone) | CEL przy kalibracji "Umów diagnozę" (przeskalowanej) |
|---|---|---|
| kicker `.inf-card .inf-overline` (11px mono) | color pełny `--card-c`; ts `0 0 12px` kolor 45% | color bez zmian; ts dwuwarstwowy `0 0 6px kolor 60% + 0 0 14px kolor 30%` (rdzeń + ogon jarzeniówki; alfa zamiast pełnego krycia, żeby halo nie podbijało tła pod literami — patrz nota AA niżej) |
| tagline `.inf-card-sub` (12px) NarzedziaTeaser | color pełny; ts `0 0 12px` 45% | jak kicker: `0 0 6px 60% + 0 0 14px 30%` |
| status `.inf-status` (8px/700) | color pełny; ts **none**; kropka: bg pełny + `0 0 6px` pełny | tekst: `0 0 6px kolor 60%`; kropka: dodać ogon `0 0 6px pełny + 0 0 12px kolor 40%` |
| liczba `.inf-counter-value` (19-28px) | color pełny; ts `0 0 14px currentColor` (pełny) | BEZ ZMIAN — to jest wewnętrzny wzorzec jarzenia tekstu; ewent. ogon `+ 0 0 28px kolor 25%` na liczbach >=22px |
| płytka `.inf-tile` (40x40 box) | border kolor 28%; box-shadow `inset 0 1px 0 biel 10% + 0 0 16px -6px kolor 60%`; tło BEZ tintu (transparent) | gramatyka CTA: border kolor 50%; tło tint `kolor 8%`; glow `0 0 12px kolor 20%` (bez ujemnego spreadu — teraz -6px dusi promień) `+ inset 0 0 8px kolor 10%` |
| chip `.inf-chip[--chip-c]` (12px pigułka; 0 na home, żyje na podstronach usług — NIE RUSZAĆ plików uslug) | tekst mix 72% koloru z bielą; ts `0 0 12px` 55%; border 70%; bg 12% | brakuje mu tylko halo pudełka: `box-shadow: 0 0 12px kolor 20% + inset 0 0 8px kolor 10%`; reszta już zgodna z CTA (uwaga: zmiana w globals.css obejmie podstrony — decyzja Pawła) |
| stat-chip `.inf-stat-chip` (hero) | border 55%; bg 8%; glow `0 0 16px 16% + inset 0 0 10px 7%` | JUŻ najbliższy kalibracji; ewent. glow 16% -> 20% i inset 7% -> 10% dla 1:1 |

Nota AA: jarzenie przez text-shadow/box-shadow nie zmienia koloru tekstu, więc
kontrast liczony na kolorze zostaje. Ale halo w pełnym kryciu POD literami
potrafi rozjaśnić tło i realnie zjeść kontrast (zmierzone w v9 na chipie:
fiolet spadał do 4,39:1). Fiolet #b638ff ma margines AA ~0,1 — dlatego rdzeń
60% + ogon 30%, nie pełne krycie; po implementacji zmierzyć kontrast na
pikselach karty fioletowej.

Niespójność wykryta przy okazji: `@keyframes infAskPulse` (globals.css:4758)
hardkoduje ZIELEŃ `rgba(34,224,107,...)`, a `.inf-sub-dot` bywa cyjanowy
(bg `#11e0ff` + zielony puls jednocześnie — zmierzone na karcie Narzędzi).

---

## 3. KATALOG NASZYCH GÓRNYCH ROZŚWIETLEŃ (home) + ile za grube

Implementacja u nas: dwie pierwsze warstwy `background-image` bazy `.inf-card`
— linia `100% x 1px` (gradient 90deg jak wzorzec, stopy 0/33,33/66,67/100%)
oraz ŁUNA `radial-gradient(ellipse 55% 100% at 50% 0%, kolor, transparent 78%)`
w pasie `100% x 10px`. Alfy niosą `--inf-top-a` / `--inf-top-halo`
(spoczynek wariantu -top: 100% / 100% od v15).

### 3.1 Pomiar pikselowy naszych kart (środkowa 1/3 szerokości; tło ~11-12)

| Karta | Stan | Linia peak | Halo delta | Zasięg halo | vs wzorzec |
|---|---|---|---|---|---|
| typ A (Problem, `#11e0ff`) | rest | 186 | **+125** | ~6,5px | halo ~12-18x za mocne, zasięg 1,6x |
| typ A | hover | 188 | +130 | ~6,5px | wzorzec hover nie wzmacnia linii/halo |
| typ D (Rozwiązanie, `#a586ff`/`#ff00e5`) | rest | 135 | +100 | ~7px | jw. |
| lg+top (cennik, `#2b7cff`) | rest | 124 | +77 | ~6,5px | jw. |
| stat (Dowód) | rest | 0 (czysto — tylko border biel) | 0 | — | ZGODNE z wzorcem (learn: rest bez linii) |
| stat | hover | 177 | **0 (bez halo)** | — | zgodne z gramatyką hoveru learn (sama kreska); jaśniejsza niż 119 wzorca |

Metodyczna uwaga: peak wzorca (66) to średnia po pełnej szerokości linii
z wygaszonymi końcami, nasze klipy to środek gradientu — po korekcie linia
wzorca w środku ma ~90-100 lumy. Czyli NASZA LINIA jest zbliżona/nieco
jaśniejsza (kolor palety też jaśniejszy), a "grubość i rozlanie" robi
niemal wyłącznie ŁUNA: delta +77..+125 vs +7 u wzorca.

### 3.2 Wystąpienia i cele (tabela miejsce -> teraz -> cel)

| Miejsce (selektor/wariant) | Szt. | TERAZ | CEL (wg pomiaru wzorca) |
|---|---|---|---|
| Problem: 3 karty `.inf-card-top` + wide `#ffa101` + CTA `#5ba4ff` | 5 | linia 1px pełna, łuna 10px @ 100% | linia BEZ ZMIAN (1px pełny kolor = wzorzec); łuna: alfa 100% -> **~12%** (docelowa delta +7..10 lumy), pas 10px może zostać (radial i tak wygasza przy 78%) albo zejść na `100% 8px`; PO ZMIANIE zmierzyć pikselowo deltę |
| Rozwiązanie: 2 duże `.inf-card-top` | 2 | jw. | jw. |
| Rozwiązanie: 4 kafle typ D (`--card-c-alt`: `#a586ff/#ff00e5`, `#11e0ff/#39ff14`, `#00c986/#00f0ff`, `#ffa101/#ff6b00`) | 4 | linia dwustopowa 1px pełna, łuna 10px @ 100% (łuna zawsze z 1. odcienia) | jw. — pasek odcieni (gradient dwustopowy) zostaje 1:1, subtelnieje tylko łuna |
| Narzędzia: 5 kart `.inf-card-top` | 5 | jw. | jw. |
| Cennik: 2 karty `.inf-card-lg.inf-card-top` | 2 | jw. | jw. (bohater może dostać minimalnie więcej, np. 15%, jeśli po zmianie zniknie z ekranu) |
| Dowód: 2 karty `.inf-card-stat` (odpowiednik hero-metrics) | 2 | rest czysty; hover linia 1px pełna bez łuny | rest BEZ ZMIAN; hover-linia zgodna z wzorcem — zostaje |
| `.inf-divider-line::after` (separatory sekcji) | 30 | 1px, gradient cyjan 40% / magenta 30%, bez łuny | w normie wzorca (`lp-divider-line`) — bez zmian |
| `sf-route` (linie procesu, dekoracja) | 2 | 1px gradient, bez łuny | nie jest górnym rozświetleniem karty — bez zmian |

Poza tym na home NIE ma innych bytów z górną linią/łuną (skan pseudo-elementów,
elementów-linii i border-topów całego dokumentu; hero-panel, FAQ, demo — czysto).
Zmiana sprowadza się do JEDNEJ wartości spoczynku `--inf-top-halo` w
`.inf-card-top` (globals.css:5199, obecnie 100%) + ewent. rozmiaru pasa łuny
w bazie (globals.css:3394 `100% 10px`). Hover stat (5350) nie zapala łuny — OK.

---

## 4. SĄSIEDZTWO KOLORÓW `--card-c` (home, wszystkie sekcje z >=2 kartami)

Desktop 1440 (geometria z rectów; kolejność = DOM):

| Sekcja | Kart | Kolumny | Mapa kolorów (rzędami) | Kolizje |
|---|---|---|---|---|
| PromoUslugi "Chatbot AI dla firmy" | 4 | 2 (1. i 4. wide) | `#11e0ff` (wide) / `#b638ff` `#ffa101` / `#00f0ff` (wide) | brak |
| Pasek zaufania (inf-sec-base) | 3 | 3 | `#5ba4ff` `#a586ff` `#29ff77` | brak |
| Problem "Ile czasu..." | 6 | 3 | `#11e0ff` `#00c986` `#b638ff` / `#ffa101` (wide) / `#ff67b7` / `#5ba4ff` | brak |
| "Powtarzalna robota..." | 3 | 3 | `#a586ff` `#61edff` `#29ff77` | brak |
| Rozwiązanie "Co to jest AI Agent" | 6 | 2 | `#11e0ff` `#b638ff` / typD: `#a586ff` `#11e0ff` / `#00c986` `#ffa101` | brak |
| JakToDziala "Jak wygląda wdrożenie" | 3 | 3 | `#5ba4ff` `#a586ff` `#29ff77` | brak |
| Cennik "Ile kosztuje..." | 2 | 2 | `#2b7cff` `#22e06b` | brak |
| Narzędzia | 5 | 3 | `#11e0ff` `#00c986` `#b638ff` / `#ffa101` `#a586ff` | brak |
| Bezpieczeństwo | 4 | 4 | `#5ba4ff` `#ffc120` `#61edff` `#a586ff` | brak |
| Dowód "Co konkretnie zmienia się" | 2 | 1 | `#11e0ff` / `#ffa101` | brak |
| Gwarancja "Co jeśli nie zadziała" | 4 | 3 | `#29ff77` (wide) / `#61edff` `#a586ff` `#ffc120` | brak |
| Realizacje "Komu już postawiliśmy" (masonry 3 kol.) | 7 | 3 | kol1: `#ffa101`->`#2b7cff`; kol2: `#22e06b`->`#ffa101`; kol3: `#22d3ee`->`#2b7cff`; wide `#a586ff` | brak (duble `#ffa101` i `#2b7cff` tylko po przekątnej / rozdzielone kolumną) |
| ZyweDemo | 2 | 2 | `#61edff` `#8b5cf6` | brak |

Mobile 390 (1 kolumna, pary kolejnych kart w sekcji): rownież ZERO kolizji.

WYNIK: reguła "kolory nie powtarzają się obok siebie" jest na home JUŻ
SPEŁNIONA w pionie i poziomie na obu breakpointach. Do rozważenia (poza literą
spec): identyczna triada `#5ba4ff/#a586ff/#29ff77` powtarza się 1:1 w dwóch
sekcjach (pasek zaufania i JakToDziala), a wariacja `#a586ff/#61edff/#29ff77`
w trzeciej — monotonia MIĘDZY sekcjami, nie wewnątrz siatki.

---

## 5. Skrót decyzji dla implementacji v16

1. Subtelnienie góry = zmiana alfy łuny spoczynku `--inf-top-halo` 100% -> ~12%
   w `.inf-card-top` (jedno miejsce w CSS pokrywa 18 kart typu A/D/lg na home);
   linia 1px pełna zostaje (jest 1:1 z wzorcem); stat i separatory bez zmian.
   Po zmianie kontrola pikselowa: delta halo +7..12 lumy, zasięg <=4-5px.
2. Neon: elementy tekstowe -> text-shadow rdzeń 60% + ogon 30% (kalibracja per
   tabela 2.2); pudełka (tile/chip/stat-chip) -> gramatyka CTA (tint 8%,
   border 50-55%, glow 12-16px 20%, inset 8-10px 7-10%). AA fioletu pilnować
   pomiarem na pikselach.
3. Sąsiedztwo kolorów: NIE wymaga przemapowania — audyt czysty.
