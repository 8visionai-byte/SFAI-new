import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/lead — przyjmuje zgłoszenia z formularza diagnozy (i w przyszłości
 * z voicebota/czatu, pole `zrodlo`) i przekazuje je do webhooka Make.
 *
 * Adres webhooka NIE mieszka w kodzie (reguła: sekrety poza repo).
 * Vercel → Settings → Environment Variables → MAKE_LEAD_WEBHOOK_URL (Production).
 *
 * Zabezpieczenia (serwerowe powtórzenie tego, co formularz robi lokalnie):
 *  - honeypot: pole `firma_www` wypełnione = bot, udajemy sukces (bot nie wie, że wpadł),
 *  - walidacja: imię + kontakt + zgoda RODO obowiązkowe,
 *  - limit: max 5 zgłoszeń / 10 min z jednego IP (w pamięci instancji; na Vercelu
 *    to ochrona best-effort, wystarczająca na zwykły spam),
 *  - timeout 5 s na strzał do Make, żeby formularz nigdy nie wisiał.
 */

const OKNO_MS = 10 * 60 * 1000;
const LIMIT = 5;
const licznik = new Map<string, { n: number; od: number }>();

function przekroczonyLimit(ip: string): boolean {
  const teraz = Date.now();
  const wpis = licznik.get(ip);
  if (!wpis || teraz - wpis.od > OKNO_MS) {
    licznik.set(ip, { n: 1, od: teraz });
    return false;
  }
  wpis.n += 1;
  return wpis.n > LIMIT;
}

export async function POST(request: NextRequest) {
  const webhook = process.env.MAKE_LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Jawny błąd konfiguracji — lepiej, żeby użytkownik zobaczył komunikat błędu
    // (i napisał maila), niż żeby lead po cichu zniknął.
    console.error('[lead] Brak MAKE_LEAD_WEBHOOK_URL w env — zgłoszenie odrzucone.');
    return NextResponse.json({ ok: false, blad: 'konfiguracja' }, { status: 503 });
  }

  let dane: Record<string, unknown>;
  try {
    dane = await request.json();
  } catch {
    return NextResponse.json({ ok: false, blad: 'zly-format' }, { status: 400 });
  }

  // Honeypot: bot wypełnił ukryte pole → udajemy sukces, nic nie wysyłamy.
  if (typeof dane.firma_www === 'string' && dane.firma_www.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const imie = String(dane.imie ?? '').trim();
  const kontakt = String(dane.kontakt ?? '').trim();
  const zgoda = dane.zgoda === 'tak';
  if (!imie || !kontakt || !zgoda) {
    return NextResponse.json({ ok: false, blad: 'brak-pol' }, { status: 400 });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? 'nieznane').split(',')[0]!.trim();
  if (przekroczonyLimit(ip)) {
    return NextResponse.json({ ok: false, blad: 'limit' }, { status: 429 });
  }

  const payload = {
    zrodlo: String(dane.zrodlo ?? 'formularz-kontakt'),
    potrzeba: String(dane.potrzeba ?? ''),
    branza: String(dane.branza ?? ''),
    zespol: String(dane.zespol ?? ''),
    imie,
    kontakt,
    zgoda: 'tak',
    strona: request.headers.get('referer') ?? '',
    kiedy: new Date().toISOString(),
  };

  try {
    const kontroler = new AbortController();
    const timer = setTimeout(() => kontroler.abort(), 5000);
    const odp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: kontroler.signal,
    });
    clearTimeout(timer);
    if (!odp.ok) {
      console.error(`[lead] Make odpowiedział ${odp.status}`);
      return NextResponse.json({ ok: false, blad: 'webhook' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[lead] Błąd wysyłki do Make:', e);
    return NextResponse.json({ ok: false, blad: 'webhook' }, { status: 502 });
  }
}
