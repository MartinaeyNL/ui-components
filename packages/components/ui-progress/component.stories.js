import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";

import "@martinaeynl/ui-components-progress";

const helpers = getWcStorybookHelpers("ui-progress");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
    title: "Playground/Progress/ui-progress",
    component: "ui-progress",
    args: helpers.args,
    argTypes: {
        ...helpers.argTypes
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

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
    render: (args) => helpers.template(args),
    args: {
        value: 10
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const VariantExample = {
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

/** @type { import('@storybook/web-components').StoryObj } */
export const DisabledExample = {
    render: (args) => helpers.template(args),
    args: {
        title: "Disabled checkbox",
        disabled: true
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const ReadonlyExample = {
    render: (args) => helpers.template(args),
    args: {
        title: "Readonly checkbox",
        readonly: true
    }
};


export default meta;
