# PLAN: STRUKTURA STRONY + SEO (ZESPÓŁ 1)

Data: 2026-08-07. Autor: zespół 1 (architekt informacji + SEO).
Podstawa danych: `raporty/raport-seo-2026-08-07.md` (GSC 2026-07-08 do 2026-08-05),
`raporty/raport-seo-2026-08-06.md`, kod repo (odczyt, zero edycji plików kodu).

FAZA ANALITYCZNA. Ten plik nie zmienia ani jednej linii kodu. Wszystkie liczby
w tabelach policzone z rejestrów repo i z raportu GSC, nie z pamięci.

---

## 0. W trzech zdaniach, co ten plan robi

1. Strona główna przestaje być listą 16 sekcji, a staje się opowieścią w 11 sekcjach,
   która w pierwszym ekranie mówi, co robimy, i w każdym kroku podaje link do strony,
   która realnie zbiera ruch (4 strony usług robią 100% ruchu komercyjnego, home robi markę).
2. Dokładamy 93 nowe linki wewnętrzne z 25 nowych stron źródłowych, bo dziś
   `/uslugi/voiceboty` ma 3 linki przy 336 wyświetleniach, a `/produkty` ma zero.
3. Skracamy 16 tytułów powyżej 65 znaków i 10 opisów powyżej 160 znaków, i wpisujemy
   frazę „mapa wąskich gardeł” (134 wyświetlenia, 0 kliknięć) tam, gdzie jej brakuje.

---

## 1. AUDYT OBECNEJ STRUKTURY HOME, SEKCJA PO SEKCJI

Źródło: `app/page.tsx` (16 komponentów w tej kolejności) + pliki `components/sections/*`.

| # | Sekcja (plik) | Cel | Dla kogo | Powtarza inną sekcję? | CTA | Linki wewnętrzne | Werdykt |
|---|---|---|---|---|---|---|---|
| 1 | `Hero.tsx` | pozycjonowanie kategorii, pierwszy kontakt | każdy | tak: 3 chipy = 1:1 tytuły filarów `PasekZaufania`; blok persony = 1:1 H2 `BranzeDemo` | 3 (1 primary + 2 ghost) | 0 do usług, 3 kotwice: `/kontakt`, `#problem`, `#demo` | ZOSTAJE, odchudzić do 1 CTA + 1 ghost, dołożyć 3 linki do usług |
| 2 | `PromoUslugi.tsx` | kafelki 3 usług + parasol | klient szukający konkretu | tak: te same stringi (`u.h1` + `u.metaDescription`) renderuje `Oferta` niżej | brak | 4 (chatboty, voiceboty, audyt-ai, architekci) | ZOSTAJE, ale wymaga H2 sekcji i własnych opisów kart |
| 3 | `PasekZaufania.tsx` | 3 obawy zdjęte | ostrożny właściciel | TAK, DUPLIKAT: `FILARY[0].title` = chip hero „Twoje dane zostają w UE”, `FILARY[2].title` = chip hero „Płacisz za efekt” | brak | 0 | SCALIĆ z hero (chipy zostają), sekcja znika |
| 4 | `Problem.tsx` | ból językiem klienta + walec cytatów | niezdecydowany | nie | 1 (secondary „Pokaż mi, ile tracę”) | 0 | ZOSTAJE, dołożyć 2 linki |
| 5 | `BranzeDemo.tsx` | typewriter z 4 branżami | branżowy long-tail | TAK, DUPLIKAT: H2 „Powtarzalna robota wygląda inaczej w każdej branży” = ten sam string w hero (`HeroPersonaCycler`) | brak | 0 | SCALIĆ z `Problem` jako 4 kafelki branż z linkami. DECYZJA PAWŁA (usuwa drugi typewriter ze strony) |
| 6 | `Rozwiazanie.tsx` | 2 kapsuły AEO + demo + tabela + 4 punkty + cytat | bot AI i czytelnik | częściowo: tabela porównawcza dubluje FAQ „Czym AI Agent różni się od chatbota?” | 1 (secondary „Sprawdź, którego Agenta potrzebujesz” do `#diagnoza`) | 3 (chatboty, voiceboty, automatyzacje) | ROZBIĆ: 6 bloków w jednej sekcji to za dużo. Demo idzie do `ZyweDemo` |
| 7 | `JakToDziala.tsx` | 3 kroki wdrożenia | ostrożny | nie | 1 primary | 0 | ZOSTAJE bez zmian struktury |
| 8 | `Oferta.tsx` | cena + katalog 10 usług | gotowy do zakupu | tak: kafelki 3 usług powtórzone z `PromoUslugi` | 2 primary | 10 (pełna lista usług) | ZOSTAJE, karty cennika do przerobienia (patrz niżej) |
| 9 | `NarzedziaTeaser.tsx` | 5 narzędzi | ciekawski, ruch top-of-funnel | nie | brak | 5, wszystkie do `/narzedzia#slug` | ZOSTAJE, H2 „Narzędzia” jest bezużyteczny dla SEO |
| 10 | `Bezpieczenstwo.tsx` | RODO, AI Act | lęk #1 | częściowo: FAQ „Czy moje dane będą bezpieczne?” | brak | 0 | SCALIĆ z `GwarancjaEfektu` |
| 11 | `Dowod.tsx` | co się zmienia po wdrożeniu | sceptyk | nie | 1 primary | 0 (mamy 8 realnych case’ów w `lib/realizacje` i ani jednego linku do nich) | SCALIĆ z `DowodSpoleczny`, dołożyć 3 linki do realizacji |
| 12 | `GwarancjaEfektu.tsx` | risk reversal | sparzony klient | tak: FAQ „Co, jeśli to nie zadziała w mojej firmie?” + „Już raz przepaliłem budżet” | 1 primary | 0 | SCALIĆ z `Bezpieczenstwo` |
| 13 | `DowodSpoleczny.tsx` | 6 realnych opinii + founderzy | sceptyk | nie | 1 primary + 1 link | 1 (`/o-nas`) | SCALIĆ z `Dowod` |
| 14 | `FAQ.tsx` | 9 pytań, FAQPage | bot AI, niezdecydowany | nie | 1 primary | 0 (żadna odpowiedź nie linkuje do usługi) | ZOSTAJE, dołożyć linki w 4 odpowiedziach |
| 15 | `ZyweDemo.tsx` | ChatDemo + voice blob | dowód kompetencji | nie | 1 primary | 0 | ZOSTAJE, przejmuje `AgentDemo` z sekcji 6 |
| 16 | `FinalneCTA.tsx` | formularz diagnozy | gotowy | nie | 1 primary | 0 | ZOSTAJE, cel wszystkich CTA |

### 1.1 Trzy twarde defekty znalezione w kodzie

**Defekt 1: CTA prowadzą w dwa różne miejsca.**
`lib/site.ts` linia 152 do 157: `HOME_CTA.href = '/kontakt'`, a komentarz nad nim mówi
„wszystkie wystąpienia prowadzą do tego samego flow diagnozy (`#diagnoza`)”.
Tymczasem `Rozwiazanie.tsx` linia 202 wysyła na `#diagnoza` (formularz jest NA home,
`FinalneCTA` ma `id="diagnoza"`), a `FinalneCTA.tsx` linia 53 na `#diagnoza-formularz`.
Czyli ta sama intencja ma trzy cele. To jest techniczna część skargi „CTA rozpierdolone”.

Pełny spis 13 CTA na home i 7 różnych etykiet:

