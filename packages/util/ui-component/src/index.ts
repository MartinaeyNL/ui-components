import {html, LitElement, PropertyValues, ReactiveElement, unsafeCSS} from "lit";
import {property, state} from "lit/decorators.js";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";

// @ts-ignore
import getGlobalStyle from "./styles";

// @ts-ignore
import * as sizesCss from "open-props/sizes.min.css";
// @ts-ignore
import * as fontsCss from "open-props/fonts.min.css";
// @ts-ignore
import * as colorsHslCss from "open-props/colors-hsl.min.css";

export abstract class UiComponent extends LitElement {

    /**
     * @summary Use the `variant` attribute to set the checkboxes variant / color. Default: `primary`
     */
    @property({type: String})
    public variant: UiVariant = UiVariant.DEFAULT;

    @property({type: Boolean})
    public primary = false;

    @property({type: Boolean})
    public success = false;

    @property({type: Boolean})
    public neutral = false;

    @property({type: Boolean})
    public danger = false;

    @property({type: Boolean})
    public dark = false;

    @property({type: Boolean})
    public disabled = false;

    @property({type: Boolean})
    public readonly = false;

    @state()
    protected _variantOverride?: UiVariant;


    static override get styles() {
        return [getGlobalStyle(), unsafeCSS(colorsHslCss), unsafeCSS(fontsCss), unsafeCSS(sizesCss)];
    }

    protected override shouldUpdate(changedProps: PropertyValues): boolean {
        super.shouldUpdate(changedProps);
        return changedProps.size > 0;
    }

    protected override willUpdate(changedProps: PropertyValues) {
        if (changedProps.has("primary") && this.primary != null) {
            this._variantOverride = this.primary ? UiVariant.PRIMARY : undefined;
        }
        if (changedProps.has("success") && this.success != null) {
            this._variantOverride = this.success ? UiVariant.SUCCESS : undefined;
        }
        if (changedProps.has("neutral") && this.neutral != null) {
            this._variantOverride = this.neutral ? UiVariant.NEUTRAL : undefined;
        }
        if (changedProps.has("danger") && this.danger != null) {
            this._variantOverride = this.danger ? UiVariant.DANGER : undefined;
        }
        return super.willUpdate(changedProps);
    }

    getClasses(): { [name: string]: boolean } {
        const variant = this.getVariant();
        return {

            // Colors
            "ui-primary": variant === UiVariant.PRIMARY,
            "ui-success": variant === UiVariant.SUCCESS,
            "ui-neutral": variant === UiVariant.NEUTRAL,
            "ui-danger": variant === UiVariant.DANGER,

            "ui-dark": this.dark,

            // Sizes
            /*'ui-size-small': this.size === UiSize.SMALL,
            'ui-size-medium': this.size === UiSize.MEDIUM || this.size === UiSize.DEFAULT,
            'ui-size-large': this.size === UiSize.LARGE,
            'ui-size-xlarge': this.size === UiSize.XLARGE*/
        };
    }

    public getVariant(): UiVariant {
        return this._variantOverride || this.variant;
    }

    public isPrimary(): boolean {
        return this.getVariant() === UiVariant.PRIMARY;
    }

    public isSuccess(): boolean {
        return this.getVariant() === UiVariant.SUCCESS;
    }

    public isNeutral(): boolean {
        return this.getVariant() === UiVariant.NEUTRAL;
    }

    public isDanger(): boolean {
        return this.getVariant() === UiVariant.DANGER;
    }

    protected _isSlotEmpty(nodes: Array<any>): boolean {
        return nodes.length === 0;
    }
}

export abstract class ResizableUiComponent extends UiComponent {

    @property({type: String})
    public size: UiSize = UiSize.DEFAULT;

}


export abstract class VaadinComponent extends UiComponent {

    connectedCallback() {
        super.connectedCallback();
        const observer = new MutationObserver(() => {

        })
    }
}
