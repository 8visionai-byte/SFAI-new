# PLAN COPY POD SEO I LEADY (ZESPÓŁ 4)

Data: 2026-08-07. Faza analityczna, ZERO edycji kodu. To jest plan wykonawczy:
każda pozycja ma plik, stary tekst, nowy tekst i liczbę, z której wynika.

**Podstawa decyzji:**
- `raporty/raport-seo-2026-08-07.md` (dane GSC 2026-07-08 do 2026-08-05)
- rejestry treści: `lib/site.ts`, `lib/uslugi/*.ts`, `lib/o-nas/content.ts`,
  `lib/narzedzia/index.ts`, `lib/produkty/index.ts`
- kod sekcji home: `app/page.tsx` + `components/sections/*.tsx`
- skargi Pawła z briefu v8 (cytaty w tekście)

**Żelazne zasady tego planu (sprawdzone w każdej propozycji):**
1. Zero zmyślonych liczb. Wszystkie kwoty w nowych tekstach pochodzą z rejestrów:
   `lib/uslugi/audyt-ai.ts` → `minPrice: 1490`, `lib/uslugi/opieka-ai.ts` →
   `minPrice: 3000` plus `ramaCeny.tresc` z widełkami 3000/5500/10000 zł.
2. Zero nazw klientów poza tymi, które już są w repo za zgodą klienta
   (`components/sections/DowodSpoleczny.tsx`, komentarz: „REALNE opinie
   dostarczone przez Pawła, publikacja za zgodą klienta”).
3. Zero em-dash. Zero fałszywego dowodu społecznego.
4. Głos marki z `lib/site.ts` (`POSITIONING.claim` „Budujemy AI Agentów, nie
   chatboty.”, `subClaim` „Agent AI działa, nie tylko gada.”) i z
   `lib/o-nas/content.ts` (wartości: „Sprzedajemy efekt, nie narzędzia.”,
   „Mówimy wprost, też kiedy nie warto.”).
5. Kapsuły answer-first trzymają kontrakt 40 do 60 słów (komentarz przy
   `kapsula` w `lib/o-nas/content.ts`). Kafelki: maksymalnie 25 słów.

**Granice wobec innych zespołów (żeby nie było kolizji plików):**
- Kolejność sekcji home i mapa linkowania na 40+ linków: ZESPÓŁ 1.
  Tu podaję tylko te linki, które są wpisane w sam tekst kafelka.
- Tytuły i opisy meta WSZYSTKICH podstron: ZESPÓŁ 1. Tu podaję meta wyłącznie
  dla 4 stron usług z zadania 3, bo są nierozłączne z H1 i kapsułą.
- Kolory, świecenie, kontrast: ZESPÓŁ 3. Animacje: ZESPÓŁ 2.
- Pliki, które zmienia TEN plan: `lib/uslugi/chatboty.ts`, `voiceboty.ts`,
  `audyt-ai.ts`, `automatyzacje.ts`, `lib/uslugi/types.ts` (nowe pole `kafelek`),
  `lib/site.ts` (HOME_CTA), `lib/narzedzia/types.ts` + `index.ts` (nowe pole
  `tizer`), `components/sections/*.tsx` (teksty), `components/uslugi/ServiceCTA.tsx`.

---

## 1. PIĘTNAŚCIE FRAZ, NA KTÓRE MOŻEMY REALNIE UROSNĄĆ

Kryterium z briefu: pozycja 8 do 25 i realne wyświetlenia. Razem **470
wyświetleń w 28 dni** i **1 kliknięcie**. To jest cały nasz najbliższy zysk.

| # | Fraza | Wyśw. 28 dni | Poz. 28 dni | Poz. ost. 7 dni | Strona docelowa | Czy fraza jest dziś na stronie |
|---|---|---|---|---|---|---|
| 1 | chatbot ai dla firm | 154 | 21,0 | **14,4** | /uslugi/chatboty | NIE (mamy tylko l. poj. „dla firmy” w `h1` i `metaTitle`) |
| 2 | audyt ai: mapa wąskich gardeł i dźwigni szybkiego zwrotu | 68 | 18,3 | bez zmian | /uslugi/audyt-ai | NIE (fraza jest tylko w `lib/o-nas/content.ts`: „Mapujemy wąskie gardła”) |
| 3 | audyt ai mapa waskich gardeł i dzwigni szybkiego zwrotu | 66 | 24,7 | bez zmian | /uslugi/audyt-ai | NIE (ta sama fraza bez polskich znaków) |
| 4 | chatbot dla firmy | 34 | 12,0 | **6,8** | /uslugi/chatboty | TAK (`h1: 'Chatbot AI dla firmy'`) |
| 5 | bot telefoniczny | 32 | 26,4 | **16,4** | /uslugi/voiceboty | CZĘŚCIOWO (jest w `kapsula`, `rozwiazanie.h2` i `metaDescription`, NIE MA w `h1` ani `metaTitle`) |
| 6 | chatbot dla firm | 29 | 21,1 | 15,5 | /uslugi/chatboty | NIE (liczba mnoga) |
| 7 | chatbot na stronę firmową | 22 | 24,2 | brak danych | /uslugi/chatboty | NIE (w `queries` jest „chatbot na stronę www”, w treści „na stronie”) |
| 8 | ile kosztuje stworzenie asystenta ai dla firmy i kto to robi w polsce? | 21 | 7,8 | 7,8 | /poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy | NIE (mamy „AI agenta”, brakuje słowa „asystent”) |
| 9 | kto wdroży chatbota ai dla firmy | 8 | 12,6 | 12,4 | /uslugi/chatboty | NIE |
| 10 | ai chatbot dla małej firmy | 8 | 17,8 | 18,3 | /uslugi/chatboty | CZĘŚCIOWO (`faq`: „Czy chatbot ma sens przy małej firmie” jest w audyt-ai, nie w chatbotach) |
| 11 | automatyzacja ai dla firm | 7 | 9,6 | 9,5 | /uslugi/automatyzacje | NIE (`h1: 'Automatyzacja procesów w firmie z AI'`) |
| 12 | voicebot dla firm | 7 | 16,6 | brak danych | /uslugi/voiceboty | NIE (l. poj. „dla firmy”) |
| 13 | bot do odbierania telefonów | 6 | 16,2 | brak danych | /uslugi/voiceboty | CZĘŚCIOWO („odbiera telefon” tak, dokładna fraza nie) |
| 14 | rozwiązania na zamówienie | 5 | 12,4 | 12,4 | /uslugi/rozwiazania | TAK (`h1` zawiera „na zamówienie”) |
| 15 | voicebot do umawiania wizyt | 3 | 17,3 | brak danych | /uslugi/voiceboty | CZĘŚCIOWO („umawia wizyty” tak, „do umawiania wizyt” nie) |

Bonus (poza pierwszą piętnastką, ta sama mechanika): „automatyzacje dla firm”
3 wyśw., poz. 15,3, cel /uslugi/automatyzacje.

**Wniosek dla copy, w jednym zdaniu:** 6 z 15 fraz to liczba MNOGA („dla firm”),
a my mamy wszędzie liczbę pojedynczą. To jest najtańsza poprawka w całym planie.

### Czego NIE robimy (żeby nie zepsuć tego, co działa)

| Fraza | Wyśw. | Poz. | Dlaczego zostawiamy |
|---|---|---|---|
| voicebot | 35 | 43,9 | Za daleko, sama zmiana copy nie ruszy pozycji 44 |
| voicebot do obsługi klienta | 30 | 51,8 | Jak wyżej |
| voicebot windykacja | 22 | 35,4 | Nie mamy tej usługi opisanej, dopisywanie byłoby obietnicą bez pokrycia |
| simple fast ai | 14 | 1,0 | Marka, pozycja 1, CTR 50%. Nie ruszamy |
| cytowalność w chatgpt | 7 | 4,6 | Już top 5, wolumen minimalny |

**Kanibalizacja: strona główna NIE dostaje żadnej z tych 15 fraz.** Raport SEO
punkt 1.2 sprawdził to wymiarem zapytanie plus strona: te 154 wyświetlenia
frazy „chatbot ai dla firm” w całości należą do /uslugi/chatboty, a strona
główna nie wyświetla się na nią ani razu. Zadaniem home jest prowadzić do
leada i do podstron, nie walczyć z nimi o te same słowa.

---

## 2. STRONA GŁÓWNA: SEKCJA PO SEKCJI, STARY TEKST OBOK NOWEGO

Format wg briefu: jedno mocne zdanie (H2) plus 2 do 3 kafelków po maksymalnie
25 słów plus CTA. Każdy kafelek kończy się linkiem do istniejącej podstrony.

Liczba słów przy każdym nowym kafelku jest policzona i podana w nawiasie.

### 2.0 Diagnoza obecnego stanu (skąd te zmiany)

