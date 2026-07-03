import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Button — bazowy przycisk premium na tokenach (spec 02 §6.1).
 * Warianty: primary (JEDYNE główne CTA — cyjan + shadow-accent),
 * secondary (granat/outline), ghost (tekstowy), link.
 * Renderuje <button>, zewnętrzny <a> albo next/link <Link> wg propsów.
 *
 * Focus-visible zawsze widoczny. Cel dotykowy >=44px (min-height per rozmiar).
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold text-ui ' +
  'rounded-sm select-none transition-[transform,background-color,box-shadow,border-color] ' +
  'duration-fast ease-out cursor-pointer ' +
  'focus-visible:outline-none disabled:cursor-not-allowed disabled:pointer-events-none';

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'sf-cta bg-accent text-accent-contrast shadow-accent ' +
    'hover:bg-accent-hover hover:-translate-y-px ' +
    'active:translate-y-0 active:scale-[0.99] ' +
    'focus-visible:shadow-[var(--shadow-accent),0_0_0_3px_var(--ring)] ' +
    'disabled:bg-[var(--sf-gray-300)] disabled:text-[var(--sf-gray-500)] disabled:shadow-none',
  secondary:
    'bg-transparent text-brand border-[1.5px] border-border-strong ' +
    'hover:border-brand hover:bg-bg-subtle ' +
    'focus-visible:shadow-[0_0_0_3px_var(--ring)] ' +
    'disabled:border-border disabled:text-fg-subtle',
  ghost:
    'bg-transparent text-fg-muted px-3 ' +
    'hover:text-fg hover:bg-bg-subtle ' +
    'focus-visible:shadow-[0_0_0_3px_var(--ring)] ' +
    'disabled:text-fg-subtle',
  link:
    'bg-transparent text-accent underline underline-offset-2 decoration-1 px-0 ' +
    'hover:text-accent-hover hover:decoration-2 ' +
    'focus-visible:shadow-[0_0_0_3px_var(--ring)] ' +
    'disabled:text-fg-subtle disabled:no-underline',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] px-4 text-caption',
  md: 'min-h-[48px] px-5',
  lg: 'min-h-[56px] px-6 text-body-sm',
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type AsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    /** Zewnętrzny adres -> zwykły <a> z rel bezpieczeństwa. */
    external?: boolean;
  };

export type ButtonProps = AsButton | AsLink;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = 'primary', size = variant === 'link' ? 'sm' : 'md', className, children, ...rest },
  ref
) {
  const classes = cn(
    base,
    variantClass[variant],
    variant !== 'link' && sizeClass[size],
    className
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AsLink;

    // Kotwica w obrębie strony (#sekcja) ORAZ link zewnętrzny -> zwykły <a>.
    // next/link do czystych kotwic bywa zawodny przy przewijaniu (klik „nic nie robi");
    // natywny <a> + scroll-behavior:smooth + scroll-margin daje pewne, gładkie przejście.
    if (external || href.startsWith('#')) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          {...(external ? { rel: 'noopener noreferrer' } : {})}
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorRest}
      >
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonRest } = rest as AsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      {...buttonRest}
    >
      {children}
    </button>
  );
});
