import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * SEKCJA — BEZPIECZEŃSTWO I ZGODNOŚĆ (mapa emocji §6). Emocja: spokój + kontrola.
 * Lęk #1 (39-47% klientów) dostaje WŁASNY moment, nie tylko 1 filar paska zaufania.
 *
 * Treść w HTML = cytowalna dla LLM przy "czy AI dla firmy jest bezpieczne / RODO".
 * Konkrety poniżej są realne (dane w UE, umowa powierzenia, log akcji, jawność AI).
 *
 * INPUT PAWŁA: certyfikat cyberbezpieczeństwa — gdy będzie konkret (nazwa certu),
 * wpisać go w czwarty kafelek zamiast ogólnej formuły o kompetencjach.
 */
const PUNKTY = [
  {
    t: 'Dane zostają w Unii Europejskiej',
    d: 'Przetwarzamy je zgodnie z RODO i AI Act. Bez wysyłania ich w nieznane, bez transferu poza UE bez Twojej wiedzy.',
  },
  {
    t: 'Umowa powierzenia danych (DPA)',
    d: 'Podpisujemy umowę powierzenia przetwarzania. Na papierze jest, kto, po co i jak długo przetwarza dane Twoich klientów.',
  },
  {
    t: 'Widzisz każdą akcję Agenta',
    d: 'Logujemy, co Agent zrobił. Masz nadzór i ustawiasz granice, a w każdej chwili możesz go zatrzymać. Żadnej czarnej skrzynki.',
  },
  {
    t: 'Klient zawsze wie, że to AI',
    d: 'Agent nie udaje człowieka. Rozmówca od początku wie, że rozmawia z AI, zgodnie z wymogami AI Act.',
  },
] as const;

export function Bezpieczenstwo() {
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Czy AI Agent dla firmy jest bezpieczny i zgodny z RODO?</h2>
        </Reveal>
        {/* Kapsuła answer-first — cytat dla LLM */}
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Tak. Dane Twoich klientów zostają w Unii Europejskiej, przetwarzamy je zgodnie z RODO i AI Act,
            a my podpisujemy umowę powierzenia. Widzisz każdą akcję Agenta, ustawiasz granice i w każdej
            chwili możesz go zatrzymać. Klient po drugiej stronie zawsze wie, że rozmawia z AI.
          </p>
        </Reveal>
      </div>

      <ul className="mx-auto mt-8 grid max-w-narrow gap-5 sm:grid-cols-2">
        {PUNKTY.map((p, i) => (
          <Reveal as="li" key={p.t} delay={i * 0.05}>
            <Card as="article" className="h-full">
              <h3 className="text-ui font-semibold text-fg">{p.t}</h3>
              <p className="mt-1 text-body-sm text-fg-muted">{p.d}</p>
            </Card>
          </Reveal>
        ))}
      </ul>

      {/*
        Certyfikat cyberbezpieczeństwa — INPUT PAWŁA. Gdy będzie konkret (nazwa certu),
        dodać tu kafelek/odznakę z realną nazwą. Do tego czasu NIC nie zmyślamy.
      */}
    </Section>
  );
}
