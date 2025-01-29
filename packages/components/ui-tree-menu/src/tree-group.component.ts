import {UiComponent} from "@martinaeynl/ui-component-utils";
import {css, html, PropertyValues, TemplateResult} from "lit";
import {property, query, queryAssignedElements} from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import "@martinaeynl/ui-components-icon";
import {TreeNodeComponent} from "./tree-node.component.js";

const getStyles = () => css`
    * {
        box-sizing: border-box;
    }
    
    :host {
        position: relative;
    }

    ol {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    ::slotted(*:not([slot="parent"])) {
        --ui-tree-node-padding: 6px 12px 6px 48px
    }
    
    ::slotted(*[slot="parent"]) {
        cursor: pointer;
    }
    
    #chevron {
        position: absolute;
        height: 44px;
        display: flex;
        align-items: center;
        aspect-ratio: 1/1.25;
        padding-left: 8px;
    }

    :host(:not([readonly])) > #chevron {
        cursor: pointer;
    }
`;

/**
 * @slot - Default slot for child nodes within the group
 * @slot parent - Slot for inserting a parent node
 * @csspart chevron - The chevron icon element for expanding/collapsing the group.
 */
export class TreeGroupComponent extends UiComponent {

    /**
     * Determines the visibility of child nodes.
     * Setting this to `false` hides them, and acts as a 'collapsed' state.
     */
    @property({type: Boolean, reflect: true})
    public expanded = false;

    /**
     * Only allows child nodes to be selected, making the expander (parent node) readonly.
     * If this is set to false, only the chevron icon can be used to collapse/expand the list.
     */
    @property({type: Boolean})
    public readonly leaf = false;

    @queryAssignedElements({slot: undefined})
    protected _childNodes?: Array<HTMLLIElement>;

    @queryAssignedElements({slot: "parent"})
    protected _parentNodes?: Array<TreeNodeComponent>;

    /** A click event listener on the component, used for selecting, expanding, and collapsing the group */
    protected _slotClickListener = (_e: MouseEvent) => this.leaf ? this._onExpandToggle() : null;

    /** A click event listener on the chevron, used for expanding/collapsing the group */
    protected _chevronClickListener = (_e: MouseEvent) => this._onExpandToggle();

    static get styles() {
        return [getStyles()];
    }

    /** Selects the group (parent) node. */
    public select() {
        const groupNode = this.getGroupNode();
        if(!this.leaf && groupNode) {
            groupNode.selected = true;
        }
    }

    /** Selects the group node itself, and all children nodes within that group. */
    public selectAll() {
        this.select();
        this.getChildNodes().forEach(node => node.selected = true);
    }

    /** Deselects the group (parent) node. */
    public deselect() {
        const groupNode = this.getGroupNode();
        if(groupNode) {
            groupNode.selected = false;
        }
    }

    /** Deselects the group node itself, and all children nodes within that group. */
    public deselectAll() {
        this.deselect();
        this.getChildNodes().forEach(node => node.selected = false);
    }

    /** Returns the group (parent) node ({@link TreeNodeComponent}) using a query selector. */
    public getGroupNode(): TreeNodeComponent | undefined {
        return this._parentNodes?.[0];
    }

    /** Returns a list of all children nodes ({@link TreeNodeComponent}) within the group, using a query selector. */
    public getChildNodes(): TreeNodeComponent[] {
        return Array.from(this._childNodes || [])
            .map(n => n.querySelector('ui-tree-node') as TreeNodeComponent | null)
            .filter(n => n != null);
    }


    firstUpdated(changedProps: PropertyValues) {
        this._parentNodes?.forEach(elem => {
            elem.addEventListener("click", this._slotClickListener);
        });
        return super.firstUpdated(changedProps);
    }

    disconnectedCallback() {
        this._parentNodes?.forEach(elem => {
            elem.removeEventListener("click", this._slotClickListener);
        });
        super.disconnectedCallback();
    }

    render(): TemplateResult {
        return html`
            ${when(!this.readonly, () => this._getIconTemplate(this.expanded))}
            <slot name="parent"></slot>
            <ol ?hidden=${!this.expanded}>
                <slot></slot>
            </ol>
        `;
    }

    /**
     * Returns an HTML template that represents the icon for this group.
     * @param expanded State of the group
     * @protected
     */
    protected _getIconTemplate(expanded = false): TemplateResult {
        return html`
            <ui-icon id="chevron" part="chevron" size="small" static
                     icon="${expanded ? "chevron-down" : "chevron-right"}"
                     @click="${this._chevronClickListener}"
            ></ui-icon>
        `;
    }

    /**
     * Function that expands/collapses the group, changing the visibility of the child nodes.
     * @protected
     */
    protected _onExpandToggle() {
        this.expanded = !this.expanded;
    }
}
