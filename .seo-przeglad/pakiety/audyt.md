# Pakiet wdrozeniowy: Audyt AI (Sprint Diagnostyczny)

**Adres strony:** https://www.simplefast.ai/uslugi/audyt-ai
**Plik zrodlowy tresci:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\lib\uslugi\audyt-ai.ts`
**Data pakietu:** 2026-08-31

Pakiet dokłada do istniejącej strony audytu dziewięć nowych sekcji i sześć nowych podstron. Strona przestaje mówić wyłącznie „mapa procesów za 1490 zł" i zaczyna odpowiadać na pytania, które klient realnie wpisuje w Google: co dostaję w raporcie, ile to trwa dzień po dniu, ile mnie kosztuje po audycie, kiedy nie warto i co robicie z moimi danymi.

---

## Czego NIE ruszamy

Wszystkie istniejące sekcje w `lib/uslugi/audyt-ai.ts` zostają bez zmian. Nowe sekcje wchodzą MIĘDZY nie, nigdy zamiast nich.

| # | Sekcja w kodzie | H2 na stronie | Status |
|---|---|---|---|
| 1 | `problem` | Skąd wiesz, gdzie wdrożyć AI, żeby nie przepalić kasy? | bez zmian |
| 2 | `rozwiazanie` | Co dokładnie dostajesz w Sprincie Diagnostycznym? | bez zmian |
| 3 | `tabelaPorownawcza` | Wdrażanie AI na czuja a Sprint Diagnostyczny | bez zmian |
| 4 | `kroki` | Jak wygląda audyt AI krok po kroku? | bez zmian |
| 5 | `ramaCeny` | Ile kosztuje audyt AI firmy? | bez zmian |
| 6 | `faq` (6 pytań) | sekcja FAQ | bez zmian |
| 7 | `cta` | Pokaż mi, gdzie tracę czas | bez zmian |
| 8 | `powiazane` | narzędzia (test gotowości, kalkulator) | bez zmian |

Bez zmian zostają też: `kapsula`, `metaTitle`, `metaDescription`, `h1`, `queries`, `minPrice`, `linkPoradnik`.

---

## Nowe sekcje na istniejącej stronie

Dziewięć sekcji. Kolejność wdrożenia = kolejność poniżej.

---

### 1. Ile kosztuje Cię miesiąc bez audytu AI?

- **Gdzie wstawić:** po sekcji `problem`, przed sekcją `rozwiazanie`
- **Po co:** łapie „czy audyt AI się opłaca", „ile można zaoszczędzić na automatyzacji". Koszt bezczynności ma malinski.ai, ROI na przykładach ma multi-future.pl, ale obaj liczą na wymyślonych danych. My liczymy na podpisanych klientach. H2 niesie frazę główną.
- **Typ:** akapit + tabela + kalkulator

**TREŚĆ:**

Kiedy odkładasz decyzję, nic złego się nie dzieje. I na tym polega problem.

Te same godziny wracają w kolejnym miesiącu, tylko już ich nie widać w żadnym zestawieniu. Poniżej cztery firmy, które przeszły przez to samo pytanie.

Liczby są z naszych wdrożeń, nie z przykładu w internecie.

| Firma | Proces, który zżerał czas | Jak było | Jak jest teraz |
|---|---|---|---|
| Trockenhaus (Niemcy, osuszanie piwnic i remonty) | Przygotowanie oferty dla klienta | 2 do 4 godzin | 20 minut |
| Trockenhaus | Wystawienie rachunku | około godziny | około 5 minut |
| Y-Ads (agencja, 12 osób, 8 do 13 klientów równolegle) | Codzienna praca operacyjna menedżera | 4 godziny dziennie | 30 minut dziennie |
| Onyx | Ręczne wprowadzanie faktur, około 120 miesięcznie | 3 do 5 minut na fakturę | zdjęcie faktury |
| Instytut Kryptografii | Odpisywanie na maile, do 580 tygodniowo w szczycie | każdy mail pisany od zera | 80% draftów gotowych do wysłania bez poprawek |

Policz to na swoim kalendarzu. W Onyksie było 120 faktur miesięcznie po 3 do 5 minut.

To daje od 360 do 600 minut, czyli od 6 do 10 godzin miesięcznie na jednej czynności, której nikt w firmie nie lubi.

Menedżer Y-Ads odzyskał 3,5 godziny każdego dnia roboczego, bo z 4 godzin zeszło do 30 minut. Nie na urlop, tylko na klientów, których wcześniej nie miał kiedy obsłużyć.

Każdy miesiąc zwłoki to te same godziny jeszcze raz. Sprint Diagnostyczny kosztuje 1490 zł netto i pięć dni roboczych.

**KALKULATOR (element interaktywny pod tabelą)**

Nagłówek nad kalkulatorem: **Policz swój jeden proces**

Zdanie wprowadzające: „Nie podpowiadamy Ci żadnych kwot. Wpisz swoje liczby, a wynik policzy się sam."

Trzy pola, WSZYSTKIE PUSTE PRZY STARCIE (bez wartości domyślnych, bez przykładowych stawek):

| Etykieta pola | Podpowiedź w polu (placeholder) | Typ |
|---|---|---|
| Ile razy w miesiącu robicie tę czynność? | (puste) | liczba całkowita |
| Ile minut zajmuje jeden raz? | (puste) | liczba całkowita |
| Twoja stawka godzinowa netto (zł) | (puste) | liczba |

Wynik pokazujemy dopiero, gdy wypełnione są wszystkie trzy pola. Do tego czasu w miejscu wyniku stoi zdanie: „Wpisz trzy liczby powyżej, żeby zobaczyć wynik."

Wynik w trzech linijkach:
- „To **X godzin miesięcznie** na jednej czynności."
- „W skali roku: **Y godzin**."
- „Przy Twojej stawce to **Z zł netto rocznie**."

Wzory (do wpisania w komponencie):
- `godziny_mies = (razy_w_mies * minut_na_raz) / 60`
- `godziny_rok = godziny_mies * 12`
- `zl_rok = godziny_rok * stawka`

Zdanie pod wynikiem: „Sprint Diagnostyczny robi to dla wszystkich procesów w firmie naraz, a nie tylko dla tego jednego."

- **Źródło liczb:** Trockenhaus (oferta 2-4 h do 20 min, rachunek 1 h do ok. 5 min), Y-Ads (4 h do 30 min dziennie, 12 osób, 8-13 klientów), Onyx (ok. 120 faktur miesięcznie, 3-5 min ręcznie), Instytut Kryptografii (80% draftów gotowych do wysłania bez poprawek, 580 maili tygodniowo w szczycie): konspekt firmy, sekcja realizacje. Przeliczenie 6-10 h: 120 × 3 min = 360 min = 6 h, 120 × 5 min = 600 min = 10 h, działanie pokazane w tekście. Przeliczenie 3,5 h: 4 h minus 30 min, działanie pokazane w tekście. Cena 1490 zł netto i 5 dni roboczych: cennik. Kalkulator nie zawiera ANI JEDNEJ liczby od nas, wszystkie wpisuje klient.

---

### 2. Co dostaję w raporcie z audytu AI?

- **Gdzie wstawić:** po sekcji `rozwiazanie`, przed sekcją `tabelaPorownawcza`
- **Po co:** łapie „co zawiera audyt AI", „raport z audytu AI", „przykładowy audyt AI". ninjatech.pl publikuje raport rozpisany na rozdziały, dokodu.it na sześć deliverables. My mamy w cenniku tylko hasło „raport PDF z mapą procesów", więc klient nie wie, za co płaci. H2 niesie frazę główną.
- **Typ:** karty (5 sztuk)

**TREŚĆ:**

Raport PDF brzmi jak coś, co ląduje w szufladzie. Dlatego pokazujemy z góry, z czego się składa.

Pięć rozdziałów. Każdy odpowiada na inne pytanie, które zadajesz sobie przed wydaniem pieniędzy.

**ROZDZIAŁ 1. Mapa procesów z czasem i kosztem**
Spis tego, co realnie dzieje się w firmie każdego dnia, z liczbą godzin przy każdym procesie. Większość właścicieli pierwszy raz widzi tu, gdzie idzie czas zespołu.

**ROZDZIAŁ 2. Ocena każdego procesu: zysk i trudność**
Każdy proces dostaje dwie oceny: ile realnie odda jego automatyzacja i jak trudno to wdrożyć. Wygrywa to, co da najwięcej najmniejszym kosztem.

**ROZDZIAŁ 3. Kolejność wdrożeń, od największego zwrotu**
Procesy ustawione od najbardziej opłacalnego. Wiesz, od czego zacząć, żeby pierwszy krok dał szybki zwrot, a nie ciągnął się miesiącami.

**ROZDZIAŁ 4. Czego nie ruszać i dlaczego**
Rozdział, którego nie znajdziesz w prezentacjach sprzedażowych. Wypisujemy procesy zbyt rzadkie, żeby się opłacały, i te, które taniej wychodzi Ci zrobić samemu.

**ROZDZIAŁ 5. Konkretne kroki z ceną i terminem**
Co robimy najpierw, a co dopiero po pierwszym zwrocie. Przy pierwszym kroku wpisujemy kwotę i liczbę dni roboczych z naszego cennika.

Raport jest Twój. Możesz go zanieść dowolnej innej firmie wdrożeniowej i zrealizować z nią.

Piszemy go jako plan działania, a nie jako dokument, który działa tylko z nami.

- **Źródło liczb:** rozdziały 2, 3, 4 i 5 to 1:1 zakres Action Planu opisany już na żywej stronie w sekcji `rozwiazanie` (przełącznik CZĘŚĆ 1 do CZĘŚĆ 4). Rozdział 1 (mapa procesów) i forma PDF: cennik. Zero nowych obietnic zakresu. Cena nie pada w tej sekcji, bo pada w sekcji 1 i w istniejącej `ramaCeny`.

---

### 3. Dla jakiej firmy audyt AI ma sens?

- **Gdzie wstawić:** po nowej sekcji 2, przed sekcją `tabelaPorownawcza`
- **Po co:** łapie długi ogon „audyt AI dla małej firmy", „audyt AI dla firmy usługowej". codescriptum.pl rozpisuje persony, condictor.pl ma „Kiedy tego potrzebujesz", agisona.pl „Dla jakich firm". H2 niesie frazę główną.
- **Typ:** karty (6 sztuk) z przyciskiem po czwartej

**TREŚĆ:**

Nie każda firma potrzebuje diagnozy. Poniżej sytuacje, w których ludzie do nas piszą.

Jeśli rozpoznasz swoją w dwóch pierwszych zdaniach, Sprint ma sens.

**KARTA 1. Właściciel małej firmy, który wciąż robi to sam**
Sygnał: oferty, faktury i odpowiedzi na maile nadal robisz sam, bo nikt inny nie zrobi tego dobrze. Wieczorem nadrabiasz to, na co nie było czasu w dzień.

**KARTA 2. Firma usługowa, która wysyła dużo ofert i kosztorysów**
Sygnał: każda oferta powstaje od zera, choć w większości wygląda tak samo. Trockenhaus zszedł tu z 2 do 4 godzin na ofertę do 20 minut.

**KARTA 3. Dział obsługi klienta zasypany mailami i telefonami**
Sygnał: te same pytania wracają co tydzień, a klient czeka na odpowiedź dobę. Instytut Kryptografii miał w szczycie 580 maili tygodniowo.

**KARTA 4. Biuro rachunkowe albo dział księgowości**
Sygnał: dokumenty przepisywane ręcznie, po kilka minut na sztukę, i nikt nie wie, ile to kosztuje w skali roku.

> **PRZYCISK CTA TUTAJ, po karcie 4.** Etykieta: „Zamów Sprint Diagnostyczny". Href: `#diagnoza`. Mikrokopia pod przyciskiem: „1490 zł netto, 5 dni roboczych, kwota schodzi z wdrożenia."

