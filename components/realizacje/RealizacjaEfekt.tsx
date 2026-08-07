import type { CSSProperties } from 'react';
import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Realizacja } from '@/lib/realizacje/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * RealizacjaEfekt — SEKCJA 4 case'a (EFEKT z liczbą, obowiązkowa, twardy dowód).
 * Liczby są nadreprezentowane w cytatach AI, więc to bramka GEO: każda metryka
 * jest cytowalnym faktem z realnego wdrożenia (zero zmyślania).
 *
 * Render: grid 1–3 kafelków z dużą liczbą (font-display, tabular-nums, kolor brand)
 * + etykieta, pod nimi zdanie rozwijające. Treść w HTML od razu; Reveal wzbogaca.
 * `tabular-nums` trzyma równe kolumny cyfr (spójnie z design systemem metryk).
 *
 * INFINITY v7 „NACZYNIA POŁĄCZONE" (audyt kart, partia H1): kafle metryk to ta
 * sama .inf-card co karta case'a na hubie /realizacje, ale jechały bez tonu
 * (fallbackowy akcent = jeden cyjan na wszystkich case'ach) i bez reflektora.
 * Stąd `kategoria` w propsach — ten sam klucz co RealizacjaCard i PowiazanaUsluga
 * (INF_KATEGORIA), więc hub i podstrona świecą TYM SAMYM kolorem.
 */
export function RealizacjaEfekt({
  efekt,
  kategoria,
}: {
  efekt: Realizacja['efekt'];
  kategoria: Realizacja['kategoria'];
}) {
  const dekor = INF_KATEGORIA[kategoria] ?? INF_KATEGORIA_DEFAULT;
  const cols =
    efekt.metryki.length >= 3
      ? 'sm:grid-cols-3'
      : efekt.metryki.length === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-1';

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{efekt.h2}</h2>
        </Reveal>

        {/* INFINITY v5 (spec §4): kafle metryk na kartach .inf-card (narożniki +
            sweep z globals). Etykieta zostaje czytelnym body-sm (bywa pełnym
            zdaniem — micro-caps by ją zniekształcił). Treść 1:1.
            v7: ton karty = kolor kategorii case'a (był domyślny akcent)
            + reflektor jak na karcie huba. */}
        <ul className={`mt-8 grid gap-6 ${cols}`}>
          {efekt.metryki.map((m, i) => (
            <Reveal as="li" key={m.etykieta} delay={i * 0.06}>
              <Card
                as="article"
                variant="quiet"
                className="inf-card h-full p-6"
                style={
                  {
                    '--card-c': dekor.c,
                    '--card-c-l': dekor.odcien ?? dekor.c,
                  } as CSSProperties
                }
              >
                <div aria-hidden="true" className="inf-spotlight" />

                <p className="font-display text-metric font-semibold tabular-nums text-accent">
                  {m.wartosc}
                </p>
                <p className="mt-3 text-body-sm text-fg-muted">{m.etykieta}</p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="text-lead mt-8 text-fg-muted">{efekt.opis}</p>
        </Reveal>
      </div>
    </Section>
  );
}
