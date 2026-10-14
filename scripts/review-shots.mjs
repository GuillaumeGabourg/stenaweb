// Captures review evidence of stenaweb.fr itself into .impeccable/review/
// Usage: node scripts/review-shots.mjs [baseUrl]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".impeccable/review";
mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--enable-webgl", "--ignore-gpu-blocklist"] });

async function capture(name, viewport, path = "/") {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  // Full-page evidence: reduced motion settles every entrance and pin into its static layout.
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(BASE + path, { waitUntil: "networkidle2" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await wait(1200);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  await page.close();
  console.log("ok", name);
}

async function firstViewport(name, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(BASE + "/", { waitUntil: "networkidle2" });
  await wait(1500); // entrance
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await page.close();
  console.log("ok", name);
}

await capture("desktop", { width: 1440, height: 900 });
await capture("mobile", { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await capture("case-desktop", { width: 1440, height: 900 }, "/projets/hk-conseil");
await firstViewport("hero-desktop", { width: 1440, height: 900 });
await firstViewport("hero-mobile", { width: 390, height: 844, isMobile: true, hasTouch: true });
await browser.close();
