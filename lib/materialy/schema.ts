import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from '@/components/seo/schemas';
import type { Material } from './types';

type Json = Record<string, unknown>;

/**
 * materialSchemas — KOMPLET JSON-LD dla strony lead magnetu z obiektu `Material`:
 * Article (author -> Paweł, publisher -> #organization) + BreadcrumbList
 * (Strona główna -> Centrum Wiedzy -> Materiały -> [materiał]) + opcjonalnie
 * FAQPage (1:1 z widoczną sekcją FAQ, gdy `material.faq` istnieje).
 *
 * Reużywa gotowych builderów ze components/seo/schemas (articleSchema /
 * breadcrumbSchema / faqSchema), więc @id, daty i powiązanie publisher-> #organization
 * są spójne z resztą serwisu. Magnet renderujemy jako Article (pełna, cytowalna
 * treść w HTML), a breadcrumb wiedzie przez hub /wiedza (materiały to dział
 * Centrum Wiedzy). To jedyny punkt mapujący pola PL `Material` na schema.org —
 * strona (page.tsx) nie powtarza logiki, a tekst FAQ jest gwarantowanie ten sam
 * w schema i w HTML.
 *
 * `basePath` = prefix huba materiałów (domyślnie '/materialy'). Pełny URL materiału =
 * `${basePath}/${material.slug}`.
 */
export const materialSchemas = (
  material: Material,
  basePath = '/materialy'
): { article: Json; breadcrumb: Json; faq?: Json } => {
  const path = `${basePath}/${material.slug}`;

  const article = articleSchema({
    headline: material.tytul,
    description: material.opis,
    path,
    datePublished: material.data,
    dateModified: material.dataAktualizacji,
    section: 'Materiały do pobrania',
    keywords: material.queries,
    // image: `/og/materialy/${material.slug}.png` — wejdzie, gdy SITE.assetsReady i plik istnieje.
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Strona główna', path: '/' },
    { name: 'Centrum Wiedzy', path: '/wiedza' },
    { name: 'Materiały', path: basePath },
    { name: material.tytul, path },
  ]);

  const faq =
    material.faq && material.faq.length > 0
      ? faqSchema(
          material.faq.map((item) => ({ q: item.pytanie, a: item.odpowiedz })),
          path
        )
      : undefined;

  return { article, breadcrumb, faq };
};
