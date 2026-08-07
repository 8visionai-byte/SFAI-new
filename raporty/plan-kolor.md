# PLAN: KOLOR, KONTRAST, HIERARCHIA (zespół 3, INFINITY v8)

Data: 2026-08-07. Autor: zespół 3 (dyrektor artystyczny).
Zakres: paleta, zasada świecenia, kontrast, hierarchia wizualna.
Faza analityczna: TEN plan nie zmienia ani jednego pliku kodu.

Skarga, która uruchomiła ten plan (cytat Pawła):
„Kolory u nas blade, z dupy. U nich nawet jak coś świeci, świeci mocnym
kontrastem, a u nas rozmycie. Jak nie potrzeba świecić, to nie świeci."

## Metoda i dowody

Wszystkie liczby w tym pliku są policzone, nie oszacowane:

- kontrast: wzór WCAG 2.1 (luminancja relatywna sRGB), po ZŁOŻENIU warstw
  półprzezroczystych z realnym tłem, nie na surowym hexie. To istotne, bo
  prawie cała nasza dekoracja jedzie na kryciu 8 do 65 procent;
- nasycenie: HSL S (co widzi narzędzie) oraz OKLCH C, czyli chroma
  percepcyjna (co widzi oko). OKLCH pokazuje prawdę o „bladości", HSL nie;
- tło odniesienia: `--bg` = `#06060c`, dodatkowo korpus karty i pigułka nav;
- skrypt liczący: `scratchpad/kontrast.js`, `kontrast2.js`, `k3.js`, `k5.js`,
  `k6.js` (sesja e0553296). Uruchamiany Nodem, wynik wklejony do tabel niżej.

Stan repo, na którym liczyłem: commit `bb5a2f8` plus runda v7 w locie
(`app/globals.css` ma już `--ring-2: #ff00e5`, `.inf-divider*` i przerobiony
`.inf-card:hover .inf-tile`). Wszędzie, gdzie v7 mógł już coś zrobić, jest
adnotacja SPRAWDZIĆ PRZED WDROŻENIEM. Odwołuję się do SELEKTORÓW, nie do
numerów linii, bo linie w globals przesuwają się w trakcie tej rundy.

---

## 1. Diagnoza w pięciu liczbach

| # | Fakt | Liczba | Skąd |
|---|---|---|---|
| 1 | Nasza karta nie ma korpusu: tło `rgba(6,6,12,.5)` złożone z `#06060c` daje z powrotem `#06060c` | kontrast korpus/strona **1,000:1** (wzorzec: **1,049:1**) | `.inf-card` w globals, pomiar wzorca z briefu |
| 2 | Narożniki `[ ]` karty świecą w spoczynku 2,6 razy mocniej niż u wzorca | dziś 55 proc. = **3,87:1**, wzorzec .22 = **1,50:1** | `.inf-card` background-image, pomiar wzorca |
| 3 | Każde krycie zjada nasycenie: cyjan `#22d3ee` przy 55 proc. traci 35 proc. chromy, przy 14 proc. traci 74 proc. | OKLCH C: 0,134 → 0,087 → 0,035 | tabela w rozdz. 3 |
| 4 | Świeci w spoczynku 18 różnych rzeczy naraz, każda przy 15 do 65 proc. | 18 deklaracji glow bez `:hover` | grep po `text-shadow: 0 0` i `box-shadow: 0 0` w globals |
| 5 | Nasz najmocniejszy neon jest w NAWIGACJI, a karty jadą na słabszym | nav używa `#00f0ff` (C 0,148), karty `#22d3ee` (C 0,134) | `.inf-nav-link:hover`, `--ring-gradient` kontra `INF_KATEGORIA` |

Wniosek jednym zdaniem: nie jesteśmy za ciemni, jesteśmy WSZĘDZIE w połowie
drogi. Wzorzec ma dwa skrajne stany (cisza w spoczynku, pełny kolor na hover),
a my mamy jeden stan pośredni na wszystkim naraz. Oko czyta stan pośredni jako
mgłę, stąd słowo Pawła „rozmycie".

---

## 2. Inwentarz: nasza paleta dziś i gdzie realnie żyje

### 2.1 Tokeny semantyczne (`app/globals.css`, blok `:root, [data-theme='dark']`)

| Token | Hex | Realne zastosowanie | Kontrast na `#06060c` | HSL S | OKLCH C |
|---|---|---|---|---|---|
| `--bg` | `#06060c` | tło całej strony | odniesienie | 33 | 0,006 |
| `--bg-subtle` | `#0c0c18` | pas sekcji `.inf-sec-subtle` przy 72 proc. | 1,09:1 | 33 | 0,012 |
| `--surface` | `#111127` | dropdown mobilny, skip-link, panele solidne | 1,09:1 | 40 | 0,030 |
| `--surface-hover` | `#181840` | hover wierszy dropdownu | 1,17:1 | 46 | 0,060 |
| `--fg` | `#e4e4f0` | cały tekst główny, tytuły kart | **16,03:1** | 28,6 | 0,016 |
| `--fg-muted` | `#7a7a9e` | opisy kart, etykiety, `.inf-overline` poza kartami | **4,91:1** | 15,7 | 0,055 |
| `--fg-subtle` | `#4e4e6e` | formalnie „dekoracja", realnie martwy (patrz 8.5) | **2,54:1** | 17 | 0,052 |
| `--accent` | `#22d3ee` | linki, focus ring, wypełnienie CTA, `--card-c` domyślny | 11,18:1 | 85,7 | 0,134 |
| `--accent-hover` | `#67e8f9` | hover linków, `--badge-c` domyślny | 13,94:1 | 92,4 | 0,115 |
| `--accent-decor` | `#22d3ee` | **ten sam co `--accent`, czyli tier dekoracyjny NIE ISTNIEJE** | 11,18:1 | 85,7 | 0,134 |
| `--accent-2` | `#8b5cf6` | druga barwa, licznik „Produkty" w hero, linia separatora | **4,77:1** | 89,5 | 0,219 |
| `--ring-2` (v7) | `#ff00e5` | druga barwa iskry separatora | 6,14:1 | 100 | 0,307 |
| `--border` | `#1e1e3a` | kreski list, `border-t` w sekcji „Co potrafi Agent" | **1,25:1** | 31 | 0,046 |
| `--border-strong` | `#2a2a50` | kreski nagłówków tabel | **1,49:1** | 31 | 0,057 |
| `--border-control` | `biel 55 proc.` | obrys przycisku secondary | 6,26:1 | 0 | 0 |
| `--success` | `#10b981` | statusy, kolor kategorii automatyzacji | 7,97:1 | 84,1 | 0,149 |
| `--warning` | `#f59e0b` | statusy, kolor kategorii audytu i dokumentów | 9,41:1 | 92,1 | 0,165 |
| `--shadow-accent` | `0 8px 28px cyjan 35 proc.` | KAŻDY `Button variant="primary"` w spoczynku | n/d | n/d | n/d |

