import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const BASE = 'http://localhost:5173';
const OUT = 'C:/Users/kal256/AppData/Local/Temp';
const ROUTES = [
  ['home', '/'],
  ['work', '/work'],
  ['case', '/work/kali-game-store'],
  ['about', '/about'],
  ['experience', '/experience'],
  ['skills', '/skills'],
  ['notes', '/notes'],
  ['note', '/notes/loading-states-are-the-design'],
  ['contact', '/contact'],
  ['404', '/nope'],
];

const chrome = spawn(CHROME, [
  '--headless=new',
  '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=C:/Users/kal256/AppData/Local/Temp/cdp-profile',
  '--window-size=1440,900',
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('devtools not ready');
}

const wsUrl = await getWsUrl();
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
  }
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
    errors.push(msg.params.args.map((a) => a.value ?? a.description).join(' '));
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const i = ++id;
    pending.set(i, resolve);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

async function shot(name) {
  const { result } = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${OUT}/shot-${name}.png`, Buffer.from(result.data, 'base64'));
}

await send('Page.enable');
await send('Runtime.enable');

const viewports = [
  { tag: 'd', width: 1440, height: 900, mobile: false },
  { tag: 'm', width: 390, height: 844, mobile: true },
];

for (const vp of viewports) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: vp.mobile,
  });
  for (const [name, path] of ROUTES) {
    await send('Page.navigate', { url: BASE + path });
    await sleep(name === 'home' ? 6500 : 2600);
    if (vp.tag === 'd' || name === 'home' || name === 'work' || name === 'case') {
      await send('Runtime.evaluate', {
        expression: 'window.scrollTo(0, Math.min(600, document.body.scrollHeight - innerHeight))',
      });
      await sleep(1200);
    }
    const dims = await send('Runtime.evaluate', {
      expression: 'JSON.stringify({w:document.documentElement.scrollWidth,vw:innerWidth,h:document.body.scrollHeight})',
      returnByValue: true,
    });
    console.log(`${vp.tag} ${name}`, dims.result.result.value);
    await shot(`${vp.tag}-${name}`);
  }
}

console.log('ERRORS', JSON.stringify(errors.slice(0, 10), null, 1));
ws.close();
chrome.kill();
process.exit(0);
