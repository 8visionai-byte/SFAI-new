# Pomiary v18: paleta z próbnika Pawła + tło #05050C

Data: 2026-08-17. Rola: zwiad pomiarowy (zero edycji kodu, zero buildów, zero commitów).
Spec: `spec-v18.md` (scratchpad). Mierzone na PRODUKCJI `https://www.simplefast.ai/`.

Skrypty pomiarowe (scratchpad sesji):
`v18-math.mjs` (matematyka złożeń), `v18-tlo-ab.mjs` (A/B tła na produkcji),
`v18-kandydaci-2.mjs` (pierścień kandydatów na żywej karcie).

---

## 0. METODA I WALIDACJA (czytaj przed tabelami)

### 0.1 Dlaczego są dwie kolumny liczb i która rozstrzyga

Liczby w tym raporcie występują w dwóch rodzajach i **nie wolno ich mylić**:

| rodzaj | co to jest | do czego służy |
|---|---|---|
| **karta (liczona)** | kontrast hexu na PŁASKIM złożeniu gradientu karty nad tłem strony | szybkie sito, porównania hex-do-hexu |
| **pierścień p90 (mierzona)** | kontrast liter do realnych pikseli tła 1-3px od glifu, na żywej stronie, z poświatą i tintem pigułki | **TO ROZSTRZYGA** (żelazna zasada spec) |

Pierścień wychodzi systematycznie **niżej** od liczonej karty, bo wokół liter
siedzi własna poświata koloru (jarzeniówka 60/30 na overline, tint 12% + ogon
14px/30% na pigułce taga). Dla fioletu v17 różnica to 5,88 (karta) kontra
4,92 (pierścień p90), czyli **0,96 w dół**. Kto policzy tylko płaskie tło,
przeszacuje paletę o prawie cały punkt kontrastu.

### 0.2 Złożenia tła (policzone, `v18-math.mjs`)

Gradient karty to `linear-gradient(160deg, rgba(12,13,28,.74), rgba(9,10,22,.55))`
przy `background-color: transparent` (v15 zdjęło czerń 10%). Interpolacja
w alfie premultiplied, tak jak liczy CSS.

| punkt | nad #06060c | nad #05050C |
|---|---|---|
| tło strony | rgb(6,6,12) L=0,001955 | rgb(5,5,12) L=0,001674 |
| karta góra (t=0, alfa .74) | rgb(10,11,24) L=0,003762 | rgb(10,11,24) L=0,003685 |
| karta środek (t=0,5) | rgb(9,10,21) L=0,003216 | rgb(9,9,21) L=0,003116 |
| karta dół (t=1, alfa .55) | rgb(8,8,18) L=0,002694 | rgb(7,8,18) L=0,002568 |
| mgławica violet 8% | rgb(17,13,31) | rgb(16,12,31) |
| panel dropdownu .92 | rgb(16,16,37) | rgb(16,16,37) |

Uwaga: **karta góra rgb(10,11,24) to dokładnie „tło wymogu >=4,8" z konwencji
v10/v17**, czyli najjaśniejszy, a więc najgorszy punkt karty. Spec v18 prosił
o środek karty; podaję oba, ale werdykty stawiam na górze karty, żeby zostać
w jednej konwencji z v10/v17 i nie zafałszować porównania między rundami.

### 0.3 Walidacja sondy (bramka)

Sonda pierścieniowa odtworzyła **#e438ff na pigułce taga = 5,11/5,05**, wobec
udokumentowanych w `pomiary-v17.md` **5,10/5,05**. Zgodność co do drugiego
miejsca po przecinku, więc metoda jest ta sama co w v17 i liczby są porównywalne
między rundami.

### 0.4 Pułapka, w którą wpadł pierwszy przebieg (zapisane, żeby nikt nie powtórzył)

Reguła ogona pigułki taga jest scopowana **selektorem atrybutu**:

```css
.inf-card[style*='#e438ff'] .inf-tag.inf-tag-kolor { text-shadow: 0 0 14px rgba(228,56,255,.3); }
```

Podmiana `--card-c` przez `style.setProperty()` zmienia atrybut `style`, więc
selektor **przestaje łapać** i kandydat dostaje pełną jarzeniówkę 60/30 zamiast
samego ogona. Pierwszy przebieg porównywał więc odniesienie w reżimie v17
z kandydatami w reżimie sprzed v17 i zaniżał je o ok. 1,0-1,4. Poprawka:
wstrzyknięty styl, który daje ogon 14px/30% pochodzący z `var(--card-c)`
dla karty-sondy, więc wszyscy kandydaci (łącznie z odniesieniem) siedzą
w identycznym reżimie. Wszystkie tabele niżej pochodzą z przebiegu poprawionego.

