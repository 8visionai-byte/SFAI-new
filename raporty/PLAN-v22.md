# PLAN TECHNICZNY v22: podstrony w języku wzorca

Architekt: sesja 2026-08-18. Wejścia: `raporty/pomiary-v22-wzorzec.md`,
`raporty/pomiary-v22-nasze.md`, `raporty/pomiary-v22-linki.md`, `spec-v22.md`.
Ten plik jest SPECYFIKACJĄ WYKONANIA dla agentów partii. Nic tu nie jest
zaimplementowane, zero commitów, zero zmian w kodzie poza tym plikiem.

---

## 0. USTALENIA, KTÓRE ZMIENIAJĄ PLAN WOBEC RAPORTÓW

Przeczytałem realny kod silnika, nie tylko streszczenia. Cztery rzeczy trzeba
sprostować, bo inaczej partie zbudowałyby nie to, co trzeba:

1. **`components/materialy/MaterialBody.tsx` to FORK `PostBody`, nie jego
   konsument.** Ma własną kopię renderu (217 linii) i celowo degraduje bloki
   `sekcja`, `kafle`, `kroki` do gołego `<section>` / `<ul>` / `<ol>` bez kart
   (komentarz w pliku, linie 162-208). Dlatego 6 materiałów ma po 1 karcie mimo
   że silnik v21 ma już wszystko. Wniosek: dźwignia `PostBody` to dziś **9
   podstron** (5 blog + 4 poradniki), a nie 15. Naprawa: `MaterialBody` ma stać
   się cienkim opakowaniem `PostBody` z `ton={INF_TYP.material}`. Jednym ruchem
   6 stron materiałów dostaje cały język v21.

2. **`/blog/[slug]` woła `<PostBody tresc={post.tresc} />` BEZ propa `ton`**
   (`app/blog/[slug]/page.tsx:85`). Nawet po wypełnieniu rejestru blokami
   `sekcja` wszystkie karty świeciłyby fallbackowym cyjanem zamiast fioletu
   typu `wpis`. Poprawka jednolinijkowa: `ton={INF_TYP.wpis}`.

3. **`Post.tagi` NIE jest polem martwym.** `components/blog/PostCard.tsx:87`
   renderuje je przez `KartaTagi` + `tagiPosta`. Martwe jest co innego: tagi
   nie pojawiają się na SAMEJ stronie wpisu ani poradnika (`PostHero.tsx`,
   `PoradnikHero.tsx` pokazują tylko kategorię). To korekta zakresu: nie
   budujemy mechanizmu tagów, tylko wypuszczamy istniejący na hero podstrony.

4. **`.inf-stat-chip-zrodlo` już istnieje w `app/globals.css:3152`** i robi
   dokładnie chwyt freedom „przypis pod liczbą" (10px, `color-mix(--fg-muted
   70%, --fg)`, kontrast ok. 7:1, czyli LEPIEJ niż wzorcowe 50% alfy). Problem
   jest wyłącznie w selektorze: reguła jest dwuklasowa
   (`.inf-stat-chip .inf-stat-chip-zrodlo`), więc nie działa wewnątrz
   `.inf-hero-stat`. Rozszerzenie listy selektorów = zero nowych deklaracji.

Dodatkowo: **`Produkt` i `Narzedzie` nie mają `metaTitle`, `metaDescription`
ani `tresc: Blok[]`**. Trasy `/produkty/[slug]` i `/narzedzia/[slug]` są w v22
POZA ZAKRESEM, bo ich postawienie wymagałoby napisania od zera treści i meta,
czyli dokładnie tego, czego zakazuje spec. Zysk bierzemy na hubie.

---

## 1. NOWE BLOKI I KOMPONENTY (rozbudowa silnika v21)

Zasada z pomiarów wzorca §10: **nie dokładamy CSS, dokładamy BLOKI.** Z 15
typów prezentacji katalogu 12 składamy z istniejących klas INFINITY. Poniżej
komplet, każdy z kontraktem, klasami i chwytem wzorca, który odtwarza.

### 1.1. `kafle` z przypisem (rozszerzenie istniejącego bloku)

**Kontrakt** (`lib/blog/types.ts`, wariant `kafle`):

```ts
| {
    typ: 'kafle';
    kafle: {
      wartosc: string;
      opis: string;
      /** v22: mikro-przypis pod liczbą (skąd ta liczba). Chwyt /freedom.
          MUSI odsyłać do faktu, który już stoi w treści tej strony albo
          w rejestrze. Zero nowych danych. */
      zrodlo?: string;
    }[];
  }
```

**Klasy:** `.inf-hero-stat` (pudełko) + `.inf-counter-value` (liczba) +
`.inf-counter-label` (etykieta) + `.inf-stat-chip-zrodlo` (przypis).
**Chwyt wzorca:** `/freedom` §5.3, `.spatial-glass-card` metryka, trzeci wiersz
10px/600 w akcencie przy 50% alfy.
**Nowy CSS:** rozszerzenie listy selektorów istniejącej reguły, zero nowych
deklaracji (patrz §1.9 pkt B).
**Gdzie użyty:** poradniki, blog, materiały, pasek metryk hubów, `RealizacjaEfekt`.

### 1.2. `kroki` z wariantem prezentacji (rozszerzenie)

**Kontrakt:**

```ts
| {
    typ: 'kroki';
    /** 'plytka' = kwadratowa płytka numeru (stan v21, DOMYŚLNY: zero regresji
        na 4 poradnikach). 'kolo' = numer w kółku (chwyt /freedom, krok bootu).
        'os' = oś pionowa: kropka statusu + strzałka w dół (chwyt /axiom
        sec-arch i /vitalis sec-pipeline). */
    wariant?: 'plytka' | 'kolo' | 'os';
    kroki: {
      tytul: string;
      opis?: string;
      /** v22: krótka meta po prawej (czas, etap, plik). Chwyt /void: meta
          mono przy chipie kategorii. Wyłącznie dane z rejestru. */
      meta?: string;
    }[];
  }
