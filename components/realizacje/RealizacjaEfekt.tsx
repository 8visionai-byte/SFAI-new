import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Realizacja } from '@/lib/realizacje/types';

/**
 * RealizacjaEfekt — SEKCJA 4 case'a (EFEKT z liczbą, obowiązkowa, twardy dowód).
 * Liczby są nadreprezentowane w cytatach AI, więc to bramka GEO: każda metryka
 * jest cytowalnym faktem z realnego wdrożenia (zero zmyślania).
 *
 * Render: grid 1–3 kafelków z dużą liczbą (font-display, tabular-nums, kolor brand)
 * + etykieta, pod nimi zdanie rozwijające. Treść w HTML od razu; Reveal wzbogaca.
 * `tabular-nums` trzyma równe kolumny cyfr (spójnie z design systemem metryk).
 */
export function RealizacjaEfekt({ efekt }: { efekt: Realizacja['efekt'] }) {
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

        <ul className={`mt-8 grid gap-6 ${cols}`}>
          {efekt.metryki.map((m, i) => (
            <Reveal as="li" key={m.etykieta} delay={i * 0.06}>
              <Card as="article" className="h-full">
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
