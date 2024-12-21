import type {Meta, StoryObj} from '@storybook/web-components';
import "@martinaeynl/ui-components-badge";
import "@martinaeynl/ui-components-icon";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";
import {UiVariant} from "@martinaeynl/ui-component-models";
import {getComponentDocs} from "../util/component-utils";

export const helpers = getWcStorybookHelpers("ui-badge");
export const docs = getComponentDocs("ui-badge");

console.log(docs);

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: "Playground/Badge/ui-badge",
    component: "ui-badge",
    args: {
        ...helpers.args,
    },
    argTypes: {
        ...(helpers.argTypes as any),
    },
    parameters: {
        docs: {
            subtitle: "<ui-badge>",
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
        label: "Badge"
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

export const IconWithTextExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0], html`<ui-icon icon="stopwatch" slot="prefix"></ui-icon>`)}
            ${helpers.template(args[1], html`<ui-icon icon="check-lg" slot="suffix"></ui-icon>`)}
        </div>
    `,
    args: [
        {label: "Pending", variant: UiVariant.PRIMARY},
        {label: "Confirmed", variant: UiVariant.SUCCESS}
    ]
};

export const IconOnlyExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0], html`<ui-icon icon="check-lg"></ui-icon>`)}
            ${helpers.template(args[1], html`<ui-icon icon="bug"></ui-icon>`)}
        </div>
    `,
    args: [
        {variant: UiVariant.SUCCESS},
        {variant: UiVariant.DANGER}
    ]
};

export const SmallExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
        </div>
    `,
    args: [
        {label: "Primary", small: true, variant: UiVariant.PRIMARY},
        {label: "Success", small: true, variant: UiVariant.SUCCESS},
        {label: "Neutral", small: true, variant: UiVariant.NEUTRAL},
        {label: "Danger", small: true, variant: UiVariant.DANGER}
    ]
};

export const FilledExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
        </div>
    `,
    args: [
        {label: "Primary", filled: true, variant: UiVariant.PRIMARY},
        {label: "Success", filled: true, variant: UiVariant.SUCCESS},
        {label: "Neutral", filled: true, variant: UiVariant.NEUTRAL},
        {label: "Danger", filled: true, variant: UiVariant.DANGER}
    ]
};

export const PillExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0])}
            ${helpers.template(args[1])}
            ${helpers.template(args[2])}
            ${helpers.template(args[3])}
        </div>
    `,
    args: [
        {label: "Primary", pill: true, variant: UiVariant.PRIMARY},
        {label: "Success", pill: true, variant: UiVariant.SUCCESS},
        {label: "Neutral", pill: true, variant: UiVariant.NEUTRAL},
        {label: "Danger", pill: true, variant: UiVariant.DANGER}
    ]
};

export default meta;
