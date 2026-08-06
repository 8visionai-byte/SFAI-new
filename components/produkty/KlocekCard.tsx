import { Card } from '@/components/ui';
import type { Klocek } from '@/lib/produkty';

/**
 * KlocekCard — mały kafel JEDNEGO klocka-możliwości (katalog pod produktami).
 *
 * Treść w HTML od razu (SSG): nazwa klocka (co potrafi) + jedno zdanie opisu.
 * Server Component, bez własnego <li> — element listy dostarcza strona
 * (`Reveal as="li"`). Karta nieklikalna: to lista możliwości, a jedyne CTA
 * strony prowadzi do #diagnoza (nie do osobnych podstron klocków).
 *
 * INFINITY v2 (sama prezentacja, treść 1:1): Card variant="quiet" + .inf-card
 * (ciemna karta wzorca, lewa krawędź w domyślnym akcencie). BEZ kafelka emoji
 * (spec nie mapuje klocków), BEZ błysku/strzałki (karta nieinteraktywna).
 */
export function KlocekCard({ klocek }: { klocek: Klocek }) {
  return (
    <Card as="article" variant="quiet" className="inf-card h-full p-6">
      <h3 className="text-body font-semibold text-fg">{klocek.nazwa}</h3>
      <p className="mt-2 text-body-sm text-fg-muted">{klocek.opis}</p>
    </Card>
  );
}
