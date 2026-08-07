# POMIARY WZORCA infinitytechstack.uk (brief v8, partia „zwiad pomiarowy")

Data: 2026-08-07. Autor: zwiad pomiarowy v8. **Ten raport nie zmienia ani jednego pliku kodu.**
Jedyny plik wyjściowy tej partii: `raporty/pomiary-wzorca-v8.md` plus 5 zrzutów dowodowych
w `raporty/wzorzec-v8/`.

## Metoda i dowód

Strona wzorca stoi za Vercel Security Checkpoint, więc zwykłe pobranie HTML zwraca 429
i stronę challenge. Pomiar zrobiony **realnym Chrome** (`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`)
sterowanym z `playwright-core` zainstalowanego w scratchpadzie sesji (nie w repo,
`package.json` projektu nietknięty). Viewport 1440x900, DPR 1, `locale en-GB`.

Trzy źródła liczb, wszystkie w tym raporcie oznaczone:

1. **CSSOM** = reguła autorska odczytana z `document.styleSheets` (to, co napisał autor wzorca);
2. **getComputedStyle** = wartość rozwiązana przez przeglądarkę na żywym elemencie;
3. **PIKSEL** = kolor realnie wyrenderowany, odczytany z `getImageData` na zrzucie ekranu
   wstrzykniętym z powrotem na stronę. To jedyny dowód, który uwzględnia `backdrop-filter`,
   `mix-blend-mode` i wszystkie warstwy pod spodem.

Kontrast liczony wzorem WCAG 2.1 po złożeniu warstw półprzezroczystych, nie na surowym hexie.

Skrypty pomiarowe (scratchpad sesji `e0553296`): `v8-map.mjs`, `v8-measure.mjs`,
`v8-measure2.mjs`, `v8-measure3.mjs`, `v8-shots.mjs`.
Surowe wyniki: `v8-pomiar-1.json`, `v8-pomiar-2.json`, `v8-pomiar-3.json`,
pełny zrzut arkuszy wzorca: `ref-cssom.css` (115 389 znaków).

Zrzuty dowodowe (w repo):

- `raporty/wzorzec-v8/01-pasek-nav-spoczynek.png`
- `raporty/wzorzec-v8/02-pasek-nav-po-scrollu.png`
- `raporty/wzorzec-v8/03-karta-neuromantix.png`
- `raporty/wzorzec-v8/04-karta-neuromantix-hover-i-kursor.png`
- `raporty/wzorzec-v8/05-karty-akademii-z-ikonami.png`

**PUŁAPKA REPO, przypomnienie dla partii wdrożeniowych:** klasy spacingu Tailwind w tym
projekcie to własne tokeny (`h-9` = 96px). Każdy wymiar z tego raportu wstawiaj arbitralnie:
`h-[54px]`, `top-[16px]`, `rounded-[100px]`.

---

## 1. PASEK NAWIGACJI

Selektor wzorca: `nav.gnav` > `div.gnav-inner`. Element jest `position: fixed`, `z-index: 1000`,
wyśrodkowany przez `left: 50%` + `translateX(-50%)`.

### 1.1 Stan spoczynku (scrollY = 0)

Źródło: CSSOM + getComputedStyle, zgodne co do znaku.

