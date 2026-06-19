import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { DiagnozaForm } from '@/components/forms/DiagnozaForm';

/**
 * STRONA /kontakt — SSG (force-static). Realny cel wszystkich CTA "diagnozy" i
 * link „Kontakt" ze stopki (wcześniej 404). Treść w surowym HTML (KPI #1).
 *
 * Konwersja: ten sam multi-step formularz diagnozy co na home (DiagnozaForm),
 * obok NAP (e-mail, telefon, godziny) dla osób, które wolą napisać/zadzwonić.
 */
export const dynamic = 'force-static';

const PATH = '/kontakt';

export const metadata: Metadata = buildMetadata({
  title: 'Kontakt: umów bezpłatną diagnozę AI',
  description:
    'Skontaktuj się z SimpleFast.ai. Umów bezpłatną diagnozę: 30 minut, konkretna lista tego, co da się u Ciebie zautomatyzować. Napisz na e-mail, zadzwoń albo wypełnij formularz.',
  path: PATH,
});

export default function KontaktPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Kontakt', path: PATH },
        ])}
      />

      <Section tone="base">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2">
          {/* Lewa: zaproszenie + NAP */}
          <div>
            <Reveal>
              <p className="text-overline uppercase tracking-[0.12em] text-accent">Kontakt</p>
              <h1 className="text-h1 mt-2">Zacznijmy od bezpłatnej diagnozy</h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lead mt-5 text-fg-muted">
                30 minut rozmowy i wychodzisz z konkretną listą tego, co da się u Ciebie zautomatyzować,
                oraz ile to realnie oszczędza. Bez zobowiązań i bez sprzedażowego ciśnienia. Jak wyjdzie,
                że się nie opłaca, powiem to wprost.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 space-y-4">
                {SITE.contact.emailVerified && SITE.contact.email && (
                  <div>
                    <dt className="text-caption uppercase tracking-[0.08em] text-fg-subtle">E-mail</dt>
                    <dd className="mt-1 text-body text-fg">
                      <a
                        href={`mailto:${SITE.contact.email}`}
                        className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
                      >
                        {SITE.contact.email}
                      </a>
                    </dd>
                  </div>
                )}
                {SITE.contact.phone && (
                  <div>
                    <dt className="text-caption uppercase tracking-[0.08em] text-fg-subtle">Telefon</dt>
                    <dd className="mt-1 text-body text-fg">
                      <a
                        href={`tel:${SITE.contact.phone}`}
                        className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
                      >
                        {SITE.contact.phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-caption uppercase tracking-[0.08em] text-fg-subtle">Godziny</dt>
                  <dd className="mt-1 text-body text-fg">{SITE.contact.hours}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-[0.08em] text-fg-subtle">Zasięg</dt>
                  <dd className="mt-1 text-body text-fg">Obsługujemy całą Polskę. Twoje dane zostają w UE.</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Prawa: multi-step formularz diagnozy */}
          <Reveal delay={0.05}>
            <DiagnozaForm />
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
