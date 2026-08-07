# PLAN DANYCH DO SEKCJI PROBLEM (decyzja D12)

Data: 2026-08-07. Autor: agent researchu, partia G2.
Zakres: TYLKO ten plik. Kodu nie ruszałem (równolegle biegnie runda naprawcza
w `app/**`, `components/sections/**`, `app/globals.css`).

## PODSUMOWANIE W TRZECH ZDANIACH

1. Zdanie „Większość małych firm traci kilkanaście godzin tygodniowo na to samo"
   (`components/sections/Problem.tsx`, linia 59) nie ma i nie może mieć źródła,
   bo takiej statystyki po prostu nie ma w żadnym publicznym badaniu. Do usunięcia.
2. Znalazłem 12 danych, które da się zacytować z nazwą instytucji, rokiem i adresem.
   Dziewięć z nich sprawdziłem czytając ORYGINALNY dokument (PDF GUS, strona Eurostatu,
   strona Fed), nie streszczenie w prasie.
3. Rekomenduję cztery liczby na stronę: trzy o Polsce i Unii (GUS, Eurostat) plus jedna
   o postawie przedsiębiorców (PIE). Wszystkie z 2025 roku, wszystkie publiczne.

## CO USUWAMY

| Gdzie | Co dziś jest | Problem |
|---|---|---|
| `components/sections/Problem.tsx:59` | „Większość małych firm traci kilkanaście godzin tygodniowo na to samo:" | Liczba bez źródła. Łamie żelazną zasadę „zero zmyślonych liczb". Nie da się jej podeprzeć, bo żadne badanie GUS, Eurostatu ani PIE nie mierzy „godzin traconych tygodniowo przez małe firmy". |

---

## DANE PRZYJĘTE

Każda pozycja: liczba, gotowe zdanie po polsku, źródło, rok, URL, wiarygodność, po co nam to.

### D-1. Polska kontra Unia: 8,4 procenta wobec 20 procent

- **Liczba:** 20,0 procent firm w UE, 8,4 procenta firm w Polsce (firmy od 10 pracujących).
- **Zdanie na stronę:** „W 2025 roku z technologii AI korzystało 20 procent firm w Unii
  Europejskiej i 8,4 procenta firm w Polsce."
- **Źródło:** Eurostat, komunikat „20% of EU enterprises use AI technologies"
- **Rok:** 2025 (dane za 2025, publikacja 11.12.2025)
- **URL:** https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2
- **Wiarygodność:** wysoka. Urząd statystyczny Unii, badanie na 157 tysiącach firm.
  Przeczytałem oryginalny komunikat, nie relację prasową.
- **Po co nam to:** pokazuje, że firma, która wdroży AI dziś, jest przed 9 na 10
  konkurentów w Polsce. To jest argument o przewadze, nie o nadganianiu.
- **Kontekst, którego NIE dajemy na stronę (żeby nie straszyć):** Polska jest w trójce
  krajów z najniższym wynikiem, po Rumunii (5,2 procent) i przed Bułgarią (8,5 procent).

### D-2. Tempo: z 13,5 na 20 procent w rok

- **Liczba:** 13,5 procent (2024) do 20,0 procent (2025), wzrost o 6,5 punktu procentowego.
  Dla porównania: 7,7 procent w 2021 roku.
- **Zdanie na stronę:** „W Unii Europejskiej odsetek firm korzystających z AI wzrósł
  z 13,5 procent w 2024 roku do 20 procent w 2025 roku."
- **Źródło:** Eurostat, ten sam komunikat co D-1.
- **Rok:** 2025.
- **URL:** https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251211-2
- **Wiarygodność:** wysoka.
- **Po co nam to:** liczba mówiąca „to się dzieje teraz". Uzasadnia pilność bez straszenia.

### D-3. Duże firmy kontra małe w Unii: 55 kontra 17 procent

- **Liczba:** 17 procent małych firm, 30,36 procent średnich, 55,03 procent dużych (UE, 2025).
- **Zdanie na stronę:** „W Unii Europejskiej z AI korzysta 55 procent dużych firm
  i tylko 17 procent małych."
- **Źródło:** Eurostat, Statistics Explained, „Use of artificial intelligence in enterprises"
- **Rok:** 2025 (dane pobrane w grudniu 2025)
- **URL:** https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises
- **Wiarygodność:** wysoka.
- **Po co nam to:** to jest dokładnie luka, którą zamykamy. Duża firma ma dział IT,
  mała ma nas.

