# POMIARY v22: LINKOWANIE WEWNĘTRZNE I SYGNAŁY SEO

Audyt: 2026-08-18. Zakres: mapa linkowania, martwe linki, spójność rejestrów, sygnały SEO,
rekomendacje. Bez zmian w kodzie (poza tym plikiem), bez commitów, bez buildu.

---

## 0. METODA I DOWÓD (co realnie zmierzone, nie założone)

| Element | Jak zmierzone |
|---|---|
| Źródło pomiaru | Produkcja `https://www.simplefast.ai`, HTTP GET, User-Agent GPTBot, **bez JS** |
| Zgodność z repo | `git rev-parse HEAD` = `git rev-parse origin/main` = `8fe4891`; `git status` czysty w `app/`, `lib/`, `components/` (zmiany tylko w `.seo-przeglad/` i `tools/`) |
| Dowód świeżości deployu | `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` zwraca w HTML 72x `inf-card` i 72x `inf-tile` (efekt commitu `8fe4891`), czyli produkcja = HEAD |
| Rejestry | wczytane bezpośrednio z TS (`jiti`): `ROUTES`, `USLUGI`, `PODSTRONY_SITEMAP`, `REALIZACJE_SLUGS`, `POSTS`, `PORADNIKI`, `MATERIALY`, `RADAR_NEWS`, `NARZEDZIA`, `PRODUKTY` |
| Liczba stron w mapie | 50 URL-i w `sitemap.xml` (HTTP 200), 1:1 z rejestrami |
| Linki | wszystkie `<a href>` z surowego HTML, dzielone na trzy warstwy (patrz niżej) |
| Kotwice | 9 linków z `#` sprawdzonych pod kątem realnego `id=` na stronie docelowej |

Trzy warstwy liczenia linków (kluczowe dla oceny sierot):

1. **wszystkie**: łącznie z menu i stopką (31 linków obecnych na KAŻDEJ stronie),
2. **treść**: po usunięciu `<header>` i `<footer>`,
3. **redakcyjne**: dodatkowo po usunięciu okruszków (`<nav aria-label="Ścieżka nawigacji">`).

„Sierota" w tabeli poniżej = 0 linków redakcyjnych z innej strony (czyli dokładnie
definicja z zadania: zero wchodzących poza nawigacją i mapą witryny).

**Stały szkielet (31 linków na każdej stronie):** `/`, `/uslugi`, 10 usług, `/produkty`,
`/realizacje`, 8 realizacji, `/narzedzia`, `/o-nas`, `/wiedza`, `/blog`, `/poradniki`,
`/materialy`, `/ai-radar`, `/kontakt`, `/polityka-prywatnosci`.
**Poza szkieletem** (czyli zależne wyłącznie od linkowania w treści):
`/uslugi/architekci-wartosci-ai`, 3 podstrony voicebotów, 5 wpisów bloga,
4 poradniki, 6 materiałów, 2 wpisy AI Radar.

---

## 1. MAPA LINKOWANIA

