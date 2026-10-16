// The /realisations page and the trimmed home sections, desktop + mobile.
import puppeteer from "puppeteer-core";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const [w, h, mob] of [[1440, 900, false], [390, 844, true]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob });
  await p.goto("http://localhost:3000/realisations", { waitUntil: "networkidle2" });
  for (const [n, y] of [["a", 0], ["b", 820], ["c", 9999]]) {
    await p.evaluate((y) => window.scrollTo({ top: y === 9999 ? document.body.scrollHeight - 1700 : y, behavior: "instant" }), y);
    await wait(2000);
    await p.screenshot({ path: `.impeccable/review/real-${n}-${w}.png` });
  }
  if (mob) console.log("mobile width", await p.evaluate(() => document.documentElement.scrollWidth));
  await p.close();
}
await b.close();
