import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { getUslugaBySlug } from '@/lib/uslugi';
import type { RealizacjaKategoria } from '@/lib/realizacje/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * PowiazanaUsluga — SEKCJA 5 case'a: link wewnętrzny do powiązanej usługi
 * (/uslugi/<kategoria>). Linkowanie wewnętrzne pod GEO (case -> usługa): anchor =
 * H1 usługi = money query, a nie "zobacz więcej". Bot widzi link w HTML (SSG).
 *
 * Źródłem usługi jest rejestr lib/uslugi (single source) — gdy slug kategorii nie
 * ma odpowiednika w rejestrze (np. kategoria bez zbudowanej strony usługi), sekcja
 * nie renderuje się wcale (zero martwych linków, zasada żelazna sitemapy/IA).
 */
export function PowiazanaUsluga({ kategoria }: { kategoria: RealizacjaKategoria }) {
  const usluga = getUslugaBySlug(kategoria);
  if (!usluga) return null;

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Chcesz to samo u siebie?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            To wdrożenie wyrosło z naszej usługi. Zobacz, jak działa krok po kroku
            i co możemy zbudować dla Twojej firmy.
          </p>
        </Reveal>

        {/* INFINITY v5 (spec §4): link do usługi jako karta .inf-card w kolorze
            kategorii (narożniki + sweep z globals) z kafelkiem ikony kategorii
            i strzałką .inf-arrow — wiersz jak w dropdownie wzorca. Treść 1:1. */}
        <Reveal delay={0.1}>
          <Link
            href={`/uslugi/${usluga.slug}`}
            className="inf-card group mt-6 flex items-center gap-4 p-6 md:gap-5"
            style={
              {
                '--card-c': (INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT).c,
              } as CSSProperties
            }
          >
            {/* Kafelek ikony kategorii — dekoracja aria-hidden. */}
            <span
              aria-hidden="true"
              className="inf-tile shrink-0"
              style={
                {
                  '--tile-c': (INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT).c,
                } as CSSProperties
              }
            >
              <InfIcon
                name={(INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT).ikona ?? INF_KATEGORIA_DEFAULT.ikona}
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-medium text-fg group-hover:text-brand">
                {usluga.h1}
              </span>
              <span className="mt-2 block text-body-sm text-fg-muted">
                {usluga.metaDescription}
              </span>
              <span className="mt-3 block text-caption text-fg-subtle">
                Zobacz, jak to działa
              </span>
            </span>
            <span aria-hidden="true" className="inf-arrow text-accent max-sm:hidden">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
