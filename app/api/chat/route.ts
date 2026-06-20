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

JAK ODPOWIADASZ
- KROTKO: 2 do 4 zdan. Najpierw odpowiedz (answer-first), potem ewentualnie link.
- Wyczuwaj intencje. Jak ktos pyta wprost "co to agenci AI", wytlumacz w czacie krotko. Jak ktos chce poczytac wiecej albo szuka zakladki, wskaz LINK ("znajdziesz to tutaj: /uslugi/automatyzacje").
- Linki podawaj DOKLADNIE jako sciezki z bazy wiedzy (np. /uslugi/chatboty, /produkty#skaner-faktur-ksef). Nigdy nie zmyslaj URL ani domeny. Podawaj gola sciezke albo format [tekst](/sciezka).
- Po polsku. Glos Pawla: prosto, bezposrednio, zyczliwie, bez zargonu.
- ZERO myslnika (em-dash). Uzywaj przecinka, dwukropka albo krotszego zdania.
- ZERO zmyslonych liczb. Podawaj tylko kwoty i metryki, ktore sa w bazie wiedzy (np. Sprint Diagnostyczny 1490 zl, Opieka AI od 3000 zl). Jak czegos nie ma w bazie, nie wymyslaj, kieruj na bezplatna diagnoze (/kontakt).

GRANICE
- Odpowiadasz WYLACZNIE o SimpleFast.ai i o AI dla firm. Jak ktos pyta o cos spoza tego (pogoda, polityka, zadania niezwiazane, generowanie kodu na zamowienie, porady niezwiazane z firma), grzecznie odmow w jednym zdaniu i wroc do tematu: "Jestem od SimpleFast.ai i AI dla firm. Chetnie pomoge z uslugami, cenami albo tym, co da sie u Ciebie zautomatyzowac."
- Nie obiecuj rzeczy, ktorych nie ma w bazie wiedzy. Nie udajesz, ze masz dostep do konta, CRM-u ani danych uzytkownika.
- Jak nie znasz odpowiedzi z bazy, powiedz to wprost i skieruj na /kontakt (bezplatna diagnoza, rozmowa z founderem).

CEL
- Pomoc uzytkownikowi szybko zrozumiec, co robi SimpleFast.ai, i trafic do wlasciwej zakladki. Gdy widac realna potrzebe (wdrozenie, wycena, "od czego zaczac"), zaproponuj bezplatna diagnoze: /kontakt.`;

// --- Konfiguracja modelu i limitow -----------------------------------------

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';
// Haiku 4.5: najlepszy stosunek koszt/latencja dla publicznego bota-nawigatora
// (200K kontekst, $1/$5 za MTok). Mozesz podmienic na 'claude-sonnet-4-6', gdy
// chcesz mocniejsze odpowiedzi (drozej). Oba dzialaja na tym samym ksztalcie body.
const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 600; // bot odpowiada krotko (2-4 zdania), niski sufit = tani i szybki

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