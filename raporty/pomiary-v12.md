# Pomiary v12 — wzorzec infinitytechstack.uk (zwiad, bez edycji kodu)

Data pomiaru: 2026-08-16. Narzędzie: playwright-core + headless chromium
(scratchpad/pw/v12-zwiad.js), viewport 1440x900, DSF 1.
Wartości: computed style z żywej strony (color-mix ROZWIĄZANY do rgb) +
pełne reguły z CSSOM. Dowody w scratchpadzie pw/: v12-dane.json,
v12-cssom-home.css, v12-cssom-*-academy.css, v12-*-academy.png.

DOWÓD ŚWIEŻOŚCI: reguły .lp-promo-card:hover, .lp-primary-card:hover,
.lp-learn-card:hover, .lp-secondary-card(+:hover), .lp-trend-card,
.lp-primary-status, .lp-status-dot, .lp-learn-badge porównane linia w linię
z dumpem v11 — WSZYSTKIE IDENTYCZNE. Wzorzec się nie zmienił.

Zmienne wzorca: --neon-cyan #00f0ff, --neon-magenta #ff00e5,
--neon-violet #b026ff, --neon-green #39ff14, --neon-gold #ffd700.

---

## 1. HOVER kart — pełne reguły :hover (CSSOM) + computed po realnym hoverze

KLUCZOWY WZÓR (potwierdzony na każdym typie): hover ZAWSZE zapala CAŁĄ ramkę
przez `border-color` w kolorze karty (nigdy ring/outline; box-shadow tylko
jako łuna). Do tego lift, błysk-sweep i strzałka. Spoczynek jest różny per
typ, hover wspólny.

### 1a. .lp-promo-card (nasz W3, ring od narożnika)

```css
.lp-promo-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--pc,#00f0ff) 45%, transparent);
  box-shadow: 0 12px 40px -12px color-mix(in srgb, var(--pc,#00f0ff) 40%, transparent);
}
.lp-promo-card:hover::before { opacity: 1; }   /* ring narożnikowy .5 -> 1 */
.lp-promo-card:hover::after  { left: 120%; }   /* sweep */
.lp-promo-card:hover .lp-promo-arrow { transform: translateX(4px); }
```

Computed po realnym hoverze (wariant green): border CAŁA ramka
rgba(57,255,20,0.45); box-shadow rgba(57,255,20,0.4) 0 12px 40px -12px;
translateY(-3px); ring ::before opacity 1; strzałka rgb(57,255,20)
translateX(4px). Transition karty: transform .3s cubic-bezier(.16,1,.3,1),
border-color .3s, box-shadow .3s.

### 1b. .lp-primary-card (nasz W2, top-glow)

```css
.lp-primary-card:hover {
  border-color: color-mix(in srgb, var(--card-accent) 65%, transparent);
  box-shadow:
    0 22px 48px -20px color-mix(in srgb, var(--card-accent) 35%, transparent),
    0 0 28px color-mix(in srgb, var(--card-accent) 14%, transparent),
    inset 0 1px 0 rgba(255,255,255,.09);
  transform: translateY(-5px) scale(1.008);
}
.lp-primary-card:hover::before { left: 140%; }        /* sweep */
.lp-primary-card:hover::after  { opacity: 0.08; }     /* dolna łuna .04 -> .08 */
.lp-primary-card:hover .lp-card-spotlight { opacity: 1; }
.lp-primary-card:hover .lp-card-corner    { opacity: 0.6; }  /* narożniki .22 -> .6 */
.lp-primary-card:hover .lp-primary-arrow  { opacity: 1; transform: translateX(0); }
.lp-primary-card:hover .lp-tool-icon { /* kafel ikony: border 26% -> 48%, glow 60% -> 70%,
  scale(1.06) rotate(-3deg) */ }
```

