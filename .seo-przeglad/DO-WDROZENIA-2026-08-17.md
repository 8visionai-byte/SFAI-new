# ZADANIE: dwie zmiany SEO na simplefast.ai (cytowalność w AI + linkowanie wewnętrzne)

Skopiuj CAŁY ten plik do sesji Claude Code otwartej w folderze
`C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW` i powiedz: „wykonaj to zadanie".

Podstawa: audyt SEO z 17.08.2026, dane z Google Search Console (30 dni) i analiza
9 konkurentów w top10 Google PL. Wszystkie liczby niżej są zmierzone, nie szacowane.

---

## ZASADY (nienegocjowalne)

1. **Zmieniasz TYLKO teksty i metadane.** NIE ruszasz animacji, układu, komponentów
   wizualnych, przejść, CSS ani struktury komponentów.
2. **Zero zmyślonych liczb.** Używasz wyłącznie kwot podanych w tym pliku, bo one już
   są na stronie w innych miejscach.
3. **Zero em-dash** (—) w treściach. Dwukropek, przecinek albo kropka.
4. Przed startem tag cofnięcia:
   ```bash
   git tag przed-seo-2026-08-17 && git push origin przed-seo-2026-08-17
   ```
   Powrót w razie problemu: `git reset --hard przed-seo-2026-08-17`
5. Po zmianach: `npm run build`, potem sprawdzenie na produkcji, że tekst faktycznie wszedł.

---

## ZMIANA 1 — kwoty w poradniku o koszcie agenta AI

**Plik:** `lib/poradniki/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy.ts`

**Fakty (zmierzone):**
- Tytuł strony: „Ile kosztuje wdrożenie AI agenta dla firmy"
- Liczba kwot w złotówkach w całym pliku: **ZERO** (sprawdzone grepem, jedyna liczba to „40 min")
- Pozycja w Google: **8,0** przy **42 wyświetleniach** i **0 kliknięć** (CTR 0%)
- Konkurent syntalith.ai (słabsza domena: DR 15 wobec naszych 18) jest cytowany przez
  modele AI na to pytanie, bo podaje: 4 990 zł netto wdrożenie, 1 190 zł opieka

**Dlaczego to problem:** tytuł obiecuje odpowiedź na pytanie o cenę, a treść jej nie
zawiera. Model językowy cytuje konkretny fakt, nie obietnicę faktu. Użytkownik w Google
widzi nasz tytuł na 8. pozycji, ale klika w wynik, który ma kwotę w opisie.

**Co zrobić:**

1. Dodać **w pierwszym akapicie** (przed rozwinięciem) zdanie z konkretem, wzór:
   „Wdrożenie agenta AI dla firmy zaczyna się od 990 zł za agenta do jednego zadania,
   a agent z integracjami to koszt od 2 500 zł. Do tego dochodzi opieka od 99 zł miesięcznie."

2. Dodać sekcję H2 „Ile kosztuje agent AI: widełki 2026" z tabelą.
   **Używaj WYŁĄCZNIE tych kwot** (wszystkie już są na stronie w plikach usług):

   | Zakres | Cena |
   |---|---|
   | Agent do jednego zadania (np. odpowiadanie na powtarzalne pytania) | od 990 zł |
   | Agent z integracją (kalendarz, CRM, poczta) | od 2 500 zł |
   | Audyt przed wdrożeniem (odliczany od wdrożenia) | 1 490 zł |
   | Opieka miesięczna | 99 do 599 zł |

   Źródła kwot w repo (do weryfikacji, NIE zmieniaj ich tam):
   - 990 zł: `lib/uslugi/chatboty.ts` (pakiet startowy)
   - 2 500 zł: `lib/uslugi/voiceboty.ts` → `ramaCeny.minPrice`
   - 1 490 zł: `lib/uslugi/audyt-ai.ts`
   - 99 do 599 zł: `lib/uslugi/automatyzacje.ts` → `ramaCeny.tresc`

3. Zaktualizować datę publikacji/modyfikacji w tym pliku na dzisiejszą
   (dziś w polu jest `2026-06-15`, a treść się zmienia).

4. Dodać H2 „Od czego zależy cena agenta AI" z 4 do 6 punktami (liczba integracji,
   liczba scenariuszy, wolumen rozmów, wymagania RODO). Bez wymyślania liczb.

