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
import { GeneratorPromptow } from '@/components/narzedzia/GeneratorPromptow';
import { PRZYKLADY } from '@/lib/narzedzia/generator-promptow';

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
  'generator-promptow': GeneratorPromptow,
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

            {/* Treść opisowa generatora — w surowym HTML (cytowalna, działa bez JS) */}
            {n.slug === 'generator-promptow' ? (
              <Reveal delay={0.15}>
                <div className="mx-auto mt-12 max-w-narrow">
                  <h3 className="text-h3">
                    Czym jest prompt i czemu sposób pytania zmienia odpowiedź AI?
                  </h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Prompt to polecenie, które wpisujesz do AI. To, jak je sformułujesz,
                    decyduje o jakości odpowiedzi bardziej niż sam model. Dobry prompt mówi
                    AI cztery rzeczy: kim ma być, co ma zrobić, po co i w jakim stylu. Ogólne
                    pytanie daje ogólną odpowiedź. Konkretny prompt daje gotowy do użycia
                    tekst.
                  </p>

                  <h3 className="text-h3 mt-10">Jak działa generator promptów AI dla firm?</h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Wybierasz cztery rzeczy z list: branżę, zadanie, cel i styl. Generator
                    skleja z nich gotowy prompt według sprawdzonego wzoru: rola eksperta,
                    kontekst Twojej branży, konkretne zadanie, cel tekstu, styl i format
                    wyjścia. Na końcu dokłada zasady, które pilnują jakości, na przykład żeby
                    AI nie zmyślało danych, tylko pytało o brakujące informacje. Kopiujesz
                    prompt i wklejasz do swojego AI.
                  </p>

                  {/* Tabela: zły prompt vs gotowy prompt */}
                  <div className="mt-8 overflow-hidden rounded-lg border border-border">
                    <table className="w-full border-collapse text-left text-body-sm">
                      <thead>
                        <tr className="bg-bg-subtle">
                          <th className="border-b border-border p-4 font-semibold text-fg">
                            Zły prompt
                          </th>
                          <th className="border-b border-border p-4 font-semibold text-fg">
                            Gotowy prompt z generatora
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-fg-muted">
                        <tr>
                          <td className="border-b border-border p-4 align-top">
                            „Napisz mail do klienta.”
                          </td>
                          <td className="border-b border-border p-4 align-top">
                            Rola, kontekst branży, konkretne zadanie, cel, styl i format. AI
                            wie, kim być i co dokładnie napisać.
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b border-border p-4 align-top">
                            Efekt: ogólny, bez tonu, trzeba poprawiać.
                          </td>
                          <td className="border-b border-border p-4 align-top">
                            Efekt: tekst w Twoim stylu, gotowy po uzupełnieniu danych w
                            nawiasach.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4 align-top">
                            AI zmyśla brakujące dane.
                          </td>
                          <td className="p-4 align-top">
                            AI najpierw pyta o brakujące informacje, dopiero potem pisze.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Gotowe przykłady promptów — wydrukowane w HTML (cytowalne) */}
                  <h3 className="text-h3 mt-10">Przykładowe gotowe prompty</h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Tak wygląda prompt złożony przez generator. Możesz skopiować dowolny i
                    użyć od razu.
                  </p>
                  <div className="mt-5 space-y-5">
                    {PRZYKLADY.map((p) => (
                      <figure key={p.tytul}>
                        <figcaption className="text-caption font-semibold text-fg">
                          {p.tytul}
                        </figcaption>
                        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-md border border-border bg-bg-subtle p-4 font-mono text-caption leading-relaxed text-fg-muted">
                          {p.prompt}
                        </pre>
                      </figure>
                    ))}
                  </div>

                  <h3 className="text-h3 mt-10">Czy ten generator promptów jest darmowy?</h3>
                  <p className="mt-3 text-body text-fg-muted">
                    Tak. Bez logowania, bez limitu, bez maila. Składasz prompt, kopiujesz,
                    używasz.
                  </p>
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
