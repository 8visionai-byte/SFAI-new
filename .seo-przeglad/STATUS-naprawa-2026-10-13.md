# STATUS operacji naprawczej SEO, start 2026-10-13 (wieczór)

Polecenie Pawła 13.10: „wdrażaj, zmieniaj stronę… wdrażaj wszystko na produkcję". To nadpisuje wcześniejszy podział ról (sesja SEO = tylko dokument) dla TEJ operacji.
Punkt cofnięcia: tag `seo-2026-10-12` = `e3848a2` (produkcja przed operacją). Szybkie cofnięcie: Vercel → Deployments → e3848a2 → Promote to Production.

Legenda: NIERUSZONE / W TOKU / CLAIMED-UNVERIFIED / DONE (tylko z dowodem).

| # | Etap | Stan | Dowód |
|---|---|---|---|
| 0 | Fala 0 (formularz, pomiar, llms.txt, AI Act, /mission): ponowny build, commit, push | DONE | tsc 0, lint 0, build 86/86; commity d10b78d (kod) + 1a65a0d (docs), push e3848a2..1a65a0d |
| 0b | Fala 0 na produkcji | DONE | /mission 308 → /; llms.txt 79 linków, 0× /dowod; chunk JS formularza: hp_kontrola 2×, firma_www 0×; home 0× „2 sierpnia 2026"; /api/lead zły JSON → 400 zly-format |
| 0c | Make 9666591: pola wejscie/skad/utm w mailu z leadem | CLAIMED-UNVERIFIED | scenarios_update 20:31 UTC: isActive true, isinvalid false; w „Dane techniczne" dopisane 3 linie (Strona wejścia, Skąd przyszedł, UTM) + 5 pól w interfejsie webhooka. Cofnięcie: usunąć te 3 linie. Dowód końcowy wymaga testowego zgłoszenia (zgoda Pawła) |
| 1 | Zwiad (rój wf_6ff5322c-29f): GSC per gałąź, SERP Google.pl, strony konkurencji vs nasze, audyt całej strony, technika | DONE | 9/9 agentów; wyniki `.seo-przeglad/naprawa-2026-10-13/` (zwiad.json, gsc.json, serp.json 23/42 frazy, potem CAPTCHA, audyt-strony.json, technika.json) |
| 2 | Plan fali 1 (poniżej) | DONE | odsiew ryzyk: strony chronione tylko dopiski; nowe podstrony w gałęziach chronionych przesunięte do fali 2 |

