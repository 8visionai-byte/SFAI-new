# Pakiet wdrożeniowy: Strony WWW pod SEO i AI

**Adres strony:** https://www.simplefast.ai/uslugi/strony-www
**Plik z treścią strony:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\lib\uslugi\strony-www.ts`
**Data pakietu:** 2026-08-31
**Co ten pakiet dodaje:** 11 nowych sekcji na istniejącej stronie usługi (w tym pierwszy prawdziwy cennik stron z kwotami 1590 / 2900 / od 5900 zł netto), rozbudowę FAQ z 6 do 18 pytań wraz ze znacznikiem FAQPage oraz 5 nowych podstron pod frazy zakupowe, których dziś nie łapiemy.

Wszystkie blokery i błędy z walidacji są naprawione. W treści nie ma ani jednego znacznika [DO POTWIERDZENIA] i ani jednej liczby spoza konspektu, decyzji właściciela z 2026-08-31 albo własnego przeliczenia z pokazanym działaniem. Zero długiego myślnika.

---

## Czego NIE ruszamy

Osiem istniejących sekcji strony zostaje w całości nietkniętych. Nowe bloki wchodzą POMIĘDZY nie.

| Sekcja w kodzie | H2 na stronie | Status |
|---|---|---|
| `problem` (linia 29) | Dlaczego Twojej strony nie widać w AI? | bez zmian, razem z pasem metryk i blokiem „Co się dzieje, gdy bot wchodzi na pustą stronę?” |
| `rozwiazanie` (linia 92) | Jak budujemy stronę, którą cytuje AI? | bez zmian, razem z pięcioma blokami (Treść w kodzie od razu, Answer-first, Szybka strona internetowa, Boty wpuszczone świadomie, Pomiar po starcie) i trzema kartami realizacji |
| `tabelaPorownawcza` (linia 194) | Strona z kreatora a strona pod SEO i AI | bez zmian |
| `kroki` (linia 208) | Jak powstaje strona krok po kroku? | bez zmian (Diagnoza bezpłatna, Budowa, Pomiar i rozwój) |
| `ramaCeny` (linia 229) | Ile kosztuje strona pod SEO i AI? | karty progów bez zmian, JEDNO zdanie do podmiany, patrz „Uwagi dla sesji wdrożeniowej” punkt 1 |
| `faq` (linia 363) | sześć istniejących pytań | bez zmian w treści, dopisujemy pod nimi 12 nowych |
| `cta` (linia 396) | Pokaż mi, gdzie tracę czas | bez zmian |
| `powiazane` (linia 416) | narzędzia i usługi | bez zmian, dokładamy tylko linki do nowych podstron |

Bez zmian zostaje także `h1`, `kapsula`, `metaTitle` i `metaDescription`. Jedyne pole metadanych do ruszenia to `dataAktualizacji`.

---

## Nowe sekcje na istniejącej stronie

### 1. Co tracisz, gdy klient nie znajduje Twojej strony?

- **Gdzie wstawić:** bezpośrednio po sekcji `problem` („Dlaczego Twojej strony nie widać w AI?”), przed sekcją `rozwiazanie`.
- **Po co:** łapie intencję „czy to się opłaca” i „koszt braku strony” tuż po opisie problemu, zanim czytelnik odłoży decyzję. Malinski.ai ma koszt bezczynności jako osobną sekcję i wygrywa nią jeszcze przed ceną. Nagłówek celowo NIE pyta o pieniądze, żeby nie zabierać frazy sekcji cenowej.
- **Typ:** karty (4 sztuki, wstęp nad nimi)

**TREŚĆ:**

Wstęp nad kartami:

> Niewidoczna strona nie jest neutralna. Kosztuje co miesiąc, tylko rachunek nie przychodzi pocztą, więc łatwo go przeoczyć.
> Poniżej cztery pozycje z tego rachunku. Żadna nie pojawi się w Twojej księgowości, a każda realnie zabiera pieniądze.

Karta 1
Tytuł: Zapytania, które dostał ktoś inny
Treść: Klient szukał dokładnie tego, co robisz, i trafił do konkurenta. Ta rozmowa już się odbyła. Nie zobaczysz jej w żadnym raporcie, bo nigdy nie dotarła do Ciebie.

Karta 2
Tytuł: Google przestało być jedynym wejściem
Treść: Coraz częściej klient pyta ChatGPT i dostaje jedną odpowiedź z dwiema, trzema nazwami firm. Jeśli Twojej tam nie ma, nie jesteś na drugiej stronie wyników. Nie ma Cię wcale.

Karta 3
Tytuł: Kliknięć ubywa nawet przy dobrej pozycji
Treść: Gdy Google pokazuje gotową odpowiedź nad linkami, część ludzi nie klika już w nic. Twoja pozycja zostaje ta sama, a ruch z niej maleje. Walczysz więc nie o miejsce na liście, tylko o to, żeby być w samej odpowiedzi.

Karta 4
Tytuł: Czekanie ma swoją cenę
Treść: Widoczność w modelach AI nie włącza się z dnia na dzień. To są tygodnie od publikacji, nie dni. Każdy miesiąc zwłoki to miesiąc ciszy, którego nie da się potem nadrobić skokiem.

- **Źródło liczb:** sekcja nie zawiera żadnej liczby. Badanie Ahrefs o spadku klikalności o 34,5% zostało USUNIĘTE (bloker walidacji: liczba spoza konspektu, nikt jej nie widział u źródła). Karta 3 opisuje ten sam mechanizm bez procentu, więc nie wymaga źródła. Karta 4 celowo nie powtarza terminu z realizacji Lenart Motors, żeby ta sama liczba nie stała cztery razy na jednej stronie.

---

### 2. Jak sprawdzić, czy ChatGPT poleca moją firmę?

- **Gdzie wstawić:** po nowej sekcji 1, nadal przed sekcją `rozwiazanie`.
- **Po co:** łapie frazy „jak sprawdzić czy ChatGPT poleca moją firmę” i „widoczność firmy w AI”. Clickmade.pl i wildmoose.pl mają to jako hasło, codescriptum.pl ma wersję interaktywną. My dajemy gotową procedurę, której nie trzeba budować, a ponumerowana instrukcja to najlepszy materiał do cytowania przez modele.
- **Typ:** lista (instrukcja plus wykaz wyników)

**TREŚĆ:**

Wstęp:

> Nie musisz nam wierzyć na słowo. Sprawdź to sam. Nie potrzebujesz żadnego narzędzia poza przeglądarką.
> Jedna zasada: nie podpowiadaj modelowi. Jeśli sam wpiszesz nazwę swojej firmy w pierwszym pytaniu, dostaniesz odpowiedź o niczym.

Jak to zrobić, krok po kroku:

1. Otwórz trzy karty przeglądarki: ChatGPT, Perplexity i Gemini. Każdy z nich czyta inne źródła, więc jeden test to za mało na wnioski.
2. Wklej pytanie pierwsze: „Kogo polecasz, jeśli szukam [Twoja usługa] w [Twoje miasto]?”. Nazwy swojej firmy nie wpisujesz.
3. Pytanie drugie: „Wymień pięć najlepszych firm od [Twoja usługa] w [Twój region] i napisz, dlaczego akurat te.”
4. Pytanie trzecie: „Czym zajmuje się [nazwa Twojej firmy]?”. To sprawdza, czy model w ogóle wie o Twoim istnieniu.
5. Pytanie czwarte: „Czy [nazwa Twojej firmy] to wiarygodny wykonawca? Podaj źródła, na których się opierasz.”
6. Pytanie piąte: „[Twoja firma] czy [nazwa konkurenta]: co wybrać i dlaczego?”. Zobaczysz, jak wypadasz w bezpośrednim porównaniu.
7. Skopiuj odpowiedzi razem z linkami źródłowymi do jednego dokumentu i zapisz datę testu.
8. Powtórz cały test za miesiąc, tymi samymi pytaniami. Jeden pomiar to nie trend, dopiero drugi coś znaczy.

Co oznacza każdy wynik:

1. Model nie zna nazwy Twojej firmy: w źródłach, które czyta, nie ma o Tobie treści. To najczęstszy wynik i najłatwiejszy do naprawienia.
2. Zna nazwę, ale myli fakty: Twoje dane rozjeżdżają się między stroną, Mapami Google i katalogami. Model wybiera wersję, która powtarza się najczęściej, nie tę prawdziwą.
3. Wymienia Cię przy pytaniu o nazwę, ale nie przy pytaniu o usługę: masz rozpoznawalność, nie masz odpowiedzi na pytanie zakupowe. To jest dokładnie ta luka, którą zamykamy.
4. Cytuje konkurenta i podaje link do jego strony: on ma u siebie fragment, który wprost odpowiada na to pytanie. Ty masz opis firmy.
5. Każdy z trzech modeli mówi co innego: to normalne. Liczy się, ilu z nich Cię wymienia, a nie który akurat trafił.

- **Źródło liczb:** sekcja nie zawiera żadnej liczby poza numeracją kroków i liczbą pytań, które są częścią samej procedury. Obietnica „zajmie Ci pięć minut” została USUNIĘTA (błąd walidacji: 5 pytań w 3 modelach to 15 zapytań, więc obietnica była nieprawdziwa). Punkt „powtórz test za miesiąc” przeniesiony z wykazu wyników do instrukcji, gdzie logicznie należy.

---

### 3. Dlaczego model AI cytuje jedną stronę, a drugą pomija?

- **Gdzie wstawić:** po sekcji `rozwiazanie` („Jak budujemy stronę, którą cytuje AI?”), przed sekcją `tabelaPorownawcza`.
- **Po co:** rdzeń tematyczny całego obszaru, którego dziś nie mamy. Łapie frazy „dlaczego AI nie cytuje mojej strony”, „jak być cytowanym przez ChatGPT”, „GEO co to jest”. Adsfox.pl i clickmade.pl mają to jako osobne sekcje. Buduje autorytet tematyczny i daje modelom gotowy fragment do cytowania.
- **Typ:** akapity

**TREŚĆ:**

Model nie ocenia, kto jest lepszy. Wybiera fragment, który najpewniej odpowiada na zadane pytanie i który da się zacytować bez domyślania się reszty.

Dlatego przegrywają strony internetowe napisane jak folder reklamowy. Zdanie „od lat dostarczamy rozwiązania najwyższej jakości” nie odpowiada na żadne pytanie, więc nie ma czego z niego wyjąć.

Wygrywa strona, na której jedno pytanie ma jedną zamkniętą odpowiedź w pierwszym akapicie. Model kopiuje myśl, nie całą podstronę, więc myśl musi być kompletna sama w sobie.

Liczy się też dostępność. Jeśli treść pojawia się dopiero po uruchomieniu skryptów albo siedzi w grafice, roboty modeli jej nie zobaczą. Człowiek widzi, maszyna nie.

Liczy się spójność. Adres, telefon i nazwa muszą brzmieć identycznie na stronie, w Mapach Google i w katalogach. Rozjazd w danych model traktuje jak sygnał, że lepiej Cię nie polecać.

Liczy się potwierdzenie z zewnątrz. Model chętniej cytuje firmę, o której ktoś jeszcze wspomniał poza jej własną stroną. Sama strona to Twoje słowo przeciwko niczemu.

Liczy się świeżość i konkret. Data, liczba, nazwa klienta i termin realizacji dają modelowi coś, co można podać dalej. Ogólniki nie dają nic.

Tak zbudowana strona internetowa działa u naszych klientów, a wyniki z nazwami znajdziesz niżej, w sekcji o efektach.

To nie jest sztuczka na jeden sezon. Strona zbudowana tak, żeby dało się ją zacytować, czyta się lepiej także człowiekowi, bo od razu mówi, o co chodzi.

- **Źródło liczb:** sekcja nie zawiera żadnej liczby. Liczebniki porządkowe („Druga rzecz”, „Trzecia”) zostały USUNIĘTE (błąd walidacji: nie było punktu pierwszego). Termin z realizacji Lenart Motors celowo NIE jest tu powtarzany, został odesłany do sekcji z efektami.

---

### 4. SEO, AEO czy GEO, czym to się różni i co robimy u Ciebie?

- **Gdzie wstawić:** po sekcji `tabelaPorownawcza` („Strona z kreatora a strona pod SEO i AI”), przed sekcją `kroki`.
- **Po co:** twardy chwyt frazowy: „SEO vs GEO”, „AEO co to jest”, „LLMO”, „pozycjonowanie w AI a SEO”. Codescriptum.pl ma dokładnie taką tabelę, adsfox.pl i clickmade.pl osobne akapity. Tabela to format, który modele cytują najchętniej. Uwaga na kanibalizację: tabela w sekcji `tabelaPorownawcza` porównuje NAS z alternatywami, ta porównuje POJĘCIA.
- **Typ:** tabela

**TREŚĆ:**

Wstęp:

> Trzy skróty, jedna robota, ale mierzy się je zupełnie inaczej. Poniżej rozpisane tak, żebyś wiedział, za co płacisz i czego się spodziewać.
> Uwaga na sprzedawców, którzy sprzedają GEO jako coś zamiast SEO. To się nakłada, nie zastępuje.

| Skrót | Pełna nazwa | Gdzie to działa | Co optymalizujemy | Jak mierzymy efekt | Kiedy widać wynik |
|---|---|---|---|---|---|
| SEO | Optymalizacja pod wyszukiwarki | Klasyczne wyniki Google i Bing | Szybkość strony, struktura adresów, treść pod frazę, linkowanie wewnętrzne, indeksacja | Pozycje na frazy, wejścia z wyszukiwarki, zapytania z formularza | Zwykle miesiące, nie tygodnie, zależnie od tego, ilu masz konkurentów na daną frazę |
| AEO | Optymalizacja pod odpowiedzi | Odpowiedzi AI w Google, fragmenty wyróżnione, wyszukiwanie głosowe | Pytania jako nagłówki, odpowiedź w pierwszym akapicie, dane strukturalne, FAQ | Obecność w bloku odpowiedzi, ruch z zapytań w formie pytań | Szybciej niż SEO, bo walczysz o fragment, nie o pozycję |
| GEO | Optymalizacja pod modele generatywne | ChatGPT, Perplexity i Gemini, a coraz częściej także Claude i Copilot | Cytowalne akapity, spójność danych firmy, dostępność treści dla robotów AI, wzmianki poza własną stroną | Ręczny test pięcioma pytaniami w ChatGPT, Perplexity i Gemini, wykonany przed publikacją i po niej. Potem powtarzasz go sam według instrukcji wyżej | Zwykle tygodnie, nie dni, i nikt tego nie gwarantuje |
| LLMO | Optymalizacja pod duże modele językowe | To samo pole co GEO, inna nazwa | To samo, różni się głównie tym, kto tak mówi | Tak samo jak przy GEO | Tak samo jak przy GEO |

Pod tabelą:

> Mierzymy trzy modele: ChatGPT, Perplexity i Gemini. Claude i Copilot czytają podobne źródła, więc praca na nie działa, ale nie wpisujemy ich do pomiaru, żeby nie obiecywać czegoś, czego nie sprawdzamy.
> U Ciebie robimy wszystkie trzy warstwy naraz, bo to jedna strona i jedna treść. Rozdzielanie tego na osobne faktury ma sens dla agencji, nie dla Ciebie.
> Czego nie obiecujemy: gwarantowanej pozycji w Google ani gwarantowanego zdania w ChatGPT. Nikt nie ma na to wpływu, a kto obiecuje, ten zgaduje.

- **Źródło liczb:** sekcja nie zawiera żadnej liczby. Sprzeczność „test powtarzany co miesiąc” kontra „test przed publikacją i po niej” została USUNIĘTA (błąd walidacji): w tabeli stoi teraz dokładnie to samo, co w liście zakresu prac, czyli test przy wdrożeniu, a potem instrukcja do samodzielnego powtarzania. Comiesięczny monitoring nie jest tu obiecywany, bo nie ma go w cenniku.

---

### 5. Co dokładnie robimy przy budowie strony internetowej?

- **Gdzie wstawić:** po sekcji `kroki` („Jak powstaje strona krok po kroku?”), przed sekcją `ramaCeny`.
- **Po co:** kroki wdrożenia mówią JAK przebiega projekt, ta lista mówi CO odhaczamy. Zdejmuje obiekcję „nie wiem, za co płacę” tuż przed ceną i daje modelom gotową listę do cytowania. Wildmoose.pl zbudował na tym całą stronę i to jego jedyna przewaga. Nagłówek niesie pełną frazę „strona internetowa”, której dziś na stronie nie ma ani razu.
- **Typ:** lista pogrupowana w pięć bloków

**TREŚĆ:**

Wstęp:

> Kroki wyżej mówią, jak przebiega projekt. Ta lista mówi, co odhaczamy po drodze, punkt po punkcie.
> Jeśli czegoś tu nie ma, a potrzebujesz tego, powiedz na pierwszej rozmowie. Wtedy to wycenimy, zamiast dopisywać w połowie projektu.

**Przygotowanie**
1. Rozmowa o tym, kto ma trafiać na stronę i po co, zanim ktokolwiek dotknie projektu graficznego.
2. Lista pytań, które Twój klient realnie zadaje, spisana Twoim językiem, nie branżowym.
3. Architektura informacji: co jest na stronie głównej, co w podstronach, w jakiej kolejności.
4. Projekt graficzny pokazany do akceptacji, zanim powstanie kod.

**Treść**
5. Napisanie treści, w tym nagłówków sformułowanych jak pytania klienta.
6. Odpowiedź na każde pytanie w pierwszym akapicie pod nagłówkiem, żeby dało się ją zacytować.
7. Tabele i konkretne liczby tam, gdzie da się je podać, bo to właśnie one są cytowane.
8. Sekcja z najczęstszymi pytaniami, zbudowana z pytań, które padają na Twoich rozmowach.
9. Sekcja bloga z pierwszym wpisem, jeśli zamawiasz stronę biznesową albo zaawansowaną.

**Kod i szybkość**
10. Kodowanie strony jako statycznej albo lekkiej aplikacji, bez wtyczek, które trzeba potem łatać.
11. Cała treść oddana w kodzie od razu, bez doczytywania skryptem.
12. Wersja mobilna sprawdzona na realnym telefonie, nie tylko w podglądzie przeglądarki.
13. Kompresja grafik, format WebP, ładowanie obrazków dopiero przy przewijaniu.
14. Certyfikat SSL i przekierowanie całego ruchu na wersję szyfrowaną.
15. Formularz kontaktowy z powiadomieniem na Twojego maila i ochroną przed spamem.

**Widoczność w Google i w AI**
16. Dane strukturalne firmy: nazwa, adres, telefon, godziny, obszar działania.
17. Dane strukturalne usług i sekcji pytań, żeby wyszukiwarka i modele wiedziały, co jest czym.
18. Tytuły i opisy do wyników wyszukiwania, osobne dla każdej podstrony.
19. Mapa strony XML i zgłoszenie jej w Google Search Console.
20. Plik robots.txt ustawiony tak, żeby roboty modeli AI miały wstęp tam, gdzie mają go mieć.
21. Linkowanie wewnętrzne między podstronami, żeby ważne strony dostawały ruch z pozostałych.
22. Podpięcie pomiaru ruchu, żebyś widział, skąd przychodzą ludzie.
23. Test pięcioma pytaniami w ChatGPT, Perplexity i Gemini, wykonany przed publikacją i po niej.

**Odbiór i przekazanie**
24. Przeniesienie domeny i uruchomienie strony na docelowym adresie.
25. Dwie rundy poprawek: tydzień testów u Ciebie, poprawki, drugi tydzień, poprawki, odbiór.
26. Przekazanie dostępów: domena, hosting, panel, statystyki. Wszystko jest Twoje.

Czego nie ma w cenie:

> Tekstów prawnych. Politykę prywatności i regulamin pisze Twój prawnik, my je wpinamy na stronę.
> Porządkowania danych firmy w Mapach Google i w katalogach. To praca poza stroną, więc wyceniamy ją osobno.
> Nowych funkcji, o których nie było mowy na pierwszej rozmowie. Te wyceniamy osobno, żeby cena z oferty została ceną z faktury.

- **Źródło liczb:** dwie rundy poprawek i rytm „tydzień testów, poprawki, drugi tydzień, poprawki, odbiór”: konspekt firmy. Nowe funkcje spoza pierwszej rozmowy jako osobna wycena: konspekt firmy. Punkty 10, 11, 20 i 22 są zgodne z tym, co strona już deklaruje w sekcji `rozwiazanie` (Treść w kodzie od razu, Boty wpuszczone świadomie, Pomiar po starcie). Z pierwotnej listy USUNIĘTO cztery zobowiązania, których nikt nie potwierdził: politykę prywatności i informację o ciasteczkach, spójność danych w Mapach Google i katalogach, rozdzielenie ruchu z wyszukiwarek od ruchu z modeli AI oraz podpis autora treści. Pierwsze dwa wróciły jako pozycje wprost wyłączone z ceny. Blog dopisany do listy, bo obiecuje go tabela cenowa (błąd walidacji o rozjeździe tabeli z listą).

---

### 6. Jakie efekty dały strony internetowe, które zbudowaliśmy?

- **Gdzie wstawić:** po nowej sekcji 5, nadal przed sekcją `ramaCeny`. Dowód ma stać bezpośrednio przed ceną.
- **Po co:** nasza największa przewaga nad całą stawką: mamy zgody na nazwy i mamy wyniki, a żaden z przebadanych konkurentów nie ma case study z nazwą plus wynikiem wpiętego wprost na stronę usługi (soluma.pl daje same logotypy, adsfox.pl wideo-opinie bez liczb). Nagłówek zmieniony z „Komu ta strona już zadziałała?” na frazę, którą ktoś realnie wpisuje.
- **Typ:** tabela

**TREŚĆ:**

Wstęp:

> Pięć firm, pięć różnych celów, nazwy podane za zgodą klientów. Możesz je sprawdzić sam, zamiast wierzyć w wykres bez podpisu.

| Klient | Co zbudowaliśmy | Wynik |
|---|---|---|
| Lenart Motors | Strona WWW pod widoczność w ChatGPT | ChatGPT wskazuje firmę, gdy ktoś pyta o najlepszego blacharza i lakiernika premium. Efekt pojawił się po około 3 tygodniach od publikacji. |
| Fichtelgebirgshaus.de (Niemcy) | Strona WWW pod frazy zapisane w umowie | Pierwsza dziesiątka Google na uzgodnione frazy plus widoczność w GPT. |
| Trockenhaus (Niemcy) | Strona WWW i chatbot | W Google z pozycji niewidocznej do pierwszej trójki na frazę Trockenhaus. |
| Przystań Jurgen | Strona WWW i chatbot | W sezonie około 100 zapytań od 20 do 50 klientów, zebranych przez stronę i bota. |
| Waste Return | Strona WWW | Gotowa i opublikowana w 3 do 4 dni roboczych. |

Pod tabelą:

> Nazwy podajemy za zgodą klientów. O referencje pytamy ich indywidualnie przy konkretnym projekcie, bo nie każdy chce odbierać telefony od cudzych kontrahentów.
> Dwie z tej piątki to rynek niemiecki. Pracujemy w Polsce i w Niemczech.

- **Źródło liczb:** wszystko z konspektu firmy. Lenart Motors około 3 tygodnie od publikacji. Fichtelgebirgshaus.de pierwsza dziesiątka na frazy z umowy plus widoczność w GPT. Trockenhaus z niewidocznej do pierwszej trójki na frazę Trockenhaus. Przystań Jurgen około 100 zapytań od 20 do 50 klientów w sezonie. Waste Return strona WWW w 3 do 4 dni roboczych. Z karty Trockenhaus USUNIĘTO wynik narzędzia do kosztorysowania (błąd walidacji: to inny produkt, nie efekt strony; ten wynik zostaje na podstronie o rynku niemieckim). Z karty Przystań Jurgen USUNIĘTO dopisek „obsłużonych bez angażowania człowieka” (bloker walidacji: nikt tego nie mierzył).

---

### 7. Co zapłacę za stronę internetową i co jeszcze dojdzie później?

- **Gdzie wstawić:** po sekcji `ramaCeny` („Ile kosztuje strona pod SEO i AI?”), przed sekcją `faq`. To rozwinięcie ramy w konkretne kwoty.
- **Po co:** pięciu z dziewięciu przebadanych konkurentów podaje kwoty, my dziś mamy tylko ramę. Nagłówek celowo NIE brzmi „Ile kosztuje strona internetowa”, bo tę frazę przejmuje nowa podstrona `/uslugi/strony-www/cennik`, a dwa takie same H2 na jednej ścieżce kanibalizowałyby się. Tutaj łapiemy drugą intencję: ukryte koszty i koszty utrzymania. Termin przy każdym progu to nasz realny wyróżnik, bo depcore.pl i top1wsieci.pl nie deklarują terminów w ogóle.
- **Typ:** tabele w trzech blokach H3

**TREŚĆ:**

Wstęp:

> Trzy progi, każdy z ceną i czasem budowy. Termin jest częścią oferty, nie życzeniem, bo to on zwykle decyduje, czy zdążysz przed sezonem.
> Wszystkie kwoty są netto. Do każdej doliczasz VAT według stawki, która Cię obowiązuje.

**H3: Ile kosztuje sama strona**

| Co zamawiasz | Co dostajesz | Czas budowy | Cena netto |
|---|---|---|---|
| Landing page | Jedna strona z jednym celem: telefon, formularz albo zapis. Treść, projekt, wersja mobilna, pomiar ruchu | 1 dzień roboczy | 1590 zł |
| Strona biznesowa | Strona główna plus podstrony usług, treść pod frazy i pod cytowanie przez AI, dane strukturalne, formularz, sekcja bloga | 2 do 4 dni roboczych | 2900 zł |
| Strona zaawansowana | Rozbudowany serwis: sklep, wiele języków, kalkulatory, strefa klienta, wpięte narzędzia | 5 do 10 dni roboczych | od 5900 zł |
| Chatbot prosty | Bot na stronie, baza wiedzy z Twoich materiałów, zbieranie leadów. Możesz go dołożyć do każdego progu | 1 do 2 dni roboczych | 1790 zł |
| Chatbot średni | Bot z szerszą bazą wiedzy i rozbudowaną obsługą zapytań | 3 do 4 dni roboczych | 3000 do 6000 zł |
| Chatbot z integracjami | Bot spięty z Twoim systemem, kalendarzem albo CRM | 5 do 10 dni roboczych | 8000 do 15000 zł |

Pod tabelą:

> Czas budowy to czas naszej pracy. Do niego dochodzą jeszcze dwa tygodnie Twoich testów i poprawek przed odbiorem: tydzień testów u Ciebie, poprawki, drugi tydzień, poprawki, odbiór. Obie rundy są w cenie.
> Nowe funkcje, o których nie było mowy na pierwszej rozmowie, wyceniamy osobno. Bez tego termin przestaje cokolwiek znaczyć.
> Żeby było do czego porównać: projektowaniestroncennik.pl podaje pakiety od 1900 zł do ponad 4000 zł brutto (sprawdzone 2026-08-31). Tamte kwoty są brutto, nasze netto, więc 1900 zł brutto to po przeliczeniu 1900 podzielone przez 1,23, czyli około 1545 zł netto. Nasz landing za 1590 zł netto wychodzi praktycznie w tej samej cenie, tylko z terminem podanym wprost.
> Nasza strona biznesowa jest nieco droższa od rynkowego środka, bo w tej cenie robimy także warstwę pod cytowanie przez AI, której tam nie ma. Strona zaawansowana startuje wyżej, bo to 5 do 10 dni roboczych pracy.

**H3: Za co jeszcze zapłacisz, gdy bierzesz samą stronę**

| Pozycja | Komu płacisz | Ile to kosztuje | Jak często |
|---|---|---|---|
| Domena | Rejestratorowi domen, na swoje konto | Płacisz wprost u rejestratora, cena zależy od końcówki adresu i wybranego pakietu | Raz w roku |
| Hosting albo serwer | Firmie hostingowej, na swoje konto | Płacisz wprost u dostawcy, cena zależy od wielkości serwisu i ruchu | Raz w roku albo miesięcznie |
| Dwie rundy poprawek przed odbiorem | Nikomu | W cenie wdrożenia | Raz, w trakcie projektu |

Pod tabelą:

> Domenę rejestrujemy na Ciebie, nie na siebie. Jeśli kiedyś zmienisz wykonawcę, zabierasz adres ze sobą i nie musisz nikogo prosić o zgodę.
> Hosting też jest Twój. Strona postawiona na cudzym serwerze bywa zakładnikiem, gdy wykonawca przestaje odbierać telefon.
> Sama strona nie ma u nas abonamentu. Po odbiorze nie płacisz nam nic.

**H3: Za co zapłacisz, gdy dokładasz bota**

Przy botach wybierasz jedną z dwóch dróg i mówimy o tym przed podpisaniem:

| Droga | Co płacisz co miesiąc | Poprawki po odbiorze | Zużycie modelu AI |
|---|---|---|---|
| Infrastruktura zostaje u nas | 99 do 599 zł netto miesięcznie za utrzymanie | W abonamencie | Z Twojego konta u dostawcy modelu, płacisz tylko za to, co zostało wykorzystane |
| Przekazujemy infrastrukturę Tobie | 0 zł | 350 zł netto za godzinę, tylko gdy zlecisz | Z Twojego konta u dostawcy modelu |

Pod tabelą:

> Przy botach zawsze rozbijamy rachunek na trzy pozycje: stworzenie, utrzymanie i zużycie modelu po Twojej stronie. Jedna zbiorcza kwota zawsze coś ukrywa.
> Z abonamentu u nas można wyjść. Jeśli wolisz, żeby wszystko stało na Twoich kontach, przekazujemy infrastrukturę i płacisz nam tylko za konkretne poprawki.

- **Źródło liczb:** ceny stron 1590 / 2900 / od 5900 zł netto oraz terminy: decyzja właściciela z 2026-08-31. Chatboty 1790 zł, 3000 do 6000 zł, 8000 do 15000 zł z terminami: konspekt firmy. Utrzymanie 99 do 599 zł netto miesięcznie, wariant 0 zł przy przekazaniu infrastruktury i poprawki 350 zł netto za godzinę: decyzja właściciela z 2026-08-31 (model rozszerzony z voicebotów na wszystkie usługi). Dwie rundy poprawek i osobna wycena nowych funkcji: konspekt firmy. Odniesienie rynkowe od 1900 do ponad 4000 zł brutto: projektowaniestroncennik.pl, sprawdzone 2026-08-31. Przeliczenie 1900 podzielone przez 1,23, czyli około 1545 zł netto, to własne działanie pokazane w treści. Kwoty domeny i hostingu USUNIĘTE z tabeli (bloker walidacji: stały tam znaczniki [DO POTWIERDZENIA]); wiersze opisują teraz mechanizm płatności, nie kwotę. Ceny soluma.pl USUNIĘTE (błąd walidacji: strona nie podaje, czy to netto czy brutto).

---

### 8. Kiedy nie powinieneś zamawiać u nas strony internetowej?

- **Gdzie wstawić:** po nowej sekcji 7, przed sekcją `faq`.
- **Po co:** granice usługi. Żaden z dziewięciu przebadanych konkurentów tego nie ma, więc to czysta luka. Buduje wiarygodność wszystkiego, co stoi wyżej, i jest chętnie cytowane przez modele jako fragment o wadach usługi.
- **Typ:** lista

**TREŚĆ:**

Wstęp:

> Są sytuacje, w których szkoda Twoich pieniędzy. Wolimy powiedzieć to teraz niż po trzech tygodniach projektu.
> Cztery przypadki, w których odsyłamy klienta gdzie indziej albo proponujemy coś tańszego.

**1. Potrzebujesz czegokolwiek na wczoraj i masz na to kilkaset złotych.**
Kreator stron zrobi to taniej i szybciej niż my. To nie jest wstyd, tylko właściwe narzędzie do tego budżetu. Wróć do nas, gdy strona zacznie być wąskim gardłem, a nie kosztem.

**2. Masz stronę, która już rankuje i przynosi zapytania.**
Wtedy nowy serwis to ryzyko, nie postęp. Zaczynamy od rozmowy o tym, czy da się poprawić to, co masz, zamiast budować od zera i tracić pozycje. Zakres i cenę ustalamy dopiero po obejrzeniu Twojej strony.

**3. Chcesz być w ChatGPT w tydzień.**
Tego nie obiecujemy. U naszych klientów efekt pojawiał się w tygodniach, nie w dniach, i to były dobre przypadki, nie reguła. Kto obiecuje Ci siedem dni, ten zgaduje albo sprzedaje.

**4. Nie masz kto odbierać zapytań.**
Strona, która generuje leady, a nikt na nie nie odpowiada, to koszt bez zwrotu. Najpierw ustal, kto oddzwania i w jakim czasie. Potem rozmawiajmy o stronie. Jeśli nie masz kim tego obsadzić, tańszym krokiem jest chatbot za 1790 zł netto, który odbierze pytanie o każdej porze.

Pod listą:

> Jeśli żaden z tych czterech punktów Cię nie dotyczy, to znaczy, że rozmowa z nami ma sens. Wtedy najgorsze, co się stanie, to że dostaniesz konkretną wycenę i termin.

- **Źródło liczb:** chatbot prosty 1790 zł netto: konspekt firmy. Punkt 3 celowo NIE powtarza terminu z realizacji Lenart Motors, żeby liczba nie stała na stronie po raz czwarty (błąd walidacji o powtórzeniach). Punkt 4 został dopisany w całości, bo w oddanej treści był urwany w połowie zdania (bloker walidacji). Z punktu 2 USUNIĘTO ofertę „dołożenia samej warstwy widoczności w AI” (błąd walidacji: produkt spoza cennika, bez kwoty i terminu); zostało zaproszenie do rozmowy bez obietnicy ceny.

---

### 9. Mam stronę na WordPressie, czy potrzebuję nowej?

- **Gdzie wstawić:** po nowej sekcji 8, przed sekcją `faq`.
- **Po co:** domyka sprzedaż i łapie długie ogony: „czy mała firma ma szansę w ChatGPT”, „czy warto robić stronę samemu”, „czy kreator wystarczy”, „czy GEO nie przestanie działać za rok”. Clickmade.pl i adsfox.pl mają pojedyncze odpowiedniki, nikt nie ma kompletu. Blok jest dłuższy i bardziej narracyjny niż sekcja pytań, więc się z nią nie kanibalizuje.
- **Typ:** cztery bloki H3

**TREŚĆ:**

Wstęp:

> Cztery zdania, które słyszymy najczęściej. Odpowiadamy na nie tak samo na rozmowie, jak tutaj.

**H3: Mam stronę na WordPressie, czy potrzebuję nowej?**
Jeśli Twoja strona przynosi zapytania, nie rób nowej. Serio. Zacznijmy od rozmowy o tym, co da się poprawić w tym, co już masz.
Nową robimy wtedy, gdy stara ładuje się wolno, treść siedzi w grafikach albo w skryptach, a każda zmiana wymaga wtyczki. Wtedy naprawianie kosztuje więcej niż zbudowanie od nowa.
Pytanie kontrolne: kiedy ostatni raz ktoś napisał, że znalazł Cię przez stronę? Jeśli nie pamiętasz, to nie jest strona, tylko wizytówka na serwerze.

**H3: Zrobię to sam w kreatorze, po co mi wykonawca?**
Możesz i czasem powinieneś. Kreator wystarczy, gdy potrzebujesz miejsca w internecie i nic więcej.
Różnica zaczyna się przy treści. Kreator da Ci ładny szablon, ale nie napisze akapitu, który ChatGPT zechce zacytować, i nie ustawi danych strukturalnych.
Policz swój czas. Dwa weekendy przy kreatorze to też koszt, tylko nie widać go na fakturze.

**H3: Jestem za mały, żeby AI mnie zauważyło.**
Lenart Motors i Trockenhaus to nie korporacje. To firmy, które postawiły na stronie konkretne odpowiedzi na konkretne pytania klientów.
Model nie sprawdza, ile masz oddziałów. Sprawdza, czy ma z czego zbudować odpowiedź. Mała firma z jasną treścią wygrywa z dużą, która pisze ogólnikami.
Przy wąskiej branży i jednym mieście masz nawet łatwiej, bo konkurencja o to zdanie jest mniejsza.

**H3: Modele się zmienią i cała ta praca pójdzie w kosz.**
Modele się zmienią, to pewne. Nie zmieni się to, że wolą treść, która wprost odpowiada na pytanie i jest dostępna dla robotów.
Wszystko, co robimy, działa też bez AI: szybka strona internetowa, czytelna struktura, dane firmy w jednym brzmieniu, sensowne linkowanie. To był dobry pomysł dziesięć lat temu i będzie za pięć.
Nie sprzedajemy Ci sztuczki na jeden model. Sprzedajemy stronę, którą da się zrozumieć i człowiekowi, i maszynie.

- **Źródło liczb:** sekcja nie zawiera żadnej kwoty ani procentu. Lenart Motors i Trockenhaus jako firmy niekorporacyjne z realnym efektem: konspekt firmy.

---

### 10. Najczęstsze pytania o strony WWW pod SEO i AI (rozbudowa istniejącego FAQ)

- **Gdzie wstawić:** wewnątrz istniejącej sekcji `faq`. Sześć dotychczasowych pytań zostaje bez zmian, 12 nowych dopisujemy pod nimi w podanej kolejności.
- **Po co:** mamy 6 pytań, adsfox.pl ma 18. To najtańszy sposób na złapanie kilkunastu długich ogonów naraz. Dochodzi znacznik FAQPage, którego nie mamy, a mają go codescriptum.pl i clickmade.pl.
- **Typ:** FAQ plus znacznik JSON-LD

**TREŚĆ (12 nowych pytań):**

**P: Ile kosztuje strona internetowa?**
O: Landing page kosztuje 1590 zł netto, strona biznesowa 2900 zł netto, a strona zaawansowana od 5900 zł netto. Do każdej kwoty doliczasz VAT według swojej stawki.

**P: Ile trwa zbudowanie strony?**
O: Landing page robimy w 1 dzień roboczy, stronę biznesową w 2 do 4 dni roboczych, stronę zaawansowaną w 5 do 10 dni roboczych. Licznik startuje, gdy mamy od Ciebie treści i logo. Do tego dochodzą dwa tygodnie Twoich testów i poprawek przed odbiorem.

**P: Czy podane ceny są netto czy brutto?**
O: Wszystkie nasze kwoty są netto. Doliczasz do nich VAT według stawki, która Cię obowiązuje.

**P: Co jeśli nie spodoba mi się projekt?**
O: Projekt graficzny pokazujemy do akceptacji, zanim powstanie kod. Uwagi zbieramy na tym etapie, bo tam poprawka kosztuje minuty, a nie dni.

**P: Ile rund poprawek jest w cenie?**
O: Dwie. Tydzień testów u Ciebie i poprawki, potem drugi tydzień i druga tura poprawek, a na końcu odbiór. Nowe funkcje spoza pierwszej rozmowy wyceniamy osobno.

**P: Kto jest właścicielem kodu i domeny?**
O: Ty. Domenę rejestrujemy na Ciebie, hosting stoi na Twoim koncie, kod i dostępy przekazujemy przy odbiorze. Zmiana wykonawcy nie wymaga naszej zgody.

**P: Czy po odbiorze płacę abonament?**
O: Za samą stronę nie płacisz nam nic. Płacisz tylko domenę i hosting u swoich dostawców. Jeśli masz u nas bota, wybierasz: utrzymanie 99 do 599 zł netto miesięcznie, albo przekazujemy Ci infrastrukturę, wtedy 0 zł miesięcznie i 350 zł netto za godzinę tylko wtedy, gdy zlecisz poprawkę.

**P: Czy strona będzie działać na telefonie?**
O: Tak, i sprawdzamy to na realnym telefonie, nie tylko w podglądzie przeglądarki. Większość Twoich klientów zobaczy stronę właśnie tak.

**P: Jak długo czeka się na efekt w Google?**
O: To zależy od tego, ilu masz konkurentów na daną frazę. Trockenhaus przeszedł z pozycji niewidocznej do pierwszej trójki na swoją frazę, Fichtelgebirgshaus.de wszedł do pierwszej dziesiątki na frazy zapisane w umowie. Terminu nikt uczciwie nie zagwarantuje.

**P: Jak długo czeka się na cytowanie w ChatGPT?**
O: U Lenart Motors ChatGPT zaczął wskazywać firmę po około 3 tygodniach od publikacji. To był dobry przypadek, nie obietnica dla każdego.

**P: Czy robicie strony po niemiecku?**
O: Tak, pracujemy na rynku polskim i niemieckim. Trockenhaus i Fichtelgebirgshaus.de to realizacje niemieckie, obie z wynikiem w Google.

**P: Czy mogę dopiąć chatbota później?**
O: Tak. Prosty bot z bazą wiedzy i zbieraniem leadów kosztuje 1790 zł netto i powstaje w 1 do 2 dni roboczych. Bot spięty z Twoim systemem to 8000 do 15000 zł netto i 5 do 10 dni roboczych.

**ZNACZNIK FAQPage DO WKLEJENIA W KOD (wzór, do uzupełnienia o wszystkie pytania, także sześć istniejących):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ile kosztuje strona internetowa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Landing page kosztuje 1590 zł netto, strona biznesowa 2900 zł netto, a strona zaawansowana od 5900 zł netto. Do każdej kwoty doliczasz VAT według swojej stawki."
      }
    }
  ]
}
</script>
```

