# Weryfikacja planu SEO 2026-08-17d — pomiar własny przed wdrożeniem

Weryfikowany plan: `C:\Users\PAWEPI~1\AppData\Local\Temp\claude\C--Users-Pawe--Pieloch-CLAUDE-CODE-SF-AI-WWW\e0553296-dc11-4e04-9c4d-4857387a59d6\scratchpad\plan-seo-2026-08-17d.md`
Repo: `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW` (branch main, HEAD 9003c31)
Produkcja mierzona: `https://www.simplefast.ai` (node fetch, 2026-08-17)
Zakres: tylko pomiar i raport. Zero edycji plików repo, zero commitów, zero builda.

## WAŻNE NA START: apex przekierowuje na www

`https://simplefast.ai/*` zwraca **308** na `https://www.simplefast.ai/*`.
Każda weryfikacja produkcyjna (i ta z sekcji "WERYFIKACJA KOŃCOWA" planu) musi
uderzać w **www**, inaczej wykonawca zobaczy 308 zamiast realnego statusu i uzna
np. favicon za "działający". Sondy: node `fetch`, nie curl.

---

## Z1 — DATY W MAPIE WITRYNY

### TWIERDZENIE PLANU
"app/sitemap.ts:11 ma sztywną stałą `const TRESC_LAST_MODIFIED = '2026-06-15'`.
/uslugi/chatboty i /poradniki raportują lastmod 2026-06-15."

### ZMIERZONE
1. `app/sitemap.ts:11` faktycznie zawiera `const TRESC_LAST_MODIFIED = '2026-06-15';`.
2. Ale ta stała **NIE dotyczy usług**. Jest użyta wyłącznie w `app/sitemap.ts:50`
   dla tras `/realizacje/<slug>`.
3. Usługi biorą datę z **`USLUGI_LAST_MODIFIED`** (`lib/site.ts:202` = `'2026-06-15'`),
   importowanej w `app/sitemap.ts:2` i użytej w linii **42**.
4. Hub `/poradniki` bierze datę z **`HOME_LAST_MODIFIED`** (`lib/site.ts:195` = `'2026-06-15'`),
   przez wpis `ROUTES` w `lib/site.ts:250`.
5. Pojedyncze poradniki mają JUŻ poprawne daty (`p.dataAktualizacji`, `app/sitemap.ts:66`).
   Pomiar sitemapy produkcyjnej:
   - `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` -> **2026-08-17** (dobrze)
   - `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` -> **2026-08-16** (dobrze)
   - `/uslugi/chatboty`, `/uslugi/voiceboty` i **wszystkie 10 usług** -> 2026-06-15 (źle)
   - `/poradniki` (hub) -> 2026-06-15 (źle)
6. `lib/uslugi/types.ts` — przeczytany w całości, **NIE MA pola `dataAktualizacji`**.
   Potwierdzone.
7. Wzorzec do skopiowania (poradniki): `lib/poradniki/types.ts:87`
   ```
   /** ISO data ostatniej REALNEJ aktualizacji treści (YYYY-MM-DD). = Article.dateModified.
    *  Dla nowego poradnika = `data`. NIE `new Date()` przy buildzie (fałszywa świeżość). */
   dataAktualizacji: string;
   ```
   plus konsumpcja w `app/sitemap.ts:66`: `lastModified: new Date(p.dataAktualizacji)`.
8. REALNE daty ostatnich zmian plików usług (`git log -1 --date=short`):

| plik | data | commit |
|---|---|---|
| lib/uslugi/audyt-ai.ts | 2026-08-17 | 5337f45 |
| lib/uslugi/automatyzacje.ts | 2026-08-17 | 5337f45 |
| lib/uslugi/chatboty.ts | 2026-08-17 | 5337f45 |
| lib/uslugi/voiceboty.ts | 2026-08-17 | 5337f45 |
| lib/uslugi/types.ts | 2026-08-17 | 5337f45 |
| lib/uslugi/dokumenty-faktury.ts | 2026-08-16 | 5e042c2 |
| lib/uslugi/optymalizacja.ts | 2026-08-16 | 3b7fc61 |
| lib/uslugi/rozwiazania.ts | 2026-08-16 | 3b7fc61 |
| lib/uslugi/agent-rekrutacyjny.ts | 2026-08-06 | 924803c |
| lib/uslugi/opieka-ai.ts | 2026-08-06 | 924803c |
| lib/uslugi/strony-www.ts | 2026-08-06 | 924803c |
| lib/uslugi/obrazy.ts | 2026-08-04 | d50e9fb |
| lib/uslugi/index.ts | 2026-06-16 | b8315c0 |

   Uwaga: `obrazy.ts` nie jest w rejestrze `USLUGI` (10 pozycji, `lib/uslugi/index.ts:39-54`),
   więc go pomijamy.

### WERDYKT: **CZĘŚCIOWO POTWIERDZONE**
Objaw (usługi i hub poradników z datą czerwcową) — potwierdzony 1:1 na produkcji.
Diagnoza przyczyny w planie — **błędna**: wskazuje niewłaściwą stałą. Wykonawca, który
zmieni `TRESC_LAST_MODIFIED`, zmieni daty **realizacji**, a usługi zostaną czerwcowe.
Do tego plan pomija fakt, że usług jest 10, nie 4 (`agent-rekrutacyjny`, `dokumenty-faktury`,
`optymalizacja`, `rozwiazania`, `strony-www`, `opieka-ai` też mają realne daty nowsze niż 06-15
dla części z nich).

### INSTRUKCJA DLA WYKONAWCY
1. `lib/uslugi/types.ts` — dopisz pole do typu `Usluga` (po `slug`, przed `h1`), komentarz
   skopiowany co do zasady z `lib/poradniki/types.ts:82-87`:
   ```ts
   /** ISO data ostatniej REALNEJ zmiany treści (YYYY-MM-DD) — sitemap lastmod.
    *  NIE `new Date()` przy buildzie (fałszywa świeżość = sygnał śmieciowy). */
   dataAktualizacji: string;
   ```
   Pole **wymagane** (nie `?`), bo `strict: true` w `tsconfig.json:7` i tak wymusi
   uzupełnienie wszystkich 10 plików — to jest zaleta, nie problem: nie da się zapomnieć.
2. Uzupełnij `dataAktualizacji` w 10 plikach rejestru wartościami z tabeli wyżej
   (realne daty git, nie zryczałtowane "2026-08-17" dla wszystkiego). `index.ts` nie jest usługą.
