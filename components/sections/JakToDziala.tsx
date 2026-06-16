import { Section, Button, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA 6 — JAK TO DZIAŁA (3 kroki) (spec 03 §6). Emocja: spokój + kontrola.
 * Pierwszy krok mały i odwracalny. Kapsuła answer-first + 3 numerowane kroki.
 */
const KROKI = [
  {
    n: '1',
    t: 'Diagnoza (bezpłatna)',
    d: 'Rozmawiamy 30 minut. Ty pokazujesz, gdzie ucieka czas, ja mówię wprost, co da się zautomatyzować, ile to oszczędza i czego się nie opłaca ruszać. Wychodzisz z konkretną listą, nawet jeśli nic u nas nie zamówisz.',
  },
  {
    n: '2',
    t: 'Pierwszy Agent (mały projekt)',
    d: 'Wybieramy jeden proces, który boli najbardziej. Stawiamy Agenta w dni, nie w miesiące. Testujemy na żywo, Ty ustawiasz granice i zasady. Twoje dane przez cały czas zostają w UE.',
  },
  {
    n: '3',
    t: 'Opieka i rozwój',
    d: 'Agent działa, my pilnujemy, żeby działał dobrze. Patrzymy na wyniki, poprawiamy, dokładamy kolejne zadania, kiedy poczujesz, że to się spina. Płacisz za efekt, nie za obietnice.',
  },
] as const;

export function JakToDziala() {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Jak wygląda wdrożenie AI Agenta krok po kroku?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Wdrożenie ma trzy kroki. Najpierw bezpłatna diagnoza, na której pokazujemy, co u Ciebie da się
            zautomatyzować i ile to oszczędza. Potem stawiamy pierwszego Agenta na jednym, konkretnym procesie.
            Na końcu pilnujemy, żeby działał, i rozwijamy go o kolejne zadania. Pierwszy krok nic nie kosztuje
            i do niczego nie zobowiązuje.
          </p>
        </Reveal>
      </div>

      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {KROKI.map((k, i) => (
          <Reveal as="li" key={k.n} delay={i * 0.06}>
            <Card as="article" className="h-full">
              <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-accent-soft font-display text-h3 font-semibold text-accent-hover">
                {k.n}
              </span>
              <h3 className="text-h3 mt-4">{k.t}</h3>
              <p className="mt-2 text-body-sm text-fg-muted">{k.d}</p>
            </Card>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-7 max-w-narrow text-body-sm text-fg-muted">
          Cały czas widzisz, co Agent robi, i w każdej chwili możesz go zatrzymać. To Ty jesteś szefem, on tylko
          zdejmuje robotę.
        </p>
      </Reveal>

      {/*
        DOWÓD przy CTA (north star #5 — przy KAŻDYM CTA). Tu uczciwy, weryfikowalny
        sygnał oferty zamiast zmyślonej liczby: pierwszy krok jest bezpłatny i odwracalny.
        INPUT PAWŁA: gdy będzie realna metryka operacyjna (np. liczba diagnoz/mc),
        wstawić ją tu zamiast samej mikrokopii.
      */}
      <Reveal delay={0.15}>
        <div className="mt-6 flex flex-col items-start gap-2">
          <Button variant="primary" href={HOME_CTA.href}>
            Umów bezpłatną diagnozę
          </Button>
          <span className="text-caption text-fg-subtle">
            Pierwszy krok jest bezpłatny i odwracalny. Bez zobowiązań, bez umów, bez ryzyka.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
