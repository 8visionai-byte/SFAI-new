import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { postSchemas } from '@/components/seo/schemas';
import { POSTS_SLUGS, getPostBySlug } from '@/lib/blog';

import { PostHero, PostBody, PostFAQ } from '@/components/blog';

/**
 * DYNAMICZNA TRASA WPISÓW BLOGA — jeden szablon, N wpisów, SSG.
 *
 * SILNIK (1 trasa + dane z lib/blog + komponenty z components/blog):
 *  - generateStaticParams() bierze slugi z rejestru -> Next prerenderuje każdy wpis
 *    statycznie (KPI #1: pełna treść w HTML przy 1. żądaniu, nie CSR).
 *  - dynamicParams=false: każdy slug spoza rejestru = 404 (sitemap bez martwych URL).
 *  - generateMetadata() buduje title/description/canonical/OG per wpis.
 *  - render: hero answer-first + treść (bloki) + opcjonalne FAQ; JSON-LD Article +
 *    BreadcrumbList (+ FAQPage gdy wpis ma faq) WSTRZYKNIĘTE SERWEROWO (widoczne dla
 *    botów bez JS). Organization + WebSite są globalnie w layout.tsx.
 *
 * UWAGA (live w sitemapie): trasa /blog jest w ROUTES `live: false`. Ten plik sprawia,
 * że URL-e wpisów ISTNIEJĄ (200 OK) i są SSG, ale do sitemap.xml wejdą dopiero po
 * świadomym podłączeniu rejestru bloga w app/sitemap.ts i flipie `live: true` (po
 * uzupełnieniu treści fazą 4 i weryfikacji 200 OK). To celowe rozdzielenie:
 * „strona gotowa" vs „ogłoszona botom".
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

type Params = { slug: string };

/** SSG: lista slugów z rejestru = zbiór wpisów do prerenderu. */
export function generateStaticParams(): Params[] {
  return POSTS_SLUGS.map((slug) => ({ slug }));
}

/** Metadata per wpis: title z marką (template w layout), opis, canonical, OG. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Nie znaleziono wpisu',
      description: 'Ten wpis nie istnieje. Sprawdź listę wpisów na blogu SimpleFast.ai.',
      path: `/blog/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    // ogImage per wpis wejdzie, gdy SITE.assetsReady i pliki będą istnieć:
    // ogImage: `/og/blog/${post.slug}.png`,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Komplet JSON-LD z jednego źródła (post) — tekst FAQ 1:1 z sekcją PostFAQ.
  const { article, breadcrumb, faq } = postSchemas(post);

  return (
    <main id="main">
      {/* Hero answer-first: breadcrumbs + kategoria + H1 + lead + meta (daty) */}
      <PostHero post={post} />

      {/* Treść wpisu — bloki renderowane serwerowo (faza 4 wypełnia sekcje) */}
      <PostBody tresc={post.tresc} />

      {/* Opcjonalne FAQ — 1:1 z FAQPage JSON-LD (render tylko gdy są pytania) */}
      {post.faq && post.faq.length > 0 && <PostFAQ faq={post.faq} />}

      {/*
        JSON-LD wstrzyknięty SERWEROWO (w HTML przy 1. żądaniu, widoczny dla botów):
        - Article: author -> Paweł (twarz/autor), publisher -> #organization przez @id;
          datePublished/dateModified z realnych dat wpisu.
        - BreadcrumbList: Strona główna -> Blog -> [wpis].
        - FAQPage: tylko gdy post.faq istnieje (tekst 1:1 z sekcją PostFAQ).
      */}
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      {faq && <JsonLd data={faq} />}
    </main>
  );
}
