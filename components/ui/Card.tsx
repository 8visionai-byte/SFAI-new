import { cn } from '@/lib/cn';

/**
 * Card — kontener treści na tokenach (spec 02 §6.2).
 * Warianty:
 *  - base        : statyczna treść, włos zamiast ramki, podświetlenie na hover
 *  - quiet       : ZERO opakowania (bez tła, ramki, cienia, promienia, paddingu)
 *  - feature     : karta o większej wadze (szerszy padding + cień md)
 *  - interactive : klikalna (case study, usługa) — lift + feedback nacisku (.card-lift)
 *  - bento       : kafel siatki na pełną wysokość
 *  - highlight   : wyróżniona (plan "Najczęściej wybierane") — ramka akcentowa
 *
 * UWAGA ARCHITEKTONICZNA: lib/cn.ts to gołe join(' ') BEZ tailwind-merge, więc
 * klasa dopisana u użycia NIE nadpisuje klasy z wariantu. Dlatego shell (tło,
 * ramka, promień, padding) MUSI siedzieć w wariantach, a nie w stałej wspólnej —
 * inaczej `quiet` nie ma jak zdjąć pudełka.
 *
 * ELEWACJA: shadow-xs (krycie 6%) zniknął z kart — był niewidzialny i tylko
 * dokładał szum. Głębię niosą DOKŁADNIE: shadow-sm na hover karty, shadow-md na
 * feature i wyróżnionym planie, shadow-accent na primary CTA, cień płyty zdjęcia.
 *
 * `as` pozwala wyrenderować <article>/<li> dla poprawnej semantyki.
 */
export type CardVariant =
  | 'base'
  | 'quiet'
  | 'feature'
  | 'interactive'
  | 'bento'
  | 'highlight';

const shell = 'rounded-lg border border-hairline bg-surface';

const variantClass: Record<CardVariant, string> = {
  // CISZA W SPOCZYNKU (redesign „Precyzja cyrkla"): aura marki NIE jest częścią
  // Card. Stara decyzja „błysk na każdej ramce" uchylona — skoro wszystko miga,
  // nic nie jest ważne. Na home aurę mają DOKŁADNIE 2 karty (wyróżniony plan
  // cennika + AgentDemo), dopisywaną u użycia.
  base: `card-live ${shell} p-6`,
  quiet: '',
  feature: `card-live ${shell} p-8 shadow-md`,
  // Focus: globalny :focus-visible na elemencie fokusowalnym wewnątrz karty
  // (jeden system focusa redesignu) — bez focus-within na kontenerze.
  // Ruch (lift + nacisk) robi .card-lift z bramką (hover:hover) w globals.css.
  interactive: `card-lift ${shell} p-6 cursor-pointer`,
  bento: `card-live ${shell} p-6 h-full`,
  highlight: `${shell} p-6 border-[1.5px] border-border-accent shadow-sm relative`,
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
    <Component className={cn(variantClass[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