3. `app/sitemap.ts` — zamień pętlę usług (linie 40-45). Dziś iteruje po `USLUGI_SLUGS`,
   ma iterować po `USLUGI`:
   ```ts
   import { USLUGI } from '@/lib/uslugi';
   ...
   const uslugiRoutes: MetadataRoute.Sitemap = USLUGI.map((u) => ({
     url: `${SITE.url}/uslugi/${u.slug}`,
     lastModified: new Date(u.dataAktualizacji),
     changeFrequency: 'monthly',
     priority: 0.9,
   }));
   ```
   `USLUGI` jest już eksportowane (`lib/uslugi/index.ts:39`). Import `USLUGI_SLUGS`
   w `app/sitemap.ts:3` zostaje albo znika w zależności od tego, czy jest jeszcze używany
   (dziś w sitemapie nie będzie) — usuń, żeby nie było nieużywanego importu.
4. `lib/site.ts:250` — hub `/poradniki` ma `lastModified: HOME_LAST_MODIFIED`.
   Podmień na `'2026-08-17'` (data ostatniego dołożonego poradnika). NIE ruszaj
   `HOME_LAST_MODIFIED`, bo napędza 8 innych tras (`/narzedzia`, `/produkty`, `/wiedza`,
   `/realizacje`, `/blog`, `/o-nas`, `/dowod`, `/obowiazek-informacyjny`).
5. `USLUGI_LAST_MODIFIED` (`lib/site.ts:202`) zostaw — po zmianie napędza już tylko hub
   `/uslugi` i `/uslugi/architekci-wartosci-ai` (`lib/site.ts:222,227`). Jeśli chcesz odświeżyć
   hub, zmień tę stałą osobno i świadomie.
6. NIE ruszaj `TRESC_LAST_MODIFIED` (`app/sitemap.ts:11`) — to realizacje, nikt ich nie zmieniał.
7. EOL: wszystkie dotknięte pliki (`app/sitemap.ts`, `lib/site.ts`, `lib/uslugi/*.ts`) mają **LF**.
8. Sprawdzenie po deployu (www, nie apex):
   `node -e "fetch('https://www.simplefast.ai/sitemap.xml').then(r=>r.text()).then(t=>console.log(t.match(/<url>[^]*?uslugi\/chatboty[^]*?<\/url>/)[0]))"`

---

## Z3 — ZDARZENIA KONWERSJI W UMAMI

### TWIERDZENIE PLANU
"W kodzie ZERO wywołań umami.track. Zdarzenia: `wyslano_formularz` w
`components/forms/DiagnozaForm.tsx:105`, `klik_telefon` na tel: (nagłówek, stopka, /kontakt),
`klik_email` na mailto: (nagłówek, stopka, /kontakt)."

### ZMIERZONE
1. `grep -rn "umami" app/ components/ lib/` — **2 trafienia, oba w `app/layout.tsx`**
   (linie 140 i 144: komentarz + `<script src="https://cloud.umami.is/script.js">`).
   **ZERO wywołań `umami.track`.** Potwierdzone.
2. Skrypt Umami jest warunkowy: `app/layout.tsx:141` renderuje go tylko gdy
   `process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID`. Sprawdzone na produkcji: HTML strony
   głównej **zawiera** `cloud.umami.is` — env jest ustawione, skrypt żyje.
   CSP w `next.config.mjs` już przepuszcza `https://cloud.umami.is` (script-src)
   i `https://*.umami.is` (connect-src) — **nic w CSP nie trzeba ruszać**.
3. `components/forms/DiagnozaForm.tsx:105` — przeczytane, **zgadza się co do znaku**:
   ```
   .then((res) => setStatus(res.ok ? 'success' : 'error'))
   ```
4. Linki `tel:` — REALNE miejsca (plik:linia):
   - `components/layout/Footer.tsx:116`
   - `app/kontakt/page.tsx:79`
   - `components/o-nas/FounderCard.tsx:95` (strona /o-nas, telefon founderów)
5. Linki `mailto:` — REALNE miejsca:
   - `components/layout/Footer.tsx:109`
   - `app/kontakt/page.tsx:66`
   - `components/o-nas/FounderCard.tsx:87`
   - `components/forms/DiagnozaForm.tsx:141` (stan błędu formularza)
   - `app/polityka-prywatnosci/page.tsx:70` i `:159` (kontakt RODO)
6. **`components/layout/Header.tsx` nie ma ANI JEDNEGO `tel:` ani `mailto:`** (grep -c = 0).
7. Typ `window.umami`: **brak jakiejkolwiek deklaracji**. W repo nie ma `declare global`
   ani własnego pliku `.d.ts` (jedyny to wygenerowany `next-env.d.ts`).
   `tsconfig.json:7` ma `"strict": true`, więc `window.umami?.track(...)` **nie skompiluje się**
   bez deklaracji — `typecheck` padnie na TS2339.

### WERDYKT: **CZĘŚCIOWO POTWIERDZONE**
Rdzeń prawdziwy (zero track, linia 105 zgodna, `?.` uzasadnione blokerami). Plan myli się
w dwóch miejscach: (a) mówi o `tel:`/`mailto:` w **nagłówku** — tam ich nie ma;
(b) **przemilcza wymóg deklaracji typu**, przez co wykonawca dostanie błąd typecheck
i zacznie improwizować (`as any`, `// @ts-ignore`) na produkcyjnym kodzie.

### INSTRUKCJA DLA WYKONAWCY
1. **NAJPIERW** utwórz `types/umami.d.ts` (nowy plik, LF), bez tego nic się nie skompiluje:
   ```ts
   /** Umami Cloud wstrzykuje `window.umami` dopiero po załadowaniu skryptu
    *  (app/layout.tsx). Bloker reklam albo brak env = obiektu NIE MA, dlatego
    *  wszystkie wywołania idą przez `window.umami?.track(...)`. */
   declare global {
     interface Window {
       umami?: { track: (event: string, data?: Record<string, unknown>) => void };
     }
   }
   export {};
   ```
   Sprawdź, czy `tsconfig.json` `include` obejmuje `**/*.ts` (obejmuje przez `next-env.d.ts`
   + domyślny include Nexta); jeśli nie — dopisz `"types/**/*.d.ts"`.
2. `components/forms/DiagnozaForm.tsx:105` — zamień na:
   ```ts
   .then((res) => {
     if (res.ok) window.umami?.track('wyslano_formularz');
     setStatus(res.ok ? 'success' : 'error');
   })
   ```
   NIE dotykaj `.catch()`, walidacji, honeypota, time-trapa ani `app/api/lead/route.ts`.
3. `klik_telefon` — dołóż `onClick={() => window.umami?.track('klik_telefon')}` w:
   `components/layout/Footer.tsx:116`, `app/kontakt/page.tsx:79`.
   **UWAGA:** `app/kontakt/page.tsx` i `Footer.tsx` sprawdź pod kątem `'use client'` —
   `onClick` wymaga komponentu klienckiego. Jeśli któryś jest serwerowy, NIE dodawaj
   tam `'use client'` (zabiłbyś SSG treści). Wtedy zrób mały klient-wrapper
   `components/analytics/TrackedLink.tsx` (`'use client'`, props `href`, `event`, `children`,
   `className`) i podmień tylko te dwa linki. To jest jedyne miejsce, gdzie wolno dołożyć
   nowy plik komponentu.
