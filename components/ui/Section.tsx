import { cn } from '@/lib/cn';
import { Container } from './Container';

/**
 * Section — pionowy rytm strony + opcjonalne tło.
 * ŚWIAT B (ciemna pracownia): tokeny GLOBALNE są ciemne — tone base = navy-950
 * (#0b1220, baza kadru z makiet), subtle = navy-900 (#101a30). `theme="dark"`
 * (strefowo) zostaje dla zagnieżdżeń i nic nie zmienia na domyślnym ciemnym;
 * `theme="light"` włącza JASNĄ strefę-akcent (np. biała karta cytatu z makiety 2).
 * Kolory komponentów są semantyczne, więc sekcja "po prostu działa" w obu motywach.
 *
 * `tone` przełącza tło między bazowym a subtelnym (przeplatanie sekcji).
 * `seam` (.sf-rule) to po redesignie BIAŁY WŁOS (var(--hairline)) — patrz globals.
 *
 * `space` — TRZY rejestry pionowe zamiast jednego metronomu:
 *   sm (48-80px)  = przypis, pasek, domknięcie
 *   md (64-128px) = zwykła sekcja
 *   lg (88-160px) = otwarcie aktu (hero, rozwiązanie, oferta, finalne CTA)
 * `tight` zostaje jako alias sm (podstrony go używają — nie ruszamy ich).
 *
 * `seam` — rysowana kreska rozdziału (.sf-rule) w ryzach kontenera. Zastępuje
 * border-y przy każdej zmianie tonu: 9 zmian tonu na 14 sekcji robiło z home
 * stos pasów jak w motywie WordPressa. Kreska jest DEKORACJĄ (aria-hidden).
 */
type Tone = 'base' | 'subtle' | 'surface' | 'transparent';
type Theme = 'light' | 'dark';
type Space = 'sm' | 'md' | 'lg';

const toneClass: Record<Tone, string> = {
  // INFINITY v4 (spec §PARTIA A pkt 1): base = PRZEZROCZYSTA (kolor niesie
  // body #06060c) — fixed warstwy .inf-stars/.inf-nebula/.inf-particles
  // wreszcie prześwitują na CAŁEJ stronie (diagnoza „tło znikło": sekcje
  // kryły je solidnym bg-bg). subtle = PÓŁPRZEZROCZYSTY pas (color-mix
  // --bg-subtle 72%). Obie klasy w globals.css (partia A) z guardem
  // [data-theme=light]: jasne wyspy dostają solidne tło jak dotąd — wyspy
  // BEZ ZMIAN. Kontrast bez regresji: tekst na gwiazdach (1px, alpha ≤.25)
  // = tekst na #06060c (te same tokeny, AA policzone w globals).
  base: 'inf-sec-base',
  subtle: 'inf-sec-subtle',
  surface: 'bg-surface',
  // Tone emituje dokładnie jedną klasę, więc bg-transparent nie konkuruje
  // z niczym (cn to goły join, bez merge). Po v4 transparent ≡ base na
  // ciemnym; zostaje dla podstron (semantyka „celowo bez tła" + brak
  // light-guarda).
  transparent: 'bg-transparent',
};

const spaceClass: Record<Space, string> = {
  sm: 'py-section-tight',
  md: 'py-section',
  lg: 'py-section-loose',
};

type SectionProps = {
  tone?: Tone;
  theme?: Theme;
  space?: Space;
  /** Alias historyczny: tight = space "sm". */
  tight?: boolean;
  /** Rysowana kreska rozdziału na górnej krawędzi sekcji (dekoracja). */
  seam?: boolean;
  containerWidth?: 'default' | 'narrow' | 'measure';
  /** Gdy false — renderuje pełną szerokość bez wewnętrznego Container (np. bento grid). */
  contained?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'section'>, 'className' | 'children'>;

export function Section({
  tone = 'base',
  theme,
  space,
  tight = false,
  seam = false,
  containerWidth = 'default',
  contained = true,
  className,
  children,
  ...rest
}: SectionProps) {
  const pad = spaceClass[space ?? (tight ? 'sm' : 'md')];

  return (
    <section
      data-theme={theme}
      className={cn(
        pad,
        toneClass[tone],
        seam && 'relative',
        // Pełne pokrycie tłem przy strefowym dark mode
        theme && 'text-fg',
        className
      )}
      {...rest}
    >
      {seam && (
        <div aria-hidden="true" className="absolute inset-x-0 top-0 px-gutter">
          <div className="sf-rule mx-auto max-w-container" />
        </div>
      )}
      {contained ? (
        <Container width={containerWidth}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
