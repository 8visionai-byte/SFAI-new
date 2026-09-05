# STATUS — RAPORT SEO 2026-09-05: NAPRAWA /uslugi/chatboty PRZED PUSHEM — W TOKU

ŹRÓDŁO: `.seo-przeglad/raporty/2026-09-05.md` (osobna sesja przeglądu SEO).
PUNKT COFNIĘCIA: tag `seo-2026-09-05` = 72c955a (HEAD przed tą rundą).
PRODUKCJA STOI NA: ca6f74b (v24b, 2026-08-25). Cztery commity pakietów NIEWYPCHNIĘTE.

## DIAGNOZA RAPORTU, ZWERYFIKOWANA PRZEZE MNIE W KODZIE

Fraza „chatbot ai dla firm" zniknęła z wyświetleń (70 -> 3), ale Google NIE CZYTAŁ
/uslugi/chatboty od 29 LIPCA (URL Inspection API). Więc żadna sierpniowa zmiana nie
mogła zaszkodzić, bo Google jej nie widział. Przyczyna zewnętrzna: gogler.pl (15.08,
„2026" w tytule), AI Overview cytujący konkurentów, nasza lipcowa liczba pojedyncza
„dla firmy" przy zapytaniu w mnogiej „dla firm". Brak mapy witryny w Search Console
(zgłoszona przez tamtą sesję 5.09, HTTP 204, status „oczekuje").

TWIERDZENIA RAPORTU SPRAWDZONE W KODZIE, WSZYSTKIE PRAWDZIWE:
 - h1 „Chatbot AI dla firmy" kontra metaTitle „Chatbot AI dla firm" (rozjazd),
 - 20 kotwic „Chatbot AI dla firmy" w 12 plikach,
 - Footer.tsx:23 LAST_UPDATED = '2026-06-15' z komentarzem [PLACEHOLDER],
 - trzy <h2> w stopce (Usługi, Strony, Kontakt) + <h2> w AgentConsole.tsx:61,
 - nasz bot działa na claude-haiku-4-5 (app/api/chat/route.ts:82).

MÓJ POMIAR LOKALNY, GORSZY NIŻ W RAPORCIE: raport mierzył produkcję (2522 słów).
HEAD z pakietem 2 ma 5667 SŁÓW w <main> (cel 1300-1600, top5 konkurencji 876-1647),
fraza docelowa pada 0 razy, „dla firmy" 7 razy, cena 1790 pada 28 RAZY, 4 pytania
FAQ zdublowane, sekcja „Co robi nasz chatbot" 1939 słów, „Ile kosztuje" 2086 słów.
Push pakietu 2 w tej formie utrwaliłby w Google rozmytą wersję. Raport §9 miał rację.

## KOLEJNOŚĆ Z RAPORTU §8 (obowiązująca)

 1. Mapa witryny w Search Console: ZROBIONE przez tamtą sesję, NIE RUSZAĆ.
 2. /uslugi/chatboty lokalnie: jedna odmiana frazy w title/h1/kapsule/H2/2×FAQ,
    20 kotwic na „dla firm", wątki poboczne na podstrony (zostaje 2-3 zdania + link),
    1300-1600 słów, cennik raz, FAQ bez duplikatów, NOWA sekcja „Na jakim silniku
    działa Twój bot i gdzie są dane?" + FAQ o danych. STAN: W TOKU (rój).
 3. Globalne: data w stopce z realnego dataAktualizacji (NIE new Date()), H2 w stopce
    i widżecie na elementy bez rangi nagłówka. STAN: W TOKU (rój, równolegle).
 4. Push + Paweł klika „Poproś o zindeksowanie" dla 7 adresów + node tools/indexnow-ping.js.
 5. ZAMROZIĆ /uslugi/chatboty na 3-4 tygodnie. Czytać GSC w oknie 28 dni.
 6. Następny pakiet: nowa strona usługi /uslugi/agent-ai („agent ai dla firm" rośnie 5×).

CZEGO NIE ROBIĆ (raport §9): nie zmieniać adresu /uslugi/chatboty; nie kasować sekcji
(przenosić); nie pisać „chatbot GPT dla firm" (fraza nie istnieje, nasz bot nie działa
na GPT); nie czytać pozycji z zalogowanej przeglądarki; nie mierzyć dzień po dniu.

---

# STATUS — ROZBUDOWA Z PAKIETÓW WDROŻENIOWYCH (2026-08-31) — PAKIETY 1 I 2 GOTOWE, WSTRZYMANE PRZED PUSHEM

ZLECENIE PAWŁA: kompletna rozbudowa serwisu z `.seo-przeglad/pakiety/` (8 pakietów,
443 kB gotowej treści). Istniejące sekcje ruszamy WYŁĄCZNIE merytorycznie, układ,
komponenty i design zostają nietknięte. Nowe podstrony przez skill /design, praca
rozdzielana przez Workflows.

Legenda: NIERUSZONE / W TOKU / CLAIMED-UNVERIFIED / DONE (tylko z dowodem).

## ETAP 0 — cztery błędy w istniejącym serwisie (przed pakietami)

0.1 Sprzeczność liczby draftów. STAN: CLAIMED-UNVERIFIED (build i przeglądarka
    jeszcze nie potwierdzone). Serwis mówił JEDNOCZEŚNIE „75% maili wymaga drobnej
    korekty" i „80% draftów gotowych do wysyłki" o TEJ SAMEJ realizacji. Paweł
    ustalił 2026-08-31: około 85% draftów pisze AI, idą do klienta od razu albo po
    drobnej poprawce, przy 580 mailach tygodniowo w szczycie.
    ZMIERZONE: 30 miejsc w 21 plikach (mój pierwotny grep dał 18 w 12, był za wąski;
    agent dołożył 8 plików, m.in. bazę wiedzy chatbota, opisy huba realizacji
    i podpis pod CTA poradników). Po zmianie grep na „75%|80% draft|3 na 4" zwraca
    już tylko 2 trafienia i oba są z innej bajki: `top 75%` w GSAP i komentarz
    o wysokości slotu w Hero. Em-dash w dodanych liniach tych 21 plików: ZERO.
0.2 KalkulatorOszczednosci startował z osoby 5 / godziny 6 / stawka 60 zł, czyli
    łamał zasadę zera zmyślonych liczb. STAN: CLAIMED-UNVERIFIED (agent skończył,
    ja jeszcze nie oglądałem tego w przeglądarce sam).
    ZMIERZONE PRZEZ AGENTA: tsc 0, build 64/64, 21 prób brzegowych na 3 polach bez
    ani jednego NaN / Infinity / „0 zł"; prerender SSG nie zawiera już żadnej
    domyślnej kwoty. Procent automatyzacji też uznany za daną klienta (żaden preset
    nie jest wciśnięty na starcie, przy etykiecie stoi „wybierz"). PolePrzewodnik
    dostał `value: number | null` plus propy `onClear` i `wymagane`, wstecznie
    zgodnie. MÓJ FAŁSZYWY ALARM: zgłosiłem 4 em-dash w tym pliku, po sprawdzeniu
    wszystkie siedzą w komentarzach JSX, nie w tekście dla klienta. Nic do poprawy.
0.2b DRUGI kalkulator (KalkulatorProcesu) miał tę samą wadę: razyTydzien 20,
    minut 10, osoby 1, stawka 60 zł, proc 60%. STAN: CLAIMED-UNVERIFIED (agent
    skończył, ja jeszcze nie oglądałem sam). ZMIERZONE PRZEZ AGENTA: tsc 0,
    build 0, lint 0; komplet 20 razy / 10 min / 1 os. / 60 zł / 80% daje 8314 zł,
    173 h rocznie, 693 zł miesięcznie, zwrot po 41,0 mc, i wszystko zgadza się
    z ręcznym rachunkiem co do złotówki. Regresja KalkulatorOszczednosci na tej
    samej stronie przeszła. PolePrzewodnik NIE był ruszany, nowe propy wystarczyły.
    DECYZJA PAWŁA 2026-08-31: procent automatyzacji zostaje PUSTY w obu
    kalkulatorach, nie wraca do 60%.
0.2c BŁĄD LICZNIKA, znaleziony przy okazji i NAPRAWIONY (components/motion/
    AnimatedMetric.tsx). Wzorzec `-?\d+(?:[.,]\d+)?` łapał z „19 953 zł" samo „19",
    a resztę brał za sufiks, więc przez około 1,2 s po wyliczeniu w miejscu wyniku
    migały KWOTY, KTÓRYCH NIKT NIE POLICZYŁ („1 953 zł", „6 953 zł", w jednym
    przebiegu nawet ujemna). To łamało zasadę zera zmyślonych liczb mocniej niż
    domyślne wartości pól. NAPRAWA: wzorzec obejmuje grupy tysięcy rozdzielone
    spacją, NBSP i NNBSP, a separatory lecą przed parseFloat. Grupa wymaga
    DOKŁADNIE trzech cyfr, więc „140 h" i „7 dni" nadal dopasowują samą liczbę.
    ZMIERZONE: 11 na 11 przypadków, klatki dla 19 953 zł idą teraz
    0 zł, 9977 zł, 14 965 zł, ..., 19 953 zł, bez fałszywej kwoty.
    PRZY OKAZJI naprawione: metryka „1 000 rekordów" (leady B2B) miała ten sam błąd.
    Test: scratchpad/test-parser.mjs, ALARMÓW 0.
0.3 Nazwa klienta „ZB Bielizsy" wygląda na zapis ze słuchu. STAN: PYTANIE DO PAWŁA.
    Nie blokuje, w pakietach klient jest opisany bezosobowo.
0.4 Ceny stron WWW (1590 / 2900 / od 5900 zł) nie są w lib/uslugi/strony-www.ts.
    STAN: NIERUSZONE, wchodzi z pakietem 6.

## MÓJ BŁĄD W TYM PRZEBIEGU (do wiadomości przy wznowieniu)

Nadpisałem ten plik nową treścią, nie sprawdziwszy najpierw, że istnieje i ma
1041 linii historii. Odzyskane z HEAD, `git diff` na STATUS.md czysty, nic nie
przepadło. Wniosek na przyszłość: STATUS.md jest dziennikiem narastającym,
nowy etap dopisuje się NA GÓRZE nad separatorem, nigdy nie zastępuje całości.

## ROZBIEŻNOŚCI PAKIETÓW WOBEC REALNEGO KODU (zmierzone, nie założone)

Pakiety deklarują 53 podstrony. Po sprawdzeniu wobec kodu: 50 unikalnych.

- KOLIZJA 1 (2 sztuki): `/uslugi/automatyzacje/obsluga-maili` i
  `/uslugi/automatyzacje/raporty-sprzedazowe` stoją JEDNOCZEŚNIE w automatyzacje.md
  i w wdrozenia.md. Dwa pliki nie zajmą jednego adresu.
  DECYZJA: wersja z pakietu tematycznego wygrywa, treść z wdrozenia.md wchodzi jako
  materiał do wzbogacenia tej pierwszej. Bez duplikatu.
- KOLIZJA 2 (1 sztuka): wdrozenia.md chce `/uslugi/automatyzacje/ofertowanie`,
  automatyzacje.md chce `/uslugi/automatyzacje/ofertowanie-i-kosztorysy`. Ta sama
  intencja pod dwoma adresami = kanibalizacja.
  DECYZJA: jeden adres, `ofertowanie-i-kosztorysy`, treść scalona.
- KOLIZJA 3 (3 sztuki, PYTANIE DO PAWŁA): wdrozenia.md chce `/uslugi/cennik`,
  `/uslugi/wdrozenie-ai-male-firmy`, `/uslugi/wdrozenie-krok-po-kroku`. To płaskie
  slugi, które w tym repo obsługuje trasa `/uslugi/[usluga]` karmiona rejestrem
  USLUGI, a ten napędza też nawigację i hub. Wpisanie ich tam wrzuci trzy pozycje
  do menu jako nowe usługi. Nie blokuje pakietów 1 do 7.
- DO ROZSTRZYGNIĘCIA przy pakietach 4 i 5: `/uslugi/automatyzacje/audyt-ai` obok
  istniejącej usługi `/uslugi/audyt-ai`, oraz `/uslugi/automatyzacje/leady-b2b`
  obok istniejącej `/uslugi/leady-b2b`.

## PAKIET 1 (GEO) — PODSTRONY ZROBIONE I ZMIERZONE, sekcje w toku

OSIEM podstron gałęzi /uslugi/optymalizacja/ stoi: audyt-widocznosci-w-ai (próbka),
chatgpt, dostep-botow-ai, google-ai-overviews, perplexity, monitoring-cytowan-w-ai,
dla-firm-uslugowych, llms-txt.

JAK POWSTAŁY: 7 agentów pisało równolegle, każdy dostał WYŁĄCZNIE swój wycinek
geo.md (żeby nikt nie czytał 60 kB naraz), za każdym szedł kontroler adwersaryjny
z zadaniem ZNALEŹĆ błąd, nie potwierdzić. Rejestr, trasy i build zostały wyjęte
z ich zakresu i zrobione osobno przez integratora, żeby się nie pobili o pliki.

CO ZŁAPAŁA KONTROLA (rzeczy, których sam bym nie zobaczył):
 - ZMYŚLONE ODNIESIENIA CZASOWE: „raport wygląda tak samo jak pół roku temu"
   i „dają mniej wejść niż rok temu". Pakiet nie podaje ŻADNEGO odniesienia
   czasowego do spadku ruchu. Usunięte.
 - KANIBALIZACJA MIERZONA, nie na oko: dwie pary zdań o podobieństwie 0,89 i 0,83
   wobec strony rodzica. Przepisane, fakty bez zmian.
 - KWOTY POZA SEKCJĄ CENY: „1490 zł netto" w karcie „Powiązane", wbrew uwadze
   wdrożeniowej pakietu §6. Wycięte dwa razy, przez dwóch różnych agentów.
 - KWOTY BEZ NETTO: w jednym zdaniu „landing 1590 zł, strona biznesowa 2900 zł,
   zaawansowana od 5900 zł netto" dwie pierwsze kwoty nie miały dopisku.
 - BRAK ZDANIA KONTRAKTOWEGO: na dla-firm-uslugowych 1490 zł padało sześć razy
   i ani razu bez „kwotę odliczamy w całości od ceny wdrożenia", choć w całym
   repo Sprint Diagnostyczny zawsze je niesie.

FAŁSZYWY ALARM KONTROLI (zostawiony świadomie): kontrolerzy uznali zdanie
„Dokładną cenę poznasz na bezpłatnej diagnozie" za nieprawdę na stronach
z płatnym audytem. Nie wiedzieli o odpowiedzi Pawła z 2026-08-31: bezpłatna
rozmowa ZAWSZE jest pierwsza, także przed płatnym audytem. Zdanie jest prawdziwe.

ZMIERZONE PO INTEGRACJI (build lokalny, przeglądarka Chrome):
 - strony 59 -> 66, przyrost DOKŁADNIE 7,
 - wszystkie 8 podstron 200, po jednym h1, zero błędów konsoli, brak poziomego
   przewijania,
 - kolorowy człon H1 na wszystkich ośmiu, sprawdzony PROGRAMOWO (h1.endsWith),
   nie na oko,
 - 18 unikalnych celów linków wewnętrznych, WSZYSTKIE 200, zero martwych,
 - linki redakcyjne między siostrami: 8 -> 19,
 - zero em-dash i zero frazy „wirtualna recepcjonistka" na wszystkich ośmiu,
 - zero kwot w kartach „Powiązane" (grep po wyrenderowanym HTML),
 - sitemap: 9 adresów gałęzi (rodzic + 8),
 - REGRESJA: /uslugi, /uslugi/optymalizacja, /uslugi/audyt-ai, /uslugi/chatboty,
   /uslugi/voiceboty/windykacja nadal 200 z tym samym H1,
 - tsc 0, build 0, lint 0.

W TOKU: 13 sekcji N1 do N13 do lib/uslugi/optymalizacja.ts, trzy przebiegi po
kolei plus kontrola adwersaryjna całego pliku.

## USTALENIE: REPO NIE JEST PRETTIER-CLEAN

Sprawdzone: zacommitowane `lib/uslugi/podstrony/windykacja.ts` i
`lib/uslugi/voiceboty.ts` NIE przechodzą `prettier --single-quote --print-width 100
--check`. Wniosek: NIE puszczać prettiera hurtem na nowe pliki, bo odróżni je
od pliku, który był dla nich wzorcem, i zrobi szeroki diff formatowania zamiast
zmiany merytorycznej. Formatować tylko pliki, które i tak się edytuje.

## PAKIET 1 — ZACOMMITOWANY LOKALNIE, NIE WYPCHNIETY

790f60a fix(seo-etap0): 29 plikow, +579/-330
58082f2 feat(pakiet-1-geo): 15 plikow, +6217/-54
Rozdzielone celowo, zeby dalo sie cofnac rozbudowe bez cofania poprawek.
NIE wypchniete na produkcje. Czeka na slowo Pawla.

## PAKIET 2 (CHATBOTY) — ZROBIONY I ZMIERZONY, zacommitowany lokalnie

2050897 feat(pakiet-2-chatboty): 39 plików, +6578/-122. NIE wypchnięty.

OSIEM podstron /uslugi/chatboty/: cennik, obsluga-klienta, baza-wiedzy,
sklep-internetowy, generowanie-leadow, whatsapp-messenger, asystent-wewnetrzny,
hotele-pensjonaty. Plus 11 sekcji do lib/uslugi/chatboty.ts.

ZMIERZONE: 9 adresów gałęzi 200, po jednym h1, kolorowy człon H1 na każdym;
121 sprawdzeń linków wewnętrznych, WSZYSTKIE 200, zero martwych; zero poziomego
przewijania na 1440 i 390 px; zero błędów konsoli; zero em-dash w CAŁYM źródle
(DOM, atrybuty, aria-label, JSON-LD); zero „Slack", „Microsoft Teams"
i „wirtualna recepcjonistka"; wszystkie w sitemap; REGRESJA 10 tras spoza
pakietu nadal 200; strony 72 do 80, przyrost dokładnie 8; tsc 0, build 0.

### CO DAŁA NOWA WARSTWA: KRYTYK KOMPLETNOŚCI

Kontrolerzy sprawdzają SWOJĄ stronę i nie widzą całości. Dodany krytyk zobaczył:
 - KANIBALIZACJĘ RODZICA Z WŁASNĄ PODSTRONĄ, podobieństwo 1,0: FAQ nr 1 rodzica
   brzmiało dosłownie jak fraza główna podstrony cennika i niosło tę samą
   drabinę progów (9 z 12 komórek identycznych). Dwa adresy walczyły o to samo
   zapytanie i wysyłały ten sam FAQPage.
 - HOTELE Z ZEREM LINKÓW PRZYCHODZĄCYCH przy cenniku z siedmioma.
 - GÓRNY PRÓG 15000 ZŁ W SZEŚCIU ZAPISACH, w tym w siedmiu hubach FAQ,
   w poradniku i w BAZIE WIEDZY CHATBOTA (bot mówiłby inaczej niż strona).

### ZŁAPANE ZANIM ZABOLAŁO

Plik nazywał się `cennik.ts`, a pakiety voicebotów, automatyzacji i stron WWW
KAŻDY planuje własny /cennik: cztery pliki o tej samej nazwie. Zmieniony na
`chatboty-cennik.ts`, `slug` został `cennik`, adres bez zmian.
TO SAMO ZROBIĆ przy każdym kolejnym cenniku z następnych pakietów.

### EM-DASH POZA TREŚCIĄ WIDOCZNĄ (dotyczyło całego serwisu)

Wszystkie wcześniejsze kontrole sprawdzały widoczny tekst. Znaleziono go w:
`aria-label` logo, opisie Organization w JSON-LD (czytają Google i modele AI),
wypełniaczu tabeli magnesu oraz w PRAWDZIWYM cytacie klienta na stronie głównej
(ONYX). W cytacie zmieniona WYŁĄCZNIE interpunkcja, słowa te same.

### SŁOWNICTWO

„utrzymanie" wygrało z „opieka" dla 99-599 zł, bo „Opieka AI" to OSOBNA usługa
z własnym cennikiem (3000/5500/10000 zł). Najniższy próg miał PIĘĆ nazw,
został „próg prosty".

### ŚWIADOMY WYJĄTEK

whatsapp-messenger ma minPrice 3000 („od 3000 zł, próg średni"), bo ta strona
wycenia DOŁOŻENIE KANAŁU do gotowego bota, nie wdrożenie od zera.

## PAKIET 2 — DANE ARCHIWALNE (mapa pliku)

Plik `.seo-przeglad/pakiety/chatboty.md` (846 linii).
Sekcje 1 do 11: linie 34 do 465. Podstrony: linie 466 do 821. Uwagi: 822 do końca.
 P1 cennik 472 | P2 obsluga-klienta 531 | P3 baza-wiedzy 589 | P4 sklep-internetowy 648
 P5 generowanie-leadow 676 | P6 whatsapp-messenger 704 | P7 asystent-wewnetrzny 763
 P8 hotele-pensjonaty 793

DO ZROBIENIA PRZED PAKIETEM 2 (inaczej podstrony nie powstaną):
 1. założyć katalog trasy `app/uslugi/chatboty/[podstrona]/page.tsx` na wzór
    optymalizacji (voicebotowy wzorzec ma 4 ostrzeżenia lintu o nieużywanych
    importach, więc kopiować z optymalizacji, nie z voicebotów),
 2. dopisać `chatboty: 'Chatboty'` do ETYKIETA_RODZICA w
    `lib/uslugi/podstrony/okruszki.ts` (etykieta 1:1 z KATEGORIA_LABEL, zero
    nowego stringu marki),
 3. wpisy w H1_KOLOR i KAFEL_CENY dla ośmiu nowych slugów.

## ETAPY 1 do 8 — pakiety (kolejność z 00-INDEKS.md)

1. GEO / optymalizacja      13 sekcji,  8 podstron  — W TOKU (próbka P1)
2. Chatboty                 11 sekcji,  8 podstron  — NIERUSZONE
3. Voiceboty                11 sekcji,  6 podstron  — NIERUSZONE
4. Automatyzacje            11 sekcji,  8 podstron  — NIERUSZONE
5. Audyt AI                 11 sekcji,  6 podstron  — NIERUSZONE
6. Strony WWW               12 sekcji,  5 podstron  — NIERUSZONE
7. Faktury i KSeF           11 sekcji,  5 podstron  — NIERUSZONE
8. Wdrożenia AI              9 sekcji,  4 unikalne  — NIERUSZONE

POTWIERDZONE W KODZIE: wszystkich 7 rodziców istnieje w rejestrze lib/uslugi/.
Mechanizm podstron (lib/uslugi/podstrony/) działa, dziś niesie 3 podstrony
voicebotów. Katalog `app/uslugi/voiceboty/` NIE ma własnego page.tsx, a
`/uslugi/voiceboty` i tak zwraca 200 na produkcji, bo Next spada do trasy
`[usluga]`. Ten sam wzorzec działa dla pozostałych rodziców.

BRAMKA AKCEPTACJI: przy 50 podstronach zła forma = 50 złych plików, więc najpierw
powstaje JEDNA kompletna podstrona (/uslugi/optymalizacja/audyt-widocznosci-w-ai)
ze zrzutem ekranu. Reszta rusza dopiero po akceptacji Pawła.

DECYZJA O /design: pipeline domyślnie każe odpalić panel trzech kierunków
wizualnych. POMINIĘTY ŚWIADOMIE, bo przy poleceniu „design zostaje nietknięty"
panel wypracowałby trzy NOWE kierunki, czyli dokładnie to, co rozwaliłoby
spójność. Reguła 7 samego pipeline'u: wzorzec bije kierunek, a wzorcem jest tu
istniejący serwis. `impeccable` zostaje na końcu jako audytor zgodności.

## DECYZJE PAWŁA Z 2026-08-31 (obowiązujące, nie renegocjować)

1. metaTitle podstron: konwencja repo 50 do 60 znaków WYGRYWA z krótkim metaTitle
   z pakietu. Fraza główna zostaje na początku, wyróżnik wyłącznie z faktów,
   które są na tej stronie. Dotyczy wszystkich 50 podstron.
2. Kalkulatory: procent automatyzacji zostaje PUSTY, nie wraca do 60%.
3. Zakres: robimy PAKIETY 1 i 2 (GEO plus Chatboty), potem pomiar, potem decyzja
   o reszcie. Zgodnie z radą z 00-INDEKS.md.
4. Audyt AI za 1490 zł: cena STAŁA, każdy płaci tyle samo, bez słowa „od".
5. Bezpłatna rozmowa jest ZAWSZE pierwsza, także przed płatnym audytem. Więc
   nagłówek „Zacznij od bezpłatnej diagnozy" w ServiceCTA jest PRAWDZIWY
   i ZOSTAJE. Moja pierwsza analiza była tu błędna.
6. Przy chatbotach, voicebotach i automatyzacjach ceny SĄ widełkami, więc zdanie
   o widełkach startowych jest tam prawdziwe i NIE RUSZAMY go. Poprawiamy je
   wyłącznie tam, gdzie cena jest stała (mechanizm: nowa flaga ramaCeny.cenaStala).

## PRÓBKA (bramka akceptacji) — ZROBIONA

/uslugi/optymalizacja/audyt-widocznosci-w-ai. ZMIERZONE: tsc czysto; build 58 do
59 plików html i 61 do 62 tras, czyli dokładnie plus jedna; adres 200; rodzic
/uslugi/optymalizacja nadal 200; /uslugi/voiceboty/windykacja nadal 200; dokładnie
jeden h1; zero błędów konsoli; brak poziomego przewijania na 1440 i 375 px; adres
w sitemap z lastmod 2026-08-31; 6 linków wewnętrznych, wszystkie 200; JSON-LD
FAQPage 8 pytań, Service z offers, BreadcrumbList; zero em-dash w widocznym
tekście; zero frazy „wirtualna recepcjonistka".

POPRAWIONE PO ZRZUCIE (dociągnięcie do istniejących wzorców, nie zmiana designu):
- H1_KOLOR dostał wpis dla tego sluga, bo bez niego H1 świecił w całości szarym
  i podstrona czytała się jak inna rodzina stron (ten sam problem naprawiono
  wcześniej dla podstron voicebotów, komentarz v20 w ServiceHero).
- KAFEL_CENY dostał wpis z pustym prefiksem, bo fallback doklejał „od " i strona
  obiecywała widełki przy cenie stałej.
- okruszki.ts dostały etykietę „Optymalizacja" (1:1 z KATEGORIA_LABEL), więc
  łańcuch ma 4 poziomy zamiast 3.

## FLAGA `ramaCeny.cenaStala` — ZROBIONA (CLAIMED-UNVERIFIED, ja jeszcze nie oglądałem)

Stała cena udawała widełki w TRZECH miejscach naraz, nie w jednym:
 1. mikrokopia pod kartą ceny (RamaCeny.tsx),
 2. DUŻA kwota na karcie: „od 1490 zł netto" (RamaCeny.tsx, piętro wyżej),
 3. Service JSON-LD dla robotów: PriceSpecification z minPrice i opisem
    „Cena od (zależna od zakresu integracji)", przy audycie bez żadnych integracji.
Trzecie miejsce trzeba było naprawić DWA razy, bo trasa
`app/uslugi/optymalizacja/[podstrona]/page.tsx` składa Service JSON-LD SAMA,
nie przez `uslugaSchemas`.

MECHANIZM: jedno opcjonalne pole `ramaCeny.cenaStala?: boolean`. Brak pola albo
false = widełki, czyli dotychczasowe zachowanie wszystkich. Ustawione TYLKO na
`audyt-ai` i `audyt-widocznosci-w-ai`. Prefiks kafla w ServiceHero wyprowadzony
z tej samej flagi, więc zniknęło drugie źródło prawdy (mapa KAFEL_CENY trzyma
już tylko `opis`).

ZMIERZONE, skan WSZYSTKICH 17 prerenderowanych stron usług:
 - zmienione dokładnie 2 strony (oba audyty): „1490 zł netto" i Offer.price 1490,
 - bez zmian 14 stron z ramą ceny: asystent od 4999, chatboty od 1790, leady
   od 169, opieka od 3000, voiceboty i 3 podstrony od 2500, plus 7 stron bez
   ceny jawnej,
 - zdanie o widełkach stoi nienaruszone tam, gdzie jest prawdziwe.
tsc 0, build 0, lint 0. Odczyty z żywego DOM i z script[type=application/ld+json].

SCHEMA: przy cenie stałej Offer.price (kanoniczne pole schema.org dla jednej
ostatecznej kwoty), przy widełkach bez zmian PriceSpecification z minPrice.
Kwota w JSON-LD i w interfejsie nadal z tego samego `minPrice`.

DŁUG DO SPŁATY (jedna linia, świadomie odłożona przy zajętym repo):
`app/uslugi/voiceboty/[podstrona]/page.tsx` też składa Service JSON-LD ręcznie
i nie przekazuje `cenaStala`. Dziś bez skutku, bo żadna podstrona voicebotów nie
ma tej flagi. ALE pakiet 3 planuje `/uslugi/voiceboty/cennik`, więc DOPISAĆ TĘ
LINIĘ PRZED PAKIETEM 3.

CZEKA NA PAWŁA: pisownia „ZB Bielizsy"; los trzech płaskich adresów z pakietu 8;
czas w dniach roboczych dla AI Start (1990 zł) i pełnego wdrożenia automatyzacji;
koszt etatu do 5 tabel porównawczych.

PUNKT COFNIĘCIA: tag `seo-2026-08-31` na ca6f74b.

---

# STATUS — v24: SEKCJA /PRODUKTY NA PALECIE NEONOWEJ — DO WDROŻENIA

ZARZUTY PAWŁA (2026-08-21) I CO Z NIMI ZROBIONE:

1. „Wcześniej były jako animowane karty podświetlane, a teraz nic się na nich
   nie dzieje." PRZYCZYNA ZNALEZIONA W NASZYM WŁASNYM CSS: karty klocków miały
   wariant .inf-card-quiet, który ma w komentarzu wprost „to jedyny wariant,
   gdzie kolor wchodzi dopiero hoverem", a ramka stała na bieli 4 procent.
   NAPRAWA: wszystkie karty sekcji (8 produktów + 10 klocków) na .inf-card-neon,
   czyli kolor widoczny W SPOCZYNKU, a hover go PODBIJA.

2. „Kolory miały nie być takie same obok siebie." Były trzy kolizje: skaner
   obok KSeF (oba złote), SF AI Team nad apką obecności (oba zielone), kalendarz
   obok centrum (oba cyjanowe). NAPRAWA: 8 produktów = 8 RÓŻNYCH neonów,
   10 klocków = 10 RÓŻNYCH neonów. Skoro żaden się nie powtarza, kolizja jest
   niemożliwa na KAŻDEJ szerokości, nie tylko na tej sprawdzonej.
   Zmierzone na 1440 i 1024 px: KOLIZJE: brak.

3. „Startowe kolory tutaj w ogóle nie istnieją" (pas metryk 8/2/6/10 był szary).
   NAPRAWA: PasekMetryk przyjmuje ton PER KAFEL; cztery liczby w czterech
   barwach, jak pas metryk wzorca /void.

4. „Duży plaster, można by to rozbić na mniejsze kafelki i podsekcje."
   NAPRAWA: „Dla kogo" i „Co daje" dostały własne pudełka w siatce dwóch
   kolumn, z etykietą w kolorze karty. Semantyka bez zmian: nadal dl/dt/dd,
   więc bot czyta parę pytanie-odpowiedź tak jak dotąd.

5. „To powinno być na samej górze, co już zbudowaliśmy (...) i to powinny być
   linki." NAPRAWA: katalog klocków przeniesiony PRZED karty produktów,
   nagłówek „Co już zbudowaliśmy?", a każdy z 10 klocków jest teraz linkiem do
   miejsca, gdzie jest opisany. Wszystkie 8 tras docelowych zwraca 200.

6. „Używamy tylko palety neonowych kolorów." NAPRAWA: paleta zapisana jako
   REGUŁA PROJEKTU w PALETA-NEON.md (28 kolorów, RGB i HEX, zasady użycia)
   plus wpis w pamięci sesji, żeby nie wróciła bladość. Hex wolno wpisać
   wyłącznie w rejestrze lib/inf-kategorie; komponenty biorą kolor przez
   --card-c i nie znają żadnego hexa.

DOWÓD (lokalny build, ALARMÓW 0): kolejność sekcji z klockami na pierwszym
miejscu; 10 klocków, każdy z innym kolorem, każdy z glifem, każdy z żywym
linkiem; błysk zmierzony przez CDP na dwóch kartach — wejście -542px do 759px
i powrót 759px do -542px, oba po około 340 ms; zero martwych linków; zero
przewijania w poziomie; zero błędów konsoli. tsc / build / lint exit 0.

ZAKRES: wyłącznie sekcja /produkty, zgodnie z poleceniem. Reszta serwisu
nietknięta.

CZEKA NA PAWŁA: ocena tej sekcji przed przeniesieniem palety na karty usług,
podstrony i stronę główną.

---

# STATUS — INFINITY v23: JĘZYK PODSTRON — DO WDROŻENIA

ZLECENIE PAWŁA: „nasze podstrony mega od tego odbiegają", podstrony mają
wyglądać jak infinitytechstack.uk (praxis, axiom, vitalis, void, 7 akademii),
„nie ściana tekstu, tylko liczby na górze, potem opis", „kliknięcie z jednej
strony przechodzi do drugiej i rozwija całą sekcję", każdą podstronę traktować
jak stronę główną, główna strona NIETYKALNA.

ROZPOZNANIE (nie wrażenia, pomiar): sonda computed-style + zrzuty desktop
i mobile z 11 podstron wzorca -> ref/*.json, ref/w-*.png.
ODKRYCIE: mieliśmy PODOBNĄ liczbę nagłówków i rozwijanych paneli co wzorzec
(h3: my 14-22, oni 13-38). Różnica siedziała w JĘZYKU WIZUALNYM:
- wzorzec: głowa sekcji (glif + tytuł W KOLORZE + pigułka), pas 3-4 liczb
  w RÓŻNYCH barwach palety, klikalne karty z panelem wybranej, siatki 3-4
  kolumn na ~1200 px,
- my: białe nagłówki w kolumnie 760 px, ~660 px pustych marginesów na 1440 px,
  zero liczb w sekcjach, zero interakcji.

SILNIK (commit 666148c, punkt cofnięcia):
- blok "naglowek" dostał ikona/chip/overline = GŁOWA SEKCJI,
- NOWY "pasMetryk": 2-4 metryki, każda z własnym tonem palety,
- NOWY "przelacznik": radio + :checked, ZERO JavaScriptu. Treść wszystkich
  paneli jest w HTML przy pierwszym żądaniu, więc bot czyta komplet,
  a klawiatura dostaje natywną grupę radio,
- NOWY "siatka": 2-4 kolumny kart,
- "Bloki" dostały prop szerokosc: sekcje usług na 980 px, lead zostaje na
  760 px (tekst ciągły powyżej ~75 znaków w wierszu czyta się gorzej).
Wszystkie pola opcjonalne: poradniki, blog i materiały renderują się 1:1.

PROCES: 108 agentów w dwóch przebiegach, ZERO padniętych.
Runda 1 (88 agentów): 15 zespołów, każdy z INNĄ przypisaną stroną wzorca
(chatboty<-praxis, voiceboty<-void, automatyzacje<-vitalis, rekrutacja<-axiom,
podstrony voicebotów<-akademie), skład: analityk wzorca -> architekt układu ->
copywriter -> walidator adwersaryjny -> poprawki.
Runda 2 (20 agentów): naprawa 22 pozostałych znalezisk + rekontrola.
Ostatnie znalezisko (format overline na podstronie odbierania) poprawione ręcznie.

CO ZŁAPAŁA KONTROLA (przykłady, wszystkie naprawione przed wszyciem):
1. Na stronie chatbotów w pasie liczb stały „580 maili" i „80% draftów" —
   to wynik automatu mailowego Instytutu Kryptografii, NIE chatbota. Model
   cytujący pas wyprodukowałby „chatbot ma 80% odpowiedzi gotowych bez
   poprawek", czyli dowód przypisany do złego produktu.
2. Na automatyzacjach „8 h tygodniowo" u KNF Team stało jako twarda liczba,
   a nasze własne strony realizacji mówią „kilka godz./tydz. (szac.)".
3. W cenniku chatbotów 1790 zł wypadło bez „netto" akurat w nagłówku karty,
   czyli w miejscu o największej cytowalności.
4. Nowa liczba spoza konspektu („pięć minut przed rozmową") na rekrutacji.

WYNIK ZMIERZONY (15 tras, GPTBot bez JS, lokalnie vs produkcja):
- MEDIANA AKAPITU TREŚCI: 134-171 znaków (cel raportu P8: ~150; konkurencja
  cytowana 128-156; my przed rundą struktury: 257). Akapity powyżej 400 znaków
  to już tylko kapsuły hero i odpowiedzi FAQ, czyli miejsca celowo długie.
- SŁOWA W GÓRĘ NA KAŻDEJ TRASIE: chatboty 1763->2534, voiceboty 1892->2356,
  opieka 1447->2014, faktury 1442->2023, strony-www 1287->1835.
- NOWE ELEMENTY: 92 metryki, 41 głów sekcji, 23 przełączniki, 19 siatek.
- H3 wszędzie w górę (np. odbieranie telefonów 17->28).
- INTERAKCJA: kliknięcie w kartę przełącznika otwiera właściwy panel na
  wszystkich sprawdzonych trasach, na 1440 i 390 px.
- Zero em-dash, zero poziomego przewijania, zero błędów konsoli.
- build / typecheck / lint: exit 0.

DECYZJA DESIGNOWA DO WIADOMOŚCI: hook zgłasza "side-tab" (lewa kreska w kolorze
na panelu przełącznika). ZOSTAJE: to chwyt zmierzony u wzorca (panel
„Voice-to-Context" na /praxis) i wariant ".inf-card-edge" obecny w naszym
systemie od v13 na wyraźne życzenie Pawła („inne mają tylko świecący lewy bok").

CZEKA NA PAWŁA: ocena wizualna 15 podstron; badge „MVP" vs „Działa u nas"
przy narzędziach portfolio; tabela 4-kolumnowa w poradniku (suwak czy zwężenie);
case'y dla Y-Ads, Onyx, ZB Bielizsy, Desant.pl, Przystań Jurgen, Waste Return.

---

# STATUS — ODPOWIEDZI PAWŁA 2026-08-20 (wywiad o usługach) — DO WDROŻENIA

Paweł odpowiedział na pytania otwarte z poprzednich rund. Wdrożone 1:1:

1. CZASY VOICEBOTA (zamyka najstarszy BRAK DANEJ): prosty 3-5 dni roboczych,
   z integracjami 5-25 dni roboczych. Weszło na: /uslugi/voiceboty (kapsuła,
   rama ceny, blok zasad, NOWY wiersz tabeli porównawczej), 3 podstrony
   voicebotów, FAQ 7 hubów, bazę wiedzy bota (2 pliki), wiedza-agenta.txt,
   llms.txt (2 miejsca).
2. ASYSTENT PREZESA: cena OBNIŻONA 7999 -> 4999 zł netto (18 wystąpień
   w 7 plikach, po buildzie zero 7999 w całym serwisie). ODCZYT ZWROTNY:
   w wypowiedzi Pawła padło też 6999, ostatnia deklaracja to 4999
   ("niech jest taka kwota") i taka weszła; jedno słowo zmienia.
3. WSZYSTKIE KWOTY NETTO: potwierdzone wprost, komentarze "DO POTWIERDZENIA"
   przy leadach B2B i asystencie już bez znaczenia (zostają jako historia).
4. REALIZACJE: 6 anonimowych case przypisane przez Pawła: auto-podsumowania
   spotkań, automatyczne raporty i przechwytywanie rozmów = KNF TEAM;
   firmowi agenci 24/7, automat treści social i generator leadów =
   WDROŻENIA WŁASNE (etykieta "SimpleFast.ai (wdrożenie własne)").
   Zero "Klient (anonimowo)" w serwisie; FAQ na /realizacje przepisane
   ("Skąd wiem, że te wdrożenia są prawdziwe?"), bo stara odpowiedź mówiła
   o anonimowych case'ach, których już nie ma.
   WAŻNE: Y-Ads, Onyx, ZB Bielizsy, Desant.pl, Przystań Jurgen, Waste Return
   NIE mają jeszcze case'ów na stronie - to nowe case'y do napisania (etap
   przyszły), nie podmiana nazw.
5. SF AI TEAM: właściwa nazwa dawnego "Drugiego mózgu" (usługa wg Pawła:
   agenci głosowi z wiedzą o firmie, komunikują się ze sobą niezależnie,
   tworzysz ich dowolnie). Na razie karta portfolio /produkty (nazwa robocza,
   opis, nawigacja, baza wiedzy bota); slug bez zmian. Gdy będzie cennik,
   kandydat na stronę usługi.
6. NARZĘDZIA PORTFOLIO: "Cena na zapytanie" dopisana do 4 nowych kart.
   To ZREALIZOWANE projekty (słowa Pawła), badge "MVP" zostaje do osobnej
   decyzji, których przełączyć na "Działa u nas".
7. OPIEKA AI: nowy framing Pawła na stronie: "outsourcing działu AI, jak
   księgowość w biurze rachunkowym".
8. ROZDZIELENIE USŁUG POTWIERDZONE: automatyzacje = jedna usługa (AI Start
   1990 jako wejście -> proces 3000-10000 -> opieka), co innego niż chatbot.

DOWÓD: 21/21 kontroli mechanicznych na lokalnym buildzie (zero 7999, czasy
na 5 trasach, KNF Team x6, wdrożenia własne x6, SF AI Team x7, cena na
zapytanie x8, outsourcing działu AI, hub FAQ z czasami). tsc/build exit 0.
Daty: dataAktualizacji 2026-08-20 na 7 zmienionych rejestrach, nowa stała
ODPOWIEDZI_2026_08_20 dla 8 hubów w mapie witryny.

CZEKA NA PAWŁA (zostało tylko to):
- które narzędzia portfolio przełączyć z "MVP" na "Działa u nas",
- decyzja o tabeli 4-kolumnowej w poradniku (suwak czy zwężenie),
- w przyszłości: case'y dla Y-Ads, Onyx, ZB Bielizsy, Desant.pl, Przystań
  Jurgen, Waste Return (liczby są w audycie §7) i cennik SF AI Team.

---

# STATUS — RUNDA STRUKTURY TREŚCI (zespoły 4-osobowe) — DO WDROŻENIA

ZLECENIE PAWŁA: ściany tekstu na strukturę, praca zespołowa (copywriter,
walidator z konspektem firmy, badacz SEO od słów kluczowych, architekt
struktury), design ogólny nietykalny, podstrony mogą rosnąć w stylu INFINITY,
cel: „każda podstrona jakby była usługą, najlepszą, jaką można wygooglować".

ODPOWIEDŹ NA PYTANIE PAWŁA (czy ściany są ok wg raportów): NIE. Raport
konkurencji P8: mediana akapitu u cytowanej konkurencji 128-156 znaków, u nas
257; „każdy akapit ma być zamkniętą myślą". Ale zasada audytu nr 5 zakazuje
skracania. Więc: ta sama treść, więcej struktury, zero cięcia faktów.

PROCES: 104 agentów w jednym przebiegu, zero padniętych.
1. Badacz SEO: mapa słów z REALNYCH danych (Search Console: 68 zapytań, w tym
   33 z zerowym CTR = 580 straconych wyświetleń; raport konkurencji; audyt).
2. Konspekt faktów (biblia walidatora): cennik, 11 klientów z liczbami,
   tone of voice, 10 twardych zakazów, inwarianty kodu.
3. 18 zespołów (12 usług + 3 podstrony voicebotów + 3 poradniki cenowe):
   architekt struktury -> copywriter -> [walidator SEO || adwersaryjny
   walidator faktów] -> poprawki -> ponowna kontrola faktów.
4. Integrator deterministyczny (własna mechaniczna walidacja: kształty bloków,
   zakazy, progi słów, frazy-kontrakty z kodem hero) + emiter TS.

SILNIK (nowe, jeden render w całym serwisie):
- Usluga.problem/rozwiazanie/ramaCeny dostały opcjonalne bloki?: Blok[]
  (słownik poradników: sekcja/kafle/kroki/tabela/lista), renderowane przez
  wyodrębnione <Bloki> z PostBody, w tonie kategorii, nagłówki H3 pod H2
  sekcji (hierarchia bez przeskoków, mierzona: 0 przeskoków na 4 próbkach).
- PostBody bez zmiany DOM (poradniki/blog/materiały renderują się jak dotąd).

WYNIK ZMIERZONY (lokalnie vs produkcja, GPTBot bez JS, 18 tras):
- ściany (% tekstu w akapitach >400 zn): chatboty 36->12, voiceboty 29->7,
  opieka 58->23, audyt 45->8, asystent 49->8, poradnik chatbotowy 61->22,
  automatyzacje/leady/strony-www/windykacja/potwierdzanie -> 0.
- mediana akapitu: z 204-326 do 155-209 na większości tras.
- SŁOWA WSZĘDZIE W GÓRĘ (zakaz skracania dotrzymany): np. chatboty 1204->1763,
  strony-www 878->1287, poradnik automatyzacji 1666->2094.
- każda strona usługi ma teraz 2 tabele (progi cen z podpisem-zasadą liczenia
  czasu + tabela porównawcza) i nagłówki-pytania z realnych zapytań.
- em-dash: 0. Kontrola integracji: 18/18 stron ma KAŻDY string zespołów
  w wyrenderowanym HTML. Kolory kart: nowe bloki = kolor kategorii 1:1,
  karty w innych kolorach są identyczne z produkcją (kroki, linki krzyżowe).
- design nietkniętych sekcji: h1/kafle hero/FAQ/tabela porównawcza computed
  1:1 z produkcją na 1440 i 390 px, zero poziomego przewijania, zero błędów
  konsoli. Build/tsc/lint exit 0 (4 ostrzeżenia sprzed rundy).

ZNALEZISKA KONTROLI DOMKNIĘTE PRZED COMMITEM: 2 ubytki faktów na chatbotach
(zdolność Agenta „umawia i zapisuje w kalendarzu", „scenariusze głosowe" jako
trzeci powód droższej opieki voicebota) — przywrócone słowami z pliku
źródłowego. 25 drobnych znalezisk kosmetycznych odnotowanych, nie blokują.

ŚWIADOME DECYZJE:
- kapsuły hero i leady poradników (bloki krótkiej odpowiedzi 450-790 zn)
  ZOSTAJĄ długie: audyt każe nieść 4 wielkości w jednym akapicie do wycięcia.
- home, FAQ, tabele porównawcze, kapsuły, meta: NIETKNIĘTE (inwariant rundy).
- daty aktualizacji zbite na 2026-08-19 w 18 rejestrach (mapa witryny mówi
  prawdę o dzisiejszej przebudowie).

CZEKA NA PAWŁA (bez zmian z poprzednich rund): czas wdrożenia voicebota
w dniach; netto przy 169/699/1390/7999/199; ceny i dojrzałość narzędzi z §8;
przypisanie 6 anonimowych case do nazwanych klientów; decyzja o tabeli
4-kolumnowej w poradniku (przewija się wewnątrz ramki na desktopie).

---

# STATUS — SEO etap 3 (audyt 2026-08-18) — DO WDROŻENIA

ZLECENIE: etap 3 audytu, czyli nowe adresy pod treści, których na stronie
w ogóle nie było. Etapy 1 i 2 poszły na produkcję commitem 1736293.

CO WESZŁO:
1. /uslugi/leady-b2b (audyt §4 i §6.9). Ceny netto za paczkę rekordów:
   1000 = 169 zł (0,169 zł/rekord), 5000 = 699 zł (0,140), 10000 = 1390 zł
   (0,139). Czas: 20-30 minut na 1000 rekordów po naszej stronie wobec około
   3 minut ręcznie na JEDEN rekord, czyli około 50 godzin na 1000 i 250 godzin
   na 5000. Zakres: publiczne wizytówki Google Maps. Ograniczenie „wyłącznie
   dla firm sprzedających B2B" stoi WPROST w czterech miejscach strony, bo
   audyt każe odfiltrować złe zapytania.
2. /uslugi/asystent-prezesa (audyt §5). Stworzenie 7999 zł netto, budowa 5-10
   dni roboczych, serwery 199 zł netto miesięcznie, zużycie według cennika API
   modeli po stronie klienta. Model rozliczenia identyczny jak przy voicebotach,
   bota przekazujemy klientowi.
3. /produkty: cztery nowe karty narzędzi portfolio (audyt §8), pisane
   BEZOSOBOWO („mamy w portfolio zbudowane takie narzędzie"), zgodnie
   z instrukcją redakcyjną Pawła: zestawienie KSeF z bankiem, kampanie
   i social media, głosowy agent z wiedzą o firmie, kalendarz gabinetu.
   Piąte narzędzie z audytu (apka dla klubów sportowych) NIE zostało dodane,
   bo stoi już na stronie jako apka-obecnosci-skladek i byłby to duplikat.

DOWÓD (pomiar lokalnie vs produkcja, 1440 i 390 px, ALARMÓW: 0):
- nowe trasy 200, 12659 i 13166 znaków dla bota, po 6 pytań FAQ w H3,
  po 10 bloków JSON-LD; obie w mapie witryny i linkowane z huba,
- /produkty urosło z 14946 do 21045 znaków, 4 z 4 nowych kotwic obecne,
  tabela orientacyjna ma teraz 8 wierszy produktów,
- 37 linków na nowych trasach, ZERO martwych,
- istniejące strony: pytanie FAQ i kafle hero co do piksela jak na produkcji,
  zero przewijania w poziomie,
- build / typecheck / lint: exit 0 (5 ostrzeżeń sprzed rundy).

NACZYNIA POŁĄCZONE (co jeszcze musiało się zmienić, żeby nic nie zostało w tyle):
rejestr USLUGI i PRODUKTY, rejestr kolorów INF_KATEGORIA i INF_PRODUKT (bez tego
nowa strona świeci domyślnym cyjanem, czyli kolorem rodziny chatbotów), klastry
na hubie /uslugi, dropdowny nawigacji, liczby w treści („dwanaście usług"),
baza wiedzy bota (api/_knowledge.mjs, lib/agent/knowledge.ts), pliki dla modeli
(public/llms.txt, public/wiedza-agenta.txt) i daty w mapie witryny dla 11 tras
statycznych, które ta runda realnie zmieniła.

CZEKA NA PAWŁA (pytania, nie zgadywanie):
1. NETTO przy nowych kwotach. Audyt §4 i §5 nie zapisuje wprost, czy 169 / 699 /
   1390 / 7999 / 199 zł są netto. Reszta cennika jest netto i komponent karty
   cennika dokleja to słowo automatycznie, więc strony są spójne: netto wszędzie.
   Jedno słowo potwierdzenia zamyka temat, a gdyby kwoty były brutto, poprawka
   to usunięcie etykiety.
2. CENY NARZĘDZI z §8. Audyt każe podać przy każdym „jaki problem rozwiązuje
   i ile kosztuje", ale sam nie zawiera ani jednej kwoty. Karty mówią dziś
   prawdę: zakres i wycena po bezpłatnej diagnozie.
3. DOJRZAŁOŚĆ tych narzędzi. Wszystkie dostały ostrożniejszy badge „MVP
   (działa rdzeń)", bo audyt nie mówi, które są dojrzałe.
4. REALIZACJE, 11 NAZWANYCH KLIENTÓW (audyt §7, etap 3 pkt 11) — NIE ZROBIONE
   i to jest świadoma decyzja. Strona ma dziś 11 case'ów, ale nazwanych jest
   pięć (Instytut Kryptografii dwa razy, Lenart Motors, Fichtelgebirgshaus,
   Trockenhaus). Pozostałe sześć jest anonimowych, a audyt wymienia siedmiu
   klientów, których na stronie nie widać z nazwy: Y-Ads, Onyx, KNF Team,
   ZB Bielizsy, Desant.pl, Przystań Jurgen, Waste Return. Żeby to domknąć,
   muszę wiedzieć, KTÓRY anonimowy case należy do KTÓREGO klienta. Przypisanie
   nazwy prawdziwej firmy na podstawie podobieństwa opisu to zgadywanie na
   cudzym nazwisku i tego nie zrobię bez Twojej listy.
5. CZAS WDROŻENIA VOICEBOTA w dniach roboczych (nadal brak, z etapu 1).
6. Tabela 4-kolumnowa w poradniku o chatbocie przewija się w poziomie wewnątrz
   ramki na desktopie (736 px w kolumnie 694 px). Zostawiamy czy zwężam próg
   dla tabel 4-kolumnowych z 46 rem na 42 rem?

NIE COMMITUJĘ (praca sesji SEO, nie mojej): .seo-przeglad/** i tools/*.js.

---

# STATUS — SEO etap 1 + 2 (audyt 2026-08-18) — DO WDROŻENIA

ZLECENIE PAWŁA: sesja wdrożeniowa audytu SEO. Etap 1 = domknięcie luki
cytowalności (drabina trzech progów z czasami, blok krótkiej odpowiedzi,
netto, case Instytutu Kryptografii, FAQ jako widoczne nagłówki), etap 2 =
uzbrojenie strony GEO w dowody. Zakazy: zero zmian designu, zero zmyślonych
liczb, bez skracania stron, bez em-dash, commit tylko własnych plików.

PROCES: 4 partie (usługi / poradniki / wiedza-agenta / GEO) + kontrola
adwersaryjna. Kontrola dała NO-SHIP z 1 blokerem i 5 majorami. Wszystkie
domknięte w sesji głównej przed commitem (31 podmian treści + 7 rendererów FAQ).

CO ZNALAZŁA KONTROLA I CO Z TYM ZROBIONE:
1. BLOKER: 990 zł jako cena chatbota jechało dalej na 7 hubach w widocznym FAQ
   i w FAQPage JSON-LD; /usługi przeczyło samo sobie na jednym ekranie (tabela
   „od 1790 zł" vs FAQ „chatbot od 990 zł"). Naprawione: 990 zł jako cena
   chatbota = ZERO wystąpień w całym serwisie (pomiar: 22 trasy, regex bez
   trafień na 1990 zł; produkcja ma dziś 45 wystąpień na samym poradniku).
2. MAJOR: najbardziej eksponowana kwota szła bez „netto". Karta cennika
   (RamaCeny) renderuje teraz „od 1790 zł netto". Pomiar: akapit ma
   630x46 px na 1440 i 269x37 px na 390 — CO DO PIKSELA jak na produkcji,
   bez zawijania wiersza.
3. MAJOR: opieka 99-599 zł podawana jako jedyny model dla WSZYSTKIEGO. Teraz
   9 hubów, home (Oferta + faqData) i 2 poradniki rozróżniają: przekazanie
   infrastruktury = 0 zł, opieka u nas = 99-599 zł netto (chatboty,
   automatyzacje) albo 299-1500 zł netto (voiceboty).
4. MAJOR: poradniki mówiły „opieka dołączona do KAŻDEGO wdrożenia", co kasowało
   drugi model rozliczenia. 9 zdań przepisanych.
5. MAJOR: punkt 6 etapu 1 (pytania FAQ jako widoczne nagłówki) nie zrobiła żadna
   partia. Zrobione: 7 rendererów FAQ, <span> -> <h3>. Pokrycie: 22 trasy,
   wszystkie <summary> mają <h3> poza jednym („Jak to liczę?" w kalkulatorze,
   to nie jest pytanie FAQ). Kolejność nagłówków bez przeskoków.

DOWÓD, ŻE DESIGN STOI (Chrome, lokalnie vs produkcja, 1440 i 390 px):
- pytanie FAQ: computed style i geometria ZERO RÓŻNIC na 5 trasach x 2
  szerokości, w spoczynku i po rozwinięciu (Inter 18px/600, #e4e4f0,
  text-wrap: wrap, akcent #00f0ff po otwarciu, wysokość summary 62 px).
  H3 dostał komplet nadpisań, bo baza CSS przestawiłaby naglówek na Jakartę,
  wagę 800, kolor #f2f4fb i text-wrap: balance.
- /uslugi/audyt-ai: kafle hero co do piksela jak produkcja (194/158/187 px).
- strona nie przewija się w poziomie na żadnej mierzonej trasie.

ZMIANY GEOMETRII, KTÓRE SĄ SKUTKIEM TREŚCI, NIE STYLU (zgłaszam, nie ukrywam):
- /uslugi/chatboty kafel ceny: 201 -> 218 px na 1440, a na 390 wiersz kafli
  129 -> 157 px. Powód: „od 1790 zł" jest o znak dłuższe niż „od 990 zł" i na
  telefonie łamie się na dwie linie. Kontrola negatywna: audyt-ai (cena bez
  zmian) ma kafle identyczne.
- /realizacje kafle: 129 -> 130 px na 390 (licznik 8 -> 11 wdrożeń).
- tabela kosztów w poradniku o chatbocie ma 4 kolumnę „Czas wdrożenia"
  (wymóg audytu §1), przez co ma 736 px w kolumnie 694 px i przewija się
  w poziomie WEWNĄTRZ ramki na desktopie. Produkcja tego nie robi, bo ma 3
  kolumny. PYTANIE DO PAWŁA: zostawiamy przewijanie, czy zwężam próg dla
  tabel 4-kolumnowych z 46 rem na 42 rem (zmieści się bez przewijania).

COFNIĘTE ŚWIADOMIE: kafel ceny w hero miał dostać „netto" w podpisie, ale
pomiar pokazał kafel szerszy o 17-50 px i wiersz wyższy o 44 px na telefonie.
To zmiana wyglądu, więc ServiceHero.tsx wrócił do stanu z HEAD. Kwota netto
stoi w karcie cennika, tabeli, FAQ, leadzie i opisie meta.

CZEKA NA PAWŁA:
- CZAS WDROŻENIA VOICEBOTA w dniach roboczych. Audyt podaje czasy dla
  chatbotów i audytu AI, dla voicebotów NIE. Partia odmówiła zmyślenia liczby
  i słusznie. Do czasu odpowiedzi /uslugi/voiceboty mówi tylko zasadę liczenia.
- decyzja o tabeli 4-kolumnowej (wyżej).
- decyzja o „netto" przy kafelku ceny w hero (wyżej).

NIERUSZONE: etap 3 audytu, czyli nowe adresy /uslugi/leady-b2b
i /uslugi/asystent-prezesa, rozbudowa /realizacje do 11 nazwanych klientów
i rozbudowa /produkty. Do zrobienia w następnym kroku.

NIE COMMITUJĘ (praca sesji SEO, nie mojej): .seo-przeglad/** i tools/*.js.

---

# STATUS — v22 (2b2c1b4) + dogrywka v22b (d487273) — PRODUKCJA

ZLECENIE PAWŁA: podstrony w języku wzorca (5 podstron infinitytechstack.uk),
więcej ramek, linkowanie ma współgrać, „najważniejsze boty i Google mają to
czytać", core nietykalny.

PROCES: 13 agentów. Runda główna: 3 rozpoznania (wzorzec / nasze podstrony /
linkowanie) -> architekt złożył PLAN-v22.md z kryteriami odbioru -> silnik ->
3 partie treści -> kontrola (SHIP WITH MINORS, 4 kryteria niespełnione, bo
3 trasy wypadły przez lukę w podziale pracy). Dogrywka v22b: 3 agenty na
brakujące trasy + kontrola (NO-SHIP: sitemap i 2 majory) -> fixy sesji głównej.

ZYSK DLA BOTÓW (GPTBot bez JS, 49 tras, 18 metryk): ZERO SPADKÓW.
Blog: karty 1->14-20, H3 0->4, tabela 0->1, linki 2->8-9. Realizacje:
karty 4->11. Materiały: karty 1->10-18. Huby: details 0->5-6, JSON-LD 1->3.
Produkcja po wdrożeniu: /uslugi 11201 znaków (było 7608), /narzedzia 21259
(18229), /kontakt 10534 (5194), blog 13511, materiały 12174 z 6 tabelami.

ODKRYCIE AUDYTU: components/materialy/MaterialBody był 217-liniowym FORKIEM
PostBody, który CELOWO degradował bloki do gołego HTML — stąd 6 materiałów
z jedną kartą i 11 tys. znaków ściany tekstu. Teraz cienkie opakowanie
PostBody: jeden render treści w całym serwisie.

CORE NIETYKALNY (zmierzone): home 29445 = 29445 znaków co do znaku, computed
10 typów elementów zero różnic, 53 karty porównane PO TREŚCI — zero zmian.

NAPRAWIONE W DOGRYWCE (znaleziska własnej kontroli):
1. RYZYKO PRAWNE: „Twoje dane zostają u nas i nie trafiają do nikogo" było
   nieprawdziwe (api/lead POST-uje do Make.com, a polityka prywatności wprost
   opisuje to powierzenie). Zdanie rozszerzono w dogrywce z 1 miejsca do 3,
   w tym do FAQPage JSON-LD. Zamienione na wersję zgodną z faktami; poprawione
   TAKŻE wystąpienie sprzed rundy w DiagnozaForm.
2. „Pod KAŻDYM wynikiem stoi zastrzeżenie" — grep: 2 z 5 narzędzi. Zawężone.
3. Daty w mapie witryny: 15 rejestrów przebudowanych w 2b2c1b4 mówiło Google
   „bez zmian"; 4 trasy statyczne wyrównane do historii repo. Po fixie jedna
   czerwcowa data w mapie i jest prawdziwa (/o-nas).
4. Metryka „61 pytań" pomijała 18 pytań z podstron voicebotów.

LINKI: 68 celów sprawdzonych żądaniem — zero martwych, sieroty domknięte,
sitemap 50 URL. Po wdrożeniu: IndexNow 50 adresów + Bing 12, oba 200.

CZEKA NA PAWŁA: ocena wizualna podstron (blog, realizacje, materiały, huby);
GSC — zgłosić kluczowe adresy po tej przebudowie.
DŁUG: Realizacja nie ma pola dataAktualizacji (wspólna stała dla 8 case'ów);
5 ostrzeżeń lint w app/uslugi/voiceboty/[podstrona]/page.tsx (sprzed rundy).

---

# STATUS — v19 (4980c59) + treści/okruszki (ade91c3) — PRODUKCJA

DESIGN v19: kątowniki dwa tryby (ukryty: 0%/14px -> hover 60%/8px, kreski
wjeżdżają w narożnik; wyszarzony -top/-lg: biel 22% -> kolor karty 60%),
dotyk dostaje 22% na stałe (@media hover:none, bo na telefonie hover nie
istnieje); strzałki 45 szt. niewidoczne w spoczynku, hover 1 + dojazd;
typografia 9 ról wg pomiaru wzorca BEZ nowego fontu (document.fonts
identyczne z produkcją); rozbłysk wolniej w obie strony: wejście 0,85 s,
powrót 1,05 s ease-in-out (było 0,6 s expo w obie). Mobile 320: 309/320
(było 347/320, czyli scroll). Kontrast pierścieniowy min. 4,72.

TREŚCI: dwa modele rozliczenia (przekazanie infrastruktury = bez
abonamentu / opieka u nas = opłata 99-599) w 4 źródłach: audyt-ai,
wiedza-agenta.txt, lib/agent/knowledge.ts (agent mówił, że KAŻDE wdrożenie
ma abonament — nieprawda), api/_knowledge.mjs. Fakt zapisany w pamięci
projektu. OKRUSZKI podstron 4-poziomowe z linkiem do rodzica, widok
i JSON-LD z jednej funkcji; przy dopinaniu wyszło, że linki nie działały
(pole path vs href) — naprawione. Trzecia podstrona
/uslugi/voiceboty/odbieranie-telefonow (frazy z najlepszymi pozycjami:
bot telefoniczny 16,9; bot telefon 8,0). Tytuł poradnika o agencie:
Od 2500 zł (990 to cennik chatbota i kolizja z drugim poradnikiem w SERP).

SEO/AI — ustalenia z pomiarów: boty AI NIE są blokowane (GPTBot,
OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Bingbot: 200
i widzą kwoty; brak Cloudflare, server: Vercel). Puste logi Vercela to
okno 30 minut na planie Hobby, nie blokada. Bing: zaindeksowani (mapa
Success), ale 3 wyświetlenia przez 7 dni, frazy długiego ogona. ChatGPT
nie cytuje, bo kwoty weszły dopiero 17.08 — test powtórzyć za 1-2 tygodnie.
Nowe narzędzie: tools/bing-zglos-url.js (SubmitUrlBatch, limit 10k/dzień).
Sitemap 50 URL. Po wdrożeniu: IndexNow 50 adresów + Bing 12 adresów, 200.

CZEKA NA PAWŁA: GSC — zgłosić 4 adresy (3 podstrony voicebotów + poradnik
o agencie); decyzja: własny licznik botów AI (zdarzenia w Umami zamiast
ślepych logów Vercela).

---

# STATUS — SEO-tech (4ba2971) + SEO-tresc (b4b2d95) + v18 (2bc6816) — PRODUKCJA

ROJ 6 AGENTOW (zwiad x2 -> 3 implementacje rownolegle z twarda wlasnoscia
plikow -> kontrola adwersaryjna). Kontrola dala NO-SHIP z 6 MAJORami —
wszystkie naprawione przez sesje glowna przed commitem.

SEO-TECH (plan Z1/Z3/Z4/Z5): daty w mapie witryny z realnego pola
dataAktualizacji (10 uslug) + nowa stala dla /poradniki i architektow
(kontrola: siedzialy na czerwcu w lib/site.ts); 3 zdarzenia Umami przez
window.umami?.track (bez umami zero wyjatkow, przy 500 event nie leci);
mark-64.png 4,2 kB zamiast 1593 kB w FaviconPulse; app/favicon.ico
(koniec 404) + usunieta reczna deklaracja icons (3 konkurencyjne linki
grozily zgaszeniem pulsu). Produkcja: sitemap 49 URL, lastmod sierpniowy,
favicon 200, logo przez next/image 2,4 kB.

SEO-TRESC (Z6/Z7/Z8): dwie podstrony voicebotow (windykacja,
potwierdzanie-wizyt) — rejestr lib/uslugi/podstrony, trasa SSG, JSON-LD,
breadcrumbs; ODRZUCONE z planu: kwota 4900 zl (nie istnieje w cenniku —
uzyto "Od 990 zl", 59 zn.) i zwrot "bez abonamentu" (sprzeczny z opieka
99-599 — uzyto "od 2500 zl jednorazowo za wdrozenie, opieka od 99 zl/mies.").
FIXY po kontroli: podstrony byly SIEROTAMI (brak w sitemapie, zero linkow)
i mialy kolor chatbotow — dodana sekcja PodstronyPowiazane (te same klasy
.inf-card, renderuje sie tylko gdy usluga ma podstrony), wpis w sitemapie,
wpisy w rejestrze dekoracji (fiolet rodzica).

v18 (paleta z probnika Pawla): tlo #05050C (theme-color potwierdzony na
produkcji), zielen #39FF14, gradienty z probnika; hexy nieprzechodzace AA
na tekscie (#2500FF, #9E22E6) tylko jako ramka/glow. MIGRACJA SIEROT
PALETY: stare hexy sprzed F4 zyly w architektach, ChatAgent (17 szt.),
ChatLauncher, DiagnozaForm i globals (--accent-2, --route-gradient).
SPROSTOWANIE w Oferta.tsx: komentarz podawal niezweryfikowane liczby
(kontrola MAJ-6) — poprawiony, zero zmyslonych liczb w repo.
Kontrasty po wszystkim: 5,11-5,38 (prog 4,5).

IndexNow: 49 adresow, 200.
CZEKA NA PAWLA: (1) GSC — zglos recznie /poradniki/ile-kosztuje-chatbot-
dla-firmy-2026, /uslugi/chatboty i obie nowe podstrony voicebotow;
(2) Cloudflare — sprawdz w logach, czy boty AI (GPTBot, ClaudeBot,
PerplexityBot, OAI-SearchBot) w ogole wchodza; (3) test formularza na
produkcji i zdarzenie wyslano_formularz w Umami (potem skasuj testowy lead).
OBIEKCJE DO PONOWNEJ ANALIZY: „bez abonamentu" zyje jeszcze w
lib/uslugi/audyt-ai.ts:78 i public/wiedza-agenta.txt:13 (dlug sprzed rundy);
tel: z spacjami w href (RFC 3966); breadcrumb podstron 3-poziomowy (bez
poziomu "Voiceboty"); /uslugi/voiceboty/potwierdzanie-wizyt na 320 px
rozpycha kadr do 334 px (bez scrolla, dlug jak na home); /produkty tytul
67 zn. (ucinany w SERP).

---

# STATUS — SEO (5337f45) + INFINITY v17 (4081591) — NA PRODUKCJI

TOR SEO (brief Pawla 17.08; tag cofniecia przed-seo-2026-08-17): kwoty
w poradniku agenta AI (990/2500/1490/99-599 z plikow uslug, tabela
widelki 2026, H2 od-czego-zalezy, dataAktualizacji 2026-08-17) +
linkowanie wewnetrzne: 4 zdania z linkami w RamaCeny uslug (osobne pole
linkPoradnik, wyglad bez zmian) + Zobacz tez w 4 poradnikach
(LinkiKrzyzowe). Przy okazji: 2 zastane em-dash z AgentConsole usuniete.
Kontrola SEO: SHIP WITH MINORS (decyzje redakcyjne: od 990 obok zdania
nie-kosztuje-tyle-co-chatbot — do ew. korekty Pawla). IndexNow 47
adresow 200. GSC: Pawel recznie 4 adresy do zaindeksowania.

TOR v17 (paleta neon): kalibracja z pikseli napisu ktos inny (hue 290):
#b638ff->#e438ff, #a586ff->#dc7aff, #00c986->#00e096, #5ba4ff->#70b0ff;
pomarancz nietkniety. Nowy fiolet jasniejszy -> pierscien 4,91-5,40
(prog 4,5) -> wyjatki AA z v16 ZDJETE z overline/sub/statusu (pelne
jarzenie 60/30 wrocilo); jedyny wyjatek: tag-kolor (ogon 14px/30%).
Kontrola v17: SHIP WITH MINORS, zero blokerow, regresje zero.
Produkcja zweryfikowana (paleta, kwoty, linki, em-dash out), zrzuty.
Czeka na Pawla: ocena neonu na zywo; GSC 4 adresy; test ChatGPT/
Perplexity ile kosztuje agent AI dla firmy w Polsce.

---

# STATUS — INFINITY v16 — NA PRODUKCJI (commit f1550a6, globals+pomiary, +343/-20)

Feedback Pawla (zrzuty Security Stack wzorca): gorne rozswietlenia
subtelne — luna 10px->7px, zasieg 6,5->4-4,5px (cel wzorca), 18/18 kart
top + odcienie D + stat + lg; NEON skalibrowany do przycisku Umow
diagnoze (zmierzone jarzenie przeniesione na kickery/tagi/statusy/kropki/
plytki we wszystkich kolorach, teksty pelna paleta); sasiedztwo: zero
powtorzen koloru obok siebie (53 karty, 1440+375). KONTROLA DALA NO-SHIP
(pierscien pikselowy fioletu 4,28-4,45 < 4,5) — fixy sesji glownej:
fiolet ogon 14px/35% bez rdzenia, status fiolet bez cienia, tag fiolet
bez cienia + tint 12->4% (stan zastany v15 naprawiony przy okazji: prod
mial 4,02), kafel rest 50->42% (inwersja), luna 7px. Po fixach pomiar
sondami KONTROLI: overline 4,53 / tag 4,59 / sub 4,59 / status 4,65 —
wszystkie >=4,5 i LEPSZE niz prod v15. Regresje v15 zero. Produkcja:
markery CSS na zywo (285s), zrzuty.
Czeka na Pawla: ocena na zywo (subtelnosc gor + poziom neonu).
Znane: p90 fioletu ~4,4 (kryterium = mediana); blur na 3 elementach demo
mobile (stan zastany, osobna decyzja); tools/*.js (4 szt.) w drzewie
z osobnej sesji SEO.

---

# STATUS — INFINITY v15 — NA PRODUKCJI (commit 6fe5b07, 19 plików, +430/-178)

Runda po wściekłym feedbacku Pawła (zrzuty sekcji Open Source wzorca).
TRZY BŁĘDY WYCOFANE: (1) „cisza" v14 w kosz — hover PEŁNY (sweep +
rozświetlenie + lift) na KAŻDEJ karcie, także statystyki/FAQ/cytaty
(zmierzone CDP 17 kart / 6 wariantów, 53/53 z żywym sweepem); (2) czyste
warianty spoczynku — lewa kreska bazy zgaszona na kartach z górną linią
(::before none na top/stat), każda karta DOKŁADNIE 1 wyróżnik, zero łączeń;
(3) głębia przezroczysta — czerń 10% spod gradientu zdjęta (bgColor
transparent), karta szklana, kontrasty wzrosły (fiolet 4,57, mierzone
na pikselach). NEON 1:1 z pomiaru Open Source (pomiary-v15.md): płytka
3 warstwy (gradient+inset+glow 16px+drop-shadow), chipy tło 12% obwódka
32% tekst pełny, statusy glow. SWEEP płynniejszy: pas 60% (było 38%),
gradient 105deg miękki, bez skew, 0.6s spring cubic-bezier(.16,1,.3,1).
HOVER GLOW POZA RAMKĘ: łuna 22/48px 35% + 28px 14% + inset. Tagline pod
tytułem (NarzedziaTeaser), różnorodność kolorów sąsiadów OK. Minor audytu
naprawiony przed commitem: forced-colors gasi drop-shadow płytki.
Kontrola: SHIP WITH MINORS, zero blokerów; zero nowych tekstów w diffie.
Produkcja: computed zmierzony na żywo (pas 59,8%, spring, transparent,
20 kart bez ::before), zrzuty w scratchpadzie.
Czeka na Pawła: ocena „czy świeci jak wzorzec" na żywo; pastelowe
--card-c kilku sekcji (Bezpieczeństwo, Gwarancja, Oferta, ZyweDemo) poza
zakresem pomiaru — jeśli dalej „blade", osobny pomiar tych rodzin (v16).
Margines AA fioletu #b638ff ~0,1 — nie rozjaśniać tła kart.
W drzewie (nie commitowane w rundach designu): .seo-przeglad/* +
tools/diagnoza-produkcji.js, gsc-pelny.js, migawka.js, porownaj-migawki.js
(artefakty osobnej sesji SEO).

---

# STATUS — INFINITY v14 + v14b — NA PRODUKCJI (commity 0539767 + 0f82b7a)

v14 (17 plików, +425/-47) — po audycie Manusa i uwadze Pawła o wnętrzu kart:
KOMPLET ANATOMII wnętrza kart home (płytka ikony .inf-tile 40px z gradientem
i glow — 33 szt.; kickery mono w kolorze karty — 15, WYŁĄCZNIE etykiety
z istniejących danych, zero nowych węzłów tekstowych w diffie; chipy;
strzałki tylko na linkach), CISZA NA NIEKLIKALNYCH (.inf-card-static:
44 karty informacyjne bez sweepa/liftu, 9 kart-linków z pełnym językiem),
FOCUS-VISIBLE kart-linków (ring 2px w kolorze karty + offset, 9/9 Tab-em).
v14b (1 plik: globals.css, OSOBNY commit dla łatwego revertu — decyzja
Pawła „chcę ten efekt premium; jak się nie spodoba, cofniesz"): GŁĘBIA
powierzchni kart 1:1 .lp-learn-card wzorca — gradient 160deg
rgba(12,13,28,.74)->rgba(9,10,22,.55) jako 11. warstwa background-image
(53/53 kart; warianty edge/full-hover/quiet dostały osobną nadpiskę,
bo gasiły całą listę) + backdrop-blur(12px) TYLKO desktop; czerń 10%
zostaje pod spodem jako bezpiecznik AA. REVERT GŁĘBI = git revert 0f82b7a.
Kontrole: v14 SHIP WITH MINORS (minor: kickery pominięte w sekcjach bez
etykiet rejestrowych — zero-nowych-treści górą; INFO: statusy 5 kolorów
vs 1 zielony wzorca; sweep nieklikalnych na PODSTRONACH poza zakresem),
v14b SHIP WITH MINORS (margines AA fioletu 4,67 — nie rozjaśniać
powierzchni bez przeliczenia; przygaszone cytaty opacity .25 sprzed rundy;
GPU blura niezmierzone tracingiem). Produkcja: markery HTML/CSS + zrzuty.
Czeka na Pawła: ocena głębi na żywo (rewert = 1 commit); decyzja
o kickerach-numerach w JakToDziala (dubel numeru); ew. ujednolicenie
statusów do 1 koloru; ew. cisza nieklikalnych na podstronach (v15?).
W drzewie: artefakty .seo-przeglad/ (2 przebiegi 2026-08-17) — osobna
sesja, nie commitowane w rundach designu.

---

# STATUS — INFINITY v13 — NA PRODUKCJI (commit ce88871, 3 pliki, +447/-91)

Naprawa przesycenia v12 (Pawel: cztery rodzaje ramek wzorca, „u nas tego
nie ma w ogole"): baza obwodek WYCISZONA do wartosci wzorca (biel 4-7%,
zero kolorowych obwodek dookola — 53/53 kart home zmierzone), swieci tylko
WYROZNIK wariantu: TYP A gora gasnaca ku rogom + luna (18 kart), TYP B sam
lewy bok, gora czysta (18), TYP C delikatny ring (5), TYP D pasek gorny
w odcieniach jednego koloru (4 kafle POTRAFI, --card-c-alt, zielen->cyjan
/ amber->pomarancz / fiolet->magenta). Wszystko 1:1 z zywego wzorca
(raporty/pomiary-v13.md). Separator: DWA rozblyski naraz, przelot 4s
ease-in-out (bylo 2,4s) = 2,4x wolniej, czysty CSS, RM gasi.
HOVER WSPOLNY i HERO USLUG (v12) NIETKNIETE — zmierzone 8 przypadkow
hovera + git diff uslug = 0. SEO: diff tresci = 0.
Proces: workflow zwiad->implementacja->kontrola (SHIP WITH MINORS; oba
minory SPRZED rundy: scroll 27px na 320px od slowa „automatyzacje" w H1
maszyny — nietykalne bez decyzji Pawla; luna typu A/D emulowana radialem
bo box-shadow architektonicznie niemozliwy na warstwie background).
Produkcja zweryfikowana: CSS na produkcji = ten sam hash co audytowany
lokalnie (0b028417aa79e44e), markery --card-c-alt i shimmer 4s obecne.
Czeka na Pawla: ocena wizualna na zywo (luna A/D + odcienie D).
W drzewie wisi niezacommitowany przebieg .seo-przeglad/ z 2026-08-17
(werdykt STABILNIE) — artefakt osobnej sesji skillu, nie ruszany.

---

# STATUS — INFINITY v12 — NA PRODUKCJI (commit ac62ef0, 10 plików, +1002/-124)

Naprawa błędu v11 (pełny hover miał tylko wariant W3): REGUŁA WSPÓLNA —
spoczynek RÓŻNY per wariant (pasek/linia górna/kolor obwódki/quiet), hover
na KAŻDEJ karcie rozświetla WSZYSTKIE 4 strony ramki pełnym kolorem + sweep
(zwolniony do 0.6s ease, 1:1 wzorzec) + lift; zmierzone 10 kart / 6 wariantów,
background-color bez zmiany 10/10. Nasycenie spoczynku 100% koloru karty
(decyzja „MAKSYMALNE nasycenie" — POWYŻEJ tabeli wzorca 6-7%; czeka na
akcept wizualny Pawła na żywej stronie). Pulsujące statusy 1:1 anatomia
wzorca (kropka osobnym spanem, czysty CSS, RM-bramka): „ZA DARMO" 5x
/narzedzia + teaser home, „WDROŻONE" 8x /realizacje — zero zmyślonych.
Hero podstron usług jak akademie wzorca: kolor przewodni z inf-kategorie
(= karta na home), badge-pigułka z shimmerem, drugi człon H1 w kolorze
(span; H1 byte-for-byte z rejestrem), tagi, kafle statystyk WYŁĄCZNIE
z rejestru (990/2500/1490/24-7/kroki/FAQ ze źródłami), CTA pełnym kolorem.
SEO NIETKNIĘTE: diff treści = 0 (audyt czytał linia po linii).
Proces: workflow 5 agentów (zwiad pomiarowy -> partie A/B/C równoległe ->
kontrola adwersaryjna; kontrola padła na limicie sesji, dokończona po
resecie z cache — werdykt SHIP WITH MINORS). Minory naprawione przed
commitem: hero przepięte z inline na klasy .inf-hero-* (zysk: shimmer,
forced-colors, blur desktop-only), selektor tagu .inf-chip.inf-hero-tag
(specyficzność), martwe .inf-hero-cta/-stat-value/-label/.inf-status-badge
wycięte, alfa() bez fallbacku usunięta. Weryfikacja po minorach: build/tsc/
lint 0, sonda realny Chrome (3 usługi: kolory pełne 1:1, shimmer żyje,
RM gasi, mobile 375 bez scrolla) + produkcja (markery HTML/CSS, zrzuty).
IndexNow pominięty ŚWIADOMIE: diff treści = 0, czysty design.
Czeka na Pawła: ocena wizualna nasycenia 100% na żywej stronie.
Znane na później: .sf-glass.card-live:hover bez żywej instancji (zmiana
spójna, ryzyko niskie); sondy-testy z audytu (4 pomysły w raporcie
kontroli); 320px najdłuższe słowo H1; 3 stare em-dash na home.

---

# STATUS — INFINITY v11 — NA PRODUKCJI (commit 5a632d9, 52 pliki, +1268/-149)

Naprawa błędu uniformizacji z v10: zamiast jednego stylu ramki — SZEŚĆ
wariantów zmierzonych na wzorcu (edge/top/full-hover/stat/quiet + baza),
mapowanych per sekcja NA HOME I NA PODSTRONACH (naczynia połączone; kontrola
policzyła w DOM: /uslugi full-hover 10/10, /wiedza edge 6/6 itd.).
Nasycenie w spoczynku (obwódki w kolorze kategorii, esencja 100% na paskach
i ringach), tytuły biel #f2f4fb/800, kreska pod H2 (statyczna = wzorzec),
pasek zaufania w ramkach, karty-zjadacze z kickerem+opisem+tagami (każde
zdanie ze źródłem), dropdown krótki tytuł + szary podpis (pokrycie pozycji
bez strat), odstępy 1,00-1,05x wzorca, CTA na osi 0,0px.
VOICEBOT OD 2500 zł: title + JSON-LD minPrice + spójność w 5 plikach wiedzy;
synonimy bot telefoniczny/agent głosowy; agent ElevenLabs skasowany przez
Pawła — odtworzy się z cennikiem 990+2500 przy pierwszej rozmowie.
Hook designu: wyjątki value-scoped dla globals.css (gradient-text celowy,
broken-image to fałszywy alarm na komentarzach CSS) — reguły aktywne wszędzie
indziej. IndexNow 47 adresów po zmianie treści (200).
Znane na później: 320px najdłuższe słowo H1 wystaje (bez scrolla); 3 stare
em-dash na home; sondy: klasa-TSX-istnieje-w-CSS, mapa wariantów per strona.

---

# STATUS — INFINITY v10 — NA PRODUKCJI (commit 19728b2, 24 pliki, +686/-112)

Rundy v7-v10 wdrożone kolejno (commity cffb92a, 17c5a35, c5c3266, 19728b2),
każda po audycie adwersaryjnym z pomiarami w realnym Chrome. Stan po v10:
- karty NASYCONE OD RAZU: obwódka w kolorze kategorii 45% w spoczynku
  (hover 60-65%) + TOP-GLOW 1:1 ze zmierzonego wzorca (gradientowa górna
  krawędź, jaśniejsza na środku); koniec bladości — 12 sekcji zmigrowane
  z lokalnych bladych hexów na podbitą paletę wg mapowania w inf-kategorie
  (#67e8f9->#61edff itd.), grep starych hexów = 0 także na produkcji;
- 19 kolorowych fragmentów H2 (.inf-grad-text, gradient wzorca
  #00f0ff->#ff00e5->#b026ff), tekst 1:1, shimmer tylko desktop;
- dropdown 0.92 (produkcja potwierdzona), gap siatek 32->20/16px,
  persona hero w karcie, liczniki (chip 8,7% + 5 rejestrów) restartują
  przy każdym wejściu w kadr przez JEDNĄ pętlę licznikTicker;
- nietknięte inwarianty: hover karty bez zmiany tła, tło jednolite,
  H1 nad foldem (1440x900 zapas 72px, 1366x768 zapas 39px), maszyna
  pisania, zero 404 w menu, mobile bez poziomego scrolla.
Agent głosowy: DZIAŁA (200 + token). Wnioski audytu domknięte przed
wdrożeniem (paleta sekcji + 2 nieaktualne komentarze).

---

# STATUS — INFINITY v6 — NA PRODUKCJI (commit a5f35c1, 18 plików, +1238/-269)

DOWODY Z PRODUKCJI (www.simplefast.ai, po deployu):
- maszyna pisania ZŁAPANA W TRAKCIE na zrzucie: „Buduj|em" z kursorem,
  wcześniej zmierzona na localhost co 160 ms: 3 litery @169 ms → 30 @1927 ms;
- karty w języku wzorca: rgba(6,6,12,.5) + biel 7%, gwiazdy prześwitują,
  kafle z poświatą w kolorze kategorii (cyjan/fiolet/bursztyn), mono etykiety
  i strzałki w pełnym nasyceniu, narożniki [ ] zostały;
- podstrona /uslugi/chatboty: te same karty (zrzut kroku „Diagnoza") —
  „naczynia połączone" domknięte;
- /wiedza-agenta.txt: HTTP 200, 15 938 znaków, text/plain UTF-8;
- /api/elevenlabs-session: 503 elevenlabs_not_configured = funkcja żyje,
  czeka na klucz (zgodnie z oczekiwaniem, ENV po stronie Pawła).

# STATUS — INFINITY v6 — etapy rundy

Runda v6 = feedback Pawła po v5. Etapy:
- [DONE] A rozświetlenie kart wg POMIARÓW wzorca infinitytechstack.uk
  (zmierzone getComputedStyle, nie na oko): .inf-card tło rgba(6,6,12,.5)
  zamiast solidnego, obwódka bieli 7%, wash 135° w kolorze karty; .inf-tile
  tło 14% / obwódka 28% / glow 0 0 18px -4px 55%, glif w pełnym kolorze;
  mono napisy i badge z text-shadow glow; strzałki w kolorze karty.
- [DONE] B maszyna pisania H1 — NAPRAWIONY START (mechanizm liter nietknięty).
  Przyczyna zniknięcia efektu: po v5 blob agenta zepchnął H1 tak, że był
  częściowo widoczny przy załadowaniu, więc stary IntersectionObserver
  (threshold .25, rootMargin -10%) odpalał pisanie natychmiast po hydration
  i animacja kończyła się, zanim użytkownik spojrzał. Teraz: widoczny przy
  starcie → pisanie po 700 ms (z ponownym sprawdzeniem widoczności), poza
  widokiem → obserwator + zapasowy nasłuch scrolla. Scramble dołożony na 5
  przyciskach dropdownów. DOWÓD (localhost, próbkowanie co 160 ms):
  3 litery @169 ms → 6 @326 → 9 @483 → … → 30 @1927 ms, kursor przy ostatniej.
- [DONE] C wiedza agenta przepisana pod TĘ stronę + ZABEZPIECZENIA.
  Stara była kopią 1:1 z 10K: opisywała tamte usługi i trasy (404 u nas).
  Teraz 11 naszych usług, ceny publiczne (1490 / 1990 / 350 zł-h / ryczałty
  3000-5500-10000), founderzy, miasta — każdy fakt zgrepowany w rejestrach.
  NAV_MAP i NAV_CLIENT: 24 pozycje, te same id w tej samej kolejności.
  public/wiedza-agenta.txt = dokument do KNOWLEDGE_DOC_URL.
- [DONE] D podstrony: przyczyną „starego stylu" był komponent Card
  renderujący .sf-glass (biel 4% + blur), pominięty przez rozświetlenie.
  .sf-glass przeszedł na rgba(6,6,12,.62) + biel 7% + wash; .sf-rim-gradient
  (karta wyróżniona) też — solidny granat #101a30 dawał 4,21:1, czyli
  PONIŻEJ AA. Tabele cennika, obiekcji i 23 tabele treści na styl katalogowy.
- [DONE] Audyt adwersaryjny (qa-auditor) — werdykt NO-SHIP, naprawione:
  * KOLIZJA DWÓCH STRON (najgroźniejsze, znalezione przy weryfikacji audytu):
    plik przyszedł z 10K razem z nazwą agenta „SFAI Voice Agent", nazwą
    narzędzia „navigate_to" i prefiksem dokumentów „SFAI Wiedza ". Przy
    wspólnym ELEVENLABS_API_KEY (jeden workspace) nasz kod (a) adoptowałby
    agenta 10K bez zmiany promptu, więc nasza wiedza i ZABEZPIECZENIA nigdy
    by nie zadziałały, (b) PATCH-owałby wspólne narzędzie na nasze sekcje,
    psując nawigację tamtej stronie, (c) sprzątanie KB SKASOWAŁOBY dokumenty
    wiedzy tamtej strony. Teraz wszystko zawężone: agent „SimpleFast.ai WWW
    Agent", narzędzie navigate_to_www (nazwa jedzie do klienta w payloadzie
    sesji, alias navigate_to zostaje), prefiks „SFAI WWW Wiedza ".
  * .sf-rim-gradient poniżej AA → migracja tonalna (wyżej).
  * brak fallbacku rgba przy glow badge; martwa gałąź startu maszyny bez
    zapasowego wyzwalacza; nieaktualne komentarze o PATCH promptu i #diagnoza.
- [TODO] deploy + weryfikacja produkcji + PSI + zrzuty dla Pawła.

KOLEJNOŚĆ URUCHOMIENIA GŁOSU (ważna, agent tworzy się RAZ):
1) deploy (żeby /wiedza-agenta.txt było pod adresem),
2) w Vercelu projektu sfai-new dodać ELEVENLABS_API_KEY (konieczna)
   + KNOWLEDGE_DOC_URL=https://www.simplefast.ai/wiedza-agenta.txt
   (+ opcjonalnie ELEVENLABS_VOICE_ID, ELEVENLABS_LLM),
3) Redeploy, dopiero potem pierwsza rozmowa głosowa — przy niej kod tworzy
   agenta z pełną konfiguracją z repo. Późniejsza zmiana wiedzy w repo
   wymaga skasowania agenta w dashboardzie (kod odtworzy) albo ręcznej
   edycji promptu, bo dashboard jest źródłem prawdy dla istniejącego agenta.

Raport SEO z danych GSC/Bing: raporty/raport-seo-2026-08-07.md.

---

# STATUS — INFINITY v5 — NA PRODUKCJI (commit b6d8e0c, 64 pliki, +5552)

Zweryfikowane: voice agent 1:1 z 10K w hero (blob „Zapytaj AI" → konsola
„Agent wiedzy firmy" czat/głos, FAB globalny; /api/elevenlabs-session na
produkcji odpowiada 503 = funkcja działa, CZEKA NA ENV), dropdowny
przezroczyste (widać stronę pod spodem) z emoji + badge mono po prawej,
liczniki, walec cytatów, karty AEO, spójne podstrony. Mobile 375: overflow
0, blur 0. PSI live mobile: **83** / A11y 100 / BP 100 / SEO 100
(FCP 1,4 s, LCP 4,1 s, TBT 20 ms — najniższy w historii, CLS 0).
CZEKA NA PAWŁA: w Vercelu projektu sfai-new dodać env z projektu
website-10k: ELEVENLABS_API_KEY (konieczna; głos nie ruszy bez niej)
+ opcjonalne: ELEVENLABS_VOICE_ID, ELEVENLABS_AGENT_NAME, ELEVENLABS_LLM,
KNOWLEDGE_DOC_URL → Redeploy. Prompty agenta dopracujemy po uruchomieniu.

---

# STATUS — INFINITY v5 plan (wykonany, wf_30a5e36f)

Feedback Pawła po v4 (dyktando: JAKOŚĆ > TEMPO, sprawdzać przed wdrożeniem):
1) VOICE AGENT z 10K przenieść 1:1 DO HERO zamiast lemniskaty (pełna
   struktura: api/elevenlabs-session.mjs + _knowledge + agent-console.js
   947 linii + AgentConsole/FlowCore; /api/*.mjs = vercelowe functions obok
   Nexta; dep @elevenlabs/client 1.15.2; ENV do skopiowania w Vercelu
   z projektu 10K: ELEVENLABS_API_KEY [+ opcjonalne VOICE_ID/AGENT_NAME/
   LLM/KNOWLEDGE_DOC_URL]; „prompty dopracujemy później").
2) Dropdowny PRZEZROCZYSTE (rgba .72 + blur), wiersze emoji NATYWNE +
   opis + BADGE mono po prawej (istniejące pola), CTA: zielona obwódka +
   niebieskie litery → hover białe świecące (nav i ghost).
3) Home: symetria Problem, cytaty jako WALEC 3D (obracający się bęben,
   ~260px, RM crossfade), sekcje AEO w dwóch kartach obok siebie,
   tile hover rotate -15°+scale, pulsujące kropki statusów, kolejność
   sekcji przemyślana (opowieść).
4) PODSTRONY — pełna spójność z home (naczynia połączone): wszystkie
   huby/wpisy/o-nas/kontakt na karty inf + mechanizmy + tabele.
Spec: scratchpad/spec-infinity-v5.md. Partie: A voice (effort max) /
B nav (właściciel globals w tej rundzie) / C home / D podstrony.
Po merge: build, PEŁNA weryfikacja przeglądarką (desktop+mobile, dropdowny,
walec, konsola agenta — lokalnie /api/*.mjs nie działa, test na Vercelu),
deploy, PSI, instrukcja env dla Pawła.

---

# STATUS — INFINITY v4 — zastąpiony przez v5 (commit 800a209)

Zweryfikowane live + lokalnie: lemniskata 3D „pływające DNA" (wspólny moduł
lib/lemniskata.ts: z-oplot, tilt 18°, projekcja; desktop glow, MOBILE
HeroLoopLite 2×48 kropek 30fps — nowy budżet Pawła), tło wróciło (Section
base=transparent — solidne bg kryło fixed-warstwy), dropdown JEDEN naraz,
karty: sweep ::after wszędzie + narożniki [ ] + fluorescencyjny hover +
odcienie per karta, PromoUslugi po hero (chatboty FULL + voiceboty/audyt +
architekci; treść 1:1 z USLUGI), NarzedziaTeaser, ciemna karta cytatów
(jasna wyspa OUT z home), voice-blob FlowCore (zielona aura „Zapytaj AI" →
link na żywego voicebota), scramble na nav/tytułach (zasady site.js 1:1),
CTA nav outline→hover wypełnienie. Mobile 375: overflow 0, 2 canvasy-lite,
blur 0. PSI live mobile: **84** / A11y 100 / BP 100 / SEO 100 (FCP 1,2 s,
LCP 4,1 s, TBT 50 ms, CLS 0) — LEPIEJ niż v3 (82) mimo animacji na mobile.

---

# STATUS — INFINITY v4 plan (wykonany, wf_07983546)

Feedback Pawła po v3 (decyzje WPROST): lemniskata do przebudowy na 3D
„pływające DNA" (płaska = „odrażająca"), ŚCIŚNIĘTA (~300px, nie pół ekranu),
fluorescencyjna, ANIMOWANA TEŻ NA MOBILE (ZMIANA BUDŻETU: mobile dostaje
2 lekkie canvasy — lemniskata-lite + voice-aura-lite; DPR 1, bez shadowBlur,
30fps, pauza IO/hidden; po deployu pomiar PSI, degradacja jeśli <75);
BUG dropdownów (nachodzą — jeden otwarty naraz); TŁO znikło (diagnoza:
sekcje home mają solidne bg-bg kryjące fixed-warstwy → tone base=transparent);
karty: rozbłysk ::after na KAŻDEJ (overflow:hidden), fluorescencja, RÓŻNE
odcienie per karta, mono podtytuł, narożniki [ ]; STRUKTURA: po hero
promo-kafelki usług wg SEO (chatboty full + voiceboty/audyt + architekci),
narzędzia-teaser na home, biała karta cytatów → ciemna, sekcje
„H2+opis+grid"; voice-blob „Zapytaj AI" (port FlowCore.astro z folderu
SF AI WWW 10K) zamiast znaku w „Wolisz posłuchać" → link na drugą stronę;
scramble-text z site.js 10K (nav + tytuły); CTA nav = Hire-Me-style
(outline→hover wypełnienie). Spec: scratchpad/spec-infinity-v4.md.
4 partie: A fundament / B lemniskata 3D / C struktura home / D blob+scramble.
Po nich: scalenie, build, weryfikacja (NOWA karta Chrome przy injection-
timeout!), deploy, PSI mobile.

---

# STATUS — INFINITY v3 „kopia" — zastąpiony przez v4 (commit 924803c)

Zweryfikowane live: lemniskata ∞ przeplata się (fix mojego autorstwa: nitka
przesunięta o π pokrywała TEN SAM zbiór punktów środkowosymetrycznego toru —
dodany oplot ±9px·sin(3t) w przeciwfazie, SVG i canvas), dropdowny hover
z ikonami SVG dla 5 pozycji nav, liczniki 10/4/8/5/14 (prawdziwe .length),
zdjęcia OUT (zero <img> w main poza logo), voicebot → druga strona Pawła
(target=_blank), kratka OUT. Mobile 375: overflow 0, canvas 0, blur 0
(lemniskata = statyczny SVG z buildu).
SEO wdrożone i wysłane: FAQ chatboty (frazy „ile kosztuje chatbot AI dla
firmy"), „bot telefoniczny" w voicebotach, meta descriptions ≤155, linki
wewnętrzne blog→usługi, IndexNow PING wykonany: HTTP 202, 46 adresów.
PSI live po v3: mobile 82 / SEO 100 / A11y 100 / Best Practices 100
(FCP 1,3 s, LCP 4,0 s, TBT 160 ms, CLS 0). Względem warunku (baza 73) +9;
względem v2 (90) −8 (LCP +0,4 s przez większy hero — kandydat na szlif:
content-visibility/rozmiar SVG lemniskaty; NIE blokuje).
UWAGA weryfikacyjna: karta Chrome potrafi zawiesić mostek rozszerzenia
(injection timeout mimo żywej strony) — test w NOWEJ karcie przed diagnozą.

--- (plan rundy niżej, wykonany)
# STATUS — INFINITY v3 „kopia" (2026-08-06 noc) — plan (wf_7931ba3c)

Decyzje Pawła po v2 (WPROST): ZDJĘCIA WYLATUJĄ z całej strony („nie są nam
potrzebne"); KRATKA .inf-grid WYLATUJE („background spierdolony, jakaś
kratka") — to zamyka finding impeccable codex-grid-background (usunięcie =
fix); hero WYŚRODKOWANE z wielką animacją POD paskiem (lemniskata ∞ z kropek
cyan/magenta + linie łączące, mobile = statyczny SVG); emoji → UNIKALNE SVG
ikony w kaflach (InfIcons ~24 szt.); dropdowny z kaflami dla WSZYSTKICH
pozycji nav; karty w stylu /produkty wszędzie (pełne podświetlenie + błysk +
ikona scale/brightness + strzałka pojawia się na hover); CTA hover = BIAŁE
podświetlenie; pasek PRAWDZIWYCH liczników z rejestrów (.length — zero
zmyślonych liczb); voicebot → link na drugą stronę Pawła
https://sfai-webseite-10k-look.vercel.app/ (żywy voicebot); SEO: Paweł
ZATWIERDZIŁ wdrożenie WSZYSTKICH rekomendacji raportu (FAQ chatboty, fraza
„bot telefoniczny", meta descriptions ≤155, linkowanie wewnętrzne, IndexNow).
Spec: scratchpad/spec-infinity-v3.md. 4 partie: A fundament+nav (ikony,
dropdowny, karty v3, grid-out, mgławice), B hero (centered + lemniskata +
liczniki), C sekcje (zdjęcia-out + voicebot link), D SEO-treści (lib/**,
IndexNow). Po nich: scalenie, build, weryfikacja przeglądarką (KARTA NA
WIERZCHU!), deploy, PSI, ping IndexNow + sitemapa w Bing.

---

# STATUS — INFINITY v2 (2026-08-06 wieczór) — zastąpiony przez v3

Punch list Pawła po v1 wdrożony (commit a574555 + fix logo):
płynąca obwódka paska (magenta→violet→cyjan, 3 s pętla), linki wyszarzone
z cyjanowym hover, dropdown na HOVER jednym przyciskiem (chevron 180°,
"Wszystkie usługi" w DOM, "Architekci" usunięci, NATYWNE EMOJI w kaflach),
paleta Infinity 1:1 (bg #06060c, surface #111127, accent #22d3ee/+#8b5cf6),
błysk + spotlight na kartach, glow kursora w tle (kropki rozświetlają się),
stare warstwice hero usunięte, logo 36 px (UWAGA: h-9 w tym repo = 96 px,
spacing ma własne tokeny!), podstrony w języku INFINITY (Section
tone="transparent", karty z lib/inf-kategorie.ts). Mobile: 0 canvas/blur/
overflow, animacja obwódki wyłączona. Równolegle: fix SEO kanonicznej domeny
www (e5a8b39) + raport raporty/raport-seo-2026-08-06.md (GSC/Bing/Ahrefs/
Umami; 7 rekomendacji czeka na zgodę Pawła).
LEKCJA WERYFIKACJI: uśpiona karta Chrome mrozi IO/transitions — listingi
wyglądają na "puste" na zrzutach z ukrytej karty; sprawdzać na wysuniętej.

---

# STATUS — REDESIGN "INFINITY" v1 (2026-08-06) — zastąpiony przez v2

WYNIK: commit 16c25bd (29 plików, +2007/-265) wypchnięty, Vercel LIVE
(potwierdzone markerami inf-pill-nav/mark/inf-ask w produkcyjnym HTML
+ zrzut hero z produkcji). Weryfikacja przeglądarką: desktop sekcja po
sekcji (pigułka nav + ring gradientu po moim fixie przebicia poświaty,
dropdown kafelkowy, particles+wstęga działają, terminal, tabela równa,
zdjęcia w kadrach bez upscale, cennik, cytaty, formularz, czat mono),
mobile 375: overflow 0, canvasy 0, blur 0. Konsola 0 błędów.
PSI live po wdrożeniu: MOBILE 90 (było 73! LCP 7,5→3,6 s, TBT 40 ms,
CLS 0), desktop 82 (TBT 240 ms od canvasów po load — świadomy koszt),
A11y 100/97, SEO 100. Warunek "bez pogorszenia" przebity o +17 pkt.

Paweł ocenił ŚWIAT B na 0/10. Nowy wzorzec: infinitytechstack.uk ("chcę dokładnie
tak jak ta"). Spec ekstrakcji: scratchpad/spec-infinity.md (zmierzone wartości:
tło #06060c, Inter 900, mono-akcenty, pigułka nav blur+glow, 2 canvasy:
interaktywne kropki tła + wstęga hero). Adaptacja: NASZE kolory marki (trasa
blue→violet→green), NASZE treści 1:1, logo graficzne WRACA do headera.
Bugfixy zgłoszone: rozmazane zdjęcia (upscale >1400px), rozjechana tabela,
brak logo. Perf: canvasy tylko desktop-lazy przez MotionGate; mobile czysty CSS.

Workflow wf_24843045-b98: FUNDAMENT (globals/layout/tailwind) → równolegle
HERO+NAV / SEKCJE / MOTION / CHAT+TOOLS. Po ich raportach: scalenie kontraktów
CSS, build, weryfikacja przeglądarką sekcja po sekcji, mobile 375, commit, push,
live + Lighthouse.

---

# STATUS — ŚWIAT B "Ciemna pracownia": pełny redesign (2026-08-05)

Zlecenie Pawła: wdrożyć koncept B (ciemna pracownia) z zaakceptowanych makiet
(zrodla/makiety-b/1-5), kolory + przejścia + animacje, strona "wow", SEO/AI-SEO
i teksty NIETKNIĘTE, szybkość w Google Speed Insights bez pogorszenia.
Maszyna do pisania H1 = NIETYKALNA (sygnatura Pawła).

## Etapy
1. [DONE] Makiety: 3 koncepty → Paweł wybrał B; 5 makiet sekcji (hero, problem,
   proces, oferta, finał) w zrodla/makiety-b/.
2. [DONE] Implementacja równoległa 2 agentów (25 plików, +1069/-410):
   partia A fundament (globals.css :root ciemny navy-950, [data-theme='light']
   wyspy, .sf-glass, .sf-rim-gradient, .sf-route, .sf-header, wordmark tekstowy,
   hero dolny-lewy, typewriter z zielenią #63F000), partia B sekcje wg makiet
   (Problem BLEED + biała karta cytatów, JakToDziala trasa + węzły kompasu,
   Oferta 1/3+2/3 szkło + rim, FinalneCTA pełna trasa z kropką).
3. [DONE] Weryfikacja przeglądarką sekcja po sekcji (desktop): hero z pełnym
   gradientowym H1, biała wyspa, terminal AgentDemo pisze, pin procesu scrubuje
   karty 1→2→3, badge cennika NIEprzycięty, FAQ otwiera się, formularz na ciemnym,
   stopka, 404, /uslugi/chatboty — wszystko w świecie B. Konsola: zero błędów.
4. [DONE] FIX mobile: 14px poziomego scrolla na 375px — poświata
   .sf-rim-gradient::before (inset -34px) rozpychała dokument; overflow-x-clip
   na sekcji Oferty. Po fixie 375/375, overflow 0 (dowód: scrollWidth).
5. [DONE] Commit 15014db wypchnięty; live potwierdzone (theme #0b1220,
   sf-header, sf-rim-gradient w HTML produkcyjnym).
6. [DONE] Wydajność po wdrożeniu — POMIAR (dowody):
   - PSI live mobile: PERF 73, FCP 1,3s, LCP 7,5s, TBT 60ms, CLS 0; desktop
     FCP 0,3s / LCP 0,8s. A11y 97, Best Practices 92, SEO 100.
   - Lokalny A/B (ta sama maszyna, build prod): baseline 803f7a3 PERF 59 /
     LCP 4,7s / TBT 780ms vs świat B PERF 52-53 / LCP 4,7-5,0s / TBT ~1200ms.
     TBT-delta NIE materializuje się u Google (60ms live) — artefakt 4x throttlingu.
   - LCP identyczne przed/po → redesign NIE pogorszył LCP.
   - USTALENIE: elementem LCP jest H1 maszyny pisania (h1.sf-write) — litery
     niewidoczne do dopisania, LCP czeka na koniec animacji (elementRenderDelay
     1,7s lokalnie, ~6s na throttlingu PSI). To stan sprzed redesignu; to ON
     ogranicza PSI mobile do ~73. Możliwy fix bez zmiany mechanizmu (SSR-widoczne
     litery przy pierwszym paintcie, typing po hydracji — LCP spada do ~1,5s,
     kosztem mignięcia pełnego H1 na wolnych telefonach) — DECYZJA PAWŁA.

7. [DONE 2026-08-05] GSC przez konto usługi DZIAŁA (API włączone przez Pawła):
   pierwszy raport oddany — 28 dni: 18 klik / 1139 wyśw / CTR 1,6% / śr. poz. 22,7.
8. [DONE 2026-08-05] Umami live i ZBIERA (dowód: gateway.umami.is/api/send → 200).
   Po drodze złapany bug: beacony szły na gateway.umami.is, a CSP przepuszczał
   tylko api-gateway.umami.dev (nieaktualne) → fix connect-src *.umami.is
   (commit 8be66f5). Website ID jest z założenia publiczne (i tak siedzi w HTML).
9. [DONE 2026-08-05] Kreska FAQ na scaleY zamiast height (hook impeccable),
   commit 1883e0d; zweryfikowane w realnym Chrome (uwaga: ukryta karta mrozi
   DocumentTimeline — transition wisi na 0; weryfikować na wysunietej karcie).

## Czeka na Pawła
- Decyzja: fix LCP maszyny pisania (opcja B powyżej) — tak/nie.
- Ahrefs Webmaster Tools: wybrać "Import from GSC" (instrukcja podana).
- "Pandy → robociki pixel-art z uściskiem dłoni": NIE ZNALEZIONE w żadnym repo
  (SF WWW, KNF, Fizjoplan, Papi) — czekam na wskazanie, gdzie ta animacja jest.

## Otwarte drobiazgi (nie blokują)
- PNG logo 1.4-1.8MB w public/brand (kandydat do kompresji)
- martwy kod: VideoBackground, bg-metal-sheen, bg-scrim-* (po ŚWIECIE B sprawdzić
  też nieużywane klasy jasnego świata)
- --ease-spring (bounce) w tokenach — do decyzji Pawła
- audyt impeccable nowego globals.css (obiecany post-merge)

## Kontekst techniczny (dla wznowienia)
- Ostatni commit: 15014db (ŚWIAT B + fix overflow + tools/)
- tools/: gsc-raport.js, gsc-sites.js, bing-raport.js (klucze TYLKO ze ścieżki,
  zero sekretów w repo); klucz GSC: C:\Users\Paweł Pieloch\.sekrety\
  simplefastai-seo-e271ff1f5e28.json; Bing: .sekrety\bing-api-key.txt
- Makiety świata B: zrodla/makiety-b/1-hero.png … 5-final.png (gitignore)
- Raporty Lighthouse A/B w scratchpadzie sesji (lh-baseline/lh-swiatb*/lh-full.json)
