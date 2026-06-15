import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * RealizacjaNarrative — uniwersalny blok tekstowy z nagłówkiem-pytaniem (H2) i
 * akapitem. Używany dla SEKCJI 2 (Kontekst/problem) i 3 (Co wdrożyliśmy) case'a.
 * H2 sformułowany jak pytanie (answer-first, GEO).
 *
 * `tone` przeplata tło sekcji (rytm strony). Treść w HTML od razu.
 */
export function RealizacjaNarrative({
  h2,
  tresc,
  tone = 'base',
  id,
}: {
  h2: string;
  tresc: string;
  tone?: 'base' | 'subtle';
  id?: string;
}) {
  return (
    <Section tone={tone} id={id}>
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{h2}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">{tresc}</p>
        </Reveal>
      </div>
    </Section>
  );
}
