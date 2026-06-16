import { Section, MagneticButton } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { RadarPoradnikLink } from './RadarPoradnikLink';
import { HOME_CTA } from '@/lib/site';
import type { RadarNews } from '@/lib/ai-radar';

/**
 * RadarCTA — SEKCJA 6 formatu (stała). Dwa elementy, zawsze w tej kolejności:
 *  1. Powiązany poradnik (OBOWIĄZKOWY w AI Radar: news -> poradnik) — krzyżowy link.
 *  2. Jedno główne CTA -> #diagnoza, strefa „dark" (sekcja domykająca, spec 02 §7).
 *
 * Anchor `#diagnoza` rozwiązuje się NA TEJ stronie, bo ta sekcja nosi id="diagnoza"
 * (ten sam wzorzec co ServiceCTA usług). Tekst CTA jest stały z HOME_CTA — spójność
 * jedynego CTA w całym serwisie (north star #3), zero przepisywania per wpis.
 *
 * Treść w HTML od razu (SSG). MagneticButton deg- raduje się do zwykłego Buttona przy
 * reduced-motion / dotyku, więc akcja jest zawsze dostępna.
 */
export function RadarCTA({ news }: { news: RadarNews }) {
  return (
    <>
      {/* 1. Powiązany poradnik — obowiązkowy krzyżowy link newsa */}
      <Section tone="subtle">
        <div className="mx-auto max-w-narrow">
          <Reveal>
            <RadarPoradnikLink
              slug={news.powiazanyPoradnik}
              href={news.link}
              tytul={news.linkTytul}
            />
          </Reveal>
        </div>
      </Section>

      {/* 2. Jedno główne CTA -> #diagnoza (ten sam flow co home/usługi) */}
      <Section tone="base" theme="dark" id="diagnoza">
        <div className="mx-auto max-w-narrow text-center">
          <Reveal>
            <h2 className="text-h2">
              Chcesz wiedzieć, czy to zmienia coś u Ciebie?
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-lead mx-auto mt-5 max-w-[52ch] text-fg-muted">
              Umów bezpłatną diagnozę. Pokażemy, gdzie tracisz czas i co da się
              zautomatyzować już teraz.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
                {HOME_CTA.label}
              </MagneticButton>
              <span className="text-caption max-w-[60ch] text-fg-subtle">
                {HOME_CTA.microcopy}
              </span>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
