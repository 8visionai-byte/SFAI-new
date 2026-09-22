/**
 * migawka.js — zdejmuje stan SEO produkcji simplefast.ai do pliku JSON.
 *
 * Uzycie:  node tools/migawka.js [nazwa-pliku-bez-rozszerzenia]
 * Zapis:   .seo-przeglad/migawki/<nazwa>.json
 *
 * Format zgodny z migawkami 2026-08-16 / 2026-08-17 / 2026-08-17b, zeby dalo sie
 * porownywac przebieg do przebiegu. Czysty Node, zero zaleznosci npm.
 */
const fs = require('fs');
const path = require('path');

const NAZWA = process.argv[2] || new Date().toISOString().slice(0, 10);
const BAZA = 'https://www.simplefast.ai';
const WYJ = path.join(__dirname, '..', '.seo-przeglad', 'migawki', `${NAZWA}.json`);

const UA = { 'user-agent': 'Mozilla/5.0 (compatible; SimpleFastSEO/1.0; +https://simplefast.ai)' };

async function pobierz(url, opcje = {}) {
  try {
    const r = await fetch(url, { headers: UA, redirect: 'manual', ...opcje });
    const txt = opcje.method === 'HEAD' ? '' : await r.text();
    return { status: r.status, naglowki: r.headers, tekst: txt, loc: r.headers.get('location') };
  } catch (e) {
    return { status: 0, blad: String(e.message).slice(0, 120), naglowki: new Headers(), tekst: '' };
  }
}
async function pobierzZPrzekierowaniem(url) {
  try {
    const r = await fetch(url, { headers: UA });
    return { status: r.status, naglowki: r.headers, tekst: await r.text() };
  } catch (e) {
    return { status: 0, blad: String(e.message).slice(0, 120), naglowki: new Headers(), tekst: '' };
  }
}

const wytnij = (h, re) => { const m = h.match(re); return m ? m[1].trim() : null; };
const odkoduj = (s) => s ? s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ') : s;

