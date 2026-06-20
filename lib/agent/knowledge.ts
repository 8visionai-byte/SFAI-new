/**
 * lib/agent/knowledge.ts
 *
 * BAZA WIEDZY AGENTA SimpleFast.ai (nawigator strony).
 *
 * Jedno zrodlo prawdy dla bota-czatu: STRUKTURALNA mapa firmy zbudowana z tresci
 * strony (rejestry w lib/*). Kazdy wpis = answer-first 2-3 zdania (glos Pawla, zero
 * em-dash), realny URL zakladki (ze ROUTES / rejestrow) + frazy/intencje.
 *
 * Zasady (north star):
 *  - TYLKO o SimpleFast.ai i AI dla firm.
 *  - ZERO myslnika (em-dash) w tresci.
 *  - ZERO zmyslonych liczb: kwoty i metryki sa wziete 1:1 z rejestrow.
 *  - Linki = realne sciezki. Slugi uslug zweryfikowane 1:1 z lib/uslugi/*.ts (slug
 *    w module = trasa SSG /uslugi/[usluga]). Produkty/narzedzia zyja na hubach z
 *    kotwicami #<slug> (brak tras per-slug), wiec deep-linki to /produkty#<slug>
 *    i /narzedzia#<slug> (id renderowane przez ProduktCard i Section narzedzia).
 *
 * Ten plik jest CZYSTYM DANYM (zero zaleznosci, brak 'use client'/'server-only'),
 * wiec mozna go importowac i po stronie serwera (route handler), i w komponentach.
 * Nie zawiera sekretow.
 */

export type KnowledgeEntry = {
  /** Stabilny identyfikator wpisu (do debugowania / ewentualnej analityki). */
  id: string;
  /** Sekcja mapy firmy (Uslugi, Produkty i narzedzia, Wiedza, Firma). */
  section: string;
  /** Krotki tytul wpisu. */
  title: string;
  /** Answer-first 2-3 zdania, glos Pawla, zero em-dash. */
  summary: string;
  /** Realna sciezka zakladki (z ROUTES / rejestrow). Nigdy zmyslona. */
  url: string;
  /** Frazy i intencje, ktore ten wpis pokrywa (pomagaja modelowi trafic w link). */
  intents: string[];
};

/**
 * Pelna mapa firmy. Kolejnosc grupuje wpisy wg sekcji, zeby model widzial je w
 * logicznych klastrach (uslugi -> produkty/narzedzia -> wiedza -> firma).
 */
