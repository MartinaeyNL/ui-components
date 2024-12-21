import type {Meta, StoryObj} from '@storybook/web-components';
import "@martinaeynl/ui-components-checkbox";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";

const helpers = getWcStorybookHelpers("ui-checkbox");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: "Playground/Checkbox/ui-checkbox",
    component: "ui-checkbox",
    args: {
        ...helpers.args,
        active: false,
        checked: false,
        indeterminate: false,
        required: false
    },
    argTypes: {
        ...(helpers.argTypes as any),
        active: { table: { defaultValue: { summary: false }}},
        checked: { table: { defaultValue: { summary: false }}},
        indeterminate: { table: { defaultValue: { summary: false }}},
        required: { table: { defaultValue: { summary: false }}}
    },
    parameters: {
        docs: {
            subtitle: "<ui-checkbox>",
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
        label: "Checkbox"
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
        {label: "Primary", variant: UiVariant.PRIMARY},
        {label: "Success", variant: UiVariant.SUCCESS},
        {label: "Neutral", variant: UiVariant.NEUTRAL},
        {label: "Danger", variant: UiVariant.DANGER}
    ]
};

export const DisabledExample: Story = {
    render: (args) => helpers.template(args),
    args: {
        label: "Disabled checkbox",
        disabled: true
    }
};

export const ReadonlyExample: Story = {
    render: (args) => helpers.template(args),
    args: {
        label: "Readonly checkbox",
        readonly: true
    }
};

export const RequiredExample: Story = {
    render: (args) => helpers.template(args),
    args: {
        label: "Accept the terms and conditions",
        "error-message": "This field is required",
        required: true
    }
};

export const HelperTextExample: Story = {
    render: (args) => helpers.template(args),
    args: {
        label: "Label",
        "helper-text": "Helper text"
    }
};

export const IndeterminateExample: Story = {
    render: (args) => helpers.template(args),
    args: {
        label: "Indeterminate",
        indeterminate: true
    }
};


export default meta;
