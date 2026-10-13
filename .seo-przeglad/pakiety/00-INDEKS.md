# Pakiety wdrożeniowe SEO — indeks i kolejność

**Data:** 2026-08-31
**Zawartość:** 8 pakietów, 86 nowych sekcji, 53 nowe podstrony, 443 kB gotowej treści
**Jak powstały:** 40 agentów w dwóch rojach. Pierwszy badał konkurencję i ceny, projektował
sekcje i pisał copy, drugi naprawiał to, co walidatorzy odrzucili (77 blokerów).

**Dla kogo:** sesja wdrożeniowa SFAI WWW. Każdy pakiet jest samodzielny.

---

## Jak tego używać

Każdy pakiet ma tę samą budowę:

1. **Czego NIE ruszamy** — istniejące sekcje strony, które zostają nietknięte
2. **Nowe sekcje** — z dokładnym wskazaniem, po której istniejącej sekcji wstawić, gotową
   treścią i źródłem każdej liczby
3. **Nowe podstrony** — adres, H1, metaTitle, fraza główna, rozdział intencji, sekcje
4. **Uwagi wdrożeniowe** — kolor kategorii, rejestr podstron, linkowanie

Treść jest **gotowa do wklejenia**. Nie ma w niej znaczników `[DO POTWIERDZENIA]`,
nie ma długich myślników, a każda liczba ma podane źródło.

---

## Kolejność wdrożenia

Ustalona wg stosunku zysku do nakładu na podstawie realnych danych z Search Console.

| # | Pakiet | Plik | Dlaczego tu | Sekcji | Podstron |
|---|---|---|---|---|---|
| 1 | **GEO** | `geo.md` | Największa dysproporcja w serwisie: strona ma 5 liczb, a mamy TRZY realne dowody (Lenart Motors cytowany przez ChatGPT po 3 tygodniach, Fichtelgebirgshaus w top10, Trockenhaus z niewidocznej do trójki). Dowody leżą gotowe i nikt ich nie pokazuje | 13 | 8 |
| 2 | **Chatboty** | `chatboty.md` | Największy pojedynczy zysk: „chatbot ai dla firm" ma 147 wyświetleń na pozycji 14,1, a konkurenci mają słabsze domeny od naszej (4-17 przy naszym 18) | 11 | 8 |
| 3 | **Voiceboty** | `voiceboty.md` | Rozbudowa tego, co już zadziałało. Po trzech podstronach mamy 10 fraz w TOP10 i jedną na pozycji 1,0 | 11 | 6 |
| 4 | **Automatyzacje** | `automatyzacje.md` | „automatyzacja ai dla firm" stoi na pozycji 10,8, czyli jedno oczko od pierwszej strony | 11 | 8 |
| 5 | **Audyt AI** | `audyt.md` | Twarda przewaga: konkurenci z czołówki (agisona.pl, multi-future.pl) NIE podają ani ceny, ani terminu, a my mamy 1490 zł, 5 dni i raport PDF | 11 | 8 |
| 6 | **Strony WWW** | `strony.md` | Nowe ceny (1590 / 2900 / od 5900 zł) plus cztery realizacje z dowodami wyników | 12 | 6 |
| 7 | **Faktury i KSeF** | `faktury.md` | Zero fraz w TOP10, najtrudniejszy obszar. Ale nisza KSeF jest realna, mamy case Onyx (120 faktur miesięcznie) | 11 | 6 |
| 8 | **Wdrożenia AI** | `wdrozenia.md` | Fraza szeroka, konkurenci z siłą domeny 49-71. Wejście wyłącznie przez długi ogon | 9 | 10 |

**Rada praktyczna:** nie wypuszczaj wszystkich 53 podstron naraz. Przy sile domeny 18
nagły przyrost o kilkadziesiąt adresów wygląda gorzej niż stopniowy. Trzy podstrony
voicebotów dały efekt w dwa tygodnie. Zrób pakiet 1 i 2, zmierz po miesiącu, potem dalej.

---

## CZTERY RZECZY, KTÓRE ZNALEŹLIŚMY PRZY OKAZJI

To nie są elementy pakietów. To błędy w istniejącym serwisie, wykryte przez agentów.

### 1. Sprzeczność liczb na żywej stronie

`lib/realizacje/auto-email-bok.ts` mówi o **75% maili**, a `lib/uslugi/automatyzacje.ts`
i decyzja właściciela z 2026-08-31 mówią o **80% draftów gotowych do wysłania**.

Ta sama realizacja, dwie różne liczby w dwóch miejscach serwisu. Modele AI krzyżują dane
i taka sprzeczność obniża wiarygodność obu wystąpień. **Poprawna wersja to 80% draftów
gotowych do wysłania bez poprawek, przy 580 mailach tygodniowo w szczycie.**

### 2. Kalkulator łamie decyzję o zerze domyślnych kwot

`components/narzedzia/KalkulatorOszczednosci.tsx` startuje z wartościami: osoby 5,
godziny 6, stawka 60 zł. Decyzja z 2026-08-31 mówi, że kalkulatory nie mają domyślnych
kwot, bo to liczby zmyślone. Ten istniejący kalkulator też jest nią objęty.

