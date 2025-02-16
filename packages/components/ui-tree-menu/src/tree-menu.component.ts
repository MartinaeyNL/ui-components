import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, PropertyValues, TemplateResult} from "lit";
import {property, queryAll} from "lit/decorators.js";
import {map} from "lit/directives/map.js";
import {TreeNodeComponent} from "./tree-node.component.js";
import {TreeGroupComponent} from "./tree-group.component.js";
import {moveNodeToGroup} from "./util.js";

// @ts-ignore
import getTreeMenuStyles from "./tree-menu.styles";

/**
 * The TreeNode model for constructing a node within the tree.
 */
export interface TreeNode {
    children?: TreeNode[];
    label: string;
    hidden?: boolean;
    readonly?: boolean;
    selected?: boolean; // Only acts as initial state
    expandable?: boolean;
    expanded?: boolean;
}

/**
 * List of possible options for tree menu selection.
 * The order within the enum is based on restrictiveness.
 *
 * - **LEAF** - only allows a single node to be selected, and forbids the selection of any parent node.
 * - **SINGLE** - only allows a single node to be selected, but does allow the selection of the parent node.
 * - **MULTI** - allows selecting multiple nodes using keyboard controls. (control and shift)
 */
export enum TreeMenuSelection {
    LEAF = "leaf", SINGLE = "single", MULTI = "multi"
}

/**
 * Model for the SELECT event that {@link TreeMenuComponent} can dispatch.
 * Once a node is selected, a list of all the selected nodes will be shared with the consumer elements.
 */
export class UiTreeSelectEvent extends CustomEvent<TreeNode[]> {

    public static readonly NAME = "ui-tree-select";

    constructor(nodes: TreeNode[]) {
        super(UiTreeSelectEvent.NAME, {
            bubbles: true,
            composed: true,
            detail: nodes
        });
    }
}

/**
 * @event ui-tree-select - "Triggers upon selecting a node, and dispatches a list of the nodes selected"
 */
export class TreeMenuComponent extends UiComponent {

    /**
     * List of node items in the menu.
     * Uses the {@link TreeNode} format for rendering the {@link TreeNodeComponent} elements.
     */
    @property({type: Array})
    public nodes: TreeNode[] = [];

    /**
     * @summary Changes the allowed selection method within the tree.
     * See {@link TreeMenuSelection} for more information.
     */
    @property({type: String})
    public readonly selection: TreeMenuSelection = TreeMenuSelection.LEAF;

    /**
     * Disables and enables dragging of nodes into groups.
     */
    @property({type: Boolean})
    public draggable = false;

    @queryAll("ui-tree-node")
    protected _uiNodes?: NodeListOf<TreeNodeComponent>;

    @queryAll("ui-tree-group")
    protected _uiGroups?: NodeListOf<TreeGroupComponent>;

    // A Map<TreeNode, unique generated ID> to easily identify which TreeNode has been used to render a TreeNodeComponent.
    protected _treeNodeCache: Map<TreeNode, string> = new Map<TreeNode, string>;

    // Caches the last selected component for use in multi select.
    protected _lastSelectedNode?: TreeNodeComponent;

    static get styles() {
        return [...super.styles, getTreeMenuStyles()];
    }

    protected willUpdate(changedProps: PropertyValues) {
        if(changedProps.has("selection") && this.selection) {
            this._deselectAllNodes();
        }
        return super.willUpdate(changedProps);
    }

    render(): TemplateResult {
        return html`
            <div id="tree-container">
                ${this._getTreeTemplate(this.nodes)}
                ${this._getErrorTemplate()}
            </div>
        `;
    }

    /* ------------------------------------------------------------- */
    //region HTML Templates functions
    /* ------------------------------------------------------------- */

    /**
     * Returns a HTML template that displays the tree menu.
     * @param nodes - List of nodes to be rendered
     * @protected
     */
    protected _getTreeTemplate(nodes: TreeNode[]): TemplateResult {
        return html`
            <ol id="tree-list">
                ${map(nodes, node => this._getNodeTemplate(node))}
            </ol>
        `;
    }

    /**
     * Returns an HTML template for displaying a single node within a tree menu. This can both be a group or a solo node.
     * @param node - Node to be rendered
     * @protected
     */
    protected _getNodeTemplate(node: TreeNode): TemplateResult {
        const isGroup = node.children;
        if (isGroup) {
            return this._getGroupNodeTemplate(node);
        } else {
            return this._getSingleNodeTemplate(node);
        }
    }

