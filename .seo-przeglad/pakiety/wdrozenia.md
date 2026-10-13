# Pakiet wdrozeniowy: Wdrozenia AI (fraza szeroka)

**Strona:** https://www.simplefast.ai/uslugi (plik `app/uslugi/page.tsx`)
**Data:** 2026-08-31
**Co ten pakiet dodaje:** dziewiec nowych sekcji na hub `/uslugi` (kalkulator kosztu roboty recznej, drabina cen z czasem realizacji, rozbicie rachunku na trzy pozycje, wybor modelu utrzymania, porownanie z etatem i SaaS, realizacje z nazwa klienta, dwie rundy poprawek, uczciwy filtr "kiedy sie nie oplaci", blok obiekcji) oraz siedem nowych podstron. Cel: zdobyc frazy pieniezne ("ile kosztuje wdrozenie AI w firmie", "wdrozenie AI cennik"), na ktorych hub stoi dzis na pozycji 17,3.

Wszystkie kwoty NETTO. Zadna liczba w tym pliku nie jest zmyslona: kazda pochodzi z cennika wlasciciela, z decyzji wlasciciela z 2026-08-31, z rejestru `lib/uslugi/*` (juz opublikowanego na stronie) albo z przeliczenia, ktore pokazuje dzialanie w tekscie.

---

## Czego NIE ruszamy

Te sekcje `app/uslugi/page.tsx` zostaja bez zmian, w tej samej kolejnosci:

1. **Hero hubu** (`Section tone="transparent"`): breadcrumbs, H1 "Uslugi AI dla firm", kapsula answer-first, akapit "AI nie zastepuje ludzi", `PasekMetryk` z `METRYKI_HUBU`.
2. **Wyrozniony blok parasola** (`Section tone="subtle"`): karta "Nie wiesz, ktora usluge wybrac?" z CTA do `/uslugi/architekci-wartosci-ai`.
3. **Trzy klastry uslug** (`KLASTRY.map`): overline, H2 klastra, intro i siatka kafli `UslugaKafel`. Zero zmian w tresci klastrow.
4. **Tabela orientacyjna** (3b): H2 "Ktora usluga ile kosztuje?" + `TabelaRejestru` z `WIERSZE_TABELI`. Zostaje jako przeglad 12 uslug. Uwaga do synchronizacji: patrz "Uwagi dla sesji wdrozeniowej", punkt 2.
5. **`HubFAQ`** z tablica `FAQ_HUBU` plus `faqSchemaPl(FAQ_HUBU, PATH)`.
6. **CTA domykajace** (`Section id="diagnoza"`, `.surface-aurora`) z `HOME_CTA`.
7. **Cale JSON-LD**: `breadcrumbSchema`, `ItemList` z rejestru `USLUGI`, `FAQPage`. Nowe sekcje nie dokladaja wlasnego schema.
8. Komponenty `components/uslugi/*` i `components/sections/*`: uzywamy istniejacych, zero nowych stylow.

---

## Nowe sekcje na istniejacej stronie

Kolejnosc wstawiania: sekcja 1 idzie przed klastrami, sekcje 2-9 lada blokiem po tabeli orientacyjnej, przed `HubFAQ`.

---

### 1. Ile kosztuje Cie praca reczna, zanim wdrozysz AI?

- **Gdzie wstawic:** po wyroznionym bloku parasola (sekcja 2 istniejaca), przed pierwszym klastrem uslug.
- **Po co:** ustawia kotwice straty, zanim padnie jakakolwiek kwota, wiec 1790 zl czyta sie jako tanio, a nie jako wydatek. Lapie intencje informacyjna "czy AI sie oplaca", "czy warto wdrazac AI w firmie". Konkurenci maja to samo: malinski.ai (koszt bezczynnosci), stormit.pl ("Ile kosztuje NIE wdrozenie AI"), lessmanual.ai (tabela ROI).
- **Typ:** tabela + osobny blok efektow niemierzalnych w minutach + kalkulator (3 pola, zero domyslnych kwot).

**TRESC:**

Za robote reczna nie dostajesz osobnej faktury. Ten koszt siedzi w godzinach Twoich ludzi i widac go dopiero wtedy, kiedy ktos go policzy.

Najczesciej jest to ta sama czynnosc powtarzana setki razy w miesiacu. Nikt jej nie kwestionuje, bo pojedynczy raz zajmuje kilka minut.

Ponizej masz realne pomiary z naszych wdrozen. Zadnych srednich rynkowych, tylko to, co faktycznie liczylismy u konkretnych klientow.

| Co bylo robione recznie | Ile tego jest | Jak bylo | Jak jest |
| --- | --- | --- | --- |
| Ksiegowanie faktur (Onyx) | ok. 120 faktur miesiecznie | 3-5 minut na fakture | zdjecie faktury, reszta dzieje sie sama |
| Wycena i oferta (Trockenhaus) | 1-8 ofert miesiecznie | 2-4 godziny na oferte | ok. 20 minut |
| Wystawienie rachunku (Trockenhaus) | 1-5 rachunkow miesiecznie | ok. 1 godzina | ok. 5 minut |
| Pilnowanie pracy zespolu (Y-Ads) | 12 osob, 8-13 klientow rownolegle | 4 godziny dziennie u menedzera | ok. 30 minut dziennie |

Policz to na jednym przykladzie. Onyx: 120 faktur miesiecznie po 3-5 minut to od 360 do 600 minut, czyli od 6 do 10 godzin pracy co miesiac.

Y-Ads: z 4 godzin dziennie do okolo 30 minut to 3,5 godziny odzyskane kazdego dnia. Przy pieciu dniach roboczych wychodzi 17,5 godziny tygodniowo.

**Sa tez efekty, ktorych nie mierzymy w minutach**

W KNF Team raporty sprzedazowe dla 12 handlowcow i 3 menedzerow powstawaly recznie co tydzien. Klient szacuje okolo 8 godzin tygodniowo mniej pracy w skali zespolu.

W Instytucie Kryptografii biuro obslugi klienta pisalo kazda odpowiedz od zera, a w szczycie wpada 580 maili tygodniowo. Dzis 80% draftow jest gotowych do wyslania bez poprawek. Wysyla je czlowiek, nie automat.

**Kalkulator kosztu roboty recznej**

Stawke godzinowa wpisujesz sam. Nie podstawiamy zadnej domyslnej kwoty, bo tylko Ty wiesz, ile realnie kosztuje godzina osoby, ktora to dzis robi.

- Pole 1: Ile razy w miesiacu robicie te czynnosc? (liczba, pole puste)
- Pole 2: Ile minut zajmuje jeden raz? (liczba, pole puste)
- Pole 3: Ile kosztuje Cie godzina tej osoby, z narzutami? (kwota, pole puste)
- Wynik miesieczny: (Pole 1 x Pole 2 / 60) x Pole 3
- Wynik roczny: wynik miesieczny x 12

Ta liczba jest punktem odniesienia dla wszystkiego, co przeczytasz nizej. Jesli wyszlo Ci mniej niz koszt wdrozenia w skali roku, powiemy Ci to wprost.

- **Zrodlo liczb:** Onyx (ok. 120 faktur miesiecznie, recznie 3-5 min, zdjecie faktury), Trockenhaus (1-8 ofert i 1-5 rachunkow miesiecznie, oferta 2-4 h do 20 min, rachunek 1 h do ok. 5 min), Y-Ads (12 osob, 8-13 klientow, 4 h do 30 minut dziennie), KNF Team (12 handlowcow, 3 menedzerow, ok. 8 h tygodniowo, szacunek klienta), Instytut Kryptografii (580 maili tygodniowo w szczycie, 80% draftow gotowych do wyslania) - wszystko z konspektu firmy. Przeliczenia pokazane w tekscie: 120 x 3-5 min = 360-600 min = 6-10 h; 4 h minus 30 min = 3,5 h, x 5 dni = 17,5 h. Stawka godzinowa: celowo brak wartosci domyslnej (decyzja wlasciciela z 2026-08-31, punkt 3).

---

### 2. Ile kosztuje wdrozenie AI w firmie i ile trwa?

- **Gdzie wstawic:** bezposrednio po tabeli orientacyjnej "Ktora usluga ile kosztuje?" (sekcja 3b), przed `HubFAQ`.
- **Po co:** to jedyna sekcja, ktora bezposrednio odpowiada na fraze pieniezna numer jeden. Caly top10 (pixelagency.pl, lessmanual.ai, stormit.pl, falconworks.pl, innowacje.ai) ma tabele cen, cztery z pieciu maja obok widelek kolumne czasu. Bez tego hub nie ruszy z pozycji 17,3. Nasza przewaga: najnizszy prog wejscia i czas w dniach roboczych, nie w tygodniach.
- **Typ:** kapsula answer-first + tabela + mala tabela odniesienia rynkowego.

