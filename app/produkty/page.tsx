import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE, HOME_CTA } from '@/lib/site';
import { PRODUKTY, KLOCKI, KLOCKI_DISCLAIMER } from '@/lib/produkty';

import { Section, Card, Badge, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { ProduktCard, KlocekCard } from '@/components/produkty';

/**
 * STRONA /produkty — SSG (force-static). Cała treść w surowym HTML przy 1. żądaniu
 * (KPI #1: cytowalność). Reveal/MagneticButton to wyspy klienta i tylko wzbogacają;
 * tekst, nagłówki i linki są w HTML niezależnie od JS.
 *
 * STRUKTURA (answer-first, nagłówki jak pytania):
 *  (1) hero — "Co zbudowaliśmy i co z tego możesz mieć u siebie"
 *  (2) 4 WŁASNE PRODUKTY — opis przez funkcję, dla kogo, co daje (szac.), nuta customu
 *  (3) KATALOG KLOCKÓW — "Z czego składamy indywidualne rozwiązania" + WIDOCZNY disclaimer
 *  (4) CTA domykające -> #diagnoza
 *
 * ŹRÓDŁO PRAWDY = rejestr lib/produkty (PRODUKTY, KLOCKI, KLOCKI_DISCLAIMER).
 * BreadcrumbList + ItemList JSON-LD wstrzyknięte SERWEROWO. Canonical absolutny.
 *
 * SITEMAP/NAV: trasę /produkty i wpis w NAV ustawia integrator (lib/site.ts ROUTES).
 * Ta strona ISTNIEJE (200 OK, SSG) niezależnie od tego, czy jest już w sitemapie.
 */
export const dynamic = 'force-static';

const PATH = '/produkty';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Produkty: co zbudowaliśmy i co możesz mieć u siebie',
  description:
    'Cztery własne produkty AI SimpleFast.ai opisane przez funkcję: skaner faktur do KSeF, apka coachingowa z agentami, obecność i składki zespołu, centrum dowodzenia głosem. Plus katalog klocków.',
  path: PATH,
});

export default function ProduktyPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO — answer-first: co zbudowaliśmy i co z tego możesz mieć. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h1 className="text-display">
              Co zbudowaliśmy i co z tego możesz mieć u siebie
            </h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Zbudowaliśmy kilka własnych narzędzi i pokazujemy je wprost: co robią,
              dla kogo są i co dają. Część działa u nas na co dzień, część to MVP, czyli
              działająca wersja minimalna. Żadne z nich nie jest pudełkowym produktem
              z półki. To punkt wyjścia. Ten sam mechanizm składamy indywidualnie pod
              Twój proces.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-body text-fg-muted">
              AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Niżej cztery
              produkty opisane przez funkcję, a pod nimi katalog klocków, z których
              składamy rozwiązania na zamówienie.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) 4 WŁASNE PRODUKTY — opis przez funkcję (mobile-first 1 -> 2 kol.). */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Co konkretnie zbudowaliśmy?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Cztery narzędzia, każde rozwiązuje jeden konkretny ból. Opisujemy je
              przez to, co robią, nie przez nazwę. Nazwy są robocze.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {PRODUKTY.map((produkt, i) => (
            <Reveal
              as="li"
              key={produkt.slug}
              delay={Math.min(i * 0.05, 0.2)}
              className="h-full"
            >
              <ProduktCard produkt={produkt} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) KATALOG KLOCKÓW — "Z czego składamy indywidualne rozwiązania". */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Z czego składamy indywidualne rozwiązania?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              To lista klocków, czyli pojedynczych możliwości z naszych analogii i
              wdrożeń. Każdy z nich robi jedną rzecz. Łączymy je i składamy pod konkretny
              proces, tak jak składaliśmy produkty wyżej.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {KLOCKI.map((klocek, i) => (
            <Reveal
              as="li"
              key={klocek.nazwa}
              delay={Math.min(i * 0.04, 0.2)}
              className="h-full"
            >
              <KlocekCard klocek={klocek} />
            </Reveal>
          ))}
        </ul>

        {/* DISCLAIMER — MUSI być widoczny pod katalogiem klocków (uczciwy sygnał). */}
        <div className="mx-auto mt-10 max-w-narrow">
          <Reveal>
            <Card variant="highlight" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge variant="accent">Ważne</Badge>
                <p className="text-body mt-3 text-fg">{KLOCKI_DISCLAIMER}</p>
                <p className="mt-3 text-body-sm text-fg-muted">
                  Chcesz zobaczyć, jak budujemy rozwiązanie z tych klocków na zamówienie?
                  Sprawdź usługę{' '}
                  <Link
                    href="/uslugi/rozwiazania"
                    className="font-semibold text-accent-hover underline-offset-2 hover:underline"
                  >
                    indywidualne rozwiązania AI
                  </Link>
                  .
                </p>
              </div>
              <div className="shrink-0">
                <MagneticButton variant="primary" size="md" href={HOME_CTA.href}>
                  Złóż swoje rozwiązanie
                </MagneticButton>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (4) CTA DOMYKAJĄCE — jedno główne CTA, wspólny flow diagnozy (dark). */}
      <Section tone="base" theme="dark" id="diagnoza">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Który z tych klocków zdjąłby najwięcej z Twojego dnia?</h2>
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
                Bezpłatna diagnoza. Najpierw mówimy, czy w ogóle warto budować, potem decyzja.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        BreadcrumbList JSON-LD (Strona główna -> Produkty), serwerowo w HTML.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Produkty', path: PATH },
        ])}
      />

      {/*
        ItemList JSON-LD — lista 4 produktów (opis przez funkcję). To DANE referencyjne
        (higiena GEO): name = co produkt robi, description = opis funkcji. Każdy string
        prawdziwy. URL pozycji = kotwica #slug na tej stronie (produkt nie ma osobnej
        podstrony), więc link prowadzi do realnego, istniejącego miejsca w dokumencie.
      */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${CANONICAL}/#produkty`,
          name: 'Produkty SimpleFast.ai',
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: PRODUKTY.length,
          itemListElement: PRODUKTY.map((produkt, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: produkt.coRobi,
            description: produkt.opisFunkcji,
            url: `${CANONICAL}#${produkt.slug}`,
          })),
        }}
      />

      {/* Kanoniczny URL strony = absolutny (spójność z metadata). */}
      <link rel="canonical" href={CANONICAL} />
    </main>
  );
}
