# STATUS operacji naprawczej SEO, 13-14.10.2026

Polecenie Pawła 13.10: „wdrażaj, zmieniaj stronę… wdrażaj wszystko na produkcję". To nadpisuje wcześniejszy podział ról (sesja SEO = tylko dokument) dla TEJ operacji.
Punkty cofnięcia: przed operacją `e3848a2` (tag `seo-2026-10-12`); po fali 0 `1a65a0d`; po fali 1 `1730588`. Szybkie cofnięcie: Vercel → Deployments → wybrane wdrożenie → Promote to Production. Cofnięcie samej fali 1 w kodzie: `git revert 85369bb`.

Legenda: NIERUSZONE / W TOKU / CLAIMED-UNVERIFIED / DONE (tylko z dowodem).

| # | Etap | Stan | Dowód |
|---|---|---|---|
| 0 | Fala 0 (formularz, pomiar, llms.txt, AI Act, /mission) | DONE | tsc 0, lint 0, build 86/86; commity d10b78d + 1a65a0d, push 13.10 |
| 0b | Fala 0 na produkcji | DONE | /mission 308; llms.txt 79 linków; chunk JS formularza: hp_kontrola 2×, firma_www 0×; /api/lead zły JSON → 400 |
| 0c | Make 9666591: wejscie/skad/utm w mailu z leadem | DONE | test Pawła 14.10 14:58 UTC: wykonanie Make status 1 (sukces, 2 operacje), mail „Now Lead z Simlefast.ai" w Gmailu z „Strona wejścia: /" (skąd/utm puste przy wejściu bezpośrednim, poprawnie). Poprawka 14.10: wiedza bota 75% → ok. 85% (commit 0d34499, na produkcji) |
| 1 | Zwiad (rój wf_6ff5322c-29f, 9 agentów) | DONE | `.seo-przeglad/naprawa-2026-10-13/` (zwiad.json, gsc.json, serp.json 23/42 frazy do CAPTCHA, audyt-strony.json, technika.json) |
| 2 | Plan fali 1 | DONE | ryzyka odsiane: strony chronione tylko dopiski, nowe podstrony w gałęziach chronionych przesunięte do fali 2 |
| 3 | Wdrożenie fali 1 (rój wf_d75df5ad-2ec: 7 autorów, integrator, 3 recenzentów, poprawki; wznowiony po limicie sesji) | DONE | 35 uwag recenzji (1 blokująca, 19 ważnych), poprawione; 2 moje poprawki 14.10 (bezpłatna rozmowa = badanie potrzeb, pomiar w Sprincie) |
| 4 | Weryfikacja lokalna | DONE | 14.10: tsc 0, lint 0, build 88/88; podgląd `next start` (port 3107): agenci-ai, wdrozenie-ai, sekcja „Jak działa voicebot", menu z nowymi pozycjami, konsola bez błędów; skan HTML 22 stron: 0 em-dash/półpauz i 0 placeholderów (poza 2 starymi półpauzami na stronie głównej) |
| 5 | Push + produkcja + zgłoszenia | DONE | commity 85369bb (kod) + 1730588 (docs), push 14.10; produkcja po 40 s: 10/10 adresów 200 z nowymi title/H1, 0× „USD"/„dolar", /ai-radar noindex, mapa 78 adresów (agenci-ai i wdrozenie-ai są, ai-radar nie), llms.txt z obiema stronami; GSC: ponowne zgłoszenie mapy HTTP 204; IndexNow: 78 adresów HTTP 200 |
| 6 | Pakiet poza stroną dla Pawła | DONE | `.seo-przeglad/naprawa-2026-10-13/PAKIET-POZA-STRONA.md` |
| 7a | Monitor tygodniowy `tools/seo-monitor.js` | DONE | odczyt bazowy `.seo-przeglad/monitor/2026-10-13.md`, 6/6 chronionych ok |
| 7b | Raport końcowy | DONE | `.seo-przeglad/raporty/2026-10-14-naprawa.md` |

