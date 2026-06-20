import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';
import { ChatDemo } from '@/components/demo/ChatDemo';

/**
 * SEKCJA 10 — DEMO POKAZOWE (spec 03 §10). Emocja: kompetencja (szewc w butach).
 * Jasna sekcja premium (.surface-aurora). Kapsuła + opis w HTML (nie blokuje indeksacji).
 * Czat = ChatDemo (STUB, atrapa). Voicebot = przycisk-stub. Backend = security layer.
 *
 * UWAGA SPÓJNOŚCI: dopóki czat to atrapa (bez /api/chat), tekst sekcji NIE może
 * twierdzić, że to żywy Agent ("nie nagranie ani makieta") — bo ChatDemo odpowiada
 * "to wersja demo". Tekst poniżej jest celowo uczciwy: "wersja pokazowa".
 * INPUT/DECYZJA: po podłączeniu realnego /api/chat można wrócić do "żywego" kadru.
 */
export function ZyweDemo() {
  return (
    <Section tone="base" id="demo" className="surface-aurora">
      <div className="mx-auto max-w-narrow">
        <Reveal>
          <h2 className="text-h2">Zobacz, jak rozmawia nasz Agent. Wersja pokazowa.</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lead mt-5 text-fg-muted">
            To pokaz tego, jak nasz AI Agent prowadzi rozmowę: jak pyta, jak odpowiada, jakim tonem mówi do
            klienta. Wersję na żywo, uczoną na Twoich danych i pod Twoje zasady, uruchamiamy przy wdrożeniu.
            Chcesz zobaczyć ją w akcji na swoich procesach? Umów bezpłatną diagnozę, pokażę na rozmowie.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-8 grid max-w-narrow gap-6 md:grid-cols-2">
        {/* Czat (widget stub) */}
        <Reveal>
          <ChatDemo />
          <p className="mt-3 text-caption text-fg-subtle">
            To demo. Twojego Agenta uczymy na Twoich danych i Twoich zasadach.
          </p>
        </Reveal>

        {/* Voicebot (stub) */}
        <Reveal delay={0.06}>
          <div className="card-aura flex h-full flex-col justify-center rounded-lg border border-border bg-surface p-6">
            <h3 className="text-h3">Wolisz posłuchać?</h3>
            <p className="mt-2 text-body-sm text-fg-muted">
              Voicebot odbierze, porozmawia po polsku i pokaże, jak brzmi obsługa telefonu bez Twojego udziału.
            </p>
            <div className="mt-5">
              {/* STUB — voicebot demo. TODO: podłączyć numer/voice */}
              <Button variant="secondary" disabled>
                Zadzwoń do Agenta i posłuchaj
              </Button>
            </div>
            <p className="mt-3 text-caption text-fg-subtle">
              Voicebot demo uruchamiamy wkrótce. Chcesz usłyszeć go już teraz? Umów diagnozę, włączę na rozmowie.
            </p>
          </div>
        </Reveal>
      </div>

      {/*
        DOWÓD przy CTA (north star #5). Uczciwy sygnał oferty zamiast zmyślonej liczby.
        INPUT PAWŁA: gdy będzie realna metryka voicebota (np. liczba połączeń/mc), wstawić ją tu.
      */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-9 flex max-w-narrow flex-col items-start gap-2">
          <Button variant="primary" href={HOME_CTA.href}>
            Chcę takiego Agenta u siebie
          </Button>
          <span className="text-caption text-fg-subtle">
            Wersję na żywo, uczoną na Twoich danych, włączam na bezpłatnej diagnozie.
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
