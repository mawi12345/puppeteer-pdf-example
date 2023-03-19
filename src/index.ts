import puppeteer from "puppeteer";
import fs from "fs/promises";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:8080/");

  const pdf = await page.pdf({
    preferCSSPageSize: true,
    omitBackground: true,
    printBackground: true,
  });

  await fs.writeFile("out.pdf", pdf);

  await browser.close();
})();
