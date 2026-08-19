# Weryfikacja BRIEFU i planu nowych adresow

**Data:** 2026-08-19
**Kto:** sesja weryfikacyjna (rozpoznanie, zero zmian w repo poza tym plikiem)
**HEAD:** `9414058` (docs(status): kronika v22 + v22b)
**Zrodla:** `.seo-przeglad/BRIEF-DLA-SESJI-WWW-2026-08-18.md`, `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md`, `.seo-przeglad/RAPORT-KONKURENCJA-I-CYTOWALNOSC-2026-08-18.md`
**Produkcja:** `https://www.simplefast.ai` (apex `simplefast.ai` daje 308 na `www`, wszystkie pomiary robione na `www`)
**Typecheck:** `npm run typecheck` przechodzi bez bledu (baseline zielony). Buildu nie uruchamiano (zakaz).

---

## 1. BRIEF punkt po punkcie: co juz wdrozone

### Tabela zbiorcza

| # | Punkt briefu | Stan | Dowod |
|---|---|---|---|
| 1a | Podstrona `odbieranie-telefonow` ma kolor voicebotow (`#e438ff`) | **ZROBIONE** | Produkcja: `--hero-c = #e438ff` w HTML `/uslugi/voiceboty/odbieranie-telefonow` |
| 1b | Wymusic kolor strukturalnie, zeby czwarta podstrona nie powtorzyla bledu | **ZROBIONE, lepiej niz proszono** | `lib/inf-kategorie.ts:188-190` funkcja `dekorUslugi(slug, rodzic)`; wpisy podstron USUNIETE z mapy (`INF_KATEGORIA` ma dzis wylacznie 10 slugow uslug, linie 161-173) |
| 2a | Skrocic H1 trzech podstron voicebotow | **ZROBIONE** | 58 -> 44 zn. (`lib/uslugi/podstrony/odbieranie-telefonow.ts:66`), 65 -> 50 zn. (`windykacja.ts:49`), 63 -> 36 zn. (`potwierdzanie-wizyt.ts:52`); fraza glowna zostala na poczatku kazdego |
| 2b | Odchudzic teksty `problem` i `rozwiazanie` | **ZROBIONE** (commit `57cd75d` „podstrony voicebotow odchudzone") | Commit w historii; ocena wizualna nalezy do Pawla, nie do kodu |
| 2c | Ramki i struktura | **poza zakresem briefu** (decyzja Pawla) | brief sam pisze „bez uwag ode mnie" |
| 3 | Trzy zdarzenia Umami: `wyslano_formularz`, `klik_telefon`, `klik_email` | **ZROBIONE, brief jest nieaktualny** | patrz sekcja 1.1 nizej |
| 4 | Lista „potwierdzone jako zrobione, nie ruszaj" | **potwierdzona ponownie** | patrz sekcja 1.2 nizej |
| 5 | Dwie kolejne podstrony voicebotow (obsluga klienta 24/7, cennik voicebota) | **NIE ZACZETE, i tak mialo czekac** | `lib/uslugi/podstrony/index.ts:29-33` ma trzy pozycje; brief warunkuje je akceptacja wygladu obecnych trzech |
| „Jak zmierzyc" | 4 kryteria po 14 dniach | **do pomiaru pozniej**, jedno juz mozliwe | zdarzenie `wyslano_formularz` istnieje w kodzie i skrypt Umami jest na produkcji, wiec punkt 4 da sie sprawdzic w panelu Umami |

### 1.1 Zdarzenia Umami: WERDYKT

**Brief myli sie. Wszystkie trzy zdarzenia sa wdrozone, plus deklaracja typu, plus skrypt na produkcji.**

Brief §3 pisze: „W calym kodzie nie ma ani jednego wywolania `umami.track` (sprawdzone po `umami.track` i `trackEvent` w `app/`, `components/`, `lib/`)". Grep na dzisiejszym HEAD pokazuje cos innego. Prawdopodobne wyjasnienie: brief opisuje stan `ff890a1` (kronika v19), a zdarzenia weszly pozniej.

Znalezione wystapienia (grep po `umami`, `window.umami`, `trackEvent` w `app/`, `components/`, `lib/`, `types/`):

| Element | Plik:linia | Uwaga |
|---|---|---|
| `wyslano_formularz` | `components/forms/DiagnozaForm.tsx:110` | dokladnie w galezi sukcesu, tam gdzie brief wskazywal punkt zaczepienia |
| `klik_email` | `components/layout/Footer.tsx:112` oraz `app/kontakt/page.tsx:262` | oba przez `TrackedLink` |
| `klik_telefon` | `components/layout/Footer.tsx:123` oraz `app/kontakt/page.tsx:276` | oba przez `TrackedLink` |
| wrapper klienta | `components/analytics/TrackedLink.tsx:32` | `onClick={() => window.umami?.track(event)}`, bez `preventDefault`, wiec `tel:`/`mailto:` dzialaja niezaleznie od analityki |
| deklaracja typu | `types/umami.d.ts:16-19` | `umami?` opcjonalne, `track(event, data?)` |
| skrypt | `app/layout.tsx:145-152` | renderuje sie tylko gdy `NEXT_PUBLIC_UMAMI_WEBSITE_ID` ustawione |

**Ostrzezenie techniczne z briefu jest spelnione:** wszystkie trzy wywolania ida przez `window.umami?.track(...)`, nigdzie nie ma golego `umami.track(...)`. Komentarz w `DiagnozaForm.tsx:107-109` mowi wprost dlaczego („analityka nigdy nie moze zepsuc konwersji").

**Dowod z produkcji** (`/kontakt`, HTTP 200): w HTML jest `<script defer src="https://cloud.umami.is/script.js">` z niepustym `data-website-id`, czyli zmienna srodowiskowa jest ustawiona w Vercelu i zdarzenia maja gdzie trafic. Na stronie sa 2 linki `tel:` i 2 linki `mailto:`.

**Czego NIE zweryfikowano:** czy zdarzenia realnie pojawiaja sie w panelu Umami po kliknieciu. To wymaga dostepu do panelu Umami, ktorego ta sesja nie ma. NIEZWERYFIKOWANE: dolot zdarzen do panelu Umami (brak dostepu do konta).

**Rekomendacja:** brief §3 zdjac z listy zadan. Zostaje jedynie potwierdzenie w panelu Umami, ze zdarzenia sie licza.

### 1.2 Lista „potwierdzone jako zrobione" (brief §4): sprawdzona ponownie

| Pozycja | Stan | Dowod |
|---|---|---|
| `/uslugi/chatboty` ma `lastmod` sierpniowy, nie czerwcowy | OK | produkcyjny `sitemap.xml`: `https://www.simplefast.ai/uslugi/chatboty` -> `lastmod 2026-08-18` (wszystkie 10 uslug maja 2026-08-18) |
| `/favicon.ico` zwraca 200 | OK | HTTP 200, 3710 bajtow |
| `mark-t.png`: FaviconPulse uzywa kopii 64x64 | OK | `components/effects/FaviconPulse.tsx:63` `img.src = '/brand/mark-64.png'`; `public/brand/mark-64.png` = 4302 B (oryginal `mark-t.png` = 1 631 603 B) |
| Tytul poradnika o agencie: „Od 2500 zl" | OK | `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:42` metaTitle „Ile kosztuje wdrozenie AI agenta? Od 2500 zl" |
| Kolizja kwot: chatbot 990 zl, agent 2500 zl | OK w kodzie | `lib/uslugi/chatboty.ts:79` `minPrice: 990`; `lib/uslugi/voiceboty.ts:80` `minPrice: 2500` (obie oznaczone „locked 2026-08-16") |
| Opis voicebotow: „2500 zl jednorazowo za wdrozenie, opieka od 99 zl/mies" | OK | `lib/uslugi/voiceboty.ts:25` metaDescription 1:1 |
| Cloudflare nie stoi przed strona | nie sprawdzano (brief zamyka temat) | zgodnie z poleceniem briefu |

**Uwaga:** pozycja „kolizja kwot rozwiazana: chatbot ma 990 zl" jest w BRIEFIE oznaczona jako „nie ruszaj", a AUDYT §1 kaze zmienic 990 zl na 1790 zl. To sprzecznosc miedzy dwoma zatwierdzonymi dokumentami, opisana w sekcji 5 (pozycja S1).

---

## 2. ETAP 2 audytu (GEO): co dzis ma `/uslugi/optymalizacja`

**Pomiar z produkcji** `https://www.simplefast.ai/uslugi/optymalizacja` (HTTP 200, HTML 139 483 B).
**Zrodlo tresci:** `lib/uslugi/optymalizacja.ts` (159 linii, `dataAktualizacji: '2026-08-18'`).

### Co strona ma dzis

**Struktura (naglowki H2, w kolejnosci renderu):**

1. Klienci pytaja AI, a AI poleca kogos innego? (sekcja problem)
2. Jak sprawiamy, ze AI zaczyna Cie cytowac? (sekcja rozwiazanie)
3. Klasyczne SEO a pozycjonowanie pod AI (GEO) (tabela porownawcza, 6 wierszy)
4. Jak wyglada optymalizacja pod AI krok po kroku? (3 kroki, H3: Diagnoza / Naprawa i przepisanie / Pomiar i rozwoj)
5. Ile kosztuje pozycjonowanie pod AI? (rama ceny, BEZ kwoty)
6. Powiazane narzedzia i uslugi (2 kafle: audyt strony AI, strony WWW)
7. Najczestsze pytania (6 pozycji w `<details>/<summary>`)
8. Zacznij od bezplatnej diagnozy (CTA)

Dalej juz stopka (H2: Uslugi / Strony / Kontakt / Agent wiedzy firmy).

**H1:** „Pozycjonowanie pod AI: badz cytowany w ChatGPT i Perplexity"

**Objetosc:** 962 slowa w `<main>` (6212 znakow). To znaczaco ponizej deklarowanej sredniej serwisu 1596 slow z audytu §10 pkt 5 i ponizej pasma 1100-1300 slow, ktore audyt wyznacza nowym waskim adresom.

**JSON-LD:** Service, FAQPage, BreadcrumbList, Organization, WebSite (komplet).

### Ile ma liczb

**Audyt mowi „3 liczby". Pomiar potwierdza: sa dokladnie 3 liczby prezentowane jako fakty i zadna z nich nie jest wynikiem klienta.**

Wszystkie tokeny liczbowe w `<main>` z kontekstem:

| Liczba | Kontekst | Czy to dowod? |
|---|---|---|
| 24/7 | „Budujemy Agentow AI, ktorzy pracuja za Ciebie 24/7" | nie, to claim marki z naglowka, na kazdej podstronie |
| 0 zl | kafel hero „0 zl / bezplatna diagnoza" | nie, to cena wlasnej oferty |
| 3 | kafel hero „3 kroki wdrozenia" | nie, to metryka o samej stronie |
| 6 | kafel hero „6 najczestszych pytan" | nie, to metryka o samej stronie |
| 4 | tabela + FAQ: „Czy padasz w 4 silnikach (test co tydzien)" | polowicznie, to opis wlasnego procesu |
| 1, 2, 3 | numery krokow wdrozenia | nie, to numeracja |

Trzy kafle hero (`0 zl`, `3`, `6`) generuje `components/uslugi/ServiceHero.tsx:155-160` z pol rejestru, a nie z jakichkolwiek danych klienta. Czyli: liczby na stronie mowia o cenniku i o strukturze samej strony, nie o wynikach.

### Ile ma dowodow i czy sa case studies

**ZERO. Audyt ma racje w kazdym punkcie.**

Liczba wystapien w tresci `<main>`:

- „Lenart": **0**
- „Fichtel": **0**
- „Trockenhaus": **0**
- „case" / „Case": **0**
- „realizacj" / „Realizacj": **0**
- „ChatGPT": 8 (wylacznie jako nazwa silnika, nigdy przy wyniku klienta)
- „tygodni": 1 (w FAQ „dzialaja zwykle w kilka tygodni", czyli obietnica, nie wynik)

**Zero linkow do `/realizacje`.** Blok „Powiazane narzedzia i uslugi" ma tylko dwie pozycje: narzedzie `/narzedzia#audyt-strony-ai` i usluge `/uslugi/strony-www` (`lib/uslugi/optymalizacja.ts:141-157`). Pole `powiazane.realizacje` jest **puste**, mimo ze kontrakt typu je przewiduje (`lib/uslugi/types.ts:215`) i mimo ze inne uslugi go uzywaja (np. `lib/uslugi/chatboty.ts:146-159` ma dwie realizacje).

**Dodatkowo:** `cta.dowod` (`lib/uslugi/optymalizacja.ts:126`) obiecuje „Zobacz na zywo, w jakich frazach cytuje nas AI", a takiej strony nie ma (`/dowod` ma `live: false` w `lib/site.ts:324`). Czyli jedyne zdanie o dowodzie na tej stronie odsyla donikad.

**Wniosek:** trzy case z audytu §6.1 (Lenart Motors, Fichtelgebirgshaus.de, Trockenhaus) trafiaja na najslabsza pod wzgledem konkretu strone w serwisie, ktora sprzedaje usluge z najmocniejszymi dowodami w firmie. Miejsca wejscia sa gotowe: sekcje tresci plus `powiazane.realizacje`. Zaden z trzech klientow nie ma dzis wpisu w `lib/realizacje` (rejestr ma 8 pozycji, zadna to nie Lenart/Fichtel/Trockenhaus), wiec `powiazane.realizacje` mozna wypelnic dopiero po dopisaniu ich do rejestru realizacji. To zwieksza zakres etapu 2 o rejestr realizacji.

---

## 3. ETAP 3: kompletny kontrakt dla `/uslugi/leady-b2b` i `/uslugi/asystent-prezesa`

**Stan startowy:** oba adresy zwracaja **404** na produkcji (`https://www.simplefast.ai/uslugi/leady-b2b`, `.../asystent-prezesa`). W sitemapie ich nie ma (50 URLi, brak `leady-b2b`).

### 3.1 Kluczowe rozstrzygniecie: to sa NOWE USLUGI, nie podstrony

W repo istnieja **dwa rozne rejestry** i wybor miedzy nimi zmienia liste plikow do ruszenia:

| | Nowa USLUGA (`lib/uslugi`) | PODSTRONA (`lib/uslugi/podstrony`) |
|---|---|---|
| URL | `/uslugi/<slug>` | `/uslugi/<rodzic>/<slug>` |
| Rejestr | `lib/uslugi/index.ts` (`USLUGI`) | `lib/uslugi/podstrony/index.ts` (`PODSTRONY`) |
| Trasa | **juz istnieje**, `app/uslugi/[usluga]/page.tsx`, `generateStaticParams()` po `USLUGI_SLUGS` (linia 42-44) | trzeba miec katalog `app/uslugi/<rodzic>/[podstrona]/` (dzis istnieje tylko dla `voiceboty`) |
| Wchodzi do nawigacji i huba | TAK (dropdown, hub, home) | NIE (celowo, komentarz `podstrony/types.ts:7-11`) |
| Kolor | trzeba wpisac recznie, patrz sekcja 4 | dziedziczy po rodzicu automatycznie |

`leady-b2b` i `asystent-prezesa` to nowe pozycje oferty (audyt §4 i §5 nazywa je „NOWA USLUGA" i „NOWY PRODUKT"), a nie zawezenie istniejacej uslugi, wiec ida do `lib/uslugi`. **Regula naczyn polaczonych z promptu (plik podstrony, index, INF_KATEGORIA, katalog trasy, dataAktualizacji) dotyczy podstron. Dla nowej uslugi katalog trasy NIE jest potrzebny, ale dochodzi 6 innych miejsc.**

### 3.2 Rejestr obsluguje dodanie uslugi, ale nie w pelni automatycznie

**Co dzieje sie SAMO po dopisaniu do `USLUGI`:**

| Mechanizm | Plik:linia | Efekt |
|---|---|---|
| SSG strony | `app/uslugi/[usluga]/page.tsx:42-44` `generateStaticParams()` mapuje `USLUGI_SLUGS` | `/uslugi/<slug>` ma 200 OK, `dynamicParams=false` |
| `USLUGI_SLUGS` | `lib/uslugi/index.ts:59` `USLUGI.map(u => u.slug)` | zero rozjazdu rejestr <-> trasa |
| Getter | `lib/uslugi/index.ts:62-72` `BY_SLUG` + `getUslugaBySlug` | O(1) lookup |
| Metadata | `app/uslugi/[usluga]/page.tsx:65-71` `buildMetadata` | title, description, canonical |
| JSON-LD | `app/uslugi/[usluga]/page.tsx:85` `uslugaSchemas(usluga)` | Service + FAQPage + BreadcrumbList |
| Sitemap | `app/sitemap.ts:83-88` `USLUGI.map(...)`, `lastModified: new Date(u.dataAktualizacji)` | wpis w `sitemap.xml` z realna data, BEZ dotykania `ROUTES` w `lib/site.ts` |
| Link z home | `components/sections/Oferta.tsx:267-272` mapuje `USLUGI` | kafel na stronie glownej |
| Dropdown nav | `components/layout/nav-data.ts:297` mapuje `USLUGI` | pozycja w menu Uslugi |
| Wiersz tabeli na hubie | `app/uslugi/page.tsx:199-203` `USLUGI.map(...)` | wiersz w tabeli orientacyjnej |
| Metryki huba | `app/uslugi/page.tsx:115-133` liczy z rejestru | „10 uslug" samo urosnie do 12 |

**Czego rejestr NIE zrobi (7 rzeczy do wpisania recznie):**

| # | Co | Plik:linia | Co sie stanie bez tego |
|---|---|---|---|
| R1 | Wpis w `INF_KATEGORIA` | `lib/inf-kategorie.ts:161-173` | usluga swieci domyslnym `var(--accent)` (cyjan chatbotow) w hero, na hubie, w dropdownie, na home. **`dekorUslugi` tu NIE pomoze, patrz sekcja 4** |
| R2 | Wpis w `INF_USLUGA_BADGE` | `lib/inf-kategorie.ts:277-288` | wiersz dropdownu bez pigulki-badge (kod ma fallback `undefined`, `nav-data.ts:311`) |
| R3 | Wpis w `NAV_USLUGI_KROTKIE` | `components/layout/nav-data.ts:85+` | w dropdownie zamiast krotkiego tytulu i podpisu wchodzi pelne H1 bez opisu (`nav-data.ts:304-305`) |
| R4 | Slug w tablicy `KLASTRY` | `app/uslugi/page.tsx:73-98` | **kafla uslugi NIE BEDZIE na hubie `/uslugi`**, a w tabeli orientacyjnej grupa pokaze sie jako „poza grupami" (`app/uslugi/page.tsx:201`) |
| R5 | Wpis w `H1_KOLOR` | `components/uslugi/ServiceHero.tsx:74-91` | H1 w calosci szary, bez kolorowego drugiego czlonu jak reszta rodziny (fallback bezpieczny, ale wizualnie odstaje) |
| R6 | Wpis w `KAFEL_CENY` (tylko jesli ustawiasz `minPrice`) | `components/uslugi/ServiceHero.tsx:108-113` | fallback zrobi „od X zl" + etykiete z `ramaCeny.h2`. Przy asystencie prezesa (7999 zl to cena STALA za stworzenie, nie „od") slowo „od" byloby falszywym faktem. Analogicznie `CENA_FORMAT` na hubie, `app/uslugi/page.tsx:165-171` |
| R7 | Wpis w bazie wiedzy bota | `lib/agent/knowledge.ts` (48 wpisow, uslugi od linii 45) | bot na stronie nie wie o nowej usludze. Dodatkowo `lib/agent/knowledge.ts:53` ma zapisane slowem **„Oferujemy dziesiec uslug AI"**, co po dodaniu dwoch uslug staje sie nieprawda i trzeba to zdanie poprawic |

Uwaga do R4: `KLASTRY` sa dzis trzy (obsluga 24/7 / back-office i procesy / budowa i strategia, `app/uslugi/page.tsx:73-98`). `leady-b2b` i `asystent-prezesa` nie pasuja czysto do zadnego. To decyzja Pawla: dopisac do istniejacego klastra czy zalozyc czwarty. Zalozenie czwartego rusza tez zdanie „dziesiec uslug w trzech grupach" (`app/uslugi/page.tsx:337`) i to samo zdanie w bazie wiedzy bota.

### 3.3 Kontrakt typu `Usluga`: kompletna lista pol do wypelnienia

Zrodlo: `lib/uslugi/types.ts:83-225`.

**14 pol wymaganych na poziomie glownym, 1 opcjonalne. Po rozwinieciu zagniezdzen: 24 wymagane pola-liscie.** TypeScript odrzuci plik, w ktorym brakuje ktoregokolwiek (`strict: true`).

| # | Pole | Typ | Wymog / limit z kontraktu |
|---|---|---|---|
| 1 | `slug` | `string` | male litery, myslniki, bez polskich znakow, bez konczacego slasha; MUSI = klucz w rejestrze |
| 2 | `dataAktualizacji` | `string` | ISO `YYYY-MM-DD`, data REALNEJ zmiany tresci. Zrodlo `lastmod` w sitemapie. Nigdy `new Date()` |
| 3 | `h1` | `string` | = primary money query |
| 4 | `kapsula` | `string` | 40-60 slow, samowystarczalna odpowiedz. Idzie tez jako `description` w Service JSON-LD |
| 5 | `metaTitle` | `string` | 50-60 znakow z primary query (layout dokleja „ · SimpleFast.ai") |
| 6 | `metaDescription` | `string` | 140-160 znakow, konkret + liczba/czas, zero hedgingu |
| 7 | `problem.h2` | `string` | H2 sformulowany jak pytanie klienta |
| 8 | `problem.tresc` | `string` | jezyk klienta |
| 9 | `rozwiazanie.h2` | `string` | H2 jak pytanie |
| 10 | `rozwiazanie.tresc` | `string` | co robimy, kontrola po stronie klienta |
| 11 | `tabelaPorownawcza.h2` | `string` | naglowek tabeli |
| 12 | `tabelaPorownawcza.naglowekBez` | `string` | etykieta kolumny „bez uslugi" |
| 13 | `tabelaPorownawcza.naglowekZNami` | `string` | etykieta kolumny „z nami" |
| 14 | `tabelaPorownawcza.wiersze` | `TabelaWiersz[]` | kazdy wiersz: `cecha`, `bez`, `zNami` (3 stringi). Typ nie wymusza liczby wierszy; wzorzec w repo to 6 |
| 15 | `kroki.h2` | `string` | H2 jak pytanie |
| 16 | `kroki.items` | `[Krok, Krok, Krok]` | **DOKLADNIE 3, typ wymusza krotka**. Kazdy krok: `tytul`, `opis` |
| 17 | `ramaCeny.h2` | `string` | „Ile kosztuje ...?" |
| 18 | `ramaCeny.tresc` | `string` | prawda bez kwoty, jesli kwoty nie ma |
| 19 | `faq` | `FaqItem[]` | kazda pozycja: `pytanie`, `odpowiedz`. Typ nie wymusza liczby; kontrakt w komentarzu mowi 5-6, audyt §9 pkt 6 chce odpowiedzi 200-350 znakow |
| 20 | `cta.label` | `string` | domyslnie „Pokaz mi, gdzie trace czas" |
| 21 | `cta.href` | `string` | domyslnie `#diagnoza` |
| 22 | `cta.mikrokopia` | `string` | konkret + brak zobowiazan |
| 23 | `cta.dowod` | `string` | uczciwy sygnal, NIGDY atrapa liczby |
| 24 | `queries` | `string[]` | pierwsza = primary, zgodna z `h1` |

**Pola opcjonalne (warto wypelnic, ale typ nie wymusi):**

| Pole | Typ | Kiedy |
|---|---|---|
| `ramaCeny.minPrice` | `number` | tylko realna kwota spojna z UI. Wlacza `offers` w Service JSON-LD i kafel ceny w hero |
| `ramaCeny.linkPoradnik` | `{ przed, etykieta, po, href }` | `href` MUSI byc realna trasa 200 OK |
| `powiazane.realizacje` / `.narzedzia` / `.poradniki` / `.produkty` / `.uslugi` | `LinkKrzyzowy[]` | kazdy: `etykieta`, `href`, `opis`. `href` MUSI byc 200 OK albo potwierdzona kotwica; `etykieta` z ISTNIEJACEGO tytulu celu, nigdy nowy slogan; `opis` = fakt juz stojacy na stronie celu |

### 3.4 Lista plikow do ruszenia: `/uslugi/leady-b2b`

| # | Plik | Co |
|---|---|---|
| 1 | `lib/uslugi/leady-b2b.ts` (NOWY) | obiekt `Usluga`, 24 pola z tabeli 3.3. Dane: audyt §4 (cennik 169/699/1390 zl, tabela porownawcza recznie vs narzedzie, zakres = scraping Google Maps, ograniczenie „wylacznie B2B" napisane wprost) + §6.9 (20-30 min na 1000 rekordow, ok. 3 min recznie na rekord). `minPrice: 169` jest realne i spojne, wiec mozna ustawic |
| 2 | `lib/uslugi/index.ts:21-30` + `:39-53` | import + wpis w tablicy `USLUGI` (kolejnosc = kolejnosc prezentacji) |
| 3 | `lib/inf-kategorie.ts:161-173` | `INF_KATEGORIA['leady-b2b'] = { c, odcien, emoji, ikona }`. Wolne glify pasujace: `magnes` (zajety przez narzedzie i realizacje, ale unikalnosc obowiazuje w obrebie JEDNEJ mapy), `mapa`, `folder-kod`, `pudelko-3d`, `rakieta`. Pelna lista 24 glifow w `components/ui/InfIcons.tsx` |
| 4 | `lib/inf-kategorie.ts:277-288` | `INF_USLUGA_BADGE['leady-b2b']` (np. `LEADY`) |
| 5 | `components/layout/nav-data.ts:85+` | `NAV_USLUGI_KROTKIE['leady-b2b'] = { tytul, opis }` |
| 6 | `app/uslugi/page.tsx:73-98` | slug do wybranego klastra w `KLASTRY` |
| 7 | `components/uslugi/ServiceHero.tsx:74-91` | `H1_KOLOR['leady-b2b']` = dokladna koncowka H1 (funkcja `dzielH1` sprawdza `endsWith`, przy rozjezdzie renderuje caly H1 bez spanu, wiec literowka jest bezpieczna, tylko traci efekt) |
| 8 | `components/uslugi/ServiceHero.tsx:108-113` + `app/uslugi/page.tsx:165-171` | `KAFEL_CENY` i `CENA_FORMAT`, jesli ustawiasz `minPrice: 169` („od 169 zl / paczka 1000 rekordow") |
| 9 | `lib/agent/knowledge.ts` | nowy wpis uslugi + poprawka zdania „dziesiec uslug" w linii 53 |
| 10 | NIE RUSZAC | `lib/site.ts` `ROUTES` (uslugi nie sa tam wpisywane pojedynczo, komentarz `lib/site.ts` przy linii 271) ani `app/uslugi/[usluga]/` (trasa gotowa) |

### 3.5 Lista plikow do ruszenia: `/uslugi/asystent-prezesa`

Identyczne 10 pozycji jak wyzej, z podmiana sluga, plus trzy roznice merytoryczne:

- **Dane:** audyt §5 (stworzenie 7 999 zl, utrzymanie serwerow 199 zl/mies., zuzycie po stronie klienta wg cennika API, opis „agent z wlasnym interfejsem, ktory uczy sie zachowan konkretnej osoby", mechanizm „dziala jak nowo przyjeta asystentka albo student").
- **`minPrice`:** 7999 to cena STALA za stworzenie, nie „od X". Fallback `KAFEL_CENY` dokleiłby „od ", czyli falszywy fakt. Wzorzec do skopiowania: `audyt-ai` ma `{ prefiks: '', opis: 'Sprint Diagnostyczny' }` (`ServiceHero.tsx:111`) i to samo w `CENA_FORMAT` (`app/uslugi/page.tsx:169`).
- **Czas budowy:** audyt podaje 5-10 dni roboczych w §5 i jednoczesnie mowi w §11, ze tej liczby nie ma. Patrz sprzecznosc S3. **Do rozstrzygniecia przed napisaniem `kroki` i `metaDescription`.**

### 3.6 Kryteria odbioru dla obu adresow

1. `npm run typecheck` przechodzi (24 pola wymagane, brak ktoregokolwiek = blad kompilacji).
2. `/uslugi/leady-b2b` i `/uslugi/asystent-prezesa` zwracaja 200 na produkcji.
3. Oba URL-e sa w `sitemap.xml` z `lastmod` = `dataAktualizacji` (dzieje sie samo).
4. Kafel uslugi widoczny na hubie `/uslugi` (wymaga R4).
5. Kolor hero NIE jest domyslnym cyjanem (wymaga R1). Sprawdzenie: `--hero-c` w HTML rozne od `var(--accent)`.
6. Zero linkow wewnetrznych z 404 (kazdy `href` w `powiazane` przetestowany).
7. Objetosc 1100-1300 slow (audyt §10 pkt 5).
8. Zero em-dash, zero liczby spoza audytu.

---

## 4. Czy kolor uslugi dziedziczy sie automatycznie

### Stan faktyczny mechanizmu

**Mechanizm istnieje i dziala, ale WYLACZNIE dla podstron. Nowa USLUGA nadal wymaga recznego wpisu.**

`lib/inf-kategorie.ts:188-190`:

```ts
export function dekorUslugi(slug: string, rodzic?: string): InfDekor {
  return INF_KATEGORIA[slug] ?? (rodzic ? INF_KATEGORIA[rodzic] : undefined) ?? INF_KATEGORIA_DEFAULT;
}
```

Kolejnosc szukania: wlasny wpis w mapie, potem wpis rodzica, potem fallback `INF_KATEGORIA_DEFAULT` (`var(--accent)`, czyli cyjan chatbotow, linie 193-200).

**Wpisy podstron zostaly USUNIETE z mapy.** `INF_KATEGORIA` (linie 161-173) zawiera dzis dokladnie 10 kluczy, wszystkie to slugi uslug. Nie ma ani `windykacja`, ani `potwierdzanie-wizyt`, ani `odbieranie-telefonow`. Komentarz przy funkcji (linie 175-187) opisuje dokladnie historie z briefu: „przy trzeciej (odbieranie-telefonow) wpis wypadl (...) Od teraz podstrona bierze dekor RODZICA".

**Kto woła funkcje z parametrem `rodzic`** (czyli gdzie dziedziczenie realnie dziala):

| Komponent | Linia | Wywolanie |
|---|---|---|
| `components/uslugi/ServiceHero.tsx` | 183 | `dekorUslugi(usluga.slug, (usluga as { rodzic?: string }).rodzic)` |
| `components/uslugi/RamaCeny.tsx` | 39 | `dekorUslugi(slug, rodzic)` |
| `components/uslugi/ServiceFAQ.tsx` | 36 | `dekorUslugi(slug, rodzic)` |

**Dowod z produkcji:** `/uslugi/voiceboty/odbieranie-telefonow` renderuje `--hero-c: #e438ff`, czyli fiolet voicebotow, mimo ze `odbieranie-telefonow` nie ma wlasnego wpisu w mapie. Dziedziczenie dziala.

### Czy nowa USLUGA tez wymaga recznego wpisu

**TAK, i to w mocniejszym sensie niz sugeruje brief. Sa dwa powody.**

**Powod 1: usluga nie ma rodzica.** `Usluga` (`lib/uslugi/types.ts:83-225`) nie ma pola `rodzic`. Ma je dopiero `PodstronaUslugi` (`lib/uslugi/podstrony/types.ts:32`). Przy nowej usludze `dekorUslugi('leady-b2b')` woła sie bez drugiego argumentu, wiec od razu wpada w `INF_KATEGORIA_DEFAULT`. Nie ma z czego dziedziczyc.

**Powod 2, wazniejszy: polowa konsumentow koloru w ogole nie uzywa `dekorUslugi`.** Wiekszosc miejsc siega do mapy bezposrednio:

| Miejsce | Plik:linia | Wywolanie |
|---|---|---|
| kafel na hubie `/uslugi` | `app/uslugi/page.tsx:268` | `INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT` |
| dropdown nawigacji | `components/layout/nav-data.ts:298` | `INF_KATEGORIA[u.slug] ?? INF_KATEGORIA_DEFAULT` |
| sekcja Oferta na home | `components/sections/Oferta.tsx:268` | `INF_KATEGORIA[u.slug] ?? INF_KATEGORIA_DEFAULT` |
| sekcja PromoUslugi | `components/sections/PromoUslugi.tsx:63` | `INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT` |
| linki krzyzowe | `components/poradniki/LinkiKrzyzowe.tsx:36` | `INF_KATEGORIA[usluga] ?? INF_KATEGORIA_DEFAULT` |
| karta powiazanej uslugi | `components/realizacje/PowiazanaUsluga.tsx:52,64,69` | `INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT` |

Czyli nawet gdyby ktos dolozyl polu `rodzic` do typu `Usluga`, te szesc miejsc i tak zaswiecilo by domyslnym cyjanem. **Brak wpisu w `INF_KATEGORIA` dla nowej uslugi daje dokladnie ten sam blad, ktory brief zglosil dla podstrony, tyle ze na szerszym froncie: hero moze byc poprawne, a kafel na hubie, pozycja w menu i kafel na home juz nie.**

**Werdykt:** dziedziczenie zamknelo droge, ktora zawiodla dwa razy (podstrony). Dla nowych uslug ta droga nadal jest otwarta i typ jej nie pilnuje, bo `INF_KATEGORIA` to zwykly `Record<string, InfDekor>`. Jesli chcesz to domknac strukturalnie, opcja jest jedna: zmienic typ mapy na `Record<UslugaSlug, InfDekor>`, gdzie `UslugaSlug` wywodzi sie z rejestru. Wtedy dopisanie uslugi bez koloru nie skompiluje sie. To zmiana typu, nie designu. **Decyzja Pawla, ja tylko zglaszam mechanizm.**

---

## 5. Sprzecznosci w audycie i miedzy audytem a stanem strony

Ponizsze ida jako pytania do Pawla. Zadnego z nich nie da sie rozstrzygnac z kodu.

| # | Sprzecznosc | Gdzie | Pytanie do Pawla |
|---|---|---|---|
| **S1** | **990 zl czy 1790 zl za chatbota.** Audyt §1 kaze zastapic „od 990 zl" kwota **1 790 zl** i uzasadnia to strata cytowan. Brief §4 wpisuje „chatbot ma 990 zl" na liste **potwierdzonych i nie do ruszania**. W kodzie stoi 990 z komentarzem „locked 2026-08-16" | audyt §1 vs brief §4; `lib/uslugi/chatboty.ts:78-79` | Ktora kwota obowiazuje? Zmiana na 1790 rusza `chatboty.ts` (2 miejsca) plus tytul i tresc poradnika `ile-kosztuje-chatbot-dla-firmy-2026.ts:18,23` („Od 990 zl" w tytule i metaTitle) plus baze wiedzy bota |
| **S2** | **Opieka 99-599 zl czy 299-1500 zl.** Audyt §2 „Koszt 2" podaje utrzymanie u nas jako **299-1500 zl/mies.** Strona mowi wszedzie **99-599 zl/mies.**, a brief §4 potwierdza „opieka od 99 zl/mies" jako zrobione | audyt §2 vs `lib/uslugi/voiceboty.ts:79`, `chatboty.ts:78`, `audyt-ai.ts:78`, `automatyzacje.ts:82`, `dokumenty-faktury.ts:100`, `lib/agent/knowledge.ts:104`, podstrony voicebotow | Ktore widelki sa aktualne? To 6+ plikow i baza wiedzy bota. Jesli 299-1500 dotyczy TYLKO voicebotow, a 99-599 chatbotow, trzeba to napisac wprost, bo dzis oba dokumenty mowia o „opiece" bez rozroznienia |
| **S3** | **Czas budowy asystenta prezesa: jest czy go nie ma.** §5 podaje w tabeli **„Czas budowy: 5-10 dni roboczych"**. §11 („Czego nadal brakuje") pisze: **„Czas wdrozenia dla asystenta prezesa (mamy cene 7 999 zl, nie mamy liczby dni)"** | audyt §5 vs §11 | Czy 5-10 dni mozna publikowac? Blokuje `kroki` i `metaDescription` nowej podstrony |
| **S4** | **Waste Return: ma liczbe czy nie ma.** §6.10 pisze **„Waste Return: 3-4 dni robocze"**. §7 w kolumnie „Twarda liczba" ma dla Waste Return **„brak liczby"**. §11 powtarza „Liczba dla Waste Return (jedyna realizacja bez zadnego wskaznika)". §11 dodatkowo liczy „twarde liczby dla 10 z 11 realizacji", co ma sens tylko przy zalozeniu, ze Waste Return liczby nie ma | audyt §6.10 vs §7 vs §11 | Czy „3-4 dni robocze" to zatwierdzona liczba dla Waste Return? Jesli tak, mamy 11 z 11 |
| **S5** | **75% czy 80% draftow (Instytut Kryptografii).** Audyt §6.2 podaje **80% draftow** i **580 maili tygodniowo**. Strona publikuje dzis **75%** i nie ma nigdzie 580 | audyt §6.2 vs `lib/realizacje/auto-email-bok.ts:20,24,42` i 14 dalszych miejsc (blog, poradniki, baza wiedzy bota) | Ktora liczba jest prawdziwa? Podmiana 75 -> 80 to **17 wystapien w 12 plikach**, w tym tytul wpisu blogowego `lib/blog/index.ts:79` („case: 75% draftow do 1 klikniecia") i `lib/agent/knowledge.ts:632`. To nie jest kosmetyka, to przepisanie jednego z filarow dowodowych serwisu |
| **S6** | **Voiceboty: „drabina trzech progow z czasami", ktorej nie ma.** §9 Etap 1 pkt 1 kaze wpisac „drabine trzech progow z czasami" na `/uslugi/chatboty` **i** `/uslugi/voiceboty`. Ale §2 daje dla voicebotow tylko **dwa** progi (2 500 zl i 5 000-9 000 zl) i **zero czasow wdrozenia** | audyt §9 pkt 1 vs §2 | Ile progow ma miec voicebot i ile dni trwa jego wdrozenie? Bez tego pkt 1 etapu 1 da sie zrobic tylko dla chatbotow |
| **S7** | **Blok krotkiej odpowiedzi bez danych.** §9 Etap 1 pkt 2 kaze wstawic na kazda „strone pieniezna" blok: dolny prog, gorny prog, koszt miesieczny, czas wdrozenia. Dla `/uslugi/optymalizacja` audyt nie podaje ANI ceny, ANI czasu (sam plik uslugi ma to jako otwarty INPUT, `lib/uslugi/optymalizacja.ts:15-17`). To samo dotyczy `strony-www`, `rozwiazania`, `agent-rekrutacyjny`, `dokumenty-faktury`, `automatyzacje` (wszystkie maja `minPrice: undefined`) | audyt §9 pkt 2 vs §10 pkt 1 („zero zmyslonych liczb") | Ktore strony maja dostac blok krotkiej odpowiedzi, skoro dla szesciu z dziesieciu nie ma ani kwoty, ani czasu? |
| **S8** | **Instytut Kryptografii: „nikt do niego nie linkuje", a linkuje 5 miejsc.** §9 Etap 1 pkt 5 pisze, ze case „lezy gotowy w `/realizacje/chatbot-edukacyjny-kursy` i nikt do niego nie linkuje" | audyt §9 pkt 5 vs `lib/uslugi/chatboty.ts:149`, `lib/realizacje/agenci-ai-24-7.ts:93`, `lib/realizacje/auto-email-bok.ts:99`, `lib/poradniki/poradniki/ile-kosztuje-chatbot-dla-firmy-2026.ts:262`, `components/layout/nav-data.ts:204` | Claim jest **nieaktualny** (runda v22 zamknela linkowanie). Zostaje realne zadanie: `/uslugi/automatyzacje` faktycznie NIE linkuje do tego case'a (`lib/uslugi/automatyzacje.ts:151-169` ma trzy inne realizacje). Potwierdzic, czy chodzilo o to |
| **S9** | **„Etap 3" wystepuje dwa razy.** §9 ma naglowek „### Etap 3: nowe adresy pod nowe tresci" (punkty 9-12) i zaraz pod nim drugi „### Etap 3: reszta z raportu glownego" | audyt §9 | Czy drugi to Etap 4? Wplywa na kolejnosc pracy |
| **S10** | **Skracac czy nie skracac.** Brief §2 mowi, ze sekcje `problem` i `rozwiazanie` podstron voicebotow „spokojnie zniosa skrocenie o jedna trzecia". Audyt §10 pkt 5 mowi „Nie skracac stron do 400 slow", a nowe adresy budowac w okolicy 1100-1300 slow | brief §2 vs audyt §10 pkt 5 | Formalnie to rozne strony, wiec to nie twarda kolizja, ale kierunek jest przeciwny. Jaki jest docelowy metraz podstron voicebotow? |
| **S11** | **Asystent prezesa: 199 zl/mies. czy 0 zl po przekazaniu.** §5 podaje „Utrzymanie serwerow: 199 zl / mies." i jednoczesnie pisze „Model rozliczenia jest tu identyczny jak przy voicebotach (...) **Przekazujemy bota do prezesa**". Przy voicebotach (§2) przekazanie infrastruktury oznacza **0 zl/mies.** | audyt §5 vs §2 | Czy 199 zl/mies. obowiazuje takze po przekazaniu, czy to opcja „infrastruktura u nas"? To dotyka pamieci o dwoch modelach rozliczen, wiec nie wolno tego zgadnac |
| **S12** | **„Oznaczyc kazda kwote jako netto", a strona nie ma ani jednego „netto".** §9 Etap 1 pkt 4. Dzis w rejestrze uslug slowo „netto" nie pada przy zadnej kwocie (990, 2500, 1490, 3000, 99-599) | audyt §9 pkt 4 vs `lib/uslugi/*.ts` | Czy wszystkie dotychczasowe kwoty byly netto? Jesli tak, dopisanie „netto" nie zmienia ceny. Jesli ktoras byla brutto, dopisanie „netto" podnosi ja klientowi o 23 procent i to jest zmiana oferty, nie redakcja |

### Sprzecznosci NIEZNALEZIONE (sprawdzone, wszystko sie zgadza)

- Cennik leadow B2B §4: 169/1000 = 0,169 zl; 699/5000 = 0,140 zl; 1390/10000 = 0,139 zl. Progresja maleje zgodnie z opisem.
- Czas reczny §4: 1000 rekordow x 3 min = 3000 min = 50 h. Zgadza sie. 5000 x 3 min = 250 h. Zgadza sie.
- §6.9 (20-30 min na 1000 rekordow) zgodne z tabela w §4.
- Lenart Motors: „okolo 3 tygodni" w §6.1 i „po 3 tygodniach" w §7. Spojne.

---

## 6. Podsumowanie stanu

**Z briefu zostalo do zrobienia: nic w kodzie.** Punkty 1, 2 i 3 sa wdrozone. Punkt 3 (zdarzenia Umami) brief opisuje jako niezrobiony i to jest jego jedyny bledny wpis. Punkt 5 czeka na akceptacje Pawla, zgodnie z warunkiem samego briefu.

**Etap 2 audytu (GEO) jest realny i policzony:** `/uslugi/optymalizacja` ma 962 slowa, 3 liczby o samej stronie, zero nazw klientow, zero linkow do realizacji. Wejscie na strone jest gotowe (`powiazane.realizacje` w kontrakcie typu), ale trzej klienci z §6.1 nie istnieja w `lib/realizacje`, wiec etap 2 obejmuje takze rejestr realizacji.

**Etap 3 (dwa nowe adresy) jest wykonalny bez nowej trasy i bez ruszania `ROUTES`,** ale wymaga 24 pol kontraktu plus 7 recznych wpisow poza rejestrem, z czego jeden (`INF_KATEGORIA`) jest tym samym miejscem, ktore juz dwa razy zawiodlo przy podstronach.

**Przed rozpoczeciem etapu 3 trzeba rozstrzygnac S3 (czas budowy asystenta prezesa) i S11 (199 zl czy 0 zl).** Bez tego nie da sie napisac `kroki`, `metaDescription` ani `ramaCeny` dla `/uslugi/asystent-prezesa` bez zgadywania.

**Przed rozpoczeciem etapu 1 trzeba rozstrzygnac S1, S2 i S5.** To trzy kolizje liczb, kazda dotyka wielu plikow naraz, a S5 rusza tytul wpisu blogowego.

---

*Raport rozpoznawczy. Zero zmian w plikach repo poza tym dokumentem, zero commitow, buildu nie uruchamiano. Pomiary produkcyjne wykonane 2026-08-19 na `https://www.simplefast.ai`.*
