import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, PropertyValues, TemplateResult} from "lit";
import {property, queryAll} from "lit/decorators.js";
import {map} from "lit/directives/map.js";

// @ts-ignore
import getTreeMenuStyles from "./tree-menu.styles";
import {TreeNodeComponent} from "./tree-node.component.js";
import {TreeGroupComponent} from "./tree-group.component.js";

export interface TreeNode {
    children?: TreeNode[];
    label: string;
    hidden?: boolean;
    readonly?: boolean;
    selected?: boolean; // Only acts as initial state
    expandable?: boolean;
    expanded?: boolean;
}

export enum TreeMenuSelection {
    SINGLE = "single", MULTI = "multi", LEAF = "leaf"
}

export class TreeMenuComponent extends UiComponent {

    /**
     * List of node items in the menu.
     * Uses the {@link TreeNode} format for rendering the {@link TreeNodeComponent} elements.
     */
    @property({type: Array})
    public nodes: TreeNode[] = [];

    @property({type: String})
    public readonly selection: TreeMenuSelection = TreeMenuSelection.LEAF;

    @property({type: Boolean})
    public draggable = false;

    @queryAll("ui-tree-node")
    protected _uiNodes?: NodeListOf<TreeNodeComponent>;

    @queryAll("ui-tree-group")
    protected _uiGroups?: NodeListOf<TreeGroupComponent>;

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

    protected _getTreeTemplate(nodes: TreeNode[]): TemplateResult {
        return html`
            <ol id="tree-list">
                ${map(nodes, node => this._getNodeTemplate(node))}
            </ol>
        `;
    }

    protected _getNodeTemplate(node: TreeNode): TemplateResult {
        const isGroup = node.children;
        if (isGroup) {
            return this._getGroupNodeTemplate(node);
        } else {
            return this._getSingleNodeTemplate(node);
        }
    }

    protected _getGroupNodeTemplate(node: TreeNode): TemplateResult {
        const leaf = this.selection === TreeMenuSelection.LEAF;
        return html`
            <li>
                <ui-tree-group ?leaf=${leaf} ?expanded=${node.expanded}>
                    <ui-tree-node slot="parent" ?readonly=${leaf} @click=${this._onTreeGroupClick}
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

    protected _onTreeGroupClick(ev: PointerEvent) {
        const elem = ev.currentTarget as TreeNodeComponent;
        const group = elem.parentElement as TreeGroupComponent;
        const previousState = elem.selected;
        switch (this.selection) {
            case TreeMenuSelection.LEAF: {
                return;
            }
            case TreeMenuSelection.MULTI: {
                this._deselectAllNodes();
                previousState ? group.deselectAll() : group.selectAll();
                return;
            }
            case TreeMenuSelection.SINGLE: {
                this._deselectAllNodes();
                previousState ? group.deselect() : group.select();
                return;
            }
        }
    }

    protected _onDragEnterGroup(ev: DragEvent) {
        if(this.draggable) (ev.currentTarget as HTMLElement).classList.add("drophover");
    }

    protected _onDragOverGroup(ev: DragEvent) {
        if(this.draggable) ev.preventDefault(); // allows dropping the node on the group
    }

    protected _onDragLeaveGroup(ev: DragEvent) {
        if(this.draggable) (ev.currentTarget as HTMLElement).classList.remove("drophover");
    }

    protected _onDragDropGroup(ev: DragEvent, groupNode?: TreeNode) {
        if(this.draggable) {
            ev.preventDefault();
            (ev.currentTarget as HTMLElement).classList.remove("drophover");
            const data = ev.dataTransfer?.getData("treeNode");
            if(data) {
                const node = JSON.parse(data) as TreeNode;
                if(node) {
                    this._moveNodeToGroup(node, groupNode);
                }
            }
        }
    }

    protected _moveNodeToGroup(nodeToMove: TreeNode, groupNode?: TreeNode, treeNodes = this.nodes): TreeNode[] {
        const deepEqual = (x: TreeNode, y: TreeNode) => JSON.stringify(x) === JSON.stringify(y);

        function filterAndAdd(nodes: TreeNode[]): TreeNode[] {
            return nodes.map(node => {

                if (deepEqual(node, nodeToMove)) {
                    return null; // Removes the node from its original position
                }

                const newNode: TreeNode = { ...node };

                // Recursively loop through children
                if (newNode.children) {
                    newNode.children = filterAndAdd(newNode.children).filter(child => child !== null);
                }

                // If the currently looped node is the target group node, add the node to its children
                if (groupNode && deepEqual(node, groupNode)) {
                    newNode.children = newNode.children ? [...newNode.children, nodeToMove] : [nodeToMove];
                }
                return newNode;

            }).filter(node => node !== null);
        }

        // Start the recursive function
        const newNodes = filterAndAdd(treeNodes);

        // If no groupNode is provided, add the nodeToMove to the top level
        if (!groupNode) {
            newNodes.push(nodeToMove);
        }

        this.nodes = newNodes;
        return this.nodes;
    }

    protected _getSingleNodeTemplate(node: TreeNode): TemplateResult {
        return html`
            <li draggable=${this.draggable} @dragstart=${(ev: DragEvent) => this._onDragStart(ev, node)}>
                <ui-tree-node ?selected=${node.selected} ?readonly=${node.readonly} @click="${this._onTreeNodeClick}">
                    <ui-icon slot="prefix" icon="flag" size="small"></ui-icon>
                    <span>${node.label}</span>
                    <span slot="suffix">Suffix</span>
                </ui-tree-node>
            </li>
        `;
    }

    protected _onTreeNodeClick(ev: PointerEvent) {
        const node = ev.currentTarget as TreeNodeComponent;
        if (node) {
            this._selectNode(node);
        }
    }

    protected _onDragStart(ev: DragEvent, node: TreeNode) {
        if(ev.target) {
            ev.dataTransfer?.setData("treeNode", JSON.stringify(node));
        } else {
            ev.preventDefault();
        }
    }

    protected _selectNode(node: TreeNodeComponent) {

        // If SINGLE or LEAF, deselect all other nodes
        if (this.selection === TreeMenuSelection.SINGLE || this.selection === TreeMenuSelection.LEAF) {
            this._deselectAllNodes();
        }
        // If MULTI, the selected state should be toggled. Otherwise, it's always set to TRUE.
        if (this.selection === TreeMenuSelection.MULTI) {
            node.selected = !node.selected;
        } else {
            node.selected = true;
        }
    }

    protected _deselectAllNodes() {
        (this._uiGroups || []).forEach(uiGroup => uiGroup.deselect());
        (this._uiNodes || []).forEach(uiNode => uiNode.selected = false);
    }

    protected _getErrorTemplate(): TemplateResult {
        return html``;
    }
}
