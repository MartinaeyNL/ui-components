import {html, PropertyValues, TemplateResult} from "lit";
import {customElement, property, query, queryAssignedElements} from "lit/decorators.js";
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
    public title = "Button";

    /**
     * @summary Use the `outlined` attribute draw outlined buttons with transparent backgrounds. Default: `false`
     */
    @property({type: Boolean})
    public outlined = false;

    /**
     * @summary Use the `rounded` attribute to apply rounded edges on the horizontal axis. Default: `false`
     */
    @property({type: Boolean})
    public rounded = false;

    @query('button')
    protected _buttonElem?: HTMLButtonElement;

    @queryAssignedElements({slot: "prefix"})
    protected _prefixSlot?: Array<HTMLElement>;

    @queryAssignedElements({slot: undefined})
    protected _defaultSlot?: Array<HTMLElement>;

    @queryAssignedElements({slot: "suffix"})
    protected _suffixSlot?: Array<HTMLElement>;

    static get styles() {
        return [...super.styles, getButtonStyles()];
    }

    protected firstUpdated(changedProps: PropertyValues) {
        if(this._prefixSlot?.length) {

            if(this._prefixSlot.length === 1) {
                const tagName = this._prefixSlot[0]?.tagName.toLowerCase();
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
                ${until(this._getPrefixContent(), this._getPrefixSlotTemplate())}
                ${until(this._getLabelContent(), this._getLabelSlotTemplate())}
                ${until(this._getSuffixContent(), this._getSuffixSlotTemplate())}
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

            if(suffixSlot[0]?.tagName.toLowerCase() === this.ICON_TAG_NAME) {
                const iconElem = suffixSlot[0] as ResizableUiComponent;
                this._buttonElem?.classList.add("ui-button--suffixed-icon");
                iconElem.size = this.size === UiSize.XLARGE ? UiSize.MEDIUM : UiSize.SMALL;
                iconElem.variant = this.variant;
                iconElem.dark = !this.outlined;
            }
        }
    }

    protected _getPrefixSlotTemplate(): TemplateResult {
        return html`<slot name="prefix" @slotchange="${this._onPrefixSlotChange}"></slot>`;
    }

    protected async _getPrefixContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        if(this._prefixSlot?.length) {
            return this._getPrefixSlotTemplate();
        }
    }

    protected _getLabelSlotTemplate(): TemplateResult {
        return html`<slot></slot>`;
    }

    protected async _getLabelContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        if(this._defaultSlot?.length) {
            return this._getLabelSlotTemplate();
        }
        return html`<span>${this.title}</span>`;
    }

    protected _getSuffixSlotTemplate(): TemplateResult {
        return html`<slot name="suffix" @slotchange="${this._onSuffixSlotChange}"></slot>`;
    }

    protected async _getSuffixContent(): Promise<TemplateResult | undefined> {
        await this.updateComplete;
        if(this._suffixSlot?.length) {
            return this._getSuffixSlotTemplate();
        }
    }
}