**To jest też ostrzeżenie wdrożeniowe:** jeżeli v18 zmieni hex fioletu, ta reguła
(globals.css:3576 i 4417) przestanie działać sama z siebie, bo ma hex wpisany
w selektor. Trzeba ją przepisać razem z paletą, inaczej pigułka taga wróci
na pełne 60/30 i spadnie pod próg.

---

## 1. KONTRASTY KANDYDATÓW Z PRÓBNIKA

Nośnik: żywa karta na produkcji (`VOICE / Voicebot dla firmy...` oraz karta
`Test gotowości...` dla podtytułu), tło strony ustawione na **#05050C**.
Mierzone trzy elementy tekstowe: overline (jarzeniówka 60/30), pigułka taga
(tint 12% + ogon 14px/30%), podtytuł karty. `MIN p90` = najgorszy z całej trójki.

| hex | HSL | karta (liczona) | overline med/p90 | tag med/p90 | sub med/p90 | **MIN p90** | **WERDYKT** |
|---|---|---|---|---|---|---|---|
| **#39FF14** zieleń | hsl(111 100 54) | 14,43 | 11,49/10,11 | 10,75/10,51 | 12,10/10,64 | **10,11** | **TEKST OK** |
| **#00D3FF** cyjan jasny | hsl(190 100 50) | 10,95 | 9,05/8,15 | 8,62/8,47 | 9,52/8,54 | **8,15** | **TEKST OK** |
| **#02C5D3** cyjan | hsl(184 98 42) | 9,25 | 7,77/7,10 | 7,46/7,30 | 8,15/7,38 | **7,10** | **TEKST OK** |
| **#F56601** pomarańcz | hsl(25 99 48) | 6,32 | 5,60/5,23 | 5,44/5,37 | 5,80/5,42 | **5,23** | **TEKST OK** |
| **#9E22E6** fiolet | hsl(278 **80** 52) | 3,56 | 3,33/3,19 | 3,28/3,24 | 3,40/3,28 | **3,19** | **TYLKO RAMKA/GLOW** |
| **#8600FF** fiolet grad. | hsl(272 100 50) | 3,22 | 3,06/2,96 | 3,02/3,00 | 3,11/3,01 | **2,96** | **ZA CIEMNY** |
| **#2500FF** niebieski | hsl(249 100 50) | 2,35 | 2,28/2,23 | 2,27/2,26 | 2,31/2,26 | **2,23** | **ZA CIEMNY** |

Progi: TEKST OK >=4,5 (AA), z zapasem >=4,8 (wymóg wewnętrzny v17).
TYLKO RAMKA/GLOW = 3,0-4,49 (zdaje 1.4.11 dla elementów nietekstowych, nie zdaje dla tekstu).
ZA CIEMNY = <3,0 (nie zdaje nawet jako obwódka wskaźnika).

**Cztery z siedmiu hexów Pawła przechodzą na tekście. Trzy nie, i wszystkie trzy
to rodzina fiolet-niebieski.**

### Odniesienia v17 zmierzone tą samą sondą w tym samym przebiegu

| hex v17 | rola | MIN p90 |
|---|---|---|
| #00f0ff | cyan baza | 9,70 |
| #61edff | cyan odcień | 9,72 |
| #ffc120 | amber odcień | 8,68 |
| #00e096 | green baza | 8,33 |
| #ffa101 | amber baza | 7,35 |
| #70b0ff | blue odcień | 6,66 |
| #dc7aff | violet jasny | 6,06 |
| #ff00e5 | magenta odcień | 5,12 |
| **#e438ff** | **violet baza** | **4,92** (najsłabszy w palecie) |
| #29ff77 | green odcień | 10,15 |

---

## 2. PORÓWNANIE PER KATEGORIA I REKOMENDACJA

Wszystkie liczby to `MIN p90` z pierścienia na #05050C.

