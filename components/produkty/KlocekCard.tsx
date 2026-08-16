import type { CSSProperties } from 'react';
import { Card } from '@/components/ui';
import type { Klocek } from '@/lib/produkty';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * INFINITY v7 (audyt: 10 z 14 kart /produkty szło bez --card-c, więc cała
 * siatka klocków świeciła w hoverze jednym fallbackowym cyjanem).
 *
 * Klocki NIE mają kategorii w rejestrze lib/produkty (to lista możliwości, nie
 * usługi), więc tonację bierzemy z palety kategorii i cyklujemy nią po siatce —
 * dokładnie ten sam chwyt co numerowane kroki w components/o-nas. Sześć tonów
 * na siatce 3-kolumnowej daje sąsiadom różne kolory w każdym rzędzie.
 * Kolor to WYŁĄCZNIE dekoracja (custom property), nie treść.
 */
const KLOCEK_TON = [
  'chatboty', // cyjan
  'voiceboty', // fiolet
  'automatyzacje', // zieleń
  'dokumenty-faktury', // bursztyn
  'agent-rekrutacyjny', // jasny fiolet + magenta
  'strony-www', // cyjan + błękit
].map((slug) => INF_KATEGORIA[slug] ?? INF_KATEGORIA_DEFAULT);

/**
 * KlocekCard — mały kafel JEDNEGO klocka-możliwości (katalog pod produktami).
 *
 * Treść w HTML od razu (SSG): nazwa klocka (co potrafi) + jedno zdanie opisu.
 * Server Component, bez własnego <li> — element listy dostarcza strona
 * (`Reveal as="li"`). Karta nieklikalna: to lista możliwości, a jedyne CTA
 * strony prowadzi do #diagnoza (nie do osobnych podstron klocków).
 *
 * INFINITY v2 (sama prezentacja, treść 1:1): Card variant="quiet" + .inf-card
 * (ciemna karta wzorca). BEZ kafelka emoji (spec nie mapuje klocków), BEZ
 * błysku/strzałki (karta nieinteraktywna).
 * INFINITY v7 (audyt „naczynia połączone"): reflektor .inf-spotlight jako
 * PIERWSZE dziecko — kafel klocka reaguje na kursor tak samo jak każda inna
 * karta wzorca (poświata w tonie karty, bez wpływu na klikalność).
 *
 * `indeks` = pozycja w katalogu (podaje strona) — steruje wyłącznie tonacją.
 */
export function KlocekCard({ klocek, indeks = 0 }: { klocek: Klocek; indeks?: number }) {
  const dekor = KLOCEK_TON[indeks % KLOCEK_TON.length] ?? INF_KATEGORIA_DEFAULT;
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card inf-card-quiet relative h-full p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties}
    >
      <div aria-hidden="true" className="inf-spotlight" />

      {/* F2: `font-bold`, nie `font-semibold`. Reguła wagi tytułu karty
          w globals zeszła z :is() (0,1,1) na :where() (0,1,0), żeby markup
          realnie decydował — od tej chwili KAŻDE utility wagi wygrywa, więc
          semibold renderowałby 600 zamiast dotychczasowych 700. */}
      <h3 className="text-body font-bold text-fg">{klocek.nazwa}</h3>
      <p className="mt-2 text-body-sm text-fg-muted">{klocek.opis}</p>
    </Card>
  );
}