export const KNOWLEDGE: KnowledgeEntry[] = [
  // =========================================================================
  // USLUGI (zrodlo: lib/uslugi/*; hub /uslugi; parasol /uslugi/architekci-wartosci-ai)
  // Slugi zweryfikowane 1:1 z modulami lib/uslugi/*.ts.
  // =========================================================================
  {
    id: 'uslugi-przeglad',
    section: 'Uslugi',
    title: 'Jakie uslugi AI oferuje SimpleFast.ai',
    summary:
      'Oferujemy dziesiec uslug AI dla firm w trzech grupach: obsluga 24/7 (chatboty, voiceboty, agent rekrutacyjny), back-office i procesy (automatyzacje, faktury OCR/KSeF, opieka AI) oraz budowa i strategia (audyt AI, rozwiazania na zamowienie, strony www, pozycjonowanie pod AI). Budujemy AI Agentow, ktorzy wykonuja prace pod nadzorem czlowieka, nie tylko gadaja. Zaczynasz od jednej rzeczy, ktora zzera najwiecej czasu, a Twoje dane zostaja w Unii Europejskiej.',
    url: '/uslugi',
    intents: [
      'jakie macie uslugi',
      'co oferujecie',
      'uslugi AI dla firm',
      'oferta SimpleFast',
      'co robicie',
      'lista uslug',
      'z czym pomagacie',
    ],
  },
  {
    id: 'uslugi-architekci-wartosci-ai',
    section: 'Uslugi',
    title: 'Architekci Wartosci AI: wdrozenie AI rozliczane za efekt',
    summary:
      'Architekci Wartosci AI to nasz najszerszy model: jestesmy Twoim dzialem od AI zamiast etatu, sami sprawdzamy gdzie tracisz godziny, budujemy automatyzacje i je utrzymujemy. Rozliczamy sie za przyniesiona wartosc, czyli odzyskane godziny i zlotowki, a nie za godziny pracy. Zaczynasz za 0 zl od darmowej diagnozy, a pierwszy platny krok to Sprint Diagnostyczny za 1490 zl, ktory odliczamy od wdrozenia.',
    url: '/uslugi/architekci-wartosci-ai',
    intents: [
      'architekci wartosci AI',
      'zewnetrzny dzial AI',
      'rozliczanie za efekt',
      'place za wartosc nie za godziny',
      'kompleksowa wspolpraca AI',
      'model abonamentowy AI',
      'od czego zaczac wspolprace',
    ],
  },
  {
    id: 'uslugi-chatboty',
    section: 'Uslugi',
    title: 'Chatbot AI dla firmy',
    summary:
      'Chatbot AI dla firmy to asystent, ktory odpowiada klientom na stronie i w komunikatorach przez cala dobe: tlumaczy oferte, podaje ceny i godziny, zbiera leady, nawet o 22:00. U nas chatbot to pierwszy krok do Agenta, ktory nie tylko odpowiada, ale i dziala: umawia, zapisuje, przekazuje sprawe dalej. Wdrazamy go w dni, uczymy na Twojej wiedzy, a dane zostaja w Unii Europejskiej.',
    url: '/uslugi/chatboty',
    intents: [
      'chatbot dla firmy',
      'wdrozenie chatbota',
      'ile kosztuje chatbot',
      'chatbot AI dla firmy',
      'chatbot na strone www',
      'bot odpowiadajacy klientom',
      'chatbot a agent AI',
    ],
  },
  {
    id: 'uslugi-voiceboty',
    section: 'Uslugi',
    title: 'Voicebot dla firmy, ktory odbiera telefon za Ciebie',
    summary:
      'Voicebot to bot glosowy, ktory odbiera telefon, rozmawia po polsku i zalatwia sprawe: umawia wizyte, przyjmuje zgloszenie, odpowiada na pytanie albo oddzwania do klienta, ktory nie dodzwonil sie za pierwszym razem. Dziala 24/7, tez gdy jestes u klienta, i to nie nagranie ani menu wcisnij jeden. Klient zawsze slyszy, ze rozmawia z asystentem AI, a po rozmowie dostajesz krotkie podsumowanie.',
    url: '/uslugi/voiceboty',
    intents: [
      'voicebot dla firmy',
      'bot glosowy',
      'czym jest voicebot',
      'AI odbiera telefon',
      'automatyczne odbieranie telefonu',
      'bot ktory dzwoni',
      'umawianie wizyt przez telefon',
    ],
  },
  {
    id: 'uslugi-agent-rekrutacyjny',
    section: 'Uslugi',
    title: 'Agent AI do rekrutacji i pierwszego kontaktu',
    summary:
      'Agent AI do rekrutacji to cyfrowy pracownik, ktory bierze na siebie pierwsza linie: zbiera CV, robi pierwszy odsiew i scoring, odpowiada kandydatom, umawia rozmowy i przygotowuje rekruterowi gotowa notatke. Dziala jak outsourcing HR, tylko przez cala dobe i zawsze tak samo. Decyzje o zatrudnieniu zawsze podejmuje czlowiek, a dane kandydatow zostaja w Unii Europejskiej zgodnie z RODO.',
    url: '/uslugi/agent-rekrutacyjny',
    intents: [
      'agent rekrutacyjny AI',
      'automatyzacja rekrutacji',
      'AI do rekrutacji',
      'agent AI do rekrutacji',
      'pierwszy kontakt z kandydatem AI',
      'scoring CV',
      'odsiew kandydatow AI',
    ],
  },
  {
    id: 'uslugi-automatyzacje',
    section: 'Uslugi',
    title: 'Automatyzacja procesow w firmie z AI',
    summary:
      'Automatyzacja procesow AI to przejecie przez system powtarzalnej roboty, ktora dzis robi czlowiek: przepisywania danych miedzy mailem, arkuszem i faktura, wysylania potwierdzen, pilnowania terminow. Nie sprzedajemy narzedzi, projektujemy dzialajacy proces end-to-end i wdrazamy go w dni, nie w miesiace. Zaczynamy od jednego procesu, ktory boli najbardziej, a Twoje dane zostaja w Unii Europejskiej.',
    url: '/uslugi/automatyzacje',
    intents: [
      'automatyzacja procesow AI',
      'agencja automatyzacji AI',
      'wdrozenie automatyzacji',
      'automatyzacja procesow w firmie',
      'automatyzacja powtarzalnej roboty',
      'laczenie systemow',
      'ile kosztuje automatyzacja',
    ],
  },
  {
    id: 'uslugi-dokumenty-faktury',
    section: 'Uslugi',
    title: 'Automatyzacja dokumentow i faktur (OCR, KSeF)',
    summary:
      'Automatyzacja faktur to system, ktory sam odczytuje fakture OCR-em, wyciaga kwoty, NIP i daty, przypisuje koszt do kategorii i wpisuje wszystko do arkusza lub programu ksiegowego, a na koniec eksportuje do KSeF. Robi to dla skanu, PDF-u i zdjecia z telefonu, wiec nie przepisujesz nic recznie. Najjasniejszy zysk widza biura rachunkowe, a dane faktur zostaja w Unii Europejskiej.',
    url: '/uslugi/dokumenty-faktury',
    intents: [
      'automatyzacja faktur',
      'OCR faktur AI',
      'automatyzacja dokumentow',
      'KSeF',
      'automatyczne ksiegowanie faktur',
      'odczyt faktur',
      'AI dla biura rachunkowego',
    ],
  },
  {
    id: 'uslugi-opieka-ai',
    section: 'Uslugi',
    title: 'Opieka AI: utrzymanie i rozwoj automatyzacji',
    summary:
      'Opieka AI to stala opieka nad Twoimi agentami i automatyzacjami: pilnujemy, zeby dzialaly, poprawiamy je gdy cos sie zmienia, i rozwijamy w miare potrzeb. To serwis IT, tylko od AI: co miesiac monitorujemy, dostrajamy prompty, latamy integracje i wysylamy raport ze zmianami. Pracujemy na ryczalcie godzin 10, 20 albo 40 godzin miesiecznie, od 3000 zl, a dane zostaja w Unii Europejskiej.',
    url: '/uslugi/opieka-ai',
    intents: [
      'opieka AI',
      'utrzymanie automatyzacji',
      'abonament AI dla firmy',
      'serwis AI dla firmy',
      'utrzymanie agentow AI',
      'ile kosztuje opieka AI',
      'monitoring automatyzacji',
    ],
  },
  {
    id: 'uslugi-audyt-ai',
    section: 'Uslugi',
    title: 'Audyt AI firmy: mapa oszczednosci czasu',
    summary:
      'Audyt AI firmy to platny Sprint Diagnostyczny za 1490 zl, w ktorym rozkladamy Twoje procesy na czynniki i pokazujemy, gdzie AI da realny zysk, a gdzie to przepalanie kasy. Dostajesz Action Plan: mape oszczednosci czasu z konkretnymi miejscami do automatyzacji, ulozonymi od najwiekszego zwrotu. Cena 1490 zl odliczana jest od wdrozenia, gdy ruszamy z robota, wiec najpierw mapa, potem decyzja, dopiero potem wydatek.',
    url: '/uslugi/audyt-ai',
    intents: [
      'audyt AI firmy',
      'mapa oszczednosci czasu',
      'gdzie wdrozyc AI',
      'audyt AI dla firmy',
      'gdzie wdrozyc AI w firmie',
      'sprint diagnostyczny',
      'od czego zaczac z AI',
      'action plan AI',
    ],
  },
  {
    id: 'uslugi-rozwiazania',
    section: 'Uslugi',
    title: 'Indywidualne rozwiazania AI: aplikacje i wtyczki na zamowienie',
    summary:
      'Czasem gotowy chatbot czy automatyzacja nie wystarcza, bo Twoj problem jest tylko Twoj. Wtedy budujemy rozwiazanie na miare: aplikacje webowa, wtyczke do narzedzia, ktorego uzywasz, albo Agenta spietego z kilkoma systemami naraz. Projektujemy dokladnie to, czego potrzebuje Twoj proces, zaczynamy od najmniejszej dzialajacej wersji, a Twoje dane i kod zostaja po Twojej stronie, w Unii Europejskiej.',
    url: '/uslugi/rozwiazania',
    intents: [
      'indywidualne rozwiazania AI',
      'wtyczki AI',
      'aplikacje AI dla firm',
      'aplikacja webowa na zamowienie',
      'wtyczka AI do CRM',
      'oprogramowanie na miare',
      'AI na zamowienie',
      'custom rozwiazanie AI',
    ],
  },
  {
    id: 'uslugi-strony-www',
    section: 'Uslugi',
    title: 'Tworzenie stron WWW widocznych w Google i w AI',
    summary:
      'Budujemy strony widoczne nie tylko w Google, ale i w ChatGPT, Claude, Gemini oraz Perplexity. Wiekszosc stron jest dla AI niewidoczna, bo tresc doczytuje sie skryptem, a boty tego nie czytaja, wiec my oddajemy cala tresc od razu w czystym kodzie i ukladamy ja pod cytowanie. Robimy to szybko, dbamy o lekkosc strony, a na koniec sprawdzamy, czy realnie padasz w odpowiedziach silnikow AI.',
    url: '/uslugi/strony-www',
    intents: [
      'tworzenie stron z AI',
      'strona internetowa AI',
      'strona pod SEO/GEO',
      'strona pozycjonowana pod AI',
      'strona widoczna w ChatGPT',
      'budowa strony www',
      'szybka strona pod AI',
    ],
  },
  {
    id: 'uslugi-optymalizacja',
    section: 'Uslugi',
    title: 'Pozycjonowanie pod AI: badz cytowany w ChatGPT i Perplexity',
    summary:
      'Pozycjonowanie pod AI (GEO) to ustawienie Twojej strony tak, zeby ChatGPT, Claude, Gemini i Perplexity polecaly ja w odpowiedziach, a nie tylko Google w wynikach. Nie musisz budowac strony od nowa: bierzemy to, co masz, i naprawiamy trzy rzeczy, czyli czy boty widza Twoja tresc, czy da sie ja zacytowac i czy masz autorytet poza strona. Potem mierzymy co tydzien w czterech silnikach, czy realnie zaczynasz padac w odpowiedziach.',
    url: '/uslugi/optymalizacja',
    intents: [
      'pozycjonowanie pod AI',
      'GEO',
      'optymalizacja SEO',
      'cytowalnosc w ChatGPT',
      'pozycjonowanie pod ChatGPT',
      'widocznosc w Perplexity',
      'SEO dla AI',
      'jak byc polecanym przez AI',
    ],
  },

  // =========================================================================
  // PRODUKTY I NARZEDZIA (zrodlo: lib/produkty/*, lib/narzedzia/*; huby z kotwicami)
  // Kotwice produktow = ProduktCard id={produkt.slug}; kotwice narzedzi = Section id={n.slug}.
  // =========================================================================
  {
    id: 'produkty-przeglad',
    section: 'Produkty i narzedzia',
    title: 'Jakie produkty ma SimpleFast.ai',
    summary:
      'Mamy cztery wlasne produkty AI, kazdy to dzialajacy punkt wyjscia do customu, nie pudelko z polki: skaner faktur do KSeF, aplikacja coachingowa z agentami, apka obecnosci i skladek oraz centrum dowodzenia sterowane glosem. Pod katalogiem trzymamy tez klocki-mozliwosci, z ktorych skladamy indywidualne rozwiazanie pod Twoj proces. Pelna liste z opisami zobaczysz na stronie produktow.',
    url: '/produkty',
    intents: [
      'jakie macie produkty',
      'gotowe produkty AI',
      'co zbudowaliscie',
      'produkty AI dla firm',
      'lista produktow',
    ],
  },
  {
    id: 'produkt-skaner-faktur-ksef',
    section: 'Produkty i narzedzia',
    title: 'Skaner i automat faktur do KSeF',
    summary:
      'Robisz zdjecie albo skan faktury, system wyciaga dane do arkusza i programu ksiegowego, a raz w miesiacu automat przygotowuje eksport do KSeF. Nikt nie przepisuje numerow z papieru recznie, wiec znika ryzyko literowki w kwocie. To rozwiazanie dziala u nas i jest punktem wyjscia do zlozenia pod Twoj program ksiegowy.',
    url: '/produkty#skaner-faktur-ksef',
    intents: [
      'skaner faktur',
      'automat faktur',
      'OCR faktur',
      'przepisywanie faktur',
      'automatyzacja ksiegowosci',
      'faktury do programu ksiegowego',
    ],
  },
  {
    id: 'produkt-app-coachingowa',
    section: 'Produkty i narzedzia',
    title: 'Aplikacja coachingowa z agentami',
    summary:
      'To apka, w ktorej logujesz posilki i cele, a agent uklada Ci plan dnia i rozmawia o tym, co trudne, gdy brakuje motywacji. To nie sztywny tracker z tabelkami, tylko agent znajacy Twoj kontekst, ktory podpowiada nastepny maly krok. To MVP i punkt wyjscia do customu, ten sam silnik skladamy pod zdrowie, finanse, nauke czy onboarding.',
    url: '/produkty#app-coachingowa-z-agentami',
    intents: [
      'aplikacja coachingowa',
      'agent planujacy dzien',
      'app z agentami',
      'asystent nawykow',
      'agent coachingowy',
    ],
  },
  {
    id: 'produkt-apka-obecnosci-skladek',
    section: 'Produkty i narzedzia',
    title: 'Apka obecnosci i skladek zespolu',
    summary:
      'Trzyma w jednym miejscu dwie rzeczy: kto byl obecny i kto ma oplacona skladke, wiec od razu widzisz, kto zalega, bez przeklikiwania zeszytu czy grupy na komunikatorze. Dziala u nas i jest dla trenerow, kol, klubow i malych zespolow. To punkt wyjscia do customu, ten sam szkielet skladamy pod klub, szkolke czy wspolnote.',
    url: '/produkty#apka-obecnosci-skladek',
    intents: [
      'apka obecnosci',
      'sledzenie skladek',
      'kto wplacil',
      'obecnosc zespolu',
      'apka dla klubu',
      'apka dla trenera',
      'obecnosc i skladki',
    ],
  },
  {
    id: 'produkt-centrum-dowodzenia',
    section: 'Produkty i narzedzia',
    title: 'Centrum dowodzenia sterowane glosem',
    summary:
      'Mowisz na glos zadanie, pomysl albo notatke, a agent tworzy z tego rekord i sam decyduje, gdzie to trafia, do kogo i z jakim priorytetem. Nie musisz otwierac pieciu narzedzi i klikac w formularze, wyrzucasz mysl glosem, a porzadek robi sie za Ciebie. To MVP i punkt wyjscia do customu, spinamy je z narzedziami, ktorych juz uzywasz.',
    url: '/produkty#centrum-dowodzenia',
    intents: [
      'centrum dowodzenia',
      'dyktowanie zadan glosem',
      'agent zapisujacy zadania',
      'glosowe notatki z priorytetem',
      'zarzadzanie zadaniami glosem',
    ],
  },
  {
    id: 'produkty-klocki',
    section: 'Produkty i narzedzia',
    title: 'Klocki, z ktorych skladamy indywidualne rozwiazania',
    summary:
      'Pod produktami trzymamy katalog klockow-mozliwosci: agent obslugi 24/7, agent rekrutacyjny, OCR i faktury, monitoring procesow, wirtualny pracownik od maila i kalendarza, RAG-chatbot bazy wiedzy, podsumowania spotkan i transkrypcja rozmow. To pomysly i klocki, nie finalne wykonanie, kazdy mozna rozwinac, polaczyc i zlozyc pod Twoj proces. Caly katalog znajdziesz na stronie produktow.',
    url: '/produkty',
    intents: [
      'klocki mozliwosci',
      'co potraficie zbudowac',
      'agent obslugi 24/7',
      'RAG chatbot',
      'monitoring procesow',
      'co da sie zautomatyzowac',
      'indywidualne rozwiazania',
    ],
  },
  {
    id: 'narzedzia-przeglad',
    section: 'Produkty i narzedzia',
    title: 'Jakie darmowe narzedzia ma SimpleFast.ai',
    summary:
      'Mamy piec darmowych narzedzi bez logowania: kalkulator oszczednosci z automatyzacji, kalkulator oplacalnosci konkretnego procesu, test gotowosci firmy na AI, audyt strony pod AI (GEO) i generator promptow dla firm. Kazde liczy lub podpowiada na Twoich danych w kilkadziesiat sekund, bez podawania maila. Wszystkie znajdziesz na stronie narzedzi.',
    url: '/narzedzia',
    intents: [
      'jakie darmowe narzedzia',
      'darmowe narzedzia AI',
      'kalkulatory',
      'testy AI',
      'narzedzia bez logowania',
      'co macie za darmo',
      'lista narzedzi',
    ],
  },
  {
    id: 'narzedzie-kalkulator-oszczednosci',
    section: 'Produkty i narzedzia',
    title: 'Kalkulator oszczednosci z automatyzacji',
    summary:
      'Wpisujesz, ile osob ile godzin tygodniowo traci na powtarzalnej robocie, a kalkulator pokazuje, ile zlotych rocznie odzyskasz po automatyzacji. Liczy w 10 sekund, bez maila i bez logowania. To kwota, ktorej dzis nie liczy nikt.',
    url: '/narzedzia#kalkulator-oszczednosci',
    intents: [
      'kalkulator oszczednosci',
      'ile zaoszczedze na automatyzacji',
      'ile odzyskam godzin',
      'oszczednosc czasu',
      'policz oszczednosci',
    ],
  },
  {
    id: 'narzedzie-kalkulator-procesu',
    section: 'Produkty i narzedzia',
    title: 'Kalkulator oplacalnosci procesu',
    summary:
      'Liczy koszt jednego konkretnego procesu rocznie i to, po ilu miesiacach zwroci sie dowolne wdrozenie. Koszt wdrozenia podajesz Ty, wiec sprawdzisz nim kazda oferte, ktora dostaniesz. Sprawdz, czy konkretna automatyzacja sie spina.',
    url: '/narzedzia#kalkulator-procesu',
    intents: [
      'czy warto zautomatyzowac',
      'kalkulator procesu',
      'zwrot z wdrozenia',
      'po ilu miesiacach sie zwroci',
      'oplacalnosc automatyzacji',
      'ROI automatyzacji',
    ],
  },
  {
    id: 'narzedzie-test-gotowosci-ai',
    section: 'Produkty i narzedzia',
    title: 'Test gotowosci firmy na AI',
    summary:
      'Osiem pytan ocenia cztery rzeczy: procesy, dane, ludzi i pierwszy proces do zdjecia. Na koniec dostajesz poziom gotowosci i trzy konkretne rekomendacje, od czego zaczac, nawet gdy nie znasz swoich liczb.',
    url: '/narzedzia#test-gotowosci-ai',
    intents: [
      'test gotowosci na AI',
      'czy firma jest gotowa na AI',
      'od czego zaczac z AI',
      'ocena gotowosci AI',
      'quiz AI',
    ],
  },
  {
    id: 'narzedzie-audyt-strony-ai',
    section: 'Produkty i narzedzia',
    title: 'Audyt strony pod AI (GEO)',
    summary:
      'Dziesiec pytan o Twojej stronie pokazuje, czy ChatGPT i Perplexity moga ja cytowac, liczy wynik i wskazuje trzy rzeczy do naprawy najpierw. Nie pobieramy kodu strony, oceniasz ja sam. Sprawdz, czy AI widzi Twoja strone, czy pustke.',
    url: '/narzedzia#audyt-strony-ai',
    intents: [
      'audyt strony pod AI',
      'czy ChatGPT widzi moja strone',
      'pozycjonowanie pod AI',
      'czy AI cytuje strone',
      'audyt GEO',
    ],
  },
  {
    id: 'narzedzie-generator-promptow',
    section: 'Produkty i narzedzia',
    title: 'Generator promptow AI dla firm',
    summary:
      'Wybierasz branze, zadanie, cel i styl, a generator sklada gotowy prompt do skopiowania, taki, ktory od razu dziala w ChatGPT czy Claude. Deterministyczne szablony, zero logowania, zero czekania, masz gotowy prompt w 30 sekund. Przestan walczyc z pustym polem.',
    url: '/narzedzia#generator-promptow',
    intents: [
      'generator promptow',
      'gotowe prompty',
      'prompty dla firm',
      'jak napisac prompt',
      'prompt do ChatGPT',
      'prompt do Claude',
    ],
  },

  // =========================================================================
  // WIEDZA (zrodlo: hub /wiedza + dzialy /poradniki, /ai-radar, /blog, /materialy)
  // Slugi poradnikow i blogow zweryfikowane 1:1 z lib/poradniki i lib/blog.
  // =========================================================================
  {
    id: 'wiedza-hub',
    section: 'Wiedza',
    title: 'Centrum Wiedzy AI dla firm (hub)',
    summary:
      'Centrum Wiedzy to jedno miejsce, gdzie wlasciciel firmy znajdzie odpowiedz na pytanie o AI: ile co kosztuje, co automatyzowac i jak zaczac bez ryzyka. Zbiera cztery dzialy: poradniki krok po kroku, newsy AI z filtrem dla firm, nasze przemyslenia i case studies z liczbami. Wszystko prostym jezykiem, z liczbami i bez owijania w bawelne.',
    url: '/wiedza',
    intents: [
      'wiedza o AI dla firm',
      'centrum wiedzy',
      'gdzie poczytac o AI',
      'poradniki newsy case studies w jednym miejscu',
      'jak zaczac z AI',
    ],
  },
  {
    id: 'poradniki-hub',
    section: 'Wiedza',
    title: 'Poradniki AI dla firm',
    summary:
      'Poradniki to konkret krok po kroku pod pytania, ktore zadaje kazdy wlasciciel: ile kosztuje chatbot i agent AI, ktore procesy zautomatyzowac, jak policzyc zwrot. Kazdy poradnik jest answer-first i evergreen, pisany po polsku, bez zargonu. To dzial dla firm, ktore chca zrozumiec temat, zanim cokolwiek zamowia.',
    url: '/poradniki',
    intents: [
      'poradniki dla firm',
      'poradniki AI',
      'jak wdrozyc AI',
      'ktore procesy automatyzowac',
      'krok po kroku AI',
    ],
  },
  {
    id: 'poradnik-koszt-chatbota',
    section: 'Wiedza',
    title: 'Ile kosztuje chatbot dla firmy w 2026',
    summary:
      'Chatbot dla firmy kosztuje tyle, ile pracy realnie zdejmuje. Prosty bot FAQ jest najtanszy, a chatbot, ktory kwalifikuje leady i wpina sie w CRM, kosztuje wiecej, bo robi prace czlowieka. W poradniku masz widelki rynkowe, piec rzeczy, ktore winduja cene, i sposob, zeby policzyc zwrot, zanim zamowisz.',
    url: '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
    intents: [
      'ile kosztuje chatbot',
      'cena chatbota 2026',
      'chatbot dla firmy koszt',
      'ile za bota na strone',
    ],
  },
  {
    id: 'poradnik-koszt-agenta',
    section: 'Wiedza',
    title: 'Ile kosztuje wdrozenie AI agenta dla firmy',
    summary:
      'AI agent kosztuje wiecej niz chatbot, bo nie tylko odpowiada, tylko laczy sie z kalendarzem, CRM i systemami i sam wykonuje zadania. Cene liczymy od wartosci, czyli ile godzin i leadow odzyskasz. W poradniku masz, od czego zalezy koszt agenta, jak policzyc zwrot i po czym poznac, ze wdrozenie sie spina.',
    url: '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
    intents: [
      'ile kosztuje AI agent',
      'koszt agenta AI',
      'cena agenta AI dla firmy',
      'czy agent AI sie zwroci',
    ],
  },
  {
    id: 'poradnik-ai-biuro-rachunkowe',
    section: 'Wiedza',
    title: 'AI w biurze rachunkowym: ktore procesy zautomatyzowac',
    summary:
      'W biurze rachunkowym najszybciej zwracaja sie trzy automatyzacje: odczyt i wpinanie faktur, segregacja maili od klientow i przypomnienia o brakujacych dokumentach. To zadania nudne, powtarzalne i pelne recznego przepisywania, czyli dokladnie to, co AI robi dobrze. W poradniku masz liste 12 procesow uszeregowanych od najlatwiejszego zwrotu.',
    url: '/poradniki/ai-w-biurze-rachunkowym-jakie-procesy-zautomatyzowac',
    intents: [
      'AI w biurze rachunkowym',
      'automatyzacja biura rachunkowego',
      'AI dla ksiegowych',
      'co automatyzowac w ksiegowosci',
    ],
  },
  {
    id: 'ai-radar-hub',
    section: 'Wiedza',
    title: 'AI Radar: newsy AI dla firm',
    summary:
      'AI Radar to newsy ze swiata AI przefiltrowane przez jedno pytanie: co to znaczy dla Twojej firmy. Kazdy wpis mowi, co sie stalo, czemu jest wazne, jaki jest nasz filtr i co z tym zrobic. Bez hype, bez zargonu, w formacie AI o 19:00. Dzial startuje z dwoma wpisami pokazujacymi format, realne newsy dochodza na biezaco.',
    url: '/ai-radar',
    intents: [
      'newsy AI',
      'newsy AI dla firm',
      'co nowego w AI',
      'AI Radar',
      'nowosci AI bez hype',
    ],
  },
  {
    id: 'blog-hub',
    section: 'Wiedza',
    title: 'Przemyslenia o AI w biznesie (blog)',
    summary:
      'Przemyslenia to opinie i eseje o AI w malych firmach, pisane prostym jezykiem. Tlumaczymy roznice miedzy chatbotem a agentem, koszty, przepisy, bezpieczenstwo danych oraz temat ludzi i pracy. To dzial do czytania, gdy chcesz zrozumiec, jak myslec o AI, a nie tylko, ile co kosztuje.',
    url: '/blog',
    intents: [
      'przemyslenia o AI',
      'blog o AI',
      'eseje o AI w biznesie',
      'opinie o AI dla firm',
      'co czytac o AI',
    ],
  },
  {
    id: 'blog-chatbot-czy-agent',
    section: 'Wiedza',
    title: 'Chatbot czy AI Agent: czym sie roznia',
    summary:
      'Chatbot odpowiada na pytania, AI Agent wykonuje cale zadania. Chatbot poda godziny otwarcia i cennik, a agent sprawdzi kalendarz, zaproponuje termin, zapisze wizyte i wysle potwierdzenie. Dla wiekszosci firm dobrym startem jest chatbot, ktory pozniej rozwijasz w agenta, gdy chcesz, zeby AI nie tylko gadalo, ale i dzialalo.',
    url: '/blog/chatbot-czy-ai-agent-roznice',
    intents: [
      'chatbot czy agent AI',
      'roznica chatbot agent',
      'co wybrac dla firmy',
      'czym jest AI agent',
    ],
  },
  {
    id: 'blog-koszt-wdrozenia-ai',
    section: 'Wiedza',
    title: 'Ile kosztuje wdrozenie AI w malej firmie w 2026',
    summary:
      'Koszt wdrozenia AI w malej firmie zalezy glownie od zakresu: prosty chatbot na strone jest znacznie tanszy niz agent, ktory laczy sie z kalendarzem i CRM i sam wykonuje zadania. Cene liczymy od wartosci, czyli ile godzin i leadow realnie odzyskujesz. Konkretne widelki podajemy na bezplatnej diagnozie, zanim cokolwiek zamowisz.',
    url: '/blog/ile-kosztuje-wdrozenie-ai-w-malej-firmie-2026',
    intents: [
      'ile kosztuje wdrozenie AI',
      'koszt AI w malej firmie',
      'cena wdrozenia AI 2026',
      'ile za AI w firmie',
    ],
  },
  {
    id: 'materialy-hub',
    section: 'Wiedza',
    title: 'Materialy do pobrania: prompty, checklisty, arkusze',
    summary:
      'Materialy to gotowe pliki AI dla firm do pobrania za darmo i bez zapisu: prompty, checklisty i arkusze. Pobierzesz miedzy innymi 50 promptow dla wlasciciela firmy, prompty branzowe dla kancelarii, e-commerce i budowlanki, checkliste 20 procesow do automatyzacji oraz arkusz do policzenia kosztu recznych zadan. Kopiujesz, podmieniasz dane i uzywasz od razu.',
    url: '/materialy',
    intents: [
      'materialy do pobrania',
      'darmowe prompty AI',
      'checklisty AI',
      'lead magnety',
      'PDF o AI dla firm',
      'gotowe prompty',
    ],
  },

  // =========================================================================
  // REALIZACJE / FIRMA / NAWIGACJA (zrodlo: lib/realizacje/*, lib/o-nas, lib/site.ts)
  // Slugi case studies zweryfikowane 1:1 z lib/realizacje/*.ts.
  // =========================================================================
  {
    id: 'realizacje-przeglad',
    section: 'Firma',
    title: 'Realizacje SimpleFast.ai (case studies)',
    summary:
      'Mamy zestaw realnych wdrozen z konkretnymi efektami: automatyzacje, chatboty i aplikacje dla polskich firm. Kazdy case opisuje, co bolalo klienta, co zbudowalismy i co to dalo. Przejrzysz wszystkie na jednej liscie.',
    url: '/realizacje',
    intents: [
      'realizacje',
      'case study',
      'case studies',
      'portfolio',
      'wdrozenia',
      'przyklady wdrozen AI',
      'co zrobiliscie',
      'wasze projekty',
      'referencje',
      'dowody',
    ],
  },
  {
    id: 'case-auto-email-bok',
    section: 'Firma',
    title: 'Auto-email dla biura obslugi klienta',
    summary:
      'Dla Instytutu Kryptografii postawilismy system, ktory sam pisze odpowiedzi biura obslugi klienta na podstawie historii korespondencji. Efekt: 75% maili wymaga juz tylko drobnej korekty przed wyslaniem, draft jest gotowy do jednego klikniecia. Ostatnie slowo zawsze ma czlowiek.',
    url: '/realizacje/auto-email-bok',
    intents: [
      'automatyzacja obslugi klienta',
      'AI do maili',
      'auto-email BOK',
      'generowanie odpowiedzi mailowych',
      'automatyzacja biura obslugi',
    ],
  },
  {
    id: 'case-lead-generator',
    section: 'Firma',
    title: 'Blyskawiczny generator leadow',
    summary:
      'Zbudowalismy automat, ktory sam zbiera baze potencjalnych klientow wedlug zadanych kryteriow. Pozyskal 1000 rekordow w 40 minut, robote, ktora recznie zajmowala dwa tygodnie. Sprzedaz dostaje gotowa liste do kontaktu zamiast tygodni klikania.',
    url: '/realizacje/lead-generator',
    intents: [
      'generator leadow',
      'pozyskiwanie leadow AI',
      'automatyzacja lead generation',
      'baza klientow automat',
      '1000 rekordow w 40 minut',
      'leady B2B',
    ],
  },
  {
    id: 'case-auto-podsumowania-spotkan',
    section: 'Firma',
    title: 'Auto-podsumowania spotkan na Meet, Zoom i Teams',
    summary:
      'Zbudowalismy agenta, ktory sam dolacza do spotkania na Meet, Zoom albo Teams, spisuje rozmowe i wysyla raport z lista zadan przypisanych do konkretnych osob. Nikt nie robi notatek w trakcie, a po spotkaniu kazdy wie, co ma zrobic. Szacujemy kilka godzin tygodniowo mniej na reczne notatki (szac.).',
    url: '/realizacje/auto-podsumowania-spotkan',
    intents: [
      'podsumowania spotkan AI',
      'notatki ze spotkan',
      'agent AI na Meet Zoom Teams',
      'transkrypcja spotkan',
      'zadania po spotkaniu',
      'raport ze spotkania',
    ],
  },
  {
    id: 'case-automat-tresci-social',
    section: 'Firma',
    title: 'Automat tresci na social media',
    summary:
      'Zbudowalismy automat, ktory sam zbiera newsy z branzy, dobiera grafike i przygotowuje gotowy post. Czlowiek rzuca okiem i publikuje jednym kliknieciem, nic nie wychodzi bez akceptacji. Szacujemy kilka godzin tygodniowo mniej na przygotowanie tresci (szac.).',
    url: '/realizacje/automat-tresci-social',
    intents: [
      'automatyzacja social media',
      'automat do postow',
      'generowanie postow AI',
      'tworzenie grafik i postow',
      'content na social media AI',
    ],
  },
  {
    id: 'case-automatyczne-raporty',
    section: 'Firma',
    title: 'Automatyczne raporty zamiast recznych arkuszy',
    summary:
      'Zbudowalismy automat, ktory sam spina dane z kilku zrodel, zestawia je i co rano dostarcza gotowy raport. Koniec kopiowania liczb miedzy arkuszami i sklejania zestawien recznie. Szacujemy kilka godzin tygodniowo mniej na raportowanie (szac.).',
    url: '/realizacje/automatyczne-raporty',
    intents: [
      'automatyzacja raportow',
      'automatyczne raporty z danych',
      'automat zamiast Excela',
      'spinanie danych z wielu zrodel',
      'raportowanie AI',
    ],
  },
  {
    id: 'case-chatbot-edukacyjny-kursy',
    section: 'Firma',
    title: 'Chatbot edukacyjny do kursow online',
    summary:
      'Dla Instytutu Kryptografii zbudowalismy chatbota, ktory prowadzi kursanta prosto do wlasciwej lekcji. Zamiast przewijac setki materialow VOD, kursant pyta normalnym jezykiem i od razu dostaje wskazanie konkretnego nagrania. Bot zna strukture kursu, wiec nie zmysla tresci spoza materialu.',
    url: '/realizacje/chatbot-edukacyjny-kursy',
    intents: [
      'chatbot do kursow',
      'chatbot edukacyjny',
      'asystent AI e-learning',
      'nawigacja po VOD',
      'chatbot na platforme kursowa',
    ],
  },
  {
    id: 'case-agenci-ai-24-7',
    section: 'Firma',
    title: 'Firmowi Agenci AI 24/7 na stronie',
    summary:
      'Osadzilismy na firmowej stronie Agentow AI, ktorzy znaja strukture firmy i odpowiadaja nowym leadom cala dobe, bez nadzoru. Klient pisze o polnocy i dostaje odpowiedz od razu, a nie ogolnik. Zaden lead nie zostaje bez odpowiedzi.',
    url: '/realizacje/agenci-ai-24-7',
    intents: [
      'agent AI na stronie',
      'chatbot 24/7',
      'obsluga leadow na stronie',
      'firmowy chatbot bez nadzoru',
      'AI cala dobe',
      'agent na witrynie',
    ],
  },
  {
    id: 'case-transkrypcja-rozmow',
    section: 'Firma',
    title: 'Przechwytywanie i analiza rozmow',
    summary:
      'Zbudowalismy aplikacje, ktora sama spisuje rozmowy i porzadkuje je tematycznie, wylapujac kluczowe ustalenia biznesowe w lot. Zamiast odsluchiwac nagrania i przepisywac je recznie, zespol dostaje gotowy, pokategoryzowany zapis. Ustalenia sa czarno na bialym.',
    url: '/realizacje/transkrypcja-rozmow',
    intents: [
      'transkrypcja rozmow',
      'analiza rozmow AI',
      'aplikacja do spisywania rozmow',
      'ustalenia z rozmow',
      'AI do rozmow biznesowych',
    ],
  },
  {
    id: 'o-nas-kto-stoi-za-simplefast',
    section: 'Firma',
    title: 'Kto stoi za SimpleFast.ai',
    summary:
      'Za SimpleFast.ai stoi dwoch founderow: Pawel Pieloch, Architekt AI i twarz firmy, oraz Marcin Karpeta, ktory prowadzi firme razem z nim. Budujemy AI Agentow dla polskich firm, a nie chatboty, ktore tylko odpowiadaja. Cala historie i nasze podejscie poznasz na stronie O nas.',
    url: '/o-nas',
    intents: [
      'kto stoi za SimpleFast.ai',
      'o nas',
      'o firmie',
      'kim jestescie',
      'zalozyciele',
      'founderzy',
      'historia firmy',
      'jak pracujecie',
      'wasze wartosci',
    ],
  },
  {
    id: 'osoba-pawel-pieloch',
    section: 'Firma',
    title: 'Kim jest Pawel Pieloch',
    summary:
      'Pawel Pieloch to Architekt AI full-stack, zalozyciel i twarz SimpleFast.ai. Prowadzi cala budowe: projektuje i stawia AI Agentow end to end, czyli strony, automatyzacje, chatboty, voiceboty oraz aplikacje i wtyczki. To z nim rozmawiasz na diagnozie.',
    url: '/o-nas',
    intents: [
      'kim jest Pawel Pieloch',
      'Pawel Pieloch',
      'architekt AI',
      'twarz firmy',
      'kto buduje rozwiazania',
      'z kim rozmawiam na diagnozie',
      'founder Pawel',
    ],
  },
  {
    id: 'osoba-marcin-karpeta',
    section: 'Firma',
    title: 'Kim jest Marcin Karpeta',
    summary:
      'Marcin Karpeta to wspolzalozyciel SimpleFast.ai, ktory prowadzi firme razem z Pawlem. Dba o to, zeby wszystko sie spinalo: relacje z klientem, dowiezienie projektu i opieke po wdrozeniu. Tam, gdzie Pawel projektuje i buduje, Marcin pilnuje, zeby kazdy klient byl zaopiekowany.',
    url: '/o-nas',
    intents: [
      'kim jest Marcin Karpeta',
      'Marcin Karpeta',
      'wspolzalozyciel',
      'kto prowadzi firme',
      'opieka nad klientem',
      'founder Marcin',
    ],
  },
  {
    id: 'nav-kontakt-diagnoza',
    section: 'Firma',
    title: 'Kontakt i bezplatna diagnoza',
    summary:
      'Najlepiej poznac sie w dzialaniu. Umow bezplatna diagnoze: pokazesz, gdzie tracisz czas, a my powiemy wprost, co da sie z tym zrobic. Bez zobowiazan, rozmawiasz bezposrednio z founderem, nie z dzialem handlowym.',
    url: '/kontakt',
    intents: [
      'kontakt',
      'umow rozmowe',
      'bezplatna diagnoza',
      'audyt',
      'jak sie skontaktowac',
      'napisz do nas',
      'konsultacja',
      'wycena',
      'umow spotkanie',
    ],
  },
  {
    id: 'nav-polityka-prywatnosci',
    section: 'Firma',
    title: 'Polityka prywatnosci',
    summary:
      'Zasady przetwarzania danych osobowych i RODO opisalismy w polityce prywatnosci. Znajdziesz tam, jakie dane zbieramy i w jakim celu. Wszystko jest na dedykowanej stronie.',
    url: '/polityka-prywatnosci',
    intents: [
      'polityka prywatnosci',
      'RODO',
      'dane osobowe',
      'przetwarzanie danych',
      'prywatnosc',
      'cookies',
    ],
  },
];

