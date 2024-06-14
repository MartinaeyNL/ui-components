import {css} from "lit";

export default () => css`
    :host {
        
        /* Primary colors */
        --ui-theme-color-primary-10: var(--indigo-0);
        --ui-theme-color-primary-25: var(--indigo-1);
        --ui-theme-color-primary-50: var(--indigo-2);
        --ui-theme-color-primary-100: var(--indigo-3);
        --ui-theme-color-primary-200: var(--indigo-4);
        --ui-theme-color-primary-300: var(--indigo-5);
        --ui-theme-color-primary-400: var(--indigo-6);
        --ui-theme-color-primary-500: var(--indigo-7);
        --ui-theme-color-primary-600: var(--indigo-8);
        --ui-theme-color-primary-700: var(--indigo-9);
        --ui-theme-color-primary-800: var(--indigo-10);
        --ui-theme-color-primary-900: var(--indigo-11);
        --ui-theme-color-primary-950: var(--indigo-12);

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
        --ui-grayscale-25: var(--gray-1);
        --ui-grayscale-50: var(--gray-2);
        --ui-grayscale-100: var(--gray-4);
        --ui-grayscale-200: var(--gray-5);
        --ui-grayscale-300: var(--gray-6);
        --ui-grayscale-400: var(--gray-7);
        --ui-grayscale-500: var(--gray-8);
        --ui-grayscale-600: var(--gray-9);
        --ui-grayscale-700: var(--gray-10);
        --ui-grayscale-800: var(--gray-11);
        --ui-grayscale-900: var(--gray-12);
        --ui-grayscale-950: var(--gray-12);
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
        --ui-color-10: var(--green-0);
        --ui-color-25: var(--green-1);
        --ui-color-50: var(--green-2);
        --ui-color-100: var(--green-4);
        --ui-color-200: var(--green-5);
        --ui-color-300: var(--green-6);
        --ui-color-400: var(--green-7);
        --ui-color-500: var(--green-8);
        --ui-color-600: var(--green-9);
        --ui-color-700: var(--green-10);
        --ui-color-800: var(--green-11);
        --ui-color-900: var(--green-12);
        --ui-color-950: var(--green-12);
    }

    .ui-neutral {
        --ui-color-10: var(--gray-0);
        --ui-color-25: var(--gray-1);
        --ui-color-50: var(--gray-2);
        --ui-color-100: var(--gray-4);
        --ui-color-200: var(--gray-5);
        --ui-color-300: var(--gray-6);
        --ui-color-400: var(--gray-7);
        --ui-color-500: var(--gray-8);
        --ui-color-600: var(--gray-9);
        --ui-color-700: var(--gray-10);
        --ui-color-800: var(--gray-11);
        --ui-color-900: var(--gray-12);
        --ui-color-950: var(--gray-12);
    }

    .ui-warning {
        --ui-color-10: var(--yellow-0);
        --ui-color-25: var(--yellow-1);
        --ui-color-50: var(--yellow-2);
        --ui-color-100: var(--yellow-4);
        --ui-color-200: var(--yellow-5);
        --ui-color-300: var(--yellow-6);
        --ui-color-400: var(--yellow-7);
        --ui-color-500: var(--yellow-8);
        --ui-color-600: var(--yellow-9);
        --ui-color-700: var(--yellow-10);
        --ui-color-800: var(--yellow-11);
        --ui-color-900: var(--yellow-12);
        --ui-color-950: var(--yellow-12);
    }
    
    .ui-danger {
        --ui-color-10: var(--red-0);
        --ui-color-25: var(--red-1);
        --ui-color-50: var(--red-2);
        --ui-color-100: var(--red-4);
        --ui-color-200: var(--red-5);
        --ui-color-300: var(--red-6);
        --ui-color-400: var(--red-7);
        --ui-color-500: var(--red-8);
        --ui-color-600: var(--red-9);
        --ui-color-700: var(--red-10);
        --ui-color-800: var(--red-11);
        --ui-color-900: var(--red-12);
        --ui-color-950: var(--red-12);
    }
`
