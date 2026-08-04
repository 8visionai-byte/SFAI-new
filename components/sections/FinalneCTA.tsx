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
    /* Fizyczny koniec strony i jedyny cel konwersji: ostatni szew rozdziału +
       czwarte (ostatnie) miejsce gradientu marki na stronie (.surface-aurora). */
    <Section tone="subtle" space="lg" seam id="diagnoza" className="surface-aurora">
      {/* Formularz dostaje pewną szerokość 432px zamiast połowy ekranu. */}
      <div className="mx-auto grid max-w-container gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-20">
        {/* Lewa: domknięcie + dowód */}
        <div>
          <Reveal>
            <h2 className="text-h2">Gotowy zobaczyć, gdzie Twoja firma traci czas?</h2>
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
            <div className="mt-8 border-t border-border pt-5">
              <p className="text-body text-fg-muted">
                Diagnoza trwa 30 minut i nic nie kosztuje. Wychodzisz z konkretną listą tego, co da się u Ciebie
                zautomatyzować, nawet jeśli nic u nas nie zamówisz.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-6 space-y-3 text-body-sm text-fg-muted">
              <li className="flex items-center gap-2">
                <Check /> Bez zobowiązań i bez umów na start.
              </li>
              <li className="flex items-center gap-2">
                <Check /> Twoje dane zostają u nas, w UE.
              </li>
              <li className="flex items-center gap-2">
                <Check /> Odpowiadam w kilka minut.
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

/** Ptaszek = potwierdzenie. Kropka przed punktem listy czytała się jak bullet z Worda.
    Ta sama ścieżka co trzeci filar PasekZaufania (jeden zestaw glifów na stronie). */
function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-accent">
      <path d="M5 12l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
