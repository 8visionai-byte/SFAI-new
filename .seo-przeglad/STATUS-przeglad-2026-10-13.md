# STATUS przeglądu SEO 2026-10-13

Osobny plik, żeby nie kolidować z `STATUS.md` sesji WWW (49 niezacommitowanych zmian, fala 0).

| Etap | Stan | Dowód |
|---|---|---|
| F0 punkt cofnięcia | DONE (z wczoraj) | tag `seo-2026-10-12` = e3848a2 = origin/main; od wczoraj 0 nowych commitów, nowy tag zbędny |
| Odczyt raportu 2026-10-12 | DONE | `.seo-przeglad/raporty/2026-10-12.md` przeczytany w całości, nie powtarzam jego pracy |
| Świeże dane GSC do 12.10 | DONE | miesiąc po miesiącu, 21 dni, gałęzie tydzień po tygodniu, 10 fraz pieniężnych w 4 okresach, kanibalizacja 42/229 |
| Leady: Make 9666591 | DONE | scenariusz aktywny, niezapauzowany, webhook 4318020 włączony, kolejka 0, lista wykonań pusta |
| Leady: Gmail | DONE | temat „Simlefast": 3 maile w historii (16.08 ×2 test, 24.08 ×1), 0 od 24.08 |
| Leady: env na produkcji | DONE | POST /api/lead z błędnym JSON → 400 `zly-format` (przy braku env byłoby 503), Make nic nie dostał |
| Leady: pułapka `firma_www` | DONE (HIPOTEZA) | produkcja: pole ukryte przez `absolute -left-[9999px] h-0 w-0`, nie `display:none`; serwer przy wypełnionym polu zwraca `ok:true` i nic nie wysyła |
| simplefastai.pl | DONE | strefa DNS jest na koncie Hostinger Pawła (A 92.113.19.159), serwuje pustą stronę „Hostinger Horizons" |
| Bing linki | DONE | GetCrawlStats: InLinks 7 (13.06) → 6 (07.10), InIndex 9 → 65; GetLinkCounts: 0 |
| Rój autorytetu (wf_52dbfffb-26c) | DONE | 10/10 agentów zakończyło; 9 kategorii, każde źródło sprawdzone na żywo (koszt, dofollow/nofollow, cytowanie w AI). Planista dostał ucięte dane (3-4 z 9 kategorii), brakujące kategorie dołożyłem ręcznie z journal.jsonl |
| Korekty wyników roju | DONE | mail w domenie simplefast.ai już istnieje (`lib/site.ts`), więc warunek Retell spełniony; „Zielona Góra" z opisów agentów NIE jest na stronie (strona: Pisz + biura Gubin, Strzegom), usunięta z zaleceń; Nagroda Marszałka: siedziba Pisz = najpewniej odpada; Perplexity działało bez logowania u agenta treści (planista twierdził inaczej) |
| Raport 2026-10-13 | DONE | `.seo-przeglad/raporty/2026-10-13.md`, sekcje 1-10, sekcja 7 = plan autorytetu (7.1-7.8), 0 em-dashy, 0 placeholderów |
| Historia przeglądów | DONE | wiersz 2026-10-13 w `.seo-przeglad/historia.md` |
