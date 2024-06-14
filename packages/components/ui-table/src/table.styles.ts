import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }

    .ui-size-small {
        --ui-table-row-height: var(--ui-size-5);
        --ui-table-font-size: var(--ui-font-size-0);
    }

    .ui-size-medium {
        --ui-table-row-height: var(--ui-size-7);
        --ui-table-font-size: var(--ui-font-size-1);
    }

    .ui-size-large {
        --ui-table-row-height: var(--ui-size-8);
        --ui-table-font-size: var(--ui-font-size-2);
    }

    .ui-size-xlarge {
        --ui-table-row-height: var(--ui-size-9);
        --ui-table-font-size: var(--ui-font-size-3);
    }

    table, th, td {
        border: var(--ui-table-border, 1px solid var(--ui-grayscale-100));
        border-collapse: collapse;
        font-size: var(--ui-table-font-size, var(--ui-font-size-3));
    }
    
    th, td {
        padding: var(--ui-table-padding, var(--size-px-1) var(--ui-table-row-height) var(--size-px-1) calc(var(--ui-table-row-height) / 2));
    }

    table {

    }

    tr {
        height: var(--ui-table-row-height);
    }

    th {
        text-align: var(--ui-table-header-text-align, left);
    }

    td {
    }
`;
