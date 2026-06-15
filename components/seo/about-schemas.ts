import { SITE } from '@/lib/site';
import { breadcrumbSchema } from './schemas';

/**
 * JSON-LD strony /o-nas (E-E-A-T). Wydzielone z components/seo/schemas.ts do
 * osobnego modułu — pojedyncza odpowiedzialność (About + Person), spójnie z tym,
 * że schemas.ts rośnie o kolejne typy stron (Service, Article...).
 *
 * Higiena GEO (jak w schemas.ts): każda dana w schema musi być PRAWDZIWA. Pola
 * opcjonalne (email osoby, zdjęcie, sameAs) wchodzą TYLKO gdy realne. Organization
 * i WebSite są globalne (layout.tsx) — tu ich NIE dublujemy, tylko linkujemy po @id.
 */

type Json = Record<string, unknown>;

/** Absolutny URL z path (root '/' bez podwójnego slasha w @id). Lustro helpera z schemas.ts. */
const abs = (path: string): string => `${SITE.url}${path === '/' ? '' : path}`;

/**
 * Slug osoby do stabilnego @id (`#person-<slug>`), np. „Paweł Pieloch" -> „pawel-pieloch".
 * Zdejmuje polskie diakrytyki (w tym „ł", którego NFD nie rozkłada) i znaki spoza [a-z0-9].
 */
const personIdSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Person — sylwetka jednego foundera. `worksFor` linkuje do #organization (layout)
 * przez @id, więc Google/LLM łączą osobę z firmą w jeden graf. Stabilne @id pozwala
 * referować tę osobę też z innych miejsc (np. autor wpisów bloga w przyszłości).
 *
 * Pola opcjonalne wchodzą TYLKO gdy realne:
 *  - email: tylko gdy zweryfikowany globalnie (SITE.contact.emailVerified),
 *  - image: tylko gdy SITE.assetsReady i ścieżka podana (inaczej 404 psuje encję),
 *  - sameAs: tylko realne profile (dziś brak zweryfikowanych -> pomijamy, zero TODO-URLi).
 */
export const personSchema = (p: {
  name: string;
  jobTitle: string;
  path: string;
  email?: string;
  sameAs?: string[];
  imageUrl?: string;
}): Json => {
  const person: Json = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person-${personIdSlug(p.name)}`,
    name: p.name,
    jobTitle: p.jobTitle,
    worksFor: { '@id': `${SITE.url}/#organization` },
    url: abs(p.path),
  };
  if (p.email) person.email = p.email;
  if (p.imageUrl) person.image = p.imageUrl;
  if (p.sameAs && p.sameAs.length > 0) person.sameAs = p.sameAs;
  return person;
};

/**
 * AboutPage — typ strony /o-nas. `mainEntity` -> #organization (strona opisuje firmę),
 * Person-y emitowane osobno (każdy worksFor -> #organization). Graf spójny:
 * AboutPage -> Organization <- Person × 2.
 */
export const aboutPageSchema = (path: string): Json => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${abs(path)}/#aboutpage`,
  url: abs(path),
  name: 'O nas',
  inLanguage: 'pl-PL',
  isPartOf: { '@id': `${SITE.url}/#website` },
  mainEntity: { '@id': `${SITE.url}/#organization` },
});

/**
 * aboutSchemas — KOMPLET JSON-LD dla /o-nas:
 *  - AboutPage (mainEntity -> #organization),
 *  - Person × 2 (z SITE.founders, worksFor -> #organization),
 *  - BreadcrumbList (Strona główna -> O nas) — z gotowego breadcrumbSchema (schemas.ts).
 *
 * `photoByName` (opcjonalne) = słownik imię -> ścieżka zdjęcia (z lib/o-nas). Wchodzi
 * do Person.image TYLKO gdy SITE.assetsReady. E-mail osoby tylko gdy zweryfikowany.
 */
export const aboutSchemas = (
  path = '/o-nas',
  opts?: { photoByName?: Record<string, string> }
): { about: Json; persons: Json[]; breadcrumb: Json } => {
  const persons = SITE.founders.map((f) => {
    const photo = opts?.photoByName?.[f.name];
    return personSchema({
      name: f.name,
      jobTitle: f.jobTitle,
      path,
      email: SITE.contact.emailVerified ? f.email : undefined,
      imageUrl: SITE.assetsReady && photo ? `${SITE.url}${photo}` : undefined,
    });
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'O nas', path },
  ]);

  return { about: aboutPageSchema(path), persons, breadcrumb };
};
