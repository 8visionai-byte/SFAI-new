import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { PostMeta } from './PostMeta';
import type { Post, PostWkrotce } from '@/lib/blog/types';
import { INF_TYP, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * PostCard — karta wpisu na liście /blog. Cała karta jest klikalna (link na H3
 * rozciągnięty przez `after:absolute` na powierzchnię karty). Treść (tytuł, lead,
 * data) w HTML od razu — sygnał dla botów AI niezależnie od JS.
 *
 * INFINITY v2 (spec §PODSTRONY — sama prezentacja, treść 1:1):
 *  - Card variant="quiet" + .inf-card (wzorzec z home/Oferta: quiet zdejmuje
 *    sf-glass, .inf-card daje ciemną kartę wzorca + lewą krawędź --card-c);
 *  - kafelek emoji typu treści (📝 wpis, aria-hidden, mapa lib/inf-kategorie);
 *  - badge kategorii → mono .inf-tag; strzałka „Czytaj" → .inf-arrow;
 *  - błysk .inf-shine + spotlight .inf-spotlight jako wewnętrzne divy aria-hidden.
 *
 * Tytuł jest H3 (lista pod H1 strony /blog), lead = zajawka answer-first.
 */
export function PostCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;
  const dekor = INF_TYP.wpis;
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
        <span className="inf-tag">{post.kategoria}</span>
      </div>

      <h3 className="text-h3 mt-4">
        <Link
          href={href}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {post.tytul}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-3 text-body-sm text-fg-muted">{post.lead}</p>

      <PostMeta
        data={post.data}
        dataAktualizacji={post.dataAktualizacji}
        className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1"
      />

      <span className="mt-4 inline-flex items-center gap-1 text-caption font-semibold text-accent">
        Czytaj
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
 * PostCardWkrotce — karta tematu zaplanowanego BEZ trasy. Nieklikalna (zero
 * martwego linku), badge „Wkrótce". Pokazuje plan redakcyjny i łapie long-tail,
 * zanim powstanie pełny wpis. `aria-disabled` dla czytników.
 * INFINITY v2: .inf-card bez błysku/strzałki (karta nieinteraktywna — bez
 * fałszywej afordancji), badge'e → mono .inf-tag (teksty 1:1).
 * INFINITY v7 (audyt: karta bez --card-c spadała na fallbackowy akcent, więc
 * cały hover świecił jednym cyjanem): ta karta to TEN SAM typ treści co wpis
 * (INF_TYP.wpis), tylko zaplanowany — bierze więc tę samą parę kolor/odcień
 * z lib/inf-kategorie co PostCard. Wyciszenie niesie dalej opacity-80.
 * v7 „naczynia połączone": reflektor .inf-spotlight jako PIERWSZE dziecko —
 * karta ma reagować na kursor tak samo jak sąsiadka w tej samej siatce.
 * Afordancji to nie zmienia (poświata nie łapie kliknięć, nie ma linku ani
 * strzałki), a bez niej połowa listy /blog gasła pod kursorem.
 */
export function PostCardWkrotce({ temat }: { temat: PostWkrotce }) {
  const dekor = INF_TYP.wpis;
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card relative flex h-full flex-col p-6 opacity-80"
      style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties}
      aria-disabled="true"
    >
      <div aria-hidden="true" className="inf-spotlight" />

      <div className="flex items-center gap-2">
        <span className="inf-tag">{temat.kategoria}</span>
        <span className="inf-tag text-accent">Wkrótce</span>
      </div>

      <h3 className="text-h3 mt-4 text-fg-muted">{temat.tytul}</h3>

      <span className="mt-auto pt-4 text-caption text-fg-subtle">
        Przygotowujemy ten wpis
      </span>
    </Card>
  );
}
