import type { CSSProperties } from 'react';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { PostFaq } from '@/lib/blog/types';
import { INF_TYP } from '@/lib/inf-kategorie';

/**
 * PostFAQ — opcjonalna sekcja FAQ wpisu (answer-first). Wzorzec 1:1 z ServiceFAQ:
 * natywne <details>/<summary> = odpowiedzi w HTML od startu (bot widzi je bez JS),
 * accordion działa bez JavaScriptu.
 *
 * GEO + zakaz rozjazdu: renderowany tekst `odpowiedz` jest DOKŁADNIE tym samym
 * stringiem, który page.tsx wkłada do FAQPage JSON-LD (przez postSchemas). Jedno
 * źródło = `post.faq`, więc rozjazd schema <-> treść jest niemożliwy.
 *
 * Render tylko gdy są pytania (stuby fazy „silnik" zwykle nie mają jeszcze FAQ).
 *
 * INFINITY v7 (audyt „naczynia połączone"): karta FAQ szła bez --card-c i bez
 * reflektora, więc na podstronie zachowywała się inaczej niż ta sama karta na
 * hubie. Teraz bierze ton z INF_TYP (single source lib/inf-kategorie) i ma
 * .inf-spotlight jako PIERWSZE dziecko karty. `typ` rozdziela dwa konsumenty
 * tego samego komponentu: wpis bloga (fiolet) i poradnik (cyjan) — ten sam
 * kolor, co karta danego typu na liście. Lista pytań siedzi w osobnym dziecku,
 * bo `divide-y` liczy dzieci: reflektor przed nią dorysowałby kreskę nad
 * pierwszym pytaniem.
 */
export function PostFAQ({
  faq,
  typ = 'wpis',
}: {
  faq: PostFaq[];
  typ?: 'wpis' | 'poradnik';
}) {
  if (faq.length === 0) return null;

  const dekor = INF_TYP[typ];

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Najczęstsze pytania</h2>
        </Reveal>

        {/* INFINITY v5 (spec §4 — FAQ NA KARTĘ, treść 1:1): akordeon w ciemnej
            karcie .inf-card — spójnie z ServiceFAQ usług.
            v7: ton karty z rejestru typów + reflektor jako pierwsze dziecko. */}
        <div
          className="inf-card inf-card-top mt-8 p-6"
          style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties}
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