### 3. Nazwa klienta prawdopodobnie zapisana ze słuchu

W konspekcie widnieje **„ZB Bielizsy"** i tak trafiło do pakietów. Wygląda na zapis
fonetyczny. To idzie na stronę publiczną obok zdania „nazwy firm podajemy za zgodą
klientów", więc literówka w nazwie klienta byłaby wpadką. **Do potwierdzenia pisowni
przed publikacją.** W pakietach ten klient jest opisany bezosobowo („zakład produkcyjny,
14 osób na 5 stanowiskach"), więc nic nie blokuje.

### 4. Nowe ceny stron WWW nie są jeszcze w kodzie

Ceny 1590 / 2900 / od 5900 zł to decyzja z 2026-08-31, ale `lib/uslugi/strony-www.ts`
ich nie zna, więc tabela na stronie renderuje „wycena po bezpłatnej diagnozie".
Do wpisania przy wdrażaniu pakietu 6.

---

## Co agenci wycięli i dlaczego

Ważne, żeby sesja wdrożeniowa nie próbowała tego przywracać.

**Podstrona o oddzwanianiu do leadów (voiceboty).** Wycięta w całości, bo była sprzeczna
z kontraktem powtórzonym w ośmiu miejscach kodu: nie robimy botów, które same wydzwaniają.
Razem z nią wyleciała karta „Bot dzwoni pierwszy".

**Wszystkie tabele z gotowymi kwotami oszczędności.** Opierały się na zmyślonych
założeniach (5 minut na odpowiedź, 22 dni robocze, 50 zł za godzinę, pensja 5000 zł brutto).
Zastąpione kalkulatorami z pustymi polami, w których klient wpisuje swoje liczby,
a wzory są pokazane w treści.

**Kolumny z cenami konkurencji, których nikt nie widział na oczy.** Zostały tylko te kwoty,
które agent realnie odczytał ze strony, z nazwą domeny i datą sprawdzenia.

**Data wejścia i numer artykułu aktu o AI oraz kwota kary.** Nikt tego nie sprawdził
w źródle, więc sekcje o zgodności prawnej zostały przepisane tak, żeby działały bez
powoływania się na konkretny przepis.

**Kanały Slack i Microsoft Teams.** Zgodnie z decyzją właściciela: robimy stronę WWW,
WhatsApp, Messenger, Instagram i Telegram.

---

## Pytania, które podnoszą jakość, ale niczego nie blokują

Agenci zgłosili 47 takich punktów. Wszystkie pakiety działają bez odpowiedzi na nie.
Najczęściej powtarzające się grupy:

**Czasy realizacji, których nie ma w cenniku (4 zgłoszenia).** Brakuje liczby dni
roboczych dla AI Start (1990 zł) i dla pełnego wdrożenia automatyzacji (3000-10000 zł).
To jedyne dwie pozycje cennika bez czasu, a czas jest tym, co najmocniej działa na
cytowalność w AI.

**Koszt etatu do porównań (5 zgłoszeń).** Kilka tabel porównawczych ma kolumnę „dodatkowy
etat" bez kwoty i odsyła do kalkulatora. Z jedną zatwierdzoną liczbą byłyby mocniejsze.

**Ceny konkurencji do zweryfikowania (4 zgłoszenia).** Sekcje porównawcze działają bez
nich, ale gdyby ktoś wszedł na cenniki wskazanych firm i spisał kwoty z datą, dałoby się
dołożyć twarde odniesienie rynkowe.

**Dowody wizualne (3 zgłoszenia).** Zrzut ekranu z datą przy Lenart Motors, zdjęcie do
bloku autorskiego, nagranie rozmowy z voibotem. Każde z nich podniosłoby konwersję,
ale treść jest kompletna bez nich.

Pełna lista pytań jest w sekcji „Uwagi dla sesji wdrożeniowej" każdego pakietu.

---

## Zasady, których pakiety pilnują

1. Zero zmyślonych liczb. Każda ma podane źródło: konspekt firmy, decyzja właściciela
   z 2026-08-31 albo pokazane w treści przeliczenie.
2. Zero długiego myślnika (zweryfikowane: 0 wystąpień w 443 kB).
3. Ceny konkurencji tylko realnie zobaczone, z domeną i datą.
4. AI Start (1990 zł) i chatbot prosty (1790 zł) zawsze z jednozdaniowym rozróżnieniem:
   AI Start działa do wewnątrz, chatbot na zewnątrz.
5. Narzędzia z portfolio opisywane bezosobowo, z wyjątkiem bota na naszej stronie.
6. Model utrzymania: abonament albo przekazanie infrastruktury za 0 zł z poprawkami
   350 zł netto za godzinę. Od 2026-08-31 dotyczy wszystkich usług.

---

*Punkt cofnięcia przed wdrożeniem: załóż tag `seo-<data>` na HEAD przed pierwszą zmianą.*
