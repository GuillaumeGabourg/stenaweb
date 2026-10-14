// Renders the hero with alternative title fonts (injected for the screenshot only) to compare them.
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] ?? "http://localhost:3000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fonts = [
  { slug: "instrument", family: null },
  { slug: "playfair", family: "Playfair Display", q: "Playfair+Display:ital,wght@0,500;1,500", weight: 500 },
  { slug: "calistoga", family: "Calistoga", q: "Calistoga:ital@0;1", weight: 400 },
];
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const f of fonts) {
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(BASE + "/", { waitUntil: "networkidle2" });
  if (f.family) {
    await p.addStyleTag({ url: `https://fonts.googleapis.com/css2?family=${f.q}&display=swap` });
    await p.addStyleTag({ content: `h1,h2,.font-display{font-family:"${f.family}",serif!important;font-weight:${f.weight}!important;letter-spacing:-0.02em!important}` });
    await p.evaluate(() => document.fonts.ready);
  }
  await wait(2500);
  await p.screenshot({ path: `.impeccable/review/font-${f.slug}.png`, clip: { x: 0, y: 0, width: 1440, height: 760 } });
  await p.close();
  console.log("ok", f.slug);
}
await b.close();
