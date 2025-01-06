import {customElement, property, query} from "lit/decorators.js";
import {autoPlacement, autoUpdate, computePosition, flip, FloatingElement, offset, ReferenceElement, size} from "@floating-ui/dom";
import {html, PropertyValues, TemplateResult} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {UiPlacement} from "@martinaeynl/ui-component-models";
import {UiComponent} from "@martinaeynl/ui-component-utils";

// @ts-ignore
import getPopoverStyles from "./popover.styles";

@customElement("ui-popover")
export class PopoverComponent extends UiComponent {

    @property({type: Boolean})
    public active = false;

    @property({type: String})
    public placement: UiPlacement = UiPlacement.AUTO;

    @property({type: Object})
    public placementOptions?: any; // TODO: Fix this

    /**
     * Synchronizes the width of the popover with the anchor
     */
    @property({type: Boolean})
    public sync = false;

    @property({type: Boolean})
    public gap = false;

    @property({type: Boolean})
    public filled = false;

    @query("#popover-anchor")
    protected _popoverAnchor?: HTMLElement;

    @query("#popover-elem")
    protected _popoverElem?: HTMLElement;

    protected cleanup: any;

    static get styles() {
        return [...super.styles, getPopoverStyles()];
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.cleanup?.();
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if(changedProps.has("sync") && changedProps.get("sync") != null) {
            console.log("Sync has changed!", changedProps.get("sync"), this.sync);
            this.updatePlacement();
            changedProps.delete("sync");
        }
        return super.shouldUpdate(changedProps);
    }

    firstUpdated(changedProps: PropertyValues): void {
        super.firstUpdated(changedProps);
        if (!this._popoverAnchor || !this._popoverElem) {
            console.warn("Could not listen to popover placement updates! Elements did not exist!");
        }
        this.cleanup = autoUpdate(
            this._popoverAnchor as ReferenceElement,
            this._popoverElem as FloatingElement,
            () => this.updatePlacement()
        );
    }

    protected updated(_changedProps: PropertyValues) {
        if(_changedProps.has("active") && _changedProps.get("active") != null) {
            this.dispatchEvent(new CustomEvent("toggle", { detail: this.active }));
        }
        return super.updated(_changedProps);
    }

    getClasses(): { [name: string]: boolean } {
        const classes: { [name: string]: boolean } = {
            "ui-popover": true,
            "ui-popover--disabled": this.disabled,
            "ui-popover--active": this.active
        };
        return {...super.getClasses(), ...classes};
    }

    protected _getContentClasses() {
        return {
            "ui-popover-content": true,
            "ui-popover-content--active": this.active,
            "ui-popover-content--gapped": this.gap,
            "ui-popover-content--filled": this.filled
        };
    }

    protected render(): TemplateResult {
        const classes = this.getClasses();
        const contentClasses = this._getContentClasses();
        return html`
            <div part="base" id="popover-wrapper" class=${classMap(classes)}>
                <div id="popover-anchor" style="width: inherit;">
                    <slot name="anchor" @click=${this._onAnchorClick} @slotchange=${this._onAnchorChange}></slot>
                </div>
                <div id="popover-elem" class=${classMap(contentClasses)}>
                    <slot @slotchange=${this._onContentChange}></slot>
                </div>
            </div>
        `;
    }

    protected async _onAnchorChange(event: Event) {
        console.log("onAnchorChange", event);
    }

    protected async _onContentChange(event: Event) {
        console.log("onContentChange", event);
    }

    protected async _onAnchorClick(ev: PointerEvent) {
        this.toggle();
    }

    /**
     * Function that adjusts the placement using the floating-ui dependency.
     * Most of the code is shown as an example within their documentation.
     */
    public async updatePlacement() {
        if (!this._popoverAnchor || !this._popoverElem) {
            console.warn("Could not update popover placement! Elements did not exist!");
        }
        let middleware: any[] = [
            offset(this.gap ? 4 : 0)
        ];
        if (this.sync) {
            middleware.push(size({
                apply({rects, elements}): any {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`
                    });
                }
            }));
        }
        if (this.placement === UiPlacement.AUTO) {
            middleware.push(autoPlacement(this.placementOptions));
        }
        middleware.push(flip());
        computePosition(this._popoverAnchor as ReferenceElement, this._popoverElem as FloatingElement, {
            placement: this.placement != UiPlacement.AUTO ? this.placement!.toString() as any : undefined,
            middleware: middleware
        }).then(({x, y}) => {
            Object.assign(this._popoverElem!.style, {
                left: `${x}px`,
                top: `${y}px`,
                width: this.sync ? undefined : "auto"
            });
        });
    }

    public open() {
        this.active = true;
    }

    public close() {
        this.active = false;
    }

    public toggle(state?: boolean) {
        if (state) {
            this.active = state;
        } else {
            this.active = !this.active;
        }
    }
}
