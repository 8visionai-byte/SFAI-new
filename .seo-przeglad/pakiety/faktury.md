# Pakiet wdrozeniowy: Faktury, OCR, KSeF

**Adres strony:** https://www.simplefast.ai/uslugi/dokumenty-faktury
**Plik danych:** `lib/uslugi/dokumenty-faktury.ts`
**Data pakietu:** 2026-08-31

Pakiet dokłada do istniejącej strony 11 nowych sekcji i projektuje 5 podstron. Wszystkie liczby pochodzą z zatwierdzonego cennika, z realizacji Onyx albo z decyzji właściciela z 2026-08-31. Zero placeholderów, zero liczb konkurencji, zero nazw domen konkurencji w treści widocznej dla czytelnika.

---

## Czego NIE ruszamy

Te sekcje zostają dokładnie takie, jakie są dzisiaj w `lib/uslugi/dokumenty-faktury.ts`:

- **Hero** (H1 `Automatyzacja dokumentów i faktur (OCR, KSeF)`, kapsuła, CTA): bez zmian.
- **metaTitle** `Automatyzacja faktur: OCR faktur AI i KSeF` i **metaDescription**: bez zmian.
- **Sekcja 1 Problem** (H2 `Ile godzin miesięcznie przepisujesz faktury z ręki?`) wraz z blokami: bez zmian.
- **Sekcja 2 Rozwiązanie** (H2 `Co dokładnie robi automat z fakturą?`) wraz z blokami: bez zmian.
- **Sekcja 3 Tabela porównawcza** (`Ręczne przepisywanie faktur a automat OCR`, 7 wierszy): bez zmian.
- **Sekcja 4 Kroki** (`Jak wdrażamy automatyzację faktur krok po kroku?`, 3 kroki): bez zmian.
- **Sekcja 5 Rama ceny** (`Ile kosztuje automatyzacja faktur?` z pasem metryk i tabelą): bez zmian. Nowa sekcja 7 z tego pakietu jest jej rozwinięciem, nie zamiennikiem.
- **Sekcja 7 FAQ** (6 pytań): bez zmian. Nowa sekcja 10 to osobny blok obiekcji, nie miesza się z tym FAQ.
- **Sekcja 8 CTA** (`Pokaż mi, gdzie tracę czas`): bez zmian.
- **JSON-LD** Service, FAQPage, BreadcrumbList: bez zmian w istniejących wpisach. Nowe FAQ z sekcji 10 **nie** wchodzi do FAQPage, żeby schemat pozostał 1:1 z sekcją 7.
- **`queries`** w pliku danych: dopisujemy, nic nie usuwamy.

---

## Nowe sekcje na istniejącej stronie

Kolejność renderu po wdrożeniu: Hero, Problem, **1**, **2**, **3**, Rozwiązanie, **4**, Tabela porównawcza, Kroki, **5**, **6**, Rama ceny, **7**, **8**, **9**, **10**, Podstrony powiązane, **11**, FAQ, CTA.

---

### 1. Na czym polega automatyzacja faktur, ile kosztuje i ile trwa wdrożenie?

- **Gdzie wstawić:** bezpośrednio pod Hero, PRZED sekcją Problem. Pierwszy blok treści na stronie.
- **Po co:** łapie zapytanie „automatyzacja faktur" w odpowiedziach modeli AI, które cytują blok odpowiedzi z góry strony. Ma to automatyzujemyai.pl w formie TL;DR. U nas dodatkowo skraca drogę do decyzji, bo cena stoi nad zgięciem ekranu.
- **Typ:** akapit plus lista czterech punktów.
- **TREŚĆ:**

> Przestajesz przepisywać faktury ręcznie. Automat odbiera dokument z KSeF, ze skrzynki mailowej, ze skanu albo ze zdjęcia zrobionego telefonem.
>
> Odczytuje dane i zapisuje je tam, gdzie ich potrzebujesz: w arkuszu, w programie księgowym albo w aplikacji zbudowanej pod Ciebie.
>
> Dokument, co do którego automat nie ma pewności, trafia do kolejki dla człowieka zamiast do księgi. Zgadywanie kwoty jest droższe niż jedna minuta sprawdzenia.
>
> Zaczynamy od Sprintu Diagnostycznego za 1490 zł netto. Trwa 5 dni roboczych, kończy się raportem PDF z mapą Twoich procesów.
>
> Cenę Sprintu odliczamy od wdrożenia, jeśli je zamówisz. Nie płacisz dwa razy za to samo rozpoznanie.
>
> **W skrócie:**
>
> - **Zakres:** odbiór dokumentu, odczyt danych, sprawdzenie, zapis w Twoim systemie, kolejka wyjątków do zatwierdzenia przez człowieka oraz powiadomienia i raport w ustalonym rytmie.
> - **Cena:** AI Start 1990 zł netto za pierwszą automatyzację na próbę. Pełne wdrożenie 3000-10000 zł netto, zależnie od liczby źródeł dokumentów i integracji.
> - **Czas:** Sprint Diagnostyczny 5 dni roboczych. Termin wdrożenia ustalamy na koniec Sprintu, kiedy znamy już Twoje źródła dokumentów.
> - **Po starcie:** utrzymanie 99-599 zł netto miesięcznie przy infrastrukturze u nas albo 0 zł miesięcznie, jeśli przekażemy ją Tobie. Zużycie tokenów rozliczane osobno.

- **Źródło liczb:** 1490 zł, 5 dni roboczych, raport PDF z mapą procesów, odliczanie od wdrożenia: cennik, pozycja Audyt AI (Sprint Diagnostyczny). 1990 zł: cennik, AI Start. 3000-10000 zł: cennik, Automatyzacja pełne wdrożenie. 99-599 zł/mies. i wariant 0 zł przy infrastrukturze u klienta: decyzja właściciela z 2026-08-31, punkt 2. Zdanie o terminie po Sprincie nie zawiera liczby, opisuje kolejność prac.

---

### 2. Ile miesięcznie kosztuje Cię ręczne przepisywanie faktur?

- **Gdzie wstawić:** po sekcji Problem, przed sekcją 3 (KSeF).
- **Po co:** koszt bezczynności policzony wprost, czyli jedyna sekcja, która zamienia „kiedyś to zrobimy" w termin. Ma to malinski.ai jako koszt bezczynności, a policzone godziny mają aiport.pl i monaltro.pl. Łapie frazy „ile kosztuje ręczne wprowadzanie faktur" i „oszczędność czasu księgowość".
- **Typ:** kalkulator (interaktywny komponent, trzy pola wejściowe, dwa wyniki).
- **TREŚĆ:**

> Ręczne wpisywanie faktur nie boli, bo nikt tego nie fakturuje. Ten czas siedzi w pensji, którą i tak płacisz.
>
> Dlatego łatwo go nie zauważyć przez kolejne trzy lata. Policz go raz, na swoich liczbach.
>
> Niczego za Ciebie nie zakładamy. Pola są puste, bo tylko Ty znasz liczbę faktur i koszt godziny pracy w swojej firmie.

**Komponent kalkulatora, pola wejściowe (wszystkie startują PUSTE, bez wartości domyślnej, bez podpowiedzi liczbowej w placeholderze):**

| Etykieta pola | Jednostka | Wartość startowa |
|---|---|---|
| Ile faktur przerabiasz miesięcznie? | sztuk | puste |
| Ile minut zajmuje jedna faktura od otwarcia do zapisu? | minut | puste |
| Ile kosztuje Cię godzina pracy osoby, która to robi? | zł | puste |

**Wyniki liczone przez komponent (widoczne dopiero po wypełnieniu wszystkich trzech pól):**

