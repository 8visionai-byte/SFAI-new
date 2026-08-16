# Pomiary wzorca infinitytechstack.uk pod spec v10 (zwiad, 2026-08-16)

Metoda: playwright-core (headless chromium 1148), viewport 1440x900, żywa strona
https://infinitytechstack.uk/. Wartości z getComputedStyle + reguły cytowane z CSSOM
(document.styleSheets) zrzuconego w trakcie sesji. Test liczników: natywne kółko myszy
(page.mouse.wheel), bo window.scrollTo NIE budzi ich obserwatora (zweryfikowane: po
scrollTo liczniki stały na 0, po wheel ruszyły).

Artefakty pomiarowe (scratchpad/pw/): v10-pomiar.js, v10-b.js, v10-dane.json,
v10-liczniki.json, v10-cssom.css (pełny zrzut CSSOM z sesji).

---

## 1. KARTA W SPOCZYNKU (kafle akademii i security stack)

### 1.1 USTALENIE GŁÓWNE: obwódka karty NIE jest kolorowa w spoczynku

Wbrew założeniu ze spec pkt 4 („obwódka karty w SPOCZYNKU w kolorze kategorii")
wzorzec trzyma ramkę BIAŁĄ o niskiej alfie także w spoczynku:

| karta | border w spoczynku | border-width | radius |
|---|---|---|---|
| `.lp-learn-card` (akademia) | `rgba(255, 255, 255, 0.06)` | 1px | 14px |
| `.lp-primary-card` (security stack i tools) | `rgba(255, 255, 255, 0.07)` | 1px | 16px |
| `.lp-promo-card` | `rgba(255, 255, 255, 0.07)` | 1px | 14px |

Wrażenie „koloru od samego początku" budują WARSTWY DODATKOWE w kolorze kategorii,
wszystkie widoczne bez hovera:

1. **`.lp-card-neon-top`** — podświetlenie od góry (pkt 1.2, główny akcent),
2. **narożniki `.lp-card-corner`** — 10x10px, `border-color: var(--card-accent)`,
   `opacity: 0.22` w spoczynku (hover: 0.6),
3. **kafel ikony** — pełny kolor kategorii (ikona `color: accent`, tło gradient
   14%→5% akcentu, ramka 26% akcentu, `filter: drop-shadow(0 0 6px accent 35%)`),
4. **tagi `.lp-tag`** — `color: var(--card-accent)`, tło `accent 8%`, ramka `accent 20%`,
5. **tagline mono** — pełny kolor akcentu (np. `rgb(176, 38, 255)`),
6. karty akademii: **kreska boczna `.lp-learn-accent-bar`** — 3px szerokości, pełna
   wysokość, `opacity: 0.5` w spoczynku (hover: 1).

### 1.2 TOP-GLOW: dokładna konstrukcja (realne reguły z CSSOM, 1:1)

To NIE jest pseudoelement ani border-image — to osobny div `.lp-card-neon-top`
wewnątrz karty (`overflow: hidden` na karcie przycina glow):

```css
.lp-card-neon-top {
  position: absolute; top: 0px; left: 0px; right: 0px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--card-accent), var(--card-accent-alt), transparent);
  box-shadow: 0 0 8px var(--card-accent);
}
```

Computed na żywej karcie security (violet): wysokość `1px`, `opacity: 1` (spoczynek!),
`background-image: linear-gradient(90deg, rgba(0,0,0,0), rgb(176,38,255), rgb(176,38,255), rgba(0,0,0,0))`,
`box-shadow: rgb(176,38,255) 0px 0px 8px 0px`.

Konstrukcja „jaśniej na środku, gaśnie ku bokom": 4 stopy gradientu 90deg —
przezroczysty → akcent → akcent-alt → przezroczysty (stopy równomierne, więc środkowa
1/3 szerokości jest w pełnym kolorze, boczne 1/3 wygasają do zera). „Świecenie"
w pionie robi wyłącznie box-shadow 8px (linia ma 1px wysokości). Maski ani
border-image NIE ma. Zwykle `--card-accent-alt` = `--card-accent` (linia
jednokolorowa); wyjątek zmierzony: karta „security suite" ma accent `#39ff14`
i alt `#00f0ff` (przejście zieleń → cyjan wzdłuż linii).

Narożniki (komplet reguł):

```css
.lp-card-corner { position: absolute; width: 10px; height: 10px; border-color: var(--card-accent); opacity: 0.22; transition: opacity 0.3s; border-radius: 1px; }
.lp-primary-card:hover .lp-card-corner { opacity: 0.6; }
.lp-card-corner--tl { top: 8px; left: 8px; border-top: 1px solid; border-left: 1px solid; }
.lp-card-corner--tr { top: 8px; right: 8px; border-top: 1px solid; border-right: 1px solid; }
.lp-card-corner--bl { bottom: 8px; left: 8px; border-bottom: 1px solid; border-left: 1px solid; }
.lp-card-corner--br { bottom: 8px; right: 8px; border-bottom: 1px solid; border-right: 1px solid; }
```

Pozostałe warstwy karty security w spoczynku (computed):
- korpus: `background-image: linear-gradient(160deg, rgba(13,14,30,0.88), rgba(9,10,22,0.72))`,
  `box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 34px -18px rgba(0,0,0,0.55)`,
- `::after` = dolna łuna: `radial-gradient(80% 50% at 50% 120%, accent, transparent 70%)`
  przy `opacity: 0.04` (spoczynek),
- `.lp-card-spotlight`: `opacity: 0` w spoczynku (tylko hover),
- `::before` = sweep (jasny pas 105deg, biel 0.03–0.06), poza kartą do hovera.

Karta akademii `.lp-learn-card` w spoczynku: korpus
`linear-gradient(160deg, rgba(12,13,28,0.74), rgba(9,10,22,0.55))`, box-shadow
`inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 28px -16px rgba(0,0,0,0.5)`;
`.lp-learn-accent-bar`:

```css
.lp-learn-accent-bar { width: 3px; min-height: 100%; background: linear-gradient(180deg, var(--learn-accent), color-mix(in srgb, var(--learn-accent) 30%, transparent)); flex-shrink: 0; opacity: 0.5; transition: opacity 0.3s; }
.lp-learn-card:hover .lp-learn-accent-bar { opacity: 1; }
```

Kafle akademii NIE mają `.lp-card-neon-top` ani narożników — u nich sygnaturą jest
kreska boczna + kolorowa ikona. Neon-top + narożniki to język kart
`.lp-primary-card` (security stack, tools, promo sekcji „primary").

## 2. NASYCENIE: kolory akcentów wzorca w HSL vs nasze

Tokeny :root wzorca (z CSSOM): `--neon-cyan: #00f0ff`, `--neon-magenta: #ff00e5`,
`--neon-violet: #b026ff`, `--neon-green: #39ff14`, `--neon-gold: #ffd700`,
`--accent: #8b5cf6`, `--accent-light: #a78bfa`, `--cyan: #22d3ee`,
`--success: #10b981`, `--warning: #f59e0b`.

### Akcenty kart zmierzone na żywo (computed):

| miejsce | hex | HSL | kontrast na #06060c |
|---|---|---|---|
| security: violet | #b026ff | hsl(278 100% 57%) | 4,40:1 |
| security: green (status/„OPEN SOURCE") | #39ff14 | hsl(111 100% 54%) | 14,91:1 |
| security: cyan | #00f0ff | hsl(184 100% 50%) | 14,35:1 |
| security: orange | #ff6a00 | hsl(25 100% 50%) | 7,04:1 |
| tools: indigo | #6366f1 | hsl(239 84% 67%) | 4,52:1 |
| tools: green | #22c55e | hsl(142 71% 45%) | — |
| tools: purple | #a855f7 | hsl(271 91% 65%) | — |
| tools: amber | #f59e0b | hsl(38 92% 50%) | 9,41:1 |
| tools: pink | #e879f9 | hsl(292 91% 73%) | 8,21:1 |
| tools: emerald | #10b981 | hsl(160 84% 39%) | — |
| tools: indigo-l | #818cf8 | hsl(234 89% 74%) | — |
| tools: violet-l | #a78bfa | hsl(255 92% 76%) | 7,43:1 |
| akademia: cyan | #00f0ff | hsl(184 100% 50%) | 14,35:1 |
| akademia: Google blue | #4285f4 | hsl(217 89% 61%) | — |
| akademia: OpenAI teal | #10a37f | hsl(165 82% 35%) | — |
| akademia: Azure | #0078d4 | hsl(206 100% 42%) | — |
| akademia: AWS orange | #ff9900 | hsl(36 100% 50%) | — |
| akademia: teal | #00d4aa | hsl(168 100% 42%) | — |
| akademia: Claude gold | #e4a541 | hsl(37 75% 57%) | 9,39:1 |
| eyebrow sekcji akademii | #e4a541 | hsl(37 75% 57%) | 9,39:1 |
| eyebrow sekcji security | #00f0ff | hsl(184 100% 50%) | 14,35:1 |
| liczby metryk (inline style) | #00f0ff, #ff00e5, #a78bfa, #39ff14, #22d3ee, #f59e0b | j.w. | 6,14:1 (magenta) |

### Nasze (lib/inf-kategorie.ts po podbiciu F4 + tokeny globals):

| nasz token/kolor | hex | HSL | najbliższy odpowiednik wzorca | wniosek |
|---|---|---|---|---|
| --accent | #00f0ff | hsl(184 100% 50%) | --neon-cyan #00f0ff | identyczny ✓ |
| --accent-hover | #61e9ff | hsl(188 100% 69%) | brak (wzorzec hoveruje alfą, nie jasnością) | ok |
| --accent-2 | #8b5cf6 | hsl(258 90% 66%) | --accent wzorca #8b5cf6 | identyczny ✓ |
| kat. cyan | #11e0ff | hsl(188 100% 53%) | #00f0ff hsl(184 100% 50%) | S już 100% ✓ |
| kat. violet | #8e5cff | hsl(258 100% 68%) | #b026ff hsl(278 100% 57%) | S równe; wzorzec ma H bardziej w magentę i NIŻSZE L (mocniej „jarzy") |
| kat. violet-l | #a586ff | hsl(255 100% 76%) | #a78bfa hsl(255 92% 76%) | nasz wręcz mocniejszy ✓ |
| kat. green | #00c986 | hsl(160 100% 39%) | #39ff14 hsl(111 100% 54%) | wzorzec używa NEONOWEJ zieleni (H 111, L 54) do statusów; nasz szmaragd odpowiada ich #10b981 (drugorzędny) |
| kat. amber | #ffa101 | hsl(38 100% 50%) | #f59e0b hsl(38 92% 50%) / #ff6a00 | nasz nasycony ✓ |
| odcień magenta | #ff67b7 | hsl(328 100% 70%) | #ff00e5 hsl(306 100% 50%) | wzorzec ma czystą magentę L 50, nasz róż L 70 jest bledszy |
| odcień green-l | #29ff77 | hsl(142 100% 58%) | #39ff14 hsl(111 100% 54%) | blisko ✓ |
| odcień blue | #5ba4ff | hsl(213 100% 68%) | #60a5fa hsl(213 94% 68%) | nasz mocniejszy ✓ |

WNIOSEK NASYCENIE: po F4 nasza paleta ma S=100% jak wzorzec — hexy NIE są już „za
blade". Realna różnica „u nich jarzy, u nas nie" siedzi w EKSPOZYCJI, nie w hexach:
(a) wzorzec pokazuje pełny kolor w spoczynku na neon-top z glow 8px, ikonie
z drop-shadow, tagach, tagline i liczbach metryk; (b) statusy/liczniki jadą na
neonowej zieleni #39ff14 (H 111), której w naszej palecie nie ma (nasze zielenie:
H 160 i H 142); (c) magenta wzorca #ff00e5 (L 50) mocniejsza od naszego różu #ff67b7
(L 70). UWAGA kontrast: #b026ff = 4,40:1 na tle (tekst normalny AA wymaga 4,5 —
wzorzec używa go na tagline/tagach mono; przy przenoszeniu na tekst policzyć,
nasz #8e5cff 4,7:1 jest bezpieczniejszy).

## 3. GRID: gapy i paddingi (computed, 1440px)

| siatka | columnGap | rowGap | kolumny | padding karty |
|---|---|---|---|---|
| `.lp-learn-grid` (akademia) | **16px** | **16px** | 2 x 528px | karta 0; wnętrze `.lp-learn-card-inner` 20px 24px (1.25rem 1.5rem) |
| `.lp-primary-grid--three` (security, tools) | **20px** | **20px** | 3 x 344px | 25.6px 25.6px 21.6px (1.6rem 1.6rem 1.35rem) |
| `.lp-primary-grid` (2 kol.) | **20px** | **20px** | 2 x 526px | 25.6px 25.6px 21.6px |
| `.lp-promo-inner` | 16px | 16px | 2 x 468px | 15.2px 18.4px (0.95rem 1.15rem) |
| `.lp-footer-grid--four` | 24px | 24px | 4 | 0 |

Realny gap zmierzony z boundingRect sąsiadów = computed (16/20/24px, zero dryfu).
Wiersze wyrównane: karty w rzędzie mają identyczną wysokość (grid stretch).
Max szerokość treści: `.lp-learn-grid` 1120px (`max-width: 1120px; margin: 0 auto`).

## 4. NAGŁÓWKI SEKCJI: kolorowy fragment H2

H2 bazowo BIAŁE `rgb(228, 228, 240)` (= --text-primary), font-size 35.2px (2.2rem).
Kolorowy fragment = span `.lp-gradient-text` na końcówce/kluczowych słowach
(„Own Your Infrastructure", „No Sign-Up Required", „GitHub", „Future of AI & AGI",
„Answered"). To GRADIENT-TEXT, nie solidny kolor:

- computed spanu: `background-image: linear-gradient(135deg, rgb(0,240,255), rgb(255,0,229), rgb(176,38,255))`
  (cyjan → magenta → violet, JEDEN wspólny gradient dla wszystkich sekcji),
  `background-clip: text`, `-webkit-text-fill-color: transparent`,
  bazowy `color` zostaje `rgb(228,228,240)` (fallback),
- do tego shimmer: `.lp-gradient-text::after { content: attr(data-text); ... }` —
  duplikat tekstu z gradientem bieli (`transparent → rgba(255,255,255,.15) 25% →
  transparent 50% → rgba(255,255,255,.1) 75% → transparent`, size 200% 100%,
  `background-clip: text`, `mix-blend-mode: overlay`) i animacją
  `holo-shimmer 4s ease-in-out infinite`:

```css
@keyframes holo-shimmer {
  0% { background-position: 200% 0px; }
  100% { background-position: -200% 0px; }
}
```

(shimmer wyłączany przy prefers-reduced-motion — wzorzec ma go w swoim bloku reduce).

Wyjątek: H2 „Master Gemini, OpenAI, Azure & Claude" — każda nazwa marki ma WŁASNY
dwustopowy gradient 135deg (Gemini `#4285f4→#ea4335`, OpenAI `#10a37f→#34d399`,
Azure `#0078d4→#22d3ee`, Claude `#e4a541→#a78bfa`).

Kontrast fragmentu (duży tekst, próg 3:1): najciemniejszy stop #b026ff = 4,40:1
na #06060c ✓; pozostałe stopy 6,14:1 (#ff00e5) i 14,35:1 (#00f0ff) ✓.

## 5. NAV: co dokładnie animuje się na pasku

Pasek = `NAV.gnav`. W CAŁYM pasku są dokładnie DWIE animacje (getAnimations
subtree, zmierzone na żywo):

1. **Płynąca obwódka** — `CSSAnimation border-flow`, cel `.gnav::before`,
   3000ms, infinite:

```css
.gnav { position: fixed; top: 16px; left: 50%; transform: translateX(-50%); width: calc(100% - 32px); max-width: 1040px; border-radius: 100px; z-index: 1000; background: rgba(10, 10, 16, 0.65); backdrop-filter: blur(32px) saturate(1.5); border: 1px solid rgba(139, 92, 246, 0.2); box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 40px, rgba(255, 255, 255, 0.05) 0px 1px 0px inset; transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.gnav::before { content: ""; position: absolute; inset: -2px; border-radius: 100px; padding: 2px; background: linear-gradient(90deg, rgb(255, 0, 127), rgb(121, 40, 202), rgb(0, 240, 255), rgb(255, 0, 127)) 0% 0% / 300% 100%; mask: linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0); animation: 3s linear 0s infinite normal none running border-flow; pointer-events: none; opacity: 0.95; }
@keyframes border-flow {
  0% { background-position: 0% 0px; }
  100% { background-position: 200% 0px; }
}
```

2. **Puls różowego CTA** — `CSSAnimation cta-pulse`, cel `A.gnav-quick--cta`,
   2000ms, infinite:

```css
@keyframes cta-pulse {
  0%, 100% { box-shadow: rgba(255, 0, 229, 0.2) 0px 0px 12px, rgba(255, 0, 229, 0.1) 0px 0px 8px inset; }
  50% { box-shadow: rgba(255, 0, 229, 0.5) 0px 0px 25px, rgba(255, 0, 229, 0.3) 0px 0px 12px inset; border-color: rgb(255, 0, 229); }
}
```

Nic więcej się nie animuje: ŻADNEGO ::after, halo, blur-warstwy ani animacji na
linkach.

### Porównanie z naszą `.inf-pill-nav` (app/globals.css):

| cecha | wzorzec `.gnav` | nasza `.inf-pill-nav` | różnica |
|---|---|---|---|
| konstrukcja wstęgi | ::before inset -2px, padding 2px, mask ring exclude | identyczna | ✓ |
| gradient wstęgi | `90deg #ff007f #7928ca #00f0ff #ff007f`, size 300% 100% | `--ring-gradient` identyczny, size 300% 100% | ✓ |
| keyframes | `border-flow`: bg-position **0% → 200%**, 3s linear | `infRingFlow`: **0% → 300%**, 3s linear | nasza wstęga płynie 1,5x SZYBCIEJ (6 szerokości kontenera/cykl vs 4); pętla wzorca ma skok fazy co 3s, nasza jest bezszwowa |
| opacity wstęgi | **0.95** | 1 (brak deklaracji) | minimalnie mocniejsza u nas |
| tło paska | rgba(10,10,16,0.65) + blur(32px) saturate(1.5) | desktop rgba(3,3,16,0.65) + ten sam blur | celowa decyzja v8 (proporcja luminancji, nie hex) — zostaje |
| border paska | 1px rgba(139,92,246,0.2) | identyczny | ✓ |
| box-shadow | 0 10px 40px rgba(0,0,0,.5) + inset 0 1px 0 rgba(255,255,255,.05) | identyczny | ✓ |
| puls CTA | cta-pulse 2s ease infinite (wartości wyżej) | infCtaPulse 2s ease infinite, wartości 1:1 | ✓ |

Czyli: nasza pigułka NIE jest słabszą wersją — jedyne odchyłki to tempo wstęgi
(my 300%/3s vs oni 200%/3s) i opacity 0.95 vs 1. Jeśli wyrównywać do wzorca 1:1,
zmiana dotyczy wyłącznie tych dwóch liczb.

## 6. LICZBY: liczniki animują się RAZ, nie przy każdym wejściu

Dowód behawioralny (v10-liczniki.json + log v10-b.js; elementy `.lp-stat-value`,
np. `<span class="lp-stat-value" style="color:#00f0ff">0</span>`):

- Stan po załadowaniu (bez scrolla): wszystkie liczniki = `0`.
- WEJŚCIE 1 (scroll kółkiem do sekcji stats): wartości lecą od zera do celu,
  np. `73 000+` rośnie przez ~3 próbki co 250ms (`70 977 → 72 776 → 73 000`),
  `303M`: `281M → 298M → 303M`. Czas odliczania ok. 1,5–2s, końcówka wyhamowuje
  (easing out).
- Powrót na samą górę strony (liczniki całkowicie poza kadrem, 1s przerwy):
  wartości ZOSTAJĄ na finalnych (`73 000+`, `303M`...), nie resetują się do 0.
- WEJŚCIE 2 w kadr: przez 3s próbkowania co 250ms ŻADNA wartość się nie zmieniła —
  zero restartu.

WNIOSEK: wzorzec odlicza JEDEN raz (obserwator odpina się po pierwszym wejściu).
„Cały czas animowane" z uwag Pawła to inne, stale widoczne elementy (puls CTA 2s,
wstęga nav 3s, holo-shimmer H2 4s, status-dot pulsuje `opacity 0.42` w cyklu),
a NIE liczniki. To wspiera ostrożną interpretację spec pkt 7: restart przy każdym
wejściu w kadr będzie już PONAD wzorzec, nie doganianiem go.

Uwaga techniczna: obserwator liczników wzorca NIE reaguje na programowy
`window.scrollTo` (w teście liczniki stały na 0 mimo scrolla) — rusza go dopiero
natywne scrollowanie (wheel). Przy własnych testach E2E naszych liczników
scrollować kółkiem/gestem, nie scrollTo.

---

## NIEZMIERZONE

- Dokładny czas trwania odliczania licznika (start odliczania zaszedł w trakcie
  dojazdu kółkiem do sekcji; z próbek co 250ms wychodzi ~1,5–2s z easingiem, ale
  to szacunek, nie odczyt z kodu — implementacja jest w zminifikowanym bundlu).
- Hover pełny (sweep/spotlight w ruchu) — poza zakresem tego zwiadu (spoczynek);
  reguły :hover zacytowane z CSSOM tam, gdzie graniczą ze stanem spoczynku.
- Mobile wzorca (pomiar tylko 1440x900 — spec v10 pyta o spoczynek/gapy/nav,
  które na mobile wzorca mają odrębne media queries; do zmierzenia osobno, jeśli
  któraś partia będzie tego potrzebować).
