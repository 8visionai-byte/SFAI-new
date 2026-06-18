import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { LogoImage } from '@/components/layout/Logo';
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
 * 1. żądaniu — cytowalna dla LLM. Znak (OFICJALNY przezroczysty render `mark` —
 * sam cyrkiel „SF") jest DEKORACYJNY (aria-hidden): nie niesie treści, tekst opisuje
 * znak słowami. Sekcja jest JASNA (spójność całej strony): przezroczysty znak siada
 * czysto na jasnym tle, a ciemny metaliczny cyrkiel ma na bieli świetny kontrast.
 * Kontrast tekstu zapewniają kolory semantyczne (WCAG AA, bez regresji).
 *
 * SPÓJNOŚĆ: symbolika opisuje PRAWDZIWE logo (cyrkiel/divider „SF" z przewijającą się
 * krzywą), które widać tu w renderze — tekst i obraz mówią o tym samym znaku.
 */
export function OnasSymbolika() {
  return (
    <Section tone="subtle">
      <div className="mx-auto grid max-w-narrow items-center gap-10 md:grid-cols-[auto,1fr] md:gap-12">
        {/* Znak — OFICJALNY przezroczysty render (sam cyrkiel „SF"), dekoracyjny
            (aria-hidden). Siada czysto na jasnym tle. Treść niesie tekst obok. */}
        <Reveal className="flex justify-center md:justify-start">
          <LogoImage
            variant="mark"
            decorative
            sizes="(min-width: 640px) 160px, 128px"
            className="sf-float h-auto w-32 shrink-0 sm:w-40"
          />
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
