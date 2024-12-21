import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    .ui-popover {
        width: max-content;
        /*width: 100%;*/
    }
    
    .ui-popover-content {
        padding: var(--ui-button-padding, var(--size-px-1));
        border: var(--ui-popover-border);
        border-radius: var(--ui-popover-border-radius, var(--size-px-1));
        background: white;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        transition: max-height 400ms ease-out;
    }
    
    .ui-popover-content--active {
        max-height: 100%;
    }
    
    .ui-popover-content:not(.ui-popover-content--active) {
        display: none;
    }

    .ui-popover-content:not(.ui-popover-content--filled) {
        --ui-popover-border: 1px solid var(--ui-grayscale-100);
    }

    /*.ui-popover-content:not(.ui-popover-content--gapped) {
        border-top: none;
    }*/
    
    @starting-style {
        .ui-popover-content--active {
            max-height: 0;
        }
    }
`;