4. `klik_email` — analogicznie w `components/layout/Footer.tsx:109` i `app/kontakt/page.tsx:66`.
5. **NIE oskryptowywuj**: `FounderCard.tsx` (to kontakt do ludzi, nie konwersja),
   `polityka-prywatnosci` (kontakt RODO), `DiagnozaForm.tsx:141` (mailto w stanie błędu —
   to sygnał awarii, nie konwersji). Plan tego nie rozstrzygał; ograniczenie do stopki
   i /kontakt trzyma dane czyste.
6. Nagłówka **nie ruszaj** — nie ma tam linków tel/mailto, więc pozycja "nagłówek" z planu
   jest bezprzedmiotowa. Zero nowych pętli JS, zero zmian w Header.tsx.
7. Weryfikacja: `npm run typecheck` (wolno), potem po deployu realne kliknięcie i podgląd
   w panelu Umami. Bez wpisu w Umami = **NIEZWERYFIKOWANE**, nie "gotowe".

---

## Z4 — OBRAZEK 1593 kB NA KAŻDEJ PODSTRONIE

### TWIERDZENIE PLANU
"`components/effects/FaviconPulse.tsx:55` wczytuje `/brand/mark-t.png` (1593 kB) na każdej
podstronie. logo-header-t.png (1441 kB), logo-vertical.png (1807 kB) — Logo.tsx deklaruje
next/image = OK."

### ZMIERZONE
1. `components/effects/FaviconPulse.tsx:55` -> `img.src = '/brand/mark-t.png';`
   **Dokładnie jak w planie.** `FaviconPulse` jest montowany w `app/layout.tsx:126`,
   czyli faktycznie na **każdej** podstronie.
2. Realne rozmiary (`ls -l public/brand/`) i potwierdzenie z produkcji (`content-length`):
   | plik | bajty | = KiB | = kB |
   |---|---|---|---|
   | mark-t.png | 1 631 603 | 1593,4 | 1631,6 |
   | logo-header-t.png | 1 441 648 | 1407,9 | 1441,6 |
   | logo-vertical.png | 1 807 416 | 1765,1 | 1807,4 |
   Plan miesza jednostki (mark-t podany w KiB, pozostałe w kB), ale rząd wielkości zgodny.
   Produkcja `https://www.simplefast.ai/brand/mark-t.png` -> **200, 1 631 603 B**.
3. Kto ładuje bezpośrednio (grep `/brand/` po `app/`, `components/`, `lib/`):
   - `components/effects/FaviconPulse.tsx:55` — **`new Image()`, surowy PNG, bez next/image**.
     To jedyne bezpośrednie wczytanie. Potwierdzone w HTML produkcji: string
     `brand/mark-t.png` jest w źródle strony głównej.
   - `components/layout/Logo.tsx:25-27` — mapa `RENDERS`, konsumowana przez `<Image>`
     z `next/image` (`Logo.tsx:1` import, `LogoImage` renderuje `<Image>`).
     `next.config.mjs` ma `images.formats: ['image/avif','image/webp']`, brak `unoptimized`.
     **Plan ma rację: to jest OK, nie ruszać.**
4. `/brand/mark-64.png` na produkcji -> **404** (nie istnieje, zgodnie z założeniem planu).
5. `next.config.mjs` daje `/brand/:path*` -> `Cache-Control: public, max-age=31536000, immutable`.

### WERDYKT: **POTWIERDZONE**
Jedyna korekta: plan pisze "1593 kB" — precyzyjnie to 1 631 603 B (1593 KiB).

### INSTRUKCJA DLA WYKONAWCY
1. Wygeneruj `public/brand/mark-64.png` z `public/brand/mark-t.png` (1254x1254, kwadrat,
   przezroczysta alfa). Skrypt w **Node**, nie Python (maszyna Windows). Jeśli w repo nie ma
   `sharp` w `node_modules`, użyj skryptu z `_zespol/` albo dołóż jednorazowy skrypt
   w `scripts/` — **nie** dodawaj `sharp` do `dependencies` produkcyjnych.
   Cel: 64x64 px, docelowo < 10 kB, alfa zachowana.
2. `components/effects/FaviconPulse.tsx:55` — jedna linia:
   `img.src = '/brand/mark-64.png';`
   **NIE ruszaj** logiki canvas, `PERIOD`, `MIN_FRAME`, `COLORS`, `TILE`, `R`, `PAD`,
   `roundedPath()` ani bramki reduced-motion. Kanwa i tak rysuje w `SIZE` 32-64 px,
   więc jakość wizualna nie spadnie.
3. Asercja przed commitem: `grep -c "mark-t.png" components/effects/FaviconPulse.tsx`
   ma zwrócić **1** (zostaje tylko wzmianka w komentarzu w linii 12) — sprawdź, że podmieniłeś
   linię 55, a nie komentarz.
4. `components/layout/Logo.tsx` — **NIE RUSZAJ**. next/image robi swoje.
   Plik `mark-t.png` zostaje w repo (Logo.tsx:26 go używa).
5. Weryfikacja po deployu:
   `node -e "fetch('https://www.simplefast.ai/brand/mark-64.png').then(r=>console.log(r.status, r.headers.get('content-length')))"`
   -> 200 i < 10240.

---

## Z5 — BRAKUJĄCE IKONY (404)

### TWIERDZENIE PLANU
"`app/layout.tsx:67-68` deklaruje icon i shortcut '/favicon.ico'; /favicon.ico i /icon.svg
zwracają na produkcji 404. Dodać pliki do public/ ALBO usunąć deklaracje."

### ZMIERZONE
1. `app/layout.tsx:64-72` — deklaracja ikon jest **warunkowa**:
   ```ts
   ...(SITE.assetsReady ? { icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/icon.png' } } : {}),
   ```
   `lib/site.ts:100` -> **`assetsReady: false`**. Czyli te linie **nigdy się nie wykonują**
   i `<link rel="icon" href="/favicon.ico">` **NIE JEST emitowany**.
   Potwierdzone na produkcji: HTML strony głównej **nie zawiera** stringu `favicon.ico`.
2. Statusy na produkcji (www):
   - `/favicon.ico` -> **404**
   - `/icon.svg` -> **404**
   - `/icon.png` -> **200, image/png, 102 789 B**
3. `public/` **nie zawiera niczego favikonowego**: `brand/`, `img/`, `og/`, `llms.txt`,
   `robots.txt`, `wiedza-agenta.txt`, `c1b2dc4dad72b3b2a2ebf1031c23dd22.txt`.
