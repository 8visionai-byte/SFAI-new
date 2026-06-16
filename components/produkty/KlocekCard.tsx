import { Card } from '@/components/ui';
import type { Klocek } from '@/lib/produkty';

/**
 * KlocekCard — mały kafel JEDNEGO klocka-możliwości (katalog pod produktami).
 *
 * Treść w HTML od razu (SSG): nazwa klocka (co potrafi) + jedno zdanie opisu.
 * Server Component, bez własnego <li> — element listy dostarcza strona
 * (`Reveal as="li"`). Karta nieklikalna (variant="base"): to lista możliwości,
 * a jedyne CTA strony prowadzi do #diagnoza (nie do osobnych podstron klocków).
 */
export function KlocekCard({ klocek }: { klocek: Klocek }) {
  return (
    <Card as="article" variant="base" className="h-full">
      <h3 className="text-body font-semibold text-fg">{klocek.nazwa}</h3>
      <p className="mt-2 text-body-sm text-fg-muted">{klocek.opis}</p>
    </Card>
  );
}
