/**
 * STAŁE WSPÓLNE NARZĘDZI (spec 07 §0.10).
 *
 * Jedno źródło prawdy dla mnożników czasu i progów. Te same liczby muszą być
 * w kodzie wyspy (kalkulacja) ORAZ w statycznym HTML strony (przykład z kapsuły),
 * inaczej rozjazd treść <-> widget psuje cytowalność i zaufanie.
 *
 * TYG_NA_MC = 4,33 (52 tyg / 12 mc). GODZINY_NA_ETAT = 2000 (~1 pełny etat/rok po
 * urlopach i świętach) — używane do przeliczenia odzyskanych godzin na etaty.
 */
export const TYG_NA_MC = 4.33;
export const MIESIACE = 12;
export const GODZINY_NA_ETAT = 2000;
export const DNI_ROBOCZE = 252;

/**
 * Presety udziału automatyzowalnego (proc_auto) — jawny mnożnik pokazywany jako
 * przyciski. Domyślny = "Realnie 60%" (spec 07 §1.1). Wartości 0–1.
 */
export const PRESETY_AUTO = [
  { id: 'ostroznie', label: 'Ostrożnie', proc: 0.4, opis: '40%' },
  { id: 'realnie', label: 'Realnie', proc: 0.6, opis: '60%' },
  { id: 'duzo', label: 'Dużo', proc: 0.8, opis: '80%' },
] as const;

export const DOMYSLNY_PROC_AUTO = 0.6;

/**
 * Typy zadań ustawiające rozsądny default proc_auto (suwak nadal edytowalny).
 * Spec 07 tabela §1.1. `proc` 0–1.
 */
export const TYPY_ZADANIA = [
  { id: 'przepisywanie', label: 'Przepisywanie danych między systemami', proc: 0.7 },
  { id: 'maile', label: 'Obsługa powtarzalnych maili', proc: 0.6 },
  { id: 'raporty', label: 'Generowanie raportów', proc: 0.65 },
  { id: 'faktury', label: 'Fakturowanie / dokumenty', proc: 0.55 },
] as const;

/**
 * Disclaimer uczciwości (spec 07 §0.9) — pod KAŻDYM wynikiem narzędzia.
 * Jedno źródło, żeby brzmiał identycznie wszędzie. Wariant `quiz` dla testu/audytu.
 */
export const DISCLAIMER =
  'To Twoje liczby, nie nasza obietnica. Służy do rozmowy, nie jest gwarancją. Realny procent ustalamy na bezpłatnej diagnozie.';

export const DISCLAIMER_QUIZ =
  'To szybka samoocena, nie audyt. Pełny obraz dajemy na bezpłatnej diagnozie.';

/**
 * Formatowanie liczb w PL — separator tysięcy spacją, bez końcówek groszowych
 * dla dużych kwot. Spójne z AnimatedMetric (toLocaleString 'pl-PL').
 */
export function zl(n: number): string {
  return `${Math.round(n).toLocaleString('pl-PL')} zł`;
}

export function liczba(n: number, frac = 0): string {
  return n.toLocaleString('pl-PL', {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  });
}

export function godziny(n: number): string {
  return `${Math.round(n).toLocaleString('pl-PL')} h`;
}
