import { SITE } from '@/lib/site';

/**
 * Funkcje budujące obiekty JSON-LD (spec 04 §6).
 * Higiena GEO: pomaga głównie w Google AI Overviews. Każda liczba/data/URL
 * musi być PRAWDZIWA. Pola opcjonalne (telefon, rating) dodajemy tylko gdy realne.
 *
 * @id linkują się spójnie: Organization <-> WebSite <-> Service (provider/publisher).
 */

type Json = Record<string, unknown>;

/**
 * Buduje absolutny URL z path. Normalizuje root ('/') tak, by nie powstawal
 * podwojny slash w @id (np. `https://simplefast.ai//#faq`) — schema z takim
 * @id jest niespojna i moze rozjechac powiazania Organization <-> WebSite <-> Service.
 */
const abs = (path: string): string =>
  `${SITE.url}${path === '/' ? '' : path}`;

export const organizationSchema = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  // logo: CELOWO usunięte do czasu dostarczenia public/logo.png (512x512).
  // Martwy ImageObject (404) psuje walidację encji w Google i LLM bardziej niż
  // jego brak. INPUT PAWŁA: gdy logo.png powstanie, przywrócić pole:
  //   logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png`, width: 512, height: 512 },
  description: SITE.description,
  founder: {
    '@type': 'Person',
    name: SITE.founder.name,
    jobTitle: SITE.founder.jobTitle,
  },
  areaServed: { '@type': 'Country', name: 'Polska' },
  knowsLanguage: 'pl',
  sameAs: SITE.sameAs,
});

export const websiteSchema = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: 'pl-PL',
  publisher: { '@id': `${SITE.url}/#organization` },
});

/**
 * Service — na każdej podstronie usługi.
 * `offers` dodaj TYLKO gdy podajemy realną cenę "od X" (spójną z ceną na stronie).
 */
export const serviceSchema = (p: {
  serviceType: string;
  name?: string;
  description: string;
  path: string;
  minPrice?: number;
}): Json => {
  const base: Json = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${abs(p.path)}/#service`,
    serviceType: p.serviceType,
    name: p.name ?? p.serviceType,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Polska' },
    description: p.description,
  };
  if (typeof p.minPrice === 'number') {
    base.offers = {
      '@type': 'Offer',
      priceCurrency: 'PLN',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'PLN',
        minPrice: String(p.minPrice),
        description: 'Cena od (zależna od zakresu integracji)',
      },
    };
  }
  return base;
};

/**
 * FAQPage — pod sekcją FAQ. Tekst odpowiedzi MUSI być identyczny z treścią na
 * stronie (Google karze rozjazd schema <-> treść).
 */
export const faqSchema = (
  items: { q: string; a: string }[],
  path: string
): Json => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${abs(path)}/#faq`,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

/**
 * BreadcrumbList — każda strona poza '/'.
 */
export const breadcrumbSchema = (
  items: { name: string; path: string }[]
): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: abs(item.path),
  })),
});
