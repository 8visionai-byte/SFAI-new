/**
 * POMIAR HERO / FOLD — realny Chrome przez CDP, zero nowych zaleznosci.
 * Sprawdza to, co jest blokerem: czy CALY H1 (maszyna pisania = element LCP)
 * miesci sie nad krawedzia pierwszego ekranu, i jak duzy jest przy tym blob.
 *
 * Uzycie: node scripts/pomiar-hero-fold.mjs <etykieta> [katalog-wyjscia]
 * Wymaga dzialajacego serwera na http://localhost:3000
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ETYKIETA = process.argv[2] ?? 'pomiar';
const OUT = process.argv[3] ?? process.cwd();
mkdirSync(OUT, { recursive: true });

const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9334;
const URL_STRONY = 'http://localhost:3000/';

/* Widoki z zadania: trzy laptopy (w tym najpopularniejszy 1366x768), duzy
   monitor, monitor 4:3-owaty oraz trzy telefony (w tym najwezszy 320px). */
const WIDOKI = [
  ['1920x1080', 1920, 1080, false],
  ['1440x1080', 1440, 1080, false],
  ['1440x900', 1440, 900, false],
  ['1366x768', 1366, 768, false],
  ['1280x800', 1280, 800, false],
  ['1024x768', 1024, 768, false], // próg lg: pas trójdzielny właśnie się włącza
  ['390x844', 390, 844, true],
  ['375x667', 375, 667, true],
  ['320x568', 320, 568, true],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=' + join(OUT, 'chrome-profil-fold'),
  'about:blank',
]);
let logChrome = '';
chrome.stderr.on('data', (d) => (logChrome += d.toString()));
chrome.stdout.on('data', (d) => (logChrome += d.toString()));

async function czekajNaDevTools() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(500);
  }
  throw new Error('DevTools nie wstalo. Log Chrome: ' + logChrome.slice(0, 800));
}

const POMIAR = `(() => {
  const q = (s) => document.querySelector(s);
  const prost = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x), y: Math.round(r.y),
      w: Math.round(r.width), h: Math.round(r.height),
      dol: Math.round(r.bottom),
    };
  };
  const w = {};
  w.viewport = { w: innerWidth, h: innerHeight };

  const flow = q('.flow-core.voice-aura');
  const slot = flow ? flow.parentElement : null;
  const cs = slot ? getComputedStyle(slot) : null;
  w.blob = {
    slot: prost(slot),
    marginesy: cs ? {
      gora: cs.marginTop, dol: cs.marginBottom,
      lewo: cs.marginLeft, prawo: cs.marginRight,
    } : null,
  };

  const h1 = q('h1');
  w.h1 = prost(h1);
  w.zapasPodH1 = h1 ? Math.round(innerHeight - h1.getBoundingClientRect().bottom) : null;
  w.h1WFoldzie = h1 ? h1.getBoundingClientRect().bottom <= innerHeight : null;

  w.overline = prost(q('.inf-overline'));

  // LEWE SKRZYDLO: cztery chipy z danymi (v10)
  const chipy = [...document.querySelectorAll('.inf-stat-chip')];
  w.chipy = chipy.map((el) => ({
    tekst: el.textContent.trim().replace(/\\s+/g, ' ').slice(0, 60),
    ...prost(el),
  }));
  const lista = chipy[0] ? chipy[0].parentElement : null;
  w.lewySkrzydlo = prost(lista ? lista.parentElement : null);
  w.listaChipow = prost(lista);
  w.chipStare = [...document.querySelectorAll('.inf-chip')].map((el) => ({
    tekst: el.textContent.trim().slice(0, 40), ...prost(el),
  }));

  // PRAWE SKRZYDLO: pasek licznikow rejestrow
  const licznik = q('.inf-counter');
  w.prawySkrzydlo = prost(licznik ? licznik.parentElement.parentElement : null);
  w.licznikPierwszy = prost(licznik);

  // Czy slupek chipow nie jest wyzszy niz blob (wtedy to ON rozpychalby rzad
  // i spychal H1 pod fold, mimo zmniejszonego bloba).
  const slotProst = slot ? slot.getBoundingClientRect() : null;
  w.rzad = slotProst && cs ? {
    blobZewn: Math.round(slotProst.height + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom)),
    chipySlupek: lista ? Math.round(lista.getBoundingClientRect().height) : null,
  } : null;

  w.poziomyScroll = {
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    jestScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  };
  return w;
})()`;

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
    const r = await send('Runtime.evaluate', {
      expression: wyr, returnByValue: true, awaitPromise: true,
    });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };

  await send('Page.enable');
  await send('Runtime.enable');

  const raport = { etykieta: ETYKIETA, kiedy: new Date().toISOString(), widoki: {} };

  for (const [nazwa, szer, wys, mobile] of WIDOKI) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: szer, height: wys, deviceScaleFactor: 1, mobile,
    });
    await send('Page.navigate', { url: URL_STRONY });
    await sleep(5000); // window.load + idle boot (VoiceAura, orkiestrator)
    raport.widoki[nazwa] = await ocen(POMIAR);
  }

  writeFileSync(join(OUT, `${ETYKIETA}-fold.json`), JSON.stringify(raport, null, 2), 'utf8');

  // Skrot do konsoli: blob, dolna krawedz H1, zapas do folda
  const linie = [];
  for (const [nazwa, d] of Object.entries(raport.widoki)) {
    linie.push(
      `${nazwa.padEnd(9)} blob ${String(d.blob.slot?.w ?? '?').padStart(4)}x${String(d.blob.slot?.h ?? '?').padStart(4)}` +
      `  H1 y=${String(d.h1?.y ?? '?').padStart(4)} dol=${String(d.h1?.dol ?? '?').padStart(4)}` +
      `  zapas=${String(d.zapasPodH1).padStart(5)}  wFoldzie=${d.h1WFoldzie}` +
      `  hScroll=${d.poziomyScroll.jestScroll}` +
      `  chipy=${d.listaChipow ? d.listaChipow.w + 'x' + d.listaChipow.h : '-'}` +
      `  rzad(blob/chipy)=${d.rzad ? d.rzad.blobZewn + '/' + d.rzad.chipySlupek : '-'}`
    );
  }
  console.log(linie.join('\n'));
  console.log('\nJSON: ' + join(OUT, `${ETYKIETA}-fold.json`));

  await wyslij('Browser.close').catch(() => {});
  chrome.kill();
};

main().catch((e) => {
  console.error('BLAD:', e);
  chrome.kill();
  process.exit(1);
});