Zasada: w znaczniku ma się znaleźć KAŻDE pytanie widoczne na stronie, w tym sześć dotychczasowych, a treść odpowiedzi ma być identyczna z tą na stronie. Rozjazd między kodem a treścią Google traktuje jako błąd.

- **Źródło liczb:** ceny stron 1590 / 2900 / od 5900 zł netto oraz model utrzymania 99 do 599 zł albo 0 zł przy przekazaniu infrastruktury plus 350 zł netto za godzinę: decyzja właściciela z 2026-08-31. Terminy stron, chatbot prosty 1790 zł w 1 do 2 dni, chatbot z integracjami 8000 do 15000 zł w 5 do 10 dni, dwie rundy poprawek, osobna wycena nowych funkcji, ceny netto: konspekt firmy. Trockenhaus, Fichtelgebirgshaus.de i Lenart Motors około 3 tygodnie: konspekt firmy. Rynki Polska i Niemcy: konspekt firmy.

---

### 11. Chcesz zobaczyć, co AI mówi dziś o Twojej firmie?

- **Gdzie wstawić:** po sekcji `faq`, bezpośrednio przed sekcją `cta`.
- **Po co:** miękkie wejście dla ludzi, którzy nie są gotowi na rozmowę handlową. Stoi PRZED twardym CTA, żeby go nie osłabiać, tylko przechwycić tych, którzy i tak by go nie kliknęli. Codescriptum.pl ma osobną sekcję z bezpłatnym audytem widoczności i zbiera nią adresy.
- **Typ:** karty (2 sztuki)

