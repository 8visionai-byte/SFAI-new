# STATUS operacji naprawczej SEO, start 2026-10-13 (wieczór)

Polecenie Pawła 13.10: „wdrażaj, zmieniaj stronę… wdrażaj wszystko na produkcję". To nadpisuje wcześniejszy podział ról (sesja SEO = tylko dokument) dla TEJ operacji.
Punkt cofnięcia: tag `seo-2026-10-12` = `e3848a2` (produkcja przed operacją). Szybkie cofnięcie: Vercel → Deployments → e3848a2 → Promote to Production.

Legenda: NIERUSZONE / W TOKU / CLAIMED-UNVERIFIED / DONE (tylko z dowodem).

| # | Etap | Stan | Dowód |
|---|---|---|---|
| 0 | Fala 0 (formularz, pomiar, llms.txt, AI Act, /mission): ponowny build, commit, push | W TOKU | |
| 0b | Fala 0 na produkcji: pole `hp_kontrola` w HTML, 308 /mission, llms.txt 77/77 | NIERUSZONE | |
| 1 | Zwiad (rój): GSC per gałąź, SERP Google.pl, strony konkurencji vs nasze, audyt całej strony, technika | NIERUSZONE | |
| 2 | Plan zmian + adwersaryjna weryfikacja każdej zmiany (ryzyko spadku stron, które rosną) | NIERUSZONE | |
| 3 | Wdrożenie zmian (tekst, metadane, linki, nowe strony; bez ruszania designu) | NIERUSZONE | |
| 4 | Weryfikacja: tsc, lint, build, qa-auditor, przeglądarka | NIERUSZONE | |
| 5 | Push + sprawdzenie na produkcji + mapa witryny GSC + IndexNow | NIERUSZONE | |
| 6 | Pakiet poza stroną dla Pawła (opisy do katalogów, profil Google, LinkedIn) | NIERUSZONE | |
| 7 | Monitor (skrypt tygodniowy) + raport końcowy | NIERUSZONE | |

## Zasady tej operacji
- Strony i frazy, które rosną (bot telefoniczny, chatbot dla firmy, voiceboty), chronione: bez przebudowy, tylko dopisanie linków lub drobne zmiany po weryfikacji.
- Bez zmian wizualnych (animacje, układ, komponenty, kolory).
- Zero zmyślonych liczb, zero em-dash, zero dat AI Act, ceny tylko nasze i netto.
- Test zgłoszenia na produkcji (TEST-AUDYT) dopiero po zgodzie Pawła (wysłanie formularza).
