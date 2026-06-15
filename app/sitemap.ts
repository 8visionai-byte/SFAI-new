import type { MetadataRoute } from 'next';
import { SITE, ROUTES } from '@/lib/site';

/**
 * sitemap.xml generowany dynamicznie (spec 04 §10, 01 §7.2).
 *
 * Emituje WYLACZNIE trasy `live: true` z rejestru ROUTES (lib/site.ts) — czyli
 * tylko strony, ktore realnie istnieja i zwracaja 200 OK. To zelazna zasada
 * sitemapy: zaden URL z 404, redirectu ani `noindex`. Wpisanie nieistniejacej
 * strony to wyslanie botom AI martwego linku.
 *
 * `lastModified` = REALNA data ostatniej zmiany tresci (z ROUTES / frontmatter),
 * NIE `new Date()` przy kazdym buildzie — falszywa swiezosc traci wartosc GEO.
 *
 * Gdy powstanie warstwa tresci (lib/content.ts), dolaczyc tu posty bloga i
 * realizacje z `dateModified` z frontmatter (rozwin ROUTES lub zlacz dwie listy).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.filter((route) => route.live).map((route) => ({
    url: `${SITE.url}${route.path === '/' ? '' : route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