**KARTA 5. Menedżer, który zarządza zespołem i klientami naraz**
Sygnał: dzień schodzi na pilnowanie statusów i przeklejanie danych między narzędziami. W Y-Ads menedżer robił to 4 godziny dziennie, teraz 30 minut.

**KARTA 6. Firma produkcyjna albo zespół sprzedaży z ręcznym raportowaniem**
Sygnał: papier i pamięć ludzi zamiast systemu. W ZB Bielizsy pracuje 14 osób na 5 stanowiskach, a w KNF Team raportowanie obsługuje 12 handlowców i 3 menedżerów.

Nie ma tu Twojej sytuacji? Napisz w formularzu, co Cię uwiera.

Odpowiemy uczciwie, czy Sprint coś zmieni, czy tylko potwierdzi to, co już wiesz.

- **Źródło liczb:** Trockenhaus (2-4 h do 20 min), Instytut Kryptografii (580 maili tygodniowo w szczycie), Y-Ads (4 h do 30 min dziennie), ZB Bielizsy (14 osób, 5 stanowisk), KNF Team (12 handlowców, 3 menedżerów): konspekt firmy, sekcja realizacje. Cena 1490 zł i 5 dni: cennik. Usunięte widełki „5 do 20 osób" i „w 80 procentach", bo nie mają pokrycia w konspekcie.
- **UWAGA WDROŻENIOWA:** karty NIE mają linków. Podstrony `/uslugi/audyt-ai/dla-malej-firmy`, `/obsluga-klienta`, `/dla-biura-rachunkowego` nie istnieją w repo (sprawdzone: `lib/uslugi/podstrony/` zawiera tylko trzy podstrony voicebotów). Linki dokładamy dopiero po opublikowaniu podstron z tego pakietu.

---

### 4. Ile kosztuje dojście do tej samej decyzji inną drogą?

- **Gdzie wstawić:** po sekcji `tabelaPorownawcza`, przed sekcją `kroki`
- **Po co:** łapie „ile kosztuje audyt AI", „audyt AI cennik". Nasza obecna tabela ma tylko dwie kolumny (na czuja kontra sprint). sukcesai.com pokazuje pięć ścieżek z kosztem każdej.
- **Typ:** tabela + akapity

**TREŚĆ:**

Sprint Diagnostyczny to jedna z czterech dróg do tej samej decyzji: co w tej firmie automatyzować najpierw.

Trzy z nich mają cenę, której nikt nie liczy: godziny zespołu, złe wdrożenie i czekanie.

| Droga | Ile kosztuje | Ile trwa | Co dostajesz na końcu |
|---|---|---|---|
| Nic nie robimy | pozornie 0 zł, realnie godziny zespołu co miesiąc | bez końca | ryzyko, że pierwsze wdrożenie zrobisz na oko |
| Kupujemy narzędzie na oko | cena narzędzia plus wdrożenie | zależy od dostawcy | działające narzędzie, ale bez odpowiedzi, czy ten proces w ogóle nadawał się do automatyzacji |
| Audyt u innej firmy | cena zwykle nie jest podana publicznie, dostajesz ją po rozmowie | terminu też zwykle nie podają | raport, zwykle bez odliczenia ceny od wdrożenia |
| Sprint Diagnostyczny | 1490 zł netto | 5 dni roboczych | raport PDF z mapą procesów i pierwszym krokiem z ceną, a 1490 zł schodzi z wdrożenia |

Najdroższa jest zwykle druga droga. Nie dlatego, że narzędzie jest złe.

Dlatego, że automatyzuje proces, który wcześniej trzeba było uprościć albo skasować.

U nas pełne wdrożenie automatyzacji to od 3000 do 10000 zł netto. Tyle ryzykujesz, jeśli trafi w zły proces.

Pierwsza droga wygląda na bezpłatną, bo koszt siedzi w godzinach zespołu. A te już są w budżecie i nikt ich nie liczy osobno.

- **Źródło liczb:** Sprint 1490 zł netto, 5 dni roboczych, odliczany od wdrożenia oraz automatyzacja pełne wdrożenie 3000-10000 zł netto: cennik, z jawnym zaznaczeniem w tekście, że to NASZA cena. Widełki konkurencji (1900-9900 zł, 2-4 tygodnie) USUNIĘTE: nikt ich realnie nie zobaczył na żadnej stronie, więc nie wolno ich publikować. W ich miejsce weszło zdanie jakościowe o braku jawnych cenników, oparte na rozpoznaniu jedenastu konkurentów (agisona.pl, ninjatech.pl, dokodu.it, multi-future.pl i pozostali nie podają kwot na stronach usług).

---

### 5. Jak wygląda audyt AI dzień po dniu i ile czasu zajmie Tobie?

- **Gdzie wstawić:** po sekcji `kroki`, przed sekcją `ramaCeny`
- **Po co:** łapie „ile trwa audyt AI", „jak wygląda audyt AI", „ile czasu zajmuje audyt AI". Konkurencja: mits.pl 3-4 tygodnie, dokodu.it 2-3 tygodnie, condictor.pl 1-2 tygodnie, wpraktyce.ai i ninjatech.pl w ogóle nie podają terminu. Jedynie smartcodeit.pl deklaruje 3-7 dni. Nasze pięć dni rozpisane na dni to najmocniejsza przewaga w tym obszarze. H2 niesie frazę główną.
- **Typ:** lista + podblok