| Wynik | Wzór |
|---|---|
| Godziny miesięcznie | faktury × minuty ÷ 60 |
| Godziny rocznie | godziny miesięcznie × 12 |
| Koszt roczny | godziny rocznie × stawka godzinowa |
| Pełne dni pracy rocznie | godziny rocznie ÷ 8 godzin, czyli jeden dzień pracy |

> Wzór jest jawny, żebyś mógł sprawdzić wynik na kartce: liczba faktur razy minuty na fakturę, podzielone przez sześćdziesiąt, razy dwanaście miesięcy.
>
> Wynik podziel przez osiem godzin, czyli jeden dzień pracy, a zobaczysz, ile pełnych dni rocznie zjada samo przepisywanie.
>
> Dwie rzeczy, których ten kalkulator nie liczy, a które kosztują osobno: poprawki po błędnie wpisanej kwocie oraz odsetki i utracone rabaty za faktury zapłacone po terminie.

- **Źródło liczb:** żadnej liczby wejściowej nie podajemy, zgodnie z decyzją właściciela z 2026-08-31, punkt 3. Dzielnik 60 to przeliczenie minut na godziny, mnożnik 12 to liczba miesięcy w roku, dzielnik 8 to długość dnia pracy nazwana wprost w tekście. Wynik należy w całości do czytelnika.

---

### 3. Co KSeF zmienia w Twoim obiegu faktur?

- **Gdzie wstawić:** po sekcji 2 (kalkulator), przed sekcją Rozwiązanie.
- **Po co:** dziś na stronie o KSeF jest jedno zdanie. Konkurencja ma pod to całe strony. Ta sekcja bierze intencję „mam KSeF, co to zmienia u mnie w firmie" i przekazuje ruch dalej na podstronę /ksef. Nie obiecuje terminów, więc nagłówek dowozi to, co zapowiada.
- **Typ:** akapit plus lista trzech zadań.
- **TREŚĆ:**

> KSeF nie jest kolejnym programem do wyboru. To jedno miejsce, przez które przechodzą faktury.
>
> Zmienia więc nie tyle Twoją księgowość, ile drogę dokumentu do niej.
>
> Najważniejsza zmiana jest prosta. Faktura przestaje być plikiem, który ktoś Ci przysyła.
>
> Staje się danymi, po które trzeba pójść samemu, regularnie i o określonej porze. To zadanie codzienne, nie jednorazowe.
>
> **Z tej jednej zmiany wynikają dla Ciebie trzy konkretne obowiązki operacyjne:**
>
> 1. **Ktoś musi codziennie pobierać dokumenty.** Nie przyjdą same na skrzynkę, trzeba po nie sięgnąć.
> 2. **Ktoś musi zauważyć, że pobieranie się nie wykonało.** Cisza wygląda identycznie jak spokojny tydzień, dopóki nie przyjdzie zamknięcie miesiąca.
> 3. **Ktoś musi wiedzieć, co zrobić przy przerwie w łączności.** Dokumenty z tego okresu trzeba dociągnąć i uzgodnić, kiedy połączenie wróci.
>
> To są dokładnie te trzy zadania, które przejmuje automat. Człowiek zostaje przy decyzjach, nie przy klikaniu.
>
> Aktualne terminy i progi sprawdzaj u źródła, na stronie Ministerstwa Finansów. Nie przepisujemy ich, bo zmieniały się już kilka razy i strona z nieaktualną datą szkodzi bardziej, niż pomaga.
>
> Jak to działa u nas krok po kroku, opisaliśmy osobno: [Automatyzacja KSeF](/uslugi/dokumenty-faktury/ksef).

- **Źródło liczb:** sekcja jest bezliczbowa. Trzy zadania operacyjne wynikają z narzędzia w portfolio (automatyzacja KSeF plus bank). Terminów i progów świadomie nie podajemy, odsyłamy do źródła.

---

### 4. Co się dzieje, gdy automat nie jest pewien odczytu?

- **Gdzie wstawić:** po sekcji Rozwiązanie, przed sekcją Tabela porównawcza.
- **Po co:** to pytanie pada na każdej rozmowie handlowej. Konkurencja odpowiada procentami skuteczności, których my nie zmierzyliśmy u siebie. Odpowiadamy mechanizmem, który jest sprawdzalny i którego procent nie zastąpi. Łapie frazy „czy OCR faktur się myli" i „dokładność odczytu faktur".
- **Typ:** akapit plus lista mechanizmów.
- **TREŚĆ:**

> Pytanie pada na każdej rozmowie: co, jeśli automat źle odczyta kwotę.
>
> Odpowiedź brzmi: automat ma się do tego przyznać, a nie zapisać liczbę i pójść dalej.
>
> Każdy odczytany dokument dostaje ocenę pewności. Powyżej ustalonego progu idzie prosto do zapisu.
>
> Poniżej progu ląduje w kolejce do sprawdzenia przez człowieka, razem z podglądem oryginału obok odczytanych pól.
>
> **Trzy rzeczy, które to zabezpieczają:**
>
> - **Próg pewności ustawiamy razem z Tobą, nie za Ciebie.** Wyżej ustawiony próg to więcej dokumentów do ręcznego zatwierdzenia i mniej ryzyka. Niżej ustawiony działa odwrotnie.
> - **Każda decyzja automatu zostaje zapisana.** Co odczytał, z jakiego pola, z jaką pewnością i kto to zatwierdził.
> - **Kolejka wyjątków ma właściciela.** Przed startem wskazujemy imiennie osobę, która ją przegląda, i ustalamy, po jakim czasie brak reakcji eskaluje wyżej.
>
> Bez zapisu decyzji nie da się później sprawdzić, skąd wzięła się zła kwota. Z zapisem sporny dokument sprawdzasz w minutę.
>
> Liczb skuteczności nie podajemy, dopóki nie zmierzymy ich u siebie na pełnym okresie rozliczeniowym. Cudzych procentów nie przepisujemy.

- **Źródło liczb:** sekcja jest bezliczbowa świadomie. Zdanie o odkładaniu niepewnych dokumentów do akceptacji człowieka jest już w zatwierdzonym FAQ tej strony, więc opisuje realny zakres usługi. Ostatnie zdanie zastępuje tabelę parametrów, która w wersji roboczej miała cztery puste rubryki.

---

### 5. Jak wygląda wdrożenie u realnego klienta? Onyx, około 120 faktur miesięcznie

- **Gdzie wstawić:** po sekcji Kroki, przed sekcją 6 (błędy wdrożenia).
- **Po co:** na stronie nie ma dziś ani jednego case study, a mają je codescriptum.pl, automatyzujemyai.pl, qalcwise.com i aplitt.pl. Dowód stoi PRZED sekcją ceny, żeby cena czytała się jako uzasadniona.
- **Typ:** case study, cztery krótkie bloki.
- **TREŚĆ:**

> Onyx to firma, która co miesiąc przerabia około 120 faktur. Zgodę na opisanie tego wdrożenia mamy, więc nie chowamy się za sformułowaniem „jeden z naszych klientów".
>
> **Stan przed**
>
> Każda faktura przechodziła przez ręce człowieka: otwarcie dokumentu, przepisanie danych, sprawdzenie, zapis.
>
> Jedna sztuka to było od 3 do 5 minut. Przy 120 dokumentach miesięcznie daje to od 360 do 600 minut, czyli od 6 do 10 godzin miesięcznie.
>
> W skali roku wychodzi z tego od 72 do 120 godzin samego przepisywania.
>
> **Co zbudowaliśmy**
>
> Aplikację księgową, w której faktura wchodzi do obiegu przez zdjęcie zrobione telefonem.
>
> Automat odczytuje dane z dokumentu, zapisuje je i buduje z nich bieżący obraz finansów firmy.
>
> **Stan po**
>
> Zamiast przepisywania jest zdjęcie faktury. Zamiast czekania na zamknięcie miesiąca jest codzienny raport finansów, który przychodzi sam.
>
> Czas na jedną fakturę spadł z 3 do 5 minut przepisywania do samego zrobienia zdjęcia.
>
> **Czego ten automat nie robi**
>
> Nie podejmuje decyzji za człowieka i nie zatwierdza kosztów. Odczytuje, sprawdza, zapisuje i pokazuje.
>
> Zgoda na wydatek zostaje po stronie właściciela. Tak było na starcie i tak zostało.

