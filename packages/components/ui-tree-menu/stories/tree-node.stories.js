import "@martinaeynl/ui-components-tree-menu";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";

export const helpers = getWcStorybookHelpers("ui-tree-node");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
  title: "Playground/TreeMenu/ui-tree-node",
  component: "ui-tree-node",
  excludeStories: ['helpers', 'docs'],
  args: {
    ...helpers.args,
  },
  argTypes: {
    ...helpers.argTypes,
  },
  parameters: {
    docs: {
      subtitle: "<ui-tree-node>",
      source: {
        language: "html",
        format: "html"
      }
    }
  }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
  render: (args) => helpers.template(args),
  args: {
    "prefix-slot": "<ui-icon icon='file-earmark'></ui-icon>",
    "default-slot": "<span>File 1</span>"
  }
};

export default meta;
