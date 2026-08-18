import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { CSSProperties } from 'react';
import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section, MagneticButton } from '@/components/ui';
import { INF_TYP, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi/Breadcrumbs';
import { PostMeta } from '@/components/blog/PostMeta';
import { MaterialBody, MaterialFAQ, PobierzMagnet } from '@/components/materialy';
import { LinkiKrzyzowe } from '@/components/poradniki/LinkiKrzyzowe';
import { MATERIALY_SLUGS, getMaterialBySlug } from '@/lib/materialy';
import { materialSchemas } from '@/lib/materialy/schema';
import { HOME_CTA } from '@/lib/site';

/**
 * DYNAMICZNA TRASA LEAD MAGNETÓW — jeden szablon, N magnetów, SSG.
 *
 * SILNIK (1 trasa + dane z lib/materialy + komponenty z components/materialy):
 *  - generateStaticParams() bierze slugi z rejestru -> Next prerenderuje każdy magnet
 *    statycznie (KPI #1: PEŁNA treść w HTML przy 1. żądaniu, cytowalna, użyteczna bez JS).
 *  - dynamicParams=false: slug spoza rejestru = 404 (sitemap bez martwych URL).
 *  - generateMetadata() buduje title/description/canonical/OG per magnet.
 *  - render: hero answer-first (breadcrumb przez /wiedza + opis = kapsuła) + pełna treść
 *    (bloki) + przycisk pobrania STUB (PobierzMagnet) + opcjonalne FAQ; JSON-LD Article +
 *    BreadcrumbList (+ FAQPage gdy są pytania) WSTRZYKNIĘTE SERWEROWO.
 *
 * Pobranie PDF/mail = STUB (TODO Make/PDF, patrz PobierzMagnet). Pełna treść jest na
 * stronie ZA DARMO bez zapisu — PDF to bonus, nie bramka (zgodnie z briefem).
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = { slug: string };

/** SSG: lista slugów z rejestru = zbiór magnetów do prerenderu. */
export function generateStaticParams(): Params[] {
  return MATERIALY_SLUGS.map((slug) => ({ slug }));
}

/** Metadata per magnet: title z marką (template w layout), opis, canonical, OG. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) {
    return buildMetadata({
      title: 'Nie znaleziono materiału',
      description:
        'Ten materiał nie istnieje. Sprawdź listę darmowych materiałów AI dla firm w SimpleFast.ai.',
      path: `/materialy/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: material.metaTitle,
    description: material.metaDescription,
    path: `/materialy/${material.slug}`,
    // ogImage per magnet wejdzie, gdy SITE.assetsReady i pliki będą istnieć:
    // ogImage: `/og/materialy/${material.slug}.png`,
  });
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) notFound();

  // Komplet JSON-LD z jednego źródła (material) — tekst FAQ 1:1 z sekcją MaterialFAQ.
  const { article, breadcrumb, faq } = materialSchemas(material);

  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          HERO — breadcrumb (przez /wiedza) + etykieta/typ + H1 + opis (kapsuła) + daty.
          INFINITY v5 (spec §4 — hero/meta w języku inf, treść 1:1):
          tone="transparent" (globalne tło prześwituje), badge'e → kafelek
          .inf-tile z ikoną SVG typu treści + mono .inf-tagi (istniejące pola
          etykieta/typPliku, jak karty listy). */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Centrum Wiedzy', href: '/wiedza' },
              { name: 'Materiały', href: '/materialy' },
              { name: material.tytul },
            ]}
          />

          <Reveal>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* Kafelek ikony typu treści — dekoracja aria-hidden (jak karty). */}
              <span
                aria-hidden="true"
                className="inf-tile"
                style={{ '--tile-c': INF_TYP.material.c } as CSSProperties}
              >
                <InfIcon name={INF_TYP.material.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
              </span>
              <span className="inf-tag">{material.etykieta}</span>
              <span
                className="inf-tag"
                style={{ color: INF_TYP.material.odcien ?? INF_TYP.material.c }}
              >
                {material.typPliku}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">{material.tytul}</h1>
          </Reveal>

          {/* Opis answer-first — surowy HTML, cytat dla LLM (2–3 zdania). */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">{material.opis}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <PostMeta
              data={material.data}
              dataAktualizacji={material.dataAktualizacji}
              className="mt-6 flex flex-wrap items-center gap-x-1 gap-y-1"
            />
          </Reveal>

          {/* Przycisk pobrania (STUB) tuż pod kapsułą — od razu widoczny CTA materiału. */}
          <Reveal delay={0.2}>
            <div className="mt-8">
              <PobierzMagnet
                materialSlug={material.slug}
                tytul={material.tytul}
                cta={material.ctaPobierz}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          v22 (PLAN-v22 §2.3 pkt 2) — PO CO TO POBIERAĆ.
          `material.zacheta` istnieje w rejestrze od początku, ale renderowała
          się WYŁĄCZNIE na karcie huba: czytelnik, który wszedł tu z Google
          prosto na podstronę, nigdy jej nie widział. Jedno zdanie, które mówi
          wprost, jaki problem ten materiał rozwiązuje, trafia teraz nad treść.
          ZERO nowej treści: to ten sam string, co na kafelku listy. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <div
              className="inf-card inf-card-quiet p-6 md:p-7"
              style={
                {
                  '--card-c': INF_TYP.material.c,
                  '--card-c-l': INF_TYP.material.odcien ?? INF_TYP.material.c,
                } as CSSProperties
              }
            >
              <div aria-hidden="true" className="inf-spotlight" />
              <h2 className="text-h2">Po co to pobierać?</h2>
              <p className="mt-4 text-body text-fg-muted">{material.zacheta}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          PEŁNA TREŚĆ MAGNETU — bloki renderowane serwerowo (cała wartość w HTML). */}
      <MaterialBody tresc={material.tresc} />

      {/* ───────────────────────────────────────────────────────────────
          POWTÓRKA POBRANIA — po przeczytaniu całości (drugi punkt konwersji). */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Chcesz mieć to pod ręką?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Przeczytałeś całość za darmo. Jeśli chcesz mieć ten materiał na potem,
              wyślemy go w PDF na maila.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6">
              <PobierzMagnet
                materialSlug={material.slug}
                tytul={material.tytul}
                cta={material.ctaPobierz}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Opcjonalne FAQ — 1:1 z FAQPage JSON-LD (render tylko gdy są pytania). */}
      {material.faq && material.faq.length > 0 && <MaterialFAQ faq={material.faq} />}

      {/* v22 (PLAN-v22 §2.3 pkt 6 i §3 P2 pkt 12) — LINKI KRZYŻOWE.
          Przed rundą magnet był ślepym zaułkiem (materiał -> usługa 0/6).
          Ten sam komponent, co pod poradnikami i realizacjami: jedna usługa,
          która rozwiązuje ten problem u klienta, i jeden poradnik, który
          tłumaczy temat głębiej. Zysk botowy: dodatkowe <h3> i linki w <main>. */}
      <LinkiKrzyzowe
        uslugi={material.powiazaneUslugi}
        poradniki={material.powiazanePoradniki}
        narzedzia={material.powiazaneNarzedzia}
      />

      {/* ───────────────────────────────────────────────────────────────
          CTA DOMYKAJĄCE — jedno główne, wspólny flow diagnozy (.surface-aurora). */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Zacznijmy od jednej rzeczy, która zżera Ci najwięcej czasu.</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
              {HOME_CTA.microcopy}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9">
              <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
                {HOME_CTA.label}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        JSON-LD wstrzyknięty SERWEROWO (w HTML przy 1. żądaniu, widoczny dla botów):
        - Article: author -> Paweł, publisher -> #organization; daty z realnych pól.
        - BreadcrumbList: Strona główna -> Centrum Wiedzy -> Materiały -> [magnet].
        - FAQPage: tylko gdy material.faq istnieje (tekst 1:1 z sekcją MaterialFAQ).
      */}
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      {faq && <JsonLd data={faq} />}
    </main>
  );
}
