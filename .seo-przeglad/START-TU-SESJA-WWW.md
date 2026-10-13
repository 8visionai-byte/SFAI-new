# START TU: wdrożenie SEO na simplefast.ai

**Ten plik jest punktem wejścia.** Przeczytaj go w całości, zanim cokolwiek zmienisz.
Powstał w sesji SEO 2026-08-18. Ty jesteś sesją wdrożeniową.

---

## PROMPT DO WKLEJENIA (skopiuj wszystko poniżej linii)

---

Jesteś sesją wdrożeniową SFAI WWW. Wdrażasz wnioski z audytu SEO.

**Repo:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW` (Next.js App Router, branch `main`)
**Produkcja:** https://www.simplefast.ai (Vercel, projekt SFAI-new)

### Skąd bierzesz dane

Wszystko leży w `SF AI WWW\.seo-przeglad\`. Czytaj w tej kolejności:

1. **`AUDYT-WDROZENIOWY-2026-08-18.md`** — najważniejszy. Gotowe ceny, czasy wdrożeń,
   liczby dowodowe i nazwy 11 klientów. **Wszystkie wartości zatwierdził Paweł do publikacji.**
   To jest jedyne źródło liczb. Jeśli potrzebujesz liczby, której tam nie ma, ZAPYTAJ.
   Nie generuj własnych.
2. **`RAPORT-KONKURENCJA-I-CYTOWALNOSC-2026-08-18.md`** — dlaczego to robimy. 35 propozycji
   nowych adresów, analiza 12 domen konkurencji, diagnoza cytowalności w AI.
3. **`BRIEF-DLA-SESJI-WWW-2026-08-18.md`** — starszy brief. Część już wdrożona, sprawdź
   co zostało (zdarzenia Umami raczej nadal brakuje).

### Co robisz, w tej kolejności

**Etap 1: zamknąć lukę cytowalności.** Sekcja 9 audytu, punkty 1-6.
Najkrócej: drabina trzech progów cenowych z czasami wdrożenia na stronach usług,
blok krótkiej odpowiedzi na górze, wyrzucenie nawigacji z emoji z pierwszego
wydobywalnego bloku dokumentu, oznaczenie kwot jako netto, wpięcie case'a
Instytutu Kryptografii, pytania FAQ jako widoczne nagłówki.

**Etap 2: uzbroić stronę GEO w dowody.** Mamy trzy realne case'y (Lenart Motors
cytowany przez ChatGPT po 3 tygodniach, Fichtelgebirgshaus w top10, Trockenhaus
z niewidocznej do top3), a `/uslugi/optymalizacja` ma dziś 3 liczby i zero dowodów.

**Etap 3: nowe adresy.** Sekcja 9 audytu, punkty 9-12.

### ZAKAZY (twarde, bez wyjątków)

1. **Nie ruszasz designu.** Zero zmian w animacjach, układzie, komponentach wizualnych,
   przejściach, stylach, kolorach, systemie INFINITY. Zatwierdzone sekcje są zamrożone.
   Jeśli zmiana treści wymusza zmianę wyglądu, ZATRZYMAJ SIĘ i zapytaj Pawła.
2. **Nie zmyślasz liczb.** Każda kwota, każdy termin, każdy procent pochodzi z audytu.
   Brak danej = pytanie do Pawła, nie własny szacunek.
3. **Nie skracasz stron do 400 słów.** Nasze średnie 1596 słów bije większość konkurencji.
   Nowe wąskie adresy buduj w okolicy 1100-1300 słów.
4. **Nie ruszasz FAQ ani tabel porównawczych** na istniejących podstronach. Mamy je
   na wszystkich 23 stronach treściowych i nikt w badanej próbie 9 konkurentów tego nie ma.
   To nasza realna przewaga.
5. **Bez em-dash** w treściach dla klienta.
6. **Nie commitujesz cudzej pracy.** Commituj wyłącznie pliki, które sam zmieniłeś,
   wymieniając je po nazwie.

### REGUŁA NACZYŃ POŁĄCZONYCH (przeczytaj, zanim dodasz podstronę)

Nowa podstrona usługi to NIE jest jeden plik. Sprawdzone na realnym błędzie: trzecia
podstrona voicebotów renderowała się białym akcentem zamiast fioletu kategorii, bo
zapomniano o jednym wpisie.

Dodanie podstrony `/uslugi/<rodzic>/<slug>` wymaga:

1. `lib/uslugi/podstrony/<slug>.ts` — treść (wzorzec: `windykacja.ts`, `odbieranie-telefonow.ts`)
2. `lib/uslugi/podstrony/index.ts` — import + wpis w tablicy `PODSTRONY`
3. **`lib/inf-kategorie.ts` — wpis koloru w `INF_KATEGORIA`.** Bez tego strona spada
   na `INF_KATEGORIA_DEFAULT` i wygląda inaczej niż siostry. Podstrona dziedziczy kolor
   rodzica (voiceboty: `#e438ff` / `#dc7aff`)
