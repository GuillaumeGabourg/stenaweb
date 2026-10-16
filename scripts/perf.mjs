// Frame rate and main-thread time on a throttled CPU (simulates a modest laptop), while the mouse moves and the page scrolls.
// node scripts/perf.mjs [throttle=4] [theme=dark|light]
import puppeteer from "puppeteer-core";
const throttle = Number(process.argv[2] ?? 4);
const theme = process.argv[3] ?? "dark";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--enable-gpu-rasterization"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument((t) => { try { localStorage.setItem("theme", t); sessionStorage.removeItem("lite"); } catch {} }, theme);
await p.goto(`${process.env.BASE ?? "http://localhost:3000"}/`, { waitUntil: "networkidle2" });
await wait(1500);
const cdp = await p.createCDPSession();
await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle });
await cdp.send("Performance.enable");
const before = (await cdp.send("Performance.getMetrics")).metrics;
await p.evaluate(() => {
  window.__f = 0; window.__long = 0;
  const c = (t) => { window.__f++; requestAnimationFrame(c); };
  requestAnimationFrame(c);
  new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__long += e.duration))).observe({ type: "longtask" });
});
const t0 = Date.now();
for (let k = 0; k < 60; k++) {
  await p.mouse.move(200 + ((k * 37) % 1000), 200 + ((k * 23) % 500));
  if (k % 4 === 0) await p.evaluate(() => window.scrollBy(0, 220));
  await wait(50);
}
const secs = (Date.now() - t0) / 1000;
const r = await p.evaluate(() => ({ f: window.__f, long: window.__long, lite: document.documentElement.classList.contains("lite") }));
const after = (await cdp.send("Performance.getMetrics")).metrics;
const m = (n, a) => a.find((x) => x.name === n).value;
console.log(JSON.stringify({ throttle, theme, fps: +(r.f / secs).toFixed(1), longTaskMs: Math.round(r.long), scriptMs: Math.round((m("ScriptDuration", after) - m("ScriptDuration", before)) * 1000), layoutMs: Math.round((m("LayoutDuration", after) - m("LayoutDuration", before)) * 1000), styleMs: Math.round((m("RecalcStyleDuration", after) - m("RecalcStyleDuration", before)) * 1000), lite: r.lite }));
await b.close();
