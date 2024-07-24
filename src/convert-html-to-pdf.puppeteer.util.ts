import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

export const convertHtmlToPdf = async (htmlContent, pdfFileName): Promise<void> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlPath = path.join(process.cwd(), process.env.DATA_PATH, 'temp.html');
    fs.writeFileSync(htmlPath, htmlContent);

    // Load the local HTML file
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle2' });

    // Generate PDF
    await page.pdf({ 
        path: path.join(process.cwd(), pdfFileName), 
        format: 'A5', 
        scale: 0.7, 
        printBackground: false 
    });

    console.log(`PDF generated: ${pdfFileName}`);

    await browser.close();
}