| Strona | Wychodzące (treść) | Dokąd | Wchodzące (treść) | Sierota? |
|---|---|---|---|---|
| `/` | 14 | kontakt, uslugi x11, narzedzia, o-nas | 1 (+okruszki 44) | nie |
| `/uslugi` | 12 | uslugi x11, kontakt | 0 (+okruszki 14) | TAK (tylko okruszki) |
| `/uslugi/architekci-wartosci-ai` | 1 | narzedzia | 3 | nie |
| `/narzedzia` | 4 | polityka, kontakt, materialy x2 | 7 | nie |
| `/produkty` | 2 | uslugi/rozwiazania, kontakt | 0 | **TAK (tylko menu i stopka)** |
| `/wiedza` | 9 | poradniki, ai-radar, blog, realizacje, 1 poradnik, 1 wpis bloga, narzedzia, materialy, kontakt | 0 (+okruszki 13) | TAK (tylko okruszki) |
| `/poradniki` | 4 | poradniki x4 | 1 (+okruszki 4) | nie |
| `/ai-radar` | 2 | ai-radar x2 (oba `noindex`) | 1 | nie |
| `/materialy` | 7 | materialy x6, kontakt | 1 (+okruszki 6) | nie |
| `/realizacje` | 9 | realizacje x8, kontakt | 1 (+okruszki 8) | nie |
| `/blog` | 5 | blog x5 | 1 (+okruszki 5) | nie |
| `/o-nas` | 1 | kontakt | 1 | nie |
| `/kontakt` | **0** | brak | 40 | nie (ale ślepy zaułek) |
| `/polityka-prywatnosci` | 2 | home, kontakt | 7 | nie |
| `/uslugi/chatboty` | 2 | poradnik cenowy, kontakt | 7 | nie |
| `/uslugi/voiceboty` | 5 | poradnik, 3 podstrony, kontakt | 6 | nie |
| `/uslugi/agent-rekrutacyjny` | 1 | kontakt | 3 | nie |
| `/uslugi/automatyzacje` | 2 | poradnik, kontakt | 8 | nie |
| `/uslugi/dokumenty-faktury` | 1 | kontakt | 3 | nie |
| `/uslugi/opieka-ai` | 1 | kontakt | 3 | nie |
| `/uslugi/audyt-ai` | 2 | poradnik, kontakt | 6 | nie |
| `/uslugi/rozwiazania` | 1 | kontakt | 5 | nie |
| `/uslugi/strony-www` | 1 | kontakt | 2 | nie |
| `/uslugi/optymalizacja` | 1 | kontakt | 2 | nie |
| `/uslugi/voiceboty/windykacja` | 4 | rodzic, 2 siostry, kontakt | 3 | nie |
| `/uslugi/voiceboty/potwierdzanie-wizyt` | 4 | rodzic, 2 siostry, kontakt | 3 | nie |
| `/uslugi/voiceboty/odbieranie-telefonow` | 4 | rodzic, 2 siostry, kontakt | 3 | nie |
| `/realizacje/auto-email-bok` | 2 | kontakt, uslugi/automatyzacje | 1 | nie |
| `/realizacje/lead-generator` | 2 | kontakt, uslugi/automatyzacje | 1 | nie |
| `/realizacje/auto-podsumowania-spotkan` | 2 | kontakt, uslugi/rozwiazania | 1 | nie |
| `/realizacje/automat-tresci-social` | 2 | kontakt, uslugi/automatyzacje | 1 | nie |
| `/realizacje/automatyczne-raporty` | 2 | kontakt, uslugi/automatyzacje | 1 | nie |
| `/realizacje/chatbot-edukacyjny-kursy` | 2 | kontakt, uslugi/chatboty | 1 | nie |
| `/realizacje/agenci-ai-24-7` | 2 | kontakt, uslugi/chatboty | 1 | nie |
| `/realizacje/transkrypcja-rozmow` | 2 | kontakt, uslugi/rozwiazania | 1 | nie |
| `/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026` | **0** | brak | 2 | nie (ślepy zaułek) |
| `/blog/chatbot-czy-ai-agent-roznice` | **0** | brak | 1 | nie (ślepy zaułek) |
| `/blog/jak-voicebot-odbiera-telefony` | **0** | brak | 1 | nie (ślepy zaułek) |
| `/blog/ai-act-a-twoja-firma-2026` | **0** | brak | 1 | nie (ślepy zaułek) |
| `/blog/automatyzacja-procesow-ai-od-czego-zaczac` | **0** | brak | 1 | nie (ślepy zaułek) |
| `/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie` | 7 | narzedzia, uslugi x3, poradniki x2, kontakt | 6 | nie |
| `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` | 6 | narzedzia, uslugi x2, poradniki x2, kontakt | 4 | nie |
| `/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac` | 8 | narzedzia, uslugi x4, poradniki x2, kontakt | 1 | nie |
| `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` | 9 | narzedzia, uslugi x5, poradniki x2, kontakt | 6 | nie |
| `/materialy/50-promptow-ai-dla-wlasciciela-firmy` | 2 | polityka, kontakt | 2 | nie |
| `/materialy/jak-pisac-prompty-ktore-dzialaja` | 2 | polityka, kontakt | 1 | nie |
| `/materialy/prompty-branzowe-kancelaria-ecommerce-budowlanka` | 2 | polityka, kontakt | 1 | nie |
| `/materialy/checklista-20-procesow-do-automatyzacji-ai` | 2 | polityka, kontakt | 1 | nie |
| `/materialy/10-bledow-przy-wdrazaniu-ai-w-firmie` | 2 | polityka, kontakt | 1 | nie |
| `/materialy/arkusz-policz-koszt-recznych-zadan` | 2 | polityka, kontakt | 1 | nie |

### 1.1. Sieroty (0 wchodzących redakcyjnych)

