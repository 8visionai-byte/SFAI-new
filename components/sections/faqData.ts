/**
 * Dane FAQ strony głównej (spec 03 §9). Treść 1:1 z FAQPage JSON-LD i z widocznym
 * tekstem (Google karze rozjazd schema <-> treść). To są money queries dla GEO.
 *
 * ZASADA: zero literalnych [PLACEHOLDER] w tekście — ten string trafia 1:1 do
 * <script type="application/ld+json"> i może zostać zacytowany przez LLM jako fakt.
 * Dopóki Paweł nie poda realnych widełek/dni/modelu gwarancji, odpowiedzi cenowe
 * NIE podają zmyślonych liczb — kierują na bezpłatną diagnozę.
 * Importowane przez FAQ.tsx (render) i page.tsx (faqSchema).
 *
 * INPUT PAWŁA (do podmiany na konkret, gdy dane będą): realne widełki cen "od X",
 * realny czas wdrożenia w dniach, dokładny model gwarancji/success-fee.
 */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'Czy moje dane będą bezpieczne?',
    a: 'Tak. Twoje dane zostają w Unii Europejskiej i przetwarzamy je zgodnie z RODO oraz AI Act, który w pełni obowiązuje od 2 sierpnia 2026. Podpisujemy umowę powierzenia danych, a Ty przez cały czas widzisz, co Agent robi, i możesz go zatrzymać. Klient rozmawiający z Agentem zawsze wie, że rozmawia z AI.',
  },
  {
    q: 'Ile to kosztuje?',
    a: 'Koszt zależy od zakresu: inaczej wycenia się pojedynczy chatbot, inaczej pełnego Agenta obsługującego telefon i kalendarz. Dokładną cenę i widełki podajemy na bezpłatnej diagnozie, kiedy znamy już Twój proces, zanim cokolwiek zamówisz. Bez ukrytych kosztów i bez abonamentu na siłę.',
  },
  {
    q: 'Ile trwa wdrożenie?',
    a: 'Pierwszego Agenta stawiamy w dni, nie w miesiące. Prosty proces, jak chatbot na stronie, idzie szybciej, pełny Agent z telefonem i integracjami trochę dłużej, bo dochodzi łączenie z kalendarzem czy CRM. Dokładny termin podajemy na bezpłatnej diagnozie, kiedy znamy już zakres.',
  },
  {
    q: 'Boję się, że AI zastąpi moich ludzi. Co z zespołem?',
    a: 'AI Agent nie zastępuje zespołu, tylko zdejmuje z niego powtarzalną robotę. Ludzie przestają przepisywać dane i odbierać te same pytania, a zajmują się tym, czego maszyna nie zrobi: relacją z klientem i trudnymi sprawami. W praktyce zespół ma więcej czasu, nie mniej pracy do zwolnień.',
  },
  {
    q: 'Już raz przepaliłem budżet na agencję, która obiecywała cuda. Czym się różnicie?',
    a: 'Zaczynamy od bezpłatnej diagnozy i małego projektu, a nie od dużej umowy. Pokazujemy konkretne liczby, ile da się odzyskać, zanim cokolwiek zapłacisz. Płacisz za efekt, a wyniki publikujemy z nazwiskami klientów, nie jako anonimowe „zwiększyliśmy sprzedaż”.',
  },
  {
    q: 'Czym AI Agent różni się od chatbota?',
    a: 'Chatbot odpowiada na pytania, a AI Agent wykonuje całe zadania. Chatbot poda godziny otwarcia. Agent sprawdzi kalendarz, zaproponuje termin, zapisze wizytę i wyśle potwierdzenie. To różnica między systemem, który gada, a takim, który działa.',
  },
  {
    q: 'Jak sprawić, żeby ChatGPT, Gemini i Perplexity polecały moją firmę?',
    a: 'To zadanie dla pozycjonowania pod AI (GEO/AEO). Ustawiamy Twoją stronę tak, żeby silniki AI w ogóle widziały jej treść, umiały ją zacytować (bezpośrednia odpowiedź na początku, konkretne liczby, tabele, nagłówki w formie pytań) i miały dla niej autorytet spoza samej strony. To inna gra niż klasyczne SEO w Google, a liczy się coraz bardziej, bo klienci pytają AI „polećcie firmę do X”. Co tydzień sprawdzamy ręcznie w czterech silnikach, czy realnie zaczynasz padać w odpowiedziach.',
  },
  {
    q: 'Czy potrzebuję wiedzy technicznej, żeby to ogarnąć?',
    a: 'Nie. Całą część techniczną bierzemy na siebie, a Ty dostajesz gotowe, działające rozwiązanie i prosty panel, w którym widzisz, co się dzieje. Mówimy po ludzku, bez żargonu. Jeśli czegoś nie rozumiesz, to znaczy, że my źle wytłumaczyliśmy, nie Ty.',
  },
  {
    q: 'Co, jeśli to nie zadziała w mojej firmie?',
    a: 'Dlatego zaczynamy od diagnozy i małego kroku, a nie od wielkiego wdrożenia. Jeśli na diagnozie wyjdzie, że się nie opłaca, powiemy to wprost i nikt nikogo nie namawia. Umawiamy się na konkretny efekt i na diagnozie ustalamy, co się dzieje, gdy Agent go nie dowozi. Zasada jest prosta: płacisz za wynik, nie za obietnice.',
  },
];