**TREŚĆ:**

Wstęp:

> Nie musisz od razu rozmawiać o zleceniu. Zacznij od sprawdzenia, jak wypadasz dzisiaj.

Karta 1
Tytuł: Bezpłatna diagnoza
Co dostajesz: Około 30 minut rozmowy o tym, gdzie realnie tracisz zapytania. Możesz poprosić, żebyśmy przeszli razem przez pięć pytań z tej strony w ChatGPT, Perplexity i Gemini i zobaczyli, co odpowiadają o Twojej firmie.
Cena: 0 zł
Przycisk: Umów diagnozę

Karta 2
Tytuł: Audyt AI, czyli Sprint Diagnostyczny
Co dostajesz: Raport PDF z mapą procesów w Twojej firmie i wskazaniem, co realnie opłaca się zautomatyzować, a co zostawić człowiekowi.
Termin: 5 dni roboczych
Cena: 1490 zł netto, odliczane od wdrożenia, jeśli zdecydujesz się z nami pracować
Przycisk: Zamów audyt

Pod kartami:

> Możesz też pominąć oba kroki i po prostu sprawdzić nas sam. W prawym dolnym rogu tej strony siedzi nasz bot, działa na modelu Claude od Anthropic i odpowiada od ręki. Pytaj go o co chcesz.

