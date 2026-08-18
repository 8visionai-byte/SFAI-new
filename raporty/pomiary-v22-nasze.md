# Pomiary v22: inwentarz NASZYCH podstron (stan produkcji)

Data: 2026-08-18. Rola: audytor podstron. Zero commitów, zero zmian w repo poza tym plikiem.
Cel: policzyć, co każda nasza trasa ma dzisiaj, zanim ubierzemy podstrony w język wzorca (SPEC v22).

## 0. Metoda

Wszystko mierzone NA PRODUKCJI `https://www.simplefast.ai`, 50 adresów z żywej sitemapy.
Dwa niezależne przebiegi:

1. **Sonda bota (bez JS)** : surowy HTML pobrany nagłówkiem GPTBot, bez przeglądarki.
   Liczy znaki tekstu, H1/H2/H3, `<table>`, `<details>`, `<li>`, JSON-LD. To jest
   próg z priorytetu nadrzędnego („boty i Google mają czytać lepiej niż dziś").
   Skrypt: `...\scratchpad\v22-n1-bot.mjs` + `v22-n1-bot.json`.
2. **Sonda renderu** : Chrome headless (playwright-core), 1440x900, po pełnym przewinięciu
   strony (żeby `Reveal` odsłonił treść). Liczy sekcje, `.inf-card` z wariantami, `.inf-tile`,
   `.inf-hero-stat`, `.inf-chip`, `.inf-arrow`, `.inf-overline`, wysokość dokumentu.
   Skrypty: `v22-n2-struktura.mjs` (całe drzewo) i `v22-n3-main.mjs` (tylko `<main>`).
   Dane: `v22-n2-struktura.json`, `v22-n3-main.json`.
3. **Mapa komponentów** : statyczna analiza importów `app/` -> `components/`
   z rozwinięciem barreli (`index.ts`). Skrypt: `v22-n4-komponenty.mjs`, wynik
   `v22-n4-komponenty.txt`.

WAŻNE dla czytania liczb: nawigacja i stopka dokładają na KAŻDEJ stronie ok. 31 `.inf-tile`
i ok. 4600 znaków tekstu. Dlatego **wszystkie liczby ozdobników i znaków w tabelach niżej
są liczone TYLKO wewnątrz `<main>`** (sonda 3). Liczby z sondy bota (surowy HTML) obejmują
całą stronę razem z chrome i są podane osobno tam, gdzie mają znaczenie dla SEO.

---

## 1. INWENTARZ: co która trasa ma

Legenda: `karty` = `.inf-card` w `<main>`; `kafle` = `.inf-tile` + `.inf-hero-stat`;
`chipy` = `.inf-chip`; `strz.` = `.inf-arrow`; `ovl` = `.inf-overline`;
`znaki` = tekst w `<main>`; `wys.` = wysokość dokumentu w px przy 1440.

### 1a. Huby (strony listujące)

| trasa | sekcje | karty | kafle | chipy | strz. | ovl | znaki | H2 | H3 | tabela | `<details>` | wys. px | linki w main |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /blog | 3 | 10 | 5 | 0 | 5 | 11 | 3521 | 2 | 10 | NIE | NIE | 3189 | 6 |
| /poradniki | 2 | 4 | 4 | 0 | 4 | 1 | 2675 | 1 | 4 | NIE | NIE | 2438 | 6 |
| /realizacje | 2 | 8 | 0 | 0 | 8 | 8 | 4881 | 1 | 8 | NIE | NIE | 4016 | 9 |
| /produkty | 4 | 14 | 4 | 0 | 0 | 4 | 6547 | 3 | 14 | NIE | NIE | 5922 | 3 |
| /materialy | 3 | 6 | 6 | 0 | 6 | 7 | 2294 | 2 | 6 | NIE | NIE | 3200 | 9 |
| /narzedzia | 7 | 17 | 5 | 0 | 5 | 7 | 12463 | 6 | 8 | TAK (1) | TAK (1) | 13495 | 13 |
| /wiedza | 5 | 6 | 6 | 0 | 6 | 2 | 3316 | 4 | 6 | NIE | NIE | 4305 | 10 |
| /ai-radar | 2 | **0** | **0** | 0 | 0 | **0** | **786** | 1 | 2 | NIE | NIE | 2083 | 4 |
| /uslugi | 6 | 10 | 10 | 0 | 10 | 3 | 2957 | 5 | 10 | NIE | NIE | 5067 | 13 |
| /o-nas | 7 | 8 | 3 | 0 | 0 | 1 | 4821 | 6 | 5 | NIE | NIE | 5595 | 7 |
| /kontakt | 1 | 1 | 0 | 0 | 0 | 5 | 556 | 0 | 0 | NIE | NIE | 1838 | 2 |

Czego huby NIE mają (wszystkie bez wyjątku): **żadnej tabeli**, **żadnego akordeonu
`<details>`** (poza /narzedzia), **zera chipów `.inf-chip`**, zera kafli statystyk
`.inf-hero-stat`. Karty na hubach to wyłącznie karty pozycji listy (`KartaCzesci`), nie ma
ani jednej karty „treściowej" z liczbą, cytatem czy porównaniem.

Osobno: **/ai-radar jest pusty**. Rejestr `lib/ai-radar/news` ma 2 wpisy, ale oba mają
`szablon: true`, więc są wyłączone z sitemapy i z listingu. Hub renderuje 786 znaków,
0 kart, 0 ozdobników. To najsłabsza strona w całym serwisie.
Osobno: **/kontakt ma 0 nagłówków H2** i 556 znaków w `<main>`.

### 1b. Podstrony szczegółowe (szablony dynamiczne)

Wartości identyczne w obrębie szablonu podane raz, rozrzut w nawiasie.

| trasa (szablon) | ile stron | sekcje | karty | kafle | chipy | strz. | znaki | H2 | H3 | tabela | `<details>` | wys. px | linki |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /uslugi/[usluga] | 9 | 8 (voiceboty 9) | 5 (voiceboty 8) | 6-7 | 3 | 0 (voiceboty 3) | 3675-5153 | 7-8 | 3-6 | TAK (1) | TAK (6-7) | 5913-7291 | 4-8 |
| /uslugi/voiceboty/[podstrona] | 3 | 9 | 7 | 7 | 3 | 2 | 3874-3941 | 8 | 5 | TAK (1) | TAK (6) | 6375-6534 | 8 |
| /uslugi/architekci-wartosci-ai | 1 | 11 | 9 | 6 | 0 | 0 | 10534 | 10 | 15 | TAK (2) | TAK (6) | 11682 | 6 |
| /realizacje/[slug] | 8 | 7 | 4 | 2 | 0 | 1 | 2408-2639 | 6 | **0** | **NIE** | TAK (2) | 4456-4769 | 5 |
| /poradniki/[slug] | 4 | 5 | 7-18 | 1-5 | 0 | 5-8 | 6193-8766 | 7-10 | 3 | TAK (1-2) | TAK (4-6) | 7757-10027 | 9-12 |
| /blog/[slug] | 5 | 3 | **1** | 1 | 0 | **0** | 5815-7196 | 6-8 | **0** | TAK (1-2) | TAK (3-4) | 5851-6803 | **2** |
| /materialy/[slug] | 6 | 5 | **1** | 1 | 0 | **0** | 5780-11306 | 7-14 | **0** | 0 lub 3-6 | TAK (3-4) | 6502-9230 | 6 |
| /produkty/[slug] | **0** | trasa nie istnieje (produkty żyją tylko na hubie) | | | | | | | | | | | |

Czego NIE ma który szablon:

- **/blog/[slug]**: zero H3, zero strzałek, zero kafli liczb, zero sekcji „zobacz też",
  **tylko 2 linki wewnętrzne w całym `<main>`** (to najgorszy wynik linkowania w serwisie),
  jedyna `.inf-card` na stronie to karta FAQ na samym dole. Cała treść artykułu to jedna
  sekcja o wysokości ok. 4400 px bez ani jednej ramki.
- **/materialy/[slug]**: dokładnie ten sam obraz co blog (1 karta = FAQ, 0 H3, 0 strzałek),
  plus 3 z 6 materiałów nie mają żadnej tabeli.
- **/realizacje/[slug]**: zero tabel, zero H3, zero kafli statystyk. Metryki efektu są,
  ale renderowane w 2 kartach, nie w kaflach `.inf-hero-stat` jak w hero usług.
- **/uslugi/[usluga]** (poza voicebotami): zero `.inf-arrow`, bo `PodstronyPowiazane`
  renderuje się tylko dla usług, które mają podstrony. 8 z 9 usług nie ma tej sekcji.
- **/poradniki/[slug]**: jedyny szablon, który po v21 wygląda dobrze (7-18 kart,
  5-8 strzałek, 9-12 linków). To jest nasz wzorzec wewnętrzny do rozniesienia dalej.

### 1c. JSON-LD (sonda bota, bez JS) : stan dobry, nie psuć

| typ strony | schema w HTML |
|---|---|
| / | FAQPage, Service, Organization, WebSite |
| huby | BreadcrumbList, Organization, WebSite (/produkty dodatkowo ItemList) |
| /uslugi/* | Service, FAQPage, BreadcrumbList, Organization, WebSite |
| /realizacje/[slug] | BreadcrumbList, FAQPage, Organization, WebSite |
| /blog, /poradniki, /materialy [slug] | Article, BreadcrumbList, FAQPage, Organization, WebSite |
| /o-nas | AboutPage, Person x2, BreadcrumbList, Organization, WebSite |

Braki w JSON-LD: huby `/blog`, `/poradniki`, `/realizacje`, `/materialy`, `/narzedzia`
**nie mają `ItemList`** (ma go tylko `/produkty`). `/realizacje/[slug]` nie ma
`CreativeWork`/`Article` mimo że `components/seo/schemas.ts` ma gotową funkcję z `keywords`.

---

## 2. ŚCIANY TEKSTU (ranking od najgorszej)

Miara: znaki tekstu w `<main>` podzielone przez liczbę `.inf-card` w `<main>`.
Im wyżej, tym więcej surowego tekstu przypada na jedną ramkę.

| # | trasa | znaki | kart | znaków na kartę | komentarz |
|---|---|---|---|---|---|
| 0 | /ai-radar | 786 | 0 | brak kart | odwrotny problem: pusto, nie ma czego ubierać |
| 1 | /materialy/50-promptow-ai-dla-wlasciciela-firmy | 11306 | 1 | **11306** | 58 `<li>`, 0 tabel, jedna sekcja 4000+ px |
| 2 | /materialy/checklista-20-procesow-do-automatyzacji-ai | 7268 | 1 | 7268 | sekcja 2 ma 5244 znaki i 4025 px bez ramki |
| 3 | /blog/ai-act-a-twoja-firma-2026 | 7196 | 1 | 7196 | sekcja 2 ma 6443 znaki i 4434 px bez ramki |
| 4 | /materialy/10-bledow-przy-wdrazaniu-ai-w-firmie | 6879 | 1 | 6879 | 14 H2, 0 tabel, 0 kart w treści |
| 5 | /materialy/prompty-branzowe-kancelaria-ecommerce-budowlanka | 6837 | 1 | 6837 | 24 `<li>`, 0 tabel |
| 6 | /blog/chatbot-czy-ai-agent-roznice | 6559 | 1 | 6559 | |
| 7 | /blog/jak-voicebot-odbiera-telefony | 6499 | 1 | 6499 | |
| 8 | /blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026 | 5891 | 1 | 5891 | 6 akapitów dłuższych niż 400 znaków |
| 9 | /materialy/arkusz-policz-koszt-recznych-zadan | 5837 | 1 | 5837 | |
| 10 | /blog/automatyzacja-procesow-ai-od-czego-zaczac | 5815 | 1 | 5815 | |
| 11 | /materialy/jak-pisac-prompty-ktore-dzialaja | 5780 | 1 | 5780 | |
| 12 | /uslugi/architekci-wartosci-ai | 10534 | 9 | 1170 | najdłuższa strona serwisu (11682 px) |
| 13 | /poradniki/ile-kosztuje-automatyzacja-ai-w-firmie | 8137 | 7 | 1162 | najsłabszy z 4 poradników po v21 |
| 14 | /uslugi/dokumenty-faktury | 4613 | 5 | 923 | 4 akapity dłuższe niż 400 znaków |
| 15 | /uslugi/opieka-ai | 4490 | 5 | 898 | |
| 16 | /uslugi/audyt-ai | 4388 | 5 | 878 | |
| 17 | /uslugi/agent-rekrutacyjny | 4323 | 5 | 865 | |
| 18 | /poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy | 7459 | 9 | 829 | |
| 19 | /uslugi/rozwiazania | 4065 | 5 | 813 | |
| 20 | /uslugi/optymalizacja | 4012 | 5 | 802 | |
| 21 | /narzedzia | 12463 | 17 | 733 | tekst to w większości UI kalkulatorów |
| 22 | /poradniki/ile-kosztuje-chatbot-dla-firmy-2026 | 8766 | 18 | **487** | **stan docelowy: 8,7 tys. znaków rozbite na 18 kart** |

Wniosek jednym zdaniem: **wszystkie 11 najgorszych stron to blog i materiały**, i wszystkie
mają dokładnie ten sam defekt strukturalny, nie treściowy. Blog i materiały renderują całą
treść jako jedną sekcję (blok `akapit` + `naglowek` w `PostBody`), bo ich rejestry nigdy nie
dostały bloków `sekcja`, `kafle` i `kroki` dodanych w v21. Poradniki te bloki dostały i ich
wskaźnik spadł z ok. 6000 do 487 znaków na kartę, przy TEJ SAMEJ ilości tekstu.

Drugie zjawisko: długie akapity. `/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026` ma
6 akapitów dłuższych niż 400 znaków, `/uslugi/dokumenty-faktury`, `/uslugi/opieka-ai` i
`/uslugi/audyt-ai` po 4, `/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie` 6. Średnia
długość akapitu na /poradniki (hub) to 282 znaki, na /realizacje 287, na /blog 263.

---

## 3. KOMPONENTY: co renderuje te strony

Pełna lista: `...\scratchpad\v22-n4-komponenty.txt`.

### 3a. WSPÓŁDZIELONE (zmiana dotknie wielu stron naraz)

| komponent | kto go używa | ryzyko zmiany |
|---|---|---|
| `components/blog/PostBody.tsx` | `/blog/[slug]`, `/poradniki/[slug]`, oraz przez `MaterialBody` także `/materialy/[slug]` | **NAJWYŻSZE. To jest silnik treści v21. Jedna zmiana ubiera 15 podstron naraz: 5 blog + 4 poradniki + 6 materiałów.** |
| `components/blog/PostFAQ.tsx` | `/blog/[slug]`, `/poradniki/[slug]`, przez `MaterialFAQ` także `/materialy/[slug]` | wysokie, to jedyne źródło `<details>` na tych 15 stronach |
| `components/blog/PostCard.tsx` | `/blog`, `/wiedza`, przez opakowania `PoradnikCard`, `MaterialCard`, `RadarCard` | **wysokie: jedna karta listy zasila 5 hubów** |
| `components/sections/KartaCzesci.tsx` | pod spodem `PostCard`, `MaterialCard`, `ProduktCard`, `RealizacjaCard`, `PowiazanaUsluga`, `NarzedziaTeaser`, `Problem`, `PromoUslugi` | **najwyższe. To jest wspólny korpus karty dla home i wszystkich hubów. Home jest NIETYKALNE, więc każda zmiana tu musi być czysto addytywna (nowy opcjonalny prop, domyślnie wyłączony).** |
| `components/blog/PostHero.tsx` | `/blog/[slug]`, przez `PoradnikHero` i `RadarHero` także `/poradniki/[slug]`, `/ai-radar/[slug]` | średnie |
| `components/blog/PostMeta.tsx` | 7 tras (blog, poradniki, materiały, ai-radar) | niskie, mały komponent daty |
| `components/uslugi/Breadcrumbs.tsx` | 6 tras bezpośrednio + przez hero bloga, poradników, realizacji, o-nas | niskie, ale dotyka wszystkiego |
| `components/uslugi/*` (ServiceHero, ServiceNarrative, PorownanieTabela, KrokiJakToDziala, RamaCeny, ServiceFAQ, PodstronyPowiazane, ServiceCTA) | `/uslugi/[usluga]` (9 stron) + `/uslugi/voiceboty/[podstrona]` (3 strony) | **wysokie: 12 stron z jednego zestawu** |
| `components/realizacje/*` (Hero, Narrative, Efekt, FAQ, PowiazanaUsluga, CTA) | `/realizacje/[slug]` (8 stron) + karta na `/realizacje` | średnie, zamknięta rodzina 8 stron |
| `components/ui/*` (Section, Container, Card, Badge, Button) | 21 tras, w tym HOME | **NIE RUSZAĆ. Regresja na home = bloker.** |
| `components/motion/Reveal.tsx` | 20 tras | nie ruszać, to on odsłania treść przy scrollu |

### 3b. LOKALNE (zmiana dotyka jednej strony)

- `/narzedzia`: `KalkulatorOszczednosci`, `KalkulatorProcesu`, `TestGotowosciAI`,
  `AudytStronyAI`, `GeneratorPromptow` (plus `OsCzasu`, `Radar`, `WykresSlupkowy`,
  `WynikCTA`, `PolePrzewodnik`, `CaptureMaila` jako części wewnętrzne).
- `/o-nas`: `OnasHero`, `OnasHistoria`, `OnasSymbolika`, `OnasFounderzy`, `FounderCard`,
  `OnasPodejscie`, `OnasWartosci`, `OnasCTA`. Cała strona jest własną rodziną, bezpieczna.
- `/uslugi/architekci-wartosci-ai`: `DrabinaOfert`, `CzegoNieMusisz`, `ObiekcjeOdpowiedzi`,
  `TabelaCen` (katalog `components/oferta/`).
- `/kontakt`: `TrackedLink` (plus `DiagnozaForm` dzielony z home).
- `/produkty`: `ProduktCard`, `KlocekCard`. Uwaga: sekcje 2 i 3 tej strony są napisane
  wprost w `app/produkty/page.tsx` (236 linii), nie w komponentach.
- `/wiedza` i `/narzedzia` mają odpowiednio 399 i 319 linii logiki w samym `page.tsx`.

### 3c. Wniosek dla planowania rundy

Trzy dźwignie, uszeregowane po zasięgu na jedną zmianę:

1. `PostBody.tsx` + wypełnienie rejestrów blokami `sekcja`/`kafle`/`kroki` = **15 podstron**
   (blog 5, materiały 6, poradniki 4 już zrobione, więc realnie 11 nowych).
2. `KartaCzesci.tsx` (addytywnie) = **wszystkie huby naraz**, ale dotyka home, więc tylko
   nowy opcjonalny prop, nigdy zmiana domyślnego wyglądu.
3. `components/uslugi/*` = **12 stron usług** jednym ruchem.

Sprzężone CSS+TSX (`.inf-card` warianty w `globals.css` + komponent) muszą iść jednym
agentem, zgodnie ze SPEC v22.

---

## 4. REJESTRY: co mamy, czego nie renderujemy

### 4a. Pola, które ISTNIEJĄ w danych, ale NIE SĄ renderowane (zmarnowane dane)

To jest najkrótsza droga do bogatszych sekcji bez pisania ani jednego nowego zdania treści.

| typ | pole | stan | co da się z tego zrobić |
|---|---|---|---|
| `Post` (blog) | **`tagi: string[]`** | **wypełnione w 5 wpisach, renderowane ZERO razy** | chipy `.inf-chip` pod hero i na karcie listy, jak tagi na kartach usług |
| `Poradnik` | **`tagi: string[]`** | **wypełnione w 4 poradnikach, renderowane ZERO razy** | jak wyżej |
| `Post` (blog) | `queries: string[]` | idzie tylko do `Article.keywords` w JSON-LD, niewidoczne | widoczne tagi na karcie (mechanizm `frazyDoTagow` z `KartaCzesci` już istnieje i działa dla usług i realizacji) |
| `Poradnik` | `queries: string[]` | jak wyżej | jak wyżej |
| `Material` | `queries?: string[]` | jak wyżej | jak wyżej |
| `Realizacja` | `queries: string[]` | renderowane jako tagi na `/realizacje`, ale **nie na `/realizacje/[slug]`** | tagi w hero case'a |
| `Material` | **`zacheta: string`** | renderowane TYLKO na karcie `/materialy`, **nie na stronie materiału** | kafel lub karta „po co to pobierać" na `/materialy/[slug]` |
| `Post` (blog) | **brak jakichkolwiek pól powiązań** | `Poradnik` ma `powiazaneUslugi`, `powiazaneNarzedzia`, `powiazanePoradniki`; `Post` nie ma NICZEGO | to jest przyczyna wyniku „2 linki wewnętrzne w `<main>`" na każdym wpisie bloga |
| `Material` | **brak pól powiązań** | jak blog | 6 stron materiałów po 6 linków, wszystkie z nawigacji, zero z treści |
| `Realizacja` | **brak pól powiązań poza `kategoria`** | `PowiazanaUsluga` wnioskuje usługę z `kategoria`, ale brak linków do poradników i narzędzi | |
| `Produkt` | `demoHint: string` | renderowane na karcie, ale **brak trasy `/produkty/[slug]`** | 4 produkty mają komplet treści (`opisFunkcji`, `dlaKogo`, `coDaje`, `customNote`, `demoHint`) i ani jednej własnej strony |
| `Narzedzie` | `korzysc: string`, `flagowiec?: boolean` | renderowane na `/narzedzia`, ale **brak tras `/narzedzia/[slug]`** | 5 narzędzi żyje na jednej stronie 13495 px |
| `Realizacja` | `efekt.metryki: {wartosc, etykieta}[]` | renderowane, ale w zwykłych kartach | to gotowe dane pod `.inf-hero-stat`, ten sam kształt co kafle statystyk hero usług |
| `RadarNews` | cały rejestr | 2 wpisy z `szablon: true`, wyłączone z sitemapy i listingu | hub `/ai-radar` renderuje 786 znaków |

### 4b. Pola, które MAMY i renderujemy (fundament, nie dotykać kontraktu)

- `Post` / `Poradnik` / `Material`: `slug`, `tytul`, `lead`, `metaTitle`, `metaDescription`,
  `data`, `dataAktualizacji`, `kategoria` (materiał: `etykieta`), `tresc: Blok[]`, `faq`.
- `Poradnik` dodatkowo: `powiazaneUslugi`, `powiazaneNarzedzia`, `powiazanePoradniki`
  (renderowane przez `components/poradniki/LinkiKrzyzowe.tsx` : to jedyny komponent
  linkowania krzyżowego w całym serwisie).
- `Realizacja`: `h1`, `kategoria`, `klient`, `branza`, `kapsula`, `kontekst`, `rozwiazanie`,
  `efekt.metryki`, `efekt.opis`, `faq`.
- `Produkt`: `coRobi`, `nazwaRobocza`, `dojrzalosc`, `opisFunkcji`, `dlaKogo`, `coDaje`,
  `customNote`, `demoHint` (wszystko na jednej karcie na hubie).
- `Material`: `typPliku`, `etykieta`, `ctaPobierz` (renderowane na stronie materiału).

### 4c. Czego BRAKUJE w typach, żeby zrobić bogatsze sekcje

Nic nowego nie trzeba wymyślać po stronie bloków treści: typ `Blok` ma już
`naglowek`, `akapit`, `lista`, `tabela` (+`wKarcie`), `cytat`, `sekcja` (+`wariant`),
`kafle`, `kroki`. Brakuje wyłącznie **danych powiązań** i **paru pól opisowych**:

1. `Post` i `Material`: pola `powiazaneUslugi?`, `powiazaneNarzedzia?`, `powiazanePoradniki?`
   typu `LinkKrzyzowy` (typ już istnieje w `lib/poradniki/types.ts`) : pozwoli reużyć gotowy
   `LinkiKrzyzowe.tsx` i podnieść blog z 2 linków do poziomu poradników (9-12).
2. `Realizacja`: pole `powiazane?` (poradnik + narzędzie) oraz opcjonalne `tagi`/reużycie
   `queries` w hero.
3. `Produkt` i `Narzedzie`: brak `metaTitle`/`metaDescription`/`tresc: Blok[]`, więc dopóki
   ich nie ma, nie da się zrobić tras `/produkty/[slug]` i `/narzedzia/[slug]`. To decyzja
   zakresowa dla Pawła, nie brak techniczny.

---

## 5. Progi dla botów (stan przed rundą, do porównania po)

Sonda bota bez JS, znaki tekstu w całym HTML (z chrome nawigacji i stopki):

| grupa | znaki (min-max) | H2 (min-max) | tabela | `<details>` | JSON-LD |
|---|---|---|---|---|---|
| huby | 5427 (/ai-radar) - 18229 (/narzedzia) | 4-10 | tylko /narzedzia | tylko /narzedzia | Breadcrumb + Org + WebSite |
| /uslugi/[usluga] | 9795-11742 | 11-12 | 1 | 6-7 | Service + FAQPage + Breadcrumb |
| /realizacje/[slug] | 7488-7709 | 10 | 0 | 2 | Breadcrumb + FAQPage |
| /blog/[slug] | 11445-12711 | 10-12 | 1-2 | 3-4 | Article + Breadcrumb + FAQPage |
| /poradniki/[slug] | 11985-15392 | 11-14 | 1-2 | 4-6 | Article + Breadcrumb + FAQPage |
| /materialy/[slug] | 11115-16610 | 11-18 | 0-6 | 3-4 | Article + Breadcrumb + FAQPage |

To są liczby, których po rundzie v22 nie wolno obniżyć. Dowód z v21 (poradniki) mówi, że
opakowanie treści w `.inf-card` nie rusza tych progów, bo `<h2>`, `<p>`, `<ul>` i `<table>`
zostają w tym samym miejscu w drzewie, zmienia się tylko `<div>` wokół.

---

## 6. Trzy zdania podsumowania

1. Ściany tekstu to blog (5 stron) i materiały (6 stron): 5800-11300 znaków na jedną kartę,
   bo ich rejestry nie dostały bloków `sekcja`/`kafle`/`kroki` z v21, choć silnik już je ma.
2. Największą dźwignią jest `components/blog/PostBody.tsx` (11 podstron jednym ruchem)
   i `KartaCzesci.tsx` (wszystkie huby, ale dotyka home, więc wyłącznie addytywnie).
3. `Post.tagi` i `Poradnik.tagi` są wypełnione i renderowane zero razy, a blog nie ma
   żadnego pola powiązań, przez co każdy wpis ma 2 linki wewnętrzne w treści.
