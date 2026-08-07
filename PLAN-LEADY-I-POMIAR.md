# Leady i pomiar na simplefast.ai — stan faktyczny i plan

Data: 2026-08-07
Ustalenia z rozmowy z Pawłem: magazyn = **Make.com + Arkusz Google**, kwalifikacja = **model ocenia rozmowę**, powiadomienia = **gorący lead od razu mailem, zwykłe rozmowy przemiał co 5-8 h**.

---

## 1. PILNE: formularz „umów bezpłatną diagnozę" nie działa na produkcji

**To nie jest hipoteza. Sprawdzone na żywej stronie.**

Co ustaliłem, krok po kroku:

| Co sprawdziłem | Wynik |
|---|---|
| Hosting `simplefast.ai` | **Vercel** (nagłówek `server: Vercel`, `x-vercel-id`) |
| Formularz w kodzie (`components/forms/DiagnozaForm.tsx`, linia 104) | Wysyła `POST` na `/` w formacie **Netlify Forms** (`form-name=diagnoza`, `data-netlify="true"`) |
| Co Vercel odpowiada na `POST /` | **405 Method Not Allowed** (sprawdzone pustą sondą, bez żadnych danych) |
| Czy istnieje endpoint przyjmujący zgłoszenie | **Nie.** `/api/lead` i `/api/kontakt` zwracają 404 |

**Netlify Forms działa wyłącznie na Netlify.** Strona stoi na Vercelu, więc atrybut `data-netlify` nie robi nic. Formularz wysyła zgłoszenie w próżnię, dostaje 405, a kod ustawia stan błędu (`res.ok` = false).

**Skutek: każdy, kto chce umówić bezpłatną diagnozę, dostaje komunikat o błędzie. Zero tych leadów do Ciebie dotarło.**

Dobra wiadomość w tym jest jedna: użytkownik przynajmniej widzi błąd, a nie fałszywe „Mam to, odezwę się w kilka minut". Gdyby Vercel zwracał 200, ludzie odchodziliby przekonani, że się zgłosili.

**Wniosek dla priorytetów: to jest ważniejsze od całego SEO.** Nie ma sensu ściągać ruchu na stronę, w której główny punkt konwersji jest zepsuty.

### Sprawdzić przy okazji
`EU-Haus.de` też ma w kodzie `data-netlify`. Jeśli tamta strona stoi na Vercelu albo Lovable, ma dokładnie ten sam problem. Do weryfikacji osobno.

---

## 2. Co działa

- **Voicebot i czat są żywe.** Endpointy `/api/realtime-session` i `/api/chat` odpowiadają na produkcji (405 na HEAD = istnieją, przyjmują tylko POST).
- Agent ma dziś jedno narzędzie: `navigate_to` (przenoszenie po stronie).
- **Nic z rozmów nie jest zapisywane.** Żadnej bazy, transkrypcji ani maila.

### Dlaczego rozmów nie da się „podejrzeć" po fakcie
OpenAI Realtime działa tak, że Twój serwer wystawia jednorazowy token, a potem dźwięk i transkrypcja lecą **bezpośrednio między przeglądarką a OpenAI**. Serwer jest poza tą linią. Dane trzeba świadomie wypchnąć, inaczej znikają razem z zamknięciem karty.

---

## 3. Plan: trzy tory, jeden magazyn

Wszystko ląduje w jednym Arkuszu Google przez jeden webhook Make. Prosto, jedno miejsce do przeglądania.

```
                        ┌──────────────────────────┐
formularz ────────────► │                          │ ─► Arkusz: LEADY ─► mail NATYCHMIAST
voicebot (narzędzie) ─► │  /api/lead  →  webhook   │
czat (narzędzie) ─────► │       Make.com           │
                        └──────────────────────────┘
                        ┌──────────────────────────┐
transkrypcje ─────────► │ /api/rozmowa → webhook   │ ─► Arkusz: ROZMOWY
                        └──────────────────────────┘
                                    │
                        co 5-8 h: model czyta nowe rozmowy,
                        wyławia wartościowe → dopisuje do LEADY + mail zbiorczy
```

### Tor A — formularz (naprawa, najpilniejsze)

