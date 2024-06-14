import type { Meta, StoryObj } from '@storybook/web-components';
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import "@martinaeynl/ui-components-table";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-table");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Playground/Table/ui-table',
    component: 'ui-table',
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
        },
        cols: {
            control: 'object'
        },
        rows: {
            control: 'object'
        }
    }
};

type Story = StoryObj;

export const Primary: Story = {
    render: (args) => helpers.template(args),
    args: {
        title: "Button",
        cols: JSON.stringify(['test1', 'test2']),
        rows: JSON.stringify([['column 1', 'column 2'], ['row 2, column 1', 'row 2, column 2']])
    },
};

export const SizeExample: Story = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 36px; align-items: center;">
                <span>X Large</span>
                ${helpers.template(args[0])}
            </div>
            <div style="display: flex; gap: 36px; align-items: center;">
                <span>Large</span>
                ${helpers.template(args[1])}
            </div>
            <div style="display: flex; gap: 36px; align-items: center;">
                <span>Medium</span>
                ${helpers.template(args[2])}
            </div>
            <div style="display: flex; gap: 36px; align-items: center;">
                <span>Small</span>
                ${helpers.template(args[3])}
            </div>
        </div>
    `,
    args: [
        {size: UiSize.XLARGE, cols: JSON.stringify(['First name', 'Last name']), rows: JSON.stringify([['John', 'Doe']])},
        {size: UiSize.LARGE, cols: JSON.stringify(['First name', 'Last name']), rows: JSON.stringify([['John', 'Doe']])},
        {size: UiSize.MEDIUM, cols: JSON.stringify(['First name', 'Last name']), rows: JSON.stringify([['John', 'Doe']])},
        {size: UiSize.SMALL, cols: JSON.stringify(['First name', 'Last name']), rows: JSON.stringify([['John', 'Doe']])}
    ]
}

export default meta;
