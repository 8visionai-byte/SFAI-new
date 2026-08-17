import type { Config } from 'tailwindcss';

/**
 * Tailwind theme = mapowanie tokenów design systemu (spec 02 §10).
 * Strategia: tokeny semantyczne żyją w globals.css jako CSS variables;
 * Tailwind tylko je referuje przez var(). Dzięki temu dark mode = przełączenie
 * data-theme na sekcji, bez dopisywania `dark:` do każdej klasy.
 */
const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-subtle': 'var(--bg-subtle)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        'surface-sunken': 'var(--surface-sunken)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-subtle': 'var(--fg-subtle)',
        'fg-on-accent': 'var(--fg-on-accent)',
        brand: 'var(--brand)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        // accent-decor = jasny cyjan TYLKO dekoracyjnie (glow/border). Nie na tekst — nie zda AA.
        'accent-decor': 'var(--accent-decor)',
        'accent-soft': 'var(--accent-soft)',
        'accent-contrast': 'var(--accent-contrast)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        // hairline = włos karty premium; border-control = obrys KONTROLKI
        // (WCAG 1.4.11 wymaga 3:1 — border-strong tego nie spełnia).
        hairline: 'var(--hairline)',
        // ŚWIAT B (ciemna pracownia): szkło kart — tło biel 3-6% + włos biel 10%.
        // Klasa-komponent .sf-glass składa całość; te mapy są dla przypadków,
        // gdy partia B potrzebuje pojedynczej warstwy (bg-glass, border-glass-hairline).
        glass: 'var(--glass-bg)',
        'glass-strong': 'var(--glass-bg-strong)',
        'glass-hairline': 'var(--glass-hairline)',
        'border-control': 'var(--border-control)',
        'border-accent': 'var(--border-accent)',
        ring: 'var(--ring)',
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        warning: 'var(--warning)',
        'warning-bg': 'var(--warning-bg)',
        error: 'var(--error)',
        'error-bg': 'var(--error-bg)',
        info: 'var(--info)',
        'info-bg': 'var(--info-bg)',
        // METAL — akcenty (theme-aware). Stopnie bazowe zdają AA jako tekst;
        // *-decor są jaśniejsze i służą TYLKO dekoracji (gradient/sheen/tło).
        'metal-blue': 'var(--metal-blue)',
        'metal-violet': 'var(--metal-violet)',
        'metal-green': 'var(--metal-green)',
        'metal-silver': 'var(--metal-silver)',
        'metal-fg': 'var(--metal-fg)',
      },
      backgroundImage: {
        // gradient marki: niebieski -> fiolet -> zielony (krok po kroku)
        metal: 'var(--metal-gradient)',
        'metal-decor': 'var(--metal-gradient-decor)',
        'metal-sheen': 'var(--metal-sheen)',
        // ŚWIAT B: trasa gradientowa z makiet (#2B7CFF→#7A3CF0→#22E06B) — dekoracja.
        route: 'var(--route-gradient)',
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // INFINITY: mono-akcent (JetBrains Mono z next/font w layout.tsx).
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // [rozmiar, { lineHeight, letterSpacing }]
        // v19 §C — METRYKI WZORCA (pomiary-v19.md §3.2, mierzone na 1440px
        // tą samą sondą na obu serwisach). Wzorzec trzyma nagłówki przy
        // trackingu praktycznie zerowym (max -0.01em) i luźniejszej
        // interlinii; nasze -0.035em / lh 1.02 dawały inny charakter pisma
        // niż same rozmiary. Do v18 było: display 1.02/-0.035em,
        // h1 1.06/-0.03em, h2 1.09/-0.025em, h3 1.3/-0.005em, lead 1.45,
        // caption 1.4, overline 1.2/0.08em.
        // H1 (56px) NIE MA własnego wiersza w pomiarze — leży między display
        // a H2, więc jego metryki są INTERPOLACJĄ tych dwóch, nie pomiarem.
        display: ['var(--fs-display)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h1: ['var(--fs-h1)', { lineHeight: '1.14', letterSpacing: '-0.012em' }],
        h2: ['var(--fs-h2)', { lineHeight: '1.22', letterSpacing: '-0.008em' }],
        h3: ['var(--fs-h3)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        lead: ['var(--fs-lead)', { lineHeight: '1.6' }],
        body: ['var(--fs-body)', { lineHeight: '1.65' }],
        'body-sm': ['var(--fs-body-sm)', { lineHeight: '1.65' }],
        ui: ['var(--fs-ui)', { lineHeight: '1.4' }],
        caption: ['var(--fs-caption)', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        /* v19: 0.28em ze wzorca dotyczy roli MONO — niesie ja .inf-overline
           w globals.css (wlasna rodzina + tracking). Token Tailwinda jedzie
           tez w sansie (stopka, 404, kalkulator), gdzie 0.28em rozjezdza
           napis, wiec zostaje przy 0.08em (kontrola v19, MINOR-4). */
        overline: ['var(--fs-overline)', { lineHeight: '1.5', letterSpacing: '0.08em' }],
        metric: ['var(--fs-metric)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
        10: 'var(--space-10)',
        11: 'var(--space-11)',
        section: 'var(--section-y)',
        'section-tight': 'var(--section-y-tight)',
        // Trzeci rejestr pionowy: oddech otwarcia aktu (88 -> 160px).
        'section-loose': 'var(--section-y-loose)',
        gutter: 'var(--gutter)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        // wide = oś gridów 3-kolumnowych (980px); narrow = tekst/kapsuła (760px).
        wide: 'var(--container-wide)',
        narrow: 'var(--container-narrow)',
        measure: 'var(--measure)',
        // measure-lead = 54ch: miara leadu 24px (68ch przy tym stopniu za długie).
        'measure-lead': 'var(--measure-lead)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        accent: 'var(--shadow-accent)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        // `spring` usunięty razem z tokenem --ease-spring (patrz globals.css).
      },
      transitionDuration: {
        fast: '140ms',
        base: '220ms',
        slow: '420ms',
        reveal: '600ms',
      },
      zIndex: {
        raised: '10',
        sticky: '100',
        nav: '200',
        dropdown: '300',
        overlay: '400',
        modal: '500',
        toast: '600',
      },
    },
  },
  plugins: [],
};

export default config;
