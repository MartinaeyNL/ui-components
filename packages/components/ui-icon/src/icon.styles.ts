import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }

    :host([size="small"]) {
        --ui-icon-size: var(--ui-font-size-2);
    }

    :host([size="medium"]) {
        --ui-icon-size: var(--ui-font-size-5);
    }

    :host([size="large"]) {
        --ui-icon-size: var(--ui-font-size-6);
    }

    :host([size="xlarge"]) {
        --ui-icon-size: var(--ui-font-size-8);
    }
    
    .ui-icon {
        width: var(--ui-icon-width, var(--ui-icon-size, var(--ui-font-size-5)));
        height: var(--ui-icon-height, var(--ui-icon-size, var(--ui-font-size-5)));
        font-size: var(--ui-icon-font-size, var(--ui-icon-size, var(--ui-font-size-5)));
        color: var(--ui-icon-color, var(--ui-color-400));
        transition: all var(--ui-icon-transition-ms, 100ms) var(--ease-5);
        display: flex;
        align-items: center;
    }
    
    .ui-icon--invisible {
        opacity: 0;
    }
    
    .ui-dark {
        --ui-icon-color: var(--ui-color-0);
    }
`;
