# MASTER PLAN v8 (nadzorca, synteza 4 planów)

Data: 2026-08-07. Autor: nadzorca (zespół 5).
Wejście: `raporty/plan-struktura-seo.md`, `raporty/plan-animacje.md`,
`raporty/plan-kolor.md`, `raporty/plan-copy.md`, `STATUS.md`,
`raporty/raport-seo-2026-08-07.md` oraz ODCZYT ŻYWEGO KODU (stan drzewa roboczego
z rundą v7 w locie, commit bazowy `bb5a2f8`).

FAZA ANALITYCZNA. Ten plik nie zmienia ani jednej linii kodu.

Zasada rozstrzygania sporów (z briefu, kolejność ważności):
1) dostępność i wydajność, 2) treść cytowalna dla botów i dla ludzi, 3) efekt wizualny.

---

## 0. DLA PAWŁA W 10 ZDANIACH

1. Cztery zespoły policzyły wszystko poprawnie, ale trzy z nich czytały kod SPRZED
   rundy v7, więc jedna trzecia ich zadań jest już zrobiona i wykreślam ją z planu.
2. Runda v7 zrobiła już to, co najbardziej rzucało się w oczy w kartach: karta na
   hover unosi się o 5 px ze skalą, przestała zmieniać odcień tła, narożniki `[ ]`
   zeszły z 55 na 22 procent i zapalają się dopiero pod kursorem.
3. Reflektor za kursorem, czyli Twoje „kółko podążające za myszką", jest już
   napisany w dwóch wersjach, ale NIE JEST WŁĄCZONY na stronie głównej, i to jest
   dokładnie powód, dla którego sekcja „Sprawdź, którego Agenta" wygląda na
   zwykłe podświetlenie.
4. Znalazłem nową usterkę wydajności, której nie widział żaden zespół: v7 wstawił
   15 separatorów, a każdy ma dwie linie z wieczną iskrą, czyli 30 animacji bez
   przerwy na telefonie i na komputerze, i to najprawdopodobniej jest to „coś leci
   cały czas", plus walec cytatów przyspieszony z 4 na 2,2 sekundy.
5. Skargę „liczby się animują, lecą cały czas" czytam jako zarzut, nie jako
   zachwyt nad wzorcem, więc liczniki mają się uspokoić i liczyć raz, a nie
   dostać nowej pętli oddechu (jeśli chodziło Ci o coś odwrotnego, to jedna linia
   do zmiany).
6. Kolory: zgadzam się z zespołem 3, że jedziemy wszędzie na połowie mocy, ale
   karta w spoczynku ma przestać mieć kolorową mgiełkę, bo ta mgiełka zbija
   czytelność opisów poniżej normy dostępności, a mocny kolor ma wejść tam, gdzie
   niesie znaczenie: w mono etykiety, liczby i obwódkę pod kursorem.
7. SEO: największy zysk to nie teksty, tylko linki, bo `/uslugi/voiceboty` ma dziś
   3 linki przy 336 wyświetleniach, a `/produkty` zero, i to naprawiamy 93 nowymi
   linkami z anchorami wprost z fraz, które ludzie realnie wpisują.
8. Zatrzymałem jedną zmianę, którą zaproponowały dwa zespoły naraz: przełączenie
   głównego przycisku z `/kontakt` na `#diagnoza` w rejestrze, bo ten przycisk jest
   używany w 22 plikach, także w nagłówku i na sześciu hubach, gdzie zacząłby
   prowadzić sam do siebie albo donikąd.
9. Kolejność jest twarda: najpierw scalamy v7, potem teksty w rejestrach (te nie
   kolidują z niczym i mogą ruszyć od razu), potem mechanizm linków, potem jeden
   właściciel przepisuje `globals.css`, a na końcu jedna osoba robi strukturę i
   teksty strony głównej, bo to te same pliki.
10. Do rozstrzygnięcia zostawiam Ci 12 decyzji, każda ma moją rekomendację i cenę
    wyboru przeciwnego, a najważniejsze trzy to: etykieta głównego przycisku,
    ceny 1490 zł i 3000 zł na stronie głównej oraz czy karta dostaje pełny korpus
    wzorca.

---

## 1. CO JUŻ JEST ZROBIONE (wykreślone z planów zespołów)

Sprawdzone w drzewie roboczym, nie z pamięci. Dowód = selektor albo plik.

