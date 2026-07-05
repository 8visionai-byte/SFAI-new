/**
 * app/api/chat/route.ts
 *
 * Endpoint agenta-czatu SimpleFast.ai. Route Handler (POST), Node runtime.
 *
 * Co robi:
 *  1. Waliduje wejscie { messages } (rola + tekst, limity dlugosci/liczby).
 *  2. Prosty rate-limit po IP (in-memory, okno przesuwne) - tania ochrona kosztu.
 *  3. Sklada system prompt = persona + reguly + cala baza wiedzy.
 *  4. Wola Anthropic Messages API przez fetch (BEZ zaleznosci npm; klucz z env,
 *     serwerowo, nigdy do klienta).
 *  5. Zwraca non-streaming JSON { reply }.
 *
 * Bezpieczenstwo:
 *  - ANTHROPIC_API_KEY tylko po stronie serwera (process.env).
 *  - Bot publiczny (bez logowania), wiec rate-limit + limity dlugosci to glowna tarcza.
 *  - System prompt zabrania wychodzenia poza tematyke firmy.
 *  - Lekko: osobna trasa /api, reszta strony zostaje statyczna (SSG/SEO/CWV bez zmian).
 *
 * Uwaga architektoniczna: persona/reguly trzymamy TU jako SYSTEM_PROMPT_BASE (zamiast
 * osobnego pliku lib/agent/systemPrompt.ts), zeby integracja byla dokladnie 3-plikowa
 * i nie zalezala od recznego wklejania backtickow w czwartym pliku.
 */

import { NextResponse } from 'next/server';
import {
  renderKnowledgeForPrompt,
  KNOWLEDGE_URLS,
} from '@/lib/agent/knowledge';

// Route handler MUSI byc dynamiczny (czyta request, woła zewnetrzne API).
// 'nodejs' runtime: pewny dostep do process.env i fetch bez limitow edge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Persona + reguly agenta (glos Pawla, zero em-dash) ---------------------

