# PRZEKAZANIE — dalsza praca nad stroną simplefast.ai (SEO + treści)

Data: 2026-08-16. Autor: sesja „skille" (CLAUDE CODE). Odbiorca: sesja „SFAI stronka".
Decyzja Pawła: strona i treści powstają w sesji SFAI; sesja skilli zostaje przy skillach i przeglądach.

## Zdanie startowe do wklejenia w sesji SFAI

> Przeczytaj PRZEKAZANIE-SESJA-SFAI.md w katalogu projektu i kontynuuj od sekcji BACKLOG.
> Obowiązują reguły z sekcji ŻELAZNE ZASADY.

---

## CO JEST ZROBIONE (nie ruszać, działa — zweryfikowane na produkcji)

| Co | Stan | Dowód |
|---|---|---|
| Formularz diagnozy | naprawiony: `/api/lead` → webhook Make | test E2E: lead 200 do Make, honeypot cichy, brak zgody 400. **UWAGA: sprawdzić, czy Paweł ustawił `MAKE_LEAD_WEBHOOK_URL` na Vercelu — bez tego produkcyjny formularz zwraca 503** |
| Pozycjonowanie (wariant A) | LIVE | title: `Chatboty, voiceboty i automatyzacje AI dla firm \| SimpleFast`, H1 2 linie (układ nietknięty, zmierzone), overline: „Budujemy Agentów AI, którzy pracują za Ciebie 24/7." |
| Meta 23 stron | wdrożone | commit `3b7fc61`: 4 usługi pod frazy z GSC, 9 tytułów ≤ budżetu, 7 opisów ≤155, 3 H1 bez em-dash |
| Teksty „nie chatboty" | usunięte z /uslugi i FAQ obiekcji | commit `da29b88` |
| Punkt cofnięcia | tag `seo-2026-08-16` (commit `c5c3266`) | `.seo-przeglad/punkty-cofniecia.md` |

## DECYZJE PAWŁA I MARCINA (locked — nie renegocjować)

1. **Ceny jawne, sprzedajemy jako gotowe pakiety „od…":**
   - Chatbot: **od 990 zł** (start) — UWAGA: strona pokazuje dziś „AI Start 1990 zł"; przy pisaniu artykułu-cennika trzeba dodać pakiet 990 zł na stronę, żeby nie było rozjazdu artykuł↔strona
   - Voicebot: **od 2 500 zł albo 2 900 zł — Paweł ma wybrać przy pisaniu artykułu** (nie zgadywać)
   - Audyt AI: 1 490 zł (bez zmian) · pozostałe wdrożenia 3 000-10 000 zł (bez zmian)
   - **Opieka/abonament: od 99 do 599 zł/mies** — każde wdrożenie z opieką, komunikować „nie zostawiamy klientów"
2. Wariant A pozycjonowania — wdrożony, nie wracać do „nie chatboty".
3. Frazy cenowe = priorytet contentu (uzasadnienie: research niżej).

## RESEARCH (fundament decyzji — przeczytaj przed pisaniem)

`.seo-przeglad/KONKURENCJA-2026-08-16.md` — top10 PL: wzorce tytułów, konkurenci z cenami
(lessmanual od 3 500 do 45 000; syntalith od 1 990), 4 synonimy kategorii voice,
otwarta luka cenowa w automatyzacjach.
`.seo-przeglad/raporty/2026-08-16.md` — pełny przegląd SEO (46 podstron).
`.seo-przeglad/PROPOZYCJE-2026-08-16.md` — porównania meta przed/po.
Dane GSC (28 dni): 1216 wyświetleń, 23 kliknięcia, poz. 18,2; chatboty 424 wyśw./3 klik., voiceboty 394/2.
Narzędzia z kluczami Pawła: `tools/gsc-raport.js`, `tools/bing-raport.js`, `tools/bing-diagnoza.js` (klucze w `~/.sekrety/`).

## BACKLOG (kolejność wg efekt/koszt)

1. **Artykuł „Ile kosztuje chatbot AI dla firmy? Cennik 2026"** — kwota „od 990 zł" w tytule i H1; widełki rynkowe jako tło (2 000-45 000 zł); sekcja ukrytych kosztów i abonamentu (99-599 zł/mies); FAQPage schema. RÓWNOLEGLE: pakiet 990 zł na stronę chatbotów.
2. **Artykuł „Ile kosztuje automatyzacja AI w firmie? Widełki 2026"** — OTWARTA LUKA, nikt w top10 nie podaje kwot. Nasze 3 000-10 000 zł + opieka.
3. **Voicebot: rozbudowa podstrony** — title „Voicebot AI dla firm" + „od X zł" (Paweł wybierze 2 500/2 900); H2 na synonimy: bot telefoniczny, agent głosowy AI, AI do odbierania telefonów, wirtualna recepcjonistka.
4. **FAQ H2 na podstronach usług** („Ile kosztuje…?", „Jak wygląda wdrożenie krok po kroku?") — pod snippety i AEO.
5. Podstrona „chatbot na stronę www" (osobna intencja, konkurenci mają osobne URL-e).
6. Nazewnictwo „agenci AI" (polski szyk) w menu/kotwicach zamiast „AI Agentów" — audyt wystąpień.
7. Landingi branżowe (kancelarie, gabinety, beauty, restauracje) — dopiero po 1-5.

## ŻELAZNE ZASADY (z ust Pawła, łamanie = cofka)

- **Zmieniamy TYLKO teksty.** Animacje, formatowanie, przejścia, układ — NIETYKALNE. Hero H1 ma animację maszyny do pisania (WritingHeadline liczy litery dynamicznie — zmiana stringa jest bezpieczna, zmiana struktury NIE).
- **Każde wdrożenie sprawdzić na produkcji** (build ≠ dowód; otworzyć live, zmierzyć).
- Przed serią zmian: `git tag seo-RRRR-MM-DD` + push taga (wzór w `.seo-przeglad/punkty-cofniecia.md`).
- Zero em-dash w treściach. Zero zmyślonych liczb — ceny tylko z sekcji DECYZJE.
- Skill `seo-przeglad` (globalny) robi cykliczny przegląd z porównaniem do migawki — odpalać co kilka dni, werdykt STABILNIE/REGRESJA.
- Cel nadrzędny: wysokie pozycje w polskim Google + cytowalność w AI (ChatGPT/Perplexity/Gemini) + leady z formularza.

## CZEKA NA PAWŁA

1. `MAKE_LEAD_WEBHOOK_URL` na Vercelu (Production) + Redeploy → test formularza na live.
2. Wybór ceny voicebota: 2 500 czy 2 900 zł.
3. Autoryzacja Ahrefs (claude.ai → konektory) → realne wolumeny fraz zamiast obecności w SERP.
4. Klucz API Umami do `~/.sekrety/umami-api-key.txt` → odczyt danych o ruchu.
