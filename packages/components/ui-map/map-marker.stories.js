import {getWcStorybookHelpers} from "wc-storybook-helpers";
import "@martinaeynl/ui-components-map";

const helpers = getWcStorybookHelpers("ui-map-marker");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
    title: "Playground/Map/ui-map-marker",
    component: "ui-map-marker",
    args: helpers.args,
    argTypes: helpers.argTypes as any,
    parameters: {
        docs: {
            subtitle: "<ui-map-marker>",
            story: {
                height: "120px"
            }
        }
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
    render: (args) => helpers.template(args)
};

export default meta;
