import {customElement, query} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {classMap} from "lit/directives/class-map.js";
import {html} from "lit";
import "@vaadin/checkbox";

// @ts-ignore
import getCheckboxStyles from "./checkbox.styles";

/**
 * @attribute {string} label - Text alongside the checkbox
 *
 * @attribute {boolean} required - Mark the checkbox as required to be checked by the user.
 * @attribute {string} error-message - Sets the error message upon failure. (such as the required attribute)
 * @attribute {string} helper-text - Sets the helper text below the checkbox.
 *
 * @attribute {boolean} active - Set when the checkbox is activated with mouse, touch or the keyboard.
 * @attribute {boolean} checked - Set when the checkbox is checked.
 * @attribute {boolean} disabled - Set when the checkbox is disabled.
 * @attribute {boolean} indeterminate - Sets when the checkbox is in the indeterminate state.
 */
@customElement("ui-checkbox")
export class CheckboxComponent extends UiComponent {

    @query("vaadin-checkbox")
    public checkbox?: HTMLElement;

    static get observedAttributes() {
        return [...super.observedAttributes, 'label', 'required', 'error-message', 'helper-text', 'active', 'checked', 'disabled', 'indeterminate'];
    }

    static override get styles() {
        return [...super.styles, getCheckboxStyles()];
    }

    override attributeChangedCallback(name: string, old: string | null, value: string | null) {
        super.attributeChangedCallback(name, old, value);
        this.updateComplete.then(() => {
            if(this.checkbox) {
                if(value != null) {
                    this.checkbox.setAttribute(name, value);
                } else {
                    this.checkbox.removeAttribute(name);
                }
            }
        })
    }

    override render() {
        const classes = this.getClasses();
        return html`
            <vaadin-checkbox class=${classMap(classes)}>
                <slot></slot>
            </vaadin-checkbox>
        `;
    }
}
