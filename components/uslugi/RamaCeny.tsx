import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';

/**
 * RamaCeny — SEKCJA 6 szablonu (rama ceny value-based). H2 jak pytanie
 * ("Ile kosztuje ...?"). Cena widoczna = bramka GEO, ale ZERO zmyślonej kwoty:
 * dopóki `ramaCeny.minPrice` jest undefined, render mówi prawdę o mechanice
 * wyceny i kieruje na bezpłatną diagnozę (north star #6).
 *
 * Gdy Paweł poda realne "od X zł", faza 3 ustawia `minPrice` w pliku usługi —
 * wtedy pokazujemy kwotę tutaj i (przez schemas) w `offers` Service JSON-LD.
 * Kwota w UI i w schema MUSI być ta sama liczba (spójność).
 */
export function RamaCeny({ ramaCeny }: { ramaCeny: Usluga['ramaCeny'] }) {
  const maKwote = typeof ramaCeny.minPrice === 'number';

  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{ramaCeny.h2}</h2>
        </Reveal>

        {maKwote && (
          <Reveal delay={0.04}>
            <p className="mt-5 font-display text-h2 font-semibold tabular-nums text-brand">
              od {ramaCeny.minPrice!.toLocaleString('pl-PL')} zł
            </p>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">{ramaCeny.tresc}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-caption text-fg-subtle">
            To widełki startowe, nie ostateczna faktura. Dokładną cenę poznasz na
            bezpłatnej diagnozie, zanim cokolwiek zamówisz. Bez ukrytych kosztów.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