| Strona | Sytuacja | Waga |
|---|---|---|
| `/produkty` | **Prawdziwa sierota.** Zero linków z treści JAKIEJKOLWIEK strony, nawet z okruszków. Trzyma się wyłącznie na pozycji w menu i w stopce. | wysoka |
| `/uslugi` | 14 wejść, ale wszystkie z okruszków (`/ > Usługi > ...`). Zero linków z kontekstu zdania. | średnia |
| `/wiedza` | 13 wejść, wszystkie z okruszków. Hub Centrum Wiedzy nie jest wywoływany z treści usług ani realizacji. | średnia |

### 1.2. Ślepe zaułki (0 wychodzących z treści)

| Strona | Wchodzące | Skutek |
|---|---|---|
| `/kontakt` | 40 | Zbiera 40 linków redakcyjnych i nie oddaje ani jednego. Największy pochłaniacz mocy linkowej na stronie. |
| 5 wpisów `/blog/*` | 1-2 każdy | Wpisy bloga są w silniku treści (`PostBody`), ale rejestr `lib/blog` NIE MA pól `powiazane*`, więc żaden wpis nie linkuje do usługi, poradnika ani realizacji. |

### 1.3. Rozkład mocy linkowej (redakcyjnie, TOP i DÓŁ)

- Najmocniej dolinkowane: `/kontakt` 40, `/uslugi/automatyzacje` 8, `/uslugi/chatboty` 7,
  `/narzedzia` 7, `/polityka-prywatnosci` 7, `/uslugi/voiceboty` 6, `/uslugi/audyt-ai` 6,
  `/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie` 6, `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` 6.
- Najsłabiej: `/produkty` 0, `/uslugi` 0, `/wiedza` 0,
  `/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac` 1,
  wszystkie 8 realizacji po 1, 5 z 6 materiałów po 1, 4 z 5 wpisów bloga po 1.

---

## 2. MARTWE LINKI

Przejście: 53 unikalne cele wewnętrzne z 50 stron, każdy sprawdzony osobnym GET (bez JS).

| Status | Cel | Strona źródłowa | Plik w repo |
|---|---|---|---|
| **404** | `/materialy/jak-pisac-prompty-ktore-dzialaja-mini-poradnik` | `/narzedzia` | `components/narzedzia/GeneratorPromptow.tsx:197` |

To jedyny martwy link wewnętrzny na produkcji. Poprawny slug istnieje i zwraca 200:
`/materialy/jak-pisac-prompty-ktore-dzialaja` (rejestr `lib/materialy`). Naprawa to zmiana
jednego stringa, ale trafia w generator promptów, czyli w narzędzie z linkiem
w 4 poradnikach.

### 2.1. Pozostałe wyniki przejścia

| Sprawdzone | Wynik |
|---|---|
| 50 URL-i z `sitemap.xml` | wszystkie HTTP 200, wszystkie `index, follow` |
| `/ai-radar/przyklad-szablon-tanszy-model-ai-automatyzacja-maili` | 200, `noindex, follow`, poza mapą witryny CELOWO (szablon formatu), zgodnie z komentarzem w `app/sitemap.ts` |
| `/ai-radar/przyklad-szablon-zmiana-przepisow-ai-ue` | 200, `noindex, follow`, jw. |
| 9 linków z kotwicą (`/narzedzia#...`) | wszystkie mają realne `id=` na stronie docelowej, 0 błędów |
| 5 kotwic `/produkty#...` (strona 404) | wszystkie mają realne `id=` na `/produkty` |
| Linki relatywne, linki na apex bez `www` | 0 wystąpień (zero ukrytych przekierowań 308) |
| `/dowod`, `/obowiazek-informacyjny` | 404, ale `live: false` i **nigdzie nie podlinkowane**, nie są martwymi linkami |

**Mina na przyszłość:** `LEGAL_ROUTES.infoDuty = '/obowiazek-informacyjny'`
(`lib/site.ts:290`) wskazuje na trasę, która zwraca 404. Dziś nikt tego pola nie używa
w JSX, ale pierwsze użycie od razu zrobi martwy link.

**Linki zewnętrzne** (poza zakresem zadania, dla porządku): Instagram 200, TikTok 200,
LinkedIn 200, cal.com 200. Facebook zwraca 400 a YouTube 302 na ekran zgody, to typowa
reakcja na żądanie z serwerowni, nie dowód uszkodzenia. Do potwierdzenia z przeglądarki.