```css
.gnav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 1040px;
  border-radius: 100px;
  z-index: 1000;
  background: rgba(10, 10, 16, 0.65);
  backdrop-filter: blur(32px) saturate(1.5);
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.gnav-inner {
  margin: 0 auto;
  padding: 0 1.25rem 0 1.5rem;   /* zmierzone: 0px 20px 0px 24px */
  height: 52px;                   /* zmierzone: 52px, cały pasek 54px z obwódką */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

Zmierzona wysokość elementu `.gnav`: **54px** (52px wnętrza + 2 x 1px obwódki).
Zmierzona szerokość przy 1440px viewportu: **1040px** (czyli max-width, nie 100%).

### 1.2 Stan po przewinięciu (klasa `gnav--scrolled` dokładana z JS)

```css
.gnav--scrolled {
  top: 12px;
  max-width: 980px;
  background: rgba(6, 6, 12, 0.85);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow:
    0 16px 50px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(139, 92, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

Potwierdzone: po `window.scrollTo(0, 900)` `className` = `gnav gnav--scrolled`,
zmierzone `top: 12px`, szerokość spada z 1040px na **980px**. Pasek fizycznie
kurczy się i schodzi wyżej przy scrollu. Wysokość zostaje 54px.

### 1.3 Obwódka tęczowa (`::before`) - to nie jest zwykły border

```css
.gnav::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 100px;
  padding: 2px;
  background: linear-gradient(90deg, #ff007f, #7928ca, #00f0ff, #ff007f) 0 0 / 300% 100%;
  mask:
    linear-gradient(#fff 0 0) content-box exclude,
    linear-gradient(#fff 0 0);
  animation: border-flow 3s linear infinite;
  pointer-events: none;
  opacity: 0.95;
}
```

Czyli: `border: 1px solid rgba(139,92,246,.2)` to warstwa spokojna, a NA NIEJ leży
2-pikselowa animowana wstęga w kolorach `#ff007f → #7928ca → #00f0ff` (300% szerokości,
przesuwana 3 s liniowo). To ona daje wrażenie „paska, który pływa".

### 1.4 ODPOWIEDŹ NA PYTANIE WŁAŚCICIELA: czy ich pasek jest ciemniejszy od tła strony

**TAK, i to mierzalnie.** Dowód pikselowy z realnego renderu (nie z hexa, bo pasek ma
`backdrop-filter`, więc liczy się tylko piksel):

| Stan | Punkt pomiaru | Zmierzony piksel | Luminancja |
|---|---|---|---|
| spoczynek | wnętrze paska (puste miejsce, x 700 y 20) | `rgb(10, 10, 20)` `#0a0a14` | 0,00332 |
| spoczynek | strona **bezpośrednio pod paskiem** (x 700 y 100) | `rgb(12, 13, 28)` `#0c0d1c` | 0,00450 |
| spoczynek | strona obok paska, lewo (x 100 y 40) | `rgb(15, 9, 30)` `#0f091e` | 0,00391 |
| spoczynek | strona obok paska, prawo (x 1330 y 40) | `rgb(4, 17, 29)` `#04111d` | 0,00515 |
| po scrollu | wnętrze paska (x 700 y 18) | `rgb(6, 7, 14)` `#06070e` | 0,00222 |
| po scrollu | strona bezpośrednio pod paskiem | `rgb(9, 9, 20)` `#090914` | 0,00304 |
| po scrollu | strona obok paska, lewo | `rgb(15, 9, 29)` `#0f091d` | 0,00386 |

**Pasek jest ciemniejszy od strony tuż pod nim o 26 procent luminancji w spoczynku
i o 27 procent po przewinięciu.** Współczynnik kontrastu pasek/strona to tylko 1,022:1
w spoczynku i 1,016:1 po scrollu, czyli różnica tonu jest subtelna liczbowo, ale idzie
w JEDNĄ stronę i jest wsparta trzema dodatkowymi warstwami. Właściciel widzi sumę tych
czterech rzeczy naraz:

1. ton ciemniejszy o ~26 procent od tła pod spodem,
2. `backdrop-filter: blur(32px) saturate(1.5)` czyli treść pod paskiem jest rozmyta,
   ale nasycona, więc pasek czyta się jak szkło, nie jak folia,
3. `box-shadow: 0 10px 40px rgba(0,0,0,.5)` czyli 40px czarnego cienia POD paskiem,
   które dodatkowo przyciemnia tło zaraz pod nim i buduje odcięcie,
4. `inset 0 1px 0 rgba(255,255,255,.05)` czyli 1px jasnej krawędzi u góry (fazka),
   plus animowana wstęga 2px.

**Uwaga metodologiczna:** kolor podłoża zależy od pozycji poziomej, bo `.lp` ma trzy duże
gradienty radialne (fioletowy przy 14 procentach szerokości, cyjanowy przy 88 procentach).
Dlatego uczciwym porównaniem jest „pasek kontra strona bezpośrednio pod paskiem",
i taką parę podaję jako wiążącą.

**Wniosek do wdrożenia:** nie wystarczy pociemnić naszego paska. Trzeba odtworzyć
proporcję: **tło paska ciemniejsze o około jedną czwartą luminancji od tego, co jest
tuż pod nim, plus mocny czarny cień 40px w dół, plus jasna fazka 1px u góry.**
Ich pasek w spoczynku ma krycie tylko 0,65 (a nie 0,9), więc ciemność bierze się
z niskiej luminancji koloru bazowego, nie z krycia.

### 1.5 Elementy wewnątrz paska (do zgodności proporcji)

| Element | Wartości zmierzone |
|---|---|
| `.gnav-logo-symbol` | `font-size: 1.7rem; font-weight: 300;` gradient tekstowy `135deg, #8b5cf6, #22d3ee, #a78bfa`, `background-size: 200% 200%`, animacja `gnav-logo-shift 6s` |
| `.gnav-logo-text` | `0.72rem / 800 / letter-spacing .35em / color rgba(139,92,246,.5)`, font mono |
| `.gnav-cat-btn` (rozwijane) | `padding .4rem .75rem` = 6,4px 12px; `12,48px / 600`; `color #a0a0c0`; `border-radius 100px`; obwódka `1px solid transparent` |
| `.gnav-cat-btn:hover` | `color #fff; background rgba(0,240,255,.05); border-color rgba(0,240,255,.3); box-shadow: inset 0 0 12px rgba(0,240,255,.15), 0 0 15px rgba(0,240,255,.2); text-shadow: 0 0 8px rgba(0,240,255,.8); transform: translateY(-1px)` |
| `.gnav-quick` (zwykły link) | `padding .4rem .75rem; 12,48px / 600; color #7a7a9e; radius 100px` |
| `.gnav-quick:hover` | `color #fff; background rgba(139,92,246,.08); text-shadow 0 0 8px rgba(139,92,246,.9); translateY(-1px)` |
| `.gnav-sep` | `width 1px; height 18px; background rgba(139,92,246,.12); margin 0 .35rem` |
| Breakpoint menu | przy 768px i niżej `.gnav-desktop { display: none }`, `.gnav-burger { display: flex }`. Przy 1024px jeszcze pełne menu. Pasek trzyma 54px wysokości i `top: 16px` na KAŻDEJ szerokości (zmierzone 1440 / 1024 / 768 / 390). |

---

## 2. PRZYCISK „Hire Me" (wzorzec dla naszego „Umów diagnozę")

Selektor: `a.gnav-quick.gnav-quick--cta`. Zmierzony prostokąt: **73 x 33,5px**.
Kolor bazowy: **`#ff00e5`** (token wzorca `--neon-magenta`). Cyjanu tu NIE MA ani grama.

### 2.1 Stan spoczynku, gotowe do wklejenia

```css
/* wzorzec: .gnav-quick--cta */
.cta-rozowa {
  padding: 0.4rem 0.75rem;      /* zmierzone 6.4px 12px */
  font-size: 0.78rem;           /* zmierzone 12.48px */
  font-weight: 700;
  line-height: 1.5;             /* zmierzone 18.72px */
  letter-spacing: normal;
  text-decoration: none;
  border-radius: 100px;
  color: #ff00e5;                            /* CAŁY NAPIS RÓŻOWY */
  border: 1px solid rgba(255, 0, 229, 0.5);
  background: rgba(255, 0, 229, 0.08);
  box-shadow:
    0 0 12px rgba(255, 0, 229, 0.2),
    inset 0 0 8px rgba(255, 0, 229, 0.1);
  text-shadow: none;                         /* w spoczynku BRAK poświaty na tekście */
  transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation: cta-pulse 2s ease infinite;
}
```

### 2.2 Puls (to jest sedno „wyeksponowania")

Odczytane z CSSOM jako `@keyframes`, nie zgadywane:

```css
@keyframes cta-pulse {
  0%, 100% {
    box-shadow: 0 0 12px rgba(255, 0, 229, 0.2), inset 0 0 8px rgba(255, 0, 229, 0.1);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 0, 229, 0.5), inset 0 0 12px rgba(255, 0, 229, 0.3);
    border-color: #ff00e5;
  }
}
```

Czyli obwódka pulsuje między `rgba(255,0,229,.5)` a pełnym `#ff00e5`, a poświata
między 12px/20 procent a 25px/50 procent. Cykl 2 s, `ease`, w nieskończoność.
(Mój pierwszy odczyt `getComputedStyle` złapał klatkę pośrednią: `border-color rgba(255,0,229,.973)`,
`box-shadow 0 0 24.28px rgba(255,0,229,.486)`. To potwierdza, że animacja realnie chodzi.)

### 2.3 Stan hover

```css
.cta-rozowa:hover {
  color: #ffffff;
  border-color: #ff00e5;
  background: rgba(255, 0, 229, 0.2);
  box-shadow:
    0 0 35px rgba(255, 0, 229, 0.8),
    inset 0 0 15px rgba(255, 0, 229, 0.4);
  text-shadow: 0 0 8px #ffffff, 0 0 15px #ff00e5;
}
```

Uwaga: na hover tekst robi się BIAŁY, a różowa zostaje obwódka, tło i poświata.
Poświata rośnie z 12px na 35px i z 20 procent na 80 procent krycia. To jest ten
skok, którego szuka właściciel.

### 2.4 Kontrast (policzone, nie oszacowane)

| Para | Kontrast | Werdykt WCAG |
|---|---|---|
| `#ff00e5` na tle strony `rgb(5,5,12)` | **6,18:1** | zdaje AA dla tekstu normalnego (4,5:1) |
| `#ff00e5` na wnętrzu pigułki `rgba(255,0,229,.08)` nad paskiem, czyli `rgb(28,7,32)` | **5,80:1** | zdaje AA |
| obwódka `rgba(255,0,229,.5)` kontra wnętrze pigułki | 2,07:1 | zdaje 3:1 dla granicy? NIE, brakuje. Ratuje to puls do pełnego `#ff00e5` (kontrast 4,6:1 w szczycie) |
| `#fff` na tle hover `rgba(255,0,229,.2)` | **16,65:1** | zdaje AAA |

Nasz tekst CTA przy 12,48px i wadze 700 to tekst normalny, więc próg to 4,5:1.
`#ff00e5` daje 5,80:1 na własnym tle i 6,18:1 na tle strony. **Można wziąć 1:1 bez
osłabiania koloru.** Gdyby nasza paleta miała używać innego różu, ten sam wzór:
liczyć na tle `rgb(28,7,32)`, nie na czystym `#06060c`.

---

## 3. KARTA PROJEKTU / AKADEMII

Wzorcowa karta bohatera: `a.lp-primary-card` (Neuromantix, Vitalis, Void LLM, Freedom OS).
Wzorcowa karta kategorii: `a.lp-learn-card` (11 akademii).
Dowód wizualny: `raporty/wzorzec-v8/03-karta-neuromantix.png`.

### 3.1 Korpus karty. To jest przyczyna, dla której u nich „świeci", a u nas nie

```css
.lp-primary-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.6rem 1.6rem 1.35rem;   /* zmierzone 25.6px 25.6px 21.6px */
  background: linear-gradient(160deg, rgba(13, 14, 30, 0.88), rgba(9, 10, 22, 0.72));
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 10px 34px -18px rgba(0, 0, 0, 0.55);
  position: relative;
  overflow: hidden;
  transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Karta wzorca jest JAŚNIEJSZA od tła strony, nie ciemniejsza.**
Złożenie `rgba(13,14,30,.88)` nad `rgb(5,5,12)` daje `rgb(12,13,28)`, kontrast
korpus/strona = **1,055:1**. Pomiar pikselowy na żywej stronie potwierdza:
korpus karty `rgb(11,12,26)` `#0b0c1a`, tło strony 12px obok karty `rgb(7,5,16)` `#070510`,
zmierzony kontrast **1,042:1**.

To kluczowe wobec naszego stanu. Wg `raporty/plan-kolor.md` nasza `.inf-card` ma
`rgba(6,6,12,.5)` nad `#06060c`, co po złożeniu daje z powrotem `#06060c`, czyli
kontrast **1,000:1** i karta fizycznie NIE MA KORPUSU. Każdy tekst na niej leży wtedy
wprost na tle strony, więc nie ma czego rozświetlać. Wzorzec daje korpusowi ~5 procent
przewagi luminancji, dokłada 1px górnej fazki i 34px cienia rozmytego w dół.

### 3.2 TYTUŁ karty: jak dokładnie świeci

**Odpowiedź, która wywraca założenie briefu: tytuł nie ma ŻADNEGO `text-shadow`.
Ani w spoczynku, ani na hover. Zmierzone `textShadow: "none"` w obu stanach.**

```css
.lp-primary-name {          /* tytuł karty bohatera, np. „Neuromantix" */
  font-family: Inter, system-ui, sans-serif;
  font-size: 1.35rem;       /* zmierzone 21.6px */
  font-weight: 900;
  line-height: 1.5;         /* zmierzone 32.4px */
  letter-spacing: -0.01em;  /* zmierzone -0.216px */
  color: #e4e4f0;
  margin: 0 0 0.2rem;       /* zmierzone 3.2px */
  text-shadow: none;
}
.lp-learn-name {            /* tytuł karty kategorii, np. „Cursor Academy" */
  font-family: Inter, system-ui, sans-serif;
  font-size: 1.1rem;        /* zmierzone 17.6px */
  font-weight: 800;
  line-height: 1.5;         /* zmierzone 26.4px */
  color: #e4e4f0;
  margin: 0 0 0.15rem;      /* zmierzone 2.4px */
  text-shadow: none;
}
```

Wrażenie świecenia robią cztery rzeczy naraz, wszystkie zmierzone:

1. **waga 900** przy 21,6px, czyli bardzo gruby glif, dużo białych pikseli obok siebie;
2. **korpus karty jaśniejszy od strony** (punkt 3.1), przez co biel siedzi na własnym
   podłożu. Zmierzony kontrast najjaśniejszego piksela tytułu `#e4e4f0` do korpusu
   karty `#0b0c1a` to **15,40:1**;
3. **kontrast sąsiedztwa**: bezpośrednio nad tytułem stoi mono status `ACTIVE` w jaskrawej
   zieleni `#39ff14` (8px), a bezpośrednio pod nim mono podtytuł w wygaszonym
   `rgb(106,122,154)` (12px). Oko czyta tytuł jako najjaśniejszy punkt w trójce;
4. **liczby pod spodem świecą naprawdę** (punkt 3.3), więc biel tytułu wygrywa
   wielkością, a kolor wygrywa poświatą. Nic nie świeci dwa razy tym samym.

**Wniosek do wdrożenia:** nie doklejać `text-shadow` do naszych tytułów. Naprawić korpus
karty (dać jej +5 procent luminancji nad tłem), podnieść wagę tytułu do 900 przy karcie
bohatera i 800 przy karcie kategorii, i zostawić biel `#e4e4f0` bez poświaty.
Poświatę oddać liczbom i mono akcentom.

Stan hover karty (zmierzony, `getComputedStyle` po `mouse.move` na środek karty):

```css
.lp-primary-card:hover {
  border-color: color-mix(in srgb, var(--card-accent) 65%, transparent);
  box-shadow:
    0 22px 48px -20px color-mix(in srgb, var(--card-accent) 35%, transparent),
    0 0 28px color-mix(in srgb, var(--card-accent) 14%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.09);
  transform: translateY(-5px) scale(1.008);
}
```

Plus reflektor pod kursorem, wpisywany z JS w `style` dziecka `.lp-card-spotlight`:

```css
/* zmierzony atrybut style w chwili hover: */
background: radial-gradient(180px at 262.5px 174.828px, rgba(139, 92, 246, 0.08), transparent 70%);
/* .lp-card-spotlight { position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .3s; z-index:1 } */
/* .lp-primary-card:hover .lp-card-spotlight { opacity: 1 } */
```

Czyli promień reflektora **180px**, krycie **0,08**, wygaszenie do zera przy 70 procentach.

### 3.3 LICZBY (133 / 73 000+ / 847) i etykiety pod nimi

Liczby złapane po odliczeniu (na starcie stoją na `0`, jest licznik narastający
wyzwalany przy wejściu w widok, plus błysk `stat-flash`).

```css
.lp-primary-stats { display: flex; gap: 1.5rem; }   /* zmierzone 24px */
.lp-stat { display: flex; flex-direction: column; gap: 0.15rem; }  /* zmierzone 2.4px */

.lp-stat-value {
  font-family: "SF Mono", "Fira Code", "JetBrains Mono", monospace;
  font-size: 1.3rem;          /* zmierzone 20.8px */
  font-weight: 900;
  line-height: 1.5;           /* zmierzone 31.2px */
  letter-spacing: normal;
  color: var(--card-accent);            /* PEŁNY kolor akcentu karty, bez krycia */
  text-shadow: 0 0 12px currentColor;   /* poświata w kolorze samej liczby */
}
.lp-stat-label {
  font-family: "SF Mono", "Fira Code", "JetBrains Mono", monospace;
  font-size: 0.55rem;         /* zmierzone 8.8px */
  font-weight: 700;
  letter-spacing: 0.12em;     /* zmierzone 1.056px */
  line-height: 1.5;           /* zmierzone 13.2px */
  text-transform: uppercase;
  color: #5e5e7e;             /* zmierzone rgb(94,94,126), szary, NIE w kolorze karty */
  text-shadow: none;
}
```

Zmierzone wartości i kolory, karta po karcie:

| Karta | `--card-accent` | Liczby (po odliczeniu) | Etykiety |
|---|---|---|---|
| Neuromantix | `#a78bfa` | `133` / `73,000+` / `847` | MODULES / LOC / TESTS |
| Vitalis | `#22d3ee` | `345` / `207,000+` / `1,723` | MODULES / LOC / BUILTINS |
| Void LLM | `#f59e0b` | `303M` / `41,000+` / `11` | PARAMETERS / LOC / CUDA KERNELS |
| Freedom OS | `#10b981` | `30` / `8,777+` / `0` | MODULES / LOC / DEPENDENCIES |

Kolor liczby jest ZAWSZE równy `--card-accent` danej karty, w 100 procentach krycia,
a `text-shadow` używa `currentColor`, więc poświata sama dobiera się do koloru.
Zmierzone na żywo, np. Neuromantix: `color rgb(167,139,250)`,
`text-shadow rgb(167,139,250) 0px 0px 12px`.
Kontrast liczby do korpusu karty (pomiar pikselowy): **7,13:1**.

Etykieta jest ZAWSZE tym samym szarym `#5e5e7e`, niezależnie od karty. To jest ten
„jakiś szary na dole" z cytatu właściciela. Kontrast `#5e5e7e` do korpusu karty:
**3,10:1**, czyli poniżej progu 4,5:1 dla tekstu. Wzorzec świadomie łamie tu WCAG,
bo to etykieta dekoracyjna przy 8,8px. **U nas trzeba to podnieść** (patrz punkt 6).

Wariant licznika w hero (ta sama rodzina, inne rozmiary):

```css
.lp-hero-metric .lp-stat-value { font-size: 1.35rem; font-weight: 900; text-shadow: 0 0 14px currentColor; }  /* zmierzone 21.6px, poświata 14px */
.lp-hero-metric-label { font-size: 0.56rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #66749a; }  /* zmierzone 8.96px, 1.4336px */
```

Animacja błysku po doliczeniu (klasa `.lp-stat-glow` dokładana na 0,6 s):

```css
@keyframes stat-flash {
  0%   { text-shadow: 0 0 12px currentColor; }
  30%  { text-shadow: 0 0 24px currentColor, 0 0 48px currentColor; filter: brightness(1.3); }
  100% { text-shadow: 0 0 12px currentColor; filter: brightness(1); }
}
```

### 3.4 TAGI na dole karty (RUST, AGI, CONSCIOUSNESS)

```css
.lp-primary-tags, .lp-secondary-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;          /* zmierzone 5.6px */
  margin-top: auto;      /* zawsze przyklejone do dołu karty */
}
.lp-tag {
  font-family: "SF Mono", "Fira Code", "JetBrains Mono", monospace;
  font-size: 0.55rem;         /* zmierzone 8.8px */
  font-weight: 700;
  letter-spacing: 0.08em;     /* zmierzone 0.704px */
  line-height: 1.5;           /* zmierzone 13.2px */
  text-transform: uppercase;
  padding: 0.22rem 0.62rem;   /* zmierzone 3.52px 9.92px */
  border-radius: 6px;         /* prostokąt z lekko ściętymi rogami, NIE pigułka */
  color: var(--card-accent);                    /* pełny kolor akcentu */
  background: rgba(<akcent>, 0.08);             /* wzorzec: color-mix 8% */
  border: 1px solid rgba(<akcent>, 0.20);       /* wzorzec: color-mix 20% */
  box-shadow: none;
  transition: 0.25s;
}
.lp-tag:hover {
  background: rgba(<akcent>, 0.14);
  border-color: rgba(<akcent>, 0.35);
}
.lp-tag--sm { font-size: 0.48rem; padding: 0.12rem 0.45rem; }
```

Wzorzec pisze to jako `color-mix(in srgb, var(--card-accent) 8%, transparent)`.
Zmierzona wartość rozwiązana: `color(srgb 0.654902 0.545098 0.980392 / 0.08)`, czyli
dokładnie `rgba(167, 139, 250, 0.08)`. **Dla naszego repo `color-mix` daje identyczny
wynik co zwykła alfa, więc można wpisać `rgba(...)` i uniknąć zależności od wsparcia
`color-mix`** (nasz `browserslist` dopuszcza Chrome 100, a `color-mix` wszedł w Chrome 111).

Pomiar pikselowy wnętrza taga na żywej karcie: `rgb(22,20,41)` `#161429`.

Zmierzone teksty tagów (to są NAZWY WŁASNE technologii, nie hasła marketingowe):
Neuromantix `Rust | AGI | Consciousness | Free Energy`,
Vitalis `Rust | Cranelift | SIMD | Compiler`,
Void LLM `Rust | CUDA | LLM | Transformer`,
Freedom OS `Rust | x86_64 | TCP/IP | Bare-Metal`,
karty narzędzi `OIDC | OAuth2 | RBAC`, `Vector DB | HNSW | Analytics`, `JSON-LD | Rich Results | Schema.org`,
karty akademii `Cursor | Composer | Agent Mode`, `AWS | Bedrock | Enterprise AI`.

Wzór jest jednoznaczny: **3 do 5 tagów, każdy to rzeczownik lub nazwa własna,
1 do 2 słów, zero czasowników, zero obietnic.** Licznik: karty bohaterów mają po 4 tagi,
karty narzędzi 3 do 5, karty akademii po 3. To potwierdza polecenie z briefu, że u nas
tagi mają iść z ISTNIEJĄCYCH pól rejestrów (kategoria, `metaKeywords`, typ realizacji),
a nie z wymyślonych stringów.

### 3.5 KTÓRE KARTY MAJĄ IKONĘ, A KTÓRE NIE. Pełna inwentaryzacja 35 kart

Policzone na żywej stronie głównej, nie na oko. `document.querySelectorAll` po każdym typie.

| Typ karty | Ile na stronie | Ikona | Liczby | Tagi | Przykłady |
|---|---|---|---|---|---|
| **Karta narzędzia / produktu** (`.lp-primary-card` z `.lp-tool-icon`) | **20** | **TAK**, `.lp-tool-icon` 42x42 | nie | 3 do 5 | Infinity ID, Forge SEO, ResumeForge, MCPlex Gateway, Vitalis, AgentLens |
| **Karta bohatera / badawcza** (`.lp-primary-card` z `.lp-stat`) | **4** | **NIE** | **TAK, 3 sztuki** | 4 | Neuromantix, Vitalis, Void LLM, Freedom OS |
| **Karta akademii / kategorii** (`.lp-learn-card`) | **11** | **TAK**, `.lp-learn-icon` 38x38 | nie | 3 | Cursor Academy, MCP Academy, Claude Academy |
| **Karta tekstowa / przejściowa** | **1** | **NIE** | nie | **brak** | „Explore full Infinity Security page" |

**Reguła wzorca w jednym zdaniu: ikonę dostaje karta, która reprezentuje RZECZ
(narzędzie, produkt, akademia). Ikony NIE dostaje karta, która reprezentuje WYNIK
lub dowód (projekt z liczbami) ani karta czysto tekstowa.** Karta bohatera z liczbami
świadomie rezygnuje z ikony, bo jej rolę wizualnego kotwicy przejmują trzy świecące liczby.
To jest dokładnie odpowiedź na cytat właściciela „nie wszystkie kafelki powinny mieć emoji".

Ikony wzorca to inline SVG `stroke-width 1.6`, nie emoji. Emoji jest tylko
w rozwijanych menu nawigacji (`.gnav-mega-icon`, `font-size 1.15rem`), nie na kartach.

Style obu ikon:

```css
.lp-tool-icon {              /* karta narzędzia */
  width: 42px; height: 42px; border-radius: 12px;
  color: var(--card-accent);
  background: linear-gradient(160deg, rgba(<akcent>, .14), rgba(<akcent>, .05));
  border: 1px solid rgba(<akcent>, .26);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1), 0 0 16px -6px rgba(<akcent>, .60);
  filter: drop-shadow(0 0 6px rgba(<akcent>, .35));
  transition: .3s;
}
.lp-primary-card:hover .lp-tool-icon {
  background: linear-gradient(160deg, rgba(<akcent>, .22), rgba(<akcent>, .08));
  border-color: rgba(<akcent>, .48);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 0 22px -4px rgba(<akcent>, .70);
  transform: scale(1.06) rotate(-3deg);
}
.lp-learn-icon {             /* karta akademii, zmierzone 38x38, radius 11px */
  width: 38px; height: 38px; border-radius: 11px;
  background: linear-gradient(160deg, rgba(<akcent>, .13), rgba(<akcent>, .04));
  border: 1px solid rgba(<akcent>, .24);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 0 14px -6px <akcent>;
  margin-top: 2px; transition: .3s;
}
```

### 3.6 Pełna STRUKTURA karty wzorca, w kolejności od góry

Zmierzona kolejność i style, karta bohatera (Neuromantix):

| # | Element | Zmierzone |
|---|---|---|
| 1 | `.lp-primary-status` „• ACTIVE" | mono, `8px / 700 / letter-spacing 1.6px`, `color #39ff14`, `text-shadow: none`, `margin-bottom 6.4px`, przed nim kropka `.lp-status-dot` 5x5 z `box-shadow 0 0 6px` i pulsem 2 s |
| 2 | `.lp-primary-name` tytuł | Inter `21,6px / 900 / -0,216px`, `#e4e4f0`, bez poświaty, `margin-bottom 3.2px` |
| 3 | `.lp-primary-tagline` podtytuł | mono `12px / 400`, `rgb(106,122,154)`, bez poświaty |
| 4 | `.lp-primary-stats` liczby | flex, `gap 24px`, po 3 sztuki, patrz 3.3 |
| 5 | `.lp-primary-highlights li` punkty | Inter `12,48px / 400 / line-height 18,72px`, `rgb(154,170,191)`, `gap 0.45rem`, znacznik `▸` w kolorze akcentu |
| 6 | `.lp-primary-tags` tagi | `margin-top: auto`, patrz 3.4 |
| dodatek | `.lp-card-corner` x4 | narożniki `[ ]` 10x10, `border 1px` w kolorze akcentu, `opacity: 0.22` w spoczynku, `0.6` na hover |
| dodatek | `.lp-primary-arrow` | strzałka `1.2rem` w kolorze akcentu, `opacity 0 → 1` i `translateX(-10px) → 0` na hover, `text-shadow 0 0 8px` |
| dodatek | `.lp-primary-card::before` | błysk przelotowy: `linear-gradient(105deg, ...rgba(255,255,255,.06) 50%...)`, `left: -100% → 140%` w `0.6s` na hover |

Struktura karty kategorii (`.lp-learn-card`) różni się trzema rzeczami:
ma pionowy pasek akcentu `.lp-learn-accent-bar` (`width 3px`, gradient `180deg` od akcentu
do 30 procent akcentu, `opacity .5 → 1` na hover), ma badge `FREE`
(mono `8px / 700 / 1.6px`, `#39ff14`, tło `rgba(57,255,20,.06)`, obwódka `rgba(57,255,20,.15)`,
**`border-radius: 2px`**, nie 6px), i ma `meta` w PEŁNYM kolorze akcentu danej akademii
(mono `0.6rem / 600`, np. `rgb(0,212,170)` dla Cursor Academy).

**Uwaga o narożnikach `[ ]`:** wzorzec trzyma je na `opacity: 0.22` w spoczynku.
Wg `raporty/plan-kolor.md` u nas siedzą na 55 procentach, czyli 2,6 raza mocniej.
To potwierdzone po obu stronach i jest gotowe do poprawki.

---

## 4. TŁO STRONY. Czy mają sekcje o innym odcieniu

**Krótka odpowiedź: NIE MAJĄ. Żadna sekcja wzorca nie ma własnego tła w innym odcieniu.
Tło jest jedno, na jednym elemencie, i nie ma ani jednej poziomej granicy tonu.**

### 4.1 Jedyna warstwa tła w całym dokumencie

```css
body { background: #06060c; }   /* widoczne tylko poza .lp */

.lp {                            /* JEDEN element, który maluje całe tło strony */
  min-height: 100vh;
  padding-top: 56px;
  position: relative;
  z-index: 1;
  cursor: none;
  background:
    radial-gradient(1200px 820px at 14% -6%,  rgba(96, 44, 168, 0.16), transparent 60%) fixed,
    radial-gradient(1050px 720px at 88%  4%,  rgba(0, 132, 172, 0.12), transparent 60%),
    radial-gradient(1300px 900px at 50% 112%, rgba(128, 24, 148, 0.10), transparent 62%),
    linear-gradient(rgba(8,8,20,0), #070711 22%, #05050c 55%, #06060f),
    #05050c;
}
```

Zwróć uwagę: pierwsza plama ma `background-attachment: fixed`, czyli siedzi w viewporcie,
a nie w dokumencie. Dwie pozostałe są zakotwiczone w `.lp`, którego wysokość to cała
strona (8786px), więc na 8786 pikselach zmieniają się o ułamki procenta na ekran.
To dlatego oko nie widzi granic: pionowa zmiana tonu jest, ale rozłożona na dziewięć
tysięcy pikseli.

### 4.2 Co robią sekcje

Wszystkie sekcje mają `background-color: rgba(0,0,0,0)`, czyli **przezroczyste**.
Jedyne, co dokładają, to plama radialna zaczepiona u GÓRY sekcji:

```css
.lp-section { padding: 3rem 1.25rem; position: relative; z-index: 2; scroll-margin-top: 100px; }

.lp-section--learn     { background: radial-gradient(80% 50% at 50% 0%, rgba(228, 165,  65, 0.030), transparent 70%); }
.lp-section--security  { background: radial-gradient(80% 50% at 50% 0%, rgba( 57, 255,  20, 0.035), transparent 70%); }
.lp-section--tools     { background: radial-gradient(80% 50% at 50% 0%, rgba( 99, 102, 241, 0.040), transparent 70%); }
.lp-section--flagship  { background: radial-gradient(80% 50% at 50% 0%, rgba(139,  92, 246, 0.040), transparent 70%); }
.lp-section--ecosystem { background: radial-gradient(80% 50% at 50% 0%, rgba(  0, 240, 255, 0.030), transparent 70%); }
.lp-section--faq       { background: radial-gradient(80% 50% at 50% 0%, rgba( 99, 102, 241, 0.035), transparent 70%); }
```

Trzy cechy, które sprawiają, że tego się NIE WIDAĆ jako pasa:

1. krycie **3 do 4 procent**, czyli maksymalnie ~1 jednostka na kanał w tej ciemności;
2. kształt **radialny 80% x 50% at 50% 0%**, czyli plama gaśnie do zera zanim dojdzie
   do lewej i prawej krawędzi. Nigdy nie ma pełnej szerokości, więc nie może powstać
   pozioma linia od brzegu do brzegu;
3. wygaszenie do `transparent 70%`, czyli dolna połowa każdej sekcji jest czystym tłem.

### 4.3 Dowód pomiarowy: 380 próbek koloru tła co 20px dokumentu

Metoda: przewijanie co 800px, zrzut viewportu, a dla każdego wiersza wybranie
NAJCIEMNIEJSZEGO piksela z 9 punktów na marginesach (`x` 3, 6, 10, 16, 24, 1408,
1416, 1424, 1430), gdzie nie ma żadnej treści. Najciemniejszy piksel marginesu to czyste tło.

Zakres luminancji na całej stronie: **od 0,00458 do 0,01867**, czyli tło waha się
w przedziale mniej więcej od `rgb(4,4,12)` do `rgb(13,12,31)`, i robi to płynnie.

Ton tła przy każdej granicy sekcji (trzy próbki przed, trzy po):

| Granica (docY) | Przed | Po | Skok |
|---|---|---|---|
| 1031 hero / promo | `rgb(12,18,35)` `rgb(11,16,34)` | `rgb(11,16,33)` `rgb(10,8,21)` | brak skoku, spadek płynny |
| 1316 promo / learn | `rgb(5,5,12)` x3 | `rgb(6,6,12)` x3 | **1 jednostka** |
| 2864 learn / security | `rgb(5,5,13)` `rgb(5,5,12)` | `rgb(5,6,12)` x2 | **1 jednostka** |
| 3846 security / tools | `rgb(5,5,13)` x2 | `rgb(6,6,14)` `rgb(6,6,13)` | **1 jednostka** |
| 5012 tools / open-source | `rgb(13,10,27)` `rgb(13,10,26)` | `rgb(12,9,24)` `rgb(11,9,23)` | brak skoku, spadek płynny |
| 6347 open-source / flagship | `rgb(5,5,12)` `rgb(4,4,12)` | `rgb(5,4,13)` x2 | **1 jednostka** |
| 7364 flagship / faq | `rgb(13,12,31)` `rgb(13,12,29)` | `rgb(13,10,28)` `rgb(12,8,27)` | brak skoku, spadek płynny |

**Największy skok tonu na jakiejkolwiek granicy sekcji: 1 jednostka na kanał.**
To jest poniżej progu widzialności na ekranie. Miejsca, gdzie tło ma `rgb(13,12,31)`
zamiast `rgb(5,5,12)`, to nie są pasy sekcji, tylko rozmyte poświaty dekoracji
(hero, banery CTA) i wychodzą płynnie w obie strony.

**Wniosek dla naszej strony:** wzorzec potwierdza polecenie z briefu punkt 1 w całości.
Dopuszczalne jest DOKŁADNIE jedno odstępstwo od jednolitego tła: plama radialna
o kryciu maksymalnie 4 procent, szerokości maksymalnie 80 procent kontenera,
zaczepiona przy górnej krawędzi sekcji, wygaszana do zera przy 70 procentach wysokości.
Wszystko inne, co daje odcień inny niż `--bg`, musi zniknąć. Nasze `--bg-subtle: #0c0c18`
używane w `.inf-sec-subtle` przy 72 procentach krycia to jest dokładnie ten pas,
którego wzorzec nie ma.

Warstwa dodatkowa, którą wzorzec trzyma nad wszystkim (jednolita, więc nie tworzy granic):

```css
.lp-scanlines {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px);
}
```

---

## 5. WSKAŹNIK KURSORA. Czy mają punkt podążający za myszką

**TAK, mają. I to DWA niezależne elementy, o zupełnie różnej szybkości.**
To jest odpowiedź na oba cytaty właściciela naraz („nie ma naprowadzającego punkciku"
oraz „powinien szybciej podążać za myszką").

Oba elementy są dziećmi `.lp`, obie `position: fixed`, `pointer-events: none`,
pozycjonowane przez `left` / `top` wpisywane z JS plus stałe `transform: translate(-50%, -50%)`.

### 5.1 Element A: KROPKA `.lp-cursor-dot`. Pozycja 1:1, zero wygładzania

```css
.lp-cursor-dot {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #00f0ff;                                    /* var(--neon-cyan) */
  box-shadow: 0 0 12px #00f0ff, 0 0 24px rgba(0, 240, 255, 0.3);
  z-index: 10000;
  transition: width 0.2s, height 0.2s, background 0.2s;    /* border NIE jest w transition */
}

/* stan nad elementem interaktywnym, klasa dokładana z JS */
.lp-cursor-dot--hover {
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1.5px solid #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
}
```

**Szybkość nadążania: 1:1, bez opóźnienia.** Dowód z rejestratora `requestAnimationFrame`
(220 klatek, skok myszy z x=200 na x=1200 w jednym zdarzeniu):

| Klatka | Mysz x | Kropka x | Różnica |
|---|---|---|---|
| przed skokiem | 200 | 200 | **0,0** |
| pierwsza klatka po skoku | 1200 | 1200 | **0,0** |
| wszystkie kolejne | 1200 | 1200 | **0,0** |

Kropka osiąga cel po **0 ms / 0 klatek**. JS wpisuje `left` i `top` wprost z `e.clientX`
i `e.clientY` w handlerze `mousemove`. Zmierzony atrybut `style` kropki w chwili pomiaru:
`left: 444px; top: 449px` (liczby całkowite, dokładnie pozycja myszy).

### 5.2 Element B: POŚWIATA `.lp-cursor-glow`. Wygładzanie lerp 0,08 na klatkę

```css
.lp-cursor-glow {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, rgba(0, 240, 255, 0.04) 30%, transparent 70%);
  z-index: 9999;
  transition: opacity 0.3s;
  mix-blend-mode: screen;
  filter: blur(1px);
}
```

**Szybkość nadążania: lerp o współczynniku dokładnie 0,080 na klatkę.**
Wzór, który to odtwarza:

```js
// pozycja poświaty, liczona co klatkę w requestAnimationFrame
glowX += (myszX - glowX) * 0.08;
glowY += (myszY - glowY) * 0.08;
```

Dowód: 21 kolejnych klatek po skoku myszy, iloraz `(nowa - stara) / (cel - stara)`
wyszedł **0,080 w KAŻDEJ z 21 klatek** (zero rozrzutu). Zmierzony przebieg dojścia:

| Klatka po skoku | Poświata x | Zostało do celu |
|---|---|---|
| 1 | 290,2 | 909,8 |
| 5 | 548,2 | 651,8 |
| 10 | 770,4 | 429,6 |
| 15 | 916,9 | 283,1 |
| 20 | 1013,4 | 186,6 |
| 27 | ~1090 | ~110 |

Poświata osiąga 90 procent drogi po **27 klatkach**, czyli około **450 ms przy 60 fps**
(w moim pomiarze 395 ms, bo przeglądarka pod obciążeniem gubiła klatki).
Zmierzony atrybut `style` poświaty przy nieruchomej myszy w `left: 444px`:
`left: 441.017px; top: 445.983px`, czyli asymptotycznie dochodzi, nigdy nie dosiada 1:1.

### 5.3 Co przełącza kropkę w okrąg. Test empiryczny na 9 typach elementów

| Element | Wynik |
|---|---|
| `.lp-primary-card` karta projektu | **rozwija się w okrąg 40px** |
| `.lp-learn-card` karta akademii | **rozwija się w okrąg 40px** |
| `.lp-hero-btn` przycisk hero | **rozwija się w okrąg 40px** |
| `.lp-tag` tag na karcie | **rozwija się w okrąg 40px** |
| `.lp-footer a` link w stopce | **rozwija się w okrąg 40px** |
| `.lp-section-title` nagłówek sekcji | zostaje kropką 6px |
| `.lp-faq-q` pytanie FAQ | zostaje kropką 6px |
| `.lp-hero-metric` licznik w hero | zostaje kropką 6px |

Reguła: okrąg pojawia się nad wszystkim, co jest KLIKALNE (`a`, `button` i ich potomkowie),
a nie nad zwykłą treścią. Kropka rośnie z 6px na 40px w `0,2 s`, tło znika,
pojawia się obwódka `1,5px` w cyjanie. Ponieważ `border` NIE jest w liście `transition`,
obwódka pojawia się natychmiast, a płynnie rośnie tylko średnica. To daje wrażenie
„punkt rozwija się w kółeczko", opisane przez właściciela.

Zmierzone na żywo w chwili hover nad kartą Neuromantix:
`className = "lp-cursor-dot lp-cursor-dot--hover"`, `width 40px`, `height 40px`,
`background rgba(0,0,0,0)`, `border 1px solid rgb(0,240,255)` (Chrome zaokrągla 1,5px
do 1px w `getComputedStyle` przy DPR 1), `box-shadow rgba(0,240,255,.2) 0 0 20px`.

### 5.4 Bramki (kiedy wzorzec to WYŁĄCZA)

```css
@media (hover: none), (pointer: coarse) {
  .lp { cursor: auto !important; }
  .lp-cursor-dot, .lp-cursor-glow { display: none !important; }
}
```

Plus: `.lp { cursor: none }`, czyli wzorzec CHOWA systemowy kursor na obszarze strony
i zastępuje go własnym. `body` zostaje na `cursor: auto`. **Wzorzec NIE bramkuje
kursora po `prefers-reduced-motion` ani po szerokości ekranu, tylko po rodzaju wskaźnika.**
Nasze bramki z briefu (pointer:fine, !reduced-motion, desktop) są ostrzejsze niż wzorca,
i to jest w porządku, byle `pointer: coarse` był w środku.

---

## 6. Czego NIE ZMIERZYŁEM i dlaczego

Uczciwa lista. Wszystko poniżej to rzeczy, których nie wolno traktować jak pomiaru.

1. **NIEZMIERZONE: źródło JS kursora i pełna lista selektorów wyzwalających `--hover`.**
   Logika siedzi w zminifikowanych chunkach Next.js wzorca, nie w skryptach inline
   (`document.scripts` nie zawiera frazy `cursor-dot--hover`). Współczynnik lerp 0,08
   i zachowanie 1:1 kropki są ZMIERZONE empirycznie i powtarzalne, ale listę elementów
   sprawdziłem tylko na 9 typach z tabeli 5.3. Jeśli wdrożenie potrzebuje pełnej listy,
   trzeba ją ustalić po naszej stronie decyzją, nie zgadywaniem z wzorca.

2. **NIEZMIERZONE: `.lp-secondary-card`.** Ten typ karty istnieje w arkuszach wzorca
   (`background: rgba(8,8,24,.6)`, `border-radius: 2px`, `border 1px rgba(255,255,255,.04)`,
   pasek `::before` 2px w kolorze akcentu), ale na stronie głównej ma **zero wystąpień**.
   Podaję regułę autorską z CSSOM, bez potwierdzenia pikselowego.

3. **NIEZMIERZONE: zachowanie na realnym telefonie.** Playwright na desktopie zawsze
   raportuje `hover: hover` i `pointer: fine`, więc regułę `@media (hover: none)`
   odczytałem z CSSOM, ale nie zweryfikowałem renderu na urządzeniu dotykowym.
   Przy 390px szerokości viewportu kursor wciąż był `display: block`, co jest
   poprawnym zachowaniem tej reguły, nie błędem.

4. **Próbka odrzucona.** Pierwszy punkt pomiaru wnętrza paska (x 300, y 40) trafił
   w tekst logo `INFINITY` i dał `#422c75`. Odrzucony, zastąpiony punktami x 700 i x 1050.
   Wszystkie liczby w rozdziale 1.4 pochodzą z punktów pustych.

5. **Poza zakresem tej partii, ale zauważone:** separatory sekcji ze spec v8 punkt 2.
   Wzorzec ma `.lp-section-title-line` (`50px x 2px`, gradient `90deg` cyjan do magenty,
   `box-shadow 0 0 12px rgba(0,240,255,.3)`, `margin: .75rem auto 0`) pod nagłówkiem
   każdej sekcji, w czterech wariantach kolorystycznych. Nie mierzyłem ich systematycznie,
   bo nie było ich na mojej liście. Zgłaszam partii od separatorów.

6. **Dług dostępności odziedziczony po wzorcu, którego NIE należy kopiować 1:1.**
   Etykieta liczby `#5e5e7e` na korpusie karty daje **3,10:1** przy 8,8px, czyli poniżej
   progu AA (4,5:1). Podtytuł mono `rgb(106,122,154)` daje 4,46:1, czyli tuż pod progiem.
   Rekomendacja: u nas te dwa kolory podnieść (np. do `#7a7a9e`, które na korpusie karty
   `rgb(12,13,28)` daje ~4,8:1), zachowując resztę proporcji wzorca. To jest jedyne
   miejsce, gdzie świadomie odradzam kopiowanie wzorca 1:1. Decyzja należy do Pawła.

---

## 7. Ściąga: wartości gotowe do wklejenia, w jednym miejscu

```css
/* ---- PASEK NAWIGACJI ---- */
--wz-nav-tlo:            rgba(10, 10, 16, 0.65);
--wz-nav-tlo-scroll:     rgba(6, 6, 12, 0.85);
--wz-nav-obwodka:        rgba(139, 92, 246, 0.2);
--wz-nav-obwodka-scroll: rgba(139, 92, 246, 0.4);
--wz-nav-cien:           0 10px 40px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05);
--wz-nav-cien-scroll:    0 16px 50px rgba(0,0,0,.6), 0 0 20px rgba(139,92,246,.15), inset 0 1px 0 rgba(255,255,255,.05);
--wz-nav-blur:           blur(32px) saturate(1.5);
--wz-nav-h:              54px;    /* wnętrze 52px. UWAGA: w Tailwindzie tego repo pisz h-[54px] */
--wz-nav-top:            16px;    /* po scrollu 12px */
--wz-nav-max:            1040px;  /* po scrollu 980px */
--wz-nav-radius:         100px;
--wz-nav-wstega:         linear-gradient(90deg, #ff007f, #7928ca, #00f0ff, #ff007f); /* 300% 100%, 3s linear */

/* ---- CTA RÓŻOWE (Hire Me → Umów diagnozę) ---- */
--wz-cta-kolor:      #ff00e5;
--wz-cta-tekst:      #ff00e5;              /* CAŁY napis różowy, hover → #fff */
--wz-cta-obwodka:    rgba(255,0,229,.5);   /* puls → #ff00e5 */
--wz-cta-tlo:        rgba(255,0,229,.08);  /* hover → rgba(255,0,229,.2) */
--wz-cta-cien:       0 0 12px rgba(255,0,229,.2), inset 0 0 8px rgba(255,0,229,.1);
--wz-cta-cien-hover: 0 0 35px rgba(255,0,229,.8), inset 0 0 15px rgba(255,0,229,.4);
--wz-cta-font:       12.48px / 700;        /* 0.78rem */
--wz-cta-padding:    6.4px 12px;           /* .4rem .75rem */
--wz-cta-radius:     100px;

/* ---- KARTA ---- */
--wz-karta-tlo:      linear-gradient(160deg, rgba(13,14,30,.88), rgba(9,10,22,.72)); /* JAŚNIEJSZA od strony */
--wz-karta-obwodka:  rgba(255,255,255,.07);
--wz-karta-cien:     inset 0 1px 0 rgba(255,255,255,.05), 0 10px 34px -18px rgba(0,0,0,.55);
--wz-karta-blur:     blur(16px);
--wz-karta-radius:   16px;
--wz-karta-padding:  25.6px 25.6px 21.6px;
--wz-karta-narozniki-opacity: 0.22;   /* hover 0.6 */
--wz-karta-reflektor: radial-gradient(180px at <mysz>, rgba(<akcent>,.08), transparent 70%);

--wz-tytul:      21.6px / 900 / -0.216px / #e4e4f0 / text-shadow: none;   /* karta bohatera */
--wz-tytul-kat:  17.6px / 800 / normal   / #e4e4f0 / text-shadow: none;   /* karta kategorii */
--wz-podtytul:   mono 12px / 400 / rgb(106,122,154);
--wz-status:     mono 8px / 700 / 1.6px / #39ff14;
--wz-liczba:     mono 20.8px / 900 / var(--akcent) / text-shadow: 0 0 12px currentColor;
--wz-etykieta:   mono 8.8px / 700 / 1.056px / uppercase / #5e5e7e;
--wz-punkt:      12.48px / 400 / lh 18.72px / rgb(154,170,191);

--wz-tag-font:    mono 8.8px / 700 / 0.704px / uppercase;
--wz-tag-padding: 3.52px 9.92px;
--wz-tag-radius:  6px;
--wz-tag-tlo:     rgba(<akcent>, .08);   /* hover .14 */
--wz-tag-obwodka: rgba(<akcent>, .20);   /* hover .35 */
--wz-tag-kolor:   var(--akcent);         /* pełne krycie */
--wz-tag-gap:     5.6px;

/* ---- TŁO ---- */
--wz-bg:            #05050c;               /* jeden kolor na jednym elemencie */
--wz-bg-sekcja:     radial-gradient(80% 50% at 50% 0%, rgba(<barwa>, .03 do .04), transparent 70%);
/* poza tym: ZERO tła na sekcjach, zero pasów, zero bg-subtle */

/* ---- KURSOR ---- */
--wz-kropka:        6px, #00f0ff, box-shadow 0 0 12px #00f0ff, 0 0 24px rgba(0,240,255,.3), z-index 10000;
--wz-kropka-hover:  40px, transparent, border 1.5px solid #00f0ff, box-shadow 0 0 20px rgba(0,240,255,.2);
--wz-kropka-trans:  width .2s, height .2s, background .2s;
--wz-kropka-lerp:   BRAK, pozycja 1:1 z mousemove;
--wz-poswiata:      400px, radial-gradient(circle, rgba(139,92,246,.07) 0%, rgba(0,240,255,.04) 30%, transparent 70%);
--wz-poswiata-mix:  mix-blend-mode: screen; filter: blur(1px); z-index 9999;
--wz-poswiata-lerp: 0.08 na klatkę (90 procent drogi po 27 klatkach, ~450 ms przy 60 fps);
--wz-kursor-brama:  @media (hover: none), (pointer: coarse) → display:none + cursor:auto;
```

---

## 8. Trzy rzeczy, które ten pomiar zmienia wobec założeń briefu v8

1. **Brief punkt 8 zakłada, że tytuł karty wzorca ma `text-shadow`. NIE MA.**
   Zmierzone `textShadow: "none"` w spoczynku i na hover. Świecenie tytułu jest efektem
   korpusu karty jaśniejszego od tła plus wagi 900. Doklejenie poświaty do naszych
   tytułów odtworzy problem, a nie go rozwiąże.

2. **Brief punkt 5 zakłada, że wystarczy pociemnić pasek. Wzorzec robi cztery rzeczy naraz**
   (ton ciemniejszy o 26 procent od tła POD paskiem, blur 32px z saturate 1.5,
   czarny cień 40px w dół, jasna fazka 1px u góry plus animowana wstęga 2px).
   Sama zmiana koloru tła paska nie da tego efektu.

3. **Brief punkt 7 mówi o jednym wskaźniku. Wzorzec ma dwa, o różnej szybkości:**
   kropkę 1:1 bez wygładzania (to jest ten „naprowadzający punkcik") i poświatę 400px
   z lerp 0,08 (to jest ten „reflektor"). Nasz reflektor ma dostać skrócone wygładzanie,
   ale KROPKA musi być osobnym elementem pisanym co zdarzenie bez żadnego lerpa,
   bo inaczej właściciel dalej będzie widział opóźnienie.

---

Koniec pomiaru. Zwiad nie dotykał kodu produkcyjnego.
Ścieżka tego pliku: `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\raporty\pomiary-wzorca-v8.md`