### 2.2 Paleta kategorii (`lib/inf-kategorie.ts`)

Pole `c` idzie w `--card-c` i `--tile-c` (obwódka, kafelek, wash, narożniki),
pole `odcien` idzie w `--card-c-l` (mono podtytuł, strzałka, overline w karcie).

| Slug | `c` | `odcien` | Kontrast `c` | Kontrast `odcien` | Uwaga |
|---|---|---|---|---|---|
| chatboty | `#22d3ee` | `#67e8f9` | 11,18 | 13,94 | |
| voiceboty | `#8b5cf6` | `#a78bfa` | **4,77** | 7,43 | `c` najsłabszy w całym repo |
| agent-rekrutacyjny | `#a78bfa` | `#f472b6` | 7,43 | 7,63 | dubluje fiolet voicebotów |
| automatyzacje | `#10b981` | `#4ade80` | 7,97 | 11,60 | |
| dokumenty-faktury | `#f59e0b` | `#fbbf24` | 9,41 | 12,11 | |
| opieka-ai | `#10b981` | `#4ade80` | 7,97 | 11,60 | dubel z automatyzacjami |
| audyt-ai | `#f59e0b` | `#fbbf24` | 9,41 | 12,11 | dubel z dokumentami |
| rozwiazania | `#8b5cf6` | `#a78bfa` | 4,77 | 7,43 | dubel z voicebotami |
| strony-www | `#22d3ee` | `#60a5fa` | 11,18 | 7,95 | `c` i `odcien` z różnych rodzin |
| optymalizacja | `#22d3ee` | `#67e8f9` | 11,18 | 13,94 | dubel z chatbotami |

Do tego mapy `INF_PRODUKT`, `INF_NARZEDZIE`, `INF_TYP`, `INF_WIEDZA`, które
mieszają te same 6 hexów plus `#f472b6` i `#60a5fa`.

### 2.3 Palety poza rejestrem (to jest problem sam w sobie)

| Miejsce | Kolory | Komentarz |
|---|---|---|
| `components/sections/Oferta.tsx`, stała `POZIOM_TON` | `#2b7cff`, `#8b5cf6`, `#22e06b` | trzecia paleta na stronie, kolory trasy, nie kategorii |
| `components/sections/Hero.tsx`, chipy zaufania | `#2B7CFF`, `#7A3CF0`, `#22E06B` | czwarta paleta, ta sama rodzina co wyżej, inny fiolet |
| `components/sections/HeroLiczniki.tsx` | `var(--accent)`, `var(--accent-2)`, `#ff007f`, `var(--metal-green)`, `var(--warning)` | piąta paleta, magenta `#ff007f` bez tokenu |
| `--ring-gradient` w globals | `#ff007f`, `#7928ca`, `#00f0ff` | neony wzorca, używane TYLKO w nawigacji |
| `--route-gradient` | `#2b7cff`, `#7a3cf0`, `#22e06b` | trasa marki |
| `--metal-*-decor` | `#007bff`, `#7a35ff`, `#63f000` | brandbook |

Razem: **6 równoległych palet** na jednej stronie. Wzorzec ma jedną, o czterech
barwach. To jest druga przyczyna wrażenia „rozmycia": nie ma jednego cyjanu,
jest cyjan `#22d3ee`, cyjan `#00d8ff`, cyjan `#00f0ff` i błękit `#2b7cff`.

---

## 3. Dlaczego wygląda blado: dowód liczbowy

Krycie na czarnym tle nie przyciemnia koloru, ono go ODBARWIA. Tabela pokazuje
chromę OKLCH tego samego koloru po złożeniu z `#06060c`:

| Kolor | 100 proc. | 65 proc. | 55 proc. | 28 proc. | 22 proc. | 14 proc. |
|---|---|---|---|---|---|---|
| `#22d3ee` (nasz cyjan) | 0,134 | 0,098 | 0,087 | 0,054 | 0,046 | 0,035 |
| `#00f0ff` (cyjan wzorca) | 0,148 | 0,109 | 0,097 | 0,061 | 0,053 | 0,040 |
| `#8b5cf6` (nasz fiolet) | 0,219 | 0,157 | 0,139 | 0,084 | 0,071 | 0,052 |
| `#b026ff` (fiolet wzorca) | 0,286 | 0,208 | 0,184 | 0,113 | 0,095 | 0,069 |
| `#10b981` (nasza zieleń) | 0,149 | 0,106 | 0,092 | 0,053 | 0,044 | 0,030 |
| `#22e06b` (zieleń trasy) | 0,213 | 0,152 | 0,134 | 0,077 | 0,064 | 0,043 |
| `#f59e0b` (bursztyn) | 0,165 | 0,119 | 0,104 | 0,061 | 0,050 | 0,032 |

Czytanie tej tabeli:

1. nasz punkt startowy jest niżej niż wzorca: fiolet o **31 proc.** mniej chromy
   (0,219 kontra 0,286), zieleń o **43 proc.** (0,149 kontra 0,213), cyjan
   o **10 proc.** (0,134 kontra 0,148);
2. potem jeszcze dzielimy to przez krycie. Kafelek ikony ma tło 14 proc.,
   obwódkę 28 proc. i glow 55 proc., czyli w praktyce pracuje na chromie
   0,035 do 0,087. To jest dokładnie ten „szarawy niebieski", który Paweł
   nazwał bladym;
3. wzorzec robi odwrotnie: w spoczynku schodzi do 22 proc. (chroma 0,053,
   czyli ledwie sugestia), a na hover wchodzi na PEŁNY kolor w tekście i
   liczbach (chroma 0,148). Różnica między stanami to 2,8 raza. U nas
   różnica między spoczynkiem a hoverem to 1,3 raza (0,087 kontra 0,109).

To jest cały mechanizm. Naprawa ma dwa ruchy: podnieść bazę (rozdz. 4) i
rozjechać stany (rozdz. 5 i 6).

---

## 4. Nowa paleta: konkretne hexy

### 4.1 Zasada dwóch stopni

Każda rodzina ma DWA hexy i to jest kontrakt:

- **NEON** (`--card-c`, `--tile-c`): pełne nasycenie, wyłącznie dekoracja,
  czyli obwódka, glow, wash, narożniki, kafelek, wypełnienia;
- **TEKST** (`--card-c-l`): stopień jaśniejszy, musi mieć minimum 4,5:1 na
  `#06060c` ORAZ na korpusie karty. Idzie pod mono etykiety, liczby, strzałki,
  podtytuły.

Powód rozdziału: neony fioletu i błękitu mają fizycznie za mało jasności.
`#b026ff` daje 4,40:1, czyli poniżej AA dla małego tekstu. Nie wolno ich
kłaść pod 11 i 12 pikselowe mono etykiety.

### 4.2 Sześć rodzin (do wpisania w `lib/inf-kategorie.ts`)

