/** @type {import('next').NextConfig} */

// Nagłówki bezpieczeństwa — placeholder. CSP dostrajany w osobnej warstwie security
// po finalizacji integracji 3rd-party (Cal.com, Make.com, GA4). Patrz spec 04 §11.
const securityHeaders = [
  {
    source: '/:path*',
    headers: [
      // Wymuś HTTPS. 'preload' CELOWO usunięte: dodać dopiero po pewności pełnego HTTPS
      // i ŚWIADOMYM zgłoszeniu domeny do hstspreload.org (preload jest trudny do cofnięcia).
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          // Tailwind/Next wstrzykują krytyczny CSS inline; docelowo rozważyć hashe.
          "style-src 'self' 'unsafe-inline'",
          //
          // SCRIPT-SRC — DŁUG BEZPIECZEŃSTWA (spec 04 §11). 'unsafe-inline' osłabia XSS.
          // Dlaczego jeszcze jest: strona to SSG (app/page.tsx => force-static), bez
          // middleware, więc nonce PER-REQUEST jest niemożliwy (brak serwera renderującego
          // przy każdym żądaniu). Samo usunięcie 'unsafe-inline' ZABLOKUJE inline bootstrap
          // Next.js => brak hydration => strona przestaje działać.
          //
          // ŚCIEŻKA NAPRAWY PRZED PRODUKCJĄ (do zrobienia na STAGINGU, nie na ślepo):
          //   Opcja A (zalecana): wprowadzić middleware.ts generujące per-request nonce
          //     i przełączyć stronę z force-static na render dynamiczny/SSR dla tras,
          //     które tego wymagają; w CSP: "script-src 'self' 'nonce-<...>' 'strict-dynamic'".
          //   Opcja B (zostając przy SSG): policzyć SHA-256 inline-bootstrapu w buildzie
          //     i wstrzyknąć hashe + 'strict-dynamic' (wymaga kroku w pipeline build).
          // Przy podłączaniu GA4/Cal.com/Make dodać KONKRETNE domeny (nie wildcard).
          "script-src 'self' 'unsafe-inline'",
          // img-src bez globalnego 'https:' (wildcard) — tylko własne + data:.
          // Gdy dojdzie CDN/og z innej domeny, dodać tę KONKRETNĄ domenę.
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self'",
          "frame-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
          'upgrade-insecure-requests',
        ].join('; '),
      },
    ],
  },
];

// Cache dla assetów brand — wersjonowane nazwą pliku (zmiana treści = nowa nazwa),
// więc rok + immutable jest bezpieczny; przeglądarka nie odpytuje ponownie.
const brandCacheHeaders = [
  {
    source: '/brand/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
    ],
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [...securityHeaders, ...brandCacheHeaders];
  },
};

export default nextConfig;