**TREŚĆ:**

Od startu do raportu mija pięć dni roboczych. Czas liczymy od przekazania kompletu materiałów, nie od podpisania umowy.

**Dzień 1. Rozmowa i spisanie procesów**
Jedna rozmowa online z Tobą i osobą, która zna firmę od środka. Wychodzimy z listą wszystkiego, co dzieje się w firmie powtarzalnie: oferty, faktury, maile, telefony, raporty.

**Dzień 2. Przegląd narzędzi i danych**
Patrzymy, w czym dziś pracujecie i gdzie leżą dane. To dzień, w którym najczęściej wychodzi, że dwa systemy trzymają to samo i nikt ich nie łączy.

**Dzień 3. Liczenie czasu i kosztu**
Każdy proces z listy dostaje liczbę: ile razy w miesiącu, ile minut na raz, ile osób. Bez tej arytmetyki cała reszta byłaby opinią.

**Dzień 4. Kolejność wdrożeń i pierwszy krok z wyceną**
Układamy procesy od najbardziej opłacalnego i wybieramy jeden na start. Przy nim wpisujemy konkretną kwotę i liczbę dni roboczych z naszego cennika.

**Dzień 5. Raport PDF**
Dostajesz Action Plan: mapę procesów, kolejność wdrożeń i listę rzeczy, których nie ruszać. Decyzja jest po Twojej stronie.

**PODBLOK: Ile z tego spada na Ciebie**

Największa obawa przy audycie to nie cena, tylko podejrzenie, że wciągniemy pół firmy na dwa tygodnie spotkań. Nie robimy tego.

Po Twojej stronie jest jedna rozmowa online i krótka runda pytań uzupełniających w trakcie tygodnia.

Warto mieć pod ręką: listę narzędzi, w których pracujecie, przykładową ofertę i przykładową fakturę.

Przyda się też osoba, która wie, jak naprawdę wygląda dzień w dziale, a nie jak wygląda w procedurze.

Czego nie musisz przygotowywać: opisu procesów, prezentacji, dostępów do systemów ani zgody działu IT. Sprint to diagnoza, nie wdrożenie, więc niczego u Ciebie nie podłączamy.

Po pierwszej rozmowie możesz zniknąć na dwa dni i Sprint idzie dalej. Liczenie czasu i kosztu procesów robimy po swojej stronie.

- **Źródło liczb:** 5 dni roboczych, liczone od przekazania kompletu materiałów, raport PDF z mapą procesów: cennik i istniejąca sekcja `ramaCeny` na żywej stronie. Zakres dnia 5 zredukowany do samego raportu, bo dodatkowa rozmowa podsumowująca nie jest w cenniku. Zdanie „zamawiasz w poniedziałek, w piątek masz raport" USUNIĘTE, bo obiecywało start w dniu zamówienia. Liczba godzin po stronie klienta nie pada nigdzie, bo konspekt jej nie zawiera, i sekcja jest tak zbudowana, że jej nie potrzebuje.

---

### 6. Co się dzieje po raporcie i ile kosztuje wdrożenie?

- **Gdzie wstawić:** po sekcji `ramaCeny`, przed sekcją `faq`
- **Po co:** zamienia audyt za 1490 zł w wejście do lejka, a nie w koniec rozmowy. Łapie „ile kosztuje chatbot dla firmy", „ile kosztuje automatyzacja procesów". condictor.pl ma „Co dzieje się po audycie", lukaszpodgorski.pl pełną drabinę pakietów z czasem realizacji. Ta sekcja SCALA dawną tabelę cennikową z dawnym blokiem FAQ o pieniądzach, bo obie powtarzały te same kwoty.
- **Typ:** tabela + podbloki + FAQ

**TREŚĆ:**

Raport kończy się rekomendacją jednego pierwszego kroku. Poniżej cennik wdrożeń, które najczęściej wychodzą z audytu.

Wszystkie kwoty są netto.

| Co wdrażamy | Ile kosztuje | Ile trwa |
|---|---|---|
| AI Start: pierwsza automatyzacja na próbę, proces wewnątrz firmy | 1990 zł | ustalamy na wycenie |
| Chatbot prosty: bot na stronę, baza wiedzy, zbieranie leadów | 1790 zł | 1 do 2 dni roboczych |
| Chatbot średni | od 3000 do 6000 zł | 3 do 4 dni roboczych |
| Chatbot duży, z integracjami | od 8000 do 15000 zł | 5 do 10 dni roboczych |
| Voicebot prosty: baza wiedzy, kierowanie połączeń, FAQ | 2500 zł | ustalamy na wycenie |
| Voicebot z integracjami, na przykład z kalendarzem | od 5000 do 9000 zł | ustalamy na wycenie |
| Automatyzacja, pełne wdrożenie | od 3000 do 10000 zł | ustalamy na wycenie |
| Asystent prezesa | 7999 zł plus 199 zł miesięcznie za serwery | 5 do 10 dni roboczych |
| Strona WWW: landing page | 1590 zł | 1 dzień roboczy |
| Strona WWW: strona biznesowa | 2900 zł | 2 do 4 dni roboczych |
| Strona WWW: strona zaawansowana, sklep lub wpięte narzędzia | od 5900 zł | 5 do 10 dni roboczych |
| Leady B2B: 1000 rekordów | 169 zł | 20 do 30 minut na 1000 rekordów |
| Leady B2B: 5000 rekordów | 699 zł | jak wyżej, w przeliczeniu na tysiąc |
| Leady B2B: 10000 rekordów | 1390 zł | jak wyżej, w przeliczeniu na tysiąc |

**PODBLOK: AI Start czy chatbot? To dwie różne rzeczy**

AI Start za 1990 zł działa DO WEWNĄTRZ: bierze jeden proces w Twojej firmie i zdejmuje go z ludzi.

Chatbot prosty za 1790 zł działa NA ZEWNĄTRZ: rozmawia z Twoimi klientami, odpowiada na pytania i zbiera leady.

Chatbota stawiamy na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie.

**PODBLOK: Trzy pozycje przy każdym bocie, nie jedna**

- **Stworzenie.** Kwota z tabeli, płatna raz.
- **Utrzymanie.** Opieka nad działającym rozwiązaniem, płatna miesięcznie albo wcale, patrz niżej.
- **Zużycie tokenów i minut.** Idzie z Twojego konta u dostawcy i zależy od tego, ile bot naprawdę pracuje.

**PODBLOK: Z naszego abonamentu można wyjść**

Przy każdym wdrożeniu wybierasz jedną z dwóch dróg. Obie są uczciwe i obie kończymy tak samo: działającym rozwiązaniem.

| Droga | Utrzymanie miesięcznie | Poprawki |
|---|---|---|
| Infrastruktura zostaje u nas | voiceboty od 299 do 1500 zł, chatboty i automatyzacje od 99 do 599 zł | w abonamencie |
| Przekazujemy infrastrukturę Tobie | 0 zł | 350 zł netto za godzinę |

To dotyczy chatbotów, voicebotów, automatyzacji i AI Start.

Druga droga to rzecz, której konkurencja zwykle nie oferuje: przejmujesz infrastrukturę do siebie i przestajesz nam płacić co miesiąc.

**PODBLOK: Ceny stron WWW obok rynku**

Sprawdziliśmy 31 sierpnia 2026 cennik na projektowaniestroncennik.pl: landing page 1900 zł, strona firmowa 2500 zł, strona rozbudowana 4000 zł.

Nasz landing za 1590 zł jest tańszy. Strona biznesowa za 2900 zł jest lekko droższa, bo dowozimy w niej SEO i pozycjonowanie pod odpowiedzi AI.

Strona zaawansowana od 5900 zł jest wyżej, bo to od 5 do 10 dni roboczych pracy, a nie szablon.

**FAQ o pieniądzach**

**P: Co, jeśli raport pokaże, że u mnie nie warto niczego automatyzować?**
O: Dostajesz to napisane wprost, razem z powodem. Osobny rozdział raportu nazywa się „czego nie ruszać i dlaczego". Uczciwe „nie teraz" jest tańsze niż wdrożenie, które nie ma się z czego zwrócić.

**P: Czy w takiej sytuacji 1490 zł przepada?**
O: Za Sprint płacisz za diagnozę i raport, więc kwota zostaje po naszej stronie tak samo jak przy diagnozie u każdego specjalisty. Jeśli decydujesz się na wdrożenie u nas, te 1490 zł odliczamy od jego ceny.

**P: Czy raport mogę oddać innej firmie?**
O: Tak. Raport jest Twój i piszemy go tak, żeby dało się go zrealizować bez nas. Nie zamykamy w nim niczego, co działa tylko przy naszej obsłudze.

