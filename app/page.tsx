import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, serviceSchema } from '@/components/seo/schemas';
import { FAQ_ITEMS } from '@/components/sections/faqData';

import { ScrollMetalProgress } from '@/components/motion/ScrollMetalProgress';
import { SekcjaSeparator } from '@/components/ui/SekcjaSeparator';
import { Hero } from '@/components/sections/Hero';
import { PromoUslugi } from '@/components/sections/PromoUslugi';
import { PasekZaufania } from '@/components/sections/PasekZaufania';
import { Problem } from '@/components/sections/Problem';
import { BranzeDemo } from '@/components/sections/BranzeDemo';
import { Rozwiazanie } from '@/components/sections/Rozwiazanie';
import { Bezpieczenstwo } from '@/components/sections/Bezpieczenstwo';
import { Dowod } from '@/components/sections/Dowod';
import { JakToDziala } from '@/components/sections/JakToDziala';
import { Oferta } from '@/components/sections/Oferta';
import { NarzedziaTeaser } from '@/components/sections/NarzedziaTeaser';
import { GwarancjaEfektu } from '@/components/sections/GwarancjaEfektu';
import { DowodSpoleczny } from '@/components/sections/DowodSpoleczny';
import { FAQ } from '@/components/sections/FAQ';
import { ZyweDemo } from '@/components/sections/ZyweDemo';
import { FinalneCTA } from '@/components/sections/FinalneCTA';

/**
 * STRONA GŁÓWNA — SSG (force-static), spec 03 (treść 1:1) + 01 §6 (kolejność sekcji).
 *
 * KPI #1: cały rdzeń treści (kapsuły answer-first, tabele, FAQ, ceny) jest w HTML
 * przy pierwszym żądaniu. Sekcje to Server Components; framer-motion działa wewnątrz
 * wysp klienta (Reveal, AnimatedMetric, demo, formularz) i TYLKO wzbogaca.
 *
 * Kolejność (mapa emocji) jest częścią architektury — nie zmieniać bez decyzji.
 * INFINITY v4 (spec §PARTIA C pkt 4, Paweł explicite pozwolił na restrukturyzację):
 * po hero OD RAZU kafelki głównych usług wg SEO (PromoUslugi), po Ofercie teaser
 * narzędzi (NarzedziaTeaser). Reszta mapy emocji bez zmian: lęk zdejmujemy PRZED
 * ceną; dowód towarzyszy zakrętom; CTA powtarza się. Schema/teksty sekcji 1:1.
 */
export const dynamic = 'force-static';

