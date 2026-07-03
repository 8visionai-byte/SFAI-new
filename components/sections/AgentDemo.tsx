'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * AgentDemo — interaktywne „Show, don't tell" pod nagłówkiem różnic (Rozwiazanie).
 * LEWO: zwykły chatbot — tylko odpowiada i na tym koniec (statyczny, wyblakły).
 * PRAWO: Agent SimpleFast — odgrywa sekwencję DZIAŁANIA: sprawdza kalendarz, zapisuje
 * termin, wysyła potwierdzenie. Pętla sterowana lekkim automatem stanów (zero bibliotek).
 *
 * PERF: animacja gra TYLKO w widoku (IntersectionObserver, threshold 0.3) — poza kadrem
 * pauzuje. Zero pętli rAF, tylko setTimeout między krokami. Reduced-motion => od razu stan
 * finalny (bez ruchu). Wynik CWV nietknięty (poniżej folda, brak ciężkich zasobów).
 *
 * A11y/GEO: cały blok jest aria-hidden (ilustracja) — treść merytoryczna i cytowalna żyje
 * w akapicie i TABELI porównawczej poniżej. Boty AI czytają DOM (tekst tu jest), a czytnik
 * ekranu dostaje uporządkowaną tabelę, nie duplikat animacji.
 */
const LAST = 5;
const STEP_MS = 1350;
const HOLD_MS = 2600;

export function AgentDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep(LAST); // od razu pełny, finalny stan
      return;
    }
    let timer = 0;
    let alive = false;
    let i = 0;
    const tick = () => {
      i = i >= LAST ? 0 : i + 1;
      setStep(i);
      timer = window.setTimeout(tick, i === LAST ? HOLD_MS : STEP_MS);
    };
    const start = () => {
      if (alive) return;
      alive = true;
      i = 0;
      setStep(0);
      timer = window.setTimeout(tick, STEP_MS);
    };
    const stop = () => {
      alive = false;
      window.clearTimeout(timer);
    };
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) start();
        else stop();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // Klasa ujawnienia elementu od kroku n (fade + subtelny wjazd z dołu).
  const at = (n: number) =>
    cn(
      'transition-all duration-500 ease-out',
      step >= n ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1.5 opacity-0'
    );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="mt-8 grid gap-4 md:grid-cols-2"
    >
      {/* ── LEWO: zwykły chatbot (statyczny, wyblakły) ── */}
      <div className="rounded-lg border border-border bg-surface p-5 opacity-90 saturate-[0.85]">
        <DemoHeader label="Zwykły chatbot" tone="muted" />
        <div className="mt-4 min-h-[16rem] space-y-3">
          <Bubble side="user">Chcę umówić wizytę na czwartek.</Bubble>
          <Bubble side="bot">Godziny otwarcia: pon–pt 9:00–17:00. Zapraszamy!</Bubble>
          <p className="pt-2 text-caption text-fg-subtle">
            …i na tym koniec. Klient i tak musi zadzwonić, a Ty — oddzwonić.
          </p>
        </div>
      </div>

      {/* ── PRAWO: Agent SimpleFast (animowany) ── */}
      <div className="card-aura card-aura-bold rounded-lg border border-border-accent bg-surface p-5">
        <DemoHeader label="Agent SimpleFast" tone="accent" />
        <div className="mt-4 min-h-[16rem] space-y-3">
          <Bubble side="user" className={at(0)}>
            Chcę umówić wizytę na czwartek.
          </Bubble>

          <Bubble side="agent" className={at(1)}>
            Jasne, sprawdzam kalendarz
            {step === 1 ? <TypingDots /> : <span aria-hidden="true">…</span>}
          </Bubble>

          {/* Mini-kalendarz: slot 14:00 z „wolne" na „zajęte" (akcja Agenta) */}
          <div className={cn('rounded-md border border-border bg-bg-subtle p-3', at(2))}>
            <div className="mb-2 text-caption font-semibold text-fg-subtle">Czwartek</div>
            <div className="flex flex-wrap gap-1.5">
              {['9:00', '11:00', '14:00', '16:00'].map((t) => {
                const booked = t === '14:00' && step >= 2;
                return (
                  <span
                    key={t}
                    className={cn(
                      'rounded px-2 py-1 text-caption transition-colors duration-500',
                      booked
                        ? 'bg-accent font-semibold text-accent-contrast'
                        : 'border border-border text-fg-muted'
                    )}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          <Bubble side="agent" className={at(3)}>
            Zapisałem: <strong>czwartek 14:00</strong>. Wysyłam potwierdzenie.
          </Bubble>

          {/* Toast e-mail */}
          <div
            className={cn(
              'flex items-center gap-2 rounded-md border border-border bg-bg-subtle px-3 py-2 text-body-sm text-fg-muted',
              at(4)
            )}
          >
            <MailIcon />
            Potwierdzenie wysłane na e-mail klienta.
          </div>

          {/* Badge sukcesu */}
          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-body-sm font-semibold text-accent-hover',
              at(5)
            )}
          >
            <CheckIcon />
            Umówione — bez Twojego udziału.
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoHeader({ label, tone }: { label: string; tone: 'muted' | 'accent' }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-3">
      <span className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
        <span className="h-2 w-2 rounded-full bg-border-strong" />
      </span>
      <span
        className={cn(
          'text-caption font-semibold',
          tone === 'accent' ? 'text-accent' : 'text-fg-subtle'
        )}
      >
        {label}
      </span>
    </div>
  );
}

function Bubble({
  side,
  children,
  className,
}: {
  side: 'user' | 'bot' | 'agent';
  children: React.ReactNode;
  className?: string;
}) {
  const isUser = side === 'user';
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start', className)}>
      <div
        className={cn(
          'max-w-[88%] rounded-2xl px-3.5 py-2 text-body-sm',
          isUser
            ? 'rounded-br-sm bg-accent text-accent-contrast'
            : side === 'agent'
              ? 'rounded-bl-sm bg-accent-soft text-fg'
              : 'rounded-bl-sm bg-bg-subtle text-fg-muted'
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="sf-typing" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-accent">
      <path
        d="M4 6h16v12H4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
