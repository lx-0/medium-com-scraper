import pdf from 'html-pdf';

export const convertHtmlToPdf = (htmlContent, pdfFileName): void => {
    return pdf.create(htmlContent, {format: 'A4'}).toFile(pdfFileName, (err, res) => {
        if (err) return console.log(err);
        console.log(res);
    });
}
