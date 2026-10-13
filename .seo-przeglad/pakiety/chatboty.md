# Pakiet wdrożeniowy: Chatboty AI

**Adres strony:** https://www.simplefast.ai/uslugi/chatboty
**Plik danych strony:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\lib\uslugi\chatboty.ts`
**Data:** 2026-08-31
**Co ten pakiet dodaje:** 11 nowych sekcji na istniejącej stronie usługi i 8 nowych podstron, wszystko z cenami i czasami z zatwierdzonego cennika, z kalkulatorem bez domyślnych kwot i bez ani jednego znacznika roboczego w treści.

**Status walidacji:** wszystkie 7 blokerów naprawione, wszystkie 6 błędów WAŻNE naprawione, 5 drobiazgów naprawionych. Treść jest gotowa do wklejenia.

---

## Czego NIE ruszamy

Te elementy `lib/uslugi/chatboty.ts` zostają bez zmian:

- `kapsula` oraz `metaTitle` i `metaDescription` strony
- `problem` (H2: „Ile razy dziennie odpowiadasz na to samo pytanie?") wraz z blokami
- `rozwiazanie` (H2: „Co robi nasz chatbot, czego nie robi zwykły bot?") wraz z blokami
- `tabelaPorownawcza` (H2: „Chatbot a ręczna obsługa pytań klientów")
- `kroki` (H2: „Jak wdrażamy chatbota krok po kroku?")
- `ramaCeny` (H2: „Ile kosztuje wdrożenie chatbota?") wraz z `minPrice: 1790` i `linkPoradnik`
- `faq` (8 istniejących pytań) w obecnym brzmieniu
- `cta` („Pokaż mi, gdzie tracę czas", `#diagnoza`)
- `powiazane` (realizacje i narzędzia)
- `queries`
- Service JSON-LD i wszystkie `offers` oparte o `minPrice`

Jedna opcjonalna korekta jednego zdania w istniejącym FAQ jest opisana na końcu, w Uwagach.

---

## Nowe sekcje na istniejącej stronie

### 1. Jaki chatbot AI jest mi w ogóle potrzebny?

- **Gdzie wstawić:** po sekcji `rozwiazanie`, przed `tabelaPorownawcza`
- **Po co:** łapie frazy długiego ogona (chatbot na stronę, chatbot z bazą wiedzy, chatbot z integracjami) i rozprowadza ruch na nowe podstrony. Segmentację po typie bota mają malinski.ai i biznesailab.pl, sekcję kwalifikacyjną ma mits.pl.
- **Typ:** karty (3) plus akapit domykający

**TREŚĆ:**

Większość firm nie potrzebuje „chatbota". Potrzebuje konkretnej rzeczy: żeby ktoś odpisał o 22:00, żeby bot znał cennik na pamięć albo żeby sam sprawdził status zamówienia.

Różnica między botem za 1790 zł a botem za 15 000 zł nie polega na tym, że jeden jest lepszy. Polega na tym, ile Twoich systemów musi ze sobą rozmawiać.

Wybierz kartę, która brzmi jak Twoja sytuacja. Każda ma jawną cenę i jawny czas.

**KARTA 1**
Tytuł: Bot na stronę, który zna Twoją firmę
To dla Ciebie, jeśli: klienci pytają w kółko o to samo, a Ty odpisujesz z telefonu wieczorem.
Co dostajesz: bot na Twojej stronie WWW, baza wiedzy z Twoich materiałów, zbieranie leadów z rozmowy.
Czego nie ma: wpięcia w Twój CRM, sklep czy kalendarz.
Cena: 1790 zł netto
Czas: 1-2 dni robocze
Link: Chatbot do obsługi klienta → `/uslugi/chatboty/obsluga-klienta`

**KARTA 2**
Tytuł: Bot średni, gdy pytania są trudniejsze
To dla Ciebie, jeśli: masz kilka linii produktowych, długie procedury albo obsługujesz dwa języki.
Co dostajesz: większą bazę wiedzy, więcej ścieżek rozmowy, przekazanie sprawy do człowieka w ustalonym momencie.
Czego nie ma: pełnych integracji dwustronnych z Twoimi systemami.
Cena: 3000-6000 zł netto
Czas: 3-4 dni robocze
Link: Jak działa baza wiedzy bota → `/uslugi/chatboty/baza-wiedzy`

**KARTA 3**
Tytuł: Bot z integracjami, czyli taki, który coś robi
To dla Ciebie, jeśli: bot ma sprawdzić stan magazynu, status zamówienia albo dopisać kontakt do CRM, a nie tylko opowiedzieć.
Co dostajesz: połączenie z Twoimi systemami, działanie w obie strony, obsługę spraw, które dziś ktoś klika ręcznie.
Czego nie ma: taniej wersji. Tu płacisz za pracę na Twoich systemach, nie za rozmowę.
Cena: 8000-15 000 zł netto
Czas: 5-10 dni roboczych
Link: Chatbot z integracjami → `/uslugi/chatboty/sklep-internetowy`

**Akapit pod kartami:**

Baza wiedzy jest w każdym z tych trzech botów. Różni się jej objętość i liczba ścieżek rozmowy, a nie sama technologia.

Do wdrożenia dochodzi zużycie tokenów po Twojej stronie. Utrzymanie zależy od tego, gdzie stoi infrastruktura: u nas 99-599 zł miesięcznie, u Ciebie 0 zł. Rozpisujemy to niżej.

- **Źródło liczb:** 1790 zł / 1-2 dni robocze, 3000-6000 zł / 3-4 dni, 8000-15 000 zł / 5-10 dni, utrzymanie 99-599 zł miesięcznie, wariant 0 zł przy przekazaniu infrastruktury, zasada trzech osobnych pozycji: konspekt firmy plus decyzja właściciela z 2026-08-31 (punkt 2).
- **Naprawione względem walidacji:** WAŻNE (mylące rozróżnienie kart 1 i 2 przez nazwę RAG), WAŻNE (sprzeczność „utrzymanie stałe" kontra „utrzymanie opcjonalne"), DROBIAZG (link karty 3 zawężony do sklepu, teraz neutralna nazwa).

---

### 2. Chcę zobaczyć, jak działa chatbot AI, zanim zapłacę

- **Gdzie wstawić:** po nowej sekcji 1, czyli nadal przed `tabelaPorownawcza`
- **Po co:** jedyna przewaga, której nie ma żaden z siedmiu badanych konkurentów. Bota na simplefast.ai wolno opisać jako naszego, bo klient może go kliknąć. mits.pl, malinski.ai i biznesailab.pl opisują boty tekstem, nie dają ich do przetestowania.
- **Typ:** akapity plus 3 karty

**TREŚĆ:**

Możesz przeczytać dziesięć stron o chatbotach i dalej nie wiedzieć, jak to brzmi w rozmowie.

Dlatego nasz bot stoi na tej stronie. Kliknij „Zapytaj AI" i sprawdź go sam, zanim porozmawiasz z kimkolwiek od nas.

To nie jest demo z gotowymi odpowiedziami. To ten sam typ bota, którego stawiamy klientom, tyle że z bazą wiedzy o naszej firmie.

Zadaj mu pytanie, na które u większości firm dostaniesz tylko formularz kontaktowy. Zobacz, czy nasz bot odpowie konkretem.

**KARTA 1**
Zapytaj o cenę wprost
Przykład: „Ile kosztuje chatbot, który ma czytać moje PDF-y i cennik?"
Sprawdzasz, czy bot potrafi podać kwotę, czy ucieka w „skontaktuj się z nami".

**KARTA 2**
Zapytaj o termin
Przykład: „Zaczynamy w poniedziałek. Kiedy bot będzie działał u mnie na stronie?"
Sprawdzasz, czy zna nasze realne czasy wdrożenia, czy zgaduje.

**KARTA 3**
Zapytaj o coś, czego nie robimy
Przykład: „Zbudujecie mi aplikację mobilną na iOS?"
Sprawdzasz najważniejszą rzecz w całym botowaniu: co się dzieje, kiedy bot nie wie.

**Akapit domykający:**

Jeśli po tych trzech pytaniach uznasz, że taki bot przydałby się u Ciebie, to właśnie zobaczyłeś demo swojego przyszłego wdrożenia.

Jeśli uznasz, że nie, też dobrze. Zaoszczędziłeś rozmowę.