const SYSTEM_PROMPT_BASE = `Jestes Agentem SimpleFast.ai, cyfrowym nawigatorem strony i firmy. Mowisz glosem Pawla Pielocha: konkretnie, po ludzku, bez korpo-waty.

KIM JESTES
- Jestes asystentem na stronie agencji SimpleFast.ai. SimpleFast.ai wdraza AI WYLACZNIE dla firm: wdrozenia AI, automatyzacje, chatboty, voiceboty, agenci AI, indywidualne rozwiazania (aplikacje i wtyczki), strony www oraz pozycjonowanie pod AI (GEO). Pozycjonowanie marki: "Budujemy AI Agentow, nie chatboty. Agent AI dziala, nie tylko gada."
- Twoja rola to nawigator i kompletna mapa firmy: znasz wszystkie uslugi, produkty, darmowe narzedzia, wiedze (poradniki, AI Radar, blog, materialy, case studies) oraz osoby (Pawel Pieloch, Marcin Karpeta).

JAK ODPOWIADASZ (TO NAJWAZNIEJSZE)
- BARDZO KROTKO: MAKSYMALNIE 2-3 zdania, same konkrety, zero lania wody. Odpowiedz ma WYCZERPAC pytanie ekonomicznie: dajesz tylko to, czego trzeba, zeby na nie odpowiedziec, i nic wiecej. To okno czatu, nie artykul.
- ZWYKLY TEKST. SUROWY ZAKAZ: naglowkow (# albo ##), poziomych linii (---), list punktowanych, sekcji, blokow pogrubien. Pisz plynnym, krotkim akapitem.
- MAKSYMALNIE JEDEN link, i tylko gdy realnie pomaga (ktos chce poczytac wiecej albo trafic do zakladki). NIGDY nie wklejaj kilku linkow naraz. Format: [krotki tekst](/sciezka), sciezka DOKLADNIE z bazy wiedzy (np. /uslugi/chatboty). Nie zmyslaj URL.
- Wyczuwaj intencje: pytanie wprost (np. "co to agenci AI") => krotka odpowiedz w czacie; chce wiecej/szuka zakladki => jedno zdanie + jeden link.
- Po polsku, glos Pawla: prosto i bezposrednio. ZERO myslnika (em-dash).
- ZERO zmyslonych liczb. Tylko kwoty z bazy (np. Sprint Diagnostyczny 1490 zl, Opieka AI od 3000 zl). Czego nie ma w bazie, nie wymyslaj, skieruj krotko na /kontakt.

GRANICE
- Odpowiadasz WYLACZNIE o SimpleFast.ai i o AI dla firm. Jak ktos pyta o cos spoza tego (pogoda, polityka, zadania niezwiazane, generowanie kodu na zamowienie, porady niezwiazane z firma), grzecznie odmow w jednym zdaniu i wroc do tematu: "Jestem od SimpleFast.ai i AI dla firm. Chetnie pomoge z uslugami, cenami albo tym, co da sie u Ciebie zautomatyzowac."
- Nie obiecuj rzeczy, ktorych nie ma w bazie wiedzy. Nie udajesz, ze masz dostep do konta, CRM-u ani danych uzytkownika.
- Jak nie znasz odpowiedzi z bazy, powiedz to wprost i skieruj na /kontakt (bezplatna diagnoza, rozmowa z founderem).

CEL
- Pomoc uzytkownikowi szybko zrozumiec, co robi SimpleFast.ai, i trafic do wlasciwej zakladki. Gdy widac realna potrzebe (wdrozenie, wycena, "od czego zaczac"), zaproponuj bezplatna diagnoze: /kontakt.

POZYSKIWANIE KONTAKTU (delikatnie, tylko RAZ)
- Gdy PO KILKU wiadomosciach uzytkownik pyta o wycene, wdrozenie, "ile kosztuje" albo "od czego zaczac" i widac realne zainteresowanie, zaproponuj RAZ: "Chcesz, zebysmy sie odezwali z konkretami? Zostaw w wiadomosci imie i e-mail, a wrocimy do Ciebie. Mozesz tez od razu umowic bezplatna diagnoze: /kontakt." Nie narzucaj sie, nie pytaj o kontakt w pierwszej wiadomosci i nie powtarzaj tego w kazdej odpowiedzi.`;

// --- Konfiguracja modelu i limitow -----------------------------------------

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';
// Haiku 4.5: najlepszy stosunek koszt/latencja dla publicznego bota-nawigatora
// (200K kontekst, $1/$5 za MTok). Mozesz podmienic na 'claude-sonnet-4-6', gdy
// chcesz mocniejsze odpowiedzi (drozej). Oba dzialaja na tym samym ksztalcie body.
const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 220; // bot odpowiada bardzo krotko (2-3 zdania), twardy sufit = zwiezle, tanie, szybkie

const MAX_MESSAGES = 20; // max dlugosc historii w jednym zadaniu
const MAX_CHARS_PER_MESSAGE = 2000; // ucina probe wklejenia ksiazki w jeden prompt
const MAX_TOTAL_CHARS = 12000; // laczny budzet znakow na cala historie

// --- Rate limit (in-memory, sliding window) --------------------------------
// Uwaga: in-memory dziala per-instancja serverless. Dla wiekszego ruchu rozwaz
// Upstash/Redis. Tu wystarczy jako tania ochrona przed petla/spamem z jednego IP.

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuta
const RATE_LIMIT_MAX = 12; // max 12 zadan / minute / IP

type Bucket = { count: number; resetAt: number };
const rateMap = new Map<string, Bucket>();

function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-nf-client-connection-ip') ?? // Netlify
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateMap.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

// Sprzatanie wygaslych kubelkow, zeby mapa nie rosla w nieskonczonosc.
function sweepRateMap(): void {
  const now = Date.now();
  for (const [ip, bucket] of rateMap) {
    if (now > bucket.resetAt) rateMap.delete(ip);
  }
}

