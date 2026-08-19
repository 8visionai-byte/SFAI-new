# Inwentarz cen w repo SF AI WWW (przed wdrożeniem audytu 2026-08-18)

**Data:** 2026-08-18
**Typ:** ROZPOZNANIE. Zero edycji plików repo poza tym raportem, zero commitów, zero buildu.
**Zakres kwot:** 990, 2500, 1490, 1990, 99-599 (wraz z wariantami zapisu: „od 990 zł", „990 zł", „2 500 zł", „1 490 zł", „99 do 599 zł", „od 99 zł").
**Źródło zmian:** `.seo-przeglad/AUDYT-WDROZENIOWY-2026-08-18.md` (jedyne źródło liczb, zatwierdzone przez Pawła), sekcje 1, 2, 3, 9, 10.
**Metoda:** skan `app/`, `components/`, `lib/`, `api/`, `public/`, `scripts/`, `types/` (bez `node_modules`, bez `.next`) skryptem Node z odsianiem fałszywych trafień (hex `#2500ff`, `setTimeout(..., 2500)`).

## Wynik liczbowy w jednym miejscu

| Miara | Wartość |
|---|---|
| Wystąpień pięciu kwot | **280** |
| Linii zawierających kwotę | **205** |
| Plików | **37** |
| Dodatkowo linii z samym dolnym progiem „od 99 zł" (bez górnego 599) | **9** (w tym 4 pliki nieujęte wyżej) |
| Razem plików do ruszenia przy pełnej zmianie | **39** |

Rozkład per kwota (liczba wystąpień / liczba plików):

| Kwota | Wystąpień | Plików | Czy audyt ją zmienia |
|---|---|---|---|
| **990** | 49 | 19 | **TAK** → 1 790 zł (audyt §1) |
| **2500** | 52 | 18 | **NIE zmienia kwoty**, ale zmienia jej otoczenie (dochodzi próg 5 000-9 000 zł i nowy model utrzymania, audyt §2) |
| **1490** | 82 | 29 | **NIE** (audyt §3 potwierdza 1 490 zł; dokłada tylko „5 dni roboczych" i „raport PDF z mapą procesów") |
| **1990** | 43 | 16 | **NIE dotyka wprost**, ale powstaje kolizja z nowym progiem chatbota 1 790 zł → decyzja Pawła |
| **99-599** | 46 | 19 | **CZĘŚCIOWO**: audyt daje nowy model utrzymania wyłącznie dla voicebotów (299-1 500 zł/mies albo 0 zł + 350 zł/h). Dla chatbotów i automatyzacji audyt nie podaje nic → decyzja Pawła |

Weryfikacja na produkcji (curl, 2026-08-18): `/uslugi/chatboty` renderuje 990 zł 8 razy plus `minPrice":"990"` w JSON-LD; `/uslugi/voiceboty` 2500 zł 22 razy plus `minPrice":"2500"`; `/uslugi/audyt-ai` 1490 zł 40 razy plus `minPrice":"1490"`; `/uslugi/voiceboty/odbieranie-telefonow` 2500 zł 14 razy plus `minPrice":"2500"`; `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` 990 zł 45 razy. Repo i produkcja są zgodne.

---

## 1. WARSTWY: gdzie fizycznie siedzą kwoty

### (a) Rejestry treści `lib/uslugi`, `lib/poradniki`, `lib/blog`

**123 linie, 156 wystąpień, 16 plików.** To jest warstwa źródłowa: z niej renderują się strony ORAZ JSON-LD (opis Service, FAQPage), więc każda zmiana tutaj propaguje się w dwa miejsca naraz.

#### `lib/poradniki` (65 linii, 84 wystąpienia, 3 pliki)

| Plik:linia | Kwota | Kontekst | Korekta? |
|---|---|---|---|
| `ile-kosztuje-chatbot-dla-firmy-2026.ts:4,8,9,11` | 990, 1490, 599, 1990 | komentarz nagłówkowy pliku (mapa źródeł) | tak (higiena) |
| `:18` | 990 | **`tytul` = widoczny H1 strony** | **TAK** |
| `:21` | 990, 1990, 599 | `lead` (pierwszy akapit, to on idzie do cytowania w AI) | **TAK** |
| `:23` | 990 | **`metaTitle` (tytuł SEO)** | **TAK, ryzyko pozycji** |
| `:25` | 990, 1990 | **`metaDescription`** | **TAK** |
| `:36` | 990, 1990 | akapit „krótka odpowiedź" | **TAK** |
| `:49` | 1990, 2500 | akapit o tle rynkowym (1990 = cena konkurenta, 2500 = górny abonament rynkowy) | **NIE** (cudze liczby) |
| `:57` | 1990 | wiersz tabeli „Rynek: agencje AI w Polsce" | **NIE** (cudza liczba) |
| `:58` | 990 | **wiersz tabeli „U nas: pakiet startowy"** | **TAK** |
| `:60` | 599 | wiersz tabeli „U nas: opieka po wdrożeniu" | decyzja Pawła |
| `:109,123,190,195` | 599 | akapity i FAQ o opiece | decyzja Pawła |
| `:114` | 990 | **nagłówek H2 „Nasz pakiet startowy: chatbot od 990 zł"** | **TAK** |
| `:116,150` | 990 | akapity treści | **TAK** |
| `:129` | 1490 | akapit o audycie | nie |
| `:180` | 990, 1990, 599 | **odpowiedź FAQ (idzie 1:1 do FAQPage JSON-LD)** | **TAK** |
| `:223` | 990 | karta `powiazaneUslugi` (opis linku do /uslugi/chatboty) | **TAK** |
| `:228` | 1490 | karta `powiazaneUslugi` (audyt) | nie |
| `ile-kosztuje-automatyzacja-ai-w-firmie.ts:11-14` | 1990, 1490, 599 | komentarz nagłówkowy | tak (higiena) |
| `:27` | 1990, 1490, 599 | `lead` | decyzja Pawła (599) |
| `:31` | 1990, 1490 | **`metaDescription`** | nie |
| `:60,67,68` | 1990, 1490, 599 | akapit cennikowy + komentarz o źródłach | decyzja Pawła |
| `:71,72,74` | 1990, 1490, 599 | **kafle metryk** (pas czterech liczb) | decyzja Pawła |
| `:95,100,110` | 1990, 1490, 599 | **wiersze tabeli cennika** | decyzja Pawła |
| `:179,181,189,191` | 1990, 1490 | **nagłówki H2 z kwotą** plus akapity | nie |
| `:200,228,243` | 599, 1990, 1490 | odpowiedzi FAQ (JSON-LD) | decyzja Pawła (599) |
| `:263,290` | 1490, 990 | karty `powiazane` | **TAK** (990) |
| `ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:13-15,26-42` | 990, 2500, 1490, 599 | komentarze o decyzji Pawła z 2026-08-17d (kolizja tytułów) | tak (higiena) |
| `:42` | 2500 | **`metaTitle` „Ile kosztuje wdrożenie AI agenta? Od 2500 zł"** | decyzja Pawła |
| `:74` | 990, 2500, „od 99 zł" | `lead` (odpowiedź pierwszego akapitu) | **TAK** |
| `:94` | 990 | **wiersz tabeli „Agent do jednego zadania"** | **TAK** |
| `:95` | 2500 | wiersz tabeli „Agent z integracją" | decyzja Pawła |
| `:96,97` | 1490, 599 | wiersze tabeli (audyt, opieka) | decyzja Pawła (599) |
| `:276` | 990 | karta `powiazanePoradniki` | **TAK** |

