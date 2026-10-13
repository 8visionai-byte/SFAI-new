# Raport SEO: konkurencja, cytowalność w AI, plan dogonienia rynku

**Data:** 2026-08-18
**Zakres:** 8 obszarów usług, 12 zaudytowanych domen konkurencyjnych, 18 testów cytowalności w wyszukiwarkach AI, 680 realnych podpowiedzi Google
**Wykonanie:** 58 agentów w czterech rojach, ~5,7 mln tokenów analizy
**Dokument samodzielny.** Do przekazania sesji SFAI WWW. Zero zmian w kodzie po stronie SEO.

---

## Streszczenie dla zabieganych

Trzy rzeczy, jeśli nie masz czasu na resztę:

1. **Nie cytuje nas AI, bo nie mamy czasu wdrożenia w liczbach.** Sześć na siedem cytowanych źródeł podaje „ile to trwa" konkretem. My mamy zero. Nasz jedyny zacytowany fragment w całym serwisie zawierał termin: „skan procesów 0 zł, 30 minut, podsumowanie w 2 dni robocze".

2. **Nasze 990 zł działa przeciwko nam.** Rynek stawia dolny próg na 2000-3500 zł netto. Model, który zestawia źródła i widzi wartość odstającą w dół o połowę, traktuje ją jako błąd i odrzuca. Cena, która miała przyciągać, wypycha nas z odpowiedzi.

3. **Pierwszy akapit naszej strony, który widzi bot, to menu nawigacyjne z emoji.** 800-900 znaków spisu usług, zanim padnie jakakolwiek odpowiedź. Konkurencja ma tam oznaczony blok krótkiej odpowiedzi z liczbami.

Wszystkie trzy naprawia się w treści i szablonie. Żadna nie wymaga linków ani czasu.

---

## 1. Metoda i uczciwe ograniczenia

**Co zbadano:**
- 8 obszarów usług, każdy przez zwiad SERP → analizę stron konkurencji → diagnozę
- 12 domen konkurencyjnych zaudytowanych wzdłuż i wszerz (sitemapy, architektura, treść, schema)
- 18 realnych pytań klienta zadanych wyszukiwarkom AI, z analizą, kto został zacytowany i dlaczego
- 680 podpowiedzi Google zebranych techniką alfabetyczną
- inwentarz 23 naszych podstron treściowych (długość, FAQ, tabele, gęstość liczb)

**Czego NIE udało się zbadać:**
- **Google Trends zwraca 429** z tego środowiska. Nie ma wolumenów wyszukiwań. Wszystkie liczby popytu w tym raporcie pochodzą z Search Console (realne dane naszych użytkowników), nie z szacunków.
- **Ahrefs w wersji publicznej** daje tylko siłę domen (DR), bez fraz i linków konkurencji.
- Pełne karty audytowe uzyskano dla **9 z 12** domen. Wszystkie ułamki w sekcji 3 podaję jako „x z 9", nie „x z 12".
- Materiał zakłada, że badani stoją wyżej od nas. To założenie wejściowe, nie zmierzona pozycja per fraza. Wnioski o czynnikach rankingu traktuj jako korelacje w próbie, nie dowód przyczynowy.

**Co poszło nie tak po drodze:** pierwsza synteza konkurencji powstała na próbie 3 z 12 domen, bo obciąłem materiał w skrypcie. Agent sam to wychwycił i oznaczył. Uruchomiłem ją ponownie na pełnej próbie i **część pierwotnych wniosków się nie potwierdziła**. Poprawione wersje są w sekcji 3.

---

## 2. Dlaczego AI nas nie cytuje

### 2.1 Jak działa cytowanie

Wyszukiwarka AI przepuszcza stronę przez trzy bramki:

| Bramka | Co sprawdza | Nasz wynik |
|---|---|---|
| 1. Dotarcie i indeks | czy bot widzi treść | **przechodzimy w całości** |
| 2. Pobranie do odpowiedzi | czy trafiamy do zestawu źródeł (tu decyduje widoczność, czyli m.in. DR) | sufit, ale nie dzisiejszy problem |
| 3. Wydobycie i weryfikacja | czy jest gotowy do wycięcia fragment z faktem | **oblewamy niemal wszędzie** |

### 2.2 Technika NIE jest przyczyną. Zamykamy temat.

- `robots.txt` wpuszcza wszystkie boty AI (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended i pozostałe)
- **Cloudflare nie stoi przed stroną** (`server: Vercel`, brak `cf-ray`). Boty fizycznie dostają treść
- 47 podstron, wszystkie SSG, treść w HTML przy pierwszym żądaniu, komplet danych strukturalnych