**TRESC:**

Krotka odpowiedz: od 1490 zl netto za audyt i od 1590 zl netto za strone. Pierwszy bot na strone kosztuje 1790 zl netto i powstaje w 1-2 dni robocze.

Podajemy kwoty od, a tam gdzie sa widelki, mowimy od czego zaleza. Zwykle od liczby integracji i od tego, czy bot ma tylko odpowiadac, czy siegac do Twoich systemow.

| Co wdrazamy | Cena netto | Czas realizacji | Dla kogo |
| --- | --- | --- | --- |
| Audyt AI (Sprint Diagnostyczny) | 1490 zl, odliczane od wdrozenia | 5 dni roboczych | nie wiesz, od czego zaczac, chcesz mape procesow i wycene |
| AI Start, pierwsza automatyzacja na probe | 1990 zl | ustalamy przy wycenie, wdrazamy w dni | chcesz zobaczyc jeden dzialajacy proces w firmie, zanim wydasz wiecej |
| Chatbot prosty (strona, baza wiedzy, zbieranie leadow) | 1790 zl | 1-2 dni robocze | odpowiadasz w kolko na te same pytania klientow |
| Chatbot sredni | 3000-6000 zl | 3-4 dni robocze | bot ma prowadzic rozmowe, a nie tylko odpowiadac |
| Chatbot duzy z integracjami | 8000-15000 zl | 5-10 dni roboczych | bot ma siegac do Twoich systemow i dzialac w nich |
| Voicebot prosty | 2500 zl | 3-5 dni roboczych | telefon dzwoni czesciej, niz ktokolwiek zdazy odebrac |
| Voicebot z integracjami (np. kalendarz) | 5000-9000 zl | 5-25 dni roboczych | bot ma umawiac terminy, nie tylko informowac |
| Automatyzacja, pelne wdrozenie | 3000-10000 zl | ustalamy przy wycenie, wdrazamy w dni | masz proces, ktory przechodzi przez kilka narzedzi i ludzi |
| Asystent prezesa | 7999 zl + 199 zl/mies. za serwery | 5-10 dni roboczych | chcesz miec wiedze o firmie pod reka i pytac ja glosem |
| Strona WWW, landing | 1590 zl | 1 dzien roboczy | jedna oferta, jeden cel, szybko |
| Strona WWW, biznesowa | 2900 zl | 2-4 dni robocze | pelna wizytowka firmy z podstronami |
| Strona WWW, zaawansowana (sklep, wpiete narzedzia) | od 5900 zl | 5-10 dni roboczych | strona ma cos liczyc, integrowac albo obslugiwac klienta |
| Leady B2B, 1000 rekordow | 169 zl | 20-30 minut pracy automatu | potrzebujesz listy firm do kontaktu na juz |
| Leady B2B, 5000 rekordow | 699 zl | 20-30 minut pracy automatu | prowadzisz stala sprzedaz wychodzaca |
| Leady B2B, 10000 rekordow | 1390 zl | 20-30 minut pracy automatu | budujesz baze pod dluzsza kampanie |

Dwie pozycje w tej tabeli sa czesto mylone. AI Start za 1990 zl to jeden proces wewnatrz firmy, robota, ktora dzis zjada Twoim ludziom godziny. Chatbot prosty za 1790 zl dziala na zewnatrz i rozmawia z Twoimi klientami.

Chatbota stawiamy na stronie WWW oraz na WhatsAppie, Messengerze, Instagramie i Telegramie. Bot na naszej stronie jest nasz wlasny, mozesz go przetestowac na `/uslugi/chatboty` i zadac mu trudne pytanie o cene.

**Dla porownania: ile kosztuje strona u kogos innego**

Sprawdzilismy jedno zrodlo u zrodla, zeby nie zgadywac. Cennik na projektowaniestroncennik.pl, stan na 2026-08-31.

| Rodzaj strony | projektowaniestroncennik.pl (2026-08-31) | U nas |
| --- | --- | --- |
| Landing page | 1900 zl | 1590 zl, 1 dzien roboczy |
| Strona firmowa | 2500 zl | 2900 zl, 2-4 dni robocze |
| Strona rozbudowana | 4000 zl | od 5900 zl, 5-10 dni roboczych |

Landing mamy tanszy. Strona biznesowa jest u nas nieco drozsza, bo w cenie dowozimy SEO i przygotowanie pod cytowanie przez AI. Wariant zaawansowany kosztuje wiecej, bo to 5 do 10 dni roboczych, a nie jeden.

Wszystkie kwoty sa netto. Do kazdego bota dochodza jeszcze dwie pozycje: utrzymanie i zuzycie. Rozpisujemy je w nastepnej sekcji, zeby nie wyszly dopiero na fakturze.

Kwote audytu odliczamy od wdrozenia. Przy wdrozeniach drozszych niz 1490 zl diagnoza wychodzi w praktyce za darmo.

- **Zrodlo liczb:** ceny i czasy chatbotow, voicebotow, audytu, AI Start, automatyzacji, asystenta prezesa i leadow B2B: cennik zatwierdzony przez wlasciciela. Ceny i czasy stron WWW (1590 / 2900 / od 5900 zl): decyzja wlasciciela z 2026-08-31, punkt 1. Czasy voicebotow (3-5 i 5-25 dni roboczych): rejestr `lib/uslugi/voiceboty.ts`, wartosci juz opublikowane na stronie. Odniesienie rynkowe 1900 / 2500 / 4000 zl: projektowaniestroncennik.pl, sprawdzone 2026-08-31 (decyzja wlasciciela, punkt 1). Kanaly chatbota: decyzja wlasciciela, punkt 4. Bot na naszej stronie: zweryfikowany 2026-08-31, decyzja wlasciciela, punkt 6. Przy AI Start i automatyzacji konspekt nie podaje liczby dni, wiec zadnej nie wpisujemy.

---

### 3. Za co przy wdrozeniu AI placze raz, a za co co miesiac?

- **Gdzie wstawic:** po sekcji 2 (drabina cenowa), przed sekcja 4.
- **Po co:** konkurenci maja rozbicie kosztow miesiecznych, ale robia z tego straszak (pixelagency.pl "Koszty ukryte i utrzymanie miesieczne", lessmanual.ai "Miesieczne koszty utrzymania", stormit.pl "Breakdown kosztow", innowacje.ai "Co NIE wchodzi w cene"). My mamy twarda zasade: zawsze trzy osobne pozycje przy botach. Ta sekcja jest jedynym miejscem na stronie z pelnymi widelkami utrzymania.
- **Typ:** akapit + tabela trzech pozycji.

**TRESC:**

Najczestszy zawod po podpisaniu umowy na AI wyglada tak: cena wdrozenia byla jasna, a potem pojawily sie dwie pozycje, o ktorych nikt nie mowil.

U nas rachunek zawsze ma trzy osobne linie. To sztywna zasada, nie decyzja podejmowana przy kazdej ofercie z osobna.

| Pozycja | Co to jest | Ile to kosztuje |
| --- | --- | --- |
| Stworzenie (raz) | zbudowanie rozwiazania, wpiecie go w Twoje narzedzia, testy i dwie rundy poprawek | wedlug tabeli wyzej, na przyklad 1790 zl za chatbota prostego |
| Utrzymanie (co miesiac) | serwery, aktualizacje, opieka nad dzialaniem, drobne poprawki | 99-599 zl/mies. przy chatbotach i automatyzacjach, 299-1500 zl/mies. przy voicebotach, albo 0 zl przy przejeciu infrastruktury |
| Zuzycie (po Twojej stronie) | tokeny modelu przy botach tekstowych, minuty rozmow przy voicebotach | placisz dostawcy bezposrednio, wedlug faktycznego uzycia |

Zuzycie zostawiamy po Twojej stronie celowo. Placisz tyle, ile realnie zuzyjesz, i widzisz to w swoim panelu, a nie w naszej marzy.

Boty tekstowe stawiamy na modelach Claude od Anthropic, dzis na claude-haiku-4-5. Wiesz wiec, czyj model liczy Twoje zapytania i wedlug czyjego cennika placisz za zuzycie.

- **Zrodlo liczb:** trzy pozycje przy botach, utrzymanie 99-599 zl/mies. (chatboty i automatyzacje) oraz 299-1500 zl/mies. (voiceboty), wariant 0 zl przy przekazaniu infrastruktury: cennik wlasciciela plus decyzja z 2026-08-31, punkt 2. Chatbot prosty 1790 zl: cennik. Dostawca modelu (Anthropic, claude-haiku-4-5): decyzja wlasciciela, punkt 5, sprawdzone w kodzie 2026-08-31.

---

### 4. Czy przy wdrozeniu AI moge wyjsc z abonamentu?

