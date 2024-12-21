import {css} from "lit";

export default () => css`
    * {
        box-sizing: border-box;
    }
    
    option {
        overflow: hidden;
        text-overflow: ellipsis;
        padding: var(--ui-select-option-padding, var(--size-px-1) var(--size-px-2));
        border-radius: var(--ui-select-border-radius, var(--size-px-1));
        cursor: var(--ui-select-option-pointer, pointer);
        /*width: fit-content;*/
    }
    
    option:hover {
        background: var(--ui-select-option-background, var(--ui-grayscale-25))
    }
`;
