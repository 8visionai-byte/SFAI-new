import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { getUslugaBySlug } from '@/lib/uslugi';
import type { Usluga } from '@/lib/uslugi';
import { INF_KATEGORIA, INF_KATEGORIA_DEFAULT } from '@/lib/inf-kategorie';
import { InfIcon } from '@/components/ui/InfIcons';

/**
 * SEKCJA — PROMO GŁÓWNYCH USŁUG (INFINITY v4, spec §PARTIA C pkt 1).
 *
 * NOWA opowieść home (decyzja Pawła): ZARAZ PO HERO kafelki głównych usług
 * wg SEO — układ wzorca (EU-Act-Hub full + dwie połówki):
 *   chatboty        = karta PEŁNEJ szerokości,
 *   voiceboty       = połówka,
 *   audyt-ai        = połówka,
 *   architekci-wartosci-ai = CIENKA karta full pod spodem (usługa do promowania).
 *
 * TREŚĆ 1:1 z rejestru USLUGI (u.h1 + u.metaDescription) — ZERO nowych stringów.
 * Wyjątek konieczny: architekci-wartosci-ai CELOWO nie jest w rejestrze
 * lib/uslugi (strona-parasol, patrz komentarz w jej page.tsx), więc karta
 * bierze 1:1 metaTitle + metaDescription z app/uslugi/architekci-wartosci-ai/
 * page.tsx (stałe niżej, kopiowane co do znaku — przy zmianie tamtej strony
 * zaktualizować TU).
 *
 * DEKORACJA (nie treść): mono overline = SLUG usługi (istniejący identyfikator,
 * język techniczny wzorca „// CHATBOTY") w ODCIENIU kategorii (pole `odcien`
 * z lib/inf-kategorie, partia A); kafelek InfIcon w kolorze bazowym; strzałka
 * .inf-arrow dojeżdża na hover karty (reguła .inf-card .inf-arrow z globals).
 * Rozbłysk sweep robi ::after samej .inf-card (v4) — bez dodatkowych divów.
 * Odcienie kart w JEDNYM gridzie RÓŻNIĄ się (spec §C pkt 5): każda usługa ma
 * inną kategorię, więc różnicowanie niesie rejestr INF_KATEGORIA.
 * Tagi z kapsuły ŚWIADOMIE pominięte: kapsuła to 40-60 słów ciągłej prozy,
 * nie krótkie frazy (spec: „tagi z kapsuły JEŚLI krótkie" — nie są).
 */

/** Slugi trzech usług promowanych kafelkami (kolejność = układ siatki). */
const PROMO_SLUGI = ['chatboty', 'voiceboty', 'audyt-ai'] as const;

/**
 * Architekci Wartości AI — stringi 1:1 z metadata strony-parasola
 * app/uslugi/architekci-wartosci-ai/page.tsx (buildMetadata title/description).
 */
const ARCHITEKCI = {
  href: '/uslugi/architekci-wartosci-ai',
  tytul: 'Architekci Wartości AI: wdrożenie AI rozliczane za efekt',
  opis:
    'Rozliczamy się za przyniesioną wartość, nie za godziny. Sprawdzamy, gdzie tracisz pieniądze, robimy jeden proces na próbę, decydujesz. Darmowa diagnoza, pełny jawny cennik od 0 zł.',
} as const;

