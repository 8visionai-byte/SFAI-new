import { cn } from '@/lib/cn';

/**
 * Card — kontener treści na tokenach (spec 02 §6.2).
 * Warianty:
 *  - base        : statyczna treść, cień xs, BEZ reakcji na hover (uczciwa afordancja)
 *  - interactive : klikalna (case study, usługa) — lift -4px + cień md na hover
 *  - bento       : kafel siatki (bez własnego paddingu zewnętrznego rytmu)
 *  - highlight   : wyróżniona (plan "Najczęściej wybierane") — ramka akcentowa
 *
 * `as` pozwala wyrenderować <article>/<li> dla poprawnej semantyki.
 */
export type CardVariant = 'base' | 'interactive' | 'bento' | 'highlight';

const base =
  'bg-surface border border-border rounded-lg p-6 shadow-xs';

const variantClass: Record<CardVariant, string> = {
  base: '',
  interactive:
    'transition-[transform,box-shadow,border-color] duration-base ease-out cursor-pointer ' +
    'hover:-translate-y-1 hover:shadow-md hover:border-border-strong ' +
    'focus-within:shadow-[0_0_0_3px_var(--ring)]',
  bento: 'h-full',
  highlight: 'border-[1.5px] border-border-accent shadow-sm relative',
};

type CardProps<T extends React.ElementType> = {
  as?: T;
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Card<T extends React.ElementType = 'div'>({
  as,
  variant = 'base',
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component = as ?? 'div';
  return (
    <Component className={cn(base, variantClass[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
