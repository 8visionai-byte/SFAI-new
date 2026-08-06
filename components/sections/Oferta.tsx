import Link from 'next/link';
import { Section, MagneticButton, Card } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';
import { USLUGI } from '@/lib/uslugi';

/**
 * SEKCJA 7 — OFERTA + ramy cen (spec 03 §7). Emocja: pewność, brak ukrytych kosztów.
 * Cena widoczna = bramka GEO.
 *
 * ZASADA (jak w faqData): ŻADNYCH literalnych [PLACEHOLDER] w renderowanej treści —
 * widoczna "cena od [PLACEHOLDER]" zostałaby zacytowana przez LLM jako fakt i odrzucona
 * przez Google. Dopóki Paweł nie poda realnych widełek, kolumna ceny kieruje na diagnozę,
 * a nie pokazuje zmyślonej kwoty. INPUT PAWŁA: realne "od X zł", oszczędność/mc, dni.
 */
/* INFINITY: rejestr kolorów kategorii (spec HERO+NAV): chatboty blue #2b7cff,
   voiceboty violet #8b5cf6, automatyzacje green #22e06b, strony/SEO cyan #22d3ee,
   dokumenty amber #f59e0b. Kolor i glif są WYŁĄCZNIE dekoracją (aria-hidden /
   custom property --tile-c, --card-c) — treść i kontrast tekstu niosą tokeny. */
const KATEGORIA: Record<string, { c: string; glif: string }> = {
  chatboty: { c: '#2b7cff', glif: '💬' },
  voiceboty: { c: '#8b5cf6', glif: '🎙️' },
  'agent-rekrutacyjny': { c: '#2b7cff', glif: '🤝' },
  automatyzacje: { c: '#22e06b', glif: '⚙️' },
  'dokumenty-faktury': { c: '#f59e0b', glif: '📄' },
  'opieka-ai': { c: '#22e06b', glif: '🛡️' },
  'audyt-ai': { c: '#f59e0b', glif: '🔍' },
  rozwiazania: { c: '#8b5cf6', glif: '🧩' },
  'strony-www': { c: '#22d3ee', glif: '🌐' },
  optymalizacja: { c: '#22d3ee', glif: '📈' },
};
const KATEGORIA_DEFAULT = { c: 'var(--accent-decor)', glif: '→' } as const;

/* Tonacja dekoracyjna kart cennika = trzy stopnie trasy marki (krok po kroku). */
const POZIOM_TON = ['#2b7cff', '#8b5cf6', '#22e06b'] as const;

const POZIOMY = [
  {
    name: 'Start',
    highlight: false,
    forWho: 'Chcesz spróbować AI bez dużej decyzji',
    get: 'Jeden gotowy Agent (np. chatbot albo prosta automatyzacja)',
    price: 'wycena na diagnozie',
    saves: 'liczymy na diagnozie',
    time: 'najszybciej z całej oferty',
  },
  {
    name: 'Agent',
    highlight: true,
    forWho: 'Chcesz zdjąć z zespołu konkretny, powtarzalny proces',
    get: 'Agent obsługujący telefon lub czat + integracja z kalendarzem/CRM',
    price: 'wycena na diagnozie',
    saves: 'liczymy na diagnozie',
    time: 'dni, nie miesiące',
  },
  {
    name: 'Na miarę',
    highlight: false,
    forWho: 'Masz złożony przypadek lub kilka procesów naraz',
    get: 'Indywidualne rozwiązanie, apka, wtyczka, kilka połączonych Agentów',
    price: 'wycena po diagnozie',
    saves: 'liczymy na diagnozie',
    time: 'ustalamy wspólnie',
  },
] as const;

