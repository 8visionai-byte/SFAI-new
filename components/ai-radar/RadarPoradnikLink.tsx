import Link from 'next/link';
import { Card } from '@/components/ui';

/**
 * RadarPoradnikLink — krzyżowy link „Powiązany poradnik" pod każdym newsem.
 *
 * Brief Pawła (żelazne): KAŻDY news AI Radar linkuje do poradnika. To domyka
 * linkowanie wewnętrzne (news -> poradnik -> usługa/narzędzie). Karta jest klikalna
 * w całości (link rozciągnięty przez `after:absolute`).
 *
 * `href` to gotowa ścieżka z rejestru (np. '/blog/...' dla istniejących wpisów albo
 * '/poradniki/...' po postawieniu hubu poradników) — jeden punkt prawdy, zero
 * zgadywania bazowego prefiksu. `slug` służy tylko do wyliczenia czytelnej etykiety,
 * gdy rejestr nie poda osobnego tytułu (humanizacja slug -> tekst).
 */
function slugNaTytul(slug: string): string {
  // 'ai-act-a-twoja-firma-2026' -> 'Ai act a twoja firma 2026'
  const tekst = slug.replace(/-/g, ' ').trim();
  return tekst.charAt(0).toUpperCase() + tekst.slice(1);
}

export function RadarPoradnikLink({
  slug,
  href,
  tytul,
}: {
  slug: string;
  href: string;
  /** Opcjonalny czytelny tytuł poradnika; gdy brak, wyliczamy go ze slug. */
  tytul?: string;
}) {
  const etykieta = tytul ?? slugNaTytul(slug);

  return (
    <Card as="aside" variant="interactive" className="relative flex flex-col gap-2">
      <span className="text-caption font-semibold uppercase tracking-wide text-accent">
        Powiązany poradnik
      </span>
      <p className="text-h3">
        <Link
          href={href}
          className="after:absolute after:inset-0 focus-visible:outline-none hover:text-accent"
        >
          {etykieta}
        </Link>
      </p>
      <span className="inline-flex items-center gap-1 text-caption font-semibold text-accent">
        Czytaj poradnik
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
