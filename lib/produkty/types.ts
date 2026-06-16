/**
 * TYP `Produkt` — kontrakt treści JEDNEGO własnego produktu na /produkty.
 *
 * Produkty opisujemy PRZEZ FUNKCJĘ: co to robi, co zbudowaliśmy, dla kogo i co
 * z tego ma użytkownik. Nazwa jest drugorzędna (robocza). Każdy produkt to
 * PUNKT WYJŚCIA DO CUSTOMU, nie pudełkowy produkt z półki.
 *
 * Jedno źródło prawdy dla:
 *  - renderu kart produktów na /produkty (komponenty z components/produkty),
 *  - ItemList JSON-LD (lista produktów, serwerowo w HTML).
 *
 * STRUKTURA KARTY (answer-first, GEO — cała treść w surowym HTML przy 1. żądaniu):
 *  badge(dojrzałość) + H3(co to robi) + (nazwa robocza) + opis funkcji ->
 *  "dla kogo" -> "co daje" (oszczędność szac.) -> nuta "punkt wyjścia do customu" ->
 *  placeholder na zrzut/demo (INPUT PAWŁA).
 *
 * ŻELAZNE ZASADY (głos Pawła + north star):
 *  - ZERO zmyślania. Każdy string może zostać zacytowany przez LLM jako fakt.
 *    Twarde liczby tylko realne. Szacunki oszczędności oznaczamy "(szac.)".
 *  - Uczciwa dojrzałość: MVP / "działa u nas". Bez obietnic pudełkowego produktu.
 *  - Bez długiego myślnika (em-dash). Krótkie zdania, prosty język.
 *  - "AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje."
 */

/**
 * Etap dojrzałości produktu — uczciwy sygnał, nie marketing.
 *  - 'mvp'      : działająca wersja minimalna (rdzeń funkcji gotowy, reszta w budowie)
 *  - 'dziala-u-nas' : używamy tego u siebie na co dzień, sprawdzone w praktyce
 */
export type Dojrzalosc = 'mvp' | 'dziala-u-nas';

/** Etykiety dojrzałości (label widoczny na badge karty). */
export const DOJRZALOSC_LABEL: Record<Dojrzalosc, string> = {
  mvp: 'MVP (działa rdzeń)',
  'dziala-u-nas': 'Działa u nas',
};

/**
 * `Produkt` — pełna treść jednego własnego produktu (opis przez funkcję).
 *
 * Pola wymagane: slug, coRobi, opisFunkcji, dlaKogo, coDaje, customNote.
 * `nazwaRobocza` opcjonalna (nazwa drugorzędna). `oszczednosc` opcjonalna i
 * gdy jest, MUSI być oznaczona jako szacunek (tekst zawiera "(szac.)").
 */
export type Produkt = {
  /**
   * Klucz w rejestrze + kotwica (#slug) sekcji. Małe litery, myślniki,
   * bez polskich znaków, bez końcowego slasha (spójne z konwencją repo).
   */
  slug: string;

  /**
   * H3 karty = CO TO ROBI, opisane przez funkcję (nie przez nazwę).
   * To jest tytuł, pod którym produkt ma być cytowany przez LLM.
   */
  coRobi: string;

  /** Nazwa robocza (drugorzędna), np. "PapiCoach". Opcjonalna. */
  nazwaRobocza?: string;

  /** Uczciwy etap dojrzałości (badge). */
  dojrzalosc: Dojrzalosc;

  /**
   * Opis funkcji answer-first: co dokładnie zbudowaliśmy i jak to działa.
   * 40–70 słów samowystarczalnej odpowiedzi. Surowy HTML = "kapsuła do cytowania".
   * Używany też jako `description` w ItemList JSON-LD.
   */
  opisFunkcji: string;

  /** Dla kogo to jest (jedno zdanie, konkretny odbiorca/proces). */
  dlaKogo: string;

  /**
   * Co to daje użytkownikowi (efekt). Gdy podajemy oszczędność czasu/pieniędzy,
   * jest to SZACUNEK i string MUSI zawierać "(szac.)". Bez zmyślonych twardych liczb.
   */
  coDaje: string;

  /**
   * Nuta "punkt wyjścia do customu" — uczciwe zdanie, że to baza do złożenia
   * indywidualnie pod proces klienta, nie pudełkowy produkt.
   */
  customNote: string;

  /**
   * Placeholder na zrzut/demo (INPUT PAWŁA). Krótki opis tego, co ma pokazać
   * zrzut, gdy Paweł go dostarczy. Renderowany jako uczciwy slot poglądowy,
   * NIGDY jako atrapa obrazka 404.
   */
  demoHint: string;
};