| Sekcja | Etykieta | Wariant | Cel |
|---|---|---|---|
| Hero | Pokaż mi, gdzie tracę czas | primary | `/kontakt` |
| Hero | Zobacz, jak liczę oszczędność | ghost | `#problem` |
| Hero | Zobacz, jak rozmawia nasz Agent | ghost | `#demo` |
| Problem | Pokaż mi, ile tracę | secondary | `/kontakt` |
| Rozwiazanie | Sprawdź, którego Agenta potrzebujesz | secondary | `#diagnoza` |
| JakToDziala | Umów bezpłatną diagnozę | primary | `/kontakt` |
| Oferta (karta) | Umów bezpłatną diagnozę | primary | `/kontakt` |
| Oferta (stopka) | Pokaż mi, gdzie tracę czas | primary lg | `/kontakt` |
| Dowod | Pokaż mi, gdzie tracę czas | primary lg | `/kontakt` |
| GwarancjaEfektu | Pokaż mi, gdzie tracę czas | primary lg | `/kontakt` |
| DowodSpoleczny | Pokaż mi, gdzie tracę czas | primary lg | `/kontakt` |
| DowodSpoleczny | Poznaj założycieli | link | `/o-nas` |
| FAQ | Mam inne pytanie, umów rozmowę | primary | `/kontakt` |
| ZyweDemo | Chcę takiego Agenta u siebie | primary | `/kontakt` |
| FinalneCTA | Umów bezpłatną diagnozę | primary lg | `#diagnoza-formularz` |

**Defekt 2: hierarchia nagłówków home jest złamana.**
Na home renderuje się 18 znaczników H2. Cztery z nich to tytuły kart w `PromoUslugi`
(`<h2>` w linii 93 i 138), a sama sekcja nie ma H2. Google i modele językowe czytają
to jako cztery równorzędne rozdziały bez tematu. Sekcja `Rozwiazanie` renderuje kolejne
dwa H2 z pętli po kartach (linia 94). To znaczy, że 6 z 18 nagłówków H2 na home to
tytuły kafelków, nie tematy sekcji.

**Defekt 3: te same stringi renderują się dwa razy.**
`PromoUslugi` (linie 93 do 94) i `Oferta` (linie 200 do 203) renderują dokładnie
`u.h1` i `u.metaDescription` dla `chatboty`, `voiceboty` i `audyt-ai`. Czyli sześć
identycznych bloków tekstu na jednej stronie. Do tego `u.metaDescription` to tekst
pisany pod wynik wyszukiwania („Sprawdź, ile kosztuje.”), a nie pod kafelek na stronie.

---

## 2. DOCELOWA KOLEJNOŚĆ SEKCJI HOME

Zasada wynikająca wprost z danych GSC: **strona główna nie walczy o żadną frazę
komercyjną.** Ma 60 wyświetleń, pozycję 5,0 i 11 z 19 kliknięć, wszystko na markę.
Frazy pieniądza obsługują 4 strony usług (336 + 323 + 166 + 66 = 891 wyświetleń
z 1111 w całym serwisie, czyli 80%). Wniosek: **zadaniem home jest przepchnąć
klienta i autorytet linkowy na te 4 strony**, a nie konkurować z nimi.
Raport 2026-08-07 punkt 4 potwierdza to wprost: 154 wyświetlenia frazy
„chatbot ai dla firm” należą w całości do `/uslugi/chatboty`, home nie wyświetla się
na nią ani razu.

| # | Sekcja | Co robi w opowieści | Dane, które to uzasadniają |
|---|---|---|---|
| 1 | Hero | w 5 sekund: kim jesteśmy, co robimy, jeden przycisk | home = fraza markowa, pozycja 1,0 przy „simple fast ai”. Hero ma trzymać markę i puścić dalej |
| 2 | Co robimy (dawne `PromoUslugi` + H2) | rozdroże do 4 stron pieniądza | te 4 strony robią 80% wyświetleń serwisu |
| 3 | Problem + branże (dawne `Problem` + `BranzeDemo`) | ból językiem klienta, cztery branże jako kafelki z linkami | long-tail branżowy, dziś bez ani jednego linku |
| 4 | Czym AI Agent różni się od chatbota (dawne `Rozwiazanie` bez demo) | kapsuły AEO + tabela, treść cytowalna | GSC: „chatbot dla firmy” 34 wyśw. poz. 12,0; tabela to najlepiej cytowany format |
| 5 | Jak to działa (3 kroki) | zdejmuje lęk przed wdrożeniem | bez zmian |
| 6 | Ile to kosztuje (dawna `Oferta`) | cena + katalog 10 usług | GSC: „voicebot cena” 17 wyśw., „ile kosztuje stworzenie asystenta ai” 21 wyśw. poz. 7,8 |
| 7 | Dowód: wdrożenia i opinie (`Dowod` + `DowodSpoleczny`) | 3 kafelki realizacji + 6 opinii | 8 case’ów w rejestrze, dziś 0 linków z home |
| 8 | Ryzyko i bezpieczeństwo (`Bezpieczenstwo` + `GwarancjaEfektu`) | RODO, AI Act, kto bierze ryzyko | lęk #1, kapsuła AEO „czy AI jest bezpieczne” |
| 9 | Policz sam (`NarzedziaTeaser` + 3 poradniki) | narzędzia i wiedza jako wejście top-of-funnel | `/narzedzia` poz. 4,2 przy 17 wyśw., `/poradniki/ile-kosztuje...` poz. 8,0 |
| 10 | Zobacz, jak rozmawia Agent (`ZyweDemo` + `AgentDemo`) | dowód kompetencji, oba dema razem | kotwica `#demo` z hero |
| 11 | FAQ | 9 pytań, FAQPage, linki w odpowiedziach | schema FAQPage już działa |
| 12 | Finalne CTA + formularz | jedyny cel konwersji | bez zmian |

Zmiana wobec dziś: z 16 sekcji na 12. Nic z treści nie ginie, cztery sekcje wchodzą
do sąsiadów (`PasekZaufania` do hero, `BranzeDemo` do `Problem`, `GwarancjaEfektu`
do `Bezpieczenstwo`, `DowodSpoleczny` do `Dowod`).

**DECYZJA PAWŁA (2 pozycje):**
- czy `BranzeDemo` traci okno terminala z maszyną pisania (drugi typewriter na stronie),
  czy zostaje jako element wewnątrz sekcji Problem. Zapis w pamięci projektu mówi, że
  maszyna pisania to element zamówiony przez Pawła, więc nie ruszamy jej bez zgody;
- czy `PasekZaufania` znika (chipy hero mówią to samo co jego tytuły), czy zostaje
  jako czwarty i piąty punkt, które nie są dziś w hero.

---

## 3. SPECYFIKACJA KAŻDEJ SEKCJI: H2, KAFELKI, LINKI

Zasada Pawła: tekst w 2 albo 3 kafelkach obok siebie, nie ściana. Każdy kafelek
prowadzi do istniejącej podstrony. Poniżej wszystkie cele są sprawdzone w repo
(rejestry `lib/uslugi`, `lib/realizacje`, `lib/narzedzia`, `lib/poradniki`), więc
zero martwych linków.

### Sekcja 1: Hero (`components/sections/Hero.tsx`)

| Element | Ile | Treść / cel |
|---|---|---|
| Overline mono | 1 | `POSITIONING.subClaim`, bez zmian |
| H1 | 1 | patrz punkt 6, DECYZJA PAWŁA |
| Kapsuła answer-first | 1 akapit (48 słów) | ZOSTAJE jako jeden ciągły akapit. To jest kapsuła do cytowania przez modele, dzielenie jej na kafelki zabija cytowalność |
| Chipy zaufania | 3 | bez zmian, przejmują rolę `PasekZaufania` |
| CTA | 1 primary + 1 ghost | primary „Umów bezpłatną diagnozę” do `#diagnoza`, ghost „Zobacz, jak rozmawia nasz Agent” do `#demo`. Ghost „Zobacz, jak liczę oszczędność” schodzi (dubluje intencję primary) |
| Liczniki | 3 | bez zmian (`HeroLiczniki`, liczy rejestry) |
| Blok persony | 1 | ZOSTAJE tylko jeśli `BranzeDemo` znika, inaczej duplikat |
| NOWE: pasek 3 linków tekstowych pod licznikami | 3 | anchory `chatbot AI dla firm`, `bot telefoniczny`, `audyt AI` do trzech stron pieniądza |

### Sekcja 2: Co robimy

- **H2 (nowy, dziś nie istnieje):** „Co robimy dla firm: chatboty, voiceboty i automatyzacje”
- **Kafelki: 4** (układ bez zmian: 1 pełny + 2 połówki + 1 cienki pełny)

