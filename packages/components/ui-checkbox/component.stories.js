import "@martinaeynl/ui-components-checkbox";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";

const helpers = getWcStorybookHelpers("ui-checkbox");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
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
        ...helpers.argTypes,
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

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
    render: (args) => helpers.template(args),
    args: {
        label: "Checkbox"
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
        {label: "Primary", variant: UiVariant.PRIMARY},
        {label: "Success", variant: UiVariant.SUCCESS},
        {label: "Neutral", variant: UiVariant.NEUTRAL},
        {label: "Danger", variant: UiVariant.DANGER}
    ]
};

/** @type { import('@storybook/web-components').StoryObj } */
export const DisabledExample = {
    render: (args) => helpers.template(args),
    args: {
        label: "Disabled checkbox",
        disabled: true
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const ReadonlyExample = {
    render: (args) => helpers.template(args),
    args: {
        label: "Readonly checkbox",
        readonly: true
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const RequiredExample = {
    render: (args) => helpers.template(args),
    args: {
        label: "Accept the terms and conditions",
        "error-message": "This field is required",
        required: true
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const HelperTextExample = {
    render: (args) => helpers.template(args),
    args: {
        label: "Label",
        "helper-text": "Helper text"
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const IndeterminateExample = {
    render: (args) => helpers.template(args),
    args: {
        label: "Indeterminate",
        indeterminate: true
    }
};


export default meta;
