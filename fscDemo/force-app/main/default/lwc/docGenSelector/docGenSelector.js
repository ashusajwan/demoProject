import { LightningElement, api } from 'lwc';

const APSONA_URI = "/apex/apsona__ApsonaForSalesforce?showHeader=false&apsona_loc=lex.docgen.nopopup";

export default class DocGenSelector extends LightningElement {
    @api recordId; // Make it available as this.recordId below

    runButtonClicked(event) {
        // Show the popup
        var popup = this.template.querySelector(".popup");
        popup.style.display = "block";

        // Get the action code that the user selected
        var actionSelector = this.template.querySelector(".doc-gen-selector");
        var actionCode = actionSelector.options[actionSelector.selectedIndex].value;

        // Run the corresponding merge action
        popup.querySelector(".iframe").src = APSONA_URI + "&actionCode=" + actionCode + "&recordId=" + this.recordId;
        console.log('Iframe value ' + popup.querySelector(".iframe").src);
    }

    closePopup() {
        this.template.querySelector(".popup").style.display = "none";
    }
}
