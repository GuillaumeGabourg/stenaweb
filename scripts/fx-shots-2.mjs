// Captures the round-2 effects: pricing, FAQ, contact form states, dot field over the page.
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".impeccable/review";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle2" });
await wait(1500);
await page.mouse.move(1150, 330, { steps: 6 });
await wait(800);
await page.screenshot({ path: `${OUT}/r2-hero.png` });

const go = async (sel) => {
  await page.evaluate((s) => window.scrollTo(0, document.querySelector(s).getBoundingClientRect().top + window.scrollY - 80), sel);
  await wait(1600);
};
await go("#tarifs");
await page.mouse.move(700, 600, { steps: 6 });
await wait(900);
await page.screenshot({ path: `${OUT}/r2-pricing.png` });

await go("#faq");
await page.mouse.move(300, 700, { steps: 6 });
await wait(700);
await page.screenshot({ path: `${OUT}/r2-faq.png` });

await go("#contact");
await page.type("#name", "Jean Test");
await page.type("#email", "jean@exemple.fr");
await page.click("#email");
await wait(600);
await page.screenshot({ path: `${OUT}/r2-contact-typing.png` });
await page.type("#message", "Plombier à Laval, je veux un site.");
const chips = await page.$$("fieldset label");
await chips[2].click();
await wait(700);
await page.screenshot({ path: `${OUT}/r2-contact-ready.png` });
await page.click("button[type=submit]");
await wait(2200);
await page.screenshot({ path: `${OUT}/r2-contact-sent.png` });
await browser.close();
console.log("done");