- **Gdzie wstawic:** po sekcji 3 (trzy pozycje w rachunku), przed sekcja 5.
- **Po co:** najwieksza luka calego top10. Zaden z pieciu przebadanych konkurentow nie odpowiada na pytanie o uwiazanie u dostawcy, a to lek numer jeden przy wdrozeniu AI. My mamy realna odpowiedz: klient wybiera model utrzymania i moze przejsc na 0 zl abonamentu. Lapie fraze "wdrozenie AI abonament", "czy trzeba placic co miesiac za chatbota".
- **Typ:** akapit + dwie karty wyboru.

**TRESC:**

To pytanie pada na prawie kazdej pierwszej rozmowie, zwykle w wersji: a jak przestane placic, to co mi zostanie?

Przy kazdym wdrozeniu wybierasz jedna z dwoch drog. Mowimy o tym na pierwszej rozmowie, a nie po podpisaniu.

**DROGA 1: infrastruktura zostaje u nas**

Placisz abonament utrzymaniowy: 99-599 zl/mies. przy chatbotach i automatyzacjach, 299-1500 zl/mies. przy voicebotach. W zamian masz serwery, aktualizacje i opieke nad dzialaniem po naszej stronie.

Ta droga ma sens, gdy nie masz nikogo technicznego i chcesz miec spokoj.

**DROGA 2: przekazujemy infrastrukture Tobie**

Abonament wynosi 0 zl miesiecznie. Placisz nam tylko wtedy, gdy czegos potrzebujesz, po 350 zl netto za godzine pracy.

Ta droga ma sens, gdy masz informatyka albo wolisz placic za konkretna robote zamiast za stala gotowosc.

Ten wybor dotyczy chatbotow, voicebotow, automatyzacji i AI Start. Nie jest to promocja ani wyjatek, tylko standardowy element kazdej naszej oferty.

Pytaj o to kazdego wykonawce, nie tylko nas. Jesli ktos nie potrafi powiedziec, ile kosztuje wyjscie z jego abonamentu, to jest odpowiedz sama w sobie.

- **Zrodlo liczb:** caly wybor modelu utrzymania (abonament albo 0 zl przy przekazaniu infrastruktury, poprawki 350 zl netto/h, zakres: chatboty, voiceboty, automatyzacje, AI Start): decyzja wlasciciela z 2026-08-31, punkt 2. Widelki 99-599 i 299-1500 zl/mies.: cennik wlasciciela. Sekcja swiadomie nie zawiera zadnych twierdzen o wlasnosci danych ani o ciaglosci dzialania po zakonczeniu wspolpracy, bo to zapisy umowne, a nie tresc marketingowa.

---

### 5. Wdrozenie AI czy nowy pracownik: co sie bardziej oplaca?

- **Gdzie wstawic:** po sekcji 4 (wybor modelu utrzymania), przed sekcja 6.
- **Po co:** klient nie porownuje nas z inna agencja, tylko z etatem i z mysla "sam sobie to poskladam". Konkurenci maja te sekcje i dobrze im przelicza (lessmanual.ai "DIY vs partner wdrozeniowy", pixelagency.pl "Jak wybrac wykonawce", stormit.pl "Ukryte koszty"). Lapie fraze "AI zamiast pracownika", "wdrozenie AI czy etat".
- **Typ:** tabela porownawcza + kalkulator z wlasnymi liczbami czytelnika.

**TRESC:**

Nie porownujesz nas z inna agencja. Porownujesz nas z etatem, z gotowym narzedziem na abonament i z mysla, ze sam sobie to poskladasz.

To uczciwe porownanie, wiec zrobmy je na stole. Nie wpisujemy tu cudzych stawek, bo nie sprawdzilismy ich u zrodla. Wpisujesz wlasne liczby i wychodzi Twoja odpowiedz.

| Wariant | Koszt wejscia | Czas do pierwszego efektu | Kto to utrzymuje | O co zapytaj przed decyzja |
| --- | --- | --- | --- | --- |
| Dodatkowy etat | Twoja pensja z narzutami razy 12 | rekrutacja, potem wdrozenie nowej osoby | Ty i dzial kadr | co sie stanie z ta wiedza, gdy osoba odejdzie |
| Gotowy SaaS na abonament | cena abonamentu razy liczba uzytkownikow | od razu, w ksztalcie narzuconym przez dostawce | dostawca | czy narzedzie obsluzy Twoj proces bez zmiany procesu |
| Freelancer | jego stawka godzinowa razy szacowane godziny | zalezy od jego kolejki | ustal to przed startem | kto utrzymuje rozwiazanie po zakonczeniu zlecenia |
| Zrobisz to sam | Twoje godziny wieczorami | tygodnie nauki przed pierwsza wersja | Ty | ile warta jest godzina, ktora wtedy nie zarabia |
| AI Start u nas | 1990 zl jednorazowo | jeden dzialajacy proces po odbiorze i dwoch rundach poprawek | my za 99-599 zl/mies. albo Ty za 0 zl po przejeciu infrastruktury | co dokladnie wchodzi w zakres pierwszej rozmowy |

**Kalkulator: etat czy wdrozenie**

Znowu bez domyslnych kwot. Wpisujesz swoje.

- Pole 1: Ile kosztuje Cie miesiecznie osoba, ktora dzis to robi, z narzutami? (kwota, pole puste)
- Pole 2: Jaka czesc jej czasu zjada ta jedna czynnosc, w procentach? (liczba, pole puste)
- Wynik roczny: Pole 1 x (Pole 2 / 100) x 12
- Porownaj ten wynik z kwota jednorazowa z tabeli cen wyzej plus 12 miesiecy utrzymania.

Dla skali, na naszych wdrozeniach: u Y-Ads czas operacyjny menedzera spadl z 4 godzin do okolo 30 minut dziennie. W KNF Team klient szacuje okolo 8 godzin tygodniowo mniej pracy w skali zespolu.

Wariant "zrobie to sam" ma jeszcze jeden koszt, ktorego nikt nie wpisuje do arkusza. Przez te tygodnie nie robisz rzeczy, za ktore klienci Ci placa.

- **Zrodlo liczb:** AI Start 1990 zl, utrzymanie 99-599 zl/mies., 0 zl przy przejeciu infrastruktury, dwie rundy poprawek: cennik wlasciciela plus decyzja z 2026-08-31, punkt 2. Y-Ads (4 h do 30 minut dziennie) i KNF Team (ok. 8 h tygodniowo, szacunek klienta): konspekt, sekcja realizacji. Stawki etatu, SaaS i freelancera: celowo brak, kalkulator bez domyslnych kwot (decyzja wlasciciela, punkt 3). Kolumna ostatnia zawiera pytania do zadania, a nie oceny konkurencji, bo na oceny nie mamy pokrycia w zrodlach.

---

### 6. Wdrozenia AI w firmach: kto juz to zrobil i z jakim efektem?

- **Gdzie wstawic:** po sekcji 5 (porownanie z alternatywa), przed sekcja 7.
- **Po co:** to jedyna rzecz, ktorej nie ma zaden z pieciu przebadanych konkurentow. Pixelagency, lessmanual, stormit, falconworks i innowacje.ai sprzedaja na widelkach cenowych, nikt na dowodzie z nazwa klienta. Przy DR 18 to nasz najmocniejszy sygnal E-E-A-T i najlepsza amunicja pod cytowanie w ChatGPT i Perplexity: nazwa firmy plus konkretna liczba to idealny cytat.
- **Typ:** karty (6 kart). Link tylko tam, gdzie realnie istnieje strona case study.

**TRESC:**

Nazwy firm podajemy za ich zgoda. Liczby pochodza z tych wdrozen, nie z folderu reklamowego.

**KARTA 1: Instytut Kryptografii**
Problem: biuro obslugi klienta pisalo kazda odpowiedz od zera, a w szczycie wpada 580 maili tygodniowo.
Liczba: 80% draftow jest gotowych do wyslania bez poprawek. Wysyla je czlowiek, po sprawdzeniu.
Dodatkowo: trzy boty z baza wiedzy z transkrypcji kursow, ktore wskazuja dokladne miejsce w filmie.
Link: `/realizacje/auto-email-bok`

**KARTA 2: Onyx**
Problem: okolo 120 faktur miesiecznie przechodzilo przez rece czlowieka, kazda po 3-5 minut.
Liczba: okolo 120 faktur miesiecznie przechodzi dzis bez recznego przepisywania. Robisz zdjecie faktury i tyle, do tego dostajesz codzienny raport finansow.
Link: brak, wdrozenie bez osobnej strony opisu.

**KARTA 3: Trockenhaus (Niemcy, osuszanie piwnic i remonty)**
Problem: przygotowanie jednej oferty zajmowalo od 2 do 4 godzin, a rachunku okolo godziny.
Liczba: oferta w ok. 20 minut, rachunek w ok. 5 minut. Strona firmy weszla w Google z niewidocznej do pierwszej trojki na fraze Trockenhaus.
Link: `/realizacje/z-niewidocznej-strony-do-top3-google`

