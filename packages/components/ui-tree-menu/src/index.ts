import { TreeMenuComponent } from "./tree-menu.component.js";
import { TreeNodeComponent } from "./tree-node.component.js";
import { TreeGroupComponent } from "./tree-group.component.js";

customElements.define("ui-tree-menu", TreeMenuComponent);
customElements.define("ui-tree-node", TreeNodeComponent);
customElements.define("ui-tree-group", TreeGroupComponent);

export default TreeMenuComponent;