    /**
     * Returns an HTML template for displaying a single node
     * @param node - Node to be rendered
     * @protected
     */
    protected _getSingleNodeTemplate(node: TreeNode): TemplateResult {
        const randomId = this._setTreeNodeId(node);
        return html`
            <li draggable=${this.draggable} @dragstart=${(ev: DragEvent) => this._onDragStart(ev, node)}>
                <ui-tree-node id=${randomId} ?selected=${node.selected} ?readonly=${node.readonly} @click="${this._onTreeNodeClick}">
                    <ui-icon slot="prefix" icon="flag" size="small"></ui-icon>
                    <span>${node.label}</span>
                    <span slot="suffix">Suffix</span>
                </ui-tree-node>
            </li>
        `;
    }

    /**
     * Returns a HTML template for rendering a group node (aka a node with children)
     * @param node - Node to be rendered
     * @protected
     */
    protected _getGroupNodeTemplate(node: TreeNode): TemplateResult {
        const leaf = this.selection === TreeMenuSelection.LEAF;
        const randomId = this._setTreeNodeId(node);
        return html`
            <li>
                <ui-tree-group ?leaf=${leaf} ?expanded=${node.expanded}>
                    <ui-tree-node slot="parent" id=${randomId} ?readonly=${leaf} @click=${this._onTreeGroupClick}
                                  @dragover=${this._onDragOverGroup}
                                  @dragenter=${this._onDragEnterGroup}
                                  @dragleave=${this._onDragLeaveGroup}
                                  @drop=${(ev: DragEvent) => this._onDragDropGroup(ev, node)}>
                        <ui-icon slot="prefix" icon="folder-fill" size="small"></ui-icon>
                        <span>${node.label}</span>
                        <span slot="suffix">Group Suffix</span>
                    </ui-tree-node>
                    ${map(node.children, n => this._getNodeTemplate(n))}
                </ui-tree-group>
            </li>
        `;
    }

    /**
     * Returns a HTML template for displaying errors
     * @protected
     */
    protected _getErrorTemplate(): TemplateResult {
        return html``;
    }

    //endregion

    /* ------------------------------------------------------------- */
    //region Event callback functions
    /* ------------------------------------------------------------- */

    /**
     * HTML callback event for clicking on a group node. (aka a node with children)
     * Based on the configured {@link TreeMenuSelection}, it single- or multi selects the nodes.
     * @protected
     */
    protected _onTreeGroupClick(ev: PointerEvent) {
        const elem = ev.currentTarget as TreeNodeComponent;
        const group = elem.parentElement as TreeGroupComponent;

        switch (this.selection) {
            case TreeMenuSelection.LEAF: {
                return; // Group node cannot be selected when in leaf
            }
            case TreeMenuSelection.MULTI: {

                // Shift selects all nodes between the previous selected, and this one.
                if(ev.shiftKey && this._lastSelectedNode) {
                    const nodes = Array.from(this._uiNodes || []);
                    const parentNode = group.getGroupNode();
                    if(parentNode) {
                        const indexOfClickedNode = nodes.indexOf(parentNode);
                        const indexOfPreviousNode = nodes.indexOf(this._lastSelectedNode);
                        this._selectNodesBetween(nodes, indexOfClickedNode, indexOfPreviousNode);
                        return;
                    }
                // Ctrl multi selects without deselecting the previous one.
                } else if(ev.ctrlKey) {
                    group.select();
                    return;
                }
                // Otherwise, select node like normal
                this._deselectAllNodes();
                group.select();
                return;
            }
            case TreeMenuSelection.SINGLE: {
                this._deselectAllNodes();
                group.select();
                return;
            }
        }
    }

    /**
     * HTML callback event for when a child node of the tree gets clicked on.
     * @protected
     */
    protected _onTreeNodeClick(ev: PointerEvent) {
        const node = ev.currentTarget as TreeNodeComponent;
        if (node) {
            switch (this.selection) {
                case TreeMenuSelection.MULTI: {

                    // Shift selects all nodes between the previous selected, and this one.
                    if(ev.shiftKey && this._lastSelectedNode) {
                        const nodes = Array.from(this._uiNodes || []);
                        const prevIndex = nodes.indexOf(this._lastSelectedNode);
                        const clickedIndex = nodes.indexOf(node);
                        if (prevIndex > -1 && clickedIndex > -1) {
                            this._selectNodesBetween(nodes, prevIndex, clickedIndex);
                            return;
                        }
                    // Ctrl multi selects without deselecting the previous one.
                    } else if(ev.ctrlKey) {
                        this._selectNode(node);
                        return;
                    }
                    // Otherwise select the node like normal
                    this._deselectAllNodes();
                    this._selectNode(node);
                    return;
                }
                default: {
                    this._deselectAllNodes();
                    this._selectNode(node);
                    return;
                }
            }
        }
    }

    //endregion

    /* ------------------------------------------------------------- */
    //region Drag-and-drop callback functions
    /* ------------------------------------------------------------- */