### D-4. Polska: 8,7 procenta firm, rok wcześniej 5,9

- **Liczba:** 8,7 procent (2025), 5,9 procent (2024).
- **Zdanie na stronę:** „W 2025 roku 8,7 procenta firm w Polsce zadeklarowało korzystanie
  z technologii AI. Rok wcześniej było to 5,9 procenta."
- **Źródło:** Główny Urząd Statystyczny, „Społeczeństwo informacyjne w Polsce w 2025 r."
- **Rok:** 2025 (publikacja 16.12.2025; ta sama liczba jest w informacji sygnalnej z 21.10.2025)
- **URL:** https://stat.gov.pl/obszary-tematyczne/nauka-i-technika-spoleczenstwo-informacyjne/spoleczenstwo-informacyjne/spoleczenstwo-informacyjne-w-polsce-w-2025-r-,1,19.html
- **Wiarygodność:** wysoka. Cytat z oryginalnego PDF GUS, który otworzyłem i odczytałem:
  „W 2025 r. 8,7% przedsiębiorstw deklarowało wykorzystanie technologii sztucznej inteligencji."
- **Po co nam to:** polska liczba od polskiego urzędu. Najmocniejszy dowód dla polskiego klienta.
- **Uczciwe zastrzeżenie:** badanie GUS obejmuje firmy od 10 pracujących. Mikrofirm nie liczy.
  Jeśli kiedyś napiszemy „wszystkie polskie firmy", to będzie nadużycie.

### D-5. Polska według wielkości: 6,1 procenta małych, 42 procent dużych

- **Liczba:** małe 6,1 procent (2024: 4,0), średnie 15,6 procent (2024: 10,4),
  duże 42,0 procent (2024: 33,0).
- **Zdanie na stronę:** „W Polsce z AI korzysta 42 procent dużych firm i tylko
  6,1 procenta małych."
- **Źródło:** GUS, „Społeczeństwo informacyjne w Polsce w 2025 r.", wykres 63.
- **Rok:** 2025.
- **URL:** https://stat.gov.pl/obszary-tematyczne/nauka-i-technika-spoleczenstwo-informacyjne/spoleczenstwo-informacyjne/spoleczenstwo-informacyjne-w-polsce-w-2025-r-,1,19.html
- **Wiarygodność:** wysoka. Cytat z PDF GUS: „Największy udział podmiotów korzystających
  z narzędzi AI odnotowano wśród podmiotów dużych (42,0%) (...), natomiast najmniejszy
  wśród podmiotów małych (6,1%)".
- **Po co nam to:** to jest liczba świata naszego klienta. Mówi wprost: różnica między
  dużą a małą firmą to nie technologia, tylko to, czy ktoś jej to wdrożył.

### D-6. Do czego polskie firmy używają AI

- **Liczba:** marketing i sprzedaż 5,0 procent firm, generowanie tekstu lub głosu
  5,3 procent, logistyka 0,8 procent.
- **Zdanie na stronę:** „Polskie firmy sięgają po AI najczęściej w marketingu i sprzedaży
  (5 procent firm), a najrzadziej w logistyce (0,8 procenta)."
- **Źródło:** GUS, „Społeczeństwo informacyjne w Polsce w 2025 r."
- **Rok:** 2025.
- **URL:** https://stat.gov.pl/obszary-tematyczne/nauka-i-technika-spoleczenstwo-informacyjne/spoleczenstwo-informacyjne/spoleczenstwo-informacyjne-w-polsce-w-2025-r-,1,19.html
- **Wiarygodność:** wysoka (odczytane z PDF).
- **Po co nam to:** uzasadnia kolejność naszej oferty. Chatboty, voiceboty i treści to
  dokładnie to, po co firmy sięgają najpierw. Dobra dana na podstronę usług, nie na home.

### D-7. Mapa Polski: 12,5 procent na Mazowszu, 5,1 procent u nas

- **Liczba:** mazowieckie 12,5 procent, warmińsko-mazurskie 5,1 procent (najniżej w kraju).
- **Zdanie na stronę:** „Najwięcej firm z AI jest na Mazowszu (12,5 procenta), najmniej
  w warmińsko-mazurskim (5,1 procenta). Nasza siedziba jest w tym drugim."