## Najważniejsze ustalenia zwiadu
- Wysokie średnie pozycje w GSC („chatbot dla firmy" 2,5, „bot telefoniczny" 3,9) to głównie cytaty w Przeglądzie od AI. Organicznie na stronie 1 jesteśmy w 1 z 23 fraz („kto wdroży chatbota ai dla firmy", poz. 4); w 7 frazach strona 2; w 15 poza top 20.
- Agenci AI i wdrożenie AI: brak stron, 0 wyświetleń; w top 10 są domeny słabsze od nas (DR 9-16) z frazą w tytule. To luka treści, nie autorytetu.
- Frazy cenowe wygrywają słabe domeny (DR 0,3-24) formatem: rok + cena w tytule, modele rozliczeń, porównania. My kanibalizujemy (rodzice zabierają frazy cennikom).
- Sprzeczne ceny w blogu (USD 500-5000, „nie podajemy stawek") vs cenniki w zł.
- Główne frazy ogólne („chatbot ai dla firm", „voicebot") = autorytet (mediana DR 43-50, home.pl 90). Treść tego nie przeskoczy, potrzebne linki (raport 13.10 sekcja 7).
- Google dawno nie czytał: poradnik o agencie AI (07.07, ze starym canonical bez www), /uslugi/chatboty (06.09).
- Krok 0 z 12.10: podstrony chatbotów NIE wróciły po 08.10; w repo zero commitów 22.09-13.10, więc przyczyna zewnętrzna.

## FALA 1 (14.10, data zmian `2026-10-14`)
| ID | Zmiana | Stan | Dowód / uwagi |
|---|---|---|---|
| F1-1 | NOWA `/uslugi/agenci-ai` (Usluga w rejestrze) | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10; HTML: title 59 zn., 1× H1, 0× em-dash i półpauza, 0 placeholderów |
| F1-2 | NOWA `/uslugi/wdrozenie-ai` (Usluga; parasol architekci zostaje) | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10; link wdrożenie → parasol jest. Link w TREŚCI parasola → wdrożenie wymaga zmiany .tsx (app/uslugi/architekci-wartosci-ai/page.tsx), przeniesiony do fali 2 za zgodą Pawła |
| F1-3 | Chatboty: poradnik cenowy pod cenę rynkową + link do cennika, cennik ↔ cennik voicebota, blog chatbot-czy-agent (szyk „agent AI", zł zamiast USD) | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10 |
| F1-4 | Voiceboty: blog bez USD i „nie podajemy stawek", rodzic: link ceny → cennik + sekcja „Jak działa voicebot" (~60 słów), cennik: tabela modeli rozliczeń, przychodnia: FAQ voicebot medyczny | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10 |
| F1-5 | Automatyzacje: tytuł usługi ≠ blog, FAQ koszt, tabela automatyzacja/AI/agent, przykłady per dział, zespół; blog pod frazę informacyjną; faktury: tytuł | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10; „automatyzacja procesów w firmie" zostaje TYLKO we wpisie (usunięte z queries usługi) |
| F1-6 | Agent: poradnik „Ile kosztuje agent AI dla firmy? Od 2500 zł" + szyk; blog koszt wdrożenia: 75% → ok. 85%, zł zamiast USD; audyt: „Czym jest audyt AI?" + tytuł z ceną | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10; ceny agenta w poradniku ujednolicone z cennikami usług (2500 zł = agent w telefonie, wersja prosta) |
| F1-7 | Drobne: „Fichtelgebirgshaus" → Fichtelgebirgs-Haus, /ai-radar noindex, robots.txt znaki | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10. „Torocken Haus" → Trockenhaus COFNIĘTE 14.10 (recenzja: cytat o nagrywaniu w aucie nie pasuje do jednoosobowej firmy od kosztorysów); czeka na Pawła |
| F1-8 | Integracja: rejestr, hub /uslugi, llms.txt, wiedza bota (lib/agent/knowledge.ts, api/_knowledge.mjs, public/wiedza-agenta.txt), menu (nav-data), badge (inf-kategorie) | CLAIMED-UNVERIFIED | pliki w repo (niewypchnięte); tsc 0, lint 0, build 88/88 po poprawkach recenzji 14.10. Hub app/uslugi/page.tsx: poza zakresem „opis + klastry" doszły odmiana() i liczba usług z rejestru (bez tego hero mówiłby „dwanaście", a usług jest 14) oraz 4 przeredagowane odpowiedzi FAQ huba (dopisane „netto"). Do świadomej akceptacji Pawła. Kolor, emoji i ikona agenci-ai / wdrozenie-ai w INF_KATEGORIA NIE ustawione (zmiana wizualna), dziś fallback ✨ |

### Otwarte decyzje Pawła (przed pushem)
1. Zdanie „dane zostają w UE" przy silnikach OpenAI, Anthropic i Google. Na obu nowych stronach usunięte z treści (zostaje: umowa powierzenia, konto klienta, co trafia do dostawcy). Badge „Twoje dane zostają w UE" w ServiceHero, stopka, strona główna i inne usługi mówią to dalej.
2. Cena agenta do maili. Do decyzji: „wycena na diagnozie" (było 3000-10000 zł netto wywnioskowane z cennika automatyzacji).
3. Cena agenta z integracjami w poradniku: ujednolicona do cenników usług (5000-9000 zł telefon, 8000-15000 zł czat). Czy tytuł „Od 2500 zł" zostaje obok progu 1790 zł.
4. Nazwa firmy Andrzeja w opinii na stronie głównej: „Torocken Haus" czy Trockenhaus (jeśli Trockenhaus, trzeba poprawić „jednoosobowa firma" w realizacji).
5. Role founderów: strona Architekci Wartości AI mówi, że automatyzacje buduje Marcin; lib/o-nas/content.ts i nowe sekcje mówią, że Paweł. Która wersja jest aktualna.
6. Liczba KNF Team „około 8 h tygodniowo" na nowej stronie wdrożenia (źródło: lib/uslugi/automatyzacje.ts, zastrzeżenie: jedno zdanie, jedna liczba).
7. Kolor, emoji i ikona dla agenci-ai i wdrozenie-ai w menu i kartach (propozycja w raporcie poprawek).

## FALA 2 (po pomiarze fali 1, nie wcześniej niż 28.10)
- `/uslugi/chatboty/wdrozenie` (fraza „wdrożenie chatbota", ryzyko podbierania rodzicowi „kto wdroży").
- `/poradniki/co-to-jest-voicebot` (definicja; ryzyko dla rodzica na „voicebot").
- Tytuł rodzica voicebotów bez ceny, odbieranie-telefonow pod „asystent telefoniczny AI".
- Linki ze strony głównej do cenników, lżejsze fonty i skrypty (wymaga oceny wyglądu).
| 3 | Wdrożenie zmian (tekst, metadane, linki, nowe strony; bez ruszania designu) | CLAIMED-UNVERIFIED | zmiany w drzewie roboczym 13.10 wieczór - 14.10, poprawki po recenzji 14.10; bez commita i pusha |
| 4 | Weryfikacja: tsc, lint, build, qa-auditor, przeglądarka | W TOKU | 14.10 po poprawkach recenzji: tsc 0, lint 0, build 88/88, HTML nowych stron sprawdzony (title, H1, em-dash, placeholdery). Recenzja fali 1 zrobiona; przeglądarka i produkcja jeszcze nie |
| 5 | Push + sprawdzenie na produkcji + mapa witryny GSC + IndexNow | NIERUSZONE | |
| 6 | Pakiet poza stroną dla Pawła (opisy do katalogów, profil Google, LinkedIn) | DONE | `.seo-przeglad/naprawa-2026-10-13/PAKIET-POZA-STRONA.md` (fakty sprawdzone grepem: ceny, 85% IK, rynek PL/DE) |
| 7a | Monitor tygodniowy `tools/seo-monitor.js` | DONE | uruchomiony 13.10: odczyt bazowy `.seo-przeglad/monitor/2026-10-13.md`, 6/6 chronionych ok, indeks: agenci-ai i wdrozenie-ai „Google nieznany" (oczekiwane), poradnik agenta pobrany 07.07 |
| 7b | Raport końcowy | NIERUSZONE | |

## Zasady tej operacji
- Strony i frazy, które rosną (bot telefoniczny, chatbot dla firmy, voiceboty), chronione: bez przebudowy, tylko dopisanie linków lub drobne zmiany po weryfikacji.
- Bez zmian wizualnych (animacje, układ, komponenty, kolory).
- Zero zmyślonych liczb, zero em-dash, zero dat AI Act, ceny tylko nasze i netto.
- Test zgłoszenia na produkcji (TEST-AUDYT) dopiero po zgodzie Pawła (wysłanie formularza).
