import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/components/seo/schemas';
import { SITE } from '@/lib/site';
import { Section } from '@/components/ui';

/**
 * STRONA /polityka-prywatnosci — SSG (force-static). Wymagana RODO (art. 13)
 * PRZED zbieraniem danych w formularzu diagnozy. Treść w surowym HTML.
 *
 * UWAGA: to rzetelny szablon RODO wypełniony realnym NAP SimpleFast.ai. Przed
 * publikacją warto, by Paweł podmienił go na własną, finalną politykę (np. tę z
 * dotychczasowej strony) lub dał do przejrzenia prawnikowi. Dane administratora,
 * cele i podstawy są zgodne z realnym przepływem (formularz kontaktowy + obsługa
 * zgłoszenia). Zero zmyślonych podmiotów: wymienieni odbiorcy to realny stos
 * (hosting Netlify, automatyzacja Make.com) jako podmioty przetwarzające.
 */
export const dynamic = 'force-static';

const PATH = '/polityka-prywatnosci';
const UPDATED = '2026-07-03';
const UPDATED_LABEL = '3 lipca 2026';

export const metadata: Metadata = buildMetadata({
  title: 'Polityka prywatności',
  description:
    'Polityka prywatności SimpleFast.ai: kto jest administratorem danych, w jakim celu i na jakiej podstawie przetwarzamy dane z formularza, komu je powierzamy oraz jakie masz prawa (RODO).',
  path: PATH,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-h3 mt-10 first:mt-0">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-body text-fg-muted">{children}</p>;
}

export default function PolitykaPrywatnosciPage() {
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Start', path: '/' },
          { name: 'Polityka prywatności', path: PATH },
        ])}
      />

      <Section tone="base" containerWidth="narrow">
        <p className="text-overline uppercase tracking-[0.12em] text-accent">Dokument prawny</p>
        <h1 className="text-h1 mt-2">Polityka prywatności</h1>
        <p className="mt-4 text-body-sm text-fg-subtle">
          Ostatnia aktualizacja: <time dateTime={UPDATED}>{UPDATED_LABEL}</time>
        </p>

        <div className="mt-8">
          <P>
            Zależy nam, żeby było jasne, co dzieje się z Twoimi danymi, gdy zostawiasz nam kontakt.
            Poniżej tłumaczymy to prostym językiem, zgodnie z RODO (rozporządzenie UE 2016/679).
            Twoje dane zostają w Unii Europejskiej i nie sprzedajemy ich nikomu.
          </P>

          <H2>Kto jest administratorem Twoich danych?</H2>
          <P>
            Administratorem danych jest {SITE.name}. W sprawach dotyczących danych osobowych napisz na{' '}
            <a
              href={`mailto:${SITE.contact.email}`}
              className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
            >
              {SITE.contact.email}
            </a>{' '}
            lub zadzwoń pod {SITE.contact.phone}. Odpowiadamy w dni robocze, {SITE.contact.hours}.
          </P>

          <H2>Jakie dane zbieramy i skąd je mamy?</H2>
          <P>
            Zbieramy tylko to, co podajesz nam sam w formularzu diagnozy lub w wiadomości: imię,
            kontakt (e-mail albo telefon), opcjonalnie branżę, wielkość zespołu i to, czego
            potrzebujesz. Nie kupujemy baz danych i nie pozyskujemy Twoich danych z innych źródeł.
          </P>

          <H2>Dane z czatu z Agentem AI</H2>
          <P>
            Jeśli piszesz do naszego Agenta AI na stronie, zapisujemy treść rozmowy (Twoje
            wiadomości i odpowiedzi Agenta), aby ulepszać obsługę i odpowiedzieć na Twoje zapytanie.
            Jeśli w rozmowie zostawisz imię i e-mail, użyjemy ich wyłącznie po to, żeby się z Tobą
            skontaktować. Dane z czatu przetwarzamy na infrastrukturze w Unii Europejskiej
            (Make.com, region EU) i usuwamy je po 90 dniach. Podstawą jest Twoja zgoda oraz nasz
            uzasadniony interes w obsłudze zapytania (art. 6 ust. 1 lit. a i f RODO). Rozmowa
            z Agentem jest dobrowolna, a treść odpowiedzi generuje model AI.
          </P>

          <H2>W jakim celu i na jakiej podstawie przetwarzamy dane?</H2>
          <P>
            Dane z formularza przetwarzamy, żeby odpowiedzieć na Twoje zgłoszenie, umówić bezpłatną
            diagnozę i przedstawić ofertę. Podstawą jest Twoja zgoda (art. 6 ust. 1 lit. a RODO) oraz
            podjęcie działań na Twoje żądanie przed ewentualną umową (art. 6 ust. 1 lit. b RODO).
            Możemy też kontaktować się z Tobą w odpowiedzi na zapytanie w ramach naszego
            uzasadnionego interesu, czyli obsługi zgłoszenia (art. 6 ust. 1 lit. f RODO).
          </P>

          <H2>Komu powierzamy dane?</H2>
          <P>
            Dane mogą trafić do zaufanych dostawców, którzy pomagają nam prowadzić firmę: dostawcy
            hostingu i infrastruktury strony (Vercel) oraz narzędzia do obsługi, automatyzacji
            zgłoszeń i przechwytywania rozmów z Agentem (Make.com, region UE). Działają jako podmioty
            przetwarzające, na podstawie umów powierzenia,
            wyłącznie zgodnie z naszymi poleceniami. Dane są przetwarzane na terenie UE lub EOG.
            Nie przekazujemy ich poza EOG bez podstawy i odpowiednich zabezpieczeń wymaganych przez RODO.
          </P>

          <H2>Jak długo przechowujemy dane?</H2>
          <P>
            Dane ze zgłoszenia trzymamy tak długo, jak to potrzebne do jego obsługi i kontaktu z Tobą,
            a potem przez czas wynikający z naszego uzasadnionego interesu (np. dochodzenie lub obrona
            roszczeń) albo do czasu cofnięcia zgody. Gdy przestają być potrzebne, usuwamy je.
          </P>

          <H2>Jakie masz prawa?</H2>
          <P>
            Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia
            przetwarzania, przenoszenia, a także prawo sprzeciwu. Zgodę możesz wycofać w każdej chwili,
            co nie wpływa na zgodność z prawem przetwarzania sprzed wycofania. Masz też prawo wnieść
            skargę do Prezesa Urzędu Ochrony Danych Osobowych (PUODO). Żeby skorzystać z któregokolwiek
            prawa, napisz do nas na {SITE.contact.email}.
          </P>

          <H2>Czy podejmujemy decyzje automatycznie i profilujemy?</H2>
          <P>
            Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na automatycznym przetwarzaniu,
            które wywoływałyby skutki prawne lub podobnie istotne. Z Twoim zgłoszeniem pracuje człowiek.
          </P>

          <H2>Czy podanie danych jest obowiązkowe?</H2>
          <P>
            Podanie danych jest dobrowolne, ale bez kontaktu (e-mail lub telefon) nie odezwiemy się
            i nie umówimy diagnozy. Podajesz tylko tyle, ile potrzeba, żeby się skontaktować i pomóc.
          </P>

          <H2>Pliki cookies</H2>
          <P>
            Strona może używać niezbędnych plików cookies koniecznych do jej działania. Jeśli włączymy
            narzędzia analityczne, zaktualizujemy tę politykę i, gdy będzie to wymagane, poprosimy
            o zgodę. Ustawienia cookies kontrolujesz też w swojej przeglądarce.
          </P>

          <H2>Zmiany polityki</H2>
          <P>
            Jeśli zmienimy sposób przetwarzania danych, zaktualizujemy tę politykę i zmienimy datę na
            górze strony. Aktualna wersja jest zawsze dostępna pod tym adresem.
          </P>

          <p className="mt-10 border-t border-border pt-6 text-body-sm text-fg-subtle">
            Masz pytanie o swoje dane? Napisz na{' '}
            <a
              href={`mailto:${SITE.contact.email}`}
              className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
            >
              {SITE.contact.email}
            </a>
            . Wróć też na{' '}
            <Link href="/" className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover">
              stronę główną
            </Link>{' '}
            albo do{' '}
            <Link
              href="/kontakt"
              className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-hover"
            >
              kontaktu
            </Link>
            .
          </p>
        </div>
      </Section>
    </main>
  );
}