## FALA 1 na produkcji (14.10)
| ID | Zmiana | Stan |
|---|---|---|
| F1-1 | NOWA `/uslugi/agenci-ai` „Agenci AI dla firm: czat, telefon i procesy" | DONE (200, w mapie, w menu, w llms.txt) |
| F1-2 | NOWA `/uslugi/wdrozenie-ai` „Wdrożenie AI w firmie: etapy, ceny, terminy" (parasol Architekci bez zmian) | DONE |
| F1-3 | Chatboty: poradnik cenowy pod pytanie rynkowe + link do cennika, cennik ↔ cennik voicebota, blog chatbot-czy-agent (szyk „agent AI", zł zamiast USD) | DONE |
| F1-4 | Voiceboty: blog bez USD; rodzic: link ceny → cennik + sekcja „Jak działa voicebot w czterech krokach"; cennik: tabela modeli rozliczeń; przychodnia: FAQ voicebot medyczny | DONE |
| F1-5 | Automatyzacje: tytuł „Automatyzacja procesów AI od 1990 zł netto", FAQ koszt, tabela poziomów, przykłady wg działu, zespół; blog pod frazę informacyjną; faktury: tytuł | DONE |
| F1-6 | Poradnik „Ile kosztuje agent AI dla firmy? Od 2500 zł" (ceny z cenników usług), blog koszt wdrożenia (ok. 85%, zł), audyt „Czym jest audyt AI?" + tytuł z ceną | DONE |
| F1-7 | Fichtelgebirgs-Haus, /ai-radar noindex, robots.txt | DONE. „Torocken Haus" zostawione (czeka na Pawła) |
| F1-8 | Integracja: rejestr, hub, menu, llms.txt, wiedza bota (3 pliki) | DONE. Kolor/ikona nowych usług = domyślne (zmiana wizualna czeka na Pawła) |

## Otwarte decyzje Pawła
1. „Twoje dane zostają w UE": badge w hero każdej usługi, stopka, strona główna. Przy silniku OpenAI/Anthropic/Google wybieranym przez klienta region nie jest potwierdzony. Na nowych stronach zdanie usunięte z treści.
2. Cena agenta do maili: dziś „wycena na diagnozie".
3. Opinia na stronie głównej: „Torocken Haus" czy Trockenhaus.
4. Role founderów: parasol Architekci mówi, że automatyzacje buduje Marcin, /o-nas i nowe sekcje, że Paweł.
5. Liczba KNF Team „około 8 h tygodniowo" na stronie wdrożenia.
6. Kolor, emoji, ikona agenci-ai i wdrozenie-ai w menu.
7. ~~Zgoda na testowe zgłoszenie~~ ZAMKNIĘTE 14.10: Paweł sam przetestował formularz, Make i mail działają.
8. Adres bazowy i pełna nazwa prawna (NAP, pakiet poza stroną pkt 0).

## FALA 2 (po pomiarze fali 1, nie wcześniej niż 28.10)
- `/uslugi/chatboty/wdrozenie` (fraza „wdrożenie chatbota", ryzyko podbierania rodzicowi „kto wdroży").
- `/poradniki/co-to-jest-voicebot` (definicja; ryzyko dla rodzica na „voicebot").
- Tytuł rodzica voicebotów bez ceny, odbieranie-telefonow pod „asystent telefoniczny AI".
- Linki ze strony głównej do cenników, link z treści parasola do /uslugi/wdrozenie-ai, lżejsze fonty i skrypty (wymaga oceny wyglądu).
- Stare etykiety „Ile kosztuje wdrożenie AI agenta" w 11 plikach spoza fali 1; public/wiedza-agenta.txt:84 podaje 75% zamiast 85%.

## Zasady tej operacji
- Strony i frazy, które rosną, chronione: bez przebudowy.
- Bez zmian wizualnych.
- Zero zmyślonych liczb, zero em-dash, zero dat AI Act, ceny tylko nasze i netto.
- Test zgłoszenia na produkcji tylko po zgodzie Pawła.