| # | Pozycja z planu | Zespół | Dowód w kodzie | Werdykt |
|---|---|---|---|---|
| 1 | B2: hover nie zmienia tła karty | 2 | `grep "rgba(24, 24, 64"` w `app/globals.css` = 0 trafień; komentarz przy `.inf-card` mówi wprost „hover zmienia WYŁĄCZNIE te dwie liczby, nigdy background-color" | GOTOWE, wykreślam |
| 2 | B3: `translateY(-5px) scale(1.008)` | 2 | `app/globals.css`, `.inf-card:hover` (blok ok. linii 3435) | GOTOWE, wykreślam |
| 3 | B4: obwódka hover 60 do 65 procent | 2, 3 | `.inf-card:hover` = `color-mix(var(--card-c) 60%)`, `.inf-card-lg:hover` = 65 procent | GOTOWE, wykreślam |
| 4 | B5: potrójny cień wzorca | 2, 3 | `.inf-card-lg:hover` ma 1:1 `0 22px 48px -20px 35%, 0 0 28px 14%, inset 0 1px 0 biel 9%` | GOTOWE dla kart-bohaterów, patrz nowe znalezisko N2 |
| 5 | B6: narożniki `.22` do `.6` | 2, 3 | `.inf-card` ma `--inf-corner-a: 22%`, `.inf-card:hover` ma `60%` | GOTOWE, wykreślam. Uwaga: liczba 55 procent w planie zespołu 3 (kontrast 3,87:1) jest NIEAKTUALNA |
| 6 | B7: dolna łuna `.04` do `.08` | 2, 3 | `--inf-luna-a: 4%` w bazie, `8%` na hover | GOTOWE, wykreślam |
| 7 | B8: separator z iskrą i etykietą mono | 2 | `components/ui/SekcjaSeparator.tsx` + `.inf-divider`, `.inf-divider-line`, `.inf-divider-label`, `@keyframes inf-divider-shimmer` w `app/globals.css`; 15 użyć w `app/page.tsx` | ZROBIONE, ale z usterką wydajności, patrz N1. Propozycja nowej klasy `.inf-seam` (zespół 2, P1-1) ODPADA, bo dublowałaby istniejący `.inf-divider` |
| 8 | Rozmiar etykiety separatora 8,8 px czy 11 px (decyzja Pawła zespołu 2) | 2 | `.inf-divider-label` używa `var(--fs-overline)` = 11 px, komentarz w kodzie tłumaczy wybór kontrastem | ROZSTRZYGNIĘTE w v7, wykreślam decyzję |
| 9 | P0-7: `.inf-tile` ma dwie sprzeczne reguły hover | 2 | To NIEPRAWDA. `transform: scale(1.12)` (linia 3513) dotyczy selektora `.inf-dd-row:hover .inf-tile svg`, czyli ikony w wierszu dropdownu. `rotate(-15deg) scale(1.15)` (linia 4125) dotyczy `.inf-card:hover .inf-tile`. To dwa różne elementy, nie konflikt | WYKREŚLAM jako błąd analizy |
| 10 | `--ring-2: #ff00e5` jako druga barwa | 3 | jest w tokenach | GOTOWE |
| 11 | Reflektor: CSS `.inf-spotlight` z promieniem 180 px i kryciem 8 procent | 2 | `app/globals.css` ok. linii 3132, komentarz: „v7 POMIARY WZORCA 1:1: promień 180px (było 320px) i krycie 8% (było 12%)" | CSS GOTOWY. Brakuje montażu w kartach home, patrz N3 |
| 12 | Meta descriptions do 155 znaków (runda v3, `STATUS.md` linia 165) | 1 | REGRESJA: `app/produkty/page.tsx` ma opis 191 znaków (policzone Nodem) | NIE jest zrobione, zostaje w planie |

Wniosek: z 11 braków wobec wzorca (B1 do B11) zespołu 2 realnie zostaje pięć:
B1 (montaż reflektora), B9 (zachodzenie sekcji), B10 (liczniki, patrz R3),
B11 (różny ruch dla różnych typów kart) oraz spłata długu wydajności.

---

## 2. NOWE ZNALEZISKA NADZORCY (nie widział ich żaden zespół)

### N1. Trzydzieści wiecznych animacji na stronie głównej, bez bramki mobile

`app/page.tsx` renderuje 15 separatorów (`grep -c "SekcjaSeparator nr="` = 15).
Każdy `SekcjaSeparator` ma DWIE `.inf-divider-line`, a każda linia ma `::after`
z `animation: inf-divider-shimmer 4s var(--ease-in-out) infinite`.
Razem **30 pętli bez końca**. Bramki: tylko `prefers-reduced-motion` i
`forced-colors`. NIE MA bramki szerokości, więc to biegnie także na telefonie.
Do tego keyframes animuje właściwość `left`, a nie `transform`, czyli każda klatka
idzie przez główny wątek, a nie przez kompozytor.

