# DECYZJE PAWŁA — odpowiedzi na pytania z MASTER-PLANU (2026-08-07)

Zapisane z jego wypowiedzi. To jest WIĄŻĄCE wejście dla fazy wykonawczej.
Gdzie Paweł delegował decyzję do danych („niech SEO powie"), rozstrzyga
raporty/raport-seo-2026-08-07.md, a wybór trzeba UZASADNIĆ liczbą.

## DYREKTYWA NADRZĘDNA (cytat, obowiązuje ponad wszystkim)
„Ma być schludne, ładne, mocne pod SEO, ma nam generować leady. Nie interesuje
mnie nic innego. Ma być pięknie, designersko dla człowieka, który wejdzie,
że możemy się tym pochwalić, i ma być magnesem na leady. Ma ściągać ludzi jak
magnes, że ktoś zobaczy: Jezu, jaka piękna strona, wchodzę. Ma być czytelna
i wyglądać mega profesjonalnie i mocno."
Wniosek wykonawczy: na home zostaje czystość i struktura pod SEO; rzeczy zbędne
porządkujemy albo przenosimy do właściwych sekcji, nie kasujemy bez powodu.

## D1 — SYSTEM CTA: SPÓJNOŚĆ, NIE KASOWANIE
Decyzja: główny przycisk to „Umów bezpłatną diagnozę". „Pokaż mi, gdzie tracę
czas" ZOSTAJE PRZYCISKIEM (Paweł wprost: „może nie, też mają być to przyciski"),
nie schodzi do mikrokopii. Osiem różnych etykiet to za dużo, ale przyciski mają
zostać tam, gdzie są adekwatne do miejsca na stronie.
Do zrobienia: zbudować SYSTEM CTA (główny / drugorzędny / w karcie), policzyć
powtórzenia, usunąć duplikaty tej samej akcji obok siebie, ujednolicić wygląd
i zachowanie. Kryterium odbioru: lista wszystkich CTA na stronie z przypisaniem
do poziomu systemu, zero dwóch różnych etykiet dla tej samej akcji.

## D2 — CENY NA HOME: DECYZJA DELEGOWANA DO DANYCH SEO
Paweł: „ceny można pokazywać dopiero w usługach, jak się wejdzie głębiej.
Ale jeżeli SEO jest mocniejsze, gdy pokażemy ceny, to jak najbardziej trzeba je
pokazać. Zadecyduj, niech SEO powie, co jest lepsze."
Do zrobienia: rozstrzygnąć na podstawie raportu SEO (frazy cenowe, intencja
zapytań, CTR) i ZAPISAĆ uzasadnienie z liczbą. Domyślnie: na home podajemy
zakres/kotwicę cenową tam, gdzie fraza cenowa realnie występuje w danych,
a pełne cenniki zostają na podstronach usług.

## D4 — KORPUS KARTY: TAK, ALE Z PRZEBICIEM 5-10 PROCENT
Paweł: „korpus karty to taka dziura powinna być. Chociaż może nie jeden do
jednego, bo widać, że to jest jakaś ramka. Jakieś 10 procent przebicia, może
5 procent, żeby widać było, że to jest ramka."
Do zrobienia: karta dostaje własny korpus, ale LEKKI — tło karty ma być
odróżnialne od tła strony o około 5-10 procent, nie pełny korpus wzorca.
Kryterium: różnica jasności tła karty i tła strony mierzalna, kontrast tekstu
opisu nadal >= 4.5:1 (policzyć i podać liczbę).

