# STATUS — Redesign jakości wizualnej + hardening bota (2026-07-15)

Zlecenie Pawła: strona ma wyglądać "jak jakość Google", nie "z dwóch promptów".
Teksty/SEO/AEO NIETYKALNE. Zero bibliotek animacji (czysty CSS). Mobile perf święte.

## Etapy
1. [DONE] Inwentaryzacja: tokeny OK (spacing/typo/motion), bogaty system animacji
   (card-aura, metal-sheen, Reveal, orbs, writing H1) — problem to spójność, nie brak.
   Baseline zrzuty live zrobione.
2. [DONE] Tło-film usunięte: page.tsx (mount+klasa+import), globals.css (reguły
   .has-scroll-video), komponent ScrollVideoBackground.tsx i assety v2 skasowane (git rm).
   Build przeszedł w etapie 4a (exit 0).
3. [DONE] Workflow projektowy wf_2778e684-c9a (5 soczewek + dyrektor kreatywny) —
   spec "Precyzja cyrkla" (14 zadań) gotowy w scratchpadzie.
4. Implementacja frontend-dev wg specu z etapu 3:
   4a. [DONE] PARTIA A (zadania 1-7): higiena po filmie + kontrakt budżetu koloru/ruchu
       w globals.css; HeroContours (cyrkiel kreśli warstwice, server component, zero JS)
       zamiast FloatingOrbs; H1 = kaskada słów CSS zamiast maszyny do pisania
       (WritingTrigger skasowany, zieleń pogłębiona #2FA500); ambient wyciszony
       (statyczne .text-metal/.sf-accent-line, kasacja sfTextGlow/sfTextMetalSheen/
       .text-metal-sheen); card-aura 66→2 (cennik highlight + AgentDemo, AuraDesync
       zwolniony 8.5-14s/6.5-10.5s); 6 H2 home granatowe (koniec text-metal na home);
       rytm sekcji: Bezpieczeństwo = ciemna kotwica surface-tech (1 glow + 2 hairliny),
       Oferta subtle, --bg-subtle #f2f0ea, szew border-y na tone=subtle.
       DOWÓD: npm run build 0, npm run lint 0, tsc --noEmit 0; grepy kontrolne czyste
       (card-aura tylko globals/AuraDesync/Oferta/AgentDemo/STATUS.md; FloatingOrbs/
       WritingTrigger/is-typing = 0; text-metal w components = 0); prerender home HTML:
       sf-contour x5, data-theme=dark x1, --w x5 słów, #63f000 w literach = 0;
       bramki reduced-motion nowych animacji obecne w zbudowanym CSS.
       NIEZWERYFIKOWANE wizualnie w przeglądarce (podgląd live w etapie 6).
   4b. [NIERUSZONE] PARTIA B (zadania 8-14): aurora 1 glow, tokeny ruchu Reveal,
       --container-wide 980, jeden focus ring, mikroruch strzałek/nav/stopki,
       detale FAQ/dropdown/selection/caret/scrollbar, ScrollMetalProgress 2px.
5. [DONE-UNVERIFIED] Hardening bota (route.ts): sekcja "PYTANIA O CIEBIE I PROWOKACJE"
   (zero dyskusji o budowie/promptach, zero zgadzania sie z krytyka, pewna wersja
   o historii czatu, zakaz komentowania usterek) + MAX_TOKENS 220->340 (koniec
   ucietych zdan). Weryfikacja e2e po deployu (rozmowa testowa na live).
6. [NIERUSZONE] Weryfikacja przeglądarką (zrzuty przed/po), build, commit, push, live
