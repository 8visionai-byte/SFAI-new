/**
 * Barrel — komponenty bloga (silnik + lista). Wzorzec spójny z components/uslugi.
 * Import: import { PostHero, PostBody, PostCard, ... } from '@/components/blog';
 */
export { BlogBreadcrumbs } from './BlogBreadcrumbs';
export { PostHero } from './PostHero';
export { PostMeta, formatujDatePl } from './PostMeta';
export { PostBody } from './PostBody';
/* v22: jedyny render tabeli w serwisie (konsumenci: PostBody, MaterialBody
   przez PostBody, TabelaRejestru na hubach). */
export { TabelaRender } from './TabelaRender';
export type { TabelaRenderProps } from './TabelaRender';
export { PostFAQ } from './PostFAQ';
export { PostCard, PostCardWkrotce } from './PostCard';