**KARTA 4: Y-Ads**
Problem: menedzer 12-osobowego zespolu tracil 4 godziny dziennie na pilnowanie pracy przy 8-13 klientach rownolegle.
Liczba: czas operacyjny menedzera spadl do okolo 30 minut dziennie.
Link: brak, wdrozenie bez osobnej strony opisu.

**KARTA 5: KNF Team**
Problem: raporty sprzedazowe dla 12 handlowcow i 3 menedzerow powstawaly recznie co tydzien.
Liczba: okolo 8 godzin tygodniowo mniej pracy w skali zespolu, wedlug szacunku klienta.
Link: `/realizacje/automatyczne-raporty`

**KARTA 6: Desant.pl**
Problem: pytania od klientow splywaly roznymi kanalami i ktos musial odpowiadac na te same rzeczy.
Liczba: chatbot obsluguje 30-50 klientow miesiecznie i 200-280 wiadomosci.
Link: brak, wdrozenie bez osobnej strony opisu.

Jesli chcesz sprawdzic nas na zywo, bot na `/uslugi/chatboty` jest nasz. Zadaj mu trudne pytanie o cene i zobacz, co odpowie.

- **Zrodlo liczb:** wszystkie liczby z sekcji realizacji w konspekcie firmy. Instytut Kryptografii: 80% draftow gotowych do wyslania bez poprawek, czlowiek w petli (decyzja wlasciciela z 2026-08-31, punkt 7), 580 maili tygodniowo w szczycie, trzy boty z transkrypcji kursow. Onyx: ok. 120 faktur miesiecznie, 3-5 min recznie, zdjecie faktury, codzienny raport finansow (funkcja placenia faktur przez API banku swiadomie pominieta, zakaz publikacji). Trockenhaus, Y-Ads, KNF Team, Desant.pl: konspekt. Adresy linkow zweryfikowane w rejestrze `lib/realizacje/*`: `auto-email-bok` (klient: Instytut Kryptografii), `z-niewidocznej-strony-do-top3-google` (klient: Trockenhaus), `automatyczne-raporty` (klient: KNF Team). Dla Onyx, Y-Ads i Desant.pl w rejestrze nie ma strony, wiec kart nie linkujemy. Bot na naszej stronie: zweryfikowany 2026-08-31 (decyzja wlasciciela, punkt 6).

---

### 7. Co jesli gotowy bot nie dziala tak, jak chcialem?

- **Gdzie wstawic:** po sekcji 6 (realizacje), przed sekcja 8.
- **Po co:** zamyka lek numer jeden przy zakupie AI: zaplace i zostane z czyms, co nie dziala. Innowacje.ai ma "2-4 tygodnie bezplatnej iteracji", falconworks.pl ma "90 dni wsparcia". My mamy caly proces rozpisany krok po kroku plus uczciwa granice zakresu. Lapie fraze "gwarancja wdrozenia AI", "poprawki po wdrozeniu".
- **Typ:** lista, os czasu 5 krokow.

**TRESC:**

Najwiekszy lek przy zakupie AI nie brzmi "czy to zadziala". Brzmi "zaplace, dostane cos, co nie pasuje, i zostane z tym sam".

Dlatego w cenie kazdego wdrozenia (boty, automatyzacje, aplikacje i strony) masz dwie rundy poprawek. Nie jako gest dobrej woli, tylko jako staly element procesu.

**KROK 1. Odbior roboczy**
Pokazujemy dzialajace rozwiazanie i przekazujemy dostepy. Od tego momentu to jest Twoje narzedzie, a nie nasze demo.

**KROK 2. Tydzien testow po Twojej stronie**
Uzywasz tego na prawdziwej robocie, nie na przykladach. Zbierasz uwagi w jednym miejscu, my w tym czasie nic nie zmieniamy.

**KROK 3. Pierwsza runda poprawek**
Wprowadzamy Twoje uwagi. Tu wychodzi wiekszosc rzeczy: nie ten ton wypowiedzi, brakujace pole, inna kolejnosc krokow.

**KROK 4. Drugi tydzien testow i druga runda poprawek**
Sprawdzasz poprawki na zywo i zglaszasz reszte. Druga runda jest zwykle krotsza, bo dotyczy juz szczegolow.

**KROK 5. Odbior koncowy**
Potwierdzasz, ze dziala. Dopiero wtedy zamykamy wdrozenie i przechodzimy na wybrany przez Ciebie model utrzymania. Stawki rozpisalismy wyzej.

Uczciwie o granicy zakresu. Poprawka to naprawa albo dostrojenie tego, co ustalilismy na pierwszej rozmowie. Nowa funkcja, o ktorej wtedy nie bylo mowy, to osobna wycena.

Mowimy to od razu, a nie na etapie faktury. Ta jedna zasada zamyka wiekszosc pozniejszych nieporozumien o pieniadze.

Przy leadach B2B proces wyglada inaczej, bo produktem jest gotowa lista rekordow, a nie dzialajace narzedzie. Tam nie ma rund poprawek, jest jeden odbior listy.

- **Zrodlo liczb:** cennik wlasciciela: "Dwie rundy poprawek w cenie wdrozenia (tydzien testow klienta, poprawki, drugi tydzien, poprawki, odbior)" oraz "Nowe funkcje spoza pierwszej rozmowy = osobna wycena". Wybor modelu utrzymania: decyzja wlasciciela z 2026-08-31, punkt 2. Wylaczenie leadow B2B z rund poprawek: leady sa w cenniku produktem jednorazowym (1000 rekordow 169 zl), nie wdrozeniem. Zero liczb spoza konspektu.

---

### 8. Kiedy wdrozenie AI sie u Ciebie NIE oplaci?

- **Gdzie wstawic:** po sekcji 7 (dwie rundy poprawek), przed sekcja 9.
- **Po co:** najsilniejszy pojedynczy sygnal wiarygodnosci na stronie sprzedazowej i realny filtr leadow, ktory oszczedza nam rozmow. Konkurenci maja to punktowo (pixelagency.pl "Kiedy automatyzacja sie NIE oplaca", falconworks.pl "Czego nie warto robic na poczatku", lessmanual.ai "Czego nie warto ciac"). Lapie fraze "czy warto wdrazac AI", "kiedy AI sie nie oplaca".
- **Typ:** lista, 5 sytuacji z alternatywa.

**TRESC:**

Nie kazdy proces nadaje sie pod AI i nie kazda firma powinna teraz cokolwiek wdrazac. Mowimy to na rozmowie, wiec rownie dobrze mozemy napisac to tutaj.

**1. Robisz to kilka razy w tygodniu, nie kilkaset razy w miesiacu**
Bot nie ma sie z czego zwrocic, bo oszczedza minuty, a nie godziny. Zrob zamiast tego: policz to w kalkulatorze wyzej i wroc, gdy liczba operacji urosnie.

**2. Proces jest balaganem i kazdy robi go inaczej**
Automat nie posprzata czegos, czego nikt nie umie opisac. Zrob zamiast tego: audyt za 1490 zl, zeby najpierw zobaczyc mape procesow, a dopiero potem wydawac na wdrozenie.

**3. Nie masz spisanej wiedzy**
Chatbot z baza wiedzy odpowiada z Twoich dokumentow. Jesli ich nie ma, nie ma z czego odpowiadac. Zrob zamiast tego: spisz najczestsze pytania i odpowiedzi, chocby w jednym pliku, i wtedy do nas wroc.

**4. Praca jest fizyczna i rozlozona na stanowiska, nie na dokumenty**
Powiemy to na przykladzie wlasnego wdrozenia. U klienta produkcyjnego, 14 osob na 5 stanowiskach, oszczednosci czasu po prostu nie da sie policzyc i mowimy mu to wprost. Zrob zamiast tego: szukaj korzysci w porzadku i przeplywie informacji, nie w odzyskanych godzinach.

**5. Szukasz AI, bo wypada je miec**
Wdrozenie bez konkretnego procesu do naprawy konczy sie ladnym narzedziem, ktorego nikt nie uzywa. Zrob zamiast tego: wskaz jedna czynnosc, ktora najbardziej Cie wkurza, i zacznij od niej.

Jesli rozpoznajesz w tym swoja firme, napisz do nas mimo wszystko. Wolimy powiedziec "jeszcze nie teraz" niz sprzedac cos, co potem stoi.

- **Zrodlo liczb:** audyt 1490 zl: cennik wlasciciela. Punkt 4 opiera sie na realizacji z konspektu (14 osob na 5 stanowiskach, oszczednosci czasu nie da sie policzyc i trzeba to napisac wprost). Nazwa tego klienta zostala celowo usunieta z tresci: w konspekcie zapisana jest w formie budzacej watpliwosc, a bledna nazwa firmy w publicznym opisie to problem z klientem, nie literowka. Fakt zostaje, nazwa wraca dopiero po potwierdzeniu przez wlasciciela. Punkty 1, 2, 3 i 5 nie zawieraja zadnych liczb poza kwota audytu.

