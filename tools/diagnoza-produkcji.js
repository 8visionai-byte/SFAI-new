/**
 * diagnoza-produkcji.js — punktowe sprawdzenie zywej produkcji simplefast.ai.
 *
 * Uzycie:  node tools/diagnoza-produkcji.js
 *
 * Sprawdza rzeczy, ktorych migawka nie lapie: strukture H1 (czy nie rozbity na litery),
 * wage kluczowych zasobow, favicon, klucz IndexNow, linki na /narzedzia.
 */
const BAZA = 'https://www.simplefast.ai';
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' };

const pobierz = async (u, o = {}) => {
  try {
    const r = await fetch(u, { headers: UA, ...o });
    return { status: r.status, h: r.headers, t: o.method === 'HEAD' ? '' : await r.text() };
  } catch (e) { return { status: 0, blad: String(e.message).slice(0, 100), h: new Headers(), t: '' }; }
};

(async () => {
  // === 1. H1 na stronie glownej ===
  const home = await pobierz(`${BAZA}/`);
  const m = home.t.match(/<h1[\s\S]*?<\/h1>/i);
  console.log('=== 1. H1 STRONY GLOWNEJ ===');
  if (!m) console.log('BRAK H1');
  else {
    const surowy = m[0];
    const spanow = (surowy.match(/<span/gi) || []).length;
    const textContent = surowy.replace(/<[^>]+>/g, '');       // tak sklei to przegladarka i Google
    const zeSpacjami = surowy.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); // tak czyta prosty parser
    console.log('dlugosc markupu :', surowy.length, 'znakow');
    console.log('liczba <span>   :', spanow);
    console.log('aria-label      :', (surowy.match(/aria-label="([^"]*)"/i) || [])[1] || 'BRAK');
    console.log('sr-only w srodku:', /sr-only/i.test(surowy) ? 'JEST' : 'BRAK');
    console.log('textContent (Google po sklejeniu):');
    console.log('   ' + JSON.stringify(textContent.trim()));
    console.log('prosty parser (bot czytajacy surowy HTML):');
    console.log('   ' + JSON.stringify(zeSpacjami.slice(0, 160)));
    console.log('POCZATEK MARKUPU:', surowy.slice(0, 320).replace(/\s+/g, ' '));
  }

  // === 2. Waga zasobow strony glownej ===
  console.log('\n=== 2. WAGA KLUCZOWYCH ZASOBOW ===');
  const zasoby = [...new Set([...home.t.matchAll(/(?:src|href)="(\/[^"]+\.(?:png|jpe?g|webp|avif|svg|woff2?))"/gi)].map((x) => x[1]))];
  let suma = 0;
  const lista = [];
  for (const z of zasoby.slice(0, 25)) {
    const r = await pobierz(`${BAZA}${z}`, { method: 'HEAD' });
    const kb = +(parseInt(r.h.get('content-length') || '0', 10) / 1024).toFixed(1);
    suma += kb;
    lista.push({ z, kb, status: r.status });
  }
  lista.sort((a, b) => b.kb - a.kb);
  for (const x of lista.slice(0, 12)) console.log(`${String(x.kb).padStart(8)} kB | HTTP ${x.status} | ${x.z}`);
  console.log(`RAZEM sprawdzonych zasobow: ${lista.length}, laczna waga: ${suma.toFixed(0)} kB`);
  console.log(`HTML strony glownej: ${(Buffer.byteLength(home.t) / 1024).toFixed(0)} kB`);

  // === 3. Favicon i IndexNow ===
  console.log('\n=== 3. FAVICON / INDEXNOW / MAPA ===');
  for (const u of ['/favicon.ico', '/icon.png', '/apple-icon.png']) {
    const r = await pobierz(`${BAZA}${u}`, { method: 'HEAD' });
    console.log(`HTTP ${r.status} | ${u}`);
  }
  const rob = await pobierz(`${BAZA}/robots.txt`);
  const klucze = [...rob.t.matchAll(/([a-f0-9]{32})/gi)].map((x) => x[1]);
  console.log('klucz IndexNow w robots.txt:', klucze.length ? 'JEST' : 'brak wzmianki');
  const idx = await pobierz(`${BAZA}/indexnow-key.txt`, { method: 'HEAD' });
  console.log(`HTTP ${idx.status} | /indexnow-key.txt`);

  // === 4. Linki na /narzedzia ===
  console.log('\n=== 4. LINKI WEWNETRZNE NA /narzedzia ===');
  const nar = await pobierz(`${BAZA}/narzedzia`);
  const linki = [...new Set([...nar.t.matchAll(/href="(\/[^"#?]*)"/g)].map((x) => x[1]))];
  for (const l of linki) {
    if (l.match(/\.(png|jpg|svg|ico|webp|xml|txt|json)$/)) continue;
    const r = await pobierz(`${BAZA}${l}`, { method: 'HEAD' });
    if (r.status !== 200) console.log(`  ZEPSUTY -> HTTP ${r.status} | ${l}`);
  }
  console.log(`sprawdzono ${linki.length} adresow`);

  // === 5. Naglowki cache dla obrazow ===
  console.log('\n=== 5. CACHE OBRAZOW ===');
  const naj = lista[0];
  if (naj) {
    const r = await pobierz(`${BAZA}${naj.z}`, { method: 'HEAD' });
    console.log(`${naj.z}: cache-control = ${r.h.get('cache-control') || 'BRAK'} | typ = ${r.h.get('content-type')}`);
  }
})();
