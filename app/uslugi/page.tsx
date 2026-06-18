import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { getUslugaBySlug } from '@/lib/uslugi';
import type { Usluga } from '@/lib/uslugi/types';

import { Section, Card, Badge, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { Breadcrumbs } from '@/components/uslugi/Breadcrumbs';
import { HOME_CTA } from '@/lib/site';

/**
 * HUB /uslugi (rozdroze) — SSG (force-static). Cala tresc w surowym HTML przy
 * 1. zadaniu (KPI #1: cytowalnosc). Reveal/MagneticButton to wyspy klienta i
 * tylko wzbogacaja; tekst, naglowki i linki sa w HTML niezaleznie od JS.
 *
 * STRUKTURA (answer-first):
 *  hero (co tu jest, 2-3 zdania) -> wyrozniony blok parasola "Architekci Wartosci AI"
 *  -> 3 KLASTRY uslug (Obsluga 24/7 · Back-office i procesy · Budowa i strategia)
 *  -> CTA domykajace (#diagnoza).
 *
 * ZRODLO PRAWDY listy = rejestr lib/uslugi (getUslugaBySlug po slugu). Klastry
 * skladamy z realnych slugow -> zero martwych linkow. Kazdy kafel linkuje do
 * /uslugi/<slug> (SSG, 200 OK). Parasol linkuje do /uslugi/architekci-wartosci-ai.
 *
 * SITEMAP/NAV: trase /uslugi i /uslugi/architekci-wartosci-ai ustawia integrator w
 * lib/site.ts (ROUTES live:true). 10 uslug wchodzi do sitemapy przez rejestr.
 */
export const dynamic = 'force-static';

const PATH = '/uslugi';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Usługi AI dla firm: automatyzacje, agenci, strony',
  description:
    'Usługi AI SimpleFast.ai dla MŚP: chatboty i voiceboty 24/7, automatyzacja faktur i procesów, agent rekrutacyjny, audyt AI, strony pod SEO/GEO. Zacznij od jednej automatyzacji.',
  path: PATH,
});

/**
 * 3 KLASTRY intencji. Kazdy klaster = naglowek-pytanie + lista slugow z rejestru.
 * Slugi MUSZA istniec w lib/uslugi (inaczej kafel sie nie wyrenderuje) -> brak 404.
 */
type Klaster = {
  id: string;
  /** H2 jak pytanie (north star: naglowki jak pytania). */
  h2: string;
  /** Zdanie answer-first pod naglowkiem klastra. */
  intro: string;
  slugs: string[];
};

const KLASTRY: Klaster[] = [
  {
    id: 'obsluga',
    h2: 'Kto odbierze klienta, telefon i kandydata 24/7?',
    intro:
      'Pierwsza linia, która odpowiada od razu, też wieczorem i w weekend. Agent zbiera leady, umawia, odpowiada na powtarzalne pytania. Człowiek decyduje, agent robi resztę.',
    slugs: ['chatboty', 'voiceboty', 'agent-rekrutacyjny'],
  },
  {
    id: 'back-office',
    h2: 'Co zdejmie z zespołu powtarzalną robotę za kulisami?',
    intro:
      'Przepisywanie danych, faktury, potwierdzenia, terminy. To, co zjada godziny i nie buduje firmy. Automat robi to po cichu, a my pilnujemy, żeby działał.',
    slugs: ['automatyzacje', 'dokumenty-faktury', 'opieka-ai'],
  },
  {
    id: 'budowa',
    h2: 'Od czego zacząć i co zbudować, żeby nie przepalić kasy?',
    intro:
      'Najpierw mapa, gdzie AI da zysk. Potem to, czego nie ma na półce: aplikacje, wtyczki, strony cytowalne przez AI. Najpierw plan, potem wydatek.',
    slugs: ['audyt-ai', 'rozwiazania', 'strony-www', 'optymalizacja'],
  },
];

