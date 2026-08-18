import type { MetadataRoute } from 'next';
import { SITE, ROUTES, V22_LAST_MODIFIED } from '@/lib/site';
import { USLUGI } from '@/lib/uslugi';
import { PODSTRONY_SITEMAP } from '@/lib/uslugi/podstrony';
import { REALIZACJE_SLUGS } from '@/lib/realizacje';
import { POSTS } from '@/lib/blog';
import { PORADNIKI } from '@/lib/poradniki';
import { MATERIALY } from '@/lib/materialy';
import { RADAR_NEWS } from '@/lib/ai-radar';

/**
 * Wspolny `lastmod` 8 realizacji (/realizacje/<slug>).
 *
 * v22 dogrywka (kontrola v22 MAJOR-4): wszystkie osiem plikow rejestru
 * (lib/realizacje/*.ts) zmienil TEN SAM commit 2b2c1b4, po +40 linii kazdy
 * (karta wdrozenia, powiazania, tabela), wiec jedna data dla calej osemki jest
 * tu prawdziwa, a nie wygodna. Wczesniej stalo tu '2026-06-15', czyli data
 * postawienia case'ow: osiem najmocniej przebudowanych stron dowodu mowilo
 * Google „bez zmian".
 *
 * DLUG TECHNICZNY (zgloszony kontroli, patrz raport dogrywki): `Realizacja`
 * jako JEDYNY rejestr tresci nie ma pola `dataAktualizacji` (maja je
 * lib/blog/types.ts:245, lib/poradniki, lib/materialy). Docelowo ta stala
 * znika, a lastmod idzie z `r.dataAktualizacji` per case. lib/realizacje NIE
 * NALEZY do wlasciciela tego pliku, wiec pole dokleja partia rejestru.
 */
const TRESC_LAST_MODIFIED = V22_LAST_MODIFIED;

/**
 * sitemap.xml generowany dynamicznie (spec 04 §10, 01 §7.2).
 *
 * DWA ZRODLA, jedna zasada (emit tylko to, co realnie istnieje, 200 OK, index):
 *  1) ROUTES (lib/site.ts) — strony statyczne; emitowane tylko gdy `live: true`.
 *  2) USLUGI (rejestr lib/uslugi) — strony uslug /uslugi/<slug>. URL i `lastmod` bierza
 *     sie wprost z rejestru, ktory napedza tez generateStaticParams (SSG) i nawigacje.
 *     Slug w trasie, w linkach i w sitemapie nie moze sie rozjechac (zamyka bloker #1).
 *
 * Zelazna zasada sitemapy: zaden URL z 404, redirectu ani `noindex`. Wpisanie
 * nieistniejacej strony to wyslanie botom AI martwego linku = strata crawl-budzetu.
 *
 * `lastModified` = REALNA data ostatniej zmiany tresci, NIE `new Date()` przy kazdym
 * buildzie — falszywa swiezosc traci wartosc GEO.
 *
 * ============================================================================
 * JEDNA POLITYKA `lastmod` (v22 dogrywka, kontrola v22 MAJOR-4)
 * ============================================================================
 * Regula, ktora obowiazuje KAZDA z ponizszych grup, bez wyjatkow:
 *
 *   lastmod trasy = data ostatniego commita, ktory realnie zmienil TRESC tej
 *   trasy (plik strony albo jej wpis w rejestrze).
 *
 * Trzy konsekwencje, z ktorych zadna nie jest opcjonalna:
 *  1) ZRODLEM JEST REJESTR, NIE STALA. Kazdy rejestr tresci niesie wlasne pole
 *     daty i to ono idzie do sitemapy. Wspolna stala jest dopuszczalna TYLKO
 *     wtedy, gdy jeden commit zmienil wszystkie pozycje grupy naraz (dzis:
 *     8 realizacji, patrz TRESC_LAST_MODIFIED nizej) i wtedy musi to byc
 *     napisane wprost przy stalej.
 *  2) BIERZEMY DATE MODYFIKACJI, NIE PUBLIKACJI. Gdzie rejestr ma oba pola
 *     (`data` + `dataAktualizacji`), lastmod idzie z `dataAktualizacji`.
 *     `data` zostaje datePublished w schemacie Article, i tylko tam.
 *  3) AWANSUJEMY WYLACZNIE TO, CO SIE ZMIENILO. Runda v22 (commit 2b2c1b4)
 *     dostaje `V22_LAST_MODIFIED` z lib/site.ts. Trasy, ktorych ta runda nie
 *     tknela, zostaja na swoich datach. Podniesienie daty stronie, ktora sie
 *     nie zmienila, to ten sam falszywy sygnal co `new Date()`.
 *
 * Weryfikacja kazdej wartosci jest mechaniczna:
 *   git log -1 --date=short --format=%ad -- <plik rejestru albo strony>
 * ============================================================================
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.filter((route) => route.live).map((route) => ({
    url: `${SITE.url}${route.path === '/' ? '' : route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Strony uslug — zrodlo prawdy = rejestr lib/uslugi (USLUGI).
  // SEO 2026-08-17: lastmod bierzemy z `u.dataAktualizacji` (pole per usluga), nie ze
  // wspolnej stalej USLUGI_LAST_MODIFIED. Wczesniej WSZYSTKIE uslugi raportowaly jedna
  // czerwcowa date, wiec sierpniowe zmiany tresci byly dla botow niewidoczne. Stala
  // zostaje w lib/site.ts, bo napedza jeszcze hub /uslugi i /uslugi/architekci-wartosci-ai.
  const uslugiRoutes: MetadataRoute.Sitemap = USLUGI.map((u) => ({
    url: `${SITE.url}/uslugi/${u.slug}`,
    lastModified: new Date(u.dataAktualizacji),
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

  // Wpisy bloga: zrodlo prawdy = rejestr lib/blog.
  // v22 dogrywka (MAJOR-4, punkt 2 polityki wyzej): lastmod idzie z
  // `p.dataAktualizacji` (= Article.dateModified, lib/blog/types.ts:241-245),
  // a NIE z `p.data`, ktora jest data PUBLIKACJI i po redakcji wpisu nigdy sie
  // nie zmienia. Wczesniej sitemapa czytala `p.data`, wiec kazda przyszla
  // aktualizacja wpisu byla dla botow niewidoczna, nawet po podbiciu pola
  // w rejestrze. Dzis oba pola maja te sama wartosc, wiec ta zmiana NIE rusza
  // dzisiejszego XML-a: naprawia mechanizm, nie liczbe.
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.dataAktualizacji),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Poradniki (Centrum Wiedzy) — zrodlo prawdy = rejestr lib/poradniki; lastmod z dataAktualizacji.
  // Podstrony uslug (/uslugi/<rodzic>/<slug>) — rejestr lib/uslugi/podstrony.
  // Kazda niesie WLASNA dataAktualizacji (jak poradniki), zero wspolnych stalych.
  // priority 0.7: nizej niz strona macierzysta uslugi (0.9), wyzej niz blog (0.6) —
  // to strony pod konkretna intencje wyszukiwania, nie tresci pomocnicze.
  const podstronyRoutes: MetadataRoute.Sitemap = PODSTRONY_SITEMAP.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: new Date(p.dataAktualizacji),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

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
    ...podstronyRoutes,
    ...realizacjeRoutes,
    ...blogRoutes,
    ...poradnikiRoutes,
    ...materialyRoutes,
    ...aiRadarRoutes,
  ];
}
