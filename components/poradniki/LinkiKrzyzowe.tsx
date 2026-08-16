import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { LinkKrzyzowy } from '@/lib/poradniki/types';
import { INF_KATEGORIA, INF_NARZEDZIE, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';

/**
 * INFINITY v7 (audyt „naczynia połączone": na stronach poradników 4-7 kart szło
 * bez --card-c, więc cała sekcja linków świeciła jednym fallbackowym cyjanem).
 *
 * Kafel linku krzyżowego dostaje ton CELU, do którego prowadzi — dokładnie ten
 * sam kolor, co karta tej usługi na /uslugi i to narzędzie na /narzedzia.
 * Slug czytamy z `href` (kontrakt rejestru: '/uslugi/<slug>' albo
 * '/narzedzia#<slug>'), więc zero nowych pól w treści. Cel spoza map (np. usługa
 * bez wpisu w rejestrze dekoracji) spada na wspólny fallback akcentu.
 *
 * Zwracamy sam kontrakt koloru (kolor + jasny odcień), bo mapa usług i mapa
 * narzędzi mają różne typy dekoru (ikona/emoji), a kartę interesuje wyłącznie
 * para --card-c / --card-c-l.
 */
function dekorLinku(href: string): { c: string; odcien?: string } {
  const usluga = href.match(/^\/uslugi\/([^/#?]+)/)?.[1];
  if (usluga) return INF_KATEGORIA[usluga] ?? INF_KATEGORIA_DEFAULT;
  const narzedzie = href.match(/^\/narzedzia#([^/?]+)/)?.[1];
  if (narzedzie) return INF_NARZEDZIE[narzedzie] ?? INF_KATEGORIA_DEFAULT;
  return INF_KATEGORIA_DEFAULT;
}

/**
 * LinkiKrzyzowe — sekcja krzyżowego linkowania poradnika do OFERTY (usługi) i
 * NARZĘDZI. Zamyka ścieżkę od treści do konwersji: czytelnik poradnika dostaje
 * jasne wejście w usługę, która rozwiązuje jego problem, i w darmowe narzędzie,
 * którym policzy to sam.
 *
 * Renderuje się tylko gdy są jakiekolwiek linki (poradnik bez powiązań -> null).
 * Wszystkie href to realne trasy/anchory (walidowane przy tworzeniu poradnika),
 * więc zero martwych linków. Linki w HTML od razu (SSG).
 */
export function LinkiKrzyzowe({
  uslugi = [],
  narzedzia = [],
}: {
  uslugi?: LinkKrzyzowy[];
  narzedzia?: LinkKrzyzowy[];
}) {
  if (uslugi.length === 0 && narzedzia.length === 0) return null;

  return (
    <Section tone="subtle">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Co zrobić z tą wiedzą?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-4 text-fg-muted">
            Najpierw policz to sam darmowym narzędziem. Potem zobacz usługę, która
            rozwiązuje ten problem u Ciebie.
          </p>
        </Reveal>

        {narzedzia.length > 0 && (
          <div className="mt-8">
            <h3 className="text-h3">Policz to sam</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {narzedzia.map((link) => (
                <li key={link.href}>
                  <LinkKafel link={link} cta="Otwórz narzędzie" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {uslugi.length > 0 && (
          <div className="mt-8">
            <h3 className="text-h3">Zobacz powiązaną usługę</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {uslugi.map((link) => (
                <li key={link.href}>
                  <LinkKafel link={link} cta="Zobacz usługę" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}

/** Pojedynczy kafel linku krzyżowego — cała powierzchnia klikalna.
    INFINITY v5 (spec §4, treść 1:1): karta .inf-card (narożniki + sweep robi
    karta z globals) + spotlight, strzałka → .inf-arrow (dojeżdża na hover karty
    jak na kartach home).
    v7: ton karty = ton celu linku (dekorLinku wyżej), więc narożniki, lewa
    krawędź, poświata i strzałka świecą kolorem tej usługi/narzędzia, a nie
    jednym cyjanem dla całej sekcji. */
function LinkKafel({ link, cta }: { link: LinkKrzyzowy; cta: string }) {
  const dekor = dekorLinku(link.href);
  return (
    <Card
      as="article"
      variant="quiet"
      className="inf-card inf-card-full-hover relative flex h-full flex-col p-6"
      style={{ '--card-c': dekor.c, '--card-c-l': dekor.odcien ?? dekor.c } as CSSProperties}
    >
      <div aria-hidden="true" className="inf-spotlight" />
      <h4 className="text-h3">
        <Link
          href={link.href}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {link.etykieta}
        </Link>
      </h4>
      <p className="mt-2 text-body-sm text-fg-muted">{link.opis}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-caption font-semibold text-accent">
        {cta}
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