To łamie budżet zapisany w planie zespołu 2 („pętle CSS infinite w kadrze na
mobile: 0") i jest najpoważniejszym ryzykiem dla PSI 81 i TBT 150 ms.

Rozstrzygnięcie (obowiązkowe, priorytet 1):
- `@keyframes inf-divider-shimmer` przechodzi z `left: -100% -> 160%` na
  `transform: translateX(-100% -> 400%)` przy `left: 0` (ten sam efekt, kompozytor);
- cała reguła `.inf-divider-line::after` dostaje bramkę
  `@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)`;
- na mobile zostaje sama kreska gradientowa, bez iskry.

### N2. `.inf-card-lg` istnieje i nie ma ani jednego konsumenta

`grep -rl "inf-card-lg" app components` = zero plików. v7 napisał wariant
hover 1:1 z pomiarem wzorca (`0 22px 48px -20px 35%, 0 0 28px 14%`) i nikt go
nie używa, więc karty-bohaterowie jadą na słabszym wariancie 30 i 12 procent.
Zadanie: dopisać klasę `inf-card-lg` obok `inf-card` na kartach wiodących:
`components/sections/PromoUslugi.tsx` (karta pełna, chatboty), trzy karty cennika
w `components/sections/Oferta.tsx`, dwie karty AEO w `components/sections/Rozwiazanie.tsx`.

### N3. Reflektor napisany DWA RAZY, zamontowany ZERO razy

Dwie równoległe implementacje tej samej rzeczy:
- `components/motion/KartaReflektor.tsx`: komponent kliencki, nasłuch
  `pointermove` NA KAŻDEJ KARCIE osobno, podmienia `background` inline w pikselach;
- `components/motion/MotionOrchestrator.tsx`: JEDEN delegowany `pointermove` na
  dokument, ustawia `--mx/--my` w procentach, a `.inf-spotlight` maluje to w CSS.

`grep -rn "KartaReflektor" app components` = tylko definicja i jeden komentarz
w `Oferta.tsx`. Żadna sekcja home nie renderuje `.inf-spotlight`
(renderują go `PostCard`, `PoradnikCard`, `MaterialCard`, `RealizacjaCard`,
`app/uslugi/page.tsx`, `app/wiedza/page.tsx`, `app/narzedzia/page.tsx`).

Rozstrzygnięcie: **zostaje wariant delegowany (MotionOrchestrator + CSS)**,
`KartaReflektor.tsx` NIE jest montowany.
Powód liczbowy: wariant komponentowy zakłada jeden listener i jedną kolejkę
`requestAnimationFrame` na kartę; przy kilkudziesięciu kartach home to
kilkadziesiąt listenerów zamiast jednego. Priorytet 1 (wydajność) wygrywa
z priorytetem 3 (dokładność piksela).
Cena tej decyzji, wprost: pozycja plamy liczona w procentach karty, a nie w
pikselach, czyli na kartach bardzo szerokich plama podąża minimalnie inaczej niż
u wzorca. To jedyna różnica.
Zadanie wykonawcze: w każdej karcie `.inf-card` na home wstawić
`<div className="inf-spotlight" aria-hidden="true" />` (czysty markup, 0 KB JS).

### N4. `HOME_CTA` jest w 22 plikach, nie w 9. Przełączenie na `#diagnoza` zrobiłoby przyciski prowadzące same do siebie

Zespół 1 (punkt 3.1) i zespół 4 (punkt 4.4) zgodnie proponują
`HOME_CTA.href: '/kontakt' -> '#diagnoza'`. Oba plany zakładają, że dotyczy to
9 sekcji home. Realnie `grep -rl "HOME_CTA" app components` daje **22 pliki**,
w tym 13 spoza strony głównej:

`app/materialy/[slug]/page.tsx`, `app/materialy/page.tsx`, `app/narzedzia/page.tsx`,
`app/produkty/page.tsx`, `app/realizacje/page.tsx`, `app/uslugi/page.tsx`,
`app/wiedza/page.tsx`, `components/ai-radar/RadarCTA.tsx`,
`components/layout/HeaderClient.tsx`, `components/narzedzia/WynikCTA.tsx`,
`components/poradniki/PoradnikCTA.tsx`, `components/realizacje/RealizacjaCTA.tsx`,
`components/realizacje/RealizacjaHero.tsx`.

Skutek zmiany globalnej byłby taki:
- na sześciu hubach przycisk stoi WEWNĄTRZ sekcji `id="diagnoza"`
  (np. `app/produkty/page.tsx` linia 172), więc kierowałby sam do siebie;
- przycisk w nagłówku (`HeaderClient.tsx`) kierowałby na `#diagnoza` także na
  stronach, które tej kotwicy nie mają (`/o-nas`, `/kontakt`, wpisy bloga),
  czyli martwy link na całej stronie.

Przy okazji: teza zespołu 1, że „na podstronach usług nie ma kotwicy `#diagnoza`",
jest NIEPRAWDZIWA. `components/uslugi/ServiceCTA.tsx` linia 13 renderuje
`<Section tone="base" id="diagnoza">`. Kotwica jest, tylko nie ma pod nią
formularza (jest tam przycisk do `/kontakt`).

Rozstrzygnięcie (obowiązkowe):
- `HOME_CTA.href` ZOSTAJE `/kontakt` jako domyślna wartość dla całego serwisu;
- sekcje home podają `href="#diagnoza"` JAWNIE, na miejscu (9 plików sekcji);
- reguła do zapisania w komentarzu: `#diagnoza` wolno użyć wyłącznie tam, gdzie
  pod kotwicą stoi FORMULARZ, czyli dziś tylko na home (`FinalneCTA.tsx`);
- na podstronach usług obie ścieżki idą na `/kontakt`: `ServiceCTA.tsx` już to
  robi, a `cta.href` w `lib/uslugi/*.ts` zmienia się z `#diagnoza` na `/kontakt`,
  żeby `ServiceHero` i `ServiceCTA` przestały prowadzić w dwa różne miejsca
  pod tą samą etykietą (znalezisko zespołu 4, punkt 4.1).

### N5. Kapsuła w planie zespołu 4 ma 36 słów, kontrakt to 40 do 60

`plan-copy.md` punkt 2.6, karta 2 sekcji Rozwiązanie: nowy tekst ma 36 słów
(policzone), a własna żelazna zasada tego planu (punkt 5) mówi „kapsuły
answer-first trzymają kontrakt 40 do 60 słów".
Poprawka konkretna: przywrócić na końcu zdanie sygnaturowe
„To różnica między systemem, który gada, a pracownikiem, który działa."
(10 słów), co daje **46 słów** i mieści się w kontrakcie.

### N6. Numeracja separatorów jest zaszyta na sztywno i rozjedzie się przy scalaniu sekcji

`app/page.tsx` ma `nr="01"` do `nr="15"` wpisane ręcznie. Plan zespołu 1 scala
16 sekcji do 12. Bez ręcznego przenumerowania po scaleniu strona pokaże
etykiety „09 · BEZPIECZEŃSTWO" nad sekcją, która nie jest dziewiąta.
To wiąże partie: separatory MUSZĄ być przenumerowane w tej samej partii, w której
zmienia się kolejność sekcji, a etykiety (`USŁUGI`, `PROBLEM`, ...) muszą wyjść
z listy zespołu 1, nie z głowy wykonawcy.

### N7. Walec cytatów przyspieszony do 2,2 s i nadal bez pauzy poza kadrem

`components/sections/CytatyWalec.tsx` linia 51: `const OKRES_MS = 2200;`
z komentarzem „(spec v7 §C pkt 3; było 4000)". Zero `IntersectionObserver`
w pliku. To jest jedyny element strony głównej, który dosłownie „leci cały czas"
i przyspieszył dwukrotnie w ostatniej rundzie.
**HIPOTEZA (do potwierdzenia przez Pawła):** skarga „liczby się animują, lecą
cały czas" dotyczy walca cytatów i iskier separatorów (N1), a nie liczników,
które liczą raz i milkną. Nie stosujemy tej hipotezy bez potwierdzenia,
ale obie rzeczy i tak trzeba naprawić z powodu wydajności.

---

## 3. ROZSTRZYGNIĘCIA SPRZECZNOŚCI MIĘDZY PLANAMI

Trzynaście miejsc, w których plany się kłócą. Każde rozstrzygnięte, z powodem
i z nazwaną ceną.

| # | Spór | Kto kontra kto | ROZSTRZYGNIĘCIE | Powód (zasada) | Cena tej decyzji |
|---|---|---|---|---|---|
| R1 | Reflektor: komponent na kartę czy jeden delegowany listener | zespół 2 opisuje CSS, v7 dostarczył oba warianty | Delegowany (`MotionOrchestrator` + `.inf-spotlight` w markupie). `KartaReflektor.tsx` nie montujemy | 1 (wydajność): jeden listener zamiast kilkudziesięciu | Pozycja plamy w procentach, nie w pikselach |
| R2 | Iskra separatora: nowa klasa `.inf-seam` czy istniejący `.inf-divider` | zespół 2 (P1-1) kontra v7 | `.inf-divider` zostaje, `.inf-seam` NIE powstaje. Zmieniamy tylko: `left` na `transform` i bramka 1024 px | 1 (wydajność) plus zakaz drugiego narzędzia do tej samej roboty | Na telefonie separator nie iskrzy |
| R3 | Liczniki „żyjące" (pętla oddechu, przeliczanie przy powrocie) kontra skarga „liczby lecą cały czas" | zespół 2 (P2) kontra brief | **Liczniki liczą RAZ. Zero nowej pętli oddechu, zero przeliczania przy powrocie.** Partia P2 zespołu 2 wypada w całości | Sekcja briefu nazywa się „SKARGI PAWŁA DO ROZWIĄZANIA", a wszystkie 7 pozycji to zarzuty do NASZEJ strony, nie opis wzorca. Plus 1 (wydajność): zero nowych rAF | Strona jest w tym miejscu spokojniejsza niż wzorzec. Wraca jedną decyzją Pawła (D3) |
| R4 | Dyrygent liczników (nowy plik `LicznikDyrygent.tsx`) | zespół 2 | NIE budujemy. Skoro liczniki liczą raz i tak jak dziś, nowa warstwa nie ma czego dyrygować | 1 (wydajność) plus zasada „nie dokładamy mechanizmu bez wymuszenia" | Zostaje po jednym rAF na instancję `AnimatedMetric`, tak jak dziś. Wraca razem z D3 |
| R5 | Korpus karty: gradient wzorca plus `blur(16px)` | zespół 3 (rozdz. 6) | Korpus gradientowy TAK (`linear-gradient(160deg, rgba(13,14,30,.88), rgba(9,10,22,.72))`). `backdrop-filter: blur(16px)` NIE, ani na mobile, ani na desktopie | 1 (wydajność): rozmycie tła pod kilkudziesięcioma kartami to koszt malowania na każdej klatce scrolla, a pod kartą jest prawie czarne tło z kropkami, więc zysk wizualny bliski zeru | Gwiazdy pod kartą nie są rozmyte, karta jest „matowa", nie „szklana" |
| R6 | Wash koloru 14 procent w spoczynku (decyzja v6) kontra próg AA | zespół 3 kontra `STATUS.md` v6 etap A | Wash schodzi do **0 procent w spoczynku**, wchodzi 8 procent na hover. Guard `.inf-card .text-fg-muted { color: #8a8aad }` ZOSTAJE | 1 (dostępność): przy waszu 14 procent opis `--fg-muted` daje 3,83 do 3,98:1, czyli poniżej AA. Pomiar wzorca mówi, że wzorzec washu w spoczynku nie ma | Świadomie cofamy część decyzji v6. Karta w spoczynku jest chłodniejsza, kolor wraca pod kursorem |
| R7 | Nasycenie kontra kontrast tekstu | zespół 3 wewnętrznie | Kontrakt dwóch stopni jest przyjęty. Twarda reguła: `#b026ff` (4,40:1) i `#2b7cff` (5,23:1) NIGDY nie są kolorem tekstu poniżej 18,66 px. Tekst zawsze ze stopnia TEKST | 1 (dostępność) | Fiolet w mono etykietach jest jaśniejszy niż w obwódce, czyli karta ma dwa odcienie tej samej rodziny |
| R8 | `--accent` na `#00f0ff` | zespół 3 (decyzja 1) | NIE. Powstaje tier `--accent-decor: #00f0ff` (token już istnieje, `app/globals.css` linia 206, dziś kopia `--accent`), interakcja zostaje na `#22d3ee` | 1 (dostępność): pierścień focusa i 103 użycia `text-accent` to nie jest miejsce na eksperyment | Nawigacja świeci mocniejszym cyjanem niż przyciski. To jest zachowanie wzorca |
| R9 | Hero: 2 przyciski (zespół 1) czy 3 (zespół 4) | zespół 1 kontra zespół 4 | **3 przyciski zostają**, zmieniają się tylko cele: primary na `#diagnoza`, ghost 1 na `/narzedzia#kalkulator-oszczednosci`, ghost 2 na `#demo` | Pamięć projektu: nie usuwamy elementów hero bez zgody Pawła. Kotwica kalkulatora ZWERYFIKOWANA: `app/narzedzia/page.tsx` linia 128 renderuje `<Section id={n.slug}>` | Hero ma o jeden przycisk więcej niż wzorzec. Redukcja czeka na decyzję D9 |
| R10 | CTA sekcji Rozwiązanie: „Sprawdź, którego Agenta potrzebujesz" do `#diagnoza` (zespół 1) czy „Porównaj wszystkie usługi" do `/uslugi` (zespół 4) | zespół 1 kontra zespół 4 | Wariant zespołu 4, z zastrzeżeniem: intencja „którego Agenta potrzebujesz" MUSI wejść jako H2 kafelków usług („Który Agent zdejmie z Ciebie robotę najpierw?"), inaczej gubimy pytanie, które Paweł sam nazwał | 2 (treść): przycisk obiecywał wybór, a prowadził do formularza. Obietnica ma mieć pokrycie | To jest CTA wymienione w skardze Pawła numer 1, więc mimo wszystko idzie na listę decyzji (D5) |
| R11 | Główne CTA: `HOME_CTA.href` na `#diagnoza` w rejestrze | zespół 1 i 4 zgodnie | ODRZUCONE w tej formie. Rejestr zostaje na `/kontakt`, sekcje home podają `#diagnoza` jawnie. Szczegóły w N4 | 1 (dostępność, martwe kotwice) plus 3 (kod nie może kierować przycisku sam do siebie) | Dziewięć plików sekcji dostaje jawny `href` zamiast jednej stałej. Mniej elegancko, za to działa na 22 powierzchniach |
| R12 | Długość tekstu: SEO chce treści, Paweł nie chce ścian | zespół 1 (kapsuły cytowalne) kontra zespół 4 (skracanie) i skarga 7 | Podział twardy: **kapsuła answer-first zostaje jednym ciągłym akapitem 40 do 60 słów** (hero, sekcje AEO, kapsuły usług), **kafelek ma maksymalnie 25 słów i kończy się linkiem**. Kapsuł NIE dzielimy na kafelki | 2 (treść cytowalna): akapit rozbity na kafelki przestaje być cytowalny dla modeli, a to nasz jedyny kanał AEO | Sekcje AEO nadal wyglądają na „tekstowe". Rekompensata: dwie kapsuły stoją obok siebie w dwóch kartach, a nie jedna pod drugą |
| R13 | Kolejność: struktura sekcji kontra teksty sekcji | zespół 1 (S5) kontra zespół 4 (punkt 7) | Jedna partia, jeden właściciel. `components/sections/*` nie da się podzielić między „strukturę" i „copy", bo to te same pliki i te same linie | 1 (ryzyko konfliktu scalania) | Partia E jest największa i nie da się jej zrównoleglić |

