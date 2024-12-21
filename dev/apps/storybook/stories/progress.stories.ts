import type {Meta, StoryObj} from '@storybook/web-components';
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";

import "@martinaeynl/ui-components-progress";

const helpers = getWcStorybookHelpers("ui-progress");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: "Playground/Progress/ui-progress",
    component: "ui-progress",
    args: helpers.args,
    argTypes: {
        ...(helpers.argTypes as any)
    },
    parameters: {
        docs: {
            subtitle: "<ui-progress>",
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
        value: 10
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

export const DisabledExample: Story = {
    render: (args) => helpers.template(args),
    args: {
        title: "Disabled checkbox",
        disabled: true
    }
};

export const ReadonlyExample: Story = {
    render: (args) => helpers.template(args),
    args: {
        title: "Readonly checkbox",
        readonly: true
    }
};


export default meta;