| Kafelek | Tytuł (H3, nie H2) | Opis kafelka | Link |
|---|---|---|---|
| 1 pełny | Chatbot AI dla firm, który odpowiada klientom 24/7 | max 25 słów, NOWY tekst, nie `metaDescription` | `/uslugi/chatboty` |
| 2 połówka | Voicebot dla firm, czyli bot telefoniczny | max 25 słów | `/uslugi/voiceboty` |
| 3 połówka | Audyt AI firmy: mapa wąskich gardeł | max 25 słów | `/uslugi/audyt-ai` |
| 4 cienki pełny | Architekci Wartości AI: płacisz za efekt | max 25 słów | `/uslugi/architekci-wartosci-ai` |

Zmiana techniczna: tytuły kart z `<h2>` na `<h3>` (`PromoUslugi.tsx` linie 93 i 138),
bo H2 należy do sekcji. Opisy kart przestają być `u.metaDescription` (tekst pod SERP)
i dostają własne pole. Treść pisze zespół 4.

### Sekcja 3: Problem i branże

- **H2:** „Ile czasu w tygodniu zjada Ci robota, którą mógłby robić ktoś inny?” (bez zmian)
- **Lead:** bez zmian (kapsuła)
- **Walec cytatów:** bez zmian (5 bólów)
- **NOWE kafelki: 4 branże** (treść 1:1 z `BRANZE` w `BranzeDemo.tsx`)

| Kafelek | Tekst 1:1 z rejestru | Link |
|---|---|---|
| dla biura | umawiam spotkania i pilnuję kalendarza | `/uslugi/voiceboty` |
| dla salonu | odbieram telefon, gdy strzyżesz klienta | `/uslugi/voiceboty` |
| dla budowlanki | składam wyceny z maila | `/uslugi/dokumenty-faktury` |
| dla e-commerce | odpowiadam na pytania o zamówienia 24/7 | `/uslugi/chatboty` |

- **CTA:** 1 secondary, etykieta ujednolicona (patrz punkt 3.1)

### Sekcja 4: Czym AI Agent różni się od chatbota

- **H2 sekcji (nowy):** „Czym AI Agent różni się od zwykłego chatbota?”
- **Kafelki: 2** (kapsuły AEO, dziś z `<h2>` na `<h3>`)
- **Tabela porównawcza:** 6 wierszy, bez zmian, to nasz najlepiej cytowalny blok
- **4 punkty „co potrafi Agent”:** każdy dostaje link (dziś zero)

| Punkt | Link |
|---|---|
| Odbiera telefon, kiedy Ty nie możesz | `/uslugi/voiceboty` |
| Odpisuje klientom w minuty, o każdej porze | `/uslugi/chatboty` |
| Przepisuje dane za Ciebie | `/uslugi/automatyzacje` |
| Pilnuje, żeby nic nie wypadło | `/uslugi/opieka-ai` |

- **`AgentDemo` przenosi się do sekcji 10.** Powód: sekcja ma dziś 6 bloków pod jednym
  nagłówkiem, a demo powtarza to, co robi `ZyweDemo` niżej.
- **CTA:** dziś „Sprawdź, którego Agenta potrzebujesz” do `#diagnoza`. To jest CTA
  wymienione w skardze Pawła numer 1. Rekomendacja: zostaje etykieta, ale przycisk
  ląduje w jednym rzędzie z podpisem, tak samo jak wszystkie inne (punkt 3.1).

### Sekcja 5: Jak to działa

Bez zmian strukturalnych. 3 kroki, 1 CTA. Dołożyć 1 link: krok 1 „Diagnoza (bezpłatna)”
linkuje do `/uslugi/audyt-ai` anchorem „audyt AI”.

### Sekcja 6: Ile to kosztuje

- **H2:** „Ile kosztuje wdrożenie AI Agenta dla firmy?” (bez zmian, to money query)
- **Karty cennika: 3.** Problem do rozwiązania: dziś wszystkie trzy mają
  `price: 'wycena na diagnozie'` i `saves: 'liczymy na diagnozie'`, czyli trzy karty
  z tym samym tekstem w trzech polach. Tymczasem `public/wiedza-agenta.txt` i
  `STATUS.md` (linia 34) podają realne ceny publiczne: audyt 1490 zł, ryczałty opieki
  3000, 5500 i 10000 zł, stawka 350 zł za godzinę, a `lib/uslugi/opieka-ai.ts` ma
  „od 3000 zł” w opisie i `lib/uslugi/audyt-ai.ts` ma „1490 zł”. **DECYZJA PAWŁA:**
  czy te liczby wchodzą na karty cennika home.
- **Katalog 10 usług:** zostaje, to najgęstszy blok linków na stronie
- **CTA:** 1 primary (dziś 2)

### Sekcja 7: Dowód

- **H2:** „Komu już postawiliśmy AI Agentów i co się u nich zmieniło?”
- **NOWE kafelki: 3 realizacje** z rejestru `lib/realizacje` (dziś home nie linkuje
  do żadnej z 8 realizacji)

| Kafelek | Tytuł 1:1 z rejestru | Liczba z rejestru | Link |
|---|---|---|---|
| 1 | Auto-email dla biura obsługi klienta | 75% maili wymaga tylko drobnej korekty | `/realizacje/auto-email-bok` |
| 2 | Błyskawiczny generator leadów | 1000 rekordów w 40 minut | `/realizacje/lead-generator` |
| 3 | Chatbot edukacyjny do kursów online | brak liczby, opis funkcji | `/realizacje/chatbot-edukacyjny-kursy` |

- **Opinie:** 6 realnych, bez zmian
- **Blok founderów:** bez zmian, link `/o-nas`
- **Link do huba:** „Zobacz wszystkie wdrożenia” do `/realizacje`
- **CTA:** 1 primary

### Sekcja 8: Ryzyko i bezpieczeństwo

- **H2:** „Czy AI Agent dla firmy jest bezpieczny i kto bierze ryzyko?”
- **Kapsuła answer-first:** złożona z dwóch dzisiejszych kapsuł (`Bezpieczenstwo`
  + `GwarancjaEfektu`), treść pisze zespół 4
- **Kafelki: 4 + 3** (4 punkty bezpieczeństwa 1:1 + 3 filary gwarancji 1:1)
- **CTA:** 1 primary (dziś dwie sekcje mają po jednym)

### Sekcja 9: Policz sam

- **H2 (nowy, dziś jest samo słowo „Narzędzia”):** „Policz sam, zanim zamówisz”
- **Kafelki: 5 narzędzi** (bez zmian, `NARZEDZIA` z rejestru)
- **NOWE: 3 kafelki poradników** z `lib/poradniki`

| Kafelek | Tytuł | Link |
|---|---|---|
| 1 | Ile kosztuje chatbot dla firmy w 2026? | `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` |
| 2 | Ile kosztuje wdrożenie AI agenta dla firmy | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` |
| 3 | AI w biurze rachunkowym: 12 procesów | `/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac` |

- **Link do huba:** „Cała wiedza” do `/wiedza`

### Sekcja 10: Zobacz, jak rozmawia Agent

- **H2:** bez zmian
- **Zawartość:** `ChatDemo` + `VoiceAura` (dziś) + `AgentDemo` (przeniesione z sekcji 4)
- **CTA:** 1 primary

### Sekcja 11: FAQ

- **H2:** bez zmian, 9 pytań, FAQPage bez zmian
- **NOWE: linki w 4 odpowiedziach** (dziś zero linków w FAQ). Uwaga techniczna:
  `FAQ_ITEMS` to płaskie stringi, które idą 1:1 do JSON-LD. Linku nie wolno wkleić
  do stringa, bo trafi do schema. Rozwiązanie: pod każdą odpowiedzią osobne pole
  `link?: { etykieta, href }` renderowane poza tekstem odpowiedzi.

| Pytanie | Anchor | Cel |
|---|---|---|
| Ile to kosztuje? | Ile kosztuje wdrożenie AI agenta dla firmy | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` |
| Czym AI Agent różni się od chatbota? | chatbot AI dla firm | `/uslugi/chatboty` |
| Jak sprawić, żeby ChatGPT polecały moją firmę? | pozycjonowanie pod AI | `/uslugi/optymalizacja` |
| Czy moje dane będą bezpieczne? | audyt AI | `/uslugi/audyt-ai` |

