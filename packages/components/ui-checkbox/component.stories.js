import "@martinaeynl/ui-components-checkbox";
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {html} from "lit";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import {getComponentDocs, getHTMLAttributeDocs} from "../util";
import componentReportHtml from './dist/report.html'; // TODO: Fix this
import componentReportJson from "./dist/stats.json";
import componentPackageJson from "./package.json";

export const helpers = getWcStorybookHelpers("ui-checkbox");
export const docs = getComponentDocs("ui-checkbox");

export const packageJson = componentPackageJson;
export const reportJson = componentReportJson;
/*export const reportHtml = componentReportHtml;*/ // TODO: Fix this

/** @type { import('@storybook/web-components').Meta } */
const meta = {
  title: "Playground/Checkbox/ui-checkbox",
  component: "ui-checkbox",
  excludeStories: ['helpers', 'docs', 'packageJson', 'reportJson', 'reportHtml', 'examples'],
  args: {
    ...helpers.args,
    active: false,
    checked: false,
    indeterminate: false,
    required: false
  },
  argTypes: {
    ...helpers.argTypes,
    active: {table: {defaultValue: {summary: false}}},
    checked: {table: {defaultValue: {summary: false}}},
    indeterminate: {table: {defaultValue: {summary: false}}},
    required: {table: {defaultValue: {summary: false}}}
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
export const DisabledExample = {
  title: "Disabled",
  summary: getHTMLAttributeDocs(docs, "disabled")?.summary,
  render: (args) => helpers.template(args),
  args: {
    label: "Disabled checkbox",
    disabled: true
  }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const ReadonlyExample = {
  title: "Readonly",
  summary: getHTMLAttributeDocs(docs, "readonly")?.summary,
  render: (args) => helpers.template(args),
  args: {
    label: "Readonly checkbox",
    readonly: true
  }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const RequiredExample = {
  title: "Required",
  summary: getHTMLAttributeDocs(docs, "required")?.summary,
  render: (args) => helpers.template(args),
  args: {
    label: "Accept the terms and conditions",
    "error-message": "This field is required",
    required: true
  }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const HelperTextExample = {
  title: "Helper text",
  render: (args) => helpers.template(args),
  args: {
    label: "Label",
    "helper-text": "Helper text"
  }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const IndeterminateExample = {
  title: "Indeterminate",
  summary: getHTMLAttributeDocs(docs, "indeterminate")?.summary,
  render: (args) => helpers.template(args),
  args: {
    label: "Indeterminate",
    indeterminate: true
  }
};

export const examples = [VariantExample, DisabledExample, ReadonlyExample, RequiredExample, HelperTextExample, IndeterminateExample];

export default meta;
