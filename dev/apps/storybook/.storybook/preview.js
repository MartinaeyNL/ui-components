import {setWcStorybookHelpersConfig} from "wc-storybook-helpers";
import {setCustomElementsManifest} from "@storybook/web-components";
import customElements from "../../../../docs/custom-elements.json";

setWcStorybookHelpersConfig({
  hideArgRef: true
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
  },
  /*tags: ['autodocs'],*/
};

export default preview;