- **Źródło liczb:** około 120 faktur miesięcznie, 3-5 minut na fakturę ręcznie, zdjęcie faktury zamiast przepisywania, codzienny raport finansów: realizacja Onyx z konspektu firmy, zgoda na publikację z nazwą potwierdzona. 360-600 minut, 6-10 godzin miesięcznie i 72-120 godzin rocznie to przeliczenie tych dwóch liczb, działanie pokazane w tekście. Nic o płaceniu faktur przez API banku, zgodnie z zakazem.

---

### 6. Co najczęściej psuje wdrożenie automatyzacji faktur?

- **Gdzie wstawić:** po sekcji 5 (case study Onyx), przed sekcją Rama ceny.
- **Po co:** format najchętniej cytowany przez modele AI i najmocniejszy sygnał kompetencji. Mają go automatyzujemyai.pl i monaltro.pl. Łapie frazy „błędy wdrożenia KSeF" i „na co uważać przy automatyzacji faktur". Każdy punkt rozbity na trzy krótkie akapity, żeby model miał co wyciąć jako zamkniętą odpowiedź.
- **Typ:** lista pięciu punktów, każdy w układzie Objaw / Koszt / Jak tego unikamy.
- **TREŚĆ:**

> Wdrożenia automatyzacji faktur rzadko przewracają się na odczycie dokumentu.
>
> Przewracają się na rzeczach, o których nikt nie pomyślał przed startem, a które kosztują dopiero w trzecim miesiącu. Oto pięć, które widzimy najczęściej.
>
> **1. Nikt nie pilnuje, czy pobieranie dokumentów w ogóle się wykonało**
>
> *Objaw:* przez kilka dni nie wpada żadna faktura i wszyscy uznają, że po prostu był spokojny tydzień.
>
> *Koszt:* dokumenty odkryte po terminie, ręczne nadrabianie zaległości i nerwowe zamknięcie miesiąca.
>
> *Jak tego unikamy:* automat raportuje nie tylko to, że coś przetworzył, ale też to, że dziś nie przetworzył nic. Cisza dłuższa niż ustalona wysyła powiadomienie do człowieka.
>
> **2. PDF z maila traktowany jako ten sam dokument co faktura z systemu**
>
> *Objaw:* ta sama faktura wchodzi dwa razy, raz z załącznika, raz z pobrania.
>
> *Koszt:* podwójne księgowanie i godziny na szukanie, który zapis jest prawdziwy.
>
> *Jak tego unikamy:* każdy dokument dostaje jeden identyfikator źródłowy. Powtórka jest wykrywana przy wejściu, zanim cokolwiek zostanie zapisane.
>
> **3. Kontrahent sprawdzany raz, przy zakładaniu kartoteki**
>
> *Objaw:* numer identyfikacyjny odczytany poprawnie, tylko należy do firmy, która już nie działa.
>
> *Koszt:* korekty i tłumaczenie się przy kontroli, zwykle kilka miesięcy po fakcie.
>
> *Jak tego unikamy:* potrafimy dołożyć sprawdzanie danych kontrahenta i statusu rachunku w publicznych rejestrach w momencie księgowania. Ustalamy przy wycenie, czy to jest Ci potrzebne.
>
> **4. Start w środku miesiąca**
>
> *Objaw:* część dokumentów jest w starym obiegu, część w nowym, a nikt nie wie, gdzie szukać konkretnej faktury.
>
> *Koszt:* jeden miesiąc robiony podwójnie i realna niechęć zespołu do nowego rozwiązania.
>
> *Jak tego unikamy:* uruchamiamy automat od pierwszego dnia okresu. Stary obieg zostaje włączony jako zapasowy do końca pierwszego pełnego miesiąca.
>
> **5. Nie ma osoby, która zatwierdza wyjątki**
>
> *Objaw:* kolejka dokumentów niepewnych rośnie tygodniami, bo każdy uważa, że to zadanie kogoś innego.
>
> *Koszt:* automat działa, a i tak nic nie jest zaksięgowane na czas. Płacisz za narzędzie i dalej gonisz termin.
>
> *Jak tego unikamy:* przed startem wskazujemy imiennie osobę odpowiedzialną za kolejkę. Ustalamy też, po jakim czasie brak reakcji ma eskalować wyżej.

- **Źródło liczb:** sekcja jest w całości bezliczbowa. Mechanizmy pochodzą z narzędzia w portfolio (automatyzacja KSeF plus bank) oraz z opisu usługi na tej stronie. Punkt 3 mówi „potrafimy dołożyć", a nie „robimy w każdym wdrożeniu", bo konspekt nie potwierdza tego jako standardu.

---

### 7. Ile kosztuje automatyzacja faktur u nas i za co płacisz co miesiąc?

- **Gdzie wstawić:** po sekcji Rama ceny, przed sekcją 8 (porównanie z etatem).
- **Po co:** istniejąca Rama ceny podaje widełki, ale nie rozbija pozycji miesięcznych ani nie pokazuje wyboru między abonamentem a przekazaniem infrastruktury. To nasz argument, którego konkurencja nie ma. Łapie frazę „ile kosztuje automatyzacja faktur" i przekazuje ruch na podstronę /ile-kosztuje.
- **Typ:** tabela plus akapity.
- **TREŚĆ:**

> Ceny podajemy wprost, bo pierwsze pytanie i tak brzmi „ile to kosztuje". Odsyłanie do formularza to strata czasu obu stron.
>
> Wszystkie kwoty są netto. Wariant zależy od tego, iloma drogami wpadają do Ciebie dokumenty i do ilu miejsc mają trafić po odczytaniu.

| Wariant | Co dostajesz | Cena netto |
|---|---|---|
| Sprint Diagnostyczny | raport PDF z mapą procesów, wskazanie miejsc do automatyzacji, rekomendacja kolejności | 1490 zł, 5 dni roboczych, odliczane od ceny wdrożenia |
| AI Start | pierwsza automatyzacja na próbę, jeden proces od początku do końca, żebyś zobaczył efekt przed większą decyzją | 1990 zł |
| Pełne wdrożenie automatyzacji | wiele źródeł dokumentów, integracja z Twoim programem, kolejka wyjątków, raporty i powiadomienia | 3000-10000 zł, zależnie od zakresu |
| Utrzymanie: infrastruktura u nas | opieka nad działającym automatem, reagowanie na zmiany po stronie systemów, drobne poprawki | 99-599 zł miesięcznie |
| Utrzymanie: infrastruktura u Ciebie | przekazujemy Ci całość, Ty płacisz tylko za to, o co poprosisz | 0 zł miesięcznie, poprawki 350 zł za godzinę |
| Zużycie tokenów AI | opłata za faktyczne przetwarzanie dokumentów, rozliczana u dostawcy | po Twojej stronie, osobna pozycja |