---

## 4. PARTIE, WŁASNOŚĆ PLIKÓW, KOLEJNOŚĆ

### 4.1 Blokada zerowa

**Nic, co dotyka `app/globals.css`, `app/page.tsx` i `components/sections/*`,
nie startuje przed scaleniem rundy v7.** Dziś w drzewie roboczym wisi
21 zmodyfikowanych plików i 2 nowe komponenty (`git status`). Start przed
scaleniem = utrata pracy v7.

Partia A jest jedynym wyjątkiem: dotyka wyłącznie `lib/**` i pól `metadata`
w `app/*/page.tsx`, a v7 nie zmienił ani jednego pliku w `lib/`.

### 4.2 Matryca kolizji plików

| Plik | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| `lib/uslugi/*.ts` (treść, meta) | X | | X | | | |
| `lib/uslugi/types.ts` | | X | | | | |
| `lib/blog`, `materialy`, `realizacje`, `poradniki` (types) | | X | | | | |
| `app/uslugi/[usluga]/page.tsx` i 3 inne trasy | | X | | | | |
| rejestry treści (pola `powiazane`) | | | X | | | |
| `app/globals.css` | | | | X | | |
| `lib/inf-kategorie.ts` | | | | X | | |
| `app/page.tsx` | | | | | X | |
| `components/sections/*` | | | | | X | |
| `lib/site.ts` | | | | | X | |
| 65 plików z `text-fg-subtle` | | | | | | X |

