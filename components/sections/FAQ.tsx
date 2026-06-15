import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';
import { FAQ_ITEMS } from './faqData';

/**
 * SEKCJA 9 — FAQ (spec 03 §9). Emocja: zaufanie + ulga. Money queries dla GEO.
 * Natywne <details>/<summary> = treść w HTML od startu (bot widzi odpowiedzi bez JS),
 * accordion działa bez JavaScriptu. Tekst 1:1 z FAQPage JSON-LD (page.tsx).
 */
export function FAQ() {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Najczęstsze pytania, zanim podejmiesz decyzję</h2>
        </Reveal>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
              <details className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-h3 font-medium text-fg [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring">
                  <span>{item.q}</span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-accent transition-transform duration-base group-open:rotate-45"
                  >
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="pb-4 pr-9 text-body-sm text-fg-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        {/*
          DOWÓD przy CTA (north star #5). Uczciwy sygnał oferty zamiast zmyślonej liczby.
          INPUT PAWŁA: jeśli będzie realna metryka (np. czas odpowiedzi), wstawić ją tu.
        */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start gap-2">
            <Button variant="primary" href={HOME_CTA.href}>
              Mam inne pytanie, umów rozmowę
            </Button>
            <span className="text-caption text-fg-subtle">
              Odpowiadam konkretnie, nie ogólnikami. Na diagnozie pokażę dane z podobnej firmy.
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
