import {TreeNode} from "./tree-menu.component.js";

/**
 * Utility function that moves a {@link TreeNode} into another {@link TreeNode}, by adding them to their children.
 * The function takes care for removing the child from the former group, and makes sure no duplicates end up in the list.
 *
 * @param nodeToMove - The node that is moved into a group.
 * @param groupNode - The group node to insert nodeToMove in.
 * @param treeNodes - Full list of nodes in the tree menu.
 * @protected
 */
export function moveNodeToGroup(nodeToMove: TreeNode, groupNode?: TreeNode, treeNodes: TreeNode[] = []): TreeNode[] {
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
    return newNodes;
}
