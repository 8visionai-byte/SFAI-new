import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import type { Material, MaterialWkrotce } from '@/lib/materialy/types';
import { INF_TYP, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * MaterialCard — karta lead magnetu na hubie /materialy. Cała karta klikalna
 * (link na H3 rozciągnięty przez `after:absolute`). Treść (tytuł, zachęta, typ
 * pliku) w HTML od razu = sygnał dla botów AI niezależnie od JS. Wzorzec 1:1
 * z components/blog/PostCard.
 *
 * INFINITY v2 (spec §PODSTRONY — sama prezentacja, treść 1:1): .inf-card na
 * Card variant="quiet", kafelek emoji typu treści (🧲 lead magnet, aria-hidden),
 * badge'e (etykieta + typ pliku) → mono .inf-tag, strzałka → .inf-arrow, błysk
 * .inf-shine + spotlight .inf-spotlight jako wewnętrzne divy aria-hidden.
 *
 * Tytuł jest H3 (lista pod H1 huba), `zacheta` = krótkie zdanie problem -> efekt.
 */
export function MaterialCard({ material }: { material: Material }) {
  const href = `/materialy/${material.slug}`;
  const dekor = INF_TYP.material;
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
        <span className="inf-tag">{material.etykieta}</span>
        {/* Badge typu pliku w jasnym odcieniu typu (istniejące pole). */}
        <span className="inf-tag" style={{ color: dekor.odcien ?? dekor.c }}>
          {material.typPliku}
        </span>
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

/**
 * MaterialCardWkrotce — karta magnetu zaplanowanego BEZ trasy. Nieklikalna (zero
 * martwego linku), badge „Wkrótce". Pokazuje plan i łapie long-tail, zanim
 * powstanie pełna treść. `aria-disabled` dla czytników.
 * INFINITY v2: .inf-card bez błysku/strzałki (karta nieinteraktywna — bez
 * fałszywej afordancji), badge'e → mono .inf-tag (teksty 1:1).
 */
export function MaterialCardWkrotce({ temat }: { temat: MaterialWkrotce }) {
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card flex h-full flex-col p-6 opacity-80"
      aria-disabled="true"
    >
      <div className="flex items-center gap-2">
        <span className="inf-tag">{temat.etykieta}</span>
        <span className="inf-tag text-accent">Wkrótce</span>
      </div>

      <h3 className="text-h3 mt-4 text-fg-muted">{temat.tytul}</h3>

      <span className="mt-auto pt-4 text-caption text-fg-subtle">
        Przygotowujemy ten materiał
      </span>
    </Card>
  );
}
