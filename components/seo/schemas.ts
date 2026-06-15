import { SITE } from '@/lib/site';
import type { Usluga } from '@/lib/uslugi/types';
import type { Post } from '@/lib/blog/types';
import type { Realizacja } from '@/lib/realizacje/types';

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

export const organizationSchema = (): Json => {
  const org: Json = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    // logo: CELOWO usunięte do czasu dostarczenia public/logo.png (512x512).
    // Martwy ImageObject (404) psuje walidację encji w Google i LLM bardziej niż
    // jego brak. Emitujemy logo TYLKO gdy SITE.assetsReady === true (plik istnieje).
    // INPUT PAWŁA: gdy logo.png powstanie, ustawić assetsReady = true — pole wejdzie samo.
    description: SITE.description,
    // DWÓCH founderów (Paweł Pieloch, Marcin Karpeta) — pełen skład z SITE.founders.
    founder: SITE.founders.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.jobTitle,
    })),
    areaServed: { '@type': 'Country', name: 'Polska' },
    knowsLanguage: 'pl',
    sameAs: SITE.sameAs,
  };

  // logo wchodzi do schema TYLKO gdy plik realnie istnieje (assetsReady).
  if (SITE.assetsReady) {
    org.logo = {
      '@type': 'ImageObject',
      url: `${SITE.url}/logo.png`,
      width: 512,
      height: 512,
    };
  }

  // ContactPoint — realny telefon/e-mail (główny NAP). E-mail tylko gdy zweryfikowany,
  // telefon tylko gdy podany. Zero zmyślonych danych kontaktowych w schema.
  const contactPoint: Json = {
    '@type': 'ContactPoint',
    contactType: 'sales',
    areaServed: SITE.contact.areaServed,
    availableLanguage: ['pl'],
  };
  if (SITE.contact.phone) contactPoint.telephone = SITE.contact.phone;
  if (SITE.contact.emailVerified && SITE.contact.email) {
    contactPoint.email = SITE.contact.email;
  }
  if (contactPoint.telephone || contactPoint.email) {
    org.contactPoint = contactPoint;
  }

  return org;
};

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

/**
 * uslugaSchemas — buduje KOMPLET JSON-LD dla strony usługi z obiektu `Usluga`:
 * Service (provider -> #organization) + FAQPage (1:1 z widoczną sekcją FAQ) +
 * BreadcrumbList (Strona główna -> Usługi -> [usługa]).
 *
 * To jedyny punkt mapujący pola PL `Usluga` na schema.org. Dzięki temu strona
 * (page.tsx) nie powtarza tej logiki, a tekst FAQ jest gwarantowanie ten sam
 * w schema i w HTML (te same stringi `faq[].odpowiedz`).
 *
 * `offers` (w Service) wchodzi TYLKO gdy `ramaCeny.minPrice` jest realną liczbą
 * spójną z UI — inaczej brak ceny w schema (north star #6: zero zmyślonych cen).
 *
 * `basePath` = prefix huba usług (domyślnie '/uslugi'). Pełny URL strony =
 * `${basePath}/${usluga.slug}`.
 */
export const uslugaSchemas = (
  usluga: Usluga,
  basePath = '/uslugi'
): { service: Json; faq: Json; breadcrumb: Json } => {
  const path = `${basePath}/${usluga.slug}`;

  const service = serviceSchema({
    serviceType: usluga.h1,
    name: usluga.h1,
    description: usluga.kapsula,
    path,
    minPrice: usluga.ramaCeny.minPrice,
  });

  const faq = faqSchema(
    usluga.faq.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
    path
  );

  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Usługi', path: basePath },
    { name: usluga.h1, path },
  ]);

  return { service, faq, breadcrumb };
};

/**
 * Article — schema wpisu bloga (spec 04 §6, higiena GEO).
 *
 * `author` i `publisher` linkują się do encji firmy/foundera (E-E-A-T). Autorem
 * treści jest Paweł (twarz marki, `SITE.founder`); wydawcą jest Organization
 * (przez @id, definiowane globalnie w layout.tsx). `datePublished`/`dateModified`
 * to REALNE daty z `Post` (nie `new Date()` przy buildzie). `image` emitujemy
 * TYLKO gdy assety istnieją (SITE.assetsReady) — martwy ImageObject (404) szkodzi
 * walidacji encji bardziej niż jego brak.
 */
