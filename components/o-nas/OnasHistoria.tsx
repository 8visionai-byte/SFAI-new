import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { O_NAS } from '@/lib/o-nas/content';

/**
 * OnasHistoria — SEKCJA 2: prawdziwa historia firmy (H2 jak pytanie).
 * Poznali się na szkoleniu -> Paweł założył -> Marcin dołącza -> prowadzą razem.
 * Akapity z lib/o-nas (zero zmyślonych dat/miejsc). Treść w HTML od razu.
 */
export function OnasHistoria() {
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{O_NAS.historia.h2}</h2>
        </Reveal>

        <div className="mt-5 flex flex-col gap-5">
          {O_NAS.historia.akapity.map((akapit, i) => (
            <Reveal key={i} delay={0.05 + i * 0.05}>
              <p className="text-lead text-fg-muted">{akapit}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
