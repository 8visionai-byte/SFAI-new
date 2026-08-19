import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { Usluga } from '@/lib/uslugi/types';
import { dekorUslugi } from '@/lib/inf-kategorie';

/**
 * ServiceFAQ — SEKCJA 7 szablonu (5–6 pytań, answer-first).
 * Wzorzec 1:1 z home FAQ: natywne <details>/<summary> = odpowiedzi w HTML od
 * startu (bot widzi je bez JS), accordion działa bez JavaScriptu.
 *
 * KLUCZOWE (GEO + zakaz rozjazdu): renderowany tekst `odpowiedz` jest DOKŁADNIE
 * tym samym stringiem, który page.tsx wkłada do FAQPage JSON-LD (przez
 * uslugaSchemas). Jedno źródło = `usluga.faq`, więc rozjazd schema<->treść
 * jest niemożliwy.
 *
 * INFINITY v7 „NACZYNIA POŁĄCZONE" (audyt kart, partia H1): karta sekcji miała
 * ten sam .inf-card co hub, ale BEZ tonu (spadała na fallbackowy akcent) i BEZ
 * reflektora, więc na hubie świeciła kolorem kategorii, a na podstronie jednym
 * cyjanem i bez poświaty. Stąd `slug` w propsach: ton bierzemy z kategorii TEJ
 * usługi (lib/inf-kategorie), żeby cała podstrona miała jeden ton, a reflektor
 * .inf-spotlight wchodzi PIERWSZYM dzieckiem karty (wzorzec z app/uslugi).
 * `divide-y` zeszło na wewnętrzny wrapper — reflektor jest dzieckiem karty, więc
 * na liście dzielonej kreską dokładałby linię nad pierwszym pytaniem.
 */
export function ServiceFAQ({
  faq,
  slug,
  rodzic,
}: {
  faq: Usluga['faq'];
  slug: Usluga['slug'];
  /** Slug usługi macierzystej (podstrony) — ton dziedziczy się z rodziny. */
  rodzic?: string;
}) {
  const dekor = dekorUslugi(slug, rodzic);
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Najczęstsze pytania</h2>
        </Reveal>

        {/* INFINITY v5 (spec §4 — sekcja FAQ NA KARTĘ, treść 1:1): akordeon
            w ciemnej karcie .inf-card (narożniki + sweep z globals); wewnątrz
            wzorzec details/summary 1:1 z home FAQ. v7: ton karty = kolor
            kategorii usługi + reflektor jak na hubie. */}
        <div
          className="inf-card inf-card-top mt-8 p-6"
          style={
            {
              '--card-c': dekor.c,
              '--card-c-l': dekor.odcien ?? dekor.c,
            } as CSSProperties
          }
        >
          <div aria-hidden="true" className="inf-spotlight" />

          <div className="divide-y divide-border">
            {faq.map((item, i) => (
              <Reveal key={item.pytanie} delay={Math.min(i * 0.03, 0.15)}>
                <details className="sf-faq group py-2">
                  <summary className="-mx-2 flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm px-2 py-4 text-body font-semibold text-fg transition-colors duration-fast hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans !font-semibold !text-fg [text-wrap:wrap] group-open:!text-accent">{item.pytanie}</h3>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-fg-subtle transition-transform duration-base ease-out group-hover:scale-105 group-open:rotate-45 group-open:text-accent"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </summary>
                  <p className="pb-4 pr-9 text-body-sm text-fg-muted">{item.odpowiedz}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
