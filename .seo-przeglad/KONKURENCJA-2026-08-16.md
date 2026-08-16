# Research konkurencji — top10 Google PL (2026-08-16)

Zespół: 8 agentów (5 klastrów SERP + 2 analizy stron konkurentów + synteza).
Klastry zbadane w pełni: chatboty, voiceboty, automatyzacje. Częściowo: audyt/wdrożenie AI.
Niezbadane: strony WWW pod AI, pozycjonowanie pod AI (dane ucięte).
Uwaga: wyniki z indeksu US — kolejność na google.pl może się nieco różnić.
Głęboko przeanalizowane strony: malinski.ai, mits.pl, gagan.pl, chatbotassistant.pl, lessmanual.ai, syntalith.ai.

## 1. Najważniejszy wniosek: frazy cenowe wygrywają kwotami w tytule

Na frazach „ile kosztuje chatbot" i „chatbot dla firmy cena" top10 to niemal wyłącznie
artykuły-cenniki z widełkami PLN wprost w tytule:

- lessmanual.ai: „Ile kosztuje chatbot AI? Cennik 2026 od 3 500 do 45 000 PLN" (dwa artykuły w top10)
- syntalith.ai: „Ile kosztuje chatbot AI dla firmy? Od 1 990 zł"
- momentumsquads, fastlanding, falconworks, rso: ten sam wzorzec „Ile kosztuje X? Cennik 2026"

**5+ domen rankuje wyłącznie tym formatem. My mamy jawny cennik (przewaga, której
gagan i monde nie mają) i nie mamy ani jednej strony łapiącej tę intencję.**

Rynkowy konsensus cenowy widoczny w SERP (do użycia w naszym artykule):
wdrożenie 2 000 - 45 000+ PLN, abonamenty SaaS ok. 100-2 500 zł/mies.
(np. chatbotassistant: web 0/99,99/399,99 zł mies, voicebot 150-400 zł/mies).

## 2. Mapa nazewnictwa: rynek vs my

| Usługa | Rynek (top10) | My | Rozjazd |
|---|---|---|---|
| Chatboty | „Chatbot AI dla firm" + OSOBNA intencja „chatbot na stronę www" | H1 główna: „nie chatboty" | KRYTYCZNY: odpychamy frazę, którą ludzie wpisują |
| Voiceboty | 4 równoległe nazwy = 4 różne SERPy: voicebot / bot telefoniczny / agent głosowy AI / AI do odbierania telefonów; też „wirtualna recepcjonistka" | pokrywamy 1-2 z 4 | konkurent xomedia łapie dwa naraz: „Voicebot - Agent głosowy AI" |
| Automatyzacje | „Automatyzacja procesów AI", „agencja automatyzacji AI"; gagan tnie na osobne URL-e (sprzedaż/marketing/obsługa/integracje) | jedna zbiorcza podstrona |długi ogon nieobsłużony |
| Audyt AI | UWAGA: fraza dwuznaczna — połowa SERP to „audyt WIDOCZNOŚCI w AI" (delante, widoczni) | audyt procesów za 1490 zł | rozdzielić te dwie intencje w treści |
| Agenci AI | rynek pisze po polsku „agenci AI" | my: angielski szyk „AI Agentów" | drobny, ale systematyczny |

## 3. Luki do zagospodarowania (posortowane po potencjale)

1. **Artykuł „Ile kosztuje chatbot AI dla firmy? Cennik 2026"** z naszymi realnymi widełkami w tytule i H1.
2. **„Ile kosztuje automatyzacja AI w firmie? Widełki 2026" — OTWARTA LUKA: w top10 NIKT nie podaje kwot.** Pierwszy, kto opublikuje, bierze intencję bez walki.
3. Rozbudowa podstrony voicebota o wszystkie 4 synonimy kategorii (title: „Voicebot AI dla firm" + 24/7 + „od X zł"; H2 na pozostałe nazwy).
4. Osobna podstrona „chatbot na stronę www" (inna intencja niż „dla firm").
5. H2-pytania i FAQ na podstronach usług („Ile kosztuje…?", „Jak wygląda wdrożenie?") — wzorzec malinski/gagan pod snippety i AEO.
6. Landingi branżowe (kancelarie, gabinety, beauty, restauracje) — ElevenLabs bierze 3 miejsca w jednym SERPie programatycznie.
7. Liczby zaufania w meta (wzorzec CodeScriptum/malinski) — u nas dopiero, gdy będą PRAWDZIWE liczby (reguła: zero zmyślonych).

## 4. Tagline strony głównej — rekomendacja po researchu

Research potwierdza kierunek „frazowy": trzy najgrubsze frazy komercyjne to
chatboty, voiceboty, automatyzacje — i to one mają wolumen, nie „agenci AI".

**Rekomendacja (wariant A):**
- Title: `Chatboty, voiceboty i automatyzacje AI dla firm | SimpleFast` (60 zn.)
- H1: `Chatboty, voiceboty i automatyzacje AI, które pracują za Ciebie 24/7`
- Duch marki „Budujemy Agentów AI" przechodzi do leadu pod H1, nie znika.

Alternatywa (wariant B, fraza „agencja AI"):
- Title: `Agencja AI dla firm: chatboty, voiceboty, automatyzacje` (55 zn.)
- H1: `Agencja AI dla firm. Chatboty, voiceboty i automatyzacje, które zdejmują z Ciebie ręczną robotę`

CZEKA NA DECYZJĘ PAWŁA — bez zielonego światła nie ruszam strony głównej.

## 5. Zweryfikowane / obalone

- **OBALONE twierdzenie z researchu:** „H1 renderuje się jako litery rozdzielone
  spacjami — bełkot dla Google". Sprawdziłem na żywej stronie: H1 jest pocięty na
  40 spanów (animacja), ale litery sklejają się w czysty tekst, a nagłówek ma
  aria-label z pełnym zdaniem. **Implementacja poprawna, nic nie naprawiać.**
- Widełki cenowe lessmanual/syntalith/chatbotassistant: zweryfikowane wejściem
  na ich strony przez agentów deep-dive, nie tylko z SERP.

NIEZWERYFIKOWANE: wolumeny wyszukiwań (badanie oparte na obecności w SERP, nie na
danych o wolumenie — Ahrefs czeka na autoryzację OAuth); klaster audyt/wdrożenie
zbadany częściowo; „strony WWW pod AI" niezbadane.
