import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/components/seo/schemas';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatLauncher } from '@/components/demo/ChatLauncher';
import { FaviconPulse } from '@/components/effects/FaviconPulse';
import { AuraDesync } from '@/components/effects/AuraDesync';
import { MotionGate } from '@/components/motion/MotionGate';

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

/* INFINITY: mono-akcent wzorca (overline'y, chipy, tagi, liczniki, CTA).
   Tylko 2 wagi — mono to przyprawa, nie font treści. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
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
  // ŚWIAT B / INFINITY: cała strona jest ciemna — pasek przeglądarki zawsze
  // w pogłębionej czerni kadru (--bg #06070d), niezależnie od systemowego
  // schematu kolorów.
  themeColor: '#06070d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Skip-link — pierwsza rzecz w tab order (bramka A11y) */}
        <a href="#main" className="skip-link">
          Przejdź do treści
        </a>

        {/* INFINITY: starfield strony — dekoracja FIXED pod całą treścią
            (wzór .bg-metal-decor w ScrollMetalProgress: fixed + pointer-events
            none; tu z-index:-1). Czysty CSS, zero JS; sekcje z własnym solidnym
            tłem kryją go naturalnie. Drift tylko desktop (bramka w CSS). */}
        <div aria-hidden="true" className="inf-stars" />

        <Header />
        {children}
        <Footer />

        {/* Pływający launcher czatu (STUB demo) — nie blokuje treści/indeksacji */}
        <ChatLauncher />

        {/* Pulsujący favicon w karcie (efekt „live", canvas) — reduced-motion safe */}
        <FaviconPulse />

        {/* Różnicuje tempo/fazę „oddychających" aur (po redesignie DOKŁADNIE 2 karty:
            wyróżniony plan cennika + AgentDemo), żeby nie migotały w rytm.
            Reduced-motion safe. */}
        <AuraDesync />

        {/* Warstwa „świeżości": Lenis + GSAP ScrollTrigger. Import DYNAMICZNY po
            window.load, TYLKO desktop ≥1024px, nigdy przy reduced-motion ani
            Save-Data — mobile nie ładuje ani bajta bibliotek (budżet PageSpeed). */}
        <MotionGate />

        {/* Umami (cookieless analytics, RODO bez banera) — renderuje się TYLKO gdy
            NEXT_PUBLIC_UMAMI_WEBSITE_ID ustawione w Vercelu. defer + koniec body:
            zero wpływu na LCP. Skrypt ~2KB z cloud.umami.is. */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}

        {/* Schema globalna — Organization + WebSite na każdej stronie (spec 04 §6.2–6.3) */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
