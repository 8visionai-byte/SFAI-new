# TAKSONOMIA RAMEK v11, wzorzec infinitytechstack.uk (zwiad, zero zmian w kodzie)

Pomiar: 2026-08-16, Chromium headless (playwright-core), viewport 1440x900, dpr 1.
Skrypty: `scratchpad/pw/v11-taksonomia.js` + `scratchpad/pw/v11-dogrywka.js`.
Surowe dane: `scratchpad/pw/v11-dane.json`, `v11-dogrywka.json`, świeży zrzut arkuszy
`v11-cssom.css` (137 kB, reguły identyczne ze zrzutem v10 z 8.08, strona się nie zmieniła).
Dowody wizualne (spoczynek vs hover): `v11-prim-rest/hover.png`, `v11-learn-rest/hover.png`,
`v11-promo-rest/hover.png`, `v11-dropdown.png` w `scratchpad/pw/`.
Hover mierzony na żywo: najazd myszą, odczep po 800 ms (transition 0.3-0.4 s + zapas),
odczyt `getComputedStyle` na `:hover`. Kontrasty liczone WCAG na tle #06060c.

Cytaty reguł CSS są 1:1 z CSSOM wzorca (stąd `color-mix`, `color(srgb ...)` itd.).

---

## A. TAKSONOMIA: 6 wariantów ramek (4 żywe na home + 2 tylko w CSS)

Kluczowa obserwacja NA START: wzorzec trzyma **ramkę bazową ZAWSZE białą 4-7%**,
a "kolor od początku" robią OSOBNE pełnokolorowe elementy (pasek, linia, ring, ikona).
Kolor wchodzi na samą ramkę dopiero na hover (45-65% alfa). Szczegóły w §B.

### W1. LEWA KRAWĘDŹ STAŁA (lit. a Pawła) = `.lp-learn-card` + `.lp-learn-accent-bar`

Gdzie u nich: sekcja "Master Gemini, OpenAI, Azure & Claude" (akademie), 11 szt. na home.
Rozmiar zmierzony: 528x196 px, radius 14 px, padding wnętrza 20x24 px (`lp-learn-card-inner`).

Spoczynek (CSSOM):

```css
.lp-learn-card { display:flex; gap:0; background:linear-gradient(160deg, rgba(12,13,28,.74), rgba(9,10,22,.55));
  backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.06); border-radius:14px;
  transition:.35s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden;
  box-shadow: rgba(255,255,255,.04) 0 1px 0 inset, rgba(0,0,0,.5) 0 8px 28px -16px; }
.lp-learn-accent-bar { width:3px; min-height:100%;
  background:linear-gradient(180deg, var(--learn-accent), color-mix(in srgb, var(--learn-accent) 30%, transparent));
  flex-shrink:0; opacity:.5; transition:opacity .3s; }
```

