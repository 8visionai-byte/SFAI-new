# POMIARY v9 — odstępy między sekcjami, pomarańcz w przerwach, dropdown, terminal

Zwiad pomiarowy do spec v9 punkty 1, 2, 4, 5. **Zero zmian w kodzie** (ten plik to jedyny
artefakt). Wszystkie liczby zmierzone w przeglądarce na zbudowanej stronie.

## Jak mierzone (żeby dało się powtórzyć)

- `npm run build` (exit 0) + `npx next start -p 3111`, czyli produkcyjny render, nie dev.
- Chrome headless sterowany po CDP z Node (brak Claude Browser w tej sesji, więc własny
  sterownik: `scratchpad/cdp.mjs`). Viewport 1440x900 i 390x844, `deviceScaleFactor 1`.
- Emulacja `prefers-reduced-motion: reduce` przy pomiarach układu. Powód: `Reveal`
  (components/motion/Reveal.tsx) trzyma elementy na `opacity: 0` i `translateY(16px)`,
  dopóki nie wejdą w widok, a `getBoundingClientRect` liczy transform. Reduced-motion
  pokazuje treść od razu, więc geometria jest czysta.
- Dwie miary odstępu, bo znaczą co innego:
  - **widoczna przerwa** = od dolnej krawędzi ostatniego elementu, który cokolwiek maluje
    (tekst, ikona, tło karty, obwódka karty), do górnej krawędzi pierwszego takiego
    elementu w następnej sekcji. To jest to, co widzi oko.
  - **treść do treści** = od ostatniego elementu z tekstem/obrazem do pierwszego takiego
    elementu. Większa tam, gdzie sekcja kończy się kartą (pusty padding karty dolicza się
    do pustki).
- Kolor mierzony na realnych zrzutach viewportu (dekoder PNG w Node, bez zależności).
  UWAGA metodyczna: `Page.captureScreenshot` z parametrem `clip` liczy współrzędne w skali
  DOKUMENTU i nie renderuje warstw `position: fixed`. Pierwsze podejście dawało przez to
  fałszywe zera. Ostateczne pomiary są ze zrzutów pełnego viewportu po przewinięciu.

---

## 1. ODSTĘPY MIĘDZY SEKCJAMI — STAN PRZED (desktop 1440px)

Wysokość strony głównej: **27 399 px**. Suma 15 przerw: **5 270 px = 19,2 procent całej
strony to pustka między sekcjami.**

Mediana przerwy: **375,6 px**. Minimum 296,4 px, maksimum 375,6 px.

| # | para sekcji | widoczna przerwa | treść do treści | padding-bottom A | margines separatora góra | separator | margines separatora dół | padding-top B | luz wewn. A | luz wewn. B |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hero -> PromoUslugi | **375,6 px** | 500,6 px | 151,2 | 48 | 13,2 | 48 | 115,2 | 50,0 | 75,0 |
| 2 | PromoUslugi -> PasekZaufania | **296,4 px** | 321,3 px | 115,2 | 48 | 13,2 | 48 | 72 | 25,0 | 0 |
| 3 | PasekZaufania -> Problem | **296,4 px** | 296,4 px | 72 | 48 | 13,2 | 48 | 115,2 | 0 | 0 |
| 4 | Problem -> BranzeDemo | **339,6 px** | 404,6 px | 115,2 | 48 | 13,2 | 48 | 115,2 | 65,0 | 0 |
| 5 | BranzeDemo -> Rozwiazanie | **375,6 px** | 473,5 px | 115,2 | 48 | 13,2 | 48 | 151,2 | 33,0 | 65,0 |
| 6 | Rozwiazanie -> JakToDziala | **375,6 px** | 375,6 px | 151,2 | 48 | 13,2 | 48 | 115,2 | 0 | 0 |
| 7 | JakToDziala -> Oferta | **364,6 px** | 364,6 px | 115,2 | 48 | 13,2 | 48 | 151,2 | 0 | -11,0 |
| 8 | Oferta -> NarzedziaTeaser | **375,6 px** | 375,6 px | 151,2 | 48 | 13,2 | 48 | 115,2 | 0 | 0 |
| 9 | NarzedziaTeaser -> Bezpieczenstwo | **375,6 px** | 408,6 px | 115,2 | 48 | 13,2 | 48 | 151,2 | 33,0 | 0 |
| 10 | Bezpieczenstwo -> Dowod | **375,6 px** | 547,5 px | 151,2 | 48 | 13,2 | 48 | 115,2 | 33,0 | 139,0 |
| 11 | Dowod -> GwarancjaEfektu | **339,6 px** | 478,6 px | 115,2 | 48 | 13,2 | 48 | 115,2 | 0 | 139,0 |
| 12 | GwarancjaEfektu -> DowodSpoleczny | **375,6 px** | 375,5 px | 115,2 | 48 | 13,2 | 48 | 151,2 | 0 | 0 |
| 13 | DowodSpoleczny -> FAQ | **375,6 px** | 375,5 px | 151,2 | 48 | 13,2 | 48 | 115,2 | 0 | 0 |
| 14 | FAQ -> ZyweDemo | **296,4 px** | 296,4 px | 115,2 | 48 | 13,2 | 48 | 72 | 0 | 0 |
| 15 | ZyweDemo -> FinalneCTA | **332,4 px** | 332,3 px | 72 | 48 | 13,2 | 48 | 151,2 | 0 | 0 |

