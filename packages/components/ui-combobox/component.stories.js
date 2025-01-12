import "@martinaeynl/ui-components-combobox";
import {getWcStorybookHelpers} from "wc-storybook-helpers";

const helpers = getWcStorybookHelpers("ui-combobox");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
    title: "Playground/Combobox/ui-combobox",
    component: "ui-combobox",
    args: {
        ...helpers.args,
    },
    argTypes: {
        ...helpers.argTypes,
    },
    parameters: {
        docs: {
            subtitle: "<ui-combobox>",
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
        label: "Combobox",
        "item-label-path": "name",
        "item-value-path": "id",
        items: JSON.stringify([{
            name: "Test",
            id: "test"
        }])
    }
};

export default meta;
