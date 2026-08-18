# Pomiary v20: rodzic /uslugi/voiceboty vs 3 podstrony

Data: 2026-08-18. Rola: zwiad (bez budowania, bez commitów).
Cel: znaleźć liczbowo, dlaczego podstrony wyglądają słabiej niż strona macierzysta
(cytat Pawła: „struktura już słabsza, ramki są słabsze, tekstów jest naprawdę dużo").

## 0. Metoda i stan pomiaru

Mierzone na PRODUKCJI, Chrome headless (playwright-core), viewport 1440x900,
375x800 i 320x800, po pełnym przewinięciu strony (żeby Reveal odsłonił treść).

Adresy:
- rodzic: `https://www.simplefast.ai/uslugi/voiceboty`
- `https://www.simplefast.ai/uslugi/voiceboty/windykacja`
- `https://www.simplefast.ai/uslugi/voiceboty/potwierdzanie-wizyt`
- `https://www.simplefast.ai/uslugi/voiceboty/odbieranie-telefonow`

WAŻNE: w drzewie roboczym repo są NIEZACOMMITOWANE zmiany z rundy przygotowawczej
(`lib/inf-kategorie.ts` z nową funkcją `dekorUslugi`, `components/uslugi/ServiceHero.tsx`,
`RamaCeny.tsx`, `ServiceFAQ.tsx`, `app/uslugi/voiceboty/[podstrona]/page.tsx`).
Produkcja ich NIE MA. Wszystko poniżej opisuje stan LIVE. Tam, gdzie drzewo robocze
już to naprawia, jest to napisane wprost.

Skrypty pomiarowe i surowe dane:
`...\scratchpad\v20-a-struktura.mjs` + `v20-a-struktura.json`,
`v20-b-objetosc.mjs` + `v20-b-objetosc.json`,
`v20-c-h1-hero.mjs` / `v20-c2-h1.mjs` + `.json`,
`v20-d-ramki.mjs` + `v20-d-ramki.json`.

---

## 1. STRUKTURA sekcji (selektor: `main#main > section:nth-of-type(N)`)

### 1a. Rodzic: 9 sekcji, strona 7332 px (1440), 11001 px (375)

| # | selektor | tło (tone) | rytm | H1/H2 | karty (wariant) | wys. px |
|---|---|---|---|---|---|---|
| 1 | `section:nth-of-type(1)` | transparent | lg (64/64) | H1 „Voicebot dla firmy, który odbiera telefon za Ciebie" | 0 kart, 4 kafle statystyk, 3 chipy, badge, `.inf-hero-word` | 1217 |
| 2 | `:nth-of-type(2)` | subtle | md (48/48) | H2 „Ile telefonów dziennie nie odbierasz?" | 0 | 334 |
| 3 | `:nth-of-type(3)` | base | md | H2 „Co robi bot telefoniczny, gdy nie możesz odebrać?" | 0 | 414 |
| 4 | `:nth-of-type(4)` | subtle | md | H2 „Agent głosowy a odbieranie telefonu ręcznie" (tabela) | 0 (2 kickery) | 728 |
| 5 | `:nth-of-type(5)` | base | md | H2 „Jak wdrażamy voicebota krok po kroku?" | 3 x `inf-card inf-card-quiet` + `.inf-tile` + `.inf-spotlight` | 465 |
| 6 | `:nth-of-type(6)` | base | md | H2 „Ile kosztuje voicebot dla firmy?" | 1 x `inf-card inf-card-top` | 875 |
| 7 | `:nth-of-type(7)` | subtle | md | H2 „Konkretne zastosowania" | **3 x `inf-card inf-card-edge` + 3 x `.inf-arrow`** | 1009 |
| 8 | `:nth-of-type(8)` | subtle | md | H2 „Najczęstsze pytania" (7 pytań) | 1 x `inf-card inf-card-top` | 822 |
| 9 | `:nth-of-type(9)` | base | md | H2 „Zacznij od bezpłatnej diagnozy" | 0 | 439 |

Razem kart na stronie: **8** w **3 wariantach** (`quiet` x3, `top` x2, `edge` x3).

### 1b. Podstrony: po 8 sekcji, brak sekcji 7

| # | sekcja | rodzic | windykacja | potwierdzanie | odbieranie | RÓŻNICA |
|---|---|---|---|---|---|---|
| 1 | hero (transparent, lg) | 1217 | 1292 | 1292 | 1267 | **+75 / +75 / +50** (dokładnie 1 dodatkowa linia H1; line-height 83,6 px) |
| 2 | problem (subtle, md) | 334 | 448 | 414 | 448 | **+114 / +80 / +114** |
| 3 | rozwiązanie (base, md) | 414 | 549 | 515 | 469 | **+135 / +101 / +55** |
| 4 | tabela (subtle, md) | 728 | 807 | 807 | 860 | **+79 / +79 / +132** |
| 5 | kroki (base, md) | 465 | 536 | 536 | 585 | **+71 / +71 / +120** |
| 6 | rama ceny (base, md) | 875 | 841 | 888 | 841 | -34 / +13 / -34 |
| 7 | **„Konkretne zastosowania"** | **1009** | **BRAK** | **BRAK** | **BRAK** | **-1009 (cała sekcja + 3 karty `inf-card-edge` + 3 strzałki)** |
| 8 | FAQ (subtle, md) | 822 (7 pytań) | 743 (6) | 743 (6) | 743 (6) | -79 (mniej o 1 pytanie) |
| 9 | CTA (base, md) | 439 | 439 | 439 | 439 | 0 |
| | **suma 8 wspólnych sekcji** | **5294** | **5655** | **5634** | **5652** | **+361 / +340 / +358 (+6,4 do +6,8%)** |
| | cała strona 1440 | 7332 | 6684 | 6663 | 6681 | (rodzic ma sekcję 7) |
| | cała strona 375 | 11001 | 9966 | 9786 | 9899 | |

Wnioski ze struktury:
1. **Rytm tła i odstępy są IDENTYCZNE** (transparent-lg, potem same md 48/48, kolejność
   subtle/base ta sama). Tu nic nie trzeba równać.
2. **Podstrony nie mają jednej sekcji rodzica** (`PodstronyPowiazane`, renderowana tylko
   w `app/uslugi/[usluga]/page.tsx`). To zabiera im 3 karty, cały wariant ramki `inf-card-edge`
   i wszystkie 3 strzałki `.inf-arrow` na stronie. Efekt: **5 kart w 2 wariantach zamiast
   8 kart w 3 wariantach**. To jest największa część odczucia „struktura słabsza".
3. Każda wspólna sekcja tekstowa (2, 3, 4, 5) na podstronie jest WYŻSZA niż u rodzica.
   Sekcje na podstronach są dłuższe, ale mniej w nich rzeczy do patrzenia.

---

## 2. OBJĘTOŚĆ TREŚCI (rejestry, słowa/znaki)

Źródła: `lib/uslugi/voiceboty.ts` (rodzic) oraz `lib/uslugi/podstrony/{windykacja,
potwierdzanie-wizyt,odbieranie-telefonow}.ts`. Liczone bezpośrednio z pól rejestru.

| pole | rodzic | windykacja | potwierdzanie | odbieranie |
|---|---|---|---|---|
| kapsula | 65 sł / 442 zn | 48 / 368 | 57 / 370 | 52 / 370 |
| problem.tresc | 56 / 345 | **73 / 439** | **69 / 421** | **78 / 476** |
| rozwiazanie.tresc | 65 / 420 | **107 / 694** | **89 / 593** | **94 / 588** |
| kroki[0].opis | 21 / 137 | 24 / 151 | 23 / 147 | 25 / 167 |
| kroki[1].opis | 20 / 129 | **29 / 168** | 26 / 168 | **36 / 234** |
| kroki[2].opis | 16 / 121 | 18 / 130 | 19 / 141 | 18 / 137 |
| kroki RAZEM | 57 / 389 | **71 / 451** | **68 / 458** | **79 / 540** |
| ramaCeny.tresc | 78 / 518 | 67 / 449 | 69 / 458 | 68 / 457 |
| faq[0] | 44 / 304 | 42 / 286 | 36 / 250 | 39 / 250 |
| faq[1] | 50 / 343 | 36 / 223 | 29 / 194 | 32 / 167 |
| faq[2] | 36 / 192 | 32 / 172 | 29 / 200 | 27 / 183 |
| faq[3] | 32 / 225 | 30 / 203 | 32 / 172 | 26 / 155 |
| faq[4] | 29 / 194 | 36 / 216 | 32 / 225 | 36 / 216 |
| faq[5] | 64 / 419 | **51 / 326** | **52 / 330** | **54 / 355** |
| faq[6] | 36 / 216 | (brak) | (brak) | (brak) |
| faq RAZEM | 291 / 1899 (7 pyt.) | 227 / 1431 (6) | 210 / 1376 (6) | 214 / 1331 (6) |
| cta.mikrokopia | 14 / 97 | 20 / 127 | 18 / 107 | 19 / 111 |
| **SUMA mierzonych pól** | **612 / 4018** | **593 / 3837** | **562 / 3681** | **585 / 3767** |
| **SUMA bez FAQ** | **321** | **366 (+45)** | **352 (+31)** | **371 (+50)** |

### 2a. Ile ciąć, żeby zejść DO POZIOMU RODZICA (parytet, słowa)

| pole | windykacja | potwierdzanie | odbieranie |
|---|---|---|---|
| kapsula | już -17 pod rodzicem (0 do cięcia) | już -8 (0) | już -13 (0) |
| problem.tresc | **-17 sł** | **-13 sł** | **-22 sł** |
| rozwiazanie.tresc | **-42 sł** | **-24 sł** | **-29 sł** |
| kroki RAZEM | **-14 sł** | **-11 sł** | **-22 sł** |
| ramaCeny.tresc | już -11 pod rodzicem (0) | już -9 (0) | już -10 (0) |
| faq (średnia na pytanie) | 37,8 vs 41,6 (0) | 35,0 (0) | 35,7 (0) |
| cta.mikrokopia | **-6 sł** | **-4 sł** | **-5 sł** |
| **razem do parytetu** | **-79 sł** | **-52 sł** | **-78 sł** |

### 2b. Ile ciąć wg SPEC (-1/3 objętości, słowa)

| pole | windykacja: dziś → cel (ciąć) | potwierdzanie | odbieranie |
|---|---|---|---|
| kapsula | 48 → 32 (-16) | 57 → 38 (-19) | 52 → 35 (-17) |
| problem.tresc | 73 → 49 (-24) | 69 → 46 (-23) | 78 → 52 (-26) |
| rozwiazanie.tresc | 107 → 71 (-36) | 89 → 59 (-30) | 94 → 63 (-31) |
| kroki RAZEM | 71 → 47 (-24) | 68 → 45 (-23) | 79 → 53 (-26) |
| ramaCeny.tresc | 67 → 45 (-22) | 69 → 46 (-23) | 68 → 45 (-23) |
| faq RAZEM | 227 → 151 (-76) | 210 → 140 (-70) | 214 → 143 (-71) |

Kolizja do rozstrzygnięcia przed cięciem: **cel „-1/3" i cel „poziom rodzica" to dwie różne
liczby**. Kapsuła, rama ceny i FAQ są już KRÓTSZE niż u rodzica, więc cięcie ich o 1/3
zejdzie znacznie poniżej strony chwalonej. Rekomendacja: ciąć mocno tam, gdzie jest
nadwyżka (problem, rozwiązanie, kroki, mikrokopia CTA), a kapsułę/ramę ceny/FAQ tylko
delikatnie odchudzić z waty, bez pogoni za 33%.

### 2c. Konkretna wata namierzona w tekstach (do wycięcia bez straty faktu)

- `ramaCeny.tresc` we wszystkich 3 podstronach zaczyna się od „Cena jest ta sama co przy
  każdym naszym voicebocie." (8 sł): zdanie nie odpowiada na pytanie H2 „Ile kosztuje…".
  Odpowiedź (2500) jest dopiero w drugim zdaniu. Do przestawienia: liczba na początek.
- „zanim cokolwiek zamówisz" (3 sł) powtarza się w ramaCeny i w bloku pod kartą, który
  komponent `RamaCeny.tsx` dokleja na sztywno („Dokładną cenę poznasz na bezpłatnej
  diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów."). Czyli „Bez ukrytych kosztów"
  i „bezpłatna diagnoza" stoją na stronie DWA RAZY, raz z rejestru, raz z komponentu.
- „bo nie zostawiamy klientów samych z botem" (7 sł): powtórka w ramaCeny.tresc ORAZ w
  ostatnim FAQ na każdej podstronie.
- `rozwiazanie.tresc` windykacji (107 sł) ma dwa zdania mówiące to samo o granicach:
  „Tego, co drażliwe, nie mówi z siebie, bo to Ty ustawiasz, co bot może powiedzieć,
  a czego nie.": to samo wraca w FAQ „Co voicebot może powiedzieć o zadłużeniu?".
- `rozwiazanie.tresc` odbierania (94 sł) i potwierdzania (89 sł) kończą się dwoma zdaniami
  o braku połączeń wychodzących, a to samo zaprzeczenie stoi już w kapsule i w FAQ #1.
  Jedno wystąpienie w treści wystarczy (zaprzeczenie ZOSTAJE, tylko raz).
- `problem.tresc` w każdej podstronie ma rozbudowane wprowadzenie scenkowe (2 do 3 zdań),
  zanim padnie liczba lub konkret. Rodzic robi to w 1 zdaniu.
- `cta.mikrokopia`: podstrony mają 18 do 20 słów, rodzic 14.

### 2d. Tabela porównawcza: druga przyczyna wyższych sekcji (poza spec, do decyzji)

Wiersze są po 6 na każdej stronie, ale komórki na podstronach są dłuższe, więc łamią się
na 2 linie i sekcja rośnie o 79 do 132 px:

| | rodzic | windykacja | potwierdzanie | odbieranie |
|---|---|---|---|---|
| H2 tabeli (zn) | 43 | 51 | 54 | 49 |
| `cecha` średnio/max | 12 / 22 | 19 / 23 | 16 / 21 | **25 / 34** |
| `bez` średnio/max | 24 / 34 | 30 / 36 | 31 / 37 | 29 / 33 |
| `zNami` średnio/max | 30 / 38 | 35 / 41 | 38 / 43 | **37 / 44** |

---

## 3. RAMKI (computed, 1440)

### 3a. Warianty ramek i ich computed

| wariant | gdzie | rodzic | podstrony |
|---|---|---|---|
| `inf-card inf-card-quiet` | kroki (3 szt.) | `--card-c #2b7cff`, `--inf-corner-a 0%`, `--inf-top-a 0%`, border `rgba(255,255,255,.04)` 1px, radius 2px, `.inf-spotlight` TAK, `.inf-tile` TAK | **identycznie** na wszystkich 3 |
| `inf-card inf-card-top` | rama ceny + FAQ (2 szt.) | `--card-c #e438ff`, `--card-c-l #dc7aff`, `--inf-corner-a 22%`, `--inf-top-a 100%`, border `rgba(255,255,255,.07)`, radius 16px, spotlight TAK | windykacja i potwierdzanie **identycznie**; **odbieranie-telefonow: `--card-c #00f0ff`, `--card-c-l #61e9ff` (cyjan chatbotów, nie fiolet voicebotów)** |
| `inf-card inf-card-edge` | „Konkretne zastosowania" (3 szt.) | `--card-c #e438ff`, corner 0%, top 0%, border `rgba(255,255,255,.06)`, radius 16px, **spotlight NIE, `.inf-arrow` TAK** | **BRAK: podstrony nie mają tego wariantu w ogóle** |

Czyli: anatomia i wartości ramek są 1:1. Brakuje **wariantu** (`-edge`) i **koloru rodziny**
na jednej podstronie, a nie stylów.

### 3b. Anatomia hero

| element | rodzic | windykacja | potwierdzanie | odbieranie |
|---|---|---|---|---|
| badge `.inf-hero-badge` | TAK, `rgb(228,56,255)`, 10px, ls 2px | TAK, ten sam | TAK | TAK, ale `rgb(0,240,255)` |
| H1 z kolorowym członem `.inf-hero-word` | **1 szt.** `rgb(228,56,255)` | **0: BRAK** | **0: BRAK** | **0: BRAK** |
| chipy `.inf-hero-tag` (3) | TAK, fiolet | TAK, fiolet | TAK, fiolet | TAK, **cyjan** |
| kafle `.inf-hero-stat` | **4** | 4 | 4 | **3** |
| treść kafli | „od 2500 zł / PAKIET STARTOWY", „24/7 / GODZINY", „3 / KROKI WDROŻENIA", „7 / NAJCZĘSTSZYCH PYTAŃ" | „od 2500 zł / **VOICEBOT DO WINDYKACJI**", „24/7 / ODBIERANIE POŁĄCZEŃ", „3 / …", „6 / …" | „od 2500 zł / **VOICEBOT DO POTWIERDZANIA WIZYT**", „24/7 / TELEFON OD KLIENTA", „3", „6" | „od 2500 zł / **BOT DO ODBIERANIA TELEFONÓW**", **brak kafla 24/7**, „3", „6" |
| okruszki | 3 poziomy | 4 poziomy (Strona główna / Usługi / Voiceboty / H1) | 4 | 4 |
| CTA | „Pokaż mi, gdzie tracę czas" | to samo | to samo | „Policz moje nieodebrane telefony" |

Przyczyny w kodzie (`components/uslugi/ServiceHero.tsx`):
- mapa `H1_KOLOR` ma klucze tylko 10 usług: slugi podstron nie występują, więc `dzielH1()`
  zwraca `kolor: null` i H1 podstrony jest w całości `rgb(228,228,240)`, bez ani jednego
  kolorowego słowa. Rodzic ma kolorowy człon. To jest widoczne gołym okiem jako „słabszy hero".
- mapa `KAFEL_CENY` też nie zna slugów podstron, więc etykieta kafla ceny leci z fallbacku
  (`ramaCeny.h2` bez „Ile kosztuje"), stąd długie „VOICEBOT DO POTWIERDZANIA WIZYT" zamiast
  krótkiego „PAKIET STARTOWY" jak u rodzica. Kafel łamie się na 2 linie.
- 4. kafel („24/7") pojawia się tylko wtedy, gdy któryś wiersz `tabelaPorownawcza` ma w
  kolumnie `zNami` ciąg „24/7". `odbieranie-telefonow` ma tam „Odebrane i zapisane, też w
  nocy i w weekend": bez „24/7", więc kafel wypada i hero ma 3 pudełka zamiast 4.
- kolor cyjan na `odbieranie-telefonow`: produkcja stoi na starym kodzie
  (`INF_KATEGORIA[usluga.slug] ?? DEFAULT`), a ten slug nie ma wpisu w mapie, więc leci
  fallback `var(--accent)` = cyjan. **W drzewie roboczym jest już poprawka** (`dekorUslugi(slug, rodzic)`
  w `lib/inf-kategorie.ts` + przekazanie `rodzic` do `RamaCeny` i `ServiceFAQ`), tylko nie jest
  wdrożona. Po wdrożeniu ta podstrona zaświeci fioletem rodziny.

---

## 4. H1 i metaTitle

### 4a. Stan dzisiejszy (zmierzony, `text-wrap: balance`, H1 76px/83,6px na 1440 i 40px na mobile)

| strona | H1 | zn | 1440 (box 760px) | 375 (box 320px) | 320 (box 265px) |
|---|---|---|---|---|---|
| rodzic | Voicebot dla firmy, który odbiera telefon za Ciebie | 51 | **3 linie** [694, 497, 608] | 4 linie [244, 225, 297, 174] | 5 linii [178, 180, 261, 139, 174] |
| windykacja | Voicebot do windykacji, który odbiera telefon w sprawie płatności | 65 | **4 linie** [450, 638, 645, 655] | **6 linii** [237, 225, 261, 182, 155, 183] | **6 linii** (te same) |
| potwierdzanie | Voicebot do potwierdzania wizyt, który umawia i pilnuje terminów | 64 | **4 linie** [450, 529, 741, 643] | 5 linii [237, 279, 231, 304, 187] | **6 linii** [237, 279, 231, 169, 128, 187] |
| odbieranie | Bot telefoniczny, który odbiera telefon, gdy Ty nie możesz | 58 | **4 linie** [624, 497, 450, 494] | 5 linii [69, 253, 261, 237, 260] | 5 linii (te same) |

metaTitle (do tego doklejane jest ` · SimpleFast.ai`, 16 zn):

| strona | metaTitle w rejestrze | zn | w `<title>` | limit ~60 |
|---|---|---|---|---|
| rodzic | Voicebot od 2500 zł: bot telefoniczny 24/7 | 42 | 58 | OK |
| windykacja | Voicebot do windykacji: odbiera telefon 24/7 | 44 | 60 | OK (na styk) |
| potwierdzanie | Voicebot do potwierdzania wizyt: umawia 24/7 | 44 | 60 | OK (na styk) |
| odbieranie | Bot telefoniczny: odbiera połączenia 24/7 | 41 | 57 | OK |

metaTitle **nie wymaga zmian**: każdy zaczyna się od frazy głównej i mieści się w limicie.
Cięcie dotyczy tylko H1. metaDescription: 151 / 149 / 158 zn: też w normie.

### 4b. Propozycje krótszych H1 (zmierzone na żywej stronie przez podmianę tekstu w H1)

Warunek ze spec: fraza główna NA POCZĄTKU, zero nowych faktów. „24/7" jest faktem już
obecnym w metaTitle i w tabeli każdej z tych stron.

**windykacja** (fraza „voicebot do windykacji"):

| kandydat | zn | 1440 | 375 | 320 | ocena |
|---|---|---|---|---|---|
| dziś: …, który odbiera telefon w sprawie płatności | 65 | 4 lin | 6 lin | 6 lin | najgorszy |
| **Voicebot do windykacji, który odbiera telefon 24/7** | **50** | **3 lin** [450, 638, 752] | **4 lin** [237, 225, 261, 238] | **4 lin** (te same) | **REKOMENDACJA** |
| Voicebot do windykacji, który odbiera telefon | 45 | 3 lin | 4 lin, ostatnia 139 px | 4 lin, ostatnia 139 px | krótsza, ale krótka sierota w ostatniej linii |
| Voicebot do windykacji, który odbiera telefon za Ciebie | 55 | 4 lin | 5 lin | 5 lin | odpada |

**potwierdzanie-wizyt** (fraza „voicebot do potwierdzania wizyt"):

| kandydat | zn | 1440 | 375 | 320 | ocena |
|---|---|---|---|---|---|
| dziś: …, który umawia i pilnuje terminów | 64 | 4 lin | 5 lin | 6 lin | najgorszy |
| **Voicebot do potwierdzania wizyt 24/7** | **36** | **3 lin** [450, 529, 388] | **3 lin** [237, 279, 204] | **3 lin** [237, 279, 204] | **REKOMENDACJA** (jedyny kandydat 3/3/3, zero sierot) |
| Voicebot do potwierdzania wizyt za Ciebie | 41 | 3 lin | 3 lin | 4 lin, ostatnia 125 px | dobra druga opcja |
| Voicebot do potwierdzania wizyt, który umawia terminy | 53 | 4 lin | 4 lin | 5 lin | odpada |

**odbieranie-telefonow** (fraza „bot telefoniczny"):

| kandydat | zn | 1440 | 375 | 320 | ocena |
|---|---|---|---|---|---|
| dziś: …, który odbiera telefon, gdy Ty nie możesz | 58 | 4 lin | 5 lin | 5 lin | najgorszy |
| **Bot telefoniczny, który odbiera telefon 24/7** | **44** | **3 lin** [624, 497, 453] | **4 lin** [69, 253, 261, 238] | **4 lin** (te same) | **REKOMENDACJA** |
| Bot telefoniczny, który odbiera za Ciebie | 41 | 3 lin | 4 lin, ostatnia 174 px | 4 lin | ok |
| Bot telefoniczny odbiera telefon za Ciebie | 42 | 3 lin | 3 lin | **5 linii** | odpada (rozjazd na 320) |

Uwaga do „Bot telefoniczny": na 375 i 320 pierwsza linia to samo słowo „Bot" (69 px), bo
`text-wrap: balance` nie mieści „telefoniczny," (253 px) razem z „Bot". Występuje we
WSZYSTKICH wariantach zaczynających się tą frazą, więc to nie jest wina długości H1.
Fraza jest obowiązkowa, więc zostaje; do świadomej akceptacji.

Efekt uboczny każdej z 3 rekomendacji: hero traci 1 linię H1, czyli **-83,6 px** na 1440
i wraca do 3 linii jak u rodzica.

### 4c. Kolorowy człon H1 (dziś brak)

Po skróceniu H1 warto dopisać do mapy `H1_KOLOR` w `ServiceHero.tsx` 3 klucze
(wpisy per slug, nie dotykają 10 istniejących usług):
- `windykacja: 'który odbiera telefon 24/7'`
- `'potwierdzanie-wizyt': '24/7'`
- `'odbieranie-telefonow': 'który odbiera telefon 24/7'`

Fragment musi być DOKŁADNĄ końcówką H1, inaczej `dzielH1()` renderuje pełny H1 bez spanu
(bezpieczny fallback, więc ryzyko dla treści zerowe).

---

## 5. WNIOSKI: lista zmian per plik

### `lib/uslugi/podstrony/windykacja.ts`
1. `h1` → „Voicebot do windykacji, który odbiera telefon 24/7" (65 → 50 zn, 4 → 3 linie na 1440).
2. `problem.tresc` 73 sł → 46 do 49 sł: wyciąć scenkę wprowadzającą, zostawić zdanie
   odpowiadające wprost + wyliczenie powtarzalnych pytań.
3. `rozwiazanie.tresc` 107 sł → 65 do 71 sł (największa nadwyżka na całym zestawie, +65%
   nad rodzicem): usunąć zdanie o granicach (duplikat FAQ #2) i skrócić wyliczenie do
   jednego ciągu. Zaprzeczenie „nie dzwoni sam do dłużników" ZOSTAJE, ale raz.
4. `kroki[1].opis` 29 sł → ok. 20 sł (rodzic ma 20).
5. `ramaCeny.tresc`: przestawić 2500 zł na początek, wyciąć „Cena jest ta sama co przy
   każdym naszym voicebocie.", „zanim cokolwiek zamówisz" i „Bez ukrytych kosztów"
   (oba powtarza komponent `RamaCeny.tsx` pod kartą). Ceny 2500 / 99-599 zostają.
6. `cta.mikrokopia` 20 sł → 14 sł.
7. `tabelaPorownawcza`: skrócić `cecha` i `zNami` do długości rodzica (12 i 30 zn średnio),
   żeby wiersze nie łamały się na 2 linie (-79 px).

### `lib/uslugi/podstrony/potwierdzanie-wizyt.ts`
1. `h1` → „Voicebot do potwierdzania wizyt 24/7" (64 → 36 zn, 4 → 3 linie na 1440,
   3 linie także na 375 i 320: najlepszy wynik w całym zestawie).
2. `problem.tresc` 69 → 46 sł: zostawić jedno zdanie o pustej godzinie w grafiku,
   wyciąć dublujące się scenki.
3. `rozwiazanie.tresc` 89 → 59 do 65 sł: wyciąć końcowe dwa zdania o braku połączeń
   wychodzących (są już w kapsule i w FAQ #1), zostawić jedno.
4. `kroki[1].opis` 26 → 20 sł.
5. `ramaCeny.tresc` jak w windykacji (liczba na początek, wata precz).
6. `cta.mikrokopia` 18 → 14 sł.
7. `tabelaPorownawcza`: `zNami` średnio 38 zn → ok. 30 zn (-79 px).

### `lib/uslugi/podstrony/odbieranie-telefonow.ts`
1. `h1` → „Bot telefoniczny, który odbiera telefon 24/7" (58 → 44 zn, 4 → 3 linie na 1440).
2. `problem.tresc` 78 → 52 sł (największa nadwyżka w tym pliku).
3. `rozwiazanie.tresc` 94 → 63 sł: wyliczenie („godziny otwarcia, dojazd, zakres usług,
   orientacyjne ceny") zostaje, wyciąć powtórzone zdanie o braku połączeń wychodzących.
4. `kroki[1].opis` 36 sł → 20 sł (najdłuższy opis kroku w całym zestawie, rodzic ma 20).
5. `ramaCeny.tresc` jak wyżej; „2500 zł jednorazowo za wdrożenie" ZOSTAJE (to sformułowanie
   z dwóch modeli rozliczenia).
6. `cta.mikrokopia` 19 → 14 sł.
7. **`tabelaPorownawcza.wiersze[0].zNami`**: „Odebrane i zapisane, też w nocy i w weekend"
   → wersja zawierająca „24/7" (np. „Odbierane 24/7, też w nocy i w weekend", 1:1 jak u
   rodzica i u dwóch pozostałych podstron). To PRZYWRACA 4. kafel statystyk w hero i wyrównuje
   hero do rodzica. Zero nowego faktu: 24/7 stoi już w H1, metaTitle, kapsule i FAQ tej strony.
8. `tabelaPorownawcza.cecha`: średnio 25 zn (rodzic 12): skrócić, sekcja tabeli jest tu
   najwyższa z całego zestawu (860 px vs 728 px u rodzica).

### `components/uslugi/ServiceHero.tsx` (wspólny: zmiany tylko dopisujące klucze)
1. `H1_KOLOR`: dopisać 3 klucze podstron (patrz §4c). Mapa jest czytana po `slug`, więc
   10 stron usług nie zmienia się o piksel.
2. `KAFEL_CENY`: dopisać 3 klucze `{ prefiks: 'od ', opis: 'pakiet startowy' }`, żeby kafel
   ceny miał krótką etykietę jak u rodzica zamiast długiej z fallbacku. To samo zastrzeżenie:
   mapa po `slug`, zero wpływu na 10 usług.

### Decyzje do podjęcia przed budową (nie robię ich sam)
1. **Sekcja „Konkretne zastosowania" (`inf-card-edge` x3 + strzałki) jest tylko u rodzica.**
   Podstrony nie mają jej z definicji (`PodstronyPowiazane` renderuje się tylko dla usług,
   które mają podstrony). Żeby wyrównać liczbę kart i wariantów ramek, trzeba by dać
   podstronom własną sekcję z linkami do dwóch sióstr + rodzica. To NOWA sekcja na podstronie
   (dane z istniejących rejestrów, zero nowych zdań), więc wymaga zgody Pawła.
2. **Kolor `odbieranie-telefonow`**: poprawka jest już w drzewie roboczym, ale niezacommitowana
   i niewdrożona. Do wypchnięcia razem z tą rundą, inaczej podstrona dalej świeci cyjanem.
3. **Dwa modele rozliczenia**: wszystkie 3 podstrony (i rodzic, i chatboty) mówią „Każde
   wdrożenie ma abonament opieki od 99 do 599 zł miesięcznie". To sprzeczne z zasadą
   „przekazanie infrastruktury = bez abonamentu / opieka u nas = 99-599". Zdanie „bez
   abonamentu" żyje dziś tylko w `lib/agent/knowledge.ts`, nie w rejestrze usług. Poprawienie
   tego na podstronach rozjedzie je z rodzicem, więc to osobna decyzja zakresowa.
4. **FAQ**: podstrony mają 6 pytań, rodzic 7. Kafel hero pokazuje tę liczbę („6" vs „7").
   Jeśli parytet z rodzicem ma być pełny, brakuje jednego pytania; jeśli priorytetem jest
   cięcie objętości, zostaje 6.

---

## Załącznik: dowody

Wszystkie liczby w tym raporcie pochodzą z pomiaru, nie z oszacowania. Surowe wyniki:
- struktura + wysokości + H1 na 3 szerokościach: `v20-a-struktura.json`
- objętość pól rejestru: `v20-b-objetosc.json`
- hero, kafle, kandydaci H1: `v20-c-h1-hero.json`, `v20-c2-h1.json`
- computed ramek i hero: `v20-d-ramki.json`

(katalog: `C:\Users\PAWEPI~1\AppData\Local\Temp\claude\C--Users-Pawe--Pieloch-CLAUDE-CODE-SF-AI-WWW\e0553296-dc11-4e04-9c4d-4857387a59d6\scratchpad`)

NIEZWERYFIKOWANE: propozycje H1 mierzyłem podmieniając tekst w żywym DOM produkcji, a nie
w zbudowanej stronie z nowego rejestru. Łamanie liczone przy `text-wrap: balance`, czyli
tak jak renderuje przeglądarka Pawła; po zmianie rejestru trzeba to powtórzyć na buildzie.
