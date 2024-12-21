import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    
    /* ------------------------------------------- */
    /*     HTML attributes that control styling    */
    /* ------------------------------------------- */
    
    :host([size="small"]) {
        --ui-select-height: var(--ui-size-5);
        --ui-select-min-width: var(--ui-size-9);
        --ui-select-font-size: var(--ui-font-size-0);
    }
    
    :host([size="medium"]) {
        --ui-select-height: var(--ui-size-7);
        --ui-select-min-width: var(--ui-size-10);
        --ui-select-font-size: var(--ui-font-size-1);
    }
    
    :host([size="large"]) {
        --ui-select-height: var(--ui-size-8);
        --ui-select-min-width: var(--ui-size-11);
        --ui-select-font-size: var(--ui-font-size-2);
    }
    
    :host([size="xlarge"]) {
        --ui-select-height: var(--ui-size-9);
        --ui-select-min-width: var(--ui-size-12);
        --ui-select-font-size: var(--ui-font-size-3);
    }
    
    :host([variant="default"]) {
        color: black;
    }


    /* ---------------------------------------- */
    /*     Anchor related styling properties    */
    /* ---------------------------------------- */
    
    slot[name="anchor"] > ui-button {
        --ui-button-border--outlined: 1px solid black;
    }
    
    

    /* ----------------------------------------- */
    /*     OLD PROPERTIES! TODO: Remove these    */
    /* ----------------------------------------- */

    .ui-select-anchor > span {
        font-weight: var(--ui-select-font-weight, var(--font-weight-4));
        text-decoration: none;
        user-select: none;
    }

    #ui-select-anchor-button {
        --ui-button-border--outlined: 1px solid var(--ui-color-100);
        --ui-button-border--outlined--hover: 1px solid var(--ui-color-200);
        --ui-button-border--outlined--active: 1px solid var(--ui-color-300);
        --ui-button-color--outlined: black;
        --ui-button-font-weight: normal;
    }
    
    #chevron {
        --ui-icon-transition-ms: 200ms;
        --ui-icon-size: var(--ui-font-size-1);
    }

    .ui-select-content {
        font-weight: var(--ui-select-font-weight, var(--font-weight-4));
        font-size: var(--ui-select-font-size, var(--ui-font-size-1));
    }
`;
