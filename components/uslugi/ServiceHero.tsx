import { Section, Badge, MagneticButton, SectionImage } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { POSITIONING } from '@/lib/site';
import { Breadcrumbs } from './Breadcrumbs';
import type { Usluga } from '@/lib/uslugi/types';
import { USLUGA_OBRAZY } from '@/lib/uslugi/obrazy';

/**
 * ServiceHero — SEKCJA 1 szablonu usługi (answer-first).
 * Struktura: breadcrumbs + badge (sub-claim kategorii) + H1 (= money query)
 * + kapsuła answer-first (surowy HTML = cytat dla LLM) + główne CTA + mikrokopia.
 *
 * KPI #1: H1 i kapsuła są w HTML przy 1. żądaniu (Reveal tylko wzbogaca, a przy
 * prefers-reduced-motion pokazuje treść natychmiast). Lewostronne wyrównanie
 * (czytelność długiej kapsuły), spójne z rytmem strony.
 *
 * ZDJĘCIE HERO (mapa USLUGA_OBRAZY): płyta w roli FRAME (kwadrat na desktopie),
 * wychodząca do prawej krawędzi ekranu (.sf-bleed-r). Na mobile leży POD treścią
 * i zostaje lazy, więc transfer rośnie dopiero po doscrollowaniu. Struktura
 * breadcrumbs/H1/kapsuły/CTA pozostaje NIETKNIĘTA — tylko owinięta gridem.
 */
export function ServiceHero({ usluga }: { usluga: Usluga }) {
  const obraz = USLUGA_OBRAZY[usluga.slug];

  const tresc = (
    <div className="mx-auto max-w-narrow">
      <Breadcrumbs
        items={[
          { name: 'Strona główna', href: '/' },
          { name: 'Usługi', href: '/uslugi' },
          { name: usluga.h1 },
        ]}
      />

      <Reveal eager>
        <Badge variant="accent" className="mt-6">
          {POSITIONING.subClaim}
        </Badge>
      </Reveal>

      <Reveal eager delay={0.05}>
        <h1 className="text-display mt-5">{usluga.h1}</h1>
      </Reveal>

      {/* Kapsuła answer-first — surowy HTML, cytat dla LLM (40–60 słów). */}
      <Reveal eager delay={0.1}>
        <p className="text-lead mt-6 text-fg-muted">{usluga.kapsula}</p>
      </Reveal>

      <Reveal eager delay={0.15}>
        <div className="mt-9 flex flex-col items-start gap-3">
          <MagneticButton variant="primary" size="lg" href={usluga.cta.href}>
            {usluga.cta.label}
          </MagneticButton>
          <span className="text-caption max-w-[52ch] text-fg-subtle">
            {usluga.cta.mikrokopia}
          </span>
        </div>
      </Reveal>
    </div>
  );

  if (!obraz) {
    return (
      <Section tone="base" containerWidth="default" space="lg">
        {tresc}
      </Section>
    );
  }

  return (
    <Section tone="base" containerWidth="default" space="lg" className="overflow-x-clip">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-14">
        {tresc}
        {/* ZDJĘCIE JEST TEŻ NA MOBILE: `hidden md:block` zostawiało dziesięć podstron
            usług bez żadnego wizualu na telefonie, a ruch jest głównie mobilny.
            LCP bez zmian: element LCP to H1 + kapsuła, zdjęcie ma zwykły Reveal
            (na mobile leży POD przyciskiem CTA) i `loading="lazy"`, więc transfer
            rośnie dopiero po doscrollowaniu.
            Kwadrat, nie pion 4:5: kadr 1:1 z pliku 16:9 pokazuje 56% szerokości
            (bezpieczne dla wszystkich 10 plików), 4:5 tylko 45% — ucinałoby laptop
            przy chatbotach i mikrofon przy voicebotach. */}
        <Reveal delay={0.2}>
          <SectionImage
            src={obraz.src}
            alt={obraz.alt}
            ratio="wide"
            ratioMd="square"
            focus={obraz.focus ?? '50% 50%'}
            tone={obraz.tone ?? 'dark'}
            hover
            className="sf-bleed-r"
            sizes="(min-width: 1240px) 560px, (min-width: 768px) 48vw, 100vw"
          />
        </Reveal>
      </div>
    </Section>
  );
}