| Rodzina | NEON | TEKST | Kontrast NEON na bg | Kontrast TEKST na bg | Kontrast TEKST na korpusie karty | Uzasadnienie zmiany |
|---|---|---|---|---|---|---|
| cyjan | `#00f0ff` | `#00f0ff` | 14,35 | 14,35 | 13,67 | HSL S 85,7 → **100**, chroma 0,134 → 0,148, kontrast 11,18 → 14,35. Kolor jest już w repo (`--ring-gradient`, `.inf-nav-link:hover`), zmierzony ze wzorca. Jeden hex na dekorację i tekst, tak jak wzorzec |
| fiolet | `#b026ff` | `#c77dff` | 4,40 | 7,51 | 7,16 | chroma 0,219 → **0,286** (plus 31 proc.), HSL S 89,5 → 100. Neon zostaje dekoracją, bo 4,40 < 4,5. Stopień tekstowy `#c77dff` ma chromę 0,193 kontra 0,159 dzisiejszego `#a78bfa`, czyli plus 21 proc. przy tym samym kontraście |
| magenta | `#ff00e5` | `#ff5cf0` | 6,14 | 7,74 | 7,38 | chroma 0,307, najwyższa w palecie. `#ff00e5` jest już w globals jako `--ring-2` (v7). Zastępuje dzisiejszy różowy `#f472b6` (chroma 0,175) i magentę `#ff007f` bez tokenu |
| zieleń | `#22e06b` | `#22e06b` | 11,49 | 11,49 | 10,95 | chroma 0,149 → **0,213** (plus 43 proc.). ZERO nowych kolorów: to `#22e06b` z `--route-gradient`, `.sf-route-dot` i `.inf-ask-dot`. Emerald `#10b981` był najbardziej wyprany w całej palecie |
| bursztyn | `#ffb020` | `#ffc531` | 11,05 | 12,78 | 12,18 | HSL S 92,1 → **100**, kontrast 9,41 → 11,05. Chroma bez zmian (0,165), bo przy tej jasności to sufit sRGB. Zysk jest w jasności, nie w chromie, dlatego priorytet niższy |
| błękit | `#2b7cff` | `#4d94ff` | 5,23 | 6,73 | 6,42 | chroma 0,143 → **0,210** (plus 47 proc.). `#2b7cff` to brand blue z `--route-gradient`, zastępuje pastelowy `#60a5fa`. Neon tylko dekoracyjnie (5,23 na dużym tekście OK, na małym nie) |

### 4.3 Nowe przypisanie kategorii (`lib/inf-kategorie.ts`, pola `c` i `odcien`)

| Slug | `c` dziś | `odcien` dziś | `c` v8 | `odcien` v8 |
|---|---|---|---|---|
| chatboty | `#22d3ee` | `#67e8f9` | `#00f0ff` | `#00f0ff` |
| voiceboty | `#8b5cf6` | `#a78bfa` | `#b026ff` | `#c77dff` |
| agent-rekrutacyjny | `#a78bfa` | `#f472b6` | `#ff00e5` | `#ff5cf0` |
| automatyzacje | `#10b981` | `#4ade80` | `#22e06b` | `#22e06b` |
| dokumenty-faktury | `#f59e0b` | `#fbbf24` | `#ffb020` | `#ffc531` |
| opieka-ai | `#10b981` | `#4ade80` | `#22e06b` | `#22e06b` |
| audyt-ai | `#f59e0b` | `#fbbf24` | `#ffb020` | `#ffc531` |
| rozwiazania | `#8b5cf6` | `#a78bfa` | `#b026ff` | `#c77dff` |
| strony-www | `#22d3ee` | `#60a5fa` | `#2b7cff` | `#4d94ff` |
| optymalizacja | `#00f0ff` przez fallback | `#67e8f9` | `#00f0ff` | `#00f0ff` |

Reguła unikalności: 6 rodzin na 10 slugów, więc dublety są nieuniknione.
Kontrakt: **w jednej siatce kart i w jednym dropdownie żadne dwie widoczne
pozycje nie mogą mieć tego samego NEONU.** W dropdownie „Usługi" (10 pozycji
naraz) rozróżnienie niosą emoji i badge, kolor jest wtedy drugorzędny. W
siatkach kart (maksymalnie 4 karty) unikalność trzeba wymusić ręcznie.

Konkretny dubel do naprawy dziś: `components/sections/PromoUslugi.tsx` renderuje
4 karty, w tym kartę „Architekci Wartości AI" z `INF_KATEGORIA_DEFAULT`, czyli
`var(--accent)` = cyjan, identyczny jak karta „chatboty" w tej samej siatce.
Poprawka: dać Architektom rodzinę magenta (`#ff00e5` / `#ff5cf0`), czyli
czwarty kolor wzorca. Wtedy siatka ma cyjan, fiolet, bursztyn, magenta.

### 4.4 Zmiany w tokenach (`app/globals.css`, blok `:root, [data-theme='dark']`)

| Token | Dziś | Docelowo | Powód |
|---|---|---|---|
| `--accent` | `#22d3ee` | **bez zmian** | to zmierzony kolor interakcji wzorca, jest wypełnieniem CTA i pierścieniem focusa. Ruszanie go dotyka 103 użyć `text-accent` i całego systemu focusa. Nie ruszamy |
| `--accent-decor` | `#22d3ee` | `#00f0ff` | dziś ten token jest kopią `--accent`, więc tier „dekoracja" nie istnieje. Po zmianie glow i obwódki mają swój pełny neon, a tekst i CTA zostają na bezpiecznym `#22d3ee` |
| `--accent-2` | `#8b5cf6` | `#b026ff` | chroma plus 31 proc. Uwaga: `--accent-2` jest dziś użyty jako KOLOR TEKSTU licznika „Produkty" w `HeroLiczniki.tsx`, gdzie da 4,40:1. Trzeba jednocześnie przełączyć ten licznik na `--accent-2-text` |
| `--accent-2-text` | brak | `#c77dff` | nowy token, stopień tekstowy fioletu (7,51:1) |
| `--ring-2` | `#ff00e5` (v7) | bez zmian | już zgodny z wzorcem |
| `--ring-2-text` | brak | `#ff5cf0` | nowy token, stopień tekstowy magenty (7,74:1) |
| `--neon-green` | brak | `#22e06b` | nowy token, żeby zieleń przestała być rozsypana po plikach jako `#22e06b`, `#10b981`, `#4ade80`, `#63f000` |
| `--neon-amber` | brak | `#ffb020` (tekst `#ffc531`) | jak wyżej dla bursztynu |
| `--fg-strong` | brak | `#f2f4fb` | tytuły kart, 18,39:1 kontra 16,03:1 dzisiejszego `--fg`. Różnica między tytułem a `--fg` to 1,15:1, czyli widoczne „mocniej białe" bez zmiany rodziny |
| `--shadow-accent` | `0 8px 28px cyjan 35 proc.` | `none` w spoczynku, glow tylko na hover | patrz rozdz. 5 |

