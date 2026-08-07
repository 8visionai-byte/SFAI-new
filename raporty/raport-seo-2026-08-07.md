# Raport SEO simplefast.ai (2026-08-07)

Kontynuacja raportu `raporty/raport-seo-2026-08-06.md`. Nie powtarzam tamtych
ustaleń, pokazuję co się zmieniło i co robić dalej.

**Skąd dane (wszystko pobrane dzisiaj, tylko odczyt):**

- Google Search Console przez konto usługi: `tools/gsc-raport.js`,
  `tools/gsc-strony-zapytania.js` plus dodatkowe zapytania do tego samego API
  (zapytanie x strona, dzień po dniu, urządzenia, kraje).
  Klucz: `C:\Users\Paweł Pieloch\.sekrety\simplefastai-seo-e271ff1f5e28.json`
  (treść klucza nie trafia do raportu ani do repo).
- Bing Webmaster API: `tools/bing-raport.js` plus metody `GetCrawlStats`,
  `GetQueryStats`, `GetPageStats`, `GetLinkCounts`, `GetUrlSubmissionQuota`.
  Klucz: `C:\Users\Paweł Pieloch\.sekrety\bing-api-key.txt`.
- Własny przelot po 46 adresach z `https://www.simplefast.ai/sitemap.xml`
  (tytuł, opis, canonical, liczba H1, linki wewnętrzne z sekcji `<main>`).
- Kod: `lib/site.ts`, `app/layout.tsx`, `app/page.tsx`, `lib/metadata.ts`,
  `lib/uslugi/*.ts`.

Okres GSC: **2026-07-08 do 2026-08-05** (API ma 2 dni opóźnienia).

---

## 1. Co pokazują dane

### 1.1 Liczby ogólne

| Miara | Ostatnie 28 dni | Poprzednie 28 dni | Zmiana |
|---|---|---|---|
| Kliknięcia | 19 | 18 | +1 |
| Wyświetlenia | 1111 | 149 | x7,5 |
| CTR | 1,71% | 12,08% | w dół |
| Średnia pozycja | 22,3 | 14,7 | w dół |
| Fraz z wyświetleniami | 67 | mniej | rośnie |
| Stron z wyświetleniami | 23 (z 46 w sitemapie) | mniej | rośnie |

Spadek CTR i średniej pozycji **nie jest regresem**. Miesiąc temu byliśmy
widoczni prawie wyłącznie na własną markę (fraza „simple fast ai", pozycja 1,
wysoki CTR). Teraz Google zaczął nas pokazywać na setki zapytań komercyjnych,
na razie na dalekich pozycjach. Średnia się rozjechała, bo doszła długa lawa
nowych fraz. To normalny etap.

Ważniejszy jest trend dzienny, który idzie w dobrą stronę:

| Dni | Średnia pozycja |
|---|---|
| 8 do 14 lipca | 25 do 33 |
| 21 do 27 lipca | 19 do 26 |
| 30 lipca do 5 sierpnia | 13,7 do 16,8 |

Poprawa o mniej więcej 10 pozycji w trzy tygodnie, przy rosnącej liczbie fraz.

### 1.2 Top zapytania (28 dni, wg wyświetleń)

| Zapytanie | Wyśw. | Klik. | Pozycja | Strona, która się wyświetla |
|---|---|---|---|---|
| chatbot ai dla firm | 154 | 1 | 21,0 | /uslugi/chatboty |
| audyt ai: mapa wąskich gardeł i dźwigni szybkiego zwrotu | 68 | 0 | 18,3 | /uslugi/audyt-ai |
| audyt ai mapa waskich gardeł i dzwigni szybkiego zwrotu | 66 | 0 | 24,7 | /uslugi/audyt-ai |
| voicebot | 35 | 0 | 43,9 | /uslugi/voiceboty |
| chatbot dla firmy | 34 | 0 | 12,0 | /uslugi/chatboty |
| bot telefoniczny | 32 | 0 | 26,4 | /uslugi/voiceboty |
| voicebot do obsługi klienta | 30 | 0 | 51,8 | /uslugi/voiceboty |
| chatbot dla firm | 29 | 0 | 21,1 | /uslugi/chatboty |
| voicebot do potwierdzania wizyt | 29 | 0 | 43,1 | /uslugi/voiceboty |
| obsługa klienta 24/7 przez voicebota | 26 | 0 | 38,0 | /uslugi/voiceboty |
| chatbot na stronę firmową | 22 | 0 | 24,2 | /uslugi/chatboty |
| voicebot windykacja | 22 | 0 | 35,4 | /uslugi/voiceboty |
| ile kosztuje stworzenie asystenta ai dla firmy i kto to robi w polsce? | 21 | 0 | 7,8 | /poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy |
| voicebot cena | 17 | 0 | 37,1 | /uslugi/voiceboty |
| audyt ai | 15 | 0 | 27,2 | /uslugi/audyt-ai |
| automatyzacja faktur | 15 | 0 | 31,9 | /uslugi/dokumenty-faktury |
| simple fast ai (marka) | 14 | 7 | 1,0 | / |