**Każda godzina włożona w kolejny audyt techniczny, w `llms.txt` czy w dokładanie schematów jest godziną straconą.** To najczęstsza droga ucieczki przed prawdziwym problemem.

### 2.3 Przyczyna pierwsza: brak kompletu liczbowego

Model potrzebuje **czterech wielkości naraz**, żeby zbudować jedno zdanie odpowiedzi:

| Wielkość | Cytowani konkurenci | My |
|---|---|---|
| Dolny próg ceny | tak, 6 z 7 | tak (990 zł, ale patrz 2.4) |
| Próg średni albo górny | tak (momentumsquads podaje nawet średnią rynkową ~18 tys. zł) | częściowo |
| Koszt utrzymania miesięcznego | tak (300-2500 zł, 200-1500 zł, 190-290 zł) | nie w rozbiciu |
| **Czas wdrożenia w liczbach** | **tak, 6 z 7** (1-3 dni, 3-5 dni, 1-2 tygodnie, 4-10 tygodni) | **zero. Ani jednej liczby** |

Na `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` nie pada ani jeden termin. Na `/uslugi/chatboty` jest miękkie „w kilka dni", bez terminu przy żadnym progu.

Tymczasem realne pytanie klienta brzmi: „ile kosztuje **i jak długo trwa**". Model mający do wyboru źródło odpowiadające na całe pytanie i nasze odpowiadające na połowę nie ma dylematu.

**Gęstość faktów:**

| Strona | Liczby | Na ile słów przypada jedna |
|---|---|---|
| nasz poradnik cenowy | 8 unikalnych | 1 na ~300 słów |
| nasza strona usługi chatbotów | 3 | praktycznie zero |
| cytowani konkurenci | 17-55 | 1 na 50-90 słów |

Liczba jest jednostką cytowania. Strona bez liczb nie ma czego oddać modelowi, choćby była najlepiej napisana.

### 2.4 Przyczyna druga: 990 zł leży poza pasmem rynkowym

Wszystkie cytowane źródła stawiają dolny próg na **2000-3500 zł netto**: falconworks od 3500 netto, pixelagency 3-8 tys., momentumsquads od ~2 tys., fastlanding od ~2 tys.

Model zestawiający kilka źródeł i widzący jedną wartość odstającą w dół o połowę nie traktuje jej jako okazji. Traktuje jak niespójność i odrzuca, bo cytowanie odstającej liczby psuje mu odpowiedź.

Dokłada się do tego **brak oznaczenia „netto"** przy jakiejkolwiek naszej kwocie. Pięć z siedmiu cytowanych źródeł to ma, przez co ich liczby są jednoznaczne i porównywalne.

### 2.5 Przyczyna trzecia: forma, z której nie da się wyciąć cytatu

To wygląda technicznie, a naprawia się redakcją i szablonem:

- **Pierwszy wydobywalny akapit to menu nawigacyjne z emoji**, 800-900 znaków spisu usług i produktów. Nasza odpowiedź jest dopiero drugim akapitem
- **Pytania FAQ istnieją tylko w JSON-LD i w składanej harmonijce**, nie jako widoczne nagłówki H2/H3. Falconworks ma osiem pytań jako osobne nagłówki, kcmobile sześć. Sam schemat FAQPage nie wystarcza
- **Żaden nagłówek poza H1 nie zawiera kwoty ani terminu.** U cytowanych cena stoi w treści nagłówka progu, więc sam spis treści jest cennikiem
- **Akapity za długie:** nasza mediana ~257 znaków, falconworks ~128, syntalith ~156. Każdy akapit musi być zamkniętą myślą do wycięcia bez kontekstu
- **Brak dat:** `/uslugi/chatboty` nie ma w schema ani daty publikacji, ani modyfikacji
- **Brak nazw własnych:** wymieniamy 3 marki w poradniku, kcmobile wymienia 12, lessmanual 9

### 2.6 Przyczyna czwarta: autorytet to sufit, nie dzisiejsza kłódka

**Autorytet realnie boli.** Przy DR 18 na frazach najbardziej konkurencyjnych nie wchodzimy nawet do zestawu, z którego model wybiera cytaty.

**Ale nie tłumaczy dzisiejszego zera.** Cytowany zestaw to nie media ani wielkie portale, tylko małe polskie blogi agencyjne: lessmanual.ai, falconworks.pl, syntalith.ai, fastlanding.io, kcmobile.pl, momentumsquads.com, smart-asystenci.pl, odbierze.ai. **To ta sama liga co my.** Skoro strony z tej ligi zbierają cytowania, poprzeczka na polskich zapytaniach długiego ogona jest niska, a różnicę robi kompletność liczbowa.

