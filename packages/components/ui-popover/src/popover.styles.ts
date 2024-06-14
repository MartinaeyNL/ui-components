import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    .ui-popover-content {
        position: absolute;
        isolation: isolate;
    }
    
    .ui-popover-content:not(.ui-popover-content--active) {
        display: none;
    }
`;