Dwie rzeczy warte uwagi.

**Pierwsza: nie ma kanibalizacji.** Sprawdziłem to wprost (wymiar zapytanie plus
strona). Każda ważna fraza ma przypisaną jedną, właściwą stronę. „chatbot ai dla
firm" obsługuje `/uslugi/chatboty`, nie strona główna. To istotne dla decyzji
o H1 na home (punkt 4).

**Druga: fraza „audyt ai: mapa wąskich gardeł i dźwigni szybkiego zwrotu"
(łącznie 134 wyświetlenia w dwóch pisowniach) nie występuje nigdzie na naszej
stronie.** Sprawdziłem repo i historię gita, nie ma jej ani w tytule, ani w H1,
ani w treści. Google sam dopasowuje do niej `/uslugi/audyt-ai` na pozycji 18 do
25, ale zero kliknięć, bo w wynikach widać zupełnie inny tytuł. To najtańszy do
zebrania ruch, jaki mamy.

### 1.3 Top strony (28 dni)

| Strona | Wyśw. | Klik. | Średnia pozycja |
|---|---|---|---|
| /uslugi/voiceboty | 336 | 4 | 30,3 |
| /uslugi/chatboty | 323 | 2 | 20,7 |
| /uslugi/audyt-ai | 166 | 0 | 21,6 |
| /uslugi/dokumenty-faktury | 66 | 0 | 21,8 |
| / | 60 | 11 | 5,0 |
| /uslugi/automatyzacje | 60 | 0 | 24,5 |
| /poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy | 35 | 0 | 8,0 |
| /produkty | 19 | 0 | 2,4 |
| /uslugi/rozwiazania | 19 | 0 | 6,0 |
| /uslugi/strony-www | 19 | 0 | 22,3 |
| /narzedzia | 17 | 0 | 4,2 |
| /uslugi | 16 | 0 | 14,3 |
| /o-nas | 15 | 0 | 4,5 |

Cały ruch komercyjny robią cztery strony usług. Strona główna zbiera markę.

### 1.4 Gdzie jesteśmy blisko pierwszej dziesiątki (największy potencjał)

Pozycje 11 do 20 to miejsce, gdzie mały ruch daje duży efekt: wejście do top 10
zwykle mnoży kliknięcia kilkukrotnie.

| Zapytanie | Wyśw. | Pozycja 28 dni | Pozycja ostatnie 7 dni | Strona |
|---|---|---|---|---|
| chatbot ai dla firm | 154 | 21,0 | **14,4** | /uslugi/chatboty |
| audyt ai: mapa wąskich gardeł i dźwigni... | 68 | 18,3 | ten sam poziom | /uslugi/audyt-ai |
| chatbot dla firmy | 34 | 12,0 | 6,8 | /uslugi/chatboty |
| bot telefoniczny | 32 | 26,4 | **16,4** | /uslugi/voiceboty |
| chatbot dla firm | 29 | 21,1 | 15,5 | /uslugi/chatboty |
| kto wdroży chatbota ai dla firmy | 8 | 12,6 | 12,4 | /uslugi/chatboty |
| ai chatbot dla małej firmy | 8 | 17,8 | 18,3 | /uslugi/chatboty |
| automatyzacja ai dla firm | 7 | 9,6 | 9,5 | /uslugi/automatyzacje |
| voicebot dla firm | 7 | 16,6 | brak danych | /uslugi/voiceboty |
| bot do odbierania telefonów | 6 | 16,2 | brak danych | /uslugi/voiceboty |
| rozwiązania na zamówienie | 5 | 12,4 | 12,4 | /uslugi/rozwiazania |
| voicebot do umawiania wizyt | 3 | 17,3 | brak danych | /uslugi/voiceboty |
| automatyzacje dla firm | 3 | 15,3 | brak danych | /uslugi/automatyzacje |