- **Źródło liczb:** Audyt AI (Sprint Diagnostyczny) 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów, odliczany od wdrożenia: konspekt firmy. Bezpłatna diagnoza 0 zł i około 30 minut: treść, którą strona już deklaruje w sekcjach `kroki` i `ramaCeny`. Bot na stronie: zweryfikowane 2026-08-31 w kodzie, `AgentConsole` stoi w `app/layout.tsx` (linia 128), więc przycisk „Zapytaj AI” jest na każdej podstronie; model `claude-haiku-4-5` w `app/api/chat/route.ts` (linia 82), dostawca Anthropic. Pomysł na „bezpłatny raport widoczności w AI” jako nowy produkt został WYCIĘTY i zastąpiony istniejącą bezpłatną diagnozą, żeby nie obiecywać usługi, której nie ma w cenniku.

---

## Nowe podstrony

Wszystkie pod `rodzic: 'strony-www'`, więc ścieżki mają postać `/uslugi/strony-www/<slug>`. Mechanika taka sama jak przy podstronach voicebotów: plik w `lib/uslugi/podstrony/`, wpis w `lib/uslugi/podstrony/index.ts`, etykieta rodzica w `okruszki.ts`, trasa `app/uslugi/strony-www/[podstrona]/page.tsx`.