### Sekcja 12: Finalne CTA

Bez zmian. Jedyny formularz, `id="diagnoza"`.

### 3.1 JEDEN SYSTEM CTA (rozwiązanie skargi „CTA rozpierdolone”)

| Poziom | Etykieta | Wariant | Cel | Gdzie |
|---|---|---|---|---|
| Główne | Umów bezpłatną diagnozę | primary | `#diagnoza` | hero, sekcje 5, 6, 7, 8, 10, 12 |
| Drugorzędne | Zobacz, jak rozmawia nasz Agent | ghost | `#demo` | hero |
| W sekcji | Sprawdź, którego Agenta potrzebujesz | secondary | `#diagnoza` | sekcja 4 |
| W kafelku | tytuł kafelka jest linkiem, strzałka jest dekoracją | brak przycisku | podstrona | wszystkie kafelki |
| Do huba | Zobacz wszystkie wdrożenia / Cała wiedza | link | `/realizacje`, `/wiedza` | sekcje 7 i 9 |

Skutek: z 7 etykiet robi się 5, z 3 celów robi się 2 (`#diagnoza` i `#demo`),
liczba przycisków primary spada z 9 do 7.
Wymaga zmiany `HOME_CTA.href` w `lib/site.ts` z `/kontakt` na `#diagnoza`.
Uwaga na naczynia połączone: `HOME_CTA.href` używa 9 komponentów sekcji, a
`lib/uslugi/types.ts` opisuje domyślny `cta.href` jako `#diagnoza`, natomiast
`components/uslugi/ServiceCTA.tsx` linia 27 ma zaszyty `/kontakt`. Na podstronach
usług nie ma kotwicy `#diagnoza`, więc **tam CTA musi zostać na `/kontakt`**.
To nie jest jedna zmiana globalna.

---

## 4. MAPA LINKOWANIA WEWNĘTRZNEGO

### 4.1 Stan dzisiaj (policzony z repo, zgadza się z raportem GSC punkt 5.3)

Liczymy tak jak raport: unikalne **strony źródłowe**, które linkują z sekcji `<main>`.

| Strona docelowa | Linki dziś | Skąd konkretnie |
|---|---|---|
| `/uslugi/chatboty` | 7 | home, `/uslugi`, 3 poradniki, 2 realizacje |
| `/uslugi/automatyzacje` | 7 | home, `/uslugi`, 1 poradnik, 4 realizacje, `/narzedzia` |
| `/uslugi/audyt-ai` | 5 | home, `/uslugi`, 3 poradniki |
| `/uslugi/voiceboty` | 3 | home, `/uslugi`, 1 poradnik |
| `/uslugi/dokumenty-faktury` | 3 | home, `/uslugi`, 1 poradnik |
| `/produkty` | 0 | tylko menu |

**Najważniejsze znalezisko strukturalne:** `app/uslugi/[usluga]/page.tsx` renderuje
8 sekcji i **ani jednej sekcji z linkami wychodzącymi**. Dziesięć stron usług, które
robią 80% ruchu serwisu, nie linkują nigdzie poza breadcrumbem i przyciskiem CTA.
Dla porównania `lib/poradniki/types.ts` ma pola `powiazaneUslugi` i `powiazaneNarzedzia`,
i to działa (`components/poradniki/LinkiKrzyzowe.tsx`). Tego samego mechanizmu brakuje
w usługach, blogu i materiałach.

### 4.2 Co trzeba dobudować (5 zmian mechanizmu, nie treści)

| # | Plik | Zmiana | Odblokowuje |
|---|---|---|---|
| M1 | `lib/uslugi/types.ts` | dodać `powiazane?: LinkKrzyzowy[]` (typ przenieść z `lib/poradniki/types.ts` do wspólnego miejsca) | 40 linków z 10 stron |
| M2 | `app/uslugi/[usluga]/page.tsx` | dodać sekcję (9) „Co jeszcze warto zobaczyć” pod CTA, render przez istniejący `LinkiKrzyzowe` | jw. |
| M3 | `lib/blog/types.ts` + `app/blog/[slug]/page.tsx` | dodać `powiazaneUslugi?: LinkKrzyzowy[]` i render | 15 linków z 5 wpisów |
| M4 | `lib/materialy/types.ts` + `app/materialy/[slug]/page.tsx` | jw. | 12 linków z 6 materiałów |
| M5 | `lib/realizacje/types.ts` + `app/realizacje/[slug]/page.tsx` | dodać `powiazaneDodatkowe?: LinkKrzyzowy[]` obok istniejącej `PowiazanaUsluga` | 8 linków z 8 case’ów |

### 4.3 Tabela linków: strona źródłowa, anchor, strona docelowa

Anchory pochodzą z realnych fraz GSC (kolumna „wyśw.” to wyświetlenia z raportu
2026-08-07). Zero anchorów typu „zobacz więcej”.

**A. Ze stron usług (pole `powiazane`, 40 linków, 10 nowych stron źródłowych)**

| # | Strona źródłowa | Anchor | Wyśw. frazy | Strona docelowa |
|---|---|---|---|---|
| 1 | `/uslugi/chatboty` | bot telefoniczny | 32 | `/uslugi/voiceboty` |
| 2 | `/uslugi/chatboty` | audyt AI | 15 | `/uslugi/audyt-ai` |
| 3 | `/uslugi/chatboty` | ile kosztuje chatbot dla firmy | 33 (raport 08-06) | `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` |
| 4 | `/uslugi/chatboty` | chatbot edukacyjny do kursów online | rejestr | `/realizacje/chatbot-edukacyjny-kursy` |
| 5 | `/uslugi/voiceboty` | chatbot AI dla firm | 154 | `/uslugi/chatboty` |
| 6 | `/uslugi/voiceboty` | audyt AI: mapa wąskich gardeł | 134 | `/uslugi/audyt-ai` |
| 7 | `/uslugi/voiceboty` | ile kosztuje wdrożenie AI agenta dla firmy | 21 | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` |
| 8 | `/uslugi/voiceboty` | jak voicebot odbiera telefony | rejestr | `/blog/jak-voicebot-odbiera-telefony` |
| 9 | `/uslugi/audyt-ai` | chatbot AI dla firm | 154 | `/uslugi/chatboty` |
| 10 | `/uslugi/audyt-ai` | voicebot dla firm | 7 | `/uslugi/voiceboty` |
| 11 | `/uslugi/audyt-ai` | automatyzacja AI dla firm | 7 | `/uslugi/automatyzacje` |
| 12 | `/uslugi/audyt-ai` | kalkulator oszczędności | rejestr | `/narzedzia#kalkulator-oszczednosci` |
| 13 | `/uslugi/automatyzacje` | automatyzacja faktur | 15 | `/uslugi/dokumenty-faktury` |
| 14 | `/uslugi/automatyzacje` | audyt AI: mapa wąskich gardeł | 134 | `/uslugi/audyt-ai` |
| 15 | `/uslugi/automatyzacje` | bot telefoniczny | 32 | `/uslugi/voiceboty` |
| 16 | `/uslugi/automatyzacje` | auto-email dla biura obsługi klienta | rejestr | `/realizacje/auto-email-bok` |
| 17 | `/uslugi/dokumenty-faktury` | automatyzacja AI dla firm | 7 | `/uslugi/automatyzacje` |
| 18 | `/uslugi/dokumenty-faktury` | audyt AI | 15 | `/uslugi/audyt-ai` |
| 19 | `/uslugi/dokumenty-faktury` | skaner faktur do KSeF | rejestr | `/produkty#skaner-faktur-ksef` |
| 20 | `/uslugi/dokumenty-faktury` | AI w biurze rachunkowym | rejestr | `/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac` |
| 21 | `/uslugi/agent-rekrutacyjny` | chatbot AI dla firm | 154 | `/uslugi/chatboty` |
| 22 | `/uslugi/agent-rekrutacyjny` | voicebot do obsługi klienta | 30 | `/uslugi/voiceboty` |
| 23 | `/uslugi/agent-rekrutacyjny` | audyt AI | 15 | `/uslugi/audyt-ai` |
| 24 | `/uslugi/agent-rekrutacyjny` | produkty AI, które zbudowaliśmy | rejestr | `/produkty` |
| 25 | `/uslugi/opieka-ai` | automatyzacje dla firm | 3 | `/uslugi/automatyzacje` |
| 26 | `/uslugi/opieka-ai` | chatbot dla firmy | 34 | `/uslugi/chatboty` |
| 27 | `/uslugi/opieka-ai` | bot do odbierania telefonów | 6 | `/uslugi/voiceboty` |
| 28 | `/uslugi/opieka-ai` | audyt AI | 15 | `/uslugi/audyt-ai` |
| 29 | `/uslugi/rozwiazania` | produkty AI, które zbudowaliśmy | rejestr | `/produkty` |
| 30 | `/uslugi/rozwiazania` | automatyzacja AI dla firm | 7 | `/uslugi/automatyzacje` |
| 31 | `/uslugi/rozwiazania` | audyt AI: mapa wąskich gardeł | 134 | `/uslugi/audyt-ai` |
| 32 | `/uslugi/rozwiazania` | aplikacja do transkrypcji i analizy rozmów | rejestr | `/realizacje/transkrypcja-rozmow` |
| 33 | `/uslugi/strony-www` | pozycjonowanie pod AI | rejestr | `/uslugi/optymalizacja` |
| 34 | `/uslugi/strony-www` | chatbot na stronę firmową | 22 | `/uslugi/chatboty` |
| 35 | `/uslugi/strony-www` | audyt AI | 15 | `/uslugi/audyt-ai` |
| 36 | `/uslugi/strony-www` | audyt strony pod AI | rejestr | `/narzedzia#audyt-strony-ai` |
| 37 | `/uslugi/optymalizacja` | tworzenie stron WWW pod Google i AI | rejestr | `/uslugi/strony-www` |
| 38 | `/uslugi/optymalizacja` | chatbot AI dla firm | 154 | `/uslugi/chatboty` |
| 39 | `/uslugi/optymalizacja` | audyt AI | 15 | `/uslugi/audyt-ai` |
| 40 | `/uslugi/optymalizacja` | audyt strony pod AI | rejestr | `/narzedzia#audyt-strony-ai` |