Razem to około 350 wyświetleń miesięcznie tuż pod progiem. Priorytet numer jeden
to `/uslugi/chatboty` (ponad 230 wyświetleń w tym przedziale), numer dwa
`/uslugi/audyt-ai`, numer trzy `/uslugi/voiceboty`.

### 1.5 Wyświetlenia bez kliknięć (problem tytułu albo opisu)

Tu jesteśmy wysoko, a i tak nikt nie klika. To nie kwestia pozycji, tylko tego,
co widać w wynikach wyszukiwania.

| Zapytanie | Wyśw. | Pozycja | Klik. | Co to znaczy |
|---|---|---|---|---|
| ile kosztuje stworzenie asystenta ai dla firmy i kto to robi w polsce? | 21 | 7,8 | 0 | Jesteśmy w top 10, tytuł poradnika mówi „AI agenta", pytanie mówi „asystenta" |
| audyt ai: mapa wąskich gardeł i dźwigni... | 134 | 18 do 25 | 0 | Tytuł strony w ogóle nie zawiera frazy z zapytania |
| chatbot dla firmy | 34 | 12,0 | 0 | Próg top 10, tytuł ma „dla firmy", brakuje mocnego haka na klik |
| cytowalność w chatgpt | 7 | 4,6 | 0 | Wysoko, ale bardzo mały wolumen |
| automatyzacja ai dla firm | 7 | 9,6 | 0 | Top 10, opis nie odpowiada na intencję „ile to trwa i kosztuje" |
| voicebot dla firmy | 1 | 2,0 | 0 | Pozycja 2 i zero kliknięć, próbka za mała, ale warto pilnować |

### 1.6 Urządzenia i kraje

| Urządzenie | Wyśw. | Klik. | CTR | Pozycja |
|---|---|---|---|---|
| Desktop | 875 | 10 | 1,14% | 24,6 |
| Mobile | 207 | 9 | 4,35% | 13,4 |
| Tablet | 29 | 0 | 0% | 16,4 |

Na telefonach stoimy o 11 pozycji wyżej i mamy prawie 4 razy lepszy CTR. Ruch
Polska: 1034 wyświetlenia i 16 z 19 kliknięć. Reszta to szum zagraniczny.

---

## 2. Bing: stan faktyczny

| Co | Wartość |
|---|---|
| Wyświetlenia w Bing (56 dni historii) | 1 (28 lipca), poza tym zero |
| Kliknięcia | 0 |
| Stron w indeksie Bing | 34 |
| Adresów w naszej sitemapie | 46 |
| Stron przecrawlowanych 2026-08-06 | 24 (dzień wcześniej 10) |
| Zablokowane przez robots.txt | 0 |
| Błędy crawla (`GetCrawlIssues`) | brak |
| Linki przychodzące, które widzi Bing | 7 |
| Statystyki zapytań i stron w Bing | puste tablice, czyli zero ruchu |
| Limit zgłoszeń URL | 10 000 dziennie, 250 000 miesięcznie |

Wniosek: technicznie w Bingu jest czysto. Bing nas indeksuje (skok crawla z 10
na 24 strony dnia 6 sierpnia to efekt wczorajszego pinga IndexNow, który zwrócił
202). Problem jest inny: Bing bardzo mocno waży linki zewnętrzne, a widzi ich
u nas siedem. Do tego 12 adresów z sitemapy wciąż nie ma w jego indeksie.

Co z tym zrobić:

1. Odpalać `node tools/indexnow-ping.js` po każdym wdrożeniu treści. To jedna
   komenda, limit zgłoszeń jest praktycznie nieograniczony.
2. W panelu Bing Webmaster Tools sprawdzić raz w tygodniu, czy liczba stron
   w indeksie rośnie w stronę 46.
3. Bing to na dziś zero ruchu i takie zostanie, dopóki nie urośnie profil
   linków. Nie inwestować w niego osobno, jechać na tym samym paliwie co Google.

---

## 3. Rekomendacje dla ważnych stron

Zasady, które stosuję: tytuł do 60 znaków łącznie z sufiksem `· SimpleFast.ai`
(16 znaków dokłada szablon z `app/layout.tsx`), opis 140 do 155 znaków, fraza
z danych na początku, zero em-dash.