Wzór, który tłumaczy KAŻDY wiersz tabeli:

```
przerwa = padding-bottom sekcji A  +  48  +  13,2  +  48  +  padding-top sekcji B
                                    \________ blok separatora = 109,2 px ________/
```

### Skąd biorą się te paddingi (pułapka własnych tokenów)

`components/ui/Section.tsx:49-51` mapuje trzy rejestry na klasy, a `app/globals.css:75-79`
podaje ich realne wartości:

| rejestr | klasa | token | wartość przy 1440px | wartość przy 390px |
|---|---|---|---|---|
| `space="sm"` (tight) | `py-section-tight` | `clamp(3rem, 5vw, 5rem)` | **72 px** | 48 px |
| `space="md"` (domyślny) | `py-section` | `clamp(4rem, 8vw, 8rem)` | **115,2 px** | 64 px |
| `space="lg"` (loose) | `py-section-loose` | `clamp(5.5rem, 10.5vw, 10rem)` | **151,2 px** | 88 px |

Rozdział sekcji na rejestry: lg ma Hero, Rozwiazanie, Oferta, Bezpieczenstwo,
DowodSpoleczny, FinalneCTA. sm ma PasekZaufania i ZyweDemo. Reszta md.

Separator: `components/ui/SekcjaSeparator.tsx:43` daje `my-6 md:my-7`. Zmierzone przy
1440px: **margin-top 48 px, margin-bottom 48 px** (`--space-7` = 3rem, nie 28px jak
w domyślnym Tailwindzie), wysokość samego paska **13,2 px** (linia 1 px + etykieta mono
11 px, waga 700). Sztuk na stronie: **15**.

## 2. GDZIE JEST NAJWIĘKSZA I CO JĄ TWORZY

**Największa widoczna przerwa: 375,6 px, i to w 8 z 15 par** (Hero->PromoUslugi,
BranzeDemo->Rozwiazanie, Rozwiazanie->JakToDziala, Oferta->NarzedziaTeaser,
NarzedziaTeaser->Bezpieczenstwo, Bezpieczenstwo->Dowod, GwarancjaEfektu->DowodSpoleczny,
DowodSpoleczny->FAQ). Skład: 151,2 (padding lg) + 109,2 (blok separatora) + 115,2
(padding md).

**Największa przerwa treść do treści: 547,5 px** (Bezpieczenstwo -> Dowod). Do 375,6 px
struktury dochodzi 33 px luzu pod ostatnim akapitem w karcie Bezpieczeństwa i 139 px
luzu nad pierwszą ikoną w karcie Dowodu (padding karty `p-6 md:p-10` plus odstępy
wewnętrzne). Drugie miejsce: Hero -> PromoUslugi 500,6 px.

**Kluczowa proporcja: sam blok separatora (109,2 px) jest dokładnie tak duży, jak CAŁA
przerwa między sekcjami we wzorcu.** A doklejają się do niego dwa paddingi po 115-151 px.

