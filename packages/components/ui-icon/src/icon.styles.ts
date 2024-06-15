import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    .ui-icon {
        width: var(--ui-icon-width, var(--ui-icon-size));
        height: var(--ui-icon-height, var(--ui-icon-size));
        font-size: var(--ui-icon-font-size, var(--ui-icon-size));
        color: var(--ui-icon-color, var(--ui-color-400));
        transition: all var(--ui-icon-transition-ms, 100ms) var(--ease-5);
        display: flex;
        align-items: center;
    }
    
    .ui-icon--invisible {
        opacity: 0;
    }

    .ui-size-small {
        --ui-icon-size: var(--ui-font-size-1);
    }

    .ui-size-medium {
        --ui-icon-size: var(--ui-font-size-3);
    }

    .ui-size-large {
        --ui-icon-size: var(--ui-font-size-5);
    }

    .ui-size-xlarge {
        --ui-icon-size: var(--ui-font-size-7);
    }
`;