4. **Konwencja App Router już działa**: w repo istnieje **`app/icon.png`** (102 789 B,
   512x512). Next 15 automatycznie generuje z niego trasę `/icon.png` i **wstrzykuje tag**.
   Zmierzone w HTML KAŻDEJ sprawdzonej podstrony (home, /uslugi/voiceboty, /uslugi/chatboty,
   /produkty, /narzedzia, /realizacje, poradnik agenta):
   ```
   <link rel="icon" href="/icon.png?9b7407563b19b562" type="image/png" sizes="512x512"/>
   ```
   Strona **ma działającą ikonę**. 404 na `/favicon.ico` to zapytanie przeglądarki o domyślną
   ścieżkę, nie zepsuta deklaracja w HTML.

### WERDYKT: **CZĘŚCIOWO FAŁSZYWE**
Fakty statusów HTTP: potwierdzone (404 na /favicon.ico i /icon.svg).
Diagnoza planu: **fałszywa** w najważniejszym punkcie. Plan sugeruje, że strona wskazuje
botom i przeglądarkom martwe pliki. Nie wskazuje — bramka `SITE.assetsReady === false`
świadomie te deklaracje wygasza, a `app/icon.png` dostarcza realną ikonę.
**Wagę tego zadania trzeba obniżyć z "brakujące ikony" do "kosmetyka + jeden 404 w logach".**
Wariant planu "usunąć deklaracje" byłby wręcz szkodliwy: usunąłby przygotowaną bramkę
wraz z `apple: '/icon.png'`, który zacznie działać, gdy Paweł przełączy `assetsReady`.

### INSTRUKCJA DLA WYKONAWCY
Rekomendacja: **wariant minimalny, zero ryzyka**.
1. Dołóż `app/favicon.ico` (konwencja App Router — plik w `app/`, nie w `public/`).
   Next serwuje go pod `/favicon.ico` i sam dokłada `<link rel="icon">`. Wygeneruj
   w Node z `public/brand/mark-t.png` (multi-size 16/32/48). To jednym ruchem gasi 404.
2. **NIE dodawaj `/icon.svg`** — nic go nie deklaruje (bramka `assetsReady` jest off),
   nikt go nie żąda poza ręcznym testem. Dodawanie pliku pod nieistniejące odwołanie
   to śmieć w repo.
3. **NIE ruszaj `app/layout.tsx:64-72` ani `lib/site.ts:100`.** Przełączenie
   `assetsReady: true` to decyzja Pawła (komentarz w kodzie mówi wprost "INPUT PAWŁA"),
   a poza ikonami odblokowałoby też `image` w `articleSchema` — czyli dotknęłoby JSON-LD.
   To wykracza poza zakres zadania SEO.
4. **NIE usuwaj `app/icon.png`.** To jedyne działające źródło ikony (200 OK, w HTML).
5. Weryfikacja: `/favicon.ico` -> 200 **na www**; `/icon.png` -> nadal 200; tag
   `<link rel="icon" ... /icon.png ...>` nadal w HTML.

---

## Z6 — PODSTRONY VOICEBOTÓW

### TWIERDZENIE PLANU
"DO ZROBIENIA: /uslugi/voiceboty/windykacja, /uslugi/voiceboty/potwierdzanie-wizyt.
Każda podstrona wg zasad rejestru (lib/uslugi/types.ts)."

### ZMIERZONE — jak zbudowane jest routing usług
1. Trasa: **`app/uslugi/[usluga]/page.tsx`** — JEDEN dynamiczny segment.
   - `export const dynamic = 'force-static'` (linia 35)
   - `export const dynamicParams = false` (linia 36) -> każdy slug spoza rejestru = 404
   - `generateStaticParams()` (linia 41) zwraca `USLUGI_SLUGS.map(...)`
   - `generateMetadata()` (linia 46) -> `buildMetadata({ title: usluga.metaTitle,
     description: usluga.metaDescription, path: '/uslugi/'+slug })`
   - render 8 sekcji + 3 bloki JSON-LD (`uslugaSchemas`, linia 84)
2. Obok istnieje statyczny segment `app/uslugi/architekci-wartosci-ai/page.tsx`
   (dowód, że statyczny i dynamiczny segment współżyją na tym poziomie).
3. Rejestr: `lib/uslugi/index.ts:39-54` -> `USLUGI` (10 usług), `:59` -> `USLUGI_SLUGS`.
4. Sitemap bierze usługi z `USLUGI_SLUGS` (`app/sitemap.ts:40`) — **podstrony NIE wejdą
   do sitemapy same z siebie**.
5. JSON-LD: `components/seo/schemas.ts:180` `uslugaSchemas(usluga, basePath = '/uslugi')`.
   Breadcrumb (linia 199): `Strona główna -> Usługi -> [usluga.h1]` — **3 poziomy, na sztywno**.
6. Breadcrumbs widoczne: `components/uslugi/ServiceHero.tsx:182-185`, `<Breadcrumbs>`
   z tablicą `{ name: 'Usługi', href: '/uslugi' }`.
7. Produkcja: `/uslugi/voiceboty/windykacja` -> **404**, `/uslugi/voiceboty/potwierdzanie-wizyt`
   -> **404**. Potwierdzone, że dziś nie istnieją.

### WERDYKT: **POTWIERDZONE co do potrzeby, NIEDOSZACOWANE co do kosztu**
Plan pisze "Każda podstrona wg zasad rejestru (lib/uslugi/types.ts)", jakby wystarczyło
dopisać obiekt do rejestru. **Nie wystarczy.** Dopisanie wpisu do `USLUGI` stworzy
`/uslugi/windykacja` (płaski slug), a nie `/uslugi/voiceboty/windykacja` — i dodatkowo
wrzuci go do nawigacji, huba `/uslugi` i menu usług, czego nikt nie zamawiał.
To **osobna trasa**, nie wpis do istniejącego rejestru.

### INSTRUKCJA DLA WYKONAWCY — wzorzec plików
Zalecany wariant: **zagnieżdżony segment dynamiczny**, nie folder `app/uslugi/voiceboty/`.
Folder statyczny `voiceboty/` obok `[usluga]/` to ryzyko konfliktu rozstrzygania trasy
`/uslugi/voiceboty` — nie testujemy takich rzeczy na produkcji.

1. **Nowy rejestr** `lib/uslugi-podstrony/` (osobny od `lib/uslugi`, żeby nie zanieczyścić
   `USLUGI` i nawigacji):
   - `types.ts` — typ `PodstronaUslugi = Usluga & { rodzic: string }`, gdzie `rodzic` to slug
     usługi macierzystej (`'voiceboty'`). Reużywa CAŁY kontrakt `Usluga` (patrz niżej).
   - `windykacja.ts`, `potwierdzanie-wizyt.ts`
   - `index.ts` — `export const PODSTRONY: readonly PodstronaUslugi[]` +
     `PODSTRONY_PARAMS = PODSTRONY.map(p => ({ usluga: p.rodzic, podstrona: p.slug }))` +
     `getPodstrona(rodzic, slug)`.
