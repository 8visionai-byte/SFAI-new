import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import { PostMeta } from './PostMeta';
import type { Post, PostWkrotce } from '@/lib/blog/types';

/**
 * PostCard — karta wpisu na liście /blog. Cała karta jest klikalna (link na H3
 * rozciągnięty przez `after:absolute` na powierzchnię Card), wariant `interactive`
 * (lift na hover = uczciwa afordancja klikalności). Treść (tytuł, lead, data) w HTML
 * od razu — sygnał dla botów AI niezależnie od JS.
 *
 * Tytuł jest H3 (lista pod H1 strony /blog), lead = zajawka answer-first.
 */
export function PostCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;
  return (
    <Card as="article" variant="interactive" className="relative flex h-full flex-col">
      <div className="flex items-center gap-2">
        <Badge variant="neutral">{post.kategoria}</Badge>
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
 * PostCardWkrotce — karta tematu zaplanowanego BEZ trasy. Nieklikalna (zero
 * martwego linku), wariant `base`, badge „Wkrótce". Pokazuje plan redakcyjny i
 * łapie long-tail, zanim powstanie pełny wpis. `aria-disabled` dla czytników.
 */
export function PostCardWkrotce({ temat }: { temat: PostWkrotce }) {
  return (
    <Card
      as="article"
      variant="base"
      className="flex h-full flex-col opacity-80"
      aria-disabled="true"
    >
      <div className="flex items-center gap-2">
        <Badge variant="neutral">{temat.kategoria}</Badge>
        <Badge variant="accent">Wkrótce</Badge>
      </div>

      <h3 className="text-h3 mt-4 text-fg-muted">{temat.tytul}</h3>

      <span className="mt-auto pt-4 text-caption text-fg-subtle">
        Przygotowujemy ten wpis
      </span>
    </Card>
  );
}
