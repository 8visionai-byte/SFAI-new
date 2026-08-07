import { Section, Button } from '@/components/ui';
import { Reveal } from '@/components/motion/Reveal';
import { HOME_CTA } from '@/lib/site';
import { ChatDemo } from '@/components/demo/ChatDemo';
import { VoiceAura } from '@/components/motion/VoiceAura';

/**
 * SEKCJA 10 — DEMO POKAZOWE (spec 03 §10). Emocja: kompetencja (szewc w butach).
 * Jasna sekcja domykająca akt III (rejestr pionowy sm). Kapsuła + opis w HTML
 * (nie blokuje indeksacji).
 * Czat = ChatDemo (STUB, atrapa). Voicebot = AKTYWNY link do żywego demo
 * (druga strona Pawła: sfai-webseite-10k-look.vercel.app — spec v3 §VOICEBOT).
 *
 * UWAGA SPÓJNOŚCI: dopóki czat to atrapa (bez /api/chat), tekst sekcji NIE może
 * twierdzić, że to żywy Agent ("nie nagranie ani makieta") — bo ChatDemo odpowiada
 * "to wersja demo". Tekst poniżej jest celowo uczciwy: "wersja pokazowa".
 * INPUT/DECYZJA: po podłączeniu realnego /api/chat można wrócić do "żywego" kadru.
 */
export function ZyweDemo() {
  return (
    /* .surface-aurora zeszła stąd do FinalneCTA — budżet gradientu marki ma
       4 miejsca, a ostatnie należy do jedynego celu konwersji strony. */
    <Section tone="base" space="sm" id="demo">
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

      {/* ASYMETRIA: czat dostaje 1,4x więcej miejsca (to jest dowód kompetencji),
          voicebot cichnie do kolumny odgrodzonej neutralną kreską 1px — przestaje
          być kartą, która obiecuje działającą funkcję, a w środku ma disabled. */}
      <div className="mx-auto mt-12 grid max-w-wide gap-10 md:mt-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-14">
        {/* Czat (widget stub) */}
        <Reveal>
          <ChatDemo />
          <p className="mt-4 text-caption text-fg-subtle">
            To demo. Twojego Agenta uczymy na Twoich danych i Twoich zasadach.
          </p>
        </Reveal>

        {/* Voicebot — voice-blob „Zapytaj AI" (spec v4 §PARTIA D pkt 1, decyzja
            Pawła): dotychczasowy kafelek ikony + pigułka .inf-glow-cta ustąpiły
            miejsca VoiceAura — oddychającemu zielonemu blobowi z drugiej strony
            Pawła (port FlowCore.astro). CAŁY blob jest linkiem do żywego demo
            (ten sam URL co zdjęty przycisk — dlatego przycisk usunięty jako
            zdublowany, zgodnie ze spec). Teksty sekcji (H3 + opis) zostają 1:1.
            Karta w kolorze kategorii voicebotów (violet #8b5cf6) bez zmian.
            Slot bloba: wysokość w px ARBITRALNIE h-[Npx] (spacing repo to
            własne tokeny — h-9 = 96px, pułapka!). */}
        <Reveal delay={0.06}>
          <div
            className="inf-card flex h-full flex-col justify-center p-6"
            style={{ '--card-c': '#8b5cf6' } as React.CSSProperties}
          >
            <h3 className="text-h3">Wolisz posłuchać?</h3>
            <p className="mt-2 text-body-sm text-fg-muted">
              Voicebot odbierze, porozmawia po polsku i pokaże, jak brzmi obsługa telefonu bez Twojego udziału.
            </p>
            {/* Slot VoiceAura (komponent wypełnia rodzica absolute inset-0). */}
            <div className="relative mt-4 h-[230px] md:h-[260px]">
              <VoiceAura />
            </div>
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
