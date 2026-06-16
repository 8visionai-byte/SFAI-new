import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE, HOME_CTA } from '@/lib/site';
import { Section, Badge, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi/Breadcrumbs';
import { MaterialCard, MaterialCardWkrotce } from '@/components/materialy';
import { MATERIALY, MATERIALY_WKROTCE } from '@/lib/materialy';

/**
 * HUB /materialy — SSG (force-static). Dział „Materiały do pobrania" Centrum Wiedzy AI.
 * Answer-first: kapsuła (co tu jest) + siatka kart magnetów (z rejestru lib/materialy)
 * + sekcja „wkrótce" (magnety zaplanowane bez trasy) + CTA domykające (#diagnoza).
 *
 * KPI #1 (cytowalność): kapsuła i karty w HTML przy 1. żądaniu. Reveal/MagneticButton
 * to wyspy klienta i tylko wzbogacają. Każda karta linkuje do /materialy/<slug> (SSG).
 * Źródło prawdy listy = rejestr lib/materialy -> zero martwych linków.
 *
 * SITEMAP/NAV: trasę /materialy ustawia integrator w lib/site.ts (ROUTES). Pojedyncze
 * /materialy/<slug> wchodzą do sitemapy z rejestru (MATERIALY_SLUGS), jak blog/uslugi.
 * Breadcrumb wiedzie przez hub /wiedza (materiały to dział Centrum Wiedzy).
 */
export const dynamic = 'force-static';

const PATH = '/materialy';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Darmowe materiały AI dla firm: prompty, checklisty',
  description:
    'Darmowe materiały AI dla firm: gotowe zestawy promptów, checklisty procesów do automatyzacji i arkusze kosztów. Czytasz całość na stronie, pobierasz na maila albo w PDF.',
  path: PATH,
});

export default function MaterialyHubPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO HUBU — answer-first: co tu znajdziesz, jedna obietnica. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Centrum Wiedzy', href: '/wiedza' },
              { name: 'Materiały' },
            ]}
          />

          <Reveal>
            <Badge variant="accent" className="mt-6">
              Darmowe do pobrania
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">
              Materiały do pobrania: prompty, checklisty i arkusze AI dla firm
            </h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Gotowe materiały AI dla firm: zestawy promptów, checklisty procesów do
              automatyzacji i arkusze do liczenia kosztów. Każdy materiał czytasz w
              całości na stronie, za darmo i bez zapisu, a pobierasz na maila albo jako
              PDF. Realna, użyteczna treść, nie zajawka.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-body text-fg-muted">
              Każdy materiał rozwiązuje jeden konkretny problem właściciela firmy: co
              wpisać do AI, co zautomatyzować najpierw i ile naprawdę kosztuje ręczna
              robota. Bierzesz to, czego potrzebujesz dziś.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) SIATKA MAGNETÓW — z rejestru, posortowane po dacie. */}
      <Section tone="subtle">
        <div className="mx-auto mb-8 max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Co możesz pobrać już teraz?</h2>
          </Reveal>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MATERIALY.map((material, i) => (
            <Reveal as="li" key={material.slug} delay={Math.min(i * 0.04, 0.2)} className="h-full">
              <MaterialCard material={material} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) WKRÓTCE — magnety zaplanowane bez trasy (zero martwych linków). */}
      {MATERIALY_WKROTCE.length > 0 && (
        <Section tone="base">
          <div className="mx-auto max-w-narrow">
            <Reveal>
              <h2 className="text-h2">W przygotowaniu</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lead mt-4 text-fg-muted">
                Kolejne materiały, nad którymi pracujemy. Wracaj, dopisujemy je na bieżąco.
              </p>
            </Reveal>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MATERIALY_WKROTCE.map((temat, i) => (
              <Reveal as="li" key={temat.tytul} delay={Math.min(i * 0.04, 0.2)}>
                <MaterialCardWkrotce temat={temat} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* ───────────────────────────────────────────────────────────────
          (4) CTA DOMYKAJĄCE — jedno główne, wspólny flow diagnozy (strefa dark). */}
      <Section tone="base" theme="dark" id="diagnoza">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">
              Materiał to dobry start. System, który robi to za Ciebie, to coś więcej.
            </h2>
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
                AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* BreadcrumbList JSON-LD (Strona główna -> Centrum Wiedzy -> Materiały), serwerowo. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Centrum Wiedzy', path: '/wiedza' },
          { name: 'Materiały', path: PATH },
        ])}
      />
      <link rel="canonical" href={CANONICAL} />
    </main>
  );
}
