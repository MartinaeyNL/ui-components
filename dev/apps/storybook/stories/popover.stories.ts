import type {Args, Meta, StoryObj} from '@storybook/web-components';
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import "@martinaeynl/ui-components-popover";
import "@martinaeynl/ui-components-button";
import {html, TemplateResult} from "lit";
import {until} from "lit/directives/until.js";
import {PopoverComponent} from "@martinaeynl/ui-components-popover";

const helpers = getWcStorybookHelpers("ui-popover");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: 'Playground/Popover/ui-popover',
    component: 'ui-popover',
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
    render: (args) => {
        return getPopoverTemplate(async (slot) => helpers.template(args, slot))
    },
    args: {
        title: "Popover"
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

function getPopoverTemplate(content: (slotContent?: TemplateResult) => Promise<TemplateResult>): TemplateResult {
    const onButtonClick = (event: PointerEvent) => {
        const parentElem = (event.target as HTMLElement).parentElement as HTMLElement;
        const elem = parentElem.querySelector('ui-popover') as PopoverComponent;
        elem.toggle();
    }
    return html`
        <ui-button @click="${onButtonClick}">Open</ui-button>
        ${until(content(html`
            <span>Content</span>
        `))}
    `
}

export default meta;