---

### 9. Co zwykle powstrzymuje firmy przed wdrozeniem AI?

- **Gdzie wstawic:** po sekcji 8, bezposrednio przed `HubFAQ`.
- **Po co:** sekcja domykajaca sprzedaz tuz przed FAQ. Rozbraja opor przed decyzja, a nie odpowiada na pytania o produkt, wiec nie duplikuje `FAQ_HUBU`. Konkurenci maja obiekcje rozproszone po FAQ, nikt nie ma osobnego bloku z odpowiedziami opartymi na realizacjach.
- **Typ:** FAQ, 6 par obiekcja i odpowiedz.

**TRESC:**

Te zdania slyszymy niemal na kazdej pierwszej rozmowie. Odpowiadamy tak samo tutaj, jak przy telefonie.

**"To dla mnie za drogie"**
Najtansza droga do sprawdzenia nas kosztuje 1490 zl za audyt, a te kwote odliczamy od wdrozenia. Jesli wolisz od razu zobaczyc dzialajacy efekt, AI Start to jeden proces za 1990 zl.

**"Moja branza jest za malo cyfrowa na AI"**
Trockenhaus osusza piwnice i robi remonty w Niemczech. Przygotowanie oferty zajmowalo tam od 2 do 4 godzin, teraz zajmuje okolo 20 minut. Rachunek zszedl z godziny do okolo 5 minut.

**"Moi ludzie tego nie ogarna"**
W Onyx obsluga wyglada tak: robisz zdjecie faktury. Przy okolo 120 fakturach miesiecznie, ktore wczesniej szly po 3-5 minut kazda, to cala nauka obslugi.

**"AI zmysla, a ja nie moge sobie na to pozwolic"**
Bot odpowiada z Twojej bazy wiedzy, nie z wlasnej glowy. W Instytucie Kryptografii boty zbudowane na transkrypcjach kursow wskazuja dokladne miejsce w filmie, wiec kazda odpowiedz da sie sprawdzic u zrodla.

**"To potrwa miesiace, a ja potrzebuje tego teraz"**
Chatbot prosty na strone to 1-2 dni robocze. Audyt z mapa procesow to 5 dni roboczych. Landing to 1 dzien roboczy. Terminy podajemy w dniach roboczych wlasnie po to, zeby nie bylo niedomowien.

**"Zaplace i zostane z tym sam"**
W cenie wdrozenia masz dwie rundy poprawek: tydzien testow, poprawki, drugi tydzien, poprawki, odbior. Potem wybierasz model utrzymania, razem z wariantem za 0 zl abonamentu. Rozpisalismy oba wyzej.

Jesli Twojej obiekcji tu nie ma, zadaj ja na rozmowie. Trzydziesci minut i konkretna odpowiedz, bez prezentacji na czterdziesci slajdow.

- **Zrodlo liczb:** audyt 1490 zl odliczany od wdrozenia, AI Start 1990 zl, chatbot prosty 1-2 dni robocze, audyt 5 dni roboczych, dwie rundy poprawek: cennik wlasciciela. Landing 1 dzien roboczy: decyzja wlasciciela z 2026-08-31, punkt 1. Model utrzymania i wariant 0 zl: decyzja wlasciciela, punkt 2. Trockenhaus, Onyx, Instytut Kryptografii: konspekt, sekcja realizacji. Trzydziesci minut: bezplatna rozmowa, CTA juz obecne na stronie (`HOME_CTA`).

---

## Nowe podstrony

Siedem podstron. Trzy jako osobne katalogi statyczne pod `/uslugi` (wzorzec `app/uslugi/architekci-wartosci-ai/`), cztery jako podstrony uslugi macierzystej `automatyzacje` w rejestrze `lib/uslugi/podstrony/` (wzorzec podstron voicebotow).

---

### P1. /uslugi/cennik

- **Typ trasy:** nowy katalog `app/uslugi/cennik/page.tsx` (segment statyczny wygrywa z `[usluga]`).
- **H1:** Ile kosztuje wdrozenie AI w firmie? Cennik z czasem realizacji
- **metaTitle:** `Ile kosztuje wdrozenie AI w firmie` (34 znaki)
- **Fraza glowna:** ile kosztuje wdrozenie ai w firmie
- **Rozdzial intencji:** ta strona odpowiada wylacznie na pytanie o pieniadze i czas. Nie tlumaczy procesu (od tego P6), nie sprzedaje pojedynczego zastosowania (od tego P3, P4, P5), nie opisuje audytu (od tego istniejaca `/uslugi/audyt-ai`). Z niej wychodza linki do wszystkich pozostalych.

**Kapsula answer-first (do wklejenia pod H1, ma byc cytowalna przez AI):**

Wdrozenie AI w firmie kosztuje u nas od 1490 zl netto za audyt z mapa procesow i od 1790 zl netto za chatbota na strone. Pelna automatyzacja procesu to 3000-10000 zl netto, voicebot od 2500 zl netto, strona WWW od 1590 zl netto. Czas liczymy w dniach roboczych: 1-2 dni przy chatbocie prostym, 5 dni przy audycie, 5-10 dni przy wiekszych wdrozeniach. Do kazdego bota dochodza dwie osobne pozycje: utrzymanie (99-599 zl/mies. przy chatbotach i automatyzacjach, 299-1500 zl/mies. przy voicebotach) albo 0 zl, gdy przejmujesz infrastrukture, oraz zuzycie tokenow i minut po Twojej stronie.

**Sekcje:**
1. Dlaczego na dziewieciu stronach z dziesieciu nie ma konkretnej ceny? (problem, H2 jako pytanie)
2. Ile kosztuje wdrozenie AI w firmie: krotka odpowiedz (kapsula wyzej)
3. Tabela glowna: co wdrazamy, cena netto, czas realizacji, dla kogo (tabela z sekcji 2 huba, 1:1)
4. Za co placisz raz, a za co co miesiac (trzy pozycje w rachunku, tresc z sekcji 3 huba)
5. Wariant za 0 zl abonamentu: przejmujesz infrastrukture, poprawki 350 zl netto za godzine
6. Co wplywa na cene: liczba integracji, czy masz spisana wiedze, czy bot rozmawia z klientem czy z zespolem
7. Co nie wchodzi w cene i kiedy robimy osobna wycene
8. Dwie rundy poprawek i odbior: co dostajesz bez doplaty
9. Ile kosztuje strona WWW u kogos innego (tabela odniesienia: projektowaniestroncennik.pl, 2026-08-31)
10. Wdrozenia AI w firmach: kto juz to zrobil (skrocone karty z sekcji 6 huba, z linkami do trzech realnych case studies)
11. Kiedy to sie NIE oplaci
12. Powiazane: `/uslugi/audyt-ai`, `/uslugi/automatyzacje/pierwsza-automatyzacja`, `/uslugi/wdrozenie-krok-po-kroku`, `/uslugi/chatboty`, `/uslugi/voiceboty`, `/uslugi/strony-www`
13. FAQ (8 pytan)
14. CTA: bezplatna rozmowa 30 minut albo Sprint Diagnostyczny za 1490 zl

**FAQ (gotowe, do wklejenia):**

*Czy podane ceny sa netto czy brutto?*
Wszystkie kwoty na tej stronie sa netto. Do faktury dochodzi VAT wedlug stawki obowiazujacej dla danej uslugi.

*Czy audyt za 1490 zl odlicza sie od wdrozenia?*
Tak. Cala kwote audytu odliczamy od kosztu wdrozenia, jesli zdecydujesz sie z nami pracowac. Przy wdrozeniach drozszych niz 1490 zl diagnoza wychodzi w praktyce za darmo.

*Czym rozni sie AI Start za 1990 zl od chatbota za 1790 zl?*
AI Start to jeden proces wewnatrz firmy, czyli robota, ktora dzis zjada godziny Twoim ludziom. Chatbot za 1790 zl dziala na zewnatrz i rozmawia z Twoimi klientami. To dwa rozne produkty, nie dwa warianty tego samego.

*Czy musze placic abonament co miesiac?*
Nie. Przy kazdym wdrozeniu wybierasz: infrastruktura zostaje u nas i placisz abonament (99-599 zl/mies. przy chatbotach i automatyzacjach, 299-1500 zl/mies. przy voicebotach), albo przekazujemy ja Tobie i placisz 0 zl. W drugim wariancie poprawki kosztuja 350 zl netto za godzine.

*Od kiedy liczycie czas realizacji?*
Od przekazania kompletu materialow: tresci, scenariuszy i dostepow. Nie od podpisania umowy, bo wtedy to my czekamy na Ciebie.

