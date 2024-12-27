import {customElement, property, query, queryAssignedNodes, state} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, TemplateResult} from "lit";
import {classMap} from "lit/directives/class-map.js";
import "@martinaeynl/ui-components-popover";
import "@martinaeynl/ui-components-icon";
import "@martinaeynl/ui-components-button";

// @ts-ignore
import getSelectStyles from "./select.styles";
import { until } from "lit/directives/until.js";
import { when } from "lit/directives/when.js";

@customElement("ui-select")
export class SelectComponent extends UiComponent {

    @property()
    public value?: string;

    @property({type: Boolean})
    public multiple = false;

    @property({type: Boolean})
    public sync = true;

    @state()
    protected _active = false;

    @queryAssignedNodes({slot: "anchor"})
    protected _anchorSlot?: Array<Node>;

    @query("ui-popover")
    protected _popoverElem?: HTMLElement /*PopoverComponent; TODO: Fix this */

    static get styles() {
        return [...super.styles, getSelectStyles()];
    }

    getClasses(): {[name: string]: boolean} {
        const classes: {[name: string]: boolean} = {
            "ui-select": true,
            "ui-select--disabled": this.disabled
        };
        return {...super.getClasses(), ...classes};
    }

    protected _getAnchorClasses() {
        return {
            "ui-select-anchor": true,
            "ui-select-anchor--active": this._active
        };
    }

    protected _getContentClasses() {
        return {
            "ui-select-content": true
        };
    }

    protected render(): TemplateResult {
        const classes = this.getClasses();
        const contentClasses = this._getContentClasses();
        const placementOptions = {
            allowedPlacements: ["top", "bottom"]
        };
        return html`
            <div class=${classMap(classes)}>
                <ui-popover gap .sync="${this.sync}" .placementOptions="${placementOptions}" @toggle=${this._onPopoverToggle}>
                    <slot name="anchor" slot="anchor">
                        ${until(this._getAnchorContent())}
                    </slot>
                    <div class=${classMap(contentClasses)}>
                        <slot></slot>
                    </div>
                </ui-popover>
            </div>
        `;
    }

    protected _onPopoverToggle(ev: CustomEvent) {
        this._active = ev.detail;
    }

    protected async _getAnchorContent(): Promise<TemplateResult | undefined> {
        if(this._anchorSlot?.length) {
            return;
        } else {
            return html`
                <ui-button outlined static>
                    ${this.value || this.title}
                    <ui-icon slot="suffix" id="chevron" icon="chevron-expand"></ui-icon>
                </ui-button>
            `;
        }
    }
}
