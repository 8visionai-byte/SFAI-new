# Pakiet poza stroną: gotowe teksty i kroki dla Pawła (14.10.2026)

Tego nie zrobię za Ciebie: zakładanie kont, logowanie, zmiany DNS i hostingu, wysyłka maili do klientów. Wszystko inne jest gotowe do wklejenia. Każda liczba poniżej stoi już na www.simplefast.ai.

Kolejność: najpierw decyzja z punktu 0, potem punkty 1-4 (ten tydzień), reszta w ciągu 30 dni. Szczegóły i uzasadnienia: `raporty/2026-10-13.md`, sekcja 7.

---

## 0. Decyzja przed pierwszym wpisem (5 minut)

Wpisy w katalogach muszą mieć te same dane co strona. Dziś strona podaje: siedziba Pisz (woj. warmińsko-mazurskie), biura Gubin i Strzegom, telefon +48 696 674 874, mail kontakt@simplefast.ai.

Do ustalenia przez Ciebie:
1. **Adres bazowy do profilu Google:** miejsce, gdzie ktoś realnie pracuje (Pisz, Gubin albo Strzegom). Wirtualne biuro odpada.
2. **Pełna nazwa prawna:** aleo podaje „Simple Fast AI prosta spółka akcyjna". Jeśli to prawda, dopiszę ją do strony (schema, polityka prywatności), bo dziś jest tam tylko „SimpleFast.ai".

Wszędzie poniżej, gdzie jest `[ADRES BAZOWY]`, wpisz to, co wybierzesz.

---

## 1. Domeny, które dziś szkodzą (Hostinger, ok. 10 minut)

| Domena | Stan 13.10 | Co zrobić |
|---|---|---|
| sfai.cloud i www.sfai.cloud | żywa stara strona marki z innym tytułem; LinkedIn firmy linkuje tutaj | przekierowanie 301 wszystkich adresów na https://www.simplefast.ai/ |
| simplefastai.pl i www.simplefastai.pl | pusta strona „Hostinger Horizons", w Bing 1. na naszą nazwę | przekierowanie 301 na https://www.simplefast.ai/ |

Kroki (na komputerze, przeglądarka):
1. Zaloguj się na hpanel.hostinger.com.
2. Wejdź w Strony WWW, wybierz sfai.cloud, potem Przekierowania (Redirects).
3. Typ: 301 (stałe). Z: cała domena. Na: https://www.simplefast.ai/ (z www na początku).
4. Powtórz dla simplefastai.pl.
5. Sprawdź: wpisz sfai.cloud w przeglądarce. Ma od razu otworzyć www.simplefast.ai.

Rekordów MX (poczta) nie ruszaj.

---

## 2. Google Search Console: prośby o indeksację (ok. 10 minut, po wdrożeniu fali 1)

Na komputerze: search.google.com/search-console, właściwość simplefast.ai, pole „Sprawdź dowolny URL" u góry. Wklej adres, poczekaj na wynik, kliknij „Poproś o zindeksowanie". Pojedynczo, tylko te adresy:

1. https://www.simplefast.ai/uslugi/agenci-ai (nowa)
2. https://www.simplefast.ai/uslugi/wdrozenie-ai (nowa)
3. https://www.simplefast.ai/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy (Google czytał ją ostatnio 7 lipca)
4. https://www.simplefast.ai/uslugi/automatyzacje
5. https://www.simplefast.ai/uslugi/audyt-ai

Więcej nie zgłaszaj. Masowe prośby dają około 2 tygodni widoczności i psują pomiar.

---

## 3. Bing Webmaster Tools: wersja z www (5 minut)

1. bing.com/webmasters, zaloguj się.
2. „Dodaj witrynę", potem „Importuj z Google Search Console". Dodasz wersję https://www.simplefast.ai/.
3. Mapa witryny: https://www.simplefast.ai/sitemap.xml.

---

## 4. Opis firmy do wklejenia

### Krótki (do ok. 300 znaków, PL)
SimpleFast.ai wdraża AI w małych i średnich firmach: chatboty na stronę i komunikatory, voiceboty, które odbierają telefony 24/7, automatyzacje procesów na Make i n8n oraz agentów AI. Jawny cennik netto, dane w UE, silnik AI do wyboru: OpenAI, Anthropic albo Google.

### Długi (do ok. 1000 znaków, PL)
SimpleFast.ai to agencja wdrożeń AI dla małych i średnich firm. Budujemy chatboty AI na stronę WWW i komunikatory (od 1790 zł netto), voiceboty, które odbierają połączenia przychodzące po polsku przez całą dobę (2500 zł netto wersja prosta, 5000-9000 zł netto z integracjami), automatyzacje procesów na Make.com i n8n oraz agentów AI do maili, dokumentów i obsługi klienta. Pracę zaczynamy od bezpłatnej diagnozy albo od audytu AI (Sprint Diagnostyczny: 1490 zł netto, 5 dni roboczych, raport PDF z mapą procesów, kwota odliczana od wdrożenia). Silnik AI wybiera klient: OpenAI, Anthropic albo Google. Po wdrożeniu możemy przekazać całą infrastrukturę klientowi, wtedy abonament wynosi 0 zł. Przykład z realizacji: w Instytucie Kryptografii AI pisze około 85% draftów odpowiedzi na maile. Działamy na rynku polskim i niemieckim.

### Short (EN, for Clutch, TechBehemoths, Make, Sortlist)
SimpleFast.ai is an AI implementation agency for small and mid-sized businesses in Poland and Germany. We build AI chatbots for websites and messengers, voicebots that answer inbound calls 24/7 in Polish, process automations on Make.com and n8n, and AI agents for email, documents and customer service. Transparent net pricing, data kept in the EU, and the client chooses the AI engine (OpenAI, Anthropic or Google). Every project starts with a free diagnosis or a 5-day AI audit.