**P: Co wchodzi w cenę wdrożenia poza samą budową?**
O: Dwie rundy poprawek. Tydzień testów po Twojej stronie, nasze poprawki, drugi tydzień testów, kolejne poprawki i odbiór. Osobno liczy się utrzymanie oraz zużycie tokenów i minut.

**P: A jeśli po wdrożeniu będę chciał nową funkcję?**
O: Funkcje, o których nie było mowy na pierwszej rozmowie, wyceniamy osobno. To nie kara, tylko konsekwencja tego, że pierwsza wycena obejmuje konkretny zakres.

**P: Czy muszę płacić Wam abonament po wdrożeniu?**
O: Nie musisz. Możesz przejąć infrastrukturę do siebie, wtedy utrzymanie kosztuje 0 zł, a poprawki rozliczamy po 350 zł netto za godzinę.
Jeśli wolisz zostawić projekt pod naszą opieką, chatboty i automatyzacje kosztują od 99 do 599 zł miesięcznie, a voiceboty od 299 do 1500 zł.

Kwota 1490 zł za Sprint schodzi z ceny wdrożenia, jeśli robimy je razem.

- **Źródło liczb:** cały cennik z konspektu firmy (AI Start 1990 zł, chatbot prosty 1790 zł i 1-2 dni, średni 3000-6000 zł i 3-4 dni, duży 8000-15000 zł i 5-10 dni, voicebot prosty 2500 zł, voicebot z integracjami 5000-9000 zł, automatyzacja 3000-10000 zł, asystent prezesa 7999 zł plus 199 zł miesięcznie i 5-10 dni, leady B2B 169/699/1390 zł i 20-30 minut na 1000 rekordów, dwie rundy poprawek, nowe funkcje osobno, Sprint 1490 zł odliczany). Ceny stron WWW (landing 1590 zł / 1 dzień, biznesowa 2900 zł / 2-4 dni, zaawansowana od 5900 zł / 5-10 dni): decyzja właściciela z 2026-08-31. Ceny rynkowe stron WWW (1900 / 2500 / 4000 zł): projektowaniestroncennik.pl, zweryfikowane 2026-08-31, domena i data podane w treści. Model utrzymania rozszerzony na wszystkie usługi (0 zł przy przekazaniu infrastruktury, 350 zł netto za godzinę za poprawki): decyzja właściciela z 2026-08-31. Wszystkie brakujące terminy zamienione na „ustalamy na wycenie", bo cennik ich nie podaje. Kanały chatbota (strona WWW, WhatsApp, Messenger, Instagram, Telegram): decyzja właściciela z 2026-08-31, Slack i Teams celowo pominięte.

---

### 7. Kiedy audyt AI nie ma sensu?

- **Gdzie wstawić:** po nowej sekcji 6, przed nową sekcją 8
- **Po co:** granice usługi mają mits.pl, ninjatech.pl i lukaszpodgorski.pl. Sekcja buduje wiarygodność przez odmowę i filtruje leady, które i tak by nie kupiły. Łapie „kiedy audyt AI się nie opłaca", „czy warto robić audyt AI". H2 niesie frazę główną.
- **Typ:** lista

**TREŚĆ:**

Sprint kosztuje 1490 zł i pięć dni. W czterech sytuacjach to strata Twoich pieniędzy i naszego czasu.

Mówimy o nich, zanim klikniesz zamówienie.

**1. Masz jeden prosty proces i dokładnie wiesz który**
Jeśli od pół roku powtarzasz „gdyby ktoś odpisywał na te maile", nie potrzebujesz mapy procesów. Weź chatbota prostego za 1790 zł, gotowego w 1 do 2 dni roboczych, albo AI Start za 1990 zł.

**2. Nie masz kogo posadzić do rozmowy**
Diagnoza opiera się na jednej rozmowie z człowiekiem, który zna firmę od środka. Bez tego zgadujemy.
Umów się z nami, kiedy wrócisz z sezonu albo domkniesz projekt, który zjada Ci cały kalendarz.

**3. Potrzebujesz dokumentu do wniosku o dotację**
Piszemy plan do wdrożenia, nie załącznik pod wymogi formalne. Nie dopasujemy raportu do rubryk w formularzu.
Poszukaj firmy od dokumentacji dotacyjnej, a po przyznaniu środków wróć po plan techniczny.

**4. Decyzja już zapadła i szukasz potwierdzenia**
Jeśli narzędzie jest wybrane, a Ty chcesz papieru, który to uzasadni, powiemy Ci w raporcie coś, czego możesz nie chcieć przeczytać. Napisz nam wprost, co planujesz, a odpowiemy w rozmowie.

Czasem odmawiamy. Oszczędza to obu stronom wdrożenia, które nikomu nie robi dobrze.

- **Źródło liczb:** AI Start 1990 zł, chatbot prosty 1790 zł i 1-2 dni robocze, Sprint 1490 zł i 5 dni: cennik. Termin 1-2 dni przypisany WYŁĄCZNIE chatbotowi prostemu, bo tylko on go ma w cenniku. Zdanie „odmawiamy kilka razy w roku" USUNIĘTE, bo nikt tego nie liczył.

---

### 8. Czy audyt AI wymaga dostępu do naszych danych?

- **Gdzie wstawić:** po nowej sekcji 7, przed nową sekcją 9
- **Po co:** lęk numer jeden klienta przy AI to bezpieczeństwo danych, nie cena. sukcesai.com ma to jako osobną sekcję, dokodu.it rozwija w stronę RODO i AI Act. Na stronie audytu jest to szczególnie ważne, bo klient ma nam pokazać procesy i dokumenty. H2 niesie frazę główną i mówi do klienta na Ty.
- **Typ:** lista

**TREŚĆ:**

Krótka odpowiedź: nie, dostępów nie potrzebujemy. Sprint to diagnoza, nie wdrożenie.

Żeby zdiagnozować firmę, musimy zobaczyć, jak ona pracuje. Poniżej dokładnie, co to znaczy.

**1. Co od Ciebie bierzemy**
Opis procesów, listę narzędzi i przykłady dokumentów, na przykład jedną ofertę i jedną fakturę. Do policzenia czasu wystarczy wzór dokumentu, nie cała baza.

**2. Czego nie bierzemy**
Nie prosimy o dostępy do systemów, o hasła ani o eksport bazy klientów. Niczego u Ciebie nie podłączamy i nic nie uruchamiamy.

**3. Możesz zanonimizować przykłady**
Jeśli dokument zawiera dane osobowe albo dane kontrahenta, zamaż je przed wysłaniem. Nam potrzebna jest struktura dokumentu i liczba pól, a nie nazwiska.

**4. Umowa o poufności, kiedy tylko jej potrzebujesz**
Podpisujemy NDA przed rozmową. Wystarczy napisać o tym w formularzu, żeby nie tracić na to dnia z pięciu. To w niej ustalamy, jak długo trzymamy Twoje materiały i kiedy je usuwamy.

**5. Na jakich modelach pracujemy**
Korzystamy z modeli Anthropic, czyli rodziny Claude. Piszemy to wprost, żebyś wiedział, gdzie trafia treść, którą przetwarzamy.

**6. Bezpieczeństwo wraca w raporcie**
Wskazujemy procesy, w których dane nie mogą trafić do publicznego modelu. To najczęstszy powód, dla którego skreślamy jeden z pomysłów z listy.

**7. Przy późniejszym wdrożeniu infrastruktura może stać u Ciebie**
Przekazujemy Ci infrastrukturę, utrzymanie kosztuje wtedy 0 zł, a poprawki rozliczamy po 350 zł netto za godzinę. Dane zostają po Twojej stronie.

Jeśli po przeczytaniu tej listy zostaje Ci jakiekolwiek pytanie o dane, zadaj je przed zamówieniem.

Odpowiemy konkretnie, a nie ogólnikiem o najwyższych standardach bezpieczeństwa.

- **Źródło liczb:** przekazanie infrastruktury klientowi, 0 zł utrzymania i 350 zł netto za godzinę za poprawki: decyzja właściciela z 2026-08-31. Dostawca modeli Anthropic (Claude): sprawdzone w kodzie 2026-08-31. Punkt o lokalizacji i retencji danych PRZEBUDOWANY: nie podaje żadnego terminu ani miejsca, tylko mówi, że ustalamy to w NDA, bo konspekt nie zawiera zapisów na ten temat. Sekcja ma zakończenie, urwany fragment naprawiony.

---

### 9. Kto już przeszedł audyt AI i co z tego wyszło?

