import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';

/**
 * CzegoNieMusisz — SEKCJA strony „Architekci Wartości AI" (obniżenie lęku).
 *
 * Lista „czego NIE musisz mieć ani wiedzieć", żeby zacząć. Każdy punkt zdejmuje
 * jedną barierę wejścia: brak wiedzy o AI, brak budżetu na start, brak pomysłu co
 * automatyzować, niechęć do dużej umowy. Głos Pawła: AI nie zastępuje ludzi, AI
 * zastępuje to, co ich zatrzymuje.
 *
 * KPI #1: lista w surowym HTML, czytelna dla botów. Strefa dark dla kontrastu
 * rytmu (sekcja „oddechu" przed twardym cennikiem). Kontrast AA na ciemnym tle.
 */

type Punkt = { nie: string; ale: string };

const PUNKTY: Punkt[] = [
  {
    nie: 'Nie musisz znać się na AI.',
    ale: 'Od strony technicznej robimy my. Ty mówisz, co Cię uwiera, my dobieramy narzędzie.',
  },
  {
    nie: 'Nie musisz mieć dużego budżetu.',
    ale: 'Zaczynasz od darmowej diagnozy. Pierwszy płatny krok to 1490 zł, który i tak odliczamy od wdrożenia.',
  },
  {
    nie: 'Nie musisz wiedzieć, co automatyzować.',
    ale: 'To jest właśnie zadanie diagnozy. Pokazujemy, gdzie tracisz najwięcej godzin, i od tego zaczynamy.',
  },
  {
    nie: 'Nie musisz podpisywać dużej umowy.',
    ale: 'Najpierw jeden proces na próbę. Decydujesz dopiero, gdy zobaczysz efekt, nie obietnicę.',
  },
  {
    nie: 'Nie musisz zwalniać ludzi.',
    ale: 'AI nie zastępuje ludzi. AI zastępuje to, co ich zatrzymuje. Twój zespół robi to, co ważne, nie to, co powtarzalne.',
  },
  {
    nie: 'Nie musisz zmieniać swoich narzędzi.',
    ale: 'Wpinamy się w to, czego już używasz: skrzynkę mailową, arkusze, system, który masz.',
  },
];

export function CzegoNieMusisz() {
  return (
    <Section tone="base" theme="dark">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Czego NIE musisz mieć, żeby zacząć?</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            Większość firm odkłada AI, bo myśli, że trzeba się najpierw na tym znać,
            mieć budżet i gotowy plan. Nie trzeba. Oto, czego naprawdę nie musisz.
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2">
          {PUNKTY.map((p, i) => (
            <Reveal as="li" key={p.nie} delay={Math.min(i * 0.04, 0.2)}>
              <div className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-success-bg text-success"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-body-sm text-fg-muted">
                  <span className="font-semibold text-fg">{p.nie}</span>{' '}
                  {p.ale}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
