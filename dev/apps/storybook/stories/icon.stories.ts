import type {Meta, StoryObj} from '@storybook/web-components';
import "@martinaeynl/ui-components-icon";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-icon");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Playground/Icon/ui-icon',
    component: 'ui-icon',
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
            subtitle: "<ui-icon>"
        }
    }
};

type Story = StoryObj;

export const Primary: Story = {
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
        { title: "check-circle", icon: "check-circle", size: UiSize.XLARGE },
        { title: "house-fill", icon: "house-fill", size: UiSize.XLARGE },
        { title: "chevron-right", icon: "chevron-right", size: UiSize.XLARGE },
        { title: "mic-fill", icon: "mic-fill", size: UiSize.XLARGE },
        { title: "bar-chart-fill", icon: "bar-chart-fill", size: UiSize.XLARGE }
    ],
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
        {title: "Primary", icon: "check-circle", variant: UiVariant.PRIMARY},
        {title: "Success", icon: "check-circle", variant: UiVariant.SUCCESS},
        {title: "Neutral", icon: "check-circle", variant: UiVariant.NEUTRAL},
        {title: "Warning", icon: "check-circle", variant: UiVariant.WARNING},
        {title: "Danger", icon: "check-circle", variant: UiVariant.DANGER},
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
        {title: "X Large", icon: "check-circle", size: UiSize.XLARGE},
        {title: "Large", icon: "check-circle", size: UiSize.LARGE},
        {title: "Medium", icon: "check-circle", size: UiSize.MEDIUM},
        {title: "Small", icon: "check-circle", size: UiSize.SMALL}
    ]
}

export const SetExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
            ${helpers.template(args[4])}
            ${helpers.template(args[5])}
        </div>
    `,
    args: [
        {title: "bi", set: "bi", icon: "house", size: UiSize.XLARGE},
        {title: "mdi", set: "mdi", icon: "house-outline", size: UiSize.XLARGE},
        {title: "ant-design", set: "ant-design", icon: "home-outlined", size: UiSize.XLARGE},
        {title: "fa6-solid", set: "fa6-solid", icon: "house", size: UiSize.XLARGE},
        {title: "fluent", set: "fluent", icon: "home-48-regular", size: UiSize.XLARGE},
        {title: "radix-icons", set: "radix-icons", icon: "home", size: UiSize.XLARGE},
    ]
}


export default meta;