Computed po hoverze (karta fiolet #b026ff): border rgba(176,38,255,0.65)
z KAŻDEJ strony; cień rgba(176,38,255,0.35) 0 22px 48px -20px +
rgba(176,38,255,0.14) 0 0 28px + inset biel 9%. Strzałka rgb(176,38,255),
text-shadow 0 0 8px tym samym kolorem.

### 1c. .lp-learn-card (nasz W1, pasek boczny)

```css
.lp-learn-card:hover {
  border-color: color-mix(in srgb, var(--learn-accent) 60%, transparent);
  box-shadow:
    0 18px 40px -18px color-mix(in srgb, var(--learn-accent) 30%, transparent),
    0 0 20px color-mix(in srgb, var(--learn-accent) 12%, transparent),
    inset 0 1px 0 rgba(255,255,255,.08);
  transform: translateY(-4px);
}
.lp-learn-card:hover::after { left: 140%; }               /* sweep */
.lp-learn-card:hover .lp-learn-accent-bar { opacity: 1; } /* pasek .5 -> 1 */
.lp-learn-card:hover .lp-learn-arrow { opacity: 1; transform: translateX(0); }
```

Computed po hoverze (cyan): border rgba(0,240,255,0.6) cała ramka; cień
rgba(0,240,255,0.3)/0.12 + inset biel 8%.

### 1d. .lp-secondary-card (karta czysto tekstowa)

```css
.lp-secondary-card:hover {
  border-color: color-mix(in srgb, var(--card-accent) 40%, transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--card-accent) 12%, transparent);
  transform: translateY(-2px);
}
.lp-secondary-card:hover::before { opacity: 0.8; }  /* pasek lewy 2px, 0 -> .8 */
```

### 1e. .lp-trend-card (mała karta)

```css
.lp-trend-card:hover {
  border-color: rgba(0,240,255,0.25);
  box-shadow: rgba(0,240,255,0.08) 0 0 16px;
  transform: translateY(-2px);
}
.lp-trend-card:hover .lp-trend-arrow { opacity: 0.8; transform: translateX(0); }
```

### 1f. BŁYSK / SWEEP — geometria, duration, porównanie z naszym

| Element | pas | trasa left | transition | timing |
|---|---|---|---|---|
| wzorzec .lp-promo-card::after | 38% szer., skewX(-18deg), biel 6% | -40% -> 120% | left 0.6s | **DOMYŚLNE `ease`** (bez własnej krzywej!) |
| wzorzec .lp-primary-card::before | 60% szer., bez skew, gradient 105deg biel 3/6/3% | -100% -> 140% | left 0.6s | cubic-bezier(.16,1,.3,1) |
| wzorzec .lp-learn-card::after | 60% szer., gradient 105deg biel 2.4/5/2.4% | -100% -> 140% | left 0.5s | cubic-bezier(.16,1,.3,1) |
| NASZ .inf-shine::after (v11) | 38%, skewX(-18deg), biel 6% | -40% -> 120% | left 0.6s | var(--ease-out) = cubic-bezier(.16,1,.3,1) |

Czas, przez który pas jest WIDOCZNY nad kartą (rozwiązanie numeryczne krzywych
beziera; to jest to, co oko widzi jako "wolniejszy"):

| Konfiguracja | widoczny nad kartą |
|---|---|
| wzorzec promo (ease domyślne) | **~0.34 s** |
| wzorzec primary (expo, dłuższa trasa) | ~0.14 s |
| wzorzec learn | ~0.11 s |
| NASZ inf-shine (expo) | ~0.18 s |

WNIOSEK POMIAROWY: geometrię promo mamy 1:1, ale nasza krzywa
cubic-bezier(.16,1,.3,1) wystrzeliwuje pas w pierwszych ~0.2 s. Wzorzec na
kartach typu promo jedzie na DOMYŚLNYM `ease` i pas wisi nad kartą ~2x dłużej
(~0.34 s). Żeby u nas było "troszkę wolniej" jak chce Paweł: `left 0.6s ease`
(1:1 wzorzec) albo zostawić expo i wydłużyć duration do ~0.9-1.0 s
(równoważny czas przelotu). Wartość 1:1 ze wzorca = `transition: left 0.6s`.

---

## 2. NASYCENIE W SPOCZYNKU 1:1 — tabela wzorzec vs nasze 45%

NAJWAŻNIEJSZE ODKRYCIE: wzorzec w spoczynku NIE koloryzuje samej ramki
(border zostaje BIAŁY o niskiej alfie). "Jarzeniowość" spoczynku niosą
OSOBNE elementy jadące na PEŁNYM, nierozcieńczonym kolorze (czysty rgb) z
opacity .5 lub 1: ring, pasek, ikona, status, divider.

| Typ karty | border spoczynek (computed) | box-shadow spoczynek | elementy PEŁNEGO koloru w spoczynku |
|---|---|---|---|
| .lp-promo-card (green/cyan/violet) | 1px rgba(255,255,255,**0.07**) | none | ring ::before: linear-gradient(135deg, **czysty rgb(57,255,20)** -> transparent 55%), grubość 1px (maska), **opacity 0.5**; ikona: border 28% + glow `0 0 18px -4px` 55% koloru; strzałka pełny kolor opacity 1 |
| .lp-primary-card | 1px rgba(255,255,255,**0.07**) | inset biel 5% + czerń 55% `0 10px 34px -18px` | narożniki [ ] pełny kolor **opacity 0.22**; status ● pełny #39ff14 (opacity 1); divider pełny kolor opacity 0.2; ikona border 26%, glow 60%; tagi border 20%, tekst pełny kolor |
| .lp-learn-card | 1px rgba(255,255,255,**0.06**) | inset biel 4% + czerń 50% `0 8px 28px -16px` | pasek lewy 3px: linear-gradient(180deg, **czysty kolor** -> 30% koloru), **opacity 0.5**; badge FREE pełny #39ff14 |
| .lp-secondary-card (CSSOM, brak w DOM home) | 1px rgba(255,255,255,**0.04**) | none | pasek ::before 2px pełny kolor, ale **opacity 0 w spoczynku** (najsuchszy typ wzorca) |
| .lp-trend-card (CSSOM, brak w DOM home) | 1px rgba(0,240,255,**0.06**) | none | pasek trendu gradient cyan->magenta pełny kolor |

Nasz stan v11 dla porównania (app/globals.css):
- baza .inf-card: border CAŁEJ ramki `color-mix(var(--card-c) 45%)` — wzorzec
  ramki tak nie barwi w spoczynku w ogóle (biel 6-7%),
- narożniki --inf-corner-a 22% = 1:1 ze wzorcem (OK),
- W1 pasek: pełny kolor gradient do 30% — geometria 1:1, ale u wzorca całość
  pasa ma opacity .5 i na hover idzie do 1,
- W3 ring: opacity .5 = 1:1 (OK).

INTERPRETACJA POD "MAKSYMALNE NASYCENIE": esencja wzorca to CZYSTY kolor
(#39ff14 itd., zero color-mix) w gradiencie ringu/paska/glow ikon + statusy
na opacity 1. Ramka bazowa zostaje biała 6-7%. Nasze "45% na całej ramce"
to inna anatomia niż wzorzec: on ma mniej koloru na ramce (0%), a więcej
w elementach akcentu (100% koloru).

---

## 3. STATUS — anatomia "● OPEN SOURCE" i "FREE"

### ● OPEN SOURCE (.lp-primary-status + .lp-status-dot) — na kartach primary

```css
.lp-primary-status {
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .5rem;            /* computed 8px */
  font-weight: 700; letter-spacing: .2em;   /* computed 1.6px */
  color: var(--neon-green);    /* rgb(57,255,20) */
  font-family: "SF Mono","Fira Code","JetBrains Mono",monospace;
  margin-bottom: .4rem;
}
.lp-status-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--neon-green);
  box-shadow: 0 0 6px var(--neon-green);
  animation: pulse-glow 2s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.4; }
}
```

Computed na żywo: tekst 8px/700 mono #39ff14, kropka 5x5px, cień
rgb(57,255,20) 0 0 6px, animacja `2s ease-in-out infinite pulse-glow`.
Kropka to OSOBNY span przed tekstem (znak ● nie jest w tekście).
Bramka RM u wzorca: pod `prefers-reduced-motion` .lp-status-dot dostaje
`animation: none !important` (jest w ich media query razem z tickerem).

### FREE (.lp-learn-badge) — na kartach learn/akademii

```css
.lp-learn-badge {
  display: inline-block; font-size: .5rem; /* 8px */ font-weight: 700;
  letter-spacing: .2em; color: var(--neon-green);
  font-family: "SF Mono",...,monospace; margin-bottom: .3rem;
  padding: .15rem .5rem;
  background: rgba(57,255,20,0.06);
  border: 1px solid rgba(57,255,20,0.15);
  border-radius: 2px;
}
```

FREE jest STATYCZNE: bez kropki i bez animacji (14 instancji zmierzonych,
wszystkie animation none). "Miganie", które widzi Paweł, to pulsująca kropka
● przy statusach typu OPEN SOURCE oraz .lp-trending-dot (7x7px, cień
`0 0 8px + 0 0 16px 30%`, ta sama animacja pulse-glow 2s).

### Zachowanie statusów na hover

BRAK reguł :hover dla .lp-primary-status / .lp-status-dot / .lp-learn-badge.
"Przepiękna animacja po najechaniu" = hover CAŁEJ karty z pkt 1 (pełna
ramka + sweep + strzałka); sam status świeci i pulsuje bez zmian.

---

## 4. HERO AKADEMII — struktura i wartości

Zmierzone na żywo: /openai-academy, /agents-academy, /cursor-academy
(pełny odczyt) + /claude-academy, /vertex-academy, /opensource-academy,
/bedrock-academy (H1/badge/CTA). UWAGA: **/power-academy NIE ISTNIEJE** —
URL renderuje hero strony głównej ("Elite AI Academies"); "Power academy
zielona" z notatek Pawła to najpewniej /opensource-academy (pomarańcz) albo
/openai-academy (zieleń). Zrzuty: pw/v12-openai-academy.png itd.

### Struktura hero (kolejność pionowa, potwierdzona zrzutem)

1. Badge pigułka "INTERACTIVE TRAINING INITIALIZED"
2. H1 z kolorowym drugim słowem
3. Opis z JEDNĄ frazą bold w kolorze przewodnim
4. Tagi-pigułki (2 rzędy, 8 szt.)
5. Wielki CTA pełnym kolorem "ESTABLISH ROOT CONNECTION"
6. Kafle statystyk (17 MODULES / 97 QUESTIONS / 9 HANDS-ON LABS / XP SYSTEM)
7. Po prawej: dekoracyjny graf węzłów w kolorze przewodnim

### Kolory przewodnie per akademia (pełny kolor, computed)

| Akademia | kolor | CTA tło | CTA tekst | CTA box-shadow |
|---|---|---|---|---|
| /openai-academy | #10a37f (zieleń OpenAI) | #10a37f | biały | rgba(16,163,127,0.3) 0 0 20px |
| /agents-academy | #a855f7 (fiolet) | #a855f7 | czarny | rgba(255,255,255,0.2) 0 0 20px |
| /cursor-academy | #00b4d8 (niebieski) | #00b4d8 | czarny | rgba(255,255,255,0.2) 0 0 20px |
| /claude-academy | #d97757 (terakota) | #d97757 | czarny | NIEZMIERZONE (skrót) |
| /vertex-academy | #4285f4 (niebieski Google) | #4285f4 | biały | NIEZMIERZONE (skrót) |
| /opensource-academy | #f97316 (pomarańcz) | #f97316 | czarny | NIEZMIERZONE (skrót) |
| /bedrock-academy | #ff9900 (amber AWS) | #ff9900 | rgb(4,16,25) | NIEZMIERZONE (skrót) |

### Badge (.spatial-badge)

```css
.spatial-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 100px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
  background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
  border: 1px solid;            /* kolor = currentColor, PEŁNY kolor akademii */
  position: relative; overflow: hidden;
}
.spatial-badge::before {  /* shimmer po badge */
  content: ""; position: absolute; top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
  animation: badge-shimmer 4s ease-in-out infinite;
}
@keyframes badge-shimmer {
  0%        { left: -100%; }
  50%, 100% { left: 100%; }   /* przelot 2 s, potem 2 s pauzy */
}
```

Computed: color i border 1px = pełny kolor akademii (np. rgb(16,163,127));
BEZ kropki w środku (sam tekst).

### H1 + kolorowe słowo

H1: 68px / weight 900 / Inter, kolor rgb(248,250,252). Drugie słowo to span
z INLINE stylem: `background:#10a37f; -webkit-background-clip:text;
-webkit-text-fill-color:transparent` (pełny płaski kolor akademii; wyjątek
bedrock: gradient `135deg #ff9900 -> #f59e0b`). Fraza w opisie: strong
700 w pełnym kolorze (np. "world's leading AI platform" rgb(16,163,127)).

### Tagi-pigułki

border-radius 100px, font-size 11px, padding 6px 14px, tekst PEŁNY kolor
akademii, border 1px rgba(kolor, 0.15), tło transparentne.

### CTA "ESTABLISH ROOT CONNECTION"

border-radius 100px, padding 18px 48px, JetBrains Mono 14px / 800,
letter-spacing (mono, uppercase), tło = PEŁNY płaski kolor akademii, bez
obwódki, box-shadow j.w. w tabeli. Litera CTA bez text-shadow.

### Kafle statystyk

| Właściwość | wartość |
|---|---|
| border | 1px solid rgba(kolor-akademii, **0.15**) |
| tło | rgba(8,15,25,0.45) (agents: rgba(12,8,25,0.45) — nuta fioletu) |
| border-radius | 16px |
| padding | 24px |
| box-shadow | none |
| liczba | 28px / weight 900 / PEŁNY kolor akademii, bez text-shadow |
| label | 10px / 400 / rgb(71,85,105), uppercase, mono spacing |

Hover kafli: NIEZMIERZONE — w CSSOM akademii brak reguł :hover dla tych
kafli (wyglądają na statyczne; .stat-card:hover z globala dotyczy innego
komponentu narzędziowego).

---

## 5. Karty cytatów / czysto tekstowe wzorca — kolor w spoczynku

- Elementów blockquote / [class*=quote] / [class*=testimonial] /
  [class*=review] NA WZORCU NIE MA: 0 znalezionych na home i na akademiach.
  Wzorzec nie ma sekcji cytatów.
- Najbliższy odpowiednik "karty tylko z tekstem" to .lp-secondary-card:
  spoczynek = tło rgba(8,8,24,0.6), border 1px rgba(255,255,255,0.04),
  radius 2px, pasek lewy 2px pełny kolor z **opacity 0** w spoczynku
  (zapala się do .8 dopiero na hover). Czyli NAJSUCHSZY typ wzorca.
  (Wartości z CSSOM; computed NIEZMIERZONE — elementu nie ma w aktualnym
  renderze home.)
- WNIOSEK DLA WYKONAWCY: żądanie Pawła "cytaty zawsze z mocniejszym kolorem
  w spoczynku" NIE ma bezpośredniego odpowiednika na wzorcu — wzorcem
  anatomii ma być W1 (pasek 3px pełny kolor opacity .5 jak
  .lp-learn-accent-bar), zgodnie z decyzją w spec-v12, nie z pomiarem.

---

## NIEZMIERZONE

- .lp-secondary-card i .lp-trend-card computed w spoczynku: elementów nie ma
  w DOM aktualnego renderu home (sekcje warunkowe); wartości podane z CSSOM.
- Hover kafli statystyk akademii: brak reguł w CSSOM, realny hover nie
  wykazał zmiany do zmierzenia.
- Box-shadow CTA na claude/vertex/opensource/bedrock (skrócony odczyt; pełne
  wartości mam dla openai/agents/cursor).
- /power-academy: nie istnieje (renderuje hero home) — kolory "Power"
  niemierzalne.
- Kontrasty tekstów wzorca: nie liczone (poza zakresem zwiadu).