### Lista usług z cenami (do pól „Usługi")
- Chatbot AI na stronę i komunikatory: od 1790 zł netto
- Voicebot (bot telefoniczny): 2500 zł netto albo 5000-9000 zł netto z integracjami; utrzymanie 299-1500 zł/mies. albo 0 zł po przekazaniu infrastruktury
- Automatyzacja procesów AI (Make, n8n): pierwszy proces na próbę 1990 zł netto, pełne wdrożenie 3000-10000 zł netto
- Audyt AI (Sprint Diagnostyczny): 1490 zł netto, 5 dni roboczych
- Agenci AI dla firm: zobacz https://www.simplefast.ai/uslugi/agenci-ai
- Strony WWW pod Google i AI: cennik na https://www.simplefast.ai/uslugi/strony-www

---

## 5. Katalogi i profile: gdzie, co wkleić

| Gdzie | Adres | Co wkleić | Uwaga |
|---|---|---|---|
| AIPORT (darmowy wpis) | https://aiport.pl/dodaj-firme/ | kategoria Agencje AI; długi opis PL; lista usług | Przegląd od AI w Google cytuje AIPORT przy „kto wdroży chatbota". PREMIUM nie kupuj |
| Profil Firmy w Google | https://business.google.com | nazwa dokładnie „SimpleFast.ai"; firma działająca na obszarze, adres ukryty `[ADRES BAZOWY]`; kategoria z listy (konkurenci: „Producent oprogramowania" albo „Usługi konsultingowe"); usługi z listy wyżej; krótki opis PL | bez dopisków do nazwy, bez nagród za opinie |
| Clutch (plan Basic) | https://clutch.co/get-listed | opis EN; usługi: AI Development, Chatbots, Automation; 3-5 realizacji z /realizacje | Verified (499 USD/rok) i sponsoringu nie kupuj |
| TechBehemoths | https://techbehemoths.com/companies/get-listed | opis EN; Chatbots, Artificial Intelligence, Web Development | darmowy link dofollow |
| Make Partner Program | https://www.make.com/en/solution-partners | opis EN; realizacje KNF Team, NUMOCO, Instytut Kryptografii (bez danych klientów) | link dofollow, profil po 2-6 tygodniach |
| emedia ranking (edycja grudniowa) | https://emedia.pl/ranking-agencji-ai | adres strony i mail | zgodę marketingową odznacz, jeśli nie jest wymagana |
| Useme (profil wykonawcy) | https://useme.com/pl/ | krótki opis PL, 3 realizacje | 1 link dofollow na profilu |

---

## 6. LinkedIn i YouTube (15 minut)

**LinkedIn, strona firmy Simple Fast AI** (linkedin.com, jako administrator, Edytuj stronę):
1. Witryna: zmień z https://sfai.cloud/ na https://www.simplefast.ai
2. Opis: wklej długi opis PL z punktu 4.
3. Lokalizacja: ta sama co na stronie.

**YouTube @SimpleFastAI** (studio.youtube.com, Dostosowywanie, Informacje podstawowe):
1. Opis kanału: krótki opis PL z punktu 4.
2. Link: https://www.simplefast.ai

---

## 7. Prośby do klientów o podpis w stopce (wyślij sam, za zgodą klientów)

Tekst linku zawsze sama marka, nigdy fraza typu „chatbot dla firm".

### Do Lenart Motors (PL)
> Dzień dobry, mam jedną prośbę. Czy możemy dopisać w stopce strony lenartmotors.com mały podpis „Strona: SimpleFast.ai" z linkiem do naszego opisu tej realizacji? To zwykła praktyka wykonawców i nic nie zmienia w wyglądzie strony. Zrobimy to sami przy najbliższej aktualizacji. Pozdrawiam, Paweł Pieloch

Link w podpisie: https://www.simplefast.ai/realizacje/strona-cytowana-przez-chatgpt

### Do Fichtelgebirgs-Haus (DE)
> Guten Tag, eine kurze Bitte: Dürfen wir im Footer von fichtelgebirgs-haus.de einen kleinen Hinweis „Website: SimpleFast.ai" mit einem Link zu unserer Fallstudie ergänzen? Das ist unter Agenturen üblich und ändert nichts am Design. Wir übernehmen die Änderung selbst. Viele Grüße, Paweł Pieloch

Link w podpisie: https://www.simplefast.ai/realizacje/top10-google-i-widocznosc-w-gpt

### Do Przystani Jurgen i KNF Team
Ten sam tekst co do Lenart Motors. W KNF Team stopka już podpisuje dwóch dostawców, więc pasuje „Automatyzacje AI: SimpleFast.ai".

---

## 8. Poprawka w artykule NoCodeWork (opcjonalnie)

Artykuł „Firmy wdrażające chatboty i voiceboty AI w Polsce 2026" (nocodework.io) opisuje nas jako firmę z Pisza i podaje stare ceny opieki. Perplexity bierze go jako główne źródło. Po decyzji z punktu 0 napisz do autora (Mikołaj Brunka, strona /o-nas na nocodework.io):

> Dzień dobry, dziękuję za ujęcie SimpleFast.ai w zestawieniu firm wdrażających chatboty i voiceboty. Mam dwie aktualizacje: [ADRES BAZOWY] oraz aktualne ceny ze strony https://www.simplefast.ai/uslugi/chatboty/cennik i https://www.simplefast.ai/uslugi/voiceboty/cennik. Jeśli zasady redakcji na to pozwalają, będę wdzięczny za link do cennika. Pozdrawiam, Paweł Pieloch