    /** HTML callback event for 'dragstart' (the moment when a drag gesture is started) */
    protected _onDragStart(ev: DragEvent, node: TreeNode) {
        if(ev.target) {
            ev.dataTransfer?.setData("treeNode", JSON.stringify(node));
        } else {
            ev.preventDefault();
        }
    }

    /** HTML callback event for 'dragenter', so when a node is dragged on top of a group node */
    protected _onDragEnterGroup(ev: DragEvent) {
        if(this.draggable) (ev.currentTarget as HTMLElement).classList.add("drophover");
    }

    /** HTML callback event for 'dragover', so while a node is dragged over a group node */
    protected _onDragOverGroup(ev: DragEvent) {
        if(this.draggable) ev.preventDefault(); // allows dropping the node on the group
    }

    /** HTML callback event for 'dragleave', so after a node has been dragged over a group node */
    protected _onDragLeaveGroup(ev: DragEvent) {
        if(this.draggable) (ev.currentTarget as HTMLElement).classList.remove("drophover");
    }

    /** HTML callback event for when a node is dropped onto a group node, after dragging it over */
    protected _onDragDropGroup(ev: DragEvent, groupNode?: TreeNode) {
        if(this.draggable) {
            ev.preventDefault();
            (ev.currentTarget as HTMLElement).classList.remove("drophover");
            const data = ev.dataTransfer?.getData("treeNode");
            if(data) {
                const node = JSON.parse(data) as TreeNode;
                if(node) {
                    this.nodes = moveNodeToGroup(node, groupNode, this.nodes);
                }
            }
        }
    }

    //endregion

    /* ------------------------------------------------------------- */

    /**
     * Selects the node using the HTML attribute 'selected' of {@link TreeNodeComponent}
     * @param node - Node to be selected
     * @param notify - Boolean whether to notify the HTML parents of an ui-tree-select.
     * @protected
     */
    protected _selectNode(node: TreeNodeComponent, notify = true) {
        node.selected = true;
        this._lastSelectedNode = node;
        if(notify) {
            this._notifyNodesSelect();
        }
    }

    /**
     * Multi-selects the nodes between two indexes in a list of {@link TreeNodeComponent}.
     * @param nodes - List of nodes in the tree menu
     * @param index1 - Start index of the nodes to select
     * @param index2 - End index of the nodes to select
     * @param notify - Boolean whether to notify the HTML parents of an ui-tree-select.
     * @protected
     */
    protected _selectNodesBetween(nodes: TreeNodeComponent[], index1: number, index2: number, notify = true) {
        if(index1 < index2) {
            for(let x = index1; x <= index2; x++) {
                if(nodes[x]) this._selectNode(nodes[x], false);
            }
            if(notify) this._notifyNodesSelect();

        } else if(index1 > index2) {
            for(let x = index2; x <= index1; x++) {
                if(nodes[x]) this._selectNode(nodes[x], false);
            }
            if(notify) this._notifyNodesSelect();

        } else {
            return;
        }
    }

    /**
     * Function that notifies parent HTMLElements that a tree node got selected.
     * It dispatches the {@link UiTreeSelectEvent}, which includes a list of the selected nodes.
     * @protected
     */
    protected async _notifyNodesSelect() {
        await this.getUpdateComplete();

        // Get the list of selected TreeNodeComponent elements in the UI.
        const selectedUiNodes = Array.from(this._uiNodes || []).filter(n => n.selected);

        // Get the list of cached generated IDs (for tracking which TreeNode belongs to which TreeNodeComponent)
        const treeNodeEntries = Array.from(this._treeNodeCache.entries());

        // Find the generated IDs in the list of TreeNodeComponents, and compare the element ID
        const selectedNodes = selectedUiNodes.map(component => treeNodeEntries
            .find(v => v[1] === component.id))
            .map(x => x?.[0])
            .filter(n => n !== undefined)
        ;

        // Dispatch an event with the selected tree nodes.
        this.dispatchEvent(new UiTreeSelectEvent(selectedNodes));
    }

    /**
     * Utility function that deselects all tree nodes.
     * @protected
     */
    protected _deselectAllNodes() {
        (this._uiGroups || []).forEach(uiGroup => uiGroup.deselect());
        (this._uiNodes || []).forEach(uiNode => uiNode.selected = false);
    }

    /**
     * Function that caches a random ID into a key-value storage, linking the {@link TreeNode} with a generated ID.
     * This generated ID can be used somewhere else, for example in an HTMLElement ID as a unique identifier.
     * @protected
     */
    protected _setTreeNodeId(node: TreeNode, randomId = Math.random().toString(36).substring(2, 11)): string {
        this._treeNodeCache.set(node, randomId);
        return randomId;
    }
}