```

**Klasy:**
- `plytka`: `.inf-card .inf-card-edge` + `.inf-tile` (bez zmian, jak v21),
- `kolo`: to samo + `.inf-tile.inf-tile-round`,
- `os`: `<ol>` z `.inf-status` + `.inf-status-dot` (kropka 5px, pełny kolor,
  glow 6/12px, puls 2s, wszystko już w globals) + tytuł `text-ui font-extrabold`
  + opis `text-body-sm` + strzałka `↓` jako `aria-hidden` span w `text-fg-subtle`.
  `meta` renderowana jako `.inf-tag` po prawej stronie wiersza.

**Semantyka bez zmian:** dalej `<ol><li>`, więc bot czyta kolejność identycznie.
**Chwyt wzorca:** freedom §5.3 (numer w kółku, ramka 2px, radius 50%),
axiom §2.2 (oś pionowa: kropka 50% + nazwa w kolorze + opis + strzałka ↓ przy
15% alfy, linia łącząca UDAWANA strzałką, nie pseudoelementem, czyli tanio).
**Nowy CSS:** jedna deklaracja (§1.9 pkt A).
**Gdzie użyty:** poradniki („jak przebiega wdrożenie"), blog, materiały
(checklisty), sekcja procesu na hubach.

### 1.3. `sekcja` z chipem, metą i stopką (rozszerzenie)

**Kontrakt:**

```ts
| {
    typ: 'sekcja';
    naglowek: string;
    akapity: string[];
    punkty?: string[];
    wariant?: 'top' | 'edge' | 'quiet';
    /** v22: chip kategorii nad nagłówkiem (mono, w kolorze karty). Chwyt
        /void: „kolor niesie chip, H3 zostaje biały". Treść: istniejąca
        kategoria/tag/etykieta z rejestru, nigdy nowy termin. */
    chip?: string;
    /** v22: meta po prawej stronie chipa (np. „aktualizacja 2026-08"). */
    meta?: string;
    /** v22: stopka karty: separator 1px + siatka 2 kolumn krótkich punktów.
        Chwyt /void: jedna karta niesie 4 warstwy informacji bez ściany tekstu. */
    stopka?: string[];
  }
```

**Klasy:** `.inf-card` + wariant (`.inf-card-top` / `.inf-card-edge` /
`.inf-card-quiet`) + `.inf-spotlight` + `.inf-chip` ze `style={{'--chip-c':
'var(--card-c)'}}` + `.inf-tag` dla `meta` + `border-t border-border` dla
separatora stopki + `<ul className="grid gap-2 sm:grid-cols-2">` z markerem
`marker:text-[color:var(--card-c,var(--accent))]`.
**Chwyt wzorca:** `/void` §4.2, `.vd-neon-card` funkcja, nazwana w raporcie
„najbogatszą kartą wzorca": chip + meta / H biały / `<p>` / separator + siatka 2x2.
**Nowy CSS:** ZERO.
**Gdzie użyty:** wszystkie 15 podstron treściowych (blog, poradniki, materiały).
**Uwaga botowa:** `stopka` to `<li>`, czyli rośnie licznik `li`, a `chip` i
`meta` to realny tekst w HTML. To jest zysk, nie dekoracja.

### 1.4. `tabela` z podpisem (rozszerzenie)

**Kontrakt:** dochodzi `podpis?: string`.
**Render:** widoczny `<caption className="inf-overline pb-3 text-left">`
wewnątrz `<table>`. Gdy `podpis` istnieje, staje się `aria-label` regionu
zamiast dzisiejszego stringa sklejanego z nagłówków kolumn.
**Klasy:** `.inf-overline` (istnieje), reszta bez zmian.
**Chwyt wzorca:** `/vitalis` §3.3, cztery prawdziwe `<table>` z nazwanymi
sekcjami. My idziemy dalej: wzorzec ma panele porównawcze jako grid divów i
traci na tym punkty botowe, my zostajemy przy `<table>` i zyskujemy.
**Nowy CSS:** ZERO.
**Decyzja odrzucająca:** semantyka kolorów w panelu porównawczym (czerwień
konkurencji / zieleń nasza z `/axiom` §2.2) NIE wchodzi. Wymaga nowego CSS,
daje zero dla botów, a przy naszej palecie grozi spadkiem kontrastu.

### 1.5. `LinkKrzyzowy` jako typ współdzielony + grupa „realizacje"

**Zmiana:** definicja `LinkKrzyzowy` przenosi się do `lib/blog/types.ts`
(korzeń grafu importów: `lib/poradniki` już importuje z `lib/blog`).
`lib/poradniki/types.ts` re-eksportuje ją pod tą samą nazwą, więc **żaden
istniejący import nie pęka**.

**`components/poradniki/LinkiKrzyzowe.tsx` dostaje czwartą grupę:**

```ts
export function LinkiKrzyzowe({
  uslugi = [], narzedzia = [], poradniki = [], realizacje = [],
}: { ...; realizacje?: LinkKrzyzowy[] })
```

Nagłówek grupy: `<h3>Zobacz to na wdrożeniu</h3>`, cta kafla: „Zobacz wdrożenie".
`dekorLinku()` dostaje gałąź dla `^/realizacje/<slug>`: kolor bierze z
`INF_KATEGORIA[getRealizacjaBySlug(slug).kategoria]`, czyli ten sam ton, co
karta case'a na `/realizacje` (naczynia połączone).
**Klasy:** bez zmian (`.inf-card .inf-card-full-hover` + `.inf-arrow` + `.inf-spotlight`).
**Zysk botowy:** każdy nowy konsument tego komponentu dostaje 2-4 `<h3>` i
4-8 linków wewnętrznych w `<main>`.

### 1.6. Pola powiązań w rejestrach (dane, nie silnik)

| Typ | Nowe pola | Uzasadnienie z pomiarów |
|---|---|---|
| `Post` (lib/blog) | `powiazaneUslugi?`, `powiazaneNarzedzia?`, `powiazanePoradniki?`, `powiazaneRealizacje?` | 5 ślepych zaułków, 0 linków wychodzących z treści (linki §1.2) |
| `Poradnik` | `powiazaneRealizacje?` | poradnik -> realizacja 0/4 (linki §3.2); poradnik o agencie ma pozycję 8,0 i zerowy CTR |
| `Material` | `powiazaneUslugi?`, `powiazanePoradniki?` | materiał -> usługa 0/6 |
| `Realizacja` | `powiazane?: { poradniki?: LinkKrzyzowy[]; realizacje?: LinkKrzyzowy[]; narzedzia?: LinkKrzyzowy[] }` | realizacja -> poradnik 0/8, realizacja -> realizacja 0/8 |

Wszystkie opcjonalne, wszystkie typu `LinkKrzyzowy`, wszystkie zasilają
istniejący `LinkiKrzyzowe`. Zero nowego silnika linkowania.

### 1.7. NOWE KOMPONENTY (4 pliki)

**a) `components/sections/PasekMetryk.tsx`**
```ts
export function PasekMetryk({ kafle }: {
  kafle: { wartosc: string; opis: string; zrodlo?: string }[];
}): JSX.Element
```
Render 1:1 z blokiem `kafle` z `PostBody` (`<ul>` + `.inf-hero-stat`).
**ŻELAZNA REGUŁA DANYCH:** `wartosc` na hubie MUSI być policzona przy buildzie
z rejestru (`PORADNIKI.length`, `REALIZACJE.length`, `MATERIALY.length`,
`NARZEDZIA.length`), nigdy wpisana ręcznie. Liczba wpisana z palca to zmyślona
liczba w rozumieniu spec.
**Chwyt wzorca:** pas metryk pod hero, obecny na WSZYSTKICH pięciu podstronach
wzorca (praxis 5, axiom 3, void 3, freedom 3+6).
**Gdzie:** 6 hubów treści + `/uslugi`.

**b) `components/sections/HubFAQ.tsx`**
```ts
export function HubFAQ({ pytania, tytul = 'Najczęstsze pytania', ton }: {
  pytania: { pytanie: string; odpowiedz: string }[];
  tytul?: string;
  ton?: InfDekor;
}): JSX.Element
```
Struktura 1:1 z `PostFAQ` (`.inf-card .inf-card-top` + `.inf-spotlight` +
`divide-y` + natywne `<details class="sf-faq">`). Zero JS, odpowiedzi w HTML
od startu.
**Chwyt wzorca:** akordeon `<details>` na KAŻDEJ z pięciu podstron wzorca
(4 do 11 sztuk). To jest największy pojedynczy zysk botowy tej rundy: 6 hubów
x 0 `<details>` dzisiaj.
**Gdzie:** 6 hubów treści + `/uslugi` + `/kontakt`.
**Powiązanie:** ten sam obiekt `pytania` idzie do `faqSchema()` na stronie, więc
rozjazd treść/schema jest niemożliwy (wzorzec z `PostFAQ`).

**c) `components/realizacje/KartaWdrozenia.tsx`**
```ts
export function KartaWdrozenia({ realizacja }: { realizacja: Realizacja }): JSX.Element
```
Prawdziwa `<table>` w `.inf-card .inf-card-top`, `<caption>` „Karta wdrożenia".
Wiersze WYŁĄCZNIE z istniejących pól: Klient (`klient`), Branża (`branza`),
Obszar (`KATEGORIA_LABEL[kategoria]`), po jednym wierszu na `efekt.metryki[i]`
(etykieta -> wartość). **Ani jednego nowego stringa treści.**
**Chwyt wzorca:** `/vitalis` cztery `<table>` i `/void` karta presetu
klucz-wartość (§4.2).
**Zysk:** 8 realizacji dostaje pierwszą `<table>` w historii (dziś 0/8).

**d) `components/sections/TabelaRejestru.tsx`**
```ts
export function TabelaRejestru({ podpis, naglowki, wiersze }: {
  podpis: string; naglowki: string[]; wiersze: string[][];
}): JSX.Element
```
Ten sam render tabeli co `PostBody` (scope, `min-w` z liczby kolumn, scroll w
opakowaniu, `tabIndex`, `role="region"`), wystawiony do użycia POZA `PostBody`.
**Kontrakt danych:** `wiersze` budowane wyłącznie mapowaniem rejestru, nigdy
literałami w JSX.
**Gdzie:** 6 hubów (tabela orientacyjna, patrz §2.6).

**Uwaga o duplikacji:** zamiast trzeciej kopii renderu tabeli, `PostBody` i
`TabelaRejestru` mają dzielić jeden wewnętrzny `TabelaRender` (nowy plik
`components/blog/TabelaRender.tsx`). `MaterialBody` przestaje mieć własną kopię
(patrz §1.8). Efekt: jeden render tabeli w całym serwisie zamiast trzech.

### 1.8. `MaterialBody` przestaje być forkiem

```tsx
// components/materialy/MaterialBody.tsx (docelowo ~10 linii)
import { PostBody } from '@/components/blog';
import { INF_TYP } from '@/lib/inf-kategorie';
export function MaterialBody({ tresc }: { tresc: Blok[] }) {
  return <PostBody tresc={tresc} ton={INF_TYP.material} />;
}
```
Sygnatura publiczna bez zmian, więc `app/materialy/[slug]/page.tsx:155` zostaje
nietknięty. Znika 200 linii zdublowanego kodu i znika przyczyna „11 306 znaków
na jedną kartę".

### 1.9. NOWY CSS: dokładnie dwie zmiany plus jedna warunkowa

**A. `.inf-tile.inf-tile-round`** (jedna deklaracja)
```css
/* v22: numer kroku w KÓŁKU (chwyt /freedom §5.3, krok bootu: border-radius
   50%). Nasz .inf-tile ma 40x40, radius 12px, obwódkę 42% i glow 12px/20%,
   czyli MOCNIEJ niż zmierzone u wzorca (ramka 2px 50%, tło 12,5%). Zmieniamy
   więc wyłącznie geometrię: jedna deklaracja, zero ruchu w kolorze i świetle. */
