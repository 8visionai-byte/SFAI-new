import type { CSSProperties } from 'react';
import Link from 'next/link';
import { KATEGORIA_LABEL } from '@/lib/realizacje/types';
import type { Realizacja } from '@/lib/realizacje/types';
import {
  INF_KATEGORIA,
  INF_KATEGORIA_DEFAULT,
  INF_REALIZACJA_IKONA,
} from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * RealizacjaCard — kafelek case'a na liście /realizacje (premium, hover preview).
 *
 * Cała karta to jeden <Link> (klikalny obszar = całość, lepsza afordancja i cel
 * dotykowy). INFINITY v2 (spec §PODSTRONY — sama prezentacja, treść 1:1):
 *  - karta = .inf-card (ciemna karta wzorca, lewa krawędź w kolorze kategorii
 *    przez --card-c, hover: lift + poświata z bramką hover w globals.css);
 *  - kafelek emoji kategorii (.inf-tile, aria-hidden — czysta dekoracja, mapa
 *    kolorów/emoji ze spec w lib/inf-kategorie);
 *  - badge kategorii → mono .inf-tag; strzałka „Zobacz realizację" → .inf-arrow
 *    (dojeżdża na hover karty — reguła .inf-card:hover .inf-arrow);
 *  - błysk .inf-shine + spotlight .inf-spotlight jako WEWNĘTRZNE divy aria-hidden
 *    (overflow:hidden tylko w .inf-shine, NIE na karcie — kontrakt fundamentu).
 *
 * Treść w HTML od razu (SSG): tag kategorii, H1, metryka-dowód (pierwsza liczba
 * z case'a = bramka GEO), kapsuła (preview) i meta klient/branża. Anchor = H1 case'a.
 *
 * UWAGA: komponent NIE renderuje własnego <li> — element listy (<li>) dostarcza
 * strona/lista (np. `Reveal as="li"` w /realizacje), żeby nie zagnieżdżać <li> w <li>.
 */
export function RealizacjaCard({ realizacja }: { realizacja: Realizacja }) {
  const metryka = realizacja.efekt.metryki[0];
  const dekor = INF_KATEGORIA[realizacja.kategoria] ?? INF_KATEGORIA_DEFAULT;
  const odcien = dekor.odcien ?? dekor.c;

  return (
    <Link
      href={`/realizacje/${realizacja.slug}`}
      className="inf-card group flex h-full flex-col p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': odcien } as CSSProperties}
    >
      {/* Spotlight — dekoracja malowana przez CSS fundamentu (i JS orchestratora
          dla --mx/--my); pointer-events:none, zero treści. Sweep robi ::after
          samej .inf-card (v4) — bez dodatkowego .inf-shine. */}
      <div aria-hidden="true" className="inf-spotlight" />

      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          {/* Kafelek kategorii — UNIKALNA ikona SVG per case (mapa
              INF_REALIZACJA_IKONA; v5: emoji tylko w dropdownach nav);
              dekoracja aria-hidden (jak dropdown). */}
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': dekor.c } as CSSProperties}
          >
            <InfIcon
              name={INF_REALIZACJA_IKONA[realizacja.slug] ?? INF_KATEGORIA_DEFAULT.ikona}
            />
          </span>
          <span className="inf-tag">{KATEGORIA_LABEL[realizacja.kategoria]}</span>
        </span>
        {/* Metryka-dowód w JASNYM odcieniu kategorii karty (mechanizm
            .inf-card-sub home — odcienie AA na --surface z zapasem). */}
        {metryka && (
          <span
            className="font-display text-h3 font-semibold tabular-nums"
            style={{ color: odcien }}
          >
            {metryka.wartosc}
          </span>
        )}
      </div>

      <h3 className="text-h3 mt-4 text-fg group-hover:text-brand">{realizacja.h1}</h3>

      <p className="mt-3 text-body-sm text-fg-muted">{realizacja.kapsula}</p>

      <div className="mt-auto pt-5">
        <span className="block text-caption text-fg-subtle">
          {realizacja.klient} · {realizacja.branza}
        </span>
        <span className="mt-3 inline-flex items-center gap-1 text-caption font-medium text-accent">
          Zobacz realizację
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
      </div>
    </Link>
  );
}