| rola | obecny v17 | HSL | ring | kandydat | HSL | ring | jaśniejszy | bardziej nasycony | **REKOMENDACJA** |
|---|---|---|---|---|---|---|---|---|---|
| **zieleń baza** (automatyzacje, opieka-ai, apka-obecności) | #00e096 | 160/100/44 | 8,33 | **#39FF14** | 111/100/54 | **10,11** | **kandydat** (L 44→54) | remis (oba 100) | **PODMIENIĆ na #39FF14** |
| **cyjan baza** (chatboty, strony-www, optymalizacja, poradniki, centrum-dowodzenia, kalkulator) | #00f0ff | 184/100/50 | **9,70** | #02C5D3 | 184/98/42 | 7,10 | **obecny** (L 50→42) | **obecny** (100 vs 98) | **ZOSTAWIĆ #00f0ff** |
| " | #00f0ff | 184/100/50 | **9,70** | #00D3FF | 190/100/50 | 8,15 | **obecny** (ta sama L, H190 mniej lumy) | remis | **ZOSTAWIĆ #00f0ff** |
| **pomarańcz baza** (dokumenty-faktury, audyt-ai, materiały, skaner-faktur) | #ffa101 | 38/100/50 | **7,35** | #F56601 | 25/99/48 | 5,23 | **obecny** (L 50→48, H 38→25) | **obecny** (100 vs 99) | **ZOSTAWIĆ #ffa101** |
| **fiolet baza** (voiceboty, rozwiązania, ai-radar, test-gotowości) | #e438ff | 292/100/61 | **4,92** | #9E22E6 | 278/**80**/52 | 3,19 | **obecny** (L 61→52) | **obecny** (100 vs **80**) | **ZOSTAWIĆ #e438ff** |
| " | #e438ff | 292/100/61 | **4,92** | #8600FF | 272/100/50 | 2,96 | **obecny** (L 61→50) | remis | **ZOSTAWIĆ #e438ff** |
| **niebieski odcień** (strony-www) | #70b0ff | 213/100/72 | **6,66** | #2500FF | 249/100/50 | 2,23 | **obecny** (L 72→50) | remis | **ZOSTAWIĆ #70b0ff** |

### Mapowanie do wdrożenia (jedna zmiana, nie sześć)

```
#00e096 -> #39FF14    hsl(160 100 44) -> hsl(111 100 54)   ring 8,33 -> 10,11
```

**KOMPLETNA lista wystąpień `#00e096`** (`git grep` po `*.ts *.tsx *.css`
z wyłączeniem `raporty/`; policzone, nie oszacowane):

| # | plik:linia | kontekst | podmieniać? |
|---|---|---|---|
| 1 | `lib/inf-kategorie.ts:132` | `automatyzacje.c` | **tak** |
| 2 | `lib/inf-kategorie.ts:135` | `opieka-ai.c` | **tak** |
| 3 | `lib/inf-kategorie.ts:168` | `apka-obecnosci-skladek.c` | **tak** |
| 4 | `lib/inf-kategorie.ts:181` | `kalkulator-procesu.c` | **tak** |
| 5 | `app/wiedza/page.tsx:123` | `'case-studies'` (lokalna mapa dekoru huba) | **tak** |
| 6 | `components/sections/Problem.tsx:76` | `c: '#00e096'` | **tak** |
| 7 | `components/sections/Rozwiazanie.tsx:72` | `c: '#00e096'`, kafel „Przepisuje dane" | **tak** |
| 8 | `app/globals.css:277` | **`--success: #00e096`** | **NIE, patrz niżej** |

Do tego 3 komentarze opisowe (`globals.css:194, 275`, `inf-kategorie.ts:68`,
`Rozwiazanie.tsx:49, 52`) do aktualizacji tekstu.