/** Kafel usługi — link po H1 (= money query), kapsuła skrócona do dowodu wartości. */
function UslugaKafel({ usluga }: { usluga: Usluga }) {
  return (
    <Card
      as="article"
      variant="interactive"
      className="h-full"
    >
      <Link
        href={`/uslugi/${usluga.slug}`}
        className="flex h-full flex-col rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
      >
        <h3 className="text-h3 text-fg">{usluga.h1}</h3>
        <p className="mt-3 text-body-sm text-fg-muted">{usluga.problem.h2}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-semibold text-accent-hover">
          Zobacz usługę
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </Card>
  );
}

export default function UslugiHubPage() {
  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO HUBU — answer-first: co tu znajdziesz, jedno zdanie różnicy. */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Breadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Usługi' },
            ]}
          />

          <Reveal>
            <h1 className="text-display mt-6">Usługi AI dla firm</h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Budujemy AI Agentów, nie chatboty. Agent wykonuje pracę pod nadzorem
              człowieka: odbiera telefon, umawia, pilnuje faktur, odsiewa CV. Poniżej
              dziesięć usług w trzech grupach: obsługa 24/7, back-office i procesy,
              budowa i strategia. Nie musisz wybierać dziś. Zaczynasz od jednej rzeczy,
              która zżera najwięcej czasu.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-body text-fg-muted">
              AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Twoje dane
              zostają w Unii Europejskiej, a pierwszy krok jest mały i odwracalny.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) WYRÓŻNIONY BLOK PARASOLA — wejście do "Architekci Wartości AI". */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <Card variant="highlight" className="overflow-hidden">
              <Badge variant="accent">Zacznij tutaj</Badge>
              <h2 className="text-h2 mt-4">Nie wiesz, którą usługę wybrać?</h2>
              <p className="text-lead mt-4 text-fg-muted">
                Architekci Wartości AI to my zamiast etatowego działu AI. Sami sprawdzamy,
                gdzie tracisz godziny, budujemy jedną automatyzację na próbę i ją
                utrzymujemy. Ty decydujesz, czy idziemy dalej. Zaczynasz za 0 zł.
              </p>
              <div className="mt-7">
                <MagneticButton variant="primary" size="lg" href="/uslugi/architekci-wartosci-ai">
                  Zobacz, jak to działa
                </MagneticButton>
              </div>
              <p className="mt-4 text-caption text-fg-subtle">
                Pełny jawny cennik od 0 zł. Najpierw efekt na Twoich danych, potem decyzja.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) 3 KLASTRY USŁUG — naglowki jak pytania, kafelki = realne strony. */}
      {KLASTRY.map((klaster, ki) => {
        // Skladamy kafelki z realnych uslug w rejestrze (slug nieznany -> pomijamy).
        const uslugi = klaster.slugs
          .map((slug) => getUslugaBySlug(slug))
          .filter((u): u is Usluga => Boolean(u));

        if (uslugi.length === 0) return null;

        return (
          <Section key={klaster.id} tone={ki % 2 === 0 ? 'base' : 'subtle'}>
            <div className="mx-auto max-w-narrow">
              <Reveal>
                <h2 className="text-h2">{klaster.h2}</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="text-lead mt-4 text-fg-muted">{klaster.intro}</p>
              </Reveal>
            </div>

            <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {uslugi.map((usluga, i) => (
                <Reveal as="li" key={usluga.slug} delay={Math.min(i * 0.05, 0.2)} className="h-full">
                  <UslugaKafel usluga={usluga} />
                </Reveal>
              ))}
            </ul>
          </Section>
        );
      })}

      {/* ───────────────────────────────────────────────────────────────
          (4) CTA DOMYKAJĄCE — jedno główne, wspólny flow diagnozy (.surface-aurora). */}
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
            <div className="mt-9 flex flex-col items-center gap-3">
              <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
                {HOME_CTA.label}
              </MagneticButton>
              <span className="text-caption max-w-[60ch] text-fg-subtle">
                Realne wdrożenia: auto-email obsługi klienta gotowy w 75% i generator
                leadów, który zrobił 1000 rekordów w 40 minut.
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        BreadcrumbList JSON-LD (Strona główna -> Usługi), serwerowo w HTML.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Usługi', path: PATH },
        ])}
      />
      {/* Kanoniczny URL hubu = absolutny (spójność z metadata). */}
      <link rel="canonical" href={CANONICAL} />
    </main>
  );
}
