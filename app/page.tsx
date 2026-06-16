import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, serviceSchema } from '@/components/seo/schemas';
import { FAQ_ITEMS } from '@/components/sections/faqData';

import { ScrollMetalProgress } from '@/components/motion/ScrollMetalProgress';
import { Hero } from '@/components/sections/Hero';
import { PasekZaufania } from '@/components/sections/PasekZaufania';
import { Problem } from '@/components/sections/Problem';
import { BranzeDemo } from '@/components/sections/BranzeDemo';
import { Rozwiazanie } from '@/components/sections/Rozwiazanie';
import { Bezpieczenstwo } from '@/components/sections/Bezpieczenstwo';
import { Dowod } from '@/components/sections/Dowod';
import { JakToDziala } from '@/components/sections/JakToDziala';
import { Oferta } from '@/components/sections/Oferta';
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
 * Kolejność (mapa emocji) jest częścią architektury — nie zmieniać bez decyzji:
 * lęk (2,4) zdejmujemy PRZED ceną (7); dowód towarzyszy zakrętom; CTA powtarza się.
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
  title: 'SimpleFast.ai: budujemy AI Agentów dla firm',
  description:
    'Budujemy AI Agentów dla polskich firm: odbierają telefony, odpisują klientom, umawiają wizyty. Dane w UE, zaczynasz od małego kroku, płacisz za efekt.',
  path: '/',
  ogImage: '/og/home.png',
});

export default function HomePage() {
  return (
    <main id="main">
      {/*
        Smaczek premium: metaliczny pasek postępu czytania (DEKORACJA, aria-hidden,
        client island). prefers-reduced-motion → nie renderuje się w ogóle.
        Treść/SSG/kolejność sekcji bez zmian — pasek leży nad układem, niczego nie
        zasłania (3px na górnej krawędzi). Wzorzec dla pozostałych stron.
      */}
      <ScrollMetalProgress />
      <Hero />
      <PasekZaufania />
      <Problem />
      <BranzeDemo />
      <Rozwiazanie />
      <Bezpieczenstwo />
      <Dowod />
      <JakToDziala />
      <Oferta />
      <GwarancjaEfektu />
      <DowodSpoleczny />
      <FAQ />
      <ZyweDemo />
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
