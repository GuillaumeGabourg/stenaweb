// Captures sections by id at desktop and mobile widths (instant scroll), e.g. node scripts/round-shots.mjs tarifs zone
import puppeteer from "puppeteer-core";
const ids = process.argv.slice(2);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const [w, h, mob] of [[1440, 900, false], [390, 844, true]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
  for (const id of ids) {
    await p.evaluate((s) => window.scrollTo({ top: document.getElementById(s).offsetTop - 73, behavior: "instant" }), id);
    await wait(3000);
    await p.screenshot({ path: `.impeccable/review/r-${id}-${w}.png` });
  }
  if (mob) console.log("mobile width", await p.evaluate(() => document.documentElement.scrollWidth));
  await p.close();
}
await b.close();
