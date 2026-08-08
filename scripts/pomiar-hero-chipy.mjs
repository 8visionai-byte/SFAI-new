/**
 * DOWOD WIZUALNY I BEHAWIORALNY dla chipow hero (v10 §2) — realny Chrome (CDP).
 *  1. zrzut hero na 1366x768 i 1440x900 (pierwszy ekran 1:1, bez przewijania),
 *  2. probkowanie tekstu licznika chipa „8,7%" — czy naprawde odlicza od zera,
 *  3. bramka prefers-reduced-motion — liczba ma stac,
 *  4. bramka mobile — liczba ma stac,
 *  5. pauza poza kadrem — po zjechaniu w dol i powrocie licznik gra od nowa,
 *  6. kolory i kontrast policzone na SKOMPONOWANYM tle chipa.
 *
 * Uzycie: node scripts/pomiar-hero-chipy.mjs <etykieta> [katalog-wyjscia]
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ETYKIETA = process.argv[2] ?? 'chipy';
const OUT = process.argv[3] ?? process.cwd();
mkdirSync(OUT, { recursive: true });

const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9335;
const URL_STRONY = 'http://localhost:3000/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=' + join(OUT, 'chrome-profil-chipy'),
  'about:blank',
]);
let logChrome = '';
chrome.stderr.on('data', (d) => (logChrome += d.toString()));

async function czekajNaDevTools() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(500);
  }
  throw new Error('DevTools nie wstalo: ' + logChrome.slice(0, 600));
}

const main = async () => {
  const wersja = await czekajNaDevTools();
  const ws = new WebSocket(wersja.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));

  let id = 0;
  const oczekujace = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && oczekujace.has(msg.id)) {
      const { res, rej } = oczekujace.get(msg.id);
      oczekujace.delete(msg.id);
      msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
    }
  });
  const wyslij = (method, params = {}, sessionId) =>
    new Promise((res, rej) => {
      const mid = ++id;
      oczekujace.set(mid, { res, rej });
      ws.send(JSON.stringify({ id: mid, method, params, ...(sessionId ? { sessionId } : {}) }));
    });

  const { targetId } = await wyslij('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await wyslij('Target.attachToTarget', { targetId, flatten: true });
  const send = (m, p) => wyslij(m, p, sessionId);
  const ocen = async (wyr) => {
    const r = await send('Runtime.evaluate', { expression: wyr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  await send('Page.enable');
  await send('Runtime.enable');

  const raport = { etykieta: ETYKIETA, kiedy: new Date().toISOString() };
  const CZYTAJ = `(() => { const el = document.querySelector('.inf-stat-chip .inf-counter-value');
    return el ? el.textContent : null; })()`;

  /* ── 1+2. DESKTOP 1440x900: probkowanie licznika od pierwszej klatki ─────── */
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: URL_STRONY });
  const probki = [];
  for (let i = 0; i < 90; i++) {
    const t = await ocen(CZYTAJ).catch(() => null);
    if (t && (probki.length === 0 || probki[probki.length - 1] !== t)) probki.push(t);
    await sleep(60);
  }
  raport.licznikDesktop = { probki, ile: probki.length, pierwsza: probki[0], ostatnia: probki[probki.length - 1] };

  /* ── 6. Kolory + kontrast na skomponowanym tle ───────────────────────────── */
  raport.chipy = await ocen(`(() => {
    const doLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const lum = ([r, g, b]) => 0.2126 * doLin(r) + 0.7152 * doLin(g) + 0.0722 * doLin(b);
    /* UWAGA: color-mix daje w getComputedStyle skladnie color(srgb 0 0.94 1 / .08),
       gdzie kanaly sa w 0-1, a nie 0-255. Bez tej gatki kontrast liczyl sie na
       tle prawie czarnym i wychodzil ZA DOBRY. */
    const rgb = (s) => {
      const n = (s.match(/[\\d.]+(?=%)?/g) || []).map(Number);
      if (/^color\\(/.test(s)) {
        const [r, g, b, a] = n;
        return a === undefined ? [r * 255, g * 255, b * 255] : [r * 255, g * 255, b * 255, a];
      }
      return n.slice(0, 4);
    };
    const naTle = (przod, tlo) => {
      const a = przod.length > 3 ? przod[3] : 1;
      return [0, 1, 2].map((i) => przod[i] * a + tlo[i] * (1 - a));
    };
    const kontrast = (a, b) => { const l1 = lum(a), l2 = lum(b);
      return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100; };
    const bazaStr = getComputedStyle(document.body).backgroundColor;
    const baza = rgb(bazaStr).length >= 3 ? rgb(bazaStr).slice(0, 3) : [6, 6, 12];
    return [...document.querySelectorAll('.inf-stat-chip')].map((chip) => {
      const cs = getComputedStyle(chip);
      const tlo = naTle(rgb(cs.backgroundColor), baza);
      const val = chip.querySelector('.inf-counter-value');
      const opis = chip.querySelector('.inf-stat-chip-opis');
      const zrodlo = chip.querySelector('.inf-stat-chip-zrodlo');
      const csv = getComputedStyle(val), cso = getComputedStyle(opis), csz = getComputedStyle(zrodlo);
      return {
        tekst: chip.textContent.trim().replace(/\\s+/g, ' '),
        tloChipa: tlo.map((n) => Math.round(n)),
        liczba: { tekst: val.textContent, kolor: csv.color, px: csv.fontSize, waga: csv.fontWeight,
                  glow: csv.textShadow, kontrast: kontrast(rgb(csv.color).slice(0, 3), tlo) },
        opis: { kolor: cso.color, px: cso.fontSize, kontrast: kontrast(rgb(cso.color).slice(0, 3), tlo) },
        zrodlo: { tekst: zrodlo.textContent.trim(), pelna: zrodlo.querySelector('abbr') ? zrodlo.querySelector('abbr').title : null,
                  kolor: csz.color, px: csz.fontSize, kontrast: kontrast(rgb(csz.color).slice(0, 3), tlo) },
        ramka: cs.borderColor, halo: cs.boxShadow,
      };
    });
  })()`);

  /* ── 5. Pauza poza kadrem: zjazd w dol, powrot, licznik gra od nowa ──────── */
  await send('Input.synthesizeScrollGesture', { x: 720, y: 450, yDistance: -2200, speed: 8000, gestureSourceType: 'mouse' });
  await sleep(1500);
  raport.pozaKadrem = await ocen(CZYTAJ);
  await send('Input.synthesizeScrollGesture', { x: 720, y: 450, yDistance: 2400, speed: 8000, gestureSourceType: 'mouse' });
  const powrot = [];
  for (let i = 0; i < 30; i++) {
    const t = await ocen(CZYTAJ).catch(() => null);
    if (t && (powrot.length === 0 || powrot[powrot.length - 1] !== t)) powrot.push(t);
    await sleep(60);
  }
  raport.poPowrocie = { probki: powrot, ile: powrot.length };

  /* ── ZRZUTY pierwszego ekranu (dowod wizualny) ───────────────────────────── */
  const zrzucFold = async (nazwa, szer, wys, mobile) => {
    await send('Emulation.setDeviceMetricsOverride', { width: szer, height: wys, deviceScaleFactor: 1, mobile });
    await send('Page.navigate', { url: URL_STRONY });
    await sleep(5000);
    const z = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: szer, height: wys, scale: 1 } });
    writeFileSync(join(OUT, `${ETYKIETA}-${nazwa}.png`), Buffer.from(z.data, 'base64'));
  };
  await zrzucFold('fold-1366x768', 1366, 768, false);
  await zrzucFold('fold-1440x900', 1440, 900, false);
  await zrzucFold('fold-390x844', 390, 844, true);

  /* ── 3. Bramka reduced-motion ────────────────────────────────────────────── */
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: URL_STRONY });
  const rm = [];
  for (let i = 0; i < 25; i++) {
    const t = await ocen(CZYTAJ).catch(() => null);
    if (t && (rm.length === 0 || rm[rm.length - 1] !== t)) rm.push(t);
    await sleep(60);
  }
  raport.reducedMotion = { probki: rm, stoi: rm.length === 1 && rm[0] === '8,7%' };
  await send('Emulation.setEmulatedMedia', { features: [] });

  /* ── 4. Bramka mobile ────────────────────────────────────────────────────── */
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: URL_STRONY });
  const mob = [];
  for (let i = 0; i < 25; i++) {
    const t = await ocen(CZYTAJ).catch(() => null);
    if (t && (mob.length === 0 || mob[mob.length - 1] !== t)) mob.push(t);
    await sleep(60);
  }
  raport.mobile = { probki: mob, stoi: mob.length === 1 && mob[0] === '8,7%' };

  writeFileSync(join(OUT, `${ETYKIETA}-chipy.json`), JSON.stringify(raport, null, 2), 'utf8');
  console.log(JSON.stringify({
    licznikDesktop: raport.licznikDesktop,
    pozaKadrem: raport.pozaKadrem,
    poPowrocie: raport.poPowrocie,
    reducedMotion: raport.reducedMotion,
    mobile: raport.mobile,
    chipy: raport.chipy,
  }, null, 2));

  await wyslij('Browser.close').catch(() => {});
  chrome.kill();
};

main().catch((e) => { console.error('BLAD:', e); chrome.kill(); process.exit(1); });