2. **Nowa trasa** `app/uslugi/[usluga]/[podstrona]/page.tsx` — skopiuj 1:1 szkielet
   z `app/uslugi/[usluga]/page.tsx`, zmieniając tylko:
   - `type Params = { usluga: string; podstrona: string }`
   - `generateStaticParams(): Params[]` -> `PODSTRONY_PARAMS`
   - zachowaj `export const dynamic = 'force-static'` i `dynamicParams = false`
   - `buildMetadata({ ..., path: '/uslugi/'+rodzic+'/'+slug })`
   - JSON-LD: `uslugaSchemas(podstrona, '/uslugi/' + podstrona.rodzic)` — parametr
     `basePath` **już istnieje** (`schemas.ts:182`) i da poprawny `path`.
     **ALE** breadcrumb wyjdzie 3-poziomowy z etykietą "Usługi" wskazującą na
     `/uslugi/voiceboty`. Poprawnie ma być 4 poziomy. Dlatego: NIE modyfikuj
     `uslugaSchemas`; zbuduj breadcrumb osobno przez `breadcrumbSchema([...])`
     w nowym `page.tsx`:
     `[{Strona główna,/}, {Usługi,/uslugi}, {Voiceboty,/uslugi/voiceboty}, {H1,pełna ścieżka}]`.
   - Breadcrumbs widoczne: `<ServiceHero>` ma je zaszyte na sztywno
     (`ServiceHero.tsx:182-185`). Albo dodaj do `ServiceHero` opcjonalny prop
     `dodatkowyOkruch?: { name: string; href: string }` (domyślnie `undefined` = zero
     zmian dla istniejących 10 stron), albo w nowej trasie złóż hero z tych samych
     komponentów bez `ServiceHero`. **Prop z domyślnym `undefined` jest bezpieczniejszy**
     i nie dotyka wyglądu istniejących stron.
3. **Sitemap** `app/sitemap.ts` — dołóż blok analogiczny do `uslugiRoutes`:
   ```ts
   const podstronyRoutes: MetadataRoute.Sitemap = PODSTRONY.map((p) => ({
     url: `${SITE.url}/uslugi/${p.rodzic}/${p.slug}`,
     lastModified: new Date(p.dataAktualizacji),
     changeFrequency: 'monthly',
     priority: 0.8,
   }));
   ```
   i dodaj `...podstronyRoutes` do zwracanej tablicy (linia 96-104).
4. **Linkowanie**: w `lib/uslugi/voiceboty.ts` dołóż linki do podstron. NIE wymyślaj nowego
   pola — jest gotowy wzorzec `ramaCeny.linkPoradnik` (`lib/uslugi/types.ts:153-162`,
   render w `components/uslugi/RamaCeny.tsx`). Jeśli potrzebujesz więcej niż jeden link,
   zaproponuj Pawłowi nową sekcję **zanim** ją zbudujesz (reguła: wzorzec jest specyfikacją).
   Powrót z podstrony do macierzystej: w `cta` albo w ostatnim akapicie `rozwiazanie.tresc`.
5. **NIE dodawaj** podstron do `ROUTES` w `lib/site.ts` (to rejestr stron statycznych).

### KOMPLETNY KONTRAKT TYPU `Usluga` (lib/uslugi/types.ts) — wykonawca nie zgaduje
Wszystkie pola **wymagane**, chyba że oznaczone `?`. `strict: true`.

```
slug: string                    // segment URL bez /uslugi/, małe litery, myślniki, bez PL znaków
h1: string                      // primary money query
kapsula: string                 // 40-60 słów answer-first; = Service.description w JSON-LD
metaTitle: string               // 50-60 zn. BEZ sufiksu marki (layout dokłada " · SimpleFast.ai" = 16 zn.)
metaDescription: string         // 140-160 zn., konkret + liczba/czas, zero hedgingu, zero em-dash
problem: { h2: string; tresc: string }              // H2 sformułowany jak pytanie klienta
rozwiazanie: { h2: string; tresc: string }          // H2 jak pytanie
tabelaPorownawcza: {
  h2: string
  naglowekBez: string           // etykieta kolumny "bez usługi"
  naglowekZNami: string         // etykieta kolumny "z nami"
  wiersze: TabelaWiersz[]       // TabelaWiersz = { cecha: string; bez: string; zNami: string }
}
kroki: {
  h2: string
  items: [Krok, Krok, Krok]     // DOKŁADNIE 3 (krotka!). Krok = { tytul: string; opis: string }
}
ramaCeny: {
  h2: string                    // jak pytanie, np. "Ile kosztuje ...?"
  tresc: string                 // czysty tekst do <p>; surowy <a> się NIE wyrenderuje
  minPrice?: number             // TYLKO realna cena "od X" w PLN; włącza offers w Service JSON-LD
  linkPoradnik?: {              // linkowanie wewnętrzne, render w RamaCeny.tsx
    przed: string               // tekst przed linkiem (może być '')
    etykieta: string            // anchor opisowy, nigdy "kliknij tutaj"
    po: string                  // tekst po linku (zwykle kropka)
    href: string                // MUSI być realną trasą 200 OK
  }
}
faq: FaqItem[]                  // 5-6 pozycji. FaqItem = { pytanie: string; odpowiedz: string }
                                // odpowiedz idzie 1:1 do FAQPage JSON-LD
cta: {
  label: string                 // domyślnie "Pokaż mi, gdzie tracę czas"
  href: string                  // domyślnie "#diagnoza"
  mikrokopia: string
  dowod: string                 // uczciwy sygnał, ZERO atrapy liczby
}
queries: string[]               // money queries; pierwsza = primary, zgodna z h1
```
Plus (po Z1) **`dataAktualizacji: string`**.

Żelazne zasady z nagłówka pliku (obowiązują każdy string): każde zdanie może zostać
zacytowane przez LLM jako fakt, więc musi być prawdziwe; zero `[PLACEHOLDER]`;
zero zmyślonych liczb i cen; zero em-dash; krótkie zdania, głos Pawła.

---

## Z7 — TYTUŁ PORADNIKA O AGENCIE

### TWIERDZENIE PLANU
"Tytuł na produkcji (58 zn.): 'Ile kosztuje wdrożenie AI agenta dla firmy · SimpleFast.ai'.
Indeks Google pamięta wersję z '? Cena i zwrot'. Sprawdzić, czy usunięto celowo.
Propozycja: 'Ile kosztuje wdrożenie AI agenta? Od 4900 zł · SimpleFast.ai'."

### ZMIERZONE
1. Plik: `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:26`
   -> `metaTitle: 'Ile kosztuje wdrożenie AI agenta dla firmy'` (42 znaki).
