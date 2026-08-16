import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { FaqItem, RealizacjaKategoria } from '@/lib/realizacje/types';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * RealizacjaFAQ — SEKCJA 7 case'a (opcjonalna, 0–4 pytania, answer-first).
 * Wzorzec 1:1 z home/usługi FAQ: natywne <details>/<summary> = odpowiedzi w HTML
 * od startu (bot widzi je bez JS), accordion działa bez JavaScriptu.
 *
 * KLUCZOWE (GEO + zakaz rozjazdu): renderowany tekst `odpowiedz` jest DOKŁADNIE
 * tym samym stringiem, który page.tsx wkłada do FAQPage JSON-LD (przez
 * realizacjaSchemas). Jedno źródło = `realizacja.faq`, więc rozjazd schema<->treść
 * jest niemożliwy. Gdy case nie ma FAQ, page.tsx w ogóle nie renderuje tej sekcji.
 *
 * INFINITY v7 „NACZYNIA POŁĄCZONE" (audyt kart, partia H1): ta sama .inf-card co
 * na hubie /realizacje jechała bez tonu i bez reflektora. `kategoria` w propsach
 * daje kolor case'a z lib/inf-kategorie (jeden ton na całą podstronę), a
 * .inf-spotlight wchodzi PIERWSZYM dzieckiem karty. `divide-y` zeszło na
 * wewnętrzny wrapper — reflektor jako dziecko karty dokładałby kreskę nad
 * pierwszym pytaniem.
 */
export function RealizacjaFAQ({
  faq,
  kategoria,
}: {
  faq: FaqItem[];
  kategoria: RealizacjaKategoria;
}) {
  const dekor = INF_KATEGORIA[kategoria] ?? INF_KATEGORIA_DEFAULT;
  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Najczęstsze pytania</h2>
        </Reveal>

        {/* INFINITY v5 (spec §4 — FAQ NA KARTĘ, treść 1:1): akordeon w ciemnej
            karcie .inf-card — spójnie z ServiceFAQ usług. v7: ton karty = kolor
            kategorii case'a + reflektor jak na karcie huba. */}
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
                    <span className="group-open:text-accent">{item.pytanie}</span>
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
