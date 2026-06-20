import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { DiagnozaForm } from '@/components/forms/DiagnozaForm';

/**
 * SEKCJA 11 — FINALNE CTA (spec 03 §11). Emocja: decyzja / domknięcie.
 * Multi-step formularz diagnozy (krok 1 łatwy) — JEDYNY cel wszystkich CTA na stronie.
 * Kotwica #diagnoza = cel HOME_CTA. Dowód z liczbą inny niż w hero.
 */
export function FinalneCTA() {
  return (
    <Section tone="subtle" id="diagnoza">
      <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2">
        {/* Lewa: domknięcie + dowód */}
        <div>
          <Reveal>
            {/* .text-metal — fallback --metal-fg = fiolet 6.81:1 na paper (AA). */}
            <h2 className="text-h2 text-metal">Gotowy zobaczyć, gdzie Twoja firma traci czas?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Umów bezpłatną diagnozę. 30 minut, konkretna lista tego, co da się u Ciebie zautomatyzować, i ile to
              oszczędza. Bez zobowiązań i bez sprzedażowego ciśnienia. Jak wyjdzie, że się nie opłaca, powiem to
              wprost.
            </p>
          </Reveal>

          {/*
            Dowód przy finalnym CTA — INPUT PAWŁA: trzecia, inna liczba/opinia niż wyżej
            (np. "X firm umówiło diagnozę w tym kwartale" albo case z liczbą z innej branży).
            Do czasu realnych danych — uczciwy sygnał oferty, BEZ widocznego [PLACEHOLDER].
          */}
          <Reveal delay={0.1}>
            <div className="card-aura mt-7 rounded-lg border border-border bg-surface p-5 shadow-xs">
              <p className="text-body-sm text-fg-muted">
                Diagnoza trwa 30 minut i nic nie kosztuje. Wychodzisz z konkretną listą tego, co da się u Ciebie
                zautomatyzować, nawet jeśli nic u nas nie zamówisz.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-6 space-y-2 text-body-sm text-fg-muted">
              <li className="flex items-center gap-2">
                <Dot /> Bez zobowiązań i bez umów na start.
              </li>
              <li className="flex items-center gap-2">
                <Dot /> Twoje dane zostają u nas, w UE.
              </li>
              <li className="flex items-center gap-2">
                <Dot /> Odpowiadam w kilka minut.
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Prawa: multi-step formularz (krok 1 łatwy) */}
        <Reveal delay={0.05}>
          <DiagnozaForm />
        </Reveal>
      </div>
    </Section>
  );
}

function Dot() {
  return <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />;
}