**Pozycja 8 to pułapka.** `--success` nie jest kolorem kategorii, tylko tokenem
semantycznym stanu (komunikat „udało się"). Dzieli dziś hex z zielenią dekoracyjną
przez zbieg okoliczności po F4, nie z projektu. Jeżeli podmiana pójdzie
bezmyślnym „zamień wszystkie", **stan sukcesu zrobi się limonkowy** i przestanie
czytać się jak zieleń potwierdzenia. Rekomendacja: `--success` zostawić
na `#00e096`, a w komentarzu dopisać, że od v18 to już nie jest ten sam hex
co zieleń dekoracyjna.

Czyli realnie: **7 podmian dekoracyjnych, token `--success` nietknięty.**

Uwaga na sąsiedztwo: odcień zieleni to dziś `#29ff77` hsl(142 100 58).
Po podmianie bazy na H111 para baza/odcień to H111/H142, czyli 31 stopni
rozjazdu (dziś 160/142 = 18 stopni). Rozjazd rośnie, więc kafle nie zleją się
w jeden ton, ale para przestaje wyglądać jak „ten sam kolor dwa razy" i staje
się bardziej limonka + mięta. Jeśli to ma być para jak cyjan 184/187, odcień
trzeba przesunąć w okolice H120-125 (np. **#7BFF5C** hsl(111 100 68), ta sama
barwa co nowa baza, ring liczony na karcie 17,0, czyli z ogromnym zapasem).
To decyzja estetyczna Pawła, nie wymóg kontrastu.

---

## 3. HEXY NIEPRZECHODZĄCE: O ILE PODNIEŚĆ L

Sweep zmierzony pierścieniem na żywej karcie (H bez zmian, S=100, rośnie samo L),
tło #05050C. Szukany próg: **MIN p90 >= 4,80**.

### #9E22E6, hue 278

| L | hex | MIN p90 |
|---|---|---|
| 52 (oryginał, S=80) | #9E22E6 | 3,19 |
| 60 | #B433FF | 3,92 |
| 64 | #BC47FF | 4,32 |
| 66 | #BF52FF | 4,56 (AA styk) |
| 67 | #C157FF | 4,70 |
| **68** | **#C35CFF** | **4,84 ✓** |
| 72 | #CB70FF | 5,47 |

**Namiastka: `#C35CFF` = hsl(278 100 68). Podnieść L o 16 pp i S o 20 pp.**

### #8600FF, hue 272

| L | hex | MIN p90 |
|---|---|---|
| 50 (oryginał) | #8600FF | 2,96 |
| 64 | #A947FF | 4,01 |
| 68 | #B35CFF | 4,57 (AA styk) |
| 69 | #B561FF | 4,72 |
| **70** | **#B866FF** | **4,88 ✓** |
| 71 | #BA6BFF | 5,05 |

**Namiastka: `#B866FF` = hsl(272 100 70). Podnieść L o 20 pp.**

### #2500FF, hue 249

| L | hex | MIN p90 |
|---|---|---|
| 50 (oryginał) | #2500FF | 2,23 |
| 68 | #745CFF | 3,76 |
| 72 | #8670FF | 4,47 |
| 73 | #8A75FF | 4,66 (AA styk) |
| **74** | **#8E7AFF** | **4,85 ✓** |
| 75 | #9380FF | 5,12 |

**Namiastka: `#8E7AFF` = hsl(249 100 74). Podnieść L o 24 pp.**

### Co z tego wynika

| oryginał | namiastka >=4,8 | skok L | czy warto |
|---|---|---|---|
| #9E22E6 | #C35CFF | +16 pp | **nie**, kontrast 4,84 jest GORSZY niż obecny #e438ff (4,92), a barwa cofa się z H292 do H278, czyli tam, skąd v17 świadomie uciekło |
| #8600FF | #B866FF | +20 pp | **nie**, 4,88 kontra 4,92 obecnego, przy barwie jeszcze dalej od magenty (H272) |
| #2500FF | #8E7AFF | +24 pp | **nie na tekst**, po podniesieniu o 24 pp to bladolawendowy barwinek, zero z „mocnego granatu" próbnika; obecny #70b0ff ma 6,66 |

**Wniosek: żadna namiastka nie bije obecnej palety.** Wszystkie trzy hexy Pawła
z rodziny fiolet-niebieski nadają się natomiast na **ramkę, poświatę, stop
gradientu i tło elementu**, gdzie próg tekstowy nie obowiązuje. Tam wchodzą
jako oryginały, bez podnoszenia L, i tam realnie dodadzą „jarzenia".

Jedna anomalia pomiarowa do odnotowania: w przebiegu zawężonym `#C35CFF`
na samej pigułce taga dał 5,93/5,90 zamiast 5,03/4,96 z przebiegu szerokiego
(overline i sub odtworzyły się co do setnej w obu). Wygląda na artefakt
odświeżenia klatki. MIN p90 i tak niesie overline (4,84), więc werdykt się
nie zmienia, ale gdyby ktoś wracał do tego hexu, warto go przemierzyć.

---

## 4. TŁO #06060c -> #05050C

### 4.1 Pomiar A/B na produkcji (`v18-tlo-ab.mjs`)

To samo drzewo DOM, dwa przebiegi: A = produkcja jak stoi, B = wstrzyknięte
`--bg:#05050C` plus `background-color` na `html/body`. Kontrola potwierdziła
podmianę: `body = rgb(5,5,12) / --bg=#05050C`.

| element | kolor tekstu | mediana A -> B | p90 A -> B | delta p90 |
|---|---|---|---|---|
| overline fioletowy | #e438ff | 5,212 -> 5,228 | 4,889 -> 4,906 | **+0,017** |
| sub fioletowy | #e438ff | 5,366 -> 5,410 | 5,029 -> 5,072 | **+0,043** |
| tag fioletowy (pigułka) | #e438ff | 5,106 -> 5,106 | 5,053 -> 5,053 | **+0,000** |
| status (kropka + mono) | #00f0ff | 11,754 -> 12,084 | 10,314 -> 10,890 | **+0,576** |
| overline cyjanowy | #00f0ff | 10,801 -> 10,920 | 9,194 -> 9,194 | **+0,000** |
| overline muted | #7a7a9e | 4,892 -> 4,919 | 4,866 -> 4,899 | **+0,033** |
| lead muted | #7a7a9e | 4,913 -> 4,940 | 4,890 -> 4,940 | **+0,050** |

**Odpowiedź na pytanie ze spec: TAK, wszystkie rosną albo stoją. Żaden nie spada.**
(Jedyna wartość ujemna w całym zbiorze to -0,001 na jednym p90 w przebiegu
wstępnym, czyli szum zaokrąglenia poniżej rozdzielczości metody.)

Zysk jest jednak **kosmetyczny, nie ratunkowy**: +0,02 do +0,05 na typowym
tekście. Tam, gdzie tekst siedzi na własnym tincie (pigułka taga) albo na
mocnej poświacie, zysk to okrągłe zero, bo tło strony w ogóle nie dochodzi
do pierścienia. Największy zysk (+0,576) złapał status, bo jego glify są
rzadkie i pierścień faktycznie widzi tło.

Najsłabszy tekst całej strony to `--fg-muted #7a7a9e`: **4,866 -> 4,899 (p90)**.
Dalej nad progiem 4,5, ale to jest ten element, który zjada cały zapas.

Liczone potwierdzenie (`v18-math.mjs`, na gołym tle strony): #7a7a9e 4,913 -> 4,940,
#e438ff 6,071 -> 6,104, #00f0ff 14,347 -> 14,425. Na karcie delty spadają
do +0,007..+0,020, bo gradient .74 przykrywa 74 procent zmiany.

### 4.2 KOMPLETNA lista miejsc z #06060c

Policzone `git grep` po `*.css *.ts *.tsx *.json *.js *.mjs *.webmanifest *.html`
z wyłączeniem `raporty/`. **Rozdzielone na wartości ŻYWE i komentarze**, bo
z 36 trafień tylko 7 to realne deklaracje.

#### A. Tło strony: TO PODMIENIĆ (2 miejsca)

| plik:linia | deklaracja | rola |
|---|---|---|
| `app/globals.css:202` | `--bg: #06060c;` | tło globalne `:root, [data-theme='dark']` |
| `app/globals.css:801` | `--bg: #06060c;` | tło lokalne `.surface-tech` (v8 zrównane z globalnym) |

#### B. Ciemny atrament NA JASNYM, czyli NIE tło strony (5 miejsc)

To tekst kładziony na cyjanie albo na bieli. Podmiana na #05050C jest
nieszkodliwa (kontrast rośnie o ułamek), ale **nie jest częścią zadania**
i miesza dwie różne role tego samego hexu. Rekomendacja: **zostawić**,
albo podmienić świadomie i opisać jako osobną decyzję.

| plik:linia | deklaracja | rola |
|---|---|---|
| `app/globals.css:215` | `--fg-on-accent: #06060c;` | tekst na cyjanie |
| `app/globals.css:236` | `--accent-contrast: #06060c;` | tekst na CTA |
| `app/globals.css:3896` | `color: #06060c;` | `.inf-glow-cta-solid:hover` (tło białe) |
| `app/globals.css:4829` | `color: #06060c;` | hover CTA hero (tło białe) |
| `components/uslugi/ServiceHero.tsx:243` | `'--accent-contrast': '#06060c'` | inline, tekst na kolorze usługi |

#### C. Sam komentarz, zero wpływu na render (24 miejsca)

`app/globals.css` linie 183, 186, 192, 228, 230, 268, 800, 2327, 2598, 2613,
2621, 2664, 2810, 3016, 3330, 3823, 3878, 3935, 4068, 4900;
`components/agent/flow-core.css:26`; `components/sections/BranzeDemo.tsx:197`;
`components/sections/PasekZaufania.tsx:18`; `components/ui/Section.tsx:31,37`;
`components/uslugi/ServiceHero.tsx:46`; `lib/inf-kategorie.ts:38,61`;
`STATUS.md:412,440`.

Te trzeba przejrzeć **przy okazji**, bo po zmianie tła staną się nieprawdziwe
(opisują kontrasty policzone na #06060c). To nie jest podmiana wartości, tylko
aktualizacja dokumentacji w komentarzach, i powinna iść w tym samym commicie.

#### D. Meta theme-color: UWAGA, to NIE jest #06060c

| plik:linia | wartość | uwaga |
|---|---|---|
| `app/layout.tsx:80` | `themeColor: '#06070d'` | **inny hex niż `--bg`**, rozjazd istnieje już dziś |

Projekt **nie ma** `manifest.json` ani `.webmanifest` (sprawdzone: `app/` zawiera
tylko `icon.png` jako ikonę). Nie ma też `tailwind.config` z zaszytym tłem
(`--bg` jedzie wyłącznie tokenem CSS). Jeżeli tło ma być spójne, `themeColor`
też powinien zejść na `#05050C`, i to jest **trzecie miejsce podmiany**.

#### E. Złożenia rgb(6,6,12) w komentarzach

`app/globals.css:2320, 2358, 2367, 2384, 3237, 4074` oraz `components/ui/Card.tsx:16`
opisują wyniki złożeń nad starym tłem. Też do aktualizacji opisowej.
Żywe `rgba(6,6,12,...)` jako wartość: **brak** (v15 zdjęło tę warstwę).

### 4.3 Znalezisko poboczne: sieroty palety na produkcji

Zrzut `--card-c` ze wszystkich kart na home pokazuje hexy, których **nie ma**
w `lib/inf-kategorie.ts` i które nie przeszły kalibracji v17:

| hex | ile kart | gdzie żyje |
|---|---|---|
| `#dc7aff` | 8 | rejestr (OK) |
| `#00f0ff` | 7 | rejestr (OK) |
| `#ffa101` | 7 | rejestr (OK) |
| `#e438ff` | 4 | rejestr (OK) |
| `#70b0ff` | 4 | rejestr (OK) |
| `#61edff` | 4 | rejestr (OK) |
| `#29ff77` | 4 | rejestr (OK) |
| `#00e096` | 3 | rejestr (OK) |
| **`#2b7cff`** | **3** | `app/uslugi/architekci-wartosci-ai/page.tsx:357` + `--route-gradient` globals:333 |
| **`#22e06b`** | **2** | `app/uslugi/architekci-wartosci-ai/page.tsx:391` + globals:333, 2300, 4738 |
| `#ffc120` | 2 | rejestr (OK) |
| **`#8b5cf6`** | **2** | `--accent-2` globals:241, 392 |
| **`#ff67b7`** | **1** | `components/sections/CytatyWalec.tsx:47, 111` |
| **`#22d3ee`** | **1** | globals (stary cyjan sprzed v8b) |

Pięć hexów sprzed v17 dalej maluje karty na produkcji. Spec v18 pkt 2 mówi
wprost o „inline w TSX + wyjątki w globals.css", więc **to jest ta lista**.
`#ff67b7` to dokładnie ten róż, który v10 zastąpiło magentą `#ff00e5`
w rejestrze, ale w `CytatyWalec.tsx` został zahardkodowany osobno i migracja
go ominęła.

---

## 5. PARY GRADIENTOWE DLA TYPU D (pasek górny)

Typ D = `.inf-card-top` + `--card-c-alt` inline. Pasek to
`linear-gradient(90deg, transparent, card-c, card-c-alt, transparent)`
przy alfie 100%, plus łuna radialna 10% biorąca pierwszy stop.
**To dekoracja, próg 4,5 nie obowiązuje** (WCAG 1.4.11 nie dotyczy czystej
ozdoby), ale liczby notuję zgodnie z poleceniem.

### Stan dzisiejszy (`components/sections/Rozwiazanie.tsx:53-80`)

| kafel | stop 1 | stop 2 | ring/karta stop 1 | karta stop 2 |
|---|---|---|---|---|
| Odbiera telefon | #dc7aff | #ff00e5 | 6,06 | 5,95 |
| Odpisuje klientom | #00f0ff | **#39ff14** | 9,70 | 14,43 |
| Przepisuje dane | #00e096 | #00f0ff | 8,33 | 13,88 |
| Pilnuje follow-upów | #ffa101 | **#ff6b00** | 7,35 | 6,85 |

Warto zauważyć: **dwa hexy próbnika już tam siedzą**. `#39ff14` jest stopem
drugim kafla chatbotowego od v13, a `#ff6b00` hsl(25 100 50) to praktycznie
`#F56601` hsl(25 99 48), ta sama barwa, różnica 2 pp jasności. Paweł
wypróbkował kolory, które częściowo już mamy.

### 4 propozycje par z próbnika

| # | para | HSL | karta stop 1 / stop 2 | dH | komentarz |
|---|---|---|---|---|---|
| **D1** | **#F56601 -> #FFC120** | 25/99/48 -> 43/100/56 | 6,32 / 12,02 | 18 | pomarańcz do złota, czyli dokładnie „odcień żółtego, pomarańczowego, po czerwony" z cytatu. Podmienia dzisiejsze `#ffa101 -> #ff6b00` na wersję z próbnika i rozjaśnia w prawo zamiast przyciemniać |
| **D2** | **#8600FF -> #00D3FF** | 272/100/50 -> 190/100/50 | 3,22 / 10,95 | 81 | para 180deg 1:1 z próbnika. Najmocniejszy skok barwy w zestawie, fiolet wchodzi tu jako czysty oryginał, bo pasek nie jest tekstem |
| **D3** | **#2500FF -> #00D3FF** | 249/100/50 -> 190/100/50 | 2,35 / 10,95 | 58 | granat do cyjanu. Jedyne sensowne miejsce dla `#2500FF` w całym projekcie: na tekście ma 2,23, na pasku 1px jego ciemność czyta się jako głębia, nie jako wada |
| **D4** | **#39FF14 -> #02C5D3** | 111/100/54 -> 184/98/42 | 14,43 / 9,25 | 73 | limonka do turkusu. Zjada trzy hexy próbnika naraz i jest naturalnym paskiem dla kafla automatyzacji po podmianie bazy zieleni z pkt 2 |

Pary odrzucone: `#9E22E6 -> #F56601` (dH 253, obrót przez pół koła barw daje
brudny przelot przez czerwień w środku paska) oraz `#2500FF -> #8600FF`
(dH 23, oba ciemne, pasek zlewa się w jedną plamę o kontraście 2,3-3,2
do korpusu karty, czyli praktycznie niewidoczny).

**Sąsiedztwo:** D2 i D3 dzielą stop drugi `#00D3FF`, więc nie wolno ich dać
na sąsiadujące kafle w jednej siatce. D1 i D4 są rozdzielne od wszystkiego.

---

## 6. PODSUMOWANIE DLA WDROŻENIA

| pytanie ze spec | odpowiedź zmierzona |
|---|---|
| Które hexy próbnika zdają na tekście? | #39FF14, #00D3FF, #02C5D3, #F56601 (4 z 7) |
| Które nie? | #9E22E6 (3,19), #8600FF (2,96), #2500FF (2,23) |
| Fiolet: #9E22E6 czy #8600FF? | **żaden** na tekst; oba jako ramka/glow/stop gradientu |
| Namiastki >=4,8 | #C35CFF (H278 L68), #B866FF (H272 L70), #8E7AFF (H249 L74) |
| Czy namiastka bije #e438ff (4,92)? | **nie**, żadna (4,84 / 4,88 / 4,85) |
| Czy #F56601 jest ciemniejszy od #ffa101? | **tak** (5,23 kontra 7,35) -> zostawić #ffa101, zgodnie ze spec |
| Czy #05050C podnosi kontrasty? | **tak, wszystkie rosną lub stoją**, ale o +0,02..+0,05, nie o punkt |
| Ile miejsc do podmiany tła? | **3 żywe** (globals:202, globals:801, layout.tsx:80) + 5 opcjonalnych + 24 komentarze |
| Realna podmiana palety | **jedna**: `#00e096 -> #39FF14` (zieleń), **7 wystąpień dekoracyjnych**; token `--success` NIE rusza |

---

## 7. OBIEKCJE

Zgodnie z poleceniem: co w spec jest sprzeczne z pomiarem albo z zasadami repo.

### O1. Mapowanie fioletu na próbnik cofa kalibrację v17

Spec pkt 2 każe przemapować fiolet na `#9E22E6` lub `#8600FF`. Pomiar mówi,
że oba są nie do użycia na tekście, a namiastki są gorsze od tego, co mamy.
Ale problem jest głębszy niż kontrast: **`#9E22E6` ma H278, a v17 świadomie
przesunęło fiolet z H278 na H292**, bo Paweł powiedział „fioletowy jest blady,
ktoś inny ma ten mocny różowo-fioletowy odcień", a zmierzone piksele wzorca
dały cel H288-304. Podmiana na próbnik to powrót dokładnie do hue, który
został odrzucony jako blady jedną rundę wcześniej.

Dodatkowo **`#9E22E6` ma S=80**, czyli łamie regułę „nasycenie stuprocentowe"
z F4 i z własnego cytatu Pawła w tym samym spec („nasycenie koloru
stuprocentowe... gradient jest maksymalny i nasycenie maksymalne"). To jedyny
hex w całym próbniku poniżej S=100, więc wygląda na przypadkowe trafienie
suwakiem, nie na wybór.

**Propozycja zgodna z intencją:** zostawić `#e438ff` jako kolor tekstu fioletu,
a `#8600FF` i `#9E22E6` wpuścić tam, gdzie naprawdę dodadzą „jarzenia" i gdzie
próg nie obowiązuje: drugi stop paska typu D (D2), obwódka pigułki, poświata
kafla. Wtedy hexy Pawła są na stronie widoczne, a AA nie pęka.

### O2. „Ciemniejsze tło = wyższy kontrast" jest prawdą, ale nieistotną

Spec pkt 1 zakłada, że #05050C to zauważalny zysk kontrastu. Pomiar A/B mówi:
+0,017 na overline, +0,000 na pigułce taga, +0,033 na najsłabszym tekście.
Zmiana jest **bezpieczna**, ale nie kupuje żadnego zapasu, więc **nie wolno jej
użyć jako uzasadnienia dla przyciemnienia palety**. Jeżeli po podmianie tła
ktoś zejdzie kolorom o 1 pp jasności „bo tło ciemniejsze", wyjdzie na minus.

Tło warto zmienić z powodu, który podał Paweł (wrażenie profesjonalizmu),
nie z powodu dostępności. Warto to zapisać w komentarzu, żeby następna runda
nie zbudowała na tym błędnego wniosku.

### O3. Reguła ogona taga ma hex w selektorze i jest miną

`globals.css:3576` i `4417` selektują `.inf-card[style*='#e438ff']`. Każda
zmiana hexu fioletu **cicho wyłącza** wyjątek v17 i pigułka wraca na pełne
60/30, czyli 4,44/3,99 (wartości z komentarza v17), a więc **poniżej AA**.
Build przejdzie, typecheck przejdzie, nic nie krzyknie. To zaświeci dopiero
w pomiarze pierścieniowym. Jeżeli v18 rusza fiolet w jakąkolwiek stronę,
te dwie reguły muszą iść w tej samej zmianie.

Ten sam wzorzec ryzyka dotyczy podmiany zieleni z pkt 2: sprawdziłem, dla
`#00e096` **nie ma** reguł scopowanych atrybutem, więc podmiana zieleni jest
pod tym względem czysta.

### O4. Spec prosi o kontrast w środku karty, konwencja v10/v17 liczy na górze

Spec pkt 1 mówi „~środek karty". Konwencja poprzednich rund („tło wymogu >=4,8")
to **góra** karty, rgb(10,11,24), bo tam gradient jest najjaśniejszy. Różnica
to ok. 0,06 kontrastu, czyli mało, ale gdyby v18 zaczęło raportować środek,
liczby przestałyby być porównywalne z v17 przy tej samej palecie i wyglądałyby
na poprawę, której nie ma. Podałem oba, werdykty postawiłem na górze.
Rekomendacja: **zostać przy górze karty** i dopisać to do konwencji.

### O5. `themeColor` już dziś nie zgadza się z `--bg`

`app/layout.tsx:80` ma `#06070d`, a `--bg` ma `#06060c`. To rozjazd sprzed v18.
Spec go nie wymienia, bo pytał o „miejsca, gdzie siedzi obecny #06060c",
a tam siedzi inny hex. Zgłaszam, bo pasek adresu na mobile maluje się tym
kolorem i po zmianie tła rozjazd urośnie z 1 do 2 jednostek. Sugeruję zejść
na `#05050C` razem z `--bg`.

### O6. Sieroty palety (pkt 4.3) urosną przy podmianie zieleni

`#22e06b` w `app/uslugi/architekci-wartosci-ai/page.tsx:391` to zieleń sprzed
F4. Jeżeli baza zieleni idzie na `#39FF14`, ta karta zostanie z trzecim,
niczyim odcieniem zieleni. To samo dotyczy `--route-gradient` (globals:333),
który miksuje `#2b7cff -> #7a3cf0 -> #22e06b`, czyli trzy hexy spoza obecnej
palety. Nie jest to w zakresie v18, ale przy „sąsiedztwo kolorów bez powtórek"
z listy żelaznych warto to policzyć, zanim dołoży się nowy ton.

---

## 8. NIEZWERYFIKOWANE

- Wygląd nowej zieleni `#39FF14` **w kadrze** (czy limonka nie gryzie się
  z cyjanem sąsiada w siatce) to ocena wizualna Pawła, nie pomiar. Zmierzony
  jest wyłącznie kontrast i rozjazd hue.
- Pary D1-D4 mierzone **liczeniem na złożeniu karty**, nie pierścieniem na
  żywym pasku. Pasek to 1px linia plus łuna 10%, nie ma glifów, więc sonda
  pierścieniowa się do niego nie stosuje. Dla dekoracji to wystarcza, ale nie
  nazywam tego pomiarem pierścieniowym.
- Kontrasty na **mobile** (blur wyłączony, inne złożenia) nie były mierzone.
  Sonda chodziła w 1440x900, dSF=2. Jeżeli v18 rusza tło, warto powtórzyć
  A/B na 390px przed wdrożeniem.
- Sondy chodziły na **produkcji sprzed v18**, czyli na palecie v17 z podmienianym
  `--card-c`. To celowe (mierzymy realny render), ale nie jest to pomiar
  zbudowanej wersji v18, bo takiej jeszcze nie ma.
