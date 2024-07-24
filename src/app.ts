import cron from 'node-cron';
import { RapidApiService } from './rapid-api.service';
import puppeteer from 'puppeteer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// cron.schedule('* * * * *', () => {
//   const now = new Date();
//   console.log(
//     `[${now.toTimeString().substring(0, 5)}] running a task every minute`
//   );
// });

const userName = 'lx0';

async function downloadAndConvertToPdf(url, outputPath, outputFileName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('body');

  const pdfPath = path.join(outputPath, `${outputFileName}.pdf`);
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

  await browser.close();

  console.log(`PDF saved at: ${pdfPath}`);
}

(async () => {
  // get user id first
  const userId = (await RapidApiService.getUserId(userName)).id;

  // get stored lists of user
  const userLists = await RapidApiService.getUserLists(userId);

  console.dir({ userId, userLists });

  // get list infos
  userLists.lists.forEach(async (listId) => {
    const listInfo = await RapidApiService.getListInfo(listId);
    const listArticles = await RapidApiService.getListArticles(listId);

    console.dir({ listInfo, listArticles });

    // get article infos
    listArticles.list_articles.forEach(async (articleId) => {
      const articleInfo = await RapidApiService.getArticleInfo(articleId);
      const articleHtml = await RapidApiService.getArticleHtml(articleId);

      console.dir({ articleInfo });

      downloadAndConvertToPdf(articleHtml.html, '.', articleInfo.unique_slug);
    });
  });
})();