> **Utrzymanie ma dwie drogi i wybierasz ją Ty, nie my.**
>
> Pierwsza: infrastruktura zostaje u nas, płacisz abonament i nie zajmujesz się niczym.
>
> Druga: przekazujemy Ci całość, abonament znika, a za poprawki płacisz tylko wtedy, gdy o nie poprosisz.
>
> Mówimy o tym wprost przed podpisaniem, bo z abonamentu, którego nie da się opuścić, robi się z czasem podatek.
>
> Termin wdrożenia ustalamy na koniec Sprintu Diagnostycznego. Wcześniej nie znamy Twoich źródeł dokumentów, więc każda data byłaby zgadywaniem.
>
> Dwie rundy poprawek są w cenie wdrożenia. Wygląda to tak: tydzień Twoich testów, poprawki, drugi tydzień testów, poprawki, odbiór.
>
> Funkcje, o których nie było mowy na pierwszej rozmowie, wyceniamy osobno. Inaczej pierwsza wycena musiałaby być zawyżona na zapas.
>
> Pełne rozbicie kosztów opisaliśmy osobno: [Ile kosztuje automatyzacja faktur](/uslugi/dokumenty-faktury/ile-kosztuje).

- **Źródło liczb:** 1490 zł i 5 dni roboczych: cennik, Audyt AI (Sprint Diagnostyczny). 1990 zł: cennik, AI Start. 3000-10000 zł: cennik, Automatyzacja pełne wdrożenie. 99-599 zł/mies., 0 zł/mies. przy infrastrukturze u klienta i 350 zł netto za godzinę poprawek: decyzja właściciela z 2026-08-31, punkt 2. Trzy osobne pozycje, dwie rundy poprawek i osobna wycena nowych funkcji: zasady cennika.

---

### 8. Taniej zatrudnić osobę do faktur czy kupić program z OCR?

- **Gdzie wstawić:** po sekcji 7 (cennik), przed sekcją 9 (kiedy się nie opłaci).
- **Po co:** porównanie z realną alternatywą, przed którą klient faktycznie stoi. Łapie frazy porównawcze typu „czy warto automatyzować faktury" i „program do faktur alternatywa". Uczciwe przyznanie, kiedy nas nie potrzebuje, buduje zaufanie mocniej niż kolejna lista korzyści.
- **Typ:** tabela porównawcza, bez kwot po stronie alternatyw.
- **TREŚĆ:**

> To jest realny wybór, przed którym stoisz. Porównajmy go uczciwie, razem z tym przypadkiem, w którym my nie jesteśmy Ci potrzebni.
>
> Masz trzy drogi: dołożyć etat lub pół etatu na wprowadzanie dokumentów, kupić gotowy program z odczytem faktur w abonamencie, albo zbudować automat pod swój obieg.
>
> Kwot po stronie etatu i gotowego programu nie podajemy, bo różnią się w każdej firmie i u każdego dostawcy. Swoje liczby wstaw z kalkulatora wyżej i z cennika dostawcy, którego rozważasz.

| Co porównujemy | Pół etatu na wprowadzanie | Gotowy program z OCR | Wdrożenie u nas |
|---|---|---|---|
| Koszt startu | rekrutacja i wprowadzenie nowej osoby | zwykle bez opłaty wstępnej, konfigurację robisz sam | 1990 zł netto za AI Start albo 3000-10000 zł netto za pełne wdrożenie |
| Koszt miesięczny | wynagrodzenie plus składki | abonament dostawcy według jego cennika i limitów | 99-599 zł netto albo 0 zł, jeśli infrastruktura jest u Ciebie, plus zużycie tokenów |
| Gdy faktur przybywa dwa razy więcej | potrzebujesz drugiej osoby albo nadgodzin | wyższy pakiet abonamentu i wyższy limit dokumentów | ten sam automat, koszt rośnie tylko o zużycie tokenów |
| Gdy Twój obieg jest nietypowy | osoba się nauczy, ale wiedza zostaje w jej głowie | dopasujesz się do programu albo szukasz innego | automat układamy pod Twój obieg, nie odwrotnie |
| Czyje to jest potem | wiedza odchodzi razem z osobą | licencja dostawcy, przestajesz płacić i tracisz dostęp | możemy postawić całość na Twojej infrastrukturze, wtedy utrzymanie odpada, a poprawki rozliczamy po 350 zł netto za godzinę |
| Kiedy to wystarczy | gdy dokumentów jest naprawdę mało i nie planujesz wzrostu | gdy obieg jest typowy, dokumenty przychodzą jedną drogą i mieścisz się w limitach pakietu | gdy masz kilka źródeł dokumentów, własne reguły i chcesz to spiąć z tym, czego już używasz |

> Gotowy program w abonamencie to dobry wybór częściej, niż nam się to opłaca przyznawać.
>
> Jeśli faktury przychodzą jedną drogą, są do siebie podobne i nie musisz ich nigdzie dalej przekazywać, kup program i nie wydawaj więcej.
>
> Po nas sięgnij wtedy, gdy dokumenty wpadają kilkoma kanałami naraz, gdy trzeba je przepiąć do systemu, który już masz, albo gdy reguły akceptacji są Twoje własne i żadne pudełko ich nie obsługuje.

- **Źródło liczb:** 1990 zł, 3000-10000 zł: cennik. 99-599 zł/mies., 0 zł/mies. i 350 zł netto za godzinę: decyzja właściciela z 2026-08-31, punkt 2. Po stronie etatu i gotowego programu nie stoi ani jedna kwota, bo nie mamy zweryfikowanego źródła. Nazw domen konkurencji w treści widocznej dla czytelnika nie ma.

---

### 9. Kiedy automatyzacja faktur Ci się nie opłaci?

- **Gdzie wstawić:** po sekcji 8 (porównanie), przed sekcją 10 (obiekcje).
- **Po co:** granice usługi. Mają je mits.pl, ninjatech.pl, syntalith.ai i aiport.pl. Sekcja odsiewa złe leady i buduje zaufanie mocniej niż lista korzyści. Modele AI chętnie cytują treść, która mówi „nie kupuj tego, jeśli".
- **Typ:** lista czterech sytuacji plus krótkie zamknięcie.
- **TREŚĆ:**

> Nie każdy proces nadaje się do automatyzacji i nie każda firma powinna teraz za to płacić.
>
> Cztery sytuacje, w których powiemy Ci to na pierwszej rozmowie, zanim wystawimy fakturę.
>
> **Dokumentów jest naprawdę mało**
>
> Odzyskane godziny nie pokryją wtedy kosztu wdrożenia ani utrzymania w rozsądnym czasie.
>
> Progu nie podajemy z palca. Policz to sobie w kalkulatorze wyżej: jeśli roczny koszt przepisywania nie przekracza ceny wdrożenia, poczekaj.
>
> **Twój proces zmienia się co miesiąc**
>
> Automat utrwala zasady, więc zasady muszą najpierw istnieć.
>
> Jeśli co miesiąc zmieniasz sposób opisywania kosztów albo drogę akceptacji, najpierw ustal proces. Inaczej będziesz płacić za ciągłe przerabianie.
>
> **Dokumenty istnieją tylko na papierze i nikt ich nie skanuje**
>
> Odczyt zaczyna się od pliku albo zdjęcia.
>
> Jeśli faktury leżą w segregatorze i nikt nie ma nawyku robienia im zdjęcia, automat nie ma z czego pracować. Wąskim gardłem zostaje ten sam człowiek co wcześniej.
>
> **Nie ma po Twojej stronie osoby, która zatwierdzi wyjątki**
>
> Część dokumentów zawsze trafi do sprawdzenia przez człowieka. Taka jest konstrukcja bezpiecznego automatu.
>
> Bez wskazanej osoby, która raz dziennie przejrzy kolejkę, wdrożenie stanie po dwóch tygodniach. Niezależnie od tego, jak dobrze działa sam odczyt.
>
> Jeśli rozpoznajesz u siebie któryś z tych czterech punktów, napisz do nas i tak.
>
> Dwadzieścia minut rozmowy kosztuje mniej niż wdrożenie, którego nie powinieneś kupować. Powiemy Ci wprost, czy warto czekać, i na co.