export const articleSchema = (p: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  section?: string;
  keywords?: string[];
  image?: string;
}): Json => {
  const article: Json = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${abs(p.path)}/#article`,
    headline: p.headline,
    description: p.description,
    inLanguage: 'pl-PL',
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(p.path) },
    // Autor = Paweł (twarz/autor treści). Tylko realne dane.
    author: {
      '@type': 'Person',
      name: SITE.founder.name,
      jobTitle: SITE.founder.jobTitle,
    },
    // Wydawca = Organization (encja z layoutu, spięta po @id).
    publisher: { '@id': `${SITE.url}/#organization` },
  };
  if (p.section) article.articleSection = p.section;
  if (p.keywords && p.keywords.length > 0) article.keywords = p.keywords.join(', ');
  // Obraz wpisu wchodzi do schema tylko gdy plik realnie istnieje (assetsReady).
  if (SITE.assetsReady && p.image) {
    article.image = `${SITE.url}${p.image}`;
  }
  return article;
};

/**
 * postSchemas — KOMPLET JSON-LD dla wpisu bloga z obiektu `Post`:
 * Article (author -> Paweł, publisher -> #organization) + BreadcrumbList
 * (Strona główna -> Blog -> [wpis]) + opcjonalnie FAQPage (1:1 z widoczną sekcją
 * FAQ, gdy `post.faq` istnieje).
 *
 * To jedyny punkt mapujący pola PL `Post` na schema.org — strona (page.tsx) nie
 * powtarza tej logiki, a tekst FAQ jest gwarantowanie ten sam w schema i w HTML.
 *
 * `basePath` = prefix bloga (domyślnie '/blog'). Pełny URL wpisu = `${basePath}/${post.slug}`.
 */
export const postSchemas = (
  post: Post,
  basePath = '/blog'
): { article: Json; breadcrumb: Json; faq?: Json } => {
  const path = `${basePath}/${post.slug}`;

  const article = articleSchema({
    headline: post.tytul,
    description: post.lead,
    path,
    datePublished: post.data,
    dateModified: post.dataAktualizacji,
    section: post.kategoria,
    keywords: post.queries,
    // image: `/og/blog/${post.slug}.png` — wejdzie, gdy SITE.assetsReady i plik istnieje.
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Blog', path: basePath },
    { name: post.tytul, path },
  ]);

  const faq =
    post.faq && post.faq.length > 0
      ? faqSchema(
          post.faq.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
          path
        )
      : undefined;

  return { article, breadcrumb, faq };
};

/**
 * CreativeWork — schema case study (/realizacje/<slug>). Portfolio wdrożenia
 * autorstwa firmy. `creator` linkuje przez @id do Organization (encja z layoutu),
 * `about` opisuje dziedzinę usługi. To DANE referencyjne (higiena GEO), więc
 * każdy string musi być prawdziwy. `image` emitujemy TYLKO gdy assety istnieją
 * (SITE.assetsReady) — martwy ImageObject (404) szkodzi walidacji bardziej niż brak.
 */
export const creativeWorkSchema = (p: {
  name: string;
  description: string;
  path: string;
  about?: string;
  keywords?: string[];
  image?: string;
}): Json => {
  const work: Json = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${abs(p.path)}/#creativework`,
    name: p.name,
    description: p.description,
    inLanguage: 'pl-PL',
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(p.path) },
    // Twórca wdrożenia = Organization (encja z layoutu, spięta po @id).
    creator: { '@id': `${SITE.url}/#organization` },
  };
  if (p.about) work.about = p.about;
  if (p.keywords && p.keywords.length > 0) work.keywords = p.keywords.join(', ');
  if (SITE.assetsReady && p.image) {
    work.image = `${SITE.url}${p.image}`;
  }
  return work;
};

/**
 * realizacjaSchemas — KOMPLET JSON-LD dla case study z obiektu `Realizacja`:
 * CreativeWork (creator -> #organization) + BreadcrumbList (Strona główna ->
 * Realizacje -> [case]) + opcjonalnie FAQPage (1:1 z widoczną sekcją FAQ, gdy
 * `realizacja.faq` istnieje).
 *
 * To jedyny punkt mapujący pola PL `Realizacja` na schema.org — strona (page.tsx)
 * nie powtarza tej logiki, a tekst FAQ jest gwarantowanie ten sam w schema i w HTML.
 *
 * `basePath` = prefix huba realizacji (domyślnie '/realizacje'). Pełny URL case'a =
 * `${basePath}/${realizacja.slug}`.
 */
export const realizacjaSchemas = (
  realizacja: Realizacja,
  basePath = '/realizacje'
): { work: Json; breadcrumb: Json; faq?: Json } => {
  const path = `${basePath}/${realizacja.slug}`;

  const work = creativeWorkSchema({
    name: realizacja.h1,
    description: realizacja.kapsula,
    path,
    about: realizacja.branza,
    keywords: realizacja.queries,
    // image: `/og/realizacje/${realizacja.slug}.png` — wejdzie, gdy SITE.assetsReady i plik istnieje.
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Realizacje', path: basePath },
    { name: realizacja.h1, path },
  ]);

  const faq =
    realizacja.faq && realizacja.faq.length > 0
      ? faqSchema(
          realizacja.faq.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
          path
        )
      : undefined;

  return { work, breadcrumb, faq };
};
