import {customElement, property, query, queryAssignedNodes} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {badge} from "@vaadin/vaadin-lumo-styles/badge.js";
import {classMap} from "lit/directives/class-map.js";
import {when} from "lit/directives/when.js";
import {html, PropertyValues} from "lit";

// @ts-ignore
import getBadgeStyles from "./badge.styles";

@customElement("ui-badge")
export default class BadgeComponent extends UiComponent {

    protected ICON_TAG_NAME = "ui-icon";

    /**
     * Test
     * @description Text visible in the badge
     */
    @property({type: String})
    public label?: string;

    /**
     * @summary Add the `small` attribute for a smaller sized badge.
     */
    @property({type: Boolean})
    public small = false;

    /**
     * @summary Use the `filled` attribute for inverted colors, showcasing importance.
     */
    @property({type: Boolean})
    public filled = false;

    /**
     * @summary Use the `pill` attribute for rounded corners.
     */
    @property({type: Boolean})
    public pill = false;

    /**
     * @internal
     */
    @query("#badge")
    public readonly badge?: HTMLSpanElement;

    /**
     * @summary You can use slotted elements to add icons before (or after) the label.
     */
    @queryAssignedNodes({slot: "prefix"})
    protected _prefixSlot!: Array<Node>;

    @queryAssignedNodes({slot: undefined})
    protected _defaultSlot!: Array<Node>;

    /**
     * @summary You can use slotted elements to add icons before (or after) the label.
     */
    @queryAssignedNodes({slot: "suffix"})
    protected _suffixSlot!: Array<Node>;

    static get observedAttributes() {
        return [...super.observedAttributes];
    }

    static override get styles() {
        return [...super.styles, getBadgeStyles(), badge];
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
        this._applyPostUpdateClasses();
    }

    protected _applyPostUpdateClasses(): void {

        // Apply "Icon only" badge styling, if ui-icon the only slot
        if (this._isSlotEmpty(this._prefixSlot) && this._isSlotEmpty(this._suffixSlot) && !this._isSlotEmpty(this._defaultSlot)) {

            const slotElem = this._defaultSlot[0] as HTMLElement;
            if (this.badge && slotElem.tagName.toLowerCase() === this.ICON_TAG_NAME) {
                this.badge.classList.add("ui-badge-icon");
            }
        }
    }

    override getClasses(): { [p: string]: boolean } {
        return {
            "ui-badge": true,
            ...super.getClasses()
        };
    }

    protected _getTheme(): string {
        let theme = "badge";
        if (this.small) theme += " small";
        if (this.filled) theme += " primary";
        if (this.pill) theme += " pill";
        if (this.isNeutral()) theme += " contrast";
        return theme;
    }

    override render() {
        const classes = this.getClasses();
        return html`
            <span id="badge" theme="${this._getTheme()}" class="${classMap(classes)}">
                <slot name="prefix"></slot>
                ${when(this.label,
                        () => html`<span>${this.label}</span>`,
                        () => html`<slot></slot>`
                )}
                <slot name="suffix"></slot>
            </span>
        `;
    }
}
