import puppeteer from "puppeteer";
import fs from "fs/promises";
import { PDFDocument } from "pdf-lib";

(async () => {
  const url = "http://127.0.0.1:8080/";
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  try {
    await page.goto(url);
  } catch (e) {
    throw new Error(`Page ${url} is not available.`);
  }

  try {
    await page.waitForSelector("body.ready", { timeout: 5_000 });
  } catch (e) {
    throw new Error(
      `Page did not load in time! Did you forget to add body.ready class?`
    );
  }

  const pdf = await page.pdf({
    preferCSSPageSize: true,
    omitBackground: true,
    printBackground: true,
  });

  await page.close({ runBeforeUnload: false });

  await fs.writeFile("out.pdf", pdf);

  const pdfDoc = await PDFDocument.load(pdf);
  pdfDoc.setTitle("🥚 The Life of an Egg 🍳");
  pdfDoc.setAuthor("Humpty Dumpty");
  pdfDoc.setSubject("📘 An Epic Tale of Woe 📖");
  pdfDoc.setKeywords(["eggs", "wall", "fall", "king", "horses", "men"]);
  pdfDoc.setProducer("PDF App 9000 🤖");
  pdfDoc.setCreator("pdf-lib (https://github.com/Hopding/pdf-lib)");
  pdfDoc.setCreationDate(new Date("2018-06-24T01:58:37.228Z"));
  pdfDoc.setModificationDate(new Date("2019-12-21T07:00:11.000Z"));
  pdfDoc.getPages()[0].setHeight;
  const pdfBytes = await pdfDoc.save();

  await fs.writeFile("out2.pdf", pdfBytes);

  await browser.close();
})();
