import type {Meta, StoryObj} from '@storybook/web-components';
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import "@martinaeynl/ui-components-map";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-map-marker");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: "Playground/Map/ui-map-marker",
    component: "ui-map-marker",
    args: helpers.args,
    argTypes: helpers.argTypes as any,
    parameters: {
        docs: {
            subtitle: "<ui-map-marker>",
            story: {
                height: "120px"
            }
        }
    }
};

type Story = StoryObj;

export const Primary: Story = {
    render: (args) => helpers.template(args)
};

export default meta;
