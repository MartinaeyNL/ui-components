import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    #tree-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ui-tree-group > ui-tree-node > * {
        pointer-events: none;
    }
    
    ui-tree-group > ui-tree-node.drophover {
        background: var(--ui-grayscale-50);
    }
`;
