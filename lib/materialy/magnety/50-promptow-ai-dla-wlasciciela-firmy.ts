import type { Material } from '../types';

/**
 * MAGNET 1 — „50 promptów AI dla właściciela firmy".
 *
 * Realna treść: 50 gotowych promptów w 6 kategoriach (sprzedaż, marketing,
 * obsługa klienta, treści i social, zarządzanie i operacje, finanse i raporty).
 * Każdy prompt do skopiowania 1:1 do ChatGPT/Claude/Gemini. W nawiasach
 * kwadratowych pola, które user podmienia na swoje dane (to instrukcja dla
 * usera, nie zmyślona dana). Treść w całości w HTML = cytowalna i użyteczna bez PDF.
 */
export const promptyDlaWlasciciela: Material = {
  slug: '50-promptow-ai-dla-wlasciciela-firmy',
  tytul: '50 promptów AI dla właściciela firmy — gotowe do skopiowania',
  etykieta: 'Prompty',
  typPliku: 'PDF',
  ctaPobierz: 'Pobierz 50 promptów (PDF)',
  opis:
    '50 gotowych promptów dla właściciela firmy, pogrupowanych w sprzedaż, marketing, obsługę klienta, treści, zarządzanie i finanse. Kopiujesz, podmieniasz dane w nawiasach na swoje i wklejasz do ChatGPT, Claude czy Gemini. Każdy prompt rozwiązuje jedno konkretne zadanie.',
  zacheta:
    'Nie wiesz, o co pytać AI? Masz 50 gotowych promptów na maile, oferty, social media i obsługę klienta. Kopiujesz i używasz.',
  metaTitle: '50 promptów AI dla właściciela firmy (do skopiowania)',
  metaDescription:
    '50 gotowych promptów AI dla właściciela firmy: sprzedaż, marketing, obsługa klienta, treści i finanse. Kopiujesz, podmieniasz dane i wklejasz do ChatGPT. Za darmo.',
  data: '2026-06-16',
  dataAktualizacji: '2026-06-16',
  queries: [
    'prompty AI dla firm',
    'gotowe prompty AI dla właściciela firmy',
    'prompty ChatGPT dla biznesu',
    'prompty AI po polsku',
  ],
  tresc: [
    {
      typ: 'akapit',
      tekst:
        'To 50 gotowych promptów dla właściciela firmy. Każdy rozwiązuje jedno zadanie. Skopiuj prompt, podmień to, co jest w nawiasach kwadratowych, na swoje dane i wklej do ChatGPT, Claude lub Gemini. Nawiasy to miejsca na Twoje informacje, nie część polecenia.',
    },
    {
      typ: 'cytat',
      tekst:
        'Dobry prompt mówi AI trzy rzeczy: kim ma być, co ma zrobić i w jakiej formie ma to oddać. Te 50 promptów ma to wbudowane.',
    },
    {
      typ: 'akapit',
      tekst:
        'Jak czytać prompty niżej. Tekst w [nawiasach] zmieniasz na swoje. Reszta zostaje. Jeśli prompt prosi o dane, których nie masz pod ręką, dopisz na końcu zdanie: „Jeśli czegoś brakuje, dopytaj, zanim odpowiesz". Wtedy AI najpierw zapyta, a potem zrobi.',
    },

    { typ: 'naglowek', tekst: 'Sprzedaż (prompty 1-9)' },
    {
      typ: 'lista',
      punkty: [
        '1. Wciel się w doświadczonego handlowca B2B. Napisz mail z ofertą dla [typ klienta] na [produkt lub usługa]. Cena to [cena], główna korzyść to [korzyść]. Mail ma mieć max 120 słów, jeden konkretny powód do odpowiedzi i pytanie na końcu.',
        '2. Mam rozmowę handlową z [typ klienta]. Wypisz 10 pytań, które powinienem zadać, żeby zrozumieć jego problem, zanim cokolwiek zaproponuję. Pogrupuj je: sytuacja, ból, budżet, decyzja.',
        '3. Klient napisał: „[treść wiadomości klienta]". Odpisz tak, żeby posunąć rozmowę do przodu, nie naciskając. Zaproponuj jeden konkretny następny krok.',
        '4. Przygotuj 5 wersji krótkiej wiadomości follow-up do klienta, który dostał ofertę [ile dni] temu i nie odpisał. Każda inna w tonie: przypomnienie, wartość, pytanie, deadline, miękkie zamknięcie.',
        '5. Wypisz 7 najczęstszych obiekcji, jakie słyszę przy sprzedaży [produkt lub usługa], i do każdej napisz krótką, uczciwą odpowiedź. Bez nacisku, bez ściemy.',
        '6. Zamień tę suchą specyfikację produktu na opis korzyści dla [typ klienta]: „[wklej specyfikację]". Pisz prosto, mów o tym, co klient zyska, nie o funkcjach.',
        '7. Napisz skrypt rozmowy telefonicznej (cold call) do [typ klienta]. Pierwsze zdanie ma złapać uwagę w 8 sekund. Całość max 60 sekund mówienia. Cel: umówić krótkie spotkanie.',
        '8. Pomóż mi wycenić [produkt lub usługa]. Zadaj mi pytania o koszty, czas pracy i wartość dla klienta, a potem zaproponuj 3 warianty cenowe: minimalny, standard i premium.',
        '9. Napisz propozycję wartości (jedno zdanie) dla mojej firmy. Robimy [co robisz] dla [dla kogo], a różnimy się tym, że [czym się różnisz]. Daj 5 wersji do wyboru.',
      ],
    },

    { typ: 'naglowek', tekst: 'Marketing i pozyskiwanie klientów (prompty 10-18)' },
    {
      typ: 'lista',
      punkty: [
        '10. Zaplanuj kampanię na [kanał: Facebook / Google / mailing] dla [produkt lub usługa]. Podaj cel, grupę docelową, główny przekaz i 3 pomysły na kreację. Budżet to [budżet].',
        '11. Wypisz 15 pomysłów na posty dla mojej firmy z branży [branża]. Każdy pomysł w jednym zdaniu, z dopiskiem, jaki problem klienta rozwiązuje.',
        '12. Napisz 5 nagłówków reklamowych do [produkt lub usługa]. Każdy ma obiecywać konkretny efekt, nie cechę. Max 8 słów każdy.',
        '13. Stwórz personę mojego idealnego klienta dla [produkt lub usługa]. Opisz: kto to, jaki ma problem, czego się boi, gdzie szuka rozwiązań i co go przekonuje.',
        '14. Napisz tekst na stronę główną mojej firmy. Robimy [co robisz] dla [dla kogo]. Struktura: nagłówek, podtytuł, 3 korzyści, sekcja „jak to działa" w 3 krokach, wezwanie do działania.',
        '15. Zaproponuj 10 tematów na newsletter do moich klientów z branży [branża]. Każdy temat ma dawać im realną wartość, a nie tylko sprzedawać.',
        '16. Przeanalizuj ten opis mojej konkurencji: „[wklej tekst konkurencji]". Wypisz, co robią dobrze, czego im brakuje i jak mogę się od nich odróżnić.',
        '17. Napisz opis firmy do Google (Wizytówka Firmy) w 750 znakach. Branża: [branża], lokalizacja: [miasto], to, co nas wyróżnia: [wyróżnik]. Naturalnie wpleć frazy, których ludzie szukają.',
        '18. Wymyśl 5 pomysłów na lokalny marketing dla firmy [branża] w [miasto], które nie wymagają dużego budżetu. Przy każdym napisz pierwszy krok do wykonania w tym tygodniu.',
      ],
    },

    { typ: 'naglowek', tekst: 'Obsługa klienta (prompty 19-27)' },
    {
      typ: 'lista',
      punkty: [
        '19. Klient napisał reklamację: „[treść reklamacji]". Napisz spokojną, ludzką odpowiedź. Przeproś za problem, nie za istnienie, zaproponuj konkretne rozwiązanie i termin.',
        '20. Zamień tę szorstką odpowiedź na uprzejmą, ale wciąż konkretną: „[wklej swoją odpowiedź]".',
        '21. Napisz 10 gotowych odpowiedzi na najczęstsze pytania klientów w firmie [branża]. Wypisz najpierw pytania, potem krótkie odpowiedzi pod każdym.',
        '22. Klient prosi o rabat, którego nie mogę dać. Napisz odpowiedź, która odmawia, ale pokazuje wartość i zostawia relację dobrą. Trzy wersje w różnym tonie.',
        '23. Stwórz szablon maila potwierdzającego [zamówienie / rezerwację / termin]. Ma być ciepły, jasny i zawierać wszystko, co klient musi wiedzieć: co, kiedy, gdzie, co dalej.',
        '24. Napisz wiadomość z przeprosinami za opóźnienie w [czego dotyczy]. Bądź szczery, podaj nowy realny termin i zaproponuj coś, co naprawi wrażenie.',
        '25. Przygotuj ankietę satysfakcji dla moich klientów: 5 krótkich pytań, które realnie powiedzą mi, co poprawić. Bez pytań dla samego pytania.',
        '26. Klient jest zdenerwowany i pisze emocjonalnie: „[treść]". Najpierw wypisz, co naprawdę chce powiedzieć między wierszami, a potem napisz odpowiedź, która go uspokoi.',
        '27. Stwórz zestaw 5 standardowych odpowiedzi na opinie w internecie: 2 na pozytywne, 2 na negatywne, 1 na niesprawiedliwą. Ton: ludzki, konkretny, bez kopiuj-wklej.',
      ],
    },

    { typ: 'naglowek', tekst: 'Treści i social media (prompty 28-36)' },
    {
      typ: 'lista',
      punkty: [
        '28. Napisz post na [Facebook / LinkedIn / Instagram] o [temat]. Zacznij od zdania, które zatrzyma scroll. Pisz prosto, jedna myśl, na końcu pytanie do czytelnika.',
        '29. Z tego jednego pomysłu zrób 5 różnych postów na social media: „[Twój pomysł]". Każdy pod innym kątem, żeby nie brzmiały tak samo.',
        '30. Napisz scenariusz krótkiego filmu (do 60 sekund) o [produkt lub usługa]. Podziel na sceny, dopisz, co mówić i co pokazać. Hak w pierwszych 3 sekundach.',
        '31. Zamień ten długi tekst na 5 krótkich punktów na social media: „[wklej tekst]". Każdy punkt ma się bronić sam.',
        '32. Wymyśl 10 nagłówków do artykułu o [temat]. Połowa jak pytanie, połowa z liczbą lub obietnicą konkretnego efektu.',
        '33. Napisz opis pod zdjęcie [czego dotyczy zdjęcie] na Instagram. Krótki, z osobowością, 3 trafne hasztagi branżowe na końcu.',
        '34. Pomóż mi opowiedzieć historię klienta. Klient: [kto], problem: [problem], co zrobiliśmy: [rozwiązanie], efekt: [wynik]. Napisz to jak prawdziwą historię, nie jak chwalenie się.',
        '35. Przygotuj plan postów na 2 tygodnie dla firmy [branża]. 3 posty w tygodniu, każdy z innym celem: edukacja, dowód, sprzedaż. Podaj temat i pierwsze zdanie każdego.',
        '36. Sprawdź ten tekst pod kątem prostoty. Wskaż zdania zbyt długie, żargon i miejsca, gdzie czytelnik się zgubi: „[wklej tekst]". Zaproponuj poprawki.',
      ],
    },

    { typ: 'naglowek', tekst: 'Zarządzanie i operacje (prompty 37-44)' },
    {
      typ: 'lista',
      punkty: [
        '37. Pomóż mi rozpisać proces [nazwa procesu, np. obsługa nowego zamówienia] krok po kroku. Wypisz każdy etap, kto za niego odpowiada i co może pójść nie tak.',
        '38. Mam do zrobienia [opisz duże zadanie]. Rozbij to na konkretne kroki, ułóż je w kolejności i oznacz, które mogę oddać komuś innemu.',
        '39. Napisz ogłoszenie o pracę na stanowisko [stanowisko] w firmie [branża]. Pokaż, czym się zajmujemy, kogo szukamy i dlaczego warto. Bez korpo-ściemy.',
        '40. Przygotuj 10 pytań na rozmowę rekrutacyjną na [stanowisko], które naprawdę sprawdzą, czy ktoś się nadaje, a nie tylko czy ładnie mówi.',
        '41. Stwórz prostą instrukcję (onboarding) dla nowej osoby na stanowisku [stanowisko]: co ma wiedzieć i zrobić w pierwszym tygodniu, krok po kroku.',
        '42. Mam dwie opcje: [opcja A] i [opcja B]. Wypisz plusy i minusy każdej dla mojej firmy, a potem powiedz, którą byś wybrał i dlaczego.',
        '43. Zamień te chaotyczne notatki ze spotkania na uporządkowane podsumowanie z listą zadań (kto, co, do kiedy): „[wklej notatki]".',
        '44. Pomóż mi przygotować agendę spotkania zespołu na temat [temat]. Maksymalnie 30 minut, z konkretnym celem i punktem decyzyjnym na końcu.',
      ],
    },

    { typ: 'naglowek', tekst: 'Finanse, raporty i decyzje (prompty 45-50)' },
    {
      typ: 'lista',
      punkty: [
        '45. Wyjaśnij mi prostym językiem, co oznaczają te liczby z mojego biznesu: „[wklej dane]". Powiedz, co jest dobre, co niepokojące i na co zwrócić uwagę.',
        '46. Pomóż mi policzyć, czy opłaca się [decyzja, np. zatrudnić kogoś / kupić sprzęt]. Zadaj mi pytania o koszty i korzyści, a potem podsumuj prostym rachunkiem.',
        '47. Napisz uprzejme przypomnienie o zaległej płatności do klienta [kto], faktura na [kwota] z terminem [data]. Stanowczo, ale tak, żeby nie zepsuć relacji.',
        '48. Zamień te dane sprzedażowe w czytelne podsumowanie miesiąca: „[wklej dane]". Co wzrosło, co spadło, jeden wniosek na następny miesiąc.',
        '49. Pomóż mi przygotować prosty budżet na [projekt lub miesiąc]. Wypisz kategorie kosztów, o których łatwo zapomnieć w firmie [branża].',
        '50. Jestem przed decyzją: [opisz decyzję]. Zadaj mi 5 trudnych pytań, które powinienem sobie zadać, zanim ją podejmę. Nie odpowiadaj za mnie, tylko zmuś mnie do myślenia.',
      ],
    },

    {
      typ: 'naglowek',
      tekst: 'Jak wycisnąć z tych promptów więcej?',
    },
    {
      typ: 'lista',
      punkty: [
        'Dodaj kontekst. Im więcej AI wie o Twojej firmie, tym lepsza odpowiedź. Na początek rozmowy wklej 3-4 zdania o tym, co robisz i dla kogo.',
        'Proś o kilka wersji. Dopisz „daj 3 wersje", a wybierzesz najlepszą zamiast brać pierwszą lepszą.',
        'Poprawiaj w dialogu. Pierwsza odpowiedź to szkic. Napisz „skróć", „bardziej bezpośrednio", „mniej formalnie", aż będzie Twoje.',
        'Zapisuj te, które działają. Gdy prompt da dobry efekt, wklej go do notatnika. Po miesiącu masz własną bibliotekę.',
      ],
    },
    {
      typ: 'akapit',
      tekst:
        'Gotowy prompt to dobry start. Gotowy system, który robi to za Ciebie codziennie, to coś więcej. Jeśli któreś z tych zadań robisz co dzień ręcznie, to znak, że da się je zautomatyzować. Pokażemy gdzie, jeśli chcesz.',
    },
  ],
  faq: [
    {
      pytanie: 'Czy te prompty są darmowe?',
      odpowiedz:
        'Tak. Czytasz wszystkie 50 promptów w całości na tej stronie, za darmo i bez logowania. PDF do pobrania to dodatek dla wygody, nie bramka.',
    },
    {
      pytanie: 'W jakim AI mam ich używać?',
      odpowiedz:
        'W dowolnym. Prompty działają w ChatGPT, Claude i Gemini. Kopiujesz prompt, podmieniasz dane w nawiasach na swoje i wklejasz do okna czatu.',
    },
    {
      pytanie: 'Co oznaczają nawiasy kwadratowe w promptach?',
      odpowiedz:
        'Nawiasy [tak] to miejsca na Twoje dane, na przykład nazwę produktu, cenę albo typ klienta. Podmieniasz je na swoje, zanim wyślesz prompt. Reszta tekstu zostaje bez zmian.',
    },
    {
      pytanie: 'Prompt dał słabą odpowiedź, co robić?',
      odpowiedz:
        'Dopisz więcej kontekstu o swojej firmie i poproś o poprawkę w tej samej rozmowie. Napisz „skróć", „bardziej bezpośrednio" albo „dodaj konkretny przykład". Pierwsza odpowiedź to szkic, nie wynik końcowy.',
    },
  ],
};
