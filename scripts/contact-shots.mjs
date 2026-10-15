// Hero, contact, footer, mobile sticky bar and mobile menu, desktop + mobile.
import puppeteer from "puppeteer-core";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const [w, h, mob] of [[1440, 900, false], [390, 844, true]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
  await wait(2500);
  await p.screenshot({ path: `.impeccable/review/c-hero-${w}.png` });
  await p.evaluate(() => window.scrollTo({ top: document.getElementById("contact").offsetTop - 73, behavior: "instant" }));
  await wait(2500);
  await p.screenshot({ path: `.impeccable/review/c-contact-${w}.png` });
  await p.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await wait(1500);
  await p.screenshot({ path: `.impeccable/review/c-footer-${w}.png` });
  if (mob) {
    await p.evaluate(() => window.scrollTo({ top: 2000, behavior: "instant" }));
    await wait(1500);
    await p.screenshot({ path: `.impeccable/review/c-sticky-${w}.png` });
    await p.click('button[aria-controls="menu"]');
    await wait(800);
    await p.screenshot({ path: `.impeccable/review/c-menu-${w}.png` });
    console.log("mobile width", await p.evaluate(() => document.documentElement.scrollWidth));
  }
  await p.close();
}
await b.close();
