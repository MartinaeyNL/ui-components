import {customElement, property, query} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, TemplateResult} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {until} from "lit/directives/until.js";

// @ts-ignore
import getPopoverStyles from "./popover.styles";

@customElement("ui-popover")
export class PopoverComponent extends UiComponent {

    @property({type: Boolean})
    public active = false;

    /*@query("#popover-anchor")
    protected _popoverElem?: HTMLElement;*/

    static get styles() {
        return [...super.styles, getPopoverStyles()];
    }

    public open() {
        this.active = true;
    }

    public close() {
        this.active = false;
    }

    public toggle(state?: boolean) {
        if(state) {
            this.active = state;
        } else {
            this.active = !this.active;
        }
    }

    protected async _onAnchorChange(event: Event) {
        console.debug("onAnchorChange", event);
    }

    protected async _onContentChange(event: Event) {
        console.debug("onContentChange", event);
    }

    getClasses(): {[name: string]: boolean} {
        const classes: {[name: string]: boolean} = {
            'ui-popover': true,
            'ui-popover--disabled': this.disabled,
            'ui-popover--active': this.active
        }
        return {...super.getClasses(), ...classes};
    }

    protected _getContentClasses() {
        return {
            'ui-popover-content': true,
            'ui-popover-content--active': this.active
        }
    }

    protected render(): TemplateResult {
        const classes = this.getClasses();
        const contentClasses = this._getContentClasses();
        return html`
            <div class=${classMap(classes)}>
                <slot name="anchor" @slotchange=${this._onAnchorChange}></slot>
                <div class=${classMap(contentClasses)}>
                    <slot @slotchange=${this._onContentChange}></slot>
                </div>
            </div>
        `;
    }
}
