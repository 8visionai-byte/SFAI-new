# Indeksacja Google i widoczność w Bing — diagnoza

**Data:** 2026-08-30
**Zakres:** stan indeksacji 55 podstron w Google, przyczyna niewidoczności w Bing
**Narzędzia:** GSC URL Inspection API (sprawdzenie adres po adresie), GSC Search Analytics, Bing Webmaster API, Ahrefs

---

## 1. Google: nie mamy 17 niezaindeksowanych stron

Sprawdziłem **każdy z 55 adresów z mapy witryny** przez URL Inspection API, czyli to samo źródło, z którego korzysta panel Search Console.

| Stan | Liczba |
|---|---|
| Przesłana i zaindeksowana | **52** |
| Nieznana Google | 3 |

### Trzy strony poza indeksem

| Adres | Stan | Komentarz |
|---|---|---|
| `/uslugi/voiceboty/odbieranie-telefonow` | Google jej nie zna | świeża podstrona, Google jeszcze jej nie odkrył |
| `/blog/automatyzacja-procesow-ai-od-czego-zaczac` | Google jej nie zna | wymaga zgłoszenia |
| `/polityka-prywatnosci` | Google jej nie zna | strona wymagana prawnie, ale bez wartości w wyszukiwarce |

Żadna z nich nie ma błędu. Stan „Adres URL jest Google nieznany" oznacza po prostu,
że robot jeszcze do niej nie dotarł, a nie że coś ją blokuje.

### Skąd bierze się liczba 17 w panelu

Właściwość w Search Console jest ustawiona jako **domenowa** (`sc-domain:simplefast.ai`),
czyli obejmuje wszystkie warianty adresu naraz: z `www` i bez, po `http` i po `https`.

Sprawdziłem te warianty i one raportują się tak:

| Adres | Stan w Google |
|---|---|
| `https://simplefast.ai/` | **Strona zawiera przekierowanie** |
| `http://simplefast.ai/` | **Strona zawiera przekierowanie** |
| `http://www.simplefast.ai/` | **Strona zawiera przekierowanie** |

Google przy każdym z nich poprawnie wskazuje kanoniczny adres `https://www.simplefast.ai/`.

**„Strona z przekierowaniem" jest w panelu liczona jako niezaindeksowana.** I tak ma być:
przekierowanie apex na www to poprawna konfiguracja, a nie usterka. Te wpisy będą tam
zawsze i nie należy ich naprawiać.

**Uczciwie o granicy tej analizy:** nie odtworzyłem dokładnie liczby 17. URL Inspection API
pozwala sprawdzić konkretny adres, ale **nie zwraca listy** wszystkich adresów znanych
Google. Sprawdziłem najbardziej prawdopodobnych kandydatów (warianty z ukośnikiem końcowym,
endpointy `/api/*`, pliki `llms.txt` i `wiedza-agenta.txt`, adresy usunięte z dawnych map
witryny) i **wszystkie są Google nieznane**, więc licznika nie zasilają.

Żeby zamknąć temat w 100%, potrzebuję listy z panelu: Search Console → Indeksowanie →
Strony → kliknij „Niezaindeksowane" → wyeksportuj. Wtedy sprawdzę każdy adres po kolei
i powiem, co z nim zrobić.

**Moja prognoza przed zobaczeniem listy:** większość z tych 17 to przekierowania wariantów
adresu, a reszta to te trzy nieodkryte strony. Jeśli tak jest, do zrobienia jest tylko
zgłoszenie trzech adresów, a nie naprawa siedemnastu.

---

## 2. Bing: strona NIE jest niewidoczna z powodu awarii

To jest najważniejsze ustalenie w tym raporcie i zmienia kierunek działania.

### Co działa poprawnie

| Element | Stan |
|---|---|
| Skanowanie | **1 402 strony przeskanowane w 77 dni**, robot przychodzi codziennie |
| Mapa witryny | zgłoszona, status **Success**, 55 adresów, pobierana regularnie |
| Błędy serwera (5xx) | **0** przez cały okres |
| Zgłoszone problemy indeksowania | **0** |
| Klucz IndexNow | plik `c1b2dc4dad72b3b2a2ebf1031c23dd22.txt` odpowiada HTTP 200, treść zgadza się z nazwą |

### Indeks rośnie, nie spada

| Data | Stron w indeksie Bing |
|---|---|
| start pomiaru (77 dni temu) | 9 |
| 2026-08-15 | 38 |
| 2026-08-20 | 40 |
| 2026-08-29 | **41** |

Bing systematycznie dodaje strony. To nie wygląda na karę ani na blokadę.

### Prawdziwa przyczyna: siedem linków

| Wskaźnik | Wartość |
|---|---|
| **Linki przychodzące wg Bing (InLinks)** | **7** |
| Wyświetlenia w 78 dni | 7 |
| Kliknięcia | 0 |
| Siła domeny (Ahrefs DR) | 18 |

**Bing waży linki przychodzące i sygnały zewnętrzne znacznie mocniej niż Google.** Przy
siedmiu linkach do całej domeny strona może być w indeksie i mimo to nie pokazywać się
na żadną frazę konkurencyjną. Dokładnie to widzimy: 41 stron w indeksie, 7 wyświetleń.

Dla porównania: w Google ta sama strona ma **1 611 wyświetleń w 28 dni** i rośnie
(kliknięcia dziennie +101%). Google jest znacznie bardziej wyrozumiały dla młodych domen
z dobrą treścią. Bing chce dowodu z zewnątrz.

### Drobiazg do sprawdzenia: 14 stron poza indeksem Bing

