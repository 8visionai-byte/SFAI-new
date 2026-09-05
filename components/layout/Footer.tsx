import Link from 'next/link';
import { SITE, NAV_LINKS, LEGAL_ROUTES, SOCIALS } from '@/lib/site';
import { USLUGI } from '@/lib/uslugi';
import { PODSTRONY_SITEMAP } from '@/lib/uslugi/podstrony';
import { POSTS } from '@/lib/blog';
import { PORADNIKI } from '@/lib/poradniki';
import { MATERIALY } from '@/lib/materialy';
import { RADAR_NEWS } from '@/lib/ai-radar';
import { TrackedLink } from '@/components/analytics/TrackedLink';
/* Import z pliku, nie z barrela `@/components/blog`: barrel ciągnie
   BlogBreadcrumbs -> components/uslugi, a stopka nie potrzebuje tego cyklu. */
import { formatujDatePl } from '@/components/blog/PostMeta';
import { Logo } from './Logo';
import { SocialIcon, BRAND_COLORS } from './SocialIcon';

/**
 * Linki "Strony" bez "/uslugi" — usługi mają własną kolumnę z 6 realnymi stronami,
 * a hub /uslugi nie jest jeszcze live (lib/site.ts). Zero martwych linków w stopce.
 */
const FOOTER_NAV_REST = NAV_LINKS.filter((l) => l.href !== '/uslugi');

/**
 * Footer — CIEMNA stopka (świat B: tokeny globalne są ciemne, zero zmian klas
 * tonów). `bg-bg-subtle` = navy-900 (stopień jaśniej od bazy) + górna linia
 * (biały włos) oddzielają ją od treści. Wszystko w HTML (sygnały zaufania
 * cytowalne). Data = bramkarz GEO.
 *
 * NAP bierzemy z SITE (single source of truth). Telefon/adres pokazujemy TYLKO
 * gdy realne (pole SITE.contact.phone puste -> nie renderujemy fałszywej danej).
 */
/**
 * DATA W STOPCE = REALNA (raport SEO 2026-09-05 §4 i §8 krok 3).
 *
 * Do tej poprawki stała tu zahardkodowana '2026-06-15', renderowana na KAŻDEJ
 * stronie: Google czytał serwis jako stojący od trzech miesięcy. Teraz data
 * to MAKSIMUM pól `dataAktualizacji` ze wszystkich rejestrów treści, które
 * to pole niosą (usługi, podstrony usług, blog, poradniki, materiały,
 * AI Radar). Zmiana treści w rejestrze = bump tego pola = nowa data w stopce,
 * bez ręcznej edycji tego pliku.
 *
 * NIGDY `new Date()` przy buildzie: data builda to fałszywa świeżość, którą
 * boty czytają jako sygnał śmieciowy (ta sama zasada co sitemap lastmod).
 * Liczone RAZ w module (SSG), nie w renderze. ISO YYYY-MM-DD porównuje się
 * leksykograficznie = chronologicznie (wzorzec: app/blog/page.tsx).
 *
 * Realizacje (lib/realizacje) NIE mają pola `dataAktualizacji` (dług
 * zgłoszony w app/sitemap.ts), więc nie wchodzą do maksimum.
 */
const DATY_TRESCI: readonly string[] = [
  ...USLUGI.map((u) => u.dataAktualizacji),
  ...PODSTRONY_SITEMAP.map((p) => p.dataAktualizacji),
  ...POSTS.map((p) => p.dataAktualizacji),
  ...PORADNIKI.map((p) => p.dataAktualizacji),
  ...MATERIALY.map((m) => m.dataAktualizacji),
  ...RADAR_NEWS.map((n) => n.dataAktualizacji),
];
const LAST_UPDATED = DATY_TRESCI.reduce((max, d) => (d > max ? d : max), '');
const LAST_UPDATED_LABEL = formatujDatePl(LAST_UPDATED);

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
              karcie. Świat B: w spoczynku JAŚNIEJSZE (fg-muted, 6.64:1 — fg-subtle
              gasł na granacie), na hover/focus: kolor marki + powiększenie +
              delikatny lift. Płynna animacja czystym CSS (bez biblioteki, zgodnie
              z decyzją perf). Kolor per marka przez --brand.
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
                    className="inline-flex text-fg-muted transition-[color,transform] duration-base ease-out hover:-translate-y-0.5 hover:scale-110 hover:text-[color:var(--brand)] focus-visible:-translate-y-0.5 focus-visible:scale-110 focus-visible:text-[color:var(--brand)] motion-reduce:transform-none motion-reduce:transition-colors"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*
            ETYKIETY KOLUMN BEZ RANGI NAGŁÓWKA (raport SEO 2026-09-05 §8 krok 3):
            „Usługi", „Strony", „Kontakt" były <h2> i wchodziły do szkieletu
            nagłówków KAŻDEJ strony, rozmywając jej temat. Teraz <p>. Struktura
            dla czytnika ekranu zostaje: <footer> (landmark contentinfo) i dwa
            <nav aria-label>. Wygląd 1:1: te same klasy plus font-display,
            font-extrabold i text-balance, bo dokładnie te trzy cechy (Plus
            Jakarta Sans, waga 800, text-wrap: balance) <h2> dostawał z reguł
            bazowych app/globals.css (h1-h4 i h2), a <p> ich nie ma. Zmierzone
            computed-style przed i po: identyczne.
          */}
          {/* Usługi — 6 realnych stron, anchor = H1 = money query (linkowanie pod GEO) */}
          <nav aria-label="Stopka: usługi">
            <p className="mb-3 font-display text-overline font-extrabold uppercase text-balance text-fg-subtle">Usługi</p>
            <ul className="space-y-2">
              {USLUGI.map((u) => (
                <li key={u.slug}>
                  <Link
                    href={`/uslugi/${u.slug}`}
                    className="u-slide text-body-sm text-fg-muted hover:text-fg"
                  >
                    {u.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Nawigacja */}
          <nav aria-label="Stopka: strony">
            <p className="mb-3 font-display text-overline font-extrabold uppercase text-balance text-fg-subtle">Strony</p>
            <ul className="space-y-2">
              {FOOTER_NAV_REST.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="u-slide text-body-sm text-fg-muted hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kontakt" className="u-slide text-body-sm text-fg-muted hover:text-fg">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href={LEGAL_ROUTES.privacy} className="u-slide text-body-sm text-fg-muted hover:text-fg">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </nav>

          {/* Kontakt / NAP */}
          <div>
            <p className="mb-3 font-display text-overline font-extrabold uppercase text-balance text-fg-subtle">Kontakt</p>
            <ul className="space-y-2 text-body-sm text-fg-muted">
              <li>{SITE.name}</li>
              {/* E-mail TYLKO gdy zweryfikowany (nie sam niepusty string) — patrz SITE.contact */}
              {SITE.contact.emailVerified && SITE.contact.email && (
                <li>
                  <TrackedLink
                    href={`mailto:${SITE.contact.email}`}
                    event="klik_email"
                    className="u-slide hover:text-fg"
                  >
                    {SITE.contact.email}
                  </TrackedLink>
                </li>
              )}
              {SITE.contact.phone && (
                <li>
                  <TrackedLink
                    href={`tel:${SITE.contact.phone}`}
                    event="klik_telefon"
                    className="u-slide hover:text-fg"
                  >
                    {SITE.contact.phone}
                  </TrackedLink>
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
            <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