DECYZJA PAWŁA (jedna, ważna): czy `--accent` (kolor linków, CTA i focusa) też
ma pójść na `#00f0ff`. Za: pełna spójność z nawigacją i wzorcem, kontrast rośnie
11,18 → 14,35. Przeciw: dotyka 103 miejsc z `text-accent`, zmienia kolor każdego
przycisku i pierścienia focusa na stronie, a `#22d3ee` jest zmierzoną wartością
wzorca dla interakcji (wzorzec sam używa dwóch cyjanów: `#22d3ee` na akcje,
`#00f0ff` na świecenie). Moja rekomendacja: NIE ruszać, dodać tier dekoracyjny.

---

## 5. Zasada świecenia: co świeci i kiedy

Reguła nadrzędna, jednym zdaniem: **w spoczynku strona nie świeci, świeci
element pod kursorem i element, który mówi „tu żyje system".**

### 5.1 Stan dzisiaj: 18 źródeł światła w spoczynku

| # | Selektor lub plik | Co świeci w spoczynku | Werdykt |
|---|---|---|---|
| 1 | `.inf-tile` | `box-shadow: 0 0 18px -4px kolor 55 proc.` na KAŻDYM kafelku (38 użyć) | ZGASIĆ |
| 2 | `.inf-card-sub` | `text-shadow: 0 0 12px kolor 45 proc.` | ZGASIĆ |
| 3 | `.inf-card .inf-overline` | `text-shadow: 0 0 12px kolor 45 proc.` | ZGASIĆ |
| 4 | `.inf-card .inf-tag` | `text-shadow: 0 0 12px kolor 45 proc.` | ZGASIĆ |
| 5 | `.inf-dd-badge` | `text-shadow: 0 0 12px kolor 45 proc.` | ZGASIĆ, przenieść na hover wiersza |
| 6 | `.inf-sub-dot` | `box-shadow: 0 0 8px` plus puls 2,4 s | ZOSTAJE, to sygnał statusu |
| 7 | `.inf-ask-dot` | `box-shadow: 0 0 8px 80 proc.` plus puls | ZOSTAJE, to sygnał statusu |
| 8 | `.inf-glow-cta` | `0 0 16px -6px zieleń 45 proc.` | ZGASIĆ, zostaje sama obwódka |
| 9 | `.inf-glow-cta-solid` | `0 0 24px -4px 65 proc.` | ZOSTAJE, ale tylko na głównym CTA |
| 10 | `.inf-glow-cta-ghost` | `0 0 18px -6px 45 proc.` | ZGASIĆ |
| 11 | `.sf-magnetic .inf-glow-cta` | `0 0 24px -4px 65 proc.` | ZOSTAJE, to jest to samo główne CTA |
| 12 | `.inf-ask` | `0 0 20px -4px 55 proc.` | ZGASIĆ, zostaje kropka statusu |
| 13 | `.inf-pill-nav::after` | halo `blur(14px)`, `opacity .25` plus płynąca obwódka | ZOSTAJE, sygnatura wzorca |
| 14 | `.sf-route-dot::after` | `0 0 18px 2px zieleń 55 proc.` | ZOSTAJE, to jedna kropka na sekcję |
| 15 | `.sf-rim-gradient::before` | aura 30 / 22 / 20 proc. wokół karty wyróżnionej | ZOSTAJE, limit: jedna karta na stronę |
| 16 | `--shadow-accent` na `Button variant="primary"` | `0 8px 28px cyjan 35 proc.` na każdym przycisku primary (39 użyć `variant="primary"`) | ZGASIĆ w spoczynku, dać na hover |
| 17 | `.inf-divider-label` (v7) | `text-shadow: 0 0 10px fiolet 15 proc.` | ZOSTAJE, 15 proc. to szept |
| 18 | `.inf-range` kciuk | `0 0 14px -2px 60 proc.` | ZOSTAJE, kontrolka aktywna |

Bilans: z 18 gasimy 9. Zostaje 9, z czego 4 to pojedyncze elementy na widok
(pigułka nav, główne CTA, kropka statusu, kropka trasy).

### 5.2 Docelowa reguła (do wklejenia jako komentarz w globals)

**ŚWIECI ZAWSZE (limit: 3 elementy w jednym widoku ekranu)**

1. pigułka nawigacji: płynąca obwódka `--ring-gradient` plus halo `opacity .25`;
2. główne CTA widoku (jedno): `0 0 24px -4px kolor 65 proc.`;
3. kropka statusu „agent online" 8 px: `0 0 8px` plus puls (`.inf-ask-dot`,
   `.inf-sub-dot`), maksymalnie jedna na widok.

**ŚWIECI NA HOVER I FOCUS**

| Element | Wartość docelowa |
|---|---|
| obwódka karty | `--card-c-l` przy kryciu z tabeli 6.2 (4,56 do 5,74:1) |
| aureola karty | `0 22px 48px -20px kolor 35 proc., 0 0 28px kolor 14 proc., inset 0 1px 0 biel 9 proc.` (1:1 pomiar wzorca) |
| kafelek ikony | gradient 160 stopni kolor 22 → 8 proc., obwódka 48 proc., `0 0 22px -4px kolor 55 proc.` (v7 już to wdrożył, SPRAWDZIĆ) |
| strzałka `.inf-arrow` | pojawia się, `text-shadow: 0 0 12px kolor 45 proc.` |
| mono podtytuł i tag | `text-shadow: 0 0 12px kolor 45 proc.` DOPIERO tutaj |
| CTA drugorzędne | obwódka jaśnieje, litery bieleją z `text-shadow` |
| każdy element z focusem | `outline: 2px var(--ring)`, to nie glow, to wymóg WCAG 2.4.7 |

**NIGDY NIE ŚWIECI**

kafelek ikony w spoczynku, mono etykiety i tagi w spoczynku, badge dropdownu w
spoczynku, przyciski secondary i ghost, wiersze tabel, kreski i separatory poza
iskrą, narożniki kart w spoczynku, tło sekcji, ikony w stopce.

### 5.3 Reguła dodatkowa: jeden kolorowy element na kartę w spoczynku

Pomiar wzorca mówi: „liczby w kartach wzorca duże, mono, w PEŁNYM kolorze karty,
pod nimi mono etykieta wielkimi literami, SZARA".

Dziś karta `PromoUslugi` ma w spoczynku **cztery** kolorowe elementy: kafelek
(tło 14 proc., obwódka 28 proc., glow 55 proc., glif 100 proc.), overline slugu
(kolor plus glow), strzałka (kolor), plus obwódka i narożniki 55 proc.

Docelowo w spoczynku kolor niesie **jeden** element: mono etykieta lub liczba,
w PEŁNYM kolorze TEKSTOWYM rodziny (chroma 0,148 zamiast 0,035). Kafelek ma
tylko glif w kolorze, bez glow i bez kolorowego tła. Strzałka jest szara albo
niewidoczna do hoveru. Tytuł biały, opis szary.