**Nie zmieniałem żadnego pliku. To są propozycje do Twojej decyzji.**

### 3.1 Strona główna (`app/page.tsx`, H1 z `lib/site.ts`)

| Element | Obecnie | Propozycja | Znaki |
|---|---|---|---|
| Title | SimpleFast.ai: budujemy AI Agentów dla firm | SimpleFast.ai: AI Agenci, chatboty i voiceboty dla firm | 43 na 55 |
| Description | Budujemy AI Agentów dla polskich firm: voiceboty odbierają telefony, chatboty odpisują klientom, automatyzacje pilnują faktur. Dane w UE, płacisz za efekt. | Budujemy AI Agentów dla firm: voicebot odbiera telefony, chatbot AI odpisuje klientom, automatyzacja pilnuje faktur. Dane w UE, płacisz za efekt. | 155 na 145 |
| H1 | Budujemy AI Agentów, nie chatboty. | patrz punkt 4 | 34 |

Uzasadnienie: strona główna nie walczy dziś o żadną frazę komercyjną, obsługuje
markę (pozycja 1, CTR 18%). Tytuł ma 43 znaki, czyli marnujemy około 17 znaków
widocznych w wyniku. Dołożenie słów „chatboty" i „voiceboty" pomaga na zapytania
markowe typu „simple fast ai chatbot" i wzmacnia encję firmy dla modeli AI.
To zmiana o niskim ryzyku i o niskim priorytecie. Zysk będzie mały.

### 3.2 `/uslugi/chatboty` (plik `lib/uslugi/chatboty.ts`)

| Element | Obecnie | Propozycja | Znaki |
|---|---|---|---|
| Title (metaTitle) | Chatbot AI dla firmy: wdrożenie 24/7 | Chatbot AI dla firm: na stronę i 24/7 | 52 na 53 z sufiksem |
| Description | Chatbot AI dla firmy: odpowiada klientom 24/7, zbiera leady i uczy się na Twojej wiedzy. Wdrożenie w dni, nie miesiące. Pierwszy krok do Agenta. | Chatbot AI dla firm: odpowiada na stronie i w Messengerze 24/7, zbiera leady, uczy się na Twojej wiedzy. Wdrożenie w dni. Sprawdź, ile kosztuje. | 144 na 144 |
| H1 | Chatbot AI dla firmy | Chatbot AI dla firm, który odpowiada klientom 24/7 | 20 na 50 |

Uzasadnienie z danych: liczba mnoga „dla firm" ma u nas 154 plus 29 wyświetleń,
liczba pojedyncza „dla firmy" 34 plus 1. Dziś tytuł i H1 mają wyłącznie wersję
pojedynczą. Do tego „chatbot na stronę firmową" ma 22 wyświetlenia na pozycji
24, a słowa „na stronę" nie ma ani w tytule, ani w H1. Końcówka opisu „Sprawdź,
ile kosztuje" celuje w intencję cenową, bo mamy poradnik o kosztach chatbota
i sekcję „Ile kosztuje wdrożenie chatbota?" na stronie.

Ryzyko: H1 rozbudowany z 20 do 50 znaków zmienia rytm strony usługi. Do Twojej
oceny wizualnej.

### 3.3 `/uslugi/voiceboty` (plik `lib/uslugi/voiceboty.ts`)

> **STOP, NIEAKTUALNE (decyzja D11 z 2026-08-07, PARTIA G1).** Propozycja opisu
> zawiera „oddzwania do nieodebranych" i „potwierdza wizyty". Właściciel firmy
> zabronił obu: voicebot NIE dzwoni sam, nie dopisujemy też potwierdzania wizyt
> telefonicznie przez bota. Nie kopiuj tych zdań do kodu. Rekomendacje SEO co do
> fraz „voicebot" i „bot telefoniczny" oraz liczby mnogiej „dla firm" zostają
> w mocy.

| Element | Obecnie | Propozycja | Znaki |
|---|---|---|---|
| Title (metaTitle) | Voicebot dla firmy, który odbiera telefon 24/7 | Voicebot i bot telefoniczny dla firm 24/7 | 62 na 57 z sufiksem |
| Description | Voicebot, czyli bot telefoniczny: odbiera telefon 24/7, rozmawia po polsku, umawia wizyty i oddzwania do nieodebranych. Agent, który załatwia sprawę. | Voicebot, czyli bot telefoniczny dla firm: odbiera telefon 24/7, umawia i potwierdza wizyty, oddzwania do nieodebranych. Sprawdź, ile kosztuje. | 149 na 143 |
| H1 | Voicebot dla firmy, który odbiera telefon za Ciebie | Voicebot dla firm, czyli bot telefoniczny, który odbiera za Ciebie | 50 na 66 |

