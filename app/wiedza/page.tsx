import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { InfIkonaDekor } from '@/lib/inf-kategorie';
import { INF_WIEDZA, INF_WIEDZA_BADGE, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { Section, Card, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { PoradnikBreadcrumbs } from '@/components/poradniki';
import { PoradnikCard } from '@/components/poradniki';
import { PostCard } from '@/components/blog';
import { PORADNIKI } from '@/lib/poradniki';
import { POSTS } from '@/lib/blog';
import { HOME_CTA } from '@/lib/site';

/**
 * HUB /wiedza — CENTRUM WIEDZY AI (SSG, force-static). Jedno miejsce, które
 * organizuje 4 działy wiedzy o AI dla firm. Cała treść w surowym HTML przy 1.
 * żądaniu (KPI #1: cytowalność LLM). Reveal/MagneticButton to wyspy klienta i
 * tylko wzbogacają; tekst, nagłówki i linki są w HTML niezależnie od JS.
 *
 * STRUKTURA (answer-first):
 *  hero (kapsuła: czym jest Centrum Wiedzy, 4 działy) -> 4 KARTY KATEGORII
 *  (Poradniki · AI Radar · Przemyślenia=/blog · Case studies=/realizacje)
 *  -> wyróżnione pozycje (flagowy poradnik + najnowsze przemyślenie)
 *  -> wejście do narzędzi -> CTA domykające (#diagnoza).
 *
 * LINKI: kategorie linkują do swoich list. Wszystkie 4 działy istnieją (200 OK):
 * Poradniki, AI Radar (silnik newsów, start z 2 wpisami-szablonami formatu), Blog
 * (Przemyślenia) i Realizacje (Case studies). Wzorzec „live:false -> karta »Wkrótce«"
 * zostaje na wypadek przyszłych działów, ale dziś wszystkie karty są klikalne.
 *
 * BREADCRUMB: Strona główna -> Centrum Wiedzy. Schema breadcrumbSchema serwerowo.
 */
export const dynamic = 'force-static';

const PATH = '/wiedza';
const CANONICAL = `${SITE.url}${PATH}`;

export const metadata: Metadata = buildMetadata({
  title: 'Wiedza o AI dla firm: poradniki i newsy',
  description:
    'Centrum Wiedzy AI dla firm: poradniki krok po kroku, newsy AI z filtrem dla MŚP, przemyślenia i realne case studies z liczbami. Jedno miejsce na odpowiedzi o AI.',
  path: PATH,
});

/**
 * 4 kategorie Centrum Wiedzy. `href` = lista działu. `live` = czy trasa istnieje
 * (200 OK). Karta z live:false renderuje się jako „Wkrótce" (nieklikalna), żeby
 * pokazać plan bez martwego linku. Nazwy keyword-rich (SEO/GEO).
 */
type Kategoria = {
  id: string;
  /** H3 karty — keyword-rich nazwa działu. */
  tytul: string;
  /** Zdanie answer-first: co to jest i dla kogo. */
  opis: string;
  href: string;
  /** Etykieta CTA na karcie. */
  cta: string;
  /** Czy trasa działu już istnieje (200 OK). false -> karta „Wkrótce". */
  live: boolean;
};

const KATEGORIE: Kategoria[] = [
  {
    id: 'poradniki',
    tytul: 'Poradniki AI dla firm',
    opis:
      'Konkret krok po kroku pod pytania, które zadaje każdy właściciel: ile kosztuje chatbot i agent AI, które procesy zautomatyzować, jak policzyć zwrot.',
    href: '/poradniki',
    cta: 'Zobacz poradniki',
    live: true,
  },
  {
    id: 'ai-radar',
    tytul: 'AI Radar — newsy AI dla firm',
    opis:
      'Newsy ze świata AI przefiltrowane przez jedno pytanie: co to znaczy dla Twojej firmy. Co się stało, czemu ważne, nasz filtr i co zrobić. Bez hype’u.',
    href: '/ai-radar',
    cta: 'Zobacz AI Radar',
    live: true,
  },
  {
    id: 'przemyslenia',
    tytul: 'Przemyślenia o AI w biznesie',
    opis:
      'Opinie i eseje o AI w małych firmach, prostym językiem. Różnice między chatbotem a agentem, koszty, przepisy, bezpieczeństwo danych, ludzie i praca.',
    href: '/blog',
    cta: 'Czytaj przemyślenia',
    live: true,
  },
  {
    id: 'case-studies',
    tytul: 'Case studies — wdrożenia AI z liczbami',
    opis:
      'Realne wdrożenia AI w firmach, opisane z liczbami: co zautomatyzowaliśmy, ile czasu i leadów to odzyskało. Dowód, nie obietnice.',
    href: '/realizacje',
    cta: 'Zobacz realizacje',
    live: true,
  },
];

/**
 * INFINITY v5 (spec §4) — dekoracja kafelka per dział Centrum Wiedzy oparta o
 * single source INF_WIEDZA (ta sama mapa co dropdown "Wiedza": kolor + jasny
 * odcień + UNIKALNA ikona SVG). Mapowanie id strony -> klucz INF_WIEDZA:
 * przemyslenia = blog. Case studies nie są działem dropdownu Wiedza (żyją pod
 * /realizacje), więc dostają lokalny dekor w palecie kategorii (zieleń
 * automatyzacji + glif wykresu — spójny z liczbami case'ów).
 * BADGE mono po prawej = typ treści działu (INF_WIEDZA_BADGE — pochodna
 * ISTNIEJĄCYCH kluczy typów, spec §2); case-studies bez badge (brak pola).
 */
const KATEGORIA_DEKOR: Record<string, InfIkonaDekor> = {
  poradniki: INF_WIEDZA.poradniki,
  'ai-radar': INF_WIEDZA['ai-radar'],
  przemyslenia: INF_WIEDZA.blog,
  'case-studies': { c: '#00e096', odcien: '#29ff77', ikona: 'wykres-strzalka' },
};
const KATEGORIA_BADGE: Record<string, string> = {
  poradniki: INF_WIEDZA_BADGE.poradniki,
  'ai-radar': INF_WIEDZA_BADGE['ai-radar'],
  przemyslenia: INF_WIEDZA_BADGE.blog,
};

/** Karta kategorii — klikalna gdy trasa live, inaczej „Wkrótce" (zero martwych linków).
    INFINITY v5 (spec §4, treść 1:1): .inf-card (narożniki + sweep robi karta
    z globals) + kafelek .inf-tile z ikoną SVG działu (aria-hidden), badge mono
    typu treści po prawej w jasnym odcieniu, --card-c-l, strzałka .inf-arrow,
    spotlight .inf-spotlight. */
function KategoriaKafel({ kategoria }: { kategoria: Kategoria }) {
  const dekor = KATEGORIA_DEKOR[kategoria.id] ?? INF_KATEGORIA_DEFAULT;
  const odcien = dekor.odcien ?? dekor.c;
  const badge = KATEGORIA_BADGE[kategoria.id];

  if (!kategoria.live) {
    return (
      <Card
        as="article"
        variant="quiet"
        className="inf-card inf-card-quiet flex h-full flex-col p-6 opacity-80"
        aria-disabled="true"
        style={{ '--card-c': 'var(--accent-2)' } as CSSProperties}
      >
        {/* Reflektor jak w każdej innej karcie (spójność „naczyń połączonych"):
            ta gałąź renderuje się tylko dla kategorii jeszcze niepublikowanych,
            więc łatwo o niej zapomnieć przy przeglądzie prerenderu. */}
        <div aria-hidden="true" className="inf-spotlight" />
        <div className="flex items-center gap-2">
          <span className="inf-tag text-accent">Wkrótce</span>
        </div>
        <h3 className="text-h3 mt-4 text-fg-muted">{kategoria.tytul}</h3>
        <p className="mt-3 text-body-sm text-fg-muted">{kategoria.opis}</p>
        <span className="mt-auto pt-4 text-caption text-fg-subtle">
          Uruchamiamy ten dział wkrótce
        </span>
      </Card>
    );
  }

  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card inf-card-edge relative flex h-full flex-col p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': odcien } as CSSProperties}
    >
      <div aria-hidden="true" className="inf-spotlight" />
      {/* Wiersz dekoracji jak w dropdownie wzorca: kafelek ikony działu +
          badge mono typu treści po prawej (pochodna istniejących kluczy). */}
      <span className="mb-4 flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className="inf-tile"
          style={{ '--tile-c': dekor.c } as CSSProperties}
        >
          <InfIcon name={dekor.ikona} />
        </span>
        {badge && (
          <span className="inf-tag" style={{ color: odcien }}>
            {badge}
          </span>
        )}
      </span>
      <h3 className="text-h3">
        <Link
          href={kategoria.href}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {kategoria.tytul}
        </Link>
      </h3>
      <p className="mt-3 text-body-sm text-fg-muted">{kategoria.opis}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-caption font-semibold text-accent">
        {kategoria.cta}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="inf-arrow text-accent"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Card>
  );
}

export default function WiedzaPage() {
  // Wyróżnione pozycje: flagowy poradnik (najnowszy) + najnowsze przemyślenie z bloga.
  const flagowyPoradnik = PORADNIKI[0];
  const najnowszePrzemyslenie = POSTS[0];

  return (
    <main id="main">
      {/* ───────────────────────────────────────────────────────────────
          (1) HERO — kapsuła answer-first: czym jest Centrum Wiedzy, 4 działy.
          INFINITY v2: hero bez solidnego tła (globalny starfield prześwituje);
          badge-eyebrow → mono overline .inf-overline (treść 1:1). */}
      <Section tone="transparent">
        <div className="mx-auto max-w-narrow">
          <PoradnikBreadcrumbs
            items={[
              { name: 'Strona główna', href: '/' },
              { name: 'Centrum Wiedzy' },
            ]}
          />

          <Reveal>
            <p className="inf-overline inf-overline-lines mt-6">
              Wiedza o AI dla firm
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-display mt-5">Centrum Wiedzy AI dla firm</h1>
          </Reveal>

          {/* Kapsuła answer-first — surowy HTML, cytat dla LLM. */}
          <Reveal delay={0.1}>
            <p className="text-lead mt-6 text-fg-muted">
              Centrum Wiedzy AI to jedno miejsce, gdzie właściciel firmy znajdzie
              odpowiedź na pytanie o AI: ile co kosztuje, co automatyzować i jak
              zacząć bez ryzyka. Mamy cztery działy: poradniki krok po kroku, newsy
              AI z filtrem dla firm, nasze przemyślenia i realne case studies z liczbami.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 text-body text-fg-muted">
              AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Tu
              tłumaczymy to prostym językiem, z liczbami i bez owijania w bawełnę.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (2) 4 KARTY KATEGORII — każda linkuje do swojej listy (lub „Wkrótce"). */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Cztery działy, jedno miejsce</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-4 text-fg-muted">
              Wybierz, czego szukasz: konkretnej odpowiedzi, świeżego newsa, opinii
              albo dowodu z realnego wdrożenia.
            </p>
          </Reveal>
        </div>

        <ul className="mt-9 grid gap-6 sm:grid-cols-2">
          {KATEGORIE.map((kategoria, i) => (
            <Reveal as="li" key={kategoria.id} delay={Math.min(i * 0.05, 0.2)} className="h-full">
              <KategoriaKafel kategoria={kategoria} />
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (3) WYRÓŻNIONE POZYCJE — flagowy poradnik + najnowsze przemyślenie. */}
      {(flagowyPoradnik || najnowszePrzemyslenie) && (
        <Section tone="base">
          <div className="mx-auto max-w-narrow">
            <Reveal>
              <h2 className="text-h2">Zacznij od tych</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-lead mt-4 text-fg-muted">
                Dwa wejścia na start: flagowy poradnik pod najczęstsze pytanie i
                najnowsze przemyślenie z bloga.
              </p>
            </Reveal>
          </div>

          <ul className="mt-9 grid gap-6 md:grid-cols-2">
            {flagowyPoradnik && (
              <Reveal as="li" key={flagowyPoradnik.slug}>
                <PoradnikCard poradnik={flagowyPoradnik} />
              </Reveal>
            )}
            {najnowszePrzemyslenie && (
              <Reveal as="li" key={najnowszePrzemyslenie.slug} delay={0.05}>
                <PostCard post={najnowszePrzemyslenie} />
              </Reveal>
            )}
          </ul>
        </Section>
      )}

      {/* ───────────────────────────────────────────────────────────────
          (4) NARZĘDZIA I MATERIAŁY — wejście do darmowych narzędzi (live). */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            {/* INFINITY v5: wyróżnienie zostaje na .sf-rim-gradient (mechanizm
                home) — badge w języku inf (mono .inf-tag na akcencie). */}
            <Card variant="highlight" className="overflow-hidden">
              <span className="inf-tag rounded-full border-transparent bg-accent px-3 py-1 text-accent-contrast">
                Za darmo
              </span>
              <h2 className="text-h2 mt-4">Narzędzia i materiały do pobrania</h2>
              <p className="text-lead mt-4 text-fg-muted">
                Wiedza to jedno, policzenie to drugie. W narzędziach sprawdzisz w
                kilka minut, ile tracisz czasu i co zwróci się najszybciej. Kalkulatory,
                test gotowości AI i audyt strony, bez logowania. W materiałach pobierzesz
                gotowe prompty, checklisty i arkusze AI dla firm, za darmo i bez zapisu.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <MagneticButton variant="primary" size="lg" href="/narzedzia">
                  Otwórz narzędzia
                </MagneticButton>
                <MagneticButton variant="secondary" size="lg" href="/materialy">
                  Pobierz materiały
                </MagneticButton>
              </div>
              <p className="mt-4 text-caption text-fg-subtle">
                Darmowe narzędzia i materiały, które dają konkretną liczbę, a nie ogólnik.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────────────────────────────────────────────────────
          (5) CTA DOMYKAJĄCE — jedno główne, wspólny flow diagnozy (.surface-aurora). */}
      <Section tone="base" id="diagnoza" className="surface-aurora">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">Wiesz już sporo. Zobaczmy to na Twoich danych.</h2>
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
        BreadcrumbList JSON-LD (Strona główna -> Centrum Wiedzy), serwerowo w HTML.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Strona główna', path: '/' },
          { name: 'Centrum Wiedzy', path: PATH },
        ])}
      />
      <link rel="canonical" href={CANONICAL} />
    </main>
  );
}
