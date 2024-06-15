import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    .ui-popover {
        position: relative;
    }
    
    .ui-popover-content {
        position: absolute;
        isolation: isolate;
        width: 100%;
    }
    
    .ui-popover-content:not(.ui-popover-content--active) {
        display: none;
    }
`;
