import type { Metadata } from 'next';
import { SITE } from './site';

/**
 * buildMetadata — helper Metadata API per strona (spec 04 §7).
 * Tytuł BEZ sufiksu marki (dodaje go template w layout.tsx).
 * Reguły copy: opis 140–160 znaków, konkret + liczba/czas, zero hedgingu,
 * zero długiego myślnika (em-dash), zero żargonu (głos Pawła).
 */
type Args = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noindex,
}: Args): Metadata {
  const url = `${SITE.url}${path}`;
  const image = `${SITE.url}${ogImage ?? SITE.ogImageDefault}`;

  // OG/twitter image emitujemy TYLKO gdy plik realnie istnieje (SITE.ogReady).
  // Pliki public/og/*.png (1200x630) sa juz dostarczone, wiec ogReady=true.
  const og = SITE.ogReady
    ? { images: [{ url: image, width: 1200, height: 630, alt: title }] }
    : {};
  const tw = SITE.ogReady ? { images: [image] } : {};

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      ...og,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...tw,
    },
  };
}