.inf-tile.inf-tile-round { border-radius: 50%; }
```
Selektor dwuklasowy (0,2,0), żeby wygrał z `.inf-tile` niezależnie od kolejności.

**B. Rozszerzenie selektora przypisu** (ZERO nowych deklaracji)
```css
/* było */ .inf-stat-chip .inf-stat-chip-zrodlo { ... }
/* ma być */
.inf-stat-chip .inf-stat-chip-zrodlo,
.inf-hero-stat .inf-stat-chip-zrodlo { ... }
```
Kontrast policzony i udokumentowany w miejscu reguły (ok. 7:1) obowiązuje dalej,
bo tło `.inf-hero-stat` (`rgba(8,15,25,.45)`) jest CIEMNIEJSZE od tintowanego tła
`.inf-stat-chip`, więc kontrast tylko rośnie. Wymóg kontroli: pomiar pierścieniem
na żywej stronie, nie rachunek z hexa.

**C. WARUNKOWO: kicker w tonie sekcji** (`.inf-overline-ton`)
```css
.inf-overline-ton { color: var(--card-c, var(--fg-muted)); }
```
Chwyt `/freedom` §5.2 („kicker w kolorze nad białym H2, najczystszy rytm
sekcji"). **BRAMKA POMIAROWA:** wchodzi tylko wtedy, gdy sonda pierścieniowa na
żywej stronie da >= 4,5:1 dla KAŻDEGO tonu użytego jako `--card-c`
(cyjan `#00f0ff`, fiolet `#e438ff`, zieleń `#39ff14`, bursztyn `#ffa101`,
magenta `#ff00e5`, blue `#70b0ff`). Ryzyko siedzi w fiolecie: zmierzony
pierścień v18 to 4,92, czyli zapas 0,42. Jeżeli którykolwiek ton spadnie poniżej
progu, **cała zmiana C wypada z rundy**, a kicker zostaje na `--fg-muted`.
Wzorcowe `#5a6a8a` nie przechodzi AA i nie jest dla nas wzorem.

**ODRZUCONE ŚWIADOMIE** (z uzasadnieniem z pomiarów):
pasek postępu w wierszu (praxis) wymagałby liczb, których nie mamy;
gradient tekstu w H2 psuje kontrast, a freedom trzyma H2 białe;
ticker pod hero to nowa pętla JS (zakaz);
potrójna łuna hover z axiom to ryzyko regresji CORE przy istniejącym hoverze v15;
`backdrop-filter` na mobile (nasz zakaz zostaje);
filtrowany inwentarz JS z `/void` (kosztuje 9,8% treści u bota);
okno kodu z trzema kropkami (ok. 15 deklaracji dla 3 `<pre>` na `/narzedzia`,
przenosimy do v23).

