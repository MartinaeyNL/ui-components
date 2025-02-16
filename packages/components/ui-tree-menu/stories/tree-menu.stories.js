import "@martinaeynl/ui-components-tree-menu";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {getComponentDocs} from "../../util";
import componentReportJson from "../dist/stats.json";
import componentPackageJson from "../package.json";

export const helpers = getWcStorybookHelpers("ui-tree-menu");
export const docs = getComponentDocs("ui-tree-menu");

export const packageJson = componentPackageJson;
export const reportJson = componentReportJson;

/** @type { import('@storybook/web-components').Meta } */
const meta = {
  title: "Playground/TreeMenu/ui-tree-menu",
  component: "ui-tree-menu",
  excludeStories: ['helpers', 'docs', 'packageJson', 'reportJson', 'reportHtml', 'examples'],
  args: {
    ...helpers.args,
  },
  argTypes: {
    ...helpers.argTypes,
  },
  parameters: {
    docs: {
      subtitle: "<ui-tree-menu>",
      source: {
        language: "html",
        format: "html"
      }
    },
    actions: {
      handles: [...helpers.events, 'change'],
    }
  }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
  render: (args) => helpers.template(args),
  args: {
    nodes: JSON.stringify([
      { label: "Node 1" },
      { label: "Node 2" },
      { label: "Node 3" }
    ])
  }
};

/** @type { import('@storybook/web-components').Story } */
export const HierarchyExample = {
  render: (args) => helpers.template(args),
  args: {
    nodes: JSON.stringify([
      { label: "Item 1" },
      { label: "Item 2" },
      { label: "Item 3", children: [
          { label: "Item 4" },
          { label: "Item 5" },
        ]},
    ])
  }
};

/** @type { import('@storybook/web-components').Story } */
export const DraggableExample = {
  render: (args) => helpers.template(args),
  args: {
    draggable: true,
    nodes: JSON.stringify([
      { label: "Item 1" },
      { label: "Item 2" },
      { label: "Item 3", children: [
        { label: "Item 4" },
        { label: "Item 5" },
        { label: "Item 6", children: [
          { label: "Item 7" },
        ]},
      ]},
    ])
  }
};

export default meta;