---

## ZMIANA 2 — linkowanie wewnętrzne do poradników cenowych

**Fakty (zmierzone):**
- Liczba linków ze stron usług i strony głównej do konkretnych poradników: **ZERO**
  (sprawdzone: `chatboty.ts`, `voiceboty.ts`, `automatyzacje.ts`, `audyt-ai.ts`, `app/page.tsx`)
- Mamy 4 poradniki cenowe. W Google widoczny jest **1** (42 wyświetlenia).
  Pozostałe 3 mają **ZERO wyświetleń** — Google ich praktycznie nie zna.
- Strony usług mają siłę, która nigdzie nie płynie: `/uslugi/chatboty` 427 wyświetleń,
  `/uslugi/voiceboty` 400.

**Dlaczego to problem:** strona, do której nikt nie linkuje, jest dla Google sierotą,
więc rzadko ją odwiedza i traktuje jako nieistotną. Do tego użytkownik czytający sekcję
„Ile kosztuje…" na stronie usługi nie ma w co kliknąć i wychodzi do konkurencji.

**Co zrobić:** w sekcji o cenach (`ramaCeny.tresc`) każdej strony usługi dopisać JEDNO
zdanie z linkiem do pasującego poradnika. Tekst linku ma być opisowy, nie „kliknij tutaj".

| Plik | Dopisz na końcu `ramaCeny.tresc` | Link do |
|---|---|---|
| `lib/uslugi/chatboty.ts` | „Pełny rozkład kosztów chatbota opisaliśmy w poradniku: ile kosztuje chatbot dla firmy w 2026." | `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` |
| `lib/uslugi/automatyzacje.ts` | „Widełki cen automatyzacji rozpisaliśmy w osobnym poradniku." | `/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie` |
| `lib/uslugi/audyt-ai.ts` | „Jak liczyć zwrot z wdrożenia AI, opisaliśmy w poradniku o kosztach agenta AI." | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` |
| `lib/uslugi/voiceboty.ts` | „Koszty wdrożeń AI rozpisaliśmy w poradniku o cenie agenta AI." | `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` |

**Uwaga techniczna:** sprawdź, czy pole `ramaCeny.tresc` renderuje HTML czy czysty tekst.
Jeśli czysty tekst, dodaj link w komponencie renderującym sekcję cen albo osobnym polem,
zamiast wstawiać surowy `<a>` do stringa. **Nie zmieniaj przy tym wyglądu sekcji.**

**Dodatkowo:** w poradnikach cenowych dodać na dole blok „Zobacz też" z linkami do
dwóch pozostałych poradników cenowych (wzorzec konkurencji: Falcon Works i Syntalith
linkują po 3 siostrzane artykuły pod każdym).

---

## PO WDROŻENIU (to robi Paweł, nie sesja)

1. Google Search Console → Sprawdzenie adresu URL → wkleić kolejno cztery adresy
   (poradnik o agencie + trzy strony usług) → „Poproś o zindeksowanie".
   Bez tego Google pokaże stare tytuły i test będzie niemiarodajny.

## JAK SPRAWDZIMY, CZY ZADZIAŁAŁO

- **Za 14 dni w GSC:** CTR na `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy`
  powyżej 0% (dziś: 42 wyświetlenia, 0 kliknięć).
- **Za 21 dni w GSC:** pozostałe trzy poradniki cenowe mają jakiekolwiek wyświetlenia
  (dziś: zero).
- **Od razu po wdrożeniu:** zapytać ChatGPT i Perplexity „ile kosztuje agent AI dla firmy
  w Polsce" i sprawdzić, czy pojawia się simplefast.ai.

NIEZWERYFIKOWANE: prognozy pozycji to szacunki oparte na tym, co robi konkurencja.
Twarde liczby w tym pliku to dane z Search Console i wyniki grepów po repozytorium.
