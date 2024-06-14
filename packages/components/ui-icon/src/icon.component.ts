import {customElement, query, state} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, PropertyValues, TemplateResult, unsafeCSS} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {until} from "lit/directives/until.js";

// @ts-ignore
import getIconStyles from "./icon.styles" assert { type: "css" };

@customElement("ui-icon")
export class IconComponent extends UiComponent {

    static get styles() {
        /*console.log(unsafeCSS(iconStyles));*/
        return [...super.styles, getIconStyles(), /*unsafeCSS(iconStyles)*/]
    }

    protected render(): TemplateResult {
        return html`
            <span>Icons 2</span>
            <i class="bi-alarm">
        `;
    }
}
