/**
 * seo-monitor.js — cotygodniowy strażnik SEO simplefast.ai (system naprawczy, 2026-10-14).
 *
 * Uzycie (w folderze repo):
 *   node tools/seo-monitor.js            -> raport na ekran
 *   node tools/seo-monitor.js --zapisz   -> dodatkowo .seo-przeglad/monitor/<data>.md
 *   node tools/seo-monitor.js --indeks   -> dodatkowo stan indeksu kluczowych adresow (URL Inspection)
 *
 * Co robi:
 *  1. Porownuje ostatnie 7 dni z poprzednimi 7 dniami (Google Search Console, dataState=all).
 *  2. Liczy wyswietlenia, klikniecia i pozycje dla grup stron i galezi fraz pienieznych.
 *  3. Pilnuje STRON CHRONIONYCH (te, ktore rosna). Gdy ktoras traci > 40% wyswietlen
 *     albo pozycje o > 3 miejsca, wypisuje ALARM i podpowiedz cofniecia.
 *
 * Klucz GSC czytany z ~/.sekrety, NIGDY nie drukowany. Czysty Node 18+, zero zaleznosci.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const KLUCZ = path.join(os.homedir(), '.sekrety', 'simplefastai-seo-e271ff1f5e28.json');
const SITE = 'https://www.simplefast.ai';
const SITE_GSC = 'sc-domain:simplefast.ai';
const arg = (n) => process.argv.includes(n);
const dzien = (d) => new Date(Date.now() - d * 86400000).toISOString().slice(0, 10);
const DZIS = dzien(0);

// Okna: dane GSC maja 1-2 dni opoznienia, wiec konczymy przedwczoraj.
const TERAZ = { od: dzien(8), do: dzien(2) };
const WCZESNIEJ = { od: dzien(15), do: dzien(9) };

const GRUPY_STRON = [
  ['strona glowna', (u) => u === '/' || u === ''],
  ['agenci-ai (fala 1)', (u) => u === '/uslugi/agenci-ai'],
  ['wdrozenie-ai (fala 1)', (u) => u === '/uslugi/wdrozenie-ai'],
  ['chatboty rodzic', (u) => u === '/uslugi/chatboty'],
  ['chatboty cennik', (u) => u === '/uslugi/chatboty/cennik'],
  ['chatboty pozostale', (u) => u.startsWith('/uslugi/chatboty/') && u !== '/uslugi/chatboty/cennik'],
  ['voiceboty rodzic', (u) => u === '/uslugi/voiceboty'],
  ['voiceboty cennik', (u) => u === '/uslugi/voiceboty/cennik'],
  ['voiceboty pozostale', (u) => u.startsWith('/uslugi/voiceboty/') && u !== '/uslugi/voiceboty/cennik'],
  ['automatyzacje', (u) => u === '/uslugi/automatyzacje'],
  ['audyt-ai', (u) => u === '/uslugi/audyt-ai'],
  ['dokumenty-faktury', (u) => u === '/uslugi/dokumenty-faktury'],
  ['optymalizacja (GEO)', (u) => u.startsWith('/uslugi/optymalizacja')],
  ['poradniki', (u) => u.startsWith('/poradniki')],
  ['blog', (u) => u.startsWith('/blog')],
];

const GALEZIE = [
  ['chatboty', /chat ?bot|czatbot/i],
  ['voiceboty', /voice ?bot|bot telefon|odbieran.*telefon|asystent (g[lł]osow|telefoniczn)/i],
  ['automatyzacje', /automatyz|\brpa\b|\bn8n\b|make\.com/i],
  ['agenci AI', /agent(a|ów|ow|y|i)? ai|ai agent|agenci ai/i],
  ['wdrozenie AI', /wdro[zż].*\b(ai|sztuczn)|wdra[zż].*\b(ai|sztuczn)|ai dla firm|ai w firmie|sztuczna inteligencja dla firm/i],
  ['audyt AI', /audyt ai/i],
];

// Strony chronione: rosna, nie wolno ich przebudowywac. Alarm, gdy spadaja.
const CHRONIONE = [
  { strona: '/uslugi/voiceboty', fraza: 'bot telefoniczny' },
  { strona: '/uslugi/chatboty', fraza: 'chatbot dla firmy' },
  { strona: '/uslugi/voiceboty/potwierdzanie-wizyt', fraza: 'voicebot do potwierdzania wizyt' },
  { strona: '/', fraza: null },
  { strona: '/uslugi/automatyzacje', fraza: 'automatyzacja procesów ai' },
  { strona: '/uslugi/optymalizacja/perplexity', fraza: null },
];

const DO_INDEKSU = [
  '/uslugi/agenci-ai', '/uslugi/wdrozenie-ai', '/poradniki/ile-kosztuje-wdrozenie-ai-agenta-dla-firmy',
  '/uslugi/automatyzacje', '/uslugi/audyt-ai', '/uslugi/chatboty', '/uslugi/voiceboty/cennik',
];

function b64url(o) { return Buffer.from(JSON.stringify(o)).toString('base64url'); }
async function token() {
  const k = JSON.parse(fs.readFileSync(KLUCZ, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const body = `${b64url({ alg: 'RS256', typ: 'JWT' })}.${b64url({
    iss: k.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`;
  const s = crypto.createSign('RSA-SHA256'); s.update(body);
  const jwt = `${body}.${s.sign(k.private_key, 'base64url')}`;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  const j = await r.json();
  if (!j.access_token) throw new Error('brak tokenu GSC');
  return j.access_token;
}
async function zapytaj(t, body) {
  const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_GSC)}/searchAnalytics/query`,
    { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${t}` }, body: JSON.stringify({ dataState: 'all', rowLimit: 25000, ...body }) });
  if (!r.ok) throw new Error(`GSC HTTP ${r.status}`);
  return (await r.json()).rows || [];
}
const sciezka = (u) => u.replace(SITE, '').replace(/\/$/, '') || '/';
function suma(rows) {
  const w = rows.reduce((s, r) => s + r.impressions, 0);
  const k = rows.reduce((s, r) => s + r.clicks, 0);
  const p = w ? rows.reduce((s, r) => s + r.position * r.impressions, 0) / w : 0;
  return { w, k, p: +p.toFixed(1) };
}
const zmiana = (a, b) => (b.w ? `${a.w - b.w >= 0 ? '+' : ''}${Math.round(((a.w - b.w) / b.w) * 100)}%` : (a.w ? 'nowe' : '0'));
const fmtP = (x) => (x.w ? String(x.p).replace('.', ',') : '-');

async function main() {
  const t = await token();
  const [pqT, pqW] = await Promise.all([
    zapytaj(t, { startDate: TERAZ.od, endDate: TERAZ.do, dimensions: ['page', 'query'] }),
    zapytaj(t, { startDate: WCZESNIEJ.od, endDate: WCZESNIEJ.do, dimensions: ['page', 'query'] }),
  ]);
  const [pT, pW] = await Promise.all([
    zapytaj(t, { startDate: TERAZ.od, endDate: TERAZ.do, dimensions: ['page'] }),
    zapytaj(t, { startDate: WCZESNIEJ.od, endDate: WCZESNIEJ.do, dimensions: ['page'] }),
  ]);
  const wiersz = (rows, f) => rows.filter((r) => f(sciezka(r.keys[0])));
  const L = [];
  L.push(`# Monitor SEO simplefast.ai, ${DZIS}`, '');
  L.push(`Okno: ${TERAZ.od} do ${TERAZ.do} vs ${WCZESNIEJ.od} do ${WCZESNIEJ.do} (GSC, dane wstepne wliczone).`, '');
  const cT = suma(pT), cW = suma(pW);
  L.push(`**Cala strona:** ${cT.w} wyswietlen (${zmiana(cT, cW)}), ${cT.k} klikniec (bylo ${cW.k}), pozycja ${fmtP(cT)} (byla ${fmtP(cW)}).`, '');

  L.push('## Grupy stron', '', '| Grupa | Wysw. teraz | Zmiana | Klik. | Poz. teraz | Poz. wczesniej |', '|---|---|---|---|---|---|');
  for (const [n, f] of GRUPY_STRON) {
    const a = suma(wiersz(pT, f)), b = suma(wiersz(pW, f));
    L.push(`| ${n} | ${a.w} | ${zmiana(a, b)} | ${a.k} | ${fmtP(a)} | ${fmtP(b)} |`);
  }
  L.push('', '## Galezie fraz pienieznych', '', '| Galaz | Wysw. teraz | Zmiana | Klik. | Poz. teraz | Poz. wczesniej | Najwieksza fraza |', '|---|---|---|---|---|---|---|');
  for (const [n, re] of GALEZIE) {
    const rt = pqT.filter((r) => re.test(r.keys[1])), rw = pqW.filter((r) => re.test(r.keys[1]));
    const a = suma(rt), b = suma(rw);
    const top = rt.sort((x, y) => y.impressions - x.impressions)[0];
    L.push(`| ${n} | ${a.w} | ${zmiana(a, b)} | ${a.k} | ${fmtP(a)} | ${fmtP(b)} | ${top ? `${top.keys[1]} (${top.impressions} @ ${top.position.toFixed(1).replace('.', ',')})` : '-'} |`);
  }

  L.push('', '## Strony chronione (alarm przy spadku)', '');
  let alarmy = 0;
  for (const c of CHRONIONE) {
    const f = (r) => sciezka(r.keys[0]) === c.strona && (!c.fraza || r.keys[1].toLowerCase().includes(c.fraza));
    const a = suma(pqT.filter(f)), b = suma(pqW.filter(f));
    const spadekW = b.w >= 20 && a.w < b.w * 0.6;
    const spadekP = b.w >= 10 && a.w && a.p - b.p > 3;
    const alarm = spadekW || spadekP;
    if (alarm) alarmy++;
    L.push(`- ${alarm ? '**ALARM**' : 'ok'}: ${c.strona}${c.fraza ? ` na „${c.fraza}"` : ''}: ${a.w} wysw. @ ${fmtP(a)} (bylo ${b.w} @ ${fmtP(b)})`);
  }
  if (alarmy) {
    L.push('', '**Co zrobic przy alarmie:** sprawdz w `git log`, co zmienilo sie na tej stronie w ostatnich 14 dniach. Jesli spadek zbiega sie z nasza zmiana, cofnij tylko te zmiane (`git revert <commit>`), nie cala fale. Szybkie cofniecie calej strony: Vercel → Deployments → poprzednie wdrozenie → Promote to Production. Jedna zla doba to szum: alarm traktuj powaznie dopiero, gdy powtorzy sie w dwoch kolejnych odczytach.');
  }

  if (arg('--indeks')) {
    L.push('', '## Stan indeksu kluczowych adresow', '');
    for (const p of DO_INDEKSU) {
      try {
        const r = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${t}` },
          body: JSON.stringify({ inspectionUrl: SITE + p, siteUrl: SITE_GSC, languageCode: 'pl' }),
        });
        const j = await r.json();
        const s = j.inspectionResult && j.inspectionResult.indexStatusResult;
        L.push(`- ${p}: ${s ? `${s.coverageState || '?'}; ostatnie pobranie ${s.lastCrawlTime ? s.lastCrawlTime.slice(0, 10) : 'brak'}` : `blad ${r.status}`}`);
      } catch (e) { L.push(`- ${p}: blad ${e.message}`); }
    }
  }

  const tekst = L.join('\n');
  console.log(tekst);
  if (arg('--zapisz')) {
    const dir = path.join(__dirname, '..', '.seo-przeglad', 'monitor');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${DZIS}.md`), tekst + '\n');
    console.log(`\nZapisano: .seo-przeglad/monitor/${DZIS}.md`);
  }
}
main().catch((e) => { console.error('BLAD:', e.message); process.exit(1); });
