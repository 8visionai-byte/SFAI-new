/**
 * cn — lekki helper do łączenia klas warunkowych.
 * Bez zależności (clsx/twMerge) — fundament ma być chudy.
 * Filtruje falsy i scala stringi spacją.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter((value): value is string | number => Boolean(value))
    .join(' ');
}