---

### Podstrona 1: /uslugi/strony-www/cennik

- **H1:** Ile kosztuje strona internetowa? Cennik i terminy
- **metaTitle:** `Ile kosztuje strona internetowa? Cennik` (39 znaków)
- **Fraza główna:** ile kosztuje strona internetowa
- **Rozdział intencji wobec sąsiadów:** strona macierzysta `/uslugi/strony-www` sprzedaje PODEJŚCIE (strona zbudowana pod SEO i AI) i odpowiada na pytanie „co jeszcze dopłacę później”. Ta podstrona odpowiada wyłącznie na pytanie o pieniądze i czas: nasze progi z terminem, odniesienie rynkowe, koszty utrzymania. Nie opisuje procesu ani technologii, tylko linkuje do strony macierzystej. Podstrona `/landing-page` bierze jeden próg, ta bierze cały cennik.

**Kapsuła (do pola `kapsula`):**

> Landing page kosztuje u nas 1590 zł netto i powstaje w 1 dzień roboczy. Strona biznesowa to 2900 zł netto i 2 do 4 dni roboczych, a strona zaawansowana od 5900 zł netto i 5 do 10 dni roboczych. Do każdej ceny dochodzą dwie rundy poprawek w cenie oraz Twoja domena i hosting, które płacisz wprost dostawcom. Sama strona nie ma u nas abonamentu.

**Sekcje:**
1. Ile kosztuje strona internetowa w Polsce (odniesienie rynkowe: projektowaniestroncennik.pl od 1900 do ponad 4000 zł brutto, sprawdzone 2026-08-31, z przeliczeniem na netto)
2. Nasz cennik: trzy progi z ceną i czasem budowy (tabela z sekcji 7 pakietu, blok H3 pierwszy)
3. Od czego zależy cena, czyli dlaczego ta sama strona raz kosztuje mniej, a raz więcej
4. Co jest w cenie, punkt po punkcie (skrócona lista z sekcji 5 pakietu, pięć bloków)
5. Za co jeszcze zapłacisz, gdy bierzesz samą stronę (domena, hosting, bez abonamentu)
6. Dopięcie chatbota do strony i trzy pozycje w rachunku (tabela z sekcji 7 pakietu, blok H3 trzeci)
7. Ile trwa budowa i co dochodzi po niej (dwa tygodnie testów i poprawek przed odbiorem)
8. Kiedy taniej wychodzi kreator niż my (granice usługi, punkt 1 z sekcji 8 pakietu)
9. Realizacja z liczbą: Waste Return, strona WWW w 3 do 4 dni roboczych
10. FAQ o cenach, 10 pytań, znacznik FAQPage
11. CTA: bezpłatna diagnoza 0 zł albo Audyt AI 1490 zł netto odliczany od wdrożenia

**FAQ (10 pytań, gotowe):**

P: Ile kosztuje strona internetowa?
O: Landing page 1590 zł netto, strona biznesowa 2900 zł netto, strona zaawansowana od 5900 zł netto. Wszystkie kwoty są netto, doliczasz do nich VAT według swojej stawki.

P: Dlaczego strona zaawansowana ma cenę „od”?
O: Bo pod tą nazwą kryje się sklep, wiele języków, kalkulatory albo wpięte narzędzia, a to są różne nakłady. Dolna granica to 5900 zł netto przy 5 do 10 dniach roboczych pracy. Dokładną kwotę podajemy po pierwszej rozmowie o zakresie.

P: Czy w cenie są poprawki?
O: Tak, dwie rundy. Tydzień testów u Ciebie, poprawki, drugi tydzień, poprawki, odbiór. Nowe funkcje, o których nie było mowy na pierwszej rozmowie, wyceniamy osobno.

P: Ile kosztuje utrzymanie strony?
O: Sama strona nie ma u nas abonamentu. Płacisz tylko domenę i hosting wprost swoim dostawcom, na własnych kontach.

