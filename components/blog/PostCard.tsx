import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { PostMeta } from './PostMeta';
import type { Post, PostWkrotce } from '@/lib/blog/types';
import { INF_TYP, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';
import {
  KartaBadge,
  KartaEtykieta,
  KartaTagi,
  tagiPosta,
} from '@/components/sections/KartaCzesci';

/**
 * PostCard — karta wpisu na liście /blog. Cała karta jest klikalna (link na H3
 * rozciągnięty przez `after:absolute` na powierzchnię karty). Treść (tytuł, lead,
 * data) w HTML od razu — sygnał dla botów AI niezależnie od JS.
 *
 * INFINITY v2 (spec §PODSTRONY — sama prezentacja, treść 1:1):
 *  - Card variant="quiet" + .inf-card (wzorzec z home/Oferta: quiet zdejmuje
 *    sf-glass, .inf-card daje ciemną kartę wzorca + lewą krawędź --card-c);
 *  - kafelek emoji typu treści (📝 wpis, aria-hidden, mapa lib/inf-kategorie);
 *  - strzałka „Czytaj" → .inf-arrow;
 *  - błysk .inf-shine + spotlight .inf-spotlight jako wewnętrzne divy aria-hidden.
 *
 * INFINITY v8b (spec §4 „różne modele tagów"): karta wpisu dostaje WARIANT (b),
 * czyli tagi PŁASKIE. Kategoria nad tytułem zeszła z pigułki na mono etykietę
 * w kolorze karty (wzorzec trzyma tam status bez ramki), a pod metą stoi rząd
 * płaskich tagów z pola `tagi` rejestru. Pigułek z obwódką ta karta nie ma
 * wcale — mają je karty usług, produktów i realizacji.
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
        {/* v8b §4: kategoria schodzi z pigułki na PŁASKĄ mono etykietę w kolorze
            karty — wzorzec trzyma status/kategorię nad tytułem bez ramki
            (§3.6 „• ACTIVE"), a ramki zostawia rzędowi tagów na dole. */}
        <KartaEtykieta>{post.kategoria}</KartaEtykieta>
      </div>

      {/* Waga 800 (pomiary §3.2 — tytuł wzorca nie ma poświaty, „świeci"
          grubością glifu; h3 bazowo ma 600). */}
      <h3 className="text-h3 mt-4 font-extrabold">
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

      {/* WARIANT (b) PŁASKI (spec v8b §4): karta treści ma już kolorową etykietę
          kategorii na górze i kolorowe „Czytaj" na dole — trzecia kolorowa
          warstwa w ramkach byłaby hałasem. Tagi lecą sam tekstem mono, jak
          „AWS BEDROCK ENTERPRISE AI" na wzorcu. Treść = pole `tagi` rejestru
          lib/blog (istniejąca taksonomia wpisu), zero nowych stringów. */}
      <KartaTagi
        tagi={tagiPosta(post)}
        doDolu={false}
        wariant="plaski"
        etykietaListy={`Tagi wpisu: ${post.tytul}`}
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
 * fałszywej afordancji). v8b: kategoria płaska mono, status „Wkrótce" w pigułce
 * (teksty 1:1).
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

      {/* v8b §4, DWA modele w jednym rzędzie (dokładnie ta różnica, którą
          zauważył Paweł): kategoria PŁASKA mono, a status „Wkrótce" w PIGUŁCE
          z obwódką w kolorze karty — bo to jedyna informacja, która ma tu
          zatrzymać wzrok. */}
      <div className="flex items-center gap-3">
        <KartaEtykieta>{temat.kategoria}</KartaEtykieta>
        <KartaBadge>Wkrótce</KartaBadge>
      </div>

      {/* Tytuł zostaje wyciszony (karta bez trasy), więc BEZ podbicia wagi:
          `.inf-card h3` z globals celowo nie rozjaśnia tytułów na
          .text-fg-muted, a cięższy glif czytałby się jak aktywna karta. */}
      <h3 className="text-h3 mt-4 text-fg-muted">{temat.tytul}</h3>

      <span className="mt-auto pt-4 text-caption text-fg-subtle">
        Przygotowujemy ten wpis
      </span>
    </Card>
  );
}
