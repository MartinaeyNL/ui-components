import "@martinaeynl/ui-components-badge";
import "@martinaeynl/ui-components-icon";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";
import {UiVariant} from "@martinaeynl/ui-component-models";
import {getHTMLAttributeDocs, getComponentDocs, getClassMemberDocs} from "../util";
import componentReportHtml from './dist/report.html';
import componentReportJson from "./dist/stats.json";
import componentPackageJson from "./package.json";

export const helpers = getWcStorybookHelpers("ui-badge");
export const docs = getComponentDocs("ui-badge");

export const packageJson = componentPackageJson;
export const reportJson = componentReportJson;
export const reportHtml = componentReportHtml;

/** @type { import('@storybook/web-components').Meta } */
const meta = {
    title: "Playground/Badge/ui-badge",
    component: "ui-badge",
    excludeStories: ['helpers', 'docs', 'packageJson', 'reportJson', 'reportHtml', 'examples'],
    args: {
        ...helpers.args,
    },
    argTypes: {
        ...helpers.argTypes,
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

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
    render: (args) => helpers.template(args),
    args: {
        label: "Badge"
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const VariantExample = {
    title: "Variants",
    summary: getHTMLAttributeDocs(docs, "variant")?.summary,
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
export const IconWithTextExample = {
    title: "Icon with text",
    summary: getClassMemberDocs(docs, "_prefixSlot")?.summary,
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

/** @type { import('@storybook/web-components').StoryObj } */
export const IconOnlyExample = {
    title: "Icon Only",
    summary: "You can leave out the `label` to only show an icon inside the badge.",
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

/** @type { import('@storybook/web-components').StoryObj } */
export const SmallExample = {
    title: "Small version",
    summary: getHTMLAttributeDocs(docs, "small")?.summary,
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

/** @type { import('@storybook/web-components').StoryObj } */
export const FilledExample = {
    title: "Filled",
    summary: getHTMLAttributeDocs(docs, "filled")?.summary,
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

/** @type { import('@storybook/web-components').StoryObj } */
export const PillExample = {
    title: "Pill",
    summary: getHTMLAttributeDocs(docs, "pill")?.summary,
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

export const examples = [Primary, VariantExample, IconWithTextExample, IconOnlyExample, SmallExample, FilledExample, PillExample];

export default meta;