- **Źródło:** GUS, „Społeczeństwo informacyjne w Polsce w 2025 r.", mapa 22.
- **Rok:** 2025.
- **URL:** https://stat.gov.pl/obszary-tematyczne/nauka-i-technika-spoleczenstwo-informacyjne/spoleczenstwo-informacyjne/spoleczenstwo-informacyjne-w-polsce-w-2025-r-,1,19.html
- **Wiarygodność:** wysoka (odczytane z PDF).
- **Po co nam to:** siedziba firmy to Pisz, warmińsko-mazurskie (`lib/site.ts`).
  Szczera lokalna kotwica: „budujemy AI tam, gdzie jest go najmniej".
  **WYMAGA DECYZJI PAWŁA:** to może brzmieć jako atut („robimy to od podstaw")
  albo jako minus („z zapadłego regionu"). Ja rekomenduję, ale nie wstawię bez zgody.

### D-8. Ile czasu realnie odzyskuje człowiek pracujący z AI

- **Liczba:** średnio 5,4 procent godzin pracy, czyli około 2,2 godziny tygodniowo
  przy 40-godzinnym tygodniu. 20,5 procent użytkowników deklaruje 4 godziny lub więcej.
- **Zdanie na stronę:** „Pracownicy korzystający z AI odzyskują średnio 5,4 procenta godzin
  pracy, czyli około 2 godziny tygodniowo przy pełnym etacie."
- **Źródło:** Federal Reserve Bank of St. Louis, „The Impact of Generative AI
  on Work Productivity" (Bick, Blandin, Deming)
- **Rok:** 2025 (publikacja 27.02.2025, badanie z listopada 2024)
- **URL:** https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity
- **Wiarygodność:** wysoka jako badanie (bank centralny USA, próba reprezentatywna dla kraju),
  ale **dane amerykańskie i deklaratywne** (ludzie sami szacują, ile by im zajęło bez AI).
- **Po co nam to:** jedyna wiarygodna liczba o ODZYSKANYM CZASIE, a to jest oś całej sekcji
  Problem. Zastępuje wymyślone „kilkanaście godzin" prawdziwym „około dwie godziny".
- **WYMAGA DECYZJI PAWŁA:** to jest mniej efektowna liczba niż ta wymyślona.
  Dwie godziny brzmią skromnie. Za to są prawdziwe i nikt nam ich nie podważy.

### D-9. Ile pracy w ogóle idzie dziś przez AI

- **Liczba:** udział godzin pracy z AI wzrósł z 4,1 procent (listopad 2024) do 5,7 procent
  (sierpień 2025). Licząc razem z osobami, które AI nie używają, oszczędność to 1,6 procent
  wszystkich godzin pracy, co przekłada się na wzrost produktywności do 1,3 procent.
- **Zdanie na stronę:** „W USA udział godzin pracy wspieranych przez AI wzrósł z 4,1 procent
  w listopadzie 2024 do 5,7 procent w sierpniu 2025."
- **Źródło:** Federal Reserve Bank of St. Louis, „The State of Generative AI Adoption in 2025"
- **Rok:** 2025 (publikacja 13.11.2025)
- **URL:** https://www.stlouisfed.org/on-the-economy/2025/nov/state-generative-ai-adoption-2025
- **Wiarygodność:** wysoka, ale dane amerykańskie.
- **Po co nam to:** dobre na blog albo podstronę „jak wygląda świat AI". Na home za dużo
  niuansu.

### D-10. 77 procent firm bez AI nie planuje jej wdrażać

- **Liczba:** 77 procent przedsiębiorców niestosujących AI nie planuje wdrożenia,
  dopóki nie będzie to konieczne. Firmy używające AI 2,5 raza częściej obsługują
  klientów zagranicznych.
- **Zdanie na stronę:** „77 procent polskich przedsiębiorców, którzy nie używają AI,
  nie planuje wdrożenia, dopóki nie stanie się konieczne."
- **Źródło:** Polski Instytut Ekonomiczny, raport „AI w polskich przedsiębiorstwach"
- **Rok:** 2025 (komunikat prasowy 24.09.2025)
- **URL:** https://pie.net.pl/z-ai-korzysta-mniej-niz-co-szosta-firma-w-polsce-a-pozostale-nie-planuja-jej-wdrazac/
- **Wiarygodność:** wysoka. PIE to publiczny instytut analityczny, raport dostępny w PDF.
- **Po co nam to:** to najmocniejsza liczba sprzedażowa z całej listy. Mówi klientowi:
  „większość Twojej konkurencji świadomie czeka. Możesz ich wyprzedzić decyzją, nie budżetem".

### D-11. Cel Unii: 75 procent firm do 2030 roku

- **Liczba:** cel Cyfrowej Dekady to 75 procent firm w UE korzystających z chmury,
  big data lub AI do 2030 roku. W 2025 roku podstawowy poziom cyfryzacji osiągnęło
  71 procent małych i średnich firm w UE, przy celu ponad 90 procent.
- **Zdanie na stronę:** „Unia chce, żeby do 2030 roku 75 procent firm korzystało z chmury,
  big data lub AI. W 2025 roku podstawowy poziom cyfryzacji miało 71 procent
  małych i średnich firm."
- **Źródło:** Eurostat, „Towards Digital Decade targets for Europe" (program Cyfrowa Dekada
  Komisji Europejskiej)
- **Rok:** 2026 (dane za 2025, pobrane w czerwcu 2026)
- **URL:** https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Towards_Digital_Decade_targets_for_Europe
- **Wiarygodność:** wysoka.
- **Po co nam to:** pokazuje kierunek regulacyjny i to, że wdrożenie AI nie jest fanaberią,
  tylko celem publicznym. Dobre na podstronę o dofinansowaniach, nie na home.

### D-12. Cyfrowa baza polskiej firmy (pod usługę stron www)

- **Liczba:** ponad dwie trzecie firm w Polsce ma stronę internetową, 47,8 procent ma konto
  w mediach społecznościowych, 55,3 procent kupiło usługi w chmurze.
- **Zdanie na stronę:** „W 2025 roku ponad dwie trzecie firm w Polsce miało stronę
  internetową, a 47,8 procenta konto w mediach społecznościowych."
- **Źródło:** GUS, „Społeczeństwo informacyjne w Polsce w 2025 r.", informacja sygnalna
- **Rok:** 2025 (publikacja 21.10.2025)
- **URL:** https://stat.gov.pl/obszary-tematyczne/nauka-i-technika-spoleczenstwo-informacyjne/spoleczenstwo-informacyjne/spoleczenstwo-informacyjne-w-polsce-w-2025-r-,2,15.html
- **Wiarygodność:** wysoka (odczytane z PDF GUS).
- **Po co nam to:** uzasadnienie dla usługi „strony www pod SEO/AEO/GEO". Nie na sekcję Problem.

---

## DANE ODRZUCONE I DLACZEGO

Odrzucam wszystko, czego nie umiem przypiąć do konkretnego dokumentu albo co ma wadę metody.

| Dana | Skąd krąży | Dlaczego odrzucam |
|---|---|---|
| „Firmy w Polsce poświęcają 4552 godziny rocznie na raportowanie" | Grant Thornton i Polsko-Szwajcarska Izba Gospodarcza, raport „Tax compliance in Poland", 22.06.2020 | Próba to **32 szwajcarskie firmy działające w Polsce**, głównie duże, dane z 2020 roku. Przypisanie tego małej polskiej firmie byłoby manipulacją. |
| „Średnia firma wysyła do urzędów 208 dokumentów rocznie" | Grant Thornton i Konfederacja Lewiatan, 11.02.2020 (dane za 2019) | Sześć lat stare i dotyczy firm 50-249 osób, czyli nie naszego klienta. |
| „Prawie 40 procent czasu pracy zajmują powtarzalne zadania administracyjne" | Krąży po polskich portalach | **Nie znalazłem źródła pierwotnego.** Tylko wtórne wzmianki bez nazwy badania. Nie wolno tego użyć. |
| „88 procent organizacji używa AI w co najmniej jednej funkcji" | McKinsey, „The State of AI in 2025" | Liczba prawdopodobnie prawdziwa, ale **nie udało mi się otworzyć oryginalnego raportu** (mckinsey.com blokuje pobranie). Mam ją tylko z relacji prasowych. Do użycia dopiero po odczytaniu raportu ze źródła. |
| „Firmy odpowiadające na leada w ciągu godziny mają 7 razy większą szansę na kwalifikację" | Harvard Business Review, „The Short Life of Online Sales Leads", marzec 2011 (audyt 2241 firm w USA) | Badanie porządne, ale **z 2011 roku i z rynku USA**. Wiarygodność ŚREDNIA. Do użycia tylko z jawną datą w podpisie i tylko za zgodą Pawła. Pasowałoby pod voiceboty i chatboty. |
| Cokolwiek o naszych własnych wdrożeniach | - | Nie mamy jeszcze zmierzonych efektów. Zgodnie z D12: zero danych o sobie, dopóki ich nie mamy. |

---

## GOTOWA SEKCJA DO WSTAWIENIA

### Nagłówek (jedno mocne zdanie)

> **Duże firmy już mają AI. Małe wciąż robią to samo ręcznie.**

Podnagłówek (opcjonalny, jedna linia):

> Cztery liczby z publicznych badań. Nie z naszych obietnic.

### Cztery kafelki

| # | Liczba | Podpis | Mikroźródło |
|---|---|---|---|
| 1 | **8,7%** | polskich firm korzystało z AI w 2025 roku. Rok wcześniej 5,9 procenta. | GUS, 2025 |
| 2 | **6,1% / 42%** | Tyle małych i tyle dużych firm w Polsce używa AI. To nie różnica technologii, tylko wdrożenia. | GUS, 2025 |
| 3 | **8,4% / 20%** | Tyle firm używa AI w Polsce i tyle w całej Unii Europejskiej. | Eurostat, 2025 |
| 4 | **77%** | Tylu przedsiębiorców bez AI nie planuje wdrożenia, dopóki nie będzie musiało. | Polski Instytut Ekonomiczny, 2025 |

Wariant zamienny dla kafelka 4 (jeśli Paweł woli liczbę o czasie, a nie o postawie):

| 4b | **~2 h / tydzień** | Tyle czasu odzyskuje przeciętnie pracownik korzystający z AI (5,4 procenta godzin pracy). | Federal Reserve Bank of St. Louis, 2025 |

Rekomenduję zestaw 1, 2, 3, 4. Powód: trzy pierwsze liczby są polskie i unijne, czwarta
mówi o decyzji, a nie o technologii, więc domyka sekcję sprzedażowo. Wariant 4b jest
uczciwy, ale przenosi rozmowę na dane amerykańskie i brzmi skromniej.

### Zasady prezentacji (żeby to działało pod SEO/AEO/GEO)

1. Podpis źródła ma być WIDOCZNY przy liczbie, nie w stopce sekcji. Model językowy
   cytujący naszą stronę musi mieć nazwę instytucji i rok obok liczby.
2. Nazwa instytucji pełnym brzmieniem przy pierwszym wystąpieniu:
   „Główny Urząd Statystyczny (GUS)", potem sam skrót.
3. Podpis niech będzie linkiem do dokumentu źródłowego (`rel="nofollow"` nie jest potrzebny,
   to instytucje publiczne, link do nich to sygnał wiarygodności).
4. Każda liczba dostaje rok W TREŚCI, nie tylko w podpisie. Za rok trzeba to odświeżyć.

### Gdzie to wstawić w sekcji Problem

Kolejność, która nie psuje istniejącej narracji (`components/sections/Problem.tsx`):

1. H2 (bez zmian): „Ile czasu w tygodniu zjada Ci robota, którą mógłby robić ktoś inny?"
2. Lead (NOWY, patrz niżej), kończy się dwukropkiem.
3. Trzy istniejące kafelki `ZJADACZE` (bez zmian).
4. Karta domykająca „To nie jest praca, która rozwija firmę..." (bez zmian).
5. **NOWY blok danych: nagłówek plus cztery kafelki z liczbami.**
6. Walec cytatów `CytatyWalec` (bez zmian).
7. Mostek do diagnozy z CTA (bez zmian).

Uzasadnienie kolejności: najpierw ból opowiedziany po ludzku (kafelki i cytaty),
dopiero potem twarde liczby jako dowód. Odwrotnie sekcja zaczynałaby się od tabelki
i traciła emocję, o którą chodzi w tej sekcji.

---

## CZYM ZASTĄPIĆ OBECNĄ NIEPOPARTĄ STATYSTYKĘ

Plik: `components/sections/Problem.tsx`, linia 59.

**Było:**

> Większość małych firm traci kilkanaście godzin tygodniowo na to samo:

**Ma być (rekomendacja):**

> W małych firmach czas najczęściej zjadają trzy rzeczy:

Dlaczego tak:
- Zachowuje dwukropek, więc trzy istniejące kafelki `ZJADACZE` dalej się z nim wiążą.
- Nie dodaje żadnej liczby, więc nie potrzebuje źródła i nie da się jej podważyć.
- Nie zmienia struktury sekcji ani długości bloku, więc nie rusza układu.
- Liczby wchodzą osobnym blokiem niżej, każda z podpisem, tam gdzie ich miejsce.

**Wariant B (jeśli Paweł chce liczbę już w leadzie):**

> W Polsce z AI korzysta 6,1 procenta małych firm (GUS, 2025). Reszta wciąż robi ręcznie to samo:

Uwaga do wariantu B: dokłada mniej więcej 80 znaków do leadu i wprowadza nawias ze źródłem
w miejscu, gdzie do tej pory był czysty tekst. Czytelniej wygląda wariant rekomendowany.

---

## CO WYMAGA ZGODY WŁAŚCICIELA PRZED PUBLIKACJĄ

| Dana | Dlaczego pytam |
|---|---|
| **D-7, warmińsko-mazurskie 5,1 procent** | To prawda i mocna lokalna kotwica, ale można to przeczytać jako minus naszego regionu. Decyzja jest wizerunkowa, nie faktograficzna. |
| **D-8, około 2 godziny tygodniowo (Fed)** | Zastępuje wymyślone „kilkanaście godzin" prawdziwym, ale znacznie skromniejszym „około dwie". Paweł powinien świadomie zaakceptować, że prawdziwa liczba jest mniej efektowna. Dodatkowo to dane z USA, więc podpis musi to mówić. |
| **HBR 2011, siedmiokrotnie większa szansa przy odpowiedzi w godzinę** | Wiarygodność średnia (rok 2011, rynek USA). Jeśli wchodzi, to tylko z widoczną datą 2011. |
| **Wybór kafelka 4 albo 4b** | Dwa różne przekazy: „konkurencja czeka" kontra „odzyskujesz czas". Decyzja sprzedażowa. |
| **Czy w ogóle podajemy, że Polska jest w trójce od końca w UE** | To prawda z Eurostatu, ale na stronie sprzedażowej może brzmieć jak narzekanie na własny rynek. Ja bym tego nie dawał, samo zestawienie 8,4 kontra 20 wystarczy. |

---

## UTRZYMANIE DANYCH

- Eurostat aktualizuje artykuł o AI w firmach raz w roku, planowana kolejna aktualizacja:
  grudzień 2026. Wtedy liczby D-1, D-2, D-3 trzeba podmienić.
- GUS publikuje „Społeczeństwo informacyjne w Polsce" raz w roku, kolejna edycja
  spodziewana w październiku i grudniu 2026. Wtedy D-4, D-5, D-6, D-7, D-12.
- PIE publikuje nieregularnie, D-10 sprawdzić przy najbliższym przeglądzie treści.
- Zasada: jeśli liczba ma więcej niż dwa lata, albo ją odświeżamy, albo zdejmujemy.
  Stara liczba z podpisem „2025" na stronie w 2028 roku szkodzi bardziej, niż pomaga.

## CO ZOSTAŁO ZWERYFIKOWANE, A CO NIE

Zweryfikowane przez odczytanie oryginalnego dokumentu (nie streszczenia):
D-1, D-2 (komunikat Eurostatu), D-3 (Statistics Explained Eurostatu),
D-4, D-5, D-6, D-7, D-12 (PDF GUS, tekst wyciągnięty i odczytany),
D-8, D-9 (strony Federal Reserve Bank of St. Louis),
D-10 (komunikat PIE), D-11 (Statistics Explained Eurostatu).

NIEZWERYFIKOWANE: liczba McKinseya (88 procent organizacji używa AI). Serwis mckinsey.com
zrywa połączenie przy próbie pobrania, więc mam ją tylko z relacji prasowych.
Do publikacji dopiero po otwarciu raportu ze źródła.
