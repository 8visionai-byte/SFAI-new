import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { CompassMark } from '@/components/layout/Logo';
import { O_NAS } from '@/lib/o-nas/content';

/**
 * OnasSymbolika — SEKCJA o symbolice nazwy i znaku (cyrkiel/divider -> „SF").
 * Wplata HISTORIĘ MARKI: cyrkiel = narzędzie architekta i nawigatora; jesteśmy
 * architektami, którzy łączą KROKI i krok po kroku doprowadzają firmę do celu.
 * Spina historię founderów (patrzymy w tę samą stronę) z wartością marki
 * („AI nie zastępuje ludzi...").
 *
 * UMIEJSCOWIENIE w narracji: po Historii (jak się poznaliśmy), przed Founderami
 * (kim są) — czyli „kim jesteśmy jako marka" pomiędzy „jak powstaliśmy" a „kto za tym stoi".
 *
 * GEO/KPI #1: cała treść (kapsuła + akapity + domknięcie) jest w surowym HTML przy
 * 1. żądaniu — cytowalna dla LLM. CompassMark jest DEKORACYJNY (aria-hidden): nie
 * niesie treści, tekst opisuje znak słowami. Reveal tylko wzbogaca; reduced-motion ->
 * statyczny render. Strefa `dark` = „tech smaczek" pokazujący metaliczny znak,
 * kontrast tekstu zapewniają kolory semantyczne (WCAG AA, bez regresji).
 */
export function OnasSymbolika() {
  return (
    <Section tone="base" theme="dark">
      <div className="mx-auto grid max-w-narrow items-center gap-10 md:grid-cols-[auto,1fr] md:gap-12">
        {/* Znak — duży, dekoracyjny (aria-hidden). Treść niesie tekst obok. */}
        <Reveal className="flex justify-center md:justify-start">
          <CompassMark className="sf-float h-28 w-28 shrink-0 sm:h-36 sm:w-36" />
        </Reveal>

        <div>
          <Reveal>
            <h2 className="text-h2">{O_NAS.symbolika.h2}</h2>
          </Reveal>

          {/* Kapsuła answer-first — cytat dla LLM. */}
          <Reveal delay={0.05}>
            <p className="text-lead mt-5 text-fg-muted">{O_NAS.symbolika.kapsula}</p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-narrow flex-col gap-5">
        {O_NAS.symbolika.akapity.map((akapit, i) => (
          <Reveal key={i} delay={0.05 + i * 0.05}>
            <p className="text-body text-fg-muted">{akapit}</p>
          </Reveal>
        ))}

        {/* Domknięcie — łączy znak z wartością marki („AI nie zastępuje ludzi..."). */}
        <Reveal delay={0.25}>
          <p className="text-lead mt-2 border-l-2 border-accent pl-5 text-fg">
            {O_NAS.symbolika.domkniecie}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
