import type {Meta, StoryObj} from '@storybook/web-components';
import "@martinaeynl/ui-components-button";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import "@martinaeynl/ui-components-icon";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-button");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Playground/Button/ui-button',
    component: 'ui-button',
    args: helpers.args,
    argTypes: {
        ...(helpers.argTypes as any),
        variant: {
            control: 'select',
            options: [UiVariant.DEFAULT, UiVariant.PRIMARY, UiVariant.SUCCESS, UiVariant.NEUTRAL, UiVariant.DANGER]
        },
        size: {
            control: 'select',
            options: [UiSize.DEFAULT, UiSize.SMALL, UiSize.MEDIUM, UiSize.LARGE, UiSize.XLARGE]
        }
    },
    parameters: {
        a11y: {

        },
        docs: {
            subtitle: "<ui-button>",
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
        title: "Button"
    }
};

export const VariantExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
        </div>
    `,
    args: [
        {title: "Primary", variant: UiVariant.PRIMARY, size: UiSize.MEDIUM},
        {title: "Success", variant: UiVariant.SUCCESS, size: UiSize.MEDIUM},
        {title: "Neutral", variant: UiVariant.NEUTRAL, size: UiSize.MEDIUM},
        {title: "Danger", variant: UiVariant.DANGER, size: UiSize.MEDIUM}
    ]
};

export const OutlinedExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
        </div>
    `,
    args: [
        {title: "Primary", variant: UiVariant.PRIMARY, outlined: true},
        {title: "Success", variant: UiVariant.SUCCESS, outlined: true},
        {title: "Neutral", variant: UiVariant.NEUTRAL, outlined: true},
        {title: "Danger", variant: UiVariant.DANGER, outlined: true}
    ]
};

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
};

export const IconExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0], html`<ui-icon icon="download" slot="prefix"></ui-icon>`)}
            ${helpers.template(args[1], html`<ui-icon icon="x-circle" slot="suffix"></ui-icon>`)}
            ${helpers.template(args[2], html`<ui-icon icon="pencil-square" slot="prefix"></ui-icon>`)}
            ${helpers.template(args[3], html`<ui-icon icon="download" slot="prefix"></ui-icon>`)}
            ${helpers.template(args[4], html`<ui-icon icon="x-circle" slot="suffix"></ui-icon>`)}
        </div>
    `,
    args: [
        {title: "Save"},
        {title: "Cancel", variant: UiVariant.DANGER},
        {title: "Edit", size: UiSize.LARGE, variant: UiVariant.NEUTRAL},
        {title: "Download", size: UiSize.XLARGE, variant: UiVariant.SUCCESS},
        {title: "Close", size: UiSize.SMALL, variant: UiVariant.NEUTRAL, outlined: true}
    ]
};


export default meta;
