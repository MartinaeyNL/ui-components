import {UiComponent} from "@martinaeynl/ui-component-utils";
import {customElement, property} from "lit/decorators.js";
import getSelectOptionStyles from "./select-option.styles.js";
import {html, TemplateResult} from "lit";
import {ifDefined} from "lit/directives/if-defined.js";

@customElement("ui-select-option")
export class SelectOptionComponent extends UiComponent {

    @property({type: String})
    public value?: string;

    /** Overrides the text shown within the select option. */
    @property({ type: String })
    public label?: string;

    static get styles() {
        return [...super.styles, getSelectOptionStyles()];
    }

    constructor() {
        console.log("Constructor of SelectOption!");
        super();
    }

    protected render(): TemplateResult {
        return html`
            <option value=${ifDefined(this.value)}>
                ${this.label || this.value}
            </option>
        `;
    }
}
