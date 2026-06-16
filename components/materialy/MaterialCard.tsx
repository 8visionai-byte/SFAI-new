import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import type { Material, MaterialWkrotce } from '@/lib/materialy/types';

/**
 * MaterialCard — karta lead magnetu na hubie /materialy. Cała karta klikalna
 * (link na H3 rozciągnięty przez `after:absolute`), wariant `interactive` (lift
 * na hover = uczciwa afordancja). Treść (tytuł, zachęta, typ pliku) w HTML od razu
 * = sygnał dla botów AI niezależnie od JS. Wzorzec 1:1 z components/blog/PostCard.
 *
 * Tytuł jest H3 (lista pod H1 huba), `zacheta` = krótkie zdanie problem -> efekt.
 */
export function MaterialCard({ material }: { material: Material }) {
  const href = `/materialy/${material.slug}`;
  return (
    <Card as="article" variant="interactive" className="relative flex h-full flex-col">
      <div className="flex items-center gap-2">
        <Badge variant="neutral">{material.etykieta}</Badge>
        <Badge variant="accent">{material.typPliku}</Badge>
      </div>

      <h3 className="text-h3 mt-4">
        <Link
          href={href}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {material.tytul}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-3 text-body-sm text-fg-muted">{material.zacheta}</p>

      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-caption font-semibold text-accent">
        Czytaj i pobierz
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

/**
 * MaterialCardWkrotce — karta magnetu zaplanowanego BEZ trasy. Nieklikalna (zero
 * martwego linku), wariant `base`, badge „Wkrótce". Pokazuje plan i łapie long-tail,
 * zanim powstanie pełna treść. `aria-disabled` dla czytników.
 */
export function MaterialCardWkrotce({ temat }: { temat: MaterialWkrotce }) {
  return (
    <Card
      as="article"
      variant="base"
      className="flex h-full flex-col opacity-80"
      aria-disabled="true"
    >
      <div className="flex items-center gap-2">
        <Badge variant="neutral">{temat.etykieta}</Badge>
        <Badge variant="accent">Wkrótce</Badge>
      </div>

      <h3 className="text-h3 mt-4 text-fg-muted">{temat.tytul}</h3>

      <span className="mt-auto pt-4 text-caption text-fg-subtle">
        Przygotowujemy ten materiał
      </span>
    </Card>
  );
}
