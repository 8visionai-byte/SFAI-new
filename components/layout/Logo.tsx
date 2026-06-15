import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Logo — wordmark SimpleFast.ai (spec 02 §9.2).
 * "SimpleFast" w Fraunces (display), ".ai" w Inter cyjanem (akcent, ~0.7×).
 * Tekstowy SVG-free wordmark = ~0kB, idealny LCP, działa na light i dark
 * (kolory semantyczne: --fg na jasnym, --brand=biały na ciemnym).
 *
 * [PLACEHOLDER] docelowo: dostarczyć logo.svg / mark.svg wg §9.3 (monogram SF
 * jako grot-strzałka). Wordmark poniżej jest sprawnym substytutem do czasu grafiki.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SimpleFast.ai — strona główna"
      className={cn(
        'inline-flex items-baseline font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-fg',
        className
      )}
    >
      SimpleFast
      <span className="ml-px font-sans text-[0.95rem] font-semibold text-accent">.ai</span>
    </Link>
  );
}
