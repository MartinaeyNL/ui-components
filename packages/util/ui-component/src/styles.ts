import {css} from "lit";

export default () => css`
    :host {
        
        /* Primary colors */
        --ui-theme-color-primary-10: hsl(var(--indigo-0-hsl));
        --ui-theme-color-primary-25: hsl(var(--indigo-1-hsl));
        --ui-theme-color-primary-50: hsl(var(--indigo-2-hsl));
        --ui-theme-color-primary-100: hsl(var(--indigo-3-hsl));
        --ui-theme-color-primary-200: hsl(var(--indigo-4-hsl));
        --ui-theme-color-primary-300: hsl(var(--indigo-5-hsl));
        --ui-theme-color-primary-400: hsl(var(--indigo-6-hsl));
        --ui-theme-color-primary-500: hsl(var(--indigo-7-hsl));
        --ui-theme-color-primary-600: hsl(var(--indigo-8-hsl));
        --ui-theme-color-primary-700: hsl(var(--indigo-9-hsl));
        --ui-theme-color-primary-800: hsl(var(--indigo-10-hsl));
        --ui-theme-color-primary-900: hsl(var(--indigo-11-hsl));
        --ui-theme-color-primary-950: hsl(var(--indigo-12-hsl));

        /* Default colors (to be overridden per variant */
        --ui-color-0: white;
        --ui-color-10: var(--ui-theme-color-primary-10);
        --ui-color-25: var(--ui-theme-color-primary-25);
        --ui-color-50: var(--ui-theme-color-primary-50);
        --ui-color-100: var(--ui-theme-color-primary-100);
        --ui-color-200: var(--ui-theme-color-primary-200);
        --ui-color-300: var(--ui-theme-color-primary-300);
        --ui-color-400: var(--ui-theme-color-primary-400);
        --ui-color-500: var(--ui-theme-color-primary-500);
        --ui-color-600: var(--ui-theme-color-primary-600);
        --ui-color-700: var(--ui-theme-color-primary-700);
        --ui-color-800: var(--ui-theme-color-primary-800);
        --ui-color-900: var(--ui-theme-color-primary-900);
        --ui-color-950: var(--ui-theme-color-primary-950);
        --ui-color-1000: black;
        
        /* Grayscale colors */
        --ui-grayscale-0: white;
        --ui-grayscale-25: hsl(var(--gray-1-hsl));
        --ui-grayscale-50: hsl(var(--gray-2-hsl));
        --ui-grayscale-100: hsl(var(--gray-4-hsl));
        --ui-grayscale-200: hsl(var(--gray-5-hsl));
        --ui-grayscale-300: hsl(var(--gray-6-hsl));
        --ui-grayscale-400: hsl(var(--gray-7-hsl)));
        --ui-grayscale-500: hsl(var(--gray-8-hsl));
        --ui-grayscale-600: hsl(var(--gray-9-hsl));
        --ui-grayscale-700: hsl(var(--gray-10-hsl));
        --ui-grayscale-800: hsl(var(--gray-11-hsl));
        --ui-grayscale-900: hsl(var(--gray-12-hsl));
        --ui-grayscale-950: hsl(var(--gray-12-hsl));
        --ui-grayscale-1000: black;
        
        /* UI sizes */
        --ui-size-000: var(--size-000); /* -0.5rem */
        --ui-size-00: var(--size-00); /* -0.25rem */
        --ui-size-1: var(--size-1); /* 0.25rem */
        --ui-size-2: var(--size-2); /* 0.5rem */
        --ui-size-3: var(--size-3); /* 1rem */
        --ui-size-4: var(--size-4); /* 1.25rem */
        --ui-size-5: var(--size-5); /* 1.5rem */
        --ui-size-6: var(--size-6); /* 1.75rem */
        --ui-size-7: var(--size-7); /* 2rem */
        --ui-size-8: 2.5rem;
        --ui-size-9: var(--size-8); /* 3rem */
        --ui-size-10: var(--size-9); /* 4rem */
        --ui-size-11: var(--size-10); /* 5rem */
        --ui-size-12: var(--size-11); /* 7.5rem */
        --ui-size-13: var(--size-12); /* 10rem */
        --ui-size-14: var(--size-13); /* 15rem */
        --ui-size-15: var(--size-14); /* 20rem */
        --ui-size-16: var(--size-15); /* 30rem */
        
        /* Ui font sizes */
        --ui-font-size-00: 0.7rem;
        --ui-font-size-0: var(--font-size-0);
        --ui-font-size-1: 0.8rem;
        --ui-font-size-2: 0.9rem;
        --ui-font-size-3: var(--font-size-1); /* 1rem */
        --ui-font-size-4: var(--font-size-2); /* 1.1rem */
        --ui-font-size-5: var(--font-size-3); /* 1.25rem */
        --ui-font-size-6: var(--font-size-4); /* 1.5rem */
        --ui-font-size-7: var(--font-size-5); /* 2rem */
        --ui-font-size-8: var(--font-size-6); /* 2.5rem */
        --ui-font-size-9: var(--font-size-7); /* 3rem */
        --ui-font-size-10: var(--font-size-8); /* 3.5rem */
        
        font-family: var(--font-sans);
    }
    
    .ui-success {
        --ui-color-10: hsl(var(--green-0-hsl));
        --ui-color-25: hsl(var(--green-1-hsl));
        --ui-color-50: hsl(var(--green-3-hsl));
        --ui-color-100: hsl(var(--green-5-hsl));
        --ui-color-200: hsl(var(--green-7-hsl));
        --ui-color-300: hsl(var(--green-8-hsl));
        --ui-color-400: hsl(var(--green-9-hsl));
        --ui-color-500: hsl(var(--green-10-hsl));
        --ui-color-600: hsl(var(--green-11-hsl));
        --ui-color-700: hsl(var(--green-12-hsl));
        --ui-color-800: hsl(var(--green-12-hsl));
        --ui-color-900: hsl(var(--green-12-hsl));
        --ui-color-950: hsl(var(--green-12-hsl));
    }

    .ui-neutral {
        --ui-color-10: hsl(var(--gray-3-hsl));
        --ui-color-25: hsl(var(--gray-4-hsl));
        --ui-color-50: hsl(var(--gray-5-hsl));
        --ui-color-100: hsl(var(--gray-6-hsl));
        --ui-color-200: hsl(var(--gray-7-hsl));
        --ui-color-300: hsl(var(--gray-8-hsl));
        --ui-color-400: hsl(var(--gray-9-hsl));
        --ui-color-500: hsl(var(--gray-10-hsl));
        --ui-color-600: hsl(var(--gray-10-hsl));
        --ui-color-700: hsl(var(--gray-11-hsl));
        --ui-color-800: hsl(var(--gray-11-hsl));
        --ui-color-900: hsl(var(--gray-12-hsl));
        --ui-color-950: hsl(var(--gray-12-hsl));
    }

    /*.ui-warning {
        --ui-color-10: hsl(var(--yellow-0-hsl));
        --ui-color-25: hsl(var(--yellow-1-hsl));
        --ui-color-50: hsl(var(--yellow-2-hsl));
        --ui-color-100: hsl(var(--yellow-4-hsl));
        --ui-color-200: hsl(var(--yellow-5-hsl));
        --ui-color-300: hsl(var(--yellow-6-hsl));
        --ui-color-400: hsl(var(--yellow-7-hsl));
        --ui-color-500: hsl(var(--yellow-8-hsl));
        --ui-color-600: hsl(var(--yellow-9-hsl));
        --ui-color-700: hsl(var(--yellow-10-hsl));
        --ui-color-800: hsl(var(--yellow-11-hsl));
        --ui-color-900: hsl(var(--yellow-12-hsl));
        --ui-color-950: hsl(var(--yellow-12-hsl));
    }*/
    
    .ui-danger {
        --ui-color-10: hsl(var(--red-0-hsl));
        --ui-color-25: hsl(var(--red-1-hsl));
        --ui-color-50: hsl(var(--red-2-hsl));
        --ui-color-100: hsl(var(--red-4-hsl));
        --ui-color-200: hsl(var(--red-5-hsl));
        --ui-color-300: hsl(var(--red-6-hsl));
        --ui-color-400: hsl(var(--red-7-hsl));
        --ui-color-500: hsl(var(--red-8-hsl));
        --ui-color-600: hsl(var(--red-9-hsl));
        --ui-color-700: hsl(var(--red-10-hsl));
        --ui-color-800: hsl(var(--red-11-hsl));
        --ui-color-900: hsl(var(--red-12-hsl));
        --ui-color-950: hsl(var(--red-12-hsl));
    }
`
