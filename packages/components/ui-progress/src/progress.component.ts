import {SlProgressBar} from "@shoelace-style/shoelace";
import {customElement, property} from "lit/decorators.js";
import {PropertyValues} from "lit";

import '@shoelace-style/shoelace/dist/themes/light.css';

@customElement("ui-progress")
export class ProgressComponent extends SlProgressBar {

    @property()
    public test = "test";

    connectedCallback() {
        super.connectedCallback();
        console.log("Progress bar init!!!");
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
        console.log("Keys:", Object.keys(this));
    }
}