**B. Z wpisów bloga (pole `powiazaneUslugi`, 15 linków, 5 nowych stron źródłowych)**

| # | Strona źródłowa | Anchor | Strona docelowa |
|---|---|---|---|
| 41 | `/blog/chatbot-czy-ai-agent-roznice` | chatbot AI dla firm | `/uslugi/chatboty` |
| 42 | `/blog/chatbot-czy-ai-agent-roznice` | bot telefoniczny | `/uslugi/voiceboty` |
| 43 | `/blog/chatbot-czy-ai-agent-roznice` | audyt AI: mapa wąskich gardeł | `/uslugi/audyt-ai` |
| 44 | `/blog/jak-voicebot-odbiera-telefony` | voicebot dla firm | `/uslugi/voiceboty` |
| 45 | `/blog/jak-voicebot-odbiera-telefony` | chatbot AI dla firm | `/uslugi/chatboty` |
| 46 | `/blog/jak-voicebot-odbiera-telefony` | firmowi Agenci AI 24/7 | `/realizacje/agenci-ai-24-7` |
| 47 | `/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026` | audyt AI: mapa wąskich gardeł | `/uslugi/audyt-ai` |
| 48 | `/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026` | chatbot dla firmy | `/uslugi/chatboty` |
| 49 | `/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026` | voicebot cena | `/uslugi/voiceboty` |
| 50 | `/blog/automatyzacja-procesow-ai-od-czego-zaczac` | automatyzacja AI dla firm | `/uslugi/automatyzacje` |
| 51 | `/blog/automatyzacja-procesow-ai-od-czego-zaczac` | automatyzacja faktur | `/uslugi/dokumenty-faktury` |
| 52 | `/blog/automatyzacja-procesow-ai-od-czego-zaczac` | audyt AI | `/uslugi/audyt-ai` |
| 53 | `/blog/ai-act-a-twoja-firma-2026` | voicebot do obsługi klienta | `/uslugi/voiceboty` |
| 54 | `/blog/ai-act-a-twoja-firma-2026` | chatbot AI dla firm | `/uslugi/chatboty` |
| 55 | `/blog/ai-act-a-twoja-firma-2026` | opieka nad automatyzacjami | `/uslugi/opieka-ai` |

**C. Z materiałów (pole `powiazaneUslugi`, 12 linków, 6 nowych stron źródłowych)**

| # | Strona źródłowa | Anchor | Strona docelowa |
|---|---|---|---|
| 56 | `/materialy/checklista-20-procesow-do-automatyzacji-ai` | automatyzacja AI dla firm | `/uslugi/automatyzacje` |
| 57 | `/materialy/checklista-20-procesow-do-automatyzacji-ai` | audyt AI: mapa wąskich gardeł | `/uslugi/audyt-ai` |
| 58 | `/materialy/arkusz-policz-koszt-recznych-zadan` | audyt AI | `/uslugi/audyt-ai` |
| 59 | `/materialy/arkusz-policz-koszt-recznych-zadan` | kalkulator oszczędności | `/narzedzia#kalkulator-oszczednosci` |
| 60 | `/materialy/10-bledow-przy-wdrazaniu-ai-w-firmie` | audyt AI: mapa wąskich gardeł | `/uslugi/audyt-ai` |
| 61 | `/materialy/10-bledow-przy-wdrazaniu-ai-w-firmie` | opieka nad automatyzacjami | `/uslugi/opieka-ai` |
| 62 | `/materialy/50-promptow-ai-dla-wlasciciela-firmy` | chatbot AI dla firm | `/uslugi/chatboty` |
| 63 | `/materialy/50-promptow-ai-dla-wlasciciela-firmy` | pozycjonowanie pod AI | `/uslugi/optymalizacja` |
| 64 | `/materialy/jak-pisac-prompty-ktore-dzialaja` | chatbot na stronę firmową | `/uslugi/chatboty` |
| 65 | `/materialy/jak-pisac-prompty-ktore-dzialaja` | cytowalność w ChatGPT | `/uslugi/optymalizacja` |
| 66 | `/materialy/prompty-branzowe-kancelaria-ecommerce-budowlanka` | chatbot dla firm | `/uslugi/chatboty` |
| 67 | `/materialy/prompty-branzowe-kancelaria-ecommerce-budowlanka` | automatyzacja faktur | `/uslugi/dokumenty-faktury` |

**D. Z realizacji (pole `powiazaneDodatkowe`, 8 linków)**

| # | Strona źródłowa | Anchor | Strona docelowa |
|---|---|---|---|
| 68 | `/realizacje/agenci-ai-24-7` | bot telefoniczny | `/uslugi/voiceboty` |
| 69 | `/realizacje/auto-email-bok` | chatbot AI dla firm | `/uslugi/chatboty` |
| 70 | `/realizacje/auto-podsumowania-spotkan` | centrum dowodzenia głosem | `/produkty#centrum-dowodzenia` |
| 71 | `/realizacje/automat-tresci-social` | strony WWW pod Google i AI | `/uslugi/strony-www` |
| 72 | `/realizacje/automatyczne-raporty` | automatyzacja faktur | `/uslugi/dokumenty-faktury` |
| 73 | `/realizacje/chatbot-edukacyjny-kursy` | voicebot do obsługi klienta | `/uslugi/voiceboty` |
| 74 | `/realizacje/lead-generator` | chatbot AI dla firm | `/uslugi/chatboty` |
| 75 | `/realizacje/transkrypcja-rozmow` | bot telefoniczny | `/uslugi/voiceboty` |