Żadna kolumna nie dzieli pliku z inną. A, B i D mogą iść równolegle.
C czeka na B. E czeka na D (kontrakt klas) i na v7. F jest ostatnie.

### 4.3 Partie

| Partia | Zakres | Pliki (własność wyłączna) | Zależy od | Wykonawca |
|---|---|---|---|---|
| **A. Rejestry SEO i copy** | 4 strony usług (H1, meta, kapsuła, `queries`), 16 tytułów powyżej 65 znaków, 10 opisów powyżej 160 znaków, „asystent AI" w poradniku o kosztach | `lib/uslugi/*.ts`, `lib/poradniki/poradniki/*.ts`, `lib/materialy/magnety/*.ts`, pola `metadata` w `app/*/page.tsx` | nic, START OD RAZU | backend-dev |
| **B. Mechanizm linkowania** | wspólny typ `LinkKrzyzowy`, pola `powiazane` w 4 rejestrach, render sekcji „Co jeszcze warto zobaczyć" przez istniejący `components/poradniki/LinkiKrzyzowe.tsx` | `lib/uslugi/types.ts`, `lib/blog/types.ts`, `lib/materialy/types.ts`, `lib/realizacje/types.ts`, `app/uslugi/[usluga]/page.tsx`, `app/blog/[slug]/page.tsx`, `app/materialy/[slug]/page.tsx`, `app/realizacje/[slug]/page.tsx` | nic | backend-dev |
| **C. Treść 93 linków** | tabele 4.3 A do F z planu zespołu 1 | rejestry treści (pola `powiazane`) | B | backend-dev |
| **D. `globals.css` i paleta** | tokeny (`--accent-decor` na `#00f0ff`, `--accent-2` na `#b026ff`, `--accent-2-text`, `--ring-2-text`, `--neon-green`, `--neon-amber`, `--fg-strong` na `#f2f4fb`, `--shadow-accent` na `none` w spoczynku), karta (korpus gradientowy, wash 0 procent w spoczynku, kalibracja obwódki per rodzina z tabeli 6.2), typy kart A i B przez `:has()` w `@supports`, iskra separatora na `transform` plus bramka 1024 px, bramki mobile dla `.card-aura` i `.card-aura::before`, wygaszenie 9 z 18 źródeł światła, kreski rozdzielające na biel 12 procent | `app/globals.css`, `lib/inf-kategorie.ts` | v7 scalone | frontend-dev, JEDEN właściciel pliku |
| **E. Strona główna: struktura, teksty, montaż** | 16 sekcji do 12, przenumerowanie separatorów, H2 sekcji zamiast H2 w kartach, montaż `<div className="inf-spotlight">` w kartach, dopisanie `inf-card-lg` na kartach wiodących, wszystkie teksty z planu zespołu 4 (z poprawką N5), jawne `href="#diagnoza"` w 9 sekcjach, nowe pola `kafelek` i `tizer` | `app/page.tsx`, `components/sections/*`, `lib/site.ts`, `lib/narzedzia/types.ts`, `lib/narzedzia/index.ts` | D, v7 | frontend-dev, JEDEN właściciel |
| **F. Sprzątanie** | 146 zamian `text-fg-subtle` na `text-fg-muted`, martwy ruch (`HeroContours`, `VideoBackground`, `.sf-hero-rule`, `.sf-menu-pop`, `.sf-window`, `initHeroDepth`, import `HeroRibbon`), pauza `IntersectionObserver` w `CytatyWalec` | 65 plików z `text-fg-subtle`, `components/motion/*`, `components/sections/CytatyWalec.tsx` | A do E | frontend-dev |

