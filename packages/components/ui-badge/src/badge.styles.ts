import {css} from "lit";

export default () => css`
    
    .ui-badge {
        --lumo-primary-color: var(--ui-color-500);
        --lumo-primary-color-10pct: var(--ui-color-25);
        --lumo-primary-text-color: var(--ui-color-700);
        --ui-icon-size: var(--ui-font-size-2);
        --ui-icon-color: var(--ui-color-700);
        /*padding: calc(var(--ui-size-1) * 1.5) calc(var(--ui-size-2) * 1.25) !important;*/
    }

    #badge.ui-badge-icon {
        padding: var(--ui-size-1) !important;
        --ui-icon-size: var(--ui-font-size-4);
    }
    
    ::slotted(ui-icon[slot="prefix"]) {
        margin-right: 4px;
    }

    ::slotted(ui-icon[slot="suffix"]) {
        margin-left: 4px;
    }
`;