- **Źródło liczb:** sekcja jest w całości bezliczbowa. Progu opłacalności nie podajemy, bo nie mamy go w konspekcie. Zamiast liczby odsyłamy do kalkulatora z sekcji 2, gdzie czytelnik liczy na swoich danych.

---

### 10. Co się stanie z moimi danymi i kto będzie tym opiekował się za rok?

- **Gdzie wstawić:** po sekcji 9, przed sekcją Podstrony powiązane. NIE mieszać z istniejącym FAQ w sekcji 7 i NIE dopisywać do FAQPage JSON-LD.
- **Po co:** domknięcie sprzedaży, nie fraza. Bezpieczeństwo danych jest lękiem numer jeden przy tej usłudze, a dziś odpowiadamy na nie jednym pytaniem w FAQ na samym dole strony. qalcwise.com ma to jako osobną sekcję sprzedażową.
- **Typ:** FAQ, trzy pytania.
- **TREŚĆ:**

> **Gdzie leżą moje dokumenty i kto ma do nich dostęp?**
>
> Miejsce przechowywania ustalamy przed startem i zapisujemy w umowie, razem z listą osób, które mają dostęp.
>
> Możliwy jest wariant, w którym cała infrastruktura stoi po Twojej stronie i my nie mamy do dokumentów wglądu.
>
> Dostęp naszego zespołu jest imienny i odwoływalny jednym ruchem, bez czekania na naszą zgodę.
>
> **Co się stanie, gdy zmieni się sposób łączenia z KSeF i kto zapłaci za dostosowanie?**
>
> Przy infrastrukturze u nas utrzymanie w cenie 99-599 zł netto miesięcznie obejmuje reagowanie na zmiany po stronie systemów, z którymi automat się łączy.
>
> Przy infrastrukturze u Ciebie utrzymanie kosztuje 0 zł, a poprawki rozliczamy po 350 zł netto za godzinę.
>
> Powiemy Ci wprost przed podpisaniem, który wariant w Twoim przypadku wychodzi taniej. Zwykle rozstrzyga to, jak często zmienia się Twój obieg.
>
> **Co zostaje u mnie, jeśli przestaniemy współpracować?**
>
> Zostają wszystkie dokumenty i wszystkie zapisane dane, bo od początku leżą w Twoich systemach, nie w naszych.
>
> Zostaje też opis działania automatu i dostępy, żeby mógł to przejąć ktokolwiek inny.
>
> Nie budujemy zamka, z którego nie da się wyjść. Wolimy, żebyś zostawał, bo to działa, a nie dlatego, że nie masz wyboru.

- **Źródło liczb:** 99-599 zł/mies., 0 zł/mies. i 350 zł netto za godzinę: decyzja właściciela z 2026-08-31, punkt 2. Pytanie o błędny odczyt kwoty świadomie usunięte z tego bloku, bo odpowiada na nie w całości sekcja 4.

---

### 11. Czy to zadziała z moim programem księgowym?

- **Gdzie wstawić:** po sekcji Podstrony powiązane, przed istniejącym FAQ (sekcja 7).
- **Po co:** ostatnia realna blokada przed rozmową. Konkurencja wymienia nazwy programów, my wymieniamy to, co realnie spinaliśmy, i uczciwie oznaczamy resztę. Sygnał wiarygodności dla modeli AI mocniejszy niż lista logotypów.
- **Typ:** karty, trzy grupy.
- **TREŚĆ:**

> Automat nie zastępuje Twojego programu księgowego. Ma do niego dowieźć gotowe dane.
>
> Pytanie brzmi więc nie „czy zmienicie mi program", tylko „czy się z nim dogadacie".
>
> Oznaczamy uczciwie: co mamy spięte u działającego klienta, a co wymaga sprawdzenia przed wyceną.
>
> **SKĄD BIERZEMY DOKUMENTY**
>
> - **Zdjęcie faktury zrobione telefonem**: zrobione, działa w realnym wdrożeniu.
> - **KSeF**: zrobione, mamy w portfolio automat pobierający dokumenty z KSeF i porównujący je z wpłatami.
> - **Skrzynka mailowa z załącznikami**: standardowe źródło, spinane bez przeszkód.
> - **Skan z drukarki albo folder na dysku**: standardowe źródło, spinane bez przeszkód.
>
> **GDZIE TRAFIAJĄ DANE**
>
> - **Aplikacja księgowa zbudowana pod klienta**: zrobione, tak działa wdrożenie u Onyxa.
> - **Arkusz Google jako rejestr dokumentów**: zrobione, używamy tego na co dzień.
> - **Twój program księgowy przez otwarte połączenie API**: wymaga sprawdzenia, jakie dane wystawia Twoja licencja. Sprawdzamy to w Sprincie Diagnostycznym i mówimy wprost, czy się da.
> - **Bank, w zakresie sprawdzania, które faktury są już opłacone**: mamy w portfolio zbudowane połączenie KSeF plus bank.
>
> **CO WIDZISZ NA WYJŚCIU**
>
> - **Raport finansów w ustalonym rytmie**: u klienta Onyx przychodzi codziennie, sam.
> - **Powiadomienie o dokumentach niepewnych**: kolejka wyjątków z podglądem oryginału.
> - **Rejestr wszystkich dokumentów z historią**: kto co zatwierdził i kiedy.
>
> Jeśli Twojego programu nie ma na tej liście, nie znaczy to „nie da się".
>
> Znaczy „nie sprawdzaliśmy jeszcze i nie będziemy udawać, że tak". Sprawdzenie mieści się w Sprincie Diagnostycznym za 1490 zł netto, który odliczamy od wdrożenia.

- **Źródło liczb:** 1490 zł i odliczanie od wdrożenia: cennik, Sprint Diagnostyczny. Zdjęcie faktury telefonem, aplikacja księgowa i codzienny raport finansów: realizacja Onyx. KSeF plus bank sprawdzający opłacone faktury: narzędzie z portfolio, opisane bezosobowo. Nazw programów księgowych, których nie spinaliśmy, świadomie nie wymieniamy.

---

## Nowe podstrony

Wszystkie w rejestrze `lib/uslugi/podstrony/index.ts`, rodzic `dokumenty-faktury`. Kolejność wdrożenia od najważniejszej.

---

### A. /uslugi/dokumenty-faktury/ksef

- **H1:** Automatyzacja KSeF: faktury pobierane, sprawdzane i zaksięgowane bez przepisywania
- **metaTitle:** `Automatyzacja KSeF dla firm` (27 znaków)
- **Fraza główna:** automatyzacja KSeF
- **Rozdział intencji:** strona macierzysta odpowiada na „chcę przestać przepisywać dokumenty". Ta podstrona odpowiada wyłącznie na „mam KSeF, jak spiąć go z moją księgowością". Cała treść kręci się wokół tego, co technicznie dzieje się między KSeF a programem księgowym. Nie powiela odczytu ze zdjęć i skanów (to /ocr-faktur), nie powiela ścieżki akceptacji kosztu (to /obieg-i-akceptacja), nie powiela rozbicia cen (to /ile-kosztuje).
- **Sekcje:**
  1. Kapsuła: co robi automat KSeF, ile kosztuje, od czego zaczynamy
  2. Czym faktura z KSeF różni się od PDF-a i dlaczego to zmienia całą automatyzację
  3. Jak działa nasz automat KSeF krok po kroku: pobranie, sprawdzenie danych kontrahenta, klasyfikacja, zapis, wyjątki do człowieka
  4. Co się dzieje, gdy pobieranie się nie wykona
  5. Co dostajesz na wyjściu: rejestr dokumentów, raport, powiadomienie o niepewnych
  6. Pięć błędów, które psują wdrożenie KSeF (przeniesione z sekcji 6 strony macierzystej, w wersji rozszerzonej)
  7. Ile kosztuje i za co płacisz co miesiąc
  8. Kiedy nie warto tego wdrażać
  9. Bezpieczeństwo danych i co zostaje u Ciebie po zakończeniu współpracy
  10. FAQ
  11. CTA: rozmowa 20 minut, bez prezentacji

