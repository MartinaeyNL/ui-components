import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }

    :host([size="small"]) {
        --ui-button-height: var(--ui-size-5);
        --ui-button-min-width: var(--ui-size-9);
        --ui-button-font-size: var(--ui-font-size-0);
    }

    :host([size="medium"]) {
        --ui-button-height: var(--ui-size-7);
        --ui-button-min-width: var(--ui-size-10);
        --ui-button-font-size: var(--ui-font-size-1);
    }

    :host([size="large"]) {
        --ui-button-height: var(--ui-size-8);
        --ui-button-min-width: var(--ui-size-11);
        --ui-button-font-size: var(--ui-font-size-2);
    }

    :host([size="xlarge"]) {
        --ui-button-height: var(--ui-size-9);
        --ui-button-min-width: var(--ui-size-12);
        --ui-button-font-size: var(--ui-font-size-3);
    }

    .ui-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--ui-button-gap, var(--size-px-2));
        padding: var(--ui-button-padding, var(--size-px-1) calc(var(--ui-button-height, var(--ui-size-7)) / 2));
        background: var(--ui-button-background);
        border: var(--ui-button-border);
        border-radius: var(--ui-button-border-radius, var(--size-px-1));
        color: var(--ui-button-color);
        cursor: var(--ui-button-cursor);
        transition: var(--ui-button-transition, all 100ms var(--ease-5));
        font-weight: var(--ui-button-font-weight, var(--font-weight-7));
        font-size: var(--ui-button-font-size, var(--ui-font-size-1));
        height: var(--ui-button-height, var(--ui-size-7));
        min-width: var(--ui-button-min-width, var(--ui-size-10));
        text-decoration: none;
    }

    .ui-button--disabled {
        --ui-button-cursor: var(--ui-button-cursor--disabled, not-allowed);
        opacity: var(--ui-button-opacity--disabled, 0.5);
    }
    
    .ui-button:hover:not([disabled]) {
        --ui-button-cursor: var(--ui-button-cursor--hover, pointer);
    }

    :host(:not([static])) > .ui-button:hover:not([disabled]) {
        --ui-button-background: var(--ui-button-background--hover);
        --ui-button-border: var(--ui-button-border--hover);
        --ui-button-color: var(--ui-button-color--hover);
        --ui-icon-color: var(--ui-button-color--hover);
    }
    
    .ui-button:active:not([disabled]) {
        --ui-button-cursor: var(--ui-button-cursor--active, pointer);
    }
    
    :host(:not([static])) > .ui-button:active:not([disabled]) {
        --ui-button-background: var(--ui-button-background--active);
        --ui-button-border: var(--ui-button-border--active);
        --ui-button-color: var(--ui-button-color--active);
    }

    /* ------------------------------
            Outlined button CSS
     ------------------------------ */
    
    .ui-button--outlined {
        --ui-button-border: var(--ui-button-border--outlined, 1px solid var(--ui-color-400));
        --ui-button-border--hover: var(--ui-button-border--outlined--hover, 1px solid var(--ui-color-400));
        --ui-button-border--active: var(--ui-button-border--outlined--active, 1px solid var(--ui-color-600));
        --ui-button-background: var(--ui-button-background--outlined, transparent);
        --ui-button-background--hover: var(--ui-button-background--outlined--hover, var(--ui-color-400));
        --ui-button-background--active: var(--ui-button-background--outlined--active, var(--ui-color-600));
        --ui-button-color: var(--ui-button-color--outlined, var(--ui-color-400));
        --ui-button-color--hover: var(--ui-button-color--outlined--hover, var(--ui-color-0));
        --ui-button-color--active: var(--ui-button-color--outlined--active, var(--ui-color-0));
    }

    .ui-button--filled {
        --ui-button-border: var(--ui-button-border--outlined, 1px solid var(--ui-color-400));
        --ui-button-border--hover: var(--ui-button-border--outlined--hover, 1px solid var(--ui-color-300));
        --ui-button-border--active: var(--ui-button-border--outlined--active, 1px solid var(--ui-color-200));
        --ui-button-background: var(--ui-button-background--filled, var(--ui-color-500));
        --ui-button-background--hover: var(--ui-button-background--filled--hover, var(--ui-color-300));
        --ui-button-background--active: var(--ui-button-background--filled--active, var(--ui-color-200));
        --ui-button-color: var(--ui-button-color--filled, var(--ui-color-0));
        --ui-button-color--hover: var(--ui-button-color--filled--hover, var(--ui-color-0));
        --ui-button-color--active: var(--ui-button-color--filled--active, var(--ui-color-0));
    }
     
    .ui-button--rounded {
        --ui-button-border-radius: var(--ui-button-border-radius--rounded, var(--ui-button-height, var(--ui-size-7)));
        --ui-button-padding: var(--ui-button-padding--rounded, var(--size-px-1) calc(var(--ui-button-height, var(--ui-size-7)) / 2));
    }
    
    .ui-button--prefixed-icon {
        padding: var(--ui-button-padding, var(--size-px-1) calc(var(--ui-button-height, var(--ui-size-7)) / 3));
    }

    .ui-button--suffixed-icon {
        padding: var(--ui-button-padding, var(--size-px-1) calc(var(--ui-button-height, var(--ui-size-7)) / 3));
    }
    
`;