**Waga przyczyn:**

| Grupa | Waga dzisiaj | Kto naprawia i kiedy |
|---|---|---|
| Treść (komplet liczbowy, pasmo cenowe, brakujące strony) | najwyższa | my, w tygodniach |
| Forma wydobycia (kolejność bloków, nagłówki, akapity, daty) | wysoka | my, w dniach |
| Autorytet (DR 18, brak wzmianek) | sufit, rośnie po naprawie treści | rynek, w miesiącach |
| Technika (crawl, render, schema) | **zerowa** | nic do zrobienia |

---

## 3. Złota reguła: dlaczego jeden nasz fragment JEDNAK zacytowano

Przy pytaniu o koszt wdrożenia agenta AI wyszukiwarka przytoczyła nasz konkret:
**„skan procesów 0 zł, 30 minut z inżynierem, pisemne podsumowanie w 2 dni robocze".**

Co ten fragment miał, czego nie ma reszta serwisu:

1. **Trzy liczby w jednym zdaniu:** kwota, czas trwania, termin dostarczenia
2. **Termin w liczbach.** To jedyne miejsce w całym serwisie, gdzie podajemy „ile to trwa" konkretem
3. **Zobowiązanie, nie przymiotnik.** „Pisemne podsumowanie w 2 dni robocze" nie da się zamienić na „szybko"
4. **Fakt o NAS, nie o rynku.** Tej informacji nie ma w żadnym innym źródle, bo tylko my ją posiadamy

### Teraz zestawmy to z porażką ceny 990 zł

Obie liczby są odstające od rynku. Jedna zacytowana, druga nie. Różnica:

- **990 zł konkuruje na tej samej osi co wszyscy** (cena wdrożenia chatbota). Model widzi pasmo 2000-3500 i wartość odstającą, więc ją odrzuca jako błąd
- **0 zł za 30-minutowy skan nie konkuruje z niczym.** Osobna oś, nasz własny byt. Nie ma z czym się kłócić, więc zostaje

> **REGUŁA STRATEGICZNA:** nie wygramy wojny o „średnią cenę rynkową", bo tam mamy siedmiu konkurentów z lepszą treścią. Wygrywamy tam, gdzie jesteśmy **jedynym możliwym źródłem faktu**: własne zobowiązania, terminy, procedury, wyniki wdrożeń. Warunek jeden: fakt musi być liczbą z jednostką i terminem, nie obietnicą.

Praktycznie: każda strona usługowa powinna mieć blok faktów wyłącznie naszych, w formacie identycznym jak ten skan. Co dostajesz, ile kosztuje, ile trwa, w jakim terminie masz wynik na piśmie.

*Zastrzeżenie: to wniosek z próby jednego zdarzenia. Spójny z resztą materiału, ale nie dowód statystyczny. Mocna hipoteza robocza do sprawdzenia pomiarem.*

---

## 4. Wzorzec zwycięskiej strony (próba 9 domen)

### 4.1 Twarde ułamki

| Cecha | Ułamek | My |
|---|---|---|
| Konkretne kwoty gdziekolwiek w serwisie | **8 z 9** | tak, ale słabo |
| Dedykowany adres pod intencję cenową | **7 z 9** | nie |
| Strony branżowe | **7 z 9** | praktycznie nie (jedna) |
| Podstrony zastosowań | **7 z 9** | tak (voiceboty) |
| Cennik na stronie usługi | 6 z 9 | nie |
| FAQPage w schema na stronach komercyjnych | 6 z 9 | **tak, na wszystkich** |
| Osobna strona edukacyjna obok sprzedażowej | 5 z 9 | nie |
| Strony lokalne | 4 z 9 | nie |
| Widoczne daty i imienny autor | 3-4 z 9 | nie |

### 4.2 Inwariant: co mają WSZYSTKIE domeny słabsze od nas

Grupa: syntalith (DR 15), malinski (13), chatbotassistant (13), falconworks (11), lessmanual (4,4), ninjatech (3,8). Sześć domen słabszych od naszych 18.

> **6 z 6 ma klaster co najmniej pięciu wąskich adresów pod jedną decyzję zakupową, gdzie każdy adres ma własne H1 dopasowane do innego sformułowania pytania.**

