/**
 * seo-dane.js — JEDEN zbieracz wszystkich danych SEO. Zastepuje 6 osobnych komend.
 *
 * Uzycie:  node tools/seo-dane.js
 *          node tools/seo-dane.js --json          (surowy JSON na stdout)
 *          node tools/seo-dane.js --zapisz        (zapis do .seo-przeglad/dane/<data>.json)
 *
 * Zbiera w jednym przebiegu:
 *  1. Google Search Console: 7/28/90 dni (trend), TOP zapytania, TOP strony, urzadzenia
 *  2. Bing Webmaster: wyswietlenia i klikniecia
 *  3. Ahrefs (zakres publiczny): Domain Rating nasz i konkurentow
 *  4. Strona: mapa witryny, tytuly, opisy, H1, dane strukturalne, roboty AI
 *
 * Klucze czytane z ~/.sekrety, NIGDY nie drukowane.
 * Kazde zrodlo w try/catch — awaria jednego nie zabija reszty (raportuje "blad" w JSON).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const SEKRETY = path.join(os.homedir(), '.sekrety');

// --- WIELE STRON ---
// Domyślnie simplefast.ai. Inną stronę wskazujesz flagą:  --strona=papishop.pl
// Wszystkie widoczne naraz:  --wszystkie
// UWAGA: konto usługi musi być dodane jako użytkownik danej właściwości w GSC,
// inaczej ta strona nie będzie widoczna (patrz --uslugi).
const argWartosc = (n) => {
  const a = process.argv.find((x) => x.startsWith(`--${n}=`));
  return a ? a.split('=')[1] : null;
};
const DOMENA = argWartosc('strona') || 'simplefast.ai';
const SITE = `https://www.${DOMENA}`;
const SITE_GSC = `sc-domain:${DOMENA}`;

// Konkurenci per klaster tematyczny — komplet 5 obszarów, nie tylko chatboty.
const KONKURENCI_WG_KLASTRA = {
  chatboty: ['mits.pl', 'malinski.ai', 'lessmanual.ai', 'falconworks.pl', 'biznesailab.pl', 'pawlicaweb.pl'],
  voiceboty: ['malinski.ai', 'syntalith.ai', 'xomedia.pl', 'chatbotassistant.pl', 'apifonica.com'],
  automatyzacje: ['gagan.pl', 'codescriptum.pl', 'sagiton.pl', 'lessmanual.ai'],
  audyt: ['gagan.pl', 'ninjatech.pl', 'delante.co', 'widoczni.com'],
  wdrozenia: ['wasko.pl', 'innowise.com', 'mits.pl', 'devstock.pl'],
};
const KONKURENCI = [...new Set(Object.values(KONKURENCI_WG_KLASTRA).flat())];

const arg = (n) => process.argv.includes(n);
const dzis = new Date().toISOString().slice(0, 10);
const dataMinus = (d) => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);

// ---------- GOOGLE SEARCH CONSOLE ----------
function b64url(o) { return Buffer.from(JSON.stringify(o)).toString('base64url'); }

async function gscToken(keyObj) {
  const now = Math.floor(Date.now() / 1000);
  const body = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss: keyObj.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  })}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(body);
  const jwt = `${body}.${signer.sign(keyObj.private_key, 'base64url')}`;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  const j = await r.json();
  if (!j.access_token) throw new Error('brak tokenu GSC: ' + JSON.stringify(j).slice(0, 120));
  return j.access_token;
}

async function gscQuery(token, body) {
  const r = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_GSC)}/searchAnalytics/query`,
    { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify(body) }
  );
  if (!r.ok) throw new Error(`GSC HTTP ${r.status}: ${(await r.text()).slice(0, 140)}`);
  return (await r.json()).rows || [];
}

const sumuj = (rows) => {
  const k = rows.reduce((s, r) => s + (r.clicks || 0), 0);
  const w = rows.reduce((s, r) => s + (r.impressions || 0), 0);
  const poz = rows.length ? rows.reduce((s, r) => s + (r.position || 0) * (r.impressions || 0), 0) / (w || 1) : 0;
  return { klikniecia: k, wyswietlenia: w, ctr: w ? +((k / w) * 100).toFixed(2) : 0, pozycja: +poz.toFixed(1) };
};

async function zbierzGSC() {
  const keyObj = JSON.parse(fs.readFileSync(path.join(SEKRETY, 'simplefastai-seo-e271ff1f5e28.json'), 'utf8'));
  const token = await gscToken(keyObj);
  const out = { okresy: {}, zapytania: [], strony: [], urzadzenia: [], strony_zapytania: [] };

  for (const dni of [7, 28, 90]) {
    const rows = await gscQuery(token, { startDate: dataMinus(dni + 2), endDate: dataMinus(2), dimensions: ['date'], rowLimit: 500 });
    const s = sumuj(rows);
    out.okresy[dni + 'dni'] = { ...s, wysw_dziennie: +(s.wyswietlenia / dni).toFixed(1), klik_dziennie: +(s.klikniecia / dni).toFixed(2) };
  }

  const q = await gscQuery(token, { startDate: dataMinus(30), endDate: dataMinus(2), dimensions: ['query'], rowLimit: 200 });
  out.zapytania = q.map((r) => ({
    fraza: r.keys[0], klik: r.clicks, wysw: r.impressions,
    ctr: +((r.ctr || 0) * 100).toFixed(1), poz: +(r.position || 0).toFixed(1),
  })).sort((a, b) => b.wysw - a.wysw);

  const p = await gscQuery(token, { startDate: dataMinus(30), endDate: dataMinus(2), dimensions: ['page'], rowLimit: 100 });
  out.strony = p.map((r) => ({
    url: r.keys[0].replace(SITE, ''), klik: r.clicks, wysw: r.impressions,
    ctr: +((r.ctr || 0) * 100).toFixed(1), poz: +(r.position || 0).toFixed(1),
  })).sort((a, b) => b.wysw - a.wysw);

  const d = await gscQuery(token, { startDate: dataMinus(30), endDate: dataMinus(2), dimensions: ['device'], rowLimit: 10 });
  out.urzadzenia = d.map((r) => ({ urzadzenie: r.keys[0], klik: r.clicks, wysw: r.impressions, poz: +(r.position || 0).toFixed(1) }));

  const pq = await gscQuery(token, { startDate: dataMinus(30), endDate: dataMinus(2), dimensions: ['page', 'query'], rowLimit: 300 });
  out.strony_zapytania = pq.map((r) => ({
    url: r.keys[0].replace(SITE, ''), fraza: r.keys[1], klik: r.clicks, wysw: r.impressions,
    ctr: +((r.ctr || 0) * 100).toFixed(1), poz: +(r.position || 0).toFixed(1),
  })).sort((a, b) => b.wysw - a.wysw);

  // POTENCJAL: strony w TOP10 z niskim CTR = najtanszy zysk (poprawa tytulu/opisu)
  out.potencjal = out.strony
    .filter((s) => s.poz <= 10 && s.ctr < 3 && s.wysw >= 10)
    .map((s) => ({ ...s, diagnoza: 'TOP10 ale CTR < 3% -> problem w tytule i opisie, nie w pozycji' }));
  out.druga_strona = out.strony
    .filter((s) => s.poz > 10 && s.poz <= 20 && s.wysw >= 20)
    .map((s) => ({ ...s, diagnoza: 'druga strona Google -> brakuje tresci i linkowania wewnetrznego' }));
  return out;
}

// ---------- BING ----------
async function zbierzBing() {
  const key = fs.readFileSync(path.join(SEKRETY, 'bing-api-key.txt'), 'utf8').trim().split(/\s+/).pop();
  const call = async (metoda, extra = {}) => {
    const q = new URLSearchParams({ apikey: key, siteUrl: 'https://www.simplefast.ai', ...extra });
    const r = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/${metoda}?${q}`);
    const t = await r.text();
    if (!r.ok) throw new Error(`Bing HTTP ${r.status}`);
    return JSON.parse(t).d;
  };
  const stats = await call('GetRankAndTrafficStats');
  const ostatnie = (stats || []).slice(-14);
  const kw = await call('GetQueryStats').catch(() => []);
  return {
    dni: ostatnie.map((s) => ({ wysw: s.Impressions, klik: s.Clicks })),
    suma_14dni: {
      wyswietlenia: ostatnie.reduce((a, s) => a + (s.Impressions || 0), 0),
      klikniecia: ostatnie.reduce((a, s) => a + (s.Clicks || 0), 0),
    },
    zapytania: (Array.isArray(kw) ? kw : []).sort((a, b) => (b.Impressions || 0) - (a.Impressions || 0)).slice(0, 10)
      .map((k) => ({ fraza: k.Query, wysw: k.Impressions, klik: k.Clicks, poz: k.AvgImpressionPosition })),
  };
}

// ---------- AHREFS (zakres publiczny) ----------
async function zbierzAhrefs() {
  const key = fs.readFileSync(path.join(SEKRETY, 'ahrefs-api-key.txt'), 'utf8').trim();
  const dr = async (t) => {
    const r = await fetch(`https://api.ahrefs.com/v3/public/domain-rating-free?target=${encodeURIComponent(t)}`,
      { headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' } });
    if (!r.ok) return { domena: t, blad: `HTTP ${r.status}` };
    const j = await r.json();
    return { domena: t, dr: j.domain_rating?.domain_rating ?? null };
  };
  const wyniki = [];
  for (const d of [DOMENA, ...KONKURENCI]) wyniki.push(await dr(d));
  const nasz = wyniki.find((w) => w.domena === DOMENA)?.dr ?? null;

  // Rozbicie per klaster: w KAŻDYM obszarze osobno widać, kogo wyprzedzimy treścią.
  const wgKlastra = {};
  for (const [klaster, lista] of Object.entries(KONKURENCI_WG_KLASTRA)) {
    const w = wyniki.filter((x) => lista.includes(x.domena) && x.dr != null);
    wgKlastra[klaster] = {
      slabsi: w.filter((x) => nasz != null && x.dr < nasz).map((x) => `${x.domena} (DR ${x.dr})`),
      mocniejsi: w.filter((x) => nasz != null && x.dr > nasz).map((x) => `${x.domena} (DR ${x.dr})`),
    };
  }
  return {
    nasza_domena: DOMENA,
    domeny: wyniki.sort((a, b) => (b.dr ?? -1) - (a.dr ?? -1)),
    nasz_dr: nasz,
    slabsi_od_nas: wyniki.filter((w) => w.dr != null && nasz != null && w.dr < nasz && w.domena !== DOMENA).map((w) => w.domena),
    mocniejsi: wyniki.filter((w) => w.dr != null && nasz != null && w.dr > nasz).map((w) => w.domena),
    wg_klastra: wgKlastra,
  };
}

// Lista właściwości widocznych dla konta usługi — do diagnozy "czemu nie widzę strony X".
async function zbierzUslugi() {
  const keyObj = JSON.parse(fs.readFileSync(path.join(SEKRETY, 'simplefastai-seo-e271ff1f5e28.json'), 'utf8'));
  const token = await gscToken(keyObj);
  const r = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return {
    konto_uslugi: keyObj.client_email,
    widoczne: (j.siteEntry || []).map((s) => ({ wlasciwosc: s.siteUrl, uprawnienie: s.permissionLevel })),
  };
}

// ---------- STRONA (mapa witryny + on-page) ----------
async function zbierzStrone() {
  const sm = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const daty = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1].slice(0, 10));

  const rob = await (await fetch(`${SITE}/robots.txt`)).text();
  const boty = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bingbot'];

  const podstrony = [];
  for (let i = 0; i < urls.length; i += 8) {
    const paczka = await Promise.all(urls.slice(i, i + 8).map(async (u) => {
      try {
        const html = await (await fetch(u)).text();
        const we = (re) => { const m = html.match(re); return m ? m[1].trim() : null; };
        const ld = [...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
        const tekst = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
        return {
          url: u.replace(SITE, '') || '/',
          tytul: we(/<title>([^<]+)<\/title>/), tytul_dl: (we(/<title>([^<]+)<\/title>/) || '').length,
          opis_dl: (we(/name="description"\s+content="([^"]*)"/) || '').length,
          h1: we(/<h1[^>]*aria-label="([^"]+)"/) || we(/<h1[^>]*>([\s\S]{0,200}?)<\/h1>/)?.replace(/<[^>]+>/g, '').trim(),
          schema: [...new Set(ld)],
          slow: tekst.trim().split(/\s+/).length,
        };
      } catch (e) { return { url: u.replace(SITE, ''), blad: e.message.slice(0, 60) }; }
    }));
    podstrony.push(...paczka);
  }
  return {
    podstron: urls.length,
    daty_lastmod: [...new Set(daty)],
    boty_ai: Object.fromEntries(boty.map((b) => [b, rob.includes(b) ? 'wymieniony' : 'brak w robots.txt'])),
    za_dlugie_tytuly: podstrony.filter((p) => p.tytul_dl > 60).map((p) => ({ url: p.url, dl: p.tytul_dl })),
    za_dlugie_opisy: podstrony.filter((p) => p.opis_dl > 160).map((p) => ({ url: p.url, dl: p.opis_dl })),
    cienka_tresc: podstrony.filter((p) => p.slow && p.slow < 400).map((p) => ({ url: p.url, slow: p.slow })),
    podstrony,
  };
}

// ---------- SKLEJKA ----------
(async () => {
  // Tryb diagnostyczny: które właściwości widzi konto usługi
  if (arg('--uslugi')) {
    try {
      const u = await zbierzUslugi();
      console.log('KONTO USLUGI: ' + u.konto_uslugi);
      console.log('\nWIDOCZNE WLASCIWOSCI W SEARCH CONSOLE:');
      u.widoczne.forEach((w) => console.log(`  ${w.wlasciwosc}  (${w.uprawnienie})`));
      console.log('\nJesli brakuje strony: Search Console -> wybierz wlasciwosc -> Ustawienia ->');
      console.log('Uzytkownicy i uprawnienia -> Dodaj uzytkownika -> wklej adres konta uslugi wyzej,');
      console.log('uprawnienie "Pelny" -> potem: node tools/seo-dane.js --strona=<domena>');
    } catch (e) { console.log('BLAD: ' + e.message); }
    return;
  }

  const dane = { data: dzis, domena: DOMENA, zrodla: {} };
  const zrodla = [['gsc', zbierzGSC], ['bing', zbierzBing], ['ahrefs', zbierzAhrefs], ['strona', zbierzStrone]];
  for (const [nazwa, fn] of zrodla) {
    try { dane.zrodla[nazwa] = await fn(); }
    catch (e) { dane.zrodla[nazwa] = { blad: String(e.message).slice(0, 200) }; }
  }

  if (arg('--json')) { console.log(JSON.stringify(dane, null, 1)); return; }

  if (arg('--zapisz')) {
    const dir = path.join(process.cwd(), '.seo-przeglad', 'dane');
    fs.mkdirSync(dir, { recursive: true });
    const plik = path.join(dir, `${dzis}.json`);
    fs.writeFileSync(plik, JSON.stringify(dane, null, 1));
    console.log('ZAPISANO: ' + plik + '\n');
  }

  // Zwiezle podsumowanie dla czlowieka
  const g = dane.zrodla.gsc, a = dane.zrodla.ahrefs, s = dane.zrodla.strona, b = dane.zrodla.bing;
  console.log(`=== SEO simplefast.ai | ${dzis} ===\n`);
  if (g?.okresy) {
    console.log('TREND (Google):');
    for (const [k, v] of Object.entries(g.okresy)) {
      console.log(`  ${k.padEnd(6)} ${String(v.wyswietlenia).padStart(5)} wysw | ${String(v.klikniecia).padStart(3)} klik | CTR ${v.ctr}% | poz ${v.pozycja} | ${v.wysw_dziennie}/dzien`);
    }
    const s7 = g.okresy['7dni'], s28 = g.okresy['28dni'];
    if (s7 && s28) {
      const zmiana = ((s7.klik_dziennie / (s28.klik_dziennie || 1)) - 1) * 100;
      console.log(`  KIERUNEK: klikniecia/dzien ${zmiana >= 0 ? '+' : ''}${zmiana.toFixed(0)}% (7 dni vs 28 dni)`);
    }
    console.log(`\nPOTENCJAL (TOP10, CTR<3% = popraw tytul): ${g.potencjal?.length || 0} stron`);
    (g.potencjal || []).slice(0, 5).forEach((p) => console.log(`  ${p.url.padEnd(34)} ${p.wysw} wysw | CTR ${p.ctr}% | poz ${p.poz}`));
    console.log(`\nDRUGA STRONA (poz 11-20 = dopisz tresc): ${g.druga_strona?.length || 0} stron`);
    (g.druga_strona || []).slice(0, 5).forEach((p) => console.log(`  ${p.url.padEnd(34)} ${p.wysw} wysw | poz ${p.poz}`));
  } else console.log('GSC: ' + (g?.blad || 'brak danych'));

  if (a?.nasz_dr != null) {
    console.log(`\nSILA DOMEN: nasz DR ${a.nasz_dr} (${a.nasza_domena})`);
    console.log('  WG OBSZARU (kogo wyprzedzimy sama trescia):');
    for (const [klaster, v] of Object.entries(a.wg_klastra || {})) {
      console.log(`    ${klaster.padEnd(14)} slabsi: ${v.slabsi.join(', ') || 'brak'}`);
      if (v.mocniejsi.length) console.log(`    ${''.padEnd(14)} mocniejsi: ${v.mocniejsi.join(', ')}`);
    }
  }
  if (b?.suma_14dni) console.log(`\nBING (14 dni): ${b.suma_14dni.wyswietlenia} wysw | ${b.suma_14dni.klikniecia} klik`);
  if (s?.podstron) {
    console.log(`\nSTRONA: ${s.podstron} podstron | za dlugie tytuly: ${s.za_dlugie_tytuly.length} | za dlugie opisy: ${s.za_dlugie_opisy.length} | cienka tresc: ${s.cienka_tresc.length}`);
    const zablokowane = Object.entries(s.boty_ai).filter(([, v]) => v !== 'wymieniony').map(([k]) => k);
    console.log(`  boty AI bez wpisu w robots.txt: ${zablokowane.join(', ') || 'brak (wszystkie wymienione)'}`);
    console.log(`  daty w mapie witryny: ${s.daty_lastmod.join(', ') || 'brak'}`);
  }
})();
