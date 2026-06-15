# SimpleFast.ai

Premium strona agencji **„Architekt AI full-stack"** dla polskich MŚP — zbudowana pod cytowalność w modelach AI (GPT/Claude/Gemini/Perplexity) i konwersję.

## Stack

- **Next.js 15** (App Router, SSG) + **TypeScript** + **Tailwind CSS**
- **Framer Motion** (scroll-reveal, animowane metryki — z `prefers-reduced-motion`)
- Treść renderowana serwerowo (SSG) — pełny HTML + JSON-LD przy pierwszym żądaniu (cytowalność dla botów AI)

## Lokalne uruchomienie

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkcyjny build
npm run start    # serwuje produkcyjny build
```

> **Windows / PowerShell:** jeśli `npm` zgłasza „running scripts is disabled",
> uruchom raz: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
> albo użyj `npm.cmd run dev`.

## Deploy

Repo podpięte pod **Netlify** (auto-detekcja Next.js). Konfiguracja: [`netlify.toml`](./netlify.toml).

## Status

Przebieg 1: fundament + strona główna (flagowa). Sekcje oznaczone w kodzie jako
`INPUT PAWŁA` czekają na realne dane (case studies z liczbą, opinie klientów, ceny
„od X", logo, certyfikat). Integracje (Make.com, Cal.com, czat/voicebot) to obecnie
stuby UI — realne wpięcie w kolejnej fazie.