To jest odpowiedź na „u nich świeci mocnym kontrastem, u nas rozmycie":
jeden element przy 100 proc. bije cztery elementy przy 45 proc.

---

## 6. Karta: dziś kontra pomiar wzorca kontra cel

Tabela wykonawcza dla `.inf-card` w `app/globals.css`.

| Właściwość | Dziś w repo | Pomiar wzorca | Cel v8 | Dowód liczbowy |
|---|---|---|---|---|
| tło spoczynek | `rgba(6,6,12,.5)` | `linear-gradient(160deg, rgba(13,14,30,.88), rgba(9,10,22,.72))` | 1:1 wzorzec | nasze złożenie daje z powrotem `#06060c`, kontrast do strony **1,000:1**. Wzorzec daje `#0c0d1c` do `#080913`, kontrast **1,049:1**. Karta musi mieć korpus, inaczej jest dziurą z ramką |
| blur | brak na `.inf-card` | `blur(16px)` | `blur(16px)` TYLKO `min-width: 1024px` | żelazna zasada perf mobile (memory: mobile bez `backdrop-filter`) |
| obwódka spoczynek | `rgba(255,255,255,.07)` | biel 7 proc. | bez zmian | 1,14:1 do strony, 1,17:1 do korpusu, czyli włos, tak ma być |
| narożniki `[ ]` | kolor 55 proc. | .22 | **22 proc.** | 3,87:1 → **1,50:1**. To jest największy pojedynczy sprawca „półświatła" |
| wash koloru | 14 proc. (`color-mix 28 proc.` razy `opacity .5`) | brak washu w spoczynku | **0 proc. w spoczynku, 8 proc. na hover** | wash 14 proc. zjada opis `--fg-muted` do **3,97:1**, czyli poniżej AA. Guard `#8a8aad` ratuje do 4,92, ale to łatanie |
| glow spoczynek | brak na karcie, jest na dzieciach | brak | brak | patrz 5.1 |
| hover: tło | zmienia się na `rgba(24,24,64,.45)` = `#0e0e23` | **NIE zmienia się** | nie zmienia się | pomiar wzorca. Nasza zmiana tła jest niepotrzebna, robi „szary kafelek" |
| hover: obwódka | kolor 70 proc. | kolor 60 do 65 proc. | tabela 6.2 | 70 proc. cyjanu = 5,73:1, wzorzec 60 proc. = 4,43:1 |
| hover: aureola | `inset biel 8 proc., 0 0 26px kolor 30 proc., 0 12px 40px -12px kolor 40 proc.` | `0 22px 48px -20px kolor 35 proc., 0 0 28px kolor 14 proc., inset 0 1px 0 biel 9 proc.` | 1:1 wzorzec | nasza aureola bezpośrednia (30 proc.) jest **ponad 2 razy** mocniejsza niż wzorca (14 proc.), a cień pod kartą słabszy. Stąd „u nas rozmycie": mgła zamiast uniesienia |
| hover: ruch | `translateY(-3px)` | `translateY(-5px) scale(1.008)` | 1:1 wzorzec | zespół 2 (animacje) wykonuje, ja tylko potwierdzam wartości |
| hover: narożniki | bez zmian, cały czas 55 proc. | .22 → **.6** | 22 → 60 proc. | tu powstaje „mocny kontrast": skok **1,50:1 → 4,43:1**, czyli 3 razy. Dziś narożniki nie zmieniają się wcale |
| dolna łuna | brak | `.04 → .08` | dopisać | kolor karty 8 proc. u dołu: opis `#8a8aad` dalej 5,28:1, czyli AA z zapasem |
| reflektor za kursorem | `320px circle, kolor 12 proc.` | `180px at MYSZ, kolor 8 proc., transparent 70 proc.` | 1:1 wzorzec | mniejsza i słabsza plama czyta się jako światło punktowe, nasza 320 px przy 12 proc. czyta się jako mgła. Kontrast opisu pod reflektorem 8 proc.: `#8a8aad` = **5,05:1** (AA), tytuł `#f2f4fb` = 15,26:1 |
| sweep | biel 6 proc., `left -40 proc. → 120 proc.`, 0,6 s | nie zmierzony | zostaje | biel 6 proc. nie rusza kontrastu |

### 6.1 Kontrast tekstu na korpusie karty wzorca

Po przejściu na tło wzorca (`#0c0d1c` u góry, `#080913` u dołu) sprawdziłem
wszystkie teksty. Wynik: bezpiecznie.

| Tekst | Na górze karty | Na dole karty | Próg |
|---|---|---|---|
| tytuł `#f2f4fb` | **17,53** | 18,05 | 4,5 |
| tytuł dzisiejszy `#e4e4f0` | 15,28 | 15,73 | 4,5 |
| opis `--fg-muted #7a7a9e` | **4,68** | 4,82 | 4,5 |
| opis z guardem `#8a8aad` | **5,80** | 5,97 | 4,5 |
| mono cyjan `#00f0ff` | 13,67 | 14,08 | 4,5 |
| mono fiolet `#c77dff` | 7,16 | 7,37 | 4,5 |
| mono magenta `#ff5cf0` | 7,38 | 7,60 | 4,5 |
| mono zieleń `#22e06b` | 10,95 | 11,28 | 4,5 |
| mono bursztyn `#ffc531` | 12,18 | 12,55 | 4,5 |
| mono błękit `#4d94ff` | 6,42 | 6,61 | 4,5 |

Uwaga wykonawcza: guard `.inf-card .text-fg-muted { color: #8a8aad }` ZOSTAJE.
Powód: pod reflektorem 8 proc. czysty `#7a7a9e` spada do **4,08:1**, czyli
poniżej AA, a z guardem trzyma 5,05:1.

### 6.2 Kalibracja obwódki hover per rodzina

Problem, którego dziś nie widać gołym okiem: to samo krycie daje ZUPEŁNIE inną
siłę w różnych rodzinach. Przy dzisiejszych 70 proc. cyjan daje 5,73:1, a fiolet
2,58:1. Karty fioletowe wyglądają na „martwe" w tym samym systemie.

| Rodzina | Kolor obwódki (stopień TEKSTOWY) | Krycie | Wynik po złożeniu | Kontrast do tła |
|---|---|---|---|---|
| cyjan | `#00f0ff` | 62 proc. | `#0297a3` | **5,74:1** |
| fiolet | `#c77dff` | 75 proc. | `#975fc2` | **4,56:1** |
| magenta | `#ff5cf0` | 75 proc. | `#c147b7` | **4,65:1** |
| zieleń | `#22e06b` | 62 proc. | `#178d47` | **4,76:1** |
| bursztyn | `#ffc531` | 62 proc. | `#a07c23` | **5,23:1** |
| błękit | `#4d94ff` | 80 proc. | `#3f78ce` | **4,59:1** |

