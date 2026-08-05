import { cn } from '@/lib/cn';

/**
 * Badge / Tag / Pill — użycie SEMANTYCZNE, nie dekoracyjne (spec 02 §6.4).
 *  - accent  : 1 wyróżnienie na sekcję ("Najczęściej wybierane")
 *  - neutral : kategorie, daty
 *  - success : sygnały zaufania (dane w UE, CWV zielone, RODO)
 *  - metric  : liczba-dowód inline ("-40%")
 *  - outline : ŚWIAT B (makieta 1) — pill konturowy na ciemnym (badge hero)
 */
export type BadgeVariant = 'accent' | 'neutral' | 'success' | 'metric' | 'outline';

const base =
  'inline-flex items-center gap-1 font-sans font-semibold text-caption rounded-full px-3 py-1';

const variantClass: Record<BadgeVariant, string> = {
  // accent: na ciemnym (świat B) --accent-hover = cyan-300 na soft (teal 14%) —
  // jasny tekst na granacie ~12:1 (AA ✓); w strefie light: cyan-800 na cyan-100 = 6.14:1.
  accent: 'bg-accent-soft text-accent-hover',
  neutral: 'bg-bg-subtle text-fg-muted border border-border',
  success: 'bg-success-bg text-success',
  // metric: --accent theme-aware (cyan-400 na ciemnym 9.71:1 / cyan-700 na jasnym 4.95:1).
  metric: 'bg-transparent text-accent px-0 py-0 tabular-nums',
  // outline: przezroczysty pill z konturem (biel 18% na ciemnym — dekoracyjna
  // krawędź, nie kontrolka) i pełnym --fg na tekście (16.35:1 AA ✓).
  outline: 'bg-transparent text-fg border border-border-strong',
};

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'>;

export function Badge({
  variant = 'neutral',
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span className={cn(base, variantClass[variant], className)} {...rest}>
      {children}
    </span>
  );
}