- **Gdzie wstawić:** po nowej sekcji 8, przed sekcją `cta` i `powiazane`
- **Po co:** to przewaga, której na tym rynku nie ma nikt. ninjatech.pl pisze wprost, że nie pokazuje case studies i podstawia wymyślone scenariusze, codescriptum.pl ma anonimowe opinie, agisona.pl i wpraktyce.ai zero liczb z wdrożeń. My mamy zgody klientów na publikację nazw. To najmocniejszy dowód przed CTA i najlepszy materiał do cytowania przez modele AI. H2 niesie frazę główną.
- **Typ:** case study

**TREŚĆ:**

Poniżej firmy z nazwy, z ich zgodą, i liczby z ich wdrożeń.

Bez branżowych scenariuszy o „pewnej firmie z sektora produkcyjnego".

**INSTYTUT KRYPTOGRAFII: 80% draftów gotowych do wysłania**
Biuro obsługi klienta dostawało w szczycie do 580 maili tygodniowo. Zbudowaliśmy automat, który przygotowuje odpowiedzi.
Osiem na dziesięć draftów jest gotowych do wysłania bez poprawek. Wysyła je człowiek, nie automat.
Osobno działają trzy boty z bazą wiedzy zbudowanej z transkrypcji kursów. Wskazują dokładne miejsce w filmie, w którym pada odpowiedź.

**ONYX: 120 faktur miesięcznie zamiast przepisywania**
Każda faktura zajmowała od 3 do 5 minut ręcznego wprowadzania, a przechodzi ich około 120 w miesiącu.
Teraz wystarczy zdjęcie faktury, a raport finansowy przychodzi codziennie sam.

**TROCKENHAUS (NIEMCY): oferta w 20 minut zamiast w pół dnia**
Firma zajmuje się osuszaniem piwnic i remontami. Wcześniej oferta powstawała od 2 do 4 godzin, teraz zajmuje 20 minut.
Rachunek zszedł z godziny do około 5 minut. Miesięcznie robią od 1 do 8 ofert i od 1 do 5 rachunków.
Przy okazji strona i chatbot: z niewidocznej w Google firma weszła do pierwszej trójki na frazę Trockenhaus.

**Y-ADS: menedżer odzyskał 3,5 godziny dziennie**
Dwunastoosobowy zespół obsługuje od 8 do 13 klientów równolegle.
Aplikacja do prowadzenia przepływu pracy zbiła codzienną robotę operacyjną menedżera z 4 godzin do 30 minut.

**KNF TEAM: raportowanie dla 15 osób bez ręcznego składania**
System raportów sprzedażowych obsługuje 12 handlowców i 3 menedżerów.
W skali zespołu to około 8 godzin tygodniowo, które wcześniej szły na składanie liczb.

**ZB BIELIZSY: przypadek, w którym nie policzymy godzin**
Aplikacja dla zakładu produkcyjnego, 14 osób na 5 stanowiskach.
Tutaj nie da się uczciwie podać oszczędności czasu i nie będziemy jej wymyślać.
Zmieniło się co innego: praca jednego stanowiska jest widoczna dla pozostałych.

**LENART MOTORS: firma, którą ChatGPT wskazuje z nazwy**
Zbudowaliśmy stronę WWW pod widoczność w wyszukiwarkach i w odpowiedziach modeli AI.
Po około trzech tygodniach od publikacji ChatGPT zaczął wskazywać firmę na pytanie o najlepszego blacharza i lakiernika premium.
To efekt wdrożenia strony, nie samego audytu.

**DESANT.PL I PRZYSTAŃ JURGEN: mniejsza skala, ta sama mechanika**
Chatbot Desant.pl obsługuje od 30 do 50 klientów miesięcznie i od 200 do 280 wiadomości.
Przystań Jurgen ma stronę z chatbotem, który w sezonie zbiera około 100 zapytań od 20 do 50 klientów.
Nie każde wdrożenie musi być duże, żeby się opłacało.

Chcesz sprawdzić, jak nasz bot odpowiada, zanim cokolwiek zamówisz?

Wejdź na [stronę chatbotów](/uslugi/chatboty), kliknij „Zapytaj AI" i zadaj mu pytanie o ceny albo o terminy.

- **Źródło liczb:** wszystko z konspektu firmy, sekcja realizacje. Instytut Kryptografii: brzmienie poprawione na „80% draftów gotowych do wysłania bez poprawek" z jawnym zdaniem, że wysyła człowiek. Onyx: zakaz o płaceniu faktur przez API banku zachowany, w treści jest tylko zdjęcie faktury i codzienny raport. Lenart Motors przeniesiony TU z sekcji o raporcie, z jawnym wskazaniem, że to efekt wdrożenia strony WWW, a nie audytu. Bot na simplefast.ai: widget zweryfikowany 2026-08-31 na `/uslugi/chatboty`, więc link prowadzi tam, a nie na stronę audytu.

---

## Nowe podstrony

Sześć podstron pod `/uslugi/audyt-ai/`. Rodzic: `audyt-ai`. Każda ma własną frazę i nie kanibalizuje sąsiadów.

---

### Podstrona 1: `/uslugi/audyt-ai/ile-kosztuje`

- **H1:** Ile kosztuje audyt AI w firmie i za co dokładnie płacisz
- **metaTitle:** `Ile kosztuje audyt AI firmy` (27 znaków)
- **Fraza główna:** ile kosztuje audyt AI
- **Rozdział intencji:** strona matka sprzedaje usługę i ma tylko ramę ceny. Ta podstrona jest cennikiem: rozbija 1490 zł na składniki, pokazuje pełną drabinę wdrożeń i tłumaczy, dlaczego darmowy audyt zwykle nie jest audytem. Nie opisuje przebiegu (od tego jest sekcja 5 na stronie matce) ani branż (od tego są pozostałe podstrony).
- **Dlaczego warto:** najbardziej niedoobsłużona fraza w obszarze. agisona.pl ma na blogu nagłówek „Ile kosztuje audyt AI?" i nie podaje żadnej kwoty, ninjatech.pl na 3000 słów nie ma ani jednej liczby, dokodu.it i multi-future.pl też nie. My mamy zatwierdzoną cenę i termin, więc strona z jawną liczbą wygrywa i w Google, i w odpowiedziach modeli AI.

**Sekcje:**
1. Krótka odpowiedź w pierwszym akapicie
2. Za co dokładnie płacisz, składnik po składniku
3. Dlaczego darmowy audyt AI zwykle kończy się prezentacją, a nie planem
4. Co wpływa na cenę: liczba procesów, liczba systemów, wielkość zespołu
5. Ile kosztuje wdrożenie po audycie: pełna drabina cenowa (tabela z sekcji 6 strony matki, cała)
6. Dwie drogi utrzymania: abonament albo 0 zł przy przekazaniu infrastruktury
7. Trzy pozycje, o których zapominają cenniki: stworzenie, utrzymanie, zużycie tokenów i minut
8. Kiedy nie warto płacić za audyt
9. FAQ o pieniądzach
10. Zamów Sprint Diagnostyczny

**GOTOWA KAPSUŁA (blok krótkiej odpowiedzi, do pola `kapsula`):**

> Audyt AI firmy kosztuje u nas 1490 zł netto, trwa 5 dni roboczych i kończy się raportem PDF z mapą procesów. Kwotę odliczamy od kosztu wdrożenia, gdy ruszamy z robotą, więc przy współpracy audyt w praktyce nic nie kosztuje. Większość firm na polskim rynku nie podaje ceny audytu publicznie, tylko wycenia po rozmowie. Po audycie pierwsze wdrożenia zaczynają się od 1590 zł za landing page i 1790 zł za prostego chatbota. Płacisz raz, a utrzymanie możesz mieć za 0 zł, jeśli przejmiesz infrastrukturę do siebie.

**GOTOWE FAQ:**

**P: Ile kosztuje audyt AI w firmie?**
O: 1490 zł netto za Sprint Diagnostyczny. Trwa 5 dni roboczych i kończy się raportem PDF z mapą procesów. Całą kwotę odliczamy od kosztu wdrożenia, jeśli wdrażasz z nami.

**P: Dlaczego audyt AI jest płatny, skoro inni robią go za darmo?**
O: Bo darmowy audyt zwykle kończy się prezentacją sprzedażową, a nie planem, który da się zrealizować bez autora. My oddajemy dokument, który możesz zanieść dowolnej innej firmie wdrożeniowej.

**P: Od czego zależy cena audytu?**
O: U nas od niczego. 1490 zł to cena stała, niezależnie od liczby procesów i wielkości zespołu. Zmienia się to, co znajdziemy w środku, a nie rachunek.