/** Jedna karta usługi: full (pełna szerokość, większy tytuł) lub połówka. */
function PromoKarta({ usluga, full = false }: { usluga: Usluga; full?: boolean }) {
  const kat = INF_KATEGORIA[usluga.slug] ?? INF_KATEGORIA_DEFAULT;
  const odcien = kat.odcien ?? kat.c;
  return (
    <li
      className={full ? 'inf-card md:col-span-2' : 'inf-card'}
      style={{ '--card-c': kat.c, '--card-c-l': odcien } as CSSProperties}
    >
      <Link
        href={`/uslugi/${usluga.slug}`}
        className={`group flex h-full flex-col ${full ? 'p-6 md:p-8' : 'p-6'}`}
      >
        {/* Wiersz dekoracji: kafelek ikony + mono overline slugu w odcieniu
            + strzałka (widoczna na hover karty; mobile zawsze). */}
        <span className="flex items-center gap-3">
          {/* v5 (spec §3 KAFELKI) — hover ikony robi CSS partii B w globals.
              CSS DO DOPISANIA (partia B): .inf-card:hover .inf-tile
              { transform: rotate(-15deg) scale(1.15); filter: brightness(1.35); }
              (transition .3s niesie baza .inf-tile; RM: bez transform). */}
          <span
            aria-hidden="true"
            className="inf-tile"
            style={{ '--tile-c': kat.c } as CSSProperties}
          >
            <InfIcon name={kat.ikona ?? INF_KATEGORIA_DEFAULT.ikona} />
          </span>
          <span className="inf-overline" style={{ color: odcien }}>
            {usluga.slug}
          </span>
          {/* v5 (spec §3 KAFELKI): strzałka hover w KOLORZE karty (--card-c-l)
              — utility arbitralne bije warstwę components (kolor nie wraca do
              accentu/fg-muted z reguł hover globals). */}
          <span
            aria-hidden="true"
            className="inf-arrow ml-auto text-[color:var(--card-c-l,var(--accent))]"
          >
            →
          </span>
        </span>
        {/* Tytuł karty = h1 usługi (money query 1:1); h2 — sekcja nie ma
            własnego nagłówka (kafelki wchodzą od razu po hero, spec v4). */}
        <h2 className={`${full ? 'text-h2' : 'text-h3'} mt-4 text-fg`}>{usluga.h1}</h2>
        <p className="mt-2 text-body-sm text-fg-muted">{usluga.metaDescription}</p>
      </Link>
    </li>
  );
}

export function PromoUslugi() {
  // Rejestr = źródło prawdy; nieznany slug po prostu nie renderuje karty.
  const uslugi = PROMO_SLUGI
    .map((slug) => getUslugaBySlug(slug))
    .filter((u): u is Usluga => Boolean(u));

  return (
    <Section tone="base" space="md">
      {/* Kaskadę wejścia robi .sf-stagger (jeden obserwator na siatce). */}
      <Reveal as="ul" className="sf-stagger grid gap-6 md:grid-cols-2">
        {uslugi.map((u, i) => (
          <PromoKarta key={u.slug} usluga={u} full={i === 0} />
        ))}

        {/* CIENKA karta full: Architekci Wartości AI (parasol do promowania).
            Dekor spoza rejestru kategorii -> fallback akcentu (INF_KATEGORIA_DEFAULT). */}
        <li
          className="inf-card md:col-span-2"
          style={
            {
              '--card-c': INF_KATEGORIA_DEFAULT.c,
              '--card-c-l': INF_KATEGORIA_DEFAULT.odcien,
            } as CSSProperties
          }
        >
          <Link
            href={ARCHITEKCI.href}
            className="group flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5"
          >
            {/* Kafelek ikony (dekoracja aria-hidden). */}
            <span
              aria-hidden="true"
              className="inf-tile shrink-0"
              style={{ '--tile-c': INF_KATEGORIA_DEFAULT.c } as CSSProperties}
            >
              <InfIcon name={INF_KATEGORIA_DEFAULT.ikona} />
            </span>
            <span className="min-w-0 flex-1">
              <h2 className="text-ui font-semibold text-fg">{ARCHITEKCI.tytul}</h2>
              <p className="mt-1 text-body-sm text-fg-muted">{ARCHITEKCI.opis}</p>
            </span>
            {/* v5 (spec §3 KAFELKI): strzałka w kolorze karty (--card-c-l). */}
            <span
              aria-hidden="true"
              className="inf-arrow text-[color:var(--card-c-l,var(--accent))] max-sm:hidden"
            >
              →
            </span>
          </Link>
        </li>
      </Reveal>
    </Section>
  );
}
