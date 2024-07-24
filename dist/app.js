"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rapid_api_service_1 = require("./rapid-api.service");
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// cron.schedule('* * * * *', () => {
//   const now = new Date();
//   console.log(
//     `[${now.toTimeString().substring(0, 5)}] running a task every minute`
//   );
// });
function downloadAndConvertToPdf(url, outputPath, outputFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        // Navigate to the URL
        yield page.goto(url, { waitUntil: 'networkidle2' });
        // Wait for a specific selector to ensure the page is fully loaded
        // Replace 'body' with a more specific selector if needed
        yield page.waitForSelector('body');
        // Create a PDF from the page content
        const pdfPath = path_1.default.join(outputPath, `${outputFileName}.pdf`);
        yield page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
        yield browser.close();
        console.log(`PDF saved at: ${pdfPath}`);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    // get user id first
    const userId = (yield rapid_api_service_1.RapidApiService.getUserId('lx0')).id;
    // get stored lists of user
    const userLists = yield rapid_api_service_1.RapidApiService.getUserLists(userId);
    console.dir({ userId, userLists });
    // get list infos
    userLists.lists.forEach((listId) => __awaiter(void 0, void 0, void 0, function* () {
        const listInfo = yield rapid_api_service_1.RapidApiService.getListInfo(listId);
        const listArticles = yield rapid_api_service_1.RapidApiService.getListArticles(listId);
        console.dir({ listInfo, listArticles });
        // get article infos
        listArticles.list_articles.forEach((articleId) => __awaiter(void 0, void 0, void 0, function* () {
            const articleInfo = yield rapid_api_service_1.RapidApiService.getArticleInfo(articleId);
            const articleHtml = yield rapid_api_service_1.RapidApiService.getArticleHtml(articleId);
            console.dir({ articleInfo });
            downloadAndConvertToPdf(articleHtml.html, '.', articleInfo.unique_slug);
        }));
    }));
}))();
//# sourceMappingURL=app.js.map