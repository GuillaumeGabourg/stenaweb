// Checks that every anchor link lands with its section exactly under the fixed header.
import puppeteer from "puppeteer-core";
const BASE = process.argv[2] ?? "http://localhost:3000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const measure = (p, id) => p.evaluate((id) => ({
  top: Math.round(document.getElementById(id).getBoundingClientRect().top),
  header: Math.round(document.querySelector("header > nav").getBoundingClientRect().height) + 1,
  menuOpen: !document.getElementById("menu").hidden,
}), id);
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844, isMobile: true, hasTouch: true }]) {
  const p = await b.newPage();
  await p.setViewport(vp);
  await p.goto(BASE + "/", { waitUntil: "networkidle2" });
  await wait(1200);
  for (const id of ["realisations", "services", "tarifs", "faq", "contact"]) {
    if (vp.width < 1024) {
      await p.click('button[aria-controls="menu"]');
      await wait(300);
      await p.click(`#menu a[href="/#${id}"]`);
    } else {
      await p.click(`nav ul a[href="/#${id}"]`);
    }
    await wait(1800);
    const m = await measure(p, id);
    console.log(vp.width, id, m.top === m.header ? "OK" : "OFF", JSON.stringify(m));
  }
  // From another page
  await p.goto(BASE + "/projets/hk-conseil", { waitUntil: "networkidle2" });
  await wait(800);
  await p.evaluate(() => [...document.querySelectorAll('a[href="/#contact"]')].pop().click());
  await wait(2500);
  const m = await measure(p, "contact");
  console.log(vp.width, "case->contact", m.top === m.header ? "OK" : "OFF", JSON.stringify(m));
  await p.close();
}
await b.close();