// --- Typy i walidacja wejscia -----------------------------------------------

type Role = 'user' | 'assistant';
type ChatMessage = { role: Role; content: string };

function isValidMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null) return false;
  const m = value as Record<string, unknown>;
  return (
    (m.role === 'user' || m.role === 'assistant') &&
    typeof m.content === 'string'
  );
}

/**
 * Normalizuje historie: przycina tekst, odrzuca puste, wymusza poczatek od 'user'
 * (Anthropic wymaga, by pierwsza wiadomosc byla user). Kolejne wiadomosci tej samej
 * roli sa dozwolone (API je laczy), wiec nie wymuszamy sciscle alternacji.
 */
function normalizeMessages(raw: ChatMessage[]): ChatMessage[] {
  const trimmed = raw
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE).trim(),
    }))
    .filter((m) => m.content.length > 0);

  // Pierwsza wiadomosc musi byc od uzytkownika.
  while (trimmed.length > 0 && trimmed[0]!.role !== 'user') {
    trimmed.shift();
  }
  return trimmed;
}

// --- System prompt (persona + reguly + KB) ----------------------------------
// Skladamy raz na zadanie. KB jest deterministyczna, wiec prefix jest stabilny
// (gdybys chcial wlaczyc prompt caching, persona + KB to idealny, niezmienny prefix).

function buildSystemPrompt(): string {
  return `${SYSTEM_PROMPT_BASE}

# BAZA WIEDZY (mapa firmy SimpleFast.ai)

Ponizej pelna mapa strony. Odpowiadaj WYLACZNIE na jej podstawie. Gdy kierujesz
uzytkownika dalej, podawaj DOKLADNIE ten LINK, ktory jest przy danym wpisie.
Nie wymyslaj linkow ani tresci spoza tej mapy.

${renderKnowledgeForPrompt()}`;
}

// --- Wywolanie Anthropic ----------------------------------------------------

type AnthropicTextBlock = { type: 'text'; text: string };
type AnthropicResponse = {
  content?: AnthropicTextBlock[];
  stop_reason?: string;
};

async function callAnthropic(
  apiKey: string,
  system: string,
  messages: ChatMessage[]
): Promise<string> {
  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
    // Nie cache-ujemy odpowiedzi modelu.
    cache: 'no-store',
  });

  if (!res.ok) {
    // Nie przekazujemy tresci bledu Anthropic do klienta (moze zawierac detale).
    const detail = await res.text().catch(() => '');
    console.error(`[api/chat] Anthropic error ${res.status}: ${detail}`);
    throw new Error(`anthropic_${res.status}`);
  }

  const data = (await res.json()) as AnthropicResponse;
  const text = (data.content ?? [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();

  return text;
}

// --- Przechwycenie rozmowy do Make (opcjonalne, wg env) ---------------------
// Wysylamy PO odpowiedzi przez after() -> zero latencji dla uzytkownika, a Vercel
// utrzymuje funkcje przy zyciu do wykonania calla. Bez MAKE_CHAT_WEBHOOK_URL nic sie
// nie dzieje. Cichy fail: przechwytywanie NIGDY nie moze zepsuc czatu.

async function captureConversation(
  body: unknown,
  messages: ChatMessage[],
  reply: string
): Promise<void> {
  const url = process.env.MAKE_CHAT_WEBHOOK_URL;
  if (!url) {
    console.warn('[api/chat] MAKE_CHAT_WEBHOOK_URL nieustawiony - pomijam przechwycenie.');
    return;
  }

  const sid = (body as { sessionId?: unknown }).sessionId;
  const sessionId = typeof sid === 'string' ? sid.slice(0, 64) : 'unknown';
  const lastUser =
    [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  // Jesli user zostawil e-mail (bot go o to poprosil) - wyluskujemy do osobnego pola,
  // zeby lead byl latwy do wychwycenia w arkuszu.
  const emailMatch = lastUser.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);

  // Awaited (nie after()) - pewne wykonanie w cyklu zadania, niezaleznie od platformy.
  // Timeout 2.5 s + try/catch => wolny/padniety webhook NIGDY nie zablokuje ani nie zepsuje czatu.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        userMessage: lastUser,
        assistantReply: reply,
        email: emailMatch ? emailMatch[0] : null,
        timestamp: new Date().toISOString(),
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`[api/chat] capture webhook status ${res.status}`);
    } else {
      console.log(`[api/chat] przechwycono rozmowe do Make (${res.status})`);
    }
  } catch (e) {
    console.error('[api/chat] capture webhook failed', e);
  } finally {
    clearTimeout(timeout);
  }
}