2. Produkcja: `<title>` = `Ile kosztuje wdrożenie AI agenta dla firmy · SimpleFast.ai`,
   **58 znaków**. **Zgadza się z planem co do znaku.**
3. `git log -p` — zmiana nastąpiła w **3b7fc61 (2026-08-16)**:
   ```
   -  metaTitle: 'Ile kosztuje wdrożenie AI agenta dla firmy? Cena i zwrot',
   +  metaTitle: 'Ile kosztuje wdrożenie AI agenta dla firmy',
   ```
   Treść commita: *"Meta P2: 9 tytulow sciete do budzetu 44 znakow (szablon dokleja 16)"*.
   **Usunięcie było CELOWE** — stary tytuł miał 56 zn. + 16 sufiksu = **72 znaki**,
   czyli był ucinany w SERP. Plan zadaje właściwe pytanie; odpowiedź brzmi: tak, celowo,
   i cofanie tego 1:1 byłoby regresją.
4. Kwoty realnie obecne w treści poradnika (po commicie 5337f45), zmierzone gerpem:
   - akapit odpowiedzi: "od **990 zł** za agenta do jednego zadania", "od **2 500 zł**"
     (z integracjami), "opieka od **99 zł** miesięcznie"
   - tabela cen: `od 990 zł` / `od 2 500 zł` / `1 490 zł` (audyt) / `99 do 599 zł` (opieka)
   - komentarz w pliku dokumentuje źródła kwot (chatboty.ts, voiceboty.ts, audyt-ai.ts)
   **Kwota 4900 zł nie występuje NIGDZIE w repo** (grep po `app/`, `components/`, `lib/`,
   `public/` na `4900` i `4 900` — zero trafień).
5. Arytmetyka znaków (sufiks `' · SimpleFast.ai'` = 16 zn., budżet 60):
   | kandydat | metaTitle | + sufiks |
   |---|---|---|
   | obecny "…dla firmy" | 42 | **58** |
   | "Ile kosztuje wdrożenie AI agenta? **Od 990 zł**" | 43 | **59** |
   | "Ile kosztuje wdrożenie AI agenta? Cena i zwrot" | 46 | 62 |
   | stary "…dla firmy? Cena i zwrot" | 56 | 72 |

### WERDYKT: **POTWIERDZONE (fakty) + obiekcja planu SŁUSZNA**
Wszystkie liczby planu zgadzają się z pomiarem. Sekcja "UWAGA SESJI" planu ma rację:
4900 zł nie istnieje. Dodatkowo pomiar pokazuje, czego plan nie wiedział: **wariant
z naszą kwotą mieści się w budżecie (59 zn.), a wariant "Cena i zwrot" NIE (62 zn.)**.

### INSTRUKCJA DLA WYKONAWCY
1. `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts:26` — podmień na:
   ```ts
   metaTitle: 'Ile kosztuje wdrożenie AI agenta? Od 990 zł',
   ```
   59 znaków z sufiksem, mieści się w budżecie 60. Kwota **990 zł** jest w treści
   poradnika trzy razy (akapit, tabela, sekcja końcowa), więc tytuł nie kłamie.
2. **NIE wstawiaj 4900** (patrz OBIEKCJE). **NIE wracaj do "dla firmy? Cena i zwrot"** —
   72 znaki, ucinane, i cofa świadomą decyzję z 3b7fc61.
3. Przy zmianie tytułu **bump `dataAktualizacji`** (`:34`) na dzień wdrożenia — to samo
   pole napędza `Article.dateModified` i sitemap lastmod (`app/sitemap.ts:66`).
4. Sprawdź `metaDescription` (`:27`) — 147 zn., mieści się, **nie ruszaj**.
5. Weryfikacja: `<title>` na produkcji = 59 zn., potem ręczne zgłoszenie URL w GSC (Paweł).
   Efekt CTR mierzalny **najwcześniej po 2 tygodniach** — nie ogłaszaj sukcesu wcześniej.

---

## Z8 — KOMUNIKACJA CENY VOICEBOTA

### TWIERDZENIE PLANU
"W opisie meta /uslugi/voiceboty doprecyzować, czego dotyczy kwota.
Propozycja: 'od 2500 zł za wdrożenie, bez abonamentu'."

### ZMIERZONE
1. `lib/uslugi/voiceboty.ts:23-24`, potwierdzone na produkcji:
   > "Voicebot dla firm od 2500 zł: bot telefoniczny odbiera połączenia po polsku 24/7,
   > umawia wizyty i przekazuje pilne sprawy. Wycena po bezpłatnej diagnozie."
   **Długość: 154 znaki.**
2. Limit z kontraktu typu (`lib/uslugi/types.ts:96`): **140-160 zn.**
   Commit 3b7fc61 zastosował twardszy limit roboczy: "7 opisow sciete do <=155 znakow".
3. **Zostaje 1 znak** do 155 i **6 znaków** do 160. Na doprecyzowanie kwoty
   **nie ma miejsca bez skrócenia czegoś innego**.
4. `metaTitle` (`:22`) = "Voicebot od 2500 zł: bot telefoniczny 24/7" (41 zn., 57 z sufiksem).
5. `ramaCeny.minPrice: 2500` (`:79`) — realne, napędza `offers` w Service JSON-LD.
6. Grep na `"bez abonamentu"` w `app/`, `components/`, `lib/`, `public/`: **zero trafień**
   (zwrot został wcześniej wyczyszczony, zgodnie z decyzją Pawła z v9).
7. Grep na `"wirtualna recepcjonistka"`: jedyne trafienie to komentarz
   `lib/uslugi/voiceboty.ts:40` stwierdzający, że fraza **celowo NIE występuje**. Dobrze.

### WERDYKT: **CZĘŚCIOWO POTWIERDZONE**
Problem realny (jednorazowa kwota vs rynkowe abonamenty) — do przyjęcia. Propozycja
brzmienia — **do odrzucenia** (patrz OBIEKCJE). Plan **przemilcza**, że w opisie
zostało 1-6 znaków, więc "dopisz doprecyzowanie" jest fizycznie niewykonalne bez przepisania.

### INSTRUKCJA DLA WYKONAWCY
1. `lib/uslugi/voiceboty.ts:23-24` — **przepisz cały opis**, nie doklejaj. Propozycja
   (156 zn., mieści się w 140-160, zero zwrotu "bez abonamentu", kwoty tylko z listy locked):
   ```
   Voicebot dla firm: 2500 zł jednorazowo za wdrożenie, opieka od 99 zł/mies.
   Bot telefoniczny odbiera po polsku 24/7 i umawia wizyty. Bezpłatna diagnoza.
   ```
   **Policz długość skryptem Node przed zapisem** i pokaż wynik — nie na oko.
   Jeśli wyjdzie > 160, tnij "Bezpłatna diagnoza." do "Diagnoza gratis." albo skróć
   drugie zdanie; NIE tnij kwot.
