import type { MetadataRoute } from 'next';
import { SITE, ROUTES, USLUGI_LAST_MODIFIED } from '@/lib/site';
import { USLUGI_SLUGS } from '@/lib/uslugi';
import { REALIZACJE_SLUGS } from '@/lib/realizacje';
import { POSTS } from '@/lib/blog';
import { PORADNIKI } from '@/lib/poradniki';
import { MATERIALY } from '@/lib/materialy';
import { RADAR_NEWS } from '@/lib/ai-radar';

/** Realna data publikacji realizacji (ostatnia rewizja treści) — do sitemap. */
const TRESC_LAST_MODIFIED = '2026-06-15';

/**
 * sitemap.xml generowany dynamicznie (spec 04 §10, 01 §7.2).
 *
 * DWA ZRODLA, jedna zasada (emit tylko to, co realnie istnieje, 200 OK, index):
 *  1) ROUTES (lib/site.ts) — strony statyczne; emitowane tylko gdy `live: true`.
 *  2) USLUGI_SLUGS (rejestr lib/uslugi) — 6 stron uslug /uslugi/<slug>. Ich URL bierze
 *     sie wprost z rejestru, ktory napedza tez generateStaticParams (SSG) i nawigacje.
 *     Slug w trasie, w linkach i w sitemapie nie moze sie rozjechac (zamyka bloker #1).
 *
 * Zelazna zasada sitemapy: zaden URL z 404, redirectu ani `noindex`. Wpisanie
 * nieistniejacej strony to wyslanie botom AI martwego linku = strata crawl-budzetu.
 *
 * `lastModified` = REALNA data ostatniej zmiany tresci, NIE `new Date()` przy kazdym
 * buildzie — falszywa swiezosc traci wartosc GEO.
 *
 * Gdy powstanie warstwa tresci (lib/content.ts), dolaczyc tu posty bloga i realizacje
 * z `dateModified` z frontmatter.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.filter((route) => route.live).map((route) => ({
    url: `${SITE.url}${route.path === '/' ? '' : route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 6 stron uslug — zrodlo prawdy = rejestr lib/uslugi (USLUGI_SLUGS).
  const uslugiRoutes: MetadataRoute.Sitemap = USLUGI_SLUGS.map((slug) => ({
    url: `${SITE.url}/uslugi/${slug}`,
    lastModified: new Date(USLUGI_LAST_MODIFIED),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Realizacje (case studies) — zrodlo prawdy = rejestr lib/realizacje.
  const realizacjeRoutes: MetadataRoute.Sitemap = REALIZACJE_SLUGS.map((slug) => ({
    url: `${SITE.url}/realizacje/${slug}`,
    lastModified: new Date(TRESC_LAST_MODIFIED),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Wpisy bloga — zrodlo prawdy = rejestr lib/blog; lastmod z daty wpisu.
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.data),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Poradniki (Centrum Wiedzy) — zrodlo prawdy = rejestr lib/poradniki; lastmod z dataAktualizacji.
  const poradnikiRoutes: MetadataRoute.Sitemap = PORADNIKI.map((p) => ({
    url: `${SITE.url}/poradniki/${p.slug}`,
    lastModified: new Date(p.dataAktualizacji),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Lead magnety (Centrum Wiedzy -> Materialy) — zrodlo prawdy = rejestr lib/materialy;
  // lastmod z dataAktualizacji. Pelna tresc kazdego magnetu jest SSG (200 OK).
  const materialyRoutes: MetadataRoute.Sitemap = MATERIALY.map((m) => ({
    url: `${SITE.url}/materialy/${m.slug}`,
    lastModified: new Date(m.dataAktualizacji),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // AI Radar (Centrum Wiedzy -> AI Radar) — zrodlo prawdy = rejestr lib/ai-radar;
  // lastmod z `data`. UWAGA na zelazna zasade (zaden noindex w sitemapie): wpisy
  // startowe to SZABLONY formatu (szablon:true), a ich strony /ai-radar/[slug] maja
  // robots noindex (przyklad formatu, nie realny news). Dlatego filtrujemy je TUTAJ —
  // do sitemapy trafiaja wylacznie REALNE newsy (szablon !== true). Hub /ai-radar jest
  // index i wchodzi osobno przez ROUTES. Gdy redakcja doda realny news, pojawi sie tu
  // automatycznie. Na start lista jest pusta (oba wpisy to szablony) — zero noindex URL.
  const aiRadarRoutes: MetadataRoute.Sitemap = RADAR_NEWS.filter(
    (n) => n.szablon !== true
  ).map((n) => ({
    url: `${SITE.url}/ai-radar/${n.slug}`,
    lastModified: new Date(n.data),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...uslugiRoutes,
    ...realizacjeRoutes,
    ...blogRoutes,
    ...poradnikiRoutes,
    ...materialyRoutes,
    ...aiRadarRoutes,
  ];
}