Mapa witryny ma 55 adresów, Bing trzyma w indeksie 41. Różnica to 14 stron. Bing nie
udostępnia listy przez API, więc trzeba ją odczytać z panelu, ale przy limicie
**10 000 zgłoszeń dziennie** (mamy do dyspozycji, wykorzystane zero) taniej jest po prostu
zgłosić wszystkie 55 adresów naraz.

### Uwaga o właściwości w koncie Bing

W koncie zarejestrowana jest właściwość `https://simplefast.ai/`, czyli **bez `www`**,
a serwis działa pod `https://www.simplefast.ai/`. Dane raportowane są mimo to poprawnie
(widać w nich adresy z `www`), więc nie jest to przyczyna problemu. Warto jednak dodać
drugą właściwość dla `www`, żeby panel pokazywał komplet i żeby zgłoszenia adresów
trafiały bez pośrednictwa przekierowania.

---

## 3. WYKONANE 2026-08-30 (z potwierdzeniem)

| Działanie | Wynik |
|---|---|
| IndexNow, 55 adresów | **HTTP 200 OK**, plik klucza na produkcji zweryfikowany |
| Bing SubmitUrlBatch, 55 adresów | **HTTP 200**, odpowiedź `{"d":null}` czyli sukces |
| Kontrola limitu Bing po zgłoszeniu | dzienny **10 000 → 9 945**, miesięczny **20 000 → 19 945** |

Spadek limitu dokładnie o 55 to twarde potwierdzenie, że Bing przyjął komplet adresów.
IndexNow obsługuje też Yandex, więc tam adresy poszły przy okazji.

**Czego NIE dało się zrobić automatycznie:** Google nie udostępnia publicznego API do
zgłaszania zwykłych stron (Indexing API działa tylko dla ofert pracy i transmisji na żywo).
Trzy nieodkryte adresy trzeba kliknąć ręcznie w Search Console: „Sprawdź URL", wklej adres,
potem „Poproś o zindeksowanie".

**Kiedy sprawdzić efekt:** Bing zwykle przetwarza zgłoszenia w kilka dni. Liczbę stron
w indeksie (dziś 41 z 55) warto sprawdzić za tydzień, uruchamiając ponownie
`node tools/bing-diagnoza.js`.

---

## 4. Co zrobić dalej

### Google (dla Pawła, ręcznie w panelu)

1. **Zgłosić trzy nieodkryte adresy** w Search Console: „Sprawdź URL" → wklej adres →
   „Poproś o zindeksowanie". Google nie ma API do tego, więc automat tego nie zrobi:
   - `/uslugi/voiceboty/odbieranie-telefonow`
   - `/blog/automatyzacja-procesow-ai-od-czego-zaczac`
   - `/polityka-prywatnosci`
2. **Nie naprawiać przekierowań.** Wpisy „Strona z przekierowaniem" w panelu są poprawne.
3. **Wyeksportować listę niezaindeksowanych** z panelu, żeby domknąć temat tych 17.

### Bing (to jest właściwa robota)

1. ~~Zgłosić wszystkie 55 adresów przez API.~~ **ZROBIONE 2026-08-30**, patrz sekcja 3.
2. **Wpiąć IndexNow w rutynę po każdym wdrożeniu.** Klucz działa, narzędzie jest gotowe
   (`node tools/indexnow-ping.js`), tylko nikt go nie uruchamiał regularnie.
3. **Zbudować linki przychodzące. Tu leży wynik, nie w technice.** Przy 7 linkach żadna
   zmiana na stronie nie ruszy Binga. Bing szczególnie ceni:
   - wizytówki i katalogi firmowe (Bing Places, katalogi branżowe),
   - profile firmowe w serwisach o wysokim zaufaniu,
   - wzmianki z nazwą domeny w treściach zewnętrznych.
4. **Dodać właściwość `www.simplefast.ai`** obok istniejącej apex.

### Czego NIE robić

- **Nie szukać awarii w Bing.** Zero błędów 5xx, zero problemów indeksowania, mapa
  witryny przyjęta, robot przychodzi codziennie. Technicznie jest w porządku.
- **Nie przepisywać treści pod Bing.** Ta sama treść w Google zbiera 1 611 wyświetleń
  miesięcznie. Różnica jest w autorytecie domeny, nie w jakości stron.

---

## 4. Kontekst: Google w tym samym czasie

Żeby nie zgubić proporcji między wyszukiwarkami:

| Okres | Wyświetlenia | Kliknięcia | Śr. pozycja |
|---|---|---|---|
| 7 dni | 587 | 17 | 16,5 |
| 28 dni | 1 611 | 34 | 15,3 |
| 90 dni | 2 596 | 68 | 18,3 |

Kliknięcia dziennie **+101%** (7 dni wobec 28). Pozycja poprawia się z 18,3 do 16,5.

Bing to w Polsce kilka procent rynku. Przy takim wzroście w Google i siedmiu linkach
przychodzących **Bing nie powinien być priorytetem**. Zgłoszenie adresów zajmie kwadrans,
a praca nad linkami służy obu wyszukiwarkom naraz.

---

*Dane: GSC URL Inspection API (55 adresów sprawdzonych pojedynczo), GSC Search Analytics
7/28/90 dni, Bing Webmaster API (GetCrawlStats, GetRankAndTrafficStats, GetCrawlIssues,
GetUrlSubmissionQuota), Ahrefs (siła domen). Surowe dane indeksacji:
`.seo-przeglad/dane/indeksacja-2026-08-30.json`.*