- **Gotowa kapsuła:**

> Automatyzacja KSeF to automat, który sam pobiera Twoje faktury z KSeF, sprawdza dane, przypisuje koszt i zapisuje dokument w programie księgowym albo w arkuszu. Codziennie, o ustalonej porze, bez czekania na to, aż ktoś sobie przypomni. Dokument, którego automat nie jest pewien, trafia do kolejki dla człowieka razem z podglądem oryginału. Zaczynamy od Sprintu Diagnostycznego za 1490 zł netto, 5 dni roboczych, odliczanego od wdrożenia. Pełne wdrożenie to 3000-10000 zł netto. Utrzymanie 99-599 zł netto miesięcznie przy infrastrukturze u nas albo 0 zł, jeśli przekażemy ją Tobie.

- **Gotowe FAQ:**

> **Czy automat pobierze faktury z KSeF sam, czy ktoś musi kliknąć?**
>
> Sam, o ustalonej porze, codziennie. Nie ma tu żadnego kroku, w którym człowiek musi pamiętać o pobraniu. Człowiek dostaje tylko to, co wymaga decyzji.
>
> **Skąd będę wiedzieć, że pobieranie się nie wykonało?**
>
> Automat raportuje nie tylko to, że coś przetworzył, ale też to, że dziś nie przetworzył nic.
>
> Cisza dłuższa niż ustalona wysyła powiadomienie. To najczęstsza przyczyna nerwowego zamknięcia miesiąca.
>
> **Co z fakturami, których w KSeF nie ma?**
>
> Paragony, dokumenty zagraniczne i faktury spoza systemu odczytujemy z pliku albo ze zdjęcia.
>
> Opisaliśmy to osobno na stronie OCR faktur kosztowych. Jedno wdrożenie obsłuży oba źródła naraz.
>
> **Czy automat zaksięguje fakturę bez mojej zgody?**
>
> Nie. Ustawiamy próg pewności i decydujesz, co idzie prosto do zapisu, a co czeka na zatwierdzenie. Każda decyzja jest zapisana: co automat odczytał, z jaką pewnością i kto to potwierdził.
>
> **Ile trwa wdrożenie?**
>
> Termin ustalamy na koniec Sprintu Diagnostycznego, który trwa 5 dni roboczych.
>
> Wcześniej nie znamy Twoich źródeł dokumentów ani tego, co wystawia Twoja licencja. Każda data byłaby zgadywaniem.
>
> **Kto zapłaci, gdy zmieni się sposób łączenia z KSeF?**
>
> Przy infrastrukturze u nas mieści się to w utrzymaniu za 99-599 zł netto miesięcznie. Przy infrastrukturze u Ciebie utrzymanie kosztuje 0 zł, a taką poprawkę rozliczamy po 350 zł netto za godzinę.
>
> **Gdzie sprawdzę aktualne terminy obowiązku KSeF?**
>
> U źródła, na stronie Ministerstwa Finansów. Nie przepisujemy terminów na swoją stronę, bo zmieniały się już kilka razy, a nieaktualna data szkodzi bardziej, niż pomaga.

- **Źródło liczb:** 1490 zł i 5 dni roboczych, 3000-10000 zł: cennik. 99-599 zł/mies., 0 zł/mies. i 350 zł netto za godzinę: decyzja właściciela z 2026-08-31, punkt 2. Pokrycie merytoryczne: narzędzie w portfolio, automatyzacja KSeF plus bank.

---

### B. /uslugi/dokumenty-faktury/ocr-faktur

- **H1:** OCR faktur kosztowych: zdjęcie albo skan zamiast ręcznego wpisywania
- **metaTitle:** `OCR faktur kosztowych bez przepisywania` (39 znaków)
- **Fraza główna:** OCR faktur
- **Rozdział intencji:** KSeF obsługuje tylko dokumenty wystawione w systemie. Ta podstrona bierze wszystko, co do KSeF nie trafi: paragony, faktury zagraniczne, skany, zdjęcia z telefonu, dokumenty od podwykonawców. Intencja: „mam stos papieru i chcę go odczytać". Nie dotyka obowiązku ustawowego (to /ksef) ani ścieżki akceptacji (to /obieg-i-akceptacja).
- **Sekcje:**
  1. Kapsuła: co odczytujemy, co się dzieje z dokumentem niepewnym, ile kosztuje
  2. Które dokumenty nie trafią do KSeF i dlatego wymagają odczytu
  3. Jak to działa: zdjęcie z telefonu, odczyt, próg pewności, korekta jednym kliknięciem
  4. Co się dzieje z dokumentem, którego automat nie jest pewien
  5. Case study Onyx: około 120 faktur miesięcznie, wcześniej 3 do 5 minut na dokument
  6. Ile miesięcznie kosztuje Cię ręczne przepisywanie (kalkulator, ten sam komponent co na stronie macierzystej)
  7. Z czym to spinamy
  8. Ile kosztuje i za co płacisz co miesiąc
  9. Kiedy odczyt się nie opłaca
  10. FAQ
  11. CTA: pokaz na Twoich dokumentach

- **Gotowa kapsuła:**

> OCR faktur kosztowych to odczyt dokumentu ze zdjęcia, skanu albo pliku PDF, bez przepisywania czegokolwiek ręcznie. Automat wyciąga sprzedawcę, numer, daty oraz kwoty netto, VAT i brutto, przypisuje koszt według Twojego planu kont i zapisuje dokument tam, gdzie go potrzebujesz. Dokument, którego nie jest pewien, odkłada do kolejki dla człowieka razem z podglądem oryginału, zamiast wpisywać dane w ciemno. U klienta Onyx tak obsługiwane jest około 120 faktur miesięcznie, a wcześniej jedna faktura zabierała od 3 do 5 minut. Zaczynamy od Sprintu Diagnostycznego za 1490 zł netto, 5 dni roboczych, odliczanego od wdrożenia.

- **Gotowe FAQ:**

> **Czy automat poradzi sobie ze zdjęciem zrobionym telefonem?**
>
> Tak, u klienta Onyx faktura wchodzi do obiegu właśnie przez zdjęcie z telefonu. Jeśli zdjęcie jest słabej jakości, automat nie wpisuje danych w ciemno, tylko odkłada dokument do sprawdzenia.
>
> **Co, jeśli automat źle odczyta kwotę?**
>
> Każdy dokument dostaje ocenę pewności. Poniżej ustalonego progu nie jest zapisywany, tylko trafia do kolejki dla człowieka.
>
> Każda decyzja jest zapisana, więc sporny dokument sprawdzasz w minutę, a nie odtwarzasz z pamięci.
>
> **Jaki procent faktur automat odczyta bezbłędnie?**
>
> Liczby podamy dopiero, gdy zmierzymy je u siebie na pełnym okresie rozliczeniowym. Cudzych procentów nie przepisujemy.
>
> To, co obiecujemy dziś, to mechanizm: dokument niepewny nie wchodzi do księgi.
>
> **Czy automat sam przypisze koszt do właściwej kategorii?**
>
> Tak, uczymy go Twojego planu kont i reguł, według których przypisujesz koszty. Typowe faktury przypisuje sam, a tych, których nie jest pewny, nie zgaduje, tylko podsuwa do zatwierdzenia.
>
> **Ile dokumentów muszę mieć, żeby to się opłaciło?**
>
> Progu nie podajemy z palca. Policz to w kalkulatorze na tej stronie: jeśli roczny koszt przepisywania nie przekracza ceny wdrożenia, poczekaj, a my Ci to powiemy na pierwszej rozmowie.
>
> **Co zostaje u mnie, jeśli przestaniemy współpracować?**
>
> Wszystkie dokumenty i wszystkie dane, bo od początku leżą w Twoich systemach. Zostaje też opis działania automatu i dostępy, żeby mógł to przejąć ktokolwiek inny.

