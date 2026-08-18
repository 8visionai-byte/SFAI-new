# Pomiary WZORCA v22: 5 podstron infinitytechstack.uk (zwiad, 2026-08-18)

**Metoda:** playwright-core (Chrome headless), viewport 1440x900 i 390x800, żywe
strony. Wartości z `getComputedStyle` po pełnym przescrollowaniu strony (leniwe
sekcje muszą się odsłonić). Hover mierzony natywnym `page.hover` + 650 ms.
Widok bota mierzony osobnym kontekstem `javaScriptEnabled: false`.

**Artefakty pomiarowe (scratchpad):** `w22-a-sekcje.mjs/.json` (mapa sekcji),
`w22-b-karty.mjs/.json` (anatomia + hover), `w22-c-bogate.mjs/.json` (warianty
bogate), `w22-d-naglowki.mjs/.json` (kickery, palety, linie, mobile),
`w22-e2-bezjs.mjs/.json` (widok bez JS), `w22-e4-nasze2.mjs/.json` (nasz punkt
odniesienia).

**Zakres:** `/praxis`, `/axiom`, `/vitalis-v1333`, `/void`, `/freedom` + `/` jako
punkt odniesienia. Zero zmian w repo poza tym plikiem.

---

## 0. USTALENIE ZEROWE: wzorzec jest w całości serwerowy

To najważniejszy pomiar dla priorytetu nadrzędnego (boty i Google). Porównanie
tej samej strony z JS i bez JS:

| strona | znaków z JS | znaków BEZ JS | strata | H2 | H3 | H4 | table | details | li | pre | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /praxis | 7 708 | 7 702 | 0,08% | 9 | 1 | 11 | 1 | 0 | 3 | 1 | 4 |
| /axiom | 26 518 | 26 515 | 0,01% | 15 | 30 | 0 | 0 | 4 | 122 | 0 | 2 |
| /vitalis-v1333 | 23 000 | 22 998 | 0,01% | 17 | 38 | 17 | 4 | 8 | 108 | 4 | 2 |
| /void | 23 690 | 21 368 | **9,8%** | 16 | 31 | 0 | 0 | 11 | 52 | 0 | 2 |
| /freedom | 11 422 | 11 417 | 0,04% | 10 | 16 | 0 | 1 | 6 | 0 | 4 | 2 |
| / (home) | 11 337 | 11 296 | 0,4% | 6 | 37 | 0 | 0 | 10 | 12 | 0 | 2 |

Wnioski wiążące dla nas:

1. **Cała ta „czaderskość" jedzie bez JS.** Kafle metryk, panele porównawcze,
   osie czasu, okna kodu, listy modułów, akordeony: wszystko stoi w HTML przy
   pierwszym żądaniu. Wizualna warstwa wzorca NIE kosztuje ani jednego znaku
   dla bota. To dowód, że nasz kierunek (SSG + bloki serwerowe) jest właściwy
   i że da się mieć „wow" bez regresji botowej.