2. `metaTitle` (`:22`) **zostaw bez zmian** — 57 zn. z sufiksem, ma kwotę, plan sam
   w sekcji "czego nie robić" zabrania go ruszać.
3. **NIE zmieniaj** `ramaCeny.minPrice` (`:79`), `ramaCeny.tresc`, `linkPoradnik` (`:82`),
   ani polityki cenowej. Zmiana `minPrice` przeciekłaby do `offers` w Service JSON-LD.
4. Kwota 99 zł/mies. w opisie **musi się zgadzać** z tym, co widać w sekcji ceny na stronie —
   jeśli sekcja nie wspomina o opiece, użyj wariantu bez tej kwoty:
   ```
   Voicebot dla firm od 2500 zł jednorazowo za wdrożenie: bot telefoniczny odbiera
   po polsku 24/7, umawia wizyty i przekazuje pilne sprawy. Bezpłatna diagnoza.
   ```
   (reguła naczyń połączonych: meta nie może obiecywać czegoś, czego strona nie mówi).
5. Weryfikacja: pobierz `<meta name="description">` z produkcji i policz znaki.

---

## FAŁSZYWE TROPY — czy zgadzam się z sekcją "CZEGO NIE ROBIĆ"

### 1. "NIE poprawiać tytułów /produkty, /narzedzia, /realizacje"
**ZMIERZONE (produkcja, długość z sufiksem):**
| strona | tytuł | dł. | opis dł. |
|---|---|---|---|
| /produkty | Produkty: co zbudowaliśmy i co możesz mieć u siebie · SimpleFast.ai | **67** | 137 |
| /narzedzia | Darmowe narzędzia AI dla firm · SimpleFast.ai | 45 | 137 |
| /realizacje | Realizacje: wdrożenia AI dla firm · SimpleFast.ai | 49 | 155 |

**WERDYKT: ZGADZAM SIĘ, z jednym zastrzeżeniem.**
Rozumowanie planu (ruch wyłącznie brandowy, człowiek klika w stronę główną) jest spójne
z tym, co widzę: tytuły są konkretne, opisy w limicie, nic nie jest zepsute.
**ALE** `/produkty` ma **67 znaków** — powyżej progu ~60, czyli Google ucina go w SERP.
To nie jest powód do "walki o CTR", tylko higiena. Sugestia do decyzji Pawła, **nie do
wdrożenia w tej sesji**: skrócić do "Produkty AI SimpleFast.ai: co możesz mieć u siebie"
albo podobnie w budżecie 44 zn. przed sufiksem. Nie ruszać bez jego zgody, bo plan
wprost zabrania, a zysk jest hipotetyczny.

### 2. "NIE przepisywać tytułów /uslugi/chatboty ani /uslugi/voiceboty"
**ZMIERZONE:** chatboty 53 zn. z kwotą-intencją ("cena i wdrożenie"), voiceboty 58 zn.
z kwotą 2500 zł. Oba w budżecie, oba z primary query, oba bez em-dash.
**WERDYKT: ZGADZAM SIĘ W PEŁNI.** Tytuły są dobre. Uwaga: Z8 dotyczy **opisu**
voicebotów, nie tytułu — te dwa zadania się nie kłócą, wykonawca musi to rozróżnić.

### 3. "NIE zaczynać walki o 'audyt AI' i 'wdrożenia AI' (konkurencja DR 50-71)"
**WERDYKT: ZGADZAM SIĘ, ale to twierdzenie NIEWERYFIKOWALNE z repo.**
Wartości DR (delante 70, innowise 71, gagan 57, widoczni 65, nasze 18) pochodzą z Ahrefs
i nie da się ich sprawdzić w kodzie ani na produkcji. Merytorycznie logika jest poprawna
(strony z takim autorytetem wygrywa się linkami, nie treścią), więc przyjmuję.
Oznaczam jako **NIEZWERYFIKOWANE: DR konkurencji — dane z Ahrefs, nie z repo/produkcji**.

### 4. Twierdzenia GSC w całym planie
Wszystkie liczby wyświetleń, kliknięć, CTR i pozycji (362/10/2,76%/14,6 itd. oraz lista
10 fraz voicebotowych) pochodzą z Search Console. **Nie da się ich zweryfikować w repo
ani przez fetch produkcji.** To, co dało się sprawdzić po stronie kodu, sprawdziłem i jest
zgodne: linkowanie z /uslugi/chatboty do poradnika **żyje** (w HTML produkcji jest
`/poradniki/ile-kosztuje-chatbot-dla-firmy-2026`), poradnik o agencie ma lastmod 2026-08-17,
poradnik o chatbotach 2026-08-16.

### 5. Z2 i Z9 — stan techniczny
- `tools/indexnow-ping.js` **istnieje** (obok gsc-raport.js, bing-raport.js, seo-dane.js
  i nowych diagnoza-produkcji.js, gsc-pelny.js, migawka.js, porownaj-migawki.js).
  Zadanie 2 jest wykonalne.
- `public/robots.txt` — przeczytany w całości. **Potwierdzam**: `Allow: /` dla
  OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User,
  Claude-SearchBot, Google-Extended, Applebot-Extended, GPTBot, Bingbot.
  `Disallow: /api/`, `Sitemap: https://www.simplefast.ai/sitemap.xml`.
  Plik sam ostrzega (linie 6-9) o bramce Cloudflare — plan powtarza to wiernie.
  Sprawdzenie w panelu Cloudflare: **poza zasięgiem sesji, zostaje dla Pawła**.

---

## OBIEKCJE — co odrzucamy i dlaczego

### O1. Kwota "4900 zł" w tytule poradnika (Z7) — ODRZUCONE TWARDO
Plan proponuje tytuł „Ile kosztuje wdrożenie AI agenta? Od 4900 zł". **Kwota 4900 zł
nie istnieje** — ani w cenniku locked (990 / 2500 / 1490 / 1990 / 99-599 / 3000-10000 /
3000 / 5500 / 10000 / od 10000 / 350 za godzinę), ani nigdzie w repo (grep = zero trafień),
ani w treści samego poradnika (tam: 990, 2 500, 1 490, 99-599).
Wstawienie tej kwoty to zmyślona liczba w `<title>` — najbardziej widocznym i najczęściej
cytowanym przez LLM polu na stronie, w dodatku sprzeczna z tabelą cen dwa ekrany niżej.
**Zamiast tego:** „Ile kosztuje wdrożenie AI agenta? Od 990 zł" (59 zn. z sufiksem,
zmierzone, mieści się w budżecie 60, zgodne z treścią poradnika i z `lib/uslugi/chatboty.ts`).

