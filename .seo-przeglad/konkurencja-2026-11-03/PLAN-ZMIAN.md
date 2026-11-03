# Plan zmian po analizie konkurencji top 3 (03-04.11.2026)

Źródło: rój 5 agentów (Sonnet, 643 tys. tokenów), surowe wyniki w `wyniki.json` obok. Każda gałąź: 3 strony z top 3 Google.pl porównane z naszymi.

## Wniosek w jednym akapicie

We wszystkich 5 gałęziach nasze strony są dłuższe i pełniejsze niż liderzy (u nas 1700-2970 słów, ceny, FAQ, dane strukturalne; u liderów 250-2000 słów, często bez cen). Liderzy wygrywają czterema rzeczami: siłą domeny i linkami (home.pl, Microsoft, Easycall, Daktela, domeny z frazą w nazwie: voicebot.pl, agenciai.pl), dowodem społecznym (opinie, „1600 firm", „140+ firm"), gęstym klastrem artykułów wokół tematu (Dokodu: około 30 wpisów o agentach) oraz sekcjami „czym jest / rodzaje / porównanie", których nam brakowało. Treść skopiujemy i ulepszymy. Autorytetu i opinii nie skopiujemy, tylko je zdobędziemy.

## Zrobione 04.11 (na produkcji, sprawdzone)
- `/uslugi/audyt-ai`: FAQ „Jakie są rodzaje audytu AI i który jest dla mnie?" (fraza „audyt ai" jest szersza niż strona).
- `/uslugi/chatboty` (chroniona, jedno pytanie): FAQ „Czym chatbot AI różni się od chatbota na regułach?".
- `/uslugi/voiceboty/odbieranie-telefonow`: link do poradnika „Co to jest voicebot".

## Odrzucone (łamią zasady)
- Ceny konkurencji na naszym cenniku voicebota (169 zł, 499 zł/mies.): zasada „ceny tylko nasze".
- „Dane zostają w UE" w FAQ automatyzacji: otwarta decyzja Pawła.
- Liczby skuteczności bez źródła (np. „70-80% zapytań"): zero zmyślonych liczb.

## Do zrobienia: treść (bez danych od Pawła), od największego zysku

| # | Co | Gdzie | Dlaczego (dowód z analizy) |
|---|---|---|---|
| 1 | Nowy poradnik „Co to jest chatbot AI i jak działa w firmie" (rodzaje: regułowy, AI) | `/poradniki/co-to-jest-chatbot` | Easycall i Streamsoft (1. i 2. na „chatbot dla firmy") to strony definicyjne; bliźniak poradnika o voicebocie |
| 2 | Nowy poradnik „Voicebot czy chatbot: co wybrać dla firmy" | `/poradniki/voicebot-czy-chatbot` | 3 konkurentów ma osobną stronę porównania (smart-asystenci, itdesk, sovva) |
| 3 | Nowy poradnik „Jak wdrożyć agenta AI w firmie: plan krok po kroku" | `/poradniki/jak-wdrozyc-agenta-ai-w-firmie` | Dokodu ma taki wpis (2740 słów); nasz klaster o agentach to dziś 1 usługa + 1 poradnik |
| 4 | Nowa podstrona „Automatyzacja ofert: wycena w 20 minut" | `/uslugi/automatyzacje/automatyzacja-ofert` | GSC poz. 24; Sagiton ma osobną usługę ofertowania; mamy twardy dowód (Trockenhaus) |
| 5 | Poradnik o agencie: sekcje „Jak rozliczyć wdrożenie agenta AI" i „Na czym firmy przepalają budżet" | `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts` | Liderzy (stormit, cognity) mają modele wyceny; strona rośnie, więc tylko dopisy |
| 6 | Automatyzacje: FAQ „Co może pójść nie tak i jak się zabezpieczamy" (bez zdania o UE) oraz akapit „systemy na własność" | `lib/uslugi/automatyzacje.ts` | Microsoft i Sagiton mają sekcję ryzyk |
| 7 | Wdrożenie AI: nazwy narzędzi, które realnie integrujemy (Make, n8n, poczta, arkusze, CRM: tylko te z repo) | `lib/uslugi/wdrozenie-ai.ts` | Gagan wymienia konkretne systemy |
| 8 | Rok 2026 w tytułach audytu i wdrożenia (np. „Audyt AI 2026: cena 1490 zł netto, 5 dni") | `audyt-ai.ts`, `wdrozenie-ai.ts` | Część liderów ma rok; mierzyć po 14 dniach, bo zmiana tytułu tasuje pozycję |

Kolejność wdrażania: najpierw 1-3 (nowe strony informacyjne budują klaster tematyczny, którego nam brakuje), po 7-14 dniach 4-8. Nie więcej niż 2-3 nowe strony naraz.

## Wymaga danych od Pawła ([BRAKUJE])
- Opinie klientów z imieniem i zgodą (KNF Team, Instytut Kryptografii, Trockenhaus, Desant.pl): największa luka dowodu społecznego we wszystkich gałęziach.
- Liczba obsłużonych firm albo wdrożeń (liderzy: „1600 firm", „140+ firm").
- Typowy czas wdrożenia pierwszej automatyzacji w dniach roboczych (dziś „w dni, nie w miesiące").
- Nagranie albo numer demo voicebota do posłuchania (mają to home.pl, inteliwise, xomedia).
- Lista systemów, z którymi realnie integrujemy; program dotacji, który sprawdzamy przy diagnozie.

## Autorytet (poza stroną, decyzja Pawła)
Bez tego frazy ogólne („chatbot dla firmy", „voicebot", „agenci ai dla firm", „automatyzacja ai") nie wejdą do top 3, bo liderzy mają domeny kilka razy silniejsze. Gotowe teksty: `.seo-przeglad/naprawa-2026-10-13/PAKIET-POZA-STRONA.md` (AIPORT, Profil Firmy w Google, Clutch, TechBehemoths, partner Make, podpisy w stopkach stron klientów).
