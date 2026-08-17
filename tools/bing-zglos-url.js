/**
 * Zgłoszenie adresów do indeksacji w Bing Webmaster (SubmitUrlBatch).
 * Bing zasila wyszukiwanie ChatGPT, więc to najkrótsza droga, żeby modele
 * w ogóle zobaczyły świeżą treść (IndexNow robi to samo pasywnie, to jest
 * kanał aktywny; limit konta: 10 000 adresów/dzień).
 *
 * Klucz WYŁĄCZNIE ze ścieżki, nigdy w repo:
 *   node tools/bing-zglos-url.js "C:/Users/Paweł Pieloch/.sekrety/bing-api-key.txt"
 * Bez argumentu bierze domyślną ścieżkę z HOME.
 */
const fs = require('node:fs');
const path = require('node:path');

const SITE = 'https://www.simplefast.ai';

/** Adresy o najwyższym priorytecie: świeża treść z kwotami + nowe podstrony. */
const URLE = [
  '/',
  '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
  '/poradniki/ile-kosztuje-chatbot-dla-firmy-2026',
  '/poradniki/ile-kosztuje-automatyzacja-ai-w-firmie',
  '/uslugi/chatboty',
  '/uslugi/voiceboty',
  '/uslugi/voiceboty/windykacja',
  '/uslugi/voiceboty/potwierdzanie-wizyt',
  '/uslugi/automatyzacje',
  '/uslugi/audyt-ai',
  '/cennik',
  '/llms.txt',
];

function sciezkaKlucza() {
  const arg = process.argv[2];
  if (arg) return arg;
  const home = process.env.USERPROFILE || process.env.HOME || '';
  return path.join(home, '.sekrety', 'bing-api-key.txt');
}

async function main() {
  const plik = sciezkaKlucza();
  if (!fs.existsSync(plik)) {
    console.error(`Brak pliku z kluczem: ${plik}`);
    process.exit(1);
  }
  const klucz = fs.readFileSync(plik, 'utf8').trim();
  if (!klucz) {
    console.error('Plik z kluczem jest pusty.');
    process.exit(1);
  }

  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${encodeURIComponent(klucz)}`;
  const body = {
    siteUrl: SITE,
    urlList: URLE.map((u) => SITE + u),
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const tresc = await res.text();

  if (res.ok) {
    console.log(`Bing: zgłoszono ${URLE.length} adresów. HTTP ${res.status}`);
    URLE.forEach((u) => console.log(`  ${SITE}${u}`));
  } else {
    console.error(`Bing: HTTP ${res.status}`);
    console.error(tresc.slice(0, 400));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('Błąd:', e.message);
  process.exit(1);
});
