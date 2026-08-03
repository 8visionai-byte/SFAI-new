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
   4b. [DONE] PARTIA B (zadania 8-14) wdrożona: aurora 1 glow, tokeny ruchu Reveal
       (500ms/14px/70ms), --container-wide 980, jeden focus ring (+.sf-cta),
       mikroruch strzałek/nav aria-current/stopka .u-slide, FAQ+dropdown+selection+
       caret+scrollbar, pasek 2px. DOWÓD: build/lint/tsc 0, grepy pokrycia czyste.
5. [DONE] Hardening bota zweryfikowany NA LIVE (2 rozmowy testowe po deployu):
   pytanie o LLM/limity -> pewna odpowiedź + pivot (zero "nie wiem jak jestem
   zbudowany"); krytyka "strona z 2 promptów" -> zero przytakiwania, pewna riposta.
6. [DONE] Commit ce8c05f (55 plików, +701/-759) wypchnięty; live zweryfikowane:
   sf-contour x10, sf-orb 0, dark x1, bg-topo 0, kaskada --w x5.

## ZAKOŃCZONE 2026-07-15. Otwarte drobiazgi (nie blokują):
- Martwy VideoBackground.tsx + .bg-metal-sheen/.bg-scrim-* (kandydat do sprzątnięcia)
- Karta "dotacja" w Oferta.tsx zlewa się tłem z sekcją subtle (ratuje border)
- PNG logo 1.4-1.8MB w public/brand (kandydat do kompresji)
- PageSpeed mobile po redesignie (do pomiaru)
