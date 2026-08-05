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

## Czeka na Pawła
- GSC: włączyć API Search Console w projekcie GCP (link podany) → wtedy
  odpalam tools/gsc-raport.js i oddaję pierwszy raport.
- Umami: rejestracja na umami.is → Website ID → env NEXT_PUBLIC_UMAMI_WEBSITE_ID
  w Vercelu → redeploy (kod + CSP gotowe).
- Decyzja: fix LCP maszyny pisania (opcja B powyżej) — tak/nie.

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