### O2. „bez abonamentu" w opisie voicebotów (Z8) — ODRZUCONE TWARDO
Mamy abonament: opieka 99-599 zł/mies. (`lib/uslugi/opieka-ai.ts`, wzmianki
w `automatyzacje.ts`, `chatboty.ts`, `voiceboty.ts`, tabela w poradniku o agencie).
Zwrot „bez abonamentu" reklamowałby brak produktu, który sprzedajemy, i wprowadzał
klienta w błąd przed rozmową. Dodatkowo Paweł kazał już raz usunąć „bez abonamentu
na siłę" z 4 miejsc (v9) — grep potwierdza, że w repo tego zwrotu dziś nie ma; ponowne
wprowadzenie byłoby cofnięciem jego decyzji.
**Zamiast tego:** „2500 zł jednorazowo za wdrożenie, opieka od 99 zł/mies." — mówi
dokładnie to samo (kwota jest jednorazowa), nie kłamie i używa wyłącznie kwot locked.

### O3. Diagnoza przyczyny w Z1 — ODRZUCONA JAKO BŁĘDNA
Plan wskazuje `TRESC_LAST_MODIFIED` (`app/sitemap.ts:11`) jako przyczynę czerwcowych dat
usług. Ta stała napędza **wyłącznie `/realizacje/*`**. Realne źródła to
`USLUGI_LAST_MODIFIED` (`lib/site.ts:202`, użyta w `app/sitemap.ts:42`) i
`HOME_LAST_MODIFIED` (`lib/site.ts:195`, przez `ROUTES:250` dla huba `/poradniki`).
Wdrożenie planu dosłownie **nie naprawiłoby niczego**, a zepsuło daty realizacji.

### O4. Skala Z1 — plan liczy 4 usługi, jest ich 10
Plan mówi „chatboty, voiceboty, automatyzacje, audyt-ai = 2026-08-17, reszta zostaje
czerwcowa". Rejestr ma **10 usług**, a git pokazuje realne daty także dla
`dokumenty-faktury` (08-16), `optymalizacja` (08-16), `rozwiazania` (08-16),
`agent-rekrutacyjny` (08-06), `opieka-ai` (08-06), `strony-www` (08-06).
Zostawienie im 2026-06-15 to świadome podanie botom nieprawdziwej daty.
**Zamiast tego:** wpisać realne daty z git dla wszystkich 10 (tabela w Z1).

### O5. Ranga Z5 — ODRZUCONA JAKO ZAWYŻONA
Plan przedstawia Z5 jako „brakujące ikony (404)" sugerując, że strona wskazuje martwe pliki.
Nie wskazuje: deklaracja jest wygaszona bramką `SITE.assetsReady: false` (`lib/site.ts:100`),
a `app/icon.png` daje realny `<link rel="icon">` (200 OK) na każdej podstronie.
Realny zakres pracy: dołożyć `app/favicon.ico`, żeby zgasić 404 w logach. Nic więcej.
Wariant planu „usunąć deklaracje" **odrzucam** — usunąłby przygotowaną przez zespół
bramkę razem z `apple: '/icon.png'`.

### O6. Z6 jako „wpis do rejestru" — ODRZUCONE JAKO NIEDOSZACOWANIE
Podstrony `/uslugi/voiceboty/<temat>` wymagają **nowej trasy** (`app/uslugi/[usluga]/[podstrona]/`),
nowego rejestru, własnego breadcrumba (4 poziomy zamiast 3, `schemas.ts:199` ma 3 na sztywno),
propa w `ServiceHero` i wpisu w sitemapie. Dopisanie obiektu do `USLUGI` da płaski slug
`/uslugi/windykacja` i wrzuci pozycję do nawigacji oraz huba `/uslugi`.
Rekomendacja: **NIE robić Z6 w tej sesji razem z Z1/Z3/Z4/Z5/Z7/Z8.** To osobna sesja
z własnym punktem cofnięcia. Plan sam mówi „ZACZĄĆ OD DWÓCH PIERWSZYCH" — dodaję:
zacząć od nich **osobno**.

### O7. Weryfikacja końcowa planu — do poprawy
Sekcja „WERYFIKACJA KOŃCOWA" używa `curl` na apeksie. Apex zwraca 308 na www, a na tej
maszynie (Windows) `curl` jest aliasem PowerShella do `Invoke-WebRequest` z inną składnią.
**Zamiast tego:** sondy `node fetch` na `https://www.simplefast.ai`. Gotowy wzorzec:
`C:\Users\PAWEPI~1\AppData\Local\Temp\claude\C--Users-Pawe--Pieloch-CLAUDE-CODE-SF-AI-WWW\e0553296-dc11-4e04-9c4d-4857387a59d6\scratchpad\wer-prod.mjs`.

---

## NOTATKI TECHNICZNE DLA WYKONAWCY

- **EOL**: `app/sitemap.ts`, `lib/site.ts`, `lib/uslugi/types.ts`, `lib/uslugi/voiceboty.ts`,
  `components/effects/FaviconPulse.tsx`, `components/forms/DiagnozaForm.tsx`,
  `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts` — **wszystkie LF**.
  Zachować przy edycji.
- **Kolejność wdrożenia** (od najmniejszego ryzyka): Z7 (1 string) -> Z8 (1 string)
  -> Z4 (1 string + nowy plik PNG) -> Z5 (1 nowy plik) -> Z1 (typ + 10 plików + sitemap)
  -> Z3 (nowy .d.ts + 5 miejsc) -> Z6 **osobna sesja**.
- **Build**: wolno tylko `npm run typecheck`. `npm run build` robi kontrola na końcu.
- **Zero commitów i tagów git** w sesji wdrożeniowej, chyba że Paweł powie inaczej.
- **Wygląd strony nietknięty**: żadna z instrukcji wyżej nie dotyka CSS, animacji, palety
  ani układu. Jedyna zmiana renderu to opcjonalny prop breadcrumba w `ServiceHero`
  (Z6, osobna sesja) z domyślnym `undefined` = zero różnicy dla istniejących 10 stron.

---

## CO POZOSTAJE NIEZWERYFIKOWANE

1. **Wszystkie liczby z Search Console** (wyświetlenia, kliknięcia, CTR, pozycje, lista
   10 fraz voicebotowych) — dane zewnętrzne, nie do sprawdzenia z repo ani z produkcji.
2. **DR konkurencji z Ahrefs** (delante 70, innowise 71, gagan 57, widoczni 65, nasze 18).
3. **Twierdzenie, że Google pamięta stary tytuł „? Cena i zwrot"** — weryfikowalne tylko
   w SERP/GSC. W repo potwierdziłem tylko, że taki tytuł istniał do commita 3b7fc61.
4. **Bramka Cloudflare dla botów AI (Z9)** — wymaga panelu Cloudflare Pawła.
5. **Czy zdarzenia Umami realnie dolatują** — do sprawdzenia w panelu Umami po deployu.
   Sam kod nie jest dowodem.
