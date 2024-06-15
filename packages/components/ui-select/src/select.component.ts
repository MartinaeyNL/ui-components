import {customElement, query, state} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, PropertyValues, TemplateResult} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {until} from "lit/directives/until.js";
import {PopoverComponent} from "@martinaeynl/ui-components-popover";
import "@martinaeynl/ui-components-popover";
import "@martinaeynl/ui-components-icon";

// @ts-ignore
import getSelectStyles from "./select.styles";

@customElement("ui-select")
export class SelectComponent extends UiComponent {

    @state()
    protected _active = false;

    @query("ui-popover")
    protected _popoverElem?: PopoverComponent;

    static get styles() {
        return [...super.styles, getSelectStyles()]
    }

    protected willUpdate(changedProps: PropertyValues): void {
        super.willUpdate(changedProps);
        console.log(changedProps);
        if(changedProps.has("_active")) {
            this._popoverElem?.toggle(this._active);
        }
    }

    public open() {
        this._active = true;
    }

    public close() {
        this._active = false;
    }

    public toggle(state?: boolean) {
        if(state) {
            this._active = state;
        } else {
            this._active = !this._active;
        }
    }

    getClasses(): {[name: string]: boolean} {
        const classes: {[name: string]: boolean} = {
            'ui-select': true,
            'ui-select--disabled': this.disabled,
            'ui-select--active': this._active
        }
        return {...super.getClasses(), ...classes};
    }

    protected _getAnchorClasses() {
        return {
            'ui-select-anchor': true,
            'ui-select-anchor--active': this._active
        }
    }

    protected _getContentClasses() {
        return {
            'ui-select-content': true
        }
    }

    protected render(): TemplateResult {
        const classes = this.getClasses();
        const anchorClasses = this._getAnchorClasses();
        const contentClasses = this._getContentClasses();
        const rotation = this._active ? -180 : undefined;
        return html`
            <div class=${classMap(classes)}>
                <ui-popover>
                    <div slot="anchor" class=${classMap(anchorClasses)} @click=${this._onAnchorClick}>
                        <span>John Doe</span>
                        <ui-icon icon="chevron-down" size="small" .rotation=${rotation} style="--ui-icon-transition-ms: 200ms"></ui-icon>
                    </div>
                    <div class=${classMap(contentClasses)}>
                        <span>Content</span>
                    </div>
                </ui-popover>
            </div>
        `;
    }

    protected _onAnchorClick(ev: PointerEvent) {
        this.toggle();
    }
}