---

## 2. MAPOWANIE STRON: co, w jakiej kolejności, z czego

Legenda danych: **[SĄ]** dane w rejestrze, **[NOWE-LINK]** nowe pole powiązań
(etykieta linku, nie fakt), **[NOWE-TRESC]** wymaga napisania treści przez
człowieka lub agenta treści, **[LICZONE]** liczone z rejestru przy buildzie.

### 2.1. Poradnik `/poradniki/[slug]` (4 sztuki, stan wyjściowy najlepszy)

| # | Sekcja | Bloki i komponenty | Dane |
|---|---|---|---|
| 1 | Hero | `PoradnikHero` + NOWY rząd tagów `.inf-tag` pod lead | `poradnik.tagi` **[SĄ]** |
| 2 | Pas metryk | blok `kafle` z `zrodlo` | liczby już stojące w treści **[SĄ]**, `zrodlo` wskazuje sekcję poradnika **[NOWE-TRESC, krótkie]** |
| 3 | Treść | `sekcja` (z `chip`/`stopka`), `tabela` (z `podpis`), `kroki` (`kolo` dla procedur, `os` dla przebiegu wdrożenia), `lista`, `cytat` | `tresc[]` **[SĄ]**, restrukturyzacja bez zmiany zdań |
| 4 | FAQ | `PostFAQ typ="poradnik"` | **[SĄ]** |
| 5 | Linki krzyżowe | `LinkiKrzyzowe` z 4 grupami | usługi/narzędzia/poradniki **[SĄ]**, realizacje **[NOWE-LINK]** |
| 6 | CTA | `PoradnikCTA` | **[SĄ]** |

Cel: poradnik `ile-kosztuje-automatyzacja` schodzi z 1 162 do <= 700 znaków na
kartę (wzorzec wewnętrzny: poradnik o chatbocie ma 487).

### 2.2. Wpis bloga `/blog/[slug]` (5 sztuk, stan wyjściowy zły)

| # | Sekcja | Bloki i komponenty | Dane |
|---|---|---|---|
| 1 | Hero | `PostHero` + NOWY rząd tagów | `post.tagi` **[SĄ]** |
| 2 | Treść | `PostBody ton={INF_TYP.wpis}`: cały ciąg `naglowek`+`akapit` przepisany na `sekcja`; min. 1 `tabela` z `podpis`; `kafle` TYLKO gdy liczby już są w tekście; `kroki` gdzie tekst opisuje procedurę | `tresc[]` **[SĄ]**, przepisanie strukturalne, ZERO nowych zdań |
| 3 | FAQ | `PostFAQ typ="wpis"` | **[SĄ]** (3-4 pozycje) |
| 4 | Linki krzyżowe | `LinkiKrzyzowe` (1 usługa, 1 narzędzie, 1 poradnik, 1 realizacja) | **[NOWE-LINK]** |
| 5 | CTA | **DECYZJA PAWŁA** | `PoradnikCTA` ma nagłówek „Policzyłeś. Teraz zobaczmy to na Twoich danych.", czyli kontekst kalkulatora. Dla bloga to rozjazd. Bez zgody na nowy nagłówek CTA pomijamy, sekcja 4 zamyka stronę. |

Cel: z 1 karty (dziś FAQ na dole) na >= 6 kart; z 0 H3 na >= 3 (nagłówki grup
`LinkiKrzyzowe`); z 2 linków wewnętrznych na >= 6.

### 2.3. Materiał `/materialy/[slug]` (6 sztuk, najgorsze ściany tekstu)

| # | Sekcja | Bloki i komponenty | Dane |
|---|---|---|---|
| 1 | Hero | bez zmian | **[SĄ]** |
| 2 | Po co to pobierać | NOWA karta `.inf-card .inf-card-quiet` z `material.zacheta` | **[SĄ]** (dziś renderowane tylko na karcie huba) |
| 3 | Treść | `MaterialBody` -> `PostBody ton={INF_TYP.material}`; rejestry dostają `sekcja` / `tabela` / `kroki` / `kafle` | `tresc[]` **[SĄ]**, przepisanie strukturalne |
| 4 | Pobranie | `PobierzMagnet` | **[SĄ]** |
| 5 | FAQ | `MaterialFAQ` | **[SĄ]** |
| 6 | Linki krzyżowe | `LinkiKrzyzowe` (1 usługa + 1 poradnik) | **[NOWE-LINK]** |
| 7 | CTA | bez zmian | **[SĄ]** |

Priorytet w partii: `50-promptow` (11 306 znaków na kartę),
`checklista-20-procesow` (7 268), `10-bledow` (6 879).
`50-promptow` ma 58 `<li>` i 0 tabel: 50 promptów to naturalna `tabela`
(kolumny „Zadanie" / „Prompt") albo seria `sekcja` po 10, bez zmiany ani jednego
promptu.

### 2.4. Realizacja `/realizacje/[slug]` (8 sztuk, 0 tabel, 0 H3)

| # | Sekcja | Bloki i komponenty | Dane |
|---|---|---|---|
| 1 | Hero | `RealizacjaHero` + NOWY rząd tagów przez istniejący `tagiRealizacji()` | `branza` + `queries` **[SĄ]** |
| 2 | Kontekst | `RealizacjaNarrative` opakowany w `.inf-card .inf-card-top` + `.inf-spotlight` | **[SĄ]** |
| 3 | Rozwiązanie | jak wyżej, wariant `.inf-card-edge` | **[SĄ]** |
| 4 | Karta wdrożenia | NOWY `KartaWdrozenia` (prawdziwa `<table>` + `<caption>`) | `klient`, `branza`, `kategoria`, `efekt.metryki` **[SĄ]** |
| 5 | Efekt | `RealizacjaEfekt`, metryki przechodzą na `.inf-hero-stat` (spójność z blokiem `kafle`) | **[SĄ]** |
| 6 | FAQ | `RealizacjaFAQ` | **[SĄ]** |
| 7 | Linki krzyżowe | `LinkiKrzyzowe`: 1 usługa (z `kategoria`, **[SĄ]**), 1 poradnik, 2 siostrzane realizacje, 1 narzędzie | **[NOWE-LINK]** |
| 8 | CTA | `RealizacjaCTA` | **[SĄ]** |