**P: Ile zapłacę po audycie za samo wdrożenie?**
O: Zależy, co wyjdzie z raportu. Najtańsze wejścia to landing page za 1590 zł, chatbot prosty za 1790 zł i AI Start za 1990 zł. Pełne wdrożenie automatyzacji to od 3000 do 10000 zł netto.

**P: Czy muszę płacić abonament po wdrożeniu?**
O: Nie musisz. Przy każdym wdrożeniu wybierasz: infrastruktura zostaje u nas i płacisz abonament, albo przekazujemy ją Tobie i utrzymanie kosztuje 0 zł, a poprawki rozliczamy po 350 zł netto za godzinę.

**P: Czy 1490 zł przepada, jeśli nie wdrożę niczego?**
O: Za Sprint płacisz za diagnozę i raport, więc kwota zostaje po naszej stronie. Zostaje Ci gotowy plan, który możesz zrealizować sam albo z kimkolwiek zechcesz.

---

### Podstrona 2: `/uslugi/audyt-ai/dla-malej-firmy`

- **H1:** Audyt AI dla małej firmy: od czego zacząć, żeby nie przepalić budżetu
- **metaTitle:** `Audyt AI dla małej firmy` (24 znaki)
- **Fraza główna:** audyt AI dla małej firmy
- **Rozdział intencji:** segment po wielkości, nie po branży. Strona matka mówi do wszystkich, ta mówi do właściciela, który sam robi oferty, faktury i odpowiada na maile. Podstrony branżowe schodzą głębiej w konkretny proces, ta zostaje na poziomie całej firmy i budżetu.
- **Dlaczego warto:** codescriptum.pl segmentuje po wielkości firmy, agisona.pl podaje osobne parametry dla małych firm, ale nikt nie zrobił z tego osobnej strony. Mała firma to nasz realny klient przy cenie 1490 zł i 1790 zł. Wzorzec, który zadziałał przy voicebotach, to właśnie wąska strona pod jeden segment.

**Sekcje:**
1. Jak wygląda dzień właściciela małej firmy, zanim cokolwiek zautomatyzujemy
2. Trzy procesy, które w małej firmie zżerają najwięcej czasu
3. Dlaczego mała firma nie potrzebuje strategii AI, tylko jednej dobrej decyzji
4. Co dostajesz w raporcie, rozdział po rozdziale (5 rozdziałów z sekcji 2 strony matki)
5. Trockenhaus: oferta z 2 do 4 godzin do 20 minut, rachunek z godziny do około 5 minut
6. Ile to kosztuje: 1490 zł za Sprint, 1990 zł za pierwszą automatyzację na próbę
7. Ile czasu zajmie to Tobie
8. Kiedy w małej firmie audyt nie ma sensu i co zrobić zamiast
9. FAQ
10. Zamów Sprint Diagnostyczny

**GOTOWA KAPSUŁA:**

> Audyt AI dla małej firmy to Sprint Diagnostyczny za 1490 zł netto, który trwa 5 dni roboczych. W małej firmie ma sens tym większy, im mniejszy zespół, bo każda nietrafiona decyzja boli mocniej. Sprawdzamy, gdzie realnie ucieka czas: oferty, faktury, maile, umawianie. Trockenhaus po wdrożeniu skrócił przygotowanie oferty z 2 do 4 godzin do 20 minut, a wystawienie rachunku z godziny do około 5 minut. Pierwszy krok po audycie zaczyna się od 1790 zł za prostego chatbota albo 1990 zł za AI Start. Kwotę 1490 zł odliczamy od wdrożenia.

**GOTOWE FAQ:**

**P: Czy audyt AI ma sens w małej firmie?**
O: Ma, często nawet większy niż w dużej. Przy małym zespole każda nietrafiona decyzja boli mocniej, a każda godzina, którą AI może zdjąć, jest godziną wyjętą z Twojego dnia.

**P: Ile kosztuje audyt AI dla małej firmy?**
O: 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów. Cena jest taka sama niezależnie od wielkości firmy, a kwotę odliczamy od kosztu wdrożenia.

**P: Ile mojego czasu to zajmie?**
O: Jedna rozmowa online i krótka runda pytań uzupełniających w trakcie tygodnia. Po pierwszej rozmowie możesz zniknąć na dwa dni i Sprint idzie dalej.

**P: Co, jeśli okaże się, że u mnie nic nie warto automatyzować?**
O: Dostaniesz to napisane wprost, razem z powodem. Osobny rozdział raportu nazywa się „czego nie ruszać i dlaczego".

**P: Mam jeden konkretny proces do zdjęcia, potrzebuję audytu?**
O: Nie. Jeśli wiesz który, weź od razu chatbota prostego za 1790 zł, gotowego w 1 do 2 dni roboczych, albo AI Start za 1990 zł na proces wewnątrz firmy.

---

### Podstrona 3: `/uslugi/audyt-ai/obsluga-klienta`

- **H1:** Audyt AI działu obsługi klienta: gdzie realnie tracicie godziny
- **metaTitle:** `Audyt AI działu obsługi klienta` (31 znaków)
- **Fraza główna:** audyt AI obsługa klienta
- **Rozdział intencji:** podstrona procesowa, nie branżowa. Bierze jeden dział (maile, telefony, powtarzalne pytania) i pokazuje, co audyt w nim znajduje. Nie dubluje strony chatbota ani voicebota, bo tu nie sprzedajemy narzędzia, tylko diagnozę: czy w ogóle warto i który kanał pierwszy.
- **Dlaczego warto:** to proces, w którym mamy najmocniejsze liczby w portfolio (Instytut Kryptografii), a konkurencja opisuje obsługę klienta wyłącznie ogólnikami. ninjatech.pl wymienia „agenta obsługi" bez jednej liczby. Wzorzec identyczny jak `/uslugi/voiceboty/odbieranie-telefonow`, który zadziałał.

**Sekcje:**
1. Objawy: te same pytania w kółko, maile odpisywane po godzinach, klient czeka dobę
2. Co sprawdzamy: kanały, powtarzalność, czas odpowiedzi, wiedza rozproszona po ludziach
3. Instytut Kryptografii: 80% draftów gotowych do wysłania, 580 maili tygodniowo w szczycie
4. Desant.pl i Przystań Jurgen: skala mniejsza, ta sama mechanika
5. Czym różni się bot na stronie od automatu do maili i kiedy który ma sens
6. Na jakich kanałach stawiamy bota: strona WWW, WhatsApp, Messenger, Instagram, Telegram
7. Co dostajesz w raporcie z tego działu
8. Ile kosztuje wdrożenie po audycie: chatbot od 1790 zł, voicebot od 2500 zł, automatyzacja od 3000 zł
9. Kiedy w obsłudze klienta nie warto niczego automatyzować
10. FAQ
11. Zamów Sprint Diagnostyczny

**GOTOWA KAPSUŁA:**

> Audyt AI działu obsługi klienta to Sprint Diagnostyczny za 1490 zł netto i 5 dni roboczych, zawężony do jednego działu. Sprawdzamy, ile pytań się powtarza, którymi kanałami przychodzą i ile czasu zjada odpisywanie. W Instytucie Kryptografii biuro obsługi dostawało w szczycie do 580 maili tygodniowo, a po wdrożeniu 80% draftów jest gotowych do wysłania bez poprawek, choć wysyła je człowiek. Po audycie wchodzą chatbot od 1790 zł, voicebot od 2500 zł albo automatyzacja maili od 3000 zł. Bota stawiamy na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie.

**GOTOWE FAQ:**

**P: Co audyt znajduje w dziale obsługi klienta?**
O: Ile pytań się powtarza, którymi kanałami przychodzą, ile czasu zajmuje jedna odpowiedź i gdzie wiedza siedzi w głowach ludzi zamiast w jednym miejscu.

**P: Czy bot odpowie za mnie klientowi?**
O: Zależy, co ustalimy. W Instytucie Kryptografii automat przygotowuje drafty, a wysyła je człowiek. Osiem na dziesięć jest gotowych do wysłania bez poprawek.

**P: Na jakich kanałach działa chatbot?**
O: Na stronie WWW, WhatsAppie, Messengerze, Instagramie i Telegramie.

**P: Bot na stronie czy automat do maili, co pierwsze?**
O: To dokładnie pytanie, na które odpowiada raport. Bot na stronie łapie pytania przed mailem, automat do maili zdejmuje to, co już wpadło. Kolejność zależy od tego, ile ruchu masz w każdym kanale.

**P: Ile kosztuje wdrożenie w obsłudze klienta?**
O: Chatbot prosty 1790 zł i 1 do 2 dni roboczych, chatbot średni od 3000 do 6000 zł, voicebot prosty 2500 zł, automatyzacja maili od 3000 do 10000 zł. Wszystko netto.

---