P: A jeśli dokładam chatbota?
O: Wtedy wybierasz jedną z dwóch dróg. Infrastruktura zostaje u nas i płacisz 99 do 599 zł netto miesięcznie, albo przekazujemy ją Tobie i płacisz 0 zł miesięcznie, a poprawki kosztują 350 zł netto za godzinę tylko wtedy, gdy je zlecisz. Zużycie modelu AI idzie z Twojego konta w obu wariantach.

P: Ile kosztuje sam chatbot?
O: Prosty bot z bazą wiedzy i zbieraniem leadów to 1790 zł netto i 1 do 2 dni roboczych. Bot średni to 3000 do 6000 zł netto i 3 do 4 dni robocze. Bot spięty z Twoim systemem to 8000 do 15000 zł netto i 5 do 10 dni roboczych.

P: Czy dostanę fakturę VAT?
O: Tak. Wszystkie ceny na tej stronie są netto, do faktury dochodzi VAT według obowiązującej stawki.

P: Czy ceny są takie same dla klienta z Niemiec?
O: Tak, cennik i terminy są te same. Pracujemy na rynku polskim i niemieckim.

P: Czy mogę zacząć od najtańszego progu i rozbudować stronę później?
O: Tak i często tak robimy. Landing page za 1590 zł netto sprawdza, czy oferta w ogóle chwyta, a dopiero potem budujemy serwis.

P: Ile kosztuje audyt przed decyzją?
O: Diagnoza jest bezpłatna i trwa około 30 minut. Pełny Audyt AI, czyli Sprint Diagnostyczny, to 1490 zł netto i 5 dni roboczych, a kwotę odliczamy od wdrożenia, jeśli zdecydujesz się z nami pracować.

**Uzasadnienie:** najgorętsza fraza w obszarze. Konkurencja o zerowej sile domeny (projektowaniestroncennik.pl, top1wsieci.pl, depcore.pl, soluma.pl) rankuje tu wyłącznie kompletnością cennika, nie autorytetem. Przy DR 18 wygrywamy dwoma rzeczami, których nie ma nikt: terminem podanym przy KAŻDYM progu i jawnym rozbiciem kosztów utrzymania botów na trzy pozycje.

---

### Podstrona 2: /uslugi/strony-www/landing-page

- **H1:** Landing page w jeden dzień roboczy
- **metaTitle:** `Landing page w 1 dzien roboczy` (30 znaków)
- **Fraza główna:** landing page cena
- **Rozdział intencji wobec sąsiadów:** najniższy próg wejścia i najkrótszy termin z całej oferty. Strona macierzysta mówi o serwisie firmowym, ta podstrona o jednej stronie pod jedną kampanię albo jedną usługę. Rozdziela się produktem (jedna strona, nie serwis) i terminem (1 dzień roboczy). Po pełne widełki odsyła do `/cennik`.

**Kapsuła (do pola `kapsula`):**

> Landing page budujemy w 1 dzień roboczy za 1590 zł netto. To jedna strona z jednym celem: telefon, formularz albo zapis. W cenie są treść, projekt, wersja mobilna, pomiar ruchu i dwie rundy poprawek. Jeśli potrzebujesz kilku podstron pod różne usługi, to już strona biznesowa za 2900 zł netto.

**Sekcje:**
1. Kiedy wystarczy jedna strona, a kiedy potrzebujesz serwisu (tabela decyzyjna)
2. Co dostajesz w jednym dniu roboczym
3. Landing pod kampanię reklamową a landing pod jedną usługę, czym się różnią
4. Jak piszemy treść, żeby konwertowała i żeby cytowało ją AI
5. Cena i termin: 1590 zł netto, 1 dzień roboczy, dwie rundy poprawek w cenie
6. Za co jeszcze zapłacisz: domena i hosting, płacone wprost dostawcom
7. Kiedy jeden dzień to za mało (granice usługi)
8. Realizacja z liczbą: Waste Return, strona WWW w 3 do 4 dni roboczych
9. FAQ, 8 pytań, znacznik FAQPage
10. CTA: bezpłatna diagnoza 0 zł

**FAQ (8 pytań, gotowe):**

P: Ile kosztuje landing page?
O: 1590 zł netto. W tej cenie jest treść, projekt graficzny, wersja mobilna, pomiar ruchu i dwie rundy poprawek.

P: Czy naprawdę robicie landing w jeden dzień?
O: Tak, jeden dzień roboczy to czas naszej pracy. Licznik startuje, gdy mamy od Ciebie treści, logo i zgodę na kierunek. Po budowie dochodzą jeszcze dwa tygodnie Twoich testów i poprawek przed odbiorem.

P: Co muszę przygotować przed startem?
O: Logo, opis oferty własnymi słowami, dane kontaktowe i informacje, kto ma trafiać na stronę. Resztę piszemy my.

P: Czym różni się landing od strony biznesowej?
O: Landing to jedna strona z jednym celem. Strona biznesowa za 2900 zł netto ma stronę główną i podstrony pod poszczególne usługi, więc łapie więcej różnych zapytań.

P: Czy landing będzie widoczny w Google i w AI?
O: Tak, budujemy go tak samo jak większe strony: cała treść w kodzie od razu, nagłówki jak pytania klienta, odpowiedź w pierwszym akapicie, dane strukturalne. Jedna strona łapie jednak mniej fraz niż serwis.

P: Czy mogę dołożyć chatbota do landinga?
O: Tak. Prosty bot z bazą wiedzy i zbieraniem leadów to 1790 zł netto i 1 do 2 dni roboczych.

P: Kto płaci za domenę i hosting?
O: Ty i płacisz wprost dostawcom, na swoje konta. Dzięki temu adres i serwer są Twoje, a zmiana wykonawcy nie wymaga niczyjej zgody.

P: Ile rund poprawek jest w cenie?
O: Dwie. Tydzień testów u Ciebie, poprawki, drugi tydzień, poprawki, odbiór.

**Uzasadnienie:** wejście dla najtańszego i najszybciej domykanego leada, który potem kupuje chatbota albo automatyzację. Konkurencja handluje tu wyłącznie ceną, bez podania terminu (top1wsieci.pl, soluma.pl). Jeden dzień roboczy podany wprost jest mocniejszym haczykiem niż sama kwota, a mamy go w zatwierdzonym cenniku.

---

### Podstrona 3: /uslugi/strony-www/strona-z-chatbotem

- **H1:** Strona internetowa z chatbotem AI, który odpowiada klientom
- **metaTitle:** `Strona internetowa z chatbotem AI` (33 znaki)
- **Fraza główna:** strona internetowa z chatbotem AI
- **Rozdział intencji wobec sąsiadów:** strona macierzysta sprzedaje sam serwis. Ta podstrona sprzedaje pakiet strona plus bot i odpowiada na pytanie „czy strona może odpowiadać klientom sama”. Nie duplikuje usługi `/uslugi/chatboty` (tam punktem wyjścia jest bot na ISTNIEJĄCĄ stronę albo do CRM), tutaj punktem wyjścia jest budowa nowej strony. Linkowanie krzyżowe w obie strony z rozdziałem wyłożonym w pierwszym akapicie.

**Kapsuła (do pola `kapsula`):**

> Budujemy stronę i wpinamy w nią bota, który odpowiada Twoim klientom o każdej porze. Strona kosztuje od 1590 zł netto, prosty bot z bazą wiedzy i zbieraniem leadów 1790 zł netto przy 1 do 2 dniach roboczych. Bot odpowiada na stronie WWW, a także na WhatsAppie, Messengerze, Instagramie i Telegramie. Rachunek zawsze rozbijamy na trzy pozycje: stworzenie, utrzymanie i zużycie modelu po Twojej stronie.

**Sekcje:**
1. Ile zapytań ucieka Ci wieczorem i w weekend (problem)
2. Jak to działa: strona, baza wiedzy z Twoich materiałów, bot zbiera leady
3. Gdzie bot odpowiada: strona WWW, WhatsApp, Messenger, Instagram, Telegram
4. Bot, którego przetestujesz od ręki (nasz własny, przycisk „Zapytaj AI” w prawym dolnym rogu, model Claude od Anthropic)
5. Trzy pozycje w rachunku, nie jedna: stworzenie, utrzymanie, zużycie modelu po stronie klienta
6. Dwie drogi utrzymania: infrastruktura u nas za 99 do 599 zł netto miesięcznie albo przekazana Tobie za 0 zł, z poprawkami 350 zł netto za godzinę
7. Cennik z terminem: strona od 1590 zł netto, bot prosty 1790 zł w 1 do 2 dni roboczych, średni 3000 do 6000 zł w 3 do 4 dni roboczych, z integracjami 8000 do 15000 zł w 5 do 10 dni roboczych
8. Realizacja z liczbą: Desant.pl, chatbot, 30 do 50 klientów miesięcznie i 200 do 280 wiadomości
9. Realizacja z liczbą: Przystań Jurgen, strona plus chatbot, w sezonie około 100 zapytań od 20 do 50 klientów
10. Realizacja z nazwą: Trockenhaus (Niemcy), strona plus chatbot, z niewidocznej do pierwszej trójki Google na frazę Trockenhaus
11. Czego bot NIE zrobi (nie zastąpi handlowca przy negocjacji, nie odpowie na to, czego nie ma w bazie wiedzy)
12. Obiekcje: a jak bot skłamie, a jak klient chce człowieka, a co z RODO
13. FAQ, 10 pytań, znacznik FAQPage
14. CTA: bezpłatna diagnoza 0 zł

**FAQ (10 pytań, gotowe):**

P: Ile kosztuje strona z chatbotem?
O: Strona od 1590 zł netto za landing albo 2900 zł netto za stronę biznesową, plus bot. Prosty bot to 1790 zł netto i 1 do 2 dni roboczych, średni 3000 do 6000 zł netto, bot spięty z Twoim systemem 8000 do 15000 zł netto.

P: Gdzie bot może odpowiadać poza stroną?
O: Na WhatsAppie, Messengerze, Instagramie i Telegramie. Kanały wybierasz przy wdrożeniu.

