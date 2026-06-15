import { cn } from '@/lib/cn';
import { Container } from './Container';

/**
 * Section — pionowy rytm strony (--section-y: 64→128px) + opcjonalne tło.
 * `theme="dark"` ustawia data-theme="dark" strefowo (sekcje tech: bezpieczeństwo,
 * "agent działa nie gada", /dowod, demo, stopka — spec 02 §7). Kolory komponentów
 * są semantyczne, więc sekcja "po prostu działa" na ciemnym.
 *
 * `tone` przełącza tło między bazowym a subtelnym (przeplatanie sekcji).
 */
type Tone = 'base' | 'subtle' | 'surface';
type Theme = 'light' | 'dark';

const toneClass: Record<Tone, string> = {
  base: 'bg-bg',
  subtle: 'bg-bg-subtle',
  surface: 'bg-surface',
};

type SectionProps = {
  tone?: Tone;
  theme?: Theme;
  tight?: boolean;
  containerWidth?: 'default' | 'narrow' | 'measure';
  /** Gdy false — renderuje pełną szerokość bez wewnętrznego Container (np. bento grid). */
  contained?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'section'>, 'className' | 'children'>;

export function Section({
  tone = 'base',
  theme,
  tight = false,
  containerWidth = 'default',
  contained = true,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      data-theme={theme}
      className={cn(
        tight ? 'py-section-tight' : 'py-section',
        toneClass[tone],
        // Pełne pokrycie tłem przy strefowym dark mode
        theme && 'text-fg',
        className
      )}
      {...rest}
    >
      {contained ? (
        <Container width={containerWidth}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
