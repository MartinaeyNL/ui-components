import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import "@martinaeynl/ui-components-button";
import "@martinaeynl/ui-components-icon";
import {html} from "lit";
import {getComponentDocs, getHTMLAttributeDocs} from "../util";
import componentReportHtml from './dist/report.html';
import componentReportJson from "./dist/stats.json";
import componentPackageJson from "./package.json";

export const helpers = getWcStorybookHelpers("ui-button");
export const docs = getComponentDocs("ui-button");

export const packageJson = componentPackageJson;
export const reportJson = componentReportJson;
export const reportHtml = componentReportHtml;

/** @type { import('@storybook/web-components').Meta } */
const meta = {
  title: "Playground/Button/ui-button",
  component: "ui-button",
  excludeStories: ['helpers', 'docs', 'packageJson', 'reportJson', 'reportHtml', 'examples'],
  args: helpers.args,
  argTypes: {
    ...helpers.argTypes,
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
    a11y: {},
    docs: {
      subtitle: "<ui-button>",
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
    title: "Button"
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
    {title: "Primary", variant: UiVariant.PRIMARY, size: UiSize.MEDIUM},
    {title: "Success", variant: UiVariant.SUCCESS, size: UiSize.MEDIUM},
    {title: "Neutral", variant: UiVariant.NEUTRAL, size: UiSize.MEDIUM},
    {title: "Danger", variant: UiVariant.DANGER, size: UiSize.MEDIUM}
  ]
};

/** @type { import('@storybook/web-components').StoryObj } */
export const OutlinedExample = {
  summary: getHTMLAttributeDocs(docs, "outlined")?.summary,
  title: "Outlined",
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

/** @type { import('@storybook/web-components').StoryObj } */
export const SizeExample = {
  title: "Sizes",
  summary: getHTMLAttributeDocs(docs, "size")?.summary,
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

/** @type { import('@storybook/web-components').StoryObj } */
export const IconExample = {
  summary: "You can display icons in buttons by adding a child element with `slot='prefix' to it.`",
  title: "Icons",
  render: (args) => html`
    <div style="display: flex; gap: 12px;">
      ${helpers.template(args[0], html`
        <ui-icon icon="download" slot="prefix"></ui-icon>`)}
      ${helpers.template(args[1], html`
        <ui-icon icon="x-circle" slot="suffix"></ui-icon>`)}
      ${helpers.template(args[2], html`
        <ui-icon icon="pencil-square" slot="prefix"></ui-icon>`)}
      ${helpers.template(args[3], html`
        <ui-icon icon="download" slot="prefix"></ui-icon>`)}
      ${helpers.template(args[4], html`
        <ui-icon icon="x-circle" slot="suffix"></ui-icon>`)}
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

export const examples = [VariantExample, OutlinedExample, SizeExample, IconExample];

export default meta;