Rozrzut po kalibracji: 4,56 do 5,74 (dziś: 2,58 do 5,73). Każda karta reaguje
na hover z tą samą siłą. Wykonanie: krycie per rodzina jako czwarte pole w
`lib/inf-kategorie.ts` (np. `ring: 0.62`) albo prościej, gotowy hex obwódki
jako piąte pole. Rekomendacja: pole `ring` z liczbą, mniej hexów do pilnowania.

---

## 7. Kontrast: pełna tabela par, których dotyczą zmiany

Próg AA: 4,5:1 dla tekstu, 3:1 dla tekstu dużego (18,66 px bold lub 24 px),
3:1 dla granic kontrolek i wskaźników stanu (WCAG 1.4.11).

### 7.1 Tekst na tle strony `#06060c`

| Para | Dziś | Po zmianie | Werdykt |
|---|---|---|---|
| tytuł karty na tle | 16,03 (`#e4e4f0`) | **18,39** (`#f2f4fb`) | AAA |
| opis na tle | 4,91 (`#7a7a9e`) | bez zmian | AA |
| opis w karcie (guard) | 6,08 (`#8a8aad`) | bez zmian | AA |
| mono cyjan | 11,18 (`#22d3ee`) | **14,35** (`#00f0ff`) | AAA |
| mono fiolet | 7,43 (`#a78bfa`) | **7,51** (`#c77dff`) | AAA |
| mono magenta | 7,63 (`#f472b6`) | **7,74** (`#ff5cf0`) | AAA |
| mono zieleń | 11,60 (`#4ade80`) | 11,49 (`#22e06b`) | AAA |
| mono bursztyn | 12,11 (`#fbbf24`) | **12,78** (`#ffc531`) | AAA |
| mono błękit | 7,95 (`#60a5fa`) | 6,73 (`#4d94ff`) | AAA |
| licznik „Produkty" w hero | **4,77** (`#8b5cf6`) | **7,51** (`#c77dff`) | naprawa najsłabszego punktu |
| licznik „Realizacje" | 5,35 (`#ff007f`) | **7,74** (`#ff5cf0`) | |
| licznik „Usługi" | 11,18 | 14,35 | |
| licznik „Narzędzia" | 9,74 (`--metal-green #34d399`) | 11,49 (`#22e06b`) | |
| licznik „Wiedza" | 9,41 (`#f59e0b`) | 12,78 (`#ffc531`) | |

### 7.2 Elementy nietekstowe (próg 3:1, WCAG 1.4.11)

| Element | Dziś | Cel | Uwaga |
|---|---|---|---|
| pierścień focus `--ring #22d3ee` | 11,18:1 | bez zmian | jedyny element, który MUSI zdać, zdaje z ogromnym zapasem |
| obrys przycisku secondary (biel 55 proc.) | 6,26:1 | bez zmian | zdaje |
| obwódka karty spoczynek (biel 7 proc.) | 1,14:1 | bez zmian | dekoracja, nie niesie znaczenia, karta jest linkiem z tekstem |
| obwódka karty hover | 2,58 do 5,73 | **4,56 do 5,74** | patrz 6.2 |
| narożniki spoczynek | 3,87:1 | 1,50:1 | świadome ściszenie, to czysta dekoracja |
| kreska `--border #1e1e3a` | **1,25:1** | patrz nota niżej | używana jako `border-t` list, praktycznie niewidoczna |
| kreska `--border-strong #2a2a50` | 1,49:1 | bez zmian | nagłówki tabel |