*Co to jest zuzycie i dlaczego placi je klient?*
To tokeny modelu przy botach tekstowych i minuty rozmow przy voicebotach. Placisz dostawcy bezposrednio, wedlug faktycznego uzycia, wiec widzisz koszt w swoim panelu, a nie w naszej marzy.

*Ile kosztuje wdrozenie, jesli potrzebuje kilku rzeczy naraz?*
Kazda pozycja ma swoja cene z tabeli i sumujemy je wprost. Nie ma pakietu, w ktorym cena rosnie, bo zamawiasz wiecej.

*Co jesli po wdrozeniu bede chcial nowa funkcje?*
Nowa funkcja, o ktorej nie bylo mowy na pierwszej rozmowie, to osobna wycena. Poprawki tego, co ustalilismy, mieszcza sie w dwoch rundach wliczonych w cene.

---

### P2. /uslugi/wdrozenie-ai-male-firmy

- **Typ trasy:** nowy katalog `app/uslugi/wdrozenie-ai-male-firmy/page.tsx`.
- **H1:** Wdrozenie AI w malej firmie: od czego zaczac przy zespole do 20 osob
- **metaTitle:** `Wdrozenie AI w malej firmie` (27 znakow)
- **Fraza glowna:** wdrozenie ai w malej firmie
- **Rozdzial intencji:** segmentuje po wielkosci i typie firmy, nie po produkcie i nie po cenie. Odpowiada na pytanie "czy to w ogole dla firmy takiej jak moja", a potem rozsyla do stron produktowych i do cennika. Nie powtarza pelnej tabeli cen, pokazuje trzy sciezki z kwota wyjsciowa.

**Kapsula answer-first:**

Mala firma zaczyna wdrozenie AI od jednej czynnosci, ktora zjada najwiecej godzin, a nie od duzego projektu. Najtansze wejscie to audyt za 1490 zl netto z mapa procesow albo AI Start za 1990 zl netto, czyli jeden dzialajacy proces na probe. Chatbot na strone kosztuje 1790 zl netto i powstaje w 1-2 dni robocze. W firmach do 20 osob najczesciej oplaca sie zaczac od dokumentow, ofert albo powtarzalnych maili, bo tam praca jest najbardziej powtarzalna.

**Sekcje:**
1. Czy wdrozenie AI ma sens przy zespole do 20 osob? (problem, H2 jako pytanie)
2. Krotka odpowiedz (kapsula wyzej)
3. Trzy typowe sciezki: firma uslugowa do 10 osob, sklep i e-commerce, biuro i zespol sprzedazy
4. Tabela: typ firmy, pierwszy krok, koszt wejscia, czas w dniach roboczych
5. Co realnie zmienia sie w tygodniu pracy (Onyx: 120 faktur po 3-5 minut, czyli 6-10 godzin miesiecznie; Trockenhaus: oferta z 2-4 godzin do 20 minut)
6. Kiedy firma jest za mala na AI i co zrobic zamiast tego
7. Uczciwie: sa wdrozenia, w ktorych oszczednosci czasu nie da sie policzyc (przypadek produkcyjny, 14 osob na 5 stanowiskach)
8. Ile czasu zajmie to Tobie i Twojemu zespolowi
9. Powiazane: `/uslugi/cennik`, `/uslugi/audyt-ai`, `/uslugi/automatyzacje/pierwsza-automatyzacja`
10. FAQ (6 pytan)
11. CTA

---

### P3. /uslugi/automatyzacje/pierwsza-automatyzacja

- **Typ trasy:** podstrona w rejestrze `lib/uslugi/podstrony/`, `rodzic: 'automatyzacje'`.
- **H1:** Pierwsza automatyzacja AI za 1990 zl: jeden proces na probe
- **metaTitle:** `Pierwsza automatyzacja AI za 1990 zl` (36 znakow)
- **Fraza glowna:** pierwsza automatyzacja ai w firmie
- **Rozdzial intencji:** strona jednego produktu na probe, sprzedaje kwota 1990 zl i szybkim efektem. Strona audytu sprzedaje diagnoze, ta sprzedaje pierwsze dzialajace rozwiazanie. Pelne wdrozenie automatyzacji (3000-10000 zl) mieszka na `/uslugi/automatyzacje` i jest tu wskazane jako krok drugi.

**Kapsula answer-first:**

AI Start to jedna automatyzacja na probe za 1990 zl netto. Wybieramy jeden proces, ktory dzis zjada najwiecej godzin, budujemy go i oddajemy dzialajacy, razem z dostepami po Twojej stronie. W cenie sa dwie rundy poprawek: tydzien testow, poprawki, drugi tydzien, poprawki, odbior. Po odbiorze wybierasz utrzymanie u nas za 99-599 zl netto miesiecznie albo przejmujesz infrastrukture i placisz 0 zl abonamentu, a poprawki rozliczasz po 350 zl netto za godzine.

**Sekcje:**
1. Nie chce wydawac dwudziestu tysiecy na cos, czego jeszcze nie widzialem (problem, H2 jako pytanie)
2. Co dostajesz za 1990 zl (kapsula wyzej)
3. Czym AI Start rozni sie od chatbota za 1790 zl (jedno zdanie rozroznienia: AI Start dziala do wewnatrz, chatbot na zewnatrz)
4. Trzy przyklady procesow, ktore robimy jako pierwsze
5. Tabela: AI Start 1990 zl kontra pelne wdrozenie automatyzacji 3000-10000 zl, co dochodzi
6. Kroki: rozmowa, budowa, tydzien testow, poprawki, drugi tydzien, odbior
7. Co dalej, jesli zadziala, i co jesli nie zadziala
8. Realizacja z liczba: Y-Ads, czas operacyjny menedzera z 4 godzin do 30 minut dziennie
9. Utrzymanie: 99-599 zl/mies. albo 0 zl przy przejeciu infrastruktury
10. Powiazane: `/uslugi/cennik`, `/uslugi/audyt-ai`, `/uslugi/automatyzacje`
11. FAQ (6 pytan)
12. CTA

**FAQ (gotowe, do wklejenia):**

*Czym AI Start rozni sie od chatbota za 1790 zl?*
AI Start dziala do wewnatrz firmy: przejmuje proces, ktory dzis robia Twoi ludzie. Chatbot za 1790 zl dziala na zewnatrz: rozmawia z Twoimi klientami na stronie i w komunikatorach. Rozne produkty, rozne zastosowania.

*Co sie stanie, jesli po testach uznam, ze to nie dziala?*
Masz dwie rundy poprawek w cenie. Jesli po nich nadal nie widzisz sensu, konczymy na tym jednym procesie i nie musisz zamawiac nic wiecej. Po to jest wersja na probe.

*Czy 1990 zl to cala kwota?*
To cala kwota za budowe. Osobno stoi utrzymanie (99-599 zl netto miesiecznie albo 0 zl przy przejeciu infrastruktury) i zuzycie tokenow, ktore placisz dostawcy wedlug realnego uzycia.

*Kto wybiera proces do automatyzacji?*
Ustalamy to na pierwszej rozmowie. Zwykle wybieramy ten, ktory powtarza sie najczesciej i ma najbardziej przewidywalny przebieg, bo tam efekt widac najszybciej.

*Czy moge potem rozbudowac to do pelnego wdrozenia?*
Tak. Pelne wdrozenie automatyzacji to 3000-10000 zl netto, zaleznie od liczby integracji. AI Start zostaje w tym jako pierwszy dzialajacy element.

*Czy dostepy zostaja u mnie?*
Tak, przekazujemy je przy odbiorze roboczym. Od tego momentu to Twoje narzedzie, a nie nasze demo.

---

### P4. /uslugi/automatyzacje/obsluga-maili

- **Typ trasy:** podstrona, `rodzic: 'automatyzacje'`.
- **H1:** AI do obslugi maili w firmie: gotowe odpowiedzi zamiast pisania od zera
- **metaTitle:** `AI do obslugi maili w firmie` (28 znakow)
- **Fraza glowna:** ai do obslugi maili w firmie
- **Rozdzial intencji:** jedno zastosowanie, jeden dowod, jedna cena. Nie opisuje chatbota na strone (inny produkt, inna strona) ani voicebota. Cennik i strona dla malych firm linkuja tutaj jako do konkretnego przykladu.

**Kapsula answer-first:**

AI do obslugi maili czyta przychodzaca wiadomosc, siega do historii korespondencji i przygotowuje gotowy draft odpowiedzi. Czlowiek sprawdza i wysyla, nic nie wychodzi bez jego akceptacji. W Instytucie Kryptografii 80% draftow jest gotowych do wyslania bez poprawek, przy 580 mailach tygodniowo w szczycie. Wdrozenie takiej automatyzacji to 3000-10000 zl netto, zaleznie od liczby integracji, plus utrzymanie 99-599 zl netto miesiecznie albo 0 zl przy przejeciu infrastruktury.

