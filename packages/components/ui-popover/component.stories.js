import {getWcStorybookHelpers} from "wc-storybook-helpers";
import {UiSize, UiVariant} from "@martinaeynl/ui-component-models";
import "@martinaeynl/ui-components-popover";
import "@martinaeynl/ui-components-button";
import {html, TemplateResult} from "lit";
import {until} from "lit/directives/until.js";
import {PopoverComponent} from "@martinaeynl/ui-components-popover";

const helpers = getWcStorybookHelpers("ui-popover");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
    title: 'Playground/Popover/ui-popover',
    component: 'ui-popover',
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
        docs: {
            subtitle: "<ui-popover>",
            story: {
                height: "180px"
            }
        }
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
    render: (args) => {
        /*return html`
            <ui-popover title="Popover" placement="bottom">
                <ui-button slot="anchor">Open</ui-button>
                <span>This is very special Content</span>
            </ui-popover>
        `;*/
        return getPopoverWrapperTemplate((slot) => helpers.template(args, slot))
    },
    args: {
        title: "Popover",
        placement: "bottom"
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const PlacementExample = {
    render: (args) => {
        return html`
            <div style="height: 150px; display: flex; justify-content: center; align-items: center; gap: 12px;">
                <ui-popover title="Bottom" placement="bottom">
                    <ui-button slot="anchor">Bottom</ui-button>
                    <span>This is bottom content</span>
                </ui-popover>
                <ui-popover title="Top" placement="top">
                    <ui-button slot="anchor">Top</ui-button>
                    <span>This is top content</span>
                </ui-popover>
                <ui-popover title="Left" placement="left">
                    <ui-button slot="anchor">Left</ui-button>
                    <span>This is left content</span>
                </ui-popover>
                <ui-popover title="Right" placement="right">
                    <ui-button slot="anchor">Right</ui-button>
                    <span>This is right content</span>
                </ui-popover>
            </div>
        `;
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const SyncExample = {
    render: (args) => {
        return html`
            <div style="height: 150px; display: flex; justify-content: center; align-items: center; gap: 12px;">
                <ui-popover title="Default" placement="bottom">
                    <ui-button slot="anchor">Default</ui-button>
                    <span>This is bottom content</span>
                </ui-popover>
                <ui-popover title="Synchronized" placement="bottom" sync>
                    <ui-button slot="anchor">Synchronized</ui-button>
                    <span>This is bottom content</span>
                </ui-popover>
            </div>
        `;
    }
};

function getPopoverWrapperTemplate(content) {
    /*const onButtonClick = (event: PointerEvent) => {
        const parentElem = (event.target as HTMLElement).parentElement as HTMLElement;
        const elem = parentElem.querySelector('ui-popover') as PopoverComponent;
        elem.toggle();
    };*/
    return html`
        ${content(html`
            <ui-button slot="anchor">Open</ui-button>
            <span>Content of the popover</span>
        `)}
    `;
}

export default meta;
