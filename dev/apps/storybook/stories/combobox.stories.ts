import type {Meta, StoryObj} from "@storybook/web-components";
import "@martinaeynl/ui-components-combobox";
import {getWcStorybookHelpers} from "wc-storybook-helpers";

const helpers = getWcStorybookHelpers("ui-combobox");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: "Playground/Combobox/ui-combobox",
    component: "ui-combobox",
    args: {
        ...helpers.args,
    },
    argTypes: {
        ...(helpers.argTypes as any),
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

type Story = StoryObj;

export const Primary: Story = {
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