function analizujHtml(html) {
  const title = odkoduj(wytnij(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const desc = odkoduj(
    wytnij(html, /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i) ||
    wytnij(html, /<meta[^>]+content=["']([\s\S]*?)["'][^>]+name=["']description["']/i)
  );
  const can = wytnij(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
              wytnij(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const robots = wytnij(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i) || 'brak (domyslnie index, follow)';
  const og = /property=["']og:image["']/i.test(html);

  const h1y = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((m) => odkoduj(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()))
    .filter(Boolean);

  // dane strukturalne
  const ld = [], bledy = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const j = JSON.parse(m[1].trim());
      const zbierz = (o) => {
        if (Array.isArray(o)) return o.forEach(zbierz);
        if (o && typeof o === 'object') {
          if (o['@type']) ld.push(...[].concat(o['@type']));
          if (o['@graph']) zbierz(o['@graph']);
        }
      };
      zbierz(j);
    } catch { bledy.push(1); }
  }

  // dlugosc tekstu widocznego (w znakach) — miara "sl", metoda stala miedzy przebiegami
  const tekst = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    t: title, tl: title ? title.length : 0,
    d: desc, dl: desc ? desc.length : 0,
    h1: h1y[0] || null, h1n: h1y.length,
    can, ld: [...new Set(ld)], ldb: bledy.length,
    sl: tekst.length, slowa: tekst ? tekst.split(' ').length : 0,
    idx: robots, og,
  };
}

(async () => {
  const wynik = { data: NAZWA, domena: BAZA, przebieg: NAZWA };

  // --- mapa witryny ---
  const sm = await pobierzZPrzekierowaniem(`${BAZA}/sitemap.xml`);
  const adresy = [...sm.tekst.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const lastmody = [...sm.tekst.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].slice(0, 10));
  const lastmodLicz = {};
  for (const d of lastmody) lastmodLicz[d] = (lastmodLicz[d] || 0) + 1;

  // --- technika ---
  const [rob, llms, wiedza, apex, http, err404, home] = await Promise.all([
    pobierzZPrzekierowaniem(`${BAZA}/robots.txt`),
    pobierzZPrzekierowaniem(`${BAZA}/llms.txt`),
    pobierzZPrzekierowaniem(`${BAZA}/wiedza-agenta.txt`),
    pobierz('https://simplefast.ai/'),
    pobierz('http://simplefast.ai/'),
    pobierzZPrzekierowaniem(`${BAZA}/nie-ma-takiej-strony-test-seo-404`),
    pobierzZPrzekierowaniem(`${BAZA}/`),
  ]);

  const n = (k) => home.naglowki.get(k);
  wynik.technika = {
    robots_txt: rob.status,
    robots_ma_sitemap: /sitemap/i.test(rob.tekst),
    llms_txt: llms.status,
    llms_txt_kb: +(Buffer.byteLength(llms.tekst) / 1024).toFixed(1),
    wiedza_agenta_txt: wiedza.status,
    host_kanoniczny: 'www.simplefast.ai',
    apex_przekierowuje_na_www: apex.status >= 300 && apex.status < 400,
    apex_status: apex.status,
    apex_loc: apex.loc,
    http_przekierowuje_na_https: http.status >= 300 && http.status < 400,
    status_404: err404.status,
    naglowki_bezpieczenstwa: {
      'strict-transport-security': n('strict-transport-security') || 'BRAK',
      'content-security-policy': n('content-security-policy') ? 'JEST' : 'BRAK',
      'x-content-type-options': n('x-content-type-options') || 'BRAK',
      'x-frame-options': n('x-frame-options') || 'BRAK',
      'referrer-policy': n('referrer-policy') || 'BRAK',
      'permissions-policy': n('permissions-policy') ? 'JEST' : 'BRAK',
    },
    cache_home: n('cache-control') || 'BRAK',
    sitemap_lastmod: lastmodLicz,
  };

  // --- boty AI ---
  const BOTY = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User',
    'ClaudeBot', 'Google-Extended', 'Bingbot', 'anthropic-ai', 'CCBot', 'Applebot-Extended', 'meta-externalagent'];
  wynik.boty_ai = {};
  for (const bot of BOTY) {
    const blok = rob.tekst.match(new RegExp(`User-agent:\\s*${bot}\\s*\\n([\\s\\S]*?)(?=\\nUser-agent:|$)`, 'i'));
    if (!blok) wynik.boty_ai[bot] = 'brak wpisu (domyslnie wpuszczony)';
    else wynik.boty_ai[bot] = /Disallow:\s*\/\s*$/m.test(blok[1]) ? 'ZABLOKOWANY' : 'wpuszczony';
  }

  // --- pomiar ---
  wynik.pomiar = {
    umami: /umami/i.test(home.tekst),
    umami_website_id: wytnij(home.tekst, /data-website-id=["']([^"']+)["']/i),
    ga4: /gtag\/js|googletagmanager\.com\/gtag/i.test(home.tekst),
    gtm: /googletagmanager\.com\/gtm/i.test(home.tekst),
    plausible: /plausible\.io/i.test(home.tekst),
    vercel_analytics: /_vercel\/insights/i.test(home.tekst),
    clarity_hotjar: /clarity\.ms|hotjar/i.test(home.tekst),
  };

  // --- konwersja: endpointy ---
  const ENDP = ['/api/lead', '/api/chat', '/api/realtime-session', '/api/elevenlabs-session'];
  wynik.konwersja = { endpointy: {} };
  for (const e of ENDP) {
    const r = await pobierz(`${BAZA}${e}`, { method: 'GET' });
    wynik.konwersja.endpointy[e] = r.status;
  }
  const post = await pobierz(`${BAZA}/api/lead`, {
    method: 'POST', headers: { ...UA, 'content-type': 'application/json' }, body: '{}',
  });
  wynik.konwersja.lead_pusty_post = post.status;

  // --- podstrony ---
  wynik.podstrony = [];
  const problemy = [];
  for (let i = 0; i < adresy.length; i += 6) {
    const paczka = adresy.slice(i, i + 6);
    const wyniki = await Promise.all(paczka.map((u) => pobierzZPrzekierowaniem(u)));
    paczka.forEach((u, j) => {
      const r = wyniki[j];
      const sciezka = u.replace(BAZA, '') || '/';
      if (r.status !== 200) { problemy.push(`${sciezka} -> HTTP ${r.status}`); return; }
      wynik.podstrony.push({ u: sciezka, ...analizujHtml(r.tekst) });
    });
  }

  // --- podsumowanie ---
  const p = wynik.podstrony;
  wynik.podsumowanie = {
    podstron_w_sitemap: adresy.length,
    odpowiedz_200: p.length,
    z_kanonicznym: p.filter((x) => x.can).length,
    z_jednym_h1: p.filter((x) => x.h1n === 1).length,
    z_og_image: p.filter((x) => x.og).length,
    z_danymi_strukturalnymi: p.filter((x) => x.ld.length > 0).length,
    noindex: p.filter((x) => /noindex/i.test(x.idx)).length,
    bledy_parsowania_jsonld: p.reduce((s, x) => s + x.ldb, 0),
    title_ponad_60_znakow: p.filter((x) => x.tl > 60).length,
    description_ponad_158_znakow: p.filter((x) => x.dl > 158).length,
    problemy_http: problemy,
  };
  wynik.metoda = 'automatyczna: fetch surowego HTML wszystkich podstron z sitemap + robots/llms/naglowki + endpointy API. Miara "sl" = liczba znakow tekstu widocznego po usunieciu script/style/tagow.';

  fs.mkdirSync(path.dirname(WYJ), { recursive: true });
  fs.writeFileSync(WYJ, JSON.stringify(wynik, null, 1), 'utf8');
  console.log(JSON.stringify(wynik.podsumowanie, null, 1));
  console.log('ZAPISANO:', WYJ);
})();
