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
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // [rozmiar, { lineHeight, letterSpacing }]
        display: ['var(--fs-display)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['var(--fs-h1)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['var(--fs-h2)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h3: ['var(--fs-h3)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        lead: ['var(--fs-lead)', { lineHeight: '1.5' }],
        body: ['var(--fs-body)', { lineHeight: '1.65' }],
        'body-sm': ['var(--fs-body-sm)', { lineHeight: '1.6' }],
        ui: ['var(--fs-ui)', { lineHeight: '1.4' }],
        caption: ['var(--fs-caption)', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        overline: ['var(--fs-overline)', { lineHeight: '1.2', letterSpacing: '0.08em' }],
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
        gutter: 'var(--gutter)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        narrow: 'var(--container-narrow)',
        measure: 'var(--measure)',
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
        spring: 'var(--ease-spring)',
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