export function Oferta() {
  return (
    /* AKT III otwiera się rysowaną kreską rozdziału (seam), nie pasem tła.
       overflow-x-clip: poświata .sf-rim-gradient::before (inset -34px w poziomie)
       wystaje poza kartę i na 375px rozpychała dokument o 14px (poziomy scroll). */
    <Section tone="base" space="lg" seam className="overflow-x-clip">
      {/* ŚWIAT B (makieta 4-oferta): lewa trzecia = nagłówek + sub, prawe 2/3 =
          trzy SZKLANE karty (.sf-glass, fundament partii A). Środkowa karta jest
          FIZYCZNIE wyższa (md:-my-5 md:py-11, bez scale) i dostaje gradientowy
          rim (.sf-rim-gradient) + badge teal + JEDYNY przycisk w rzędzie kart.
          Poniżej 1024px nagłówek wraca nad karty (jedna kolumna). Teksty 1:1. */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
        <div className="max-w-narrow">
          <Reveal>
            <h2 className="text-h2">Ile kosztuje wdrożenie AI Agenta dla firmy?</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">
              Koszt wdrożenia AI Agenta zależy od zakresu. Inaczej wycenia się pojedynczy, gotowy proces (na
              przykład chatbot odpowiadający na pytania klientów), inaczej pełnego Agenta obsługującego telefon
              i kalendarz, a inaczej rozwiązanie szyte na miarę. Dokładne widełki podajemy na bezpłatnej diagnozie,
              kiedy znamy już Twój proces. Diagnoza i wstępna wycena nic nie kosztują.
            </p>
          </Reveal>
        </div>

        {/* items-center (nie stretch), żeby wyróżniony plan nie rozjechał rzędu.
            Kaskadę robi .sf-stagger — per-item delaye zniknęły. UWAGA: żaden
            kontener wokół kart nie może mieć overflow:hidden (utnie badge na
            -top-3) — kontrakt obowiązuje też .sf-glass/.sf-rim-gradient. */}
        <Reveal className="sf-stagger grid items-center gap-6 md:grid-cols-3">
          {POZIOMY.map((p, i) => (
            <div key={p.name}>
              {/* Aura .card-aura zeszła z cennika (język świata B: rim zamiast
                  neonowej pętli) — jedyna aura home zostaje na AgentDemo.
                  INFINITY: karty boczne przechodzą na .inf-card (ciemna karta
                  wzorca z lewą krawędzią w stopniu trasy marki). Wyróżniony plan
                  ZOSTAJE na .sf-rim-gradient (obrys trasą + aura, makieta 4) —
                  NIE łączyć z .inf-card: obie klasy zajmują ::before. */}
              <Card
                variant="quiet"
                as="article"
                className={
                  p.highlight
                    ? 'sf-glass sf-rim-gradient relative flex h-full flex-col rounded-lg p-6 shadow-md md:-my-5 md:py-11'
                    : 'inf-card relative flex h-full flex-col p-6'
                }
                style={
                  p.highlight
                    ? undefined
                    : ({ '--card-c': POZIOM_TON[i] ?? 'var(--accent-decor)' } as React.CSSProperties)
                }
              >
                {/* Badge planu — mono .inf-tag na tle akcentu (utilities biją
                    warstwę components: bg/tekst/border z utility). Rodzice NIE
                    mają overflow:hidden — badge na -top-3 nie może być ucięty. */}
                {p.highlight && (
                  <span className="inf-tag absolute -top-3 left-6 rounded-full border-transparent bg-accent px-3 py-1 text-accent-contrast shadow-sm">
                    Najczęściej wybierane
                  </span>
                )}
                <h3 className="text-h3">{p.name}</h3>
                <p className="mt-1 text-body-sm text-fg-muted">{p.forWho}</p>

                {/* SLOT CENY: gdy Paweł poda realne widełki „od X zł", wróć do
                    text-h2 font-semibold tabular-nums text-brand — ten slot jest
                    zaprojektowany pod LICZBĘ. Dopóki stoi tu fraza, liczbowa skala
                    i tabular-nums (bez ani jednej cyfry) tylko psują typografię. */}
                <p className="mt-6 max-w-[16ch] font-display text-h3 font-medium leading-[1.25] text-fg">{p.price}</p>

                {/* Etykiety <dt> 1:1 co do znaku — INFINITY: mono micro-caps
                    .inf-overline (język etykiet wzorca; transform to prezentacja,
                    string w DOM bez zmian). */}
                <dl className="mt-5 space-y-3 border-t border-border pt-5 text-body-sm">
                  <div>
                    <dt className="inf-overline">Co dostajesz</dt>
                    <dd className="text-fg">{p.get}</dd>
                  </div>
                  <div>
                    <dt className="inf-overline">Oszczędza</dt>
                    <dd className="text-fg">{p.saves}</dd>
                  </div>
                  <div>
                    <dt className="inf-overline">Czas wdrożenia</dt>
                    <dd className="text-fg">{p.time}</dd>
                  </div>
                </dl>

                {/* TYLKO środkowa karta ma przycisk (makieta 4). Etykieta =
                    istniejący string CTA diagnozy (bez nowej kopii). */}
                {p.highlight && (
                  <div className="mt-7">
                    <MagneticButton variant="primary" href={HOME_CTA.href}>
                      Umów bezpłatną diagnozę
                    </MagneticButton>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-narrow text-caption text-fg-subtle">
          To są widełki startowe, nie ostateczne faktury. Dokładną cenę poznasz na bezpłatnej diagnozie, zanim
          cokolwiek zamówisz. Bez ukrytych kosztów, bez abonamentu na siłę.
        </p>
      </Reveal>

      {/*
        Linkowanie wewnętrzne pod GEO (fix SEO 05 §2.4): home -> każda z 6 stron /uslugi.
        Anchor = H1 usługi = money query (NIE "zobacz więcej"). Lista z rejestru USLUGI
        (single source) — slug i fraza nigdy się nie rozjadą. Treść w HTML (SSG), bot widzi linki.
      */}
      <Reveal delay={0.12}>
        <nav aria-label="Nasze usługi" className="mx-auto mt-16 max-w-container md:mt-20">
          <h3 className="text-h3">Co konkretnie wdrażamy?</h3>
          {/* Lista katalogowa zamiast sześciu identycznych pudełek pod trzema
              identycznymi pudełkami cennika. Anchor = H1 usługi (SEO 1:1).
              Mikrokopia „Zobacz, jak to działa" nie ginie z treści — schodzi do
              sr-only, glif → to dekoracja aria-hidden.
              INFINITY: wiersz jak w dropdownie wzorca — kafelek .inf-tile w
              kolorze kategorii (rejestr KATEGORIA) + tytuł bold + opis muted +
              strzałka .inf-arrow dojeżdżająca na hover wiersza. Teksty 1:1. */}
          <ul className="mx-auto mt-8 max-w-wide divide-y divide-border border-y border-border">
            {USLUGI.map((u) => {
              const kat = KATEGORIA[u.slug] ?? KATEGORIA_DEFAULT;
              return (
                <li key={u.slug}>
                  <Link
                    href={`/uslugi/${u.slug}`}
                    className="group flex items-center gap-4 py-4 transition-colors duration-fast hover:bg-bg-subtle md:gap-5 md:px-3"
                  >
                    {/* Kafelek ikony kategorii (dekoracja aria-hidden). */}
                    <span
                      aria-hidden="true"
                      className="inf-tile"
                      style={{ '--tile-c': kat.c } as React.CSSProperties}
                    >
                      {kat.glif}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-body font-semibold text-fg transition-colors duration-fast group-hover:text-accent">
                        {u.h1}
                      </span>
                      <span className="mt-0.5 block text-body-sm text-fg-muted">{u.metaDescription}</span>
                    </span>
                    <span aria-hidden="true" className="inf-arrow hidden text-accent group-hover:translate-x-1 md:inline-block">→</span>
                    <span className="sr-only">Zobacz, jak to działa</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Reveal>

      {/* Wariant z dotacją 2026 */}
      <Reveal delay={0.12}>
        <div className="mx-auto mt-10 max-w-narrow border-t border-border pt-6">
          <h3 className="text-h3">Można to sfinansować z dotacji?</h3>
          {/* INPUT PAWŁA: gdy będzie konkretny program dofinansowania, dopisać jego nazwę. */}
          <p className="mt-2 text-body-sm text-fg-muted">
            W 2026 roku część wdrożeń AI dla MŚP da się pokryć z dofinansowań. Na diagnozie sprawdzimy, czy Twój
            projekt łapie się na dostępne programy, i pomożemy ułożyć wniosek.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-12 flex max-w-narrow flex-col items-start gap-3 md:mt-16">
          <MagneticButton variant="primary" size="lg" trailing href={HOME_CTA.href}>
            {HOME_CTA.label}
          </MagneticButton>
          {/*
            DOWÓD przy CTA — INPUT PAWŁA: realna opinia o stosunku ceny do efektu
            (z imieniem i firmą, za zgodą klienta). Do czasu zebrania: uczciwa mikrokopia
            zamiast widocznego [PLACEHOLDER], który zacytowałby LLM.
          */}
          <p className="text-body-sm text-fg-muted">
            Najpierw bezpłatna diagnoza i wycena. Płacisz dopiero, gdy wiesz, za co i ile.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
