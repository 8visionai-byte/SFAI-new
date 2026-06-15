import { Section, MagneticButton, Card, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA, SITE } from '@/lib/site';

/**
 * SEKCJA 8 — DOWÓD SPOŁECZNY (spec 03 §8). Emocja: zaufanie + uczciwa pilność.
 * Opinie z twarzą > logo. Autorytet Pawła (E-E-A-T). Niedobór TYLKO prawdziwy.
 *
 * ZASADA: zero zmyślonych cytatów i zero widocznych [PLACEHOLDER] w treści
 * (LLM cytuje placeholdery jako fakt). Dopóki brak realnych opinii, OPINIE jest
 * puste i renderujemy uczciwy stan — najmocniejszy jest blok autorytetu Pawła
 * (z realnych danych SITE).
 *
 * INPUT PAWŁA: realne opinie (cytat z konkretem/liczbą + imię, rola, firma, twarz,
 * za zgodą klienta) -> wpisać do OPINIE, a render automatycznie je pokaże.
 */
const OPINIE: ReadonlyArray<readonly [string, string]> = [];

export function DowodSpoleczny() {
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Komu już postawiliśmy AI Agentów?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          {/*
            INPUT PAWŁA: realne branże + liczba wdrożeń + suma zdjętych godzin/mc.
            Do czasu danych — uczciwa kapsuła BEZ widocznych [PLACEHOLDER]
            (które zacytowałby LLM jako fakt o firmie).
          */}
          <p className="text-lead mt-5 text-fg-muted">
            Stawiamy AI Agentów dla polskich firm z usług, handlu i produkcji. Konkretne nazwy, liczby wdrożeń
            i zdjęte godziny publikujemy tutaj wtedy, gdy klient da na to zielone światło, nie wcześniej.
          </p>
        </Reveal>
      </div>

      {/* Opinie — renderujemy TYLKO realne (z twarzą). Brak realnych = uczciwy stan. */}
      {OPINIE.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {OPINIE.map(([cytat, osoba], i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Card as="figure" className="h-full">
                <blockquote className="text-body text-fg">„{cytat}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  {/* INPUT PAWŁA: prawdziwe zdjęcie klienta, zero stocku, zero twarzy z AI */}
                  <span className="inline-block h-10 w-10 rounded-full bg-bg-subtle" aria-hidden="true" />
                  <span className="text-caption text-fg-muted">{osoba}</span>
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <Card as="article" className="mt-8">
            <p className="text-body-sm text-fg-muted">
              Opinie z nazwiskami i firmami publikujemy, gdy tylko klient da zielone światło. Nie wstawiamy
              zmyślonych cytatów. Chcesz porozmawiać z kimś, komu już postawiliśmy Agenta? Poproś na diagnozie.
            </p>
          </Card>
        </Reveal>
      )}

      {/* Kto za tym stoi — autorytet Pawła (E-E-A-T) */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-8 max-w-narrow rounded-lg border border-border bg-surface p-6 shadow-xs">
          <h3 className="text-h3">Kto stawia te Agenty?</h3>
          {/* INPUT PAWŁA: dopisać lata doświadczenia + nazwę certyfikatu cyberbezpieczeństwa. */}
          <p className="mt-3 text-body-sm text-fg-muted">
            {SITE.founder.name}, {SITE.founder.jobTitle}. Buduje strony, automatyzacje, chatboty, voiceboty i
            apki. Nie sprzedaję narzędzi. Sprzedaję efekt, który widać na rachunku za czas zespołu.
          </p>
          <div className="mt-4">
            <Button variant="link" href="/o-nas">
              Poznaj Pawła →
            </Button>
          </div>
        </div>
      </Reveal>

      {/*
        Niedobór — TYLKO prawdziwy, etyczny. INPUT PAWŁA: jeśli jest realny limit
        (konkretna liczba wdrożeń/mc), wpisać ją. Do tego czasu bez zmyślonej liczby.
      */}
      <Reveal delay={0.12}>
        <div className="mx-auto mt-6 max-w-narrow rounded-lg border border-border-accent bg-accent-soft p-6">
          <p className="text-body text-fg">
            Biorę tylko tyle wdrożeń naraz, ile jestem w stanie zrobić dobrze. Po to, żeby każde dopilnować, a
            nie po to, żeby naciskać. Jak jest komplet, mówię wprost i umawiamy na kolejny miesiąc.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-9 flex max-w-narrow flex-col items-start gap-2">
          <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          <span className="text-caption text-fg-subtle">Bez zobowiązań. Sprawdzimy, czy w ogóle warto.</span>
        </div>
      </Reveal>
    </Section>
  );
}