2. **Jedyna realna strata to `/void` (-2 322 znaki)**: sekcja
   `#sec-inventory` (45 wierszy + 12 przycisków filtra) renderuje listę z JS.
   To jest dokładnie ten antywzorzec, którego zakazuje nasz spec („zero treści
   za kliknięciem"). NIE kopiujemy filtrowanych inwentarzy.
3. `/praxis` jest hierarchicznie słaby: 9 H2, tylko 1 H3, za to 11 H4
   (przeskok poziomu). To błąd wzorca, nie chwyt. Nie powielamy.
4. JSON-LD: `/praxis` ma 4 skrypty (`SoftwareApplication`, `BreadcrumbList`,
   `FAQPage`), reszta po 2. Nasze poradniki mają 5 typów
   (`Article`, `BreadcrumbList`, `FAQPage`, `Organization`, `WebSite`), czyli
   **w tym jednym wymiarze już jesteśmy lepsi od wzorca**.
5. **Wzorzec blokuje GPTBota**: żądanie z `user-agent: GPTBot/1.0` dostaje
   HTTP 403 na wszystkich sześciu adresach (58 znaków treści). My GPTBota
   wpuszczamy. Nasza przewaga, której nie wolno stracić.

Nasz punkt odniesienia (te same pomiary bez JS, produkcja www.simplefast.ai):

| nasza strona | znaków | H2 | H3 | table | details | li | JSON-LD |
|---|---|---|---|---|---|---|---|
| /poradniki/ile-kosztuje-chatbot-dla-firmy-2026 | 9 896 | 14 | 4 | 1 | 6 | 105 | 5 |
| /blog/chatbot-czy-ai-agent-roznice | 7 689 | 10 | 1 | 1 | 3 | 89 | 5 |
| /narzedzia | 13 593 | 10 | 9 | 1 | 1 | 93 | 3 |
| /produkty | 7 677 | 7 | 15 | 0 | **0** | 95 | 4 |
| /realizacje | 6 011 | 5 | 9 | 0 | **0** | 109 | 3 |
| /blog | 4 651 | 6 | 11 | 0 | **0** | 105 | 3 |
| /wiedza | 4 446 | 8 | 7 | 0 | **0** | 89 | 3 |
| /uslugi | 4 087 | 9 | 11 | 0 | **0** | 90 | 3 |

Luka jest widoczna gołym okiem: **nasze huby nie mają ani jednej `<details>`
i ani jednej `<table>`**, a wzorzec trzyma 6 do 11 akordeonów na każdej
podstronie. Podstrony treściowe (poradnik, blog) mamy porządne.

---

## 1. /praxis (10 sekcji, 7 702 znaki)

### 1.1 Lista sekcji

Hero jest POZA `<section>` (`main > div > header`): glif ▲, H1 `PRAXIS`
56px/900, letter-spacing 5,6px, lead `<p>`, rząd pigułek, `<p>` mono z cytatem
konfiguracji. Pod hero pasek `.px-ticker` z 12 hasłami mono uppercase.

| # | rola | H2 | typ prezentacji | elementów | układ |
|---|---|---|---|---|---|
| 0 | pas metryk hero | brak | **kafle metryk** | 5 | grid 5x194px, gap 20px |
| 1 | graf zależności | Kahn Topo-Sort Dependency Graph | panel interaktywny | 4 przyciski | grid 4x241px, gap 12px |
| 2 | terminal | Interactive CLI & Engine Terminal | panel z konsolą | 4 zakładki | flex, gap 8px |
| 3 | etapy | Five Stages, One Direction | **oś pozioma (pigułki etapów)** | 5 | flex, gap 8px |
| 4 | prywatność | Privacy Enforced In Code | segmentowany przełącznik + panel werdyktu | 5+4 | `.px-seg` flex |
| 5 | DSL | A DSL, Not a Language | **siatka 2+1 (kod + karty)** | 1 okno + 4 karty | grid **572px / 458px**, gap 22px |
| 6 | pętla naprawcza | Agents That Fix Themselves | **oś pozioma (węzły)** | 5 | `.px-loop-track` flex, gap 14px |
| 7 | inwentarz modułów | Module Inventory | **lista modułów z paskiem postępu** | 16 | grid 170/130/620/46px, gap 12px |
| 8 | uzasadnienie | Built For How Brains Actually Work | siatka funkcji | 6 | grid 4x252px, gap 14px |
| 9 | zależności | Core Dependencies | siatka funkcji | 7 | grid 3x341px, gap 14px |

### 1.2 Anatomia kart

- **`.px-neon-card` (kafel metryki, 194x139):** liczba `<span>` 42px/900 w pełnym
  akcencie `#00f0ff`; podpis `<div>` 12px, letter-spacing 1,2px, uppercase,
  `#5a6a8a`. Brak ikony, brak chipa, brak strzałki. Cała robota na kontraście
  wielkości (42px vs 12px) i kolorze.
- **`.px-mod-row` (wiersz modułu, 1002x19):** 4 kolumny: [nazwa pliku mono
  12,5px/600 `#e4ecff` + sufiks `· dsl` 10,5px `#5a6a8a`] / [pasek postępu:
  tło `rgba(176,38,255,0.1)` radius 4px, wypełnienie
  `linear-gradient(90deg,#00f0ff,#b026ff)`] / [opis 12px `#8896b3`] /
  [liczba LOC mono 12,5px w złocie `#ffd700`].
- **`.px-loop-node` (węzeł osi, 189x83):** płytka ikony `.px-loop-ico` (emoji
  24px, ramka 1px `rgba(0,240,255,0.12)`, tło `rgba(10,10,24,0.7)`, radius 14px)
  + nazwa mono 11px `#8896b3`.
- **`.px-stage` (pigułka etapu, 175x148):** kicker `STAGE 1` 10px `#5a6a8a`,
  emoji 26px, nazwa 15px/700 w kolorze etapu, podpis mono 10,5px. Stan aktywny
  `.px-stage--on`: ramka 1px **pełny** `#ff2fd0` + tło
  `linear-gradient(rgba(0,240,255,0.08), rgba(17,17,39,...))`.
- **`.px-code-window` (572x519):** pasek `.px-code-bar` (tło
  `rgba(10,10,24,0.7)`, pad 12px 16px) z 3 kropkami 50% (`#ff5f57`, `#febc2e`,
  `#28c840`) i nazwą pliku mono 11px `#5a6a8a`; ciało `<pre>` mono 12,5px,
  pad 18px 22px, składnia kolorowana (klucze `#00f0ff`, wartości `#c9b8ff`).
- **`.px-dsl-card` (458x100):** H4 mono 13px w akcencie w nawiasach
  kwadratowych `[Objective]` + `<p>` 12,5px `#8896b3`.

### 1.3 Pomiar computed (`.px-neon-card`)

| właściwość | spoczynek | hover |
|---|---|---|
| border | `1px solid rgba(0,240,255,0.125)` | bez zmiany |
| radius | 16px | 16px |
| tło | `rgba(17,17,39,0.65)` | bez zmiany |
| padding | 24px | 24px |
| `::before` | `linear-gradient(135deg, rgba(0,240,255,0.25), rgba(176,38,255,0.15), transparent 60%)`, opacity **1** | opacity 1 |
| transform | brak | `scale(1.008)` + `translateY(-2px)` + mikro-tilt 3D |
| backdrop | `blur(12px)` | `blur(12px)` |

Praxis jako jedyny buduje kolor **gradientem narożnikowym widocznym w spoczynku**,
a nie kątownikami na hover.

### 1.4 Co robi wrażenie

Siatka 2+1 w sekcji DSL (nierówne 572/458px: okno kodu obok kart wyjaśnień),
pasek postępu w wierszu modułu (mini wykres w tabeli), liczba LOC w złocie jako
jedyny złoty element w wierszu, oraz oś pozioma z węzłami emoji.

---

## 2. /axiom (20 sekcji, 26 515 znaków, najdłuższa strona wzorca)

### 2.1 Lista sekcji

Hero: `<canvas>` w tle, H1 `NEUROMANTIX` **84px/900**, letter-spacing 6,72px,
`<p>` podtytuł, `<p>` lead, wskaźnik scrolla `.ax-scroll-cue`.

| # | id | H2 | typ prezentacji | elementów | układ |
|---|---|---|---|---|---|
| 0 | - | brak | kafle metryk | 3 | grid 3x334px, gap 24px |
| 1 | sec-core | The Cognitive Core | panel diagramu | 2 kolumny | flex, gap 28px |
| 2 | sec-trace | One Tick, Traced | oś przebiegu | 5 | flex, gap 8px |
| 3 | sec-loop | 17-Step Consciousness Loop | **kroki numerowane** | 17 | flex |
| 4 | sec-conscious | Consciousness Architecture | **siatka funkcji z listami** | 11 | grid 3x337px, gap 20px |
| 5 | sec-v5 | Conversation Engine v5 | siatka funkcji | 6 | grid 3x324px, gap 14px |
| 6 | sec-v6 | Engine v6 (Living Substrate) | siatka + podsiatka | 6 + 4 | grid 3x324 / 4x243px |
| 7 | sec-versus | Neuromantix vs Every LLM | **panel porównawczy** | 21 wierszy | grid 3x315px |
| 8 | sec-bench | Benchmark: Rust vs Python | **tabela wyników + kafle** | 11 wierszy | grid 170/526/70/90/90px |
| 9 | sec-arch | Cognitive Architecture | **oś pionowa** | 20 | flex kolumnowy |
| 11 | sec-systems | Core Cognitive Systems | siatka funkcji | 11 | grid 3x337px |
| 12 | sec-studio | Neuromantix Studio | kafle drobne | 19 | grid 5x190px, gap 12px |
| 16 | - | Why Self-Conscious Neuromorphic AGI? | siatka funkcji | 4 | grid 3x337px |
| 17 | sec-frontier | AGI Research Frontier | **karty SEO (H3 = fraza)** | 4 | grid 3x337px |
| 18 | sec-faq | AGI & Neuromorphic FAQ | **akordeon `<details>`** | 4 | flex, gap 10px |
| 19 | - | Built 120K+ LOC of AGI... Hire the Engineer. | **CTA** | 5 elementów | flex, gap 20px |

### 2.2 Anatomia kart

- **`.ax-neon-card` wariant metryki (335x147):** liczba 42px/900 `#00ffaa`,
  podpis 12px uppercase ls 1,2px `#5a6a8a`.
- **`.ax-neon-card` wariant funkcji (337x441):** [ikona `◎` 22px w akcencie +
  `<h3>` 14px/700 **w akcencie**] / `<p>` 12px `#b0b0cc` / `<ul>` z 8x `<li>`
  11px `#9090b0`, każdy z markerem `▸` 8px w akcencie. Bez chipa, bez strzałki,
  bez statusu. Cała hierarchia na trzech rozmiarach: 22/14 - 12 - 11px.
- **panel porównawczy (wiersz 1002x39):** grid 3x315px, pad 10px 16px:
  [cecha 12px/600 `#e4e4f0`] / [wartość konkurencji mono 11px
  **`rgba(255,0,60,0.5)`**, czyli przygaszona czerwień] / [nasza wartość
  mono 11px/600 **`#00ffaa`**]. Semantyka koloru robi całą pracę.
- **wiersz osi pionowej (1002x49):** kropka (`border-radius: 50%`, tło
  `#00f0ff`) + [nazwa 14px/700 w akcencie + opis 12px `#5a6a8a`] + strzałka `↓`
  w `rgba(255,255,255,0.15)`. Linia łącząca jest **udawana strzałką**, nie
  pseudoelementem: tanie i bezpieczne.
- **kafel benchmarku (236x61):** liczba 28px/900 mono `#ffd700` + podpis 10px/700
  uppercase `#5a6a8a`.
- **`<details>` FAQ (1002x94):** ramka 1px `rgba(0,255,170,0.16)`, tło
  `rgba(0,0,0,0.16)`, radius 10px, pad 10px 12px, `<summary>` 13px/700 `#39ff14`,
  `<p>` 12px `#a5afc8`.

### 2.3 Pomiar computed (`.ax-neon-card`, karta reprezentatywna)

| właściwość | spoczynek | hover |
|---|---|---|
| border | `1px solid rgba(0,255,170,0.125)` | **bez zmiany** |
| radius | 16px | 16px |
| tło | `rgba(12,14,28,0.7)` | bez zmiany |
| padding | 28px 24px | 28px 24px |
| box-shadow | `rgba(0,0,0,0.45) 0 8px 32px` | `rgba(0,0,0,0.55) 0 12px 44px` + `rgba(0,240,255,0.10) 0 0 42px` + `rgba(176,38,255,0.07) 0 0 90px` |
| `::before` / `::after` | 20x20px, **opacity 0** | **opacity 0,7** |
| transform | brak | mikro-tilt 3D + `translateY` |
| backdrop | `blur(14px)` | `blur(14px)` |

**To jest dokładnie nasz mechanizm kątowników v19** (`::before`/`::after` 20px,
niewidoczne w spoczynku, wyskakujące na hover) plus potrójna łuna zamiast
zmiany koloru ramki. Ramka NIE zmienia koloru na hover.

### 2.4 Co robi wrażenie

Panel porównawczy 21 wierszy (czerwony „None" vs zielona wartość), oś pionowa
20 poziomów, karty z listami po 8 punktów (gęstość informacji przy zachowaniu
oddechu), i sekcja „Research Frontier", gdzie H3 to pełne frazy wyszukiwania.

---

## 3. /vitalis-v1333 (17 sekcji, 22 998 znaków, najbogatsza semantycznie)

### 3.1 Lista sekcji

Hero: glif ⚡, H1 `VITALIS V1333` 58px/900 ls 5,8px, `<p>` mono z metrykami
`345 MODULES • 6,742 TESTS • 207K LOC • V1333`, `<p>` lead.

| # | id | H2 | typ prezentacji | elementów | układ |
|---|---|---|---|---|---|
| 0 | sec-roadmap | Development Roadmap | **kafle statusu** | 16 | grid 3x353px, gap 16px |
| 1 | sec-neuro | Neuromorphic Computing Stack | siatka funkcji | 15 | grid 3x354px, gap 14px |
| 2 | sec-benchmarks | JIT Compilation Benchmarks | **tabela** | - | `<table>` |
| 3 | - | Neuromorphic & Tensor Performance | tabela + kafle | 3 kolumny | flex, gap 24px |
| 4 | - | Performance vs Python | **tabela** | - | `<table>` |
| 5 | sec-comparison | V44 vs V1333 Comparison | panel porównawczy | - | - |
| 6 | - | V44 to V1000 Journey | **oś czasu w kafelkach** | 10 | grid 4x258px, gap 20px |
| 7 | sec-bootstrap | Bootstrap Proofs | karty dowodów | 3 | grid 3x350px, gap 20px |
| 8 | sec-pipeline | Full Compilation Pipeline | **dwie kolumny pipeline** | 2x7 | flex kolumnowy |
| 9 | sec-action | Vitalis Language in Action | **dwa okna kodu** | 2 | grid 2x536px, gap 20px |
| 10 | - | Core Language Capabilities | siatka funkcji | 10 | grid 3x350px |
| 11 | sec-omega | V1000 Omega Summary | panel dwukolumnowy | 2 | grid 2x509px, gap 24px |
| 12 | sec-frontier | Language & Compiler Research Frontier | karty SEO | 4 | grid 3x350px |
| 13 | sec-faq | Frequently Asked Questions | **akordeon** | 8 | flex, gap 12px |
| 14 | - | Eras I-IV: v601 do v1000 | siatka funkcji | 4 | grid 3x350px |
| 15 | - | Project Freedom | 3 karty + lista 10 | grid 3x326px + grid 52/373px |
| 16 | - | Built a Self-Hosting Compiler... Hire the Engineer. | CTA | 5 | flex, gap 20px |

### 3.2 Anatomia kart

- **kafel statusu roadmapy (303x23):** [chip `DONE` 11px/800 `#39ff14`, tło
  `rgba(57,255,20,0.094)`, radius 8px, pad 3px 10px] + [nazwa `Phase C`
  mono 14px/700 w tym samym kolorze] + [zakres `v135-v137` 11px `#5a6a8a`].
  **Kolor chipa = kolor nazwy = status.** Zielony DONE, inne fazy inne kolory.
- **karta dowodu (301x42):** emoji 28px + `<h3>` 16px/700 w akcencie.
- **etap pipeline (486x370, kolumna 7 etapów):** kropka 50% w pełnym kolorze
  etapu + [nazwa pliku mono 14px/700 w kolorze etapu + opis 12px `#5a6a8a`] +
  strzałka `→` 16px/700 w tym samym kolorze przy **31% alfa**. Każdy etap ma
  INNY kolor (zielony, cyjan...), więc pipeline czyta się jak legenda.

### 3.3 Co robi wrażenie

Cztery prawdziwe `<table>` i 17 `<h4>` (najbogatsza semantyka ze wszystkich
pięciu). Oś czasu, w której H3 to numery wersji (`v45-v60`). Pipeline w dwóch
kolumnach ze strzałkami w kolorze etapu przy niskiej alfie. Nagłówki sekcji
sformułowane jako pytania (`Can a Compiler Compile Itself?`) - to identyczna
technika answer-first, którą już stosujemy w poradnikach.

---

## 4. /void (17 sekcji, 21 368 znaków bez JS)

### 4.1 Lista sekcji

Hero: pigułka `VOID 1B / 3B · RUST & CUDA FROM-SCRATCH ENGINE` (inline-flex,
radius 100%, ramka `rgba(0,240,255,0.3)`), H1 67,2px/900 ls 2,688px, `<p>` lead,
rząd 7 chipów faktów, rząd 2 CTA. Pod hero `.vd-ticker` z 12 hasłami.

| # | id | H2 | typ prezentacji | elementów | układ |
|---|---|---|---|---|---|
| 0 | - | brak | kafle metryk | 3 | grid 3x373px, gap 20px |
| 1 | sec-moe | 12-Expert MoE Architecture | panel interaktywny + siatka ekspertów | 41 + 12 | grid 6x172px, gap 12px |
| 2 | sec-novelties | Technical Novelties | **siatka funkcji z chipem i stopką** | 6 | grid 3x373px, gap 20px |
| 3 | sec-arch | Transformer & MoE Architecture | diagram warstw | 8 | grid 8x134px |
| 4 | sec-training | Training Status & GPU Telemetry | panel telemetrii | 8+5 | flex, gap 8px |
| 5 | sec-models | Model Lineup & Presets | **karty klucz-wartość** | 6 | grid 4x265px, gap 16px |
| 6 | sec-tensor | Custom Tensor Engine | siatka funkcji | 4 | grid 3x373px |
| 7 | sec-scaling | Scaling & Efficiency Engine | siatka funkcji | 6 | grid 3x373px |
| 8 | sec-evolution | Self-Evolution Engine | kafle | 4 | grid 4x265px |
| 9 | sec-harness | Orchestration Harness | siatka funkcji | 4 | grid 3x373px |
| 10 | sec-studio | Void Studio GUI | kafle drobne | 9 | grid 5x212px |
| 11 | sec-deps | Dependency Stack | **lista modułów** | 14 | grid 140/70/852px |
| 12 | sec-inventory | Searchable Source Inventory | **lista filtrowana JS (ANTYWZORZEC)** | 45 + 12 | flex |
| 13 | sec-rust | Why Rust for Machine Learning? | siatka funkcji | 4 | grid 3x373px |
| 14 | sec-frontier | From-Scratch LLM Research Frontier | karty SEO | 5 | grid 3x373px |
| 15 | sec-faq | Frequently Asked Questions | **akordeon** | 11 | flex, gap 12px |
| 16 | - | Built an LLM Training Engine... Hire the Engineer. | CTA | 5 | flex |

### 4.2 Anatomia kart

- **`.vd-neon-card` metryka (373x133):** liczba 38px/900 `#00f0ff` + podpis
  12px/700 uppercase ls 1,2px `#5a6a8a`.
- **`.vd-neon-card` funkcja (373x295), najbogatsza karta wzorca:**
  1. pasek górny: [chip kategorii `Tokenization` mono 10px/800 uppercase,
     kolor `#00f0ff`, tło `rgba(0,240,255,0.07)`, ramka 1px
     `rgba(0,240,255,0.25)`, radius 12px, pad 4px 10px] +
     [meta `bpe.rs (306 LOC)` mono 11px `#5a6a8a`],
  2. `<h3>` 16px/800 **biały** (nie kolorowy: kolor niesie chip),
  3. `<p>` 12,5px `#b0b0cc`,
  4. stopka: separator `border-top: 1px rgba(255,255,255,0.06)`, padding-top
     12px, siatka **2x2** punktów, każdy `▸` + tekst mono 11px w akcencie.
- **karta presetu (266x139):** **lewa kreska `border-left: 3px solid #ffd700`**
  (pełny kolor, bez alfy), tło `rgba(0,0,0,0.3)`, radius 12px, pad 16px 18px.
  Zawartość: [nazwa mono 14px/800 w kolorze + badge `Complete` 9px/800, tło
  `rgba(255,215,0,0.082)`, ramka 25%, radius 10px] + 4 pary klucz-wartość
  (etykieta 11px `#5a6a8a` / wartość mono 11px/600 `#e4e4f0`).
- **wiersz zależności (1110x41):** grid 140/70/852px: [nazwa mono 13px/700
  `#ff6a00`] / [wersja mono 11px `#5a6a8a`] / [opis 12px `#b0b0cc`].
- **`<details>` FAQ (1110x131):** ramka 1px `rgba(57,255,20,0.208)`, tło
  `rgba(0,0,0,0.3)`, radius 12px, pad 14px 18px, `<summary>` mono 14px/700
  `#39ff14`, `<p>` 12,5px `#b0b0cc`.

### 4.3 Pomiar computed (`.vd-neon-card`)

| właściwość | spoczynek | hover |
|---|---|---|
| border | `1px solid rgba(0,240,255,0.19)` | bez zmiany |
| radius | 16px | 16px |
| tło | `rgba(11,14,28,0.75)` | bez zmiany |
| padding | 24px | 24px |
| box-shadow | brak | brak |
| `::before` / `::after` | 20x20px, opacity **0** | opacity **0,8** |
| transform | brak | `translateY(-2px)` + mikro-tilt |
| backdrop | `blur(14px)` | `blur(14px)` |

### 4.4 Co robi wrażenie

Karta z chipem kategorii i stopką 2x2 (jedna karta niesie 4 warstwy informacji
bez ściany tekstu). Lewa kreska w pełnym kolorze jako kategoryzacja bez ikony.
**Siedem akcentów na jednej stronie**, każdy przypisany do znaczenia:
cyjan 149 wystąpień, zieleń `#39ff14` 81, pomarańcz `#ff6a00` 72, złoto
`#ffd700` 71, fiolet `#b026ff` 51, indygo `#8a2be2` 31, czerwień `#ff003c` 7.
Kolor jest tu KATEGORIĄ, nie dekoracją.

---

## 5. /freedom (11 sekcji, 11 417 znaków, najczystsza kompozycja)

### 5.1 Lista sekcji

Hero: `.spatial-badge` (pigułka 10px/800, ls 2px, uppercase, **ramka 1px
pełny `#00f0ff`**, tło `rgba(255,255,255,0.03)`, radius 100px, pad 6px 16px),
H1 `Project Freedom` **84px/900, letter-spacing -1,68px** (jedyna strona
z ujemnym trackingiem i interlinią 1,5), `<p>` lead.

| # | id | H2 | typ prezentacji | elementów | układ |
|---|---|---|---|---|---|
| 0 | - | brak | kafle metryk (`f-grid-3`) | 3 | grid 3x368px |
| 1 | sec-milestone | The OS Goes Online | **kicker + H2 + lead + siatka funkcji** | 4 | grid 3x368px, gap 24px |
| 2 | sec-metrics | System Overview | **kafle metryk** | 6 | grid 3x368px, gap 24px |
| 3 | sec-boot | 14-Step Boot Sequence | **kroki numerowane w kółkach** | 14 | grid 3x346px, gap 16px |
| 4 | sec-desktop | Desktop Environment | siatka funkcji z emoji | 8 | grid 3x368px, gap 24px |
| 5 | sec-arch | System Architecture | **stos warstw** | 8 | flex kolumnowy, gap 0 |
| 6 | sec-code | Kernel Code Samples | **okna kodu** | 4 | grid 3x368px, gap 24px |
| 7 | sec-inventory | Full Module Inventory | lista modułów (2 559 znaków) | - | - |
| 8 | sec-frontier | Systems Programming Research Frontier | karty SEO | 4 | grid 3x368px |
| 9 | sec-faq | Frequently Asked Questions | **akordeon** | 6 | flex, gap 12px |
| 10 | - | Built an OS From Scratch... Hire the Engineer. | CTA | 5 | flex, gap 20px |

### 5.2 Nagłówek sekcji (najlepszy wzorzec z całej piątki)

Trzy elementy w pionie, powtórzone identycznie w każdej sekcji:

1. **kicker** `<div class="spatial-badge">`: inline-flex, gap 8px, 10px/800,
   letter-spacing 2px, uppercase, **w kolorze sekcji** (`#39ff14` dla
   milestone, `#ff00e5` dla metryk, `#39ff14` dla bootu),
2. **H2**: 32px/900, kolor `#e4e4f0` (biały, BEZ gradientu),
3. **lead** `<p>`: 15px, `#94a3b8`, `max-width: 800-820px`.

Void i praxis robią to inaczej (emoji 28px nad H2, H2 z gradientem tekstu
`linear-gradient(135deg,#00f0ff,#8a2be2)`, podtytuł 10px pod spodem).
**Wariant freedom jest lepszy dla nas**: czysty tekst H2 = pewny kontrast,
kicker niesie kolor, lead ogranicza szerokość miary.

### 5.3 Anatomia kart

- **`.spatial-glass-card` metryka (368x174):** liczba `<div>` 38px/900 **mono**
  w akcencie / etykieta 11px/700 uppercase ls 1,1px `#5a6a8a` / przypis
  10px/600 w akcencie przy **50% alfa** (np. `pure Rust`, `zero crates`).
  Ten trzeci wiersz to chwyt, którego nie mamy: mikro-dopisek uwiarygodniający
  liczbę.
- **`.spatial-glass-card` funkcja (368x225):** [emoji 32px + `<h3>` 18px/800
  ls 0,5px **w kolorze karty**] + `<p>` 14px `#94a3b8`.
- **krok bootu (346x77):** [numer w **kółku**: ramka 2px
  `rgba(255,215,0,0.5)`, tło `rgba(255,215,0,0.125)`, `border-radius: 50%`,
  cyfra mono 13px/900 `#ffd700`] + [tytuł mono 14px/800 w kolorze + opis 12px
  `#94a3b8`]. Ramka kroku: 1px `rgba(255,215,0,0.125)`, tło `rgba(0,0,0,0.3)`,
  radius 12px, pad 16px.
- **`.spatial-code-block` (368x412):** pasek (tło `rgba(0,0,0,0.6)`, pad
  12px 18px) z 3 kropkami (`#ff003c`, `#ffd700`, `#39ff14`) + nazwa pliku
  mono 12px/600; `<pre><code>` mono 13px, pad 20px, składnia kolorowana
  (komentarz `#5a6a8a`, atrybut `#ff003c`, słowo kluczowe `#b026ff`).
- **`<details>` FAQ:** ramka 1px `rgba(57,255,20,0.145)`, tło `rgba(0,0,0,0.25)`,
  radius 12px, pad 14px 18px, `<summary>` 14px/700 `#39ff14`, `<p>` 13px
  `#94a3b8`.

### 5.4 Pomiar computed (`.spatial-glass-card`, kafel metryki)

| właściwość | wartość |
|---|---|
| border-top | **`2px solid rgba(0,240,255,0.5)`** |
| border pozostałe | `1px solid rgba(0,240,255,0.15)` |
| radius | 20px |
| tło | `rgba(18,10,31,0.6)` |
| padding | 32px 16px |
| box-shadow | brak |
| `::before` | `radial-gradient(circle at 100% 0%, akcent 0%, transparent 60%)`, opacity **0,05**, inset 0 |
| backdrop | `blur(24px)` |

**Asymetria ramki jest tu głównym chwytem:** górna krawędź 2px przy 50% alfy,
boki 1px przy 15%. To odpowiednik naszego wariantu `.inf-card-top`, tylko
mocniejszy (u nas linia górna zapala się dopiero na hover).
Wariant milestone tej samej klasy ma border 2px na WSZYSTKICH krawędziach
przy `rgba(57,255,20,0.19)`, czyli klasa przyjmuje modyfikatory.

### 5.5 Co robi wrażenie

Kicker w kolorze nad białym H2 (najczystszy rytm sekcji), przypis pod liczbą
metryki, numer w kółku przy kroku bootu, cztery okna kodu obok siebie
i jednolity gap 24px w całej stronie.

---

## 6. Punkt odniesienia: home wzorca

| # | sekcja | H2 | typ | elementów | układ |
|---|---|---|---|---|---|
| 0 | `.lp-hero` | H1 | hero + ticker + 5 metryk + 7 pigułek | - | flex |
| 1 | `.lp-promo` | brak | pasek promo | 3 | flex, gap 16px |
| 2 | `#learn` | Master Gemini, OpenAI, Azure & Claude | siatka akademii | 11 | grid **2x528px**, gap 16px |
| 3 | `#security-stack` | Infinity Security Stack | siatka kart primary | 5 | flex, gap 20px |
| 4 | `#free-tools` | Free Developer Tools | siatka kart primary | 10 | grid **3x344px**, gap 20px |
| 5 | `#open-source` | Open Source on GitHub | siatka kart primary | 7 | flex, gap 20px |
| 6 | `#flagship` | Researching the Future of AI & AGI | siatka kart primary | 4 | flex, gap 20px |
| 7 | `#faq` | Questions, Answered | akordeon | 10 | flex, gap 12px |

Home niesie 6 H2 i 37 H3 przy 11 296 znakach: jest **listą wejść**, nie
wykładem. Podstrony niosą 10 do 17 H2 i 16 do 38 H3 przy 11 do 26 tysiącach
znaków: to **wykłady**. Ten podział ról jest u nas identyczny i zostaje.

---

## 7. Mobile (390x800)

| strona | poziomy scroll | siatki po zwężeniu | elementów z blur | H1 |
|---|---|---|---|---|
| /praxis | nie | 2 kol. 161px, potem 3 kol. 130/98/40px | 36 | 56px |
| /axiom | nie | 1 kol. | 50 | - |
| /vitalis-v1333 | nie | 1 kol. | 74 | - |
| /void | nie | 1 kol. 350px / 2 kol. 152px | 56 | 40px |
| /freedom | nie | 1 kol. 342px (nawet 14 kroków bootu) | 44 | 48px |

Żadna strona nie ma poziomego scrolla. Wszystkie siatki 3-4 kolumnowe spadają
do 1 lub 2 kolumn. **Wzorzec zostawia `backdrop-filter` włączony na mobile
(36 do 74 elementów) - my tego NIE kopiujemy** (nasz zakaz blura na mobile
zostaje, to nasza świadoma przewaga wydajnościowa, nie brak).

---

## 8. SYNTEZA: katalog typów prezentacji

| # | typ | kiedy używać | z czego zbudowany (wzorzec) |
|---|---|---|---|
| 1 | **Pas metryk** | 3-6 twardych liczb tuż pod hero lub jako podsumowanie sekcji | karta 16-20px radius, liczba 38-42px/900 w akcencie, etykieta 11-12px/700 uppercase ls 1,1-1,2px szara, opcjonalny przypis 10px w akcencie 50% |
| 2 | **Karta-cecha z listą** | 4-11 równorzędnych możliwości, każda z 3-8 konkretami | ikona/emoji + H3 w akcencie, `<p>` 12px, `<ul>` z markerem `▸` w akcencie |
| 3 | **Karta-cecha z chipem i stopką** | gdy cecha ma kategorię i mierzalne parametry | chip kategorii mono 10px/800 (tło 7%, ramka 25%) + meta po prawej, H3 biały, `<p>`, separator 1px 6% + siatka 2x2 punktów |
| 4 | **Lista modułów / wierszy** | 10-20 pozycji tego samego typu (pliki, zależności, funkcje) | grid stałokolumnowy 3-4 pola: nazwa mono w kolorze / meta / opis / liczba |
| 5 | **Panel porównawczy** | my vs alternatywa, 10-20 kryteriów | grid 3 kolumny: kryterium / wartość „gorsza" w przygaszonej czerwieni / wartość „lepsza" w zieleni mono |
| 6 | **Oś pionowa** | sekwencja 8-20 kroków, gdzie liczy się kolejność i zależność | wiersz = kropka 50% + nazwa 14px/700 w kolorze + opis 12px + strzałka `↓` 15% alfa |
| 7 | **Oś pozioma / pipeline** | 5-7 etapów przepływu | węzeł = płytka ikony + nazwa mono; między węzłami strzałka `→` w kolorze etapu przy 31% alfa |
| 8 | **Kroki numerowane w kółkach** | procedura 5-14 kroków | numer mono 900 w kółku (ramka 2px 50%, tło 12,5%) + tytuł mono 14px/800 + opis 12px |
| 9 | **Okno kodu** | konfiguracja, przykład, fragment | pasek 3 kropek + nazwa pliku mono 11-12px, `<pre>` 12,5-13px, składnia kolorowana |
| 10 | **Kafel statusu** | roadmapa, etapy projektu | chip statusu (tło 9%, radius 8px) + nazwa mono 14px/700 w tym samym kolorze + zakres szary |
| 11 | **Karta klucz-wartość** | warianty produktu, presety, pakiety | lewa kreska 3px pełny kolor + nazwa mono/800 + badge stanu + 4 pary etykieta/wartość |
| 12 | **Akordeon `<details>`** | FAQ, 4-11 pytań | `<details>` ramka 1px 15-21% akcentu, tło ciemne, radius 10-12px, `<summary>` 13-14px/700 w akcencie |
| 13 | **Sekcja „research frontier"** | 4-5 kart, gdzie H3 to pełna fraza wyszukiwania | siatka 3 kolumn zwykłych kart-cech, cała wartość w treści H3 |
| 14 | **CTA zamykające** | koniec każdej podstrony | H2 jako zdanie z dowodem + czasownik („Zbudowałem X. Zatrudnij inżyniera.") + rząd 5 elementów |
| 15 | **Nagłówek sekcji** | przed każdą sekcją | kicker 10px/800 ls 2px uppercase W KOLORZE + H2 32px/900 biały + lead 15px szary `max-width: 800px` |

---

## 9. REKOMENDACJA MAPOWANIA na nasze typy stron

Legenda pokrycia: **[MAMY]** = istniejące klasy INFINITY i istniejący blok
silnika, **[BLOK]** = istniejące klasy, brakuje wariantu bloku w
`lib/blog/types.ts`, **[CSS]** = wymaga nowej reguły CSS.

### 9.1 Poradnik (`/poradniki/[slug]`, 4 sztuki)

| typ prezentacji | pokrycie | z czego |
|---|---|---|
| nagłówek sekcji z kickerem | **[MAMY]** | `.inf-overline` + `.inf-h2-line`; jedyna zmiana: kicker w kolorze tonu zamiast `--fg-muted` (jedna deklaracja, wymaga przeliczenia kontrastu) |
| pas metryk | **[MAMY]** | blok `kafle` -> `.inf-hero-stat` + `.inf-counter-value` |
| sekcja w karcie | **[MAMY]** | blok `sekcja` -> `.inf-card` + `.inf-card-top/edge/quiet` |
| tabela faktów | **[MAMY]** | blok `tabela` z `wKarcie` |
| kroki numerowane | **[MAMY]** | blok `kroki` -> `.inf-tile` + `.inf-card-edge` |
| akordeon FAQ | **[MAMY]** | `faq[]` w typie `Post` |
| przypis pod liczbą (chwyt freedom) | **[BLOK]** | dodać opcjonalne pole `zrodlo?` do `kafle` (renderowane jako 3. wiersz w `.inf-hero-stat`); zero nowego CSS |

**Werdykt:** poradniki są już blisko wzorca. Realne braki: kolor kickera,
przypis pod liczbą, oraz gęstość (mamy 9 896 znaków przy 14 H2, wzorzec 11 do
26 tys. przy 10 do 17 H2, więc długość jest OK, brakuje typów prezentacji).

### 9.2 Wpis bloga (`/blog/[slug]`)

Ten sam zestaw co poradnik, lżejszy: `sekcja`, `tabela`, `cytat`, `lista`,
FAQ, CTA. **Zero nowych bloków.** Braki do nadrobienia treściowo: 1 H3 na
cały wpis (wzorzec: 16-38). Rekomendacja: podnieść liczbę H3 przez blok
`sekcja` z podpunktami, nie przez nowy CSS.

### 9.3 Realizacja / case study (`/realizacje/[slug]`, ~8 sztuk)

| typ prezentacji | pokrycie | uwaga |
|---|---|---|
| pas metryk efektu | **[MAMY]** | blok `kafle`; **tylko liczby, które klient realnie zna** |
| oś czasu wdrożenia | **[BLOK]** | rozszerzyć `kroki` o `wariant?: 'os'`: `<ol>` + kropka `.inf-status-dot` + strzałka `↓`; zero nowego CSS |
| panel porównawczy przed/po | **[MAMY]** | **jako `tabela` z `wKarcie`**, nie jako grid divów: `<table>` to nasz mierzony próg botowy, więc semantyczna wersja jest LEPSZA od wzorca |
| chipy stacku | **[MAMY]** | `.inf-chip` z `--chip-c` |
| karta klucz-wartość (zakres prac) | **[MAMY]** | `.inf-card-stat` + `.inf-card-stat-label` + `.inf-card-stat-value` |
| CTA zamykające | **[MAMY]** | istniejące CTA usług |

### 9.4 Produkt (`/produkty`, ~4 sztuki)

| typ prezentacji | pokrycie | uwaga |
|---|---|---|
| karta-preset klucz-wartość | **[MAMY]** | `.inf-card-edge` daje lewą kreskę w kolorze; wewnątrz `.inf-card-stat*` |
| badge stanu w karcie | **[MAMY]** | `.inf-dd-badge` (mono 10px, ramka 40%, tło 10%, glow 45%) |
| tabela wariantów i cen | **[MAMY]** | blok `tabela`; ceny **wyłącznie locked**: 990 / 2500 / 1490 / 1990 / 99-599 / 3000-10000 / 350h |
| siatka funkcji z chipem | **[MAMY]** | `.inf-card` + `.inf-chip` w nagłówku karty |
| FAQ | **[BLOK]** | huby produktowe mają dziś **0 `<details>`**; to największy pojedynczy zysk botowy |

### 9.5 Materiał (`/materialy/[slug]`)

Karta z chipem kategorii **[MAMY]**, lista pozycji **[MAMY]**,
okno kodu **[CSS]** (patrz 9.7).

### 9.6 Huby (`/wiedza`, `/narzedzia`, `/produkty`, `/realizacje`)

| typ prezentacji | pokrycie | uwaga |
|---|---|---|
| siatka kart wejściowych | **[MAMY]** | tak jak home wzorca: hub = lista wejść, nie wykład |
| pas metryk rejestru | **[MAMY]** | blok `kafle` z liczbami **liczonymi z rejestru** (ile poradników, ile realizacji), zero zmyślania |
| kicker + H2 + lead przy każdej sekcji | **[MAMY]** | `.inf-overline` + `.inf-h2-line` |
| **FAQ hubu** | **[BLOK]** | 4 huby x 0 `<details>` dzisiaj. Wzorzec ma 6-11 na stronę. Dodanie 4-6 pytań na hub podnosi wszystkie mierzone progi naraz (znaki, `<details>`, FAQPage w JSON-LD) |
| linkowanie krzyżowe | **[MAMY]** | usługi <-> poradniki <-> narzędzia <-> realizacje |

### 9.7 Chwyty, które wymagałyby NOWEGO CSS (i werdykt)

| chwyt | nowy CSS | czy warto |
|---|---|---|
| **numer w kółku** (freedom, krok bootu) | 1 modyfikator `.inf-tile-round { border-radius: 50%; }` + ramka 2px w kolorze | **TAK, tanie.** Odróżnia „krok procedury" od „kafla" jednym deklaratywnym modyfikatorem |
| **kicker w kolorze sekcji** | zmiana `color` w wariancie `.inf-overline`, nie nowa klasa | **TAK**, pod warunkiem przeliczenia kontrastu >= 4,5 metodą pierścienia (nasz `--fg-muted` jest tam dziś celowo, bo `#5a6a8a` wzorca nie przechodzi AA) |
| **przypis pod liczbą** metryki | zero CSS (nowy `<span>` na istniejących tokenach) | **TAK** |
| **okno kodu z 3 kropkami** | pasek + kropki + `<pre>` = ~15 deklaracji | **WARUNKOWO**: tylko `/narzedzia` i materiały techniczne (dziś mamy tam 3 `<pre>`). Dla poradników i realizacji bezużyteczne |
| **pasek postępu w wierszu** (praxis) | tło + wypełnienie gradientem | **NIE.** Wymaga liczb, których nie mamy, a zmyślanie jest zakazane |
| **gradient tekstu w H2** | mamy `.inf-grad-text` | **NIE stosować w H2**: freedom (najczystsza strona) trzyma H2 białe, a gradient na tekście psuje kontrast |
| **ticker pod hero** | animacja + pętla | **NIE.** Nowa pętla JS jest zakazana, a wartość informacyjna zerowa |
| **potrójna łuna na hover** (axiom) | 3 warstwy `box-shadow` | **NIE.** Mamy już hover pełnej ramki v15 plus kątowniki v19; dokładanie trzeciej warstwy to ryzyko regresji CORE |
| **`backdrop-filter` na mobile** | - | **NIE.** Nasz zakaz blura na mobile zostaje |
| **filtrowany inwentarz JS** (void) | - | **NIE, ZAKAZ.** Kosztuje 9,8% treści u bota |

### 9.8 Chwyty, które mamy JUŻ TERAZ i wystarczy ich użyć częściej

1. **Kątowniki `::before`/`::after` 20px, opacity 0 -> 0,7-0,8 na hover** (v19)
   to dokładnie mechanizm axiom i void. Mamy 1:1.
2. **Wariant `.inf-card-top`** (linia górna w kolorze) = asymetryczna ramka
   freedom, tylko delikatniejsza.
3. **Wariant `.inf-card-edge`** (lewa krawędź) = lewa kreska 3px karty presetu
   void.
4. **`.inf-hero-stat` + `.inf-counter-value`** = kafel metryki wzorca
   (42px/900 w akcencie + etykieta uppercase).
5. **`.inf-chip`, `.inf-dd-badge`, `.inf-status` + `.inf-status-dot`** =
   chip kategorii, badge stanu i kropka statusu wzorca.
6. **`.inf-tile`** = płytka ikony/numeru we wszystkich osiach i krokach.
7. **`.inf-overline` + `.inf-overline-lines`** = kicker sekcji.
8. **`.inf-h2-line`** = kreska pod H2 (wzorzec robi to kickerem, my kreską;
   oba rozwiązania są równorzędne, nie zmieniamy).

Innymi słowy: **z 15 typów prezentacji katalogu 12 składamy z istniejących
klas INFINITY.** Brakuje wyłącznie wariantów w silniku treści
(`lib/blog/types.ts` + `PostBody.tsx`), nie w CSS.

---

## 10. Wnioski operacyjne dla v22

1. **Nie dokładamy CSS, dokładamy BLOKI.** Priorytet: `kroki` z `wariant: 'os'`,
   `kafle` z polem `zrodlo?`, oraz FAQ na hubach.
2. **Panele porównawcze robimy jako `<table>`**, nie jako grid divów. Wzorzec
   traci tu punkty botowe, my zyskujemy.
3. **Największy pojedynczy zysk: FAQ na 4 hubach** (dziś 0 `<details>` przy
   6-11 u wzorca), a zaraz po nim podniesienie liczby H3 na hubach i w blogu.
4. **Kolor to kategoria, nie dekoracja.** Void trzyma 7 akcentów, każdy
   przypisany do znaczenia. Nasz `INF_TYP` / `INF_KATEGORIA` już tak działa,
   trzeba tylko przepuścić ton przez kicker i chip karty.
5. **Rytm sekcji z freedom jest wzorcem do skopiowania**: kicker w kolorze,
   H2 białe 32px/900, lead 15px szary `max-width: 800px`, gap 24px.
6. **Czego NIE ruszamy:** hover pełnej ramki v15, kątowniki v19, paleta v18,
   tło `#05050C`, typografia v19, hero usług v12, home i CORE.

---

**Status weryfikacji:** wszystkie liczby w tym raporcie pochodzą z żywych
pomiarów wykonanych 2026-08-18 (sondy `w22-a` do `w22-e4`). Zero wartości
przepisanych z pamięci lub z wcześniejszych raportów.
**NIEZWERYFIKOWANE:** nic. Pomiary `/vitalis-v1333` sekcji `#sec-comparison`
i `/freedom` `#sec-inventory` zwróciły `BRAK` przy selektorze indeksowym
(struktura bez stabilnych klas), więc ich anatomię opisano z mapy sekcji
i liczby elementów, bez computed pojedynczej karty.
