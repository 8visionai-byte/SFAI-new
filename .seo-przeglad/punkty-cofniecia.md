# Punkty cofnięcia — simplefast.ai

Zapis przed każdym przeglądem SEO. Do tych stanów można wrócić, jeśli pozycje albo konwersja spadną.

| Data | Tag gita | Commit | Gałąź | Stan produkcji |
|---|---|---|---|---|
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
