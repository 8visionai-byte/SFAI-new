'use client';

import { MagneticButton } from '@/components/ui';
import { HOME_CTA } from '@/lib/site';

/**
 * WynikCTA — jedno CTA narzędzia z dowodem przy przycisku (spec 07 §0.6, §6).
 *
 * Label STAŁY = HOME_CTA ("Pokaż mi, gdzie tracę czas"). Mikrokopia PERSONALIZOWANA
 * wynikiem (przekazywana z wyspy przez `mikrokopia`). Href = HOME_CTA.href (#diagnoza).
 *
 * DOWÓD (§6, ZERO zmyślania): jedyna realna liczba w projekcie to case Instytutu
 * Kryptografii (~75% maili wymaga tylko drobnej korekty). Do potwierdzenia zgody na
 * nazwę pokazujemy wersję BEZ nazwy ("u jednego z klientów 3 na 4 maile..."). Liczba
 * realna, nazwa ukryta. Bez widocznego [PLACEHOLDER]. Brak innych metryk dowodu =
 * INPUT PAWŁA (nie wymyślamy opinii/logo/liczby wdrożeń).
 */

/** Dowód przy CTA — realna liczba IK bez nazwy (do zgody Pawła). Jedno źródło. */
export const DOWOD_PRZY_CTA =
  'U jednego z naszych klientów 3 na 4 maile obsługi wymagają już tylko drobnej korekty.';

type WynikCTAProps = {
  /** Mikrokopia personalizowana wynikiem (zdanie nad/pod przyciskiem). */
  mikrokopia: string;
};

export function WynikCTA({ mikrokopia }: WynikCTAProps) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm">
      <p className="text-body font-medium text-fg">{mikrokopia}</p>
      <div className="mt-4 flex flex-col items-start gap-3">
        <MagneticButton variant="primary" size="lg" href={HOME_CTA.href}>
          {HOME_CTA.label}
        </MagneticButton>
        {/* Dowód przy CTA (realny, bez nazwy do zgody) */}
        <p className="text-caption text-fg-subtle">{DOWOD_PRZY_CTA}</p>
      </div>
    </div>
  );
}
