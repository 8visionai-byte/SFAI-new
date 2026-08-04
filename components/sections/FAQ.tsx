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
    <Section tone="base" space="md">
      {/* Dwie kolumny: nagłówek zostaje przy krawędzi i jedzie z treścią (sticky),
          pytania dostają pełną kolumnę zamiast wąskiego słupka w środku 1200px.
          H2 jest PIERWSZYM elementem w DOM — kolejność nagłówków i FAQPage JSON-LD
          bez zmian. */}
      <div className="mx-auto grid max-w-wide gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-20">
        <Reveal variant="header">
          <h2 className="text-h2 lg:sticky lg:top-28">Najczęstsze pytania, zanim podejmiesz decyzję</h2>
        </Reveal>

        <div>
          {/* Jeden obserwator na kontenerze (.sf-stagger) zamiast <Reveal> wokół
              każdego <details>. Klasa .sf-faq dokłada natywną animację wysokości
              (::details-content + interpolate-size) i kreskę otwarcia. */}
          <div className="sf-stagger divide-y divide-border border-y border-border">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="sf-faq group py-2">
                <summary className="-mx-2 flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm px-2 py-4 text-body font-semibold text-fg transition-colors duration-fast hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
                  <span className="group-open:text-accent">{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-fg-subtle transition-transform duration-base ease-out group-hover:scale-105 group-open:rotate-45 group-open:text-accent"
                  >
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="pb-4 pr-9 text-body-sm text-fg-muted">{item.a}</p>
              </details>
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
      </div>
    </Section>
  );
}
