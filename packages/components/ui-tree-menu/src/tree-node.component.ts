import {UiComponent} from "@martinaeynl/ui-component-utils";
import {css, html, TemplateResult} from "lit";
import {property} from "lit/decorators.js";

const styles = css`
    * {
        box-sizing: border-box;
    }
    :host {
        width: 100%;
        height: var(--ui-tree-node-height, 44px);
        padding: 6px 12px 6px var(--ui-tree-node-indent, 24px);
        background: var(--ui-tree-node-background, transparent);
        border-left: 4px solid transparent;
        display: flex;
        align-items: center;
        gap: var(--ui-tree-node-gap, 8px);
        overflow: hidden;
        user-select: none;
    }

    :host(:not([readonly])) {
        cursor: pointer;
    }
    
    :host([readonly]) {
        cursor: not-allowed;
    }

    :host(:not([readonly]):hover) {
        background: var(--ui-tree-node-backgrond--hovered, var(--ui-grayscale-10));
    }
    
    :host([selected]) {
        background: var(--ui-tree-node-background--selected, var(--ui-grayscale-25));
        border-left: 4px solid var(--ui-tree-node-color--selected, var(--ui-color-400));
    }

    ::slotted(*:not([slot])) {
        flex: 1;
    }
`;

/**
 * @slot prefix - Appends elements to the left hand side of the node, commonly used for icons.
 * @slot - Default slot for the main content, commonly used for text.
 * @slot suffix - Appends elements to the right hand side of the node.
 *
 * @cssprop --ui-tree-node-height - Controls the height of the node
 * @cssprop --ui-tree-node-indent - Controls the left padding of the node
 *
 * @cssprop --ui-tree-node-background - Sets the default background
 * @cssprop --ui-tree-node-background--hovered - Sets the background while hovering
 * @cssprop --ui-tree-node-background--selected - Sets the background when selected
 *
 * @cssprop --ui-tree-node-color--selected - Sets the primary color of the node when selected
 */
export class TreeNodeComponent extends UiComponent {

    /**
     * HTML attribute that only applies CSS, showing this node cannot be interacted with.
     */
    @property({type: Boolean, reflect: true})
    public readonly = false;

    /**
     * HTML attribute that only applies CSS, marking the node as 'selected'.
     */
    @property({type: Boolean, reflect: true})
    public selected = false;

    static get styles() {
        return [...super.styles, styles];
    }

    protected render(): TemplateResult {
        return html`
            <slot name="prefix"></slot>
            <slot></slot>
            <slot name="suffix"></slot>
        `;
    }
}
