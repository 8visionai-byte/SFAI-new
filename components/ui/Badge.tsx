import { cn } from '@/lib/cn';

/**
 * Badge / Tag / Pill — użycie SEMANTYCZNE, nie dekoracyjne (spec 02 §6.4).
 *  - accent  : 1 wyróżnienie na sekcję ("Najczęściej wybierane")
 *  - neutral : kategorie, daty
 *  - success : sygnały zaufania (dane w UE, CWV zielone, RODO)
 *  - metric  : liczba-dowód inline ("-40%")
 */
export type BadgeVariant = 'accent' | 'neutral' | 'success' | 'metric';

const base =
  'inline-flex items-center gap-1 font-sans font-semibold text-caption rounded-full px-3 py-1';

const variantClass: Record<BadgeVariant, string> = {
  accent: 'bg-accent-soft text-accent-hover',
  neutral: 'bg-bg-subtle text-fg-muted border border-border',
  success: 'bg-success-bg text-success',
  metric: 'bg-transparent text-accent px-0 py-0 tabular-nums',
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
