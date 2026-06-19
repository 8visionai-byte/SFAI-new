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
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          {/* .text-metal — fallback --metal-fg = fiolet 6.81:1 na paper (AA). */}
          <h2 className="text-h2 text-metal">Ile kosztuje wdrożenie AI Agenta dla firmy?</h2>
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

      <div className="mt-9 grid items-stretch gap-6 md:grid-cols-3">
        {POZIOMY.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            {/* Wszystkie karty cennika dostają „oddychającą" ramkę marki (.card-aura),
                a wyróżniona grubszą (.card-aura-bold). Badge „Najczęściej wybierane"
                w barwach marki. Bez .card-glossy: jego overflow:hidden ucinał badge
                wystający nad górną krawędź (zgłoszenie Pawła: napis ucięty). */}
            <Card
              variant={p.highlight ? 'highlight' : 'base'}
              as="article"
              className={`card-aura flex h-full flex-col${p.highlight ? ' card-aura-bold' : ''}`}
            >
              {p.highlight && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-1 text-caption font-semibold text-white shadow-sm"
                  style={{ background: 'linear-gradient(90deg, #007BFF, #7A35FF, #2FA500)' }}
                >
                  Najczęściej wybierane
                </span>
              )}
              <h3 className="text-h3">{p.name}</h3>
              <p className="mt-1 text-body-sm text-fg-muted">{p.forWho}</p>

              <p className="mt-5 font-display text-h2 font-semibold tabular-nums text-brand">{p.price}</p>

              <dl className="mt-5 space-y-3 border-t border-border pt-5 text-body-sm">
                <div>
                  <dt className="text-caption uppercase tracking-[0.06em] text-fg-subtle">Co dostajesz</dt>
                  <dd className="text-fg">{p.get}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-[0.06em] text-fg-subtle">Oszczędza</dt>
                  <dd className="text-fg">{p.saves}</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-[0.06em] text-fg-subtle">Czas wdrożenia</dt>
                  <dd className="text-fg">{p.time}</dd>
                </div>
              </dl>
            </Card>
          </Reveal>
        ))}
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
        <nav aria-label="Nasze usługi" className="mx-auto mt-12 max-w-container">
          <h3 className="text-h3 text-center">Co konkretnie wdrażamy?</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USLUGI.map((u) => (
              <li key={u.slug}>
                <Link
                  href={`/uslugi/${u.slug}`}
                  className="group block h-full rounded-lg border border-border bg-surface p-5 shadow-xs transition-colors hover:border-brand"
                >
                  <span className="block text-body font-medium text-fg group-hover:text-brand">
                    {u.h1}
                  </span>
                  <span className="mt-2 block text-body-sm text-fg-muted">{u.metaDescription}</span>
                  <span className="mt-3 block text-caption text-fg-subtle">Zobacz, jak to działa →</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>

      {/* Wariant z dotacją 2026 */}
      <Reveal delay={0.12}>
        <div className="mx-auto mt-6 max-w-narrow rounded-lg border border-border bg-bg-subtle p-6">
          <h3 className="text-h3">Można to sfinansować z dotacji?</h3>
          {/* INPUT PAWŁA: gdy będzie konkretny program dofinansowania, dopisać jego nazwę. */}
          <p className="mt-2 text-body-sm text-fg-muted">
            W 2026 roku część wdrożeń AI dla MŚP da się pokryć z dofinansowań. Na diagnozie sprawdzimy, czy Twój
            projekt łapie się na dostępne programy, i pomożemy ułożyć wniosek.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-9 flex max-w-narrow flex-col items-start gap-3">
          <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
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