Nota do `--border`: 1,25:1 to kreska, której nie widać na telefonie w słońcu.
Nie łamie WCAG (dekoracja), ale łamie obietnicę „przejrzystej struktury" ze
skargi 1 Pawła. Rekomendacja: w miejscach, gdzie kreska ROZDZIELA treść
(lista „Co potrafi Agent" w `Rozwiazanie.tsx`, wiersze tabel), przejść na
biel 12 proc. (1,31:1) albo biel 20 proc. (1,73:1). DECYZJA PAWŁA: 12 czy 20.

### 7.3 Wash karty i próg AA opisu

| Wash | Tło po złożeniu | `--fg-muted #7a7a9e` | Guard `#8a8aad` |
|---|---|---|---|
| cyjan `#00f0ff` 14 proc. (dzisiejsza siła) | `#05272e` | **3,83** poniżej AA | 4,74 na styk |
| cyjan `#00f0ff` 8 proc. | `#06191f` | 4,39 na styk | **5,43** AA |
| cyjan `#00f0ff` 6 proc. | `#06141b` | **4,55** AA | 5,63 AA |
| fiolet `#b026ff` 14 proc. | `#1e0a2e` | 4,48 na styk | 5,55 AA |
| bursztyn `#ffb020` 14 proc. | `#291e0f` | **3,98** poniżej AA | 4,92 AA |
| zieleń `#22e06b` 14 proc. | podobnie | **3,80** poniżej AA | 4,71 na styk |

Wniosek: wash 14 proc. jest za mocny dla naszego szarego. Wzorzec w spoczynku
washu nie ma wcale. Cel: 0 proc. w spoczynku, 8 proc. w stanie hover, guard
`#8a8aad` zostaje jako pas bezpieczeństwa.

---

## 8. Hierarchia: gdzie jest dziś złamana

Docelowa drabina, trzy poziomy, bez wyjątków:

1. **TYTUŁ**: `--fg-strong #f2f4fb`, waga 600 lub 700, bez glow, bez koloru;
2. **OPIS**: `--fg-muted #7a7a9e`, w karcie guard `#8a8aad`, bez glow;
3. **AKCENT**: stopień TEKSTOWY rodziny, mono, wielkie litery, jeden na kartę.

Kontrast wzajemny tytuł kontra opis: dziś 3,26:1 (`#e4e4f0` do `#7a7a9e`),
docelowo 3,02:1 (`#f2f4fb` do `#8a8aad`). Oba czytelne jako dwa poziomy.

### 8.1 Trzy rozmiary tytułu w jednej siatce

Plik: `components/sections/PromoUslugi.tsx`.

| Karta | Znacznik | Rozmiar | Kolor |
|---|---|---|---|
| chatboty (full) | `h2` `text-h2` | 32 do 46 px | `text-fg` |
| voiceboty (połówka) | `h2` `text-h3` | 20 px | `text-fg` |
| audyt-ai (połówka) | `h2` `text-h3` | 20 px | `text-fg` |
| Architekci (cienka full) | `h2` `text-ui` | 15 px | `text-fg` |

Stosunek największego do najmniejszego: **46 do 15, czyli 3,1 raza**, przy czym
wszystkie cztery to `h2` tej samej rangi. To jest wizualne kłamstwo o hierarchii.
Rekomendacja kolorystyczno-hierarchiczna: karta wiodąca dostaje tytuł większy
ORAZ jako jedyna w siatce dostaje pełny akcent, pozostałe trzy wyrównać do
jednego stopnia. Ostateczne rozmiary: zespół 1 (struktura), ja zgłaszam problem
i wymagam wyrównania trzech kart podrzędnych do JEDNEGO stopnia.

### 8.2 Cztery kolory na jednej karcie w spoczynku

Plik: `components/sections/PromoUslugi.tsx`, funkcja `PromoKarta`.

Kolorowe w spoczynku: kafelek `.inf-tile` (tło, obwódka, glow, glif), overline
slugu (`style={{ color: odcien }}`), strzałka `.inf-arrow`
(`text-[color:var(--card-c-l)]`), plus narożniki karty 55 proc.

Cel: jeden kolorowy element (overline slugu, pełny stopień TEKSTOWY), reszta
neutralna do hoveru. Ten sam wzór dotyczy `Rozwiazanie.tsx` (overline `// 01`
i `// 02`) oraz wszystkich map w `app/**` konsumujących `.inf-card`.

### 8.3 Dwa systemy liczb na jednej stronie

| Miejsce | Kolor liczby | Kolor etykiety |
|---|---|---|
| `components/sections/Hero.tsx` (`AnimatedMetric`) | `text-brand` = **biel** 20,21:1 | `text-fg-subtle` (guard: szary) |
| `components/sections/HeroLiczniki.tsx` | pięć różnych kolorów | `--fg-muted` szary |

Pomiar wzorca: „liczby duże, mono, w PEŁNYM kolorze karty". Rekomendacja:
`AnimatedMetric` w hero przechodzi na stopień TEKSTOWY rodziny sekcji, etykieta
zostaje szara. Wtedy strona ma JEDEN język liczb.

### 8.4 Trzecia i czwarta paleta

- `components/sections/Oferta.tsx`, stała `POZIOM_TON = ['#2b7cff', '#8b5cf6', '#22e06b']`:
  to kolory trasy, nie kategorii. Minimalna poprawka: `#8b5cf6` na `#b026ff`,
  wtedy trójka to dokładnie rodziny błękit, fiolet, zieleń z rozdz. 4.2;
- `components/sections/Hero.tsx`, chipy zaufania `#2B7CFF`, `#7A3CF0`, `#22E06B`:
  `#7A3CF0` to jeszcze inny fiolet. Ujednolicić do `#b026ff`.

### 8.5 Token, który kłamie: `--fg-subtle`

`--fg-subtle` = `#4e4e6e`, kontrast **2,54:1**, formalnie „tylko dekoracja".
Ale utility `.text-fg-subtle` ma **146 wystąpień w 65 plikach**, a na końcu
`globals.css` stoi guard `.text-fg-subtle { color: var(--fg-muted) }`.

Efekt: programista pisze `text-fg-subtle`, myśli, że dostaje trzeci, ciemniejszy
stopień szarości, a dostaje dokładnie ten sam kolor co `text-fg-muted`. Czyli
mamy dwa poziomy hierarchii tekstu udające trzy. To jest ukryta przyczyna
wrażenia „opisy niespójne, nie ma jednej struktury" (skarga 1 Pawła).

Rekomendacja: osobna partia sprzątająca, 146 zamian `text-fg-subtle` na
`text-fg-muted`, guard zostaje jako siatka bezpieczeństwa, `--fg-subtle` zostaje
wyłącznie do CSS dekoracji. Nie blokuje reszty planu, może iść na końcu.

### 8.6 Cena i nazwa planu w tym samym stopniu

`components/sections/Oferta.tsx`: nazwa planu to `h3` w `text-h3` (20 px),
cena to `font-display text-h3 font-medium` (też 20 px). Dwa najważniejsze
elementy karty cennika są tego samego rozmiaru i tego samego koloru (`text-fg`).
Rekomendacja kolorystyczna: cena dostaje `--fg-strong`, nazwa zostaje `--fg`,
a „od 0 zł" i podobne dopiski idą w stopień TEKSTOWY rodziny karty.

---

## 9. Sekcja „Sprawdź, którego Agenta potrzebujesz" (skarga 1), część kolorystyczna

Cytat: „zwykłe podświetlenie, nie wygląda jak powinno. Opisy powinny być dobrze
rozmieszczone, spójne i przejrzyste. Za dużo tekstu, CTA rozpierdolone."

Plik: `components/sections/Rozwiazanie.tsx`.

Co znalazłem po stronie koloru:

| Element | Stan dziś | Problem | Cel |
|---|---|---|---|
| CTA `Button variant="secondary"` | biały tekst plus obrys biel 55 proc. (6,26:1) | to jedyne CTA na stronie w języku „biały outline". Hero i nawigacja jadą na `.inf-glow-cta` (neon). Stąd „zwykłe podświetlenie" | `.inf-glow-cta .inf-glow-cta-ghost` w rodzinie sekcji, obwódka 62 proc., bez glow w spoczynku |
| dwie karty AEO | cyjan i fiolet, obie z overline plus glow | dobrze dobrane rodziny, złe świecenie w spoczynku | overline w pełnym stopniu TEKSTOWYM, glow dopiero na hover |
| kolumna „Zwykły chatbot" w tabeli | `text-fg-subtle` (guard: 4,91:1) | poprawne, ale przez guard nie jest ciemniejsze niż reszta, więc „przegrana" kolumna nie wygląda na przegraną | zostawić szary, dodać różnicę WAGI, nie koloru |
| kolumna „AI Agent" | `text-fg` plus `border-l border-border-accent` (`#22d3ee`) | jedyne miejsce, gdzie akcent działa poprawnie | zostaje, `#22d3ee` bez zmian |
| lista „Co potrafi Agent" | `border-t border-border` = **1,25:1** | kreski rozdzielające cztery bloki są praktycznie niewidoczne, bloki zlewają się w ścianę tekstu | biel 12 lub 20 proc., patrz 7.2 |
| blockquote | `text-fg`, 46 do 52 px | poprawne | zostaje |

Systemowa poprawka CTA (część kolorystyczna, treść należy do zespołu 4):

| Poziom CTA | Klasa | Kolor spoczynek | Kolor hover | Gdzie |
|---|---|---|---|---|
| główne | `.inf-glow-cta` plus `.sf-magnetic` | tło `--accent`, tekst `--accent-contrast`, glow 65 proc. | tło biel, tekst `#06060c` | jedno na widok, hero i sekcja finalna |
| drugorzędne | `.inf-glow-cta .inf-glow-cta-ghost` | przezroczyste, obwódka rodziny 62 proc., BEZ glow | tło `--accent-soft`, obwódka pełna, litery jaśnieją | zamknięcia sekcji, w tym „Sprawdź, którego Agenta" |
| w karcie | strzałka `.inf-arrow` | niewidoczna lub szara | kolor rodziny plus glow 45 proc. | karty |
| tekstowe | `Button variant="link"` | `text-accent` (11,18:1) | `--accent-hover` | wewnątrz akapitów |

---

## 10. Kolejność wdrożenia i własność plików

Partie tak rozdzielone, żeby dwie osoby mogły pracować równolegle bez konfliktu.

| Partia | Pliki (własność wyłączna) | Zakres | Blokuje |
|---|---|---|---|
| K1 tokeny | `app/globals.css`, blok `:root, [data-theme='dark']` | `--accent-decor`, `--accent-2`, `--accent-2-text`, `--ring-2-text`, `--neon-green`, `--neon-amber`, `--fg-strong`, `--shadow-accent` | K2, K3 |
| K2 rejestr | `lib/inf-kategorie.ts` | nowe `c` i `odcien` wg 4.3, nowe pole `ring`, wpis dla Architektów | K4 |
| K3 karta | `app/globals.css`, sekcja INFINITY (`.inf-card*`, `.inf-tile`, `.inf-arrow`, `.inf-spotlight`, `.inf-dd-badge`, `.inf-glow-cta*`) | rozdz. 5 i 6 co do wartości | nic |
| K4 konsumenci | `components/sections/PromoUslugi.tsx`, `Rozwiazanie.tsx`, `Oferta.tsx`, `Hero.tsx`, `HeroLiczniki.tsx` | jeden kolorowy element na kartę, wyrównanie tytułów, `POZIOM_TON`, chipy, liczby | nic |
| K5 sprzątanie | 65 plików z `text-fg-subtle` | 146 zamian na `text-fg-muted` | nic, robić na końcu |

Kolejność: K1 → (K2 i K3 równolegle) → K4 → K5.

Konflikt do pilnowania: K1 i K3 dotykają tego samego pliku `app/globals.css`.
Albo robi je ta sama osoba, albo K1 idzie pierwsze i jest scalone przed startem
K3. Runda v7 też jest właścicielem tego pliku, więc K1 i K3 startują dopiero
po jej scaleniu.

---

## 11. Kryteria odbioru (jak sprawdzić, że zrobione DOBRZE)

Nie „czy się kompiluje", tylko:

1. **Zrzut spoczynku**: otworzyć stronę główną na desktopie, nie ruszać myszą,
   zrobić zrzut. Policzyć świecące elementy w widoku. Ma być maksymalnie 3
   (pigułka nav, główne CTA, kropka statusu). Dziś jest ich kilkanaście;
2. **Zrzut hover**: najechać na kartę. Obwódka i aureola mają być wyraźnie
   mocniejsze niż spoczynek, tło karty NIE MOŻE się zmienić;
3. **Test fioletu**: najechać na kartę voicebotów i na kartę chatbotów jeden po
   drugim. Reakcja ma być tak samo mocna. Dziś fiolet jest 2,2 razy słabszy;
4. **Pipeta**: pobrać kolor mono etykiety z karty. Ma być dokładnie hex z
   tabeli 4.2, nie kolor po złożeniu z kryciem (czyli nie `#157788`);
5. **Kontrast**: DevTools, wybrany opis karty na tle z reflektorem pod kursorem.
   Ma pokazać minimum 4,5:1;
6. **Lighthouse A11y**: dziś 100 na produkcji (STATUS.md, PSI v5). Po zmianach
   ma dalej być 100. Każdy spadek to regresja, nie kompromis;
7. **Telefon**: mobile to 4,35 proc. CTR kontra 1,14 proc. na desktopie i
   pozycja 13,4 kontra 24,6 (raport SEO 2026-08-07, punkt 1.6). Zrzut z realnego
   telefonu, nie z emulatora, przy jasności ekranu 50 proc. Neony mają być
   widoczne, szarości czytelne.

---

## 12. DECYZJE PAWŁA

| # | Pytanie | Rekomendacja | Ryzyko wyboru przeciwnego |
|---|---|---|---|
| 1 | Czy `--accent` (linki, CTA, focus) idzie z `#22d3ee` na `#00f0ff`? | NIE. Dodać tier dekoracyjny `--accent-decor: #00f0ff`, interakcję zostawić | zmiana dotyka 103 użyć `text-accent` i pierścienia focusa na całej stronie |
| 2 | Czy karta dostaje korpus wzorca (`rgba(13,14,30,.88)` do `rgba(9,10,22,.72)`), czy zostaje przezroczysta jak dziś? | TAK, korpus wzorca. Bez niego karta jest dziurą z ramką (1,000:1 do tła) | zostanie „karta, której nie widać", a to była decyzja v6 |
| 3 | Kreski rozdzielające treść: biel 12 proc. (1,31:1) czy 20 proc. (1,73:1)? | 12 proc., wzorzec jest oszczędny | 20 proc. zaczyna rysować pudełka |
| 4 | Zieleń: `#22e06b` z trasy marki czy neon `#00ff9d`? | `#22e06b`, bo jest już w repo i w brandbooku, chroma 0,213 wystarcza | `#00ff9d` (chroma 0,210, kontrast 15,20) jest jaskrawszy, ale to nowy kolor spoza marki |
| 5 | Bursztyn: zmieniamy `#f59e0b` na `#ffb020`, czy zostaje? | zmienić, zysk jest w jasności (9,41 → 11,05), ale to najniższy priorytet całego planu | brak, można pominąć bez szkody |
| 6 | Czy karta „Architekci Wartości AI" dostaje własną rodzinę (magenta) zamiast fallbacku cyjan? | TAK, dziś dubluje kolor karty chatbotów w tej samej siatce | dwie z czterech kart w jednej siatce mają ten sam kolor |

---

## 13. Czego nie sprawdziłem

1. **Nie widziałem wzorca na żywo.** Pracowałem na pomiarach z briefu
   (getComputedStyle, 2026-08-07) i na tym, co jest w repo. Kolor etykiet mono
   we wzorcu i dokładny kształt dolnej łuny nie były w pomiarach;
2. **Nie uruchomiłem builda ani przeglądarki** (zakaz tej fazy). Wszystkie
   kontrasty są policzone matematycznie, nie zmierzone pipetą na wyrenderowanej
   stronie. Po wdrożeniu trzeba je potwierdzić w DevTools;
3. **Nie sprawdziłem, jak wygląda paleta na ekranie OLED przy niskiej jasności**
   ani w trybie „redukcja jasnych kolorów" iOS. Neony na czerni bywają tam
   przepalone;
4. **Nie liczyłem kontrastu dla trybu `[data-theme='light']`** (jasne wyspy).
   Zmiany z tego planu dotyczą wyłącznie ciemnego motywu, wyspy zostają
   nietknięte, ale jeżeli partia K4 wstawi kolorowy tekst do jasnej wyspy,
   trzeba przeliczyć od zera;
5. **Nie wiem, co dokładnie zmieni runda v7** w `app/globals.css` po moim
   odczycie. Widziałem `--ring-2`, `.inf-divider*` i nowy `.inf-card:hover
   .inf-tile`. Przed wdrożeniem trzeba przejrzeć aktualny stan tych selektorów;
6. **Nie oceniałem czytelności emoji w kafelkach** przy nowej palecie. Emoji
   mają własne kolory i nie dziedziczą `--tile-c`, więc kolorowe tło kafelka
   przy 14 proc. może się z nimi gryźć. To osobne sprawdzenie po wdrożeniu.
