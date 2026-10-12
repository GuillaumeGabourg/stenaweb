// Captures the portfolio sites (desktop + mobile + full page) into public/projects/<slug>/
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SITES = {
  "hk-conseil": "https://guillaumegabourg.github.io/m/hk-conseil-d8a9d364/",
  "opti-maintenance": "https://guillaumegabourg.github.io/opti-maintenance-site/index.html",
  "pc-assist": "https://pc-assist72.netlify.app/",
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function primeReveals(page) {
  // Scroll the whole page so IntersectionObserver reveals fire, then return to top.
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await wait(1800);
  await page.addStyleTag({ content: "[class*='netlify'],#netlify-badge{display:none!important}" });
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
for (const [slug, url] of Object.entries(SITES)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await primeReveals(page);
  await page.screenshot({ path: `public/projects/${slug}/desktop.png` });
  await page.screenshot({ path: `public/projects/${slug}/full.png`, fullPage: true });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await primeReveals(page);
  await page.screenshot({ path: `public/projects/${slug}/mobile.png` });
  await page.close();
  console.log("ok", slug);
}
await browser.close();
