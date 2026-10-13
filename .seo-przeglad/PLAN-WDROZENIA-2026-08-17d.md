# Plan wdrożenia SEO simplefast.ai

**Wersja 2, 2026-08-17.** Wszystkie decyzje biznesowe są już podjęte i wpisane niżej.
Nic nie wymaga dopytywania Pawła. Dokument jest samodzielny: można go wkleić do nowej
sesji Claude Code bez dostępu do rozmowy, w której powstał.

- **Repo:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW` (Next.js App Router, branch `main`)
- **Produkcja:** https://www.simplefast.ai (Vercel, projekt SFAI-new)
- **Tag cofnięcia:** `seo-2026-08-17d` = commit `da5764e`
- **Pełny raport z danymi:** `.seo-przeglad/raporty/2026-08-17d.md`

---

## W trzech zdaniach

Strona rośnie (pozycja 19,5 → 14,6 w trzy miesiące, kliknięcia dziennie +74%), ale ma
23 kliknięcia miesięcznie, więc skala jest wciąż mała. Największy nierozładowany popyt
to **voiceboty: 230+ wyświetleń miesięcznie i zero kliknięć**, bo jedna strona próbuje
rankować na dziesięć różnych intencji. Zanim to ruszymy, trzeba naprawić mapę witryny,
która mówi Google nieprawdę o datach zmian, i wpiąć pomiar konwersji, bo dziś nie wiadomo,
ile osób w ogóle wysyła formularz.

## Tabela zadań

| # | Zadanie | Plik | Warte | Robota |
|---|---|---|---|---|
| 1 | Daty w mapie witryny | `app/sitemap.ts:11` | Odblokowuje resztę | 30 min |
| 2 | Zgłoszenie do indeksacji | `tools/indexnow-ping.js` | Przyspiesza wszystko | 10 min |
| 3 | Zdarzenia konwersji Umami | `components/forms/DiagnozaForm.tsx:105` | Bez tego nie mierzymy pieniędzy | 1 h |
| 4 | Obrazek 1593 kB na każdej stronie | `components/effects/FaviconPulse.tsx:55` | Szybkość | 30 min |
| 5 | Ikony zwracające 404 | `app/layout.tsx:67` | Higiena | 20 min |
| 6 | Podstrony voicebotów | nowe pliki | **230+ wyśw./mies.** | 1-2 dni |
| 7 | Kwota w tytule poradnika o agencie | `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:26` | Poz. 8, CTR 0% | 15 min |
| 8 | Doprecyzowanie ceny voicebota | `lib/uslugi/voiceboty.ts` | Rozjazd z rynkiem | 20 min |

**Gdyby czasu było mało:** zrób 1, 2, 3, potem 4 i 5. Zadanie 6 to osobny większy kawałek.

---

## Zasady pracy

**Zmieniasz tylko:** teksty, metadane, daty w mapie witryny, linki wewnętrzne, zdarzenia
pomiaru, rozmiar jednego obrazka i nowe podstrony z zadania 6.

**Nie ruszasz:** animacji, układu, komponentów wizualnych, przejść, stylów, kolorów,
systemu INFINITY. Zatwierdzone sekcje są zamrożone.

**Uwaga o stanie repo.** W momencie pisania planu w drzewie wisiało 28 niezacommitowanych
plików pracy „INFINITY v17" (m.in. `lib/uslugi/*.ts`, `lib/poradniki/*.ts`,
`components/sections/*`). To praca nad wyglądem, nie nad SEO. **Nie commituj ich przy
okazji.** Commituj wyłącznie pliki, które sam zmieniłeś, wymieniając je po nazwie.
Jeśli już ich nie ma, pracuj normalnie.

---

## ZADANIE 1 — daty w mapie witryny

`app/sitemap.ts:11` ma zaszytą sztywną stałą:

```ts
const TRESC_LAST_MODIFIED = '2026-06-15';
```

Przez to `/uslugi/chatboty` i `/poradniki` raportują Google `lastmod` z **15 czerwca**,
mimo że były zmieniane 16 i 17 sierpnia. Google dostaje sygnał „ta strona stoi od czerwca"
i rzadziej po nią wraca. Każda kolejna poprawka treści czeka przez to dłużej, niż powinna.

**Co zrobić.** Część pliku jest już zrobiona dobrze: poradniki, blog i magnety biorą
`lastModified` z realnych pól rejestru (`p.dataAktualizacji`, `p.data`). Problem dotyczy
tylko sekcji opartych o sztywne stałe `TRESC_LAST_MODIFIED` i `USLUGI_LAST_MODIFIED`.

1. Dodaj do rejestru usług pole `dataAktualizacji: string` (`lib/uslugi/types.ts`
   plus pliki poszczególnych usług), dokładnie tak jak mają to poradniki.
2. Czytaj je w `app/sitemap.ts` zamiast stałej.
3. Ustaw realne daty: `2026-08-17` dla `chatboty`, `voiceboty`, `automatyzacje`,
   `audyt-ai`. Dla reszty zostaw czerwcowe, jeśli faktycznie nie były ruszane.

**Nie używaj `new Date()`.** Plik sam ostrzega o tym w komentarzu przy linii 25: data ma
być realną datą zmiany treści, nie datą builda. Data builda zmienia się przy każdym
deployu i jest sygnałem śmieciowym.

**Sprawdzenie:**
```bash
curl -s https://www.simplefast.ai/sitemap.xml | grep -A1 "uslugi/chatboty"
```
Ma pokazać datę sierpniową, nie `2026-06-15`.

---

## ZADANIE 2 — zgłoszenie do indeksacji

Po zadaniu 1, w tej kolejności:

```bash
node tools/indexnow-ping.js
```

Potem ręcznie w Google Search Console zgłoś do indeksacji:
- `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026`
- `/uslugi/chatboty`

**Kontekst, żeby nie zdiagnozować tego źle.** Poradnik `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026`
ma dziś zero wyświetleń w Search Console. **To nie jest usterka.** Strona w tej formie
powstała 2026-08-16 (commit `5e042c2`), a dane obejmują 28 dni wstecz. Linkowanie do niej
z `/uslugi/chatboty` również już istnieje (`lib/uslugi/chatboty.ts:85`, commit `5337f45`)
i widać je w HTML na produkcji. Nie ma tu czego naprawiać, jest co zgłosić i zmierzyć.

**Sprawdzenie:** za 14 dni ten adres ma mieć niezerowe wyświetlenia w Search Console.

---

## ZADANIE 3 — zdarzenia konwersji w Umami

Umami jest wpięty i liczy odsłony, ale w całym kodzie **nie ma ani jednego wywołania
`umami.track`** (sprawdzone po `umami.track` i `trackEvent` w `app/`, `components/`,
`lib/`, zero trafień). Przez to nie da się odpowiedzieć na pytanie „ile osób wysłało
formularz". Przy 23 kliknięciach miesięcznie to jest ważniejsze niż jakakolwiek zmiana
tytułu, bo bez tego kolejne przeglądy dalej będą oceniać wyświetlenia zamiast pieniędzy.

Dodaj trzy zdarzenia:

| Zdarzenie | Gdzie |
|---|---|
| `wyslano_formularz` | `components/forms/DiagnozaForm.tsx:105`, gałąź sukcesu |
| `klik_telefon` | linki `tel:` (nagłówek, stopka, `/kontakt`) |
| `klik_email` | linki `mailto:` (nagłówek, stopka, `/kontakt`) |

Punkt zaczepienia w formularzu, linia 105:
```ts
.then((res) => setStatus(res.ok ? 'success' : 'error'))
```

Wywołanie musi być odporne na brak Umami (bloker reklam, tryb prywatny), więc zawsze
`window.umami?.track('wyslano_formularz')`, nigdy gołe `umami.track(...)`. Inaczej
wyjątek zabije obsługę formularza i stracisz leada zamiast go zmierzyć.

**Nie zmieniaj** logiki formularza ani `app/api/lead/route.ts`. Endpoint jest napisany
dobrze (honeypot, walidacja, limit 5 zgłoszeń na 10 minut z IP, timeout 5 s, webhook
w zmiennej środowiskowej) i działa.

**Sprawdzenie:** wyślij jedno testowe zgłoszenie na produkcji, zobacz zdarzenie w panelu
Umami, potem usuń testowego leada, żeby nie zaśmiecał lejka.

---

## ZADANIE 4 — obrazek 1593 kB na każdej podstronie

`components/effects/FaviconPulse.tsx:55` wczytuje:
```ts
img.src = '/brand/mark-t.png';
```

Ten plik waży **1593 kB** (potwierdzone na produkcji: HTTP 200, `image/png`) i ładuje się
na **każdej** podstronie. Służy do narysowania faviconu, który i tak renderuje się
w 32 lub 64 pikselach. To trzeci przegląd z rzędu, w którym to wisi.

**Co zrobić.** Dodaj przeskalowaną kopię `public/brand/mark-64.png` (maks. 64x64 px,
docelowo poniżej 10 kB) i wskaż ją w linii 55.

**Nie usuwaj efektu pulsowania** ani nie ruszaj logiki canvas. To ma być podmiana jednej
ścieżki na lżejszy plik.

Przy okazji: `public/brand/` zawiera też `logo-header-t.png` (1441 kB) i `logo-vertical.png`
(1807 kB). Jeśli któryś jest wczytywany bezpośrednio, a nie przez `next/image`, potraktuj
tak samo. `components/layout/Logo.tsx` deklaruje, że idzie przez `next/image`, więc tam
prawdopodobnie jest w porządku.

**Sprawdzenie:**
```bash
curl -sI https://www.simplefast.ai/brand/mark-64.png | grep -i content-length
```
Poniżej 10 kB, a strona wygląda identycznie.

---

## ZADANIE 5 — ikony zwracające 404

`app/layout.tsx:67-68` deklaruje:
```ts
icon: '/favicon.ico',
shortcut: '/favicon.ico',
```

Oba adresy, `/favicon.ico` i `/icon.svg`, zwracają na produkcji **404**. Komentarz w kodzie
przy linii 62 sam to przyznaje i czeka na pliki.

**Co zrobić.** Wygeneruj `favicon.ico` z istniejącego `public/brand/mark-t.png` (oficjalny
znak marki, 1254x1254, kwadrat) i dodaj do `public/`. Alternatywnie usuń deklaracje.
Nie zostawiaj stanu, w którym kod obiecuje plik, którego nie ma.

**Sprawdzenie:** `/favicon.ico` zwraca `200`.

---

## ZADANIE 6 — podstrony voicebotów (największy wzrost)

Jedna strona `/uslugi/voiceboty` próbuje rankować na kilkanaście różnych intencji.
Efekt: 400 wyświetleń, **2 kliknięcia**, średnia pozycja 22,6.

### DECYZJA PAWŁA (wpisana na twardo, nie dopytuj)

SimpleFast buduje voiceboty **indywidualnie pod potrzeby klienta**: potwierdzanie wizyt,
obsługa klienta, rezerwacja kalendarza i inne zastosowania. Nie ma sztywno zdefiniowanego
katalogu produktów.

**Konsekwencja dla treści:** każda podstrona ma opisywać **zastosowanie**, a nie zamknięty
produkt z półki. Ton: „robimy to i to, dopasowujemy do Twojego procesu", nie „mamy gotowy
moduł X". Nie wymyślaj nazw produktów ani pakietów, których nie ma.

**Windykacji nie budujemy w tej turze.** Fraza istnieje (32 wyświetlenia), ale Paweł jej
nie wskazał jako obszaru, w którym chce klientów, a pozycja 32 oznacza i tak długą drogę.
Wrócimy do niej, gdy zadziała reszta.

### Kolejność, wg danych z Search Console

**1. Odbieranie telefonów** (najlepsza szansa, robić pierwsze)

To grupa fraz o **najlepszych pozycjach ze wszystkich**, czyli najbliżej TOP10:

| Fraza | Wyśw. | Pozycja |
|---|---|---|
| bot telefoniczny | 30 | 16,9 |
| bot do odbierania telefonów | 5 | 12,6 |
| voicebot do odbierania telefonów | 4 | 13,3 |
| bot telefoniczny numer | 3 | 15,0 |
| bot telefon | 2 | **8,0** |
| telefon bot | 2 | **8,0** |
| ai do odbierania telefonów | 1 | 12,0 |
| boty dzwoniące na telefon | 1 | 12,0 |

Razem ~48 wyświetleń, pozycje 8-17. To najmniejszy dystans do pierwszej strony
w całym serwisie. Adres: `/uslugi/voiceboty/odbieranie-telefonow`.

**2. Umawianie i potwierdzanie wizyt**

| Fraza | Wyśw. | Pozycja |
|---|---|---|
| voicebot do potwierdzania wizyt | 31 | 30,7 |
| voicebot do umawiania wizyt | 4 | 15,5 |
| usługa odbierania telefonów dla gabinetu | 3 | 43,7 |

Razem ~38 wyświetleń. Adres: `/uslugi/voiceboty/umawianie-wizyt`.
Warto wspomnieć o gabinetach, bo taka fraza realnie pada.

**3. Obsługa klienta 24/7**

| Fraza | Wyśw. | Pozycja |
|---|---|---|
| obsługa klienta 24/7 przez voicebota | 26 | 29,9 |
| voicebot do obsługi klienta | 26 | 44,7 |

Razem 52 wyświetlenia, największy wolumen, ale najdalsze pozycje.
Adres: `/uslugi/voiceboty/obsluga-klienta`.

**4. Cennik voicebota**

Fraza „voicebot cena", 27 wyświetleń, pozycja 34,2.
Adres: `/uslugi/voiceboty/cennik`. Patrz też zadanie 8.

### Jak budować

**Zacznij od pierwszej pozycji, wdróż, poczekaj dwa tygodnie, zmierz.** Dopiero potem
kolejne. Nie produkuj czterech stron naraz, zanim wiadomo, czy format działa.

Każda podstrona trzyma zasady z rejestru (`lib/uslugi/types.ts`): odpowiedź w pierwszym
akapicie, konkretne liczby, FAQ, dane strukturalne, zero zmyślonych danych, bez długiego
myślnika. Strona macierzysta `/uslugi/voiceboty` linkuje do wszystkich podstron, każda
podstrona linkuje z powrotem do niej.

**Uwaga na kanibalizację:** `/uslugi/voiceboty` ma zostać stroną ogólną („voicebot dla
firm", „voicebot"), a nie celować w te same frazy co podstrony.

**Sprawdzenie:** po 14 dniach nowa podstrona ma mieć dla swojej frazy pozycję lepszą
niż obecne 30+. Dla „odbierania telefonów" celem jest wejście do TOP10, bo start jest
z pozycji 8-17.

---

## ZADANIE 7 — kwota w tytule poradnika o agencie

Strona `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` ma pozycję **8,0**,
42 wyświetlenia i **zero kliknięć**. Jesteśmy na pierwszej stronie Google i nikt nie klika.
Cała konkurencja na tej frazie ma w tytule kwotę, my nie mamy.

Obecny `metaTitle` (linia 26 pliku poradnika):
```
Ile kosztuje wdrożenie AI agenta dla firmy
```

### DECYZJA PAWŁA: kwota to „od 2500 zł"

Nowy tytuł (60 znaków z sufiksem marki, mieści się w limicie):
```
Ile kosztuje wdrożenie AI agenta? Od 2500 zł
```

**Dlaczego 2500, a nie 990.** W treści poradnika są oba progi: 990 zł za agenta do jednego
zadania i 2500 zł za agenta z integracjami. Wybrane zostało 2500 zł, bo to kwota agenta
z integracjami, czyli tego, co ludzie rozumieją przez „agenta AI". Dodatkowo **990 zł jest
już użyte w tytule poradnika o chatbotach**, więc dwa tytuły z tą samą kwotą myliłyby
w wynikach wyszukiwania i konkurowały ze sobą.

Kwota jest prawdziwa i pochodzi z treści strony oraz z rejestru usług
(`lib/uslugi/voiceboty.ts` minPrice). Nie zmieniaj widełek w treści poradnika.

**Sprawdzenie:** po 14 dniach CTR tej strony jest większy od zera.

---

## ZADANIE 8 — doprecyzowanie ceny voicebota

Nasz tytuł mówi „Voicebot **od 2500 zł**" i jest to kwota jednorazowa za wdrożenie.
Rynek komunikuje **miesięcznie**: home.pl, EasyCall i Smart Asystenci podają 499 do
1700 zł netto za miesiąc.

Klient porównujący oferty widzi u nas liczbę kilka razy większą, bo zestawia jednorazową
z abonamentem. Fraza „voicebot cena" ma 27 wyświetleń i zero kliknięć.

**Co zrobić.** W opisie meta `/uslugi/voiceboty` (i na przyszłej podstronie cennika)
doprecyzuj, czego dotyczy kwota, na przykład „od 2500 zł za wdrożenie, bez abonamentu".
**Nie zmieniaj samej ceny ani polityki cenowej** — to nie jest decyzja techniczna.
Chodzi wyłącznie o to, żeby w wyniku wyszukiwania było widać, co się z czym porównuje.

**Sprawdzenie:** CTR na frazie „voicebot cena" po 14 dniach.

---

## Czego NIE robić

**Nie poprawiaj tytułów `/produkty`, `/narzedzia` i `/realizacje`.** Wcześniejszy raport
to sugerował, powołując się na „pozycję 2 z zerowym CTR". To fałszywy trop: wszystkie trzy
dostają wyświetlenia wyłącznie na frazę brandową **„simple fast ai"** na pozycji 1,0,
a przy zapytaniu o nazwę firmy człowiek klika w stronę główną i tak właśnie robi
(`/` ma 12 kliknięć i CTR 21,8%). Zerowy CTR jest tu normalny.

**Nie przepisuj tytułów `/uslugi/chatboty` ani `/uslugi/voiceboty` „bo mają niski CTR".**
Są na pozycji 16,6 i 22,6, czyli na drugiej i trzeciej stronie wyników, gdzie CTR rzędu
0,5% jest normą. Problemem jest pozycja, nie tytuł. Oba tytuły są dobre i mają kwoty.

**Nie zaczynaj od fraz „audyt AI" i „wdrożenia AI".** Konkurencja ma tam siłę domeny
50-71 przy naszej 18 (delante.co 70, innowise.com 71, gagan.pl 57, widoczni.com 65).
Tego nie wygra się treścią, tylko linkami. Chatboty i voiceboty to obszary, gdzie
konkurenci mają 4-15, czyli mniej niż my.

**Nie sprawdzaj Cloudflare.** Wcześniejsza wersja planu kazała to zweryfikować.
Sprawdzone: `server: Vercel`, brak nagłówków `cf-ray` i `cf-cache-status`.
**Cloudflare nie stoi przed simplefast.ai**, ruch idzie prosto na Vercel, boty AI
docierają do `robots.txt`. Temat zamknięty.

---

## Weryfikacja końcowa

Po wdrożeniu i deployu sprawdź **na produkcji**, nie lokalnie:

```bash
curl -s https://www.simplefast.ai/sitemap.xml | grep -A1 "uslugi/chatboty"
curl -sI https://www.simplefast.ai/favicon.ico | head -1
curl -sI https://www.simplefast.ai/brand/mark-64.png | grep -i content-length
curl -s https://www.simplefast.ai/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy | grep -o "<title>[^<]*"
```

Oczekiwane:
1. `lastmod` dla `/uslugi/chatboty` sierpniowy, nie `2026-06-15`
2. `/favicon.ico` zwraca `200`
3. nowy favicon poniżej 10 kB
4. tytuł poradnika zawiera „Od 2500 zł"
5. `npm run build` przechodzi bez błędów
6. zdarzenie `wyslano_formularz` widoczne w Umami po testowym zgłoszeniu
7. strona wygląda identycznie: animacje, układ, kolory nietknięte

**Pokaż wyniki tych sprawdzeń.** Commit, deploy ani przechodzący build nie są dowodem,
że zachowanie widoczne dla użytkownika się zmieniło.

---

## Cofnięcie

**Szybko (bez przebudowy):** panel Vercela → SFAI-new → Deployments → wdrożenie sprzed
zmiany → menu „...” → **Promote to Production**.

**Trwale:**
```bash
git revert --no-commit seo-2026-08-17d..HEAD
git commit -m "revert: powrot do stanu seo-2026-08-17d"
git push
```

**Co się zmieniło od punktu cofnięcia:**
```bash
git log seo-2026-08-17d..HEAD --oneline
```

---

*Plan oparty na danych Search Console (7/28/90 dni), Bing Webmaster Tools, Ahrefs (siła
domen), skanie 47 podstron produkcyjnych i sprawdzeniu konkurencji w wyszukiwarce.
Wszystkie liczby pochodzą z pomiaru, żadna nie jest szacunkiem.*
