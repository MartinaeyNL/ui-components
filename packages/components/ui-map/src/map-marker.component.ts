import {html, TemplateResult} from "lit";
import {customElement, property} from "lit/decorators.js";
import getMapMarkerStyles from "./map-marker.styles.js";
import { when } from "lit/directives/when.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";

@customElement("ui-map-marker")
export class MapMarkerComponent extends UiComponent {

    @property({type: Number})
    public lat = 0;

    @property({type: Number})
    public lng = 0;

    @property({type: Boolean})
    public custom = false;

    static get styles() {
        return [getMapMarkerStyles()];
    }

    protected render(): unknown {
        return html`
            ${when(this.custom, () => this._getCustomMarkerTemplate(), () => this._getDefaultMarkerTemplate())}
        `;
    }

    protected _getCustomMarkerTemplate(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected _getDefaultMarkerTemplate(): TemplateResult {
        return html`
            <div id="marker" style="aspect-ratio: 1/1; background: black; min-width: 12px; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 4px; max-width: 64px;">
                <span style="color: white;">${this.title}</span>
            </div>
        `;
    }
}
