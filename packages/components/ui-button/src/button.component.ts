import {html, PropertyValues, TemplateResult} from "lit";
import {customElement, property, query, queryAssignedNodes} from "lit/decorators.js";
import {ResizableUiComponent, UiComponent} from "@martinaeynl/ui-component-utils";
import {UiSize} from "@martinaeynl/ui-component-models";
import {classMap} from "lit/directives/class-map.js";
import {until} from "lit/directives/until.js";

// @ts-ignore
import getButtonStyles from "./button.styles";

@customElement("ui-button")
export class ButtonComponent extends ResizableUiComponent {

    protected ICON_TAG_NAME = "ui-icon";

    @property({type: String})
    public title: string = "Button";

    @property({type: Boolean})
    public outlined = false;

    @property({type: Boolean})
    public rounded = false;

    @property({type: Boolean})
    public static = false;

    @query('button')
    protected _buttonElem?: HTMLButtonElement;

    @queryAssignedNodes({slot: "prefix"})
    protected _prefixSlot?: Array<Node>;

    @queryAssignedNodes({slot: undefined})
    protected _defaultSlot?: Array<Node>;

    @queryAssignedNodes({slot: "suffix"})
    protected _suffixSlot?: Array<Node>;

    static get styles() {
        return [...super.styles, getButtonStyles()];
    }

    protected firstUpdated(changedProps: PropertyValues) {
        if(this._prefixSlot?.length) {

            if(this._prefixSlot.length === 1) {
                const tagName = (this._prefixSlot[0] as HTMLElement).tagName.toLowerCase();
                if(tagName === this.ICON_TAG_NAME) {
                    this._buttonElem?.classList.add("ui-button--prefixed-icon");
                }
            }
        }
        return super.firstUpdated(changedProps);
    }

    protected render(): TemplateResult {
        const classes = this.getClasses();
        return html`
            <button class=${classMap(classes)}>
                <slot name="prefix" @slotchange="${this._onPrefixSlotChange}">${until(this._getPrefixContent())}</slot>
                <slot>${until(this._getLabelContent())}</slot>
                <slot name="suffix" @slotchange="${this._onSuffixSlotChange}">${until(this._getSuffixContent())}</slot>
            </button>
        `;
    }

    getClasses(): {[name: string]: boolean} {
        console.log(this._prefixSlot);
        const classes: {[name: string]: boolean} = {
            'ui-button': true,
            'ui-button--disabled': this.disabled,
            'ui-button--outlined': this.outlined,
            'ui-button--filled': !this.outlined,
            'ui-button--rounded': this.rounded
        };
        return {...super.getClasses(), ...classes};
    }

    /**
     * Callback for when the prefix slot changes. See {@link _prefixSlot}
     */
    protected _onPrefixSlotChange(ev: Event) {
        const prefixSlot = this._prefixSlot;

        // Cleanup previously added classes
        if(this._buttonElem?.classList) {
            const classesToRemove = Array.from(this._buttonElem.classList.values()).filter(c => c.includes("ui-button--prefixed"));
            classesToRemove?.forEach(c => this._buttonElem?.classList.remove(c));
        }

        if(prefixSlot?.length === 1) {
            this._buttonElem?.classList.add("ui-button--prefixed");
            const elem = prefixSlot[0] as UiComponent;

            if(elem.tagName.toLowerCase() === this.ICON_TAG_NAME) {
                const iconElem = elem as ResizableUiComponent;
                this._buttonElem?.classList.add("ui-button--prefixed-icon");
                iconElem.size = this.size === UiSize.XLARGE ? UiSize.MEDIUM : UiSize.SMALL;
                iconElem.variant = this.variant;
                iconElem.dark = !this.outlined;
            }
        }
    }

    /**
     * Callback for when the prefix slot changes. See {@link _prefixSlot}
     */
    protected _onSuffixSlotChange(ev: Event) {
        const suffixSlot = this._suffixSlot;

        // Cleanup previously added classes
        if(this._buttonElem?.classList) {
            const classesToRemove = Array.from(this._buttonElem.classList.values()).filter(c => c.includes("ui-button--suffixed"));
            classesToRemove?.forEach(c => this._buttonElem?.classList.remove(c));
        }

        if(suffixSlot?.length === 1) {
            this._buttonElem?.classList.add("ui-button--suffixed");
            const elem = suffixSlot[0] as HTMLElement;

            if(elem.tagName.toLowerCase() === this.ICON_TAG_NAME) {
                const iconElem = elem as ResizableUiComponent;
                this._buttonElem?.classList.add("ui-button--suffixed-icon");
                iconElem.size = this.size === UiSize.XLARGE ? UiSize.MEDIUM : UiSize.SMALL;
                iconElem.variant = this.variant;
                iconElem.dark = !this.outlined;
            }
        }
    }



    protected async _getPrefixContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        if(this._prefixSlot?.length) {
            console.log(this._prefixSlot);
            return;
        }
    }

    protected async _getLabelContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        console.log("Default slot is", this._defaultSlot);
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
    }
}
