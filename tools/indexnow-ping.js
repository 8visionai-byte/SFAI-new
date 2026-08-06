/**
 * indexnow-ping.js — zgłasza wszystkie adresy z sitemapy do IndexNow (Bing i spółka).
 *
 * Użycie:  node tools/indexnow-ping.js
 * Bez zależności npm (Node 18+, wbudowany fetch).
 *
 * Jak to działa:
 *  1. Pobiera https://www.simplefast.ai/sitemap.xml i wyciąga wszystkie <loc>.
 *  2. Wysyła POST na https://api.indexnow.org/indexnow z listą URL-i.
 *  3. Loguje status odpowiedzi (200/202 = przyjęte).
 *
 * Klucz IndexNow jest JAWNY z definicji protokołu (to nie sekret): wyszukiwarka
 * weryfikuje własność domeny, pobierając plik /<klucz>.txt z tej samej domeny.
 * Plik klucza leży w public/ i musi być WDROŻONY na produkcję, zanim odpalisz
 * ten skrypt (inaczej IndexNow odrzuci zgłoszenie jako niezweryfikowane).
 */
const HOST = 'www.simplefast.ai';
const KEY = 'c1b2dc4dad72b3b2a2ebf1031c23dd22';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  // 1. Sitemapa -> lista adresów z <loc>.
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    console.error(`Nie udało się pobrać sitemapy: HTTP ${res.status} (${SITEMAP_URL})`);
    process.exit(1);
  }
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urlList.length === 0) {
    console.error('Sitemapa nie zawiera żadnego <loc> — nic do zgłoszenia.');
    process.exit(1);
  }
  console.log(`Sitemapa OK: ${urlList.length} adresów do zgłoszenia.`);

  // 2. Sprawdzenie, czy plik klucza jest na produkcji (inaczej ping nie przejdzie).
  const keyRes = await fetch(KEY_LOCATION);
  if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
    console.error(`Plik klucza niedostępny albo zła treść: ${KEY_LOCATION}`);
    console.error('Najpierw wdróż public/' + KEY + '.txt na produkcję, potem odpal ping.');
    process.exit(1);
  }
  console.log('Plik klucza na produkcji OK.');

  // 3. POST do IndexNow.
  const ping = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const body = await ping.text();
  console.log(`IndexNow: HTTP ${ping.status} ${ping.statusText}`);
  if (body) console.log(body);
  if (ping.status === 200 || ping.status === 202) {
    console.log(`Zgłoszono ${urlList.length} adresów. Gotowe.`);
  } else {
    console.error('Zgłoszenie nie zostało przyjęte — sprawdź status wyżej.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Błąd:', err.message);
  process.exit(1);
});
