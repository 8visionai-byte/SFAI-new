import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { PostMeta } from '@/components/blog';
import type { Poradnik } from '@/lib/poradniki/types';
import { INF_TYP, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * PoradnikCard — karta poradnika na liście /poradniki (i w sekcji „wyróżnione"
 * na hubie /wiedza). Cała karta klikalna (link na H3 rozciągnięty przez
 * `after:absolute`). Treść (tytuł, lead, data) w HTML od razu — sygnał dla botów
 * AI niezależnie od JS. Wzorzec 1:1 z components/blog/PostCard.
 *
 * INFINITY v2 (spec §PODSTRONY — sama prezentacja, treść 1:1): .inf-card na
 * Card variant="quiet", kafelek emoji typu treści (📚 poradnik, aria-hidden),
 * badge → mono .inf-tag, strzałka → .inf-arrow, błysk .inf-shine + spotlight
 * .inf-spotlight jako wewnętrzne divy aria-hidden.
 */
export function PoradnikCard({ poradnik }: { poradnik: Poradnik }) {
  const href = `/poradniki/${poradnik.slug}`;
  const dekor = INF_TYP.poradnik;
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card relative flex h-full flex-col p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties}
    >
      <div aria-hidden="true" className="inf-spotlight" />

      <div className="flex items-center gap-3">
        {/* Kafelek ikony typu treści — dekoracja aria-hidden (v5: ikona SVG na
            kartach, emoji tylko w dropdownach nav). */}
        <span
          aria-hidden="true"
          className="inf-tile"
          style={{ '--tile-c': dekor.c } as CSSProperties}
        >
          <InfIcon name={dekor.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
        </span>
        <span className="inf-tag">{poradnik.kategoria}</span>
      </div>

      <h3 className="text-h3 mt-4">
        <Link
          href={href}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {poradnik.tytul}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-3 text-body-sm text-fg-muted">{poradnik.lead}</p>

      <PostMeta
        data={poradnik.data}
        dataAktualizacji={poradnik.dataAktualizacji}
        className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1"
      />

      <span className="mt-4 inline-flex items-center gap-1 text-caption font-semibold text-accent">
        Czytaj poradnik
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="inf-arrow text-accent"
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
    </Card>
  );
}