| Problem | Dowód z pliku |
|---|---|
| 15 przycisków CTA na jednej stronie, 8 różnych etykiet | policzone w `components/sections/*`: Hero 3, Problem 1, Rozwiazanie 1, JakToDziala 1, Oferta 2, Dowod 1, GwarancjaEfektu 1, DowodSpoleczny 2, FAQ 1, ZyweDemo 1, FinalneCTA 1 |
| 10 z 15 CTA wyprowadza z home | `HOME_CTA.href = '/kontakt'` (lib/site.ts:154), mimo że formularz `DiagnozaForm` stoi na home w sekcji `id="diagnoza"` (FinalneCTA.tsx:22) |
| Kod kłóci się z własnym kontraktem | komentarz w `lib/site.ts:152`: „wszystkie wystąpienia prowadzą do tego samego flow diagnozy (#diagnoza)”, a `href` to `/kontakt` |
| Kafelki usług pokazują tekst pisany pod Google, nie pod człowieka | `PromoUslugi.tsx:94` renderuje `usluga.metaDescription` (144 do 155 znaków, pisane pod SERP) jako widoczny opis karty |
| Ten sam tekst w 4 miejscach | „Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz” jest w `JakToDziala.tsx:20`, `FinalneCTA.tsx:83`, `lib/uslugi/automatyzacje.ts:63`, `lib/o-nas/content.ts:144` |
| Kafelki bez rozwinięcia | lista `POTRAFI` w `Rozwiazanie.tsx:26-43` (4 pozycje) nie ma ani jednego linku, choć mówi o voicebocie, chatbocie i automatyzacji |
| Liczba bez źródła w treści | `Problem.tsx:31`: „Większość małych firm traci kilkanaście godzin tygodniowo”. To statystyka bez źródła, łamie zasadę zero zmyślonych liczb |
| Trzy identyczne wartości w cenniku | `Oferta.tsx:26-54`: `saves: 'liczymy na diagnozie'` w każdej z trzech kart, `price: 'wycena na diagnozie'` w dwóch z trzech |
| H2 sekcji to jedno słowo | `NarzedziaTeaser.tsx:35`: `<h2>Narzędzia</h2>` |

### 2.1 HERO (`components/sections/Hero.tsx`)

| Element | STARY | NOWY | Uzasadnienie |
|---|---|---|---|
| Overline | Agent AI działa, nie tylko gada. | bez zmian | `POSITIONING.subClaim`, sygnatura marki |
| H1 | Budujemy AI Agentów, nie chatboty. | bez zmian, patrz plan zespołu 1 | Raport SEO pkt 4 rekomenduje wariant A. Home nie walczy o żadną frazę komercyjną. DECYZJA PAWŁA |
| Kapsuła (lead) | Chatbot odpowiada na pytania. AI Agent wykonuje pracę: odbiera telefony, odpisuje klientom, umawia spotkania i pilnuje faktur. Nie sprzedajemy narzędzi AI. Projektujemy systemy, które zdejmują z polskiej firmy powtarzalną robotę, w dni, nie w miesiące. Twoje dane zostają w Unii Europejskiej, zaczynasz od małego kroku, płacisz za efekt. | bez zmian | 48 słów, mieści się w kontrakcie 40 do 60 słów. To główna kapsuła cytowalna dla LLM. Skracanie jej to strata, nie zysk |
| CTA 1 (primary) | Pokaż mi, gdzie tracę czas → /kontakt | **Umów bezpłatną diagnozę** → **#diagnoza** | Formularz jest na tej samej stronie. Etykieta czasownikowa, ta sama, której już używamy w 3 innych sekcjach. DECYZJA PAWŁA (zmienia `HOME_CTA.label`, patrz punkt 4) |
| CTA 2 (ghost) | Zobacz, jak liczę oszczędność → #problem | **Policz swoją oszczędność** → **/narzedzia#kalkulator-oszczednosci** | Sekcja #problem nie liczy niczego (komentarz w `Problem.tsx:50`: „przycisk prowadzi do formularza diagnozy, NIE do kalkulatora”). Kalkulator ISTNIEJE: `lib/narzedzia/index.ts`, slug `kalkulator-oszczednosci`, opis „pokazuje, ile złotych rocznie odzyskasz”. /narzedzia ma 17 wyświetleń, poz. 4,2 i zero kliknięć, więc dorzucamy jej ruch z home |
| CTA 3 (ghost) | Zobacz, jak rozmawia nasz Agent → #demo | **Posłuchaj, jak rozmawia Agent** → #demo | Bez zmian merytorycznych, krótsza etykieta. Redukcja hero do 2 przycisków: DECYZJA PAWŁA |
| Mikrokopia | Bez zobowiązań. Krótka diagnoza, konkretna lista do automatyzacji. Odpowiadam w kilka minut. | **Bez zobowiązań. Pokażę Ci, gdzie tracisz czas, i dam konkretną listę. Odpowiadam w kilka minut.** (15 słów) | Słowa „gdzie tracisz czas” schodzą z przycisku do mikrokopii, więc głos marki nie ginie |

### 2.2 KAFELKI USŁUG (`components/sections/PromoUslugi.tsx`)

Sekcja dziś nie ma H2 (komentarz w pliku: „sekcja nie ma własnego nagłówka”),
a opisy kart to `metaDescription` pisane pod wyniki wyszukiwania.

**Zmiana techniczna do wykonania:** dodać do `lib/uslugi/types.ts` pole
`kafelek: string` (opis pod kafelek, maks. 25 słów) i renderować je w
`PromoUslugi.tsx:94` zamiast `usluga.metaDescription`. Meta zostaje meta,
kafelek zostaje kafelkiem.

| Element | STARY | NOWY | Słów |
|---|---|---|---|
| H2 sekcji | brak | **Który Agent zdejmie z Ciebie robotę najpierw?** | 7 |
| Kafelek 1 tytuł | Chatbot AI dla firmy | **Chatbot AI dla firm, który odpowiada klientom 24/7** | patrz pkt 3.1 |
| Kafelek 1 opis | Chatbot AI dla firmy: odpowiada klientom 24/7, zbiera leady i uczy się na Twojej wiedzy. Wdrożenie w dni, nie miesiące. Pierwszy krok do Agenta. | **Odpowiada klientom na stronie i w komunikatorach przez całą dobę, zbiera leady po godzinach i uczy się na Twojej wiedzy.** | 20 |
| Kafelek 2 tytuł | Voicebot dla firmy, który odbiera telefon za Ciebie | **Voicebot dla firm, czyli bot telefoniczny, który odbiera za Ciebie** | patrz pkt 3.2 |
| Kafelek 2 opis | Voicebot, czyli bot telefoniczny: odbiera telefon 24/7, rozmawia po polsku, umawia wizyty i oddzwania do nieodebranych. Agent, który załatwia sprawę. | ~~Odbiera telefon, gdy Ty nie możesz. Rozmawia po polsku, umawia i potwierdza wizyty, oddzwania do nieodebranych.~~ **NIEAKTUALNE (D11): Odbiera telefon, gdy Ty nie możesz. Rozmawia po polsku i umawia wizyty w kalendarzu.** | 13 |
| Kafelek 3 tytuł | Audyt AI firmy: mapa oszczędności czasu | **Audyt AI firmy: mapa wąskich gardeł i oszczędności czasu** | patrz pkt 3.3 |
| Kafelek 3 opis | Audyt AI firmy za 1490 zł: rozkładamy procesy i mówimy, gdzie wdrożyć AI z zyskiem, a gdzie odpuścić. Dostajesz Action Plan. Cena odliczana od wdrożenia. | **Płatny Sprint Diagnostyczny za 1490 zł. Mapa wąskich gardeł i dźwigni szybkiego zwrotu. Cenę odliczamy od wdrożenia.** | 17 |
| Kafelek 4 opis (Architekci) | Rozliczamy się za przyniesioną wartość, nie za godziny. Sprawdzamy, gdzie tracisz pieniądze, robimy jeden proces na próbę, decydujesz. Darmowa diagnoza, pełny jawny cennik od 0 zł. | **Rozliczamy się za przyniesioną wartość, nie za godziny. Darmowa diagnoza, jeden proces na próbę, decyzja po Twojej stronie.** | 18 |

Linki: kafelki są klikalne dziś i tak zostaje. Anchor = tytuł kafelka = H1
usługi. Kafelek 3 (audyt) niesie frazę o 134 wyświetleniach z home, co jest
jednocześnie linkiem wewnętrznym do /uslugi/audyt-ai (dziś 5 linków).

Uwaga hierarchii nagłówków: po dodaniu H2 sekcji tytuły kart schodzą z `h2` na
`h3`. To zmiana struktury, więc wykonanie po stronie zespołu 1.

Nazwanie „Messenger” zamiast „komunikatorach” dałoby dodatkową frazę, ale to
deklaracja konkretnej integracji: **DECYZJA PAWŁA**.

### 2.3 PASEK ZAUFANIA (`components/sections/PasekZaufania.tsx`)

Teksty są krótkie i dobre (3 pozycje po 8 do 13 słów). Zmiana dotyczy tylko
zasady „wszystko do czegoś prowadzi”.

| Filar | Tekst (bez zmian) | NOWY link | Uzasadnienie celu |
|---|---|---|---|
| Twoje dane zostają w UE | RODO i AI Act. Klient zawsze wie, że rozmawia z AI. | sekcja Bezpieczeństwo na home (wymaga dodania `id="bezpieczenstwo"` w `Bezpieczenstwo.tsx`) | Rozwinięcie tego filaru to cała sekcja niżej, dziś nie da się do niej skoczyć |
| Zaczynasz od małego kroku | Najpierw darmowa diagnoza, potem mały projekt. Bez wielkiej decyzji na start. | /uslugi/audyt-ai | Mały krok = Sprint Diagnostyczny, dosłownie ta usługa |
| Płacisz za efekt | Umawiamy się na wynik. Rozliczamy się za efekt, nie za obietnice. | /uslugi/architekci-wartosci-ai | Tytuł tej strony to „wdrożenie AI rozliczane za efekt” |

### 2.4 PROBLEM (`components/sections/Problem.tsx`)

| Element | STARY | NOWY | Uzasadnienie |
|---|---|---|---|
| H2 | Ile czasu w tygodniu zjada Ci robota, którą mógłby robić ktoś inny? | bez zmian | Pytanie, dobra kotwica AEO |
| Lead | Większość małych firm traci **kilkanaście godzin tygodniowo** na to samo: odbieranie tych samych pytań, przepisywanie danych między systemami, oddzwanianie do klientów, którzy nie dodzwonili się za pierwszym razem. To nie jest praca, która rozwija firmę. To praca, która ją tylko utrzymuje na powierzchni. I to właśnie ją zdejmuje AI Agent. | **Policz, ile godzin w tygodniu zjada Ci to samo: odbieranie tych samych pytań, przepisywanie danych między systemami, oddzwanianie do klientów, którzy nie dodzwonili się za pierwszym razem. To nie jest praca, która rozwija firmę. To praca, która ją tylko utrzymuje na powierzchni. I to właśnie ją zdejmuje AI Agent.** (49 słów) | „Większość małych firm traci kilkanaście godzin tygodniowo” to liczba bez źródła. Nowa wersja mówi to samo, ale pytaniem do czytelnika, nie zmyśloną statystyką. **DECYZJA PAWŁA**, jeśli ma źródło tej liczby, wracamy do niej z przypisem |
| Mostek | Nie zgaduj. Na bezpłatnej diagnozie pokażę Ci, ile godzin i złotych miesięcznie zjada powtarzalna robota w Twojej firmie. Konkretne liczby z Twoich procesów, nie ogólniki. | bez zmian | 26 słów, uczciwe, bez liczb |
| CTA | Pokaż mi, ile tracę → /kontakt | **primary: Umów bezpłatną diagnozę → #diagnoza** oraz **secondary: Policz to sam w kalkulatorze → /narzedzia#kalkulator-oszczednosci** | Kalkulator istnieje i robi dokładnie to, co obiecuje przycisk. Komentarz w pliku sam mówi: „Gdyby powstał realny kalkulator (godziny x stawka), wpiąć go jako krok 1 flow”. Powstał |

### 2.5 BRANŻE (`components/sections/BranzeDemo.tsx`)

Teksty (4 frazy po 5 do 7 słów) są dobre i zostają 1:1. Jedna zmiana:

| Element | STARY | NOWY |
|---|---|---|
| Domknięcie sekcji | To nie rolka haseł. Każdy z tych przykładów to realne zadanie, które zdejmujemy z właściciela i jego zespołu. Twój proces wygląda inaczej? Tym lepiej. Agenta układamy pod to, co naprawdę zżera Ci czas. | bez zmian, ale dodać na końcu link: **Zobacz wszystkie usługi → /uslugi** |

### 2.6 ROZWIĄZANIE (`components/sections/Rozwiazanie.tsx`)

To jest sekcja ze skargi Pawła numer 1: „Za dużo tekstu, CTA rozpierdolone, nie
ma jednej struktury”. Dziś sekcja ma 6 bloków: 2 karty AEO (197 słów razem),
demo, tabelę 6 wierszy, listę 4 pozycji, wielki cytat i przycisk.

| Element | STARY | NOWY | Słów |
|---|---|---|---|
| Karta 1, akapit 1 | AI Agent dla firmy to system, który samodzielnie wykonuje powtarzalne zadania: odbiera telefony, odpowiada klientom, umawia wizyty i przenosi dane między systemami. Działa według Twoich zasad, ma dostęp do kalendarza, CRM i narzędzi, z których już korzystasz. W odróżnieniu od chatbota nie tylko odpowiada na pytania, ale wykonuje konkretne czynności od początku do końca. (57 słów) | **AI Agent dla firmy to system, który sam wykonuje powtarzalne zadania: odbiera telefony, odpowiada klientom, umawia wizyty i przenosi dane między systemami. Działa według Twoich zasad i korzysta z narzędzi, które już masz: kalendarza, CRM, poczty. Chatbot tylko odpowiada na pytania. Agent doprowadza sprawę do końca.** | 46 |
| Karta 1, akapit 2 | W SimpleFast.ai budujemy takich Agentów dla polskich małych i średnich firm. Pracujemy zdalnie dla firm z całej Polski, od jednoosobowych działalności z mniejszych miast po zespoły z Warszawy, Krakowa czy Wrocławia. Najczęściej są to chatboty AI dla firmy, voiceboty odbierające telefony po polsku oraz automatyzacja procesów w firmie. Dane zostają w UE, zgodnie z RODO, a płacisz za efekt. (66 słów) | **W SimpleFast.ai budujemy takich Agentów dla polskich firm, zdalnie w całej Polsce. Najczęściej to chatbot AI dla firm, voicebot odbierający telefony po polsku i automatyzacja procesów w firmie.** | 28 |
| Karta 2 | Chatbot odpowiada na pytania. AI Agent wykonuje zadania. Chatbot powie klientowi, jakie masz godziny otwarcia. Agent sprawdzi Twój kalendarz, zaproponuje wolny termin, zapisze wizytę i wyśle potwierdzenie. Robi to pod Twoją kontrolą i według Twoich zasad, a Ty w każdej chwili widzisz, co zrobił. To różnica między systemem, który gada, a pracownikiem, który działa. (74 słowa) | **Chatbot odpowiada na pytania. AI Agent wykonuje zadania. Chatbot poda godziny otwarcia. Agent sprawdzi kalendarz, zaproponuje wolny termin, zapisze wizytę i wyśle potwierdzenie. Robi to według Twoich zasad, a Ty w każdej chwili widzisz, co zrobił.** | 36 |

Anchor w akapicie 2 zmienia się z liczby pojedynczej „chatboty AI dla firmy” na
mnogą **„chatbot AI dla firm”** (fraza 1 i 6 z tabeli: 183 wyświetlenia razem).

**Lista „co potrafi Agent” (`POTRAFI`, 4 pozycje): teksty zostają, dochodzi link
w każdym kafelku.** To realizuje wprost skargę 5 Pawła („każdy kafelek ma swoje
rozwinięcie”).

| Kafelek | Tekst (bez zmian, słów) | NOWY link, anchor |
|---|---|---|
| Odbiera telefon, kiedy Ty nie możesz. | Voicebot rozmawia po polsku, umawia wizyty i przekazuje Ci tylko to, co ważne. (13) | **bot telefoniczny dla firm → /uslugi/voiceboty** (fraza 5 i 12, 39 wyśw.; strona ma dziś tylko 3 linki wewnętrzne) |
| Odpisuje klientom w minuty, o każdej porze. | Chatbot na stronie i w komunikatorach odpowiada na pytania i zbiera leady, nawet o 22:00. (15) | **chatbot AI dla firm → /uslugi/chatboty** (fraza 1 i 6, 183 wyśw.) |
| Przepisuje dane za Ciebie. | Automatyzacja przenosi informacje między mailem, systemem i fakturą, bez ręcznej roboty. (11) | **automatyzacja AI dla firm → /uslugi/automatyzacje** (fraza 11, poz. 9,6) |
| Pilnuje, żeby nic nie wypadło. | Przypomnienia, follow-upy, oddzwonienia. Klient nie zostaje bez odpowiedzi. (9) | **gotowe produkty AI → /produkty** (raport SEO pkt 5.3: /produkty ma ZERO linków z treści, a średnią pozycję 2,4) |

| Element | STARY | NOWY |
|---|---|---|
| Cytat sekcji | „AI Agent to nie program, który rozmawia. To program, który załatwia sprawę.” | bez zmian, to sygnatura |
| CTA sekcji | Sprawdź, którego Agenta potrzebujesz → #diagnoza | **Porównaj wszystkie usługi → /uslugi** | Przycisk obiecuje wybór, a prowadził do formularza. Intencja „którego Agenta potrzebujesz” przenosi się do H2 kafelków usług (punkt 2.2). /uslugi ma 16 wyświetleń i poz. 14,3 |

### 2.7 JAK TO DZIAŁA (`components/sections/JakToDziala.tsx`)

| Element | STARY | NOWY | Słów |
|---|---|---|---|
| H2 | Jak wygląda wdrożenie AI Agenta krok po kroku? | bez zmian | |
| Lead | Wdrożenie ma trzy kroki. Najpierw bezpłatna diagnoza... (54 słowa) | bez zmian | kapsuła answer-first w kontrakcie |
| Krok 1 opis | Rozmawiamy 30 minut. Ty pokazujesz, gdzie ucieka czas, ja mówię wprost, co da się zautomatyzować, ile to oszczędza i czego się nie opłaca ruszać. Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz. (35) | **Rozmawiamy 30 minut. Ty pokazujesz, gdzie ucieka czas, ja mówię wprost, co da się zdjąć, a czego nie warto ruszać.** + link **audyt AI firmy → /uslugi/audyt-ai** | 20 |
| Krok 2 opis | Wybieramy jeden proces, który boli najbardziej. Stawiamy Agenta w dni, nie w miesiące. Testujemy na żywo, Ty ustawiasz granice i zasady. Twoje dane przez cały czas zostają w UE. (29) | **Wybieramy jeden proces, który boli najbardziej. Stawiamy Agenta w dni, nie w miesiące. Ty ustawiasz granice, dane zostają w UE.** + link **gotowe produkty AI → /produkty** | 20 |
| Krok 3 opis | Agent działa, my pilnujemy, żeby działał dobrze. Patrzymy na wyniki, poprawiamy, dokładamy kolejne zadania, kiedy poczujesz, że to się spina. Płacisz za efekt, nie za obietnice. (27) | **Agent działa, my pilnujemy, żeby działał dobrze. Patrzymy na wyniki, poprawiamy i dokładamy kolejne zadania. Płacisz za efekt.** + link **Opieka AI → /uslugi/opieka-ai** | 18 |
| CTA | Umów bezpłatną diagnozę → /kontakt | **Umów bezpłatną diagnozę → #diagnoza** | jeden system, punkt 4 |

Zdanie „Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz”
zostaje na stronie: jest już w `FinalneCTA.tsx:83`. Usuwamy powtórzenie, nie treść.

### 2.8 OFERTA (`components/sections/Oferta.tsx`)

Największy zysk merytoryczny w całym home: **mamy dwie REALNE ceny w rejestrach
i nie pokazujemy ich na stronie głównej.**

| Element | STARY | NOWY | Słów |
|---|---|---|---|
| H2 | Ile kosztuje wdrożenie AI Agenta dla firmy? | bez zmian | money query, poradnik o kosztach ma poz. 7,8 |
| Lead | Koszt wdrożenia AI Agenta zależy od zakresu. Inaczej wycenia się pojedynczy, gotowy proces (na przykład chatbot odpowiadający na pytania klientów), inaczej pełnego Agenta obsługującego telefon i kalendarz, a inaczej rozwiązanie szyte na miarę. Dokładne widełki podajemy na bezpłatnej diagnozie, kiedy znamy już Twój proces. Diagnoza i wstępna wycena nic nie kosztują. (49) | **Koszt zależy od zakresu. Audyt AI kosztuje 1490 zł i odliczamy go od wdrożenia. Opieka po wdrożeniu to ryczałt godzin, od 3000 zł miesięcznie. Cenę samego wdrożenia podajemy na bezpłatnej diagnozie, kiedy znamy Twój proces.** | 35 |

Źródła obu kwot: `lib/uslugi/audyt-ai.ts` (`minPrice: 1490`, `ramaCeny.tresc`:
„Sprint Diagnostyczny kosztuje 1490 zł”) oraz `lib/uslugi/opieka-ai.ts`
(`minPrice: 3000`, `ramaCeny.tresc`: „10 godzin to 3000 zł miesięcznie”).
**Pokazanie tych kwot na home to DECYZJA PAWŁA** (dziś home nie pokazuje żadnej
ceny, na podstronach obie są jawne).

**Karty cennika: usunąć potrójne powtórzenie.** Dziś wiersz „Oszczędza” ma we
wszystkich trzech kartach ten sam tekst „liczymy na diagnozie”, a „wycena na
diagnozie” powtarza się dwa razy. Trzy karty niosące tę samą informację to
zero informacji.

| Karta | Wiersz STARY | Wiersz NOWY (etykieta „Przykład”) | Link |
|---|---|---|---|
| Start | Oszczędza: liczymy na diagnozie | **Chatbot odpowiadający na pytania z Twojej wiedzy** | /uslugi/chatboty |
| Agent | Oszczędza: liczymy na diagnozie | **Voicebot, który odbiera telefon i zapisuje wizytę w kalendarzu** | /uslugi/voiceboty |
| Na miarę | Oszczędza: liczymy na diagnozie | **Aplikacja webowa albo wtyczka do narzędzia, którego używasz** | /uslugi/rozwiazania |

Wszystkie trzy teksty są parafrazą istniejących zapisów w rejestrach
(`chatboty.ts` ramaCeny: „prosty chatbot odpowiadający na pytania z Twojej
wiedzy”; `voiceboty.ts` tabela: „Sam zapisuje w kalendarzu”; `rozwiazania.ts`
kapsuła: „aplikację webową, wtyczkę do narzędzia, którego używasz”).

Lista 10 usług pod cennikiem (`Oferta.tsx:182-211`) zostaje bez zmian: anchor =
H1 usługi, to już poprawne linkowanie.

### 2.9 NARZĘDZIA (`components/sections/NarzedziaTeaser.tsx`)

| Element | STARY | NOWY | Słów |
|---|---|---|---|
| H2 | Narzędzia | **Policz swoją oszczędność, zanim do nas napiszesz** | 7 |
| Lead | brak | **Pięć darmowych narzędzi bez logowania i bez zostawiania maila. Wynik dostajesz od razu na ekranie.** | 15 |

„Pięć” jest policzalne (`lib/narzedzia/index.ts` ma 5 wpisów). „Bez maila”
i „zero logowania” są wprost w opisach narzędzi w rejestrze.

**Zmiana techniczna:** dodać do `lib/narzedzia/types.ts` pole `tizer: string`
(maks. 25 słów) i renderować je w kafelku zamiast pełnego `opis` (dziś
`generator-promptow` ma 33 słowa, `audyt-strony-ai` 29). Hub /narzedzia zostaje
przy pełnych opisach.

| Slug | STARY opis (słów) | NOWY `tizer` | Słów |
|---|---|---|---|
| kalkulator-oszczednosci | Wpisujesz, ile osób ile godzin tygodniowo traci na powtarzalnej robocie, a kalkulator pokazuje, ile złotych rocznie odzyskasz po automatyzacji. Bez maila, w 10 sekund. (24) | **Wpisujesz, ile godzin tygodniowo traci zespół, a kalkulator pokazuje, ile złotych rocznie odzyskasz. Bez maila, w 10 sekund.** | 19 |
| kalkulator-procesu | Liczy koszt jednego konkretnego procesu rocznie i to, po ilu miesiącach zwróci się dowolne wdrożenie. Koszt wdrożenia podajesz Ty, więc sprawdzisz nim każdą ofertę. (24) | **Liczy roczny koszt jednego procesu i to, po ilu miesiącach zwróci się wdrożenie. Sprawdzisz nim każdą ofertę.** | 18 |
| test-gotowosci-ai | Osiem pytań ocenia cztery rzeczy: procesy, dane, ludzi i pierwszy proces do zdjęcia. Na koniec dostajesz poziom gotowości i trzy konkretne rekomendacje, od czego zacząć. (25) | **Osiem pytań o procesy, dane i ludzi. Na koniec poziom gotowości i trzy rekomendacje, od czego zacząć.** | 17 |
| audyt-strony-ai | Dziesięć pytań o Twojej stronie pokazuje, czy ChatGPT i Perplexity mogą ją cytować. Liczy wynik i wskazuje trzy rzeczy do naprawy najpierw. Nie pobieramy kodu strony, oceniasz ją sam. (29) | **Dziesięć pytań pokazuje, czy ChatGPT i Perplexity mogą cytować Twoją stronę. Dostajesz wynik i trzy rzeczy do naprawy.** | 18 |
| generator-promptow | Wybierasz branżę, zadanie, cel i styl, a generator składa gotowy prompt do skopiowania, taki, który od razu działa w ChatGPT czy Claude. Deterministyczne szablony, zero logowania, zero czekania. Masz gotowy prompt w 30 sekund. (33) | **Wybierasz branżę, zadanie, cel i styl, a generator składa gotowy prompt do ChatGPT albo Claude. Bez logowania, w 30 sekund.** | 20 |

### 2.10 BEZPIECZEŃSTWO (`components/sections/Bezpieczenstwo.tsx`)

Cztery opisy mają 17 do 20 słów, czyli mieszczą się w limicie. **Teksty bez
zmian.** Dwie poprawki:

1. Dodać `id="bezpieczenstwo"` do sekcji (cel linku z paska zaufania, punkt 2.3).
2. Pod siatką dodać jeden link: **Jak przetwarzamy dane → /polityka-prywatnosci**
   (strona jest `live: true` w `lib/site.ts`).

Zasady „każdy kafelek ma rozwinięcie” nie da się tu spełnić bez postawienia
nowej podstrony o bezpieczeństwie. **DECYZJA PAWŁA:** czy stawiamy
/bezpieczenstwo (w `ROUTES` jest zarezerwowane /obowiazek-informacyjny z
`live: false`), czy zostawiamy 4 kafelki bez linków.

### 2.11 DOWÓD (`components/sections/Dowod.tsx`)

Sekcja jest dziś uczciwa (brak realnego case study, `CASE = null`). Zostaje.

| Element | STARY | NOWY |
|---|---|---|
| CTA drugorzędne | brak | **Zobacz realizacje → /realizacje** (strona ma 9 linków wewnętrznych, jest dowodem, a z home nie prowadzi do niej nic z treści tej sekcji) |

### 2.12 GWARANCJA EFEKTU (`components/sections/GwarancjaEfektu.tsx`)

Trzy filary po 18 do 23 słów, mieszczą się w limicie. **Teksty bez zmian.**
Dodać link przy filarze 3 („Rozliczenie za efekt”): **wdrożenie rozliczane za
efekt → /uslugi/architekci-wartosci-ai**.

### 2.13 DOWÓD SPOŁECZNY (`components/sections/DowodSpoleczny.tsx`)

**Sześć cytatów zostaje CO DO ZNAKU.** To słowa klientów, publikowane za ich
zgodą (komentarz w pliku). Nie skracamy i nie poprawiamy cudzych wypowiedzi.

Jedyna zmiana: pod każdym cytatem dodać jedną linię z linkiem do usługi, o
której klient mówi. Mapowanie JUŻ ISTNIEJE w kodzie, w komentarzu przy
`OPINIA_TON` (linie 26 do 33), tylko nie jest użyte jako link.

| Opinia | Link, anchor |
|---|---|
| Kancelaria Prawno-Finansowa (raporty po spotkaniach) | automatyzacja dokumentów i faktur → /uslugi/dokumenty-faktury |
| Turystyka, Mazury (gość pisze o 23:00) | chatbot AI dla firm → /uslugi/chatboty |
| Firma Budowlana (mail idzie sam) | automatyzacja AI dla firm → /uslugi/automatyzacje |
| Hotel i Restauracja (faktury z 6 źródeł) | automatyzacja faktur i OCR → /uslugi/dokumenty-faktury |
| Agencja Marketingowa | narzędzia AI dla firm → /narzedzia |
| Instytut Kryptografii (chatbot po transkrypcjach) | chatbot AI dla firm → /uslugi/chatboty |

To daje 6 linków wewnętrznych z sekcji, która dziś ma jeden („Poznaj
założycieli”), i zasila /uslugi/dokumenty-faktury (66 wyświetleń, poz. 21,8,
tylko 3 linki wewnętrzne).

### 2.14 FAQ (`components/sections/FAQ.tsx` + `faqData.ts`)

**Odpowiedzi zostają 1:1.** Powód twardy: te same stringi idą do FAQPage
JSON-LD (`app/page.tsx:111`), a rozjazd schema kontra treść widoczna jest karany
przez Google. Komentarz w `faqData.ts` mówi o tym wprost.

Zmiana: pod każdą odpowiedzią dodać osobną linię „Więcej:” z linkiem. Ta linia
NIE wchodzi do stringa odpowiedzi, więc schema zostaje nietknięta.

| Pytanie | Link „Więcej” |
|---|---|
| Czy moje dane będą bezpieczne? | /polityka-prywatnosci |
| Ile to kosztuje? | /uslugi/audyt-ai (1490 zł, jedyna jawna cena wejścia) |
| Ile trwa wdrożenie? | /poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy |
| Boję się, że AI zastąpi moich ludzi | /o-nas (wartość: „AI nie zastępuje ludzi”) |
| Już raz przepaliłem budżet na agencję | /uslugi/architekci-wartosci-ai |
| Czym AI Agent różni się od chatbota? | /uslugi/chatboty |
| Jak sprawić, żeby ChatGPT polecał moją firmę? | /uslugi/optymalizacja |
| Czy potrzebuję wiedzy technicznej? | /narzedzia#test-gotowosci-ai |
| Co, jeśli to nie zadziała w mojej firmie? | /uslugi/audyt-ai |

CTA sekcji: STARY „Mam inne pytanie, umów rozmowę” → NOWY **„Mam inne pytanie”
→ /kontakt** (drugorzędne, nie primary, bo primary tej części strony jest w
Gwarancji).

**NIE dodajemy do FAQ home pytania „ile kosztuje stworzenie asystenta AI dla
firmy”** (21 wyświetleń, poz. 7,8), mimo pokusy. To pytanie obsługuje dziś
poradnik na pozycji 7,8 i dokładanie go na home to prosta droga do
kanibalizacji, przed którą ostrzega raport SEO w punkcie 4. Poprawka należy do
poradnika, patrz punkt 3.5.

### 2.15 ŻYWE DEMO (`components/sections/ZyweDemo.tsx`)

Teksty uczciwe („Wersja pokazowa”, „To demo”), zostają. Zmiana CTA:

| Element | STARY | NOWY |
|---|---|---|
| CTA | Chcę takiego Agenta u siebie → /kontakt | **Zobacz, jak działa chatbot AI dla firm → /uslugi/chatboty** (drugorzędne) |

Powód: to przedostatnia sekcja przed finalnym CTA z formularzem. Drugi primary
tuż nad formularzem konkuruje z formularzem. Anchor niesie frazę o 183
wyświetleniach do strony, która jest naszym priorytetem numer jeden.

### 2.16 FINALNE CTA (`components/sections/FinalneCTA.tsx`)

**Bez zmian w treści.** To jedyna sekcja, która dziś ma poprawnie jeden przycisk
i formularz pod nim. Zostaje jako wzorzec.

---

## 3. CZTERY NAJWAŻNIEJSZE PODSTRONY: H1, LEAD I KAPSUŁA

Uwaga o strukturze: szablon usługi (`components/uslugi/ServiceHero.tsx`) nie ma
osobnego pola „lead”. Leadem jest `usluga.kapsula` renderowana pod H1. Dlatego
podaję H1 plus kapsułę (ona jest leadem) plus meta.

Limity: tytuł do 60 znaków ŁĄCZNIE z sufiksem `· SimpleFast.ai` (16 znaków,
dokłada `app/layout.tsx`), opis 140 do 155 znaków, kapsuła 40 do 60 słów.

### 3.1 /uslugi/chatboty (`lib/uslugi/chatboty.ts`)

Priorytet numer 1: 323 wyświetlenia, 2 kliknięcia, poz. 20,7. Same frazy z
naszej piętnastki dają tej stronie 255 wyświetleń miesięcznie.

| Element | STARY | NOWY | Miara |
|---|---|---|---|
| `h1` | Chatbot AI dla firmy | **Chatbot AI dla firm, który odpowiada klientom 24/7** | 20 → 50 zn. |
| `metaTitle` | Chatbot AI dla firmy: wdrożenie 24/7 | **Chatbot AI dla firm: na stronę i 24/7** | 52 → 53 zn. z sufiksem |
| `metaDescription` | Chatbot AI dla firmy: odpowiada klientom 24/7, zbiera leady i uczy się na Twojej wiedzy. Wdrożenie w dni, nie miesiące. Pierwszy krok do Agenta. | **Chatbot AI dla firm: odpowiada na stronie firmowej i w komunikatorach 24/7, zbiera leady, uczy się na Twojej wiedzy. Sprawdź, ile kosztuje.** | 144 → 139 zn. |
| `kapsula` | Chatbot AI dla firmy to asystent, który odpowiada klientom na stronie i w komunikatorach przez całą dobę: tłumaczy ofertę, podaje ceny i godziny, zbiera leady, nawet o 22:00. U nas chatbot to pierwszy krok do Agenta, który nie tylko odpowiada, ale i działa: umawia, zapisuje, przekazuje sprawę dalej. Wdrażamy go w dni, uczymy na Twojej wiedzy, a dane zostają w Unii Europejskiej. | **Chatbot AI dla firm to asystent, który odpowiada klientom na stronie firmowej i w komunikatorach przez całą dobę: tłumaczy ofertę, podaje ceny i godziny, zbiera leady nawet o 22:00. U nas chatbot to pierwszy krok do Agenta, który nie tylko odpowiada, ale też umawia i zapisuje. Wdrażamy w dni, uczymy na Twojej wiedzy, dane zostają w Unii Europejskiej.** | 62 → 58 słów |

Co się zmienia i dlaczego, po kolei:
- „dla firmy” → **„dla firm”** w H1, tytule, opisie i pierwszym zdaniu kapsuły.
  Liczba mnoga ma 183 wyświetlenia (154 plus 29), pojedyncza 35 (34 plus 1).
  Liczba pojedyncza NIE ginie: zostaje w `faq` („Ile kosztuje chatbot AI dla
  firmy?”) i w `queries`.
- **„na stronie firmowej”** w opisie i kapsule: fraza „chatbot na stronę
  firmową” ma 22 wyświetlenia na pozycji 24,2, a słów „na stronę” nie ma dziś
  ani w tytule, ani w H1.
- **„Sprawdź, ile kosztuje”** na końcu opisu: mamy poradnik o kosztach chatbota
  (`lib/poradniki/poradniki/ile-kosztuje-chatbot-dla-firmy-2026.ts`) i sekcję
  „Ile kosztuje wdrożenie chatbota?” na stronie, więc to obietnica z pokryciem.
- Dodać do `queries`: `'chatbot AI dla firm'`, `'chatbot na stronę firmową'`,
  `'ai chatbot dla małej firmy'`, `'kto wdroży chatbota ai dla firmy'`.

Ryzyko: H1 rośnie z 20 do 50 znaków, więc zmienia się rytm hero podstrony.
Ocena wizualna należy do Pawła.

### 3.2 /uslugi/voiceboty (`lib/uslugi/voiceboty.ts`)

> **STOP, NIEAKTUALNE (decyzja D11 z 2026-08-07, PARTIA G1).** Propozycje w tej
> tabeli zawierają „oddzwania do nieodebranych" i „potwierdza wizyty". Właściciel
> firmy zabronił obu: voicebot NIE dzwoni sam i NIE dopisujemy potwierdzania
> wizyt telefonicznie. Nie kopiuj tych zdań do kodu. Obowiązująca treść jest już
> w `lib/uslugi/voiceboty.ts` (bot odbiera połączenia przychodzące, sprawę do
> kontaktu zwrotnego zapisuje i wysyła powiadomienie). Frazy „voicebot" i
> „bot telefoniczny" z tej tabeli zostają w mocy.

Najwięcej wyświetleń (336) i najgorsza pozycja (30,3). Do tego **tylko 3 linki
wewnętrzne**, najmniej ze wszystkich mocnych stron.

| Element | STARY | NOWY | Miara |
|---|---|---|---|
| `h1` | Voicebot dla firmy, który odbiera telefon za Ciebie | **Voicebot dla firm, czyli bot telefoniczny, który odbiera za Ciebie** | 50 → 66 zn. |
| `metaTitle` | Voicebot dla firmy, który odbiera telefon 24/7 | **Voicebot i bot telefoniczny dla firm 24/7** | 62 → 57 zn. z sufiksem (dziś Google ucina) |
| `metaDescription` | Voicebot, czyli bot telefoniczny: odbiera telefon 24/7, rozmawia po polsku, umawia wizyty i oddzwania do nieodebranych. Agent, który załatwia sprawę. | **Voicebot, czyli bot telefoniczny dla firm: odbiera telefon 24/7, umawia i potwierdza wizyty, oddzwania do nieodebranych. Sprawdź, ile kosztuje.** | 149 → 143 zn. |
| `kapsula` | Voicebot, nazywany też botem telefonicznym, to bot głosowy, który odbiera telefon, rozmawia po polsku i załatwia sprawę: umawia wizytę, przyjmuje zgłoszenie, odpowiada na pytanie albo oddzwania do klienta, który nie dodzwonił się za pierwszym razem. Działa 24/7, nawet gdy jesteś u klienta. To nie nagranie ani „wciśnij jeden”. To Agent, który rozmawia i wykonuje zadanie, a potem przekazuje Ci tylko to, co ważne. | **Voicebot dla firm, czyli bot telefoniczny, odbiera telefon, rozmawia po polsku i załatwia sprawę: umawia i potwierdza wizyty, przyjmuje zgłoszenie, oddzwania do klienta, który nie dodzwonił się za pierwszym razem. Działa całą dobę, też gdy jesteś u klienta. To nie nagranie ani „wciśnij jeden”. To Agent, który rozmawia i wykonuje zadanie.** | 67 → 51 słów |

Co się zmienia i dlaczego:
- **„bot telefoniczny” wchodzi do H1 i do tytułu.** Fraza ma 32 wyświetlenia
  i w ostatnim tygodniu weszła na pozycję 16,4, a dziś jest tylko w kapsule,
  w H2 sekcji rozwiązania i w opisie.
- **„dla firm”**: fraza „voicebot dla firm” ma 7 wyświetleń na poz. 16,6.
- **„potwierdza wizyty”** w opisie i kapsule: „voicebot do potwierdzania wizyt”
  ma 29 wyświetleń, a słowa „potwierdza” nie ma dziś w opisie.
- Dodać do `queries`: `'voicebot dla firm'`, `'voicebot do potwierdzania wizyt'`,
  `'voicebot do umawiania wizyt'`, `'bot do odbierania telefonów'`.
- Dodać do `rozwiazanie.tresc` jedno zdanie o potwierdzaniu wizyt (dziś jest
  „umawia termin i zapisuje go w kalendarzu”, brakuje potwierdzenia):
  **„Dzień przed wizytą dzwoni i potwierdza termin, a jeśli klient odwoła,
  zwalnia miejsce w kalendarzu.”** (18 słów). **DECYZJA PAWŁA:** czy voicebot
  realnie to robi. Jeśli nie, zdania nie dopisujemy.

Osobno: raport SEO mówi wprost, że naprawa linkowania da tej stronie
prawdopodobnie więcej niż zmiana tytułu. Kafelki z punktów 2.6 i 2.2 dokładają
jej 2 linki z home. Reszta w planie zespołu 1.

### 3.3 /uslugi/audyt-ai (`lib/uslugi/audyt-ai.ts`)

Najtańszy ruch, jaki mamy: 134 wyświetlenia w 28 dni na pozycji 18 do 25 i
**zero kliknięć**, bo w wyniku wyszukiwania człowiek widzi tytuł, który nie ma
z jego zapytaniem wspólnego ani jednego słowa poza „audyt ai”.

| Element | STARY | NOWY | Miara |
|---|---|---|---|
| `h1` | Audyt AI firmy: mapa oszczędności czasu | **Audyt AI firmy: mapa wąskich gardeł i oszczędności czasu** | 39 → 56 zn. |
| `metaTitle` | Audyt AI firmy: mapa oszczędności czasu | **Audyt AI firmy: mapa wąskich gardeł** | 55 → 51 zn. z sufiksem |
| `metaDescription` | Audyt AI firmy za 1490 zł: rozkładamy procesy i mówimy, gdzie wdrożyć AI z zyskiem, a gdzie odpuścić. Dostajesz Action Plan. Cena odliczana od wdrożenia. | **Audyt AI firmy za 1490 zł: mapa wąskich gardeł i dźwigni szybkiego zwrotu. Dostajesz Action Plan, a cena jest odliczana od wdrożenia.** | 153 → 133 zn. |
| `kapsula` | Audyt AI firmy to płatny Sprint Diagnostyczny za 1490 zł, w którym rozkładamy Twoje procesy na czynniki i pokazujemy, gdzie AI da realny zysk, a gdzie to przepalanie kasy. Dostajesz Action Plan: mapę oszczędności czasu z konkretnymi miejscami do automatyzacji, ułożonymi od największego zwrotu. Cena 1490 zł odliczana jest od wdrożenia, gdy ruszamy z robotą. Najpierw mapa, potem decyzja, dopiero potem wydatek. | **Audyt AI firmy to płatny Sprint Diagnostyczny za 1490 zł: mapa wąskich gardeł i dźwigni szybkiego zwrotu. Rozkładamy Twoje procesy i pokazujemy, gdzie AI da realny zysk, a gdzie to przepalanie kasy. Dostajesz Action Plan ułożony od największego zwrotu. Cenę 1490 zł odliczamy od wdrożenia, gdy ruszamy z robotą.** | 64 → 49 słów |

**WARIANT MOCNIEJSZY (dokładne dopasowanie do zapytania):**
`h1` = „Audyt AI firmy: mapa wąskich gardeł i dźwigni szybkiego zwrotu” (62 zn.).
Za: to jest fraza 1:1 z zapytania o 134 wyświetleniach.
Przeciw: „dźwignie szybkiego zwrotu” to język konsultingowy, obcy dla głosu
marki („mówimy po ludzku, bez żargonu”, `faqData.ts`).
**DECYZJA PAWŁA:** wariant zalecany kontra wariant mocniejszy.

Ważne: dopisanie „wąskich gardeł” niczego nie zmyśla. To dokładnie to, co
robimy, opisane naszymi słowami w `lib/o-nas/content.ts`:
`podejscie.kroki[1].tytul` = „Mapujemy wąskie gardła”.

Dodać do `queries`: `'audyt AI mapa wąskich gardeł'`.

### 3.4 /uslugi/automatyzacje (`lib/uslugi/automatyzacje.ts`)

60 wyświetleń, poz. 24,5, ale fraza „automatyzacja ai dla firm” stoi już na 9,6,
czyli w top 10 z 7 wyświetleniami. Tu wystarczy dołożyć samą frazę.

| Element | STARY | NOWY | Miara |
|---|---|---|---|
| `h1` | Automatyzacja procesów w firmie z AI | **Automatyzacja AI dla firm: procesy, które idą same** | 36 → 50 zn. |
| `metaTitle` | Automatyzacja procesów AI dla firm | **Automatyzacja AI dla firm: procesy bez ręcznej roboty** | 50 → 70 zn. z sufiksem, czyli ZA DŁUGI. Wersja bezpieczna: **Automatyzacja AI dla firm** (41 zn. z sufiksem) |
| `metaDescription` | Automatyzacja procesów AI: przepisywanie danych, potwierdzenia i przypomnienia przejmuje system. Wdrażamy w dni, nie miesiące, a dane zostają w UE. | **Automatyzacja AI dla firm: przepisywanie danych, potwierdzenia i przypomnienia przejmuje system. Wdrażamy w dni, nie miesiące, a dane zostają w UE.** | 148 → 145 zn. |
| `kapsula` | Automatyzacja procesów AI to przejęcie przez system powtarzalnej roboty, którą dziś robi człowiek: przepisywania danych między mailem, arkuszem i fakturą, wysyłania potwierdzeń, pilnowania terminów. Nie sprzedajemy narzędzi. Projektujemy działający proces end-to-end i wdrażamy go w dni, nie w miesiące. Zaczynamy od jednego procesu, który boli najbardziej, a Twoje dane zostają w Unii Europejskiej. | **Automatyzacja AI dla firm to przejęcie przez system powtarzalnej roboty, którą dziś robi człowiek: przepisywania danych między mailem, arkuszem i fakturą, wysyłania potwierdzeń, pilnowania terminów. Nie sprzedajemy narzędzi. Projektujemy automatyzację procesów w firmie od początku do końca i wdrażamy ją w dni, nie w miesiące. Zaczynamy od jednego procesu, a dane zostają w Unii Europejskiej.** | 57 → 56 słów |

Uwaga na kontrakt: stara fraza „automatyzacja procesów w firmie” NIE ginie,
schodzi z H1 do trzeciego zdania kapsuły i zostaje w `queries`. To ważne, bo ta
fraza jest anchorem linków wewnętrznych z home (punkt 2.6).

Zamiana „end-to-end” na „od początku do końca” to czyszczenie żargonu, zgodne
z zasadą z `faqData.ts` („Mówimy po ludzku, bez żargonu”).

Dodać do `queries`: `'automatyzacja AI dla firm'`, `'automatyzacje dla firm'`.

**Alternatywa dla H1 (mniejsze ryzyko):** „Automatyzacja procesów w firmie:
AI dla firm” (44 zn.). Zachowuje dotychczasową frazę na pierwszym miejscu,
dokłada nową na drugim. Brzmi jednak jak lista słów kluczowych, nie jak zdanie.
**DECYZJA PAWŁA.**

### 3.5 Poza czwórką, ale to najtańszy klik w całym planie

`/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy`: pozycja 7,8, czyli top
10, 21 wyświetleń i ZERO kliknięć. Zapytanie brzmi „ile kosztuje stworzenie
**asystenta** ai dla firmy i kto to robi w polsce?”, a my mówimy wyłącznie
o „AI agencie”. Do tego tytuł ma 72 znaki, więc Google go ucina.

Poprawka: dopisać słowo „asystent” do jednego H2 i do opisu, na przykład H2
**„Ile kosztuje asystent AI dla firmy i kto to robi w Polsce?”**. Zero zmian
w ofercie, zero nowych obietnic. Wykonanie: zespół 1 (meta) plus ten plan (H2).

---

## 4. JEDEN SYSTEM CTA

### 4.1 Co jest dziś nie tak (liczby)

- **15 przycisków CTA** w treści home plus 1 w nagłówku.
- **8 różnych etykiet** na jednej stronie.
- **10 z 15** prowadzi na `/kontakt`, choć formularz `DiagnozaForm` stoi na
  home w sekcji `id="diagnoza"`.
- Etykieta „Pokaż mi, gdzie tracę czas” występuje w **14 plikach**: `lib/site.ts`,
  10 plików `lib/uslugi/*.ts`, `components/oferta/DrabinaOfert.tsx`,
  `components/narzedzia/WynikCTA.tsx`, `app/uslugi/architekci-wartosci-ai/page.tsx`
  (dwa razy).
- **Ta sama etykieta, dwa różne cele na jednej podstronie usługi:**
  `ServiceHero.tsx` używa `href={usluga.cta.href}` = `#diagnoza`, a
  `ServiceCTA.tsx` ma na sztywno `href="/kontakt"` i ignoruje `cta.href`.
  Klient klika dwa identyczne przyciski i ląduje w dwóch różnych miejscach.

### 4.2 System docelowy

| Poziom | Etykieta | Cel na home | Cel na podstronach | Wygląd | Gdzie |
|---|---|---|---|---|---|
| **1. GŁÓWNE** | **Umów bezpłatną diagnozę** | `#diagnoza` | `/kontakt` | primary, pełne | Hero, Oferta (karta wyróżniona), GwarancjaEfektu, FinalneCTA. Maks. 4 na stronę, maks. 1 na sekcję |
| **2. DRUGORZĘDNE** | patrz tabela niżej | prowadzi GŁĘBIEJ w stronę, nigdy do formularza | to samo | secondary lub ghost | Hero (2), Problem, Rozwiazanie, Dowod, DowodSpoleczny, FAQ, ZyweDemo, Branze |
| **3. W KARTACH** | brak przycisku | cała karta jest linkiem | to samo | strzałka to dekoracja | PromoUslugi, NarzedziaTeaser, lista usług w Ofercie, produkty |
| **4. NAGŁÓWEK** | **Umów diagnozę** | `/kontakt` | `/kontakt` | pigułka | Header, desktop i menu mobilne. Bez zmian |

Mikrokopia głównego CTA (jedna, wszędzie ta sama, z `HOME_CTA.microcopy`):
**„Bez zobowiązań. Pokażę Ci, gdzie tracisz czas, i dam konkretną listę.
Odpowiadam w kilka minut.”**

### 4.3 Wszystkie CTA drugorzędne na home, w kolejności sekcji

| Sekcja | Etykieta | Cel |
|---|---|---|
| Hero | Policz swoją oszczędność | /narzedzia#kalkulator-oszczednosci |
| Hero | Posłuchaj, jak rozmawia Agent | #demo |
| Problem | Policz to sam w kalkulatorze | /narzedzia#kalkulator-oszczednosci |
| Branze | Zobacz wszystkie usługi | /uslugi |
| Rozwiazanie | Porównaj wszystkie usługi | /uslugi |
| Dowod | Zobacz realizacje | /realizacje |
| DowodSpoleczny | Poznaj założycieli | /o-nas (bez zmian) |
| FAQ | Mam inne pytanie | /kontakt |
| ZyweDemo | Zobacz, jak działa chatbot AI dla firm | /uslugi/chatboty |

Bilans: **15 przycisków i 8 etykiet → 13 przycisków, w tym 4 primary o JEDNEJ
etykiecie i 9 drugorzędnych, z których każdy prowadzi gdzie indziej i nic nie
powtarza.**

### 4.4 Co trzeba zmienić w plikach

| Plik | Zmiana |
|---|---|
| `lib/site.ts` | `HOME_CTA.label`: „Pokaż mi, gdzie tracę czas” → „Umów bezpłatną diagnozę”; `HOME_CTA.href`: `/kontakt` → `#diagnoza`; `HOME_CTA.microcopy` na wersję z punktu 4.2; zaktualizować komentarz „Słowa stałe” (linia 150) |
| `lib/uslugi/*.ts` (10 plików) | `cta.label` → „Umów bezpłatną diagnozę”; dotychczasową etykietę przenieść do `cta.mikrokopia` |
| `lib/uslugi/types.ts` | zaktualizować komentarz przy `cta` (linie 53 i 58), bo dokumentuje starą etykietę jako domyślną |
| `components/uslugi/ServiceCTA.tsx` | zamienić `href="/kontakt"` na `href={cta.href}` albo świadomie zostawić `/kontakt` i zmienić `cta.href` w rejestrze. Dziś dwa przyciski o tej samej etykiecie prowadzą w dwa różne miejsca |
| sekcje home | podmiana etykiet i celów wg tabel 4.2 i 4.3 |

**DECYZJA PAWŁA:** zmiana głównej etykiety CTA łamie zapisany kontrakt „Słowa
stałe” z `lib/site.ts` i `lib/uslugi/types.ts`. Brief zespołu 4 wskazuje
„Umów bezpłatną diagnozę” jako główne CTA, ale to jest nadpisanie wcześniejszej
decyzji, więc nie robimy tego bez potwierdzenia. Wariant kompromisowy: przycisk
mówi „Umów bezpłatną diagnozę”, a mikrokopia zachowuje „Pokażę Ci, gdzie tracisz
czas” i głos marki nie ginie.

---

## 5. LISTA DECYZJI PAWŁA (nic z tego nie wykonujemy sami)

| # | Decyzja | Co zmienia | Rekomendacja zespołu 4 |
|---|---|---|---|
| 1 | H1 strony głównej | „Budujemy AI Agentów, nie chatboty.” zostaje czy dostaje „dla firm” | Zostawić. Home nie walczy o żadną frazę komercyjną, a H1 to element LCP (maszyna pisania) |
| 2 | Główna etykieta CTA | „Pokaż mi, gdzie tracę czas” → „Umów bezpłatną diagnozę” w 14 plikach | Zmienić przycisk, zostawić stare słowa w mikrokopii |
| 3 | Cel CTA na home | `/kontakt` → `#diagnoza` (formularz jest na tej samej stronie) | Zmienić. Dziś 10 z 15 CTA wyprowadza z home nad formularz, który już tam jest |
| 4 | Ceny na stronie głównej | Pokazać 1490 zł (audyt) i od 3000 zł (opieka) w sekcji Oferta | Pokazać. To jedyne realne liczby, jakie mamy, i są już jawne na podstronach |
| 5 | Statystyka w sekcji Problem | „Większość małych firm traci kilkanaście godzin tygodniowo” | Usunąć albo podać źródło. Dziś to liczba bez pokrycia |
| 6 | H1 audytu | Wariant zalecany kontra dokładne dopasowanie z „dźwignią szybkiego zwrotu” | Wariant zalecany, bo drugi brzmi jak konsulting, nie jak my |
| 7 | Nazwanie Messengera | „w komunikatorach” → „na stronie i w Messengerze” | Tylko jeśli realnie wdrażamy Messengera. To deklaracja integracji |
| 8 | Zdanie o potwierdzaniu wizyt przez voicebota | Nowe zdanie w `rozwiazanie.tresc` | Tylko jeśli voicebot to robi. Fraza ma 29 wyświetleń, ale obietnica bez pokrycia jest droższa |
| 9 | Hero: 3 przyciski czy 2 | Redukcja rzędu CTA w hero | Zostawić 3, ale z poprawionymi celami. Usuwanie elementów hero bez zgody Pawła jest zakazane |
| 10 | Podstrona o bezpieczeństwie | Czy stawiamy /bezpieczenstwo, żeby 4 kafelki miały rozwinięcie | Na razie nie. Wystarczy link do polityki prywatności |
| 11 | H1 automatyzacji | „Automatyzacja AI dla firm: procesy, które idą same” kontra wersja z zachowaną starą frazą | Wersja nowa, stara fraza schodzi do kapsuły |

---

## 6. KOLEJNOŚĆ WYKONANIA (od najtańszego zysku)

| # | Zadanie | Pliki | Zysk z danych | Czas |
|---|---|---|---|---|
| 1 | „wąskie gardła” w H1, tytule, opisie i kapsule audytu | `lib/uslugi/audyt-ai.ts` | 134 wyświetlenia/mc przy zerowym CTR | 15 min |
| 2 | Liczba mnoga „dla firm” plus „na stronę firmową” w chatbotach | `lib/uslugi/chatboty.ts` | 205 wyświetleń/mc, poz. 14,4 i rośnie | 20 min |
| 3 | „bot telefoniczny” i „dla firm” w voicebotach | `lib/uslugi/voiceboty.ts` | 68 wyświetleń/mc, poz. 16,4 w ostatnim tygodniu | 20 min |
| 4 | Linki w kafelkach `POTRAFI` i w opiniach klientów | `Rozwiazanie.tsx`, `DowodSpoleczny.tsx` | 10 nowych linków wewnętrznych, w tym pierwszy w historii link do /produkty | 45 min |
| 5 | Jeden system CTA | `lib/site.ts`, 10 plików usług, sekcje home, `ServiceCTA.tsx` | skarga Pawła nr 1, plus koniec rozjazdu dwóch celów pod tą samą etykietą | 1,5 h |
| 6 | Pole `kafelek` w usługach i `tizer` w narzędziach plus nowe teksty | `lib/uslugi/types.ts`, 3 pliki usług, `lib/narzedzia/*` | koniec pokazywania tekstu meta jako treści karty | 1 h |
| 7 | Teksty sekcji home wg punktu 2 | `components/sections/*.tsx` | skargi Pawła nr 1, 4 i 7 | 2 h |
| 8 | „asystent AI” w poradniku o kosztach | `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts` | 21 wyświetleń na poz. 7,8 przy zerowym CTR | 15 min |
| 9 | Automatyzacje: nowy H1 i kapsuła | `lib/uslugi/automatyzacje.ts` | 10 wyświetleń, ale poz. 9,6, czyli próg top 10 | 20 min |

---

## 7. KRYTERIUM ODBIORU TEGO PLANU

Po wdrożeniu da się sprawdzić, że zrobione DOBRZE, a nie tylko że się kompiluje:

1. `grep -c "dla firm"` w `lib/uslugi/chatboty.ts` zwraca co najmniej 4
   (H1, metaTitle, metaDescription, kapsuła).
2. `grep "wąskich gardeł"` w `lib/uslugi/audyt-ai.ts` zwraca co najmniej 3 trafienia.
3. `grep "bot telefoniczny"` w `lib/uslugi/voiceboty.ts` trafia w `h1` i `metaTitle`.
4. Żadna nowa kwota na stronie nie ma innego źródła niż `minPrice` lub
   `ramaCeny.tresc` w rejestrze.
5. Na home nie ma dwóch przycisków primary o różnych etykietach.
6. Każdy kafelek na home ma link, a docelowy URL zwraca 200.
7. Żaden nowy tekst nie zawiera znaku em-dash.
8. Teksty odpowiedzi FAQ są co do znaku identyczne z FAQPage JSON-LD.
9. Cytaty klientów w `DowodSpoleczny.tsx` są co do znaku takie jak dziś.
10. Każdy kafelek ma maksymalnie 25 słów, każda kapsuła 40 do 60 słów.

---

## 8. CZEGO NIE ZWERYFIKOWAŁEM

- **NIEZWERYFIKOWANE: renderowanie tych tekstów na żywej stronie.** Faza jest
  analityczna, przeglądarka zajęta przez rundę wdrożeniową, nie uruchamiałem
  builda ani dev servera. Wszystkie liczby znaków i słów policzone z tekstu.
- **NIEZWERYFIKOWANE: czy kotwice `/narzedzia#<slug>` działają.** Opieram się na
  komentarzu w `NarzedziaTeaser.tsx` („sekcje hubu mają id={slug}”), nie na
  otwartej stronie. Przed wdrożeniem linków z hero i sekcji Problem sprawdzić
  `app/narzedzia/page.tsx`.
- **NIEZWERYFIKOWANE: czy voicebot realnie potwierdza wizyty dzień przed.**
  Stąd oznaczenie DECYZJA PAWŁA przy punkcie 3.2.
- **NIEZWERYFIKOWANE: skutek zmian w GSC.** Przecrawlowanie po zmianie tytułów
  zajmuje Google od 1 do 3 tygodni. Pierwszy sensowny pomiar: 14 dni po wdrożeniu,
  przez `tools/gsc-raport.js`.
- Nie zmieniłem ani jednego pliku kodu. Jedyny plik zapisany przez ten przebieg
  to ten plan.

Pełna ścieżka:
`C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\raporty\plan-copy.md`