Przykłady realizacji tego samego mechanizmu:
- syntalith: 107 polskich adresów z członem „-dla-"
- lessmanual: 66 artykułów pod pytania kupującego, w tym 8 porównań X vs Y
- malinski: 20 opisów wdrożeń jako osobne URL po 2000 słów
- ninjatech: hub `/ai/` plus 9 podstron, przy DR **3,8**
- chatbotassistant: satelity `/voicebot-do-rezerwacji`, `/voicebot-windykacja`

**To dobra wiadomość: nie musimy zostać wydawcą.** Musimy zamienić jedną stronę usługi na 5-10 adresów, z których każdy odpowiada na jedno pytanie.

### 4.3 Co NIE jest czynnikiem (nie wydawaj na to dnia roboczego)

Dowody z próby:

- **Prędkość.** malinski to WordPress na LiteSpeed, jQuery, ~11 zewnętrznych skryptów, odpowiedź 300-660 ms. Stoi wyżej od nas
- **Poprawna sitemapa. 7 z 9 ma poważny błąd i rankuje:** syntalith ma sitemapę zwracającą błąd 500, ninjatech 404, chatbotassistant ma cały blog poza sitemapą, apifonica 31 polskich stron ofertowych poza sitemapą, mits `lastmod` z 2022 roku
- **Długość tekstu.** Mediana syntalith ~800 słów, strony lessmanual 450-710, satelity chatbotassistant 396-444. **Nasze średnie 1596 słów bije większość z nich**
- **Świeżość.** 5 z 9 nie ma dat i rankuje
- **Jakość wykonania.** malinski ma połamane polskie znaki w nagłówkach, wyciekający JavaScript do H3 i własne notatki wdrożeniowe w publicznym `robots.txt`
- **Dowód społeczny.** chatbotassistant i ninjatech mają zero case studies, zero opinii, zero logotypów

### 4.4 Ostrzeżenie: trzy domeny wygrywają autorytetem, nie architekturą

**Wszystko, co robią apifonica (DR 53), delante (70) i mits (50), przefiltruj pytaniem „czy oni to robią, czy im to uchodzi".**

- delante: brak dat i autora, FAQPage na jednej stronie, zero cen usług
- apifonica: 79 pytań na stronie i **zero znacznika FAQPage**, 375-559 KB HTML, stosunek tekstu do kodu 4,7%
- mits: `lastmod` z 2022, dział AI ma tylko cztery podstrony i rankuje, bo **dziedziczy po 200 starszych stronach**. Tego nie skopiujemy, nie mamy z czego dziedziczyć

---

## 5. Diagnozy per obszar

| Obszar | Nasza poz. | Wyśw./mies. | Szansa | Typ strony pasuje? |
|---|---|---|---|---|
| Chatboty | 16,6 | 389 | **WYSOKA** | TAK |
| Voiceboty | 22,6 | 236 | **WYSOKA** | TAK |
| GEO (poradnikowe) | 10,4 | 15 | **WYSOKA** | NIE |
| Money queries | 8,0 | 53 | ŚREDNIA | częściowo |
| Rekrutacja | 23,1 | 9 | ŚREDNIA | częściowo NIE |
| Automatyzacje | 17,0 | 46 | ŚREDNIA/NISKA | TAK |
| Audyt AI | 18,7 | 31 | NISKA na frazę główną | **NIE** |
| Faktury/OCR | 25,5 | 48 | NISKA na główne | częściowo NIE |

### 5.1 Chatboty: WYSOKA szansa, brak konkretu

**Mamy mocniejszą domenę niż ci, co stoją nad nami:** DR 18 przeciwko mits.pl, malinski.ai i pawlicaweb.pl w przedziale 4-15. Nie ma tu ściany linkowej.

**Korekta wcześniejszej diagnozy:** dla fraz „chatbot dla firmy" i „chatbot ai dla firm" top10 to **strony usługowe agencji**, nie artykuły cenowe. Nasz typ strony jest właściwy i nie ma powodu go zmieniać. Artykuły dominują dopiero przy „ile kosztuje chatbot", a to zadanie już wykonuje nasz poradnik.

