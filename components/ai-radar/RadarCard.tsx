import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import { PostMeta } from '@/components/blog';
import { RadarSzablonNotka } from './RadarSzablonNotka';
import type { RadarNews } from '@/lib/ai-radar';

/**
 * RadarCard — karta newsa na liście /ai-radar. Cała karta klikalna (link na H3
 * rozciągnięty przez `after:absolute`), wariant `interactive` (lift na hover).
 * Treść (hook, tytuł, data) w HTML od razu — sygnał dla botów AI niezależnie od JS.
 *
 * Hook jest zajawką answer-first (jak `lead` w PostCard). Gdy wpis to szablon,
 * widoczny badge „Przykład / szablon" — zero udawania realnego newsa na liście.
 */
export function RadarCard({ news }: { news: RadarNews }) {
  const href = `/ai-radar/${news.slug}`;
  return (
    <Card as="article" variant="interactive" className="relative flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent">AI Radar</Badge>
        {news.szablon && <RadarSzablonNotka variant="card" />}
      </div>

      <h3 className="text-h3 mt-4">
        <Link
          href={href}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {news.tytul}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-3 text-body-sm text-fg-muted">{news.hook}</p>

      <PostMeta
        data={news.data}
        dataAktualizacji={news.dataAktualizacji}
        className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1"
      />

      <span className="mt-4 inline-flex items-center gap-1 text-caption font-semibold text-accent">
        Czytaj news
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
