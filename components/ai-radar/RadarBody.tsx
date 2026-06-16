import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import type { RadarNews } from '@/lib/ai-radar';

/**
 * RadarBody — SILNIK FORMATU AI Radar. Renderuje 5 merytorycznych sekcji wpisu
 * w STAŁEJ kolejności, z nagłówkami sformułowanymi JAK PYTANIA (answer-first / GEO):
 *
 *  2. „Co się stało?"                  -> news.coSieStalo (akapit)
 *  3. „Czemu to ważne dla Twojej firmy?" -> news.czemuWazne (akapit + opcjonalna lista)
 *  4. „Nasz filtr: hype czy realna zmiana?" -> news.naszFiltr (głos Pawła)
 *  5. „Co możesz zrobić już teraz?"    -> news.coMozeFirma (lista kroków)
 *
 * (Sekcja 1 HOOK jest w RadarHero; sekcja 6 CTA jest w RadarCTA — stała.)
 *
 * Nagłówki są ZASZYTE w komponencie, nie w danych. Dzięki temu KAŻDY wpis ma
 * identyczny układ i te same, cytowalne pytania-nagłówki (spójność formatu = wymóg
 * briefu). Cała treść renderowana SERWEROWO (w HTML od razu = cytowalna przez LLM).
 *
 * Sekcja „Źródła" renderuje się TYLKO gdy `news.zrodla` ma realne linki — wpisy-szablony
 * mają puste źródła, więc bloku nie ma (zero fałszywych odnośników).
 */
export function RadarBody({ news }: { news: RadarNews }) {
  return (
    <Section tone="base">
      <div className="mx-auto flex max-w-narrow flex-col gap-6">
        {/* SEKCJA 2 — Co się stało? */}
        <Reveal>
          <h2 className="text-h2 mt-4">Co się stało?</h2>
        </Reveal>
        <Reveal delay={0.03}>
          <p className="text-body text-fg-muted">{news.coSieStalo}</p>
        </Reveal>

        {/* SEKCJA 3 — Czemu to ważne dla Twojej firmy? */}
        <Reveal delay={0.03}>
          <h2 className="text-h2 mt-4">Czemu to ważne dla Twojej firmy?</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="text-body text-fg-muted">{news.czemuWazne.tekst}</p>
        </Reveal>
        {news.czemuWazne.punkty && news.czemuWazne.punkty.length > 0 && (
          <Reveal delay={0.09}>
            <ul className="ml-5 list-disc space-y-2 text-body text-fg-muted marker:text-accent">
              {news.czemuWazne.punkty.map((punkt, i) => (
                <li key={i}>{punkt}</li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* SEKCJA 4 — Nasz filtr (głos Pawła) */}
        <Reveal delay={0.06}>
          <h2 className="text-h2 mt-4">Nasz filtr: hype czy realna zmiana?</h2>
        </Reveal>
        <Reveal delay={0.09}>
          <blockquote className="border-l-2 border-border-accent pl-5 text-lead text-fg">
            <p>{news.naszFiltr}</p>
          </blockquote>
        </Reveal>

        {/* SEKCJA 5 — Co możesz zrobić już teraz? (lista kroków) */}
        <Reveal delay={0.09}>
          <h2 className="text-h2 mt-4">Co możesz zrobić już teraz?</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <ol className="ml-5 list-decimal space-y-2 text-body text-fg-muted marker:font-semibold marker:text-accent">
            {news.coMozeFirma.map((krok, i) => (
              <li key={i}>{krok}</li>
            ))}
          </ol>
        </Reveal>

        {/* Źródła — tylko gdy realne (szablony mają puste, więc bloku nie ma) */}
        {news.zrodla.length > 0 && (
          <Reveal delay={0.12}>
            <div className="mt-4 border-t border-border pt-6">
              <h2 className="text-h3">Źródła</h2>
              <ul className="mt-3 space-y-2 text-body-sm">
                {news.zrodla.map((zr, i) => (
                  <li key={i}>
                    <a
                      href={zr.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
                    >
                      {zr.etykieta}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
