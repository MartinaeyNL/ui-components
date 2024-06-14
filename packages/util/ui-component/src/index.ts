import {LitElement, PropertyValues, unsafeCSS} from "lit";
import {property, state} from "lit/decorators.js";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";

// @ts-ignore
import getGlobalStyle from "./styles";

// @ts-ignore
import * as propsCss from "open-props/open-props.min.css";

export abstract class UiComponent extends LitElement {

    @property({type: String})
    public variant: UiVariant = UiVariant.DEFAULT;

    @property({type: Boolean})
    public primary = false;

    @property({type: Boolean})
    public success = false;

    @property({type: Boolean})
    public neutral = false;

    @property({type: Boolean})
    public warning = false;

    @property({type: Boolean})
    public danger = false;

    @property({type: String})
    public size: UiSize = UiSize.DEFAULT;

    @property({type: Boolean})
    public disabled = false;

    @state()
    protected _variantOverride?: UiVariant;


    static get styles() {
        return [getGlobalStyle(), unsafeCSS(propsCss)]
    }

    protected willUpdate(changedProps: PropertyValues) {
        if(changedProps.has("primary") && this.primary != null) {
            this._variantOverride = this.primary ? UiVariant.PRIMARY : undefined;
        }
        if(changedProps.has("success") && this.success != null) {
            this._variantOverride = this.success ? UiVariant.SUCCESS : undefined;
        }
        if(changedProps.has("neutral") && this.neutral != null) {
            this._variantOverride = this.neutral ? UiVariant.NEUTRAL : undefined;
        }
        if(changedProps.has("warning") && this.warning != null) {
            this._variantOverride = this.warning ? UiVariant.WARNING : undefined;
        }
        if(changedProps.has("danger") && this.danger != null) {
            this._variantOverride = this.danger ? UiVariant.DANGER : undefined;
        }
        return super.willUpdate(changedProps);
    }

    getClasses(): {[name: string]: boolean} {
        const variant = this._variantOverride || this.variant;
        const classes = {

            // Colors
            'ui-primary': variant === UiVariant.PRIMARY,
            'ui-success': variant === UiVariant.SUCCESS,
            'ui-neutral': variant === UiVariant.NEUTRAL,
            'ui-warning': variant === UiVariant.WARNING,
            'ui-danger': variant === UiVariant.DANGER,

            // Sizes
            'ui-size-small': this.size === UiSize.SMALL,
            'ui-size-medium': this.size === UiSize.MEDIUM || this.size === UiSize.DEFAULT,
            'ui-size-large': this.size === UiSize.LARGE,
            'ui-size-xlarge': this.size === UiSize.XLARGE
        }
        return classes;
    }
}