### Kontrola trzech hipotez ze spec

1. **Puste kontenery o wysokości w przerwie: NIE MA ŻADNEGO.** Skanowałem każdy pas
   przerwy pod kątem elementów o wysokości ≥ 6 px, które nie mają treści (albo mają
   w klasie aura/nebula/glow/blob). Wynik dla wszystkich 15 par: zero trafień. Pustka
   to czysty padding, nie sierotki w DOM.
2. **Składające się marginesy (margin collapsing): NIE WYSTĘPUJĄ.** Zmierzona geometryczna
   szczelina `dół sekcji A -> góra separatora` = **48,0 px** i `dół separatora -> góra
   sekcji B` = **48,0 px** w każdej z 15 par. Oba marginesy działają w pełni i sumują się
   z paddingami. Nic się nie zjada, ale też nic się nie dubluje.
3. **Ujemne marginesy hero: są, ale niczego nie wypychają.** Jedyny element na całej
   stronie z ujemnym marginesem to slot bloba w `components/sections/Hero.tsx:128`
   (`-mt-[16px] -mb-[64px]`, od 1024px `lg:-mt-[40px] lg:-mb-[96px]`; zmierzone przy
   1440px: margin-top **-40 px**, margin-bottom **-96 px**). Ujemny margines CIĄGNIE
   treść do góry, czyli zmniejsza pustkę, a nie ją tworzy.

Dodatkowy pojedynczy sprawca: hero dokleja 50 px luzu na dole, bo pod ostatnim akapitem
stoi dekoracyjna trasa `sf-route` z `mt-12` (`components/sections/Hero.tsx:267`).
`mt-12` NIE jest naszym tokenem (własna mapa w `tailwind.config.ts:95-112` obejmuje
tylko 1-11), więc wpada na domyślną skalę Tailwinda = **48 px**.

### Mobile 390px (dla porządku)

Wysokość strony 39 880 px, suma przerw **3 096 px**, mediana **229,2 px**.
Skład: paddingi 48/64/88 px (przy 390px wygrywają dolne progi clampa) + separator
32 + 13,2 + 32 = 77,2 px. Anomalia: para FAQ -> ZyweDemo pokazuje 31,4 px, bo rozwinięty
akordeon FAQ sięga niżej niż jego kontener. Reszta par jest regularna.

## 3. WZORZEC infinitytechstack.uk — PUNKT ODNIESIENIA

Zmierzone tą samą metodą, viewport 1440x900, strona główna. Wysokość dokumentu 8 786 px.

| co | wartość u wzorca | wartość u nas (1440) |
|---|---|---|
| padding-top sekcji | **48 px** (stałe, nie clamp) | 72 / 115,2 / 151,2 px |
| padding-bottom sekcji | **48 px** | 72 / 115,2 / 151,2 px |
| wysokość separatora `.lp-divider` | **13,2 px** | 13,2 px (identycznie) |
| margines separatora | **0 px góra, 0 px dół** | 48 px góra, 48 px dół |
| **przerwa między sekcjami (mediana)** | **109,2 px** | **375,6 px** |
| etykieta separatora | 8,8 px, rgba(139,92,246,0.3) | 11 px, waga 700, fiolet jaśniejszy |
| szerokość kontenera | 1120 px | 1200 px |

Zmierzone przerwy wzorca po kolei: 81,2 / 109,2 / 109,2 / 109,2 / 109,2 / 22,5 px
(ta ostatnia to stopka, hero -> promo ma nawet ujemny zakład -84,5 px przez `margin-top: -16px`).
Poza hero i stopką wzorzec trzyma **równiutkie 109,2 px na każdej granicy**.

**Stosunek: jesteśmy 3,44x szerzej niż wzorzec** (375,6 / 109,2). W najwęższym miejscu
2,71x (296,4 / 109,2).

Gdyby przerwy zeszły do proporcji wzorca, strona skróciłaby się o około
**3 630 px, czyli 13 procent wysokości**, bez usuwania ani jednego zdania.