Kolejność startu: **A i B od razu równolegle. D po scaleniu v7. C po B.
E po D. F na końcu.**

### 4.4 Kryteria odbioru (nie „kompiluje się", tylko „zrobione dobrze")

| Partia | Kryterium sprawdzalne |
|---|---|
| A | Skrypt Node po 46 adresach z sitemapy: `metaTitle.length + 16 <= 60` i `metaDescription.length` w przedziale 140 do 155, wynik ZERO naruszeń. `grep -c "dla firm" lib/uslugi/chatboty.ts` co najmniej 4. `grep "wąskich gardeł" lib/uslugi/audyt-ai.ts` co najmniej 3 trafienia. `grep "bot telefoniczny" lib/uslugi/voiceboty.ts` trafia w `h1` i `metaTitle` |
| B | `LinkKrzyzowy` istnieje w JEDNYM miejscu, nie w czterech kopiach. Sekcja linków to zwykłe `<a>`, zero komponentów klienckich (sprawdzić: brak `'use client'` w nowym pliku) |
| C | Skrypt liczący linki w `<main>` po całej sitemapie: `/uslugi/voiceboty` ma co najmniej 19 stron źródłowych, `/produkty` co najmniej 7, żaden link nie zwraca 404 |
| D | 1) Zrzut spoczynku strony głównej na desktopie: maksymalnie 3 świecące elementy w kadrze (pigułka nav, główne CTA, kropka statusu). 2) `getComputedStyle` przed i po hover zwraca ten sam `background-color` karty. 3) Najazd na kartę fioletową i cyjanową daje tak samo mocną reakcję (dziś fiolet jest 2,2 razy słabszy). 4) Karta bez linku (Problem, Dowod) NIE unosi się na hover. 5) DevTools: kontrast opisu karty pod reflektorem minimum 4,5:1. 6) Emulacja 375 px: w kadrze zero animacji poza karetką H1 |
| E | Na home dokładnie 12 znaczników `<h2>` i zero `<h2>` wewnątrz kart. Zero podwójnego renderu `u.h1` dla chatboty, voiceboty, audyt-ai. Każdy kafelek ma link, każdy link zwraca 200. Numer separatora zgadza się z pozycją sekcji. Kliknięcie w każde CTA kończy się na widocznym formularzu albo na stronie, którą przycisk obiecuje. Zero em-dash w nowych tekstach. Odpowiedzi FAQ co do znaku identyczne z FAQPage JSON-LD. Cytaty klientów co do znaku jak dziś |
| F | `grep -r "text-fg-subtle" app components` = 0 trafień w JSX. `grep -rn "HeroContours\|VideoBackground" app components` = zero albo tylko pliki do usunięcia. Walec cytatów w Performance nie tyka, gdy sekcja jest poza kadrem |
| CAŁOŚĆ | PSI mobile na produkcji co najmniej 81 (dzisiejszy stan) i A11y 100. Spadek A11y poniżej 100 to regresja, nie kompromis. Zrzut z realnego telefonu przy jasności ekranu 50 procent: neony widoczne, szarości czytelne |

---

## 5. RYZYKA

