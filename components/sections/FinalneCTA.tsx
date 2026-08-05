import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { DiagnozaForm } from '@/components/forms/DiagnozaForm';

/**
 * SEKCJA 11 — FINALNE CTA (spec 03 §11). Emocja: decyzja / domknięcie.
 * Multi-step formularz diagnozy (krok 1 łatwy) — JEDYNY cel wszystkich CTA na stronie.
 * Kotwica #diagnoza = cel linków "#diagnoza" (np. Rozwiazanie).
 *
 * ŚWIAT B (makieta 5-final): minimalistyczne domknięcie — cienka świetlista
 * trasa (.sf-route, fundament partii A) przez CAŁĄ szerokość z punktem końcowym,
 * wielki nagłówek centralnie (ISTNIEJĄCY tekst H2, nie kopia z makiety), jeden
 * primary CTA (pill) i drobny caption. WSZYSTKIE dotychczasowe elementy
 * funkcjonalne zostają: lead, trzy potwierdzenia (jako caption pod CTA), dowód
 * przy CTA (jako wprowadzenie do formularza) i DiagnozaForm (ciemne inputy
 * przychodzą z tokenów). CTA-pill kieruje kotwicą na formularz niżej.
 */
export function FinalneCTA() {
  return (
    /* Fizyczny koniec strony i jedyny cel konwersji: ostatni szew rozdziału +
       gradientowa poświata .surface-aurora (na ciemnym tle działa na tokenach). */
    <Section tone="subtle" space="lg" seam id="diagnoza" className="surface-aurora overflow-x-clip">
      {/* Trasa przez całą szerokość viewportu, w osi nagłówka, z punktem
          końcowym po prawej (dekoracja aria-hidden, jak w makiecie). */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 hidden w-screen -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <div className="sf-route h-px w-full" />
          <span className="absolute right-[5%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent-decor shadow-accent" />
        </div>
        <Reveal variant="header">
          {/* Skala h1 CELOWO: akt finalny to najgłośniejszy moment strony
              (makieta 5) — semantyka zostaje h2 (jedno h1 na stronę). */}
          <h2 className="text-h1 relative mx-auto max-w-[22ch] text-center">
            Gotowy zobaczyć, gdzie Twoja firma traci czas?
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <p className="text-lead mx-auto mt-6 max-w-measure-lead text-center text-fg-muted">
          Umów bezpłatną diagnozę. 30 minut, konkretna lista tego, co da się u Ciebie zautomatyzować, i ile to
          oszczędza. Bez zobowiązań i bez sprzedażowego ciśnienia. Jak wyjdzie, że się nie opłaca, powiem to
          wprost.
        </p>
      </Reveal>

      {/* Jeden primary CTA (pill) — kotwica na formularz poniżej. */}
      <Reveal delay={0.08}>
        <div className="mt-9 flex justify-center">
          <MagneticButton variant="primary" size="lg" href="#diagnoza-formularz">
            Umów bezpłatną diagnozę
          </MagneticButton>
        </div>
      </Reveal>

      {/* Caption: trzy dotychczasowe potwierdzenia (teksty 1:1) w jednej,
          drobnej linii pod CTA. */}
      <Reveal delay={0.1}>
        <ul className="mx-auto mt-5 flex max-w-wide flex-wrap items-center justify-center gap-x-7 gap-y-2 text-caption text-fg-subtle">
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

      {/*
        Dowód przy finalnym CTA — INPUT PAWŁA: trzecia, inna liczba/opinia niż wyżej
        (np. "X firm umówiło diagnozę w tym kwartale" albo case z liczbą z innej branży).
        Do czasu realnych danych — uczciwy sygnał oferty, BEZ widocznego [PLACEHOLDER].
        Tu pełni rolę wprowadzenia do formularza.
      */}
      <Reveal delay={0.12}>
        <p className="mx-auto mt-14 max-w-measure text-center text-body-sm text-fg-muted">
          Diagnoza trwa 30 minut i nic nie kosztuje. Wychodzisz z konkretną listą tego, co da się u Ciebie
          zautomatyzować, nawet jeśli nic u nas nie zamówisz.
        </p>
      </Reveal>

      {/* Multi-step formularz (krok 1 łatwy) — pewna szerokość 432px, centralnie. */}
      <Reveal delay={0.05}>
        <div id="diagnoza-formularz" className="mx-auto mt-8 w-full max-w-[27rem]">
          <DiagnozaForm />
        </div>
      </Reveal>
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
