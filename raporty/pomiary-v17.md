# POMIARY v17 - zwiad przed podbiciem palety (2026-08-17)

Zwiad pomiarowy rundy v17 (spec: scratchpad/spec-v17.md, cytaty Pawla:
"jeszcze jest za malo neonu... fioletowy jest blady, «ktos inny» ma ten
mocny rozowo-fioletowy odcien, my tez musimy taki zrobic").
Metodyka: playwright-core + Chrome headless, viewport 1440x900, dsf 2,
zrzut PNG klipowany do elementu, dekoder q16-png.mjs, maska glifow =
diff zrzutu Z literami vs BEZ liter (gaszenie zrodla koloru), prog 24.
Pomiar wylacznie na ZYWEJ produkcji https://www.simplefast.ai/ i wzorcu
https://infinitytechstack.uk/ (zero buildow). Kontrasty WCAG policzone
w Node (nie szacowane). Sondy: scratchpad/q17-kalibracja.mjs,
scratchpad/q17-kontrast.mjs.

---

## 1. KALIBRACJA - realne piksele liter "ktos inny" (cel "mocnego fioletu")

Element: span.inf-grad-text "ktos inny?" w H2 "Ile czasu w tygodniu zjada
Ci robota, ktora moglby robic ktos inny?" (home, prod).

Styl computed (prod):
- background-image: linear-gradient(135deg, rgb(0,240,255), rgb(255,0,229), rgb(176,38,255))
  czyli #00f0ff -> #ff00e5 -> #b026ff, 1:1 ze spec.
- font: 46px / 800; color fallback rgb(228,228,240); **text-shadow: none**.
- shimmer: ::after, animacja `infHoloShimmer 4s ease-in-out infinite`,
  gradient 90deg bieli rgba(255,255,255,0.15) 25% / rgba(255,255,255,0.1) 75%.

Piksele liter (14 339 px, rdzen po odcieciu antyaliasingu 13 122 px;
shimmer zgaszony na czas pomiaru, mierzony czysty gradient):

| metryka | p10 | mediana | p90 |
|---|---|---|---|
| Hue | 213 (niebieski poczatek gradientu) | **289** | **303** |
| Saturation | 82% | **90%** | 96% |
| Lightness | 48% | **53%** | 67% |

- Histogram hue: **69% pikseli rdzenia w pasmie 280-310 deg** (290-300: 28,3%,
  300-310: 20,5%, 280-290: 20,0%). Reszta to cyjanowo-niebieska koncowka
  pierwszej litery "k".
- Dominujace hexy na literach: **#f705e7 hsl(304 96 49) 13,3%**,
  **#e80bec hsl(299 91 48) 11,6%**, **#c91af7 hsl(288 93 54) 10,5%**,
  **#d614f2 hsl(292 90 51) 10,0%**.
- Przebieg lewo->prawo (tercje): #767bed hsl(237 77 70) -> #e212e4
  hsl(299 85 48) -> #cd15ed hsl(291 86 51). Fragment "ktos inny" siedzi
  niemal w calosci w strefie magenta-fiolet gradientu.

**CEL "mocnego rozowo-fioletu": H 288-304, S 90-97, L 48-57** (na pikselach).

Wzorzec infinitytechstack.uk (.lp-gradient-text "Own Your Infrastructure"):
ten sam gradient computed, text-shadow: none, shimmer `holo-shimmer 4s`,
piksele: mediana hsl(288 90 53), dominanty #f804e7 / #e80bec / #c71bf7.
Klon 1:1 potwierdzony pomiarem, kalibracja na naszym H2 = kalibracja wzorca.

Kontr-pomiar obecnego fioletu (overline VOICE na karcie #b638ff, prod):
mediana pikseli hsl(278 88 58), dominanta #b638ff = 48,9% pikseli.
**Roznica vs cel: barwa o 10-26 deg za daleko od magenty** (278 vs 288-304),
nizsze nasycenie pikselowe. To jest zmierzona przyczyna "bladosci".

---

## 2. AUDYT PALETY - obecne vs proponowane

Kontrast liczony na 4 tlach konwencji v10: --bg #06060c / **karta
rgb(10,11,24)** (zlozenie #06060c + gradient karty; TLO WYMOGU >=4,8) /
mglawica rgb(15,12,28) / dropdown rgb(10,10,16).
Referencja Pawla ("juz wyglada nieznie"): pomaranicz **#ffa101
hsl(38 100 50), karta 9,64** i #ffc120 hsl(43 100 56), karta 12,01.

| Rola | Obecny | Obecne HSL | Karta | Propozycja | Proponowane HSL | bg / karta / mglawica / dropdown | Decyzja |
|---|---|---|---|---|---|---|---|
| fiolet baza | #b638ff | 278 100 61 | 4,65 | **#e438ff** | **292 100 61** | 6,07 / **5,87** / 5,79 / 5,93 | PRIORYTET: kierunek kalibracji |
| fiolet jasny (odcien) | #a586ff | 255 100 76 | 6,94 | **#dc7aff** | 284 100 74 | 7,96 / **7,70** / 7,59 / 7,77 | rozowszy, para z baza jak cyjan 188/187 |
| zielen baza | #00c986 | 160 100 39 | 9,03 | **#00e096** | 160 100 44 | 11,65 / **11,27** / 11,11 / 11,38 | H bez zmian, L +5 pp; przeskakuje pomaranicz |
| niebieski (odcien www) | #5ba4ff | 213 100 68 | 7,63 | **#70b0ff** | 213 100 72 | 8,99 / **8,70** / 8,57 / 8,78 | H bez zmian; wariant mocniejszy #7ab6ff (74; karta 9,28) |
| cyjan baza | #11e0ff | 188 100 53 | 12,23 | **#00f0ff** (opcja) | 184 100 50 | 14,35 / **13,88** / 13,68 / 14,01 | juz PONAD pomaranczem; zmiana tylko dla 1:1 z tokenem wzorca (L/S 50/100 jak pomaranicz) |
| cyjan jasny | #61edff | 187 100 69 | 14,03 | bez zmian | - | - | ponad poziomem |
| zielen jasna | #29ff77 | 142 100 58 | 14,59 | bez zmian | - | - | ponad poziomem |
| magenta/roz | #ff00e5 | 306 100 50 | 5,94 | bez zmian | - | - | to srodkowy stop kalibracji; L/S 1:1 jak pomaranicz |
| pomaranicz | #ffa101 | 38 100 50 | 9,64 | **NIETYKALNY** | - | - | referencja |
| pomaranicz jasny | #ffc120 | 43 100 56 | 12,01 | **NIETYKALNY** | - | - | referencja |

- Fiolet #e438ff: H 292 = srodek dominant kalibracji (288-304, mediana 289);
  S 100, L 61 (L bazy bez zmian, wiec relacja z odcieniami zostaje).
  Kontrast na karcie 5,87 = **wymog >=4,8 z zapasem +1,07** (stary sufit 4,65).
  Wariant ostrozniejszy, gdyby 292 gryzlo sie z magenta w siatkach:
  #d738ff hsl(288 100 61), karta 5,49.
- Wszystkie propozycje AA na kazdym z 4 tel; minimum calej nowej palety
  to fiolet 5,79 (mglawica) - dzis 4,59.
- Sasiedztwo (regula v16, bez powtorek obok siebie): nowy fiolet 292 vs
  magenta 306 = 14 deg; vs jasny fiolet 284 = 8 deg, ale rozdziela je
  L 61 vs 74. Przy wdrozeniu sprawdzic siatki, gdzie para wystepuje obok
  siebie (agent-rekrutacyjny c=#a586ff->#dc7aff / odcien=#ff00e5).
- #2b7cff hsl(217 100 58), karta 5,06 - niebieski akcent POZA rejestrem
  kategorii (globals 5x + 14x TSX, m.in. chatagent, KrokiJakTodziala).
  Spec v17 go nie obejmuje; zostaje, odnotowany dla kompletnosci.

---

## 3. WYSTAPIENIA - mapa podmiany 1:1 (grep repo, stan na 2026-08-17)

### #b638ff -> #e438ff (fiolet baza)
| Plik | Ile | Uwagi |
|---|---|---|
| app/globals.css | 16 + 2 rgba | **8 selektorow atrybutu** `[style*='#b638ff']` (linie 3568, 3569, 3575, 3581, 3588 - wyjatki AA v16; 4428-4430 - forced-colors) + 8 wzmianek w komentarzach pomiarowych. Do tego **rgba-literaly**: `rgba(182, 56, 255, 0.35)` (linia 3570, ogon fioletu) i `rgba(182, 56, 255, 0.04)` (linia 3589, tint tagu) -> `rgba(228, 56, 255, ...)` |
| lib/inf-kategorie.ts | 6 | 4 w kodzie (voiceboty.c, rozwiazania.c, test-gotowosci-ai.c, ai-radar.c) + 2 w komentarzu v10 |
| components/uslugi/ServiceHero.tsx | 1 | hero voicebotow - spec v17 pozwala dotknac hexu (kolor idzie z rejestru), tresci nietykalne |
| components/sections/Problem.tsx | 1 | inline |

UWAGA ZLOTA: selektory `[style*='#b638ff']` MUSZA byc podmienione razem
z rejestrem, inaczej wyjatki/gaszenie forced-colors przestana lapac karty.

### #a586ff -> #dc7aff (fiolet jasny) - 27 wystapien
lib/inf-kategorie.ts 12; branzedemo.tsx 3; dowodSpoleczny.tsx 2;
bezpieczenstwo.tsx 2; Rozwiazanie.tsx 2; PasekZaufania.tsx 2;
cytatyWalec.tsx 1; JakTodziala.tsx 1; Gwarancjaefektu.tsx 1;
app/globals.css 1.

### #00c986 -> #00e096 (zielen) - 12 wystapien + 1 rgba
lib/inf-kategorie.ts 5; app/globals.css 3 + `rgba(0, 201, 134, 0.12)` x1
(-> rgba(0, 224, 150, 0.12)); Rozwiazanie.tsx 2; Problem.tsx 1;
app/wiedza/page.tsx 1.

### #5ba4ff -> #70b0ff (niebieski) - 15 wystapien
lib/inf-kategorie.ts 4; branzedemo.tsx 2; bezpieczenstwo.tsx 2;
Problem.tsx 2; PasekZaufania.tsx 2; JakTodziala.tsx 2; app/globals.css 1.

### #11e0ff -> #00f0ff (cyjan, OPCJONALNE) - 15 wystapien
lib/inf-kategorie.ts 8; dowod.tsx 2; Rozwiazanie.tsx 2; Problem.tsx 1;
Kartaczesci.tsx 1; app/globals.css 1. Brak selektorow atrybutu z tym
hexem; #00f0ff juz zyje w globals (18x jako token neonu), scalenie
jest bezpieczne skladniowo.

### Bez zmian (policzone dla kompletnosci)
#ffa101 (globals 3, lib 7, Problem 3, dowodSpoleczny 2, dowod 2,
Rozwiazanie 2, branzedemo 1, bezpieczenstwo 1) i #ffc120 - NIETYKALNE;
#ff00e5 (globals 21, lib 9, flow-core.css 4, agent-console.css 2,
Voiceaura 2, Rozwiazanie 2) - bez zmian, rgba-literaly magenty zostaja;
#61edff, #29ff77 - bez zmian; #ff67b7 (cytatyWalec 3, lib 2 komentarz)
i #8e5cff / #b026ff - tylko komentarze historyczne + 1 uzycie w Problem.tsx
(#b026ff) do obejrzenia przy implementacji.

---

## 4. POSWIATY - czy podbijac alfy?

Zmierzone na prod:
- H2 .inf-grad-text: **text-shadow: none** (computed). Jarzenie kalibracji
  NIE pochodzi z poswiaty. Robi je czysty kolor (piksele: S mediana 90,
  L mediana 53) na duzym, grubym foncie (46px/800) + shimmer ::after
  (infHoloShimmer 4s, pasma bieli 0.15/0.10) - shimmer to blysk, nie halo.
- Karty (kalibracja v16, globals 3546-3551): rdzen `0 0 6px` 60% + ogon
  `0 0 14px` 30% koloru karty. Fiolet #b638ff ma dzis WYJATKI (3568-3590):
  overline/sub tylko ogon 14px/35%, tag i status bez cienia - bo pomiar
  pierscieniowy v16 pokazal, ze pelne 60/30 zjada z pierscienia 0,25-0,35
  (4,65 -> 4,28-4,44 FAIL przy AA 4,5).

Rekomendacja liczbowa:
1. **Alfy poswiat ZOSTAJA 60/30** - nie podbijac. Skoro wzorzec osiaga
   "jarzenie" bez zadnego text-shadow, sila neonu ma przyjsc z KOLORU
   (pkt 2), nie z halo; mocniejsze halo tylko podbija tlo pod literami
   i psuje pierscien (lekcja v16).
2. **Fiolet wraca do pelnej kalibracji 60/30** po zmianie na #e438ff:
   surowy kontrast na karcie rosnie 4,65 -> 5,87 (+1,22), a pelna
   jarzeniowka zjadala w v16 z pierscienia 0,25-0,35, wiec oczekiwany
   pierscien ~5,5 = **zapas ~1,0 nad AA 4,5**. Czyli: usunac wyjatki
   3568-3583 (ogon 35% / text-shadow:none dla taga i statusu), zostawic
   regule ogolna; selektory forced-colors 4428-4430 tylko podmienic hex.
3. Tint tagu fioletowego (3589) moze wrocic z 0.04 w okolice 0.12
   (poziom zieleni rgba 0.12) - zapas na to jest.
4. **Pomiar pierscieniowy po wdrozeniu OBOWIAZKOWY** (sondy q16-b2/b3
   w scratchpadzie) - wartosci wyzej to przewidywania z delty v16,
   nie zmierzone piksele nowego koloru.

---

Sondy zwiadu: scratchpad/q17-kalibracja.mjs (piksele liter, prod+wzorzec),
scratchpad/q17-kontrast.mjs (paleta + skan kandydatow H/L przy S=100).
Wyniki surowe w logu sesji zwiadu. Zadnych zmian w kodzie produktu.

---

## 5. WDROZENIE v17 - pomiar pierscieniowy PO zmianie palety (localhost:3917, build prod)

Sondy: scratchpad/v17-pierscien.mjs, v17-tag-warianty.mjs, v17-final.mjs
(metoda 1:1 q16-b2: pierscien 1-3px fizycznych wokol glifow, mediana/p90).

| Element (karta fioletowa #e438ff) | mediana | p90 | werdykt |
|---|---|---|---|
| .inf-overline (VOICE) | 5,20 | 4,87 | PASS (60/30 wraca) |
| .inf-card-sub (Test...) | 5,37 | 5,03 | PASS (60/30 wraca) |
| .inf-status (ZA DARMO) | 5,41 | 5,15 | PASS (60/30 wraca) |
| .inf-tag-kolor (pigulka) | 5,11 | 5,05 | PASS z wyjatkiem: sam ogon 14px/30%, tint pelne 12% |

Warianty pigulki (pomiar wstrzyknietym stylem): tint12+pelne 60/30 =
4,44/3,99 FAIL; tint8+60/30 = 4,71/4,24 FAIL(p90); tint6+60/30 = 4,82/4,34
FAIL(p90); tint12+ogon30 = 5,10/5,05 PASS. Wniosek jak w v16: rdzen 6px
na gestych glifach zjada pierscien; ogon nie. Wyjatek v17 to WIECEJ neonu
niz v16 (tam: zero cienia + tint 4%).

Inne kolory: zielen #00e096 overline 9,27/8,13; cyjan #00f0ff overline
10,8/9,19. Sasiedztwo: zero powtorek koloru obok siebie (spis gridow).
Hover 3 kart (fiolet/cyjan-top/zielen): obwodka -> pelny kolor, glow
22px/48px, lift -3/-5px, sweep ::after -548px -> 767px. Mobile 375:
scrollWidth 375 = zero poziomego scrolla. Stare hexy palety na kartach: 0.

Poza zakresem (odnotowane): karty demo/kroki z --card-c #2b7cff (3),
#22d3ee (1), #8b5cf6 (2), #22e06b (2) - hexy spoza rejestru kategorii,
zwiad ich nie mapowal (m.in. ChatAgent/ZyweDemo/KrokiJakToDziala).
