import {html, TemplateResult} from "lit";
import {customElement, property, queryAssignedNodes} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {classMap} from "lit/directives/class-map.js";
import {until} from "lit/directives/until.js";

// @ts-ignore
import getButtonStyles from "./button.styles";

@customElement("ui-button")
export class ButtonComponent extends UiComponent {

    @property({type: String})
    public title: string = "Button";

    @property({type: Boolean})
    public outlined = false;

    @property({type: Boolean})
    public rounded = false;

    @queryAssignedNodes({slot: 'prefix'})
    protected _prefixSlot?: Array<Node>;

    @queryAssignedNodes({slot: undefined})
    protected _defaultSlot?: Array<Node>;

    @queryAssignedNodes({slot: 'suffix'})
    protected _suffixSlot?: Array<Node>;

    static get styles() {
        return [...super.styles, getButtonStyles()]
    }

    protected render(): TemplateResult {
        const classes = this.getClasses();
        return html`
            <button class=${classMap(classes)}>
                <slot name="prefix">${until(this._getPrefixContent())}</slot>
                <slot>${until(this._getLabelContent())}</slot>
                <slot name="suffix">${until(this._getSuffixContent())}</slot>
            </button>
        `;
    }

    getClasses(): {[name: string]: boolean} {
        const classes: {[name: string]: boolean} = {
            'ui-button': true,
            'ui-button--disabled': this.disabled,
            'ui-button--outlined': this.outlined,
            'ui-button--filled': !this.outlined,
            'ui-button--rounded': this.rounded
        }
        return {...super.getClasses(), ...classes};
    }

    protected async _getPrefixContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        if(this._prefixSlot?.length) {
            return;
        }
        /*return html`${this.icon}`;*/
    }

    protected async _getLabelContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        if(this._defaultSlot?.length) {
            return;
        }
        return html`${this.title}`;
    }

    protected async _getSuffixContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        if(this._suffixSlot?.length) {
            return;
        }
        /*return html`${this.trailingIcon}`;*/
    }
}
