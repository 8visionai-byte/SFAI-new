import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Bloki } from '@/components/blog/PostBody';
import type { Blok } from '@/lib/blog/types';
import type { InfDekor } from '@/lib/inf-kategorie';

/**
 * ServiceNarrative — uniwersalny blok tekstowy z nagłówkiem-pytaniem (H2) i
 * akapitem. Używany dla SEKCJI 2 (Problem) i 3 (Rozwiązanie) szablonu usługi.
 * H2 sformułowany jak pytanie klienta MŚP (answer-first, GEO).
 *
 * `tone` przeplata tło sekcji (rytm strony). Treść w HTML od razu.
 *
 * Runda struktury 2026-08-19 (raport konkurencji P8: mediana akapitu ~150 zn,
 * u nas ściany do 1126 zn): opcjonalne `bloki` renderują strukturę sekcji POD
 * leadem tym samym silnikiem co poradniki (PostBody/Bloki) w tonie kategorii
 * usługi (`ton`). Bez `bloki` render 1:1 jak dotąd — konsumenci tacy jak
 * strony realizacji (app/realizacje/[slug]) są nietknięci.
 */
export function ServiceNarrative({
  h2,
  tresc,
  tone = 'base',
  id,
  bloki,
  ton,
}: {
  h2: string;
  tresc: string;
  tone?: 'base' | 'subtle';
  id?: string;
  /** Struktura sekcji po leadzie (lib/blog/types Blok) — silnik poradników. */
  bloki?: Blok[];
  /** Ton kategorii usługi (dekorUslugi) — karty bloków świecą kolorem rodziny. */
  ton?: InfDekor;
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
        {bloki && bloki.length > 0 && (
          <div className="mt-8">
            {/* naglowki="h3": blok siedzi POD H2 tej sekcji — hierarchia bez przeskoków. */}
            <Bloki tresc={bloki} ton={ton} naglowki="h3" />
          </div>
        )}
      </div>
    </Section>
  );
}