/**
 * KB_LAST_UPDATED zmieniaj recznie przy aktualizacji wpisow. Sluzy do cache-bustingu
 * promptu (gdy wstrzykujesz KB do system promptu z prompt cachingiem).
 */
export const KB_LAST_UPDATED = '2026-06-20';

/**
 * Renderuje cala baze wiedzy do zwiezlego tekstu pod system prompt.
 * Format: pogrupowane sekcje, kazdy wpis = tytul + summary + URL + intencje.
 * Trzymamy to deterministyczne (stabilna kolejnosc = stabilny prefix = cache-friendly).
 */
export function renderKnowledgeForPrompt(): string {
  const bySection = new Map<string, KnowledgeEntry[]>();
  for (const entry of KNOWLEDGE) {
    const list = bySection.get(entry.section) ?? [];
    list.push(entry);
    bySection.set(entry.section, list);
  }

  const blocks: string[] = [];
  for (const [section, entries] of bySection) {
    const lines = entries.map((e) => {
      const intents = e.intents.join(', ');
      return [
        `### ${e.title}`,
        e.summary,
        `LINK: ${e.url}`,
        `Pokrywa pytania: ${intents}`,
      ].join('\n');
    });
    blocks.push(`## ${section}\n\n${lines.join('\n\n')}`);
  }

  return blocks.join('\n\n');
}

/**
 * Plaska lista wszystkich realnych URL-i z bazy. Sluzy do ewentualnej walidacji w
 * route handlerze (pewnosc, ze link pochodzi z mapy). Deduplikowana.
 */
export const KNOWLEDGE_URLS: string[] = Array.from(
  new Set(KNOWLEDGE.map((e) => e.url))
);