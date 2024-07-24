import cron from 'node-cron';
import dotenv from 'dotenv';
import { RapidApiService } from './rapid-api.service';
import { convertHtmlToPdf } from './convert-html-to-pdf.puppeteer.util';

const userName = 'lx0';

dotenv.config();

async function main() {
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

      convertHtmlToPdf(articleHtml.html, `${process.env.DATA_PATH}/${listInfo.name}/${articleInfo.unique_slug}.pdf`);
    });
  });
}

cron.schedule('*/15 * * * *', () => {
  const now = new Date();
  console.log(
    `[${now.toTimeString().substring(0, 5)}] running a task every 15 minutes`
  );
  // main();
});

main();