# Pakiet wdrozeniowy: Automatyzacja procesow

**Adres strony:** https://www.simplefast.ai/uslugi/automatyzacje
**Plik danych na produkcji:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\lib\uslugi\automatyzacje.ts`
**Data pakietu:** 2026-08-31
**Co ten pakiet dodaje:** 11 nowych sekcji do istniejacej strony uslugi (koszt bezczynnosci z kalkulatorem, katalog nazwanych procesow, blok bezpieczenstwa, 6 kart realizacji z nazwami klientow, stos narzedzi, porownanie z etatem, pelna drabina cen, koszty poza faktura, zakres wdrozenia, dyskwalifikacja, dane i RODO) plus 8 nowych podstron w gniezdzie `/uslugi/automatyzacje/`.

Wszystkie kwoty w tym pakiecie sa NETTO. Wszystkie liczby pochodza z konspektu firmy albo z decyzji wlasciciela z 2026-08-31. Zero em-dash w calej tresci.

---

## Czego NIE ruszamy

Istniejace sekcje strony zostaja bez zmian w tresci. Nowe sekcje wchodza MIEDZY nie, nie zamiast nich.

| Klucz w `automatyzacje.ts` | Istniejacy H2 | Status |
|---|---|---|
| `h1` | Automatyzacja procesow w firmie z AI | bez zmian |
| `kapsula` | (kapsula wprowadzajaca) | bez zmian |
| `metaTitle` / `metaDescription` | Automatyzacja procesow AI: od czego zaczac | bez zmian |
| `problem` | Na czym naprawde tracisz czas kazdego dnia? | bez zmian |
| `rozwiazanie` | Co dokladnie automatyzujemy? | bez zmian |
| `tabelaPorownawcza` | Automatyzacja AI a reczna obsluga procesu | bez zmian |
| `kroki` | Jak wyglada wdrozenie automatyzacji krok po kroku? | bez zmian |
| `ramaCeny` | Ile kosztuje wdrozenie automatyzacji? | tresc bez zmian, DOKLADAMY jeden blok w srodku (sekcja 7) |
| `faq` | 6 istniejacych pytan | bez zmian, dokladamy pytania z sekcji 11 |
| `cta` | Pokaz mi, gdzie trace czas | bez zmian |
| `powiazane` | realizacje, narzedzia, produkty | bez zmian, dokladamy linki do nowych podstron |

Jedyna ingerencja w istniejaca tresc: wewnatrz `ramaCeny` dokladamy tabele z sekcji 7 i wiersz o zuzyciu tokenow. Nie kasujemy istniejacego przelacznika progow ani istniejacej tabeli.

**Uwaga na kolizje naglowkow.** Istniejaca sekcja `rozwiazanie` ma H2 "Co dokladnie automatyzujemy?". Nowy katalog procesow ma dlatego inny naglowek: "Jakie procesy da sie zautomatyzowac w firmie?". Nie wolno ich zamienic miejscami ani powielic.

---

## Nowe sekcje na istniejacej stronie

### 1. Co tracisz co miesiac, robiac to recznie?

- **Gdzie wstawic:** zaraz po istniejacej sekcji `problem` ("Na czym naprawde tracisz czas kazdego dnia?"), przed `rozwiazanie`.
- **Po co:** lapie frazy "ile kosztuje reczna praca", "ile trace na powtarzalnych zadaniach", "koszt recznej roboty". Tantor.pl ma kalkulator liczacy strate per rola, malinski.ai ma koszt bezczynnosci, easyautomate.pl przelicza godziny dzienne na miesieczne. Nasz obecny kalkulator na `/narzedzia` liczy oszczednosc, nigdy strate. Ta sekcja zamienia abstrakcyjny problem na kwote, ktora klient wpisuje sam.
- **Typ:** akapity + tabela + kalkulator z pustymi polami.

**TRESC:**

Reczna robota nie ma wlasnej pozycji na fakturze, wiec latwo jej nie zauwazyc. Ale ktos ja co miesiac wykonuje i ktos za nia placi. Placisz Ty, w wynagrodzeniach.

Policz to najprosciej jak sie da. Ile godzin w tygodniu Twoj zespol przepisuje dane z jednego miejsca w drugie, sklada raporty i odpisuje na te same pytania. Pomnoz przez swoja stawke godzinowa i przez 12 miesiecy.

Ponizej godziny z naszych wdrozen. To czas policzony przed startem prac, u konkretnych klientow albo w naszym wlasnym procesie. Tam, gdzie automat juz dziala, podajemy tez wynik po wdrozeniu.

| Proces | Ile to wazy | Skad ta liczba |
|---|---|---|
| Ksiegowanie faktur kosztowych | 3 do 5 minut na dokument. Przy 120 fakturach miesiecznie: 120 x 3 min = 360 minut, czyli 6 godzin, a 120 x 5 min = 600 minut, czyli 10 godzin miesiecznie | Onyx, stan przed wdrozeniem aplikacji ksiegowej |
| Przygotowanie jednej oferty | 2 do 4 godzin przed wdrozeniem, 20 minut po wdrozeniu | Trockenhaus, osuszanie piwnic i remonty, rynek niemiecki |
| Wystawienie rachunku za zlecenie | ok. 1 godziny przed wdrozeniem, ok. 5 minut po wdrozeniu | Trockenhaus |
| Raporty sprzedazowe dla zespolu | automat zdjal ok. 8 godzin tygodniowo w skali zespolu | KNF Team, 12 handlowcow i 3 menedzerow |
| Koordynacja pracy zespolu przez menedzera | 4 godziny dziennie przed wdrozeniem, 30 minut po wdrozeniu | Y-Ads, 12 osob w zespole, 8 do 13 klientow rownolegle |
| Zbudowanie listy 1000 firm do kontaktu | ok. 3 minuty na rekord. 1000 x 3 min = 3000 minut, czyli ok. 50 godzin. Automat robi te sama paczke w 20 do 30 minut | nasz wlasny proces leadow B2B |

**[KALKULATOR: Policz swoja strate]**

Specyfikacja dla sesji wdrozeniowej. Wszystkie trzy pola startuja PUSTE, z podpowiedzia w polu (placeholder), bez zadnej wartosci domyslnej. Wynik pojawia sie dopiero wtedy, gdy wszystkie trzy pola sa wypelnione.

| Pole | Typ | Placeholder | Zakres |
|---|---|---|---|
| Ile osob robi to recznie | liczba | np. 3 | 1 do 200 |
| Ile godzin tygodniowo na osobe | liczba | np. 5 | 1 do 40 |
| Twoja stawka godzinowa w zl | liczba | wpisz swoja stawke | 1 do 2000 |

Wzor miesieczny: liczba osob x godziny tygodniowo x 4,33 x stawka godzinowa.
Wzor roczny: wynik miesieczny x 12.

Podpis pod wzorem, widoczny na stronie: Tygodni w miesiacu liczymy jako 52 podzielone przez 12, czyli 4,33.

Etykieta pod wynikiem miesiecznym: Tyle kosztuje Cie ten proces w tym miesiacu.
Etykieta pod wynikiem rocznym: Tyle kosztuje Cie przez rok, jesli nic sie nie zmieni.

Stan przed wypelnieniem pol (zamiast wyniku): Wpisz swoje trzy liczby. Nie podstawiamy zadnych domyslnych stawek, bo nie znamy Twoich.

Zdanie zamykajace pod kalkulatorem: Pelne wdrozenie automatyzacji to u nas 3000 do 10000 zl netto jednorazowo i 99 do 599 zl netto miesiecznie za utrzymanie, albo 0 zl miesiecznie, jesli przekazemy infrastrukture Tobie. Jesli Twoj wynik roczny jest wyzszy, rozmowa ma sens.

Mikrocopy pod kalkulatorem: Liczymy tu wylacznie czas pracy. Nie doliczamy kosztu pomylek, spoznionych odpowiedzi ani zlecen, ktore przepadly, bo oferta poszla po trzech dniach.

- **Zrodlo liczb:** 3 do 5 min na fakture i 120 faktur miesiecznie: konspekt, Onyx. Przeliczenie 6 do 10 godzin pokazane w tabeli. Oferta 2 do 4 h do 20 min oraz rachunek 1 h do ok. 5 min: konspekt, Trockenhaus. Ok. 8 h tygodniowo jako OSZCZEDNOSC (nie czas reczny), 12 handlowcow i 3 menedzerow: konspekt, KNF Team. 4 h do 30 min dziennie, 12 osob, 8 do 13 klientow: konspekt, Y-Ads. 3 min na rekord i 20 do 30 min pracy automatu na 1000 rekordow: konspekt, leady B2B. Przeliczenie 50 godzin pokazane w tabeli. Ceny 3000 do 10000 zl, 99 do 599 zl, 0 zl przy przekazaniu infrastruktury: konspekt i decyzja wlasciciela z 2026-08-31. Mnozik 4,33 wyjasniony na stronie jako 52 podzielone przez 12.

---

### 2. Jakie procesy da sie zautomatyzowac w firmie?

- **Gdzie wstawic:** po istniejacej sekcji `rozwiazanie` ("Co dokladnie automatyzujemy?"), przed `tabelaPorownawcza`.
- **Po co:** obecnie mamy tylko cztery zbiorcze kategorie, wiec nie lapiemy dlugiego ogona: "automatyzacja wystawiania faktur", "automatyczne odpowiedzi na maile", "automatyzacja raportow sprzedazowych". easyautomate.pl ma ponad 30 nazwanych automatyzacji jako osobne kafle, codescriptum.pl ma 8. Kazda nazwana karta to osobny zaczep frazowy i naturalna kotwica pod nowe podstrony. Fraza glowna siedzi w naglowku.
- **Typ:** karty w siatce, pogrupowane w 7 blokow. Kazdy blok pokazuje 3 do 4 karty, reszta chowa sie pod przyciskiem "Pokaz wszystkie w tej grupie".

**TRESC:**

Automatyzacja brzmi ogolnie, dopoki nie nazwiesz konkretnego procesu. Ponizej lista rzeczy, ktore da sie zdjac ludziom z biurka. Czesc mamy juz wdrozona u klientow, czesc robimy na zamowienie i mowimy o tym wprost.

Jesli Twojego procesu tu nie ma, to nie znaczy, ze sie nie da. Znaczy tylko, ze trzeba go najpierw obejrzec.

**[BLOK: Sprzedaz i pozyskiwanie klientow]** Dla firm, ktore maja wiecej zapytan niz rak do ich obslugi.

- Budowa listy firm do kontaktu. Automat sklada liste 1000 firm z danymi kontaktowymi w 20 do 30 minut, recznie to ok. 3 minuty na rekord.
- Uzupelnianie danych o kliencie. Do samej nazwy firmy dokleja strone, telefon i adres.
- Kwalifikacja zapytan z formularza. Sortuje zgloszenia na te warte telefonu dzis i te do kolejki.
- Oferta z zapytania. Z tresci zapytania robi wycene wedlug Twojego cennika, Ty sprawdzasz i wysylasz.
- Przypomnienia o ofertach bez odpowiedzi. Pilnuje, zeby zadna wyslana oferta nie lezala bez kontaktu.
- Wpis leada do CRM. Nowe zapytanie z maila, formularza albo czatu trafia do CRM bez przepisywania recznie.

**[BLOK: Obsluga klienta]** Dla firm, w ktorych te same pytania wracaja codziennie.

- Odpowiedzi na maile do przygotowania. Automat pisze gotowy draft odpowiedzi, czlowiek czyta i klika wyslij.
- Segregacja skrzynki. Rozdziela zgloszenia na reklamacje, zapytania ofertowe i sprawy biezace.
- Chatbot dla klientow. Odpowiada z Twojej bazy wiedzy i zbiera kontakt, takze po godzinach. Kanaly, ktore obslugujemy: strona WWW, WhatsApp, Messenger, Instagram i Telegram.
- Odpowiedzi na powtarzalne pytania. Cennik, terminy, zakres uslug i procedury leca z jednego zrodla, nie z pamieci pracownika.
- Statusy zamowien i zgloszen. Klient dostaje informacje o postepie bez pytania.

**[BLOK: Dokumenty i ksiegowosc]** Dla firm, ktore co miesiac przepisuja dokumenty recznie.

- Odczyt faktur kosztowych. Zdjecie faktury zamienia sie w gotowy wpis, zamiast 3 do 5 minut wklepywania.
- Opis i dekretacja dokumentow. Automat proponuje opis i kategorie, ksiegowa zatwierdza.
- Eksport do systemu ksiegowego. Dokumenty trafiaja do Twojego programu bez recznego przenoszenia.
- Wystawianie rachunkow. Rachunek za wykonana prace powstaje z danych zlecenia w kilka minut.
- Obieg akceptacji dokumentu. Faktura idzie do wlasciwej osoby po akceptacje i wraca z decyzja.
- KSeF. Dokumenty wchodza i wychodza zgodnie z krajowym systemem, bez osobnego rytualu.

**[BLOK: Raporty i dane]** Dla wlascicieli i menedzerow, ktorzy sami skladaja liczby.

- Dzienny raport finansowy. Rano wiesz, ile weszlo i ile wyszlo, bez proszenia kogokolwiek.
- Raport sprzedazy dla handlowca i menedzera. Ten sam zestaw liczb co tydzien, liczony zawsze tak samo.
- Przepisywanie danych miedzy systemami. Arkusz, CRM i program ksiegowy przestaja wymagac czlowieka w srodku.
- Alert, gdy liczba spada. Dostajesz wiadomosc, kiedy wskaznik wychodzi poza norme, a nie miesiac pozniej.

**[BLOK: Spotkania]** Osobna usluga, nie mylic z chatbotem.

- Podsumowanie spotkania. Z nagrania albo notatek powstaje streszczenie z lista zadan. Obslugujemy Google Meet, Zoom i Microsoft Teams.

**[BLOK: Wiedza firmowa i produkcja]** Dla firm, w ktorych wiedza siedzi w glowach, a praca na kartkach.

- Baza wiedzy firmy. Pracownik pyta zwyklym zdaniem i dostaje odpowiedz z konkretnej procedury.
- Karta zlecenia na stanowisku. Kazde stanowisko widzi swoje zadanie i odznacza wykonanie.
- Rejestr postepu prac. Wiesz, co jest zrobione, bez obchodzenia hali.
- Umawianie terminow. Kalendarz zapelnia sie bez wymiany dziesieciu maili.

**[BLOK: Zrobimy na zamowienie, tego jeszcze nie mamy w portfolio]** Mowimy wprost, bo nie chcemy sprzedawac doswiadczenia, ktorego nie mamy.

- Wstepna selekcja CV. Aplikacje trafiaja do trzech kubelkow wedlug Twoich kryteriow.
- Wdrozenie nowej osoby. Nowy pracownik dostaje materialy i zadania wedlug gotowej sciezki.
- Wnioski i zgody wewnetrzne. Urlop, zamowienie i akceptacja kosztu ida jedna droga z historia decyzji.
- Zamowienia materialow. System pilnuje stanow i przypomina o zamowieniu, zanim zabraknie.
- Harmonogram pracy zespolu. Zadania rozkladaja sie na ludzi i dni, a zmiana w jednym miejscu przelicza reszte.

- **Zrodlo liczb:** 1000 rekordow w 20 do 30 minut i ok. 3 minuty na rekord recznie: konspekt, leady B2B. 3 do 5 minut na fakture: konspekt, Onyx. Kanaly chatbota (strona WWW, WhatsApp, Messenger, Instagram, Telegram) oraz wylaczenie Slacka i Microsoft Teams z chatbota: decyzja wlasciciela z 2026-08-31. Meet, Zoom i Teams wylacznie przy podsumowaniach spotkan, ta sama decyzja. Podzial na "mamy wdrozone" i "robimy na zamowienie" wynika z listy realizacji w konspekcie: HR, magazyn i harmonogramy nie maja pokrycia w zadnej realizacji, wiec siedza w osobnym bloku. Pozostale karty opisuja mechanizm bez liczb.

---

### 3. Czy automatyzacja procesow AI jest bezpieczna dla firmy?

- **Gdzie wstawic:** po nowej sekcji 2, przed `tabelaPorownawcza`.
- **Po co:** lek numer jeden kupujacego to nie cena, tylko to, ze automat cos wysle bez kontroli. Sekcja domyka obiekcje jeszcze przed cena i lapie frazy "czy AI moze sie pomylic", "kontrola nad agentem AI", "bezpieczenstwo AI w firmie". lessmanual.ai ma uklad Zrodla / Reguly / Kontrola / Czlowiek, dokodu.it robi z tego filar oferty. Fraza glowna siedzi w naglowku.
- **Typ:** akapit + 4 bloki + zdanie zamykajace z dowodem.

**TRESC:**

Najczestsza obawa przy AI nie brzmi "ile to kosztuje", tylko "co, jesli to cos wysle klientowi bez mojej wiedzy". Uczciwa odpowiedz: automat wysyla tylko to, na co sam wczesniej pozwolisz.

Automat pracuje na Twoich dokumentach, Twoim cenniku i Twoich regulach, a wszystko, co robi, zostawia slad, ktory da sie sprawdzic.

**[BLOK 1: Zrodla, czyli skad bierze wiedze]**

- Pracuje na materialach, ktore mu dasz: procedury, cennik, historia korespondencji, opisy uslug, dane z systemu.
- Automat odpowiada na podstawie Twoich materialow i pokazuje, z ktorego dokumentu wzial odpowiedz. Kiedy pewnosc jest niska, sprawa idzie do czlowieka.
- Przy sprawach wychodzacych do klienta i tak stoi akceptacja, wiec pomylka zatrzymuje sie na Tobie, a nie u klienta.
- Gdy zmieniasz cennik albo procedure, zmieniasz ja w jednym miejscu, a automat od razu korzysta z nowej wersji.

**[BLOK 2: Reguly, czyli co mu wolno]**

- Ustalamy z Toba liste rzeczy, ktore automat robi sam, i liste rzeczy, ktorych nie ruszy nigdy.
- Sprawy wrazliwe, jak reklamacja, rezygnacja czy nietypowy rabat, trafiaja do czlowieka z automatu.
- Automat nie wychodzi poza swoj zakres. Bot od faktur nie dotyka skrzynki, bot od maili nie ksieguje.

**[BLOK 3: Kontrola, czyli co widzisz]**

- Kazde uruchomienie zostaje zapisane: co przyszlo na wejsciu, co automat z tym zrobil i co poszlo dalej.
- Blad nie znika po cichu. Dostajesz powiadomienie, a sprawa czeka na czlowieka zamiast leciec dalej.
- Masz wglad w historie, wiec jesli klient pyta o konkretna sprawe, sprawdzasz ja w minute.

**[BLOK 4: Czlowiek, czyli gdzie stoi bramka]**

- Domyslnie automat przygotowuje, a czlowiek zatwierdza. Wysylka, platnosc i wiazaca decyzja zostaja po Twojej stronie.
- Bramke mozna przesuwac. Kiedy po kilku tygodniach widzisz, ze cos dziala bez poprawek, zdejmujesz z tego akceptacje.
- Nie ma sytuacji, w ktorej automat dostaje wolna reke na starcie tylko dlatego, ze tak jest szybciej.

Jak to wyglada w praktyce: w Instytucie Kryptografii automat przygotowuje odpowiedzi na maile do biura obslugi. 80% draftow jest gotowych do wyslania bez poprawek, a przy 580 mailach tygodniowo w szczycie to nadal czlowiek klika wyslij.

Naszego bota mozesz przetestowac u nas na stronie. Wejdz na `/uslugi/chatboty` i kliknij "Zapytaj AI".

- **Zrodlo liczb:** 80% draftow GOTOWYCH DO WYSLANIA bez poprawek i 580 maili tygodniowo w szczycie: konspekt, Instytut Kryptografii, w brzmieniu narzuconym decyzja wlasciciela z 2026-08-31 (automat nie wysyla sam, czlowiek jest w petli). Bot na naszej stronie: zweryfikowany 2026-08-31, widget obecny na `/uslugi/chatboty`, przycisk "Zapytaj AI" dziala, endpoint `/api/chat` odpowiada. Pozostala tresc opisuje sposob pracy, bez liczb. Usunieto wczesniejsza obietnice "nie dopisuje faktow spoza tych zrodel", bo to gwarancja braku pomylki, ktorej nie da sie dotrzymac.

---

### 4. Kto juz wdrozyl automatyzacje procesow i co z tego wyszlo?

- **Gdzie wstawic:** po `tabelaPorownawcza`, przed `kroki`.
- **Po co:** najmocniejszy brak wobec konkurencji. kcmobile.pl podaje case'y z budzetem i czasem, tantor.pl case'y z nazwa klienta, easyautomate.pl 8 imiennych opinii. My mamy zgody na publikacje i realne liczby, a strona uslugi ich nie pokazuje. Karty z nazwa firmy plus liczba plus kontekst to najlepszy material pod cytowanie przez modele jezykowe. Fraza glowna siedzi w naglowku.
- **Typ:** 6 kart case study w stalym ukladzie: Kto / Co robil recznie / Co robi automat / Wynik.

**TRESC:**

Nazwy firm podajemy za zgoda klientow. Liczby sa takie, jakie wyszly, takze tam, gdzie nie dalo sie ich policzyc.

**[KARTA 1]**
Kto: Instytut Kryptografii
Co robil recznie: Zespol biura obslugi pisal kazda odpowiedz od zera, przy 580 mailach tygodniowo w szczycie.
Co robi automat: Czyta wiadomosc, siega do bazy wiedzy i przygotowuje gotowy draft odpowiedzi w skrzynce.
Wynik: 80% draftow jest gotowych do wyslania bez poprawek. Czlowiek nadal klika wyslij.
Dodatkowo: Trzy boty z baza wiedzy zbudowana z transkrypcji kursow, wskazujace dokladne miejsce w nagraniu.

**[KARTA 2]**
Kto: Onyx
Co robil recznie: Ok. 120 faktur miesiecznie przepisywanych po 3 do 5 minut na dokument.
Co robi automat: Aplikacja ksiegowa odczytuje fakture ze zdjecia i uklada dane na miejsce.
Wynik: Wprowadzenie faktury to zrobienie zdjecia. Do tego codzienny raport finansow bez pytania kogokolwiek.

**[KARTA 3]**
Kto: Trockenhaus, osuszanie piwnic i remonty, rynek niemiecki
Co robil recznie: Oferta powstawala 2 do 4 godzin, rachunek za wykonana prace ok. godziny.
Co robi automat: Narzedzie do kosztorysowania sklada oferte i rachunek z danych zlecenia i cennika.
Wynik: Oferta w 20 minut, rachunek w ok. 5 minut, przy 1 do 8 ofertach i 1 do 5 rachunkach miesiecznie.
Dodatkowo: Strona WWW i chatbot. W Google firma przeszla z niewidocznej do pierwszej trojki na fraze Trockenhaus.

**[KARTA 4]**
Kto: Y-Ads
Co robil recznie: Menedzer spinal prace 12 osob przy 8 do 13 klientach rownolegle, 4 godziny dziennie na sama koordynacje.
Co robi automat: Aplikacja prowadzi przeplyw pracy, pilnuje statusow i pokazuje, co stoi.
Wynik: Czas operacyjny menedzera spadl z 4 godzin do 30 minut dziennie.

**[KARTA 5]**
Kto: KNF Team
Co robil recznie: Raporty sprzedazowe skladane recznie dla 12 handlowcow i 3 menedzerow.
Co robi automat: Raporty powstaja same, zawsze wedlug tej samej reguly.
Wynik: Ok. 8 godzin tygodniowo mniej pracy w skali zespolu.

**[KARTA 6]**
Kto: ZB Bielizsy, zaklad produkcyjny
Co robil recznie: Obieg zlecen miedzy 5 stanowiskami i 14 osobami trzymal sie na kartkach i pytaniach.
Co robi automat: Aplikacja prowadzi zlecenie przez stanowiska i pokazuje stan pracy.
Wynik: Tu oszczednosci czasu nie da sie policzyc i mowimy o tym wprost. Zysk jest w porzadku i widocznosci, nie w godzinach.

- **Zrodlo liczb:** wszystkie liczby z sekcji REALIZACJE w konspekcie. Instytut Kryptografii: 80% draftow gotowych do wyslania bez poprawek (brzmienie z decyzji wlasciciela), 580 maili tygodniowo w szczycie, 3 boty z transkrypcji kursow. Onyx: ok. 120 faktur miesiecznie, 3 do 5 min na fakture, codzienny raport finansow. ZAKAZ zachowany, nigdzie nie ma slowa o placeniu faktur przez API banku. Trockenhaus: 2 do 4 h do 20 min, 1 h do ok. 5 min, 1 do 8 ofert i 1 do 5 rachunkow miesiecznie, pozycja w Google. Y-Ads: 12 osob, 8 do 13 klientow, 4 h do 30 min dziennie. KNF Team: 12 handlowcow, 3 menedzerow, ok. 8 h tygodniowo jako oszczednosc, opisane jednym zdaniem zgodnie z zastrzezeniem wlasciciela. ZB Bielizsy: 14 osob, 5 stanowisk, brak policzalnej oszczednosci napisany wprost.

---

### 5. Na jakich narzedziach budujemy automatyzacje?

- **Gdzie wstawic:** po `kroki` ("Jak wyglada wdrozenie automatyzacji krok po kroku?"), przed `ramaCeny`.
- **Po co:** lapie frazy narzedziowe: "automatyzacja Make.com", "wdrozenie n8n", "automatyzacja z Claude". Uprzedza pytanie o uzaleznienie od wykonawcy. To tez hub linkujacy do nowej podstrony `/uslugi/automatyzacje/make`. tantor.pl ma "Narzedzia ktorych uzywamy", dokodu.it sprzedaje "Systemy na wlasnosc".
- **Typ:** karty + akapit o wlasnosci infrastruktury.

**TRESC:**

Nie budujemy wszystkiego od zera, bo to podnosi cene i czas. Skladamy automat z narzedzi, ktore sa sprawdzone, maja dokumentacje i przetrwaja zmiane wykonawcy.

**[KARTY]**

- Make.com. Spina Twoje systemy i prowadzi automat krok po kroku. Widzisz kazdy przebieg i miejsce, w ktorym cos stanelo.
- n8n. To samo zadanie, kiedy chcesz miec silnik automatyzacji na wlasnym serwerze.
- Claude od Anthropic. Odpowiada za czesc, ktora czyta i pisze: tresc maila, odczyt dokumentu, streszczenie rozmowy. Na naszym wlasnym bocie na stronie pracuje model claude-haiku-4-5.
- KSeF. Wpiecie obiegu faktur w krajowy system, bez osobnej sciezki obok.
- Twoje obecne systemy. Poczta, arkusze, CRM, program do faktur i kalendarz. Podlaczamy sie do tego, czego juz uzywasz, zamiast namawiac Cie na zmiane oprogramowania.

**Na czyim koncie to stoi.** Przy kazdym wdrozeniu wybierasz jedna z dwoch drog. Pierwsza: infrastruktura zostaje u nas i placisz abonament utrzymaniowy, przy automatyzacjach i chatbotach 99 do 599 zl netto miesiecznie. Druga: przekazujemy cala infrastrukture na Twoje konta, wtedy utrzymanie kosztuje 0 zl miesiecznie, a pojedyncze poprawki rozliczamy po 350 zl netto za godzine.

Wybor jest Twoj i mozna go zmienic pozniej, w obie strony. Przekazanie infrastruktury na Twoje konta jest standardowym elementem wspolpracy, a nie kara za odejscie.

- **Zrodlo liczb:** Make.com i n8n: narzedzia juz opisane na produkcji w sekcji `rozwiazanie` strony `/uslugi/automatyzacje`. Anthropic (Claude) i model claude-haiku-4-5: decyzja wlasciciela z 2026-08-31, sprawdzone w kodzie tego samego dnia. Nie piszemy nigdzie o OpenAI, bo to nie jest nasz dostawca modelu. KSeF: portfolio narzedzi z konspektu, opisane bezosobowo. 99 do 599 zl netto miesiecznie, 0 zl przy przekazaniu infrastruktury i 350 zl netto za godzine poprawek: decyzja wlasciciela z 2026-08-31 rozszerzajaca model utrzymania na wszystkie uslugi. Usunieto karty Supabase, Vercel i Google Workspace, bo nie ma dla nich pokrycia w konspekcie.

---

### 6. Automatyzacja procesow czy dodatkowy etat: co sie bardziej oplaca?

- **Gdzie wstawic:** po nowej sekcji 5, przed `ramaCeny`.
- **Po co:** frazy "automatyzacja czy etat", "czy oplaca sie automatyzacja" plus najtwardszy argument sprzedazowy. kcmobile.pl ma "AI vs tradycyjne rozwiazania", easyautomate.pl ma "Automatyzacja kontra tradycyjne metody", lessmanual.ai liczy roczny koszt. Nasza przewaga: z abonamentu u nas mozna wyjsc, a rozwiazanie zostaje. Fraza glowna siedzi w naglowku.
- **Typ:** tabela porownawcza 3 kolumny + akapit z uczciwym zastrzezeniem.

**TRESC:**

To pytanie pada w co drugiej rozmowie i zasluguje na liczby, a nie na haslo. Zestawmy trzy drogi obok siebie.

| | Dodatkowy etat | Abonament u agencji | Wdrozenie u nas |
|---|---|---|---|
| Koszt pierwszego roku | Wynagrodzenie razy 12 plus koszty pracodawcy. Wpisz swoja stawke w kalkulatorze wyzej, bo tylko Ty ja znasz | Stala oplata co miesiac, naliczana tak dlugo, jak trwa umowa | Od 3000 zl + 12 x 99 zl = 4188 zl netto, do 10000 zl + 12 x 599 zl = 17188 zl netto |
| Koszt drugiego roku | Tyle samo co w pierwszym, zwykle wiecej | Znowu pelna stawka, bez konca | Samo utrzymanie: od 12 x 99 zl = 1188 zl do 12 x 599 zl = 7188 zl netto. Albo 0 zl, jesli przejmiesz infrastrukture, wtedy poprawki po 350 zl netto za godzine |
| Kto jest wlascicielem rozwiazania | Nie dotyczy, prace wykonuje czlowiek | Agencja. Konczysz abonament, konczy sie automat | Ty, jesli wybierzesz przekazanie infrastruktury. Automat stoi na Twoich kontach i zostaje |
| Co sie dzieje przy urlopie i chorobie | Proces staje albo ktos przejmuje robote | Automat dziala | Automat dziala |
| Czas uruchomienia | Rekrutacja, wdrozenie, nauka procesu | Zalezy od kolejki agencji | Audyt 1490 zl i 5 dni roboczych, potem wdrozenie z gotowej mapy procesow |

**Kiedy etat wygrywa.** Wtedy, gdy praca polega na decyzjach, rozmowie z klientem i wyjatkach, a nie na powtarzaniu tej samej sekwencji. Automat swietnie zdejmuje z czlowieka nudna czesc dnia, ale nie zastapi kogos, kto negocjuje, uspokaja klienta i bierze odpowiedzialnosc.

Najczesciej odpowiedz brzmi "jedno i drugie". Zostawiasz ludzi tam, gdzie liczy sie glowa, a automatowi oddajesz przepisywanie, skladanie raportow i pierwsza wersje odpowiedzi.

- **Zrodlo liczb:** 3000 do 10000 zl, 99 do 599 zl miesiecznie, 1490 zl i 5 dni roboczych za audyt, 0 zl utrzymania przy przekazaniu infrastruktury i 350 zl netto za godzine: konspekt i decyzja wlasciciela z 2026-08-31. Sumy roczne to nasze wlasne przeliczenie, pokazane w tabeli dzialaniem: 3000 + 12 x 99 = 4188 oraz 10000 + 12 x 599 = 17188, a w drugim roku 12 x 99 = 1188 oraz 12 x 599 = 7188. Kolumna "Abonament u agencji" NIE ZAWIERA ZADNEJ KWOTY, bo nie mamy ceny konkurenta zweryfikowanej na jej stronie. Kolumna "Dodatkowy etat" nie zawiera kwoty z tego samego powodu i odsyla do kalkulatora, w ktorym klient wpisuje swoja stawke.

---

### 7. Pelna drabina cen: od audytu po asystenta prezesa

- **Gdzie wstawic:** WEWNATRZ istniejacej sekcji `ramaCeny`, jako blok typu `tabela` doklejony pod istniejaca tabela progow i pod istniejacym przelacznikiem. To jest H3 wewnatrz istniejacej sekcji, NIE nowy H2. Powod: strona ma juz H2 "Ile kosztuje wdrozenie automatyzacji?" i drugi naglowek cenowy dublowalby intencje.
- **Po co:** glowna fraza transakcyjna obszaru. Cztery z siedmiu badanych konkurentow maja jawny cennik z progami, a my mamy tylko widelki dla samej automatyzacji. Nasze progi sa nizsze i to jest przewaga, ktorej dzis nie pokazujemy.
- **Typ:** tabela + wiersz o zuzyciu + odsylacz do podstrony cennika.

**TRESC:**

Ponizej pelna drabina, jesli szukasz czegos innego niz sama automatyzacja procesu. Wszystkie kwoty sa netto.

| Rozwiazanie | Cena netto | Czas realizacji |
|---|---|---|
| Audyt AI, Sprint Diagnostyczny | 1490 zl, odliczane od wdrozenia | 5 dni roboczych |
| AI Start, pierwsza automatyzacja na probe | 1990 zl | ustalamy przy zamowieniu, po poznaniu procesu |
| Automatyzacja, pelne wdrozenie | 3000 do 10000 zl | ustalamy przy wycenie, zaleznie od liczby integracji |
| Chatbot prosty: bot na strone z Twoja baza wiedzy i zbieraniem leadow | 1790 zl | 1 do 2 dni robocze |
| Chatbot sredni | 3000 do 6000 zl | 3 do 4 dni robocze |
| Chatbot duzy, z integracjami | 8000 do 15000 zl | 5 do 10 dni roboczych |
| Voicebot prosty | 2500 zl | ustalamy przy wycenie |
| Voicebot z integracjami, na przyklad z kalendarzem | 5000 do 9000 zl | ustalamy przy wycenie |
| Asystent prezesa | 7999 zl plus 199 zl miesiecznie za serwery | 5 do 10 dni roboczych |
| Landing page | 1590 zl | 1 dzien roboczy |
| Strona biznesowa | 2900 zl | 2 do 4 dni robocze |
| Strona zaawansowana: sklep albo wpiete narzedzia | od 5900 zl | 5 do 10 dni roboczych |
| Baza leadow B2B, 1000 rekordow | 169 zl | 20 do 30 minut pracy automatu |
| Baza leadow B2B, 5000 rekordow | 699 zl | ten sam dzien roboczy |
| Baza leadow B2B, 10000 rekordow | 1390 zl | ten sam dzien roboczy |

**Utrzymanie po wdrozeniu.** Przy kazdej z tych pozycji wybierasz jedna z dwoch drog. Infrastruktura u nas: 99 do 599 zl netto miesiecznie przy automatyzacjach i chatbotach, 299 do 1500 zl netto miesiecznie przy voibotach. Infrastruktura u Ciebie: 0 zl netto miesiecznie, a pojedyncze poprawki rozliczamy po 350 zl netto za godzine.

**Trzecia pozycja, o ktorej mowimy zawsze.** Przy kazdym bocie rozpisujemy trzy osobne kwoty: stworzenie, utrzymanie i zuzycie tokenow albo minut. Zuzycie placisz bezposrednio u dostawcy AI, bo rosnie z liczba maili, dokumentow i rozmow. Nigdy nie chowamy go w cenie wdrozenia, zeby oferta wygladala ladniej. Wiecej o tym nizej, w sekcji o kosztach poza faktura.

**AI Start za 1990 zl to nie to samo co chatbot za 1790 zl.** AI Start dziala do wewnatrz, automatyzuje proces w Twojej firmie. Chatbot dziala na zewnatrz, rozmawia z Twoimi klientami.

- **Zrodlo liczb:** audyt 1490 zl i 5 dni roboczych z raportem PDF i odliczeniem od wdrozenia, AI Start 1990 zl, automatyzacja 3000 do 10000 zl, chatbot prosty 1790 zl i 1 do 2 dni, chatbot sredni 3000 do 6000 zl i 3 do 4 dni, chatbot duzy 8000 do 15000 zl i 5 do 10 dni, voicebot prosty 2500 zl, voicebot z integracjami 5000 do 9000 zl, asystent prezesa 7999 zl plus 199 zl miesiecznie i 5 do 10 dni, leady B2B 169 / 699 / 1390 zl, 20 do 30 minut pracy automatu na 1000 rekordow, trzy pozycje przy kazdym bocie: konspekt firmy. Ceny stron WWW (1590 zl i 1 dzien, 2900 zl i 2 do 4 dni, od 5900 zl i 5 do 10 dni) oraz utrzymanie 99 do 599 zl i 299 do 1500 zl, 0 zl przy przekazaniu infrastruktury i 350 zl netto za godzine: decyzja wlasciciela z 2026-08-31. Czas 20 do 30 minut stoi WYLACZNIE przy 1000 rekordow, bo konspekt podaje go raz i dla tej paczki. Rozroznienie AI Start kontra chatbot: wymog konspektu, ma stac przy obu kwotach.

---

### 8. Jakie koszty dochodza poza faktura za wdrozenie?

- **Gdzie wstawic:** po calej sekcji `ramaCeny`, przed nowa sekcja 9.
- **Po co:** lapie frazy "ukryte koszty automatyzacji", "koszty utrzymania automatyzacji", "ile kosztuje API". Buduje zaufanie przez uczciwosc, ktorej nie ma wiekszosc rynku. To tez miejsce na nasza regule trzech pozycji.
- **Typ:** akapit + lista + akapit zamykajacy.

**TRESC:**

Cena wdrozenia to nie jest cala prawda o kosztach i wolimy powiedziec to przed umowa niz po niej. Ponizej wszystko, co moze dojsc poza nasza faktura.

Nasza regula: przy kazdym bocie zawsze rozpisujemy trzy osobne pozycje. Stworzenie, utrzymanie i zuzycie. Nigdy nie chowamy zuzycia w cenie wdrozenia.

- **Stworzenie.** Jednorazowa kwota za zbudowanie automatu, u nas 3000 do 10000 zl netto za pelne wdrozenie.
- **Utrzymanie.** 99 do 599 zl netto miesiecznie za automatyzacje i chatboty, jesli infrastruktura zostaje u nas. Mozesz tez przejac infrastrukture i placic 0 zl, wtedy poprawki rozliczamy po 350 zl netto za godzine.
- **Zuzycie tokenow albo minut.** To rachunek za prace modelu AI, platny bezposrednio przez Ciebie u dostawcy. Rosnie z liczba maili, dokumentow i rozmow, wiec nie da sie go zaryczaltowac uczciwie.
- **Licencje narzedzi.** Konta typu Make.com czy n8n zakladamy na Twoja firme, wiec placisz je bezposrednio i mozesz je w kazdej chwili sprawdzic.
- **Serwery, tam gdzie wystepuja.** Przy asystencie prezesa to 199 zl netto miesiecznie. Przy prostszych automatyzacjach ten koszt zwykle nie wystepuje.
- **Nowe funkcje spoza pierwszej rozmowy.** Jesli w trakcie pojawia sie pomysl, ktorego nie bylo w ustaleniach, wyceniamy go osobno, zamiast po cichu przesuwac termin.

**Dlaczego zuzycie zostaje po Twojej stronie.** Bo placisz wtedy za realne uzycie, a nie za srednia wyliczona przez wykonawce. Przy okazji widzisz w panelu, ile automat naprawde pracowal.

- **Zrodlo liczb:** trzy pozycje przy kazdym bocie, 3000 do 10000 zl, 199 zl miesiecznie za serwery przy asystencie prezesa, nowe funkcje spoza pierwszej rozmowy jako osobna wycena: konspekt firmy. 99 do 599 zl miesiecznie, 0 zl przy przekazaniu infrastruktury i 350 zl netto za godzine poprawek: decyzja wlasciciela z 2026-08-31. Nie podajemy zadnych widelek kosztu tokenow, bo nie ma ich w konspekcie i zaleza od ruchu u klienta.

---

### 9. Co jest w cenie wdrozenia i co, jesli automat nie zadziala?

- **Gdzie wstawic:** po nowej sekcji 8, przed nowa sekcja 10.
- **Po co:** domyka ostatnia obiekcje przed decyzja. tantor.pl sprzedaje to gwarancja ROI w 90 dni i kara 10% za opoznienie, lukaszpodgorski.pl ma o tym cale FAQ o pieniadzach. My mamy realny, sprawdzalny zapis, ktorego nie pokazujemy na tej stronie: dwie rundy poprawek w rytmie, ktory da sie sprawdzic w kalendarzu.
- **Typ:** akapit + trzy listy.

**TRESC:**

Najwiekszy strach przed zakupem brzmi tak: zaplace, dostane cos, co dziala na pokazie, a w mojej firmie sie rozsypie. Dlatego rytm poprawek mamy zapisany, a nie ustalany w biegu.

**[CO WCHODZI W CENE WDROZENIA]**

- Zbudowanie automatu i podpiecie go do systemow, ktorych naprawde uzywasz.
- Pierwszy tydzien testow po Twojej stronie. Pracujesz normalnie i zglaszasz, co nie pasuje.
- Pierwsza runda poprawek, na podstawie Twoich zgloszen.
- Drugi tydzien testow. Sprawdzasz to samo jeszcze raz, juz po zmianach.
- Druga runda poprawek i odbior.
- Instrukcja obslugi dla Twojego zespolu, zeby korzystanie nie wisialo na jednej osobie.

**[CO JEST POZA CENA]**

- Nowe funkcje, ktorych nie bylo w pierwszej rozmowie. Wyceniamy je osobno i mowimy o tym od razu, a nie po fakcie.
- Zmiany wynikajace z przebudowy Twojego procesu w trakcie prac. Jesli proces zmienia sie w polowie, zmienia sie tez zakres.
- Zuzycie tokenow, licencje narzedzi i serwery, o ktorych piszemy w sekcji o kosztach poza faktura.

**[CO PO ODBIORZE]**

- Utrzymanie za 99 do 599 zl netto miesiecznie, jesli infrastruktura zostaje u nas. Pilnujemy dzialania i reagujemy, kiedy zmieni sie cos po stronie Twoich systemow.
- Albo przekazanie infrastruktury na Twoje konta. Wtedy utrzymanie kosztuje 0 zl, a pojedyncze poprawki rozliczamy po 350 zl netto za godzine.
- Wybor jest Twoj i mozna go zmienic pozniej, w obie strony.

Dwa tygodnie testow u Ciebie w firmie to nie jest formalnosc. To moment, w ktorym wychodza wyjatki, o ktorych nikt nie pamietal na pierwszym spotkaniu, i wlasnie po to sa w cenie.

- **Zrodlo liczb:** dwie rundy poprawek w rytmie tydzien testow, poprawki, drugi tydzien testow, poprawki, odbior oraz nowe funkcje spoza pierwszej rozmowy jako osobna wycena: konspekt firmy. Utrzymanie 99 do 599 zl miesiecznie, 0 zl przy przekazaniu infrastruktury i 350 zl netto za godzine: decyzja wlasciciela z 2026-08-31. Nie obiecujemy gwarancji ROI ani kar umownych, bo nie ma ich w konspekcie.

---

### 10. Kiedy nie warto automatyzowac procesu u nas?

- **Gdzie wstawic:** po nowej sekcji 9, przed nowa sekcja 11.
- **Po co:** lapie frazy "czy automatyzacja sie oplaca", "kiedy AI nie ma sensu" i kwalifikuje leady, wiec oszczedza rozmowy bez szans. Buduje wiarygodnosc, ktora modele jezykowe chetnie cytuja, bo to rzadki fragment, w ktorym ktos odradza zakup. lukaszpodgorski.pl ma "Czego nie robie", kcmobile.pl ma czerwone flagi w ofertach.
- **Typ:** akapit + dwie listy + uczciwy przyklad z portfolio.

**TRESC:**

Nie kazdy proces nadaje sie do automatyzacji i nie kazdemu oplaca sie za to placic. Wolimy powiedziec to na pierwszej rozmowie niz po podpisaniu umowy.

**[TEGO NIE BIERZEMY]**

- Proces bez powtarzalnosci. Jesli kazda sprawa wyglada inaczej i wymaga decyzji czlowieka, nie ma czego automatyzowac.
- Proces ponizej progu oplacalnosci. Kiedy roczny koszt Twojego czasu jest nizszy niz wdrozenie, mowimy o tym wprost i odradzamy zakup.
- Brak jakiegokolwiek zrodla danych. Automat musi miec skad czytac. Jesli cennik i procedury sa tylko w glowie wlasciciela, najpierw trzeba je spisac.
- Proces, ktory zmienia sie co miesiac. Nie ma sensu utrwalac czegos, co za cztery tygodnie i tak bedzie inne.
- Automatyzacja balaganu. Jesli proces jest zle poukladany, automat bedzie po prostu szybciej powielal ten sam blad.
- Zadanie, w ktorym pomylka jest nie do odkrecenia, a nikt nie chce jej sprawdzac. Bez bramki czlowieka nie budujemy takich rozwiazan.

**[POWIEMY CI, CO ZROBIC SAMODZIELNIE]**

- Czasem wystarczy jeden dobrze zrobiony arkusz albo szablon odpowiedzi. Wtedy to mowimy i nie wystawiamy faktury.
- Czasem najpierw trzeba spisac procedure i cennik. Podpowiemy, jak to ulozyc, zeby pozniej dalo sie na tym postawic automat.
- Czasem lepszym pierwszym krokiem jest audyt za 1490 zl, zeby zobaczyc, ktory proces w ogole daje najwiekszy zwrot.

**Uczciwy przyklad z naszego portfolio.** W ZB Bielizsy zbudowalismy aplikacje dla 14 osob na 5 stanowiskach i oszczednosci czasu po prostu nie da sie tam policzyc. Zysk jest w porzadku i widocznosci pracy, i tak to opisujemy, zamiast dorabiac procent.

- **Zrodlo liczb:** audyt 1490 zl: konspekt firmy. ZB Bielizsy, 14 osob na 5 stanowiskach, brak policzalnej oszczednosci czasu: konspekt, z wyraznym poleceniem napisania tego wprost. Pozostale punkty to kryteria jakosciowe, bez liczb.

---

### 11. Co dzieje sie z danymi Twojej firmy?

- **Gdzie wstawic:** po nowej sekcji 10, przed `faq` i `powiazane`.
- **Po co:** lek numer jeden kupujacego AI w Polsce i w Niemczech to dane. Lapie frazy "AI a RODO", "czy AI uczy sie na moich danych", "AI Act dla firm". Potrzebna wprost przy rynku niemieckim (Trockenhaus, Fichtelgebirgshaus). codescriptum.pl trzyma to jako osobny blok, dokodu.it robi z tego filar oferty, my nie mamy tego wcale na tej stronie.
- **Typ:** akapit + lista + akapit o rynku niemieckim.

**TRESC:**

Zanim padnie pytanie o cene, zwykle pada pytanie o dane. Czy wyjda z firmy, kto je zobaczy i na czym to w ogole pracuje. Odpowiadamy po kolei.

- **Gdzie fizycznie stoja dane.** Domyslnie na kontach Twojej firmy: Twoj dysk, Twoja baza, Twoje konto narzedzia automatyzacji. Mozemy trzymac je u nas, jesli tak wolisz, i to jest swiadoma decyzja, a nie ustawienie domyslne. Dane zostaja w Unii Europejskiej.
- **Kto ma dostep.** Tylko osoby, ktore faktycznie pracuja nad Twoim wdrozeniem, i tylko na czas pracy. Dostepy odbieramy po odbiorze, jesli nie zostajemy przy utrzymaniu.
- **Na jakim modelu to pracuje.** Korzystamy z modeli Claude od Anthropic, przez firmowy dostep API. Nasz wlasny bot na stronie pracuje na modelu claude-haiku-4-5 i mozesz go przetestowac na `/uslugi/chatboty`.
- **Co trafia do modelu.** Tylko ta czesc danych, ktora jest potrzebna do wykonania zadania. Jesli automat ma napisac odpowiedz o terminie realizacji, nie wysylamy mu calej bazy klientow.
- **Umowa powierzenia przetwarzania danych.** Podpisujemy ja przed startem prac, wszedzie tam, gdzie automat dotyka danych osobowych. Pracujemy zgodnie z RODO oraz AI Act, ktory w pelni obowiazuje od 2 sierpnia 2026.
- **Przekazanie calej infrastruktury.** W kazdej chwili mozesz przejac automat na wlasne konta. Wtedy utrzymanie kosztuje 0 zl, a pojedyncze poprawki rozliczamy po 350 zl netto za godzine.
- **Co zostaje w logach.** Zapis tego, co automat zrobil, zebys mogl sprawdzic kazda sprawe. Zakres i czas przechowywania logow ustalamy razem z Toba przed wdrozeniem.

**Jesli dzialasz takze w Niemczech.** Obslugujemy oba rynki i wiemy, ze tam pytanie o dane pada wczesniej i ostrzej niz w Polsce. Ustawienie infrastruktury na kontach klienta i jasny zakres tego, co wychodzi do modelu, zalatwiaja wieksza czesc tej rozmowy jeszcze przed oferta.

**Dwa pytania do dolozenia do istniejacego bloku `faq` na tej stronie:**

Pytanie: Na jakim modelu AI pracuja Wasze automatyzacje?
Odpowiedz: Na modelach Claude od Anthropic, przez firmowy dostep API. Nasz wlasny bot na stronie pracuje na modelu claude-haiku-4-5 i mozesz go przetestowac na podstronie chatbotow. Model dobieramy do zadania, bo inny sprawdza sie przy odczycie faktur, a inny przy pisaniu odpowiedzi na maile.

Pytanie: Czy po wdrozeniu musze placic abonament?
Odpowiedz: Nie musisz. Przy kazdym wdrozeniu wybierasz jedna z dwoch drog. Infrastruktura zostaje u nas i placisz 99 do 599 zl netto miesiecznie przy automatyzacjach i chatbotach, albo przekazujemy cala infrastrukture na Twoje konta i wtedy utrzymanie kosztuje 0 zl, a pojedyncze poprawki rozliczamy po 350 zl netto za godzine.

- **Zrodlo liczb:** 0 zl utrzymania przy przekazaniu infrastruktury, 350 zl netto za godzine poprawek, 99 do 599 zl miesiecznie: decyzja wlasciciela z 2026-08-31. Anthropic (Claude) i claude-haiku-4-5: decyzja wlasciciela, sprawdzone w kodzie 2026-08-31. Bot na `/uslugi/chatboty` dziala, zweryfikowany 2026-08-31. Dane w Unii Europejskiej, umowa powierzenia, RODO i AI Act od 2 sierpnia 2026: zapisy juz opublikowane w istniejacym bloku `faq` tej strony. Obsluga rynku polskiego i niemieckiego: konspekt, sekcja RYNKI. Usunieto wczesniejsze zdanie o nietrenowaniu modeli na danych klienta, bo nie mamy dla niego zrodla.

---

## Nowe podstrony

Wszystkie w gniezdzie `/uslugi/automatyzacje/`. Kolor kategorii i uklad wzorowany na istniejacych podstronach uslug.

---

### P1. /uslugi/automatyzacje/obsluga-maili

- **H1:** Automatyzacja obslugi maili w firmie
- **metaTitle:** `Automatyzacja maili w firmie: cena i czas` (40 znakow)
- **Fraza glowna:** automatyzacja obslugi maili
- **Rozdzial intencji:** strona matka odpowiada na "co da sie zautomatyzowac i ile to kosztuje ogolnie". Ta podstrona odpowiada wylacznie na "kto odpisze za mnie na maile". Nie porusza faktur (podstrona P2), nie porusza rozmow telefonicznych (obszar voicebotow), nie porusza chatbota dla klientow (obszar chatbotow). Jedyne przejscie do voicebotow i chatbotow przez blok powiazanych.
- **Uzasadnienie:** najmocniejszy dowod, jaki mamy, plus fraza z realna intencja zakupowa. Konkurencja opisuje obsluge maili jako jeden kafel wsrod osmiu (codescriptum.pl) albo jeden case (dokodu.it), nikt nie ma na to osobnej podstrony z liczba i cena.

**Kapsula (gotowa do wklejenia):**

Automatyzacja obslugi maili to przejecie przez system pierwszej wersji odpowiedzi. Mail przychodzi, automat czyta go, siega do Twojej bazy wiedzy i przygotowuje gotowy draft w skrzynce. Czlowiek czyta i klika wyslij. W Instytucie Kryptografii 80% draftow jest gotowych do wyslania bez poprawek, przy 580 mailach tygodniowo w szczycie. Wdrozenie kosztuje 3000 do 10000 zl netto, a pierwszy proces na probe 1990 zl netto.

**Sekcje:**

1. Ile godzin dziennie Twoj zespol spedza w skrzynce?
2. Jak wyglada skrzynka po wdrozeniu: mail przychodzi, automat przygotowuje odpowiedz, czlowiek klika wyslij
3. Co automat potrafi, a czego nie zrobi bez czlowieka
4. Skad bierze wiedze: baza dokumentow, historia korespondencji, cennik, procedury
5. Realizacja: Instytut Kryptografii, 580 maili tygodniowo w szczycie, 80% draftow gotowych do wyslania bez poprawek
6. Ile to kosztuje i ile trwa: AI Start 1990 zl, pelne wdrozenie 3000 do 10000 zl, utrzymanie 99 do 599 zl miesiecznie u nas albo 0 zl przy przekazaniu infrastruktury, tokeny po stronie klienta
7. Kiedy nie warto automatyzowac skrzynki
8. Twoje dane i RODO
9. FAQ
10. Powiazane: automatyzacja faktur, chatbot dla klientow, voicebot do odbierania telefonow
11. CTA: bezplatna rozmowa 30 minut

**FAQ (gotowe):**

- **Czy automat sam wysyla maile do moich klientow?** Nie. Automat przygotowuje gotowy draft w skrzynce, a wysylke zatwierdza czlowiek. W Instytucie Kryptografii 80% draftow jest gotowych do wyslania bez poprawek, ale to nadal czlowiek klika wyslij. Bramke akceptacji mozna zdjac pozniej, gdy sam zobaczysz, ze dany typ odpowiedzi wychodzi bez korekt.
- **Skad automat wie, co odpisac?** Z materialow, ktore mu dasz: procedur, cennika, opisow uslug i historii korespondencji. Kiedy odpowiedzi nie ma w materialach albo pewnosc jest niska, sprawa idzie do czlowieka zamiast do klienta.
- **Ile kosztuje automatyzacja obslugi maili?** Pierwsza automatyzacja na probe to 1990 zl netto. Pelne wdrozenie kosztuje 3000 do 10000 zl netto, zaleznie od liczby integracji. Do tego utrzymanie 99 do 599 zl netto miesiecznie, jesli infrastruktura zostaje u nas, albo 0 zl, jesli przekazemy ja Tobie. Zuzycie tokenow placisz bezposrednio u dostawcy AI.
- **Ile trwa wdrozenie?** Termin ustalamy przy wycenie, bo zalezy od liczby systemow do podpiecia. W cenie sa dwie rundy poprawek: tydzien testow u Ciebie, poprawki, drugi tydzien testow, poprawki, odbior.
- **Czy to zadziala przy skrzynce zbiorczej biura obslugi?** Tak, to typowy przypadek. W Instytucie Kryptografii automat obsluguje wlasnie taka skrzynke, przy 580 mailach tygodniowo w szczycie.

---

### P2. /uslugi/automatyzacje/faktury-i-ksiegowosc

- **H1:** Automatyzacja faktur i obiegu dokumentow
- **metaTitle:** `Automatyzacja faktur i ksiegowosci: cennik` (41 znakow)
- **Fraza glowna:** automatyzacja faktur
- **Rozdzial intencji:** bierze wylacznie dokumenty kosztowe i sprzedazowe: skan, odczyt, opis, wrzutka do systemu ksiegowego, raport. Nie dotyka ofertowania i kosztorysow (P3), nie dotyka maili (P1), nie dotyka raportow sprzedazowych (P4, bo tam zrodlem sa rozmowy i CRM, a nie dokumenty).
- **ZAKAZ PUBLIKACYJNY:** przy Onyx ani slowa o placeniu faktur przez API banku. Sesja wdrozeniowa musi to sprawdzic przed publikacja.
- **Uzasadnienie:** druga najczesciej kupowana automatyzacja na rynku. Mamy wlasny dowod (Onyx) i KSeF w portfolio, ktory w 2026 jest samodzielnym magnesem na ruch.

**Kapsula (gotowa do wklejenia):**

Automatyzacja faktur to zamiana recznego wklepywania na zdjecie dokumentu. Robisz zdjecie faktury, automat odczytuje dane, proponuje opis i kategorie, a ksiegowa zatwierdza. W Onyx bylo to ok. 120 faktur miesiecznie po 3 do 5 minut na dokument, czyli 6 do 10 godzin miesiecznie samego przepisywania. Dzis wprowadzenie faktury to zrobienie zdjecia, a raport finansow przychodzi codziennie.

**Sekcje:**

1. Ile kosztuje Cie reczne wklepywanie faktur? (120 dokumentow x 3 do 5 minut = 6 do 10 godzin miesiecznie, dzialanie pokazane w tekscie)
2. Jak to dziala: zdjecie albo plik, odczyt, opis, eksport do systemu, raport
3. Co dokladnie automatyzujemy: koszty, sprzedaz, dokumenty magazynowe, uzgodnienia
4. KSeF: co sie zmienia i co automat bierze na siebie
5. Realizacja: Onyx, ok. 120 faktur miesiecznie, codzienny raport finansow
6. Ile to kosztuje i ile trwa: pelne wdrozenie 3000 do 10000 zl, utrzymanie 99 do 599 zl miesiecznie albo 0 zl przy przekazaniu infrastruktury
7. Kiedy to sie nie oplaca
8. Twoje dane, RODO i gdzie stoja dokumenty
9. FAQ
10. Powiazane: automatyzacja maili, raporty sprzedazowe, audyt AI
11. CTA

---

### P3. /uslugi/automatyzacje/ofertowanie-i-kosztorysy

- **H1:** Automatyczne ofertowanie i kosztorysowanie
- **metaTitle:** `Automatyczne ofertowanie i kosztorysy` (37 znakow)
- **Fraza glowna:** automatyzacja ofertowania
- **Rozdzial intencji:** ta podstrona dotyczy WYJSCIA do klienta: wycena, oferta, kosztorys, rachunek za wykonana prace. P2 dotyczy dokumentow wchodzacych i ksiegowosci. P5 dotyczy tego, komu wyslac oferte, a nie jak ja policzyc. Tu frazy: kosztorys, wycena, oferta. Tam: faktura, odczyt dokumentu, KSeF.
- **Uzasadnienie:** fraza praktycznie nieobsadzona przez konkurentow z listy, a my mamy na to najostrzejsza liczbe w portfolio. Dziala na dwa rynki naraz, bo klient jest niemiecki.

**Kapsula (gotowa do wklejenia):**

Automatyczne ofertowanie to zamiana recznego liczenia na gotowy dokument do sprawdzenia. Automat bierze dane z zapytania, siega do Twojego cennika i norm, i sklada oferte albo rachunek. W Trockenhaus oferta powstawala 2 do 4 godzin, teraz zajmuje 20 minut. Rachunek za wykonana prace skrocil sie z ok. godziny do ok. 5 minut.

**Sekcje:**

1. Ile trwa u Ciebie przygotowanie jednej oferty?
2. Jak to dziala: dane z zapytania, cennik i normy, gotowy dokument do sprawdzenia
3. Skad automat bierze ceny i co sie dzieje, gdy cennik sie zmienia
4. Realizacja: Trockenhaus, oferta z 2 do 4 godzin do 20 minut, rachunek z 1 godziny do ok. 5 minut
5. Dla kogo to dziala: firmy remontowe, produkcyjne, uslugowe z powtarzalnym cennikiem
6. Ile to kosztuje i ile trwa: pelne wdrozenie 3000 do 10000 zl, utrzymanie 99 do 599 zl miesiecznie albo 0 zl przy przekazaniu infrastruktury
7. Kiedy nie warto: gdy kazda wycena jest indywidualna i nie ma zadnego cennika
8. Wersja dwujezyczna: polski i niemiecki
9. FAQ
10. Powiazane: automatyzacja faktur, baza leadow B2B, strona WWW z chatbotem
11. CTA

---

### P4. /uslugi/automatyzacje/raporty-sprzedazowe

- **H1:** Automatyczne raporty sprzedazowe dla zespolu
- **metaTitle:** `Automatyzacja raportow sprzedazowych` (36 znakow)
- **Fraza glowna:** automatyczne raporty sprzedazowe
- **Rozdzial intencji:** ta podstrona jest o WYCIAGANIU wnioskow z danych, ktore juz masz: CRM, arkusze, rozmowy, zadania. P2 jest o dokumentach, P1 o korespondencji. Tu frazy: raport, ranking, KPI, podsumowanie tygodnia. Odbiorca jest inny, bo to menedzer i wlasciciel, a nie pracownik operacyjny.
- **Uzasadnienie:** fraza z twarda intencja menedzerska, na liscie konkurentow obslugiwana tylko ogolnikowo. Mamy dwa dowody: KNF Team i Y-Ads.
- **Zastrzezenie wlasciciela:** przy KNF Team nie rozpisywac sie szerzej niz jedno zdanie z jedna liczba.

**Kapsula (gotowa do wklejenia):**

Automatyczne raporty sprzedazowe to zdjecie z menedzera skladania liczb recznie. Automat bierze dane z CRM i arkuszy, sklada raport zawsze wedlug tej samej reguly i dostarcza go na mail albo do aplikacji. W KNF Team zdjelo to ok. 8 godzin tygodniowo w skali zespolu 12 handlowcow i 3 menedzerow. W Y-Ads czas operacyjny menedzera spadl z 4 godzin do 30 minut dziennie.

**Sekcje:**

1. Ile czasu Twoj menedzer traci na skladanie raportu?
2. Jak to dziala: dane z CRM i arkuszy, automat sklada raport, raport laduje na mailu albo w aplikacji
3. Co mozesz miec: podsumowanie dnia i tygodnia, ranking zespolu, wskazanie odchylen
4. Realizacja: KNF Team, ok. 8 godzin tygodniowo mniej pracy w skali zespolu 12 handlowcow i 3 menedzerow
5. Realizacja: Y-Ads, 12 osob i 8 do 13 klientow rownolegle, menedzer z 4 godzin do 30 minut dziennie
6. Ile to kosztuje i ile trwa: pelne wdrozenie 3000 do 10000 zl, utrzymanie 99 do 599 zl miesiecznie albo 0 zl przy przekazaniu infrastruktury
7. Kiedy sie nie uda: gdy dane nie sa nigdzie zapisywane
8. Uczciwe zastrzezenie: nie wszedzie da sie policzyc oszczednosc, przyklad ZB Bielizsy, 14 osob na 5 stanowiskach
9. FAQ
10. Powiazane: audyt AI, automatyzacja faktur, asystent prezesa
11. CTA

---

### P5. /uslugi/automatyzacje/leady-b2b

- **H1:** Baza leadow B2B na zamowienie
- **metaTitle:** `Baza leadow B2B: 1000 rekordow 169 zl` (37 znakow)
- **Fraza glowna:** baza leadow b2b
- **Rozdzial intencji:** to jedyna podstrona z cena, ktora klient kupuje od reki, bez wdrozenia. Nie miesza sie z pozostalymi, bo tam sprzedajemy projekt na tygodnie, a tu produkt na dzis. Nie dotyka wysylki maili do tych leadow (to P1 i osobna rozmowa o zgodach), tylko samego zbudowania bazy.
- **Uzasadnienie:** jedyna pozycja w cenniku na tyle tania, ze sprzedaje sie bez rozmowy. Zaden z siedmiu badanych konkurentow tego nie sprzedaje, wiec zero konkurencji w tej niszy.

**Kapsula (gotowa do wklejenia):**

Baza leadow B2B to gotowa lista firm z danymi kontaktowymi, zbudowana na zamowienie. Recznie zebranie 1000 firm to ok. 3 minuty na rekord, czyli 1000 x 3 min = 3000 minut, ok. 50 godzin pracy. Automat sklada te sama paczke w 20 do 30 minut. Cennik netto: 1000 rekordow 169 zl, 5000 rekordow 699 zl, 10000 rekordow 1390 zl. Dane pochodza ze scrapowania Google Maps i dotycza wylacznie firm.

**Sekcje:**

1. Ile czasu zajmuje reczne zebranie 1000 firm? (1000 x 3 min = 3000 minut, ok. 50 godzin, dzialanie pokazane w tekscie)
2. Co dostajesz: jakie pola, w jakim formacie, jak szybko
3. Jak filtrujemy: branza, miasto, wielkosc, strona WWW, telefon, mail
4. Cennik: 1000 rekordow 169 zl, 5000 rekordow 699 zl, 10000 rekordow 1390 zl (netto). Paczka 1000 rekordow powstaje w 20 do 30 minut pracy automatu, wieksze paczki oddajemy w tym samym dniu roboczym
5. Skad pochodza dane: scrapowanie Google Maps, wylacznie firmy, wylacznie B2B
6. Kiedy baza Ci nie pomoze: brak oferty, brak procesu kontaktu
7. FAQ
8. Powiazane: automatyzacja maili, voicebot do dzwonienia, audyt AI
9. CTA: zamow baze

**FAQ (gotowe):**

- **Ile kosztuje baza leadow B2B?** 1000 rekordow kosztuje 169 zl netto, 5000 rekordow 699 zl netto, a 10000 rekordow 1390 zl netto. To cena za gotowa liste, bez zadnego wdrozenia i bez abonamentu.
- **Jak szybko dostane liste?** Paczka 1000 rekordow powstaje w 20 do 30 minut pracy automatu. Wieksze paczki oddajemy w tym samym dniu roboczym.
- **Skad pochodza dane?** Ze scrapowania Google Maps. Zbieramy wylacznie dane firmowe, czyli nazwe, adres, telefon, strone i kategorie dzialalnosci. Nie budujemy baz osob prywatnych.
- **Czy moge dostac baze osob prywatnych?** Nie. Robimy wylacznie bazy B2B.
- **Czy wysylacie tez maile do tych firm?** To osobna rozmowa i osobna usluga. Sama baza to lista kontaktow, a wysylka wymaga ustalenia podstawy prawnej i procesu kontaktu po Twojej stronie.

---

### P6. /uslugi/automatyzacje/cennik

- **H1:** Ile kosztuje automatyzacja procesow w firmie
- **metaTitle:** `Ile kosztuje automatyzacja procesow?` (36 znakow)
- **Fraza glowna:** ile kosztuje automatyzacja procesow
- **Rozdzial intencji:** sekcja 7 na stronie matce daje skrot i przekierowuje tutaj. Ta podstrona rozbija kazda pozycje cennika osobno, doklada koszty poza faktura, warianty utrzymania i porownanie z rynkiem. Podstrony zastosowaniowe podaja cene TYLKO dla swojego procesu i linkuja tutaj po pelna tabele. Zero kanibalizacji, bo tam fraza jest nazwa procesu, a tu slowo cena.
- **Uzasadnienie:** najsilniejsza fraza informacyjno-zakupowa calego obszaru. lukaszpodgorski.pl ma na to osobna strone cennika i wygrywa nia. Nasze progi sa nizsze niz u wszystkich badanych konkurentow, a strona z jawnymi kwotami to material, ktory modele jezykowe cytuja na pytania cenowe.

**Kapsula (gotowa do wklejenia):**

Automatyzacja jednego procesu kosztuje u nas 3000 do 10000 zl netto jednorazowo. Pierwsza automatyzacja na probe to 1990 zl netto, a audyt AI 1490 zl netto i jest odliczany od wdrozenia. Po wdrozeniu wybierasz: utrzymanie u nas za 99 do 599 zl netto miesiecznie albo przekazanie infrastruktury na Twoje konta i 0 zl abonamentu, wtedy poprawki po 350 zl netto za godzine. Zuzycie tokenow zawsze rozliczasz bezposrednio u dostawcy AI, jako trzecia, osobna pozycje.

**Sekcje:**

1. Od czego zalezy cena automatyzacji
2. Pelna tabela cen (wszystkie kwoty netto): patrz tabela z sekcji 7 tego pakietu, przeniesiona tu w calosci
3. Ceny stron WWW: landing page 1590 zl i 1 dzien roboczy, strona biznesowa 2900 zl i 2 do 4 dni robocze, strona zaawansowana ze sklepem albo wpietymi narzedziami od 5900 zl i 5 do 10 dni roboczych
4. Utrzymanie: dwie drogi. Infrastruktura u nas: chatboty i automatyzacje 99 do 599 zl netto miesiecznie, voiceboty 299 do 1500 zl netto miesiecznie. Infrastruktura u Ciebie: 0 zl miesiecznie i poprawki po 350 zl netto za godzine
5. Trzy osobne pozycje przy kazdym bocie: stworzenie, utrzymanie, zuzycie tokenow albo minut
6. Co jest w cenie: dwie rundy poprawek w rytmie tydzien testow, poprawki, drugi tydzien testow, poprawki, odbior
7. Co jest poza cena: nowe funkcje spoza pierwszej rozmowy
8. Jak wypadamy na tle rynku
9. Kiedy wdrozenie sie nie zwroci
10. FAQ wylacznie o pieniadzach
11. CTA: bezplatna rozmowa 30 minut

**Sekcja 8 (gotowa tresc), jedyne zweryfikowane odniesienie rynkowe w calym pakiecie:**

Podajemy tylko te ceny konkurencji, ktore ktos u nas realnie zobaczyl na stronie, z data sprawdzenia. Serwis projektowaniestroncennik.pl, sprawdzony 31 sierpnia 2026, podaje 1900 zl za landing page, 2500 zl za strone firmowa i 4000 zl za strone rozbudowana.

Nasz landing page kosztuje 1590 zl netto, czyli mniej niz to odniesienie. Strona biznesowa za 2900 zl netto jest nieco drozsza, bo w cenie dowozimy SEO i optymalizacje pod cytowanie przez modele AI. Strona zaawansowana od 5900 zl netto stoi wyzej ze wzgledu na naklad pracy 5 do 10 dni roboczych.

Przy pozostalych uslugach nie podajemy cen konkurencji, bo nie mamy ich sprawdzonych na wlasne oczy. Kiedy sprawdzimy, dopiszemy je tu razem z data.

**FAQ (gotowe, wylacznie o pieniadzach):**

- **Ile kosztuje automatyzacja procesow?** Pelne wdrozenie jednego procesu to 3000 do 10000 zl netto, zaleznie od liczby integracji. Pierwsza automatyzacja na probe kosztuje 1990 zl netto. Audyt AI, ktory pokazuje, co w ogole warto u Ciebie zautomatyzowac, to 1490 zl netto i odliczamy go od wdrozenia.
- **Czy musze placic abonament po wdrozeniu?** Nie musisz. Przy kazdym wdrozeniu wybierasz jedna z dwoch drog. Infrastruktura zostaje u nas i placisz 99 do 599 zl netto miesiecznie przy automatyzacjach i chatbotach albo 299 do 1500 zl netto miesiecznie przy voibotach. Albo przekazujemy cala infrastrukture na Twoje konta i wtedy utrzymanie kosztuje 0 zl, a pojedyncze poprawki rozliczamy po 350 zl netto za godzine.
- **Jakie koszty dochodza poza Wasza faktura?** Trzy. Licencje narzedzi, ktore zakladamy na Twoja firme. Serwery tam, gdzie wystepuja, na przyklad 199 zl netto miesiecznie przy asystencie prezesa. I zuzycie tokenow albo minut, ktore placisz bezposrednio u dostawcy AI, bo rosnie z liczba maili, dokumentow i rozmow.
- **Co jest w cenie wdrozenia?** Zbudowanie automatu, podpiecie go do Twoich systemow i dwie rundy poprawek: tydzien testow u Ciebie, poprawki, drugi tydzien testow, poprawki, odbior. W cenie jest tez instrukcja dla zespolu.
- **Co, jesli w trakcie wymysle nowa funkcje?** Wyceniamy ja osobno i mowimy o tym od razu, a nie po fakcie. Nowe funkcje spoza pierwszej rozmowy nie mieszcza sie w cenie wdrozenia.
- **Czym rozni sie AI Start za 1990 zl od chatbota za 1790 zl?** AI Start dziala do wewnatrz, czyli automatyzuje proces w Twojej firmie. Chatbot dziala na zewnatrz, czyli rozmawia z Twoimi klientami. To dwa rozne produkty, nie dwie wersje tego samego.

---

### P7. /uslugi/automatyzacje/audyt-ai

- **H1:** Audyt AI dla firmy: Sprint Diagnostyczny
- **metaTitle:** `Audyt AI dla firm: 1490 zl, 5 dni` (33 znaki)
- **Fraza glowna:** audyt ai dla firm
- **Rozdzial intencji:** to jedyna podstrona sprzedajaca DIAGNOZE, a nie wdrozenie. Klient, ktory wie, co chce zautomatyzowac, idzie na podstrone procesowa. Klient, ktory nie wie od czego zaczac, laduje tutaj. Podstrona cennika wymienia audyt jednym wierszem i linkuje tutaj po szczegoly.
- **Uzasadnienie:** najtansze wejscie w relacje i najlepsza strona pod fraze "od czego zaczac z AI w firmie". Nasz prog 1490 zl jest nizszy od tego, co widac u konkurencji, produkt jest gotowy, a fraza lapie klientow, ktorzy jeszcze nie wiedza, czego chca.

**Kapsula (gotowa do wklejenia):**

Sprint Diagnostyczny to audyt AI dla firmy za 1490 zl netto, robiony w 5 dni roboczych. Dostajesz raport PDF z mapa swoich procesow, lista tego, co da sie zautomatyzowac, i kolejnoscia wdrozen. Kwote odliczamy od wdrozenia, jesli ruszamy dalej. Raport jest Twoj takze wtedy, gdy zdecydujesz sie nie wdrazac u nas.

**Sekcje:**

1. Nie wiesz, co u Ciebie w ogole da sie zautomatyzowac?
2. Co dostajesz: raport PDF z mapa procesow, lista procesow do wziecia, kolejnosc wdrozen
3. Jak wygladaja te 5 dni roboczych
4. Cena 1490 zl netto, odliczana od wdrozenia, jesli ruszamy dalej
5. Co robimy z raportem, jesli zdecydujesz sie nie wdrazac u nas
6. Kiedy audyt jest zbedny: jeden oczywisty proces, wtedy proponujemy AI Start za 1990 zl
7. FAQ
8. Powiazane: cennik automatyzacji, automatyzacja maili, automatyzacja faktur
9. CTA: zamow Sprint Diagnostyczny

**FAQ (gotowe):**

- **Ile kosztuje audyt AI?** 1490 zl netto. Kwote odliczamy od ceny wdrozenia, jesli po audycie ruszamy dalej, wiec nie placisz za to samo dwa razy.
- **Ile trwa audyt?** 5 dni roboczych od przekazania materialow.
- **Co konkretnie dostaje?** Raport PDF z mapa Twoich procesow, lista procesow, ktore da sie zautomatyzowac, i kolejnoscia, w jakiej warto je brac.
- **Czy raport jest moj, jesli nie wdroze u Was?** Tak. Raport zostaje u Ciebie i mozesz go pokazac dowolnemu wykonawcy.
- **Kiedy audyt nie ma sensu?** Kiedy masz juz jeden oczywisty proces, ktory boli najbardziej. Wtedy lepszym krokiem jest AI Start za 1990 zl netto, czyli ten jeden proces zrobiony do konca.

---

### P8. /uslugi/automatyzacje/make

- **H1:** Wdrozenia i automatyzacje w Make.com
- **metaTitle:** `Wdrozenia Make.com dla firm: cennik` (35 znakow)
- **Fraza glowna:** automatyzacja make.com
- **Rozdzial intencji:** wszystkie pozostale podstrony sa opisane jezykiem procesu (maile, faktury, raporty). Ta jedna jest opisana jezykiem narzedzia i przechwytuje ruch narzedziowy plus zapytania serwisowe typu "scenariusz Make nie dziala", "za duzo operacji w Make". Nie powiela tresci procesowych, tylko linkuje do nich jako do przykladow zastosowania.
- **Uzasadnienie:** fraza narzedziowa z bardzo konkretna intencja, wpisywana przez firmy, ktore juz probowaly same albo maja scenariusz, ktory sie psuje. Konkurenci wymieniaja Make tylko na liscie logotypow, nikt nie ma osobnej strony wdrozeniowej.

**Kapsula (gotowa do wklejenia):**

Make.com to platforma, na ktorej spinamy Twoje systemy w jeden dzialajacy ciag. Budujemy scenariusze od zera, przejmujemy i naprawiamy istniejace, i opisujemy je tak, zeby dalo sie je utrzymac bez nas. Konto zakladamy na Twoja firme, wiec licencje i dostepy sa Twoje. Wdrozenie kosztuje 3000 do 10000 zl netto, a pierwszy scenariusz na probe 1990 zl netto.

**Sekcje:**

1. Masz scenariusz, ktory sie sypie albo zjada operacje?
2. Co budujemy w Make.com, a co swiadomie budujemy poza nim
3. Przejmiemy istniejace scenariusze: przeglad, naprawa, dokumentacja
4. Ile kosztuje wdrozenie i ile kosztuja licencje po Twojej stronie
5. Kto jest wlascicielem scenariusza i jak wyglada przekazanie na Twoje konto
6. Realizacje zbudowane na tym stosie: odeslanie do podstron o mailach, fakturach i raportach
7. Kiedy Make to zly wybor dla Twojego procesu
8. FAQ
9. Powiazane: audyt AI, cennik automatyzacji, raporty sprzedazowe
10. CTA

---

## Uwagi dla sesji wdrozeniowej

1. **Kolor kategorii i uklad.** Nowe podstrony dziedzicza kolor i uklad kategorii `automatyzacje` z istniejacej strony uslugi. Nie wprowadzac nowej palety.
2. **Rejestr podstron.** Osiem nowych adresow trzeba dopisac do rejestru uslug, do sitemapy i do menu w sekcji uslug. Sprawdzic, czy generator sitemapy w `app/` lapie zagniezdzone sciezki `/uslugi/automatyzacje/*`, bo dzis takich nie ma.
3. **Linkowanie z matki do dzieci.** W sekcji 2 (katalog procesow) zrobic linkami dokladnie te karty, ktore maja swoja podstrone: budowa listy firm do kontaktu, oferta z zapytania, odczyt faktur kosztowych, KSeF, raport sprzedazy, odpowiedzi na maile do przygotowania. Reszta kart zostaje tekstem.
4. **Linkowanie z dzieci do matki.** Kazda podstrona linkuje wracajaco do `/uslugi/automatyzacje` i do `/uslugi/automatyzacje/cennik`.
5. **Nie dublowac H2.** Istniejaca sekcja `rozwiazanie` ma H2 "Co dokladnie automatyzujemy?". Nowy katalog ma H2 "Jakie procesy da sie zautomatyzowac w firmie?". Istniejaca `ramaCeny` ma H2 "Ile kosztuje wdrozenie automatyzacji?" i nowa drabina cen wchodzi tam jako H3 w srodku, a NIE jako drugi H2 cenowy.
6. **Kalkulator bez wartosci domyslnych.** To twarda decyzja wlasciciela. Trzy pola startuja puste, wynik pojawia sie po wypelnieniu wszystkich trzech. Nie kopiowac logiki z istniejacego kalkulatora na `/narzedzia`, jesli ma tam podstawione stawki.
7. **Zakaz OpenAI.** Nigdzie w tresci ani w metadanych nie moze pasc OpenAI ani GPT jako nasz dostawca modelu. Dostawca to Anthropic, model claude-haiku-4-5.
8. **Kanaly chatbota.** Wolno wymieniac: strona WWW, WhatsApp, Messenger, Instagram, Telegram. Nie wolno wymieniac Slacka ani Microsoft Teams jako kanalow chatbota. Meet, Zoom i Teams pojawiaja sie WYLACZNIE przy podsumowaniach spotkan.
9. **Instytut Kryptografii.** Poprawne brzmienie to "80% draftow gotowych do wyslania bez poprawek". Nigdzie nie moze pasc, ze automat sam wysyla maile.
10. **Onyx.** Zakaz pisania o placeniu faktur przez API banku. Przed publikacja podstrony P2 przeszukac tresc pod katem slow "bank", "przelew", "platnosc faktury".
11. **Schema.** Podstrona `/uslugi/automatyzacje/cennik` to naturalne miejsce na `OfferCatalog` z jawnymi kwotami. Podstrony z blokiem FAQ dostaja `FAQPage` 1:1 z widoczna trescia, tak jak istniejaca strona uslugi.
12. **Ceny konkurencji.** W calym pakiecie jest DOKLADNIE JEDNO odniesienie rynkowe: projektowaniestroncennik.pl, sprawdzone 2026-08-31, ceny stron WWW 1900 / 2500 / 4000 zl. Wystepuje tylko na podstronie cennika. Zadnych innych cen konkurencji nie wolno dopisac bez wlasnej weryfikacji z data.
13. **Narzedzia w portfolio.** SFAI Campaigns, drugi mozg, kalendarz dla fizjoterapeutow, aplikacja dla klubow sportowych i automatyzacja KSeF plus bank opisujemy bezosobowo ("mamy w portfolio zbudowane"), nigdy "dla siebie". Wyjatek: bot na simplefast.ai wolno opisac jako naszego, bo klient moze go przetestowac.
14. **Weryfikacja po wdrozeniu.** Po publikacji sprawdzic na zywej stronie: kalkulator liczy poprawnie przy pustych polach, tabela sekcji 7 nie rozjezdza sie na telefonie, wszystkie osiem nowych adresow odpowiada kodem 200 i siedzi w sitemapie.

---

## Sekcje wyciete wobec pierwotnego planu

1. **Karty narzedzi Supabase, Vercel i Google Workspace** w sekcji 5. Powod: brak pokrycia w konspekcie, a zasada zakazuje znacznikow do potwierdzenia w finalnej tresci. Sekcja dziala bez nich.
2. **Kwoty w kolumnie "Abonament u agencji"** w sekcji 6. Powod: cena easyautomate.pl nie zostala zobaczona na wlasne oczy. Kolumna zostala, ale opisuje wylacznie mechanizm.
3. **Kwota w kolumnie "Dodatkowy etat"** w sekcji 6. Powod: konspekt nie podaje kosztu etatu. Kolumna odsyla do kalkulatora, w ktorym klient wpisuje swoja stawke.
4. **Zdanie o nietrenowaniu modeli na danych klienta** w sekcji 11. Powod: brak zrodla. Zastapione opisem, na jakim modelu to pracuje i co obejmuje umowa powierzenia.
5. **Obietnica "automat nie dopisuje faktow spoza zrodel"** w sekcji 3. Powod: to gwarancja braku pomylki, ktorej nie da sie dotrzymac. Zastapiona opisem mechanizmu i bramki akceptacji.
6. **Czas "20 do 30 minut" przy paczkach 5000 i 10000 rekordow.** Powod: konspekt podaje ten czas raz, dla 1000 rekordow. Wieksze paczki opisane jako "ten sam dzien roboczy".
7. **Twarde terminy dla AI Start i pelnej automatyzacji** w tabeli sekcji 7. Powod: konspekt ich nie podaje. Zamiast znacznika do potwierdzenia stoi uczciwe "ustalamy przy wycenie".