#### `lib/uslugi` plus `lib/uslugi/podstrony` (51 linii, 65 wystąpień, 9 plików)

| Plik:linia | Kwota | Kontekst | Korekta? |
|---|---|---|---|
| `chatboty.ts:10` | 990 | komentarz „minPrice 990 USTAWIONE, locked" | tak (higiena) |
| `chatboty.ts:78` | 990, 599 | **`ramaCeny.tresc`** (główny akapit cennikowy strony /uslugi/chatboty) | **TAK** |
| `chatboty.ts:79` | 990 | **`ramaCeny.minPrice: 990`** → kwota w UI ORAZ `offers.minPrice` w Service JSON-LD | **TAK** |
| `chatboty.ts:94` | 990, 599 | **odpowiedź FAQ** (1:1 do FAQPage JSON-LD) | **TAK** |
| `voiceboty.ts:9` | 2500 | komentarz „minPrice 2500 locked" | nie |
| `voiceboty.ts:23` | 2500 | **`metaTitle` „Voicebot od 2500 zł: bot telefoniczny 24/7"** | nie (kwota zostaje) |
| `voiceboty.ts:25` | 2500, „od 99 zł" | **`metaDescription`** | **TAK w części „opieka od 99 zł/mies"** |
| `voiceboty.ts:79` | 2500, 599 | `ramaCeny.tresc` | **TAK** (dołożyć próg 5 000-9 000, zmienić utrzymanie) |
| `voiceboty.ts:80` | 2500 | **`ramaCeny.minPrice: 2500`** → UI plus `offers` JSON-LD | nie |
| `voiceboty.ts:120` | 2500, 599 | odpowiedź FAQ (JSON-LD) | **TAK** (utrzymanie) |
| `podstrony/odbieranie-telefonow.ts:36,40` | 2500, 599 | komentarz nagłówkowy o źródłach | tak (higiena) |
| `podstrony/odbieranie-telefonow.ts:73` | 2500 | **`metaDescription` „Od 2500 zł za wdrożenie"** | nie |
| `podstrony/odbieranie-telefonow.ts:159,162` | 2500, 599 | komentarz plus `ramaCeny.tresc` | **TAK** (utrzymanie) |
| `podstrony/odbieranie-telefonow.ts:163` | 2500 | **`minPrice: 2500`** → `offers` JSON-LD podstrony | nie |
| `podstrony/odbieranie-telefonow.ts:205` | 2500, 599 | odpowiedź FAQ (JSON-LD) | **TAK** (utrzymanie) |
| `podstrony/potwierdzanie-wizyt.ts:19,24,59,143,145,146,187` | 2500, 599 | ten sam układ pól co wyżej (komentarz, `metaDescription`, `ramaCeny.tresc`, `minPrice`, FAQ) | **TAK** (utrzymanie), kwota 2500 zostaje |
| `podstrony/windykacja.ts:18,22,56,141,143,144,186` | 2500, 599 | ten sam układ pól | **TAK** (utrzymanie), kwota 2500 zostaje |
| `audyt-ai.ts:5,9` | 1490 | komentarz nagłówkowy | nie |
| `audyt-ai.ts:22` | 1490 | **`kapsula`** → idzie do `description` w Service JSON-LD | nie (dołożyć „5 dni roboczych") |
| `audyt-ai.ts:26` | 1490 | **`metaDescription`** | nie |
| `audyt-ai.ts:49` | 1490 | **wiersz tabeli porównawczej** („Koszt audytu / 1490 zł, odliczane od wdrożenia") | nie |
| `audyt-ai.ts:70,78,94,104,109,127` | 1490 | kroki, `ramaCeny.tresc`, FAQ (JSON-LD), CTA | nie (kwota) |
| `audyt-ai.ts:78` | „od 99 zł" | zdanie o opiece utrzymaniowej | decyzja Pawła |
| `audyt-ai.ts:79` | 1490 | **`minPrice: 1490`** → `offers` JSON-LD | nie |
| `opieka-ai.ts:10,11` | 1490, 1990 | komentarz z cennikiem realnym | nie |
| `opieka-ai.ts:87` | 599 | komentarz o rozgraniczeniu abonamentu 99-599 od ryczałtu Opieki AI | decyzja Pawła |
| `opieka-ai.ts:156` | 1490 | treść kroku | nie |
| `agent-rekrutacyjny.ts:81,99` | 1490 | `ramaCeny.tresc` plus FAQ | nie |
| `dokumenty-faktury.ts:82,100` | 1490, „od 99 zł" | `ramaCeny.tresc` plus FAQ | decyzja Pawła (99) |
| `automatyzacje.ts:82` | „od 99 zł" | `ramaCeny.tresc` | decyzja Pawła |

#### `lib/blog` (7 linii, 7 wystąpień, 4 pliki)

Wszystkie to opisy kart linkujących (`powiazaneUslugi` / `powiazanePoradniki`), czyli KOPIE `metaDescription` rejestrów. Rozjadą się w sekundzie, jeśli zmienimy tylko rejestr.

| Plik:linia | Kwota | Kontekst | Korekta? |
|---|---|---|---|
| `ai-act-a-twoja-firma-2026.ts:279` | 1490 | karta audytu | nie |
| `ai-act-a-twoja-firma-2026.ts:307` | 990 | karta poradnika chatbotowego | **TAK** |
| `chatbot-czy-ai-agent-roznice.ts:214` | 990 | karta poradnika chatbotowego | **TAK** |
| `ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026.ts:189` | 1490 | karta audytu | nie |
| `ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026.ts:210` | 990 | karta poradnika chatbotowego | **TAK** |
| `jak-voicebot-odbiera-telefony.ts:195` | 2500, „od 99 zł" | karta /uslugi/voiceboty (kopia `metaDescription`) | **TAK** (utrzymanie) |
| `jak-voicebot-odbiera-telefony.ts:203` | 2500 | karta podstrony odbieranie-telefonow | nie |

### (b) Komponenty z cenami na sztywno

**12 linii, 11 wystąpień pięciu kwot plus 2 linie „od 99 zł", 7 plików.** Tutaj kwoty są literałami w kodzie, nie mapowaniem rejestru, więc nie zmienią się same.

| Plik:linia | Kwota | Kontekst | Korekta? |
|---|---|---|---|
| `components/oferta/TabelaCen.tsx:35` | 1490 | wiersz cennika „Sprint Diagnostyczny" (pełna tabela na /uslugi/architekci-wartosci-ai) | nie |
| `components/oferta/TabelaCen.tsx:42` | 1990 | **wiersz cennika „AI Start"** | decyzja Pawła (kolizja z 1 790) |
| `components/oferta/TabelaCen.tsx:164` | 1490 | notka pod tabelą o odliczeniu Sprintu | nie |
| `components/oferta/TabelaCen.tsx:166` | (netto) | **jedyne w całym serwisie miejsce ze słowem „Ceny netto"** | patrz ryzyko R6 |
| `components/oferta/DrabinaOfert.tsx:60` | 1490 | poziom L2 drabiny | nie |
| `components/oferta/DrabinaOfert.tsx:68` | 1990 | **poziom L3 drabiny „AI Start"** | decyzja Pawła |
| `components/oferta/ObiekcjeOdpowiedzi.tsx:22` | 1490 | odpowiedź na obiekcję cenową | nie |
| `components/oferta/ObiekcjeOdpowiedzi.tsx:42` | 1990 | odpowiedź na obiekcję („zaczynamy od AI Start") | decyzja Pawła |
| `components/oferta/CzegoNieMusisz.tsx:25` | 1490 | „pierwszy płatny krok to 1490 zł" | nie |
| `components/uslugi/ServiceHero.tsx:106,107` | 990, 2500, 1490 | **komentarz kontraktowy** opisujący, skąd bierze się kafel ceny w hero | tak (higiena) |
| `components/sections/faqData.ts:21` | „od 99 zł" | FAQ strony głównej | decyzja Pawła |
| `components/sections/Oferta.tsx:246` | „od 99 zł" | sekcja oferty na stronie głównej | decyzja Pawła |

**Uwaga mechaniczna:** kafel ceny w hero każdej usługi (`components/uslugi/ServiceHero.tsx:138-146`) i kolumna „Cena" w tabeli usług (`app/uslugi/page.tsx:178-186`) NIE mają kwoty na sztywno. Czytają `ramaCeny.minPrice` i doklejają prefiks per slug (`od ` dla chatbotów i voicebotów, pusty dla audytu, `od ... miesięcznie` dla Opieki AI). Zmiana `minPrice` w rejestrze przestawia je automatycznie. To dobra wiadomość: dwa miejsca mniej do ręcznej roboty.

### (c) Wiedza agenta

**35 linii, 52 wystąpienia, 6 plików.** Najgęstsza warstwa po rejestrach. To są odpowiedzi, które bot na stronie wypowiada klientowi, i pliki, które czytają boty AI.

| Plik:linia | Kwota | Kontekst | Korekta? |
|---|---|---|---|
| `public/wiedza-agenta.txt:13` | 1490, 599, „od 99 zł" | wpis „Audyt AI" plus opis MODELU ROZLICZENIA (dwie opcje) | decyzja Pawła (599) |
| `public/wiedza-agenta.txt:16` | 990, 599 | **wpis „Chatbot"** | **TAK** |
| `public/wiedza-agenta.txt:19` | 2500, 599 | **wpis „Voicebot"** | **TAK** (utrzymanie plus próg 5 000-9 000) |
| `public/wiedza-agenta.txt:22,28` | 1490 | wpisy agent rekrutacyjny, dokumenty i faktury | nie |
| `public/wiedza-agenta.txt:34` | 1490, 1990 | wpis Architekci Wartości AI (ścieżka wejścia) | decyzja Pawła |
| `public/wiedza-agenta.txt:47,48,49,50,51` | 1490, 990, 2500, 1990, 599 | **blok „kwoty publiczne", lista pięciu pozycji** | **TAK** (990, 599) |
| `public/wiedza-agenta.txt:62` | 1990 | zdanie o małym pierwszym kroku | decyzja Pawła |
| `public/wiedza-agenta.txt:92` | 990, 2500, 1490, 1990, 599 | **jedno zdanie z KOMPLETEM kwot publicznych** (najgęstsza linia w repo) | **TAK** |
| `api/_knowledge.mjs:20,22` | 1490, 2500 | opisy usług 1 i 3 w prompcie systemowym | **TAK** (2500: dołożyć próg) |
| `api/_knowledge.mjs:34,35,36,37,38` | 1490, 990, 2500, 1990, 599 | **lista „kwoty publiczne"** (bliźniak `wiedza-agenta.txt:47-51`) | **TAK** (990, 599) |
| `api/_knowledge.mjs:145` | 1490 | pole `about` dla sekcji audytu | nie |
| `api/_knowledge.mjs:336` | 990, 2500, 1490, 1990, 599 | **reguła promptu „podaj tylko kwoty publiczne z wiedzy"** z pełną listą | **TAK** |
| `lib/agent/knowledge.ts:70` | 1490 | wpis Architekci Wartości AI | nie |
| `lib/agent/knowledge.ts:87` | 990, 599 | **wpis Chatbot** (wersja bez polskich znaków) | **TAK** |
| `lib/agent/knowledge.ts:104` | 2500, 599 | **wpis Voicebot** | **TAK** (utrzymanie) |
| `lib/agent/knowledge.ts:140` | 599 | wpis Automatyzacje | decyzja Pawła |
| `lib/agent/knowledge.ts:191` | 1490 | wpis Audyt AI | nie |
| `public/llms.txt:15,25` | 1490 | pozycje Architekci i Audyt | nie |
| `public/llms.txt:19` | 990 | **pozycja „Chatbot AI dla firmy: Pakiet startowy od 990 zl"** | **TAK** |
| `public/llms.txt:20` | 2500 | pozycja Voicebot | nie |
| `public/llms.txt:39` | 990 | pozycja „Poradniki AI dla firm (ile kosztuje chatbot od 990 zl)" | **TAK** |
| `components/agent/agent-console-init.ts:433,434` | 1490 | komentarz plus zaszyta odpowiedź awaryjna konsoli agenta | nie |
| `app/api/chat/route.ts:50` | 1490 | reguła promptu „ZERO zmyslonych liczb, np. Sprint 1490 zl" | nie |

**Naczynia połączone w tej warstwie:** `public/wiedza-agenta.txt` i `api/_knowledge.mjs` to dwie kopie tej samej wiedzy w dwóch formatach (jedna dla botów AI, druga dla naszego agenta), a `lib/agent/knowledge.ts` to trzecia, uproszczona (bez polskich znaków). Zmiana kwoty w jednej z nich bez pozostałych = agent na stronie mówi inną cenę niż strona i niż ChatGPT.

### (d) JSON-LD i schema

Kwota trafia do JSON-LD **trzema drogami**, wszystkie automatyczne:

1. **`offers.priceSpecification.minPrice`** — generator `components/seo/schemas.ts:116-127`, wywoływany przez `serviceSchema()`. Wchodzi TYLKO gdy `ramaCeny.minPrice` jest liczbą (`components/seo/schemas.ts:222-240`, `app/uslugi/[usluga]/page.tsx:85`, `app/uslugi/voiceboty/[podstrona]/page.tsx:111-118`).
2. **`Service.description`** — pole `kapsula` rejestru. Z naszych kwot ma ją tylko `lib/uslugi/audyt-ai.ts:22` (1490 dwa razy). Kapsuły chatbotów i voicebotów są bez kwoty.
3. **`FAQPage.acceptedAnswer.text`** — pola `faq[].odpowiedz` przechodzą 1:1 (`components/seo/schemas.ts:133-136`). Każda odpowiedź FAQ z kwotą jest zduplikowana w JSON-LD automatycznie.

**Strony z `offers.minPrice` dzisiaj (potwierdzone na produkcji):**

| Adres | minPrice | Pole źródłowe | Korekta? |
|---|---|---|---|
| `/uslugi/chatboty` | **990** | `lib/uslugi/chatboty.ts:79` | **TAK → 1790** |
| `/uslugi/voiceboty` | 2500 | `lib/uslugi/voiceboty.ts:80` | nie |
| `/uslugi/voiceboty/odbieranie-telefonow` | 2500 | `lib/uslugi/podstrony/odbieranie-telefonow.ts:163` | nie |
| `/uslugi/voiceboty/potwierdzanie-wizyt` | 2500 | `lib/uslugi/podstrony/potwierdzanie-wizyt.ts:146` | nie |
| `/uslugi/voiceboty/windykacja` | 2500 | `lib/uslugi/podstrony/windykacja.ts:144` | nie |
| `/uslugi/audyt-ai` | 1490 | `lib/uslugi/audyt-ai.ts:79` | nie |
| `/uslugi/opieka-ai` | 3000 | `lib/uslugi/opieka-ai.ts:85` | poza zakresem audytu |

Usługi BEZ `offers` (minPrice `undefined`, celowo): automatyzacje, rozwiazania, strony-www, optymalizacja, dokumenty-faktury, agent-rekrutacyjny, plus strona główna (`app/page.tsx:136-138`) i architekci-wartosci-ai (`app/uslugi/architekci-wartosci-ai/page.tsx:638-639`, cena wejściowa 0 zł).

### (e) `metaTitle` / `metaDescription` / `kapsula` zawierające kwotę

**14 pól w 8 plikach.** To warstwa najbardziej ryzykowna dla pozycji, bo tytuł i opis widzi Google.

| Pole | Plik:linia | Treść (skrót) | Kwota | Korekta? |
|---|---|---|---|---|
| `tytul` (H1) | `ile-kosztuje-chatbot-dla-firmy-2026.ts:18` | „Ile kosztuje chatbot dla firmy w 2026? Od 990 zł i co wpływa na cenę" | 990 | **TAK** |
| `metaTitle` | `ile-kosztuje-chatbot-dla-firmy-2026.ts:23` | „Ile kosztuje chatbot AI dla firmy? Od 990 zł" | 990 | **TAK, ryzyko** |
| `metaDescription` | `ile-kosztuje-chatbot-dla-firmy-2026.ts:25` | „...od 990 zł, rynkowo od 1990 do 45000 zł..." | 990, 1990 | **TAK** |
| `lead` | `ile-kosztuje-chatbot-dla-firmy-2026.ts:21` | pierwszy akapit z 990 / 1990 / 99-599 | 990, 1990, 599 | **TAK** |
| `metaTitle` | `ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:42` | „Ile kosztuje wdrożenie AI agenta? Od 2500 zł" | 2500 | decyzja Pawła |
| `lead` | `ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:74` | „...zaczyna się od 990 zł... od 2 500 zł... opieka od 99 zł" | 990, 2500 | **TAK** |
| `metaDescription` | `ile-kosztuje-automatyzacja-ai-w-firmie.ts:31` | „...próbę 1990 zł, audyt 1490 zł..." | 1990, 1490 | nie |
| `metaTitle` | `voiceboty.ts:23` | „Voicebot od 2500 zł: bot telefoniczny 24/7" | 2500 | nie |
| `metaDescription` | `voiceboty.ts:25` | „...od 2500 zł jednorazowo za wdrożenie, opieka od 99 zł/mies..." | 2500, 99 | **TAK** (opieka) |
| `kapsula` | `audyt-ai.ts:22` | „...płatny Sprint Diagnostyczny za 1490 zł..." (idzie do JSON-LD) | 1490 | nie |
| `metaDescription` | `audyt-ai.ts:26` | „Audyt AI za 1490 zł..." | 1490 | nie |
| `metaDescription` | `podstrony/odbieranie-telefonow.ts:73` | „...Od 2500 zł za wdrożenie." | 2500 | nie |
| `metaDescription` | `podstrony/potwierdzanie-wizyt.ts:59` | „...Od 2500 zł." | 2500 | nie |
| `metaDescription` | `podstrony/windykacja.ts:56` | „...Od 2500 zł." | 2500 | nie |

### (f) Strony `app/` (huby i FAQ) — warstwa, o której łatwo zapomnieć

**33 linie, 61 wystąpień, 10 plików.** Nie jest to rejestr ani komponent, tylko literały w `page.tsx` hubów. Dziewięć hubów powtarza to samo zdanie cennikowe i to samo zdanie o dwóch modelach rozliczenia.

| Plik:linia | Kwota | Kontekst | Korekta? |
|---|---|---|---|
| `app/uslugi/page.tsx:216,217,234,235,242` | 1490, 1990, 990, 2500, 599 | komentarze o źródłach kwot | tak (higiena) |
| `app/uslugi/page.tsx:221` | 1490, 1990 | odpowiedź FAQ hubu (JSON-LD) | nie |
| `app/uslugi/page.tsx:238` | 990, 2500, 1490, 1990 | **FAQ „które usługi mają kwotę wprost"** (JSON-LD) | **TAK** |
| `app/uslugi/page.tsx:247` | 599 | FAQ o modelu rozliczenia | decyzja Pawła |
| `app/kontakt/page.tsx:52,53,54,176,177,178` | 990, 1490, 1990, 2500 | komentarze z mapą źródeł | tak (higiena) |
| `app/kontakt/page.tsx:182` | 990, 2500, 1990, 1490 | **FAQ „ile to kosztuje"** (JSON-LD) | **TAK** |
| `app/kontakt/page.tsx:189` | 599 | FAQ o abonamencie | decyzja Pawła |
| `app/blog/page.tsx:105` / `:111` | 990, 2500, 1490, 1990 / 599 | FAQ hubu bloga | **TAK** / decyzja |
| `app/poradniki/page.tsx:99` / `:105` | 990, 2500, 1490, 1990 / 599 | FAQ hubu poradników | **TAK** / decyzja |
| `app/realizacje/page.tsx:123` / `:129` | 990, 2500, 1490 / 599 | FAQ hubu realizacji | **TAK** / decyzja |
| `app/wiedza/page.tsx:320` | 990, 2500, 1490, 1990 | FAQ hubu wiedzy | **TAK** |
| `app/materialy/page.tsx:134` / `:140` | 1990, 1490, 990 / 599 | FAQ hubu materiałów | **TAK** / decyzja |
| `app/produkty/page.tsx:122` / `:134` | 1990, 1490 / 599 | FAQ hubu produktów | nie / decyzja |
| `app/narzedzia/page.tsx:172` | 599 | FAQ hubu narzędzi | decyzja Pawła |
| `app/uslugi/architekci-wartosci-ai/page.tsx:80,90,258,259,260,261,275,276,409` | 1490, 1990 | FAQ, komentarze źródeł, **kafle metryk hero** (`1490 zł` / `1990 zł`), akapit | decyzja Pawła (1990) |

---

## 2. RYZYKA

**R1. Tytuły SEO z kwotą 990: jeden tytuł i jeden H1.**
`lib/poradniki/poradniki/ile-kosztuje-chatbot-dla-firmy-2026.ts:23` (`metaTitle` „Ile kosztuje chatbot AI dla firmy? Od 990 zł") oraz `:18` (`tytul`, czyli widoczny H1). Strona powstała 16.08 i według briefu SEO ma dziś ZERO wyświetleń w Search Console, bo dane obejmują 28 dni wstecz. **To jest okno na bezkarną zmianę tytułu:** nie ma pozycji, którą można by stracić. Im dłużej czekamy, tym drożej. Żaden inny `metaTitle` w repo nie zawiera 990.

**R2. Kolizja tytułów w SERP, którą już raz rozwiązywaliśmy.**
`ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:26-40` zawiera zapisaną decyzję Pawła z 2026-08-17d: tytuł poradnika o agencie ustawiono na „Od 2500 zł" właśnie dlatego, że „Od 990 zł" stało już w tytule poradnika chatbotowego. Jeśli chatbot idzie na 1 790 zł, ta decyzja traci podstawę i trzeba ją podjąć raz jeszcze, świadomie. Nie wolno zmienić 990 na 1790 tylko w jednym z tych dwóch plików.

**R3. Strony z `offers.minPrice` 990: jedna.**
`/uslugi/chatboty` (`lib/uslugi/chatboty.ts:79`). Zmiana tej jednej liczby przestawia jednocześnie: kwotę w kaflu hero, kolumnę „Cena" w tabeli na `/uslugi`, licznik `LICZBA_Z_CENA` w FAQ hubu (`app/uslugi/page.tsx:124`) i `offers` w Service JSON-LD. Wszystkie cztery są mapowaniem, nie literałem, więc zadziałają same. Reszta miejsc z 990 (48 wystąpień) to literały i trzeba je ruszyć ręcznie.

**R4. Kwota w tabelach.**
Tabela porównawcza (typ `tabelaPorownawcza` w rejestrze usług) ma kwotę tylko w JEDNYM miejscu: `lib/uslugi/audyt-ai.ts:49` („Koszt audytu / Stracony czas na próby / 1490 zł, odliczane od wdrożenia") i ta kwota się nie zmienia. Natomiast tabele cennikowe w poradnikach mają kwoty gęsto: `ile-kosztuje-chatbot-dla-firmy-2026.ts:57-60` (4 wiersze), `ile-kosztuje-automatyzacja-ai-w-firmie.ts:95-110` (4 wiersze) plus pas kafli `:71-74` powielający te same liczby, `ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:94-97` (4 wiersze). Audyt §10 pkt 6 mówi wprost: **nie ruszać FAQ i tabel porównawczych**, bo to nasza realna przewaga. Tabele CENNIKOWE to co innego niż porównawcze i one muszą się zmienić, ale granicę trzeba trzymać świadomie.

**R5. „3000-10000 zł" znaczy dziś dwie różne rzeczy.**
To samo sformułowanie opisuje (a) chatbota z integracjami (`ile-kosztuje-chatbot-dla-firmy-2026.ts:59,129,180`) i (b) wdrożenie automatyzacji (`ile-kosztuje-automatyzacja-ai-w-firmie.ts` w 6 miejscach, plus 9 FAQ hubów). Audyt zmienia tylko (a) na 3 000-6 000 / 8 000-15 000 i nie mówi nic o (b). Ślepe „znajdź i zamień 3000-10000" zepsuje cennik automatyzacji.

**R6. Słowo „netto" pada w całym serwisie raz.**
`components/oferta/TabelaCen.tsx:166` („Ceny netto"), czyli wyłącznie na `/uslugi/architekci-wartosci-ai`. Audyt §9 etap 1 pkt 4 każe oznaczyć jako netto **każdą** kwotę. To 38 z 39 plików bez oznaczenia. Osobne, duże zadanie redakcyjne, niezależne od zmiany samych liczb.

**R7. Trzy kopie tej samej wiedzy dla agenta.**
`public/wiedza-agenta.txt:47-51`, `api/_knowledge.mjs:34-38` i `lib/agent/knowledge.ts:87,104` to trzy zapisy tego samego cennika. Do tego `api/_knowledge.mjs:336` powtarza pełną listę kwot w regule promptu, a `public/wiedza-agenta.txt:92` w jednym zdaniu. Pięć miejsc, jedna prawda.

**R8. Nasz własny tekst będzie sam sobie przeczył.**
`ile-kosztuje-chatbot-dla-firmy-2026.ts:49,57` cytuje tło rynkowe „agencje zaczynają od 1990 zł". Powód zmiany 990 → 1 790 (audyt §1) brzmi: „990 leżało poniżej rynkowego progu 2000-3500 zł". Ale 1 790 też leży poniżej 1 990, które sami cytujemy jako dolny próg rynku, i poniżej pasma 2000-3500 z raportu konkurencji. **Nie zmieniam danej i nie proponuję innej liczby**, zgłaszam sprzeczność jako pytanie do Pawła (patrz P1).

---

## 3. TABELA ZMIAN wg audytu (sekcje 1 i 2) i miejsca, w których audyt NIE DAJE danej

Legenda: **DANA** = audyt podaje liczbę wprost. **BRAK** = audytu o tym nie pyta i nie odpowiada, idzie jako pytanie do Pawła.

### 3.1 Chatboty (audyt §1)

| Warstwa | Co dziś stoi | Co ma stać wg audytu | Status danej |
|---|---|---|---|
| `lib/uslugi/chatboty.ts:79` (`minPrice`) | 990 | **1790** | DANA |
| `lib/uslugi/chatboty.ts:78,94` (`ramaCeny.tresc`, FAQ) | „od 990 zł" plus opieka 99-599 | drabina trzech progów: 1 790 zł / 3 000-6 000 zł / 8 000-15 000 zł, z czasami 1-2 / 3-4 / 5-10 dni roboczych | DANA (progi i czasy) |
| ta sama treść, część o utrzymaniu | „99 do 599 zł miesięcznie" | ? | **BRAK: audyt nie podaje kosztu utrzymania chatbota** |
| ta sama treść, zasada liczenia czasu | brak | „czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy" | DANA (§1, cytat do wpisania wprost) |
| ta sama treść, rundy poprawek | brak | „dwie rundy poprawek w cenie wdrożenia" plus granica: poprawki po naszej stronie zawsze, nowe funkcje = osobna wycena | DANA |
| poradnik chatbotowy `:18,23,25,21,36,58,114,116,150,180,223` | 990 w H1, metaTitle, metaDescription, leadzie, tabeli, H2, akapitach, FAQ i karcie | 1 790 zł w każdym z tych 11 miejsc plus drabina trzech progów w tabeli | DANA (kwoty), **BRAK: opieka** |
| poradnik agenta `:74,94` | „od 990 zł za agenta do jednego zadania" | ? | **BRAK: audyt nie zna kategorii „agent do jednego zadania"** |
| wiedza agenta: `wiedza-agenta.txt:16,48,92`, `_knowledge.mjs:35,336`, `knowledge.ts:87`, `llms.txt:19,39` | „pakiet startowy od 990 zł" | 1 790 zł plus drabina i czasy | DANA |
| huby: `app/{blog,poradniki,realizacje,wiedza,materialy,kontakt,uslugi}/page.tsx` | „Chatbot startuje od 990 zł" w 7 odpowiedziach FAQ | 1 790 zł w 7 miejscach | DANA |
| karty blogowe: `ai-act:307`, `chatbot-czy-ai-agent:214`, `ile-kosztuje-wdrozenie-ai-w-malej-firmie:210`, `automatyzacja:290`, `agent:276` | „Pakiet startowy od 990 zł" (5 kopii jednego zdania) | 1 790 zł w 5 miejscach | DANA |

### 3.2 Voiceboty (audyt §2)

| Warstwa | Co dziś stoi | Co ma stać wg audytu | Status danej |
|---|---|---|---|
| `lib/uslugi/voiceboty.ts:80` (`minPrice`) | 2500 | **2500 bez zmian** | DANA |
| `lib/uslugi/voiceboty.ts:79,120` | jeden próg 2 500 zł | dwa progi: prosty **2 500 zł**, z integracjami **5 000-9 000 zł** | DANA |
| tamże, część o opiece | „99 do 599 zł miesięcznie" albo bez abonamentu | **299-1 500 zł/mies** przy infrastrukturze u nas, albo **0 zł/mies** przy przekazaniu plus **350 zł netto/h** za poprawki | DANA |
| tamże, koszt zużycia | „koszt działania zależny od liczby rozmów" | rozbić na trzecią, jawną pozycję: tokeny i minuty według realnego użycia, po stronie klienta | DANA (§2 koszt 3) |
| `voiceboty.ts:25` (`metaDescription`) | „opieka od 99 zł/mies" | „od 299 zł/mies albo 0 zł" (sformułowanie do ustalenia) | DANA (liczby), decyzja redakcyjna |
| trzy podstrony `podstrony/*.ts:143/145/162/186/187/205` | 2 500 zł plus opieka 99-599 | 2 500 zł zostaje, opieka na nowy model, próg 5 000-9 000 do dołożenia tam, gdzie pasuje do zastosowania | DANA |
| czas wdrożenia voicebota | brak liczby na stronie | ? | **BRAK: audyt podaje czasy tylko dla chatbotów (§1) i audytu AI (§3)** |
| wiedza agenta: `wiedza-agenta.txt:19,49,92`, `_knowledge.mjs:22,36,336`, `knowledge.ts:104`, `llms.txt:20` | 2 500 plus 99-599 | 2 500 plus drugi próg plus nowy model utrzymania plus zużycie | DANA |
| karta blogowa `jak-voicebot-odbiera-telefony.ts:195` | „opieka od 99 zł/mies" | nowy model | DANA |

### 3.3 Audyt AI (audyt §3) — kwota bez zmian, treść do uzupełnienia

| Warstwa | Co dziś stoi | Co dokłada audyt | Status danej |
|---|---|---|---|
| `lib/uslugi/audyt-ai.ts:22,26,49,70,78,79,94,104,109,127` (10 miejsc) | 1 490 zł, odliczane od wdrożenia | **1 490 zł bez zmian** plus **5 dni roboczych** plus **raport PDF z mapą procesów** | DANA |
| `audyt-ai.ts:78` | „opłata utrzymaniowa od 99 zł miesięcznie" | zależnie od decyzji o utrzymaniu | **BRAK / decyzja** |

### 3.4 Kwota 1990 (AI Start) — audyt jej nie dotyka, ale zmiana chatbota ją uderza

| Warstwa | Problem | Status |
|---|---|---|
| `components/oferta/TabelaCen.tsx:42`, `DrabinaOfert.tsx:68`, `ObiekcjeOdpowiedzi.tsx:42`, `app/uslugi/architekci-wartosci-ai/page.tsx:90,276`, `ile-kosztuje-automatyzacja-ai-w-firmie.ts` (7 miejsc), `wiedza-agenta.txt:34,50,62,92`, `_knowledge.mjs:37,336`, 6 FAQ hubów | AI Start 1 990 zł ma być „najtańszym, najmniejszym krokiem na próbę". Po zmianie chatbota na 1 790 zł najtańszym produktem staje się chatbot, a cała narracja drabiny („zacznij od małego AI Start") przestaje się trzymać | **BRAK: audyt nie wypowiada się o AI Start** → pytanie P2 |

### 3.5 Kwota 99-599 (opieka) — audyt zmienia ją tylko dla voicebotów

Dziś jedno sformułowanie „od 99 do 599 zł miesięcznie" obsługuje chatboty, voiceboty, automatyzacje, dokumenty i faktury oraz 9 hubów: **46 wystąpień w 19 plikach**, plus 9 linii z samym „od 99 zł". Audyt daje nowe widełki wyłącznie dla voicebotów. Trzy drogi, każda wymaga decyzji Pawła:

| Wariant | Konsekwencja w repo |
|---|---|
| (a) 299-1 500 obowiązuje całość | zmiana w 19 plikach, spójność zachowana, ale podnosimy cenę opieki chatbotów bez danej od Pawła |
| (b) 299-1 500 tylko voiceboty, 99-599 zostaje reszcie | zmiana w 8 plikach voicebotowych, ale w 7 hubach jedno zdanie FAQ musi rozróżnić dwa modele, inaczej strona sama sobie przeczy |
| (c) 99-599 zostaje wszędzie, dokładamy tylko opcję 0 zł plus 350 zł/h | najmniej zmian, ale gubimy przewagę opisaną w audycie §2 |

---

## 4. PYTANIA DO PAWŁA (miejsca, w których audyt nie daje danej)

**P1.** 1 790 zł nadal leży poniżej pasma rynkowego 2 000-3 500 zł, które sami cytujemy w poradniku (`ile-kosztuje-chatbot-dla-firmy-2026.ts:49,57`: „agencje zaczynają od 1990 zł"). Zostawiamy 1 790 i przepisujemy tło rynkowe, czy podnosimy próg?

**P2.** Chatbot 1 790 zł staje się tańszy od AI Start 1 990 zł, który jest reklamowany jako „najmniejszy krok na próbę" w 20 miejscach. Co ma być najtańszym wejściem?

**P3.** Koszt utrzymania chatbota: zostaje 99-599 zł, przechodzi na 299-1 500 zł jak voiceboty, czy dostaje trzecią wartość? Audyt tego nie podaje, a stoi to w 19 plikach.

**P4.** Czas wdrożenia voicebota w dniach roboczych. Chatboty mają 1-2 / 3-4 / 5-10 (§1), audyt AI ma 5 dni (§3), voiceboty nie mają nic. To ta sama luka cytowalności, którą audyt naprawia dla chatbotów.

**P5.** Poradnik o agencie AI ma dziś wiersz „Agent do jednego zadania: od 990 zł" (`:94`) i tytuł „Od 2500 zł" (`:42`). Audyt nie zna kategorii „agent do jednego zadania". Wiersz znika, dostaje 1 790 zł, czy inną kwotę?

**P6.** Chatbot z integracjami: dziś „zwykle 3000 do 10000 zł" w 3 miejscach poradnika. Audyt daje 3 000-6 000 (średni) i 8 000-15 000 (duży). Potwierdzasz, że stare widełki chatbota znikają, a widełki AUTOMATYZACJI (te same cyfry, inna usługa, 15 miejsc) zostają bez zmian?

**P7.** Oznaczenie „netto": audyt §9 każe je dodać do każdej kwoty. Dziś słowo pada raz, w `components/oferta/TabelaCen.tsx:166`. Robimy to w tej samej partii co zmianę liczb, czy osobno?

---

## Załącznik: pliki posortowane po liczbie wystąpień

| Wystąpień | Linii | Plik |
|---|---|---|
| 33 | 24 | `lib/poradniki/poradniki/ile-kosztuje-chatbot-dla-firmy-2026.ts` |
| 31 | 24 | `lib/poradniki/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie.ts` |
| 22 | 13 | `public/wiedza-agenta.txt` |
| 20 | 17 | `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts` |
| 14 | 8 | `app/uslugi/page.tsx` |
| 14 | 12 | `lib/uslugi/audyt-ai.ts` |
| 14 | 9 | `api/_knowledge.mjs` |
| 12 | 8 | `app/kontakt/page.tsx` |
| 10 | 7 | `lib/uslugi/podstrony/potwierdzanie-wizyt.ts` |
| 10 | 7 | `lib/uslugi/podstrony/windykacja.ts` |
| 9 | 9 | `app/uslugi/architekci-wartosci-ai/page.tsx` |
| 9 | 7 | `lib/uslugi/podstrony/odbieranie-telefonow.ts` |
| 8 | 5 | `lib/agent/knowledge.ts` |
| 8 | 6 | `lib/uslugi/voiceboty.ts` |
| 6 | 4 | `lib/uslugi/chatboty.ts` |
| 5 | 2 | `app/blog/page.tsx` |
| 5 | 2 | `app/poradniki/page.tsx` |
| 5 | 5 | `public/llms.txt` |
| 4 | 2 | `app/materialy/page.tsx` |
| 4 | 2 | `app/realizacje/page.tsx` |
| 4 | 1 | `app/wiedza/page.tsx` |
| 4 | 4 | `lib/uslugi/opieka-ai.ts` |
| 3 | 2 | `app/produkty/page.tsx` |
| 3 | 3 | `components/oferta/TabelaCen.tsx` |
| 3 | 2 | `components/uslugi/ServiceHero.tsx` |
| 2 | 2 | `components/agent/agent-console-init.ts` |
| 2 | 2 | `components/oferta/DrabinaOfert.tsx` |
| 2 | 2 | `components/oferta/ObiekcjeOdpowiedzi.tsx` |
| 2 | 2 | `lib/blog/posts/ai-act-a-twoja-firma-2026.ts` |
| 2 | 2 | `lib/blog/posts/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026.ts` |
| 2 | 2 | `lib/blog/posts/jak-voicebot-odbiera-telefony.ts` |
| 2 | 2 | `lib/uslugi/agent-rekrutacyjny.ts` |
| 2 | 2 | `lib/uslugi/dokumenty-faktury.ts` |
| 1 | 1 | `app/api/chat/route.ts` |
| 1 | 1 | `app/narzedzia/page.tsx` |
| 1 | 1 | `components/oferta/CzegoNieMusisz.tsx` |
| 1 | 1 | `lib/blog/posts/chatbot-czy-ai-agent-roznice.ts` |
| plus | 4 | `components/sections/faqData.ts`, `components/sections/Oferta.tsx`, `lib/uslugi/automatyzacje.ts`, `lib/uslugi/dokumenty-faktury.ts` (tylko „od 99 zł") |

### Fałszywe trafienia, odsiane świadomie

`lib/inf-kategorie.ts:109` i `components/sections/Rozwiazanie.tsx:74` (hex `#2500ff` w komentarzu o palecie), `app/api/chat/route.ts:255` (`setTimeout(..., 2500)`). Nie są cenami.

### Dokumentacja wewnętrzna (poza kodem produkcyjnym, do aktualizacji przy okazji)

`STATUS.md` (11 linii), `PRZEKAZANIE-SESJA-SFAI.md` (8), `_zespol/specy/09-struktura-uslugi-produkty-drabina.md` (9), `PROFIL-STRATEGICZNY-SIMPLEFAST.md` (2). Nie renderują się nigdzie, ale utrwalają stary cennik dla kolejnych sesji.
