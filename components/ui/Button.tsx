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

/* JEDEN system focusa (redesign): warianty NIE definiują własnych pierścieni —
   globalny :focus-visible (outline 2px + offset) obsługuje secondary/ghost/link.
   Wyjątek: primary ma tło = kolor ringu, więc .sf-cta:focus-visible (globals.css)
   daje podwójny box-shadow zamiast outline. */
const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold text-ui ' +
  'rounded-sm select-none transition-[transform,background-color,box-shadow,border-color] ' +
  'duration-fast ease-out cursor-pointer sf-press ' +
  'disabled:cursor-not-allowed disabled:pointer-events-none';

/* FEEDBACK NACISKU: na dotyku nie ma hovera, więc :active jest JEDYNYM sygnałem,
   że interfejs usłyszał kliknięcie. 1% (stary active:scale-[0.99]) jest poniżej
   progu percepcji. .sf-press skraca czas przejścia na :active do 110 ms. */
const variantClass: Record<ButtonVariant, string> = {
  primary:
    'sf-cta bg-accent text-accent-contrast shadow-accent ' +
    'hover:bg-accent-hover hover:-translate-y-px ' +
    'active:translate-y-0 active:scale-[0.97] ' +
    'disabled:bg-[var(--sf-gray-300)] disabled:text-[var(--sf-gray-500)] disabled:shadow-none',
  // border-control (#736f66 = 4,93:1 na paperze) zamiast border-strong (1,71:1)
  // — WCAG 1.4.11 wymaga 3:1 dla granicy kontrolki.
  secondary:
    'bg-transparent text-brand border-[1.5px] border-border-control ' +
    'hover:border-brand hover:bg-bg-subtle active:scale-[0.98] ' +
    'disabled:border-border disabled:text-fg-subtle',
  ghost:
    'bg-transparent text-fg-muted px-3 ' +
    'hover:text-fg hover:bg-bg-subtle active:scale-[0.98] ' +
    'disabled:text-fg-subtle',
  link:
    'bg-transparent text-accent underline underline-offset-2 decoration-1 px-0 ' +
    'hover:text-accent-hover hover:decoration-2 ' +
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
  /**
   * Orb kierunkowy po etykiecie (dekoracja aria-hidden) — TYLKO główne CTA home.
   * Domyślnie false, żeby nie ruszać przycisków na podstronach. Etykieta bez zmian.
   */
  trailing?: boolean;
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
  {
    variant = 'primary',
    size = variant === 'link' ? 'sm' : 'md',
    trailing = false,
    className,
    children,
    ...rest
  },
  ref
) {
  const classes = cn(
    base,
    variantClass[variant],
    variant !== 'link' && sizeClass[size],
    className
  );

  const content = trailing ? (
    <>
      {children}
      <span
        aria-hidden="true"
        className="sf-cta-orb ml-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15"
      >
        →
      </span>
    </>
  ) : (
    children
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
          {content}
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
        {content}
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
      {content}
    </button>
  );
});
