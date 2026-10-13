# Pakiet wdrożeniowy: Voiceboty

**Adres strony:** https://www.simplefast.ai/uslugi/voiceboty
**Plik danych:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\lib\uslugi\voiceboty.ts`
**Data pakietu:** 2026-08-31
**Co ten pakiet dodaje:** 11 nowych sekcji do istniejącej strony voicebotów (dwa kalkulatory bez domyślnych kwot, porównanie z chatbotem i IVR, blok o legalności, definicja minuty rozmowy, lista pułapek w ofertach, dyskwalifikacja, dowody, branże i drugie FAQ obiekcji) oraz 6 nowych podstron, które łapią intencję cenową, prawną i branżową.

Cała treść poniżej jest napisana z polskimi znakami i jest gotowa do wklejenia bez przepisywania.

---

## UWAGA NADRZĘDNA: konflikt z zatwierdzoną treścią strony (naprawiony w tym pakiecie)

Sprawdziłem żywy kod przed redakcją. Cała witryna ma twardy, powtórzony kontrakt:

> „Nie robimy botów, które same wydzwaniają do ludzi, bo to psuje zaufanie do firmy."

Stoi w `lib/uslugi/voiceboty.ts` (FAQ „Czy voicebot dzwoni sam do klientów?") oraz w trzech podstronach: `windykacja.ts`, `potwierdzanie-wizyt.ts`, `odbieranie-telefonow.ts`. Razem 8 miejsc, w tym w kapsułach i w meta opisach.

Materiał wejściowy łamał ten kontrakt w pięciu miejscach: karta „Bot dzwoni pierwszy", wiersz „bot, który oddzwania sam", oddzwanianie do zapytań z portali ogłoszeniowych, punkt o kampaniach wychodzących oraz cała podstrona `/oddzwanianie-do-leadow`. Wszystkie te miejsca są w tym pakiecie usunięte albo przepisane na ruch przychodzący.

**Sesja wdrożeniowa nie ma tu nic do decydowania: nigdzie w poniższej treści nie ma obietnicy połączenia wychodzącego.**

---

## Czego NIE ruszamy

Wszystkie istniejące sekcje `lib/uslugi/voiceboty.ts` zostają nietknięte, co do znaku:

| Pole w pliku | H2 na stronie | Status |
|---|---|---|
| `kapsula` | blok krótkiej odpowiedzi pod H1 | bez zmian |
| `metaTitle`, `metaDescription` | tytuł i opis w SERP | bez zmian |
| `problem` | Ile telefonów dziennie nie odbierasz? | bez zmian |
| `rozwiazanie` | Co robi bot telefoniczny, gdy nie możesz odebrać? | bez zmian |
| `tabelaPorownawcza` | Agent głosowy a odbieranie telefonu ręcznie | bez zmian |
| `kroki` | Jak wdrażamy voicebota krok po kroku? | bez zmian |
| `ramaCeny` | Ile kosztuje voicebot dla firmy? | bez zmian |
| `faq` (10 pytań) | sekcja FAQ | bez zmian, dokładamy DRUGI blok pytań niżej |
| `cta` | Pokaż mi, gdzie tracę czas | bez zmian |
| `powiazane` | kalkulator oszczędności | bez zmian, dokładamy linki do nowych podstron |

Nie ruszamy też `h1`, `slug`, `queries` ani `minPrice`. Trzy istniejące podstrony (`windykacja`, `potwierdzanie-wizyt`, `odbieranie-telefonow`) zostają bez zmian treści. Dokładamy do nich wyłącznie link do nowego cennika.

---

## Nowe sekcje na istniejącej stronie

Numeracja odwołuje się do sekcji w pliku: 1 = `problem`, 2 = `rozwiazanie`, 3 = `tabelaPorownawcza`, 4 = `kroki`, 5 = `ramaCeny`, 6 = `powiazane`, 7 = `faq`, 8 = `cta`.

---

### 1. Ile miesięcznie kosztuje Cię nieodebrany telefon?

- **Gdzie wstawić:** zaraz po sekcji `problem`, przed `rozwiazanie`
- **Po co:** łapie frazę „ile firma traci na nieodebranych telefonach" i buduje pilność, zanim czytelnik dojdzie do ceny. Konkurencja (malinski.ai, calliovoicebot.pl, sekretarkaai.pl) stawia ten blok wysoko, a my mamy dziś sam opis problemu bez żadnej liczby.
- **Typ:** kalkulator (wyspa `'use client'`) plus akapity
- **TREŚĆ:**

Nieodebrany telefon nie zostawia śladu. Nie ma po nim maila, wpisu w CRM ani powiadomienia, więc w żadnym raporcie nie zobaczysz, ile Cię kosztował.

Ślad zostaje gdzie indziej: u konkurencji, do której ten sam człowiek zadzwonił dwie minuty później. Tę stratę musisz policzyć sam, bo nikt Ci jej nie pokaże.

Nie podstawiamy za Ciebie żadnych liczb. Nie wiemy, ile telefonów dostajesz i ile jest wart Twój klient, a zgadywanie tego za Ciebie byłoby ściemą.

Wpisz trzy liczby, które znasz z głowy. Resztę policzy kalkulator.

**KALKULATOR (pola startują PUSTE, zero wartości domyślnych):**

| Pole | Etykieta dla użytkownika | Podpowiedź pod polem |
|---|---|---|
| A | Ile telefonów dostajesz dziennie | Policz zwykły dzień roboczy, nie szczyt sezonu |
| B | Ile procent z nich zostaje bez odbioru | Jeśli nie wiesz, sprawdź bilingi z zeszłego miesiąca |
| C | Ile jest dla Ciebie wart jeden nowy klient | Średnia wartość pierwszego zlecenia wystarczy |

**WZÓR POKAZANY NA STRONIE (rozwijany, zawsze dostępny po kliknięciu):**

```
nieodebrane w miesiącu = A x B% x 21 dni roboczych
górna granica straty   = nieodebrane w miesiącu x C
wariant ostrożny       = górna granica podzielona przez 3
```

**WYNIK (trzy liczby, każda podpisana):**

1. Ile telefonów miesięcznie zostaje bez odbioru.
2. Górna granica straty, czyli sytuacja, w której nikt nie oddzwania.
3. Wariant ostrożny, czyli założenie, że wraca dwóch na trzech.

**AKAPITY POD WYNIKIEM:**

Górna granica to skrajność. Część ludzi oddzwania, więc patrz na wariant ostrożny, bo on jest bliżej prawdy.

Zestaw ten wynik z pełnym kosztem bota, a nie tylko z ceną budowy. Voicebot prosty to 2500 zł netto raz, do tego utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł, gdy przejmiesz infrastrukturę do siebie.

Do tego dochodzą minuty rozmów i tokeny, które płacisz bezpośrednio dostawcom. Piszemy o nich niżej, przy definicji minuty.

- **Źródło liczb:** 21 dni roboczych w miesiącu to standardowa arytmetyka kalendarza. 2500 zł netto, 299 do 1500 zł netto, 0 zł przy infrastrukturze u klienta: konspekt firmy, cennik zatwierdzony przez właściciela, zgodny 1:1 z `voiceboty.ts`. Dzielenie przez 3 w wariancie ostrożnym jest jawnie pokazane we wzorze na stronie, więc czytelnik widzi całe działanie. **Zero wartości domyślnych w polach A, B, C** (decyzja właściciela z 2026-08-31).

---

### 2. Jak brzmi rozmowa z voicebotem?

- **Gdzie wstawić:** po sekcji `rozwiazanie`, przed `tabelaPorownawcza`
- **Po co:** największa luka konwersyjna całej strony. Sprzedajemy produkt głosowy, a głosu nie da się tu doświadczyć. Home.pl ma blok „Przekonaj się, jak brzmi voicebot AI", voicefleet otwiera stronę od odsłuchu, syntalith.ai daje demo branżowe. Frazy: „jak brzmi voicebot po polsku", „demo voicebota".
- **Typ:** przykładowy zapis rozmowy plus dwie karty
- **TREŚĆ:**

Voicebota nie da się sprzedać samym opisem, bo opis nie ma głosu. Więc pokazujemy, jak taka rozmowa leci od pierwszej sekundy do końca.

Poniżej przykładowy scenariusz rozmowy przychodzącej, napisany przez nas jako ilustracja. To nie jest zapis rozmowy żadnego klienta.

**PRZYKŁADOWY SCENARIUSZ: pacjent dzwoni po godzinach**

> **Bot:** Dzień dobry, tu asystent głosowy przychodni. Rozmawia Pan z systemem AI. W czym mogę pomóc?
>
> **Dzwoniący:** Chciałem się zapisać do internisty, najlepiej w tym tygodniu.
>
> **Bot:** Sprawdzam grafik. Mam wolny czwartek o 9:20 i piątek o 14:00. Który termin pasuje?
>
> **Dzwoniący:** Czwartek. Chociaż nie, w czwartek pracuję. Niech będzie piątek.
>
> **Bot:** Rezerwuję piątek, godzina 14:00. Poproszę o imię i nazwisko, przeliteruję je i potwierdzę.
>
> **Dzwoniący:** A ile to kosztuje?
>
> **Bot:** Tego akurat nie mam potwierdzonego w mojej bazie, więc nie będę zgadywał. Przekazuję pytanie rejestracji, oddzwonią rano.

Trzy rzeczy z tego zapisu robią całą robotę. Bot mówi w pierwszym zdaniu, że jest AI. Radzi sobie ze zmianą decyzji w połowie zdania. I nie zmyśla, gdy czegoś nie ma w bazie.

**KARTA 1: Przetestuj naszego bota teraz, na tej stronie**
Na simplefast.ai działa nasz własny bot. Odpowiada z tej samej bazy wiedzy, którą podpinamy klientom, tylko tekstem, nie głosem.
Klikasz „Zapytaj AI" i zadajesz mu pytanie spoza scenariusza. Nie musisz się z nikim umawiać.

**KARTA 2: Wolisz usłyszeć swoją własną rozmowę**
Na diagnozie budujemy krótki scenariusz na Twoich pytaniach, tych, które Twoi klienci zadają codziennie. Wtedy słyszysz swoją rozmowę, nie cudzą.
Diagnoza jest bezpłatna. Pełna analiza z raportem to Sprint Diagnostyczny za 1490 zł netto, który odliczamy od faktury za wdrożenie.

- **Źródło liczb:** 1490 zł netto za Sprint Diagnostyczny i odliczenie od wdrożenia: konspekt firmy, cennik zatwierdzony przez właściciela. Bot tekstowy na simplefast.ai: zweryfikowany 2026-08-31 (widget obecny na `/uslugi/chatboty`, przycisk „Zapytaj AI" działa, endpoint `/api/chat` odpowiada), wyjątek publikacyjny pozwalający opisać go jako naszego. Zapis rozmowy: **przykładowy scenariusz napisany przez nas**, jawnie tak podpisany w treści, zero liczb i zero cudzych danych. Bezpłatna diagnoza: pole `cta.dowod` istniejącej strony.

---

### 3. Czym voicebot różni się od chatbota i tonowego IVR?

- **Gdzie wstawić:** po sekcji `tabelaPorownawcza`, przed `kroki`
- **Po co:** frazy porównawcze „voicebot a IVR" i „voicebot czy chatbot" mają realny wolumen, a my nie mamy na nie ani jednego zdania. Treść tabelaryczna dobrze się cytuje w ChatGPT i Perplexity. Ma to malinski.ai.
- **Typ:** tabela plus akapity
- **TREŚĆ:**

Trzy różne rzeczy trafiły do jednego worka o nazwie automatyzacja telefonu. Różnią się tym, co rozmówca musi zrobić, żeby dostać odpowiedź.

Tonowy IVR to menu z klawiszami. Rozumie cyfry, nie rozumie zdań, więc każde pytanie spoza listy kończy się wciskaniem zera i czekaniem na człowieka.

Chatbot rozumie zdania, ale tylko pisane. Nie pomoże człowiekowi, który prowadzi auto, stoi w hałasie albo po prostu woli zadzwonić.

Voicebot rozumie mowę i sam mówi. Odbiera telefon, ustala, o co chodzi, i albo załatwia sprawę do końca, albo przekazuje ją człowiekowi z notatką z rozmowy.

**TABELA:**

| Co porównujemy | Tonowy IVR | Chatbot | Voicebot |
|---|---|---|---|
| Jak rozmówca się porozumiewa | Wciska klawisze | Pisze tekst | Mówi normalnym zdaniem |
| Gdzie działa | Na Twoim numerze | Strona WWW, WhatsApp, Messenger, Instagram, Telegram | Na Twoim numerze telefonu |
| Rozumie pytanie spoza scenariusza | Nie | Tak, jeśli ma bazę wiedzy firmy | Tak, jeśli ma bazę wiedzy firmy |
| Działa, gdy rozmówca prowadzi auto | Słabo | Nie | Tak |
| Kto zaczyna rozmowę | Zawsze klient | Zawsze klient | Zawsze klient, nasze boty nie wydzwaniają |
| Zapisuje termin w kalendarzu | Nie | Tak, przy integracji | Tak, przy integracji |
| Co się dzieje przy trudnej sprawie | Kolejka do konsultanta | Formularz i cisza do rana | Przekazanie człowiekowi z notatką z rozmowy |
| Koszt uruchomienia u nas | Nie jest to nasza usługa | Od 1790 zł netto | Od 2500 zł netto |
| Kiedy wychodzi najtaniej | Gdy masz trzy stałe opcje menu | Gdy ruch przychodzi ze strony i z komunikatorów | Gdy dzwoni więcej ludzi, niż masz rąk do odbierania |

Jedno drugiego nie wyklucza. Chatbot łapie ruch ze strony i z komunikatorów, voicebot łapie ruch z telefonu, a ten sam człowiek często korzysta z obu w tym samym tygodniu.

- **Źródło liczb:** 1790 zł netto za chatbota prostego i 2500 zł netto za voicebota prostego: konspekt firmy, cennik zatwierdzony przez właściciela. Lista kanałów chatbota (strona WWW, WhatsApp, Messenger, Instagram, Telegram): decyzja właściciela z 2026-08-31. **Slack i Microsoft Teams celowo nie występują, bo ich nie robimy.** Wiersz „Kto zaczyna rozmowę" napisany zgodnie z kontraktem całej witryny o braku połączeń wychodzących. Reszta tabeli to opis mechanizmu bez liczb.

---

### 4. Voicebot czy dodatkowa osoba do odbierania telefonu?

- **Gdzie wstawić:** po nowej sekcji 3, przed `kroki`
- **Po co:** istniejąca tabela „Agent głosowy a odbieranie telefonu ręcznie" nie ma ani jednej kwoty, więc porównanie nic nie waży. Konkurencja (smart-asystenci.pl, sekretarkaai.pl, malinski.ai, maikon.io) opiera na tym całe strony. Frazy: „voicebot czy pracownik", „voicebot zamiast recepcji".
- **Typ:** kalkulator porównawczy plus tabela jakościowa
- **TREŚĆ:**

To pytanie pada w co drugiej rozmowie i zwykle kończy się porównaniem jednorazowej faktury z pensją, którą płacisz co miesiąc przez najbliższe lata.

Nie wpiszemy tu za Ciebie żadnej pensji ani żadnego narzutu składek. Twoja księgowa zna tę liczbę co do złotówki, a my nie.

Wpisz swój miesięczny koszt pracodawcy i wybierz wariant bota. Kalkulator zestawi obie ścieżki na dwanaście miesięcy.

**KALKULATOR (pola startują PUSTE, zero wartości domyślnych):**

| Pole | Etykieta dla użytkownika | Typ pola |
|---|---|---|
| A | Twój miesięczny koszt pracodawcy przy tym stanowisku | liczba, wpisuje użytkownik |
| B | Wariant bota | wybór: prosty 2500 zł netto / z integracjami 5000 zł netto / z integracjami 9000 zł netto |
| C | Utrzymanie | wybór: 0 zł (infrastruktura u Ciebie) / 299 zł / 1500 zł |

**WZÓR POKAZANY NA STRONIE:**

```
pierwszy rok z osobą = A x 12
pierwszy rok z botem = B + (C x 12)
```

**WYNIK:** dwie liczby obok siebie, z jednym zdaniem pod spodem:

Do kwoty po stronie bota dochodzą minuty rozmów i tokeny modelu, które płacisz wprost dostawcom, poza naszą fakturą. Po stronie osoby dochodzi rekrutacja i czas na wdrożenie w firmę.

**TABELA JAKOŚCIOWA (to, czego kalkulator nie policzy):**

| Co liczymy | Dodatkowa osoba na recepcji | Voicebot od nas |
|---|---|---|
| Koszt startu | Rekrutacja, wdrożenie, kilka tygodni nauki firmy | Jednorazowa opłata za budowę, dwie rundy poprawek w cenie |
| Czas do uruchomienia | Rekrutacja plus okres wypowiedzenia u poprzedniego pracodawcy | 3 do 5 dni roboczych przy bocie prostym, 5 do 25 przy bocie z integracjami |
| Dostępność | Osiem godzin, urlop, zwolnienie, przerwa na kawę | Całą dobę, także w niedzielę i drugiego dnia świąt |
| Pięć telefonów o 8:00 | Czterech dzwoniących czeka albo się rozłącza | Odbiera kilka naraz, tyle ile linii masz wykupionych u dostawcy telefonii |
| Co robi lepiej | Wyjątki, emocje, negocjacje, klient wkurzony na firmę | Powtarzalne pytania, zapis terminu, spisanie sprawy po godzinach |
| Czego nie zrobi | Nie odbierze o 22:00 ani w sobotę | Nie poprowadzi trudnej rozmowy, przekazuje ją człowiekowi |

To nie jest wybór albo, albo. Voicebot bierze na siebie pierwsze trzydzieści sekund każdej rozmowy, a Twoja recepcja dostaje czas na klienta, który stoi przed nią.

Jeśli myślisz o zwolnieniu kogokolwiek, powiedz to na starcie. Zbudujemy wtedy inny scenariusz i inaczej policzymy zakres, bo bot bez człowieka za plecami sprawdza się tylko w prostych procesach.

- **Źródło liczb:** 2500 zł, 5000 do 9000 zł, utrzymanie 299 do 1500 zł albo 0 zł przy infrastrukturze u klienta, dwie rundy poprawek w cenie: konspekt firmy, cennik zatwierdzony przez właściciela. Czasy 3 do 5 i 5 do 25 dni roboczych: `lib/uslugi/voiceboty.ts`, decyzja właściciela z 2026-08-20, liczone od przekazania kompletu materiałów. **Pensja, narzut składek i koszt pracodawcy pochodzą wyłącznie z pola wpisanego przez użytkownika. Na stronie nie stoi żadna nasza kwota** (decyzja właściciela z 2026-08-31 o kalkulatorach bez domyślnych kwot). Wiersz o pięciu telefonach mówi o liniach u dostawcy telefonii i nie obiecuje nieskończonej równoległości.

---

### 5. Czy voicebot jest legalny i gdzie trafiają dane rozmówcy?

- **Gdzie wstawić:** po sekcji `kroki`, przed `ramaCeny`
- **Po co:** to dziś pierwsza obiekcja klienta z medycyny, prawa i finansów. Mamy na to jedno zdanie w FAQ, a syntalith.ai, calliovoicebot.pl i infinityteam.io mają pełne bloki bezpieczeństwa. Frazy: „voicebot RODO", „voicebot AI Act", „czy voicebot jest legalny".
- **Typ:** lista numerowana plus zamknięcie
- **TREŚĆ:**

Tak, jest legalny. Pod warunkiem, że rozmówca wie, z kim rozmawia, i że wiadomo, kto odpowiada za nagranie tej rozmowy.

Akt o sztucznej inteligencji wymaga, żeby człowiek wiedział, że po drugiej stronie jest system AI. My robimy to w pierwszym zdaniu każdej rozmowy.

Oto, jak układamy to w każdym wdrożeniu:

1. Bot przedstawia się w pierwszym zdaniu. Nie udaje pracownika i nie podaje ludzkiego imienia bez zaznaczenia, że jest asystentem głosowym.

2. Nagrywanie to osobna zgoda niż sama rozmowa. Rozmówca może odmówić i dalej załatwić sprawę, tylko bez zapisu dźwięku.

3. Administratorem danych jesteś Ty, nie my. Działamy jako podmiot przetwarzający, na umowie powierzenia danych, którą podpisujemy przy wdrożeniu.

4. Dane z rozmów zostają w Unii Europejskiej. Przy wariancie z infrastrukturą u Ciebie nagrania i transkrypcje trafiają na Twoje konta u dostawców, nie na nasze.

5. Czas trzymania nagrań ustawiasz Ty, my go tylko wykonujemy. Ty decydujesz, co bot nagrywa i jak długo to zostaje.

6. Bot ustala powód rozmowy, żeby skierować ją do właściwej osoby i zapisać właściwy termin. Zakres tego, co z rozmowy zostaje zapisane, ustalasz Ty przy wdrożeniu, razem z czasem przechowywania.

7. Prawo do człowieka działa zawsze. W godzinach pracy bot przełącza od razu, bez pętli pytań kontrolnych. Poza godzinami spisuje sprawę i kontakt, a Twój zespół oddzwania rano jako pierwszy.

8. Rejestr czynności przetwarzania i klauzula informacyjna to Twoje dokumenty. My mówimy Ci, co bot zbiera, gdzie to leci i jak długo jest trzymane, żeby było z czego je uzupełnić.

9. Model językowy, który prowadzi rozmowę, pochodzi od Anthropic. Mówimy to wprost, bo klient z branży regulowanej i tak zapyta, czyj to model.

To nie jest porada prawna. W medycynie, prawie i finansach pokaż konfigurację swojemu inspektorowi ochrony danych, zanim bot odbierze pierwszy telefon.

- **Źródło liczb:** zero liczb w tej sekcji, więc nie ma czego weryfikować cenowo. Dane w UE, umowa powierzenia, decyzja klienta o zakresie nagrywania i przechowywania: istniejące, zatwierdzone FAQ strony („Czy moje rozmowy i dane będą bezpieczne?" oraz „Czy klient pozna, że rozmawia z botem?"). Dostawca modelu Anthropic: sprawdzone w kodzie 2026-08-31, decyzja właściciela. **Celowo nie ma tu ani jednej daty wejścia przepisu, numeru artykułu ani kwoty kary**, bo tych danych nikt u nas nie zweryfikował u źródła, a na stronie usługowej stan prawny musi być pewny. Punkt 6 został przepisany tak, żeby nie kłócił się z obietnicą notatki z rozmowy w pozostałych sekcjach.

---

### 6. Co to znaczy minuta rozmowy przy voicebocie?

- **Gdzie wstawić:** bezpośrednio po sekcji `ramaCeny`
- **Po co:** najpoważniejsza luka wobec całego rynku. Konkurencja rozlicza się w minutach, klient porównuje oferty po złotówce za minutę, a u nas słowo „minuta" nie pada ani razu, więc klient zakłada ukryty koszt. Frazy: „voicebot cena za minutę", „ile kosztuje minuta voicebota". Mają to syntalith.ai i smart-asystenci.pl.
- **Typ:** akapity plus lista pytań kontrolnych
- **NAGŁÓWEK CELOWO INNY niż w `ramaCeny`:** strona ma już blok „Za co dokładnie płacę przy voicebocie?" i FAQ o tej samej nazwie. Ta sekcja nie powtarza trzech pozycji kosztu, tylko rozwija jedną z nich.
- **TREŚĆ:**

Trzecia pozycja na Twoim rachunku to zużycie: minuty rozmów i tokeny modelu. Nie idzie przez naszą fakturę, tylko prosto do dostawcy telefonii i dostawcy modelu.

To zmienia całą rozmowę o cenie. Nie zarabiamy na tym, że Twoi klienci długo rozmawiają, więc nie mamy powodu, żeby bot mówił dłużej, niż trzeba.

Skracanie rozmowy jest w Twoim i w naszym interesie. Przy ofercie z jednym abonamentem miesięcznym zużycie też płacisz, tylko nie widzisz, ile go było.

Problem w tym, że słowo „minuta" znaczy u każdego dostawcy co innego. Zanim porównasz dwie oferty, zadaj pięć pytań:

1. Od której sekundy leci licznik. Od zestawienia połączenia czy od pierwszego zdania rozmówcy. Różnica potrafi wynieść kilkanaście sekund na każdym telefonie.

2. Czy cisza kosztuje. Rozmówca szuka numeru albo terminarza, a licznik biegnie dalej. To normalne, ale musisz o tym wiedzieć.

3. Kto płaci za przekierowanie do człowieka. W wielu cennikach minuta biegnie dalej po przełączeniu, aż do rozłączenia.

4. Jak dostawca zaokrągla. Do sekundy, do pełnych sześćdziesięciu sekund, czy do zaczętej minuty. Przy krótkich rozmowach zaokrąglanie w górę podnosi rachunek najmocniej.

5. Czy niewykorzystany pakiet przepada. Jeśli tak, płacisz za sezonowość, której nie kontrolujesz.

Odpowiedzi na te pięć pytań chcesz mieć na piśmie, od każdego dostawcy, którego rozważasz. Nas też o nie zapytaj.

- **Źródło liczb:** zero kwot w tej sekcji, celowo. Trzy osobne pozycje kosztu i zużycie po stronie klienta: konspekt firmy, cennik zatwierdzony przez właściciela, zgodne z `ramaCeny` istniejącej strony. **Nie ma tu ani jednej stawki konkurencji za minutę**, bo zasada 2 pozwala je podać dopiero po samodzielnym zobaczeniu cennika na żywo, z nazwą domeny i datą. Zadanie weryfikacyjne przeniesione do uwag wdrożeniowych, żeby nazwy konkurentów nie trafiły do treści.

---

### 7. Na co uważać w ofercie na voicebota?

- **Gdzie wstawić:** po nowej sekcji 6
- **Po co:** fraza „ukryte koszty voicebota" plus treść, która buduje zaufanie i świetnie się cytuje w odpowiedziach AI. Smart-asystenci.pl mają blok „Koszty ukryte", syntalith.ai aż trzy takie bloki.
- **Typ:** lista numerowana
- **TREŚĆ:**

Oferty na voicebota wyglądają podobnie, dopóki nie zaczniesz pytać o szczegóły. Różnice siedzą w miejscach, o których nikt nie mówi przy pierwszej rozmowie.

Nie chodzi o to, że ktoś oszukuje. Chodzi o to, że model rozliczenia bywa tak zbudowany, że koszt rośnie razem z sukcesem wdrożenia.

Dziesięć rzeczy, o które warto zapytać, zanim podpiszesz:

1. Od której sekundy liczy się minuta. Od zestawienia połączenia czy od pierwszego zdania. Przy kilkuset telefonach miesięcznie ta różnica jest widoczna na fakturze.

2. Co się dzieje z niewykorzystanym pakietem minut. Jeśli przepada na koniec miesiąca, płacisz za sezonowość, której nie kontrolujesz.

3. Ile kosztuje minuta powyżej pakietu. Nadwyżka bywa droższa od stawki podstawowej, a rozliczasz ją dokładnie w miesiącu, w którym idzie Ci najlepiej.

4. Czy każda kolejna integracja jest płatna. Podpięcie kalendarza w cenie, a podpięcie CRM trzy miesiące później za osobną fakturę to częsty układ.

5. Netto czy brutto. Kwota z nagłówka strony bywa netto, a kwota z kalkulatora brutto. Porównuj tylko netto z netto.

6. Czyj jest numer telefonu. Jeśli numer należy do dostawcy, przy zmianie firmy zostawiasz go razem z całym ruchem, który przez lata na niego kierowałeś.

7. Czyj jest scenariusz rozmowy. To Twoja wiedza o firmie spisana w formie instrukcji. Powinna zostać u Ciebie także wtedy, gdy się rozstajecie.

8. Czyje są nagrania i transkrypcje po zakończeniu umowy. Zapytaj, w jakim formacie je dostaniesz i jak długo dostawca trzyma kopię.

9. Czy da się wyjść z abonamentu. U nas są dwie drogi: infrastruktura zostaje u nas i płacisz utrzymanie, albo przekazujemy ją Tobie i płacisz nam 0 zł miesięcznie. U większości firm ta druga droga po prostu nie istnieje.

10. Kto płaci za poprawki po odbiorze. U nas dwie rundy są w cenie wdrożenia, a późniejsze zmiany przy infrastrukturze u Ciebie kosztują 350 zł netto za godzinę i widzisz wycenę przed rozpoczęciem pracy.

Jeśli dostawca odpowiada na te dziesięć pytań na piśmie, jest w porządku, niezależnie od tego, czy wybierzesz jego czy nas.

- **Źródło liczb:** 350 zł netto za godzinę poprawek, dwie rundy poprawek w cenie wdrożenia, model 0 zł przy przekazaniu infrastruktury: konspekt firmy i decyzja właściciela z 2026-08-31 (model rozszerzony na wszystkie usługi). Punkt 1 mówi „przy kilkuset telefonach miesięcznie" **bez konkretnej liczby**, bo poprzednia wersja podawała 200 telefonów bez pokrycia. Pozostałe punkty to opisy mechanizmów rozliczeniowych bez kwot, bez nazywania konkurentów i bez cytatów.

---

### 8. Kiedy voicebota lepiej nie kupować?

- **Gdzie wstawić:** po nowej sekcji 7, przed sekcją `powiazane`
- **Po co:** dyskwalifikacja podnosi zaufanie i odsiewa złe leady, a przy okazji łapie zapytania „czy voicebot ma sens" i „voicebot wady". Sekretarkaai.pl ma wprost blok „Dla kogo NIE jest sekretarka AI".
- **Typ:** karty (kafle), sześć sztuk, każda z alternatywą
- **TREŚĆ:**

Voicebot nie jest odpowiedzią na każdy problem z telefonem. W kilku sytuacjach odradzamy go wprost, nawet jeśli klient chce podpisać od ręki.

Szybciej sprzedamy Ci coś tańszego, co zadziała, niż coś droższego, co po trzech miesiącach wyłączysz.

**KARTA 1: Dostajesz kilka telefonów dziennie**
Przy takim ruchu przekierowanie na komórkę plus chatbot na stronie załatwia sprawę taniej i szybciej.
Zamiast tego: chatbot prosty z bazą wiedzy i zbieraniem leadów, 1790 zł netto, 1 do 2 dni roboczych.

**KARTA 2: Twoje rozmowy to głównie negocjacje albo emocje**
Reklamacja, spór o fakturę, pacjent w stresie. Bot to zepsuje, bo nie ma wyczucia.
Zamiast tego: bot odbiera, ustala temat w kilkanaście sekund i przekazuje sprawę człowiekowi razem z notatką.

**KARTA 3: Nie masz systemu, do którego bot miałby cokolwiek zapisać**
Kalendarz w zeszycie i terminy w głowie recepcji oznaczają, że integracja nie ma się o co zaczepić.
Zamiast tego: najpierw uporządkuj kalendarz, potem voicebot prosty za 2500 zł netto.

**KARTA 4: Pracujesz na danych wrażliwych i nie możesz nagrywać**
Da się zbudować bota bez nagrywania, ale tracisz połowę wartości, bo nie ma z czego go poprawiać.
Zamiast tego: Sprint Diagnostyczny za 1490 zł netto, który rozstrzygnie, ile zostaje po odjęciu tego, czego nagrywać nie wolno.

**KARTA 5: Twoje procesy zmieniają się co tydzień**
Bot to spisana instrukcja. Jeśli instrukcja zmienia się w każdy poniedziałek, płacisz głównie za jej przepisywanie.
Zamiast tego: AI Start za 1990 zł netto, czyli jedna automatyzacja na próbę w procesie wewnątrz firmy. Chatbot za 1790 zł obsługuje Twoich klientów, AI Start porządkuje robotę u Ciebie w środku.

**KARTA 6: Chcesz botem zasłonić brak ludzi w całej firmie**
Voicebot odbiera telefon. Nie sprzeda za handlowca, nie zdiagnozuje za lekarza i nie napisze pisma za prawnika.
Zamiast tego: rozmowa o tym, który konkretny proces zjada najwięcej godzin. Czasem odpowiedzią są leady B2B od 169 zł netto za tysiąc rekordów, a nie bot.

Jeśli po tej liście dalej uważasz, że to Twój przypadek, to prawdopodobnie faktycznie jest.

- **Źródło liczb:** chatbot prosty 1790 zł netto i 1 do 2 dni roboczych, voicebot prosty 2500 zł netto, Sprint Diagnostyczny 1490 zł netto, AI Start 1990 zł netto, leady B2B 1000 rekordów za 169 zł netto: konspekt firmy, cennik zatwierdzony przez właściciela. Zdanie rozróżniające AI Start od chatbota stoi w karcie 5, zgodnie z wymogiem, żeby obie kwoty zawsze miały jednozdaniowe rozróżnienie.

---

### 9. Pokażcie coś, co naprawdę działa

- **Gdzie wstawić:** po nowej sekcji 8, przed sekcją `powiazane`
- **Po co:** strona nie ma dziś ani jednego wdrożenia, opinii ani logo, a malinski.ai ma blok „Voicebot AI w akcji" z trzema realizacjami. Bez dowodu cena wygląda na wziętą z sufitu.
- **Typ:** case study, dwa jawnie rozdzielone bloki
- **TREŚĆ:**

Rozdzielamy to uczciwie na dwie części, bo mieszanie ich byłoby ściemą. Osobno boty, które rozmawiają, osobno automatyzacje, przy których możemy podać liczby i nazwy klientów.

**CZĘŚĆ PIERWSZA: BOTY, KTÓRE ROZMAWIAJĄ**

Bot na simplefast.ai. Tego możesz przetestować teraz, bez umawiania się z nami. Jest tekstowy, ale odpowiada z tej samej bazy wiedzy, którą podpinamy do voicebotów.

Agent głosowy z wiedzą o firmie. Mamy go w portfolio zbudowanego: odpowiada głosem na pytania o firmę, korzystając z jej własnych dokumentów i procedur.

Desant.pl, chatbot na stronie. Obsługuje 30 do 50 klientów miesięcznie i 200 do 280 wiadomości, czyli cały ruch, który wcześniej szedł na skrzynkę.

Uczciwie: telefonicznych wdrożeń z nazwą klienta jeszcze nie publikujemy. Kiedy dostaniemy zgody, nazwy i nagrania wylądują tutaj, a nie w opisie słownym.

**CZĘŚĆ DRUGA: AUTOMATYZACJE Z LICZBAMI I ZGODĄ KLIENTÓW**

To nie są wdrożenia głosowe i tak ich nie podpisujemy. Pokazujemy je, bo mówią, jak pracujemy i czy dowozimy mierzalny efekt.

Instytut Kryptografii, obsługa poczty do klientów. Osiemdziesiąt procent draftów jest gotowych do wysłania bez poprawek, przy 580 mailach tygodniowo w szczycie. Człowiek zatwierdza każdy mail przed wysyłką.

Onyx, aplikacja księgowa. Około 120 faktur miesięcznie, wcześniej po 3 do 5 minut na każdą, teraz wystarczy zdjęcie faktury i codzienny raport finansów.

Y-Ads, zarządzanie przepływem pracy. Dwanaście osób w zespole, 8 do 13 klientów równolegle, czas operacyjny menedżera spadł z 4 godzin do 30 minut dziennie.

KNF Team, raporty sprzedażowe. Dwunastu handlowców i trzech menedżerów, w skali zespołu około 8 godzin tygodniowo mniej pracy ręcznej.

Te wdrożenia łączy z voicebotem jedno: rutynę robi maszyna, a człowiek dostaje z powrotem godziny na to, czego maszyna nie zrobi.

- **Źródło liczb:** wszystko z konspektu firmy, sekcja realizacje ze zgodami na publikację z nazwą. Instytut Kryptografii: 80 procent draftów **gotowych do wysłania** bez poprawek, 580 maili tygodniowo w szczycie, plus zdanie o człowieku w pętli (decyzja właściciela z 2026-08-31, zakaz sugerowania, że automat wysyła sam). Onyx: około 120 faktur miesięcznie, 3 do 5 minut ręcznie, zdjęcie faktury, codzienny raport. **Zakaz zachowany: ani słowa o płaceniu faktur przez API banku.** Y-Ads: 12 osób, 8 do 13 klientów, z 4 godzin do 30 minut. KNF Team: 12 handlowców, 3 menedżerów, około 8 godzin tygodniowo, bez rozpisywania się szerzej. Desant.pl: 30 do 50 klientów miesięcznie, 200 do 280 wiadomości. Agent głosowy z wiedzą o firmie: opisany bezosobowo „mamy w portfolio zbudowanego". Bot na simplefast.ai: wyjątek publikacyjny, działanie zweryfikowane 2026-08-31.

---

### 10. W jakiej branży to się sprawdza?

- **Gdzie wstawić:** bezpośrednio przed sekcją `powiazane`
- **Po co:** przelewa moc głównej strony na nowe podstrony branżowe i zbiera długi ogon. Assistron.pl ma 6 branż, syntalith.ai minimum 8 stron branżowych.
- **Typ:** karty z linkami
- **TREŚĆ:**

Telefon dzwoni wszędzie tak samo, ale traci się przez niego zupełnie różne rzeczy. Dlatego scenariusz rozmowy piszemy pod branżę, a nie pod ogólną obsługę klienta.

**KARTA 1: Przychodnia**
O 8:00 dzwoni pół miasta, linie zajęte, a pacjent po trzecim sygnale wybiera numer placówki obok. Bot odbiera te telefony, zapisuje, przekłada i odwołuje wizyty.
Link: Voicebot dla przychodni

**KARTA 2: Gabinet stomatologiczny**
Rejestratorka stoi przy fotelu i nie może odebrać. Odwołanie w ostatniej chwili zostawia pusty fotel, a pusty fotel kosztuje więcej niż nieodebrany telefon.
Link: Voicebot dla gabinetu stomatologicznego

**KARTA 3: Salon i serwis samochodowy**
Telefon dzwoni, gdy mechanik ma ręce w silniku. Bot zapisuje na przegląd, odpowiada na pytanie o status naprawy i spisuje sprawę, gdy nikt nie może podejść.
W motoryzacji pracowaliśmy już przy Lenart Motors, choć tam zbudowaliśmy stronę WWW pod widoczność w ChatGPT, nie voicebota.
Link: Voicebot dla salonu i serwisu samochodowego

**KARTA 4: Kancelaria prawna**
Jedna sprawa jest warta tyle, że nieodebrany telefon boli podwójnie. Bot przyjmuje zgłoszenie, wstępnie kwalifikuje sprawę i nie dotyka niczego objętego tajemnicą zawodową.
Link: Voicebot dla kancelarii prawnej

**KARTA 5: Twojej branży tu nie ma**
Budujemy też poza tymi czterema. Jeśli Twoi klienci dzwonią i słyszą sygnał zajętości, mechanizm jest ten sam, zmienia się tylko treść rozmowy.
Zacznij od Sprintu Diagnostycznego za 1490 zł netto, który odliczamy od faktury za wdrożenie.

- **Źródło liczb:** Sprint Diagnostyczny 1490 zł netto odliczany od wdrożenia: konspekt firmy. Lenart Motors jako **strona WWW pod widoczność w ChatGPT, a nie voicebot**: konspekt firmy, sekcja realizacje, zaznaczone wprost, żeby nie sugerować wdrożenia głosowego. Karta 3 nie obiecuje oddzwaniania do zapytań z portali, bo nasze boty nie wykonują połączeń wychodzących. Zero liczb branżowych i zero statystyk.

---

### 11. A co, jeśli bot się pomyli albo klient go nie zniesie?

- **Gdzie wstawić:** jako DRUGI blok pytań pod istniejącą sekcją `faq`, przed `cta`
- **Po co:** domknięcie sprzedaży tuż przed przyciskiem, innymi pytaniami niż istniejące FAQ (tamte zostają nietknięte). Callio ma wprost „Co jeśli bot poda złą informację".
- **Typ:** FAQ (6 pytań, do FAQPage JSON-LD razem z istniejącymi)
- **TREŚĆ:**

**PYTANIE: Co, jeśli bot poda złą informację?**
Bot odpowiada tylko z bazy wiedzy, którą sam zatwierdzasz, a nie z ogólnej wiedzy modelu o świecie. Na pytanie spoza tej bazy mówi, że nie wie, i przekazuje sprawę dalej. Każdą rozmowę widzisz w transkrypcji, więc błąd znajdujesz tego samego dnia i poprawiasz w scenariuszu. Dwie rundy takich poprawek są w cenie wdrożenia.

**PYTANIE: A jeśli dzwoniący nie chce rozmawiać z maszyną?**
Przełączamy do człowieka na pierwsze wyraźne żądanie, bez pętli i bez trzech pytań kontrolnych. Poza godzinami pracy bot spisuje temat i kontakt, więc rano Twój zespół dzwoni z konkretem, a nie w ciemno.

**PYTANIE: Czy zrozumie trudne nazwisko, gwarę albo obcy akcent?**
Z nazwiskami radzi sobie gorzej niż z terminami. Dlatego przy zapisie na wizytę prosi o przeliterowanie i powtarza to, co usłyszał, do potwierdzenia. Jeśli rozmówca mówi w innym języku, przełącza się na ten język albo przekazuje rozmowę człowiekowi, w zależności od tego, co ustalimy przy wdrożeniu.

**PYTANIE: Co się dzieje, gdy padnie internet albo dostawca?**
Ruch wraca na Twój dotychczasowy numer, czyli do stanu sprzed wdrożenia. Nie zostajesz z martwą linią, zostajesz z telefonem, który dzwoni jak dawniej. Przy wariancie z infrastrukturą u nas awarie widzimy w monitoringu, zanim zdążysz je zgłosić.

**PYTANIE: Czyj jest numer, scenariusz i nagrania po zakończeniu współpracy?**
Twoje. Numer zostaje u Ciebie, scenariusz rozmowy dostajesz w całości, nagrania i transkrypcje też, bo to Ty jesteś administratorem tych danych. Przy wariancie z infrastrukturą po Twojej stronie nic nie trzeba przenosić, bo wszystko od początku stoi na Twoim koncie.

**PYTANIE: Co, jeśli po miesiącu stwierdzę, że to nie dla mnie?**
Masz dwie drogi wyjścia. Albo kończysz utrzymanie i przejmujesz infrastrukturę do siebie, wtedy płacisz nam 0 zł miesięcznie, a poprawki zamawiasz po 350 zł netto za godzinę. Albo bot zostaje wyłączony i telefon wraca do poprzedniego ustawienia. Jeśli chcesz sprawdzić sens wdrożenia przed wydaniem pełnej kwoty, zacznij od Sprintu Diagnostycznego za 1490 zł netto, który odliczamy od wdrożenia.

- **Źródło liczb:** dwie rundy poprawek w cenie wdrożenia, 0 zł przy przejęciu infrastruktury, 350 zł netto za godzinę, Sprint Diagnostyczny 1490 zł netto odliczany od wdrożenia: konspekt firmy i decyzja właściciela z 2026-08-31. **Nigdzie nie ma obietnicy bezpłatnego testu ani gwarancji zwrotu pieniędzy**, bo tego nie ma w zatwierdzonym cenniku. Ostatnia odpowiedź nie mówi o długości wypowiedzenia umowy, tylko o dwóch drogach z cennika, więc nie dotyka warunków, których nie znamy.

---

## Nowe podstrony

Rejestr: `lib/uslugi/podstrony/index.ts`. Dla każdej podstrony jeden import plus jeden wpis do tablicy `PODSTRONY`, z `rodzic: 'voiceboty'`. Trasa SSG i mapa witryny biorą się z rejestru automatycznie.

---

### PODSTRONA 1 (priorytet najwyższy): /uslugi/voiceboty/cennik

- **H1:** Ile kosztuje voicebot w Polsce w 2026 roku
- **metaTitle:** `Ile kosztuje voicebot? Cennik 2026` (33 znaki)
- **Fraza główna:** ile kosztuje voicebot
- **Rozdział intencji:** główna strona `/uslugi/voiceboty` odpowiada „co to jest i czy to dla mnie". Ta strona odpowiada wyłącznie „ile to kosztuje i za co dokładnie płacę". Podstrony funkcyjne (windykacja, potwierdzanie wizyt, odbieranie telefonów) i branżowe podają tylko widełki i linkują tutaj po pełną cenę. Żadna inna strona nie rozwija tematu minut ani kosztu pierwszego roku.
- **Sekcje:**
  1. Krótka odpowiedź na górze: trzy pozycje na fakturze i widełki
  2. Za co płacisz: stworzenie, utrzymanie, zużycie
  3. Co to znaczy minuta rozmowy i kto ją liczy
  4. Pełna tabela progów z czasem realizacji i kosztem pierwszego roku
  5. Kalkulator: voicebot a dodatkowa osoba (ten sam co sekcja 4 na stronie głównej)
  6. Koszty ukryte i sygnały ostrzegawcze w ofertach
  7. Kiedy voicebota lepiej nie kupować
  8. FAQ o cenie
  9. CTA: Sprint Diagnostyczny 1490 zł netto, odliczany od wdrożenia

**KAPSUŁA (gotowa do wklejenia, blok krótkiej odpowiedzi pod H1):**

Voicebot ma trzy osobne koszty, a nie jeden abonament. Stworzenie: 2500 zł netto za bota prostego albo 5000 do 9000 zł netto za bota z integracjami, płatne raz. Utrzymanie: 299 do 1500 zł netto miesięcznie, gdy infrastruktura zostaje u nas, albo 0 zł, gdy przekazujemy ją Tobie i płacisz tylko za poprawki po 350 zł netto za godzinę. Zużycie: minuty rozmów i tokeny modelu według realnego użycia, prosto do dostawców, poza naszą fakturą. Bot prosty powstaje w 3 do 5 dni roboczych, bot z integracjami w 5 do 25 dni roboczych, licząc od przekazania kompletu materiałów. Dwie rundy poprawek są w cenie wdrożenia.

**TABELA PROGÓW (sekcja 4, gotowa do wklejenia):**

| Co kupujesz | Co dostajesz | Cena netto | Czas realizacji | Koszt pierwszego roku |
|---|---|---|---|---|
| Sprint Diagnostyczny | Pięć dni analizy, raport PDF z mapą procesów i rekomendacją, czy voicebot ma tu sens | 1490 zł | 5 dni roboczych | Odliczamy te 1490 zł od faktury za wdrożenie |
| Voicebot prosty | Baza wiedzy o firmie, odpowiedzi na pytania, kierowanie rozmowy do właściwej osoby | 2500 zł | 3 do 5 dni roboczych | 6088 zł przy utrzymaniu 299 zł, 20 500 zł przy utrzymaniu 1500 zł, 2500 zł przy infrastrukturze u Ciebie |
| Voicebot z integracjami | To samo plus kalendarz i zapis terminu w Twoim systemie | 5000 do 9000 zł | 5 do 25 dni roboczych | 8588 zł przy dolnym progu i utrzymaniu 299 zł, 27 000 zł przy górnym progu i utrzymaniu 1500 zł, 5000 do 9000 zł przy infrastrukturze u Ciebie |
| Utrzymanie | Serwery, monitoring, drobne poprawki | 299 do 1500 zł miesięcznie przy infrastrukturze u nas, 0 zł przy infrastrukturze u Ciebie | Od dnia odbioru | Zawarte w kwotach obok |
| Poprawki po odbiorze | Zmiany spoza pierwszej rozmowy, przy wariancie z infrastrukturą u Ciebie | 350 zł za godzinę | Wycena przed rozpoczęciem pracy | Zależny od Twojego zużycia |

Kolumna kosztu pierwszego roku to zwykła arytmetyka: cena budowy plus dwanaście miesięcy utrzymania. Widzisz całe działanie: 2500 plus 12 razy 299 to 6088 zł, 2500 plus 12 razy 1500 to 20 500 zł, 5000 plus 12 razy 299 to 8588 zł, 9000 plus 12 razy 1500 to 27 000 zł.

Do każdej z tych kwot dochodzą minuty i tokeny, które płacisz bezpośrednio dostawcom. Nie doliczamy do nich marży, więc nie zarabiamy na tym, że Twoi klienci długo rozmawiają.

W cenie wdrożenia są dwie rundy poprawek. Tydzień testujesz i zgłaszasz uwagi, my poprawiamy, drugi tydzień testujesz ponownie, poprawiamy i dopiero wtedy odbierasz.

Nowe funkcje, o których nie było mowy w pierwszej rozmowie, wyceniamy osobno. Nie chowamy ich w utrzymaniu, żeby rachunek nagle nie urósł w trzecim miesiącu.

**FAQ (sekcja 8, gotowe, pięć pytań):**

**Czy podane ceny są netto czy brutto?**
Netto. Każda kwota na tej stronie jest netto, do faktury dochodzi VAT. Podajemy netto, bo z takich kwot korzystają firmy przy porównywaniu ofert.

**Czy muszę płacić abonament co miesiąc?**
Nie musisz. Masz dwie drogi. Infrastruktura zostaje u nas, my ją trzymamy i pilnujemy, a Ty płacisz 299 do 1500 zł netto miesięcznie. Albo przekazujemy Ci całą infrastrukturę, utrzymujesz ją sam i płacisz nam 0 zł miesięcznie, a poprawki zamawiasz po 350 zł netto za godzinę.

**Od czego zależy, czy zapłacę 5000 czy 9000 zł za bota z integracjami?**
Od liczby systemów, które trzeba połączyć, i od tego, jak trudno się do nich dostać. Jeden kalendarz to dolny próg. Kalendarz plus system gabinetowy plus CRM z własnym API to górny.

**Co dokładnie kosztuje przy zużyciu?**
Minuty rozmów u dostawcy telefonii i tokeny modelu językowego. Płacisz je bezpośrednio dostawcom, według swojego realnego użycia, poza naszą fakturą.

**Czy Sprint Diagnostyczny naprawdę odliczacie od wdrożenia?**
Tak. Jeśli po Sprincie decydujesz się na wdrożenie, odejmujemy te 1490 zł netto od faktury za budowę bota. Jeśli się nie decydujesz, zostaje Ci raport PDF z mapą procesów i to jest całe rozliczenie.

- **Źródło liczb:** cały cennik z konspektu firmy zatwierdzonego przez właściciela. Czasy realizacji 3 do 5 i 5 do 25 dni roboczych: `lib/uslugi/voiceboty.ts`, decyzja właściciela z 2026-08-20, liczone od przekazania kompletu materiałów. To zamyka wcześniejszy brak danej o terminach voicebotów. Cztery działania arytmetyczne pokazane w treści. Wariant „0 zł przy infrastrukturze u Ciebie" występuje w OBU wierszach botów, symetrycznie.

---

### PODSTRONA 2: /uslugi/voiceboty/dla-przychodni

- **H1:** Voicebot dla przychodni, który zawsze odbiera telefon
- **metaTitle:** `Voicebot dla przychodni: rejestracja` (35 znaków)
- **Fraza główna:** voicebot dla przychodni
- **Rozdział intencji:** różni się od `/uslugi/voiceboty/potwierdzanie-wizyt`, która opisuje jedną funkcję w dowolnej branży. Tutaj chodzi o całą rejestrację jednej branży: przyjmowanie zapisów, odwołania, integracja z systemem gabinetowym, dane medyczne. Różni się od `/dla-stomatologa` tym, że opisuje placówkę z wieloma lekarzami i grafikami (POZ, specjalistyka), a nie jeden fotel. Link w górę do `/uslugi/voiceboty`, w bok do potwierdzania wizyt i do cennika.
- **Sekcje:**
  1. Dlaczego rejestracja telefoniczna jest wąskim gardłem przychodni
  2. Co bot robi w przychodni krok po kroku
  3. Integracja z systemem gabinetowym i grafikiem lekarzy
  4. Dane medyczne i zgoda na nagrywanie (skrót, link do `/uslugi/voiceboty/rodo-ai-act`)
  5. Jak wdrażamy w placówce, etap po etapie
  6. Dla jakich placówek to działa, a dla jakich nie
  7. Ile kosztuje (widełki plus link do cennika)
  8. Powiązane: potwierdzanie wizyt, odbieranie telefonów
  9. FAQ rejestracji
  10. CTA: bezpłatna diagnoza

**KAPSUŁA (gotowa):**

Voicebot dla przychodni odbiera telefon 24/7, zapisuje pacjenta na wolny termin, przekłada i odwołuje wizyty, a sprawy trudne przekazuje rejestracji z notatką z rozmowy. Mówi w pierwszym zdaniu, że jest asystentem AI. Odbiera kilka połączeń naraz, tyle ile linii masz u dostawcy telefonii, więc kolejka o 8:00 przestaje odsyłać pacjentów do placówki obok. Nie dzwoni sam do pacjentów, obsługuje wyłącznie połączenia przychodzące. Stworzenie: 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do systemu gabinetowego. Utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł, gdy infrastruktura przechodzi do placówki.

**FAQ (gotowe, cztery pytania):**

**Czy bot połączy się z naszym systemem gabinetowym?**
Sprawdzamy to na diagnozie, przed wyceną. Jeśli system ma API albo eksport grafiku, bot widzi wolne terminy i zapisuje wizytę od razu. Jeśli nie ma, bot spisuje zgłoszenie, a rejestracja wpisuje je ręcznie. Tak czy inaczej nie tracicie pacjenta.

**Co z pacjentem, który dzwoni w sprawie wyników albo objawów?**
Bot nie rozmawia o zdrowiu. Ustala, że sprawa dotyczy wyników, i przekazuje ją rejestracji albo umawia termin. Zakres tego, co z rozmowy zostaje zapisane, ustala placówka przy wdrożeniu.

**Czy pacjent obcojęzyczny się dogada?**
Bot przechodzi na inny język albo przekazuje rozmowę człowiekowi, w zależności od tego, co ustalimy przy wdrożeniu. Decyzja należy do placówki, bo to Wy wiecie, kto do Was dzwoni.

**Co, gdy padnie internet w przychodni?**
Ruch wraca na dotychczasowy numer rejestracji, czyli do stanu sprzed wdrożenia. Telefon dzwoni jak dawniej, nikt nie zostaje z martwą linią.

---

### PODSTRONA 3: /uslugi/voiceboty/dla-stomatologa

- **H1:** Voicebot dla gabinetu stomatologicznego
- **metaTitle:** `Voicebot dla dentysty i gabinetu` (32 znaki)
- **Fraza główna:** voicebot dla dentysty
- **Rozdział intencji:** wobec `/dla-przychodni`: tam wiele grafików i system placówki, tu jeden lub dwa fotele, odwołania, przesuwanie terminów i zapisywanie całej serii wizyt. Wobec `/potwierdzanie-wizyt`: tam sama funkcja w dowolnej branży, tu pełna obsługa telefonu gabinetu. Ceny nie rozwijamy, link do `/uslugi/voiceboty/cennik`.
- **Sekcje:**
  1. Pusty fotel kosztuje więcej niż nieodebrany telefon
  2. Co bot załatwia za rejestrację gabinetu
  3. Zapis całej serii wizyt i przesuwanie terminów
  4. Zwolniony termin: bot przyjmuje zgłoszenie od kolejnego pacjenta, który dzwoni
  5. Prywatność pacjenta: co zostaje zapisane, a co nie
  6. Wdrożenie w gabinecie, krok po kroku
  7. Ile to kosztuje (widełki plus link do cennika)
  8. Powiązane: przychodnia, potwierdzanie wizyt
  9. FAQ gabinetu
  10. CTA

**KAPSUŁA (gotowa):**

Voicebot dla gabinetu stomatologicznego odbiera telefon, gdy rejestratorka stoi przy fotelu. Zapisuje pacjenta, przesuwa termin, przyjmuje odwołanie i spisuje całą serię wizyt, jeśli leczenie idzie etapami. Mówi w pierwszym zdaniu, że jest asystentem AI, i nie pyta o powód wizyty poza tym, co ustalisz w scenariuszu. Nie dzwoni sam do pacjentów, obsługuje wyłącznie połączenia przychodzące. Stworzenie: 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do kalendarza gabinetu. Bot prosty powstaje w 3 do 5 dni roboczych.

---

### PODSTRONA 4: /uslugi/voiceboty/dla-salonu-samochodowego

- **H1:** Voicebot dla salonu i serwisu samochodowego
- **metaTitle:** `Voicebot dla salonu samochodowego` (33 znaki)
- **Fraza główna:** voicebot dla salonu samochodowego
- **Rozdział intencji:** wobec `/odbieranie-telefonow`: tam ogólna funkcja odbierania w dowolnej firmie, tu konkretne scenariusze warsztatu i salonu (zapis na przegląd, status naprawy, dostępność modelu). Wobec cennika: zero rozwijania cen, tylko widełki i link.
- **Sekcje:**
  1. Telefon dzwoni, gdy mechanik ma ręce w silniku
  2. Co bot obsługuje w serwisie i w salonie
  3. Zapis na przegląd i naprawę w kalendarzu warsztatu
  4. Pytania o status naprawy i o dostępność modelu
  5. Wdrożenie w serwisie, krok po kroku
  6. Ile to kosztuje (widełki plus link do cennika)
  7. Powiązane: odbieranie telefonów, cennik
  8. FAQ serwisu
  9. CTA

**KAPSUŁA (gotowa):**

Voicebot dla salonu i serwisu samochodowego odbiera telefon, gdy nikt nie może podejść. Zapisuje na przegląd i na naprawę, odpowiada na pytanie o status zlecenia i o dostępność modelu, a sprawy trudne przekazuje doradcy z notatką z rozmowy. Nie dzwoni sam do klientów, obsługuje wyłącznie połączenia przychodzące. Stworzenie: 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do kalendarza warsztatu. Utrzymanie 299 do 1500 zł netto miesięcznie albo 0 zł, gdy infrastruktura przechodzi do Ciebie.

**Uwaga do treści:** w sekcji o motoryzacji można napisać, że pracowaliśmy przy Lenart Motors, ale WYŁĄCZNIE jako strona WWW pod widoczność w ChatGPT, nigdy jako voicebot.

---

### PODSTRONA 5: /uslugi/voiceboty/dla-kancelarii

- **H1:** Voicebot dla kancelarii prawnej
- **metaTitle:** `Voicebot dla kancelarii prawnej` (31 znaków)
- **Fraza główna:** voicebot dla kancelarii prawnej
- **Rozdział intencji:** wobec `/windykacja`: tam telefony przychodzące w sprawie zaległych płatności, tu przychodzące pytania od potencjalnych klientów i wstępna kwalifikacja sprawy. Wobec `/rodo-ai-act`: tam pełny blok o danych i o informowaniu rozmówcy, tu tylko sekcja o tajemnicy zawodowej z linkiem do całości.
- **Sekcje:**
  1. Kancelaria traci sprawę, gdy nikt nie odbiera przy pierwszym telefonie
  2. Co bot może zrobić, a czego w kancelarii robić nie powinien
  3. Wstępna kwalifikacja sprawy i umówienie konsultacji
  4. Tajemnica zawodowa: co bot zapisuje, a czego nie dotyka
  5. Wdrożenie w kancelarii, krok po kroku
  6. Ile to kosztuje (widełki plus link do cennika)
  7. Powiązane: windykacja, RODO i AI Act
  8. FAQ kancelarii
  9. CTA

**KAPSUŁA (gotowa):**

Voicebot dla kancelarii prawnej odbiera telefon od osoby, która dzwoni pierwszy raz, i nie pozwala jej odejść do kancelarii obok. Spisuje zgłoszenie, wstępnie kwalifikuje sprawę według Twojego scenariusza i umawia konsultację w kalendarzu. Mówi w pierwszym zdaniu, że jest asystentem AI. Zakres tego, co z rozmowy zostaje zapisane, ustalasz Ty, i to samo dotyczy czasu przechowywania. Nie dzwoni sam do nikogo, obsługuje wyłącznie połączenia przychodzące. Stworzenie: 2500 zł netto za wersję prostą albo 5000 do 9000 zł netto z integracją do kalendarza.

---

### PODSTRONA 6: /uslugi/voiceboty/rodo-ai-act

- **H1:** Voicebot a RODO i AI Act: co musi być spełnione
- **metaTitle:** `Voicebot a RODO i AI Act` (24 znaki)
- **Fraza główna:** voicebot RODO AI Act
- **Rozdział intencji:** główna strona i podstrony branżowe mają tylko krótki blok bezpieczeństwa i link tutaj. Ta strona jest jedynym miejscem, gdzie rozwijamy zasady przetwarzania, retencję nagrań, umowę powierzenia i komunikat informacyjny na starcie rozmowy. Nie sprzedaje wdrożenia, tylko domyka zaufanie i przekazuje ruch do cennika i do diagnozy.
- **Sekcje:**
  1. Krótka odpowiedź: co musi zrobić firma, która włącza voicebota
  2. Obowiązek poinformowania, że rozmówca mówi z systemem AI
  3. Nagrywanie rozmów i zgoda: co ustalamy przed startem
  4. Dane wrażliwe: co bot zapisuje, a czego nie dotyka
  5. Gdzie są dane i co znaczy przetwarzanie w Unii Europejskiej
  6. Umowa powierzenia i retencja nagrań
  7. Jak my to ustawiamy w naszych wdrożeniach, punkt po punkcie
  8. FAQ prawne, z jawnym zastrzeżeniem, że to nie jest porada prawna
  9. CTA: bezpłatna diagnoza

**KAPSUŁA (gotowa):**

Voicebot jest legalny, jeśli rozmówca wie, że mówi z systemem AI, i jeśli wiadomo, kto odpowiada za nagranie rozmowy. Nasze boty przedstawiają się w pierwszym zdaniu i nigdy nie udają człowieka. Administratorem danych jesteś Ty, my działamy jako podmiot przetwarzający, na umowie powierzenia. Dane z rozmów zostają w Unii Europejskiej, a przy wariancie z infrastrukturą po Twojej stronie trafiają na Twoje konta u dostawców, nie na nasze. Zakres nagrywania i czas przechowywania ustawiasz Ty. Model językowy prowadzący rozmowę pochodzi od Anthropic. To nie jest porada prawna.

**TWARDA REGUŁA REDAKCYJNA DLA TEJ PODSTRONY:**
Na tej stronie **nie wolno postawić ani jednej daty wejścia przepisu, numeru artykułu ani kwoty kary**, dopóki ktoś u nas nie sprawdzi tego u źródła w EUR-Lex i nie zapisze daty sprawdzenia. Strona prawna z niesprawdzoną datą jest gorsza niż brak strony prawnej. Cała treść opisuje to, co realnie robimy w naszych wdrożeniach, i na tym stoi jej wiarygodność.

- **Źródło liczb:** zero liczb. Dane w UE, umowa powierzenia, decyzja klienta o zakresie nagrywania: zatwierdzone FAQ istniejącej strony `/uslugi/voiceboty`. Dostawca modelu Anthropic: sprawdzone w kodzie 2026-08-31.

---

## Uwagi dla sesji wdrożeniowej

1. **Typ `Usluga` nie ma miejsca na 11 nowych sekcji.** `lib/uslugi/types.ts` definiuje sztywno 8 sekcji. Nowe sekcje wchodzą jako `bloki` w istniejących polach (`problem.bloki`, `rozwiazanie.bloki`, `ramaCeny.bloki`), z blokiem `typ: 'naglowek'` jako H2. Dostępne typy bloków: `naglowek`, `akapit`, `lista`, `tabela`, `cytat`, `sekcja`, `kafle`, `kroki`, `pasMetryk`, `przelacznik`, `siatka` (`lib/blog/types.ts`). Alternatywa: rozszerzyć typ o pole `sekcjeDodatkowe`. Decyzja architektoniczna po Twojej stronie, ale podejmij ją RAZ, przed wklejaniem treści.

2. **Kalkulatory wymagają nowego typu bloku.** W `lib/blog/types.ts` nie ma typu `kalkulator`. Sekcje 1 i 4 to wyspy `'use client'`. Wzorzec do skopiowania: `components/narzedzia/KalkulatorOszczednosci.tsx` (ma już `PolePrzewodnik`, `WykresSlupkowy`, `AnimatedMetric`).

3. **Kalkulatory startują PUSTE.** Decyzja właściciela z 2026-08-31: zero wartości domyślnych. Uwaga na naczynia połączone: istniejący `KalkulatorOszczednosci` ma dziś `useState(5)`, `useState(6)`, `useState(60)` i `DOMYSLNY_PROC_AUTO`. To jest **poza zakresem tego pakietu** (dotyczy `/narzedzia`), ale ta sama decyzja obejmuje go tak samo. Zgłoś to Pawłowi osobno, nie naprawiaj po cichu przy okazji.

4. **Zakaz połączeń wychodzących obowiązuje w całym pakiecie.** Kontrakt „nie robimy botów, które same wydzwaniają" stoi w 8 miejscach w `voiceboty.ts` i w trzech podstronach. Żadna nowa sekcja i żadna nowa podstrona nie może go złamać. Gdyby właściciel kiedyś zmienił tę politykę, to jest zmiana na czterech stronach naraz, nie na jednej.

5. **Kolor kategorii.** Nowe podstrony dziedziczą ton voicebotów z `lib/inf-kategorie.ts`. Nie wprowadzaj nowego koloru dla podstron branżowych, bo rozjedzie się z hubem.

6. **Rejestr podstron.** `lib/uslugi/podstrony/index.ts`: jeden import plus jeden wpis w tablicy `PODSTRONY` na każdą podstronę, `rodzic: 'voiceboty'`, `dataAktualizacji` = realna data wdrożenia, nigdy `new Date()`. Trasa SSG i sitemap biorą się stąd automatycznie.

7. **Linkowanie wewnętrzne.** Do `powiazane` na stronie głównej dopisz: cennik, przychodnia, stomatolog, salon samochodowy, kancelaria, RODO i AI Act. W drugą stronę: każda nowa podstrona linkuje w górę do `/uslugi/voiceboty` i w bok do `/uslugi/voiceboty/cennik`. Trzy istniejące podstrony (windykacja, potwierdzanie wizyt, odbieranie telefonów) dostają tylko dołożony link do cennika, treści nie ruszamy.

8. **Kolejność wdrożenia, gdyby trzeba było ciąć:** najpierw podstrona `/cennik` (najgorętsza intencja zakupowa), potem sekcje 1, 2 i 4 na stronie głównej (kalkulatory i „jak brzmi"), potem sekcje 5, 6, 7, potem podstrony branżowe, na końcu `/rodo-ai-act`.

9. **Zadanie weryfikacyjne przed publikacją sekcji 6 (opcjonalne, nie blokuje wdrożenia):** jeśli chcemy podać widełki rynkowe za minutę rozmowy, ktoś musi otworzyć cenniki konkurencji, zrzucić je i zapisać datę. Do tego czasu sekcja 6 działa bez ani jednej cudzej kwoty i jest kompletna. **Nie wklejaj do treści żadnej stawki konkurencji bez zrzutu i daty.**

10. **Dane z konspektu wykorzystane w tym pakiecie, do kontroli:** 2500 zł, 5000 do 9000 zł, 1790 zł, 1490 zł, 1990 zł, 169 zł, 299 do 1500 zł, 0 zł, 350 zł za godzinę, 3 do 5 i 5 do 25 dni roboczych, 1 do 2 dni roboczych (chatbot), 5 dni roboczych (Sprint), 6088 / 20 500 / 8588 / 27 000 zł (arytmetyka pokazana w treści), 21 dni roboczych, realizacje: Instytut Kryptografii, Onyx, Y-Ads, KNF Team, Desant.pl, Lenart Motors. Żadna inna liczba w pakiecie nie występuje.

11. **Ceny stron WWW (1590 / 2900 / od 5900 zł netto) celowo nie występują w treści tego pakietu**, bo obszar to voiceboty i mieszanie tam cennika stron WWW rozmydla intencję. Wdrażamy je w pakiecie strony `/uslugi/strony-www`.

12. **Weryfikacja po wdrożeniu, bez tego nie ogłaszaj gotowe:** otwórz `https://www.simplefast.ai/uslugi/voiceboty` na żywo i sprawdź, że oba kalkulatory startują z pustymi polami i liczą po wpisaniu wartości, a każda nowa podstrona zwraca 200 i jest w `sitemap.xml`.
