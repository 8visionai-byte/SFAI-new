import { cn } from '@/lib/cn';

/**
 * Container — centruje treść i nakłada marginesy boczne (--gutter, mobile-first).
 * Trzy szerokości z design systemu: default (1200px), narrow (760px — artykuły,
 * kapsuły answer-first), measure (68ch — bloki czystego tekstu).
 */
type Width = 'default' | 'narrow' | 'measure';

const widthClass: Record<Width, string> = {
  default: 'max-w-container',
  narrow: 'max-w-narrow',
  measure: 'max-w-measure',
};

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  width?: Width;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Container<T extends React.ElementType = 'div'>({
  as,
  width = 'default',
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Component = as ?? 'div';
  return (
    <Component
      className={cn('mx-auto w-full px-gutter', widthClass[width], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