---

## 3. SPÓJNOŚĆ (usługi <-> poradniki <-> narzędzia <-> realizacje)

### 3.1. Stan pól powiązań w rejestrach

| Rejestr | Pola powiązań | Ocena |
|---|---|---|
| `lib/poradniki` | `powiazaneUslugi`, `powiazaneNarzedzia`, `powiazanePoradniki` | jedyny kompletny model, wypełniony w 4/4 poradnikach |
| `lib/uslugi` | tylko `ramaCeny.linkPoradnik` (opcjonalne, jeden link) | wąskie gardło |
| `lib/realizacje` | tylko `kategoria` (mapowana na `/uslugi/<kategoria>`) | jeden link, w jedną stronę |
| `lib/blog` | **brak jakichkolwiek pól linkujących** | zero |
| `lib/materialy` | **brak** | zero |
| `lib/produkty` | **brak** | zero |
| `lib/narzedzia` | **brak** (narzędzia to kotwice na `/narzedzia`, nie osobne trasy) | zero |
| `lib/uslugi/podstrony` | dziedziczy typ usługi, `linkPoradnik` niewypełniony | zero |

### 3.2. Tabela luk (co linkuje do czego, licząc redakcyjnie)

| Relacja | Pokrycie | Braki |
|---|---|---|
| usługa -> poradnik | **4/13** | brak w: `agent-rekrutacyjny`, `dokumenty-faktury`, `opieka-ai`, `rozwiazania`, `strony-www`, `optymalizacja`, `architekci-wartosci-ai`, 3 podstrony voicebotów |
| usługa -> narzędzie | **1/13** (tylko `architekci-wartosci-ai`) | 12 usług nie kieruje do żadnego kalkulatora ani testu |
| usługa -> realizacja | **0/13** | żadna usługa nie pokazuje własnego dowodu, mimo że 8 realizacji jest przypisanych do usług |
| usługa -> materiał | **0/13** | zero lead magnetów w ścieżce ofertowej |
| poradnik -> usługa | 4/4 | pełne (od 2 do 5 usług na poradnik) |
| poradnik -> narzędzie | 4/4 | pełne |
| poradnik -> poradnik | 4/4 | pełne (po 2) |
| poradnik -> realizacja | **0/4** | poradnik cenowy nie pokazuje ani jednego wdrożenia |
| poradnik -> materiał | **0/4** | zero |
| realizacja -> usługa | 8/8 | pełne, ale zawsze dokładnie jedna |
| realizacja -> poradnik | **0/8** | zero |
| realizacja -> realizacja | **0/8** | zero powiązań poziomych, każde case study to wyspa |
| blog -> cokolwiek | **0/5** | wpisy bloga nie linkują nigdzie w treści |
| materiał -> usługa/poradnik | **0/6** | materiały linkują wyłącznie do polityki i kontaktu |
| produkt -> usługa | 1 link na cały hub | `/produkty` -> `/uslugi/rozwiazania` |
| cokolwiek -> `/produkty` | **0** | hub produktów nie istnieje w treści serwisu |
| `/wiedza` -> działy | 9 | jedyny hub, który realnie rozprowadza ruch |

### 3.3. Wniosek o spójności

Model powiązań istnieje tylko w jedną stronę: **poradnik wie o usłudze, usługa prawie nie
wie o poradniku i nigdy o realizacji**. Klaster tematyczny (temat + oferta + dowód +
narzędzie) domyka się dziś wyłącznie na poradnikach. Wszystkie inne typy treści to gwiazda
z jednym promieniem do `/kontakt`.

---

## 4. SYGNAŁY SEO (per trasa, 50 tras)

| Sygnał | Wynik |
|---|---|
| `title` | 50/50 obecne, **0 duplikatów** |
| `meta description` | 50/50 obecne, **0 duplikatów**, wszystkie w zakresie 70-170 znaków |
| `<h1>` | dokładnie 1 na każdej z 50 tras |
| `canonical` | 50/50 obecny i wskazuje na własny URL na `www`, **0 rozjazdów** |
| `canonical` zdublowany | **16 tras ma dwa identyczne znaczniki** (patrz 4.1) |
| JSON-LD | 50/50 obecne, wszystkie parsują się bez błędu |
| `robots` | 50/50 `index, follow`; jedyne `noindex, follow` to 2 szablony AI Radar (celowo poza mapą witryny) |
| Mapa witryny vs build | build daje 52 strony, mapa 50; różnica to dokładnie 2 szablony `noindex`, **mapa jest kompletna i nie zawiera ani jednego 404, przekierowania czy `noindex`** |

