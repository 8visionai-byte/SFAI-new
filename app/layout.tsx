import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/components/seo/schemas';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatLauncher } from '@/components/demo/ChatLauncher';
import { FaviconPulse } from '@/components/effects/FaviconPulse';

/**
 * Fonty self-host przez next/font/google (zero requestów do fonts.googleapis.com,
 * brak CLS dzięki metrycznemu fallbackowi). subsets latin + latin-ext = polskie znaki.
 * Plus Jakarta Sans (nagłówki, przyjazny i czytelny) + Inter (tekst) = 1 display +
 * 1 tekstowy (north star #4). Zmiana z Fraunces na życzenie Pawła („bardziej przystępny").
 */
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url), // KONIECZNE — OG/canonical z relatywnych ścieżek
  title: {
    default: 'SimpleFast.ai: Architekt AI full-stack dla firm',
    template: '%s · SimpleFast.ai',
  },
  description: SITE.description,
  // Author = founder ze schema (fix SEO 05 §3.7) — spójność encji dla GEO.
  authors: [{ name: SITE.founder.name }],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    title: 'SimpleFast.ai: Architekt AI full-stack dla firm',
    description: SITE.description,
  },
  // Ikony emitujemy TYLKO gdy pliki istnieją (SITE.assetsReady). Wskazywanie na
  // nieistniejący favicon.ico/icon.svg = 404. INPUT PAWŁA: dostarczyć pliki i
  // przełączyć SITE.assetsReady = true.
  ...(SITE.assetsReady
    ? {
        icons: {
          icon: '/favicon.ico',
          shortcut: '/favicon.ico',
          apple: '/icon.png',
        },
      }
    : {}),
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        {/* Skip-link — pierwsza rzecz w tab order (bramka A11y) */}
        <a href="#main" className="skip-link">
          Przejdź do treści
        </a>

        <Header />
        {children}
        <Footer />

        {/* Pływający launcher czatu (STUB demo) — nie blokuje treści/indeksacji */}
        <ChatLauncher />

        {/* Pulsujący favicon w karcie (efekt „live", canvas) — reduced-motion safe */}
        <FaviconPulse />

        {/* Schema globalna — Organization + WebSite na każdej stronie (spec 04 §6.2–6.3) */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
