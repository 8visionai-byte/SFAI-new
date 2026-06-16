import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import { PostMeta } from '@/components/blog';
import type { Poradnik } from '@/lib/poradniki/types';

/**
 * PoradnikCard — karta poradnika na liście /poradniki (i w sekcji „wyróżnione"
 * na hubie /wiedza). Cała karta klikalna (link na H3 rozciągnięty przez
 * `after:absolute`), wariant `interactive`. Treść (tytuł, lead, data) w HTML od
 * razu — sygnał dla botów AI niezależnie od JS. Wzorzec 1:1 z components/blog/PostCard.
 */
export function PoradnikCard({ poradnik }: { poradnik: Poradnik }) {
  const href = `/poradniki/${poradnik.slug}`;
  return (
    <Card as="article" variant="interactive" className="relative flex h-full flex-col">
      <div className="flex items-center gap-2">
        <Badge variant="neutral">{poradnik.kategoria}</Badge>
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
