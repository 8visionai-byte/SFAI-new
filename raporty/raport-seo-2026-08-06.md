# Raport SEO — simplefast.ai (2026-08-06)

Źródła: Google Search Console (konto usługi, 28 dni), Bing Webmaster API,
Ahrefs Site Audit (pierwszy crawl, dziś), Umami (zbiera od wczoraj).

## 1. Gdzie jesteśmy (twarde liczby)

- GSC 28 dni: **18 kliknięć, 1139 wyświetleń, CTR 1,6%, średnia pozycja 22,7**.
  37 stron w indeksie. Wyświetlenia +1380% m/m — Google dopiero „poznaje" domenę.
- Kliknięcia to prawie wyłącznie marka („simple fast ai", pozycja 1,0).
- Bing: praktycznie zero (1 wyświetlenie 28.07, potem cisza).
- Ahrefs: Domain Rating 18, 114 domen linkujących (+67 w 30 dni — dobra dynamika),
  ale **Health Score 37/100**.
- Umami: podpięte, zbiera od 2026-08-05 (za tydzień pierwszy raport zachowań).

## 2. NAPRAWIONE DZIŚ OD RĘKI (systemowy błąd techniczny)

Ahrefs pokazał: „Canonical points to redirect" ×48 i „3XX redirect in sitemap"
×46 — czyli 95 ze 101 adresów z błędem. Przyczyna: strona żyje na
**www.simplefast.ai**, a kod generował canonicale i sitemapę na wersji BEZ www
(która robi przekierowanie 308). Google dostawał na każdej stronie sprzeczny
sygnał „kanoniczny jest inny adres, który się przekierowuje" — to hamowało
indeksację i rozmywało pozycje.

Fix (commit e5a8b39, już na produkcji): SITE.url → www (ciągnie za sobą
canonicale, sitemapę, OG, schema), robots.txt, llms.txt (25 adresów).
Efekt będzie widoczny w GSC w 1-3 tygodnie (ponowne przecrawlowanie).
Po następnym crawlu Ahrefs Health Score powinien skoczyć z 37 do ~90+.

## 3. Na co się pozycjonować (realne szanse z danych, nie z sufitu)

Frazy, na które Google JUŻ nas pokazuje, ale za nisko, żeby ktoś klikał:

| Grupa fraz | Wyświetlenia/mc | Pozycja | Strona | Cel |
|---|---|---|---|---|
| chatbot (ai) dla firm/firmy, na stronę | ~250 | 12–33 | /uslugi/chatboty | top 10 |
| audyt AI: mapa wąskich gardeł… | ~195 | 19–25 | /uslugi/audyt-ai | top 10 |
| bot telefoniczny, bot do odbierania | ~65 | 16–39 | /uslugi/voiceboty | top 10 |
| ai chatbot dla biznesu / małej firmy | ~25 | 18–33 | /uslugi/chatboty | top 10 |
| agencja automatyzacji procesów | ~5 | 40 | / | obserwować |

To jest ta sama historia na wszystkich: strona trafna, autorytet za mały,
sygnały do dziś rozmyte przez błąd canonical/sitemap. Priorytet 1 = chatboty
(największy wolumen), 2 = audyt (fraza z dokładnym tytułem naszej strony!),
3 = voiceboty.

## 4. Co poprawić w sekcjach (DO TWOJEJ AKCEPTACJI — treści nie ruszam sam)

1. **/uslugi/chatboty**: brakuje odpowiedzi wprost na „ile kosztuje chatbot dla
   firmy" wysoko na stronie (fraza z 33 wyśw. na poz. 12 — najbliżej top 10).
   Propozycja: sekcja FAQ na tej stronie z pytaniem o cenę + o czas wdrożenia
   (schema FAQ już umiemy). Drugie: 2-3 linki z wpisów bloga z anchorami
   „chatbot AI dla firmy" (mamy wpis o kosztach chatbota — podlinkować mocniej).
2. **/uslugi/voiceboty**: w treści dominuje słowo „voicebot", a ludzie szukają
   „**bot telefoniczny**" (32 wyśw.) — proponuję naturalnie wpleść tę frazę
   w jeden H2 i 1-2 zdania (bez psucia stylu). Do Twojej zgody.
3. **/uslugi/audyt-ai**: fraza-tytuł ma 195 wyśw. na poz. ~19-25 — tu wystarczy
   autorytet: linkowanie wewnętrzne ze WSZYSTKICH wpisów blogowych, które
   wspominają audyt/diagnozę, plus 1-2 linki zewnętrzne.
4. **Meta descriptions za długie ×36** (Ahrefs): skrócić do ~155 znaków —
   mechaniczna poprawka, mogę zrobić hurtowo po Twoim OK (to zmiana meta,
   nie treści widocznej).
5. **19 stron ma tylko 1 link wewnętrzny** (Ahrefs): dołożyć linkowanie
   krzyżowe blog ↔ usługi ↔ narzędzia (mogę przygotować mapę linków).
6. **Bing = 0**: strona jest w Bing WMT, ale bez ruchu. Po deployu fixu www
   wyślę sitemapę ponownie w panelu Binga; rozważ IndexNow (darmowe, natychmiastowe
   indeksowanie — mogę wdrożyć endpoint).
7. **Linki zewnętrzne**: DR 18, +67 domen w 30 dni — utrzymać tempo; najtańsze
   naturalne źródła: katalogi firm AI, wpisy gościnne, profile branżowe.

## 5. Czego NIE ruszamy

- Treści i struktura stron — wg Twojej dyrektywy „na tym etapie nie zmieniamy
  SEO" wszystkie punkty z sekcji 4 czekają na Twoje osobne „rób".
- Maszyna pisania H1 i nowy design nie kolidują z SEO: po redesignie INFINITY
  PSI mobile 90, SEO 100, treść w HTML bez zmian.

## 6. Rytm raportów

Na hasło „raport GSC" oddaję świeże liczby w minutę (tools/gsc-raport.js).
Proponuję stały rytm: co poniedziałek GSC + raz w miesiącu Ahrefs po crawlu
(następny automatyczny: 13.08) + Umami po 7 dniach zbierania.
