import type {Meta, StoryObj} from "@storybook/web-components";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import "@martinaeynl/ui-components-select";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-select");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: "Playground/Select/ui-select",
    component: "ui-select",
    args: helpers.args,
    argTypes: {
        ...(helpers.argTypes as any),
        variant: {
            control: "select",
            options: [UiVariant.DEFAULT, UiVariant.PRIMARY, UiVariant.SUCCESS, UiVariant.NEUTRAL, UiVariant.DANGER]
        },
        size: {
            control: "select",
            options: [UiSize.DEFAULT, UiSize.SMALL, UiSize.MEDIUM, UiSize.LARGE, UiSize.XLARGE]
        }
    },
    parameters: {
        docs: {
            subtitle: "<ui-select>",
            story: {
                height: "120px"
            }
        }
    }
};

type Story = StoryObj;

const getSelectOptionsTemplate = () => html`
    <ui-select-option value="option-1" label="option-1-with-an-extra-long-title"></ui-select-option>
    <ui-select-option value="option-2"></ui-select-option>
    <ui-select-option value="option-3"></ui-select-option>
`;

export const Primary: Story = {
    render: (args) => helpers.template(args, getSelectOptionsTemplate()),
    args: {
        title: "Select one"
    }
};

export const SizeExample: Story = {
    render: (args) => html`
        <div style="display: flex; gap: 12px;">
            ${helpers.template(args[0], getSelectOptionsTemplate())}
            ${helpers.template(args[1], getSelectOptionsTemplate())}
            ${helpers.template(args[2], getSelectOptionsTemplate())}
            ${helpers.template(args[3], getSelectOptionsTemplate())}
        </div>
    `,
    args: [
        {title: "X Large", size: UiSize.XLARGE},
        {title: "Large", size: UiSize.LARGE},
        {title: "Medium", size: UiSize.MEDIUM},
        {title: "Small", size: UiSize.SMALL}
    ]
};


export default meta;