| # | Ryzyko | Skąd | Zapobieganie |
|---|---|---|---|
| 1 | Kolizja z rundą v7 kasuje jej pracę | 21 zmodyfikowanych plików w drzewie, w tym `app/globals.css` (+400 linii) | Blokada zerowa (4.1). Partie D i E czytają AKTUALNY stan pliku przed pierwszą zmianą, nie plany zespołów |
| 2 | 30 pętli iskry zbija TBT i PSI poniżej 81 | N1 | Bramka 1024 px i `transform` zamiast `left`. Pomiar PSI przed i po partii D |
| 3 | `:has()` na kartach nie działa w starszym Firefoksie i wszystkie karty tracą hover | zespół 2, poziom L3 | Stan bazowy `.inf-card:hover` = wariant spokojny (karta bez linku), wariant z uniesieniem dokładany w `@supports selector(:has(a))`. Nigdy odwrotnie |
| 4 | `@property` animowane na kartach powtarza błąd `.card-aura` (LCP 7 s) | `STATUS.md` opisuje conic z `@property` jako przyczynę LCP 7 s | `@property` wolno użyć wyłącznie dla `--inf-corner-a` i `--inf-luna-a` na karcie POD KURSOREM (jedna karta naraz, 220 ms), nigdy w pętli `infinite` i nigdy na mobile |
| 5 | Zmiana `HOME_CTA` psuje przyciski na 13 powierzchniach spoza home | N4 | Rejestr zostaje na `/kontakt`. Test odbioru: kliknięcie przycisku w nagłówku na `/o-nas` ma otworzyć `/kontakt`, nie zostać na miejscu |
| 6 | Skracanie tytułów gubi frazę, na której już rankujemy | `/uslugi/rozwiazania` traci słowo „indywidualne" | Fraza zostaje w H1 i w treści. Pomiar pozycji frazy „rozwiązania na zamówienie" (poz. 12,4) 14 dni po wdrożeniu przez `tools/gsc-raport.js` |
| 7 | Home zaczyna konkurować ze stronami usług | dokładanie fraz komercyjnych do H1 albo H2 home | H1 home zostaje markowy. Frazy komercyjne wchodzą WYŁĄCZNIE jako anchory linków |
| 8 | Linki w FAQ trafiają do JSON-LD i schema rozjeżdża się z treścią | `FAQ_ITEMS` idą 1:1 do `faqSchema` w `app/page.tsx` | Link jako osobne pole obok odpowiedzi, nigdy w środku stringa. Kryterium odbioru E to sprawdza |
| 9 | Scalanie sekcji kasuje treść zamówioną przez Pawła | `BranzeDemo` (druga maszyna pisania), `PasekZaufania` | Oba scalenia przenoszą tekst 1:1. Zero skasowanych zdań. Obie pozycje na liście decyzji (D6, D7) |
| 10 | Nowa paleta wygląda inaczej na OLED i w trybie redukcji jasnych kolorów iOS | zespół 3, punkt 13.3 | Zrzut z realnego telefonu w kryterium odbioru CAŁOŚĆ, nie z emulatora |
| 11 | 93 nowe linki wydłużają DOM i psują TBT na 10 stronach usług | partia C | Wyłącznie statyczne `<a>`, zero komponentów klienckich, zero ikon SVG na link |
| 12 | Ceny 1490 zł i 3000 zł na home stają się obietnicą, której nie chcemy | partia E, decyzja D2 | Kwoty wchodzą tylko po decyzji Pawła i tylko z `minPrice` albo `ramaCeny.tresc` z rejestru. Żadnej kwoty spoza rejestru |

---

## 6. DECYZJE PAWŁA (jedna lista, 12 pozycji)

Zebrane z czterech planów, odsiane z duplikatów i z rzeczy już rozstrzygniętych
przez v7. Kolejność: od najdroższej w skutkach.