/**
 * Metadata strony głównej (spec 04 §7.4, fix SEO 05 §3.1). Money query: "AI dla firm".
 *
 * FIX SEO #1 (05-seo-geo-strategia §1.2 / §3.1): marka MUSI być w <title> i og:title.
 * Template '%s · SimpleFast.ai' z layoutu NIE działa na home (segment dostaje `default`,
 * nie `template`), więc tytuł home jest samowystarczalny z marką. Cel: 50–60 zn., marka
 * + fraza. Bez em-dash (głos Pawła): zamiast "—" używamy dwukropka. og:title dziedziczy z title.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Chatboty, voiceboty i automatyzacje AI dla firm | SimpleFast',
  description:
    'Chatboty, voiceboty i automatyzacje AI dla polskich firm: odbierają telefony, odpisują klientom i pilnują faktur 24/7. Dane w UE, płacisz za efekt.',
  path: '/',
  ogImage: '/og/home.png',
});

export default function HomePage() {
  return (
    <main id="main">
      {/*
        Tło-film scroll-scrub USUNIĘTE decyzją Pawła (2026-07-15) — czyste jasne
        tła + sygnaturowe hero w CSS (redesign "Google quality").
      */}
      {/*
        Smaczek premium: metaliczny pasek postępu czytania (DEKORACJA, aria-hidden,
        client island). prefers-reduced-motion → nie renderuje się w ogóle.
        Treść/SSG/kolejność sekcji bez zmian — pasek leży nad układem, niczego nie
        zasłania (3px na górnej krawędzi). Wzorzec dla pozostałych stron.
      */}
      <ScrollMetalProgress />
      {/* INFINITY v5 (spec §3 PARTIA C) — kolejność opowieści:
          Hero(voice) → PromoUslugi → PasekZaufania → Problem(walec) →
          Rozwiazanie(karty AEO+demo+tabela) → JakToDziala → Oferta →
          NarzedziaTeaser → Bezpieczenstwo → Dowod → Gwarancja →
          DowodSpoleczny → FAQ → FinalneCTA. Zmiana vs v4: Bezpieczenstwo+Dowod
          schodzą ZA Ofertę/NarzedziaTeaser (lęk i dowód przy cenie).
          BranzeDemo i ZyweDemo nie są wymienione w liście spec v5 — ZOSTAJĄ
          (usunięcie sekcji = usunięcie treści, poza zakresem C) w slotach
          spójnych z opowieścią: BranzeDemo tuż za Problemem (język bólu per
          branża), ZyweDemo przed FinalneCTA (kotwica #demo z ghost CTA hero
          + konsola agenta partii A). */}
      {/* INFINITY v7 (spec §PARTIA D pkt 1): między sekcjami stoi SEPARATOR
          wzorca — cienka linia z przebiegającą iskrą i mono etykietą
          „NN · TYTUŁ" (SekcjaSeparator, dekoracja aria-hidden). Odpowiedź na
          skargę Pawła „podział sekcji za wyraźny": twardą krawędź zmiany tonu
          zastępuje miękkie, ciągle animowane przejście.
          ETYKIETY = wielkie litery ISTNIEJĄCYCH nazw/kotwic sekcji (usługi,
          problem, branze, jak-to-dziala, narzedzia, faq, demo, diagnoza...) —
          ZERO nowych stringów treści. Numeracja rośnie 01..15 w kolejności
          opowieści; przed hero separatora NIE MA (spec).
          NUMERY `nr` są podawane RĘCZNIE — przy dodaniu/usunięciu sekcji
          trzeba przenumerować całą listę w dół (świadomy kompromis: numer
          jest częścią wyglądu, nie liczy się sam).
          ODSTĘP PIONOWY separatora (fix v7): siedzi w komponencie
          components/ui/SekcjaSeparator.tsx (my-6 md:my-7), NIE tutaj — jedno
          źródło rytmu dla wszystkich 15 sztuk. */}
      <Hero />
      <SekcjaSeparator nr="01" etykieta="USŁUGI" />
      {/* v4: kafelki głównych usług (chatboty full + voiceboty/audyt połówki
          + Architekci cienka full) ZARAZ po hero — treść 1:1 z rejestru USLUGI. */}
      <PromoUslugi />
      <SekcjaSeparator nr="02" etykieta="ZAUFANIE" />
      <PasekZaufania />
      <SekcjaSeparator nr="03" etykieta="PROBLEM" />
      <Problem />
      <SekcjaSeparator nr="04" etykieta="BRANŻE" />
      <BranzeDemo />
      <SekcjaSeparator nr="05" etykieta="ROZWIĄZANIE" />
      <Rozwiazanie />
      <SekcjaSeparator nr="06" etykieta="JAK TO DZIAŁA" />
      <JakToDziala />
      <SekcjaSeparator nr="07" etykieta="OFERTA" />
      <Oferta />
      <SekcjaSeparator nr="08" etykieta="NARZĘDZIA" />
      {/* v4: teaser 5 narzędzi (rejestr NARZEDZIA 1:1) między Ofertą a gwarancją. */}
      <NarzedziaTeaser />
      <SekcjaSeparator nr="09" etykieta="BEZPIECZEŃSTWO" />
      <Bezpieczenstwo />
      <SekcjaSeparator nr="10" etykieta="DOWÓD" />
      <Dowod />
      <SekcjaSeparator nr="11" etykieta="GWARANCJA" />
      <GwarancjaEfektu />
      <SekcjaSeparator nr="12" etykieta="OPINIE" />
      <DowodSpoleczny />
      <SekcjaSeparator nr="13" etykieta="FAQ" />
      <FAQ />
      <SekcjaSeparator nr="14" etykieta="DEMO" />
      <ZyweDemo />
      <SekcjaSeparator nr="15" etykieta="DIAGNOZA" />
      <FinalneCTA />

      {/*
        Schema strony głównej (renderowana serwerowo, w HTML przy 1. żądaniu):
        - FAQPage: tekst 1:1 z widoczną sekcją FAQ (spec 04 §6.5).
        - Service: flagowa usługa "Wdrożenie AI Agentów" (north star #7); provider
          linkuje przez @id do Organization z layoutu. Bez minPrice — realnych widełek
          cen jeszcze nie podajemy (czekają na input Pawła), więc NIE wstrzykujemy ceny
          do schema. INPUT PAWŁA: po ustaleniu ceny "od X" przekazać minPrice spójnie z UI.
          Gdy powstanie /uslugi/agenci-ai, ten Service przenosi się na tę podstronę.
        Organization + WebSite są globalnie w layout.tsx (każda strona).
      */}
      <JsonLd data={faqSchema(FAQ_ITEMS, '/')} />
      <JsonLd
        data={serviceSchema({
          serviceType: 'Wdrożenie AI Agentów',
          name: 'Wdrożenie AI Agentów dla firm',
          description:
            'Budujemy AI Agentów, którzy wykonują pracę: odbierają telefony, odpisują klientom, umawiają wizyty i pilnują faktur. Dane w UE, zgodnie z RODO i AI Act. Pierwszy krok mały i odwracalny, rozliczenie za efekt.',
          path: '/',
        })}
      />
    </main>
  );
}
