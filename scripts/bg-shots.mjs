// Background field in both themes, with the mouse over the hero, plus a revealed section. BASE=http://localhost:3000
import puppeteer from "puppeteer-core";
const BASE = process.env.BASE ?? "http://localhost:3000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
for (const theme of ["dark", "light"]) {
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.evaluateOnNewDocument((t) => { try { localStorage.setItem("theme", t); } catch {} }, theme);
  await p.goto(BASE + "/", { waitUntil: "networkidle2" });
  await wait(1500);
  await p.mouse.move(700, 600);
  await p.mouse.move(720, 640);
  await wait(1200);
  await p.screenshot({ path: `.impeccable/review/bg-${theme}.png` });
  await p.evaluate(() => window.scrollTo({ top: document.getElementById("services").offsetTop - 73, behavior: "instant" }));
  await wait(1800);
  await p.screenshot({ path: `.impeccable/review/bg-${theme}-services.png` });
  await p.close();
}
await b.close();
