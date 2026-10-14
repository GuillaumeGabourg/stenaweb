// Captures the interactive effects (hover states, loops) at desktop and mobile sizes into .impeccable/review/
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".impeccable/review";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle2" });
await wait(1800);
await page.mouse.move(1000, 420, { steps: 8 });
await wait(900);
await page.screenshot({ path: `${OUT}/fx-hero.png` });

const shot = async (name, sel, hoverSel, ms = 1200) => {
  await page.evaluate((s) => window.scrollTo(0, document.querySelector(s).getBoundingClientRect().top + window.scrollY - 80), sel);
  await wait(1000);
  if (hoverSel) {
    const el = await page.$(hoverSel);
    const b = await el.boundingBox();
    await page.mouse.move(b.x + b.width * 0.6, b.y + b.height * 0.35, { steps: 6 });
  }
  await wait(ms);
  await page.screenshot({ path: `${OUT}/${name}.png` });
};
await shot("fx-work", "#realisations", "#realisations li:nth-child(2) article", 3500);
await shot("fx-services", "#services", "#services li:nth-child(1)", 2500);
await shot("fx-services-2", "#services li:nth-child(3)", null, 3200);
await shot("fx-pricing", "#tarifs", "#tarifs article", 1200);

const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await m.goto(BASE + "/", { waitUntil: "networkidle2" });
await wait(2200);
await m.screenshot({ path: `${OUT}/fx-mobile-hero.png` });
await m.evaluate(() => window.scrollTo(0, 800));
await wait(1500);
await m.screenshot({ path: `${OUT}/fx-mobile-2.png` });
const w = await m.evaluate(() => document.documentElement.scrollWidth);
console.log("mobile scrollWidth", w);
await browser.close();
