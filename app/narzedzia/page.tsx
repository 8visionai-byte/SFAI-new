import type { Metadata } from 'next';
import type { ComponentType } from 'react';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE, HOME_CTA } from '@/lib/site';
import { NARZEDZIA } from '@/lib/narzedzia';

import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

import { KalkulatorOszczednosci } from '@/components/narzedzia/KalkulatorOszczednosci';
import { KalkulatorProcesu } from '@/components/narzedzia/KalkulatorProcesu';
import { TestGotowosciAI } from '@/components/narzedzia/TestGotowosciAI';
import { AudytStronyAI } from '@/components/narzedzia/AudytStronyAI';

/**
 * HUB /narzedzia — darmowe narzędzia AI, SSG (force-static).
 *
 * KPI #1: opisy answer-first każdego narzędzia (z rejestru lib/narzedzia) są w
 * surowym HTML przy 1. żądaniu (cytowalne). Same narzędzia to wyspy 'use client'
 * (kalkulatory/testy) renderowane WEWNĄTRZ statycznej strony — wzbogacają, nie
 * dostarczają rdzenia treści. Każde narzędzie ma kotwicę #<slug> (link z karty).
 *
 * Źródło prawdy listy = rejestr lib/narzedzia (NARZEDZIA). Flagowiec pierwszy.
 * Zero zmyślania: wzory i disclaimery są w samych wyspach.
 */
export const dynamic = 'force-static';

export const metadata: Metadata = buildMetadata({
  title: 'Darmowe narzędzia AI dla firm',
  description:
    'Darmowe narzędzia AI dla firm: kalkulator oszczędności z automatyzacji, test gotowości firmy na AI i audyt strony pod cytowanie w ChatGPT. Policz i sprawdź sam, bez maila.',
  path: '/narzedzia',
});

/** Mapa slug -> wyspa narzędzia. Slug zgodny z rejestrem lib/narzedzia. */
const WYSPY: Record<string, ComponentType> = {
  'kalkulator-oszczednosci': KalkulatorOszczednosci,
  'kalkulator-procesu': KalkulatorProcesu,
  'test-gotowosci-ai': TestGotowosciAI,
  'audyt-strony-ai': AudytStronyAI,
};

export default function NarzedziaPage() {
  return (
    <main id="main">
      {/* Hero hubu — answer-first: co tu jest i po co */}
      <Section tone="base">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h1 className="text-display">Darmowe narzędzia AI</h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-6 text-fg-muted">
              Zanim z kimkolwiek porozmawiasz, policz i sprawdź sam. Te narzędzia
              pokazują, ile pieniędzy zżera Ci powtarzalna robota, czy konkretna
              automatyzacja się spina i czy AI w ogóle widzi Twoją stronę. Bez maila,
              bez zobowiązań, w kilka minut.
            </p>
          </Reveal>

          {/* Spis narzędzi — kotwice w HTML (linki dla botów i ludzi) */}
          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {NARZEDZIA.map((n) => (
                <li key={n.slug}>
                  <a
                    href={`#${n.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-border bg-surface p-4 transition-colors duration-fast hover:border-border-strong"
                  >
                    <span className="text-overline uppercase tracking-[0.08em] text-accent">
                      {n.etykieta}
                    </span>
                    <span className="mt-1 text-body font-semibold text-fg group-hover:text-accent">
                      {n.tytul}
                    </span>
                    <span className="mt-1 text-caption text-fg-subtle">{n.korzysc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Sekcje narzędzi — każda: answer-first opis (HTML) + wyspa interaktywna */}
      {NARZEDZIA.map((n) => {
        const Wyspa = WYSPY[n.slug];
        return (
          <Section key={n.slug} id={n.slug} tone="base">
            <div className="mx-auto max-w-narrow">
              <Reveal>
                <span className="text-overline uppercase tracking-[0.08em] text-accent">
                  {n.etykieta}
                  {n.flagowiec ? ' · flagowe' : ''}
                </span>
                <h2 className="text-h2 mt-2">{n.tytul}</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="text-lead mt-4 text-fg-muted">{n.opis}</p>
              </Reveal>
            </div>

            {Wyspa ? (
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Wyspa />
                </div>
              </Reveal>
            ) : null}
          </Section>
        );
      })}

      {/* CTA domykające (strefa dark), wspólny flow diagnozy */}
      <Section tone="base" theme="dark" id="diagnoza">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Liczby się zgadzają? Pogadajmy o konkretach.</h2>
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

      {/* BreadcrumbList JSON-LD (Strona główna -> Narzędzia), serwerowo w HTML. */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Narzędzia', path: '/narzedzia' },
        ])}
      />
      <link rel="canonical" href={`${SITE.url}/narzedzia`} />
    </main>
  );
}
