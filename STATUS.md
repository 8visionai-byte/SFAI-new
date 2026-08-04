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
3. [DONE] Implementacja równoległa (36 plików, +1359/-491):
   - Partia A: globals.css (cały nowy CSS + blok B), komponent .sf-plate z 5 rolami,
     tokeny (display 88, h2 46, cienie dwuwarstwowe, --hairline, --border-control),
     hero, 5 sekcji ze zdjęciami, ServiceHero.
   - Partia B: 18 plików — ściana cytatów, cennik, FAQ 2-kolumnowe z natywną
     animacją, spec-sheet, PasekZaufania, BranzeDemo, przyciski, mikrodetale.
4. [DONE] Weryfikacja przeglądarką: 5 ról płyt renderuje się poprawnie (zrzuty:
   panorama Problem + karty nachodzące, pokój Bezpieczeństwa, kwadrat Dowodu),
   maszyna pisania działa (30/30), mobile 375px BEZ poziomego scrolla.
   FIX po drodze: ServiceHero miał BOM + double-encoded UTF-8 (mój błąd z
   PowerShell w commicie bc12e49) — "Strona gĹowna" na 10 podstronach. Naprawione.
   Hook impeccable: gradient-text na --metal-gradient = brandbook Pawła, false
   positive, nie wyciszony (czeka na ewentualną decyzję).
5. [DONE] Commit d50e9fb wypchnięty; live potwierdzone: 26x sf-plate, 6 kadrów
   ról, data-writing obecny, zero starych ramek, breadcrumb PL poprawny.

## ZAKOŃCZONE. Otwarte drobiazgi (nie blokują):
- --ease-spring (bounce) w tokenach — hook uważa za dated; do decyzji Pawła
- PNG logo 1.4-1.8MB w public/brand (kandydat do kompresji)
- PageSpeed mobile po redesignie (do pomiaru)
- interpolate-size: allow-keywords działa globalnie — sprawdzić inne animacje wysokości

## Kontekst techniczny (dla wznowienia)
- Ostatni commit: bc12e49 (zdjęcia + maszyna pisania + przejścia stron)
- 16 zdjęć WebP w public/img (~30KB/szt., 1400x788, ciemne sceny + smugi danych)
- Źródłowe PNG (47MB) w zrodla/ (gitignore)