**E. Z poradników (uzupełnienie istniejących pól, 6 linków)**

| # | Strona źródłowa | Anchor | Strona docelowa |
|---|---|---|---|
| 76 | `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` | bot telefoniczny | `/uslugi/voiceboty` |
| 77 | `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` | chatbot edukacyjny do kursów online | `/realizacje/chatbot-edukacyjny-kursy` |
| 78 | `/poradniki/ai-w-biurze-rachunkowym-...` | voicebot do potwierdzania wizyt | `/uslugi/voiceboty` |
| 79 | `/poradniki/ai-w-biurze-rachunkowym-...` | skaner faktur do KSeF | `/produkty#skaner-faktur-ksef` |
| 80 | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-...` | firmowi Agenci AI 24/7 | `/realizacje/agenci-ai-24-7` |
| 81 | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-...` | produkty AI, które zbudowaliśmy | `/produkty` |

**F. Z hubów i home (12 linków)**

| # | Strona źródłowa | Anchor | Strona docelowa |
|---|---|---|---|
| 82 | `/` (hero, nowy pasek) | chatbot AI dla firm | `/uslugi/chatboty` |
| 83 | `/` (hero, nowy pasek) | bot telefoniczny | `/uslugi/voiceboty` |
| 84 | `/` (hero, nowy pasek) | audyt AI | `/uslugi/audyt-ai` |
| 85 | `/` (sekcja 7) | auto-email dla biura obsługi klienta | `/realizacje/auto-email-bok` |
| 86 | `/` (sekcja 7) | błyskawiczny generator leadów | `/realizacje/lead-generator` |
| 87 | `/` (sekcja 7) | chatbot edukacyjny do kursów online | `/realizacje/chatbot-edukacyjny-kursy` |
| 88 | `/` (sekcja 9) | 3 poradniki + Cała wiedza | `/poradniki/*`, `/wiedza` |
| 89 | `/produkty` | automatyzacja faktur | `/uslugi/dokumenty-faktury` |
| 90 | `/realizacje` (hub) | chatbot AI dla firm | `/uslugi/chatboty` |
| 91 | `/realizacje` (hub) | bot telefoniczny | `/uslugi/voiceboty` |
| 92 | `/o-nas` | produkty AI, które zbudowaliśmy | `/produkty` |
| 93 | `/wiedza` | audyt AI: mapa wąskich gardeł | `/uslugi/audyt-ai` |

**Razem: 93 nowe linki, 25 nowych stron źródłowych.** Brief wymagał minimum 40.

### 4.4 Efekt liczbowy planu

| Strona docelowa | Linki dziś | Nowe unikalne strony źródłowe | Po wdrożeniu | Powód priorytetu |
|---|---|---|---|---|
| `/uslugi/voiceboty` | 3 | 16 | 19 | 336 wyświetleń, najgorsza pozycja 30,3 |
| `/uslugi/chatboty` | 7 | 18 | 25 | 323 wyświetlenia, poz. 14,4 w ostatnim tygodniu |
| `/uslugi/audyt-ai` | 5 | 17 | 22 | 134 wyświetlenia frazy z zerowym CTR |
| `/uslugi/automatyzacje` | 7 | 6 | 13 | poz. 9,6 dla „automatyzacja ai dla firm” |
| `/uslugi/dokumenty-faktury` | 3 | 5 | 8 | 66 wyświetleń, poz. 21,8 |
| `/produkty` | 0 | 7 | 7 | poz. 2,4 i zero kliknięć, bo nikt jej nie widzi |
| 21 stron z jednym linkiem | 1 | 1 do 3 | 2 do 4 | sieroty wolniej się indeksują |

---

## 5. TYTUŁY I OPISY: WSZYSTKIE PODSTRONY

Zasady: `app/layout.tsx` dokłada sufiks `· SimpleFast.ai` = **16 znaków**, więc
pole `metaTitle` w rejestrze może mieć **maksymalnie 44 znaki** (44 + 16 = 60).
Strona główna nie używa sufiksu (segment dostaje `default`, nie `template`), więc
tam limit to 60 znaków w polu. Opis: 140 do 155 znaków. Zero em-dash.
Wszystkie długości poniżej policzone skryptem, nie na oko.

### 5.1 Cztery strony z raportu SEO (punkty 3.1 do 3.5), przeniesione 1:1

| Strona | Pole | Obecnie | Propozycja | Znaki teraz -> po |
|---|---|---|---|---|
| `/` (`app/page.tsx`) | title | SimpleFast.ai: budujemy AI Agentów dla firm | SimpleFast.ai: AI Agenci, chatboty i voiceboty dla firm | 43 -> 55 |
| `/` | description | (155 zn.) | Budujemy AI Agentów dla firm: voicebot odbiera telefony, chatbot AI odpisuje klientom, automatyzacja pilnuje faktur. Dane w UE, płacisz za efekt. | 155 -> 145 |
| `/uslugi/chatboty` (`lib/uslugi/chatboty.ts`) | metaTitle | Chatbot AI dla firmy: wdrożenie 24/7 | Chatbot AI dla firm: na stronę i 24/7 | 52 -> 53 z sufiksem |
| `/uslugi/chatboty` | metaDescription | (144) | Chatbot AI dla firm: odpowiada na stronie i w Messengerze 24/7, zbiera leady, uczy się na Twojej wiedzy. Wdrożenie w dni. Sprawdź, ile kosztuje. | 144 -> 144 |
| `/uslugi/chatboty` | h1 | Chatbot AI dla firmy | Chatbot AI dla firm, który odpowiada klientom 24/7 | 20 -> 50 |
| `/uslugi/voiceboty` (`lib/uslugi/voiceboty.ts`) | metaTitle | Voicebot dla firmy, który odbiera telefon 24/7 | Voicebot i bot telefoniczny dla firm 24/7 | 62 -> 57 z sufiksem |
| `/uslugi/voiceboty` | metaDescription | (149) | ~~Voicebot, czyli bot telefoniczny dla firm: odbiera telefon 24/7, umawia i potwierdza wizyty, oddzwania do nieodebranych. Sprawdź, ile kosztuje.~~ **NIEAKTUALNE (D11, 2026-08-07): bot nie dzwoni sam i nie potwierdza wizyt telefonicznie. Wdrożone: „Voicebot, czyli bot telefoniczny dla firm: odbiera telefon 24/7, rozmawia po polsku i umawia wizyty. Żaden telefon nie zostaje bez odpowiedzi."** | 149 -> 142 |
| `/uslugi/voiceboty` | h1 | Voicebot dla firmy, który odbiera telefon za Ciebie | Voicebot dla firm, czyli bot telefoniczny, który odbiera za Ciebie | 51 -> 66 |
| `/uslugi/audyt-ai` (`lib/uslugi/audyt-ai.ts`) | metaTitle | Audyt AI firmy: mapa oszczędności czasu | Audyt AI firmy: mapa wąskich gardeł | 55 -> 51 z sufiksem |
| `/uslugi/audyt-ai` | metaDescription | (153) | Audyt AI firmy za 1490 zł: mapa wąskich gardeł i dźwigni szybkiego zwrotu. Dostajesz Action Plan, a cenę odliczamy od wdrożenia. Zacznij od diagnozy. | 153 -> 149 |
| `/uslugi/audyt-ai` | h1 | Audyt AI firmy: mapa oszczędności czasu | Audyt AI firmy: mapa wąskich gardeł i oszczędności czasu | 39 -> 56 |
| `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` | metaDescription | (147) | Ile kosztuje wdrożenie AI agenta, czyli asystenta AI dla firmy, kto to robi w Polsce, od czego zależy koszt i jak policzyć zwrot przed zamówieniem. | 147 -> 147 |

Uwaga do opisu audytu: wersja z raportu miała 133 znaki, czyli poniżej progu 140.
Wyżej jest dopełniona zdaniem „Zacznij od diagnozy.” do 149 znaków. Treść bez zmian.

### 5.2 Szesnaście tytułów powyżej 65 znaków (pełna lista z raportu punkt 5.1)

