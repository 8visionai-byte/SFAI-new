import Link from 'next/link';
import { Badge } from '@/components/ui';
import { KATEGORIA_LABEL } from '@/lib/realizacje/types';
import type { Realizacja } from '@/lib/realizacje/types';

/**
 * RealizacjaCard — kafelek case'a na liście /realizacje (premium, hover preview).
 *
 * Cała karta to jeden <Link> (klikalny obszar = całość, lepsza afordancja i cel
 * dotykowy). Hover: lift -4px + cień md + ramka brand + strzałka „w prawo" (motion
 * służy uwadze, nie ozdobie; przy prefers-reduced-motion globalny gate wyłącza ruch).
 *
 * Treść w HTML od razu (SSG): badge kategorii, H1, metryka-dowód (pierwsza liczba
 * z case'a = bramka GEO), kapsuła (preview) i meta klient/branża. Anchor = H1 case'a.
 *
 * UWAGA: komponent NIE renderuje własnego <li> — element listy (<li>) dostarcza
 * strona/lista (np. `Reveal as="li"` w /realizacje), żeby nie zagnieżdżać <li> w <li>.
 */
export function RealizacjaCard({ realizacja }: { realizacja: Realizacja }) {
  const metryka = realizacja.efekt.metryki[0];

  return (
    <Link
      href={`/realizacje/${realizacja.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-xs transition-[transform,box-shadow,border-color] duration-base ease-out hover:-translate-y-1 hover:border-border-strong hover:shadow-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
    >
        <div className="flex items-center justify-between gap-3">
          <Badge variant="neutral">{KATEGORIA_LABEL[realizacja.kategoria]}</Badge>
          {metryka && (
            <span className="font-display text-h3 font-semibold tabular-nums text-accent">
              {metryka.wartosc}
            </span>
          )}
        </div>

        <h3 className="text-h3 mt-4 text-fg group-hover:text-brand">{realizacja.h1}</h3>

        <p className="mt-3 text-body-sm text-fg-muted">{realizacja.kapsula}</p>

        <div className="mt-auto pt-5">
          <span className="block text-caption text-fg-subtle">
            {realizacja.klient} · {realizacja.branza}
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-caption font-medium text-accent">
            Zobacz realizację
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-base group-hover:translate-x-1"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
  );
}