**Problem:** nasza strona nie ma ani jednego sprawdzalnego konkretu. Cała treść zatrzymuje się na obietnicy („uczymy na Twojej wiedzy", „popularne komunikatory", „wdrożenie w dni"). Jedna liczba na całej stronie (990 zł) i zero realizacji.

Konkurenci w tym samym miejscu: mits.pl case study z liczbą 80% redukcji czasu i widełki 15-30 tys. zł, malinski.ai trzypoziomowy cennik do 50 tys., 12 pytań FAQ i cztery realizacje, pawlicaweb.pl pełny cennik ze stawką 8 gr za wiadomość ponad limit.

**Konkret do naprawy natychmiast:** case Instytutu Kryptografii **leży gotowy** w `/realizacje/chatbot-edukacyjny-kursy`, a strona usługi w ogóle do niego nie linkuje.

### 5.2 Voiceboty: WYSOKA szansa, strona definicyjna zamiast zakupowej

Jedyny obszar z przewagą domenową: DR 18 przy 4-15 u konkurentów z top10.

Nasza strona jest wciąż **definicyjna**, a ten SERP nagradza strony **zakupowe**: z parametrami albo z dowodem. smart-asystenci.pl daje trzy nazwane pakiety (499/899/1499 zł netto/mies.), pulę minut, limit rozmów jednoczesnych, 14 dni testu i czas wdrożenia ~1,5 tygodnia, a cenę wystawia w pierwszym akapicie pod H1.

**Uwaga:** voicebot.asseco.com to subdomena grupy Asseco (670 słów, zero ceny, zero FAQ) i część jej pozycji bierze się z marki, nie z treści.

### 5.3 Audyt AI: typ strony jest zły

**To główny koszt w tym obszarze.** Fraza „audyt ai" jest dziś informacyjna: strony, które nas biją, siedzą w katalogach `/blog` i są tekstami wyjaśniającymi, nie ofertami (agisona.pl ~1500 słów, multi-future.pl ~2240 słów).

Nasza strona usługi jest dobra i **ma zostać** jako strona konwersji z realną ceną 1490 zł, ale nigdy nie wygra o intencję „co to jest audyt AI".

**Nasza jedyna twarda przewaga tutaj:** obaj konkurenci cen NIE podają (agisona: po bezpłatnej konsultacji; multi-future: wycena indywidualna), a my mamy jawne **1490 zł z mechanizmem odliczenia od wdrożenia**. Dziś to jest zakopane w środku strony zamiast być osobnym adresem.

### 5.4 Obszary, gdzie treścią nie wygramy

Mówię wprost, żeby nie marnować budżetu:

- **Automatyzacje:** konkurenci DR 33-71 (gagan.pl 57, codescriptum.pl 35, sagiton.pl 33). Sens ma tylko długi ogon
- **Faktury/OCR:** learn.microsoft.com jest praktycznie nie do przebicia dla DR 18. Realny teren: „automatyzacja faktur w biurze rachunkowym", „KSeF krok po kroku dla małej firmy"
- **Audyt, fraza główna:** DR 18 przeciwko 33-71. Długi ogon tak, fraza główna nie

---

## 6. Nowe adresy: 35 propozycji z uzasadnieniem

Kolejność wg stosunku zysku do nakładu. Każdy adres ma frazę i informację, kto z konkurencji już to ma.

### Priorytet 1: cenniki jako osobne adresy (7 z 9 konkurentów to ma)

| Adres | Fraza | Kto już ma |
|---|---|---|
| `/uslugi/voiceboty/cennik` | voicebot cena, ile kosztuje bot telefoniczny | smart-asystenci (3 pakiety), syntalith, chatbotassistant |
| `/poradniki/ile-kosztuje-audyt-ai-firmy` | ile kosztuje audyt ai, audyt ai cena | nikt z top10 nie podaje cen. **Nasza przewaga** |
| `/poradniki/ile-kosztuje-automatyzacja-faktur` | ile kosztuje automatyzacja faktur, koszt OCR | brak w top10 |
| `/poradniki/ile-kosztuje-pozycjonowanie-w-ai` | cennik GEO, cennik SEO AI | seotrade.pl |

### Priorytet 2: chatboty (WYSOKA szansa, silnik podstron już działa)

| Adres | Fraza | Kto już ma |
|---|---|---|
| `/uslugi/chatboty/chatbot-na-whatsapp` | chatbot na WhatsApp dla firmy | pawlicaweb (w cenniku), mits (jako kanał). **Nikt nie ma dedykowanej strony** |
| `/uslugi/chatboty/chatbot-dla-sklepu-internetowego` | chatbot dla sklepu, chatbot e-commerce | pawlicaweb ma 6 branż z osobnymi stronami |
| `/uslugi/chatboty/chatbot-dla-gabinetu` | chatbot dla gabinetu, przychodni, kliniki | malinski (case medyczny), pawlicaweb |
| `/poradniki/chatbot-wlasny-czy-gotowa-platforma` | własny chatbot czy Tidio, alternatywa dla Tidio | mits i malinski mają jako sekcję, **nikt jako osobną stronę** |
| `/poradniki/wady-chatbotow-ai` | wady chatbotów AI, czy chatbot zmyśla, halucynacje | malinski ma jako jedno z 12 pytań FAQ |
| `/poradniki/chatbot-na-wlasnych-danych-rag` | chatbot na własnych danych, RAG chatbot firmowy | mits, malinski (poziom cennika 4,5-12 tys.) |

**Uwaga strategiczna:** rynek mówi „baza wiedzy", my mówimy „wiedza firmy". Rynek mówi „asystent AI", my mamy własną nazwę „Agent wiedzy firmy", której nikt nie szuka. To rozjazd nazewnictwa, który kosztuje ruch.

### Priorytet 3: voiceboty (WYSOKA szansa)

| Adres | Fraza | Uwaga |
|---|---|---|
| `/uslugi/voiceboty/obsluga-klienta` | voicebot do obsługi klienta, bot do infolinii | 52 wyświetlenia/mies. łącznie |
| `/uslugi/voiceboty/gabinet` | voicebot dla gabinetu, rejestracja pacjentów | **na naszych 3 stronach voicebotowych słowa „gabinet", „klinika", „przychodnia", „rejestracja" występują 0 razy** |
| `/uslugi/voiceboty/warsztat` | bot telefoniczny dla warsztatu, serwisu samochodowego | nisza bez konkurencji |
| `/uslugi/voiceboty/integracje` | voicebot integracja z kalendarzem | odbierze.ai nazywa 6 systemów ATS z nazwy |
| `/porownanie/voicebot-a-recepcjonistka` | voicebot czy recepcjonistka, koszt recepcjonistki | malinski liczy koszt alternatywy: stanowisko call center 3-5 tys. zł/mies. |

### Priorytet 4: GEO (nasza specjalność, a nie mamy treści)

| Adres | Fraza | Uwaga |
|---|---|---|
| `/poradniki/jak-byc-cytowanym-w-chatgpt` | jak być cytowanym w chatgpt, cytowalność | **jesteśmy na pozycji 6,3 bez dedykowanej strony** |
| `/poradniki/optymalizacja-strony-pod-chatgpt` | optymalizacja pod chatgpt, GPTBot, robots.txt | seotrade.pl ma 4400 słów, 23 sekcje |
| `/realizacje/nasza-cytowalnosc-w-ai` | case study GEO | mamy realny materiał: ten raport |
| `/narzedzia/test-cytowalnosci-w-ai` | sprawdź czy ChatGPT cytuje moją stronę | lead magnet, 4-6 dni |
| `/blog/geo-a-seo-czym-sie-roznia` | czym różni się GEO od SEO, AEO | podpowiedzi Google: „audyt widoczności ai", „audyt ai search" |

### Priorytet 5: audyt i automatyzacje (długi ogon)

| Adres | Fraza |
|---|---|
| `/poradniki/audyt-ai-w-firmie-co-to-jest-jak-wyglada` | audyt ai, co to jest audyt ai |
| `/poradniki/kiedy-audyt-ai-nie-ma-sensu` | czy audyt ai się opłaca |
| `/uslugi/audyt-zgodnosci-ai-act` | audyt ai act, zgodność z AI Act |
| `/poradniki/jakie-procesy-zautomatyzowac-w-firmie` | jakie procesy zautomatyzować |
| `/uslugi/automatyzacje/automatyzacja-obslugi-maili` | automatyzacja obsługi maili |
| `/uslugi/automatyzacje/wdrozenia-make-i-n8n` | wdrożenie Make.com, specjalista Make |
| `/poradniki/automatyzacja-obiegu-dokumentow` | automatyzacja obiegu dokumentów |
| `/poradniki/ksef-jak-przygotowac-firme` | KSeF krok po kroku dla małej firmy |
| `/uslugi/dokumenty-faktury/biuro-rachunkowe` | automatyzacja faktur dla biura rachunkowego |
| `/uslugi/voiceboty/rekrutacja` | voicebot ai rekrutacyjny |
| `/poradniki/ai-w-rekrutacji-rodo-ai-act` | ai w rekrutacji rodo, czy ai może odrzucać kandydatów |

---

## 7. Plan wdrożenia

### Poziom 1: robimy najpierw (materiał już mamy)

**P1. Blok krótkiej odpowiedzi na górze każdej strony pieniężnej. 1 dzień.**
Cztery wielkości naraz: dolny próg, próg górny, koszt miesięczny, **czas wdrożenia**. Wszystkie 7 cytowanych źródeł ma taki blok. Bez tego reszta zaleceń nie zadziała.

**P2. Wyrzucić nawigację z emoji z pierwszego wydobywalnego bloku dokumentu. 1 dzień.**
Dziś model dostaje 800-900 znaków spisu usług, zanim dojdzie do odpowiedzi. Naprawa w szablonie, dotyczy wszystkich 47 podstron naraz.

**P3. Czasy wdrożenia w liczbach przy KAŻDYM progu cenowym. 1 dzień.**
6 z 7 cytowanych to ma, my zero. Najmocniej udokumentowany pojedynczy brak w całym materiale. **Wymaga decyzji Pawła: ile realnie trwa wdrożenie każdego typu.**

**P4. Oznaczyć każdą kwotę jako netto. 0,5 dnia.**
5 z 7 cytowanych tak robi.

**P5. Przenieść liczby z poradników cenowych na strony usług. 1-2 dni na stronę.**
Poradniki mają 39-40 liczb, usługi 3-10. Format istnieje u nas i nie został przeniesiony tam, gdzie są pieniądze.

**P6. Wciągnąć case Instytutu Kryptografii na stronę usługi chatbotów. 0,5 dnia.**
Leży gotowy w `/realizacje/chatbot-edukacyjny-kursy` i nikt do niego nie linkuje.

**P7. Pytania FAQ jako widoczne nagłówki H2/H3, nie tylko w harmonijce i JSON-LD. 1 dzień.**
Odpowiedzi 200-350 znaków, czyli tyle, ile da się wkleić jako cytat.

**P8. Skrócić akapity do mediany ~150 znaków. 2 dni.**
Nasza mediana 257, falconworks 128. Każdy akapit ma być zamkniętą myślą.

### Poziom 2: właściwa robota

**P9. Rozstrzygnąć problem 990 zł. Wymaga decyzji Pawła.**
Dwie uczciwe drogi:
- (a) zostawiamy, ale przestajemy pokazywać jako „cenę chatbota dla firmy". Nazywamy dokładnie, czym ta kwota jest, i obok stawiamy pełną drabinę progów w paśmie rynkowym
- (b) przenosimy na osobną oś, tak jak zadziałał skan procesów: to nie tańszy chatbot, tylko inny produkt z własną nazwą

**P10. Osobny adres cennikowy pod każdą usługę. 3-5 dni.**
Z trzema progami opisanymi czterema parametrami (co dostajesz, ile trwa, ile dni wsparcia, ile rund poprawek), rozdzieleniem ceny wdrożenia od opieki, akapitem o kosztach ukrytych i widoczną datą sprawdzenia ceny.

**P11. Rozbicie sztywnego szablonu usług na hub plus wąskie satelity. 5-8 dni.**
Inwariant 6 z 6 domen słabszych od nas. **Warunek, żeby to nie były klony:** rdzeniem każdego satelity musi być tabela specyficzna dla tego zastosowania, nie wstęp.

**P12. Strony branżowe. 8-12 dni na 8-10 stron.**
7 z 9 to ma. Pisane **językiem branży, nie językiem AI**. Kluczowy element: sekcja kosztu bezczynności z policzoną miesięczną stratą klienta (u malinskiego strata kliniki z braku rejestracji po 18:00 to 9-25 tys. zł/mies.).

**P13. Klaster porównań X vs Y. 3-4 dni na 4 teksty.**
lessmanual ma 8, my 1. W kolumnie alternatywy ma stać **policzona kwota**, nie opis.

**P14. Sekcja „kiedy tego NIE kupować" na każdej stronie ofertowej. 1-2 dni.**
Mają: mits, ninjatech, syntalith. Łapie frazy przeczące i uderza w lęk numer jeden klienta, czyli bezpieczeństwo.

### Poziom 3: bez pośpiechu

**P15.** Widoczna data i imienny autor (3-4 z 9 to ma, **dowody mówią, że to nie jest czynnik rankingu**, ale kosztuje dzień i pomaga przy cytowaniu)
**P16.** Sygnał geograficzny: jedna strona regionalna z sekcjami per miasto, nie macierz stron miejskich
**P17.** `llms-full.txt` (zero dowodów, że działa, koszt pół dnia)
**P18.** Odchudzenie strony głównej: 4564 słowa i 360 KB przeciwko falconworks 900 słów i 71 KB

---

## 8. Osobno: błąd techniczny znaleziony u nas

**H1 na stronie głównej jest rozbity na 44 osobne spany, po jednej literze każdy.** Surowy tekst czyta się jako pojedyncze litery. Do naprawy niezależnie od SEO: jedno zdanie w jednym tagu, animacja liter przez CSS albo pseudo-elementy.

---

## 9. Czego NIE robić

**Nie skracać naszych stron do 400 słów.** Średnia 1596 słów bije większość konkurencji. Nowe wąskie adresy budować w okolicy 1100-1300 słów.

**Nie inwestować w Core Web Vitals, kompletność schema poza FAQPage i ceną, ani w idealną sitemapę.** 7 z 9 konkurentów ma poważnie popsute pliki techniczne i rankuje.

**Nie wycofywać się z jawnych cen.** lessmanual chowa ceny za „wycena po diagnozie". Nasze jawne kwoty to przewaga w zaufaniu, do rozszerzenia, nie do cofnięcia.

**Nie kopiować liczb dowodowych bez pokrycia.** lessmanual podaje ROI 233-1400% bez źródła, chatbotassistant ma na stronie głównej „98%", które okazuje się **poziomem baterii w atrapie telefonu**. Nasza zasada zero zmyślonych liczb zostaje. Ale to znaczy też, że **nie musimy czekać na idealny dowód**: uczciwy mały pomiar z podaną wielkością próby jest bezpieczniejszy i wcale nie słabszy.

**Nie kopiować rozwiązań apifonica, delante i mits bez zastanowienia.** Oni mają DR 50-71 i wiele rzeczy im po prostu uchodzi.

**Nie budować macierzy stron miejskich.** Tylko 4 z 9 ma sygnał lokalny, a syntalith buduje 14 stron miejskich nie mając nawet schematu Organization.

---

## 10. Czego nie wolno zepsuć

1. **FAQ na wszystkich 23 podstronach po 6 pytań.** Tylko falconworks i ninjatech mają porównywalną dyscyplinę. apifonica przy 79 pytaniach nie ma znacznika wcale. **To nasza realna przewaga**
2. **Tabela porównawcza na każdej podstronie.** Nikt w próbie nie ma tego na 100% stron. Dołożyć tylko kwotę w kolumnie alternatywy
3. **Średnio 1596 słów.** Więcej niż mediana większości konkurentów
4. **Komplet schema i SSG.** Do dołożenia tylko Offer i PriceSpecification na nowych stronach cennikowych
5. **Jawna cena audytu 1490 zł z mechanizmem odliczenia.** Konkurenci w tym obszarze cen nie podają wcale
6. **Format poradnika cenowego z 39-40 liczbami.** Nasz najlepszy istniejący format. Nie dotykać, tylko z niego kopiować

---

## 11. Jak zmierzyć, czy zadziałało

Nie po deployu, tylko po 4 i 8 tygodniach w Search Console:

1. `/uslugi/chatboty`: średnia pozycja z 16,6 w górę (start: DR 18 przeciwko konkurentom 4-15, więc bariery linkowej nie ma)
2. `/uslugi/voiceboty/odbieranie-telefonow`: wejście do TOP10 na „bot telefoniczny" (dziś 16,9, a grupa fraz o odbieraniu telefonów ma pozycje 8-17)
3. Liczba **różnych zapytań**, na które serwis się pokazuje. Przy tak małych wolumenach to lepszy miernik niż jedna pozycja
4. Powtórzenie testu cytowalności: te same 18 pytań, sprawdzenie, czy simplefast.ai pojawia się choć raz więcej niż dzisiejszy jeden przypadek

**Uwaga o skali:** przy 23 kliknięciach miesięcznie każda zmiana w pierwszych 4 tygodniach będzie nierozróżnialna od szumu. Nie wiem, o ile urośniemy, i nie będę zgadywał.

---

## 12. Co wymaga decyzji Pawła (nie da się tego wygenerować)

1. **Realne widełki cenowe** dla trzech progów każdej usługi. Bez tego nie da się napisać drabiny cenowej bez wymyślania kwot
2. **Ile realnie trwa wdrożenie** każdego typu, w dniach roboczych. To najmocniej udokumentowany brak w całym raporcie
3. **Co zrobić z 990 zł** (wariant a czy b z punktu P9)
4. **Zgoda klientów na publikację liczb** z wdrożeń. Mamy gotowe: 75% maili wymaga tylko drobnej korekty, 1000 rekordów w 40 minut. Bez zgody zostają jako opis jakościowy

---

*Materiał: Search Console (7/28/90 dni), Bing Webmaster Tools, Ahrefs (siła domen), 680 podpowiedzi Google, skan 47 podstron produkcyjnych, 12 audytów konkurencji, 18 testów cytowalności w wyszukiwarkach AI. Google Trends niedostępny (429). Wszystkie liczby pochodzą z pomiaru albo z cytowanego źródła. Żadna nie jest szacunkiem.*
