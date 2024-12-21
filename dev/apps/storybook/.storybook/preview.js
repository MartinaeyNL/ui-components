import {setWcStorybookHelpersConfig} from "wc-storybook-helpers";
import {setCustomElementsManifest} from "@storybook/web-components";
import {themes} from '@storybook/theming';
import customElements from "../../../../docs/custom-elements.json";

import './styles.css';

setWcStorybookHelpersConfig({
  hideArgRef: true,
  typeRef: "expandedType"
});

setCustomElementsManifest(customElements);

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light,
      toc: {
        disable: false,
        headingSelector: 'h2, h3',
        /*ignoreSelector: ".sbdocs-subtitle"*/
      }
    }
  },
  /*tags: ['autodocs'],*/
};

export default preview;