### 4.1. Zdublowany canonical (16 tras)

Strony emitują canonical DWA razy: raz przez `buildMetadata` (`lib/metadata.ts:38`,
`alternates.canonical`) i raz ręcznie w JSX. Oba wskazują na ten sam URL, więc nie ma
konfliktu adresów, ale są to dwa znaczniki `rel=canonical` w jednym `<head>`, co
w dokumentacji Google jest jawnie odradzane.

Ręczne wystąpienia do usunięcia:

| Plik | Linia |
|---|---|
| `app/uslugi/page.tsx` | 282 |
| `app/uslugi/architekci-wartosci-ai/page.tsx` | 669 |
| `app/narzedzia/page.tsx` | 316 |
| `app/produkty/page.tsx` | 233 |
| `app/wiedza/page.tsx` | 396 |
| `app/poradniki/page.tsx` | 102 |
| `app/materialy/page.tsx` | 164 |
| `app/realizacje/page.tsx` | 104 |
| `app/realizacje/[slug]/page.tsx` | 126 (daje 8 tras) |

### 4.2. JSON-LD, rozkład typów

| Typ strony | Schematy |
|---|---|
| `/` | FAQPage, Service, Organization, WebSite |
| 13 stron usług i podstron | Service, FAQPage, BreadcrumbList, Organization, WebSite |
| 8 realizacji | BreadcrumbList, FAQPage, Organization, WebSite |
| 5 wpisów bloga, 4 poradniki, 6 materiałów | Article, BreadcrumbList, FAQPage, Organization, WebSite |
| `/o-nas` | AboutPage, Person x2, BreadcrumbList, Organization, WebSite |
| `/produkty` | BreadcrumbList, ItemList, Organization, WebSite |
| huby (`/uslugi`, `/wiedza`, `/poradniki`, `/blog`, `/materialy`, `/realizacje`, `/narzedzia`, `/ai-radar`, `/kontakt`, `/polityka-prywatnosci`) | BreadcrumbList, Organization, WebSite |

Braki jakościowe (nie techniczne, schema jest poprawna):
- 8 realizacji nie ma `CreativeWork` ani `Article`, tylko FAQ i okruszki.
- huby treści (`/poradniki`, `/blog`, `/materialy`, `/realizacje`) nie mają `ItemList`,
  mimo że `/produkty` go ma. Bot nie dostaje sygnału „to jest lista N pozycji".
- `/uslugi` nie ma `ItemList` ani `Service` mimo 11 linków do usług.

### 4.3. Baza dla botów bez JS (punkt odniesienia przed v22, próg do utrzymania)

| Grupa | Znaki tekstu | H2 | H3 | `<table>` | `<details>` |
|---|---|---|---|---|---|
| `/` | 29 450 | 22 | 27 | 1 | 9 |
| `/uslugi/architekci-wartosci-ai` | 16 685 | 14 | 16 | 2 | 6 |
| 10 usług | 9 795-11 742 | 11-12 | 4-7 | 1 | 6-7 |
| 3 podstrony voicebotów | 9 847-9 877 | 12 | 6 | 1 | 6 |
| 4 poradniki | 11 985-15 392 | 11-14 | 4 | 1-2 | 4-6 |
| 5 wpisów bloga | 11 445-12 711 | 10-12 | 1 | 1-2 | 3-4 |
| 6 materiałów | 11 185-16 729 | 11-18 | 1 | 0-6 | 3-4 |
| 8 realizacji | 7 488-7 709 | 10 | 1 | **0** | 2 |
| `/narzedzia` | 18 397 | 10 | 9 | 1 | 1 |
| `/produkty` | 11 201 | 7 | 15 | **0** | **0** |
| `/wiedza` | 7 957 | 8 | 7 | **0** | **0** |
| `/poradniki` | 7 330 | 5 | 5 | **0** | **0** |
| `/uslugi` | 7 608 | 9 | 11 | **0** | **0** |
| `/realizacje` | 9 516 | 5 | 9 | **0** | **0** |
| `/blog` | 8 164 | 6 | 11 | **0** | **0** |
| `/materialy` | 6 946 | 6 | 7 | **0** | **0** |
| `/ai-radar` | 5 427 | 5 | 3 | **0** | **0** |
| `/kontakt` | 5 194 | 4 | 1 | **0** | **0** |

