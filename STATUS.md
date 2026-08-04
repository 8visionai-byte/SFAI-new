# STATUS — "Piękna strona": nowy język zdjęć + ruch (2026-08-03)

Zlecenie Pawła: strona ma być PIĘKNA (dziś "designersko bardzo kiepsko").
Sposób pokazywania zdjęć wprost ODRZUCONY. Wolno: wizualizacje, animacje, przejścia
kart, grafika. NIE WOLNO: teksty, nagłówki, schema/SEO/AEO, kolejność sekcji.
Zero bibliotek animacji, mobile perf święte, reduced-motion obowiązkowe.
Maszyna do pisania H1 = NIETYKALNA (sygnatura Pawła).

Pipeline (skill design-pipeline): E1 audyt+kierunek (redesign-existing-projects,
design-taste-frontend, high-end-visual-design, ui-ux-pro-max, apple-design) →
E3 ruch (find-animation-opportunities, emil-design-eng) → E4 impeccable + dowód w przeglądarce.

## Etapy
1. [DONE] Rekonesans: baseline live (hero: dużo pustki, warstwice ledwo widoczne),
   kod prezentacji zdjęć = prostokąt 16:9 w ramce obok tekstu (SectionImage + 5 sekcji
   home + ServiceHero) — to jest to, co Paweł odrzucił.
2. [DONE] Workflow wf_57b3f483-ba1 (6 agentów, 1.1M tokenów) → spec "PŁYTA NA KALCE"
   w scratchpadzie: spec-piekna.json (95KB).
   DIAGNOZA: ciemne kinowe kadry wciskane w kredową ramkę 1px = "czarna plama udaje
   lekki element jasnej strony". NOWY JĘZYK: zdjęcie = ciężka PŁYTA (obudowa navy-950,
   inset light edge, głęboki cień granatowy), 5 ról użytych po razie na home:
   BLEED (Problem, panorama pełnej szerokości, karty bólu nachodzą),
   STAGE (Bezpieczeństwo, zdjęcie jako pokój całej sekcji),
   FRAME (Dowód + hero 10 usług, kwadrat wychodzący do krawędzi),
   CANVAS (Gwarancja, kino 2.4:1 z tekstem w czerni kadru),
   RIBBON (JakToDziała, wstęga zrośnięta z krokami).
   Znaleziony realny bug: .sf-img-parallax na <img> — animacja bije deklarację,
   więc hover:scale cicho nie działa (paralaksa musi iść na wrapperze).
3. [W TOKU] Implementacja równoległa:
   - Partia A (agent 1): globals.css (CAŁY nowy CSS), komponent płyty, hero,
     5 sekcji ze zdjęciami, ServiceHero. WYŁĄCZNOŚĆ na te pliki.
   - Partia B (agent 2): pozostałe sekcje, system ruchu/przejść kart, mikrodetale.
     ZAKAZ dotykania globals.css i plików partii A; CSS oddaje w raporcie.
4. [NIERUSZONE] Audyt impeccable + weryfikacja przeglądarką (zrzuty przed/po).
5. [NIERUSZONE] Build, commit, push, weryfikacja live.

## Kontekst techniczny (dla wznowienia)
- Ostatni commit: bc12e49 (zdjęcia + maszyna pisania + przejścia stron)
- 16 zdjęć WebP w public/img (~30KB/szt., 1400x788, ciemne sceny + smugi danych)
- Źródłowe PNG (47MB) w zrodla/ (gitignore)