Konstrukcja wzorca warta podkreślenia: **ich separator ma margines 0 i siedzi wprost
między dwoma paddingami po 48 px.** Nasz separator dokłada 96 px własnych marginesów do
paddingów, które już są 2,4-3,1x większe niż u nich. Stąd wrażenie „pasek wisi samotnie
w środku wielkiej dziury": nad paskiem jest 115-151 px pustki i pod paskiem tyle samo.

## 4. POMARAŃCZOWA PLAMA W PRZERWACH — CO NAPRAWDĘ MALUJE

Skan całej strony ekran po ekranie (31 zrzutów pełnego viewportu, próg „pomarańczowy" =
R > 30 i R-B > 15 i G >= B).

**W żadnym z 15 pasów przerwy nie ma ani jednego pomarańczowego piksela.** Średni kolor
każdego pasa przerwy to **rgb(6, 6, 12)**, czyli czyste tło `body`. Warstwy globalne są
czyste: `.inf-nebula` (`app/globals.css:3608-3618`) ma tylko fiolet #8b5cf6 8 procent,
cyjan #22d3ee 6 procent i magentę #ff007f 5 procent, zero bursztynu. `.inf-stars`
(3571-3597) to biel i błękit.

Pomarańcz jest tylko tu (dokładne zakresy y w dokumencie, 1440px):

| gdzie | zakres y | co maluje |
|---|---|---|
| licznik w hero „14" | 458-486 | `.inf-counter-value`, kolor #ffa101 + text-shadow 12 px |
| karta AUDYT w PromoUslugi | 2216-2500 | `.inf-card` w kolorze kategorii |
| kafle i cytat bursztynowy | 3978-4114, 6228-6295 | `.inf-tile`, znak cytatu |
| karty JakToDziala / Oferta | 8966-9093, 12756-13034 | `.inf-tile` w kartach |
| karta Audyt w NarzedziaTeaser | 14711-15064 | `.inf-card` + `.inf-sub-dot` |
| karta bursztynowa Bezpieczeństwa | 17177-17493 | `.inf-tile` |
| krawędź dolna karty Gwarancji | 18900-18904 | narożniki `.inf-card` |
| karty cytatów w DowodSpoleczny | 19722-21173 | `.inf-card` bursztynowy |

Źródło koloru: **`lib/inf-kategorie.ts`** (linie 84, 87, 107, 117 i dalej) przypisuje
kategoriom „dokumenty-faktury", „audyt-ai", „material" kolor **`c: '#ffa101'`**
i odcień `#ffc120`. Ten kolor wchodzi w custom property `--card-c` i maluje przez reguły
z `app/globals.css`:
- `.inf-card` narożniki, `color-mix(--card-c 22 procent)` (3047-3064),
- `.inf-tile` tło 14 procent, obwódka 28 procent i **poświata `0 0 18px -4px` przy
  kryciu 55 procent** (2922 i dalej),
- `.inf-card-sub` oraz `.inf-tag` text-shadow `0 0 12px` przy 45 procent,
- `.inf-spotlight` radial 180 px przy 8 procent.

**Diagnoza:** to nie jest plama w tle. To bursztynowa karta stojąca NA KRAWĘDZI sekcji
tuż nad 376-pikselową dziurą. Jej narożniki i poświata kafla są ostatnią rzeczą, jaką
oko widzi przed pustką, więc pomarańcz „zostaje" w przerwie. Zawężenie przerw z punktu 1
samo zdejmuje większość tego wrażenia. Jeśli mimo to ma zniknąć, dźwignie są dwie:
odebrać bursztyn kategoriom kart stojących na końcu sekcji (`lib/inf-kategorie.ts`) albo
ściąć zasięg poświaty `.inf-tile` (dziś 18 px przy 55 procent).

Dowody wizualne (zrzuty 1440x900 z produkcyjnego builda), katalog `raporty/dowody-v9/`:
- `przerwa-promo-zaufanie-1440.png` — przerwa PromoUslugi -> PasekZaufania, bursztynowa
  karta AUDYT stoi tuż nad pustką,
- `przerwa-gwarancja-opinie-1440.png` — separator „12 · OPINIE" wisi samotnie w środku
  pustki, 165 px nad nim i 210 px pod nim,
- `terminal-branze-1440.png` — okno maszyny pisania, tło nieprzezroczyste, ale prawie
  nieodróżnialne od tła strony.

