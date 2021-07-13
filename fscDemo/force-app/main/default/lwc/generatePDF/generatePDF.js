import { LightningElement } from 'lwc';
import {
    loadScript,
    loadStyle
} from 'lightning/platformResourceLoader';
import PDFLibSource from '@salesforce/resourceUrl/pdfLib';

export default class GeneratePDF extends LightningElement {
    pdfLibPath;
    pdfLibLoaded = false;
    error;
    fullUrl = '';
    // theIframe;
    renderedCallback() {
        console.log('renderedCallback called');
        if (this.pdfLibLoaded) {
            return;
        }
        this.pdfLibLoaded = true;
        Promise.all([
            loadScript(this, PDFLibSource)
        ]);
        console.log('renderedCallback ended');
    }

    generatePDF() {
        console.log('PDF Click called');
        this.createPdf();
    }

    async createPdf() {
        try {
            console.log('PDF generate start');
            const pdfDoc = await PDFLib.PDFDocument.create();
            const page = pdfDoc.addPage([350, 400]);
            page.moveTo(110, 200);
            page.drawText('Hello World!');
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            const theIframe = this.template.querySelector('pdf');
            this.fullUrl = pdfDataUri;
            console.log('pdfDataUri' + pdfDataUri);
            console.log('PDF generate end');
        } catch (error) {
            console.log('error ' + error);
        }
    }
}