import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { PostFaq } from '@/lib/blog/types';

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
 */
export function PostFAQ({ faq }: { faq: PostFaq[] }) {
  if (faq.length === 0) return null;

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Najczęstsze pytania</h2>
        </Reveal>

        <div className="mt-8 divide-y divide-border border-y border-border">
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
                    className="shrink-0 text-fg-subtle transition-transform duration-base ease-spring group-hover:scale-105 group-open:rotate-45 group-open:text-accent"
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
    </Section>
  );
}