## D5 — SEKCJA „SPRAWDŹ, KTÓREGO AGENTA POTRZEBUJESZ": MA BYĆ REALNY WYBÓR
Paweł: „powinien być tutaj wybór, żeby sprawdzić, jakiego agenta potrzebujesz,
żeby można było sobie wybrać. To trzeba zrobić."
Decyzja MOCNIEJSZA niż rekomendacja nadzorcy (on proponował tylko zmianę
etykiety przycisku na „Porównaj wszystkie usługi"). Do zrobienia: sekcja ma
dawać faktyczny wybór prowadzący do właściwej usługi. Zero nowych treści
marketingowych: pytania i wyniki budujemy z ISTNIEJĄCYCH pól rejestru USLUGI
(nazwa, dla kogo, co robi) i kierujemy na istniejące podstrony.

## D6 — SEKCJA BRANŻ: PRZENIEŚĆ DO PROBLEMU JAKO 4 KAFELKI
Zgoda Pawła wprost. Okno terminala zostaje (nie usuwamy elementu, którego nie
kazał usuwać), sekcja ląduje przy Problemie jako cztery kafelki branż.

## D7 — PORZĄDKI NA HOME: TAK
Paweł: „zbędne rzeczy trzeba uporządkować bądź przesunąć do innych sekcji,
a na głównej zostawić czystość i strukturę głównie pod SEO."
Do zrobienia: pasek zaufania powtarzający chipy z hero znika lub jego treść
wędruje tam, gdzie ma sens. Każde usunięcie z home wymaga wskazania, gdzie
treść wylądowała (albo dlaczego była czystym duplikatem).

## D8 — H1 STRONY GŁÓWNEJ: WOLNO ZMIENIĆ, DECYDUJE SEO
Paweł: „nie musi być budujemy AI agentów, nie chatboty. Może być budujemy AI
agentów dla firm, jeżeli to jest lepsze pod SEO. Nie wiążę się z tymi sloganami."
To ODWRACA rekomendację nadzorcy (D8: zostaw). Do zrobienia: wybrać H1 na
podstawie danych z raportu SEO i uzasadnić liczbą. Warunki brzegowe: H1 jest
elementem LCP (maszyna pisania), więc każdy dodatkowy znak wydłuża animację;
maszyna pisania sama w sobie ZOSTAJE (sygnatura, wielokrotnie potwierdzana).
Podać w raporcie: stary H1, nowy H1, fraza z GSC, która to uzasadnia,
i wpływ na długość animacji.

## D9 — HERO: TRZY PRZYCISKI ZOSTAJĄ
Paweł: „na razie te przyciski można zostawić." Bez zmian.

## D10 — H1 STRONY AUDYTU: ZOSTAJE WARIANT ZALECANY
Paweł: „nie wiem, może zostaw jak jest." Przyjmujemy rekomendację nadzorcy
(„mapa wąskich gardeł i oszczędności czasu"), bez dokładnego dopasowania do
frazy brzmiącej jak konsulting.

## D11 — VOICEBOT NIE DZWONI SAM: PILNA KOREKTA TREŚCI
Paweł wprost: „na razie nie robimy takich voicebotów, które same dzwonią.
Voicebot sam nie dzwoni, bo to byłby skandal. Ewentualnie można ustawić
powiadomienie SMS-owe, a voicebot może zadzwonić, jak ktoś dostanie w SMS-ie
numer."
TO JEST OBIETNICA BEZ POKRYCIA, KTÓRA JEST DZIŚ NA PRODUKCJI. Do zrobienia
PILNIE, sprawdzić i poprawić WSZĘDZIE: `lib/uslugi/voiceboty.ts`,
`api/_knowledge.mjs` (wiedza agenta głosowego), `public/wiedza-agenta.txt`,
oraz każde inne miejsce, gdzie pada „oddzwania do nieodebranych", „kontakt
wychodzący", „dzwoni" w kontekście inicjowania połączenia przez bota.
Zasada zamiany: bot ODBIERA połączenia i obsługuje rozmowę przychodzącą.
Po nieodebranym może pójść POWIADOMIENIE (np. SMS), a rozmowę inicjuje
człowiek albo klient oddzwaniając. Nie wolno pisać, że bot dzwoni sam.
NIE dopisujemy też zdania o potwierdzaniu wizyt telefonicznie przez bota.

## D12 — STATYSTYKA W SEKCJI PROBLEM: RESEARCH I REALNE DANE
Paweł: „zrób research i może jakieś fajne dane zaprezentuj, żeby przedstawić,
jak wygląda świat AI, i poprzyj to liczbami."
Do zrobienia: usunąć niepopartą liczbę „większość małych firm traci kilkanaście
godzin tygodniowo" i zastąpić danymi z WIARYGODNYCH, PUBLICZNYCH źródeł
(raporty branżowe, badania, dane GUS/Eurostat/instytucji), każda liczba
z podaniem źródła i roku, widocznym dla czytelnika. ŻELAZNE: zero liczb bez
źródła, zero danych o naszych własnych wdrożeniach, dopóki ich nie mamy.
Format: sekcja z 3-4 liczbami w kafelkach, każda z podpisem źródła.
