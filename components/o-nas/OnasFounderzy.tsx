import { Section } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { O_NAS } from '@/lib/o-nas/content';
import { FounderCard } from './FounderCard';

/**
 * OnasFounderzy — SEKCJA 3: dwie sylwetki founderów (H2 jak pytanie).
 * Siatka 2 kolumn (desktop) z kart FounderCard. Każda karta czyta twarde dane
 * z SITE.founders (NAP) + narrację z lib/o-nas. Miejsce na zdjęcie = INPUT PAWŁA
 * (placeholder inicjałów do czasu dostarczenia foto + assetsReady=true).
 */
export function OnasFounderzy() {
  return (
    <Section tone="base">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">{O_NAS.founderzy.h2}</h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-8 grid max-w-narrow gap-6 md:grid-cols-2">
        {O_NAS.founderzy.profile.map((profil, i) => (
          <Reveal key={profil.founderIndex} delay={i * 0.06}>
            <FounderCard profil={profil} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
