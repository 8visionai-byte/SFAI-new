import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { REALIZACJE } from '@/lib/realizacje';

import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { RealizacjaCard } from '@/components/realizacje';
import { HOME_CTA } from '@/lib/site';

/**
 * HUB /realizacje — lista case studies, SSG (force-static).
 *
 * KPI #1: pełna treść (kapsuły answer-first, metryki-dowody, anchory linków) jest
 * w HTML przy 1. żądaniu. Kafelki to Server Components; framer-motion (Reveal,
 * MagneticButton) działa wewnątrz wysp klienta i TYLKO wzbogaca.
 *
 * Źródło prawdy listy = rejestr lib/realizacje (REALIZACJE). Każdy kafelek linkuje
 * do /realizacje/<slug> (SSG). Zero zmyślonych realizacji — tylko realne wdrożenia.
 *
 * UWAGA (sitemap): trasa /realizacje ma w ROUTES `live: false`. Strona ISTNIEJE
 * (200 OK, SSG), ale do sitemap.xml wejdzie po świadomym flipie `live: true` w
 * lib/site.ts (gdy treść zaakceptowana). To celowe: "gotowa" vs "ogłoszona botom".
 */
export const dynamic = 'force-static';

export const metadata: Metadata = buildMetadata({
  title: 'Realizacje: wdrożenia AI dla firm',
  description:
    'Realne wdrożenia AI SimpleFast.ai: auto-email obsługi klienta (75% gotowych maili), generator leadów (1000 rekordów w 40 minut), chatboty i Agenci AI 24/7.',
  path: '/realizacje',
});

export default function RealizacjePage() {
  return (
    <main id="main">
      {/* Hero hubu — answer-first, co tu znajdziesz */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h1 className="text-display">Realizacje</h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Tu pokazujemy, co realnie zbudowaliśmy i co to dało. Każde wdrożenie
              to konkretny problem firmy, konkretne rozwiązanie i efekt z liczbą.
              Bez okrągłych słów. Najpierw wynik, potem rozmowa.
            </p>
          </Reveal>
        </div>

        {/* Siatka kafelków z hover preview (mobile-first: 1 -> 2 -> 3 kolumny) */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REALIZACJE.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={Math.min(i * 0.05, 0.2)} className="h-full">
              {/* RealizacjaCard renderuje własne <li>? Nie — tu owijamy w Reveal-li,
                  więc używamy wariantu bez zewnętrznego <li>. */}
              <RealizacjaCard realizacja={r} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* CTA domykające (strefa dark), wspólny flow diagnozy */}
      <Section tone="base" theme="dark" id="diagnoza">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Chcesz podobny efekt u siebie?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
              {HOME_CTA.microcopy}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
                {HOME_CTA.label}
              </MagneticButton>
              <span className="text-caption max-w-[60ch] text-fg-subtle">
                Bezpłatna diagnoza. Najpierw liczby, potem decyzja.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        BreadcrumbList JSON-LD (Strona główna -> Realizacje), serwerowo w HTML.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Realizacje', path: '/realizacje' },
        ])}
      />
      {/* Kanoniczny URL listy = absolutny (spójność z metadata). */}
      <link rel="canonical" href={`${SITE.url}/realizacje`} />
    </main>
  );
}