**Sekcje:**
1. Ile godzin tygodniowo Twoj zespol pisze te same maile? (problem, H2 jako pytanie)
2. Jak to dziala: mail wchodzi, system przygotowuje draft, czlowiek zatwierdza i wysyla (kapsula wyzej)
3. Dowod: Instytut Kryptografii, 80% draftow gotowych do wyslania bez poprawek, 580 maili tygodniowo w szczycie, link do `/realizacje/auto-email-bok`
4. Tabela: przed wdrozeniem kontra po wdrozeniu (kto pisze, kto akceptuje, co sie dzieje z nietypowymi sprawami)
5. Czlowiek w petli: dlaczego nic nie wychodzi automatycznie
6. Kroki wdrozenia i czas
7. Cena: 3000-10000 zl netto, utrzymanie 99-599 zl/mies. albo 0 zl przy przejeciu infrastruktury, plus zuzycie tokenow po Twojej stronie
8. Kiedy to nie zadziala (malo maili, brak powtarzalnosci, kazda sprawa inna)
9. Powiazane: `/uslugi/cennik`, `/uslugi/chatboty`, `/uslugi/automatyzacje/ofertowanie`
10. FAQ (6 pytan)
11. CTA

---

### P5. /uslugi/automatyzacje/ofertowanie

- **Typ trasy:** podstrona, `rodzic: 'automatyzacje'`.
- **H1:** AI do ofertowania i wycen: oferta w 20 minut zamiast w pol dnia
- **metaTitle:** `AI do ofertowania i wycen` (25 znakow)
- **Fraza glowna:** automatyzacja ofertowania ai
- **Rozdzial intencji:** jedno zastosowanie, przygotowanie oferty i wyceny. Nie miesza sie z obsluga maili (tam zapytania przychodzace, tu dokumenty wychodzace) ani z fakturowaniem (tam dokument po sprzedazy). Linkuje do obu jako do sasiednich etapow tego samego procesu.

**Kapsula answer-first:**

Automatyzacja ofertowania zbiera dane wejsciowe, liczy wycene wedlug Twoich zasad i sklada gotowy dokument do sprawdzenia. W Trockenhaus, niemieckiej firmie od osuszania piwnic i remontow, przygotowanie oferty zeszlo z 2-4 godzin do okolo 20 minut, a wystawienie rachunku z okolo godziny do okolo 5 minut. Wdrozenie kosztuje 3000-10000 zl netto, zaleznie od liczby integracji, plus utrzymanie 99-599 zl netto miesiecznie albo 0 zl przy przejeciu infrastruktury.

**Sekcje:**
1. Ile kosztuje Cie jedna oferta przygotowana recznie? (problem, H2 jako pytanie)
2. Jak to dziala: dane wejsciowe, wyliczenie, gotowy dokument do sprawdzenia (kapsula wyzej)
3. Dowod: Trockenhaus, oferta z 2-4 godzin do ok. 20 minut, rachunek z ok. godziny do ok. 5 minut, link do `/realizacje/z-niewidocznej-strony-do-top3-google`
4. Tabela: co liczy system, co zostaje decyzja czlowieka
5. Kroki wdrozenia i czas
6. Cena: 3000-10000 zl netto, utrzymanie 99-599 zl/mies. albo 0 zl, dwie rundy poprawek w cenie
7. Kiedy to nie ma sensu (malo ofert miesiecznie, kazda wycena liczona od zera)
8. Powiazane: `/uslugi/automatyzacje/obsluga-maili`, `/uslugi/dokumenty-faktury`, `/uslugi/cennik`
9. FAQ (6 pytan)
10. CTA

---

### P6. /uslugi/automatyzacje/raporty-sprzedazowe

- **Typ trasy:** podstrona, `rodzic: 'automatyzacje'`.
- **H1:** AI do raportow sprzedazowych: gotowy raport zamiast skladania go recznie
- **metaTitle:** `AI do raportow sprzedazowych` (28 znakow)
- **Fraza glowna:** automatyzacja raportow sprzedazowych
- **Rozdzial intencji:** adresat to menedzer i wlasciciel, nie operator procesu. Pozostale strony zastosowan mowia "przyspieszymy Twoja prace", ta mowi "zobaczysz, co sie dzieje w zespole, bez proszenia o dane". Przy KNF Team ograniczamy sie do jednego zdania i liczby, bez rozpisywania szczegolow (decyzja wlasciciela).

**Kapsula answer-first:**

Automatyczne raporty sprzedazowe zbieraja dane z Twoich systemow, skladaja je w staly format i wysylaja o ustalonej porze. W KNF Team, przy 12 handlowcach i 3 menedzerach, klient szacuje okolo 8 godzin tygodniowo mniej pracy w skali zespolu. W Y-Ads czas operacyjny menedzera spadl z 4 godzin do okolo 30 minut dziennie przy 12 osobach i 8-13 klientach rownolegle. Wdrozenie to 3000-10000 zl netto, a asystent prezesa z wiedza o firmie kosztuje 7999 zl netto plus 199 zl netto miesiecznie za serwery.

**Sekcje:**
1. Ile czasu zespol traci na skladanie raportow, ktorych nikt nie czyta? (problem, H2 jako pytanie)
2. Jak to dziala: dane z systemow, raport w stalym formacie, alert kiedy cos odstaje (kapsula wyzej)
3. Dowod: KNF Team, ok. 8 godzin tygodniowo w skali zespolu, link do `/realizacje/automatyczne-raporty`; Y-Ads, menedzer z 4 godzin do 30 minut dziennie
4. Tabela: raport dzienny, tygodniowy, ranking, alert (co zawiera, kto dostaje)
5. Kroki wdrozenia i czas
6. Cena: 3000-10000 zl netto za wdrozenie, asystent prezesa 7999 zl + 199 zl/mies. za serwery, 5-10 dni roboczych
7. Kiedy to nie zadziala (dane siedza w glowach, a nie w systemie)
8. Powiazane: `/uslugi/cennik`, `/uslugi/asystent-prezesa`, `/uslugi/audyt-ai`
9. FAQ (6 pytan)
10. CTA

---

### P7. /uslugi/wdrozenie-krok-po-kroku

- **Typ trasy:** nowy katalog `app/uslugi/wdrozenie-krok-po-kroku/page.tsx`.
- **H1:** Wdrozenie AI krok po kroku: co sie dzieje od pierwszej rozmowy do odbioru
- **metaTitle:** `Wdrozenie AI krok po kroku` (26 znakow)
- **Fraza glowna:** wdrozenie ai krok po kroku
- **Rozdzial intencji:** opisuje procedure i harmonogram, nie ceny i nie produkty. Cennik odsyla tutaj po szczegoly przebiegu, ta strona odsyla do cennika po kwoty. Zero widelek cenowych w tresci poza jedna kotwica przy audycie.

**Kapsula answer-first:**

Wdrozenie AI przebiega u nas w szesciu etapach: rozmowa i zakres, audyt albo od razu budowa, budowa, tydzien testow po stronie klienta z pierwsza runda poprawek, drugi tydzien testow z druga runda poprawek, odbior koncowy. Dopiero po odbiorze wybierasz model utrzymania: infrastruktura u nas na abonament albo przekazana Tobie za 0 zl miesiecznie. Czas liczymy w dniach roboczych, od przekazania kompletu materialow, a nie od podpisania umowy.

**Sekcje:**
1. Nie wiem, co sie wlasciwie dzieje po podpisaniu (problem, H2 jako pytanie)
2. Wdrozenie AI krok po kroku: krotka odpowiedz (kapsula wyzej)
3. Etap 1: rozmowa i zakres, kto z Twojej strony musi w tym byc
4. Etap 2: audyt za 1490 zl albo od razu budowa, kiedy ktory wariant
5. Etap 3: budowa, ile trwa przy kazdym typie wdrozenia (dni robocze)
6. Etap 4: tydzien testow po Twojej stronie i pierwsza runda poprawek
7. Etap 5: drugi tydzien testow, druga runda poprawek, odbior
8. Etap 6: wybor modelu utrzymania albo przekazanie infrastruktury
9. Tabela: co robimy my, co robisz Ty, ile Twojego czasu na kazdym etapie
10. Co przedluza wdrozenie (brak dostepow, brak spisanej wiedzy, zmiana zakresu)
11. Powiazane: `/uslugi/cennik`, `/uslugi/audyt-ai`, `/uslugi/automatyzacje/pierwsza-automatyzacja`
12. FAQ (6 pytan)
13. CTA

---

## Uwagi dla sesji wdrozeniowej