Gdzie brak danych: realizacje NIE mają `tresc: Blok[]` i nie dostają go w v22
(to byłoby pisanie case'ów od nowa). Osi czasu wdrożenia **NIE robimy**, bo
rejestr nie ma dat etapów, a zmyślanie jest zakazane. Oś (`kroki` wariant `os`)
zostaje do dyspozycji poradników i materiałów.

### 2.5. Produkt

**Trasa `/produkty/[slug]` NIE POWSTAJE w v22.** Uzasadnienie: `lib/produkty`
nie ma `metaTitle`, `metaDescription` ani `tresc`, więc 4 nowe strony
wymagałyby napisania kompletu treści i meta. To decyzja zakresowa dla Pawła,
nie brak techniczny. Cały zysk bierzemy na hubie (§2.6).

### 2.6. Huby: `/wiedza`, `/poradniki`, `/blog`, `/materialy`, `/realizacje`, `/produkty`

Wspólny szkielet PO zmianie (kolejność wiążąca, rytm z `/freedom` §5.2:
kicker w kolorze, H2 32/900 białe, lead 15px `max-width` ok. 800px, gap 24px):

| # | Sekcja | Z czego | Dane |
|---|---|---|---|
| 1 | Hero: `.inf-overline` + H1 + lead | bez zmian | **[SĄ]** |
| 2 | **Pas metryk** | NOWY `PasekMetryk` | **[LICZONE]** z rejestru |
| 3 | Siatka kart wejściowych | bez zmian (`KartaCzesci` NIETYKALNE) | **[SĄ]** |
| 4 | **Tabela orientacyjna** | NOWY `TabelaRejestru` | **[LICZONE]** mapowaniem rejestru |
| 5 | **FAQ hubu** | NOWY `HubFAQ` (4-6 pytań) | **[NOWE-TRESC]** wg reguły niżej |
| 6 | Linki redakcyjne | akapit z linkami zamykający sieroty (§3) | **[NOWE-LINK]** |
| 7 | CTA | bez zmian | **[SĄ]** |
| 8 | JSON-LD | + `ItemList` + `FAQPage` | **[LICZONE]** + z pkt 5 |
| 9 | Usunięcie ręcznego `<link rel="canonical">` | patrz linki §4.1 | - |

**Źródła kolumn tabeli orientacyjnej (wszystkie z istniejących pól):**

| Hub | Kolumny | Pola |
|---|---|---|
| `/wiedza` | Dział / Co znajdziesz / Ile pozycji | `INF_WIEDZA` + długości rejestrów |
| `/poradniki` | Poradnik / Kategoria / Ostatnia aktualizacja | `tytul`, `kategoria`, `dataAktualizacji` |
| `/blog` | Wpis / Kategoria / Data | `tytul`, `kategoria`, `data` |
| `/materialy` | Materiał / Typ pliku / Etykieta | `tytul`, `typPliku`, `etykieta` |
| `/realizacje` | Wdrożenie / Obszar / Główny efekt | `h1`, `KATEGORIA_LABEL`, `efekt.metryki[0].wartosc` |
| `/produkty` | Produkt / Dla kogo / Co daje / Dojrzałość | `coRobi`, `dlaKogo`, `coDaje`, `dojrzalosc` |

Tabela NIE powiela kart: pokazuje pola, których karty nie pokazują
(data aktualizacji, typ pliku, dojrzałość, metryka). To dokłada informację, nie
duplikat.

**REGUŁA TREŚCI FAQ HUBU (wiążąca, chroni przed zmyślaniem).** Każda odpowiedź
musi dać się wyprowadzić z jednego z czterech źródeł: (a) liczba policzona z
rejestru, (b) cena z listy locked (990 / 2500 / 1490 / 1990 / 99-599 /
3000-10000 / 350h), (c) zdanie już stojące na istniejącej stronie usługi lub
poradnika, (d) zasada operacyjna zapisana w `lib/site.ts`. Odpowiedź, której nie
da się podpiąć pod (a)-(d), **nie wchodzi**. Przykłady zgodne:
- `/realizacje`: „Ile wdrożeń tu pokazujecie?" -> liczba z `REALIZACJE.length` (a).
- `/realizacje`: „Czemu nie ma nazw wszystkich klientów?" -> polityka z pola
  `klient` i komentarza w `lib/realizacje/types.ts` (d).
- `/produkty`: „Ile kosztuje wdrożenie takiego produktu?" -> widełki locked (b).
- `/materialy`: „Muszę zostawić maila, żeby to przeczytać?" -> pełna treść jest
  na stronie, PDF to bonus, zapisane w `lib/materialy/types.ts` (d).
- `/wiedza`: „Czym różni się poradnik od wpisu na blogu?" -> komentarz kontraktu
  `lib/poradniki/types.ts` (d).

**Dwa huby poza wspólnym szkieletem:**
- `/ai-radar` (786 znaków, 0 kart): oba wpisy mają `szablon: true`. **Nie
  ubieramy pustej strony.** Jedyna zmiana w v22: hub przestaje linkować do
  dwóch stron `noindex` (linki §5, P3 pkt 20). Wypełnienie rejestru to decyzja
  redakcyjna Pawła, poza tą rundą.
- `/narzedzia` (18 397 znaków, jedyny hub z tabelą i `<details>`): dostaje
  wyłącznie `HubFAQ` do 4 pytań, `PasekMetryk` i naprawę martwego linku.
  Kalkulatorów nie ruszamy.

---

## 3. LINKOWANIE: konkretna lista

Kolejność z GSC (`.seo-przeglad/raporty/2026-08-17d.md`). Kolumna „miejsce"
mówi, w której sekcji układu z §2 link ma stanąć.

### P0: naprawy (blokują odbiór)

| # | Strona | Cel | Miejsce | Plik |
|---|---|---|---|---|
| 1 | `/narzedzia` | `/materialy/jak-pisac-prompty-ktore-dzialaja` (dziś 404 z sufiksem `-mini-poradnik`) | wynik generatora | `components/narzedzia/GeneratorPromptow.tsx:197` |
| 2 | 16 tras | usunięcie ręcznego `<link rel="canonical">` (zostaje ten z `buildMetadata`) | `<head>` | `app/uslugi/page.tsx:282`, `app/uslugi/architekci-wartosci-ai/page.tsx:669`, `app/narzedzia/page.tsx:316`, `app/produkty/page.tsx:233`, `app/wiedza/page.tsx:396`, `app/poradniki/page.tsx:102`, `app/materialy/page.tsx:164`, `app/realizacje/page.tsx:104`, `app/realizacje/[slug]/page.tsx:126` |
| 3 | `lib/site.ts:290` | `LEGAL_ROUTES.infoDuty` wskazuje na 404 | - | usunąć pole albo postawić stronę (decyzja Pawła; domyślnie usunąć, bo nigdzie nie jest użyte) |

### P1: najwyższy zwrot wg GSC

| # | Strona | Cel | Miejsce | Pole |
|---|---|---|---|---|
| 4 | 3 podstrony voicebotów | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` + `/narzedzia#kalkulator-oszczednosci` | rama ceny + sekcja linków | `ramaCeny.linkPoradnik` (istnieje, pusty) |
| 5 | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` | `/realizacje/agenci-ai-24-7`, `/realizacje/auto-email-bok` | `LinkiKrzyzowe` grupa „Zobacz to na wdrożeniu" | `powiazaneRealizacje` **[NOWE-LINK]** |
| 6 | `/uslugi/chatboty` | `/realizacje/chatbot-edukacyjny-kursy`, `/realizacje/agenci-ai-24-7`, `/narzedzia#kalkulator-procesu` | sekcja dowodów przed CTA | nowe pole `dowody?` w `lib/uslugi/types.ts` |
| 7 | `/uslugi/automatyzacje` | `/realizacje/auto-email-bok`, `/realizacje/automatyczne-raporty`, `/realizacje/automat-tresci-social`, `/narzedzia#kalkulator-oszczednosci` | jw. | jw. |
| 8 | `/uslugi/dokumenty-faktury` | `/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac` | rama ceny | `ramaCeny.linkPoradnik` |
| 9 | `/uslugi/rozwiazania` | `/produkty`, `/realizacje/auto-podsumowania-spotkan`, `/realizacje/transkrypcja-rozmow` | sekcja dowodów (zamyka też sierotę `/produkty`) | `dowody?` |

### P2: domknięcie klastrów

| # | Strona | Cel | Miejsce |
|---|---|---|---|
| 10 | 5 wpisów `/blog/*` | po 1 usłudze + 1 poradniku + 1 realizacji + 1 narzędziu | `LinkiKrzyzowe` (§2.2 pkt 4) |
| 11 | 8 realizacji | 1 poradnik + 2 siostrzane realizacje + 1 narzędzie | `LinkiKrzyzowe` (§2.4 pkt 7) |
| 12 | 6 materiałów | 1 usługa + 1 poradnik | `LinkiKrzyzowe` (§2.3 pkt 6) |
| 13 | `/kontakt` | 3-4 linki powrotne: `/uslugi`, `/realizacje`, najczęściej czytany poradnik, `/narzedzia` | NOWA sekcja „Zanim wypełnisz formularz" z H2, OBOK formularza (nie w nim) |
| 14 | `/produkty` (sierota) | linki DO niej z `/uslugi/rozwiazania` (P1 #9), `/o-nas`, `/realizacje` (sekcja linków redakcyjnych huba) | §2.6 pkt 6 |
| 15 | `/uslugi` i `/wiedza` (sieroty z okruszków) | linki redakcyjne z 8 realizacji („zobacz wszystkie usługi") i z 6 hubów treści („cały zbiór wiedzy") | §2.6 pkt 6 |
| 16 | 6 usług bez poradnika: `agent-rekrutacyjny`, `opieka-ai`, `strony-www`, `optymalizacja`, `rozwiazania`, `architekci-wartosci-ai` | najbliższy tematycznie poradnik + kotwica narzędzia | `ramaCeny.linkPoradnik` |

### P3: sygnały pod boty

| # | Co | Gdzie |
|---|---|---|
| 17 | `ItemList` w JSON-LD | 6 hubów treści + `/uslugi` (dziś ma go tylko `/produkty`) |
| 18 | `FAQPage` w JSON-LD | wszędzie, gdzie wchodzi `HubFAQ` |
| 19 | `CreativeWork` na 8 realizacjach | `realizacjaSchemas` MA już gotowe `creativeWorkSchema` (`components/seo/schemas.ts:357`) i je zwraca; sprawdzić, czy `app/realizacje/[slug]/page.tsx` faktycznie renderuje `work` (pomiar bota widzi tylko Breadcrumb + FAQ) |
| 20 | `/ai-radar` -> 2 szablony `noindex` | usunąć linki albo `rel="nofollow"` |
| 21 | `DiagnozaForm` kroki 2-3 poza HTML | **NIE RUSZAĆ w v22**: komponent jest współdzielony z HOME, a HOME jest nietykalne. Zamiast tego statyczna sekcja z pkt 13 dokłada `/kontakt` treść, H2 i linki. |

**ŻELAZNA WALIDACJA LINKÓW:** każdy nowy `href` musi być slugiem z rejestru albo
kotwicą o potwierdzonym `id=`. Kontrola przechodzi wszystkie linki GET-em, tak
jak sonda z raportu linków (53 unikalne cele, 1 martwy).

---

## 4. PODZIAŁ PRACY: 4 partie, twarda własność plików

Zasada: **żaden plik nie należy do dwóch partii.** Sprzężone CSS+TSX idzie jednym
agentem (spec v22). Buildów nie uruchamiamy (kolizja `.next`), wolno
`npm run typecheck`.

### PARTIA A: SILNIK (idzie PIERWSZA, blokuje resztę)

**Pliki (własność wyłączna):**
```
lib/blog/types.ts
components/blog/PostBody.tsx
components/blog/TabelaRender.tsx            (NOWY)
components/blog/PostHero.tsx
components/materialy/MaterialBody.tsx
components/poradniki/LinkiKrzyzowe.tsx
components/poradniki/PoradnikHero.tsx
components/sections/PasekMetryk.tsx         (NOWY)
components/sections/HubFAQ.tsx              (NOWY)
components/sections/TabelaRejestru.tsx      (NOWY)
components/seo/schemas.ts                   (dopisanie itemListSchema)
app/globals.css                             (WYŁĄCZNIE zmiany A i B z §1.9, C po pomiarze)
lib/poradniki/types.ts                      (re-eksport LinkKrzyzowy + pole powiazaneRealizacje)
```
**Zakres:** §1.1 do §1.9 w całości. Silnik musi się kompilować i renderować
identycznie jak dziś dla danych, które nie używają nowych pól (wszystkie nowe
pola opcjonalne, `wariant` kroków domyślnie `'plytka'`).
**Dowód odbioru partii:** `npm run typecheck` czysty + wizualny render 4
poradników bez zmiany wobec produkcji (nowe pola jeszcze puste).

### PARTIA B: TRESCI-A (poradniki + blog)

**Pliki:**
```
lib/blog/posts/*.ts                (5 wpisów: tresc + pola powiazane*)
lib/blog/index.ts                  (jeśli wymaga dopisania eksportu)
lib/poradniki/*.ts                 (4 poradniki: kafle.zrodlo, kroki.wariant, powiazaneRealizacje)
app/blog/[slug]/page.tsx           (ton={INF_TYP.wpis}, LinkiKrzyzowe)
app/poradniki/[slug]/page.tsx      (przekazanie powiazaneRealizacje)
```
**Zależność:** po PARTII A.
**Zakres:** §2.1, §2.2, oraz P2 pkt 10 z §3.

### PARTIA C: TRESCI-B (realizacje + materiały + huby + produkty)

**Pliki:**
```
lib/realizacje/types.ts, lib/realizacje/*.ts     (8 case'ów + pole powiazane)
components/realizacje/KartaWdrozenia.tsx         (NOWY)
components/realizacje/RealizacjaNarrative.tsx
components/realizacje/RealizacjaEfekt.tsx
components/realizacje/RealizacjaHero.tsx
lib/materialy/types.ts, lib/materialy/*.ts       (6 materiałów)
app/materialy/[slug]/page.tsx
app/realizacje/[slug]/page.tsx                   (w tym canonical P0 #2)
app/wiedza/page.tsx
app/realizacje/page.tsx
app/produkty/page.tsx
app/blog/page.tsx
app/materialy/page.tsx
app/poradniki/page.tsx
```
**Zależność:** po PARTII A. Może iść RÓWNOLEGLE z PARTIĄ B (rozłączne pliki).
**Zakres:** §2.3, §2.4, §2.5, §2.6, oraz P2 pkt 11, 12, 14, 15 (część hubowa).

### PARTIA D: LINKI (usługi, narzędzia, kontakt, sygnały SEO)

**Pliki:**
```
components/narzedzia/GeneratorPromptow.tsx       (P0 #1)
lib/site.ts                                       (P0 #3)
lib/uslugi/types.ts, lib/uslugi/*.ts             (ramaCeny.linkPoradnik + pole dowody)
lib/uslugi/podstrony/*.ts                        (3 podstrony voicebotów)
components/uslugi/*.tsx                          (render sekcji dowodów)
app/uslugi/page.tsx                              (w tym canonical P0 #2)
app/uslugi/architekci-wartosci-ai/page.tsx       (w tym canonical P0 #2)
app/narzedzia/page.tsx                           (w tym canonical P0 #2)
app/kontakt/page.tsx
app/ai-radar/page.tsx
```
**Zależność:** P0 może iść OD RAZU, równolegle z PARTIĄ A (rozłączne pliki).
Reszta po PARTII A (potrzebuje `HubFAQ`, `PasekMetryk`, `LinkiKrzyzowe`).
**Zakres:** cały §3 poza pozycjami przypisanymi do B i C.
**ZAKAZ:** `components/forms/DiagnozaForm.tsx` (współdzielony z HOME).

### PLIKI NIETYKALNE DLA WSZYSTKICH PARTII

```
app/page.tsx
components/sections/KartaCzesci.tsx        (korpus kart home i wszystkich hubów)
components/sections/* poza PasekMetryk/HubFAQ/TabelaRejestru
components/ui/*                            (Section, Container, Card, Badge, Button)
components/motion/Reveal.tsx
components/forms/DiagnozaForm.tsx
app/globals.css poza zmianami A/B/C z §1.9
```
Jakakolwiek zmiana w tych plikach = bloker odbioru.

### KOLEJNOŚĆ

```
[D:P0]  ──────────────┐
[A: SILNIK] ──┬── [B: TRESCI-A] ──┐
              ├── [C: TRESCI-B] ──┼── [KONTROLA: build + sondy]
              └── [D: reszta] ────┘
```

---

## 5. KRYTERIA ODBIORU (mierzalne, do sprawdzenia przez kontrolę)

Sondy do ponownego użycia (istnieją w scratchpadzie):
`v22-n1-bot.mjs` (GPTBot bez JS), `v22-n3-main.mjs` (struktura w `<main>`),
`w22-e2-bezjs.mjs`, plus sonda linków z raportu §2.

### 5.1. BOTY: progi, poniżej których zejść nie wolno

Pomiar GPTBotem, bez JS, cały HTML. Wartości „dziś" z raportu linków §4.3.

| Grupa | Znaki dziś | Znaki po | H2 po | `<table>` po | `<details>` po |
|---|---|---|---|---|---|
| `/` (HOME) | 29 450 | **= 29 450** | **= 22** | **= 1** | **= 9** |
| 10 usług | 9 795-11 742 | >= dziś | >= 11 | >= 1 | >= 6 |
| 3 podstrony voicebotów | 9 847-9 877 | >= dziś | >= 12 | >= 1 | >= 6 |
| `/uslugi/architekci-wartosci-ai` | 16 685 | >= dziś | >= 14 | >= 2 | >= 6 |
| 4 poradniki | 11 985-15 392 | >= dziś | >= 11 | >= 1 | >= 4 |
| 5 wpisów bloga | 11 445-12 711 | >= dziś | >= 10 | >= 1 | >= 3 |
| 6 materiałów | 11 185-16 729 | >= dziś | >= 11 | **>= 1** | >= 3 |
| 8 realizacji | 7 488-7 709 | >= dziś | >= 10 | **>= 1** | >= 2 |
| `/narzedzia` | 18 397 | >= dziś | >= 10 | >= 1 | **>= 4** |
| `/produkty` | 11 201 | >= dziś | >= 7 | **>= 1** | **>= 4** |
| `/wiedza` | 7 957 | >= dziś | >= 8 | **>= 1** | **>= 4** |
| `/poradniki` | 7 330 | >= dziś | >= 5 | **>= 1** | **>= 4** |
| `/blog` | 8 164 | >= dziś | >= 6 | **>= 1** | **>= 4** |
| `/materialy` | 6 946 | >= dziś | >= 6 | **>= 1** | **>= 4** |
| `/realizacje` | 9 516 | >= dziś | >= 5 | **>= 1** | **>= 4** |
| `/uslugi` | 7 608 | >= dziś | >= 9 | **>= 1** | **>= 4** |
| `/kontakt` | 5 194 | **>= 6 000** | **>= 2 H2 w main** | - | - |

Pogrubione = nowy wymóg wobec stanu dzisiejszego. Reszta = próg utrzymania.
**Zero treści za kliknięciem lub hoverem. Zero tekstu w obrazkach.**

### 5.2. GĘSTOŚĆ RAMEK (pomiar `<main>`, sonda `v22-n3-main.mjs`)

| Trasa | `.inf-card` w main | Znaków na kartę |
|---|---|---|
| każdy `/blog/[slug]` | >= 6 (dziś 1) | <= 1 500 (dziś 5 815-7 196) |
| każdy `/materialy/[slug]` | >= 6 (dziś 1) | <= 1 500 (dziś 5 780-11 306) |
| każdy `/poradniki/[slug]` | >= 8 (dziś 7-18) | <= 900 (dziś 487-1 162) |
| każda `/realizacje/[slug]` | >= 5 (dziś 4) | <= 700 |
| każdy hub treści | >= 1 karta nielistingowa (FAQ lub tabela) | - |

Dodatkowo: >= 3 `<h3>` na `/blog/[slug]`, `/materialy/[slug]` i
`/realizacje/[slug]` (dziś 0 we wszystkich trzech szablonach).

### 5.3. LINKI

- Zero linków wewnętrznych zwracających 404 (przejście wszystkich unikalnych
  celów, tak jak sonda z raportu §2).
- Zero tras z 0 wychodzącymi linkami redakcyjnymi (dziś: `/kontakt` + 5 wpisów
  bloga).
- Zero sierot: każda z 50 tras ma >= 1 link redakcyjny wchodzący spoza menu,
  stopki i okruszków (dziś sieroty: `/produkty`, `/uslugi`, `/wiedza`).
- Każdy `/blog/[slug]` >= 6 linków w `<main>` (dziś 2).
- Każda `/realizacje/[slug]` >= 5 linków w `<main>` (dziś 5, ale 2 to CTA).
- Pokrycie relacji: usługa -> realizacja >= 6/13 (dziś 0/13),
  usługa -> poradnik >= 10/13 (dziś 4/13), poradnik -> realizacja 4/4 (dziś 0/4),
  blog -> cokolwiek 5/5 (dziś 0/5), materiał -> usługa 6/6 (dziś 0/6).

### 5.4. SEO I SCHEMA

- Dokładnie JEDEN `rel=canonical` na każdej z 50 tras (dziś 16 tras ma dwa).
- 50/50 title, description, jeden H1, `index, follow` (bez regresji).
- `ItemList` obecny na 6 hubach treści + `/uslugi` (dziś tylko `/produkty`).
- `FAQPage` obecny wszędzie, gdzie wchodzi `HubFAQ`, a jego treść jest 1:1 ze
  stringami widocznymi w `<details>` (jedno źródło, jak w `PostFAQ`).
- `CreativeWork` widoczny w HTML 8 realizacji.
- Sitemap: 50 URL, wszystkie 200, zero `noindex` w mapie.

### 5.5. CORE I DOSTĘPNOŚĆ (bloker przy naruszeniu)

- `git diff --stat` pokazuje **zero zmian** w plikach z listy „NIETYKALNE" (§4).
- HTML `/` bez JS identyczny wobec produkcji (dopuszczalna wyłącznie różnica w
  hashach builda Next).
- `app/globals.css`: dokładnie jedna nowa reguła (`.inf-tile.inf-tile-round`,
  jedna deklaracja) i jedno rozszerzenie listy selektorów. Zmiana C
  (`.inf-overline-ton`) tylko z załączonym pomiarem pierścieniowym >= 4,5:1 dla
  wszystkich sześciu tonów; bez pomiaru nie wchodzi.
- Fallback `rgba` literałem przed każdym `color-mix` (konwencja pliku).
- Zero `backdrop-filter` i `filter` dodanych poza blokiem desktop.
- Mobile 390px: zero poziomego scrolla na wszystkich zmienionych trasach.
  Wszystkie tabele mają scroll w opakowaniu z `tabIndex={0}` i nazwą regionu.
- Zero nowych pętli JS, zero nowych `useEffect` z timerem, zero nowych zależności.
- Kontrast tekstu >= 4,5:1 mierzony pierścieniem na żywym renderze (nie liczony
  z hexa).

### 5.6. TREŚĆ

- Zero em-dash w całym diffie: `grep -cP "\x{2014}"` na zmienionych plikach = 0.
- Zero cen spoza listy locked: 990 / 2500 / 1490 / 1990 / 99-599 / 3000-10000 / 350h.
- Zero nowych liczb bez źródła: każda liczba w `kafle` i w `KartaWdrozenia`
  pochodzi z pola rejestru albo ze zdania, które już stoi na tej stronie.
- Zero zdań sugerujących, że voicebot dzwoni sam z siebie.
- Oba modele rozliczenia trzymane spójnie (przekazanie infrastruktury = bez
  abonamentu, opieka u nas = 99-599).
- Zero widocznych `[PLACEHOLDER]`.

### 5.7. BUILD

Kontrola na koniec: `npm run build` (jeden agent, po zamknięciu partii),
liczba tras >= 52, zero błędów typów, zero ostrzeżeń o brakujących
`generateStaticParams`.

---

## 6. RYZYKA I ICH ODCIĘCIE

| Ryzyko | Odcięcie |
|---|---|
| Zmiana `KartaCzesci` psuje HOME | Plik na liście nietykalnych; gdyby okazał się potrzebny, wyłącznie nowy opcjonalny prop domyślnie wyłączony i osobna partia z pomiarem home |
| Trzy partie edytują ten sam hub | Huby treści należą tylko do PARTII C, huby usługowe tylko do PARTII D |
| Kicker w kolorze spada poniżej AA | Bramka pomiarowa w §1.9 C: bez wyniku >= 4,5 dla wszystkich sześciu tonów zmiana wypada |
| Wypełnianie FAQ hubów zmyślonymi odpowiedziami | Reguła (a)-(d) w §2.6, kontrola sprawdza każdą odpowiedź pod źródło |
| Opakowanie treści w karty obniża progi botowe | Dowód z v21: `<h2>`, `<p>`, `<ul>`, `<table>` zostają w tym samym miejscu drzewa, zmienia się tylko `<div>` wokół. Kontrola i tak mierzy §5.1 |
| Kolizja `.next` między agentami | Nikt poza kontrolą nie uruchamia `npm run build`; wolno `npm run typecheck` |
| `MaterialBody` jako opakowanie zmienia wygląd 6 stron naraz | To jest cel rundy, ale partia C pokazuje JEDNĄ próbkę (`/materialy/50-promptow`) do akceptacji, zanim przerobi pozostałe 5 |

---

## 7. PRÓBKA PRZED CAŁOŚCIĄ (reguła 2 z CLAUDE.md)

Przed masowym wdrożeniem każda partia treściowa pokazuje JEDNĄ stronę w
docelowym formacie i czeka na akceptację:
- PARTIA B: `/blog/chatbot-czy-ai-agent-roznice` (najkrótszy wpis, najszybciej
  widać różnicę).
- PARTIA C: `/materialy/50-promptow-ai-dla-wlasciciela-firmy` (najgorsza ściana
  tekstu w serwisie) oraz `/realizacje/auto-email-bok` (pierwsza `<table>` w
  historii tego szablonu).
- PARTIA C huby: `/realizacje` (pas metryk + tabela + FAQ w komplecie).
- PARTIA D: `/uslugi/chatboty` (427 wyświetleń, najwięcej w serwisie).

---

**Status:** plan, nie implementacja. Zero commitów, zero zmian w kodzie.
**NIEZWERYFIKOWANE:** kontrast wariantu `.inf-overline-ton` dla sześciu tonów
(pomiar do wykonania przez PARTIĘ A przed decyzją o zmianie C w §1.9);
czy `app/realizacje/[slug]/page.tsx` renderuje zwracany przez `realizacjaSchemas`
obiekt `work` (sonda bota widzi na 8 realizacjach tylko BreadcrumbList i FAQPage,
mimo że `creativeWorkSchema` istnieje i jest zwracane) - do sprawdzenia w PARTII C.
