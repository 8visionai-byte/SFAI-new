/**
 * DANE AUDYTU STRONY POD AI (spec 07 §4). Checklista 10 pozycji (warstwa DOSTĘPU +
 * PREFERENCJI z syntezy GEO). Deterministyczna, w 100% client-only — ZERO fetchu
 * cudzej domeny (CORS) i ZERO kluczy. Klient sam ocenia swoją stronę.
 *
 * Trzymane osobno, bo CAŁA tabela (pozycja + waga + "dlaczego") MUSI być w statycznym
 * HTML strony — to jest cytowalny content GEO pod "jak zoptymalizować stronę pod AI".
 *
 * Wynik = suma punktów spełnionych / max × 100. "nie wiem" = 0 pkt (jak "nie"), ale
 * oznaczone ⚠ (do sprawdzenia), nie ✗.
 */

export type PozycjaAudytu = {
  id: string;
  /** Pytanie do klienta o jego stronę. */
  pytanie: string;
  /** Waga (wpływ na cytowalność). Suma wag = max. */
  waga: number;
  /** "Dlaczego to ważne" — 1 zdanie, pokazywane w wyniku i w statycznej tabeli. */
  dlaczego: string;
};

/** 10 pozycji. Sumaryczna waga = 100 (10+12+...), więc wynik jest wprost w %. */
export const POZYCJE: readonly PozycjaAudytu[] = [
  {
    id: 'a1',
    pytanie: 'Czy treść jest widoczna w źródle strony bez JavaScriptu? (Ctrl+U, czy widać tekst)',
    waga: 20,
    dlaczego:
      'Jeśli treść ładuje dopiero JavaScript, większość botów AI widzi pustą stronę.',
  },
  {
    id: 'a2',
    pytanie: 'Czy strona zaczyna się krótką odpowiedzią na pytanie klienta (2–3 zdania)?',
    waga: 12,
    dlaczego: 'Modele AI cytują samowystarczalne kapsuły odpowiedzi z początku strony.',
  },
  {
    id: 'a3',
    pytanie: 'Czy nagłówki są sformułowane jak pytania?',
    waga: 8,
    dlaczego: 'Nagłówki-pytania trafiają w to, jak ludzie pytają AI.',
  },
  {
    id: 'a4',
    pytanie: 'Czy na stronie są konkretne liczby, nie tylko ogólniki?',
    waga: 12,
    dlaczego: 'Liczby to najmocniejsza dźwignia cytowalności.',
  },
  {
    id: 'a5',
    pytanie: 'Czy jest widoczna cena albo widełki „od X"?',
    waga: 10,
    dlaczego: 'Brak ceny wypada z cytatów przy pytaniach zakupowych.',
  },
  {
    id: 'a6',
    pytanie: 'Czy są tabele faktów albo porównania?',
    waga: 8,
    dlaczego: 'Tabele są nadreprezentowane w cytatach AI.',
  },
  {
    id: 'a7',
    pytanie: 'Czy jest widoczna data aktualizacji treści?',
    waga: 6,
    dlaczego: 'Świeżość to sygnał wiarygodności dla AI.',
  },
  {
    id: 'a8',
    pytanie: 'Czy masz schema JSON-LD (Organization albo FAQ)?',
    waga: 8,
    dlaczego: 'Pomaga głównie w Google AI Overviews.',
  },
  {
    id: 'a9',
    pytanie: 'Czy robots.txt i CDN wpuszczają boty AI (GPTBot, ClaudeBot, PerplexityBot)?',
    waga: 10,
    dlaczego: 'Cloudflare od 2026 domyślnie blokuje boty AI, zanim robots.txt zadziała.',
  },
  {
    id: 'a10',
    pytanie: 'Czy unikasz lania wody i asekuracji („zwykle", „prawdopodobnie")?',
    waga: 6,
    dlaczego: 'Ton promocyjny i asekuracja obniżają cytowalność.',
  },
] as const;

export const MAX_PUNKTY = POZYCJE.reduce((s, p) => s + p.waga, 0); // = 100

export type ProgAudytu = {
  min: number;
  max: number;
  etykieta: string;
};

/** Progi scorecard (spec 07 §4.3). */
export const PROGI_AUDYTU: readonly ProgAudytu[] = [
  { min: 0, max: 40, etykieta: 'Niewidoczna dla AI' },
  { min: 41, max: 70, etykieta: 'Częściowo widoczna' },
  { min: 71, max: 100, etykieta: 'Dobrze przygotowana' },
] as const;

export function progAudytu(wynik: number): ProgAudytu {
  return PROGI_AUDYTU.find((p) => wynik >= p.min && wynik <= p.max) ?? PROGI_AUDYTU[0]!;
}

/** Przykład poprawionej kapsuły answer-first (pozycja #2) — pokazuje wartość konkretem. */
export const PRZYKLAD_KAPSULY =
  'Voicebot dla firmy odbiera telefon po polsku, umawia wizyty i przyjmuje zgłoszenia 24 godziny na dobę. Wdrażamy go w dni, a dane zostają w Unii Europejskiej. Pierwsza linia działa już od jednego numeru.';
