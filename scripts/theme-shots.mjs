// Captures the site in light mode (desktop full page, key viewports, mobile) into .impeccable/review/
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".impeccable/review";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + "/", { waitUntil: "networkidle2" });
await p.evaluate(() => localStorage.setItem("theme", "light"));
await p.reload({ waitUntil: "networkidle2" });
await wait(1800);
await p.mouse.move(1000, 400, { steps: 6 });
await wait(600);
await p.screenshot({ path: `${OUT}/light-hero.png` });
for (const id of ["realisations", "services", "tarifs", "contact"]) {
  await p.evaluate((s) => window.scrollTo(0, document.getElementById(s).offsetTop - 73), id);
  await wait(1700);
  await p.screenshot({ path: `${OUT}/light-${id}.png` });
}
const m = await b.newPage();
await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await m.goto(BASE + "/", { waitUntil: "networkidle2" });
await wait(1800);
await m.screenshot({ path: `${OUT}/light-mobile.png` });
console.log("theme attr:", await m.evaluate(() => document.documentElement.dataset.theme), "width", await m.evaluate(() => document.documentElement.scrollWidth));
await b.close();