Uzasadnienie z danych: to nasza strona z największą liczbą wyświetleń (336),
ale i najgorszą pozycją (30,3). Fraza „bot telefoniczny" ma 32 wyświetlenia
i w ostatnim tygodniu weszła na pozycję 16,4, a nie ma jej w tytule (jest tylko
w opisie i w treści). „voicebot do potwierdzania wizyt" ma 29 wyświetleń,
a słowa „potwierdza" brakuje w opisie. Obecny tytuł ma 62 znaki, czyli Google
go przycina.

Osobno: `/uslugi/voiceboty` ma tylko **3 linki wewnętrzne** z treści innych
stron. To najsłabiej podlinkowana z naszych mocnych stron. Naprawa tego da
prawdopodobnie więcej niż zmiana tytułu.

### 3.4 `/uslugi/audyt-ai` (plik `lib/uslugi/audyt-ai.ts`)

| Element | Obecnie | Propozycja | Znaki |
|---|---|---|---|
| Title (metaTitle) | Audyt AI firmy: mapa oszczędności czasu | Audyt AI firmy: mapa wąskich gardeł | 55 na 51 z sufiksem |
| Description | Audyt AI firmy za 1490 zł: rozkładamy procesy i mówimy, gdzie wdrożyć AI z zyskiem, a gdzie odpuścić. Dostajesz Action Plan. Cena odliczana od wdrożenia. | Audyt AI firmy za 1490 zł: mapa wąskich gardeł i dźwigni szybkiego zwrotu. Dostajesz Action Plan, a cena jest odliczana od wdrożenia. | 153 na 133 |
| H1 | Audyt AI firmy: mapa oszczędności czasu | Audyt AI firmy: mapa wąskich gardeł i oszczędności czasu | 39 na 56 |