### Podstrona 4: `/uslugi/audyt-ai/dla-biura-rachunkowego`

- **H1:** Audyt AI dla biura rachunkowego i działu księgowości
- **metaTitle:** `Audyt AI dla biura rachunkowego` (31 znaków)
- **Fraza główna:** audyt AI dla biura rachunkowego
- **Rozdział intencji:** branża z najbardziej policzalnym procesem: dokument na wejściu, dane na wyjściu. Różni się od podstrony obsługi klienta tym, że mówi o dokumentach i danych, nie o rozmowach, i porusza temat, którego nie ma nigdzie indziej: co wolno oddać automatowi, a co musi zostać u człowieka.
- **Dlaczego warto:** realizacja Onyx daje twarde liczby, których konkurencja nie ma, a proces jest na tyle policzalny, że oszczędność da się pokazać arytmetyką na stronie. Żaden z jedenastu przebadanych konkurentów nie ma podstrony dla księgowości.

**Sekcje:**
1. Objawy: przepisywanie faktur, dopytywanie o brakujące dokumenty, raport zawsze na ostatnią chwilę
2. Co sprawdzamy: obieg dokumentów, jakość danych wejściowych, powtarzalność klasyfikacji
3. Onyx: około 120 faktur miesięcznie, ręcznie 3 do 5 minut na fakturę, dziś zdjęcie faktury
4. Policz swoje faktury (kalkulator, opis niżej)
5. Co wolno oddać automatowi, a co musi zostać u księgowej
6. Ryzyka danych w księgowości i jak je zamykamy
7. Co dostajesz w raporcie
8. Ile kosztuje wdrożenie: automatyzacja od 3000 do 10000 zł, utrzymanie od 99 do 599 zł miesięcznie albo 0 zł
9. Kiedy nie warto: mały wolumen dokumentów, dane wchodzące w pięciu formatach naraz
10. FAQ
11. Zamów Sprint Diagnostyczny

**KALKULATOR NA TEJ PODSTRONIE:** ten sam element co w sekcji 1 strony matki, z etykietami dopasowanymi do księgowości: „Ile dokumentów przechodzi przez Was miesięcznie?", „Ile minut zajmuje wprowadzenie jednego?", „Stawka godzinowa netto osoby, która to robi". Zero wartości domyślnych, zero przykładowych stawek.

**GOTOWA KAPSUŁA:**

> Audyt AI dla biura rachunkowego to Sprint Diagnostyczny za 1490 zł netto i 5 dni roboczych, skupiony na obiegu dokumentów. Sprawdzamy, ile dokumentów przechodzi przez zespół, ile minut zajmuje jeden i które kroki da się oddać automatowi bez ryzyka. W Onyksie każda faktura zajmowała od 3 do 5 minut ręcznego wprowadzania przy około 120 fakturach miesięcznie, czyli od 6 do 10 godzin w miesiącu. Dziś wystarczy zdjęcie faktury, a raport finansowy przychodzi codziennie sam. Pełne wdrożenie automatyzacji to od 3000 do 10000 zł netto.

**GOTOWE FAQ:**

**P: Ile czasu zajmuje ręczne wprowadzanie faktur?**
O: W Onyksie było to od 3 do 5 minut na fakturę przy około 120 fakturach miesięcznie. To od 360 do 600 minut, czyli od 6 do 10 godzin miesięcznie na jednej czynności.

**P: Co automat może zrobić z fakturą?**
O: Odczytać ją ze zdjęcia i przenieść dane dalej. W Onyksie do tego doszedł codzienny raport finansowy, który przychodzi sam.

**P: Czy automat zastąpi księgową?**
O: Nie. Zdejmuje przepisywanie, a decyzje i kontrola zostają u człowieka. W raporcie osobno wypisujemy, czego nie ruszać.

**P: Co z danymi klientów podczas audytu?**
O: Do policzenia czasu wystarczy wzór dokumentu, nie cała baza. Możesz zamazać dane osobowe przed wysłaniem. Nie prosimy o dostępy do systemów ani o eksport bazy.

**P: Ile kosztuje wdrożenie w księgowości?**
O: Pełne wdrożenie automatyzacji to od 3000 do 10000 zł netto. Utrzymanie od 99 do 599 zł miesięcznie, albo 0 zł, jeśli przejmiesz infrastrukturę do siebie i rozliczasz poprawki po 350 zł netto za godzinę.

- **ZAKAZ NA TEJ PODSTRONIE:** nie wolno opisywać płacenia faktur przez API banku ani „jednym kliknięciem". W treści wolno tylko: zdjęcie faktury, odczyt danych, codzienny raport finansów.

---

### Podstrona 5: `/uslugi/audyt-ai/dla-agencji-marketingowej`

- **H1:** Audyt AI dla agencji: gdzie ucieka czas przy obsłudze kilkunastu klientów
- **metaTitle:** `Audyt AI dla agencji marketingowej` (34 znaki)
- **Fraza główna:** audyt AI dla agencji marketingowej
- **Rozdział intencji:** segment, w którym problemem nie jest jeden proces, tylko przepływ pracy między ludźmi i klientami. Odróżnia się od podstrony dla małej firmy tym, że mówi o pracy projektowej, statusach i raportowaniu do klienta, a nie o właścicielu wystawiającym faktury.
- **Dlaczego warto:** Y-Ads to najmocniejsza liczba operacyjna, jaką mamy (4 godziny do 30 minut dziennie), a agencje same sprzedają AI klientom, więc kupują szybko. Nikt z konkurencji nie celuje w ten segment osobną stroną. Strona naturalnie sprzedaje też leady B2B, które mają jawny cennik i najkrótszą ścieżkę do pierwszej faktury.

**Sekcje:**
1. Objawy: menedżer spędza pół dnia na pilnowaniu statusów, raporty do klientów sklejane ręcznie
2. Co sprawdzamy: przepływ zadań, punkty przekazania, raportowanie, powtarzalne treści
3. Y-Ads: 12 osób w zespole, 8 do 13 klientów równolegle, menedżer z 4 godzin do 30 minut dziennie
4. Co mamy w portfolio: SFAI Campaigns, narzędzie do prowadzenia kampanii i pozyskiwania leadów
5. Leady B2B jako osobna pozycja: 1000 rekordów 169 zł, 5000 rekordów 699 zł, 10000 rekordów 1390 zł
6. Co dostajesz w raporcie
7. Ile kosztuje wdrożenie po audycie
8. Kiedy audyt w agencji nie ma sensu
9. FAQ
10. Zamów Sprint Diagnostyczny

**GOTOWA KAPSUŁA:**

> Audyt AI dla agencji marketingowej to Sprint Diagnostyczny za 1490 zł netto i 5 dni roboczych, skupiony na przepływie pracy między ludźmi i klientami. W Y-Ads dwunastoosobowy zespół obsługuje od 8 do 13 klientów równolegle, a codzienna robota operacyjna menedżera zeszła z 4 godzin do 30 minut dziennie, czyli odzyskał 3,5 godziny każdego dnia. Sprawdzamy statusy, punkty przekazania, raportowanie do klienta i powtarzalne treści. Osobną pozycją są leady B2B: 1000 rekordów za 169 zł, 5000 za 699 zł, 10000 za 1390 zł.

**GOTOWE FAQ:**

**P: Co audyt zmienia w agencji?**
O: Pokazuje, gdzie w przepływie pracy giną godziny: przy statusach, przekazywaniu zadań i ręcznym sklejaniu raportów dla klientów. W Y-Ads menedżer zszedł z 4 godzin dziennie do 30 minut.

**P: Ile kosztują leady B2B?**
O: 1000 rekordów 169 zł, 5000 rekordów 699 zł, 10000 rekordów 1390 zł. Wszystko netto. Automat zbiera 1000 rekordów w 20 do 30 minut, a ręcznie idzie to około 3 minut na rekord.

**P: Skąd biorą się te leady?**
O: Ze scrapowania Google Maps. Tylko B2B, czyli firmy, nie osoby prywatne.

**P: Czy budujecie narzędzia dla agencji?**
O: Mamy w portfolio zbudowane SFAI Campaigns: prowadzenie kampanii, publikacja w social media i pozyskiwanie leadów. Co z tego ma sens u Ciebie, wychodzi z raportu.

**P: Ile kosztuje wdrożenie po audycie?**
O: Zależy od tego, co wyjdzie. Automatyzacja pełne wdrożenie od 3000 do 10000 zł netto, chatbot prosty 1790 zł, AI Start 1990 zł. Kwotę 1490 zł za audyt odliczamy od wdrożenia.

---

### Podstrona 6: `/uslugi/audyt-ai/dla-firmy-produkcyjnej`

