# Punkty cofnięcia — simplefast.ai

Zapis przed każdym przeglądem SEO. Do tych stanów można wrócić, jeśli pozycje albo konwersja spadną.

| Data | Tag gita | Commit | Gałąź | Stan produkcji |
|---|---|---|---|---|
| 2026-08-17 (wieczór) | `seo-2026-08-17c` | `5a62efe` | main | INFINITY v14b na produkcji, drzewo kodu czyste, `main` = `origin/main`, tag wypchnięty na GitHub. Niezacommitowane były tylko pliki `.seo-przeglad/` z wcześniejszych przebiegów |
| 2026-08-17 (popołudnie) | `seo-2026-08-17b` | `4277aef` | main | INFINITY v13 na produkcji, drzewo kodu czyste, `main` = `origin/main`. Niezacommitowane były tylko pliki `.seo-przeglad/` z porannego przebiegu |
| 2026-08-17 (rano) | `seo-2026-08-17` | `9376af5` | main | INFINITY v12 na produkcji. UWAGA: w drzewie roboczym wisiała niezacommitowana praca v13 (`app/globals.css`, `components/sections/Rozwiazanie.tsx`, `raporty/pomiary-v13.md`) — tag jej NIE obejmuje, bo nie jest wdrożona |
| 2026-08-16 (po południu) | `seo-2026-08-16b` | `18dd388` | main | INFINITY v10 na produkcji; przed serią zmian treściowych (cenniki, pakiet 990) |
| 2026-08-16 | `seo-2026-08-16` | `c5c3266` | main | wdrożenie z 2026-08-08 (ostatni commit), nic niewdrożonego nie wisi |

## Jak cofnąć

**Szybko (natychmiast, bez przebudowy)** — panel Vercela → projekt SFAI-new → Deployments
→ znajdź wdrożenie sprzed problemu → menu „...” → **Promote to Production**.
Działa od razu, nie rusza repozytorium.

**Trwale (w kodzie)** — cofnięcie do stanu z tagu:
```bash
git revert --no-commit c5c3266..HEAD
git commit -m "revert: powrót do stanu seo-2026-08-16"
git push
```

Podgląd, co się zmieniło od punktu cofnięcia:
```bash
git log seo-2026-08-16..HEAD --oneline
```

## Uwaga
Identyfikatora wdrożenia Vercela nie da się odczytać z zewnątrz — trzeba go spisać
z panelu Vercela. Nagłówek `x-vercel-id` to ślad pojedynczego żądania, nie numer wdrożenia.

Polecenia wyżej pokazują najstarszy tag. **Dla ostatniego przebiegu podstaw `seo-2026-08-17c` / `5a62efe`.**