## 5. DROPDOWN I TERMINAL — REALNE WARTOŚCI

### Dropdown nawigacji (`.inf-dd`, `app/globals.css:2766-2773`)

| parametr | zmierzona wartość |
|---|---|
| tło panelu | `rgba(10, 10, 16, 0.72)` czyli **krycie 72 procent** |
| backdrop-filter | `blur(24px)` |
| obwódka | `rgba(255, 255, 255, 0.1)`, 1 px |
| cień | inset biel 7 procent + `0 10px 30px rgba(0,0,0,0.5)` |
| sztuk na stronie | 5 |

Nazwa usługi w wierszu (`.inf-dd-title`, `app/globals.css:2787-2792`):
**font-weight 600**, font-size **16 px** (`--fs-body-sm`), rodzina Inter, kolor
rgb(228, 228, 240). Badge (`.inf-dd-badge`): waga 600, 10 px.

Czyli prośba Pawła „o jakieś 10 procent ciemniej" to zejście z 0.72 na okolice 0.82,
a „cieńsza czcionka" to zejście z 600 na 500 w `.inf-dd-title`.

### Okno terminala z maszyną pisania

Na stronie są DWA okna podpisane „Agent SimpleFast" i mają różne tła:

| okno | plik | y w dokumencie | tło | krycie |
|---|---|---|---|---|
| terminal z maszyną pisania („dla salonu: odbieram telefon...") | `components/sections/BranzeDemo.tsx:185` | 5826 | `rgb(17, 17, 39)` = `--surface` #111127 | **1,0 czyli NIEPRZEZROCZYSTE** |
| pasek górny tego okna | `components/sections/BranzeDemo.tsx:187` | 5827 | `rgb(14, 14, 34)` = `--surface-sunken` | 1,0 |
| konsola porównawcza AgentDemo (czat „Chcę umówić wizytę") | `components/sections/AgentDemo.tsx:100` (klasa `sf-glass`) | 7603 | `rgba(0, 0, 0, 0.1)` + `backdrop-filter: blur(14px)` | **0,1 czyli PRZEZROCZYSTE** |

**Sprzeczność do rozstrzygnięcia z Pawłem.** Okno z maszyną pisania, które cytuje spec,
technicznie NIE jest przezroczyste: ma pełne krycie. Problem jest inny i też mierzalny:
jego tło #111127 kontra tło strony #06060c daje kontrast **1,09:1**, czyli różnicę
praktycznie niewidoczną. Dlatego okno wygląda, jakby prześwitywało, choć nic przez nie
nie przechodzi. Naprawa to nie „dodać krycie" (jest 100 procent), tylko podnieść jasność
albo obwódkę korpusu okna. Realnie przezroczysta jest druga konsola (`sf-glass`,
krycie 0,1 plus blur 14 px) i jeśli Pawłowi chodziło o nią, to tam jest robota.

## Weryfikacja

- `npm run build` -> **exit 0** (przed pomiarami i po nich, kod nietknięty).
- `npx tsc --noEmit` -> **exit 0**.
- `npx next start -p 3111` -> serwer produkcyjny, wszystkie pomiary z tego serwera.
- Pomiary wzorca: `https://infinitytechstack.uk/` przez Chrome headless, HTTP 200
  (przez `curl` strona zwraca 429, przez przeglądarkę wpuszcza).

## Czego NIE zmierzyłem

- **Zrzuty z produkcji (simplefast.ai) NIEZMIERZONE.** Wszystko liczone z lokalnego
  builda z bieżącego HEAD (`17c5a35`, INFINITY v8). Jeśli na Vercelu stoi starszy commit,
  liczby mogą się różnić.
- **Wzorzec na mobile NIEZMIERZONY** (spec pytał o odstępy jako punkt odniesienia,
  a te są desktopowe; ich stronę mierzyłem tylko przy 1440px).
- **Pomiar w prawdziwym oknie Chrome NIEZMIERZONY** — użyłem headless. Dla geometrii
  i kolorów to ta sama ścieżka renderowania, ale przy ocenie ruchu (iskra separatora,
  dryf mgławicy) headless nie jest dowodem.