1. **Kolor kategorii i komponenty.** Nowe sekcje huba renderujemy istniejacymi komponentami: tabele przez `TabelaRejestru` albo zwykla `<table>` w tym samym stylu co 3b, karty realizacji przez wzorzec `UslugaKafel`, FAQ obiekcji przez `HubFAQ` (druga instancja) albo `<details>` w tym samym stylu. Zero nowych stylow, zero nowej palety. Naprzemienny `tone` sekcji (`base` / `subtle`) trzeba przeliczyc od nowa po wstawieniu dziewieciu blokow, zeby pasy tla nadal sie przeplatały.

2. **Dwie tabele cenowe na jednej stronie.** Istniejaca `TabelaRejestru` (3b) pokazuje 12 uslug z rejestru, nowa tabela z sekcji 2 pokazuje warianty z cena i czasem. Zeby nie zaczely sie rozjezdzac, przy tym wdrozeniu trzeba zaktualizowac `lib/uslugi/strony-www.ts`: dzis nie ma tam ceny i rejestr renderuje "wycena po bezplatnej diagnozie", a od 2026-08-31 obowiazuje 1590 / 2900 / od 5900 zl netto. Ustaw `ramaCeny.minPrice = 1590` i dopisz trzy progi do tresci strony, inaczej hub bedzie mowil dwie rozne rzeczy w dwoch tabelach obok siebie.

3. **Rozjazd 75 kontra 80 procent.** `lib/realizacje/auto-email-bok.ts` mowi dzis o 75% maili, a `lib/uslugi/automatyzacje.ts` i decyzja wlasciciela z 2026-08-31 mowia o 80% draftow gotowych do wyslania bez poprawek. Karta 1 w sekcji 6 linkuje wprost do tej realizacji, wiec strone case study trzeba wyrownac do 80% w tym samym wdrozeniu. Poprawne brzmienie: "80% draftow gotowych do wyslania bez poprawek", nigdy "automat sam wysyla".

4. **Rejestr podstron.** Cztery podstrony (P3, P4, P5, P6) maja `rodzic: 'automatyzacje'`, wiec potrzebny jest nowy katalog trasy `app/uslugi/automatyzacje/[podstrona]/page.tsx`, zbudowany 1:1 na wzorcu `app/uslugi/voiceboty/[podstrona]/page.tsx`. Bez tego katalogu wpisy w `PODSTRONY` nie wygeneruja stron, a trafia do mapy witryny jako martwe adresy. Kazda podstrona musi miec `dataAktualizacji` z realna data, nigdy `new Date()`.

5. **Trzy strony jako katalogi statyczne.** P1 (`/uslugi/cennik`), P2 (`/uslugi/wdrozenie-ai-male-firmy`) i P7 (`/uslugi/wdrozenie-krok-po-kroku`) nie wchodza do `USLUGI` ani do `PODSTRONY`. To osobne katalogi pod `app/uslugi/`, wzorzec `app/uslugi/architekci-wartosci-ai/`. Segment statyczny wygrywa z `[usluga]`, wiec nie koliduja z rejestrem. Trzeba je recznie dopisac do `app/sitemap.ts`, bo nie zlapie ich zaden z dwoch rejestrow.

6. **Linkowanie wewnetrzne.** Hub linkuje do `/uslugi/cennik` z sekcji 2 (zdanie "pelny cennik z czasem realizacji"). Cennik linkuje z powrotem do huba i do wszystkich siedmiu podstron. Kazda podstrona zastosowania (P4, P5, P6) linkuje do `/uslugi/cennik` i do swojej uslugi macierzystej `/uslugi/automatyzacje`. P2 i P7 linkuja do `/uslugi/cennik` i `/uslugi/audyt-ai`. Zero linkow do adresow, ktorych nie ma w rejestrze.

7. **Linki do realizacji.** W sekcji 6 linkujemy wylacznie trzy adresy, ktore realnie istnieja w `lib/realizacje/`: `/realizacje/auto-email-bok`, `/realizacje/z-niewidocznej-strony-do-top3-google`, `/realizacje/automatyczne-raporty`. Karty Onyx, Y-Ads i Desant.pl zostaja bez linku. Nie podstawiaj tam kotwicy do kontaktu ani placeholdera.

8. **Kalkulatory.** Dwa kalkulatory (sekcja 1 i sekcja 5) startuja z pustymi polami. Zaden `defaultValue`, zaden placeholder z kwota, zadna przykladowa stawka w podpowiedzi pola. Wynik liczy sie dopiero po wpisaniu wszystkich pol. To jest twarda decyzja wlasciciela z 2026-08-31, punkt 3, a nie preferencja UX.

9. **Kanaly chatbota.** Wszedzie, gdzie wymieniamy kanaly, wolno pisac wylacznie: strona WWW, WhatsApp, Messenger, Instagram, Telegram. Slack i Microsoft Teams NIE sa kanalami chatbota i nie moga sie tam pojawic. Meet, Zoom i Teams naleza do osobnej uslugi auto-podsumowan spotkan i nie wolno ich mieszac z chatbotem.

10. **Dostawca modelu.** Anthropic (Claude), model `claude-haiku-4-5`. Sprawdzone w kodzie 2026-08-31. Zaden naglowek ani zdanie na nowych stronach nie moze sugerowac OpenAI.

11. **Zakaz publikacyjny przy Onyx.** Nigdzie, na zadnej z tych stron, nie wolno napisac o placeniu faktur przez API banku. Zostaje: zdjecie faktury, brak recznego przepisywania, codzienny raport finansow.

12. **Glos marki.** Zero dlugiego myslnika w calej tresci. Zero slow "innowacyjny", "nowoczesny", "kompleksowy", "dedykowany". Zdania krotkie, na Ty. Akapity cytowalne trzymamy w okolicach 170 znakow.

13. **Duplikat z FAQ hubu.** Przed publikacja zderz sekcje 9 (obiekcje) z tablica `FAQ_HUBU` jeden do jednego. Jesli w FAQ stoi juz pytanie o odliczanie audytu albo o ceny netto, w sekcji 9 zostaje wersja emocjonalna ("to dla mnie za drogie"), a w FAQ techniczna. Nie dubluj tego samego pytania dwoma glosami.

14. **Schema.** Nowe sekcje huba nie dokladaja wlasnego JSON-LD. Nowe podstrony dostaja standardowy zestaw z wzorca podstron voicebotow (`Service` + `FAQPage` + `BreadcrumbList`), z tresci FAQ zapisanej w rejestrze, zeby schema i widoczny tekst szly z jednego zrodla.

---

## Sekcje i dane wyciete z pierwotnego projektu

- **Podstrona `/uslugi/wdrozenie-ai/dofinansowanie`** (dofinansowanie na wdrozenie AI): wycieta w calosci. Wymaga zweryfikowanych, aktualnych nazw programow, poziomow dofinansowania i terminow naborow. Nie mamy ich u zrodla, a publikacja zmyslonych kwot dotacji to ryzyko prawne.
- **Podstrona `/uslugi/wdrozenie-ai/audyt-ai`**: wycieta jako duplikat istniejacej `/uslugi/audyt-ai` (1490 zl, 5 dni roboczych, raport PDF). Zamiast nowej strony linkujemy do istniejacej z cennika i z czterech innych stron.
- **Podstrona `/uslugi/wdrozenie-ai/faktury-i-dokumenty`**: wycieta jako duplikat istniejacej `/uslugi/dokumenty-faktury`. Dowod z Onyx zostaje na hubie i w cenniku, a strona zastosowania juz istnieje.
- **Wiersz "Zbieranie danych o firmach (leady B2B)"** z tabeli pomiarow w sekcji 1: usuniety. Leady to pozycja cennikowa, nie wdrozenie u nazwanego klienta, a tabela byla zapowiedziana jako pomiary z wdrozen. Ceny i czasy leadow zostaja w tabeli cenowej w sekcji 2.
- **Kwoty konkurencji dla etatu, SaaS i freelancera** w tabeli porownawczej (sekcja 5): niewpisane. Nie zweryfikowalismy zadnej z nich u zrodla. Zostaje jedyne sprawdzone odniesienie: ceny stron na projektowaniestroncennik.pl z 2026-08-31.
- **Nazwa klienta produkcyjnego** w sekcji 8, punkt 4: usunieta z tresci. Fakt (14 osob, 5 stanowisk, oszczednosci czasu nie da sie policzyc) zostaje, nazwa wraca po potwierdzeniu przez wlasciciela.
- **Twierdzenia o wlasnosci danych i ciaglosci dzialania po zakonczeniu wspolpracy**: usuniete z sekcji 4. To zobowiazania umowne, nie tresc marketingowa. Sekcja mowi wylacznie o tym, co jest w decyzji wlasciciela: wybor miedzy abonamentem a przejeciem infrastruktury za 0 zl i poprawkami po 350 zl netto za godzine.
- **Czasy realizacji dla AI Start i pelnego wdrozenia automatyzacji**: nie wpisano zadnej liczby dni. W tabeli stoi "ustalamy przy wycenie, wdrazamy w dni", bo konspekt nie podaje tych wartosci.