1. Nowy endpoint `/api/lead` w repo `SFAI-new` (Next.js).
2. Formularz przestaje udawać Netlify: `POST` na `/api/lead` zamiast na `/`.
3. Endpoint sprawdza pułapkę na boty (pole `firma_www` musi być puste), odrzuca zbyt częste wysyłki z jednego adresu i przekazuje dane do webhooka Make.
4. Make dopisuje wiersz do arkusza LEADY i **od razu wysyła maila** — formularz to zawsze gorący lead, ktoś świadomie prosi o diagnozę.

**Ważne:** adres webhooka Make trzyma się w zmiennej środowiskowej na Vercelu, nie w kodzie przeglądarki. Inaczej każdy mógłby zasypać Ci arkusz.

### Tor B — leady z voicebota i czatu

1. Agent dostaje drugie narzędzie, obok `navigate_to`. Roboczo `zapisz_leada`, z polami: imię, kontakt, firma, opisany problem, branża, pilność.
2. W instrukcji agenta: gdy rozmówca opisze problem i zostawi kontakt, wywołaj to narzędzie. Nie wypytuj jak ankieter, zbieraj naturalnie w trakcie rozmowy.
3. Narzędzie trafia do tego samego `/api/lead`, tylko ze źródłem `voicebot` albo `czat`.
4. Make dopisuje do LEADY i wysyła maila natychmiast.

To jest niezawodna droga dla leadów, bo agent robi to celowo, a nie przy okazji.

### Tor C — transkrypcje i pomiar (to, o co pytałeś: „z czego korzystają, jak pytają")

1. Nowy endpoint `/api/rozmowa`. Przeglądarka dosyła przebieg rozmowy po jej zakończeniu (i awaryjnie przy zamykaniu karty).
2. Trafia do arkusza ROZMOWY: data, czas trwania, kanał (głos/czat), pełna transkrypcja, jakie narzędzia agent użył, z której podstrony ruszyła rozmowa.
3. **Scenariusz Make co 5-8 h**: bierze nowe rozmowy, model czyta każdą i ocenia:
   - czy to realne zapytanie biznesowe, czy ktoś testuje zabawkę,
   - jaki problem opisał,
   - czy widać intencję kontaktu, mimo że kontaktu nie zostawił,
   - ocena 0-100 plus jedno zdanie uzasadnienia.
4. Rozmowy powyżej progu lądują w LEADY. Reszta zostaje w ROZMOWY jako materiał do analizy.
5. Jeden zbiorczy mail: ile rozmów, o co pytali najczęściej, które warto oddzwonić.

Punkt 4 daje Ci dokładnie to, o czym mówiłeś: raz na kilka godzin przeszukujemy i wysyłamy tylko tych, którzy naprawdę chcą kontaktu.

---

## 4. Czego potrzebuję od Ciebie

1. **Decyzja o kolejności**: naprawiamy najpierw sam formularz (najszybszy zysk, kilka godzin), czy budujemy od razu całość?
2. **Adres, na który mają iść maile** z leadami.
3. **Zgoda na dotknięcie produkcji** — repo `SFAI-new`, dodanie endpointów i podmiana wysyłki formularza.
4. Webhooki Make i zmienne środowiskowe na Vercelu **ustawiasz sam** — ja podam dokładne nazwy i miejsca, kluczy nie dotykam.

## 5. Rzeczy, o których trzeba pamiętać

- **Zgoda RODO**: formularz ma już pole `zgoda`. Przy zapisie transkrypcji rozmów z voicebota trzeba poinformować, że rozmowa jest zapisywana. To wymóg, nie ozdoba.
- **Dwa repozytoria**: produkcja to `SFAI-new` (Next.js). Wersja Astro `SFAI---webseite-10k-look-` to osobny projekt i to NIE ona jest teraz na simplefast.ai. Zmiany robimy w tym, co żyje, żeby nie poprawiać martwego kodu.
- Przy budowie scenariuszy Make użyję skilla `make-automation-architect` (idempotencja, obsługa błędów, opis moduł po module po polsku).

---

Pełna ścieżka: `C:\Users\Paweł Pieloch\CLAUDE CODE\SF AI WWW\PLAN-LEADY-I-POMIAR.md`

ZWERYFIKOWANE na żywej stronie: hosting Vercel, formularz wysyła w protokole Netlify, `POST /` zwraca 405, brak endpointów `/api/lead` i `/api/kontakt`, voicebot i czat działają.
NIEZWERYFIKOWANE: czy `EU-Haus.de` ma ten sam problem z formularzem (do sprawdzenia osobno).
