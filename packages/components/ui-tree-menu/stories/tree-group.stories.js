import "@martinaeynl/ui-components-tree-menu";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";

export const helpers = getWcStorybookHelpers("ui-tree-group");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
  title: "Playground/TreeMenu/ui-tree-group",
  component: "ui-tree-group",
  excludeStories: ['helpers', 'docs'],
  args: {
    ...helpers.args,
  },
  argTypes: {
    ...helpers.argTypes,
  },
  parameters: {
    docs: {
      subtitle: "<ui-tree-group>",
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
    leaf: true,
    "parent-slot": "<ui-tree-node><span>Group 1</span></ui-tree-node>",
    "default-slot": "<ui-tree-node><span>Child node</span></ui-tree-node>"
  }
};

export default meta;