- **Źródło liczb:** około 120 faktur miesięcznie i 3-5 minut na fakturę: realizacja Onyx. 1490 zł i 5 dni roboczych: cennik. Zdanie o odkładaniu niepewnych dokumentów i o nauce planu kont pochodzi z zatwierdzonego FAQ strony macierzystej.

---

### C. /uslugi/dokumenty-faktury/ile-kosztuje

- **H1:** Ile kosztuje automatyzacja faktur: widełki, co je przesuwa i koszt utrzymania
- **metaTitle:** `Ile kosztuje automatyzacja faktur` (32 znaki)
- **Fraza główna:** ile kosztuje automatyzacja faktur
- **Rozdział intencji:** pozostałe podstrony sprzedają konkretne zastosowanie i podają cenę jednym akapitem. Ta odpowiada wyłącznie na pytanie o pieniądze, dla kogoś, kto porównuje oferty i jeszcze nie wybrał wykonawcy. Intencja porównawcza, nie wdrożeniowa. Każda sekcja kończy linkiem do właściwej strony usługi.
- **Sekcje:**
  1. Odpowiedź w dwóch zdaniach: widełki i co je przesuwa
  2. Cennik według zakresu: audyt, pierwsza automatyzacja, pełne wdrożenie
  3. Trzy pozycje, które musi mieć każda uczciwa oferta: stworzenie, utrzymanie, zużycie tokenów po stronie klienta
  4. Dwie drogi utrzymania: abonament u nas albo infrastruktura u Ciebie za 0 zł
  5. Od czego zależy cena, czyli dlaczego dwie oferty na ten sam proces różnią się kilkukrotnie
  6. Jak policzyć zwrot na własnych liczbach (kalkulator)
  7. Czerwone flagi w ofertach na automatyzację
  8. Dwie rundy poprawek w cenie i co jest osobną wyceną
  9. Kiedy automatyzacja się nie opłaca
  10. FAQ o cenach
  11. CTA: wycena po 20-minutowej rozmowie

- **Gotowa kapsuła:**

> Automatyzacja faktur to u nas 3000-10000 zł netto za pełne wdrożenie albo 1990 zł netto za AI Start, czyli pierwszą automatyzację na próbę. Pracę zaczynamy od Sprintu Diagnostycznego za 1490 zł netto, 5 dni roboczych, którego cenę odliczamy od wdrożenia. Cenę przesuwa liczba źródeł, z których wpadają dokumenty, i liczba miejsc, do których mają trafić po odczytaniu. Po starcie masz wybór: utrzymanie 99-599 zł netto miesięcznie przy infrastrukturze u nas albo 0 zł miesięcznie, gdy przekażemy ją Tobie, a poprawki rozliczymy po 350 zł netto za godzinę. Zużycie tokenów jest zawsze osobną pozycją po Twojej stronie.

- **Źródło liczb:** wszystkie kwoty z cennika i z decyzji właściciela z 2026-08-31, punkt 2. Zero liczb konkurencji.

---

### D. /uslugi/dokumenty-faktury/obieg-i-akceptacja

- **H1:** Elektroniczny obieg faktur: kto zatwierdza, kiedy i do jakiej kwoty
- **metaTitle:** `Elektroniczny obieg faktur w firmie` (34 znaki)
- **Fraza główna:** elektroniczny obieg faktur
- **Rozdział intencji:** tu nie chodzi o odczyt dokumentu (to /ocr-faktur) ani o połączenie z KSeF (to /ksef), tylko o ścieżkę decyzji wewnątrz firmy: kto zatwierdza koszt, do jakiej kwoty, co przy nieobecności, gdzie widać status. Intencja: „faktura leży u kogoś na biurku i nikt nie wie u kogo".
- **Sekcje:**
  1. Kapsuła: co daje elektroniczny obieg i od czego zaczynamy
  2. Trzy objawy, że obieg faktur w firmie jest zepsuty
  3. Jak wygląda ścieżka akceptacji, którą budujemy: progi kwotowe, zastępstwa, terminy, eskalacja
  4. Gdzie widać status każdej faktury i kto na niej stoi
  5. Elektroniczny obieg a KSeF: co się zmienia, a co zostaje po staremu
  6. Papierowy obieg kontra system pudełkowy kontra wdrożenie u nas
  7. Ile kosztuje i za co płacisz co miesiąc
  8. Kiedy prosty arkusz wystarczy i nie potrzebujesz nas
  9. FAQ o obiegu dokumentów
  10. CTA: rozmowa 20 minut

- **Uwaga redakcyjna:** ta podstrona opisuje mechanizm usługi, nie wdrożenie. Nie wolno na niej postawić case study ani żadnej liczby spoza cennika. Progi kwotowe podajemy jako pole do ustalenia z klientem, nigdy jako naszą rekomendowaną kwotę.

---

### E. /uslugi/dokumenty-faktury/przypomnienia-o-platnosciach

- **H1:** Automat pilnujący nieopłaconych faktur i wysyłający przypomnienia
- **metaTitle:** `Przypomnienia o niezapłaconych fakturach` (39 znaków)
- **Fraza główna:** automatyczne przypomnienia o niezapłaconych fakturach
- **Rozdział intencji:** wszystkie pozostałe podstrony dotyczą faktur kosztowych, czyli tego, co wpływa. Ta jedna dotyczy pieniędzy, które mają wpłynąć: automat porównuje wystawione faktury z wpłatami i sam przypomina o zaległych. Inna motywacja zakupowa, czyli płynność zamiast oszczędności czasu, więc nie kanibalizuje sąsiednich stron. Łączy się z /uslugi/voiceboty/windykacja, ale tam kanałem jest telefon, a tu mail i wiadomość.
- **Sekcje:**
  1. Kapsuła: co robi automat i od czego zaczynamy
  2. Jak automat rozpoznaje, że faktura została opłacona
  3. Harmonogram przypomnień i ton wiadomości (rytm ustalasz Ty)
  4. Co trafia do Ciebie, a co idzie do klienta bez Twojego udziału
  5. Gdzie kończy się automat, a zaczyna rozmowa człowieka
  6. Ile kosztuje i za co płacisz co miesiąc
  7. Kiedy tego nie wdrażać
  8. FAQ o monitoringu płatności
  9. CTA: rozmowa 20 minut

- **Uwaga redakcyjna, twardy zakaz:** ani jednego słowa o płaceniu faktur przez API banku ani o zlecaniu przelewów jednym kliknięciem. Bank pojawia się wyłącznie w kontekście SPRAWDZANIA, które faktury są już opłacone. Harmonogram przypomnień opisujemy jako ustalany z klientem, bez podawania konkretnej liczby dni, bo nie mamy jej w konspekcie.

---