Pasek zmierzony na żywo: 3x194 px, PEŁNY kolor kategorii (#00f0ff) na opacity 0.5, gradient
gaśnie w dół do 30% koloru. Ramka wokół: biała 6%.

Hover (zmierzone na żywo, karta cyjanowa):

```css
.lp-learn-card:hover { border-color:color-mix(in srgb, var(--learn-accent) 60%, transparent);
  box-shadow: 0 18px 40px -18px color-mix(in srgb, var(--learn-accent) 30%, transparent),
              0 0 20px color-mix(in srgb, var(--learn-accent) 12%, transparent),
              inset 0 1px 0 rgba(255,255,255,.08);
  transform:translateY(-4px); }
.lp-learn-card:hover .lp-learn-accent-bar { opacity:1; }
.lp-learn-card:hover .lp-learn-arrow { opacity:1; transform:translateX(0); }   /* z opacity:0, translateX(-8px) */
.lp-learn-card:hover .lp-learn-icon  { /* tło 13%->20%, border 24%->42%, scale(1.06) rotate(-3deg), glow 18px */ }
.lp-learn-card:hover::after { left:140%; }  /* sweep bialego blysku, start left:-100%, width 60%, .5s */
```

Zmierzony hover computed: border 4 strony `color(srgb 0 0.94 1 / 0.6)` (= cyjan 60%),
box-shadow trójwarstwowy jak wyżej, translateY -4 px, pasek opacity 0.5 -> 1,
ikona 38x38 -> 42x42 (scale 1.06 + rotate -3deg), strzałka opacity 0 -> 1.

Struktura treści karty (do spec E): pasek 3px | ikona 38px | [badge mono FREE 8px/700] +
tytuł H3 + mono podpis + opis `.lp-learn-desc` 12.8px #9aabbf + tagi mono.

### W2. TOP DELIKATNY Z MOCNYM KOLOREM + HOVER PODŚWIETLA CAŁĄ RAMKĘ (lit. b + c) = `.lp-primary-card` + `.lp-card-neon-top` + narożniki

Gdzie u nich: 24 szt. na home, sekcje "Infinity Security Stack", "Free Developer Tools",
"Open Source on GitHub", "Researching the Future of AI & AGI". To jest dokładnie "trzecia
sekcja" z cytatu Pawła: top-glow w spoczynku, na hover świeci CAŁA ramka.
Rozmiar zmierzony: 344x259 px, radius 16 px, padding 25.6/25.6/21.6 px.

Spoczynek (CSSOM + pomiar):

```css
.lp-primary-card { border:1px solid rgba(255,255,255,.07); border-radius:16px;
  background:linear-gradient(160deg, rgba(13,14,30,.88), rgba(9,10,22,.72)); backdrop-filter:blur(16px);
  box-shadow: rgba(255,255,255,.05) 0 1px 0 inset, rgba(0,0,0,.55) 0 10px 34px -18px;
  transition:.4s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden; }
.lp-card-neon-top { position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg, transparent, var(--card-accent), var(--card-accent-alt), transparent);
  box-shadow: 0 0 8px var(--card-accent); }   /* zmierzone: 342x1 px, pelny kolor, luna 8px */
.lp-card-corner { position:absolute; width:10px; height:10px; border-color:var(--card-accent);
  opacity:.22; transition:opacity .3s; border-radius:1px; }  /* 4 szt. [ ] w rogach, 8px od krawedzi */
```

Hover (zmierzone na żywo, karta fioletowa `--card-accent:#b026ff`):

```css
.lp-primary-card:hover { border-color:color-mix(in srgb, var(--card-accent) 65%, transparent);
  box-shadow: 0 22px 48px -20px color-mix(in srgb, var(--card-accent) 35%, transparent),
              0 0 28px color-mix(in srgb, var(--card-accent) 14%, transparent),
              inset 0 1px 0 rgba(255,255,255,.09);
  transform:translateY(-5px) scale(1.008); }
.lp-primary-card:hover .lp-card-corner { opacity:.6; }
.lp-primary-card:hover .lp-primary-arrow { opacity:1; transform:translateX(0); } /* strzalka ma text-shadow 0 0 8px accent */
.lp-primary-card:hover::before { left:140%; } /* bialy sweep 105deg, .6s */
.lp-primary-card:hover::after { opacity:.08; } /* dolna luna radial-gradient accent, spoczynek .04 */
```

Zmierzony hover computed: border 4 strony `color(srgb 0.69 0.15 1 / 0.65)` (= #b026ff 65%),
narożniki 0.22 -> 0.6, strzałka opacity 0 -> 1 z glow `rgb(176,38,255) 0 0 8px`,
ikona 42 -> 47 px. Wariant `--forge`: spoczynek border rgba(255,107,0,.12), hover .5.

Struktura treści (wzór dla spec E): ikona 42px | mono status z kropką (OPEN SOURCE,
zielony #39ff14, 8px/700) | H3 21.6px/900 #e4e4f0 | mono tagline w kolorze akcentu
11.2px | opis | `.lp-card-divider` (1px gradient akcentu, opacity .2) | tagi.

### W3. HOVER = BŁYSK + RAMKA ZE WSZYSTKICH STRON + STRZAŁKA (lit. d) = `.lp-promo-card`

Gdzie u nich: pas 3 kart promo ZARAZ POD HERO (sekcja `.lp-promo`, bez H2).
Rozmiar zmierzony: 952x93 px (pełna szerokość, poziomy wiersz), radius 14 px.

Spoczynek (CSSOM + pomiar):

```css
.lp-promo-card { display:flex; align-items:center; gap:.95rem; padding:.95rem 1.15rem;
  border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,.07);
  background:linear-gradient(135deg, rgba(16,18,32,.72), rgba(10,11,22,.72)); backdrop-filter:blur(10px);
  transition:transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s; }
/* RING: gradientowa obwodka 1px liczona maska, PELNY kolor od naroznika, w spoczynku opacity .5 */
.lp-promo-card::before { inset:0; border-radius:14px; padding:1px;
  background:linear-gradient(135deg, var(--pc,#00f0ff), transparent 55%);
  mask:linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity:.5; transition:opacity .3s; }
/* BLYSK: ukosny pas czekajacy za lewa krawedzia */
.lp-promo-card::after { left:-40%; top:0; width:38%; height:100%;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent);
  transform:skewX(-18deg); transition:left .6s; }
```

Hover (zmierzone na żywo, karta magenta `--pc:#ff00e5`):

```css
.lp-promo-card:hover { transform:translateY(-3px);
  border-color:color-mix(in srgb, var(--pc) 45%, transparent);      /* ramka Z KAZDEJ STRONY */
  box-shadow: 0 12px 40px -12px color-mix(in srgb, var(--pc) 40%, transparent); }
.lp-promo-card:hover::before { opacity:1; }        /* ring .5 -> 1 = "podswietlenie z jednej strony" na full */
.lp-promo-card:hover::after  { left:120%; }        /* BLYSK przelatuje przez cala karte */
.lp-promo-card:hover .lp-promo-arrow { transform:translateX(4px); }
```

Zmierzony hover computed: border `color(srgb 1 0 0.9 / 0.45)` na 4 stronach, ::before
opacity 0.5 -> 1, ::after left -380 px -> +1140 px (przeleciał), strzałka +4 px w prawo.
Strzałka `.lp-promo-arrow`: widoczna też w spoczynku, 17.6px/800 w pełnym kolorze `--pc`.
"Podświetlenie z prawej" z cytatu: ring gradientowy świeci od JEDNEGO narożnika (gradient
135deg, kolor gaśnie do 55% długości), więc zależnie od karty świeci lewy górny róg i
krawędzie przy nim; my możemy odbić gradient (315deg), gdy chcemy świecenie od prawej.
Struktura treści: ikona 42px | mono kicker w kolorze (9.6px/700) + tytuł 16px/700 #f2f4fb
| strzałka po prawej.

### W4. KARTY Z LICZBAMI (lit. e) = `.lp-hero-metrics` + `.lp-stat-value` (żywe) oraz `.stat-card` (tylko CSS)

Żywe na home: pasek metryk w hero, 720x81 px, 5 liczb.

```css
.lp-hero-metrics { display:flex; gap:1.4rem; padding:1rem 2rem; max-width:720px;
  background:linear-gradient(135deg, rgba(12,13,28,.62), rgba(8,9,20,.5));
  border:1px solid rgba(255,255,255,.07); border-radius:18px; backdrop-filter:blur(18px) saturate(1.3);
  box-shadow: rgba(0,0,0,.6) 0 14px 44px -18px, rgba(255,255,255,.06) 0 1px 0 inset; }
.lp-hero-metric .lp-stat-value { font-size:1.35rem; font-weight:900; text-shadow: currentcolor 0 0 14px; }
.lp-hero-metric-label { font-size:.56rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#66749a; }
.lp-hero-metric-sep { width:1px; height:30px; background:linear-gradient(transparent, rgba(255,255,255,.14), transparent); }
```

Zmierzone liczby: mono 21.6px/900, każda w INNYM neonie (#00f0ff, #ff00e5, #a78bfa) i
każda ŚWIECI: `text-shadow: currentcolor 0 0 14px`. Ramka paska: biała 7% (kolor niosą liczby).

Wariant kartowy `.stat-card` (jest w arkuszu, NIE występuje w DOM na home ani na
/news /tools /blog /projects /learn /academies, sprawdzone; stany hover NIEZMIERZONE na żywo):

```css
.stat-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius);
  padding:1rem 1.25rem; transition:.3s; position:relative; overflow:hidden; }
.stat-card::before { content:""; background:linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity:0; height:2px; position:absolute; top:0; left:0; right:0; transition:opacity .3s; }
.stat-card:hover::before { opacity:1; }
.stat-card:hover { border-color:var(--border-light); transform:translateY(-2px); box-shadow: rgba(0,0,0,.3) 0 8px 24px; }
```

(`--bg-card:#111127`, `--border:#1e1e3a`, `--border-light:#2a2a50`, `--radius:12px`, `--accent:#8b5cf6`.)

### W5. LEWA KRAWĘDŹ ZAPALANA HOVEREM, KANCIASTA = `.lp-secondary-card` (tylko CSS)

NIE występuje w DOM na home ani na 6 sondowanych podstronach (NIEZMIERZONE na żywo,
reguły z CSSOM). Najmniej ozdobny wariant: radius 2 px (kanciasty, jak nasz kursor!),
ramka biała ledwie 4%, kolor pojawia się dopiero na hover jako pionowa kreska z lewej.

```css
.lp-secondary-card { display:flex; flex-direction:column; gap:.6rem; padding:1.35rem;
  background:rgba(8,8,24,.6); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,.04);
  border-radius:2px; transition:.35s; animation:.6s ease-out both cardFadeUp; position:relative; }
.lp-secondary-card::before { content:""; position:absolute; top:0; left:0; width:2px; height:100%;
  background:linear-gradient(180deg, var(--card-accent), transparent); opacity:0; transition:opacity .3s; }
.lp-secondary-card:hover { border-color:color-mix(in srgb, var(--card-accent) 40%, transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--card-accent) 12%, transparent); transform:translateY(-2px); }
.lp-secondary-card:hover::before { opacity:.8; }
```

### W6. MAŁA KARTA POZIOMEGO PASA = `.lp-trend-card` (tylko CSS, NIEZMIERZONA na żywo)

145 px szerokości, radius 6 px, ramka CYJAN 6% w spoczynku (jedyny wariant z kolorową
ramką bazową), hover cyjan 25% + glow 16px + strzałka 0 -> 0.8. Dla nas: ewentualne
mikro-kafle (chipy) w pasach przewijanych.

---

## B. NASYCENIE W SPOCZYNKU (kolory obwódek bez hovera)

| element wzorca | ramka bazowa w spoczynku | skąd kolor w spoczynku | box-shadow ramki w spoczynku |
|---|---|---|---|
| `.lp-learn-card` | **biała 6%** rgba(255,255,255,.06) | pasek 3px PEŁNY kolor na opacity .5; ikona: kolor 13% tło, 24% border, glow `currentcolor 0 0 14px -6px`; badge, tagline, tagi w pełnym neonie | inset biel 4% + czerń 50% (bez koloru) |
| `.lp-primary-card` | **biała 7%** rgba(255,255,255,.07) | `.lp-card-neon-top` 1px PEŁNY kolor + łuna `0 0 8px accent`; narożniki kolor na op .22; tagline/tagi/status pełny neon; dolna łuna ::after op .04 | inset biel 5% + czerń 55% (bez koloru) |
| `.lp-promo-card` | **biała 7%** | ring ::before: 1px gradient od PEŁNEGO koloru, opacity .5; ikona i strzałka pełny kolor | none |
| `.lp-hero-metrics` | **biała 7%** | liczby: pełny neon + `text-shadow: currentcolor 0 0 14px` | czerń 60% + inset biel 6% |
| `.lp-trend-card` (CSS) | cyjan 6% | kolor tylko na treści | none |
| `.lp-secondary-card` (CSS) | biała 4% | brak (kolor dopiero hover) | none |

Hover alfy ramek: learn 60%, primary 65%, promo 45%, secondary 40%, trend 25%.

**Porównanie z naszym 45%** (`app/globals.css` ok. linii 3205: `.inf-card` border
`color-mix(var(--card-c) 45%, transparent)` w spoczynku): nasza obwódka bazowa jest
formalnie BARDZIEJ kolorowa niż wzorca (45% koloru vs ich biel 6-7%). "Blade" wrażenie,
które zgłasza Paweł, NIE bierze się z alfy ramki, tylko z tego, że u wzorca esencję
koloru w spoczynku robią elementy na **100% nasyceniu**: pełnokolorowy pasek/linia/ring,
świecące liczby, neonowe kickery, ikony z łuną, a u nas wszystko jedzie na jednym
rozcieńczonym mixie. Rekomendacja do rundy implementacyjnej: zostawić decyzję Pawła
(kolor na ramce 45%, ponad wzorzec), a nasycenie dowieźć per WARIANT elementami wzorca:
pełny kolor paska W1 (op .5), pełny kolor linii top W2 (+ łuna 8px), ring W3 (op .5),
`text-shadow: currentcolor 0 0 14px` na liczbach W4. Kontrasty tekstów przy tym nie
spadają (halo nie zmienia koloru glifów), progi w §C.

---

## C. BIAŁE NAPISY ("mają razić")

Zmierzone na wzorcu:

| element | color | font | text-shadow | kontrast na #06060c |
|---|---|---|---|---|
| H2 sekcji `.lp-section-title` | rgb(228,228,240) = #e4e4f0 | 35.2px / **800** Inter | **none** | 16.03:1 |
| H1 hero `.lp-hero-title` | #e4e4f0 | clamp do 3.8rem / **900** | rgba(139,92,246,.15) 0 0 40px | 16.03:1 |
| tytuł karty primary (H3) | #e4e4f0 | 21.6px / **900**, ls -0.216px | none | 16.03:1 |
| tytuł karty learn (H3) | #e4e4f0 | ~16px / 700 | none | 16.03:1 |
| tytuł promo | #f2f4fb | 16px / 700 | none | 18.39:1 |
| liczby metryk | pełny neon | 21.6px mono / 900 | currentcolor 0 0 14px | cyjan 14.35:1, magenta 6.14:1 |
| eyebrow mono sekcji | kolor sekcji (np. #00f0ff, #e4a541) | 9.6px / 700, ls 2.88px | rgba(0,240,255,.3) 0 0 10px | 14.35 / 9.39:1 |
| lead pod H2 | #8a9ab5 | 14.4px / 400 | none | 7.09:1 |

Wniosek pomiarowy: "rażąca biel" wzorca to NIE glow na H2 (H2 ma text-shadow:none),
tylko #e4e4f0 na bardzo ciemnym tle plus **waga 800-900**. Świecą wyłącznie: H1 hero
(fiolet 15%, promień 40px), liczby, eyebrow i mono-etykiety stopki.
U nas: `--fg` to TEN SAM hex #e4e4f0 (`app/globals.css:212`), ale bazowe `h1,h2`
mają `font-weight:700`, a `h3,h4` 600 (`app/globals.css:560-567`). Różnica "u nas szare"
to głównie waga (700 vs 800 na H2, 600 vs 900 na tytułach kart) i mniejsza gęstość
neonów wokół. Do implementacji: H2 -> 800, tytuły kart -> 800-900, glow tylko tam,
gdzie wzorzec go ma (H1 już mamy, liczby W4, eyebrow).

---

## D. KRESKA POD H2 `.lp-section-title-line`

Zmierzone (6 szt. na home, wszystkie identyczne geometrycznie):

- rozmiar: **50x2 px**, `border-radius: 2px`, `margin: 12px auto 0` (12 px pod H2, centrowana; computed pokazał `12px 511px 0px`, 511 px = wyliczone auto),
- gradient bazowy: `linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))` = #00f0ff -> #ff00e5,
- poświata: `box-shadow: rgba(0,240,255,.3) 0 0 12px`,
- warianty per sekcja: `--gold` #e4a541 -> #a78bfa (akademie), `--green` #39ff14 -> #00f0ff (security, open source), `--indigo` #6366f1 -> #a855f7 (tools),
- **animacja: BRAK.** Zmierzone dwiema drogami: computed `animation: none` i `el.getAnimations()` = pusta lista; w CSSOM nie ma keyframes dla tej klasy. Kreska jest STATYCZNA, "życie" nagłówka daje gradient + poświata. (Spec D zakłada "animowaną kreskę": wzorzec = specyfikacja, więc wdrażamy statyczną 1:1; ewentualna animacja to decyzja Pawła ponad wzorzec.)

Konstrukcja pełnego nagłówka sekcji (kolejność w `.lp-section-header`, `text-align:center`,
`margin-bottom: 40px`): eyebrow mono -> H2 z gradientowym spanem (`background-image:
linear-gradient(135deg, ...)` + `-webkit-text-fill-color: transparent`, np. cyjan ->
magenta -> fiolet) -> kreska 50x2 -> lead #8a9ab5 14.4px, max ~580 px.

---

## H. DROPDOWN: anatomia wiersza (Learn, 13 wierszy, zmierzony po hoverze na przycisku)

Panel `.gnav-mega`: 326 px szerokości, padding 4 px, radius 20 px, tło rgba(6,6,12,.92)
+ blur(40px) saturate(1.8), border: **top 2 px pełny cyjan** #00f0ff, boki/dół 1 px
rgba(139,92,246,.3), box-shadow czerń 90% 0 30px 60px + cyjan 15% 0 0 30px + inset biel 10%.

Wiersz `.gnav-mega-item`: 316x57 px, padding 10x14 px, gap 12 px, radius 10 px,
hover tło rgba(139,92,246,.08). Aktywny: kreska 2px z lewej w kolorze pozycji + glow 8px.

| część | wartości zmierzone |
|---|---|
| ikona `.gnav-mega-icon` | 32x32 px, radius 8 px, tło rgba(255,255,255,.03), border 1px rgba(255,255,255,.05), emoji 18.4px |
| **tytuł** `.gnav-mega-name` | **13.12px / 600**, Inter, **#e4e4f0**, jedna linia (`white-space:nowrap`), np. "Zero to Hero" |
| **podpis** `.gnav-mega-desc` | **10.88px / 400**, Inter, **#5a6a8a**, 1 px odstępu od tytułu (gap kolumny 1px), np. "Absolute Beginner Guide" |
| badge `.gnav-mega-badge` | mono 8.32px / 700, ls .06em, padding 2x7 px, radius 5 px, kolor pozycji: border 30% + tło 8% + tekst 100% (np. START HERE cyjan, NEW zielony/pomarańcz) |

UWAGA a11y: #5a6a8a na naszym tle #06060c daje **3.72:1**, poniżej AA (4.5:1) dla tekstu
10-11 px. U nas podpis wiersza MUSI jechać na `--fg-muted` #7a7a9e (4.91:1) albo jaśniejszym,
nie kopiować hexa wzorca. Nasz plik `components/layout/nav-data.ts` już ma pole `opis?`
w wierszu dropdownu (dziś Usługi idą bez opisu, tytuł = całe `u.h1`), więc zmiana to:
krótka nazwa w `tytul` + podpis w `opis`, oba DERYWOWANE z istniejących pól rejestru.

---

## G. ODSTĘPY MIĘDZY SEKCJAMI (wzorzec -> cel 1,0x)

Zmierzone u nich (1440 px; wysokość całej strony 8786 px, 8 sekcji):

- `.lp-section` padding pionowy: **48 px góra i dół** (3rem),
- między boxami kolejnych sekcji stoi separator `.lp-divider`: linia + mono etykieta,
  **wysokość 13 px, margin 0** (nie ma własnych marginesów!),
- pełna przerwa treść-do-treści: 48 + 13 + 48 = **109 px** dla KAŻDEJ pary sekcji
  (zmierzone pary: 7x przerwaBox 13 px; jeden wyjątek 125 px tam, gdzie między sekcjami
  stoi dodatkowy banner `.lp-banner`),
- nagłówek sekcji `.lp-section-header`: **margin-bottom 40 px** do kart,
- separator wzorca: `.lp-divider-line` 1px, gradient fiolet 15%, po niej iskra
  `::after` 40% szerokości, gradient cyjan .4 -> magenta .3, `@keyframes divider-shimmer
  { 0% { left:-40% } 100% { left:140% } }`, 4s infinite; etykieta mono 8.8px/700,
  ls .35em, rgba(139,92,246,.3).

Nasz stan po v9 (tokeny w `app/globals.css:91-95` + blok `.inf-divider` ok. linii 4235):
`--section-y` 48 px (md), tight 32 px, loose 64 px; blok separatora = 16 + 13.2 + 16 =
45.2 px. Pary md+md: 48+45.2+48 = **141.2 px = 1.30x wzorca**; pary lg: do 173.2 px (1.59x).

Droga do 1,0x (matematyka, decyzja implementacyjna):
- marginesy separatora my-3/my-4 -> **0** (wzorzec: divider ma margin 0): md+md daje
  48 + 13.2 + 48 = 109.2 px = **1.002x**, dokładnie wzorzec;
- rejestr `lg` (64 px) zostaje tylko tam, gdzie świadomie chcemy oddechu (para z lg = 125-141 px);
- margines pod nagłówkiem sekcji wyrównać do 40 px wzorca.
Do zmierzenia PO wdrożeniu na zbudowanej stronie (metodyka jak `raporty/pomiary-odstepy-v9.md`).

---

## MAPA: sekcja home -> wariant ramki (propozycja)

Zasada: warianty przypisane po ROLI, tak jak używa ich wzorzec (promo = pas ofert pod hero,
primary = flagowe karty produktowe, learn = listy z ikoną i opisem, metrics = liczby).
Zakaz jednego stylu wszędzie = na stronie pracują 4 różne warianty + pasek liczb.

| # | nasza sekcja | wariant | uzasadnienie |
|---|---|---|---|
| Hero | chipy danych rynku (HeroDaneRynku) | **W4** | 1:1 rola `.lp-hero-metrics`: liczby w hero, mono 900, `text-shadow: currentcolor 0 0 14px`, ramka biała 7% |
| 01 | PromoUslugi (kafle usług pod hero) | **W3** | u wzorca DOKŁADNIE ta pozycja layoutu to `.lp-promo-card` (pas 952x93 pod hero); błysk + pełna ramka + strzałka = karta-zaproszenie do kliknięcia; cienka pełna karta Architektów ma nawet ten sam kształt |
| 02 | PasekZaufania (3 kolumny, spec F) | **W1** | spec F sam podpowiada lewą krawędź; W1 jest najspokojniejszy z "kartowych" wariantów, pasuje do tonu zaufania (pasek koloru + biała ramka 6%) |
| 03 | Problem (3 karty-zjadacze, spec E) | **W2** | spec E każe dać strukturę kicker+tytuł+opis+tagi, a to jest anatomia `.lp-primary-card` (status mono, H3 900, tagline, divider, tagi); top-neon + hover całej ramki robi z bólów "produkty" |
| 04 | BranzeDemo (kafle branż) | **W1** | lista równorzędnych pozycji z ikoną = rola learn-cards u wzorca (11 akademii); pasek w kolorze branży, hover z strzałką |
| 05 | Rozwiazanie (karty AEO + tabela) | **W2** | karty rozwiązań = karty flagowe; tabela bez ramek kartowych (poza zakresem taksonomii) |
| 06 | JakToDziala (kroki) | **W5** | "mniejsze konstrukcje" z cytatu: kanciasty radius 2px gra z naszym kanciastym kursorem, kolor zapala się hoverem, kroki nie konkurują z ofertą; UWAGA spec G: wyśrodkować CTA "Umów bezpłatną diagnozę" (0 px odchylenia, pomiar po wdrożeniu) |
| 07 | Oferta (cennik) | **W2 + liczby W4** | karty cen = najważniejsze karty strony (pełny hover ramki); KWOTY (wyłącznie z listy locked: chatbot od 990, voicebot od 2500, AI Start 1990, audyt 1490, wdrożenia 3000-10000, abonament 99-599/mies, ryczałty 3000/5500/10000, Architekci od 10000/mies, 350/h, diagnoza 0) dostają styl liczby W4: mono + `text-shadow: currentcolor` |
| 08 | NarzedziaTeaser (5 narzędzi) | **W2** | wzorzec sekcję "Free Developer Tools" składa z `.lp-primary-card` (zmierzone), więc narzędzia = primary; wariant akcentu per narzędzie |
| 09 | Bezpieczenstwo (RODO/UE) | **W1** | sekcja ma uspokajać, nie krzyczeć: statyczny zielony/cyjanowy pasek z lewej, biała ramka, zero błysków |
| 10 | Dowod (liczby efektów) | **W4** | karty z liczbami wprost z cytatu Pawła; pasek metryk lub siatka `.stat-card` (top-bar 2px na hover) |
| 11 | GwarancjaEfektu | **W3** | jedna szeroka karta-obietnica ze strzałką i błyskiem prowadzi do CTA jak promo wzorca |
| 12 | DowodSpoleczny (opinie) | **W5** | ciche karty cytatów: biała 4%, lewa kreska zapala się hoverem; opinie nie potrzebują neonów (placeholdery do czasu realnych danych, bez zmyślania) |
| 13 | FAQ | bez ramek kartowych | wzorzec FAQ ("Questions, Answered") nie używa żadnej z klas kart (zmierzone: 0 wystąpień); zostaje akordeon, ewentualnie W5 na wierszu |
| 14 | ZyweDemo | bez zmian | konsola agenta = sygnatura z wcześniejszych rund (żelazne) |
| 15 | FinalneCTA | **W3** | finałowe zaproszenie = ta sama gramatyka co promo: błysk + ramka ze wszystkich stron + strzałka |

Rozkład: W1 x3, W2 x4, W3 x3, W4 x2 (+ ceny), W5 x2, czyli minimum 4 warianty żywe
(wymóg spec A spełniony), a top-glow (W2) zostaje TYLKO na 4 sekcjach "produktowych".

## NIEZMIERZONE (i dlaczego)

- `.lp-secondary-card`, `.stat-card`, `.lp-trend-card` na żywo (DOM): klasy są w arkuszu,
  ale nie występują na home ani na /news /tools /blog /projects /learn /academies
  (sprawdzone sondą). Reguły spoczynek+hover zacytowane w 100% z CSSOM, więc do
  implementacji wystarczają; brak jedynie zrzutu "jak to wygląda" u nich.
- Animacja kreski pod H2: zmierzone, że jej NIE MA (to wynik, nie luka).
- Odchylenie CTA w naszej sekcji JakToDziala i nasze realne przerwy px po v9: wymagają
  builda naszej strony; to pomiar dla rundy implementacyjnej (metodyka w
  `raporty/pomiary-odstepy-v9.md`), zwiad taksonomii nie dotyka naszego renderu.
- Dropdown mierzony w headless bez prawdziwego kursora systemowego; wartości typograficzne
  są z computed styles, więc wiarygodne; zrzut `v11-dropdown.png` potwierdza wygląd.
