import { Section, MagneticButton, Card, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';

/**
 * SEKCJA 5 — DOWÓD: case z konkretną liczbą (spec 03 §5). Emocja: zaufanie.
 * Zasada: nazwa + twarz + firma + liczba + czas. Case bez liczby nie istnieje.
 *
 * ZASADA: ŻADNYCH widocznych [PLACEHOLDER] w renderowanej treści (LLM cytuje je jako
 * fakt). Dopóki nie ma realnego case'a, CASE jest null i renderujemy WYŁĄCZNIE uczciwy
 * blok "pierwsze wdrożenia". Lepszy uczciwy stan niż szkielet z atrapami.
 *
 * INPUT PAWŁA: pierwszy realny case (branża, problem, co wdrożono, wynik z liczbą,
 * czas, cytat + imię/rola/firma, zdjęcie za zgodą) -> wypełnić obiekt CASE, a render
 * automatycznie pokaże kartę case study obok bloku uczciwego.
 */
type CaseStudy = {
  rows: ReadonlyArray<readonly [string, string]>;
  quote: string;
  author: string;
};

// null = brak realnego case'a (stan na ship). NIE renderujemy szkieletu z atrapami.
const CASE: CaseStudy | null = null;

export function Dowod() {
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Co konkretnie zmienia się w firmie po wdrożeniu Agenta?</h2>
        </Reveal>
        {/* Kapsuła answer-first — uczciwa, bez zmyślonego case'a (INPUT PAWŁA na realny). */}
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Po wdrożeniu Agenta firma przestaje gubić telefony i powtarzać tę samą robotę. Voicebot odbiera, gdy
            Ty nie możesz, chatbot odpowiada klientom o każdej porze, a dane same przechodzą między systemami.
            Twarde liczby z konkretnych wdrożeń publikujemy tutaj, gdy klient da zielone światło.
          </p>
        </Reveal>
      </div>

      <div className={`mx-auto mt-8 grid max-w-narrow gap-6 ${CASE ? 'md:grid-cols-2' : ''}`}>
        {/* Karta case study — TYLKO gdy jest realny case (CASE !== null). */}
        {CASE && (
          <Reveal>
            <Card variant="interactive" as="article" className="h-full">
              <Badge variant="neutral" className="mb-4">
                Case study
              </Badge>
              <dl className="space-y-3">
                {CASE.rows.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-caption uppercase tracking-[0.06em] text-fg-subtle">{k}</dt>
                    <dd className="text-body-sm text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-t border-border pt-4 text-body-sm italic text-fg-muted">
                „{CASE.quote}” — {CASE.author}
              </p>
            </Card>
          </Reveal>
        )}

        {/* Uczciwy stan: pierwsze wdrożenia (zawsze) */}
        <Reveal delay={0.05}>
          <Card as="article" className="h-full">
            <h3 className="text-h3">Pierwsze wdrożenia mówią same za siebie.</h3>
            <p className="mt-3 text-body-sm text-fg-muted">
              Zbieramy twarde liczby z bieżących wdrożeń i publikujemy je tutaj, gdy tylko klient da zielone
              światło. Chcesz zobaczyć, jak to liczymy? Umów diagnozę, pokażę dane z podobnej firmy na rozmowie.
            </p>
            <p className="mt-4 text-caption text-fg-subtle">
              Nie wstawiamy zmyślonych liczb. To kwestia zasad.
            </p>
          </Card>
        </Reveal>
      </div>

      {/* CTA. INPUT PAWŁA: dowód z realną liczbą inny niż w hero (np. połączenia/mc). */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-9 flex max-w-narrow flex-col items-start gap-3">
          <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          <p className="text-body-sm text-fg-muted">
            Na diagnozie pokażę Ci liczby z podobnej firmy. Konkret, nie ogólniki.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
