import Link from 'next/link';
import { SITE, NAV_LINKS, LEGAL_ROUTES } from '@/lib/site';
import { Logo } from './Logo';

/**
 * Footer — sekcja tech na ciemnym (spec 02 §7), NAP spójny + świeżość + encja.
 * Wszystko w HTML (sygnały zaufania cytowalne). Data aktualizacji = bramkarz GEO.
 *
 * NAP bierzemy z SITE (single source of truth). Telefon/adres pokazujemy TYLKO
 * gdy realne (pole SITE.contact.phone puste -> nie renderujemy fałszywej danej).
 */
const LAST_UPDATED = '2026-06-15'; // [PLACEHOLDER] wpiąć w realny rytm aktualizacji (60–90 dni)

export function Footer() {
  return (
    <footer data-theme="dark" className="bg-bg text-fg">
      <div className="mx-auto w-full max-w-container px-gutter py-section-tight">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Encja + opis */}
          <div>
            <Logo />
            <p className="mt-4 max-w-[40ch] text-body-sm text-fg-muted">
              Budujemy AI Agentów dla polskich firm. Dane w UE, RODO, AI Act.
            </p>
          </div>

          {/* Nawigacja */}
          <nav aria-label="Stopka — strony">
            <h2 className="mb-3 text-overline uppercase text-fg-subtle">Strony</h2>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
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
              <li>Obsługujemy całą Polskę.</li>
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
