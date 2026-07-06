import Link from 'next/link';
import { SITE, NAV_LINKS, LEGAL_ROUTES, SOCIALS } from '@/lib/site';
import { USLUGI } from '@/lib/uslugi';
import { Logo } from './Logo';
import { SocialIcon, BRAND_COLORS } from './SocialIcon';

/**
 * Linki "Strony" bez "/uslugi" — usługi mają własną kolumnę z 6 realnymi stronami,
 * a hub /uslugi nie jest jeszcze live (lib/site.ts). Zero martwych linków w stopce.
 */
const FOOTER_NAV_REST = NAV_LINKS.filter((l) => l.href !== '/uslugi');

/**
 * Footer — JASNA stopka (życzenie Pawła: spójne jasne tła), NAP spójny + świeżość +
 * encja. Subtelne tło `bg-bg-subtle` + górna linia oddzielają ją od treści bez
 * ciemnego bloku. Wszystko w HTML (sygnały zaufania cytowalne). Data = bramkarz GEO.
 *
 * NAP bierzemy z SITE (single source of truth). Telefon/adres pokazujemy TYLKO
 * gdy realne (pole SITE.contact.phone puste -> nie renderujemy fałszywej danej).
 */
const LAST_UPDATED = '2026-06-15'; // [PLACEHOLDER] wpiąć w realny rytm aktualizacji (60–90 dni)

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle text-fg">
      <div className="mx-auto w-full max-w-container px-gutter py-section-tight">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Encja + opis */}
          <div>
            <Logo />
            <p className="mt-4 max-w-[40ch] text-body-sm text-fg-muted">
              Budujemy AI Agentów dla polskich firm. Dane w UE, RODO, AI Act.
            </p>
            {/*
              Profile społecznościowe — oryginalne ikony marek, otwierane w nowej
              karcie. W spoczynku subtelne (mono), na hover/focus: kolor marki +
              powiększenie + delikatny lift. Płynna animacja czystym CSS (bez
              biblioteki, zgodnie z decyzją perf). Kolor per marka przez --brand.
            */}
            <ul className="mt-5 flex items-center gap-3.5">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`SimpleFast.ai na ${s.name}`}
                    style={{ '--brand': BRAND_COLORS[s.name] } as React.CSSProperties}
                    className="inline-flex text-fg-subtle transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:scale-125 hover:text-[color:var(--brand)] focus-visible:-translate-y-0.5 focus-visible:scale-125 focus-visible:text-[color:var(--brand)] motion-reduce:transform-none motion-reduce:transition-colors"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Usługi — 6 realnych stron, anchor = H1 = money query (linkowanie pod GEO) */}
          <nav aria-label="Stopka: usługi">
            <h2 className="mb-3 text-overline uppercase text-fg-subtle">Usługi</h2>
            <ul className="space-y-2">
              {USLUGI.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/uslugi/${u.slug}`}
                    className="text-body-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {u.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Nawigacja */}
          <nav aria-label="Stopka: strony">
            <h2 className="mb-3 text-overline uppercase text-fg-subtle">Strony</h2>
            <ul className="space-y-2">
              {FOOTER_NAV_REST.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-fg-muted transition-colors hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kontakt" className="text-body-sm text-fg-muted transition-colors hover:text-fg">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href={LEGAL_ROUTES.privacy} className="text-body-sm text-fg-muted transition-colors hover:text-fg">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontakt / NAP */}
          <div>
            <h2 className="mb-3 text-overline uppercase text-fg-subtle">Kontakt</h2>
            <ul className="space-y-2 text-body-sm text-fg-muted">
              <li>{SITE.name}</li>
              {/* E-mail TYLKO gdy zweryfikowany (nie sam niepusty string) — patrz SITE.contact */}
              {SITE.contact.emailVerified && SITE.contact.email && (
                <li>
                  <a href={`mailto:${SITE.contact.email}`} className="transition-colors hover:text-fg">
                    {SITE.contact.email}
                  </a>
                </li>
              )}
              {SITE.contact.phone && (
                <li>
                  <a href={`tel:${SITE.contact.phone}`} className="transition-colors hover:text-fg">
                    {SITE.contact.phone}
                  </a>
                </li>
              )}
              <li>Siedziba: Pisz (woj. warmińsko-mazurskie). Biura: Gubin i Strzegom.</li>
              <li>
                Świadczymy usługi w całej Polsce, zdalnie i na miejscu. Miasto nie ma znaczenia:
                przyjeżdżamy na audyt do Warszawy, Krakowa, Poznania, Gdańska, Wrocławia i wszędzie
                indziej.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-caption text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Architekt AI full-stack: {SITE.founder.name}.
          </p>
          <p>
            Ostatnia aktualizacja:{' '}
            <time dateTime={LAST_UPDATED}>15 czerwca 2026</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