Uzasadnienie z danych: to najbardziej oczywista poprawka w całym raporcie.
Fraza „audyt ai: mapa wąskich gardeł i dźwigni szybkiego zwrotu" daje nam 134
wyświetlenia w 28 dni na pozycji 18 do 25 i **zero kliknięć**, bo w wyniku
wyszukiwania człowiek widzi tytuł, który nie ma z jego zapytaniem ani jednego
wspólnego słowa poza „audyt ai". Wystarczy, że fraza pojawi się w tytule, opisie
i H1, żeby i pozycja, i CTR ruszyły. Dopisanie „wąskich gardeł" nie zmienia
niczego w ofercie, bo dokładnie to robimy w Sprincie Diagnostycznym (patrz
`public/wiedza-agenta.txt`, krok 2: „mapujemy wąskie gardła").

### 3.5 Poza zakresem pytania, ale warto

`/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy`: pozycja 7,8 przy 21
wyświetleniach i zero kliknięć. Zapytanie brzmi „ile kosztuje stworzenie
asystenta ai dla firmy i kto to robi w polsce?", a nasz tytuł mówi o „AI
agenta". Dopisanie słowa „asystent" w H2 albo w opisie powinno domknąć ten
rozjazd. Tytuł ma też 72 znaki, czyli Google go ucina.

---

## 4. H1 strony głównej: decyzja Pawła

Obecny H1 to `POSITIONING.claim` z `lib/site.ts`, renderowany przez maszynę
pisania w `components/sections/Hero.tsx`: **„Budujemy AI Agentów, nie
chatboty."** (34 znaki).

### Najpierw korekta założenia z briefu

W spec pojawiła się myśl: „fraza chatbot ai dla firm ma u nas 154 wyświetlenia
i pozycję 21, więc może H1 na home powinien zawierać dla firm". Sprawdziłem to
wprost w danych (wymiar zapytanie plus strona):

> te 154 wyświetlenia w całości należą do **/uslugi/chatboty**, nie do strony
> głównej. Strona główna nie wyświetla się na tę frazę ani razu.

Czyli zmiana H1 na home nie ruszy tej frazy. Mogłaby za to zrobić coś złego:
gdyby home zaczął konkurować o „chatbot dla firm", Google dostałby dwie nasze
strony na jedno zapytanie i musiałby wybierać, a dziś ma czysty sygnał.

### Trzy warianty

| Wariant | H1 | Za | Przeciw |
|---|---|---|---|
| **A. Zostaw jak jest** (rekomendacja) | Budujemy AI Agentów, nie chatboty. | Sygnatura marki, kategoria „AI Agent" jest naszym różnicownikiem, słowo „firm" jest już w title i w opisie, brak ryzyka kanibalizacji, brak ryzyka dla LCP maszyny pisania | Nie zawiera frazy „dla firm" w samym H1 |
| **B. Dopisz „dla firm"** | Budujemy AI Agentów dla firm, nie chatboty. | Fraza „dla firm" ląduje w najmocniejszym nagłówku, brzmienie marki zostaje | H1 rośnie z 34 do 43 znaków, czyli maszyna pisania pisze dłużej (LCP na mobile to dziś nasz sufit), a zysk SEO jest teoretyczny, bo home i tak nie walczy o tę frazę |
| **C. Wersja hasłowa** | AI Agenci dla firm. Nie chatboty. | Krótko (33 znaki), fraza w H1, LCP bez zmian | Traci czasownik „budujemy", czyli kawałek tonu marki, i brzmi bardziej jak slogan reklamowy |

### Rekomendacja

**Wariant A, czyli zostaw H1 bez zmian.** Powody, po kolei:

1. Dane nie pokazują żadnej frazy komercyjnej, którą traci strona główna.
   Wszystkie money queries obsługują strony usług i robią to poprawnie.
2. Słowo „firm" i tak jest w tytule strony głównej i w opisie, czyli w tych
   dwóch miejscach, które Google pokazuje w wynikach.
3. H1 jest tu sygnaturą marki plus animacją, którą sam zamawiałeś. Zmiana
   dotyka LCP na mobile (pamięć projektu: maszyna pisania to nasz element LCP).
4. Jeśli już chcesz frazę w H1, wariant B jest bezpieczniejszy niż C, bo nie
   rusza tonu. Ale to zmiana kosmetyczna dla SEO, nie dźwignia.

**Ryzyka każdej zmiany H1:** to jednocześnie sygnatura marki, tekst maszyny
pisania i element LCP. Dłuższy tekst to dłuższa animacja i wolniejszy LCP na
telefonie. Dlatego **nie zmieniłem tu ani jednej linii kodu**, decyzja jest
Twoja.

---

## 5. Techniczne znaleziska z dzisiejszego przelotu po 46 adresach

To sprawdzone na żywej stronie, nie na kodzie.

**Dobre wiadomości:**

- Wszystkie 46 adresów z sitemapy zwracają 200.
- Każdy canonical wskazuje sam na siebie, wersja www. Fix z 6 sierpnia działa,
  potwierdzone na produkcji na wszystkich 46 stronach. To był największy błąd
  z poprzedniego raportu i jest zamknięty.
- Każda strona ma dokładnie jeden H1.
- Strony usług mają schema FAQPage.

**Do poprawy:**

1. **16 tytułów przekracza 65 znaków** i Google je ucina. Winowajcą jest sufiks
   `· SimpleFast.ai` (16 znaków), który dokłada szablon z `app/layout.tsx`:
   `/uslugi/architekci-wartosci-ai` (72), `/produkty` (67), `/wiedza` (74),
   `/poradniki` (69), `/ai-radar` (78), `/materialy` (66),
   `/uslugi/rozwiazania` (73), `/uslugi/optymalizacja` (71) oraz 8 wpisów
   w `/poradniki/*` i `/materialy/*` (66 do 72).
2. **10 opisów przekracza 160 znaków**: `/uslugi` (175),
   `/uslugi/architekci-wartosci-ai` (180), `/narzedzia` (171), `/produkty`
   (191), `/wiedza` (161), `/poradniki` (166), `/ai-radar` (173), `/materialy`
   (169), `/kontakt` (174), `/polityka-prywatnosci` (184). Strony usług są już
   w normie (144 do 153 znaków), więc problem został tylko na hubach.
3. **Linkowanie wewnętrzne jest cienkie.** Policzone z sekcji `<main>`, bez
   nagłówka i stopki, unikalne strony źródłowe:

| Strona docelowa | Linki wewnętrzne z treści |
|---|---|
| /kontakt | 36 |
| /uslugi | 11 |
| /realizacje | 9 |
| /uslugi/chatboty | 7 |
| /uslugi/automatyzacje | 7 |
| /uslugi/audyt-ai | 5 |
| /uslugi/voiceboty | 3 |
| /uslugi/dokumenty-faktury | 3 |
| /produkty | 0 |

   Do tego 21 stron (wszystkie realizacje, wpisy blogowe, poradniki i materiały)
   ma dokładnie jeden link przychodzący, czyli tylko ze swojego huba.
   `/produkty` nie ma ani jednego linku z treści, jest wyłącznie w menu.

---

## 6. Plan na 30 dni, w kolejności wpływu

| # | Zadanie | Dlaczego to, dlaczego teraz | Ile roboty |
|---|---|---|---|
| 1 | Wpleść frazę „wąskie gardła" w tytuł, opis i H1 `/uslugi/audyt-ai` (punkt 3.4) | 134 wyświetlenia miesięcznie na pozycji 18 do 25 z zerowym CTR, bo tytuł nie zawiera ani jednego słowa z zapytania. Najtańszy ruch, jaki mamy | 15 minut |
| 2 | Poprawić tytuł, opis i H1 `/uslugi/chatboty` na liczbę mnogą „dla firm" plus „na stronę" (punkt 3.2) | Strona jest na pozycji 14,4 dla frazy z 154 wyświetleniami i idzie w górę. Wejście do top 10 to skok z 1 kliknięcia na kilkanaście | 20 minut |
| 3 | Dołożyć linkowanie wewnętrzne do `/uslugi/voiceboty` (dziś 3 linki) i `/uslugi/chatboty` (7), z anchorami „bot telefoniczny" i „chatbot AI dla firm", z wpisów blogowych i poradników | Voiceboty mają najwięcej wyświetleń i najgorszą pozycję. Brak linków wewnętrznych to najczęstsza przyczyna takiego rozjazdu | 1 do 2 godzin |
| 4 | Skrócić 16 tytułów powyżej 65 znaków i 10 opisów powyżej 160 znaków (lista w punkcie 5) | Ucięty tytuł to niższy CTR na każdej z tych stron. Zmiana meta, nie zmiana treści widocznej na stronie | 1 godzina |
| 5 | Dopisać „bot telefoniczny" do tytułu voicebotów i sekcję o potwierdzaniu wizyt (punkt 3.3) | „bot telefoniczny" weszło w ostatnim tygodniu na pozycję 16,4, „voicebot do potwierdzania wizyt" ma 29 wyświetleń | 30 minut |
| 6 | Podlinkować `/produkty` z treści (dziś zero linków) i domknąć wpisy z jednym linkiem | Strona ma średnią pozycję 2,4 i zero kliknięć, bo prawie nikt jej nie widzi. Sieroty w linkowaniu wolniej się indeksują | 1 godzina |
| 7 | Linki zewnętrzne: utrzymać tempo z lipca (Ahrefs pokazał plus 67 domen w 30 dni). Bing widzi tylko 7 linków | Wszystkie frazy z punktu 1.4 stoją na progu top 10. Na tym progu decyduje autorytet domeny, nie treść | ciągłe |

Zadania 1, 2 i 5 to zmiany w plikach `lib/uslugi/*.ts` (tytuł, opis, H1).
Zadanie 4 dotyka metadanych hubów i wpisów. Żadnego z nich nie wykonałem, bo
mam mandat wyłącznie do odczytu i raportu.

---

## 7. Czego nie sprawdziłem

- **Ahrefs**: nie odpalałem, w repo nie ma skryptu do tego API, a poprzedni
  raport zapowiadał automatyczny crawl na 13 sierpnia. Health Score po fixie
  canonical/www jest więc na dziś NIEZWERYFIKOWANY.
- **Umami**: zbiera od 5 sierpnia, dwa dni danych to za mało na wnioski
  o zachowaniu użytkowników.
- **Efekt fixu www w Google**: canonicale są poprawne na wszystkich 46 stronach,
  ale przecrawlowanie całej domeny przez Google zajmuje 1 do 3 tygodni.
  Poprawa pozycji z ostatniego tygodnia (z 25 do 15) zaczęła się przed fixem,
  więc nie da się jej dziś przypisać temu jednemu zdarzeniu.
- **Nie modyfikowałem żadnego pliku kodu.** Jedyny plik zapisany przez ten
  przebieg to ten raport.

Pełna ścieżka raportu:
`C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\raporty\raport-seo-2026-08-07.md`
