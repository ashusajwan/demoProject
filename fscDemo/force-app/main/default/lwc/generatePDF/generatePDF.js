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
            console.log('HEllo world printed');
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            var popup = this.template.querySelector(".popup");
            // popup.style.display = "block";
            popup.querySelector(".iframe").src = pdfDataUri; //'https://great-cody-205515-dev-ed.lightning.force.com/lightning/r/Account/0015g000005iFZRAA2/view';
            /* 
            const theIframe = this.template.querySelector('pdf');
 
             this.fullUrl = pdfDataUri;
             //this.template.querySelector('pdf').src = pdfDataUri;
             */
            console.log('iframe src value' + popup.querySelector(".iframe").src);
            popup.querySelector(".iframe").reload();
            console.log('pdfDataUri' + pdfDataUri);
            console.log('PDF generate end');
            popup.querySelector(".iframe").src = pdfDataUri;
            console.log('iframe src value2 ' + popup.querySelector(".iframe").src);
        } catch (error) {
            console.log('error ' + error);
        }
    }
}