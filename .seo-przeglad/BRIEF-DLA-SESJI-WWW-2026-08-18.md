# Brief SEO dla sesji SFAI WWW — 2026-08-18

**Kto to pisze:** sesja SEO. Analizuję dane i mówię, co zmienić i dlaczego.
**Kto wdraża:** ta sesja (SFAI WWW). Kod, struktura, wygląd i decyzje wizualne
są po Twojej stronie. Ja nie piszę komponentów ani treści do plików.

**Repo:** `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW`
**Stan na:** HEAD `ff890a1` (kronika v19)

---

## 1. BŁĄD DO NAPRAWY: podstrony voicebotów nie mają koloru kategorii

**Zgłoszenie Pawła:** na `/uslugi/voiceboty/odbieranie-telefonow` nagłówek
„Bot telefoniczny, który odbiera telefon, gdy Ty nie możesz" jest **biały**,
a powinien mieć kolor jak reszta rodziny voicebotów.

**Diagnoza (zweryfikowana w kodzie).** `lib/inf-kategorie.ts:161` (`INF_KATEGORIA`)
zawiera wpisy dla dwóch podstron:

```
windykacja:            c: '#e438ff'  (fiolet voicebotów)
'potwierdzanie-wizyt': c: '#e438ff'
```

ale **nie ma wpisu dla `odbieranie-telefonow`**, więc podstrona spada na
`INF_KATEGORIA_DEFAULT`, czyli `var(--accent)`.