| # | Pytanie | Rekomendacja nadzorcy | Co kosztuje wybór przeciwny |
|---|---|---|---|
| D1 | Główna etykieta CTA: „Pokaż mi, gdzie tracę czas" zostaje czy zmienia się na „Umów bezpłatną diagnozę"? | ZMIENIĆ przycisk, stare słowa przenieść do mikrokopii („Bez zobowiązań. Pokażę Ci, gdzie tracisz czas, i dam konkretną listę.") | Zostawienie: strona ma 8 różnych etykiet na jednej powierzchni, czyli skarga „CTA rozpierdolone" zostaje. Zmiana: łamie kontrakt „Słowa stałe" z `lib/site.ts` i dotyka 14 plików |
| D2 | Czy na stronie głównej pokazujemy realne ceny: audyt 1490 zł i opieka od 3000 zł miesięcznie? | POKAZAĆ. Obie kwoty są już jawne na podstronach i w `public/wiedza-agenta.txt`, a home jest dziś jedyną stroną bez liczby | Bez cen trzy karty cennika niosą ten sam tekst „wycena na diagnozie", czyli zero informacji |
| D3 | ~~Skarga „liczby się animują, lecą cały czas": zarzut czy opis wzorca?~~ **ROZSTRZYGNIĘTE, NIE JEST DECYZJĄ PAWŁA** | To był **OPIS WZORCA**, nie zarzut. Pełny cytat: „zwróć uwagę, że na tamtej stronie... liczby się też animują, lecą cały czas. Po prostu genialnie wygląda ta strona, bardzo mi się podoba". Nadzorca czytał sam fragment i odwrócił sens. **Robimy żyjące liczniki**, czyli wraca partia P2 zespołu 2 | Warunek wykonania: JEDNA wspólna pętla dyrygenta (nie rAF per licznik), desktop od 1024 px, pauza poza kadrem i przy reduced-motion. Bez tego warunku wraca dług wydajności z N1 |
| D4 | Czy karta dostaje pełny korpus wzorca (`rgba(13,14,30,.88)` do `rgba(9,10,22,.72)`)? | TAK. Dziś karta ma kontrast do strony 1,000:1, czyli jest dziurą z ramką | Bez korpusu karta dalej „nie istnieje", a to była decyzja v6, którą właśnie prostujemy |
| D5 | CTA sekcji „Sprawdź, którego Agenta potrzebujesz": zostaje z celem `#diagnoza` czy zmienia się na „Porównaj wszystkie usługi" do `/uslugi`? | ZMIENIĆ, a pytanie „Który Agent zdejmie z Ciebie robotę najpierw?" przenieść na H2 kafelków usług | Zostawienie: przycisk obiecuje wybór, a rzuca do formularza. To jest sekcja z Twojej skargi numer 1 |
| D6 | Czy `BranzeDemo` traci własne okno terminala z maszyną pisania (druga maszyna na stronie)? | ZOSTAWIĆ okno, przenieść sekcję do Problemu jako blok z 4 kafelkami branż | Usunięcie: znika element, którego nie zamawiałeś do usunięcia. Zostawienie: dwie maszyny pisania na jednej stronie |
| D7 | Czy `PasekZaufania` znika (jego trzy tytuły to 1:1 chipy w hero)? | TAK, znika, chipy zostają w hero i dostają linki | Zostawienie: ten sam tekst dwa razy w odległości jednego ekranu |
| D8 | H1 strony głównej: „Budujemy AI Agentów, nie chatboty." zostaje? | ZOSTAJE. Home ma 60 wyświetleń na frazę markową i pozycję 1,0, nie walczy o żadną frazę pieniądza, a H1 to element LCP (maszyna pisania) | Dopisanie „dla firm": maszyna pisze o 9 znaków dłużej, LCP mobile to dziś nasz sufit, a zysk SEO jest teoretyczny |
| D9 | Hero: 3 przyciski czy 2? | 3, z poprawionymi celami. Nie usuwam elementów hero bez Twojej zgody | Redukcja do 2 uspokaja pierwszy ekran, ale kasuje wejście do kalkulatora |
| D10 | H1 audytu: wariant zalecany („mapa wąskich gardeł i oszczędności czasu") czy dokładne dopasowanie („mapa wąskich gardeł i dźwigni szybkiego zwrotu", 1:1 z zapytania o 134 wyświetleniach)? | Wariant zalecany. Drugi brzmi jak konsulting, a nasza zasada mówi „bez żargonu" | Dokładne dopasowanie da prawdopodobnie szybszy skok CTR z dzisiejszego zera |
| D11 | Zdanie o potwierdzaniu wizyt przez voicebota („dzień przed wizytą dzwoni i potwierdza termin") | Tylko jeśli voicebot to REALNIE robi. Fraza ma 29 wyświetleń, ale obietnica bez pokrycia kosztuje więcej | Bez tego zdania tracimy dokładne dopasowanie do frazy „voicebot do potwierdzania wizyt" |
| D12 | Statystyka „Większość małych firm traci kilkanaście godzin tygodniowo" w sekcji Problem | USUNĄĆ albo podać źródło. Dziś to liczba bez pokrycia, łamie zasadę zero zmyślonych liczb | Zostawienie: jedna z niewielu liczb na stronie nie ma źródła |

Rozstrzygnięte przeze mnie, NIE wymagają Twojej decyzji (zapisuję, żeby było jasne):
`--accent` zostaje `#22d3ee` (R8), reflektor w wersji delegowanej (R1),
`.inf-seam` nie powstaje (R2), `HOME_CTA.href` zostaje `/kontakt` (R11, N4),
brak `backdrop-filter` (R5), wash 0 procent w spoczynku (R6),
kreski rozdzielające treść na biel 12 procent (rekomendacja zespołu 3, przyjęta),
etykieta separatora 11 px (rozstrzygnięte przez v7).

---

## 7. CZEGO NIE ZWERYFIKOWAŁEM

- **NIEZWERYFIKOWANE: wygląd i wydajność po zmianach.** Nie uruchamiałem builda,
  dev servera ani przeglądarki (zakaz tej fazy, przeglądarka zajęta). Wszystkie
  liczby wydajnościowe pochodzą z odczytu reguł CSS i markupu, nie z profilera.
  Przed odbiorem partii D trzeba zrobić jeden przebieg Performance na 375 px.
- **NIEZWERYFIKOWANE: skutek zmian w Google.** Efekt metadanych widać w GSC po
  1 do 3 tygodniach. Pierwszy sensowny pomiar: 14 dni po wdrożeniu,
  przez `tools/gsc-raport.js`.
- **HIPOTEZA, nie fakt:** że skarga „liczby lecą cały czas" dotyczy walca cytatów
  (2,2 s) i 30 iskier separatorów, a nie liczników. Wymaga potwierdzenia (D3).
- Nie sprawdzałem, czy runda v7 dopisze coś jeszcze po moim odczycie. Partie D i E
  mają w kryteriach odbioru obowiązek odczytu aktualnego stanu pliku przed startem.
- Nie liczyłem kontrastu dla trybu `[data-theme='light']` (jasne wyspy). Jeśli
  partia E wstawi kolorowy tekst do jasnej wyspy, kontrast trzeba przeliczyć od zera.
- Nie zmieniłem ani jednego pliku kodu. Jedyny plik zapisany przez ten przebieg
  to ten plan.

Pełna ścieżka pliku:
`C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\raporty\MASTER-PLAN.md`