- **Źródło liczb:** zero liczb w tej sekcji, celowo. Fakt, że bota na simplefast.ai wolno opisywać jako naszego: wyjątek z sekcji NARZĘDZIA W PORTFOLIO konspektu. Obecność widgetu i działanie przycisku „Zapytaj AI" na `/uslugi/chatboty`: zweryfikowane przez właściciela 2026-08-31 (decyzja punkt 6).
- **Naprawione względem walidacji:** BLOKER (niezweryfikowane twierdzenie o żywym widgecie, teraz potwierdzone i opisane przez nazwę przycisku, a nie przez położenie w rogu), WAŻNE (sekcja obiecywała konkretne odpowiedzi bota, teraz karty opisują, co czytelnik sam sprawdza), DROBIAZG (niezrozumiałe zdanie „odpowiadamy handlowcem"), DROBIAZG (asekuranckie „nasz ma powiedzieć"), DROBIAZG (fraza „chatbot AI" dołożona do H2).

---

### 3. Z czego właściwie składa się chatbot AI?

- **Gdzie wstawić:** po `tabelaPorownawcza`, przed `kroki`
- **Po co:** warstwa edukacyjna, najczęściej cytowana przez ChatGPT i Perplexity przy pytaniu o chatbota RAG. Mają to mits.pl (trzy warstwy) i biznesailab.pl (architektura RAG). Pracuje też na obronę ceny.
- **Typ:** 3 karty

**TREŚĆ:**

Kiedy dostajesz dwie wyceny, jedną na 1790 zł i drugą na 15 000 zł, wygląda to jak naciąganie. Nie jest.

Każdy chatbot ma trzy warstwy. Pierwsza jest w każdym bocie. Druga też. Trzecia jest tym, za co realnie rosną wyceny.

**WARSTWA 1: baza wiedzy, czyli skąd bot wie**
Tu wgrywamy Twoje materiały: cennik, oferty, procedury, opisy produktów, transkrypcje nagrań.
Bot szuka odpowiedzi w Twoich dokumentach, a nie w internecie.
Fachowo nazywa się to RAG. Praktycznie znaczy to jedno: bot cytuje Ciebie, zamiast zmyślać.
Co idzie nie tak bez tej warstwy: bot brzmi mądrze i podaje cenę, której nie masz w cenniku.

**WARSTWA 2: model językowy, czyli czym bot mówi**
Model odpowiada za rozumienie pytania i za ton odpowiedzi.
To jedyny element, którego nie budujemy sami. Korzystamy z gotowego modelu u zewnętrznego dostawcy.
Konto u dostawcy jest Twoje, więc za zużycie płacisz mu wprost, bez naszej marży.
Używamy modelu Claude od Anthropic. Nie korzystamy z modeli OpenAI.
Model bez Twojej bazy wiedzy to miły rozmówca, który nie zna Twojej firmy. Baza bez modelu to wyszukiwarka. Dopiero razem robią bota.

**WARSTWA 3: integracje, czyli co bot potrafi zrobić**
Tu bot przestaje mówić i zaczyna działać: sprawdza status zamówienia, dopisuje kontakt do CRM, zerka na dostępność terminu.
Każdy podpięty system to osobna praca po naszej stronie: dostępy, testy, obsługa błędów.
Dlatego bot z integracjami kosztuje 8000-15 000 zł, a bot na stronę z bazą wiedzy 1790 zł.
Jeśli słyszysz cenę bota z integracjami bez rozmowy o Twoich systemach, ktoś Ci zgaduje wycenę.

- **Źródło liczb:** 1790 zł oraz 8000-15 000 zł z konspektu. Dostawca modelu (Anthropic, Claude): decyzja właściciela z 2026-08-31, punkt 5, sprawdzone w kodzie. Zasada „za tokeny płaci klient": konspekt, trzy osobne pozycje.
- **Naprawione względem walidacji:** WAŻNE (sprzeczność „kupujemy go od dostawcy i płacisz za jego zużycie" rozdzielona na dwa jasne zdania), WAŻNE (nazwa dostawcy modelu była znacznikiem roboczym, teraz jest faktem).

---

### 4. Gdzie chatbot będzie rozmawiał z moimi klientami?

- **Gdzie wstawić:** po nowej sekcji 3, czyli tuż przed `kroki`
- **Po co:** łapie frazy kanałowe (chatbot na WhatsApp, chatbot na Messengera, chatbot na stronę) i jest hubem linkującym do `/uslugi/chatboty/whatsapp-messenger`. Listę kanałów ma mits.pl, wielokanałowość wycenia malinski.ai. U nas kanałów nie ma nigdzie wypisanych.
- **Typ:** lista

**TREŚĆ:**

Bot nie musi siedzieć na stronie. Ma siedzieć tam, gdzie Twój klient już pisze, bo nikt nie zmieni przyzwyczajeń dla Twojego widgetu.

Jedna baza wiedzy obsługuje kilka kanałów naraz. Odpowiedzi są te same, zmienia się tylko okno, w którym się pojawiają.

- **Strona WWW.** Okno czatu na Twojej stronie, widoczne od razu po wejściu. Najczęstszy wybór, bo łapie ruch, który już masz, i zbiera leada w trakcie rozmowy.
- **WhatsApp.** Dla firm, do których klienci piszą z telefonu. Historia rozmowy zostaje u klienta w telefonie, więc wraca do niej po tygodniu.
- **Messenger.** Sensowny, jeśli ruch przychodzi Ci z Facebooka, a skrzynka puchnie po godzinach.
- **Instagram.** To samo co Messenger, tylko dla firm, które sprzedają przez zdjęcia i rolki.
- **Telegram.** Wybierany tam, gdzie zespół albo klienci już go używają na co dzień.
- **Kilka kanałów naraz.** Jedna baza wiedzy, kilka okien. Dokładamy kanał do gotowego bota, nie budujemy go drugi raz od zera.

To jest pełna lista kanałów, które wdrażamy. Jeśli pytasz o inny, powiemy wprost, że go nie robimy, zamiast obiecywać na wyrost.

Wybór kanału zmienia wycenę, bo każde dodatkowe okno to osobne podpięcie i osobne testy. Pytamy o to na pierwszej rozmowie, a nie po niej.

Szczegóły kanałów mobilnych opisujemy osobno: Chatbot na WhatsApp i Messengerze → `/uslugi/chatboty/whatsapp-messenger`

- **Źródło liczb:** zero liczb w tej sekcji. Lista kanałów: decyzja właściciela z 2026-08-31, punkt 4. Zdanie o wpływie kanału na wycenę: zasada „nowe funkcje spoza pierwszej rozmowy to osobna wycena" z konspektu.
- **Naprawione względem walidacji:** BLOKER (Slack i Microsoft Teams wycięte, bo ich nie robimy; lista kanałów była z projektu, teraz jest potwierdzona przez właściciela; link do podstrony zostaje, bo podstrona jest w tym pakiecie).

---

### 5. Jakie efekty dały nasze chatboty AI u klientów?

- **Gdzie wstawić:** po `kroki`, przed nową sekcją 6
- **Po co:** case study z nazwą i liczbą wpięte wprost na stronę usługi, nie schowane w portfolio. Mają to mits.pl i momentumsquads.com. To najsilniejszy materiał do cytowania przez modele AI i najlepsza rekompensata słabej domeny.
- **Typ:** case study (4 bloki)

**TREŚĆ:**

Nie mamy tysięcy wdrożeń i nie będziemy udawać, że mamy. Mamy konkretne firmy, które zgodziły się wystąpić z nazwy i z liczbami.

**Instytut Kryptografii: bot, który mówi, w której minucie filmu to było**
Zbudowaliśmy trzy boty z bazą wiedzy zrobioną z transkrypcji kursów.
Kiedy kursant pyta o zagadnienie, bot nie streszcza z pamięci. Wskazuje dokładne miejsce w nagraniu, w którym pada odpowiedź.
To jest test, którego nie przechodzi zwykły bot: potrafi pokazać źródło, zamiast brzmieć wiarygodnie.
Osobno działa tam automat do skrzynki BOK. Osiem na dziesięć wygenerowanych odpowiedzi jest gotowych do wysłania bez poprawek, przy 580 mailach tygodniowo w szczycie.
Decyzję o wysłaniu podejmuje człowiek. Automat pisze, człowiek akceptuje.

**Desant.pl: rozmowy, których nikt nie musi już zaczynać ręcznie**
Chatbot obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości.
To ruch, który wcześniej lądował w skrzynce i czekał na wolną chwilę człowieka.
Taki wolumen wygląda niepozornie, dopóki nie policzysz, ile z tych wiadomości to było to samo pytanie.

**Przystań Jurgen: sezon, w którym pytania nie czekają do poniedziałku**
Zrobiliśmy stronę WWW i chatbota.
W sezonie bot obsługuje około 100 zapytań od 20-50 klientów, czyli dokładnie wtedy, gdy właściciel nie ma czasu odpisywać.
Ruch przychodzi falą, a stracone zapytanie z lipca nie wraca we wrześniu.

**Trockenhaus: strona z botem, którą w końcu widać w Google**
Dla niemieckiej firmy od osuszania piwnic zrobiliśmy stronę WWW i chatbota.
Na frazę Trockenhaus firma przesunęła się z pozycji, której nikt nie widział, do pierwszej trójki wyników.
Bot ma sens wtedy, gdy ktoś wchodzi na stronę. Dlatego ruszyliśmy obie rzeczy naraz.

- **Źródło liczb:** Instytut Kryptografii (3 boty na transkrypcjach kursów, 80% draftów gotowych do wysłania bez poprawek zapisane jako „osiem na dziesięć", 580 maili tygodniowo w szczycie), Desant.pl (30-50 klientów miesięcznie, 200-280 wiadomości), Przystań Jurgen (ok. 100 zapytań od 20-50 klientów sezonowo), Trockenhaus (strona WWW plus chatbot, z niewidocznej pozycji do pierwszej trójki): sekcja REALIZACJE konspektu. Doprecyzowanie „gotowych do wysłania" i człowiek w pętli: decyzja właściciela z 2026-08-31, punkt 7.
- **Naprawione względem walidacji:** WAŻNE (zdanie „osiem na dziesięć odpowiedzi idzie do klienta bez poprawek" wzmacniało fakt; teraz jest „gotowych do wysłania" plus zdanie o człowieku w pętli), DROBIAZG (fraza „chatboty AI" dołożona do H2).

---

### 6. Co się dzieje z moimi danymi w chatbocie AI?

- **Gdzie wstawić:** po nowej sekcji 5, przed nową sekcją 7
- **Po co:** u klientów B2B lęk numer jeden to bezpieczeństwo danych, nie cena. Konkurenci trzymają ten temat w FAQ (mits.pl, biznesailab.pl), nikt nie robi z tego osobnej sekcji z konkretami. Odpowiedź w pierwszym zdaniu jest po to, żeby modele AI miały co zacytować.
- **Typ:** akapity

**TREŚĆ:**

W bazie wiedzy bota ląduje wyłącznie to, co sam nam dasz. Nie zaciągamy Twojej poczty, dysku ani systemów bez Twojej zgody i bez ustalonego zakresu.

To pytanie pada na prawie każdej pierwszej rozmowie i jest ważniejsze od ceny. Odpowiadamy na nie wprost, bo wymijająca odpowiedź kosztuje tu więcej niż drogi cennik.

Przed wgraniem materiałów mówimy, co powinno z nich wypaść. Dane osobowe klientów, wewnętrzne marże i dokumenty kadrowe nie mają czego szukać w bocie, który rozmawia z rynkiem.

Model językowy jest usługą zewnętrzną i tego nie da się obejść. Treść rozmowy trafia do dostawcy modelu po to, żeby powstała odpowiedź. Nie trafia tam nic poza tym, co sam nam dasz.

Korzystamy z modelu Claude firmy Anthropic. Nie korzystamy z modeli OpenAI, więc Twoje rozmowy nie przechodzą przez ich systemy.

Po Twojej stronie zostaje wybór trybu pracy i to jest realna decyzja, nie formalność.

Możemy trzymać infrastrukturę u nas. Wtedy płacisz utrzymanie 99-599 zł netto miesięcznie i nie zajmujesz się niczym.

Możemy też przekazać całą infrastrukturę Tobie. Wtedy utrzymanie po naszej stronie wynosi 0 zł miesięcznie, a późniejsze poprawki rozliczamy po 350 zł netto za godzinę.

Ten drugi wariant jest naszą świadomą decyzją. Z abonamentu u nas można wyjść i nie stracić przy tym bota.

Właścicielem bazy wiedzy jesteś Ty w obu wariantach. Jeśli kończymy współpracę, zabierasz swoje dokumenty i konfigurację ze sobą.

Umowę powierzenia przetwarzania danych podpisujemy przed startem, a nie po nim.

- **Źródło liczb:** utrzymanie 99-599 zł miesięcznie, wariant 0 zł przy przekazaniu infrastruktury, poprawki 350 zł netto za godzinę: decyzja właściciela z 2026-08-31, punkt 2 (model rozszerzony z voicebotów na wszystkie usługi). Dostawca modelu: decyzja punkt 5.
- **Naprawione względem walidacji:** BLOKER (model 0 zł plus 350 zł za godzinę był w cenniku tylko przy voicebotach, teraz obowiązuje przy chatbotach), WAŻNE (nagłówek pytał o OpenAI i nie odpowiadał; teraz nagłówek jest neutralny, a odpowiedź o dostawcy pada wprost), WAŻNE (sprzeczność z sekcją 1 co do utrzymania usunięta, oba warianty są opisane identycznie w sekcjach 1, 6, 8 i 9). Usunięte dwa znaczniki [DO POTWIERDZENIA] i cały akapit o liście podmiotów przetwarzających, bo tej danej nie ma.

---

### 7. Ile kosztuje mnie każdy miesiąc bez chatbota AI?

- **Gdzie wstawić:** po nowej sekcji 6, bezpośrednio przed `ramaCeny`
- **Po co:** rachunek strat postawiony tuż przed ceną, żeby kwota 1790 zł czytała się jako mała. Koszt bezczynności ma malinski.ai, pełne rachunki na stawkach godzinowych mają pixelagency.pl i lessmanual.ai. Różnica u nas: nie podajemy żadnych własnych założeń, liczy klient.
- **Typ:** kalkulator (interaktywny, cztery pola, ZERO wartości domyślnych)

**TREŚĆ (część opisowa):**

Brak chatbota nie ma ceny na fakturze i dlatego wygląda na darmowy. Kosztuje jednak dwa razy: godzinami Twoich ludzi i zapytaniami, które nie doczekały odpowiedzi.

Nie podamy Ci tu statystyk z rynku ani przykładowej stawki godzinowej, bo nie znamy Twojej firmy. Zgadnięta liczba w takim rachunku to nie dowód, tylko dekoracja.

Wpisz cztery swoje liczby. Wynik policzy się sam.

**KALKULATOR, pola do wpisania (wszystkie puste na starcie, bez podpowiedzianych kwot):**

1. Ile powtarzalnych pytań dostajesz dziennie?
2. Ile minut zajmuje jedna odpowiedź?
3. Ile dni w miesiącu odpowiadacie na te pytania?
4. Ile kosztuje Cię godzina pracy osoby, która odpisuje? (zł netto)

**KALKULATOR, wyniki i jawne działania (wyświetlane pod polami):**

- Godziny miesięcznie = (pytania dziennie × minuty na odpowiedź × dni w miesiącu) ÷ 60
- Koszt pracy miesięcznie = godziny miesięcznie × Twoja stawka godzinowa
- Oszczędność miesięczna po wdrożeniu = koszt pracy miesięcznie − 99 zł (utrzymanie w najniższym wariancie)
- Po ilu miesiącach zwraca się wdrożenie = 1790 zł ÷ oszczędność miesięczna, zaokrąglone w górę

**Tekst wyświetlany pod wynikiem, wariant A (gdy koszt pracy jest wyższy niż 99 zł):**

Tyle kosztuje Cię miesiąc bez bota, licząc sam czas pracy. Wdrożenie to 1790 zł netto, utrzymanie od 99 zł netto miesięcznie, tokeny modelu dochodzą osobno po Twojej stronie.

**Tekst wyświetlany pod wynikiem, wariant B (gdy koszt pracy jest równy 99 zł lub niższy):**

Przy tych liczbach bot się u Ciebie nie zwróci i powiemy Ci to samo na rozmowie. Wróć do tematu, gdy pytań będzie więcej.

**Akapity zamykające sekcję:**

Ten rachunek pokazuje tylko czas pracy. Nie liczy klienta, który napisał w sobotę o 21:00, nie dostał odpowiedzi i w poniedziałek pisał już do kogoś innego.

Jeśli wolisz policzyć cały proces, a nie same pytania, mamy do tego osobne narzędzie: Czy warto zautomatyzować ten proces? → `/narzedzia#kalkulator-procesu`

- **Źródło liczb:** jedyne liczby podane przez nas to 1790 zł netto i utrzymanie od 99 zł netto miesięcznie, obie z konspektu. Wszystkie pozostałe wartości wpisuje czytelnik, a działania są pokazane w treści. Brak wartości domyślnych: decyzja właściciela z 2026-08-31, punkt 3.
- **Naprawione względem walidacji:** BLOKER (wymyślone 5 minut, 22 dni robocze i 50 zł za godzinę usunięte razem z całą tabelą), BLOKER (błąd arytmetyczny „około 2 miesiące" przestał istnieć, bo tabela zniknęła; zwrot liczy się teraz ze wzoru), DROBIAZG (fraza „chatbot AI" dołożona do H2). Wycięte progi 10 / 25 / 50 pytań dziennie oraz wszystkie wyniki 18 / 46 / 92 godzin i 900 / 2300 / 4600 zł.

---

### 8. Za co dokładnie płacę i co zapłacę co miesiąc?

- **Gdzie wstawić:** po `ramaCeny`, przed `powiazane`
- **Po co:** konkurenci rozbijają koszty miesięczne na pozycje z kwotami (lessmanual.ai, pixelagency.pl, malinski.ai), u nas cena stoi w jednej ramie i klient nie widzi, gdzie kończy się faktura wdrożeniowa.
- **Typ:** tabela plus akapity

**TREŚĆ:**

Przy chatbotach zawsze są trzy osobne pozycje, nie jedna. Kto pokazuje tylko pierwszą, ten dwie kolejne wyśle Ci później.

| Pozycja | Co to konkretnie jest | Kwota netto | Kiedy płacisz |
| --- | --- | --- | --- |
| Stworzenie: bot na stronę z bazą wiedzy i zbieraniem leadów | Budowa, wgranie Twoich materiałów, testy, publikacja | 1790 zł | Jednorazowo, przy wdrożeniu |
| Stworzenie: bot średni | Większa baza wiedzy, więcej ścieżek rozmowy, przekazanie do człowieka | 3000-6000 zł | Jednorazowo, przy wdrożeniu |
| Stworzenie: bot z integracjami | Połączenie z Twoimi systemami, praca w obie strony | 8000-15 000 zł | Jednorazowo, przy wdrożeniu |
| Utrzymanie, gdy infrastruktura stoi u nas | Hosting, aktualizacje bazy wiedzy, reagowanie, gdy coś przestaje działać | 99-599 zł miesięcznie | Co miesiąc, od startu |
| Utrzymanie, gdy przekazujemy infrastrukturę Tobie | Bot stoi u Ciebie, my wchodzimy tylko na Twoje zlecenie | 0 zł miesięcznie, poprawki 350 zł za godzinę | Tylko wtedy, gdy zamówisz poprawkę |
| Zużycie tokenów | Opłata za pracę modelu językowego, rośnie i maleje razem z liczbą rozmów | Po Twojej stronie, płacisz dostawcy wprost | Co miesiąc, według faktycznego zużycia |
| Dwie rundy poprawek | Tydzień testów u Ciebie, poprawki, drugi tydzień, poprawki, odbiór | 0 zł, w cenie wdrożenia | Nie płacisz |
| Nowe funkcje spoza pierwszej rozmowy | Rzeczy, których nie było w ustaleniach, na przykład kolejny kanał albo kolejna integracja | Osobna wycena | Tylko jeśli je zamówisz |

Widełki w kwotach nie są zasłoną dymną. Bot średni za 3000 zł i bot średni za 6000 zł różnią się objętością bazy wiedzy i liczbą ścieżek rozmowy, a to widać już na pierwszej rozmowie.

Utrzymanie za 99 zł to bot, który po prostu ma działać. Utrzymanie za 599 zł to bot z regularnie aktualizowaną bazą wiedzy i większym ruchem.

Tokeny są jedyną pozycją, której nie kontrolujemy, bo płacisz za nie u dostawcy modelu według zużycia. Po pierwszej fakturze znasz już swój realny rząd wielkości.

- **Źródło liczb:** 1790 zł, 3000-6000 zł, 8000-15 000 zł, utrzymanie 99-599 zł miesięcznie, dwie rundy poprawek w cenie, nowe funkcje spoza pierwszej rozmowy jako osobna wycena, zasada trzech osobnych pozycji: konspekt. Wiersz o 0 zł i 350 zł za godzinę: decyzja właściciela z 2026-08-31, punkt 2.
- **Naprawione względem walidacji:** WAŻNE (spójność modelu utrzymania z sekcjami 1, 6 i 9). Usunięty znacznik [DO POTWIERDZENIA] o przykładowym koszcie tokenów razem z tym zdaniem, bo tej danej nie ma.

---

### 9. Taniej wyjdzie abonament czy chatbot na własność?

- **Gdzie wstawić:** po nowej sekcji 8, czyli nadal przed `powiazane`
- **Po co:** policzone porównanie alternatywy, najmocniejszy argument sprzedażowy przy progu 1790 zł. Tabelę abonament kontra jednorazowe wdrożenie mają lessmanual.ai i webyjuice.pl, malinski.ai pozycjonuje się wprost przeciw abonamentom. My mamy rzecz, której nie ma nikt: obie drogi u jednego dostawcy.
- **Typ:** tabela plus lista kontrolna

**TREŚĆ:**

Gotowa platforma w abonamencie wygląda taniej pierwszego dnia i to jest jej cała przewaga. Rachunek trzeba zrobić na trzy lata, bo tyle zwykle żyje bot, który działa.

U nas nie musisz wybierać między abonamentem a własnością. Masz obie drogi i mówimy o nich, zanim podpiszesz cokolwiek.

| Co porównujemy | Infrastruktura u nas, utrzymanie 99 zł | Infrastruktura u nas, utrzymanie 599 zł | Infrastruktura przekazana Tobie |
| --- | --- | --- | --- |
| Koszt wdrożenia | 1790 zł | 1790 zł | 1790 zł |
| Opłata miesięczna | 99 zł | 599 zł | 0 zł |
| Po 12 miesiącach | 2978 zł | 8978 zł | 1790 zł |
| Po 24 miesiącach | 4166 zł | 16 166 zł | 1790 zł |
| Po 36 miesiącach | 5354 zł | 23 354 zł | 1790 zł |
| Za co płacisz co miesiąc | Hosting i reagowanie, gdy coś przestanie działać | Hosting plus regularna aktualizacja bazy wiedzy przy większym ruchu | Nic. Poprawki 350 zł netto za godzinę, tylko gdy je zamówisz |
| Czyj jest kod i baza wiedzy | Twoje | Twoje | Twoje, razem z całą infrastrukturą |
| Zmiany w bocie | Robimy je pod Twój proces, dwie rundy poprawek w cenie wdrożenia | To samo | Robimy je na zlecenie albo robisz je sam |
| Czas wdrożenia | 1-2 dni robocze | 1-2 dni robocze | 1-2 dni robocze |

Jak liczymy: 1790 zł wdrożenia plus opłata miesięczna razy liczba miesięcy. Dla wariantu za 99 zł po 12 miesiącach wychodzi 1790 + 99 × 12 = 2978 zł. Dla wariantu za 599 zł po 36 miesiącach 1790 + 599 × 36 = 23 354 zł.

Wszystkie trzy warianty startują z tego samego bota i tego samego czasu wdrożenia. Różni je to, kto trzyma serwery i kto reaguje, gdy coś pada.

Wariant za 599 zł nie daje lepszego bota. Daje bota pilnowanego przy większym ruchu i bazie wiedzy, która zmienia się co tydzień.

**Zanim porównasz nas z platformą w abonamencie, sprawdź u niej pięć rzeczy:**

- Ile kosztuje miesiąc przy Twojej liczbie rozmów, a nie w pakiecie startowym.
- Czy cena rośnie razem z ruchem i o ile.
- Co zabierasz ze sobą, gdy odchodzisz: bazę wiedzy, konfigurację, historię rozmów.
- Czy możesz zmienić zachowanie bota poza tym, co przewidział producent w panelu.
- Ile zapłacisz za wpięcie bota w Twój system, jeśli w ogóle się da.

Nie podamy Ci tu cen cudzych platform, bo zmieniają się szybciej niż nasza strona. Wolimy dać Ci pięć pytań, które sam im zadasz.

Abonament ma sens, jeśli chcesz prostego bota na tydzień, sam go skonfigurujesz i nie zależy Ci na tym, czyja jest baza wiedzy.

Własny bot ma sens, jeśli baza wiedzy jest Twoim aktywem, a bot ma pracować na Twoich zasadach dłużej niż rok.

- **Źródło liczb:** 1790 zł, utrzymanie 99-599 zł miesięcznie, wariant 0 zł, poprawki 350 zł netto za godzinę, czas 1-2 dni robocze, dwie rundy poprawek: konspekt plus decyzja właściciela z 2026-08-31, punkt 2. Kwoty w wierszach 12, 24 i 36 miesięcy to suma arytmetyczna pokazana w treści.
- **Naprawione względem walidacji:** BLOKER (kolumna abonamentu SaaS z pięcioma znacznikami [DO POTWIERDZENIA] wycięta w całości, zastąpiona listą kontrolną bez liczb), BLOKER (model 0 zł i 350 zł za godzinę pojawiał się w tabeli jako fakt bez pokrycia, teraz ma pokrycie w decyzji właściciela), DROBIAZG (wiersz o czasie wdrożenia mylił, teraz jest osobny wiersz wyjaśniający, za co dopłacasz przy 599 zł).

---

### 10. Kiedy chatbot się u Ciebie nie opłaci?

- **Gdzie wstawić:** po nowej sekcji 9, bezpośrednio przed `powiazane`
- **Po co:** granice usługi to najsilniejszy sygnał zaufania i najchętniej cytowany fragment na tym rynku. Mają to falconworks.pl, malinski.ai, mits.pl, pixelagency.pl i lessmanual.ai.
- **Typ:** lista

**TREŚĆ:**

Sprzedajemy chatboty, więc powinniśmy teraz napisać, że każda firma ich potrzebuje. Nie potrzebuje.

Poniżej pięć sytuacji, w których odradzamy zakup, i to, co proponujemy zamiast niego.

- **Masz kilka zapytań tygodniowo.** Przy takim ruchu bot nie odda 1790 zł, bo nie ma czego przejmować. Odpowiadanie osobiście będzie Twoją przewagą, a nie kosztem. Wróć do tematu, gdy zapytania zaczną się powtarzać.

- **Twoja wiedza siedzi w głowach, nie w dokumentach.** Bot nie wymyśli procedury, której nigdy nie spisaliście. Jeśli baza wiedzy to trzy nieaktualne PDF-y i pamięć handlowca, zaczynamy od Sprintu Diagnostycznego za 1490 zł netto: pięć dni roboczych, raport PDF z mapą procesów, a kwota odlicza się od późniejszego wdrożenia.

- **Każda sprawa u Ciebie jest inna i wymaga decyzji człowieka.** Bot ma wtedy jedno zadanie: zebrać kontekst i oddać rozmowę Twojemu człowiekowi. Jeśli ktoś obiecuje Ci, że bot poprowadzi całą taką sprawę do końca, sprzedaje Ci kłopot.

- **Chcesz bota, żeby był, bo konkurencja ma.** To najdroższy powód zakupu, jaki znamy. Bot bez konkretnego pytania, które ma przejmować, po miesiącu stoi na stronie i zbiera kurz razem z abonamentem.

- **Twoja strona nie ma ruchu.** Bot rozmawia z tymi, którzy weszli. Jeśli nikt nie wchodzi, najpierw robi się widoczność, potem bota. U Trockenhaus zrobiliśmy jedno i drugie naraz i dopiero to zadziałało. Stronę biznesową robimy za 2900 zł netto w 2-4 dni robocze, prosty landing za 1590 zł netto w jeden dzień.

**Akapit domykający:**

Jeśli chcesz odciążyć proces wewnątrz firmy, a nie rozmowę z klientem, to nie jest zadanie dla chatbota. Wtedy proponujemy AI Start za 1990 zł netto, czyli pierwszą automatyzację na próbę. Chatbot za 1790 zł pracuje na zewnątrz, z Twoimi klientami. AI Start pracuje do wewnątrz, na Twoim procesie.

Jeśli rozpoznajesz tu swoją firmę, powiemy Ci to na pierwszej rozmowie, zanim wystawimy jakąkolwiek fakturę. Wolimy stracić jedno zlecenie niż mieć wdrożenie, którego klient po pół roku żałuje.

- **Źródło liczb:** 1790 zł, Sprint Diagnostyczny 1490 zł / 5 dni roboczych / raport PDF z mapą procesów / odliczany od wdrożenia, AI Start 1990 zł: konspekt. Ceny stron WWW (landing 1590 zł / 1 dzień, strona biznesowa 2900 zł / 2-4 dni): decyzja właściciela z 2026-08-31, punkt 1. Trockenhaus: sekcja REALIZACJE konspektu.
- **Naprawione względem walidacji:** BLOKER (sekcja była urwana w połowie drugiego punktu, teraz ma pięć pełnych punktów i domknięte zdanie o Sprincie Diagnostycznym z pełnym opisem raportu). Poprawione też zdanie zapowiadające, bo mówiło o czterech sytuacjach przy pięciu punktach.

---

### 11. Co przygotować, żebyśmy wycenili chatbota na pierwszej rozmowie?

- **Gdzie wstawić:** po `faq`, bezpośrednio przed `cta`
- **Po co:** zdejmuje ostatnią barierę przed kontaktem i skraca cykl sprzedaży. Sekcję o przygotowaniu do wyceny ma momentumsquads.com, blok autorski mają falconworks.pl i lessmanual.ai, my nie mamy go nigdzie.
- **Typ:** lista plus blok autorski

**TREŚĆ:**

Najczęstszy powód, dla którego wycena wraca po tygodniu zamiast paść na rozmowie, jest prozaiczny: nie wiadomo jeszcze, ile pytań przychodzi i skąd.

Cztery rzeczy poniżej wystarczą, żebyśmy podali kwotę i termin od razu.

- **Skąd dziś przychodzą pytania i ile ich jest.** Wystarczy zgrubnie: mniej więcej tyle mailem, tyle Messengerem, tyle telefonem. Ta jedna informacja decyduje, czy jesteśmy przy progu 1790 zł, czy wyżej.

- **Gdzie leżą materiały do bazy wiedzy.** Cennik, oferty, opisy produktów, procedury, transkrypcje szkoleń. Nie muszą być poukładane. Musimy wiedzieć, że istnieją i kto ma do nich dostęp.

- **Z jakimi systemami bot ma rozmawiać.** CRM, sklep, kalendarz, magazyn. To jedyna rzecz, która przesuwa wycenę z 1790 zł do przedziału 8000-15 000 zł, więc pytamy o nią wprost.

- **Kto po Twojej stronie odbiera wdrożenie.** Jedna osoba, która testuje bota i mówi „to jest dobrze". Bez niej odbiór rozjeżdża się na tygodnie, choć sama budowa trwa 1-2 dni robocze.

**Jak wygląda odbiór:**

Dajemy Ci bota, testujesz go przez tydzień, wprowadzamy poprawki. Potem drugi tydzień testów i druga runda poprawek. Obie są w cenie wdrożenia.

Jeśli po drodze wymyślisz funkcję, której nie było w pierwszej rozmowie, wycenimy ją osobno i powiemy o tym od razu, a nie na fakturze.

**KTO TO BUDUJE**

Paweł Pieloch, założyciel SimpleFast.ai.

Prowadzę wdrożenia chatbotów i automatyzacji dla firm w Polsce i w Niemczech, między innymi dla Instytutu Kryptografii, Desant.pl i Trockenhaus.

Na pierwszej rozmowie rozmawiasz ze mną, nie z działem handlowym. Jeśli uznam, że bot Ci się nie opłaci, powiem to na tej samej rozmowie.

- **Źródło liczb:** 1790 zł, 8000-15 000 zł, czas 1-2 dni robocze, dwie rundy poprawek w cenie wdrożenia, nowe funkcje spoza pierwszej rozmowy jako osobna wycena: konspekt. Instytut Kryptografii, Desant.pl, Trockenhaus: REALIZACJE. Rynki Polska i Niemcy: sekcja RYNKI konspektu.
- **Naprawione względem walidacji:** usunięty znacznik [DO POTWIERDZENIA] o roli, zdjęciu i profilu LinkedIn. Rola jest zapisana wprost („założyciel SimpleFast.ai"), zdjęcie i link to decyzja wdrożeniowa opisana w Uwagach, a nie brakująca dana w treści.

---

## Nowe podstrony

Wszystkie osiem pod `/uslugi/chatboty/`. Każda ma na dole sekcję „Powiązane" i link zwrotny do `/uslugi/chatboty`.

---

### P1. `/uslugi/chatboty/cennik`

- **H1:** Ile kosztuje chatbot AI dla firmy? Cennik 2026
- **metaTitle:** `Ile kosztuje chatbot AI? Cennik 2026` (36 znaków)
- **Fraza główna:** ile kosztuje chatbot ai dla firmy
- **Rozdział intencji:** strona główna usługi odpowiada na „co to daje i jak wdrażamy", ta podstrona wyłącznie na „ile to kosztuje i za co płacę". Nie powiela kroków wdrożenia ani case studies, tylko do nich linkuje. Podstrony zastosowań linkują tutaj po cenę i nie rozwijają cennika u siebie.
- **Dlaczego ta strona:** cztery z siedmiu badanych konkurentów mają osobną stronę cenową. Przy naszej sile domeny to najłatwiejsza fraza transakcyjna, bo wygrywa się ją konkretem, nie linkami.

**Kapsuła (do wklejenia jako pierwszy akapit i jako `kapsula` w danych):**

Chatbot AI dla firmy kosztuje u nas od 1790 zł netto i działa po 1-2 dniach roboczych. Bot średni to 3000-6000 zł netto i 3-4 dni robocze. Bot z integracjami to 8000-15 000 zł netto i 5-10 dni roboczych. Do tego dochodzi utrzymanie 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł miesięcznie, gdy przekazujemy ją Tobie. Tokeny modelu płacisz dostawcy wprost, według zużycia.

**Sekcje:**

1. Najkrótsza odpowiedź: chatbot AI od 1790 zł netto, gotowy w 1-2 dni robocze
2. Drabina cenowa z czasem realizacji (tabela: 1790 zł / 1-2 dni, 3000-6000 zł / 3-4 dni, 8000-15 000 zł / 5-10 dni)
3. Za co dokładnie płacisz na każdym progu
4. Trzy osobne pozycje: stworzenie, utrzymanie, zużycie tokenów
5. Dwa modele utrzymania: infrastruktura u nas 99-599 zł miesięcznie albo u Ciebie 0 zł i poprawki 350 zł netto za godzinę
6. Koszty, o których dowiadujesz się później u innych (aktualizacja bazy wiedzy, nowe funkcje spoza pierwszej rozmowy, przekazanie infrastruktury)
7. Co podnosi, a co obniża cenę Twojego chatbota
8. Chatbot czy voicebot, jeśli liczy się cena (voicebot prosty 2500 zł, z integracjami 5000-9000 zł, utrzymanie voicebota 299-1500 zł miesięcznie)
9. Rachunek na 12, 24 i 36 miesięcy dla trzech naszych wariantów (przeniesienie tabeli z sekcji 9 strony głównej)
10. Kiedy chatbot się nie opłaci i co proponujemy zamiast niego (Sprint Diagnostyczny 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów, odliczany od wdrożenia)
11. Jak przygotować się do wyceny
12. FAQ
13. CTA

**FAQ (gotowe, 8 pytań):**

**Ile kosztuje najprostszy chatbot AI?**
1790 zł netto. To bot na Twojej stronie WWW z bazą wiedzy z Twoich materiałów i ze zbieraniem leadów z rozmowy. Wdrażamy go w 1-2 dni robocze.

**Czy do ceny dochodzi coś jeszcze?**
Tak, dwie pozycje. Utrzymanie 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie. Oraz zużycie tokenów modelu, za które płacisz dostawcy wprost.

**Kto płaci za tokeny modelu językowego?**
Ty, bezpośrednio u dostawcy modelu. Konto jest Twoje, więc nie doliczamy do tego marży. Rachunek rośnie i maleje razem z liczbą rozmów.

**Czy da się taniej niż 1790 zł?**
Nie u nas. Za tę kwotę dostajesz wdrożenie z Twoimi materiałami, dwie rundy poprawek i odbiór. Jeśli budżet jest mniejszy, powiemy Ci to wprost, zamiast ciąć zakres i oddawać bota, który nie działa.

**Czy poprawki są dodatkowo płatne?**
Dwie rundy poprawek są w cenie wdrożenia. Testujesz bota przez tydzień, wdrażamy uwagi, testujesz drugi tydzień, wdrażamy kolejne i jest odbiór. Nowe funkcje spoza pierwszej rozmowy wyceniamy osobno.

**Co dokładnie podnosi cenę chatbota?**
Integracje z Twoimi systemami. Bot, który tylko odpowiada, mieści się w 1790 zł. Bot, który sprawdza status zamówienia albo dopisuje kontakt do CRM, to przedział 8000-15 000 zł, bo każdy system to osobne dostępy, testy i obsługa błędów.

**Czy mogę nie płacić abonamentu?**
Tak. Przekazujemy Ci całą infrastrukturę, wtedy utrzymanie po naszej stronie wynosi 0 zł miesięcznie. Późniejsze poprawki rozliczamy po 350 zł netto za godzinę, tylko gdy je zamówisz.

**Ile kosztuje voicebot w porównaniu z chatbotem?**
Voicebot prosty to 2500 zł netto, voicebot z integracjami, na przykład z kalendarzem, to 5000-9000 zł netto. Utrzymanie voicebota kosztuje 299-1500 zł netto miesięcznie, bo dochodzi telefonia i minuty rozmów.

- **Powiązane:** obsługa klienta, baza wiedzy, sklep internetowy, voiceboty, Sprint Diagnostyczny
- **Źródło liczb:** wszystkie kwoty z konspektu oraz decyzji właściciela z 2026-08-31 (punkt 2). Zero kwot konkurencji.

---

### P2. `/uslugi/chatboty/obsluga-klienta`

- **H1:** Chatbot do obsługi klienta, który odpowiada o 22:00
- **metaTitle:** `Chatbot do obsługi klienta dla firm` (35 znaków)
- **Fraza główna:** chatbot do obsługi klienta
- **Rozdział intencji:** wyłącznie odciążenie biura obsługi: powtarzalne pytania, noce i weekendy, przekazanie trudnej sprawy do człowieka. Nie porusza tematu leadów (to `/generowanie-leadow`), nie porusza dokumentów wewnętrznych (to `/asystent-wewnetrzny`), nie rozwija cennika (link do `/cennik`).
- **Dlaczego ta strona:** najbardziej komercyjna fraza zastosowaniowa w tym obszarze, dokładnie ten kąt biorą mits.pl i malinski.ai. Mamy pod nią dwa realne dowody: Desant.pl i Przystań Jurgen.

**Kapsuła:**

Chatbot do obsługi klienta przejmuje powtarzalne pytania i odpowiada wtedy, gdy nikogo nie ma przy biurku. U Desant.pl obsługuje 30-50 klientów miesięcznie i prowadzi 200-280 wiadomości. Kosztuje od 1790 zł netto i działa po 1-2 dniach roboczych. Trudną sprawę przekazuje człowiekowi, zamiast udawać, że umie ją domknąć.

**Sekcje:**

1. Problem jako pytanie: ile pytań w tym tygodniu zadano Ci po raz setny?
2. Co bot przejmuje, a czego nie tyka (jawna granica i moment przekazania do człowieka)
3. Tabela: bot na stronie kontra skrzynka BOK kontra dyżur telefoniczny
4. Efekt u klienta: Desant.pl, 30-50 klientów miesięcznie, 200-280 wiadomości
5. Trzy warstwy tego bota: baza wiedzy, model, przekazanie rozmowy
6. Jak wdrażamy w 1-2 dni robocze
7. Ile to kosztuje: od 1790 zł netto, utrzymanie 99-599 zł miesięcznie u nas albo 0 zł u Ciebie (link do `/cennik`)
8. Ile kosztuje miesiąc bez tego (kalkulator na Twoich liczbach, bez wartości domyślnych)
9. Czy dane klientów są bezpieczne
10. Kiedy taki bot nie ma sensu
11. Powiązane: baza wiedzy, WhatsApp i Messenger, voicebot do odbierania telefonów
12. FAQ
13. CTA

**FAQ (gotowe, 8 pytań):**

**Czy chatbot zastąpi mój dział obsługi klienta?**
Nie zastąpi, odciąży. Bierze powtarzalne pytania i wiadomości po godzinach. Twoi ludzie zostają przy sprawach, które wymagają decyzji i relacji.

**Co bot robi, gdy nie zna odpowiedzi?**
Mówi wprost, że nie wie, i przekazuje sprawę Twojemu człowiekowi razem z całym kontekstem rozmowy. Nie zgaduje i nie wymyśla.

**Skąd bot bierze odpowiedzi?**
Z Twoich materiałów: cennika, ofert, procedur, opisów produktów. Nie szuka w internecie. Jak to działa, opisujemy na stronie o bazie wiedzy.

**Ile trwa wdrożenie?**
1-2 dni robocze dla bota na stronę z bazą wiedzy. Czas liczymy od przekazania materiałów przez Ciebie, a nie od podpisania umowy.

**Ile to kosztuje?**
Od 1790 zł netto za wdrożenie. Utrzymanie to 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie. Tokeny modelu płacisz dostawcy wprost.

**Czy klient wie, że rozmawia z botem?**
Tak, mówimy o tym wprost w pierwszej wiadomości. Ukrywanie tego kończy się utratą zaufania w momencie, w którym klient i tak się zorientuje.

**Czy bot odpisze w nocy i w weekend?**
Tak, działa bez przerwy. To jest jego główna przewaga nad skrzynką, która czeka do poniedziałku.

**Czy bot może zbierać kontakty w trakcie rozmowy?**
Tak, zbieranie leadów jest w pakiecie podstawowym za 1790 zł netto. Kontakt trafia tam, gdzie go potrzebujesz: do CRM albo do arkusza.

- **Źródło liczb:** Desant.pl (30-50 klientów miesięcznie, 200-280 wiadomości): REALIZACJE. Ceny i czasy: konspekt plus decyzja punkt 2.

---

### P3. `/uslugi/chatboty/baza-wiedzy`

- **H1:** Chatbot na Twoich dokumentach: firmowa baza wiedzy (RAG)
- **metaTitle:** `Chatbot z bazą wiedzy firmy (RAG)` (33 znaki)
- **Fraza główna:** chatbot z bazą wiedzy firmy
- **Rozdział intencji:** nie o kanale i nie o branży, tylko o tym, skąd bot bierze odpowiedzi i dlaczego nie zmyśla. `/obsluga-klienta` odpowiada „kto pyta", ta strona „skąd bot wie". `/asystent-wewnetrzny` to ta sama technologia, ale inny odbiorca i tam idzie temat uprawnień.
- **Dlaczego ta strona:** fraza dotycząca mechanizmu, więc najchętniej cytowana przez modele AI. Nasz dowód jest tu unikalny na rynku PL: boty Instytutu Kryptografii wskazują dokładne miejsce w nagraniu.

**Kapsuła:**

Chatbot z bazą wiedzy szuka odpowiedzi w Twoich dokumentach, a nie w internecie. Fachowo to RAG. Wgrywamy cenniki, oferty, procedury, opisy produktów i transkrypcje nagrań, a bot odpowiada tylko na ich podstawie. Dla Instytutu Kryptografii zbudowaliśmy trzy takie boty na transkrypcjach kursów: bot wskazuje dokładne miejsce w nagraniu, w którym pada odpowiedź. Baza wiedzy jest w każdym naszym bocie, także w tym za 1790 zł netto.

**Sekcje:**

1. Problem jako pytanie: czy Twój bot potrafi pokazać, skąd wziął odpowiedź?
2. Jak działa baza wiedzy RAG, prostym językiem
3. Co możemy wgrać (dokumenty, oferty, cenniki, procedury, transkrypcje nagrań i kursów)
4. Efekt u klienta: Instytut Kryptografii, trzy boty na transkrypcjach kursów, wskazują dokładne miejsce w filmie
5. Tabela: bot z bazą wiedzy kontra bot na regułach kontra czysty model bez Twoich danych
6. Cytowanie źródła i co bot mówi, gdy nie wie
7. Jak utrzymujemy bazę aktualną i ile to kosztuje miesięcznie (99-599 zł u nas albo 0 zł u Ciebie)
8. Jak wdrażamy krok po kroku
9. Cena i czas (link do `/cennik`)
10. Twoje dane a model językowy (Claude od Anthropic, nie OpenAI)
11. Kiedy RAG nie jest odpowiedzią, bo baza wiedzy nie istnieje (Sprint Diagnostyczny 1490 zł netto)
12. Powiązane: obsługa klienta, asystent wewnętrzny, cennik
13. FAQ
14. CTA

**FAQ (gotowe, 8 pytań):**

**Co to jest RAG w chatbocie?**
To sposób pracy bota, w którym najpierw wyszukuje odpowiedź w Twoich dokumentach, a dopiero potem układa z niej zdanie. Dzięki temu odpowiada Twoją wiedzą, a nie wiedzą z internetu.

**Czy bot z bazą wiedzy może zmyślić odpowiedź?**
Ustawiamy go tak, żeby trzymał się dokumentów, a gdy nie znajdzie odpowiedzi, mówił wprost, że nie wie. To jest ważniejsze niż to, żeby zawsze coś odpowiedział.

**Jakie pliki mogę wgrać do bazy wiedzy?**
Cenniki, oferty, opisy produktów, procedury, regulaminy, instrukcje, transkrypcje nagrań i szkoleń. Nie muszą być poukładane, uporządkowanie jest częścią wdrożenia.

**Czy bot poda źródło swojej odpowiedzi?**
Tak, jeśli tego chcesz. Dla Instytutu Kryptografii boty wskazują dokładne miejsce w nagraniu kursu, w którym pada odpowiedź.

**Czy baza wiedzy jest tylko w droższych botach?**
Nie. Jest w każdym naszym bocie, także w tym za 1790 zł netto. W droższych progach różni się jej objętość i liczba ścieżek rozmowy, a nie sama technologia.

**Jak często trzeba aktualizować bazę wiedzy?**
Tyle razy, ile razy zmienia się Twoja oferta albo procedura. Przy infrastrukturze u nas aktualizacje mieszczą się w utrzymaniu 99-599 zł netto miesięcznie.

**Czy moje dokumenty uczą model językowy?**
Do modelu trafia treść rozmowy, żeby powstała odpowiedź. Korzystamy z modelu Claude firmy Anthropic i nie korzystamy z modeli OpenAI. Umowę powierzenia przetwarzania danych podpisujemy przed startem.

**Co, jeśli nie mamy spisanej wiedzy?**
Wtedy bot nie ma z czego korzystać i mówimy to wprost. Zaczynamy od Sprintu Diagnostycznego za 1490 zł netto: pięć dni roboczych, raport PDF z mapą procesów, kwota odliczana od późniejszego wdrożenia.

- **Źródło liczb:** Instytut Kryptografii (3 boty na transkrypcjach, wskazywanie miejsca w filmie): REALIZACJE. Ceny: konspekt plus decyzja punkt 2. Dostawca modelu: decyzja punkt 5.

---

### P4. `/uslugi/chatboty/sklep-internetowy`

- **H1:** Chatbot AI dla sklepu internetowego
- **metaTitle:** `Chatbot AI do sklepu internetowego` (34 znaki)
- **Fraza główna:** chatbot dla sklepu internetowego
- **Rozdział intencji:** jedyna podstrona o koszyku, dostępności produktu, statusie zamówienia i zwrotach. `/obsluga-klienta` zostaje przy pytaniach ogólnych, tutaj wchodzą integracje ze sklepem i bazą produktową, czyli próg 8000-15 000 zł. Nie powiela sekcji o RAG, linkuje do `/baza-wiedzy`.
- **Dlaczego ta strona:** e-commerce to najliczniejsza grupa kupujących chatboty w Polsce, a wśród badanych tylko malinski.ai dotyka doradcy produktowego, i to jednym akapitem.

**Sekcje:**

1. Problem jako pytanie: ile koszyków tracisz na pytaniu, którego nikt nie odebrał?
2. Co bot robi w sklepie (dostępność, dobór produktu, status zamówienia, zwroty i reklamacje, przekazanie do człowieka)
3. Integracje: baza produktów, system zamówień, CRM
4. Tabela: bot zintegrowany ze sklepem kontra widget FAQ kontra strona pomocy
5. Jak wdrażamy (5-10 dni roboczych przy integracjach)
6. Ile to kosztuje: próg z integracjami 8000-15 000 zł netto plus utrzymanie i tokeny (link do `/cennik`)
7. Ile kosztuje miesiąc bez tego (kalkulator na Twoich liczbach, bez wartości domyślnych)
8. Kiedy wystarczy Ci bot za 1790 zł i nie potrzebujesz integracji
9. Twoje dane i dane klientów
10. Powiązane: obsługa klienta, generowanie leadów, cennik
11. FAQ
12. CTA

- **Uwaga do treści:** na tej stronie nie ma sekcji z efektem u klienta, bo nie mamy jeszcze wdrożenia e-commerce z nazwą. Dowodem jest mechanizm, żywy bot do przetestowania na `/uslugi/chatboty` i jawny cennik. Zero liczb wynikowych i zero cudzych statystyk.
- **Naprawione względem walidacji:** wycięty planowany placeholder na case study, bo w finalnej treści nie może stać znacznik roboczy.

---

### P5. `/uslugi/chatboty/generowanie-leadow`

- **H1:** Chatbot, który zbiera i kwalifikuje leady
- **metaTitle:** `Chatbot do zbierania leadów B2B` (31 znaków)
- **Fraza główna:** chatbot do zbierania leadów
- **Rozdział intencji:** strona sprzedażowa, nie obsługowa. Bot zamienia anonimowy ruch w kontakt z kompletem informacji dla handlowca. `/obsluga-klienta` odpowiada istniejącym klientom, ta strona łapie nowych. Nie porusza bazy produktowej ani kanałów.
- **Dlaczego ta strona:** kwalifikowanie leadów wymieniają mits.pl i malinski.ai, ale żaden z badanych nie zrobił z tego osobnej strony docelowej. To też najkrótsza droga do sprzedaży progu 1790 zł, bo zbieranie leadów jest w tym pakiecie standardem.

**Sekcje:**

1. Problem jako pytanie: ilu odwiedzających wyszło ze strony, nie zostawiając nic?
2. Jakie pytania bot zadaje, żeby handlowiec dostał gotowy kontakt
3. Co ląduje w CRM albo arkuszu i jak wygląda powiadomienie
4. Tabela: bot kwalifikujący kontra zwykły formularz kontaktowy kontra czat z pracownikiem
5. Jak wdrażamy w 1-2 dni robocze
6. Cena: od 1790 zł netto, zbieranie leadów jest w pakiecie podstawowym (link do `/cennik`)
7. Ile kosztuje miesiąc bez tego (kalkulator na Twoich liczbach, bez wartości domyślnych)
8. Bot zbiera leady, my możemy je też dostarczyć: baza B2B ze scrapowania Google Maps, 1000 rekordów 169 zł netto, 5000 rekordów 699 zł netto, 10 000 rekordów 1390 zł netto. Automat robi 1000 rekordów w 20-30 minut. Ręcznie to około 3 minuty na rekord, czyli około 50 godzin na tysiąc.
9. Zgody i dane osobowe
10. Kiedy to nie zadziała (mały ruch na stronie)
11. Powiązane: obsługa klienta, WhatsApp i Messenger, cennik
12. FAQ
13. CTA

- **Źródło liczb:** leady B2B (169 / 699 / 1390 zł, 20-30 minut na 1000 rekordów automatem, około 3 minuty na rekord ręcznie, źródło Google Maps, tylko B2B): konspekt. Przeliczenie 1000 × 3 minuty = 3000 minut = 50 godzin jest pokazane w treści.

---

### P6. `/uslugi/chatboty/whatsapp-messenger`

- **H1:** Chatbot na WhatsApp i Messengerze
- **metaTitle:** `Chatbot na WhatsApp i Messengera` (32 znaki)
- **Fraza główna:** chatbot na whatsapp dla firm
- **Rozdział intencji:** jedyna podstrona o kanale, nie o zastosowaniu. Odpowiada „gdzie bot rozmawia", podczas gdy pozostałe odpowiadają „po co". Zastosowania opisujemy jednym zdaniem z linkiem, żeby nie kanibalizować obsługi klienta ani leadów.
- **Dlaczego ta strona:** wielokanałowość u malinski.ai to osobny, najdroższy próg, a mits.pl trzyma listę kanałów bez własnej strony. Fraza o WhatsAppie ma stały wolumen i słabą konkurencję organiczną w Polsce.

**Kapsuła:**

Ten sam chatbot może odpowiadać na Twojej stronie WWW, na WhatsAppie, Messengerze, Instagramie i Telegramie. To jest pełna lista kanałów, które wdrażamy. Baza wiedzy jest jedna, zmienia się tylko okno, w którym pojawia się odpowiedź. Dołożenie kanału do gotowego bota mieści się w progu średnim, czyli 3000-6000 zł netto i 3-4 dni robocze.

**Sekcje:**

1. Problem jako pytanie: gdzie naprawdę piszą do Ciebie klienci?
2. Pięć kanałów, które wdrażamy: strona WWW, WhatsApp, Messenger, Instagram, Telegram. Co zmienia się w każdym z nich
3. To jest pełna lista. Jeśli pytasz o kanał spoza niej, mówimy wprost, że go nie robimy, zamiast obiecywać na wyrost
4. Ten sam bot, jedna baza wiedzy, wiele kanałów
5. Tabela porównawcza kanałów (co daje, czego nie da, co trzeba mieć po swojej stronie)
6. Co trzeba mieć, żeby uruchomić bota na WhatsAppie
7. Jak wdrażamy (3-4 dni robocze przy dołożeniu kanału)
8. Cena: próg średni 3000-6000 zł netto (link do `/cennik`)
9. Zgody, dane i archiwizacja rozmów
10. Kiedy dokładanie kanału nie ma sensu
11. Powiązane: obsługa klienta, generowanie leadów, voiceboty
12. FAQ
13. CTA

**FAQ (gotowe, 8 pytań):**

**Na jakich kanałach uruchamiacie chatbota?**
Na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie. To jest pełna lista. Jeśli pytasz o kanał spoza niej, powiemy wprost, że go nie robimy.

**Czy to musi być osobny bot na każdy kanał?**
Nie. Baza wiedzy jest jedna i obsługuje wszystkie kanały naraz. Dokładamy kanał do gotowego bota, nie budujemy go drugi raz.

**Ile kosztuje dołożenie WhatsAppa do istniejącego bota?**
Mieści się w progu średnim, czyli 3000-6000 zł netto, i zajmuje 3-4 dni robocze. Dokładna kwota zależy od liczby kanałów i zakresu.

**Co muszę mieć po swojej stronie, żeby ruszyć na WhatsAppie?**
Firmowy numer telefonu i konto firmowe u dostawcy. Warunki i limity WhatsApp Business API sprawdzamy z Tobą na pierwszej rozmowie, bo zmieniają się częściej niż nasza strona.

**Czy bot na Messengerze i Instagramie to to samo?**
Mechanizm jest ten sam, różni się miejsce, w którym pojawia się okno rozmowy. Oba mają sens, jeśli ruch przychodzi Ci z reklam i postów.

**Czy rozmowy z WhatsAppa gdzieś się zapisują?**
Tak, historia rozmów jest zapisywana, żeby bot pamiętał kontekst i żebyś mógł do niej wrócić. Zakres i czas przechowywania ustalamy przed startem.

**Czy dodanie kanału zmienia utrzymanie?**
Może zmienić, bo każde okno to osobne podpięcie do pilnowania. Utrzymanie mieści się w przedziale 99-599 zł netto miesięcznie, gdy infrastruktura stoi u nas, albo 0 zł, gdy przekazujemy ją Tobie.

**Kiedy nie warto dokładać kolejnego kanału?**
Gdy klienci na nim do Ciebie nie piszą. Kanał bez ruchu to kolejne miejsce do pilnowania i żadnej rozmowy więcej.

- **Źródło liczb:** lista kanałów i wykluczenie Slacka oraz Teams: decyzja właściciela z 2026-08-31, punkt 4. Próg średni 3000-6000 zł i 3-4 dni robocze, utrzymanie: konspekt plus decyzja punkt 2.
- **Naprawione względem walidacji:** BLOKER (Slack i Teams usunięte z całej podstrony, dodane zdanie wprost, że ich nie robimy).

---

### P7. `/uslugi/chatboty/asystent-wewnetrzny`

- **H1:** Asystent AI dla pracowników: procedury bez pytania kolegi
- **metaTitle:** `Asystent AI dla pracowników firmy` (33 znaki)
- **Fraza główna:** chatbot wewnętrzny dla firmy
- **Rozdział intencji:** odbiorcą jest pracownik, nie klient. Inna jest treść bazy (procedury, instrukcje, regulaminy, szkolenia) i dochodzi temat uprawnień do dokumentów. `/baza-wiedzy` tłumaczy mechanizm RAG i tam linkujemy, `/obsluga-klienta` zostaje przy kliencie zewnętrznym.
- **Dlaczego ta strona:** wewnętrznego asystenta wymieniają mits.pl i malinski.ai, ale nikt nie zrobił z tego strony. To zastosowanie kupują średnie firmy z rotacją i procedurami, czyli klient o wyższym budżecie.

**Sekcje:**

1. Problem jako pytanie: ile razy dziennie ktoś w firmie pyta kolegę o to, co jest w procedurze?
2. Co asystent wie i skąd (procedury, instrukcje, regulaminy, nagrania szkoleń)
3. Kto ma dostęp do czego (uprawnienia i podział bazy)
4. Efekt u klienta: Instytut Kryptografii, trzy boty na transkrypcjach kursów, wskazują dokładne miejsce w filmie
5. Tabela: asystent wewnętrzny kontra intranet z wyszukiwarką kontra pytanie doświadczonego pracownika
6. Gdzie go uruchamiamy: w przeglądarce, na wewnętrznej stronie firmowej, albo na Telegramie. To jest pełna lista miejsc, w których go stawiamy
7. Jak wdrażamy i ile to trwa
8. Cena i utrzymanie (link do `/cennik`)
9. Twoje dokumenty a model językowy (Claude od Anthropic, nie OpenAI)
10. Kiedy to nie zadziała (rozproszona i nieaktualna dokumentacja, wtedy Sprint Diagnostyczny 1490 zł netto)
11. Chatbot na zewnątrz czy automatyzacja do wewnątrz: jeśli chodzi Ci o proces, a nie o pytania pracowników, zacznij od AI Start za 1990 zł netto
12. Powiązane: baza wiedzy, automatyzacje, Sprint Diagnostyczny
13. FAQ
14. CTA

- **Uwaga do treści:** w portfolio mamy zbudowanego agenta głosowego z wiedzą o firmie, tak zwany drugi mózg. Opisywać bezosobowo: „mamy w portfolio zbudowane". Nigdy „zbudowaliśmy dla siebie".
- **Naprawione względem walidacji:** BLOKER (planowany „komunikator wewnętrzny" oznaczał Slack i Teams; zastąpione przeglądarką, wewnętrzną stroną firmową i Telegramem, z jawnym zdaniem o tym, czego nie robimy).

---

### P8. `/uslugi/chatboty/hotele-pensjonaty`

- **H1:** Chatbot dla hotelu i pensjonatu
- **metaTitle:** `Chatbot dla hotelu i pensjonatu` (31 znaków)
- **Fraza główna:** chatbot dla hotelu
- **Rozdział intencji:** jedyna podstrona branżowa: sezonowość, pytania o dostępność i cenę pobytu, doba hotelowa, zwierzęta, parking, wieczorne i weekendowe zapytania. Zastosowania ogólne tylko linkujemy.
- **Dlaczego ta strona:** strony branżowe działają u konkurencji (malinski.ai ma wdrożenie w klinice, momentumsquads.com ma nazwane branże), a w segmencie hotelarskim organik w Polsce jest słaby. Mamy tu jedyny pasujący dowód z nazwą: Przystań Jurgen. To też szablon do powielenia na kolejne branże.

**Sekcje:**

1. Problem jako pytanie: kto odpowiada na pytanie o wolny termin w piątek o 21:00?
2. Na co odpowiada bot w obiekcie noclegowym (dostępność, cena pobytu, doba hotelowa, zwierzęta, parking, dojazd)
3. Efekt u klienta: Przystań Jurgen, strona WWW plus chatbot, sezonowo około 100 zapytań od 20-50 klientów
4. Tabela: bot kontra telefon w recepcji kontra formularz kontaktowy
5. Sezon: bot pracuje w szczycie i nie kosztuje więcej poza sezonem
6. Jak wdrażamy w 1-2 dni robocze
7. Cena: od 1790 zł netto, utrzymanie 99-599 zł miesięcznie u nas albo 0 zł u Ciebie (link do `/cennik`)
8. Bot na stronie i bot na WhatsAppie, co wybrać
9. Kiedy lepszy będzie voicebot odbierający telefon (voicebot prosty 2500 zł netto)
10. Nie masz jeszcze strony: landing 1590 zł netto w jeden dzień roboczy, strona biznesowa 2900 zł netto w 2-4 dni robocze
11. Kiedy to się nie opłaci
12. Powiązane: obsługa klienta, WhatsApp i Messenger, strony WWW
13. FAQ
14. CTA

- **Źródło liczb:** Przystań Jurgen: REALIZACJE. Voicebot prosty 2500 zł: konspekt. Ceny stron WWW: decyzja właściciela z 2026-08-31, punkt 1.

---

## Uwagi dla sesji wdrożeniowej

1. **Kolejność wstawiania sekcji.** Sekcje 1 i 2 idą między `rozwiazanie` a `tabelaPorownawcza`. Sekcje 3 i 4 między `tabelaPorownawcza` a `kroki`. Sekcje 5, 6 i 7 między `kroki` a `ramaCeny`. Sekcje 8, 9 i 10 między `ramaCeny` a `powiazane`. Sekcja 11 między `faq` a `cta`.

2. **Sekcja 5 wysoko.** Walidator zwrócił uwagę, że case studies z nazwami to najmocniejszy materiał do cytowania. Jeśli układ strony na to pozwoli, warto ją podnieść, ale nie kosztem rozbicia bloku cenowego (sekcje 8, 9, 10 muszą stać razem po `ramaCeny`).

3. **Kalkulator w sekcji 7.** Cztery pola, wszystkie puste na starcie. Zero `placeholder` z kwotą, zero `defaultValue`. Placeholdery mogą opisywać jednostkę („liczba", „minuty", „zł"), ale nigdy przykładową wartość. Wzory z sekcji 7 mają być widoczne na stronie, nie tylko w kodzie. Wzorzec działa już w `/narzedzia#kalkulator-procesu` („Koszt podajesz Ty").

4. **Rejestr podstron.** Osiem nowych adresów pod `/uslugi/chatboty/`. Trzeba je dopisać do `sitemap`, do rejestru podstron usług i do wewnętrznego linkowania. Każda podstrona linkuje zwrotnie do `/uslugi/chatboty` i do `/uslugi/chatboty/cennik`.

5. **Kolor kategorii.** Wszystkie osiem podstron dziedziczy kolor kategorii `chatboty` z istniejącej strony usługi. Bez własnych akcentów.

6. **JSON-LD.** `minPrice: 1790` zostaje bez zmian na stronie głównej usługi. Na `/uslugi/chatboty/cennik` warto dołożyć FAQPage JSON-LD z ośmioma pytaniami z tej podstrony, bo to strona zbudowana pod cytowanie.

7. **Model utrzymania musi brzmieć identycznie w czterech miejscach.** Sekcje 1, 6, 8 i 9 na stronie głównej oraz punkty 5 i 7 na `/cennik`. Formuła: „infrastruktura u nas: 99-599 zł netto miesięcznie; infrastruktura przekazana Tobie: 0 zł miesięcznie, poprawki 350 zł netto za godzinę". Jeśli ktoś zmieni to w jednym miejscu, musi zmienić we wszystkich.

8. **Slack i Microsoft Teams.** Nie wolno ich wymieniać jako kanałów chatbota nigdzie w tym pakiecie ani w istniejącej treści. Meet, Zoom i Teams pojawiają się wyłącznie przy osobnej usłudze auto-podsumowań spotkań i nie mieszamy tego z chatbotem.

9. **Dostawca modelu.** Wszędzie Anthropic i Claude. Żaden nagłówek ani żadne zdanie nie może sugerować OpenAI. Nazwy technicznej modelu (claude-haiku-4-5) nie wstawiamy do treści marketingowej, bo się zmienia. Wystarczy „Claude od Anthropic".

10. **Opcjonalna korekta istniejącego FAQ.** Pytanie „Gdzie działa chatbot?" odpowiada dziś ogólnikiem o „popularnych komunikatorach". Po decyzji właściciela z 2026-08-31 można je uściślić: „Na Twojej stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie. Jedna baza wiedzy, ten sam bot, wiele kanałów." To jedyna proponowana zmiana w istniejącej treści i jest opcjonalna.

11. **Blok autorski w sekcji 11.** Treść jest kompletna bez zdjęcia. Zdjęcie i link do profilu to decyzja wizualna sesji wdrożeniowej, a nie brakująca dana. Bez zdjęcia blok działa, ze zdjęciem działa mocniej jako sygnał E-E-A-T.

12. **Odniesienie rynkowe do cen stron WWW.** Jeśli sesja wdrożeniowa zdecyduje się pokazać porównanie rynkowe przy cenach stron (sekcja 10 i podstrona P8), jedyne dopuszczalne źródło to projektowaniestroncennik.pl, sprawdzone 2026-08-31: 1900 / 2500 / 4000 zł. Zawsze z nazwą domeny i datą. Żadnych innych cen konkurencji w całym pakiecie nie ma i nie wolno ich dopisać z pamięci.
