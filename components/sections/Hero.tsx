import { Section, MagneticButton, Badge } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
// import { AnimatedMetric } from '@/components/motion/AnimatedMetric'; // wróci z realnymi metrykami
import { POSITIONING, HOME_CTA } from '@/lib/site';
import { HeroPersonaCycler } from './HeroPersonaCycler';

/**
 * SEKCJA 1 — HERO (spec 03 §1). Emocja: ulga + kompetencja.
 * Kapsuła answer-first w surowym HTML tuż pod H1 = cytat dla LLM.
 * Jeden H1, jedno CTA (magnetyczne).
 *
 * METRYKI i DOWÓD przy CTA są CELOWO wyłączone do czasu realnych danych.
 * Zasada (north star #5, #13): zero zmyślonych liczb — red team rozwali w 30 s.
 * Lepszy pusty slot niż atrapa liczby. INPUT PAWŁA poniżej.
 */

// METRYKI hero — WYŁĄCZONE: poprzednie wartości (23 / 140 h / 7 dni) były atrapami.
// INPUT PAWŁA: wstawić realne, weryfikowalne liczby z wdrożeń i odkomentować render
// bloku <dl> niżej (oraz import AnimatedMetric, jeśli ma być count-up).
// const METRICS = [
//   { value: '...', label: 'wdrożeń AI postawionych' },
//   { value: '... h', label: 'godzin miesięcznie zdjętych z zespołów' },
//   { value: '... dni', label: 'średni czas od rozmowy do działającego Agenta' },
// ] as const;

export function Hero() {
  return (
    <Section tone="base" containerWidth="default" className="text-center">
      <Reveal>
        <Badge variant="accent" className="mb-5">
          {POSITIONING.subClaim}
        </Badge>
      </Reveal>

      {/* H1 — rezultat dla klienta, bez bólu */}
      <Reveal delay={0.05}>
        <h1 className="text-display mx-auto max-w-[16ch]">
          Odzyskaj czas, który zżera powtarzalna robota.
          <br className="hidden sm:block" /> Bezpiecznie i pod Twoją kontrolą.
        </h1>
      </Reveal>

      {/* Kapsuła answer-first — surowy HTML, cytat dla LLM */}
      <Reveal delay={0.1}>
        <p className="text-lead mx-auto mt-6 max-w-measure text-fg-muted">
          Budujemy AI Agentów dla polskich firm, którzy realnie wykonują pracę: odbierają telefony,
          odpisują klientom, umawiają spotkania i pilnują faktur. Nie chatboty, które tylko gadają.
          Twoje dane zostają w Unii Europejskiej, zaczynasz od małego kroku, a płacisz za efekt, nie za obietnice.
        </p>
      </Reveal>

      {/* Dynamiczny odbiorca (personalizacja językiem, RODO-safe) */}
      <Reveal delay={0.15}>
        <div className="mx-auto mt-7 max-w-narrow rounded-lg border border-border bg-surface px-5 py-4 text-left shadow-xs">
          <p className="text-caption text-fg-subtle">
            Powtarzalna robota wygląda inaczej w każdej branży. Pokaż mi swoją.
          </p>
          <p className="mt-1 text-body text-fg-muted">
            …dla <HeroPersonaCycler />.
          </p>
        </div>
      </Reveal>

      {/*
        METRYKI hero — WYŁĄCZONE do czasu realnych liczb (patrz komentarz przy METRICS).
        INPUT PAWŁA: odkomentować blok i wstawić realne, weryfikowalne metryki.
        <Reveal delay={0.2}>
          <dl className="mx-auto mt-9 grid max-w-narrow grid-cols-1 gap-6 sm:grid-cols-3">
            {METRICS.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <AnimatedMetric value={m.value} className="text-metric block font-display font-semibold tabular-nums text-brand" />
                  <span className="mt-1 block text-caption text-fg-subtle">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      */}

      {/* CTA główne + mikrokopia */}
      <Reveal delay={0.2}>
        <div className="mt-9 flex flex-col items-center gap-3">
          <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          <span className="text-caption max-w-[44ch] text-fg-subtle">{HOME_CTA.microcopy}</span>

          {/*
            DOWÓD przy CTA — usunięto zmyśloną referencję "−40%, Anna K." (niefalsyfikowalna,
            łamała north star #5/#13 i miała em-dash). INPUT PAWŁA: wstawić JEDEN realny
            dowód: case z liczbą + imię + firma (za zgodą klienta) ALBO jedną prawdziwą
            liczbę operacyjną (np. "voicebot obsłużył X połączeń w miesiącu").
          */}
        </div>
      </Reveal>

      {/* Linki drugorzędne — NIE konkurują z CTA */}
      <Reveal delay={0.3}>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-caption text-fg-subtle">
          <a href="#problem" className="underline decoration-1 underline-offset-2 hover:text-fg">
            Zobacz, jak liczę oszczędność →
          </a>
          <a href="#demo" className="underline decoration-1 underline-offset-2 hover:text-fg">
            Zobacz, jak rozmawia nasz Agent →
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
