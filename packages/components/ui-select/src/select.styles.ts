import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    .ui-select {
        display: flex;
    }
    
    .ui-select-anchor {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: var(--ui-select-border, 1px solid var(--ui-grayscale-100));
        padding: var(--ui-select-padding, var(--size-px-1) var(--size-px-3));
        height: var(--ui-select-height);
        background: var(--ui-select-background);
        border-radius: var(--ui-select-border-radius, var(--size-px-1));
        color: var(--ui-select-color);
        cursor: var(--ui-select-cursor);
        transition: var(--ui-select-transition, all 100ms var(--ease-5));
        font-weight: var(--ui-select-font-weight, var(--font-weight-4));
        font-size: var(--ui-select-font-size, var(--ui-font-size-1));
        min-width: var(--ui-select-min-width);
        gap: var(--ui-select-gap, var(--size-px-3));
        text-decoration: none;
    }

    .ui-size-small {
        --ui-select-height: var(--ui-size-5);
        --ui-select-min-width: var(--ui-size-9);
        --ui-select-font-size: var(--ui-font-size-0);
    }

    .ui-size-medium {
        --ui-select-height: var(--ui-size-7);
        --ui-select-min-width: var(--ui-size-10);
        --ui-select-font-size: var(--ui-font-size-1);
    }

    .ui-size-large {
        --ui-select-height: var(--ui-size-8);
        --ui-select-min-width: var(--ui-size-11);
        --ui-select-font-size: var(--ui-font-size-2);
    }

    .ui-size-xlarge {
        --ui-select-height: var(--ui-size-9);
        --ui-select-min-width: var(--ui-size-12);
        --ui-select-font-size: var(--ui-font-size-3);
    }
`
