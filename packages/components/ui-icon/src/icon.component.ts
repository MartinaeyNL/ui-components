import {customElement, property, query, state} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, PropertyValues, TemplateResult, unsafeCSS} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {until} from "lit/directives/until.js";
import {unsafeSVG} from "lit/directives/unsafe-svg.js";
import {getIconData, iconToSVG, iconToHTML, replaceIDs} from '@iconify/utils';
import {icons} from '@iconify-json/bi';
import 'iconify-icon';

// @ts-ignore
import getIconStyles from "./icon.styles" assert {type: "css"};

@customElement("ui-icon")
export class IconComponent extends UiComponent {

    @property({type: String})
    public icon?: string;

    @property({type: String})
    public set?: string;

    @property({type: Number})
    public rotation?: string;

    @query(".ui-icon")
    protected _iconElem?: HTMLElement;

    protected _loadedIcon?: string;

    static get styles() {
        return [...super.styles, getIconStyles()]
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if(changedProps.has("rotation") && this._iconElem) {
            this._iconElem.style.rotate = `${this.rotation || 0}deg`;
            changedProps.delete("rotation");
        }
        super.shouldUpdate(changedProps);

        return changedProps.size > 0;
    }

    getClasses(): { [name: string]: boolean } {
        const classes: { [name: string]: boolean } = {
            'ui-icon': true,
            'ui-icon--disabled': this.disabled
        }
        return {...super.getClasses(), ...classes};
    }

    protected render(): TemplateResult {
        console.log("render()");
        if (!this.icon) {
            return html``;
        } else {
            return html`
                <div class=${classMap(this.getClasses())}>
                    ${until(this._getIconTemplate(this.icon, this.set))}
                </div>
            `;
        }
    }

    protected async _getIconTemplate(iconName: string, iconSet?: string): Promise<TemplateResult> {
        let template;
        if(this._loadedIcon) {
            await this._doIconExitTransition();
        }
        if (iconSet) {
            const icon = iconSet + ":" + iconName
            template = html`
                <iconify-icon icon=${icon}></iconify-icon>
            `;
        } else {
            // Get content for icon
            const iconData = getIconData(icons, iconName);
            if (!iconData) {
                throw new Error(`Icon "${iconName}" does not exist.`);
            }
            // Use it to generate SVG string
            const renderData = iconToSVG(iconData, {height: 'unset', width: 'unset'});
            const svg = iconToHTML(replaceIDs(renderData.body), renderData.attributes);
            template = html`${unsafeSVG(svg)}`;
        }

        this._loadedIcon = iconName;
        this._doIconEnterTransition();
        return template;
    }

    /**
     * Function that adds a CSS class to "fade out" the icon. The promise resolves after 100ms.
     */
    protected async _doIconExitTransition(): Promise<void> {
        if(this._iconElem) {
            console.log(getComputedStyle(this.shadowRoot!.firstElementChild!))
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    /**
     * Function that removes the CSS class that "faded out" the icon.
     * So it basically sets is back to the original state. The promise resolves after 100ms.
     */
    protected async _doIconEnterTransition(): Promise<void> {
        if(this._iconElem) {
            this._iconElem.classList.remove("ui-icon--invisible");
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}
