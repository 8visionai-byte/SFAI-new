import { Section, MagneticButton, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA — GWARANCJA EFEKTU (risk reversal jako OSOBNY blok). Emocja: odwaga,
 * ryzyko zdjęte (mapa emocji §8). Najtańsza dźwignia na obiekcję "sparzonego klienta".
 *
 * UWAGA: dokładny model gwarancji/success-fee to DECYZJA PAWŁA (był [PLACEHOLDER]
 * w PasekZaufania i FAQ). Ten blok mówi uczciwie o mechanice, którą już stosujemy
 * (diagnoza przed płatnością, mały krok, rozliczenie za efekt) i NIE podaje
 * zmyślonych procentów/kwot zwrotu.
 *
 * INPUT PAWŁA: gdy zapadnie decyzja o modelu (np. konkretny success-fee albo zwrot
 * X% przy niespełnieniu celu), wpisać go w trzeci filar zamiast ogólnej obietnicy.
 */
const FILARY = [
  {
    t: 'Najpierw diagnoza, potem decyzja',
    d: 'Bezpłatna diagnoza i wstępna wycena, zanim wydasz złotówkę. Jak wyjdzie, że się nie opłaca, powiem to wprost.',
  },
  {
    t: 'Mały, odwracalny krok',
    d: 'Zaczynamy od jednego procesu, nie od wielkiej umowy. Testujesz na żywo, Ty ustawiasz granice, w każdej chwili możesz Agenta zatrzymać.',
  },
  {
    t: 'Rozliczenie za efekt',
    d: 'Umawiamy się na konkretny wynik. Dokładne warunki, co dzieje się, gdy Agent go nie dowozi, ustalamy na diagnozie i zapisujemy w umowie.',
  },
] as const;

export function GwarancjaEfektu() {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Co jeśli nie zadziała? Kto bierze na siebie ryzyko?</h2>
        </Reveal>
        {/* Kapsuła answer-first — cytowalna dla LLM przy "co jak AI nie zadziała" */}
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Ryzyko bierzemy na siebie tam, gdzie to my decydujemy o efekcie. Zaczynasz od bezpłatnej diagnozy
            i małego kroku, płacisz dopiero za działające rozwiązanie, a rozliczamy się za wynik, nie za
            obietnice. Dokładne warunki gwarancji ustalamy na diagnozie i zapisujemy w umowie.
          </p>
        </Reveal>
      </div>

      <ul className="mx-auto mt-8 grid max-w-narrow gap-6 md:grid-cols-3">
        {FILARY.map((f, i) => (
          <Reveal as="li" key={f.t} delay={i * 0.06}>
            <Card as="article" className="h-full">
              <h3 className="text-h3">{f.t}</h3>
              <p className="mt-2 text-body-sm text-fg-muted">{f.d}</p>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-9 flex max-w-narrow flex-col items-start gap-2">
          <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          <span className="text-caption text-fg-subtle">Bez zobowiązań. Najpierw sprawdzamy, czy w ogóle warto.</span>
        </div>
      </Reveal>
    </Section>
  );
}