- **H1:** Audyt AI dla firmy produkcyjnej: hala, stanowiska i papier
- **metaTitle:** `Audyt AI dla firmy produkcyjnej` (31 znaków)
- **Fraza główna:** audyt AI dla firmy produkcyjnej
- **Rozdział intencji:** jedyna podstrona, która mówi o pracy poza biurkiem: stanowiska, zlecenia, przekazywanie zmiany. Różni się od księgowości i obsługi klienta tym, że efektem często nie jest oszczędność godzin, tylko porządek i mniej błędów, i mówimy to wprost.
- **Dlaczego warto:** segment pominięty przez całą jedenastkę konkurentów, którzy piszą wyłącznie o biurze, e-commerce i obsłudze klienta. Mamy realne wdrożenie (ZB Bielizsy), a jawne przyznanie, że tu nie da się policzyć oszczędności, jest sygnałem uczciwości, którym ninjatech.pl próbuje się wyróżnić samą deklaracją. U nas stoi za tym prawdziwy klient.

**Sekcje:**
1. Objawy: zlecenia na kartkach, informacja ginie między zmianami, nikt nie wie, na czym stoi stanowisko
2. Co sprawdzamy w firmie produkcyjnej
3. ZB Bielizsy: aplikacja dla zakładu produkcyjnego, 14 osób na 5 stanowiskach
4. Uczciwie: tu oszczędności czasu nie da się policzyć i nie będziemy udawać, że się da
5. Czym mierzymy sens wdrożenia, kiedy nie ma godzin do policzenia
6. Co dostajesz w raporcie
7. Ile kosztuje wdrożenie po audycie
8. Kiedy audyt na produkcji nie ma sensu
9. FAQ
10. Zamów Sprint Diagnostyczny

**GOTOWA KAPSUŁA:**

> Audyt AI dla firmy produkcyjnej to Sprint Diagnostyczny za 1490 zł netto i 5 dni roboczych, skupiony na tym, co dzieje się poza biurkiem: zlecenia, stanowiska, przekazywanie zmiany. W ZB Bielizsy zbudowaliśmy aplikację dla zakładu, w którym pracuje 14 osób na 5 stanowiskach. Uczciwie: tam oszczędności czasu nie da się policzyć i nie będziemy jej wymyślać. Zmieniło się co innego: praca jednego stanowiska jest widoczna dla pozostałych. Jeśli w Twojej firmie efektem ma być porządek, a nie odzyskane godziny, powiemy to w raporcie wprost.

**GOTOWE FAQ:**

**P: Czy audyt AI ma sens na produkcji?**
O: Ma, ale efekt jest inny niż w biurze. Częściej chodzi o porządek i mniej błędów niż o odzyskane godziny. Jeśli u Ciebie nie da się policzyć oszczędności czasu, napiszemy to w raporcie.

**P: Co zbudowaliście w ZB Bielizsy?**
O: Aplikację dla zakładu, w którym pracuje 14 osób na 5 stanowiskach. Praca jednego stanowiska stała się widoczna dla pozostałych.

**P: Ile godzin odzyskam?**
O: Nie wiemy i nie będziemy zgadywać. W ZB Bielizsy nie dało się tego uczciwie policzyć. W raporcie piszemy, czego się da spodziewać, a czego nie.

**P: Czym mierzycie sens wdrożenia, gdy nie ma godzin do policzenia?**
O: Liczbą miejsc, w których informacja dziś ginie, i liczbą kroków, które ktoś musi powtórzyć, bo nie miał danych na czas.

**P: Ile kosztuje wdrożenie na produkcji?**
O: Automatyzacja pełne wdrożenie to od 3000 do 10000 zł netto. Utrzymanie od 99 do 599 zł miesięcznie, albo 0 zł, jeśli przejmiesz infrastrukturę do siebie.

---

## Uwagi dla sesji wdrożeniowej

**1. Rejestr podstron.** Podstrony `/uslugi/audyt-ai/*` NIE istnieją. Trzeba założyć katalog trasy `app/uslugi/audyt-ai/[podstrona]/page.tsx` (wzorzec 1:1 z `app/uslugi/voiceboty/[podstrona]/page.tsx`), dopisać sześć plików do `lib/uslugi/podstrony/` i sześć wpisów do tablicy `PODSTRONY` w `lib/uslugi/podstrony/index.ts` z `rodzic: 'audyt-ai'`. Bez katalogu trasy wpis w rejestrze nic nie wygeneruje, a URL trafi do mapy witryny jako martwy.

**2. Linki z kart sekcji 3.** Karty w sekcji „Dla jakiej firmy audyt AI ma sens?" celowo NIE mają linków. Dokładamy je dopiero po opublikowaniu podstron: karta 1 do `/dla-malej-firmy`, karta 3 do `/obsluga-klienta`, karta 4 do `/dla-biura-rachunkowego`, karta 5 do `/dla-agencji-marketingowej`, karta 6 do `/dla-firmy-produkcyjnej`. Karta 2 zostaje bez linku, bo nie ma dla niej podstrony.

**3. Kolor kategorii.** Nowe sekcje i wszystkie podstrony trzymają tony już używane na stronie audytu w `ramaCeny.bloki.pasMetryk`: `cyan` dla ceny, `violet` dla czasu, `green` dla deliverable, `amber` dla modelu 0 zł. Nie wprowadzamy nowych tonów.

**4. Kalkulator bez wartości domyślnych.** To twarda decyzja właściciela z 2026-08-31. Kalkulator w sekcji 1 i na podstronie księgowej startuje z PUSTYMI polami. Zero domyślnych stawek, zero przykładowych kwot obok. Wynik pokazujemy dopiero po wypełnieniu wszystkich trzech pól.

**5. Istniejący kalkulator na `/narzedzia` łamie tę decyzję.** `components/narzedzia/KalkulatorOszczednosci.tsx` startuje z wartościami `osoby = 5`, `godzTydzien = 6`, `stawka = 60`. To domyślne kwoty, których decyzja z 2026-08-31 zakazuje. Do naprawy w osobnym zadaniu, poza tym pakietem, bo dotyczy innego obszaru serwisu.

**6. Model utrzymania 0 zł to nowa treść w całym serwisie.** Do tej pory pisaliśmy o nim tylko przy voicebotach. Decyzja z 2026-08-31 rozszerza go na chatboty, automatyzacje i AI Start. Ten pakiet stosuje to na stronie audytu i podstronach. Pozostałe strony usług trzeba przejrzeć osobno, bo to jest zmiana w naczyniach połączonych.

**7. Kanały chatbota.** Wolno wymieniać: strona WWW, WhatsApp, Messenger, Instagram, Telegram. Nie wolno: Slack, Microsoft Teams. Meet, Zoom i Teams należą do osobnej usługi auto-podsumowań spotkań i nie mieszamy ich z chatbotem.

**8. Bot do przetestowania stoi na `/uslugi/chatboty`, nie na stronie audytu.** Link w sekcji 9 prowadzi tam. Nie wolno pisać „na tej stronie stoi nasz bot", bo na `/uslugi/audyt-ai` widgetu nie ma.

**9. Instytut Kryptografii.** Poprawne brzmienie to „80% draftów gotowych do wysłania bez poprawek". Nigdzie nie wolno napisać, że automat wysyła maile sam. Człowiek jest w pętli i to zdanie musi zostać w treści.

**10. Onyx.** Zakaz opisywania płacenia faktur przez API banku obowiązuje na stronie matce i na podstronie księgowej.

**11. Ceny konkurencji.** Jedyna cena konkurencji w całym pakiecie to cennik stron WWW z projektowaniestroncennik.pl, zweryfikowany 2026-08-31, podany z domeną i datą. Nie wolno dodać żadnej innej ceny konkurenta bez wejścia na jego stronę i zapisania daty.

**12. Kolejność sekcji na stronie matce po wdrożeniu:**
`problem` → nowa 1 → `rozwiazanie` → nowa 2 → nowa 3 → `tabelaPorownawcza` → nowa 4 → `kroki` → nowa 5 → `ramaCeny` → nowa 6 → nowa 7 → nowa 8 → nowa 9 → `faq` → `cta` → `powiazane`

**13. Schema FAQPage.** Nowe pytania z sekcji 6 nie mogą zdublować pytań z istniejącego pola `faq`. Sprawdzone: żadne z sześciu nowych pytań nie powtarza istniejących sześciu. W schemacie strony wolno użyć obu zestawów.

**14. Aktualizacja daty.** Po wdrożeniu zmienić `dataAktualizacji` w `lib/uslugi/audyt-ai.ts` z `2026-08-21` na datę wdrożenia. Ta data zasila mapę witryny.