Co ciekawe, komentarz przy tych wpisach opisuje dokładnie ten sam błąd naprawiany
w v18 („podstrony renderowały się domyślnym cyjanem, czyli kolorem rodziny
chatbotów, mylący sygnał wizualny"). Trzecia podstrona powtórzyła problem, bo wpis
w mapie kolorów nie jest wymuszony typem, tylko trzeba o nim pamiętać.

**Do zrobienia:**
1. Dodać wpis dla `odbieranie-telefonow` z fioletem voicebotów (`#e438ff` / `#dc7aff`).
2. Rozważyć, czy nie da się tego wymusić strukturalnie, żeby czwarta podstrona
   nie powtórzyła błędu po raz trzeci. Podstrona zna swojego `rodzic`
   (`lib/uslugi/podstrony/types.ts`), więc kolor mógłby dziedziczyć się z rodzica
   automatycznie, zamiast być przepisywany ręcznie do mapy. **Sposób wybierasz Ty**,
   ja tylko zgłaszam, że ręczne przepisywanie już dwa razy zawiodło.

---

## 2. JAKOŚĆ: uwagi Pawła do trzech podstron voicebotów

Paweł obejrzał `/uslugi/voiceboty/odbieranie-telefonow` i zgłosił:

> „kolory są zachowane, ale struktura już słabsza, ramki są słabsze,
> tekstów jest naprawdę dużo"

To są uwagi do **wyglądu i objętości**, czyli Twój zakres. Nie projektuję za Ciebie,
podaję tylko, co widzę po stronie treści i czego SEO **nie wymaga**:

**Teksty można ciąć.** Cytowalność w AI nie potrzebuje długich akapitów. Potrzebuje
odpowiedzi w pierwszym akapicie, konkretnych liczb i fragmentów 130-170 słów.
Sekcje `problem` i `rozwiazanie` na tych podstronach mają po 90-130 słów każda
i spokojnie zniosą skrócenie o jedną trzecią bez straty dla pozycji.

**Nagłówki H1 są długie:**

| Podstrona | Znaków w H1 |
|---|---|
| odbieranie-telefonow | 58 |
| windykacja | 65 |
| potwierdzanie-wizyt | 63 |

Dla SEO liczy się, żeby H1 zawierał frazę główną. „Bot telefoniczny" to 16 znaków,
reszta to dodatek stylistyczny. **Możesz je skracać do formy, która lepiej wygląda
w układzie**, pod warunkiem że fraza zostaje na początku. Konkretnie:

- `odbieranie-telefonow`: fraza obowiązkowa to **„bot telefoniczny"**
- `windykacja`: **„voicebot do windykacji"**
- `potwierdzanie-wizyt`: **„voicebot do potwierdzania wizyt"**

Wszystko poza tym jest do Twojej dyspozycji.

**Ramki i struktura:** bez uwag ode mnie, to Twoja decyzja. Zaznaczam tylko, że
te podstrony używają tych samych komponentów co 10 stron usług, więc jeśli wyglądają
słabiej niż `/uslugi/voiceboty`, przyczyną jest raczej ilość treści wsypanej
w te same sloty niż same komponenty.

---

## 3. ZOSTAŁO Z LISTY SEO: zdarzenia konwersji

To jedyne zadanie z przeglądu, którego nikt jeszcze nie ruszył.

W całym kodzie **nie ma ani jednego wywołania `umami.track`** (sprawdzone po
`umami.track` i `trackEvent` w `app/`, `components/`, `lib/`). Umami liczy odsłony,
ale nie wie nic o konwersjach. Przy 23 kliknięciach z Google miesięcznie oznacza to,
że nie da się powiedzieć, czy którakolwiek zmiana SEO przyniosła choć jednego leada.

**Potrzebne trzy zdarzenia:**

| Zdarzenie | Gdzie |
|---|---|
| `wyslano_formularz` | `components/forms/DiagnozaForm.tsx:105`, gałąź sukcesu |
| `klik_telefon` | linki `tel:` (nagłówek, stopka, `/kontakt`) |
| `klik_email` | linki `mailto:` (nagłówek, stopka, `/kontakt`) |

Punkt zaczepienia w formularzu:
```ts
.then((res) => setStatus(res.ok ? 'success' : 'error'))
```

**Jedno ostrzeżenie techniczne:** wywołanie musi być odporne na brak Umami
(bloker reklam, tryb prywatny), więc `window.umami?.track(...)`, nigdy gołe
`umami.track(...)`. Inaczej wyjątek zabije obsługę formularza i stracisz leada
zamiast go zmierzyć. Logiki formularza ani `app/api/lead/route.ts` nie trzeba ruszać.

---

## 4. POTWIERDZONE JAKO ZROBIONE (nie ruszaj)

Sprawdziłem na produkcji i w kodzie, wszystko OK:

- daty w mapie witryny: `/uslugi/chatboty` ma `lastmod` 2026-08-17, nie czerwcowy
- `/favicon.ico` zwraca 200
- `mark-t.png`: FaviconPulse używa kopii 64x64 (4302 B zamiast 1 631 603 B)
- tytuł poradnika o agencie: „Od 2500 zł" (zgodnie z decyzją Pawła)
- kolizja kwot rozwiązana: chatbot ma 990 zł, agent 2500 zł, dwa różne progi
- opis voicebotów doprecyzowany: „2500 zł jednorazowo za wdrożenie, opieka od 99 zł/mies"
- Cloudflare nie stoi przed stroną (`server: Vercel`, brak `cf-ray`), boty AI
  docierają do `robots.txt`. Temat zamknięty, nie sprawdzaj.

---

## 5. NASTĘPNE W KOLEJCE (dopiero po akceptacji wyglądu trzech obecnych)

Dwie kolejne podstrony voicebotów mają popyt w danych, ale **nie ma sensu ich robić,
dopóki obecne trzy nie wyglądają tak, jak Paweł chce**. Najpierw wygląd, potem skala.

| Podstrona | Frazy | Wyśw./mies. | Dzisiejsza pozycja |
|---|---|---|---|
| obsługa klienta 24/7 | „voicebot do obsługi klienta", „obsługa klienta 24/7 przez voicebota" | 52 | 29,9 i 44,7 |
| cennik voicebota | „voicebot cena" | 27 | 34,2 |

Treść do nich napiszę, gdy powiesz, że format trzech obecnych jest zatwierdzony.
**Windykacji nie rozwijamy** — Paweł nie wskazał jej jako obszaru, w którym chce klientów.

---

## Jak zmierzyć, czy to zadziałało

Nie po deployu, tylko po 14 dniach w Search Console:

1. `/poradniki/ile-kosztuje-chatbot-dla-firmy-2026` ma niezerowe wyświetlenia
   (dziś zero, bo powstał 16.08, a dane obejmują 28 dni wstecz)
2. `/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy` ma CTR większy od zera
   (dziś pozycja 8,0 i zero kliknięć)
3. `/uslugi/voiceboty/odbieranie-telefonow` wchodzi do TOP10 na „bot telefoniczny"
   (start z pozycji 16,9, a grupa fraz o odbieraniu telefonów ma pozycje 8-17,
   czyli najkrótszy dystans do pierwszej strony w całym serwisie)
4. zdarzenie `wyslano_formularz` pojawia się w Umami

Punkt cofnięcia z przeglądu: tag `seo-2026-08-17d` (commit `da5764e`).

---

*Dane: Search Console 7/28/90 dni, Bing Webmaster Tools, Ahrefs (siła domen),
skan 47 podstron produkcyjnych, sprawdzenie konkurencji w wyszukiwarce.
Wszystkie liczby z pomiaru, żadna nie jest szacunkiem.*
