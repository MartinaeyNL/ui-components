import type {Args, Meta, StoryObj} from '@storybook/web-components';
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import "@martinaeynl/ui-components-select";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-select");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Playground/Select/ui-select',
    component: 'ui-select',
    args: helpers.args,
    argTypes: {
        ...(helpers.argTypes as any),
        variant: {
            control: 'select',
            options: [UiVariant.DEFAULT, UiVariant.PRIMARY, UiVariant.SUCCESS, UiVariant.NEUTRAL, UiVariant.WARNING, UiVariant.DANGER]
        },
        size: {
            control: 'select',
            options: [UiSize.DEFAULT, UiSize.SMALL, UiSize.MEDIUM, UiSize.LARGE, UiSize.XLARGE]
        }
    },
    parameters: {
        docs: {
            subtitle: "<ui-select>"
        }
    }
};

type Story = StoryObj;

export const Primary: Story = {
    render: (args) => helpers.template(args),
    args: {
        title: "Select"
    },
};

export const VariantExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
            ${helpers.template(args[4])}
        </div>
    `,
    args: [
        {title: "Primary", variant: UiVariant.PRIMARY},
        {title: "Success", variant: UiVariant.SUCCESS},
        {title: "Neutral", variant: UiVariant.NEUTRAL},
        {title: "Warning", variant: UiVariant.WARNING},
        {title: "Danger", variant: UiVariant.DANGER},
    ]
}

export const SizeExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
        </div>
    `,
    args: [
        {title: "X Large", size: UiSize.XLARGE},
        {title: "Large", size: UiSize.LARGE},
        {title: "Medium", size: UiSize.MEDIUM},
        {title: "Small", size: UiSize.SMALL}
    ]
}


export default meta;