P: Ile kosztuje utrzymanie bota?
O: Masz dwie drogi. Infrastruktura zostaje u nas i płacisz 99 do 599 zł netto miesięcznie, albo przekazujemy ją Tobie i płacisz 0 zł miesięcznie, a poprawki kosztują 350 zł netto za godzinę tylko wtedy, gdy je zlecisz.

P: Czy z abonamentu można wyjść?
O: Tak. Przekazujemy Ci wtedy całą infrastrukturę i zostaje Ci 0 zł miesięcznie u nas. Płacisz tylko za konkretne poprawki, 350 zł netto za godzinę.

P: Kto płaci za zużycie modelu AI?
O: Ty, wprost u dostawcy modelu i z własnego konta. Płacisz tylko za to, co zostało faktycznie wykorzystane, a rozliczenie widzisz u siebie, nie w naszej fakturze.

P: Skąd bot wie, co odpowiadać?
O: Z bazy wiedzy zbudowanej z Twoich materiałów: oferty, cennika, opisów usług, najczęstszych pytań. Czego nie ma w bazie, o tym bot nie mówi.

P: A jeśli bot czegoś nie wie?
O: Mówi, że nie wie, i przekazuje pytanie do człowieka razem z kontaktem do klienta. To jest bezpieczniejsze niż zgadywanie.

P: Czy mogę przetestować Waszego bota przed decyzją?
O: Tak, od ręki. Kliknij „Zapytaj AI” w prawym dolnym rogu tej strony. To nasz własny bot, działa na modelu Claude od Anthropic.

P: Czy bot zbiera dane klientów zgodnie z RODO?
O: Bot zbiera tylko to, co sam ustawisz w konfiguracji, najczęściej imię, kontakt i treść pytania. Dane trafiają tam, gdzie wskażesz, a klient widzi informację, z kim rozmawia.

P: Czy bot zastąpi handlowca?
O: Nie i nie do tego go budujemy. Odbiera pytanie o każdej porze, odpowiada na powtarzalne rzeczy i zbiera kontakt. Negocjacje i trudne rozmowy zostają przy człowieku.

**Uzasadnienie:** żaden z dziewięciu przebadanych konkurentów nie sprzedaje pakietu strona plus bot jako jednej pozycji, a to nasz naturalny produkt. Mamy trzy realizacje z liczbami i bota do przetestowania na żywo na własnej stronie. Fraza mniejsza niż cennikowa, ale intencja bardzo zakupowa i praktycznie bez konkurencji w polskim wyniku.

---

### Podstrona 4: /uslugi/strony-www/rynek-niemiecki

- **H1:** Strona internetowa na rynek niemiecki
- **metaTitle:** `Strona WWW na rynek niemiecki` (29 znaków)
- **Fraza główna:** strona internetowa na rynek niemiecki
- **Rozdział intencji wobec sąsiadów:** ta sama usługa, inny odbiorca: polska firma wchodząca do Niemiec albo firma niemiecka. Rozdziela się rynkiem i konkretami, których nie ma nigdzie indziej w serwisie (Impressum, obowiązki prawne, niemieckie frazy, hosting w Unii Europejskiej). Nie powtarza sekcji technicznych, tylko to, co jest inne, gdy odbiorcą jest Niemiec.

**Kapsuła (do pola `kapsula`):**

> Budujemy strony dla klientów w Niemczech i mamy tam dwie zakończone realizacje: Fichtelgebirgshaus.de jest w pierwszej dziesiątce Google na frazy zapisane w umowie i widoczny w GPT, a Trockenhaus przeszedł z pozycji niewidocznej do pierwszej trójki na swoją frazę. Cennik i terminy są takie same jak w Polsce: landing 1590 zł netto, strona biznesowa 2900 zł netto, zaawansowana od 5900 zł netto.

**Sekcje:**
1. Czym różni się strona dla klienta niemieckiego od polskiej (oczekiwania, ton, obowiązki prawne)
2. Co musi być na stronie w Niemczech: Impressum, dane firmy, zgody, hosting w Unii Europejskiej
3. Frazy niemieckie i widoczność w AI po niemiecku (modele odpowiadają w języku pytania)
4. Realizacja z nazwą: Fichtelgebirgshaus.de, pierwsza dziesiątka Google na frazy z umowy plus widoczność w GPT
5. Realizacja z nazwą: Trockenhaus, osuszanie piwnic i remonty, z niewidocznej do pierwszej trójki Google na frazę Trockenhaus
6. Co jeszcze zbudowaliśmy dla Trockenhaus poza stroną: narzędzie do ofert i rachunków (oferta z 2 do 4 godzin do 20 minut, rachunek z 1 godziny do około 5 minut, przy 1 do 8 ofert i 1 do 5 rachunków miesięcznie)
7. Jak pracujemy zdalnie z klientem w Niemczech (język, materiały, odbiór)
8. Cennik i terminy takie same jak w Polsce, ceny netto
9. Kiedy tego nie kupować (jednorazowa kampania, brak obsługi po niemiecku po Twojej stronie)
10. FAQ, 8 pytań, znacznik FAQPage
11. CTA: bezpłatna diagnoza 0 zł

**FAQ (8 pytań, gotowe):**

P: Czy robicie strony po niemiecku?
O: Tak. Pracujemy na rynku polskim i niemieckim, a dwie nasze realizacje to firmy z Niemiec: Fichtelgebirgshaus.de i Trockenhaus.

P: Czy cena dla klienta z Niemiec jest inna?
O: Nie. Landing 1590 zł netto, strona biznesowa 2900 zł netto, zaawansowana od 5900 zł netto, terminy te same.

P: Co musi znaleźć się na niemieckiej stronie?
O: Impressum z danymi firmy, informacja o przetwarzaniu danych i zgody. Teksty prawne przygotowuje Twój prawnik, my je wpinamy na stronę.

P: Czy hosting musi stać w Unii Europejskiej?
O: Ustawiamy hosting w Unii, bo tak jest prościej z ochroną danych i tego oczekuje większość niemieckich klientów. Konto jest Twoje.

P: Czy AI odpowiada po niemiecku inaczej niż po polsku?
O: Model odpowiada w języku pytania i sięga po źródła w tym języku. Dlatego niemiecka wersja treści musi być napisana po niemiecku, a nie przetłumaczona automatem z polskiego.

P: Jakie wyniki mieliście w Niemczech?
O: Fichtelgebirgshaus.de wszedł do pierwszej dziesiątki Google na frazy zapisane w umowie i jest widoczny w GPT. Trockenhaus przeszedł z pozycji niewidocznej do pierwszej trójki na frazę Trockenhaus.

P: Jak wygląda współpraca na odległość?
O: Tak samo jak w Polsce: rozmowa o celu, projekt do akceptacji przed kodem, budowa, tydzień testów u Ciebie, poprawki, drugi tydzień, poprawki, odbiór.

P: Czy zbudujecie też narzędzia do ofert i rachunków?
O: Tak, robiliśmy to dla Trockenhaus. Przygotowanie oferty zeszło tam z 2 do 4 godzin do 20 minut, a rachunku z 1 godziny do około 5 minut. To osobna usługa i osobna wycena, poza stroną.

**Uzasadnienie:** zero konkurencji w wyniku zwiadu, żaden z dziewięciu przebadanych konkurentów nie tyka rynku niemieckiego, a my mamy dwie zakończone realizacje z nazwami i wynikami. Niska trudność frazy, wysoka wartość leada, i to jedyna podstrona, na której DR 18 nie jest przeszkodą. Otwiera też drogę do wersji niemieckojęzycznej w kolejnym kroku.

---

### Podstrona 5: /uslugi/strony-www/pozycjonowanie-w-chatgpt

- **H1:** Pozycjonowanie strony w ChatGPT, Perplexity i Gemini
- **metaTitle:** `Pozycjonowanie strony w ChatGPT i AI` (36 znaków)
- **Fraza główna:** pozycjonowanie w ChatGPT
- **Rozdział intencji wobec sąsiadów:** strona macierzysta jest dla kogoś, kto chce ZBUDOWAĆ nową stronę. Ta podstrona jest dla kogoś, kto pyta wprost o widoczność w modelach AI i chce zrozumieć mechanizm, zanim cokolwiek zamówi. Nie powtarza cennika budowy (link do `/cennik`) ani opisu bota (link do `/strona-z-chatbotem`). WAŻNE: ta podstrona NIE sprzedaje osobnego produktu „warstwa AI do istniejącej strony”, bo takiego produktu nie ma w cenniku. Opisuje warstwę, którą dowozimy przy budowie strony, a właścicielowi istniejącej strony proponuje rozmowę i wycenę po obejrzeniu serwisu.

**Kapsuła (do pola `kapsula`):**

> Model AI nie ocenia, kto jest lepszy. Cytuje ten fragment, który najpewniej odpowiada na pytanie i da się go zacytować w całości. Budujemy strony tak, żeby taki fragment na nich był: nagłówek jak pytanie klienta, odpowiedź w pierwszym akapicie, cała treść w kodzie od razu, dane firmy w jednym brzmieniu. U Lenart Motors ChatGPT zaczął wskazywać firmę po około 3 tygodniach od publikacji.

**Sekcje:**
1. Co się zmieniło: klient pyta ChatGPT, nie Google, i dostaje jedną odpowiedź zamiast dziesięciu linków
2. Jak sprawdzić, czy AI dziś poleca Twoją firmę (5 pytań do wklejenia, co oznacza każdy wynik)
3. Dlaczego model cytuje jedną stronę, a drugą pomija
4. SEO, AEO, GEO: tabela różnic i co z tego robimy u Ciebie
5. Gdzie to działa: ChatGPT, Perplexity i Gemini mierzymy, Claude i Copilot czytają podobne źródła
6. Zakres prac punkt po punkcie (dostępność dla robotów AI, dane strukturalne, treść odpowiadająca na pytanie w pierwszym zdaniu, spójność danych firmy, wzmianki poza własną stroną)
7. Realizacja z nazwą: Lenart Motors, ChatGPT wskazuje firmę na pytanie o najlepszego blacharza i lakiernika premium, efekt po około 3 tygodniach od publikacji
8. Realizacja z nazwą: Fichtelgebirgshaus.de, pierwsza dziesiątka Google na frazy z umowy plus widoczność w GPT
9. Jak mierzymy efekt i czego NIE obiecujemy (brak gwarancji pozycji, horyzont tygodni, nie dni)
10. Masz już stronę? Wtedy zaczynamy od rozmowy o tym, co da się poprawić bez przebudowy, a zakres i cenę ustalamy po jej obejrzeniu
11. Kiedy tego nie kupować
12. FAQ, 10 pytań, znacznik FAQPage
13. CTA: bezpłatna diagnoza 0 zł