| # | Strona | Plik | Teraz | Propozycja (pole `metaTitle`) | Po |
|---|---|---|---|---|---|
| 1 | `/ai-radar` | `app/ai-radar/page.tsx` | 78 | AI Radar: newsy AI z filtrem dla firm | 53 |
| 2 | `/wiedza` | `app/wiedza/page.tsx` | 74 | Centrum Wiedzy AI: poradniki i case studies | 59 |
| 3 | `/uslugi/rozwiazania` | `lib/uslugi/rozwiazania.ts` | 73 | Aplikacje i wtyczki AI na zamówienie | 52 |
| 4 | `/uslugi/architekci-wartosci-ai` | `app/uslugi/architekci-wartosci-ai/page.tsx` | 72 | Architekci Wartości AI: płacisz za efekt | 56 |
| 5 | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` | `lib/poradniki/poradniki/...` | 72 | Ile kosztuje wdrożenie AI agenta dla firmy | 58 |
| 6 | `/materialy/10-bledow-przy-wdrazaniu-ai-w-firmie` | `lib/materialy/magnety/...` | 72 | 10 błędów przy wdrażaniu AI w firmie | 52 |
| 7 | `/materialy/arkusz-policz-koszt-recznych-zadan` | `lib/materialy/magnety/...` | 72 | Arkusz: ile kosztują Cię ręczne zadania | 55 |
| 8 | `/uslugi/optymalizacja` | `lib/uslugi/optymalizacja.ts` | 71 | Pozycjonowanie pod AI: ChatGPT i Perplexity | 59 |
| 9 | `/materialy/prompty-branzowe-kancelaria-ecommerce-budowlanka` | `lib/materialy/magnety/...` | 71 | Prompty branżowe AI: kancelaria, e-commerce | 59 |
| 10 | `/poradniki` | `app/poradniki/page.tsx` | 69 | Poradniki AI dla firm: koszty i wdrożenie | 57 |
| 11 | `/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac` | `lib/poradniki/poradniki/...` | 69 | AI w biurze rachunkowym: 12 procesów | 52 |
| 12 | `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` | `lib/poradniki/poradniki/...` | 69 | Ile kosztuje chatbot dla firmy w 2026? | 54 |
| 13 | `/materialy/50-promptow-ai-dla-wlasciciela-firmy` | `lib/materialy/magnety/...` | 69 | 50 promptów AI dla właściciela firmy | 52 |
| 14 | `/materialy/checklista-20-procesow-do-automatyzacji-ai` | `lib/materialy/magnety/...` | 68 | Checklista: 20 procesów do automatyzacji | 56 |
| 15 | `/produkty` | `app/produkty/page.tsx` | 67 | Produkty AI dla firm: co zbudowaliśmy | 53 |
| 16 | `/materialy` | `app/materialy/page.tsx` | 66 | Darmowe materiały AI dla firm: prompty | 54 |

Dwa tytuły na granicy, warto ściąć przy okazji:

| Strona | Teraz | Propozycja | Po |
|---|---|---|---|
| `/uslugi` | 65 | Usługi AI dla firm: chatboty i voiceboty | 56 |
| `/materialy/jak-pisac-prompty-ktore-dzialaja` | 65 | Jak pisać prompty, które działają | 49 |
| `/o-nas` | 63 | O nas: dwóch founderów SimpleFast.ai | 52 |

### 5.3 Dziesięć opisów powyżej 160 znaków (pełna lista z raportu punkt 5.2)

| # | Strona | Teraz | Propozycja | Po |
|---|---|---|---|---|
| 1 | `/produkty` | 191 | Cztery własne produkty AI: skaner faktur do KSeF, apka coachingowa, obecność i składki zespołu, centrum dowodzenia głosem. Plus katalog klocków AI. | 147 |
| 2 | `/polityka-prywatnosci` | 184 | Polityka prywatności SimpleFast.ai: kto administruje danymi, po co i na jakiej podstawie je przetwarzamy, komu je powierzamy i jakie masz prawa (RODO). | 151 |
| 3 | `/uslugi/architekci-wartosci-ai` | 180 | Wdrożenie AI rozliczane za efekt, nie za godziny. Sprawdzamy, gdzie tracisz pieniądze, robimy jeden proces na próbę, Ty decydujesz. Diagnoza za 0 zł. | 149 |
| 4 | `/uslugi` | 175 | Usługi AI dla firm: chatbot AI na stronę 24/7, voicebot i bot telefoniczny, automatyzacja faktur, audyt AI. Zacznij od jednej rzeczy, nie od wszystkiego. | 153 |
| 5 | `/kontakt` | 174 | Umów bezpłatną diagnozę AI: 30 minut i konkretna lista tego, co da się u Ciebie zautomatyzować. Napisz na e-mail, zadzwoń albo wypełnij formularz. | 146 |
| 6 | `/ai-radar` | 173 | AI Radar: newsy ze świata AI przefiltrowane przez jedno pytanie, co to znaczy dla Twojej firmy. Co się stało, dlaczego ważne i co możesz zrobić. | 144 |
| 7 | `/narzedzia` | 171 | Darmowe narzędzia AI dla firm: kalkulator oszczędności z automatyzacji, test gotowości na AI i audyt strony pod ChatGPT. Liczysz sam, bez maila. | 144 |
| 8 | `/materialy` | 169 | Darmowe materiały AI dla firm: gotowe prompty, checklisty procesów do automatyzacji i arkusz kosztów. Czytasz całość na stronie albo bierzesz w PDF. | 148 |
| 9 | `/poradniki` | 166 | Poradniki AI dla firm: ile kosztuje chatbot i AI agent, które procesy zautomatyzować w biurze rachunkowym i jak policzyć zwrot. Z liczbami, bez żargonu. | 152 |
| 10 | `/wiedza` | 161 | Centrum Wiedzy AI dla firm: poradniki krok po kroku, newsy AI z filtrem dla MŚP i case studies z liczbami. Jedno miejsce na odpowiedzi o AI. | 140 |

### 5.4 Pozostałe strony: sprawdzone, w normie, nie ruszamy

Policzone wszystkie 46 adresów z sitemapy. Poza wymienionymi wyżej, w normie są:

- **Usługi (5):** `/uslugi/automatyzacje` (50), `/uslugi/dokumenty-faktury` (58),
  `/uslugi/opieka-ai` (51), `/uslugi/strony-www` (51), `/uslugi/agent-rekrutacyjny` (63).
  Opisy 144 do 155 znaków, wszystkie w normie.
- **Blog (5 wpisów):** tytuły 56 do 64 z sufiksem, opisy 145 do 152. Bez zmian.
- **Realizacje (8):** tytuły 45 do 63, opisy 145 do 154. Bez zmian.
- **Huby:** `/blog` (57), `/narzedzia` (45), `/realizacje` (49), `/kontakt` (51).
- **`/ai-radar/[slug]` (2 wpisy):** to szablony z `noindex`, nie ma ich w sitemapie,
  nie ruszamy.

Rekomendacja procesowa: dopisać do `lib/uslugi/types.ts`, `lib/blog/types.ts`,
`lib/poradniki/types.ts` i `lib/materialy/types.ts` komentarz z twardym limitem
44 znaków dla `metaTitle`, żeby kolejne wpisy nie wracały do stanu z dziś.

---

## 6. H1 STRONY GŁÓWNEJ (DECYZJA PAWŁA)

Dziś: `POSITIONING.claim` z `lib/site.ts` linia 120, renderowany przez maszynę
pisania w `components/sections/Hero.tsx` linia 81: **„Budujemy AI Agentów, nie
chatboty.”** (34 znaki).

**Rekomendacja: wariant A, zostaw bez zmian.**

Powód liczbowy: strona główna ma 60 wyświetleń i 11 kliknięć, wszystkie na frazę
markową (pozycja 1,0). Nie traci żadnej frazy komercyjnej, bo wszystkie money queries
obsługują strony usług i robią to poprawnie (raport punkt 1.2: brak kanibalizacji,
sprawdzone wymiarem zapytanie plus strona). Słowo „firm” jest już w tytule i w opisie
home, czyli w dwóch miejscach, które Google faktycznie pokazuje w wynikach.
Do tego pamięć projektu mówi wprost, że maszyna pisania H1 jest elementem LCP na
mobile, a H1 to sygnatura zamówiona przez Pawła.

| Wariant | H1 | Znaki | Za | Ryzyko |
|---|---|---|---|---|
| **A (rekomendacja)** | Budujemy AI Agentów, nie chatboty. | 34 | sygnatura marki, kategoria „AI Agent” jako różnicownik, zero ryzyka kanibalizacji, LCP bez zmian | H1 nie zawiera frazy „dla firm” |
| B | Budujemy AI Agentów dla firm, nie chatboty. | 43 | fraza „dla firm” w najmocniejszym nagłówku, ton marki bez zmian | H1 rośnie o 9 znaków, czyli maszyna pisania pisze dłużej, a LCP mobile to dziś nasz sufit (pamięć projektu: PSI mobile ~73 z LCP 7,5 s bierze się z tej animacji). Zysk SEO teoretyczny, bo home i tak nie walczy o tę frazę |
| C | AI Agenci dla firm. Nie chatboty. | 33 | krócej niż dziś, fraza w H1, LCP bez zmian albo lepiej | traci czasownik „budujemy”, czyli kawałek tonu marki. Brzmi jak slogan reklamowy, nie jak zdanie właściciela |

Gdyby Paweł chciał frazę w H1, bezpieczniejszy jest B niż C, bo nie rusza tonu.
Ale to zmiana kosmetyczna dla SEO, nie dźwignia. Dźwignią jest punkt 4 (linkowanie)
i punkt 5.1 (tytuł audytu).

---

## 7. KOLEJNOŚĆ PRAC I KRYTERIA ODBIORU

| Partia | Zakres | Pliki | Kryterium odbioru (jak sprawdzić, że zrobione dobrze) |
|---|---|---|---|
| S1 | Metadane usług i home (punkt 5.1) | `lib/uslugi/chatboty.ts`, `voiceboty.ts`, `audyt-ai.ts`, `app/page.tsx` | `curl` po deployu na 4 adresy, `<title>` do 60 znaków, fraza „mapa wąskich gardeł” w tytule audytu. Sprawdzić w GSC po 14 dniach: CTR audytu ma ruszyć z 0% |
| S2 | 16 tytułów i 10 opisów (punkty 5.2, 5.3) | 16 plików z tabeli | skrypt liczący `metaTitle.length + 16 <= 60` i `metaDescription.length` w przedziale 140 do 155 dla wszystkich 46 adresów, wynik zero naruszeń |
| S3 | Mechanizm linków (punkt 4.2, M1 do M5) | `lib/uslugi/types.ts`, `lib/blog/types.ts`, `lib/materialy/types.ts`, `lib/realizacje/types.ts` + 4 pliki tras | build przechodzi, typy wspólne, `LinkKrzyzowy` w jednym miejscu, nie w czterech kopiach |
| S4 | Treść 93 linków (punkt 4.3) | rejestry treści | skrypt przechodzący po sitemapie i liczący linki w `<main>`: voiceboty ma być 19 lub więcej stron źródłowych, produkty 7 lub więcej, żaden link nie zwraca 404 |
| S5 | Struktura home (punkty 2 i 3) | `app/page.tsx` + `components/sections/*` | na home ma być dokładnie 12 znaczników H2 i zero H2 wewnątrz kart. Ma zniknąć podwójny render `u.h1` dla chatboty, voiceboty i audyt-ai |
| S6 | System CTA (punkt 3.1) | `lib/site.ts`, 9 sekcji, `components/uslugi/ServiceCTA.tsx` | na home ma być 1 cel dla CTA głównych (`#diagnoza`), na podstronach usług `/kontakt`. Klik w każde CTA kończy się na widocznym formularzu |

Zależności: S3 blokuje S4. S1 i S2 są niezależne od wszystkiego. S5 blokuje S6.
S1 i S2 można wykonać od razu, bo dotykają wyłącznie pól metadanych, a nie renderu.

---

## 8. RYZYKA

| Ryzyko | Skąd | Jak temu zapobiec |
|---|---|---|
| Zmiana H1 wydłuża maszynę pisania i psuje LCP mobile | pamięć projektu: „LCP = maszyna pisania”, PSI mobile ~73 przy LCP 7,5 s | wariant A, czyli bez zmiany. Jeśli Paweł wybierze B, zmierzyć PSI przed i po |
| Sekcja z linkami na 10 stronach usług wydłuża DOM i psuje TBT | 10 stron dostaje nową sekcję z 4 linkami | linki to zwykłe `<a>` bez JS. Zero komponentów klienckich w tej sekcji |
| Skracanie tytułów gubi frazę, na której już rankujemy | np. `/uslugi/rozwiazania` traci słowo „indywidualne” | fraza zostaje w H1 i w treści strony. Sprawdzić pozycję frazy „rozwiązania na zamówienie” (poz. 12,4) 14 dni po zmianie |
| Home zaczyna konkurować ze stronami usług | dodanie fraz komercyjnych do H1 albo do H2 home | H1 zostaje markowy (wariant A). Frazy komercyjne wchodzą wyłącznie jako **anchory linków**, nie jako nagłówki home |
| Usunięcie sekcji kasuje treść zamówioną przez Pawła | `BranzeDemo` i `PasekZaufania` | oba scalenia przenoszą tekst 1:1 do sąsiedniej sekcji. Zero skasowanych zdań. Dwie pozycje idą do decyzji Pawła (punkt 2) |
| Linki w FAQ trafiają do JSON-LD | `FAQ_ITEMS` idzie 1:1 do `faqSchema` | link jako osobne pole obok `a`, nigdy w środku stringa odpowiedzi |
| Zmiana `HOME_CTA.href` psuje CTA na podstronach usług | 9 sekcji home plus `ServiceCTA` | `ServiceCTA` zostaje na `/kontakt`, bo na podstronach nie ma kotwicy `#diagnoza` |
| Ceny na kartach cennika home | 1490 zł, 3000 zł i 350 zł za godzinę są już publiczne w `lib/uslugi` i `wiedza-agenta.txt` | nie wpisywać żadnej kwoty bez decyzji Pawła |

---

## 9. LISTA DECYZJI PAWŁA

| # | Decyzja | Domyślna rekomendacja |
|---|---|---|
| 1 | H1 strony głównej: A, B czy C (punkt 6) | A, zostaw bez zmian |
| 2 | Czy `BranzeDemo` traci okno terminala z maszyną pisania | zostaw okno, przenieś sekcję do Problemu jako blok |
| 3 | Czy `PasekZaufania` znika (chipy hero mówią to samo) | tak, znika, chipy zostają w hero |
| 4 | Czy karty cennika na home pokazują realne kwoty (1490 zł, ryczałty 3000 do 10000 zł) | tak, przynajmniej dla audytu, bo 1490 zł jest już w opisie strony audytu |
| 5 | Czy hero traci ghost CTA „Zobacz, jak liczę oszczędność” | tak, dubluje intencję głównego CTA |
| 6 | Czy tytuł `/uslugi/rozwiazania` traci słowo „indywidualne” (72 znaki do 52) | tak, słowo zostaje w H1 i w treści |
| 7 | Czy `/uslugi/chatboty` dostaje H1 z 20 na 50 znaków (raport punkt 3.2) | tak, to strona z najwyższym potencjałem wejścia do top 10 |

---

Pełna ścieżka pliku:
`C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\raporty\plan-struktura-seo.md`

NIEZWERYFIKOWANE: wpływ zmian na pozycje w Google. Efekt zmian metadanych widać
w GSC po 1 do 3 tygodniach od przecrawlowania, więc żadnej liczby z tego planu nie
da się dziś potwierdzić na produkcji. Zweryfikowane są wyłącznie stany wejściowe:
długości tytułów i opisów (policzone skryptem po 46 adresach z rejestrów) oraz liczby
linków wewnętrznych (policzone po repo i zgodne z pomiarem live z raportu 2026-08-07).