4. Katalog trasy `app/uslugi/<rodzic>/[podstrona]/page.tsx` musi istnieć dla tego rodzica
5. `dataAktualizacji` w treści — zasila `lastmod` w mapie witryny

Przy nowym RODZICU (np. podstrony chatbotów) dochodzi utworzenie katalogu trasy.

**Warto rozważyć trwałe rozwiązanie:** kolor mógłby dziedziczyć się z pola `rodzic`
automatycznie, zamiast być przepisywany ręcznie. Ręczne przepisywanie zawiodło już dwa razy.
Decyzja o sposobie należy do Ciebie.

### SPÓJNOŚĆ TREŚCI

Wzorcem dla nowych podstron są **istniejące podstrony voicebotów**: ten sam kontrakt
`PodstronaUslugi`, te same 8 sekcji, te same komponenty. Zero nowych stylów.

Rdzeniem każdej nowej podstrony ma być **tabela specyficzna dla tego zastosowania**,
a nie wstęp. Bez tego powstanie 10 tych samych stron, co jest udokumentowanym błędem
konkurenta lessmanual.ai (sześć stron produktowych na identycznym szkielecie H2/H3).

### WERYFIKACJA (bez tego nie mów „gotowe")

Po wdrożeniu i deployu sprawdź **na produkcji**, nie lokalnie:

```
npm run build
npx tsc --noEmit
```

Potem na żywym adresie:
- tytuły i opisy zmienionych podstron
- nowe adresy zwracają 200 i są w `sitemap.xml`
- nowa podstrona ma kolor kategorii identyczny z siostrami (sprawdź wizualnie, nie w kodzie)
- strona wygląda identycznie jak przed zmianami: animacje, układ, kolory nietknięte

**Pokaż wyniki tych sprawdzeń.** Commit, deploy ani przechodzący build nie są dowodem,
że zachowanie widoczne dla użytkownika się zmieniło.

### COFNIĘCIE

Szybko: panel Vercela → SFAI-new → Deployments → wdrożenie sprzed zmiany → Promote to Production.

Trwale:
```
git revert --no-commit seo-2026-08-17d..HEAD
git commit -m "revert do stanu seo-2026-08-17d"
```

---

## KONIEC PROMPTU

---

## Mapa plików (dla Pawła, nie do wklejania)

Wszystko w `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\.seo-przeglad\`:

| Plik | Co zawiera | Priorytet |
|---|---|---|
| `START-TU-SESJA-WWW.md` | ten plik, punkt wejścia i prompt | czytać pierwszy |
| `AUDYT-WDROZENIOWY-2026-08-18.md` | ceny, czasy, liczby, 11 klientów, zakazy publikacyjne | **najważniejszy** |
| `RAPORT-KONKURENCJA-I-CYTOWALNOSC-2026-08-18.md` | 35 adresów, 12 domen, diagnoza AI | uzasadnienie |
| `BRIEF-DLA-SESJI-WWW-2026-08-18.md` | kolor podstron, zdarzenia Umami | częściowo wdrożone |
| `PLAN-WDROZENIA-2026-08-17d.md` | starszy plan, w dużej części wykonany | archiwum |
| `historia.md` | dziennik przeglądów SEO | kontekst |
| `punkty-cofniecia.md` | tagi gita do przywrócenia | awaryjnie |
| `dane/2026-08-17d.json` | surowe dane Search Console, Bing, Ahrefs | źródło liczb SEO |
| `migawki/2026-08-17d.json` | stan 47 podstron | do porównań |

**Punkt cofnięcia:** tag `seo-2026-08-17d` (commit `da5764e`).

## Co zostało niezmierzone

- Wyniki naszego bota na simplefast.ai (działa, ale nie mamy z niego liczb, a mamy
  je od dwóch klientów)
- Cytowalność naszej własnej strony w czasie. Mamy dowody GEO u trzech klientów,
  a u siebie nie mierzymy tego regularnie