**FAQ (10 pytań, gotowe):**

P: Czym jest pozycjonowanie w ChatGPT?
O: To układanie treści strony tak, żeby model miał co z niej zacytować: nagłówek jak pytanie klienta, zamknięta odpowiedź w pierwszym akapicie, cała treść dostępna w kodzie bez uruchamiania skryptów, dane firmy w jednym brzmieniu.

P: Czy to zastępuje SEO?
O: Nie, nakłada się na nie. Ta sama praca nad treścią i szybkością działa na wyniki Google i na odpowiedzi modeli. Kto sprzedaje GEO zamiast SEO, sprzedaje połowę roboty.

P: Jak sprawdzę, czy ChatGPT już mnie poleca?
O: Zadaj pięć pytań z instrukcji na tej stronie w ChatGPT, Perplexity i Gemini, bez podawania nazwy swojej firmy w pierwszym pytaniu. Zapisz odpowiedzi i datę, a test powtórz za miesiąc.

P: Jak długo czeka się na efekt?
O: U Lenart Motors ChatGPT zaczął wskazywać firmę po około 3 tygodniach od publikacji. To był dobry przypadek, nie obietnica dla każdego. Uczciwy horyzont to tygodnie, nie dni.

P: Czy gwarantujecie, że ChatGPT będzie mnie polecał?
O: Nie. Nikt nie ma wpływu na to, co odpowie model, a kto gwarantuje, ten zgaduje. Gwarantujemy pracę, która daje modelowi co cytować, i pokazujemy pomiar przed publikacją i po niej.

P: Które modele sprawdzacie?
O: Mierzymy ChatGPT, Perplexity i Gemini. Claude i Copilot czytają podobne źródła, więc praca działa także na nie, ale nie wpisujemy ich do pomiaru, żeby nie obiecywać czegoś, czego nie sprawdzamy.

P: Mam już stronę, czy muszę budować nową?
O: Nie zaczynamy od budowania. Najpierw rozmowa i przejrzenie tego, co masz. Zakres i cenę ustalamy dopiero po obejrzeniu Twojej strony, bo raz wystarczy poprawa treści, a raz przeszkoda siedzi w technologii.

P: Dlaczego mojej strony nie widać w AI?
O: Najczęściej dlatego, że treść dorysowuje się skryptem dopiero w przeglądarce, a roboty modeli skryptów nie wykonują i widzą pustą stronę. Drugi częsty powód to treść, która nie odpowiada na żadne pytanie wprost.

P: Czy małe firmy mają tu szansę?
O: Tak i często większą niż w klasycznym Google. Model nie sprawdza, ile masz oddziałów, tylko czy ma z czego zbudować odpowiedź. Lenart Motors i Trockenhaus to nie korporacje.

P: Ile to kosztuje?
O: Jeśli budujemy Ci stronę, ta praca jest w cenie strony: landing 1590 zł netto, strona biznesowa 2900 zł netto, zaawansowana od 5900 zł netto. Jeśli masz już stronę, zakres i cenę ustalamy po rozmowie.

**Uzasadnienie:** to jedyny obszar, w którym mamy udokumentowany, nazwany dowód (Lenart Motors, Fichtelgebirgshaus.de, Trockenhaus), a codescriptum.pl i adsfox.pl handlują tu wyłącznie teorią i abonamentami. Nasza przewaga to konkret zamiast pakietu miesięcznego. Fraza rośnie, a rynek polski nie ma jeszcze utrwalonego lidera, więc DR 18 jeszcze wystarcza.

---

## Uwagi dla sesji wdrożeniowej

**1. Jedno zdanie do podmiany w istniejącej sekcji `ramaCeny`** (`lib/uslugi/strony-www.ts`, pole `tresc`, około linii 235). Po dołożeniu cennika z kwotami obecne zdanie zaprzecza nowej sekcji, więc musi się zmienić. Karty progów zostają bez zmian.

Było:

> Cenę liczymy od zakresu i od tego, ile pytań ma obsługiwać strona: inaczej wycenia się prostą wizytówkę, inaczej serwis z wieloma podstronami pod różne frazy. Dokładne widełki podajemy na bezpłatnej diagnozie (0 zł, około 30 minut), zanim cokolwiek zamówisz.

Ma być:

> Cenę liczymy od zakresu i od tego, ile pytań ma obsługiwać strona: inaczej wycenia się prostą wizytówkę, inaczej serwis z wieloma podstronami pod różne frazy. Kwoty i terminy dla trzech progów znajdziesz niżej, a na bezpłatnej diagnozie (0 zł, około 30 minut) dopasowujemy je do Twojego zakresu, zanim cokolwiek zamówisz.

**2. Kolor i dekor kategorii.** Podstrony dziedziczą dekor rodzica: `lib/inf-kategorie.ts` linia 176, klucz `strony-www`: `c: '#00f0ff'`, `odcien: '#70b0ff'`, `emoji: '🌐'`, `ikona: 'glob-siatka'`. Etykieta krótka w tej samej mapie (linia 331) to `WWW`. Nie wprowadzać nowego koloru dla żadnej podstrony.

**3. Rejestr podstron, cztery miejsca na każdą podstronę.**
- nowy plik treści w `lib/uslugi/podstrony/<slug>.ts` z typem `PodstronaUslugi` (czyli pełny kontrakt `Usluga` plus `rodzic: 'strony-www'` i `dataAktualizacji`),
- import i wpis w tablicy `PODSTRONY` w `lib/uslugi/podstrony/index.ts`,
- krótka etykieta rodzica w `lib/uslugi/podstrony/okruszki.ts`: dla tej rodziny `Strony WWW` (spójna z etykietą kategorii i z segmentem URL `/uslugi/strony-www`),
- trasa `app/uslugi/strony-www/[podstrona]/page.tsx` jako kopia `app/uslugi/voiceboty/[podstrona]/page.tsx` z podmienioną wartością rodzica.

Mapa witryny i `generateStaticParams` biorą się z rejestru automatycznie. Podstrony NIE wchodzą do `lib/uslugi/index.ts`, bo trafiłyby do menu i huba `/uslugi`, czego nikt nie zamawiał.

**4. Linkowanie wewnętrzne (do zrobienia w obie strony).**
- ze strony macierzystej: sekcja 7 linkuje do `/uslugi/strony-www/cennik`, sekcja 6 do `/uslugi/strony-www/rynek-niemiecki`, sekcja 3 do `/uslugi/strony-www/pozycjonowanie-w-chatgpt`, blok o dołożeniu bota do `/uslugi/strony-www/strona-z-chatbotem`,
- z każdej podstrony powrót do `/uslugi/strony-www`,
- `/uslugi/strony-www/strona-z-chatbotem` linkuje do usługi `/uslugi/chatboty` z jednym zdaniem rozdziału intencji w pierwszym akapicie (tu buduje się nową stronę, tam bot idzie na istniejącą),
- `/uslugi/strony-www/landing-page` i `/uslugi/strony-www/pozycjonowanie-w-chatgpt` linkują do `/uslugi/strony-www/cennik` zamiast powtarzać pełny cennik,
- pole `powiazane` na stronie macierzystej rozszerzyć o pięć nowych podstron.

**5. Znacznik FAQPage.** Musi zawierać KAŻDE pytanie widoczne na danej stronie, w tym sześć dotychczasowych na stronie macierzystej, a treść odpowiedzi ma być identyczna ze stroną. Rozjazd między JSON-LD a treścią widoczną Google traktuje jako błąd i ignoruje znacznik.

**6. Daty.** `dataAktualizacji` na stronie macierzystej podnieść z `2026-08-21` na dzień realnego wdrożenia. Każda nowa podstrona dostaje datę wdrożenia, nie `new Date()` przy buildzie.

**7. Kanibalizacja frazy cenowej.** Fraza „ile kosztuje strona internetowa” należy do podstrony `/cennik`. Strona macierzysta ma dwa nagłówki o pieniądzach (istniejący „Ile kosztuje strona pod SEO i AI?” i nowy „Co zapłacę za stronę internetową i co jeszcze dojdzie później?”) i to jest maksimum. Nie dokładać trzeciego.

**8. Powtórzenia liczby Lenart Motors.** Termin „około 3 tygodnie” może stać na stronie macierzystej najwyżej trzy razy: raz w istniejącej karcie w sekcji `rozwiazanie`, raz w nowej tabeli efektów i raz w FAQ. W nowych sekcjach 1, 3, 4 i 8 celowo go nie ma. Nie dopisywać.

**9. Zero długiego myślnika.** Dotyczy także pól pomocniczych i komentarzy, które bywają przeklejane do briefu.

**10. Bot na stronie.** Zweryfikowane 2026-08-31 w kodzie: `AgentConsole` stoi w `app/layout.tsx` (linia 128), więc przycisk „Zapytaj AI” jest na każdej podstronie, także na nowych. Model to `claude-haiku-4-5` od Anthropic (`app/api/chat/route.ts`, linia 82). W treści nie wolno sugerować OpenAI.

**11. Ceny konkurencji.** W treści wolno cytować wyłącznie projektowaniestroncennik.pl (od 1900 do ponad 4000 zł brutto, sprawdzone 2026-08-31) i zawsze z dopiskiem „brutto” oraz z datą. Soluma.pl została wycięta, bo strona nie podaje, czy jej kwoty są netto czy brutto. Nie dopisywać żadnej innej ceny konkurencji bez wejścia na jej stronę.