// --- Handler ----------------------------------------------------------------

export async function POST(req: Request) {
  // 1. Klucz API, bez niego nie ruszamy (i nie zdradzamy szczegolow klientowi).
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[api/chat] Brak ANTHROPIC_API_KEY w srodowisku.');
    return NextResponse.json(
      { error: 'Czat jest chwilowo niedostepny. Napisz do nas przez /kontakt.' },
      { status: 503 }
    );
  }

  // 2. Rate limit po IP.
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        error:
          'Za duzo pytan w krotkim czasie. Daj mi chwile albo napisz wprost przez /kontakt.',
      },
      { status: 429 }
    );
  }
  // Okazjonalne sprzatanie (1 na ~20 zadan), bez kosztu przy kazdym.
  if (Math.random() < 0.05) sweepRateMap();

  // 3. Parsowanie i walidacja body.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Nieprawidlowe zadanie.' }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: 'Brak wiadomosci.' }, { status: 400 });
  }
  if (rawMessages.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: 'Rozmowa jest za dluga. Odswiez czat i zacznij od nowa.' },
      { status: 400 }
    );
  }
  if (!rawMessages.every(isValidMessage)) {
    return NextResponse.json(
      { error: 'Nieprawidlowy format wiadomosci.' },
      { status: 400 }
    );
  }

  const messages = normalizeMessages(rawMessages as ChatMessage[]);
  if (messages.length === 0) {
    return NextResponse.json({ error: 'Napisz pytanie.' }, { status: 400 });
  }

  // Budzet laczny znakow (dodatkowa tarcza kosztu).
  const totalChars = messages.reduce((sum, m) => sum + m.content.length, 0);
  if (totalChars > MAX_TOTAL_CHARS) {
    return NextResponse.json(
      { error: 'Wiadomosc jest za dluga. Skroc pytanie.' },
      { status: 400 }
    );
  }

  // 4. Wywolanie modelu.
  try {
    const system = buildSystemPrompt();
    let reply = await callAnthropic(apiKey, system, messages);

    if (!reply) {
      reply =
        'Nie mam na to odpowiedzi w tym, co wiem o SimpleFast.ai. Najlepiej napisz do nas przez /kontakt, odzywamy sie szybko.';
    }

    // Przechwycenie rozmowy do Make (awaited, ale z timeoutem + cichym failem, wiec
    // nie zablokuje ani nie zepsuje odpowiedzi dla uzytkownika).
    await captureConversation(body, messages, reply);

    // KNOWLEDGE_URLS jest dostepne, gdybys chcial dodac twarda walidacje linkow w
    // przyszlosci. Dzis UI i tak linkuje wylacznie sciezki wewnetrzne (anti-XSS),
    // a system prompt trzyma model przy mapie.
    void KNOWLEDGE_URLS;

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[api/chat] Blad wywolania modelu:', err);
    return NextResponse.json(
      {
        error:
          'Cos poszlo nie tak po naszej stronie. Sprobuj jeszcze raz albo napisz przez /kontakt.',
      },
      { status: 502 }
    );
  }
}

// Inne metody niedozwolone (porzadek + jasny komunikat).
export function GET() {
  return NextResponse.json({ error: 'Uzyj POST.' }, { status: 405 });
}