Te liczby są progiem, poniżej którego v22 zejść nie może.
Najsłabsze dla botów: huby (zero tabel, zero `details`) i realizacje (zero tabel).

### 4.4. Treść za interakcją (naruszenie zasady „zero treści za kliknięciem")

`components/forms/DiagnozaForm.tsx` to formularz trzykrokowy sterowany stanem
(`useState(1)`, warunki `step === 2` i `step === 3`). W HTML bez JS widoczny jest tylko
krok 1. Skutki dla botów:

- link do polityki prywatności w zgodzie RODO (`DiagnozaForm.tsx:361`) nie istnieje
  w HTML `/kontakt` ani `/`, stąd `/kontakt` ma 0 linków wychodzących z treści,
- link do Cal.com (`DiagnozaForm.tsx:372`) też jest niewidoczny bez JS,
- treść kroków 2 i 3 nie liczy się do znaków tekstu na `/kontakt` (stąd 5 194 znaki,
  najniższy wynik w całym serwisie).

Zgodność z RODO jest zachowana przez stopkę, ale jako sygnał linkowania to zero.

---

## 5. REKOMENDACJE

Priorytet ustalony wg danych Search Console z `.seo-przeglad/raporty/2026-08-17d.md`
(28 dni: 1216 wyświetleń, 23 kliknięcia, średnia pozycja 18,1).

### P0, naprawy, robić od razu

| # | Strona | Ma dostać | Dlaczego |
|---|---|---|---|
| 1 | `/narzedzia` (`components/narzedzia/GeneratorPromptow.tsx:197`) | poprawiony href na `/materialy/jak-pisac-prompty-ktore-dzialaja` | jedyny martwy link (404) na produkcji, na stronie, do której linkują wszystkie 4 poradniki |
| 2 | 16 tras z 4.1 | usunięcie ręcznego `<link rel="canonical">` (canonical zostaje z `buildMetadata`) | dwa znaczniki canonical w jednym `<head>` to sygnał, którego Google nie musi uszanować |

### P1, najwyższy zwrot wg GSC

| # | Strona | Ma dostać link do | Dlaczego (dane) |
|---|---|---|---|
| 3 | 3 podstrony voicebotów (`windykacja`, `potwierdzanie-wizyt`, `odbieranie-telefonow`) | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` (pole `ramaCeny.linkPoradnik`) + `/narzedzia#kalkulator-oszczednosci` | 400 wyświetleń na rodzicu `/uslugi/voiceboty`, pozycja 22,6, 2 kliknięcia. Podstrony powstały pod te frazy, ale mają dziś tylko 3 linki wchodzące (rodzic + 2 siostry) i zero wyjścia do poradnika i narzędzia |
| 4 | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` | `/realizacje/agenci-ai-24-7` i `/realizacje/auto-email-bok` | pozycja 8,0 i **zerowy CTR**, największa pojedyncza szansa w raporcie SEO. Dowód wdrożenia przy widełkach cenowych to dokładnie ten brakujący element |
| 5 | `/uslugi/chatboty` | `/realizacje/chatbot-edukacyjny-kursy`, `/realizacje/agenci-ai-24-7`, `/narzedzia#kalkulator-procesu` | 427 wyświetleń (najwięcej w serwisie), pozycja 16,6, CTR 0,7%. Ma poradnik, nie ma dowodu ani narzędzia |
| 6 | `/uslugi/automatyzacje` | `/realizacje/auto-email-bok`, `/realizacje/automatyczne-raporty`, `/realizacje/automat-tresci-social`, `/narzedzia#kalkulator-oszczednosci` | 85 wyświetleń, pozycja 17,0, „brakuje treści" wprost w raporcie SEO. Cztery realizacje już wskazują na tę usługę, ale zwrotnie nie ma nic |
| 7 | `/uslugi/dokumenty-faktury` | `/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac` | 74 wyświetlenia, pozycja 25,5, „temat się nagrzewa". Poradnik już linkuje TU, brakuje odwrotnego kierunku, a poradnik ma tylko 1 link wchodzący |
| 8 | `/uslugi/rozwiazania` | `/produkty`, `/realizacje/auto-podsumowania-spotkan`, `/realizacje/transkrypcja-rozmow` | 32 wyświetlenia, pozycja 8,9, TOP10 z zerowym CTR. Jednocześnie zamyka sierotę `/produkty` |

