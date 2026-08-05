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
type Tone = 'base' | 'subtle' | 'surface';
type Theme = 'light' | 'dark';
type Space = 'sm' | 'md' | 'lg';

const toneClass: Record<Tone, string> = {
  base: 'bg-bg',
  subtle: 'bg-bg-subtle',
  surface: 'bg-surface',
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
