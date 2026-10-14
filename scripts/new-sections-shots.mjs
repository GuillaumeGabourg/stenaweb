// Captures the sections added from the ui-ux-pro-max review (desktop dark + light, mobile).
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = ".impeccable/review";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const shoot = async (page, prefix) => {
  for (const sel of ["#realisations ~ div", "#etapes", "#zone", "#tarifs"]) {
    await page.evaluate((s) => {
      const el = s === "#realisations ~ div" ? document.querySelector("#realisations").nextElementSibling : document.querySelector(s);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - (s === "#tarifs" ? 420 : 90));
    }, sel);
    await wait(3200);
    await page.screenshot({ path: `${OUT}/${prefix}-${sel.replace(/[^a-z]/g, "") || "cta"}.png` });
  }
};
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + "/", { waitUntil: "networkidle2" });
await wait(800);
await shoot(p, "new-dark");
await p.evaluate(() => localStorage.setItem("theme", "light"));
await p.reload({ waitUntil: "networkidle2" });
await wait(800);
await p.evaluate(() => document.getElementById("zone").scrollIntoView());
await wait(3500);
await p.screenshot({ path: `${OUT}/new-light-zone.png` });
await p.evaluate(() => localStorage.removeItem("theme"));
const m = await b.newPage();
await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await m.goto(BASE + "/", { waitUntil: "networkidle2" });
for (const id of ["etapes", "zone"]) {
  await m.evaluate((s) => window.scrollTo(0, document.getElementById(s).offsetTop - 73), id);
  await wait(3200);
  await m.screenshot({ path: `${OUT}/new-mobile-${id}.png` });
}
console.log("mobile width", await m.evaluate(() => document.documentElement.scrollWidth));
await b.close();