### P2, domknięcie klastrów (największy efekt strukturalny)

| # | Strona | Ma dostać link do | Dlaczego |
|---|---|---|---|
| 9 | 5 wpisów `/blog/*` | po 1 usłudze, 1 poradniku i 1 realizacji (wymaga pól `powiazane*` w `lib/blog/types.ts`) | 5 ślepych zaułków, zero linków wychodzących z treści. Najtańsza duża zmiana: rejestr już ma wzorzec w `lib/poradniki` |
| 10 | 8 realizacji | 1 poradnik tematyczny + 2 siostrzane realizacje (pola `powiazane*` w `lib/realizacje/types.ts`) | każda realizacja ma dziś 1 link wchodzący i 1 wychodzący, to najsłabszy klaster w serwisie. Dodatkowo 0 tabel w HTML |
| 11 | 6 materiałów | 1 usługa + 1 poradnik | dziś linkują wyłącznie do polityki i kontaktu, mimo 11 000-16 700 znaków treści |
| 12 | `/kontakt` | 3-4 linki powrotne (usługi, poradniki, realizacje) | 40 linków wchodzących, 0 wychodzących. To dziś końcówka całego serwisu |
| 13 | `/produkty` | linki Z `/uslugi/rozwiazania`, `/uslugi/automatyzacje`, `/o-nas` i `/realizacje` | jedyna prawdziwa sierota, żyje wyłącznie z menu |
| 14 | `/uslugi` i `/wiedza` | linki redakcyjne z realizacji i usług (nie tylko okruszki) | oba huby mają 0 wejść z treści |
| 15 | 6 usług bez poradnika (`agent-rekrutacyjny`, `opieka-ai`, `strony-www`, `optymalizacja`, `rozwiazania`, `architekci-wartosci-ai`) | najbliższy tematycznie poradnik + kotwica narzędzia | pole `ramaCeny.linkPoradnik` już istnieje i działa, wystarczy je wypełnić |

### P3, sygnały pod boty, przy okazji v22

| # | Co | Dlaczego |
|---|---|---|
| 16 | `ItemList` w JSON-LD na `/uslugi`, `/poradniki`, `/blog`, `/materialy`, `/realizacje` | `/produkty` już go ma, reszta hubów nie. Bot nie wie, że hub to lista N pozycji |
| 17 | Tabela (`<table>`) i `<details>` na hubach i realizacjach | 8 realizacji i 7 hubów ma dziś zero tabel, przy 5 000-9 500 znaków tekstu. To bezpośrednio próg z SPEC v22 |
| 18 | Krok 2 i 3 `DiagnozaForm` renderowane w HTML (np. wszystkie kroki w DOM, ukrywane CSS-em) albo statyczny blok z linkiem do polityki obok formularza | dziś `/kontakt` ma 5 194 znaki i 0 linków wychodzących bez JS |
| 19 | `LEGAL_ROUTES.infoDuty` | wskazuje na `/obowiazek-informacyjny`, który zwraca 404. Albo postawić stronę, albo usunąć pole |
| 20 | Rozważyć `rel="nofollow"` lub usunięcie linków `/ai-radar` -> 2 szablony `noindex` | hub index linkuje do dwóch stron `noindex` opisanych jako „PRZYKŁAD/SZABLON", to strata budżetu indeksowania na treść, która nie ma rankować |

---

## 6. CO NIE ZOSTAŁO ZWERYFIKOWANE

- **NIEZWERYFIKOWANE:** statusy Facebooka (400) i YouTube (302 na ekran zgody) z serwerowni.
  To typowa ochrona antybotowa, nie dowód uszkodzenia. Do kliknięcia z przeglądarki.
- **NIEZWERYFIKOWANE:** czy Cloudflare przed domeną nie blokuje botów AI na poziomie CDN
  (uwaga przeniesiona z raportu SEO 2026-08-17d, nie da się sprawdzić z zewnątrz).
  Pomiary powyżej wykonano z User-Agentem GPTBot i wszystkie 50 stron wróciło 200, więc
  na tej ścieżce blokady nie było.
- Build nie był uruchamiany (`npm run build` zablokowany z uwagi na kolizję `.next`).
  Liczba tras z builda (52) policzona z rejestrów i z `generateStaticParams`, potwierdzona
  tym, że wszystkie 52 URL-e zwracają 200 na produkcji.