## Uwagi dla sesji wdrożeniowej

1. **Kolor kategorii.** `lib/inf-kategorie.ts` ma dla `dokumenty-faktury` wpis `{ c: '#ffa101', odcien: '#ffc120', emoji: '📄', ikona: 'dokument-skan' }` i skrót `OCR`. Wszystkie nowe sekcje i wszystkie podstrony dziedziczą ten ton przez `dekorUslugi(slug)`. Nie wprowadzać nowego koloru.

2. **Rejestr podstron.** Każda z pięciu podstron to jeden plik w `lib/uslugi/podstrony/` plus jeden import i jeden wpis w tablicy `PODSTRONY` w `lib/uslugi/podstrony/index.ts`, z `rodzic: 'dokumenty-faktury'`. Trasa SSG i wpis w mapie witryny biorą się z rejestru automatycznie, ale **musi istnieć katalog trasy** `app/uslugi/dokumenty-faktury/[podstrona]/` na wzór tego, co działa dla voicebotów. Dziś go nie ma, więc bez utworzenia katalogu podstrony zwrócą 404.

3. **Kalkulator to nowy komponent.** Sekcja 2 nie jest tabelą, tylko interaktywnym blokiem z trzema pustymi polami. Wymóg twardy z decyzji właściciela: **żadnego pola wypełnionego wartością domyślną i żadnej liczby w placeholderze**. Wynik pokazujemy dopiero po wypełnieniu wszystkich trzech pól. Ten sam komponent użyjemy ponownie na /ocr-faktur i /ile-kosztuje.

4. **JSON-LD.** Nowe FAQ z sekcji 10 i FAQ podstron **nie** wchodzą do `uslugaSchemas(usluga).faq` strony macierzystej. FAQPage strony macierzystej zostaje 1:1 z istniejącą sekcją 7, żeby nie rozjechał się kontrakt schema kontra treść. Podstrony dostają własne FAQPage z własnych danych.

5. **Linkowanie wewnętrzne.** Ze strony macierzystej wychodzą dwa linki w treści: z sekcji 3 na /ksef i z sekcji 7 na /ile-kosztuje. Reszta podstron podpina się przez komponent `PodstronyPowiazane`, który już jest w szablonie. Każda podstrona linkuje z powrotem na stronę macierzystą oraz do jednej siostrzanej, tej najbliższej intencją (ksef ↔ ocr-faktur, obieg ↔ ocr-faktur, przypomnienia ↔ ksef, ile-kosztuje do wszystkich).

6. **`live` w sitemapie.** Trasy `/uslugi/*` mają w `lib/site.ts` `live: false`. Podstrony wejdą do `sitemap.xml` dopiero po świadomym flipie na `true`, po weryfikacji 200 OK na wdrożonym URL. Nie flipować hurtem, tylko po sprawdzeniu każdej trasy.

7. **Zakaz twardy przy Onyxie.** Ani jednego słowa o płaceniu faktur przez API banku, na żadnej stronie tego obszaru. Bank tylko w kontekście sprawdzania, które faktury są opłacone.

8. **Zakaz twardy przy KSeF.** Nie wstawiać żadnej daty ani progu obowiązku KSeF, dopóki ktoś nie odczyta ich u źródła w Ministerstwie Finansów i nie zapisze daty sprawdzenia. Nagłówki sekcji są celowo sformułowane tak, żeby nie obiecywały terminu.

9. **Nazwy konkurencji.** W treści widocznej dla czytelnika nie ma i nie może się pojawić żadna nazwa domeny konkurencyjnej agencji ani nazwa programu księgowego, którego nie spinaliśmy. Nazwy w tym pakiecie występują wyłącznie w polach „Po co" i „Źródło liczb", które są notatką dla nas, nie treścią strony.

10. **`queries` w pliku danych.** Do tablicy `queries` w `lib/uslugi/dokumenty-faktury.ts` dopisać: `automatyzacja KSeF`, `OCR faktur`, `elektroniczny obieg faktur`, `ile kosztuje automatyzacja faktur`, `automatyczne przypomnienia o niezapłaconych fakturach`, `błędy wdrożenia KSeF`. Nic nie usuwać.

11. **Sprawdzenie przed ogłoszeniem gotowe.** Po wdrożeniu przejść stronę wzrokowo i policzyć: zero wystąpień ciągu `[DO POTWIERDZENIA]`, zero `[POMIAR W TOKU]`, zero długiego myślnika, zero nazwy domeny konkurencji. Dopiero wtedy flip `live`.

---

## Co zostało wycięte i dlaczego

| Element z wersji roboczej | Powód wycięcia |
|---|---|
| Tabela parametrów produkcyjnych (czas przetworzenia faktury, skuteczność odczytu, odsetek do człowieka, próg pewności) | cztery z sześciu rubryk były puste. Zastąpiona sekcją 4, która opisuje mechanizm i nie potrzebuje ani jednej liczby |
| Tabela harmonogramu obowiązku KSeF (cztery terminy i progi) | wszystkie cztery pozycje były nieznane. Nagłówek obiecywał termin, którego sekcja nie dawała. Sekcja 3 opisuje teraz skutek operacyjny i odsyła po terminy do Ministerstwa Finansów |
| Próg „około pięćdziesięciu dokumentów miesięcznie" jako granica opłacalności | liczby nie ma w konspekcie, pochodziła ze strony konkurencji i była firmowana jako nasze wyliczenie. Zastąpiona odesłaniem do kalkulatora |
| Cena rynkowa „50-400 zł miesięcznie" za gotowy program z OCR | nikt jej nie zweryfikował na żywo z datą sprawdzenia. Wiersz „Koszt miesięczny" w tabeli porównawczej opisuje teraz zasadę bez kwoty |
| Kwoty kosztu startu i kosztu miesięcznego pół etatu | brak danych, w wersji roboczej stały jako placeholdery. Tabela porównawcza działa bez nich, bo czytelnik podstawia swoje liczby z kalkulatora |
| Czas realizacji AI Start i czas pełnego wdrożenia | cennik podaje czas tylko dla Sprintu Diagnostycznego. Kolumna „Czas" zniknęła z tabeli cen, zastąpiona zdaniem, że termin ustalamy na koniec Sprintu |
| Podsekcja „Czas wdrożenia i cena" w case study Onyx | zakres i czas tego konkretnego wdrożenia nie są znane. Case study działa bez nich, bo dowodem jest zmiana sposobu pracy, nie harmonogram |
| Zdania o Onyxie: „stan finansów znany dopiero po zamknięciu miesiąca", „decyzje na podstawie tego, co ktoś pamiętał", kolejka dokumentów niepewnych u Onyxa | zmyślone fakty o kliencie wymienionym z nazwy. Zostało wyłącznie to, co jest w konspekcie |
| „Umowa bezterminowa" przy utrzymaniu | wymyślony warunek handlowy. Zastąpiony realnym modelem dwóch dróg z decyzji właściciela |
| Podstrona /uslugi/dokumenty-faktury/biuro-rachunkowe | wszystkie jej sekcje wymagały danych, których nie mamy: dzień księgowej godzina po godzinie, ceny dla biura z 30, 60 i 100 klientami, case biura. Nie mamy wdrożenia w biurze rachunkowym, więc cała strona stałaby na obietnicach |
| Sekcja „Ile pieniędzy leży w Twoich nieopłaconych fakturach" na podstronie o przypomnieniach | wymagała liczby, której nie mamy, i sugerowała pomiar po naszej stronie |
| Konkretny harmonogram przypomnień (7 dni, 3 dni, w dniu terminu) | to liczby ze strony konkurencji. Opisujemy rytm jako ustalany z klientem |
