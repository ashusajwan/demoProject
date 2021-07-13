import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import PDFLibSource from '@salesforce/resourceUrl/pdfLib';

export default class GeneratePDF extends LightningElement {
    pdfLibPath;
    pdfLibLoaded = false;
    error;
    renderedCallback() {
        if (this.pdfLibLoaded) {
            return;
        }
        this.pdfLibLoaded = true;
        Promise.all([
            loadScript(this, PDFLibSource)
        ]);
    }

    generatePDF() {
        this.createPdf();
    }

    async createPdf() {
        try {
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage([350, 400]);
            page.moveTo(110, 200);
            page.drawText('Hello World!');
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            this.template.querySelectorAll('pdf').src = pdfDataUri;
        } catch (error) {
            console.log('error ' + error);
        }
    }
}